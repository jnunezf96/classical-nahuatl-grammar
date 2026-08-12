"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_lesson2_basic_word_writing_owner");

    const verb = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:finite-slot",
        args: ["nemi", {
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            verbClass: "B",
        }],
    });
    s.eq("a basic verb gives Lesson 2 its grammar parts, not a finished word", {
        authorized: verb.authorizationStatus,
        parts: verb.lesson2WrittenResult?.source?.parts,
        supportiveI: verb.lesson2WrittenResult?.supportiveVowelActions,
        written: verb.lesson2WrittenResult?.surface,
        expected: verb.canonicalResult?.written,
        valid: ctx.isClassicalGrammarApplicationResult(verb),
    }, {
        authorized: "authorized",
        parts: [
            {
                role: "subject-person-1",
                value: "n",
                supportiveI: "insert-before-consonant",
            },
            { role: "verbstem", value: "nemi", supportiveI: "" },
        ],
        supportiveI: [{
            partIndex: 0,
            status: "applied",
            source: "n",
            result: "ni",
        }],
        written: "ninemi",
        expected: "ninemi",
        valid: true,
    });

    const nounSource = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "mich",
    });
    const nounOperation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        nounSource,
        {
            state: "absolutive",
            subject: "1sg",
            sentenceType: "statement",
            polarity: "positive",
        },
    );
    const noun = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:ordinary",
        args: [nounSource, nounOperation],
    });
    s.eq("a basic noun gives Lesson 2 the person, stem, and number parts", {
        authorized: noun.authorizationStatus,
        parts: noun.lesson2WrittenResult?.source?.parts,
        supportiveI: noun.lesson2WrittenResult?.supportiveVowelActions,
        written: noun.lesson2WrittenResult?.surface,
        expected: noun.canonicalResult?.wordSurface,
        valid: ctx.isClassicalGrammarApplicationResult(noun),
    }, {
        authorized: "authorized",
        parts: [
            {
                role: "subject-person-1",
                value: "n",
                supportiveI: "insert-before-consonant",
            },
            { role: "nounstem", value: "mich", supportiveI: "" },
            { role: "subject-number-1", value: "in", supportiveI: "" },
        ],
        supportiveI: [{
            partIndex: 0,
            status: "applied",
            source: "n",
            result: "ni",
        }],
        written: "nimichin",
        expected: "nimichin",
        valid: true,
    });

    const brokenSource = ctx.issueClassicalNahuatlLesson2WritingSource({
        parts: [
            { role: "subject-person-1", value: "n" },
            { role: "verbstem", value: "nemi" },
        ],
        boundaryKind: "finite-vnc-slots",
    });
    const broken = ctx.writeClassicalNahuatlLesson2Result(brokenSource);
    s.eq("breaking the supportive-i job changes the Result and fails the exact check", {
        brokenSurface: broken.surface,
        exactSurface: broken.surface === verb.lesson2WrittenResult?.surface,
    }, {
        brokenSurface: "nnemi",
        exactSurface: false,
    });

    const brokenNounSource = ctx.issueClassicalNahuatlLesson2WritingSource({
        parts: [
            { role: "subject-person-1", value: "n" },
            { role: "nounstem", value: "mich" },
            { role: "subject-number-1", value: "in" },
        ],
        boundaryKind: "ordinary-nnc-slots",
    });
    const brokenNoun = ctx.writeClassicalNahuatlLesson2Result(brokenNounSource);
    s.eq("breaking noun supportive i changes the Result and fails the exact check", {
        brokenSurface: brokenNoun.surface,
        exactSurface: brokenNoun.surface === noun.lesson2WrittenResult?.surface,
    }, {
        brokenSurface: "mmichin",
        exactSurface: false,
    });

    s.eq("basic word Results record only the Lesson 2 families they really use", {
        verb: verb.lesson2WrittenResult?.ownedWritingFamilyIds,
        noun: noun.lesson2WrittenResult?.ownedWritingFamilyIds,
    }, {
        verb: [
            "sound-and-spelling",
            "internal-stem-boundaries",
            "syllables-and-supportive-i",
        ],
        noun: [
            "sound-and-spelling",
            "internal-stem-boundaries",
            "syllables-and-supportive-i",
        ],
    });

    return s;
}

module.exports = { run };
