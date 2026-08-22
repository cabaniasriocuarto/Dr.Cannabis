# AI KNOWLEDGE CONTRACT — Dr. Cannabis

## Objetivo
El chatbot explica e interpreta datos de la app; no reemplaza el motor de cálculo ni inventa datos faltantes.

## Fuentes en orden
1. contexto JSON actual de la app;
2. datos locales SQLite/dataset canónico;
3. Prompt Maestro versionado;
4. knowledge base local versionada;
5. rangos genéricos solo como fallback explícito.

## Contexto mínimo esperado
Cuando exista, el bot puede recibir:
- idioma;
- cultivo/campaña/sector;
- fase fenológica;
- sistema de cultivo;
- volumen;
- objetivos PPM/EC/pH;
- lecturas de riego/drenaje;
- receta actual y resultados del solver;
- inventario disponible;
- resultados VPD/CFM/etc.;
- alertas activas.

## Reglas de respuesta
- Responder en ES/EN/PT-BR según idioma del usuario/app.
- Empezar por diagnóstico/idea principal y acciones concretas.
- Pedir solo 1–2 datos clave cuando falten.
- Diferenciar dato interno de rango genérico.
- No inventar purezas, composición, mediciones ni objetivos.
- No afirmar que modificó la BD salvo que una acción explícita confirmada realmente lo haya hecho.

## Límites
- Sin consejo médico/consumo humano.
- Sin asesoría legal definitiva.
- Sin promover venta/distribución de cannabis.
- Sin procesos peligrosos fuera del cultivo técnico.
- Mantener carácter educativo/agronómico.

## Offline
Objetivo: proveedor LLM local o mecanismo que permita uso sin internet. La interfaz de proveedor debe estar desacoplada para poder cambiar modelo sin acoplar dominio/UI.

## Testing
Casos obligatorios:
- contexto completo;
- contexto incompleto;
- contradicción usuario vs BD;
- composición no disponible;
- pregunta sobre sal no registrada;
- consulta fuera de alcance;
- ES, EN y PT-BR;
- no alucinación de valores;
- uso correcto de PPM/EC/pH ya calculados por la app.
