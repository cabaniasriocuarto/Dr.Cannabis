# Plan ejecutable — contribuciones de fotos y aprendizaje

Parent único: #68, bajo master #14. Fecha:2026-09-19. Esta ampliación se incorpora normativamente cuando su Draft PR se revise y mergee por autorización humana. No es una implementación ni un roadmap paralelo a B0–B12.

## Estado observado

main=667045ccd467b1efc8e7d12f5a15f5816a813c70. B1=#2 sigue IN_PROGRESS. PR#67 de GOV-03 observada OPEN/DRAFT en df6a12fa9df63c1206c1b13caa7bcd726d4972e3; no se altera ni se presume mergeada. Este plan parte de main y añade solo4 documentos. Conservar ambas ampliaciones al sincronizar START_HERE, nunca sobrescribir una para introducir otra.

El usuario informó envío de consulta IP102; no informó permiso concedido. No se consultó correo privado en este bloque. No se descargaron fotos ni se instaló/entrenó un modelo.

## Decisiones de diseño propuestas

D-DATA-01: autorización de contribución destacada en alta, recordada y modificable; no pedir por cada foto, no permiso implícito por usar la app.
D-DATA-02: administrador puede no recibir, seleccionar o detener fotos aun cuando exista permiso.
D-DATA-03: storage privado local != servidor colaborativo; no dependencias cloud para uso local.
D-DATA-04: collection/labeling/training/publication son controles independientes; todos inicialmenteOFF para el nuevo subsistema.
D-DATA-05: pausa manual no borra ni implica backfill; cuotas/reservas y servidor hacen cumplir límite.
D-DATA-06: autoetiqueta no es verdad; revisar y evaluar antes de entrenar/promover.
D-DATA-07: privacidad/licencia/retirada por muestra y derivados; dataset público opcional.

La modalidad jurídica final no se declara aprobada: owner #69.

## WBS y responsables funcionales

| Issue | Salida única | Depende de | Disciplina/gate |
| --- | --- | --- | --- |
| #69 DATA-01 | Base legal, textos/licencia/matriz de finalidades | Responsable/mercados confirmados | Jurídica/privacidad; aprobación profesional |
| #70 DATA-02 | Consentimiento UI + recibo/versiones | #69 final; contratos #17/#21/#61 | UX, frontend, backend |
| #71 DATA-03 | Admin/policy/kill switch | Contratos #70/#72 | Backend, seguridad, operaciones |
| #72 DATA-04 | Ingesta/storage/cuotas/limpieza | Contratos #70/#71 | Backend, datos, operaciones |
| #73 DATA-05 | Autoetiquetado/revisión por lotes | #60; #72 o fuentes propias autorizadas | Visión, anotación, agronomía |
| #74 DATA-06 | Retirada/borrado/lineage | #69/#70/#72 | Privacidad, datos, QA |
| #75 DATA-07 | Run de entrenamiento y promoción | #60/#73/#74; evaluación #27/#65 | ML, QA independiente |
| #76 DATA-08 | Dataset público opcional | #69/#70/#72/#74 | Jurídica, privacidad; humano |
| #77 DATA-09 | Gate integral del subsistema | #69/#70/#71/#72/#74 mínimo | Seguridad/QA/dispositivo; humano |

#71/#72 comparten contratos: definir interfaces primero y probar adapters con fakes identificados; no esperar circularmente ambas implementaciones. #77 puede desarrollar pruebas antes y solo acepta activación cuando dependencias reales pasan. #73/#75 pueden experimentar con datos propios autorizados sin abrir recepción pública.

No todos los expertos son personas conectadas: los roles indican revisión requerida. Quien escribe no puede certificar auditoría formal propia. No contratar revisores ni activar infraestructura sin permiso/presupuesto.

## Trazabilidad adicional

| ID | Requisito | Owner | Evidencia mínima |
| --- | --- | --- | --- |
| DL-01 | Finalidades/T&C/consentimiento diferenciados | #69/#70 | Aceptar T&C solo no da permiso |
| DL-02 | Recibo vigente y revocación | #70/#74 | Replay/offline/cambio versión/retiro |
| DL-03 | Recepción server-side pausable | #71/#72 | Pausa+finalize simultáneo/cliente viejo |
| DL-04 | Capacidad/costo/backlog acotados | #71/#72 | Reservas concurrentes/low disk/TTL |
| DL-05 | Datos privados, saneamiento y lineage | #72/#73/#74 | Sin leaks/borrado/restore/ACL |
| DL-06 | Etiquetas verificables y muestreo | #60/#73/#75 | Auto separado de gold; no fuga de split |
| DL-07 | Derechos respetados en derivados/modelos | #74/#75 | Invalidación antes de run/release |
| DL-08 | Run/versiones/eval/promoción | #75/#27/#65 | Exact dataset/artifact + gate independiente |
| DL-09 | Publicación y licencias separadas | #69/#76 | Permiso público ausente bloquea release |
| DL-10 | No romper modo local ni UX | #70/#71/#72/#77 | OFF/no red conserva consulta/visor |

R-/H-/V-/W- existentes conservan sus owners; DL- no los sustituye. Corpus #60 y eval#65 no se duplican. Hitos: contratos/revisión enlazados M0#46; circuito y datos M3#49; privacidad de lanzamiento M4#50; gate real M5#51. Estos son trackers ya existentes, no nuevas Milestones nativas ni relaciones Sub-Issue nativas creadas en este bloque.

## Orden práctico

1. Aprobar el contrato documental y resolver #69 antes de recolectar usuarios reales.
2. Definir schemas y construir #70/#71/#72 con datos de prueba, featureOFF.
3. Implementar #74 y ejecutar gate de recepción #77 antes del piloto.
4. Piloto de volumen/cupo previamente aprobados; validar estadoOFF, retiro y lowdisk de verdad.
5. #73 revisión por lotes; #75 entrenamiento solo al tener datos y presupuesto válidos, usando #27/#65.
6. #76 únicamente cuando exista decisión explícita de compartir dataset/licencia. No bloquea modo privado.

## Task Contract para Codex

```text
CHILD_ISSUE=<una sola>
WORKSPACE=<verificado; no asumir recuperación como canónico>
BASE_SHA=<observado y aprobado>
EDITABLE_PATHS=<exactos al preflight>
READ_ONLY=solver; fuentes; datos privados; otros proyectos
OBJECTIVE=<salida única de la Issue>
FIXTURES=synthetic_or_explicitly_licensed
TESTS=<negativos+positivos+race+regresión aplicables>
EXTERNAL_ACTIONS=none_unless_explicitly_authorized
COLLECTION_REAL=OFF
MAX_EXTERNAL_COST=0_unless_approved
STOP=scope_drift|missing_consent|missing_license|unknown_budget
REVIEW=independent_exact_head
MERGE=human
```

No ejecutar scripts/cargar modelos solo porque figuren en documentos. Scope guard #58 cuando esté implementado, recheck staged/working/exacthead; mientras tanto declarar control manual. Salida: pruebas reales ejecutadas, NOT_RUN y razón, diff/commit/PR, runtime/legal gates pendientes. CI documental no prueba recepción, capacitación de etiquetas ni cumplimiento legal.

## Owners

[Contrato](../architecture/CONTRIBUTION_LEARNING_LOOP.md) · [Revisión legal](../legal/PHOTO_CONSENT_REVIEW.md) · [Entrada del repo](../START_HERE.md).
