"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson36-customary-agentive-meaning-and-preterit-contrast",
    "lesson36-customary-present-patientive",
    "lesson36-instrumentive-two-source-foundation",
];

function buildVnc(ctx, {
    sourceStem = "mati",
    verbClass = "B",
    sourceValence = "intransitive",
    subject = "3sg",
    tense = "customary-present",
    voice = "active",
    objectKind = "",
    objectPerson = "",
} = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass,
        sourceValence,
        subject,
        mood: "indicative",
        tense,
        requestedDerivation: "direct",
        requestedVoice: voice,
        voice,
        ...(objectKind ? { objectKind } : {}),
        ...(objectPerson ? { objectPerson } : {}),
    });
}

function nominalize(ctx, nominalizationKind, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson36_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson36-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const customary = buildVnc(ctx);
    const preterit = buildVnc(ctx, { tense: "preterit" });
    const customaryPossessive = nominalize(
        ctx,
        "customary-agentive-full",
        {
            canonicalVncResult: customary.resultFrame,
            canonicalPreteritVncResult: preterit.resultFrame,
            state: "possessive",
            possessor: "1sg",
        }
    );
    s.eq("the possessive customary agentive is supplied by its exact preterit counterpart", {
        status: customaryPossessive.authorizationStatus,
        reason: customaryPossessive.blockReason,
        customaryIdentity: customaryPossessive.sourceFrame
            ?.canonicalVncResult === customary.resultFrame,
        preteritIdentity: customaryPossessive.operationFrame
            ?.customaryAgentivePossessiveSupplementFrame
            ?.preteritAgentiveFrame?.sourceFrame?.canonicalVncResult
                === preterit.resultFrame,
        stems: customaryPossessive.operationFrame?.targetStems,
        distinct: customaryPossessive.operationFrame?.agentiveContrastFrame
            ?.analysesRemainDistinct,
        translationMerges: customaryPossessive.operationFrame
            ?.agentiveContrastFrame?.sameEnglishTranslationMergesAnalyses,
        automatic: customaryPossessive.operationFrame
            ?.customaryAgentivePossessiveSupplementFrame
            ?.automaticParadigmSupplement,
    }, {
        status: "authorized",
        reason: "",
        customaryIdentity: true,
        preteritIdentity: true,
        stems: { restrictedUse: "mati-ni", generalUse: "mah-0-cā" },
        distinct: true,
        translationMerges: false,
        automatic: true,
    });

    const hostileCustomary = [
        nominalize(ctx, "customary-agentive-full", {
            canonicalVncResult: customary.resultFrame,
            state: "possessive",
            possessor: "1sg",
        }),
        nominalize(ctx, "customary-agentive-full", {
            canonicalVncResult: customary.resultFrame,
            canonicalPreteritVncResult: { ...preterit.resultFrame },
            state: "possessive",
            possessor: "1sg",
        }),
    ];
    s.eq("the automatic supplement still requires an exact matching Result", {
        statuses: hostileCustomary.map(frame => frame.authorizationStatus),
        reasons: hostileCustomary.map(frame => frame.blockReason),
    }, {
        statuses: ["blocked", "blocked"],
        reasons: [
            "customary-agentive-possessive-preterit-supplement-required",
            "exact-owner-issued-vnc-result-required",
        ],
    });

    const passive = buildVnc(ctx, {
        sourceStem: "chīhua",
        verbClass: "A",
        sourceValence: "specific-projective",
        tense: "customary-present",
        voice: "passive",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const patientive = nominalize(ctx, "customary-patientive", {
        canonicalVncResult: passive.resultFrame,
    });
    const patientivePlural = nominalize(ctx, "customary-patientive", {
        canonicalVncResult: passive.resultFrame,
        subject: "3pl",
    });
    const patientivePossessive = nominalize(ctx, "customary-patientive", {
        canonicalVncResult: passive.resultFrame,
        state: "possessive",
        possessor: "1sg",
    });
    const patientiveFrame = patientive.operationFrame?.customaryPatientiveFrame;
    s.eq("the exact passive customary Result becomes a fully nominal patientive", {
        passive: [passive.authorizationStatus,
            passive.resultFrame?.formulaRealization],
        patientive: [patientive.authorizationStatus,
            patientive.formulaRealization,
            patientive.operationFrame?.allowedStates,
            patientive.operationFrame?.targetStems],
        plural: [patientivePlural.authorizationStatus,
            patientivePlural.formulaRealization],
        possessive: [patientivePossessive.authorizationStatus,
            patientivePossessive.blockReason],
        analysis: patientiveFrame && {
            role: patientiveFrame.grammaticalRole,
            extension: patientiveFrame.semanticExtension,
            potentialSame: patientiveFrame.potentialPatientiveIsSameAnalysis,
            instrumentiveSame: patientiveFrame.instrumentiveIsSameAnalysis,
            activation: patientiveFrame
                .externalProjectiveObjectActivationAvailable,
            longO: patientiveFrame.passiveLongOSuffixProtectedBeforeNi,
            singular: patientiveFrame.singularNumberDyad,
            plural: patientiveFrame.pluralNumberDyad,
            exampleList: patientiveFrame.exampleStemMembershipRequired,
        },
    }, {
        passive: ["authorized", "#0-0(chihua-lō)ni+0-0#"],
        patientive: ["authorized", "#0-0(chihua-lō-ni)⎕-0#",
            ["absolutive"],
            { restrictedUse: "chihua-lō-ni", generalUse: "" }],
        plural: ["authorized", "#0-0(chihua-lō-ni)m-eh#"],
        possessive: ["blocked",
            "predicate-nominalization:customary-patientive-possessive-state-not-licensed"],
        analysis: {
            role: "patient-or-undergoer-of-customary-treatment",
            extension: "worthy-or-fit-to-receive-the-treatment",
            potentialSame: false,
            instrumentiveSame: false,
            activation: false,
            longO: true,
            singular: "⎕-0",
            plural: "m-eh",
            exampleList: false,
        },
    });

    const activatedPatientive = nominalize(ctx, "customary-patientive", {
        canonicalVncResult: passive.resultFrame,
        activatedObjectPerson: "1sg",
        supplementaryObjectRelation: "supplementary-object",
        supplementaryObjectReferentId: "patient",
    });
    s.eq("patientive projective activation is unavailable", [
        activatedPatientive.authorizationStatus,
        activatedPatientive.blockReason,
    ], ["blocked",
        "35.4-or-36.2-typed-projective-object-activation-license-required"]);

    const impersonal = buildVnc(ctx, {
        tense: "customary-present",
        voice: "impersonal",
    });
    const imperfect = buildVnc(ctx, {
        tense: "imperfect",
        voice: "active",
        subject: "1sg",
    });
    const pair = ctx.buildClassicalNahuatlInstrumentiveSourcePairFrame({
        canonicalInstrumentiveAbsolutiveVncResult: impersonal.resultFrame,
        canonicalInstrumentivePossessiveVncResult: imperfect.resultFrame,
    });
    const instrumentiveBase = {
        canonicalInstrumentiveAbsolutiveVncResult: impersonal.resultFrame,
        canonicalInstrumentivePossessiveVncResult: imperfect.resultFrame,
    };
    const instrumentiveAbsolute = nominalize(ctx, "instrumentive", {
        ...instrumentiveBase,
        subject: "2pl",
        animacy: "animate",
    });
    const instrumentivePossessive = nominalize(ctx, "instrumentive", {
        ...instrumentiveBase,
        state: "possessive",
        subject: "2pl",
        possessor: "3pl",
        animacy: "animate",
    });
    s.eq("instrumentive state selects one of two exact VNC Sources", {
        pair: [pair.authorizationStatus,
            ctx.isClassicalNahuatlInstrumentiveSourcePairFrame(pair),
            pair.customaryImpersonal.canonicalVncResult
                === impersonal.resultFrame,
            pair.imperfectActive.canonicalVncResult
                === imperfect.resultFrame,
            pair.sameTypedLexicalSource],
        absolute: [instrumentiveAbsolute.authorizationStatus,
            instrumentiveAbsolute.canonicalResult?.nncSlotFrame?.slots
                ?.subject?.subject,
            instrumentiveAbsolute.operationFrame?.defaultAnimacy,
            instrumentiveAbsolute.canonicalResult?.nncSlotFrame?.slots
                ?.number?.num1,
            instrumentiveAbsolute.canonicalResult?.nncSlotFrame?.slots
                ?.number?.num2,
            instrumentiveAbsolute.operationFrame?.instrumentiveParticipantFrame
                ?.selectedSourcePath],
        possessive: [instrumentivePossessive.authorizationStatus,
            instrumentivePossessive.canonicalResult?.nncSlotFrame?.slots
                ?.subject?.subject,
            instrumentivePossessive.canonicalResult?.nncSlotFrame?.slots
                ?.state?.slots?.[0]?.possessorPerson,
            instrumentivePossessive.operationFrame?.instrumentiveParticipantFrame
                ?.selectedSourcePath],
    }, {
        pair: ["authorized", true, true, true, true],
        absolute: ["authorized", "3common", "nonanimate", "0", "0",
            "customary-present-impersonal-vnc-result"],
        possessive: ["authorized", "3common", "1sg",
            "imperfect-active-vnc-result"],
    });

    const plan = ctx.prepareClassicalDeverbalNncParadigmPlan({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "instrumentive",
        ...instrumentiveBase,
        state: "absolutive",
        subject: "3common",
        animacy: "nonanimate",
    });
    const coordinates = ctx.projectClassicalDeverbalNncParadigmCoordinates(
        plan
    );
    s.eq("the full instrumentive paradigm coordinates both source Results", {
        status: plan?.authorizationStatus,
        count: plan?.coordinateCount,
        states: [...new Set(plan?.coordinates.map(item => item.state))],
        projected: coordinates.length,
        authorized: coordinates.every(frame => (
            frame.authorizationStatus === "authorized"
        )),
        scalarEquivalent: coordinates.every(frame => (
            frame.scalarEquivalent === true
        )),
        exactPair: plan?.instrumentiveSourcePairFrame === pair
            || ctx.isClassicalNahuatlInstrumentiveSourcePairFrame(
                plan?.instrumentiveSourcePairFrame
            ),
    }, {
        status: "authorized",
        count: 12,
        states: ["absolutive", "possessive"],
        projected: 12,
        authorized: true,
        scalarEquivalent: true,
        exactPair: true,
    });

    const mismatch = buildVnc(ctx, {
        sourceStem: "nemi",
        tense: "imperfect",
        voice: "active",
        subject: "1sg",
    });
    const hostilePairs = [
        ctx.buildClassicalNahuatlInstrumentiveSourcePairFrame({
            canonicalInstrumentiveAbsolutiveVncResult:
                impersonal.resultFrame,
            canonicalInstrumentivePossessiveVncResult:
                { ...imperfect.resultFrame },
        }),
        ctx.buildClassicalNahuatlInstrumentiveSourcePairFrame({
            canonicalInstrumentiveAbsolutiveVncResult:
                impersonal.resultFrame,
            canonicalInstrumentivePossessiveVncResult:
                mismatch.resultFrame,
        }),
    ];
    s.eq("identity and shared Source facts fail closed independently", {
        statuses: hostilePairs.map(frame => frame.authorizationStatus),
        reasons: hostilePairs.map(frame => frame.blockReason),
    }, {
        statuses: ["blocked", "blocked"],
        reasons: ["exact-owner-issued-vnc-result-required",
            "instrumentive-source-pair-must-share-typed-lexical-source"],
    });

    const cueFrames = [
        customaryPossessive,
        patientive,
        patientivePlural,
        instrumentiveAbsolute,
        instrumentivePossessive,
    ];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("every accepted atom has its exact application or reading job", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = writing.filter(record => (
                record.reviewGroupId === group
            )).map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 115, writing: 55, readingOnly: 60,
        groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.role === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted canonical observation`,
            Boolean(cue?.atomIds?.includes(record.atomId)));
        s.eq(`mutation:${record.atomId} loses exact credit when removed`,
            cue.atomIds.filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("the interface adds no manual suffix or example-stem authority",
        shell.includes('value="customary-patientive"')
        && shell.includes('value="instrumentive"')
        && !shell.includes('id="classical-lesson36-manual-patientive"')
        && !shell.includes('id="classical-lesson36-manual-instrumentive"')
        && !shell.includes('id="classical-lesson36-example-stem"'));
    return s;
}

module.exports = { run };
