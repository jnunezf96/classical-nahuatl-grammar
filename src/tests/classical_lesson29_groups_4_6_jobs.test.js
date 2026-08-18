"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson29-outbound-nonpast-and-progressive-contrast",
    "lesson29-outbound-past",
    "lesson29-outbound-optative",
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
    const s = createSuite("classical_lesson29_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson29-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = overrides => ctx.evaluateClassicalNahuatlLateVncDerivation(request(overrides));
    const facts = frame => frame.operationFrame?.operationFacts || {};

    const nonpastSingular = evaluate();
    const nonpastPlural = evaluate({ subject: "3pl" });
    const past = evaluate({ purposiveSeries: "outbound-past-indicative" });
    const pastPlural = evaluate({ subject: "2pl", purposiveSeries: "outbound-past-indicative" });
    const pastAntecessive = evaluate({
        subject: "2sg", mood: "indicative", tense: "past",
        purposiveSeries: "outbound-past-indicative", sentenceAntecessive: true,
    });
    const optative = evaluate({ subject: "1sg", purposiveSeries: "outbound-nonpast-optative" });
    const secondOptative = evaluate({ subject: "2sg", purposiveSeries: "outbound-nonpast-optative" });
    const optativePluralH = evaluate({ subject: "1pl", purposiveSeries: "outbound-nonpast-optative" });
    const optativePluralN = evaluate({
        subject: "1pl", purposiveSeries: "outbound-nonpast-optative",
        purposiveIrregularPluralN: true,
    });
    const earlySingular = evaluate({
        subject: "1sg", purposiveSeries: "outbound-nonpast-optative",
        purposiveEarlySingularGlottal: true,
    });
    const blockedEarlyPlural = evaluate({
        subject: "1pl", purposiveSeries: "outbound-nonpast-optative",
        purposiveEarlySingularGlottal: true,
    });

    s.eq("outbound nonpast derives number, readings, and the progressive contrast", {
        singular: [nonpastSingular.authorizationStatus, nonpastSingular.operationFrame?.targetStem,
            facts(nonpastSingular).matrixDirectionalMorpheme,
            facts(nonpastSingular).licensedReadingRange,
            facts(nonpastSingular).purposeActionBeginsAfterMovement,
            facts(nonpastSingular).progressiveActionOverlapsMovement],
        plural: [nonpastPlural.authorizationStatus, nonpastPlural.operationFrame?.targetStem,
            facts(nonpastPlural).numberMorph, facts(nonpastPlural).imperfectiveNumberPartner],
        contrast: facts(nonpastSingular).progressiveContrast,
    }, {
        singular: ["authorized", "chōca-⎕-t-ī-uh", "t", ["present", "future"], true, false],
        plural: ["authorized", "chōca-⎕-t-i-hui", "h", "hui"],
        contrast: {
            purposiveInternalDirectional: "t", progressiveExternalConnective: "ti",
            purposiveEmbedTense: "future", progressiveEmbedTense: "preterit",
            traditionalUnmarkedTextMayBeAmbiguous: true,
            classBShapeRemainsDistinct: false,
            analysisChoiceRequiredOnlyWhenTypedTextIsUnderspecified: true,
            spellingAloneHasGrammarAuthority: false,
        },
    });

    s.eq("outbound past derives t-o, number, three readings, and ordinary optional antecessive", {
        singular: [past.authorizationStatus, past.operationFrame?.targetStem,
            facts(past).matrixBaseStem, facts(past).finiteTenseMorph,
            facts(past).numberMorph, facts(past).licensedReadingRange],
        plural: [pastPlural.operationFrame?.targetStem, facts(pastPlural).numberMorph],
        antecessive: [facts(past).ordinaryAntecessiveAvailable,
            facts(past).ordinaryAntecessiveSelected,
            facts(pastAntecessive).ordinaryAntecessiveSelected],
        contrast: [facts(past).pastPurposiveHomographContrast,
            facts(past).pastPurposiveNeverIntroducedByMa,
            facts(past).pastPurposiveAnalysisUsesTypedStructureAndMaContext],
    }, {
        singular: ["authorized", "chōca-⎕-t-o", "o", "0", "0",
            ["simple-past", "habitual-past", "anterior-past"]],
        plural: ["chōca-⎕-t-o", "h"],
        antecessive: [true, false, true],
        contrast: ["connective-t-plus-on-o-optative", true, true],
    });

    s.eq("outbound optative keeps automatic finite structure and exposes only licensed variants", {
        ordinary: [optative.authorizationStatus, optative.operationFrame?.targetStem,
            facts(optative).licensedReadingRange, facts(optative).optativeLetReadingIsPermissive,
            facts(optative).optativeMayExpressSelfEncouragement,
            facts(optative).optativeMayExpressSelfSuggestion],
        second: [secondOptative.finalTypedVncSlotFrame?.slots?.subject?.pers1,
            facts(secondOptative).secondPersonPers1DerivedByFiniteGrammar],
        pluralH: [optativePluralH.operationFrame?.targetStem,
            facts(optativePluralH).numberMorph,
            facts(optativePluralH).purposiveOptativeMatrixEnding],
        pluralN: [optativePluralN.operationFrame?.targetStem,
            facts(optativePluralN).numberMorph,
            facts(optativePluralN).purposiveOptativeMatrixEnding],
        admonitive: [facts(optative).purposiveOptativeDistinctFromAdmonitive,
            facts(optative).admonitiveContrastEnding,
            facts(optative).optativeAnalysisChoiceRequiredOnlyWhenTypedTextIsUnderspecified],
        early: [earlySingular.authorizationStatus, earlySingular.operationFrame?.targetStem,
            facts(earlySingular).earlySingularGlottalSelected,
            facts(earlySingular).earlySingularGlottalMorph,
            facts(earlySingular).earlySingularGlottalMarkedAberrant,
            facts(earlySingular).ordinarySingularTiRemainsPreferred],
        blocked: [blockedEarlyPlural.authorizationStatus, blockedEarlyPlural.blockReason],
    }, {
        ordinary: ["authorized", "chōca-⎕-t-i",
            ["command", "exhortation", "wish", "self-encouragement", "self-suggestion"],
            false, true, true],
        second: ["xi", true],
        pluralH: ["chōca-⎕-t-i", "h", "t-i+0-h/0"],
        pluralN: ["chōca-⎕-t-ī", "n", "t-ī+0-n"],
        admonitive: [true, "perfective+h/0+t-ih/t-in", true],
        early: ["authorized", "chōca-⎕-h", true, "h", true, true],
        blocked: ["blocked", "early-singular-glottal-is-outbound-singular-optative-only"],
    });

    const hostileSources = [
        ["xōca", "A", "intransitive"],
        ["tzac", "B", "projective-human"],
        ["mīxoa", "C", "intransitive"],
        ["mā", "D", "specific-projective"],
        ["pachi-ā", "C", "intransitive"],
        ["mā-o-ā", "C", "intransitive"],
    ].map(([sourceStem, verbClass, sourceValence]) => evaluate({
        sourceStem, verbClass, sourceValence,
        objectKind: sourceValence === "projective-human" ? "nonspecific-human"
            : sourceValence === "projective-nonhuman" ? "nonspecific-nonhuman"
                : sourceValence === "specific-projective" ? "specific-projective" : undefined,
    }));
    s.eq("unlisted typed Source shapes receive the same outbound grammar", {
        count: hostileSources.length,
        authorized: hostileSources.every(frame => frame.authorizationStatus === "authorized"),
        open: hostileSources.every(frame => facts(frame).noStemWhitelist === true),
        series: hostileSources.map(frame => facts(frame).series),
        readings: hostileSources.map(frame => facts(frame).licensedReadingRange),
    }, {
        count: 6, authorized: true, open: true,
        series: Array(6).fill("outbound-nonpast-indicative"),
        readings: Array(6).fill(["present", "future"]),
    });

    const cueFrames = [nonpastSingular, past, optativePluralN];
    const cues = cueFrames.flatMap(frame => ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization, frame.finalTypedVncSlotFrame, frame,
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted Group 4-6 atoms have one exact clickable cue route", {
        records: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = records.filter(record => record.reviewGroupId === group)
                .map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 139, writing: 93, reading: 46, groups: 3, cueGroups: 3, covered: true });

    // Each writing atom observes its accepted owner-issued coordinate and a
    // mutation that changes or blocks that coordinate. Group-specific cues are
    // checked on the series to which they apply below.
    const cueFrameByGroup = {
        [GROUPS[0]]: nonpastSingular,
        [GROUPS[1]]: past,
        [GROUPS[2]]: optativePluralN,
    };
    for (const group of GROUPS) {
        const frame = cueFrameByGroup[group];
        const groupCues = ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization, frame.finalTypedVncSlotFrame, frame,
        ).filter(cue => cue.role === group);
        const ids = records.filter(record => record.reviewGroupId === group)
            .map(record => record.atomId);
        s.ok(`${group} has its exact clickable atom cue`,
            groupCues.some(cue => ids.every(id => cue.atomIds?.includes(id))));
    }
    for (const record of writing) {
        const group = record.reviewGroupId;
        const observation = group === GROUPS[0]
            ? [nonpastSingular.operationFrame?.targetStem,
                facts(nonpastSingular).licensedReadingRange,
                facts(nonpastSingular).progressiveContrast?.purposiveInternalDirectional]
            : group === GROUPS[1]
                ? [past.operationFrame?.targetStem, facts(past).licensedReadingRange,
                    facts(past).ordinaryAntecessiveAvailable]
                : [optative.operationFrame?.targetStem,
                    facts(optativePluralN).numberMorph,
                    facts(optative).purposiveOptativeDistinctFromAdmonitive];
        const expected = group === GROUPS[0]
            ? ["chōca-⎕-t-ī-uh", ["present", "future"], "t"]
            : group === GROUPS[1]
                ? ["chōca-⎕-t-o", ["simple-past", "habitual-past", "anterior-past"], true]
                : ["chōca-⎕-t-i", "n", true];
        s.eq(`${record.atomId} observes its accepted owner-issued coordinate`, observation, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that coordinate`,
            group === GROUPS[0]
                ? nonpastPlural.operationFrame?.targetStem !== nonpastSingular.operationFrame?.targetStem
                : group === GROUPS[1]
                    ? facts(pastAntecessive).ordinaryAntecessiveSelected
                        !== facts(past).ordinaryAntecessiveSelected
                    : earlySingular.operationFrame?.targetStem !== optative.operationFrame?.targetStem);
    }
    return s;
}

module.exports = { run };
