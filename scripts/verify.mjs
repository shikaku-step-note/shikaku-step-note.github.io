import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
const root = resolve('dist');
const origin = process.env.SITE_URL || 'https://shikaku-step-note.github.io';
const base = (process.env.BASE_PATH || '/web/').replace(/\/$/, '');
const walk = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(root);
const htmlFiles = files.filter((p) => p.endsWith('.html'));
const failures = [];
const titles = new Set();
let internalLinks = 0;
const fail = (path, message) => failures.push(`${path.replace(root, '')}: ${message}`);
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const noindex = /name="robots" content="noindex,follow"/.test(html);
  if (!title || titles.has(title)) fail(file, 'missing or duplicate title');
  titles.add(title);
  if (!/<html lang="ja"/.test(html)) fail(file, 'missing Japanese language');
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail(file, 'missing description');
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) fail(file, 'expected exactly one h1');
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical?.startsWith(`${origin}${base}/`)) fail(file, 'incorrect canonical');
  if (noindex && listed.includes(canonical)) fail(file, 'noindex URL included in sitemap');
  if (!noindex && !listed.includes(canonical)) fail(file, 'indexable URL absent from sitemap');
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const data = JSON.parse(m[1]);
      if (data['@context'] !== 'https://schema.org') throw new Error();
    } catch {
      fail(file, 'invalid JSON-LD');
    }
  }
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (!url.startsWith('/')) continue;
    if (!url.startsWith(`${base}/`)) {
      fail(file, `link escapes base: ${url}`);
      continue;
    }
    const pathname = decodeURIComponent(url.split(/[?#]/)[0].slice(base.length + 1));
    const path = join(root, pathname);
    internalLinks++;
    if (!(existsSync(path) && (!statSync(path).isDirectory() || existsSync(join(path, 'index.html')))))
      fail(file, `broken local link: ${url}`);
  }
}
const index = JSON.parse(readFileSync(join(root, 'search-index.json'), 'utf8'));
const lessons = index.filter((e) => e.kind === 'レッスン');
if (new Set(index.map((e) => e.id)).size !== index.length) fail('content', 'duplicate stable identifier');
for (const lesson of lessons) {
  const path = join(root, lesson.url.slice(base.length + 1), 'index.html');
  if (lesson.sample && !readFileSync(path, 'utf8').includes('name="robots" content="noindex,follow"'))
    fail(path, 'sample should be noindex');
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(
  `Verified ${htmlFiles.length} HTML pages, ${listed.length} sitemap URLs, ${internalLinks} local references, JSON-LD, unique titles and ${lessons.length} sample lessons.`,
);
