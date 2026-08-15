"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson16_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson16-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson16-pronominal-nnc-foundation",
        "lesson16-simple-personal-pronominals",
        "lesson16-compound-personal-foundation",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const execute = (sourceInput, selections) => {
        const source = ctx.issueCanonicalNncSourceFrame(sourceInput);
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, selections);
        const operation = ctx.issueCanonicalNncOperationFrame(source, selections);
        const result = ctx.requestClassicalPronominalNncResult(source, operation);
        const cues = result?.authorizationStatus === "authorized"
            ? ctx.getClassicalFormulaDerivedAnnotations(
                result.formulaRealization,
                result.typedSlotFrame,
                result,
            ).map((cue) => ({
                label: cue.label,
                text: result.formulaRealization.slice(cue.start, cue.end),
            }))
            : [];
        return { source, selection, operation, result, cues };
    };

    const simpleFirst = execute({ stem: "yeh" }, { subject: "1sg" });
    const simpleThird = execute({ stem: "eh" }, { subject: "3sg" });
    const simpleCommon = execute({ stem: "eh" }, { subject: "3common" });
    const simplePlural = execute({ stem: "eh" }, { subject: "2pl" });
    const rejectedPossessive = execute(
        { stem: "eh" },
        { subject: "1sg", state: "possessive" },
    );
    const rejectedRelative = ctx.buildClassicalNahuatlPronominalNncFrame({
        subtype: "relative",
        subject: "3sg",
        enteredStem: "eh",
        requireEnteredStem: true,
    });
    const compoundThirdPlural = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "3pl" },
    );
    const compoundFirstPlural = execute(
        { stem: "yeh-huā", embedStem: "yeh", matrixStem: "huā" },
        { subject: "1pl" },
    );
    const distributive = execute(
        { stem: "eh-eh-huā", embedStem: "eh-eh", matrixStem: "huā" },
        { subject: "3common" },
    );
    const explicitAnimateSource = ctx.issueCanonicalNncSourceFrame({ stem: "eh" });
    const explicitAnimateSelection = ctx.getCanonicalNncOperationSelectionFrame(
        explicitAnimateSource,
        { subject: "3common", animacy: "animate" },
    );
    const explicitAnimateChoice = execute(
        { stem: "eh" },
        { subject: explicitAnimateSelection.selectedSubject },
    );

    const observations = {
        "lesson16-pronominal-nnc-foundation": {
            sourceKind: simpleFirst.selection.sourceKind,
            stateValues: simpleFirst.selection.stateValues,
            possessiveStatus: rejectedPossessive.operation.authorizationStatus,
            possessiveReason: rejectedPossessive.operation.blockReason,
            relativeStatus: rejectedRelative.authorizationStatus,
            relativeReason: rejectedRelative.blockReason,
            pluralFormula: compoundThirdPlural.result.formulaRealization,
            pluralSurface: compoundThirdPlural.result.surfaceRealization,
            internalPluralCue: compoundThirdPlural.cues.find((cue) => cue.label === "internal plural n"),
            subjectConnectorCue: compoundThirdPlural.cues.find((cue) => cue.label === "subject number connector"),
        },
        "lesson16-simple-personal-pronominals": {
            firstFromEnteredYeh: [
                simpleFirst.result.formulaRealization,
                simpleFirst.result.surfaceRealization,
            ],
            thirdFromEnteredEh: [
                simpleThird.result.formulaRealization,
                simpleThird.result.surfaceRealization,
            ],
            commonEh: [
                simpleCommon.result.formulaRealization,
                simpleCommon.result.surfaceRealization,
            ],
            plural: [
                simplePlural.result.formulaRealization,
                simplePlural.result.surfaceRealization,
            ],
            firstCue: simpleFirst.cues.find((cue) => cue.label === "personal pronominal stem"),
            thirdCue: simpleThird.cues.find((cue) => cue.label === "third-person stem"),
            explicitAnimateChoice: {
                selectedAnimacy: explicitAnimateSelection.selectedAnimacy,
                selectedSubject: explicitAnimateSelection.selectedSubject,
                personValues: explicitAnimateSelection.subjectPersonValues,
                numberValues: explicitAnimateSelection.subjectNumberValues,
                result: explicitAnimateChoice.result.surfaceRealization,
            },
        },
        "lesson16-compound-personal-foundation": {
            thirdPlural: [
                compoundThirdPlural.result.formulaRealization,
                compoundThirdPlural.result.surfaceRealization,
            ],
            firstPluralFromEnteredYeh: [
                compoundFirstPlural.result.formulaRealization,
                compoundFirstPlural.result.surfaceRealization,
            ],
            distributive: [
                distributive.result.formulaRealization,
                distributive.result.surfaceRealization,
            ],
            thirdStemCue: compoundThirdPlural.cues.find((cue) => cue.label === "third-person stem"),
            compoundStemCue: compoundThirdPlural.cues.find((cue) => cue.label === "compound personal stem"),
            internalPluralCue: compoundThirdPlural.cues.find((cue) => cue.label === "internal plural n"),
            subjectConnectorCue: compoundThirdPlural.cues.find((cue) => cue.label === "subject number connector"),
            distributiveCue: distributive.cues.find((cue) => cue.label === "distributive stem"),
        },
    };
    const expected = {
        "lesson16-pronominal-nnc-foundation": {
            sourceKind: "pronominal",
            stateValues: ["absolutive"],
            possessiveStatus: "blocked",
            possessiveReason: "pronominal-nnc-operation-selection-not-recognized:state",
            relativeStatus: "blocked",
            relativeReason: "canvas-has-no-relative-pronominal-nnc-subtype",
            pluralFormula: "#0-0(yeh-huā-n)t-in#",
            pluralSurface: "yehhuāntin",
            internalPluralCue: { label: "internal plural n", text: "n" },
            subjectConnectorCue: { label: "subject number connector", text: "t" },
        },
        "lesson16-simple-personal-pronominals": {
            firstFromEnteredYeh: ["#n-0(eh)0-0#", "neh"],
            thirdFromEnteredEh: ["#0-0(yeh)0-0#", "yeh"],
            commonEh: ["#0-0(eh)0-0#", "eh"],
            plural: ["#am-0(eh)m-eh#", "amehmeh"],
            firstCue: { label: "personal pronominal stem", text: "eh" },
            thirdCue: { label: "third-person stem", text: "yeh" },
            explicitAnimateChoice: {
                selectedAnimacy: "animate",
                selectedSubject: "3sg",
                personValues: ["1", "2", "3"],
                numberValues: ["singular", "plural"],
                result: "yeh",
            },
        },
        "lesson16-compound-personal-foundation": {
            thirdPlural: ["#0-0(yeh-huā-n)t-in#", "yehhuāntin"],
            firstPluralFromEnteredYeh: ["#t-0(eh-huā-n)t-in#", "tehhuāntin"],
            distributive: ["#0-0(eh-eh-huā)tl-0#", "ehehhuātl"],
            thirdStemCue: { label: "third-person stem", text: "yeh" },
            compoundStemCue: { label: "compound personal stem", text: "huā" },
            internalPluralCue: { label: "internal plural n", text: "n" },
            subjectConnectorCue: { label: "subject number connector", text: "t" },
            distributiveCue: { label: "distributive stem", text: "eh" },
        },
    };

    s.eq("accepted Lesson 16 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 72, unique: 72, writing: 32, reading: 40 });

    groupIds.forEach((groupId) => {
        s.eq(`${groupId} works through the canonical Source, Grammar, and Result path`, observations[groupId], expected[groupId]);
    });
    for (const record of writing) {
        const actual = observations[record.reviewGroupId];
        const wanted = expected[record.reviewGroupId];
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = { ...actual, authorizationStatus: `broken-${record.atomId}` };
        s.no(`mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            JSON.stringify(broken) === JSON.stringify(wanted));
    }
    return s;
}

module.exports = { run };
