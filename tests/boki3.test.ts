import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { bokiAssessments } from '../src/data/bookkeeping';
import {
  boki3LessonIds,
  boki3RetainedIds,
  boki3Bank,
  boki3ReviewBank,
  boki3Version,
  boki3Workload,
} from '../src/data/boki3';
import coverage from '../src/data/boki3-coverage.json';
import plan from '../docs/boki-3/competency-plan.json';
import caseA from '../docs/boki-3/case-a-ledger.json';
import caseB from '../docs/boki-3/capstone-b-ledger-witness.json';
import mockPeer from '../docs/boki-3/peer-mocks-witnesses.json';
import {
  assessmentMaterialIssues,
  canonicalJournal,
  newAttempt,
  gradeAttempt,
  practicePoints,
  remainingSeconds,
  compatibleAttempt,
  isCorrect,
} from '../src/lib/assessment';
import { emptyData, validateData, mergeData } from '../src/lib/storage';
import { selectCourseLessons } from '../src/lib/course-progress';

const entries = readdirSync('src/content/lessons')
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const raw = readFileSync(`src/content/lessons/${name}`, 'utf8');
    return { data: parse(raw.split('---')[1]!), body: raw.split('---').slice(2).join('---') };
  });
const rows = entries
  .filter((row) => row.data.qualification === 'boki-3' && !row.data.archived)
  .sort((a, b) => a.data.order - b.data.order);
const assessments = bokiAssessments(entries).filter((a) => a.qualification === 'boki-3');
const questions = new Map(assessments.flatMap((a) => a.questions.map((q) => [q.id, q] as const)));

test('grade3 shared tree has substantive teaching and applied review for every detailed objective', () => {
  assert.deepEqual(
    rows.map((row) => row.data.stableId),
    boki3LessonIds,
  );
  assert.equal(rows.length, 55);
  const detailed = rows.filter((row) => !boki3RetainedIds.includes(row.data.stableId));
  assert.equal(detailed.length, 47);
  for (const row of detailed) {
    const id = row.data.stableId;
    const body = row.body
      .split(/^## (?:公式資料と確認日|公式の参照資料)$/m)[0]!
      .replace(/^#{1,6}[^\n]*$/gm, '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s/g, '');
    // A regression guard only. The syllabus matrix and separate content review establish relevance.
    assert.ok(
      body.length >= (id === 'b3x-deposits' ? 3400 : id.includes('closing-case') ? 7000 : 4000),
      `${id}: unexplained loss of teaching content`,
    );
    assert.equal(row.data.sample, false);
    assert.ok(row.data.objectives.length >= 3);
    for (let objective = 0; objective < row.data.objectives.length; objective++) {
      assert.ok(row.body.includes(`id="objective-${objective + 1}"`), id);
      assert.ok(row.body.includes(`id="worked-${objective + 1}"`), id);
      assert.ok(
        boki3Bank[id]!.some((q) => q.objectives?.includes(objective)),
        `${id}: lesson objective${objective}`,
      );
      assert.ok(
        boki3ReviewBank[`unit-${row.data.unit}`]!.some(
          (q) => q.lesson === id && q.objectives?.includes(objective),
        ),
        `${id}: independent review objective${objective}`,
      );
    }
  }
  assert.equal(Object.values(boki3Bank).flat().length, 635);
  const reviewed = Object.values(boki3ReviewBank).flat();
  assert.equal(reviewed.length, 148);
  assert.equal(new Set(reviewed.map((q) => q.id)).size, 148);
  const lessonIds = new Set(
    Object.values(boki3Bank)
      .flat()
      .map((q) => q.id),
  );
  assert.ok(reviewed.every((q) => !lessonIds.has(q.id)));
  const workload = boki3Workload(rows);
  assert.equal(
    workload.lessonMinutes,
    rows.reduce((sum, row) => sum + row.data.minutes, 0),
  );
  assert.ok(workload.total > workload.lessonMinutes + 1500);
});

test('current scope maps real teaching anchors and practice; four future-only items are separate', () => {
  assert.equal(coverage.length, 61);
  assert.equal(plan.competencies.length, 65);
  for (const item of coverage) {
    assert.ok(item.independentQuestionIds.length && item.unitReviewQuestionIds.length, item.id);
    for (const anchor of [
      ...item.teachingAnchors,
      ...item.workedExamples,
      ...item.independentPracticeAnchors,
    ]) {
      const row = rows.find((row) => row.data.stableId === anchor.lesson);
      assert.ok(row?.body.includes(`id="${anchor.anchor}"`), `${item.id}: ${anchor.lesson}#${anchor.anchor}`);
    }
    for (const id of [...item.independentQuestionIds, ...item.unitReviewQuestionIds, ...item.mockQuestionIds])
      assert.ok(questions.has(id), id);
  }
  assert.ok(
    plan.competencies
      .slice(61)
      .every((row) => row.releaseStatus === 'future-not-current' && row.independentQuestionIds.length === 0),
  );
});

test('all answer models are gradable and current lesson questions are uniquely registered', () => {
  const current = assessments.filter((a) => a.kind === 'lesson');
  assert.equal(current.length, 55);
  assert.equal(current.flatMap((a) => a.questions).length, 667);
  assert.equal(new Set(current.flatMap((a) => a.questions.map((q) => q.id))).size, 667);
  for (const a of assessments) {
    assert.deepEqual(assessmentMaterialIssues(a), [], a.id);
    for (const q of a.questions) {
      const model = q.accepted?.[0] ?? q.answer;
      assert.ok(isCorrect(q, model), q.id);
      if (q.input === 'journal') {
        assert.ok(canonicalJournal(model, q.journal!.accounts), q.id);
        const invalid = JSON.parse(String(model));
        invalid.debits[0].amount = Number(invalid.debits[0].amount) + 1;
        assert.ok(!isCorrect(q, JSON.stringify(invalid)), `${q.id}: unbalanced answer`);
      }
    }
  }
});

test('retained eight completions and old results survive without completing the new47', () => {
  const old = emptyData();
  for (const id of boki3RetainedIds)
    old.records[id] = {
      status: 'completed',
      bookmarked: true,
      attempts: 1,
      updatedAt: '2026-10-25T00:00:00Z',
    };
  for (const id of ['b3-credit-check', 'b3-inventory-check', 'b3-cash-check']) {
    const a = assessments.find((item) => item.id === id)!;
    old.assessments[id] = [newAttempt({ ...a, version: 'boki-2026-v1' }, 'practice', 1000)];
  }
  old.records['unknown-future-content'] = {
    status: 'studying',
    bookmarked: false,
    attempts: 0,
    updatedAt: '2026-10-28T00:00:00Z',
  };
  const restored = validateData(JSON.parse(JSON.stringify(old)));
  const current = selectCourseLessons(
    entries.map((row) => ({
      id: row.data.stableId,
      qualification: row.data.qualification,
      archived: row.data.archived,
    })),
    'boki-3',
  );
  assert.equal(current.length, 55);
  assert.equal(current.filter((row) => restored.records[row.id]?.status === 'completed').length, 8);
  assert.equal(
    current.filter((row) => row.id.startsWith('b3x-') && restored.records[row.id]?.status === 'completed')
      .length,
    0,
  );
  assert.ok(
    !compatibleAttempt(
      assessments.find((a) => a.id === 'b3-credit-check')!,
      restored.assessments['b3-credit-check']![0]!,
    ),
  );
  assert.ok(
    !compatibleAttempt(
      assessments.find((a) => a.id === 'b3-inventory-check')!,
      restored.assessments['b3-inventory-check']![0]!,
    ),
  );
  assert.ok(
    compatibleAttempt(
      assessments.find((a) => a.id === 'b3-cash-check')!,
      restored.assessments['b3-cash-check']![0]!,
    ),
  );
  assert.ok(!questions.has('b3-credit-q5'));
  assert.match(questions.get('b3-inventory-q2')!.prompt, /10個・単価100円/);
  const next = emptyData();
  next.records['b3x-journal'] = {
    status: 'studying',
    bookmarked: false,
    attempts: 0,
    updatedAt: '2026-10-28T00:00:00Z',
  };
  const merged = validateData(JSON.parse(JSON.stringify(mergeData(restored, next))));
  assert.deepEqual(merged.assessments, restored.assessments);
  assert.ok(merged.records['b3-cash']?.bookmarked);
  assert.ok(merged.records['unknown-future-content']);
  assert.equal(merged.records['b3x-journal']?.status, 'studying');
});

test('two independent60minute mocks retain structured journals, materials, points and absolute deadlines', () => {
  const prompts = new Set<string>();
  for (const form of ['a', 'b']) {
    const a = assessments.find((a) => a.id === `b3x-mock-${form}`)!;
    assert.equal(a.kind, 'mock');
    assert.equal(a.minutes, 60);
    assert.equal(a.version, boki3Version);
    assert.equal(a.questions.length, 48);
    assert.deepEqual(assessmentMaterialIssues(a), []);
    assert.deepEqual(
      ['第1問', '第2問', '第3問'].map((group) =>
        a.questions.filter((q) => q.group === group).reduce((sum, q) => sum + (q.points ?? 1), 0),
      ),
      [45, 20, 35],
    );
    assert.equal(a.questions.filter((q) => q.input === 'journal').length, 15);
    assert.ok(a.questions.filter((q) => q.group === '第3問').every((q) => q.materialIds?.length));
    for (const q of a.questions) {
      assert.ok(!prompts.has(q.prompt), q.id);
      prompts.add(q.prompt);
    }
    const t = newAttempt(a, 'timed', 1000);
    assert.equal(remainingSeconds(t, 1000), 3600);
    t.flags = [a.questions[1]!.id];
    for (const q of a.questions) t.answers[q.id] = q.accepted?.[0] ?? q.answer;
    const saved = validateData({ ...emptyData(), assessments: { [a.id]: [t] } }).assessments[a.id]![0]!;
    assert.equal(saved.deadline, t.deadline);
    assert.equal(remainingSeconds(saved, 3601001), 0);
    assert.deepEqual(saved.flags, t.flags);
    const result = gradeAttempt(a, saved, 3601000);
    assert.equal(result.score, 48);
    assert.equal(practicePoints(a, result), 100);
    delete t.answers[a.questions[0]!.id];
    assert.equal(practicePoints(a, gradeAttempt(a, t, 3601000)), 97);
  }
  assert.equal(assessments.find((a) => a.id === 'boki-3-mock')!.kind, 'review');
  assert.equal(assessments.find((a) => a.id === 'boki-3-mock')!.version, 'boki-2026-v1');
});

test('independent capstone statement calculations reconcile from separately specified adjustments', () => {
  // These values come from re-reading the public premises, not its saved answer key.
  const aProfit =
    1100000 +
    2000 +
    15000 +
    2000 -
    (80000 + 540000 - 65000) -
    (210000 + 18000) -
    (144000 - 72000) -
    (36000 - 24000) -
    (4000 + 3000) -
    27000 -
    (190000 * 0.03 - 3000) -
    (400000 / 5 + ((200000 / 5) * 3) / 12);
  const aAssets =
    90000 +
    (520000 + 20000) +
    (210000 - 20000) * (1 - 0.03) +
    65000 +
    (600000 - 120000 - 90000) +
    40000 +
    24000 +
    72000 +
    15000;
  assert.equal(aProfit, 125300);
  assert.equal(aAssets, 1420300);
  assert.equal(caseA.profit, aProfit);
  assert.equal(caseA.assets, aAssets);
  assert.equal(aAssets, 190000 + 300000 + 18000 + 3000 + 4000 + 700000 + 80000 + aProfit);
  const bAllowance = (300000 + 100000 * (1 - 0.02)) * 0.02;
  const bExpenses =
    200000 +
    1200000 -
    260000 +
    720000 +
    360000 +
    30000 +
    (90000 + 2000) +
    (60000 - 12000) +
    12000 +
    (1000 + 2000) +
    1000 +
    (bAllowance - 5000) +
    600000 / 5 +
    162000;
  const bProfit = 3200000 + 40000 - bExpenses;
  const bAssets =
    100000 + 1599000 + 300000 + 98000 - bAllowance + 260000 + 600000 - 240000 + 120000 + 12000 + 90000;
  assert.equal(bProfit, 549040);
  assert.equal(bAssets, 2931040);
  assert.equal(bAssets, 250000 + 500000 + 60000 + 160000 + 132000 + 1000000 + 280000 + bProfit);
  assert.equal(
    Object.values(caseB.pre).reduce((sum, value) => sum + value, 0),
    0,
  );
  const reconstructed = { ...caseB.pre } as Record<string, number>;
  for (const adjustment of caseB.adjustments) {
    assert.equal(
      Object.values(adjustment.debits).reduce((sum, value) => sum + value, 0),
      Object.values(adjustment.credits).reduce((sum, value) => sum + value, 0),
    );
    for (const [k, v] of Object.entries(adjustment.debits)) reconstructed[k] = (reconstructed[k] ?? 0) + v;
    for (const [k, v] of Object.entries(adjustment.credits)) reconstructed[k] = (reconstructed[k] ?? 0) - v;
  }
  assert.equal(reconstructed['貸倒引当金'], -7960);
  assert.equal(reconstructed['仕入'], 1140000);
});

test('both mock keys match a separate reviewer’s public-premise reconstructions', () => {
  assert.equal(mockPeer.numeric.length, 64);
  assert.equal(mockPeer.journals.length, 30);
  for (const witness of mockPeer.numeric) {
    assert.match(witness.formula, /^[\d.()+*/\s-]+$/);
    const value = Function(`"use strict";return (${witness.formula});`)() as number;
    assert.ok(isCorrect(questions.get(witness.id)!, String(Math.round(value * 1e8) / 1e8)), witness.id);
  }
  for (const witness of mockPeer.journals) {
    const entry = {
      debits: Object.entries(witness.debits).map(([account, amount]) => ({ account, amount })),
      credits: Object.entries(witness.credits).map(([account, amount]) => ({ account, amount })),
    };
    assert.ok(isCorrect(questions.get(witness.id)!, JSON.stringify(entry)), witness.id);
  }
});

test('reviewed glossary options distinguish general categories, aliases and the seven broad definitions', () => {
  const glossary = assessments.find((a) => a.id === 'boki-3-terms-all')!;
  assert.equal(glossary.questions.length, 299);
  const categories = new Set(['資産', '負債', '純資産', '費用', '収益']);
  const byTerm = new Map(glossary.questions.map((q) => [q.options[q.answer]!, q]));
  for (const [term, q] of byTerm) {
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    const wrong = q.options.filter((_, i) => i !== q.answer);
    assert.ok(
      wrong.every((term) => categories.has(term) === categories.has(q.options[q.answer]!)),
      term,
    );
  }
  for (const [target, expected] of Object.entries({
    残高: ['証ひょう', '諸口', '試算表'],
    原価: ['売価', '売上', '売掛金'],
    手形期日: ['振出人', '受取人', '受取手形記入帳'],
    前受収益: ['未払費用', '月割計算', '仕訳帳'],
    未収収益: ['前払費用', '支払期日', '試算表'],
    決算整理前残高: ['未処理事項', '仕訳', '控除勘定'],
    決算整理後残高: ['未処理事項', '仕訳', '控除勘定'],
  })) {
    const q = byTerm.get(target)!;
    assert.deepEqual(q.options.filter((_, i) => i !== q.answer).sort(), expected.sort(), target);
  }
  for (const family of [
    ['仕訳', '単純仕訳', '複合仕訳'],
    ['試算表', '合計試算表', '残高試算表', '合計残高試算表'],
    ['差入保証金', '敷金'],
    ['未収収益', '未収利息', '未収手数料'],
    ['精算表', '8桁精算表'],
  ]) {
    for (const term of family) {
      const q = byTerm.get(term);
      if (q)
        assert.ok(
          q.options.filter((_, i) => i !== q.answer).every((candidate) => !family.includes(candidate)),
          term,
        );
    }
  }
});
