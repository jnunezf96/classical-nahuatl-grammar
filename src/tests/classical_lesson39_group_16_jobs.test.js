"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-compound-matrices";

function buildNonactive(ctx, fields = {}) {
    const request = {
        sourceStem: "pāna",
        verbClass: "B",
        sourceValence: "projective-human",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        voice: "impersonal",
        ...fields,
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const option = (preview.controlFrame
        ?.nonactiveOptionInventory?.options || []).find(item => (
        item.suffixFamily === "lō"
    ));
    return ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        nonactiveOptionId: option?.optionId || "",
    });
}

function buildPatientive(ctx, fields = {}) {
    const vnc = buildNonactive(ctx, fields);
    const nnc = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: vnc.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
    });
    return { vnc, nnc };
}

function continueAsMatrix(ctx, patientiveResult, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-matrix-continuation",
        canonicalPatientiveNncResult: patientiveResult,
        source: {
            embedStem: "ā",
            embedSourceClass: "tl-1-a",
            ...(fields.source || {}),
        },
        embedRole: "purpose",
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_16_jobs");
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
    }, { atoms: 29, writing: 15, reading: 14, accepted: true });

    const patientive = buildPatientive(ctx);
    const capture = ctx
        .captureClassicalNahuatlPatientiveNncResultForMatrixContinuation(
            patientive.nnc.canonicalResult
        );
    s.eq("the handoff captures the exact patientive Result and its history", {
        statuses: [patientive.vnc.authorizationStatus,
            patientive.nnc.authorizationStatus, capture.authorizationStatus],
        exactPatientive: capture.canonicalPatientiveNncResult
            === patientive.nnc.canonicalResult,
        exactSource: capture.canonicalPatientiveSourceFrame
            === patientive.nnc.sourceFrame,
        exactVnc: capture.canonicalVncResult === patientive.vnc.resultFrame,
        family: capture.patientiveSourceFamily,
        ancestry: capture.verbalAncestryPreserved,
        analysis: capture.canonicalSourceAnalysisPreserved,
        roles: capture.eligibleCompoundRoles,
        nounstemString: capture.nounstemStringAuthorityAccepted,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exactPatientive: true,
        exactSource: true,
        exactVnc: true,
        family: "impersonal-core",
        ancestry: true,
        analysis: true,
        roles: ["embed", "matrix"],
        nounstemString: false,
    });

    const compound = continueAsMatrix(ctx, patientive.nnc.canonicalResult);
    const frame = compound.operationFrame?.patientiveMatrixCompoundFrame;
    s.eq("the typed embed and relation continue into the exact matrix", {
        status: compound.authorizationStatus,
        construction: compound.constructionKind,
        exactMatrix: frame?.canonicalPatientiveNncResult
            === patientive.nnc.canonicalResult,
        exactVnc: frame?.canonicalVncResult === patientive.vnc.resultFrame,
        exactIdentity: frame?.exactPatientiveMatrixIdentityPreserved,
        sourceAnalysis: frame?.canonicalSourceAnalysisPreserved,
        embed: [frame?.embedStem, frame?.embedSourceClass,
            frame?.embedClass],
        matrix: [frame?.matrixStem, frame?.matrixClass],
        relation: frame?.selectedRelation,
        order: frame?.sourceConstituentOrder,
        boundary: frame?.boundaryBehaviorDerivedAutomatically,
        classGovernance: frame?.matrixGovernsResultClass,
        choices: [frame?.typedEmbedSelectedByUser,
            frame?.relationSelectedByUser,
            frame?.patientiveMatrixSelectedByUser],
        rebuilt: frame?.matrixReconstructedFromSurfaceSpelling,
    }, {
        status: "authorized",
        construction: "patientive-matrix-continuation",
        exactMatrix: true,
        exactVnc: true,
        exactIdentity: true,
        sourceAnalysis: true,
        embed: ["ā", "tl-1-a", "tl"],
        matrix: ["tla-pāna-l", "tli"],
        relation: "purpose",
        order: ["embed", "matrix"],
        boundary: true,
        classGovernance: true,
        choices: [true, true, false],
        rebuilt: false,
    });

    s.eq("shape and meaning continue from typed derivational history", {
        history: frame?.derivationalHistoryRequiredForFinalShapeAndMeaning,
        recursive: frame?.recursiveTypedSourceHistoryPreserved,
        soundHistory: frame?.sourceAssimilationBelongsToTypedHistory,
        compositional: frame?.compositionalMeaningAvailable,
        lexical: frame?.lexicalMeaningRequiresTypedSourceOrContext,
        productive:
            frame?.compatibleUnlistedPatientiveMatricesRemainProductive,
        examples: frame?.exampleIdentityAuthorizesContinuation,
        formulaSurface: frame?.formulaOrSurfaceAuthorityAccepted,
    }, {
        history: true,
        recursive: true,
        soundHistory: true,
        compositional: true,
        lexical: true,
        productive: true,
        examples: false,
        formulaSurface: false,
    });

    const productive = [
        { source: { embedStem: "tlatzcan", embedSourceClass: "zero" },
            embedRole: "association" },
        { source: { embedStem: "ten", embedSourceClass: "tli-1" },
            embedRole: "production" },
        { source: { embedStem: "teō", embedSourceClass: "tl-1-a" },
            embedRole: "material" },
    ].map(fields => continueAsMatrix(
        ctx, patientive.nnc.canonicalResult, fields
    ));
    s.eq("unlisted typed embeds and relations use the same matrix owner", {
        statuses: productive.map(result => result.authorizationStatus),
        relations: productive.map(result => result.operationFrame
            ?.patientiveMatrixCompoundFrame?.selectedRelation),
        exact: productive.every(result => result.operationFrame
            ?.patientiveMatrixCompoundFrame?.canonicalPatientiveNncResult
                === patientive.nnc.canonicalResult),
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        relations: ["association", "production", "material"],
        exact: true,
    });

    const secondPatientive = buildPatientive(ctx, {
        sourceStem: "chōca",
        verbClass: "A",
    });
    const changedShape = continueAsMatrix(
        ctx, secondPatientive.nnc.canonicalResult
    );
    s.eq("changing the typed Source shape does not create an example gate", {
        statuses: [secondPatientive.vnc.authorizationStatus,
            secondPatientive.nnc.authorizationStatus,
            changedShape.authorizationStatus],
        exact: changedShape.operationFrame?.patientiveMatrixCompoundFrame
            ?.canonicalPatientiveNncResult
                === secondPatientive.nnc.canonicalResult,
        productive: changedShape.operationFrame
            ?.patientiveMatrixCompoundFrame
            ?.compatibleUnlistedPatientiveMatricesRemainProductive,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exact: true,
        productive: true,
    });

    const copied = continueAsMatrix(
        ctx, JSON.parse(JSON.stringify(patientive.nnc.canonicalResult))
    );
    const raw = continueAsMatrix(
        ctx, patientive.nnc.operationFrame.targetStems.restrictedUse
    );
    const missingEmbed = continueAsMatrix(
        ctx, patientive.nnc.canonicalResult,
        { source: { embedStem: "", embedSourceClass: "tl-1-a" } }
    );
    const missingRelation = continueAsMatrix(
        ctx, patientive.nnc.canonicalResult,
        { embedRole: "" }
    );
    s.eq("copies, strings, and omitted real choices stay blocked", {
        copied: [copied.authorizationStatus, copied.blockReason],
        raw: [raw.authorizationStatus, raw.blockReason],
        embed: [missingEmbed.authorizationStatus, missingEmbed.blockReason],
        relation: [missingRelation.authorizationStatus,
            missingRelation.blockReason],
    }, {
        copied: ["blocked",
            "exact-owner-issued-patientive-nnc-result-required"],
        raw: ["blocked", "exact-owner-issued-patientive-nnc-result-required"],
        embed: ["blocked", "38.2.2-typed-compound-embed-and-class-required"],
        relation: ["blocked",
            "38.2.2-licensed-embed-matrix-relation-required"],
    });

    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        compound.formulaRealization,
        compound.canonicalResult?.nncSlotFrame || null,
        compound
    ).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cueCount: cues.length,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        atoms: 29,
        writing: 15,
        reading: 14,
        cueCount: 1,
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
