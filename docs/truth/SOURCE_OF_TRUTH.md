# SOURCE OF TRUTH — Dr. Cannabis

Estado inicial de reanudación: 2026-08-21.
Actualización multiplataforma propuesta: GOV-02/#16.

## 1. Producto

**Dr. Cannabis – Fertilizer-IA** es una aplicación técnica/educativa local-first/offline para Windows y Android orientada a formulación y manejo de fertirriego, datos del cultivo y asistencia agronómica contextual.

Núcleo:

- objetivos PPM por nutrientes/iones según fase/sistema;
- conversión a gramos de sales para cualquier volumen;
- composición/pureza configurable por producto/lote;
- EC objetivo, estimada y medida con límites explícitos;
- pH/agua/mezcla;
- inventario, costos, sectores, campañas e historial;
- bot contextual con RAG, herramientas y citas.

## 2. Arquitectura canónica

### Compartido

- React + TypeScript;
- dominio/solver independiente de UI y plataforma;
- casos de uso y contratos tipados;
- componentes/pantallas funcionales compartidos;
- SQLite mediante adapters;
- chat-core/RAG/tools/i18n compartidos.

### Windows

- Electron;
- preload/IPC seguros;
- SQLite local;
- provider LLM local desacoplado;
- instalador NSIS.

### Android

- Capacitor sobre la UI compartida;
- Kotlin solo para plugins nativos;
- Google LiteRT-LM como runtime objetivo de IA;
- familia Gemma preferida para evaluación, modelo final pendiente de benchmark;
- AAB/Google Play;
- sin API paga/key/PC/Wi-Fi local como requisito;
- inferencia offline después de instalar assets.

## 3. UX desktop

Tres zonas:

1. izquierda: marca + navegación;
2. centro: módulo/visor activo;
3. derecha: chatbot persistente.

## 4. UX Android

### Portrait

- visor/workspace superior: 50%;
- chat inferior: 50%.

### Landscape/tablet

- visor izquierdo: 50%;
- chat derecho: 50%.

Dentro del chat:

- historial buscable/interactivo arriba;
- conversación activa abajo;
- default 30/70, historial ajustable entre 25–45%;
- el split principal permanece 50/50.

Visor:

- imágenes, tablas, gráficos, resultados, artifacts y citas;
- pinch-to-zoom, pan, double-tap, reset/fit;
- tablas con scroll bidireccional, headers sticky y virtualización cuando aplique;
- estado persistente por thread/artifact.

El chat no ocupa toda la pantalla ni cubre el visor durante uso normal.

## 5. Módulos

1. Fertilizer Calculator.
2. CFM Calculator / Air Flow Need.
3. VPD Calculator.
4. Harvest Timer.
5. Costos / Historial.
6. pH Tracker.
7. Feeding Calculator.
8. Soil Mix Calculator.
9. Yield Estimator.
10. Green Light.
11. Inventario/Configuración.
12. Dr. Cannabis IA.

## 6. Idiomas

Producto y bot:

- Español;
- English;
- Português do Brasil.

## 7. Estado real observado

### Repo canónico `cabaniasriocuarto/Dr.Cannabis`

Existe scaffolding inicial de Electron/TypeScript/SQLite:

- `src/main/main.ts`;
- `src/preload/preload.ts`;
- `src/db/schema.ts`, `dbManager.ts`, `seed.ts`, `migrate.ts`;
- `electron-builder.json`;
- dependencias React/Vite/Electron/Drizzle/better-sqlite3/Vitest.

El renderer, handlers, solver productivo, shell Android, IA local y UX móvil no están aceptados por evidencia actual.

### Repo legacy `cabaniasriocuarto/Dr.-Cannabis`

Contiene:

- app V4.4 monolítica;
- React/Babel/Tailwind de un archivo;
- targets y conversiones de óxidos/elementos;
- productos, costos/historial y formulación;
- backend local, prompt y knowledge store.

Es fuente de migración, no arquitectura final.

## 8. Fuente agronómica interna

El Excel/programa histórico debe:

- inventariarse por hoja/columna/fórmula/unidad;
- separar datos canónicos, experimentales, cacheados, dañados y ejemplos;
- versionarse;
- producir fixtures de equivalencia;
- registrar conflictos Excel ↔ legacy ↔ seed ↔ knowledge;
- no promover números dudosos sin decisión.

El seed actual sigue siendo demo hasta validación.

## 9. Biblioteca de productos/conocimiento

La biblioteca histórica contempla más de 60 sales/ácidos/aditivos y conocimiento sobre sistemas, semillas, luces, ambiente, invernaderos, VPD, CFM, riego, síntomas, plagas y técnicas.

La versión final modela como datos:

- nombre/fórmula;
- composición y basis;
- forma elemental/óxido/especie;
- pureza/lote;
- aportes/restricciones/compatibilidades;
- costo/stock;
- fuente/versión/provenance;
- tema, idioma, fase y sistema para knowledge.

## 10. Bot Dr. Cannabis

Objetivo: conversación natural, no preguntas precargadas.

Orden de fuentes:

1. contexto JSON actual;
2. SQLite/dataset canónico;
3. Prompt Maestro;
4. knowledge local versionado;
5. rango genérico solo como fallback explícito.

Componentes:

- historial/threads locales;
- búsqueda exacta + semántica;
- RAG con citations;
- tool calling determinista;
- providers locales desktop/Android;
- orchestration con streaming/cancelación/errores.

Reglas:

- datos app primero;
- no inventar faltantes/tool results;
- cálculos solo mediante dominio/tools;
- read-only por defecto; mutaciones con confirmación explícita;
- respuesta breve/accionable y ampliable;
- ES/EN/PT-BR;
- sin consejo médico/consumo ni asesoría legal definitiva;
- sin fallback cloud oculto;
- datos/chat locales por defecto.

## 11. IA Android

Decisión:

- Capacitor/Kotlin bridge;
- Google LiteRT-LM;
- Gemma candidate family;
- modelo/configuración/requisitos definidos por #27;
- model manifest con versión/hash/licencia/provenance;
- capability detection;
- lifecycle/memoria/thermal/cancelación;
- update/rollback;
- Google Play asset delivery detrás de abstracción;
- experiencia instalar→abrir→usar, sin selector técnico.

No se declara compatibilidad concreta hasta benchmark/dispositivos reales.

## 12. No negociables de ingeniería

- no reescritura gigante;
- no solver demo;
- no composiciones inventadas;
- no botón falso;
- no `node_modules`, DB de usuario, secrets o modelos no gestionados en repo;
- no Node directo en renderer;
- no UI Android duplicada en Kotlin;
- no fórmulas en UI/Kotlin/LLM;
- no cloud oculto;
- tests para fórmulas, migraciones, contracts, UI, providers y releases;
- docs/truth sincronizadas.

## 13. Roadmap y trazabilidad

- Master: #14.
- Governance update: #16.
- WBS: `docs/truth/WORK_BREAKDOWN_STRUCTURE.md`.
- Milestones: `docs/truth/MILESTONE_PLAN.md`, trackers #46–#51.
- Traceability: `docs/truth/TRACEABILITY_MATRIX.md`.
- Child issues B5/B9/B10/B11/B12: #17–#45.

## 14. Definición de terminado

Dr. Cannabis es entregable cuando:

- todos los bloques/child issues críticos cerrados;
- solver/dataset/DB verificados;
- módulos operativos en las plataformas declaradas;
- equivalencia cross-platform;
- bot grounded, offline y trilingüe;
- UX móvil split/visor/historial PASS;
- providers/modelos aprobados por benchmark;
- instaladores/AAB exactos probados;
- install/upgrade/rollback/offline PASS;
- seguridad/privacidad/licencias/SBOM completas;
- tests/build/QA PASS;
- documentación/release notes actualizadas;
- aceptación humana final antes de publicar/vender.
