# Sprint 07: Sistema editorial de lectura

Fecha: 2026-09-16.

Estado: **IMPLEMENTADO EN STG — PENDIENTE VALIDACIÓN VISUAL FINAL**.

## Objetivo

Establecer un sistema tipográfico y de espaciado global orientado a lectura pausada. La home no debe ser más legible que las páginas donde realmente se lee: terapia regresiva, cómo trabajo, artículos, autores y FAQ deben compartir una base coherente.

Principio rector: **easy paced reading**.

## Implementación realizada

### 1. Cuerpo de texto global

Aplicado en `assets/styles.css`:

```css
body {
  font-size: 1.125rem;
  line-height: 1.75;
}

@media (max-width: 700px) {
  body {
    font-size: 1.0625rem;
    line-height: 1.75;
  }
}
```

Los componentes pequeños que ya tenían tamaños propios —breadcrumbs, metadatos, tags, footer, smallprint y elementos de interfaz— conservan escalas específicas para evitar que la nueva base editorial los sobredimensione.

### 2. Ancho máximo de lectura

`--measure` pasa de `74ch` a `64ch`:

```css
:root {
  --measure: 64ch;
}
```

La home deja de mantener una excepción de anchura ilimitada en el bloque presencial: `home-readability.css` limita ahora ese contenido mediante `var(--measure)`.

### 3. Lead

Aplicado:

```css
.lead {
  font-size: clamp(1.2rem, 1.6vw, 1.4rem);
  line-height: 1.6;
  max-width: 56ch;
}
```

El lead queda diferenciado del cuerpo sin convertirse en un segundo titular.

### 4. H1, H2 y H3

El H1 reduce su máximo y gana un interlineado menos agresivo:

```css
.hero h1 {
  font-size: clamp(2.35rem, 4.5vw, 4.25rem);
  line-height: 1.08;
}
```

En móvil se limita a un rango aproximado de `37.6–44px` para evitar titulares excesivamente altos.

Los H2 editoriales pasan a una escala aproximada de `29–40px`. Los H3 de `.prose` se sitúan aproximadamente entre `22–27px`.

### 5. Ritmo de párrafos

Aplicado:

```css
.prose p {
  margin: 0 0 1.35em;
}
```

No se introducen cards nuevas ni se fragmenta artificialmente el contenido.

### 6. Ritmo entre secciones editoriales

Aplicado:

```css
.prose h2 {
  margin-top: clamp(3.5rem, 7vw, 5rem);
  margin-bottom: 1.25rem;
}

.prose h3 {
  margin-top: 2.75rem;
  margin-bottom: .9rem;
}
```

El objetivo es que los encabezados funcionen como pausas cognitivas y no solo como cambios de tamaño.

### 7. Márgenes móviles

Se consolida el margen de lectura móvil del Sprint 06:

```css
@media (max-width: 700px) {
  .wrap {
    width: min(100% - 2.5rem, var(--max));
  }
}
```

Equivale aproximadamente a 20 px por lado.

### 8. Unificación de legibilidad

`assets/home-readability.css` deja de redefinir el tamaño del cuerpo y de los párrafos de portada. Las decisiones de legibilidad pasan a ser globales.

El archivo conserva únicamente la excepción compositiva necesaria para el bloque `.home-presential` y el tamaño estable de sus acciones.

### 9. Ajuste final de Sprint 06

Antes de iniciar este sprint se cerró el último detalle solicitado del Sprint 06: el menú móvil desplegado mantiene el control `Menú` a la derecha y alinea también los enlaces desplegados a la derecha, conservando el área táctil completa de cada fila.

## Fuera de alcance y preservado

- No se han introducido nuevas fuentes web.
- Se mantiene el stack de sistema actual.
- Georgia continúa limitada a usos editoriales.
- No se ha cambiado la paleta global.
- No se ha cambiado todavía la jerarquía CTA / enlaces editoriales: Sprint 08.
- No se ha modificado todavía WhatsApp: Sprint 08.
- No se han refinado todavía radios, sombras o tratamiento general de imágenes: Sprint 09.
- Producción no se ha tocado.

## Criterios de aceptación

### Verificados en código

- [x] `--measure` global reducido a `64ch`.
- [x] Cuerpo global a 18 px escritorio y 17 px móvil.
- [x] Interlineado global a `1.75`.
- [x] Lead limitado a `56ch` y con interlineado `1.6`.
- [x] H1 máximo reducido y escala móvil contenida.
- [x] H2/H3 editoriales utilizan tamaño y espacio para establecer jerarquía.
- [x] `.prose p` incorpora separación vertical consistente.
- [x] `.prose h2` y `.prose h3` incorporan pausas verticales mayores.
- [x] Home deja de tener una base tipográfica distinta de las páginas internas.
- [x] Breadcrumbs, metadatos, tags, footer y smallprint conservan tamaños específicos.
- [x] Márgenes móviles de lectura consolidados en aproximadamente 20 px.
- [x] Los cambios están limitados a `miterapiaregresiva/stg`.

### Pendientes de validación visual en navegador

- [ ] Revisar `/` en móvil y escritorio.
- [ ] Revisar `/terapia-regresiva/`.
- [ ] Revisar `/como-trabajo/`.
- [ ] Revisar `/preguntas-frecuentes/`.
- [ ] Revisar `/articulos/` y varios artículos largos.
- [ ] Revisar `/sobre-mi/`.
- [ ] Revisar páginas de autor y biblioteca.
- [ ] Confirmar ausencia de scroll horizontal a zoom 200 %.
- [ ] Confirmar que H1/H2/H3 no producen saltos de línea incómodos en 360, 390 y 430 px.
- [ ] Confirmar que cards y FAQ no se perciben sobredimensionadas con la nueva base.

## Archivos modificados

- `assets/styles.css`
- `assets/home-readability.css`
- `SPRINT-07.md`

## Resultado esperado

Leer una página larga debe sentirse más parecido a leer un buen texto editorial digital que a recorrer una landing de servicios.

Una vez validado visualmente este sprint, el siguiente bloque es **Sprint 08 — Jerarquía de acciones y reducción de ruido**.