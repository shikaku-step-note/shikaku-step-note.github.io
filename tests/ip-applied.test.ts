import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ipAssessments, questionBank, ipVersion, ipDepthBank, ipTextbookBank, ipTextbookVersion } from '../src/data/it-passport';
import { isCorrect, assessmentMaterialIssues, compatibleAttempt, newAttempt } from '../src/lib/assessment';

test('all current lesson checks gain input practice without changing legacy mock records', () => {
  const fixtures = Object.keys(questionBank).map((stableId) => ({
    data: { stableId, title: stableId, qualification: 'it-passport', unit: 1, glossary: [] },
  }));
  const tests = ipAssessments(fixtures);
  const expanded = tests.filter((a) => a.kind === 'lesson' && a.version !== ipVersion);
  assert.deepEqual(expanded.map((a) => a.id).sort(), Object.keys(questionBank).map((id) => id + '-check').sort());
  for (const a of expanded) {
    const questions = a.questions.filter((q) => q.id.includes('-apply-') && (q.input === 'number' || q.input === 'text'));
    assert.equal(questions.length, a.id === 'ip-finance-check' ? 3 : 2);
    for (const q of questions) {
      assert.equal(isCorrect(q, q.accepted![0]), true);
      assert.equal(isCorrect(q, ''), false);
      assert.equal(isCorrect(q, q.accepted![0] + '1'), false);
    }
  }
  const finance = expanded.find((a) => a.id === 'ip-finance-check')!.questions.find((q) => q.id === 'ip-finance-apply-1')!;
  assert.equal(isCorrect(finance, '\uFF12\uFF14\uFF10'), true);
  assert.equal(isCorrect(finance, '2,4,0'), false);
  assert.equal(isCorrect(finance, '2 40'), false);
  const project = expanded.find((a) => a.id === 'ip-project-check')!.questions.find((q) => q.id === 'ip-project-apply-2')!;
  assert.equal(isCorrect(project, '\u22128'), true);
  assert.equal(isCorrect(project, '8'), false);
  const mock = tests.find((a) => a.id === 'ip-mock-01')!;
  assert.equal(mock.minutes, 120);
  assert.equal(mock.questions.length, 100);
  assert.ok(mock.questions.every((q) => !q.input && q.options.length === 4));
});

test('the two mock forms use separate versioned banks in the official task format', () => {
  const forms = ipAssessments([]).filter((a) => a.kind === 'mock');
  assert.deepEqual(forms.map((a) => a.id), ['ip-mock-01', 'ip-mock-02']);
  assert.equal(forms[0]!.version, ipVersion);
  assert.notEqual(forms[1]!.version, ipVersion);
  const all = forms.flatMap((a) => a.questions);
  assert.equal(new Set(all.map((q) => q.id)).size, 200);
  assert.equal(new Set(all.map((q) => q.prompt)).size, 200);
  for (const a of forms) {
    assert.equal(a.minutes, 120);
    assert.deepEqual(['strategy', 'management', 'technology'].map((field) => a.questions.filter((q) => q.field === field).length), [35, 20, 45]);
    for (const q of a.questions) {
      assert.ok(!q.input && new Set(q.options).size === 4 && q.options[q.answer] && q.explanation.trim());
    }
  }
});

test('mock 2 numerical keys agree with independent calculations', () => {
  const mock = ipAssessments([]).find((a) => a.id === 'ip-mock-02')!;
  const examples: [string, string][] = [
    ['120\u4ef6\u306e\u5185\u8a33', String(Math.ceil((120 * .6 - 48) / 30) + 1)],
    ['135,000\u5186', ((1200 - 750) * 400 - 135000).toLocaleString('en-US') + '\u5186'],
    ['\u6d41\u52d5\u8cc7\u7523180\u4e07', String(180 / 120 * 100) + '\uff05'],
    ['B\u306f8\u65e5', String(4 + Math.max(8, 6) + 3) + '\u65e5'],
    ['40,000\u5206', String((40000 - 80) / 40000 * 100) + '\uff05'],
    ['1100\u30681010', (12 ^ 10).toString(2).padStart(4, '0')],
    ['RGB\u753b\u50cf', (1000 * 800 * 24 / 8).toLocaleString('en-US') + '\u30d0\u30a4\u30c8'],
    ['40 MB\u306e\u30d5\u30a1\u30a4\u30eb', String(40 * 8 / 16) + '\u79d2'],
  ];
  for (const [snippet, expected] of examples) {
    const q = mock.questions.find((q) => q.prompt.includes(snippet));
    assert.ok(q, snippet);
    assert.equal(q.options[q.answer], expected, q.id);
  }
});

test('fresh cumulative review spans the units and uses validated inputs', () => {
  const review = ipAssessments([]).find((a) => a.id === 'ip-applied-review')!;
  assert.equal(review.questions.length, 23);
  const expected: [number, number][] = [
    [1, (72 + 36 + 27) * 100 / 180], [3, 378 * 100 / 420], [5, 12 * (180 / 15)],
    [6, (25 - 20) * 100 / 25], [10, 2 + Math.max(6, 8) + 4],
    [11, (50000 - 150) * 100 / 50000], [13, parseInt('11101', 2)], [14, 6 + 2 + 8],
    [15, 40 / 25], [16, Number((1 - (1 - .8) ** 2).toFixed(2))],
    [19, 21 * 100 / 30], [20, 500 * 300 * 32 / 8], [21, 7 + 8], [22, 48 * 8 / 24],
  ];
  assert.equal(review.questions.filter((q) => q.input === 'number').length, expected.length);
  for (const [position, key] of expected) {
    const question = review.questions[position - 1]!;
    assert.equal(question.input, 'number');
    assert.ok(isCorrect(question, String(key)), question.id);
    assert.ok(!isCorrect(question, String(key + 1)), question.id);
  }
});

test('cross-field scenarios link fresh questions to their documents and score independently', () => {
  const cases = ipAssessments([]).find((a) => a.id === 'ip-integrated-cases')!;
  assert.deepEqual(assessmentMaterialIssues(cases), []);
  assert.equal(cases.materials?.length, 5);
  assert.equal(cases.questions.length, 12);
  assert.equal(new Set(cases.questions.map((q) => q.prompt)).size, 12);
  assert.deepEqual(new Set(cases.questions.map((q) => q.field)), new Set(['strategy', 'management', 'technology']));
  for (const [index, expected] of [
    [1, (2 + Math.max(4, 6) + 3) + '\u65e5'],
    [4, (48000 + 12 * (9000 + 2400 * .75 * 4)).toLocaleString('en-US') + '\u5186'],
  ] as const) {
    const q = cases.questions[index]!;
    assert.equal(q.options[q.answer], expected);
  }
  assert.equal(cases.questions[5]!.answer, (80 <= 90 && 20 > 15) ? 1 : -1);
  assert.equal(cases.questions[7]!.answer, [6 / 30, 5 / 20, 3 / 10].indexOf(.3));
  assert.ok(cases.questions.slice(10).every((question) => question.materialIds?.length === 2));
  const comparison = cases.questions[11]!;
  const difference = (48000 + 12 * (9000 + 2400 * .75 * 4)) - (72000 + 12 * 13000);
  assert.ok(comparison.options[comparison.answer]!.includes(difference.toLocaleString('en-US')));
});

test('each upgraded lesson has fresh graded practice and retains the prior question IDs', () => {
  const lessonIds = Object.keys(questionBank).sort();
  assert.deepEqual(Object.keys(ipDepthBank).sort(), lessonIds);
  const fixtures = lessonIds.map((stableId) => ({
    data: { stableId, title: stableId, qualification: 'it-passport', unit: 1, glossary: [] },
  }));
  const assessments = ipAssessments(fixtures).filter((a) => a.kind === 'lesson');
  const allAddedIds = new Set<string>();
  for (const assessment of assessments) {
    const lesson = assessment.id.slice(0, -'-check'.length);
    const added = ipDepthBank[lesson]!;
    const textbook = ipTextbookBank[lesson]!;
    assert.ok(textbook?.length, lesson);
    const old = { ...assessment, version: '2026-11-depth-v1', questions: assessment.questions.slice(0, -textbook.length) };
    assert.equal(assessment.version, ipTextbookVersion);
    assert.deepEqual(old.questions.slice(0, 3), questionBank[lesson]!.lesson);
    assert.equal(compatibleAttempt(assessment, newAttempt(old, 'practice')), false);
    for (const question of [...added, ...textbook]) {
      assert.equal(question.lesson, lesson);
      assert.ok(!allAddedIds.has(question.id), question.id);
      allAddedIds.add(question.id);
    }
  }
});
