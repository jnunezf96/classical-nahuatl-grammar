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
    "lesson36-customary-present-nominalization-foundation",
    "lesson36-customary-present-agentive-reanalysis",
    "lesson36-fully-nominal-customary-agentive",
    "lesson36-customary-agentive-meaning-and-preterit-contrast",
    "lesson36-customary-present-patientive",
    "lesson36-instrumentive-two-source-foundation",
    "lesson36-instrumentive-realization-and-variants",
    "lesson36-present-agentive",
    "lesson36-future-agentive",
    "lesson36-action-nnc-taxonomy",
    "lesson36-passive-action-nncs",
    "lesson36-active-action-foundation",
    "lesson36-active-action-general-use",
    "lesson36-active-action-restricted-use",
    "lesson36-active-action-preterit-agentive-contrast",
];

function run(ctx = {}) {
    const s = createSuite("classical_lesson36_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson36-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON36_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="36"');
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const visible = panel.slice(start, end);

    s.eq("all accepted Lesson 36 atoms point to fifteen collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="36"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="36"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 830, groups: 15, ideas: 15, exactIds: true,
        sections: 1, cards: 15, open: false });

    s.ok("guidance keeps authority, productivity, and choices distinct",
        ideas[0].guidance.includes("exact owner-issued")
        && ideas[0].guidance.includes("copied Result")
        && ideas[0].guidance.includes("cannot authorize")
        && ideas[1].guidance.includes("always its final constituent")
        && ideas[1].guidance.includes("no listed stem controls admission")
        && ideas[1].guidance.includes("predictable placement")
        && ideas[2].guidance.includes("ordinary NNC owners")
        && ideas[2].guidance.includes("same normal NNC choices")
        && ideas[2].guidance.includes("exact captured VNC Result")
        && ideas[3].guidance.includes("same English translation")
        && ideas[3].guidance.includes("supplied automatically")
        && ideas[4].guidance.includes("no possessive state")
        && ideas[4].guidance.includes("stem list")
        && ideas[5].guidance.includes("two exact VNC Results")
        && ideas[5].guidance.includes("stem spelling alone")
        && ideas[6].guidance.includes("morphemic Source")
        && ideas[6].guidance.includes("Shape supplies grammatical evidence")
        && ideas[6].guidance.includes("set-defined class")
        && ideas[7].guidance.includes("active present VNC Result")
        && ideas[7].guidance.includes("restricted to absolutive state")
        && ideas[7].guidance.includes("example-stem list")
        && ideas[8].guidance.includes("future z")
        && ideas[8].guidance.includes("singular qui-0")
        && ideas[8].guidance.includes("never chooses z")
        && ideas[9].guidance.includes("resultant state")
        && ideas[9].guidance.includes("Source shape does not choose")
        && ideas[9].guidance.includes("two distinct kinds")
        && ideas[10].guidance.includes("passive distant-past VNC Result")
        && ideas[10].guidance.includes("protects distant-past cā")
        && ideas[10].guidance.includes("example identity are not")
        && ideas[11].guidance.includes("nominalized active counterpart")
        && ideas[11].guidance.includes("narrow transitive route")
        && ideas[11].guidance.includes("never from a listed example")
        && ideas[12].guidance.includes("last constituent is ca")
        && ideas[12].guidance.includes("Source subject becomes the possessor")
        && ideas[12].guidance.includes("typed lexical or contextual evidence")
        && ideas[13].guidance.includes("cā-yō-tl compound")
        && ideas[13].guidance.includes("protects distant-past cā")
        && ideas[13].guidance.includes("evidence rather than controls")
        && ideas[14].guidance.includes("may sound identical")
        && ideas[14].guidance.includes("never reconstructs")
        && ideas[14].guidance.includes("genuine ambiguity"));

    for (const record of accepted) {
        const entry = ideas.find(idea => (
            idea.ideaId === record.reviewGroupId
        ));
        s.ok(`${record.atomId} has its accepted reading observation`,
            Boolean(entry?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson36ReaderGuidanceExact(
                ideas.filter(idea => (
                    idea.ideaId !== record.reviewGroupId
                ))
            ), false);
    }

    s.eq("only accepted Lesson 36 groups are delivered", {
        acceptedIds: [...new Set(accepted.map(record => record.reviewGroupId))],
        guidanceIds: ids,
    }, { acceptedIds: GROUPS, guidanceIds: GROUPS });

    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    const key = currentBrowserCacheKey(read("index.html"));
    s.eq("Lesson 36 advances the complete browser cache chain", {
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
            "lesson36_reader_guidance.mjs", key),
        renderingLeaf: usesBrowserCacheKey(
            read("src/ui/rendering/rendering.mjs"),
            "lesson36_reader_guidance.mjs", key),
    }, { key: true, index: true, main: true, bridge: true,
        bootstrap: true, runtime: true, shellLeaf: true,
        renderingLeaf: true });
    return s;
}

module.exports = { run };
