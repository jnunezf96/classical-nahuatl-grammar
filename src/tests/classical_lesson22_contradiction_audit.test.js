"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson22_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson22-contradiction-audit.json");
    const ledger = read("lesson22-review-ledger.json");
    const proof = read("lesson22-implementation-proof.json");
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const awaiting = ledger.records.filter((record) => (
        record.reviewStatus === "AWAITING_USER_REVIEW"
    ));
    const missingExactRoutes = accepted.filter((record) => (
        record.implementationCredit !== "EXACTLY_OBSERVED"
        || !record.readerObservationTest
        || !record.readerMutationTest
        || (
            record.proposedDirection === "BOTH"
            && (!record.writingObservationTest || !record.writingMutationTest)
        )
    )).map((record) => record.atomId);

    s.eq("accepted Lesson 22 Groups 1-8 are uncontradicted", {
        scope: audit.scope,
        status: audit.status,
        accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, {
        scope: "accepted-groups-1-8",
        status: "UNCONTRADICTED",
        accepted: 251,
        awaiting: 0,
        resolved: 45,
        unresolved: 0,
        resolutions: 45,
        authority: false,
    });
    s.eq("every accepted Lesson 22 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => (
            record.implementationCredit === "EXACTLY_OBSERVED"
        )).length,
        missingExactRoutes,
    }, { accepted: 251, awaiting: 0, exact: 251, missingExactRoutes: [] });
    s.eq("all eight accepted Lesson 22 groups receive proof", {
        proofGroups: Object.keys(proof.groups).sort(),
        acceptedGroups: ledger.groups
            .filter((group) => group.reviewStatus === "ACCEPTED")
            .map((group) => group.groupId)
            .sort(),
        remaining: ledger.groups
            .filter((group) => group.reviewStatus === "AWAITING_USER_REVIEW")
            .map((group) => [group.groupNumber, group.atomCount]),
    }, {
        proofGroups: [
            "lesson22-impersonal-formula-and-intransitive-irregular-results",
            "lesson22-impersonal-optative-and-admonitive",
            "lesson22-inherently-impersonal-vncs",
            "lesson22-nonanimate-versus-impersonal-subjects",
            "lesson22-nonspecific-object-retention-and-readings",
            "lesson22-reflexive-source-to-ne",
            "lesson22-tla-impersonal-derivation-and-lexicon",
            "lesson22-transformed-impersonal-voice",
        ],
        acceptedGroups: [
            "lesson22-impersonal-formula-and-intransitive-irregular-results",
            "lesson22-impersonal-optative-and-admonitive",
            "lesson22-inherently-impersonal-vncs",
            "lesson22-nonanimate-versus-impersonal-subjects",
            "lesson22-nonspecific-object-retention-and-readings",
            "lesson22-reflexive-source-to-ne",
            "lesson22-tla-impersonal-derivation-and-lexicon",
            "lesson22-transformed-impersonal-voice",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
