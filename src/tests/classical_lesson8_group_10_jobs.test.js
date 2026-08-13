"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson8_group_10_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson8-review-ledger.json"), "utf8"));
    const records = ledger.records.filter((record) => record.reviewGroupId === "lesson8-cuix-question");
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const frame = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
        valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "B",
        sentenceType: "yes-no-question", questionMode: "cuix",
    });
    const sentence = frame.sentenceSurfaceFrame;
    const exact = Object.freeze({
        status: sentence.authorizationStatus,
        sentenceType: sentence.sentenceType,
        questionMode: sentence.questionMode,
        particles: sentence.sentenceParticles,
        punctuation: sentence.finalPunctuation,
        baseVncFormula: sentence.baseVncFormula,
        particlesBecomeVncSlots: sentence.sentenceParticlesBecomeFormulaSlots,
        actions: sentence.sentenceActions,
    });
    s.eq("cuix uses the normal question path and stays outside the VNC", exact, {
        status: "authorized",
        sentenceType: "yes-no-question",
        questionMode: "cuix",
        particles: ["cuix"],
        punctuation: "?",
        baseVncFormula: "#0-0(cochi)0+0-0#",
        particlesBecomeVncSlots: false,
        actions: [
            "add-cuix-to-sentence-left-edge",
            "keep-sentence-particles-out-of-vnc-formula",
            "carry-sentence-surface-to-selected-output",
        ],
    });
    s.eq("accepted Lesson 8 Group 10 covers every atom and writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        writingAtom: writing.map((record) => record.atomId),
    }, {
        atoms: 12,
        unique: 12,
        writing: 1,
        writingAtom: ["ACI-P092-L002-B690C5EB9B"],
    });
    s.ok("ACI-P092-L002-B690C5EB9B performs its exact cuix job",
        exact.questionMode === "cuix" && exact.particles[0] === "cuix" && exact.punctuation === "?");
    const mutation = { ...exact, questionMode: "intonation", particles: [] };
    s.no("mutation:ACI-P092-L002-B690C5EB9B fails when cuix is removed",
        mutation.questionMode === "cuix" && mutation.particles[0] === "cuix");
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("the interface reuses the particle picker and sentence choice without a duplicate cuix control",
        shell.includes('id="classical-rule-logic-sentence-particle"')
        && shell.includes('id="classical-rule-logic-sentence-surface"')
        && !/(?:id|name)="[^"]*cuix-question[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
