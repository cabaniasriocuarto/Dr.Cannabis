# Prompt de fuente del proyecto — Dr. Cannabis 2.0

Usar este documento como contexto persistente del proyecto ChatGPT/Codex. No reemplaza la lectura del repo: ante cualquier contradicción, seguir `AGENTS.md`, `docs/truth/`, código observable e Issues actuales.

---

## IDENTIDAD

El proyecto se llama **Dr. Cannabis – Fertilizer-IA**.

Es una aplicación profesional local-first/offline para Windows y Android destinada a:

- formular soluciones de fertirriego;
- convertir objetivos PPM por nutriente/ion en gramos de sales para cualquier volumen;
- manejar EC, pH, agua, lotes, inventario, costos, campañas e historial;
- ofrecer toolboxes técnicos;
- brindar un chatbot agronómico natural, contextual, grounded y trilingüe.

La calculadora/solver es el núcleo. IA, UI y toolboxes no duplican sus fórmulas.

## REPOSITORIOS

- Canónico: `cabaniasriocuarto/Dr.Cannabis`.
- Legacy funcional/read-only: `cabaniasriocuarto/Dr.-Cannabis`.

El legacy contiene app V4.4, datos, conversiones, frontend/backend, prompt y knowledge útil. Se migra incrementalmente con tests y provenance; no se borra ni se copia ciegamente.

## ESTADO DE GOBIERNO

- B0/#1: `DONE`, PR #15 mergeada.
- GOV-02/#16: actualización de arquitectura multiplataforma/UX móvil/backlog, pendiente de merge mientras su PR esté Draft/open.
- B1/#2: `IN_PROGRESS`, auditoría legacy + Excel + knowledge/prompt.
- B2–B12: no iniciar fuera de orden salvo dependencia/Issue explícita.

Master: #14.

WBS y trazabilidad:

- `docs/truth/WORK_BREAKDOWN_STRUCTURE.md`;
- `docs/truth/MILESTONE_PLAN.md`;
- `docs/truth/TRACEABILITY_MATRIX.md`.

## ORDEN DE AUTORIDAD

1. código/datos observables del repo canónico;
2. `docs/truth/`;
3. contratos de `docs/architecture/` y `docs/product/`;
4. Issues/PRs;
5. dataset/Excel/composiciones validadas;
6. knowledge local versionado;
7. documentación oficial externa investigada;
8. conocimiento general del modelo solo como complemento.

Separar siempre `CONFIRMADO`, `INFERIDO` y `PENDIENTE_DE_VALIDAR`.

## ARQUITECTURA MULTIPLATAFORMA

### Base compartida

- React + TypeScript;
- dominio/solver independiente;
- application cases;
- contracts/schemas versionados;
- componentes/pantallas funcionales compartidos;
- chat-core/RAG/tools/i18n compartidos;
- SQLite mediante adapters.

### Windows

- Electron;
- `contextIsolation=true`;
- `nodeIntegration=false`;
- preload tipado/IPC allowlisted/validado;
- provider LLM local desacoplado;
- instalador NSIS;
- usuario final no instala Node/VS Code.

### Android

- Capacitor sobre la UI React compartida;
- Kotlin solo para plugins/adaptadores nativos;
- no crear otra UI completa en Compose;
- Google LiteRT-LM como runtime objetivo;
- familia Gemma preferida para evaluación;
- modelo/tamaño/formato/cuántización/requisitos solo después de benchmark #27;
- signed AAB y Google Play.

### Límites

- `domain` no importa React/Electron/Capacitor/Kotlin/SQLite concreto;
- UI no accede directamente a DB/filesystem/procesos/LLM;
- capacidades nativas entran por ports tipados;
- no fórmulas en React, Kotlin o prompt;
- no forks mobile/desktop de una misma feature sin ADR y evidencia.

Contrato: `docs/architecture/CROSS_PLATFORM_ARCHITECTURE.md`.

## UX DESKTOP

Tres zonas:

1. izquierda: marca y navegación;
2. centro: módulo/visor activo;
3. derecha: chatbot persistente.

Módulos previstos:

- Fertilizer Calculator;
- CFM Calculator;
- VPD Calculator;
- Harvest Timer;
- Costos/Historial;
- pH Tracker;
- Feeding Calculator;
- Soil Mix;
- Yield Estimator;
- Green Light;
- Inventario/Configuración;
- Dr. Cannabis IA.

## UX MÓVIL CANÓNICA

El chat no usa pantalla completa. Tiene dos estados explícitos.

### Estado `EXPANDED_SPLIT`

Portrait:

- visor superior: 50% del área útil;
- chat inferior: 50%.

Landscape/tablet:

- visor izquierdo: 50%;
- chat derecho: 50%.

El split expandido MVP es fijo 50/50. Ningún panel cubre al otro.

### Estado `MINIMIZED_BUBBLE`

- el panel de chat deja de ocupar su mitad;
- el visor o módulo activo ocupa todo el espacio útil;
- queda una burbuja pequeña fija abajo a la izquierda;
- la burbuja no es arrastrable en MVP;
- tocarla restaura exactamente `EXPANDED_SPLIT`;
- no existe chat full-screen.

La burbuja debe:

- permanecer dentro de safe areas;
- usar 44–48 dp visuales y hit target mínimo 48 × 48 dp;
- no tapar navegación, guardado ni controles críticos;
- indicar generación, respuesta nueva o error sin revelar contenido sensible;
- funcionar con TalkBack, teclado y reduced motion.

Minimizar/restaurar conserva:

- thread activo;
- historial;
- borrador;
- mensajes y generación activa/parcial/completa;
- artifact activo;
- zoom, pan, scroll, filtros y orden;
- módulo, cultivo, sector y campaña.

Minimizar no pausa ni cancela silenciosamente la generación.

### Dentro del panel de chat expandido

- historial buscable/interactivo arriba;
- conversación activa abajo;
- default: historial 30%, conversación 70%;
- historial ajustable entre 25% y 45% del panel;
- preferencia persistida;
- buscador por título/contenido/fecha/cultivo/módulo/idioma;
- crear, renombrar, fijar, archivar y eliminar con confirmación;
- cambiar de thread restaura borrador, mensajes, artifact, zoom y scroll;
- botón minimizar accesible en el encabezado.

### Visor

Soporta:

- imágenes/fotos;
- tablas;
- gráficos;
- recetas/formulaciones;
- resultados del solver/toolboxes;
- documentos y citas.

Interacciones:

- pinch-to-zoom;
- pan;
- double-tap;
- reset/fit;
- tablas con scroll horizontal/vertical, headers sticky y virtualización;
- detalle de celda;
- estado persistente por thread/artifact;
- uso de toda el área útil cuando el chat está minimizado.

Teclado, minimización, restauración, safe areas, rotación y background/reopen no deben perder estado ni desmontar el visor.

Contrato: `docs/product/MOBILE_SPLIT_WORKSPACE_SPEC.md`.
Issues: #30 y #53.
Requirements: R-015, R-030, R-031 y R-032.

## SOLVER DE FERTILIZACIÓN

### Inputs

- fase fenológica;
- sistema tierra/coco/hidro;
- volumen;
- objetivos PPM por nutriente/ion;
- EC objetivo;
- agua base cuando exista;
- productos/sales habilitados;
- composición y basis;
- pureza/lote;
- tolerancias/restricciones;
- stock/costo cuando aplique.

### Outputs

- gramos y g/L por sal/producto;
- aporte por nutriente/ion y por sal;
- objetivo vs logrado;
- error/desviación;
- constraints activas;
- EC estimada claramente etiquetada;
- costo/stock/lote;
- warnings/compatibilidades;
- orden de mezcla/tanques A/B;
- guardar/exportar;
- artifacts para visor/chat.

### Fórmula base

Para fracción másica `f`, gramos `g` y volumen `V`:

`ppm_aportados = g × f × 1000 / V`

Una sal aporta múltiples nutrientes. El solver completo es matricial/restringido; no repetir una fórmula aislada por nutriente ni usar `EC × factor = gramos` como producción.

### Formas químicas

Distinguir:

- N total;
- N-NO3;
- N-NH4;
- P/P2O5;
- K/K2O;
- Ca/CaO;
- Mg/MgO;
- S y especies declaradas.

Pureza se aplica una sola vez. EC estimada no es EC medida.

## DATOS Y PROVENANCE

El Excel/programa histórico se audita antes de migrar.

Todo dato canónico registra:

- fuente;
- versión/hash;
- unidad;
- forma química/basis;
- fase/sistema;
- tolerancia;
- estado canónico/candidato/demo;
- decisión.

No asumir que seed, legacy o tabla experimental son correctos por existir.

Entidades previstas:

- productos/sales;
- composiciones;
- purezas/lotes;
- stock/precios;
- sectores/campañas;
- targets;
- formulaciones/resultados;
- lecturas/riegos/drenajes;
- EC/pH;
- costos/alertas;
- chats/messages/citations/artifacts;
- estado de presentación del chat y preferencias de layout;
- manifests de knowledge/model/release;
- idioma/unidades/preferences.

## TOOLBOXES

Cada toolbox sigue:

`función de dominio → tests → caso de uso → UI compartida → tool/artifact`

- VPD: T aire + T hoja + HR + etapa → kPa/estado/acción.
- CFM: dimensiones + recambio + filtro/ductos/curvas/carga térmica → CFM y m³/h.
- Harvest: fechas/duración orientativa.
- pH Tracker: entrada/drenaje/tendencias.
- Feeding: reutiliza solver.
- Soil Mix: proporciones/volumen.
- Yield: estimación sin promesa.
- Green Light: ayuda contextual; hardware futuro fuera de alcance salvo decisión.

## CHATBOT DR. CANNABIS

### Objetivo

Responder preguntas libres y naturales, no un menú de preguntas precargadas.

### Componentes

- threads/historial local;
- contexto estructurado;
- knowledge ingestion;
- búsqueda exacta + semántica;
- RAG con citas;
- tool registry;
- providers locales;
- orquestador/streaming/cancelación;
- estado de presentación expandido/minimizado desacoplado del turno;
- artifacts al visor;
- ES/EN/PT-BR.

### Orden de fuentes

1. contexto actual;
2. SQLite/dataset canónico;
3. Prompt Maestro;
4. knowledge local versionado;
5. fallback genérico explícito.

### Reglas

- no inventar valores, fuentes, purezas, lecturas o tool results;
- pedir solo datos clave;
- separar dato interno/inferencia/rango genérico;
- cálculos mediante tools reales;
- read-only por defecto;
- mutación solo con intención + confirmación + resultado real;
- no modificar BD autónomamente;
- citations verificables;
- abstenerse/preguntar si no hay evidencia;
- límites técnico/educativos;
- sin consejo médico/consumo ni asesoría legal definitiva;
- no cloud fallback oculto;
- minimizar la UI no cancela ni altera el turno.

## IA ANDROID LOCAL

Ruta:

```text
React/TypeScript → Capacitor plugin → Kotlin → Google LiteRT-LM → modelo local
```

Contrato comercial:

- sin API paga obligatoria;
- sin API key;
- sin PC;
- sin Wi-Fi local;
- offline después de assets;
- usuario no elige modelo/runtime/cuántización;
- instalar→abrir→usar.

Cada modelo requiere manifest:

- model/runtime version;
- format/quantization/context;
- size/hash/license/source;
- idiomas validados;
- min/recommended device profile;
- benchmark run;
- knowledge/embedding compatibility.

Manejar:

- asset missing/downloading/verifying/ready/corrupt/incompatible;
- RAM/storage/thermal;
- background/resume;
- streaming/cancel;
- streaming mientras el chat está minimizado;
- update/rollback;
- capability detection.

No declarar modelo o requisitos concretos antes de #27.

Contrato: `docs/architecture/ANDROID_ON_DEVICE_AI.md`.

## IA WINDOWS LOCAL

- implementa el mismo `AiProvider`;
- runtime/modelo elegidos por benchmark;
- Electron main controla lifecycle;
- renderer no inicia procesos;
- offline, stream, cancel, health y shutdown;
- sin fallback cloud oculto.

## RAG Y CITAS

Knowledge chunk metadata:

- source/version/hash;
- section/locator;
- topic/subtopic;
- language;
- phase/system;
- canonical status;
- embedding version.

Reglas:

- pipeline reproducible/idempotente;
- exact search para fórmulas/nombres/códigos;
- semantic search para intención/paráfrasis/idiomas;
- filters/ranking/top-k/threshold documentados;
- no enviar toda la biblioteca;
- no-match produce abstención/pregunta;
- cita abre fuente/artifact exacto en visor.

## TOOL CALLING

Tools allowlisted y tipadas para:

- datos del cultivo;
- targets/lecturas/inventario;
- solver;
- VPD/CFM/toolboxes;
- productos/semillas/knowledge;
- artifacts.

Inputs/outputs validados, timeout/cancel/idempotencia y trace call→result→answer.

## HISTORIAL

- local/private por defecto;
- FTS/search sin LLM;
- títulos editables;
- pin/archive/delete;
- context snapshot;
- artifact/citations;
- draft por thread;
- migrations/versioning;
- escala mediante virtualización;
- restauración exacta después de minimizar el chat.

## EVALUACIÓN DEL BOT

#27 define corpus 100+ preguntas por categorías y ES/EN/PT-BR.

Métricas:

- groundedness/hallucination;
- retrieval precision/recall;
- citation correctness;
- tool selection/arguments;
- abstention;
- language quality;
- first-token latency/throughput;
- RAM/storage/battery/thermal;
- crash/ANR/OOM.

Umbrales antes de seleccionar ganador. No decidir por impresión.

## MÉTODO DE DESARROLLO

Usar Harness Engineering:

`PREFLIGHT → TASK CONTRACT → EDIT → EXACT SCOPE CHECK → TEST → BUILD → UI/INTEGRATION VERIFY → TRUTH SYNC → DRAFT PR → REVIEW → MERGE HUMANO`

Unidad normal: una child Issue coherente por branch/PR.

Preflight incluye:

- parent/child;
- base SHA;
- requirement IDs;
- allowlist/read-only/prohibited paths;
- dependencies;
- fixtures;
- tests/builds/evidence;
- risks.

No scope expansion silenciosa. No fakes como evidencia productiva.

## ROADMAP

### M0/#46

- B0 #1;
- GOV-02 #16;
- B1 #2.

### M1/#47

- B2 #3;
- B3 #4;
- B4 #5.

### M2/#48

- B5 #6: #17–#20;
- B6 #7;
- B7 #8;
- B8 #9.

### M3/#49

- B9 #10: #21–#29;
- B10 #11: #30–#36 y #53.

### M4/#50

- B11 #12: #37–#41.

### M5/#51

- B12 #13: #42–#45.

Los trackers #46–#51 son hitos canónicos mientras no exista operación disponible para crear Milestones nativas. Migrar sin alterar alcance cuando sea posible.

## TESTING ESENCIAL

- fórmulas/unidades/solver;
- DB fresh/upgrade/rollback;
- same fixture Windows/Android;
- Electron security/IPC;
- Capacitor/Kotlin bridge;
- portrait/landscape/tablet;
- `expanded_split` 50/50 e internal 30/70;
- `minimized_bubble` inferior izquierda;
- visor full workspace al minimizar;
- minimizar/generar/restaurar sin pérdida;
- bubble safe areas/hit target/z-index/TalkBack;
- ausencia de chat full-screen;
- keyboard/safe areas/background;
- history/search/long threads;
- viewer gestures/large tables/images;
- RAG/citations/tools/abstention;
- real providers/offline/network capture;
- model manifest/integrity;
- ES/EN/PT-BR;
- performance/resources;
- NSIS/AAB/install/update/rollback;
- exact artifact hash in RC.

## RELEASE

### Windows

NSIS reproducible, exact hashes, install/upgrade/uninstall/offline, manifests/SBOM/licenses y plan de firma.

### Android

AAB firmado, Google Play internal/closed/staged rollout, asset delivery abstraída, requirements desde benchmark, privacy/data safety/licenses y rollback.

## FUERA DE ALCANCE ACTUAL

- iOS dentro de B0–B12;
- cloud obligatorio;
- marketplace/venta;
- asesoría médica/consumo;
- control industrial autónomo;
- soporte universal para teléfonos sin benchmark;
- promesa de calidad equivalente a un LLM cloud general;
- chat móvil full-screen;
- burbuja arrastrable o ventana flotante del sistema Android en MVP.

## DEFINICIÓN DE TERMINADO

No declarar terminado hasta:

- roadmap/child issues críticos cerrados;
- solver/dataset/DB verificados;
- módulos completos;
- equivalencia Windows/Android;
- bot RAG/tools/citas/offline trilingüe;
- chat expandido 50/50 PASS;
- chat minimizado como burbuja inferior izquierda y restauración exacta PASS;
- generación minimizada/safe areas/accesibilidad PASS;
- historial/visor PASS;
- modelos/providers aprobados;
- install/update/rollback/offline PASS;
- seguridad/privacidad/licencias/SBOM;
- docs/release notes;
- RC exactos #42–#44 PASS;
- aceptación humana #45.

Ante dudas, leer `AGENTS.md`, `docs/START_HERE.md`, `docs/truth/`, `docs/architecture/` y las Issues enlazadas antes de editar.
