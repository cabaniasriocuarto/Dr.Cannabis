# TESTING MATRIX — Dr. Cannabis

| Superficie | Prueba mínima | Gate |
| --- | --- | --- |
| Conversión ppm ↔ masa | Casos manuales conocidos | PASS obligatorio |
| Conversión óxidos ↔ elemento | P2O5/P, K2O/K, CaO/Ca, MgO/Mg, SO3/S | PASS obligatorio |
| Aportes multi-ion | Una sal aporta múltiples nutrientes correctamente | PASS obligatorio |
| Pureza | 100%, valor real y límites inválidos | PASS obligatorio |
| N-NO3/N-NH4 | separación y suma de N total | PASS obligatorio |
| Solver | receta resoluble | PASS obligatorio |
| Solver | receta no resoluble/constraints | error explícito, no NaN |
| Tolerancias | dentro/fuera de rango | PASS obligatorio |
| Volumen | escalado 1 L / 10 L / tanque grande | PASS obligatorio |
| Costo | gramos × costo/kg | PASS obligatorio |
| Stock/lote | consumo y falta de stock | PASS según bloque |
| EC estimada | modelo determinista + límites documentados | PASS antes de release |
| pH | validación/rangos/registro | PASS según módulo |
| DB fresh install | migraciones desde cero | PASS obligatorio |
| DB upgrade | migración desde versión previa fixture | PASS antes de release |
| Persistencia | guardar/cerrar/reabrir | PASS obligatorio |
| IPC | payload válido/inválido | PASS obligatorio |
| Electron security | contextIsolation=true, nodeIntegration=false | PASS obligatorio |
| UI shell | navegación cambia centro y conserva chat | PASS obligatorio |
| Fertilizer UI | flujo completo input→solve→save | PASS obligatorio |
| VPD | ejemplos conocidos y límites HR/T | PASS módulo |
| CFM | dimensiones/unidades/factores | PASS módulo |
| Harvest | fechas y zonas horarias | PASS módulo |
| Historial | alta/listado/filtros | PASS módulo |
| Export | PDF/CSV/XLSX abre y contiene datos correctos | PASS antes de release |
| i18n | ES/EN/PT-BR en rutas críticas | PASS antes de release |
| Chatbot grounding | usa contexto actual y no inventa faltantes | PASS antes de release |
| Chatbot offline | backend/modelo local no requiere internet | PASS antes de release |
| Build | TypeScript + Vite/Electron | PASS por PR relevante |
| Installer | NSIS instala sin Node/VS Code | PASS release |
| Upgrade | mantiene DB/configuración | PASS release |
| Uninstall | no rompe datos según política definida | PASS release |
| Offline end-to-end | app usable sin red | PASS release |

## Fixtures canónicas
Crear en bloques posteriores:
- dataset mínimo de 5–8 sales con composición validada;
- casos del Excel con expected outputs;
- DB fixture v1;
- cultivos ejemplo marcados `TEST_FIXTURE_ONLY`.

## Regla
Un test con datos demo prueba lógica; no convierte esos datos demo en targets o composiciones canónicas de producción.
