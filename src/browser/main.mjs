import { bootstrapBrowserApp } from "../bootstrap/bootstrap.mjs?v=20260811-lesson2-noun-supportive-i-068";

const bootstrapPromise = bootstrapBrowserApp();

export function getClassicalSgrMaterialDeliverySnapshot(
    globalObject = globalThis
) {
    return Object.freeze({
        applicationResults: Object.freeze(Array.from(
            globalObject.getClassicalSgrMaterialApplicationResults?.() || []
        )),
        ownerResults: Object.freeze(Array.from(
            globalObject.getClassicalSgrMaterialOwnerResults?.() || []
        )),
    });
}

if (typeof window !== "undefined") {
    window.__CLASSICAL_MODULE_BOOTSTRAP_PROMISE__ = bootstrapPromise;
}

bootstrapPromise.catch((error) => {
    console.error("Failed to bootstrap the modern module application.", error);
});

export { bootstrapPromise };
