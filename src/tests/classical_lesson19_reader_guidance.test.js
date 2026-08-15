"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson19_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson19-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON19_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="19"',
    );
    const nextLesson = panel.indexOf(
        'data-classical-reader-guidance-lesson="20"',
        start,
    );
    const facts = panel.indexOf('id="classical-canvas-grammar-facts"');
    const end = nextLesson > start ? nextLesson : facts;
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 19 atoms point to the nine collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => (
            ideaIds.includes(record.reviewGroupId)
        )),
    }, { accepted: 593, groups: 9, ideas: 9, exactIds: true });
    s.eq("Lesson 19 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(
            /data-classical-reader-guidance-lesson="19"/gu,
        ) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu,
        ) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="19"[^>]*\sopen/gu
            .test(panel),
        beforeFacts: start >= 0 && facts > start,
    }, {
        lessonSections: 1,
        cards: 9,
        openByDefault: false,
        beforeFacts: true,
    });
    s.ok(
        "Lesson 19 guidance explains complete VNCs, special existentials, and included clauses",
        ideas[0].guidance.includes("complete verbal clause")
        && ideas[0].guidance.includes("clickable link")
        && ideas[1].guidance.includes("defective existential ihqueh")
        && ideas[1].guidance.includes("complete adjoined clause")
        && ideas[2].guidance.includes("third-person singular subject or possessor head")
        && ideas[2].guidance.includes("outer included relation and an inner shared relation")
        && ideas[3].guidance.includes("statement, question, command, or exclamation")
        && ideas[3].guidance.includes("direct or indirect reporting")
        && ideas[4].guidance.includes("causer, causee, requester, or addressee")
        && ideas[4].guidance.includes("do not become extra supplementation choices")
        && ideas[5].guidance.includes("realizable wish")
        && ideas[5].guidance.includes("only when those typed facts still leave more than one final composition")
        && ideas[6].guidance.includes("included object")
        && ideas[6].guidance.includes("supplementary subject")
        && ideas[7].guidance.includes("complete Nahuatl supplementary clause")
        && ideas[7].guidance.includes("joined quilmach spelling only when mach is present")
        && ideas[8].guidance.includes("silent content head")
        && ideas[8].guidance.includes("deleted saying node recoverable"),
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
            ctx.isLesson19ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
