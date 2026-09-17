(() => {
  const root = document.querySelector('[data-library-catalog]');
  if (!root) return;

  const source = root.getAttribute('data-source');
  const tbody = root.querySelector('tbody');
  const search = root.querySelector('[data-filter="search"]');
  const author = root.querySelector('[data-filter="author"]');
  const language = root.querySelector('[data-filter="language"]');
  const island = root.querySelector('[data-filter="island"]');
  const availability = root.querySelector('[data-filter="availability"]');
  const count = root.querySelector('[data-result-count]');
  const status = root.querySelector('[data-catalog-status]');

  const islandNames = {TF:'Tenerife',GC:'Gran Canaria',LZ:'Lanzarote',FV:'Fuerteventura',LP:'La Palma',LG:'La Gomera',EH:'El Hierro'};
  let works = [];

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function fillSelect(select, values, firstLabel) {
    if (!select) return;
    select.innerHTML = `<option value="">${esc(firstLabel)}</option>` + values.map(v => `<option value="${esc(v.value)}">${esc(v.label)}</option>`).join('');
  }

  function render() {
    const q = (search?.value || '').trim().toLocaleLowerCase('es');
    const av = availability?.value || '';
    const au = author?.value || '';
    const lang = language?.value || '';
    const isl = island?.value || '';

    const visible = works.filter(work => {
      const haystack = `${work.title} ${work.author || ''}`.toLocaleLowerCase('es');
      if (q && !haystack.includes(q)) return false;
      if (au && work.author !== au) return false;
      if (lang && !(work.languages || []).includes(lang)) return false;
      if (av === 'available' && !(work.available > 0)) return false;
      if (av === 'library' && !(work.copies > 0)) return false;
      if (av === 'digital' && !(work.archive || []).length) return false;
      if (isl && !(work.islands && work.islands[isl] && work.islands[isl].copies > 0)) return false;
      return true;
    });

    tbody.innerHTML = visible.map(work => {
      const title = work.detail_url ? `<a href="${esc(work.detail_url)}">${esc(work.title)}</a>` : esc(work.title);
      const digital = (work.archive || []).length ? `<span class="catalog-yes">Sí</span>` : '<span class="catalog-muted">—</span>';
      const langs = (work.languages || []).map(x => x.toUpperCase()).join(', ') || '—';
      return `<tr><td>${esc(work.author || '')}</td><td><strong>${title}</strong><span class="catalog-sub">${work.bica_records || 0} registros · ${work.isbn_count || 0} ISBN</span></td><td>${esc(langs)}</td><td>${work.copies || 0}</td><td><strong>${work.available || 0}</strong></td><td>${digital}</td></tr>`;
    }).join('');

    if (count) count.textContent = `${visible.length} ${visible.length === 1 ? 'obra' : 'obras'}`;
  }

  fetch(source, {credentials:'same-origin'})
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(data => {
      works = (data.works || []).map(work => ({...work, author: data.author?.name || work.author || ''}));
      fillSelect(author, [...new Set(works.map(w => w.author).filter(Boolean))].sort().map(v => ({value:v,label:v})), 'Todos los autores');
      fillSelect(language, [...new Set(works.flatMap(w => w.languages || []))].sort().map(v => ({value:v,label:v.toUpperCase()})), 'Todos los idiomas');

      const islandCodes = [...new Set(works.flatMap(w => Object.keys(w.islands || {})))].sort();
      if (islandCodes.length) {
        fillSelect(island, islandCodes.map(v => ({value:v,label:islandNames[v] || v})), 'Todas las islas');
        island.disabled = false;
      } else if (island) {
        island.disabled = true;
        island.title = 'Se activará al incorporar el desglose diario por biblioteca y sucursal de RED BICA.';
      }

      if (status) status.textContent = data.availability_note || '';
      render();
    })
    .catch(() => {
      if (status) status.textContent = 'No se ha podido cargar el catálogo en este momento.';
    });

  [search, author, language, island, availability].forEach(el => el?.addEventListener(el === search ? 'input' : 'change', render));
})();
