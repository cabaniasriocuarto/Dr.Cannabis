# LEGACY MIGRATION MAP

## Repositorios
### Legacy funcional
`cabaniasriocuarto/Dr.-Cannabis`

Contenido observado:
- `index.html`: aplicación monolítica V4.4 SIMPLE, con React/Babel/Tailwind y lógica de formulación.
- `backend/dr-cannabis-backend.js`: backend local.
- `backend/dr-cannabis-prompt.md`: prompt del bot.
- `backend/ferticalc-knowledge.md`: knowledge base extensa.
- `backend/knowledge-store.js`: almacenamiento/gestión de conocimiento.
- `assets/`: recursos y dependencias locales.

### Canónico
`cabaniasriocuarto/Dr.Cannabis`

Contenido observado:
- `src/main/main.ts`: shell Electron inicial.
- `src/preload/preload.ts`: API IPC declarada.
- `src/db/schema.ts`: esquema SQLite/Drizzle inicial.
- `src/db/dbManager.ts`: acceso DB inicial.
- `src/db/seed.ts`: sales/objetivos demo.
- `electron-builder.json`: packaging NSIS/macOS/Linux inicial.

## Regla de migración
No copiar el legacy entero al renderer nuevo. Migrar por dominios:

1. **Datos y unidades**
   - targets fenológicos;
   - composiciones;
   - conversiones de óxidos;
   - especies/nutrientes.

2. **Motor de cálculo**
   - funciones puras;
   - casos legacy reproducibles;
   - tests de equivalencia.

3. **Persistencia**
   - mapear conceptos legacy a tablas/migraciones canónicas.

4. **UI**
   - reproducir flujo/función, no necesariamente HTML/CSS exacto.

5. **Knowledge/Prompt**
   - conservar contenido útil;
   - separar prompt operativo de conocimiento agronómico;
   - versionar ES/EN/PT-BR.

## Hallazgos ya visibles
- Legacy tiene conversiones `P2O5_TO_P`, `K2O_TO_K`, `CaO_TO_Ca`, `MgO_TO_Mg`, `SO3_TO_S` y especies derivadas.
- Legacy tiene estados como Clonación, Esqueje, 1er Semana, Vegetativo, Preflora, Flora, Fin de Flora, Última Semana.
- Legacy incluye una corrección explícita previa sobre `N-NH4`, señal de que esa dimensión necesita regression tests.
- Canónico ya modela sales, sal-ion, precio, lote, sector, campaña, objetivos, formulación, resultados y alertas, pero los valores seed son ejemplos y no deben asumirse canónicos.
- Canónico declara IPC para solver/export, pero deben implementarse/verificarse handlers reales.

## Checklist por componente migrado
- [ ] origen legacy identificado;
- [ ] input/output/unidades documentados;
- [ ] comportamiento esperado registrado;
- [ ] datos canónicos confirmados;
- [ ] función nueva aislada;
- [ ] test equivalencia/regresión;
- [ ] UI nueva integrada;
- [ ] legacy ya no requerido para ese componente;
- [ ] `FEATURE_MAP` actualizado.
