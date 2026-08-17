"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson27_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson27-contradiction-audit.json");
    const ledger = read("lesson27-review-ledger.json");
    const proof = read("lesson27-implementation-proof.json");
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

    s.eq("accepted Lesson 27 Groups 1-11 are uncontradicted", {
        scope: audit.scope,
        status: audit.status,
        accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, {
        scope: "accepted-groups-1-11",
        status: "UNCONTRADICTED",
        accepted: 335,
        awaiting: 0,
        resolved: 28,
        unresolved: 0,
        resolutions: 28,
        authority: false,
    });
    s.eq("every accepted Lesson 27 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
        missingExactRoutes,
    }, { accepted: 335, awaiting: 0, exact: 335, missingExactRoutes: [] });
    s.eq("all eleven accepted groups receive exact proof and none remain", {
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
            "lesson27-causative-destockal-frequentatives",
            "lesson27-destockal-applicative-and-type-two-causative",
            "lesson27-extinct-fused-and-role-ambiguous-destockals",
            "lesson27-frequentative-foundation-and-shape-choice",
            "lesson27-frequentative-nonactive",
            "lesson27-intransitive-destockal-frequentatives",
            "lesson27-long-short-supportive-i-and-recursion",
            "lesson27-object-pronoun-reduplication",
            "lesson27-short-glottal-ordinary-frequentatives",
            "lesson27-uncertain-ca-frequentatives",
            "lesson27-uncertain-tzca-frequentatives",
        ],
        acceptedGroups: [
            "lesson27-causative-destockal-frequentatives",
            "lesson27-destockal-applicative-and-type-two-causative",
            "lesson27-extinct-fused-and-role-ambiguous-destockals",
            "lesson27-frequentative-foundation-and-shape-choice",
            "lesson27-frequentative-nonactive",
            "lesson27-intransitive-destockal-frequentatives",
            "lesson27-long-short-supportive-i-and-recursion",
            "lesson27-object-pronoun-reduplication",
            "lesson27-short-glottal-ordinary-frequentatives",
            "lesson27-uncertain-ca-frequentatives",
            "lesson27-uncertain-tzca-frequentatives",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
