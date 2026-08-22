# TESTING MATRIX — Dr. Cannabis

## 1. Regla general

- `PASS` requiere evidencia de la superficie exacta.
- Fakes/mocks prueban orquestación, no prueban modelo, DB nativa, dispositivo, packaging ni release reales.
- Emulador solo no demuestra compatibilidad comercial Android.
- Dev server solo no demuestra Electron/NSIS/AAB.
- Datos demo prueban lógica; no se vuelven canónicos.
- Todo bug debe dejar regression test cuando sea técnicamente posible.

## 2. Dominio nutricional

| Superficie | Prueba mínima | Gate |
| --- | --- | --- |
| PPM ↔ masa | casos manuales conocidos | PASS obligatorio |
| Óxidos ↔ elemento | P2O5/P, K2O/K, CaO/Ca, MgO/Mg, SO3/S | PASS obligatorio |
| Aportes multi-ion | una sal aporta varios nutrientes | PASS obligatorio |
| Pureza | 100%, lote real, inválidos, no doble aplicación | PASS obligatorio |
| N-NO3/N-NH4 | separación + N total | PASS obligatorio |
| Unidades | mg/L, ppm, g, L, mS/cm | PASS obligatorio |
| Volumen | 1 L, 10 L, tanque grande | PASS obligatorio |
| Tolerancias | dentro/fuera/límite | PASS obligatorio |
| Solver resoluble | receta conocida | PASS obligatorio |
| Solver no resoluble | error explicable, no NaN/fallback | PASS obligatorio |
| Constraints | min/max/dosis/sales disabled | PASS obligatorio |
| Costo | gramos × costo/kg | PASS obligatorio |
| Stock/lote | consumo/falta/selección | PASS B7 |
| Provenance | inputs/resultados trazables | PASS B3 |
| Determinismo | misma fixture/misma config | PASS obligatorio |
| Cross-platform domain | misma fixture Windows/Android | PASS B12C |

## 3. EC, pH, agua y mezcla

| Superficie | Prueba | Gate |
| --- | --- | --- |
| EC estimada | modelo determinista + límites | PASS antes de release |
| EC medida | persistencia/separación de estimada | PASS B4/B7 |
| TDS presentation | escalas etiquetadas | PASS B4 |
| Agua base | análisis completo/parcial/ausente | PASS B4 |
| EC sin análisis | no inventar composición | PASS B4 |
| pH | validación/rangos/registro/tendencia | PASS B4/B8D |
| Compatibilidad | Ca-fosfato/sulfato/silicato etc. | PASS B4 |
| Orden de mezcla | secuencia y warnings | PASS B4 |
| Tanques A/B | separación/restricciones | PASS B4 |

## 4. Persistencia y contratos

| Superficie | Prueba | Gate |
| --- | --- | --- |
| DB fresh install | migraciones desde cero | PASS obligatorio |
| DB upgrade | fixture versión anterior | PASS antes de release |
| Transaction rollback | fallo parcial no corrompe | PASS obligatorio |
| Schema validation | payload válido/inválido/unknown | PASS obligatorio |
| Serialization | round-trip sin pérdida | PASS obligatorio |
| Version mismatch | bloqueo/mensaje explícito | PASS release |
| Corrupt DB/index | detección/recuperación | PASS según política |
| Persistencia | guardar/cerrar/reabrir | PASS obligatorio |
| Cross-platform schema | fixtures equivalentes | PASS #44 |
| Backup/export/import | validación/hash/errores | PASS B7/B11 |
| Privacy | no secrets/user DB en repo/logs | PASS obligatorio |

## 5. Electron / Windows

| Superficie | Prueba | Gate |
| --- | --- | --- |
| `contextIsolation` | true | PASS obligatorio |
| `nodeIntegration` | false | PASS obligatorio |
| Preload API | allowlist mínima/tipada | PASS obligatorio |
| IPC | inputs/outputs válidos/inválidos | PASS obligatorio |
| IPC forbidden | canal/path/action no permitidos | PASS obligatorio |
| CSP/navigation | scripts/orígenes/external links | PASS #18 |
| UI shell | navegación cambia centro y conserva chat | PASS #18 |
| Lifecycle | open/close/reopen/crash recovery | PASS #18/#42 |
| Desktop provider | ready/stream/cancel/restart/stop | PASS #28 |
| No-network AI | mode airplane/network capture | PASS #28/#42 |
| Build | TS + Vite + Electron | PASS PR relevante |
| NSIS | install sin Node/VS Code | PASS #37 |
| Upgrade | mantiene DB/config/assets | PASS #37/#40 |
| Uninstall | política de datos | PASS #37 |
| Exact artifact | hash probado = hash publicado | PASS #42 |

## 6. Android shell y bridge

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Capacitor build | sync + debug APK | PASS #19 |
| Kotlin bridge | TypeScript/Kotlin contract | PASS #19/#25 |
| Bridge invalid input | rejection typed | PASS obligatorio |
| Permissions | mínimos/contextuales/denied | PASS #19 |
| Lifecycle | pause/resume/background/process recreation | PASS #19/#20 |
| Back navigation | route/thread/artifact coherentes | PASS #20 |
| Orientation | portrait↔landscape sin pérdida | PASS #20/#30 |
| Low-memory | callback/release/recovery | PASS #25/#35 |
| Thermal | warning/degraded/recovery | PASS #25/#35 |
| AAB | signed/validated/installable | PASS #38 |
| Upgrade | app/data/model compatible | PASS #38/#40 |
| Exact artifact | AAB/APK hash registrado | PASS #43 |

## 7. UI compartida y navegación

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Shared components | mismo componente en shells | PASS #34 |
| Import boundaries | no platform imports en domain/UI | PASS #17 |
| Route map | rutas válidas/inválidas/deep link | PASS #20 |
| Workspace restore | module/thread/artifact/draft | PASS #20 |
| Fertilizer UI | input→solve→save→artifact | PASS #7 |
| Normal/loading/empty/error | cada feature crítica | PASS B10 |
| Degraded | model/DB/tool unavailable | PASS B9/B10 |
| Desktop responsive | ventana mínima razonable | PASS #11 |
| Cross-platform input/output | misma fixture/journey | PASS #34/#44 |

## 8. UX móvil split 50/50

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Portrait geometry | visor 50vh + chat 50vh | PASS #30 |
| Landscape geometry | visor 50vw + chat 50vw | PASS #30 |
| Tablet geometry | 50/50 según spec | PASS #30 |
| No chat fullscreen | chat no reemplaza/cubre visor | PASS #30 |
| Independent scroll | visor/chat no se arrastran mutuamente | PASS #30 |
| Safe areas | notch/status/nav bars | PASS #30/#35 |
| Keyboard open | composer visible, viewer preserved | PASS #30/#32 |
| Keyboard close | geometry restored no jump | PASS #30/#32 |
| Rotation | thread/artifact/zoom/draft preserved | PASS #30/#33 |
| Background/reopen | workspace restored | PASS #20/#30 |
| Tiny viewport | defined fallback, no overlay chaos | PASS #30 |

## 9. Historial y conversación

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Internal default | history 30%, conversation 70% | PASS #31 |
| Divider bounds | history 25–45% only | PASS #31 |
| Divider persistence | restore per device | PASS #31 |
| Search | title/content/date/crop/module/language | PASS #24/#31 |
| Scale | 1,000+ threads virtualized | PASS #31 |
| CRUD | new/rename/pin/archive/delete/restore | PASS #24/#31 |
| Thread switch | draft/messages/artifact restored | PASS #31/#32/#33 |
| Rapid switching | no state leakage/lost generation | PASS #31 |
| Long conversation | virtualization/scroll anchor | PASS #32 |
| Streaming | incremental/complete/partial | PASS #29/#32 |
| Cancel/retry | no duplicate turn/resources | PASS #29/#32 |
| IME/multiline | composer usable | PASS #32/#35 |
| Citation action | opens exact viewer content | PASS #32/#33 |

## 10. Visor de artifacts

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Image | load/progress/error/corrupt | PASS #33 |
| Pinch-to-zoom | smooth + bounds | PASS real device |
| Pan | no navigation conflict | PASS real device |
| Double-tap/reset/fit | deterministic | PASS #33 |
| Large image | downsample/tile/memory budget | PASS #33/#35 |
| Table axes | horizontal + vertical | PASS #33 |
| Sticky header/key columns | when applicable | PASS #33 |
| Large table | virtualization/filter/order/state | PASS #33 |
| Cell detail | opens without losing position | PASS #33 |
| Chart | tooltip/legend/units/accessible table | PASS #33 |
| Artifact linkage | thread/message/tool/citation exact | PASS #21/#33 |
| Rotation/background | zoom/pan/scroll preserved | PASS #33 |
| Untrusted content | no script/unsafe HTML execution | PASS security |

## 11. RAG, knowledge y citas

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Ingest idempotence | same input/same manifest | PASS #22 |
| Dedup/chunk metadata | source/version preserved | PASS #22 |
| Exact search | formulas/names/codes | PASS #22 |
| Semantic search | paraphrases ES/EN/PT-BR | PASS #22/#27 |
| Filters | phase/system/topic/language/version | PASS #22 |
| No-match | abstain/clarify | PASS #22/#27 |
| Contradiction | app data precedence | PASS #27 |
| Citation correctness | exact doc/section/version | PASS #22/#27 |
| Retired source | not retrieved/cited | PASS #22 |
| Knowledge version | compatible with embedding/model | PASS #26/#40 |

## 12. Tool calling

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Tool selection | correct/none/ambiguous | PASS #23/#27 |
| Arguments | valid extraction/validation | PASS #23/#27 |
| Read-only default | no autonomous mutation | PASS #23 |
| Write confirmation | explicit UI approval | PASS #23 |
| Tool timeout/fail | typed/degraded response | PASS #23/#29 |
| Idempotent retry | no duplicate mutation | PASS #23/#29 |
| Result trace | call→result→answer/artifact | PASS #23 |
| Calculation source | result from domain, not LLM | PASS regression |

## 13. Providers y Android on-device AI

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Capabilities | device/runtime report | PASS #25/#26 |
| Model missing | automatic state/action | PASS #25/#26 |
| Manifest parse | valid/invalid/unknown | PASS #26 |
| Hash/integrity | corrupt asset rejected | PASS #26/#40 |
| License/provenance | complete before release | PASS #26/#41 |
| Load/unload | success/fail/release memory | PASS #25 |
| Streaming | deltas/order/completion | PASS #25 |
| Cancellation | prompt/tool/runtime abort | PASS #25/#29 |
| Concurrency | one active or documented queue | PASS #25 |
| Background/resume | coherent recovery | PASS #25 |
| OOM | detection/message/recovery | PASS #25/#35 |
| Thermal | degraded state/recovery | PASS #25/#35 |
| Disk insufficient | no corrupt partial activation | PASS #26/#40 |
| Mode airplane | inference/RAG/history works | PASS #25/#43 |
| Network capture | zero inference traffic | PASS #25/#43 |
| No API key | onboarding/use path | PASS #43 |
| No model selector | standard UI path | PASS #26/#43 |
| No hidden cloud | code/config/traffic audit | PASS #25/#28/#29 |

## 14. Model evaluation

| Métrica | Casos | Gate |
| --- | --- | --- |
| Groundedness | complete/incomplete/contradictory/no evidence | threshold predeclared |
| Hallucination | values/tools/citations | critical threshold |
| Retrieval precision/recall | category corpus | threshold predeclared |
| Citation correctness | exact source | threshold predeclared |
| Tool selection/args | tool corpus | threshold predeclared |
| Abstention | unsupported questions | threshold predeclared |
| ES/EN/PT-BR | equivalent intent | PASS #27 |
| First-token latency | profiles min/mid/high | threshold predeclared |
| Tokens/s/total time | real devices | threshold predeclared |
| RAM/storage | cold/warm/load/generate | threshold predeclared |
| Battery/thermal | sustained session | threshold predeclared |
| Crash/ANR/OOM | repeated runs | release threshold |

No elegir ganador antes de escribir umbrales y corpus versionado.

## 15. i18n y accesibilidad

| Superficie | Prueba | Gate |
| --- | --- | --- |
| ES/EN/PT-BR | critical journeys | PASS #36 |
| Hard-coded strings | audit | PASS #36 |
| Dates/numbers/units | locale correctness | PASS #36 |
| Pseudo-locale | overflow/split stability | PASS #36 |
| Text scale | mobile/desktop | PASS #35/#36 |
| Touch targets | minimum design token | PASS #35 |
| Focus/TalkBack | critical flows | PASS #35 |
| Gesture alternative | zoom/pan controls | PASS #33/#35 |
| Contrast/status | accessibility checklist | PASS #35 |

## 16. Distribución, actualización y rollback

| Superficie | Prueba | Gate |
| --- | --- | --- |
| Windows package | reproducible/hash/SBOM | PASS #37 |
| Android package | signed AAB/hash/SBOM | PASS #38 |
| Play asset delivery | install/fast-follow/on-demand as chosen | PASS #39 |
| Fresh install | app+DB+knowledge+model | PASS #37/#39 |
| Interrupted install/update | recovery | PASS #40 |
| Corrupt asset | reject/rollback | PASS #40 |
| Disk full | preserve prior functional version | PASS #40 |
| Compatibility matrix | app/schema/knowledge/embedding/model/runtime | PASS #40 |
| Rollback | coordinated and data-safe | PASS #40 |
| Privacy/data safety | declarations match behavior | PASS #41 |
| Licenses | app/runtime/model/knowledge | PASS #41 |

## 17. Release Candidate

| Gate | Desktop #42 | Android #43 | Cross-platform #44 |
| --- | --- | --- | --- |
| Exact hash | required | required | reports both |
| Domain/solver | PASS | PASS | equivalent |
| DB/migrations | PASS | PASS | compatible |
| UI journeys | PASS | PASS | same semantics |
| Chat/RAG/tools | PASS | PASS | contract compatible |
| Offline | PASS | PASS | declared behavior |
| Security | Electron | Android bridge/assets | schemas/versioning |
| Install/upgrade | NSIS | Play/AAB | compatibility |
| ES/EN/PT-BR | PASS | PASS | equivalent |
| Documentation | PASS | PASS | shared/versioned |

#45 solo acepta publicación cuando #42–#44 están PASS y no existen blockers/críticos.

## 18. Fixtures canónicas a crear

- dataset mínimo validado de sales/productos;
- casos Excel con expected outputs;
- DB fixtures por schema version;
- cultivos `TEST_FIXTURE_ONLY`;
- threads/messages/citations/artifacts;
- knowledge corpus versionado;
- model evaluation corpus;
- device profile manifest;
- release compatibility fixtures.
