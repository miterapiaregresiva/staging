(() => {
  const root = document.querySelector('[data-book-library]');
  if (!root) return;
  const source = root.getAttribute('data-source');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  fetch(source, {credentials:'same-origin'})
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(data => {
      root.querySelectorAll('[data-value]').forEach(el => {
        const key = el.getAttribute('data-value');
        if (key in (data.summary || {})) el.textContent = data.summary[key];
      });
      const updated = root.querySelector('[data-updated]');
      if (updated) updated.textContent = data.generated_at || '—';

      const resources = root.querySelector('[data-archive-resources]');
      if (resources) {
        resources.innerHTML = (data.archive || []).map(item => `<li><strong>${esc(item.title)}</strong><br><span class="catalog-sub">Internet Archive · ${esc(item.type)}</span><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Consultar recurso</a></li>`).join('') || '<li>No hay recurso digital enlazado.</li>';
      }

      const tbody = root.querySelector('[data-editions-body]');
      if (tbody) {
        tbody.innerHTML = (data.editions || []).map(ed => `<tr><td><a href="${esc(ed.permalink)}" target="_blank" rel="noopener noreferrer">${esc(ed.bica_id)}</a></td><td>${esc(ed.publication)}</td><td>${esc(ed.isbn || '—')}</td><td>${esc(ed.copies ?? '—')}</td><td><strong>${esc(ed.available ?? '—')}</strong></td></tr>`).join('');
      }

      const island = root.querySelector('[data-island-status]');
      if (island) {
        const entries = Object.entries(data.summary?.islands || {});
        island.textContent = entries.length ? '' : 'El desglose por isla, biblioteca y sucursal se incorporará cuando terminemos el rastreo de ejemplares de RED BICA.';
      }
    })
    .catch(() => {
      const status = root.querySelector('[data-book-status]');
      if (status) status.textContent = 'No se han podido cargar los datos bibliográficos en este momento.';
    });
})();
