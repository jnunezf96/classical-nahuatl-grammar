"use strict";

const { createSuite } = require("./runner");
const {
    collectNodes,
    createProbeElement,
    setControl,
} = require("./classical_denominal_vnc_result_presentation.test");

function renderRelationalResult(ctx, outputScope = "single") {
    const documentObject = ctx.document;
    const resultRoot = createProbeElement("section");
    resultRoot.dataset.classicalPersonalNameSentenceOperation = "stale";
    resultRoot.dataset.classicalCapabilityAppliedOperation = "stale";
    let relationalApplicationResult = null;
    let relationalParadigmPlan = null;
    let relationalParadigmCoordinates = null;
    let relationalParadigmApplicationResult = null;
    const observedApplicationResults = new Set();
    const unsubscribe =
        ctx.subscribeClassicalGrammarApplicationAtlasObservations(
            observation => {
                if (observation?.operationId === "nnc:relational") {
                    observedApplicationResults.add(
                        observation.applicationResult
                    );
                    if (observation.outputKind === "scalar") {
                        relationalApplicationResult =
                            observation.applicationResult || null;
                    } else if (observation.outputKind === "prepared-plan") {
                        relationalParadigmPlan =
                            observation.canonicalResult || null;
                    } else if (
                        observation.outputKind === "coordinate-projection"
                    ) {
                        relationalParadigmApplicationResult =
                            observation.applicationResult || null;
                        relationalParadigmCoordinates =
                            observation.canonicalResult || null;
                    }
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
        const sourceOption = createProbeElement("option");
        sourceOption.dataset.classicalRelationalStemId = "huan-company";
        sourceOption.dataset.classicalNncSourceStem = "huān";
        sourceOption.dataset.classicalNncSourceMatrix = "huān";
        const sourceSelect = documentObject.getElementById(
            "classical-nnc-source-example"
        );
        sourceSelect.selectedOptions = [sourceOption];
        sourceSelect.value = "relational:huan-company";

        documentObject.getElementById(
            "classical-source-parts"
        ).dataset.classicalSourcePartsMode = "whole-stem";
        setControl(documentObject, "classical-source-whole", "huān");
        setControl(documentObject, "classical-source-embed", "");
        setControl(documentObject, "classical-source-matrix", "");
        setControl(
            documentObject,
            "classical-relational-nnc-operation",
            "relational-nnc"
        );
        setControl(
            documentObject,
            "classical-relational-nnc-option",
            "option-one"
        );
        setControl(
            documentObject,
            "classical-relational-nnc-source-formation",
            "plain-nounstem"
        );
        setControl(
            documentObject,
            "classical-relational-nnc-state",
            "possessive"
        );
        setControl(
            documentObject,
            "classical-relational-nnc-possessor",
            "3sg"
        );
        setControl(
            documentObject,
            "classical-relational-nnc-subject-mode",
            "normal"
        );
        setControl(
            documentObject,
            "classical-relational-nnc-subject",
            "3sg"
        );
        setControl(
            documentObject,
            "classical-rule-logic-nnc-output-scope",
            outputScope
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
            nncOutputScope: outputScope,
        });
        const activeApplicationResult =
            ctx.getActiveClassicalCapabilityApplicationResult?.() || null;
        if (
            activeApplicationResult?.operationId === "nnc:relational"
            && activeApplicationResult.outputKind === "scalar"
        ) {
            relationalApplicationResult = activeApplicationResult;
        }
        return {
            resultRoot,
            relationalApplicationResult,
            relationalApplicationObserved:
                observedApplicationResults.has(relationalApplicationResult),
            relationalParadigmPlan,
            relationalParadigmCoordinates,
            relationalParadigmApplicationResult,
        };
    } finally {
        unsubscribe();
        Object.assign(documentObject, original);
    }
}

function run(ctx = {}) {
    const suite = createSuite(
        "classical_relational_nnc_result_presentation"
    );
    const {
        resultRoot,
        relationalApplicationResult,
        relationalApplicationObserved,
    } = renderRelationalResult(ctx);
    const nodes = collectNodes(resultRoot, () => true);
    const surfaceFrame =
        ctx.getActiveClassicalRuleLogicSurfaceFrame?.() || null;
    const relationalOwnerFrame =
        relationalApplicationResult?.canonicalResult || null;
    const ownerProjection =
        ctx.getClassicalSgrOwnerIssuedProjection?.(surfaceFrame) || null;
    const activeApplicationResult =
        ctx.getActiveClassicalCapabilityApplicationResult?.() || null;
    const activeNavigator =
        ctx.getClassicalCapabilityNavigatorFrame?.(surfaceFrame) || null;
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

    suite.eq(
        "authorized relational scalar uses its exact owner and the standard NNC Result projections",
        {
            owner: {
                status: relationalOwnerFrame?.authorizationStatus || "",
                kind: relationalOwnerFrame?.kind || "",
                exactTypedSlot:
                    relationalOwnerFrame?.typedSlotFrame
                    === relationalOwnerFrame?.nncSlotFrame,
                exactSentenceSlot:
                    relationalOwnerFrame?.sentenceFrame
                        ?.sourceNncSlotFrame
                    === relationalOwnerFrame?.typedSlotFrame,
                formulaProjectionExact:
                    relationalOwnerFrame?.formulaProjection
                        ?.formulaRealization
                    === relationalOwnerFrame?.formula,
                writtenProjectionExact:
                    relationalOwnerFrame?.writtenProjection
                        ?.surfaceRealization
                    === relationalOwnerFrame?.surface,
                exactVisibleOwnerApplication:
                    ownerProjection?.applicationResult
                    === relationalApplicationResult,
                exactVisibleOuterResult:
                    ownerProjection?.canonicalResult
                    === relationalOwnerFrame,
                exactActiveApplication:
                    activeApplicationResult
                    === relationalApplicationResult,
                exactAtlasObservation: relationalApplicationObserved,
                exactActiveNavigator:
                    activeNavigator?.inputRole
                    === "exact-owner-issued-result"
                    && activeNavigator?.exactResult
                        === relationalOwnerFrame,
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
                    diagram?.dataset?.classicalNncDiagrammaticFormat === "true",
                diagramAuthority:
                    diagram?.dataset
                        ?.classicalNuclearClauseDiagramAuthority || "",
                diagramRows: diagramRows.length,
            },
        },
        {
            owner: {
                status: "authorized",
                kind:
                    "classical-nahuatl-relational-nnc-relational-result",
                exactTypedSlot: true,
                exactSentenceSlot: true,
                formulaProjectionExact: true,
                writtenProjectionExact: true,
                exactVisibleOwnerApplication: true,
                exactVisibleOuterResult: true,
                exactActiveApplication: true,
                exactAtlasObservation: true,
                exactActiveNavigator: true,
            },
            rendered: {
                basalUnit: "nnc",
                visualSystem: "grammar-account-surface",
                projectionPath: "standard-nnc-result",
                appliedOperation: "nnc:relational",
                stalePersonalNameMetadataCleared: true,
                singleNnc: true,
                surface: "Īhuān.",
                linearFormula: "#Ø-Ø+ī-Ø(huān)Ø-Ø#",
                sentenceFormula: "#Ø-Ø+ī-Ø(huān)Ø-Ø#.",
                formulaNodesAreIndependent: true,
                diagramIsNnc: true,
                diagramAuthority: "typed-nnc-slots",
                diagramRows: 2,
            },
        }
    );

    const paradigm = renderRelationalResult(ctx, "paradigm");
    const paradigmNodes = collectNodes(paradigm.resultRoot, () => true);
    const paradigmWrapper = paradigmNodes.find(node => (
        node.dataset?.classicalRelationalNncParadigmResult === "true"
    ));
    const paradigmTable = paradigmNodes.find(node => (
        node.tagName === "TABLE"
        && node.dataset?.classicalRelationalNncParadigm === "true"
    ));
    const paradigmRows = paradigmNodes.filter(node => (
        node.tagName === "TR"
        && Boolean(node.dataset?.classicalRelationalNncCoordinate)
    ));
    const projectedCoordinates = Array.isArray(
        paradigm.relationalParadigmCoordinates
    )
        ? paradigm.relationalParadigmCoordinates
        : [];
    const assimilatedCoordinateIndex = paradigm.relationalParadigmPlan
        ?.coordinates?.findIndex(coordinate => (
            coordinate.coordinateId === "normal-2pl:2sg"
        )) ?? -1;
    suite.ok(
        "relational full paradigm is labeled as a paradigm and renders only owner-issued Formula and Surface coordinates",
        Boolean(paradigmWrapper && paradigmTable)
        && paradigmWrapper.classList.contains(
            "classical-rule-surface__relational-nnc-paradigm"
        )
        && paradigmTable.parentElement?.classList.contains(
            "classical-rule-surface__paradigm-table-scroll"
        )
        && paradigmWrapper.dataset.classicalNncSingleForm === "false"
        && !Object.prototype.hasOwnProperty.call(
            paradigmWrapper.dataset,
            "classicalNncSingleFormAuthority"
        )
        && paradigmWrapper.getAttribute("aria-label")
            === "Full NNC paradigm"
        && paradigmNodes.some(node => (
            node.tagName === "H4"
            && node.textContent === "Full paradigm"
        ))
        && paradigm.relationalParadigmPlan?.kind
            === "classical-nahuatl-relational-nnc-prepared-plan"
        && ctx.isClassicalGrammarApplicationResult?.(
            paradigm.relationalParadigmApplicationResult
        ) === true
        && paradigm.relationalParadigmApplicationResult
            ?.authorizationStatus === "authorized"
        && paradigm.relationalParadigmApplicationResult?.operationId
            === "nnc:relational"
        && paradigm.relationalParadigmApplicationResult?.outputKind
            === "coordinate-projection"
        && paradigm.relationalParadigmApplicationResult?.canonicalResult
            === paradigm.relationalParadigmCoordinates
        && paradigmRows.length === projectedCoordinates.length
        && paradigmRows.every((row, index) => (
            row.dataset.classicalRelationalNncCoordinate
                === paradigm.relationalParadigmPlan
                    ?.coordinates?.[index]?.coordinateId
            && row.children?.[2]?.textContent
                === projectedCoordinates[index]?.formula
            && row.children?.[3]?.textContent
                === projectedCoordinates[index]?.surface
        ))
    );

    suite.eq(
        "the Lesson 2 writing owner realizes the relational an plus mo boundary inside the owner-issued paradigm",
        assimilatedCoordinateIndex < 0
            ? null
            : {
                coordinateId:
                    paradigm.relationalParadigmPlan.coordinates[
                        assimilatedCoordinateIndex
                    ].coordinateId,
                formula:
                    projectedCoordinates[assimilatedCoordinateIndex]
                        ?.formula || "",
                surface:
                    projectedCoordinates[assimilatedCoordinateIndex]
                        ?.surface || "",
                renderedFormula:
                    paradigmRows[assimilatedCoordinateIndex]
                        ?.children?.[2]?.textContent || "",
                renderedSurface:
                    paradigmRows[assimilatedCoordinateIndex]
                        ?.children?.[3]?.textContent || "",
            },
        {
            coordinateId: "normal-2pl:2sg",
            formula: "#an-Ø+mo-Ø(huān)Ø-Ø#",
            surface: "ammohuān",
            renderedFormula: "#an-Ø+mo-Ø(huān)Ø-Ø#",
            renderedSurface: "ammohuān",
        }
    );

    return suite;
}

module.exports = { run };
