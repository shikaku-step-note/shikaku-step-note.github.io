import {
  StudyStorage,
  emptyData,
  validateData,
  mergeData,
  STORAGE_LIMITS,
  type StudyData,
  type StudyRecord,
} from '../lib/storage';
import { href } from '../lib/site';
import { attemptSummary } from '../lib/assessment';
import { selectCourseLessons } from '../lib/course-progress';
interface Entry {
  id: string;
  title: string;
  description: string;
  qualification: string;
  kind: string;
  url: string;
  keywords: string[];
  order?: number;
  archived?: boolean;
  subject?: string;
  unit?: number;
  assessmentKind?: string;
  assessmentVersion?: string;
}
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
let toastTimer: ReturnType<typeof setTimeout>;
$$<HTMLTableElement>('.prose table').forEach((table) => {
  if (table.closest('.table-scroll')) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'table-scroll';
  wrapper.tabIndex = 0;
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', '横にスクロールできる表');
  table.before(wrapper);
  wrapper.append(table);
});
function notify(message: string) {
  const box = $('#toast');
  if (!box) return;
  box.textContent = message;
  box.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove('visible'), 5000);
}
const menu = $<HTMLButtonElement>('.menu-button');
const nav = $('#main-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('open', open);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    $$<HTMLDetailsElement>('.qualification-menu').forEach((d) => {
      if (d.open) {
        d.open = false;
        d.querySelector('summary')?.focus();
      }
    });
    if (menu?.getAttribute('aria-expanded') === 'true') {
      menu.setAttribute('aria-expanded', 'false');
      nav?.classList.remove('open');
      menu.focus();
    }
  }
});
document.addEventListener('click', (e) => {
  const target = e.target as Node;
  $$<HTMLDetailsElement>('.qualification-menu').forEach((d) => {
    if (!d.contains(target)) d.open = false;
  });
});
$$<HTMLButtonElement>('[data-filter]').forEach((button) =>
  button.addEventListener('click', () => {
    $$('[data-filter]').forEach((b) => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    $$('[data-category]').forEach((card) => {
      const show = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.hidden = !show;
      if (show) count++;
    });
    const countEl = $('[data-filter-count]');
    if (countEl) countEl.textContent = `${count}件の資格`;
  }),
);
$$<HTMLButtonElement>('[data-copy]').forEach((button) =>
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy!);
      notify('リンクをコピーしました。');
    } catch {
      window.prompt('次のリンクをコピーしてください。', button.dataset.copy);
    }
  }),
);
$$<HTMLButtonElement>('[data-native-share]').forEach((button) => {
  if (navigator.share) {
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        await navigator.share({ title: button.dataset.title, url: button.dataset.url });
      } catch (e) {
        if (!(e instanceof DOMException && e.name === 'AbortError'))
          notify('共有できませんでした。リンクのコピーをお試しください。');
      }
    });
  }
});
let entries: Entry[] = [];
const catalog = fetch(href('search-index.json'))
  .then((r) => {
    if (!r.ok) throw new Error('catalog');
    return r.json() as Promise<Entry[]>;
  })
  .then((data) => {
    entries = data;
    return data;
  });
const normalize = (s: string) => s.normalize('NFKC').toLocaleLowerCase('ja').replace(/\s+/g, ' ').trim();
function entryLink(entry: Entry, meta?: string) {
  const article = document.createElement('article');
  article.className = 'result-row';
  const small = document.createElement('small');
  small.className = 'muted';
  small.textContent = meta ?? entry.kind;
  const heading = document.createElement('h3');
  const a = document.createElement('a');
  a.href = entry.url;
  a.textContent = entry.title;
  heading.append(a);
  const p = document.createElement('p');
  p.textContent = entry.description;
  article.append(small, heading, p);
  return article;
}
if ($('[data-search-form]')) {
  const input = $<HTMLInputElement>('#search-input')!;
  const results = $('[data-search-results]')!;
  const status = $('[data-search-status]')!;
  let searchVersion = 0;
  async function search() {
    const version = ++searchVersion;
    const query = normalize(input.value);
    results.replaceChildren();
    if (!query) {
      status.textContent = 'キーワードを入力すると、資格とレッスンを検索できます。';
      return;
    }
    status.textContent = '教材を検索しています…';
    try {
      const data = await catalog;
      if (version !== searchVersion) return;
      const tokens = query.split(' ');
      const matches = data.filter(
        (e) =>
          !e.archived &&
          tokens.every((t) => normalize([e.title, e.description, ...e.keywords].join(' ')).includes(t)),
      );
      status.textContent = `「${input.value.trim()}」の検索結果：${matches.length}件`;
      for (const entry of matches) results.append(entryLink(entry));
      if (!matches.length) {
        const p = document.createElement('p');
        p.className = 'empty-state';
        p.textContent =
          '見つかりませんでした。短い言葉や別の表現で試してみてください。例：「仕訳」「IT」「家計」。';
        results.append(p);
      }
    } catch {
      status.textContent = '教材一覧を取得できませんでした。通信を確認するか、資格一覧からお探しください。';
    }
  }
  $('[data-search-form]')!.addEventListener('submit', (e) => {
    e.preventDefault();
    void search();
  });
  let timer: ReturnType<typeof setTimeout>;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => void search(), 180);
  });
  $$<HTMLButtonElement>('[data-search-term]').forEach((b) =>
    b.addEventListener('click', () => {
      input.value = b.dataset.searchTerm!;
      void search();
      input.focus();
    }),
  );
}
const storage = new StudyStorage();
const labels = { 'not-started': '未学習', studying: '学習中', completed: '学習済み' };
function exportProgress() {
  const blob = new Blob([JSON.stringify(storage.data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shikaku-step-note-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  notify('バックアップのダウンロードを開始しました。');
}
function renderStorage() {
  const label = $('[data-storage-label]');
  const message = $('[data-storage-message]');
  if (storage.mode === 'memory') {
    if (label) label.textContent = '現在、記録を永続保存できません';
    if (message)
      message.textContent =
        'この画面を閉じると変更が失われます。バックアップを書き出し、ブラウザの保存設定や空き容量を確認してください。';
    let alert = $('#storage-warning');
    if (!alert) {
      alert = document.createElement('div');
      alert.id = 'storage-warning';
      alert.className = 'storage-warning';
      alert.setAttribute('role', 'status');
      const explanation = document.createElement('p');
      explanation.textContent =
        'このブラウザでは記録を保存できません。変更は一時的です。別のページへの移動や再読み込みの前に、ここでバックアップを書き出してください。';
      const backup = document.createElement('button');
      backup.type = 'button';
      backup.className = 'button secondary';
      backup.dataset.emergencyExport = '';
      backup.textContent = 'この画面の記録をバックアップ';
      backup.addEventListener('click', exportProgress);
      alert.append(explanation, backup);
      $('#main')?.prepend(alert);
    }
  } else if (storage.mode === 'localstorage') {
    if (label) label.textContent = 'この端末に保存（代替の保存方式）';
    if (message)
      message.textContent =
        '通常の保存方式が使えないため、別のブラウザ保存方式を利用しています。端末間では同期されません。バックアップも書き出してください。';
  }
}
function renderProgress() {
  const data = storage.data;
  renderStorage();
  $$('[data-status-label]').forEach((el) => {
    const status = data.records[el.dataset.statusLabel!]?.status ?? 'not-started';
    el.textContent = labels[status];
    el.dataset.state = status;
  });
  $$<HTMLButtonElement>('[data-bookmark]').forEach((button) => {
    const row = data.records[button.dataset.bookmark!];
    const active = !!row?.bookmarked;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('is-bookmarked', active);
  });
  $$<HTMLButtonElement>('[data-start]').forEach((b) => {
    const status = data.records[b.dataset.start!]?.status;
    b.textContent =
      status === 'studying' ? '学習中に戻す' : status === 'completed' ? '学習中に戻す' : '学習を始める';
  });
  $$<HTMLButtonElement>('[data-complete]').forEach((b) => {
    const done = data.records[b.dataset.complete!]?.status === 'completed';
    b.textContent = done ? '学習済み（もう一度学習する）' : '学習済みにする';
    b.setAttribute('aria-pressed', String(done));
  });
  const allLessons = entries.filter((e) => e.kind === 'レッスン');
  const lessons = allLessons.filter((e) => !e.archived);
  $$('[data-course-progress]').forEach((el) => {
    const course = selectCourseLessons(
      lessons,
      el.dataset.courseProgress!,
      el.dataset.courseSubject,
      el.dataset.courseUnit === undefined ? undefined : Number(el.dataset.courseUnit),
    );
    const done = course.filter((e) => data.records[e.id]?.status === 'completed').length;
    el.textContent = `${done} / ${course.length} レッスン学習済み`;
  });
  $$<HTMLProgressElement>('[data-course-bar]').forEach((bar) => {
    const course = selectCourseLessons(
      lessons,
      bar.dataset.courseBar!,
      bar.dataset.courseSubject,
      bar.dataset.courseUnit === undefined ? undefined : Number(bar.dataset.courseUnit),
    );
    const done = course.filter((e) => data.records[e.id]?.status === 'completed').length;
    bar.max = course.length;
    bar.value = done;
    bar.textContent = `${done} / ${course.length}`;
  });
  for (const [selector, value] of [
    ['[data-total-completed]', lessons.filter((e) => data.records[e.id]?.status === 'completed').length],
    ['[data-total-started]', lessons.filter((e) => data.records[e.id]?.status === 'studying').length],
    ['[data-total-bookmarks]', lessons.filter((e) => data.records[e.id]?.bookmarked).length],
  ] as const) {
    const el = $(selector);
    if (el) el.textContent = String(value);
  }
  const resume = lessons.find((e) => e.id === data.lastLesson);
  $$('[data-home-resume]').forEach((box) => {
    box.hidden = !resume;
    if (resume) {
      const p = box.querySelector('[data-resume-title]');
      const a = box.querySelector<HTMLAnchorElement>('[data-resume-link]');
      if (p) p.textContent = resume.title;
      if (a) a.href = resume.url;
    }
  });
  $$<HTMLAnchorElement>('[data-course-start]').forEach((a) => {
    const course = selectCourseLessons(
      lessons,
      a.dataset.courseStart!,
      a.dataset.courseSubject,
      a.dataset.courseUnit === undefined ? undefined : Number(a.dataset.courseUnit),
    ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const last = course.find((e) => e.id === data.lastLesson);
    const next =
      last && data.records[last.id]?.status !== 'completed'
        ? last
        : course.find((e) => data.records[e.id]?.status !== 'completed');
    if (next) a.href = next.url;
  });
  const bookmarks = $('[data-bookmark-list]');
  if (bookmarks) {
    const saved = allLessons.filter((e) => data.records[e.id]?.bookmarked);
    if (saved.length) {
      bookmarks.replaceChildren(...saved.map((e) => entryLink(e, 'ブックマーク')));
    } else {
      bookmarks.innerHTML =
        '<div class="empty-state"><h3>復習したいところを、ここに。</h3><p>レッスンの星ボタンを押すと、あとからすぐに読み返せます。</p></div>';
    }
  }
  const history = $('[data-history-list]');
  if (history) {
    const studied = allLessons
      .filter((e) => data.records[e.id])
      .sort((a, b) => Date.parse(data.records[b.id]!.updatedAt) - Date.parse(data.records[a.id]!.updatedAt));
    if (studied.length)
      history.replaceChildren(
        ...studied.map((e) => {
          const row = data.records[e.id]!;
          const stamp = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium' }).format(
            new Date(row.updatedAt),
          );
          const quiz = row.attempts
            ? `・練習${row.attempts}回・最新${row.lastCorrect ? '正解' : '要復習'}`
            : '';
          return entryLink(e, `${e.archived ? '旧サンプル・' : ''}${labels[row.status]}・${stamp}${quiz}`);
        }),
      );
    else
      history.innerHTML =
        '<p class="muted">学習を始めると、レッスンの状態と最新の練習結果がここに表示されます。</p>';
  }
  const assessmentHistory = $('[data-assessment-history]');
  if (assessmentHistory) {
    const assessmentEntries = entries.filter((e) => e.assessmentKind);
    const practiced = assessmentEntries.filter((e) => data.assessments[e.id]?.length);
    assessmentHistory.replaceChildren();
    if (!practiced.length)
      assessmentHistory.innerHTML =
        '<p class="muted">理解度チェック・用語・復習・模擬試験の結果が、レッスンの完了数とは別に表示されます。</p>';
    for (const e of practiced) {
      const rows = data.assessments[e.id]!;
      const current = rows.filter((r) => r.version === e.assessmentVersion);
      const done = current.filter((r) => r.finishedAt !== null);
      const active = current.find((r) => !r.finishedAt);
      const info = done.length
        ? done[0]!.manual
          ? `最新 ${attemptSummary(done[0]!)}・自己確認点は各テストの結果で確認できます`
          : `最新 ${done[0]!.score}/${done[0]!.total}問正解・最高 ${Math.max(...done.map((r) => r.score ?? 0))}/${done[0]!.total}問正解・要復習 ${done[0]!.missed.length}問`
        : 'この版の完了記録はありません';
      assessmentHistory.append(
        entryLink(
          e,
          `${e.kind}・${e.assessmentVersion}・${info}${active ? '・途中から再開できます' : ''}・保存履歴${rows.length}回`,
        ),
      );
    }
  }
}
function rowFor(data: StudyData, id: string): StudyRecord {
  return (data.records[id] ??= {
    status: 'not-started',
    bookmarked: false,
    updatedAt: new Date().toISOString(),
    attempts: 0,
  });
}
async function changeRecord(id: string, change: (row: StudyRecord) => void, message: string, track = true) {
  try {
    await storage.update((data) => {
      const row = rowFor(data, id);
      change(row);
      row.updatedAt = new Date().toISOString();
      if (track) data.lastLesson = id;
    });
    renderProgress();
    notify(storage.mode === 'memory' ? '一時的に記録しました。保存はできていません。' : message);
  } catch (e) {
    renderStorage();
    notify(e instanceof Error ? e.message : '保存できませんでした。');
  }
}
async function confirmAction(description: string) {
  const dialog = $<HTMLDialogElement>('#confirm-dialog')!;
  $('#confirm-description')!.textContent = description;
  dialog.showModal();
  return new Promise<boolean>((resolve) => {
    dialog.addEventListener('close', () => resolve(dialog.returnValue === 'confirm'), { once: true });
  });
}
async function start() {
  await Promise.all([storage.init(), catalog.catch(() => [])]);
  renderProgress();
  if ($('[data-assessment]')) {
    const { setupAssessment } = await import('./assessment-ui');
    setupAssessment(storage, renderProgress);
  }
  $$<HTMLButtonElement>('[data-bookmark]').forEach((button) =>
    button.addEventListener(
      'click',
      () =>
        void changeRecord(
          button.dataset.bookmark!,
          (row) => {
            row.bookmarked = !row.bookmarked;
          },
          'ブックマークを更新しました。',
          false,
        ),
    ),
  );
  $$<HTMLButtonElement>('[data-start]').forEach((button) =>
    button.addEventListener(
      'click',
      () =>
        void changeRecord(
          button.dataset.start!,
          (row) => {
            row.status = 'studying';
          },
          '学習中として保存しました。',
        ),
    ),
  );
  $$<HTMLButtonElement>('[data-complete]').forEach((button) =>
    button.addEventListener(
      'click',
      () =>
        void changeRecord(
          button.dataset.complete!,
          (row) => {
            row.status = row.status === 'completed' ? 'studying' : 'completed';
          },
          '学習状態を保存しました。',
        ),
    ),
  );
  $$('[data-quiz]').forEach((quiz) =>
    quiz.querySelector('form')!.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = quiz.querySelector<HTMLInputElement>('input:checked');
      if (!input) return;
      const correct = Number(input.value) === Number(quiz.dataset.answer);
      const feedback = quiz.querySelector<HTMLElement>('.quiz-feedback')!;
      feedback.hidden = false;
      feedback.dataset.correct = String(correct);
      quiz.querySelector('[data-quiz-result]')!.textContent = correct
        ? '正解です。'
        : 'もう一度、考え方を確認しましょう。';
      await changeRecord(
        quiz.dataset.quiz!,
        (row) => {
          row.attempts = Math.min(row.attempts + 1, 100000);
          row.lastCorrect = correct;
          if (row.status === 'not-started') row.status = 'studying';
        },
        '練習結果を保存しました。',
      );
      feedback.focus();
    }),
  );
  $('#export-progress')?.addEventListener('click', exportProgress);
  let imported: StudyData | null = null;
  let importVersion = 0;
  $('#import-file')?.addEventListener('change', async (e) => {
    const version = ++importVersion;
    const input = e.target as HTMLInputElement;
    const info = $('#import-info')!;
    const button = $<HTMLButtonElement>('#import-progress')!;
    imported = null;
    button.disabled = true;
    try {
      const file = input.files?.[0];
      if (!file) {
        info.textContent = '';
        return;
      }
      if (file.size > STORAGE_LIMITS.backupBytes)
        throw new Error(
          `ファイルが大きすぎます。${STORAGE_LIMITS.backupBytes / (1024 * 1024)}MB以下のバックアップを選んでください。`,
        );
      info.textContent = 'バックアップを確認しています。大きなファイルは少し時間がかかります。';
      const next = validateData(JSON.parse(await file.text()));
      if (version !== importVersion) return;
      imported = next;
      info.textContent = `${Object.keys(imported.records).length}件のレッスン記録と${Object.values(imported.assessments).reduce((n, rows) => n + rows.length, 0)}回のテスト記録を確認しました。読み込み方法を選んでください。`;
      button.disabled = false;
    } catch (e) {
      if (version !== importVersion) return;
      info.textContent =
        e instanceof SyntaxError
          ? 'JSON形式のバックアップを選んでください。'
          : e instanceof Error
            ? e.message
            : 'ファイルを読み込めませんでした。';
    }
  });
  $('#import-progress')?.addEventListener('click', async () => {
    if (!imported) return;
    const next = imported;
    const mode = $<HTMLInputElement>('input[name="import-mode"]:checked')?.value;
    if (
      mode === 'replace' &&
      !(await confirmAction(
        '現在の記録を選んだバックアップに置き換えます。元に戻すには、現在の記録のバックアップが必要です。',
      ))
    )
      return;
    try {
      if (mode === 'replace') await storage.replace(next);
      else
        await storage.update((data) => {
          const merged = mergeData(data, next);
          data.records = merged.records;
          data.lastLesson = merged.lastLesson;
          data.assessments = merged.assessments;
        });
      renderProgress();
      window.dispatchEvent(new Event('study-data-replaced'));
      notify(
        storage.mode === 'memory'
          ? '一時的に読み込みました。永続保存できていないため、バックアップを保管してください。'
          : 'バックアップを読み込みました。',
      );
    } catch (e) {
      renderStorage();
      notify(e instanceof Error ? e.message : '復元できませんでした。');
    }
  });
  $('#reset-progress')?.addEventListener('click', async () => {
    if (
      !(await confirmAction(
        'この端末の学習状態、ブックマーク、練習結果をすべてリセットします。この操作は取り消せません。',
      ))
    )
      return;
    try {
      await storage.replace(emptyData());
      renderProgress();
      window.dispatchEvent(new Event('study-data-replaced'));
      notify('この端末の記録をリセットしました。');
    } catch (e) {
      notify(e instanceof Error ? e.message : 'リセットできませんでした。');
    }
  });
}
void start();
