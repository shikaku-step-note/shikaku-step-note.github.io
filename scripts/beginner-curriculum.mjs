import { beginnerGroups, beginnerBank, beginnerReviewBank, beginnerSources, beginnerReviewed, beginnerWorkload } from '../src/data/boki-beginner.ts';
import coverage from '../src/data/boki-beginner-coverage.json' with {type:'json'};
export function beginnerCurriculum(rows) {
  const workload=beginnerWorkload(rows);
  const lines=[
    '日商簿記初級 詳しい学習ツリー・スケジュール',
    '対象：簿記初級の全範囲。原価計算初級・1〜3級は別区分。',
    '適用：2026年度（2027年3月31日まで）。2027年4月施行の確定版とは区別。',
    `公式資料確認日：${beginnerReviewed}／教材・評価版：bb-2026-v2`,
    '標準：仕組みの説明→理由付き例題→独立練習→総合確認→40分模試。独自教材・公式の認定や合格保証はありません。',
    '前提：四則計算、紙と電卓。会計の予備知識は不要。',
    '', '学習時間の見積り（実測値・公式推奨時間ではありません）',
    `本文・例題・理解度チェック：${workload.lessonMinutes}分`,
    `用語確認：${workload.glossaryMinutes}分／ユニット・総復習：${workload.reviewMinutes}分`,
    `翌日と1週間後の復習：${workload.spacedMinutes}分／模試2回：${workload.mockMinutes}分／模試の解き直し：${workload.mockReviewMinutes}分`,
    `合計：${workload.total}分（約${Math.ceil(workload.total/60)}時間）。苦手項目の再学習で延長します。`,
    ...[30,60,90].map(m=>`1日${m}分・週5日：約${Math.ceil(workload.total/(m*5))}週間。休んだ日は後ろへずらし、範囲を省かず調整。`),
    '', '学習ツリー（以下のユニット・段階は公式の級ではありません）','日商簿記初級',
  ];
  for(const [i,group] of beginnerGroups.entries()) {
    lines.push(`  ユニット${i+1} ${group}`);
    const unitRows=rows.filter(l=>l.data.unit===i+1);
    for(const l of unitRows) {
      const next=rows[rows.indexOf(l)+1];
      lines.push(`    ${l.data.order}. [${l.data.stableId}] ${l.data.title}／${l.data.minutes}分`,
        `      目標：${l.data.objectives.join('／')}`,`      前提：${l.data.prerequisite}`,
        `      本文：/qualifications/boki-beginner/${l.data.stableId}/`,
        `      理解度チェック：[${l.data.stableId}-check] ${beginnerBank[l.data.stableId].length}問`,
        `      用語：${l.data.glossary.map(g=>g.term).join('・')}`,
        `      次：${next?.data.stableId ?? 'boki-beginner-review-all'}`,
        '      復習：翌日に例題を見ずに解く。1週間後に間違えた問題と理由を再確認。');
    }
    lines.push(`    [boki-beginner-unit-${i+1}-glossary] 用語確認`,
      `    [boki-beginner-unit-${i+1}-review] 独自総合確認${beginnerReviewBank[`unit-${i+1}`].length}問`,
      '    通過目安：正解だけでなく借貸・条件・計算理由を説明する。苦手な記事へ戻ってから次へ進む。');
  }
  lines.push('','総復習・模試の配置',
    '  [boki-beginner-terms-all] 用語総復習（単元問題を再利用）',
    '  [boki-beginner-review-all] 科目横断24問（新作複合12問・単元問題再利用12問）',
    '  [bb2-mock-a] 第1回：40分・30小問・100点 → 翌日までに解説と本文で解き直す',
    '  弱点の単元確認へ戻り、解法を説明できるか確認',
    '  [bb2-mock-b] 第2回：別の40分・30小問・100点 → 誤答と時間配分を確認',
    '  模試はサンプルの大問構成を参考にした独自設計。固定出題数・小問配点・部分点・難易度・合否を公式と同一とは扱いません。',
    '', '公式範囲と説明・例題・練習の対応');
  for(const row of coverage) lines.push(`  ${row.id} ${row.competency}（公式範囲PDF ${row.sourcePage}ページ） → ${row.lessons.join(', ')}`,
    `    本文・例題：記事内objective-1〜3、worked-1〜3。理解度チェックと関連する単元確認で練習。`);
  lines.push('', '確認の方法・制約',
    '  公式資料照合、計算と解答の確認、日本語編集、別AIによる内容確認、機能・保存・移行の確認を区別します。外部専門家監修や受験者による実証ではありません。',
    '  初級では決算整理を扱いません。固定資産売却は土地のみ、償却は月次見積額、消耗品は支払い時費用、消費税は税抜方式が対象です。',
    '  旧4記事と旧15小問の短縮練習は記録保管用。新24記事・全量模試の完了には数えません。',
    '', '公式資料と確認日');
  for(const source of beginnerSources) lines.push(`  ${source.id} ${source.title}／${source.applicability}`,`    ${source.url}`,`    確認日：${source.verifiedOn}`);
  return lines;
}
