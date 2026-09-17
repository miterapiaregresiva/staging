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

  function municipalityName(libraryName) {
    const raw = String(libraryName || '').trim();
    if (!raw) return 'Otros centros';
    const dot = raw.indexOf('.');
    if (dot > 0 && dot < 70) return raw.slice(0, dot).trim();
    return raw;
  }

  function renderBranch(libraryId, library, branchId, branch) {
    const availableLabel = branch.available === 1 ? '1 disponible' : `${branch.available || 0} disponibles`;
    const copyLabel = branch.copies === 1 ? '1 ejemplar' : `${branch.copies || 0} ejemplares`;
    return `<article class="branch-availability">
      <div class="branch-availability-head">
        <div><strong>${esc(branch.name || `Sucursal ${branchId}`)}</strong><span class="catalog-sub">${esc(library.name || libraryId)}</span></div>
        <span class="branch-availability-count">${availableLabel} · ${copyLabel}</span>
      </div>
      ${contactMarkup(branch.contact)}
    </article>`;
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
      const municipalities = new Map();
      Object.entries(island.libraries || {}).forEach(([libraryId, library]) => {
        const municipality = municipalityName(library.name);
        if (!municipalities.has(municipality)) municipalities.set(municipality, {copies:0, available:0, libraries:[]});
        const group = municipalities.get(municipality);
        group.copies += Number(library.copies || 0);
        group.available += Number(library.available || 0);
        group.libraries.push([libraryId, library]);
      });

      const municipalityMarkup = [...municipalities.entries()]
        .sort(([a],[b]) => a.localeCompare(b, 'es'))
        .map(([municipality, group]) => {
          const branches = group.libraries.map(([libraryId, library]) =>
            Object.entries(library.branches || {}).map(([branchId, branch]) => renderBranch(libraryId, library, branchId, branch)).join('')
          ).join('');
          return `<details class="municipality-availability">
            <summary><span>${esc(municipality)}</span><span>${group.available} disponibles de ${group.copies}</span></summary>
            <div class="branch-availability-list">${branches}</div>
          </details>`;
        }).join('');

      return `<details class="island-availability" data-island="${esc(code)}">
        <summary><span>${esc(island.name || code)}</span><span>${island.available || 0} disponibles de ${island.copies || 0}</span></summary>
        <div class="municipality-list">${municipalityMarkup}</div>
      </details>`;
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
        tbody.innerHTML = (data.editions || []).map(ed => `<tr><td><a href="${esc(ed.permalink)}" target="_blank" rel="noopener noreferrer">${esc(ed.bica_id)}</a></td><td>${esc(ed.publication)}</td><td>${esc(ed.isbn || '—')}</td><td>${esc(ed.copies ?? '—')}</td><td><strong>${esc(ed.available ?? '—')}</strong></td><td><a class="bica-reserve-link" href="${esc(ed.permalink)}" target="_blank" rel="noopener noreferrer">Ver y reservar en RED BICA</a></td></tr>`).join('');
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
