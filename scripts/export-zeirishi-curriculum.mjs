import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
import {
  zeirishiOutline,
  zeirishiSubjects,
  zeirishiSources,
  zeirishiReviewed,
  zeirishiVersion,
  zeirishiLimitations,
  zeirishiAssessments,
} from '../src/data/zeirishi.ts';
import { zeirishiDeepLessons, zeirishiDeepUnits, zeirishiDeepAssessments } from '../src/data/zeirishi-expanded.ts';
import { zeirishiLearningPath, zeirishiLessonIds } from '../src/data/zeirishi-learning-path.ts';
const lessons = [...zeirishiOutline, ...zeirishiDeepLessons].map((r) => ({
  data: parse(readFileSync(`src/content/lessons/${r.id}.md`, 'utf8').split('---')[1]),
}));
const assessments = zeirishiAssessments(lessons);
const site = (process.env.SITE_URL || 'https://shikaku-step-note.github.io').replace(/\/$/, '') + '/';
const base = (process.env.BASE_PATH || '/').replace(/^\/+|\/+$/g, '');
const url = (path) => new URL(`${base ? base + '/' : ''}${path}`, site).href;
if (assessments.length !== zeirishiOutline.length + zeirishiSubjects.length * 3 + zeirishiDeepAssessments.length)
  throw Error('Tax curriculum: missing assessment registry');
for (const r of zeirishiOutline) {
  const a = assessments.find((a) => a.id === r.id + '-check');
  if (!a || a.questions.length < 3 || a.questions.length > 7)
    throw Error(`Tax curriculum: incomplete lesson questions: ${r.id}`);
  if (!r.objectives.every((_, i) => a.questions.some((q) => q.objectives?.includes(i + 1))))
    throw Error(`Tax curriculum: missing skill assessment: ${r.id}`);
}
for (const s of zeirishiSubjects) {
  const a = assessments.find((a) => a.id === `zeirishi-${s.id}-mock`);
  if (!a || a.questions.length < 8 || a.minutes !== 120)
    throw Error(`Tax curriculum: incomplete mock: ${s.id}`);
  const groups = Array.from({ length: s.majorPoints.length }, (_, i) =>
    a.questions
      .filter((q) => q.group?.startsWith(`第${i + 1}問`))
      .reduce((total, q) => total + (q.points ?? 1), 0),
  );
  if (JSON.stringify(groups) !== JSON.stringify(s.majorPoints))
    throw Error(`Tax curriculum: mock major points mismatch: ${s.id}`);
  if (a.questions.reduce((total, q) => total + (q.points ?? 1), 0) !== 100)
    throw Error(`Tax curriculum: mock total points: ${s.id}`);
}
function exportText(selected) {
  const lines = [
    `税理士 ${selected.length === 1 ? selected[0].name + ' ' : ''}学習ツリー・学習案`,
    `版：${zeirishiVersion}／教材確認：${zeirishiReviewed}`,
    '公式の級分けなし。2026年度第76回の公式範囲・2026年4月3日現在施行法令を参照。',
    '11科目は会計学2と税法9。通常の試験ルートは会計2と選択税法3の計5科目。全11科目の受験は不要。',
    '所得税法・法人税法の少なくとも一方が必要。消費税法と酒税法、住民税と事業税はそれぞれ一方。',
    '免除と受験資格は別に公式案内で確認。この教材は公式講座・実務助言ではありません。',
    '',
    zeirishiLimitations,
    '',
    '推奨案：一科目ずつ1日35〜45分・週5日。ページの表示時間は読む・例題を手で解く・問題と解説を確認する目安。',
    '1週目：範囲と前提、最初のレッスン。2〜4週目：例題と条件変更・理解度確認。',
    '5〜6週目：残る本文・用語確認・科目総復習。翌日と1週間後に説明し直す。',
    '7週目：追加学習を確認し公式公表問題で形式・資料量を確認。',
    '8週目：別枠120分の模試。翌日：記述の自己確認、解説と関連レッスンで復習。',
    '8週間は基礎を巡る独自案で、公式の学習時間や合格までの準備期間ではありません。前提・理解度に応じ延長。',
    '',
  ];
  for (const s of selected) {
    lines.push(
      `科目：${s.name}（${s.category}）`,
      s.scope,
      `前提：${s.prerequisite}`,
      url(`qualifications/zeirishi/subjects/${s.id}/`),
    );
    const rows = zeirishiOutline.filter((r) => r.subject === s.id);
    const learningIds = zeirishiLessonIds(s.id);
    const nextLesson = (id) => learningIds[learningIds.indexOf(id) + 1] ?? `zeirishi-unit-${s.unit}-review`;
    lines.push('  学習ツリー（Webページと同じ順序）');
    for (const group of zeirishiLearningPath(s.id)) {
      lines.push(`    ${group.title}`);
      for (const id of group.lessonIds) {
        const lesson = lessons.find((entry) => entry.data.stableId === id).data;
        lines.push(`      ${learningIds.indexOf(id) + 1}. [${id}] ${lesson.title}／${lesson.minutes}分`,
          `        ${url(`qualifications/zeirishi/${id}/`)}`);
      }
    }
    lines.push('', '  レッスン・演習の詳細（学習順は上のツリーを参照）');
    let stage = '';
    for (const r of rows) {
      const lesson = lessons.find((l) => l.data.stableId === r.id).data;
      const a = assessments.find((a) => a.id === r.id + '-check');
      if (r.stage !== stage) {
        stage = r.stage;
        lines.push(`  学習段階：${stage}（独自区分）`);
      }
      lines.push(
        `    ${r.position}. [${r.id}] ${r.title}／${r.minutes}分`,
        `      目標：${r.objectives.join('／')}`,
        `      前提：${lesson.prerequisite}`,
        `      本文：仕組みの説明・基本例・条件を変えた比較`,
        `      理解度チェック [${a.id}] ${a.questions.length}問：${a.questions.map((q) => q.id).join('、')}`,
        `      用語：${r.glossary.map((g) => g.term).join('・')}`,
        `      次：${nextLesson(r.id)}`,
        `      追加学習・制約：${r.additionalStudy}`,
        `      URL：${url(`qualifications/zeirishi/${r.id}/`)}`,
      );
      for (const [i, skill] of r.objectives.entries())
        lines.push(
          `      技能${i + 1} ${skill}：説明・例題→自力演習兼評価 ${a.questions
            .filter((q) => q.objectives?.includes(i + 1))
            .map((q) => q.id)
            .join('、')}`,
        );
    }
    for (const a of assessments.filter((a) => a.unit === s.unit && a.kind !== 'lesson'))
      lines.push(
        `  [${a.id}] ${a.title}／${a.questions.length}小問${a.minutes ? `／${a.minutes}分・時間制限なしも選択可` : ''}`,
        `    ${url(`qualifications/zeirishi/tests/${a.id}/`)}`,
      );
    for (const unit of zeirishiDeepUnits.filter((unit) => unit.subject === s.id)) {
      const members = unit.lessonIds.map((id) => zeirishiDeepLessons.find((lesson) => lesson.id === id));
      const minutes = members.reduce((total, lesson) => total + lesson.minutes, 0);
      lines.push('', `  単元 [${unit.id}] ${unit.title}`, `    ${unit.description}`,
        `    単元確認日：${unit.reviewed}／本文・例題・理解度確認の合計目安${minutes}分（独立テストと再復習は別）`,
        `    URL：${url(`qualifications/zeirishi/units/${unit.id}/`)}`,
        '    進め方：一度に一講を終える必要はありません。45分、75分、120分など、自分の時間に分割。',
        '    翌日：前日に学んだ条件と手順を資料なしで説明。1週間後：誤った問題を再演習。',
        '    単元終了時：独立した総合確認。その翌日：根拠と解法を直し、用語の再確認へ。');
      for (const lesson of members) {
        lines.push(`    ${lesson.position}. [${lesson.id}] ${lesson.title}／${lesson.minutes}分の目安`,
          `      学習段階：${lesson.stage}（独自区分）`,
          `      前提：${lesson.prerequisites.join('、')}`,
          `      実演：${lesson.workedExamples.map((example) => `[${example.id}] ${example.section}`).join('／')}`,
          `      理解度チェック [${lesson.id}-check] ${lesson.questions.length}問／版：${lesson.assessmentVersion}`,
          `      次：${nextLesson(lesson.id)}`,
          `      URL：${url(`qualifications/zeirishi/${lesson.id}/`)}`);
        lesson.objectives.forEach((objective, n) => lines.push(
          `      [${lesson.objectiveIds[n]}] ${objective}`,
          `        独立練習：${lesson.questions.filter((question) => question.objectives.includes(n + 1)).map((question) => question.id).join('、')}`));
        for (const reference of lesson.references)
          lines.push(`      出典 [${reference.id}] ${reference.title}：${reference.locator}。${reference.version}／確認${reference.verified}`, `        ${reference.url}`);
      }
      for (const assessment of unit.assessments)
        lines.push(`    [${assessment.id}] ${assessment.title}／${assessment.questions.length}問／版：${assessment.version}`,
          `      ${url(`qualifications/zeirishi/tests/${assessment.id}/`)}`);
      lines.push('    この単元の完了は、科目全体または本試験範囲の完了を意味しません。後続教材と全体の対応表も確認してください。', '');
    }
    lines.push(
      `  2026年8月本試験の大問配点：${s.majorPoints.join('・')}点。将来の固定配分ではありません。`,
      '',
    );
  }
  lines.push(
    '科目全体の用語は本文の定義から生成、科目総復習はレッスン問題を再利用。基礎模試は別の独自問題。',
    '単元別の用語と総合確認は別に作成した問題。用語の結果を適用力の習得率へ換算しません。',
    '模試は時間・大問配点を参照しますが、小問数・資料量・難易度・細かな配点は独自です。',
    '数値等は指定解と照合。記述は解答例と独自基準で自己確認し、公式60%へ換算せず合否を判定しません。',
    '記述は最大4000字。未確認の記述は未確認として保持。学習済みの印と試験結果は別の記録です。',
    '制限時間は閉じている間も進みます。端末時計の操作の影響は防げません。',
    '',
    `詳細な対応表：${url('qualifications/zeirishi/coverage/')}`,
    '',
    '公式参照資料・適用版・確認日',
  );
  const used = new Set([
    'exam-notice',
    'exam-overview',
    'exam-scope',
    'exam-selection',
    'exam-eligibility',
    'exam-papers',
    'exam-corrections',
    'exam-retest',
    ...selected.flatMap((s) => [s.pointSource, ...s.sourceIds]),
    ...zeirishiOutline.filter((r) => selected.some((s) => s.id === r.subject)).flatMap((r) => r.sources),
  ]);
  for (const source of zeirishiSources.filter((s) => used.has(s.id)))
    lines.push(
      `[${source.id}] ${source.title}`,
      `  ${source.version}`,
      `  ${source.url}`,
      `  確認日：${source.verified}`,
    );
  lines.push(
    '',
    '記録は現在のブラウザに保存。端末間では自動同期せず、ブラウザデータ削除等で消える場合があります。',
    `定期的なバックアップ：${url('progress/#backup')}`,
  );
  return lines.join('\n') + '\n';
}
writeFileSync('public/downloads/zeirishi-curriculum.txt', exportText(zeirishiSubjects));
for (const s of zeirishiSubjects)
  writeFileSync(`public/downloads/zeirishi-${s.id}-curriculum.txt`, exportText([s]));
console.log(
  `Tax curriculum exported: ${lessons.length} lessons, ${assessments.length} assessments, 12 TXT files`,
);
