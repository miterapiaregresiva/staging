# Ficha de libro — estándar v1

Plantilla canónica para todas las fichas de la biblioteca de **Mi Terapia Regresiva**. La ficha piloto aprobada es **Brian Weiss · Lazos de amor**.

## URL y navegación

URL canónica:

```text
/autores/{autor-slug}/libros/{libro-slug}/
```

No usar `<base href="/">`. En páginas servidas desde el subdominio, los recursos internos del sitio se expresan desde raíz (`/assets/...`, `/autores/...`) y las anclas de la propia ficha como `#leer-online` y `#bibliotecas-canarias`.

Breadcrumb obligatorio:

```text
Inicio → Biblioteca → Autores → Autor → Libro
```

## Estructura obligatoria

### 1. Header del sitio
Usar el header vigente, con botón de menú móvil y navegación principal completa. Una ficha de libro pertenece funcionalmente a Biblioteca; evitar marcar “Autores” como página actual solo por estar bajo esa ruta.

### 2. Hero
Orden:
1. eyebrow: `Libro de Autor`;
2. H1;
3. descripción breve específica (1–2 frases);
4. título original;
5. CTA `Leer online` → `#leer-online`;
6. CTA `Solicitar en préstamo` → `#bibliotecas-canarias`;
7. `<details class="book-edition-details">` con idioma(s), ediciones e ISBN;
8. portada canónica y crédito.

Los ISBN y demás datos bibliográficos de segundo nivel **no se muestran desplegados en la primera vista**.

En móvil: portada → título/contenido → acciones. La portada no debe dominar la pantalla.

### 3. Sobre el libro
H2: `Sobre {Título}`. Dos o tres párrafos a ancho completo. Tono descriptivo y neutral; contenido, estructura y temas de la obra, sin valoración editorial ni publicidad.

### 4. Disponibilidad
H2: `Disponibilidad de {Título} en las bibliotecas de Canarias`.

Mostrar como **metadatos discretos, no tarjetas KPI**:
- registros BICA;
- ejemplares;
- disponibles;
- ISBN;
- última comprobación.

Mantener los selectores dinámicos:
`data-book-library`, `data-value="bica_records"`, `data-value="copies"`, `data-value="available"`, `data-value="isbn_count"`, `data-updated`, `data-book-status`, `data-island-status`.

No hardcodear valores si existe fuente dinámica.

### 5. Leer online
Sección con `id="leer-online"`. El CTA del hero **hace scroll a esta sección**, nunca abre directamente una copia concreta.

Internet Archive:
- solo ejemplares concretos previamente seleccionados;
- explicar préstamo/disponibilidad;
- no búsquedas genéricas;
- fichas compactas;
- idioma visible;
- no asumir que una copia concreta estará disponible.

### 6. Préstamo gratuito en Canarias
Sección con `id="bibliotecas-canarias"`. El CTA del hero hace scroll aquí.

RED BICA se organiza:
```text
Isla → Municipio → Biblioteca → Registro RED BICA
```

Usar permalink estable. No afirmar que la ficha reserva directamente. Recomendar comprobar disponibilidad.

### 7. Compra
Tres opciones con **idéntico peso visual**:
1. TodosTusLibros — nuevo/librerías españolas;
2. IberLibro — segunda mano;
3. OSDAD — inventario solidario en Gran Canaria.

No afirmar stock sin verificación.

### 8. Otros libros del autor
Navegación editorial secundaria, nunca contenido protagonista.

Cada referencia:
- portada;
- título enlazado a ficha interna;
- título original cuando proceda;
- crédito independiente mediante icono de información.

No envolver `<details>/<summary>` dentro de `<a>`.

**Desktop:** tarjetas compactas, alineadas al inicio, sin estirar alturas; 4 columnas cuando haya espacio; portada aprox. 190 px; fondo/borde mínimos.

**Móvil:** 2 columnas; portada aprox. 145 px; ocultar metadatos secundarios si generan ruido. La ficha termina con su contenido: no conservar la altura de una tarjeta grande.

### 9. Otros libros sobre terapia regresiva
Mismo tratamiento visual secundario. Solo fichas internas publicadas y, cuando el catálogo lo permita, diversidad de autores para no duplicar “Otros libros del autor”.

### 10. Créditos de imágenes
El icono permanece sobre la imagen, pero el texto debe ser legible.

En portadas pequeñas/móvil, el panel de crédito **puede salir del frame de la portada y de la tarjeta**; no debe quedar recortado por un contenedor de 48×48 px. El panel funciona como overlay sobre el viewport, con scroll si es necesario.

Sobre fondo oscuro, texto, `strong`, `span` y enlaces deben conservar contraste alto.

### 11. Más sobre terapia de regresión
Enlaces internos a Terapia regresiva, Preguntas frecuentes, Artículos y Cómo trabajo.

### 12. Footer
Footer completo y vigente: marca, tagline, servicio/localización, navegación, recursos/legal, Instagram, WhatsApp, licencia y crédito de desarrollo.

## Datos y generación

La estructura HTML no debe duplicar decisiones editoriales libro a libro. Separar:

- **plantilla**: estructura, clases, accesibilidad y orden;
- **datos editoriales**: título, original, autoría, descripción, portada/crédito, texto “Sobre”, idiomas, ISBN, IA, compra y relaciones;
- **datos dinámicos**: disponibilidad BICA y fecha de comprobación.

Objetivo: generar `/autores/{autor}/libros/{libro}/index.html` a partir de datos estructurados, manteniendo `book-library.js` para disponibilidad dinámica.

Antes de migrar toda la biblioteca, validar el sistema con una segunda ficha de Brian Weiss.

## Metadatos

Cada ficha incluye:
- title y meta description específicos;
- Book JSON-LD;
- autoría/coautoría correcta;
- `alternateName`;
- ISBN principal;
- portada;
- BreadcrumbList.

En staging: `<meta name="robots" content="noindex,nofollow">`. No usar meta keywords.

## Coherencia

Cambios de portada, título, original, autoría, crédito o URL deben propagarse a ficha, autor, índice del autor, relacionados, JSON-LD y licencias cuando corresponda.

## Checklist

- [ ] Sin `<base href="/">`.
- [ ] Breadcrumb Inicio → Biblioteca → Autores → Autor → Libro.
- [ ] Header vigente.
- [ ] Hero ligero; ISBN dentro de “Datos de esta obra”.
- [ ] CTA Leer online hace scroll al selector IA.
- [ ] CTA préstamo hace scroll a BICA.
- [ ] Portada completa, canónica y acreditada.
- [ ] Sobre el libro: 2–3 párrafos.
- [ ] Disponibilidad dinámica y visualmente discreta.
- [ ] IA: solo copias concretas.
- [ ] BICA: isla → municipio → biblioteca.
- [ ] Compra: tres opciones homogéneas.
- [ ] Relacionados compactos en desktop y móvil.
- [ ] Créditos legibles y no recortados.
- [ ] Footer completo.
- [ ] JSON-LD coherente.
- [ ] Revisión móvil/escritorio.
