"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson22_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson22-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON22_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="22"',
    );
    const nextLesson = panel.indexOf(
        'data-classical-reader-guidance-lesson="23"',
    );
    const end = nextLesson >= 0
        ? nextLesson
        : panel.indexOf('id="classical-canvas-grammar-facts"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 22 atoms point to eight collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => ideaIds.includes(record.reviewGroupId)),
    }, { accepted: 251, groups: 8, ideas: 8, exactIds: true });
    s.eq("Lesson 22 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(
            /data-classical-reader-guidance-lesson="22"/gu,
        ) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu,
        ) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="22"[^>]*\sopen/gu
            .test(panel),
        beforeFacts: start >= 0 && end > start,
    }, {
        lessonSections: 1,
        cards: 8,
        openByDefault: false,
        beforeFacts: true,
    });
    s.ok(
        "Lesson 22 guidance keeps familiar controls and only real choices",
        ideas[0].guidance.includes("familiar tense or sentence form")
        && ideas[0].guidance.includes("without consulting a stem list")
        && ideas[1].guidance.includes("Supply the actual referent or supplement")
        && ideas[1].guidance.includes("never use a missing visible supplement as an impersonal choice")
        && ideas[2].guidance.includes("choose impersonal voice only when the Voice control offers it")
        && ideas[2].guidance.includes("blocked rather than repaired as passive")
        && ideas[3].guidance.includes("keeps the active Source's intransitive or transitive formula shape")
        && ideas[3].guidance.includes("without adding extra switches")
        && ideas[4].guidance.includes("Reading control offers only those licensed interpretations")
        && ideas[4].guidance.includes("never rewrites the morphology")
        && ideas[5].guidance.includes("automatically changes the reflexive carrier to shuntline ne")
        && ideas[5].guidance.includes("does not add a participant")
        && ideas[6].guidance.includes("familiar Mood and sentence controls")
        && ideas[6].guidance.includes("there is no impersonal-only mood control")
        && ideas[7].guidance.includes("derives the tla-impersonal stem")
        && ideas[7].guidance.includes("never gate the Source")
        && ideas[7].guidance.includes("Reading appears only when the known Source has a genuine intended-meaning choice")
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
            ctx.isLesson22ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
