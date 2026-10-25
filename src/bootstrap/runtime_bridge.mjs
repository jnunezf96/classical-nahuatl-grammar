import { cloneStaticRuntimePaths } from "./runtime_paths.mjs?v=20260904-cehui-nominal-root-430";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs?v=20260904-cehui-nominal-root-430";
import { RUNTIME_MODULE_PATHS } from "../runtime/create_runtime.mjs?v=20261008-apple-reload-recovery-copy-1&reader=42-8-243&cleanup=classical-only-20261009-1&modifier=canonical-20261009-1&continuation=shared-preparation-20261009-1&repair=position-model-20261011-9&makePreview=20261022-1&fixedChoices=20261022-1&nominalSource=20261022-1&startupDelivery=20261022-1&andrewsRelease=20261024-1";

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
