# GITHUB OPERATING MODEL — Dr. Cannabis 2.0

Status: `CANONICAL_PENDING_GOV_02_MERGE`
Master: #14

## 1. Objetivo

Definir cómo GitHub representa producto, trabajo, evidencia y releases para que humanos, ChatGPT, Codex y VS Code operen con la misma estructura.

## 2. Objetos y autoridad

### Master

- #14 contiene el roadmap completo y trackers.
- No se usa como Issue de implementación.

### Milestone trackers

- #46–#51 agrupan gates M0–M5.
- Son tracking Issues, no entidades Milestone nativas.
- Cuando exista operación disponible, crear Milestones nativas con los nombres de `MILESTONE_PLAN.md` y asignar las Issues sin cambiar alcance.

### Parent Issues

- #2–#13 representan bloques B1–B12.
- #6/#10/#11/#12/#13 contienen child checklists explícitas.
- Un parent no tiene branch de implementación masiva salvo excepción documentada.
- Cierra solo cuando children/gates obligatorios están completos.

### Child Issues

- Unidad normal de ejecución.
- Una child Issue → una branch → una Draft PR.
- Declara parent, requirements, dependencias, scope, pruebas, evidencia y fuera de alcance.

### Bugs

- Deben indicar versión/commit/plataforma.
- Reproducción mínima y expected/actual.
- Clasificar dato usado: canonical, fixture, demo o user data.
- Agregar regression test cuando sea posible.
- Asociar al parent/child que posee la superficie.

### Pull Requests

- Siempre Draft al crear, salvo hotfix crítico con procedimiento explícito.
- Una PR no debe cerrar un parent si solo implementa una child.
- Descripción usa `.github/PULL_REQUEST_TEMPLATE.md`.
- Merge humano después de review y evidence.

## 3. Identificadores

### Bloques

```text
B0–B12
B5A, B9E, B10D, etc.
GOV-XX
M0–M5
R-001…
```

### Branches

```text
docs/gov-02-mobile-ai-architecture
audit/b1-legacy-excel-knowledge
feat/b2a-nutrient-types
feat/b3a-solver-matrix
feat/b5a-shared-workspaces
feat/b9e-android-litert-provider
ux/b10a-mobile-split-workspace
fix/b10d-viewer-pan-regression
release/b11b-android-aab
rc/b12b-android-candidate
```

Reglas:

- minúsculas y guiones;
- incluir block/child;
- no usar nombres vagos como `changes`, `fixes`, `new-version`;
- branch parte del base SHA declarado en Task Contract.

### Commits

Formato recomendado:

```text
type(scope): semantic change
```

Tipos:

- `feat`;
- `fix`;
- `docs`;
- `test`;
- `refactor`;
- `build`;
- `ci`;
- `chore`;
- `perf`;
- `security`.

No mezclar varias child Issues en un commit salvo cambio mecánico compartido aprobado.

## 4. Taxonomía de labels canónica

La integración actual no permite garantizar creación de labels. Esta lista fija nombres para crearlas en GitHub cuando se disponga de la operación/UI.

### Tipo

```text
type:feature
type:bug
type:docs
type:research
type:security
type:release
type:governance
```

### Área

```text
area:domain
area:solver
area:data
area:database
area:desktop
area:android
area:ai
area:knowledge
area:ux
area:toolbox
area:distribution
```

### Plataforma

```text
platform:shared
platform:windows
platform:android
```

### Estado

```text
status:ready
status:blocked
status:needs-evidence
status:review
status:decision-required
```

### Riesgo

```text
risk:critical
risk:high
risk:medium
risk:low
```

### Datos

```text
data:canonical
data:candidate
data:demo
data:fixture
data:provenance-required
```

Reglas:

- labels complementan, no reemplazan estado/contrato escrito;
- no marcar `data:canonical` sin provenance/decision;
- `status:blocked` requiere comentario con causa y unblock condition;
- `risk:critical/high` requiere revisión independiente.

## 5. Issue hierarchy

Mientras no existan relaciones nativas disponibles:

- child body incluye `Parent: #N`;
- parent contiene task list `- [ ] #child`;
- master contiene parent/task lists;
- WBS registra dependencias;
- PR enlaza child y parent.

Cuando se habiliten Sub-Issues nativas:

1. crear relación nativa sin borrar referencias Markdown;
2. verificar progress roll-up;
3. mantener WBS como contrato;
4. no cerrar trackers hasta comprobar equivalencia.

## 6. Estados y transiciones

```text
NOT_STARTED
  → READY
  → IN_PROGRESS
  → REVIEW
  → DONE
```

Desvíos:

```text
READY/IN_PROGRESS/REVIEW → BLOCKED
BLOCKED → READY/IN_PROGRESS
REVIEW → IN_PROGRESS (changes requested)
```

### READY

DoR completo.

### IN_PROGRESS

- branch creada;
- base SHA registrada;
- Task Contract comentado;
- no otra implementación activa incompatible.

### REVIEW

- Draft PR abierta;
- scope/gates ejecutados;
- evidence enlazada;
- truth sync preparado.

### DONE

- PR mergeada;
- acceptance PASS;
- Issue cerrada;
- parent/master/feature map sincronizados.

## 7. Task Contract comment

Usar:

```text
RESULT=PREFLIGHT_READY
PARENT=#
CHILD=#
BRANCH=
BASE_SHA=
OBJECTIVE=
REQUIREMENT_IDS=
EDITABLE_PATHS=
READ_ONLY_PATHS=
PROHIBITED_PATHS=
DEPENDENCIES=
FIXTURES=
TESTS=
BUILDS=
EVIDENCE=
RISKS=
```

## 8. Blocked comment

```text
RESULT=BLOCKED
BLOCKER_TYPE=DEPENDENCY|DATA|SCOPE|SECURITY|ENVIRONMENT|DECISION
EVIDENCE=
IMPACT=
REQUIRED_UNBLOCK=
OUT_OF_SCOPE_PATHS=
NEXT_SAFE_ACTION=
```

No ocultar bloqueo con mock/fallback.

## 9. Closure comment

```text
RESULT=PASS|PARTIAL|BLOCKED
PARENT=
CHILD=
BRANCH=
BASE_SHA=
HEAD_SHA=
PR=
MERGE_SHA=
REQUIREMENTS=
FILES=
TESTS=
BUILDS=
EVIDENCE=
MIGRATIONS_MANIFESTS=
TRUTH_SYNC=
RISKS=
NEXT=
```

`PARTIAL` no cierra como completed.

## 10. PR review roles

Revisión independiente obligatoria según superficie:

- agronomía/química: targets, composición, unidades;
- matemática: solver/constraints;
- data/DB: schemas/migrations;
- security: Electron/Android bridge/assets;
- AI: RAG/tools/provider/evaluation;
- UX/accessibility: split/gestures/i18n;
- release: packaging/update/rollback.

Una misma persona/agente puede hacer una segunda pasada técnica, pero no sustituye aprobación humana final en gates definidos.

## 11. Project board recomendado

Cuando se cree un GitHub Project nativo, campos canónicos:

- Status;
- Parent block;
- Milestone M0–M5;
- Platform;
- Area;
- Risk;
- Requirement IDs;
- Evidence status;
- Target release;
- Owner/reviewer.

Vistas:

1. Roadmap por milestone;
2. Current work;
3. Blocked/decision required;
4. Android;
5. Windows;
6. AI/knowledge;
7. Release gates.

No se afirma que este Project esté creado mientras la integración no lo permita.

## 12. Native milestone migration

Seguir `MILESTONE_PLAN.md`:

- nombres exactos M0–M5;
- asignación según trackers #46–#51;
- sin fechas inventadas;
- sin cambiar scope;
- actualizar master y links.

## 13. Automation/CI futura

Issues separadas deben incorporar gradualmente:

- markdown/internal-link validation;
- import-boundary checks;
- typecheck/lint/tests;
- build desktop/Android;
- secret scanning/dependency review;
- manifest/schema validation;
- release artifact hashes.

No introducir workflows que aparenten cobertura sin ejecutar la superficie real.

## 14. Regla para Codex

Antes de actuar:

1. leer AGENTS/START_HERE;
2. abrir parent/child;
3. verificar WBS/dependencies;
4. emitir preflight/Task Contract;
5. trabajar solo allowlist;
6. ejecutar gates;
7. crear Draft PR;
8. reportar evidencia y limitaciones;
9. no mergear sin autorización humana.
