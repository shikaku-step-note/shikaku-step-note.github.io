import curriculum from './zeirishi-outline.json';
import sources from './zeirishi-sources.json';
import bank from './zeirishi-questions.json';
import mocks from './zeirishi-mock.json';
import type { Assessment, Question } from '../lib/assessment';
import { zeirishiDeepAssessments, zeirishiDeepLessons } from './zeirishi-expanded';
export const zeirishiSubjects = curriculum.subjects;
export const zeirishiOutline = curriculum.lessons;
export const zeirishiLearningOutline = [...zeirishiOutline, ...zeirishiDeepLessons];
export const zeirishiSources = sources;
export const zeirishiReviewed = curriculum.reviewed;
export const zeirishiVersion = curriculum.version;
export const zeirishiLimitations =
  '科目ごとに公開中の内容と、追加学習が必要な範囲を対応表で確認できます。全ての法令・通達・会計基準・特例や、本試験相当の全科目の演習を網羅した教材ではありません。';
export const zeirishiSubject = (id: string) => zeirishiSubjects.find((s) => s.id === id);
type Lesson = { data: { stableId: string; qualification: string; archived?: boolean } };
export function zeirishiAssessments(lessons: Lesson[]): Assessment[] {
  const rows = zeirishiOutline.filter((r) =>
    lessons.some((l) => l.data.qualification === 'zeirishi' && l.data.stableId === r.id && !l.data.archived),
  );
  const base = {
    qualification: 'zeirishi',
    version: zeirishiVersion,
    lessonTitles: Object.fromEntries(rows.map((r) => [r.id, r.title])),
    fieldNames: Object.fromEntries(zeirishiSubjects.map((s) => [s.id, s.name])),
  };
  const questions = bank as Record<string, Question[]>;
  const mockQuestions = mocks as Record<string, Question[]>;
  const result: Assessment[] = rows.map((r) => ({
    ...base,
    id: r.id + '-check',
    title: r.title + '：理解度チェック',
    kind: 'lesson',
    unit: r.unit,
    questions: questions[r.id] ?? [],
  }));
  for (const s of zeirishiSubjects) {
    const members = rows.filter((r) => r.subject === s.id);
    if (!members.length) continue;
    const terms = members.flatMap((r) => r.glossary);
    const glossary: Question[] = members.flatMap((r) =>
      r.glossary.map((g, i) => {
        const others = [...new Map(terms.filter((t) => t.term !== g.term).map((t) => [t.term, t])).values()];
        const candidates = Array.from({ length: 3 }, (_, j) => others[(r.position + i + j) % others.length]!);
        const options = [g.term, ...candidates.map((t) => t.term)];
        const answer = (r.position + i) % 4;
        [options[0], options[answer]] = [options[answer]!, options[0]!];
        return {
          id: r.id + '-term-' + (i + 1),
          prompt: `「${g.definition}」に当てはまる用語はどれですか。`,
          options,
          answer,
          explanation: `${g.term}：${g.definition}。${candidates.map((t) => `${t.term}は「${t.definition}」です。`).join('')}具体的な条件は本文へ戻って確かめます。`,
          lesson: r.id,
          field: s.id,
        };
      }),
    );
    result.push({
      ...base,
      id: `zeirishi-unit-${s.unit}-glossary`,
      title: `${s.name}：累積用語確認`,
      kind: 'glossary',
      unit: s.unit,
      questions: glossary,
    });
    result.push({
      ...base,
      id: `zeirishi-unit-${s.unit}-review`,
      title: `${s.name}：総復習`,
      kind: 'review',
      unit: s.unit,
      questions: members.flatMap((r) => questions[r.id] ?? []),
      instructions:
        '各レッスンの理解度チェックを再利用する累積復習です。新しい独立問題とは区別してください。記述は独自基準で自己確認します。',
    });
    result.push({
      ...base,
      id: `zeirishi-${s.id}-mock`,
      title: `${s.name}：120分の独自基礎模試`,
      kind: 'mock',
      unit: s.unit,
      minutes: 120,
      questions: mockQuestions[s.id] ?? [],
      instructions: `2026年8月本試験の大問配点（${s.majorPoints.join('・')}点）と各科目120分を参照した独自の基礎演習です。小問数・資料量・難易度・詳細配点は公式と同一ではありません。数値・語句は指定解答と照合し、記述は提出後に独自の確認基準で自己確認します。公式の60%基準へ換算せず合否は判定しません。2026年4月3日現在施行法令を参照し、各問の対象年・事業年度・仮定を優先します。法定の講習や科目免除を与えるものではありません。`,
    });
  }
  const available = new Set(lessons.filter((l) => !l.data.archived).map((l) => l.data.stableId));
  return [
    ...result,
    ...zeirishiDeepAssessments.filter((assessment) =>
      assessment.questions.every((question) => available.has(question.lesson)),
    ),
  ];
}
export { checkSubjectCombination } from '../lib/subject-selection';
