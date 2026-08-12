"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson3_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.resolve(
        __dirname,
        "../../docs/canvas-progress/lesson3-review-ledger.json"
    ), "utf8"));
    const accepted = ledger.records.filter((record) => record.reviewStatus === "ACCEPTED");
    const ideas = ctx.LESSON3_READER_GUIDANCE_GROUPS;
    const panel = ctx.ClassicalAuthorityPanel();
    const visibleGuide = panel.slice(
        panel.indexOf('id="classical-reader-guidance"'),
        panel.indexOf('id="classical-canvas-grammar-facts"')
    );

    s.eq("all accepted Lesson 3 atoms point to one of three collapsed reading ideas", {
        accepted: accepted.length,
        ideas: ideas.length,
        missing: accepted.filter((record) => !ideas.some((idea) => idea.ideaId === record.reviewGroupId)).map((record) => record.atomId),
    }, { accepted: 37, ideas: 3, missing: [] });

    for (const idea of ideas) {
        s.ok(`${idea.ideaId} is visible in the Lesson 3 reading guide`,
            visibleGuide.includes(`data-classical-reader-guidance-group="${idea.ideaId}"`)
            && visibleGuide.includes(idea.title)
            && visibleGuide.includes(idea.guidance));
    }
    for (const record of accepted) {
        const idea = ideas.find((candidate) => candidate.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} is presented through its accepted Lesson 3 reading idea`,
            Boolean(idea)
            && visibleGuide.includes(`data-classical-reader-guidance-group="${idea.ideaId}"`)
            && visibleGuide.includes(idea.guidance));
        const brokenIdeas = ideas.filter((candidate) => candidate.ideaId !== record.reviewGroupId);
        s.no(`${record.atomId} rejects removal of its reading job`,
            ctx.isLesson3ReaderGuidanceExact(brokenIdeas));
    }
    s.ok("Lesson 3 guidance is collapsed and does not mention atoms",
        visibleGuide.includes('data-classical-reader-guidance-lesson="3"')
        && !/atom/iu.test(visibleGuide));
    s.ok("removing one Lesson 3 idea fails the exact guide check",
        ctx.isLesson3ReaderGuidanceExact(ideas)
        && !ctx.isLesson3ReaderGuidanceExact(ideas.slice(0, -1)));
    s.ok("reading guidance cannot authorize a Source or Result",
        visibleGuide.includes('data-classical-source-authorizes="none"')
        && visibleGuide.includes('data-classical-result-authorizes="none"'));

    return s;
}

module.exports = { run };
