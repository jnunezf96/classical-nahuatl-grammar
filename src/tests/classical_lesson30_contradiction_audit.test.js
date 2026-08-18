"use strict";
const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const ROOT = path.resolve(__dirname, "..", "..");
function run() {
    const s = createSuite("classical_lesson30_contradiction_audit");
    const read = name => JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress", name), "utf8"));
    const audit = read("lesson30-contradiction-audit.json");
    const ledger = read("lesson30-review-ledger.json");
    const proof = read("lesson30-implementation-proof.json");
    const accepted = ledger.records.filter(record => record.reviewStatus === "ACCEPTED");
    const missing = accepted.filter(record => record.implementationCredit !== "EXACTLY_OBSERVED"
        || !record.readerObservationTest || !record.readerMutationTest
        || (record.proposedDirection === "BOTH"
            && (!record.writingObservationTest || !record.writingMutationTest)));
    s.eq("accepted Lesson 30 Groups 1-3 are uncontradicted", {
        scope: audit.scope, status: audit.status, accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount, resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount, resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, { scope: "accepted-groups-1-3", status: "UNCONTRADICTED", accepted: 148,
        awaiting: 856, resolved: 18, unresolved: 0, resolutions: 18, authority: false });
    s.eq("every accepted Lesson 30 atom has exact routes", {
        accepted: accepted.length,
        exact: accepted.filter(record => record.implementationCredit === "EXACTLY_OBSERVED").length,
        missing: missing.map(record => record.atomId),
        proofGroups: Object.keys(proof.groups).sort(),
    }, { accepted: 148, exact: 148, missing: [], proofGroups: [...new Set(
        accepted.map(record => record.reviewGroupId))].sort() });
    return s;
}
module.exports = { run };
