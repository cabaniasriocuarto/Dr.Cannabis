# MOBILE SPLIT WORKSPACE SPEC — Dr. Cannabis

Status: `CANONICAL_PRODUCT_DECISION_PENDING_GOV_02_MERGE`
Tracks: #16, #11, #30–#36

## 1. Objetivo de experiencia

El usuario móvil debe poder conversar y, al mismo tiempo, observar información técnica, imágenes, tablas, gráficos, recetas, resultados y fuentes.

El chat no debe ocupar toda la pantalla ni reemplazar el contenido visual.

## 2. Composición canónica

### 2.1 Teléfono en portrait

```text
┌──────────────────────────────┐
│ VISOR / WORKSPACE            │ 50% alto disponible
│ imagen, tabla, gráfico, etc. │
├──────────────────────────────┤
│ HISTORIAL + BUSCADOR         │ parte superior del 50% de chat
├──────────────────────────────┤
│ CONVERSACIÓN ACTIVA          │ resto del 50% de chat
│ mensajes + composer          │
└──────────────────────────────┘
```

- visor: `50vh` del área útil;
- chat: `50vh` del área útil;
- el teclado se administra dentro del panel de chat;
- el visor permanece visible y conserva su estado.

### 2.2 Landscape y tablet

```text
┌─────────────────────┬─────────────────────┐
│ VISOR / WORKSPACE   │ HISTORIAL           │
│ 50% ancho           ├─────────────────────┤
│                     │ CONVERSACIÓN        │
│                     │ 50% ancho total     │
└─────────────────────┴─────────────────────┘
```

- visor: `50vw`;
- chat: `50vw`;
- el chat mantiene historial arriba y conversación abajo.

## 3. Regla del split principal

MVP:

- ratio fijo 50/50;
- no colapsar el visor;
- no mostrar el chat full-screen por defecto;
- no usar overlay que tape el visor;
- no mover información crítica a un modal que cierre la conversación;
- ambas mitades tienen scroll independiente.

Cualquier futura opción de redimensionamiento del split principal requiere nueva decisión y pruebas; no se infiere automáticamente.

## 4. División interna del chat

Default:

- historial: 30% del panel de chat;
- conversación activa: 70% del panel de chat.

Se permite un divisor interno entre:

- mínimo historial: 25%;
- máximo historial: 45%.

La preferencia se persiste por dispositivo. El cambio no modifica el split principal 50/50.

## 5. Historial de conversaciones

### 5.1 Encabezado

- botón `Nuevo chat`;
- campo de búsqueda sticky;
- filtros accesibles sin abandonar la pantalla;
- acción para limpiar filtros.

### 5.2 Búsqueda

Debe ser local y funcionar sin LLM ni Internet.

Busca por:

- título;
- contenido indexado;
- cultivo/campaña/sector;
- módulo;
- idioma;
- fecha;
- estado fijado/archivado.

### 5.3 Item de hilo

Muestra como mínimo:

- título;
- fecha/hora relativa o absoluta según contexto;
- fragmento corto;
- cultivo/módulo cuando exista;
- indicador activo;
- indicador de generación en curso/error;
- fijado/archivado.

### 5.4 Acciones

- abrir;
- renombrar;
- fijar/desfijar;
- archivar/restaurar;
- eliminar con confirmación;
- crear nuevo.

Cambiar de hilo debe:

- restaurar mensajes;
- restaurar borrador;
- restaurar artifact activo;
- restaurar zoom/pan/scroll del visor;
- no duplicar ni cancelar silenciosamente una generación.

## 6. Conversación activa

### 6.1 Mensajes

- lista virtualizada;
- Markdown seguro limitado;
- tablas de respuesta pueden abrirse en el visor;
- citas tocables;
- estados de herramienta visibles cuando aportan claridad;
- copiar/seleccionar;
- retry controlado;
- no auto-scroll forzado si el usuario revisa mensajes anteriores.

### 6.2 Streaming

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
- abrir fuentes/artefacto en visor.

Una respuesta parcial/cancelada debe quedar marcada; nunca presentarse como completa.

### 6.3 Composer

- multiline;
- enviar;
- cancelar generación;
- chips de contexto removibles cuando corresponda;
- adjuntar artifact/contexto permitido;
- borrador por thread;
- no queda oculto por teclado/IME;
- touch target accesible.

## 7. Visor / workspace

## 7.1 Tipos mínimos

- imágenes y fotos;
- tablas;
- gráficos;
- receta/formulación;
- resultado de VPD/CFM/toolbox;
- documento/página;
- detalle de fuente/cita;
- comparación objetivo/logrado;
- historial/serie temporal.

Cada artifact debe tener:

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

## 7.2 Gestos

- pinch-to-zoom;
- pan;
- double-tap para alternar fit/zoom;
- reset;
- fit-width;
- fit-content;
- controles equivalentes para accesibilidad.

Gestos del visor no deben activar accidentalmente:

- back navigation;
- cambio de hilo;
- scroll del chat;
- refresh.

## 7.3 Imágenes

- decodificación acotada;
- placeholder/progreso;
- error recuperable;
- zoom/pan fluido;
- no cargar resolución completa si excede budget sin estrategia de tiles/downsample;
- metadatos y fuente visibles cuando corresponda.

## 7.4 Tablas

- scroll horizontal y vertical dentro del visor;
- encabezados sticky;
- columnas clave sticky cuando sea útil y testeado;
- zoom de contenido;
- tap de celda para detalle;
- virtualización para datasets grandes;
- exportar solo mediante acción explícita;
- preservación de posición, filtros y orden.

## 7.5 Gráficos

- zoom/pan cuando el tipo lo permita;
- tooltip táctil;
- leyenda legible;
- alternativa tabular accesible;
- unidades y escalas explícitas;
- no ocultar datos por truncamiento.

## 8. Coordinación chat ↔ visor

Eventos mínimos:

```text
OPEN_ARTIFACT
FOCUS_CITATION
FOCUS_TABLE_ROW
SHOW_TOOL_RESULT
RESTORE_THREAD_WORKSPACE
CLEAR_VIEWER
VIEWER_STATE_CHANGED
```

Reglas:

- tocar una cita abre el detalle en visor sin cerrar conversación;
- una tool puede crear/actualizar artifact, pero no reemplaza otro sin evento explícito;
- cambiar hilo restaura su artifact;
- si no hay artifact, mostrar estado vacío útil, no una pantalla rota;
- el chat no renderiza duplicada una tabla completa si ya está en el visor: muestra resumen + acción.

## 9. Estado persistente

Por thread/artifact:

- artifact activo;
- zoom;
- pan;
- scroll de tabla;
- filtros/orden;
- posición de historial;
- divisor interno 30/70 ajustado;
- borrador;
- posición de mensajes cuando sea razonable.

Rotación/background/reopen no deben perderlos salvo política de retención documentada.

## 10. Teclado y safe areas

- respetar notch, status bar y navigation bar;
- composer siempre visible;
- visor no se desmonta al abrir teclado;
- el chat puede reducir su viewport interno;
- al cerrar teclado se restaura geometría sin saltos;
- landscape con teclado debe mantener ambos paneles o mostrar un estado de ventana insuficiente definido, nunca superposición caótica.

## 11. Estados obligatorios

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

## 12. Accesibilidad

- tamaño táctil mínimo definido por design system;
- labels de lector de pantalla;
- orden de foco lógico visor→historial→conversación o según navegación explícita;
- controles alternativos a pinch/pan;
- contraste y escalado de texto;
- tabla accesible/alternativa;
- estado de generación anunciado sin repetir cada token.

## 13. Performance budgets

Los valores finales se fijan con evidencia, pero deben medirse:

- tiempo hasta shell interactivo;
- FPS/jank en zoom/pan;
- RAM JS+nativa;
- memoria de imágenes;
- lista de 1.000 threads;
- conversación extensa;
- tabla grande;
- orientación/background;
- impacto concurrente del LLM.

No declarar PASS con emulador solamente.

## 14. Matriz visual mínima

- Android phone portrait pequeño/medio/grande;
- Android landscape;
- tablet cuando esté soportada;
- teclado abierto/cerrado;
- ES/EN/PT-BR;
- texto normal y ampliado;
- historial vacío/lleno;
- chat idle/streaming/error;
- imagen, tabla y gráfico.

## 15. Criterios de aceptación del producto

1. El chat ocupa exactamente la mitad acordada.
2. El visor sigue visible durante el uso normal del chat.
3. El historial está arriba de la conversación y es buscable/interactivo.
4. El usuario puede cambiar hilos sin perder estado.
5. Imágenes/tablas/artefactos se amplían y desplazan con los dedos.
6. Chat y visor se coordinan mediante artifacts/citations.
7. Teclado, orientación y background no rompen el layout.
8. Estados de error/degradado son comprensibles.
9. Performance y accesibilidad pasan en dispositivos reales.
10. No existe una segunda UI funcional duplicada para Android.
