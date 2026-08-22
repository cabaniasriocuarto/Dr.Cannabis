# PRODUCT SPEC — Dr. Cannabis · Fertilizer-IA

## Visión

Aplicación profesional local-first/offline para Windows y Android que formula soluciones de fertirriego con PPM/EC/pH, administra datos técnicos y ofrece asistencia contextual en lenguaje natural.

La pieza central es el Fertilizer Calculator. La IA interpreta datos y usa herramientas; no sustituye el motor de cálculo.

## Principios

- una sola base funcional React + TypeScript;
- dominio/solver compartidos;
- Electron para Windows;
- Capacitor para Android;
- Kotlin solo como puente nativo;
- SQLite local;
- conversación natural, no preguntas precargadas;
- datos y fuentes visibles;
- sin API paga, API key, PC o Wi-Fi local como requisito para Android;
- offline después de instalar los assets requeridos;
- no fallback cloud oculto.

## Flujo principal

1. Crear/seleccionar sector y campaña.
2. Elegir fase y sistema.
3. Usar objetivos PPM/EC canónicos.
4. Seleccionar sales/lotes/purezas.
5. Definir volumen y agua base.
6. Ejecutar solver.
7. Revisar gramos, aportes, desvíos, EC estimada, costo y alertas.
8. Registrar EC/pH/riego/drenaje.
9. Guardar formulación e historial.
10. Consultar al bot con contexto actual.
11. Abrir imágenes, tablas, gráficos, resultados y fuentes en el visor.
12. Minimizar el chat cuando se necesite el visor completo y restaurarlo sin perder estado.

## Plataformas

### Windows

- Electron;
- UI desktop de tres zonas;
- SQLite local;
- provider LLM local desacoplado;
- instalador NSIS;
- usuario final sin Node/VS Code.

### Android

- UI React/TypeScript compartida;
- Capacitor;
- plugin Kotlin tipado;
- Google LiteRT-LM;
- familia Gemma como candidata sujeta a benchmark;
- signed AAB/Google Play;
- uso offline posterior a instalación.

## UX desktop

1. izquierda: navegación;
2. centro: módulo/visor;
3. derecha: chat persistente.

## UX Android canónica

El chat no usa pantalla completa. Tiene dos estados de presentación.

### Estado expandido: `EXPANDED_SPLIT`

- portrait: visor arriba 50%, chat abajo 50%;
- landscape/tablet: visor izquierda 50%, chat derecha 50%;
- ratio expandido MVP fijo 50/50;
- el chat no reemplaza ni cubre el visor.

### Estado minimizado: `MINIMIZED_BUBBLE`

- el panel de chat desaparece del layout;
- el visor o módulo activo ocupa todo el espacio útil;
- queda una burbuja pequeña fija abajo a la izquierda;
- la burbuja no es arrastrable en MVP;
- tocarla restaura exactamente el estado expandido.

La transición minimizar/restaurar conserva:

- thread activo;
- historial;
- borrador;
- mensajes y generación;
- artifact activo;
- zoom, pan y scroll;
- filtros/orden;
- módulo, cultivo, sector y campaña.

Minimizar no cancela ni pausa silenciosamente una generación. La burbuja puede indicar actividad, respuesta nueva o error sin mostrar contenido sensible.

Requisitos de la burbuja:

- esquina inferior izquierda dentro de safe areas;
- 44–48 dp visuales;
- hit target mínimo 48 × 48 dp;
- no tapa navegación ni controles críticos;
- accesible mediante TalkBack, teclado y reduced motion.

### Panel de chat expandido

- historial buscable/interactivo arriba;
- conversación activa abajo;
- default interno 30/70;
- historial ajustable entre 25% y 45%;
- búsqueda por título, contenido, fecha, sector/campaña, módulo e idioma;
- crear, renombrar, fijar, archivar y eliminar con confirmación;
- cambiar hilo restaura borrador, conversación y artifact;
- botón minimizar visible en el encabezado.

### Visor

Soporta imágenes, tablas, gráficos, recetas, resultados, documentos y citas.

Interacciones:

- pinch-to-zoom;
- pan;
- double-tap;
- reset/fit;
- tablas con scroll en ambos ejes y headers sticky;
- detalle de celda;
- preservación de zoom, scroll, filtros y artifact;
- uso de toda el área útil cuando el chat está minimizado.

## Fertilizer Calculator

### Inputs

- fase;
- sistema tierra/coco/hidro;
- volumen;
- objetivos por nutriente/ion;
- EC objetivo;
- agua base;
- productos/lotes;
- pureza/composición;
- tolerancias/restricciones.

### Outputs

- gramos y g/L por producto;
- aportes por nutriente/ion;
- objetivo vs logrado;
- desviaciones;
- EC estimada etiquetada;
- costo/stock/lote;
- alertas y orden de mezcla;
- guardar/exportar;
- artifacts para el visor.

## Datos

- productos/composición/pureza/lotes/stock/precios;
- sectores/campañas/targets;
- formulaciones/resultados;
- lecturas EC/pH/riego/drenaje;
- costos/alertas;
- chats/messages/citations/artifacts;
- estado de presentación del chat y preferencias de layout;
- idioma/unidades/preferences;
- manifests de knowledge/model/release.

## Toolboxes

- VPD;
- CFM;
- Harvest Timer;
- pH Tracker;
- Feeding Calculator reutilizando solver;
- Soil Mix;
- Yield Estimator;
- Green Light.

Cada toolbox produce resultado estructurado y artifact visual cuando corresponde.

## Dr. Cannabis IA

Capacidades:

- conversación natural;
- contexto actual;
- RAG exacto + semántico;
- citations;
- tools deterministas;
- historial/search local;
- streaming/cancelación;
- streaming coherente con chat minimizado;
- ES/EN/PT-BR;
- artifacts al visor.

Orden de fuentes:

1. contexto actual;
2. datos canónicos locales;
3. prompt maestro;
4. knowledge local;
5. fallback genérico explícito.

Reglas:

- no inventar datos o resultados de tools;
- cálculos mediante dominio;
- read-only por defecto y mutaciones confirmadas;
- sin modificación autónoma de BD;
- límites técnico/educativos;
- privacidad local por defecto.

## Experiencia Android IA

```text
instalar → abrir → preparar assets automáticamente si aplica → chatear
```

El usuario no elige modelo, runtime, cuantización, archivo o API key.

Si existe incompatibilidad, falta de espacio o actualización pendiente, la app muestra un estado simple y accionable. Los demás módulos siguen disponibles cuando sea seguro.

## Distribución

### Windows

NSIS reproducible, install/upgrade/uninstall/offline, manifest/hashes/SBOM/licencias y plan de firma.

### Android

AAB firmado, Google Play internal/closed/staged rollout, model assets versionados, requisitos desde benchmark, privacidad/licencias y rollback.

## Fuera de alcance actual

- iOS dentro de B0–B12;
- nube obligatoria;
- sincronización cloud obligatoria;
- control industrial autónomo;
- soporte universal para dispositivos sin benchmark;
- IA general equivalente a un servicio cloud de propósito general;
- chat móvil full-screen;
- burbuja arrastrable o ventana flotante del sistema Android en MVP.

## Definición de terminado

- solver/datos/migraciones PASS;
- módulos completos;
- equivalencia Windows/Android;
- bot RAG/tools/citas/offline trilingüe;
- chat expandido 50/50 PASS;
- chat minimizado como burbuja inferior izquierda y restauración exacta PASS;
- generación minimizada, safe areas y accesibilidad PASS;
- historial/visor PASS;
- providers/modelos aprobados por benchmark;
- instalación/update/rollback PASS;
- seguridad/privacidad/licencias;
- documentación/release notes;
- aceptación humana final.
