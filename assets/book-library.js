(() => {
  const root = document.querySelector('[data-book-library]');
  if (!root) return;

  const source = root.getAttribute('data-source');
  const availabilitySource = root.getAttribute('data-availability-source');
  const workSlug = root.getAttribute('data-work-slug');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function formatChecked(value) {
    if (!value) return 'pendiente de la primera actualización diaria';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('es-ES', {
      timeZone: 'Atlantic/Canary',
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date) + ' (hora canaria)';
  }

  function contactMarkup(contact) {
    if (!contact) return '<p class="branch-contact-pending">Contacto y horario pendientes de verificar.</p>';
    const bits = [];
    if (contact.phone) bits.push(`<a href="tel:${esc(String(contact.phone).replace(/\s+/g,''))}">Tel. ${esc(contact.phone)}</a>`);
    if (contact.email) bits.push(`<a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>`);
    if (contact.address) bits.push(`<span>${esc(contact.address)}</span>`);
    if (contact.opening_hours) {
      const hours = Array.isArray(contact.opening_hours) ? contact.opening_hours.join(' · ') : contact.opening_hours;
      bits.push(`<span>Horario: ${esc(hours)}</span>`);
    }
    return bits.length
      ? `<div class="branch-contact">${bits.join('')}</div>`
      : '<p class="branch-contact-pending">Contacto y horario pendientes de verificar.</p>';
  }

  function renderAvailability(data) {
    const target = root.querySelector('[data-island-status]');
    if (!target) return;
    const work = data?.works?.[workSlug];
    if (!work || !Object.keys(work.islands || {}).length) {
      target.innerHTML = '<p>El desglose por isla se activará tras la primera actualización diaria de RED BICA.</p>';
      return;
    }

    const islandOrder = ['TF','GC','LZ','FV','LP','LG','EH'];
    const islands = Object.entries(work.islands || {})
      .filter(([code]) => code !== 'UNKNOWN')
      .sort(([a], [b]) => islandOrder.indexOf(a) - islandOrder.indexOf(b));

    target.innerHTML = islands.map(([code, island]) => {
      const libraries = Object.entries(island.libraries || {}).map(([libraryId, library]) => {
        const branches = Object.entries(library.branches || {}).map(([branchId, branch]) => {
          const availableLabel = branch.available === 1 ? '1 disponible' : `${branch.available || 0} disponibles`;
          const copyLabel = branch.copies === 1 ? '1 ejemplar' : `${branch.copies || 0} ejemplares`;
          return `<article class="branch-availability">
            <div class="branch-availability-head">
              <div><strong>${esc(branch.name || `Sucursal ${branchId}`)}</strong><span class="catalog-sub">${esc(library.name || libraryId)}</span></div>
              <span class="branch-availability-count">${availableLabel} · ${copyLabel}</span>
            </div>
            ${contactMarkup(branch.contact)}
          </article>`;
        }).join('');
        return branches;
      }).join('');

      return `<section class="island-availability" data-island="${esc(code)}">
        <h4>${esc(island.name || code)} <span>${island.available || 0} disponibles de ${island.copies || 0}</span></h4>
        <div class="branch-availability-list">${libraries}</div>
      </section>`;
    }).join('');

    const updated = root.querySelector('[data-updated]');
    if (updated) updated.textContent = formatChecked(data.last_checked);
  }

  fetch(source, {credentials:'same-origin'})
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(data => {
      root.querySelectorAll('[data-value]').forEach(el => {
        const key = el.getAttribute('data-value');
        if (key in (data.summary || {})) el.textContent = data.summary[key];
      });
      const updated = root.querySelector('[data-updated]');
      if (updated) updated.textContent = data.last_checked ? formatChecked(data.last_checked) : (data.generated_at || '—');

      const resources = root.querySelector('[data-archive-resources]');
      if (resources) {
        resources.innerHTML = (data.archive || []).map(item => `<li><strong>${esc(item.title)}</strong><br><span class="catalog-sub">Internet Archive · ${esc(item.type)}</span><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Consultar recurso</a></li>`).join('') || '<li>No hay recurso digital enlazado.</li>';
      }

      const tbody = root.querySelector('[data-editions-body]');
      if (tbody) {
        tbody.innerHTML = (data.editions || []).map(ed => `<tr><td><a href="${esc(ed.permalink)}" target="_blank" rel="noopener noreferrer">${esc(ed.bica_id)}</a></td><td>${esc(ed.publication)}</td><td>${esc(ed.isbn || '—')}</td><td>${esc(ed.copies ?? '—')}</td><td><strong>${esc(ed.available ?? '—')}</strong></td></tr>`).join('');
      }

      if (availabilitySource && workSlug) {
        return fetch(availabilitySource, {credentials:'same-origin'})
          .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
          .then(renderAvailability)
          .catch(() => {
            const island = root.querySelector('[data-island-status]');
            if (island) island.innerHTML = '<p>No se ha podido cargar el desglose diario por biblioteca en este momento.</p>';
          });
      }
    })
    .catch(() => {
      const status = root.querySelector('[data-book-status]');
      if (status) status.textContent = 'No se han podido cargar los datos bibliográficos en este momento.';
    });
})();
