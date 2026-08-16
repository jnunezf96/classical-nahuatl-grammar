"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson21_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson21-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON21_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="21"',
    );
    const nextLesson = panel.indexOf(
        'data-classical-reader-guidance-lesson="22"',
        start,
    );
    const facts = panel.indexOf('id="classical-canvas-grammar-facts"');
    const end = nextLesson > start ? nextLesson : facts;
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 21 atoms point to eight collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => (
            ideaIds.includes(record.reviewGroupId)
        )),
    }, { accepted: 161, groups: 8, ideas: 8, exactIds: true });
    s.eq("Lesson 21 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(
            /data-classical-reader-guidance-lesson="21"/gu,
        ) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu,
        ) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="21"[^>]*\sopen/gu
            .test(panel),
        beforeFacts: start >= 0 && end > start,
    }, {
        lessonSections: 1,
        cards: 8,
        openByDefault: false,
        beforeFacts: true,
    });
    s.ok(
        "Lesson 21 guidance preserves the familiar workflow and only real choices",
        ideas[0].guidance.includes("Compose the active VNC first")
        && ideas[0].guidance.includes("There is no keep-agent choice")
        && ideas[1].guidance.includes("move automatically")
        && ideas[1].guidance.includes("silence never becomes another user choice")
        && ideas[2].guidance.includes("shuntline ne remains automatically")
        && ideas[2].guidance.includes("only when a plural Source genuinely supports both interpretations")
        && ideas[3].guidance.includes("different grammatical kinds already decide the outcome")
        && ideas[3].guidance.includes("Do not choose a promotion target")
        && ideas[4].guidance.includes("mainline object recorded in the active Source")
        && ideas[4].guidance.includes("only when composing a genuinely ambiguous active Source")
        && ideas[5].guidance.includes("regardless of its earlier line status")
        && ideas[5].guidance.includes("there is no three-object mode")
        && ideas[6].guidance.includes("familiar mood and sentence controls")
        && ideas[6].guidance.includes("There are no passive-specific mood controls")
        && ideas[7].guidance.includes("formula remains active and reflexive")
        && ideas[7].guidance.includes("Use the Reading choice only where"),
    );
    for (const record of accepted) {
        const idea = ideas.find((entry) => (
            entry.ideaId === record.reviewGroupId
        ));
        s.ok(
            `${record.atomId} has its accepted reading job`,
            Boolean(idea?.title && idea?.guidance),
        );
        s.eq(
            `mutation:${record.atomId} fails when its reading idea is removed`,
            ctx.isLesson21ReaderGuidanceExact(
                ideas.filter((entry) => (
                    entry.ideaId !== record.reviewGroupId
                )),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
