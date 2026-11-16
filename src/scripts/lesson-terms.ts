type Term = { trigger: HTMLAnchorElement; id: string; title: string; definition: string };

const preview = document.querySelector<HTMLElement>('[data-term-preview]');
if (preview) enableTerms(preview);

function enableTerms(preview: HTMLElement) {
  if (typeof preview.showPopover !== 'function') return;

  const title = preview.querySelector<HTMLElement>('[data-term-title]')!;
  const definition = preview.querySelector<HTMLElement>('[data-term-definition]')!;
  const closeButton = preview.querySelector<HTMLButtonElement>('[data-term-close]')!;
  const pinButton = preview.querySelector<HTMLButtonElement>('[data-term-pin]')!;
  const panel = document.querySelector<HTMLElement>('[data-term-panel]')!;
  const cards = panel.querySelector<HTMLElement>('[data-term-cards]')!;
  const pins = new Map<string, { card: HTMLElement; trigger: HTMLAnchorElement }>();
  const wide = window.matchMedia('(min-width: 70rem)');
  const hover = window.matchMedia('(any-hover: hover)');
  let current: Term | undefined;
  let locked = false;
  let skipFocus: HTMLAnchorElement | undefined;
  let timer: number | undefined;
  let frame = 0;

  function close(restore = false) {
    if (!current) return;
    const trigger = current.trigger;
    current = undefined;
    locked = false;
    trigger.setAttribute('aria-expanded', 'false');
    skipFocus = trigger;
    preview.hidePopover();
    if (restore) {
      trigger.focus({ preventScroll: true });
    }
    skipFocus = undefined;
  }

  function position() {
    if (!current) return;
    const viewport = window.visualViewport;
    const leftEdge = viewport?.offsetLeft ?? 0;
    const topEdge = viewport?.offsetTop ?? 0;
    const width = viewport?.width ?? document.documentElement.clientWidth;
    const height = viewport?.height ?? window.innerHeight;
    const rightEdge = leftEdge + width;
    const bottomEdge = topEdge + height;
    const anchor = current.trigger.getBoundingClientRect();
    if (anchor.bottom < topEdge || anchor.top > bottomEdge) {
      close();
      return;
    }
    const inset = 8;
    const above = anchor.top - topEdge - inset;
    const below = bottomEdge - anchor.bottom - inset;
    preview.style.maxWidth = Math.max(1, width - 2 * inset) + 'px';
    preview.style.maxHeight = Math.max(1, height - 2 * inset) + 'px';
    const idealHeight = preview.offsetHeight;
    const placeBelow = idealHeight <= below || below >= above;
    preview.style.maxHeight = Math.max(1, placeBelow ? below : above) + 'px';
    const left = Math.max(leftEdge + inset, Math.min(anchor.left, rightEdge - preview.offsetWidth - inset));
    const top = placeBelow ? anchor.bottom : anchor.top - preview.offsetHeight;
    preview.style.left = left + 'px';
    preview.style.top = Math.max(topEdge + inset, top) + 'px';
  }

  function schedulePosition() {
    if (!current || frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      position();
    });
  }

  function show(term: Term, persist = false) {
    window.clearTimeout(timer);
    if (locked && !persist) return;
    current?.trigger.setAttribute('aria-expanded', 'false');
    current = term;
    locked = persist;
    term.trigger.setAttribute('aria-expanded', 'true');
    title.textContent = term.title;
    definition.textContent = term.definition;
    pinButton.disabled = pins.has(term.id);
    pinButton.textContent = pinButton.disabled ? '固定済み' : '右側に固定';
    if (!preview.matches(':popover-open')) preview.showPopover();
    position();
    if (persist && current) closeButton.focus({ preventScroll: true });
  }

  function dismissAfterLeaving() {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (!current || locked) return;
      if (current.trigger.matches(':hover, :focus') || preview.matches(':hover, :focus-within')) return;
      close();
    }, 140);
  }

  for (const trigger of document.querySelectorAll<HTMLAnchorElement>('.lesson-content [data-lesson-term]')) {
    const entry = document.getElementById(trigger.hash.slice(1));
    const text = entry?.nextElementSibling;
    if (!entry?.textContent || text?.tagName !== 'DD' || !text.textContent) continue;

    const term = { trigger, id: entry.id, title: entry.textContent.trim(), definition: text.textContent.trim() };
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-controls', preview.id);
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('pointerenter', (event) => {
      if (!hover.matches || event.pointerType === 'touch' || locked) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => show(term), 180);
    });
    trigger.addEventListener('pointerleave', dismissAfterLeaving);
    trigger.addEventListener('focus', () => {
      if (skipFocus !== trigger && trigger.matches(':focus-visible')) show(term);
    });
    trigger.addEventListener('blur', dismissAfterLeaving);
    trigger.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(term, true);
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key !== ' ' || event.repeat) return;
      event.preventDefault();
      show(term, true);
    });
  }

  preview.addEventListener('pointerenter', () => window.clearTimeout(timer));
  preview.addEventListener('pointerleave', dismissAfterLeaving);
  preview.addEventListener('focusout', dismissAfterLeaving);
  closeButton.addEventListener('click', () => close(true));
  pinButton.addEventListener('click', () => {
    if (!current || !wide.matches || pins.has(current.id)) return;
    const term = current;
    const template = panel.querySelector<HTMLTemplateElement>('template')!;
    const card = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    const label = card.querySelector<HTMLElement>('[data-pin-label]')!;
    const content = card.querySelector<HTMLElement>('[data-pin-definition]')!;
    const remove = card.querySelector<HTMLButtonElement>('button')!;
    label.textContent = term.title;
    content.textContent = term.definition;
    remove.setAttribute('aria-label', term.title + 'の固定を解除');
    remove.addEventListener('click', () => {
      const next = card.nextElementSibling ?? card.previousElementSibling;
      pins.delete(term.id);
      card.remove();
      panel.hidden = !pins.size;
      const nextButton = next?.querySelector<HTMLButtonElement>('button');
      if (nextButton) {
        nextButton.focus({ preventScroll: true });
      } else {
        skipFocus = term.trigger;
        term.trigger.focus();
        skipFocus = undefined;
      }
    });
    pins.set(term.id, { card, trigger: term.trigger });
    cards.append(card);
    panel.hidden = false;
    close(true);
  });

  document.addEventListener('pointerdown', (event) => {
    if (!current || !(event.target instanceof Element)) return;
    if (!preview.contains(event.target) && !event.target.closest('[data-lesson-term]')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !current || event.defaultPrevented) return;
    event.preventDefault();
    close(preview.contains(document.activeElement));
  });
  window.addEventListener('resize', schedulePosition);
  window.addEventListener('scroll', schedulePosition, { passive: true });
  window.visualViewport?.addEventListener('resize', schedulePosition);
  window.visualViewport?.addEventListener('scroll', schedulePosition);
  wide.addEventListener('change', () => {
    if (wide.matches) return;
    // Keep the current reading position when the sidebar is hidden at a narrower width.
    for (const { card, trigger } of pins.values()) {
      if (card.contains(document.activeElement)) trigger.focus({ preventScroll: true });
    }
  });
}
