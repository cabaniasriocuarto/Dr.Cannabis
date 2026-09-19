# PROJECT EXECUTION MAP — Dr. Cannabis

Owner de ampliación: #56 (GOV-03). Este mapa es navegación del roadmap existente, no un segundo backlog. Estado real: [CURRENT_STATUS](CURRENT_STATUS.md). Requisitos base R-001–R-032: [TRACEABILITY_MATRIX](TRACEABILITY_MATRIX.md). Descomposición original: [WBS](WORK_BREAKDOWN_STRUCTURE.md).

La ampliación es propuesta hasta el merge humano de la PR de #56. Su merge incorpora contratos y planificación, no acredita implementación.

## 1. Destino del producto

Un producto local-first Windows/Android con formulación nutricional verificable, biblioteca técnica y chatbot natural que interprete contexto, fotos y clips. Las fórmulas se ejecutan en dominio; el modelo explica y propone comprobaciones, no inventa mediciones ni diagnóstico definitivo.

Conservar React/TypeScript compartido, Electron Windows, Capacitor Android y Kotlin limitado a adapters. No reescribir una segunda aplicación móvil. iOS continúa fuera de B0–B12. Los nombres de modelos son candidatos sujetos a evaluación, no requisitos comerciales congelados.

## 2. Dónde estamos

| Superficie | Evidencia al preparar GOV-03 | Lo que NO demuestra |
| --- | --- | --- |
| B0 / GOV-02 / GOV-02A | PR #15/#52/#55 mergeadas; main observado 667045ccd467b1efc8e7d12f5a15f5816a813c70 | Producto terminado |
| B1 #2 | Auditoría en progreso | Dataset agronómico aprobado |
| Recuperación legacy | Informe local del usuario: UI HTTP recuperada; reparación en staging | Commit de reparación, integración remota o IA |
| Harness | Contratos y CI documental existentes | Scope guard ejecutable o branch protection exigida |
| Chat visual | Petición de producto + investigación + Issues | Diagnóstico, cámara o modelos instalados |
| Vercel | Inventario read-only: ningún proyecto identificado por nombre como Dr. Cannabis | Deployment o hosting de inferencia local |

No convertir reportes locales en CI remoto ni fakes en capacidades.

## 3. Roadmap único completo

| Hito / tracker | Bloques existentes | Salida aceptable | Ampliación GOV-03 |
| --- | --- | --- | --- |
| M0 #46 | B0 #1; GOV #16/#54; B1 #2 | Gobierno + fuentes auditadas | GOV-03 #56; recuperación #57; guard #58 |
| M1 #47 | B2 #3, B3 #4, B4 #5 | Datos/SQLite; solver; agua/EC/pH/mezcla | No cambiar fórmulas dentro de visión |
| M2 #48 | B5 #6 (#17–#20), B6 #7, B7 #8, B8 #9 | Shells compartidos; calculator; inventario/campañas/historial; toolboxes | UI reutilizable y ports, sin forks |
| M3 #49 | B9 #10 (#21–#29), B10 #11 (#30–#36/#53) | Chat local/RAG/tools; historial; visor; UX móvil | Spike #59; corpus #60; captura #61; análisis #62; video #63 |
| M4 #50 | B11 #12 (#37–#41) | Windows/Android empaquetados y versiones compatibles | Preview web separada #66, solo con autorización |
| M5 #51 | B12 #13 (#42–#45) | Artefactos exactos probados + aceptación humana | Gate multimodal #65; detector #64 solo si activado |

M0–M5 son tracking Issues, no entidades Milestone nativas creadas por esta operación. Las relaciones parent/child se mantienen con referencias y task lists. No duplicar Issues para simular relaciones nativas.

## 4. Qué ejecutar ahora y qué esperar

1. #57: verificar/sellar la recuperación local; no mezclarla con el canónico.
2. #58: implementar guard y pruebas portables en PR propia después de revisar GOV-03.
3. #59: prueba local aislada de UN modelo con UNA foto, preflight de recursos y manifiesto. Puede ejecutarse antes de B2–B8 porque no integra producto. No requiere que el guard nuevo ya esté implementado: aplica el control manual del scope y evidencia.
4. #2: continuar auditoría legacy/Excel/knowledge; registrar explícitamente conflictos científicos, unidades y licencias.
5. B2–B8: completar núcleo y módulos por el WBS original.
6. B9: contratos, RAG, tools e historial; integrar providers que superaron #27/#59. #60 suministra corpus; #61 captura; #62 análisis visual.
7. #63: video tras fotos aceptadas. #64: detector especializado únicamente si una evaluación demuestra necesidad y se autoriza.
8. B10–B12: UX, paquetes y gate #65; preview #66 no sustituye artefactos nativos.

No imponer una dependencia circular: #27 puede definir corpus/umbrales antes de providers; la elección final ocurre después de evaluarlos. #61 puede probar captura sin #62. #62 usa contratos #21 y #29; #63 sigue a #62. #64 es opcional, no bloquea todo el programa por defecto.

## 5. Requisitos adicionales y evidencia

| ID | Requisito | Owner / Issue | Prueba requerida |
| --- | --- | --- | --- |
| H-001 | Task Contract confiable y límites exactos | HARNESS_ADOPTION / #58 | Negativos fuera de scope |
| H-002 | Working, staged y acumulado; recheck | HARNESS_ADOPTION / #58 | Repos temporales, renames/Unicode/deny |
| H-003 | Auditor independiente, SHA y costo externo | HARNESS_ADOPTION / #58/#66 | Receipt exact-head y autorización |
| V-001 | Fotos/cámara consentidas | LOCAL_VISION_PIPELINE / #61 | Permisos/cancelación/cámara real |
| V-002 | Modelo recibe imágenes reales localmente | LOCAL_VISION_PIPELINE / #59/#62 | Imagen vs sin imagen, provider real |
| V-003 | Biblioteca RAG trazable | LOCAL_VISION_PIPELINE / #60/#62 | Citas y ausencia de evidencia |
| V-004 | Medios privados, integridad, borrado | LOCAL_VISION_PIPELINE / #60/#61/#63 | Hashes, permisos, cero upload oculto |
| V-005 | Observación separada de hipótesis | LOCAL_VISION_PIPELINE / #62/#65 | Casos ambiguos y falsos positivos |
| V-006 | Riego no diagnosticado desde postura sola | LOCAL_VISION_PIPELINE / #62/#65 | Contradicciones/mediciones faltantes |
| V-007 | Video como evidencia temporal acotada | LOCAL_VISION_PIPELINE / #63 | Frames/timestamps y límites |
| V-008 | Evaluación antes de prometer precisión | #27/#60/#64/#65 | Corpus independiente, métricas por clase |
| V-009 | Cámara/visor compatibles con split/burbuja | MOBILE_SPLIT_WORKSPACE_SPEC / #61/#63 | Rotate/minimize/background real |
| V-010 | Motor reutilizable sin mezclar perfiles | LOCAL_VISION_PIPELINE / #62 | Aislamiento knowledge/tools/history |
| V-011 | Detector opcional con cajas verificadas | #64 | Localización real, licencia y evaluación |
| W-001 | Preview separada de producto nativo | #66 | Exact SHA, bundle sin privados |

R-001–R-032 permanecen vigentes. Estos IDs amplían trazabilidad sin renumerarlos; la matriz original debe consultar este mapa para H-/V-/W-.

## 6. No perder la UX acordada

Móvil expandido: visor 50% + chat 50%; historial arriba y conversación abajo dentro del chat; default interno 30/70, historia ajustable 25–45%. Minimizado: visor completo y burbuja fija inferior izquierda. No chat fullscreen. Fotografías, resultados, citas y frames se abren en el visor; preservar borrador, hilo, artifact y zoom.

La cámara del sistema puede abrir un selector/captura temporal y regresar al mismo workspace; no equivale a transformar el chat en fullscreen. Pausar la aplicación sí exige liberar cámara; continuar generación minimizada dentro de la app no garantiza ejecución ilimitada en background.

## 7. Regla para cada siguiente PR

Leer Issue completa y última decisión humana de alcance. Declarar repo/branch/base, paths, símbolos científicos readonly, tests y STOP. Una PR = un objetivo. Writer entrega SELF_VALIDATED_ONLY; auditor de sesión separada no escribe. CI y revisión vinculados al SHA exacto. No cerrar parents por existir documentación ni auto mergear.

Owners adicionales: [Harness](HARNESS_ADOPTION.md), [Visión](../architecture/LOCAL_VISION_PIPELINE.md), [Investigación y fuentes](../reference/SOURCE_REVIEW_2026-09-18.md), [Instalación experimental](../runbooks/GOOGLE_LOCAL_VISION_SETUP.md), [Tarea Codex #59](../tasks/AI_SPIKE_01_CODEX.md).
