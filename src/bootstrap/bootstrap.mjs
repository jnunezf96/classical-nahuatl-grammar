import {validateEmbeddedStartupData} from "./startup_data.mjs?v=20261022-startup-1";
import { installRuntimeBridge } from "./runtime_bridge.mjs?choiceArchitecture=20261026-15&v=20260922-grammar-interface-549&cleanup=classical-only-20261009-1&modifier=canonical-20261009-1&continuation=shared-preparation-20261009-1&repair=position-model-20261011-9&makePreview=20261022-1&fixedChoices=20261022-1&nominalSource=20261022-1&startupDelivery=20261022-1&andrewsRelease=20261024-1&ad102=20261024-1&andrewsCorrections=20261024-1&interfaceRelease=1.2.37&negativeAttachment=20261025-1&coyoteWalking=20261025-1&ompaCopula=20261025-1&imaltepeuh=20261025-1&includedSupportiveI=20261025-2&proxyPossessor=20261025-2";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs?v=20260904-cehui-nominal-root-430";
import {
    RUNTIME_INSTALLERS,
    attachRuntimeBindings,
    createRuntimeInstance,
} from "../runtime/create_runtime.mjs?derivationChoices=20261026-1&sentenceChoices=20261026-1&choiceArchitecture=20261026-15&firstSource=20261026-1&dimensionClear=20261026-2&sourceGuidance=20261026-1&icDimension=20261026-1&comparisonSource=20261026-1&reasonPresentation=20261026-1&nucleusEdit=20261024-9&deverbalReload=20261024-8&possessive=20261024-3&stemNominal=20261024-2&stemReload=20261024-2&futureObject=20261024-3&innerSource=20261024-1&innerParticle=20261024-1&innerVnc=20261024-1&innerNnc=20261024-1&mixedInner=20261024-1&remainingReload=20261024-1&conjunctReload=20261023-7&operationFirst=20261023-4&vncEdit=20261023-6&nncReinflection=20261023-5&repeatConjunct=20261023-1&conjunctEdit=20261023-1&conjunction=20261023-2&clickFeedback=20261023-1&formulaSlots=20261023-24&v=20261008-apple-reload-recovery-copy-1&choices=20261013-build-constructions-2&design=lesson42-path-27&reader=42-10-275&cleanup=classical-only-20261009-1&modifier=canonical-20261009-1&continuation=shared-preparation-20261009-1&repair=position-model-20261012-25&audit=20261013-source-facts-1&remaining=20261013-inventory-1&caseMeta=20261013-1&resultEditing=20261014-8&pickerTransport=20261014-1&sourceAdmission=20261014-3&operationClear=20261014-1&subjectTransition=20261021-29&makePreview=20261022-1&fixedChoices=20261022-1&nominalSource=20261022-1&startupDelivery=20261022-1&nominalReload=20261024-4&andrewsRelease=20261024-1&ad102=20261024-1&andrewsCorrections=20261024-1&interfaceRelease=1.2.37&negativeAttachment=20261025-1&coyoteWalking=20261025-1&ompaCopula=20261025-1&includedSupportiveI=20261025-2&proxyPossessor=20261025-2&huicContinuation=20261025-1";
import { installUiComposerGlobals } from "../ui/composer/composer.mjs?deverbalReload=20261024-8&conjunctEdit=20261023-2&clickFeedback=20261023-1&v=20261010-reader-42-8-257&choices=20261013-build-constructions-2&audit=20261013-source-facts-1&sourceAdmission=20261014-3&writingSource=20261022-1&andrewsRelease=20261024-1&interfaceRelease=1.2.36";
import { installUiPanelsGlobals } from "../ui/panels/panels.mjs?v=20260912-selection-repair-447&cleanup=classical-only-20261009-1";
import { installUiRenderingGlobals } from "../ui/rendering/rendering.mjs?choiceArchitecture=20261026-15&firstSource=20261026-1&dimensionClear=20261026-2&sourceGuidance=20261026-1&nucleusEdit=20261024-9&deverbalReload=20261024-8&innerSource=20261024-1&innerParticle=20261024-1&innerVnc=20261024-1&innerNnc=20261024-1&mixedInner=20261024-1&remainingReload=20261024-1&conjunctReload=20261023-7&operationFirst=20261023-4&vncEdit=20261023-6&nncReinflection=20261023-5&repeatConjunct=20261023-1&conjunctEdit=20261023-1&clauseHarmony=20261023-5&clickFeedback=20261023-2&honorificAttachment=20261023-2&formulaSlots=20261023-24&v=20261014-task-menu-1&choices=20261013-build-constructions-2&design=lesson42-path-27&cleanup=classical-only-20261009-1&modifier=canonical-20261009-1&continuation=shared-preparation-20261009-1&repair=position-model-20261012-25&audit=20261013-source-facts-1&remaining=20261013-inventory-1&navigation=20261014-1&placement=20261014-1&choicesLayout=20261014-4&exampleMirror=20261014-1&resultEditing=20261014-8&pickerTransport=20261014-1&sourceAdmission=20261014-3&operationClear=20261014-1&presentation=20261019-1&routeShapes=20261021-1&subjectTransition=20261021-29&makePreview=20261022-1&fixedChoices=20261022-1&nominalSource=20261022-1&nominalReload=20261024-4&andrewsRelease=20261024-1&andrewsCorrections=20261024-1&interfaceRelease=1.2.37&negativeAttachment=20261025-1&ompaCopula=20261025-1&imaltepeuh=20261025-1";
import { installClassicalShellGlobals } from "../ui/shell/classical_shell.mjs?deverbalReload=20261024-8&formulaSlots=20261023-24&longVowels=20261022-1&v=20261011-reader-42-8-272&audit=20261013-source-facts-1&placement=20261014-1&choicesLayout=20261014-4&sourceAdmission=20261014-3&classDecision=20261022-1&writingSource=20261022-4&startupDelivery=20261022-1&andrewsRelease=20261024-1&interfaceRelease=1.2.36";
import { installUiStateGlobals } from "../ui/state.mjs?clickFeedback=20261023-1&v=20261007-four-panels-7";
import {
    installClassicalNestedControlLedger,
} from "../ui/diagnostics/classical_nested_control_ledger.mjs?v=20260922-grammar-interface-549";

let browserBootstrapPromise = null;

const GRAMMATICAL_ATLAS_LOAD_STATE_KIND =
    "classical-grammatical-atlas-load-state";
const GRAMMATICAL_ATLAS_MODULE_URL = new URL(
    "../ui/diagnostics/classical_grammatical_atlas.mjs",
    import.meta.url
);
const GRAMMATICAL_ATLAS_VERSION_MODULE_URL = new URL(
    "../../data/classical_grammatical_atlas_population_version.mjs?v=20260904-cehui-nominal-root-430",
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
            "20260922-grammar-interface-549"
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
            validateEmbeddedStartupData(documentObject);
            documentObject.documentElement.dataset.classicalBootstrapPhase = "runtime";
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
            const initialReloadUrl = (documentObject.defaultView || globalObject.window || globalObject)
                .location?.href || "";
            if (typeof globalObject.initializeUiRuntime === "function") {
                documentObject.documentElement.dataset.classicalBootstrapPhase = "data-and-interface";
                await globalObject.initializeUiRuntime();
            }
            globalObject.restoreClassicalVncReloadSession?.({ url: initialReloadUrl });
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
