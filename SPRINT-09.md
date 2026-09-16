# Sprint 09: Refinamiento visual y accesibilidad editorial

Fecha: 2026-09-16.

Estado: **IMPLEMENTADO EN STG — PENDIENTE VALIDACIÓN VISUAL FINAL**.

## Objetivo

Cerrar el sistema visual y de accesibilidad después de resolver estructura móvil, tipografía y jerarquía de acciones. Este sprint no cambia la identidad: refina elementos que afectan lectura, orientación, confianza y accesibilidad.

## Implementación realizada

### 1. Cards

Se reduce su apariencia de componente comercial mediante `assets/editorial-refinement.css`:

- radio de 18 px;
- sombra muy suave;
- bordes conservados;
- cabeceras de imagen ajustadas al nuevo radio.

### 2. Imágenes como pausa editorial

Se añade un ritmo común para figuras y medios dentro de `.prose`:

- `margin-block: 2.5rem 3rem`;
- radios de 20 px en medios principales;
- sombra más discreta;
- en móvil pueden sobresalir 0,5 rem respecto a la columna sin convertirse en full bleed ni provocar scroll horizontal.

No se han añadido imágenes decorativas nuevas.

### 3. Créditos de imagen

Se mantiene el patrón nativo `details/summary`, válido con teclado, touch y sin JavaScript.

Cambios:

- target del control aumentado a 48 × 48 px;
- icono Material `info` de 24 px en negativo sobre la propia imagen;
- sin círculo blanco decorativo;
- foco visible;
- panel de crédito accesible por activación y teclado;
- retirada la microanimación de escala del icono;
- se conserva cierre con Escape y restauración de foco mediante `site.js`.

### 4. Textos alternativos

Se revisó el criterio de uso en las páginas principales inspeccionadas.

Regla aplicada:

- se mantiene `alt=""` cuando la imagen es atmosférica/decorativa o redundante con el contenido inmediato;
- símbolos de marca dentro de enlaces con nombre accesible permanecen con `alt=""` para evitar duplicidad;
- no se han inventado descripciones ni añadido palabras clave SEO artificiales.

Pendiente para futuras incorporaciones: cualquier imagen nueva con función informativa debe recibir un `alt` breve y funcional desde origen.

### 5. Color y contraste

Se conserva la paleta actual. No se aclaran textos ni enlaces para buscar una apariencia más “soft”.

La base sigue utilizando:

- texto `#241f25`;
- muted `#625963`;
- accent `#6b3f78`;
- accent strong `#4d2958`;
- foco `#9a5caf`.

No se han introducido cambios que reduzcan el contraste existente.

### 6. FAQ

Se mantiene `details/summary`.

Refinamiento aplicado:

- `margin: 1rem 0`;
- `summary` con `padding: 1.15rem 1.25rem`;
- `line-height: 1.45`;
- área de contenido ligeramente más respirada.

No se añaden tabs, carruseles ni iconos decorativos.

### 7. Navegación por teclado y targets

Se refuerzan targets mínimos:

- botones: 48 px;
- enlaces de footer: 44 px en escritorio y 48 px en móvil;
- créditos de imagen: 48 px;
- FAQ: mínimo 48 px ya existente;
- foco visible global preservado.

El menú móvil mantiene el comportamiento accesible implementado en Sprint 06.

### 8. Zoom y reflow

La CSS evita nuevas anchuras rígidas y conserva márgenes fluidos. El pequeño bleed móvil de figuras está limitado a 0,5 rem dentro de un layout con 20 px de margen, por lo que no debería generar scroll horizontal.

La comprobación real a 200 % y 400 % queda pendiente de navegador.

### 9. Movimiento reducido

No se introduce movimiento decorativo nuevo.

Se conserva `prefers-reduced-motion` y se elimina la transición del icono de créditos.

### 10. Estructura semántica

No se ha alterado la estructura de encabezados ni landmarks existentes. Las páginas revisadas mantienen `header`, `nav`, `main`, `footer` y un H1 principal cuando corresponde.

No se ha añadido un índice `En esta página` de forma automática: solo deberá incorporarse en artículos realmente extensos cuando aporte orientación real.

## Archivos modificados

- `assets/editorial-refinement.css` — nuevo.
- `assets/brand-lockup.css` — carga global de la hoja de refinamiento.
- `assets/image-credits.css` — accesibilidad y eliminación de microanimación.
- `SPRINT-09.md`.

## Criterios de aceptación

### Verificados en código

- [x] Cards menos pesadas visualmente y sin pérdida de jerarquía.
- [x] Imágenes configuradas como pausas editoriales.
- [x] Créditos utilizables mediante `details/summary` y foco visible.
- [x] Target de créditos de 48 × 48 px.
- [x] No se han añadido descripciones `alt` inventadas ni SEO stuffing.
- [x] Foco visible preservado en controles.
- [x] FAQ mantiene patrón nativo operable con teclado.
- [x] No se ha introducido movimiento decorativo nuevo.
- [x] Producción no se ha modificado.

### Pendientes de validación visual/manual

- [ ] Confirmar contraste real de controles sobre fotografías claras y oscuras.
- [ ] Revisar reflow a 200 % y 400 %.
- [ ] Comprobar móvil 360, 390 y 430 px.
- [ ] Comprobar tablet y escritorio.
- [ ] Recorrer todo el sitio solo con teclado.
- [ ] Revisar una muestra amplia de artículos y fichas de autor para confirmar `alt` y jerarquía de encabezados.
- [ ] Repetir Lighthouse/axe como apoyo tras despliegue.

## Validación final del bloque Easy Paced Reading

Tras completar Sprints 06–09, revisar conjuntamente:

- `/`;
- `/terapia-regresiva/`;
- `/como-trabajo/`;
- `/preguntas-frecuentes/`;
- `/sobre-mi/`;
- `/contacto/`;
- índice y muestra de artículos;
- biblioteca y autores;
- footer;
- móvil 360–430 px;
- tablet;
- escritorio;
- teclado;
- zoom;
- lector de pantalla cuando sea posible;
- Lighthouse/axe como apoyo, sin sustituir revisión manual.

## Resultado esperado

Una web cálida, contemporánea y profesional que invite a leer despacio, comprender y detenerse sin presión comercial, manteniendo jerarquía visual clara y una base WCAG sólida.