"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson33-reverential-double-honorifics";

function honorific(ctx, overrides = {}) {
    return ctx.requestClassicalLateVncOperation({
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        lateOperation: "honorific",
        lateVariant: "applicative",
        honoredParticipant: "subject",
        ...overrides,
    });
}

function reverentialRequest(source, overrides = {}) {
    return {
        sourceStem: source.operationFrame?.targetStem,
        sourceValence: source.operationFrame?.targetValence,
        verbClass: source.operationFrame?.targetClass,
        objectKind: "reflexive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        lateOperation: "reverential",
        lateVariant: "preterit-embed",
        honoredParticipant: source.operationFrame?.operationFacts
            ?.honoredParticipant || "subject",
        attitudeSourceClosureFrame: source,
        ...overrides,
    };
}

function revere(ctx, source, overrides = {}) {
    return ctx.requestClassicalLateVncOperation(
        reverentialRequest(source, overrides)
    );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_group_8_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    const renderingSource = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    const shellSource = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");

    const inner = honorific(ctx);
    const outer = revere(ctx, inner);
    const facts = outer.operationFrame?.operationFacts || {};
    s.eq("reverential recaptures a completed honorific and adds the second fixed layer", {
        inner: [inner.authorizationStatus, inner.surfaceRealization,
            inner.operationFrame?.targetStem],
        outer: [outer.authorizationStatus, outer.operationFrame?.ruleFamily,
            outer.surfaceRealization, outer.operationFrame?.targetStem],
        subtype: facts.reverentialSubtypeOfHonorific,
        doubled: facts.doubledHonorificConstruction,
        intensity: facts.reverentialIntensitySelectedByUser,
        automatic: facts.secondHonorificLayerAutomatic,
        sourceIdentity: facts.ownerIssuedHonorificSourceFrame === inner,
        sourceRetained: facts.ownerIssuedHonorificSourceRetained,
    }, {
        inner: ["authorized", "mochōquilia", "chōqui-liā"],
        outer: ["authorized", "reverential-double",
            "mochōquiliatzinoa", "chōqui-lia-0-tzin-o-ā"],
        subtype: true,
        doubled: true,
        intensity: true,
        automatic: true,
        sourceIdentity: true,
        sourceRetained: true,
    });

    s.eq("the neutral, honorific, and reverential layers preserve structure and participants", {
        hierarchy: facts.neutralHonorificReverentialHierarchy,
        depth: facts.hierarchyDepth,
        innerParticipant: facts.innerHonoredParticipant,
        outerParticipant: facts.outerHonoredParticipant,
        participantPreserved: facts.inheritedHonoredParticipantPreserved,
        freshChoice: facts.outerIntroducesFreshParticipantChoice,
        innerAnalysis: facts.innerHonorificAnalysisPreserved,
        aspect: facts.embeddedHonorificPredicateAspect,
        perfective: facts.embeddedHonorificPerfectiveStem,
        preterit: [facts.embeddedPreteritMorph,
            facts.embeddedPreteritMorphHasSurface],
        incorporated: facts.incorporatedHonorificPredicateIsOuterObject,
        matrix: facts.fixedOuterMatrix,
        participants: facts.sourceParticipantsPreserved,
        boundaries: facts.innerAndOuterBoundariesPreserved,
    }, {
        hierarchy: ["chōca", "chōqui-liā",
            "chōqui-lia-0-tzin-o-ā"],
        depth: 3,
        innerParticipant: "subject",
        outerParticipant: "subject",
        participantPreserved: true,
        freshChoice: false,
        innerAnalysis: true,
        aspect: "perfective",
        perfective: "chōqui-lia",
        preterit: ["0", false],
        incorporated: true,
        matrix: "tla-(tzin-o-ā)",
        participants: true,
        boundaries: true,
    });

    s.ok("the live continuation waits for the genuine reverential or pejorative choice instead of silently repeating honorific",
        shellSource.includes(
            '<option value="" hidden>choose the next attitude</option>'
        )
        && renderingSource.includes(
            'reverentialSourceAvailable\n            && attitudeControl.value === "honorific"'
        )
        && renderingSource.includes(
            'attitudeControl.value = ""'
        )
        && renderingSource.includes(
            'Object.prototype.hasOwnProperty.call(request, "attitude")'
        ));

    const projectiveInner = honorific(ctx, {
        sourceStem: "caqui",
        sourceValence: "specific-projective",
        verbClass: "B",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        lateVariant: "causative",
        honoredParticipant: "object",
        honorificFormationAnalysis: {
            lexicalStatus: "honorific-formation-analysis",
            sourceStem: "caqui",
            availableFormations: ["causative"],
            preferredFormation: "causative",
        },
    });
    const projectiveOuter = revere(ctx, projectiveInner, {
        honoredParticipant: "object",
    });
    const continuationProjection =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            projectiveInner
        );
    const projectiveFacts = projectiveOuter.operationFrame
        ?.operationFacts || {};
    const changedParticipant = revere(ctx, projectiveInner, {
        honoredParticipant: "subject",
    });
    const mainlineInner = ctx.requestClassicalLateVncOperation({
        sourceStem: "xīma",
        sourceValence: "mainline-reflexive",
        verbClass: "B",
        objectKind: "reflexive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        lateOperation: "honorific",
        lateVariant: "preterit-embed",
        honoredParticipant: "subject",
    });
    const mainlineContinuation =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            mainlineInner
        );
    s.eq("a projective reverential preserves the inherited subject-object ambiguity and selection", {
        inner: [projectiveInner.authorizationStatus,
            projectiveInner.surfaceRealization,
            projectiveInner.operationFrame?.operationFacts
                ?.possibleHonoredParticipants,
            projectiveInner.operationFrame?.operationFacts
                ?.honoredParticipant],
        outer: [projectiveOuter.authorizationStatus,
            projectiveOuter.surfaceRealization,
            projectiveFacts.inheritedPossibleHonoredParticipants,
            projectiveFacts.innerHonoredParticipant,
            projectiveFacts.outerHonoredParticipant],
        ambiguity: [projectiveFacts.inheritedParticipantAmbiguity,
            projectiveFacts.inheritedParticipantChoiceWasReal],
        continuation: [continuationProjection?.sourceStem,
            continuationProjection?.sourceValence,
            continuationProjection?.sourceObjectRequests?.map(position => (
                [position.objectKind, position.objectPerson]
            ))],
        objects: projectiveFacts.retainedSourceObjectPositions.map(position => (
            [position.objectKind, position.objectPerson,
                position.va1, position.va2]
        )),
        changed: [changedParticipant.authorizationStatus,
            changedParticipant.blockReason],
        mainlineContinuation: [mainlineInner.authorizationStatus,
            mainlineInner.operationFrame?.targetStem,
            mainlineContinuation?.sourceStem,
            mainlineContinuation?.sourceValence,
            mainlineContinuation?.sourceObjectRequests?.map(position => (
                position.objectKind
            ))],
    }, {
        inner: ["authorized", "quimocaquitīa",
            ["subject", "object"], "object"],
        outer: ["authorized", "quimocaquitīatzinoa",
            ["subject", "object"], "object", "object"],
        ambiguity: [true, true],
        continuation: ["caqui-tīā", "mainline-reflexive",
            [["specific-projective", "3sg"], ["reflexive", ""]]],
        objects: [["specific-projective", "3sg", "qui", "0"],
            ["reflexive", "", "m", "o"]],
        changed: ["blocked",
            "reverential-participant-must-match-honorific-source"],
        mainlineContinuation: ["authorized", "xīn-0-tzin-o-ā",
            "xīn-0-tzin-o-ā", "mainline-reflexive", ["reflexive"]],
    });

    const missing = ctx.evaluateClassicalNahuatlLateVncDerivation(
        reverentialRequest(inner, {
        attitudeSourceClosureFrame: undefined,
        })
    );
    const copied = ctx.evaluateClassicalNahuatlLateVncDerivation(
        reverentialRequest(inner, {
        attitudeSourceClosureFrame: JSON.parse(JSON.stringify(inner)),
        })
    );
    s.eq("raw stems and copied honorific artifacts cannot enter the reverential route", {
        missing: [missing.authorizationStatus, missing.blockReason],
        copied: [copied.authorizationStatus, copied.blockReason],
        rawStem: facts.rawStemReentryAllowed,
        spelling: facts.copiedHonorificSpellingAuthority,
        formula: facts.callerFormulaAuthorityAccepted,
        surface: facts.callerSurfaceAuthorityAccepted,
        example: facts.canvasExampleAuthority,
    }, {
        missing: ["blocked",
            "reverential-requires-engine-issued-honorific-source"],
        copied: ["blocked",
            "reverential-requires-engine-issued-honorific-source"],
        rawStem: false,
        spelling: false,
        formula: false,
        surface: false,
        example: false,
    });

    const cues = [outer, projectiveOuter].flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.finalTypedVncSlotFrame,
            frame,
        )
    )).filter(cue => cue.role === GROUP);
    s.eq("all accepted Group 8 atoms have exact jobs and one canonical clickable cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        cue: cues.some(cue => records.every(record => (
            cue.atomIds?.includes(record.atomId)
        ))),
    }, { records: 28, writing: 21, readingOnly: 7,
        accepted: true, cue: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.atomIds?.includes(record.atomId));
        s.ok(`${record.atomId} observes the doubled reverential Result`,
            Boolean(cue));
        s.eq(`mutation:${record.atomId} loses exact credit`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }
    return s;
}

module.exports = { run };
