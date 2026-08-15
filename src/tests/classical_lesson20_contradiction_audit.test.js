"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson20_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson20-contradiction-audit.json");
    const ledger = read("lesson20-review-ledger.json");
    const proof = read("lesson20-implementation-proof.json");
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

    s.eq("accepted Lesson 20 Groups 1-8 are uncontradicted", {
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
        resolved: 41,
        unresolved: 0,
        resolutions: 41,
        authority: false,
    });
    s.eq("every accepted Lesson 20 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => (
            record.implementationCredit === "EXACTLY_OBSERVED"
        )).length,
        missingExactRoutes,
    }, { accepted: 251, awaiting: 0, exact: 251, missingExactRoutes: [] });
    s.eq("all eight accepted Lesson 20 groups receive proof", {
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
            "lesson20-class-c-d-lo-and-irregular-lohua",
            "lesson20-hua-nonactive-formation",
            "lesson20-hualo-free-variants",
            "lesson20-nonactive-class-a-and-perfective",
            "lesson20-nonactive-foundation-and-suffixes",
            "lesson20-o-nonactive-formation",
            "lesson20-ohua-nonactive-formation",
            "lesson20-regular-lo-and-root-ya",
        ],
        acceptedGroups: [
            "lesson20-class-c-d-lo-and-irregular-lohua",
            "lesson20-hua-nonactive-formation",
            "lesson20-hualo-free-variants",
            "lesson20-nonactive-class-a-and-perfective",
            "lesson20-nonactive-foundation-and-suffixes",
            "lesson20-o-nonactive-formation",
            "lesson20-ohua-nonactive-formation",
            "lesson20-regular-lo-and-root-ya",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
