"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson29-inbound-nonfuture",
    "lesson29-inbound-future",
    "lesson29-inbound-optative",
];

function request(overrides = {}) {
    return {
        sourceStem: "chōca", sourceValence: "intransitive", verbClass: "A",
        subject: "3sg", mood: "indicative", tense: "present",
        derivationType: "direct", voice: "active", lateOperation: "purposive",
        lateVariant: "directional", purposiveSeries: "inbound-nonfuture-indicative",
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson29_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson29-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = overrides => ctx.evaluateClassicalNahuatlLateVncDerivation(request(overrides));
    const facts = frame => frame.operationFrame?.operationFacts || {};

    const nonfuture = evaluate();
    const nonfuturePlural = evaluate({ subject: "3pl" });
    const nonfutureAntecessive = evaluate({ sentenceAntecessive: true });
    const future = evaluate({ purposiveSeries: "inbound-future-indicative" });
    const futurePlural = evaluate({ subject: "3pl", purposiveSeries: "inbound-future-indicative" });
    const optative = evaluate({ subject: "1sg", purposiveSeries: "inbound-nonpast-optative" });
    const optativeSecond = evaluate({ subject: "2sg", purposiveSeries: "inbound-nonpast-optative" });
    const optativePlural = evaluate({ subject: "1pl", purposiveSeries: "inbound-nonpast-optative" });

    s.eq("inbound nonfuture derives c-o, number, full reading range, and scoped optional antecessive", {
        singular: [nonfuture.authorizationStatus, nonfuture.operationFrame?.targetStem,
            facts(nonfuture).matrixDirectionalMorpheme, facts(nonfuture).licensedReadingRange,
            facts(nonfuture).numberMorph],
        plural: [nonfuturePlural.operationFrame?.targetStem, facts(nonfuturePlural).numberMorph],
        antecessive: [facts(nonfuture).ordinaryAntecessiveAvailable,
            facts(nonfuture).ordinaryAntecessiveSelected,
            facts(nonfutureAntecessive).ordinaryAntecessiveSelected,
            facts(nonfuture).inboundNonfutureAntecessiveScope,
            facts(nonfuture).inboundNonfutureAntecessiveMayAccompanyPresentReading],
        hither: [facts(nonfuture).inboundInternalHitherDirectional,
            facts(nonfuture).inboundInternalHitherDistinctFromExternalHual],
    }, {
        singular: ["authorized", "chōca-⎕-c-o", "/k/",
            ["present", "preterit", "imperfect", "distant-past"], "0"],
        plural: ["chōca-⎕-c-o", "h"],
        antecessive: [true, false, true,
            "past-act-of-purposing-not-intended-action", true],
        hither: ["/k/", true],
    });

    s.eq("inbound future derives the number-conditioned imperfective matrix", {
        singular: [future.authorizationStatus, future.operationFrame?.targetStem,
            facts(future).inboundFutureNumberShape,
            facts(future).inboundFutureNumberShapeDerived,
            facts(future).licensedReadingRange],
        plural: [futurePlural.operationFrame?.targetStem,
            facts(futurePlural).inboundFutureNumberShape,
            facts(futurePlural).numberMorph],
    }, {
        singular: ["authorized", "chōca-⎕-qu-ī-uh", "qu-ī-uh", true, ["future"]],
        plural: ["chōca-⎕-qu-i-hui", "qu-i-hui", "h"],
    });

    s.eq("inbound optative derives qu-i and leaves only contextual reading differences", {
        ordinary: [optative.authorizationStatus, optative.operationFrame?.targetStem,
            facts(optative).licensedReadingRange,
            facts(optative).optativeLetReadingIsPermissive,
            facts(optative).optativeMayExpressSelfEncouragement,
            facts(optative).optativeMayExpressSelfSuggestion],
        second: [optativeSecond.finalTypedVncSlotFrame?.slots?.subject?.pers1,
            facts(optativeSecond).numberMorph],
        plural: [optativePlural.operationFrame?.targetStem, facts(optativePlural).numberMorph],
    }, {
        ordinary: ["authorized", "chōca-⎕-qu-i",
            ["command", "exhortation", "wish", "self-encouragement", "self-suggestion"],
            false, true, true],
        second: ["xi", "0"],
        plural: ["chōca-⎕-qu-i", "h"],
    });

    const hostileSources = [
        ["xōca", "A", "intransitive"],
        ["tzac", "B", "projective-human"],
        ["mīxoa", "C", "intransitive"],
        ["mā", "D", "specific-projective"],
        ["pachi-ā", "C", "intransitive"],
        ["mā-o-ā", "C", "intransitive"],
    ].flatMap(([sourceStem, verbClass, sourceValence]) => [
        "inbound-nonfuture-indicative", "inbound-future-indicative",
        "inbound-nonpast-optative",
    ].map(purposiveSeries => evaluate({
        sourceStem, verbClass, sourceValence, purposiveSeries,
        objectKind: sourceValence === "projective-human" ? "nonspecific-human"
            : sourceValence === "specific-projective" ? "specific-projective" : undefined,
    })));
    s.eq("unlisted typed Source shapes receive the same inbound grammar", {
        count: hostileSources.length,
        authorized: hostileSources.every(frame => frame.authorizationStatus === "authorized"),
        open: hostileSources.every(frame => facts(frame).noStemWhitelist === true),
        directions: [...new Set(hostileSources.map(frame => facts(frame).direction))],
        series: new Set(hostileSources.map(frame => facts(frame).series)).size,
    }, { count: 18, authorized: true, open: true, directions: ["inbound"], series: 3 });

    const cueFrameByGroup = {
        [GROUPS[0]]: nonfuture,
        [GROUPS[1]]: future,
        [GROUPS[2]]: optative,
    };
    for (const group of GROUPS) {
        const frame = cueFrameByGroup[group];
        const ids = records.filter(record => record.reviewGroupId === group)
            .map(record => record.atomId);
        const cues = ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization, frame.finalTypedVncSlotFrame, frame,
        ).filter(cue => cue.role === group);
        s.ok(`${group} has its exact clickable atom cue`,
            cues.some(cue => ids.every(id => cue.atomIds?.includes(id))));
    }

    s.eq("accepted Group 7-9 atoms have exact job counts", {
        records: records.length, writing: writing.length,
        reading: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
    }, { records: 71, writing: 44, reading: 27, groups: 3 });

    for (const record of writing) {
        const group = record.reviewGroupId;
        const observation = group === GROUPS[0]
            ? [nonfuture.operationFrame?.targetStem, facts(nonfuture).licensedReadingRange,
                facts(nonfuture).ordinaryAntecessiveAvailable]
            : group === GROUPS[1]
                ? [future.operationFrame?.targetStem, futurePlural.operationFrame?.targetStem,
                    facts(future).licensedReadingRange]
                : [optative.operationFrame?.targetStem, facts(optative).licensedReadingRange,
                    facts(optative).optativeLetReadingIsPermissive];
        const expected = group === GROUPS[0]
            ? ["chōca-⎕-c-o", ["present", "preterit", "imperfect", "distant-past"], true]
            : group === GROUPS[1]
                ? ["chōca-⎕-qu-ī-uh", "chōca-⎕-qu-i-hui", ["future"]]
                : ["chōca-⎕-qu-i",
                    ["command", "exhortation", "wish", "self-encouragement", "self-suggestion"], false];
        s.eq(`${record.atomId} observes its accepted owner-issued coordinate`, observation, expected);
        s.ok(`mutation:${record.atomId} changes that coordinate`,
            group === GROUPS[0]
                ? facts(nonfutureAntecessive).ordinaryAntecessiveSelected
                    !== facts(nonfuture).ordinaryAntecessiveSelected
                : group === GROUPS[1]
                    ? futurePlural.operationFrame?.targetStem !== future.operationFrame?.targetStem
                    : facts(optativePlural).numberMorph !== facts(optative).numberMorph);
    }
    return s;
}

module.exports = { run };
