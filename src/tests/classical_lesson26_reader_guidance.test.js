"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson26_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson26-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON26_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const lesson25 = panel.indexOf('data-classical-reader-guidance-lesson="25"');
    const start = panel.indexOf('data-classical-reader-guidance-lesson="26"');
    const end = panel.indexOf('data-classical-reader-guidance-lesson="27"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 26 atoms point to twelve collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => ideaIds.includes(record.reviewGroupId)),
    }, { accepted: 664, groups: 12, ideas: 12, exactIds: true });
    s.eq("Lesson 26 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(/data-classical-reader-guidance-lesson="26"/gu) || []).length,
        cards: (visible.match(/data-classical-reader-guidance-group=/gu) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="26"[^>]*\sopen/gu.test(panel),
        afterLesson25: lesson25 >= 0 && start > lesson25,
        beforeFacts: start >= 0 && end > start,
    }, {
        lessonSections: 1,
        cards: 12,
        openByDefault: false,
        afterLesson25: true,
        beforeFacts: true,
    });
    const cacheKey = "20260818-lesson29-groups10-12-357";
    const readSource = (relativePath) => fs.readFileSync(
        path.join(ROOT, relativePath),
        "utf8",
    );
    s.eq("Lesson 26 uses the complete browser cache chain", {
        index: readSource("index.html").includes(`src/browser/main.mjs?v=${cacheKey}`),
        main: readSource("src/browser/main.mjs").includes(`bootstrap.mjs?v=${cacheKey}`),
        bootstrap: [
            "runtime_bridge.mjs",
            "create_runtime.mjs",
            "rendering.mjs",
            "classical_shell.mjs",
        ].every((moduleName) => readSource("src/bootstrap/bootstrap.mjs")
            .includes(`${moduleName}?v=${cacheKey}`)),
        bridge: readSource("src/bootstrap/runtime_bridge.mjs")
            .includes(`create_runtime.mjs?v=${cacheKey}`),
        runtime: ["vnc_derivation_evaluator.mjs", "vnc_layer_evaluator.mjs", "rendering.mjs", "classical_shell.mjs"]
            .every((moduleName) => readSource("src/runtime/create_runtime.mjs")
                .includes(`${moduleName}?v=${cacheKey}`)),
        leaf: readSource("src/ui/shell/classical_shell.mjs")
            .includes("lesson26_reader_guidance.mjs?v=20260816-lesson26-complete-007"),
    }, {
        index: true,
        main: true,
        bootstrap: true,
        bridge: true,
        runtime: true,
        leaf: true,
    });
    s.ok(
        "Lesson 26 guidance exposes only final-composition choices",
        ideas[0].guidance.includes("any open typed Source")
        && ideas[0].guidance.includes("only if the final composition needs it")
        && ideas[0].guidance.includes("never a whitelist")
        && ideas[1].guidance.includes("lexically unpredictable")
        && ideas[1].guidance.includes("any open typed Source")
        && ideas[1].guidance.includes("only when the final composition genuinely supports both roles")
        && ideas[1].guidance.includes("not an admission list or stem whitelist")
        && ideas[2].guidance.includes("any open typed Source")
        && ideas[2].guidance.includes("remains")
        && ideas[2].guidance.includes("si to xi")
        && ideas[2].guidance.includes("tzi or ti to chi")
        && ideas[2].guidance.includes("silent āyi restriction")
        && ideas[2].guidance.includes("shuntline ne")
        && ideas[2].guidance.includes("never a whitelist")
        && ideas[3].guidance.includes("any open typed final-a Source")
        && ideas[3].guidance.includes("genuinely unresolved Source history")
        && ideas[3].guidance.includes("recursive")
        && ideas[3].guidance.includes("do not restrict")
        && ideas[4].guidance.includes("any open Source")
        && ideas[4].guidance.includes("only when it is genuinely unsettled")
        && ideas[4].guidance.includes("no Canvas-stem picker")
        && ideas[5].guidance.includes("open typed o-ā Source")
        && ideas[5].guidance.includes("only when provenance cannot recover")
        && ideas[5].guidance.includes("signed earlier derivation removes that choice")
        && ideas[5].guidance.includes("never become spelling-based admission rules")
        && ideas[6].guidance.includes("more than one licensed analysis")
        && ideas[6].guidance.includes("never select it or restrict open stems")
        && ideas[7].guidance.includes("choose the intended imported participant")
        && ideas[7].guidance.includes("adds exactly one applicative object")
        && ideas[7].guidance.includes("do not add menus")
        && ideas[8].guidance.includes("choose the new applicative participant")
        && ideas[8].guidance.includes("retains the Source object on the shuntline")
        && ideas[8].guidance.includes("ordinary Lesson 17 supplementation path")
        && ideas[8].guidance.includes("only if several eligible silent objects remain")
        && ideas[9].guidance.includes("Recapture an eligible double-object Result")
        && ideas[9].guidance.includes("There is no separate triple-object engine")
        && ideas[9].guidance.includes("ordinary supplement link")
        && ideas[10].guidance.includes("more than one licensed typed Source interpretation")
        && ideas[10].guidance.includes("surface spelling never decides")
        && ideas[10].guidance.includes("ordinary Mood or Voice control")
        && ideas[11].guidance.includes("genuine alternative")
        && ideas[11].guidance.includes("never uses an English gloss or Canvas stem")
        && ideas[11].guidance.includes("one discontinuous grammatical unit")
        && ideas.every((entry) => entry.guidance.includes("clickable")),
    );
    s.ok(
        "unresolved o-a choices name the actual Source history in the live selector",
        readSource("src/ui/rendering/rendering.mjs")
            .includes("`Source history: ${sourceHistoryChoice}`")
        && readSource("src/ui/rendering/rendering.mjs")
            .includes("option.sourceHistoryChoice || \"\""),
    );
    for (const record of accepted) {
        const idea = ideas.find((entry) => entry.ideaId === record.reviewGroupId);
        s.ok(
            `${record.atomId} has its accepted reading job`,
            Boolean(idea?.title && idea?.guidance),
        );
        s.eq(
            `mutation:${record.atomId} fails when its reading idea is removed`,
            ctx.isLesson26ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
