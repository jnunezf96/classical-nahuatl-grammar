"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson23_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson23-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON23_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="23"',
    );
    const end = panel.indexOf('id="classical-canvas-grammar-facts"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 23 atoms point to eight collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => ideaIds.includes(record.reviewGroupId)),
    }, { accepted: 149, groups: 8, ideas: 8, exactIds: true });
    s.eq("Lesson 23 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(
            /data-classical-reader-guidance-lesson="23"/gu,
        ) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu,
        ) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="23"[^>]*\sopen/gu
            .test(panel),
        beforeFacts: start >= 0 && end > start,
    }, {
        lessonSections: 1,
        cards: 8,
        openByDefault: false,
        beforeFacts: true,
    });
    s.ok(
        "Lesson 23 guidance exposes only the choices needed for the composition",
        ideas[0].guidance.includes("Enter any Source")
        && ideas[0].guidance.includes("never a list of allowed inputs")
        && ideas[0].guidance.includes("only when you truly intend")
        && ideas[1].guidance.includes("operations actually needed for the final composition")
        && ideas[1].guidance.includes("There is no one-object, two-object, three-object, or slot-count choice")
        && ideas[2].guidance.includes("in the order needed")
        && ideas[2].guidance.includes("assigns contiguous levels automatically")
        && ideas[3].guidance.includes("any directive Source")
        && ideas[3].guidance.includes("genuine Source-meaning support")
        && ideas[4].guidance.includes("Every Valence position and subposition remains present")
        && ideas[4].guidance.includes("Do not choose position filling")
        && ideas[5].guidance.includes("Causative normally precedes applicative")
        && ideas[5].guidance.includes("all remain structurally present")
        && ideas[6].guidance.includes("0-0 or 0-im")
        && ideas[6].guidance.includes("without asking you to choose a carrier")
        && ideas[7].guidance.includes("orders carriers by form")
        && ideas[7].guidance.includes("Only when two distinct role mappings truly produce the same visible sequence")
        && ideas.every((entry) => entry.guidance.includes("clickable")),
    );
    for (const record of accepted) {
        const idea = ideas.find((entry) => entry.ideaId === record.reviewGroupId);
        s.ok(
            `${record.atomId} has its accepted reading job`,
            Boolean(idea?.title && idea?.guidance),
        );
        s.eq(
            `mutation:${record.atomId} fails when its reading idea is removed`,
            ctx.isLesson23ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
