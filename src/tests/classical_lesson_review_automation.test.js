"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson_review_automation");
    const source = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "ANDREWS_ATOM_LEDGER.json"),
        "utf8"
    ));
    const review = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", "lesson3-review-ledger.json"),
        "utf8"
    ));
    const plan = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", "lesson3-review-plan.json"),
        "utf8"
    ));
    const atomIdIndex = source.codebook.atomTuple.indexOf("atomId");
    const sectionIndex = source.codebook.atomTuple.indexOf("canvasSection");
    const lesson3Ids = source.atoms
        .filter(atom => /^§3(?:\.|$)/u.test(atom[sectionIndex]))
        .map(atom => atom[atomIdIndex]);
    const reviewIds = review.records.map(record => record.atomId);

    s.eq("automation includes every Lesson 3 atom once in Canvas order", {
        source: lesson3Ids.length,
        review: reviewIds.length,
        unique: new Set(reviewIds).size,
        sameOrder: JSON.stringify(lesson3Ids) === JSON.stringify(reviewIds),
    }, {
        source: 204,
        review: 204,
        unique: 204,
        sameOrder: true,
    });

    s.eq("all ten review groups are batched three at a time", {
        plannedGroups: plan.groups.length,
        reviewGroups: review.groups.length,
        batches: review.counts.batches,
        firstBatchGroups: review.groups
            .filter(group => group.batchNumber === 1)
            .map(group => group.groupNumber),
    }, {
        plannedGroups: 10,
        reviewGroups: 10,
        batches: 4,
        firstBatchGroups: [1, 2, 3],
    });

    s.eq("automation credits only accepted groups with exact working proof", {
        both: review.counts.proposedBoth,
        readingOnly: review.counts.proposedReadingOnly,
        awaiting: review.counts.awaitingReview,
        accepted: review.counts.acceptedAtoms,
        credit: review.counts.implementationCredit,
        falseCredit: review.records
            .filter(record => record.reviewStatus !== "ACCEPTED")
            .filter(record => record.implementationCredit === "EXACTLY_OBSERVED")
            .map(record => record.atomId),
    }, {
        both: 176,
        readingOnly: 28,
        awaiting: 7,
        accepted: 197,
        credit: 197,
        falseCredit: [],
    });

    s.eq("non-grammar records remain reading-only proposals", review.records
        .filter(record => record.sourceForce !== "grammar-bearing")
        .filter(record => record.proposedDirection !== "READING_ONLY"
            || record.proposedWritingJob !== "NOT_A_WRITING_JOB")
        .map(record => record.atomId), []);

    s.eq("alternatives never automatically become user controls", review.records
        .filter(record => record.sourceCategory === "ALT")
        .filter(record => record.proposedWritingJob
            !== "PRESERVE_A_LICENSED_ALTERNATIVE_WITHOUT_ASSUMING_WHO_CHOOSES")
        .map(record => record.atomId), []);

    const withoutOneAtom = review.records.slice(1);
    s.ok("removing one atom breaks exact Lesson 3 coverage",
        withoutOneAtom.length !== lesson3Ids.length
        && JSON.stringify(withoutOneAtom.map(record => record.atomId))
            !== JSON.stringify(lesson3Ids));

    return s;
}

module.exports = { run };
