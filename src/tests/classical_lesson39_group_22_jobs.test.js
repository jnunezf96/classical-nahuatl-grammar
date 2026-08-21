"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-incorporated-objects";
const WRITING_JOB =
    "CONTINUE_EXACT_PATIENTIVE_RESULT_AS_INCORPORATED_OBJECT";

function buildPossessivePatientive(ctx, fields = {}) {
    const sourceValence = fields.sourceValence || "intransitive";
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: fields.sourceStem || "cuica",
        verbClass: fields.verbClass || "A",
        sourceValence,
        ...(sourceValence === "intransitive"
            ? {}
            : {
                objectKind: fields.objectKind || "specific-projective",
                objectPerson: fields.objectPerson || "3sg",
            }),
        subject: fields.sourceSubject || "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    });
    const grammar = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: fields.patientiveAnalogy || "impersonal",
        canonicalVncResult: application.resultFrame,
        subject: "3sg",
        state: fields.state || "possessive",
        possessor: fields.possessor || "nonspecific-human",
        animacy: "animate",
    });
    return { application, grammar };
}

function continueAsObject(ctx, grammar, fields = {}) {
    const request = {
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncGrammarFrame: grammar,
        compoundTargetKind: "vnc",
        source: {
            matrixStem: fields.matrixStem || "tlani",
            matrixVerbClass: fields.matrixVerbClass || "A",
            matrixValence: fields.matrixValence || "single-object",
            matrixSemanticFamily: fields.matrixSemanticFamily
                || "patientive-incorporated-object-matrix",
            sourceObjectRequests: fields.sourceObjectRequests || [{
                objectId: "incorporated-patientive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                governor: "directive",
                derivationalLevel: 1,
            }],
        },
        relation: fields.relation || "object",
        subject: fields.subject || "1sg",
        mood: "indicative",
        tense: fields.tense || "present",
        voice: fields.voice || "active",
    };
    return fields.applicationBoundary
        ? ctx.requestClassicalDeverbalNncResult(request)
        : ctx.evaluateClassicalNahuatlDeverbalNnc(request);
}

function groupFrame(result) {
    return result?.operationFrame?.patientiveEmbedCompoundFrame
        ?.patientiveIncorporatedObjectFrame || null;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_22_jobs");
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
        job: writing.every(record => record.proposedWritingJob === WRITING_JOB),
    }, { atoms: 26, writing: 18, reading: 8, accepted: true, job: true });

    const source = buildPossessivePatientive(ctx, {
        possessor: "nonspecific-human",
    });
    const active = continueAsObject(ctx, source.grammar);
    const frame = groupFrame(active);
    s.eq("the exact patientive Result and VNC ancestry survive", {
        statuses: [source.application.authorizationStatus,
            source.grammar.authorizationStatus, active.authorizationStatus],
        reasons: [source.application.blockReason || "",
            source.grammar.blockReason || "", active.blockReason || ""],
        exactResult: frame?.canonicalPatientiveNncResult
            === source.grammar.canonicalResult,
        exactSource: frame?.canonicalPatientiveSourceFrame
            === source.grammar.sourceFrame,
        exactVnc: frame?.canonicalPatientiveVncResult
            === source.application.resultFrame,
        state: frame?.patientiveSourceState,
        possessor: frame?.patientiveSourcePossessor,
        ancestry: frame?.completePatientiveSourceAndVncAncestryPreserved,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        reasons: ["", "", ""],
        exactResult: true,
        exactSource: true,
        exactVnc: true,
        state: "possessive",
        possessor: "nonspecific-human",
        ancestry: true,
    });

    s.eq("the patientive is internal while the ex-possessor is external", {
        patientiveRole: frame?.patientiveResultServesAsIncorporatedObject,
        inside: frame?.incorporatedObjectInsideVerbstem,
        outside: frame?.externalPossessorObjectOutsideVerbstem,
        externalValence: frame?.incorporatedObjectOccupiesExternalValencePosition,
        roles: [frame?.possessorSourceRole, frame?.possessorTargetRole],
        cases: [frame?.possessorSourceCase, frame?.possessorTargetCase],
    }, {
        patientiveRole: true,
        inside: true,
        outside: true,
        externalValence: false,
        roles: ["possessor", "mainline-applicative-object"],
        cases: ["possessive", "objective"],
    });

    s.eq("the matrix keeps its valence without an applicative suffix", {
        counts: [frame?.sourceValencePositionCount,
            frame?.targetValencePositionCount],
        preserved: frame?.matrixValencePreserved,
        suffix: frame?.applicativeSuffixAdded,
        violation: frame?.ordinaryValencePrincipleViolated,
        split: frame?.transitiveForceDischargedAcrossInternalAndExternalObjects,
        automatic: frame?.transformationDerivedAutomatically,
        choice: frame?.userChoiceRequired,
    }, {
        counts: [1, 1],
        preserved: true,
        suffix: false,
        violation: true,
        split: true,
        automatic: true,
        choice: false,
    });

    s.eq("a nonspecific human possessor becomes tē", {
        kind: frame?.transformedApplicativeObjectKind,
        governor: frame?.transformedApplicativeObjectGovernor,
        formulaHasTe: (active.formulaRealization || "").includes("tē"),
        formulaHasCompound: (active.formulaRealization || "")
            .includes("cuica-tlani"),
        formula: active.formulaRealization,
    }, {
        kind: "nonspecific-human",
        governor: "applicative",
        formulaHasTe: true,
        formulaHasCompound: true,
        formula: "#ni-0+tē(cuica-tlani)0+0-0#",
    });

    const thirdPluralSource = buildPossessivePatientive(ctx, {
        possessor: "3pl",
    });
    const ihTlani = continueAsObject(ctx, thirdPluralSource.grammar, {
        matrixStem: "ih-tlani",
    });
    const ihTlaniFrame = groupFrame(ihTlani);
    s.eq("third-plural possessor and compound ih-tlani stay typed", {
        sourceStatuses: [thirdPluralSource.application.authorizationStatus,
            thirdPluralSource.grammar.authorizationStatus],
        sourceReasons: [thirdPluralSource.application.blockReason || "",
            thirdPluralSource.grammar.blockReason || ""],
        status: ihTlani.authorizationStatus,
        person: ihTlaniFrame?.transformedApplicativeObjectPerson,
        kind: ihTlaniFrame?.transformedApplicativeObjectKind,
        matrix: ihTlaniFrame?.matrixStem,
        boundaries: ihTlaniFrame?.matrixMorphemicBoundaries,
        compound: ihTlaniFrame?.internallyCompoundMatrixPreserved,
        innerTlani: ihTlaniFrame?.ihTlaniInternalTlaniMatrixPreserved,
        formulaHasObject: (ihTlani.formulaRealization || "").includes("qu-in"),
    }, {
        sourceStatuses: ["authorized", "authorized"],
        sourceReasons: ["", ""],
        status: "authorized",
        person: "3pl",
        kind: "specific-projective",
        matrix: "ih-tlani",
        boundaries: ["ih", "tlani"],
        compound: true,
        innerTlani: true,
        formulaHasObject: true,
    });

    const firstPluralSource = buildPossessivePatientive(ctx, {
        possessor: "1pl",
    });
    const temo = continueAsObject(ctx, firstPluralSource.grammar, {
        matrixStem: "tēm-o-ā",
        matrixVerbClass: "C",
        tense: "future",
        subject: "3pl",
    });
    const temoFrame = groupFrame(temo);
    s.eq("first-plural possessor becomes the future matrix object", {
        status: temo.authorizationStatus,
        person: temoFrame?.transformedApplicativeObjectPerson,
        kind: temoFrame?.transformedApplicativeObjectKind,
        governor: temoFrame?.transformedApplicativeObjectGovernor,
        formulaHasObject: (temo.formulaRealization || "").includes("t-ēch"),
        formulaHasMatrix: (temo.formulaRealization || "")
            .includes("cuica-tēm-ō"),
        formula: temo.formulaRealization || "",
        reason: temo.blockReason || "",
    }, {
        status: "authorized",
        person: "1pl",
        kind: "specific-projective",
        governor: "applicative",
        formulaHasObject: true,
        formulaHasMatrix: true,
        formula: "#0-0+t-ēch(cuica-tēm-ō)z+qu-eh#",
        reason: "",
    });

    const hostileMatrix = continueAsObject(ctx, source.grammar, {
        matrixStem: "xōchi-quetza",
        matrixVerbClass: "B",
    });
    s.eq("an unlisted compatible typed matrix follows the same rule", {
        status: hostileMatrix.authorizationStatus,
        frame: Boolean(groupFrame(hostileMatrix)),
        matrix: groupFrame(hostileMatrix)?.matrixStem,
        productive:
            groupFrame(hostileMatrix)
                ?.compatibleUnlistedTypedMatricesRemainProductive,
        whitelist:
            groupFrame(hostileMatrix)?.matrixStemMembershipAuthorizesRoute,
    }, {
        status: "authorized",
        frame: true,
        matrix: "xōchi-quetza",
        productive: true,
        whitelist: false,
    });

    let delivered = null;
    let deliveryError = "";
    try {
        delivered = continueAsObject(ctx, source.grammar, {
            applicationBoundary: true,
        });
    } catch (error) {
        deliveryError = String(error?.message || error);
    }
    s.eq("the application boundary delivers the same composition", {
        recognized: ctx.isClassicalNahuatlDeverbalNncGrammarFrame?.(
            source.grammar
        ) === true,
        error: deliveryError,
        status: delivered?.authorizationStatus || "",
        same: delivered?.formulaRealization === active.formulaRealization,
    }, { recognized: true, error: "", status: "authorized", same: true });

    const ordinaryObject = continueAsObject(ctx, source.grammar, {
        matrixSemanticFamily: "typed-matrix",
    });
    s.eq("ordinary incorporation does not silently claim the special rule", {
        status: ordinaryObject.authorizationStatus,
        special: Boolean(groupFrame(ordinaryObject)),
    }, { status: "authorized", special: false });

    const absolutive = buildPossessivePatientive(ctx, {
        state: "absolutive",
    });
    const wrongState = continueAsObject(ctx, absolutive.grammar);
    s.eq("absolutive state does not manufacture possessor transfer", {
        status: wrongState.authorizationStatus,
        special: Boolean(groupFrame(wrongState)),
    }, { status: "authorized", special: false });

    const intransitiveMatrix = continueAsObject(ctx, source.grammar, {
        matrixValence: "intransitive",
        sourceObjectRequests: [],
    });
    s.eq("an intransitive matrix cannot discharge an incorporated object", {
        status: intransitiveMatrix.authorizationStatus,
        reason: intransitiveMatrix.blockReason,
    }, {
        status: "blocked",
        reason: "incorporated-object-requires-transitive-matrix",
    });

    const copied = JSON.parse(JSON.stringify(source.grammar.canonicalResult));
    const copiedResult = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncResult: copied,
        compoundTargetKind: "vnc",
        source: {
            matrixStem: "tlani",
            matrixVerbClass: "A",
            matrixValence: "single-object",
            matrixSemanticFamily: "patientive-incorporated-object-matrix",
        },
        relation: "object",
        subject: "1sg",
    });
    s.eq("a copied Result cannot authorize continuation", {
        status: copiedResult.authorizationStatus,
        reason: copiedResult.blockReason,
    }, {
        status: "blocked",
        reason: "exact-owner-issued-patientive-nnc-result-required",
    });

    const stringOnly = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        compoundTargetKind: "vnc",
        source: {
            embedStem: source.grammar.operationFrame?.targetStems?.generalUse,
            matrixStem: "tlani",
            matrixVerbClass: "A",
            matrixValence: "single-object",
            matrixSemanticFamily: "patientive-incorporated-object-matrix",
        },
        relation: "object",
        subject: "1sg",
    });
    s.eq("a nounstem string cannot replace the exact Result", {
        status: stringOnly.authorizationStatus,
        reason: stringOnly.blockReason,
    }, {
        status: "blocked",
        reason: "39.6-exact-owner-issued-patientive-nnc-result-required",
    });

    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"
    ), "utf8");
    s.ok("the Result exposes a clickable Group 22 cue",
        rendering.includes("lesson39-patientive-incorporated-objects")
        && rendering.includes("patientiveIncorporatedObjectFrame"));

    return s;
}

module.exports = { run };
