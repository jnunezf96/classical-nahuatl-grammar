"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson38-patientive-matrix-compound";

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
    const s = createSuite("classical_lesson38_group_16_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson38-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const patientive = buildPatientive(ctx);
    const capture = ctx
        .captureClassicalNahuatlPatientiveNncResultForMatrixContinuation(
            patientive.nnc.canonicalResult
        );
    s.eq("the handoff captures one exact owner-issued patientive Result", {
        statuses: [patientive.vnc.authorizationStatus,
            patientive.nnc.authorizationStatus, capture.authorizationStatus],
        exactPatientive: capture.canonicalPatientiveNncResult
            === patientive.nnc.canonicalResult,
        exactVnc: capture.canonicalVncResult === patientive.vnc.resultFrame,
        stem: capture.sourceStem,
        class: capture.sourceNounClass,
        sourceClass: capture.sourceCompoundClass,
        ancestry: capture.verbalAncestryPreserved,
        authority: [capture.grammarAuthority,
            capture.formulaStringAuthority,
            capture.surfaceStringAuthority],
        frozen: Object.isFrozen(capture),
        validator: ctx.isClassicalNahuatlPatientiveNncContinuationCaptureFrame(
            capture
        ),
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exactPatientive: true, exactVnc: true,
        stem: "tla-pāna-l", class: "tli", sourceClass: "tli-1",
        ancestry: true, authority: [false, false, false], frozen: true,
        validator: true,
    });

    const compound = continueAsMatrix(ctx, patientive.nnc.canonicalResult);
    const applicationCompound = ctx.requestClassicalDeverbalNncResult({
        constructionKind: "patientive-matrix-continuation",
        canonicalPatientiveNncGrammarFrame: patientive.nnc,
        source: { embedStem: "ā", embedSourceClass: "tl-1-a" },
        embedRole: "purpose",
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
    });
    const frame = compound.operationFrame?.patientiveMatrixCompoundFrame;
    s.eq("the canonical compound owner keeps embed before patientive matrix", {
        status: compound.authorizationStatus,
        block: compound.blockReason,
        construction: compound.constructionKind,
        target: compound.operationFrame?.targetStems?.restrictedUse,
        nounClass: compound.operationFrame?.nounClass,
        exactPatientive: frame?.canonicalPatientiveNncResult
            === patientive.nnc.canonicalResult,
        exactVnc: frame?.canonicalVncResult === patientive.vnc.resultFrame,
        embed: [frame?.embedStem, frame?.embedSourceClass],
        matrix: [frame?.matrixStem, frame?.matrixClass],
        relation: frame?.selectedRelation,
        order: frame?.sourceConstituentOrder,
        classGovernance: frame?.matrixGovernsResultClass,
        boundaries: frame?.boundaryBehaviorDerivedAutomatically,
        choices: [frame?.embedAndRelationSelectedByUser,
            frame?.patientiveMatrixSelectedByUser],
        lexical: frame?.lexicalMeaningRequiresTypedSourceOrContext,
        whitelist: frame?.exampleIdentityAuthorizesContinuation,
    }, {
        status: "authorized",
        block: "",
        construction: "patientive-matrix-continuation",
        target: "ā-tla-pāna-l", nounClass: "tli",
        exactPatientive: true, exactVnc: true,
        embed: ["ā", "tl-1-a"], matrix: ["tla-pāna-l", "tli"],
        relation: "purpose", order: ["embed", "matrix"],
        classGovernance: true, boundaries: true,
        choices: [true, false], lexical: true, whitelist: false,
    });
    s.eq("the normal application route returns the same compound Result", {
        status: applicationCompound.authorizationStatus,
        construction: applicationCompound.constructionKind,
        formula: applicationCompound.formulaRealization,
        exact: applicationCompound.operationFrame
            ?.patientiveMatrixCompoundFrame?.canonicalPatientiveNncResult
            === patientive.nnc.canonicalResult,
    }, {
        status: compound.authorizationStatus,
        construction: compound.constructionKind,
        formula: compound.formulaRealization,
        exact: true,
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
    s.eq("unlisted typed embeds and relations use the same productive owner", {
        statuses: productive.map(result => result.authorizationStatus),
        targets: productive.map(result => (
            result.operationFrame?.targetStems?.restrictedUse
        )),
        exact: productive.every(result => (
            result.operationFrame?.patientiveMatrixCompoundFrame
                ?.canonicalPatientiveNncResult
                === patientive.nnc.canonicalResult
        )),
        examples: productive.every(result => (
            result.operationFrame?.patientiveMatrixCompoundFrame
                ?.exampleIdentityAuthorizesContinuation === false
        )),
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        targets: ["tlatzcan-tla-pāna-l", "ten-tla-pāna-l",
            "teō-tla-pāna-l"],
        exact: true, examples: true,
    });

    const secondPatientive = buildPatientive(ctx, {
        sourceStem: "chōca",
        verbClass: "A",
        sourceValence: "projective-human",
    });
    const sameEmbed = continueAsMatrix(
        ctx, secondPatientive.nnc.canonicalResult
    );
    s.eq("changing the typed verbstem shape does not change eligibility", {
        status: sameEmbed.authorizationStatus,
        target: sameEmbed.operationFrame?.targetStems?.restrictedUse,
        exact: sameEmbed.operationFrame?.patientiveMatrixCompoundFrame
            ?.canonicalPatientiveNncResult
            === secondPatientive.nnc.canonicalResult,
    }, { status: "authorized", target: "ā-tla-chōc", exact: true });

    const hostile = [
        { ...patientive.nnc.canonicalResult },
        JSON.parse(JSON.stringify(patientive.nnc.canonicalResult)),
        patientive.nnc.formulaRealization,
        patientive.nnc.wordSurface,
        patientive.vnc.resultFrame,
    ].map(candidate => continueAsMatrix(ctx, candidate));
    s.eq("copies, strings, surfaces, and the wrong Result family stay blocked",
        hostile.map(result => [result.authorizationStatus,
            result.blockReason]),
        hostile.map(() => ["blocked",
            "exact-owner-issued-patientive-nnc-result-required"]));

    const missingEmbed = continueAsMatrix(
        ctx, patientive.nnc.canonicalResult,
        { source: { embedStem: "", embedSourceClass: "tl-1-a" } }
    );
    const missingRelation = continueAsMatrix(
        ctx, patientive.nnc.canonicalResult, { embedRole: "" }
    );
    s.eq("only the real embed and relation choices can block the route", {
        embed: [missingEmbed.authorizationStatus, missingEmbed.blockReason],
        relation: [missingRelation.authorizationStatus,
            missingRelation.blockReason],
    }, {
        embed: ["blocked", "38.2.2-typed-compound-embed-and-class-required"],
        relation: ["blocked",
            "38.2.2-licensed-embed-matrix-relation-required"],
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "patientive-matrix-continuation",
        canonicalPatientiveNncResult: patientive.nnc.canonicalResult,
        source: { embedStem: "ā", embedSourceClass: "tl-1-a" },
        embedRole: "purpose",
        subjects: ["3sg"],
        states: ["absolutive", "possessive"],
        animacy: "nonanimate",
    });
    const parity = ctx.projectClassicalNahuatlParadigmCoordinates(plan);
    s.eq("the handoff keeps scalar and paradigm application identical", {
        status: plan.authorizationStatus,
        count: parity.length,
        scalar: parity.every(item => item.scalarEquivalent),
        exact: parity.every(item => (
            item.preparedFrame.operationFrame?.patientiveMatrixCompoundFrame
                ?.canonicalPatientiveNncResult
                === patientive.nnc.canonicalResult
        )),
    }, { status: "authorized", count: 2, scalar: true, exact: true });

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.eq("the UI asks for the embed, class, and genuine relation", {
        route: shell.includes('value="patientive-matrix-continuation"'),
        embed: shell.includes(
            'id="classical-deverbal-nnc-patientive-matrix-embed-stem"'),
        sourceClass: shell.includes(
            'id="classical-deverbal-nnc-patientive-matrix-embed-class"'),
        relation: shell.includes(
            'id="classical-deverbal-nnc-patientive-matrix-relation"'),
        exactHandoff: rendering.includes(
            "canonicalPatientiveNncGrammarFrame"),
    }, { route: true, embed: true, sourceClass: true,
        relation: true, exactHandoff: true });

    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        compound.formulaRealization,
        compound.canonicalResult?.nncSlotFrame || null,
        compound,
    ).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 42 atoms have jobs and all 10 writing atoms have a cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        cueCount: cues.length,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { records: 42, writing: 10, readingOnly: 32,
        cueCount: 1, covered: true });
    for (const record of writing) {
        s.eq(`cue:${record.atomId}`, covered.has(record.atomId), true);
    }
    return s;
}

module.exports = { run };
