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
    const bridge = readJson("../../docs/CLASSICAL_APPLICATION_AXIS_CANVAS_BRIDGE.json");
    const semanticScope = readJson("../../docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json");
    const rendering = fs.readFileSync(
        path.resolve(__dirname, "../ui/rendering/rendering.mjs"),
        "utf8"
    );
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
        interactiveAxisCount: 58,
        bridgeAxisCount: 58,
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
        linkedAtomCount: 86,
        uniqueLinkedAtomCount: 77,
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

    return s;
}

module.exports = { run };
