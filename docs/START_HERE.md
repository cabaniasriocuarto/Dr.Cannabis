# START HERE — Dr. Cannabis

## Propósito

Este repositorio es el canónico para convertir Dr. Cannabis en una aplicación profesional multiplataforma, verificable, mantenible, local-first/offline y distribuible para Windows y Android.

## Antes de trabajar

Leer en este orden:

1. `AGENTS.md`
2. `docs/truth/SOURCE_OF_TRUTH.md`
3. `docs/product/PRODUCT_SPEC.md`
4. `docs/truth/FEATURE_MAP.md`
5. `docs/truth/NEXT_STEPS.md`
6. `docs/truth/WORK_BREAKDOWN_STRUCTURE.md`
7. `docs/truth/MILESTONE_PLAN.md`
8. `docs/truth/TRACEABILITY_MATRIX.md`
9. `docs/truth/DEVELOPMENT_WORKFLOW.md`
10. `docs/truth/TESTING_MATRIX.md`
11. `docs/truth/DECISION_LOG.md`
12. `docs/architecture/CROSS_PLATFORM_ARCHITECTURE.md` si se toca estructura/UI/plataforma
13. `docs/architecture/ANDROID_ON_DEVICE_AI.md` si se toca IA Android/modelos/assets
14. `docs/product/MOBILE_SPLIT_WORKSPACE_SPEC.md` si se toca UX móvil/chat/visor
15. `docs/truth/NUTRIENT_CALCULATION_CONTRACT.md` si se toca solver/PPM/EC/pH
16. `docs/truth/AI_KNOWLEDGE_CONTRACT.md` si se toca chatbot/RAG/tools
17. `docs/reference/LEGACY_MIGRATION_MAP.md` cuando se porte código/datos legacy

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

- misma UI/logic React + TypeScript;
- Capacitor;
- Kotlin solo como puente nativo;
- Google LiteRT-LM + modelo Gemma seleccionado por benchmark;
- sin API paga/key/PC/Wi-Fi local;
- offline después de instalar assets;
- distribución Google Play.

## UX móvil canónica

- split principal fijo 50/50;
- portrait: visor arriba, chat abajo;
- landscape/tablet: visor izquierda, chat derecha;
- dentro del chat: historial buscable arriba y conversación abajo;
- visor con zoom/pan/pinch para imágenes, tablas, gráficos y artifacts;
- chat nunca cubre el visor.

## Método de entrega

El proyecto se completa por parents/child Issues, branches y Draft PRs pequeñas. La Issue maestra es #14; el WBS y los trackers #46–#51 preservan el plan completo.

## Regla de oro

La calculadora profesional PPM/EC → gramos de sales es el núcleo. UI, Android, toolboxes, inventario, historial y chatbot reutilizan el mismo dominio y nunca duplican fórmulas.
