"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = Object.freeze([
    "lesson40-adjectival-function-boundary",
    "lesson40-exceptional-adjectival-nncs",
    "lesson40-patientive-adjectival-function",
    "lesson40-customary-nominalized-vnc-adjectival-function",
    "lesson40-preterit-agentive-adjectival-function",
    "lesson40-root-plus-ya-adjectival-function",
    "lesson40-synonymous-adjectival-systems",
    "lesson40-predicate-adjective-sentence",
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson40_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson40-review-ledger.json"
    ), "utf8"));
    const accepted = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
        && ["ACCEPTED", "IMPLEMENTATION_PROVEN"].includes(
            record.reviewStatus
        )
    ));
    const ideas = ctx.LESSON40_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="40"'
    );
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const visible = panel.slice(start, end);

    s.eq(
        "all Lesson 40 atoms point to eight collapsed reading coordinates",
        {
            accepted: accepted.length,
            groups: new Set(accepted.map(
                record => record.reviewGroupId
            )).size,
            ideas: ideas.length,
            exactIds: accepted.every(record => (
                ids.includes(record.reviewGroupId)
            )),
            sections: (panel.match(
                /data-classical-reader-guidance-lesson="40"/gu
            ) || []).length,
            cards: (visible.match(
                /data-classical-reader-guidance-group=/gu
            ) || []).length,
            open: /data-classical-reader-guidance-lesson="40"[^>]*\sopen/gu
                .test(panel),
        },
        {
            accepted: 394,
            groups: 8,
            ideas: 8,
            exactIds: true,
            sections: 1,
            cards: 8,
            open: false,
        }
    );

    s.ok(
        "guidance keeps exact Results, productive rules, and readings separate",
        ideas[0].guidance.includes("exact owner-issued NNC or VNC Result")
        && ideas[0].guidance.includes("translation is reading guidance only")
        && ideas[1].guidance.includes("witnessed words do not form a whitelist")
        && ideas[2].guidance.includes("exact owner-issued patientive")
        && ideas[2].guidance.includes("copied Result")
        && ideas[3].guidance.includes("separate operations")
        && ideas[4].guidance.includes("Compatible unlisted Results remain productive")
        && ideas[5].guidance.includes("not a spelling guess")
        && ideas[6].guidance.includes("do not merge their owners")
        && ideas[7].guidance.includes("multiple-nucleus")
        && ideas[7].guidance.includes("never flattens"),
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
