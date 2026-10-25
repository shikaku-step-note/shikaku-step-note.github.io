export type ThemePreference = 'system' | 'light' | 'dark';
const themeKey = 'shikaku-step-note:theme';
const media = window.matchMedia('(prefers-color-scheme: dark)');
let preference: ThemePreference = 'system';
try {
  const saved = localStorage.getItem(themeKey);
  if (saved === 'light' || saved === 'dark') preference = saved;
} catch {}
function apply() {
  const dark = preference === 'dark' || (preference === 'system' && media.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#101a24' : '#ffffff');
  document
    .querySelectorAll<HTMLInputElement>('input[name="theme"]')
    .forEach((input) => (input.checked = input.value === preference));
}
apply();
media.addEventListener('change', () => {
  if (preference === 'system') apply();
});
window.addEventListener('storage', (event) => {
  if (event.key === themeKey) {
    preference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'system';
    apply();
  }
});
document.querySelectorAll<HTMLInputElement>('input[name="theme"]').forEach((input) =>
  input.addEventListener('change', () => {
    preference = input.value as ThemePreference;
    apply();
    const status = document.querySelector('[data-theme-save]');
    try {
      if (preference === 'system') localStorage.removeItem(themeKey);
      else localStorage.setItem(themeKey, preference);
      if (status) status.textContent = '表示設定をこのブラウザに保存しました。';
    } catch {
      if (status) status.textContent = 'この画面に適用しました。ブラウザの制限により設定は保存できません。';
    }
  }),
);
document.addEventListener('click', (event) => {
  const menu = document.querySelector<HTMLDetailsElement>('[data-theme-menu]');
  if (menu && !menu.contains(event.target as Node)) menu.open = false;
});
document.addEventListener('keydown', (event) => {
  const menu = document.querySelector<HTMLDetailsElement>('[data-theme-menu]');
  if (event.key === 'Escape' && menu?.open) {
    menu.open = false;
    menu.querySelector('summary')?.focus();
  }
});
