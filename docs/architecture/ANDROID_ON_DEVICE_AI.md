# ANDROID ON-DEVICE AI — Dr. Cannabis

Status: `PROPOSED_FOR_GOV_02`
Tracks: #16, #10, #21–#29, #38–#43

## 1. Producto esperado

El usuario instala Dr. Cannabis desde Google Play, abre la aplicación y conversa con lenguaje natural.

No debe:

- configurar una API key;
- pagar por mensaje;
- conectar una PC;
- conectarse a una red Wi-Fi local;
- elegir modelo, runtime o cuantización;
- instalar Ollama u otra aplicación auxiliar.

Después de que los assets requeridos estén instalados, la inferencia debe funcionar en modo avión.

## 2. Runtime Android canónico

La dirección técnica preferida es:

```text
React/TypeScript shared app
        ↓ Capacitor typed plugin
Kotlin Android adapter
        ↓
Google LiteRT-LM
        ↓
Gemma-family local model
```

LiteRT-LM es la integración Android objetivo. La familia Gemma es la preferida para evaluación, pero el modelo, tamaño, formato y cuantización finales solo pueden declararse canónicos después del benchmark #27.

## 3. Prohibiciones

- no fallback cloud silencioso;
- no endpoint pago incorporado como requisito;
- no enviar mensajes, contexto, fotos o datos del cultivo fuera del dispositivo por defecto;
- no llamar al runtime desde componentes React directamente;
- no ejecutar cálculos agronómicos dentro del LLM;
- no promover un modelo a release por una demo subjetiva;
- no ocultar incompatibilidad, falta de espacio o asset incompleto.

## 4. Separación de responsabilidades

### TypeScript compartido

- contexto de aplicación;
- historial y threads;
- RAG;
- tool registry;
- orchestration/state machine;
- citations/artifacts;
- validaciones y políticas;
- UI;
- i18n.

### Kotlin/Android

- lifecycle del runtime;
- carga/descarga del modelo;
- generación y streaming;
- cancelación;
- reporte de capacidades;
- memoria/thermal/background;
- acceso controlado al asset;
- eventos hacia Capacitor.

### Dominio

- solver, VPD, CFM, pH y demás cálculos;
- ninguna dependencia del modelo.

## 5. API del plugin Capacitor

Contrato conceptual:

```ts
type AndroidAiCapabilities = {
  pluginVersion: string;
  runtimeName: 'litert-lm';
  runtimeVersion: string;
  abi: string;
  ramClassMb: number;
  availableStorageBytes: number;
  accelerators: Array<'cpu' | 'gpu' | 'npu'>;
  supported: boolean;
  reasons: string[];
};

type ModelAvailability = {
  modelId: string;
  version: string;
  state: 'missing' | 'downloading' | 'verifying' | 'ready' | 'incompatible' | 'corrupt';
  progress?: number;
};

interface DrCannabisAndroidAiPlugin {
  getCapabilities(): Promise<AndroidAiCapabilities>;
  ensureModelAvailable(options: { manifestId: string }): Promise<ModelAvailability>;
  loadModel(options: { manifestId: string }): Promise<{ sessionId: string }>;
  generateStream(options: AiGenerateRequest): Promise<{ generationId: string }>;
  cancelGeneration(options: { generationId: string }): Promise<void>;
  unloadModel(): Promise<void>;
  getHealth(): Promise<HealthReport>;
}
```

Eventos:

```text
modelProgress
modelReady
streamDelta
streamCompleted
streamCancelled
runtimeWarning
runtimeError
healthChanged
```

Los schemas reales deben validarse en TypeScript y Kotlin. Campos desconocidos no deben ejecutarse por reflexión.

## 6. Model manifest

Cada asset aprobado debe tener un manifest firmado/versionado:

```json
{
  "schemaVersion": 1,
  "modelId": "pending-benchmark",
  "family": "gemma",
  "version": "pending",
  "runtime": "litert-lm",
  "runtimeVersionRange": "pending",
  "format": "pending",
  "quantization": "pending",
  "sizeBytes": 0,
  "sha256": "pending",
  "license": "pending",
  "source": "pending",
  "languagesValidated": ["es", "en", "pt-BR"],
  "contextWindow": 0,
  "minDeviceProfile": "pending-benchmark",
  "knowledgeCompatibility": "pending",
  "embeddingCompatibility": "pending",
  "evaluationRunId": "pending"
}
```

`pending` no puede llegar a release. Ningún número se completa por estimación.

## 7. Entrega de assets

Estrategias evaluables:

- install-time;
- fast-follow;
- on-demand;
- device-targeted.

La app debe usar una interfaz `ModelAssetProvider` para no acoplarse irreversiblemente a una modalidad o feature beta.

Flujo comercial:

1. Google Play instala app y assets aplicables, o inicia su entrega automática.
2. La app muestra un único estado comprensible: `Preparando inteligencia local`.
3. Se verifica tamaño, versión, hash y compatibilidad.
4. Se activa atómicamente.
5. Se conserva una combinación anterior funcional para rollback cuando corresponda.
6. El usuario ve `Dr. Cannabis listo`.

No se muestra un selector de archivos/modelos.

## 8. Capability detection

Antes de descargar/cargar:

- ABI/arquitectura;
- versión Android y SDK;
- RAM class y memoria disponible;
- almacenamiento disponible;
- aceleradores soportados por runtime;
- versión del plugin/runtime;
- thermal/low-power state cuando sea relevante.

La compatibilidad mínima/recomendada se publica solo después de #27.

Estados comerciales:

- compatible y listo;
- compatible, preparando asset;
- requiere liberar espacio;
- requiere actualizar app/modelo;
- dispositivo no compatible.

No intentar repetidamente una carga destinada a OOM.

## 9. Pipeline conversacional local

```text
user input
  → validate
  → load app context
  → local retrieval
  → deterministic tools
  → prompt assembly
  → LiteRT-LM generation
  → citation/artifact validation
  → local persistence
  → split UI update
```

El LLM interpreta y redacta. Los cálculos provienen del dominio.

## 10. RAG

- SQLite/knowledge local versionado;
- búsqueda exacta para fórmulas, nombres y códigos;
- búsqueda semántica para significado/sinónimos/idiomas;
- filtros por fase, sistema, tema, idioma y versión;
- top-k y umbral documentados;
- abstención cuando no existe evidencia suficiente;
- citations hasta documento/sección/versión.

La selección del embedding runtime/modelo también requiere evaluación. Puede ser independiente del generador.

## 11. Concurrencia y lifecycle

MVP:

- una generación activa por provider;
- nueva generación requiere cancelar o esperar la anterior;
- `AbortSignal` se propaga a retrieval, tools y LLM;
- background puede pausar/cancelar según capacidad;
- resume reconcilia estado con `generationId`;
- cierre/unload libera memoria;
- low-memory/thermal warning produce estado degradado explícito.

No mantener el modelo cargado indefinidamente si el sistema solicita memoria.

## 12. Privacidad y red

- inferencia local;
- knowledge y chats locales;
- no telemetría de contenido por defecto;
- diagnósticos opt-in y redactados;
- pruebas de red en modo avión y captura de tráfico;
- si alguna actualización requiere Internet, debe estar separada de la inferencia y declarada.

## 13. Errores requeridos

Códigos tipados, al menos:

```text
AI_MODEL_MISSING
AI_MODEL_DOWNLOADING
AI_MODEL_CORRUPT
AI_MODEL_INCOMPATIBLE
AI_RUNTIME_UNAVAILABLE
AI_OUT_OF_MEMORY
AI_THERMAL_LIMIT
AI_GENERATION_CANCELLED
AI_GENERATION_TIMEOUT
AI_CONTEXT_TOO_LARGE
AI_STORAGE_INSUFFICIENT
AI_VERSION_MISMATCH
```

Cada error tiene:

- mensaje de usuario traducible;
- detalle técnico local;
- acción recuperable;
- indicador de retry permitido/no permitido.

## 14. Evaluación y gate

#27 debe medir:

- groundedness;
- retrieval/citations;
- tool selection y argumentos;
- abstención;
- ES/EN/PT-BR;
- first-token latency y throughput;
- RAM/storage/battery/thermal;
- crash/ANR/OOM;
- matriz de dispositivos.

Los umbrales se escriben antes de elegir ganador. El resultado actual de un benchmark nunca se reemplaza por marketing.

## 15. Done

Android AI se considera aceptado cuando:

- plugin y contracts versionados;
- asset íntegro y licenciado;
- provider funciona sin red;
- RAG/tools/citations PASS;
- modelo/configuración aprobados por benchmark;
- UX no expone complejidad técnica;
- lifecycle, cancelación y recuperación PASS;
- distribución/upgrade/rollback PASS;
- matriz de dispositivos y requisitos publicados;
- truth y release docs sincronizados.
