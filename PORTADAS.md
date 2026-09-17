# Portadas de libros — inventario y fuentes

Fecha: 2026-09-17

## Criterio de uso

Para portadas que todavía no están almacenadas localmente, usar como primera opción **Open Library Covers API** cuando exista una edición identificada y con portada disponible.

Open Library indica expresamente que su Covers API puede utilizarse para mostrar portadas en páginas públicas y recomienda enlazar de cortesía a la ficha del libro. Preferir identificadores `OLID` frente a ISBN para evitar límites innecesarios.

Patrón recomendado:

```html
<a href="https://openlibrary.org/books/OLXXXXXXXXM/" target="_blank" rel="noopener noreferrer" aria-label="Ver ficha del libro en Open Library">
  <img src="https://covers.openlibrary.org/b/olid/OLXXXXXXXXM-L.jpg?default=false" alt="Portada de Título" loading="lazy">
</a>
```

Cuando ya exista una portada local procedente de Internet Archive, mantener la copia local actual y no sustituirla solo por homogeneidad.

No utilizar portadas de Amazon, Google Images, editoriales o librerías como fuente de imagen salvo que exista permiso o una política explícita de reutilización.

## Portadas ya locales

### Brian Weiss

- [x] `Muchas vidas, muchos maestros`
- [x] `A través del tiempo`
- [x] `Los milagros existen`
- [x] `Los mensajes de los sabios`
- [x] `Muchos cuerpos, una misma alma` — disponible como asset aunque actualmente no aparece entre las obras seleccionadas de la ficha.
- [ ] `Lazos de amor` — Open Library: `OL9721449M`; Internet Archive: `lazosdeamor0000bria`.
- [ ] `Eliminar el estrés` — localizar edición con portada utilizable; la ficha ya enlaza a Internet Archive.

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

- [ ] Añadir `https://covers.openlibrary.org` a `img-src` de la CSP únicamente en las páginas que utilicen portadas remotas de Open Library, o decidir una normalización global antes del corte a producción.
- [ ] Enlazar cada portada remota a la ficha correspondiente de Open Library como atribución/cortesía.
- [ ] Mantener proporción visual 2:3 con `object-fit: contain`.
- [ ] Usar `?default=false` para evitar que una portada inexistente devuelva la imagen vacía genérica.
- [ ] Comprobar visualmente todas las portadas en móvil y escritorio.
- [ ] Si una portada remota se convierte más adelante en asset local, conservar la URL de procedencia en la documentación/licencias.
