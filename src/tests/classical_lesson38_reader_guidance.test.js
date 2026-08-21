"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    currentBrowserCacheKey,
    usesBrowserCacheKey,
} = require("./helpers/browser_cache_chain");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson38-impersonal-patientive-foundation",
    "lesson38-impersonal-patientive-lo",
    "lesson38-impersonal-patientive-o-ohua",
    "lesson38-impersonal-patientive-hua",
    "lesson38-impersonal-patientive-hua-lo",
    "lesson38-reflexive-impersonal-patientive",
    "lesson38-projective-impersonal-patientive-lo",
    "lesson38-projective-impersonal-patientive-o",
    "lesson38-projective-impersonal-patientive-hua",
    "lesson38-human-source-tla-lo",
    "lesson38-human-source-tla-o",
    "lesson38-human-source-tla-hua-exceptions",
    "lesson38-human-nonhuman-patientive-contrast",
    "lesson38-patientive-active-action-translation-overlap",
    "lesson38-compound-source-patientive",
    "lesson38-patientive-matrix-compound",
];

function run(ctx = {}) {
    const s = createSuite("classical_lesson38_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson38-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
        && record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON38_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="38"');
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const visible = panel.slice(start, end);
    s.eq("all 486 accepted atoms point to sixteen collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="38"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="38"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 486, groups: 16, ideas: 16, exactIds: true,
        sections: 1, cards: 16, open: false });
    s.ok("guidance separates exact Results, productive shape, and choices",
        ideas[0].guidance.includes("exact owner-issued impersonal VNC Result")
        && ideas[0].guidance.includes("result or product")
        && ideas[0].guidance.includes("raw nonactive-looking stem")
        && ideas[1].guidance.includes("loses ō and retains l")
        && ideas[1].guidance.includes("inherits that result automatically")
        && ideas[1].guidance.includes("does not ask for the same choice again")
        && ideas[1].guidance.includes("never uses the witnessed stems as a whitelist")
        && ideas[2].guidance.includes("removes the complete typed nonactive suffix")
        && ideas[2].guidance.includes("visible letters alone do not generalize")
        && ideas[2].guidance.includes("rather than suffix shape or an example list")
        && ideas[3].guidance.includes("removes the typed hua boundary")
        && ideas[3].guidance.includes("shortens preceding ī to i")
        && ideas[3].guidance.includes("not a free patientive switch")
        && ideas[4].guidance.includes("morphemic layer hua")
        && ideas[4].guidance.includes("never flattens the Source into final letters")
        && ideas[4].guidance.includes("which layer to delete")
        && ideas[5].guidance.includes("shuntline ne")
        && ideas[5].guidance.includes("ne+tē or ne+tla")
        && ideas[5].guidance.includes("only when the typed Source and context leave real ambiguity")
        && ideas[6].guidance.includes("mainline tla")
        && ideas[6].guidance.includes("tē")
        && ideas[6].guidance.includes("do not limit it to listed stems")
        && ideas[7].guidance.includes("double-object sequence tē+tla")
        && ideas[7].guidance.includes("not guessed from the patientive surface")
        && ideas[8].guidance.includes("phonemically long")
        && ideas[8].guidance.includes("active a becomes ī")
        && ideas[8].guidance.includes("user-controlled vowel switch")
        && ideas[9].guidance.includes("passive patient becomes the subject")
        && ideas[9].guidance.includes("supplies tla")
        && ideas[9].guidance.includes("different typed Source")
        && ideas[10].guidance.includes("active → passive → impersonalized passive")
        && ideas[10].guidance.includes("corresponding passive patientive")
        && ideas[10].guidance.includes("list of witnessed stems")
        && ideas[11].guidance.includes("removes hua")
        && ideas[11].guidance.includes("tē-huica-l")
        && ideas[11].guidance.includes("not a general option")
        && ideas[12].guidance.includes("active valence")
        && ideas[12].guidance.includes("genuine referent choice")
        && ideas[12].guidance.includes("prefix alone never decides")
        && ideas[13].guidance.includes("same English translation")
        && ideas[13].guidance.includes("remaining different constructions")
        && ideas[13].guidance.includes("English meaning cannot authorize")
        && ideas[14].guidance.includes("exact owner-issued compound VNC Result")
        && ideas[14].guidance.includes("embed-before-matrix order")
        && ideas[14].guidance.includes("Canvas examples are never a whitelist")
        && ideas[15].guidance.includes("exact owner-issued patientive NNC Result")
        && ideas[15].guidance.includes("ordinary compound owner")
        && ideas[15].guidance.includes("copied Result")
        && ideas[15].guidance.includes("Section 39.6"));
    for (const record of accepted) {
        const entry = ideas.find(idea => (
            idea.ideaId === record.reviewGroupId
        ));
        s.ok(record.atomId, Boolean(entry?.guidance));
        s.eq(`mutation:${record.atomId}`,
            ctx.isLesson38ReaderGuidanceExact(
                ideas.filter(idea => idea.ideaId !== record.reviewGroupId)
            ), false);
    }
    s.eq("only accepted Lesson 38 groups are delivered", {
        acceptedIds: [...new Set(accepted.map(record => record.reviewGroupId))],
        guidanceIds: ids,
    }, { acceptedIds: GROUPS, guidanceIds: GROUPS });

    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    const key = currentBrowserCacheKey(read("index.html"));
    s.eq("Lesson 38 advances the complete browser cache chain", {
        key: Boolean(key),
        index: usesBrowserCacheKey(
            read("index.html"), "src/browser/main.mjs", key),
        main: usesBrowserCacheKey(
            read("src/browser/main.mjs"), "bootstrap.mjs", key),
        bridge: usesBrowserCacheKey(
            read("src/bootstrap/runtime_bridge.mjs"),
            "create_runtime.mjs", key),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/bootstrap/bootstrap.mjs"), name, key)
        )),
        runtime: ["nnc_lessons35_39_closure.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/runtime/create_runtime.mjs"), name, key)
        )),
        shellLeaf: usesBrowserCacheKey(
            read("src/ui/shell/classical_shell.mjs"),
            "lesson38_reader_guidance.mjs", key),
        renderingLeaf: usesBrowserCacheKey(
            read("src/ui/rendering/rendering.mjs"),
            "lesson38_reader_guidance.mjs", key),
    }, { key: true, index: true, main: true, bridge: true,
        bootstrap: true, runtime: true, shellLeaf: true,
        renderingLeaf: true });
    return s;
}

module.exports = { run };
