import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { parse } from 'yaml';
import { units, syllabusItems, ipAssessments, ipSources, fieldNames } from '../src/data/it-passport.ts';
const lessons = readdirSync('src/content/lessons')
  .filter((n) => n.startsWith('ip-') && n.endsWith('.md'))
  .map((n) => ({ data: parse(readFileSync(`src/content/lessons/${n}`, 'utf8').split('---')[1]) }))
  .sort((a, b) => a.data.order - b.data.order);
const tests = ipAssessments(lessons);
const total = lessons.reduce((n, l) => n + l.data.minutes, 0);
const lines = [
  '資格ステップノート ITパスポート 学習ツリー・推奨スケジュール',
  '対象：現行シラバスVer.6.5（2026年1月）／試験要綱Ver.5.6',
  'シラバス・試験形式の再確認日：2026-11-12',
  '公式の級分け：ITパスポート内に複数の級はありません。',
  'ユニット・学習ステージは当サイト独自の区切りです。',
  '',
  `本文・例題の目安合計：${lessons.reduce((n, l) => n + l.data.minutes, 0)}分。テスト・復習・公開問題の時間は別。`,
  `目安：本文・例題＋模試240分で、1日30分・週5日なら約${Math.ceil((total + 240) / 150)}週、1日60分・週5日なら約${Math.ceil((total + 240) / 300)}週。別に復習・解き直しの時間を確保。`,
  '順序：ストラテジ → マネジメント → テクノロジ → 入力式総復習 → 資料を読むケース演習 → 模試2回。翌日・1週間後に誤答を解き直す。',
  '各ユニット終了時に用語・総合確認を実施。不正解の内容は本文へ戻って復習。',
  '',
  'ITパスポート（単一の公式試験区分）',
];
for (const field of ['strategy', 'management', 'technology']) {
  lines.push(`├─ ${fieldNames[field]}`);
  for (const unit of units.filter((u) => u.field === field)) {
    lines.push(`│  ├─ ユニット${unit.id} ${unit.name}`);
    for (const l of lessons.filter((l) => l.data.unit === unit.id)) {
      const d = l.data;
      lines.push(
        `│  │  ├─ STEP ${d.order} ${d.title} [${d.stableId}] 約${d.minutes}分`,
        `│  │  │  目標：${d.objectives.join('／')}`,
        `│  │  │  前提：${d.prerequisite}`,
        `│  │  │  公式対応：${d.syllabus.map((n) => `${n}.${syllabusItems[n - 1]}`).join('／')}`,
        `│  │  │  理解度チェック：${tests.find((test) => test.id === d.stableId + '-check').questions.length}問 [${d.stableId}-check]`,
        `│  │  │  次：${lessons.find((x) => x.data.order === d.order + 1)?.data.title ?? '用語の総復習→3分野の総復習→模試'}`,
      );
    }
    for (const a of tests.filter((a) => a.unit === unit.id && a.kind !== 'lesson'))
      lines.push(`│  │  └─ ${a.title} ${a.questions.length}問 [${a.id}] 時間制限なし`);
  }
}
for (const a of tests.filter((a) => !a.unit && a.kind !== 'lesson'))
  lines.push(
    `└─ ${a.title} ${a.questions.length}問 [${a.id}] ${a.minutes ? '120分／時間なしも選択可' : '時間制限なし'}`,
  );
lines.push('', '公式項目と対応レッスン');
syllabusItems.forEach((name, i) => {
  const matched = lessons.filter((l) => l.data.syllabus.includes(i + 1));
  if (!matched.length) throw new Error(`Uncovered item ${i + 1}`);
  lines.push(`${i + 1}. ${name} → ${matched.map((l) => l.data.stableId).join(', ')}`);
});
lines.push(
  '',
  '教材の制約',
  '現行63項目に対応する本文、例題と理解度チェックを案内します。個別案件の法令適用や、t検定など個々の検定手法の詳しい計算は対象外です。',
  '2027年度向けのシラバス案を現行範囲として扱っていません。確定版と開始時期に応じて更新が必要です。',
  '本試験100問のうち92問が評価対象、IRT採点。公式基準は総合600/1000かつ各分野300/1000以上。',
  '当サイトの模試は35/20/45問、全100問を各1点で採点。IRT評価点・公式の合否には換算できません。',
  '問題の版は各テストに表示します。独自作成で公式問題の転載ではありません。',
  '用語総復習・3分野総復習はユニットの問題を再利用。入力式総復習23問は別問題。模試は各100問、別々の独自問題で2回分。',
  'レッスンの完了とテスト結果は別に記録。旧サンプルの完了は新教材へ加算しません。',
  '記録は利用中のブラウザのみ。バックアップを推奨。',
  '',
  '公式資料・追加の公的資料',
);
for (const s of ipSources) lines.push(`${s.title}\n${s.url}\n${s.version}／確認日 ${s.verified}`);
mkdirSync('public/downloads', { recursive: true });
writeFileSync('public/downloads/it-passport-curriculum.txt', lines.join('\n') + '\n');
console.log(`Exported ${lessons.length} lessons, 63 mapped topics and ${tests.length} assessments.`);
