export type Field = string;
export type AssessmentKind = 'lesson' | 'glossary' | 'review' | 'mock';
export interface Question {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  lesson: string;
  field: Field;
  input?: 'number' | 'text';
  accepted?: string[];
  points?: number;
  group?: string;
}
export interface Assessment {
  id: string;
  title: string;
  kind: AssessmentKind;
  version: string;
  qualification: string;
  minutes?: number;
  unit?: number;
  questions: Question[];
  lessonTitles?: Record<string, string>;
  fieldNames?: Record<string, string>;
  instructions?: string;
  nextAssessment?: string;
  companion?: { id: string; version: string; questions: Question[] };
}
export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  version: string;
  kind: AssessmentKind;
  mode: 'timed' | 'practice';
  startedAt: string;
  deadline: string | null;
  updatedAt: string;
  finishedAt: string | null;
  answers: Record<string, number | string>;
  flags: string[];
  cursor: number;
  total: number;
  score: number | null;
  missed: string[];
  fields: Record<Field, { correct: number; total: number }>;
}
export function newAttempt(
  assessment: Assessment,
  mode: 'timed' | 'practice',
  now = Date.now(),
): AssessmentAttempt {
  const time = new Date(now).toISOString();
  return {
    id: `a-${now}-${Math.random().toString(36).slice(2, 10)}`,
    assessmentId: assessment.id,
    version: assessment.version,
    kind: assessment.kind,
    mode,
    startedAt: time,
    deadline:
      mode === 'timed' && assessment.minutes
        ? new Date(now + assessment.minutes * 60000).toISOString()
        : null,
    updatedAt: time,
    finishedAt: null,
    answers: {},
    flags: [],
    cursor: 0,
    total: assessment.questions.length,
    score: null,
    missed: [],
    fields: Object.fromEntries(
      [...new Set(assessment.questions.map((q) => q.field))].map((f) => [f, { correct: 0, total: 0 }]),
    ),
  };
}
export const remainingSeconds = (attempt: AssessmentAttempt, now = Date.now()) =>
  attempt.deadline === null ? null : Math.max(0, Math.ceil((Date.parse(attempt.deadline) - now) / 1000));
export function compatibleAttempt(assessment: Assessment, attempt: AssessmentAttempt): boolean {
  if (
    attempt.version !== assessment.version ||
    attempt.total !== assessment.questions.length ||
    attempt.kind !== assessment.kind
  )
    return false;
  const byId = new Map(assessment.questions.map((q) => [q.id, q]));
  return (
    Object.entries(attempt.answers).every(([id, value]) => {
      const q = byId.get(id);
      return (
        !!q &&
        (q.input
          ? typeof value === 'string' && value.length <= 80
          : typeof value === 'number' && Number.isInteger(value) && value >= 0 && value < q.options.length)
      );
    }) &&
    attempt.flags.every((id) => byId.has(id)) &&
    attempt.missed.every((id) => byId.has(id))
  );
}
export function gradeAttempt(
  assessment: Assessment,
  attempt: AssessmentAttempt,
  now = Date.now(),
): AssessmentAttempt {
  if (!compatibleAttempt(assessment, attempt)) throw new Error('問題の版や構成が異なるため採点できません。');
  const result = structuredClone(attempt);
  result.score = 0;
  result.missed = [];
  result.fields = Object.fromEntries(
    [...new Set(assessment.questions.map((q) => q.field))].map((f) => [f, { correct: 0, total: 0 }]),
  );
  for (const q of assessment.questions) {
    const field = result.fields[q.field]!;
    field.total++;
    if (isCorrect(q, result.answers[q.id])) {
      result.score++;
      field.correct++;
    } else result.missed.push(q.id);
  }
  result.finishedAt = new Date(now).toISOString();
  result.updatedAt = result.finishedAt;
  return result;
}
export function normalizeAnswer(value: string) {
  return value
    .normalize('NFKC')
    .replace(/[\s,，円]/g, '')
    .replace(/[−ー]/g, '-');
}
export function isCorrect(q: Question, value: number | string | undefined): boolean {
  if (!q.input) return value === q.answer;
  if (typeof value !== 'string' || !value.trim()) return false;
  const actual = normalizeAnswer(value);
  return (q.accepted ?? []).some((answer) => {
    const expected = normalizeAnswer(answer);
    if (q.input !== 'number') return expected === actual;
    const decimal = /^-?\d+(?:\.\d+)?$/;
    return (
      decimal.test(actual) &&
      decimal.test(expected) &&
      Number.isFinite(Number(actual)) &&
      Number(expected) === Number(actual)
    );
  });
}
export function practicePoints(a: Assessment, attempt: AssessmentAttempt) {
  return a.questions.reduce((n, q) => n + (isCorrect(q, attempt.answers[q.id]) ? (q.points ?? 1) : 0), 0);
}
export function fieldPoints(a: Pick<Assessment, 'questions'>, attempt: AssessmentAttempt) {
  const fields: Record<string, { score: number; total: number }> = {};
  for (const q of a.questions) {
    const f = (fields[q.field] ??= { score: 0, total: 0 });
    f.total += q.points ?? 1;
    if (isCorrect(q, attempt.answers[q.id])) f.score += q.points ?? 1;
  }
  return fields;
}
