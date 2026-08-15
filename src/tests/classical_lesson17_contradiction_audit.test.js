"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson17_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson17-contradiction-audit.json");
    const ledger = read("lesson17-review-ledger.json");
    const proof = read("lesson17-implementation-proof.json");
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

    s.eq("the full accepted Lesson 17 scope is uncontradicted", {
        scope: audit.scope,
        status: audit.status,
        accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, {
        scope: "full-lesson",
        status: "UNCONTRADICTED",
        accepted: 253,
        awaiting: 0,
        resolved: 10,
        unresolved: 0,
        resolutions: 10,
        authority: false,
    });
    s.eq("every accepted atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => (
            record.implementationCredit === "EXACTLY_OBSERVED"
        )).length,
        missingExactRoutes,
    }, { accepted: 253, awaiting: 0, exact: 253, missingExactRoutes: [] });
    s.eq("all seven accepted groups receive implementation proof", {
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
            "lesson17-contact-demonstratives-and-ambiguity",
            "lesson17-information-questions",
            "lesson17-recursive-supplementation",
            "lesson17-shared-object-and-possessor",
            "lesson17-shared-subject-and-have",
            "lesson17-supplementation-foundation",
            "lesson17-topic-comment",
        ],
        acceptedGroups: [
            "lesson17-contact-demonstratives-and-ambiguity",
            "lesson17-information-questions",
            "lesson17-recursive-supplementation",
            "lesson17-shared-object-and-possessor",
            "lesson17-shared-subject-and-have",
            "lesson17-supplementation-foundation",
            "lesson17-topic-comment",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
