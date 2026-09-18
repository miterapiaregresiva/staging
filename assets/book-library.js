(() => {
  const root = document.querySelector('[data-book-library]');
  if (!root) return;

  const source = root.getAttribute('data-source');
  const availabilitySource = root.getAttribute('data-availability-source');
  const workSlug = root.getAttribute('data-work-slug');
  const libraryDirectorySource = root.getAttribute('data-library-directory') || '/data/libraries/canarias.json';
  let libraryDirectory = {};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const NETWORK_MUNICIPALITY = {
    EH03:'El Pinar',EH00:'Frontera',EH01:'Valverde',
    FV03:'Antigua',FV04:'Betancuria',FV01:'La Oliva',FV02:'Puerto del Rosario',FV00:'Puerto del Rosario',FV05:'Pájara',FV07:'Tuineje',FV06:'Tuineje',
    GC19:'Agaete',GC10:'Agüimes',GC20:'Artenara',GC11:'Arucas',GC15:'Firgas',GC17:'Gáldar',GC22:'Gáldar',GC09:'Ingenio',GC41:'La Aldea de San Nicolás',
    GC29:'Las Palmas de Gran Canaria',GC21:'Las Palmas de Gran Canaria',GC00:'Las Palmas de Gran Canaria',GC34:'Las Palmas de Gran Canaria',GC25:'Las Palmas de Gran Canaria',GC24:'Las Palmas de Gran Canaria',GC36:'Las Palmas de Gran Canaria',GC30:'Las Palmas de Gran Canaria',GC26:'Las Palmas de Gran Canaria',GC31:'Las Palmas de Gran Canaria',GC23:'Las Palmas de Gran Canaria',GC33:'Las Palmas de Gran Canaria',GC40:'Las Palmas de Gran Canaria',GC32:'Las Palmas de Gran Canaria',GC37:'Las Palmas de Gran Canaria',GC27:'Las Palmas de Gran Canaria',GC01:'Las Palmas de Gran Canaria',GC28:'Las Palmas de Gran Canaria',
    GC03:'Mogán',GC06:'Moya',GC39:'Moya',GC16:'San Bartolomé de Tirajana',GC07:'Santa Brígida',GC12:'Santa Lucía',GC08:'Santa María de Guía',GC18:'Tejeda',GC38:'Telde',GC04:'Telde',GC14:'Teror',GC13:'Valleseco',GC02:'Valsequillo de Gran Canaria',GC05:'Vega de San Mateo',
    LG00:'San Sebastián de La Gomera',LG01:'Valle Gran Rey',LG02:'Vallehermoso',
    LP07:'Barlovento',LP06:'Breña Alta',LP14:'Breña Baja',LP17:'El Paso',LP01:'El Paso',LP12:'Fuencaliente',LP15:'Garafía',LP02:'Los Llanos de Aridane',LP18:'Los Llanos de Aridane',LP16:'Los Llanos de Aridane',LP13:'Puntagorda',LP05:'Puntallana',LP03:'San Andrés y Sauces',LP00:'Santa Cruz de La Palma',LP11:'Santa Cruz de La Palma',LP10:'Santa Cruz de La Palma',LP09:'Tazacorte',LP08:'Tijarafe',LP04:'Villa de Mazo',
    LZ00:'Arrecife',LZ01:'Arrecife',LZ07:'Haría',LZ03:'San Bartolomé',LZ04:'Teguise',LZ05:'Tinajo',LZ02:'Tías',
    TF15:'Adeje',TF04:'Arafo',TF24:'Arico',TF11:'Arona',TF17:'Buenavista del Norte',TF14:'Candelaria',TF20:'El Rosario',TF23:'El Sauzal',TF31:'El Tanque',TF18:'Fasnia',TF19:'Garachico',TF12:'Granadilla de Abona',TF16:'Guía de Isora',TF26:'Güímar',TF08:'Icod de Los Vinos',TF25:'La Guancha',TF27:'La Matanza de Acentejo',TF10:'La Orotava',TF34:'La Orotava',TF52:'La Orotava',TF33:'La Orotava',TF03:'La Victoria de Acentejo',TF13:'Los Realejos',TF21:'Los Silos',TF07:'Puerto de la Cruz',TF46:'Puerto de la Cruz',TF51:'Puerto de la Cruz',TF36:'San Cristóbal de La Laguna',TF38:'San Cristóbal de La Laguna',TF09:'San Cristóbal de La Laguna',TF54:'San Cristóbal de La Laguna',TF47:'San Cristóbal de La Laguna',TF37:'San Cristóbal de La Laguna',TF35:'San Cristóbal de La Laguna',TF28:'San Juan de La Rambla',TF05:'San Miguel de Abona',TF48:'Santa Cruz de Tenerife',TF42:'Santa Cruz de Tenerife',TF50:'Santa Cruz de Tenerife',TF00:'Santa Cruz de Tenerife',TF39:'Santa Cruz de Tenerife',TF49:'Santa Cruz de Tenerife',TF41:'Santa Cruz de Tenerife',TF01:'Santa Cruz de Tenerife',TF22:'Santa Úrsula',TF29:'Santiago del Teide',TF30:'Tacoronte',TF06:'Tegueste',TF32:'Vilaflor'
  };

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

  function availabilityMarkup(available, copies) {
    const a = Number(available || 0);
    const c = Number(copies || 0);
    const state = a === 0 ? 'none' : a === 1 ? 'one' : 'many';
    return `<span class="availability-pill availability-${state}" aria-label="${a} disponibles de ${c}">${a}/${c}</span>`;
  }

  function normalizeBookData(raw) {
    if (!Array.isArray(raw?.works)) return raw;
    const work = raw.works.find(item => item.slug === workSlug);
    if (!work) throw new Error(`Obra no encontrada: ${workSlug}`);
    return {
      generated_at: raw.generated_at,
      last_checked: work.last_checked || raw.last_checked,
      summary: {
        bica_records: work.bica_records,
        copies: work.copies,
        available: work.available,
        isbn_count: work.isbn_count
      },
      archive: work.archive || [],
      editions: work.editions || []
    };
  }

  function contactMarkup(contact) {
    if (!contact) return '<p class="branch-contact-pending">Contacto y horario pendientes de verificar.</p>';
    const rows = [];
    if (contact.status_note) {
      rows.push(`<p class="branch-status-note">${esc(contact.status_note)}</p>`);
    }
    if (contact.address) {
      rows.push(`<div class="branch-contact-item"><span class="branch-contact-label">Dirección</span><span>${esc(contact.address)}</span></div>`);
    }
    if (contact.opening_hours) {
      const hours = Array.isArray(contact.opening_hours) ? contact.opening_hours : [contact.opening_hours];
      rows.push(`<div class="branch-contact-item"><span class="branch-contact-label">Horario</span><span class="branch-opening-hours">${hours.map(line => `<span>${esc(line)}</span>`).join('')}</span></div>`);
    }
    if (contact.phone) {
      rows.push(`<div class="branch-contact-item"><span class="branch-contact-label">Teléfono</span><span>${esc(contact.phone)}</span></div>`);
    }
    if (contact.email) {
      rows.push(`<div class="branch-contact-item"><span class="branch-contact-label">Correo</span><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></div>`);
    }
    return rows.length
      ? `<div class="branch-contact">${rows.join('')}</div>`
      : '<p class="branch-contact-pending">Contacto y horario pendientes de verificar.</p>';
  }

  function municipalityFor(libraryId, library) {
    return library?.municipality || NETWORK_MUNICIPALITY[libraryId] || 'Otros centros';
  }

  function libraryDisplay(libraryId, library, branchId, branch) {
    const directory = libraryDirectory[`${libraryId}:${branchId}`];
    if (directory) return {name: directory.name, meta: directory.municipality || municipalityFor(libraryId, library), directory};
    const municipality = municipalityFor(libraryId, library);
    const branchName = String(branch?.name || '').trim();
    const networkName = String(library?.name || '').trim();

    if (/\b(biblioteca|centro bibliotecario|instituto|universidad|archivo)\b/i.test(branchName)) {
      return {name: branchName, meta: municipality};
    }

    // El parser diario puede recibir una cabecera de red desplazada; por eso no
    // tratamos ese texto como nombre de sucursal. Mostramos una denominación
    // funcional y el punto de servicio por separado hasta tener directorio oficial.
    const generic = networkName && /biblioteca pública municipal/i.test(networkName)
      ? `Biblioteca Pública Municipal de ${municipality}`
      : `Biblioteca pública de ${municipality}`;
    return {
      name: generic,
      meta: branchName ? `Sede: ${branchName}` : `Punto BICA ${branchId}`
    };
  }

  function buildBranchRecordMap(data) {
    const map = new Map();
    (data?.records || [])
      .filter(record => record.work_slug === workSlug)
      .forEach(record => {
        const seen = new Set();
        (record.copies || []).forEach(copy => {
          const libraryId = copy.library_id || 'UNKNOWN';
          const branchId = copy.branch_id || 'UNKNOWN';
          const key = `${libraryId}:${branchId}`;
          if (seen.has(key)) return;
          seen.add(key);
          if (!map.has(key)) map.set(key, []);
          map.get(key).push({bica_id: record.bica_id, permalink: record.permalink});
        });
      });
    return map;
  }

  function branchBicaLinks(branchRecordMap, libraryId, branchId) {
    const records = branchRecordMap.get(`${libraryId}:${branchId}`) || [];
    if (!records.length) return '';
    if (records.length === 1) {
      const record = records[0];
      return `<a class="branch-primary-action" href="${esc(record.permalink)}" target="_blank" rel="noopener noreferrer"><span>Consultar en RED BICA</span><small>Disponibilidad y reserva</small></a>`;
    }
    return `<details class="branch-edition-details"><summary>Consultar ${records.length} ediciones en RED BICA</summary><div class="branch-edition-links">${records.map(record => `<a href="${esc(record.permalink)}" target="_blank" rel="noopener noreferrer">Ficha BICA ${esc(record.bica_id)}</a>`).join('')}</div></details>`;
  }

  function renderBranch(branchRecordMap, libraryId, library, branchId, branch) {
    const label = libraryDisplay(libraryId, library, branchId, branch);
    const available = Number(branch.available || 0);
    const copies = Number(branch.copies || 0);
    const stateClass = available > 0 ? 'is-available' : 'is-unavailable';
    const stateLabel = available > 0 ? 'Disponible ahora' : 'Sin disponibilidad inmediata';
    const countLabel = `${available} ${available === 1 ? 'disponible' : 'disponibles'} de ${copies} ${copies === 1 ? 'ejemplar' : 'ejemplares'}`;

    return `<article class="branch-availability ${stateClass}">
      <div class="branch-card-main">
        <div class="branch-library-identity">
          <h4>${esc(label.name)}</h4>
          <p class="branch-availability-copy"><strong>${stateLabel}</strong><span>${esc(countLabel)}</span></p>
        </div>
        ${branchBicaLinks(branchRecordMap, libraryId, branchId)}
      </div>
      ${label.directory
        ? `<details class="branch-directory-details"><summary><span>Dirección, horario y contacto</span></summary><div class="branch-directory-body">${contactMarkup(label.directory)}<p class="branch-official-link"><a href="${esc(label.directory.directory_url)}" target="_blank" rel="noopener noreferrer">Ver ficha oficial</a></p></div></details>`
        : contactMarkup(branch.contact)}
    </article>`;
  }

  function renderAvailability(data) {
    const target = root.querySelector('[data-island-status]');
    if (!target) return;
    const work = data?.works?.[workSlug];
    if (!work || !Object.keys(work.islands || {}).length) {
      target.innerHTML = '<p>No hay desglose geográfico disponible para esta obra.</p>';
      return;
    }

    const branchRecordMap = buildBranchRecordMap(data);
    const islandOrder = ['TF','GC','LZ','FV','LP','LG','EH'];
    const geography = Object.entries(work.islands || {})
      .filter(([code, island]) => code !== 'UNKNOWN' && Number(island?.copies || 0) > 0)
      .sort(([a], [b]) => islandOrder.indexOf(a) - islandOrder.indexOf(b))
      .map(([code, island]) => {
        const municipalities = new Map();

        Object.entries(island.libraries || {}).forEach(([libraryId, library]) => {
          Object.entries(library.branches || {}).forEach(([branchId, branch]) => {
            if (Number(branch?.copies || 0) <= 0) return;
            const directory = libraryDirectory[`${libraryId}:${branchId}`];
            const municipality = directory?.municipality || municipalityFor(libraryId, library);
            if (!municipalities.has(municipality)) {
              municipalities.set(municipality, {copies:0, available:0, branches:[]});
            }
            const group = municipalities.get(municipality);
            group.copies += Number(branch.copies || 0);
            group.available += Number(branch.available || 0);
            group.branches.push([libraryId, library, branchId, branch]);
          });
        });

        return {
          code,
          name: island.name || code,
          copies: Number(island.copies || 0),
          available: Number(island.available || 0),
          municipalities: [...municipalities.entries()]
            .filter(([, group]) => group.copies > 0)
            .sort(([a],[b]) => a.localeCompare(b, 'es'))
        };
      })
      .filter(island => island.municipalities.length);

    if (!geography.length) {
      target.innerHTML = '<p>No hay bibliotecas con ejemplares registrados para esta obra.</p>';
      return;
    }

    target.innerHTML = `
      <div class="library-location-picker">
        <div class="library-location-controls">
          <label>
            <span>Isla</span>
            <select data-library-island>
              <option value="">Selecciona una isla</option>
              ${geography.map(island => `<option value="${esc(island.code)}">${esc(island.name)}</option>`).join('')}
            </select>
          </label>
          <label>
            <span>Municipio</span>
            <select data-library-municipality disabled>
              <option value="">Selecciona primero una isla</option>
            </select>
          </label>
        </div>
        <p class="library-location-hint" data-library-location-hint>Solo aparecen islas y municipios donde RED BICA registra ejemplares de este libro.</p>
        <div class="library-location-results" data-library-location-results aria-live="polite"></div>
      </div>`;

    const islandSelect = target.querySelector('[data-library-island]');
    const municipalitySelect = target.querySelector('[data-library-municipality]');
    const hint = target.querySelector('[data-library-location-hint]');
    const results = target.querySelector('[data-library-location-results]');

    const showMunicipality = (island, municipality) => {
      const entry = island.municipalities.find(([name]) => name === municipality);
      if (!entry) {
        results.innerHTML = '';
        return;
      }
      const [, group] = entry;
      const branchCount = group.branches.length;
      hint.innerHTML = `<strong>${esc(municipality)}</strong> · ${branchCount} ${branchCount === 1 ? 'biblioteca' : 'bibliotecas'} · ${group.copies} ${group.copies === 1 ? 'ejemplar' : 'ejemplares'} · ${group.available} disponibles ahora`;
      results.innerHTML = group.branches
        .map(([libraryId, library, branchId, branch]) => renderBranch(branchRecordMap, libraryId, library, branchId, branch))
        .join('');
    };

    const populateMunicipalities = island => {
      municipalitySelect.innerHTML = '<option value="">Selecciona un municipio</option>' +
        island.municipalities.map(([municipality, group]) =>
          `<option value="${esc(municipality)}">${esc(municipality)} · ${group.copies} ${group.copies === 1 ? 'ejemplar' : 'ejemplares'}</option>`
        ).join('');
      municipalitySelect.disabled = false;
      results.innerHTML = '';
      hint.textContent = `${island.name}: ${island.municipalities.length} ${island.municipalities.length === 1 ? 'municipio con ejemplares' : 'municipios con ejemplares'}. Elige uno para ver las bibliotecas.`;

      if (island.municipalities.length === 1) {
        municipalitySelect.value = island.municipalities[0][0];
        showMunicipality(island, island.municipalities[0][0]);
      }
    };

    islandSelect.addEventListener('change', () => {
      const island = geography.find(item => item.code === islandSelect.value);
      if (!island) {
        municipalitySelect.innerHTML = '<option value="">Selecciona primero una isla</option>';
        municipalitySelect.disabled = true;
        results.innerHTML = '';
        hint.textContent = 'Solo aparecen islas y municipios donde RED BICA registra ejemplares de este libro.';
        return;
      }
      populateMunicipalities(island);
    });

    municipalitySelect.addEventListener('change', () => {
      const island = geography.find(item => item.code === islandSelect.value);
      if (!island || !municipalitySelect.value) {
        results.innerHTML = '';
        return;
      }
      showMunicipality(island, municipalitySelect.value);
    });

    const updated = root.querySelector('[data-updated]');
    if (updated) updated.textContent = formatChecked(data.last_checked);
  }

  fetch(libraryDirectorySource, {credentials:'same-origin'}).then(r => r.ok ? r.json() : {libraries:{}}).then(directoryData => { libraryDirectory = directoryData.libraries || {}; }).catch(() => {}).then(() => fetch(source, {credentials:'same-origin'}))
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(raw => {
      const data = normalizeBookData(raw);
      root.querySelectorAll('[data-value]').forEach(el => {
        const key = el.getAttribute('data-value');
        if (key in (data.summary || {})) el.textContent = data.summary[key];
      });
      const updated = root.querySelector('[data-updated]');
      if (updated) updated.textContent = data.last_checked ? formatChecked(data.last_checked) : (data.generated_at || '—');

      const resources = root.querySelector('[data-archive-resources]');
      if (resources) {
        resources.innerHTML = (data.archive || []).map(item => `<li><strong>${esc(item.title)}</strong><br><span class="catalog-sub">Internet Archive · ${esc(item.type)}</span><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Consultar recurso</a></li>`).join('') || '<li>No hemos verificado todavía un recurso gratuito de lectura online para esta obra.</li>';
      }

      const tbody = root.querySelector('[data-editions-body]');
      if (tbody) {
        tbody.innerHTML = (data.editions || []).map(ed => `<tr><td><a href="${esc(ed.permalink)}" target="_blank" rel="noopener noreferrer">${esc(ed.bica_id)}</a></td><td>${esc(ed.publication)}</td><td>${esc(ed.isbn || '—')}</td><td>${esc(ed.copies ?? '—')}</td><td>${ed.available == null || ed.copies == null ? '—' : availabilityMarkup(ed.available, ed.copies)}</td><td><a class="bica-reserve-link" href="${esc(ed.permalink)}" target="_blank" rel="noopener noreferrer">Ver y reservar en RED BICA</a></td></tr>`).join('');
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
