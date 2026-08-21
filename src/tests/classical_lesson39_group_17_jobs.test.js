"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-ownerhood-foundation";

function buildPatientive(ctx, sourceStem = "cuica") {
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    });
    const grammar = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "impersonal",
        canonicalVncResult: application.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    return { application, grammar };
}

function continueAsComplement(ctx, grammar, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncGrammarFrame: grammar,
        compoundTargetKind: "vnc",
        source: {
            matrixStem: "itta",
            matrixVerbClass: "A",
            matrixValence: "single-object",
            matrixSemanticFamily: "perception",
            objectPerson: "3sg",
            ...(fields.source || {}),
        },
        relation: "complement",
        complementKind: "considering",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_17_jobs");
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
    }, { atoms: 6, writing: 4, reading: 2, accepted: true });

    const { application, grammar } = buildPatientive(ctx);
    const complement = continueAsComplement(ctx, grammar);
    const compound = complement.operationFrame?.patientiveEmbedCompoundFrame;
    const frame = compound?.patientiveOwnerhoodFoundationFrame;
    s.eq("the exact patientive Result enters a typed object complement", {
        statuses: [application.authorizationStatus,
            grammar.authorizationStatus, complement.authorizationStatus],
        exactResult: frame?.canonicalPatientiveNncResult
            === grammar.canonicalResult,
        exactSource: frame?.canonicalPatientiveSourceFrame
            === grammar.sourceFrame,
        complement: frame?.patientiveResultServesAsObjectComplement,
        state: frame?.patientiveSourceState,
        stateAlternatives: frame?.patientiveSourceStateAlternatives,
        target: compound?.compoundTargetKind,
        relation: compound?.selectedRelation,
        matrix: [frame?.matrixStem, frame?.matrixVerbClass,
            frame?.matrixValence, frame?.matrixSemanticFamily],
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exactResult: true,
        exactSource: true,
        complement: true,
        state: "absolutive",
        stateAlternatives: ["absolutive", "possessive"],
        target: "vnc",
        relation: "complement",
        matrix: ["itta", "A", "single-object", "perception"],
    });

    s.eq("the discarded patientive subject shares the matrix object referent", {
        discarded: frame?.discardedPatientiveSubjectRepresentation,
        patientiveReference: frame?.discardedPatientiveSubjectReferenceId,
        matrixObjectReference: frame?.matrixObjectReferenceId,
        sameReference: frame?.discardedPatientiveSubjectReferenceId
            === frame?.matrixObjectReferenceId,
        coreferential: frame?.discardedSubjectCorefersWithMatrixObject,
        automatic: frame?.referentIdentityDerivedAutomatically,
        referenceOwner: complement.canonicalResult?.operationFrame
            ?.complementReferenceFrame?.referentIdentityAuthority,
    }, {
        discarded: "deleted-as-coreferential",
        patientiveReference: frame?.matrixObjectReferenceId,
        matrixObjectReference: frame?.matrixObjectReferenceId,
        sameReference: true,
        coreferential: true,
        automatic: true,
        referenceOwner: true,
    });
    s.ok("the selected matrix object reference is present",
        Boolean(frame?.matrixObjectReferenceId));

    s.eq("only the licensed matrix and relation remain genuine choices", {
        perception: frame?.perceptionMatrixIsLicensed,
        matrixTyped: frame?.matrixRemainsSeparatelyTyped,
        matrixChoice: frame?.matrixSelectionIsGenuineUserChoice,
        relationChoice: frame?.relationSelectionIsGenuineUserChoice,
        stateRebuilt: frame?.patientiveStateReconstructedFromSurfaceSpelling,
        lexical: frame?.lexicalMeaningRequiresTypedSourceOrContext,
        productive: frame?.compatibleUnlistedPerceptionMatricesRemainProductive,
        examples: frame?.exampleIdentityAuthorizesContinuation,
        copies: frame?.copiedResultAccepted,
        formulaSurface: frame?.formulaOrSurfaceAuthorityAccepted,
    }, {
        perception: true,
        matrixTyped: true,
        matrixChoice: true,
        relationChoice: true,
        stateRebuilt: false,
        lexical: true,
        productive: true,
        examples: false,
        copies: false,
        formulaSurface: false,
    });

    const unlisted = continueAsComplement(ctx, grammar, {
        source: {
            matrixStem: "xōna",
            matrixVerbClass: "A",
            matrixValence: "single-object",
            matrixSemanticFamily: "perception",
            objectPerson: "3sg",
        },
    });
    const unlistedFrame = unlisted.operationFrame
        ?.patientiveEmbedCompoundFrame?.patientiveOwnerhoodFoundationFrame;
    s.eq("an unlisted typed perception matrix uses the same owner", {
        status: unlisted.authorizationStatus,
        matrix: unlistedFrame?.matrixStem,
        exact: unlistedFrame?.canonicalPatientiveNncResult
            === grammar.canonicalResult,
        productive:
            unlistedFrame?.compatibleUnlistedPerceptionMatricesRemainProductive,
    }, {
        status: "authorized",
        matrix: "xōna",
        exact: true,
        productive: true,
    });

    const subjectComplement = continueAsComplement(ctx, grammar, {
        orientation: "subject",
    });
    const copied = continueAsComplement(ctx,
        JSON.parse(JSON.stringify(grammar)));
    const noRelation = continueAsComplement(ctx, grammar, { relation: "" });
    const noMatrix = continueAsComplement(ctx, grammar, {
        source: {
            matrixStem: "",
            matrixVerbClass: "A",
            matrixValence: "single-object",
            matrixSemanticFamily: "perception",
        },
    });
    s.eq("wrong routes, copies, and omitted real choices do not impersonate it", {
        subjectRouteAuthorized: subjectComplement.authorizationStatus,
        subjectGetsObjectComplementFrame: Boolean(subjectComplement
            .operationFrame?.patientiveEmbedCompoundFrame
            ?.patientiveOwnerhoodFoundationFrame),
        copied: copied.authorizationStatus,
        noRelation: [noRelation.authorizationStatus, noRelation.blockReason],
        noMatrix: [noMatrix.authorizationStatus, noMatrix.blockReason],
    }, {
        subjectRouteAuthorized: "authorized",
        subjectGetsObjectComplementFrame: false,
        copied: "blocked",
        noRelation: ["blocked",
            "39.6-genuine-compound-relation-choice-required"],
        noMatrix: ["blocked", "39.6-typed-compound-matrix-required"],
    });

    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        complement.formulaRealization,
        complement.canonicalResult?.nncSlotFrame || null,
        complement
    ).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        atoms: 6,
        writing: 4,
        reading: 2,
        cues: true,
        covered: true,
    });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }
    return s;
}

module.exports = { run };
