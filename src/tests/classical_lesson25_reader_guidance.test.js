"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const { hasVersionedImport } = require("./helpers/browser_cache_chain");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson25-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON25_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const lesson24 = panel.indexOf('data-classical-reader-guidance-lesson="24"');
    const start = panel.indexOf('data-classical-reader-guidance-lesson="25"');
    const end = panel.indexOf('data-classical-reader-guidance-lesson="26"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 25 atoms point to twelve collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => ideaIds.includes(record.reviewGroupId)),
    }, { accepted: 756, groups: 12, ideas: 12, exactIds: true });
    s.eq("Lesson 25 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(/data-classical-reader-guidance-lesson="25"/gu) || []).length,
        cards: (visible.match(/data-classical-reader-guidance-group=/gu) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="25"[^>]*\sopen/gu.test(panel),
        afterLesson24: lesson24 >= 0 && start > lesson24,
        beforeFacts: start >= 0 && end > start,
    }, {
        lessonSections: 1,
        cards: 12,
        openByDefault: false,
        afterLesson24: true,
        beforeFacts: true,
    });
    const readSource = (relativePath) => fs.readFileSync(
        path.join(ROOT, relativePath),
        "utf8",
    );
    s.eq("Lesson 25 uses the complete browser cache chain", {
        index: hasVersionedImport(readSource("index.html"), "src/browser/main.mjs"),
        main: hasVersionedImport(readSource("src/browser/main.mjs"), "bootstrap.mjs"),
        bootstrap: [
            "runtime_bridge.mjs",
            "create_runtime.mjs",
            "rendering.mjs",
            "classical_shell.mjs",
        ].every((moduleName) => hasVersionedImport(
            readSource("src/bootstrap/bootstrap.mjs"), moduleName)),
        bridge: hasVersionedImport(readSource("src/bootstrap/runtime_bridge.mjs"),
            "create_runtime.mjs"),
        runtime: ["rendering.mjs", "classical_shell.mjs"]
            .every((moduleName) => hasVersionedImport(
                readSource("src/runtime/create_runtime.mjs"), moduleName)),
        leaf: hasVersionedImport(readSource("src/ui/shell/classical_shell.mjs"),
            "lesson25_reader_guidance.mjs"),
    }, {
        index: true,
        main: true,
        bootstrap: true,
        bridge: true,
        runtime: true,
        leaf: true,
    });
    s.ok(
        "Lesson 25 guidance exposes only final-composition choices",
        ideas[0].guidance.includes("any open typed Source")
        && ideas[0].guidance.includes("more than one licensed nonactive history")
        && ideas[0].guidance.includes("not controls or a stem whitelist")
        && ideas[1].guidance.includes("any open typed Source")
        && ideas[1].guidance.includes("never an admission list")
        && ideas[1].guidance.includes("only when both formations are licensed")
        && ideas[2].guidance.includes("only when the final composition requires")
        && ideas[2].guidance.includes("silent versus sounded appears only")
        && ideas[3].guidance.includes("any open typed Source")
        && ideas[3].guidance.includes("only when another licensed history or variant")
        && ideas[3].guidance.includes("never a stem whitelist or an admission list")
        && ideas[4].guidance.includes("Choose Causative versus Applicative only")
        && ideas[4].guidance.includes("rather than a stem list")
        && ideas[5].guidance.includes("any open typed long-o Source")
        && ideas[5].guidance.includes("only when both grammatical results remain possible")
        && ideas[5].guidance.includes("not a stem whitelist")
        && ideas[6].guidance.includes("choose the new causer")
        && ideas[6].guidance.includes("only when the final composition leaves a real referent choice")
        && ideas[6].guidance.includes("active Source")
        && ideas[6].guidance.includes("reflexive causee")
        && ideas[6].guidance.includes("impersonal Source")
        && ideas[7].guidance.includes("mainline and preserves the older Source object on the shuntline")
        && ideas[7].guidance.includes("silent specific shuntlines")
        && ideas[7].guidance.includes("ne")
        && ideas[8].guidance.includes("captured canonical Result")
        && ideas[8].guidance.includes("three levels")
        && ideas[8].guidance.includes("No separate triple-object engine")
        && ideas[9].guidance.includes("more than one licensed typed Source analysis")
        && ideas[9].guidance.includes("otherwise leave the reading open")
        && ideas[9].guidance.includes("surface string never chooses or authorizes")
        && ideas[10].guidance.includes("ordinary controls")
        && ideas[10].guidance.includes("shared owners")
        && ideas[10].guidance.includes("no second mood lane")
        && ideas[11].guidance.includes("Reuse Lesson 17 supplementation")
        && ideas[11].guidance.includes("only when more than one head remains possible")
        && ideas[11].guidance.includes("without making the object overt")
        && ideas.every((entry) => entry.guidance.includes("clickable")),
    );
    for (const record of accepted) {
        const idea = ideas.find((entry) => entry.ideaId === record.reviewGroupId);
        s.ok(
            `${record.atomId} has its accepted reading job`,
            Boolean(idea?.title && idea?.guidance),
        );
        s.eq(
            `mutation:${record.atomId} fails when its reading idea is removed`,
            ctx.isLesson25ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
