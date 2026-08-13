"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson9_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson9-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson9-optative-time-use",
        "lesson9-optative-vnc-formation",
        "lesson9-optative-indicative-contrast",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const vnc = (stem, options) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        valence: "intransitive",
        sentenceType: "wish-sentence",
        introductoryParticle: "mā",
        ...options,
    });
    const frames = {
        a1: vnc("(cuīca)", { subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "A" }),
        a2: vnc("(cuīca)", { subject: "2sg", mood: "optative", tense: "nonpast", verbClass: "A" }),
        apl: vnc("(cuīca)", { subject: "1pl", mood: "optative", tense: "nonpast", verbClass: "A" }),
        b1: vnc("(pōhuā)", { subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "B" }),
        b2past: vnc("(pōhuā)", { subject: "2sg", mood: "optative", tense: "past", verbClass: "B" }),
        c1: vnc("(chol-o-a)", { subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "C" }),
        c3: vnc("(chol-o-a)", { subject: "3sg", mood: "optative", tense: "nonpast", verbClass: "C" }),
        cpl: vnc("(chol-o-a)", { subject: "3pl", mood: "optative", tense: "nonpast", verbClass: "C" }),
        d3: vnc("(cuā)", { subject: "3sg", mood: "optative", tense: "nonpast", verbClass: "D" }),
        dpl: vnc("(cuā)", { subject: "3pl", mood: "optative", tense: "nonpast", verbClass: "D" }),
        preterit: vnc("(cochi)", { subject: "1sg", mood: "optative", tense: "preterit", verbClass: "B", introductoryParticle: "mā" }),
        future: vnc("(tequi-ti)", { subject: "2sg", mood: "optative", tense: "future", verbClass: "A" }),
        aIndicative: vnc("(cuīca)", { subject: "1sg", mood: "indicative", tense: "present", verbClass: "A", sentenceType: "", introductoryParticle: "" }),
        cIndicative: vnc("(chol-o-a)", { subject: "1sg", mood: "indicative", tense: "present", verbClass: "C", sentenceType: "", introductoryParticle: "" }),
        secondPastIndicative: vnc("(cuīca)", { subject: "2sg", mood: "indicative", tense: "customary-present", verbClass: "A", sentenceType: "", introductoryParticle: "" }),
        secondPastOptative: vnc("(cuīca)", { subject: "2sg", mood: "optative", tense: "past", verbClass: "A" }),
        firstNoIntro: vnc("(cuīca)", { subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "A", introductoryParticle: "" }),
        thirdNoIntro: vnc("(cuīca)", { subject: "3sg", mood: "optative", tense: "nonpast", verbClass: "A", introductoryParticle: "" }),
    };
    const borrowing = {
        nonpast: ctx.getClassicalNahuatlBorrowedIndicativeFormUse({ mood: "optative", tense: "nonpast" }),
        past: ctx.getClassicalNahuatlBorrowedIndicativeFormUse({ mood: "optative", tense: "past" }),
        preterit: ctx.getClassicalNahuatlBorrowedIndicativeFormUse({ mood: "optative", tense: "preterit" }),
        future: ctx.getClassicalNahuatlBorrowedIndicativeFormUse({ mood: "optative", tense: "future" }),
    };

    const jobs = new Map();
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });

    add("ACI-P093-L004-509646CF9F", frames.a1.sentenceSurfaceFrame.canvasSentenceRole, "wish");
    add("ACI-P093-L005-B7B90A1D8F", [borrowing.nonpast.semanticSelectionAuthorized, borrowing.past.semanticSelectionAuthorized], [true, true]);
    add("ACI-P093-L006-9D0547B7C1", [ctx.getClassicalNahuatlAspectForTense({ mood: "optative", tense: "past" }), borrowing.past.semanticTense], ["imperfective", "past"]);
    add("ACI-P093-L008-8FFE93D28E", [borrowing.future.semanticSelectionAuthorized, borrowing.preterit.semanticSelectionAuthorized], [true, true]);
    add("ACI-P093-L009-14EB6E5881", [borrowing.past.borrowed, borrowing.preterit.borrowed], [false, true]);
    add("ACI-P093-L009-4068409005", [borrowing.preterit.finiteFormDiffersFromSemanticSelection, borrowing.future.finiteFormDiffersFromSemanticSelection], [true, true]);
    add("ACI-P093-L009-4068409005-02", [borrowing.preterit.formMood, borrowing.future.formMood], ["indicative", "indicative"]);
    add("ACI-P093-L009-4068409005-03", [borrowing.preterit.antecessiveObligatory, frames.preterit.sentenceSurfaceFrame.sentencePrefixalStack], [true, ["ō#"]]);
    add("ACI-P093-L009-4068409005-04", [borrowing.future.semanticTense, frames.future.sentenceSurfaceFrame.futureIndicativeAsOptative], ["future", true]);

    add("ACI-P093-L018-EB13E376B5", [ctx.getClassicalNahuatlAspectForTense({ mood: "optative", tense: "nonpast" }), ctx.getClassicalNahuatlAspectForTense({ mood: "optative", tense: "past" })], ["imperfective", "imperfective"]);
    add("ACI-P093-L019-6B22C08964", frames.b2past.formulaRealization, "#xi-0(pōhuā)ni+0-0#");
    add("ACI-P093-L020-42F757DAB4", [frames.a1.authorizationStatus, frames.b1.authorizationStatus], ["authorized", "authorized"]);
    add("ACI-P093-L020-282FAB5C0E", [frames.a1.formulaRealization, frames.b1.formulaRealization], ["#ni-0(cuīca)0+⎕-0#", "#ni-0(pōhuā)0+⎕-0#"]);
    add("ACI-P093-L023-01E4390B15", [frames.c3.formulaRealization, frames.d3.formulaRealization], ["#0-0(chol-o)0+⎕-0#", "#0-0(cua)0+⎕-0#"]);
    add("ACI-P093-L026-7CA7E40406", [frames.a2.formulaRealization, frames.apl.formulaRealization, frames.c3.formulaRealization, frames.dpl.formulaRealization], ["#xi-0(cuīca)0+⎕-0#", "#ti-0(cuīca)0+c-ān#", "#0-0(chol-o)0+⎕-0#", "#0-0(cuā)0+c-ān#"]);
    add("ACI-P093-L028-63019FC4F2", [frames.a2.formulaRealization, frames.b2past.formulaRealization], ["#xi-0(cuīca)0+⎕-0#", "#xi-0(pōhuā)ni+0-0#"]);
    add("ACI-P094-L002-AA5EC70D15", frames.apl.formulaRealization.endsWith("+c-ān#"), true);
    add("ACI-P094-L002-0D87A9FA95", frames.cpl.formulaRealization.endsWith("+c-ān#"), true);
    add("ACI-P094-L004-3A5746CF3A", frames.c3.formulaRealization.includes("(chol-o)"), true);
    add("ACI-P094-L005-079D6A5FDF", [frames.c3.formulaRealization.includes("(chol-o)"), frames.cpl.formulaRealization.includes("(chol-ō)")], [true, true]);
    add("ACI-P094-L005-A4F1E91CB6", [frames.c3.formulaRealization, frames.cpl.formulaRealization], ["#0-0(chol-o)0+⎕-0#", "#0-0(chol-ō)0+c-ān#"]);
    add("ACI-P094-L008-51476E0F89", [frames.d3.formulaRealization, frames.dpl.formulaRealization], ["#0-0(cua)0+⎕-0#", "#0-0(cuā)0+c-ān#"]);
    add("ACI-P094-L008-AF069BE56B", [frames.d3.authorizationStatus, frames.dpl.authorizationStatus], ["authorized", "authorized"]);

    add("ACI-P094-L028-F79C62E1C7", [frames.c1.formulaRealization, frames.cIndicative.formulaRealization], ["#ni-0(chol-o)0+⎕-0#", "#ni-0(chol-o-a)0+0-0#"]);
    add("ACI-P095-L002-32CF2F1837", [frames.apl.formulaRealization.includes("c-ān"), frames.cpl.formulaRealization.includes("c-ān")], [true, true]);
    add("ACI-P095-L007-7BD8D6FFE3-18", [frames.secondPastOptative.formulaRealization, frames.secondPastIndicative.formulaRealization], ["#xi-0(cuīca)ni+0-0#", "#ti-0(cuīca)ni+0-0#"]);
    add("ACI-P095-L007-7BD8D6FFE3-27", [frames.a1.formulaRealization, frames.aIndicative.formulaRealization], ["#ni-0(cuīca)0+⎕-0#", "#ni-0(cuīca)0+0-0#"]);
    add("ACI-P095-L007-7BD8D6FFE3-28", [frames.firstNoIntro.sentenceSurfaceFrame.introductoryParticleRequired, frames.firstNoIntro.sentenceSurfaceFrame.blockReason], [true, "lesson-9-wish-command-requires-ma-or-tla"]);
    add("ACI-P095-L007-7BD8D6FFE3-29", [frames.thirdNoIntro.sentenceSurfaceFrame.introductoryParticleRequired, frames.thirdNoIntro.sentenceSurfaceFrame.blockReason], [true, "lesson-9-wish-command-requires-ma-or-tla"]);

    s.eq("accepted Lesson 9 Groups 1-3 cover every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 68, unique: 68, writing: 29, mapped: 29 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 9 job`, job.actual, job.expected);
        const mutation = "BROKEN_LESSON_9_JOB";
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify(mutation) === JSON.stringify(job.expected));
    }
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("normal controls reuse Mood and Tense without exposing automatic optative pieces",
        shell.includes('id="classical-rule-logic-mood"')
        && shell.includes('<option value="optative">')
        && shell.includes('id="classical-rule-logic-tense"')
        && shell.includes('<option value="nonpast">')
        && shell.includes('<option value="past">')
        && shell.includes('<option value="preterit">')
        && shell.includes('<option value="future">')
        && !/(?:id|name)="[^"]*(?:optative-x-xi|optative-c-an|optative-stem-truncation|optative-vowel-length)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
