# NEXT STEPS — Canonical Blocks

No ejecutar todos los cambios en una sola reescritura. El proyecto se completa por bloques verificables.

## B0 — Governance & baseline
Objetivo: congelar verdad, arquitectura, alcance y método de trabajo.
Salida:
- AGENTS;
- docs/truth;
- mapa legacy;
- backlog GitHub;
- Draft PR de bootstrap.

## B1 — Auditoría técnica y migración de fuentes
- auditar ambos repositorios;
- inventariar funciones reales del legacy;
- auditar Excel/programa de fertirriego;
- auditar knowledge/prompt;
- definir dataset canónico y conflictos.

## B2 — Modelo nutricional canónico
- tipos de nutrientes/iones;
- formas elementales/óxidos;
- N-NO3/N-NH4;
- sales, purezas, lotes;
- objetivos por fase/sistema;
- agua base;
- tolerancias;
- migraciones SQLite.

## B3 — Solver PPM real
- matriz de aportes;
- resolución de dosis con restricciones;
- objetivos vs logrados;
- mínimos/máximos y tolerancias;
- casos no resolubles explicables;
- costo/stock;
- tests de regresión/equivalencia.

## B4 — EC / pH / preparación de solución
- contrato EC estimada vs medida;
- escalas PPM/TDS solo como presentación;
- pH tracker y ajustes seguros;
- orden de mezcla y compatibilidades;
- Tanque A/B cuando aplique.

## B5 — Desktop shell + seguridad Electron
- renderer React/TypeScript real;
- layout 3 columnas;
- navegación;
- preload tipado;
- IPC allowlist;
- `nodeIntegration: false`;
- validación de payloads.

## B6 — Fertilizer Calculator UI end-to-end
- seleccionar cultivo/fase/sistema/volumen;
- targets;
- productos/lotes;
- ejecutar solver;
- resultados y alertas;
- guardar formulación;
- exportar.

## B7 — Persistencia operativa
- sectores;
- campañas;
- inventario;
- lotes y costos;
- formulaciones;
- lecturas de riego/drenaje;
- historial;
- backup/export/import controlado.

## B8 — Toolboxes
Sub-bloques independientes:
- B8A VPD;
- B8B CFM;
- B8C Harvest Timer;
- B8D pH Tracker;
- B8E Feeding Calculator;
- B8F Soil Mix;
- B8G Yield Estimator;
- B8H Green Light.

## B9 — Chatbot Dr. Cannabis
- prompt maestro versionado;
- knowledge store versionado;
- contexto JSON;
- proveedor LLM local/offline;
- ES/EN/PT-BR;
- seguridad y límites;
- pruebas de grounding y faltantes.

## B10 — Integración UX y calidad
- loading/empty/error/degraded;
- desktop responsive;
- accesibilidad básica;
- errores recuperables;
- logs locales sin datos sensibles;
- performance.

## B11 — Instalador y release Windows
- electron-builder/NSIS;
- one-click o assisted install decidido explícitamente;
- iconos/nombre/product metadata;
- instalación limpia;
- upgrade;
- persistencia;
- uninstall;
- offline;
- release artifact.

## B12 — Release Candidate
- suite completa;
- auditoría de seguridad;
- regresión legacy crítica;
- documentación usuario;
- release notes;
- aceptación final.

## Regla de avance
Un bloque solo pasa a `DONE` cuando:
1. issue cerrada;
2. PR mergeada;
3. tests/evidencia PASS;
4. `FEATURE_MAP` actualizado;
5. `SOURCE_OF_TRUTH` o `DECISION_LOG` actualizado si cambió contrato/arquitectura.
