# Sprint 08: Jerarquía de acciones y reducción de ruido

Fecha: 2026-09-16.

Estado: **PENDIENTE — implementar después de Sprint 07**.

## Objetivo

Separar claramente las acciones de contacto de los enlaces editoriales y eliminar estímulos que interrumpen la lectura. La conversión debe existir, pero sin presión ni señales comerciales repetitivas.

Principio rector: **leer primero; actuar cuando la persona esté preparada**.

## Alcance

### 1. Eliminar la conversión automática de enlaces editoriales en botones

Situación actual: `assets/site.js` añade clases de botón a párrafos cuyo único contenido es un enlace.

Eliminar esa transformación automática.

No usar el tipo de contenedor (`p > a`) para decidir visualmente si algo es un CTA.

Definir de forma explícita dos niveles:

**Enlace editorial**

- leer más;
- continuar leyendo;
- artículo relacionado;
- biblioteca;
- autor o libro relacionado;
- navegación contextual.

**Botón / CTA**

- solicitar información;
- contactar;
- consultar disponibilidad;
- hablar por WhatsApp.

Referencia para enlace editorial:

```css
.editorial-link {
  font-weight: 550;
  text-decoration: underline;
  text-decoration-thickness: .08em;
  text-underline-offset: .22em;
}
```

No es obligatorio crear esa clase si puede resolverse con una semántica más simple y mantenible.

### 2. Revisar CTA de la portada

Evitar grupos con tres botones de igual peso.

Como regla general por bloque:

- máximo 1 CTA principal;
- opcionalmente 1 acción secundaria;
- el resto debe presentarse como navegación editorial normal.

En la sección final de la portada priorizar `Solicitar información` como acción principal. `Cómo trabajo` y `Preguntas frecuentes` pueden funcionar como enlaces editoriales o acciones secundarias de menor peso.

No introducir urgencia, escasez, contadores, pop-ups ni lenguaje de presión.

### 3. WhatsApp flotante

Mantener WhatsApp disponible como canal de contacto, pero eliminar comportamiento intrusivo.

Eliminar:

- animación de entrada;
- pulsos;
- tooltip automático `¿Hablamos?`;
- cualquier aparición temporal que reclame atención durante la lectura.

Referencia mínima:

```css
.whatsapp-float {
  animation: none;
  box-shadow: 0 4px 16px rgb(0 0 0 / .12);
}

.whatsapp-float::before {
  display: none;
}
```

Valorar integrar el control en la paleta de la web en vez de usar el verde como gran elemento visual. Si se conserva el verde de WhatsApp por reconocimiento, reducir su protagonismo mediante tamaño, sombra y ausencia de movimiento.

En móvil comprobar que no tapa:

- texto;
- controles;
- créditos de imagen;
- botones;
- contenido al usar zoom.

### 4. Movimiento

Mantener `prefers-reduced-motion`, pero adoptar el principio de que esta media query es una red de seguridad, no una justificación para introducir animación decorativa.

No añadir nuevas animaciones en este sprint.

### 5. Texto de acciones

Preferir formulaciones tranquilas y específicas:

- `Solicitar información`;
- `Consultar disponibilidad`;
- `Contactar`;
- `Hablar por WhatsApp`.

Evitar fórmulas de urgencia o empuje comercial.

### 6. Jerarquía visual

Los botones deben conservar:

- target táctil de al menos 48 px;
- foco visible;
- contraste AA;
- estado hover/focus distinguible;
- apariencia consistente.

Referencia:

```css
.button {
  min-height: 48px;
  padding: .75rem 1.15rem;
  border-radius: 999px;
  font-weight: 600;
}
```

No multiplicar variantes de botón.

## Revisión de páginas

Revisar explícitamente:

- portada;
- terapia regresiva;
- cómo trabajo;
- preguntas frecuentes;
- artículos largos;
- contacto;
- biblioteca y autores para evitar que enlaces de recursos aparezcan como CTA.

## No hacer en este sprint

- No modificar contenidos de fondo ni posicionamiento terapéutico.
- No rediseñar formularios si no existe un problema concreto de lectura o accesibilidad.
- No introducir banners, sticky CTA adicionales ni pop-ups.
- No tocar producción.

## Criterios de aceptación

- [ ] Ningún enlace editorial se convierte automáticamente en botón por su estructura HTML.
- [ ] Los botones están reservados a acciones reales.
- [ ] Los enlaces de `Leer`, `Ver`, `Artículo`, `Biblioteca` y similares se perciben como continuidad editorial.
- [ ] La portada no presenta tres CTA equivalentes en el mismo bloque.
- [ ] WhatsApp no pulsa, no entra animado y no muestra mensajes automáticos.
- [ ] WhatsApp sigue siendo accesible por teclado y lector de pantalla.
- [ ] No hay elementos que reclamen atención de forma automática durante la lectura.
- [ ] `prefers-reduced-motion` sigue cubriendo cualquier transición restante.

## Resultado esperado

La persona puede recorrer páginas completas sin que la interfaz le pida constantemente hacer algo. El contacto permanece visible y sencillo, pero subordinado a la comprensión del contenido.