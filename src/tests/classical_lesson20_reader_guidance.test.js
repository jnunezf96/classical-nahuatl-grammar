"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson20_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson20-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON20_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="20"',
    );
    const end = panel.indexOf(
        'data-classical-reader-guidance-lesson="21"',
    );
    const facts = panel.indexOf('id="classical-canvas-grammar-facts"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 20 atoms point to eight collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => (
            ideaIds.includes(record.reviewGroupId)
        )),
    }, { accepted: 251, groups: 8, ideas: 8, exactIds: true });
    s.eq("Lesson 20 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(
            /data-classical-reader-guidance-lesson="20"/gu,
        ) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu,
        ) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="20"[^>]*\sopen/gu
            .test(panel),
        beforeFacts: start >= 0 && end > start && facts > end,
    }, {
        lessonSections: 1,
        cards: 8,
        openByDefault: false,
        beforeFacts: true,
    });
    s.ok(
        "Lesson 20 guidance keeps the familiar path and explains only derived changes",
        ideas[0].guidance.includes("familiar VNC workflow")
        && ideas[0].guidance.includes("only when that Source truly has more than one valid Result")
        && ideas[0].guidance.includes("o-hua or lo-hua boundary")
        && ideas[1].guidance.includes("removes ya automatically")
        && ideas[1].guidance.includes("no separate class, future-base, or drop-ya choice")
        && ideas[2].guidance.includes("Class C and Class D vowel behavior")
        && ideas[2].guidance.includes("which member receives lo-hua")
        && ideas[2].guidance.includes("competing final Results")
        && ideas[3].guidance.includes("s-to-x or qu-to-c")
        && ideas[3].guidance.includes("without another control")
        && ideas[4].guidance.includes("remaining w deletion")
        && ideas[4].guidance.includes("Traditional oa spelling never supplies the grammar")
        && ideas[5].guidance.includes("Long ī or ō keeps its length")
        && ideas[5].guidance.includes("Choose only among competing final Results")
        && ideas[6].guidance.includes("rarity is not a grammar control")
        && ideas[6].guidance.includes("two complete choices")
        && ideas[7].guidance.includes("ordinary Class A tense system")
        && ideas[7].guidance.includes("without adding class or vowel switches"),
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
            ctx.isLesson20ReaderGuidanceExact(
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
