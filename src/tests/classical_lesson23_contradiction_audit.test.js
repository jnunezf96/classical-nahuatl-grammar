"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson23_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson23-contradiction-audit.json");
    const ledger = read("lesson23-review-ledger.json");
    const proof = read("lesson23-implementation-proof.json");
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

    s.eq("complete Lesson 23 is uncontradicted", {
        scope: audit.scope,
        status: audit.status,
        accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, {
        scope: "complete-lesson",
        status: "UNCONTRADICTED",
        accepted: 149,
        awaiting: 0,
        resolved: 52,
        unresolved: 0,
        resolutions: 52,
        authority: false,
    });
    s.eq("every accepted Lesson 23 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => (
            record.implementationCredit === "EXACTLY_OBSERVED"
        )).length,
        missingExactRoutes,
    }, { accepted: 149, awaiting: 0, exact: 149, missingExactRoutes: [] });
    s.eq("all eight accepted Lesson 23 groups receive exact proof", {
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
            "lesson23-directive-source-histories",
            "lesson23-filled-positions-and-mainline-reflexive",
            "lesson23-intransitive-source-histories",
            "lesson23-multiple-valence-formula-and-silencing",
            "lesson23-multiple-valence-foundation",
            "lesson23-object-functions-and-governors",
            "lesson23-object-order-and-role-ambiguity",
            "lesson23-suffix-history-and-specific-incompatibility",
        ],
        acceptedGroups: [
            "lesson23-directive-source-histories",
            "lesson23-filled-positions-and-mainline-reflexive",
            "lesson23-intransitive-source-histories",
            "lesson23-multiple-valence-formula-and-silencing",
            "lesson23-multiple-valence-foundation",
            "lesson23-object-functions-and-governors",
            "lesson23-object-order-and-role-ambiguity",
            "lesson23-suffix-history-and-specific-incompatibility",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
