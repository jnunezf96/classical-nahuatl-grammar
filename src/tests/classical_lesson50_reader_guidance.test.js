"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson50_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson50-review-ledger.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson50-review-plan.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.implementationCredit === "EXACTLY_OBSERVED"
        && record.reviewStatus === "IMPLEMENTATION_PROVEN"
    ));
    const ideas = ctx.LESSON50_READER_GUIDANCE_GROUPS;
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="50"');
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const html = panel.slice(start, end);

    s.eq("Lesson 50 guidance covers the exact technical-proof groups", {
        guidance: ideas.map(group => group.ideaId),
        plan: plan.groups.map(group => group.groupId),
        ledgerGroups: [...new Set(records.map(record => record.reviewGroupId))],
        atoms: records.length,
        status: [...new Set(records.map(record => record.reviewStatus))],
    }, {
        guidance: plan.groups.map(group => group.groupId),
        plan: plan.groups.map(group => group.groupId),
        ledgerGroups: plan.groups.map(group => group.groupId),
        atoms: 939,
        status: ["IMPLEMENTATION_PROVEN"],
    });

    for (const group of ideas) {
        const groupRecords = records.filter(record => (
            record.reviewGroupId === group.ideaId
        ));
        s.ok(
            `Lesson 50 ${group.ideaId} guidance is delivered for every atom`,
            groupRecords.length > 0
            && groupRecords.every(record => (
                record.readerGuidanceIdeaId === group.ideaId
                && record.readerObservationTest.includes(
                    "classical_lesson50_reader_guidance.test.js"
                )
            ))
            && html.includes(
                `data-classical-reader-guidance-group="${group.ideaId}"`
            ),
        );
    }

    s.ok(
        "Lesson 50 guidance remains descriptive rather than grammatical authority",
        !html.includes('grammarAuthority="true"')
        && ledger.authority.reviewLedgerAuthorizesGrammar === false
        && ledger.authority.automationMayInventGrammar === false
        && ctx.isLesson50ReaderGuidanceExact(ideas),
    );

    return s;
}

module.exports = { run };
