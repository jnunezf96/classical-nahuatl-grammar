"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_lesson2_required_writing_pass");
    const request = value => ctx.executeClassicalGrammarApplicationRequest(value);

    const compound = request({
        operationId: "grammar:nominal-construction",
        args: [{
            constructionKind: "compound-nnc",
            structure: "integrated",
            embedRole: "association",
            possessorOrientation: "matrix",
            subject: "3sg",
            state: "absolutive",
            animacy: "animate",
            source: {
                embedStem: "tenam",
                matrixStem: "ca",
                matrixClass: "zero",
                structure: "integrated",
                embedRole: "association",
            },
        }],
    });
    const assimilation = request({
        operationId: "phonology:assimilation",
        args: [{
            leftConsonant: "m",
            rightConsonant: "k",
            grammaticalConstruction: true,
        }],
    });
    const nonWriting = request({
        operationId: "concept:classification",
        args: [{ candidate: "morpheme", category: "morpheme" }],
    });

    s.eq("all normal compound writing enters every Lesson 2 family before Result", {
        authorized: compound.authorizationStatus,
        stem: compound.canonicalResult?.operationFrame?.compoundStem,
        word: compound.canonicalResult?.wordSurface,
        required: compound.lesson2WritingPass?.required,
        entered: compound.lesson2WritingPass?.entered,
        families: compound.lesson2WritingPass?.familyPasses?.length,
        everyFamilyEntered: compound.lesson2WritingPass?.familyPasses?.every(
            family => family.entered === true
        ),
        status: compound.lesson2WritingPass?.completionStatus,
        enforced: compound.greatestCommonDivisor?.invariantProofs?.[
            "lesson2-writing-pass"
        ],
    }, {
        authorized: "authorized",
        stem: "tenan-ca",
        word: "tenanca",
        required: true,
        entered: true,
        families: 12,
        everyFamilyEntered: false,
        status: "lesson2-owned-compound-boundary-writing",
        enforced: true,
    });

    s.eq("a direct Lesson 2 writing operation also enters the same required pass", {
        spelling: assimilation.canonicalResult?.outputSpelling,
        required: assimilation.lesson2WritingPass?.required,
        entered: assimilation.lesson2WritingPass?.entered,
        families: assimilation.lesson2WritingPass?.familyPasses?.length,
        enforced: assimilation.greatestCommonDivisor?.invariantProofs?.[
            "lesson2-writing-pass"
        ],
    }, {
        spelling: "nc",
        required: true,
        entered: true,
        families: 12,
        enforced: true,
    });

    s.eq("a result with no writing does not pretend that Lesson 2 was required", {
        required: nonWriting.lesson2WritingPass?.required,
        entered: nonWriting.lesson2WritingPass?.entered,
        allFamiliesRouted: nonWriting.lesson2WritingPass?.allTwelveFamiliesRouted,
    }, {
        required: false,
        entered: false,
        allFamiliesRouted: false,
    });

    s.eq("the application accepts only its issued results with the required pass", {
        compound: ctx.isClassicalGrammarApplicationResult(compound),
        assimilation: ctx.isClassicalGrammarApplicationResult(assimilation),
        copied: ctx.isClassicalGrammarApplicationResult(structuredClone(compound)),
    }, {
        compound: true,
        assimilation: true,
        copied: false,
    });

    return s;
}

module.exports = { run };
