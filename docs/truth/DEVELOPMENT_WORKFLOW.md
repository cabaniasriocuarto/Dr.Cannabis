# DEVELOPMENT WORKFLOW — Dr. Cannabis

## Objetivo
Aplicar Harness Engineering liviano: hacer que el entorno, los contratos, los tests y la trazabilidad reduzcan la posibilidad de que un agente cambie cosas fuera de scope o declare éxito sin evidencia.

## 1. Unidad de trabajo
La unidad normal es:
- 1 Issue coherente;
- 1 branch;
- 1 Task Contract;
- 1 Draft PR;
- 1 revisión independiente;
- 1 merge humano.

## 2. Preflight
Antes de editar:
- repo canónico;
- branch/base;
- issue;
- archivos actuales relevantes;
- estado del bloque en `FEATURE_MAP`;
- contratos truth aplicables;
- legacy read-only necesario;
- outputs esperados.

## 3. Task Contract
Cada bloque debe fijar:
- objetivo exacto;
- paths editables;
- paths read-only;
- paths prohibidos;
- sistemas externos permitidos;
- tests obligatorios;
- criterios de aceptación;
- tamaño esperado del cambio.

## 4. Implementación
- Portar lógica legacy solo tras entender inputs/outputs/unidades.
- Preferir funciones puras para cálculo.
- Separar dominio, persistencia, IPC y UI.
- No duplicar cálculo en componentes React.
- No mezclar refactor masivo con nueva feature salvo issue explícita.

## 5. Guardas post-edit
Como mínimo:
- diff revisado;
- scope real == allowlist;
- no secrets;
- no archivos generados no deseados;
- no `node_modules`;
- typecheck;
- tests focales;
- regression test si corrige bug;
- build cuando aplique.

## 6. Verificación multisuperficie
### Dominio
Unit tests con casos conocidos, límites y errores.

### DB
Migración sobre DB nueva y upgrade desde fixture anterior cuando corresponda.

### IPC
Test o verificación de contratos, validación de payload y errores.

### UI
Para módulos críticos:
- estado normal;
- loading;
- empty;
- error;
- datos inválidos;
- ventana angosta razonable;
- navegación izquierda;
- chatbot derecho sin tapar el módulo central.

### Release
Cuando toque packaging:
- build limpio;
- instalación en entorno sin Node;
- abrir/cerrar/reabrir;
- persistencia;
- uninstall/upgrade según bloque.

## 7. Política legacy
Para cada función migrada registrar:
- archivo/función legacy origen;
- comportamiento esperado;
- diferencias deliberadas;
- test de equivalencia o justificación de reemplazo.

No copiar errores conocidos por preservar compatibilidad accidental.

## 8. Política de datos agronómicos
Todo valor canónico debe tener provenance:
- Excel/programa de fertirriego;
- composición validada del producto;
- decisión documentada;
- o rango genérico explícitamente marcado como fallback.

No mezclar targets de diferentes fuentes sin resolver precedencia.

## 9. PR
La Draft PR debe incluir:
- Issue;
- objetivo;
- scope;
- archivos;
- tests ejecutados;
- evidencia;
- migraciones;
- cambios de truth;
- riesgos/pendientes;
- checklist de aceptación.

## 10. Review independiente
Para cambios de solver, DB, seguridad Electron, IA contextual o release:
- revisión separada de la implementación;
- validar exact-head;
- revisar fórmulas y unidades;
- buscar regresiones y scope drift.

## 11. Merge
No mergear solo porque compila. Requisitos:
- CI/tests aplicables PASS;
- review sin blockers;
- truth sync;
- criterios de Issue cumplidos;
- aprobación humana.

## 12. Cierre
Actualizar `FEATURE_MAP` y, si corresponde, `DECISION_LOG`, `SOURCE_OF_TRUTH` y `NEXT_STEPS`.
