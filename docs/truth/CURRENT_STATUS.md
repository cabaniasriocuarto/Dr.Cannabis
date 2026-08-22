# CURRENT STATUS — Dr. Cannabis 2.0

Última actualización canónica: 2026-08-22.

## 1. Propósito

Este archivo registra el estado operativo actual del proyecto. Debe leerse inmediatamente después de `AGENTS.md` y antes de interpretar estados históricos escritos dentro de documentos extensos, Issues o PRs antiguas.

No reemplaza los contratos de producto, arquitectura o dominio. Resuelve únicamente cuál es el estado vigente y qué bloque puede avanzar.

## 2. Baseline canónico

```text
REPOSITORY=cabaniasriocuarto/Dr.Cannabis
DEFAULT_BRANCH=main
CANONICAL_MAIN=d15bcff1fcee0c97e82f92092a96e4481651dbde
B0_MERGE=d9a74494b8532185e737970559521eb6dc17b25e
GOV_02_PR=#52
GOV_02_MERGE=d15bcff1fcee0c97e82f92092a96e4481651dbde
```

## 3. Estado de bloques

```text
B0/#1=DONE
GOV-02/#16=DONE
GOV-02A/#54=POST_MERGE_STATUS_SYNC
B1/#2=IN_PROGRESS
B2–B12=NOT_STARTED
```

El próximo trabajo funcional sigue siendo B1/#2. GOV-02A no habilita saltar dependencias ni iniciar B5, B9 o B10.

## 4. Decisiones ya canónicas en `main`

- una sola base funcional React + TypeScript;
- Electron para Windows;
- Capacitor para Android;
- Kotlin limitado a plugins/adaptadores nativos;
- dominio, solver, datos, RAG, tools, i18n y pantallas funcionales compartidos;
- IA Android local mediante Google LiteRT-LM;
- familia Gemma como candidata pendiente del benchmark #27;
- sin API paga obligatoria, API key, PC o Wi-Fi local para usar el bot Android;
- sin fallback cloud oculto;
- chat móvil con estados `expanded_split` y `minimized_bubble`;
- expandido: visor 50% + chat 50%; historial arriba y conversación abajo;
- minimizado: visor/módulo ocupa todo el espacio útil y queda una burbuja fija abajo a la izquierda;
- restaurar conserva thread, borrador, mensajes, generación, artifact, zoom, pan y scroll;
- WBS, trazabilidad, Issue Forms, PR template y CI documental incorporados.

Estas son decisiones y contratos. No significan que Android, el modelo, la UX o la distribución ya estén implementados.

## 5. Regla de supersesión post-merge

Cualquier encabezado o texto heredado que todavía diga:

- `PENDING_GOV_02_MERGE`;
- `CANONICAL_PENDING_GOV_02_MERGE`;
- `DOCUMENTATION_REVIEW` para GOV-02;
- GOV-02 como propuesta pendiente;
- PR #52 como Draft/open;

queda supersedido por:

1. el merge confirmado de PR #52;
2. el commit `d15bcff1fcee0c97e82f92092a96e4481651dbde`;
3. esta página;
4. Issue #16 cerrada;
5. Issue maestra #14 y tracker #46 actualizados.

El contenido técnico aprobado de esos documentos conserva vigencia. Solo queda invalidada la etiqueta temporal pre-merge. Cuando un documento sea editado por su bloque correspondiente, debe normalizar también ese marcador sin cambiar contratos silenciosamente.

## 6. B1 — base y sincronización obligatoria

Branch activa:

```text
audit/b1-legacy-excel-knowledge
```

Base original:

```text
main@d9a74494b8532185e737970559521eb6dc17b25e
```

Antes de abrir o cerrar la PR de B1 debe actualizarse contra:

```text
main@d15bcff1fcee0c97e82f92092a96e4481651dbde
```

No puede sobrescribir ni degradar:

- `AGENTS.md`;
- `.github/**`;
- `docs/architecture/**`;
- `docs/product/**`;
- `docs/truth/**`;
- child Issues, WBS o trazabilidad creados por GOV-02.

## 7. Estado de evidencia

### Confirmado

- PR #52 mergeada;
- workflow documental PASS;
- `git diff --check` PASS;
- scope de GOV-02 exclusivamente de gobernanza/documentación;
- Issue #16 cerrada;
- master #14 y tracker #46 sincronizados.

### No demostrado todavía

- solver productivo;
- compatibilidad Android;
- modelo Gemma definitivo;
- rendimiento en dispositivos;
- shell Capacitor;
- chat/RAG/tools implementados;
- instalador o AAB comercial;
- release Windows/Android.

## 8. Cómo actualizar este archivo

Actualizar `CURRENT_STATUS.md` cuando ocurra alguno de estos eventos:

- merge de governance o parent block;
- cambio del bloque activo;
- nuevo baseline de `main` relevante;
- bloqueo que altere la secuencia;
- release candidate o release;
- cambio explícito de plataforma/alcance.

La actualización debe enlazar Issue, PR, commit y evidencia. No usar porcentajes subjetivos.
