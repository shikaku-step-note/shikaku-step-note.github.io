import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
export default defineConfig({
  site: process.env.SITE_URL || 'https://shikaku-step-note.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  output: 'static',
  markdown: {
    processor: satteri({
      hastPlugins: [
        {
          name: 'accessible-scroll-tables',
          element: {
            filter: ['table'],
            visit(node, ctx) {
              ctx.wrapNode(node, {
                type: 'element',
                tagName: 'div',
                properties: {
                  className: ['table-scroll'],
                  tabIndex: 0,
                  role: 'region',
                  ariaLabel: '横にスクロールできる表',
                },
                children: [],
              });
            },
          },
        },
      ],
    }),
  },
  vite: { build: { sourcemap: false } },
  devToolbar: { enabled: false },
});
