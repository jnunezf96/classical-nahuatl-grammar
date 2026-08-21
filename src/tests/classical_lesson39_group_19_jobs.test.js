"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-ownerhood-yoa";

function buildPatientive(ctx, fields = {}) {
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: fields.sourceStem || "nōtza",
        verbClass: fields.verbClass || "A",
        sourceValence: fields.sourceValence || "projective-human",
        objectKind: fields.objectKind || "nonspecific-human",
        subject: fields.sourceSubject || "3sg",
        mood: "indicative",
        tense: fields.sourceTense || "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    });
    const grammar = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily:
            fields.patientiveSourceFamily || "imperfective-active-core",
        patientiveAnalogy: fields.patientiveAnalogy || "impersonal",
        canonicalVncResult: application.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: fields.animacy || "animate",
    });
    return { application, grammar };
}

function continueWithTlani(ctx, grammar, fields = {}) {
    const subject = fields.subject || "3sg";
    const matrixValence = fields.matrixValence || "mainline-reflexive";
    const objectKind = fields.objectKind || ({
        "mainline-reflexive": "reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
    })[matrixValence] || "specific-projective";
    const sourceObjectRequests = fields.sourceObjectRequests || [{
        objectId: fields.objectId || "desired-object",
        objectKind,
        objectPerson: objectKind === "reflexive" ? subject : "",
        governor: fields.governor || "directive",
        derivationalLevel: 1,
    }];
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncGrammarFrame: grammar,
        compoundTargetKind: "vnc",
        source: {
            matrixStem: fields.matrixStem || "tlani",
            matrixVerbClass: fields.matrixVerbClass || "A",
            matrixValence,
            matrixSemanticFamily:
                fields.matrixSemanticFamily || "short-a-desiderative-tlani",
            sourceObjectRequests,
            objectReferenceIds: sourceObjectRequests.map(item => item.objectId),
        },
        relation: fields.relation || "complement",
        orientation: fields.orientation || "object",
        complementKind: fields.complementKind || "desiring",
        subject,
        mood: "indicative",
        tense: "present",
        voice: "active",
    });
}

function groupFrame(result) {
    return result.operationFrame?.patientiveEmbedCompoundFrame
        ?.patientiveTlaniDesiderativeFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_19_jobs");
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
        correctedJob: writing.every(record => (
            record.proposedWritingJob
                === "CONTINUE_EXACT_PATIENTIVE_RESULT_THROUGH_SHORT_A_TLANI_MATRIX"
        )),
        noYoaJob: records.every(record => (
            !/YOA|ABUNDANT_OWNERHOOD/u.test(
                record.proposedWritingJob || ""
            )
        )),
    }, { atoms: 48, writing: 24, reading: 24, accepted: true,
        correctedJob: true, noYoaJob: true });

    const { application, grammar } = buildPatientive(ctx);
    const reflexive = continueWithTlani(ctx, grammar);
    const frame = groupFrame(reflexive);
    s.eq("short-a tlani preserves the exact patientive and its ancestry", {
        statuses: [application.authorizationStatus,
            grammar.authorizationStatus, reflexive.authorizationStatus],
        exactResult: frame?.canonicalPatientiveNncResult
            === grammar.canonicalResult,
        exactSource: frame?.canonicalPatientiveSourceFrame
            === grammar.sourceFrame,
        exactVnc: frame?.canonicalPatientiveVncResult
            === application.resultFrame,
        exactIdentity: frame?.exactPatientiveResultIdentityPreserved,
        completeHistory:
            frame?.completePatientiveSourceAndVncAncestryPreserved,
        state: frame?.patientiveSourceState,
        source: frame?.patientiveSourceIdentityStem,
        family: frame?.patientiveSourceFamily,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exactResult: true,
        exactSource: true,
        exactVnc: true,
        exactIdentity: true,
        completeHistory: true,
        state: "absolutive",
        source: frame?.patientiveSourceIdentityStem,
        family: "imperfective-active-core",
    });

    s.eq("the two tlani matrices remain lexically and phonologically distinct", {
        matrix: frame?.matrixStem,
        analysis: frame?.matrixLexicalAnalysis,
        quantity: frame?.matrixFinalVowelQuantity,
        contrast: [frame?.contrastingLongAStem,
            frame?.contrastingLongAReading],
        distinct: frame?.shortAndLongAMatricesRemainDistinct,
        matrixOnly: frame?.onlyLicensedAsMatrixSubpositionInThisFormation,
        complement: frame?.complementKind,
    }, {
        matrix: "tlani",
        analysis: "short-a-desiderative-tlani",
        quantity: "short-a",
        contrast: ["tlāni", "win-something-in-a-game"],
        distinct: true,
        matrixOnly: true,
        complement: "desiring",
    });

    s.eq("a reflexive human automatically receives m-o", {
        object: [frame?.desiredObjectReferenceId, frame?.desiredObjectKind,
            frame?.desiredObjectPerson, frame?.desiredObjectGovernor],
        carrier: frame?.objectCarrier,
        derived: frame?.objectCarrierDerivedFromTypedParticipantStructure,
        coreference: frame?.reflexiveSubjectAndDesiredHumanCoreferential,
        human: frame?.humanDesiredObjectPreserved,
        nonhuman: frame?.nonhumanDesiredObjectPreserved,
    }, {
        object: ["desired-object", "reflexive", "3sg", "directive"],
        carrier: "m-o",
        derived: true,
        coreference: true,
        human: false,
        nonhuman: false,
    });

    const human = continueWithTlani(ctx, grammar, {
        matrixValence: "projective-human",
    });
    const humanFrame = groupFrame(human);
    const nonhuman = continueWithTlani(ctx, grammar, {
        matrixValence: "projective-nonhuman",
    });
    const nonhumanFrame = groupFrame(nonhuman);
    s.eq("human and nonhuman desired objects derive their own carriers", {
        human: [human.authorizationStatus, humanFrame?.desiredObjectKind,
            humanFrame?.objectCarrier,
            humanFrame?.humanDesiredObjectPreserved],
        nonhuman: [nonhuman.authorizationStatus,
            nonhumanFrame?.desiredObjectKind,
            nonhumanFrame?.objectCarrier,
            nonhumanFrame?.nonhumanDesiredObjectPreserved],
    }, {
        human: ["authorized", "nonspecific-human", "tē", true],
        nonhuman: ["authorized", "nonspecific-nonhuman", "tla", true],
    });

    const unlistedSource = buildPatientive(ctx, {
        sourceStem: "xōna",
    });
    const unlisted = continueWithTlani(ctx, unlistedSource.grammar, {
        matrixValence: "projective-nonhuman",
    });
    const unlistedFrame = groupFrame(unlisted);
    s.eq("an unlisted exact patientive Result uses the same typed rule", {
        statuses: [unlistedSource.application.authorizationStatus,
            unlistedSource.grammar.authorizationStatus,
            unlisted.authorizationStatus],
        source: unlistedFrame?.patientiveSourceIdentityStem,
        exact: unlistedFrame?.canonicalPatientiveNncResult
            === unlistedSource.grammar.canonicalResult,
        productive:
            unlistedFrame?.compatibleUnlistedPatientiveResultsRemainProductive,
        membership:
            unlistedFrame?.matrixStemMembershipAuthorizesGeneralPatientiveRoute,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        source: unlistedFrame?.patientiveSourceIdentityStem,
        exact: true,
        productive: true,
        membership: false,
    });

    s.eq("reading evidence stays separate from productive authority", {
        readings: frame?.compositionalReadings,
        procedures: frame?.alternatePatientiveProceduresRemainDistinct,
        upstream: frame?.upstreamPatientiveProcedurePreservedAutomatically,
        lexical: frame?.idiomaticReadingRequiresTypedLexicalSourceOrContext,
        examples: frame?.examplesAuthorizeRoute,
        translations: frame?.translationsAuthorizeStructure,
        copied: frame?.copiedResultAccepted,
        display: frame?.formulaOrSurfaceAuthorityAccepted,
    }, {
        readings: [
            "desire-object-to-become-patientive-referent",
            "desire-object-to-be-regarded-as-patientive-referent",
        ],
        procedures: true,
        upstream: true,
        lexical: true,
        examples: false,
        translations: false,
        copied: false,
        display: false,
    });

    const longA = continueWithTlani(ctx, grammar, { matrixStem: "tlāni" });
    const wrongReading = continueWithTlani(ctx, grammar, {
        complementKind: "considering",
    });
    const copied = continueWithTlani(
        ctx, JSON.parse(JSON.stringify(grammar))
    );
    s.eq("lookalikes, another reading, and copied Results do not gain the rule", {
        longA: [longA.authorizationStatus, Boolean(groupFrame(longA))],
        wrongReading: [wrongReading.authorizationStatus,
            Boolean(groupFrame(wrongReading))],
        copied: [copied.authorizationStatus, Boolean(groupFrame(copied))],
    }, {
        longA: ["authorized", false],
        wrongReading: ["authorized", false],
        copied: ["blocked", false],
    });

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.eq("the live path exposes the intended reading but derives its analysis", {
        reading: shell.includes(
            '<option value="desiring">wanting to become or be regarded as</option>'
        ),
        analysis: rendering.includes(
            'complementKind === "desiring"'
        ) && rendering.includes('"short-a-desiderative-tlani"'),
        frame: rendering.includes("patientiveTlaniDesiderativeFrame"),
    }, { reading: true, analysis: true, frame: true });

    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        reflexive.formulaRealization,
        reflexive.canonicalResult?.nncSlotFrame || null,
        reflexive
    ).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { atoms: 48, writing: 24, reading: 24, cues: true,
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
