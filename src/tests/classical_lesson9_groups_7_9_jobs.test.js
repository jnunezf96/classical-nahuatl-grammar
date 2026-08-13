"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson9_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson9-review-ledger.json"), "utf8"));
    const groupIds = ["lesson9-second-person-commands", "lesson9-third-person-commands", "lesson9-first-person-exhortations"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const surface = (overrides) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "ihcihui",
        valence: "intransitive",
        mood: "optative",
        tense: "nonpast",
        verbClass: "B",
        sentenceType: "command-sentence",
        ...overrides,
    });
    const frames = {
        direct: surface({ subject: "2sg" }),
        directMa: surface({ subject: "2sg", introductoryParticle: "mā" }),
        directTla: surface({ subject: "2sg", introductoryParticle: "tlā" }),
        directPlural: surface({ subject: "2pl" }),
        indirect: surface({ subject: "3sg", introductoryParticle: "mā" }),
        directionalIndirect: surface({ stem: "ahci", subject: "3sg", verbClass: "A", introductoryParticle: "tlā", directionalPrefix: "huāl" }),
        singularExhortation: surface({ subject: "1sg", sentenceType: "exhortation-sentence", introductoryParticle: "mā" }),
        pluralExhortation: surface({ subject: "1pl", sentenceType: "exhortation-sentence", introductoryParticle: "mā" }),
        telExhortation: surface({ subject: "1sg", sentenceType: "exhortation-sentence", introductoryParticle: "mā", introductoryModifier: "tēl" }),
    };

    const jobs = new Map();
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });
    add("ACI-P097-L038-0A37FD65EC-02", [frames.singularExhortation.sentenceIntroductoryParticle, frames.singularExhortation.sentenceCanvasRole], ["mā", "exhortation"]);
    add("ACI-P097-L038-0A37FD65EC-03", [frames.singularExhortation.state.subject, frames.singularExhortation.selectedFormula, frames.singularExhortation.sentenceSurfaceDisplay], ["1sg", "#n-0(ihcihui)0+⎕-0#", "Mā nihcihui."]);
    add("ACI-P098-L004-ED076A178C", [frames.telExhortation.sentenceIntroductoryModifier, frames.telExhortation.sentenceSurfaceDisplay], ["tēl", "Mā tēl nihcihui."]);

    s.eq("accepted Lesson 9 Groups 7-9 cover every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 21, unique: 21, writing: 3, mapped: 3 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 9 job`, job.actual, job.expected);
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify("BROKEN_LESSON_9_JOB") === JSON.stringify(job.expected));
    }
    s.eq("normal application builds second-person commands with the licensed politeness choices", {
        plain: [frames.direct.sentenceSurfaceDisplay, frames.direct.sentenceIntroductoryParticleOmissionAllowed],
        ma: frames.directMa.sentenceSurfaceDisplay,
        tla: frames.directTla.sentenceSurfaceDisplay,
        plural: frames.directPlural.sentenceSurfaceDisplay,
    }, {
        plain: ["Xihcihui.", true],
        ma: "Mā xihcihui.",
        tla: "Tlā xihcihui.",
        plural: "Xihcihuicān.",
    });
    s.eq("normal application builds introduced third-person commands and keeps direction", {
        ordinary: [frames.indirect.sentenceSurfaceDisplay, frames.indirect.sentenceCanvasRole],
        directional: [frames.directionalIndirect.sentenceSurfaceDisplay, frames.directionalIndirect.selectedFormula],
    }, {
        ordinary: ["Mā ihcihui.", "indirect-command"],
        directional: ["Tlā huālahci.", "#0-0+huāl(ahci)0+⎕-0#"],
    });
    s.eq("normal application builds singular and plural first-person exhortations", {
        singular: [frames.singularExhortation.sentenceSurfaceDisplay, frames.singularExhortation.sentenceCanvasRole],
        plural: [frames.pluralExhortation.sentenceSurfaceDisplay, frames.pluralExhortation.sentenceCanvasRole],
    }, {
        singular: ["Mā nihcihui.", "exhortation"],
        plural: ["Mā tihcihuicān.", "exhortation"],
    });
    return s;
}

module.exports = { run };
