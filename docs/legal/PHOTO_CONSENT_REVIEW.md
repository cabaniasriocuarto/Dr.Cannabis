# Fotos para entrenamiento — revisión jurídica preliminar

Fecha de investigación: 2026-09-19. Owner #69, parent #68.
LEGAL_APPROVAL=NOT_OBTAINED. Texto orientativo de arquitectura, no dictamen ni términos finales. Argentina es la jurisdicción inicial analizada; otros mercados y tiendas requieren revisión específica antes de lanzamiento.

## 1. Lo que sostienen las fuentes y lo que es propuesta

La Ley25.326 exige para datos personales consentimiento libre, expreso e informado; si se presta con otras declaraciones debe ser destacado. Los arts4/6 exigen finalidad e información previa; la excepción contractual no cubre automáticamente cualquier reutilización. El art2 define disociación por imposibilidad de asociación con una persona [AR1].

El Decreto1558/2001 art5 admite revocar consentimiento sin efecto retroactivo y exige integridad/autoría de declaraciones por medios alternativos [AR2]. Esto no resuelve por sí solo el destino jurídico de modelos ya entrenados.

Google Play exige aviso dentro de la app y acción afirmativa cuando el uso excede expectativas razonables; no basta esconderlo en términos. Su política de fotos trata imágenes de usuarios como datos personales/sensibles, incluso cuando no evaluamos una foto concreta como dato personal bajo ley argentina [GP1][GP2].

La fotografía puede además estar protegida por derecho de autor; autorización de datos y licencia de reproducción/adaptación tienen funciones distintas [AR3].

**Propuesta para este producto:** recoger una autorización destacada dentro del onboarding, separada por finalidad y recordada. No hace falta por diseño preguntar otra vez ante cada foto comprendida. No sostener que cualquier diseño de un botón único sea siempre ilícito, ni certificarlo por poner una frase en T&C. La implementación precisa queda sujeta a #69.

## 2. Diseño recomendado a revisar

- Aceptación de términos para usar la app.
- Elección opcional MODEL_IMPROVEMENT, inicialmente desactivada, con aviso explícito antes de activarla.
- PUBLIC_DATASET_RELEASE no solicitado ni habilitado hasta fijar licencia/destinatarios y revisar esa finalidad separada.

No deducir permiso del silencio, seguir navegando, permiso de cámara o envío de una consulta. Mantener opción privada; el modelo de negocio de usar contribución obligatoria como contraprestación no se aprueba implícitamente. No interpretar que una app famosa lo haga como prueba de legalidad.

Una autorización concreta podría cubrir todas las futuras fotos elegibles utilizadas con el bot durante su vigencia, sin clic por imagen; la selección o descarte operativo no amplía finalidad. El administrador puede pausar recopilación aunque exista autorización. No garantizar guardar, entrenar, remunerar o publicar cada foto.

## 3. Aviso ilustrativo, NO listo para producción

> Ayudar a mejorar Dr. Cannabis (opcional). Autorizo a [RESPONSABLE] a recibir una copia de las fotos nuevas de plantas que use con el bot y de [METADATOS ESPECIFICADOS], para etiquetarlas, entrenar y evaluar modelos utilizados en Dr. Cannabis, incluida su versión comercial. Conozco [DESTINATARIOS/PAÍSES], [RETENCIÓN], [CONDICIONES DE USO DE IMÁGENES] y [CANAL DE DERECHOS]. Puedo desactivar las contribuciones y solicitar la supresión que corresponda. No autoriza publicar mis fotos en un dataset público. Puedo seguir usando el análisis local sin contribuir.

Campos pendientes visibles invalidan despliegue del aviso. La licencia adjunta debe tratar fotos propias/autorizadas, uso no exclusivo, transformaciones y distribución de pesos, alcance temporal/territorial, derechos reservados y atribución. No afirmar que las fotos pasan a ser propiedad nuestra ni tomar una licencia de derechos ajenos.

## 4. Riesgos que debe resolver el reviewer

Identificar responsable real/domicilio/contacto, países de oferta, base de cada finalidad, registro AAIP aplicable, plazos y soporte de derechos. Reducir al mínimo información de identidad; excluir salud humana, menores o terceros identificables del piloto hasta análisis adicional. No confundir cultivar una planta con diagnóstico de salud de la persona.

Quitar GPS/EXIF/email no prueba que la persona sea inidentificable: el propio contenido o una tabla de enlace puede identificar. Llamar a eso saneamiento/seudonimización hasta demostrar anonimización adecuada. La licencia de imagen no elimina derechos de privacidad.

Hosting o revisión en otro país necesita análisis de transferencia y contratos; la AAIP documenta mecanismos según destino y nivel de protección [AR4]. No contratar proveedores ni compartir lotes por el mero permiso de entrenamiento.

No prometer derecho ilimitado y perpetuo para cualquier uso. Definir retención/borrado de copias activas, backups, anotaciones, snapshots y tratamiento de modelos afectados. Los límites técnicos no anulan obligaciones: requieren diseño, evaluación jurídica y comunicación honesta.

Publicar bajo CC requiere decidir conscientemente la licencia: CC advierte que no se puede retirar unilateralmente el permiso de copias que ya se distribuyeron bajo sus condiciones [CC]. Mantener dataset público desactivado hasta #76. Una licencia IP102 para train tampoco presume redistribución de imágenes; correo enviado no es autorización.

## 5. Fuentes oficiales

[AR1] Ley25.326 texto actualizado, arts2/4/5/6/7/9/10/11/12/14/16/21/24/25:
https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/actualizacion

[AR2] Decreto1558/2001 texto actualizado, art5:
https://www.argentina.gob.ar/normativa/nacional/decreto-1558-2001-70368/actualizacion

[AR3] Ley11.723 texto actualizado, arts1/2:
https://www.argentina.gob.ar/normativa/nacional/42755/actualizacion

[AR4] AAIP, transferencias internacionales:
https://www.argentina.gob.ar/transferencias-internacionales

[GP1] Google Play, Datos de usuario:
https://support.google.com/googleplay/android-developer/answer/10144311?hl=es

[GP2] Google Play, permisos/API de fotos y vídeos:
https://support.google.com/googleplay/android-developer/answer/16558241?hl=es

[CC] Creative Commons, FAQ de cambios de licencia:
https://creativecommons.org/faq/#what-if-i-change-my-mind-about-using-a-cc-license

Lectura complementaria si se ofrecen servicios en UE: EDPB Guidelines05/2020 sobre consentimiento; no evaluada aquí como dictamen de aplicabilidad:
https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en

## 6. Gate

LEGAL_APPROVED_BY_IDENTIFIED_REVIEWER + políticas técnicas coherentes + pruebas #77 + autorización de piloto. Ninguna de esas aprobaciones está obtenida por redactar este documento. El marco y políticas deben volver a verificarse al publicar.
