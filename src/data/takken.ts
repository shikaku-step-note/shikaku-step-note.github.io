import outline from './takken-outline.json';
import bank from './takken-questions.json';
import mock from './takken-mock.json';
import sources from './takken-sources.json';
import type { Assessment, Question } from '../lib/assessment';
export const takkenReviewed = '2026-10-25';
export const takkenVersion = 'takken-2026-v1';
export const takkenSources = sources;
export const takkenOutline = outline;
export const takkenDomains: Record<string, string> = {
  '1': '土地・建物の形質等',
  '2': '権利・権利の変動',
  '3': '法令上の制限',
  '4': '税に関する法令',
  '5': '需給に関する法令・実務',
  '6': '価格の評定',
  '7': '宅建業法・関係法令',
};
export const takkenUnits = [
  '契約と意思表示の基本',
  '権利の変動と生活に関わる契約',
  '宅建業の免許と取引のルール',
  '都市計画と建築の制限',
  '土地利用・造成と行政手続',
  '税金と価格の考え方',
  '住宅の需給・広告・統計',
  '土地と建物の性質',
];
export const takkenSchedule = [
  ['1〜2週', 'ユニット1：契約・意思表示・代理・時効。人物と時系列を書き、翌日に同じ例を説明します。'],
  ['3〜6週', 'ユニット2：物権・債権・借地借家・相続・区分所有。週1日は以前の問題へ戻ります。'],
  ['7〜10週', 'ユニット3：免許から広告・監督まで。金額・日数・当事者を表で比較します。'],
  ['11〜13週', 'ユニット4・5：都市計画・建築・土地利用。許可と届出、面積の計算を解き直します。'],
  ['14〜15週', 'ユニット6〜8：税・価格・需給・土地建物。統計の対象期間と法令基準日を確認します。'],
  ['16週', '累積用語と総復習。模試は120分又は110分を別に確保し、翌日に誤答の条件を書き直します。'],
];
export const takkenLimitations =
  '七つの公式分野を34レッスンに整理した独自教材です。主要な制度と代表的な適用例を扱いますが、判例・個別法令の全例外や全手続を網羅するものではありません。対応表の「概説・追加学習」を確認し、公式資料や公開問題で学習を補ってください。';
type Lesson = { data: { qualification: string; stableId: string; title: string; archived?: boolean } };
export function takkenAssessments(lessons: Lesson[]): Assessment[] {
  const rows = outline.filter((r) =>
    lessons.some((l) => l.data.qualification === 'takken' && l.data.stableId === r.id && !l.data.archived),
  );
  if (!rows.length) return [];
  const base = {
    qualification: 'takken',
    version: takkenVersion,
    fieldNames: takkenDomains,
    lessonTitles: Object.fromEntries(rows.map((r) => [r.id, r.title])),
  };
  const entries = bank as Record<string, Question[]>;
  const result: Assessment[] = rows.map((r) => ({
    ...base,
    id: `${r.id}-check`,
    title: `${r.title}：理解度チェック`,
    kind: 'lesson',
    unit: r.unit,
    questions: entries[r.id] ?? [],
  }));
  for (let unit = 1; unit <= takkenUnits.length; unit++) {
    const members = rows.filter((r) => r.unit === unit);
    const allTerms = rows.flatMap((r) => r.glossary);
    const questions: Question[] = members.flatMap((r) =>
      r.glossary.map((g, i) => {
        const alternatives = allTerms
          .filter((t) => t.term !== g.term)
          .slice(
            (r.order + i) % Math.max(1, allTerms.length - 4),
            ((r.order + i) % Math.max(1, allTerms.length - 4)) + 3,
          );
        const options = [g.term, ...alternatives.map((t) => t.term)];
        const answer = (r.order + i) % options.length;
        [options[0], options[answer]] = [options[answer]!, options[0]!];
        return {
          id: `${r.id}-term-${i + 1}`,
          prompt: `「${g.definition}」に当てはまる用語はどれですか。`,
          options,
          answer,
          lesson: r.id,
          field: String(r.domain),
          explanation: `${g.term}：${g.definition}。${alternatives.map((t) => `${t.term}は「${t.definition}」です。`).join('')}本文の条件も読み直してください。`,
        };
      }),
    );
    result.push({
      ...base,
      id: `takken-unit-${unit}-glossary`,
      title: `ユニット${unit} ${takkenUnits[unit - 1]}：用語確認`,
      kind: 'glossary',
      unit,
      questions,
    });
    result.push({
      ...base,
      id: `takken-unit-${unit}-review`,
      title: `ユニット${unit} ${takkenUnits[unit - 1]}：総合確認`,
      kind: 'review',
      unit,
      questions: members.flatMap((r) => entries[r.id] ?? []),
    });
  }
  result.push({
    ...base,
    id: 'takken-glossary-all',
    title: '宅建士：累積用語確認',
    kind: 'glossary',
    questions: result.filter((a) => a.kind === 'glossary').flatMap((a) => a.questions),
  });
  result.push({
    ...base,
    id: 'takken-review-all',
    title: '宅建士：全分野の総復習',
    kind: 'review',
    questions: rows.flatMap((r) => entries[r.id] ?? []),
  });
  const instructions =
    '2026年4月1日施行法令を前提とする独自の四肢択一問題です。各問1点、誤答・未解答は0点。公式の難易度・出題内容を再現するものではありません。2026年度の合格基準は確認日時点で未公表であり、合否判定は行いません。科目配分は公開問題を参照した学習用の構成で、将来の出題配分を保証しません。紙にメモし、電卓は使わず取り組んでください。';
  result.push({
    ...base,
    id: 'takken-mock-general',
    title: '宅建士：一般受験形式の模試',
    kind: 'mock',
    minutes: 120,
    questions: mock as Question[],
    instructions,
  });
  result.push({
    ...base,
    id: 'takken-mock-exempt',
    title: '宅建士：5問免除形式の模試',
    kind: 'mock',
    minutes: 110,
    questions: (mock as Question[]).filter((q) => !['1', '5'].includes(q.field)),
    instructions:
      instructions +
      '\n一般形式と45問を共有します。別の問題セットではありません。登録講習を修了した適格者向けの公式方式を参照し、土地建物・需給の5問を除いています。このサイトの受講で免除資格は得られません。',
  });
  return result;
}
