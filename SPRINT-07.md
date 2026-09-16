# Sprint 07: Sistema editorial de lectura

Fecha: 2026-09-16.

Estado: **PENDIENTE — implementar después de Sprint 06**.

## Objetivo

Establecer un sistema tipográfico y de espaciado global orientado a lectura pausada. La home no debe ser más legible que las páginas donde realmente se lee: terapia regresiva, cómo trabajo, artículos, autores y FAQ deben compartir una base coherente.

Principio rector: **easy paced reading**.

## Alcance

### 1. Cuerpo de texto global

Partir de esta referencia:

```css
body {
  font-size: 1.125rem; /* 18 px */
  line-height: 1.75;
}

@media (max-width: 700px) {
  body {
    font-size: 1.0625rem; /* 17 px */
    line-height: 1.75;
  }
}
```

No aplicar mecánicamente si genera regresiones en componentes pequeños: separar tipografía editorial de metadatos, breadcrumbs, etiquetas o smallprint cuando corresponda.

### 2. Ancho máximo de lectura

Reducir `--measure` desde 74ch a un rango objetivo de 62–64ch.

Referencia:

```css
:root {
  --measure: 64ch;
}
```

Para bloques especialmente reflexivos o densos puede utilizarse un ancho menor cercano a 58ch, siempre que no fragmente en exceso la página.

### 3. Lead

Ajustar el texto introductorio para que sea claramente distinguible sin funcionar como un segundo titular gigante.

Referencia:

```css
.lead {
  font-size: clamp(1.2rem, 1.6vw, 1.4rem);
  line-height: 1.6;
  max-width: 56ch;
}
```

### 4. H1, H2 y H3

Reducir el máximo del H1 y usar el espacio vertical, no solo el tamaño, para establecer jerarquía.

Referencia orientativa:

```css
.hero h1 {
  font-size: clamp(2.35rem, 4.5vw, 4.25rem);
  line-height: 1.08;
}
```

Escala de referencia:

- cuerpo: 18 px escritorio / 17 px móvil;
- lead: 20–22 px;
- H1: 38–68 px según viewport;
- H2: 29–40 px;
- H3: 22–27 px.

En móvil evitar H1 que produzcan bloques excesivamente altos o palabras aisladas por una mala longitud de línea.

### 5. Ritmo de párrafos

Referencia:

```css
.prose p {
  margin: 0 0 1.35em;
}
```

Evitar paredes de texto, pero no convertir cada idea en una card.

### 6. Ritmo entre secciones

Aumentar la separación de los encabezados editoriales para que funcionen como pausas cognitivas.

Referencia:

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

No aplicar el mismo margen al primer H2 si el contexto visual exige una transición más corta.

### 7. Márgenes móviles

Revisar `.wrap` para favorecer 20–24 px laterales en lectura móvil.

Referencia:

```css
@media (max-width: 700px) {
  .wrap {
    width: min(100% - 2.5rem, var(--max));
  }
}
```

### 8. Unificar reglas de legibilidad

Revisar `home-readability.css` y cualquier excepción específica de portada.

Objetivo:

- convertir en reglas globales lo que realmente sea una decisión de lectura general;
- conservar excepciones de home solo cuando respondan a su composición específica;
- reducir duplicación y cascadas difíciles de mantener.

## Aplicación mínima

Revisar al menos:

- `/`;
- `/terapia-regresiva/`;
- `/como-trabajo/`;
- `/preguntas-frecuentes/`;
- `/articulos/` y varios artículos largos;
- `/sobre-mi/`;
- páginas de autor y biblioteca para comprobar que la nueva base no perjudica contenidos secundarios.

## No hacer en este sprint

- No introducir nuevas fuentes web solo por estética.
- Mantener el stack de sistema actual salvo evidencia clara de que perjudica la lectura.
- Mantener Georgia como recurso editorial limitado; no convertir toda la interfaz a serif.
- No cambiar la paleta global salvo ajustes imprescindibles de contraste.
- No convertir contenido en cards.
- No tocar producción.

## Criterios de aceptación

- [ ] Las páginas editoriales principales tienen un ancho de lectura aproximado de 62–64ch.
- [ ] El cuerpo de texto resulta claramente cómodo en escritorio y móvil sin depender de zoom manual.
- [ ] Home y páginas internas comparten la misma lógica tipográfica.
- [ ] H1/H2/H3 se distinguen por tamaño, peso y espacio, no por tamaños desproporcionados.
- [ ] No hay párrafos visualmente apelmazados.
- [ ] Los H2 funcionan como pausas naturales entre ideas.
- [ ] A 200 % de zoom no aparece scroll horizontal en layouts normales.
- [ ] No se deterioran breadcrumbs, footer, tags, cards ni metadatos por herencia tipográfica.

## Resultado esperado

Leer una página larga debe sentirse más parecido a leer un buen texto editorial digital que a recorrer una landing de servicios.