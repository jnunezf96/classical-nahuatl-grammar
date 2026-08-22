"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson29-purposive-foundation-and-future-embed",
    "lesson29-internal-directional-matrix",
    "lesson29-purposeful-motion-base-and-series-system",
];

function request(overrides = {}) {
    return {
        sourceStem: "chōca", sourceValence: "intransitive", verbClass: "A",
        subject: "3sg", mood: "indicative", tense: "present",
        derivationType: "direct", voice: "active", lateOperation: "purposive",
        lateVariant: "directional", purposiveSeries: "outbound-nonpast-indicative",
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson29_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson29-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = overrides => ctx.evaluateClassicalNahuatlLateVncDerivation(request(overrides));
    const normal = evaluate();
    const rare = evaluate({ purposiveSoundedFutureMorph: true });
    const inbound = evaluate({ subject: "3pl", purposiveSeries: "inbound-future-indicative" });
    const past = evaluate({ purposiveSeries: "outbound-past-indicative" });
    const arbitrary = evaluate({ sourceStem: "xochi-invented", verbClass: "C" });
    const blocked = evaluate({ purposiveSeries: "invented-series" });
    const poisoned = evaluate({ purposiveSeries: "inbound-future-indicative", purposiveDirection: "outbound" });
    const facts = frame => frame.operationFrame?.operationFacts || {};
    const continuation = ctx.getClassicalNahuatlVncContinuationSourceConstituents(normal);
    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        inbound.formulaRealization, inbound.finalTypedVncSlotFrame, inbound,
    ).filter(cue => GROUPS.includes(cue.role));

    s.eq("accepted Lesson 29 Groups 1-3 run through the canonical Purposive path", {
        normal: [normal.authorizationStatus, normal.operationFrame?.targetStem,
            facts(normal).compoundType, facts(normal).linkage, facts(normal).embedTense,
            facts(normal).embedFutureMorph, facts(normal).movementPrecedesPurposeAction],
        rare: [rare.authorizationStatus, facts(rare).embedFutureMorph,
            facts(rare).soundedFutureMorphSelected, facts(rare).soundedFutureMorphMarkedRare,
            facts(rare).soundedFutureMorphStyleStatus],
        inbound: [facts(inbound).direction, facts(inbound).matrixValence,
            facts(inbound).matrixDirectionalMorpheme, facts(inbound).matrixDirectionalSpellings,
            facts(inbound).matrixDirectionalSpellingDerived,
            facts(inbound).directionalChoiceComesFromSeries,
            facts(inbound).duplicateDirectionControlRequired,
            facts(inbound).futureMorphPrecedesInternalDirectional],
        bases: [facts(normal).matrixBaseStem, facts(normal).imperfectiveNumberPartner,
            facts(inbound).matrixBaseStem, facts(inbound).imperfectiveNumberPartner,
            facts(past).matrixBaseStem, facts(past).perfectiveBaseDistinctFromOnO,
            facts(normal).finiteTenseMorph, facts(normal).numberMorph,
            facts(inbound).numberMorph],
        openness: [arbitrary.authorizationStatus, facts(arbitrary).noStemWhitelist,
            blocked.authorizationStatus, blocked.blockReason,
            facts(poisoned).direction, facts(poisoned).callerPurposiveDirectionAuthority],
        passage: [continuation?.kind, continuation?.sourceStem,
            continuation?.verbClass, continuation?.sourceValence,
            continuation?.sourceSubject, continuation?.projectionRole,
            continuation?.grammarAuthority,
            continuation?.callerSuppliedAuthorityAccepted],
    }, {
        normal: ["authorized", "chōca-⎕-t-ī-uh", "linked", "connectiveless", "future", "⎕", true],
        rare: ["authorized", "z", true, true, "rare-nonpreferred-textual-variant"],
        inbound: ["inbound", "intransitive", "/k/", ["c", "qu"], true, true, false, true],
        bases: ["i", "uh", "i", "hui", "o", true, "0", "0", "h"],
        openness: ["authorized", true, "blocked", "licensed-purposive-series-required", "inbound", false],
        passage: ["classical-nahuatl-vnc-result-source-constituent-projection",
            "chōca-⎕-t-ī-uh", "A", "intransitive", "3sg",
            "read-only-source-constituents", false, false],
    });
    s.eq("one series control carries direction, mood, and tense without spelling controls", {
        seriesCount: ctx.getClassicalNahuatlVncLateOperationUiControlOptions(
            "classical-rule-logic-purposive-series").length,
        rareStates: Object.keys(ctx.CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_SWITCH_CONTRACTS[
            "classical-rule-logic-purposive-sounded-future"] || {}).sort(),
        directionControl: ctx.getClassicalNahuatlVncLateOperationUiControlOptions(
            "classical-rule-logic-purposive-direction").length,
        licensed: facts(normal).licensedPurposiveSeries.length,
        singleChoice: facts(normal).seriesIsSingleUserChoice,
    }, { seriesCount: 6, rareStates: ["checked", "controlId", "unchecked"], directionControl: 0,
        licensed: 6, singleChoice: true });
    s.eq("all 47 accepted atoms have one exact cue route and every writing atom mutates", {
        records: records.length,
        writing: writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = records.filter(record => record.reviewGroupId === group).map(record => record.atomId);
            return cues.some(cue => cue.role === group && ids.every(id => cue.atomIds?.includes(id)));
        }),
        mutations: [rare.operationFrame?.targetStem !== normal.operationFrame?.targetStem,
            inbound.operationFrame?.targetStem !== normal.operationFrame?.targetStem,
            past.operationFrame?.targetStem !== normal.operationFrame?.targetStem].every(Boolean),
    }, { records: 47, writing: 32, groups: 3, cueGroups: 3, covered: true, mutations: true });
    const passageUsed = ctx.useClassicalWholeCanvasResultAsNextSource({
        kind: "lesson29-focused-surface-witness",
        authorizationStatus: "authorized",
        basalUnit: "vnc",
        state: {
            vncApplicationFrame: null,
            vncOrderedVoiceApplicationFrame: null,
            vncLateOperationClosureFrame: normal,
        },
    });
    s.eq("Continue this Result passes the exact Purposive Result as a read-only typed Source", {
        used: passageUsed,
        stem: ctx.document.getElementById("classical-source-whole")?.value,
        verbClass: [
            ctx.document.getElementById("classical-rule-logic-class")?.value,
            ctx.document.getElementById("classical-rule-logic-class")?.disabled,
        ],
        valence: [
            ctx.document.getElementById("classical-rule-logic-valence")?.value,
            ctx.document.getElementById("classical-rule-logic-valence")?.disabled,
        ],
        sourceSubject: [
            ctx.document.getElementById("classical-rule-logic-subject")?.value,
            ctx.document.getElementById("classical-rule-logic-subject")?.disabled,
        ],
        oldStringAuthority: [
            ctx.document.getElementById("classical-source-whole")?.dataset
                ?.classicalNextSourceFromAuthorizedResult || "",
            ctx.document.getElementById("classical-source-whole")?.dataset
                ?.classicalNextSourceAuthority || "",
        ],
    }, {
        used: true,
        stem: "chōca-⎕-t-ī-uh",
        verbClass: ["A", true],
        valence: ["intransitive", true],
        sourceSubject: ["3sg", true],
        oldStringAuthority: ["", ""],
    });
    for (const record of writing) {
        const canonicalObservation = record.reviewGroupId === GROUPS[0]
            ? [normal.operationFrame?.targetStem, facts(normal).embedFutureMorph,
                facts(normal).compoundType, facts(normal).linkage]
            : record.reviewGroupId === GROUPS[1]
                ? [facts(inbound).direction, facts(inbound).matrixDirectionalMorpheme,
                    facts(inbound).matrixDirectionalSpellings,
                    facts(inbound).futureMorphPrecedesInternalDirectional]
                : [facts(normal).series, facts(normal).matrixBaseStem,
                    facts(normal).imperfectiveNumberPartner, facts(normal).finiteTenseMorph,
                    facts(normal).numberMorph];
        const canonicalExpected = record.reviewGroupId === GROUPS[0]
            ? ["chōca-⎕-t-ī-uh", "⎕", "linked", "connectiveless"]
            : record.reviewGroupId === GROUPS[1]
                ? ["inbound", "/k/", ["c", "qu"], true]
                : ["outbound-nonpast-indicative", "i", "uh", "0", "0"];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            canonicalObservation, canonicalExpected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? rare.operationFrame?.targetStem !== normal.operationFrame?.targetStem
                : record.reviewGroupId === GROUPS[1]
                    ? facts(inbound).direction !== facts(normal).direction
                    : past.operationFrame?.targetStem !== normal.operationFrame?.targetStem);
    }
    return s;
}

module.exports = { run };
