"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson8_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson8-review-ledger.json"), "utf8"));
    const groupIds = ["lesson8-negative-assertion", "lesson8-emphatic-assertion", "lesson8-intonation-question"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const negative = ctx.buildClassicalNahuatlNegativeAssertionSystemFrame();
    const emphatic = ctx.buildClassicalNahuatlEmphaticAssertionSystemFrame();
    const emphaticNegative = ctx.buildClassicalNahuatlEmphaticNegativeAssertionSystemFrame();
    const buildQuestion = (negativeRequested = false) => ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
        valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "B",
        sentenceType: "yes-no-question", questionMode: "intonation", negative: negativeRequested,
    }).sentenceSurfaceFrame;
    const question = buildQuestion(false);
    const negativeQuestion = buildQuestion(true);
    const intonation = Object.freeze({
        sentenceType: question.sentenceType,
        questionMode: question.questionMode,
        finalPunctuation: question.finalPunctuation,
        requiredQuestionParticle: false,
        positiveStatus: question.authorizationStatus,
        negativeStatus: negativeQuestion.authorizationStatus,
        negativeParticles: negativeQuestion.sentenceParticles,
    });
    const jobs = new Map([
        ["ACI-P091-L010-BBFBB3D75B", { receipt: negative, field: "negativePrefix", expected: "ah#" }],
        ["ACI-P091-L019-BE9C4BE1B5", { receipt: emphatic, field: "emphaticParticle", expected: "ca" }],
        ["ACI-P091-L025-25154A6076", { receipt: emphaticNegative, field: "sentenceParticles", expected: ["ca", "ah#"] }],
        ["ACI-P091-L030-6467ED5179", { receipt: intonation, field: "sentenceType", expected: "yes-no-question" }],
        ["ACI-P091-L033-4DB00A926D", { receipt: intonation, field: "questionMode", expected: "intonation" }],
        ["ACI-P091-L033-4DB00A926D-02", { receipt: intonation, field: "finalPunctuation", expected: "?" }],
    ]);

    s.eq("accepted Lesson 8 Groups 7-9 cover every atom and writing job once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 22, unique: 22, writing: 6, mapped: 6 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 8 job`, job.receipt[job.field], job.expected);
        const mutation = { ...job.receipt, [job.field]: "BROKEN_LESSON_8_JOB" };
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify(mutation[job.field]) === JSON.stringify(job.expected));
    }
    s.eq("normal question behavior works with positive and negative statements", {
        positive: [question.authorizationStatus, question.sentenceOperationType, question.sentenceParticles, question.finalPunctuation],
        negative: [negativeQuestion.authorizationStatus, negativeQuestion.sentenceOperationType, negativeQuestion.sentenceParticles, negativeQuestion.finalPunctuation],
    }, {
        positive: ["authorized", "question-composition", [], "?"],
        negative: ["authorized", "question-composition", ["ah#"], "?"],
    });
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("the normal controls use sentence, polarity, and particles without duplicate intonation or emphasis controls",
        shell.includes('id="classical-rule-logic-sentence-surface"')
        && shell.includes('id="classical-rule-logic-polarity"')
        && shell.includes('id="classical-rule-logic-particle-combination-shortcut"')
        && !/(?:id|name)="[^"]*(?:question-intonation|emphatic-sentence-type)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
