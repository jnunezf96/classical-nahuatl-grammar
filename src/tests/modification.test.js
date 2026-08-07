"use strict";

const { createSuite } = require("./runner");

function issueNnc(ctx, stem) {
    const source = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject: "3sg",
        nounClass: "zero",
        animacy: "animate",
    });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [
            source.nncSlotFrame,
            { sentenceType: "assertion", polarity: "positive" },
        ],
    });
}

function run(ctx = {}) {
    const s = createSuite("modification");

    s.eq(
        "the duplicate modification AST and candidate runtime is absent",
        [
            "buildAdjectivalModificationAst",
            "buildAdjectivalModificationClauseNode",
            "classifyAdjectivalModificationCandidate",
            "classifyAdjectivalModificationFalsePositive",
            "getAdjectivalModificationSurfaceForms",
            "getAdjectivalModificationSelectedRealizationVariant",
        ].map(name => [name, typeof ctx[name]]),
        [
            ["buildAdjectivalModificationAst", "undefined"],
            ["buildAdjectivalModificationClauseNode", "undefined"],
            ["classifyAdjectivalModificationCandidate", "undefined"],
            ["classifyAdjectivalModificationFalsePositive", "undefined"],
            ["getAdjectivalModificationSurfaceForms", "undefined"],
            ["getAdjectivalModificationSelectedRealizationVariant", "undefined"],
        ]
    );

    const head = issueNnc(ctx, "cueitl");
    const modifier = issueNnc(ctx, "canahuac");
    const canonical =
        ctx.requestClassicalAdjectivalModificationResult({
            operationKind: "adjectival-modification",
            topology: "ordinary",
            head: head.canonicalResult,
            modifier: modifier.canonicalResult,
        });
    let hostileError = "";
    try {
        ctx.requestClassicalAdjectivalModificationResult({
            operationKind: "adjectival-modification",
            topology: "ordinary",
            head: head.canonicalResult,
            modifier: modifier.canonicalResult,
            formula: "#caller#",
            surface: "Caller answer.",
        });
    } catch (error) {
        hostileError = String(error?.message || error);
    }

    s.eq(
        "the Lessons 40-43 owner independently projects canonical formula and written composition",
        {
            canonical: [
                canonical.authorizationStatus,
                canonical.formulaProjection?.result,
                canonical.writtenProjection?.result,
                canonical.formulaProjection
                    ?.derivedFromWrittenProjection,
                canonical.writtenProjection
                    ?.derivedFromFormulaProjection,
                ctx.isClassicalNahuatlResultFrame(canonical),
                canonical.formulaStringAuthority,
                canonical.surfaceStringAuthority,
            ],
            hostileError,
        },
        {
            canonical: [
                "authorized",
                "#0-0(cueitl)0-0# #0-0(canahuac)0-0#",
                "Cueitl canahuac.",
                false,
                false,
                true,
                false,
                false,
            ],
            hostileError:
                "classical-grammar-application-request-invalid:"
                + "forbidden-authority:formula",
        }
    );

    return s;
}

module.exports = { run };
