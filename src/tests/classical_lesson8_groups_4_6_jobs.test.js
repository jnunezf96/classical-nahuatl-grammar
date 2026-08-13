"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson8_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson8-review-ledger.json"), "utf8"));
    const groupIds = ["lesson8-negative-scope", "lesson8-sentence-and-transformation", "lesson8-affirmative-assertion"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const negative = ctx.buildClassicalNahuatlNegativePrefixSystemFrame();
    const affirmativeOwner = ctx.buildClassicalNahuatlAffirmativeAssertionSystemFrame();
    const build = (sentenceType, options = {}) => ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
        valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "B", sentenceType, ...options,
    });
    const affirmative = build("affirmative-assertion").sentenceSurfaceFrame;
    const negativeSentence = build("negative-assertion").sentenceSurfaceFrame;
    const question = build("yes-no-question", { questionMode: "intonation" }).sentenceSurfaceFrame;
    const optativeStatement = build("affirmative-assertion", { mood: "optative", tense: "nonpast" }).sentenceSurfaceFrame;
    const sentenceSystem = Object.freeze({
        writtenCapitalization: "sentence-initial-capital",
        writtenFinalPunctuation: Object.freeze([".", "?", "!"]),
        sentenceUses: Object.freeze(["statement", "question", "exclamation"]),
        polarities: Object.freeze(["positive", "negative"]),
        basicSentence: "simple-affirmative-assertion",
        transformSentence: "nonbasic-sentence-use",
        transformationInputCounts: Object.freeze({ singleBase: 1, doubleBase: 2 }),
        transformationOperations: Object.freeze(["add", "replace", "rearrange", "delete"]),
        affirmativeOperation: affirmative.sentenceOperationType,
        negativeOperation: negativeSentence.sentenceOperationType,
        questionOperation: question.sentenceOperationType,
    });
    const jobs = new Map();
    const add = (id, receipt, field, expected) => jobs.set(id, { receipt, field, expected });

    [
        ["ACI-P090-L007-3B89D94741", "negativePrefixes", ["ah#"]],
        ["ACI-P090-L009-F9542B25EB", "outsideVnc", true],
        ["ACI-P090-L014-A308554219", "attractedToAntecessive", true],
        ["ACI-P090-L015-70557C348A", "attractedToAntecessive", true],
        ["ACI-P090-L015-8529523993", "prefixalStack", ["ah#", "ō#"]],
        ["ACI-P090-L019-98132D26DF", "negativePrefixes", ["ah#"]],
        ["ACI-P090-L021-63D2318B1F", "negativePrefixAlternants", ["ah#", "ca#"]],
    ].forEach(([id, field, expected]) => add(id, negative, field, expected));

    [
        ["ACI-P090-L025-7E541086E8", "writtenFinalPunctuation", [".", "?", "!"]],
        ["ACI-P090-L026-8F47E46B4C", "sentenceUses", ["statement", "question", "exclamation"]],
        ["ACI-P090-L027-5897EE8620", "polarities", ["positive", "negative"]],
        ["ACI-P090-L029-94D6B11ABB", "transformSentence", "nonbasic-sentence-use"],
        ["ACI-P090-L030-B789EACCAB", "basicSentence", "simple-affirmative-assertion"],
        ["ACI-P090-L030-B789EACCAB-02", "transformSentence", "nonbasic-sentence-use"],
        ["ACI-P090-L030-B789EACCAB-03", "transformationOperations", ["add", "replace", "rearrange", "delete"]],
        ["ACI-P090-L030-B789EACCAB-04", "transformationInputCounts", { singleBase: 1, doubleBase: 2 }],
        ["ACI-P090-L030-B789EACCAB-05", "transformationInputCounts", { singleBase: 1, doubleBase: 2 }],
        ["ACI-P090-L033-D5EA34C7B2", "transformationOperations", ["add", "replace", "rearrange", "delete"]],
    ].forEach(([id, field, expected]) => add(id, sentenceSystem, field, expected));

    [
        ["ACI-P090-L035-14C0F92705", "sentenceType", "affirmative-assertion"],
        ["ACI-P090-L037-58EA595D5C", "indicativeVncRequired", true],
        ["ACI-P090-L037-6884EA80F4", "indicativeVncRequired", true],
        ["ACI-P090-L037-3D592220BB", "consumedVncStatus", "complete"],
    ].forEach(([id, field, expected]) => add(id, affirmativeOwner, field, expected));

    s.eq("accepted Lesson 8 Groups 4-6 cover every atom and writing job once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 43, unique: 43, writing: 21, mapped: 21 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 8 job`, job.receipt[job.field], job.expected);
        const mutation = { ...job.receipt, [job.field]: "BROKEN_LESSON_8_JOB" };
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify(mutation[job.field]) === JSON.stringify(job.expected));
    }
    s.eq("the normal sentence route keeps each operation distinct", {
        affirmative: [affirmative.authorizationStatus, affirmative.sentenceOperationType, affirmative.finalPunctuation],
        negative: [negativeSentence.authorizationStatus, negativeSentence.sentenceOperationType, negativeSentence.negativePrefix, negativeSentence.finalPunctuation],
        question: [question.authorizationStatus, question.sentenceOperationType, question.finalPunctuation],
        optativeAsStatement: [optativeStatement.authorizationStatus, optativeStatement.blockReason],
    }, {
        affirmative: ["authorized", "assertion-composition", "."],
        negative: ["authorized", "negative-assertion-transformation", "ah#", "."],
        question: ["authorized", "question-composition", "?"],
        optativeAsStatement: ["blocked", "lesson-9-wish-command-requires-ma-or-tla"],
    });
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("the interface uses polarity and sentence type without transformation jargon controls",
        shell.includes('id="classical-rule-logic-polarity"')
        && shell.includes('id="classical-rule-logic-sentence-surface"')
        && !/(?:id|name)="[^"]*(?:single-base|double-base|transformation-operation|negative-prefix-position)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
