import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const KEY = 'dff33bcce6134baaacf82aa415defc55';
const ENDPOINT = 'https://www.bing.com/indexnow';

function validateUrl(value, origin) {
  const url = new URL(value);
  if (url.origin !== origin || url.href !== value || url.search || url.hash || url.username || url.password ||
      url.pathname.startsWith('/web/') || !url.pathname.endsWith('/')) {
    throw new Error('Unexpected IndexNow URL: ' + value);
  }
  return url;
}

export function buildManifest(directory, origin) {
  const root = resolve(directory);
  if (new URL(origin).origin !== origin || !origin.startsWith('https://')) throw new Error('Invalid site origin');
  if (readFileSync(resolve(root, KEY + '.txt'), 'utf8').trim() !== KEY) throw new Error('Missing matching IndexNow key');
  const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
  const pages = {};
  for (const [, value] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = validateUrl(value.trim(), origin);
    const path = resolve(root, '.' + decodeURIComponent(url.pathname), 'index.html');
    if (!path.startsWith(root + sep) || Object.hasOwn(pages, url.href)) throw new Error('Invalid sitemap entry: ' + value);
    const html = readFileSync(path, 'utf8');
    if (!html.includes('rel="canonical" href="' + url.href + '"') ||
        /<meta[^>]+name="robots"[^>]+content="[^"]*\bnoindex\b/i.test(html)) {
      throw new Error('Sitemap entry is not an indexable canonical: ' + value);
    }
    pages[url.href] = createHash('sha256').update(html).digest('hex');
  }
  if (!Object.hasOwn(pages, origin + '/')) throw new Error('Sitemap is missing the homepage');
  return { version: 1, origin, pages };
}

function validateManifest(manifest) {
  if (manifest.version !== 1 || !manifest.pages || Array.isArray(manifest.pages) ||
      !Object.hasOwn(manifest.pages, manifest.origin + '/')) throw new Error('Invalid IndexNow manifest');
  for (const [url, digest] of Object.entries(manifest.pages)) {
    validateUrl(url, manifest.origin);
    if (!/^[a-f0-9]{64}$/.test(digest)) throw new Error('Invalid manifest digest');
  }
}

export function changedUrls(current, previous) {
  validateManifest(current);
  if (previous) validateManifest(previous);
  const baseline = previous?.origin === current.origin ? previous.pages : {};
  return [...new Set([...Object.keys(current.pages), ...Object.keys(baseline)])]
    .filter((url) => current.pages[url] !== baseline[url]).sort();
}

async function submit(current, previous) {
  const urls = changedUrls(current, previous);
  if (!urls.length) {
    console.log('IndexNow: no changed canonical URLs.');
    return;
  }
  const keyLocation = current.origin + '/' + KEY + '.txt';
  let ready = false;
  for (let attempt = 0; attempt < 4 && !ready; attempt++) {
    if (attempt) await delay(5000);
    try {
      const response = await fetch(keyLocation, { redirect: 'error', signal: AbortSignal.timeout(10000) });
      ready = response.ok && (await response.text()).trim() === KEY;
    } catch {
      // Allow for GitHub Pages propagation and brief network failures.
    }
  }
  if (!ready) throw new Error('IndexNow ownership file is not live at ' + keyLocation);
  for (let i = 0; i < urls.length; i += 10000) {
    const urlList = urls.slice(i, i + 10000);
    const payload = { host: new URL(current.origin).host, key: KEY, keyLocation, urlList };
    for (let attempt = 0; ; attempt++) {
      const response = await fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(20000), redirect: 'error',
      });
      if (response.status === 200 || response.status === 202) {
        console.log('IndexNow: ' + urlList.length + ' URL(s) received, HTTP ' + response.status +
          (response.status === 202 ? ' (key validation pending)' : ''));
        break;
      }
      const retryAfter = response.headers.get('retry-after');
      if (attempt === 0 && (response.status === 429 || response.status >= 500)) {
        const seconds = retryAfter == null ? 10 : /^\d+$/.test(retryAfter)
          ? Number(retryAfter) : Math.max(1, Math.ceil((Date.parse(retryAfter) - Date.now()) / 1000));
        if (Number.isFinite(seconds) && seconds <= 60) {
          await delay(Math.max(1, seconds) * 1000);
          continue;
        }
      }
      throw new Error('IndexNow rejected submission: HTTP ' + response.status);
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [, , command, first, second] = process.argv;
  if (command === 'manifest') {
    const origin = new URL(process.env.SITE_URL || 'https://shikaku-step-note.github.io').origin;
    writeFileSync(second, JSON.stringify(buildManifest(first, origin)) + '\n');
  } else if (command === 'submit') {
    const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
    await submit(read(first), second && existsSync(second) ? read(second) : undefined);
  } else {
    throw new Error('Use manifest <dist> <output> or submit <current> <previous>');
  }
}
