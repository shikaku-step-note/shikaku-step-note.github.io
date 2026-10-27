import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const plan = read('docs/zeirishi/upgrade-plan.json');
const reviews = read('docs/zeirishi/review-log.json');
const hash = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
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
      const currentReview = !!log && log.contentHash === currentHash;
      const objectives = lesson.objectives.map((objective) => {
        const evidence = currentReview ? log.objectives?.[objective.id] : undefined;
        const checks = {
          explanation: !!evidence?.explanation?.length,
          workedExamples: !!evidence?.workedExamples?.length,
          independentPractice: !!evidence?.independentPractice?.length,
          cumulativeAssessment: !!evidence?.cumulativeAssessment?.length,
          factualReview: evidence?.factualReview?.status === 'reviewed',
          japaneseReview: evidence?.japaneseReview?.status === 'reviewed',
        };
        return {
          id: objective.id,
          text: objective.text,
          checks,
          complete: Object.values(checks).every(Boolean),
        };
      });
      const row = {
        id: lesson.id,
        subject: subject.id,
        unit: unit.id,
        present,
        reviewMatchesContent: currentReview,
        complete: present && objectives.every((o) => o.complete),
        objectives,
      };
      entries.push(row);
    }
  }
}
const mocks = plan.subjects.flatMap((subject) =>
  subject.fullMockBlueprints.map((blueprint) => {
    const review = reviews.assessments[blueprint.id];
    return {
      id: blueprint.id,
      subject: subject.id,
      complete: review?.status === 'reviewed',
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
