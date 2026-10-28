import {activateDeferredFonts} from "./deferred_fonts.mjs?v=20261022-startup-1";
import { bootstrapBrowserApp } from "../bootstrap/bootstrap.mjs?verbalDerivation=20261028-2&derivedFormation=20261028-1&nominalSession=20261028-1&denominalChoices=20261027-1&eventChoices=20261027-2&participantConnections=20261026-2&locationChoices=20261026-1&countingChoices=20261026-1&nominalChoices=20261026-1&compoundChoices=20261026-1&derivationChoices=20261026-2&sentenceChoices=20261026-1&choiceArchitecture=20261026-15&firstSource=20261026-1&dimensionClear=20261026-2&sourceGuidance=20261026-1&icDimension=20261026-1&comparisonSource=20261026-1&reasonPresentation=20261026-1&nucleusEdit=20261024-9&deverbalReload=20261024-8&possessive=20261024-3&stemNominal=20261024-2&stemReload=20261024-2&futureObject=20261024-3&innerSource=20261024-1&innerParticle=20261024-1&innerVnc=20261024-1&innerNnc=20261024-1&mixedInner=20261024-1&remainingReload=20261024-1&conjunctReload=20261023-7&operationFirst=20261023-4&vncEdit=20261023-6&nncReinflection=20261023-5&repeatConjunct=20261023-1&conjunctEdit=20261023-2&conjunction=20261023-2&clauseHarmony=20261023-5&clickFeedback=20261023-2&honorificAttachment=20261023-2&formulaSlots=20261023-24&longVowels=20261022-1&v=20261008-apple-operation-gate-2&choices=20261013-build-constructions-2&design=lesson42-path-27&loading=1&panel=33&reader=42-10-275&cleanup=classical-only-20261009-1&modifier=canonical-20261009-1&continuation=shared-preparation-20261009-1&repair=position-model-20261012-25&audit=20261013-source-facts-1&remaining=20261013-inventory-1&caseMeta=20261013-1&navigation=20261014-1&placement=20261014-1&operationMenu=20261014-2&choicesLayout=20261014-4&exampleMirror=20261014-1&resultEditing=20261014-8&pickerTransport=20261014-1&sourceAdmission=20261014-3&operationClear=20261014-1&routeShapes=20261021-1&subjectTransition=20261021-29&makePreview=20261022-1&fixedChoices=20261022-1&nominalSource=20261022-1&startupDelivery=20261022-1&nominalReload=20261024-4&andrewsRelease=20261024-1&ad102=20261024-1&andrewsCorrections=20261024-1&interfaceRelease=1.2.37&negativeAttachment=20261025-1&coyoteWalking=20261025-1&ompaCopula=20261025-1&imaltepeuh=20261025-1&includedSupportiveI=20261025-2&proxyPossessor=20261025-2&huicContinuation=20261025-1&complexReload=20261027-2&choiceGuidance=20261027-2&sourceNavigation=20261027-1&nameReload=20261028-13&operationPilot=20261027-1&similarityPilot=20261028-1&comparativePilot=20261028-5&panahuiaPilot=20261028-1&reduplicativePilot=20261028-1&specifiedPilot=20261028-4&equalitySizePilot=20261028-1&degreePilot=20261028-1&sourceSimilarityPilot=20261028-1&verbalSimilarityPilot=20261028-2&ownerProtocol=20261028-1&conjunctionSession=20261028-1&complementSession=20261028-1&acceptanceRecovery=20261028-1&issuedBinding=20261028-1";

if (typeof document !== "undefined") activateDeferredFonts(document);
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
    const presentationReady = document.documentElement.dataset.classicalPresentationStatus === "ready";
    const waitingForPresentation = status === "ready" && !presentationReady;
    document.documentElement.dataset.classicalBootstrapPhase = waitingForPresentation ? "presentation" : status;
    const workbench = document.getElementById("classical-workbench");
    if (workbench) {
        if (status === "ready" && presentationReady) {
            workbench.removeAttribute("inert");
            workbench.setAttribute("aria-busy", "false");
        } else {
            workbench.setAttribute("inert", "");
            workbench.setAttribute("aria-busy", "true");
        }
    }
    const projection = document.getElementById("classical-bootstrap-status");
    if (!projection) return;
    projection.dataset.classicalBootstrapStatus = waitingForPresentation ? "loading" : status;
    if (waitingForPresentation) {
        projection.hidden = false;
        return;
    }
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

// Runtime readiness precedes the composition module's first layout pass.
// Keep the stable loading shell until both are ready, regardless of order.
if (typeof document !== "undefined") {
    document.addEventListener("classical:presentation-ready", () => {
        document.documentElement.dataset.classicalPresentationStatus = "ready";
        if (document.documentElement.dataset.classicalBootstrapStatus === "ready") {
            publishBootstrapStatus("ready");
        }
    }, { once: true });
    document.addEventListener("classical:presentation-failed", event => {
        publishBootstrapStatus("failed", event.detail);
    }, { once: true });
}

bootstrapPromise.then(
    () => publishBootstrapStatus("ready"),
    error => {
        publishBootstrapStatus("failed", error);
        console.error("Failed to bootstrap the modern module application.", error);
    }
);

export { bootstrapPromise };
