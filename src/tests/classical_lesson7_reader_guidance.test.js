"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson7_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson7-review-ledger.json"
    ), "utf8"));
    const accepted = ledger.records.filter((record) => record.reviewStatus === "ACCEPTED");
    const ideas = ctx.LESSON7_READER_GUIDANCE_GROUPS;
    const panel = ctx.ClassicalAuthorityPanel();
    const guideStart = panel.indexOf('id="classical-reader-guidance"');
    const guideEnd = panel.indexOf('id="classical-canvas-grammar-facts"');
    const visibleGuide = panel.slice(guideStart, guideEnd);

    s.eq("all accepted Lesson 7 atoms point to one collapsed reading idea", {
        accepted: accepted.length,
        ideas: ideas.length,
        missing: accepted.filter((record) => !ideas.some((idea) => idea.ideaId === record.reviewGroupId)).map((record) => record.atomId),
    }, { accepted: 107, ideas: 6, missing: [] });
    for (const record of accepted) {
        const idea = ideas.find((candidate) => candidate.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} is presented through its accepted Lesson 7 reading job`,
            Boolean(idea)
            && visibleGuide.includes(`data-classical-reader-guidance-group="${idea.ideaId}"`)
            && visibleGuide.includes(idea.title)
            && visibleGuide.includes(idea.guidance));
        s.no(`${record.atomId} fails if its Lesson 7 reading job is removed`,
            ctx.isLesson7ReaderGuidanceExact(
                ideas.filter((candidate) => candidate.ideaId !== record.reviewGroupId)
            ));
    }
    s.ok("Lesson 7 guidance stays collapsed and does not expose atom bookkeeping",
        visibleGuide.includes('data-classical-reader-guidance-lesson="7"')
        && !/Lesson 7[^]*atom/iu.test(visibleGuide));
    s.ok("the reading guide remains non-authorizing",
        visibleGuide.includes('data-classical-source-authorizes="none"')
        && visibleGuide.includes('data-classical-result-authorizes="none"'));
    return s;
}

module.exports = { run };
