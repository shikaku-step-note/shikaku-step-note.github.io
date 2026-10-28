import { test } from 'node:test';
import assert from 'node:assert/strict';
import { indexedDB } from 'fake-indexeddb';
import {
  canonicalJournal,
  parseJournalAnswer,
  journalAnswerText,
  isCorrect,
  assessmentMaterialIssues,
  newAttempt,
  compatibleAttempt,
  gradeAttempt,
  practicePoints,
  remainingSeconds,
  type Assessment,
  type Question,
} from '../src/lib/assessment';
import { emptyData, validateData, mergeData, StudyStorage } from '../src/lib/storage';

const model = {
  debits: [
    { account: '現金', amount: 10000 },
    { account: '売掛金', amount: 20000 },
  ],
  credits: [{ account: '売上', amount: 30000 }],
};
const question: Question = {
  id: 'b3-journal-fixture',
  prompt: '商品30,000円を売り、10,000円を現金で受け取り、残額を掛けとした。',
  input: 'journal',
  journal: { accounts: ['現金', '売掛金', '売上', '買掛金'], ...model },
  options: [],
  answer: 0,
  accepted: [JSON.stringify(model)],
  explanation: '現金10,000円と売掛金20,000円の増加を借方、売上30,000円を貸方に記入する。',
  points: 3,
  lesson: 'b3-fixture',
  field: 'journal',
};
const exam: Assessment = {
  id: 'b3-journal-test',
  title: '仕訳入力の検証',
  kind: 'mock',
  qualification: 'boki-3',
  version: 'b3-journal-fixture-v1',
  minutes: 60,
  questions: [question],
};
const encoded = (debits: unknown[], credits: unknown[]) => JSON.stringify({ debits, credits });

test('journal grading requires the complete entry, accepts fullwidth amounts and ignores row order and unused rows', () => {
  assert.deepEqual(assessmentMaterialIssues(exam), []);
  assert.ok(isCorrect(question, JSON.stringify(model)));
  const entered = encoded(
    [
      { account: '売掛金', amount: '２０，０００' },
      { account: '現金', amount: '10,000.00' },
      { account: '', amount: '' },
      { account: '', amount: '' },
    ],
    [
      { account: '売上', amount: '３００００' },
      { account: '', amount: '' },
    ],
  );
  assert.ok(isCorrect(question, entered));
  assert.equal(
    canonicalJournal(entered, question.journal!.accounts),
    canonicalJournal(JSON.stringify(model), question.journal!.accounts),
  );
  assert.match(journalAnswerText(entered), /借方：売掛金/);
  assert.match(journalAnswerText(entered), /貸方：売上/);
  assert.doesNotMatch(journalAnswerText(entered), /\{"/);
});

test('compound entries aggregate repeated accounts using exact decimal sums', () => {
  const split = encoded(
    [
      { account: '現金', amount: '4000' },
      { account: '現金', amount: '6000' },
      { account: '売掛金', amount: '20000' },
    ],
    [{ account: '売上', amount: '30000' }],
  );
  assert.ok(isCorrect(question, split));
  const decimal = encoded(
    [
      { account: '現金', amount: '0.1' },
      { account: '現金', amount: '0.2' },
    ],
    [{ account: '売上', amount: '0.3' }],
  );
  assert.equal(
    canonicalJournal(decimal, ['現金', '売上']),
    encoded([{ account: '現金', amount: '0.3' }], [{ account: '売上', amount: '0.3' }]),
  );
  const four = encoded(
    Array.from({ length: 4 }, () => ({ account: '現金', amount: '0.1' })),
    [{ account: '売上', amount: '0.4' }],
  );
  assert.ok(canonicalJournal(four, ['現金', '売上']));
});

test('blank, partial, unbalanced, swapped-side, unknown-account and hostile answers never earn points', () => {
  for (const value of [
    '',
    '{}',
    'null',
    '[]',
    '{bad json',
    '{"debits":[],"credits":[],"__proto__":{}}',
    encoded([], []),
    encoded([{ account: '現金', amount: '' }], model.credits),
    encoded([{ account: '', amount: '30000' }], model.credits),
    encoded([{ account: '現金', amount: '30000' }], model.credits), // Balanced, but the transaction is wrong.
    encoded(model.debits, [{ account: '売上', amount: '29000' }]),
    encoded(model.credits, model.debits),
    encoded([{ account: '<script>alert(1)</script>', amount: '30000' }], model.credits),
    encoded([{ account: '現金', amount: '-30000' }], model.credits),
    encoded([{ account: '現金', amount: '3e4' }], model.credits),
    encoded([{ account: '現金', amount: '30,00' }], model.credits),
    encoded([{ account: '現金', amount: '30000円' }], model.credits),
    encoded([{ account: '現金', amount: 'Infinity' }], model.credits),
    encoded([{ account: '現金', amount: '0' }], model.credits),
    encoded(
      Array.from({ length: 5 }, () => ({ account: '現金', amount: '6000' })),
      model.credits,
    ),
    encoded([{ account: '現金', amount: {}, injected: true }], model.credits),
  ])
    assert.equal(isCorrect(question, value), false, String(value));
  assert.equal(parseJournalAnswer('x'.repeat(4001)), null);
  assert.equal(parseJournalAnswer('{"debits":[],"credits":[],"__proto__":{}}'), null);
});

test('invalid bank models, mismatched accepted answers and non-journal model attachments fail validation', () => {
  for (const change of [
    { accepted: [encoded(model.credits, model.debits)] },
    { journal: { ...question.journal!, credits: [{ account: '売上', amount: 1 }] } },
    { journal: { ...question.journal!, accounts: ['現金', '現金'] } },
    { options: ['選択肢'] },
    { answer: 1 },
    { input: 'number' as const },
  ])
    assert.ok(assessmentMaterialIssues({ questions: [{ ...question, ...change }] }).length);
});

test('partial journal strings survive backup merge, database reopening and absolute timed deadlines without changing older records', async () => {
  Object.assign(globalThis, { indexedDB, localStorage: { getItem: () => null, setItem: () => {} } });
  const start = Date.parse('2026-10-28T10:00:00Z');
  const partial = encoded(
    [
      { account: '現金', amount: '１０，０００' },
      { account: '売掛金', amount: '' },
    ],
    [{ account: '', amount: '30000' }],
  );
  const attempt = newAttempt(exam, 'timed', start);
  attempt.answers[question.id] = partial;
  assert.ok(compatibleAttempt(exam, attempt));
  assert.equal(gradeAttempt(exam, attempt).score, 0);
  const older = validateData({ ...emptyData(), version: 4 });
  older.records['old-lesson'] = {
    status: 'completed',
    bookmarked: true,
    attempts: 1,
    updatedAt: older.savedAt,
  };
  const current = emptyData();
  current.assessments[exam.id] = [attempt];
  const merged = validateData(JSON.parse(JSON.stringify(mergeData(older, current))));
  assert.equal(merged.version, 5);
  assert.equal(merged.records['old-lesson']!.bookmarked, true);
  assert.equal(merged.assessments[exam.id]![0]!.answers[question.id], partial);
  const first = new StudyStorage();
  await first.init();
  await first.update((data) => {
    data.assessments[exam.id] = [attempt];
  });
  first.close();
  const reopened = new StudyStorage();
  await reopened.init();
  const restored = reopened.data.assessments[exam.id]![0]!;
  assert.equal(restored.answers[question.id], partial);
  assert.equal(remainingSeconds(restored, start + 30 * 60000), 1800);
  assert.equal(remainingSeconds(restored, start + 61 * 60000), 0);
  restored.answers[question.id] = JSON.stringify(model);
  const result = gradeAttempt(exam, restored, start + 61 * 60000);
  assert.equal(result.score, 1);
  assert.equal(practicePoints(exam, result), 3);
  assert.equal(result.deadline, attempt.deadline);
  assert.ok(compatibleAttempt({ ...exam, title: '題名のみ変更' }, result));
  assert.equal(compatibleAttempt({ ...exam, version: 'b3-journal-fixture-v2' }, result), false);
  assert.equal(remainingSeconds(newAttempt(exam, 'practice', start), start + 99999999), null);
  reopened.close();
});
