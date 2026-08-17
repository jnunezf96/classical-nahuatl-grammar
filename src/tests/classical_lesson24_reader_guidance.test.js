"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson24_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson24-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON24_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="24"');
    const end = panel.indexOf('data-classical-reader-guidance-lesson="25"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 24 atoms point to eleven collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => ideaIds.includes(record.reviewGroupId)),
    }, { accepted: 520, groups: 11, ideas: 11, exactIds: true });
    s.eq("Lesson 24 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(/data-classical-reader-guidance-lesson="24"/gu) || []).length,
        cards: (visible.match(/data-classical-reader-guidance-group=/gu) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="24"[^>]*\sopen/gu.test(panel),
        beforeFacts: start >= 0 && end > start,
    }, { lessonSections: 1, cards: 11, openByDefault: false, beforeFacts: true });
    s.ok(
        "Lesson 24 guidance exposes only final-composition choices",
        ideas[0].guidance.includes("Enter any open verbstem")
        && ideas[0].guidance.includes("never admits or rejects a stem from its final vowel")
        && ideas[0].guidance.includes("not a list of allowed inputs")
        && ideas[1].guidance.includes("choose its intended intransitive or transitive Valence")
        && ideas[1].guidance.includes("There is no valence-neutral toggle")
        && ideas[2].guidance.includes("choose replacement or addition")
        && ideas[2].guidance.includes("automatically derives the causative object")
        && ideas[2].guidance.includes("never a whitelist")
        && ideas[3].guidance.includes("Ordinary final a is replaced morphologically")
        && ideas[3].guidance.includes("Choose retained y only")
        && ideas[4].guidance.includes("ordered root plus stock formative")
        && ideas[4].guidance.includes("intermediate stock is not treated as the completed")
        && ideas[5].guidance.includes("Enter any open ni or hui")
        && ideas[5].guidance.includes("never an admission list")
        && ideas[6].guidance.includes("choose replacement or addition")
        && ideas[6].guidance.includes("not a stem list")
        && ideas[7].guidance.includes("keeps both vowels in the formula")
        && ideas[7].guidance.includes("not controls")
        && ideas[8].guidance.includes("Enter any open ā-hua or ē-hua")
        && ideas[8].guidance.includes("rather than a whitelist")
        && ideas[9].guidance.includes("Enter any open i-hui, a-hui, or o-hui")
        && ideas[9].guidance.includes("not a whitelist")
        && ideas[10].guidance.includes("Choose the imported causative subject")
        && ideas[10].guidance.includes("genuine interpretation choice")
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
            ctx.isLesson24ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
