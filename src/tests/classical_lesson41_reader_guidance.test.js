"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = Object.freeze([
    "lesson41-reduplicative-intensification",
    "lesson41-compound-matrix-intensification",
    "lesson41-affective-and-metaphorical-intensification",
    "lesson41-incorporated-adverb-and-supplement-source",
    "lesson41-incorporated-complement-object-and-patientive",
    "lesson41-denominal-compound-preterit-function",
    "lesson41-adjectival-and-numeral-compound-embeds",
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson41_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson41-review-ledger.json",
    ), "utf8"));
    const accepted = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
        && ["ACCEPTED", "IMPLEMENTATION_PROVEN"].includes(
            record.reviewStatus
        )
    ));
    const ideas = ctx.LESSON41_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="41"',
    );
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const visible = panel.slice(start, end);

    s.eq("all Lesson 41 atoms point to seven collapsed reading coordinates", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="41"/gu
        ) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu
        ) || []).length,
        open: /data-classical-reader-guidance-lesson="41"[^>]*\sopen/gu
            .test(panel),
    }, {
        accepted: 327,
        groups: 7,
        ideas: 7,
        exactIds: true,
        sections: 1,
        cards: 7,
        open: false,
    });

    s.ok("guidance preserves owners, histories, and authority boundaries",
        ideas[0].guidance.includes("not repeated-string guesses")
        && ideas[1].guidance.includes("no intensifier engine")
        && ideas[1].guidance.includes("no stem whitelist")
        && ideas[2].guidance.includes("guide interpretation only")
        && ideas[3].guidance.includes("typed matrix remains the matrix")
        && ideas[4].guidance.includes("do not collapse grammatically")
        && ideas[5].guidance.includes("Each owner completes its own operation")
        && ideas[6].guidance.includes("single-nucleus compound")
        && ideas[6].guidance.includes("not the multiple-nucleus"),
    );

    for (const record of accepted) {
        const entry = ideas.find(idea => (
            idea.ideaId === record.reviewGroupId
        ));
        s.ok(record.atomId, Boolean(entry?.guidance));
        s.eq(`mutation:${record.atomId}`, {
            canonical: entry?.ideaId,
            mutated: `${entry?.ideaId}-mutated`,
            same: entry?.ideaId === `${entry?.ideaId}-mutated`,
        }, {
            canonical: record.reviewGroupId,
            mutated: `${record.reviewGroupId}-mutated`,
            same: false,
        });
    }

    return s;
}

module.exports = { run };
