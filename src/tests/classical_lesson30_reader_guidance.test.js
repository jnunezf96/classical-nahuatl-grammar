"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const { hasVersionedImport } = require("./helpers/browser_cache_chain");
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
    const end = panel.indexOf('data-classical-reader-guidance-lesson="31"');
    const visible = panel.slice(start, end);
    s.eq("accepted Lesson 30 atoms point to fifteen collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(/data-classical-reader-guidance-lesson="30"/gu) || []).length,
        cards: (visible.match(/data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="30"[^>]*\sopen/gu.test(panel),
    }, { accepted: 1004, groups: 15, ideas: 15, exactIds: true,
        sections: 1, cards: 15, open: false });
    s.ok("Lesson 30 guidance keeps genuine choices and automatic consequences separate",
        ideas[0].guidance.includes("object, adverb, or complement")
        && ideas[0].guidance.includes("never limit")
        && ideas[1].guidance.includes("There is no object-pronoun or valence switch")
        && ideas[1].guidance.includes("Later derivation")
        && ideas[2].guidance.includes("only if the typed Source itself")
        && ideas[2].guidance.includes("shuntline structure")
        && ideas[3].guidance.includes("intransitive matrix")
        && ideas[3].guidance.includes("never a list")
        && ideas[4].guidance.includes("only one history")
        && ideas[4].guidance.includes("valence")
        && ideas[5].guidance.includes("referent identity")
        && ideas[5].guidance.includes("never gate")
        && ideas[6].guidance.includes("simple or compound")
        && ideas[6].guidance.includes("referent")
        && ideas[7].guidance.includes("Choose an Analysis only")
        && ideas[7].guidance.includes("translations")
        && ideas[8].guidance.includes("automatically compares the subject")
        && ideas[8].guidance.includes("subject or object")
        && ideas[9].guidance.includes("never becomes a route whitelist")
        && ideas[9].guidance.includes("supportive initial i")
        && ideas[10].guidance.includes("possessive to nominative")
        && ideas[10].guidance.includes("separate roles")
        && ideas[11].guidance.includes("typed derivational history")
        && ideas[11].guidance.includes("no passive agent")
        && ideas[12].guidance.includes("typed referent identity")
        && ideas[12].guidance.includes("unchanged valence")
        && ideas[13].guidance.includes("ordinary nonactive owner")
        && ideas[13].guidance.includes("only nonspecific objects")
        && ideas[14].guidance.includes("never the finite subject")
        && ideas[14].guidance.includes("faceless third-singular")
        && ideas.every(idea => idea.guidance.includes("clickable")));
    s.ok("Lesson 30 delivers conditional Source-history and possessor-link controls",
        fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8")
            .includes('data-nominal-embed-adverb-source-choice="true"')
        && fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8")
            .includes('id="classical-nominal-embed-adverbial-route"')
        && fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8")
            .includes('data-nominal-embed-possessor-reference-choice="true"')
        && fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8")
            .includes('id="classical-nominal-embed-possessor-reference"'));
    for (const record of accepted) {
        const idea = ideas.find(entry => entry.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading observation`, Boolean(idea?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson30ReaderGuidanceExact(
                ideas.filter(entry => entry.ideaId !== record.reviewGroupId)), false);
    }
    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    s.eq("Lesson 30 uses the complete browser cache chain", {
        index: hasVersionedImport(read("index.html"), "src/browser/main.mjs"),
        main: hasVersionedImport(read("src/browser/main.mjs"), "bootstrap.mjs"),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs",
            "panels.mjs", "rendering.mjs", "state.mjs", "classical_shell.mjs"].every(name =>
            hasVersionedImport(read("src/bootstrap/bootstrap.mjs"), name)),
        bridge: hasVersionedImport(read("src/bootstrap/runtime_bridge.mjs"), "create_runtime.mjs"),
        runtime: ["nominal_construction.mjs", "rendering.mjs", "classical_shell.mjs"]
            .every(name => hasVersionedImport(read("src/runtime/create_runtime.mjs"), name)),
        semanticOwner: hasVersionedImport(read("src/runtime/create_runtime.mjs"),
            "nuclear_semantic_owner_catalog.mjs"),
        semanticProjection: hasVersionedImport(
            read("src/core/classical/nuclear_semantic_owner_catalog.mjs"),
            "nominal_embed_validation_semantic_operations.mjs"),
        leaf: hasVersionedImport(read("src/ui/shell/classical_shell.mjs"),
            "lesson30_reader_guidance.mjs"),
    }, { index: true, main: true, bootstrap: true, bridge: true, runtime: true,
        semanticOwner: true, semanticProjection: true, leaf: true });
    return s;
}

module.exports = { run };
