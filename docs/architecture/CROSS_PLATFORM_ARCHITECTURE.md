# CROSS-PLATFORM ARCHITECTURE — Dr. Cannabis

Status: `PROPOSED_FOR_GOV_02`
Tracks: #16, #6, #17–#20, #14

## 1. Objetivo

Construir un solo producto funcional que se ejecute en:

- Windows mediante Electron;
- Android mediante Capacitor;

sin duplicar dominio, solver, validaciones, RAG, contratos, traducciones ni pantallas funcionales.

La diferencia entre plataformas debe concentrarse en shells, adaptadores nativos, distribución y composición responsive del layout.

## 2. Decisiones obligatorias

1. React + TypeScript es la base visual y de aplicación compartida.
2. Electron contiene la versión Windows.
3. Capacitor contiene la versión Android.
4. Kotlin se limita a plugins/capacidades nativas Android; no se crea una segunda aplicación visual en Compose.
5. El dominio nutricional y los toolboxes no importan React, Electron, Capacitor, Kotlin ni una implementación concreta de SQLite.
6. La UI no accede directamente a filesystem, DB, procesos, runtimes LLM o APIs nativas.
7. Toda capacidad de plataforma entra por un port tipado, validado y testeable.
8. Desktop y mobile comparten las mismas pantallas funcionales; cambian `layout composition`, densidad y navegación.
9. No se realiza una migración masiva. La estructura se adopta incrementalmente con builds verdes y tests de equivalencia.

## 3. Capas y regla de dependencias

Dirección permitida:

```text
platform adapters ─┐
                   ├─> application ─> domain
UI / presenters ───┘         │
                             └─> contracts
```

Direcciones prohibidas:

```text
domain -> React/Electron/Capacitor/Kotlin/SQLite concreto
application -> componentes visuales
UI -> better-sqlite3 / Android SQLite / llama runtime / LiteRT-LM directo
renderer -> Node/filesystem/shell/proceso arbitrario
```

### 3.1 `domain`

Contiene funciones puras, tipos de valor y reglas:

- nutrientes, especies y bases químicas;
- PPM, volumen, masa, pureza y tolerancias;
- solver;
- EC/pH según contrato;
- VPD, CFM y demás toolboxes;
- errores de dominio.

No contiene persistencia, IPC, HTTP, UI ni prompts.

### 3.2 `application`

Orquesta casos de uso:

- crear/seleccionar sector y campaña;
- ejecutar solver;
- guardar formulación;
- consultar historial;
- preparar contexto de chat;
- ejecutar tool calls;
- coordinar import/export.

Depende de ports, no de adaptadores concretos.

### 3.3 `contracts`

Schemas versionados y validados en runtime:

- DTOs de persistencia;
- contexto del chat;
- herramientas;
- artifacts/citations;
- IPC Electron;
- bridge Capacitor/Kotlin;
- manifests de knowledge/model/release.

### 3.4 `ui`

Componentes y pantallas React compartidos:

- formularios;
- tablas;
- resultados;
- alertas;
- chat;
- historial;
- visor de artifacts;
- estados loading/empty/error/degraded.

No contiene fórmulas productivas ni acceso nativo directo.

### 3.5 `platform`

Implementaciones por entorno:

- desktop/Electron;
- Android/Capacitor;
- test/fake explícito.

## 4. Estructura objetivo del repositorio

La migración puede ajustar nombres, pero debe preservar estas responsabilidades:

```text
apps/
  desktop/
    electron-main/
    electron-preload/
    installer/
  android/
    capacitor.config.ts
    android/

packages/
  domain/
  solver/
  application/
  contracts/
  ui/
  chat-core/
  data/
  knowledge/
  i18n/
  testing/

plugins/
  capacitor-litertlm/
    src/definitions.ts
    android/src/main/.../*.kt

docs/
  architecture/
  product/
  truth/
  reference/
```

No se crea esta estructura completa de una vez. #17 debe producir un mapa de migración por path y una secuencia de commits pequeños.

## 5. Ports mínimos

```ts
interface StorageProvider {
  getCapabilities(): Promise<StorageCapabilities>;
  transaction<T>(work: (tx: StorageTransaction) => Promise<T>): Promise<T>;
  migrate(): Promise<MigrationReport>;
  health(): Promise<HealthReport>;
}

interface AiProvider {
  getCapabilities(): Promise<AiCapabilities>;
  ensureReady(signal?: AbortSignal): Promise<AiReadyReport>;
  generateStream(request: AiGenerateRequest, signal?: AbortSignal): AsyncIterable<AiStreamEvent>;
  dispose(): Promise<void>;
}

interface EmbeddingProvider {
  embed(input: EmbeddingRequest, signal?: AbortSignal): Promise<EmbeddingResult>;
}

interface ExportProvider {
  export(request: ExportRequest): Promise<ExportResult>;
}

interface PlatformCapabilities {
  platform: 'windows' | 'android' | 'test';
  features: Record<string, boolean>;
  versions: Record<string, string>;
}
```

Los contratos finales pertenecen a sus Issues y deben validarse mediante schemas. Este documento fija la separación, no sus detalles de implementación.

## 6. Shell Windows

Responsabilidades exclusivas:

- lifecycle Electron;
- ventana y menú;
- preload tipado;
- IPC allowlisted;
- acceso controlado a persistencia/filesystem/export;
- lifecycle del provider LLM local;
- packaging NSIS.

Seguridad obligatoria:

- `contextIsolation=true`;
- `nodeIntegration=false`;
- CSP;
- navegación externa controlada;
- ningún canal IPC genérico del tipo `execute`, `readAnyFile` o `shell`;
- validación de payload y respuesta.

## 7. Shell Android

Responsabilidades exclusivas:

- lifecycle Android;
- Capacitor;
- plugins Kotlin;
- permisos mínimos;
- almacenamiento nativo;
- Google LiteRT-LM;
- entrega/verificación de assets;
- build/signing/AAB.

El código Kotlin no contiene lógica agronómica, solver, RAG, prompts, navegación de producto ni pantallas duplicadas.

## 8. Layouts compartidos

### Desktop

```text
[navegación] [módulo/visor principal] [chat persistente]
```

### Mobile portrait

```text
[visor 50vh]
[chat 50vh: historial arriba + conversación abajo]
```

### Mobile landscape/tablet

```text
[visor 50vw] [chat 50vw: historial arriba + conversación abajo]
```

Las pantallas funcionales son las mismas; `DesktopLayout` y `MobileSplitLayout` solo componen slots.

## 9. Estado compartido

El workspace debe poder serializar:

```ts
type WorkspaceState = {
  schemaVersion: number;
  route: AppRoute;
  sectorId?: string;
  campaignId?: string;
  moduleId?: string;
  threadId?: string;
  artifactId?: string;
  draftByThread: Record<string, string>;
  viewerStateByArtifact: Record<string, ViewerState>;
  chatHistoryRatio: number;
};
```

Rotación, reload, cierre/reapertura y background no deben reiniciar silenciosamente ese estado.

## 10. Persistencia

SQLite sigue siendo el objetivo local. La API de dominio no debe depender de `better-sqlite3` ni de una biblioteca Android concreta.

Reglas:

- schemas y migraciones con versión común;
- adapters separados;
- fixtures de equivalencia;
- mismas unidades y semántica en ambas plataformas;
- archivos de usuario fuera del repo;
- backup/import explícitos y validados.

## 11. Build y CI objetivo

Gates por PR relevante:

```text
typecheck
lint/import-boundaries
tests-domain
tests-application
tests-contracts
build-shared-ui
build-desktop
build-android-debug
```

Gates de release adicionales:

```text
package-windows
android-signed-aab
fresh-install
upgrade
rollback
offline-smoke
security-audit
artifact-hashes
```

No todos existen hoy; cada Issue debe agregar solo los gates de su superficie y mantener los anteriores.

## 12. Estrategia de migración

1. Inventariar imports y responsabilidades actuales.
2. Extraer contratos y funciones puras con regression tests.
3. Crear ports y adapters fake explícitos.
4. Mover renderer a componentes compartidos sin cambiar comportamiento.
5. Endurecer Electron.
6. Crear shell Capacitor mínimo.
7. Integrar navegación/estado compartidos.
8. Recién después integrar IA Android y UX móvil final.

En cada paso:

- exact scope allowlist;
- build anterior y nuevo;
- comparación de comportamiento;
- truth sync;
- Draft PR separada.

## 13. No objetivos

- no reescribir todo el legacy;
- no elegir modelo final sin benchmark;
- no implementar iOS dentro del roadmap actual;
- no introducir cloud obligatorio;
- no copiar componentes para crear una versión móvil paralela;
- no mover fórmulas a Kotlin o React.

## 14. Gates de aceptación arquitectónica

- mismo caso de dominio produce mismo resultado en Windows y Android;
- import graph respeta límites;
- UI compartida demostrable;
- renderer/bridge sin capacidades arbitrarias;
- navegación y estado sobreviven lifecycle;
- builds reproducibles;
- documentación y Issues sincronizadas.
