# Prompt de fuente del proyecto — Dr. Cannabis

Usá este texto como fuente/instrucción persistente del proyecto ChatGPT para no perder contexto entre conversaciones.

---

## IDENTIDAD DEL PROYECTO
El proyecto se llama **Dr. Cannabis – Fertilizer-IA**. Su objetivo es construir una aplicación de escritorio profesional, local-first/offline, para formulación de fertirriego de cannabis y asistencia agronómica contextual.

La pieza central es una **calculadora profesional de fertilización** que convierte objetivos de PPM por nutriente/ion y EC objetivo en gramos de sales para cualquier volumen. Todo lo demás complementa ese núcleo.

## REPOSITORIOS
- Repo canónico de desarrollo: `cabaniasriocuarto/Dr.Cannabis`.
- Repo legacy funcional/read-only durante la migración: `cabaniasriocuarto/Dr.-Cannabis`.

El legacy contiene una app V4.4 monolítica y conocimiento útil; el repo canónico contiene scaffolding Electron/TypeScript/SQLite. No asumir que uno solo contiene toda la verdad: migrar incrementalmente con evidencia y tests.

## OBJETIVO TÉCNICO
Arquitectura objetivo:
- Electron.
- React + TypeScript.
- SQLite local.
- Drizzle ORM/migraciones o equivalente tipado.
- dominio de cálculo desacoplado de UI/Electron.
- instalador Windows NSIS.
- funcionamiento sin Node/VS Code en la PC del cliente.
- local-first/offline para cálculos, datos e historial.

## UX CANÓNICA
La app desktop tiene tres zonas:
1. **izquierda:** título/marca y botonera de navegación;
2. **centro:** pantalla del módulo activo;
3. **derecha:** lateral persistente del chatbot Dr. Cannabis.

Botonera/módulos previstos:
- Fertilizer Calculator.
- CFM Calculator / Air Flow Need.
- Harvest Timer.
- Costos / Historial.
- VPD / Vapor Pressure Deficit.
- pH Tracker.
- Feeding Calculator.
- Soil Mix Calculator.
- Yield Estimator.
- Green Light.
- Inventario/Configuración según necesidad.

## FERTILIZER CALCULATOR
Debe trabajar con:
- fase fenológica;
- sistema de cultivo: tierra/coco/hidro;
- volumen de tanque;
- objetivos PPM por nutriente/ion;
- EC objetivo;
- agua base cuando haya datos;
- productos/sales disponibles;
- composición y pureza por producto/lote;
- tolerancias y restricciones.

Debe devolver:
- gramos y g/L por sal;
- aporte por nutriente/ion;
- objetivo vs logrado;
- error/desviación;
- EC estimada claramente etiquetada como estimación;
- costo;
- stock/lote usado;
- advertencias de compatibilidad;
- posibilidad de guardar/exportar.

Nunca reemplazar el solver real por reglas demo del tipo `EC × factor = gramos`. No inventar composiciones ni purezas.

## CONTRATO NUTRICIONAL
En solución acuosa de este proyecto:
- 1 ppm se maneja como 1 mg/L para el nutriente/ion modelado.
- Fórmula base de aporte: `ppm = gramos_sal × fraccion_nutriente × 1000 / litros`.
- Una sal puede aportar varios nutrientes simultáneamente; el solver real debe resolver el sistema completo con restricciones/tolerancias.
- Distinguir N total, N-NO3 y N-NH4.
- Distinguir elemento de formas declaradas como óxidos: P/P2O5, K/K2O, Ca/CaO, Mg/MgO y S/especies equivalentes.
- Pureza debe modelarse una sola vez y con trazabilidad.
- EC medida es un dato físico real; EC estimada depende de un modelo y no debe confundirse con una conversión TDS simplificada.

## DATOS AGRONÓMICOS
Existe un programa de fertirriego/Excel histórico que debe auditarse y migrarse a datos canónicos versionados.

No asumir que todos los valores hard-coded o seeds son canónicos. Para cada valor importante registrar:
- fuente;
- unidad;
- forma química;
- fase/sistema;
- versión/provenance.

La biblioteca histórica contempla más de 60 sales, ácidos y aditivos. Deben ser datos editables/validados, no código duplicado en UI.

## FASES
El legacy contiene etapas como:
- Clonación.
- Esqueje.
- 1er Semana.
- Vegetativo.
- Preflora.
- Flora.
- Fin de Flora.
- Última Semana.

El diseño nuevo puede normalizar nombres, pero debe conservar equivalencia y provenance con el programa original.

## DATOS/PERSISTENCIA
Entidades previstas:
- sales/productos;
- composición por nutriente/ion;
- purezas/lotes;
- precios/stock;
- sectores;
- campañas/cultivos;
- objetivos PPM;
- formulaciones;
- gramos por sal;
- PPM logrados;
- EC/pH medidos;
- riegos/drenajes;
- historial/costos;
- alertas;
- configuraciones/idioma.

## CHATBOT DR. CANNABIS
Es un asistente agronómico integrado. Debe responder en:
- español;
- English;
- português do Brasil.

Fuentes de respuesta en orden:
1. contexto JSON actual de la app;
2. datos locales canónicos;
3. prompt maestro;
4. base de conocimiento local;
5. conocimiento/rangos genéricos solo como fallback explícito.

Debe:
- priorizar datos reales del cultivo activo;
- no inventar faltantes;
- pedir solo los datos clave necesarios;
- diferenciar datos internos de rangos genéricos;
- responder breve y accionable por defecto, ampliando técnicamente a pedido;
- interpretar PPM, EC, pH, drenaje, VPD, CFM, síntomas, riego, ambiente, plagas y técnicas;
- no modificar BD autónomamente;
- no dar consejo médico, de consumo humano o asesoría legal definitiva;
- mantener carácter educativo/técnico.

## TOOLBOX
VPD: T aire + T hoja + HR + etapa → kPa, estado y recomendación.

CFM: dimensiones + recambio + filtro/ductos/carga térmica → CFM y m³/h desglosados.

Harvest Timer: fechas/duración → cuenta orientativa, nunca sustituto de observación de madurez.

pH Tracker: historial entrada/drenaje y tendencias.

Feeding Calculator: vista simplificada que reutiliza el motor real, no un motor paralelo.

Soil Mix: proporciones y cantidades por volumen.

Yield Estimator: estimación orientativa sin prometer resultados.

Green Light: ayuda contextual y posible integración futura.

## MÉTODO DE DESARROLLO
Usar **Harness Engineering liviano** similar al proyecto Bot IA Trading:
- repo real manda;
- `docs/truth` es contrato operativo;
- una issue coherente por branch/PR;
- preflight y Task Contract antes de editar;
- allowlist de paths;
- cambios pequeños;
- tests focales y regression test por bug;
- build/typecheck/lint cuando apliquen;
- verificación UI/integración cuando aplique;
- Draft PR;
- revisión independiente para solver, DB, seguridad, IA y release;
- merge humano;
- actualizar truth al cerrar cada bloque.

No hacer una reescritura gigante. Terminar bloque por bloque y tildar el roadmap.

## ORDEN CANÓNICO DE BLOQUES
B0 Governance/baseline.
B1 Auditoría repos + Excel + knowledge.
B2 Modelo nutricional y DB.
B3 Solver PPM real.
B4 EC/pH/mezcla.
B5 Shell Electron + seguridad.
B6 Fertilizer Calculator end-to-end.
B7 Persistencia, inventario, costos e historial.
B8 Toolboxes.
B9 Chatbot local/contextual/i18n.
B10 Integración UX/QA.
B11 Instalador Windows.
B12 Release Candidate.

## REGLAS DE SEGURIDAD ELECTRON
- `contextIsolation: true`.
- `nodeIntegration: false` en renderer.
- preload tipado y IPC allowlisted.
- validar payloads.
- no exponer filesystem/shell/ejecución arbitraria al renderer.

## DEFINICIÓN DE TERMINADO
No decir que Dr. Cannabis está terminado hasta que:
- roadmap canónico cerrado;
- solver validado;
- datos canónicos migrados;
- DB/migraciones verificadas;
- módulos principales operativos;
- chatbot grounded y trilingüe;
- exports/historial verificados;
- installer Windows probado en máquina limpia;
- modo offline probado;
- tests/build/QA PASS;
- docs/truth y release notes sincronizadas.

Ante cualquier duda, consultar primero `AGENTS.md`, `docs/START_HERE.md` y `docs/truth/` del repo canónico antes de proponer cambios.
