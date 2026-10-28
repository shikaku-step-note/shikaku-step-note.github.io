import { boki3Groups, boki3Version, boki3Reviewed, boki3Sources, boki3Workload } from '../src/data/boki3.ts';
import coverage from '../src/data/boki3-coverage.json' with { type: 'json' };

export function boki3Curriculum(rows, assessments) {
  const workload = boki3Workload(rows);
  const lines = [
    '日商簿記3級 学習ツリー・スケジュール',
    '公式区分：日商簿記3級・商業簿記。簿記初級・2級・1級・原価計算初級は別コース。',
    '適用：2026年度に適用する2022年度版。2027年3月31日まで。2026年4月1日施行法令等。',
    `公式資料確認：${boki3Reviewed}／教材・評価版：${boki3Version}`,
    '前提：専門知識は必要な箇所から補う。割合と四則計算、紙と電卓を使う。',
    '7ユニットは当サイトの学習順で、公式の小区分や級ではない。',
    '',
    '学習量と複数のペース（独自の見積り。公式推奨や実測ではない）',
    `本文・例題・理解度確認：${workload.lessonMinutes}分`,
    `用語確認：${workload.glossaryMinutes}分／独立した単元・総合復習：${workload.reviewMinutes}分`,
    `翌日・1週間後の復習：${workload.spacedMinutes}分／模試2回：120分／模試の解き直し：180分`,
    `合計目安：${workload.total}分（約${Math.ceil(workload.total / 60)}時間）`,
    ...[30, 60, 90].map(
      (minutes) =>
        `1日${minutes}分・週5日：約${Math.ceil(workload.total / (minutes * 5))}週間。苦手な単元の再学習や休みを別に確保する。`,
    ),
    '模試の60分は一度に確保する。日々の時間が短い場合も、試験前には中断せず解く日を設ける。',
    '',
    '学習ツリー',
  ];
  for (const [index, title] of boki3Groups.entries()) {
    const unit = index + 1;
    lines.push(`  ユニット${unit} ${title}`);
    for (const lesson of rows.filter((entry) => entry.data.unit === unit)) {
      const data = lesson.data,
        next = rows[rows.indexOf(lesson) + 1];
      const check = assessments.find((item) => item.id === `${data.stableId}-check`);
      lines.push(
        `    ${data.order}. [${data.stableId}] ${data.title}／${data.minutes}分`,
        `      目標：${data.objectives.join('／')}`,
        `      前提：${data.prerequisite}`,
        `      本文：/qualifications/boki-3/${data.stableId}/`,
        `      理解度確認：[${data.stableId}-check] ${check?.questions.length ?? 0}問／評価版${check?.version}`,
        `      用語：${data.glossary.map((term) => term.term).join('・')}`,
        `      次：${next?.data.stableId ?? 'boki-3-review-all'}`,
        '      復習：翌日は例題を見ずに仕訳・計算の理由を説明。1週間後は誤答と別条件の問題を解く。',
      );
    }
    for (const kind of ['glossary', 'review']) {
      const id = `boki-3-unit-${unit}-${kind}`,
        assessment = assessments.find((item) => item.id === id);
      lines.push(
        `    [${id}] ${kind === 'glossary' ? '用語確認' : '別条件の単元総合確認'} ${assessment?.questions.length ?? 0}問`,
      );
    }
    lines.push('    節目：残高、仕訳額、費用・収益の期間を説明できるか確かめ、誤答のあるレッスンへ戻る。');
  }
  lines.push('', '全体の復習・模試');
  for (const assessment of assessments.filter((a) => a.id.includes('-all') || a.kind === 'mock'))
    lines.push(
      `  [${assessment.id}] ${assessment.title}／${assessment.questions.length}解答欄${assessment.minutes ? `／${assessment.minutes}分` : ''}`,
    );
  lines.push(
    '  模試1→翌日の解き直し→弱点単元の再学習→別日に模試2→時間配分と誤答の確認。',
    '',
    '公式範囲と教材の対応（61技能は当サイトの分け方。問題の重複対応あり）',
  );
  for (const row of coverage)
    lines.push(
      `  [${row.id}] ${row.officialSection} ${row.competency}`,
      `    技能：${row.requiredSkill}`,
      `    本文：${row.teachingAnchors.map((item) => `${item.lesson}#${item.anchor}`).join(', ')}`,
      `    例題：${row.workedExamples.map((item) => `${item.lesson}#${item.anchor}`).join(', ')}`,
      `    理解度確認：${row.independentQuestionIds.join(', ')}`,
      `    単元確認：${row.unitReviewQuestionIds.join(', ')}`,
    );
  lines.push(
    '',
    '適用範囲と制約',
    '現在の模試は60分、15仕訳＋帳簿10欄＋決算23欄、独自100点（45・20・35点）。公開サンプルの構成を参考にした独自設計で、現行の固定配点・部分点・難易度を再現したという主張ではない。',
    '仕訳は全科目と全金額が正しいときに配点。練習得点から公式の合否を予測しない。公式案内の3題以内・60分・70%以上とは区別する。',
    '2027年4月1日からの改定（販売時原価振替、除却・廃棄、簡易定率法、紙決済削除、45・25・30点）は公表済みだが、現行課程と別。2027年度対応済みとはしない。',
    '用語の総復習は単元問題を再利用。レッスン・単元・総合復習・模試は別IDの問題。多技能に対応する問題は範囲表の複数行に再掲する。',
    '既存の8ページは現在の学習順にある要点整理。完了記録は維持し、新しい詳細レッスンの完了は別IDで記録する。変更した理解度確認は評価版を分けて過去結果を保持する。',
    '外部専門家による監修と、受験者による難易度・所要時間の試行は未実施。',
    '学習記録はこのブラウザ内。端末間の自動同期なし。データ消去に備え、進捗画面でバックアップを出力する。',
    '',
    '公式資料・適用と確認日',
  );
  for (const source of boki3Sources)
    lines.push(
      `  [${source.id}] ${source.title}／${source.applicability}`,
      `    ${source.url}`,
      `    ${source.notes}／確認${source.verified}`,
    );
  return lines;
}
