# START HERE — Dr. Cannabis

## Propósito

Este repositorio es el canónico para convertir Dr. Cannabis en una aplicación profesional multiplataforma, verificable, mantenible, local-first/offline y distribuible para Windows y Android.

## Antes de trabajar

Leer en este orden:

1. `AGENTS.md`
2. `docs/truth/CURRENT_STATUS.md`
3. `docs/truth/SOURCE_OF_TRUTH.md`
4. `docs/product/PRODUCT_SPEC.md`
5. `docs/truth/FEATURE_MAP.md`
6. `docs/truth/NEXT_STEPS.md`
7. `docs/truth/WORK_BREAKDOWN_STRUCTURE.md`
8. `docs/truth/GITHUB_OPERATING_MODEL.md`
9. `docs/truth/MILESTONE_PLAN.md`
10. `docs/truth/TRACEABILITY_MATRIX.md`
11. `docs/truth/DEVELOPMENT_WORKFLOW.md`
12. `docs/truth/TESTING_MATRIX.md`
13. `docs/truth/DECISION_LOG.md`
14. `docs/architecture/CROSS_PLATFORM_ARCHITECTURE.md` si se toca estructura/UI/plataforma
15. `docs/architecture/ANDROID_ON_DEVICE_AI.md` si se toca IA Android/modelos/assets
16. `docs/product/MOBILE_SPLIT_WORKSPACE_SPEC.md` si se toca UX móvil/chat/visor
17. `docs/truth/NUTRIENT_CALCULATION_CONTRACT.md` si se toca solver/PPM/EC/pH
18. `docs/truth/AI_KNOWLEDGE_CONTRACT.md` si se toca chatbot/RAG/tools
19. `docs/reference/LEGACY_MIGRATION_MAP.md` cuando se porte código/datos legacy

`CURRENT_STATUS.md` manda para determinar qué bloque está vigente y qué marcadores temporales pre-merge quedaron supersedidos. No reemplaza los contratos técnicos de los demás documentos.

## Repositorios relacionados

- Canónico: `cabaniasriocuarto/Dr.Cannabis`
- Legacy funcional/read-only: `cabaniasriocuarto/Dr.-Cannabis`

No borrar ni reescribir el legacy hasta completar y verificar cada migración.

## Plataformas objetivo

### Windows

- Electron;
- React + TypeScript compartidos;
- SQLite local;
- instalador NSIS;
- provider LLM local desacoplado;
- usuario final sin Node/VS Code.

### Android

- misma UI/lógica React + TypeScript;
- Capacitor;
- Kotlin solo como puente nativo;
- Google LiteRT-LM + modelo Gemma seleccionado por benchmark;
- sin API paga/key/PC/Wi-Fi local;
- offline después de instalar assets;
- distribución Google Play.

## UX móvil canónica

El chat tiene dos estados y nunca usa pantalla completa:

### Expandido

- split principal fijo 50/50;
- portrait: visor arriba, chat abajo;
- landscape/tablet: visor izquierda, chat derecha;
- dentro del chat: historial buscable arriba y conversación abajo;
- visor con zoom/pan/pinch para imágenes, tablas, gráficos y artifacts;
- ningún panel cubre al otro.

### Minimizado

- el visor o módulo activo usa todo el espacio útil;
- queda una burbuja pequeña fija abajo a la izquierda;
- tocarla restaura el mismo thread, borrador, mensajes, generación, artifact, zoom, pan y scroll;
- minimizar no cancela silenciosamente una respuesta.

## Operación GitHub

- Master: #14.
- Estado vigente: `docs/truth/CURRENT_STATUS.md`.
- Parent/child Issues según WBS.
- Formularios en `.github/ISSUE_TEMPLATE/`.
- Toda PR usa `.github/PULL_REQUEST_TEMPLATE.md` y nace Draft.
- Trackers #46–#51 preservan M0–M5 mientras no existan Milestones nativas gestionables.
- No usar blank Issues para saltar contratos; seguir `GITHUB_OPERATING_MODEL.md`.

## Método de entrega

El proyecto se completa por parents/child Issues, branches y Draft PRs pequeñas. La Issue maestra es #14; el WBS y los trackers preservan el plan completo.

## Regla de oro

La calculadora profesional PPM/EC → gramos de sales es el núcleo. UI, Android, toolboxes, inventario, historial y chatbot reutilizan el mismo dominio y nunca duplican fórmulas.
