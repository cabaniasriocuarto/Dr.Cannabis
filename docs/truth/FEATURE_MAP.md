# FEATURE MAP — Dr. Cannabis

Estados iniciales históricos: `LEGACY_AVAILABLE`, `SCAFFOLD_PRESENT`, `NOT_YET_ACCEPTED`.

La existencia de un contrato, Issue o scaffolding no equivale a implementación aceptada.

## Estados

- `TODO`: no existe evidencia suficiente.
- `PROPOSED`: contrato/backlog creado, pendiente de merge/implementación.
- `MIGRATE`: existe funcionalidad legacy a portar.
- `REWRITE_CORE`: concepto válido, implementación no apta como base productiva.
- `COMPLETE`: completar estructura iniciada.
- `HARDEN`: existe scaffolding que requiere seguridad/tests/release.
- `VERIFY`: puede existir, pero falta evidencia.
- `IN_PROGRESS`: branch/Task Contract activos.
- `DONE`: PR mergeada, evidence PASS y truth sync.

## Governance y arquitectura

| Área | Legacy | Repo canónico / contratos | Estado actual | Objetivo/Gate |
| --- | --- | --- | --- | --- |
| Governance B0 | No | AGENTS/truth/#1/#15 | DONE | mantener sincronizado |
| GOV-02 multiplataforma | No | #16 + branch docs | PROPOSED | merge humano + truth sync |
| WBS/traceability | No | WBS, traceability, #14 | PROPOSED | usado por cada PR |
| Milestones | No | trackers #46–#51 | PROPOSED | migrar a Milestones nativas cuando sea posible |
| Arquitectura compartida | No | `CROSS_PLATFORM_ARCHITECTURE`, #17 | PROPOSED | imports/ports/builds PASS |
| UI funcional compartida | Parcial web | #34 | TODO | no forks mobile/desktop |
| Estado/rutas compartidos | No | #20 | TODO | lifecycle continuity PASS |

## Núcleo agronómico

| Área | Legacy | Repo canónico | Estado actual | Objetivo/Gate |
| --- | --- | --- | --- | --- |
| Fertilizer Calculator | V4.4 | IPC/estructura parcial | MIGRATE + REWRITE_CORE | B3/B6 PASS |
| Targets por fase | hard-coded/Excel | seeds demo | B1 IN_PROGRESS | dataset canónico con provenance |
| Sales/productos | librería amplia | 6 sales demo | MIGRATE/VALIDATE | B2 canonical data |
| Óxidos↔elementos | presente | no demostrado | MIGRATE + TEST | conversion suite PASS |
| N-NO3/N-NH4 | correcciones legacy | modelo insuficiente | MODEL + TEST | B2/B3 PASS |
| Pureza/lotes | parcial | tablas iniciales | COMPLETE | single purity contract |
| Solver restringido | lógica previa/demo | no demostrado | TODO | resoluble/no-resoluble PASS |
| EC estimada/medida | parcial | campos DB | DEFINE + VERIFY | B4 PASS |
| Agua base/alcalinidad | knowledge/Excel | no contrato final | TODO | B4 PASS |
| pH/mezcla/compatibilidad | knowledge | no módulo aceptado | TODO | B4/B8D PASS |

## Datos y operaciones

| Área | Legacy | Repo canónico | Estado actual | Objetivo/Gate |
| --- | --- | --- | --- | --- |
| SQLite | backend local | Drizzle/better-sqlite3 scaffold | HARDEN | adapters Windows/Android |
| Migraciones | no canónicas | scaffold | VERIFY | fresh/upgrade/rollback |
| Sectores/campañas | conceptual | tablas iniciales | COMPLETE | B7 PASS |
| Inventario/stock/costos | parcial | tablas parciales | COMPLETE | B7 PASS |
| Formulaciones/resultados | sí/parcial | tablas parciales | COMPLETE | B6/B7 PASS |
| Riego/drenaje/EC/pH | knowledge/parcial | incompleto | TODO | B7/B8D PASS |
| Backup/import/export | parcial | IPC declarado | TODO | B7/B11 PASS |
| PDF/CSV/XLSX | parcial | handlers no demostrados | TODO | exact content/open PASS |

## Toolboxes

| Área | Legacy/knowledge | Repo canónico | Estado actual | Gate |
| --- | --- | --- | --- | --- |
| VPD | knowledge | no módulo aceptado | TODO | B8A unit/UI/tool/artifact |
| CFM | knowledge | no módulo aceptado | TODO | B8B unit/UI/tool/artifact |
| Harvest Timer | knowledge | no módulo aceptado | TODO | B8C PASS |
| pH Tracker | knowledge | no módulo aceptado | TODO | B8D PASS |
| Feeding | knowledge | no módulo aceptado | TODO | B8E reuse solver |
| Soil Mix | knowledge | no módulo aceptado | TODO | B8F PASS |
| Yield Estimator | knowledge | no módulo aceptado | TODO | B8G PASS |
| Green Light | knowledge | no módulo aceptado | TODO | B8H PASS |

## Windows / Electron

| Área | Actual | Estado | Objetivo/Gate |
| --- | --- | --- | --- |
| Electron shell | main/preload inicial | HARDEN | #18 |
| Desktop 3 zones | no demostrado | TODO | navigation+module+chat PASS |
| Electron security | `nodeIntegration=true` observado históricamente | FAIL_KNOWN | false + IPC/CSP tests |
| Desktop local AI | no integración aceptada | TODO | #28 offline provider |
| NSIS | config provisional | HARDEN | #37 exact release artifact |
| Windows install/upgrade | no evidence | TODO | #37/#42 PASS |

## Android / Capacitor

| Área | Contrato/Issue | Estado actual | Objetivo/Gate |
| --- | --- | --- | --- |
| Capacitor shell | #19 | TODO | build APK/AAB + real device |
| Kotlin bridge | #19/#25 | TODO | typed/validated allowlist |
| Shared React UI | #17/#34 | TODO | same functional components |
| Android SQLite adapter | B2/B7/#19 | TODO | migrations/equivalence PASS |
| Lifecycle/background | #19/#20/#25 | TODO | rotate/resume/low-memory PASS |
| Signed AAB | #38 | TODO | CI/signing verification |
| Google Play rollout | #39 | TODO | internal/closed/staged PASS |

## Dr. Cannabis IA

| Área | Legacy | Contrato/Issue | Estado actual | Objetivo/Gate |
| --- | --- | --- | --- | --- |
| Natural-language chat | prompt/backend previo | #21/#29 | MIGRATE/REDESIGN | free-form eval PASS |
| Prompt maestro | legacy + docs | #10/#21 | MIGRATE/VERSION | versioned contract |
| Knowledge base | extensa legacy | #22 | B1 IN_PROGRESS | normalized/versioned |
| RAG exacto + semántico | no aceptado | #22 | TODO | retrieval/citation metrics |
| Citations | no aceptadas | #21/#22 | TODO | source/section/version |
| Tool calling | conceptual | #23 | TODO | accuracy/authorization PASS |
| Historial/search | parcial/no canónico | #24 | TODO | local FTS/CRUD/migrations |
| Orquestador/streaming | no aceptado | #29 | TODO | state machine/cancel/retry |
| ES/EN/PT-BR | requisito | #27/#36 | TODO | multilingual PASS |
| Abstención/no hallucination | contrato | #22/#27 | TODO | eval threshold PASS |
| Desktop provider local | no aceptado | #28 | TODO | offline benchmark |
| Android LiteRT-LM | docs/#25 | PROPOSED | provider/device PASS |
| Gemma model selection | candidate only | #27 | PENDING_BENCHMARK | decision log after metrics |
| Model manifest/assets | docs/#26 | TODO | hash/license/compatibility |
| No paid API/key/PC/Wi-Fi | contract | #25/#43 | PROPOSED | airplane/network tests |
| No hidden cloud fallback | contract | #25/#28/#29 | PROPOSED | traffic/security tests |

## UX móvil

| Área | Contrato/Issue | Estado actual | Objetivo/Gate |
| --- | --- | --- | --- |
| Split portrait 50/50 | mobile spec/#30 | PROPOSED | geometry tests |
| Split landscape 50/50 | mobile spec/#30 | PROPOSED | device screenshots/tests |
| Chat full-screen default | prohibited | PROPOSED | regression test |
| History above conversation | #31/#32 | PROPOSED | order/interaction PASS |
| Internal default 30/70 | #31 | PROPOSED | default/bounds/persist |
| Thread search/actions | #24/#31 | TODO | 1,000-thread fixture |
| Viewer artifacts | #33 | TODO | exact artifact focus |
| Pinch/pan/double-tap | #33 | TODO | gesture/device PASS |
| Large tables | #33 | TODO | bidirectional/virtualized |
| Keyboard/safe areas | #30/#32/#35 | TODO | IME/device PASS |
| Orientation/background state | #20/#30/#33 | TODO | lifecycle PASS |
| Accessibility | #35 | TODO | TalkBack/focus/touch PASS |
| Mobile performance | #27/#35 | TODO | budgets/device matrix |
| Visual i18n | #36 | TODO | ES/EN/PT-BR/pseudo-locale |

## Distribución y release

| Área | Issue | Estado | Gate |
| --- | --- | --- | --- |
| Version compatibility | #40 | TODO | app/schema/knowledge/model/runtime matrix |
| Integrity/rollback | #40 | TODO | corrupt/interrupted/disk-full PASS |
| Privacy/data safety | #41 | TODO | reviewed store declarations |
| Licenses/SBOM | #37–#41 | TODO | release artifacts complete |
| RC Desktop | #42 | TODO | exact hash report |
| RC Android | #43 | TODO | exact AAB/device matrix |
| Cross-platform equivalence | #44 | TODO | same fixture/schemas |
| Final acceptance | #45 | TODO | human approvals/publication gate |

## Regla

Este archivo se actualiza al cerrar cada child/parent relevante. `PROPOSED` nunca debe interpretarse como `IMPLEMENTED`; `TODO` no puede marcarse completo por una conversación o mock.
