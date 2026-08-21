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
    "lesson34-cardinal-numeral-foundation-and-count-kind",
    "lesson34-numeral-one-and-cem-shape",
    "lesson34-two-three-four-shapes-and-gross-count",
    "lesson34-five-through-nine-composition",
    "lesson34-ten-fifteen-and-gross-possessive",
    "lesson34-higher-vigesimal-orders",
    "lesson34-conjoined-and-downgraded-numerals",
    "lesson34-unit-classifier-sets",
    "lesson34-special-twenty-count-sets",
    "lesson34-numeral-reduplication",
    "lesson34-approximation-more-and-supplementation",
    "lesson34-measure-nncs-and-measured-composition",
];

function run(ctx = {}) {
    const s = createSuite("classical_lesson34_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson34-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON34_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="34"');
    const end = panel.indexOf('data-classical-reader-guidance-lesson="35"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 34 atoms point to twelve collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="34"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="34"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 537, groups: 12, ideas: 12, exactIds: true,
        sections: 1, cards: 12, open: false });

    s.ok("guidance distinguishes genuine choices from automatic shapes",
        ideas[0].guidance.includes("base-twenty")
        && ideas[0].guidance.includes("choice appears only")
        && ideas[0].guidance.includes("never authorize")
        && ideas[1].guidance.includes("Source for one is cem")
        && ideas[1].guidance.includes("never asks for cē versus cem")
        && ideas[1].guidance.includes("incorporated VNC")
        && ideas[2].guidance.includes("ōme, ēyi, and nāhui")
        && ideas[2].guidance.includes("chooses a variant only")
        && ideas[2].guidance.includes("Examples never become a stem list")
        && ideas[3].guidance.includes("mā-cu-ī-l")
        && ideas[3].guidance.includes("not a chicua-family spelling")
        && ideas[4].guidance.includes("mah-tlāc and cax-tōl")
        && ideas[4].guidance.includes("ti versus tin")
        && ideas[5].guidance.includes("one through nineteen")
        && ideas[5].guidance.includes("never become numeral routes")
        && ideas[6].guidance.includes("larger numeral Result comes first")
        && ideas[6].guidance.includes("rightmost number position")
        && ideas[7].guidance.includes("examples, never a whitelist")
        && ideas[7].guidance.includes("owner-issued tlamic")
        && ideas[8].guidance.includes("groups of twenty")
        && ideas[8].guidance.includes("none authorizes or blocks")
        && ideas[9].guidance.includes("Vowel length versus a glottal stop")
        && ideas[9].guidance.includes("scope automatically")
        && ideas[10].guidance.includes("supplementary subject")
        && ideas[10].guidance.includes("translations, not new grammar routes")
        && ideas[11].guidance.includes("productively open")
        && ideas[11].guidance.includes("measure NNC as principal"));

    for (const record of accepted) {
        const entry = ideas.find(idea => idea.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading observation`,
            Boolean(entry?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson34ReaderGuidanceExact(
                ideas.filter(idea => idea.ideaId !== record.reviewGroupId)),
            false);
    }

    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    const key = currentBrowserCacheKey(read("index.html"));
    s.eq("Lesson 34 advances the browser cache chain", {
        key: Boolean(key),
        index: usesBrowserCacheKey(read("index.html"), "src/browser/main.mjs", key),
        main: usesBrowserCacheKey(read("src/browser/main.mjs"), "bootstrap.mjs", key),
        bridge: usesBrowserCacheKey(read("src/bootstrap/runtime_bridge.mjs"),
            "create_runtime.mjs", key),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/bootstrap/bootstrap.mjs"), name, key)
        )),
        runtime: ["nominal_construction.mjs", "composer.mjs", "rendering.mjs",
            "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/runtime/create_runtime.mjs"), name, key)
        )),
        leaf: usesBrowserCacheKey(read("src/ui/shell/classical_shell.mjs"),
            "lesson34_reader_guidance.mjs", key),
    }, { key: true, index: true, main: true, bridge: true,
        bootstrap: true, runtime: true, leaf: true });
    return s;
}

module.exports = { run };
