"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson18_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson18-contradiction-audit.json");
    const ledger = read("lesson18-review-ledger.json");
    const proof = read("lesson18-implementation-proof.json");
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

    s.eq("accepted Lesson 18 Groups 1-9 are uncontradicted", {
        scope: audit.scope,
        status: audit.status,
        accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, {
        scope: "accepted-groups-1-9",
        status: "UNCONTRADICTED",
        accepted: 254,
        awaiting: 0,
        resolved: 24,
        unresolved: 0,
        resolutions: 24,
        authority: false,
    });
    s.eq("every accepted Lesson 18 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => (
            record.implementationCredit === "EXACTLY_OBSERVED"
        )).length,
        missingExactRoutes,
    }, { accepted: 254, awaiting: 0, exact: 254, missingExactRoutes: [] });
    s.eq("all nine accepted Lesson 18 groups receive proof", {
        proofGroups: Object.keys(proof.groups).sort(),
        acceptedGroups: ledger.groups
            .filter((group) => group.reviewStatus === "ACCEPTED")
            .map((group) => group.groupId)
            .sort(),
        remaining: ledger.groups
            .filter((group) => group.reviewStatus === "AWAITING_USER_REVIEW")
            .map((group) => [group.groupId, group.atomCount]),
    }, {
        proofGroups: [
            "lesson18-ayi-silent-object",
            "lesson18-collective-and-named-partner",
            "lesson18-discontinuous-supplementation",
            "lesson18-free-order-and-complete-clauses",
            "lesson18-integrated-and-short-pronominal",
            "lesson18-male-bonding",
            "lesson18-marked-supplementation",
            "lesson18-principal-deletion-and-command-subject",
            "lesson18-real-vocatives",
        ],
        acceptedGroups: [
            "lesson18-ayi-silent-object",
            "lesson18-collective-and-named-partner",
            "lesson18-discontinuous-supplementation",
            "lesson18-free-order-and-complete-clauses",
            "lesson18-integrated-and-short-pronominal",
            "lesson18-male-bonding",
            "lesson18-marked-supplementation",
            "lesson18-principal-deletion-and-command-subject",
            "lesson18-real-vocatives",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
