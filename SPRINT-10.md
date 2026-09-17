# Sprint 10: Estabilización y release candidate

Fecha: 2026-09-17.

Estado: **EN VALIDACIÓN — SIN NUEVO REDISEÑO**.

## Objetivo

Cerrar staging como candidato a producción después de los Sprints 06–09 y de la materialización posterior de la interfaz estática. Este sprint no introduce nuevas decisiones visuales salvo correcciones de regresiones objetivas y el cierre editorial necesario para que autores/biblioteca lleguen a producción con una arquitectura coherente.

Principio rector: **estabilizar antes de seguir ampliando**.

## Cambios ya incorporados después del Sprint 09

Los siguientes ajustes forman parte de este sprint de facto y deben validarse como un bloque:

- materialización en HTML de componentes estáticos que antes dependían de JavaScript;
- simplificación de `assets/site.js` para que solo mejore interacciones;
- incorporación global del botón de menú móvil en el HTML;
- incorporación del footer completo y del acceso a WhatsApp en HTML;
- centrado final del hero de portada en escritorio;
- centrado y normalización del lockup de marca del footer;
- línea de servicio del footer: `Terapia regresiva presencial en Tenerife · Canarias`;
- restauración del patrón editorial de lecturas relacionadas;
- reducción de dependencia de construcción dinámica de interfaz.

## Cierre editorial de autores y obras

Antes del release se ha simplificado la arquitectura de la biblioteca:

- [x] La unidad pública principal es la **ficha de autor**.
- [x] Las obras seleccionadas se muestran como tarjetas visuales dentro de cada autor.
- [x] Los retratos del directorio comparten una proporción 4:5.
- [x] Las obras comparten una proporción de portada 2:3 y se muestran completas con `object-fit: contain`.
- [x] Se utilizan portadas locales ya disponibles y con procedencia identificada cuando existen.
- [x] Cuando no existe una portada verificada se utiliza un placeholder explícito; no se inventan carátulas ni se incorporan imágenes de procedencia dudosa.
- [x] Se han retirado los enlaces internos hacia `/autores/.../libros/.../`.
- [x] Se han retirado del sitemap todas las URLs individuales de libros.
- [x] No existen actualmente archivos ni carpetas públicas `/autores/.../libros/` en el árbol de staging.
- [x] El índice `/autores/` y la portada de biblioteca explican el patrón autor → obras.
- [x] Ian Stevenson utiliza el retrato local de dominio público tanto en `/autores/` como en la portada de biblioteca.
- [x] Brian Weiss, Michael Newton, Ian Stevenson y Raymond A. Moody disponen de retrato verificado en los índices.
- [x] Brian Weiss, Helen Wambach, Ian Stevenson y Raymond A. Moody disponen de al menos una portada local de obra.
- [ ] Incorporar localmente los retratos reutilizables de Brian Weiss y Raymond A. Moody para evitar hotlinks externos.
- [ ] Sustituir placeholders de otros autores por retratos reutilizables solo cuando exista procedencia/licencia suficientemente documentada.
- [ ] Completar portadas de obras cuando exista una fuente verificable; la ausencia de una portada no bloquea el release.

### Regla para futuras páginas de libros

No se volverá a crear una página individual de una obra solo por existir en la bibliografía. Una futura ficha de libro deberá aportar, como mínimo:

1. resumen propio y útil de la obra;
2. datos bibliográficos contrastados;
3. explicación de su relación con el autor y con el contexto de la biblioteca;
4. fuentes de consulta;
5. portada con procedencia/licencia documentada o una alternativa gráfica legítima;
6. suficiente contenido original para justificar una URL independiente.

## Comprobaciones de código realizadas al abrir el sprint

- [x] `assets/site.js` ya no construye header, footer, WhatsApp ni enlaces editoriales: solo gestiona menú móvil y cierre accesible de créditos de imagen.
- [x] No se encuentra el antiguo `<base href="/mtr/">`; staging utiliza `<base href="/">`.
- [x] No se encuentra el antiguo `.hero-brand-panel` en el código indexado del repositorio.
- [x] `index.html` mantiene `noindex,nofollow`, correcto para staging.
- [x] `robots.txt` existe y apunta al sitemap de producción.
- [x] `sitemap.xml` existe y contiene URLs canónicas de `https://miterapiaregresiva.com/`.
- [x] La portada ya incorpora `srcset`/`sizes` en imágenes principales visibles en cards.
- [x] El sitemap no contiene URLs individuales de libros.

## P0 — Validación funcional y visual

Validar sin introducir cambios de diseño salvo defecto reproducible.

### Viewports

- [ ] 360 × 800.
- [ ] 390 × 844.
- [ ] 430 × 932.
- [ ] 768 × 1024.
- [ ] escritorio ≥1280 px.

### Plantillas representativas

- [ ] `/`.
- [ ] `/terapia-regresiva/`.
- [ ] `/como-trabajo/`.
- [ ] `/preguntas-frecuentes/`.
- [ ] `/articulos/`.
- [ ] un artículo largo.
- [ ] `/biblioteca-de-terapia-regresiva/`.
- [ ] `/autores/`.
- [ ] una ficha de autor con retrato real y varias portadas.
- [ ] una ficha de autor con placeholders de retrato/obra.
- [ ] `/contacto/`.
- [ ] `404.html`.

### Accesibilidad y robustez

- [ ] Recorrido completo solo con teclado: header → menú → contenido → FAQ/créditos → footer.
- [ ] Confirmar Escape y restauración de foco en menú y créditos.
- [ ] Reflow/zoom a 200 %.
- [ ] Reflow/zoom a 400 % cuando sea posible.
- [ ] Confirmar ausencia de scroll horizontal inesperado.
- [ ] Contraste de controles de créditos sobre fotografías claras y oscuras.
- [ ] Confirmar que WhatsApp no tapa contenido, controles o créditos.
- [ ] Comprobar degradación básica con JavaScript desactivado.

## P0 — Auditoría de regresiones del hardcoding

- [ ] Confirmar que no existen componentes duplicados entre HTML y JavaScript.
- [ ] Confirmar IDs únicos del menú principal por página.
- [ ] Confirmar que todas las páginas que cargan `site.js` contienen markup compatible con la mejora progresiva.
- [ ] Confirmar que no queda CSS huérfano de componentes eliminados que afecte al layout.
- [ ] Revisar una muestra amplia de footer y header para confirmar consistencia global.

## P1 — Calidad técnica final

- [ ] Lighthouse en ventana limpia/sin extensiones.
- [ ] axe como apoyo a la revisión manual.
- [ ] Validación HTML en muestra representativa de plantillas.
- [ ] Validar JSON-LD/datos estructurados presentes.
- [ ] Confirmar que el sitio desplegado sirve WebP y `srcset` esperados.
- [ ] Revisar errores de consola y solicitudes fallidas.

## P1 — Gate de producción

Antes de promocionar a producción:

- [x] `<base href="/">` ya está preparado.
- [ ] Retirar `noindex,nofollow` exclusivamente en producción.
- [ ] Revisar canonicales de producción.
- [ ] Confirmar `robots.txt` de producción.
- [ ] Confirmar `sitemap.xml` de producción y que todas sus URLs existen.
- [ ] Verificar redirecciones desde URLs antiguas de WordPress.
- [ ] Validar correo y canales de contacto definitivos.
- [ ] Comparar staging y producción antes del corte para evitar perder cambios posteriores.

## Fuera de alcance

- nuevas decisiones de identidad visual;
- nuevas fuentes, colores o layouts;
- nuevas páginas de contenido salvo corrección necesaria;
- calendario editorial de Instagram;
- nuevas páginas individuales de libros;
- nuevas optimizaciones SEO de contenido.

## Criterio de cierre

Sprint 10 se considera cerrado cuando:

1. no existen regresiones P0 reproducibles;
2. la muestra de plantillas supera la revisión visual y de teclado;
3. Lighthouse/axe no revelan bloqueantes atribuibles al sitio;
4. el checklist de producción queda reducido únicamente a acciones deliberadas del momento de publicación;
5. staging puede congelarse como **release candidate**.

## Resultado esperado

Una versión de staging estable, documentada y suficientemente verificada para promocionarse a producción sin abrir otra iteración de diseño.
