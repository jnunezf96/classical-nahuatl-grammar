"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson33-derived-causative-and-applicative-sources";

function derive(ctx, request) {
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const optionId = preview.controlFrame?.derivationOptionInventory
        ?.options?.[0]?.optionId || "";
    return ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId: optionId,
    });
}

function continuationRequest(ctx, sourceApplicationFrame, overrides = {}) {
    const source = ctx.getClassicalNahuatlVncContinuationSourceConstituents(
        sourceApplicationFrame.resultFrame
    );
    return {
        ...source,
        sourceObjectRequests: source?.sourceObjectRequests || [],
        sourceApplicationFrame,
        sourceDerivationKind:
            sourceApplicationFrame.resultFrame?.selectedDerivation,
        lateOperation: "honorific",
        lateVariant: "applicative",
        honoredParticipant: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
        ...overrides,
    };
}

function honor(ctx, sourceApplicationFrame, overrides = {}) {
    return ctx.evaluateClassicalNahuatlLateVncDerivation(
        continuationRequest(ctx, sourceApplicationFrame, overrides)
    );
}

function positions(frame) {
    return (frame?.finalTypedVncSlotFrame?.slots?.prePredicate || [])
        .filter(slot => ["monadic-valence", "dyadic-valence"].includes(
            slot.kind
        ))
        .map(slot => ({
            kind: slot.objectPositionFrame?.objectKind || "",
            person: slot.objectPositionFrame?.objectPerson
                || slot.morphIdentityFrame?.objectPerson || "",
            governor: slot.objectPositionFrame?.governor || "",
            level: slot.objectPositionFrame?.derivationalLevel || 0,
            carrier: slot.carrier || "",
        }));
}

function sourcePositionSummary(records = []) {
    return records.map(position => ({
        id: position.objectId || "",
        kind: position.objectKind || "",
        person: position.objectPerson || "",
        governor: position.governor || "",
        level: position.derivationalLevel || 0,
    }));
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_group_5_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const causative = derive(ctx, {
        sourceStem: "chīhua",
        sourceValence: "projective-nonhuman",
        verbClass: "A",
        sourceSubject: "1sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        derivationType: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    });
    const applicative = derive(ctx, {
        sourceStem: "celi",
        sourceValence: "projective-nonhuman",
        verbClass: "A",
        sourceSubject: "3sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "applicative",
        derivationType: "applicative",
        applicativeObjectKind: "specific-projective",
        applicativeObjectPerson: "1sg",
        requestedVoice: "active",
    });
    const causativeHonorific = honor(ctx, causative);
    const applicativeSubject = honor(ctx, applicative, {
        honoredParticipant: "subject",
    });
    const applicativeObject = honor(ctx, applicative, {
        honoredParticipant: "object",
    });

    const causativeFacts = causativeHonorific.operationFrame?.operationFacts
        || {};
    s.eq("the owner-issued causative Result keeps every inner participant under the honorific layer", {
        source: [causative.authorizationStatus,
            causative.resultFrame?.surfaceRealization],
        result: [causativeHonorific.authorizationStatus,
            causativeHonorific.operationFrame?.targetStem,
            causativeHonorific.surfaceRealization],
        rules: causativeHonorific.operationFrame?.ruleFamilies?.filter(
            family => family.includes("honorific")
        ),
        objects: positions(causativeHonorific),
        sourceKind: causativeFacts.derivedSourceKind,
        higherAgent: causativeFacts.derivedSourceHigherAgent,
        lowerAgents: sourcePositionSummary(
            causativeFacts.derivedSourceLowerAgentPositions
        ),
        themes: sourcePositionSummary(
            causativeFacts.derivedSourceThemePositions
        ),
    }, {
        source: ["authorized", "nēchtlachīhualtia"],
        result: ["authorized", "chīhua-l-ti-liā",
            "nēchmotlachīhualtilia"],
        rules: ["honorific-applicative", "honorific-gate",
            "honorific-projective", "honorific-projective-applicative",
            "honorific-derived-source"],
        objects: [
            { kind: "specific-projective", person: "1sg",
                governor: "causative", level: 2, carrier: "n-ēch" },
            { kind: "reflexive", person: "", governor: "applicative",
                level: 3, carrier: "m-o" },
            { kind: "nonspecific-nonhuman", person: "",
                governor: "directive", level: 1, carrier: "tla" },
        ],
        sourceKind: "causative",
        higherAgent: "3sg",
        lowerAgents: [{ id: "causative-object",
            kind: "specific-projective", person: "1sg",
            governor: "causative", level: 2 }],
        themes: [{ id: "source-object-1",
            kind: "nonspecific-nonhuman", person: "",
            governor: "directive", level: 1 }],
    });

    const applicativeFacts = applicativeObject.operationFrame?.operationFacts
        || {};
    s.eq("the owner-issued applicative Result keeps its source participant and nonspecific theme", {
        source: [applicative.authorizationStatus,
            applicative.resultFrame?.surfaceRealization],
        result: [applicativeObject.authorizationStatus,
            applicativeObject.operationFrame?.targetStem,
            applicativeObject.surfaceRealization],
        sourceKind: applicativeFacts.derivedSourceKind,
        retained: sourcePositionSummary(
            applicativeFacts.retainedDerivedSourceObjectPositions
        ),
        nonspecific: sourcePositionSummary(
            applicativeFacts.derivedSourceNonspecificThemePositions
        ),
        scope: applicativeFacts
            .derivedSourceNonspecificThemeAllowsSingularOrPluralReading,
        reflexive: applicativeFacts.reflexiveBeneficiaryAddedAutomatically,
        preserved: [applicativeFacts.derivedSourceObjectsPreserved,
            applicativeFacts.derivedSourceBoundariesPreserved],
    }, {
        source: ["authorized", "nēchtlacelia"],
        result: ["authorized", "ce-li-liā", "nēchmotlacelilia"],
        sourceKind: "applicative",
        retained: [
            { id: "applicative-object", kind: "specific-projective",
                person: "1sg", governor: "applicative", level: 2 },
            { id: "source-object-1", kind: "nonspecific-nonhuman",
                person: "", governor: "directive", level: 1 },
        ],
        nonspecific: [{ id: "source-object-1",
            kind: "nonspecific-nonhuman", person: "",
            governor: "directive", level: 1 }],
        scope: true,
        reflexive: true,
        preserved: [true, true],
    });

    s.eq("the derived topology exposes only the real subject versus eligible-object ambiguity", {
        subject: [applicativeSubject.authorizationStatus,
            applicativeSubject.surfaceRealization,
            applicativeSubject.operationFrame?.operationFacts
                ?.honoredParticipant],
        object: [applicativeObject.authorizationStatus,
            applicativeObject.surfaceRealization,
            applicativeFacts.honoredParticipant],
        possible: applicativeFacts.possibleHonoredParticipants,
        eligibleObjects: sourcePositionSummary(
            applicativeFacts.honorEligibleObjectPositions
        ),
        selectedObject: applicativeFacts.selectedHonoredObjectPosition
            ?.objectId,
        choice: applicativeFacts.honoredParticipantChoiceRequired,
        innerFirstPersonOffered: applicativeFacts
            .honorEligibleObjectPositions?.some(position => (
                position.objectPerson === "1sg"
            )),
    }, {
        subject: ["authorized", "nēchmotlacelilia", "subject"],
        object: ["authorized", "nēchmotlacelilia", "object"],
        possible: ["subject", "object"],
        eligibleObjects: [{ id: "source-object-1",
            kind: "nonspecific-nonhuman", person: "",
            governor: "directive", level: 1 }],
        selectedObject: "source-object-1",
        choice: true,
        innerFirstPersonOffered: false,
    });

    s.eq("the exact owner-issued derived Source is retained and copied authority is rejected", {
        application: causativeFacts.derivedSourceApplicationFrame === causative,
        result: causativeFacts.derivedSourceResultFrame
            === causative.resultFrame,
        operation: causativeFacts.innerDerivationOperationFrame
            === causative.resultFrame?.derivationOperationFrame,
        authority: [causativeFacts.ownerIssuedDerivedSourceRequired,
            causativeFacts.ownerIssuedDerivedSourceRetained,
            causativeFacts.derivedSourceRebuiltFromFormula,
            causativeFacts.derivedSourceFormulaAuthorityAccepted,
            causativeFacts.derivedSourceSurfaceAuthorityAccepted,
            causativeFacts.derivedSourceCanvasExampleAuthority],
        missing: ctx.evaluateClassicalNahuatlLateVncDerivation({
            ...continuationRequest(ctx, causative),
            sourceApplicationFrame: undefined,
        }).blockReason,
        copied: ctx.evaluateClassicalNahuatlLateVncDerivation({
            ...continuationRequest(ctx, causative),
            sourceApplicationFrame: JSON.parse(JSON.stringify(causative)),
        }).blockReason,
        mismatch: ctx.evaluateClassicalNahuatlLateVncDerivation({
            ...continuationRequest(ctx, causative),
            sourceDerivationKind: "applicative",
        }).blockReason,
    }, {
        application: true,
        result: true,
        operation: true,
        authority: [true, true, false, false, false, false],
        missing: "engine-issued-derived-source-application-required",
        copied: "engine-issued-derived-source-application-required",
        mismatch: "typed-derived-source-operation-continuity-required",
    });

    const openDerived = derive(ctx, {
        sourceStem: "paca",
        sourceValence: "projective-nonhuman",
        verbClass: "A",
        sourceSubject: "1sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "applicative",
        derivationType: "applicative",
        applicativeObjectKind: "specific-projective",
        applicativeObjectPerson: "1sg",
        requestedVoice: "active",
    });
    const openHonorific = honor(ctx, openDerived, {
        honoredParticipant: "object",
        formula: "copied-example-cannot-authorize",
        surface: "copied-example-cannot-authorize",
    });
    s.eq("derived-Source continuation is productive for an unlisted typed shape", {
        source: [openDerived.authorizationStatus,
            openDerived.resultFrame?.selectedDerivation],
        result: [openHonorific.authorizationStatus,
            openHonorific.operationFrame?.operationFacts
                ?.derivedSourceHonorific,
            openHonorific.operationFrame?.operationFacts
                ?.derivedSourceCanvasExampleAuthority],
        formulaAuthority: openHonorific.formulaStringAuthority,
        surfaceAuthority: openHonorific.surfaceStringAuthority,
    }, {
        source: ["authorized", "applicative"],
        result: ["authorized", true, false],
        formulaAuthority: false,
        surfaceAuthority: false,
    });

    const cues = [causativeHonorific, applicativeSubject,
        applicativeObject, openHonorific]
        .flatMap(frame => ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.finalTypedVncSlotFrame,
            frame,
        ))
        .filter(cue => cue.role === GROUP);
    s.eq("all accepted Group 5 atoms have exact jobs and a clickable cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        cue: cues.some(cue => records.every(record => (
            cue.atomIds?.includes(record.atomId)
        ))),
    }, { records: 17, writing: 13, readingOnly: 4,
        accepted: true, cue: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.atomIds?.includes(record.atomId));
        s.ok(`${record.atomId} observes the canonical derived-Source Result`,
            Boolean(cue));
        s.eq(`mutation:${record.atomId} loses exact credit`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }
    return s;
}

module.exports = { run };
