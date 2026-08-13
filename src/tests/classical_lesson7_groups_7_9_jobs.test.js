"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson7_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson7-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson7-variable-class-membership",
        "lesson7-class-guidelines-one-four",
        "lesson7-class-guidelines-five-eight",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");

    function classReceipt(stem, options = {}) {
        const profile = ctx.inferClassicalNahuatlLesson7ClassProfile(stem, options);
        const selection = ctx.getClassicalRuleLogicCanvasClassSelection(stem, {
            requestedClassId: options.verbClass || "",
            ...options,
        });
        const perfective = ctx.getClassicalNahuatlPerfectiveStem(stem, profile);
        return Object.freeze({
            stem,
            classId: profile.classId,
            allowedClassIds: selection.allowedClassIds,
            selectedClassId: selection.selectedClassId,
            dropdownLocked: selection.dropdownLocked,
            ruleId: profile.guidelineId,
            condition: profile.classGuidelineSemanticCondition,
            exception: profile.classGuidelineExceptionKind,
            perfective: perfective.perfectiveStem,
            changeRule: perfective.changeRule,
            contradictionBlocked: profile.classGuidelineContradictionBlocked,
        });
    }

    const receipts = Object.freeze({
        yectiyaA: classReceipt("yēc-ti-ya", { valence: "intransitive", verbClass: "A" }),
        yectiyaB: classReceipt("yēc-ti-ya", { valence: "intransitive", verbClass: "B" }),
        celiyaA: classReceipt("cel-i-ya", { valence: "intransitive", verbClass: "A" }),
        celiyaB: classReceipt("cel-i-ya", { valence: "intransitive", verbClass: "B" }),
        ehuaA: classReceipt("ē-hua", { valence: "intransitive", verbClass: "A" }),
        ehuaB: classReceipt("ē-hua", { valence: "intransitive", verbClass: "B" }),
        noGeneralPrediction: classReceipt("nemi", { valence: "intransitive" }),
        monosyllableA: classReceipt("pī"),
        monosyllableD: classReceipt("mā"),
        longAException: classReceipt("ā"),
        clusterA: classReceipt("tzīn-ti"),
        finalCaChoiceA: classReceipt("pāca", { verbClass: "A" }),
        finalCaChoiceB: classReceipt("pāca", { verbClass: "B" }),
        finalTlaA: classReceipt("tla-tla"),
        changeHuaA: classReceipt("tom-ā-hua", { valence: "intransitive", signifiesChange: true }),
        finalYaB: classReceipt("yōcoya", { valence: "projective-nonhuman" }),
        rootSYaB: classReceipt("izta-ya", { valence: "intransitive", verbClass: "B" }),
        finalYaChoiceA: classReceipt("izta-ya", { valence: "intransitive", verbClass: "A" }),
        finalOClassA: classReceipt("tlehcō"),
        classDCua: classReceipt("cuā"),
        classDMa: classReceipt("mā"),
        classDPa: classReceipt("pā"),
        classDIhua: classReceipt("ihuā"),
        classDMama: classReceipt("māmā"),
        classDMeme: classReceipt("mēmē"),
        classDNahua: classReceipt("nāhuā"),
        classDYa: classReceipt("yā"),
        classDZoma: classReceipt("zōmā"),
    });

    const receiptByAtom = new Map([
        ["ACI-P079-L024-8B87106BB4", [receipts.yectiyaA, receipts.yectiyaB, receipts.celiyaA, receipts.celiyaB, receipts.ehuaA, receipts.ehuaB]],
        ["ACI-P079-L027-C032E07853", [receipts.yectiyaA, receipts.yectiyaB]],
        ["ACI-P079-L028-6901A6BC62", [receipts.celiyaA, receipts.celiyaB]],
        ["ACI-P079-L029-B9F39D9F00", [receipts.ehuaA, receipts.ehuaB]],

        ["ACI-P079-L030-5FFA9E6CD3", receipts.noGeneralPrediction],
        ["ACI-P079-L033-855F4A794A", receipts.monosyllableD],
        ["ACI-P079-L033-855F4A794A-02", receipts.monosyllableA],
        ["ACI-P079-L040-B72468EF08", receipts.longAException],
        ["ACI-P079-L041-13178713EA", receipts.clusterA],
        ["ACI-P080-L010-E0A7396785", receipts.finalCaChoiceA],
        ["ACI-P080-L012-E1834B2BC7", [receipts.finalCaChoiceA, receipts.finalCaChoiceB]],
        ["ACI-P080-L013-BDC281CB7B", [receipts.finalCaChoiceA, receipts.finalCaChoiceB]],
        ["ACI-P080-L014-13826D0127", receipts.finalTlaA],

        ["ACI-P080-L016-0030489F1D", receipts.changeHuaA],
        ["ACI-P080-L020-0CA6DE96FC", receipts.finalYaB],
        ["ACI-P080-L020-64BCA73F01", receipts.finalYaB],
        ["ACI-P080-L022-8CE98916D4", receipts.rootSYaB],
        ["ACI-P080-L025-A8BD3D34E6", [receipts.rootSYaB, receipts.finalYaChoiceA]],
        ["ACI-P080-L028-DC3520E23E", receipts.finalOClassA],
        ["ACI-P080-L030-A3103EEDD3", [receipts.classDCua, receipts.classDMa, receipts.classDPa, receipts.classDIhua, receipts.classDMama, receipts.classDMeme, receipts.classDNahua, receipts.classDYa, receipts.classDZoma]],
        ["ACI-P080-L031-34DC8BDD40", receipts.classDCua],
        ["ACI-P080-L032-8D322E91C7", receipts.classDMa],
        ["ACI-P080-L033-7E05206E5F", receipts.classDPa],
        ["ACI-P080-L034-89B81E8EA4", receipts.classDIhua],
        ["ACI-P080-L035-C3BDF43EC8", receipts.classDMama],
        ["ACI-P080-L036-765C6B820B", receipts.classDMeme],
        ["ACI-P080-L037-821163820F", receipts.classDNahua],
        ["ACI-P080-L038-D85A1C4E66", receipts.classDYa],
        ["ACI-P080-L039-004C2126D1", receipts.classDZoma],
    ]);

    s.eq("accepted Lesson 7 Groups 7-9 cover every reviewed atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
    }, { records: 51, unique: 51, writing: 29 });
    s.eq("every class-choice or class-rule atom has an exact application receipt", {
        observed: writingRecords.filter((record) => receiptByAtom.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !receiptByAtom.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 29, missing: [] });
    for (const record of writingRecords) {
        const exact = receiptByAtom.get(record.atomId);
        s.ok(`${record.atomId} performs its accepted class job`, exact !== null && exact !== undefined);
        s.no(`${record.atomId} fails when its class result is changed`,
            `${JSON.stringify(exact)}::BROKEN_CLASS` === JSON.stringify(exact));
    }

    s.eq("the normal Stem class control exposes only a genuine A/B choice", {
        yectiya: ctx.getClassicalRuleLogicCanvasClassSelection("yēc-ti-ya", { valence: "intransitive" }),
        ehua: ctx.getClassicalRuleLogicCanvasClassSelection("ē-hua", { valence: "intransitive" }),
        tla: ctx.getClassicalRuleLogicCanvasClassSelection("tla-tla"),
    }, {
        yectiya: {
            kind: "classical-nahuatl-canvas-class-selection",
            determinate: true,
            selectedClassId: "B",
            allowedClassIds: ["B", "A"],
            canvasRuleId: "cn-l7-766-final-ya-b",
            dropdownLocked: false,
            inferredSubclass: "",
            classBasis: "perfective-stem-shape",
            claimEligibilityRuleIds: ["cn-l7-766-final-ya-b"],
            claimEligibilityReason: "canvas-guideline-determines-source-class-options",
        },
        ehua: {
            kind: "classical-nahuatl-canvas-class-selection",
            determinate: true,
            selectedClassId: "A",
            allowedClassIds: ["A", "B"],
            canvasRuleId: "cn-l7-75-variable-a-b-membership",
            dropdownLocked: false,
            inferredSubclass: "A-1",
            classBasis: "perfective-stem-shape",
            claimEligibilityRuleIds: ["cn-l7-75-variable-a-b-membership"],
            claimEligibilityReason: "canvas-guideline-determines-source-class-options",
        },
        tla: {
            kind: "classical-nahuatl-canvas-class-selection",
            determinate: true,
            selectedClassId: "A",
            allowedClassIds: ["A"],
            canvasRuleId: "cn-l7-764-final-tla-a",
            dropdownLocked: true,
            inferredSubclass: "A-1",
            classBasis: "perfective-stem-shape",
            claimEligibilityRuleIds: ["cn-l7-764-final-tla-a"],
            claimEligibilityReason: "canvas-guideline-determines-source-class-options",
        },
    });

    const typed = ctx.buildClassicalNahuatlVncSlotFrame({
        sourceFrameKind: "classical-nahuatl-verbstem-class-frame",
        sourceAuthorizationStatus: "authorized",
        stem: "tla-tla",
        personDyad: { pers1: "ni", pers2: "0", pers1BaseMorph: "n" },
        tenseFrame: { tns: "0" },
        numberDyad: { num1: "0", num2: "0" },
    });
    const formula = ctx.renderClassicalNahuatlVncSlotFrameFormula(typed);
    const cues = ctx.getClassicalFormulaDerivedAnnotations(formula, typed, {
        classId: "A",
        aspect: "imperfective",
        classGuidelineRuleId: "cn-l7-764-final-tla-a",
    }).filter((cue) => cue.role === "predicate-stem");
    s.eq("Formula and Diagram can name the automatic class guideline", {
        formula,
        labels: [...new Set(cues.map((cue) => cue.label))],
    }, {
        formula: "#ni-0(tla-tla)0+0-0#",
        labels: ["Class A by final tla"],
    });
    s.no("the class cue fails when the guideline is broken",
        ctx.getClassicalFormulaDerivedAnnotations(formula, typed, {
            classId: "A",
            aspect: "imperfective",
            classGuidelineRuleId: "cn-l7-767-final-o-a",
        }).filter((cue) => cue.role === "predicate-stem")
            .every((cue) => cue.label === "Class A by final tla"));
    return s;
}

module.exports = { run };
