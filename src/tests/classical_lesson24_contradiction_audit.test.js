"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson24_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson24-contradiction-audit.json");
    const ledger = read("lesson24-review-ledger.json");
    const proof = read("lesson24-implementation-proof.json");
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

    s.eq("all accepted Lesson 24 groups are uncontradicted", {
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
        accepted: 520,
        awaiting: 0,
        resolved: 74,
        unresolved: 0,
        resolutions: 74,
        authority: false,
    });
    s.eq("every accepted Lesson 24 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
        missingExactRoutes,
    }, { accepted: 520, awaiting: 0, exact: 520, missingExactRoutes: [] });
    s.eq("all eleven Lesson 24 groups receive exact proof", {
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
            "lesson24-causative-participant-transform",
            "lesson24-coalesced-and-obsolete-destockal-sources",
            "lesson24-destockal-source-architecture",
            "lesson24-final-a-and-ya-causatives",
            "lesson24-final-i-type-one-causatives",
            "lesson24-final-vowel-and-open-valence",
            "lesson24-hua-destockal-sources-and-causatives",
            "lesson24-ni-hui-causative-procedure",
            "lesson24-ni-hui-destockal-sources",
            "lesson24-short-vowel-hui-destockal-causatives",
            "lesson24-valence-neutral-sources",
        ],
        acceptedGroups: [
            "lesson24-causative-participant-transform",
            "lesson24-coalesced-and-obsolete-destockal-sources",
            "lesson24-destockal-source-architecture",
            "lesson24-final-a-and-ya-causatives",
            "lesson24-final-i-type-one-causatives",
            "lesson24-final-vowel-and-open-valence",
            "lesson24-hua-destockal-sources-and-causatives",
            "lesson24-ni-hui-causative-procedure",
            "lesson24-ni-hui-destockal-sources",
            "lesson24-short-vowel-hui-destockal-causatives",
            "lesson24-valence-neutral-sources",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
