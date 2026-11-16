import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import assert from 'node:assert/strict';
import { ipAssessments, questionBank, ipVersion, ipDepthBank, ipTextbookBank, ipTextbookVersion, ipLessonTransfer, ipLessonTransferVersion, ipMockVersions, ipUnitReviewVersion, ipApplicationVersion } from '../src/data/it-passport';
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
  assert.deepEqual(forms.map((form) => form.version), [...ipMockVersions]);
  assert.equal(compatibleAttempt(forms[0]!, newAttempt({ ...forms[0]!, version: ipVersion }, 'timed')), false);
  assert.equal(compatibleAttempt(forms[1]!, newAttempt({ ...forms[1]!, version: '2026-11-mock-02-v2' }, 'timed')), false);
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
    ['原料は5日ごと', String((5 + 3) * 6 + 9 - 24 - 7) + '個'],
    ['135,000\u5186', ((1200 - 750) * 400 - 135000).toLocaleString('en-US') + '\u5186'],
    ['\u6d41\u52d5\u8cc7\u7523180\u4e07', String(180 / 120 * 100) + '\uff05'],
    ['B\u306f8\u65e5', String(4 + Math.max(8, 6) + 3) + '\u65e5'],
    ['40,000\u5206', String((40000 - 80) / 40000 * 100) + '\uff05'],
    ['1100\u30681010', (12 ^ 10).toString(2).padStart(4, '0')],
    ['RGB\u753b\u50cf', (1000 * 800 * 24 / 8).toLocaleString('en-US') + '\u30d0\u30a4\u30c8'],
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
    const transfer = ipLessonTransfer[lesson] ?? [];
    const applicationCount = assessment.version === ipApplicationVersion ? 1 : 0;
    const old = { ...assessment, version: '2026-11-depth-v1', questions: assessment.questions.slice(0, -(textbook.length + transfer.length + applicationCount)) };
    assert.equal(assessment.version, applicationCount ? ipApplicationVersion : transfer.length ? ipLessonTransferVersion : ipTextbookVersion);
    if (transfer.length) {
      const oldTextbook = { ...assessment, version: ipTextbookVersion, questions: assessment.questions.slice(0, -(transfer.length + applicationCount)) };
      assert.equal(compatibleAttempt(assessment, newAttempt(oldTextbook, 'practice')), false);
    }
    assert.deepEqual(old.questions.slice(0, 3), questionBank[lesson]!.lesson);
    assert.equal(compatibleAttempt(assessment, newAttempt(old, 'practice')), false);
    for (const question of [...added, ...textbook, ...transfer]) {
      assert.equal(question.lesson, lesson);
      assert.ok(!allAddedIds.has(question.id), question.id);
      allAddedIds.add(question.id);
    }
  }
});

function lessonUnit(stableId: string): number {
  const file = readFileSync(new URL('../src/content/lessons/' + stableId + '.md', import.meta.url), 'utf8');
  const meta = parse(file.split('---')[1]!);
  assert.equal(typeof meta.unit, 'number', stableId);
  return meta.unit;
}

test('each of the 23 units adds one fresh transfer task without changing its original questions', () => {
  const fixtures = Object.keys(questionBank).map((stableId) => ({
    data: { stableId, title: stableId, qualification: 'it-passport', unit: lessonUnit(stableId), glossary: [] },
  }));
  const assessments = ipAssessments(fixtures);
  const units = assessments.filter((item) => item.kind === 'review' && item.unit);
  assert.equal(units.length, 23);
  const cumulative = assessments.find((item) => item.id === 'ip-review-all')!;
  for (const unit of units) {
    const recent = unit.questions.at(-1)!;
    assert.equal(unit.version, ipUnitReviewVersion);
    assert.ok(recent.id.includes('transfer') || recent.id.includes('cumulative'));
    assert.ok(recent.explanation.length > 30);
    assert.ok(cumulative.questions.every((q) => q.id !== recent.id));
    const older = { ...unit, version: ipVersion, questions: unit.questions.slice(0, -1) };
    assert.equal(compatibleAttempt(unit, newAttempt(older, 'practice')), false);
    assert.ok(isCorrect(recent, recent.input ? recent.accepted![0] : recent.answer));
  }
});

test('the final lesson uses separate evidence and checks scope, elapsed time and missing records', () => {
  const fixtures = [{ data: { stableId: 'ip-release-decision', title: '統合', qualification: 'it-passport', unit: 23, glossary: [] } }];
  const test = ipAssessments(fixtures).find((item) => item.id === 'ip-release-decision-check')!;
  assert.equal(test.questions.length, 6);
  assert.deepEqual(assessmentMaterialIssues(test), []);
  assert.equal(test.materials?.length, 2);
  for (const [i, key] of [[1, (12 + 8) / (320 + 680) * 100], [2, 60 - 20 + 18], [3, 20 - 6]] as const) {
    const q = test.questions[i]!;
    assert.ok(isCorrect(q, String(key)));
    assert.ok(!isCorrect(q, String(key + 1)));
    assert.ok(!isCorrect(q, ''));
  }
  assert.ok(isCorrect(test.questions[2]!, '５８'));
  assert.ok(!isCorrect(test.questions[2]!, '5,8'));
  assert.equal(test.questions[4]!.answer, 2);
  assert.equal(test.questions[5]!.answer, 3);
});

test('new mock and lesson numerics agree with independent reasoning', () => {
  const [first, second] = ipAssessments([]).filter((test) => test.kind === 'mock');
  const keys = [
    [first!, 'ip-mock-01-q-44', String(2 + Math.max(7, 6) + 2) + '日から' + String(2 + Math.max(7 - 3, 6) + 2) + '日へ短くなる。'],
    [first!, 'ip-mock-01-q-75', ((1 - (1 - 0.9) ** 2) * 0.98).toFixed(4)],
    [second!, 'ip-mock-02-q-74', String(100 * (1000 - 20) / 1000) + '％'],
    [second!, 'ip-mock-02-q-79', (1000 + 1500).toLocaleString('en-US') + '円'],
    [second!, 'ip-mock-02-q-87', '西' + (500 + 800).toLocaleString('en-US')],
  ] as const;
  for (const [form, id, expected] of keys) {
    const q = form.questions.find((q) => q.id === id)!;
    assert.equal(q.options[q.answer], expected);
  }
  for (const [slug, value] of [['statistics', (63 - 37) - (56 - 44)], ['computer', Math.min(80, 400 / 8, 65)], ['office-oss', 12 + 4], ['database', 2 + 1]] as const) {
    const q = ipLessonTransfer['ip-' + slug]!.find((q) => q.input === 'number')!;
    assert.ok(isCorrect(q, String(value)));
    assert.ok(!isCorrect(q, String(value + 1)));
  }
});

test('new IT Passport lessons extend the existing route and only reversion affected practice', () => {
  const additions = {
    'ip-source-bias-decision': ['ip-analysis', 1, 9],
    'ip-inventory-decisions': ['ip-reading-business-data', 1, 10],
    'ip-resource-planning': ['ip-reading-project-plans', 10, 8],
    'ip-regression-residuals': ['ip-statistics', 13, 8],
    'ip-function-trace': ['ip-algorithms', 14, 10],
    'ip-spreadsheet-lookups': ['ip-reading-spreadsheets', 17, 9],
  } as const;
  const existing = [...Object.keys(questionBank), 'ip-reading-business-data', 'ip-reading-project-plans', 'ip-reading-spreadsheets', 'ip-release-decision'];
  const chapters = [...new Set([...existing, ...Object.keys(additions)])].map((id) => {
    const raw = readFileSync(new URL('../src/content/lessons/' + id + '.md', import.meta.url), 'utf8');
    return { data: parse(raw.split('---')[1]!), raw };
  }).sort((a, b) => a.data.order - b.data.order);
  assert.deepEqual(chapters.map((chapter) => chapter.data.order), Array.from({ length: 47 }, (_, i) => i + 1));
  const fixture = ipAssessments(chapters);
  for (const [id, [previous, unit, size]] of Object.entries(additions)) {
    const index = chapters.findIndex((chapter) => chapter.data.stableId === id);
    assert.equal(chapters[index - 1]!.data.stableId, previous, id);
    const { data, raw } = chapters[index]!;
    assert.equal(data.unit, unit);
    assert.ok(raw.match(/<figure\b/g)!.length >= 2);
    assert.ok(raw.includes('data-guided-practice') && raw.includes('data-guided-solution'));
    const assessment = fixture.find((a) => a.id === id + '-check')!;
    assert.equal(assessment.version, ipApplicationVersion);
    assert.equal(assessment.questions.length, size);
    assert.ok(assessment.questions.every((q) => q.lesson === id));
    for (const question of assessment.questions) {
      const key = question.input ? question.accepted![0] : question.answer;
      assert.ok(isCorrect(question, key), question.id);
      assert.equal(isCorrect(question, ''), false, question.id);
    }
  }
  for (const unit of [1, 10, 13, 14, 17]) {
    const review = fixture.find((a) => a.id === 'ip-unit-' + unit + '-review')!;
    assert.equal(review.version, ipApplicationVersion);
    assert.equal(review.questions.filter((q) => q.id.includes('-application-')).length, unit === 1 ? 2 : 1);
    assert.equal(compatibleAttempt(review, newAttempt({ ...review, version: ipUnitReviewVersion }, 'practice')), false);
    assert.equal(fixture.find((a) => a.id === 'ip-unit-' + unit + '-glossary')!.version, ipApplicationVersion);
  }
  assert.equal(fixture.find((a) => a.id === 'ip-glossary-all')!.version, ipApplicationVersion);
  assert.equal(fixture.find((a) => a.id === 'ip-unit-2-review')!.version, ipUnitReviewVersion);
  assert.equal(fixture.find((a) => a.id === 'ip-unit-2-glossary')!.version, ipVersion);
  const residual = fixture.find((a) => a.id === 'ip-regression-residuals-check')!.questions[1]!;
  assert.ok(isCorrect(residual, '−５') && !isCorrect(residual, '5'));
  const oldVersions = ['2026-11-mock-01-v2', '2026-11-mock-02-v3'];
  for (const [index, mock] of fixture.filter((a) => a.kind === 'mock').entries()) {
    assert.equal(mock.questions.filter((q) => q.id.includes('-application-')).length, 6);
    assert.equal(compatibleAttempt(mock, newAttempt({ ...mock, version: oldVersions[index]! }, 'timed')), false);
  }
});
