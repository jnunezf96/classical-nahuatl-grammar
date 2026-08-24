"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson35_contradiction_audit");
    const read = name => JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress", name), "utf8"));
    const audit = read("lesson35-contradiction-audit.json");
    const ledger = read("lesson35-review-ledger.json");
    const proof = read("lesson35-implementation-proof.json");
    const accepted = ledger.records.filter(record => (
        record.reviewStatus === "ACCEPTED"
    ));
    const missing = accepted.filter(record => (
        record.implementationCredit !== "EXACTLY_OBSERVED"
        || !record.readerObservationTest
        || !record.readerMutationTest
        || (record.proposedDirection === "BOTH"
            && (!record.writingObservationTest || !record.writingMutationTest))
    ));
    s.eq("accepted Lesson 35 Groups 1-15 are uncontradicted", {
        scope: audit.scope,
        status: audit.status,
        accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, {
        scope: "accepted-groups-1-15",
        status: "UNCONTRADICTED",
        accepted: 1136,
        awaiting: 0,
        resolved: 103,
        unresolved: 0,
        resolutions: 103,
        authority: false,
    });
    s.eq("every accepted Lesson 35 atom has exact routes", {
        accepted: accepted.length,
        exact: accepted.filter(record => (
            record.implementationCredit === "EXACTLY_OBSERVED"
        )).length,
        missing: missing.map(record => record.atomId),
        proofGroups: Object.keys(proof.groups).sort(),
    }, {
        accepted: 1136,
        exact: 1136,
        missing: [],
        proofGroups: [...new Set(accepted.map(record => (
            record.reviewGroupId
        )))].sort(),
    });
    return s;
}

module.exports = { run };
