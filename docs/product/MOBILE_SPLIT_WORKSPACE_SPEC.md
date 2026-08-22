# MOBILE SPLIT WORKSPACE SPEC — Dr. Cannabis

Status: `CANONICAL_PRODUCT_DECISION_PENDING_GOV_02_MERGE`
Tracks: #16, #11, #30–#36, #53

## 1. Objetivo de experiencia

El usuario móvil debe poder conversar y, al mismo tiempo, observar información técnica, imágenes, tablas, gráficos, recetas, resultados y fuentes.

El chat tiene dos estados explícitos:

- `EXPANDED_SPLIT`: ocupa las dimensiones canónicas 50/50;
- `MINIMIZED_BUBBLE`: desaparece como panel y queda una burbuja pequeña fija abajo a la izquierda.

El chat no usa pantalla completa. Cuando está minimizado, el visor o módulo activo utiliza todo el espacio útil.

## 2. Modelo de presentación

```ts
type MobileChatPresentation = 'expanded_split' | 'minimized_bubble';

type MobileChatUiState = {
  presentation: MobileChatPresentation;
  activeThreadId?: string;
  activeArtifactId?: string;
  historyRatio: number;
  draftByThread: Record<string, string>;
  generationState:
    | 'idle'
    | 'preparing'
    | 'retrieving'
    | 'tooling'
    | 'generating'
    | 'completed'
    | 'cancelled'
    | 'failed'
    | 'degraded';
};
```

La presentación del chat es estado de UI. No modifica ni reinicia el thread, el modelo, el cultivo, el módulo, el artifact ni la navegación.

## 3. Estado expandido: `EXPANDED_SPLIT`

### 3.1 Teléfono en portrait

```text
┌──────────────────────────────┐
│ VISOR / WORKSPACE            │ 50% alto útil
│ imagen, tabla, gráfico, etc. │
├──────────────────────────────┤
│ HISTORIAL + BUSCADOR         │ parte superior del 50% de chat
├──────────────────────────────┤
│ CONVERSACIÓN ACTIVA          │ resto del 50% de chat
│ mensajes + composer          │
└──────────────────────────────┘
```

- visor: 50% del área útil;
- chat: 50% del área útil;
- el teclado se administra dentro del panel de chat;
- el visor permanece visible y conserva su estado.

### 3.2 Landscape y tablet

```text
┌─────────────────────┬─────────────────────┐
│ VISOR / WORKSPACE   │ HISTORIAL           │
│ 50% ancho           ├─────────────────────┤
│                     │ CONVERSACIÓN        │
│                     │ 50% ancho total     │
└─────────────────────┴─────────────────────┘
```

- visor: 50% del ancho útil;
- chat: 50% del ancho útil;
- historial arriba y conversación abajo dentro del chat.

### 3.3 Regla del split expandido

- ratio fijo 50/50 en MVP;
- no usar overlay que tape el visor;
- no mostrar chat full-screen;
- no mover información crítica a un modal que cierre la conversación;
- ambas mitades tienen scroll independiente;
- redimensionamiento libre del split principal requiere nueva decisión y pruebas.

## 4. Estado minimizado: `MINIMIZED_BUBBLE`

```text
┌──────────────────────────────┐
│                              │
│ VISOR / MÓDULO ACTIVO        │
│ ocupa todo el espacio útil   │
│                              │
│                              │
│  ● Dr. Cannabis              │ burbuja inferior izquierda
└──────────────────────────────┘
```

Al minimizar:

- el panel de chat deja de participar del layout;
- el visor o módulo activo se expande al área útil completa;
- no se pierde ni se desmonta el chat;
- queda una única burbuja fija en la esquina inferior izquierda;
- no aparece una ventana flotante del sistema Android;
- no se crea un overlay de pantalla completa.

### 4.1 Burbuja minimizada

- posición fija: abajo a la izquierda dentro de safe areas;
- no arrastrable en MVP;
- offset definido por design tokens y `safe-area-inset-left/bottom`;
- diámetro visual objetivo: 44–48 dp;
- hit target accesible mínimo: 48 × 48 dp;
- icono inequívoco de Dr. Cannabis/chat;
- label accesible: `Abrir Dr. Cannabis`;
- visible sin tapar navegación crítica, botones de guardado ni contenido esencial;
- no puede salir fuera de pantalla por rotación, teclado, densidad o barras del sistema.

### 4.2 Señales de estado

La burbuja puede mostrar, sin revelar contenido sensible:

- actividad de generación;
- badge de respuesta nueva/completada;
- advertencia de error o modelo no disponible.

Minimizar no pausa ni cancela una generación. La cancelación requiere una acción explícita.

## 5. Transiciones

### 5.1 Minimizar

La acción se inicia desde un botón explícito en el encabezado del chat.

Debe:

1. cerrar el teclado de forma controlada;
2. persistir el estado del chat y del visor;
3. cambiar `presentation` a `minimized_bubble`;
4. expandir el visor/módulo al espacio completo;
5. mantener cualquier generación activa;
6. usar una animación breve que respete `prefers-reduced-motion`.

No debe:

- cancelar una generación;
- borrar borradores;
- cambiar de thread;
- reiniciar el modelo;
- perder mensajes parciales;
- perder artifact, zoom, pan, scroll, filtros u orden;
- cambiar cultivo, campaña, sector o módulo.

### 5.2 Restaurar

La restauración se inicia al tocar, hacer click o activar por teclado la burbuja.

Debe:

1. cambiar `presentation` a `expanded_split`;
2. restaurar el mismo thread;
3. restaurar historial, conversación y divisor interno;
4. restaurar borrador y generación;
5. restaurar artifact, zoom, pan, scroll, filtros y orden;
6. conservar el módulo/cultivo/campaña activos.

No fuerza foco al composer si el usuario estaba inspeccionando contenido. Si hubo una respuesta nueva, el último mensaje se enfoca solo cuando no rompe la posición elegida por el usuario.

## 6. División interna del chat expandido

Default:

- historial: 30% del panel de chat;
- conversación activa: 70% del panel de chat.

El divisor interno permite:

- mínimo historial: 25%;
- máximo historial: 45%.

La preferencia se persiste por dispositivo. No modifica el split principal 50/50.

## 7. Historial de conversaciones

### 7.1 Encabezado

- botón `Nuevo chat`;
- campo de búsqueda sticky;
- filtros accesibles sin abandonar la pantalla;
- acción para limpiar filtros;
- botón minimizar visible y accesible.

### 7.2 Búsqueda

Debe ser local y funcionar sin LLM ni Internet.

Busca por:

- título;
- contenido indexado;
- cultivo/campaña/sector;
- módulo;
- idioma;
- fecha;
- estado fijado/archivado.

### 7.3 Item de hilo

Muestra como mínimo:

- título;
- fecha/hora;
- fragmento corto;
- cultivo/módulo cuando exista;
- indicador activo;
- indicador de generación en curso/error;
- fijado/archivado.

### 7.4 Acciones

- abrir;
- renombrar;
- fijar/desfijar;
- archivar/restaurar;
- eliminar con confirmación;
- crear nuevo.

Cambiar de hilo restaura mensajes, borrador, artifact, zoom/pan/scroll y no duplica ni cancela silenciosamente una generación.

## 8. Conversación activa

### 8.1 Mensajes

- lista virtualizada;
- Markdown seguro limitado;
- tablas de respuesta pueden abrirse en el visor;
- citas tocables;
- estados de herramienta visibles cuando aportan claridad;
- copiar/seleccionar;
- retry controlado;
- no auto-scroll forzado si el usuario revisa mensajes anteriores.

### 8.2 Streaming

Etapas visibles:

```text
preparando contexto
buscando información
calculando
redactando
guardando
```

Controles:

- detener;
- reintentar;
- copiar;
- abrir fuentes/artefacto en visor;
- minimizar sin cancelar.

Una respuesta parcial o cancelada queda marcada; nunca se presenta como completa.

### 8.3 Composer

- multiline;
- enviar;
- cancelar generación;
- chips de contexto removibles cuando corresponda;
- adjuntar artifact/contexto permitido;
- borrador por thread;
- no queda oculto por teclado/IME;
- touch target accesible.

## 9. Visor / workspace

### 9.1 Tipos mínimos

- imágenes y fotos;
- tablas;
- gráficos;
- receta/formulación;
- resultado VPD/CFM/toolbox;
- documento/página;
- detalle de fuente/cita;
- comparación objetivo/logrado;
- historial/serie temporal.

```ts
type ArtifactDescriptor = {
  id: string;
  type: string;
  title: string;
  sourceThreadId?: string;
  sourceMessageId?: string;
  createdAt: string;
  payloadRef: string;
  mimeType?: string;
  provenance?: CitationRef[];
  schemaVersion: number;
};
```

### 9.2 Gestos

- pinch-to-zoom;
- pan;
- double-tap para alternar fit/zoom;
- reset;
- fit-width;
- fit-content;
- controles equivalentes para accesibilidad.

Los gestos no activan accidentalmente back navigation, cambio de hilo, scroll del chat ni refresh.

### 9.3 Imágenes

- decodificación acotada;
- placeholder/progreso;
- error recuperable;
- zoom/pan fluido;
- tiles/downsample cuando exceda el budget;
- metadatos y fuente visibles cuando corresponda.

### 9.4 Tablas

- scroll horizontal y vertical;
- encabezados sticky;
- columnas clave sticky cuando sea útil y testeado;
- zoom de contenido;
- tap de celda para detalle;
- virtualización para datasets grandes;
- exportar mediante acción explícita;
- preservación de posición, filtros y orden.

### 9.5 Gráficos

- zoom/pan cuando aplique;
- tooltip táctil;
- leyenda legible;
- alternativa tabular accesible;
- unidades y escalas explícitas;
- no ocultar datos por truncamiento.

## 10. Coordinación chat ↔ visor

Eventos mínimos:

```text
OPEN_ARTIFACT
FOCUS_CITATION
FOCUS_TABLE_ROW
SHOW_TOOL_RESULT
RESTORE_THREAD_WORKSPACE
CLEAR_VIEWER
VIEWER_STATE_CHANGED
MINIMIZE_CHAT
RESTORE_CHAT
CHAT_PRESENTATION_CHANGED
```

Reglas:

- tocar una cita abre el detalle en visor sin cerrar conversación;
- una tool puede crear/actualizar un artifact, pero no reemplaza otro sin evento explícito;
- cambiar hilo restaura su artifact;
- si no hay artifact, mostrar estado vacío útil;
- el chat muestra resumen + acción cuando la tabla completa ya está en el visor;
- minimizar/restaurar no cambia el artifact activo.

## 11. Estado persistente

Por dispositivo/workspace/thread/artifact según corresponda:

- `presentation` del chat;
- thread activo;
- artifact activo;
- zoom;
- pan;
- scroll de tabla;
- filtros/orden;
- posición de historial;
- divisor interno;
- borrador;
- posición de mensajes;
- generación y respuesta pendiente.

Rotación, background y reopen restauran el último estado válido. Ante estado corrupto, usar fallback seguro a `expanded_split` sin perder datos del thread.

## 12. Navegación Android

- con chat expandido, Back cierra primero el teclado cuando corresponda;
- el siguiente Back puede minimizar según el contrato de navegación de #20;
- con chat minimizado, Back no reabre el chat y continúa la navegación normal;
- ninguna transición cierra accidentalmente la app ni pierde trabajo.

## 13. Teclado y safe areas

- respetar notch, status bar y navigation bar;
- composer siempre visible en estado expandido;
- visor no se desmonta al abrir teclado;
- al cerrar teclado se restaura geometría sin saltos;
- la burbuja usa safe-area offsets;
- landscape con teclado mantiene un estado definido y nunca una superposición caótica.

## 14. Estados obligatorios

### Visor

- empty;
- loading;
- ready;
- unsupported;
- corrupt;
- memory-limited;
- error/retry.

### Historial

- empty;
- searching;
- no-results;
- index-rebuilding;
- error;
- ready.

### Conversación

- idle;
- preparing;
- retrieving;
- tooling;
- generating;
- cancelled;
- partial;
- model-not-ready;
- offline-assets-missing;
- failed;
- degraded.

### Presentación

- expanded-split;
- minimizing;
- minimized-bubble;
- restoring;
- presentation-error/fallback.

## 15. Accesibilidad

- tamaño táctil mínimo definido por design system;
- labels de lector de pantalla;
- burbuja con nombre, rol y estado accesibles;
- orden de foco lógico;
- controles alternativos a pinch/pan;
- contraste y escalado de texto;
- tabla accesible/alternativa;
- estado de generación anunciado sin repetir cada token;
- animaciones respetan reduced motion.

## 16. Performance budgets

Deben medirse:

- tiempo hasta shell interactivo;
- latencia de minimizar/restaurar;
- FPS/jank en zoom/pan y transición;
- RAM JS+nativa;
- memoria de imágenes;
- lista de 1.000 threads;
- conversación extensa;
- tabla grande;
- orientación/background;
- impacto concurrente del LLM;
- generación activa mientras el chat está minimizado.

No declarar PASS con emulador solamente.

## 17. Matriz visual mínima

- Android phone portrait pequeño/medio/grande;
- Android landscape;
- tablet cuando esté soportada;
- teclado abierto/cerrado;
- chat expandido/minimizado/restaurando;
- generación idle/streaming/completada/error minimizada;
- ES/EN/PT-BR;
- texto normal y ampliado;
- historial vacío/lleno;
- imagen, tabla y gráfico;
- navegación inferior y controles críticos presentes.

## 18. Criterios de aceptación del producto

1. Expandido, el chat ocupa exactamente la mitad acordada.
2. Minimizado, el visor/módulo utiliza el espacio completo y solo queda la burbuja abajo a la izquierda.
3. Restaurar recupera el mismo thread, historial, borrador, artifact, zoom y scroll.
4. El chat nunca usa pantalla completa.
5. Una generación puede continuar minimizada sin pérdida ni fuga de contenido sensible.
6. El historial está arriba de la conversación y es buscable/interactivo.
7. Imágenes, tablas y artifacts se amplían y desplazan con los dedos.
8. Chat y visor se coordinan mediante artifacts/citations.
9. Teclado, orientación, minimización y background no rompen el layout.
10. La burbuja respeta safe areas, accesibilidad y no tapa controles críticos.
11. Performance y accesibilidad pasan en dispositivos reales.
12. No existe una segunda UI funcional duplicada para Android.
