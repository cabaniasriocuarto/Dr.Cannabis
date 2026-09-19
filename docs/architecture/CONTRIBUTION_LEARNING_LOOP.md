# Contribution Learning Loop — contrato técnico

Owner: DATA-LOOP #68; children #69–#77. Fecha: 2026-09-19.
Estado: PROPOSED_CONTRACT_PENDING_REVIEW_AND_HUMAN_MERGE. No hay recepción, servidor, entrenamiento ni despliegue implementados por este documento.

## 1. Propósito y límites

Permitir una autorización inicial clara para contribuir futuras fotos utilizadas con el bot, sin preguntar por cada imagen, y dar al administrador control real de recibir o no nuevas copias. Aprendizaje por lotes revisados, no autoentrenamiento en cada consulta.

La inferencia y el historial privado siguen locales. La contribución es una transferencia remota opcional diferenciada; no contradice offline-first porque su falla/desactivación no bloquea al bot. No exigir PC, Wi-Fi local ni cuenta remota para el análisis Android. Contribuir requiere conexión normal al servidor autorizado; no publicitar entonces que ninguna imagen abandona jamás el dispositivo.

No reemplazar corpus VIS-01 #60, captura #61, evaluación #27/#65 ni distribución #26/#40. No duplicar calculadoras ni cambiar fórmulas. Preservar UI móvil 50/50 expandida, historial arriba y burbuja inferior izquierda minimizada. El cliente no instala CVAT ni entrena modelos.

## 2. Tres decisiones distintas

| Decisión | Autoridad | No equivale a |
| --- | --- | --- |
| Analizar/guardar para el usuario | Acción del usuario y configuración local | Donar fotos o toda su galería |
| Permitir copia para mejorar modelos | Usuario; base jurídica/licencia revisadas #69/#70 | Obligar a guardar todas o permitir publicidad |
| Recibir copias en una campaña | Administrador y política server-side #71/#72 | Revocar derechos, entrenar o publicar |

Aceptar T&C, conceder cámara o enviar una consulta no se convierte en `trainingAllowed=true`. La modalidad legal final debe aprobarse en #69. Diseño recomendado: elección específica en onboarding, off inicialmente y revocable, sin preguntas repetitivas. Una autorización puede cubrir futuras fotos elegibles según finalidad y versión informadas; no autoriza backfill histórico ni escanear álbumes.

## 3. Invariante de autorización

```text
canAdmitContribution =
  legalAndReleaseGatesApproved
  AND validSubjectCredential
  AND currentConsentForModelImprovement
  AND validImageRightsLicense
  AND eligibleMediaScope
  AND collectionEffectiveStateIsON
  AND freshPolicyEpoch
  AND quotaReservationGranted
  AND mediaValidationPassed
```

Todo desconocido/faltante => no contribución. El análisis local sigue disponible. `canTrain` revalida derechos/retención/etiquetas/run approval; no exige que collection siga ON. `canPublishDataset` exige permiso/licencia pública específicos y aprobación humana aparte.

| Permiso de mejora | Recepción | Capacidad | Resultado |
| --- | --- | --- | --- |
| No/ausente/retirado | Cualquiera | Cualquiera | No enviar/incorporar aporte |
| Sí | OFF o pausa | Cualquiera | Solo uso privado; sin aporte |
| Sí | ON | Sin reserva | Solo uso privado; sin aporte |
| Sí | ON | Reserva válida | Aporte candidato, sujeto a seguridad y finalización |

No confundir permiso con obligación: podemos descartar copias por duplicación, calidad, cupos o falta de interés según política informada. Recibir una copia no garantiza incorporarla al dataset ni una recompensa.

## 4. UX del usuario y recibo de autorización

El texto del aviso explica antes de transferir: quién recibe, qué fotos/metadatos se envían, para qué modelos/investigación/evaluación, uso comercial previsto, destinatarios/revisión, retención y cómo retirar el permiso. Aviso destacado dentro de la app, no solo enlace a términos. Borrador ilustrativo y fuentes jurídicas en PHOTO_CONSENT_REVIEW; no usarlo como texto final aprobado.

Opciones: aceptar términos de uso; autorizar contribuciones para mejora; publicación pública queda desactivada hasta #76. Rechazar contribución no bloquea el análisis local. Cambiar una finalidad/destinatario material o alcance requiere evaluar reconsentimiento; actualizar versión de app no concede permiso nuevo.

Recibo propuesto: `consentId`, `subjectKey`, `purpose`, `status`, `textVersion`, `textHash`, `licenseVersion`, `appVersion`, `grantedAt`, `withdrawnAt`, `effectiveMediaScope`. Guardar evidencia mínima protegida, no nuevos identificadores invasivos. Recibo local no suplanta validación del servidor.

Estados: NOT_ASKED, GRANTED, DENIED, WITHDRAWN, RECONSENT_REQUIRED. El alcance piloto son fotos nuevas que el usuario seleccionó/usó con el bot durante la autorización vigente, no chats completos ni todo el filesystem. La selección de photos usa acceso mínimo del sistema. Vídeos, audio y metadatos adicionales exigen scope declarado antes de habilitarlos.

Retiro offline: ese cliente detiene contribución inmediatamente; la revocación llega al servidor al sincronizarse. No afirmar que otros dispositivos fueron notificados sin conectividad. El recibo y la UI informan estado local/sincronizado. Replays no pueden resucitar un permiso retirado.

## 5. Panel administrador

Control principal: `Recibir fotos para mejorar la IA`.

Estados efectivos: OFF (default), ON, PAUSED_MANUAL, PAUSED_CAPACITY, PAUSED_BACKLOG, PAUSED_BUDGET, CLOSED. Separar requestedState del estado efectivo y registrar todas las razones. Un permiso ausente o cuota excedida no desaparece porque requestedState sea ON.

Mostrar: estado efectivo/revisión, motivo, bytes usados/reservados/límite, aportes del día/cupo, cola de revisión, expiraciones, último cambio y autor. Motivos manuales pueden ser falta de tiempo, dataset suficiente o cualquier decisión operativa. No requieren justificación al usuario más allá de que no se reciben aportes.

Acciones diferenciadas:

- Collection: habilitar/pausar nuevas admisiones.
- Auto-labeling: habilitar/pausar trabajos de etiquetado elegibles.
- Training: habilitar cola; cada run además requiere dataset y presupuesto aprobados.
- Public dataset release: desactivada por defecto; gate #76.
- Purga de material ya admitido: acción separada con política de retención, vista previa y confirmación proporcional.

Cerrar recepción NO borra fotos locales, recibos ni dataset válido. Liberar disco NO reanuda una pausa manual. Default de auto-resume=NO; una política futura deberá ser explícita. CLOSED abre una nueva campaña/epoch solo por acción admin. La interfaz confirma éxito únicamente tras readback de la revisión guardada.

Admin autenticado, RBAC y sesión reforzada; CSRF donde corresponda, logs de actor/before/after/reason sin contenido privado. El LLM no puede activar controles ni autoconceder permisos. Nunca embeber claves admin/storage en React.

## 6. Concurrencia, pausas y cargas en curso

Protocolo propuesto #71/#72:

1. Cliente verifica elegibilidad y sanea copia local, conservando original.
2. Solicita sesión con media metadata mínima y credencial/recibo.
3. Servidor valida política vigente, permiso, licencia y reserva atómica de bytes/cuota.
4. Sesión limitada por mediaId/hash, bytes, MIME, sujeto, policyEpoch y TTL.
5. Bytes a staging privado, no al dataset publicado/canónico.
6. Finalización revalida permiso, epoch, reserva, validación de contenido y riesgo de privacidad.
7. Solo entonces admite CANDIDATE y contabiliza cuota definitiva.

Pausa: no nuevas sesiones desde el cambio confirmado; invalidar finalizaciones anteriores y cancelar uploads gestionados. Con URLs firmadas directas, el mero botón puede no revocar una URL emitida: habrá bytes en vuelo hasta cancelación/expiración. Diseñar TTL corto, reserva/cupo de staging, purga de sesiones inválidas y ningún auto-label o snapshot de esos objetos. Ver documentación de presigned URL al seleccionar provider [S3]. No prometer cero bytes instantáneos.

Crash/retry no duplica un aporte ni su reserva. Reserva expira y se reconcilia con multipart/orphan. Transacción de admisión y outbox impiden job sin media elegible. Las expiraciones/revision son comprobadas por servidor, no por un reloj manipulable del cliente.

Cola offline: solo optada/informada, acotada por cantidad/bytes/TTL y asociada a sesión elegible; no copiar para futura contribución durante OFF/PAUSED. Si no hay política vigente, fallar cerrado para la donación. Reactivar no importa fotos históricas ni cola vieja. Un aporte individual posterior requerirá acción/permisos explícitos y nunca un barrido de la galería.

## 7. Cuotas, retención y costo

Presupuestos obligatorios previos al piloto: máximo global/campaña/usuario/día, bytes por archivo y derivados, tamaño/duración de cola, staging/multipart, backups, safety reserve, backlog máximo y costo por job/run.

`used + reserved + overheadBudget + incoming <= hardQuota` debe cumplirse antes de conceder capacidad. Medir volumen/disco real además del catálogo; drift o estado incierto => pausa. Limitar dimensiones/píxeles/codec y tiempo de decode además del tamaño de archivo.

Umbrales se proponen, no están configurados: por ejemplo pausa al80% del presupuesto, hard stop al90% y margen para terminar/borrar staging. Elegir porcentajes y capacidad según hardware real. La reserva atómica es el límite efectivo, no un gauge de UI. Histéresis evita alternancias; no anula pausa manual.

La retención define por separado privados locales, staging, rechazados, candidatos, aprobados, auditoría y backups. Solo material de staging/rechazado/orphan/TTL de la app se purga automáticamente bajo política. No liberar disco borrando originales privados ni casos aprobados sin política/acción propia. Limpiar datos obsoletos y atender supresión no depende de que el admin tenga ganas de etiquetar.

No usar números de costos de chats anteriores como presupuesto aprobado. Provider, región y límites se eligen en ADR. Sin nuevas APIs pagas, suscripciones, créditos, auto-top-up o deploy por crear estas Issues.

## 8. Modelo de datos mínimo

| Entidad | Campos clave |
| --- | --- |
| ConsentReceipt | subjectKey/purpose/status/version/hash/timestamps/mediaScope |
| ContributionPolicy | campaignId/epoch/requested/effective/reasons/caps/retentionVersions |
| UploadSession | mediaId/subjectKey/epoch/receipt/reservedBytes/expiresAt/status/idempotencyKey |
| MediaContribution | hash/MIME/bytes/dimensions/sanitization/privacyReview/rightsRef/caseGroup |
| Annotation | mediaId/taxonomyVersion/class/region/source/modelDigest/reviewer/reviewStatus |
| Eligibility/Tombstone | mediaId/subject/purpose/status/reason/effectiveAt |
| DatasetSnapshot | member digests/labels/licenses/consents/splits/version/eligibleStatus |
| TrainingRun | snapshot/config/seed/runtime/computeBudget/metrics/checkpoint/status |
| ModelRelease | run/artifactHash/evalRef/approval/signature/LKG |
| RightsRequest | subject/mediaRefs/scope/state/deadline/results/providerReceipts |

Esquemas son propuesta, no migraciones. Datos privados de cuenta/recibos separados de las muestras entregadas a etiquetadores. Un identificador reversible o una tabla de enlace implica seudonimización, no anonimato completo. No almacenar rutas/URLs arbitrarias que el modelo pueda resolver.

Estados de media: RESERVED → UPLOADING → QUARANTINED → SANITIZED → CANDIDATE → REVIEWED → DATASET_ELIGIBLE; salidas REJECTED/EXPIRED/DELETE_PENDING/DELETED. Estado de etiqueta y elegibilidad legal son dimensiones independientes.

## 9. Saneamiento y seguridad

Quitar GPS/EXIF/nombres innecesarios en copia; validar en servidor. Identificación también puede estar en rostros, documentos, matrículas, pantallas o fondo: excluir o redactar y verificar. Quitar metadata no prueba anonimización. Datos de salud humana, menores o terceros identificables quedan fuera del piloto sin gate específico.

Autenticación y autorización por objeto, cifrado y storage privado, no listing público. Verificar MIME/signature, límites, decodificación segura, no SSRF/path traversal, rate limits, replay, payload malformado. Bloquear fotos no pertinentes/maliciosas antes de workers. Texto dentro de imagen/metadatos es datos, no instrucciones de un agente.

Hashes exactos/perceptuales ayudan a dedupe; no revelar a un usuario que otro tiene la misma foto. Mantener licencia/permiso por contribución incluso si bytes se deduplican; no convertir una licencia en otra. Evitar fingerprints persistentes innecesarios.

## 10. Autoetiquetado y revisión humana

#73 integra software existente sobre #60; CVAT es candidato [CVAT], con versión/edición/features y licencia a verificar. No asumir que todas sus funciones de QA están disponibles gratis en toda edición.

Etiquetas automáticas se guardan como candidatas con modelo/digest/config/region transform. Revisión humana no se reemplaza por un score alto o acuerdo de modelos parecidos. Una persona aficionada puede validar signos visibles; diagnóstico experto/laboratorio exige su evidencia correspondiente.

Seleccionar discrepancias, rarezas, blur y condiciones nuevas para active learning; sumar muestra aleatoria/estratificada de casos fáciles para controlar sesgos. Revisar100 ejemplos no certifica20.000; definir error admisible/diseño de muestra y aumentar revisión cuando falle. Autoetiquetas sin revisión pueden usarse en un experimento explícito de pseudoetiquetado con evaluación separada, nunca como gold test.

Acesso de revisores por lotes/lease y finalidad; no cuenta universal a bucket. Outsourcing exige contrato, país, licencias y presupuesto revisados. Retirada invalida jobs pendientes y resultados tardíos.

## 11. Entrenar y publicar modelos

#75 construye snapshot elegible, entrenamiento acotado y evaluación #27/#65. Revalidar derechos al crear snapshot y antes de ejecutar/promover. IP102: Walter informó envío de consulta, no permiso recibido; no incorporarlo comercialmente hasta resolución escrita y alcance verificado.

Separar train/dev/test por usuario/planta/caso/sesión/origen; variantes de la misma foto/frame no cruzan. El examen de referencia se revisa independientemente y no se ajusta para que apruebe el modelo. Repetir tuning contra un test va contaminándolo: conservar holdout o renovar protocolo.

Cada run registra versiones de datos/código/modelo/runtime, configuración, seed, presupuesto, tiempos, métricas y artefactos. El resultado real puede no ser bit-exacto por hardware; declararlo. Mayor número de fotos no habilita auto-promoción. Evaluación por clase y de incertidumbre/recursos/privacy, aprobación humana y rollback del último modelo válido.

Collection OFF permite procesar anteriores aún elegibles si labeling/training están autorizados; no es revocación de usuarios. Training OFF no detiene la inferencia instalada.

## 12. Retirada y borrado

#74 debe estar listo antes de recibir usuarios reales. Al retiro: bloquear usos futuros aplicables y recorrer media/derivados/etiquetas/índices/copias externas/snapshots, con registros mínimos y plazos según #69. No usar una obligación de guardar evidencia para continuar entrenando con la foto.

Elaborar tratamiento de backup: borrar de activo, marcar tombstone, impedir restauración operativa y cumplir plazo de expiración aprobado; no prometer purga física instantánea de toda copia. Restauraciones aplican tombstones antes de reactivar jobs. Si un snapshot pierde elegibilidad, impedir nuevos runs; un run activo afectado se detiene en checkpoint seguro y su artefacto no se publica por defecto.

Borrar imagen no borra automáticamente su influencia en pesos distribuidos. Revisar riesgo de memorización y obligaciones sobre modelos ya entrenados, con remediación proporcional y respuesta transparente. La no-retroactividad del consentimiento no constituye una autorización automática para cualquier uso futuro.

## 13. Dataset público

#76 opcional/desactivado. Requiere finalidad/licencia específicas, privacidad de píxeles y contexto verificada, derechos por muestra/etiqueta y aprobación del release. Permiso interno de entrenar o pesos derivados no concede permiso de publicar imágenes. Revisar derechos de terceros/datasets externos por separado. Las licencias públicas como CC tienen restricciones de revocación; no prometer retirar todas las copias ajenas [CC].

## 14. Harness y habilitación

Una child Issue = objetivo/branch/contrato/PR. Paths exactos al preflight; tests sintéticos y datos privados fuera de Git. Writer SELF_VALIDATED_ONLY; auditor independiente exact-head/artefacto. Guard #58 solo cuando exista y se haya probado; mientras tanto revisión manual declarada. No declarar PASS legal por un test ni PASS técnico por un texto jurídico.

Gate #77 integra permisos, pausa, capacidad, race, seguridad, borrado, offline y clientes antiguos. Activación real requiere legal reviewer, administrador, destino/región, retención y presupuesto identificados; defaults OFF. Un merge documental no activa servidores, recoge datos ni entrena.

## 15. Referencias

[CVAT]: https://docs.cvat.ai/docs/manual/advanced/automatic-annotation/
[CC]: https://creativecommons.org/faq/#what-if-i-change-my-mind-about-using-a-cc-license
[S3]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html

[Revisión jurídica](../legal/PHOTO_CONSENT_REVIEW.md) · [WBS y trazabilidad](../truth/CONTRIBUTION_WORK_PLAN.md).
