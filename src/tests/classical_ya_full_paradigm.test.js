"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_ya_full_paradigm");

    s.eq(
        "Full yā paradigm retains the Canvas-authorized distant-past-as-past hui plus a series",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "yā",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "yā",
                verbClass: "D",
                requestedVerbClass: "D",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["perfective-indicative"],
                tenseKeys: ["general-past"]
            });
            const distantPastAsPast = frame.rows
                .filter((row) => row.mood === "indicative" && row.tense === "distant-past-as-past")
                .map((row) => [row.subject, row.semanticTenseValue, row.morphologicalTense, row.formula, row.typedSlotFrame?.slots?.predicate?.stem || ""]);
            return {
                status: frame.authorizationStatus,
                rowCount: frame.rowCount,
                distantPastAsPast
            };
        })(),
        {
            status: "authorized",
            rowCount: 6,
            distantPastAsPast: [
                ["1sg", "general-past", "distant-past", "#ni-0(hui)a+0-0#", "hui"],
                ["2sg", "general-past", "distant-past", "#ti-0(hui)a+0-0#", "hui"],
                ["3sg", "general-past", "distant-past", "#0-0(hui)a+0-0#", "hui"],
                ["1pl", "general-past", "distant-past", "#ti-0(hui)a+0-h#", "hui"],
                ["2pl", "general-past", "distant-past", "#an-0(hui)a+0-h#", "hui"],
                ["3pl", "general-past", "distant-past", "#0-0(hui)a+0-h#", "hui"]
            ]
        }
    );

    s.eq(
        "yā reuses its authorized indicative stems for Lesson 9 borrowed optative uses",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "yā",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "yā",
                verbClass: "D",
                requestedVerbClass: "D",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["imperfective-optative", "perfective-optative"],
                tenseKeys: ["future", "preterit"]
            });
            return frame.rows.map((row) => [
                row.tense,
                row.subject,
                row.typedSlotFrame?.slots?.predicate?.stem || "",
                row.formula
            ]);
        })(),
        [
            ["future", "1sg", "yā", "#ni-0(yā)z+⎕-0#"],
            ["future", "2sg", "yā", "#ti-0(yā)z+⎕-0#"],
            ["future", "3sg", "yā", "#0-0(yā)z+⎕-0#"],
            ["future", "1pl", "yā", "#ti-0(yā)z+qu-eh#"],
            ["future", "2pl", "yā", "#an-0(yā)z+qu-eh#"],
            ["future", "3pl", "yā", "#0-0(yā)z+qu-eh#"],
            ["preterit", "1sg", "yah", "#ni-0(yah)0+⎕-0#"],
            ["preterit", "2sg", "yah", "#ti-0(yah)0+⎕-0#"],
            ["preterit", "3sg", "yah", "#0-0(yah)0+⎕-0#"],
            ["preterit", "1pl", "yah", "#ti-0(yah)0+qu-eh#"],
            ["preterit", "2pl", "yah", "#an-0(yah)0+qu-eh#"],
            ["preterit", "3pl", "yah", "#0-0(yah)0+qu-eh#"]
        ]
    );

    s.eq(
        "Full yā optatives carry their typed Lesson 9 sentence layer",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "yā",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "yā",
                verbClass: "D",
                requestedVerbClass: "D",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["imperfective-optative", "perfective-optative"],
                tenseKeys: ["nonpast", "past", "future", "preterit"],
                subjectKeys: ["1sg"]
            });
            return frame.rows.map((row) => [row.tense, row.surface, row.sentenceFormula]);
        })(),
        [
            ["nonpast", "Mā niyauh.", "mā #ni-0(ya-uh)0+⎕-0#."],
            ["past", "Mā niyāni.", "mā #ni-0(yā)ni+0-0#."],
            ["future", "Mā niyāz.", "mā #ni-0(yā)z+⎕-0#."],
            ["preterit", "Mā ōniyah.", "mā ō#ni-0(yah)0+⎕-0#."]
        ]
    );

    return s;
}

module.exports = { run };
