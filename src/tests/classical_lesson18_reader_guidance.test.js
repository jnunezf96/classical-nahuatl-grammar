"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson18_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson18-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON18_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="18"',
    );
    const end = panel.indexOf(
        'data-classical-reader-guidance-lesson="19"',
    );
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 18 atoms point to the nine collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => (
            ideaIds.includes(record.reviewGroupId)
        )),
    }, { accepted: 254, groups: 9, ideas: 9, exactIds: true });
    s.eq("Lesson 18 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(
            /data-classical-reader-guidance-lesson="18"/gu,
        ) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu,
        ) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="18"[^>]*\sopen/gu
            .test(panel),
        beforeFacts: start >= 0 && end > start,
    }, {
        lessonSections: 1,
        cards: 9,
        openByDefault: false,
        beforeFacts: true,
    });
    s.ok(
        "Lesson 18 guidance explains scope, agreement, speaker context, and the silent object",
        ideas[0].guidance.includes("even though it still concerns the VNC")
        && ideas[0].guidance.includes("cannot be independent utterances")
        && ideas[1].guidance.includes("whole following clause or sentence")
        && ideas[1].guidance.includes("does not decide")
        && ideas[2].guidance.includes("Distance changes the order")
        && ideas[2].guidance.includes("clickable reference link")
        && ideas[3].guidance.includes("look singular while referring to a plural group")
        && ideas[3].guidance.includes("names only the newly identified third-person partner")
        && ideas[4].guidance.includes("male speaker who belongs")
        && ideas[4].guidance.includes("ordinary third-person oquichtin")
        && ideas[5].guidance.includes("silent 0-0 object head")
        && ideas[5].guidance.includes("ichtequi follows a different object pattern")
        && ideas[6].guidance.includes("adverbial becomes the proxy principal")
        && ideas[6].guidance.includes("not a real vocative")
        && ideas[7].guidance.includes("joined, exceptionally stressed e")
        && ideas[7].guidance.includes("higher tone with affected stress")
        && ideas[8].guidance.includes("distant, repeated in the same role, or recursively supplemented")
        && ideas[8].guidance.includes("remain complete NNC assertions"),
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
            ctx.isLesson18ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
