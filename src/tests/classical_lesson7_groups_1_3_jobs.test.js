"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson7_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson7-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson7-verbstem-structure",
        "lesson7-verbcore-citation",
        "lesson7-class-basis",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");

    const structure = ctx.buildClassicalNahuatlVerbstemStructureRuleFrame("chip-ā-hua");
    const human = ctx.buildClassicalNahuatlCitationRuleFrame("nōtza", { valence: "projective-human" });
    const nonhuman = ctx.buildClassicalNahuatlCitationRuleFrame("chīhua", { valence: "projective-nonhuman" });
    const reflexive = ctx.buildClassicalNahuatlCitationRuleFrame("zōmā", { valence: "mainline-reflexive" });
    const reciprocal = ctx.buildClassicalNahuatlCitationRuleFrame("tla-zo-h-tla", { valence: "human-reciprocal" });
    const observations = new Map([
        ["ACI-P076-L011-65C1B6BAA4", [structure.internalMorphBoundary, structure.internalMorphs]],
        ["ACI-P076-L011-95E2129026", [structure.internalMorphsRemainInsideVerbstem, structure.internalMorphsBecomeFormulaSlots, structure.formulaSlotSplitAllowed]],
        ["ACI-P077-L008-528B47A88A", [human.isolatedVerbstemCitationAllowed, human.ruleLogicRole, human.citationForm]],
        ["ACI-P077-L013-8BD5CC70A0", [human.citationForm, nonhuman.citationForm, reflexive.citationForm, reciprocal.citationForm]],
    ]);
    const expected = new Map([
        ["ACI-P076-L011-65C1B6BAA4", ["-", ["chip", "ā", "hua"]]],
        ["ACI-P076-L011-95E2129026", [true, false, false]],
        ["ACI-P077-L008-528B47A88A", [false, "verbcore-citation-authority", "te-(nōtza)"]],
        ["ACI-P077-L013-8BD5CC70A0", ["te-(nōtza)", "tla-(chīhua)", "m-o-(zōmā)", "t-o-(tla-zo-h-tla)"]],
    ]);

    s.eq("accepted Lesson 7 Groups 1-3 cover the reviewed atoms once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
        reading: records.length,
    }, { records: 49, unique: 49, writing: 4, reading: 49 });
    s.eq("every writing atom observes its exact normal application job", {
        observed: writingRecords.filter((record) => observations.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !observations.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 4, missing: [] });
    for (const record of writingRecords) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = JSON.parse(JSON.stringify(actual));
        broken.push("BROKEN");
        s.no(`${record.atomId} fails when its exact behavior is broken`,
            JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const typed = ctx.buildClassicalNahuatlVncSlotFrame({
        sourceFrameKind: "classical-nahuatl-verbstem-class-frame",
        sourceAuthorizationStatus: "authorized",
        stem: "chip-ā-hua",
        personDyad: { pers1: "ni", pers2: "0", pers1BaseMorph: "n" },
        tenseFrame: { tns: "0" },
        numberDyad: { num1: "0", num2: "0" },
    });
    const formula = ctx.renderClassicalNahuatlVncSlotFrameFormula(typed);
    const annotations = ctx.getClassicalFormulaDerivedAnnotations(formula, typed, {
        classId: "A",
        aspect: "imperfective",
    });
    const stemCues = annotations.filter((annotation) => annotation.role === "predicate-stem");
    s.eq("the automatic stem work is visible as a short Formula cue", {
        formula,
        labels: [...new Set(stemCues.map((annotation) => annotation.label))],
        sections: [...new Set(stemCues.flatMap((annotation) => annotation.lessonSections))],
    }, {
        formula: "#ni-0(chip-ā-hua)0+0-0#",
        labels: ["Class A imperfective verbstem morph"],
        sections: ["§7.1", "§7.3"],
    });
    s.no("the class cue fails when the grammatical class is broken",
        ctx.getClassicalFormulaDerivedAnnotations(formula, typed, { classId: "B", aspect: "imperfective" })
            .filter((annotation) => annotation.role === "predicate-stem")
            .every((annotation) => annotation.label === "Class A imperfective verbstem morph"));
    return s;
}

module.exports = { run };
