"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-ownerhood-continuation";

function buildPossessivePatientive(ctx, fields = {}) {
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: fields.sourceStem || "chīhua",
        verbClass: fields.verbClass || "A",
        sourceValence: fields.sourceValence || "projective-nonhuman",
        objectKind: fields.objectKind || "nonspecific-nonhuman",
        subject: fields.sourceSubject || "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    });
    const grammar = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily:
            fields.patientiveSourceFamily || "imperfective-active-core",
        patientiveAnalogy: fields.patientiveAnalogy || "passive",
        canonicalVncResult: application.resultFrame,
        subject: "3common",
        state: "possessive",
        possessor: fields.possessor || "1sg",
        animacy: fields.animacy || "nonanimate",
    });
    return { application, grammar };
}

function continueWithToca(ctx, grammar, fields = {}) {
    const subject = fields.subject || "1sg";
    const sourceObjectRequests = fields.sourceObjectRequests || [{
        objectId: "claimed-thing",
        objectKind: "nonspecific-nonhuman",
        objectPerson: "",
        governor: "directive",
        derivationalLevel: 1,
    }];
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncGrammarFrame: grammar,
        compoundTargetKind: "vnc",
        source: {
            matrixStem: fields.matrixStem || "toca",
            matrixVerbClass: fields.matrixVerbClass || "A",
            matrixValence: fields.matrixValence || "projective-nonhuman",
            matrixSemanticFamily:
                fields.matrixSemanticFamily || "baseless-claim-matrix",
            sourceObjectRequests,
            objectReferenceIds: sourceObjectRequests.map(item => item.objectId),
            ...(fields.source || {}),
        },
        relation: fields.relation || "complement",
        orientation: fields.orientation || "object",
        complementKind: fields.complementKind || "pretending",
        subject,
        mood: fields.mood || "indicative",
        tense: fields.tense || "present",
        voice: fields.voice || "active",
        ...(fields.embedPossessorCorefersWithSubject === true
            ? { embedPossessorCorefersWithSubject: true }
            : {}),
    });
}

function groupFrame(result) {
    return result.operationFrame?.patientiveEmbedCompoundFrame
        ?.patientivePossessiveTocaFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_20_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    s.eq("accepted group has the exact atom-job denominator", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        job: writing.every(record => (
            record.proposedWritingJob
                === "TRANSFORM_PATIENTIVE_POSSESSOR_TO_MAINLINE_OBJECT_IN_TOCA_COMPLEMENT"
        )),
    }, { atoms: 36, writing: 19, reading: 17, accepted: true, job: true });

    const reflexiveSource = buildPossessivePatientive(ctx, {
        possessor: "1sg",
    });
    const reflexive = continueWithToca(
        ctx, reflexiveSource.grammar, {
            subject: "1sg",
            embedPossessorCorefersWithSubject: true,
        }
    );
    const frame = groupFrame(reflexive);
    s.eq("the exact possessive patientive and its VNC ancestry survive", {
        statuses: [reflexiveSource.application.authorizationStatus,
            reflexiveSource.grammar.authorizationStatus,
            reflexive.authorizationStatus],
        exactResult: frame?.canonicalPatientiveNncResult
            === reflexiveSource.grammar.canonicalResult,
        exactSource: frame?.canonicalPatientiveSourceFrame
            === reflexiveSource.grammar.sourceFrame,
        exactVnc: frame?.canonicalPatientiveVncResult
            === reflexiveSource.application.resultFrame,
        state: frame?.patientiveSourceState,
        possessor: frame?.patientiveSourcePossessor,
        history: frame?.completePatientiveSourceAndVncAncestryPreserved,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exactResult: true,
        exactSource: true,
        exactVnc: true,
        state: "possessive",
        possessor: "1sg",
        history: true,
    });

    s.eq("the possessor automatically becomes an objective applicative object", {
        roles: [frame?.possessorSourceRole, frame?.possessorTargetRole],
        cases: [frame?.possessorSourceCase, frame?.possessorTargetCase],
        object: [frame?.transformedObjectKind,
            frame?.transformedObjectPerson,
            frame?.transformedObjectGovernor],
        reflexive: frame?.reflexiveWhenPossessorCorefersWithMatrixSubject,
        projective: frame?.projectiveWhenPossessorDoesNotCorefer,
        automatic: frame?.transformationDerivedAutomatically,
        choice: frame?.userChoiceRequired,
        transition: {
            retired: frame?.possessorObjectTransformationFrame
                ?.participantRoleTransitionFrame?.retiredSourceRoles,
            activated: frame?.possessorObjectTransformationFrame
                ?.participantRoleTransitionFrame?.activatedTargetRoles,
            preserved: frame?.possessorObjectTransformationFrame
                ?.participantRoleTransitionFrame?.preservedParticipantFacts,
        },
    }, {
        roles: ["possessor", "mainline-applicative-object"],
        cases: ["possessive", "objective"],
        object: ["reflexive", "1sg", "applicative"],
        reflexive: true,
        projective: false,
        automatic: true,
        choice: false,
        transition: {
            retired: ["source-possessor"],
            activated: ["mainline-applicative-object"],
            preserved: ["possessor-participant-identity", "typed-source-history"],
        },
    });

    s.eq("toca keeps its object and inflates valence without a suffix", {
        matrix: [frame?.matrixStem, frame?.matrixLexicalAnalysis,
            frame?.complementKind],
        counts: [frame?.sourceValencePositionCount,
            frame?.targetValencePositionCount],
        sourceKinds: (frame?.originalMatrixObjectRequests || [])
            .map(item => item.objectKind),
        targetKinds: (frame?.resultingMatrixObjectRequests || [])
            .map(item => item.objectKind),
        inflation: frame?.valenceInflationWithoutSuffix,
        violation: frame?.ordinaryValencePrincipleViolated,
    }, {
        matrix: ["toca", "baseless-claim-matrix", "pretending"],
        counts: [1, 2],
        sourceKinds: ["nonspecific-nonhuman"],
        targetKinds: ["nonspecific-nonhuman", "reflexive"],
        inflation: true,
        violation: true,
    });
    s.ok("the Canvas class-tl patientive connector survives before toca",
        reflexive.formulaRealization.includes("chīhua-l-toca"));

    const projectiveSource = buildPossessivePatientive(ctx, {
        sourceStem: "xōna",
        possessor: "2sg",
    });
    const projective = continueWithToca(ctx, projectiveSource.grammar, {
        subject: "1sg",
    });
    const projectiveFrame = groupFrame(projective);
    s.eq("a noncoreferential possessor becomes the matching projective object", {
        statuses: [projectiveSource.application.authorizationStatus,
            projectiveSource.grammar.authorizationStatus,
            projective.authorizationStatus],
        source: projectiveFrame?.patientiveSourceIdentityStem,
        object: [projectiveFrame?.transformedObjectKind,
            projectiveFrame?.transformedObjectPerson,
            projectiveFrame?.transformedObjectGovernor],
        reflexive:
            projectiveFrame?.reflexiveWhenPossessorCorefersWithMatrixSubject,
        projective:
            projectiveFrame?.projectiveWhenPossessorDoesNotCorefer,
        productive:
            projectiveFrame?.compatibleUnlistedPatientiveResultsRemainProductive,
        gate:
            projectiveFrame?.matrixStemMembershipAuthorizesGeneralPatientiveRoute,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        source: projectiveFrame?.patientiveSourceIdentityStem,
        object: ["specific-projective", "2sg", "applicative"],
        reflexive: false,
        projective: true,
        productive: true,
        gate: false,
    });

    const wrongStateSource = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "impersonal",
        canonicalVncResult: reflexiveSource.application.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    const wrongState = continueWithToca(ctx, wrongStateSource);
    const wrongMatrix = continueWithToca(ctx, reflexiveSource.grammar, {
        matrixStem: "mati",
        matrixSemanticFamily: "considering-matrix",
        complementKind: "considering",
    });
    const copied = continueWithToca(
        ctx, JSON.parse(JSON.stringify(reflexiveSource.grammar))
    );
    s.eq("the special frame requires the typed facts and exact Result", {
        absolutive: [wrongState.authorizationStatus,
            Boolean(groupFrame(wrongState))],
        otherMatrix: [wrongMatrix.authorizationStatus,
            Boolean(groupFrame(wrongMatrix))],
        copied: [copied.authorizationStatus, Boolean(groupFrame(copied))],
    }, {
        absolutive: ["authorized", false],
        otherMatrix: ["authorized", false],
        copied: ["blocked", false],
    });

    s.eq("reading evidence stays outside productive authority", {
        ye: frame?.compoundYeMatrixPatientiveEmbedAllowed,
        lexical: frame?.lexicalReadingRequiresTypedSourceOrContext,
        examples: frame?.examplesAuthorizeRoute,
        translations: frame?.translationsAuthorizeStructure,
        copied: frame?.copiedResultAccepted,
        display: frame?.formulaOrSurfaceAuthorityAccepted,
    }, {
        ye: true,
        lexical: true,
        examples: false,
        translations: false,
        copied: false,
        display: false,
    });

    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        reflexive.formulaRealization,
        reflexive.canonicalResult?.nncSlotFrame || null,
        reflexive
    ).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("the clickable cue covers every accepted atom exactly", {
        cues: cues.length,
        sections: cues[0]?.lessonSections,
        covered: covered.size,
        all: records.every(record => covered.has(record.atomId)),
        role: cues[0]?.role,
    }, {
        cues: 1,
        sections: ["§39.7.2", "§39.7.2.a"],
        covered: 36,
        all: true,
        role: GROUP,
    });

    const sourceMutation = buildPossessivePatientive(ctx, {
        sourceStem: "pāca",
        possessor: "2sg",
    });
    const mutation = continueWithToca(ctx, sourceMutation.grammar, {
        subject: "1sg",
    });
    s.eq("changing only the compatible Source keeps the same rule", {
        status: mutation.authorizationStatus,
        frame: Boolean(groupFrame(mutation)),
        exact: groupFrame(mutation)?.canonicalPatientiveNncResult
            === sourceMutation.grammar.canonicalResult,
        resultChanged: mutation.formulaRealization
            !== projective.formulaRealization,
    }, { status: "authorized", frame: true, exact: true,
        resultChanged: true });

    return s;
}

module.exports = { run };
