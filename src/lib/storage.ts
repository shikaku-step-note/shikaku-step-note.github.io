import type { AssessmentAttempt, AssessmentKind } from './assessment';
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
  version: 5;
  savedAt: string;
  lastLesson: string | null;
  records: Record<string, StudyRecord>;
  assessments: Record<string, AssessmentAttempt[]>;
}
export const emptyData = (): StudyData => ({
  app: 'shikaku-step-note',
  version: 5,
  savedAt: new Date().toISOString(),
  lastLesson: null,
  records: {},
  assessments: {},
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
    ![1, 2, 3, 4, 5].includes(value.version as number) ||
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
  if (value.version === 3 || value.version === 4 || value.version === 5) {
    if (!isObject(value.assessments) || Object.keys(value.assessments).length > 1000)
      throw new Error('テスト記録の形式が正しくありません。');
    let attempts = 0;
    for (const [id, rows] of Object.entries(value.assessments)) {
      if (!validId(id) || !Array.isArray(rows) || rows.length > 100)
        throw new Error('テストの件数が不正です。');
      const ids = new Set<string>();
      result.assessments[id] = rows.map((row) => {
        attempts++;
        if (
          attempts > 5000 ||
          !isObject(row) ||
          !validId(row.id) ||
          ids.has(row.id) ||
          row.assessmentId !== id ||
          !validId(row.version) ||
          !['lesson', 'glossary', 'review', 'mock'].includes(row.kind as string) ||
          !['timed', 'practice'].includes(row.mode as string) ||
          !validDate(row.startedAt) ||
          !validDate(row.updatedAt) ||
          !(row.deadline === null || validDate(row.deadline)) ||
          !(row.finishedAt === null || validDate(row.finishedAt)) ||
          !Number.isInteger(row.total) ||
          Number(row.total) < 1 ||
          Number(row.total) > 500 ||
          !Number.isInteger(row.cursor) ||
          Number(row.cursor) < 0 ||
          Number(row.cursor) >= Number(row.total) ||
          !(
            row.score === null ||
            (Number.isInteger(row.score) && Number(row.score) >= 0 && Number(row.score) <= Number(row.total))
          ) ||
          !isObject(row.answers) ||
          Object.keys(row.answers).length > Number(row.total) ||
          !Array.isArray(row.flags) ||
          row.flags.length > Number(row.total) ||
          !row.flags.every(validId) ||
          !Array.isArray(row.missed) ||
          row.missed.length > Number(row.total) ||
          !row.missed.every(validId) ||
          !isObject(row.fields)
        )
          throw new Error('テストの解答・日時・得点の形式が正しくありません。');
        ids.add(row.id);
        if (
          (row.finishedAt === null) !== (row.score === null) ||
          Date.parse(row.updatedAt) < Date.parse(row.startedAt) ||
          (row.deadline !== null && Date.parse(row.deadline as string) <= Date.parse(row.startedAt))
        )
          throw new Error('テストの状態に矛盾があります。');
        const answers: AssessmentAttempt['answers'] = {};
        for (const [qid, answer] of Object.entries(row.answers)) {
          if (
            !validId(qid) ||
            !(
              (typeof answer === 'number' && Number.isInteger(answer) && answer >= 0 && answer <= 9) ||
              ([4, 5].includes(Number(value.version)) &&
                typeof answer === 'string' &&
                answer.length <= (value.version === 5 ? 4000 : 80))
            )
          )
            throw new Error('テストの選択肢が正しくありません。');
          answers[qid] = answer as number | string;
        }
        const fields = {} as AssessmentAttempt['fields'];
        const fieldNames = Object.keys(row.fields);
        if (
          !fieldNames.length ||
          fieldNames.length > 16 ||
          !fieldNames.every(validId) ||
          (value.version === 3 &&
            !['strategy', 'management', 'technology'].every((f) => fieldNames.includes(f)))
        )
          throw new Error('分野の識別子が正しくありません。');
        for (const name of fieldNames) {
          const field = row.fields[name];
          if (
            !isObject(field) ||
            !Number.isInteger(field.total) ||
            !Number.isInteger(field.correct) ||
            Number(field.total) < 0 ||
            Number(field.total) > Number(row.total) ||
            Number(field.correct) < 0 ||
            Number(field.correct) > Number(field.total)
          )
            throw new Error('分野別の記録が正しくありません。');
          fields[name] = { correct: Number(field.correct), total: Number(field.total) };
        }
        if (
          row.finishedAt !== null &&
          (Object.values(fields).reduce((n, f) => n + f.total, 0) !== row.total ||
            Object.values(fields).reduce((n, f) => n + f.correct, 0) !== row.score)
        )
          throw new Error('テストの合計と分野別の記録が一致しません。');
        let manual: AssessmentAttempt['manual'];
        if (row.manual !== undefined) {
          if (
            value.version !== 5 ||
            !isObject(row.manual) ||
            Object.keys(row.manual).length > Number(row.total)
          )
            throw new Error('記述問題の自己確認記録が不正です。');
          manual = {};
          for (const [qid, mark] of Object.entries(row.manual)) {
            if (
              !validId(qid) ||
              !isObject(mark) ||
              !Number.isInteger(mark.max) ||
              Number(mark.max) < 1 ||
              Number(mark.max) > 100 ||
              !(
                mark.score === null ||
                (Number.isInteger(mark.score) &&
                  Number(mark.score) >= 0 &&
                  Number(mark.score) <= Number(mark.max))
              )
            )
              throw new Error('記述問題の自己確認点が範囲外です。');
            manual[qid] = { max: Number(mark.max), score: mark.score === null ? null : Number(mark.score) };
          }
        }
        return {
          id: row.id,
          assessmentId: id,
          version: row.version as string,
          kind: row.kind as AssessmentKind,
          mode: row.mode as 'timed' | 'practice',
          startedAt: row.startedAt,
          updatedAt: row.updatedAt,
          deadline: row.deadline as string | null,
          finishedAt: row.finishedAt as string | null,
          answers,
          flags: [...new Set(row.flags as string[])],
          cursor: Number(row.cursor),
          total: Number(row.total),
          score: row.score as number | null,
          missed: [...new Set(row.missed as string[])],
          fields,
          ...(manual ? { manual } : {}),
        };
      });
    }
  }
  return result;
}
export function mergeData(current: StudyData, incoming: StudyData): StudyData {
  const result = validateData(current);
  const other = validateData(incoming);
  for (const [id, row] of Object.entries(other.records))
    if (!result.records[id] || Date.parse(row.updatedAt) > Date.parse(result.records[id]!.updatedAt))
      result.records[id] = { ...row };
  for (const [id, rows] of Object.entries(other.assessments)) {
    const byId = new Map((result.assessments[id] ?? []).map((a) => [a.id, a]));
    for (const row of rows) {
      const existing = byId.get(row.id);
      if (!existing || Date.parse(row.updatedAt) > Date.parse(existing.updatedAt)) byId.set(row.id, row);
    }
    result.assessments[id] = [...byId.values()]
      .sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt))
      .slice(0, 100);
  }
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
            this.data = clean;
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
          this.data = clean;
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
      d.assessments = clean.assessments;
    });
  }
  close() {
    this.db?.close();
    this.db = null;
  }
}
