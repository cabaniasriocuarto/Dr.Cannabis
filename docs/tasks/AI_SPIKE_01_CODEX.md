# Codex task — AI-SPIKE-01 (#59)

Pegable en un chat de Codex local. Esta tarea no debe ejecutarse dentro de la recuperación ni de Bot-Trading-IA. El lab propuesto es C:\Dev\DrCannabis-AI-Lab; confirmar antes de crear.

```text
TASK=DR_CANNABIS_GOOGLE_VISION_SPIKE_V1
ISSUE=https://github.com/cabaniasriocuarto/Dr.Cannabis/issues/59
OBJECTIVE=Instalar/probar UN modelo local Google con UNA foto consentida,
medir funcionamiento y recursos; no integrar aún el bot de producto.

WORKSPACE_PROPOSED=C:\Dev\DrCannabis-AI-Lab
READ_ONLY=C:\Dev\DrCannabis-Recuperacion; original OneDrive; Bot-Trading-IA;
modelos/configuración/procesos de otros proyectos.

FUENTES
Leer la Issue #59 actual y última decisión humana de scope.
Consultar AGENTS.md y docs/truth/CURRENT_STATUS.md del canónico Dr.Cannabis.
Leer docs/runbooks/GOOGLE_LOCAL_VISION_SETUP.md y
 docs/architecture/LOCAL_VISION_PIPELINE.md en la branch/PR de GOV-03
 si todavía no están mergeados. Registrar ref exacto leído.
No modificar main ni interpretar una planificación como release.

PREFLIGHT
Confirmar ruta, existencia y contenido del lab. No sobrescribirlo.
Inventariar CPU/RAM/GPU/VRAM libre/disco y Node/PowerShell/Ollama.
Ejecutar solo lecturas ollama --version/list/ps si está instalado.
Comprobar OLLAMA_MODELS y configuración efectiva sin exponer secretos.
No cambiar variables persistentes ni detener Qwen/Hermes/Trading.
No descargar modelos si no se puede justificar espacio/compatibilidad.
Si falta Ollama, proponer instalador oficial y explicar requisitos antes
 de ejecutar. Si exige actualizar/reiniciar servicio compartido, detener
 esa acción hasta autorización específica; no hacerlo por comodidad.

CONTRATO
Un candidato: gemma4:e4b-it-qat, paquete observado ~6.1 GB.
Usar registro oficial Ollama. No latest ni -cloud.
Alternativa e2b-it-qat solo por imposibilidad documentada y decisión,
 no descargar variantes en paralelo.
Reportar tamaño y destino antes del pull. Descarga de este modelo local
 no concede permisos para contratar APIs ni servicios.
Ningún nuevo gasto, cuenta, API key, modelo cloud, driver ni software global
 fuera de instalación explícita y acotada.

ALLOWED_PATHS
Solo scripts, manifest, documentación y evidencia privada del lab.
Pesos solo en el store de modelos ya configurado y previamente verificado.
El contenido temporal y fotos no se publica ni incorpora a GitHub.
Declarar allowlist absoluta antes de escribir.

IMPLEMENTACIÓN EXPERIMENTAL
Preparar script PowerShell o Node de prueba sin dependencias innecesarias.
Validar una foto JPEG/PNG propia o consentida: path exacto, MIME real,
 tamaño y dimensiones razonables. Si no hay foto, NEEDS_CONSENTED_IMAGE.
No buscar fotos privadas recorriendo carpetas del usuario.
Construir POST a http://127.0.0.1:11434/api/chat con imagen base64.
Usar num_ctx=4096 y num_predict=512 por request, no variables globales.
Smoke stream:false; deadline inicial120s que cubre también el cuerpo.
Timeout/error tiene resultado explícito; nada de retries infinitos.
No imponer un 5s timeout de frontend a la generación real.
Solicitar observaciones visibles, limitaciones y datos faltantes,
 no diagnóstico garantizado ni recetas/tratamientos.
No incorporar RAG completo todavía; la prueba debe aislar visión I/O.

EVIDENCIA
Registrar runtime, tag y digest COMPLETO, hash/config, tamaño real,
 hardware/recursos libres, latencia fría/caliente, salida real y fallos.
Prueba sin imagen vs con imagen y una entrada inválida/corrupta.
Probar inferencia con externos bloqueados cuando el entorno lo permita;
 loopback permitido; no desactivar seguridad o firewall del usuario.
Si no se puede medir tráfico, NETWORK_PROOF=NOT_RUN; no inventar cero.
No reutilizar un modelo ocupado por otro proyecto ni detener procesos ajenos.
Marcar la diferencia: instalado / carga / imagen probada / calidad no evaluada.
Un fixture sintético puede probar el transporte, no diagnóstico agronómico.
No declarar video probado por haber probado fotos.

EXCLUSIONES
No modificar recovery, biblioteca, backend, solver, src del canónico,
 Electron/Android productivos ni Vercel. No push/merge/deploy.
No instalar otro modelo ni hacer fine-tuning/entrenamiento/embeddings.
No llevar datos a servicios externos ni sumar suscripciones.
No declarar B1/B9/B10 completados.

CIERRE
RESULT=PASS|PARTIAL|BLOCKED
WORKSPACE=
MODEL_TAG=
MODEL_DIGEST=
RUNTIME_VERSION=
HARDWARE_AND_AVAILABLE_MEMORY=
DOWNLOAD_BYTES_AND_DESTINATION=
VISION_REAL_INPUT_TEST=
LATENCY_COLD_WARM=
MEMORY_PEAK=
NETWORK_PROOF=
CANCELLATION_TIMEOUT_TEST=
DIAGNOSTIC_VALIDATION=NOT_EVALUATED
RECOVERY_AND_TRADING_UNCHANGED=
PAID_API_USED=NO
DEPLOY=NO
EVIDENCE_PATH=
NEXT=Revisión de resultados #59; corpus #60 y evaluación #27 antes de integrar.

Empezá por el preflight. Ejecutá lo autorizado dentro del lab; si una
 condición requiere permiso o un recurso faltante, informá exactamente
 ese bloqueo y conservá intacto lo que ya funciona.
```
