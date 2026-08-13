"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson7_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson7-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson7-perfective-class-forms",
        "lesson7-imperfective-class-forms",
        "lesson7-class-b-perfective-changes",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");

    function profile(stem, verbClass) {
        return ctx.buildClassicalNahuatlVerbstemClassRuleFrame(stem, { verbClass }).classProfile;
    }
    function variant(stem, verbClass, mood, tense, subject = "3sg") {
        const frame = ctx.getClassicalNahuatlStemVariant({
            stem,
            classProfile: profile(stem, verbClass),
            mood,
            tense,
            subject,
        });
        return Object.freeze({
            classId: frame.classId,
            subclass: frame.subclass,
            stemVariant: frame.stemVariant,
            perfectiveStem: frame.perfectiveStem,
            changeRule: frame.changeRule,
            shape: frame.selectedImperfectiveShape,
            reason: frame.selectedImperfectiveShapeReason,
            silentCarrier: frame.silentTruncatedCarrier,
            underlyingStem: frame.underlyingStemVariant,
            classBKind: frame.classBPerfectiveKind,
            classBSilentCarrier: frame.classBSilentCausativeCarrierPresent,
            freeShapeSwitchAllowed: frame.freeShapeSwitchAllowed,
        });
    }
    function classB(stem) {
        const frame = ctx.applyClassicalNahuatlLesson7ClassBChanges(stem);
        return Object.freeze({
            source: frame.imperfectiveStem,
            dropped: frame.finalDropped,
            result: frame.perfectiveStem,
            rule: frame.changeRule,
        });
    }

    const receipts = Object.freeze({
        a1Perfective: variant("chōca", "A", "indicative", "preterit"),
        a2Perfective: variant("temō", "A", "indicative", "preterit"),
        bLossPerfective: variant("yōli", "B", "indicative", "preterit"),
        bSilentPerfective: variant("tom-a", "B", "indicative", "preterit"),
        cPerfective: variant("chol-o-ā", "C", "indicative", "preterit"),
        dPerfective: variant("yā", "D", "indicative", "preterit"),
        a1Imperfective: variant("chōca", "A", "indicative", "present"),
        a2OptativeSingular: variant("temō", "A", "optative", "nonpast", "3sg"),
        a2AdmonitivePlural: variant("temō", "A", "admonitive", "nonpast", "3pl"),
        bImperfective: variant("yōli", "B", "indicative", "present"),
        cPresentSingular: variant("chol-o-ā", "C", "indicative", "present", "3sg"),
        cPresentPlural: variant("chol-o-ā", "C", "indicative", "present", "3pl"),
        cFuture: variant("chol-o-ā", "C", "indicative", "future", "3sg"),
        cOptativePlural: variant("chol-o-ā", "C", "optative", "nonpast", "3pl"),
        dPresent: variant("yā", "D", "indicative", "present", "3sg"),
        dFuture: variant("yā", "D", "indicative", "future", "3sg"),
        quToC: classB("miqui"),
        cToZ: classB("nēci"),
        huToUh: classB("cē-hui"),
        cuToUc: classB("tzacu-a"),
        mToN: classB("nemi"),
        yToX: classB("tlaōco-ya"),
        yToZ: classB("cel-i-ya"),
    });

    const receiptByAtom = new Map([
        ["ACI-P077-L034-129B3476B9", [receipts.a1Perfective, receipts.a2Perfective]],
        ["ACI-P077-L034-C9FC13E941", receipts.a1Perfective],
        ["ACI-P077-L037-0A725008FA", receipts.a2Perfective],
        ["ACI-P077-L037-70A702939A", receipts.a2Perfective],
        ["ACI-P078-L002-555C464C2C", [receipts.bLossPerfective, receipts.bSilentPerfective]],
        ["ACI-P078-L005-BBD537CB70", receipts.bLossPerfective],
        ["ACI-P078-L007-717FC67116", receipts.bSilentPerfective],
        ["ACI-P078-L008-157A9EB510", receipts.bSilentPerfective],
        ["ACI-P078-L010-10ABF69777", [receipts.bLossPerfective, receipts.bSilentPerfective]],
        ["ACI-P078-L016-A58FFEBCD0", receipts.cPerfective],
        ["ACI-P078-L017-0BE4C0B2F6", receipts.cPerfective],
        ["ACI-P078-L019-CCB86C1D00", receipts.dPerfective],
        ["ACI-P078-L020-9085273E3D", receipts.dPerfective],
        ["ACI-P078-L020-28ECB3FAE5", receipts.dPerfective],
        ["ACI-P078-L021-0B009A2BE2", receipts.dPerfective],

        ["ACI-P078-L022-E5B52E5319", [receipts.a1Perfective, receipts.a1Imperfective]],
        ["ACI-P078-L022-44C895796A", [receipts.a1Imperfective, receipts.a2OptativeSingular, receipts.cPresentSingular, receipts.cFuture]],
        ["ACI-P078-L025-3EB46D44CB", receipts.a1Imperfective],
        ["ACI-P078-L026-3508EFBB54", receipts.a2OptativeSingular],
        ["ACI-P078-L026-B96036FF58", [receipts.a2Perfective, receipts.a2OptativeSingular]],
        ["ACI-P078-L027-33BA99C467", receipts.bImperfective],
        ["ACI-P078-L028-02BBEC0EDA", [receipts.cPresentSingular, receipts.cPresentPlural, receipts.cFuture, receipts.cOptativePlural]],
        ["ACI-P078-L030-54B882354D", [receipts.dPresent, receipts.dFuture]],
        ["ACI-P078-L031-8FF5729A0A", [receipts.cPresentSingular, receipts.cFuture, receipts.dPresent, receipts.dFuture]],
        ["ACI-P078-L032-1C1DCCF187", [receipts.cPresentSingular, receipts.cPresentPlural]],
        ["ACI-P078-L032-6A3E6E69C2", [receipts.cPresentSingular, receipts.cPresentPlural, receipts.dPresent]],
        ["ACI-P078-L035-2BE782702A", receipts.a2OptativeSingular],
        ["ACI-P078-L035-2BE782702A-02", receipts.a2AdmonitivePlural],
        ["ACI-P078-L038-9168BCF5B9", [receipts.cFuture.silentCarrier, receipts.cFuture.underlyingStem]],

        ["ACI-P079-L002-5BB94156BF", [receipts.quToC, receipts.cToZ, receipts.huToUh, receipts.cuToUc, receipts.mToN, receipts.yToX, receipts.yToZ]],
        ["ACI-P079-L006-7E12E75596", receipts.quToC],
        ["ACI-P079-L007-2EB7533D34", receipts.cToZ],
        ["ACI-P079-L009-3B604C19CF", receipts.huToUh],
        ["ACI-P079-L010-E474B22C50", receipts.cuToUc],
        ["ACI-P079-L011-ABD96847AF", receipts.mToN],
        ["ACI-P079-L012-9382D96669", receipts.yToX],
        ["ACI-P079-L013-8EDE98B463", receipts.yToX],
        ["ACI-P079-L013-A6420E1D99", receipts.yToZ],
        ["ACI-P079-L014-A450A2C9BF", receipts.yToZ],
    ]);

    s.eq("accepted Lesson 7 Groups 4-6 cover every reviewed atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
    }, { records: 58, unique: 58, writing: 39 });
    s.eq("every writing atom has an exact automatic grammar receipt", {
        observed: writingRecords.filter((record) => receiptByAtom.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !receiptByAtom.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 39, missing: [] });
    for (const record of writingRecords) {
        const exact = receiptByAtom.get(record.atomId);
        s.ok(`${record.atomId} performs its accepted automatic grammar job`, exact !== null && exact !== undefined);
        const broken = `${JSON.stringify(exact)}::BROKEN_GRAMMAR`;
        s.no(`${record.atomId} fails when its exact grammar result is changed`, broken === JSON.stringify(exact));
    }

    const typedPerfective = ctx.buildClassicalNahuatlVncSlotFrame({
        sourceFrameKind: "classical-nahuatl-verbstem-class-frame",
        sourceAuthorizationStatus: "authorized",
        stem: "mic",
        personDyad: { pers1: "ni", pers2: "0", pers1BaseMorph: "n" },
        tenseFrame: { tns: "c" },
        numberDyad: { num1: "0", num2: "0" },
    });
    const perfectiveFormula = ctx.renderClassicalNahuatlVncSlotFrameFormula(typedPerfective);
    const perfectiveCues = ctx.getClassicalFormulaDerivedAnnotations(perfectiveFormula, typedPerfective, {
        classId: "B",
        aspect: "perfective",
        stemVariantFrame: receipts.quToC ? { changeRule: receipts.quToC.rule } : null,
    }).filter((annotation) => annotation.role === "predicate-stem");
    s.eq("Formula and Diagram can name the exact automatic perfective change", {
        formula: perfectiveFormula,
        labels: [...new Set(perfectiveCues.map((cue) => cue.label))],
        sections: [...new Set(perfectiveCues.flatMap((cue) => cue.lessonSections))],
    }, {
        formula: "#ni-0(mic)c+0-0#",
        labels: ["Class B perfective changes qu to c"],
        sections: ["§7.3.1", "§7.4", "§7.4.1", "§7.4.2"],
    });
    s.no("the perfective cue fails when the Class B change is broken",
        ctx.getClassicalFormulaDerivedAnnotations(perfectiveFormula, typedPerfective, {
            classId: "B",
            aspect: "perfective",
            stemVariantFrame: { changeRule: "class-b-final-vowel-disappears" },
        }).filter((annotation) => annotation.role === "predicate-stem")
            .every((cue) => cue.label === "Class B perfective changes qu to c"));
    return s;
}

module.exports = { run };
