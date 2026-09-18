# Portadas de libros — inventario y fuentes

Fecha: 2026-09-17

## Criterio de uso

La biblioteca utiliza una única portada canónica por ficha y esa misma portada debe repetirse en la página del autor, el índice de libros y todos los bloques de libros relacionados.

Prioridad técnica para resolver una portada:

1. `cover.webp`
2. `cover.png`
3. `cover.jpg` o `cover.jpeg`
4. dummy común `Portada`

Objetivo de estructura:

```text
assets/images/books/
  _shared/
    cover.webp
  {autor-slug}/
    {libro-slug}/
      cover.webp
```

Mientras una portada todavía no esté materializada como asset local, staging puede utilizar temporalmente una fuente remota seleccionada y documentada. La procedencia debe mantenerse en `licencias-de-recursos/` y en el icono de información de la propia imagen.

No mezclar ediciones distintas de una misma obra entre fichas y tarjetas: una obra tiene una portada visual canónica hasta que se decida sustituirla en todo el sitio.

### Brian Weiss

Para las nueve fichas actuales se ha fijado como fuente visual coherente **Penguin Libros**. Las cubiertas seleccionadas son las mismas en:

- ficha de autor;
- índice de libros;
- ficha individual;
- bloques «Otros libros de Brian Weiss»;
- bloques de libros relacionados.

La fuente visual no implica que la cubierta tenga licencia abierta. Los derechos sobre ilustración, diseño editorial, marcas y logotipos siguen perteneciendo a sus titulares.

Para otros autores, si no existe asset local ni fuente editorial seleccionada, Open Library/Internet Archive puede utilizarse como fuente de apoyo siempre que la edición y la procedencia queden identificadas.

## Inventario actual

### Brian Weiss

Portadas canónicas definidas en staging con fuente visual Penguin Libros. Pendiente materializarlas como assets locales siguiendo la estructura `assets/images/books/brian-weiss/{libro-slug}/cover.webp`.

- [ ] `Muchas vidas, muchos maestros`
- [ ] `A través del tiempo`
- [ ] `Lazos de amor`
- [ ] `Los mensajes de los sabios`
- [ ] `Muchos cuerpos, una misma alma`
- [ ] `Eliminar el estrés`
- [ ] `Meditación`
- [ ] `Espejos del tiempo`
- [ ] `Los milagros existen`

### Helen Wambach

- [x] `Vida antes de la vida`

### Ian Stevenson

- [x] `Twenty Cases Suggestive of Reincarnation`
- [x] `Children Who Remember Previous Lives`
- [x] `Where Reincarnation and Biology Intersect`
- [x] `Cases of the Reincarnation Type`

### Raymond A. Moody

- [x] `Life After Life / Vida después de la vida` — portada local de una edición francesa.

## Portadas localizadas en Open Library para incorporar

### Michael Newton

- [ ] `El viaje de las almas / Journey of Souls`
  - Edición original: Open Library `OL1091451M`.
  - Edición con portada visible localizada: `OL22945464M`.
  - Internet Archive: `journeysoulscase00newt`.
- [ ] `Destino de las almas / Destiny of Souls`
  - Open Library: `OL6781149M`.
  - Internet Archive: `destinysoulsnewc00newt`.
- [ ] `Life Between Lives: Hypnotherapy for Spiritual Regression`
  - Open Library: `OL7911356M`.
  - ISBN 13: `9780738704654`.
  - Registro de Internet Archive asociado en Open Library.

### Roger J. Woolger

- [ ] `Other Lives, Other Selves`
  - Open Library: `OL7825864M`.
  - Internet Archive: `otherlivesothers0000wool`.
- [ ] `Healing Your Past Lives: Exploring the Many Lives of the Soul`
  - Obra localizada en Open Library; pendiente fijar el OLID de la edición con mejor portada antes de implementarla.

### Edith Fiore

- [ ] `You Have Been Here Before`
  - Open Library: `OL4550997M` — edición de 1978 con portada visible.
  - Alternativa con Internet Archive: `OL9657705M`, item `youhavebeenhereb00fior`.
- [ ] `The Unquiet Dead`
  - Open Library: `OL2734766M` — edición de 1987 con portada visible.
  - Alternativa con Internet Archive: `OL9875740M`, item `unquietdead00edit`.

### Jim B. Tucker

- [ ] `Life Before Life`
  - Open Library: `OL37353868M` — portada visible.
  - Alternativa: `OL9474722M` / `OL34592554M`.
  - Internet Archive asociado a la edición `OL34592554M`: `lifebeforelifesc0000tuck`.
- [ ] `Return to Life`
  - Obra localizada en Open Library; pendiente fijar OLID de una edición con portada.
- [ ] `Before: Children's Memories of Previous Lives`
  - Obra localizada en Open Library; pendiente fijar OLID de una edición con portada.

## Portadas pendientes de búsqueda específica

### Morris Netherton

- [ ] `Past Lives Therapy` — buscar edición con portada verificable en Open Library/Internet Archive.

### Hans TenDam

- [ ] `Exploring Reincarnation` — buscar edición con portada verificable.
- [ ] `Deep Healing and Transformation` — buscar edición con portada verificable.

### Winafred Blake Lucas

- [ ] Revisar la bibliografía seleccionada de la ficha y localizar sus portadas en Open Library/Internet Archive.

### Joel L. Whitton

- [ ] Revisar la bibliografía seleccionada de la ficha y localizar sus portadas en Open Library/Internet Archive.

### Erlendur Haraldsson

- [ ] Revisar la bibliografía seleccionada de la ficha y localizar sus portadas en Open Library/Internet Archive.

## Implementación

- [ ] Materializar las nueve portadas canónicas de Brian Weiss como WebP locales manteniendo Penguin Libros como procedencia documentada.

- [ ] Añadir `https://covers.openlibrary.org` a `img-src` de la CSP únicamente en las páginas que utilicen portadas remotas de Open Library, o decidir una normalización global antes del corte a producción.
- [ ] Enlazar cada portada remota a la ficha correspondiente de Open Library como atribución/cortesía.
- [ ] Mantener proporción visual 2:3 con `object-fit: contain`.
- [ ] Usar `?default=false` para evitar que una portada inexistente devuelva la imagen vacía genérica.
- [ ] Comprobar visualmente todas las portadas en móvil y escritorio.
- [ ] Si una portada remota se convierte más adelante en asset local, conservar la URL de procedencia en la documentación/licencias.
