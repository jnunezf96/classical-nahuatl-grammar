"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const { hasVersionedImport } = require("./helpers/browser_cache_chain");
const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson29_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT,
        "docs/canvas-progress/lesson29-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => record.reviewStatus === "ACCEPTED");
    const ideas = ctx.LESSON29_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="29"');
    const end = panel.indexOf("</details>", start);
    const visible = panel.slice(start, end);
    s.eq("accepted Lesson 29 atoms point to twelve collapsed reading ideas", {
        accepted: accepted.length, groups: new Set(accepted.map(r => r.reviewGroupId)).size,
        ideas: ideas.length, exactIds: accepted.every(r => ids.includes(r.reviewGroupId)),
        sections: (panel.match(/data-classical-reader-guidance-lesson="29"/gu) || []).length,
        cards: (visible.match(/data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="29"[^>]*\sopen/gu.test(panel),
    }, { accepted: 346, groups: 12, ideas: 12, exactIds: true, sections: 1, cards: 12, open: false });
    s.ok("Lesson 29 guidance keeps only genuine choices and open typed Sources",
        ideas[0].guidance.includes("rare sounded-future checkbox")
        && ideas[0].guidance.includes("shared Class A, B, C, or D future-stem rule")
        && ideas[0].guidance.includes("ihcuil-o-ā supplies ihcuil-ō")
        && ideas[1].guidance.includes("no second Direction choice")
        && ideas[1].guidance.includes("derives c versus qu")
        && ideas[2].guidance.includes("combines direction, mood, and tense")
        && ideas[2].guidance.includes("never a whitelist")
        && ideas[3].guidance.includes("Purposive-versus-Progressive analysis")
        && ideas[3].guidance.includes("present-like and future-like readings")
        && ideas[4].guidance.includes("simple past, habitual past, or anterior past")
        && ideas[4].guidance.includes("mā never introduces the past Purposive")
        && ideas[5].guidance.includes("free plural n variant")
        && ideas[5].guidance.includes("early singular stem-final glottal form")
        && ideas[6].guidance.includes("present, preterit, imperfect, or distant-past")
        && ideas[6].guidance.includes("past act of purposing")
        && ideas[7].guidance.includes("singular qu-ī-uh or plural qu-i-hui")
        && ideas[7].guidance.includes("never form an admission list")
        && ideas[8].guidance.includes("self-encouragement, or self-suggestion")
        && ideas[8].guidance.includes("not permissive")
        && ideas[9].guidance.includes("passive or impersonal")
        && ideas[9].guidance.includes("not a second Lesson 29 voice engine")
        && ideas[10].guidance.includes("preserves the entire inner compound")
        && ideas[10].guidance.includes("hierarchy must remain acyclic")
        && ideas[11].guidance.includes("directions may match or disagree")
        && ideas[11].guidance.includes("fulfilled purpose, metaphorical movement, or muted intention")
        && ideas.every(idea => idea.guidance.includes("clickable")));
    for (const record of accepted) {
        const idea = ideas.find(entry => entry.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading observation`, Boolean(idea?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson29ReaderGuidanceExact(ideas.filter(entry => entry.ideaId !== record.reviewGroupId)), false);
    }
    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    s.eq("Lesson 29 uses the complete browser cache chain", {
        index: hasVersionedImport(read("index.html"), "src/browser/main.mjs"),
        main: hasVersionedImport(read("src/browser/main.mjs"), "bootstrap.mjs"),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs", "rendering.mjs", "classical_shell.mjs"]
            .every(name => hasVersionedImport(read("src/bootstrap/bootstrap.mjs"), name)),
        bridge: hasVersionedImport(read("src/bootstrap/runtime_bridge.mjs"), "create_runtime.mjs"),
        runtime: ["vnc_lessons27_29_33_closure.mjs", "rendering.mjs", "classical_shell.mjs"]
            .every(name => hasVersionedImport(read("src/runtime/create_runtime.mjs"), name)),
        semantic: hasVersionedImport(read("src/runtime/create_runtime.mjs"),
            "nuclear_semantic_owner_catalog.mjs")
            && hasVersionedImport(read("src/core/classical/nuclear_semantic_owner_catalog.mjs"),
                "vnc_purposive_validation_semantic_operations.mjs"),
        leaf: hasVersionedImport(read("src/ui/shell/classical_shell.mjs"),
            "lesson29_reader_guidance.mjs"),
    }, { index: true, main: true, bootstrap: true, bridge: true, runtime: true,
        semantic: true, leaf: true });
    return s;
}

module.exports = { run };
