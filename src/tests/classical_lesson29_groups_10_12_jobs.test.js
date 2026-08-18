"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson29-nonactive-purposive-embeds",
    "lesson29-compound-stemmed-purposive-embeds",
    "lesson29-external-directionals-and-fulfilled-purpose",
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

function nonactiveOption(ctx, sourceRequest) {
    const preview = ctx.evaluateClassicalNahuatlVncApplication(sourceRequest);
    return preview.controlFrame?.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame?.nonactiveOptionInventory?.options?.[0]?.optionId
        || "";
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson29_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson29-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = overrides => ctx.evaluateClassicalNahuatlLateVncDerivation(request(overrides));
    const facts = frame => frame.operationFrame?.operationFacts || {};

    const passiveRequest = {
        sourceStem: "maca", sourceValence: "specific-projective",
        objectKind: "specific-projective", objectPerson: "3sg", verbClass: "A",
        subject: "3sg", mood: "indicative", tense: "present",
        requestedVoice: "passive", voice: "passive",
    };
    const passive = evaluate({
        ...passiveRequest,
        nonactiveOptionId: nonactiveOption(ctx, passiveRequest),
        purposiveSeries: "outbound-past-indicative",
    });
    const impersonalRequest = {
        sourceStem: "miqui", sourceValence: "intransitive", verbClass: "B",
        subject: "3sg", mood: "indicative", tense: "present",
        requestedVoice: "impersonal", voice: "impersonal",
    };
    const impersonal = evaluate({
        ...impersonalRequest,
        nonactiveOptionId: nonactiveOption(ctx, impersonalRequest),
        purposiveSeries: "inbound-nonfuture-indicative",
    });

    s.eq("passive and impersonal Results use the shared Purposive continuation", {
        passive: [passive.authorizationStatus, facts(passive).nonactiveEmbedAuthorized,
            facts(passive).nonactiveEmbedVoice, facts(passive).nonactiveEmbedStem,
            facts(passive).nonactiveEmbedVoicePreserved,
            facts(passive).nonactiveEmbedParticipantTopologyPreserved,
            facts(passive).nonactiveEmbedFutureBoundaryOutsideStem],
        impersonal: [impersonal.authorizationStatus, facts(impersonal).nonactiveEmbedAuthorized,
            facts(impersonal).nonactiveEmbedVoice, facts(impersonal).nonactiveEmbedStem,
            facts(impersonal).nonactiveEmbedUsesSharedFutureEmbedPath,
            facts(impersonal).nonactiveEmbedNegativeParticlesRemainSentenceExternal],
        policy: [facts(passive).nonactiveEmbedVoices,
            facts(passive).nonactiveEmbedExampleWhitelistUsed],
    }, {
        passive: ["authorized", true, "passive", "mac-o", true, true, true],
        impersonal: ["authorized", true, "impersonal", "mic-o-hua", true, true],
        policy: [["passive", "impersonal"], false],
    });

    const innerCompound = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        lateOperation: "compound", lateVariant: "connective-t",
        compoundMatrixStem: "nemi",
    }));
    const recursive = evaluate({
        sourceStem: innerCompound.operationFrame?.targetStem,
        compoundEmbedClosureFrame: innerCompound,
    });
    const copiedRecursive = evaluate({
        sourceStem: innerCompound.operationFrame?.targetStem,
        compoundEmbedClosureFrame: JSON.parse(JSON.stringify(innerCompound)),
    });
    s.eq("a completed compound Result remains intact inside the outer Purposive", {
        inner: [innerCompound.authorizationStatus, innerCompound.operationFrame?.targetStem],
        outer: [recursive.authorizationStatus, recursive.operationFrame?.targetStem,
            facts(recursive).recursiveCompoundEmbedAuthorized,
            facts(recursive).recursiveCompoundEmbedStem,
            facts(recursive).recursiveCompoundEmbedFramePreserved,
            facts(recursive).recursiveCompoundInternalStructurePreserved,
            facts(recursive).recursiveCompoundParticipantsPreserved,
            facts(recursive).recursiveCompoundEventRelationPreserved,
            facts(recursive).recursivePurposiveBoundaryOutsideCompletedCompound,
            facts(recursive).recursivePurposiveHierarchyAcyclic,
            facts(recursive).recursivePurposiveContinuationAvailable,
            facts(recursive).recursivePurposiveExampleTemplateUsed],
        hostile: [copiedRecursive.authorizationStatus, copiedRecursive.blockReason],
    }, {
        inner: ["authorized", "chōca-ti-nemi"],
        outer: ["authorized", "chōca-ti-nemi-⎕-t-ī-uh", true,
            "chōca-ti-nemi", true, true, true, true, true, true, true, false],
        hostile: ["blocked", "engine-issued-recursive-embed-closure-required"],
    });

    const outboundOn = evaluate({ purposiveExternalDirectional: "on" });
    const outboundHual = evaluate({ purposiveExternalDirectional: "huāl" });
    const inboundOn = evaluate({
        purposiveSeries: "inbound-nonfuture-indicative",
        purposiveExternalDirectional: "on",
    });
    const inboundHual = evaluate({
        purposiveSeries: "inbound-nonfuture-indicative",
        purposiveExternalDirectional: "huāl",
    });
    s.eq("external direction remains outside and independent from internal direction", {
        outboundOn: [outboundOn.authorizationStatus, facts(outboundOn).externalDirectional,
            facts(outboundOn).externalDirectionalMeaning,
            facts(outboundOn).externalDirectionalRelation],
        outboundHual: [facts(outboundHual).externalDirectionalMeaning,
            facts(outboundHual).externalDirectionalRelation],
        inboundOn: [facts(inboundOn).externalDirectionalMeaning,
            facts(inboundOn).externalDirectionalRelation],
        inboundHual: [facts(inboundHual).externalDirectionalMeaning,
            facts(inboundHual).externalDirectionalRelation],
        structure: [facts(inboundOn).externalDirectionalOutsideCompletedPurposive,
            facts(inboundOn).externalDirectionalIndependentFromInternal,
            facts(inboundOn).externalDirectionalMayContinueOrIntensifyMovement,
            facts(inboundOn).embedAndMatrixActionsRemainSeparate,
            Boolean(facts(inboundOn).externalDirectionalBoundaryFrame)],
        readings: [facts(inboundOn).ordinaryExternalDirectionalCanCarryPurposiveReading,
            facts(inboundOn).ordinaryExternalDirectionalPathRemainsDistinct,
            facts(inboundOn).formalPurposiveCounterpartAvailable,
            facts(inboundOn).purposiveInterpretationReadings,
            facts(inboundOn).interpretationIsContextualNotFormChoice,
            facts(inboundOn).translationHasGrammarAuthority],
    }, {
        outboundOn: ["authorized", "on", "away-thither-there", "matching"],
        outboundHual: ["hither", "mismatching"],
        inboundOn: ["away-thither-there", "mismatching"],
        inboundHual: ["hither", "matching"],
        structure: [true, true, true, true, true],
        readings: [true, true, true,
            ["intended-purpose", "fulfilled-purpose", "metaphorical-movement", "muted-intention"],
            true, false],
    });

    const cueFrameByGroup = {
        [GROUPS[0]]: passive,
        [GROUPS[1]]: recursive,
        [GROUPS[2]]: inboundOn,
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

    s.eq("accepted Group 10-12 atoms have exact job counts", {
        records: records.length, writing: writing.length,
        reading: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
    }, { records: 89, writing: 64, reading: 25, groups: 3 });

    for (const record of writing) {
        const group = record.reviewGroupId;
        const observation = group === GROUPS[0]
            ? [facts(passive).nonactiveEmbedVoice, facts(passive).nonactiveEmbedStem,
                facts(passive).nonactiveEmbedVoicePreserved]
            : group === GROUPS[1]
                ? [recursive.operationFrame?.targetStem,
                    facts(recursive).recursiveCompoundInternalStructurePreserved,
                    facts(recursive).recursivePurposiveHierarchyAcyclic]
                : [facts(inboundOn).externalDirectionalRelation,
                    facts(inboundOn).purposiveInterpretationReadings,
                    facts(inboundOn).translationHasGrammarAuthority];
        const expected = group === GROUPS[0]
            ? ["passive", "mac-o", true]
            : group === GROUPS[1]
                ? ["chōca-ti-nemi-⎕-t-ī-uh", true, true]
                : ["mismatching",
                    ["intended-purpose", "fulfilled-purpose", "metaphorical-movement", "muted-intention"],
                    false];
        s.eq(`${record.atomId} observes its accepted owner-issued coordinate`, observation, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that coordinate`,
            group === GROUPS[0]
                ? facts(impersonal).nonactiveEmbedVoice !== facts(passive).nonactiveEmbedVoice
                : group === GROUPS[1]
                    ? copiedRecursive.authorizationStatus === "blocked"
                    : facts(inboundHual).externalDirectionalRelation
                        !== facts(inboundOn).externalDirectionalRelation);
    }
    return s;
}

module.exports = { run };
