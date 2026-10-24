export type Field = 'strategy' | 'management' | 'technology';
export type AssessmentKind = 'lesson' | 'glossary' | 'review' | 'mock';
export interface Question {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  lesson: string;
  field: Field;
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
  answers: Record<string, number>;
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
    fields: {
      strategy: { correct: 0, total: 0 },
      management: { correct: 0, total: 0 },
      technology: { correct: 0, total: 0 },
    },
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
    Object.entries(attempt.answers).every(
      ([id, value]) => byId.has(id) && value < byId.get(id)!.options.length,
    ) &&
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
  result.fields = {
    strategy: { correct: 0, total: 0 },
    management: { correct: 0, total: 0 },
    technology: { correct: 0, total: 0 },
  };
  for (const q of assessment.questions) {
    result.fields[q.field].total++;
    if (result.answers[q.id] === q.answer) {
      result.score++;
      result.fields[q.field].correct++;
    } else result.missed.push(q.id);
  }
  result.finishedAt = new Date(now).toISOString();
  result.updatedAt = result.finishedAt;
  return result;
}
