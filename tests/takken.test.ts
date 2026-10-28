import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { indexedDB } from 'fake-indexeddb';
import { takkenAssessments, takkenOutline, takkenSources, takkenVersion } from '../src/data/takken';
import { takkenCoverageNotes } from '../src/data/takken-coverage';
import { allAssessments } from '../src/data/assessments';
import { ipAssessments } from '../src/data/it-passport';
import { bokiAssessments } from '../src/data/bookkeeping';
import { newAttempt, gradeAttempt, remainingSeconds, compatibleAttempt } from '../src/lib/assessment';
import { emptyData, validateData, mergeData, StudyStorage } from '../src/lib/storage';
const lessons = readdirSync('src/content/lessons')
  .filter((n) => n.endsWith('.md'))
  .map((n) => {
    const raw = readFileSync(`src/content/lessons/${n}`, 'utf8');
    return { data: parse(raw.split('---')[1]!), body: raw.replace(/^---[\s\S]*?---\s*/, '') };
  });
const course = lessons.filter((l) => l.data.qualification === 'takken');
const assessments = takkenAssessments(lessons);
const general = assessments.find((a) => a.id === 'takken-mock-general')!;
const exempt = assessments.find((a) => a.id === 'takken-mock-exempt')!;
test('34 substantive lessons cover the seven official domains, with stable identifiers and honest subtopic notes', () => {
  assert.equal(course.length, 34);
  assert.deepEqual([...new Set(takkenOutline.map((r) => r.domain))].sort(), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual([...new Set(takkenOutline.map((r) => r.unit))].sort(), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(new Set(lessons.map((l) => l.data.stableId)).size, lessons.length);
  for (const r of takkenOutline) {
    const l = course.find((l) => l.data.stableId === r.id)!;
    assert.ok(l, r.id);
    assert.equal(l.data.sample, false);
    assert.equal(l.data.archived, false);
    const bodyOnly = l.body
      .split('\n')
      .filter((line) => !/^#{1,6} /.test(line))
      .join('\n')
      .replace(/\s|[|*`>-]/g, '');
    assert.ok(bodyOnly.length >= 2200, `${r.id}: ${bodyOnly.length}`);
    assert.equal(l.data.glossary.length, 3);
    assert.deepEqual(l.data.glossary, r.glossary, `${r.id}: glossary source consistency`);
    assert.deepEqual(l.data.objectives, r.objectives, `${r.id}: objective source consistency`);
    assert.equal(l.data.objectives.length, 3);
    assert.ok(takkenCoverageNotes[r.id]?.length, r.id);
    assert.ok(
      r.sources.every((id) => takkenSources.some((s) => s.id === id)),
      r.id,
    );
  }
  assert.ok(takkenSources.every((s) => s.verified === '2026-10-25' && /^https:\/\//.test(s.url)));
});
test('registries remain isolated and every new choice and explanation links to its own lesson', () => {
  assert.equal(assessments.length, 54);
  assert.equal(ipAssessments(lessons).length, 86);
  assert.equal(bokiAssessments(lessons).filter(a=>a.qualification !== 'boki-beginner' && a.qualification !== 'cost-beginner').length, 54,
    'the four other bookkeeping tracks are unaffected by the beginner upgrade');
  const all = allAssessments(lessons);
  assert.equal(new Set(all.map((a) => a.id)).size, all.length);
  for (const a of assessments) {
    assert.equal(a.qualification, 'takken');
    assert.equal(a.version, takkenVersion);
    assert.ok(a.questions.length > 0 && a.questions.length <= 500, a.id);
    assert.equal(new Set(a.questions.map((q) => q.id)).size, a.questions.length, a.id);
    for (const q of a.questions) {
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.ok(q.answer >= 0 && q.answer < 4);
      assert.ok(q.explanation.includes(q.options[q.answer]!), q.id);
      assert.ok(
        course.some((l) => l.data.stableId === q.lesson),
        q.id,
      );
      assert.ok(a.fieldNames?.[q.field], q.id);
    }
  }
  assert.equal(
    assessments.filter((a) => a.kind === 'lesson').reduce((n, a) => n + a.questions.length, 0),
    136,
  );
  assert.equal(assessments.find((a) => a.id === 'takken-glossary-all')!.questions.length, 102);
});
test('both mock formats have exact timing and distribution, original question bank and explicit sharing', () => {
  assert.equal(general.questions.length, 50);
  assert.equal(general.minutes, 120);
  assert.equal(exempt.questions.length, 45);
  assert.equal(exempt.minutes, 110);
  assert.deepEqual(
    Object.fromEntries(
      '1234567'.split('').map((f) => [f, general.questions.filter((q) => q.field === f).length]),
    ),
    { '1': 2, '2': 14, '3': 8, '4': 2, '5': 3, '6': 1, '7': 20 },
  );
  assert.ok(
    exempt.questions.every(
      (q) => !['1', '5'].includes(q.field) && general.questions.some((g) => g.id === q.id),
    ),
  );
  const prompts = new Set(
    assessments.filter((a) => a.kind === 'lesson').flatMap((a) => a.questions.map((q) => q.prompt)),
  );
  assert.ok(general.questions.every((q) => !prompts.has(q.prompt)));
  assert.ok(exempt.instructions?.includes('共有'));
  assert.ok(general.instructions?.includes('合否判定は行いません'));
  for (const a of [general, exempt]) {
    const start = Date.UTC(2026, 9, 25, 8);
    const attempt = newAttempt(a, 'timed', start);
    for (const q of a.questions) attempt.answers[q.id] = q.answer;
    assert.equal(remainingSeconds(attempt, start), a.minutes! * 60);
    assert.equal(remainingSeconds(attempt, start + a.minutes! * 60000 + 5000), 0);
    const finished = gradeAttempt(a, attempt, start + a.minutes! * 60000 + 5000);
    assert.equal(finished.score, a.questions.length);
    assert.equal(
      Object.values(finished.fields).reduce((n, f) => n + f.correct, 0),
      a.questions.length,
    );
    assert.equal(remainingSeconds(newAttempt(a, 'practice', start), start + 1e9), null);
  }
});
test('new and historical records round-trip, merge, persist, and reject incompatible versions', async () => {
  const old = emptyData();
  old.records['ip-organization'] = {
    status: 'completed',
    bookmarked: true,
    updatedAt: '2026-10-24T10:00:00.000Z',
    attempts: 1,
  };
  const data = emptyData();
  const attempt = newAttempt(general, 'timed', Date.UTC(2026, 9, 25, 8));
  attempt.answers[general.questions[0]!.id] = general.questions[0]!.answer;
  attempt.flags = [general.questions[1]!.id];
  attempt.cursor = 2;
  data.assessments[general.id] = [attempt];
  data.records['tk-contract'] = {
    status: 'studying',
    bookmarked: true,
    updatedAt: data.savedAt,
    attempts: 0,
  };
  data.records['future-retained'] = {
    status: 'completed',
    bookmarked: false,
    updatedAt: data.savedAt,
    attempts: 0,
  };
  const combined = mergeData(old, data);
  const imported = validateData(JSON.parse(JSON.stringify(combined)));
  assert.deepEqual(imported.records, combined.records);
  assert.deepEqual(imported.assessments, combined.assessments);
  assert.equal(imported.records['ip-organization']!.status, 'completed');
  assert.equal(imported.records['future-retained']!.status, 'completed');
  assert.ok(compatibleAttempt(general, attempt));
  assert.equal(compatibleAttempt({ ...general, version: 'takken-2026-v2' }, attempt), false);
  assert.deepEqual(
    takkenAssessments(
      lessons.map((l) => ({ ...l, data: { ...l.data, title: l.data.title + '（改題）' } })),
    ).map((a) => a.id),
    assessments.map((a) => a.id),
  );
  Object.defineProperty(globalThis, 'indexedDB', { value: indexedDB, configurable: true });
  const storage = new StudyStorage();
  await storage.init();
  await storage.replace(imported);
  storage.close();
  const reopened = new StudyStorage();
  await reopened.init();
  assert.deepEqual(reopened.data.assessments[general.id], imported.assessments[general.id]);
  reopened.close();
  const invalid = structuredClone(imported);
  invalid.assessments[general.id]![0]!.total = 501;
  assert.throws(() => validateData(invalid));
  assert.throws(() => validateData({ app: 'other', version: 4 }));
});
test('independent arithmetic checks agree with each selected correct answer', () => {
  const find = (lesson: string, index: number) =>
    assessments.find((a) => a.id === `${lesson}-check`)!.questions[index]!;
  const examples: [string, number, string][] = [
    ['tk-mortgage', 0, `${1200 - 800}万円`],
    ['tk-performance', 0, `${100 - 60}万円`],
    ['tk-remedies', 3, `${100 * 2}万円`],
    ['tk-lease', 3, `${10 - 3 - 2}万円`],
    ['tk-inheritance', 0, `1,${6000 / 2 / 2 - 1000}万円`],
    ['tk-condo', 0, `${Math.ceil(70 * 0.75)}人`],
    ['tk-practitioner', 0, `${Math.ceil(11 / 5)}人`],
    ['tk-guarantee', 0, (1000 + 500 * 2).toLocaleString('ja-JP') + '万円'],
    ['tk-guarantee', 1, `${60 + 30 * 2}万円`],
    ['tk-guarantee', 2, `${1000 * 0.9}万円`],
    ['tk-document', 2, (3000 - 200).toLocaleString('ja-JP') + '万円'],
    ['tk-protection', 1, `${3000 * 0.2}万円`],
    ['tk-protection', 2, `${4000 * 0.05}万円`],
    ['tk-reward', 0, '39万6,000円'],
    ['tk-reward', 1, '4万4,000円'],
    ['tk-density', 0, `${200 * 0.6}平方メートル`],
    ['tk-density', 1, `${200 * Math.min(2, 4 * 0.4)}平方メートル`],
    ['tk-density', 2, `${100 * 0.6 + 200 * 0.8}平方メートル`],
    ['tk-density', 3, `${200 * (0.6 + 0.1)}平方メートル`],
    ['tk-readjustment', 1, `${((200 - 160) / 200) * 100}％`],
    ['tk-tax', 1, '4万2,000円'],
    ['tk-tax', 3, `${1000 * 0.03}万円`],
    ['tk-transfer-tax', 0, (4000 - 2500 - 200).toLocaleString('ja-JP') + '万円'],
    ['tk-transfer-tax', 2, `${3800 - 3000}万円`],
    ['tk-transfer-tax', 3, `${1000 * (0.15 + 0.05)}万円`],
    ['tk-valuation', 1, (400 / 0.05).toLocaleString('ja-JP') + '万円'],
    ['tk-valuation', 2, (3000 - 600).toLocaleString('ja-JP') + '万円'],
    ['tk-supply', 0, `${Math.ceil(650 / 80)}分`],
    ['tk-land', 2, `${(150 - 148) * 20}万円`],
    ['tk-structure', 3, `${3000 / 60}万円毎平方メートル`],
  ];
  for (const [id, index, expected] of examples) {
    const q = find(id, index);
    assert.ok(q.options[q.answer]!.includes(expected), `${q.id}: expected ${expected}`);
  }
  const mockExpected: Record<number, string> = {
    6: `配当${1500 - 900}万円、未回収${700 - (1500 - 900)}万円`,
    7: `Aの債権${150 - 90}万円`,
    10: (9000 / 2 / 2).toLocaleString('ja-JP') + '万円',
    11: `${60 * 0.75}人`,
    18: `${250 * Math.min(2, 5 * 0.4)}平方メートル`,
    21: `${((300 - 255) / 300) * 100}％`,
    24: `${5500 - 2000 - 300 - 3000}万円`,
    25: ((25 * 12) / 0.05).toLocaleString('ja-JP') + '万円',
    28: `${Math.ceil(21 / 5)}人`,
    31: (1000 + 500 * 3).toLocaleString('ja-JP') + '万円',
    32: `${800 * 0.9}万円`,
    47: `${Math.ceil(890 / 80)}分`,
  };
  for (const [n, expected] of Object.entries(mockExpected)) {
    const q = general.questions[Number(n) - 1]!;
    assert.ok(q.options[q.answer]!.includes(expected), `${q.id}: ${expected}`);
  }
  assert.equal(Math.round((10000000 * 0.03 + 60000) * 1.1), 396000);
  assert.equal(80000 * 0.55, 44000);
  assert.equal((18000000 / 6) * 0.014, 42000);
});
