"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson30_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT,
        "docs/canvas-progress/lesson30-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => record.reviewStatus === "ACCEPTED");
    const ideas = ctx.LESSON30_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="30"');
    const end = panel.indexOf('id="classical-canvas-grammar-facts"');
    const visible = panel.slice(start, end);
    s.eq("accepted Lesson 30 atoms point to three collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(/data-classical-reader-guidance-lesson="30"/gu) || []).length,
        cards: (visible.match(/data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="30"[^>]*\sopen/gu.test(panel),
    }, { accepted: 148, groups: 3, ideas: 3, exactIds: true,
        sections: 1, cards: 3, open: false });
    s.ok("Lesson 30 guidance keeps genuine choices and automatic consequences separate",
        ideas[0].guidance.includes("object, adverb, or complement")
        && ideas[0].guidance.includes("never limit")
        && ideas[1].guidance.includes("There is no object-pronoun or valence switch")
        && ideas[1].guidance.includes("Later derivation")
        && ideas[2].guidance.includes("only if the typed Source itself")
        && ideas[2].guidance.includes("shuntline structure")
        && ideas.every(idea => idea.guidance.includes("clickable")));
    for (const record of accepted) {
        const idea = ideas.find(entry => entry.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading observation`, Boolean(idea?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson30ReaderGuidanceExact(
                ideas.filter(entry => entry.ideaId !== record.reviewGroupId)), false);
    }
    const key = "20260818-lesson30-groups1-3-001";
    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    s.eq("Lesson 30 uses the complete browser cache chain", {
        index: read("index.html").includes(`src/browser/main.mjs?v=${key}`),
        main: read("src/browser/main.mjs").includes(`bootstrap.mjs?v=${key}`),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name =>
            read("src/bootstrap/bootstrap.mjs").includes(`${name}?v=${key}`)),
        bridge: read("src/bootstrap/runtime_bridge.mjs").includes(`create_runtime.mjs?v=${key}`),
        runtime: ["nominal_construction.mjs", "rendering.mjs", "classical_shell.mjs"]
            .every(name => read("src/runtime/create_runtime.mjs").includes(`${name}?v=${key}`)),
        semantic: read("src/runtime/create_runtime.mjs").includes(
            `nuclear_semantic_owner_catalog.mjs?v=${key}`),
        leaf: read("src/ui/shell/classical_shell.mjs").includes(
            "lesson30_reader_guidance.mjs?v=20260818-lesson30-groups1-3-001"),
    }, { index: true, main: true, bootstrap: true, bridge: true, runtime: true,
        semantic: true, leaf: true });
    return s;
}

module.exports = { run };
