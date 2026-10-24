export type Status = 'not-started' | 'studying' | 'completed';
export interface StudyRecord {
  status: Status;
  bookmarked: boolean;
  updatedAt: string;
  attempts: number;
  lastCorrect?: boolean;
}
export interface StudyData {
  app: 'shikaku-step-note';
  version: 2;
  savedAt: string;
  lastLesson: string | null;
  records: Record<string, StudyRecord>;
}
export const emptyData = (): StudyData => ({
  app: 'shikaku-step-note',
  version: 2,
  savedAt: new Date().toISOString(),
  lastLesson: null,
  records: {},
});
const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
const validDate = (v: unknown): v is string =>
  typeof v === 'string' && v.length <= 35 && Number.isFinite(Date.parse(v));
const validId = (v: unknown): v is string =>
  typeof v === 'string' && /^[a-z0-9][a-z0-9-]{0,99}$/.test(v) && !['constructor', 'prototype'].includes(v);
export function validateData(value: unknown): StudyData {
  if (
    !isObject(value) ||
    value.app !== 'shikaku-step-note' ||
    ![1, 2].includes(value.version as number) ||
    !isObject(value.records) ||
    !validDate(value.savedAt)
  )
    throw new Error('資格ステップノートの対応するバックアップファイルではありません。');
  if (Object.keys(value.records).length > 2000) throw new Error('記録の件数が上限を超えています。');
  if (value.lastLesson !== undefined && value.lastLesson !== null && !validId(value.lastLesson))
    throw new Error('最後に学習したレッスンの情報が不正です。');
  const result = emptyData();
  result.savedAt = value.savedAt;
  result.lastLesson = (value.lastLesson as string | null) ?? null;
  for (const [id, row] of Object.entries(value.records)) {
    if (
      !validId(id) ||
      !isObject(row) ||
      !['not-started', 'studying', 'completed'].includes(row.status as string) ||
      typeof row.bookmarked !== 'boolean' ||
      !validDate(row.updatedAt) ||
      !Number.isInteger(row.attempts) ||
      Number(row.attempts) < 0 ||
      Number(row.attempts) > 100000 ||
      (row.lastCorrect !== undefined && typeof row.lastCorrect !== 'boolean')
    )
      throw new Error(
        '学習記録の形式が正しくありません。ファイルを編集せず、元のバックアップを選んでください。',
      );
    result.records[id] = {
      status: row.status as Status,
      bookmarked: row.bookmarked,
      updatedAt: row.updatedAt,
      attempts: Number(row.attempts),
      ...(typeof row.lastCorrect === 'boolean' ? { lastCorrect: row.lastCorrect } : {}),
    };
  }
  if (result.lastLesson && !result.records[result.lastLesson]) result.lastLesson = null;
  return result;
}
export function mergeData(current: StudyData, incoming: StudyData): StudyData {
  const result = validateData(current);
  const other = validateData(incoming);
  for (const [id, row] of Object.entries(other.records))
    if (!result.records[id] || Date.parse(row.updatedAt) > Date.parse(result.records[id]!.updatedAt))
      result.records[id] = { ...row };
  if (Date.parse(other.savedAt) > Date.parse(current.savedAt)) result.lastLesson = other.lastLesson;
  result.savedAt = new Date().toISOString();
  return result;
}
const KEY = 'shikaku-step-note:progress:v2';
export type StorageMode = 'indexeddb' | 'localstorage' | 'memory';
export class StudyStorage {
  mode: StorageMode = 'memory';
  data = emptyData();
  private db: IDBDatabase | null = null;
  private queue: Promise<unknown> = Promise.resolve();
  async init() {
    let fallback: StudyData | null = null;
    try {
      const value = localStorage.getItem(KEY);
      if (value) fallback = validateData(JSON.parse(value));
    } catch {
      /* Storage may be disabled; do not delete old data. */
    }
    try {
      this.db = await new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open('shikaku-step-note', 1);
        let settled = false;
        const timer = setTimeout(() => {
          settled = true;
          reject(new Error('storage timeout'));
        }, 2500);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains('learning'))
            request.result.createObjectStore('learning');
        };
        request.onsuccess = () => {
          clearTimeout(timer);
          if (settled) {
            request.result.close();
            return;
          }
          settled = true;
          resolve(request.result);
        };
        request.onerror = () => {
          clearTimeout(timer);
          settled = true;
          reject(request.error);
        };
        request.onblocked = () => {
          clearTimeout(timer);
          settled = true;
          reject(new Error('storage blocked'));
        };
      });
      this.db.onversionchange = () => {
        this.db?.close();
        this.db = null;
        this.mode = 'memory';
      };
      const value = await this.read();
      this.data = value ? validateData(value) : emptyData();
      if (fallback) this.data = mergeData(this.data, fallback);
      this.mode = 'indexeddb';
      await this.write(this.data);
    } catch {
      this.db?.close();
      this.db = null;
      this.data = fallback ?? emptyData();
      try {
        localStorage.setItem(KEY, JSON.stringify(this.data));
        this.mode = 'localstorage';
      } catch {
        this.mode = 'memory';
      }
    }
    return this.data;
  }
  private read() {
    return new Promise<unknown>((resolve, reject) => {
      const tx = this.db!.transaction('learning', 'readonly');
      const request = tx.objectStore('learning').get('state');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  private write(data: StudyData) {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('database unavailable'));
        return;
      }
      const tx = this.db.transaction('learning', 'readwrite');
      const timer = setTimeout(() => {
        try {
          tx.abort();
        } catch {}
        reject(new Error('storage timeout'));
      }, 3000);
      tx.objectStore('learning').put(data, 'state');
      tx.oncomplete = () => {
        clearTimeout(timer);
        try {
          localStorage.removeItem(KEY);
        } catch {}
        resolve();
      };
      tx.onerror = tx.onabort = () => {
        clearTimeout(timer);
        reject(tx.error ?? new Error('write failed'));
      };
    });
  }
  update(change: (data: StudyData) => void) {
    const task = this.queue.then(async () => {
      const next = validateData(this.data);
      change(next);
      next.savedAt = new Date().toISOString();
      const clean = validateData(next);
      if (this.mode === 'indexeddb') {
        try {
          await this.write(clean);
        } catch {
          try {
            localStorage.setItem(KEY, JSON.stringify(clean));
            this.mode = 'localstorage';
          } catch {
            this.mode = 'memory';
            throw new Error(
              '記録を保存できませんでした。バックアップを書き出し、ブラウザの保存設定や空き容量を確認してください。',
            );
          }
        }
      } else if (this.mode === 'localstorage') {
        try {
          localStorage.setItem(KEY, JSON.stringify(clean));
        } catch {
          this.mode = 'memory';
          throw new Error('記録を保存できませんでした。バックアップを書き出してください。');
        }
      }
      this.data = clean;
      return clean;
    });
    this.queue = task.catch(() => {});
    return task;
  }
  async replace(data: StudyData) {
    const clean = validateData(data);
    return this.update((d) => {
      d.records = clean.records;
      d.lastLesson = clean.lastLesson;
    });
  }
  close() {
    this.db?.close();
    this.db = null;
  }
}
