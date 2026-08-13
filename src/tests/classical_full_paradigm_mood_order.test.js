"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_full_paradigm_mood_order");
    const groups = ctx.CLASSICAL_VNC_PARADIGM_GROUPS;
    const rendering = fs.readFileSync(path.resolve(
        __dirname, "../ui/rendering/rendering.mjs"
    ), "utf8");

    s.eq("full paradigm groups are arranged by mood", groups.map((group) => group.mood), [
        "indicative", "indicative", "optative", "optative", "admonitive",
    ]);
    s.eq("each mood keeps its authorized aspect series", groups.map((group) => group.key), [
        "imperfective-indicative",
        "perfective-indicative",
        "imperfective-optative",
        "perfective-optative",
        "perfective-admonitive",
    ]);
    s.ok("the visible heading presents mood before series",
        rendering.includes('groupTitle.textContent = moodLabels[group.mood] || group.mood;')
        && rendering.includes('groupMood.textContent = group.semanticSeriesLabel || aspectLabels[group.aspect] || group.aspect;'));
    const indicativePresent = groups.find((group) => group.key === "imperfective-indicative");
    const indicativePast = groups.find((group) => group.key === "perfective-indicative");
    s.eq("past-as-present is hidden when the current stem supplies no form",
        ctx.getClassicalVncParadigmVisibleTenses(indicativePresent, [
            { tense: "present", surface: "nemi" },
        ]),
        ["present", "customary-present", "imperfect", "future"]);
    s.eq("past-as-present appears when the current stem supplies a form",
        ctx.getClassicalVncParadigmVisibleTenses(indicativePresent, [
            { tense: "present", surface: "nemi" },
            { tense: "preterit-as-present", surface: "ōnicac" },
        ]),
        ["present", "preterit-as-present", "customary-present", "imperfect", "future"]);
    s.eq("distant-past-as-past follows the same rule", {
        absent: ctx.getClassicalVncParadigmVisibleTenses(indicativePast, [
            { tense: "preterit", surface: "onen" },
        ]),
        present: ctx.getClassicalVncParadigmVisibleTenses(indicativePast, [
            { tense: "preterit", surface: "onen" },
            { tense: "distant-past-as-past", surface: "ōnen" },
        ]),
    }, {
        absent: ["preterit", "distant-past"],
        present: ["preterit", "distant-past", "distant-past-as-past"],
    });
    return s;
}

module.exports = { run };
