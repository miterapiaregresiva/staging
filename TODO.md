# TODO — Mi Terapia Regresiva

> **STAGING ONLY:** este archivo pertenece exclusivamente al repositorio `miterapiaregresiva/stg`. No debe copiarse, sincronizarse ni promocionarse a producción.

## Estado actual

Los Sprints 06–09 de **Easy Paced Reading** están implementados en staging. Tras ellos se realizó una segunda tanda de cambios transversales para materializar la interfaz estática en HTML, simplificar JavaScript, cerrar hero/footer/WhatsApp y normalizar la biblioteca de autores. Ese bloque se documenta como **Sprint 10 — Estabilización y release candidate**.

- [x] Sprint 06 — Lectura móvil y navegación tranquila.
- [x] Sprint 07 — Sistema editorial de lectura.
- [x] Sprint 08 — Jerarquía de acciones y reducción de ruido.
- [x] Sprint 09 — Refinamiento visual y accesibilidad editorial.
- [ ] Sprint 10 — Estabilización y release candidate. Ver [`SPRINT-10.md`](SPRINT-10.md).

Principio rector: **easy paced reading**. La prioridad es una lectura fácil, pausada, clara y agradable, con baja carga cognitiva, navegación predecible, conversión sin presión y una experiencia móvil cómoda.

## P0 — Siguiente paso

No abrir nuevos cambios de diseño hasta cerrar esta validación.

### Validación visual y funcional

- [ ] Móvil 360 × 800.
- [ ] Móvil 390 × 844.
- [ ] Móvil 430 × 932.
- [ ] Tablet 768 × 1024.
- [ ] Escritorio ≥1280 px.
- [ ] Recorrer navegación, FAQ, créditos, WhatsApp y footer solo con teclado.
- [ ] Revisar reflow/zoom a 200 % y, cuando sea posible, 400 %.
- [ ] Revisar contraste de controles sobre fotografías claras y oscuras.
- [ ] Confirmar que WhatsApp no tapa contenido, controles o créditos.
- [ ] Revisar una muestra representativa de home, páginas de servicio, artículos, biblioteca, índice de autores, fichas de autor con obras, contacto y 404.

### Regresiones del hardcoding

- [x] `site.js` ya no construye header/footer/WhatsApp/enlaces editoriales; solo mejora interacciones.
- [x] El antiguo `.hero-brand-panel` ya no aparece en el código indexado.
- [x] No queda `<base href="/mtr/">` en el código indexado.
- [ ] Confirmar que no existen componentes duplicados entre HTML y JavaScript.
- [ ] Confirmar IDs únicos y markup compatible del menú en la muestra de plantillas.
- [ ] Confirmar que no queda CSS huérfano que provoque regresiones de layout.
- [ ] Comprobar degradación básica con JavaScript desactivado.

## P1 — Calidad técnica final

- [ ] Repetir Lighthouse después del despliegue actual, en ventana limpia/sin extensiones.
- [ ] Ejecutar axe como apoyo a la revisión manual.
- [ ] Validar HTML en una muestra representativa de plantillas.
- [ ] Validar los datos estructurados presentes.
- [ ] Confirmar desde el sitio desplegado que se sirven WebP y `srcset`/`sizes` esperados.
- [ ] Revisar errores de consola y solicitudes fallidas.
- [ ] Evaluar cabeceras de seguridad: CSP, HSTS, COOP y protección frente a framing. Resolver en la capa de dominio/CDN cuando GitHub Pages no sea suficiente.
- [ ] Revisar TTL de caché de recursos estáticos solo si aporta una mejora real.

### Estado técnico ya confirmado

- [x] `<base href="/">` ya está aplicado en staging.
- [x] La portada mantiene `noindex,nofollow`, correcto para staging.
- [x] `robots.txt` existe y referencia `https://miterapiaregresiva.com/sitemap.xml`.
- [x] `sitemap.xml` existe con URLs de producción y no incluye fichas individuales de libros.
- [x] La portada incorpora imágenes WebP con `srcset`/`sizes` en cards principales.
- [x] La imagen LCP de portada tiene `fetchpriority="high"` cuando corresponde según la implementación previa.
- [x] Los avisos de JavaScript/tareas largas originados por extensiones del navegador no se consideran problemas propios del sitio.

## P1 — Gate antes del corte a producción

- [x] `<base href="/">`.
- [ ] Retirar `noindex,nofollow` exclusivamente al promocionar a producción.
- [ ] Revisar y añadir/confirmar `rel="canonical"` en producción.
- [ ] Confirmar `robots.txt` de producción.
- [ ] Confirmar que todas las URLs de `sitemap.xml` existen en producción.
- [ ] Verificar redirecciones desde URLs antiguas de WordPress.
- [ ] Validar correo y canales de contacto definitivos.
- [ ] Comparar staging y producción antes del corte para no perder cambios recientes.
- [ ] Lighthouse final sin extensiones.

## Pendiente secundario — autores y biblioteca

La **ficha de autor** es la unidad editorial principal. Las obras se muestran dentro de esa ficha; por ahora no habrá páginas individuales de libros.

- [x] `/autores/` comparte lenguaje visual con las fichas individuales.
- [x] Retratos del directorio normalizados a una proporción 4:5.
- [x] Obras normalizadas a una proporción de portada 2:3, sin recortes panorámicos.
- [x] Las obras aparecen dentro de la ficha de su autor.
- [x] Las páginas individuales `/autores/.../libros/.../` no forman parte del árbol público actual.
- [x] Las URLs de libros individuales se han retirado del sitemap.
- [x] La biblioteca principal explica la arquitectura autor → obras.
- [x] Ian Stevenson utiliza ya el retrato local de dominio público en el directorio y en la portada de biblioteca.
- [x] Brian Weiss, Michael Newton, Ian Stevenson y Raymond A. Moody tienen retrato disponible en el directorio.
- [x] Brian Weiss, Helen Wambach, Ian Stevenson y Raymond A. Moody tienen al menos una portada de obra disponible localmente.
- [x] Placeholder coherente cuando no existe retrato o portada con procedencia verificada.
- [ ] Incorporar localmente los retratos reutilizables de Brian Weiss y Raymond A. Moody para eliminar hotlinks externos.
- [ ] Localizar retratos reutilizables y con procedencia documentada para Helen Wambach, Roger J. Woolger, Morris Netherton, Edith Fiore, Hans TenDam, Winafred Blake Lucas, Joel L. Whitton, Jim B. Tucker y Erlendur Haraldsson.
- [ ] Completar portadas de obras cuando encontremos una fuente verificable y jurídicamente razonable; no bloquear producción por una portada ausente.

### Fase futura — páginas individuales de libros

No crear una URL independiente solo porque una obra aparezca en la bibliografía. Una futura ficha de libro deberá aportar:

- resumen propio y útil;
- datos bibliográficos contrastados;
- relación con el autor y con el contexto de la biblioteca;
- fuentes de consulta;
- portada con procedencia documentada o alternativa gráfica legítima;
- suficiente contenido original para justificar una página propia.

### Backlog SEO/editorial — cómo leer y localizar libros de terapia regresiva en Canarias

Objetivo: convertir la biblioteca en un punto útil de acceso a las obras, sin transformarla en un repositorio de copias ni en un listado de enlaces sin contexto. Aprovechar además este contenido para cubrir búsquedas informativas y locales relacionadas con terapia regresiva, regresión e hipnosis regresiva en Canarias y Tenerife.

#### Enlaces de lectura y disponibilidad por obra

- [ ] Añadir en cada obra seleccionada una sección o bloque de **Dónde leer / consultar** cuando exista información verificable.
- [ ] Buscar primero fuentes legales de lectura o préstamo online: Internet Archive cuando la edición sea consultable legítimamente, Open Library, Google Books cuando ofrezca vista parcial o completa, HathiTrust u otras bibliotecas digitales pertinentes.
- [ ] Evitar enlazar copias no autorizadas o repositorios de procedencia dudosa.
- [ ] Buscar cada título y sus variantes en español/inglés en el catálogo de la **Red de Bibliotecas Públicas de Canarias / BICA** y enlazar la ficha de catálogo cuando exista.
- [ ] Comprobar disponibilidad en bibliotecas de Tenerife y, cuando sea útil, de otras islas; distinguir disponibilidad actual de mera existencia en catálogo.
- [ ] Indicar de forma clara el tipo de acceso: `Leer online`, `Vista parcial`, `Préstamo`, `Consultar catálogo`, `No encontrado`.
- [ ] Registrar ISBN, edición o título original cuando sea necesario para evitar confundir traducciones o ediciones distintas.
- [ ] Mantener los enlaces externos como complemento de la ficha del autor, no como sustituto de contenido propio.

#### Nueva guía/página SEO local

- [ ] Investigar y plantear una página propia del tipo **“Dónde leer libros sobre terapia regresiva y regresiones en Canarias”** o **“Libros de terapia regresiva en Canarias: bibliotecas y lectura online”**.
- [ ] La página debe resolver una intención real: cómo encontrar estos libros desde Canarias, qué títulos introductorios existen, qué autores aparecen en la biblioteca del sitio y cómo consultar su disponibilidad legal.
- [ ] Enlazar internamente a las fichas de autores y, desde ellas, volver a la guía de lectura cuando tenga sentido.
- [ ] Incluir un apartado específico sobre búsqueda en la red pública de bibliotecas de Canarias y posibles servicios de préstamo interbibliotecario si se verifican.
- [ ] No forzar keywords ni presentar la disponibilidad de un libro como recomendación terapéutica.
- [ ] Diferenciar claramente literatura sobre terapia regresiva, hipnosis/regresión, investigación de recuerdos espontáneos y experiencias cercanas a la muerte.
- [ ] Valorar FAQ propias para long-tail: `¿Hay libros de terapia regresiva en bibliotecas de Canarias?`, `¿Dónde leer a Brian Weiss en Canarias?`, `¿Dónde encontrar libros de Michael Newton?`, `¿Se pueden leer libros de regresión online legalmente?`.

#### Línea base de Google Search Console — 17/09/2026

Datos aportados para orientar el backlog; conservarlos como referencia y volver a comparar después de publicar contenidos específicos:

| Query | Clicks | Impressions |
|---|---:|---:|
| terapia regresiva | 0 | 32 |
| terapia de regresion | 0 | 9 |
| regresiva | 0 | 8 |
| terapia regresiva tenerife | 0 | 7 |
| que es la hipnosis regresiva | 0 | 7 |
| hipnosis regresiva que es | 0 | 7 |
| terapia regresiva canarias | 0 | 5 |
| terapia regresion canarias | 0 | 4 |
| terapia de regresion en canarias | 0 | 4 |
| terapia regresion tenerife | 0 | 4 |

#### Oportunidades de contenido derivadas de esa línea base

- [ ] Reforzar contenidos informativos que respondan de forma directa a `qué es la hipnosis regresiva` / `hipnosis regresiva qué es`, evitando crear páginas duplicadas respecto a terapia regresiva vs. regresión.
- [ ] Crear contenido local útil para `terapia regresiva Canarias`, `terapia de regresión en Canarias` y variantes, sin páginas doorway por isla o municipio.
- [ ] Usar la guía de libros/bibliotecas para ampliar cobertura semántica alrededor de `terapia regresiva Canarias` mediante contenido genuinamente local y verificable.
- [ ] Revisar Search Console tras indexación y comparar impresiones, clics, CTR y consultas nuevas respecto a esta línea base.

## Backlog posterior a producción — Instagram

Objetivo: reutilizar el contenido del sitio para construir una cuenta coherente sin convertir Instagram en una fuente editorial separada de la web.

Cadencia inicial propuesta: **2 publicaciones por semana**.

| # | Tema | Fuente del sitio | Formato sugerido | Estado |
|---|---|---|---|---|
| 1 | ¿Qué es la terapia regresiva? | `/terapia-regresiva/` | Carrusel introductorio | Pendiente |
| 2 | ¿Cómo es el estado regresivo? | `/articulos/como-es-el-estado-regresivo/` | Carrusel | Pendiente |
| 3 | ¿Voy a perder el control? | `/preguntas-frecuentes/` | Post FAQ | Pendiente |
| 4 | Terapia regresiva vs. regresión | `/articulos/terapia-regresiva-vs-regresion/` | Carrusel comparativo | Pendiente |
| 5 | Cómo comienza un proceso: entrevista inicial | `/como-trabajo/` | Carrusel breve | Pendiente |
| 6 | Un proceso con principio y final | `/como-trabajo/` | Post de posicionamiento | Pendiente |
| 7 | «No soy una gurú ni una iluminada» | `/como-trabajo/` | Post de posicionamiento / cita | Pendiente |
| 8 | ¿Tengo que creer en la reencarnación? | `/preguntas-frecuentes/` | Post FAQ | Pendiente |
| 9 | ¿Todo el mundo ve imágenes durante una regresión? | `/preguntas-frecuentes/` | Carrusel sensorial | Pendiente |
| 10 | ¿Cuánto dura una sesión? | `/preguntas-frecuentes/` | Post FAQ | Pendiente |
| 11 | ¿Cuántas sesiones suelen ser necesarias? | `/preguntas-frecuentes/` | Post FAQ | Pendiente |
| 12 | Por qué las sesiones son presenciales | `/preguntas-frecuentes/` | Carrusel | Pendiente |
| 13 | Terapia regresiva en La Laguna, Tenerife | `/contacto/` | Post local | Pendiente |
| 14 | Mi forma de acompañar una sesión | `/sobre-mi/` + `/como-trabajo/` | Carrusel personal/profesional | Pendiente |
| 15 | Qué puedes esperar de mí y qué no | `/como-trabajo/` | Carrusel | Pendiente |
| 16 | Presentación de la Biblioteca de terapia regresiva | `/biblioteca-de-terapia-regresiva/` | Post recurso | Pendiente |
| 17 | Brian Weiss | `/autores/brian-weiss/` | Autor de la semana | Pendiente |
| 18 | Michael Newton | `/autores/michael-newton/` | Autor de la semana | Pendiente |
| 19 | Helen Wambach | `/autores/helen-wambach/` | Autor de la semana | Pendiente |
| 20 | Ian Stevenson | `/autores/ian-stevenson/` | Autor de la semana | Pendiente |
| 21 | Raymond A. Moody | `/autores/raymond-a-moody/` | Autor de la semana | Pendiente |
| 22 | Roger J. Woolger | `/autores/roger-j-woolger/` | Autor de la semana | Pendiente |
| 23 | Morris Netherton | `/autores/morris-netherton/` | Autor de la semana | Pendiente |
| 24 | Edith Fiore | `/autores/edith-fiore/` | Autor de la semana | Pendiente |
| 25 | Hans TenDam | `/autores/hans-tendam/` | Autor de la semana | Pendiente |
| 26 | `Journey of Souls / El viaje de las almas` | `/autores/michael-newton/` | Libro / recurso | Pendiente |
| 27 | `Destiny of Souls / Destino de las almas` | `/autores/michael-newton/` | Libro / recurso | Pendiente |
| 28 | `Life Between Lives` | `/autores/michael-newton/` | Libro / recurso | Pendiente |
| 29 | `Twenty Cases Suggestive of Reincarnation` | `/autores/ian-stevenson/` | Libro / investigación | Pendiente |
| 30 | `Life After Life / Vida después de la vida` | `/autores/raymond-a-moody/` | Libro / ECM | Pendiente |

### Criterios editoriales de Instagram

- [ ] Priorizar contenido educativo frente a mensajes promocionales repetitivos.
- [ ] Mantener la misma voz que la web: directa, respetuosa y sin espectacularizar la regresión.
- [ ] Diferenciar investigación de recuerdos espontáneos, literatura de regresión terapéutica y experiencias cercanas a la muerte.
- [ ] No presentar como demostración científica lo que la web presenta como experiencia, interpretación o marco de trabajo.
- [ ] Preparar cada publicación para carrusel y, cuando sea posible, story.
- [ ] Crear plantilla visual común basada en la identidad violeta/crema de la web.
- [ ] Añadir fecha programada, copy final, arte aprobado y estado de publicación.

## Regla de trabajo hasta producción

**No abrir nuevas iteraciones de diseño mientras exista un P0 de Sprint 10 pendiente.**

Una vez cerradas las comprobaciones P0 y P1, congelar staging como **release candidate**, comparar con producción y realizar la promoción controlada.
