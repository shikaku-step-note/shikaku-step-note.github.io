import { defineConfig } from 'astro/config';
export default defineConfig({
  site: process.env.SITE_URL || 'https://shikaku-step-note.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  output: 'static',
  vite: { build: { sourcemap: false } },
  devToolbar: { enabled: false },
});
