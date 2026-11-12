import test from 'node:test';
import assert from 'node:assert/strict';
import { changedUrls } from '../scripts/indexnow.mjs';

const origin = 'https://example.com';
const snapshot = (pages) => ({
  version: 1, origin,
  pages: Object.fromEntries(Object.entries({ '/': 'a', ...pages }).map(([path, digest]) => [origin + path, digest.repeat(64)])),
});

test('reports additions, edits and removals, skipping unchanged pages', () => {
  const before = snapshot({ '/unchanged/': 'a', '/edited/': 'a', '/removed/': 'a' });
  const after = snapshot({ '/unchanged/': 'a', '/edited/': 'b', '/new/': 'c' });
  assert.deepEqual(changedUrls(after, before), ['/edited/', '/new/', '/removed/'].map((path) => origin + path));
  assert.deepEqual(changedUrls(after, after), []);
});

test('initial submission is seeded from current canonical URLs', () => {
  assert.deepEqual(changedUrls(snapshot({ '/lesson/': 'a' })), [origin + '/', origin + '/lesson/']);
});

test('rejects foreign, legacy and query URLs', () => {
  for (const url of ['https://other.example/lesson/', origin + '/web/lesson/', origin + '/lesson/?q=1']) {
    const bad = snapshot({});
    bad.pages[url] = 'a'.repeat(64);
    assert.throws(() => changedUrls(bad), /Unexpected IndexNow URL/);
  }
});
