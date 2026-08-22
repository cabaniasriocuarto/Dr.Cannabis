# DECISION LOG — Dr. Cannabis

## D-001 — Repo canónico

**Decisión:** usar `cabaniasriocuarto/Dr.Cannabis` como repo canónico de producto.

**Motivo:** contiene scaffolding Electron + TypeScript + SQLite/Drizzle + electron-builder compatible con el objetivo de producto instalable.

**Legacy:** `cabaniasriocuarto/Dr.-Cannabis` permanece como fuente funcional/read-only durante la migración.

## D-002 — Migración incremental, no reescritura gigante

**Decisión:** completar el producto por bloques, Issues, branches y PRs pequeñas/verificables.

**Motivo:** el legacy contiene reglas útiles pero arquitectura monolítica; el repo nuevo tiene una arquitectura inicial pero funcionalidad incompleta.

## D-003 — Calculadora como núcleo

**Decisión:** la lógica de fertilización vive en un dominio TypeScript independiente de React y de las plataformas.

Toolboxes, UI y chatbot consumen resultados del dominio; no duplican fórmulas.

## D-004 — Persistencia local

**Decisión:** SQLite local con migraciones versionadas como persistencia canónica, accesible mediante adapters por plataforma.

## D-005 — Local-first/offline

**Decisión:** cálculos, datos, historial y knowledge local deben funcionar sin Internet después de instalar los assets requeridos. Los providers LLM se desacoplan del dominio y de la UI.

## D-006 — Layout desktop

**Decisión:** desktop de tres zonas: navegación izquierda, módulo/visor activo centro y chatbot persistente derecha.

## D-007 — Idiomas

**Decisión:** ES, EN y PT-BR son requisitos del producto. Usar claves i18n compartidas; no resolver con strings críticos dispersos.

## D-008 — Solver productivo

**Decisión:** no aceptar la demo simplificada EC→gramos ni recetas hard-coded como solver productivo. El solver usa objetivos por nutriente/ion, composición/pureza, restricciones y tolerancias.

## D-009 — Datos legacy/Excel requieren provenance

**Decisión:** ningún número se vuelve canónico solo por existir en código legacy, seed, Excel o knowledge. Debe identificarse fuente, unidad, forma química, fase/sistema y versión.

## D-010 — Seguridad Electron

**Decisión:** renderer aislado (`contextIsolation=true`, `nodeIntegration=false`) y API mínima mediante preload/IPC allowlisted y validada.

## D-011 — Windows como primera dirección de distribución

**Decisión original:** primera distribución prevista mediante Windows/NSIS.

**Estado:** `AMENDED_BY_D-013`. Windows sigue siendo plataforma objetivo y mantiene su instalador NSIS, pero Android/Google Play pasa a ser también una plataforma canónica del roadmap. No borrar esta decisión histórica.

## D-012 — Harness Engineering liviano

**Decisión:** usar preflight, Task Contract, exact-scope allowlist, tests, builds, verificación UI/integración, Draft PR, revisión independiente y merge humano.

## D-013 — Producto canónico multiplataforma Windows + Android

**Decisión:** Dr. Cannabis se entrega como un único producto funcional para Windows y Android.

- Windows: Electron.
- Android: Capacitor.
- Núcleo, contratos, casos de uso y pantallas funcionales: compartidos.

**Motivo:** evitar mantener dos productos divergentes y preservar equivalencia científica/funcional.

## D-014 — React + TypeScript compartidos; Kotlin solo como puente nativo

**Decisión:** React + TypeScript constituyen la base funcional y visual compartida. Kotlin se limita a plugins/adaptadores Android, incluyendo LiteRT-LM, lifecycle y assets.

**Prohibido:** crear una segunda UI completa en Jetpack Compose o trasladar solver, RAG, navegación de producto o lógica agronómica a Kotlin.

## D-015 — Arquitectura por ports/adapters y límites de importación

**Decisión:** separar `domain`, `application`, `contracts`, `ui`, `chat-core`, `data` y adapters de plataforma.

- `domain` no importa React, Electron, Capacitor, Kotlin ni SQLite concreto.
- UI no accede directamente a DB, filesystem, procesos o LLM.
- capacidades nativas entran por interfaces tipadas y schemas runtime.

**Contrato:** `docs/architecture/CROSS_PLATFORM_ARCHITECTURE.md`.

## D-016 — Workspace móvil fijo 50/50

**Decisión:** el chat móvil no ocupa pantalla completa por defecto.

- portrait: visor arriba 50% y chat abajo 50%;
- landscape/tablet: visor izquierda 50% y chat derecha 50%;
- el chat nunca cubre ni reemplaza el visor durante el flujo normal;
- el split principal MVP es fijo 50/50.

**Contrato:** `docs/product/MOBILE_SPLIT_WORKSPACE_SPEC.md`.

## D-017 — Historial arriba y conversación abajo dentro del panel de chat

**Decisión:** dentro del 50% asignado al chat:

- historial buscable/interactivo arriba;
- conversación activa abajo;
- default interno 30%/70%;
- historial ajustable solo entre 25% y 45%, con preferencia persistida;
- cambiar de hilo restaura borrador, mensajes y artifact/visor asociados.

## D-018 — Visor móvil de artifacts táctil e independiente

**Decisión:** la otra mitad de la pantalla funciona como visor/workspace para imágenes, tablas, gráficos, recetas, resultados, documentos y citas.

Requiere pinch-to-zoom, pan, double-tap, reset/fit, tablas bidireccionales y estado persistente por thread/artifact.

## D-019 — Conversación natural, no preguntas precargadas

**Decisión:** el bot interpreta consultas libres en lenguaje natural. Las preguntas predefinidas pueden existir solo como sugerencias de onboarding, nunca como condición para obtener respuesta.

El bot usa RAG, contexto estructurado y herramientas reales.

## D-020 — IA Android local con Google LiteRT-LM

**Decisión:** el provider Android se implementa mediante plugin Capacitor/Kotlin y Google LiteRT-LM.

La familia Gemma es la candidata preferida para evaluación. El modelo, tamaño, formato, cuantización y requisitos finales permanecen `PENDING_BENCHMARK` hasta #27.

**Contrato:** `docs/architecture/ANDROID_ON_DEVICE_AI.md`.

## D-021 — Sin API paga, API key, PC o Wi-Fi local como requisito Android

**Decisión:** la experiencia comercial Android debe ser instalar→abrir→usar, sin pago por mensaje, API key, conexión a PC o red Wi-Fi local.

La inferencia funciona offline después de instalar/verificar los assets. No se permite fallback cloud oculto.

## D-022 — Providers de IA desacoplados

**Decisión:** `AiProvider` y `EmbeddingProvider` son contratos de aplicación independientes de LiteRT-LM, llama.cpp u otro runtime.

- Android implementa el provider mediante LiteRT-LM.
- Windows usa un provider local separado.
- los runtimes/modelos se aprueban mediante benchmark y manifests, no por preferencia informal.

## D-023 — RAG híbrido con citas y abstención

**Decisión:** knowledge local versionado, búsqueda exacta + semántica, filtros por metadatos y citas hasta documento/sección/versión.

Si no hay evidencia suficiente, el sistema pregunta o se abstiene; no rellena con datos inventados.

## D-024 — Tool calling determinista

**Decisión:** el LLM no hace de memoria cálculos que existen en el dominio. Invoca tools allowlisted, tipadas y validadas.

Tools son read-only por defecto. Toda mutación requiere intención explícita, confirmación UI y resultado persistido verificable.

## D-025 — Historial de chat local y buscable

**Decisión:** threads, mensajes, contexto, citas y artifacts se persisten localmente. La búsqueda funciona sin LLM ni Internet y soporta filtros, pin, archive y delete según política.

## D-026 — Selección de modelo por evaluación reproducible

**Decisión:** ningún modelo se promueve por una demo subjetiva. #27 define corpus, métricas, matriz de dispositivos y umbrales antes de elegir candidato.

Medir groundedness, retrieval/citations, tools, abstención, ES/EN/PT-BR, latencia, throughput, RAM, storage, batería, temperatura, crash/ANR/OOM.

## D-027 — Model/knowledge/release manifests e integridad

**Decisión:** app, schema, knowledge, embeddings, runtime y modelo tienen versiones compatibles, hashes, licencias y provenance.

Updates deben ser verificables, recuperables y con rollback. Un asset corrupto/incompatible no se activa.

## D-028 — Google Play con entrega de assets abstraída

**Decisión:** evaluar install-time, fast-follow, on-demand y device-targeted, pero encapsular la entrega detrás de un provider para no depender irreversiblemente de una función beta o modalidad única.

## D-029 — Jerarquía parent/child y trazabilidad

**Decisión:** #14 es el master. Parents #6/#10/#11/#12/#13 consolidan gates y child issues #17–#45 ejecutan objetivos coherentes.

Cada cambio debe rastrear Requirement → Contract → Parent → Child → Test/Evidence → Release Gate.

**Contratos:** `WORK_BREAKDOWN_STRUCTURE.md` y `TRACEABILITY_MATRIX.md`.

## D-030 — Milestone trackers M0–M5

**Decisión:** usar trackers #46–#51 como hitos canónicos mientras la integración disponible no permita crear Milestones nativas.

Sus nombres y alcance son estables y se migrarán a Milestones nativas sin cambiar el plan cuando exista la operación correspondiente.

## D-031 — iOS fuera del roadmap actual

**Decisión:** B0–B12 cubren Windows y Android. iOS queda fuera de alcance hasta una decisión/roadmap independiente, evitando promesas y complejidad no planificada.
