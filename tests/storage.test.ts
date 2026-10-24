import { test } from 'node:test';
import assert from 'node:assert/strict';
import { indexedDB } from 'fake-indexeddb';
import { StudyStorage, emptyData, validateData, mergeData } from '../src/lib/storage';
Object.assign(globalThis, { indexedDB, localStorage: { getItem: () => null, setItem: () => {} } });
test('learning and quiz records persist when the database is reopened', async () => {
  const a = new StudyStorage();
  await a.init();
  await a.update((d) => {
    d.records['it-business'] = {
      status: 'completed',
      bookmarked: true,
      attempts: 2,
      lastCorrect: false,
      updatedAt: new Date().toISOString(),
    };
    d.lastLesson = 'it-business';
  });
  a.close();
  const b = new StudyStorage();
  await b.init();
  assert.equal(b.data.records['it-business']?.status, 'completed');
  assert.equal(b.data.records['it-business']?.attempts, 2);
  assert.equal(b.data.lastLesson, 'it-business');
  b.close();
});
test('backup roundtrip keeps identifiers, results and bookmarks', () => {
  const data = emptyData();
  data.records['boki-purpose'] = {
    status: 'studying',
    bookmarked: true,
    attempts: 1,
    lastCorrect: true,
    updatedAt: data.savedAt,
  };
  assert.deepEqual(validateData(JSON.parse(JSON.stringify(data))), data);
});
test('merge keeps the newest lesson record and retains unknown future lesson identifiers', () => {
  const a = emptyData();
  a.savedAt = '2026-10-20T00:00:00Z';
  a.records['future-lesson'] = { status: 'studying', bookmarked: true, attempts: 1, updatedAt: a.savedAt };
  const b = emptyData();
  b.records['future-lesson'] = { status: 'completed', bookmarked: false, attempts: 2, updatedAt: b.savedAt };
  assert.equal(mergeData(a, b).records['future-lesson']?.status, 'completed');
});
test('rejects hostile or invalid backup data', () => {
  for (const change of [
    { version: 999 },
    { app: 'other' },
    { records: { bad: { status: 'done' } } },
    { lastLesson: '<script>' },
    { records: JSON.parse('{"__proto__":{"status":"completed"}}') },
  ])
    assert.throws(() => validateData({ ...emptyData(), ...change }));
});
test('known v1 data migrates without relying on titles or URLs', () => {
  const old = { ...emptyData(), version: 1 };
  assert.equal(validateData(old).version, 2);
});
test('concurrent changes are serialized without losing records', async () => {
  const s = new StudyStorage();
  await s.init();
  await Promise.all(
    ['one', 'two', 'three'].map((id) =>
      s.update((d) => {
        d.records[id] = { status: 'studying', bookmarked: false, attempts: 0, updatedAt: d.savedAt };
      }),
    ),
  );
  assert.ok(s.data.records.one && s.data.records.two && s.data.records.three);
  s.close();
});
