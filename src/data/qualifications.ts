import { bokiCourses, bokiReviewed } from './bookkeeping';
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
  status: 'course' | 'sample';
}
export const qualifications: Qualification[] = [
  ...bokiCourses
    .filter((c) => c.id !== 'boki-3')
    .map((c) => ({
      id: c.id,
      status: 'course' as const,
      name: c.name,
      shortName: c.name.replace('日商', ''),
      category: '会計・ビジネス',
      color: 'blue',
      icon: 'book',
      intro: '取引と数字の意味を、例題から一つずつ。',
      description: `${c.name}を独自の解説・例題・理解度チェック・用語確認で学びます。適用範囲と教材の制約は対応表で確認できます。`,
      audience: ['取引の理由を理解しながら学びたい方', '例題を紙と電卓で確かめたい方'],
      outcome: '仕訳・計算の手順を説明し、条件に合う処理を選ぶ練習をします。',
      prerequisite: c.prerequisite,
      groups: c.groups,
      official: 'https://www.kentei.ne.jp/bookkeeping',
      officialName: '日本商工会議所：簿記',
      reviewed: bokiReviewed,
      scope:
        '2026年度適用範囲を参照した独自教材です。公式の問題・採点・難易度を再現するものではありません。対応表で説明・練習の到達範囲をご確認ください。',
    })),
  {
    id: 'it-passport',
    status: 'course',
    name: 'ITパスポート',
    shortName: 'ITパスポート',
    category: 'IT・情報',
    color: 'teal',
    icon: 'computer',
    intro: 'ITの「なんとなく」を、わかるに変える。',
    description:
      '現行シラバスVer.6.5の3分野・23分類を、解説、理解度チェック、用語・復習テスト、100問の模擬試験で学びます。',
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
    reviewed: '2026-10-25',
    scope:
      '現行シラバスVer.6.5の63項目に対応した基礎コースです。公式の級分けはなく、ストラテジ・マネジメント・テクノロジの3分野を順に学びます。用語例の全件解説や出題予測を保証するものではありません。',
  },
  {
    id: 'boki-3',
    status: 'course',
    name: '日商簿記3級',
    shortName: '簿記3級',
    category: '会計・ビジネス',
    color: 'blue',
    icon: 'book',
    intro: 'お金の動きを、読める力に。',
    description:
      '2026年度の商業簿記を、取引の記録から決算まで順番に学びます。用語確認と総合演習で、処理の理由も確かめます。',
    audience: ['簿記を初めて学ぶ方', '経理や会計の基礎を知りたい方', '事業のお金の流れを理解したい方'],
    outcome: '基本的な取引を左右に分けて記録し、貸借対照表と損益計算書の役割を説明できるようになります。',
    prerequisite:
      '特別な会計知識は不要です。四則計算を使います。紙とペンがあると、仕訳の練習がしやすくなります。',
    groups: ['取引を仕訳にする', '帳簿と決算をつなぐ'],
    official: 'https://www.kentei.ne.jp/bookkeeping/class3',
    officialName: '日本商工会議所：簿記3級',
    reviewed: bokiReviewed,
    scope:
      '2026年度適用の商業簿記を対象とする独自の基礎コースです。旧サンプルは別に保管し、現行レッスンの完了数に加えません。対応表で扱う範囲と制約をご確認ください。',
  },
  {
    id: 'fp-3',
    status: 'sample',
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
const displayOrder = ['it-passport', 'boki-beginner', 'cost-beginner', 'boki-3', 'boki-2', 'boki-1', 'fp-3'];
qualifications.sort((a, b) => displayOrder.indexOf(a.id) - displayOrder.indexOf(b.id));
export const qualificationById = (id: string) => qualifications.find((q) => q.id === id)!;
export const availabilityText = qualifications
  .map((q) => `${q.name}（${q.status === 'course' ? '基礎コース' : '入門サンプル'}）`)
  .join('、');
