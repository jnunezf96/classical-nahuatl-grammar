"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson27_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson27-review-ledger.json"),
        "utf8",
    ));
    const accepted = ledger.records.filter((record) => (
        record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON27_READER_GUIDANCE_GROUPS;
    const ideaIds = ideas.map((entry) => entry.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const lesson26 = panel.indexOf('data-classical-reader-guidance-lesson="26"');
    const start = panel.indexOf('data-classical-reader-guidance-lesson="27"');
    const end = panel.indexOf('data-classical-reader-guidance-lesson="28"');
    const visible = panel.slice(start, end);

    s.eq("accepted Lesson 27 atoms point to eleven collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map((record) => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every((record) => ideaIds.includes(record.reviewGroupId)),
    }, { accepted: 335, groups: 11, ideas: 11, exactIds: true });
    s.eq("Lesson 27 guidance is delivered once and collapsed by default", {
        lessonSections: (panel.match(/data-classical-reader-guidance-lesson="27"/gu) || []).length,
        cards: (visible.match(/data-classical-reader-guidance-group=/gu) || []).length,
        openByDefault: /data-classical-reader-guidance-lesson="27"[^>]*\sopen/gu.test(panel),
        afterLesson26: lesson26 >= 0 && start > lesson26,
        beforeFacts: start >= 0 && end > start,
    }, {
        lessonSections: 1,
        cards: 11,
        openByDefault: false,
        afterLesson26: true,
        beforeFacts: true,
    });
    const cacheKey = "20260816-lesson28-group12-348";
    const readSource = (relativePath) => fs.readFileSync(
        path.join(ROOT, relativePath),
        "utf8",
    );
    s.eq("Lesson 27 uses the complete browser cache chain", {
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
        shellContract: readSource("src/ui/shell/classical_shell.mjs")
            .includes(`vnc_late_operation_ui_contract.mjs?v=${cacheKey}`),
        leaf: readSource("src/ui/shell/classical_shell.mjs")
            .includes("lesson27_reader_guidance.mjs?v=20260816-lesson27-groups10-11-004"),
    }, {
        index: true,
        main: true,
        bootstrap: true,
        bridge: true,
        runtime: true,
        shellContract: true,
        leaf: true,
    });
    s.ok(
        "Lesson 27 guidance exposes only choices required by the final composition",
        ideas[0].guidance.includes("any open typed verbstem")
        && ideas[0].guidance.includes("no rule that predicts")
        && ideas[0].guidance.includes("Canvas examples are evidence, never a stem whitelist")
        && ideas[1].guidance.includes("defaults to leave the reading open")
        && ideas[1].guidance.includes("only when the intended final semantic composition needs")
        && ideas[1].guidance.includes("only when the typed Source has an object")
        && ideas[2].guidance.includes("uses it automatically")
        && ideas[2].guidance.includes("existing Supportive i choice appears")
        && ideas[2].guidance.includes("only for intended insistence or emphasis")
        && ideas[3].guidance.includes("Reduplication target appears")
        && ideas[3].guidance.includes("examples are evidence, not a stem list")
        && ideas[4].guidance.includes("existing Voice and formation choices")
        && ideas[4].guidance.includes("Any matching typed Source shape is admitted")
        && ideas[5].guidance.includes("For any typed causative destockal Source")
        && ideas[5].guidance.includes("never authorize or block a stem")
        && ideas[6].guidance.includes("any completed ca or tz-a Source")
        && ideas[6].guidance.includes("never limits the path")
        && ideas[7].guidance.includes("use it as the next Source")
        && ideas[7].guidance.includes("ordinary participant control")
        && ideas[8].guidance.includes("any open compatible root")
        && ideas[8].guidance.includes("never treats the Canvas examples as a stem list")
        && ideas[9].guidance.includes("any open compatible intransitive Source")
        && ideas[9].guidance.includes("unreduplicated tz-ca")
        && ideas[9].guidance.includes("never a stem list")
        && ideas[10].guidance.includes("owner-issued nonactive Result")
        && ideas[10].guidance.includes("preserves the impersonal voice and participant topology")
        && ideas[10].guidance.includes("ordinary Mood and Tense machinery")
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
            ctx.isLesson27ReaderGuidanceExact(
                ideas.filter((entry) => entry.ideaId !== record.reviewGroupId),
            ),
            false,
        );
    }
    return s;
}

module.exports = { run };
