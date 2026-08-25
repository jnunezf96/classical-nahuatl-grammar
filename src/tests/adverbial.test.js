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

    const exactVncApplication =
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "cencah",
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "direct",
            requestedVoice: "active",
        });
    const exactVncResult = exactVncApplication.resultFrame;
    const exactPotential =
        ctx.resolveClassicalNahuatlAdverbialPotential({
            canonicalSourceResult: exactVncResult,
        });
    const exactResult = ctx.evaluateClassicalNahuatlAdverbialNuclear({
        canonicalSourceResult: exactVncResult,
    });
    const exactNncSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "cemilhui",
            sourceClass: "tl-1-a",
        });
    const exactNncOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            exactNncSource,
            { state: "absolutive", subject: "3sg" },
        );
    const exactNncResult = ctx.requestClassicalOrdinaryNncResult(
        exactNncSource,
        exactNncOperation,
    );
    const exactNncAdverbial =
        ctx.evaluateClassicalNahuatlAdverbialNuclear({
            canonicalSourceResult: exactNncResult,
        });
    const exactClauseResult =
        ctx.buildClassicalNahuatlVncSentenceResultFrame(
            exactVncApplication,
        );
    const exactClauseAdverbial =
        ctx.evaluateClassicalNahuatlAdverbialNuclear({
            canonicalSourceResult: exactClauseResult,
        });
    const copiedExactResult =
        ctx.evaluateClassicalNahuatlAdverbialNuclear({
            canonicalSourceResult: { ...exactVncResult },
        });
    const stringExactResult =
        ctx.evaluateClassicalNahuatlAdverbialNuclear({
            canonicalSourceResult: "cencah",
        });
    const mixedExactResult =
        ctx.evaluateClassicalNahuatlAdverbialNuclear({
            canonicalSourceResult: exactVncResult,
            adverbialPotentialFrame: source,
        });
    s.eq("adverbial formation consumes exact VNC Results without losing identity", {
        potential: [
            exactPotential.authorizationStatus,
            exactPotential.sourceInputMode,
            exactPotential.canonicalSourceResult === exactVncResult,
            exactPotential.exactSourceResolution?.canonicalSourceResult
                === exactVncResult,
            exactPotential.exactSourceResultIdentityPreserved,
        ],
        result: [
            exactResult.authorizationStatus,
            ctx.isClassicalNahuatlAdverbialNuclearResult(exactResult),
            exactResult.wordSurface,
            exactResult.canonicalSourceResult === exactVncResult,
            exactResult.exactSourceResultIdentityPreserved,
        ],
        nnc: [
            exactNncAdverbial.authorizationStatus,
            exactNncAdverbial.wordSurface,
            exactNncAdverbial.canonicalSourceResult === exactNncResult,
        ],
        clause: [
            exactClauseAdverbial.authorizationStatus,
            exactClauseAdverbial.wordSurface,
            exactClauseAdverbial.canonicalSourceResult
                === exactClauseResult,
            exactClauseAdverbial.exactSourceResolution?.sourceUnitKind,
        ],
        copied: [
            copiedExactResult.authorizationStatus,
            copiedExactResult.blockReason,
        ],
        string: [
            stringExactResult.authorizationStatus,
            stringExactResult.blockReason,
        ],
        mixed: [
            mixedExactResult.authorizationStatus,
            mixedExactResult.blockReason,
        ],
    }, {
        potential: [
            "authorized",
            "exact-owner-issued-vnc-nnc-or-clause-result",
            true,
            true,
            true,
        ],
        result: ["authorized", true, "cencah", true, true],
        nnc: ["authorized", "cemilhuitl", true],
        clause: ["authorized", "cencah", true, "clause"],
        copied: [
            "blocked",
            "exact-owner-issued-vnc-nnc-or-clause-result-required",
        ],
        string: [
            "blocked",
            "exact-owner-issued-vnc-nnc-or-clause-result-required",
        ],
        mixed: [
            "blocked",
            "canonical-source-result-and-adverbial-potential-are-mutually-exclusive",
        ],
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
