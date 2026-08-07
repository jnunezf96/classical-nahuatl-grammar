"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_present_morphology_projection");
    const buildParadigm = (stem, verbClass) => ctx.buildClassicalVncParadigmFrame({
        basalUnit: "vnc",
        lesson: "7",
        stem,
        sourceTransitivity: "intransitive",
        sourceMatrixStem: stem,
        verbClass,
        requestedVerbClass: verbClass,
        valence: "intransitive",
        requestedValence: "intransitive",
        sourceSubject: "1sg",
        sentenceNegativeMode: "positive",
        polarityMode: "positive",
        sentenceSurfaceMode: "statement"
    }, {
        groupKeys: ["imperfective-indicative"],
        tenseKeys: ["present"]
    });

    s.eq(
        "Full paradigms distinguish a present meaning from its typed morphological aspect",
        (() => {
            const presence = buildParadigm("ā", "A");
            const go = buildParadigm("yā", "D");
            const presenceRows = presence.rows.filter((row) => row.mood === "indicative" && row.tense === "preterit-as-present");
            const goRows = go.rows.filter((row) => row.mood === "indicative" && row.tense === "present");
            return {
                presenceStatus: presence.authorizationStatus,
                presencePreteritAsPresent: presenceRows.map((row) => [row.subject, row.semanticTenseValue, row.formula, row.morphologicalTense, row.morphologicalAspect]),
                goPresent: goRows.map((row) => [row.subject, row.surface, row.typedSlotFrame?.slots?.predicate?.stem || "", row.morphologicalTense, row.morphologicalAspect]),
                presentSeriesLabel: presence.groups.find((group) => group.key === "imperfective-indicative")?.semanticSeriesLabel || ""
            };
        })(),
        {
            presenceStatus: "authorized",
            presencePreteritAsPresent: [
                ["1sg", "present", "#n-0(ā)0+c-0#", "preterit", "perfective"],
                ["2sg", "present", "#t-0(ā)0+c-0#", "preterit", "perfective"],
                ["3sg", "present", "#0-0(ā)0+c-0#", "preterit", "perfective"],
                ["1pl", "present", "#t-0(ā)0+qu-eh#", "preterit", "perfective"],
                ["2pl", "present", "#am-0(ā)0+qu-eh#", "preterit", "perfective"],
                ["3pl", "present", "#0-0(ā)0+qu-eh#", "preterit", "perfective"]
            ],
            goPresent: [
                ["1sg", "niyauh", "ya-uh", "present", "imperfective"],
                ["2sg", "tiyauh", "ya-uh", "present", "imperfective"],
                ["3sg", "yauh", "ya-uh", "present", "imperfective"],
                ["1pl", "tihuih", "hui", "present", "imperfective"],
                ["2pl", "anhuih", "hui", "present", "imperfective"],
                ["3pl", "huih", "hui", "present", "imperfective"]
            ],
            presentSeriesLabel: "Present-series forms"
        }
    );
    return s;
}

module.exports = { run };
