# TODO — Mi Terapia Regresiva

> **STAGING ONLY:** este archivo pertenece exclusivamente al repositorio `miterapiaregresiva/stg`. No debe copiarse, sincronizarse ni promocionarse a producción.

## Estado actual

Los Sprints 06–09 de **Easy Paced Reading** están implementados en staging. Tras ellos se realizó una segunda tanda de cambios transversales para materializar la interfaz estática en HTML, simplificar JavaScript y cerrar hero/footer/WhatsApp. Ese bloque se documenta ahora como **Sprint 10 — Estabilización y release candidate**.

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
- [ ] Revisar una muestra representativa de home, páginas de servicio, artículos, biblioteca, autores, libros, contacto y 404.

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
- [x] `sitemap.xml` existe con URLs de producción.
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

El sistema de fichas de autor está normalizado y debe mantenerse como recurso secundario, sin competir con las páginas de servicio.

- [x] `/autores/` comparte lenguaje visual con las fichas individuales.
- [x] Helen Wambach normalizada.
- [x] Ian Stevenson normalizado.
- [x] Raymond A. Moody normalizado.
- [x] Roger J. Woolger normalizado.
- [x] Morris Netherton normalizado.
- [x] Edith Fiore normalizada.
- [x] Hans TenDam normalizado.
- [x] Estructura común: hero, datos rápidos, contexto en biblioteca, bibliografía, fuentes y acceso a libros.
- [x] Placeholder coherente cuando no existe retrato con licencia verificada.
- [ ] Incorporar localmente el retrato reutilizable ya identificado de Raymond A. Moody.
- [ ] Revisar si existen retratos reutilizables para otras fichas sin depender de hotlinks externos.

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
| 26 | `Journey of Souls / El viaje de las almas` | `/autores/michael-newton/libros/el-viaje-de-las-almas/` | Libro / recurso | Pendiente |
| 27 | `Destiny of Souls / Destino de las almas` | `/autores/michael-newton/libros/destino-de-las-almas/` | Libro / recurso | Pendiente |
| 28 | `Life Between Lives` | `/autores/michael-newton/libros/life-between-lives/` | Libro / recurso | Pendiente |
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