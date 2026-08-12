"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_lesson2_writing_owner");
    const source = ctx.issueClassicalNahuatlLesson2WritingSource({
        parts: [
            { role: "embed", value: "tenam" },
            { role: "matrix", value: "ca" },
        ],
        boundaryKind: "compound",
    });
    const written = ctx.writeClassicalNahuatlLesson2Result(source);
    const application = ctx.executeClassicalGrammarApplicationRequest({
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

    s.eq("Lesson 2 creates the written form from ordered grammar parts", {
        source: source.authorizationStatus,
        result: written.authorizationStatus,
        surface: written.surface,
        action: written.boundaryActions?.[0]?.status,
        rule: written.boundaryActions?.[0]?.ruleId,
        ownedFamilies: written.ownedWritingFamilyIds,
        remainingFamilies: written.remainingWritingFamilyIds?.length,
        valid: ctx.isClassicalNahuatlLesson2WrittenResult(written),
    }, {
        source: "authorized",
        result: "authorized",
        surface: "tenanca",
        action: "applied",
        rule: "cn-l2-211-regressive-m-partial",
        ownedFamilies: [
            "sound-and-spelling",
            "internal-stem-boundaries",
            "regressive-assimilation-and-dissimilation",
        ],
        remainingFamilies: 9,
        valid: true,
    });

    s.eq("the normal application Result uses the Lesson 2-owned writing", {
        authorized: application.authorizationStatus,
        grammarParts: application.lesson2WrittenResult?.source?.parts
            ?.map(part => part.value),
        written: application.lesson2WrittenResult?.surface,
        candidate: application.canonicalResult?.wordSurface,
        status: application.lesson2WritingPass?.completionStatus,
        valid: ctx.isClassicalGrammarApplicationResult(application),
    }, {
        authorized: "authorized",
        grammarParts: ["tenam", "ca"],
        written: "tenanca",
        candidate: "tenanca",
        status: "lesson2-application-writing-complete",
        valid: true,
    });

    const bypass = ctx.issueClassicalNahuatlLesson2WritingSource({
        parts: [{ role: "whole-result", value: "tenamca" }],
        boundaryKind: "whole-result",
        result: "tenamca",
    });
    s.eq("a caller cannot submit its own finished Result in place of grammar parts", {
        source: bypass.authorizationStatus,
        reason: bypass.blockReason,
        written: ctx.writeClassicalNahuatlLesson2Result(bypass).authorizationStatus,
    }, {
        source: "blocked",
        reason: "lesson2-caller-supplied-result-forbidden",
        written: "blocked",
    });

    s.eq("the exact boundary rule rejects the broken unchanged spelling", {
        correct: written.surface === "tenanca",
        broken: "tenamca" === written.surface,
    }, {
        correct: true,
        broken: false,
    });

    return s;
}

module.exports = { run };
