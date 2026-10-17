'use strict';
(() => {
  const cards = [...document.querySelectorAll('.service-card')];
  const input = document.getElementById('searchInput');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const clear = document.getElementById('clearSearch');
  const empty = document.getElementById('emptyState');
  const storageKey = 'miosmooth:portal:favorites:v1';
  const allowed = new Set(cards.map(card => card.dataset.id));
  let category = 'all';
  let favorites = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) favorites = new Set(saved.filter(id => allowed.has(id)));
  } catch { document.getElementById('storageNote').hidden = false; }
  const normalize = text => String(text).normalize('NFKC').toLocaleLowerCase().trim();
  function filter() {
    const words = normalize(input.value).split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(card => {
      const inCategory = category === 'all' || (category === 'favorites' ? favorites.has(card.dataset.id) : category === card.dataset.category);
      card.hidden = !inCategory || !words.every(word => normalize(card.dataset.search).includes(word));
      if (!card.hidden) visible++;
    });
    document.getElementById('resultCount').textContent = visible === cards.length && category === 'all' && !words.length ? cards.length + ' เครื่องมือ' : 'พบ ' + visible + ' จาก ' + cards.length + ' เครื่องมือ';
    clear.hidden = !input.value;
    empty.hidden = visible > 0;
    const noFavorites = category === 'favorites' && !favorites.size;
    document.getElementById('emptyTitle').textContent = noFavorites ? 'ยังไม่มีรายการโปรด' : 'ไม่พบเครื่องมือที่ตรงกัน';
    document.getElementById('emptyDescription').textContent = noFavorites ? 'กดดาวบนเครื่องมือที่ใช้บ่อย เพื่อกลับมาเปิดได้ง่ายขึ้น' : 'ลองใช้คำสั้น ๆ เช่น เพลง ภาพ หรือชื่อเครื่องมือ แล้วเลือกหมวดอื่น';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  }
  function updateFavorites() {
    document.getElementById('favoriteCount').textContent = favorites.size;
    cards.forEach(card => {
      const button = card.querySelector('.favorite-button');
      const active = favorites.has(card.dataset.id);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', (active ? 'นำ ' : 'เพิ่ม ') + button.dataset.name + (active ? ' ออกจากรายการโปรด' : ' ในรายการโปรด'));
    });
  }
  cards.forEach(card => {
    const button = card.querySelector('.favorite-button');
    button.addEventListener('click', () => {
      const id = card.dataset.id;
      const active = !favorites.has(id);
      if (active) favorites.add(id); else favorites.delete(id);
      try { localStorage.setItem(storageKey, JSON.stringify([...favorites])); }
      catch { document.getElementById('storageNote').hidden = false; }
      updateFavorites();
      if (category === 'favorites' && !active) buttons.find(b => b.dataset.filter === 'favorites').focus();
      filter();
      document.getElementById('favoriteStatus').textContent = (active ? 'เพิ่ม ' : 'นำ ') + button.dataset.name + (active ? ' ในรายการโปรดแล้ว' : ' ออกจากรายการโปรดแล้ว');
    });
  });
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filter(); }));
  input.addEventListener('input', filter);
  clear.addEventListener('click', () => { input.value = ''; filter(); input.focus(); });
  document.getElementById('resetFilters').addEventListener('click', () => { category = 'all'; input.value = ''; filter(); input.focus(); });
  document.addEventListener('keydown', event => {
    const target = event.target;
    const typing = target instanceof Element && (target.matches('input,textarea,select') || target.isContentEditable);
    if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault(); input.focus();
    } else if (event.key === 'Escape' && target === input) {
      input.value = ''; filter();
    }
  });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    try {
      const saved = JSON.parse(event.newValue || '[]');
      favorites = new Set(Array.isArray(saved) ? saved.filter(id => allowed.has(id)) : []);
      updateFavorites(); filter();
    } catch { /* Keep the current list if another tab writes invalid data. */ }
  });
  updateFavorites(); filter();
  cards.forEach(card => { card.querySelector('.favorite-button').hidden = false; });
  document.getElementById('tools').hidden = false;
})();