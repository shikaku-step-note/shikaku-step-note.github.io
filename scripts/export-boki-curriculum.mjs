import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { parse } from 'yaml';
import { bokiCoverage } from '../src/data/boki-coverage.ts';
import { beginnerCurriculum } from './beginner-curriculum.mjs';
import { costCurriculum } from './cost-curriculum.mjs';
import { boki3Curriculum } from './boki3-curriculum.mjs';
import {
  bokiCourses,
  bokiAssessments,
  bokiSources,
  bokiReviewed,
  bokiFieldNames,
} from '../src/data/bookkeeping.ts';
const lessons = readdirSync('src/content/lessons')
  .filter((n) => n.endsWith('.md'))
  .map((n) => ({ data: parse(readFileSync('src/content/lessons/' + n, 'utf8').split('---')[1]) }));
const tests = bokiAssessments(lessons);
mkdirSync('public/downloads', { recursive: true });
for (const c of bokiCourses) {
  const rows = lessons
    .filter((l) => l.data.qualification === c.id && !l.data.archived)
    .sort((a, b) => a.data.order - b.data.order);
  const lines = [
    `${c.name} 学習ツリー・スケジュール`,
    '適用：2026年度の範囲を参照。2027年度は別途改訂。',
    `資料確認日：${bokiReviewed}`,
    `前提：${c.prerequisite}`,
    '公式の級とサイト内のユニット・レッスンは異なります。',
    c.plan,
    '',
    '学習ツリー',
    c.name,
  ];
  if (c.id === 'boki-beginner') {
    writeFileSync(`public/downloads/${c.id}-curriculum.txt`,beginnerCurriculum(rows).join('\n')+'\n');
    continue;
  }
  if (c.id === 'cost-beginner') {
    writeFileSync(`public/downloads/${c.id}-curriculum.txt`,costCurriculum(rows).join('\n')+'\n');
    continue;
  }
  if (c.id === 'boki-3') {
    writeFileSync(`public/downloads/${c.id}-curriculum.txt`,boki3Curriculum(rows,tests.filter(a=>a.qualification===c.id)).join('\n')+'\n');
    continue;
  }
  c.groups.forEach((g, i) => {
    lines.push(`  ユニット${i + 1} ${g}`);
    for (const l of rows.filter((l) => l.data.unit === i + 1)) {
      lines.push(
        `    ${l.data.order}. [${l.data.stableId}] ${l.data.title}（学習目安${l.data.minutes}分）`,
        `      科目：${bokiFieldNames[l.data.subject ?? 'basics']}`,
        `      目標：${l.data.objectives.join('／')}`,
        `      前提：${l.data.prerequisite}`,
        `      次：${rows.find((next) => next.data.order === l.data.order + 1)?.data.stableId ?? c.id + '-review-all'}`,
        `      理解度チェック：[${l.data.stableId}-check]`,
        `      用語：${l.data.glossary.map((g) => g.term).join('・')}`,
      );
    }
    lines.push(
      `    用語確認：[${c.id}-unit-${i + 1}-glossary]`,
      `    総合確認：[${c.id}-unit-${i + 1}-review]`,
      `    復習：翌日・1週間後に例題を見ずに解く。`,
    );
  });
  lines.push('', '総復習・模試');
  for (const a of tests.filter(
    (a) => a.qualification === c.id && (a.id.includes('-all') || a.kind === 'mock'),
  ))
    lines.push(`  [${a.id}] ${a.title}／${a.questions.length}小問${a.minutes ? `／${a.minutes}分` : ''}`);
  lines.push('', '公式範囲と教材の対応');
  for (const row of bokiCoverage[c.id])
    lines.push(
      `${row.official} → ${row.lessons.length ? row.lessons.join(', ') : '未収録'}／${row.depth}`,
      `  制約：${row.note}`,
    );
  lines.push(
    '',
    '範囲・制約',
    '各レッスンの目標、例題、理解度チェックの対応をWebの対応表で確認してください。',
    '用語テストは本文の定義、総復習はレッスン問題を再利用。模試は別の独自問題です。',
    '公式の採点箇所・部分点・難易度を再現せず、合否や範囲全体の習熟を保証しません。',
    '学習目安は読む・解く・解説確認を含む独自の見積りです。',
    '旧サンプルの完了記録は保管し、新コースの完了とは分けます。',
    '',
    '公式資料',
  );
  for (const s of bokiSources) lines.push(`${s.title}／${s.version}`, s.url, `確認日：${bokiReviewed}`);
  writeFileSync(`public/downloads/${c.id}-curriculum.txt`, lines.join('\n') + '\n');
}

writeFileSync(
  'public/downloads/boki-curriculum-all.txt',
  bokiCourses
    .map((c) => readFileSync(`public/downloads/${c.id}-curriculum.txt`, 'utf8'))
    .join('\n\n====================\n\n'),
);
