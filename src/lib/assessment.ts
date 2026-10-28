export type Field = string;
export type AssessmentKind = 'lesson' | 'glossary' | 'review' | 'mock';
export interface AssessmentMaterial {
  id: string;
  title: string;
  paragraphs: string[];
  tables?: { caption: string; headers: string[]; rows: string[][] }[];
}
export interface Question {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  lesson: string;
  field: Field;
  input?: 'number' | 'text' | 'essay' | 'journal';
  /** A normal text keyboard exposes a minus key on devices whose decimal keypad omits it. */
  signed?: boolean;
  /** Allowed account choices and a balanced model entry. Stored answers remain JSON strings. */
  journal?: { accounts: string[]; debits: JournalRow[]; credits: JournalRow[] };
  accepted?: string[];
  points?: number;
  group?: string;
  modelAnswer?: string;
  rubric?: { criterion: string; points: number }[];
  objectives?: number[];
  // A cumulative question can assess skills taught in more than one lesson.
  targetObjectives?: Record<string, number[]>;
  materialIds?: string[];
}
export interface JournalRow {
  account: string;
  amount: number | string;
}
export interface JournalEntry {
  debits: JournalRow[];
  credits: JournalRow[];
}
/** Structural parsing also accepts partial rows so unfinished work can be restored safely. */
export function parseJournalAnswer(value: unknown): JournalEntry | null {
  if (typeof value !== 'string' || value.length > 4000) return null;
  try {
    const entry = JSON.parse(value);
    if (
      !entry ||
      typeof entry !== 'object' ||
      Array.isArray(entry) ||
      Object.keys(entry).some((key) => key !== 'debits' && key !== 'credits')
    )
      return null;
    for (const side of ['debits', 'credits'] as const) {
      if (!Array.isArray(entry[side]) || entry[side].length > 4) return null;
      for (const row of entry[side]) {
        if (
          !row ||
          typeof row !== 'object' ||
          Array.isArray(row) ||
          Object.keys(row).some((key) => key !== 'account' && key !== 'amount') ||
          typeof row.account !== 'string' ||
          row.account.length > 80 ||
          !['string', 'number'].includes(typeof row.amount) ||
          String(row.amount).length > 80
        )
          return null;
      }
    }
    return entry as JournalEntry;
  } catch {
    return null;
  }
}
function journalAmount(value: string | number): string | null {
  const normalized = String(value).normalize('NFKC').trim();
  // Permit conventional thousands separators, never exponent notation, signs or units.
  if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(normalized)) return null;
  const amount = normalized.replaceAll(',', '');
  if (!Number.isFinite(Number(amount)) || Number(amount) <= 0 || Number(amount) > Number.MAX_SAFE_INTEGER)
    return null;
  const [whole, fraction = ''] = amount.split('.');
  const tail = fraction.replace(/0+$/, '');
  return `${whole!.replace(/^0+(?=\d)/, '')}${tail ? `.${tail}` : ''}`;
}
/** Exact decimal sums avoid binary floating-point errors in compound entries. */
export function canonicalJournal(value: unknown, accounts: readonly string[]): string | null {
  const entry = parseJournalAnswer(value);
  if (!entry) return null;
  const allowed = new Set(accounts);
  const prepared: Record<'debits' | 'credits', { account: string; amount: string }[]> = {
    debits: [],
    credits: [],
  };
  let scale = 0;
  for (const side of ['debits', 'credits'] as const) {
    for (const row of entry[side]) {
      const account = row.account.trim();
      if (!account && String(row.amount).trim() === '') continue;
      const amount = journalAmount(row.amount);
      if (!allowed.has(account) || amount === null) return null;
      scale = Math.max(scale, amount.split('.')[1]?.length ?? 0);
      prepared[side].push({ account, amount });
    }
    if (!prepared[side].length) return null;
  }
  const canonical = {
    debits: [] as { account: string; amount: string }[],
    credits: [] as { account: string; amount: string }[],
  };
  const totals = { debits: 0n, credits: 0n };
  for (const side of ['debits', 'credits'] as const) {
    const sums = new Map<string, bigint>();
    for (const row of prepared[side]) {
      const [whole, fraction = ''] = row.amount.split('.');
      const units = BigInt(`${whole}${fraction.padEnd(scale, '0')}`);
      sums.set(row.account, (sums.get(row.account) ?? 0n) + units);
      totals[side] += units;
    }
    canonical[side] = [...sums.entries()]
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([account, amount]) => {
        const digits = amount.toString().padStart(scale + 1, '0');
        const raw = scale ? `${digits.slice(0, -scale)}.${digits.slice(-scale)}` : digits;
        return { account, amount: raw.includes('.') ? raw.replace(/0+$/, '').replace(/\.$/, '') : raw };
      });
  }
  return totals.debits === totals.credits ? JSON.stringify(canonical) : null;
}
export function journalAnswerText(value: unknown): string {
  const entry = parseJournalAnswer(value);
  if (!entry) return '仕訳の形式を確認できません';
  return (['debits', 'credits'] as const)
    .map((side) => {
      const rows = entry[side].filter((row) => row.account.trim() || String(row.amount).trim());
      return `${side === 'debits' ? '借方' : '貸方'}：${rows.length ? rows.map((row) => `${row.account || '科目未選択'} ${String(row.amount).trim() || '金額未入力'}円`).join('、') : '未入力'}`;
    })
    .join(' ／ ');
}
export function questionRevisionLessons(question: Question): string[] {
  return [...new Set([question.lesson, ...Object.keys(question.targetObjectives ?? {})])];
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
  materials?: AssessmentMaterial[];
}
export function assessmentMaterialIssues(a: Pick<Assessment, 'materials' | 'questions'>): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  for (const material of a.materials ?? []) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(material.id) || ids.has(material.id))
      issues.push(`Invalid or duplicate material ID: ${material.id}`);
    ids.add(material.id);
    if (!material.title.trim() || (!material.paragraphs.some((p) => p.trim()) && !material.tables?.length))
      issues.push(`Empty material: ${material.id}`);
    for (const table of material.tables ?? [])
      if (
        !table.caption.trim() ||
        !table.headers.length ||
        !table.rows.length ||
        table.rows.some((row) => row.length !== table.headers.length)
      )
        issues.push(`Invalid material table: ${material.id}`);
  }
  for (const q of a.questions) {
    if (q.input === 'journal') {
      const model = q.journal;
      const accounts = model?.accounts ?? [];
      const expected = model
        ? canonicalJournal(JSON.stringify({ debits: model.debits, credits: model.credits }), accounts)
        : null;
      if (
        !model ||
        accounts.length < 2 ||
        accounts.length > 100 ||
        new Set(accounts).size !== accounts.length ||
        accounts.some((account) => !account.trim() || account.length > 80 || account !== account.trim()) ||
        !expected ||
        q.options.length ||
        q.answer !== 0 ||
        !q.accepted?.length ||
        q.accepted.some((answer) => canonicalJournal(answer, accounts) !== expected)
      )
        issues.push(`Invalid journal model or accepted answer: ${q.id}`);
    } else if (q.journal) issues.push(`Journal model on another input type: ${q.id}`);
    if (new Set(q.materialIds ?? []).size !== (q.materialIds ?? []).length)
      issues.push(`Duplicate material reference: ${q.id}`);
    for (const id of q.materialIds ?? []) if (!ids.has(id)) issues.push(`Unknown material ${id}: ${q.id}`);
  }
  return issues;
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
  manual?: Record<string, { max: number; score: number | null }>;
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
    ...(assessment.questions.some((q) => q.input === 'essay')
      ? {
          manual: Object.fromEntries(
            assessment.questions
              .filter((q) => q.input === 'essay')
              .map((q) => [q.id, { max: q.points ?? 1, score: null }]),
          ),
        }
      : {}),
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
          ? typeof value === 'string' &&
            value.length <= (q.input === 'essay' || q.input === 'journal' ? 4000 : 80) &&
            (q.input !== 'journal' || parseJournalAnswer(value) !== null)
          : typeof value === 'number' && Number.isInteger(value) && value >= 0 && value < q.options.length)
      );
    }) &&
    attempt.flags.every((id) => byId.has(id)) &&
    attempt.missed.every((id) => byId.has(id)) &&
    assessment.questions
      .filter((q) => q.input === 'essay')
      .every((q) => attempt.manual?.[q.id]?.max === (q.points ?? 1)) &&
    Object.keys(attempt.manual ?? {}).every((id) => byId.get(id)?.input === 'essay')
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
    if (
      q.input === 'essay'
        ? result.manual?.[q.id]?.score === (q.points ?? 1)
        : isCorrect(q, result.answers[q.id])
    ) {
      result.score++;
      field.correct++;
    } else result.missed.push(q.id);
  }
  result.finishedAt ??= new Date(now).toISOString();
  result.updatedAt = new Date(now).toISOString();
  return result;
}
export function normalizeAnswer(value: string) {
  return value
    .normalize('NFKC')
    .replace(/[\s,，円]/g, '')
    .replace(/[−ー]/g, '-');
}
export function isCorrect(q: Question, value: number | string | undefined): boolean {
  if (q.input === 'essay') return false;
  if (q.input === 'journal') {
    const actual = canonicalJournal(value, q.journal?.accounts ?? []);
    if (!actual || !q.journal) return false;
    const expected = canonicalJournal(
      JSON.stringify({ debits: q.journal.debits, credits: q.journal.credits }),
      q.journal.accounts,
    );
    return expected !== null && actual === expected;
  }
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
  return a.questions.reduce(
    (n, q) =>
      n +
      (q.input === 'essay'
        ? (attempt.manual?.[q.id]?.score ?? 0)
        : isCorrect(q, attempt.answers[q.id])
          ? (q.points ?? 1)
          : 0),
    0,
  );
}
export function fieldPoints(a: Pick<Assessment, 'questions'>, attempt: AssessmentAttempt) {
  const fields: Record<string, { score: number; total: number }> = {};
  for (const q of a.questions) {
    const f = (fields[q.field] ??= { score: 0, total: 0 });
    f.total += q.points ?? 1;
    if (q.input === 'essay') f.score += attempt.manual?.[q.id]?.score ?? 0;
    else if (isCorrect(q, attempt.answers[q.id])) f.score += q.points ?? 1;
  }
  return fields;
}
export function attemptSummary(attempt: AssessmentAttempt) {
  const manual = Object.values(attempt.manual ?? {});
  if (!manual.length) return `${attempt.score}/${attempt.total}問正解`;
  const full = manual.filter((m) => m.score === m.max).length;
  const reviewed = manual.filter((m) => m.score !== null).length;
  return `自動採点 ${Number(attempt.score ?? 0) - full}/${attempt.total - manual.length}問正解・記述 ${reviewed}/${manual.length}問を自己確認`;
}
