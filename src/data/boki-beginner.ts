import unit12 from './boki-beginner-unit12-questions.json';
import unit34 from './boki-beginner-unit34-questions.json';
import unit56 from './boki-beginner-unit56-questions.json';
import mocks from './boki-beginner-mocks.json';
import reviews from './boki-beginner-reviews.json';
import reviewAdditions from './boki-beginner-review-additions.json';
import sources from '../../docs/boki-beginner/source-register.json';
import type { Assessment, Question } from '../lib/assessment';

export const beginnerVersion = 'bb-2026-v2';
export const beginnerReviewed = '2026-10-28';
export const beginnerGroups = [
  '財産・損益・複式簿記の原理', '帳簿・証ひょうと日々の売買',
  '代金の受払いと決済の時点', '貸借・一時処理・手形と電子記録',
  '固定資産・資本金・収益費用', '消費税と月次の総合集計',
];
export const beginnerLessonIds = [
  'bb2-business', 'bb2-profit', 'bb2-transaction', 'bb2-journal',
  'bb2-ledger', 'bb2-evidence', 'bb2-cash', 'bb2-sales',
  'bb2-receivables', 'bb2-credit', 'bb2-prepayments', 'bb2-other-claims',
  'bb2-loans', 'bb2-temporary', 'bb2-custody', 'bb2-bills',
  'bb2-assets', 'bb2-depreciation', 'bb2-capital', 'bb2-expenses',
  'bb2-vat', 'bb2-trial-balance', 'bb2-monthly', 'bb2-integration',
];
export const beginnerLegacyIds = ['bb-foundation', 'bb-journal', 'bb-transactions', 'bb-monthly'];
export const beginnerSources = sources.sources;
export const beginnerBank = { ...unit12, ...unit34, ...unit56 } as Record<string, Question[]>;
export const beginnerReviewBank = Object.fromEntries(Object.entries(reviews).map(([key,questions])=>[
  key,[...questions,...((reviewAdditions as Record<string, Question[]>)[key] ?? [])],
])) as Record<string, Question[]>;
export const beginnerUnitReviewCount = Object.entries(beginnerReviewBank)
  .filter(([key])=>key.startsWith('unit-')).reduce((sum,[,questions])=>sum+questions.length,0);
export const beginnerMockBank = mocks;
export const beginnerPlan =
  '全24レッスンを6ユニットで学びます。本文・例題・問題・解説の合計時間に加え、翌日と1週間後の復習、ユニット確認、40分模試2回と各回の解き直しを見込みます。1日30分・週5日、1日60分・週5日などのペース別の期間は下のTXTに総時間から算出しています。時間は当サイトの見積りで、公式の必要時間ではありません。';
export function beginnerWorkload(rows: { data: { minutes: number; glossary: { term: string }[] } }[]) {
  const lessonMinutes = rows.reduce((sum,l)=>sum+l.data.minutes,0);
  const terms = new Set(rows.flatMap(l=>l.data.glossary.map(g=>g.term))).size;
  const reviewMinutes = Object.values(beginnerReviewBank).reduce((sum,qs)=>sum+qs.length*2,0);
  const spacedMinutes = rows.length*15;
  const glossaryMinutes = terms;
  const mockMinutes = 80;
  const mockReviewMinutes = 120;
  return { lessonMinutes,reviewMinutes,spacedMinutes,glossaryMinutes,mockMinutes,mockReviewMinutes,
    total:lessonMinutes+reviewMinutes+spacedMinutes+glossaryMinutes+mockMinutes+mockReviewMinutes };
}

type Lesson = { data: {
  qualification: string; stableId: string; title: string; unit?: number; order?: number;
  glossary: { term: string; definition: string }[]; archived?: boolean;
} };

export function beginnerAssessments(
  lessons: Lesson[], legacyBank: Record<string, Question[]>, legacyMock: Question[],
): Assessment[] {
  const rows = lessons.filter(l => l.data.qualification === 'boki-beginner' && !l.data.archived)
    .sort((a,b) => (a.data.order ?? 0) - (b.data.order ?? 0) || a.data.stableId.localeCompare(b.data.stableId));
  if (!rows.length) return [];
  const allRows = lessons.filter(l => l.data.qualification === 'boki-beginner');
  const base = { qualification: 'boki-beginner', version: beginnerVersion,
    fieldNames: { basics: '簿記初級' }, lessonTitles: Object.fromEntries(allRows.map(l => [l.data.stableId,l.data.title])) };
  const result: Assessment[] = rows.map(l => ({ ...base, id: `${l.data.stableId}-check`,
    title: `${l.data.title}：理解度チェック`, kind: 'lesson', unit: l.data.unit,
    questions: beginnerBank[l.data.stableId] ?? [],
    instructions: '独自に作成した理解度チェックです。問題ごとの解説で考え方を確かめてください。学習済みの印とは別に結果を保存します。' }));
  const terms = [...new Map(rows.flatMap(l => l.data.glossary.map(g => [g.term,{...g,lesson:l.data.stableId}] as const))).values()];
  // Avoid category/subtype or expense-name/account-name alternatives that also fit a definition.
  const overlapping: Record<string,string[]> = {
    '補助簿':['得意先元帳','仕入先元帳'], '回収':['決済'], '決済手数料':['支払手数料'],
    '残代金':['未払金','未収入金'],
  };
  const optionOrder = (key:string) => {
    let hash=2166136261;
    for(const character of key)hash=Math.imul(hash^character.charCodeAt(0),16777619);
    return hash>>>0;
  };
  const termQuestion = (term: typeof terms[number], n: number): Question => {
    const definition = (text: string) => text.replace(/[。．.]+$/, '');
    const candidates = terms.filter(g => g.term !== term.term&&!overlapping[term.term]?.includes(g.term));
    const start=Math.min(n%Math.max(1,terms.length-4),candidates.length-3);
    const wrong = candidates.slice(start,start+3);
    const options = [term.term, ...wrong.map(g=>g.term)].sort((a,b)=>optionOrder(`${term.term}:${a}`)-optionOrder(`${term.term}:${b}`)||a.localeCompare(b));
    const answer = options.indexOf(term.term);
    return { id:`bb2-term-${n+1}`, prompt:`「${definition(term.definition)}」に当てはまる用語を選んでください。`,
      options,answer,explanation:`正解は${term.term}です。${definition(term.definition)}。${wrong.map(g=>`${g.term}は「${definition(g.definition)}」を指すため、この説明とは異なります。`).join('')}`,
      lesson:term.lesson,field:'basics' };
  };
  const termQuestions = terms.map(termQuestion);
  for (const [i,group] of beginnerGroups.entries()) {
    const unit = i+1;
    const unitTerms = new Set(rows.filter(l=>l.data.unit===unit).flatMap(l=>l.data.glossary.map(g=>g.term)));
    result.push({ ...base,id:`boki-beginner-unit-${unit}-glossary`,title:`簿記初級・ユニット${unit} 用語確認`,kind:'glossary',unit,
      questions:termQuestions.filter((_,n)=>unitTerms.has(terms[n]!.term)),
      instructions:'本文の用語定義から作る確認問題です。同じ用語は重複を除き、各用語の説明を解説で比較できます。応用力はユニット確認で別に確かめます。' });
    result.push({ ...base,id:`boki-beginner-unit-${unit}-review`,title:`簿記初級・${group} 総合確認`,kind:'review',unit,
      questions:beginnerReviewBank[`unit-${unit}`] ?? [],
      instructions:'レッスン末尾とは別に作成した独自問題です。資料の条件と処理の理由を確認し、解説から関連レッスンへ戻ってください。' });
  }
  result.push({ ...base,id:'boki-beginner-terms-all',title:'簿記初級 用語総復習',kind:'glossary',questions:termQuestions,
    instructions:'各ユニットの用語問題を再利用します。同じ問題を別の独立問題として数えていません。' });
  result.push({ ...base,id:'boki-beginner-review-all',title:'簿記初級 科目横断の総復習',kind:'review',
    questions:beginnerReviewBank.all ?? [],instructions:'新しい複合問題12問と、ユニット確認から再利用する12問の計24問です。再利用分は独立した新作として数えていません。模試とは別の問題です。' });
  for (const form of ['a','b'] as const) result.push({ ...base,id:`bb2-mock-${form}`,
    title:`簿記初級 40分総合模試・第${form==='a'?1:2}回`,kind:'mock',minutes:40,
    questions:mocks.forms[form] as Question[],materials:mocks.materials[form],
    instructions:'2026年度適用範囲・独自作成の模試です。紙と電卓を用意してください。第1群10問×3点、第2群10問×4点、第3群10問×3点の計100点です。第3群は共通の月初残高と取引資料から計算します。\n公式の40分・100点満点・合格基準70点と、公開サンプルの3大問30・40・30点を参考に構成しています。実試験に固定された小問数・各配点・部分点を確認したものではありません。各小問は独自の全か無か採点で、練習得点を表示します。70点を得ても本試験の合格を予測しません。資料量・難易度・所要時間は著者の設計で、受験者による試行・難易度校正は未実施です。\n時間ありでは開始後に閉じても期限は進みます。問題の解説は提出後に確認できます。第1回と第2回は異なる独自問題です。' });
  // Keep old lesson-check URLs and records available without counting them as current work.
  for (const id of beginnerLegacyIds) {
    if (!allRows.some(l=>l.data.stableId===id)) continue;
    result.push({ ...base,version:'boki-2026-v1',id:`${id}-check`,title:`旧版・${base.lessonTitles[id]}：記録確認`,kind:'lesson',
      questions:legacyBank[id] ?? [],instructions:'旧版の短い教材に対応する確認です。新課程の習熟や完了数には加算しません。旧版記録を残したまま、新しいレッスンへ進めます。' });
  }
  // Correct the former ambiguous advance-rent item while retaining its URL/history.
  const correctedLegacy = legacyMock.map(q => q.id.endsWith('-q7') ? { ...q,
    prompt:'翌月に受け取る商品の手付金10,000円を支払いました。引渡し前の代金に使う科目を入力してください。',
    accepted:['前払金'], explanation:'商品の引渡し前に支払う代金は前払金です。家賃の期間配分や前払費用の決算整理とは区別します。' } : q);
  result.push({ ...base,version:'bb-legacy-2026-v2',id:'boki-beginner-mock',title:'簿記初級 旧版の短縮練習（模試ではありません）',
    kind:'review',questions:correctedLegacy,instructions:'旧版15小問の短縮練習です。40分の全量模試ではありません。旧URLと過去記録を保つため残しています。曖昧だった前払いの問題を修正したため版を更新しました。現在の模試は第1回・第2回を選んでください。' });
  return result;
}
