# LOCAL VISION PIPELINE — Fotos, cámara y clips

Owner: GOV-03 #56; implementación #59–#65. Estado: contrato propuesto hasta merge; ninguna capacidad runtime se declara implementada aquí. Preserva AI_KNOWLEDGE_CONTRACT, CROSS_PLATFORM_ARCHITECTURE y MOBILE_SPLIT_WORKSPACE_SPEC.

## 1. Alcance y separación de responsabilidades

```text
Usuario autoriza foto/clip
  → MediaCapturePort (Windows/web o Android nativo)
  → validación / orientación / calidad / referencias privadas
  → modelo visión-lenguaje observa detalles visibles
  → recuperador consulta biblioteca validada + contexto de cultivo
  → tools deterministas disponibles aportan cálculos/lecturas
  → respuesta: observaciones / causas posibles / qué falta comprobar
  → visor exacto + citas + persistencia local versionada
```

Cámara != modelo; modelo != biblioteca; biblioteca != evidencia de diagnóstico; hosting != inferencia. El proveedor decide cómo alimentar píxeles al runtime, no cambia la semántica de los resultados. Un texto describiendo una foto no cuenta como prueba de visión.

El mismo chat-core puede servir otro bot con profileId, namespace de knowledge, allowlist de herramientas y base de conversaciones independientes. No recuperar documentos ni datos entre perfiles por compartir pesos/modelo.

## 2. Candidatos, no selección final

Google Gemma 4 es candidato de visión, conforme a la model card investigada. Google LiteRT-LM continúa como runtime Android objetivo. Ollama con gemma4:e4b-it-qat es una ruta simple de laboratorio Windows, no obligación comercial para el cliente. Gemma 3n puede ser comparación secundaria; no descargar todas las variantes por defecto.

La documentación de un modelo puede incluir video/audio que un wrapper concreto no exponga. Declarar capacidades por modelo + formato + cuantización + runtime + versión + dispositivo; no por nombre de familia. El motor de embeddings textuales no ve fotos por sí solo.

Fuentes oficiales y versiones observadas: SOURCE_REVIEW_2026-09-18.md y GOOGLE_LOCAL_VISION_SETUP.md. La aprobación definitiva depende de #27/#65.

## 3. Captura guiada

Primer recorrido: una foto o un conjunto pequeño consentido. Pedir vista de planta entera y detalle enfocado del haz/envés cuando sean relevantes. Permitir señalar región, comparar zona sana/afectada y adjuntar contexto. Mostrar previsualización antes de analizar, repetir/cancelar/eliminar sin perder hilo.

Comprobar foco, exposición, dominante fuerte de luces, resolución útil y oclusiones. Mala imagen produce quality_insufficient y una petición concreta al usuario dentro del mismo chat. No corregir un detalle biológico mediante relleno/superresolución generativa. Un recorte conserva relación con píxeles del original.

Cámara/micrófono no arrancan al abrir chat. Micrófono apagado salvo permiso de tarea separado. Liberar recursos al cancelar, cambiar app, revocar permisos o background. Para preview continuo usar política que descarta frames antiguos; el LLM no procesa cada frame de cámara.

## 4. Modelo de datos propuesto

Los siguientes tipos expresan semántica; #21/#62 deben implementar schemas runtime y probarlos antes de usarlos.

```ts
type MediaKind = 'photo' | 'video' | 'video_frame';
type MediaRef = {
  id: string;
  profileId: string;
  workspaceId: string;
  threadId: string;
  kind: MediaKind;
  sha256: string;
  mimeType: string;
  byteLength: number;
  width: number;
  height: number;
  capturedAt?: string; // instante ISO; no inventar si archivo importado no lo informa
  parentMediaId?: string;
  timeMs?: number; // frame relativo al clip
  transformRef?: string; // recorte/orientación reproducibles
};
type VisualAnalysis = {
  schemaVersion: number;
  caseId: string;
  mediaIds: string[];
  quality: 'usable' | 'limited' | 'insufficient';
  observations: Array<{
    text: string;
    mediaId: string;
    frameTimeMs?: number;
    regionRef?: string;
  }>;
  hypotheses: Array<{
    label: string;
    supports: string[];
    contradicts: string[];
    citationIds: string[];
  }>;
  status: 'insufficient_evidence' | 'visual_suspicion' | 'requires_confirmation';
  missingInformation: string[];
  nextChecks: string[];
  limitations: string[];
  confidenceCalibration: 'not_validated' | 'validated_on_declared_dataset';
  modelManifestId: string;
  knowledgeManifestId: string;
};
```

No incluir rutas de filesystem arbitrarias ni URLs externas controladas por el modelo en MediaRef. El adapter autorizado resuelve ID→archivo privado. Timestamps desconocidos siguen ausentes. Cajas del detector y recortes del usuario usan regiones verificadas; el VLM no inventa polígonos con apariencia de medición precisa.

La confirmación humana/laboratorio es un registro separado con fuente, método, fecha y revisor. El campo status del modelo no puede elevarse a confirmado por su propia redacción. No mostrar porcentajes numéricos de certeza del LLM sin método de calibración y conjunto de evaluación declarados.

## 5. Observación y diagnóstico diferencial

Formato de respuesta al usuario:

1. Qué se observa y dónde.
2. Qué explicaciones son compatibles, y cuáles datos contradicen cada una.
3. Qué falta para diferenciarlas y siguiente comprobación concreta.
4. Fuente de biblioteca y limitación del análisis.

Una hoja caída puede justificar una observación de postura, no la orden automática de regar. Registrar humedad de sustrato realmente medida, fecha/cantidad de riego, drenaje, recipiente, ambiente y evolución cuando hagan falta. No inferir litros, EC, pH o humedad interna desde RGB.

Mosca blanca es una plaga visible; un patógeno y una plaga no son conceptos intercambiables. Una foto puede mostrar signos compatibles con daño/enfermedad, pero no confirma organismos microscópicos, virus ni una etiología de raíz invisible. Si el caso requiere una prueba física, laboratorio o especialista, explicarlo sin inventar el resultado.

No recomendar cambios destructivos, eliminación de plantas o tratamientos automáticos por una conjetura visual. Las acciones sobre datos o equipos siguen requiriendo autorización; control industrial autónomo sigue fuera de alcance.

## 6. RAG y herramientas

Ingesta #60 preserva el origen de la biblioteca y marca conflictos/datos no validados. Los textos de fuentes no se elevan a system prompt. Recuperación exacta + semántica con filtros por cultivo/fase/sistema/idioma y citas documento/sección/versión. Embeddings textuales indexan textos/descriptores, no prueban similitud visual.

Flujo admisible: observación visual preliminar → búsqueda por signos + pregunta → respuesta contextual. Registrar qué observaciones son del VLM y cuáles hechos vienen de lecturas o herramientas. Una mala observación puede inducir mala recuperación; incluir búsqueda diferencial/contradictoria, no solo confirmatoria.

Datos estructurados existentes mantienen unidades, provenance y estado demo/canónico. Una tool no disponible genera estado unavailable, no un cálculo de memoria. Mantener registro call→validated args→result→answer. Nada en una foto/documento puede ampliar la allowlist ni dar permiso a una escritura.

## 7. Video y cámara en vivo

Fase posterior #63: clips cortos procesados como secuencias de frames. Presupuesto inicial propuesto hasta 20 segundos y 8 frames útiles; evaluar y ajustar con autorización. No es benchmark ni límite universal de Gemma. No enviar un MP4 a una API que solo admite imágenes.

Guardar hash del clip, selección y timestamps exactos. Elegir nítidos y diversos, mantener orden temporal y ventanas de contexto con límites. No declarar que se analizó todo si el runtime recibió solo un frame. Decodificación acotada; cancelar en cualquier etapa libera recursos.

No contar repetidamente el mismo insecto en varios frames. El movimiento puede aportar evidencia visible pero no convierte una postura en medición hídrica. Comparar foto y clip en el mismo corpus antes de afirmar mejora.

Preview de cámara puede ser fluida sin que la IA analice continuamente. Una acción Analizar dispara el trabajo. Monitoreo 24/7 y control autónomo no están incluidos.

## 8. Detector especializado opcional

#64 evalúa localización de objetos pequeños cuando el VLM no alcance las métricas necesarias. Se requiere dataset anotado, licencia revisada y exportación/runtime probados. No importar un detector entrenado en otras plantas como validación de cannabis.

Toda caja/etiqueta mostrada tiene modelo, versión, score bruto y transformación al original. Score del detector no equivale automáticamente a probabilidad de diagnóstico. No detección no implica ausencia. No usar apariencia de precisión para disfrazar una suposición del chat.

## 9. UX y lifecycle

Captura/resultados dentro del visor del split acordado. Historial y conversación permanecen en la mitad del chat. Minimizar expande visor y mantiene burbuja inferior izquierda, borrador/hilo/imagen/zoom. Nunca crear chat fullscreen.

La cámara/selector nativo puede tomar foco temporal y regresar al mismo workspace. El almacenamiento y la generación viven fuera del montaje del panel. Minimizar no cancela la generación, pero pausar la app libera cámara y sigue la política real del sistema para inferencia; tras terminación de proceso, respuesta parcial/interrumpida, no promesa de continuidad garantizada.

Presupuestos distintos: health corto, carga de modelo, primer token, generación total, cuerpo recibido y cancelación. No reutilizar ciegamente el timeout de 5 segundos de la recuperación. Una sola generación activa por dispositivo al inicio, con cola acotada; manejar memoria y temperatura sin apagar otros proyectos.

## 10. Privacidad y seguridad

Permisos mínimos, acciones explícitas, archivos privados. Validar MIME/contenido/dimensiones/tamaño/codec y rutas; bloquear descompresiones desmedidas, traversal y referencias ajenas. Normalizar orientación y retirar GPS cuando no sea requerido; no subir metadata ni fotos por defecto.

Borrado explícito incluye original gestionado por la app, derivados, thumbnails e índices asociados, sin borrar archivos originales externos del usuario. Política de retención visible; ninguna limpieza destructiva implícita. Aportar al corpus requiere consentimiento separado del uso del bot.

No modelos/fotos/biblioteca privada en Git o Vercel. Logs redactados con IDs/digests, no mensajes completos. Datos sensibles accidentales fuera del objetivo deben minimizarse. No cloud fallback oculto ni API paga.

## 11. Validación y release

#59 demuestra I/O local y recursos; #60 prepara evidencia; #27/#65 determinan calidad. Medir por clase y por dispositivo: falsos positivos/negativos, abstención/cobertura, error de respuestas aceptadas, citas/grounding, latencia fría/caliente, RAM/VRAM, batería/temperatura, OOM/ANR, cancelación, pérdida de estado.

Separar train/dev/test por planta/sesión/origen. Etiquetas de referencia independientes y nivel de confirmación. No permitir que el propio modelo genere sus respuestas esperadas. Evaluar sanos, mixtos, desconocidos, luz difícil, blur y daños parecidos. No fijar cifras de marketing sin tamaño de muestra/método/intervalos.

Cada evidencia registra app SHA, runtime/modelo/formato/quantization/digest, embedding/knowledge/corpus y dispositivo. Cambiar esos inputs invalida métricas afectadas. Preview web/maqueta/fake no demuestra diagnóstico ni offline nativo.
