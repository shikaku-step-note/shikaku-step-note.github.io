import bank from './ip-questions.json';
import mock from './ip-mock.json';
import type { Assessment, Field, Question } from '../lib/assessment';
export const ipVersion = '2026-10-v1';
export const ipReviewed = '2026-10-25';
export const syllabusItems = [
  '経営・組織論',
  '業務分析・データ利活用',
  '会計・財務',
  '知的財産権',
  'セキュリティ関連法規',
  '労働関連・取引関連法規',
  'その他の法律・ガイドライン・情報倫理',
  '標準化関連',
  '経営戦略手法',
  'マーケティング',
  'ビジネス戦略と目標・評価',
  '経営管理システム',
  '技術開発戦略の立案・技術開発計画',
  'ビジネスシステム',
  'エンジニアリングシステム',
  'e-ビジネス',
  'IoTシステム・組込みシステム',
  '情報システム戦略',
  '業務プロセス',
  'ソリューションビジネス',
  'システム活用促進・評価',
  'システム化計画',
  '要件定義',
  '調達計画・実施',
  'システム開発技術',
  '開発プロセス・手法',
  'プロジェクトマネジメント',
  'サービスマネジメント',
  'サービスマネジメントシステム',
  'ファシリティマネジメント',
  'システム監査',
  '内部統制',
  '離散数学',
  '応用数学',
  '情報に関する理論',
  'データ構造',
  'アルゴリズムとプログラミング',
  'プログラム言語',
  'その他の言語',
  'プロセッサ',
  'メモリ',
  '入出力デバイス',
  'システムの構成',
  'システムの評価指標',
  'オペレーティングシステム',
  'ファイルシステム',
  'オフィスツール',
  'オープンソースソフトウェア',
  'ハードウェア（コンピュータ・入出力装置）',
  '情報デザイン',
  'インタフェース設計',
  'マルチメディア技術',
  'マルチメディア応用',
  'データベース方式',
  'データベース設計',
  'データ操作',
  'トランザクション処理',
  'ネットワーク方式',
  '通信プロトコル',
  'ネットワーク応用',
  '情報セキュリティ',
  '情報セキュリティ管理',
  '情報セキュリティ対策・情報セキュリティ実装技術',
];
export const fieldNames: Record<Field, string> = {
  strategy: 'ストラテジ系',
  management: 'マネジメント系',
  technology: 'テクノロジ系',
};
export const units = [
  ['企業活動', [1, 2, 3]],
  ['法務', [4, 5, 6, 7, 8]],
  ['経営戦略マネジメント', [9, 10, 11, 12]],
  ['技術戦略マネジメント', [13]],
  ['ビジネスインダストリ', [14, 15, 16, 17]],
  ['システム戦略', [18, 19, 20, 21]],
  ['システム企画', [22, 23, 24]],
  ['システム開発技術', [25]],
  ['ソフトウェア開発管理技術', [26]],
  ['プロジェクトマネジメント', [27]],
  ['サービスマネジメント', [28, 29, 30]],
  ['システム監査', [31, 32]],
  ['基礎理論', [33, 34, 35]],
  ['アルゴリズムとプログラミング', [36, 37, 38, 39]],
  ['コンピュータ構成要素', [40, 41, 42]],
  ['システム構成要素', [43, 44]],
  ['ソフトウェア', [45, 46, 47, 48]],
  ['ハードウェア', [49]],
  ['情報デザイン', [50, 51]],
  ['情報メディア', [52, 53]],
  ['データベース', [54, 55, 56, 57]],
  ['ネットワーク', [58, 59, 60]],
  ['セキュリティ', [61, 62, 63]],
].map(([name, items], i) => ({
  id: i + 1,
  name: name as string,
  syllabus: items as number[],
  field: (i < 7 ? 'strategy' : i < 12 ? 'management' : 'technology') as Field,
}));
export const ipSources = [
  {
    id: 'syllabus',
    title: 'IPA：ITパスポート試験 シラバス Ver.6.5',
    url: 'https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf',
    version: '2026年1月版・現行範囲',
    verified: ipReviewed,
  },
  {
    id: 'requirements',
    title: 'IPA：試験要綱 Ver.5.6',
    url: 'https://www.ipa.go.jp/shiken/syllabus/rcu1hd00000141gq-att/youkou_ver5_6.pdf',
    version: '2026年7月掲載・試験方式と評価',
    verified: ipReviewed,
  },
  {
    id: 'overview',
    title: 'IPA：ITパスポート試験の対象者像・試験形式',
    url: 'https://www.ipa.go.jp/shiken/kubun/ip.html',
    version: '現行試験',
    verified: ipReviewed,
  },
  {
    id: 'changes',
    title: 'IPA：試験制度の見直しに関する情報',
    url: 'https://www.ipa.go.jp/shiken/syllabus/henkou/2025/20260331.html',
    version: '2027年度への移行予定・現行範囲と区別',
    verified: ipReviewed,
  },
  {
    id: 'questions',
    title: 'IPA：過去問題・ITパスポート公開問題への案内',
    url: 'https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html',
    version: '公開問題への公式な案内を確認。問題の転載はしていません',
    verified: ipReviewed,
  },
  {
    id: 'privacy-law',
    title: '個人情報保護委員会：個人情報保護法ガイドライン（通則編）',
    url: 'https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/',
    version: '利用目的・第三者提供等の基本原則',
    verified: ipReviewed,
  },
  {
    id: 'trade-law',
    title: '公正取引委員会：取適法',
    url: 'https://www.jftc.go.jp/toriteki/',
    version: '2026年1月施行・現行名称と目的',
    verified: ipReviewed,
  },
  {
    id: 'future-draft',
    title: 'IPA：新試験制度のシラバス案',
    url: 'https://www.ipa.go.jp/shiken/syllabus/henkou/2026/20260630.html',
    version: '2027年度向けITパスポート案Ver.0.1。現行の適用版とは区別',
    verified: ipReviewed,
  },
];
export const ipSource = (id: string) => ipSources.find((s) => s.id === id)!;
export const questionBank = bank as Record<string, { lesson: Question[]; review: Question[] }>;
export const mockQuestions = mock as Question[];
type LessonLike = {
  data: { stableId: string; title: string; unit?: number; glossary: { term: string; definition: string }[] };
};
export function ipAssessments(lessons: LessonLike[]): Assessment[] {
  const active = lessons.filter((l) => !!l.data.unit).sort((a, b) => (a.data.unit ?? 0) - (b.data.unit ?? 0));
  const lessonTitles = Object.fromEntries(active.map((l) => [l.data.stableId, l.data.title]));
  const make = (
    id: string,
    title: string,
    kind: Assessment['kind'],
    questions: Question[],
    unit?: number,
    minutes?: number,
  ): Assessment => ({
    id,
    title,
    kind,
    questions,
    unit,
    minutes,
    lessonTitles,
    version: ipVersion,
    qualification: 'it-passport',
  });
  const result: Assessment[] = active.map((l) =>
    make(
      `${l.data.stableId}-check`,
      `${l.data.title}：理解度チェック`,
      'lesson',
      questionBank[l.data.stableId]!.lesson,
      l.data.unit,
    ),
  );
  const glossaries: Question[] = [];
  const reviews: Question[] = [];
  for (const u of units) {
    const members = active.filter((l) => l.data.unit === u.id);
    const terms = members.flatMap((l) =>
      l.data.glossary.map((g, i) => ({
        ...g,
        lesson: l.data.stableId,
        id: `${l.data.stableId}-term-${i + 1}`,
      })),
    );
    const questions = terms.map((g, i) => {
      const options = [
        g.term,
        ...terms
          .filter((t) => t.term !== g.term)
          .slice(0, 3)
          .map((t) => t.term),
      ];
      for (const fallback of ['SLA', '主キー', '損益分岐点', 'PDCA'])
        if (options.length < 4 && !options.includes(fallback)) options.push(fallback);
      const shift = i % 4;
      const rotated = [...options.slice(shift), ...options.slice(0, shift)];
      return {
        id: g.id,
        prompt: `次の説明に当てはまる用語はどれですか。\n${g.definition}`,
        options: rotated,
        answer: rotated.indexOf(g.term),
        explanation: `${g.term}：${g.definition}`,
        lesson: g.lesson,
        field: u.field,
      };
    });
    const review = members.flatMap((l) => questionBank[l.data.stableId]!.review);
    result.push(make(`ip-unit-${u.id}-glossary`, `${u.name}：用語確認テスト`, 'glossary', questions, u.id));
    result.push(make(`ip-unit-${u.id}-review`, `${u.name}：ユニット総合確認`, 'review', review, u.id));
    glossaries.push(...questions);
    reviews.push(...review);
  }
  result.push(make('ip-glossary-all', 'ITパスポート：用語の総復習', 'glossary', glossaries));
  result.push(make('ip-review-all', 'ITパスポート：3分野の総復習', 'review', reviews));
  result.push(
    make('ip-mock-01', 'ITパスポート：120分・100問の模擬試験', 'mock', mockQuestions, undefined, 120),
  );
  return result;
}
