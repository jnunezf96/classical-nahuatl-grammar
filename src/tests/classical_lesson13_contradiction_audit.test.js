"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson13_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson13-contradiction-audit.json"), "utf8"));
    const consonant = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", { subject: "3common", possessor: "1sg", singularConnector: "0" });
    const vowel = ctx.buildClassicalNahuatlPossessiveNncFrame("ā", { subject: "3common", possessor: "1sg", singularConnector: "uh" });
    const blockedNe = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", { subject: "1sg", possessor: "ne", singularConnector: "0" });
    const blockedTla = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", { subject: "3common", possessor: "tla", singularConnector: "0" });
    const contrastNnc = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", { subject: "3common", possessor: "2pl", singularConnector: "0" });
    const contrastVnc = ctx.buildClassicalNahuatlTransitiveVncObjectFrame("(mati)", { transitivity: "transitive", subject: "2pl", mood: "indicative", tense: "present", object: "reflexive" });

    s.eq("Lesson 13 contradiction report is closed", {
        status: audit.status, resolved: audit.resolvedCount, unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length, authority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 9, unresolved: 0, resolutions: 9, authority: false });
    s.eq("possessor structure and vowel boundary agree", {
        consonant: [consonant.stateFrame.arity, consonant.stateFrame.slots.map((slot) => slot.carrier)],
        vowel: [vowel.stateFrame.arity, vowel.stateFrame.slots.map((slot) => slot.carrier)],
    }, { consonant: ["dyadic", ["n", "o"]], vowel: ["dyadic", ["n", "⎕"]] });
    s.eq("monadic restrictions agree", {
        ne: blockedNe.blockReason,
        tla: blockedTla.blockReason,
    }, {
        ne: "reciprocal-possessor-requires-third-person-subject",
        tla: "tla-possessor-requires-relational-or-analogical-derived-nounstem",
    });
    s.eq("amo and ammo remain different typed structures", {
        valid: contrastNnc.authorizationStatus === "authorized" && contrastVnc.proofFrame.authorizationStatus === "authorized",
        nnc: contrastNnc.stateFrame.slots.map((slot) => slot.role),
        vnc: ["va1", "va2"].filter((role) => contrastVnc.objectFrame[role]),
    }, { valid: true, nnc: ["st1", "st2"], vnc: ["va1", "va2"] });
    return s;
}

module.exports = { run };
