"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function functionSlice(source, startName, endName) {
    const start = source.indexOf(`function ${startName}`);
    const end = source.indexOf(`function ${endName}`, start + 1);
    return start >= 0
        ? source.slice(start, end >= 0 ? end : source.length)
        : "";
}

function run(ctx) {
    const s = createSuite("classical_clause_relation_ui");
    const rendering = fs.readFileSync(path.resolve(
        __dirname,
        "..",
        "ui",
        "rendering",
        "rendering.mjs"
    ), "utf8");
    const workflow = functionSlice(
        rendering,
        "createClassicalClauseRelationWorkflow",
        "renderClassicalRuleLogicSurfaceBlock"
    );
    const currentResult = functionSlice(
        rendering,
        "getClassicalClauseRelationCurrentCanonicalResult",
        "getClassicalOwnerIssuedResultProjection"
    );
    const markerSelection = functionSlice(
        rendering,
        "setClassicalClauseRelationMarkerOption",
        "resetClassicalClauseRelationSelections"
    );
    const ownerProjection = functionSlice(
        rendering,
        "getClassicalOwnerIssuedResultProjection",
        "getClassicalClauseRelationMarkerOptions"
    );
    const decisionControl = functionSlice(
        rendering,
        "createClassicalClauseRelationDecisionControl",
        "appendClassicalClauseRelationCaptureCard"
    );

    s.ok(
        "one semantic Clause composition workflow mounts choices in Grammar and keeps only its canonical continuation in Result",
        rendering.includes('title.textContent = "Clause composition"')
        && rendering.includes('workflow.dataset.classicalClauseRelationWorkflow = "true"')
        && rendering.includes("createClassicalClauseRelationWorkflow(surfaceFrame)")
        && rendering.includes("mountClassicalClauseRelationWorkflowInGrammar(")
        && rendering.includes('"classical-grammar-continuation"')
        && rendering.includes('"classical-source-continuation"')
        && rendering.includes("continuationResult?.remove?.()")
        && !rendering.includes("body.appendChild(clauseRelationWorkflow)")
        && !workflow.includes("Lesson 49")
        && !workflow.includes("Lesson 50")
    );

    s.ok(
        "Clause composition presents a guided continuation with explicit choice and determined-structure sections",
        workflow.includes('meta.textContent = "Result continuation"')
        && workflow.includes('"classical-clause-relation-workflow__intro"')
        && workflow.includes('decisionHeading.textContent = "Relation choices"')
        && workflow.includes('derivedHeading.textContent = "Determined structure"')
        && workflow.includes('status.setAttribute("role", "status")')
        && workflow.includes('status.setAttribute("aria-live", "polite")')
    );

    s.ok(
        "early nominal and relational renderers enter the same capture workflow and reuse only owner-issued independent projections",
        rendering.includes(
            "createClassicalClauseRelationWorkflow(frame)"
        )
        && rendering.includes(
            "createClassicalClauseRelationWorkflow(canonical)"
        )
        && ownerProjection.includes(
            "getClassicalClauseRelationCurrentCanonicalResult(surfaceFrame)"
        )
        && ownerProjection.includes("formulaDerivedFromSurface: false")
        && ownerProjection.includes("surfaceDerivedFromFormula: false")
        && !ownerProjection.includes("replace(")
        && !ownerProjection.includes("split(")
    );

    s.ok(
        "capture authority is the exact app-issued current VNC or NNC Result, never a displayed string",
        currentResult.includes(
            "previewCapture"
        )
        && currentResult.includes("surfaceFrame.nncGrammarSurfaceContract")
        && currentResult.includes("|| surfaceFrame.sentenceSurfaceFrame")
        && currentResult.indexOf("surfaceFrame.nncGrammarSurfaceContract")
            < currentResult.indexOf("surfaceFrame.sentenceSurfaceFrame")
        && currentResult.includes("surfaceFrame.state?.vncLateOperationClosureFrame")
        && currentResult.indexOf("surfaceFrame.state?.vncLateOperationClosureFrame")
            < currentResult.indexOf("surfaceFrame.state?.vncApplicationFrame")
        && currentResult.includes("captureClassicalGrammarApplicationResult")
        && currentResult.includes("isClassicalGrammarApplicationResultCapture")
        && currentResult.includes("? candidate")
        && !currentResult.includes("selectedFormula")
        && !currentResult.includes("sentenceSurfaceDisplay")
        && !currentResult.includes("textContent")
    );

    s.ok(
        "marker capture issues a typed Lesson 3 particle Result from its stable identity",
        workflow.includes('"Optional marker Result"')
        && workflow.includes('"Particle Source Result"')
        && workflow.includes("option.value = optionFrame.particleId")
        && workflow.includes("setClassicalClauseRelationMarkerOption(")
        && workflow.includes("Capture particle as ${")
        && workflow.includes("ActiveClassicalClauseRelationMarkerResult")
        && markerSelection.includes("requestClassicalParticleResult(")
        && markerSelection.includes("captureClassicalGrammarApplicationResult")
        && markerSelection.includes("isClassicalGrammarApplicationResultCapture")
        && !markerSelection.includes("option.textContent")
        && !markerSelection.includes("sourceForm")
        && !markerSelection.includes("buildClassicalNahuatlParticleResultFrame")
    );

    s.ok(
        "only the controller's unresolved decision contract becomes editable controls while grammar features remain read-only",
        workflow.includes("decisionContract.decisions")
        && workflow.includes("createClassicalClauseRelationDecisionControl(decision)")
        && workflow.includes('derived.dataset.classicalClauseRelationDerived = "read-only"')
        && workflow.includes('derived.dataset.classicalUserDecision = "false"')
        && workflow.includes('decisionGrid.dataset.classicalClauseRelationDecisionSurface =')
        && workflow.includes('"unresolved-semantic-choices-only"')
    );

    s.ok(
        "the renderer consumes controller-issued availability without reconstructing grammar from Results or diagnostics",
        decisionControl.includes("decision.optionAvailability")
        && decisionControl.includes(
            '"incompatible"'
        )
        && decisionControl.includes('"missing-prerequisite"')
        && decisionControl.includes('status === "available"')
        && decisionControl.includes(
            'option.disabled = status !== "available"'
        )
        && !decisionControl.includes('status === "incompatible") return')
        && decisionControl.includes(
            '"controller-issued"'
        )
        && !decisionControl.includes("unitKind")
        && !decisionControl.includes("sourceKind")
        && !decisionControl.includes("blockReason")
        && !decisionControl.includes("diagnostics")
        && !decisionControl.includes("capture-required")
    );

    s.ok(
        "adjectival modification reuses the same Source captures, semantic controls, application action, and canonical Result renderer",
        rendering.includes('topology: "topology"')
        && rendering.includes('topology: "Modification topology"')
        && workflow.includes(
            '["principal", "adjoined", "dependent", "supplement"]'
        )
        && workflow.includes(
            'decisionContract.relation === "adjectival-modification"'
        )
        && workflow.includes(
            '"canonical-adjectival-modification-application"'
        )
        && workflow.includes(
            "ActiveClassicalClauseRelationResult.presentation?.formula"
        )
        && workflow.includes(
            "ActiveClassicalClauseRelationResult.presentation?.surface"
        )
        && !workflow.includes("AdjectivalNncGeneration")
        && !workflow.includes("adjectivalNnc")
    );

    s.ok(
        "Lessons 51–53 reuse that same typed Source, Grammar, and canonical Result workflow",
        rendering.includes('"object-complement": "Object complement"')
        && rendering.includes(
            '"correlative-conjunction": "Correlative conjunction"'
        )
        && rendering.includes('comparison: "Similarity / comparison"')
        && rendering.includes(
            '"principal-object-id": "principalObjectId"'
        )
        && rendering.includes('"shared-modifier": "sharedModifier"')
        && !rendering.includes(
            '"downstream-operation": "downstreamOperation"'
        )
        && !rendering.includes(
            "getClassicalClauseRelationCurrentTypedSourceFrame"
        )
        && !workflow.includes("currentTypedSourceFrame")
        && workflow.includes(
            "controller.captureCurrentResult(\n              role,\n              currentResult,"
        )
        && workflow.includes(
            '"canonical-clause-composition-application"'
        )
        && workflow.includes('"canonical-comparison-application"')
        && workflow.includes(
            "ActiveClassicalClauseRelationResult.presentation?.formula"
        )
        && workflow.includes(
            "ActiveClassicalClauseRelationResult.presentation?.surface"
        )
    );

    s.ok(
        "Compose delegates through the typed controller and renders only its canonical presentation",
        workflow.includes("controller.compose({")
        && workflow.includes("ActiveClassicalClauseRelationResult.presentation?.formula")
        && workflow.includes("ActiveClassicalClauseRelationResult.presentation?.surface")
        && workflow.includes("recapture-composition-as-${role}")
        && workflow.includes("ActiveClassicalClauseRelationResult.canonicalResult")
        && !workflow.includes("evaluateAdverbialAdjunction(")
    );

    s.ok(
        "restored DOM, URL, storage, lesson metadata, formula text, and surface text are explicitly non-authoritative",
        workflow.includes('workflow.dataset.classicalFormulaStringAuthority = "false"')
        && workflow.includes('workflow.dataset.classicalSurfaceStringAuthority = "false"')
        && workflow.includes('workflow.dataset.classicalDisplayStringAuthority = "false"')
        && workflow.includes('workflow.dataset.classicalUrlStateAuthority = "false"')
        && workflow.includes('workflow.dataset.classicalStoredStateAuthority = "false"')
        && workflow.includes('workflow.dataset.classicalLessonMetadataAuthority = "false"')
        && !workflow.includes("localStorage")
        && !workflow.includes("sessionStorage")
        && !workflow.includes("location.")
        && !workflow.includes("URLSearchParams")
    );

    return s;
}

module.exports = { run };
