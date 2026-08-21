"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = new Set([
    "lesson33-honorific-vnc-foundation-and-participant-gate",
    "lesson33-intransitive-causative-honorifics",
    "lesson33-intransitive-applicative-honorifics",
    "lesson33-projective-applicative-honorifics",
    "lesson33-derived-causative-and-applicative-sources",
    "lesson33-projective-causative-honorifics",
    "lesson33-mainline-reflexive-preterit-embed-honorifics",
    "lesson33-reverential-double-honorifics",
    "lesson33-pejorative-preterit-embed-vncs",
    "lesson33-compound-verbstem-attitude-scope",
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_contradiction_audit");
    const readJson = file => JSON.parse(fs.readFileSync(
        path.join(ROOT, file), "utf8"));
    const audit = readJson(
        "docs/canvas-progress/lesson33-contradiction-audit.json");
    const proof = readJson(
        "docs/canvas-progress/lesson33-implementation-proof.json");
    const ledger = readJson(
        "docs/canvas-progress/lesson33-review-ledger.json");
    const accepted = ledger.records.filter(record => (
        record.reviewStatus === "ACCEPTED"
    ));

    s.eq("Lesson 33 Groups 1-10 are accepted, exactly proven, and uncontradicted", {
        status: audit.status,
        accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        ledgerAccepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        exactProofs: Object.entries(proof.groups).filter(([group, record]) => (
            GROUPS.has(group) && record.status === "EXACTLY_OBSERVED"
        )).length,
    }, { status: "UNCONTRADICTED", accepted: 327, awaiting: 0,
        unresolved: 0, resolutions: 82, ledgerAccepted: 327,
        groups: 10, exactProofs: 10 });

    s.ok("the audit resolves route, Source, participant, and authority contradictions",
        audit.resolutions.some(value => value.includes("sole licensed formation"))
        && audit.resolutions.some(value => value.includes("Self-honorification"))
        && audit.resolutions.some(value => value.includes("Monomorphemic and polymorphemic"))
        && audit.resolutions.some(value => value.includes("example identity"))
        && audit.resolutions.some(value => value.includes("canonical causative"))
        && audit.resolutions.some(value => value.includes("canonical applicative"))
        && audit.resolutions.some(value => value.includes("English H notation"))
        && audit.resolutions.some(value => value.includes("preserves every owner-issued projective object"))
        && audit.resolutions.some(value => value.includes("first-person projective subject"))
        && audit.resolutions.some(value => value.includes("H placement cannot select"))
        && audit.resolutions.some(value => value.includes("complete owner-issued Result"))
        && audit.resolutions.some(value => value.includes("first-person embedded participant"))
        && audit.resolutions.some(value => value.includes("Retyped stems"))
        && audit.resolutions.some(value => value.includes("retains the owner-issued patient"))
        && audit.resolutions.some(value => value.includes("Agent-versus-patient"))
        && audit.resolutions.some(value => value.includes("example-stem membership"))
        && audit.resolutions.some(value => value.includes("alternate causative realizations"))
        && audit.resolutions.some(value => value.includes("Unlisted projective Sources"))
        && audit.resolutions.some(value => value.includes("Mainline-reflexive object topology"))
        && audit.resolutions.some(value => value.includes("class-specific perfective"))
        && audit.resolutions.some(value => value.includes("fixed matrix specific object"))
        && audit.resolutions.some(value => value.includes("Shuntline reflexives"))
        && audit.resolutions.some(value => value.includes("Class A, B, C, and D"))
        && audit.resolutions.some(value => value.includes("doubled honorific"))
        && audit.resolutions.some(value => value.includes("three distinct typed layers"))
        && audit.resolutions.some(value => value.includes("inherits the inner honored participant"))
        && audit.resolutions.some(value => value.includes("second fixed tla-(tzin-o-ā)"))
        && audit.resolutions.some(value => value.includes("Projective objects"))
        && audit.resolutions.some(value => value.includes("shared pejorative preterit-embed"))
        && audit.resolutions.some(value => value.includes("Silent preterit 0"))
        && audit.resolutions.some(value => value.includes("Fixed tla-(pōl-o-ā)"))
        && audit.resolutions.some(value => value.includes("First-person subject disparagement"))
        && audit.resolutions.some(value => value.includes("subject-versus-object disparagement"))
        && audit.resolutions.some(value => value.includes("pejorative verbstem whitelist"))
        && audit.resolutions.some(value => value.includes("ordinary compositional compound"))
        && audit.resolutions.some(value => value.includes("one lexicalized verbstem"))
        && audit.resolutions.some(value => value.includes("shared-object compound"))
        && audit.resolutions.some(value => value.includes("embed-versus-matrix"))
        && audit.resolutions.some(value => value.includes("same cui plus huetzi"))
        && audit.resolutions.some(value => value.includes("Removing any accepted atom")));

    const sourceMismatch = ctx.buildHonorificFormationAnalysisFrame({
        lateVariant: "causative",
        honorificFormationAnalysis: {
            lexicalStatus: "honorific-formation-analysis",
            sourceStem: "other-source",
            availableFormations: ["causative"],
            preferredFormation: "causative",
        },
    }, "cochi");
    const routeMismatch = ctx.buildHonorificFormationAnalysisFrame({
        lateVariant: "applicative",
        honorificFormationAnalysis: {
            lexicalStatus: "honorific-formation-analysis",
            sourceStem: "cochi",
            availableFormations: ["causative"],
            preferredFormation: "causative",
        },
    }, "cochi");
    s.eq("typed analysis mutations fail while source-shape productivity remains open", {
        source: [sourceMismatch.authorizationStatus,
            sourceMismatch.blockReason],
        route: [routeMismatch.authorizationStatus,
            routeMismatch.selectedFormationLicensed],
        authority: [routeMismatch.canvasExampleAuthority,
            routeMismatch.callerFormulaAuthority,
            routeMismatch.callerSurfaceAuthority],
    }, {
        source: ["blocked",
            "valid-matching-honorific-formation-analysis-required"],
        route: ["authorized", false],
        authority: [false, false, false],
    });
    return s;
}

module.exports = { run };
