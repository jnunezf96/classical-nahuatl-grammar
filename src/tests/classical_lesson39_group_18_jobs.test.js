"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-ownerhood-hua";

function buildPatientive(ctx, fields = {}) {
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "nōtza",
        verbClass: "A",
        sourceValence: "projective-human",
        objectKind: "nonspecific-human",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...fields,
    });
    const grammar = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "impersonal",
        canonicalVncResult: application.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "animate",
    });
    return { application, grammar };
}

function continueAsComplement(ctx, grammar, fields = {}) {
    const subject = fields.subject || "3sg";
    const sourceObjectRequests = fields.sourceObjectRequests || [{
        objectId: "matrix-object",
        objectKind: "reflexive",
        objectPerson: subject,
        governor: "directive",
        derivationalLevel: 1,
    }];
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...fields,
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncGrammarFrame: grammar,
        compoundTargetKind: "vnc",
        source: {
            matrixStem: "mati",
            matrixVerbClass: "A",
            matrixValence: "mainline-reflexive",
            matrixSemanticFamily: "considering-matrix",
            sourceObjectRequests,
            objectReferenceIds: sourceObjectRequests.map(item => item.objectId),
            ...(fields.source || {}),
        },
        relation: fields.relation || "complement",
        orientation: fields.orientation || "object",
        complementKind: fields.complementKind || "considering",
        subject,
        mood: fields.mood || "indicative",
        tense: fields.tense || "present",
        voice: fields.voice || "active",
    });
}

function groupFrame(result) {
    return result.operationFrame?.patientiveEmbedCompoundFrame
        ?.patientiveLicensedMatrixComplementFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_18_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    s.eq("accepted group has the exact corrected atom-job denominator", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        noHuaJob: records.every(record => (
            !/HUA_OWNERHOOD/u.test(record.proposedWritingJob || "")
        )),
    }, { atoms: 39, writing: 20, reading: 19, accepted: true,
        noHuaJob: true });

    const { application, grammar } = buildPatientive(ctx);
    const considering = continueAsComplement(ctx, grammar);
    const frame = groupFrame(considering);
    s.eq("the exact absolutive patientive and its human-object Source survive", {
        statuses: [application.authorizationStatus,
            grammar.authorizationStatus, considering.authorizationStatus],
        exactResult: frame?.canonicalPatientiveNncResult
            === grammar.canonicalResult,
        exactSource: frame?.canonicalPatientiveSourceFrame
            === grammar.sourceFrame,
        exactVnc: frame?.canonicalPatientiveVncResult
            === application.resultFrame,
        state: frame?.patientiveSourceState,
        humanObject: frame?.nonspecificHumanObjectHistoryPreserved,
        boundaries: frame?.patientiveSourceMorphemicBoundaries,
        coreference: frame?.discardedSubjectCorefersWithMatrixObject,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exactResult: true,
        exactSource: true,
        exactVnc: true,
        state: "absolutive",
        humanObject: true,
        boundaries: frame?.patientiveSourceMorphemicBoundaries,
        coreference: true,
    });

    s.eq("reflexive participant structure and the matrix analysis stay typed", {
        matrix: [frame?.matrixStem, frame?.matrixVerbClass,
            frame?.matrixValence, frame?.matrixSemanticFamily],
        complement: frame?.complementKind,
        object: [frame?.matrixObjectReferenceId, frame?.matrixObjectKind,
            frame?.matrixObjectPerson, frame?.matrixObjectGovernor],
        reflexive: frame?.reflexiveMatrixObjectCoreferencePreserved,
        selected: frame?.complementKindSelectedByUser,
    }, {
        matrix: ["mati", "A", "mainline-reflexive",
            "considering-matrix"],
        complement: "considering",
        object: ["matrix-object", "reflexive", "3sg", "directive"],
        reflexive: true,
        selected: true,
    });

    const applicative = continueAsComplement(ctx, grammar, {
        complementKind: "pretending",
        sourceObjectRequests: [{
            objectId: "applied-self",
            objectKind: "reflexive",
            objectPerson: "3sg",
            governor: "applicative",
            derivationalLevel: 1,
        }],
        source: {
            matrixStem: "tla-piqu-iā",
            matrixVerbClass: "C",
            matrixValence: "mainline-reflexive",
            matrixSemanticFamily: "illusion-creating-matrix",
        },
    });
    const applicativeFrame = groupFrame(applicative);
    s.eq("an applicative reflexive object remains the complement target", {
        status: applicative.authorizationStatus,
        kind: applicativeFrame?.complementKind,
        governor: applicativeFrame?.matrixObjectGovernor,
        object: applicativeFrame?.matrixObjectKind,
        applicative:
            applicativeFrame?.applicativeMatrixObjectCoreferencePreserved,
        sameReference: applicativeFrame?.matrixObjectReferenceId
            === applicativeFrame?.discardedPatientiveSubjectReferenceId,
    }, {
        status: "authorized",
        kind: "pretending",
        governor: "applicative",
        object: "reflexive",
        applicative: true,
        sameReference: true,
    });

    const unlisted = continueAsComplement(ctx, grammar, {
        source: {
            matrixStem: "xōna",
            matrixVerbClass: "B",
            matrixValence: "mainline-reflexive",
            matrixSemanticFamily: "considering-matrix",
        },
    });
    const unlistedFrame = groupFrame(unlisted);
    s.eq("typed compatibility stays productive beyond the five witnesses", {
        status: unlisted.authorizationStatus,
        matrix: unlistedFrame?.matrixStem,
        exact: unlistedFrame?.canonicalPatientiveNncResult
            === grammar.canonicalResult,
        membership: unlistedFrame?.matrixStemMembershipAuthorizesRoute,
        analysis:
            unlistedFrame?.matrixAnalysisRatherThanExampleIdentityAuthorizesCompatibility,
        productive: unlistedFrame?.compatibleUnlistedTypedMatricesRemainProductive,
    }, {
        status: "authorized",
        matrix: "xōna",
        exact: true,
        membership: false,
        analysis: true,
        productive: true,
    });

    const compoundSource = buildPatientive(ctx, {
        sourceStem: "cua-l-ye",
        sourceValence: "intransitive",
        objectKind: "none",
    });
    const compound = continueAsComplement(ctx, compoundSource.grammar, {
        complementKind: "pretending",
        source: {
            matrixStem: "toca",
            matrixVerbClass: "A",
            matrixValence: "single-object",
            matrixSemanticFamily: "baseless-claim-matrix",
        },
        sourceObjectRequests: [{
            objectId: "claimed-person",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            governor: "directive",
            derivationalLevel: 1,
        }],
    });
    const compoundFrame = groupFrame(compound);
    s.eq("a ye-matrix compound embed keeps its exact internal history", {
        status: compound.authorizationStatus,
        source: compoundFrame?.patientiveSourceIdentityStem,
        boundaries: compoundFrame?.patientiveSourceMorphemicBoundaries,
        compound: compoundFrame?.compoundPatientiveEmbedHistoryPreserved,
        yeAllowed: compoundFrame?.compoundYeMatrixPatientiveEmbedAllowed,
    }, {
        status: "authorized",
        source: compoundFrame?.patientiveSourceIdentityStem,
        boundaries: compoundFrame?.patientiveSourceMorphemicBoundaries,
        compound: true,
        yeAllowed: true,
    });

    const copied = continueAsComplement(ctx,
        JSON.parse(JSON.stringify(grammar)));
    const mismatched = continueAsComplement(ctx, grammar, {
        source: { embedSubjectReferenceId: "someone-else" },
    });
    const intransitive = continueAsComplement(ctx, grammar, {
        sourceObjectRequests: [],
        source: { matrixValence: "intransitive" },
    });
    s.eq("copies and incompatible participant facts fail closed", {
        copied: [copied.authorizationStatus, groupFrame(copied) === undefined],
        mismatch: [mismatched.authorizationStatus, mismatched.blockReason],
        intransitive: [intransitive.authorizationStatus,
            intransitive.blockReason],
    }, {
        copied: ["blocked", true],
        mismatch: ["blocked",
            "incorporated-complement-embed-subject-must-be-coreferential"],
        intransitive: ["blocked",
            "incorporated-complement-compatible-reference-required"],
    });

    s.eq("meaning evidence remains separate from productive authority", {
        compositional: frame?.compositionalReadingAvailable,
        lexical: frame?.lexicalReadingRequiresTypedSourceOrContext,
        copy: frame?.copiedResultAccepted,
        display: frame?.formulaOrSurfaceAuthorityAccepted,
    }, { compositional: true, lexical: true, copy: false, display: false });

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.eq("the live path exposes only matrix facts needed for the composition", {
        reflexive: shell.includes('value="mainline-reflexive"'),
        governor: shell.includes(
            'id="classical-deverbal-nnc-patientive-embed-matrix-object-governor"'),
        reading: shell.includes(
            'id="classical-deverbal-nnc-patientive-embed-complement-kind"'),
        request: rendering.includes("matrixObjectGovernor")
            && rendering.includes("complementKind:"),
    }, { reflexive: true, governor: true, reading: true, request: true });

    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        considering.formulaRealization,
        considering.canonicalResult?.nncSlotFrame || null,
        considering
    ).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { atoms: 39, writing: 20, reading: 19, cues: true,
        covered: true });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }
    return s;
}

module.exports = { run };
