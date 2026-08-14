"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson15_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson15-contradiction-audit.json"), "utf8"));
    const ordinary = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
        state: "possessive", subject: "3pl", possessor: "1sg",
        nounClass: "tli", classSelectionAuthority: "user-selection",
    });
    const untouched = ctx.buildClassicalNahuatlHigherNncFrame(ordinary);
    const never = ctx.buildClassicalNahuatlClassGovernedNncFrame("tōnati", {
        state: "possessive", subject: "3sg", possessor: "1sg",
        nounClass: "tl", classSelectionAuthority: "user-selection", tlSubclass: "1A",
    });
    const blocked = ctx.buildClassicalNahuatlHigherNncFrame(never, { naturalPossessionPolicy: "never-possessive" });
    const metaphor = ctx.buildClassicalNahuatlHigherNncFrame(never, { naturalPossessionPolicy: "never-possessive", metaphoricalOverride: true });

    s.eq("Lesson 15 contradiction report is closed", {
        status: audit.status, resolved: audit.resolvedCount, unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length, authority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 12, unresolved: 0, resolutions: 12, authority: false });
    s.eq("boundary changes do not spread to an unrelated stem", {
        status: untouched.authorizationStatus, formula: untouched.formulaRealization,
        actions: untouched.operationFrame.appliedActions,
    }, { status: "authorized", formula: "#0-0+n-o(cal)hu-ān#", actions: [] });
    s.eq("literal State restriction and metaphorical override remain distinct", {
        blocked: [blocked.authorizationStatus, blocked.blockReason],
        metaphor: [metaphor.authorizationStatus, metaphor.nncSourceAuthorityFrame.metaphoricalOverrideUsedForState],
    }, {
        blocked: ["blocked", "nounstem-never-possessive-without-metaphorical-override"],
        metaphor: ["authorized", true],
    });
    return s;
}

module.exports = { run };
