"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson26_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson26-contradiction-audit.json");
    const ledger = read("lesson26-review-ledger.json");
    const proof = read("lesson26-implementation-proof.json");
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

    s.eq("accepted Lesson 26 Groups 1-12 are uncontradicted", {
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
        accepted: 664,
        awaiting: 0,
        resolved: 82,
        unresolved: 0,
        resolutions: 82,
        authority: false,
    });
    s.eq("every accepted Lesson 26 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
        missingExactRoutes,
    }, { accepted: 664, awaiting: 0, exact: 664, missingExactRoutes: [] });
    s.eq("all twelve Lesson 26 groups receive exact proof", {
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
            "lesson26-ambiguity-mood-and-voice",
            "lesson26-applicative-foundation-and-irregular-sources",
            "lesson26-double-object-applicatives",
            "lesson26-final-a-source-routes",
            "lesson26-oa-and-huia-routes",
            "lesson26-object-interpretation-and-applicative-unit",
            "lesson26-shape-and-class-exceptions",
            "lesson26-single-object-applicatives",
            "lesson26-special-and-parallel-applicatives",
            "lesson26-triple-object-applicatives",
            "lesson26-type-one-applicatives",
            "lesson26-type-two-foundation-and-final-i",
        ],
        acceptedGroups: [
            "lesson26-ambiguity-mood-and-voice",
            "lesson26-applicative-foundation-and-irregular-sources",
            "lesson26-double-object-applicatives",
            "lesson26-final-a-source-routes",
            "lesson26-oa-and-huia-routes",
            "lesson26-object-interpretation-and-applicative-unit",
            "lesson26-shape-and-class-exceptions",
            "lesson26-single-object-applicatives",
            "lesson26-special-and-parallel-applicatives",
            "lesson26-triple-object-applicatives",
            "lesson26-type-one-applicatives",
            "lesson26-type-two-foundation-and-final-i",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
