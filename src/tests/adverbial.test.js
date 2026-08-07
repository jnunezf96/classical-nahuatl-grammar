"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("adverbial");
    const source = ctx.resolveClassicalNahuatlAdverbialPotential({
        stem: "cencah",
        clauseKind: "vnc",
    });
    const result = ctx.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: source,
    });
    const copiedSource = JSON.parse(JSON.stringify(source));
    const copiedResult = ctx.evaluateClassicalNahuatlAdverbialNuclear({
        adverbialPotentialFrame: copiedSource,
    });

    s.eq("adverbial nuclear generation uses the canonical typed application path", {
        sourceAuthorized:
            ctx.isClassicalNahuatlAdverbialPotentialFrame(source),
        resultAuthorized:
            ctx.isClassicalNahuatlAdverbialNuclearResult(result),
        formula: result.formulaRealization,
        surface: result.wordSurface,
        copiedSourceStatus: copiedResult.authorizationStatus,
        copiedSourceReason: copiedResult.blockReason,
    }, {
        sourceAuthorized: true,
        resultAuthorized: true,
        formula: "#Ø-Ø(cen-ca-h)Ø+⎕-Ø#",
        surface: "cencah",
        copiedSourceStatus: "blocked",
        copiedSourceReason: "owner-issued-adverbial-potential-frame-required",
    });

    const engineSource = fs.readFileSync(
        path.resolve(
            __dirname,
            "..",
            "core",
            "generation",
            "engine.mjs"
        ),
        "utf8"
    );
    s.eq("obsolete classifier, candidate, and generated-metadata lanes are not public or consumed", {
        classifier: typeof ctx.classifyAdverbialNuclearCandidate,
        clauseFrame: typeof ctx.buildAdverbialNuclearClauseFrame,
        generatedMetadata:
            typeof ctx.buildGeneratedAdverbialNuclearFrameMetadata,
        engineConsumesClassifier:
            engineSource.includes("classifyAdverbialNuclearCandidate"),
        engineEmitsLegacyFrame:
            engineSource.includes("adverbialNuclearFrame,"),
    }, {
        classifier: "undefined",
        clauseFrame: "undefined",
        generatedMetadata: "undefined",
        engineConsumesClassifier: false,
        engineEmitsLegacyFrame: false,
    });

    return s;
}

module.exports = { run };
