"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson21_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson21-contradiction-audit.json");
    const ledger = read("lesson21-review-ledger.json");
    const proof = read("lesson21-implementation-proof.json");
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

    s.eq("accepted Lesson 21 Groups 1-8 are uncontradicted", {
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
        accepted: 161,
        awaiting: 0,
        resolved: 47,
        unresolved: 0,
        resolutions: 47,
        authority: false,
    });
    s.eq("every accepted Lesson 21 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => (
            record.implementationCredit === "EXACTLY_OBSERVED"
        )).length,
        missingExactRoutes,
    }, { accepted: 161, awaiting: 0, exact: 161, missingExactRoutes: [] });
    s.eq("all eight accepted Lesson 21 groups receive proof", {
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
            "lesson21-active-reflexive-contextual-passive-reading",
            "lesson21-passive-formula-and-single-object-promotion",
            "lesson21-passive-foundation-and-source-limits",
            "lesson21-passive-mood-sentence-composition",
            "lesson21-passive-reflexive-ne-retention",
            "lesson21-passive-reflexive-projective-double-object",
            "lesson21-passive-specific-nonspecific-and-three-object",
            "lesson21-passive-two-specific-mainline-promotion",
        ],
        acceptedGroups: [
            "lesson21-active-reflexive-contextual-passive-reading",
            "lesson21-passive-formula-and-single-object-promotion",
            "lesson21-passive-foundation-and-source-limits",
            "lesson21-passive-mood-sentence-composition",
            "lesson21-passive-reflexive-ne-retention",
            "lesson21-passive-reflexive-projective-double-object",
            "lesson21-passive-specific-nonspecific-and-three-object",
            "lesson21-passive-two-specific-mainline-promotion",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
