"use strict";
const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const ROOT = path.resolve(__dirname, "..", "..");
function run() {
    const s = createSuite("classical_lesson29_contradiction_audit");
    const read = name => JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress", name), "utf8"));
    const audit = read("lesson29-contradiction-audit.json");
    const ledger = read("lesson29-review-ledger.json");
    const proof = read("lesson29-implementation-proof.json");
    const accepted = ledger.records.filter(r => r.reviewStatus === "ACCEPTED");
    const missing = accepted.filter(r => r.implementationCredit !== "EXACTLY_OBSERVED"
        || !r.readerObservationTest || !r.readerMutationTest
        || (r.proposedDirection === "BOTH" && (!r.writingObservationTest || !r.writingMutationTest)));
    s.eq("accepted Lesson 29 Groups 1-12 are uncontradicted", {
        scope: audit.scope, status: audit.status, accepted: audit.acceptedAtomCount,
        awaiting: audit.awaitingReviewAtomCount, resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount, resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, { scope: "accepted-groups-1-12", status: "UNCONTRADICTED", accepted: 346,
        awaiting: 0, resolved: 74, unresolved: 0, resolutions: 74, authority: false });
    s.eq("every accepted Lesson 29 atom has exact routes", {
        accepted: accepted.length, exact: accepted.filter(r => r.implementationCredit === "EXACTLY_OBSERVED").length,
        missing: missing.map(r => r.atomId), proofGroups: Object.keys(proof.groups).sort(),
    }, { accepted: 346, exact: 346, missing: [], proofGroups: [
        "lesson29-compound-stemmed-purposive-embeds",
        "lesson29-external-directionals-and-fulfilled-purpose",
        "lesson29-inbound-future",
        "lesson29-inbound-nonfuture",
        "lesson29-inbound-optative",
        "lesson29-internal-directional-matrix",
        "lesson29-nonactive-purposive-embeds",
        "lesson29-outbound-nonpast-and-progressive-contrast",
        "lesson29-outbound-optative",
        "lesson29-outbound-past",
        "lesson29-purposeful-motion-base-and-series-system",
        "lesson29-purposive-foundation-and-future-embed",
    ] });
    return s;
}
module.exports = { run };
