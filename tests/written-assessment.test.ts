import { test } from 'node:test';
import assert from 'node:assert/strict';
import { indexedDB } from 'fake-indexeddb';
import {
  newAttempt,
  gradeAttempt,
  practicePoints,
  compatibleAttempt,
  attemptSummary,
  remainingSeconds,
  type Assessment,
} from '../src/lib/assessment';
import { emptyData, validateData, mergeData, StudyStorage } from '../src/lib/storage';
const exam: Assessment = {
  id: 'zeirishi-fixture-mock',
  title: '記述の検証',
  version: 'zeirishi-2026-v1',
  kind: 'mock',
  qualification: 'zeirishi',
  minutes: 120,
  questions: [
    {
      id: 'zr-fixture-number',
      prompt: '数値',
      options: [],
      answer: 0,
      input: 'number',
      accepted: ['300'],
      points: 40,
      explanation: '数値',
      lesson: 'zr-fixture',
      field: 'hojin',
    },
    {
      id: 'zr-fixture-essay',
      prompt: '理由',
      options: [],
      answer: 0,
      input: 'essay',
      points: 60,
      modelAnswer: '条件と結論。',
      rubric: [
        { criterion: '条件', points: 30 },
        { criterion: '結論', points: 30 },
      ],
      explanation: '独自の確認基準',
      lesson: 'zr-fixture',
      field: 'hojin',
    },
  ],
};
test('written responses use independent self-review points without changing the submission time or deadline', () => {
  const a = newAttempt(exam, 'timed', Date.parse('2026-10-25T10:00:00Z'));
  a.answers['zr-fixture-number'] = '３００円';
  a.answers['zr-fixture-essay'] = '条件を確認します。\n結論は次のとおりです。';
  let scored = gradeAttempt(exam, a, Date.parse('2026-10-25T12:00:00Z'));
  assert.equal(scored.score, 1);
  assert.equal(practicePoints(exam, scored), 40);
  assert.equal(scored.manual!['zr-fixture-essay']!.score, null);
  assert.match(attemptSummary(scored), /自動採点 1\/1問正解・記述 0\/1問/);
  const submitted = scored.finishedAt;
  scored.manual!['zr-fixture-essay']!.score = 35;
  scored = gradeAttempt(exam, scored, Date.parse('2026-10-26T10:00:00Z'));
  assert.equal(practicePoints(exam, scored), 75);
  assert.equal(scored.finishedAt, submitted);
  assert.equal(scored.deadline, a.deadline);
  assert.equal(remainingSeconds(scored, Date.parse('2026-10-25T12:00:01Z')), 0);
  assert.match(attemptSummary(scored), /自動採点 1\/1問正解・記述 1\/1問/);
  assert.ok(compatibleAttempt({ ...exam, title: '題名だけ更新' }, scored));
  assert.ok(!compatibleAttempt({ ...exam, version: 'zeirishi-2026-v2' }, scored));
});
test('v5 backup validates long answers and self-review ranges, preserving v4 history and merge decisions', () => {
  const prior = emptyData();
  prior.records['tk-contract'] = {
    status: 'completed',
    bookmarked: true,
    attempts: 0,
    updatedAt: '2026-10-25T10:00:00Z',
  };
  const old = validateData({ ...prior, version: 4 });
  assert.equal(old.version, 5);
  assert.deepEqual(old.records, prior.records);
  const a = newAttempt(exam, 'practice');
  a.answers['zr-fixture-essay'] = 'あ'.repeat(4000);
  a.manual!['zr-fixture-essay']!.score = 25;
  const data = emptyData();
  data.assessments[exam.id] = [a];
  const roundtrip = validateData(JSON.parse(JSON.stringify(mergeData(old, data))));
  assert.equal(
    roundtrip.assessments[exam.id]![0]!.answers['zr-fixture-essay'],
    a.answers['zr-fixture-essay'],
  );
  assert.equal(roundtrip.assessments[exam.id]![0]!.manual!['zr-fixture-essay']!.score, 25);
  assert.ok(roundtrip.records['tk-contract']);
  for (const invalid of [-1, 61, 0.5, Infinity]) {
    const bad = structuredClone(data);
    bad.assessments[exam.id]![0]!.manual!['zr-fixture-essay']!.score = invalid;
    assert.throws(() => validateData(bad));
  }
  const long = structuredClone(data);
  long.assessments[exam.id]![0]!.answers['zr-fixture-essay'] = 'あ'.repeat(4001);
  assert.throws(() => validateData(long));
  assert.throws(() => validateData({ ...data, version: 4 }));
  const legacy = structuredClone(data);
  delete legacy.assessments[exam.id]![0]!.manual;
  legacy.assessments[exam.id]![0]!.answers['zr-fixture-essay'] = 'x'.repeat(81);
  assert.throws(() => validateData({ ...legacy, version: 4 }));
});
test('essay text, self-review and existing records survive IndexedDB close and reopen', async () => {
  Object.assign(globalThis, {
    indexedDB,
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  });
  const storage = new StudyStorage();
  await storage.init();
  const a = newAttempt(exam, 'timed');
  a.answers['zr-fixture-essay'] = '改行を含む\n記述解答';
  a.manual!['zr-fixture-essay']!.score = 30;
  await storage.update((d) => {
    d.assessments[exam.id] = [a];
  });
  storage.close();
  const reopened = new StudyStorage();
  await reopened.init();
  assert.deepEqual(reopened.data.assessments[exam.id]![0], a);
  reopened.close();
});
