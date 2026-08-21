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
    "lesson37-deverbal-source-foundation",
    "lesson37-z-active-action",
    "lesson37-liz-active-action-foundation",
    "lesson37-liz-replacive-stem-families",
    "lesson37-root-ya-liz",
    "lesson37-way-of-and-lexical-readings",
    "lesson37-compound-active-action-sources",
    "lesson37-active-action-potential-patient-contrast",
    "lesson37-impersonal-general-action",
    "lesson37-action-nnc-continuations",
    "lesson37-z-liz-tzin-assimilation",
    "lesson37-active-passive-action-contrast",
    "lesson37-action-nnc-supplementation",
    "lesson37-patientive-taxonomy-and-truncation",
    "lesson37-passive-patientive-foundation",
    "lesson37-passive-patientive-lo",
    "lesson37-passive-patientive-o",
    "lesson37-passive-patientive-hua",
    "lesson37-reflexive-passive-patientive",
    "lesson37-double-object-passive-patientive",
];

function run(ctx = {}) {
    const s = createSuite("classical_lesson37_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson37-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
        && record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON37_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="37"');
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const visible = panel.slice(start, end);
    s.eq("all 491 accepted atoms point to twenty collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="37"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="37"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 491, groups: 20, ideas: 20, exactIds: true,
        sections: 1, cards: 20, open: false });
    s.ok("guidance separates exact Sources, productive shape, and choices",
        ideas[0].guidance.includes("exact owner-issued VNC Result")
        && ideas[0].guidance.includes("typed verb core")
        && ideas[0].guidance.includes("copied Result")
        && ideas[1].guidance.includes("future-tense z")
        && ideas[1].guidance.includes("replaced by i")
        && ideas[1].guidance.includes("example list")
        && ideas[1].guidance.includes("becomes the possessor")
        && ideas[2].guidance.includes("l, supportive i, and z")
        && ideas[2].guidance.includes("Class C")
        && ideas[2].guidance.includes("genuine user choice")
        && ideas[2].guidance.includes("verbstem whitelist")
        && ideas[3].guidance.includes("ca boundary changes to qui")
        && ideas[3].guidance.includes("never form an admission list")
        && ideas[4].guidance.includes("root and ya as separate typed parts")
        && ideas[4].guidance.includes("Unlisted typed Sources")
        && ideas[5].guidance.includes("ordinary action reading")
        && ideas[5].guidance.includes("liz shape by itself never")
        && ideas[6].guidance.includes("typed compound VNC core")
        && ideas[6].guidance.includes("not a separate verbstem class")
        && ideas[7].guidance.includes("genuinely ambiguous")
        && ideas[7].guidance.includes("potential patient omits it")
        && ideas[8].guidance.includes("owner-issued impersonal future VNC Result")
        && ideas[8].guidance.includes("never a grammar option")
        && ideas[9].guidance.includes("exact owner-issued Result")
        && ideas[9].guidance.includes("genuinely open embed–matrix relation")
        && ideas[10].guidance.includes("assimilates")
        && ideas[10].guidance.includes("not new user controls")
        && ideas[11].guidance.includes("possessor is the agent")
        && ideas[11].guidance.includes("patient of a passive action")
        && ideas[12].guidance.includes("exact owner-issued active-action NNC Result")
        && ideas[12].guidance.includes("referent identity")
        && ideas[13].guidance.includes("five typed Source families")
        && ideas[13].guidance.includes("complete morphemic boundary")
        && ideas[13].guidance.includes("do not form a route list")
        && ideas[14].guidance.includes("exact owner-issued passive VNC Result")
        && ideas[14].guidance.includes("intransitive active Source cannot")
        && ideas[14].guidance.includes("no-object patientive branch")
        && ideas[15].guidance.includes("removes final ō")
        && ideas[15].guidance.includes("never form a route list")
        && ideas[16].guidance.includes("removes the complete suffix")
        && ideas[16].guidance.includes("genuinely available")
        && ideas[17].guidance.includes("long ī shortens to i")
        && ideas[17].guidance.includes("Nahuatl patientive grammar remains authoritative")
        && ideas[18].guidance.includes("shuntline ne")
        && ideas[18].guidance.includes("never inserts ne")
        && ideas[19].guidance.includes("keeps only that surviving object pronoun")
        && ideas[19].guidance.includes("retain-or-delete choice")
        && ideas[19].guidance.includes("never from prefix order"));
    for (const record of accepted) {
        const entry = ideas.find(idea => (
            idea.ideaId === record.reviewGroupId
        ));
        s.ok(record.atomId, Boolean(entry?.guidance));
        s.eq(`mutation:${record.atomId}`,
            ctx.isLesson37ReaderGuidanceExact(
                ideas.filter(idea => idea.ideaId !== record.reviewGroupId)
            ), false);
    }
    s.eq("only the accepted Lesson 37 groups are delivered", {
        acceptedIds: [...new Set(accepted.map(record => record.reviewGroupId))],
        guidanceIds: ids,
    }, { acceptedIds: GROUPS, guidanceIds: GROUPS });

    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    const key = currentBrowserCacheKey(read("index.html"));
    s.eq("Lesson 37 advances the complete browser cache chain", {
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
            "lesson37_reader_guidance.mjs", key),
        renderingLeaf: usesBrowserCacheKey(
            read("src/ui/rendering/rendering.mjs"),
            "lesson37_reader_guidance.mjs", key),
    }, { key: true, index: true, main: true, bridge: true,
        bootstrap: true, runtime: true, shellLeaf: true,
        renderingLeaf: true });
    return s;
}

module.exports = { run };
