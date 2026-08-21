"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    currentBrowserCacheKey,
    usesBrowserCacheKey,
} = require("./helpers/browser_cache_chain");

function read(root, relativePath) {
    return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function run() {
    const suite = createSuite("classical_nested_control_ledger_contract");
    const root = path.resolve(__dirname, "..", "..");
    const ledgerModule = read(
        root,
        "src/ui/diagnostics/classical_nested_control_ledger.mjs"
    );
    const bootstrap = read(root, "src/bootstrap/bootstrap.mjs");
    const index = read(root, "index.html");
    const main = read(root, "src/browser/main.mjs");
    const cacheKey = currentBrowserCacheKey(index);

    suite.ok(
        "the ledger derives all three panels and their named nested sections from the delivered DOM",
        ["source", "grammar", "result"].every(panel => (
            ledgerModule.includes(`id: "${panel}"`)
        ))
            && ledgerModule.includes("data-classical-source-outline-section")
            && ledgerModule.includes("data-classical-vnc-grammar-section")
            && ledgerModule.includes("data-classical-nnc-grammar-section")
            && ledgerModule.includes("data-classical-result-outline-section")
            && ledgerModule.includes("data-classical-source-path-lane")
            && ledgerModule.includes("`${sectionRecord.sourcePathUnit}-source-path`")
            && ledgerModule.includes("`${sectionRecord.unit}-grammar`")
            && ledgerModule.includes("const sectionKey = `${identity.unit || spec.id}:${identity.id}`")
    );
    suite.ok(
        "each mapped control carries identity, label, nesting path, bindings, choices, and live state",
        ledgerModule.includes("function describeControl(")
            && ledgerModule.includes("label: controlLabel(control)")
            && ledgerModule.includes("bindings: dataBindings(control)")
            && ledgerModule.includes("selectedLabel:")
            && ledgerModule.includes("optionCount: options.length")
            && ledgerModule.includes("visible: isVisible(element)")
    );
    suite.ok(
        "selects, buttons, radios, and checkboxes all contribute generated pathways",
        ledgerModule.includes("function buildPathwayMap(documentObject, surfaceInventory = null)")
            && ledgerModule.includes('querySelectorAll?.("select")')
            && ledgerModule.includes("function describeButtonPathways(documentObject)")
            && ledgerModule.includes('kind: "button-choice"')
            && ledgerModule.includes('kind: "button-action"')
            && ledgerModule.includes("function describeInputPathways(documentObject)")
            && ledgerModule.includes('"radio-choice" : "checkbox-choice"')
            && ledgerModule.includes("pathways,")
    );
    suite.ok(
        "Source operations retain their Source, Grammar, Result, availability, and revealed-control pathway facts",
        ledgerModule.includes('select.id === "classical-construction-operation"')
            && ledgerModule.includes('kind: sourceOperation ? "source-operation"')
            && ledgerModule.includes("classicalSourceUnit")
            && ledgerModule.includes("classicalGrammarOperation")
            && ledgerModule.includes("classicalResultUnit")
            && ledgerModule.includes("function sourceOperationStages(choice, select)")
            && ledgerModule.includes('panel: "source"')
            && ledgerModule.includes('panel: "grammar"')
            && ledgerModule.includes('panel: "result"')
            && ledgerModule.includes("stages: sourceOperation ? sourceOperationStages(option, select) : []")
            && ledgerModule.includes("revealsControls: revealMap.get(value) || []")
            && ledgerModule.includes("availableSourceOperations")
    );
    suite.ok(
        "the route cast discovers the delivered operation inventory and every owned route node without a route-name list",
        ledgerModule.includes("function constructionOperationIds(element)")
            && ledgerModule.includes('querySelectorAll?.("[data-construction-for]")')
            && ledgerModule.includes("function constructionRevealMap(documentObject, axisEvidence = new Map())")
            && ledgerModule.includes("function constructionReadOnlyFactMap(documentObject)")
            && ledgerModule.includes("function buildSourceOperationRouteCast(")
            && ledgerModule.includes("sourceOperationRoutes: sourceOperationCast")
            && ledgerModule.includes("nodeRelationships: nodeRelationships.length")
            && ledgerModule.includes("uniqueNodes: uniqueNodes.size")
            && ledgerModule.includes('id: `${unit}:${route.id}`')
            && ledgerModule.includes("sourceQualifiedPaths: sourceQualifiedPaths.length")
            && !ledgerModule.includes("CUSTOM_ROUTES")
    );
    suite.ok(
        "the anthill map joins every genuine user-choice axis to its controls, routes, and Canvas atoms",
        ledgerModule.includes("function applicationAxisEvidenceMap(")
            && ledgerModule.includes("function applicationAxisBindings(")
            && ledgerModule.includes("function buildApplicationAxisCast(")
            && ledgerModule.includes('kind: "classical-source-grammar-result-anthill-map"')
            && ledgerModule.includes("sourceOperationRoutes: sourceOperationCast")
            && ledgerModule.includes("userChoiceAxes: applicationAxisCast")
            && ledgerModule.includes("canvasAtomIds: Array.from(axis.canvasAtomIds || [])")
            && ledgerModule.includes("routeLinkedAxes:")
            && ledgerModule.includes("missingCanvasProvenance:")
            && ledgerModule.includes("unboundAxes:")
            && ledgerModule.includes("grammarAuthority: false")
            && ledgerModule.includes("canvasProvenanceAuthority: false")
    );
    suite.ok(
        "the route cast keeps interactive choices and informational prerequisite states distinct",
        ledgerModule.includes('kind: "interactive-control"')
            && ledgerModule.includes("const state = controlState(control)")
            && ledgerModule.includes("state,")
            && ledgerModule.includes('kind: "read-only-fact"')
            && ledgerModule.includes('? "choices-visible"')
            && ledgerModule.includes('? "readout-only"')
            && ledgerModule.includes('? "direct-generation"')
            && ledgerModule.includes('"no-visible-route-node"')
    );
    suite.ok(
        "the route cast records physical Source or Grammar ownership and detects real structural dead ends",
        ledgerModule.includes("function routeNodeOwner(element, documentObject)")
            && ledgerModule.includes('placement: sourceHost')
            && ledgerModule.includes('? "source-analysis"')
            && ledgerModule.includes('? "grammar-formation"')
            && ledgerModule.includes('"route-node-outside-source-or-grammar-lane"')
            && ledgerModule.includes('"inactive-route-node-visible"')
            && ledgerModule.includes("node.routeIds?.includes(selectedRouteId)")
            && ledgerModule.includes('"custom-route-has-no-nodes"')
            && ledgerModule.includes("misplacedRoutes:")
            && ledgerModule.includes("staleRoutes:")
            && ledgerModule.includes("orphanRouteIds:")
    );
    suite.ok(
        "polymorphic Source operations retain their declared Result promise and resolve the selected live Result",
        ledgerModule.includes("declaredResolvedResultUnit")
            && ledgerModule.includes('classicalRuleLogicSurfaceUnit')
            && /resolution:\s*\["nnc", "vnc"\]\.includes\(liveResultUnit\)/.test(ledgerModule)
            && ledgerModule.includes('? "live-presentation"')
            && ledgerModule.includes(': "declared-route"')
            && ledgerModule.includes("declaredResultUnit:")
            && ledgerModule.includes("currentResultUnit:")
    );
    suite.ok(
        "the live route record distinguishes Source unit, selected operation, and terminal Result state",
        ledgerModule.includes("schemaVersion: 3")
            && ledgerModule.includes("function describeCurrentResultRoute(documentObject, grammarRoot)")
            && ledgerModule.includes("sourceUnit: String(sourceRoot?.dataset?.classicalSourcePathUnit")
            && ledgerModule.includes("selectedOperation: String(operation?.value")
            && ledgerModule.includes("unit: presentationUnit || renderedUnit")
            && ledgerModule.includes("presentationUnit,")
            && ledgerModule.includes("renderedUnit,")
            && ledgerModule.includes("classicalNahuatlSurfaceStatus")
            && ledgerModule.includes("classicalBlockReason")
            && ledgerModule.includes('terminal: ["authorized", "blocked"].includes(status)')
            && ledgerModule.includes("primaryAnswerCount:")
            && !ledgerModule.includes("expectedFormula")
            && !ledgerModule.includes("expectedSurface")
    );
    suite.ok(
        "the ledger keeps Source operation inside the active VNC or NNC path",
        ledgerModule.includes("sourcePathUnit")
            && ledgerModule.includes("sourcePathStep")
            && ledgerModule.includes("section.dataset?.classicalSourcePathLane")
            && ledgerModule.includes("section.closest?.(\"#classical-source-parts\")")
            && ledgerModule.includes("sourcePathUnit: sectionRecord.sourcePathUnit")
            && ledgerModule.includes("sourcePathStep: sectionRecord.sourcePathStep")
    );
    suite.ok(
        "the ledger updates itself for DOM, route, and user-control changes",
        ledgerModule.includes("new MutationObserverConstructor(schedule)")
            && ["change", "click", "input"].every(eventName => (
                ledgerModule.includes(`\"${eventName}\"`)
            ))
            && ledgerModule.includes('addEventListener?.("hashchange", schedule)')
            && ledgerModule.includes("__CLASSICAL_NESTED_CONTROL_LEDGER__")
            && ledgerModule.includes('"classical-nested-control-ledger"')
            && ledgerModule.includes('projection.type = "application/json"')
            && ledgerModule.includes("classical:nested-control-ledger-updated")
    );
    suite.ok(
        "the descriptive ledger cannot authorize grammar or UI",
        ledgerModule.includes("grammarAuthority: false")
            && ledgerModule.includes("uiAuthority: false")
            && ledgerModule.includes("proofOnly: true")
            && ledgerModule.includes("never creates or authorizes grammar behavior")
    );
    suite.ok(
        "browser bootstrap installs the ledger after the live interface initializes",
        bootstrap.includes("installClassicalNestedControlLedger,")
            && bootstrap.includes("await globalObject.initializeUiRuntime();")
            && bootstrap.indexOf("installClassicalNestedControlLedger({ globalObject, documentObject });")
                > bootstrap.indexOf("await globalObject.initializeUiRuntime();")
    );
    suite.ok(
        "the browser cache chain delivers the self-updating ledger",
        Boolean(cacheKey)
            && usesBrowserCacheKey(index, "src/browser/main.mjs", cacheKey)
            && usesBrowserCacheKey(main, "bootstrap.mjs", cacheKey)
            && usesBrowserCacheKey(
                bootstrap,
                "classical_nested_control_ledger.mjs",
                cacheKey
            )
    );

    return suite;
}

module.exports = { run };
