# Sprint 09: Refinamiento visual y accesibilidad editorial

Fecha: 2026-09-16.

Estado: **PENDIENTE — implementar después de Sprint 08**.

## Objetivo

Cerrar el sistema visual y de accesibilidad después de resolver estructura móvil, tipografía y jerarquía de acciones. Este sprint no debe cambiar la identidad por moda: solo refinar elementos que afecten lectura, orientación, confianza o accesibilidad.

## Alcance

### 1. Cards

Las cards deben seguir utilizándose solo cuando agrupen contenido real, no como contenedor por defecto.

Reducir su apariencia de componente comercial:

```css
.card {
  border-radius: 18px;
  box-shadow: none;
}
```

Si hace falta separación tonal, usar una sombra muy suave:

```css
box-shadow: 0 4px 16px rgba(55,34,63,.035);
```

Mantener bordes y contraste suficientes para distinguir el componente.

### 2. Imágenes como pausa editorial

Conservar el uso actual de imágenes como descansos dentro de páginas largas.

Referencia:

```css
.prose figure,
.prose .feature-media {
  margin-block: 2.5rem 3rem;
}
```

En móvil puede permitirse que determinadas imágenes sobresalgan ligeramente respecto a la columna de texto, sin provocar scroll horizontal y sin llegar a comportamiento full-screen por defecto.

Mantener relaciones de aspecto coherentes, preferentemente 3:2 o 4:3 según el material disponible.

No añadir imágenes puramente decorativas para rellenar espacios.

### 3. Créditos de imagen

El sistema de créditos debe ser discreto y accesible:

- usar Material Symbols/Material Icons como familia de iconografía coherente;
- icono visual pequeño;
- target táctil de aproximadamente 44 × 44 px como mínimo;
- contraste adaptado a la fotografía;
- información del crédito disponible mediante foco y activación, no solo hover;
- no mostrar un gran círculo blanco decorativo si el icono puede funcionar en negativo sobre la imagen;
- no ocultar autoría o licencia a usuarios de teclado o lector de pantalla.

### 4. Textos alternativos

Auditar todas las imágenes.

Reglas:

- `alt=""` solo para imágenes realmente decorativas o redundantes con el texto inmediato;
- describir imágenes informativas de forma breve y funcional;
- no rellenar `alt` con palabras clave SEO;
- no describir detalles irrelevantes;
- si una fotografía aporta contexto esencial del espacio o proceso, el `alt` debe transmitir ese contexto.

### 5. Color

Conservar la dirección actual violeta/neutros suaves salvo problema concreto.

No aclarar el texto principal para hacerlo “más suave”. Mantener contraste AA como mínimo.

Revisar:

- texto principal;
- muted text;
- enlaces;
- botones;
- focus;
- bordes importantes;
- textos sobre fondos alternos;
- controles sobre fotografías.

La paleta debe seguir evitando tanto el blanco/negro clínico como el beige de bajo contraste asociado a wellness genérico.

### 6. FAQ

Mantener `<details>/<summary>` como patrón principal.

Aumentar ligeramente aire si mejora la lectura:

```css
.faq details {
  margin: 1rem 0;
}

.faq summary {
  padding: 1.15rem 1.25rem;
  line-height: 1.45;
}
```

No añadir iconos grandes, animaciones, tabs ni carruseles.

### 7. Navegación por teclado

Auditar:

- skip link;
- header y menú móvil;
- todos los enlaces;
- botones;
- FAQ;
- créditos de imagen;
- WhatsApp;
- footer.

El orden de foco debe seguir el orden visual y semántico.

No eliminar `outline` sin sustitución visible.

### 8. Zoom y reflow

Comprobar al menos 200 % de zoom y, cuando sea posible, 400 % en viewport equivalente a escritorio.

No debe producirse pérdida de contenido ni scroll horizontal para texto normal, salvo componentes cuyo contenido lo haga inevitable y esté justificado.

### 9. `prefers-reduced-motion`

Verificar que las transiciones restantes respetan la preferencia.

No introducir movimiento decorativo nuevo.

### 10. Estructura semántica

Auditar:

- un H1 principal por página cuando corresponda;
- orden H1 → H2 → H3 sin usar niveles solo por estética;
- `main`, `nav`, `header`, `footer`, `article`, `section` cuando ayuden a la estructura;
- enlaces comprensibles fuera de contexto;
- `aria-current` en navegación;
- labels accesibles en controles cuyo texto visible no sea suficiente.

### 11. Páginas largas

Para artículos realmente extensos, valorar un pequeño bloque estático `En esta página` solo si mejora orientación.

No implementar sidebars sticky ni índices en páginas cortas.

## No hacer en este sprint

- No cambiar la identidad de marca.
- No introducir una nueva fuente por moda.
- No añadir cards, iconos o componentes para “modernizar”.
- No añadir animaciones.
- No tocar producción.

## Criterios de aceptación

- [ ] Cards menos pesadas visualmente y sin pérdida de jerarquía.
- [ ] Imágenes funcionan como pausas editoriales y no compiten con el texto.
- [ ] Todos los créditos de imagen son utilizables con teclado.
- [ ] `alt` revisado en las páginas principales y artículos.
- [ ] Contraste AA en texto e interacción.
- [ ] Foco visible en todos los controles.
- [ ] FAQ completamente operable con teclado.
- [ ] No hay pérdida de contenido a 200 % de zoom.
- [ ] No hay movimiento decorativo innecesario.
- [ ] La jerarquía de encabezados es semánticamente coherente.

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

Una web cálida, contemporánea y profesional que invite a leer despacio, comprender y detenerse sin presión comercial, manteniendo una jerarquía visual clara y una base WCAG sólida.