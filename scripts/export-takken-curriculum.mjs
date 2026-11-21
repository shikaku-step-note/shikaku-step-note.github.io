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
  takkenReviewed,
} from '../src/data/takken.ts';
import { takkenCoverageNotes } from '../src/data/takken-coverage.ts';
const lessons = takkenOutline.map((r) => ({
  data: parse(readFileSync(`src/content/lessons/${r.id}.md`, 'utf8').split('---')[1]),
}));
const tests = takkenAssessments(lessons);
const studyMinutes = lessons.reduce((total, lesson) => total + lesson.data.minutes, 0);
const site = process.env.SITE_URL || 'https://shikaku-step-note.github.io';
const base = (process.env.BASE_PATH || '/').replace(/^\/+|\/+$/g, '');
const progressUrl = new URL(`${base ? base + '/' : ''}progress/`, site.replace(/\/$/, '') + '/').href;
const lines = [
  '宅地建物取引士（宅建士） 学習ツリー・スケジュール',
  `適用：2026年度。2026年4月1日時点施行法令。試験案内確認：${takkenReviewed}。`,
  '公式の級はありません。一般と登録講習修了者の一部免除は受験方式の違いです。',
  '学習ユニットは当サイトの独自区分です。法定講習の修了資格は得られません。',
  '',
  takkenLimitations,
  '',
  `本文・例題・途中練習の目安合計：${studyMinutes}分。章末確認・復習・模試・解き直しは別。`,
  `週5日の学習案：1日30分で約${Math.ceil(studyMinutes / 150)}週、1日60分で約${Math.ceil(studyMinutes / 300)}週。`,
  '各章は基礎の意味と仕組み→標準例→条件変更・応用→途中練習→新しい問題と解説の順で学びます。',
  '各時間は編集上の目安です。理解と解き直しに必要な時間を追加してください。',
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
      `      基礎→標準→応用：本文の例題・条件変更→途中練習→理解度${tests.find((a) => a.id === `${r.id}-check`)?.questions.length ?? 0}問 [${r.id}-check]`,
      `      用語：${r.glossary.map((g) => g.term).join('・')}`,
      `      次：${takkenOutline.find((n) => n.order === r.order + 1)?.id ?? 'takken-review-all'}`,
    );
  }
  lines.push(
    `    [takken-unit-${i + 1}-glossary] 用語確認`,
    `    [takken-unit-${i + 1}-review] 新しい資料・数値入力を含むユニット総合確認${tests.find((a) => a.id === `takken-unit-${i + 1}-review`)?.questions.length ?? 0}問`,
    `    復習：翌日と1週間後に、元の例と条件を変えた例を説明する。`,
  );
});
lines.push('', '総復習・模試');
for (const a of tests.filter((a) => a.id.endsWith('-all') || a.kind === 'mock'))
  lines.push(`  [${a.id}] ${a.title}／${a.questions.length}問${a.minutes ? `／${a.minutes}分` : ''}`);
lines.push(
  '',
  '用語は本文から生成。ユニット総合確認は章末チェックと別の問題、全分野総復習はユニット確認を混ぜて再利用。',
  '模試は第1回と第2回で異なる独自50問。同じ回の一般形式と免除形式は45問を共有。',
  '各問1点の練習得点。2026年度の合格基準は確認日時点で未公表。合否は判定しません。',
  '科目配分は公開問題を参照した学習用構成で将来の出題配分を保証しません。',
  '',
  '対応表と追加学習',
);
for (const r of takkenOutline)
  lines.push(
    `[${r.id}] ${r.title}：本文説明・図解・例題比較・途中練習・理解度${tests.find((a) => a.id === `${r.id}-check`)?.questions.length ?? 0}問・用語${r.glossary.length}語`,
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
