# Revisión de fuentes — reanudación y visión local

Owner #56. Fecha de referencia de la recuperación: 2026-09-18. El estado remoto exacto se identifica por SHA; las marcas temporales de GitHub/PR son las del servicio. Investigación realizada al preparar GOV-03; revalidar versiones/precios al implementar.

## 1. Alcance real de la lectura

Se revisó el historial disponible en esta conversación, el contexto pertinente recuperado, los archivos adjuntos accesibles y los recursos GitHub citados. No se afirma acceso exhaustivo a todos los chats pasados. La búsqueda de archivos no devolvió fuentes indexadas; se usaron los archivos disponibles físicamente. No se inspeccionó el Windows del usuario durante GOV-03.

## 2. Fuentes del proyecto y sus límites

| Fuente | Identificador | Qué soporta |
| --- | --- | --- |
| Canónico Dr.Cannabis | main 667045ccd467b1efc8e7d12f5a15f5816a813c70, tree 76c53f3e8f2094a7790d527b1f132752500aa359 | Gobierno B0/GOV-02/GOV-02A; B1 activo; arquitectura/UX objetivo |
| Bot-Trading-IA | bfa167c12f2d1e957e577eb543774c1f3e62c370 | Método de trabajo observado en AGENTS y workflow; no autorización de infraestructura |
| Reporte BOOT_RECOVERY_REPORT adjunto | SHA-256 02752e6e2ad2fe0539e41e8b92deb7cbef4c060f11472d2ae792a6b7863607cf | Codex reporta recuperación local y pruebas; sin commit de reparación/push |
| Patch adjunto | SHA-256 f35f14bcea2cd88eaf43395afe4c2319327576ee4dcf2d2dcaf09e4be6b098ee | Cambios locales propuestos/evidencia textual; no integración remota |
| Contexto canónico TXT adjunto | SHA-256 eb07acaa15b6dd1f60e3ee1900b417380c2db78b7db4349fe2283aad1306684e | Intención histórica desktop/solver; ampliada por GOV-02 |
| Guía/conversación Markdown adjunta | SHA-256 68561d8b24ab22526f31b271e29bb9cbb64d95352df9e2c6ab4b7b72ffcecc91 | Historia y guía; afirmaciones antiguas de demo no acreditan release |
| Excel Programa Fertirriego correcciones (2).xlsx | SHA-256 8db21f9c62c969cf41f65071582d0dd2607b92cac2b56a80a7a2fcc601148550 | Inventario de paquete/hojas únicamente en GOV-03; B1 debe auditar cifras |

Excel: nueve hojas — Hoja de Resultados; Hoja De Formulas; Factor de Conversión; Sales Binarias; %De elementos; Programa; Programa Exp; Programa Exp (2); Programa Exp (3). Existen partes de enlaces externos. Este inventario no valida fórmulas, objetivos ni el contenido de cada celda.

Biblioteca preservada según el reporte: backend/dr-cannabis-prompt.md, backend/ferticalc-knowledge.md, backend/knowledge-store.js y backend/dr-cannabis-backend.js. Preservar contenido no lo transforma en fuente agronómica confirmada. Las cifras y recomendaciones legacy se revisan en B1; no se corrigen ni promueven silenciosamente en esta investigación.

La recuperación es local, separada del repo canónico. El checkpoint sugerido después del informe no cuenta como ejecutado hasta obtener commit/evidencia. Owner #57.

## 3. Decisiones históricas mantenidas

Natural language, no preguntas precargadas como motor. Local-first; sin API paga obligatoria, API key ni PC/Wi-Fi local para el cliente Android. React/TypeScript compartidos; Electron Windows; Capacitor Android; Kotlin bridge; SQLite/RAG/tools; ES/EN/PT-BR. Móvil expandido split 50/50 con historial encima; minimizado burbuja inferior izquierda. iOS no incluido actualmente.

Agregar visión no sustituye solver ni obliga a una reescritura. La elección histórica de Google es preferencia de ecosistema; el modelo exacto continúa sujeto a benchmark.

## 4. Investigación externa: hechos vs decisiones del proyecto

### Google Gemma

- Model card oficial Gemma 4: https://ai.google.dev/gemma/docs/core/model_card_4
- Model card histórica Gemma 3n: https://ai.google.dev/gemma/docs/gemma-3n/model_card
- EmbeddingGemma: https://ai.google.dev/gemma/docs/embeddinggemma

Gemma 4 declara entradas multimodales y licencia Apache 2.0. Analiza video como secuencias de frames; esto no asegura que toda API/wrapper acepte archivos MP4. E2B/E4B son nombres basados en parámetros efectivos, no memoria total. Sus benchmarks generales no son validación fitopatológica en cannabis.

EmbeddingGemma es un modelo de embeddings textuales para recuperación, no el chat ni un detector visual. Revisar su licencia propia; no heredar automáticamente la de Gemma 4 a todos los componentes.

### Runtime y app de prueba

- LiteRT-LM: https://github.com/google-ai-edge/LiteRT-LM
- CLI oficial: https://developers.google.com/edge/litert-lm/cli
- Gallery: https://github.com/google-ai-edge/gallery
- Google Play: https://play.google.com/store/apps/details?id=com.google.ai.edge.gallery
- Ollama tag: https://ollama.com/library/gemma4:e4b-it-qat
- Tags: https://ollama.com/library/gemma4/tags
- Vision API: https://docs.ollama.com/capabilities/vision

LiteRT-LM ofrece API Kotlin y ejecución local. Gallery incluye Ask Image con cámara/galería y sirve para experimentar, no es nuestra app comercial. El catálogo observado de Ollama lista e4b-it-qat ~6.1 GB y e2b-it-qat ~4.3 GB; no son consumo de RAM/VRAM. Usar digest completo al descargar; tags pueden cambiar. Ollama en Windows es una decisión de laboratorio para reducir fricción, no reemplaza Google LiteRT-LM Android.

### Captura y límites diagnósticos

- CameraX ImageAnalysis: https://developer.android.com/media/camera/camerax/analyze
- University of Minnesota, Troubleshooting seedling issues: https://blog-fruit-vegetable-ipm.extension.umn.edu/2020/04/troubleshooting-seedling-issues.html
- Penn State, orientación para consultas con fotos: https://extension.psu.edu/programs/master-gardener/counties/washington/hotline
- Mohanty et al. 2016, estudio primario sobre identificación de enfermedades por imágenes: https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2016.01419/full

Los recursos de extensión sustentan pedir contexto además de fotos; síntomas de agua/raíces pueden confundirse visualmente. El estudio histórico muestra que desempeño sobre imágenes controladas no garantiza transferencia a otras condiciones. No es evaluación de Gemma 4, ni permite asignarle su tasa de error.

El plan de tres vistas guiadas, pipeline diferencial, límites de clips y detector opcional son decisiones de diseño propuestas para este proyecto, no resultados ya validados.

### Vercel

- Runtime/hosting: https://vercel.com/i/which-platform-should-host-your-docker-app
- GPU como infraestructura distinta: https://vercel.com/i/what-is-serverless-gpu
- Condiciones del plan a verificar: https://vercel.com/kb/guide/vercel-vs-northflank

Inventario conectado read-only: equipo Ranquel Tech Lab, 13 proyectos listados, ninguno identificado por nombre como Dr. Cannabis. No se comprobó un deployment Dr. Cannabis ni se creó ninguno. Vercel se plantea para una preview web separada (#66), no como GPU local gratuita ni evidencia Android. No asumir que un plan gratuito permite toda explotación comercial.

## 5. Pendientes explícitos

Instalación real, hardware actual, digest descargado, compatibilidad multimodal por runtime, cámara nativa, calidad en plantas, consentimiento/licencias de corpus, scope guard ejecutable, cierre de recuperación y release. Estos pendientes tienen Issues; ninguna búsqueda en la web los transforma en PASS.
