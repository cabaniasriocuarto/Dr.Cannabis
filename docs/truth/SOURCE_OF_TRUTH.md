# SOURCE OF TRUTH — Dr. Cannabis

Estado inicial de reanudación: 2026-08-21.

## 1. Producto
**Dr. Cannabis – Fertilizer-IA** es una aplicación técnica/educativa de escritorio para formulación y manejo de fertirriego de cannabis.

Núcleo del producto:
- objetivos PPM por nutrientes/iones según fase;
- conversión de objetivos a gramos de sales para cualquier volumen;
- composición/pureza configurable por producto/lote;
- EC objetivo, estimada y medida con trazabilidad de límites;
- ajuste/seguimiento de pH;
- inventario, costos, sectores, campañas e historial;
- bot agronómico contextual integrado.

## 2. UX canónica
Desktop de tres columnas:
- izquierda: marca + navegación;
- centro: módulo seleccionado;
- derecha: chatbot persistente.

Módulos principales acordados:
1. Fertilizer Calculator.
2. CFM Calculator / Air Flow Need.
3. VPD Calculator / Vapor Pressure Deficit.
4. Harvest Timer.
5. Costos / Historial.
6. pH Tracker.
7. Feeding Calculator.
8. Soil Mix Calculator.
9. Yield Estimator.
10. Green Light.

## 3. Idiomas
Producto y bot previstos en:
- Español.
- English.
- Português do Brasil.

## 4. Persistencia y distribución
Objetivo técnico actual:
- Electron + React + TypeScript;
- SQLite local;
- Drizzle ORM/migraciones o equivalente tipado;
- instalador Windows NSIS de uso simple;
- funcionamiento local-first/offline.

## 5. Estado real observado
### Repo canónico `cabaniasriocuarto/Dr.Cannabis`
Existe scaffolding de Electron/TypeScript/SQLite:
- `src/main/main.ts`;
- `src/preload/preload.ts`;
- `src/db/schema.ts`, `dbManager.ts`, `seed.ts`, `migrate.ts`;
- `electron-builder.json`;
- dependencias React/Vite/Electron/Drizzle/better-sqlite3/Vitest.

Hay contratos IPC declarados para DB, solver y exportación, pero el repo debe auditarse porque el renderer, handlers IPC y solver productivo no están demostrados por la estructura actual.

### Repo legacy `cabaniasriocuarto/Dr.-Cannabis`
Contiene una implementación funcional anterior:
- `index.html` grande, identificado internamente como Dr. Cannabis V4.4 SIMPLE;
- frontend React/Babel/Tailwind de un archivo;
- targets fenológicos y conversiones de óxidos/elementos;
- lógica de productos, costos/historial y formulación;
- backend local y knowledge store;
- `backend/dr-cannabis-prompt.md`;
- `backend/ferticalc-knowledge.md` con base de conocimiento extensa.

Este repo es fuente de migración, no arquitectura final.

## 6. Fuente agronómica interna
Existe un archivo de programa de fertirriego/Excel usado históricamente como origen de objetivos. La migración debe:
- inventariar hojas, columnas, unidades y fórmulas;
- identificar qué valores son canónicos vs ejemplos;
- versionar el dataset resultante;
- crear tests de equivalencia Excel → dataset/BD;
- no copiar números contradictorios sin resolverlos explícitamente.

## 7. Biblioteca de productos
El diseño histórico contempla más de 60 sales/ácidos/aditivos y tipos como macro, secundario, micro, micro_mix, macro_mix, pH up/down y orgánicos.

La versión final debe modelar como datos, no hard-codear en UI:
- nombre y fórmula;
- composición declarada;
- forma del nutriente (elemental/óxido/especie);
- pureza;
- aportes;
- compatibilidades/notas;
- costo/stock/lote.

## 8. Bot Dr. Cannabis
Debe usar:
1. prompt maestro;
2. base de conocimiento local versionada;
3. contexto JSON explícito de la app;
4. datos locales de cultivo/receta/lecturas.

Reglas permanentes:
- datos de la app primero;
- no inventar faltantes;
- separar dato interno de rango genérico;
- respuesta breve/accionable por defecto y ampliación técnica a pedido;
- ES/EN/PT-BR;
- sin asesoría médica o de consumo;
- sin modificar BD por decisión autónoma del bot.

## 9. No negociables de ingeniería
- No reescritura gigante.
- No solver demo en producción.
- No números de composición inventados.
- No botón falso que simule funcionalidad.
- No `node_modules` dentro del repo.
- No acceso Node directo desde renderer.
- Tests para fórmulas y migraciones.
- Docs/truth sincronizadas con cada cambio arquitectónico.
- Release final debe instalarse y ejecutarse sin Node/VS Code en la PC del cliente.

## 10. Definición de terminado del producto
Dr. Cannabis se considera entregable cuando:
- todos los bloques canónicos están cerrados;
- solver validado con casos conocidos y dataset canónico;
- persistencia SQLite/migraciones verificadas;
- módulos principales operativos;
- chatbot integrado con conocimiento/contexto correcto;
- ES/EN/PT-BR verificados;
- exports e historial verificados;
- instalador Windows probado en máquina limpia;
- modo offline probado;
- tests/build/QA pasan;
- documentación y release notes están actualizadas.
