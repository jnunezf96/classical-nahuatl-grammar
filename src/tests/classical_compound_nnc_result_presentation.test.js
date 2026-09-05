"use strict";

const { createSuite } = require("./runner");
const {
    collectNodes,
    createProbeElement,
    setControl,
} = require("./classical_denominal_vnc_result_presentation.test");

function renderCompoundResult(ctx) {
    const documentObject = ctx.document;
    const resultRoot = createProbeElement("section");
    resultRoot.dataset.classicalPersonalNameSentenceOperation = "stale";
    resultRoot.dataset.classicalCapabilityAppliedOperation = "stale";
    let compoundApplicationResult = null;
    const unsubscribe =
        ctx.subscribeClassicalGrammarApplicationAtlasObservations(
            observation => {
                if (observation?.operationId
                    === "grammar:nominal-construction") {
                    compoundApplicationResult =
                        observation.applicationResult || null;
                }
            }
        );
    const original = {
        getElementById: documentObject.getElementById,
        querySelector: documentObject.querySelector,
        querySelectorAll: documentObject.querySelectorAll,
        createElement: documentObject.createElement,
        createTextNode: documentObject.createTextNode,
    };
    try {
        documentObject.getElementById(
            "classical-source-parts"
        ).dataset.classicalSourcePartsMode = "embed-matrix";
        setControl(documentObject, "classical-source-whole", "");
        setControl(documentObject, "classical-source-embed", "xōchi");
        setControl(documentObject, "classical-source-matrix", "mox");
        setControl(
            documentObject,
            "classical-construction-operation",
            "compound-nnc"
        );
        setControl(
            documentObject,
            "classical-compound-nnc-structure",
            "integrated"
        );
        setControl(
            documentObject,
            "classical-compound-nnc-embed-role",
            "association"
        );
        setControl(
            documentObject,
            "classical-compound-nnc-possessor-orientation",
            "matrix"
        );
        setControl(
            documentObject,
            "classical-compound-nnc-embed-source-class",
            "zero"
        );
        setControl(
            documentObject,
            "classical-compound-nnc-embed-analysis",
            "ordinary"
        );
        setControl(
            documentObject,
            "classical-rule-logic-nnc-class",
            "zero"
        );
        setControl(
            documentObject,
            "classical-rule-logic-nnc-subject-person",
            "3"
        );
        setControl(
            documentObject,
            "classical-rule-logic-nnc-subject-number",
            "singular"
        );
        setControl(
            documentObject,
            "classical-rule-logic-nnc-state",
            "absolutive"
        );
        setControl(
            documentObject,
            "classical-rule-logic-nnc-possessor",
            "3sg"
        );
        setControl(
            documentObject,
            "classical-rule-logic-nnc-subject-animacy",
            "animate"
        );
        setControl(
            documentObject,
            "classical-construction-reduplication",
            "none"
        );
        setControl(
            documentObject,
            "classical-rule-logic-nnc-output-scope",
            "single"
        );

        documentObject.getElementById = id => (
            String(id) === "classical-rule-logic-surface"
                ? resultRoot
                : original.getElementById.call(documentObject, id)
        );
        documentObject.querySelector = () => null;
        documentObject.querySelectorAll = () => [];
        documentObject.createElement = tagName => createProbeElement(tagName);
        documentObject.createTextNode = value => ({
            nodeType: 3,
            textContent: String(value || ""),
            parentNode: null,
            parentElement: null,
        });

        ctx.renderClassicalRuleLogicSurfaceBlock({
            basalUnit: "nnc",
            nncOutputScope: "single",
        });
        return { resultRoot, compoundApplicationResult };
    } finally {
        unsubscribe();
        Object.assign(documentObject, original);
    }
}

function run(ctx = {}) {
    const suite = createSuite(
        "classical_compound_nnc_result_presentation"
    );
    const {
        resultRoot,
        compoundApplicationResult,
    } = renderCompoundResult(ctx);
    const nodes = collectNodes(resultRoot, () => true);
    const surfaceFrame =
        ctx.getActiveClassicalRuleLogicSurfaceFrame?.() || null;
    const compoundOwnerFrame =
        compoundApplicationResult?.canonicalResult || null;
    const ownerProjection =
        ctx.getClassicalSgrOwnerIssuedProjection?.(surfaceFrame) || null;
    const activeApplicationResult =
        ctx.getActiveClassicalCapabilityApplicationResult?.() || null;
    const activeNavigator =
        ctx.getClassicalCapabilityNavigatorFrame?.(surfaceFrame) || null;
    const grammarControls = ctx.document.getElementById(
        "classical-rule-logic-controls"
    );
    const navigatorHeading = ctx.document.getElementById(
        "classical-capability-navigator-heading"
    );
    const written = nodes.find(node => (
        String(node.className).split(/\s+/u)
            .includes("classical-rule-surface__single-nnc-surface")
    ));
    const linearFormula = nodes.find(node => (
        node.dataset?.classicalNahuatlSelectedOutput === "true"
    ));
    const sentenceFormula = nodes.find(node => (
        node.dataset?.classicalLesson8SentenceFormula === "true"
    ));
    const diagram = nodes.find(node => (
        node.dataset?.classicalNuclearClauseDiagrammaticFormat === "true"
    ));
    const diagramRows = nodes.filter(node => (
        String(node.className).split(/\s+/u)
            .includes("classical-rule-surface__diagram-row")
    ));
    const continueAction = nodes.find(node => (
        node.dataset?.classicalRuleSurfaceAction
            === "use-result-as-source"
    ));

    suite.eq(
        "authorized scalar compound keeps its exact owner in the standard NNC Result",
        {
            owner: {
                status: compoundOwnerFrame?.authorizationStatus || "",
                kind: compoundOwnerFrame?.kind || "",
                constructionKind:
                    compoundOwnerFrame?.constructionKind || "",
                exactTypedSlot:
                    compoundOwnerFrame?.typedSlotFrame
                    === compoundOwnerFrame?.canonicalResult?.nncSlotFrame,
                exactSentenceSlot:
                    compoundOwnerFrame?.sentenceFrame?.sourceNncSlotFrame
                    === compoundOwnerFrame?.typedSlotFrame,
                formulaProjectionExact:
                    compoundOwnerFrame?.formulaProjection
                        ?.formulaRealization
                    === compoundOwnerFrame?.formulaRealization,
                writtenProjectionExact:
                    compoundOwnerFrame?.writtenProjection
                        ?.surfaceRealization
                    === compoundOwnerFrame?.surfaceRealization,
                exactVisibleOwnerApplication:
                    ownerProjection?.applicationResult
                    === compoundApplicationResult,
                exactVisibleOuterResult:
                    ownerProjection?.canonicalResult
                    === compoundOwnerFrame,
                exactActiveApplication:
                    activeApplicationResult
                    === compoundApplicationResult,
                exactActiveNavigator:
                    activeNavigator?.inputRole
                    === "exact-owner-issued-result"
                    && activeNavigator?.exactResult === compoundOwnerFrame,
            },
            rendered: {
                basalUnit: resultRoot.dataset.classicalBasalUnit || "",
                visualSystem:
                    resultRoot.dataset.classicalResultVisualSystem || "",
                projectionPath:
                    resultRoot.dataset.classicalResultProjectionPath || "",
                appliedOperation:
                    resultRoot.dataset
                        .classicalCapabilityAppliedOperation || "",
                grammarContractStatus:
                    grammarControls.dataset
                        .classicalNncGrammarContractStatus || "",
                continuationHeading: navigatorHeading.textContent,
                stalePersonalNameMetadataCleared:
                    !Object.prototype.hasOwnProperty.call(
                        resultRoot.dataset,
                        "classicalPersonalNameSentenceOperation"
                    ),
                singleNnc: nodes.some(node => (
                    node.dataset?.classicalNncSingleForm === "true"
                )),
                surface: String(written?.textContent || ""),
                linearFormula: String(linearFormula?.textContent || ""),
                sentenceFormula: String(sentenceFormula?.textContent || ""),
                formulaNodesAreIndependent:
                    Boolean(linearFormula && sentenceFormula)
                    && linearFormula !== sentenceFormula,
                diagramIsNnc:
                    diagram?.dataset?.classicalNncDiagrammaticFormat
                    === "true",
                diagramAuthority:
                    diagram?.dataset
                        ?.classicalNuclearClauseDiagramAuthority || "",
                diagramRows: diagramRows.length,
                continuationAvailable: Boolean(continueAction),
            },
        },
        {
            owner: {
                status: "authorized",
                kind:
                    "classical-nahuatl-nominal-construction-result-frame",
                constructionKind: "compound-nnc",
                exactTypedSlot: true,
                exactSentenceSlot: true,
                formulaProjectionExact: true,
                writtenProjectionExact: true,
                exactVisibleOwnerApplication: true,
                exactVisibleOuterResult: true,
                exactActiveApplication: true,
                exactActiveNavigator: true,
            },
            rendered: {
                basalUnit: "nnc",
                visualSystem: "grammar-account-surface",
                projectionPath: "standard-nnc-result",
                appliedOperation: "grammar:nominal-construction",
                grammarContractStatus: "valid",
                continuationHeading: "Continue from this exact Result",
                stalePersonalNameMetadataCleared: true,
                singleNnc: true,
                surface: "Xōchimox.",
                linearFormula: "#0-0(xōchi-mox)0-0#",
                sentenceFormula: "#0-0(xōchi-mox)0-0#.",
                formulaNodesAreIndependent: true,
                diagramIsNnc: true,
                diagramAuthority: "typed-nnc-slots",
                diagramRows: 2,
                continuationAvailable: true,
            },
        }
    );

    return suite;
}

module.exports = { run };
