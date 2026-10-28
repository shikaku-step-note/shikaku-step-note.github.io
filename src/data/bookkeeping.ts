import bank from './boki-questions.json';
import mockBank from './boki-mock.json';
import type { Assessment, Question } from '../lib/assessment';
import { beginnerAssessments, beginnerGroups, beginnerPlan } from './boki-beginner';
export const bokiReviewed = '2026-10-25';
export const bokiVersion = 'boki-2026-v1';
export const bokiSources = [
  {
    id: 'asbj-revenue',
    title: 'ASBJ：収益認識に関する会計基準',
    url: 'https://www.asb-j.jp/jp/accounting_standards_system/details.html?topics_id=13',
    version: '第29号。現行検索の改正日と2026年度試験適用を区別',
  },
  {
    id: 'asbj-finance',
    title: 'ASBJ：金融商品に関する会計基準',
    url: 'https://www.asb-j.jp/jp/accounting_standards_system/details.html?topics_id=109',
    version: '第10号。将来適用の改正を例題へ自動反映しない',
  },
  {
    id: 'asbj-tax',
    title: 'ASBJ：税効果会計に係る会計基準',
    url: 'https://www.asb-j.jp/jp/accounting_standards_system/details.html?topics_id=84',
    version: '一時差異と期間配分の説明を参照',
  },
  {
    id: 'asbj-lease',
    title: 'ASBJ：リース取引に関する従来の会計基準',
    url: 'https://www.asb-j.jp/jp/accounting_standards_system/details.html?topics_id=36',
    version: '第13号。2026年度教材の借手区分に参照。第34号と区別',
  },
  {
    id: 'asbj-retirement',
    title: 'ASBJ：退職給付に関する適用指針',
    url: 'https://www.asb-j.jp/jp/accounting_standards_system/details.html?topics_id=125',
    version: '年金資産・期待運用収益等の基本関係を参照',
  },
  {
    id: 'asbj-combination',
    title: 'ASBJ：企業結合に関する会計基準',
    url: 'https://www.asb-j.jp/jp/accounting_standards_system/details.html?topics_id=123',
    version: '第21号。取得と純資産の配分等を参照',
  },
  {
    id: 'asbj-change',
    title: 'ASBJ：会計上の変更及び誤謬の訂正等の基準',
    url: 'https://www.asb-j.jp/jp/accounting_standards_system/details.html?topics_id=39',
    version: '第24号。変更と誤謬の区分に参照',
  },
  {
    id: 'asbj-impairment',
    title: 'ASBJ：固定資産の減損適用指針',
    url: 'https://www.asb-j.jp/jp/wp-content/uploads/sites/4/lease_20240913_14_20241101.pdf',
    version: '認識判定・回収可能価額の基本を参照',
  },
  {
    id: 'asbj-removal',
    title: 'ASBJ：資産除去債務の解説',
    url: 'https://www.asb-j.jp/jp/wp-content/uploads/sites/4/manual_21_manual.pdf',
    version: '現在価値・資産計上・時の経過の基本を参照',
  },
  {
    id: 'asbj-interim',
    title: 'ASBJ：期中財務諸表基準の比較資料',
    url: 'https://www.asb-j.jp/jp/wp-content/uploads/sites/4/kichu_20251016_03.pdf',
    version: '第37号・2025年公表資料。2026年1月の改正案内も併読',
  },
  {
    id: 'asbj-interim-2026',
    title: 'ASBJ：第37号の2026年1月改正',
    url: 'https://www.asb-j.jp/jp/wp-content/uploads/sites/4/kouhatsujisyou20260109_06.pdf',
    version: '2026年1月9日・期中基準の改正',
  },
  {
    id: 'fsa-cashflow',
    title: '金融庁：キャッシュ・フロー計算書等の作成基準',
    url: 'https://www.fsa.go.jp/p_mof/singikai/kaikei/tosin/1a909b2.htm',
    version: '資金範囲・活動区分・表示の原則を参照',
  },
  {
    id: 'current',
    title: '日本商工会議所：2026年度適用範囲（2022年度版）と変更の注意',
    url: 'https://www.kentei.ne.jp/bookkeeping/35697-2/2022-2026',
    version: '2026年度・2026年4月1日現在の法令等',
  },
  {
    id: 'commercial',
    title: '商業簿記・会計学 出題区分表（現行ページから案内されるPDF）',
    url: 'https://www.kentei.ne.jp/wp/wp-content/uploads/2021/03/2021_shokai1-3.pdf',
    version: '掲載ファイル名は2021。現行案内・改定説明と併読',
  },
  {
    id: 'industrial',
    title: '工業簿記・原価計算 出題区分表',
    url: 'https://www.kentei.ne.jp/wp/wp-content/uploads/2021/12/2022_kogen.pdf',
    version: '2022年4月1日施行、2026年度も適用',
  },
  {
    id: 'beginner',
    title: '簿記初級 出題範囲・内容',
    url: 'https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30bokishokyu.pdf',
    version: '2026年度も変更なし',
  },
  {
    id: 'cost',
    title: '原価計算初級 出題範囲・内容',
    url: 'https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf',
    version: '2026年度も変更なし',
  },
  {
    id: 'first',
    title: '1級：試験科目・注意事項',
    url: 'https://www.kentei.ne.jp/bookkeeping/class1/exam',
    version: '前半90分・後半90分、合計70%以上かつ各科目40%以上',
  },
  {
    id: 'second',
    title: '2級：試験科目・注意事項',
    url: 'https://www.kentei.ne.jp/bookkeeping/class2/exam',
    version: '90分・5題以内・70%以上',
  },
  {
    id: 'third',
    title: '3級：試験科目・注意事項',
    url: 'https://www.kentei.ne.jp/bookkeeping/class3/exam',
    version: '60分・3題以内・70%以上',
  },
  {
    id: 'beginner-exam',
    title: '簿記初級：趣旨・内容',
    url: 'https://www.kentei.ne.jp/bookkeeping/class-s/effect',
    version: '40分・100点満点の70点以上',
  },
  {
    id: 'cost-exam',
    title: '原価計算初級：趣旨・内容',
    url: 'https://www.kentei.ne.jp/bookkeeping/ca/effect',
    version: '40分・100点満点の70点以上',
  },
  {
    id: 'format',
    title: '2・3級ネット試験Q&A（勘定科目選択・数値入力）',
    url: 'https://www.kentei.ne.jp/net-qa',
    version: '実施方式・解答形式の説明',
  },
  {
    id: 'samples',
    title: '公式サンプル案内・著作権の注意',
    url: 'https://www.kentei.ne.jp/bookkeeping/sample',
    version: '問題の転載は行わず、形式の確認に参照',
  },
  {
    id: 'future',
    title: '2027年度適用区分表の確定のお知らせ',
    url: 'https://www.kentei.ne.jp/51147',
    version: '2027年4月1日以降。現行版とは区別',
  },
  {
    id: 'future-score',
    title: '2027年度以降の3級配点変更',
    url: 'https://www.kentei.ne.jp/51504',
    version: '2027年4月以降は45・25・30点。現行の教材へ混在させない',
  },
];
export const bokiFieldNames: Record<string, string> = {
  commercial: '商業簿記',
  accounting: '会計学',
  industrial: '工業簿記',
  cost: '原価計算',
  basics: '簿記の基本',
};
export const bokiCourses = [
  {
    id: 'boki-beginner',
    name: '日商簿記初級',
    minutes: 40,
    source: 'beginner',
    groups: beginnerGroups,
    prerequisite: '前提知識は不要です。電卓と紙を用意し、取引を左右に分ける練習から始めます。',
    next: 'boki-3',
    plan: beginnerPlan,
  },
  {
    id: 'cost-beginner',
    name: '日商原価計算初級',
    minutes: 40,
    source: 'cost',
    groups: ['原価の分類と集計', '利益計画と製品別の損益'],
    prerequisite:
      '割合と四則計算を使います。簿記初級の受験は必須ではありません。原価と支出の違いから学べます。',
    next: 'boki-2',
    plan: '1日30分を週5日、4週間を目安にします。原価分類、配賦、在庫と損益、CVP・差異分析の順に進み、最後の週に用語の総復習と40分の演習を置きます。',
  },
  {
    id: 'boki-3',
    name: '日商簿記3級',
    minutes: 60,
    source: 'commercial',
    groups: ['取引を仕訳にする', '帳簿と決算をつなぐ'],
    prerequisite:
      '簿記初級相当の用語を確認すると進めやすくなります。受験上の必須条件ではなく、学習順序の提案です。',
    next: 'boki-2',
    plan: '1日40分を週5日、8〜12週間を目安にします。最初の2週は取引、次の4〜6週は帳簿と決算、残りは総合問題と復習です。60分演習の翌日に、誤った仕訳を理由付きで書き直します。',
  },
  {
    id: 'boki-2',
    name: '日商簿記2級',
    minutes: 90,
    source: 'commercial',
    groups: ['商業簿記を広げる', '工業簿記と原価計算'],
    prerequisite:
      '3級の仕訳・決算整理・財務諸表を説明できることを学習上の前提とします。工業簿記は原価計算初級も参照できます。',
    next: 'boki-1',
    plan: '3級学習後、1日45〜60分を週5日、4〜6か月を目安にします。商業と工業を週内で交互に学び、連結と総合原価計算には復習日を追加します。終盤は90分の総合演習と翌日の解き直しを組にします。',
  },
  {
    id: 'boki-1',
    name: '日商簿記1級',
    minutes: 90,
    source: 'commercial',
    groups: ['商業簿記・会計学', '工業簿記・原価計算'],
    prerequisite:
      '2級の商業簿記と工業簿記を自力で解けることを学習上の前提とします。1級では会計基準の根拠と条件を読み分ける練習が必要です。',
    next: 'boki-1',
    plan: '2級学習後、1日60〜90分を週5日、9〜18か月を見込む学習案です。商業・会計と工業・原価を交互にし、毎週1日を累積復習へ充てます。最後に前半90分と後半90分を別セッションで演習し、科目別の不足を振り返ります。',
  },
];
export const bokiCourse = (id: string) => bokiCourses.find((c) => c.id === id);
type Lesson = {
  data: {
    qualification: string;
    stableId: string;
    title: string;
    order?: number;
    unit?: number;
    glossary: { term: string; definition: string }[];
    archived?: boolean;
  };
};
export function bokiAssessments(lessons: Lesson[]): Assessment[] {
  const result: Assessment[] = [];
  const entries = bank as Record<string, Question[]>;
  for (const course of bokiCourses) {
    if (course.id === 'boki-beginner') {
      result.push(...beginnerAssessments(lessons, entries, (mockBank as Record<string, Question[]>)['boki-beginner-mock']!));
      continue;
    }
    const rows = lessons
      .filter((l) => l.data.qualification === course.id && !l.data.archived)
      .sort(
        (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0) || a.data.stableId.localeCompare(b.data.stableId),
      );
    if (!rows.length) continue;
    const base = {
      qualification: course.id,
      version: bokiVersion,
      fieldNames: bokiFieldNames,
      lessonTitles: Object.fromEntries(rows.map((l) => [l.data.stableId, l.data.title])),
    };
    for (const row of rows) {
      const qs = entries[row.data.stableId] ?? [];
      if (qs.length)
        result.push({
          ...base,
          id: `${row.data.stableId}-check`,
          title: `${row.data.title}：理解度チェック`,
          kind: 'lesson',
          unit: row.data.unit,
          questions: qs,
        });
    }
    for (const unit of [...new Set(rows.map((l) => l.data.unit))]) {
      const unitRows = rows.filter((l) => l.data.unit === unit);
      const allTerms = rows.flatMap((l) => l.data.glossary);
      const glossary = unitRows.flatMap((l) =>
        l.data.glossary.map((term, i) => {
          const distractors = allTerms
            .filter((g) => g.term !== term.term)
            .filter((g, i, arr) => arr.findIndex((x) => x.term === g.term) === i)
            .slice(i, i + 3);
          const options = [term.term, ...distractors.map((d) => d.term)];
          const answer = i % options.length;
          [options[0], options[answer]] = [options[answer]!, options[0]!];
          return {
            id: `${l.data.stableId}-term-${i + 1}`,
            prompt: `「${term.definition}」に当てはまる用語を選んでください。`,
            options,
            answer,
            explanation: `正解は${term.term}です。${term.definition}。他の用語との違いは本文と用語欄で確認してください。`,
            lesson: l.data.stableId,
            field: entries[l.data.stableId]?.[0]?.field ?? 'basics',
          };
        }),
      );
      if (glossary.length)
        result.push({
          ...base,
          id: `${course.id}-unit-${unit}-glossary`,
          title: `${course.name}・ユニット${unit} 用語確認`,
          kind: 'glossary',
          unit,
          questions: glossary,
        });
      const review = unitRows.flatMap((l) => entries[l.data.stableId] ?? []);
      if (review.length)
        result.push({
          ...base,
          id: `${course.id}-unit-${unit}-review`,
          title: `${course.name}・ユニット${unit} 総合確認`,
          kind: 'review',
          unit,
          questions: review,
        });
    }
    const cumulative = result
      .filter((a) => a.qualification === course.id && a.kind === 'glossary')
      .flatMap((a) => a.questions);
    if (cumulative.length)
      result.push({
        ...base,
        id: `${course.id}-terms-all`,
        title: `${course.name} 用語総復習`,
        kind: 'glossary',
        questions: cumulative,
      });
    const comprehensive = rows.flatMap((l) => entries[l.data.stableId] ?? []);
    if (comprehensive.length)
      result.push({
        ...base,
        id: `${course.id}-review-all`,
        title: `${course.name} 総復習`,
        kind: 'review',
        questions: comprehensive,
      });
    const mockIds =
      course.id === 'boki-1' ? ['boki-1-mock-front', 'boki-1-mock-back'] : [`${course.id}-mock`];
    for (const id of mockIds) {
      const questions = (mockBank as Record<string, Question[]>)[id];
      if (!questions?.length) continue;
      const partnerId = course.id === 'boki-1' ? mockIds.find((x) => x !== id) : undefined;
      result.push({
        ...base,
        id,
        title: `${course.name} 基礎形式模試${course.id === 'boki-1' ? (id.endsWith('front') ? '・前半' : '・後半') : ''}`,
        kind: 'mock',
        minutes: course.minutes,
        questions,
        instructions: `紙と電卓を用意してください。各小問の条件は、同じ資料を参照すると明記された場合を除いて独立です。数値は問題文の単位で入力します。\n公式の制限時間を用いますが、小問数・配点・資料量・難易度は独自です。公式問題の転載や本試験と同等の総合問題ではなく、基礎の確認と時間管理の練習に使います。部分点はありません。${course.id === 'boki-3' ? '3大題・40、20、40点を独自に設定しています。' : course.id === 'boki-2' ? '5大題・各20点を独自に設定しています。' : ''}${course.id === 'boki-1' ? '前半は商業簿記・会計学、後半は工業簿記・原価計算です。各科目25点は本教材の配点です。二つの回を別々に保存します。公式は前後半各90分で途中休憩があります。休憩の長さは本教材では設定せず、前半終了後、任意に後半を開始します。' : '公式の合格基準は70%以上ですが、この練習得点で本試験の合否は予測できません。'}`,
        ...(id.endsWith('front') ? { nextAssessment: 'boki-1-mock-back' } : {}),
        ...(partnerId
          ? {
              companion: {
                id: partnerId,
                version: bokiVersion,
                questions: (mockBank as Record<string, Question[]>)[partnerId]!,
              },
            }
          : {}),
      });
    }
  }
  return result;
}
