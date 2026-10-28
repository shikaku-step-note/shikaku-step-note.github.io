import plan from './cost-beginner-plan.json';
import unit12 from './cost-beginner-unit12-questions.json';
import unit3 from './cost-beginner-unit3-questions.json';
import unit45 from './cost-beginner-unit45-questions.json';
import reviews from './cost-beginner-reviews.json';
import mocks from './cost-beginner-mocks.json';
import sources from '../../docs/cost-beginner/source-register.json';
import type { Assessment, Question } from '../lib/assessment';

export const costVersion = plan.version;
export const costReviewed = plan.reviewed;
export const costSources = sources.sources;
export const costGroups = plan.units.map(unit => unit.title);
export const costLessonIds = plan.units.flatMap(unit => unit.lessons);
export const costLegacyIds = plan.legacyLessonIds;
export const costBank = { ...unit12, ...unit3, ...unit45 } as Record<string, Question[]>;
export const costReviewBank = reviews as Record<string, Question[]>;
export const costMockBank = mocks;
export const costReviewCount = () => Object.entries(costReviewBank)
  .filter(([key])=>key.startsWith('unit-')).reduce((sum,[,questions])=>sum+questions.length,0);
export const costPlan = '原価の意味と分類から始め、消費量の集計、在庫と利益、利益計画、予算と実績の比較へ進みます。各例題を紙と電卓で確かめ、翌日と1週間後に解き直します。ユニット確認で苦手を復習してから、40分の模試を2回に分けて解いてください。';

type Lesson = { data: {
  qualification: string; stableId: string; title: string; unit?: number; order?: number;
  glossary: { term: string; definition: string }[]; minutes?: number; archived?: boolean;
} };

export function costWorkload(rows: Lesson[]) {
  const lessonMinutes = rows.reduce((sum,lesson)=>sum+(lesson.data.minutes??0),0);
  const glossaryMinutes = new Set(rows.flatMap(lesson=>lesson.data.glossary.map(term=>term.term))).size;
  const reviewMinutes = Object.values(costReviewBank).reduce((sum,questions)=>sum+questions.length*2,0);
  const spacedMinutes = rows.length*15;
  const mockMinutes = 80;
  const mockReviewMinutes = 120;
  return {lessonMinutes,glossaryMinutes,reviewMinutes,spacedMinutes,mockMinutes,mockReviewMinutes,
    total:lessonMinutes+glossaryMinutes+reviewMinutes+spacedMinutes+mockMinutes+mockReviewMinutes};
}

const hash = (text:string) => {
  let value=2166136261;
  for(const character of text)value=Math.imul(value^character.charCodeAt(0),16777619);
  return value>>>0;
};

// Aliases and broader/narrower terms can all fit a short definition.
// Do not turn them into competing answers in an automatically generated quiz.
const overlappingTerms = [
  ['単位原価','単位当たり原価'],
  ['当月製品製造原価','当月完成品原価'],
  ['配賦額','製品別配賦額'],
  ['経費','製造経費'],
  ['原価計算対象','原価計算の単位'],
  ['売上高差異','予算差額'],
  ['作業時間','直接作業時間','間接作業時間'],
  ['サービス別原価','案件別原価','完了した役務の原価'],
  ['製品別損益','製品別営業利益'],
];

export function costAssessments(lessons: Lesson[], legacyBank: Record<string,Question[]>, legacyMock: Question[]): Assessment[] {
  const rows = lessons.filter(lesson=>lesson.data.qualification==='cost-beginner'&&!lesson.data.archived)
    .sort((a,b)=>(a.data.order??0)-(b.data.order??0)||a.data.stableId.localeCompare(b.data.stableId));
  if(!rows.length)return [];
  const allRows=lessons.filter(lesson=>lesson.data.qualification==='cost-beginner');
  const base = {qualification:'cost-beginner',version:costVersion,fieldNames:{cost:'原価計算'},
    lessonTitles:Object.fromEntries(allRows.map(lesson=>[lesson.data.stableId,lesson.data.title]))};
  const result:Assessment[]=rows.map(lesson=>({...base,id:`${lesson.data.stableId}-check`,
    title:`${lesson.data.title}：理解度チェック`,kind:'lesson',unit:lesson.data.unit,
    questions:costBank[lesson.data.stableId]??[],
    instructions:'条件を読み、計算の途中や判断の理由も紙に書いて確かめます。理解度チェックの結果は、ページの学習済み状態とは別に保存します。'}));
  const terms=[...new Map(rows.flatMap(lesson=>lesson.data.glossary.map(term=>[term.term,{...term,lesson:lesson.data.stableId}] as const))).values()];
  const definition=(text:string)=>text.replace(/[。．.]+$/,'');
  const questions=terms.map((term,index):Question=>{
    const alternatives=terms.filter(candidate=>candidate.term!==term.term &&
      !overlappingTerms.some(group=>group.includes(term.term)&&group.includes(candidate.term)));
    const start=index%Math.max(1,alternatives.length-2);
    const wrong=alternatives.slice(start,start+3);
    const options=[term.term,...wrong.map(candidate=>candidate.term)]
      .sort((a,b)=>hash(`${term.term}:${a}`)-hash(`${term.term}:${b}`)||a.localeCompare(b));
    return {id:`cb2-term-${hash(term.term).toString(16)}`,prompt:`「${definition(term.definition)}」に当てはまる用語を選んでください。`,
      options,answer:options.indexOf(term.term),field:'cost',lesson:term.lesson,
      explanation:`正解は${term.term}です。${definition(term.definition)}。${wrong.map(candidate=>`${candidate.term}は「${definition(candidate.definition)}」を指します。`).join('')}`};
  });
  for(const [index,title] of costGroups.entries()){
    const unit=index+1;
    const unitTerms=new Set(rows.filter(lesson=>lesson.data.unit===unit).flatMap(lesson=>lesson.data.glossary.map(term=>term.term)));
    result.push({...base,id:`cost-beginner-unit-${unit}-glossary`,title:`原価計算初級・${title} 用語確認`,kind:'glossary',unit,
      questions:questions.filter((_,n)=>unitTerms.has(terms[n]!.term)),
      instructions:'用語の定義から選ぶ確認です。計算や条件の判断は、単元の総合確認でも確かめてください。'});
    result.push({...base,id:`cost-beginner-unit-${unit}-review`,title:`原価計算初級・${title} 総合確認`,kind:'review',unit,
      questions:costReviewBank[`unit-${unit}`]??[],instructions:'レッスン末の問題とは別の条件で、考え方と計算の手順を確かめる問題です。解説から必要なレッスンへ戻れます。'});
  }
  result.push({...base,id:'cost-beginner-terms-all',title:'原価計算初級 用語総復習',kind:'glossary',questions,
    instructions:'ユニットの用語問題を再利用する総復習です。計算や適用力の確認とは分けて使います。'});
  result.push({...base,id:'cost-beginner-review-all',title:'原価計算初級 総合復習',kind:'review',questions:costReviewBank.all??[],
    instructions:'分野をまたいで条件を読み取り、方法を選ぶ練習です。誤った問題は、途中の計算や判断を確認してから解き直してください。'});
  for(const form of ['a','b'] as const)result.push({...base,id:`cb2-mock-${form}`,title:`原価計算初級 40分総合模試・第${form==='a'?1:2}回`,kind:'mock',minutes:40,
    questions:mocks.forms[form] as Question[],materials:mocks.materials[form],
    instructions:'紙と電卓を用意してください。全37小問の選択式、40分・独自100点です。第1群44点、第2群24点、第3群32点で、第3群は共通の資料と表を使います。各小問は正答した場合だけ配点を加算します。\n公式案内の40分・選択式と、公開サンプルの大問構成を参考にした独自問題です。実試験の固定小問数・小問別配点・部分点・難易度を示すものではありません。練習得点から公式の合否を判定しません。\n時間ありでは、画面やブラウザを閉じている間も期限が進みます。提出後に解説と関連レッスンで解き直せます。'});
  for(const id of costLegacyIds){
    if(!allRows.some(lesson=>lesson.data.stableId===id))continue;
    const questions=(legacyBank[id]??[]).map(question=>question.id==='cb-cvp-q2'
      ? {...question,prompt:'売価1個2,000円、変動費1個1,200円、固定費160,000円の単一製品を販売します。販売量と生産量は等しく、費用の条件は一定です。80,000円の営業利益を得る販売数量は何個ですか。'}:question);
    result.push({...base,id:`${id}-check`,title:`旧版・${base.lessonTitles[id]}：記録確認`,kind:'lesson',
      version:id==='cb-cvp'?'cost-legacy-2026-v2':'boki-2026-v1',questions,
      instructions:'以前の要点教材に対応する確認です。現在の学習ツリーとは別に、過去の記録を残しています。'});
  }
  result.push({...base,id:'cost-beginner-mock',title:'原価計算初級 旧版の短縮練習',kind:'review',version:'boki-2026-v1',questions:legacyMock,
    instructions:'以前の15小問の練習を、旧URLと記録を保つために残しています。現在の40分模試は第1回・第2回を選んでください。'});
  return result;
}
