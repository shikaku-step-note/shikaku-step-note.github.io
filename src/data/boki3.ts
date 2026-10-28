import plan from './boki3-plan.json';
import foundationClosing from './boki3-foundation-closing-questions.json';
import daily from './boki3-daily-questions.json';
import settlement from './boki3-settlement-questions.json';
import assetsReporting from './boki3-assets-reporting-questions.json';
import capstoneA from './boki3-capstone-a-questions.json';
import capstoneB from './boki3-capstone-b-questions.json';
import foundationClosingReviews from './boki3-foundation-closing-reviews.json';
import dailyReviews from './boki3-daily-reviews.json';
import settlementReviews from './boki3-settlement-reviews.json';
import assetsReportingReviews from './boki3-assets-reporting-reviews.json';
import capstoneAReviews from './boki3-capstone-a-reviews.json';
import capstoneBReviews from './boki3-capstone-b-reviews.json';
import cumulative from './boki3-cumulative.json';
import mocks from './boki3-mocks.json';
import sourceRegister from '../../docs/boki-3/source-register.json';
import type { Assessment, Question } from '../lib/assessment';

export const boki3Version = plan.version;
export const boki3Reviewed = plan.reviewed;
export const boki3Sources = sourceRegister.sources;
export const boki3Groups = plan.units.map((unit) => unit.title);
export const boki3LessonIds = plan.units.flatMap((unit) => unit.lessons);
export const boki3RetainedIds = plan.retainedLessonIds;
export const boki3Bank = {
  ...foundationClosing,
  ...daily,
  ...settlement,
  ...assetsReporting,
  ...capstoneA,
  ...capstoneB,
} as Record<string, Question[]>;
export const boki3ReviewBank: Record<string, Question[]> = {};
for (const bank of [
  foundationClosingReviews,
  dailyReviews,
  settlementReviews,
  assetsReportingReviews,
  capstoneAReviews,
  capstoneBReviews,
]) {
  for (const [key, questions] of Object.entries(bank as Record<string, Question[]>)) {
    (boki3ReviewBank[key] ??= []).push(...questions);
  }
}
export const boki3Cumulative = cumulative as Question[];
export const boki3MockBank = mocks;
export const boki3UnitReviewCount = Object.values(boki3ReviewBank).reduce(
  (sum, questions) => sum + questions.length,
  0,
);
export const boki3Plan =
  '仕訳と転記から始め、日常取引、商品有高帳、決算整理、勘定式の決算書、帳簿の締切へ進みます。各ユニット末の要点整理を使い、翌日と1週間後に例題を解き直してください。独立したユニット問題と総復習を終えたら、異なる資料の60分模試2回に取り組みます。';
type Lesson = {
  data: {
    qualification: string;
    stableId: string;
    title: string;
    unit?: number;
    order?: number;
    glossary: { term: string; definition: string }[];
    minutes?: number;
    archived?: boolean;
  };
};

export function boki3Workload(rows: Lesson[]) {
  const lessonMinutes = rows.reduce((sum, row) => sum + (row.data.minutes ?? 0), 0);
  const glossaryMinutes = new Set(rows.flatMap((row) => row.data.glossary.map((term) => term.term))).size;
  const reviewMinutes = (boki3UnitReviewCount + boki3Cumulative.length) * 3;
  const spacedMinutes = rows.length * 20;
  const mockMinutes = 120;
  const mockReviewMinutes = 180;
  return {
    lessonMinutes,
    glossaryMinutes,
    reviewMinutes,
    spacedMinutes,
    mockMinutes,
    mockReviewMinutes,
    total: lessonMinutes + glossaryMinutes + reviewMinutes + spacedMinutes + mockMinutes + mockReviewMinutes,
  };
}
const hash = (value: string) => {
  let result = 2166136261;
  for (const character of value) result = Math.imul(result ^ character.charCodeAt(0), 16777619);
  return result >>> 0;
};
// Near-synonyms and general/subtype terms must not compete for one short definition.
const overlappingTerms = [
  ['費用', '当期費用', '費用勘定'],
  ['収益', '収益勘定'],
  ['資産', '有形固定資産', '備品'],
  ['売掛金', 'クレジット売掛金', '電子記録債権', '受取手形'],
  ['買掛金', '電子記録債務', '支払手形'],
  ['資本金', '純資産', '繰越利益剰余金', '利益準備金'],
  ['仕入', '取得原価', '仕入原価', '商品取得原価'],
  ['決算整理', '決算整理仕訳', '整理仕訳'],
  ['決算振替', '帳簿の締切', '締切'],
  ['当期純利益', '利益', '売上総利益'],
  ['貸倒引当金', '減価償却累計額', '控除勘定'],
  ['勘定式', '損益計算書', '損益勘定'],
  ['仕訳', '単純仕訳', '複合仕訳', '訂正仕訳', '再振替仕訳', '決算整理仕訳'],
  [
    '試算表',
    '合計試算表',
    '残高試算表',
    '合計残高試算表',
    '整理前残高試算表',
    '修正前残高試算表',
    '整理後残高試算表',
    '決算整理後残高試算表',
  ],
  ['通貨代用証券', '他人振出小切手', '送金小切手'],
  ['預り金', '社会保険料預り金', '所得税預り金', '源泉所得税預り金'],
  ['仕入諸掛', '引取運賃', '仕入原価', '商品取得原価'],
  ['差入保証金', '敷金'],
  ['減価償却', '減価償却費', '定額法', '減価償却累計額'],
  ['帳簿価額', '売却時帳簿価額', '期末帳簿価額', '正味額'],
  ['未収収益', '未収利息', '未収家賃', '未収手数料'],
  ['前受収益', '前受利息', '前受家賃', '前受地代', '前受手数料'],
  ['未払費用', '未払利息', '未払家賃', '未払給料'],
  ['前払費用', '前払保険料', '前払家賃', '前払利息'],
  ['精算表', '8桁精算表'],
  ['消耗品', '貯蔵品'],
  ['前払金', '手付金', '前受金'],
  ['配当', '配当決議', '利益処分'],
  ['資本取引', '増資', '設立', '資本金', '配当', '配当決議', '利益処分'],
  ['決算整理', '決算整理仕訳', '整理仕訳', '費用の見越し', '費用の繰延べ', '収益の見越し', '収益の繰延べ'],
  ['売掛金元帳', '得意先元帳'],
  ['買掛金元帳', '仕入先元帳'],
  ['修正記入欄', '精算表の修正欄'],
  ['整理前残高試算表', '修正前残高試算表'],
  ['整理後残高試算表', '決算整理後残高試算表'],
  ['決算整理後残高', '整理後残高'],
  ['残高', '差引残高'],
  ['純仕入高', '当期純仕入高'],
];

export function boki3Assessments(
  lessons: Lesson[],
  legacyBank: Record<string, Question[]>,
  legacyMock: Question[],
): Assessment[] {
  const order = new Map(boki3LessonIds.map((id, index) => [id, index]));
  const rows = lessons
    .filter((row) => row.data.qualification === 'boki-3' && !row.data.archived)
    .sort(
      (a, b) =>
        (order.get(a.data.stableId) ?? 9999) - (order.get(b.data.stableId) ?? 9999) ||
        a.data.stableId.localeCompare(b.data.stableId),
    );
  if (!rows.length) return [];
  const base = {
    qualification: 'boki-3',
    version: boki3Version,
    fieldNames: { commercial: '商業簿記' },
    lessonTitles: Object.fromEntries(rows.map((row) => [row.data.stableId, row.data.title])),
  };
  const result: Assessment[] = rows.map((row) => {
    const retained = boki3RetainedIds.includes(row.data.stableId);
    const questions = retained
      ? (legacyBank[row.data.stableId] ?? [])
          .filter((q) => q.id !== 'b3-credit-q5')
          .map((q) =>
            q.id === 'b3-inventory-q2'
              ? {
                  ...q,
                  prompt:
                    '月初商品10個・単価100円に、商品10個・単価120円を追加仕入れし、その後12個を販売しました。他の増減はありません。移動平均法の払出原価はいくらですか。単位は円です。',
                }
              : q,
          )
      : (boki3Bank[row.data.stableId] ?? []);
    return {
      ...base,
      id: `${row.data.stableId}-check`,
      title: `${row.data.title}：理解度チェック`,
      kind: 'lesson',
      unit: row.data.unit,
      version:
        retained && !['b3-credit', 'b3-inventory'].includes(row.data.stableId)
          ? 'boki-2026-v1'
          : boki3Version,
      questions,
      instructions: retained
        ? 'ユニットの要点を整理する確認です。詳しいレッスンと独立した総合確認では、帳簿や資料を使う問題にも取り組んでください。'
        : '紙と電卓を用意し、仕訳・転記・計算の途中を残して解きます。仕訳は科目と金額を入力します。各解答は独立した練習得点で、学習済みの印とは別に保存します。',
    };
  });
  // Prefer definitions taught in detailed lessons; a later consolidation page must not overwrite them.
  const terms = new Map<string, { term: string; definition: string; lesson: string }>();
  for (const row of [
    ...rows.filter((row) => !boki3RetainedIds.includes(row.data.stableId)),
    ...rows.filter((row) => boki3RetainedIds.includes(row.data.stableId)),
  ]) {
    for (const term of row.data.glossary)
      if (!terms.has(term.term)) terms.set(term.term, { ...term, lesson: row.data.stableId });
  }
  const list = [...terms.values()];
  const definition = (value: string) => value.replace(/[。．.]+$/, '');
  // These broad definitions need explicitly reviewed alternatives. Changing the
  // general candidate pool would move distractors for unrelated terms again.
  const reviewedDistractors: Record<string, string[]> = {
    残高: ['証ひょう', '諸口', '試算表'],
    原価: ['売価', '売上', '売掛金'],
    手形期日: ['振出人', '受取人', '受取手形記入帳'],
    前受収益: ['未払費用', '月割計算', '仕訳帳'],
    未収収益: ['前払費用', '支払期日', '試算表'],
    決算整理前残高: ['未処理事項', '仕訳', '控除勘定'],
    決算整理後残高: ['未処理事項', '仕訳', '控除勘定'],
  };
  const glossary: Question[] = list.map((term, index) => {
    const categories = new Set(['資産', '負債', '純資産', '費用', '収益']);
    const alternatives = list.filter(
      (candidate) =>
        candidate.term !== term.term &&
        (categories.has(term.term) ? categories.has(candidate.term) : !categories.has(candidate.term)) &&
        !overlappingTerms.some((group) => group.includes(term.term) && group.includes(candidate.term)),
    );
    const start = index % Math.max(1, alternatives.length - 2);
    const wrong = reviewedDistractors[term.term]
      ? reviewedDistractors[term.term]!.map((name) => {
          const candidate = terms.get(name);
          if (!candidate) throw new Error(`Missing reviewed glossary alternative: ${name}`);
          return candidate;
        })
      : alternatives.slice(start, start + 3);
    const options = [term.term, ...wrong.map((candidate) => candidate.term)].sort(
      (a, b) => hash(`${term.term}:${a}`) - hash(`${term.term}:${b}`) || a.localeCompare(b),
    );
    return {
      id: `b3x-term-${hash(term.term).toString(16)}`,
      prompt: `「${definition(term.definition)}」に当てはまる用語を選んでください。`,
      options,
      answer: options.indexOf(term.term),
      field: 'commercial',
      lesson: term.lesson,
      explanation: `正解は${term.term}です。${definition(term.definition)}。${wrong.map((candidate) => `${candidate.term}は「${definition(candidate.definition)}」を指します。`).join('')}`,
    };
  });
  for (const [index, title] of boki3Groups.entries()) {
    const unit = index + 1;
    const unitTerms = new Set(
      rows
        .filter((row) => row.data.unit === unit)
        .flatMap((row) => row.data.glossary.map((term) => term.term)),
    );
    result.push({
      ...base,
      id: `boki-3-unit-${unit}-glossary`,
      title: `簿記3級・${title} 用語確認`,
      kind: 'glossary',
      unit,
      questions: glossary.filter((_, i) => unitTerms.has(list[i]!.term)),
      instructions:
        '用語の定義を確かめる問題です。仕訳や計算、帳簿を作る技能は、ユニット総合確認で別に確かめます。',
    });
    result.push({
      ...base,
      id: `boki-3-unit-${unit}-review`,
      title: `簿記3級・${title} 総合確認`,
      kind: 'review',
      unit,
      questions: boki3ReviewBank[`unit-${unit}`] ?? [],
      instructions:
        'レッスン末とは別に作成した問題です。異なる条件から科目と手順を選び、計算過程も解説と照合してください。',
    });
  }
  result.push({
    ...base,
    id: 'boki-3-terms-all',
    title: '簿記3級 用語総復習',
    kind: 'glossary',
    questions: glossary,
    instructions:
      '各ユニットと同じ用語問題をまとめて復習します。仕訳や計算への適用は、総合確認でも確かめてください。',
  });
  result.push({
    ...base,
    id: 'boki-3-review-all',
    title: '簿記3級 科目横断の総復習',
    kind: 'review',
    questions: boki3Cumulative,
    instructions:
      '新しい資料・条件の独立問題で、取引から帳簿・決算までを横断して確かめます。解説から関連レッスンへ戻れます。',
  });
  for (const form of ['a', 'b'] as const)
    result.push({
      ...base,
      id: `b3x-mock-${form}`,
      title: `簿記3級 60分総合模試・第${form === 'a' ? 1 : 2}回`,
      kind: 'mock',
      minutes: 60,
      questions: mocks.forms[form] as Question[],
      materials: mocks.materials[form],
      instructions:
        '紙と電卓を用意してください。第1群は仕訳の科目・金額入力、第2群は帳簿等、第3群は共通資料からの決算作成です。45・20・35点、合計100点の独自配点です。仕訳は全科目と金額が正しい場合に得点します。借方・貸方は各4行まで使え、使わない行は空欄にします。\n2026年度の公式60分と公開資料の作業内容を参考にした独自問題です。実試験の固定小問数・個別配点・部分点・難易度を再現せず、練習得点から本試験の合否を予測しません。2027年度の確定配点45・25・30点は別の適用年度です。\n時間ありでは、画面やブラウザを閉じても期限は進みます。提出後に解説と関連レッスンで復習できます。',
    });
  result.push({
    ...base,
    id: 'boki-3-mock',
    title: '簿記3級 旧版の短縮練習',
    kind: 'review',
    version: 'boki-2026-v1',
    questions: legacyMock,
    instructions:
      '旧URLと過去の記録を保持する25小問の短縮練習です。現在の60分模試は、第1回・第2回をテスト一覧から選んでください。',
  });
  return result;
}
