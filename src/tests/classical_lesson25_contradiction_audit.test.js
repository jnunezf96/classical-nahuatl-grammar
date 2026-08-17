"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson25_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson25-contradiction-audit.json");
    const ledger = read("lesson25-review-ledger.json");
    const proof = read("lesson25-implementation-proof.json");
    const accepted = ledger.records.filter((record) => record.reviewStatus === "ACCEPTED");
    const awaiting = ledger.records.filter((record) => record.reviewStatus === "AWAITING_USER_REVIEW");
    const missingExactRoutes = accepted.filter((record) => (
        record.implementationCredit !== "EXACTLY_OBSERVED"
        || !record.readerObservationTest
        || !record.readerMutationTest
        || (
            record.proposedDirection === "BOTH"
            && (!record.writingObservationTest || !record.writingMutationTest)
        )
    )).map((record) => record.atomId);

    s.eq("all accepted Lesson 25 groups are uncontradicted", {
        scope: audit.scope,
        status: audit.status,
        accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, {
        scope: "accepted-groups-1-12",
        status: "UNCONTRADICTED",
        accepted: 756,
        awaiting: 0,
        resolved: 78,
        unresolved: 0,
        resolutions: 78,
        authority: false,
    });
    s.eq("every accepted Lesson 25 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
        missingExactRoutes,
    }, { accepted: 756, awaiting: 0, exact: 756, missingExactRoutes: [] });
    s.eq("all twelve Lesson 25 groups receive exact proof", {
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
            "lesson25-basic-causative-transformation",
            "lesson25-causative-ambiguity",
            "lesson25-double-object-causatives",
            "lesson25-hua-source-routes",
            "lesson25-huia-class-and-parallel-causatives",
            "lesson25-lia-causatives",
            "lesson25-lo-source-routes",
            "lesson25-mood-and-nonactive-voice",
            "lesson25-o-ohua-source-and-machtia",
            "lesson25-silent-object-supplementation",
            "lesson25-triple-object-causatives",
            "lesson25-type-two-foundation",
        ],
        acceptedGroups: [
            "lesson25-basic-causative-transformation",
            "lesson25-causative-ambiguity",
            "lesson25-double-object-causatives",
            "lesson25-hua-source-routes",
            "lesson25-huia-class-and-parallel-causatives",
            "lesson25-lia-causatives",
            "lesson25-lo-source-routes",
            "lesson25-mood-and-nonactive-voice",
            "lesson25-o-ohua-source-and-machtia",
            "lesson25-silent-object-supplementation",
            "lesson25-triple-object-causatives",
            "lesson25-type-two-foundation",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
