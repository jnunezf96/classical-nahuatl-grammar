"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-compound-embeds";

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

function continuePatientive(ctx, grammar, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncGrammarFrame: grammar,
        compoundTargetKind: "nnc",
        source: {
            matrixStem: "cax",
            matrixNounClass: "tli",
        },
        relation: "association",
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_15_jobs");
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
    }, { atoms: 16, writing: 5, reading: 11, accepted: true });

    const { application, grammar } = buildPatientive(ctx);
    const nominal = continuePatientive(ctx, grammar);
    const nominalFrame = nominal.operationFrame?.patientiveEmbedCompoundFrame;
    s.eq("the exact patientive Result continues as a nominal embed", {
        statuses: [application.authorizationStatus,
            grammar.authorizationStatus, nominal.authorizationStatus],
        exactResult: nominalFrame?.canonicalPatientiveNncResult
            === grammar.canonicalResult,
        exactGrammar: nominalFrame?.canonicalPatientiveNncGrammarFrame
            === grammar,
        embed: nominalFrame?.patientiveEmbedStem,
        target: nominalFrame?.compoundTargetKind,
        matrix: nominalFrame?.matrixStem,
        relation: nominalFrame?.selectedRelation,
        patientiveIsEmbed: nominalFrame?.patientiveResultServesAsEmbed,
        derivation: nominalFrame?.exactSourceAndDerivationRemainAttached,
        automaticBoundary:
            nominalFrame?.boundaryBehaviorDerivedAutomatically,
        relationChoice: nominalFrame?.relationIsGenuineUserChoice,
        nounstemString: nominalFrame?.nounstemStringAccepted,
        compound: nominalFrame?.compoundStem,
        connector: nominal.canonicalResult?.operationFrame?.embedShape
            ?.patientiveCompoundConnector,
        captured: nominal.canonicalResult?.sourceAuthorizationFrame
            ?.lexicalFacts?.capturedEmbedResult === grammar.canonicalResult,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exactResult: true,
        exactGrammar: true,
        embed: "cuica",
        target: "nnc",
        matrix: "cax",
        relation: "association",
        patientiveIsEmbed: true,
        derivation: true,
        automaticBoundary: true,
        relationChoice: true,
        nounstemString: false,
        compound: "cuica-l-cax",
        connector: "l",
        captured: true,
    });

    const verbal = continuePatientive(ctx, grammar, {
        compoundTargetKind: "vnc",
        source: {
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
        },
        relation: "adverb",
        subject: "3sg",
    });
    const verbalFrame = verbal.operationFrame?.patientiveEmbedCompoundFrame;
    s.eq("the same exact Result may enter a separately typed verbal matrix", {
        status: verbal.authorizationStatus,
        exactResult: verbalFrame?.canonicalPatientiveNncResult
            === grammar.canonicalResult,
        target: verbalFrame?.compoundTargetKind,
        matrix: [verbalFrame?.matrixStem, verbalFrame?.matrixVerbClass,
            verbalFrame?.matrixValence],
        relation: verbalFrame?.selectedRelation,
        formula: verbal.formulaRealization,
        connector: verbal.canonicalResult?.operationFrame?.embedShape
            ?.patientiveCompoundConnector,
        bothTargets:
            verbalFrame?.nominalAndVerbalCompoundTargetsAvailable,
        distinctOuterResults:
            verbal.canonicalResult !== nominal.canonicalResult,
    }, {
        status: "authorized",
        exactResult: true,
        target: "vnc",
        matrix: ["chōca", "A", "intransitive"],
        relation: "adverb",
        formula: verbal.formulaRealization,
        connector: "l",
        bothTargets: true,
        distinctOuterResults: true,
    });
    s.ok("the verbal continuation realizes the class-tl patientive connector",
        verbal.formulaRealization.includes("cuica-l-chōca"));

    const noExactResult = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        compoundTargetKind: "nnc",
        source: {
            sourceStem: grammar.operationFrame.targetStems.restrictedUse,
            matrixStem: "cax",
            matrixNounClass: "tli",
        },
        relation: "association",
    });
    const copied = continuePatientive(ctx,
        JSON.parse(JSON.stringify(grammar)));
    const noRelation = continuePatientive(ctx, grammar, { relation: "" });
    s.eq("strings, copies, and omitted real choices cannot bypass capture", {
        rawString: [noExactResult.authorizationStatus,
            noExactResult.blockReason],
        copied: [copied.authorizationStatus,
            copied.blockReason.startsWith(
                "caller-supplied-derived-authority-rejected:"
            ) ? "copied-owner-result-rejected" : copied.blockReason],
        noRelation: [noRelation.authorizationStatus,
            noRelation.blockReason],
        copiedAccepted: nominalFrame?.copiedResultAccepted,
        formulaOrSurface:
            nominalFrame?.formulaOrSurfaceAuthorityAccepted,
        examples: nominalFrame?.exampleIdentityAuthorizesContinuation,
        productive:
            nominalFrame?.compatibleUnlistedPatientiveResultsRemainProductive,
    }, {
        rawString: ["blocked",
            "39.6-exact-owner-issued-patientive-nnc-result-required"],
        copied: ["blocked", "copied-owner-result-rejected"],
        noRelation: ["blocked",
            "39.6-genuine-compound-relation-choice-required"],
        copiedAccepted: false,
        formulaOrSurface: false,
        examples: false,
        productive: true,
    });

    const unlisted = buildPatientive(ctx, "poloa");
    const unlistedCompound = continuePatientive(ctx, unlisted.grammar, {
        source: { matrixStem: "cax", matrixNounClass: "tli" },
        relation: "material",
    });
    s.eq("compatible unlisted patientive Results use the same route", {
        statuses: [unlisted.application.authorizationStatus,
            unlisted.grammar.authorizationStatus,
            unlistedCompound.authorizationStatus],
        exact: unlistedCompound.operationFrame
            ?.patientiveEmbedCompoundFrame?.canonicalPatientiveNncResult
                === unlisted.grammar.canonicalResult,
        relation: unlistedCompound.operationFrame
            ?.patientiveEmbedCompoundFrame?.selectedRelation,
    }, { statuses: ["authorized", "authorized", "authorized"],
        exact: true, relation: "material" });

    const cueResults = [nominal, verbal, unlistedCompound];
    const cues = cueResults.flatMap(candidate => (
        ctx.getClassicalFormulaDerivedAnnotations(
            candidate.formulaRealization,
            candidate.canonicalResult?.nncSlotFrame,
            candidate
        )
    )).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { atoms: 16, writing: 5, reading: 11,
        cues: true, covered: true });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }
    return s;
}

module.exports = { run };
