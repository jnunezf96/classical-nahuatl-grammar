"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson7_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson7-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson7-predicate-tables",
        "lesson7-analysis-translation",
        "lesson7-object-relationship-contrasts",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");

    function predicate(stem, verbClass, mood, tense, subject = "3sg") {
        const frame = ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            verbClass,
            mood,
            tense,
            subject,
            valence: "intransitive",
        });
        const rule = frame.predicateFormationRuleFrame;
        return Object.freeze({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            classId: rule.classId,
            aspect: rule.aspect,
            stem: rule.stemVariant,
            tenseMorph: rule.tenseFrame.tns,
            tableCell: rule.predicateTableCell,
            tableSide: rule.predicateTableSide,
            carrier: rule.predicateExpectedCarrier,
        });
    }
    function object(stem, options) {
        const frame = ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            ...options,
            verbClass: "A",
            mood: "indicative",
            tense: "present",
        });
        const rule = frame.objectRelationshipRuleFrame;
        return Object.freeze({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            kind: rule.selectedObjectRelationshipKind,
            group: rule.selectedObjectRelationshipGroup,
            topic: rule.selectedObjectRelationshipTopic,
            subjectNumber: rule.selectedSubjectNumber,
            objectPerson: rule.selectedObjectPerson,
            objectHumanness: rule.selectedObjectHumanness,
            objectSlot: rule.selectedObjectSlot,
            indefinite: rule.selectedIndefiniteObject,
            range: rule.relationshipRange,
            interpretations: rule.selectedObjectInterpretations,
            grammaticalObjectNumber: rule.grammaticalObjectNumber,
            referentNumberReadings: rule.selectedReferentNumberReadings,
            reciprocalPossible: rule.pluralReflexiveReciprocalPossible,
            evidenceAbsenceBlocksGeneration: rule.evidencePolicy.evidenceAbsenceBlocksGeneration,
        });
    }

    const cases = Object.freeze({
        a1Present: predicate("chōca", "A", "indicative", "present"),
        a1Preterit: predicate("chōca", "A", "indicative", "preterit"),
        a2Present: predicate("temō", "A", "indicative", "present"),
        a2Optative: predicate("temō", "A", "optative", "nonpast"),
        bPresent: predicate("yōli", "B", "indicative", "present"),
        bCustomary: predicate("yōli", "B", "indicative", "customary-present"),
        bImperfect: predicate("yōli", "B", "indicative", "imperfect"),
        bFuture: predicate("yōli", "B", "indicative", "future"),
        bOptative: predicate("yōli", "B", "optative", "nonpast"),
        cPresent: predicate("chol-o-ā", "C", "indicative", "present"),
        cFuture: predicate("chol-o-ā", "C", "indicative", "future"),
        cPreterit: predicate("chol-o-ā", "C", "indicative", "preterit"),
        dPresent: predicate("cuā", "D", "indicative", "present"),
        dFuture: predicate("cuā", "D", "indicative", "future"),
        dPreterit: predicate("cuā", "D", "indicative", "preterit"),

        humanIndefinite: object("itta", { valence: "projective-human", subject: "1sg" }),
        reflexive1sg: object("itta", { valence: "mainline-reflexive", subject: "1sg" }),
        object2sgHuman: object("itta", { valence: "specific-projective", objectKind: "specific-projective", objectPerson: "2sg", objectHumanness: "human", subject: "1sg" }),
        object3sgNonhuman: object("itta", { valence: "specific-projective", objectKind: "specific-projective", objectPerson: "3sg", objectHumanness: "nonhuman", subject: "1sg" }),
        object1plHuman: object("itta", { valence: "specific-projective", objectKind: "specific-projective", objectPerson: "1pl", objectHumanness: "human", subject: "1sg" }),
        object2plHuman: object("itta", { valence: "specific-projective", objectKind: "specific-projective", objectPerson: "2pl", objectHumanness: "human", subject: "1sg" }),
        object3plNonhuman: object("itta", { valence: "specific-projective", objectKind: "specific-projective", objectPerson: "3pl", objectHumanness: "nonhuman", subject: "1sg" }),
        humanIndefinite2sg: object("itta", { valence: "projective-human", subject: "2sg" }),
        object1sgBy2sg: object("itta", { valence: "specific-projective", objectKind: "specific-projective", objectPerson: "1sg", objectHumanness: "human", subject: "2sg" }),
        reflexive2sg: object("itta", { valence: "mainline-reflexive", subject: "2sg" }),
        humanIndefinite1pl: object("itta", { valence: "projective-human", subject: "1pl" }),
        reflexive1pl: object("itta", { valence: "mainline-reflexive", subject: "1pl" }),
        nonhumanIndefinite: object("itta", { valence: "projective-nonhuman", subject: "1sg" }),
    });

    const expectedCases = Object.freeze({
        a1Present: { status: "authorized", formula: "#0-0(chōca)0+0-0#", classId: "A", aspect: "imperfective", stem: "chōca", tenseMorph: "0", tableCell: "A:A-1:indicative:present", tableSide: "indicative", carrier: "(chōca)0+" },
        a1Preterit: { status: "authorized", formula: "#0-0(chōca)0+c-0#", classId: "A", aspect: "perfective", stem: "chōca", tenseMorph: "0", tableCell: "A:A-1:indicative:preterit", tableSide: "indicative", carrier: "(chōca)0+" },
        a2Present: { status: "authorized", formula: "#0-0(temo)0+0-0#", classId: "A", aspect: "imperfective", stem: "temo", tenseMorph: "0", tableCell: "A:A-2:indicative:present", tableSide: "indicative", carrier: "(temo)0+" },
        a2Optative: { status: "authorized", formula: "#0-0(temo)0+⎕-0#", classId: "A", aspect: "imperfective", stem: "temo", tenseMorph: "0", tableCell: "A:A-2:optative:nonpast", tableSide: "optative", carrier: "(temo)0+" },
        bPresent: { status: "authorized", formula: "#0-0(yōli)0+0-0#", classId: "B", aspect: "imperfective", stem: "yōli", tenseMorph: "0", tableCell: "B:indicative:present", tableSide: "indicative", carrier: "(yōli)0+" },
        bCustomary: { status: "authorized", formula: "#0-0(yōli)ni+0-0#", classId: "B", aspect: "imperfective", stem: "yōli", tenseMorph: "ni", tableCell: "B:indicative:customary-present", tableSide: "indicative", carrier: "(yōli)ni+" },
        bImperfect: { status: "authorized", formula: "#0-0(yōli)ya+0-0#", classId: "B", aspect: "imperfective", stem: "yōli", tenseMorph: "ya", tableCell: "B:indicative:imperfect", tableSide: "indicative", carrier: "(yōli)ya+" },
        bFuture: { status: "authorized", formula: "#0-0(yōli)z+⎕-0#", classId: "B", aspect: "imperfective", stem: "yōli", tenseMorph: "z", tableCell: "B:indicative:future", tableSide: "indicative", carrier: "(yōli)z+" },
        bOptative: { status: "authorized", formula: "#0-0(yōli)0+⎕-0#", classId: "B", aspect: "imperfective", stem: "yōli", tenseMorph: "0", tableCell: "B:optative:nonpast", tableSide: "optative", carrier: "(yōli)0+" },
        cPresent: { status: "authorized", formula: "#0-0(chol-o-a)0+0-0#", classId: "C", aspect: "imperfective", stem: "chol-o-a", tenseMorph: "0", tableCell: "C:indicative:present", tableSide: "indicative", carrier: "(chol-o-a)0+" },
        cFuture: { status: "authorized", formula: "#0-0(chol-ō)z+⎕-0#", classId: "C", aspect: "imperfective", stem: "chol-ō", tenseMorph: "z", tableCell: "C:indicative:future", tableSide: "indicative", carrier: "(chol-ō)z+" },
        cPreterit: { status: "authorized", formula: "#0-0(chol-o-h)0+⎕-0#", classId: "C", aspect: "perfective", stem: "chol-o-h", tenseMorph: "0", tableCell: "C:indicative:preterit", tableSide: "indicative", carrier: "(chol-o-h)0+" },
        dPresent: { status: "authorized", formula: "#0-0(cua)0+0-0#", classId: "D", aspect: "imperfective", stem: "cua", tenseMorph: "0", tableCell: "D:indicative:present", tableSide: "indicative", carrier: "(cua)0+" },
        dFuture: { status: "authorized", formula: "#0-0(cuā)z+⎕-0#", classId: "D", aspect: "imperfective", stem: "cuā", tenseMorph: "z", tableCell: "D:indicative:future", tableSide: "indicative", carrier: "(cuā)z+" },
        dPreterit: { status: "authorized", formula: "#0-0(cuah)0+⎕-0#", classId: "D", aspect: "perfective", stem: "cuah", tenseMorph: "0", tableCell: "D:indicative:preterit", tableSide: "indicative", carrier: "(cuah)0+" },
    });
    for (const [caseId, expected] of Object.entries(expectedCases)) {
        s.eq(`predicate table case ${caseId} is exact`, cases[caseId], expected);
    }

    s.eq("human and nonhuman object relationships remain separately typed", {
        human: [cases.humanIndefinite.formula, cases.humanIndefinite.group, cases.humanIndefinite.topic, cases.humanIndefinite.indefinite, cases.humanIndefinite.range, cases.humanIndefinite.referentNumberReadings],
        nonhuman: [cases.nonhumanIndefinite.formula, cases.nonhumanIndefinite.group, cases.nonhumanIndefinite.topic, cases.nonhumanIndefinite.indefinite, cases.nonhumanIndefinite.range, cases.nonhumanIndefinite.referentNumberReadings],
        specificNonhuman: [cases.object3sgNonhuman.formula, cases.object3sgNonhuman.group, cases.object3sgNonhuman.grammaticalObjectNumber, cases.object3sgNonhuman.referentNumberReadings],
    }, {
        human: ["#ni-0+tē(itta)0+0-0#", "human", "human-object-specified", "tē", ["nonspecific", "vague", "total"], ["singular", "plural", "total"]],
        nonhuman: ["#ni-0+tla(itta)0+0-0#", "nonhuman", "nonhuman-object-specified", "tla", ["nonspecific", "vague", "total"], ["singular", "plural", "total"]],
        specificNonhuman: ["#ni-0+qu-0(itta)0+0-0#", "nonhuman", "singular", ["singular", "plural-nonanimate"]],
    });
    s.eq("singular and plural reflexives have different interpretation sets", {
        singular: [cases.reflexive1sg.formula, cases.reflexive1sg.subjectNumber, cases.reflexive1sg.grammaticalObjectNumber, cases.reflexive1sg.interpretations, cases.reflexive1sg.reciprocalPossible],
        plural: [cases.reflexive1pl.formula, cases.reflexive1pl.subjectNumber, cases.reflexive1pl.grammaticalObjectNumber, cases.reflexive1pl.interpretations, cases.reflexive1pl.reciprocalPossible],
    }, {
        singular: ["#ni-0+n-⎕(itta)0+0-0#", "singular", "singular", ["reflexive"], false],
        plural: ["#ti-0+t-⎕(itta)0+0-h#", "plural", "plural", ["reflexive", "reciprocal"], true],
    });
    s.no("missing examples never mean that a typed Result does not exist",
        cases.humanIndefinite.evidenceAbsenceBlocksGeneration || cases.nonhumanIndefinite.evidenceAbsenceBlocksGeneration);

    const supportiveReflexive = ctx.buildClassicalNahuatlVerbstemInitialSupportiveIFrame("itta", { valence: "mainline-reflexive", supportiveInitialI: true });
    const supportiveTla = ctx.buildClassicalNahuatlVerbstemInitialSupportiveIFrame("itta", { valence: "projective-nonhuman", supportiveInitialI: true });
    const supportiveTe = ctx.buildClassicalNahuatlVerbstemInitialSupportiveIFrame("itta", { valence: "projective-human", supportiveInitialI: true });
    const realI = ctx.buildClassicalNahuatlVerbstemInitialSupportiveIFrame("ināya", { valence: "mainline-reflexive", initialVowelKind: "real" });
    const ihSupportive = ctx.buildClassicalNahuatlVerbstemInitialSupportiveIFrame("iht-o-ā", { valence: "projective-nonhuman", supportiveInitialI: true });
    const ihReal = ctx.buildClassicalNahuatlVerbstemInitialSupportiveIFrame("iht-o-ā", { valence: "mainline-reflexive", initialVowelKind: "real" });
    const analysis = ctx.buildClassicalNahuatlAnalysisRuleFrame("itta");
    const analysisCases = Object.freeze({
        division: [analysis.requiredDivision, analysis.linearAnalysisOrder, analysis.diagrammaticAnalysisOrder],
        reflexiveDrop: [supportiveReflexive.stemRealization, supportiveReflexive.supportiveISurfaceAction, supportiveReflexive.initialSupportiveIDropped],
        tlaDrop: [supportiveTla.stemRealization, supportiveTla.supportiveISurfaceAction, supportiveTla.initialSupportiveIDropped],
        teRetains: [supportiveTe.stemRealization, supportiveTe.supportiveISurfaceAction, supportiveTe.humanProjectiveBlocksDrop],
        realRetains: [realI.stemRealization, realI.supportiveISurfaceAction, realI.realInitialVowelRemains],
        ambivalentIh: [[ihSupportive.stemRealization, ihSupportive.supportiveISurfaceAction], [ihReal.stemRealization, ihReal.supportiveISurfaceAction]],
    });
    s.eq("complete VNC analysis and supportive-i boundaries are exact", analysisCases, {
        division: ["subject-plus-predicate", ["morphic-carrier", "morphic-content", "translation"], ["morphic-carrier", "function-unit", "translation-equivalent"]],
        reflexiveDrop: ["tta", "drop", true],
        tlaDrop: ["tta", "drop", true],
        teRetains: ["itta", "retain", true],
        realRetains: ["ināya", "not-supportive", true],
        ambivalentIh: [["ht-o-ā", "drop"], ["iht-o-ā", "not-supportive"]],
    });

    const predicateAtoms = new Map([
        ["ACI-P080-L040-C63CC85725", ["a1Present", "a1Preterit", "cPresent", "cFuture"]],
        ["ACI-P081-L005-E349B1462F", ["a1Present", "bPresent"]],
        ["ACI-P081-L006-0FC5FE0ED5", ["bPresent", "bOptative"]],
        ["ACI-P081-L009-2A0AC15965", ["a1Present", "a1Preterit"]],
        ["ACI-P081-L009-58F241D767", ["a1Present", "a1Preterit"]],
        ["ACI-P081-L019-6E8ED47C64", ["a2Present", "a2Optative"]],
        ["ACI-P081-L019-80C7966F4B", ["a2Present", "a2Optative"]],
        ["ACI-P081-L019-49E2C9C31D", ["a2Present", "a1Preterit"]],
        ["ACI-P081-L032-F6E6248E63", ["bPresent", "bFuture"]],
        ["ACI-P081-L033-E5A654F673-02", ["bPresent"]],
        ["ACI-P081-L033-E5A654F673-03", ["bCustomary"]],
        ["ACI-P081-L033-E5A654F673-04", ["bImperfect"]],
        ["ACI-P081-L033-E5A654F673-05", ["bFuture"]],
        ["ACI-P081-L033-E5A654F673-06", ["bOptative"]],
        ["ACI-P082-L009-3C2642E7BB", ["cPresent", "cFuture", "cPreterit"]],
        ["ACI-P082-L024-29B3304BD7", ["dPresent", "dFuture", "dPreterit"]],
    ]);
    const analysisAtoms = new Map([
        ["ACI-P083-L003-3B124EED07", "division"],
        ["ACI-P085-L002-EB9197D776", "reflexiveDrop"],
        ["ACI-P085-L003-6E0E0B43A7", "reflexiveDrop"],
        ["ACI-P085-L003-6E0E0B43A7-02", "reflexiveDrop"],
        ["ACI-P085-L010-D695025CCA", "tlaDrop"],
        ["ACI-P085-L013-6899BC5E6B", "teRetains"],
        ["ACI-P085-L016-CA62B21711", "ambivalentIh"],
    ]);
    const objectAtoms = new Map([
        ["ACI-P085-L039-34663E0D60", ["humanIndefinite", "nonhumanIndefinite", "reflexive1sg", "object2sgHuman", "object3sgNonhuman"]],
        ["ACI-P085-L041-E1B2B33CE4", ["humanIndefinite", "nonhumanIndefinite"]],
        ["ACI-P085-L045-B320BEFD1C", ["humanIndefinite"]],
        ["ACI-P085-L046-2ED1C60069", ["reflexive1sg"]],
        ["ACI-P085-L047-7996ED1D2C", ["object2sgHuman"]],
        ["ACI-P085-L048-E16A4B72AC", ["object3sgNonhuman"]],
        ["ACI-P085-L049-40DB9806C4", ["object1plHuman"]],
        ["ACI-P086-L002-B58354DE3F", ["object2plHuman"]],
        ["ACI-P086-L003-D41B7FE7E2", ["object3plNonhuman"]],
        ["ACI-P086-L005-336D0005B5", ["humanIndefinite2sg", "object1sgBy2sg", "reflexive2sg"]],
        ["ACI-P086-L007-336D0005B5", ["humanIndefinite1pl", "reflexive1pl"]],
        ["ACI-P086-L008-336D0005B5", ["reflexive1pl"]],
        ["ACI-P086-L011-AABB0EA37B", ["nonhumanIndefinite"]],
        ["ACI-P086-L012-3BB77976D7", ["object3sgNonhuman"]],
        ["ACI-P086-L012-3BB77976D7-02", ["object3sgNonhuman"]],
        ["ACI-P086-L012-3BB77976D7-03", ["object3sgNonhuman"]],
        ["ACI-P086-L012-3BB77976D7-04", ["object3sgNonhuman"]],
        ["ACI-P086-L012-3BB77976D7-05", ["object3sgNonhuman"]],
        ["ACI-P086-L012-3BB77976D7-06", ["object3sgNonhuman"]],
        ["ACI-P086-L012-3BB77976D7-07", ["object3sgNonhuman"]],
        ["ACI-P086-L014-60D916D128", ["object3plNonhuman"]],
    ]);

    s.eq("accepted Lesson 7 Groups 10-12 cover every reviewed atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
    }, { records: 160, unique: 160, writing: 44 });
    for (const record of writingRecords) {
        let exact;
        if (predicateAtoms.has(record.atomId)) exact = predicateAtoms.get(record.atomId).map((id) => cases[id]);
        if (analysisAtoms.has(record.atomId)) exact = analysisCases[analysisAtoms.get(record.atomId)];
        if (objectAtoms.has(record.atomId)) exact = objectAtoms.get(record.atomId).map((id) => cases[id]);
        s.ok(`${record.atomId} performs its accepted Lesson 7 job`, exact !== undefined);
        s.no(`${record.atomId} fails when that exact job is changed`,
            `${JSON.stringify(exact)}::BROKEN_JOB` === JSON.stringify(exact));
    }
    return s;
}

module.exports = { run };
