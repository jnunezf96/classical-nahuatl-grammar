import { cloneStaticRuntimePaths } from "./runtime_paths.mjs?v=20260726-lessons2-58-one-system-094";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs?v=20260726-lessons2-58-one-system-094";
import { RUNTIME_MODULE_PATHS } from "../runtime/create_runtime.mjs?v=20260811-lesson2-syllable-035";

export function installRuntimeBridge(globalObject = globalThis, runtime = {}) {
    if (!globalObject || typeof globalObject !== "object") {
        return null;
    }
    const runtimeConfig = runtime.runtimeConfig || globalObject.__CLASSICAL_RUNTIME_CONFIG__ || createRuntimeConfigSnapshot();
    const bridge = {
        mode: runtime.mode || null,
        entrypoint: runtime.entrypoint || null,
        runtimeConfig,
        runtimePaths: runtimeConfig.paths || cloneStaticRuntimePaths(),
        manifests: {
            modules: [...RUNTIME_MODULE_PATHS],
        },
        esmPreloads: runtime.esmPreloads || globalObject.__CLASSICAL_ESM_PRELOADS__ || [],
        moduleRuntimeMode: runtime.moduleRuntimeMode || null,
        scriptExecutionDisabled: runtime.scriptExecutionDisabled === true,
        bootstrapBrowserApp: runtime.bootstrapBrowserApp || globalObject.bootstrapBrowserApp || null,
        initializeUiRuntime: runtime.initializeUiRuntime || globalObject.initializeUiRuntime || null,
        createModuleRuntime: runtime.createModuleRuntime || globalObject.createModuleRuntime || null,
    };
    globalObject.__CLASSICAL_RUNTIME_PATHS__ = bridge.runtimePaths;
    globalObject.__CLASSICAL_RUNTIME_CONFIG__ = bridge.runtimeConfig;
    globalObject.__CLASSICAL_ESM_PRELOADS__ = bridge.esmPreloads;
    globalObject.__CLASSICAL_BOOTSTRAP__ = bridge;
    return bridge;
}
