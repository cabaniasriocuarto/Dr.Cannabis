# WORK BREAKDOWN STRUCTURE — Dr. Cannabis 2.0

Status: `CANONICAL_PENDING_GOV_02_MERGE`
Master: #14
Governance change: #16

## 1. Propósito

Este archivo transforma el roadmap en una secuencia ejecutable para agentes, Codex, VS Code y revisión humana. No reemplaza las Issues: fija jerarquía, dependencias, gates y significado de terminado.

## 2. Jerarquía

```text
MASTER #14
  ├─ Governance #1 / #16
  ├─ B1 #2
  ├─ B2 #3
  ├─ B3 #4
  ├─ B4 #5
  ├─ B5 #6  -> #17–#20
  ├─ B6 #7
  ├─ B7 #8
  ├─ B8 #9
  ├─ B9 #10 -> #21–#29
  ├─ B10 #11 -> #30–#36, #53
  ├─ B11 #12 -> #37–#41
  └─ B12 #13 -> #42–#45
```

Milestone trackers:

```text
M0 #46
M1 #47
M2 #48
M3 #49
M4 #50
M5 #51
```

Las task lists padre→hija son la relación canónica mientras no exista una operación disponible para crear relaciones nativas de Sub-Issue/Milestone.

## 3. Estados

- `NOT_STARTED`: sin branch/Task Contract activo.
- `READY`: dependencias satisfechas y DoR completo.
- `IN_PROGRESS`: branch y Task Contract registrados.
- `BLOCKED`: dependencia/evidencia externa faltante explícita.
- `REVIEW`: Draft PR abierta con gates ejecutados.
- `DONE`: merge humano, evidencia y truth sync.

No usar porcentajes subjetivos.

## 4. Definition of Ready

Una Issue puede iniciar solo cuando:

- parent y objetivo identificados;
- dependencias aplicables cerradas o excepción documentada;
- base ref/commit fijados;
- paths editables/read-only/prohibidos;
- sistemas externos permitidos;
- datos/fixtures disponibles;
- tests y evidencia esperados;
- riesgos conocidos;
- tamaño razonable para una PR.

## 5. Definition of Done

- criterios de aceptación de la Issue completos;
- child issues aplicables cerradas para un parent;
- diff exacto dentro de scope;
- tests/typecheck/lint/build aplicables PASS;
- evidencia UI/integración/dispositivo cuando corresponda;
- regression test por bug cuando sea posible;
- no secrets/generated junk/user DB/model binaries no gestionados;
- docs/truth/feature map sincronizados;
- Draft PR revisada;
- merge humano;
- Issue cerrada con commit/PR/evidencia.

## 6. Secuencia y dependencias

### M0 — Governance & Source Audit (#46)

#### B0 — #1 `DONE`

Salida: AGENTS, truth docs, roadmap inicial, Harness.

#### GOV-02 — #16

Salida:

- arquitectura compartida;
- Android Google on-device AI;
- UX móvil con chat expandido 50/50 y minimizado como burbuja;
- WBS/traceability/milestones;
- backlog #17–#53 aplicable.

No toca código de producto.

#### B1 — #2

Salida:

- inventario legacy;
- auditoría Excel;
- knowledge/prompt auditados;
- conflictos y provenance;
- dataset candidato no canónico hasta decisión.

### M1 — Nutrient Core & Solver (#47)

#### B2 — #3

Depende de B1.

Salida:

- modelo de nutrientes/especies/bases;
- N-NO3/N-NH4;
- purezas/lotes;
- targets versionados;
- agua base;
- SQLite/migraciones.

#### B3 — #4

Depende de B2.

Salida:

- matriz de aportes;
- solver restringido;
- objetivo/logrado/error;
- no-resoluble explicable;
- costo/stock;
- fixtures/regresión.

#### B4 — #5

Depende de B2/B3.

Salida:

- EC estimada/medida;
- pH y agua;
- compatibilidades;
- orden de mezcla;
- tanques A/B.

### M2 — Shared App & Core Workflows (#48)

#### B5 — #6

Depende de M1 y #16.

- #17 arquitectura/workspaces/ports;
- #18 Electron seguro/desktop;
- #19 Capacitor Android/bridge;
- #20 navegación/estado compartidos.

Orden recomendado: #17 → (#18 y #19 en PRs separadas) → #20.

#### B6 — #7

Depende de B3–B5.

Salida: Fertilizer Calculator input→solve→review→save→export.

Las pantallas se implementan como componentes compartidos; no crear versión Android paralela.

#### B7 — #8

Depende de B2/B5; integra B6.

Salida: sectores, campañas, inventario, lotes, costos, formulaciones, lecturas, historial, backup/import.

#### B8 — #9

Toolboxes independientes:

- B8A VPD;
- B8B CFM;
- B8C Harvest;
- B8D pH Tracker;
- B8E Feeding;
- B8F Soil Mix;
- B8G Yield;
- B8H Green Light.

Cada toolbox: función pura → unit tests → application case → UI compartida → artifact/tool contract.

### M3 — Local AI & Mobile Workspace (#49)

#### B9 — #10

Orden recomendado:

1. #21 contracts;
2. #22 RAG;
3. #23 tools;
4. #24 persistence/history;
5. #29 orchestration con fakes explícitos;
6. #27 evaluation harness y umbrales;
7. #25/#26 Android provider/assets;
8. #28 desktop provider;
9. rerun #27 con providers reales;
10. parent gate.

Notas:

- #27 comienza antes de elegir modelo final;
- #25 puede prototipar candidatos, pero no promoverlos;
- #26 no fija requisitos sin benchmark;
- cloud no es fallback implícito.

#### B10 — #11

Orden recomendado:

1. #34 componentes/tokens compartidos;
2. #30 split expandido 50/50 y base de state machine;
3. #31 historial;
4. #32 conversación;
5. #33 visor;
6. #53 minimizar/restaurar a burbuja con continuidad completa;
7. #35 accessibility/performance;
8. #36 i18n/visual regression;
9. parent gate.

Dependencias cruzadas:

- #31 depende de #24;
- #32 depende de #29;
- #33 depende de artifacts/citations/tools #21/#23/#29;
- #53 depende de #20/#29/#30/#31/#32/#33/#35;
- #35 requiere provider real #25 para medir carga conjunta;
- #36 incluye estados expandido/minimizado/restaurando.

Contrato UX de B10:

```text
EXPANDED_SPLIT
  portrait: visor 50% + chat 50%
  landscape/tablet: visor 50% + chat 50%
  chat: historial arriba + conversación abajo

MINIMIZED_BUBBLE
  visor/módulo: 100% del área útil
  chat: burbuja pequeña fija abajo a la izquierda
  restauración: mismo thread, borrador, artifact, zoom y scroll
```

No existe estado full-screen. Minimizar no cancela silenciosamente una generación.

### M4 — Distribution & Stores (#50)

#### B11 — #12

- #37 Windows NSIS;
- #38 Android signed AAB;
- #39 Google Play/model assets/rollout;
- #40 version compatibility/update/rollback;
- #41 privacy/store/compatibility policy.

Orden:

- #37 y #38 pueden avanzar por separado;
- #40 debe existir antes del rollout final;
- #39 depende de #26/#27/#38/#40;
- #41 usa requisitos medidos, no supuestos.

### M5 — Multi-platform Release Candidate (#51)

#### B12 — #13

- #42 exact Windows artifact;
- #43 exact Android artifact/device matrix;
- #44 cross-platform equivalence;
- #45 final commercial acceptance.

#45 solo cierra después de #42–#44 PASS.

El RC Android debe probar:

- chat expandido;
- chat minimizado como burbuja inferior izquierda;
- restauración sin pérdida;
- generación activa minimizada;
- safe areas y controles críticos;
- ausencia de chat full-screen.

## 7. Reglas para child issues

Cada child issue debe incluir:

- `Parent: #N`;
- objetivo semántico único;
- contratos/restricciones;
- dependencias;
- acceptance checklist;
- evidencia obligatoria;
- fuera de alcance cuando sea ambiguo.

El parent no replica implementación; consolida gates.

## 8. Política de branches/PRs

Nombres sugeridos:

```text
audit/b1-...
feat/b2-...
feat/b3-...
feat/b5a-...
feat/b9e-...
ux/b10a-...
ux/b10h-chat-bubble...
release/b11b-...
rc/b12b-...
docs/gov-...
```

Una child issue coherente por branch/PR. No agrupar #25, #30, #39 y #53 en una misma PR aunque pertenezcan al flujo Android.

## 9. Gates por superficie

### Dominio

- unit tests;
- properties/invariants;
- fixtures canónicas;
- no NaN/silent fallback.

### Persistencia

- fresh migration;
- upgrade fixture;
- transaction/rollback;
- corruption/error states.

### Desktop

- typecheck/build;
- IPC/security;
- smoke Windows;
- installer/reopen/offline.

### Android

- TypeScript/Kotlin contracts;
- Gradle build;
- emulator + dispositivo real;
- orientation/background/low-memory;
- offline/network capture;
- signed AAB gates.

### IA

- retrieval;
- citations;
- tools;
- groundedness;
- abstention;
- multilingual;
- latency/resources;
- model/runtime manifest;
- streaming y cancelación con chat expandido/minimizado.

### UX

- normal/loading/empty/error/degraded;
- visual matrix;
- touch/accessibility;
- state continuity;
- large data/performance;
- state machine `expanded_split ↔ minimized_bubble`;
- bubble safe-area/hit-target/z-index;
- restoration de thread/visor;
- no chat full-screen.

## 10. Cambios de alcance

Si una Issue descubre que requiere otra superficie:

1. detener scope expansion;
2. registrar evidencia;
3. crear/actualizar child issue;
4. decidir dependencia;
5. continuar solo dentro del contrato aprobado.

No modificar silenciosamente el roadmap.

## 11. Auditoría de progreso

El progreso real se obtiene de:

1. Issues cerradas;
2. PRs mergeadas;
3. tests/evidencia;
4. FEATURE_MAP;
5. truth docs.

Una task list marcada manualmente sin PR/evidencia no alcanza.

## 12. Próximo trabajo activo

Al momento de GOV-02:

```text
B0 = DONE
GOV-02 = DOCUMENTATION/REVIEW
B1 = IN_PROGRESS
B2–B12 = NOT_STARTED
```

GOV-02 no autoriza comenzar B5/B9/B10 antes de completar sus dependencias; deja el esqueleto listo para no depender de conversaciones futuras.
