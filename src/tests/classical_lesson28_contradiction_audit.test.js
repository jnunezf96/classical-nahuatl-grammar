"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson28_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson28-contradiction-audit.json");
    const ledger = read("lesson28-review-ledger.json");
    const proof = read("lesson28-implementation-proof.json");
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

    s.eq("accepted Lesson 28 Groups 1-12 are uncontradicted", {
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
        accepted: 614,
        awaiting: 0,
        resolved: 110,
        unresolved: 0,
        resolutions: 110,
        authority: false,
    });
    s.eq("every accepted Lesson 28 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
        missingExactRoutes,
    }, { accepted: 614, awaiting: 0, exact: 614, missingExactRoutes: [] });
    s.eq("all twelve accepted groups receive exact proof", {
        proofGroups: Object.keys(proof.groups).sort(),
        acceptedGroups: ledger.groups
            .filter((group) => group.reviewStatus === "ACCEPTED")
            .map((group) => group.groupId)
            .sort(),
        next: ledger.groups
            .filter((group) => group.reviewStatus === "AWAITING_USER_REVIEW")
            .slice(0, 1)
            .map((group) => [group.groupNumber, group.atomCount, group.proposedBoth, group.proposedReadingOnly]),
    }, {
        proofGroups: [
            "lesson28-accompanying-possession",
            "lesson28-ca-nemi-and-yauh-matrices",
            "lesson28-compounding-foundation-and-embed-matrix-order",
            "lesson28-connective-t-foundation",
            "lesson28-future-embed-compounds",
            "lesson28-hualla-huitz-ahci-mani-ihca-matrices",
            "lesson28-intransitivized-reflexive-matrix",
            "lesson28-linked-integrated-and-valence-system",
            "lesson28-o-ehua-quiza-huetzi-and-other-matrices",
            "lesson28-recursive-compounding",
            "lesson28-shared-object-compounds",
            "lesson28-special-embeds-event-order-and-nonactive-scope",
        ],
        acceptedGroups: [
            "lesson28-accompanying-possession",
            "lesson28-ca-nemi-and-yauh-matrices",
            "lesson28-compounding-foundation-and-embed-matrix-order",
            "lesson28-connective-t-foundation",
            "lesson28-future-embed-compounds",
            "lesson28-hualla-huitz-ahci-mani-ihca-matrices",
            "lesson28-intransitivized-reflexive-matrix",
            "lesson28-linked-integrated-and-valence-system",
            "lesson28-o-ehua-quiza-huetzi-and-other-matrices",
            "lesson28-recursive-compounding",
            "lesson28-shared-object-compounds",
            "lesson28-special-embeds-event-order-and-nonactive-scope",
        ],
        next: [],
    });
    return s;
}

module.exports = { run };
