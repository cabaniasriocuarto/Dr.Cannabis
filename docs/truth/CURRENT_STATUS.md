# CURRENT STATUS — Dr. Cannabis 2.0

Baseline de gobierno: 2026-08-22. Revisión de reanudación: GOV-03/#56; informe local de referencia del 2026-09-18.

## 1. Propósito

Este archivo registra el estado operativo del proyecto. Debe leerse inmediatamente después de `AGENTS.md` y antes de interpretar estados históricos escritos dentro de documentos extensos, Issues o PRs antiguas.

No reemplaza los contratos de producto, arquitectura o dominio. Resuelve cuál es el estado vigente y qué bloque puede avanzar. Leer GitHub live y HEAD antes de cualquier ejecución; una referencia histórica no congela main.

## 2. Baseline verificado al preparar GOV-03

```text
REPOSITORY=cabaniasriocuarto/Dr.Cannabis
DEFAULT_BRANCH=main
OBSERVED_BASELINE=667045ccd467b1efc8e7d12f5a15f5816a813c70
B0_MERGE=d9a74494b8532185e737970559521eb6dc17b25e
GOV_02_PR=#52
GOV_02_BASELINE=d15bcff1fcee0c97e82f92092a96e4481651dbde
GOV_02A_PR=#55
GOV_02A_MERGE=667045ccd467b1efc8e7d12f5a15f5816a813c70
GOV_03_OWNER=#56
```

GOV_02_BASELINE identifica el commit que incorporó aquellas decisiones. Commits posteriores de sincronización, bloques o releases pueden avanzar main sin invalidar la referencia histórica.

## 3. Estado de bloques y ampliación propuesta

```text
B0/#1=DONE
GOV-02/#16=DONE
GOV-02A/#54=DONE
B1/#2=IN_PROGRESS
B2–B12=NOT_STARTED
GOV-03/#56=CONTRACT_ADOPTION_ON_HUMAN_MERGE_OF_ITS_PR
REC-01/#57=LOCAL_RECOVERY_CHECKPOINT_PENDING_VERIFICATION
HAR-01/#58=NOT_IMPLEMENTED
AI-SPIKE-01/#59=ISOLATED_FEASIBILITY_NOT_RUN_BY_GOV_03
VIS-01..06/#60..65=PLANNED
WEB-01/#66=PLANNED_NO_DEPLOY
```

Al mergearse la PR de #56 sus contratos y backlog quedan adoptados; ese evento no transforma #57–#66 ni B2–B12 en implementados. Para saber si ocurrió, leer la PR/Issue vigente. El próximo bloque de producto sigue siendo B1. La prueba #59 puede adelantarse en un laboratorio aislado sin integrar producto: excepción de viabilidad propuesta explícita, no salto general de dependencias.

Mapa navegable: [PROJECT_EXECUTION_MAP](PROJECT_EXECUTION_MAP.md). Método adaptado: [HARNESS_ADOPTION](HARNESS_ADOPTION.md). No crear un segundo esqueleto ni copiar el legacy sobre main.

## 4. Decisiones canónicas anteriores conservadas

- una sola base funcional React + TypeScript;
- Electron para Windows; Capacitor para Android;
- Kotlin limitado a plugins/adaptadores nativos;
- dominio, solver, datos, RAG, tools, i18n y pantallas funcionales compartidos;
- IA Android local mediante Google LiteRT-LM;
- familia Gemma candidata; modelo exacto pendiente del benchmark #27;
- sin API paga obligatoria, API key, PC o Wi-Fi local para el cliente Android;
- sin fallback cloud oculto;
- chat móvil expanded_split y minimized_bubble;
- expandido: visor 50% + chat 50%, historial arriba y conversación abajo;
- minimizado: visor completo y burbuja fija abajo a la izquierda;
- restaurar conserva thread, borrador, mensajes, generación, artifact, zoom, pan y scroll;
- WBS, trazabilidad, Issue Forms, PR template y CI documental;
- iOS fuera del roadmap actual.

Son decisiones y contratos, no evidencia de Android/modelo/UX/distribución implementados.

## 5. Supersesión histórica de GOV-02

Los encabezados heredados PENDING_GOV_02_MERGE, CANONICAL_PENDING_GOV_02_MERGE, DOCUMENTATION_REVIEW para GOV-02, propuesta pendiente o PR #52 Draft/open quedan supersedidos por el merge #52, baseline d15bcff1fcee0c97e82f92092a96e4481651dbde, PR #55, Issue #16 cerrada y master #14 actualizado.

El contenido técnico conserva vigencia; solo se invalida su etiqueta temporal. Normalizar marcadores al editar cada owner, sin modificar silenciosamente contratos científicos ni de producto.

## 6. B1 — sincronización y preservación

Branch histórica: audit/b1-legacy-excel-knowledge.
Base original: main@d9a74494b8532185e737970559521eb6dc17b25e.

Antes de abrir/cerrar B1, verificar y sincronizar de forma controlada con main vigente que contenga PR #52/#55 y las ampliaciones efectivamente mergeadas. No hacer reset, overwrite o rebase automático para forzar un estado; resolver con evidencia y permisos.

Preservar AGENTS.md, .github/**, docs/architecture/**, docs/product/**, docs/truth/** y su trazabilidad. Dataset candidato no equivale a canónico.

## 7. Recuperación local — evidencia reportada, no remote PASS

El informe aportado por el usuario declara que C:\Dev\DrCannabis-Recuperacion renderiza la V4.4 por HTTP local, con biblioteca y fórmulas preservadas, 20+2 pruebas y 9 self-tests. Declara reparación en staging, sin commit/push/merge/deploy. No se reejecutaron esas pruebas en su Windows durante GOV-03. El checkpoint posterior sugerido no tiene todavía evidencia aportada de ejecución.

#57 verifica portabilidad de pruebas, preservación y commit local. La recuperación es referencia protegida, no repo canónico nuevo. #59 usa un lab separado propuesto C:\Dev\DrCannabis-AI-Lab; existencia e instalación deben verificarse localmente.

Los errores/limitaciones agronómicas del legacy permanecen sujetos a B1; preservar bytes y self-tests no valida ciencia.

## 8. Evidencia y pendientes

Confirmado por lectura remota: baseline, contratos, Issues anteriores y CI documental incorporado. Confirmado por inventario de fuentes: archivos/hashes y nueve hojas Excel con enlaces externos, sin auditoría numérica nueva. Vercel read-only: ningún proyecto identificado por nombre como Dr. Cannabis entre los listados; no se desplegó.

No demostrado: solver productivo, datos canónicos completos, scope guard ejecutable, modelo instalado/seleccionado, cámara/visión/RAG integrado, precisión diagnóstica, rendimiento por dispositivo, shell Android, artefacto NSIS/AAB comercial ni release.

## 9. Actualización

Actualizar con Issue/PR/SHA y evidencia cuando cambie bloque activo, gate, baseline relevante o release. No porcentajes subjetivos. Autor = SELF_VALIDATED_ONLY; revisión independiente de sesión separada permanece pendiente hasta que realmente ocurra. CI de documentación no demuestra UI/modelo/dispositivo.
