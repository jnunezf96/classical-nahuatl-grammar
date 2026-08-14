"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson14_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson14-contradiction-audit.json"), "utf8"));
    const truncated = ctx.buildClassicalNahuatlClassGovernedNncFrame("naca", {
        state: "possessive", subject: "3common", possessor: "1sg",
        nounClass: "tl", classSelectionAuthority: "user-selection",
        generalUseShape: "truncated", ephemeralFinalVowel: "a", tlSubclass: "2B",
    });
    const repaired = ctx.buildClassicalNahuatlClassGovernedNncFrame("coz-ca", {
        state: "possessive", subject: "3common", possessor: "3sg",
        nounClass: "tl", classSelectionAuthority: "user-selection",
        generalUseShape: "truncated", ephemeralFinalVowel: "a",
        truncationRepair: "supportive-i", tlSubclass: "2C",
    });
    const ambiguous = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
        state: "possessive", subject: "3common", possessor: "1sg",
        nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
        constituentAmbiguityKind: "back-tli", constituentAlternativeStem: "caltli",
    });

    s.eq("Lesson 14 contradiction report is closed", {
        status: audit.status, resolved: audit.resolvedCount, unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length, authority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 10, unresolved: 0, resolutions: 10, authority: false });
    s.eq("class, truncation, and supportive-i repair agree", {
        truncated: [truncated.authorizationStatus, truncated.sourceFrame.generalUseStem, truncated.connectorSelectionFrame.singularConnector],
        repaired: [repaired.authorizationStatus, repaired.sourceFrame.generalUseStem, repaired.connectorSelectionFrame.singularConnector],
    }, { truncated: ["authorized", "nac", "0"], repaired: ["authorized", "coz-qui", "0"] });
    s.eq("unselected constituent ambiguity remains blocked instead of being guessed from spelling", {
        status: ambiguous.authorizationStatus,
        reason: ambiguous.blockReason,
        spellingAuthority: ambiguous.ambiguityFrame.spellingAloneSelectsAnalysis,
    }, { status: "blocked", reason: "constituent-analysis-selection-required", spellingAuthority: false });
    return s;
}

module.exports = { run };
