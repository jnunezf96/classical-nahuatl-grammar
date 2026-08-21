"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const { hasVersionedImport } = require("./helpers/browser_cache_chain");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson32_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson32-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON32_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="32"');
    const end = panel.indexOf('data-classical-reader-guidance-lesson="33"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 32 atoms point to twelve collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="32"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="32"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 369, groups: 12, ideas: 12, exactIds: true,
        sections: 1, cards: 12, open: false });
    s.ok("Lesson 32 guidance separates choices from automatic grammar",
        ideas[0].guidance.includes("shows a route choice only if both analyses")
        && ideas[0].guidance.includes("Translation and Canvas examples cannot")
        && ideas[0].guidance.includes("clickable")
        && ideas[1].guidance.includes("any compatible typed NNC embed")
        && ideas[1].guidance.includes("not guessed from an example spelling")
        && ideas[1].guidance.includes("never create a whitelist")
        && ideas[2].guidance.includes("Choose among those readings only when")
        && ideas[2].guidance.includes("derives the Result class automatically")
        && ideas[2].guidance.includes("final é is automatic")
        && ideas[3].guidance.includes("any compatible typed NNC embed")
        && ideas[3].guidance.includes("matching typed lexical analysis")
        && ideas[3].guidance.includes("never creates the exception")
        && ideas[4].guidance.includes("old or worn-out nonanimate entity")
        && ideas[4].guidance.includes("owner-issued zol compound")
        && ideas[4].guidance.includes("assembled automatically")
        && ideas[5].guidance.includes("automatically gives the affective matrix")
        && ideas[5].guidance.includes("short-vowel affinity prefix")
        && ideas[5].guidance.includes("choice appears only when")
        && ideas[6].guidance.includes("sounded hu-ān and silent zero-zero")
        && ideas[6].guidance.includes("more frequent")
        && ideas[6].guidance.includes("never turned into a pīl, pōl")
        && ideas[7].guidance.includes("simple nounstem pil")
        && ideas[7].guidance.includes("morpheme boundary")
        && ideas[7].guidance.includes("unique possessive pil-hu-ān")
        && ideas[8].guidance.includes("choose the intended affective matrix")
        && ideas[8].guidance.includes("automatically puts affinity on both")
        && ideas[8].guidance.includes("final é is automatic")
        && ideas[9].guidance.includes("automatically embeds pil in the yō matrix")
        && ideas[9].guidance.includes("typed recursion, not affinity")
        && ideas[10].guidance.includes("exceptional plural t-in")
        && ideas[10].guidance.includes("same-referent")
        && ideas[10].guidance.includes("absence of a stem whitelist")
        && ideas[11].guidance.includes("Any typed stem")
        && ideas[11].guidance.includes("Plural subjects automatically restore")
        && ideas[11].guidance.includes("personal-name")
        && ideas.every(idea => idea.guidance.includes("clickable")));
    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("the genuine Lesson 32 controls are conditional and typed",
        shell.includes('data-affective-route-choice="true"')
        && shell.includes('id="classical-affective-semantic-reading"')
        && shell.includes('id="classical-affective-lexical-status"')
        && shell.includes('data-affective-irregular-embed-only="true"')
        && shell.includes('data-affective-vocative-only="true"')
        && shell.includes('value="exceptional-zero"')
        && shell.includes('data-affective-optional-embed-affinity="true"')
        && shell.includes('data-affective-embed-affinity-target="true"')
        && shell.includes('data-affective-pil-gender-only="true"')
        && shell.includes('data-affective-possessive-affinity-only="true"')
        && shell.includes('data-affective-matrix-control="true"')
        && shell.includes('data-affective-embed-affinity-analysis="true"')
        && shell.includes('id="classical-affective-flawed-source-status"')
        && shell.includes('id="classical-affective-flawed-class-strategy"')
        && shell.includes('id="classical-affective-flawed-lexical-reading"')
        && shell.includes('value="ordinary-subject"')
        && shell.includes('id="classical-affective-nonanimate-reduplication-shape"')
        && shell.includes('id="classical-affective-nonanimate-reduplication-reading"')
        && shell.includes('data-nominal-stem-relation-control="true"')
        && rendering.includes('?.routeChoiceRequired === true')
        && rendering.includes('affectiveMatrix === "tzin"')
        && rendering.includes('affectiveLexicalStatus === "irregular-embed-variant"')
        && rendering.includes('state === "vocative"')
        && rendering.includes('affectiveEmbedAffinityRequirement === "optional"')
        && rendering.includes('?.possessiveAffinityNumberFrame')
        && rendering.includes('affectivePilChildRoute === "affective"')
        && rendering.includes('option.value === "zol"')
        && rendering.includes('"classical-rule-logic-nnc-subject-person"')
        && rendering.includes('"classical-rule-logic-nnc-subject-number"')
        && rendering.includes('const nominalSubjectNumber =')
        && rendering.includes('nominalSubjectNumber === "plural" ? "pl" : "sg"')
        && rendering.includes('document.getElementById("classical-source-whole")')
        && rendering.includes('control.value = "none"'));
    for (const record of accepted) {
        const idea = ideas.find(entry => entry.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading observation`,
            Boolean(idea?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson32ReaderGuidanceExact(
                ideas.filter(entry => entry.ideaId !== record.reviewGroupId)),
            false);
    }
    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    s.eq("Lesson 32 uses the complete browser cache chain", {
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
            "affective_nnc_validation_semantic_operations.mjs"),
        leaf: hasVersionedImport(read("src/ui/shell/classical_shell.mjs"),
            "lesson32_reader_guidance.mjs"),
    }, { index: true, main: true, bootstrap: true, bridge: true, runtime: true,
        semanticOwner: true, semanticProjection: true, leaf: true });
    return s;
}

module.exports = { run };
