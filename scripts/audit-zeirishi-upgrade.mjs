import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const plan = read('docs/zeirishi/upgrade-plan.json');
const reviews = read('docs/zeirishi/review-log.json');
// Git may normalize line endings on Windows; meaningful source edits still invalidate review.
const hash = (path) => createHash('sha256').update(readFileSync(path, 'utf8').replace(/\r\n/g, '\n')).digest('hex');
const dataHash = (data) => createHash('sha256').update(JSON.stringify(data)).digest('hex');
const implemented = read('src/data/zeirishi-expanded.json');
const lessonData = new Map(implemented.lessons.map((lesson) => [lesson.id, lesson]));
const assessmentData = new Map([
  ...implemented.units.flatMap((unit) => unit.assessments),
  ...implemented.subjectAssessments,
].map((assessment) => [assessment.id, assessment]));
const practiceQuestions = new Map(implemented.lessons.flatMap((lesson) => lesson.questions).map((question) => [question.id, question]));
const cumulativeQuestions = new Map([...assessmentData.values()].filter((assessment) => assessment.kind !== 'glossary').flatMap((assessment) => assessment.questions).map((question) => [question.id, question]));
const entries = [];
const errors = [];
const ids = new Set();
for (const subject of plan.subjects) {
  for (const unit of subject.units) {
    for (const lesson of unit.lessons) {
      if (ids.has(lesson.id)) errors.push(`Duplicate planned lesson: ${lesson.id}`);
      ids.add(lesson.id);
      const path = `src/content/lessons/${lesson.id}.md`;
      const log = reviews.lessons[lesson.id];
      const present = existsSync(path);
      const currentHash = present ? hash(path) : null;
      const material = lessonData.get(lesson.id);
      const currentReview = !!log && !!material && log.contentHash === currentHash && log.lessonDataHash === dataHash(material)
        && !!log.reviewRecord && existsSync(log.reviewRecord);
      const body = present ? readFileSync(path, 'utf8').replace(/\r\n/g, '\n').split('---').slice(2).join('---') : '';
      const checkObjective = (objective) => {
        const evidence = currentReview ? log.objectives?.[objective.id] : undefined;
        // Broad scope objectives may be decomposed into stable teaching skills.
        // Every referenced skill must be taught and tested, not just mentioned.
        const details = material?.objectiveIds ?? [];
        const fineIds = details.includes(objective.id)
          ? [objective.id]
          : evidence?.detailedObjectiveIds ?? [];
        const indices = fineIds.map((id) => details.indexOf(id) + 1);
        const relevant = (numbers) => indices.some((index) => numbers?.includes(index));
        const checks = {
          learningObjectiveMapping: indices.length > 0 && indices.every((index) => index > 0),
          explanation: !!evidence?.explanation?.length && evidence.explanation.every((heading) => body.includes(`## ${heading}`)),
          workedExamples: !!evidence?.workedExamples?.length && evidence.workedExamples.every((id) => {
            const example = material.workedExamples.find((example) => example.id === id);
            return example && relevant(example.objectives) && body.split('\n').some((line) =>
              /^#{2,3} /.test(line) && line.replace(/^#{2,3} /, '') === example.section);
          }),
          independentPractice: !!evidence?.independentPractice?.length && evidence.independentPractice.every((id) => {
            const question = practiceQuestions.get(id);
            return question?.lesson === lesson.id && relevant(question.objectives);
          }),
          cumulativeAssessment: !!evidence?.cumulativeAssessment?.length && evidence.cumulativeAssessment.every((id) => {
            const question = cumulativeQuestions.get(id);
            if (question?.lesson !== lesson.id || !relevant(question.objectives)) return false;
            const assessment = [...assessmentData.values()].find((assessment) => assessment.questions.some((question) => question.id === id));
            const check = reviews.assessments[assessment.id];
            return check?.status === 'reviewed' && check.assessmentDataHash === dataHash(assessment) && existsSync(check.reviewRecord);
          }),
          factualReview: evidence?.factualReview?.status === 'reviewed' && !!evidence.factualReview.sources?.length,
          japaneseReview: evidence?.japaneseReview?.status === 'reviewed' && !!evidence.japaneseReview.method,
        };
        return {
          id: objective.id,
          text: objective.text,
          checks,
          complete: Object.values(checks).every(Boolean),
        };
      };
      const objectives = lesson.objectives.map(checkObjective);
      const detailedObjectives = (material?.objectiveIds ?? []).map((id, index) =>
        checkObjective({ id, text: material.objectives[index] }));
      const row = {
        id: lesson.id,
        subject: subject.id,
        unit: unit.id,
        present,
        reviewMatchesContent: currentReview,
        browserVerification: log?.browserVerification ?? 'pending',
        complete: present && objectives.every((o) => o.complete) && detailedObjectives.every((o) => o.complete),
        objectives,
        detailedObjectives,
      };
      entries.push(row);
    }
  }
}
const mocks = plan.subjects.flatMap((subject) =>
  subject.fullMockBlueprints.map((blueprint) => {
    const review = reviews.assessments[blueprint.id];
    const assessment = assessmentData.get(blueprint.id);
    return {
      id: blueprint.id,
      subject: subject.id,
      complete: !!assessment && assessment.kind === 'mock' && assessment.minutes === 120
        && !!assessment.questions.length && review?.status === 'reviewed'
        && review.assessmentDataHash === dataHash(assessment) && !!review.reviewRecord && existsSync(review.reviewRecord),
      status: review?.status ?? 'blueprint-only',
    };
  }),
);
const summary = {
  status: 'in-progress',
  scope: plan.totals,
  implementedLessons: entries.filter((l) => l.present).length,
  fullyReviewedLessons: entries.filter((l) => l.complete).length,
  fullyReviewedObjectives: entries.flatMap((l) => l.objectives).filter((o) => o.complete).length,
  fullyReviewedTeachingSkills: entries.flatMap((l) => l.detailedObjectives).filter((o) => o.complete).length,
  reviewedFullMocks: mocks.filter((m) => m.complete).length,
  errors,
};
const complete = !errors.length && entries.every((l) => l.complete) && mocks.every((m) => m.complete);
if (complete) summary.status = 'complete';
writeFileSync(
  'docs/zeirishi/coverage-ledger.json',
  JSON.stringify({ ...summary, lessons: entries, mocks }, null, 2) + '\n',
);
console.log(JSON.stringify(summary, null, 2));
if (errors.length || (process.argv.includes('--require-complete') && !complete)) process.exitCode = 1;
