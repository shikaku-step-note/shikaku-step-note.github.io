import type { Assessment, Question } from './assessment';
import { assessmentMaterialIssues } from './assessment';

export interface TaxReference {
  id: string;
  title: string;
  url: string;
  locator: string;
  version: string;
  verified: string;
}
export interface ExpandedTaxLesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  unit: number;
  moduleId: string;
  position: number;
  stage: string;
  minutes: number;
  objectives: string[];
  objectiveIds: string[];
  prerequisites: string[];
  glossary: { term: string; definition: string }[];
  references: TaxReference[];
  reviewed: string;
  assessmentVersion: string;
  workedExamples: { id: string; section: string; objectives: number[] }[];
  questions: Question[];
}
export interface ExpandedTaxUnit {
  id: string;
  subject: string;
  number: number;
  title: string;
  description: string;
  reviewed: string;
  lessonIds: string[];
  assessments: Assessment[];
}
export interface ExpandedTaxCurriculum {
  schemaVersion: 1;
  subjectNames: Record<string, string>;
  lessons: ExpandedTaxLesson[];
  units: ExpandedTaxUnit[];
  subjectAssessments: Assessment[];
}

// Only reviewed, implemented material enters this registry. The full proposal lives in docs/zeirishi.
export function expandedTaxIssues(course: ExpandedTaxCurriculum): string[] {
  const issues: string[] = [];
  if (course.schemaVersion !== 1) issues.push('Unsupported expanded curriculum schema');
  const lessonIds = new Set<string>();
  const units = new Map(course.units.map((u) => [u.id, u]));
  const questionIds = new Set<string>();
  const assessmentIds = new Set<string>();
  const unitNumbers = new Set<number>();
  for (const unit of course.units) {
    if (!unit.title?.trim() || !unit.description?.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(unit.reviewed))
      issues.push(`Incomplete unit description or review: ${unit.id}`);
    if (unitNumbers.has(unit.number) || !Number.isInteger(unit.number) || unit.number < 1000)
      issues.push(`Invalid or reused expanded unit number: ${unit.id}`);
    unitNumbers.add(unit.number);
    if (!unit.lessonIds.length || new Set(unit.lessonIds).size !== unit.lessonIds.length)
      issues.push(`Missing or repeated unit members: ${unit.id}`);
  }
  if (units.size !== course.units.length) issues.push('Duplicate expanded module ID');
  for (const lesson of course.lessons) {
    if (!course.subjectNames[lesson.subject]?.trim())
      issues.push(`Missing Japanese subject name: ${lesson.id}`);
    if (!lesson.id.startsWith('zr2-') || lessonIds.has(lesson.id))
      issues.push(`Invalid or reused expanded lesson ID: ${lesson.id}`);
    lessonIds.add(lesson.id);
    const unit = units.get(lesson.moduleId);
    if (
      !unit ||
      unit.subject !== lesson.subject ||
      unit.number !== lesson.unit ||
      !unit.lessonIds.includes(lesson.id)
    )
      issues.push(`Lesson/module mismatch: ${lesson.id}`);
    if (
      !lesson.objectives.length ||
      lesson.objectiveIds.length !== lesson.objectives.length ||
      new Set(lesson.objectiveIds).size !== lesson.objectiveIds.length
    )
      issues.push(`Invalid objective identifiers: ${lesson.id}`);
    if (!lesson.assessmentVersion || !lesson.references.length || !/^\d{4}-\d{2}-\d{2}$/.test(lesson.reviewed))
      issues.push(`Missing assessment version or source review: ${lesson.id}`);
    if (!lesson.workedExamples?.length || lesson.workedExamples.some((example) =>
      !example.id || !example.section || !example.objectives.length ||
      example.objectives.some((n) => !Number.isInteger(n) || n < 1 || n > lesson.objectives.length)))
      issues.push(`Missing or invalid worked examples: ${lesson.id}`);
    for (const reference of lesson.references) {
      if (
        !reference.title.trim() ||
        !reference.locator.trim() ||
        !reference.version.trim() ||
        !/^https:\/\//.test(reference.url) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(reference.verified)
      )
        issues.push(`Invalid public reference: ${lesson.id}:${reference.id}`);
    }
  }
  for (const unit of course.units)
    for (const id of unit.lessonIds)
      if (!lessonIds.has(id)) issues.push(`Unimplemented unit member: ${unit.id}:${id}`);
  for (const unit of course.units)
    for (const assessment of unit.assessments)
      if (assessment.unit !== unit.number || assessment.questions.some((question) => !unit.lessonIds.includes(question.lesson)))
        issues.push(`Assessment/module mismatch: ${unit.id}:${assessment.id}`);
  for (const lesson of course.lessons)
    for (const prerequisite of lesson.prerequisites)
      if (prerequisite.startsWith('zr2-') && !lessonIds.has(prerequisite))
        issues.push(`Unimplemented expanded prerequisite: ${lesson.id}:${prerequisite}`);
  const assessments = expandedTaxAssessments(course);
  for (const assessment of assessments) {
    if (assessmentIds.has(assessment.id)) issues.push(`Reused expanded assessment: ${assessment.id}`);
    assessmentIds.add(assessment.id);
    if (assessment.qualification !== 'zeirishi' || !assessment.version || !assessment.questions.length)
      issues.push(`Incomplete assessment: ${assessment.id}`);
    issues.push(...assessmentMaterialIssues(assessment));
    for (const question of assessment.questions) {
      if (questionIds.has(question.id)) issues.push(`Reused independent question: ${question.id}`);
      questionIds.add(question.id);
      if (!lessonIds.has(question.lesson)) issues.push(`Missing revision lesson: ${question.id}`);
      const owner = course.lessons.find((lesson) => lesson.id === question.lesson);
      if (
        !owner ||
        question.field !== owner.subject ||
        !question.objectives?.length ||
        question.objectives.some((n) => !Number.isInteger(n) || n < 1 || n > owner.objectives.length)
      )
        issues.push(`Question/learning objective mismatch: ${question.id}`);
      for (const [id, indices] of Object.entries(question.targetObjectives ?? {})) {
        const target = course.lessons.find((lesson) => lesson.id === id);
        if (!target || !indices.length || new Set(indices).size !== indices.length ||
            indices.some((n) => !Number.isInteger(n) || n < 1 || n > target.objectives.length))
          issues.push(`Invalid cumulative objective target: ${question.id}:${id}`);
        if (id === question.lesson && JSON.stringify([...indices].sort()) !== JSON.stringify([...(question.objectives ?? [])].sort()))
          issues.push(`Inconsistent primary objective target: ${question.id}`);
      }
      if (question.input === 'essay') {
        if (
          !question.modelAnswer?.trim() ||
          !question.rubric?.length ||
          question.rubric.reduce((total, row) => total + row.points, 0) !== (question.points ?? 1)
        )
          issues.push(`Incomplete self-review rubric: ${question.id}`);
      } else if (question.input === 'number' || question.input === 'text') {
        if (!question.accepted?.length) issues.push(`Missing answer key: ${question.id}`);
      } else if (
        question.options.length < 2 ||
        new Set(question.options).size !== question.options.length ||
        question.answer < 0 ||
        question.answer >= question.options.length
      )
        issues.push(`Invalid answer choices: ${question.id}`);
    }
  }
  return issues;
}

export function expandedTaxAssessments(course: ExpandedTaxCurriculum): Assessment[] {
  return [
    ...course.lessons.map((lesson) => ({
      id: lesson.id + '-check',
      qualification: 'zeirishi',
      title: lesson.title + '：理解度チェック',
      kind: 'lesson' as const,
      version: lesson.assessmentVersion,
      unit: lesson.unit,
      questions: lesson.questions,
      lessonTitles: { [lesson.id]: lesson.title },
      fieldNames: course.subjectNames,
      instructions:
        '本文の例題とは別の独自問題です。記述は解答例と独自の確認基準で自己確認します。学習済みの印、用語の結果、総合演習の結果は別に保存されます。',
    })),
    ...course.units.flatMap((unit) => unit.assessments),
    ...course.subjectAssessments,
  ];
}
