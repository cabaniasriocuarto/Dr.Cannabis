# Dr. Cannabis — Reglas permanentes para agentes

## Principios base
- Trabajar en español salvo que el usuario pida otro idioma.
- No inventar datos agronómicos, composiciones, purezas, fórmulas, estados del repo ni resultados de tests.
- Separar siempre `CONFIRMADO`, `INFERIDO` y `PENDIENTE_DE_VALIDAR`.
- El repo real manda primero. `docs/truth` es el contrato operativo después del repo.
- Si repo, docs, issues, Excel/base de conocimiento o código legacy se contradicen, declarar el conflicto y no resolverlo silenciosamente.

## Orden de autoridad
1. Código y datos observables del repo canónico `cabaniasriocuarto/Dr.Cannabis`.
2. `docs/truth/`.
3. GitHub Issues/PRs y trazabilidad del bloque.
4. Datos canónicos importados desde el programa de fertirriego/Excel y composición validada de sales.
5. Base de conocimiento local del bot.
6. Documentación oficial/técnica externa cuando se autorice investigación.
7. Conocimiento general del modelo, solo como complemento explícito.

## Repositorios legacy
- `cabaniasriocuarto/Dr.-Cannabis` es fuente legacy funcional: contiene la app V4.4 de un archivo, datos, solver previo, frontend y backend/conocimiento.
- No editar ni borrar el legacy durante la migración salvo bloque específico.
- Migrar funcionalidad con evidencia: identificar origen, portar, probar y documentar equivalencia antes de declarar reemplazo.

## Lectura obligatoria antes de tocar código
Leer, como mínimo:
- `docs/START_HERE.md`
- `docs/truth/SOURCE_OF_TRUTH.md`
- `docs/truth/NEXT_STEPS.md`
- `docs/truth/FEATURE_MAP.md`
- `docs/truth/DEVELOPMENT_WORKFLOW.md`
- `docs/truth/TESTING_MATRIX.md`
- `docs/truth/DECISION_LOG.md` cuando haya duda arquitectónica
- `docs/truth/NUTRIENT_CALCULATION_CONTRACT.md` si se toca fertilización/PPM/EC/pH
- `docs/truth/AI_KNOWLEDGE_CONTRACT.md` si se toca el chatbot

## Preflight obligatorio por bloque
Antes de editar:
- indicar issue/bloque;
- branch y base;
- objetivo semántico exacto;
- archivos permitidos y prohibidos;
- dependencias externas autorizadas/prohibidas;
- tests y evidencia esperados.

No mezclar dos objetivos grandes en una misma branch/PR.

## Flujo Harness Engineering
`PREFLIGHT -> TASK CONTRACT -> EDIT -> EXACT SCOPE CHECK -> TEST -> BUILD -> UI/INTEGRATION VERIFY -> DOC/TRUTH SYNC -> DRAFT PR -> REVIEW -> MERGE HUMANO`

Reglas:
- cambios pequeños y verificables;
- una issue coherente por branch/PR;
- no usar `git add .` en ejecución local guiada; stagear paths exactos;
- ejecutar `git diff --check` y revisar el diff;
- agregar regression test por bug cuando sea técnicamente posible;
- no declarar PASS sin evidencia;
- no convertir mocks, datos demo o recetas hard-coded en evidencia de funcionamiento real;
- si falta una dependencia real requerida por el bloque, declarar `BLOCKED`/`NOT_RUN`, no maquillar con un fallback silencioso.

## Contrato del solver nutricional
- La calculadora de fertilización es la pieza central del producto.
- Nunca usar el antiguo solver demo simplificado como resultado productivo.
- Objetivos por etapa deben venir de datos canónicos de la app; rangos genéricos son solo fallback explícitamente etiquetado.
- Composición y pureza de cada producto deben venir de datos guardados/validados, nunca de números inventados.
- Distinguir formas elementales y declaradas como óxidos (`P` vs `P2O5`, `K` vs `K2O`, `Ca` vs `CaO`, `Mg` vs `MgO`, `S` vs `SO3/SO4`).
- Mantener trazabilidad de N nítrico y N amónico cuando corresponda.
- Toda fórmula debe ser testeable con casos conocidos y tolerancias explícitas.
- EC estimada no debe presentarse como equivalente exacto a EC medida: documentar el modelo y sus límites.

## Contrato de datos
- SQLite local es la persistencia objetivo del desktop.
- Mantener migraciones versionadas.
- No commitear bases de usuario ni datos privados.
- `node_modules/`, builds, releases y archivos temporales no pertenecen al repo salvo artefacto de release explícitamente gestionado fuera del código fuente.
- Seeds de desarrollo deben estar marcados como demo/test y no confundirse con datos canónicos.

## UI/UX canónica
Layout desktop principal de tres zonas:
1. izquierda: identidad + navegación/botonera;
2. centro: módulo activo;
3. derecha: chatbot Dr. Cannabis persistente.

Navegación mínima prevista:
- Fertilizer Calculator;
- CFM Calculator / Air Flow Need;
- VPD / Vapor Pressure Deficit;
- Harvest Timer;
- Costos / Historial;
- luego pH Tracker, Soil Mix, Feeding Calculator, Yield Estimator y Green Light según roadmap.

La UI debe ser funcional, no cosmética. Un botón sin implementación real debe figurar como pendiente, no simular éxito.

## Chatbot Dr. Cannabis
- Local-first/offline como objetivo del producto.
- Usa Prompt Maestro/base de conocimiento + contexto JSON de la app + datos locales.
- Responde ES / EN / PT-BR.
- Prioriza datos de la app sobre rangos genéricos.
- No modifica BD por iniciativa propia: recomienda; las mutaciones pasan por acciones explícitas de la app.
- No da consejos médicos, consumo humano ni asesoría legal; mantener carácter técnico/educativo.

## Seguridad Electron
- `contextIsolation: true` obligatorio.
- `nodeIntegration` en renderer debe ser `false` salvo excepción aprobada y documentada.
- API renderer ↔ main mediante preload tipado y allowlist de IPC.
- Validar entradas IPC con esquemas cuando sea posible.
- No exponer filesystem, shell o ejecución arbitraria al renderer.

## Release
Objetivo Windows: instalador NSIS simple para usuario final, con acceso directo y persistencia local.
- El instalador debe construirse desde CI/release reproducible.
- Antes de release: tests, build, instalación limpia, upgrade, persistencia, modo offline y smoke test.
- La firma de código se trata como bloque de distribución separado antes de venta masiva.

## Cierre de cada bloque
Reportar:
- `RESULT=PASS|BLOCKED|PARTIAL`
- issue/branch/commit/PR;
- archivos tocados;
- tests/build ejecutados y resultado;
- evidencia visual/integración cuando aplique;
- docs/truth actualizados;
- riesgos y pendientes;
- siguiente bloque recomendado.
