import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
import {
  takkenOutline,
  takkenUnits,
  takkenSchedule,
  takkenSources,
  takkenDomains,
  takkenLimitations,
  takkenAssessments,
} from '../src/data/takken.ts';
import { takkenCoverageNotes } from '../src/data/takken-coverage.ts';
const lessons = takkenOutline.map((r) => ({
  data: parse(readFileSync(`src/content/lessons/${r.id}.md`, 'utf8').split('---')[1]),
}));
const tests = takkenAssessments(lessons);
const site = process.env.SITE_URL || 'https://shikaku-step-note.github.io';
const base = (process.env.BASE_PATH || '/').replace(/^\/+|\/+$/g, '');
const progressUrl = new URL(`${base ? base + '/' : ''}progress/`, site.replace(/\/$/, '') + '/').href;
const lines = [
  '宅地建物取引士（宅建士） 学習ツリー・スケジュール',
  '適用：2026年度。2026年4月1日時点施行法令。資料確認：2026年10月25日。',
  '公式の級はありません。一般と登録講習修了者の一部免除は受験方式の違いです。',
  '学習ユニットは当サイトの独自区分です。法定講習の修了資格は得られません。',
  '',
  takkenLimitations,
  '',
  '学習案：1日35〜45分・週5日・16週間。読む、例を手で解く、問題と解説の確認を含む目安。',
  '公式の必要学習時間ではなく、到達や合格を保証する期間ではありません。',
  '通常学習と別に模試120分又は110分、翌日の解き直しを確保します。',
  '',
];
for (const [week, plan] of takkenSchedule) lines.push(`${week}：${plan}`);
lines.push('', '学習ツリー', '宅建士（公式の級分けなし）');
takkenUnits.forEach((name, i) => {
  lines.push(`  ユニット${i + 1} ${name}`);
  for (const r of takkenOutline.filter((r) => r.unit === i + 1)) {
    const l = lessons.find((l) => l.data.stableId === r.id).data;
    lines.push(
      `    ${r.order}. [${r.id}] ${r.title}／${l.minutes}分`,
      `      公式第${r.domain}号：${takkenDomains[String(r.domain)]}`,
      `      目標：${r.objectives.join('／')}`,
      `      前提：${l.prerequisite}`,
      `      本文の例題・比較例→理解度チェック4問 [${r.id}-check]`,
      `      用語：${r.glossary.map((g) => g.term).join('・')}`,
      `      次：${takkenOutline.find((n) => n.order === r.order + 1)?.id ?? 'takken-review-all'}`,
    );
  }
  lines.push(
    `    [takken-unit-${i + 1}-glossary] 用語確認`,
    `    [takken-unit-${i + 1}-review] ユニット総合確認`,
    `    復習：翌日と1週間後に、元の例と条件を変えた例を説明する。`,
  );
});
lines.push('', '総復習・模試');
for (const a of tests.filter((a) => a.id.endsWith('-all') || a.kind === 'mock'))
  lines.push(`  [${a.id}] ${a.title}／${a.questions.length}問${a.minutes ? `／${a.minutes}分` : ''}`);
lines.push(
  '',
  '用語は本文から生成。ユニット確認・総復習は理解度チェックを再利用。',
  '模試は別の独自50問。一般形式と免除形式は45問を共有。',
  '各問1点の練習得点。2026年度の合格基準は確認日時点で未公表。合否は判定しません。',
  '科目配分は公開問題を参照した学習用構成で将来の出題配分を保証しません。',
  '',
  '対応表と追加学習',
);
for (const r of takkenOutline)
  lines.push(
    `[${r.id}] ${r.title}：本文説明・例題比較・理解度4問・用語3語`,
    `  ${takkenCoverageNotes[r.id]}`,
  );
lines.push('', '公式資料・適用版・確認日');
for (const s of takkenSources) lines.push(`${s.title}／${s.version}`, s.url, `確認日：${s.verified}`);
lines.push(
  '',
  '記録は現在のブラウザに保存。端末同期はなく、ブラウザデータ削除等で失われる場合があります。',
  `${progressUrl} から定期的にバックアップしてください。`,
);
writeFileSync('public/downloads/takken-curriculum.txt', lines.join('\n') + '\n');
console.log(`Takken curriculum exported: ${lessons.length} lessons, ${tests.length} assessments`);
