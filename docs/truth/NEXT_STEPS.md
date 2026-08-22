# NEXT STEPS — Canonical Blocks

Master: #14
WBS: `docs/truth/WORK_BREAKDOWN_STRUCTURE.md`
Milestones: `docs/truth/MILESTONE_PLAN.md`
Traceability: `docs/truth/TRACEABILITY_MATRIX.md`

No ejecutar todos los cambios en una sola reescritura. El proyecto se completa por parents/child Issues, PRs pequeñas y gates verificables.

## Estado actual

```text
B0/#1 = DONE
GOV-02/#16 = DOCUMENTATION_REVIEW
B1/#2 = IN_PROGRESS
B2–B12 = NOT_STARTED
```

GOV-02 no habilita saltarse dependencias; deja contratos y backlog durables.

# M0 — Governance & Source Audit (#46)

## B0 — Governance & baseline (#1) `DONE`

Salida incorporada:

- AGENTS;
- truth docs iniciales;
- mapa legacy;
- roadmap B0–B12;
- Harness Engineering;
- PR #15 mergeada.

## GOV-02 — Arquitectura multiplataforma, IA Android y UX móvil (#16)

Salida esperada:

- arquitectura React/TypeScript compartida;
- Electron/Windows + Capacitor/Android;
- Kotlin solo como bridge nativo;
- contrato Google LiteRT-LM/Gemma pendiente de benchmark;
- chat móvil con estados `expanded_split` y `minimized_bubble`;
- expandido 50/50, historial arriba, conversación abajo y visor táctil;
- minimizado como burbuja fija abajo a la izquierda y visor full workspace;
- restauración sin pérdida y generación minimizada;
- WBS, traceability, milestone plan;
- child issues #17–#45 y #53, trackers #46–#51;
- truth/source prompt sincronizados.

No toca código productivo ni altera B1.

## B1 — Auditoría técnica y migración de fuentes (#2)

- auditar ambos repositorios;
- inventariar funciones reales del legacy;
- auditar Excel/programa de fertirriego;
- auditar knowledge/prompt;
- normalizar fases, nutrientes, especies, unidades y bases;
- registrar conflictos Excel ↔ legacy ↔ seed ↔ knowledge;
- producir dataset candidato con provenance;
- no promover datos dudosos sin decisión.

Gate: M0 cierra antes de B2.

# M1 — Nutrient Core & Solver (#47)

## B2 — Modelo nutricional canónico (#3)

- tipos de nutrientes/iones/especies;
- formas elementales/óxidos;
- N total, N-NO3 y N-NH4;
- sales, composición, basis, purezas y lotes;
- objetivos por fase/sistema/versión;
- agua base;
- tolerancias/restricciones;
- SQLite, schemas y migraciones;
- fixtures desktop/Android compatibles.

## B3 — Solver PPM real (#4)

- matriz de aportes;
- resolución restringida;
- objetivos vs logrados;
- mínimos/máximos/tolerancias;
- caso no resoluble explicable;
- costo/stock;
- provenance de inputs;
- unit/property/regression tests;
- mismo resultado en adapters de plataforma.

## B4 — EC, pH, agua y preparación (#5)

- EC estimada vs medida;
- escalas PPM/TDS solo como presentación;
- análisis/limitaciones del agua base;
- pH tracker y ajustes seguros;
- orden de mezcla y compatibilidades;
- tanques A/B cuando aplique;
- artifacts estructurados para UI/chat.

Gate: M1 cierra antes de app end-to-end.

# M2 — Shared App & Core Workflows (#48)

## B5 — Shell compartido (#6)

Child issues:

- #17 arquitectura/workspaces/import boundaries;
- #18 Electron seguro + layout desktop;
- #19 Android Capacitor + bridge tipado;
- #20 navegación/estado/rutas compartidos, incluyendo `chatPresentation`.

Orden recomendado:

```text
#17 → (#18 y #19 en PRs separadas) → #20
```

Gates:

- una sola UI funcional;
- no fórmulas en UI/Kotlin;
- Electron `contextIsolation=true`, `nodeIntegration=false`;
- Android shell offline sin PC/Wi-Fi/API key;
- build desktop + Android debug;
- continuidad de workspace y estado de presentación.

## B6 — Fertilizer Calculator UI end-to-end (#7)

- seleccionar cultivo/fase/sistema/volumen;
- targets y agua;
- productos/lotes;
- ejecutar solver;
- resultados, contribuciones, alertas y provenance;
- guardar formulación;
- exportar;
- artifact para visor;
- misma pantalla funcional en desktop/Android.

## B7 — Persistencia operativa (#8)

- sectores/campañas;
- inventario/lotes/costos;
- formulaciones/resultados;
- lecturas de riego/drenaje/EC/pH;
- historial;
- backup/export/import controlado;
- migrations fresh/upgrade;
- adapters equivalentes.

## B8 — Toolboxes (#9)

Sub-bloques independientes:

- B8A VPD;
- B8B CFM;
- B8C Harvest Timer;
- B8D pH Tracker;
- B8E Feeding Calculator;
- B8F Soil Mix;
- B8G Yield Estimator;
- B8H Green Light.

Secuencia por toolbox:

```text
pure domain function → tests → application case → shared UI → artifact/tool contract
```

# M3 — Local AI & Mobile Workspace (#49)

## B9 — Dr. Cannabis IA local (#10)

Child issues:

- #21 contratos de chat/contexto/artifacts/providers;
- #22 ingesta/RAG híbrido/citas;
- #23 tools deterministas/autorización;
- #24 historial/persistencia/search;
- #25 Android LiteRT-LM provider;
- #26 model manifest/assets/compatibilidad;
- #27 benchmark/evaluación;
- #28 provider desktop local;
- #29 orquestador/streaming/cancelación/degradados y presentación desacoplada.

Orden recomendado:

```text
#21 → #22/#23/#24 → #29 con fakes explícitos
     → #27 define corpus/umbrales
     → #25/#26 y #28 implementan candidates
     → #27 reevalúa providers reales
     → parent #10 gate
```

Reglas:

- conversación natural;
- RAG y citas;
- cálculos mediante tools;
- Android sin API paga/key/PC/Wi-Fi;
- Google LiteRT-LM;
- Gemma solo candidata hasta benchmark;
- desktop provider desacoplado;
- no cloud fallback oculto;
- offline después de assets;
- minimizar UI no cancela ni duplica el turno.

## B10 — UX cross-platform e integración (#11)

Child issues:

- #30 workspace expandido 50/50 y transición de presentación;
- #31 historial buscable dentro del chat;
- #32 conversación/composer/streaming;
- #33 visor táctil;
- #34 componentes compartidos;
- #35 accesibilidad/performance móvil;
- #36 i18n/regresión visual;
- #53 minimizar/restaurar chat como burbuja inferior izquierda.

Orden recomendado:

```text
#34 → #30 → #31/#32/#33 → #53 → #35 → #36 → parent gate
```

UX canónica:

```text
EXPANDED_SPLIT
  portrait: visor superior 50%, chat inferior 50%
  landscape/tablet: visor izquierda 50%, chat derecha 50%
  chat: historial arriba, conversación abajo
  default interno 30/70, historial 25–45%

MINIMIZED_BUBBLE
  panel de chat fuera del layout
  visor/módulo usa 100% del espacio útil
  burbuja pequeña fija abajo a la izquierda
  restore exacto del split y estado
```

Requisitos adicionales:

- no chat full-screen;
- minimizar no cancela generación;
- badge sin contenido sensible;
- thread, borrador, artifact, zoom y scroll persisten;
- safe areas, hit target, TalkBack y reduced motion;
- teclado/orientación/background preservan estado.

# M4 — Distribution & Stores (#50)

## B11 — Distribución Windows + Android (#12)

Child issues:

- #37 NSIS Windows;
- #38 Android signed APK/AAB + CI;
- #39 Google Play/model assets/targeting/rollout;
- #40 compatibilidad/update/rollback;
- #41 privacidad/licencias/requisitos/store listing.

Gates:

- builds reproducibles;
- manifests/hashes/SBOM/licencias;
- install/upgrade/uninstall/rollback;
- assets íntegros;
- Google Play internal/closed test;
- offline posterior a instalación;
- requisitos desde benchmark.

# M5 — Multi-platform Release Candidate (#51)

## B12 — Release Candidate (#13)

Child issues:

- #42 RC Desktop;
- #43 RC Android/device matrix, incluyendo expand/minimize/restore;
- #44 equivalencia de datos/knowledge/contratos;
- #45 aceptación final/publicación controlada.

No se acepta evidencia de dev server, emulador único o mock como release.

# Regla de avance

Un bloque/child issue pasa a `DONE` solo cuando:

1. criterios completos;
2. PR mergeada;
3. tests/build/evidencia PASS;
4. parent task list sincronizada;
5. `FEATURE_MAP` actualizado;
6. `SOURCE_OF_TRUTH`/`DECISION_LOG` actualizados si cambió contrato;
7. traceability Requirement→Issue→Evidence completa;
8. aprobación humana cuando corresponda.
