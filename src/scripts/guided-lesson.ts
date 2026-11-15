import { normalizeAnswer } from '../lib/assessment';

for (const form of document.querySelectorAll<HTMLFormElement>('[data-guided-practice]')) {
  const controls = form.querySelector<HTMLFieldSetElement>('fieldset');
  const feedback = form.querySelector<HTMLElement>('[data-guided-feedback]');
  const solution = form.closest('section')?.querySelector<HTMLElement>('[data-guided-solution]');
  if (!controls || !feedback || !solution) continue;

  controls.hidden = false;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const number = form.querySelector<HTMLInputElement>('input[inputmode="numeric"]');
    const choice = form.querySelector<HTMLInputElement>('input[type="radio"]:checked');
    const value = (number ?? choice)?.value.trim() ?? '';

    if (!value) {
      feedback.textContent = number ? '数値を入力してください。' : '答えを一つ選んでください。';
      return;
    }

    const normalized = value.normalize('NFKC');
    if (number && !/^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(normalized)) {
      feedback.textContent = '整数を入力してください。単位は入力欄に表示しています。';
      return;
    }

    const correct = number
      ? Number(normalizeAnswer(normalized)) === Number(form.dataset.expected)
      : value === form.dataset.expected;
    feedback.textContent = correct
      ? '正解です。' + (solution.textContent ?? '').trim()
      : choice?.dataset.guidedHint ?? form.dataset.guidedHint ?? '条件を確認して、もう一度試してください。';
  });

  const clear = () => { feedback.textContent = ''; };
  form.addEventListener('input', clear);
  form.addEventListener('reset', clear);
}
