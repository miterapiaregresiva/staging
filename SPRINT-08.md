# Sprint 08: Jerarquía de acciones y reducción de ruido

Fecha: 2026-09-16.

Estado: **IMPLEMENTADO EN STG — PENDIENTE VALIDACIÓN VISUAL FINAL**.

## Objetivo

Separar claramente las acciones de contacto de los enlaces editoriales y eliminar estímulos que interrumpen la lectura. La conversión debe existir, pero sin presión ni señales comerciales repetitivas.

Principio rector: **leer primero; actuar cuando la persona esté preparada**.

## Implementación realizada

### 1. Enlaces editoriales ya no se convierten automáticamente en botones

Se ha eliminado de `assets/site.js` la lógica que detectaba párrafos cuyo contenido era solo uno o varios enlaces y les añadía automáticamente las clases `.button` y `.content-link-button`.

A partir de este sprint, el aspecto de botón debe declararse explícitamente en el HTML cuando exista una acción real. La estructura `p > a` deja de tener significado comercial o de conversión.

Se incorpora `.editorial-link` como patrón explícito para continuidad de lectura:

- peso moderado;
- subrayado visible;
- sin fondo ni forma de botón;
- foco heredado del sistema global.

### 2. Portada: jerarquía de acciones simplificada

En la sección final de la portada:

- `Solicitar información` queda como único CTA principal;
- `Conocer cómo trabajo` pasa a enlace editorial;
- `Resolver dudas frecuentes` pasa a enlace editorial.

Los enlaces de las cards de orientación de la portada también se han marcado como enlaces editoriales explícitos.

El hero mantiene dos acciones diferenciadas y no incorpora un tercer CTA.

### 3. WhatsApp calmado

Se mantiene WhatsApp como canal de contacto, pero se han eliminado:

- animación de entrada;
- pulsos;
- tooltip automático `¿Hablamos?`;
- cualquier aparición temporal que reclame atención.

El control conserva:

- color reconocible de WhatsApp;
- tamaño táctil suficiente;
- foco visible;
- `aria-label="Hablar por WhatsApp"`;
- icono en móvil;
- sombra reducida y estática.

En móvil el control se reduce ligeramente a 52 × 52 px para disminuir presencia sin perder usabilidad.

### 4. Botones

Los botones mantienen una altura mínima de 48 px y padding consistente. No se han creado nuevas variantes visuales.

### 5. Navegación móvil

Como cierre del ajuste pendiente del Sprint 06, el contenido del menú móvil desplegado queda alineado a la derecha, coherente con la posición del disparador `Menú`.

## Fuera de alcance y preservado

- Sin cambios de fondo en textos editoriales.
- Sin pop-ups, banners ni nuevos sticky CTA.
- Sin cambios generales de cards, color o tratamiento de imágenes: Sprint 09.
- Producción sin cambios.

## Archivos modificados

- `assets/site.js`
- `index.html`
- `SPRINT-08.md`

## Criterios de aceptación

### Verificados en código

- [x] Ningún enlace editorial se convierte automáticamente en botón por su estructura HTML.
- [x] La portada usa un único CTA principal en su bloque final.
- [x] Los enlaces editoriales de portada se distinguen de los botones.
- [x] WhatsApp no pulsa ni entra animado.
- [x] WhatsApp no muestra `¿Hablamos?` ni otro mensaje automático.
- [x] WhatsApp conserva nombre accesible y foco visible.
- [x] Los botones mantienen target mínimo de 48 px.
- [x] No se han añadido nuevas animaciones decorativas.
- [x] Los cambios están limitados a `miterapiaregresiva/stg`.

### Pendientes de validación visual en navegador

- [ ] Confirmar que la sección final de home se percibe con una jerarquía clara: CTA + navegación editorial.
- [ ] Revisar WhatsApp en 360, 390 y 430 px para confirmar que no tapa contenido o créditos.
- [ ] Revisar zoom 200 %.
- [ ] Revisar teclado y foco de WhatsApp.
- [ ] Revisar varios artículos, autores y biblioteca para confirmar que los enlaces antes transformados automáticamente vuelven a percibirse como enlaces.

## Resultado esperado

La persona puede recorrer páginas completas sin que la interfaz le pida constantemente hacer algo. El contacto permanece visible y sencillo, pero subordinado a la comprensión del contenido.

## Siguiente sprint

Tras validación visual, continuar con **Sprint 09 — Refinamiento visual y accesibilidad editorial**.