# Generación de fichas de libro

Diseño técnico para convertir la ficha aprobada de `Lazos de amor` en un sistema reproducible.

## Principio

No generar disponibilidad dentro del HTML. El generador construye el contenido editorial y deja los atributos `data-*` que consume `assets/book-library.js`.

## Fuente editorial propuesta

Cada obra tendrá un JSON editorial independiente de los datos BICA:

```text
data/book-pages/{autor-slug}/{libro-slug}.json
```

Campos mínimos:

```json
{
  "title": "",
  "slug": "",
  "original_title": "",
  "authors": [{"name": "", "slug": ""}],
  "lead": "",
  "about": ["", ""],
  "languages": ["es"],
  "primary_isbn": "",
  "cover": {
    "src": "",
    "alt": "",
    "credit_html": ""
  },
  "archive_copies": [
    {"label": "", "language": "es", "url": ""}
  ],
  "purchase": {
    "todostuslibros": "",
    "iberlibro": "",
    "osdad": ""
  },
  "related_author_books": [],
  "related_regression_books": []
}
```

Los ISBN/ediciones y métricas pueden derivarse de `data/books/{libro-slug}.json` cuando ya existan allí.

## Generador propuesto

```text
scripts/generate-book-pages.mjs
templates/book-detail.html
```

Responsabilidades:
1. validar campos obligatorios;
2. combinar JSON editorial + catálogo/disponibilidad;
3. generar JSON-LD y breadcrumbs;
4. renderizar hero, detalles, IA, compra y relacionados;
5. conservar los hooks dinámicos BICA;
6. escribir la URL canónica;
7. fallar si una relación interna apunta a una ficha inexistente;
8. no inventar portada, crédito, ISBN, copia IA ni tienda.

## Migración

1. Lazos de amor = referencia visual v1.
2. Crear datos editoriales de una segunda obra de Brian Weiss.
3. Generarla y comparar visualmente con la referencia.
4. Ajustar plantilla/generador.
5. Migrar el resto de Brian Weiss.
6. Migrar autores restantes.
7. Solo entonces retirar HTML manual redundante.

No ejecutar una migración masiva antes del paso 3.
