"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson2_reader_guidance");
    const ideas = ctx.LESSON2_READER_GUIDANCE_GROUPS;
    const authorityPanel = ctx.ClassicalAuthorityPanel();
    const guideStart = authorityPanel.indexOf('id="classical-reader-guidance"');
    const guideEnd = authorityPanel.indexOf('id="classical-canvas-grammar-facts"');
    const visibleGuide = authorityPanel.slice(guideStart, guideEnd);
    const ledger = JSON.parse(fs.readFileSync(path.resolve(
        __dirname,
        "../../docs/canvas-progress/lesson2-job-ledger.json"
    ), "utf8"));
    const ideaIds = ideas.map((idea) => idea.ideaId);
    const ledgerFamilies = [...new Set(ledger.records.map((record) => record.jobFamily))];

    s.eq("Lesson 2 collapses its complete reading record into twelve ideas", {
        lesson2Records: ledger.records.length,
        ideaCount: ideas.length,
        uniqueIdeaCount: new Set(ideaIds).size,
        ledgerFamilyCount: ledgerFamilies.length,
        missingIdeaForFamily: ledgerFamilies.filter((family) => !ideaIds.includes(family)),
        unusedIdeas: ideaIds.filter((ideaId) => !ledgerFamilies.includes(ideaId)),
        recordsMappedToWrongIdea: ledger.records
            .filter((record) => record.readerGuidanceIdeaId !== record.jobFamily)
            .map((record) => record.atomId),
        recordsNotPresented: ledger.records
            .filter((record) => record.directionStatus?.READING_AND_INTERPRETATION
                !== "EXACTLY_PRESENTED")
            .map((record) => record.atomId),
    }, {
        lesson2Records: 539,
        ideaCount: 12,
        uniqueIdeaCount: 12,
        ledgerFamilyCount: 12,
        missingIdeaForFamily: [],
        unusedIdeas: [],
        recordsMappedToWrongIdea: [],
        recordsNotPresented: [],
    });

    s.ok("the Reading guide contains a collapsed Lesson 2 subsection",
        visibleGuide.includes('data-classical-reader-guidance-lesson="2"')
        && visibleGuide.includes("<span>Lesson 2</span>")
        && visibleGuide.includes("Reading sounds, spelling, and sound changes"));

    for (const idea of ideas) {
        s.ok(`${idea.ideaId} is presented once within Lesson 2`,
            visibleGuide.includes(`data-classical-reader-guidance-group="${idea.ideaId}"`)
            && visibleGuide.includes(`data-classical-reader-guidance-idea="${idea.ideaId}"`)
            && visibleGuide.includes(idea.title)
            && visibleGuide.includes(idea.guidance));
    }

    s.ok("the visible Lesson 2 guide contains no bookkeeping language",
        !/atom/iu.test(visibleGuide)
        && !visibleGuide.includes("support this idea")
        && !visibleGuide.includes("exact Lesson 2"));

    const missingIdeaMutation = ideas.slice(0, -1);
    s.ok("removing any summarized Lesson 2 idea fails the exact guide check",
        ctx.isLesson2ReaderGuidanceExact(ideas)
        && !ctx.isLesson2ReaderGuidanceExact(missingIdeaMutation));

    s.ok("Lesson 2 reading guidance cannot authorize or compose a Result",
        visibleGuide.includes('data-classical-source-authorizes="none"')
        && visibleGuide.includes('data-classical-result-authorizes="none"'));

    return s;
}

module.exports = { run };
