# TRACEABILITY MATRIX — Dr. Cannabis 2.0

Status: `CANONICAL_PENDING_GOV_02_MERGE`
Master: #14

## 1. Uso

Toda decisión importante debe poder rastrearse:

```text
Requirement → Contract/ADR → Parent Issue → Child Issue → Test/Evidence → Release Gate
```

Si una implementación no puede indicar esta cadena, no debe declararse terminada.

## 2. Matriz de producto/arquitectura

| ID | Requisito | Contrato/Doc | Parent | Child principal | Evidencia/Gate |
| --- | --- | --- | --- | --- | --- |
| R-001 | Repo canónico + legacy read-only | `SOURCE_OF_TRUTH`, `LEGACY_MIGRATION_MAP` | #1/#2 | B1 outputs | audit report |
| R-002 | Solver PPM→gramos real | `NUTRIENT_CALCULATION_CONTRACT` | #3/#4 | futuras child B2/B3 | numeric fixtures |
| R-003 | No solver demo productivo | AGENTS/DECISION_LOG | #4 | solver tests | regression PASS |
| R-004 | React/TS compartido | `CROSS_PLATFORM_ARCHITECTURE` | #6 | #17/#34 | import graph + builds |
| R-005 | Electron seguro | AGENTS/architecture | #6 | #18 | IPC/security tests |
| R-006 | Android Capacitor, no UI Kotlin paralela | architecture | #6 | #19/#34 | shared component evidence |
| R-007 | Navegación/estado compartidos | architecture | #6 | #20 | lifecycle tests |
| R-008 | Bot natural/no preguntas precargadas | `AI_KNOWLEDGE_CONTRACT` | #10 | #21/#29 | eval corpus |
| R-009 | RAG local con citas | AI contract | #10 | #22 | retrieval/citation metrics |
| R-010 | Cálculos vía tools reales | AI contract | #10 | #23 | tool trace/regression |
| R-011 | Historial local buscable | mobile spec | #10/#11 | #24/#31 | FTS + UI tests |
| R-012 | Android sin API paga/key/PC/Wi-Fi | `ANDROID_ON_DEVICE_AI` | #10 | #25/#26 | mode-airplane/network capture |
| R-013 | Google LiteRT-LM/Gemma por benchmark | Android AI + DECISION_LOG futuro | #10 | #25/#27 | benchmark run |
| R-014 | No cloud fallback oculto | Android AI/AGENTS | #10 | #25/#28/#29 | network tests |
| R-015 | Split móvil 50/50 | `MOBILE_SPLIT_WORKSPACE_SPEC` | #11 | #30 | visual geometry tests |
| R-016 | Historial arriba/conversación abajo | mobile spec | #11 | #31/#32 | interaction tests |
| R-017 | Visor táctil zoom/pan/tablas | mobile spec | #11 | #33 | device gesture tests |
| R-018 | UI funcional no duplicada | cross-platform architecture | #6/#11 | #17/#34 | code reuse/import checks |
| R-019 | ES/EN/PT-BR | product/AI contracts | #10/#11 | #27/#36 | multilingual + visual tests |
| R-020 | Android performance/thermal/accessibility | mobile/AI docs | #11 | #35 | device matrix |
| R-021 | Windows instalable sin Node | release contract | #12 | #37 | clean VM install |
| R-022 | Android AAB firmado | release contract | #12 | #38 | signed artifact verification |
| R-023 | Google Play entrega assets simple | Android AI/release | #12 | #39 | install/rollout evidence |
| R-024 | Version compatibility + rollback | release docs | #12 | #40 | upgrade/corruption fixtures |
| R-025 | Privacidad/licencias/compatibilidad claras | release docs | #12 | #41 | store checklist |
| R-026 | RC exacto Windows | testing/release | #13 | #42 | hash-bound report |
| R-027 | RC exacto Android | testing/release | #13 | #43 | device report |
| R-028 | Equivalencia cross-platform | cross-platform architecture | #13 | #44 | same-fixture comparison |
| R-029 | Publicación solo con aceptación humana | workflow/WBS | #13 | #45 | signed acceptance comment |

## 3. Matriz de UX móvil

| Requisito | Valor canónico | Issue | Prueba mínima |
| --- | --- | --- | --- |
| split portrait | visor 50vh + chat 50vh | #30 | pixel/geometry snapshots |
| split landscape/tablet | visor 50vw + chat 50vw | #30 | device screenshots |
| chat full-screen default | prohibido | #30 | navigation regression |
| historial interno | arriba | #31 | component order test |
| conversación activa | abajo | #32 | interaction test |
| ratio interno default | 30/70 | #31 | state/default test |
| ratio interno permitido | history 25–45% | #31 | bounds/persistence test |
| pinch/pan/double-tap | obligatorio | #33 | gesture automation/manual evidence |
| tabla bidireccional/sticky | obligatorio cuando aplique | #33 | large table fixture |
| thread switch preserves state | obligatorio | #24/#31/#32/#33 | lifecycle integration |
| keyboard preserves viewer | obligatorio | #30/#32 | IME matrix |
| orientation preserves state | obligatorio | #20/#30/#33 | rotate test |

## 4. Matriz de IA Android

| Requisito | Issue | Gate |
| --- | --- | --- |
| provider interface desacoplada | #21/#25 | contract tests |
| LiteRT-LM Kotlin bridge | #25 | plugin integration |
| Gemma candidate selected by evidence | #27 | benchmark threshold |
| model manifest/hash/license | #26 | verification tests |
| capability detection | #26 | profile matrix |
| no network inference | #25/#43 | traffic capture/mode airplane |
| streaming/cancel | #25/#29/#32 | lifecycle tests |
| local RAG/citations | #22 | retrieval/citation metrics |
| deterministic tools | #23 | tool-call accuracy |
| history/search local | #24/#31 | DB/FTS/UI tests |
| update/rollback | #40 | version fixtures |
| Google Play delivery | #39 | internal/closed rollout |

## 5. Evidencia mínima por PR

La descripción de PR debe enlazar:

- requirement IDs afectados;
- Issue parent/child;
- contratos leídos;
- tests ejecutados;
- evidencia visual/device cuando aplique;
- cambios de manifest/migration;
- riesgos/known limitations;
- truth sync.

## 6. Control de drift

Durante review:

1. comparar archivos tocados con requirement IDs;
2. comprobar que cada cambio tiene Issue;
3. detectar requisitos implementados sin test;
4. detectar tests que usan mocks como única evidencia productiva;
5. actualizar esta matriz cuando cambie un contrato;
6. bloquear merge si código, Issue y truth se contradicen.

## 7. Release trace

Cada release manifest debe registrar:

- commit/tag;
- app version;
- schema version;
- knowledge/embedding/model/runtime versions;
- artifact hashes;
- Issues cerradas;
- test reports;
- known limitations;
- approvals.
