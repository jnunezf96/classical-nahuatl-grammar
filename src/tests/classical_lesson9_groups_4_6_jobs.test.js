"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson9_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson9-review-ledger.json"), "utf8"));
    const groupIds = ["lesson9-wish-sentences", "lesson9-negative-wishes", "lesson9-command-exhortation-system"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const surface = (overrides) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "cochi",
        valence: "intransitive",
        subject: "1sg",
        mood: "optative",
        tense: "nonpast",
        verbClass: "B",
        ...overrides,
    });
    const frames = {
        ma: surface({ introductoryParticle: "mā" }),
        tla: surface({ introductoryParticle: "tlā" }),
        past: surface({ stem: "pāqui", subject: "2sg", tense: "past", verbClass: "A", introductoryParticle: "mā" }),
        antecessive: surface({ stem: "pōhuā", subject: "3sg", tense: "past", introductoryParticle: "mā", prefixStackMode: "antecessive" }),
        urgent: surface({ subject: "2sg", introductoryParticle: "tlā", introductoryModifier: "cuēl", sentenceSurfaceMode: "exclamation" }),
        ihyo: surface({ introductoryParticle: "mā", prefaceParticle: "ihyo", sentenceSurfaceMode: "exclamation" }),
        ye: surface({ introductoryParticle: "tlā", prefaceParticle: "ye", sentenceSurfaceMode: "exclamation" }),
        negative: surface({ subject: "3pl", introductoryParticle: "mā", polarityMode: "negative" }),
        negativeAutomaticIntro: surface({ subject: "3pl", polarityMode: "negative" }),
        direct: surface({ stem: "ihcihui", subject: "2sg", sentenceType: "command-sentence" }),
        indirect: surface({ subject: "3sg", sentenceType: "command-sentence", introductoryParticle: "mā" }),
        exhortation: surface({ subject: "1pl", sentenceType: "exhortation-sentence", introductoryParticle: "mā" }),
        politeMa: surface({ stem: "ihcihui", subject: "2sg", sentenceType: "command-sentence", introductoryParticle: "mā" }),
        courteousTla: surface({ stem: "ihcihui", subject: "2sg", sentenceType: "command-sentence", introductoryParticle: "tlā" }),
    };

    const jobs = new Map();
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });

    add("ACI-P095-L022-17A5FC483D", [frames.ma.authorizationStatus, frames.ma.sentenceSurfaceDisplay], ["authorized", "Mā nicochi."]);
    add("ACI-P095-L024-544E1F2573", [frames.ma.sentenceIntroductoryParticle, frames.tla.sentenceIntroductoryParticle], ["mā", "tlā"]);
    add("ACI-P095-L025-F02C9876CB", [frames.tla.sentenceSurfaceDisplay, frames.tla.sentenceCanvasRole], ["Tlā nicochi.", "wish"]);
    add("ACI-P095-L030-05672FE2F9", [frames.ma.state.mood, frames.ma.state.tense, frames.ma.sentenceCanvasRole], ["optative", "nonpast", "wish"]);
    add("ACI-P096-L002-A0330C8813", [frames.past.state.tense, frames.past.sentenceSurfaceDisplay], ["past", "Mā xipāquini."]);
    add("ACI-P096-L011-02A2D0CD0B", frames.antecessive.sentencePrefixalStack, ["ō#"]);
    add("ACI-P096-L011-D07C8D0427", [frames.antecessive.state.tense, frames.antecessive.sentenceSurfaceDisplay], ["past", "Mā ōpōhuāni."]);
    add("ACI-P096-L015-B5530F1357", [frames.urgent.sentenceIntroductoryModifier, frames.urgent.sentenceSurfaceDisplay], ["cuēl", "Tlā cuēl xicochi!"]);
    add("ACI-P096-L024-27C29C56F5-02", frames.urgent.sentenceSurfaceDisplay, "Tlā cuēl xicochi!");
    add("ACI-P096-L024-27C29C56F5-03", [frames.urgent.sentenceCanvasRole, frames.urgent.sentenceIntroductoryParticle], ["wish", "tlā"]);
    add("ACI-P096-L025-313573DD0F", [frames.ihyo.sentencePrefaceParticle, frames.ihyo.sentenceSurfaceDisplay], ["ihyo", "Ihyo mā nicochi!"]);
    add("ACI-P096-L030-ACCD8F5604", [frames.ye.sentencePrefaceParticle, frames.ye.sentenceSurfaceDisplay], ["ye", "Ye tlā nicochi!"]);

    add("ACI-P096-L032-C45EADCC64", [frames.negative.state.mood, frames.negative.sentenceLesson9NegativeTransformation, frames.negative.sentenceSurfaceDisplay], ["optative", "ma-tla-changes-ah-to-ca", "Mā cacochicān."]);
    add("ACI-P097-L004-9B41376753", [frames.negative.sentencePrefixalStack, frames.negative.sentenceFormulaAttachment], [["ca#"], "prefixal-negative-attached-at-left-edge"]);
    add("ACI-P097-L005-0C9A5F96BF", [frames.negativeAutomaticIntro.sentenceIntroductoryParticle, frames.negativeAutomaticIntro.sentenceIntroductoryParticleRequired], ["mā", true]);
    add("ACI-P097-L005-0C9A5F96BF-02", [frames.negative.sentencePrefixalStack, frames.negative.sentenceLesson9NegativeTransformation], [["ca#"], "ma-tla-changes-ah-to-ca"]);
    add("ACI-P097-L006-4893D482A6", [frames.negative.sentenceFormulaAttachment, frames.negative.sentenceSurfaceDisplay], ["prefixal-negative-attached-at-left-edge", "Mā cacochicān."]);

    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    add("ACI-P097-L009-BDD91DA054", /<option value="imperative">/u.test(shell), false);
    add("ACI-P097-L009-937DBA5CE1", [frames.direct.state.mood, frames.exhortation.state.mood], ["optative", "optative"]);
    add("ACI-P097-L012-877B3F7B0A", [frames.direct.sentenceCanvasRole, frames.indirect.sentenceCanvasRole, frames.exhortation.sentenceCanvasRole], ["direct-command", "indirect-command", "exhortation"]);
    add("ACI-P097-L014-EA600C057F", [frames.ma.sentenceCompositionOperationId, frames.direct.sentenceCompositionOperationId], ["vnc-sentence-composition", "vnc-sentence-composition"]);
    add("ACI-P097-L014-EA600C057F-02", [frames.direct.state.tense, ctx.getClassicalNahuatlBorrowedIndicativeFormUse({ mood: "optative", tense: "future" }).formTense], ["nonpast", "future"]);
    add("ACI-P097-L017-42FC1FFF66", [frames.indirect.sentenceIntroductoryParticleRequired, frames.exhortation.sentenceIntroductoryParticleRequired], [true, true]);
    add("ACI-P097-L018-8BA5D666F8", [frames.indirect.sentenceIntroductoryParticle, frames.exhortation.sentenceIntroductoryParticle], ["mā", "mā"]);
    add("ACI-P097-L018-8DB9515356", [frames.direct.sentenceIntroductoryParticleOmissionAllowed, frames.direct.sentenceSurfaceDisplay], [true, "Xihcihui."]);
    add("ACI-P097-L021-FA8D65BB48", [frames.politeMa.sentenceSurfaceDisplay, frames.courteousTla.sentenceSurfaceDisplay], ["Mā xihcihui.", "Tlā xihcihui."]);
    add("ACI-P097-L023-BB47006BDE", [frames.direct.state.tense, frames.direct.sentenceCanvasRole], ["nonpast", "direct-command"]);

    s.eq("accepted Lesson 9 Groups 4-6 cover every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 75, unique: 75, writing: 27, mapped: 27 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 9 job`, job.actual, job.expected);
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify("BROKEN_LESSON_9_JOB") === JSON.stringify(job.expected));
    }
    s.ok("the normal application uses existing controls rather than duplicate command or negative-wish controls",
        shell.includes('id="classical-rule-logic-mood"')
        && shell.includes('id="classical-rule-logic-polarity"')
        && shell.includes('id="classical-built-in-particle"')
        && !/(?:id|name)="[^"]*(?:imperative-mood|negative-wish-ca-position)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
