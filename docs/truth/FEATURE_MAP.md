# FEATURE MAP — Dr. Cannabis

Estado inicial: `LEGACY_AVAILABLE`, `SCAFFOLD_PRESENT`, `NOT_YET_ACCEPTED`.

| Área | Legacy `Dr.-Cannabis` | Repo canónico `Dr.Cannabis` | Estado objetivo |
| --- | --- | --- | --- |
| Shell desktop | No, web/HTML | Electron main/preload inicial | REBUILD/VERIFY |
| Layout 3 columnas | Parcial/legacy | No demostrado | TODO |
| Fertilizer Calculator | Sí, V4.4 legacy | IPC declarado, solver no demostrado | MIGRATE + REWRITE CORE |
| Targets por fase | Sí, hard-coded/datos legacy | Seeds de ejemplo | MIGRATE TO CANONICAL DATA |
| Sales/productos | Sí, librería amplia | 6 sales demo | MIGRATE/VALIDATE |
| Conversión óxidos/elemento | Sí | No demostrada | PORT + TEST |
| N-NO3 / N-NH4 | Sí, correcciones legacy | Modelo actual insuficiente | MODEL + TEST |
| EC estimada/medida | Sí/parcial | Campos DB presentes | DEFINE MODEL + VERIFY |
| pH | Conocimiento/legacy | Sin módulo aceptado | TODO |
| Sectores/campañas | Legacy conceptual | Tablas DB presentes | COMPLETE |
| Inventario/lotes/pureza | Legacy parcial | Tablas DB presentes | COMPLETE |
| Costos/historial | Sí legacy | Tablas parciales | MIGRATE/COMPLETE |
| Export PDF/CSV/XLSX | Legacy parcial / IPC declarado | No handlers demostrados | TODO |
| VPD | Conocimiento/legacy | No módulo aceptado | TODO |
| CFM | Conocimiento/legacy | No módulo aceptado | TODO |
| Harvest Timer | Conocimiento/legacy | No módulo aceptado | TODO |
| Feeding Calculator | Conocimiento/legacy | No módulo aceptado | TODO |
| Soil Mix | Conocimiento/legacy | No módulo aceptado | TODO |
| Yield Estimator | Conocimiento/legacy | No módulo aceptado | TODO |
| Green Light | Conocimiento/legacy | No módulo aceptado | TODO |
| Chatbot | Backend local + prompt/knowledge | No integración aceptada | MIGRATE/REDESIGN |
| ES/EN/PT-BR | Requisito definido | No demostrado | TODO |
| SQLite | Legacy better-sqlite3 backend | Drizzle/better-sqlite3 scaffold | HARDEN |
| Migrations | No canónicas | Scaffold presente | VERIFY |
| Tests | Algunos self-tests legacy | Vitest dependency, suites no demostradas | BUILD TEST HARNESS |
| Windows installer | No productivo legacy | electron-builder config | HARDEN/SMOKE TEST |
| Offline | Intención y assets locales | Objetivo | VERIFY END-TO-END |

## Definiciones de estado
- `TODO`: no existe evidencia suficiente.
- `MIGRATE`: hay funcionalidad legacy a portar.
- `REWRITE CORE`: concepto válido, implementación no se considera base productiva.
- `COMPLETE`: completar una estructura ya iniciada.
- `HARDEN`: existe scaffolding pero necesita seguridad/tests/release.
- `VERIFY`: puede existir, pero no se declara funcional hasta probarlo.

Este archivo se actualiza al cerrar cada issue canónica.
