import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { newAttempt, gradeAttempt, remainingSeconds, compatibleAttempt } from '../src/lib/assessment';
import { emptyData, validateData, mergeData, StudyStorage } from '../src/lib/storage';
import { ipAssessments, questionBank, units, syllabusItems, mockQuestions } from '../src/data/it-passport';
import { indexedDB } from 'fake-indexeddb';
const lessons = readdirSync('src/content/lessons')
  .filter((n) => n.startsWith('ip-') && n.endsWith('.md'))
  .map((n) => ({ data: parse(readFileSync(`src/content/lessons/${n}`, 'utf8').split('---')[1]!) }));
const assessments = ipAssessments(lessons);
const mock = assessments.find((a) => a.kind === 'mock')!;
test('mismatched question records cannot be reinterpreted or scored', () => {
  const a = newAttempt(mock, 'practice');
  a.total = 3;
  assert.equal(compatibleAttempt(mock, a), false);
  assert.throws(() => gradeAttempt(mock, a));
  const b = newAttempt(mock, 'practice');
  b.answers['unknown-question'] = 0;
  assert.equal(compatibleAttempt(mock, b), false);
  assert.throws(() => gradeAttempt(mock, b));
});
test('current curriculum covers all 63 official items and all 23 units, with valid original banks', () => {
  assert.equal(lessons.length, 37);
  assert.equal(syllabusItems.length, 63);
  assert.equal(new Set(lessons.map((l) => l.data.unit)).size, 23);
  assert.deepEqual(
    [...new Set(lessons.flatMap((l) => l.data.syllabus))].sort((a, b) => Number(a) - Number(b)),
    Array.from({ length: 63 }, (_, i) => i + 1),
  );
  for (const l of lessons) {
    assert.equal(l.data.sample, false);
    assert.equal(l.data.glossary.length, 4);
    assert.equal(questionBank[l.data.stableId]!.lesson.length, 3);
    assert.equal(questionBank[l.data.stableId]!.review.length, 2);
  }
  assert.equal(assessments.length, 86);
  assert.equal(assessments.filter((a) => a.kind === 'glossary').length, 24);
  assert.equal(assessments.filter((a) => a.kind === 'review').length, 24);
  const ids = new Set(lessons.map((l) => l.data.stableId));
  for (const a of assessments) {
    assert.ok(a.questions.length);
    assert.equal(new Set(a.questions.map((q) => q.id)).size, a.questions.length);
    for (const q of a.questions) {
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.ok(q.options[q.answer]);
      assert.ok(q.explanation.length > 8);
      assert.ok(ids.has(q.lesson));
    }
  }
  assert.equal(new Set(mockQuestions.map((q) => q.prompt)).size, 100);
  assert.equal(mock.minutes, 120);
  assert.equal(mock.questions.length, 100);
  assert.deepEqual(
    ['strategy', 'management', 'technology'].map((f) => mock.questions.filter((q) => q.field === f).length),
    [35, 20, 45],
  );
  assert.ok(units.every((u) => assessments.some((a) => a.unit === u.id && a.kind === 'review')));
});
test('original question arithmetic matches independent reference calculations', () => {
  const all = [...Object.values(questionBank).flatMap((b) => [...b.lesson, ...b.review]), ...mockQuestions];
  const checks: [string, string][] = [
    ['単価2,000円', `${240000 / (2000 - 1200)}個`],
    ['期末時点の資産', `${900 - 350}万円`],
    ['広告費72,000円', `${72000 / 120}円`],
    ['A3日後にB5日', `${3 + Math.max(5, 2) + 1}日`],
    ['2進数11010', `${parseInt('11010', 2)}`],
    ['符号なし6ビット', `${2 ** 6 - 1}`],
    ['MTBF=198', `${(198 / (198 + 2)) * 100}%`],
    ['各稼働率0.95の独立', `${Number((1 - (1 - 0.95) ** 2).toFixed(4))}`],
    ['200×150画素', `${(200 * 150 * 24) / 8}`],
    ['16,000Hz', `${(16000 * 8 * 5) / 8}`],
    ['30MBを実効', `${(30 * 8) / 20}秒`],
  ];
  for (const [snippet, expected] of checks) {
    const q = all.find((q) => q.prompt.includes(snippet));
    assert.ok(q, snippet);
    const actual = q.options[q.answer]!.replaceAll(',', '');
    assert.equal(actual.replace('バイト', ''), expected.replace('バイト', ''), snippet);
  }
});
test('mock scoring keeps field totals separate and does not manufacture an IRT score', () => {
  const attempt = newAttempt(mock, 'timed', Date.parse('2026-10-25T10:00:00Z'));
  for (const q of mock.questions) attempt.answers[q.id] = q.answer;
  const result = gradeAttempt(mock, attempt);
  assert.equal(result.score, 100);
  assert.equal(result.fields.strategy!.correct, 35);
  assert.equal(result.fields.management!.correct, 20);
  assert.equal(result.fields.technology!.correct, 45);
  assert.equal(result.missed.length, 0);
  const blank = gradeAttempt(mock, newAttempt(mock, 'practice'));
  assert.equal(blank.score, 0);
  assert.equal(blank.missed.length, 100);
  assert.equal(attempt.finishedAt, null);
});
test('deadline is absolute across reopening, sleep and clock advancement; practice mode has no deadline', () => {
  const start = Date.parse('2026-10-25T10:00:00Z');
  const attempt = newAttempt(mock, 'timed', start);
  assert.equal(remainingSeconds(attempt, start), 7200);
  const reopened = JSON.parse(JSON.stringify(attempt));
  assert.equal(remainingSeconds(reopened, start + 119 * 60000), 60);
  assert.equal(remainingSeconds(reopened, start + 121 * 60000), 0);
  assert.equal(remainingSeconds(newAttempt(mock, 'practice', start), start + 99999999), null);
});
test('v1 and v2 backups preserve legacy completion without creating new course completion', () => {
  for (const version of [1, 2]) {
    const old = {
      ...emptyData(),
      version,
      assessments: undefined,
      records: {
        'it-business': {
          status: 'completed',
          bookmarked: true,
          attempts: 1,
          lastCorrect: true,
          updatedAt: '2026-10-24T10:00:00Z',
        },
      },
    };
    const data = validateData(old);
    assert.equal(data.version, 5);
    assert.equal(data.records['it-business']!.status, 'completed');
    assert.equal(data.records['ip-organization'], undefined);
    assert.deepEqual(data.assessments, {});
  }
});
test('v3 backups preserve answers, flags, deadlines, versions and scored history; merge by attempt', () => {
  const data = emptyData();
  const attempt = newAttempt(mock, 'timed');
  attempt.answers[mock.questions[0]!.id] = 2;
  attempt.flags = [mock.questions[0]!.id];
  data.assessments[mock.id] = [attempt];
  assert.deepEqual(validateData(JSON.parse(JSON.stringify(data))), data);
  const incoming = structuredClone(data);
  incoming.assessments[mock.id]![0]!.updatedAt = new Date(Date.parse(attempt.updatedAt) + 1000).toISOString();
  incoming.assessments[mock.id]![0]!.cursor = 4;
  const merged = mergeData(data, incoming);
  assert.equal(merged.assessments[mock.id]!.length, 1);
  assert.equal(merged.assessments[mock.id]![0]!.cursor, 4);
  const old = { ...mock, version: 'older-v1' };
  const oldAttempt = newAttempt(old, 'practice');
  merged.assessments[mock.id]!.push(oldAttempt);
  assert.equal(validateData(merged).assessments[mock.id]!.length, 2);
  assert.throws(() => gradeAttempt(mock, oldAttempt));
});
test('invalid assessment backups are rejected including malformed answers and inconsistent scores', () => {
  const a = newAttempt(mock, 'timed');
  for (const change of [
    { cursor: 100 },
    { answers: { 'bad-question': 100 } },
    { flags: ['<script>'] },
    { total: -1 },
    { deadline: 'yesterday' },
    { fields: {} },
    { score: 20 },
    { mode: 'stopped' },
    { version: '<script>' },
  ]) {
    const data = emptyData();
    data.assessments[mock.id] = [{ ...a, ...change } as typeof a];
    assert.throws(() => validateData(data), JSON.stringify(change));
  }
  const scored = gradeAttempt(mock, a);
  scored.fields.strategy!.correct = 1;
  const data = emptyData();
  data.assessments[mock.id] = [scored];
  assert.throws(() => validateData(data));
});
test('assessment answers and records survive a real IndexedDB close and reopen', async () => {
  Object.assign(globalThis, {
    indexedDB,
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  });
  const s = new StudyStorage();
  await s.init();
  const a = newAttempt(mock, 'timed');
  a.answers[mock.questions[0]!.id] = 3;
  await s.update((d) => {
    d.assessments[mock.id] = [a];
  });
  s.close();
  const reopened = new StudyStorage();
  await reopened.init();
  assert.equal(reopened.data.assessments[mock.id]![0]!.answers[mock.questions[0]!.id], 3);
  assert.equal(reopened.data.assessments[mock.id]![0]!.deadline, a.deadline);
  reopened.close();
});
