export interface Qualification {
  id: string;
  name: string;
  shortName: string;
  category: string;
  color: string;
  icon: string;
  intro: string;
  description: string;
  audience: string[];
  outcome: string;
  prerequisite: string;
  groups: string[];
  official: string;
  officialName: string;
  reviewed: string;
  scope: string;
}
export const qualifications: Qualification[] = [
  {
    id: 'it-passport',
    name: 'ITパスポート',
    shortName: 'ITパスポート',
    category: 'IT・情報',
    color: 'teal',
    icon: 'computer',
    intro: 'ITの「なんとなく」を、わかるに変える。',
    description:
      '仕事や暮らしで使うITの基礎を、身近な例から整理します。企業活動、ITの管理、技術の考え方をつなげて学ぶ入門コースです。',
    audience: [
      'ITの用語を基礎から理解したい方',
      '仕事でITを使う機会が増えた方',
      '情報系の学習を初めて始める方',
    ],
    outcome: 'ITの基本用語を具体例で説明し、情報を安全に扱うための考え方を身につけます。',
    prerequisite:
      'プログラミングの経験は不要です。普段使っているスマートフォンやパソコンを思い浮かべながら進めましょう。',
    groups: ['企業とITの関係を知る', '仕事を進める仕組みを知る', '技術と安全の基本を知る'],
    official: 'https://www.ipa.go.jp/shiken/kubun/ip.html',
    officialName: 'IPA：ITパスポート試験',
    reviewed: '2026-10-24',
    scope:
      '試験の学習領域はストラテジ系、マネジメント系、テクノロジ系に分かれています。このサイトでは、企業活動・プロジェクト・情報セキュリティの入口を扱います。試験範囲全体を網羅するものではありません。',
  },
  {
    id: 'boki-3',
    name: '日商簿記3級',
    shortName: '簿記3級',
    category: '会計・ビジネス',
    color: 'blue',
    icon: 'book',
    intro: 'お金の動きを、読める力に。',
    description:
      '取引を記録するルールを、日常の小さなお店の例で学びます。資産や負債の意味をつかみ、仕訳から決算の入口まで順番に進めます。',
    audience: ['簿記を初めて学ぶ方', '経理や会計の基礎を知りたい方', '事業のお金の流れを理解したい方'],
    outcome: '基本的な取引を左右に分けて記録し、貸借対照表と損益計算書の役割を説明できるようになります。',
    prerequisite:
      '特別な会計知識は不要です。四則計算を使います。紙とペンがあると、仕訳の練習がしやすくなります。',
    groups: ['簿記の全体像をつかむ', '取引を仕訳にする', '決算の入口を知る'],
    official: 'https://www.kentei.ne.jp/bookkeeping/class3',
    officialName: '日本商工会議所：簿記3級',
    reviewed: '2026-10-24',
    scope:
      '日商簿記3級は商業簿記の基礎を学ぶ検定です。このサイトのサンプルは、簿記の目的・基本的な仕訳・決算の考え方に絞っています。最新の出題区分や受験案内は主催者の案内で確認してください。',
  },
  {
    id: 'fp-3',
    name: 'FP3級',
    shortName: 'FP3級',
    category: 'お金・暮らし',
    color: 'amber',
    icon: 'wallet',
    intro: '暮らしのお金に、自分のものさしを。',
    description:
      '将来の暮らしを考えるために、お金の基本を学びます。ライフプラン、リスクへの備え、金融商品の特徴を、身近な場面で整理します。',
    audience: [
      '家計と将来のお金を整理したい方',
      '保険や資産運用の用語を学びたい方',
      'FPの学習を基礎から始める方',
    ],
    outcome: '目標と収支の関係を整理し、リスクへの備えや金融商品を考えるための基礎を身につけます。',
    prerequisite:
      '金融の専門知識は不要です。教材中の数字は説明用の架空例です。個別の投資・税務判断を行う教材ではありません。',
    groups: ['ライフプランの土台をつくる', 'リスクへの備えを考える', '金融商品の特徴を知る'],
    official: 'https://www.jafp.or.jp/exam/outline/',
    officialName: '日本FP協会：2級・3級FP技能検定 試験要綱',
    reviewed: '2026-10-24',
    scope:
      'FP技能検定の学習は、生活設計、保険、金融、税、不動産、相続などの領域に広がります。このサンプルは最初の三つの考え方を紹介するもので、制度の詳細や試験範囲全体は扱っていません。',
  },
];
export const qualificationById = (id: string) => qualifications.find((q) => q.id === id)!;
