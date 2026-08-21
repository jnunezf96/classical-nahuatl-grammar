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
    "lesson33-honorific-vnc-foundation-and-participant-gate",
    "lesson33-intransitive-causative-honorifics",
    "lesson33-intransitive-applicative-honorifics",
    "lesson33-projective-applicative-honorifics",
    "lesson33-derived-causative-and-applicative-sources",
    "lesson33-projective-causative-honorifics",
    "lesson33-mainline-reflexive-preterit-embed-honorifics",
    "lesson33-reverential-double-honorifics",
    "lesson33-pejorative-preterit-embed-vncs",
    "lesson33-compound-verbstem-attitude-scope",
];

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON33_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf('data-classical-reader-guidance-lesson="33"');
    const end = panel.indexOf('data-classical-reader-guidance-lesson="34"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 33 atoms point to ten collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="33"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="33"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 327, groups: 10, ideas: 10, exactIds: true,
        sections: 1, cards: 10, open: false });

    s.ok("Lesson 33 guidance separates Source facts, user choices, and automatic grammar",
        ideas[0].guidance.includes("If it licenses one formation")
        && ideas[0].guidance.includes("user chooses between them")
        && ideas[0].guidance.includes("first-person subject may honor an object")
        && ideas[0].guidance.includes("English H notation")
        && ideas[0].guidance.includes("clickable")
        && ideas[1].guidance.includes("ordinary causative owner")
        && ideas[1].guidance.includes("Source shape, vowel length, class, valence")
        && ideas[1].guidance.includes("one canonical shape is automatic")
        && ideas[1].guidance.includes("more than one real causative alternative")
        && ideas[1].guidance.includes("never authorize a Source")
        && ideas[2].guidance.includes("ordinary applicative owner")
        && ideas[2].guidance.includes("own interest")
        && ideas[2].guidance.includes("only the applicative is licensed")
        && ideas[2].guidance.includes("are both licensed")
        && ideas[2].guidance.includes("No miqui, chōca, or other example list")
        && ideas[3].guidance.includes("keeps every object already present")
        && ideas[3].guidance.includes("user chooses the respected participant")
        && ideas[3].guidance.includes("selects the existing object automatically")
        && ideas[3].guidance.includes("English H placement never decides")
        && ideas[4].guidance.includes("complete owner-issued Result")
        && ideas[4].guidance.includes("higher agent, lower agent")
        && ideas[4].guidance.includes("first-person embedded participant")
        && ideas[4].guidance.includes("subject versus object")
        && ideas[4].guidance.includes("copied formula")
        && ideas[5].guidance.includes("keeps the existing patient")
        && ideas[5].guidance.includes("same person as the Result subject")
        && ideas[5].guidance.includes("agent or the patient")
        && ideas[5].guidance.includes("selected automatically")
        && ideas[5].guidance.includes("genuinely available routes")
        && ideas[5].guidance.includes("do not form a list")
        && ideas[6].guidance.includes("mainline reflexive object")
        && ideas[6].guidance.includes("canonical perfective stem")
        && ideas[6].guidance.includes("silent preterit morph")
        && ideas[6].guidance.includes("fixed tla-(tzin-o-ā) matrix")
        && ideas[6].guidance.includes("shuntline reflexive")
        && ideas[6].guidance.includes("do not authorize a stem list")
        && ideas[7].guidance.includes("complete owner-issued honorific Result")
        && ideas[7].guidance.includes("second fixed tla-(tzin-o-ā) matrix")
        && ideas[7].guidance.includes("three visible levels")
        && ideas[7].guidance.includes("preserves it")
        && ideas[7].guidance.includes("does not invent a new participant choice")
        && ideas[7].guidance.includes("Raw stems")
        && ideas[8].guidance.includes("intransitive, projective-object, or reflexive")
        && ideas[8].guidance.includes("silent preterit morph 0")
        && ideas[8].guidance.includes("fixed tla-(pōl-o-ā)")
        && ideas[8].guidance.includes("first-person subject")
        && ideas[8].guidance.includes("real choice")
        && ideas[8].guidance.includes("never authorize a stem list")
        && ideas[9].guidance.includes("owner-issued compound Source")
        && ideas[9].guidance.includes("transforms the embed")
        && ideas[9].guidance.includes("lexicalized verbstem")
        && ideas[9].guidance.includes("shared-object compound")
        && ideas[9].guidance.includes("never chooses embed versus matrix")
        && ideas[9].guidance.includes("spelling does not decide"));

    for (const record of accepted) {
        const idea = ideas.find(entry => entry.ideaId === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted reading observation`,
            Boolean(idea?.guidance));
        s.eq(`mutation:${record.atomId} fails without its reading idea`,
            ctx.isLesson33ReaderGuidanceExact(
                ideas.filter(entry => entry.ideaId !== record.reviewGroupId)),
            false);
    }

    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    const key = currentBrowserCacheKey(read("index.html"));
    s.eq("Lesson 33 advances the repaired browser cache chain", {
        key: Boolean(key),
        index: usesBrowserCacheKey(read("index.html"), "src/browser/main.mjs", key),
        main: usesBrowserCacheKey(read("src/browser/main.mjs"), "bootstrap.mjs", key),
        bridge: usesBrowserCacheKey(read("src/bootstrap/runtime_bridge.mjs"),
            "create_runtime.mjs", key),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/bootstrap/bootstrap.mjs"), name, key)
        )),
        runtime: ["vnc_lessons27_29_33_closure.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/runtime/create_runtime.mjs"), name, key)
        )),
        leaf: usesBrowserCacheKey(read("src/ui/shell/classical_shell.mjs"),
            "lesson33_reader_guidance.mjs", key),
    }, { key: true, index: true, main: true, bridge: true,
        bootstrap: true, runtime: true, leaf: true });
    return s;
}

module.exports = { run };
