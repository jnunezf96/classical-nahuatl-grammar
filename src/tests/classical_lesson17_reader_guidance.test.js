"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson17_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson17-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON17_READER_GUIDANCE_GROUPS;
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="17"',
    );
    const end = panel.indexOf('id="classical-canvas-grammar-facts"');
    const visible = panel.slice(start, end);

    s.eq("all accepted Lesson 17 atoms point to one collapsed reading idea", {
        accepted: accepted.length,
        ideas: ideas.length,
        missing: accepted
            .filter((record) => !ideas.some((idea) => (
                idea.ideaId === record.reviewGroupId
            )))
            .map((record) => record.atomId),
    }, { accepted: 253, ideas: 7, missing: [] });
    for (const record of accepted) {
        const idea = ideas.find((candidate) => (
            candidate.ideaId === record.reviewGroupId
        ));
        s.ok(
            `${record.atomId} is presented through its accepted Lesson 17 reading job`,
            Boolean(idea)
                && visible.includes(idea.title)
                && visible.includes(idea.guidance),
        );
        s.no(
            `mutation:${record.atomId} fails if its Lesson 17 reading job is removed`,
            ctx.isLesson17ReaderGuidanceExact(
                ideas.filter((candidate) => (
                    candidate.ideaId !== record.reviewGroupId
                )),
            ),
        );
    }
    s.ok(
        "Lesson 17 stays collapsed, non-authorizing, and free of atom bookkeeping",
        visible.includes('data-classical-reader-guidance-lesson="17"')
            && !/Lesson 17[^]*atom/iu.test(visible)
            && panel.includes('data-classical-source-authorizes="none"')
            && panel.includes('data-classical-result-authorizes="none"'),
    );
    return s;
}

module.exports = { run };
