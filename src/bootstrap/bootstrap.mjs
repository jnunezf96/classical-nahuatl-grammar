import { installRuntimeBridge } from "./runtime_bridge.mjs?v=20260824-universal-capability-navigator-280";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs?v=20260726-lessons2-58-one-system-094";
import {
    RUNTIME_INSTALLERS,
    attachRuntimeBindings,
    createRuntimeInstance,
} from "../runtime/create_runtime.mjs?v=20260824-universal-capability-navigator-280";
import { installUiComposerGlobals } from "../ui/composer/composer.mjs?v=20260824-universal-capability-navigator-280";
import { installUiPanelsGlobals } from "../ui/panels/panels.mjs?v=20260824-universal-capability-navigator-280";
import { installUiRenderingGlobals } from "../ui/rendering/rendering.mjs?v=20260824-universal-capability-navigator-280";
import { installClassicalShellGlobals } from "../ui/shell/classical_shell.mjs?v=20260824-universal-capability-navigator-280";
import { installUiStateGlobals } from "../ui/state.mjs?v=20260824-universal-capability-navigator-280";
import {
    installClassicalNestedControlLedger,
} from "../ui/diagnostics/classical_nested_control_ledger.mjs?v=20260824-universal-capability-navigator-280";

let browserBootstrapPromise = null;

const GRAMMATICAL_ATLAS_LOAD_STATE_KIND =
    "classical-grammatical-atlas-load-state";
const GRAMMATICAL_ATLAS_MODULE_URL = new URL(
    "../ui/diagnostics/classical_grammatical_atlas.mjs",
    import.meta.url
);
const GRAMMATICAL_ATLAS_VERSION_MODULE_URL = new URL(
    "../../data/classical_grammatical_atlas_population_version.mjs",
    import.meta.url
);

const BROWSER_MODULE_ENTRYPOINT = "src/browser/main.mjs";
const REQUIRED_STATIC_ROOT_IDS = Object.freeze([
    "classical-app-root",
    "classical-footer-root",
]);
const CACHE_CURRENT_PRESENTATION_INSTALLERS = Object.freeze([
    Object.freeze(["src/ui/composer/composer.mjs", installUiComposerGlobals]),
    Object.freeze(["src/ui/panels/panels.mjs", installUiPanelsGlobals]),
    Object.freeze(["src/ui/rendering/rendering.mjs", installUiRenderingGlobals]),
    Object.freeze(["src/ui/shell/classical_shell.mjs", installClassicalShellGlobals]),
    Object.freeze(["src/ui/state.mjs", installUiStateGlobals]),
]);

function bindCacheCurrentPresentationInstallers() {
    for (const [modulePath, installer] of CACHE_CURRENT_PRESENTATION_INSTALLERS) {
        if (!RUNTIME_INSTALLERS.has(modulePath)) {
            throw new Error(`Cache-current presentation installer is absent from the canonical manifest: ${modulePath}`);
        }
        RUNTIME_INSTALLERS.set(modulePath, installer);
    }
}

function assertStaticAppRoots(documentObject) {
    if (typeof documentObject?.getElementById !== "function") {
        throw new Error("bootstrapBrowserApp requires an index.html document with static application roots.");
    }
    const missingRootIds = REQUIRED_STATIC_ROOT_IDS.filter((id) => !documentObject.getElementById(id));
    if (missingRootIds.length) {
        throw new Error(
            `bootstrapBrowserApp is missing static index.html roots: ${missingRootIds.map((id) => `#${id}`).join(", ")}.`
        );
    }
}

function assertInstalledVerbInput(documentObject) {
    if (!documentObject.getElementById("verb")) {
        throw new Error(
            "bootstrapBrowserApp did not receive the installed #verb control from the Classical shell runtime."
        );
    }
}

function publishGrammaticalAtlasLoadState({
    globalObject,
    documentObject,
    status,
    phase,
    attempt,
    error = null,
    populationVersion = null,
}) {
    const state = Object.freeze({
        kind: GRAMMATICAL_ATLAS_LOAD_STATE_KIND,
        version: 1,
        status,
        phase,
        attempt,
        populationVersion: populationVersion?.version || "",
        populationSourceDigest: populationVersion?.sourceDigest || "",
        errorName: error?.name || "",
        errorMessage: error?.message || "",
        retryAvailable: status === "failed",
        canonicalBootstrapContinuesIndependently: true,
        grammarAuthority: false,
        uiAuthority: false,
    });
    globalObject.__CLASSICAL_GRAMMATICAL_ATLAS_LOAD_STATE__ = state;
    if (documentObject?.documentElement?.dataset) {
        documentObject.documentElement.dataset
            .classicalGrammaticalAtlasStatus = status;
    }
    let projection = documentObject?.getElementById?.(
        "classical-grammatical-atlas-load-state"
    ) || null;
    if (!projection && documentObject?.createElement) {
        projection = documentObject.createElement("script");
        projection.id = "classical-grammatical-atlas-load-state";
        projection.type = "application/json";
        projection.dataset.classicalGrammaticalAtlasLoadState =
            "descriptive-non-authorizing";
        (documentObject.head || documentObject.body)?.appendChild?.(
            projection
        );
    }
    if (projection) projection.textContent = JSON.stringify(state, null, 2);
    try {
        globalObject.dispatchEvent?.(new globalObject.CustomEvent(
            "classical:grammatical-atlas-load-state",
            { detail: state }
        ));
    } catch {
        // The visible state remains available without a DOM event constructor.
    }
    return state;
}

function afterFirstPaintAndIdle(globalObject) {
    return new Promise(resolve => {
        const scheduleTimeout = typeof globalObject.setTimeout === "function"
            ? globalObject.setTimeout.bind(globalObject)
            : setTimeout;
        const afterPaint = () => {
            if (typeof globalObject.requestIdleCallback === "function") {
                globalObject.requestIdleCallback(() => resolve(), {
                    timeout: 1500,
                });
            } else {
                scheduleTimeout(resolve, 0);
            }
        };
        if (typeof globalObject.requestAnimationFrame === "function") {
            globalObject.requestAnimationFrame(afterPaint);
        } else {
            scheduleTimeout(afterPaint, 0);
        }
    });
}

export function installDeferredClassicalGrammaticalAtlas({
    globalObject = globalThis,
    documentObject = globalObject.document,
    loadPopulationVersion = attempt => {
        const url = new URL(GRAMMATICAL_ATLAS_VERSION_MODULE_URL.href);
        url.searchParams.set(
            "cache",
            `${Date.now().toString(36)}-${attempt}`
        );
        return import(url.href).then(module => (
            module.CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_VERSION
        ));
    },
    loadAtlasModule = (attempt, populationVersion) => {
        const url = new URL(GRAMMATICAL_ATLAS_MODULE_URL.href);
        url.searchParams.set("v", populationVersion.version);
        url.searchParams.set(
            "cache",
            "20260824-universal-capability-navigator-280"
        );
        if (attempt > 1) url.searchParams.set("retry", String(attempt));
        return import(url.href);
    },
} = {}) {
    let attempt = 0;
    let installedController = null;
    let loadedAtlasModule = null;
    let loadedAtlasModuleVersion = "";
    let loadPromise = null;

    const start = () => {
        if (installedController) return Promise.resolve(installedController);
        if (loadPromise) return loadPromise;
        attempt += 1;
        publishGrammaticalAtlasLoadState({
            globalObject,
            documentObject,
            status: "loading",
            phase: "loading-population",
            attempt,
        });
        loadPromise = Promise.resolve()
            .then(() => loadPopulationVersion(attempt))
            .then(populationVersion => {
                if (
                    populationVersion?.kind
                      !== "classical-grammatical-atlas-population-version"
                    || !populationVersion.version
                    || !populationVersion.sourceDigest
                ) {
                    throw new Error(
                        "The generated Classical Grammatical Atlas version is invalid."
                    );
                }
                const version = populationVersion.version;
                const modulePromise = loadedAtlasModule
                    && loadedAtlasModuleVersion === version
                    ? Promise.resolve(loadedAtlasModule)
                    : Promise.resolve(
                        loadAtlasModule(attempt, populationVersion)
                    ).then(module => {
                        if (
                            typeof module
                                .loadAndInstallClassicalGrammaticalAtlas
                            !== "function"
                        ) {
                            throw new Error(
                                "The Classical Grammatical Atlas installer is unavailable."
                            );
                        }
                        loadedAtlasModule = module;
                        loadedAtlasModuleVersion = version;
                        return module;
                    });
                return modulePromise.then(module => ({
                    module,
                    populationVersion,
                }));
            })
            .then(({ module, populationVersion }) => (
                Promise.resolve(module.loadAndInstallClassicalGrammaticalAtlas({
                    globalObject,
                    documentObject,
                    populationVersion,
                })).then(controller => ({
                    controller,
                    populationVersion,
                }))
            ))
            .then(({ controller, populationVersion }) => {
                if (!controller) {
                    throw new Error(
                        "The Classical Grammatical Atlas did not install."
                    );
                }
                installedController = controller;
                publishGrammaticalAtlasLoadState({
                    globalObject,
                    documentObject,
                    status: "ready",
                    phase: "observing",
                    attempt,
                    populationVersion,
                });
                return controller;
            })
            .catch(error => {
                loadPromise = null;
                publishGrammaticalAtlasLoadState({
                    globalObject,
                    documentObject,
                    status: "failed",
                    phase: "retry-available",
                    attempt,
                    error,
                });
                throw error;
            });
        loadPromise.catch(() => {
            // Failure is visible and retryable without rejecting bootstrap.
        });
        globalObject.__CLASSICAL_GRAMMATICAL_ATLAS_READY__ = loadPromise;
        return loadPromise;
    };

    globalObject.retryClassicalGrammaticalAtlasLoad = start;
    globalObject.getClassicalGrammaticalAtlasLoadState = () => (
        globalObject.__CLASSICAL_GRAMMATICAL_ATLAS_LOAD_STATE__ || null
    );
    publishGrammaticalAtlasLoadState({
        globalObject,
        documentObject,
        status: "loading",
        phase: "waiting-for-first-paint",
        attempt,
    });
    const ready = afterFirstPaintAndIdle(globalObject).then(start);
    ready.catch(() => {
        // Failure is visible and retryable without rejecting bootstrap.
    });
    globalObject.__CLASSICAL_GRAMMATICAL_ATLAS_READY__ = ready;
    return Object.freeze({
        kind: "classical-grammatical-atlas-deferred-loader",
        version: 1,
        ready,
        retry: start,
        grammarAuthority: false,
        uiAuthority: false,
    });
}

export async function bootstrapRuntime({
    globalObject = globalThis,
    loadRuntime,
    installBridge = true,
}) {
    if (typeof loadRuntime !== "function") {
        throw new Error("bootstrapRuntime requires a loadRuntime function.");
    }
    const runtime = await loadRuntime();
    if (installBridge) {
        installRuntimeBridge(globalObject, runtime);
    }
    return runtime;
}

export async function bootstrapBrowserApp(options = {}) {
    if (browserBootstrapPromise) {
        return browserBootstrapPromise;
    }
    browserBootstrapPromise = bootstrapRuntime({
        globalObject: options.globalObject || globalThis,
        installBridge: options.installBridge !== false,
        loadRuntime: async () => {
            const globalObject = options.globalObject || globalThis;
            const documentObject = options.documentObject || globalObject.document;
            if (!documentObject) {
                throw new Error("bootstrapBrowserApp requires a document.");
            }
            const runtimeConfig = createRuntimeConfigSnapshot();
            globalObject.__CLASSICAL_BOOTSTRAP_MANAGED__ = true;
            globalObject.__CLASSICAL_RUNTIME_CONFIG__ = runtimeConfig;
            globalObject.__CLASSICAL_RUNTIME_PATHS__ = runtimeConfig.paths;
            assertStaticAppRoots(documentObject);
            bindCacheCurrentPresentationInstallers();
            const runtimeInstance = await createRuntimeInstance({
                globalObject,
                windowObject: globalObject.window || globalObject,
                documentObject,
                runtimeConfig,
            });
            attachRuntimeBindings(globalObject, runtimeInstance);
            if (
                globalObject.window
                && typeof globalObject.window === "object"
                && globalObject.window !== globalObject
            ) {
                attachRuntimeBindings(globalObject.window, runtimeInstance);
            }
            assertInstalledVerbInput(documentObject);
            if (typeof globalObject.initializeUiRuntime === "function") {
                await globalObject.initializeUiRuntime();
            }
            installClassicalNestedControlLedger({ globalObject, documentObject });
            installDeferredClassicalGrammaticalAtlas({
                globalObject,
                documentObject,
            });
            return {
                mode: "browser-module-runtime",
                bootstrapBrowserApp,
                initializeUiRuntime: globalObject.initializeUiRuntime || null,
                runtimeConfig,
                entrypoint: BROWSER_MODULE_ENTRYPOINT,
                scriptPaths: [BROWSER_MODULE_ENTRYPOINT],
                esmPreloads: runtimeInstance.loadedModules,
                moduleRuntimeMode: "direct-import",
                scriptExecutionDisabled: true,
            };
        },
    }).catch((error) => {
        browserBootstrapPromise = null;
        throw error;
    });
    return browserBootstrapPromise;
}
