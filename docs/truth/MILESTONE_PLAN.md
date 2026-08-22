# MILESTONE PLAN — Dr. Cannabis 2.0

Status: `CANONICAL_PENDING_GOV_02_MERGE`
Master: #14

## 1. Regla

Los hitos se cierran por evidencia, no por fecha. No se asignan fechas artificiales mientras no exista capacidad/velocidad observada del equipo y dependencias resueltas.

La integración GitHub disponible en GOV-02 no expone creación de Milestones nativas. Por eso se crearon tracking issues canónicas #46–#51 con nombres estables, alcance, task lists y gates. Cuando se disponga de la operación nativa, se crean Milestones con estos nombres y se asignan las Issues sin cambiar el plan.

## 2. M0 — Governance & Source Audit

Tracker: #46

Incluye:

- #1 B0 `DONE`;
- #16 GOV-02;
- #2 B1.

Salida:

- gobierno y arquitectura aprobados;
- legacy/Excel/knowledge auditados;
- conflictos/provenance;
- backlog y traceability completos.

Gate siguiente: habilita B2.

## 3. M1 — Nutrient Core & Solver

Tracker: #47

Incluye:

- #3 B2;
- #4 B3;
- #5 B4.

Salida:

- modelo nutricional;
- SQLite/migraciones;
- solver profesional;
- EC/pH/agua/mezcla.

Gate siguiente: habilita implementación funcional de app.

## 4. M2 — Shared App & Core Workflows

Tracker: #48

Incluye:

- #6 B5 y #17–#20;
- #7 B6;
- #8 B7;
- #9 B8.

Salida:

- base compartida React/TypeScript;
- Electron y Capacitor;
- calculadora completa;
- persistencia/historial;
- toolboxes.

Gate siguiente: provee herramientas/contexto reales para IA.

## 5. M3 — Local AI & Mobile Workspace

Tracker: #49

Incluye:

- #10 B9 y #21–#29;
- #11 B10 y #30–#36.

Salida:

- RAG/tools/citas/historial;
- providers locales desktop/Android;
- Google LiteRT-LM/Gemma aprobado por benchmark;
- split móvil 50/50;
- visor táctil;
- ES/EN/PT-BR;
- performance/accessibility.

Gate siguiente: habilita packaging y store testing.

## 6. M4 — Distribution & Stores

Tracker: #50

Incluye:

- #12 B11;
- #37–#41.

Salida:

- NSIS Windows;
- Android signed AAB;
- Google Play model/asset delivery;
- update/rollback;
- privacidad/licencias/compatibilidad.

Gate siguiente: genera artefactos candidatos exactos.

## 7. M5 — Multi-platform Release Candidate

Tracker: #51

Incluye:

- #13 B12;
- #42–#45.

Salida:

- RC Windows PASS;
- RC Android PASS;
- equivalencia cross-platform;
- aceptación comercial final.

## 8. Migración futura a Milestones nativas

Procedimiento:

1. Crear exactamente:
   - `M0 — Governance & Source Audit`;
   - `M1 — Nutrient Core & Solver`;
   - `M2 — Shared App & Core Workflows`;
   - `M3 — Local AI & Mobile Workspace`;
   - `M4 — Distribution & Stores`;
   - `M5 — Multi-platform Release Candidate`.
2. No fijar fecha hasta una revisión de planificación.
3. Asignar parents y child issues según trackers #46–#51.
4. Mantener trackers abiertos como índice/gate, o cerrarlos solo después de comprobar que la Milestone nativa conserva toda la información.
5. Actualizar #14 y este archivo con números/URLs de Milestone.
6. No cambiar el alcance al migrar.

## 9. Cierre de hito

Un tracker se cierra cuando:

- todas las Issues obligatorias están `DONE`;
- no hay blocker crítico trasladado silenciosamente;
- reportes de evidencia están enlazados;
- truth docs sincronizadas;
- aceptación humana del hito registrada.
