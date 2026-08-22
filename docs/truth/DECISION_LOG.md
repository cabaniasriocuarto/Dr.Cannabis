# DECISION LOG — Dr. Cannabis

## D-001 — Repo canónico
**Decisión:** usar `cabaniasriocuarto/Dr.Cannabis` como repo canónico de producto.

**Motivo:** ya contiene scaffolding de Electron + TypeScript + SQLite/Drizzle + electron-builder, que coincide con el objetivo de desktop instalable.

**Legacy:** `cabaniasriocuarto/Dr.-Cannabis` se mantiene como fuente funcional/read-only durante la migración.

## D-002 — Migración incremental, no reescritura gigante
**Decisión:** completar el producto por bloques/Issues/PRs pequeños y verificables.

**Motivo:** el legacy contiene lógica útil pero arquitectura monolítica; el repo nuevo contiene arquitectura inicial pero funcionalidad incompleta. Una reescritura de una sola vez elevaría el riesgo de perder reglas y datos.

## D-003 — Calculadora como núcleo
**Decisión:** la lógica de fertilización vive en un dominio común TypeScript independiente de React/Electron.

Toolboxes y chatbot consumen sus resultados; no duplican fórmulas.

## D-004 — Persistencia local
**Decisión:** SQLite local como persistencia canónica del desktop, con migraciones versionadas.

## D-005 — Local-first/offline
**Decisión:** la aplicación debe poder operar sin internet para cálculo, datos, historial y knowledge local. El chatbot apunta a proveedor LLM local/desacoplado.

## D-006 — Layout principal
**Decisión:** tres columnas: navegación izquierda, módulo activo centro, chatbot persistente derecha.

## D-007 — Idiomas
**Decisión:** ES, EN y PT-BR son requisitos de producto; la arquitectura debe usar claves i18n y no texto disperso hard-coded como solución final.

## D-008 — Solver productivo
**Decisión:** no aceptar la demo simplificada EC→gramos ni recetas hard-coded como solver productivo. El solver se basa en objetivos por nutriente/ion + composición/pureza real + restricciones/tolerancias.

## D-009 — Datos legacy/Excel requieren provenance
**Decisión:** ningún número se vuelve canónico solo por existir en código viejo o seed. Debe identificarse fuente, unidad, forma química y versión.

## D-010 — Seguridad Electron
**Decisión:** renderer aislado (`contextIsolation=true`, `nodeIntegration=false`) y API por preload/IPC allowlisted y validada.

## D-011 — Windows primero
**Decisión:** primera distribución comercial: instalador Windows NSIS. macOS/Linux quedan como extensión posterior.

## D-012 — Harness Engineering liviano
**Decisión:** usar preflight, Task Contract, scope allowlist, tests, build, verificación UI/integración, Draft PR y revisión independiente, adaptado del método usado en Bot-Trading-IA.
