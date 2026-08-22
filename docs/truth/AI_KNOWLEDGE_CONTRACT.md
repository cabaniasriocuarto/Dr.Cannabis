# AI KNOWLEDGE CONTRACT — Dr. Cannabis

Tracks: #10, #21–#29, #14
Android contract: `docs/architecture/ANDROID_ON_DEVICE_AI.md`
Mobile UX: `docs/product/MOBILE_SPLIT_WORKSPACE_SPEC.md`

## 1. Objetivo

El chatbot comprende preguntas libres en lenguaje natural, recupera conocimiento local, usa datos actuales y herramientas deterministas, y redacta respuestas con citas.

No reemplaza el solver ni los módulos de cálculo. No depende de preguntas/respuestas precargadas.

Preguntas sugeridas pueden existir como onboarding, pero el usuario siempre puede escribir una consulta arbitraria dentro del alcance técnico.

## 2. Arquitectura lógica

```text
Chat UI
  → ChatOrchestrator
    → ChatRepository
    → ContextProvider
    → KnowledgeRetriever
    → ToolRegistry
    → AiProvider
  → citations/artifacts/persistence
```

Todos los contratos son tipados, versionados y validados en runtime.

## 3. Fuentes en orden de autoridad

1. contexto JSON actual de la app;
2. datos locales SQLite/dataset canónico;
3. Prompt Maestro versionado;
4. knowledge base local versionada;
5. rangos genéricos solo como fallback explícito.

Una fuente de menor prioridad no puede sobrescribir silenciosamente un dato de mayor prioridad.

## 4. Contexto estructurado

Cuando exista:

- idioma/locale;
- plataforma/capabilities;
- usuario/workspace sin datos innecesarios;
- cultivo/campaña/sector;
- fase fenológica;
- sistema de cultivo;
- volumen;
- objetivos PPM/EC/pH;
- agua base disponible;
- receta/resultados del solver;
- inventario/lotes/costos;
- lecturas de riego/drenaje;
- ambiente/luz;
- resultados VPD/CFM/toolboxes;
- alertas;
- ruta/módulo/artifact activos;
- thread y snapshot de contexto relevante.

El contexto se transporta separado del texto del usuario; no se concatena sin schema ni presupuesto.

## 5. Contratos mínimos

```ts
type ChatThread = {
  id: string;
  title: string;
  language: 'es' | 'en' | 'pt-BR';
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  archived: boolean;
  sectorId?: string;
  campaignId?: string;
  moduleId?: string;
};

type ChatMessage = {
  id: string;
  threadId: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  status: 'complete' | 'partial' | 'cancelled' | 'failed';
  createdAt: string;
  citations: CitationRef[];
  artifacts: ArtifactRef[];
};

type CitationRef = {
  sourceId: string;
  sourceVersion: string;
  sectionId?: string;
  title: string;
  locator?: string;
};
```

Schemas finales pertenecen a #21. IDs/timestamps/order deben ser deterministas y serializables.

## 6. Historial

- persistencia local;
- búsqueda local por título/contenido/metadatos;
- no requiere LLM ni Internet;
- crear, abrir, renombrar, fijar, archivar y eliminar según política;
- borrador por thread;
- snapshot de contexto y artifact asociados;
- migraciones versionadas;
- lista virtualizada para escala;
- no guardar secrets, claves ni contenido técnico interno innecesario.

## 7. Knowledge ingestion

Cada documento/chunk registra:

- `sourceId`;
- título/tema/subtema;
- versión/hash;
- idioma;
- fase/sistema aplicables;
- provenance;
- estado canónico/candidato/retirado;
- texto normalizado;
- locator/sección;
- embedding version cuando exista.

Reglas:

- pipeline reproducible e idempotente;
- deduplicación;
- no promover contenido dudoso;
- documento retirado no se recupera;
- embeddings son índice, no fuente de verdad;
- knowledge/model/embedding compatibility explícita.

## 8. RAG híbrido

Combinar:

- búsqueda exacta/FTS para fórmulas, variedades, productos, códigos y siglas;
- búsqueda semántica para intención, paráfrasis y multilingüe;
- filtros por metadatos;
- ranking/fusión documentados;
- top-k y presupuesto de contexto acotados;
- umbral de relevancia;
- abstención/pregunta aclaratoria ante no-match.

Nunca enviar toda la biblioteca al modelo.

## 9. Citas

Toda afirmación técnica recuperada debe poder apuntar a:

- fuente;
- versión;
- sección/locator cuando exista.

Las citas deben abrir el detalle exacto en el visor móvil/desktop mediante `ArtifactRef` o `CitationRef`.

No inventar una cita ni asociarla a un texto que la fuente no soporta.

## 10. Tool calling

El bot usa herramientas para:

- leer cultivo/sector/campaña;
- leer targets/lecturas/inventario;
- ejecutar solver;
- calcular VPD;
- calcular CFM;
- consultar productos/semillas/knowledge;
- generar artifacts/tablas/gráficos;
- ejecutar otras funciones aprobadas.

Reglas:

- registry allowlisted;
- input/output validados;
- read-only por defecto;
- timeouts/cancelación/idempotencia;
- tool result proviene del dominio real;
- el modelo no fabrica `ToolResult`;
- una mutación requiere intención explícita + confirmación UI + persistencia verificable;
- trace tool-call→result→answer/artifact.

## 11. Providers

Interfaces desacopladas:

```ts
interface AiProvider {
  getCapabilities(): Promise<AiCapabilities>;
  ensureReady(signal?: AbortSignal): Promise<AiReadyReport>;
  generateStream(request: AiGenerateRequest, signal?: AbortSignal): AsyncIterable<AiStreamEvent>;
  dispose(): Promise<void>;
}

interface EmbeddingProvider {
  embed(request: EmbeddingRequest, signal?: AbortSignal): Promise<EmbeddingResult>;
}
```

### Android

- Capacitor/Kotlin;
- Google LiteRT-LM;
- Gemma como familia candidata;
- modelo/configuración/requisitos solo después de #27;
- manifest/hash/licencia/provenance;
- sin API paga/key/PC/Wi-Fi;
- offline posterior a assets;
- sin fallback cloud oculto.

### Windows

- provider local controlado por Electron main/adaptador;
- runtime/modelo seleccionados por benchmark;
- renderer sin acceso a proceso/modelo;
- offline, streaming, cancelación y shutdown limpio;
- sin fallback cloud oculto.

### Test

Fakes explícitos solo para tests. Un fake no prueba calidad/compatibilidad del provider real.

## 12. Orquestador

Pipeline:

1. validar input;
2. cargar thread/workspace/contexto;
3. recuperar knowledge;
4. seleccionar/ejecutar tools;
5. construir prompt estructurado con presupuesto;
6. generar por streaming;
7. validar/adjuntar citas/artifacts;
8. persistir turno completo/parcial/cancelado;
9. actualizar UI/visor.

Estados:

```text
idle
preparing
retrieving
tooling
generating
completed
partial
cancelled
failed
degraded
model-not-ready
offline-assets-missing
```

Cancelación se propaga a cada etapa. Retry no duplica mensajes ni mutaciones.

## 13. Reglas de respuesta

- responder en ES/EN/PT-BR según app/usuario;
- diagnóstico/idea principal primero;
- acciones concretas;
- pedir solo 1–2 datos clave cuando falten;
- separar dato interno, inferencia y rango genérico;
- citar fuentes usadas;
- mostrar datos/cálculo/tool usados cuando corresponda;
- no inventar pureza, composición, medición, target, tool result o fuente;
- reconocer incertidumbre;
- no afirmar que modificó BD sin acción confirmada y resultado real;
- no ocultar estado degradado o falta de evidencia.

## 14. Coordinación con visor

El bot puede producir/abrir:

- tablas;
- gráficos;
- formulaciones;
- comparaciones objetivo/logrado;
- imágenes/documentos;
- resultados de tools;
- fuentes/citas.

La conversación muestra resumen + acción; el visor contiene el artifact completo. El chat no cubre el visor en Android.

## 15. Seguridad y límites

- sin consejo médico/consumo humano;
- sin asesoría legal definitiva;
- sin promover venta/distribución;
- sin procesos peligrosos fuera del cultivo técnico;
- sin control autónomo de equipos;
- no exfiltrar chats/datos por defecto;
- telemetría de contenido desactivada por defecto;
- prompts internos, paths y errores sensibles no se exponen;
- contenido renderizado se sanitiza.

## 16. Offline y costos

La inferencia local no genera costo por mensaje para el operador del producto.

Puede requerirse Internet para instalar/actualizar app, modelo o knowledge. Esa operación se separa de la inferencia y se declara al usuario.

Después de instalar assets:

- chat;
- RAG;
- tools;
- historial;
- citations;
- datos/cálculos

deben funcionar en modo avión dentro de las capacidades declaradas.

## 17. Model manifest y compatibilidad

Registrar:

- model/runtime version;
- formato/cuántización/contexto;
- size/hash/license/source;
- idiomas validados;
- min/recommended profile;
- evaluation run;
- knowledge/embedding compatibility.

`pending` no llega a release. Assets incompatibles/corruptos no se activan.

## 18. Evaluación

Corpus mínimo versionado de 100+ preguntas por categorías, con ES/EN/PT-BR y variantes:

- contexto completo/incompleto/contradictorio;
- no evidence;
- RAG/citations;
- tools;
- límites/out-of-scope.

Métricas:

- groundedness;
- hallucination;
- retrieval precision/recall;
- citation correctness;
- tool selection/arguments;
- abstención;
- multilingüe;
- first-token latency/throughput;
- RAM/storage/battery/thermal;
- crash/ANR/OOM.

Umbrales se fijan antes de seleccionar modelo/configuración.

## 19. Casos obligatorios

- pregunta libre no precargada;
- contexto completo;
- contexto incompleto;
- contradicción usuario vs BD;
- composición no disponible;
- sal/semilla no registrada;
- pregunta fuera de alcance;
- no-match RAG;
- cita retirada/incompatible;
- tool correcta/incorrecta/argumento inválido;
- cancelación/retry/background;
- modelo no listo/corrupto/incompatible;
- ES/EN/PT-BR;
- no alucinación de valores;
- PPM/EC/pH calculados por app;
- mode airplane/network capture;
- Android y Windows providers reales.

## 20. Done

B9 se considera terminado solo cuando #21–#29 están cerradas, los providers reales pasan benchmark/offline, RAG/tools/citas/historial funcionan, ES/EN/PT-BR pasan y truth/feature map están sincronizados.
