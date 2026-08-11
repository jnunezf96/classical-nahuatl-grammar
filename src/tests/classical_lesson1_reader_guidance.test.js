"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_reader_guidance");
    const ideas = ctx.LESSON1_READER_GUIDANCE_GROUPS;
    const authorityPanel = ctx.ClassicalAuthorityPanel();
    const guideStart = authorityPanel.indexOf('id="classical-reader-guidance"');
    const guideEnd = authorityPanel.indexOf('id="classical-canvas-grammar-facts"');
    const visibleGuide = authorityPanel.slice(guideStart, guideEnd);
    const ledger = JSON.parse(fs.readFileSync(path.resolve(
        __dirname,
        "../../docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const style = fs.readFileSync(path.resolve(__dirname, "../../style.css"), "utf8");
    const ideaIds = ideas.map((idea) => idea.ideaId);
    const ideaIdSet = new Set(ideaIds);
    const ledgerFamilies = [...new Set(ledger.records.map((record) => record.jobFamily))];

    s.eq("Lesson 1 collapses its complete reading record into thirteen ideas", {
        lesson1Records: ledger.records.length,
        ideaCount: ideas.length,
        uniqueIdeaCount: ideaIdSet.size,
        ledgerFamilyCount: ledgerFamilies.length,
        missingIdeaForFamily: ledgerFamilies.filter((family) => !ideaIdSet.has(family)),
        unusedIdeas: ideaIds.filter((ideaId) => !ledgerFamilies.includes(ideaId)),
        recordsMappedToWrongIdea: ledger.records
            .filter((record) => record.readerGuidanceIdeaId !== record.jobFamily)
            .map((record) => record.atomId),
        recordsNotPresented: ledger.records
            .filter((record) => record.directionStatus.READING_AND_INTERPRETATION
                !== "EXACTLY_PRESENTED")
            .map((record) => record.atomId),
    }, {
        lesson1Records: 854,
        ideaCount: 13,
        uniqueIdeaCount: 13,
        ledgerFamilyCount: 13,
        missingIdeaForFamily: [],
        unusedIdeas: [],
        recordsMappedToWrongIdea: [],
        recordsNotPresented: [],
    });

    s.ok("the Reading guide contains a collapsed Lesson 1 subsection",
        visibleGuide.includes('data-classical-reader-guidance-lesson="1"')
        && visibleGuide.includes("<span>Lesson 1</span>")
        && visibleGuide.includes("Foundations for reading and interpretation"));

    for (const idea of ideas) {
        s.ok(`${idea.ideaId} is presented once within Lesson 1`,
            visibleGuide.includes(`data-classical-reader-guidance-group="${idea.ideaId}"`)
            && visibleGuide.includes(`data-classical-reader-guidance-idea="${idea.ideaId}"`)
            && visibleGuide.includes(idea.title)
            && visibleGuide.includes(idea.guidance));
    }

    s.ok("the visible Reading guide contains no bookkeeping language",
        !/atom/iu.test(visibleGuide)
        && !visibleGuide.includes("support this idea")
        && !visibleGuide.includes("exact Lesson 1"));

    s.ok("Lesson 1 and its ideas stay collapsed and responsively spaced",
        style.includes(".classical-reader-guidance__lesson-summary")
        && style.includes(".classical-reader-guidance__lesson-body")
        && style.includes(".classical-reader-guidance__card")
        && style.includes("grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr))")
        && style.includes("gap: 12px"));

    const missingIdeaMutation = ideas.slice(0, -1);
    s.ok("removing any summarized Lesson 1 idea fails the exact guide check",
        ctx.isLesson1ReaderGuidanceExact(ideas)
        && !ctx.isLesson1ReaderGuidanceExact(missingIdeaMutation));

    s.ok("reader guidance cannot authorize or compose a Result",
        visibleGuide.includes('data-classical-source-authorizes="none"')
        && visibleGuide.includes('data-classical-result-authorizes="none"'));

    return s;
}

module.exports = { run };
