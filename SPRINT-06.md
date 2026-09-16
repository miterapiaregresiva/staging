# Sprint 06: Lectura móvil y navegación tranquila

Fecha: 2026-09-16.

Estado: **SIGUIENTE A IMPLEMENTAR**.

Dependencia: implementar antes de los Sprints 07, 08 y 09.

## Objetivo

Hacer que el contenido aparezca antes, reducir la presencia permanente de la interfaz y favorecer una lectura pausada, clara y predecible. No se busca rediseñar la identidad ni introducir nuevas tendencias visuales.

Principio rector: **easy paced reading**. Cada cambio debe mejorar al menos uno de estos aspectos: legibilidad, carga cognitiva, orientación, ritmo de lectura, confianza, accesibilidad o comodidad móvil.

## Alcance

### 1. Header móvil compacto

Situación actual: por debajo de 700 px el menú principal se muestra como una cuadrícula de seis enlaces en tres columnas y dos filas, mientras el header permanece sticky.

Cambiar el patrón móvil a una cabecera cerrada de una sola línea, aproximadamente 60–68 px de alto:

- marca/símbolo y nombre a la izquierda;
- control `Menú` a la derecha;
- conservar navegación completa al desplegar;
- conservar el header sticky solo si no resta espacio de lectura de forma significativa;
- no ocultar opciones del menú principal;
- no añadir iconografía decorativa innecesaria.

El menú móvil debe contener, en el mismo orden actual:

1. Terapia regresiva
2. Cómo trabajo
3. Sobre mí
4. Preguntas frecuentes
5. Artículos
6. Contacto

### 2. Accesibilidad del menú

Implementar el menú con comportamiento accesible:

- botón real `<button>`;
- `aria-expanded` sincronizado con el estado;
- `aria-controls` apuntando al contenedor del menú;
- foco visible;
- cierre predecible;
- navegación completa por teclado;
- no bloquear el zoom;
- objetivos táctiles de al menos 48 × 48 px;
- no depender exclusivamente del color para indicar el estado activo.

Si se implementa cierre con Escape, devolver el foco al botón que abrió el menú.

### 3. Eliminar el branding duplicado del hero en todos los tamaños

La portada incorpora actualmente un segundo lockup de marca dentro del hero. Esta información ya está suficientemente representada en la cabecera mediante símbolo, dominio, tagline y servicio, por lo que repetirla en el hero añade peso visual sin mejorar orientación ni comprensión.

Eliminar el panel/lockup gráfico del hero **tanto en escritorio como en móvil**.

El hero debe quedar centrado en contenido editorial:

- eyebrow `Tenerife · presencial`;
- H1;
- introducción principal;
- texto explicativo cuando corresponda;
- acciones tranquilas y jerarquizadas.

No sustituir el lockup eliminado por otra ilustración, logotipo ampliado, imagen decorativa o bloque promocional.

La cabecera pasa a ser el único lugar de branding prominente al inicio de la página. El hero debe utilizar el espacio recuperado para mejorar legibilidad, proporción y ritmo, no para introducir más contenido.

En escritorio, revisar la composición tras pasar de dos columnas a una. Priorizar un ancho de lectura cómodo y evitar que el H1 o el texto se expandan hasta todo el ancho disponible. La decisión definitiva sobre `max-width` y escala tipográfica global corresponde al Sprint 07, pero este sprint debe dejar una composición equilibrada sin el panel de marca.

Objetivos:

- eliminar redundancia de identidad;
- permitir que la propuesta principal se comprenda antes;
- reducir carga cognitiva en el primer viewport;
- conseguir que la portada se perciba más como una entrada editorial que como una landing comercial.

### 4. Footer móvil

Convertir el footer móvil a una sola columna cuando mejore la lectura:

```css
@media (max-width: 700px) {
  .site-footer .footer-grid {
    grid-template-columns: 1fr;
  }
}
```

Mantener agrupaciones semánticas de navegación y legal. No ahorrar altura a costa de comprimir enlaces.

### 5. Márgenes y targets móviles

Revisar especialmente 360, 390, 430 y 768 px:

- márgenes laterales cómodos;
- evitar texto pegado a los bordes;
- evitar saltos inesperados de título;
- evitar botones o enlaces demasiado próximos;
- imágenes sin desbordamientos horizontales;
- no introducir scroll horizontal.

Como orientación, priorizar 20–24 px de margen lateral en lectura móvil.

## No hacer en este sprint

- No cambiar todavía la escala tipográfica global: Sprint 07.
- No modificar todavía la jerarquía de CTA ni WhatsApp: Sprint 08.
- No hacer refinamientos generales de color, cards o imágenes: Sprint 09.
- No modificar textos editoriales salvo ajustes mínimos necesarios para accesibilidad del control de navegación.
- No tocar producción.

## Criterios de aceptación

- [ ] En 360–430 px el header cerrado ocupa aproximadamente una sola línea y no dos filas de navegación permanentes.
- [ ] El panel/lockup de marca del hero ha desaparecido en escritorio y móvil.
- [ ] La eliminación del panel no se ha compensado con otra pieza decorativa equivalente.
- [ ] El primer viewport de la home prioriza H1, introducción y contenido frente a branding redundante.
- [ ] La composición de escritorio continúa siendo equilibrada tras pasar el hero a una estructura sin panel lateral.
- [ ] El H1 de la portada aparece claramente antes que en la versión actual en móvil.
- [ ] El menú se puede abrir, recorrer y cerrar solo con teclado.
- [ ] El estado expandido está expuesto mediante ARIA.
- [ ] Todos los targets principales alcanzan al menos 48 px.
- [ ] No hay scroll horizontal a 200 % de zoom.
- [ ] El footer móvil se puede recorrer con una secuencia sencilla y legible.
- [ ] No se han introducido animaciones decorativas.

## Validación

Probar como mínimo:

- 360 × 800;
- 390 × 844;
- 430 × 932;
- 768 × 1024;
- escritorio ≥ 1280 px.

Comprobar además:

- teclado;
- zoom de navegador al 200 %;
- `prefers-reduced-motion`;
- foco visible;
- navegación sin JavaScript, si el patrón elegido permite una degradación razonable.

En escritorio, comprobar específicamente que la eliminación del lockup del hero no produce una columna de texto excesivamente ancha ni un vacío visual artificial.

## Resultado esperado

La interfaz debe sentirse como una página que se lee, no como una aplicación o una landing cuya navegación y marca compiten de forma permanente con el contenido. La identidad sigue presente y reconocible en la cabecera; el hero queda liberado para explicar con calma qué ofrece la página.