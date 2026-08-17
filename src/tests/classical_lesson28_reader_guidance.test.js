"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson28_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson28-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON28_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const lesson27 = panel.indexOf('data-classical-reader-guidance-lesson="27"');
    const start = panel.indexOf('data-classical-reader-guidance-lesson="28"');
    const end = panel.indexOf('id="classical-canvas-grammar-facts"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 28 atoms point to twelve collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => ideaIds.includes(record.reviewGroupId)),
    }, { accepted: 614, groups: 12, ideas: 12, exactIds: true });
    s.eq("Lesson 28 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(/data-classical-reader-guidance-lesson="28"/gu) || []).length,
        cards: (visible.match(/data-classical-reader-guidance-group=/gu) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="28"[^>]*\sopen/gu.test(panel),
        afterLesson27: lesson27 >= 0 && start > lesson27,
        beforeFacts: start >= 0 && end > start,
    }, {
        lessonSections: 1,
        cards: 12,
        openByDefault: false,
        afterLesson27: true,
        beforeFacts: true,
    });
    const cacheKey = "20260816-lesson28-group12-348";
    const readSource = (relativePath) => fs.readFileSync(
        path.join(ROOT, relativePath),
        "utf8",
    );
    s.eq("Lesson 28 uses the complete browser cache chain", {
        index: readSource("index.html").includes(`src/browser/main.mjs?v=${cacheKey}`),
        main: readSource("src/browser/main.mjs").includes(`bootstrap.mjs?v=${cacheKey}`),
        bootstrap: [
            "runtime_bridge.mjs",
            "create_runtime.mjs",
            "composer.mjs",
            "rendering.mjs",
            "classical_shell.mjs",
        ].every((moduleName) => readSource("src/bootstrap/bootstrap.mjs")
            .includes(`${moduleName}?v=${cacheKey}`)),
        bridge: readSource("src/bootstrap/runtime_bridge.mjs")
            .includes(`create_runtime.mjs?v=${cacheKey}`),
        runtime: [
            "vnc_lessons27_29_33_closure.mjs",
            "vnc_late_operation_ui_contract.mjs",
            "rendering.mjs",
            "classical_shell.mjs",
        ].every((moduleName) => readSource("src/runtime/create_runtime.mjs")
            .includes(`${moduleName}?v=${cacheKey}`)),
        semanticCatalog: readSource("src/runtime/create_runtime.mjs")
            .includes("nuclear_semantic_owner_catalog.mjs?v=20260816-lesson28-group12-011"),
        semanticLeaves: [
            "classical-ca-compound-matrix-formation.mjs",
            "classical-compound-valence-combination-system.mjs",
            "classical-intransitive-compound-matrix-inventory.mjs",
            "classical-nemi-compound-matrix-formation.mjs",
            "classical-ya-matrix-connective-syncopation.mjs",
            "classical-ya-uh-compound-matrix-formation.mjs",
            "classical-hual-la-uh-compound-matrix-formation.mjs",
            "classical-hui-tz-compound-matrix-formation.mjs",
            "classical-huitz-carry-connectiveless-formation.mjs",
            "classical-ahci-compound-matrix-formation.mjs",
            "classical-ihca-compound-matrix-formation.mjs",
            "classical-o-compound-matrix-formation.mjs",
            "classical-e-hua-compound-matrix-formation.mjs",
            "classical-quiza-compound-matrix-formation.mjs",
            "classical-huetzi-compound-matrix-formation.mjs",
            "classical-ca-ye-compound-embed-alternation.mjs",
            "classical-ya-uh-yah-compound-embed-alternation.mjs",
            "classical-observational-itz-compound-embed.mjs",
            "classical-itz-compound-homophone-analysis.mjs",
            "classical-compound-nonactive-scope-system.mjs",
            "vnc_compound_validation_semantic_operations.mjs",
            "classical-compound-accompanying-possession-supplement.mjs",
            "supplementation_validation_semantic_operations.mjs",
            "classical-reflexive-matrix-compound-inventory.mjs",
            "classical-reflexive-matrix-compound-system.mjs",
            "classical-shared-object-compound-coreference.mjs",
            "classical-shared-object-compound-matrix-inventory.mjs",
            "classical-future-embed-compound-structure.mjs",
            "classical-nequi-future-embed-compound.mjs",
            "classical-qui-imperfect-future-embed-compound.mjs",
            "classical-compound-recursive-embedding.mjs",
        ].every((moduleName) => readSource("src/core/classical/nuclear_semantic_owner_catalog.mjs")
            .includes(`${moduleName}?v=20260816-lesson28-group12-011`)),
        shellContract: readSource("src/ui/shell/classical_shell.mjs")
            .includes(`vnc_late_operation_ui_contract.mjs?v=${cacheKey}`),
        leaf: readSource("src/ui/shell/classical_shell.mjs")
            .includes("lesson28_reader_guidance.mjs?v=20260816-lesson28-group12-011"),
    }, {
        index: true,
        main: true,
        bootstrap: true,
        bridge: true,
        runtime: true,
        semanticCatalog: true,
        semanticLeaves: true,
        shellContract: true,
        leaf: true,
    });
    s.ok(
        "Lesson 28 guidance exposes only choices needed by the final composition",
        ideas[0].guidance.includes("Choose the owner-issued Result")
        && ideas[0].guidance.includes("only when the final composition really needs one")
        && ideas[0].guidance.includes("never as an incorporated subject")
        && ideas[1].guidance.includes("only when the same final composition genuinely supports both")
        && ideas[1].guidance.includes("any compatible user-supplied typed stem remains open")
        && ideas[1].guidance.includes("never a whitelist")
        && ideas[2].guidance.includes("Only a traditional spelling that truly permits both")
        && ideas[2].guidance.includes("t before a vowel or ti before a consonant")
        && ideas[2].guidance.includes("English main-verb or auxiliary wording does not choose")
        && ideas[3].guidance.includes("ca-h, ca-t, or ye")
        && ideas[3].guidance.includes("singular present uh, plural present hui")
        && ideas[3].guidance.includes("licensed syncopated t-ā or t-ah surface")
        && ideas[3].guidance.includes("choose connective-t or causative Analysis")
        && ideas[3].guidance.includes("not extra controls")
        && ideas[4].guidance.includes("choose the special carry analysis")
        && ideas[4].guidance.includes("retains directional huāl")
        && ideas[4].guidance.includes("matrix alone supply the compound Mood and Tense")
        && ideas[4].guidance.includes("requires a typed object")
        && ideas[4].guidance.includes("never consults a stem whitelist")
        && ideas[4].guidance.includes("not extra controls")
        && ideas[5].guidance.includes("automatically leaves out locative on")
        && ideas[5].guidance.includes("choose Class A or Class B only when both histories are genuinely licensed")
        && ideas[5].guidance.includes("choose reversed event order only when the intended meaning")
        && ideas[5].guidance.includes("written compound still keeps embed before matrix")
        && ideas[5].guidance.includes("examples never form a whitelist")
        && ideas[5].guidance.includes("not extra controls")
        && ideas[6].guidance.includes("automatically gives ca the embed ye")
        && ideas[6].guidance.includes("Cac automatically carries nonanimate reference")
        && ideas[6].guidance.includes("choose the intended Source identity")
        && ideas[6].guidance.includes("written order always stays embed before matrix")
        && ideas[6].guidance.includes("passive permits embed or both")
        && ideas[6].guidance.includes("impersonal permits embed, matrix, or both")
        && ideas[6].guidance.includes("does not require it")
        && ideas[6].guidance.includes("tla impersonal stays on the embed automatically")
        && ideas[7].guidance.includes("generate and capture the possessive NNC Result")
        && ideas[7].guidance.includes("ordinary ca-to-ye connective compound Result")
        && ideas[7].guidance.includes("choose Supplementation")
        && ideas[7].guidance.includes("preserves the possessor as a nested supplementary possessor")
        && ideas[7].guidance.includes("does not create a special have verb")
        && ideas[7].guidance.includes("possession picker")
        && ideas[7].guidance.includes("second supplementation engine")
        && ideas[8].guidance.includes("enter the open typed embed and matrix core")
        && ideas[8].guidance.includes("adds fixed m-o automatically")
        && ideas[8].guidance.includes("does not change it for first- or second-person subjects")
        && ideas[8].guidance.includes("embed alone determines")
        && ideas[8].guidance.includes("any animate subject must be plural")
        && ideas[8].guidance.includes("never a stem whitelist")
        && ideas[9].guidance.includes("ordinary Source object controls already identify")
        && ideas[9].guidance.includes("only if more than one typed object could genuinely be shared")
        && ideas[9].guidance.includes("writes the carrier once on the embed")
        && ideas[9].guidance.includes("special Class A ēhua embed automatically")
        && ideas[9].guidance.includes("distributive plural meanings are reading cues rather than controls")
        && ideas[9].guidance.includes("never a stem whitelist")
        && ideas[10].guidance.includes("owner-issued future VNC Result")
        && ideas[10].guidance.includes("Choose nequi for desire")
        && ideas[10].guidance.includes("qui construction for volition")
        && ideas[10].guidance.includes("future predicate replaces the matrix object")
        && ideas[10].guidance.includes("adds future z inside")
        && ideas[10].guidance.includes("passive or impersonal formation")
        && ideas[10].guidance.includes("Mood and Tense apply outside to the matrix")
        && ideas[10].guidance.includes("qui is available only in the imperfect")
        && ideas[10].guidance.includes("Traditional conditional wording is a reading")
        && ideas[10].guidance.includes("no separate controls for z")
        && ideas[10].guidance.includes("never a whitelist on general Source entry")
        && ideas[11].guidance.includes("use Add another derivation to capture")
        && ideas[11].guidance.includes("captured Result is the new embed or the new matrix")
        && ideas[11].guidance.includes("only new choices")
        && ideas[11].guidance.includes("non-circular hierarchy")
        && ideas[11].guidance.includes("derives each layer's connective")
        && ideas[11].guidance.includes("there is no depth picker")
        && ideas[11].guidance.includes("do not limit the stems")
        && ideas.every((entry) => entry.guidance.includes("clickable")),
    );
    for (const record of accepted) {
        const idea = ideas.find((entry) => entry.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading job`, Boolean(idea?.title && idea?.guidance));
        s.eq(
            `mutation:${record.atomId} fails when its reading idea is removed`,
            ctx.isLesson28ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
