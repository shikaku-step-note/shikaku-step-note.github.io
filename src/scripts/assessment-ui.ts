import {
  gradeAttempt,
  isCorrect,
  practicePoints,
  fieldPoints,
  newAttempt,
  remainingSeconds,
  compatibleAttempt,
  attemptSummary,
  questionRevisionLessons,
  parseJournalAnswer,
  journalAnswerText,
  type Assessment,
  type AssessmentAttempt,
} from '../lib/assessment';
import type { StudyStorage } from '../lib/storage';
import { href } from '../lib/site';
const names = { strategy: 'ストラテジ系', management: 'マネジメント系', technology: 'テクノロジ系' };
export function setupAssessment(storage: StudyStorage, updated: () => void) {
  const root = document.querySelector<HTMLElement>('[data-assessment]');
  if (!root) return;
  const a = JSON.parse(root.querySelector('[data-assessment-json]')!.textContent!) as Assessment;
  const fieldNames: Record<string, string> = a.fieldNames ?? names;
  const hasEssay = a.questions.some((q) => q.input === 'essay');
  const el = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const questions = Array.from(root.querySelectorAll<HTMLElement>('[data-question]'));
  const begin = el<HTMLButtonElement>('[data-assessment-begin]');
  const materials = root.querySelector<HTMLElement>('[data-assessment-materials]');
  let materialQuestion: string | undefined;
  root.querySelectorAll<HTMLAnchorElement>('[data-open-material]').forEach((link) => {
    link.addEventListener('click', () => {
      const material = root.querySelector<HTMLDetailsElement>(`#material-${link.dataset.openMaterial}`);
      if (material) material.open = true;
    });
  });
  let attempt: AssessmentAttempt | null = null;
  let interval: ReturnType<typeof setInterval> | undefined;
  let generation = 0;
  let ending = false;
  let pendingSaves = 0;
  const rows = () => storage.data.assessments[a.id] ?? [];
  const currentRows = () => rows().filter((r) => compatibleAttempt(a, r));
  const text = (tag: string, value: string, className?: string) => {
    const e = document.createElement(tag);
    e.textContent = value;
    if (className) e.className = className;
    return e;
  };
  function history() {
    const box = el('[data-current-assessment-history]');
    box.replaceChildren();
    const completed = currentRows().filter((r) => r.finishedAt !== null);
    if (completed.length) {
      if (hasEssay) {
        const fullyReviewed = completed.filter((r) =>
          Object.values(r.manual ?? {}).every((m) => m.score !== null),
        );
        const maximum = a.questions.reduce((n, q) => n + (q.points ?? 1), 0);
        box.append(
          text(
            'p',
            `最新：${attemptSummary(completed[0]!)}。独自練習得点 ${practicePoints(a, completed[0]!)} / ${maximum}点（未確認は加点なし）。${fullyReviewed.length ? `自己確認済みの最高 ${Math.max(...fullyReviewed.map((r) => practicePoints(a, r)))}点。` : '記述の自己確認を終えると、その回を最高得点の比較に含めます。'}`,
          ),
        );
      } else {
        const best = Math.max(...completed.map((r) => r.score ?? 0));
        box.append(
          text(
            'p',
            `最新 ${completed[0]!.score} / ${a.questions.length}問正解・最高 ${best} / ${a.questions.length}問正解`,
          ),
        );
      }
    }
    for (const r of rows().slice(0, 10)) {
      const line = document.createElement('div');
      line.className = 'attempt-history-row';
      const date = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'short', timeStyle: 'short' }).format(
        new Date(r.startedAt),
      );
      line.append(
        text(
          'span',
          `${date}・${r.mode === 'timed' ? '時間あり' : '時間なし'}・${r.version}・${r.finishedAt ? attemptSummary(r) : '途中'}`,
        ),
      );
      if (r.finishedAt && compatibleAttempt(a, r)) {
        const b = text('button', '結果を見る', 'text-link') as HTMLButtonElement;
        b.type = 'button';
        b.addEventListener('click', () => {
          if (attempt && !attempt.finishedAt) {
            el('[data-assessment-restore]').textContent =
              '進行中のテストを終了してから過去の結果を確認してください。';
            return;
          }
          attempt = structuredClone(r);
          showResults(false);
        });
        line.append(b);
      }
      box.append(line);
    }
    if (!rows().length) box.append(text('p', 'まだ記録はありません。'));
    if (rows().length > 10)
      box.append(
        text(
          'p',
          `直近10回を表示しています。保存済み${rows().length}回はバックアップに含まれます。`,
          'muted',
        ),
      );
  }
  async function persist(snapshot: AssessmentAttempt) {
    pendingSaves++;
    el('[data-exam-save]').textContent = '保存中…';
    let failure: string | null = null;
    try {
      await storage.update((data) => {
        const all = data.assessments[a.id] ?? [];
        const index = all.findIndex((r) => r.id === snapshot.id);
        if (index < 0) all.unshift(snapshot);
        else all[index] = snapshot;
        data.assessments[a.id] = all.slice(0, 100);
      });
      updated();
      history();
    } catch (e) {
      failure = e instanceof Error ? e.message : '保存できませんでした。';
      updated();
    } finally {
      pendingSaves--;
      if (!pendingSaves)
        el('[data-exam-save]').textContent =
          failure ?? (storage.mode === 'memory' ? '一時記録・永続保存できません' : 'この端末に保存しました');
    }
  }
  function save() {
    if (attempt) {
      attempt.updatedAt = new Date().toISOString();
      void persist(structuredClone(attempt));
    }
  }
  function tick() {
    if (!attempt || attempt.finishedAt) return;
    const left = remainingSeconds(attempt);
    const timer = el('[data-exam-timer]');
    timer.textContent =
      left === null
        ? '時間制限なし'
        : `残り ${Math.floor(left / 60)}分${String(left % 60).padStart(2, '0')}秒`;
    if (left !== null && left <= 300 && timer.dataset.warned !== 'true') {
      timer.dataset.warned = 'true';
      el('[data-exam-announcement]').textContent = '残り時間が5分以内になりました。';
    }
    if (left === 0) {
      const dialog = el<HTMLDialogElement>('[data-assessment-dialog]');
      if (ending && dialog.open) dialog.close('submit');
      else void finish(true);
    }
  }
  function renderActive(focus = false, syncInputs = true) {
    if (!attempt) return;
    el('[data-assessment-start]').hidden = true;
    el('[data-assessment-active]').hidden = false;
    el('[data-assessment-controls]').hidden = false;
    el('[data-assessment-questions]').hidden = false;
    el('[data-assessment-results]').hidden = true;
    if (materials) materials.hidden = false;
    const currentQuestion = a.questions[attempt.cursor]!;
    if (materialQuestion !== currentQuestion.id) {
      for (const id of currentQuestion.materialIds ?? []) {
        const material = materials?.querySelector<HTMLDetailsElement>(`#material-${id}`);
        if (material) material.open = true;
      }
      materialQuestion = currentQuestion.id;
    }
    questions.forEach((field, i) => {
      field.hidden = i !== attempt!.cursor;
      if (syncInputs) {
        const journal = parseJournalAnswer(attempt!.answers[field.dataset.question!]);
        field
          .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
            'input, textarea, select',
          )
          .forEach((input) => {
            input.disabled = false;
            if (input.hasAttribute('data-journal-account') || input.hasAttribute('data-journal-amount')) {
              const side = input.closest<HTMLElement>('[data-journal-side]')!.dataset.journalSide as
                'debits' | 'credits';
              const row = Number(input.closest<HTMLElement>('[data-journal-row]')!.dataset.journalRow);
              input.value = String(
                journal?.[side][row]?.[input.hasAttribute('data-journal-account') ? 'account' : 'amount'] ??
                  '',
              );
            } else if (input.hasAttribute('data-written-answer'))
              input.value = String(attempt!.answers[field.dataset.question!] ?? '');
            else
              (input as HTMLInputElement).checked =
                attempt!.answers[field.dataset.question!] === Number(input.value);
          });
      }
    });
    el('[data-question-position]').textContent = `問${attempt.cursor + 1} / ${a.questions.length}`;
    el('[data-exam-count]').textContent =
      `解答済み ${Object.keys(attempt.answers).length}問・未解答 ${a.questions.length - Object.keys(attempt.answers).length}問・見直し ${attempt.flags.length}問`;
    el<HTMLInputElement>('[data-review-flag]').checked = attempt.flags.includes(
      a.questions[attempt.cursor]!.id,
    );
    el<HTMLButtonElement>('[data-question-prev]').disabled = attempt.cursor === 0;
    el<HTMLButtonElement>('[data-question-next]').disabled = attempt.cursor === a.questions.length - 1;
    const map = el('[data-question-map]');
    map.replaceChildren();
    a.questions.forEach((q, i) => {
      const answered = attempt!.answers[q.id] !== undefined,
        flag = attempt!.flags.includes(q.id);
      const b = text(
        'button',
        `${i + 1}${answered ? ' ✓' : ''}${flag ? ' ★' : ''}`,
        `question-jump${answered ? ' answered' : ''}`,
      ) as HTMLButtonElement;
      b.type = 'button';
      b.setAttribute(
        'aria-label',
        `問${i + 1}・${answered ? '解答済み' : '未解答'}${flag ? '・見直し' : ''}`,
      );
      if (i === attempt!.cursor) b.setAttribute('aria-current', 'step');
      b.addEventListener('click', () => move(i));
      map.append(b);
    });
    if (focus) questions[attempt.cursor]!.querySelector('legend')!.focus();
    tick();
  }
  function move(index: number) {
    if (!attempt || attempt.finishedAt) return;
    attempt.cursor = index;
    save();
    renderActive(true);
  }
  function showResults(focus = true) {
    if (!attempt || attempt.score === null) return;
    clearInterval(interval);
    const result = el('[data-assessment-results]');
    result.hidden = false;
    result.replaceChildren();
    if (materials) materials.hidden = false;
    el('[data-assessment-active]').hidden = true;
    el('[data-assessment-controls]').hidden = true;
    el('[data-assessment-questions]').hidden = true;
    el('[data-assessment-start]').hidden = true;
    result.append(
      text('h3', '今回の結果'),
      text(
        'p',
        hasEssay
          ? attemptSummary(attempt)
          : `${attempt.score} / ${attempt.total}問正解（正答率${Math.round((attempt.score / attempt.total) * 100)}%）`,
        'exam-score',
      ),
    );
    if (a.qualification === 'zeirishi')
      result.append(
        text(
          'p',
          '本試験は記述式で、詳細な公式採点基準を確認できていません。この教材の配点・数値照合・記述の自己確認は独自の練習です。公式の60％基準へ換算した合否判定はしません。未確認の記述は得点に加えていません。',
        ),
      );
    if (a.kind === 'mock' && a.qualification === 'it-passport')
      result.append(text('p', '全問各1点の練習得点です。IRT評価点や公式の合否には換算できません。'));
    if (a.kind === 'mock' && a.qualification === 'takken')
      result.append(
        text(
          'p',
          '各問1点の練習得点です。2026年度の合格基準は教材確認日（2026年10月25日）時点で未公表です。公式の難易度を再現せず、合否の判定は行いません。一般形式と5問免除形式は45問を共有します。',
        ),
      );
    if (a.qualification !== 'it-passport') {
      const totalPoints = a.questions.reduce((n, q) => n + (q.points ?? 1), 0);
      result.append(
        text(
          'p',
          `独自練習得点：${practicePoints(a, attempt)} / ${totalPoints}点。公式採点や本試験の合否を保証するものではありません。`,
        ),
      );
    }
    const dl = document.createElement('dl');
    dl.className = 'field-scores';
    for (const key of Object.keys(fieldNames)) {
      const f = attempt.fields[key];
      if (f?.total && !hasEssay) {
        dl.append(
          text('dt', fieldNames[key]!),
          text('dd', `${f.correct}/${f.total}問正解（${Math.round((f.correct / f.total) * 100)}%）`),
        );
      }
    }
    result.append(dl);
    if (
      a.kind === 'mock' &&
      a.qualification !== 'it-passport' &&
      a.qualification !== 'takken' &&
      a.qualification !== 'zeirishi'
    ) {
      const points = fieldPoints(a, attempt);
      const list = document.createElement('ul');
      for (const [key, f] of Object.entries(points))
        list.append(text('li', `${fieldNames[key] ?? key}：${f.score} / ${f.total}点（独自配点）`));
      result.append(list);
      if (a.companion) {
        const otherDefinition = {
          ...a,
          id: a.companion.id,
          version: a.companion.version,
          questions: a.companion.questions,
        };
        const other = (storage.data.assessments[a.companion.id] ?? []).find(
          (r) => r.finishedAt && compatibleAttempt(otherDefinition, r),
        );
        result.append(text('h3', '前半・後半の振り返り'));
        if (other) {
          const combined = { ...points, ...fieldPoints(a.companion, other) };
          const total = Object.values(combined).reduce((n, f) => n + f.score, 0);
          result.append(
            text(
              'p',
              `今回と、もう一方の直近完了回の合計：${total} / 100点。連続した一回の受験記録ではありません。`,
            ),
          );
          const ul = document.createElement('ul');
          for (const [key, f] of Object.entries(combined))
            ul.append(text('li', `${fieldNames[key] ?? key}：${f.score} / ${f.total}点`));
          result.append(
            ul,
            text(
              'p',
              '公式の基準は合計70%以上かつ各科目40%以上です。独自配点の練習結果から公式の合否は判定しません。得点が偏った科目を復習してください。',
            ),
          );
        } else
          result.append(
            text('p', 'もう一方の模試の現行版を完了すると、両方の直近結果をここで確認できます。'),
          );
      }
    }
    const missedLessons = [
      ...new Set(a.questions.filter((q) => attempt!.missed.includes(q.id)).flatMap(questionRevisionLessons)),
    ];
    if (missedLessons.length) {
      result.append(text('h3', '復習したいレッスン'));
      const ul = document.createElement('ul');
      for (const id of missedLessons) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = href(`qualifications/${a.qualification}/${id}/`);
        link.textContent = a.lessonTitles?.[id] ?? '関連レッスンで復習する';
        li.append(link);
        ul.append(li);
      }
      result.append(ul);
    }
    result.append(text('h3', '解答と解説'));
    a.questions.forEach((q, i) => {
      const details = document.createElement('details');
      details.className = 'answer-explanation';
      const correct = isCorrect(q, attempt!.answers[q.id]);
      details.dataset.explanationId = q.id;
      details.append(
        text(
          'summary',
          `問${i + 1} ${q.input === 'essay' ? '記述・自己確認' : correct ? '正解' : '要復習'}：${q.prompt}`,
        ),
      );
      details.append(
        text(
          'p',
          `あなたの解答：${attempt!.answers[q.id] === undefined ? '未解答' : q.input === 'journal' ? journalAnswerText(attempt!.answers[q.id]) : q.input ? String(attempt!.answers[q.id]) : (q.options[Number(attempt!.answers[q.id])] ?? '不明な選択肢')}`,
        ),
        text(
          'p',
          q.input === 'essay'
            ? `解答例：${q.modelAnswer}`
            : `正解：${q.input === 'journal' ? journalAnswerText(JSON.stringify({ debits: q.journal!.debits, credits: q.journal!.credits })) : q.input ? q.accepted?.[0] : q.options[q.answer]}`,
        ),
        text('p', q.explanation),
      );
      if (q.input === 'essay') {
        const criteria = document.createElement('ul');
        for (const r of q.rubric ?? []) criteria.append(text('li', `${r.criterion}（独自${r.points}点）`));
        details.append(criteria);
        const label = text('label', `自己確認点（0〜${q.points ?? 1}点。空欄は未確認）`, 'written-answer');
        const mark = document.createElement('input');
        mark.type = 'number';
        mark.min = '0';
        mark.max = String(q.points ?? 1);
        mark.step = '1';
        mark.dataset.selfScore = q.id;
        const current = attempt!.manual?.[q.id]?.score;
        mark.value = current === null || current === undefined ? '' : String(current);
        mark.addEventListener('change', () => {
          if (!attempt?.finishedAt || !mark.reportValidity()) return;
          const value = mark.value === '' ? null : Number(mark.value);
          attempt.manual![q.id]!.score = value;
          attempt = gradeAttempt(a, attempt);
          const openIds = Array.from(result.querySelectorAll<HTMLDetailsElement>('details[open]')).map(
            (d) => d.dataset.explanationId,
          );
          save();
          showResults(false);
          result.querySelectorAll<HTMLDetailsElement>('details').forEach((d) => {
            d.open = openIds.includes(d.dataset.explanationId);
          });
          result.querySelector<HTMLInputElement>(`[data-self-score="${q.id}"]`)?.focus();
        });
        label.append(mark);
        details.append(label);
      }
      const revisionIds = questionRevisionLessons(q);
      for (const id of revisionIds) {
        const paragraph = document.createElement('p');
        const link = document.createElement('a');
        link.href = href(`qualifications/${a.qualification}/${id}/`);
        link.textContent =
          revisionIds.length === 1
            ? 'この内容をレッスンで復習する'
            : `${a.lessonTitles?.[id] ?? '関連レッスン'}で復習する`;
        paragraph.append(link);
        details.append(paragraph);
      }
      result.append(details);
    });
    if (a.nextAssessment) {
      const next = document.createElement('a');
      next.href = href(`qualifications/${a.qualification}/tests/${a.nextAssessment}/`);
      next.className = 'button secondary';
      next.textContent = a.kind === 'mock' ? '後半の模試へ（休憩後に開始）' : '次の演習へ';
      result.append(next);
    }
    const retry = text('button', 'もう一度取り組む', 'button primary') as HTMLButtonElement;
    retry.type = 'button';
    retry.addEventListener('click', () => {
      attempt = null;
      generation++;
      result.hidden = true;
      el('[data-assessment-start]').hidden = false;
      begin.textContent = '新しいテストを始める';
      begin.disabled = false;
      begin.focus();
    });
    result.append(retry);
    if (focus) result.focus();
    history();
  }
  async function finish(expired = false) {
    if (!attempt || attempt.finishedAt || ending) return;
    ending = true;
    const token = generation;
    if (!expired) {
      const dialog = el<HTMLDialogElement>('[data-assessment-dialog]');
      el('[data-assessment-confirm-text]').textContent =
        `未解答${a.questions.length - Object.keys(attempt.answers).length}問、見直し${attempt.flags.length}問です。提出後はこの回の解答を変更できません。`;
      dialog.returnValue = '';
      dialog.showModal();
      const accepted = await new Promise<boolean>((resolve) =>
        dialog.addEventListener('close', () => resolve(dialog.returnValue === 'submit'), { once: true }),
      );
      if (token !== generation) {
        ending = false;
        return;
      }
      if (!accepted && remainingSeconds(attempt) !== 0) {
        ending = false;
        return;
      }
    }
    attempt = gradeAttempt(a, attempt);
    clearInterval(interval);
    const dialog = el<HTMLDialogElement>('[data-assessment-dialog]');
    if (dialog.open) dialog.close('submit');
    await persist(structuredClone(attempt));
    showResults();
    ending = false;
  }
  root
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      '[data-question] input, [data-question] textarea, [data-question] select',
    )
    .forEach((input) =>
      input.addEventListener(
        input.hasAttribute('data-written-answer') || input.hasAttribute('data-journal-amount')
          ? 'input'
          : 'change',
        () => {
          if (!attempt || attempt.finishedAt) return;
          if (remainingSeconds(attempt) === 0) {
            void finish(true);
            return;
          }
          if (input.hasAttribute('data-journal-account') || input.hasAttribute('data-journal-amount')) {
            const field = input.closest<HTMLElement>('[data-question]')!;
            const entry = {
              debits: [] as { account: string; amount: string }[],
              credits: [] as { account: string; amount: string }[],
            };
            for (const side of ['debits', 'credits'] as const) {
              entry[side] = Array.from(
                field.querySelectorAll<HTMLElement>(`[data-journal-side="${side}"] [data-journal-row]`),
              ).map((row) => ({
                account: row.querySelector<HTMLSelectElement>('[data-journal-account]')!.value,
                amount: row.querySelector<HTMLInputElement>('[data-journal-amount]')!.value,
              }));
            }
            if ([...entry.debits, ...entry.credits].some((row) => row.account || row.amount.trim()))
              attempt.answers[field.dataset.question!] = JSON.stringify(entry);
            else delete attempt.answers[field.dataset.question!];
          } else if (input.hasAttribute('data-written-answer')) {
            if (input.value.trim()) attempt.answers[input.name] = input.value;
            else delete attempt.answers[input.name];
          } else attempt.answers[input.name] = Number(input.value);
          save();
          renderActive(false, false);
        },
      ),
    );
  el('[data-question-prev]').addEventListener('click', () => move(Math.max(0, attempt!.cursor - 1)));
  el('[data-question-next]').addEventListener('click', () =>
    move(Math.min(a.questions.length - 1, attempt!.cursor + 1)),
  );
  el<HTMLInputElement>('[data-review-flag]').addEventListener('change', (e) => {
    if (!attempt || attempt.finishedAt) return;
    const id = a.questions[attempt.cursor]!.id;
    attempt.flags = attempt.flags.filter((q) => q !== id);
    if ((e.target as HTMLInputElement).checked) attempt.flags.push(id);
    save();
    renderActive();
  });
  el('[data-answer-clear]').addEventListener('click', () => {
    if (!attempt || attempt.finishedAt) return;
    delete attempt.answers[a.questions[attempt.cursor]!.id];
    save();
    renderActive();
  });
  el('[data-assessment-submit]').addEventListener('click', () => void finish());
  begin.addEventListener('click', async () => {
    if (attempt && !attempt.finishedAt) return;
    const active = currentRows().find((r) => !r.finishedAt);
    attempt = active
      ? structuredClone(active)
      : newAttempt(
          a,
          el<HTMLInputElement>('input[name="assessment-mode"]:checked')?.value === 'timed'
            ? 'timed'
            : 'practice',
        );
    generation++;
    materialQuestion = undefined;
    await persist(structuredClone(attempt));
    renderActive(true);
    interval = setInterval(tick, 1000);
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tick();
  });
  window.addEventListener('pageshow', tick);
  window.addEventListener('study-data-replaced', () => {
    generation++;
    clearInterval(interval);
    attempt = null;
    ending = false;
    el('[data-assessment-controls]').hidden = true;
    el('[data-assessment-active]').hidden = true;
    el('[data-assessment-questions]').hidden = true;
    el('[data-assessment-results]').hidden = true;
    initialize();
  });
  function initialize() {
    history();
    materialQuestion = undefined;
    if (materials) materials.hidden = true;
    begin.disabled = false;
    el('[data-assessment-start]').hidden = false;
    const active = currentRows().find((r) => !r.finishedAt);
    const old = rows().find((r) => !r.finishedAt && !compatibleAttempt(a, r));
    el('[data-assessment-restore]').textContent = old
      ? '以前の版の途中記録を保管しています。現在の問題は新しい回として開始します。'
      : '';
    if (active) {
      attempt = structuredClone(active);
      el('[data-assessment-restore]').textContent = '途中の解答を復元しました。';
      renderActive();
      interval = setInterval(tick, 1000);
    } else begin.textContent = 'テストを始める';
  }
  el('[data-assessment-questions]').hidden = true;
  initialize();
}
