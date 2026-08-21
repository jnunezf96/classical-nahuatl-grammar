"use strict";

const { createSuite } = require("./runner");
const {
    CLASSICAL_SGR_MATERIAL_OUTCOME_SCHEMA,
    createClassicalSgrMaterialBrowserAudit,
} = require("./helpers/classical_sgr_material_browser_audit.mjs");

function makeElement(attributes = {}) {
    const element = {
        tagName: "DIV",
        hidden: false,
        disabled: false,
        isConnected: true,
        parentElement: null,
        dataset: {
            classicalGrammarAuthority: "false",
        },
        getAttribute(name) {
            return attributes[name] ?? null;
        },
        closest() {
            return null;
        },
    };
    return element;
}

function makeDocument(initialElements = []) {
    let elements = [...initialElements];
    const querySelectors = [];
    const document = {
        defaultView: {
            getComputedStyle() {
                return { display: "block", visibility: "visible" };
            },
        },
        getElementById() {
            return null;
        },
        querySelectorAll(selector) {
            querySelectors.push(selector);
            const match = /^\[([^=\]]+)(?:="([^"]*)")?\]$/u.exec(selector);
            if (!match) return [];
            const [, attributeName, exactValue] = match;
            return elements.filter(element => {
                const value = element.getAttribute(attributeName);
                return value !== null
                    && (exactValue === undefined || value === exactValue);
            });
        },
        replaceElements(nextElements) {
            elements = [...nextElements];
            elements.forEach(element => {
                element.ownerDocument = document;
            });
        },
        getQuerySelectors() {
            return [...querySelectors];
        },
    };
    document.replaceElements(elements);
    return document;
}

function makeWindow(document) {
    return { document };
}

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_material_browser_audit");
    const inventory = ctx.getClassicalSourceGrammarResultSurfaceInventory();
    const publicAtoms = [...inventory.axes, ...inventory.outputs]
        .filter(atom => atom.binding.public === true)
        .sort((left, right) => left.atomId.localeCompare(right.atomId));
    const privateAtoms = [...inventory.axes, ...inventory.outputs]
        .filter(atom => atom.binding.public === false)
        .sort((left, right) => left.atomId.localeCompare(right.atomId));

    suite.eq(
        "the exported deterministic outcome schema names the exact inventory boundary",
        CLASSICAL_SGR_MATERIAL_OUTCOME_SCHEMA,
        {
            kind: "classical-sgr-material-browser-atom-outcome-schema",
            version: 1,
            atomCount: publicAtoms.length + privateAtoms.length,
            publicAtomCount: publicAtoms.length,
            privateAtomCount: privateAtoms.length,
            publicExpectation: "materialized",
            privateExpectation: "private-inert",
            outcomes: [
                "materialized",
                "unmaterialized",
                "private-inert",
                "private-exposed",
            ],
            failureReasonPrecedence: [
                "private-atom-exposed-in-live-dom",
                "dom-correlation-does-not-deny-grammar-authority",
                "interactive-control-is-outside-grammar",
                "readout-is-outside-grammar",
                "output-is-outside-result",
                "output-is-not-inside-a-canonical-result-root",
                "determined-fact-is-rendered-as-a-control",
                "correlation-target-is-not-an-interactive-control",
                "interactive-control-lacks-live-grammar-binding",
                "readout-has-no-canonical-owner-value",
                "analysis-output-has-no-atom-specific-readout",
                "exact-owner-issued-operation-output-result-not-observed",
                "exact-owner-issued-operation-result-not-observed",
                "interactive-control-operation-is-not-active",
                "interactive-control-is-not-currently-available",
                "interactive-control-has-no-live-value-or-options",
                "output-node-does-not-project-a-canonical-result-value",
                "readout-or-result-has-no-live-content",
                "no-correlated-live-dom-node-observed",
                "browser-observation-not-run",
            ],
        }
    );

    const emptyAudit = createClassicalSgrMaterialBrowserAudit(
        makeWindow(makeDocument())
    );
    const emptyReport = emptyAudit.finalize();
    suite.eq(
        "finalize derives one deterministic outcome for every public and private inventory atom",
        {
            atomOutcomeCount: emptyReport.atomOutcomeCount,
            atomOutcomeIds: emptyReport.atomOutcomes.map(entry => entry.atomId),
            inventoryAtomIds: [...publicAtoms, ...privateAtoms]
                .sort((left, right) => left.atomId.localeCompare(right.atomId))
                .map(entry => entry.atomId),
            uniqueOutcomeIds: new Set(
                emptyReport.atomOutcomes.map(entry => entry.atomId)
            ).size,
            outcomeCounts: emptyReport.outcomeCounts,
            atomOutcomePartitionIsExact:
                emptyReport.atomOutcomePartitionIsExact,
        },
        {
            atomOutcomeCount: publicAtoms.length + privateAtoms.length,
            atomOutcomeIds: [...publicAtoms, ...privateAtoms]
                .sort((left, right) => left.atomId.localeCompare(right.atomId))
                .map(entry => entry.atomId),
            inventoryAtomIds: [...publicAtoms, ...privateAtoms]
                .sort((left, right) => left.atomId.localeCompare(right.atomId))
                .map(entry => entry.atomId),
            uniqueOutcomeIds: publicAtoms.length + privateAtoms.length,
            outcomeCounts: {
                materialized: 0,
                unmaterialized: publicAtoms.length,
                privateInert: privateAtoms.length,
                privateExposed: 0,
            },
            atomOutcomePartitionIsExact: true,
        }
    );

    suite.eq(
        "an unrun audit reports public atoms as unmaterialized and private atoms as inert without inventing proof",
        {
            publicOutcomes: [...new Set(
                emptyReport.publicAtomOutcomes.map(entry => entry.outcome)
            )].sort(),
            publicPrimaryReasons: [...new Set(
                emptyReport.publicAtomOutcomes.map(entry => entry.primaryReason)
            )].sort(),
            privateOutcomes: [...new Set(
                emptyReport.privateAtomOutcomes.map(entry => entry.outcome)
            )].sort(),
            privatePrimaryReasons: [...new Set(
                emptyReport.privateAtomOutcomes.map(entry => entry.primaryReason)
            )],
            unmaterializedAliasCount: emptyReport.unmaterializedAtomCount,
            impossibleAliasCount: emptyReport.impossibleAtomCount,
            aliasesMatch: JSON.stringify(emptyReport.unmaterialized)
                === JSON.stringify(emptyReport.impossible),
        },
        {
            publicOutcomes: ["unmaterialized"],
            publicPrimaryReasons: ["browser-observation-not-run"],
            privateOutcomes: ["private-inert"],
            privatePrimaryReasons: [null],
            unmaterializedAliasCount: publicAtoms.length,
            impossibleAliasCount: publicAtoms.length,
            aliasesMatch: true,
        }
    );

    const publicOutput = publicAtoms.find(atom => atom.atomKind === "output");
    const privateAtom = privateAtoms[0];
    const publicElement = makeElement({
        "data-classical-output-contract-id": publicOutput.atomId,
    });
    const privateElement = makeElement(privateAtom.atomKind === "axis"
        ? { "data-classical-surface-atom-id": privateAtom.atomId }
        : { "data-classical-output-contract-id": privateAtom.atomId });
    const observedDocument = makeDocument([publicElement, privateElement]);
    const observedAudit = createClassicalSgrMaterialBrowserAudit(
        makeWindow(observedDocument)
    );
    observedAudit.observe("correlated-but-owner-result-missing");
    observedDocument.replaceElements([]);
    observedAudit.observe("correlation-absent");
    const observedReport = observedAudit.finalize();
    const publicOutcome = observedReport.atomOutcomes.find(
        entry => entry.atomId === publicOutput.atomId
    );
    const privateOutcome = observedReport.atomOutcomes.find(
        entry => entry.atomId === privateAtom.atomId
    );
    suite.eq(
        "failure reasons use declared precedence independent of observation order and private exposure is atom-specific",
        {
            publicOutcome: {
                expectation: publicOutcome.expectation,
                outcome: publicOutcome.outcome,
                passed: publicOutcome.passed,
                primaryReason: publicOutcome.primaryReason,
                reasons: publicOutcome.reasons,
            },
            privateOutcome: {
                expectation: privateOutcome.expectation,
                outcome: privateOutcome.outcome,
                passed: privateOutcome.passed,
                primaryReason: privateOutcome.primaryReason,
                reasons: privateOutcome.reasons,
            },
            privateExposedAtomIds: observedReport.privateExposedAtomIds,
        },
        {
            publicOutcome: {
                expectation: "materialized",
                outcome: "unmaterialized",
                passed: false,
                primaryReason:
                    "exact-owner-issued-operation-output-result-not-observed",
                reasons: [
                    "exact-owner-issued-operation-output-result-not-observed",
                    "no-correlated-live-dom-node-observed",
                ],
            },
            privateOutcome: {
                expectation: "private-inert",
                outcome: "private-exposed",
                passed: false,
                primaryReason: "private-atom-exposed-in-live-dom",
                reasons: ["private-atom-exposed-in-live-dom"],
            },
            privateExposedAtomIds: [privateAtom.atomId],
        }
    );

    const interactiveAtoms = publicAtoms
        .filter(atom => atom.disposition === "interactive-choice")
        .slice(0, 2);
    const multiIdControl = makeElement({
        "data-classical-surface-atom-ids": interactiveAtoms
            .map(atom => atom.atomId)
            .join(" "),
        "data-classical-surface-atom-id": interactiveAtoms[0].atomId,
    });
    multiIdControl.tagName = "SELECT";
    multiIdControl.value = "owner-option";
    multiIdControl.options = [{
        disabled: false,
        value: "owner-option",
        textContent: "Owner option",
    }];
    multiIdControl.dataset.classicalSgrBindingStage = "grammar";
    multiIdControl.closest = selector => (
        selector === "#classical-authority-panel" ? {} : null
    );
    const indexedDocument = makeDocument([multiIdControl]);
    const indexedWindow = makeWindow(indexedDocument);
    indexedWindow.getActiveClassicalRuleLogicSurfaceFrame = () => ({});
    indexedWindow.getClassicalSgrActiveOperationIds = () => (
        interactiveAtoms.map(atom => atom.operationId)
    );
    const indexedAudit = createClassicalSgrMaterialBrowserAudit(indexedWindow);
    indexedAudit.observe("indexed-multi-id-control");
    const indexedReport = indexedAudit.finalize();
    const indexedReceipts = indexedReport.materialReceipts.filter(receipt => (
        interactiveAtoms.some(atom => atom.atomId === receipt.atomId)
    ));
    suite.eq(
        "one observation indexes each correlation attribute once and de-duplicates multi-ID nodes per atom",
        {
            selectors: indexedDocument.getQuerySelectors(),
            receiptAtomIds: indexedReceipts.map(receipt => receipt.atomId),
            uniqueReceiptAtomIds: new Set(
                indexedReceipts.map(receipt => receipt.atomId)
            ).size,
            outcomes: interactiveAtoms.map(atom => {
                const outcome = indexedReport.atomOutcomes.find(
                    entry => entry.atomId === atom.atomId
                );
                return {
                    atomId: outcome.atomId,
                    outcome: outcome.outcome,
                    passed: outcome.passed,
                    reasons: outcome.reasons,
                };
            }),
        },
        {
            selectors: [
                "[data-classical-surface-atom-ids]",
                "[data-classical-surface-atom-id]",
                "[data-classical-output-contract-ids]",
                "[data-classical-output-contract-id]",
            ],
            receiptAtomIds: interactiveAtoms.map(atom => atom.atomId).sort(),
            uniqueReceiptAtomIds: 2,
            outcomes: interactiveAtoms.map(atom => ({
                atomId: atom.atomId,
                outcome: "materialized",
                passed: true,
                reasons: [],
            })),
        }
    );

    let completionError = "";
    try {
        emptyAudit.assertComplete();
    } catch (error) {
        completionError = String(error?.message || error);
    }
    suite.ok(
        "assertComplete names unmaterialized failures while retaining the temporary impossible alias",
        completionError.includes(`unmaterialized:${publicAtoms.length}`)
            && completionError.includes("first-unmaterialized:")
            && completionError.includes(`impossible:${publicAtoms.length}`)
            && completionError.includes("first-impossible:")
    );

    return suite;
}

module.exports = { run };
