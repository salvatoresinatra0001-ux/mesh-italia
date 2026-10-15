'use strict';
(() => {
  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const menu = one('#mobile-menu');
  const menuOpen = one('[data-open-menu]');
  const lock = () => document.body.classList.add('modal-open');
  const unlock = () => { if (!one('dialog[open]')) document.body.classList.remove('modal-open'); };
  if (menu && menuOpen) {
    menuOpen.addEventListener('click', () => { menu.showModal(); menuOpen.setAttribute('aria-expanded', 'true'); lock(); });
    one('[data-close-menu]', menu).addEventListener('click', () => menu.close());
    menu.addEventListener('close', () => { menuOpen.setAttribute('aria-expanded', 'false'); unlock(); });
    all('a', menu).forEach(a => a.addEventListener('click', () => menu.close()));
    menu.addEventListener('click', e => { if (e.target === menu) { const r = menu.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) menu.close(); } });
  }
  const catalog = one('[data-catalog]');
  if (catalog) {
    const buttons = all('[data-filter]');
    const input = one('#release-search');
    const items = all('[data-release]', catalog);
    const output = one('#catalog-count');
    const empty = one('#catalog-empty');
    const allowed = buttons.map(b => b.dataset.filter);
    let active = new URLSearchParams(location.search).get('tipo') || 'all';
    if (!allowed.includes(active)) active = 'all';
    const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const update = () => {
      const term = normalize(input.value.trim());
      let count = 0;
      items.forEach(item => { const visible = (active === 'all' || item.dataset.category === active || active === 'single' && item.dataset.category === 'mini') && normalize(item.dataset.search).includes(term); item.hidden = !visible; if (visible) count++; });
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === active)));
      output.textContent = `${count} ${count === 1 ? 'pubblicazione' : 'pubblicazioni'} · selezione documentata`;
      empty.hidden = count !== 0;
    };
    buttons.forEach(button => button.addEventListener('click', () => { active = button.dataset.filter; update(); const url = new URL(location.href); if (active === 'all') url.searchParams.delete('tipo'); else url.searchParams.set('tipo', active); history.replaceState(null, '', url); }));
    input.addEventListener('input', update);
    one('[data-reset-catalog]')?.addEventListener('click', () => { active = 'all'; input.value = ''; update(); const url = new URL(location.href); url.searchParams.delete('tipo'); history.replaceState(null, '', url); input.focus(); });
    update();
  }
  const lightbox = one('#photo-viewer');
  const photoButtons = all('[data-photo]');
  if (lightbox && photoButtons.length) {
    let index = 0;
    const large = one('[data-lightbox-image]', lightbox);
    const caption = one('[data-lightbox-caption]', lightbox);
    const count = one('[data-lightbox-count]', lightbox);
    const prev = one('[data-lightbox-prev]', lightbox);
    const next = one('[data-lightbox-next]', lightbox);
    const show = i => { index = Math.max(0, Math.min(photoButtons.length - 1, i)); const p = photoButtons[index]; large.src = p.dataset.original; large.alt = p.dataset.alt; caption.textContent = p.dataset.caption; count.textContent = `${index + 1} / ${photoButtons.length}`; prev.disabled = index === 0; next.disabled = index === photoButtons.length - 1; };
    photoButtons.forEach((button, i) => button.addEventListener('click', () => { show(i); lightbox.showModal(); lock(); }));
    one('[data-close-photo]', lightbox).addEventListener('click', () => lightbox.close());
    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    lightbox.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); } if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); } });
    lightbox.addEventListener('close', () => { large.removeAttribute('src'); unlock(); });
  }
  all('[data-load-player]').forEach(button => button.addEventListener('click', () => {
    const host = button.closest('[data-player]');
    const albumId = host.dataset.albumId;
    if (!/^\d+$/.test(albumId)) return;
    const frame = document.createElement('iframe');
    frame.className = 'embed-frame'; frame.title = `Ascolta ${host.dataset.albumTitle} su Bandcamp`;
    frame.src = `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=eeede7/linkcol=923d2d/artwork=none/transparent=true/`;
    frame.loading = 'eager'; frame.referrerPolicy = 'strict-origin-when-cross-origin';
    const placeholder = one('[data-player-placeholder]', host); placeholder.hidden = true;
    const close = document.createElement('button'); close.type = 'button'; close.className = 'text-link embed-close'; close.textContent = 'Chiudi il player';
    close.addEventListener('click', () => { frame.remove(); close.remove(); placeholder.hidden = false; button.focus(); });
    host.append(frame, close); close.focus();
  }));
  // Date controls filter the verified snapshot; they never fetch or invent new events.
  const dateButtons = all('[data-date-filter]');
  if (dateButtons.length) {
    const rows = all('[data-event-date]'); const groups = all('[data-date-group]');
    const localToday = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Rome' }).format(new Date());
    const apply = mode => {
      let count = 0;
      rows.forEach(row => { const past = row.dataset.eventDate < localToday; row.hidden = mode === 'past' ? !past : past; if (!row.hidden) count++; });
      groups.forEach(group => { group.hidden = !all('[data-event-date]', group).some(row => !row.hidden); });
      dateButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.dateFilter === mode)));
      const empty = one('#date-empty'); empty.hidden = count > 0;
      one('p', empty).textContent = mode === 'past' ? 'Nessuna data passata nella selezione documentata di questa beta.' : 'Nessuna data futura nella selezione documentata. Consulta il calendario ufficiale.';
    };
    dateButtons.forEach(button => button.addEventListener('click', () => apply(button.dataset.dateFilter)));
    apply('future');
  }
})();
