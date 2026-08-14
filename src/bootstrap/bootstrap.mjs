import { installRuntimeBridge } from "./runtime_bridge.mjs?v=20260813-lesson11-groups7-9-204";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs?v=20260726-lessons2-58-one-system-094";
import {
    RUNTIME_INSTALLERS,
    attachRuntimeBindings,
    createRuntimeInstance,
} from "../runtime/create_runtime.mjs?v=20260813-lesson11-groups7-9-204";
import { installUiComposerGlobals } from "../ui/composer/composer.mjs?v=20260813-lesson11-groups7-9-204";
import { installUiPanelsGlobals } from "../ui/panels/panels.mjs?v=20260813-lesson11-groups7-9-204";
import { installUiRenderingGlobals } from "../ui/rendering/rendering.mjs?v=20260813-lesson11-groups7-9-204";
import { installClassicalShellGlobals } from "../ui/shell/classical_shell.mjs?v=20260813-lesson11-groups7-9-204";
import { installUiStateGlobals } from "../ui/state.mjs?v=20260813-lesson11-groups7-9-204";

let browserBootstrapPromise = null;

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
