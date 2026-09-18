# Estructura editorial de una ficha de libro

Documento de referencia para mantener coherencia entre todas las fichas de la biblioteca de **Mi Terapia Regresiva**.

## URL canónica

Patrón:

```text
/autores/{autor-slug}/libros/{libro-slug}/
```

La página del autor y cualquier bloque de libros relacionados deben enlazar siempre a esta ficha interna. Los enlaces a Internet Archive, RED BICA o tiendas solo aparecen dentro de la ficha del libro.

---

## Orden obligatorio de la ficha

### 1. Breadcrumbs

Orden:

```text
Inicio → Biblioteca → Autores → Autor → Libro
```

### 2. Cabecera del libro

Debe contener, en este orden:

1. eyebrow: `Libro de Nombre del autor`;
2. H1 con el título de la edición en español;
3. descripción breve, de una o dos frases;
4. título original;
5. idioma(s);
6. ISBN localizados;
7. portada canónica.

Ejemplo:

```html
<div class="eyebrow">Libro de Brian Weiss</div>
<h1>Lazos de amor</h1>
<p class="lead">Descripción breve y específica de la obra.</p>
<p class="book-original-title">
  <strong>Título original:</strong> <em>Only Love Is Real</em>.
</p>
<div class="book-language">
  <strong>Idiomas:</strong> <span class="tag">ES</span>
</div>
<ul class="book-editions-inline" aria-label="ISBN localizados">
  ...
</ul>
```

Si existe coautoría, debe figurar en la cabecera, metadatos y JSON-LD. No atribuir una obra exclusivamente al autor principal si la edición acredita a más autores.

### 3. Portada

Usar una única portada canónica por obra en todo el sitio.

Prioridad de archivo:

1. `cover.webp`;
2. `cover.png`;
3. `cover.jpg` / `cover.jpeg`;
4. dummy común con el texto **Portada**.

Estructura objetivo:

```text
assets/images/books/
  _shared/
    cover.webp
  {autor-slug}/
    {libro-slug}/
      cover.webp
```

La imagen debe mostrarse completa, con `object-fit: contain`, sin recortes que eliminen título, autor o elementos esenciales de la cubierta.

El crédito se abre mediante el icono de información. La procedencia se documenta también en `/licencias-de-recursos/`.

### 4. Sobre {LIBRO}

H2:

```text
Sobre Título del libro
```

Contenido ideal: **2 o 3 párrafos a ancho completo**.

Criterios:

- resumir únicamente el contenido, la estructura y los temas que aparecen en la obra;
- usar un tono descriptivo y neutral;
- no añadir valoraciones, juicios, refutaciones, defensas ni conclusiones propias sobre la obra;
- cuando el libro atribuya una experiencia, idea o explicación a una persona concreta, describir esa atribución sin convertirla en una afirmación editorial del sitio;
- no convertir el texto en publicidad editorial;
- evitar repetir literalmente la descripción breve de la cabecera.

### 5. Disponibilidad

H2:

```text
Disponibilidad de Título en las bibliotecas de Canarias
```

Mostrar:

- registros BICA;
- ejemplares localizados;
- ejemplares disponibles;
- ISBN localizados;
- fecha de última comprobación.

Estos valores proceden de los datos de disponibilidad y no deben hardcodearse cuando exista una fuente dinámica.

### 6. Leer online

H2:

```text
Leer Título online gratis
```

Reglas para Internet Archive:

- enlazar únicamente **ejemplares concretos** previamente seleccionados;
- no añadir enlaces a búsquedas de Internet Archive;
- no inferir nuevas ediciones automáticamente;
- identificar el idioma de cada ejemplar;
- explicar que Internet Archive funciona como biblioteca digital;
- algunos ejemplares requieren cuenta gratuita y préstamo temporal;
- una copia puede no estar disponible si está prestada a otra persona.

Cada enlace debe indicar claramente que abre un ejemplar concreto en Internet Archive.

Mostrar el logotipo de Internet Archive como identificación visual del servicio, sin sustituir el texto accesible de la sección.

Los ejemplares de Internet Archive deben mostrarse como **fichas compactas**, no como filas a ancho completo:

- ancho aproximado de tarjeta: 180–220 px en escritorio;
- distribución en rejilla y alineación al inicio;
- cada ficha identifica un ejemplar concreto, su idioma y el enlace de lectura/préstamo;
- en móvil pueden pasar a una sola columna, manteniendo un ancho contenido y sin ocupar innecesariamente toda la página.

Si solo existe un ejemplar en otro idioma, indicarlo de forma explícita. Ejemplo: `Mirrors of Time` disponible en inglés cuando no haya copia en español en la selección.

### 7. Préstamo gratuito en Canarias

H2:

```text
Dónde conseguir un préstamo gratuito de Título de Autor en Canarias
```

Estructura del acordeón:

```text
Isla
  └─ Municipio
       └─ Biblioteca / sucursal
            └─ Registro(s) RED BICA
```

Reglas:

- utilizar el permalink estable de la ficha bibliográfica de RED BICA;
- no afirmar que un enlace reserva directamente si solo abre la ficha;
- recomendar comprobar disponibilidad antes de desplazarse;
- mantener la fecha de actualización;
- no inventar teléfonos, horarios, direcciones ni contactos;
- mostrar el logotipo de RED BICA como identificación visual del catálogo.

### 8. Compra

H2:

```text
Si prefieres comprar Título de Autor
```

Mantener el mismo esquema:

1. **TodosTusLibros** — ejemplar nuevo / librerías españolas;
2. **IberLibro** — segunda mano;
3. **OSDAD** — inventario solidario en Gran Canaria.

Las tarjetas de IberLibro y OSDAD deben mostrar sus logotipos junto al nombre y la explicación del servicio.

No afirmar que una tienda o inventario dispone actualmente del título salvo verificación expresa.

No añadir Wallapop u otros buscadores que no formen parte del esquema editorial acordado.

### 9. Otros libros del autor

H2:

```text
Otros libros de Autor
```

Usar fichas visuales de libro, no listas de enlaces simples.

Cada tarjeta debe incluir:

1. portada;
2. nombre del libro enlazado a su ficha interna;
3. título original;
4. crédito de portada mediante icono de información.

El icono de información debe quedar fuera de cualquier enlace que envuelva la tarjeta o la portada. No anidar `<details>/<summary>` dentro de un `<a>`: el título puede enlazar a la ficha y el control de crédito debe permanecer como elemento interactivo independiente.

Nunca enlazar desde estas tarjetas directamente a Internet Archive.

### 10. Otros libros sobre terapia regresiva

H2:

```text
Otros libros sobre terapia regresiva
```

Mostrar una selección de libros que ya tengan ficha interna publicada.

Preferir diversidad de autores cuando existan suficientes fichas. No crear enlaces rotos ni fichas ficticias.

### 11. Más sobre terapia de regresión

Mantener enlaces internos al sitio, por ejemplo:

- Qué es la terapia regresiva;
- Preguntas frecuentes;
- Artículos;
- Cómo trabajo.

Esta sección conecta la biblioteca con el contenido principal del sitio sin convertir la ficha en una página comercial.

### 12. Footer

Todas las fichas deben usar el footer completo y vigente del sitio:

- marca;
- tagline;
- servicio y localización;
- navegación principal;
- recursos y legal;
- Instagram;
- WhatsApp;
- licencia del código;
- crédito de desarrollo.

---

## Metadatos y datos estructurados

Cada ficha debe incluir:

- `<title>` específico;
- meta description específica;
- `Book` JSON-LD;
- autor o autores correctos;
- título original mediante `alternateName`;
- ISBN principal;
- imagen de portada;
- `BreadcrumbList`.

En staging se mantiene:

```html
<meta name="robots" content="noindex,nofollow">
```

No usar `meta keywords`.

---

## Regla de coherencia

Cuando cambie cualquiera de estos elementos:

- portada;
- título;
- título original;
- autoría;
- procedencia de imagen;
- URL de ficha;

el cambio debe propagarse a:

1. ficha individual;
2. página del autor;
3. índice de libros del autor;
4. bloques de libros relacionados;
5. JSON-LD;
6. página de licencias, cuando corresponda.

Una obra debe tener **una sola identidad visual y editorial** dentro del sitio.

---

## Checklist antes de publicar una ficha

- [ ] URL canónica correcta.
- [ ] H1 y título original correctos.
- [ ] Autoría y coautoría correctas.
- [ ] Descripción breve específica.
- [ ] Idioma(s) indicados.
- [ ] ISBN revisados.
- [ ] Portada canónica y sin recortes.
- [ ] Crédito de portada visible y procedencia registrada.
- [ ] «Sobre el libro» con 2–3 párrafos.
- [ ] Disponibilidad RED BICA funcionando.
- [ ] Internet Archive solo con ejemplares concretos.
- [ ] Sin enlaces de búsqueda de Internet Archive.
- [ ] Préstamo en Canarias agrupado por isla → municipio → biblioteca.
- [ ] Compra con el esquema común.
- [ ] Otros libros del autor enlazan a fichas internas.
- [ ] Otros libros sobre terapia regresiva enlazan a fichas existentes.
- [ ] Enlaces internos del sitio presentes.
- [ ] Footer completo.
- [ ] JSON-LD coherente con lo visible.
- [ ] Revisión visual en móvil y escritorio.
