import { costGroups, costVersion, costReviewed, costBank, costReviewBank, costSources, costWorkload } from '../src/data/cost-beginner.ts';
import coverage from '../src/data/cost-beginner-coverage.json' with {type:'json'};

export function costCurriculum(rows) {
  const workload=costWorkload(rows);
  const lines=[
    '日商原価計算初級 学習ツリー・スケジュール',
    '対象：原価計算初級の現行公式範囲の全3領域。簿記初級・簿記1〜3級は別の試験区分。',
    `範囲：2018年度からの現行版。2026年度と、公表済み2027年度の案内でも変更なし。公式資料確認：${costReviewed}`,
    `教材・評価版：${costVersion}`,
    '前提：割合と四則計算。会計の専門知識は必要なところで補い、紙と電卓を使います。',
    '', '学習時間の目安（当サイトの見積り。実測や公式の推奨時間ではありません）',
    `本文・例題・理解度チェック：${workload.lessonMinutes}分`,
    `用語確認：${workload.glossaryMinutes}分／ユニット・全体の復習：${workload.reviewMinutes}分`,
    `翌日と1週間後の復習：${workload.spacedMinutes}分／模試2回：80分／模試の解き直し：120分`,
    `合計：${workload.total}分（約${Math.ceil(workload.total/60)}時間）`,
    ...[30,60,90].map(minutes=>`1日${minutes}分・週5日：約${Math.ceil(workload.total/(minutes*5))}週間。苦手な単元の再学習に応じて延長します。`),
    '', '学習ツリー（ユニットは当サイトの学習順です）',
  ];
  for(const [index,title] of costGroups.entries()){
    const unit=index+1;
    lines.push(`  ユニット${unit} ${title}`);
    for(const lesson of rows.filter(entry=>entry.data.unit===unit)){
      const next=rows[rows.indexOf(lesson)+1];const data=lesson.data;
      lines.push(`    ${data.order}. [${data.stableId}] ${data.title}／${data.minutes}分`,
        `      目標：${data.objectives.join('／')}`,
        `      前提：${data.prerequisite}`,
        `      本文：/qualifications/cost-beginner/${data.stableId}/`,
        `      理解度チェック：[${data.stableId}-check] ${costBank[data.stableId]?.length??0}問`,
        `      用語：${data.glossary.map(term=>term.term).join('・')}`,
        `      次：${next?.data.stableId??'cost-beginner-review-all'}`,
        '      翌日：例題の条件と計算の理由を、解説を見ずに説明する。1週間後：誤った問題を解き直す。');
    }
    lines.push(`    [cost-beginner-unit-${unit}-glossary] 用語確認`,
      `    [cost-beginner-unit-${unit}-review] 独自の総合確認 ${costReviewBank[`unit-${unit}`]?.length??0}問`,
      '    復習の節目：正答だけでなく、資料の読み方・計算の意味・検算を説明できるか確認。');
  }
  lines.push('', '総復習と模試',
    '  [cost-beginner-terms-all] 用語総復習。ユニットの用語問題を再利用。',
    `  [cost-beginner-review-all] 分野横断の独自問題 ${costReviewBank.all?.length??0}問`,
    '  [cb2-mock-a] 第1回：選択式37小問・40分・独自100点 → 翌日に解説と関連レッスンで解き直す',
    '  苦手な単元の総合確認へ戻り、条件の判断と計算を再確認する',
    '  [cb2-mock-b] 第2回：異なる条件と資料の選択式37小問・40分・独自100点 → 時間配分と誤答を確認',
    '', '範囲と練習の対応');
  for(const row of coverage)lines.push(`  [${row.id}] 公式${row.officialSection} ${row.competency}`,
    `    本文：${row.lessons.join(', ')}`,
    `    独立練習：${row.independentQuestionIds.join(', ')}`,
    `    関連する総合確認：${row.unitReviewQuestionIds.join(', ')}`);
  lines.push('', '確認する範囲と制約',
    '  個別・総合原価計算の計算形態の違いや標準原価計算は公式範囲外。在庫は資料で与えた金額・明示した未完成分の原価を使う。',
    '  目標利益と安全余裕はCVPの関係式を使う補助学習で、別の公式必須項目を追加するものではない。',
    '  模試の37小問と44・24・32点はサンプルの解答箇所・大問構成を参考にした独自設計。固定問題数・小問別配点・部分点や難易度の同一性を主張しない。',
    '  模試の第2群はCVPと予算実績差異を練習する独自の配分。練習得点を公式の合否へ換算しない。',
    '  外部専門家による監修と、受験者による難易度・時間の試行は未実施。',
    '', '公式参照資料と確認日');
  for(const source of costSources)lines.push(`  [${source.id}] ${source.title}／${source.applicability}`,`    ${source.url}`,`    確認：${source.verifiedOn}`);
  return lines;
}
