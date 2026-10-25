export const siteName = '資格ステップノート';
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path = '') => `${base}/${path.replace(/^\//, '')}`;
export const publicPages = [
  '',
  'qualifications/',
  'qualifications/boki/',
  'guide/',
  'about/',
  'editorial/',
  'privacy/',
  'terms/',
  'faq/',
  'contact/',
];
export const infoPages = ['guide', 'about', 'editorial', 'privacy', 'terms', 'faq', 'contact'];
