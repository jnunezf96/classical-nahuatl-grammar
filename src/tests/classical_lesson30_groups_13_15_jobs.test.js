"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const RENDERING_SOURCE = fs.readFileSync(path.join(
    ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
const GROUPS = [
    "lesson30-incorporated-complements",
    "lesson30-reduplication-and-nonactive-continuation",
    "lesson30-embed-is-not-agent-or-subject",
];

function request(overrides = {}) {
    const baseSource = {
        embedStem: "zax",
        matrixStem: "mepoa",
        matrixVerbClass: "A",
        matrixValence: "intransitive",
        subjectReferenceId: "actor",
        objectReferenceIds: [],
    };
    return {
        constructionKind: "nominal-embed-vnc",
        relation: "complement",
        route: "complement",
        orientation: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
        ...overrides,
        source: { ...baseSource, ...overrides.source },
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson30_groups_13_15_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson30-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(value);
    const operation = frame => frame.operationFrame || {};

    const subjectComplement = evaluate(request({
        source: { embedSubjectReferenceId: "actor" },
    }));
    const objectComplement = evaluate(request({
        orientation: "object",
        complementKind: "considering",
        source: {
            matrixStem: "tēm-o-a",
            matrixVerbClass: "C",
            matrixValence: "single-object",
            objectPerson: "2sg",
            objectReferenceIds: ["patient"],
            embedSubjectReferenceId: "patient",
        },
    }));
    const changedStems = evaluate(request({
        orientation: "object",
        complementKind: "considering",
        source: {
            embedStem: "qet-invented",
            matrixStem: "tēm-o-a",
            matrixVerbClass: "C",
            matrixValence: "single-object",
            objectPerson: "2sg",
            objectReferenceIds: ["patient"],
            embedSubjectReferenceId: "patient",
        },
    }));
    const conflictingReference = evaluate(request({
        orientation: "object",
        complementKind: "considering",
        source: {
            matrixStem: "tēm-o-a",
            matrixVerbClass: "C",
            matrixValence: "single-object",
            objectPerson: "2sg",
            objectReferenceIds: ["patient"],
            embedSubjectReferenceId: "stranger",
        },
    }));
    const ambiguousTarget = evaluate(request({
        orientation: "object",
        complementKind: "changing",
        source: {
            matrixStem: "maca",
            matrixVerbClass: "A",
            matrixValence: "double-object",
            objectReferenceIds: ["patient", "beneficiary"],
        },
    }));
    const selectedTarget = evaluate(request({
        orientation: "object",
        complementKind: "changing",
        complementTargetReferenceId: "beneficiary",
        source: {
            matrixStem: "maca",
            matrixVerbClass: "A",
            matrixValence: "double-object",
            objectReferenceIds: ["patient", "beneficiary"],
        },
    }));
    const assimilated = evaluate(request({
        orientation: "object",
        complementKind: "considering",
        source: {
            embedStem: "teh",
            matrixStem: "maca",
            matrixVerbClass: "A",
            matrixValence: "single-object",
            objectPerson: "3sg",
            objectReferenceIds: ["patient"],
        },
    }));
    const preciseAsIfBlocked = evaluate(request({
        orientation: "object",
        complementKind: "pretending",
        preciseAsIfNuance: true,
        source: {
            matrixStem: "toca",
            matrixVerbClass: "B",
            matrixValence: "single-object",
            objectPerson: "3sg",
            objectReferenceIds: ["patient"],
        },
    }));

    s.eq("complements preserve valence and delete only a coreferential embedded subject", {
        subject: [subjectComplement.authorizationStatus,
            operation(subjectComplement).complementReferenceFrame?.orientation,
            operation(subjectComplement).complementReferenceFrame?.complementTargetReferenceId,
            operation(subjectComplement).complementReferenceFrame?.embeddedSubjectRepresentation,
            operation(subjectComplement).complementReferenceFrame
                ?.participantRoleTransitionFrame?.retiredSourceRoles,
            operation(subjectComplement).complementReferenceFrame
                ?.participantRoleTransitionFrame?.preservedParticipantFacts,
            operation(subjectComplement).complementScopeFrame?.matrixValencePreserved,
            operation(subjectComplement).sourceValencePositionCount,
            operation(subjectComplement).targetValencePositionCount],
        object: [objectComplement.authorizationStatus,
            operation(objectComplement).complementScopeFrame?.complementKind,
            operation(objectComplement).complementReferenceFrame?.complementTargetReferenceId,
            operation(objectComplement).complementReferenceFrame?.matrixParticipantRepresentation,
            operation(objectComplement).sourceValencePositionCount,
            operation(objectComplement).targetValencePositionCount],
        hostile: [changedStems.authorizationStatus,
            operation(changedStems).complementReferenceFrame?.complementTargetReferenceId],
        blocked: conflictingReference.blockReason,
    }, {
        subject: ["authorized", "subject", "actor", "deleted-as-coreferential",
            ["embedded-subject-expression"],
            ["embedded-subject-referent-identity", "matrix-participant-reference",
                "typed-source-history"], true, 0, 0],
        object: ["authorized", "considering", "patient", "preserved", 1, 1],
        hostile: ["authorized", "patient"],
        blocked: "incorporated-complement-embed-subject-must-be-coreferential",
    });
    s.eq("only genuine complement ambiguity becomes a user choice", {
        missing: [ambiguousTarget.authorizationStatus, ambiguousTarget.blockReason],
        selected: [selectedTarget.authorizationStatus,
            operation(selectedTarget).complementReferenceFrame?.targetReferenceChoiceRequired,
            operation(selectedTarget).complementReferenceFrame?.complementTargetReferenceId],
        uncertain: preciseAsIfBlocked.blockReason,
    }, {
        missing: ["blocked", "incorporated-complement-reference-choice-required"],
        selected: ["authorized", true, "beneficiary"],
        uncertain: "nominal-embed-toca-as-if-precise-nuance-genuinely-blocked",
    });
    s.eq("complement boundary assimilation changes sound but preserves Source analysis", [
        assimilated.authorizationStatus,
        operation(assimilated).boundaryAssimilationFrame?.sourceFinal,
        operation(assimilated).boundaryAssimilationFrame?.targetSequence,
        operation(assimilated).boundaryAssimilationFrame?.sourceAnalysisPreserved,
        operation(assimilated).compoundStem,
    ], ["authorized", "h-as-w", "m-m", true, "tem-maca"]);

    const embedRedup = evaluate(request({
        embedReduplication: "similarity",
        source: { embedSubjectReferenceId: "actor" },
    }));
    const matrixRedup = evaluate(request({
        matrixReduplication: "frequentative",
        source: { embedSubjectReferenceId: "actor" },
    }));
    const bothRedup = evaluate(request({
        embedReduplication: "distributive-varietal",
        matrixReduplication: "frequentative",
        source: { embedSubjectReferenceId: "actor" },
    }));
    const semanticAmbiguity = evaluate(request({
        matrixReduplication: "frequentative",
        source: {
            embedSubjectReferenceId: "actor",
            reduplicationSemanticScopeCandidates: [
                "event-frequency", "subject-distribution",
            ],
        },
    }));
    const semanticSelection = evaluate(request({
        matrixReduplication: "frequentative",
        reduplicationSemanticScope: "subject-distribution",
        source: {
            embedSubjectReferenceId: "actor",
            reduplicationSemanticScopeCandidates: [
                "event-frequency", "subject-distribution",
            ],
        },
    }));
    s.eq("reduplication attaches to the chosen typed Source boundary", {
        embed: [operation(embedRedup).reduplicationFrame?.targetScope,
            operation(embedRedup).reduplicationFrame?.selectedSemanticScopes],
        matrix: [operation(matrixRedup).reduplicationFrame?.targetScope,
            operation(matrixRedup).reduplicationFrame?.selectedSemanticScopes],
        both: [operation(bothRedup).reduplicationFrame?.targetScope,
            operation(bothRedup).reduplicationFrame?.sourceBoundariesPreserved],
        ambiguity: semanticAmbiguity.blockReason,
        selected: [semanticSelection.authorizationStatus,
            operation(semanticSelection).reduplicationFrame?.semanticScopeChoiceRequired,
            operation(semanticSelection).reduplicationFrame?.selectedSemanticScopes],
    }, {
        embed: ["embed", ["similarity"]],
        matrix: ["matrix", ["event-frequency"]],
        both: ["both", true],
        ambiguity: "nominal-embed-reduplication-semantic-scope-choice-required",
        selected: ["authorized", true, ["subject-distribution"]],
    });

    const objectImpersonal = evaluate(request({
        relation: "object", route: "object", orientation: "not-applicable",
        voice: "impersonal",
        source: {
            matrixStem: "chihua", matrixVerbClass: "A",
            matrixValence: "single-object", objectPerson: "3sg",
            objectReferenceIds: ["patient"],
        },
    }));
    const objectPassiveBlocked = evaluate(request({
        relation: "object", route: "object", orientation: "not-applicable",
        voice: "passive",
        source: {
            matrixStem: "chihua", matrixVerbClass: "A",
            matrixValence: "single-object", objectPerson: "3sg",
            objectReferenceIds: ["patient"],
        },
    }));
    const remainingObjectPassive = evaluate(request({
        relation: "object", route: "object", orientation: "not-applicable",
        voice: "passive",
        source: {
            matrixStem: "maca", matrixVerbClass: "A",
            matrixValence: "double-object",
            sourceObjectRequests: [
                { objectId: "object-1", objectKind: "specific-projective", objectPerson: "3sg" },
                { objectId: "object-2", objectKind: "specific-projective", objectPerson: "2sg" },
            ],
            objectReferenceIds: ["theme", "beneficiary"],
        },
    }));
    const nonspecificImpersonal = evaluate(request({
        relation: "adverb", route: "direct-adverb", adverbRole: "means",
        orientation: "not-applicable", voice: "impersonal",
        source: {
            matrixStem: "chihua", matrixVerbClass: "A",
            matrixValence: "single-object",
            sourceObjectRequests: [
                { objectId: "object-1", objectKind: "nonspecific-human", objectPerson: "" },
            ],
            objectReferenceIds: ["human-patient"],
        },
    }));
    const specificImpersonalBlocked = evaluate(request({
        relation: "adverb", route: "direct-adverb", adverbRole: "means",
        orientation: "not-applicable", voice: "impersonal",
        source: {
            matrixStem: "chihua", matrixVerbClass: "A",
            matrixValence: "single-object", objectPerson: "2sg",
            objectReferenceIds: ["patient"],
        },
    }));
    s.eq("completed compounds enter the ordinary nonactive owner by current valence", {
        impersonal: [objectImpersonal.authorizationStatus,
            operation(objectImpersonal).nonactiveContinuationFrame?.completedCompoundValence,
            operation(objectImpersonal).nonactiveContinuationFrame?.availableNonactiveVoices,
            operation(objectImpersonal).nonactiveContinuationFrame?.impersonalSubjectStructure,
            operation(objectImpersonal).nonactiveContinuationFrame?.ordinaryNonactiveOwnerReused],
        passiveBlocked: objectPassiveBlocked.blockReason,
        passive: [remainingObjectPassive.authorizationStatus,
            operation(remainingObjectPassive).nonactiveContinuationFrame?.completedCompoundValence,
            operation(remainingObjectPassive).nonactiveContinuationFrame?.targetFiniteSubject,
            operation(remainingObjectPassive).nonactiveContinuationFrame?.passiveSubjectSourceObjectId],
        nonspecific: [nonspecificImpersonal.authorizationStatus,
            operation(nonspecificImpersonal).nonactiveContinuationFrame?.impersonalAvailable],
        specificBlocked: specificImpersonalBlocked.blockReason,
    }, {
        impersonal: ["authorized", "intransitive", ["impersonal"],
            "faceless-third-singular-nominative", true],
        passiveBlocked: "incorporated-object-from-single-object-matrix-cannot-passivize",
        passive: ["authorized", "specific-projective", "2sg", "object-2"],
        nonspecific: ["authorized", true],
        specificBlocked: "incorporated-compound-impersonal-requires-intransitive-or-nonspecific-objects",
    });

    const complementRole = ctx.validateClassicalNahuatlIncorporatedNounRole(
        objectComplement, { claimedRole: "incorporated-complement" });
    const subjectClaim = ctx.validateClassicalNahuatlIncorporatedNounRole(
        objectComplement, { claimedRole: "subject" });
    const passiveObjectRole = ctx.validateClassicalNahuatlIncorporatedNounRole(
        remainingObjectPassive, { claimedRole: "incorporated-object" });
    const passiveAgentClaim = ctx.validateClassicalNahuatlIncorporatedNounRole(
        remainingObjectPassive, { claimedRole: "incorporated-object", agentMentioned: true });
    const translationClaim = ctx.validateClassicalNahuatlIncorporatedNounRole(
        objectComplement, { claimedRole: "incorporated-complement", translation: "subject" });
    s.eq("the embed never becomes finite subject or agent", {
        complement: [complementRole.authorizationStatus, complementRole.derivedRole,
            complementRole.incorporatedNounIsSubject, complementRole.incorporatedNounIsAgent],
        subject: subjectClaim.blockReason,
        passive: [passiveObjectRole.authorizationStatus,
            operation(remainingObjectPassive).nonactiveContinuationFrame?.passiveAgentExpressible],
        agent: passiveAgentClaim.blockReason,
        translation: translationClaim.blockReason,
    }, {
        complement: ["authorized", "incorporated-complement", false, false],
        subject: "incorporated-noun-cannot-be-subject-or-agent",
        passive: ["authorized", false],
        agent: "passive-agent-mention-forbidden",
        translation: "incorporated-role-validation-accepts-role-context-only",
    });

    const cueFrames = [subjectComplement, objectComplement, assimilated,
        embedRedup, bothRedup, objectImpersonal, remainingObjectPassive];
    const cues = cueFrames.flatMap(frame => ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization,
        frame.canonicalResult?.resultFrame?.typedSlotFrame
            || frame.canonicalResult?.finalTypedVncSlotFrame
            || frame.canonicalResult?.typedSlotFrame,
        frame,
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted Group 13-15 atoms have exact writing and clickable-cue routes", {
        records: records.length,
        writing: writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = records.filter(record => record.reviewGroupId === group)
                .map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 161, writing: 85, groups: 3, cueGroups: 3, covered: true });
    s.ok("the live Result sends these formulas through clickable cues",
        RENDERING_SOURCE.includes("lesson30-incorporated-complements")
        && RENDERING_SOURCE.includes("lesson30-reduplication-and-nonactive-continuation")
        && RENDERING_SOURCE.includes("lesson30-embed-is-not-agent-or-subject"));

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(objectComplement).complementReferenceFrame?.referenceIdentityUnified,
                operation(objectComplement).complementScopeFrame?.matrixValencePreserved,
                operation(objectComplement).targetValencePositionCount]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(objectImpersonal).nonactiveContinuationFrame?.selectedVoice,
                    operation(objectImpersonal).nonactiveContinuationFrame?.impersonalAvailable,
                    operation(objectImpersonal).targetMatrixSubject]
                : [complementRole.incorporatedNounIsSubject,
                    complementRole.incorporatedNounIsAgent,
                    complementRole.passiveAgentMentionAllowed];
        const expected = record.reviewGroupId === GROUPS[0]
            ? [true, true, 1]
            : record.reviewGroupId === GROUPS[1]
                ? ["impersonal", true, "3sg"]
                : [false, false, false];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`, observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? conflictingReference.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? objectPassiveBlocked.authorizationStatus === "blocked"
                    : passiveAgentClaim.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
