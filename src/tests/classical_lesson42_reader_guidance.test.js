"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson42_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson42-review-ledger.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson42-review-plan.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.implementationCredit === "EXACTLY_OBSERVED"
        && ["ACCEPTED", "IMPLEMENTATION_PROVEN"].includes(
            record.reviewStatus
        )
    ));
    const ideas = ctx.LESSON42_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(
        group => group.ideaId
    );
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="42"'
    );
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const html = panel.slice(start, end);

    s.eq("Lesson 42 guidance covers the exact technical-proof groups", {
        guidance: ids,
        plan: plan.groups.map(group => group.groupId),
        ledgerGroups: [...new Set(records.map(
            record => record.reviewGroupId
        ))],
        atoms: records.length,
        status: [...new Set(records.map(record => record.reviewStatus))],
    }, {
        guidance: plan.groups.map(group => group.groupId),
        plan: plan.groups.map(group => group.groupId),
        ledgerGroups: plan.groups.map(group => group.groupId),
        atoms: 383,
        status: ["IMPLEMENTATION_PROVEN"],
    });

    for (const group of ideas) {
        const groupRecords = records.filter(record => (
            record.reviewGroupId === group.ideaId
        ));
        s.ok(
            `Lesson 42 ${group.ideaId} guidance is delivered for every atom`,
            groupRecords.length > 0
            && groupRecords.every(record => (
                record.readerGuidanceIdeaId === group.ideaId
                && record.readerObservationTest.includes(
                    "classical_lesson42_reader_guidance.test.js"
                )
            ))
            && html.includes(
                `data-classical-reader-guidance-group="${group.ideaId}"`
            ),
        );
    }

    s.ok(
        "Lesson 42 guidance remains descriptive rather than grammatical authority",
        !html.includes("grammarAuthority=\"true\"")
        && ledger.authority.reviewLedgerAuthorizesGrammar === false
        && ledger.authority.automationMayInventGrammar === false
        && ctx.isLesson42ReaderGuidanceExact(ideas),
    );

    return s;
}

module.exports = { run };
