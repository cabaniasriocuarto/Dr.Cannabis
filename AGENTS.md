# Dr. Cannabis — Reglas permanentes para agentes

## Principios base

- Trabajar en español salvo que el usuario pida otro idioma.
- No inventar datos agronómicos, composiciones, purezas, fórmulas, estados del repo, capacidades de dispositivo, compatibilidad de modelos ni resultados de tests.
- Separar siempre `CONFIRMADO`, `INFERIDO` y `PENDIENTE_DE_VALIDAR`.
- El repo real manda primero. `docs/truth` es el contrato operativo después del repo.
- Si repo, docs, Issues, Excel/base de conocimiento o legacy se contradicen, declarar el conflicto y no resolverlo silenciosamente.
- No declarar soporte, compatibilidad, rendimiento, modo offline o release sin evidencia sobre el artefacto/plataforma exactos.

## Orden de autoridad

1. Código y datos observables del repo canónico `cabaniasriocuarto/Dr.Cannabis`.
2. `docs/truth/`.
3. Contratos de `docs/architecture/` y `docs/product/`.
4. GitHub Issues/PRs y trazabilidad del bloque.
5. Datos canónicos importados desde Excel/programa y composiciones validadas.
6. Base de conocimiento local versionada.
7. Documentación oficial/técnica externa cuando se autorice investigación.
8. Conocimiento general del modelo, solo como complemento explícito.

## Repositorios legacy

- `cabaniasriocuarto/Dr.-Cannabis` es fuente legacy funcional: app V4.4 monolítica, datos, lógica previa y backend/conocimiento.
- No editar ni borrar el legacy durante la migración salvo bloque específico.
- Migrar con evidencia: identificar origen, documentar inputs/outputs/unidades, portar, probar y registrar equivalencia/diferencia deliberada.

## Lectura obligatoria antes de tocar código

Leer, como mínimo:

- `docs/START_HERE.md`;
- `docs/truth/SOURCE_OF_TRUTH.md`;
- `docs/product/PRODUCT_SPEC.md`;
- `docs/truth/FEATURE_MAP.md`;
- `docs/truth/NEXT_STEPS.md`;
- `docs/truth/WORK_BREAKDOWN_STRUCTURE.md`;
- `docs/truth/TRACEABILITY_MATRIX.md`;
- `docs/truth/DEVELOPMENT_WORKFLOW.md`;
- `docs/truth/TESTING_MATRIX.md`;
- `docs/truth/DECISION_LOG.md`;
- `docs/truth/NUTRIENT_CALCULATION_CONTRACT.md` si se toca fertilización/PPM/EC/pH;
- `docs/truth/AI_KNOWLEDGE_CONTRACT.md` si se toca chatbot/RAG/tools;
- `docs/architecture/CROSS_PLATFORM_ARCHITECTURE.md` si se toca estructura, UI, Electron o Android;
- `docs/architecture/ANDROID_ON_DEVICE_AI.md` si se toca IA Android/modelos/assets;
- `docs/product/MOBILE_SPLIT_WORKSPACE_SPEC.md` si se toca UX móvil/chat/visor.

## Preflight obligatorio por bloque

Antes de editar:

- Issue parent y child;
- branch y base exacta;
- objetivo semántico único;
- requirement IDs de `TRACEABILITY_MATRIX`;
- archivos editables/read-only/prohibidos;
- dependencias cerradas o excepción;
- sistemas externos permitidos/prohibidos;
- fixtures/datos autorizados;
- tests/build/evidencia esperados;
- riesgos y tamaño esperado.

No mezclar dos objetivos grandes en una misma branch/PR.

## Flujo Harness Engineering

`PREFLIGHT -> TASK CONTRACT -> EDIT -> EXACT SCOPE CHECK -> TEST -> BUILD -> UI/INTEGRATION VERIFY -> DOC/TRUTH SYNC -> DRAFT PR -> REVIEW -> MERGE HUMANO`

Reglas:

- cambios pequeños y verificables;
- una child Issue coherente por branch/PR;
- no usar `git add .` en ejecución local guiada; stagear paths exactos;
- ejecutar `git diff --check` y revisar el diff;
- agregar regression test por bug cuando sea posible;
- no declarar PASS sin evidencia;
- no convertir mocks, fakes, datos demo o recetas hard-coded en evidencia de producto real;
- si falta una dependencia real, declarar `BLOCKED`/`NOT_RUN`;
- no expandir scope silenciosamente: crear/actualizar Issue y dependencia;
- parent se cierra solo cuando child issues aplicables y gates estén completos.

## Contrato del solver nutricional

- La calculadora de fertilización es el núcleo.
- Nunca usar el antiguo solver demo simplificado como resultado productivo.
- Objetivos por etapa deben provenir de datos canónicos; rangos genéricos son fallback etiquetado.
- Composición y pureza provienen de datos guardados/validados, nunca de números inventados.
- Distinguir formas elementales/óxidos/especies (`P/P2O5`, `K/K2O`, `Ca/CaO`, `Mg/MgO`, `S/SO3/SO4`).
- Mantener N total, N-NO3 y N-NH4.
- Toda fórmula es función de dominio testeable.
- EC estimada no es equivalente exacto a EC medida.
- UI, Kotlin, prompts y LLM no duplican fórmulas.

## Arquitectura cross-platform

- Una sola base funcional React + TypeScript.
- Electron contiene Windows.
- Capacitor contiene Android.
- Kotlin se limita a plugins/adaptadores nativos; no crear otra UI completa en Compose.
- `domain` no importa React, Electron, Capacitor, Kotlin ni SQLite concreto.
- UI no accede directamente a DB, filesystem, procesos, LLM o APIs nativas.
- Capacidades nativas entran por ports tipados y schemas runtime.
- `DesktopLayout` y `MobileSplitLayout` componen las mismas pantallas funcionales.
- Prohibido copiar una feature para crear `FeatureMobile`/`FeatureDesktop` sin ADR explícita.
- Diferencias visuales se resuelven con layouts, props, slots, tokens y CSS responsive.

## Persistencia y datos

- SQLite local es la persistencia objetivo en Windows y Android mediante adapters.
- Mantener schemas/migraciones versionados y semántica equivalente.
- No commitear bases de usuario, chats privados ni datos locales.
- `node_modules`, builds, releases, modelos y archivos generados no entran al repo salvo gestión explícita de release/fixture.
- Seeds son `DEMO/TEST`, nunca canónicos por existir.
- Versionar `app`, `schema`, `knowledge`, `embedding`, `model` y `runtime`; validar compatibilidad.

## UI/UX canónica desktop

Tres zonas:

1. izquierda: identidad + navegación;
2. centro: módulo activo/visor;
3. derecha: chatbot persistente.

La UI debe ser funcional. Un botón no implementado se marca pendiente; no simula éxito.

## UI/UX canónica Android

El chat no usa pantalla completa. Tiene dos estados de presentación y una máquina de estados explícita.

### `EXPANDED_SPLIT`

Portrait:

- visor superior: 50% del área útil;
- chat inferior: 50% del área útil.

Landscape/tablet:

- visor izquierdo: 50%;
- chat derecho: 50%.

Dentro del panel de chat expandido:

- historial buscable/interactivo arriba;
- conversación activa abajo;
- default interno 30/70;
- historial ajustable solo entre 25% y 45%, persistido;
- split expandido permanece 50/50.

### `MINIMIZED_BUBBLE`

- el panel de chat deja de ocupar su mitad;
- el visor/módulo activo usa todo el espacio útil;
- queda una burbuja pequeña fija abajo a la izquierda;
- la burbuja no es arrastrable en MVP;
- tocarla restaura `EXPANDED_SPLIT`.

La burbuja debe:

- permanecer dentro de safe areas;
- usar 44–48 dp visuales y hit target mínimo de 48 × 48 dp;
- no tapar navegación, guardado ni controles críticos;
- indicar generación/respuesta/error sin mostrar contenido sensible;
- ser usable con TalkBack, teclado y reduced motion.

Minimizar/restaurar no puede:

- cambiar de thread;
- borrar borrador;
- cancelar silenciosamente una generación;
- perder mensajes parciales;
- reiniciar el modelo;
- perder artifact, zoom, pan, scroll, filtros u orden;
- cambiar módulo, cultivo, sector o campaña.

Visor:

- pinch-to-zoom, pan, double-tap, reset/fit;
- imágenes, tablas, gráficos, artifacts y fuentes;
- tablas con scroll bidireccional/headers sticky/virtualización cuando corresponda;
- estado por thread/artifact;
- cuando el chat está expandido nunca cubre el visor;
- cuando el chat está minimizado utiliza todo el espacio útil.

Teclado, minimización, restauración, rotación y background no deben perder thread, borrador, artifact, zoom o scroll.

Issues: #30 y #53. Requirements: R-015, R-030, R-031 y R-032.

## Chatbot Dr. Cannabis

- Conversación natural; no depende de preguntas precargadas.
- Local-first/offline.
- Fuentes: contexto app → SQLite/dataset → prompt maestro → knowledge → fallback genérico etiquetado.
- Responde ES/EN/PT-BR.
- RAG híbrido con citations verificables.
- Cálculos mediante tools deterministas, no memoria del LLM.
- No inventa faltantes, tool results, purezas, lecturas ni targets.
- Mutaciones read-only por defecto; cualquier escritura requiere acción explícita y confirmada.
- No modifica BD por iniciativa propia.
- Límites técnico/educativos; sin consejo médico/consumo ni asesoría legal definitiva.

## IA Android

- Runtime objetivo: Google LiteRT-LM mediante plugin Capacitor/Kotlin.
- Familia Gemma preferida para benchmark; modelo/tamaño/cuántización solo después de #27.
- Sin API paga obligatoria.
- Sin API key.
- Sin conexión a PC o Wi-Fi local.
- Offline después de instalar assets.
- Sin fallback cloud oculto.
- Usuario normal no elige modelo/runtime/cuántización.
- Todo modelo requiere manifest, hash, licencia, provenance, compatibilidad y evaluación.
- Manejar lifecycle, cancelación, memoria, temperatura, espacio, corrupción, update y rollback.
- No declarar dispositivo compatible sin matriz real.

## Provider local de escritorio

- Debe implementar la misma interfaz `AiProvider`.
- Runtime/modelo se eligen por benchmark; candidatos no son decisión final.
- Electron main/adaptador controla procesos; renderer no los inicia.
- Offline, streaming, cancelación, health check y shutdown limpio.
- Sin fallback cloud oculto.

## Seguridad Electron

- `contextIsolation=true` obligatorio.
- `nodeIntegration=false` obligatorio.
- preload tipado, API mínima, IPC allowlisted y validado.
- CSP y navegación externa controladas.
- No exponer filesystem, shell, DB, ejecución o canal genérico al renderer.

## Seguridad Android

- permisos mínimos y contextuales;
- bridge TypeScript/Kotlin allowlisted/validado;
- assets/modelos en rutas privadas y con integridad verificada;
- no ejecutar HTML/scripts no confiables en visor;
- no telemetría de contenido por defecto;
- diagnostics opt-in y redactados.

## Testing cross-platform

Cuando aplique:

- mismo fixture produce mismo resultado de dominio;
- fresh/upgrade migrations en ambas plataformas;
- Electron security/IPC;
- Android bridge/lifecycle/background/low-memory;
- portrait/landscape/tablet;
- `expanded_split ↔ minimized_bubble`;
- generación activa minimizada y restauración exacta;
- bubble safe-area/hit-target/z-index;
- teclado/safe areas/touch/accessibility;
- RAG/citations/tools/abstention;
- ES/EN/PT-BR;
- RAM/storage/battery/thermal;
- mode airplane y captura de tráfico;
- install/upgrade/rollback;
- exact artifact hashes en RC.

Emulador o dev server solo no prueban release.

## Release

### Windows

- NSIS reproducible;
- sin Node/VS Code en cliente;
- instalación/upgrade/uninstall/offline;
- runtime/modelo incluidos o entregados según manifest;
- code signing plan.

### Android

- AAB firmado;
- Google Play internal/closed/staged rollout;
- entrega de model/assets abstraída;
- requisitos basados en benchmark;
- privacidad/data safety/licencias;
- install→open→use sin configuración técnica.

## Cierre de cada bloque

Reportar:

- `RESULT=PASS|BLOCKED|PARTIAL`;
- parent/child Issue;
- branch/base/commit/PR;
- requirement IDs;
- archivos tocados;
- tests/build ejecutados y resultado;
- evidencia visual/dispositivo/integración;
- manifests/migrations;
- docs/truth actualizados;
- riesgos/known limitations;
- siguiente Issue recomendado.
