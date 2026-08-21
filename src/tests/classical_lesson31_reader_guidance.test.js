"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const { hasVersionedImport } = require("./helpers/browser_cache_chain");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson31_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson31-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON31_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="31"');
    const end = panel.indexOf('data-classical-reader-guidance-lesson="32"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 31 atoms point to fifteen collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="31"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="31"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 470, groups: 15, ideas: 15, exactIds: true,
        sections: 1, cards: 15, open: false });
    s.ok("Lesson 31 guidance separates genuine choices from automatic grammar",
        ideas[0].guidance.includes("owner-issued Results")
        && ideas[0].guidance.includes("general-use shape")
        && ideas[0].guidance.includes("never limit")
        && ideas[1].guidance.includes("automatically oriented")
        && ideas[1].guidance.includes("only for a possessive integrated Source")
        && ideas[1].guidance.includes("separate facts")
        && ideas[2].guidance.includes("translation reverses")
        && ideas[2].guidance.includes("different typed Source")
        && ideas[2].guidance.includes("no grammatical authority")
        && ideas[3].guidance.includes("ordinary general-use stem")
        && ideas[3].guidance.includes("never authorize")
        && ideas[4].guidance.includes("Subclass 2-B")
        && ideas[4].guidance.includes("genuinely marked")
        && ideas[4].guidance.includes("follow automatically")
        && ideas[5].guidance.includes("either the embed or matrix")
        && ideas[5].guidance.includes("no route-authorizing power")
        && ideas[6].guidance.includes("productive compound owner")
        && ideas[6].guidance.includes("Subclass 2-B")
        && ideas[7].guidance.includes("nonspecific nonhuman possessor tla")
        && ideas[7].guidance.includes("typed tl Subclass 1-B Source")
        && ideas[7].guidance.includes("applies licensed boundary assimilation automatically")
        && ideas[7].guidance.includes("shortens final ō to o automatically")
        && ideas[8].guidance.includes("two equal NNC Sources")
        && ideas[8].guidance.includes("no breakup control")
        && ideas[9].guidance.includes("owner-issued compound NNC Result")
        && ideas[9].guidance.includes("acyclic")
        && ideas[9].guidance.includes("No depth")
        && ideas[10].guidance.includes("outer Result class")
        && ideas[10].guidance.includes("only if the same typed constituents")
        && ideas[10].guidance.includes("Surface spelling")
        && ideas[11].guidance.includes("male or female")
        && ideas[11].guidance.includes("never create a list")
        && ideas[11].guidance.includes("ordinary compound shape")
        && ideas[12].guidance.includes("conē or pil-tōn")
        && ideas[12].guidance.includes("possessive poh")
        && ideas[12].guidance.includes("do not make an animal list")
        && ideas[13].guidance.includes("plural compound Source")
        && ideas[13].guidance.includes("optional or obligatory")
        && ideas[13].guidance.includes("only when that analysis genuinely licenses")
        && ideas[14].guidance.includes("applies to the embed automatically")
        && ideas[14].guidance.includes("only when context really leaves")
        && ideas[14].guidance.includes("no target or sound-change choice")
        && ideas.every(idea => idea.guidance.includes("clickable")));
    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("the genuine Lesson 31 controls are conditional and typed",
        shell.includes('data-compound-nnc-possessor-orientation-choice="true"')
        && rendering.includes('compoundNncStructure.startsWith("linked")')
        && shell.includes('id="classical-compound-nnc-embed-source-class"')
        && shell.includes('data-compound-nnc-variant-only="true"')
        && shell.includes('data-compound-nnc-unique-only="true"')
        && shell.includes('data-compound-nnc-yo-only="true"')
        && shell.includes('data-compound-nnc-sex-only="true"')
        && shell.includes('data-compound-nnc-bracketing-choice="true"')
        && shell.includes('data-compound-nnc-affinity-target-choice="true"')
        && shell.includes('data-compound-nnc-distributive-reading-choice="true"')
        && rendering.includes('compoundNncEmbedAnalysis === "unexpected-variant"')
        && rendering.includes('["embed", "matrix"].includes(compoundNncUniquePosition)')
        && rendering.includes('["yō", "yo"].includes(compoundNncMatrixStem)')
        && rendering.includes('?.targetChoiceRequired === true')
        && rendering.includes('compoundNncReduplication === "distributive-varietal"'));
    for (const record of accepted) {
        const idea = ideas.find(entry => entry.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading observation`,
            Boolean(idea?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson31ReaderGuidanceExact(
                ideas.filter(entry => entry.ideaId !== record.reviewGroupId)),
            false);
    }
    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    s.eq("Lesson 31 uses the complete browser cache chain", {
        index: hasVersionedImport(read("index.html"), "src/browser/main.mjs"),
        main: hasVersionedImport(read("src/browser/main.mjs"), "bootstrap.mjs"),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs",
            "panels.mjs", "rendering.mjs", "state.mjs", "classical_shell.mjs"]
            .every(name => hasVersionedImport(
                read("src/bootstrap/bootstrap.mjs"), name)),
        bridge: hasVersionedImport(read("src/bootstrap/runtime_bridge.mjs"),
            "create_runtime.mjs"),
        runtime: ["nominal_construction.mjs", "rendering.mjs",
            "classical_shell.mjs"].every(name => (
            hasVersionedImport(read("src/runtime/create_runtime.mjs"), name)
        )),
        semanticOwner: hasVersionedImport(read("src/runtime/create_runtime.mjs"),
            "nuclear_semantic_owner_catalog.mjs"),
        semanticProjection: hasVersionedImport(read(
            "src/core/classical/nuclear_semantic_owner_catalog.mjs"),
            "compound_nnc_validation_semantic_operations.mjs"),
        leaf: hasVersionedImport(read("src/ui/shell/classical_shell.mjs"),
            "lesson31_reader_guidance.mjs"),
    }, { index: true, main: true, bootstrap: true, bridge: true, runtime: true,
        semanticOwner: true, semanticProjection: true, leaf: true });
    return s;
}

module.exports = { run };
