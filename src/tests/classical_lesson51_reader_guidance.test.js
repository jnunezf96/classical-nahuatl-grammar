"use strict";
const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson51_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson51-review-ledger.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson51-review-plan.json"), "utf8"));
    const records = ledger.records.filter(record => record.implementationCredit === "EXACTLY_OBSERVED" && record.reviewStatus === "IMPLEMENTATION_PROVEN");
    const ideas = ctx.LESSON51_READER_GUIDANCE_GROUPS;
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="51"');
    const html = panel.slice(start, panel.indexOf("</details>", start) + "</details>".length);
    s.eq("Lesson 51 guidance covers the exact technical-proof groups", {
        guidance: ideas.map(group => group.ideaId),
        plan: plan.groups.map(group => group.groupId),
        ledgerGroups: [...new Set(records.map(record => record.reviewGroupId))],
        atoms: records.length,
    }, {
        guidance: plan.groups.map(group => group.groupId),
        plan: plan.groups.map(group => group.groupId),
        ledgerGroups: plan.groups.map(group => group.groupId),
        atoms: 241,
    });
    for (const group of ideas) {
        const groupRecords = records.filter(record => record.reviewGroupId === group.ideaId);
        s.ok(`Lesson 51 ${group.ideaId} guidance is delivered`, groupRecords.length > 0
            && groupRecords.every(record => record.readerGuidanceIdeaId === group.ideaId && record.readerObservationTest.includes("classical_lesson51_reader_guidance.test.js"))
            && html.includes(`data-classical-reader-guidance-group="${group.ideaId}"`));
    }
    s.ok("Lesson 51 guidance remains non-authoritative", !html.includes('grammarAuthority="true"')
        && ledger.authority.reviewLedgerAuthorizesGrammar === false
        && ctx.isLesson51ReaderGuidanceExact(ideas));
    return s;
}
module.exports = { run };
