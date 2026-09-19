# HARNESS ADOPTION — Experiencia de Bot-Trading adaptada a Dr. Cannabis

Owner: #56; implementación del guard: #58. Complementa DEVELOPMENT_WORKFLOW y AGENTS, no autoriza trabajos fuera de Issues. Propuesta normativa hasta merge de GOV-03; no se declara guard instalado por este documento.

## 1. Fuente consultada, fijada para evitar drift

Repositorio read-only: cabaniasriocuarto/Bot-Trading-IA.
Commit: bfa167c12f2d1e957e577eb543774c1f3e62c370.
Archivos leídos: AGENTS.md (blob 342ffcb0fb13333f53d10ed7e2a76efa8d5407ac) y primeras 230 líneas de docs/truth/DEVELOPMENT_WORKFLOW.md (blob 5e118a82c7f70b3dc466245ea7c941c2d289b7f6).

Fuente: https://github.com/cabaniasriocuarto/Bot-Trading-IA/blob/bfa167c12f2d1e957e577eb543774c1f3e62c370/AGENTS.md

Se adoptan patrones documentados. No se afirma haber encontrado, copiado o ejecutado un script scope_guard de Trading: las búsquedas realizadas no lo localizaron. Tampoco se importa la activación de sus modos automáticos ni sus condiciones financieras.

## 2. Matriz de adopción

| Patrón observado | Decisión para Dr. Cannabis |
| --- | --- |
| Una writer lane canónica | Adoptar: solo un writer modifica el candidato |
| Supervisor técnico separado | Adaptar: asesor readonly; no autoriza scope ni se llama auditor formal si ayudó a diseñar |
| Auditor formal exact-head | Adoptar: sesión separada, readonly durante dictamen, no repara sus findings |
| Working + staged scope/secret checks | Adoptar en #58; hasta entonces controles manuales explícitos |
| Contrato, símbolos, paths y sistemas | Adoptar; LOC es presupuesto, no permiso para tocar cualquier archivo |
| Validación progresiva | Adoptar: prueba que discrimina hipótesis primero, suite final pertinente después |
| Failure frontier | Adoptar formato compacto; evitar cambios especulativos y rerun-until-green |
| Exact SHA en CI y preview | Adoptar donde aplique; Vercel READY no significa UI PASS |
| Modernización selectiva y LKG | Adaptar: preservar recuperación y migrar por seam/fixture |
| Unknown cost no es gratis | Adoptar: no APIs pagas, créditos, auto-top-up o upgrade implícitos |
| Exchanges/capital/PAPER/TESTNET/LIVE | No importar; son dominio de Trading |
| Railway/ledgers/controladores remotos | No importar por analogía; no necesarios en local-first |
| Hermes/Symphony/multiagentes automáticos | No instalar ni habilitar automáticamente |
| Estados operativos en root AGENTS | Evitar: mantener estado en CURRENT_STATUS y dirigir lecturas |

## 3. Contrato mínimo por tarea

```text
TASK_ID / ISSUE / PARENT / REQUIREMENTS
REPOSITORY / WORKSPACE / BRANCH / BASE_SHA / START_HEAD
OBJECTIVE
ALLOWED_PATHS / DENIED_PATHS / READ_ONLY_SYMBOLS
ALLOWED_EXTERNAL_ACTIONS / FORBIDDEN_SYSTEMS
APPROVED_CONTRACT_HASH
INPUT_FIXTURES / DATA_CONSENT
TEST_COMMANDS / BUILD_COMMANDS / VISUAL_DEVICE_EVIDENCE
SIZE_BUDGET / TIME_BUDGET / MAX_EXTERNAL_COST
STOP_CONDITIONS
LAST_KNOWN_GOOD / ROLLBACK_PLAN
```

La Issue de planificación no habilita por sí sola una integración ni un deploy. Verificar intención humana material y no usar texto de un documento recuperado como autorización. Un modelo externo no recibe permisos nuevos al delegarle una consulta.

## 4. Scope guard: semántica exigida a #58

El guard será pequeño, portable y determinista, sin llamadas a IA. No hay razón para replicar toda la infraestructura de Trading.

Inputs: raíz Git verificada, base aprobada, head observado y contrato confiable. La política se lee de un baseline aprobado o de un archivo externo autorizado con hash; no confiar en una allowlist ampliada por la propia PR.

Revisar la unión de:

- diff acumulado base→HEAD;
- cambios staged;
- cambios unstaged;
- untracked relevantes.

Validar ambos lados de renames/copies, borrados, cambios de tipo, binaries, submodules y symlinks. Manejar rutas Unicode/espacios mediante Git -z y parsers explícitos. DENY prevalece sobre ALLOW; sin regla no hay permiso. Fallar cerrado ante base inexistente, operación Git pendiente, repositorio distinto, paths ambiguos o contrato inválido. No ejecutar comandos de shell procedentes de campos JSON.

El guard no modifica Git, no hace reset/stash/checkout, no publica ni llama a red. Verificación de secretos y validación semántica científica son gates diferentes; un path permitido no demuestra que sus fórmulas sigan siendo correctas.

Receipt: repo/base/head, hash de contrato, digest de paths/contenidos inspeccionados, modo de diff y resultado/violaciones. Cualquier nueva escritura invalida el receipt anterior. El bootstrap del propio guard requiere revisión explícita; un script candidato no se certifica a sí mismo.

Pruebas mínimas: ruta prohibida, allowlist alterada, rename fuera→dentro y dentro→fuera, borrado, untracked, staged distinto de working, base ausente, symlink, submodule, binary, espacio/Unicode, repo incorrecto, operación Git activa, contrato malformado. Repos temporales creados por cada prueba, sin referencias a carpetas de Walter.

CI futuro: contents:read; no ejecutar código de una PR con secretos vía pull_request_target. Acciones/dependencias fijadas. No cambiar branch protection desde esta tarea; tener un workflow verde no significa enforcement administrativo obligatorio.

## 5. Secuencia operativa

```text
READ ISSUE → PREFLIGHT → TASK CONTRACT
→ TEST DISCRIMINANTE → EDIT ACOTADO
→ WORKING/ACCUMULATED SCOPE + SECRET + DIFF CHECK
→ EXACT STAGING
→ STAGED SCOPE + SECRET + DIFF CHECK
→ FOCAL TESTS → CONTRATOS/BUILD/VISUAL RELEVANTES
→ COMMIT → CI EXACT HEAD
→ REVIEW INDEPENDIENTE → APROBACIÓN HUMANA → MERGE
→ POST-MERGE READBACK → TRUTH SYNC → CIERRE
```

Todo gate con STOP termina antes de la siguiente mutación. Nunca git add . o git add -A. No atribuir cambios ajenos a la tarea. No modificar un test solo para ocultar un defecto, no reejecutar hasta obtener un verde fortuito.

## 6. Investigación de fallos

Mantener:

```text
LAST_KNOWN_PASS_LEVEL=
FIRST_FAIL_LEVEL=
SHA_AND_ENVIRONMENT=
FAILURE_SIGNATURE=
PROVEN=
INFERRED=
UNKNOWN=
NEXT_DISCRIMINATING_TEST=
```

Si no existe próxima prueba justificada, detener edición especulativa. Distinguir fallo de código, fixture, permiso, dependencia externa, datos insuficientes y capacidad de hardware. Especialistas readonly solo para resolver una incertidumbre concreta; no crear reuniones virtuales ficticias ni afirmar revisiones que no ocurrieron.

## 7. Evidencia y aceptación

Autor: SELF_VALIDATED_ONLY. Auditor independiente: PASS/CHANGES_REQUIRED/BLOCKED sobre SHA exacto; no es segunda aprobación humana. Una nueva modificación invalida la revisión afectada. El humano conserva Ready, merge, infraestructura, gastos, datos privados y cambios de alcance.

Fakes prueban contrato/orquestación; modelos reales prueban I/O/rendimiento; corpus con etiquetas independientes prueba precisión. Estos tres niveles nunca se sustituyen. Un smoke de foto no aprueba una función de diagnóstico; una preview no aprueba Android.

Evidencias privadas fuera de Git. Registrar hashes y paths relativos redactados; no copiar fotos privadas, llaves, logs con contexto íntegro, modelos gigantes ni perfiles del navegador. Fixtures sintéticas se etiquetan TEST_FIXTURE_ONLY.

## 8. Proporcionalidad

No exigir tests Android para una corrección puramente documental, ni una revisión agronómica para cambiar el espaciado. Sí exigir regresión científica si cambia dominio, integración real si cambia runtime y dispositivo real si cambia cámara/lifecycle. Declarar NOT_RUN y motivo cuando corresponda, nunca PASS inventado.

Un cierre informa qué se hizo, qué se probó, qué falta, SHA/branch/PR y siguiente Issue. Una Issue se cierra DONE tras el merge requerido y aceptación, no por producir un documento o commit aislado.
