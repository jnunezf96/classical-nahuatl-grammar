"use strict";

const { createSuite } = require("./runner");
const {
    getCanonicalVncTestGrammarFrame,
} = require("./helpers/canonical_grammar_result");

function run(ctx = {}) {
    const s = createSuite("output");

    s.eq(
        "retired output attachment helper cannot mint a parallel result",
        typeof ctx.attachOutputProvenanceGrammarContract,
        "undefined"
    );

    const canonicalGrammarFrame =
        getCanonicalVncTestGrammarFrame(ctx);
    s.eq(
        "owner-issued result projects written and formula output from its canonical pair",
        {
            issued:
                ctx.isIssuedGrammarFrame(canonicalGrammarFrame),
            surfaceForms:
                ctx.getIssuedGrammarFrameCanonicalSurfaceForms(
                    canonicalGrammarFrame
                ),
            pairs:
                ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                    canonicalGrammarFrame
                ).map((pair) => ({
                    surface: pair.surface,
                    formula: pair.andrewsFormulaEcho,
                })),
        },
        {
            issued: true,
            surfaceForms: ["micohuac"],
            pairs: [{
                surface: "micohuac",
                formula: "#0-0(mic-o-hua)0+c-0#",
            }],
        }
    );

    const forgedFrame = {
        ...canonicalGrammarFrame,
        resultFrame: {
            ...canonicalGrammarFrame.resultFrame,
            surface: "POISON-SURFACE",
            surfaceForms: ["POISON-FORMS"],
        },
    };
    s.eq(
        "copied display strings cannot revive output authority",
        {
            issued: ctx.isIssuedGrammarFrame(forgedFrame),
            surfaceForms:
                ctx.getIssuedGrammarFrameCanonicalSurfaceForms(
                    forgedFrame
                ),
            pairs:
                ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                    forgedFrame
                ),
        },
        {
            issued: false,
            surfaceForms: [],
            pairs: [],
        }
    );

    s.eq(
        "causative output provenance retains Andrews stem and causative authority",
        ctx.getOutputProvenanceAndrewsRefs({ derivationType: "causative" }),
        ["Andrews Lesson 7 7.1-7.5", "Andrews Lesson 24 24.1"]
    );

    return s;
}

module.exports = { run };
