# NUTRIENT CALCULATION CONTRACT

## Propósito
Evitar que UI, IA o migraciones cambien silenciosamente el significado de PPM, composición o dosis.

## Unidades internas
- concentración elemental/especie: mg/L (= ppm en este contexto);
- masa: g;
- volumen: L;
- EC: mS/cm;
- composición: fracción másica o porcentaje con `basis` explícita.

## Fórmula base
Para un nutriente/ion con fracción másica `f` en una sal y volumen `V`:

`ppm_aportados = gramos_sal * f * 1000 / V`

Para una fuente que aportara exclusivamente el nutriente objetivo:

`gramos_sal = ppm_objetivo * V / (1000 * f)`

En el solver real, una sal puede aportar múltiples nutrientes simultáneamente; por lo tanto el problema se resuelve como un sistema/matriz con restricciones y no repitiendo la fórmula aislada por cada nutriente.

## Pureza
La composición efectiva debe incorporar la pureza/lote según un contrato único. No aplicar dos veces el factor de pureza.

## Formas químicas
El modelo debe distinguir, como mínimo:
- N total;
- N-NO3;
- N-NH4;
- P vs P2O5;
- K vs K2O;
- Ca vs CaO;
- Mg vs MgO;
- S y especies/declaraciones equivalentes cuando existan.

Las conversiones deben vivir en una librería de dominio probada, no repartidas en componentes UI.

## Objetivos
Los objetivos canónicos se almacenan con:
- fase;
- sistema de cultivo cuando corresponda;
- nutriente/ion;
- valor;
- unidad;
- tolerancia;
- provenance/version.

## Sales/productos
Cada producto debe declarar:
- nombre;
- fórmula opcional;
- composición;
- basis de cada composición;
- pureza/lote;
- aportes secundarios;
- restricciones/compatibilidades;
- costo y stock si se usa optimización económica.

## Solver
Debe soportar:
- mínimos/máximos por nutriente;
- tolerancias;
- sales habilitadas/deshabilitadas;
- límites de dosis cuando existan;
- preferencia/costo como criterio secundario futuro;
- resultado no resoluble explícito.

Debe devolver:
- gramos por sal;
- g/L;
- aportes por sal;
- PPM logrados;
- error por objetivo;
- restricciones activas;
- advertencias;
- provenance de datos usados.

## EC
PPM/TDS y EC no son equivalentes exactos de composición elemental. El producto puede:
- mostrar escalas TDS 500/640/700 como conversión de presentación;
- estimar EC con un modelo documentado;
- registrar EC medida como dato real.

Nunca presentar `suma de ppm / factor` como EC física exacta sin etiqueta de estimación.

## Agua base
El contrato final debe decidir cómo incorpora:
- EC base;
- Ca/Mg u otros análisis de agua;
- alcalinidad cuando esté disponible;
- pH inicial.

Si no existe análisis químico, no inventar composición a partir de EC solamente.

## Compatibilidad
Modelar advertencias como datos/reglas, por ejemplo:
- calcio concentrado separado de fosfatos/sulfatos en soluciones madre;
- silicatos separados de calcio concentrado;
- límites de NH4 según estrategia;
- Cl/Na cuando sean indeseables.

## Validación
Ningún cambio del solver se acepta sin casos numéricos reproducibles y tests de regresión.
