# Sprint 06: Lectura móvil y navegación tranquila

Fecha: 2026-09-16.

Estado: **IMPLEMENTADO EN STG — PENDIENTE VALIDACIÓN VISUAL FINAL**.

Dependencia: validar este sprint antes de comenzar Sprint 07.

## Objetivo

Hacer que el contenido aparezca antes, reducir la presencia permanente de la interfaz y favorecer una lectura pausada, clara y predecible. No se busca rediseñar la identidad ni introducir nuevas tendencias visuales.

Principio rector: **easy paced reading**. Cada cambio debe mejorar al menos uno de estos aspectos: legibilidad, carga cognitiva, orientación, ritmo de lectura, confianza, accesibilidad o comodidad móvil.

## Implementación realizada

### 1. Header móvil compacto

Se ha sustituido el patrón anterior que mantenía varios destinos visibles por una cabecera móvil cerrada de una sola línea:

- marca/símbolo y nombre a la izquierda;
- control `Menú` a la derecha;
- navegación completa al desplegar;
- header sticky;
- altura objetivo aproximada de 64 px;
- tagline y línea de servicio ocultos únicamente en móvil para evitar una cabecera alta;
- los seis destinos originales se mantienen y conservan su orden.

Menú:

1. Terapia regresiva
2. Cómo trabajo
3. Sobre mí
4. Preguntas frecuentes
5. Artículos
6. Contacto

### 2. Accesibilidad del menú

Implementado en `assets/site.js`:

- botón real `<button>`;
- `aria-expanded` sincronizado con el estado;
- `aria-controls` apuntando al `nav` correspondiente;
- texto visible `Menú` / `Cerrar`;
- foco visible;
- objetivos táctiles mínimos de 48 × 48 px;
- cierre al seleccionar un enlace;
- cierre al pulsar fuera del menú;
- cierre con Escape y devolución de foco al botón;
- estado activo de página conservado mediante `aria-current` y fondo, no solo mediante color;
- degradación razonable sin JavaScript: el menú HTML original permanece visible porque la ocultación solo se activa tras añadir `.mobile-nav-enhanced`.

### 3. Branding duplicado del hero eliminado

Decisión aprobada durante el sprint: la cabecera ya contiene presencia de marca suficiente.

Se ha eliminado visualmente el panel/lockup gráfico del hero **tanto en escritorio como en móvil** mediante `assets/home-hero-brand.css`.

El hero queda centrado en:

- eyebrow `Tenerife · presencial`;
- H1;
- introducción principal;
- texto explicativo;
- acciones.

No se ha sustituido el lockup por ninguna ilustración, imagen decorativa o bloque promocional.

La estructura de dos columnas pasa a una composición editorial de una sola columna y el texto queda limitado por `var(--measure)` para evitar expansión excesiva en escritorio.

> Limpieza técnica posterior recomendada: retirar físicamente del HTML de portada el markup del antiguo `.hero-brand-panel` y su imagen una vez se haga la siguiente edición estructural de `index.html`. Actualmente está neutralizado con `display:none` y no participa en la composición visual.

### 4. Footer móvil

Por debajo de 700 px:

- footer a una sola columna;
- navegación alineada a la izquierda;
- se elimina la compresión artificial de dos columnas;
- se conservan agrupaciones semánticas y enlaces.

### 5. Márgenes y targets móviles

Implementado:

- margen general de lectura móvil de aproximadamente 20 px mediante `width: min(100% - 2.5rem, var(--max))`;
- ajuste específico por debajo de 390 px para la cabecera;
- targets del botón de menú y enlaces desplegados ≥48 px;
- menú desplegable contenido dentro del viewport horizontal.

## Fuera de alcance y preservado

- Escala tipográfica global: Sprint 07.
- Jerarquía de CTA y WhatsApp: Sprint 08.
- Refinamiento general de colores, cards e imágenes: Sprint 09.
- Textos editoriales sin cambios.
- Producción sin cambios.

## Criterios de aceptación

### Verificados en código

- [x] El header móvil implementa una única fila cerrada con marca + Menú.
- [x] La navegación completa permanece disponible al desplegar.
- [x] El menú usa botón real, `aria-expanded` y `aria-controls`.
- [x] Escape cierra el menú y devuelve el foco al control.
- [x] Targets del menú alcanzan al menos 48 px.
- [x] El panel/lockup de marca del hero no participa en el layout de escritorio ni móvil.
- [x] No se ha añadido una pieza decorativa sustitutiva.
- [x] Hero configurado en una sola columna con ancho editorial limitado.
- [x] Footer móvil configurado en una sola columna.
- [x] No se han introducido nuevas animaciones decorativas.
- [x] Los cambios se han realizado únicamente en `miterapiaregresiva/stg`.

### Pendientes de validación visual en navegador

- [ ] Revisar 360 × 800.
- [ ] Revisar 390 × 844.
- [ ] Revisar 430 × 932.
- [ ] Revisar 768 × 1024.
- [ ] Revisar escritorio ≥1280 px.
- [ ] Confirmar ausencia de scroll horizontal a zoom 200 %.
- [ ] Confirmar que la altura percibida del header cerrado está en el rango previsto.
- [ ] Confirmar equilibrio visual del hero de escritorio tras retirar el panel lateral.
- [ ] Confirmar foco y recorrido completo mediante teclado en navegador real.

## Archivos modificados

- `assets/site.js`
- `assets/home-hero-brand.css`
- `SPRINT-06.md`

## Validación siguiente

Antes de iniciar Sprint 07, realizar una revisión visual de staging en móvil y escritorio, incluyendo teclado y zoom 200 %. Si no aparecen regresiones, marcar Sprint 06 como cerrado y mover `TODO.md` a Sprint 07 como siguiente a implementar.

## Resultado esperado

La interfaz debe sentirse como una página que se lee, no como una aplicación o una landing cuya navegación y marca compiten de forma permanente con el contenido. La identidad sigue presente y reconocible en la cabecera; el hero queda liberado para explicar con calma qué ofrece la página.