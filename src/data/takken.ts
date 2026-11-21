import outline from './takken-outline.json';
import bank from './takken-questions.json';
import mock from './takken-mock.json';
import mock02 from './takken-mock-02.json';
import privateQuestions from './takken-private-questions.json';
import businessQuestions from './takken-business-questions.json';
import landQuestions from './takken-land-questions.json';
import otherQuestions from './takken-other-questions.json';
import reviewQuestions from './takken-unit-review.json';
import sources from './takken-sources.json';
import type { Assessment, Question } from '../lib/assessment';
export const takkenReviewed = '2026-11-21';
export const takkenVersion = 'takken-2026-v2';
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
  ['基礎の導入', 'ユニット1：契約・意思表示・代理・時効。意味を説明し、人物と時系列を描いてから条件の変わる例へ進みます。'],
  ['権利の標準適用から応用', 'ユニット2：物権・債権・借地借家・相続・区分所有。共有・多数当事者と各契約を分けて学び、違う資料でも理由を説明します。'],
  ['取引実務の適用', 'ユニット3：免許・説明書面・売主規制・報酬。クーリング・オフの期間、受領累計、当事者双方の上限を別の事例で確認します。'],
  ['区域と手続の総合判断', 'ユニット4・5：都市計画・建築・土地利用。各手続の条件と順序を学び、最後に一つの敷地の資料で組み合わせます。'],
  ['税・価格・資料の応用', 'ユニット6〜8：税の計算段階、特例の条件、価格評価、金融・広告・統計、土地建物。単位と対象を変えた資料も読みます。'],
  ['累積復習と独立した模試2回', '各ユニット後に用語と新しい総合問題へ進み、翌日と1週間後に解き直します。全分野復習後、一般120分又は免除110分の第1回、弱点復習、第2回の順で取り組みます。'],
];
export const takkenLimitations =
  '七つの公式分野を、基礎の説明、条件を変えた例題、資料の読解、独立した確認問題へつなげる独自教材です。法令基準日は2026年4月1日です。地域の条例、個別事案の判断、判例・手続の追加確認が必要な範囲は対応表に示します。';
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
  const supplements = { ...privateQuestions, ...businessQuestions, ...landQuestions, ...otherQuestions } as Record<string, Question[]>;
  const original = bank as Record<string, Question[]>;
  const entries = Object.fromEntries(rows.map((r) => [r.id, [...(original[r.id] ?? []), ...(supplements[r.id] ?? [])]]));
  const reviews = reviewQuestions as Record<string, Question[]>;
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
    const allTerms = [...new Map(members.flatMap((r) => r.glossary).map((term) => [term.term, term])).values()];
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
          prompt: `「${r.title}」で学んだ「${g.definition}」に当てはまる用語はどれですか。`,
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
      questions: reviews[String(unit)] ?? [],
      instructions: '本文の例題・理解度チェックと別の問題です。入力欄の単位を確かめて解答し、条件から判断した理由も説明してください。数値入力は学習用の追加練習です。',
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
    questions: Object.values(reviews).flat(),
    instructions: '各ユニットの総合確認を混ぜて再利用します。初見問題としての得点とは区別し、時間を空けて解き直してください。',
  });
  const instructions =
    '2026年4月1日施行法令を前提とする独自の四肢択一問題です。各問1点、誤答・未解答は0点。2026年度の合格基準は2026年11月21日の確認時点で未公表のため、合否判定は行いません。公開問題を参照した分野配分で、実際の受験者による難度の調整は未実施です。紙にメモし、電卓・参考書は使わず取り組んでください。';
  result.push({
    ...base,
    id: 'takken-mock-general',
    title: '宅建士：第1回 一般受験形式の模試',
    kind: 'mock',
    minutes: 120,
    questions: mock as Question[],
    instructions,
  });
  result.push({
    ...base,
    id: 'takken-mock-exempt',
    title: '宅建士：第1回 5問免除形式の模試',
    kind: 'mock',
    minutes: 110,
    questions: (mock as Question[]).filter((q) => !['1', '5'].includes(q.field)),
    instructions:
      instructions +
      '\n第1回一般形式と45問を共有します。登録講習修了者の方式を参照し、土地建物・需給の5問を除いています。免除を受けるには公式の適格条件を満たす必要があります。',
  });
  result.push({
    ...base,
    id: 'takken-mock-general-02',
    title: '宅建士：第2回 一般受験形式の模試',
    kind: 'mock',
    minutes: 120,
    questions: mock02 as Question[],
    instructions: instructions + '\n第1回とは別の独自50問です。',
  });
  result.push({
    ...base,
    id: 'takken-mock-exempt-02',
    title: '宅建士：第2回 5問免除形式の模試',
    kind: 'mock',
    minutes: 110,
    questions: (mock02 as Question[]).filter((q) => !['1', '5'].includes(q.field)),
    instructions: instructions + '\n第2回一般形式と45問を共有します。第1回とは別の問題です。免除を受けるには公式の適格条件を満たす必要があります。',
  });
  return result;
}
