export const siteName = '資格ステップノート';
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path = '') => `${base}/${path.replace(/^\//, '')}`;
export const publicPageLinks = [
  { path: '', title: 'ホーム' },
  { path: 'qualifications/', title: '資格一覧・学習コース' },
  { path: 'qualifications/boki/', title: '日商簿記の級・区分の選び方' },
  { path: 'guide/', title: '使い方・データの保存' },
  { path: 'about/', title: '資格ステップノートについて' },
  { path: 'editorial/', title: '編集方針・出典' },
  { path: 'privacy/', title: 'プライバシーポリシー' },
  { path: 'terms/', title: '利用規約・免責事項' },
  { path: 'faq/', title: 'よくある質問' },
  { path: 'contact/', title: 'お問い合わせ・訂正' },
  { path: 'sitemap/', title: 'サイトマップ' },
];
export const publicPages = publicPageLinks.map((page) => page.path);
export const infoPages = ['guide', 'about', 'editorial', 'privacy', 'terms', 'faq', 'contact'];
