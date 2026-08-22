# START HERE — Dr. Cannabis

## Propósito
Este repositorio es el canónico para convertir Dr. Cannabis en una aplicación de escritorio seria, verificable, mantenible y distribuible.

## Antes de trabajar
Leer en este orden:
1. `AGENTS.md`
2. `docs/truth/SOURCE_OF_TRUTH.md`
3. `docs/product/PRODUCT_SPEC.md`
4. `docs/truth/FEATURE_MAP.md`
5. `docs/truth/NEXT_STEPS.md`
6. `docs/truth/DEVELOPMENT_WORKFLOW.md`
7. `docs/truth/TESTING_MATRIX.md`
8. `docs/truth/NUTRIENT_CALCULATION_CONTRACT.md` si se toca el solver
9. `docs/truth/AI_KNOWLEDGE_CONTRACT.md` si se toca el chatbot
10. `docs/truth/DECISION_LOG.md`
11. `docs/reference/LEGACY_MIGRATION_MAP.md` cuando se porte código/datos antiguos

## Repositorios relacionados
- Canónico: `cabaniasriocuarto/Dr.Cannabis`
- Legacy funcional: `cabaniasriocuarto/Dr.-Cannabis`

No borrar ni reescribir el legacy hasta completar y verificar la migración.

## Método de entrega
El proyecto se completa por bloques/Issues, no con una reescritura gigante.
Cada bloque tiene scope explícito, pruebas, documentación y Draft PR independiente.

## Regla de oro
La calculadora profesional PPM/EC → gramos de sales es el núcleo. Toolboxes, inventario, historial y chatbot se integran alrededor del mismo modelo de datos y nunca deben duplicar lógica de negocio.
