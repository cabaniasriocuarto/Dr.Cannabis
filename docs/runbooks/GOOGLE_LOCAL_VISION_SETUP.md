# Google local vision — prueba de instalación

Owner experimental #59; guía para el desarrollador, no onboarding del cliente. No se instaló un modelo en la PC por publicar esta guía. Producto final Android: inferencia integrada dentro de Dr. Cannabis, sin pedir Gallery/Ollama/configuración al cliente.

## 1. Qué es cada pieza

Gemma 4: modelo de Google que recibe texto e imágenes. LiteRT-LM: runtime de Google, objetivo Android. Google AI Edge Gallery: app de prueba con Ask Image. Ollama: runtime alternativo práctico para probar Gemma en Windows y conversar por API local. EmbeddingGemma: búsqueda textual, no es visión.

Fuentes: [model card](https://ai.google.dev/gemma/docs/core/model_card_4), [LiteRT-LM](https://github.com/google-ai-edge/LiteRT-LM), [Gallery](https://github.com/google-ai-edge/gallery), [Ollama visión](https://docs.ollama.com/capabilities/vision).

## 2. Android: probar sin escribir la integración

Abrir la ficha oficial: https://play.google.com/store/apps/details?id=com.google.ai.edge.gallery

Instalar Google AI Edge Gallery si la tienda lo ofrece para ese dispositivo. Dentro de la app usar Ask Image y un Gemma 4 compatible ofrecido por su catálogo. E2B es primer candidato móvil de menor tamaño; no instalar paquetes de páginas desconocidas. Descargar una vez con conexión y probar luego sin red. Galería/cámara requiere permiso y acción explícita. No usar Agent Skills que consulten sitios externos para una prueba de inferencia sin red.

Ensayo: foto consentida de una hoja; solicitar solo observaciones visibles y qué no puede determinarse. Repetir sin foto para demostrar entrada visual. Registrar teléfono/OS, versión Gallery/runtime/modelo y tiempos. El resultado es una prueba general, sin nuestra biblioteca ni validación diagnóstica. Si la app/dispositivo no soporta ese candidato, declarar capacidad insuficiente; no prometer soporte por el solo hecho de tener Android.

## 3. Windows: preflight no destructivo

Workspace propuesto: C:\Dev\DrCannabis-AI-Lab. Crear solo si no existe; no sustituir la recuperación. Confirmar hardware, disco y RAM/VRAM libres, no confiar en recuerdos de otra máquina.

```powershell
Get-Command ollama -ErrorAction SilentlyContinue
ollama --version
ollama list
ollama ps
nvidia-smi
```

Los últimos comandos requieren que sus herramientas existan; un comando ausente se reporta, no dispara instalaciones globales. Revisar configuración efectiva de modelos sin imprimir secretos. No alterar OLLAMA_MODELS, contexto persistente ni rutas de otros proyectos. No detener Hermes/Qwen/Trading ni procesos ajenos para liberar VRAM. Si Ollama falta, usar instalador oficial Windows con autorización; si debe actualizarse/reiniciarse un servicio compartido, informar antes.

## 4. Un solo candidato

Modelo experimental Windows: gemma4:e4b-it-qat.
Catálogo observado: aproximadamente 6.1 GB, no equivalente a memoria de ejecución. Alternativa menor gemma4:e2b-it-qat (~4.3 GB) solo después de documentar por qué el primero no es viable; no descargar ambos por reflejo.

```powershell
ollama pull gemma4:e4b-it-qat
ollama show gemma4:e4b-it-qat
```

No usar latest, gemma4 sin tag ni variantes cloud. Registrar digest completo desde API/listado de manifests, runtime, tamaño real, licencia y parámetros. Conservar el tag y digest en un manifest local; no commitear pesos. La licencia del modelo no elimina costos de hardware/electricidad ni sustituye licencias de datasets/runtime.

## 5. Ensayo con una foto por API local

Usar foto propia/consentida JPEG/PNG y verificar MIME, tamaño y dimensiones. Cargar solo ese archivo. En REST Ollama images contiene base64; no pasar una ruta Windows como si fueran los bytes.

Ejemplo conceptual del cuerpo que debe construir el script de #59:

```json
{
  "model": "gemma4:e4b-it-qat",
  "messages": [
    {
      "role": "user",
      "content": "Describí solamente lo visible en la planta. Separá observaciones de posibles causas. No afirmes enfermedad ni falta/exceso de agua con certeza. Indicá qué foto o dato falta.",
      "images": ["BASE64_DE_LA_FOTO_VALIDADA"]
    }
  ],
  "stream": false,
  "keep_alive": 0,
  "options": {"num_ctx": 4096, "num_predict": 512}
}
```

Destino: http://127.0.0.1:11434/api/chat. Base64 es un placeholder a reemplazar por el script, no un recurso válido. stream:false es solo smoke de laboratorio, no decisión para chat productivo. El deadline debe cubrir conexión, generación y lectura del cuerpo; comenzar con 120s como límite experimental explícito y reportar timeout, nunca esperar indefinidamente. Contexto 4096 es configuración experimental conservadora, no límite del modelo. No cambiar opciones globales para esta prueba.

Registrar salida real y separar final answer de metadatos; no exponer contenido privado en Git. Una respuesta plausible no es etiqueta de referencia. Ejecutar prueba con solicitudes externas bloqueadas, no solo confiar en etiqueta offline. Si falta foto, detener fase visual con NEEDS_CONSENTED_IMAGE; un dibujo sintético solo prueba entrada/salida.

## 6. Instalación integrada posterior

#25/#26: adapter Capacitor/Kotlin, LiteRT-LM y paquete de modelo compatible con manifest/hash. Modelos GGUF de Ollama no se renombran .litertlm. #28 evalúa runtime Windows definitivo. #61 captura; #62 biblioteca y respuestas; #63 video por frames. No integrar antes de contratos y gates.

El cliente final instala Dr. Cannabis y usa el chat; no debe elegir cuantización ni poner API key. La prueba Gallery/Ollama es para nosotros, no para el usuario comercial.

## 7. Cierre

Reportar model digest, runtime, hardware, foto/manifest privado, latencia fría/caliente, memoria, tráfico, timeout/cancelación, resultado I/O y DIAGNOSTIC_VALIDATION=NOT_EVALUATED. Nunca confundir MODEL_DOWNLOADED con VISION_TESTED o VISION_TESTED con DIAGNOSIS_VALIDATED.
