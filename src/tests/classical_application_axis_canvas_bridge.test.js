"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function readJson(relativePath) {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, relativePath), "utf8"));
}

function run() {
    const s = createSuite("classical_application_axis_canvas_bridge");
    const dispositions = readJson("../../docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json");
    const bridge = dispositions.canvasProvenance;
    const semanticScope = readJson("../../docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json");
    const rendering = fs.readFileSync(
        path.resolve(__dirname, "../ui/rendering/rendering.mjs"),
        "utf8"
    );
    const shell = fs.readFileSync(
        path.resolve(__dirname, "../ui/shell/classical_shell.mjs"),
        "utf8"
    );
    const lesson1ChoiceRoutes = {
        "classical.morpheme.inflectional-affix.demote/process-kind":
            "#classical-rule-logic-late-operation, #classical-denominal-vnc-operation",
        "classical.structure.group.compose/group-shape":
            "[data-classical-clause-relation-capture-actions], [data-classical-clause-relation-captures]",
        "classical.structure.meaningful-rank.downgrade/downgrade-mode":
            "#classical-rule-logic-late-operation, #classical-personal-name-reranking",
        "classical.structure.meaningful-rank.source-or-upgrade.validate/transition-mode":
            "#classical-rule-logic-derivation-option, #classical-rule-logic-late-operation, #classical-personal-name-reranking",
        "classical.structure.stem.compound/compound-relation":
            "#classical-rule-logic-late-operation, #classical-rule-logic-compound-matrix, #classical-compound-nnc-structure",
        "classical.structure.stem.form-directly/formation-kind":
            "[data-derivation-type], #classical-rule-logic-derivation-option, #classical-rule-logic-late-operation",
    };
    const interactiveAxisIds = dispositions.entries
        .filter((entry) => entry.surfaceDisposition === "interactive-choice")
        .map((entry) => entry.atomId)
        .sort();
    const bridgeAxisIds = bridge.entries
        .map((entry) => entry.applicationAxisAtomId)
        .sort();
    const atomById = new Map(semanticScope.atoms.map((atom) => [atom.atomId, atom]));
    const linkedAtomIds = [...new Set(bridge.entries.flatMap((entry) => entry.canvasAtomIds))];
    const dispositionByAtomId = new Map(dispositions.entries.map((entry) => [entry.atomId, entry]));
    const invalidLinks = linkedAtomIds.flatMap((atomId) => {
        const atom = atomById.get(atomId);
        return atom
            && atom.force === "grammar-bearing"
            && atom.authorityPolicy?.requiresTypedGrammarOwner === true
            && atom.authorityPolicy?.inventoryAuthorizesGeneration === false
            && atom.authorityPolicy?.evidenceAbsenceBlocksGeneration === false
            && atom.authorityPolicy?.examplesWhitelistRealization === false
            ? []
            : [atomId];
    });
    const missingSelectorBindings = bridgeAxisIds.filter((axisId) => {
        const disposition = dispositionByAtomId.get(axisId);
        return !disposition || !rendering.includes(
            `"${disposition.operationId}/${disposition.axisId}"`
        );
    });

    s.eq("the bridge covers exactly the genuine UI choices", {
        interactiveAxisCount: interactiveAxisIds.length,
        bridgeAxisCount: bridgeAxisIds.length,
        duplicateAxisCount: bridge.entries.length - new Set(bridgeAxisIds).size,
        setDrift: [
            ...interactiveAxisIds.filter((axisId) => !bridgeAxisIds.includes(axisId)),
            ...bridgeAxisIds.filter((axisId) => !interactiveAxisIds.includes(axisId)),
        ],
        emptyMappings: bridge.entries
            .filter((entry) => !Array.isArray(entry.canvasAtomIds) || entry.canvasAtomIds.length === 0)
            .map((entry) => entry.applicationAxisAtomId),
        missingSelectorBindings,
    }, {
        interactiveAxisCount: 66,
        bridgeAxisCount: 66,
        duplicateAxisCount: 0,
        setDrift: [],
        emptyMappings: [],
        missingSelectorBindings: [],
    });

    s.eq("Canvas provenance is grammar-bearing but non-authorizing", {
        bridgeVersion: bridge.version,
        linkedAtomCount: bridge.entries.reduce((count, entry) => count + entry.canvasAtomIds.length, 0),
        uniqueLinkedAtomCount: linkedAtomIds.length,
        exhaustivelyReviewedAtomCount: bridge.counts.exhaustivelyReviewedAtomCount,
        applicationAxesCreatedByAtomAssertions:
            bridge.counts.applicationAxesCreatedByAtomAssertions,
        invalidLinks,
        grammarAuthority: bridge.authority.grammarAuthority,
        semanticOwnerAuthority: bridge.authority.semanticOwnerAuthority,
        canonicalGenerationAuthority: bridge.authority.canonicalGenerationAuthority,
        uiAuthority: bridge.authority.uiAuthority,
        canvasInventoryAuthority: bridge.authority.canvasInventoryAuthority,
        evidenceAbsenceBlocksGeneration: bridge.authority.evidenceAbsenceBlocksGeneration,
    }, {
        bridgeVersion: 2,
        linkedAtomCount: 98,
        uniqueLinkedAtomCount: 89,
        exhaustivelyReviewedAtomCount: 28540,
        applicationAxesCreatedByAtomAssertions: 0,
        invalidLinks: [],
        grammarAuthority: false,
        semanticOwnerAuthority: false,
        canonicalGenerationAuthority: false,
        uiAuthority: "none",
        canvasInventoryAuthority: false,
        evidenceAbsenceBlocksGeneration: false,
    });

    const missingExactLesson1Routes = Object.entries(lesson1ChoiceRoutes)
        .filter(([route, selector]) => !rendering.includes(
            `${JSON.stringify(route)}: ${JSON.stringify(selector)}`
        ))
        .map(([route]) => route);
    const missingNormalControls = [
        "id=\"classical-rule-logic-late-operation\"",
        "id=\"classical-denominal-vnc-operation\"",
        "id=\"classical-personal-name-reranking\"",
        "id=\"classical-rule-logic-derivation-option\"",
        "id=\"classical-rule-logic-compound-matrix\"",
        "id=\"classical-compound-nnc-structure\"",
        "data-derivation-type=\"direct\"",
        "data-classical-clause-relation-capture-actions",
        "data-classical-clause-relation-captures",
    ].filter((needle) => !shell.includes(needle) && !rendering.includes(needle));
    s.eq("the six Lesson 1 choices use real controls on the normal Grammar screen", {
        mappedChoiceCount: Object.keys(lesson1ChoiceRoutes).length,
        missingExactLesson1Routes,
        missingNormalControls,
    }, {
        mappedChoiceCount: 6,
        missingExactLesson1Routes: [],
        missingNormalControls: [],
    });

    return s;
}

module.exports = { run };
