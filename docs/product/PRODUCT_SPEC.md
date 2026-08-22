# PRODUCT SPEC — Dr. Cannabis · Fertilizer-IA

## Visión
Aplicación profesional, local-first y offline para formular soluciones de fertirriego de cannabis con PPM/EC/pH, administrar datos del cultivo y ofrecer asistencia agronómica contextual.

## Usuario objetivo
- cultivador doméstico avanzado;
- operador de indoor/invernadero pequeño o mediano;
- usuario que quiere formular con sales individuales y mantener trazabilidad de recetas, lecturas y costos.

## Flujo principal
1. Crear/seleccionar sector y campaña/cultivo.
2. Elegir fase fenológica y sistema de cultivo.
3. Cargar/usar objetivos PPM y EC desde dataset canónico.
4. Seleccionar sales/productos disponibles y lotes/purezas.
5. Definir volumen de tanque.
6. Ejecutar solver.
7. Revisar gramos, PPM logrados, desviaciones, EC estimada, costo y advertencias.
8. Medir EC/pH reales y registrar riego/drenaje.
9. Guardar formulación e historial.
10. Consultar al bot con el contexto actual.

## Navegación desktop
### Izquierda
- Dr. Cannabis – Fertilizer-IA.
- Fertilizer Calculator.
- CFM Calculator.
- Harvest Timer.
- Costos / Historial.
- VPD Calculator.
- pH Tracker.
- Feeding Calculator.
- Soil Mix Calculator.
- Yield Estimator.
- Green Light.
- Configuración / Inventario.

### Centro
Área dinámica del módulo activo.

### Derecha
Chatbot Dr. Cannabis persistente, con acceso al contexto del módulo/cultivo activo.

## Fertilizer Calculator — requisitos mínimos
Inputs:
- fase fenológica;
- sistema: tierra/coco/hidro;
- volumen L;
- objetivos por nutriente/ion;
- EC objetivo;
- agua base cuando corresponda;
- sales/lotes habilitados;
- pureza/composición;
- tolerancias.

Outputs:
- gramos por sal y g/L;
- aporte por nutriente/ion de cada sal;
- PPM objetivo vs logrado;
- desviación absoluta y porcentual;
- EC estimada con etiqueta de modelo;
- costo de la solución;
- alertas de incompatibilidad/antagonismo relevantes;
- orden de mezcla/tanques A/B cuando aplique;
- opción guardar/exportar.

## Datos e historial
- sales/productos;
- composición y pureza;
- lotes/stock/costo;
- sectores;
- campañas;
- objetivos por fase;
- formulaciones;
- formulaciones por sal;
- resultados por ion;
- lecturas de riego/drenaje;
- pH/EC;
- costos;
- alertas;
- configuraciones de idioma/unidades.

## Toolboxes
### VPD
Entrada: T aire, T hoja, HR, etapa. Salida: kPa, rango/estado y acción sugerida.

### CFM
Entrada: dimensiones, unidades, recambio, filtro, luces/ductos/carga térmica. Salida: CFM y m³/h recomendados con factores desglosados.

### Harvest Timer
Fechas de inicio/cambio a 12/12 + duración estimada; timer orientativo, nunca sustituye observación de madurez.

### pH Tracker
Histórico de entrada/drenaje, tendencias y alertas.

### Feeding Calculator
Vista simplificada del plan de alimentación, reutilizando el mismo motor/datos del solver.

### Soil Mix
Proporciones y cantidades de componentes según volumen final.

### Yield Estimator
Estimación orientativa separada de cualquier promesa de rendimiento.

### Green Light
Ayuda contextual/recordatorio; no requiere un motor complejo en MVP salvo integración hardware futura.

## Bot
- contexto: cultivo activo, fase, sistema, objetivos, receta, lecturas, historial relevante y toolbox activo;
- conocimiento local versionado;
- respuestas ES/EN/PT-BR;
- breve primero;
- datos de app > rangos genéricos;
- debe reconocer datos faltantes y pedir solo lo necesario.

## Distribución
- Windows como primera plataforma de release;
- instalador NSIS;
- usuario final no instala Node, npm ni VS Code;
- datos locales en directorio de usuario;
- backup/export explícito;
- futura extensión macOS/Linux/PWA posible, sin bloquear MVP Windows.

## Fuera de alcance inicial
- asesoría médica o de consumo;
- marketplace/venta de cannabis;
- control industrial automático de bombas/dosificadores;
- dependencia obligatoria de internet;
- sincronización cloud obligatoria.
