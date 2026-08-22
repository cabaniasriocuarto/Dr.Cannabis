# DEVELOPMENT WORKFLOW — Dr. Cannabis

## 1. Objetivo

Aplicar Harness Engineering para que contratos, límites, tests, dispositivos y trazabilidad reduzcan scope drift, divergencia cross-platform y declaraciones de éxito sin evidencia.

## 2. Unidad de trabajo

Unidad normal:

- 1 child Issue coherente;
- 1 branch;
- 1 Task Contract;
- 1 objetivo semántico;
- 1 Draft PR;
- 1 revisión independiente;
- 1 merge humano.

Parents consolidan gates; no son excusa para una PR gigante.

## 3. Jerarquía

- Master: #14.
- Governance: #1/#16.
- Parents B1–B12: #2–#13.
- Child issues técnicas: #17–#45.
- Milestone trackers: #46–#51.
- WBS: `WORK_BREAKDOWN_STRUCTURE.md`.
- Requirements: `TRACEABILITY_MATRIX.md`.

Una child issue debe declarar `Parent: #N`. Un parent se cierra solo cuando sus child issues obligatorias y gates están completos.

## 4. Definition of Ready

Antes de iniciar:

- dependencias satisfechas;
- repo/branch/base SHA;
- parent/child Issue;
- requirement IDs;
- contratos aplicables leídos;
- paths editables/read-only/prohibidos;
- datos/fixtures autorizados;
- sistemas externos permitidos;
- tests/build/evidencia esperados;
- riesgos y tamaño;
- reviewer/gate humano cuando corresponda.

Si falta un requisito material: `BLOCKED`, no improvisar.

## 5. Task Contract obligatorio

Debe fijar:

```text
REPOSITORY
PARENT_ISSUE
CHILD_ISSUE
BRANCH
BASE_SHA
OBJECTIVE
REQUIREMENT_IDS
EDITABLE_PATHS
READ_ONLY_PATHS
PROHIBITED_PATHS
ALLOWED_EXTERNAL_SYSTEMS
PROHIBITED_EXTERNAL_SYSTEMS
INPUT_FIXTURES
TEST_COMMANDS
BUILD_COMMANDS
VISUAL_DEVICE_EVIDENCE
ACCEPTANCE_CRITERIA
EXPECTED_CHANGE_SIZE
KNOWN_RISKS
```

No iniciar edición hasta que sea consistente con la Issue y truth docs.

## 6. Implementación

### Dominio

- funciones puras;
- unidades y tipos explícitos;
- no React/Electron/Capacitor/Kotlin/DB concreta;
- invariants/property tests;
- errors tipados;
- provenance.

### Application

- casos de uso separados;
- depende de ports;
- cancelación/timeouts/idempotencia;
- no lógica visual.

### UI

- componentes compartidos;
- no fórmulas;
- no acceso nativo directo;
- normal/loading/empty/error/degraded;
- i18n y accessibility;
- artifacts estructurados.

### Platform adapters

- implementación mínima de ports;
- input/output validados;
- lifecycle/errores;
- ninguna lógica agronómica duplicada.

## 7. Política cross-platform

- mismo dominio y contratos para Windows/Android;
- no crear forks `FeatureDesktop`/`FeatureMobile` sin ADR;
- diferencias visuales mediante layouts/tokens/props/slots;
- Kotlin solo en plugins nativos;
- mismas fixtures deben producir misma semántica;
- schema/version compatibility explícita.

Toda excepción exige:

1. evidencia de necesidad;
2. Issue/ADR;
3. diferencia deliberada documentada;
4. test de equivalencia donde aplique.

## 8. Política legacy y datos

Para cada migración:

- archivo/función/celda origen;
- inputs/outputs/unidades;
- comportamiento esperado;
- datos canónicos vs demo/candidato;
- diferencias deliberadas;
- test de equivalencia/regresión;
- provenance/version.

No copiar errores conocidos por compatibilidad accidental.

No mezclar targets de fuentes diferentes sin decisión.

## 9. Política IA

Antes de integrar modelo/runtime:

- contratos #21;
- manifest #26;
- corpus/umbrales #27;
- privacy/offline requirements;
- capability detection;
- rollback strategy.

Reglas:

- RAG, tools y provider separados;
- modelo no calcula dominio;
- no cloud fallback oculto;
- fakes solo para tests;
- provider real requiere device/runtime evidence;
- no fijar requisitos/modelo por intuición;
- mode airplane y network capture para offline;
- no telemetría de contenido por defecto.

## 10. Política UX móvil

Todo cambio en #30–#36 debe probar:

- portrait/landscape/tablet aplicable;
- split 50/50;
- historial arriba/conversación abajo;
- internal 30/70 y bounds 25–45%;
- teclado/safe areas;
- rotación/background;
- viewer gestures/tablas;
- state continuity;
- ES/EN/PT-BR/pseudo-locale;
- touch/accessibility;
- dispositivo real, no solo navegador desktop.

Un screenshot único no prueba interacción ni lifecycle.

## 11. Guardas post-edit

Como mínimo:

- `git diff --check`;
- diff revisado;
- archivos reales == allowlist;
- no secrets;
- no DB/chats privados;
- no binaries/model assets/builds no gestionados;
- no `node_modules`;
- no generated Android/Windows junk fuera de política;
- typecheck;
- lint/import boundaries;
- tests focales;
- regression test;
- build aplicable;
- manifests/migrations revisados;
- truth sync.

## 12. Verificación por superficie

### Dominio

- unit/property/regression;
- known cases/limits/errors;
- same fixture cross-platform.

### DB

- fresh migration;
- upgrade fixture;
- transaction rollback;
- corruption/version mismatch;
- backup/import when in scope.

### Electron

- security flags;
- preload/IPC allowlist;
- CSP/navigation;
- dev/prod paths;
- lifecycle;
- build/smoke/installer when applicable.

### Android

- Capacitor/Gradle build;
- TypeScript/Kotlin bridge;
- emulator + real device;
- orientation/background/process recreation;
- permission denied;
- low-memory/thermal;
- signed AAB when release scope.

### IA

- retrieval/citations;
- tools;
- abstention;
- multilingual;
- provider lifecycle/stream/cancel;
- model manifest/hash/license;
- resource metrics;
- mode airplane/network capture.

### UI

- normal/loading/empty/error/degraded;
- visual matrix;
- keyboard/touch/accessibility;
- large thread/table/image;
- viewer/chat coordination;
- state restore.

### Release

- exact artifact hash;
- clean install;
- upgrade;
- rollback;
- persistence;
- offline;
- uninstall policy;
- licenses/SBOM/privacy.

## 13. CI y comandos

Cada PR agrega/ejecuta solo gates relevantes, manteniendo anteriores:

```text
typecheck
lint
import-boundaries
test-domain
test-application
test-contracts
test-db
build-shared-ui
build-desktop
build-android-debug
```

Release:

```text
package-windows
android-signed-aab
fresh-install
upgrade
rollback
offline-smoke
security-audit
artifact-hash-verify
```

Si un comando no existe todavía, reportar `NOT_CONFIGURED` y crear Issue cuando sea requisito, no simularlo.

## 14. Evidencia

### Código/dominio

- output de comandos;
- fixture/expected result;
- diff exacto.

### UI

- screenshots de estados;
- video/interacción para gestos/navegación;
- tamaño/orientación/idioma;
- artifact/thread IDs cuando sea útil.

### Dispositivo

- modelo/OS/perfil;
- build hash/version;
- logs;
- RAM/storage/thermal cuando aplique;
- mode airplane/network evidence.

### Release

- artifact/hash/signature;
- manifest de versiones;
- install/upgrade/rollback report.

No commitear datos privados dentro de evidencia.

## 15. Draft PR

Debe incluir:

- parent/child Issues;
- objective;
- requirement IDs;
- base/head exactos;
- scope/paths;
- decisiones/ADR;
- tests/builds;
- visual/device evidence;
- migrations/manifests;
- security/privacy effects;
- truth sync;
- risks/known limitations;
- acceptance checklist.

Mantener Draft hasta completar gates y revisión.

## 16. Review independiente

Obligatoria para:

- solver/unidades;
- DB/migrations;
- Electron security/IPC;
- Android bridge/model assets;
- RAG/tools/providers;
- UX móvil split/gestures;
- packaging/update/rollback;
- RC.

Reviewer debe:

- validar exact head;
- comparar diff con allowlist;
- revisar requirement trace;
- buscar fallback silencioso/mocks disfrazados;
- revisar fórmulas/units/security/lifecycle;
- comprobar evidence del artefacto exacto.

## 17. Scope expansion

Si surge trabajo fuera de scope:

1. detener esa edición;
2. registrar evidencia;
3. crear/actualizar child Issue;
4. enlazar dependencia;
5. continuar solo con objetivo original o declarar `BLOCKED`.

No “aprovechar” una PR para refactor/feature lateral.

## 18. Merge

No mergear solo porque compila.

Requisitos:

- acceptance completa;
- CI/tests aplicables PASS;
- review sin blocker;
- exact artifact/evidence cuando aplique;
- truth/feature map/traceability sync;
- parent checklist actualizada;
- aprobación humana.

## 19. Cierre

Comentario de cierre:

```text
RESULT=PASS|BLOCKED|PARTIAL
PARENT=
CHILD=
BRANCH=
COMMIT=
PR=
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

Solo `PASS` permite cerrar como completed.

## 20. Progreso

El progreso se mide por:

- child issues cerradas;
- PRs mergeadas;
- gates/evidence;
- feature map;
- milestone trackers.

No usar porcentajes subjetivos ni task lists sin respaldo como prueba de avance.
