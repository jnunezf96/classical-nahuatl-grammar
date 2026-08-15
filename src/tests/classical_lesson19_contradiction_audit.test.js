"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson19_contradiction_audit");
    const read = (name) => JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", name),
        "utf8",
    ));
    const audit = read("lesson19-contradiction-audit.json");
    const ledger = read("lesson19-review-ledger.json");
    const proof = read("lesson19-implementation-proof.json");
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

    s.eq("accepted Lesson 19 Groups 1-9 are uncontradicted", {
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
        accepted: 593,
        awaiting: 0,
        resolved: 35,
        unresolved: 0,
        resolutions: 35,
        authority: false,
    });
    s.eq("every accepted Lesson 19 atom has exact normal and mutation routes", {
        accepted: accepted.length,
        awaiting: awaiting.length,
        exact: accepted.filter((record) => (
            record.implementationCredit === "EXACTLY_OBSERVED"
        )).length,
        missingExactRoutes,
    }, { accepted: 593, awaiting: 0, exact: 593, missingExactRoutes: [] });
    s.eq("the nine accepted Lesson 19 groups receive proof", {
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
            "lesson19-causing-and-requesting-content",
            "lesson19-deleted-saying-principals",
            "lesson19-included-subject-possessor-and-recursion",
            "lesson19-perception-cognition-and-emotion",
            "lesson19-pronominal-existentials-and-included-reference",
            "lesson19-same-subject-futures-and-rumored-report",
            "lesson19-speech-and-question-content",
            "lesson19-vnc-supplements-and-shared-heads",
            "lesson19-wishes-and-realizability",
        ],
        acceptedGroups: [
            "lesson19-causing-and-requesting-content",
            "lesson19-deleted-saying-principals",
            "lesson19-included-subject-possessor-and-recursion",
            "lesson19-perception-cognition-and-emotion",
            "lesson19-pronominal-existentials-and-included-reference",
            "lesson19-same-subject-futures-and-rumored-report",
            "lesson19-speech-and-question-content",
            "lesson19-vnc-supplements-and-shared-heads",
            "lesson19-wishes-and-realizability",
        ],
        remaining: [],
    });
    return s;
}

module.exports = { run };
