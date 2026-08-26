import { bootstrapBrowserApp } from "../bootstrap/bootstrap.mjs?v=20260825-class-d-336";

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

function publishBootstrapStatus(status, error = null) {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.classicalBootstrapStatus = status;
    const workbench = document.getElementById("classical-workbench");
    if (workbench) {
        if (status === "ready") {
            workbench.removeAttribute("inert");
            workbench.setAttribute("aria-busy", "false");
        } else {
            workbench.setAttribute("inert", "");
            workbench.setAttribute("aria-busy", "true");
        }
    }
    const projection = document.getElementById("classical-bootstrap-status");
    if (!projection) return;
    projection.dataset.classicalBootstrapStatus = status;
    if (status === "ready") {
        projection.hidden = true;
        return;
    }
    projection.hidden = false;
    projection.classList.add("is-error");
    const message = projection.querySelector(
        "[data-classical-bootstrap-message]"
    );
    if (message) {
        message.textContent = "Grammar OS could not start. Reload the page; if the problem continues, report it.";
    }
    const reload = projection.querySelector(
        "[data-classical-bootstrap-reload]"
    );
    if (reload) reload.hidden = false;
    projection.dataset.classicalBootstrapError = error?.name || "Error";
}

bootstrapPromise.then(
    () => publishBootstrapStatus("ready"),
    error => {
        publishBootstrapStatus("failed", error);
        console.error("Failed to bootstrap the modern module application.", error);
    }
);

export { bootstrapPromise };
