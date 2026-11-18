<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Proyecto: Invitación de boda - Sonia & David

Sitio web de una sola página (one-page) tipo invitación de boda, en español, con estética editorial: fondos crema, acentos terracota y tipografía serif elegante.

---

## 1. Cómo trabajar en este repositorio

Estas reglas aplican a cualquier agente que retome el proyecto:

- **El dueño del proyecto está aprendiendo Next.js.** No implementar código de la aplicación salvo que lo pida explícitamente. Lo normal es **entregar el código en el chat, con explicación breve de qué hace y por qué**, y que él lo pegue en los archivos.
- **Idioma: español.** Nombres de archivos/componentes en español cuando son de dominio del negocio (`NuestraHistoria`, `ElGranDia`, `CodigoVestimenta`).
- **Antes de sugerir APIs de Next.js**, leer la guía correspondiente en `node_modules/next/dist/docs/` (este proyecto usa Next 16; hay cambios respecto a versiones anteriores).
- **No romper el bloque `nextjs-agent-rules`** del inicio de este archivo: `next dev` lo regenera.
- **Al terminar cada avance**, actualizar la sección *Estado actual* y agregar una línea a la *Bitácora*.
- Avanzar **por fases**, una sección a la vez, verificando en el navegador antes de seguir.

---

## 2. Stack

| Pieza | Versión / nota |
|---|---|
| Next.js | 16.4.5 (App Router) |
| React | 19.3.0 |
| TypeScript | 5, `strict: true` |
| Tailwind CSS | 4 (vía `@tailwindcss/turbopack`) |
| Fuentes | `next/font/google` (auto-alojadas) |
| Base de datos | Oracle Database — **aún no implementada** (Fase 18) |

`next.config.ts` ya trae activado: `cacheComponents`, `partialPrefetching`, `experimental.agentFeedback` y la regla de Turbopack para CSS. **No tocar sin necesidad.**

Alias de importación disponible: `@/*` → raíz del proyecto (`@/data/wedding-data`).

---

## 3. Datos del evento

Fuente única de verdad: `data/wedding-data.ts`. Ningún componente debe hardcodear fecha, lugares ni nombres.

| Dato | Valor |
|---|---|
| Novios | Sonia & David |
| Fecha | 28 de diciembre de 2026 |
| Ceremonia | Centro Cristiano Izcalli — 5:00 PM |
| Recepción | Centro Cristiano Izcalli — 8:00 PM |
| Dirección | Jacarandas 6, Santa Rosa de Lima, 54740 Cuautitlán Izcalli, Méx. |
| Ciudad | Cuautitlán Izcalli, Estado de México |
| Zona horaria | UTC−6 todo el año (`-06:00`) |
| Código de vestimenta | Formal — evitar blanco (vestido de la novia) y azul (traje del novio) |

> Ceremonia y recepción son en el mismo lugar y comparten el mismo link de Google Maps. El countdown apunta al inicio de la ceremonia (`2026-12-28T17:00:00-06:00`).

**Pendientes de contenido:**

- [x] Año confirmado: 2026.
- [x] Link de Google Maps (uno para ceremonia y recepción).
- [x] Direcciones exactas del lugar.
- [x] Horas de ceremonia (5:00 PM) y recepción (8:00 PM).
- [ ] Fotos reales → guardar en `public/images/`.
- [ ] Texto real de "Nuestra Historia" (hoy es texto de ejemplo).
- [ ] Hoteles recomendados para la sección de Hospedaje.

---

## 4. Sistema de diseño

### 4.1 Paleta (tokens de Tailwind en `app/globals.css`)

Definidos en el bloque `@theme`, por lo que generan utilidades (`bg-*`, `text-*`, `border-*`) y aceptan opacidad (`bg-cream/80`).

| Token | HEX | Uso |
|---|---|---|
| `cream` | `#F3EBE1` | Fondo principal de secciones claras |
| `sand` | `#D8BFA8` | Líneas divisorias, íconos, fondos secundarios |
| `terracotta` | `#C08D52` | Acento principal: botones, enlaces, el "&" |
| `cinnamon` | `#A66443` | Hover de botones, textos secundarios |
| `coffee` | `#5C3A21` | Header/Footer, countdown, FAQ, títulos |
| `ink` | `#1A1817` | Texto principal (nunca negro puro) |

> ✅ **Corregido:** el token quedó como `--color-coffee` (dos "e") y `app/page.tsx` usa `text-coffee` / `bg-coffee` correctamente. Se deja constancia porque fue un typo silencioso de Tailwind.

### 4.2 Tipografía

- **Títulos:** Cormorant Garamond (variable, normal + italic) → utilidad `font-serif`.
- **Cuerpo, botones y navegación:** Montserrat (variable) → utilidad `font-sans`.
- Declaradas en `app/layout.tsx` con `variable: "--font-cormorant"` / `"--font-montserrat"` y mapeadas en `@theme inline`.
- Son fuentes variables: **no** se les pasa `weight`; el navegador interpola los pesos.
- El `<html>` lleva `lang="es"`.

### 4.3 Aplicación de la paleta por sección

| Sección | Fondo | Texto / detalles |
|---|---|---|
| Header | Transparente sobre el Hero → al hacer scroll `coffee` o `cream` | Texto blanco → `ink` o blanco |
| Hero | Foto a pantalla completa | Texto blanco con sombra sutil |
| Nuestra Historia | `cream` | Títulos `coffee`, texto `ink`, botón con borde `terracotta` |
| Countdown | `coffee` | Números `cream`, títulos/etiquetas `terracotta` |
| El Gran Día | `cream` | Íconos `terracotta`, botón mapa `terracotta` con texto blanco |
| Cronograma | `cream` | Onda y puntos `terracotta`, horas `coffee` |
| Vestimenta / Hospedaje | `cream` o blanco | Divisorias `sand`, texto `ink` |
| Galería | `cream` | — |
| FAQ | `ink` o `coffee` | Texto `cream`, signos "+" en `terracotta` |
| Footer | `ink` con foto de fondo | Texto `sand` |

**Botones:** fondo `terracotta`, texto blanco, hover `cinnamon`, transición suave (300 ms). Bordes redondeados tipo píldora cuando aplique.

### 4.4 Reglas generales

- No usar negro puro `#000` ni blanco puro como fondo de sección.
- **Sin modo oscuro automático:** se eliminó el `@media (prefers-color-scheme: dark)` a propósito.
- Foco visible en `terracotta` para accesibilidad (ya en `globals.css`).
- `scroll-behavior: smooth` global para la navegación por anclas.
- Anclas de sección con `id` en español (`#bienvenida`, `#historia`, `#countdown`, `#gran-dia`, `#cronograma`, `#vestimenta`, `#hospedaje`, `#galeria`, `#faq`, `#despedida`, `#rsvp`).

---

## 5. Estructura de archivos

```
app/
  layout.tsx          # Fuentes, metadata, <html lang="es">
  page.tsx            # Ensamblaje: Hero → Bienvenida → Historia → … → FAQ
  globals.css         # Tokens de color, fuentes y estilos base
components/
  layout/
    Header.tsx        # Menú fijo/scroll + hamburguesa móvil        (listo)
    Footer.tsx        # Fondo oscuro con foto y texto arena          (vacío)
    Cortina.tsx       # Pantalla inicial + música (Fase 18)
  sections/
    Hero.tsx          # Foto, nombres, fecha, hora y ciudad          (listo)
    Bienvenida.tsx    # Mensaje de los novios tras el Hero           (listo)
    NuestraHistoria.tsx  # Texto + <details> expandible + carrusel      (listo)
    CuentaRegresiva.tsx  # Sección café que envuelve al Countdown    (listo)
    ElGranDia.tsx     # Lugar, horarios y botón de Google Maps       (listo)
    Cronograma.tsx    # Onda SVG con 6 hitos; lista vertical en móvil (listo)
    CodigoVestimenta.tsx  # Dos cards con foto (traje / vestido)      (listo)
    Hospedaje.tsx     # Hoteles; hoy muestra estado "próximamente"  (listo)
    Galeria.tsx       # Collage de tamaños variables + lightbox       (listo)
    PreguntasFrecuentes.tsx  # Acordeón con <details> nativo        (listo)
    Despedida.tsx     # Agradecimiento de cierre en degradado         (listo)
  ui/
    Button.tsx        # Botón reutilizable (variantes)               (vacío)
    Countdown.tsx     # Contador en tiempo real (client component)   (listo)
    PhotoPlaceholder.tsx  # Espacio reservado para fotos             (listo)
    Lightbox.tsx      # Modal con <dialog> nativo (Fase 15)
data/
  wedding-data.ts     # Fuente única de verdad (couple, event, welcome, farewell, schedule, venues, dressCode, hotels, galleryPhotos, faqItems, music)
public/
  images/             # Fotos definitivas (destino recomendado)
  imagesPrueba/       # Fotos de prueba (gale1-6, hero, historias, historia2, vestimenta)
  icons/derecha.png   # Flecha del botón "Ver nuestra historia completa"
  icons/anadir.png    # Signo "+" del acordeón de FAQ
  music/              # Opalite (Life Is A Song Acoustic Version).mp3 (5.56 MB)
docs/
  guia-proyecto.html  # Fuente de la guía (se edita aquí)
  guia-proyecto.pdf   # Guía imprimible: Next, estilos, clases, FAQ
  plan-fases.html     # Plan de las fases 11 a 18
  plan-fases.pdf      # Versión imprimible del plan
  plan-cortina.html   # Cortina, música, hoteles con foto y nuevo roadmap
  plan-cortina.pdf    # Versión imprimible
  plan-rsvp.html      # RSVP con modal, dashboard del cliente y Oracle
  plan-rsvp.pdf       # Versión imprimible (código completo)
```

---

## 6. Decisiones técnicas ya tomadas

1. **Tailwind 4 con `@theme`**: los colores son tokens, no hex repetidos en los componentes. Las fuentes usan `@theme inline` porque su valor lo inyecta `next/font` en `<html>`.
2. **`dateIso` con offset `-06:00`**: el countdown debe apuntar a un instante único, sin depender de la zona horaria del visitante. Cuautitlán Izcalli ya no aplica horario de verano.
3. **`mapsUrl: string | null`**: si no hay link, el componente muestra "Ubicación próximamente" en vez de un botón roto. Cuando se pegue el link, el botón aparece solo. Hoy ceremonia y recepción comparten el mismo link y la misma dirección.
4. **Día de la semana derivado**, no escrito a mano: se calculará con `Intl.DateTimeFormat("es-MX", …)` desde `dateIso` para que nunca se desincronice si cambia la fecha.
5. **Fotos por fases**: primero un componente reutilizable `PhotoPlaceholder` (fondo arena, borde fino, texto sutil) que reserva el espacio con la proporción correcta; después se sustituye por `next/image` cuando existan las fotos.
6. **Una sola fuente de datos**: `data/wedding-data.ts`, importada con `@/data/wedding-data`.
7. **Componentes de servidor por defecto.** Solo son `"use client"` los que necesitan estado o efectos: Header (scroll/hamburguesa) y Countdown. FAQ y RSVP lo serán cuando se implementen.
8. **"Historia completa" con `<details>` nativo**: no necesita JavaScript ni `"use client"`. El `<summary>` es un botón accesible por teclado y `group-open:` cambia el texto y rota la flecha.
9. **Countdown sin desfase**: el intervalo recalcula desde `Date.now()` en cada tick (no resta 1). El primer render muestra `--` para que servidor y cliente coincidan y no haya error de hidratación.
10. **La ceremonia y la recepción comparten tarjeta**: como son en el mismo lugar, `ElGranDia` muestra un solo `venue` y una lista con los dos horarios.
11. **Galería como grid uniforme** (no carrusel): 2 columnas en móvil, 3 en escritorio y proporción fija `4/5`. Es más simple, accesible y no requiere JavaScript; un lightbox puede añadirse después sin rehacer la sección.
12. **Galería con estado vacío**: si `galleryPhotos` está vacío se muestran 6 `PhotoPlaceholder`; al llenar el arreglo, la sección cambia sola a `next/image` sin tocar el componente.
13. **Imágenes en `public/`**: se referencian con ruta absoluta desde la raíz (`/images/novios1.jpg`), nunca con `public/...`. `Image` con `fill` exige un padre posicionado y con altura definida; `priority` solo en la imagen del Hero (LCP).
14. **Cronograma sin JavaScript**: la onda es un `<svg>` con una sola ruta y los puntos son `<span>` posicionados por porcentaje; el componente sigue siendo de servidor. La onda aparece desde `lg` (no desde `md`) porque seis columnas a 768 px dejan ~100 px por columna y las etiquetas se rompen en 3–4 líneas.
15. **La onda y los puntos se alinean por porcentaje, no por pixeles**: el SVG usa `preserveAspectRatio="none"` + `vectorEffect="non-scaling-stroke"` para estirarse sin engrosar el trazo, y cada punto va en `top-[40%]` / `top-[60%]` del mismo contenedor de altura fija (`h-96`). Si se cambia la altura, ambos cambian juntos.
16. **El grid de la onda no lleva `gap`**: con separación, los centros de columna dejan de coincidir con las coordenadas del SVG y los puntos se despegan del trazo. El aire se logra con `px-3` dentro de cada celda.
17. **Header con 7 enlaces máximo**: al entrar Cronograma sale "Hospedaje" del menú (la sección sigue accesible bajando). Así no se aprieta en `lg`.
18. **Vestimenta en dos cards con `aspect-[3/4]`**: es el punto medio que menos recorta la foto vertical del novio (2:3) y la casi cuadrada de la novia. Los dos looks viven en `dressCode.groom` / `dressCode.bride` y el componente los recorre con `.map`, así que un tercer look (por ejemplo niños) es una entrada más en los datos.
19. **El carrusel es un solo `div` con las fotos apiladas en absoluto**: lo único que cambia es la `opacity` de cada una. No hay desplazamiento ni ancho calculado, así que no hay saltos de layout y el contenedor mantiene el alto (`h-80 md:h-[400px]`).
20. **El temporizador se reinicia al cambiar de foto**: `activa` está en las dependencias del `useEffect`, así que el intervalo se limpia y se crea de nuevo tras cada avance o clic en un punto. Sin eso, un clic podía provocar un cambio inmediato a los 0.1 s.
21. **`aria-hidden` solo en las fotos inactivas**: se pasa como `undefined` en la activa para que React no renderice el atributo; con `aria-hidden="false"` el lector de pantalla lo anuncia igual.
22. **`prefers-reduced-motion` con `useSyncExternalStore`, no con `useEffect`**: eslint-plugin-react-hooks v7 marca como **error** el `setState` síncrono dentro del cuerpo de un efecto (`react-hooks/set-state-in-effect`). El hook de React para fuentes externas resuelve el matchMedia sin efectos y sin doble render.
23. **La cortina va en `app/layout.tsx`, envolviendo a `{children}` con un fragmento**: como `Cortina` no puede renderizar un `div` (rompería el `flex flex-col` del `body`), devuelve `<> {children} <overlay/> <audio/> </>`. El overlay es `fixed inset-0 z-[100]`, por encima del Header (`z-50`).
24. **La música solo puede sonar tras un gesto del usuario**: los navegadores bloquean el autoplay. La cortina es la excusa perfecta: el clic que abre la página es el gesto que destapa el `<audio>`. Sin ese clic no hay sonido.
25. **El RSVP puede ser modal**: si el RSVP se abre como modal desde el botón "Confirmar" del Header, no hay sección entre FAQ y Despedida, y el degradado de Despedida (`from-coffee to-ink`) queda como la transición natural.
26. **El Footer lleva el contacto del desarrollador, no el de los novios**: es la información profesional del que hizo la página (nombre, correo, teléfono), con enlaces `mailto:` y `tel:`. Vive en `site.developer`, separada de `couple` y `event`, para que los datos del evento y los del desarrollo nunca se mezclen.

---

## 7. Roadmap por fases

- [x] **Fase 1 — Fundamentos**: paleta, fuentes, estilos base, metadata. *Completada.*
- [x] **Fase 2 — Datos**: `data/wedding-data.ts` con `couple`, `event`, `ceremony`, `reception` y `dressCode`. *Completada.*
- [x] **Fase 3 — Header + Hero**: header transparente que se vuelve sólido al hacer scroll, menú hamburguesa móvil desde `lg`, Hero con foto/nombres/fecha/hora/ciudad y `PhotoPlaceholder`. *Completada y verificada.*
- [x] **Fase 4 — Nuestra Historia**: texto, foto y `<details>` que expande la historia completa con flecha. *Completada; falta el texto real.*
- [x] **Fase 5 — Countdown**: contador días/horas/minutos/segundos en tiempo real dentro de una sección café. *Completada y verificada.*
- [x] **Fase 6 — El Gran Día**: Centro Cristiano Izcalli, ceremonia 5:00 PM, recepción 8:00 PM, dirección y botón a Google Maps. *Completada y verificada.*
- [x] **Fase 7 — Vestimenta + Hospedaje**: `CodigoVestimenta` lista; `Hospedaje` implementado con estado "próximamente" hasta tener hoteles. *Correcciones de clases entregadas (pendientes de pegar).*
- [x] **Fase 8 — Galería**: grid responsive con `PhotoPlaceholder` y soporte para `next/image` cuando existan fotos. *Implementada y verificada con fotos de prueba.*
- [x] **Fase 9 — FAQ**: acordeón accesible. *Implementada y verificada.*
- [x] **Fase 10 — Ajustes de iconos y texto**: `+` de FAQ como imagen (`public/icons/anadir.png`), flecha de Hospedaje con `group-hover`, texto de Historia justificado. *Implementada y verificada.*
- [x] **Fase 11 — Bienvenida**: sección entre Hero e Historia, con mensaje de los novios. *Implementada y verificada.*
- [x] **Fase 12 — Cronograma**: línea de tiempo ondulada (SVG) con hitos; versión vertical en móvil. *Implementada y verificada.*
- [x] **Fase 13 — Vestimenta con imágenes**: dos cards (novio / novia) con foto y la nota de color a evitar. *Implementada; detectado el typo `text-terracota` en el label.*
- [x] **Fase 14 — Carrusel de Historia**: fundido cruzado cada N segundos, con caption por foto que también se desvanece. Client component. *Implementada; pendiente el ajuste de `useSyncExternalStore`.*
- [x] **Fase 15 — Galería collage + lightbox**: tamaños variables (`col-span` / `row-span`) y vista ampliada en modal accesible. Client component. *Implementada y verificada; detectado el typo `obsolute` en el degradado del lightbox.*
- [x] **Fase 16 — Despedida y agradecimientos**: sección de cierre antes del Footer. *Implementada; usa `bg-ink` y necesita el degradado de transición y el typo `text-terracota` corregido.*
- [x] **Fase 17 — Footer**: fondo oscuro con el contacto del desarrollador. *Implementada y verificada; sin foto de fondo (bg-ink plano) y sin bloque de nombres por petición del cliente.*
- [x] **Fase 18 — Cortina de bienvenida + música**: pantalla inicial que cubre todo, con un clic para entrar. Desbloquea el autoplay de la música. *Implementada y verificada; los tres typos corregidos.*
- [x] ~~**Fase 19 — RSVP + Oracle**~~: **descartada por el cliente.** La invitación queda sin RSVP, sin hospedaje y sin preguntas frecuentes.
- [ ] **Fase 20 — Rediseño otoñal**: nueva paleta, composición a la izquierda, arcos, fecha vertical, modal de Historia y carrusel de Galería. *Plan y PDF entregados; implementación por pasos pendiente.*

### Orden y criterio

1. Primero lo estático y visible (Fases 13, 16, 17): no requieren estado ni infraestructura.
2. Después lo interactivo (Fases 14, 15, 18): son client components.
3. La Fase 20 es transversal: primero paleta y datos, después las secciones de arriba a abajo, y al final el modal y la galería.

---

## 8. Estado actual (al 18 de noviembre de 2026)
- **Fases 1 a 18 implementadas y verificadas.** `tsc --noEmit` y `eslint .` limpios. Los dos avisos de `Footer.tsx` ya desaparecieron: el usuario dejó solo `import { site } from "@/data/wedding-data"`.
- **Fase 19 (RSVP) descartada por el cliente.** Se eliminaron del sitio `Hospedaje` y `PreguntasFrecuentes`. En el Paso 6 se limpiaron también los enlaces del Header: ahora solo quedan Historia, El gran día, Galería y Vestimenta.
- **Fase 20 (rediseño otoñal) en curso:** pasos 1 a 8 implementados y ajustes finales aplicados. Paleta otoñal; Hero abajo-izquierda con `min-h-[90svh]`; Bienvenida reestructurada con `--ancho-arco: clamp(18rem, 27vw, 24rem)`: arco centrado en la sección y con la misma altura que ella (`lg:inset-y-0`, 384×480 px a 1440 px, 288×480 px a 1024 px, cuadrado de 342 px a 390 px), texto justificado con las mismas clases que Historia (`font-sans text-base leading-relaxed text-ink/80`, 464 px a 1440 px) y firma acercada (`mt-4`); una sola capa de Hero desde el centro de la sección (`left-1/2 right-0`) queda detrás del arco, de modo que el tono oscuro rellena la cuña curva de la esquina superior derecha y continúa sin costura hasta el borde derecho; la línea terracota se eliminó en el ajuste final para que no haya costura; fecha clara centrada en móvil bajo el nombre del día; flecha indicadora del Hero también eliminada; efecto aprobado por el cliente el 18 de noviembre de 2026; Nuestra Historia con texto arriba (`items-start`) y foto ocupando todo el alto del lado derecho (`inset-y-0`, 480 px) con `rounded-tl-[18rem_60%]`: curva de cuarto de círculo (radio horizontal y vertical de 288 px) que arranca 48 px más abajo (y=1578) y cierra 48 px más a la derecha (x=1000), con 192 px de borde recto abajo y 424 px arriba, sin `mask-image`, más modal `<dialog>`; cuenta regresiva a la izquierda; El Gran Día con dos títulos, tres datos con iconos SVG, botón centrado, arco central y cronograma centrado en su columna (`mx-auto max-w-[16rem]`); Header de cuatro enlaces; Galería de tres cuadrados con avance circular; Vestimenta solo con texto y Despedida a la izquierda. `ArcoFoto` acepta la prop `forma`. Verificado a 1000 px y a 1440 px (iframe): `tsc` y `eslint` limpios, sin errores de consola. Falta confirmar si la cursiva aplica también al cuerpo. El plan está en `docs/plan-otonal.html`/`.pdf`. **Documentación válida:** `docs/especificaciones-finales-otono.html`/`.pdf` (13 páginas) con todas las clases finales y los mapas para modificar fotos, tamaños y formas. `docs/guia-cambios-otonal.html`/`.pdf` queda como documento histórico y ya no debe usarse: describe arcos anteriores.
- `app/page.tsx` ensambla: `Header` → `Hero` → `Bienvenida` → `NuestraHistoria` → `CuentaRegresiva` → `ElGranDia` → `Galeria` → `CodigoVestimenta` → `Despedida`. `Cronograma.tsx` quedó eliminado y su contenido vive en `ElGranDia`. Los ocho pasos del plan están implementados; ya se revisó a 390, 1024 y 1440 px, sin desbordamiento horizontal.
- **Datos definitivos**: 28 de diciembre de 2026, Centro Cristiano Izcalli (Cuautitlán Izcalli), ceremonia 5:00 PM y recepción 8:00 PM. Mismo lugar y mismo link de Google Maps.
- **Cronograma del día**: 5:00 ceremonia · 6:30 fotos con familiares y amigos · 8:00 recepción · 9:00 baile de los novios · 9:30 pastel · 10:00 baile general.
- **Countdown** apunta a `2026-12-28T17:00:00-06:00` (inicio de la ceremonia).
- **Nuestra Historia** usa modal `<dialog>` para el texto completo y una foto que ocupa todo el alto del lado derecho (`inset-y-0`, 480 px), con `rounded-tl-[18rem_60%]`: radio horizontal y vertical de 288 px, así que la curva arranca en y=288 de 480 px y cierra en x=288 de 712 px (48 px más abajo y a la derecha que antes), dejando 192 px de borde recto por debajo.
- **Header** cambia a menú completo desde `lg` (1024px); en tablet usa hamburguesa. Monograma `S & D`. La Fase 20 reduce el menú a: Historia · El gran día · Galería · Vestimenta.
- **Fotos**: Hero, Historia y Galería usan `next/image` con fotos en alta resolución en `public/imagesPrueba/` (`gale1–6`, `hero`, `historias`). Las rutas del Hero están centralizadas en `featuredPhotos`.
- **Documentación**: `docs/guia-proyecto.html` y `docs/guia-proyecto.pdf`; `docs/plan-fases.html` y `docs/plan-fases.pdf`; `docs/plan-cortina.html` y `docs/plan-cortina.pdf`; `docs/plan-rsvp.html` y `docs/plan-rsvp.pdf` (RSVP descartado, se conserva como referencia); `docs/plan-otonal.html` y `docs/plan-otonal.pdf` (rediseño otoñal, 17 páginas); `docs/guia-cambios-otonal.html` y `docs/guia-cambios-otonal.pdf` (guía antigua, solo histórica); `docs/especificaciones-finales-otono.html` y `docs/especificaciones-finales-otono.pdf` (13 páginas; queda pendiente regenerarlos con la Bienvenida aprobada); `docs/efecto-continuo-bienvenida.html` y `docs/efecto-continuo-bienvenida.pdf` (13 páginas, explicación profunda y exclusiva del efecto Hero → Bienvenida: capas, curva, degradados, contraste, código final y recetas); `docs/ajustes-finales-y-efecto-onda.html` y `docs/ajustes-finales-y-efecto-onda.pdf` (11 páginas, tres ajustes finales + énfasis en la onda de Historia + preguntas sobre la fecha con código propuesto NO aplicado).
- **Ajustes finales aplicados (18-nov-2026):** en Bienvenida se añadió `lg:pr-6` al párrafo izquierdo para separarlo del arco (12 → 36 px); entre Bienvenida e Historia se insertó en `app/page.tsx` una franja `<div aria-hidden="true" className="h-1 bg-terracotta"/>` (4 px, sin texto); en El Gran Día se añadió `lg:translate-x-6` al grid (contenido 24 px a la derecha) y se centró el programa con `text-center` en el título y `px-9` en cada `li` (centros de título y texto ambos en x=1118). `tsc` y `eslint` limpios, sin desbordamiento horizontal.

### Pendientes de contenido (los pide el cliente)

- Texto real de bienvenida (Fase 11), de la historia completa (Fase 20) y de despedida (Fase 16); hoy hay texto de ejemplo.
- Foto para el arco de Bienvenida, foto del lugar para El Gran Día y fotos definitivas para la Galería. Las de prueba están en `public/imagesPrueba/`.
- Confirmar si la fecha definitiva sigue siendo el 28 de diciembre de 2026 (los ejemplos del rediseño usan 17/11/2027 solo como referencia visual).

### Deuda técnica menor (detectada al revisar la Fase 11)

- Typos en `welcome.message`: "no estaría completos" → "completo", "caminadoa" → "caminado a", "acompañanos" → "acompáñanos". **Corregidos.**
- Typos en `faqItems`: "ceremonía" → "ceremonia", "Te recomendamos llegas" → "Te recomendamos llegar". **Corregidos.**
- `dressCode.description` solo mencionaba el blanco; la Fase 13 lo reescribe con las dos reglas (blanco y azul) y agrega `groom` / `bride`.

### Pendiente de fotos

- Las fotos de vestimenta (`vestimentaNovio.jpeg`, `vestidoNovia.png` / `vestimentaNovia.jpg`) ya no se usan: el Paso 8 dejó Vestimenta solo con texto y se quitaron `image`/`alt` de `dressCode`. Los archivos pueden conservarse en `public/imagesPrueba/` como referencia.

### Próximo paso concreto

1. Efecto Hero → Bienvenida aprobado por el cliente; ya no hay cambios pendientes en esa transición.
2. Si el cliente lo pide, regenerar `docs/especificaciones-finales-otono.html` y `docs/especificaciones-finales-otono.pdf` con las clases y medidas nuevas (390 / 1024 / 1440 px). El PDF específico del efecto ya está en `docs/efecto-continuo-bienvenida.pdf`.
3. Confirmar si la cursiva debe aplicarse también al texto de cuerpo (hoy solo va en títulos serif, firma y números de fecha).

---

## 9. Trampas conocidas

- **Tailwind falla en silencio**: una clase con el token mal escrito (`bg-coffee` vs `--color-coffe`) no genera CSS y no lanza error. Verificar en el inspector que la propiedad exista.
- **Typos de clases ya detectados**: `tracking-[o.45em]` (letra "o" en vez de cero), `trracking` (doble "r") y `tracking-[0.3em]` mal escrito no generan CSS. Revisar siempre `tracking`, `leading`, `text`, `bg`, `border`.
- **Clases pegadas sin espacio**: `px-8py-10` es una sola clase inválida y Tailwind la ignora; debe ser `px-8 py-10`. Lo mismo con `mx-w-15xl`: no existe, es `max-w-5xl`.
- **Texto de relleno en enlaces**: revisar que no quede `<span>Ingresar</span>` dentro de un enlace que ya dice "Ver sitio"; usar solo la flecha o el ícono.
- **Prop de hidratación**: es `suppressHydrationWarning`, no `suppressContentEditableWarning`. Este último existe en React y por eso TypeScript no marca error, pero no hace nada para el countdown.
- **Anclas con acento**: el label puede llevar acento (`Galería`), pero el `id`/`href` no (`#galeria`). `#galería` se percent-codifica y no coincide con `id="galeria"`.
- **`group-open:`**: para que funcionen `group-open:hidden` / `group-open:inline` / `group-open:rotate-90`, el `<details>` debe tener la clase `group`.
- **Color de token en estilos inline**: usar `var(--color-cinnamon)` dentro de `color-mix(...)`, no repetir el hex.
- **Fuentes variables**: no pasar `weight` a Montserrat ni a Cormorant Garamond.
- **`@theme` vs `@theme inline`**: colores → `@theme`; fuentes de `next/font` → `@theme inline`.
- **No reactivar el modo oscuro** automático del template.
- **Nombrar archivos con mayúscula inicial** en componentes (`Hero.tsx`), como ya está el esqueleto.

---

## 10. Bitácora

| Fecha | Avance |
|---|---|
| 2026-11-04 | Fase 1 entregada e implementada: tokens de color, Cormorant Garamond + Montserrat, estilos base y metadata. |
| 2026-11-04 | Fase 2 entregada: estructura tipada de `data/wedding-data.ts` con datos reales; pendiente de pegar. |
| 2026-11-04 | Detectado y documentado el typo `coffe` / `coffee` que hacía invisible un color de la paleta. |
| 2026-11-04 | Fase 2 verificada; año confirmado (2026). Detectado que faltaba `reception` y que `timeLabel` era redundante. |
| 2026-11-04 | Fase 3 implementada y verificada: `PhotoPlaceholder`, `Hero`, `Header` con scroll y menú móvil, y ensamblaje en `app/page.tsx`. |
| 2026-11-08 | Fase 4 implementada: divisor corregido, `<details>` nativo para "historia completa" y flecha `public/icons/derecha.png`. |
| 2026-11-08 | Fase 5 implementada y verificada: `Countdown` cliente con `useEffect`, `suppressHydrationWarning` y recálculo desde `Date.now()`. |
| 2026-11-08 | Revisión: detectados typos silenciosos (`tracking-[o.45em]`, `trracking`, `suppressContentEditableWarning`) y `href="#galería"` con acento. Corregidos. |
| 2026-11-08 | Fase 6 implementada y verificada: Centro Cristiano Izcalli, ceremonia 5:00 PM, recepción 8:00 PM, dirección y Google Maps. Countdown apunta a las 17:00. |
| 2026-11-08 | `AGENTS.md` actualizado: datos reales, roadmap, decisiones, trampas y bitácora. Próximo: Fase 7. |
| 2026-11-09 | Fase 7 implementada: `CodigoVestimenta` y `Hospedaje` creados y ensamblados en `app/page.tsx`. Hospedaje queda con estado "próximamente" hasta tener datos de hoteles. |
| 2026-11-09 | Revisión Fase 7: `tsc` y `eslint` sin errores. Detectados 3 detalles: `px-8py-10` sin espacio, `mx-w-15xl` inválido y `<span>Ingresar</span>` en el enlace de hoteles. Se corrigen al retomar. |
| 2026-11-09 | Pausa: no se entrega más código. Próximo: corregir los 3 detalles y continuar con la Fase 8 (Galería). |
| 2026-11-09 | Revisión completa: `tsc` y `eslint` sin errores; `next build` solo falla por falta de red para Google Fonts en el entorno del agente. Confirmados los 3 detalles de la Fase 7. |
| 2026-11-09 | Fase 8 entregada: `galleryPhotos` en `wedding-data.ts` y `Galeria.tsx` con grid responsive y estado vacío. |
| 2026-11-09 | Fotos de prueba (`novios1–8.jpg`) en `public/imagesPrueba/`. Entregado el reemplazo de `PhotoPlaceholder` por `Image` en Hero e Historia y el llenado de `galleryPhotos`. |
| 2026-11-09 | Fotos verificadas en el navegador (se ven pixeladas por su resolución de archivo). Creada `docs/guia-proyecto.html` y su PDF con Next, estilos, catálogo de clases, imágenes, `PhotoPlaceholder`, FAQ y glosario. |
| 2026-11-09 | Revisión Fase 8: detectados `group-hover_scale-105`, grid fuera del contenedor, `alt` "Sonia y David" y dos imports sin usar. Fase 9 (FAQ) entregada con `<details>` nativo y `faqItems` en `wedding-data.ts`. |
| 2026-11-10 | Fotos reemplazadas por versiones en alta resolución y rutas centralizadas en `featuredPhotos`. El cliente pide 9 cambios nuevos (roadmap ampliado a Fase 18) y **Oracle en lugar de PostgreSQL**. Fase 10 entregada: `+` como imagen, flecha de Hospedaje corregida, Historia justificada. |
| 2026-11-10 | Confirmados horarios (5:00 ceremonia, 6:30 fotos, 8:00 recepción, 9:00 baile de novios, 9:30 pastel, 10:00 baile general) y vestimenta (traje azul / vestido blanco). Creado `docs/plan-fases.pdf`. Fase 11 (Bienvenida) entregada. |
| 2026-11-10 | Revisión de la Fase 11: `tsc` y `eslint` sin errores. Fase 10 confirmada como pegada. Detectados typos de texto en `welcome` y `faqItems`, el monograma `P & M` del Header y el `metadata.title`. Nombres corregidos en los HTML de `docs/`. |
| 2026-11-10 | Fase 12 (Cronograma) entregada: `schedule` en los datos, `Cronograma.tsx` con onda SVG desde `lg`, lista vertical en móvil, ancla `#cronograma` en el Header y salida de "Hospedaje" del menú. |
| 2026-11-10 | Fase 12 verificada. Corregidos `lg-hidden` (guion en vez de dos puntos, la trampa de Tailwind en silencio), un `import { it } from "node:test"` autoinsertado por el editor, `border-cream` sin `border-2` y un "tiemponos" pegado. El Header quedó con 7 enlaces al quitar "Inicio" (el logo ya cumple esa función). |
| 2026-11-10 | Fase 13 (Vestimenta con imágenes) entregada: `dressCode` con `groom` / `bride`, dos cards `aspect-[3/4]` y la nota de los dos colores reservados. Medidas de las fotos revisadas: la del novio sirve, la de la novia está en 178×167 y hay que pedirla en alta. |
| 2026-11-10 | Revisión de la Fase 13: `tsc` y `eslint` limpios, pero detectado un typo silencioso: `text-terracota` (falta una "t") en el label "Ellos"/"Ellas", que deja el color en el heredado. Avisado para corregir. |
| 2026-11-10 | Fase 14 (Carrusel de Historia) entregada: `historyPhotos` en los datos, `HistoriaCarrusel.tsx` con `"use client"`, fundido por opacidad, pausa al hover/focus, respeto a `prefers-reduced-motion` y puntos accesibles. Reemplaza la foto fija de `NuestraHistoria`. Fotos reales: `historias.jpg` (3500×2333) e `historia2.png` (1672×941). |
| 2026-11-10 | Revisión de la Fase 14: detectados dos imports sin usar (`event` en el carrusel y `featuredPhotos` en `NuestraHistoria`) y un **error** de ESLint nuevo: `react-hooks/set-state-in-effect` por leer el matchMedia con `setState` en el cuerpo del efecto. Solución: `useSyncExternalStore`. Verificada con ESLint en un archivo temporal. |
| 2026-11-10 | Fase 15 (Galería collage + lightbox) entregada: `size` y `caption` en `GalleryPhoto`, `Galeria.tsx` como client component con grid de tamaños (`dense`, `auto-rows`) y `Lightbox.tsx` con `<dialog>` nativo. Verificada con ESLint y `tsc` en archivos temporales. |
| 2026-11-10 | Pausa: la Fase 15 quedó a la mitad de pegar y sin verificar. `AGENTS.md` actualizado con el punto exacto y lo que falta, para retomarla en casa. |
| 2026-11-11 | Fase 15 verificada: `text-cream`, `ArrowRight` y los textos de `galleryPhotos` corregidos; caption sobre la foto con `aspect-[16/10]` y `object-cover`. Detectado un último typo: `obsolute` en el `div` del degradado, que deja el caption sin velo sobre la foto. |
| 2026-11-11 | Fase 16 (Despedida y agradecimientos) entregada: `farewell` en los datos y `Despedida.tsx`, sección café con texto crema antes del Footer. |
| 2026-11-11 | Fase 16 implementada y vista: el cliente prefirió `bg-ink` y detectó el salto brusco FAQ (café) → Despedida (tinta). Solución: degradado `bg-linear-to-b from-coffee to-ink`. Detectado otro `text-terracota` en el kicker. |
| 2026-11-11 | El cliente pide música de fondo y una **cortina de bienvenida** (autoplay bloqueado). Se reordena el roadmap: Fase 17 Footer, Fase 18 Cortina + música, Fase 19 RSVP + Oracle (última, puede ser modal). Canción: `public/music/Opalite (Life Is A Song Acoustic Version).mp3` (5.56 MB). |
| 2026-11-11 | Creado `docs/plan-cortina.html` y `docs/plan-cortina.pdf` con la cortina, la música, el degradado, los hoteles con foto y el nuevo roadmap. |
| 2026-11-12 | Fase 18 implementada y verificada: la cortina abre la página y la música suena. El archivo fue renombrado a `public/music/Opalite.mp3`. Detectados tres typos: `z[100]` (sin el guion; el Header quedaba por encima de la cortina), `text-5l` y `rouded-full`. |
| 2026-11-12 | Fase 17 (Footer) entregada: foto del Hero con velo, identidad de la boda y bloque de contacto del desarrollador (`site.developer`) con enlaces `mailto:` y `tel:`, más "Volver arriba". |
| 2026-11-12 | Fase 17 y 18 verificadas. Los tres typos de la cortina corregidos. El cliente rellenó `site.developer` con sus datos, quitó el bloque de nombres del Footer y pidió quitar la foto de fondo (queda `bg-ink` plano). Dos avisos de ESLint pendientes por imports sin usar. |
| 2026-11-12 | El Footer se queda como "carta de presentación" del desarrollador, sin bloque de nombres. |
| 2026-11-12 | Especificaciones del RSVP recibidas: modal desde el botón "Confirmar", campos nombre/email/cuántos asisten/restricciones, correo de confirmación, y **dashboard aparte** con login y tabla. Creado `docs/plan-rsvp.html` y `docs/plan-rsvp.pdf` con teoría, conceptos y todo el código (Oracle, oracledb, pool, DDL, binds, server action, Resend/Nodemailer, Auth.js, dashboard). Pendiente la cuenta de Oracle. |
| 2026-11-16 | El cliente descarta RSVP, Hospedaje y Preguntas frecuentes. Se eliminan `Hospedaje.tsx` y `PreguntasFrecuentes.tsx` del sitio; el Header todavía conserva esos enlaces y el de Cronograma. Creado `docs/plan-otonal.html` y `docs/plan-otonal.pdf` (17 páginas) con la nueva paleta otoñal, la composición a la izquierda, los arcos, la fecha vertical, el modal de Historia y el carrusel de Galería de tres fotos. Implementación por pasos pendiente. |
| 2026-11-17 | Pasos 1 y 2 pegados: `tsc` y `eslint` limpios. Detectados el typo `--color-coffee: #4a0e20` (debe ser `#4a2e20`), `próposito` en `history.title` y `esta` en `dressCode.groom.note`. `eventParts` produce LUNES · 28 · 12 · 2026, correcto para la fecha real. Paso 3 entregado: `ArcoFoto` y `FechaVertical`. |
| 2026-11-17 | Revisión del Paso 3: `ArcoFoto` tenía el `sizes` mal formado (`"min-width: 1024px 33vw, 90vw"`); debe ser `"(min-width: 1024px) 33vw, 90vw"`. Paso 4 entregado: Hero abajo-izquierda y Bienvenida de tres columnas con arco y fecha vertical. |
| 2026-11-17 | Ajustes pedidos tras ver el Paso 4, aplicados en `Hero.tsx`, `Bienvenida.tsx` y `FechaVertical.tsx`: Hero sin `mx-auto` y con `lg:pl-20`, arco a `lg:col-span-5` con `sizes` 40vw, serif en itálica, `text-justify` en el mensaje, padding `py-14 lg:py-16` y fecha sin panel oscuro ni kicker "La fecha", con `border-l border-terracotta/80 pl-6` como en el Hero. `tsc` y `eslint` limpios. |
| 2026-11-17 | Segunda revisión de Bienvenida: se quitó la línea de la fecha, se corrieron el texto (`lg:pl-8`) y la fecha (`pl-8 lg:pl-10`) a la derecha, se cambió el padding a `pb-10 pt-14 lg:pb-0 lg:pt-16` para que el arco termine justo donde empieza la siguiente sección, y se bajó su altura a `aspect-[4/5]` para que no se vea alargado. `tsc` y `eslint` limpios. |
| 2026-11-17 | Cascada del Hero en Bienvenida: columna derecha con la foto del Hero (`hidden lg:block`), degradado `from-ink/50 via-cream/70 to-cream` y fundido izquierdo `from-cream`, con la fecha encima. El padding superior se movió a las columnas de texto y arco para que la cascada empiece en el borde superior de la sección. |
| 2026-11-17 | Paso 5 implementado: `HistoriaModal.tsx` con `<dialog>` nativo, cierre por Escape/botón/backdrop y foco que regresa al botón; `NuestraHistoria.tsx` reescrita con texto justificado a la izquierda, `HistoriaCarrusel` en modo `arco` que sangra al borde derecho y botón que abre el modal. `HistoriaCarrusel` recibe la prop `arco` sin romper la versión original. `tsc` y `eslint` limpios; modal verificado en navegador. |
| 2026-11-17 | Ajustes de Historia y Bienvenida: sección de Historia compacta (`pb-0 pt-12 lg:pt-14`), imagen estática en arco (`aspect-square max-w-[26rem]`) con `mask-image` que desvanece el lado izquierdo y borde inferior pegado a la sección siguiente; Bienvenida aumenta la separación a `lg:gap-16`. |
| 2026-11-17 | Paso 6 implementado: `CuentaRegresiva` en dos columnas con el texto a la izquierda (`Countdown` acepta `className`); `ElGranDia` absorbe el cronograma vertical y usa arco central con `ceremony.image`; Header reducido a cuatro enlaces; `Cronograma.tsx` eliminado y su import quitado de `app/page.tsx`. `tsc` y `eslint` limpios. |
| 2026-11-17 | Paso 7 implementado: `Galeria.tsx` pasa de collage a tres fotos cuadradas enmarcadas. El índice `inicio` y el módulo calculan las tres visibles; el botón circular avanza de una en una y vuelve al principio. Cada foto abre el `Lightbox` con su índice real, así que el texto y las flechas del teclado siguen igual. `tsc` y `eslint` limpios. |
| 2026-11-17 | Paso 8 implementado y verificado: `CodigoVestimenta.tsx` queda solo con texto (una línea por novio con `dressCode.groom/bride.title` y `.note`) y se eliminan `image`/`alt` de `dressCode` en los datos; `Despedida.tsx` alinea el contenido a la izquierda con borde `terracotta`, firma `Sonia & David` y halo radial contenido por `overflow-hidden`. Sin fotos en Vestimenta ni en Despedida, sin desbordamiento horizontal y sin errores de consola. `tsc` y `eslint` limpios. |
| 2026-11-17 | Ajustes finales pedidos por el cliente: Hero a `min-h-[90svh]`; Bienvenida con `lg:gap-20`, columnas 4/4/4, arco `aspect-square max-w-[26rem]`, día destacado en serif itálica y sin línea; Nuestra Historia con texto arriba (`items-start`), sin `mask-image` y foto en todo el lado derecho con `rounded-tl-[100%_100%]` (se añadió la prop `forma` a `ArcoFoto`); El Gran Día con dos títulos, tres datos con iconos SVG y botón centrado. Verificado a 1000 px y 1440 px; `tsc` y `eslint` limpios. |
| 2026-11-17 | Creada `docs/guia-cambios-otonal.html` y su PDF con el resumen de fases, todos los cambios, el diccionario de clases, palabras reservadas, el funcionamiento de Tailwind 4 y recetas para modificar fotos, tamaños, degradados y colores por sección. Generado con Edge headless (`--print-to-pdf`). |
| 2026-11-17 | Tres ajustes pedidos por el cliente: Bienvenida con columnas 5/4/3 y arco empujado al borde inferior (`flex flex-col justify-end`); fecha con LUNES en `text-ink` y números apilados en vertical (sin línea); arco de Historia cambiado de `rounded-tl-[100%_100%]` a `rounded-tl-[6rem]` (borde recto y pequeña onda arriba). Verificado a 1440 px: arco de Bienvenida en el mismo borde que la sección, color `rgb(30,22,17)`, números verticales y radio `96px`. `tsc` y `eslint` limpios. El PDF queda pendiente hasta la confirmación del cliente. |
| 2026-11-17 | Tres ajustes finales: fecha con los números centrados bajo LUNES (`lg:items-center`); arco de Bienvenida más alto con `lg:flex-1 lg:aspect-auto` (370 px, borde superior alineado con el título "Un día para celebrar" en 1144 px y borde inferior en 1514 px igual que la sección); foto de Historia a media altura (`bottom-0 h-1/2`, 240 px de 480 px, anclada abajo). Se probó `lg:h-[calc(100%-4rem)]` pero dio 306 px; `flex-1` resolvió el espacio exacto. Verificado a 1440 px: todo alineado, sin errores de consola, `tsc` y `eslint` limpios. Sin PDF: el cliente decidirá en el siguiente prompt. |
| 2026-11-17 | Aclaración del cliente sobre la onda: la foto de Historia vuelve a ocupar todo el alto (`inset-y-0`, 480 px) y se cambia `rounded-tl-[6rem]` por `rounded-tl-[100%_50%]`, que es la mitad izquierda del `rounded-t-full` de las demás secciones (radio horizontal 712 px = 100 % del ancho, vertical 240 px = 50 % del alto): el borde baja recto y la onda arranca en la mitad. En Bienvenida se ensancha la columna de la fecha de 3 a 4 columnas; al quitar la columna al texto el título se partía en dos líneas, así que se le quita al arco (5/3/4: 413 / 216 / 339 px). Verificado a 1440 px, `tsc` y `eslint` limpios. PDF aún pendiente. |
| 2026-11-17 | Segundo ajuste de la curva: `rounded-tl-[100%_50%]` se veía muy alargada (712 px de radio horizontal), así que se cambia por `rounded-tl-[15rem_50%]` (240 px × 240 px): un cuarto de círculo que cierra en x=240 de 712 px, mucho antes de la esquina. En El Gran Día se centra el programa del día dentro de su columna con `mx-auto max-w-[16rem]` (256 px en una celda de 341 px, 43 px de espacio a cada lado) para repartir el blanco que quedaba a la derecha. Verificado a 1440 px, `tsc` y `eslint` limpios. PDF aún pendiente. |
| 2026-11-17 | Ajuste final de Bienvenida aprobado por el cliente: texto más pegado al borde izquierdo con el tope derecho fijo (`lg:pl-4`), arco de vuelta a 4 columnas (315×370 px, mismo ancho que la foto de El Gran Día) y fecha más estrecha y corrida a la derecha (`lg:col-span-3 lg:-mr-10`). Columnas 413 / 315 / 256 px a 1440 px, título en una línea y arco alineado con el título y el borde inferior de la sección. Creado `docs/especificaciones-finales-otono.html` y su PDF (13 páginas, 468 KB) con paleta, código final por sección, mapa de fotos, mapa de tamaños/formas, recetas y medidas de referencia; el PDF antiguo queda como histórico. `tsc` y `eslint` limpios; `next dev` verificado sin errores de consola. |
| 2026-11-18 | Reajuste de Bienvenida tras la referencia visual: texto a `lg:pl-2` y `max-w-2xl` sin justificar; arco cuadrado de 315×315 px (`aspect-square w-full`) centrado con el texto con `justify-center`, sin `flex-1` para evitar el colapso a 0 px; columna derecha con la foto del Hero, overlay `bg-ink/60`, fundido izquierdo de 32 px, línea vertical `bg-terracotta/60` y fecha en crema (`lg:text-cream`). `FechaVertical` apila y centra los números en móvil (`flex flex-col items-center`). Verificado a 1440 px: arco visible de 315×315, columnas 413 / 315 / 256, fecha de 109 px, `colorDia = rgb(244,233,216)`, `centradoConTexto = true`, sin errores de consola. `tsc` y `eslint` limpios. PDF pendiente de regenerar. |
| 2026-11-18 | Bienvenida ajustada al nuevo pedido: arco centrado en la sección con `--ancho-arco`/`--alto-arco` (384×346 px a 1440 px, 288×256 px a 1024 px, 342×342 px a 390 px); párrafo justificado con las mismas clases que Historia (Montserrat 16 px / 26 px, 464 px de ancho a 1440 px) y firma subida con `mt-4`; panel del Hero reescrito con los velos de la sección anterior y `w-[calc(50%-var(--ancho-arco)/2)]`, de modo que empieza exactamente en el borde derecho del arco (x=912 a 1440 px) y llega al borde derecho sin huecos. Se corrigió además que los absolutos se midieran contra el contenedor interior de altura cero: se quitó `relative` de ese contenedor. Verificado a 390, 1024 y 1440 px sin desbordamiento, fecha centrada en móvil y `tsc`/`eslint` limpios. PDF pendiente de aprobación. |
| 2026-11-18 | Segundo ajuste pedido para la misma sección: el arco ya no usa `--alto-arco`, sino `lg:inset-y-0` con `lg:h-full`, así que mide 384×480 px a 1440 px y termina exactamente donde empieza la siguiente sección. Se sustituyó el panel derecho rectangular por una única capa de Hero (`absolute inset-y-0 left-1/2 right-0`) detrás del arco: la foto y sus velos siguen hasta el borde derecho y rellenan la cuña curva de la esquina superior derecha que antes quedaba crema, sin costura porque es la misma imagen. La línea terracota se movió a `top-1/2 bottom-0` para acompañar solo el tramo recto del arco. Verificado a 1440 px: arco y sección comparten top/bottom (810/1290), capa del Hero de 720 a 1440 y línea en x=912 desde y=1050; `tsc` y `eslint` limpios. PDF pendiente de aprobación. |
| 2026-11-18 | Cliente aprueba el efecto continuo. Se hacen solo dos cambios mínimos: se elimina el enlace/flеcha `a[href="#bienvenida"]` del final de `Hero.tsx` y se quita el `div` con `w-px bg-terracotta/60` de `Bienvenida.tsx`, junto con su comentario. Verificado en navegador: `flechaHero = false`, `lineasEnBienvenida = 0`, mismas ocho secciones y sin errores de consola. `tsc` y `eslint` limpios. Creado `docs/efecto-continuo-bienvenida.html` y su PDF de 13 páginas (347 KB) con la teoría completa de capas, `border-radius`, `clamp`, `fill`/`object-cover`, degradados, contraste, código final, medidas y recetas. `docs/especificaciones-finales-otono.pdf` sigue pendiente de regenerar solo si el cliente lo pide. |
| 2026-11-18 | Ajuste de la onda de Nuestra Historia pedido por el cliente: la foto ya ocupaba bien todo el lado derecho, pero se quería que la curva arrancara un poco más abajo y cerrara un poco más a la derecha. Se cambia `forma="rounded-tl-[15rem_50%]"` por `rounded-tl-[18rem_60%]` en `NuestraHistoria.tsx` (240×240 → 288×288 px), manteniendo el cuarto de círculo. Verificado a 1440 px: onda inicia en y=1578 (antes 1530) y termina en x=1000 (antes 952), con 192 px de borde recto abajo y 424 px arriba; a 1024 px quedan 216 px de recto arriba y 192 abajo; a 390 px la versión móvil sigue con `rounded-t-full` y no se afecta. Sin desbordamiento horizontal, `tsc` y `eslint` limpios, sin errores de consola en carga limpia. |
| 2026-11-18 | Tres ajustes finales pedidos por el cliente, sin deshacer la estructura: (1) Bienvenida: `lg:pr-6` en el párrafo izquierdo, separación del arco 12 → 36 px; (2) franja divisoria en `app/page.tsx` entre Bienvenida e Historia: `<div aria-hidden="true" className="h-1 bg-terracotta"/>` (4 px, color computado `rgb(180,101,58)`, sin texto); (3) El Gran Día: `lg:translate-x-6` en el grid (contenido 24 px a la derecha, blanco derecho 161 → 137 px) y cronograma centrado con `text-center` en el título y `px-9` en vez de `pl-9` en cada `li` (centros de título y texto en x=1118). Verificado a 1440 px sin desbordamiento, `tsc` y `eslint` limpios. Creado `docs/ajustes-finales-y-efecto-onda.html` y su PDF de 11 páginas (374 KB) con los tres cambios, énfasis en la onda de Historia (dónde y cómo cambiar forma y tamaño) y las respuestas al cliente sobre la fecha, con código propuesto para quitar la foto y dejar solo continuidad de color. Ese código NO está aplicado. |

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
