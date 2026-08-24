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
    "lesson35-nominalization-and-preterit-agentive-foundation",
    "lesson35-absolutive-preterit-agentive-reanalysis",
    "lesson35-number-animacy-and-object-activation",
    "lesson35-general-use-ca-stem",
    "lesson35-possessive-preterit-agentive-nnc",
    "lesson35-agentive-embeds-and-affectives",
    "lesson35-old-woman-agentive-family",
    "lesson35-old-man-and-drum-source-contrast",
    "lesson35-ownerhood-e-matrix",
    "lesson35-ownerhood-hua-matrix",
    "lesson35-abundant-ownerhood-yoa",
    "lesson35-ownerhood-analysis-and-translation",
    "lesson35-agentive-embeds-in-vncs",
    "lesson35-vocative-agentive-realization",
    "lesson35-double-nucleus-ownerhood-embed",
];

function run(ctx = {}) {
    const s = createSuite("classical_lesson35_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson35-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON35_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="35"');
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 35 atoms point to fifteen collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="35"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="35"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 1136, groups: 15, ideas: 15, exactIds: true,
        sections: 1, cards: 15, open: false });

    s.ok("guidance keeps productive rules, lexical facts, and choices distinct",
        ideas[0].guidance.includes("exact owner-issued preterit VNC Result")
        && ideas[0].guidance.includes("never authorize the route")
        && ideas[1].guidance.includes("final constituent")
        && ideas[1].guidance.includes("not carried into the nounstem")
        && ideas[1].guidance.includes("never limits the operation")
        && ideas[2].guidance.includes("not a universal rule")
        && ideas[2].guidance.includes("supplementary object")
        && ideas[2].guidance.includes("not free object movement")
        && ideas[3].guidance.includes("final preterit zero")
        && ideas[3].guidance.includes("archaic quē")
        && ideas[4].guidance.includes("uh-zero")
        && ideas[4].guidance.includes("cā-yō")
        && ideas[5].guidance.includes("exact owner-issued")
        && ideas[5].guidance.includes("copied agentive string")
        && ideas[6].guidance.includes("ilama-h")
        && ideas[6].guidance.includes("separate typed Sources")
        && ideas[7].guidance.includes("huē-hue-h-zero")
        && ideas[7].guidance.includes("never merges them")
        && ideas[8].guidance.includes("fixed verbal matrix")
        && ideas[8].guidance.includes("without closing the productive class rule")
        && ideas[9].guidance.includes("printed nouns do not")
        && ideas[9].guidance.includes("licensed recursion")
        && ideas[10].guidance.includes("abundant")
        && ideas[10].guidance.includes("genuine meaning choice")
        && ideas[11].guidance.includes("never create a route")
        && ideas[11].guidance.includes("subject interpretation")
        && ideas[12].guidance.includes("exact owner-issued")
        && ideas[12].guidance.includes("copied Result")
        && ideas[13].guidance.includes("exact number dyad")
        && ideas[13].guidance.includes("reading evidence")
        && ideas[14].guidance.includes("fixed-order double nucleus")
        && ideas[14].guidance.includes("cannot overwrite"));

    for (const record of accepted) {
        const entry = ideas.find(idea => idea.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading observation`,
            Boolean(entry?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson35ReaderGuidanceExact(
                ideas.filter(idea => idea.ideaId !== record.reviewGroupId)),
            false);
    }

    s.eq("only accepted Lesson 35 groups are delivered", {
        acceptedIds: [...new Set(accepted.map(record => record.reviewGroupId))],
        guidanceIds: ids,
    }, { acceptedIds: GROUPS, guidanceIds: GROUPS });

    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    const key = currentBrowserCacheKey(read("index.html"));
    s.eq("Lesson 35 advances the complete browser cache chain", {
        key: Boolean(key),
        index: usesBrowserCacheKey(read("index.html"), "src/browser/main.mjs", key),
        main: usesBrowserCacheKey(read("src/browser/main.mjs"), "bootstrap.mjs", key),
        bridge: usesBrowserCacheKey(read("src/bootstrap/runtime_bridge.mjs"),
            "create_runtime.mjs", key),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/bootstrap/bootstrap.mjs"), name, key)
        )),
        runtime: ["nnc_lessons35_39_closure.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/runtime/create_runtime.mjs"), name, key)
        )),
        leaf: usesBrowserCacheKey(read("src/ui/shell/classical_shell.mjs"),
            "lesson35_reader_guidance.mjs", key),
    }, { key: true, index: true, main: true, bridge: true,
        bootstrap: true, runtime: true, leaf: true });
    return s;
}

module.exports = { run };
