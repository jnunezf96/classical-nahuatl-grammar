"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson36-instrumentive-realization-and-variants",
    "lesson36-present-agentive",
    "lesson36-future-agentive",
];

function buildVnc(ctx, {
    sourceStem = "mati",
    verbClass = "B",
    sourceValence = "intransitive",
    subject = "3sg",
    tense = "present",
    voice = "active",
    objectKind = "",
    objectRequests = null,
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
        ...(Array.isArray(objectRequests) ? { objectRequests } : {}),
    });
}

function nominalize(ctx, nominalizationKind, canonicalVncResult, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind,
        canonicalVncResult,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson36_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson36-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const impersonal = buildVnc(ctx, {
        sourceStem: "mati",
        verbClass: "B",
        tense: "customary-present",
        voice: "impersonal",
    });
    const imperfect = buildVnc(ctx, {
        sourceStem: "mati",
        verbClass: "B",
        subject: "1sg",
        tense: "imperfect",
    });
    const instrumentiveFields = {
        canonicalInstrumentiveAbsolutiveVncResult: impersonal.resultFrame,
        canonicalInstrumentivePossessiveVncResult: imperfect.resultFrame,
    };
    const instrumentive = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "instrumentive",
        ...instrumentiveFields,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    const possessiveInstrumentive = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "instrumentive",
        ...instrumentiveFields,
        subject: "3common",
        state: "possessive",
        possessor: "3pl",
        animacy: "nonanimate",
    });
    const instrument = instrumentive.operationFrame
        ?.instrumentiveRealizationFrame;
    s.eq("instrumentive realization follows exact Source shape and state", {
        statuses: [instrumentive.authorizationStatus,
            possessiveInstrumentive.authorizationStatus],
        paths: [instrument?.sourcePath,
            possessiveInstrumentive.operationFrame
                ?.instrumentiveRealizationFrame?.sourcePath],
        shape: instrument?.sourceMorphemicShapeFrame
            ?.morphemicComplexity,
        boundaries: instrument?.sourceMorphemicShapeFrame
            ?.internalBoundariesPreserved,
        supportiveI: instrument
            ?.supportiveInitialIDeletionInheritedFromVncOwner,
        lexicalFromShape: instrument?.lexicalizedReadingIsInferredFromShape,
        highGenerality: instrument?.setDefinedHighGenerality,
        targetEnds: [instrument?.targetStem.endsWith("-ni"),
            possessiveInstrumentive.operationFrame
                ?.instrumentiveRealizationFrame?.targetStem.endsWith("-ya")],
        sourceToPossessor: possessiveInstrumentive.operationFrame
            ?.instrumentiveRealizationFrame?.sourceSubjectBecomesPossessor,
    }, {
        statuses: ["authorized", "authorized"],
        paths: ["customary-present-impersonal", "imperfect-active"],
        shape: "polymorphemic",
        boundaries: true,
        supportiveI: false,
        lexicalFromShape: false,
        highGenerality: true,
        targetEnds: [true, true],
        sourceToPossessor: true,
    });

    const unlistedImpersonal = buildVnc(ctx, {
        sourceStem: "chōca",
        verbClass: "A",
        tense: "customary-present",
        voice: "impersonal",
    });
    const unlistedImperfect = buildVnc(ctx, {
        sourceStem: "chōca",
        verbClass: "A",
        subject: "1sg",
        tense: "imperfect",
    });
    const unlistedInstrumentive = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "instrumentive",
        canonicalInstrumentiveAbsolutiveVncResult:
            unlistedImpersonal.resultFrame,
        canonicalInstrumentivePossessiveVncResult:
            unlistedImperfect.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    s.eq("a new typed Source shape uses the same instrumentive rule", [
        unlistedImpersonal.authorizationStatus,
        unlistedImperfect.authorizationStatus,
        unlistedInstrumentive.authorizationStatus,
        unlistedInstrumentive.operationFrame?.instrumentiveRealizationFrame
            ?.sourceMorphemicShapeFrame?.exampleStemMembershipRequired,
    ], ["authorized", "authorized", "authorized", false]);

    const presentSource = buildVnc(ctx, {
        sourceStem: "mati",
        verbClass: "B",
        subject: "3pl",
        tense: "present",
    });
    const present = nominalize(
        ctx,
        "present-agentive",
        presentSource.resultFrame,
        { subject: "1sg" }
    );
    const presentPossessive = nominalize(
        ctx,
        "present-agentive",
        presentSource.resultFrame,
        { state: "possessive", possessor: "1sg" }
    );
    const presentFrame = present.operationFrame?.presentAgentiveFrame;
    s.eq("present agentive preserves the active present predicate", {
        source: presentSource.authorizationStatus,
        result: present.authorizationStatus,
        targetSubject: present.canonicalResult?.subject,
        targetStem: present.operationFrame?.targetStems?.restrictedUse,
        zeroFinal: presentFrame?.presentTenseZeroIsFinalConstituent,
        reflexive: presentFrame?.reflexiveCarrierRemainsSubjectMatched,
        states: presentFrame?.allowedStates,
        lexicalFromShape: presentFrame?.lexicalMeaningInferredFromShape,
        possessive: [presentPossessive.authorizationStatus,
            presentPossessive.blockReason],
    }, {
        source: "authorized",
        result: "authorized",
        targetSubject: "3pl",
        targetStem: presentFrame?.targetStem,
        zeroFinal: true,
        reflexive: false,
        states: ["absolutive"],
        lexicalFromShape: false,
        possessive: ["blocked",
            "predicate-nominalization:present-agentive-possessive-state-not-licensed"],
    });

    const futureSource = buildVnc(ctx, {
        sourceStem: "maca",
        verbClass: "A",
        sourceValence: "multiple-object",
        subject: "2sg",
        tense: "future",
        objectRequests: [
            { objectId: "theme", objectKind: "nonspecific-nonhuman",
                governor: "directive", derivationalLevel: 1 },
            { objectId: "beneficiary", objectKind: "nonspecific-human",
                governor: "applicative", derivationalLevel: 2 },
        ],
    });
    const future = nominalize(
        ctx,
        "future-agentive",
        futureSource.resultFrame,
        { subject: "1sg" }
    );
    const futurePlural = nominalize(
        ctx,
        "future-agentive",
        buildVnc(ctx, {
            sourceStem: "maca",
            verbClass: "A",
            sourceValence: "multiple-object",
            subject: "2pl",
            tense: "future",
            objectRequests: [
                { objectId: "theme", objectKind: "nonspecific-nonhuman",
                    governor: "directive", derivationalLevel: 1 },
                { objectId: "beneficiary", objectKind: "nonspecific-human",
                    governor: "applicative", derivationalLevel: 2 },
            ],
        }).resultFrame,
        { subject: "1sg" }
    );
    const futurePossessive = nominalize(
        ctx,
        "future-agentive",
        futureSource.resultFrame,
        { state: "possessive", possessor: "1pl" }
    );
    const futureFrame = future.operationFrame?.futureAgentiveFrame;
    s.eq("future agentive derives both stems, number, and object status", {
        source: futureSource.authorizationStatus,
        result: future.authorizationStatus,
        targetSubject: future.canonicalResult?.subject,
        stems: future.operationFrame?.targetStems,
        number: [future.canonicalResult?.numberFrame?.num1,
            future.canonicalResult?.numberFrame?.num2],
        pluralNumber: [futurePlural.canonicalResult?.numberFrame?.num1,
            futurePlural.canonicalResult?.numberFrame?.num2],
        futureZ: futureFrame?.futureZPreserved,
        ca: futureFrame?.generalUseCaAddedAfterFutureZ,
        omitted: [futureFrame?.omittedApplicativeObject,
            futureFrame?.omittedApplicativeObjectRemainsGrammaticallyAvailable],
        possessive: [futurePossessive.authorizationStatus,
            futurePossessive.operationFrame?.targetStems?.generalUse],
        suffixChoice: futureFrame?.suffixOrExampleSelectionIsUserChoice,
    }, {
        source: "authorized",
        result: "authorized",
        targetSubject: "2sg",
        stems: future.operationFrame?.targetStems,
        number: ["qui", "0"],
        pluralNumber: ["qu", "eh"],
        futureZ: true,
        ca: true,
        omitted: [true, true],
        possessive: ["authorized",
            future.operationFrame?.targetStems?.generalUse],
        suffixChoice: false,
    });

    const copiedFuture = nominalize(ctx, "future-agentive", {
        ...futureSource.resultFrame,
    });
    const passiveFuture = buildVnc(ctx, {
        sourceStem: "maca",
        verbClass: "A",
        sourceValence: "single-object",
        tense: "future",
        voice: "passive",
        objectKind: "specific-projective",
    });
    const passiveFutureAgentive = nominalize(
        ctx,
        "future-agentive",
        passiveFuture.resultFrame
    );
    s.eq("identity and voice restrictions fail independently", {
        copied: [copiedFuture.authorizationStatus, copiedFuture.blockReason],
        passive: [passiveFutureAgentive.authorizationStatus,
            passiveFutureAgentive.blockReason],
    }, {
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
        passive: ["blocked", "future-vnc-result-required"],
    });

    const cueFrames = [instrumentive, possessiveInstrumentive, present,
        future, futurePlural, futurePossessive];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all 201 atoms have exact writing or reading jobs", {
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
    }, { records: 201, writing: 132, readingOnly: 69,
        groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.role === record.reviewGroupId);
        s.ok(`${record.atomId} has its exact canonical observation`,
            Boolean(cue?.atomIds?.includes(record.atomId)));
        s.eq(`mutation:${record.atomId} loses exact credit when removed`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("no new suffix, example, or lexical-meaning authority was added",
        shell.includes('value="present-agentive"')
        && shell.includes('value="future-agentive"')
        && !shell.includes('id="classical-lesson36-future-z"')
        && !shell.includes('id="classical-lesson36-example-stem"')
        && !shell.includes('id="classical-lesson36-lexical-meaning"'));
    return s;
}

module.exports = { run };
