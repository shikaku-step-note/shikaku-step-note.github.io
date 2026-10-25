import { bookkeepingArithmetic } from './bookkeeping-arithmetic';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { bokiAssessments, bokiCourses, bokiVersion } from '../src/data/bookkeeping';
import { bokiCoverage } from '../src/data/boki-coverage';
import { allAssessments } from '../src/data/assessments';
import { ipAssessments } from '../src/data/it-passport';
import {
  newAttempt,
  gradeAttempt,
  isCorrect,
  practicePoints,
  fieldPoints,
  remainingSeconds,
  compatibleAttempt,
} from '../src/lib/assessment';
import { emptyData, validateData, mergeData, StudyStorage } from '../src/lib/storage';
import { indexedDB } from 'fake-indexeddb';
const entries = readdirSync('src/content/lessons')
  .filter((n) => n.endsWith('.md'))
  .map((n) => {
    const raw = readFileSync(`src/content/lessons/${n}`, 'utf8');
    return {
      data: parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)![1]!),
      body: raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, ''),
    };
  });
const lessons = entries.filter(
  (l) => bokiCourses.some((c) => c.id === l.data.qualification) && !l.data.archived,
);
const tests = bokiAssessments(entries);
const mock = tests.find((a) => a.id === 'boki-2-mock')!;
test('five bookkeeping tracks have substantive lessons, distinct identifiers and honest source coverage', () => {
  assert.equal(lessons.length, 40);
  assert.deepEqual(
    bokiCourses.map((c) => lessons.filter((l) => l.data.qualification === c.id).length),
    [4, 4, 8, 10, 14],
  );
  assert.equal(new Set(entries.map((l) => l.data.stableId)).size, entries.length);
  for (const c of bokiCourses) {
    const rows = lessons.filter((l) => l.data.qualification === c.id);
    assert.deepEqual([...new Set(rows.map((l) => l.data.unit))].sort(), [1, 2]);
    for (const row of bokiCoverage[c.id]!) {
      assert.ok(row.official);
      assert.ok(row.note);
      assert.ok(row.lessons.every((id) => rows.some((l) => l.data.stableId === id)));
    }
    for (const l of rows) {
      assert.equal(l.data.sample, false);
      assert.ok(
        l.body.replace(/\s/g, '').length >= (c.id.includes('beginner') ? 1200 : 2400),
        l.data.stableId,
      );
      assert.equal(l.data.glossary.length, 4);
      assert.ok(l.body.includes('## '));
    }
  }
  assert.ok(
    entries.filter((l) => l.data.stableId.startsWith('boki-')).every((l) => l.data.archived && l.data.sample),
  );
  assert.equal(ipAssessments(entries).length, 86, 'Bookkeeping must not leak into the IP registry');
  assert.equal(new Set(allAssessments(entries).map((a) => a.id)).size, allAssessments(entries).length);
});
test('all lesson, glossary, review and mock questions are valid and link to their own course', () => {
  for (const a of tests) {
    assert.ok(a.questions.length);
    assert.equal(new Set(a.questions.map((q) => q.id)).size, a.questions.length, a.id);
    for (const q of a.questions) {
      assert.ok(
        lessons.some((l) => l.data.stableId === q.lesson && l.data.qualification === a.qualification),
        `${a.id}: ${q.lesson}`,
      );
      assert.ok(q.explanation.length > 12);
      assert.ok(a.fieldNames?.[q.field]);
      if (q.input) {
        assert.ok(q.accepted?.length);
        for (const answer of q.accepted!) assert.ok(isCorrect(q, answer));
      } else {
        assert.ok(q.options[q.answer]);
        assert.equal(new Set(q.options).size, q.options.length);
        assert.ok(q.options.length >= 3);
      }
    }
  }
  assert.equal(tests.filter((a) => a.kind === 'lesson').length, 40);
  assert.equal(tests.filter((a) => a.kind === 'glossary').length, 15);
  assert.equal(tests.filter((a) => a.kind === 'review').length, 15);
});
test('six mocks have correct limits, independent original questions, group structure and weighted points', () => {
  const mocks = tests.filter((a) => a.kind === 'mock');
  assert.equal(mocks.length, 6);
  const times = [40, 40, 60, 90, 90, 90];
  const lessonPrompts = new Set(
    tests.filter((a) => a.kind === 'lesson').flatMap((a) => a.questions.map((q) => q.prompt)),
  );
  for (const [i, a] of mocks.entries()) {
    assert.equal(a.minutes, times[i]);
    assert.ok(a.instructions?.includes('独自'));
    assert.equal(
      a.questions.reduce((n, q) => n + (q.points ?? 1), 0),
      a.qualification === 'boki-1' ? 50 : 100,
    );
    assert.equal(new Set(a.questions.map((q) => q.prompt)).size, a.questions.length);
    assert.ok(a.questions.every((q) => !lessonPrompts.has(q.prompt)));
    const attempt = newAttempt(a, 'timed', 0);
    for (const q of a.questions) attempt.answers[q.id] = q.input ? q.accepted![0]! : q.answer;
    const graded = gradeAttempt(a, attempt, 60000);
    assert.equal(graded.score, a.questions.length);
    assert.equal(practicePoints(a, graded), a.qualification === 'boki-1' ? 50 : 100);
    if (a.qualification === 'boki-1')
      assert.ok(Object.values(fieldPoints(a, graded)).every((f) => f.total === 25 && f.score === 25));
  }
  assert.equal(
    new Set(mocks.find((a) => a.qualification === 'boki-3')!.questions.map((q) => q.group)).size,
    3,
  );
  assert.equal(new Set(mock.questions.map((q) => q.group)).size, 5);
});
test('typed answers normalize finite decimals, Japanese digits and spacing while rejecting invalid input', () => {
  const q = mock.questions[0]!;
  for (const correct of ['４００', ' 400円 ', '0,400', '400.00']) assert.ok(isCorrect(q, correct), correct);
  for (const wrong of ['', 'Infinity', 'NaN', '4e2', '399', '<script>400</script>'])
    assert.equal(isCorrect(q, wrong), false, wrong);
  const text = tests.find((a) => a.id === 'boki-beginner-mock')!.questions[1]!;
  assert.ok(isCorrect(text, ' 備品 '));
  assert.equal(isCorrect(text, '商品'), false);
  const altered = { ...mock, version: 'boki-2027-v1' };
  assert.equal(compatibleAttempt(altered, newAttempt(mock, 'practice')), false);
});
test('v3 IP history migrates alongside v4 written bookkeeping answers without completing new lessons', () => {
  const ip = ipAssessments(entries).find((a) => a.kind === 'mock')!;
  const old = emptyData();
  const oldAttempt = newAttempt(ip, 'timed', Date.parse('2026-10-24T00:00:00Z'));
  oldAttempt.answers[ip.questions[0]!.id] = 1;
  old.assessments[ip.id] = [oldAttempt];
  old.records['boki-purpose'] = {
    status: 'completed',
    bookmarked: true,
    updatedAt: oldAttempt.updatedAt,
    attempts: 1,
  };
  const migrated = validateData({ ...old, version: 3 });
  assert.equal(migrated.version, 4);
  assert.equal(migrated.records['b3-cash'], undefined);
  assert.equal(migrated.records['boki-purpose']!.status, 'completed');
  assert.deepEqual(migrated.assessments[ip.id], [oldAttempt]);
  const incoming = emptyData();
  const attempt = newAttempt(mock, 'timed', Date.parse('2026-10-25T00:00:00Z'));
  attempt.answers[mock.questions[0]!.id] = '４００';
  attempt.flags = [mock.questions[1]!.id];
  incoming.assessments[mock.id] = [attempt];
  const merged = mergeData(migrated, incoming);
  const roundtrip = validateData(JSON.parse(JSON.stringify(merged)));
  assert.equal(roundtrip.assessments[mock.id]![0]!.answers[mock.questions[0]!.id], '４００');
  assert.equal(remainingSeconds(roundtrip.assessments[mock.id]![0]!, Date.parse('2026-10-25T02:00:00Z')), 0);
  assert.ok(roundtrip.records['boki-purpose']);
  for (const bad of ['x'.repeat(81), {}, true]) {
    const invalid = structuredClone(incoming);
    invalid.assessments[mock.id]![0]!.answers[mock.questions[0]!.id] = bad as string;
    assert.throws(() => validateData(invalid));
  }
});
test('weighted bookkeeping answers and flags persist after IndexedDB close and reopen', async () => {
  Object.assign(globalThis, {
    indexedDB,
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  });
  const first = new StudyStorage();
  await first.init();
  const a = newAttempt(mock, 'timed');
  a.answers[mock.questions[0]!.id] = '400';
  a.flags = [mock.questions[2]!.id];
  await first.update((data) => {
    data.assessments[mock.id] = [a];
  });
  first.close();
  const second = new StudyStorage();
  await second.init();
  assert.deepEqual(second.data.assessments[mock.id]![0]!.answers, a.answers);
  assert.deepEqual(second.data.assessments[mock.id]![0]!.flags, a.flags);
  assert.equal(second.data.assessments[mock.id]![0]!.deadline, a.deadline);
  second.close();
});
test('independent arithmetic checks audit worked answers in the lesson and mock banks', () => {
  const check = (id: string, part: number, answer: number) => {
    const q = tests.find((a) => a.id === id)!.questions[part - 1]!;
    assert.ok(isCorrect(q, String(Number(answer.toPrecision(12)))), `${id} question ${part}`);
  };
  check('b2-sales-check', 2, 96 * (500 - 470));
  check('b2-finance-check', 3, 1000 * (145 - 140));
  check('b2-consolidation-check', 1, 900000 - 1000000 * 0.8);
  check('b1-departments-check', 1, (80000 + 0.4 * 30000) / (1 - 0.4 * 0.2));
  check('b1-cvp-model-check', 1, (90000 - 50000) / (300 - 100));
  check('b1-decisions-check', 3, 121000 / 1.1 - 100000);
  check('boki-3-mock', 11, 10 * 200 + 5 * 230);
  check('boki-3-mock', 16, 20000 + 180000 - 25000);
  check('boki-2-mock', 24, 160000 / (2000 - 1200));
  check('boki-1-mock-front', 13, 2000000 * (640000 / 1600000));
  check('boki-1-mock-back', 14, 242000 / 1.1 - 200000);
  assert.equal(bokiVersion, 'boki-2026-v1');
});

test('every numeric answer has an independently calculated reference', () => {
  let count = 0;
  for (const a of tests.filter((a) => a.kind === 'lesson' || a.kind === 'mock')) {
    const key = a.kind === 'lesson' ? a.id.replace(/-check$/, '') : a.id;
    const values = bookkeepingArithmetic[key];
    assert.ok(values, key);
    assert.equal(values.length, a.questions.length, key);
    a.questions.forEach((q, i) => {
      if (q.input === 'number') {
        const value = values[i];
        assert.equal(typeof value, 'number', q.id);
        assert.ok(isCorrect(q, String(Number(value!.toPrecision(12)))), q.id);
        count++;
      }
    });
  }
  assert.ok(count > 190);
});

test('assessment order and course membership stay stable when collection input order changes', () => {
  const baseline = bokiAssessments(entries);
  const reversed = bokiAssessments([...entries].reverse());
  assert.deepEqual(reversed, baseline);
  for (const course of bokiCourses) {
    const one = bokiAssessments(entries.filter((l) => l.data.qualification === course.id));
    assert.ok(one.every((a) => a.qualification === course.id));
  }
});
