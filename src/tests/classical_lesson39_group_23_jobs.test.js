"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-life-heart-embed-contrast";
const WRITING_JOB = "PRESERVE_LIFE_HEART_EMBED_SOURCE_CONTRAST";

function ordinaryResult(ctx, stem, sourceClass = "") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
        ...(sourceClass ? { sourceClass } : {}),
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: source.allowedStateValues?.includes("absolutive")
                ? "absolutive" : "possessive",
            subject: "3common",
            humanness: "nonhuman",
            possessor: source.allowedStateValues?.includes("absolutive")
                ? "" : "3sg",
            predicateFormation: "source-stem",
            stemFormation: "plain",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.evaluateClassicalNahuatlOrdinaryNnc(source, operation);
}

function characteristicFromOrdinary(ctx, stem, sourceClass = "") {
    const sourceResult = ordinaryResult(ctx, stem, sourceClass);
    const grammar = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult: sourceResult,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    return { sourceResult, grammar };
}

function characteristicFromPreteritAgentive(ctx, stem = "tōna") {
    const vnc = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: stem,
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "preterit",
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
    const agentive = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        canonicalVncResult: vnc.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    const grammar = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult: agentive.canonicalResult,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    return { vnc, agentive, grammar };
}

function continueAsEmbed(ctx, grammar, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncGrammarFrame: grammar,
        compoundTargetKind: fields.compoundTargetKind || "nnc",
        characteristicMatrixRealization: fields.realization,
        source: {
            matrixStem: fields.matrixStem || "tepē",
            ...(fields.compoundTargetKind === "vnc"
                ? {
                    matrixVerbClass: fields.matrixVerbClass || "A",
                    matrixValence: fields.matrixValence || "intransitive",
                }
                : { matrixNounClass: fields.matrixNounClass || "tl" }),
        },
        relation: fields.relation || "character",
        subject: fields.subject || "3common",
        state: fields.state || "absolutive",
        animacy: "nonanimate",
    });
}

function groupFrame(result) {
    return result?.operationFrame?.patientiveEmbedCompoundFrame || null;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_23_jobs");
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
    }, { atoms: 33, writing: 19, reading: 14, accepted: true, job: true });

    const heart = characteristicFromOrdinary(ctx, "yōl", "tli-1");
    const heartFull = continueAsEmbed(ctx, heart.grammar, {
        compoundTargetKind: "vnc",
        realization: "full",
        matrixStem: "chicāhua",
        relation: "adverb",
        subject: "3sg",
    });
    const heartShort = continueAsEmbed(ctx, heart.grammar, {
        compoundTargetKind: "vnc",
        realization: "omitted",
        matrixStem: "chicāhua",
        relation: "adverb",
        subject: "3sg",
    });
    const heartFrame = groupFrame(heartShort);
    s.eq("heart embeds keep the full typed Result while yō may be omitted", {
        source: heart.grammar.authorizationStatus,
        full: [heartFull.authorizationStatus,
            groupFrame(heartFull)?.compoundStem],
        short: [heartShort.authorizationStatus, heartFrame?.compoundStem],
        stems: [heartFrame?.characteristicMatrixFullEmbedStem,
            heartFrame?.characteristicMatrixOmittedEmbedStem],
        realization: heartFrame?.characteristicMatrixRealization,
        exact: heartFrame?.canonicalPatientiveNncResult
            === heart.grammar.canonicalResult,
        meaning: heartFrame?.fullCharacteristicMeaningPreservedWhenMatrixIsOmitted,
        choice: heartFrame?.characteristicMatrixRealizationIsGenuineUserChoice,
    }, {
        source: "authorized",
        full: ["authorized", "yōl-lō-chicāhua"],
        short: ["authorized", "yōl-chicāhua"],
        stems: ["yōl-lō", "yōl"],
        realization: "omitted",
        exact: true,
        meaning: true,
        choice: true,
    });

    const produce = characteristicFromPreteritAgentive(ctx);
    const produceFull = continueAsEmbed(ctx, produce.grammar, {
        realization: "full",
    });
    const produceShort = continueAsEmbed(ctx, produce.grammar, {
        realization: "omitted",
    });
    const produceFrame = groupFrame(produceShort);
    s.eq("preterit-agentive characteristic embeds preserve tōna and both forms", {
        statuses: [produce.vnc.authorizationStatus,
            produce.agentive.authorizationStatus,
            produce.grammar.authorizationStatus,
            produceFull.authorizationStatus, produceShort.authorizationStatus],
        stems: [groupFrame(produceFull)?.compoundStem,
            produceFrame?.compoundStem],
        exact: produceFrame?.canonicalPatientiveNncResult
            === produce.grammar.canonicalResult,
        tōna: produceFrame?.initialTōBelongsToTypedVerbstem,
        possessor: produceFrame?.initialTōIsPossessorPronoun,
        connector: produceFrame?.preteritAgentiveNum1Connector,
        sameMeaning: produceFrame?.fullCharacteristicMeaningPreservedWhenMatrixIsOmitted,
        frequency: produceFrame?.frequencyFactIsReadingOnly,
    }, {
        statuses: Array.from({ length: 5 }, () => "authorized"),
        stems: ["tōna-0-cā-yō-tepē", "tōna-0-cā-tepē"],
        exact: true,
        tōna: true,
        possessor: false,
        connector: "ti",
        sameMeaning: true,
        frequency: true,
    });

    const unlisted = characteristicFromOrdinary(ctx, "zahui", "tl-1-a");
    const unlistedShort = continueAsEmbed(ctx, unlisted.grammar, {
        realization: "omitted",
        matrixStem: "xōchi",
    });
    s.eq("an unlisted compatible characteristic Result follows the rule", {
        status: unlistedShort.authorizationStatus,
        stem: groupFrame(unlistedShort)?.compoundStem,
        productive: groupFrame(unlistedShort)
            ?.compatibleUnlistedPatientiveResultsRemainProductive,
        exampleGate: groupFrame(unlistedShort)
            ?.exampleIdentityAuthorizesContinuation,
    }, {
        status: "authorized",
        stem: "zahui-xōchi",
        productive: true,
        exampleGate: false,
    });

    const missingChoice = continueAsEmbed(ctx, heart.grammar, {
        compoundTargetKind: "vnc",
        matrixStem: "chicāhua",
        relation: "adverb",
    });
    const copied = continueAsEmbed(ctx, {
        ...heart.grammar,
        canonicalResult: JSON.parse(JSON.stringify(
            heart.grammar.canonicalResult
        )),
    }, { realization: "omitted" });
    const stringOnly = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive-embed-continuation",
        compoundTargetKind: "nnc",
        characteristicMatrixRealization: "omitted",
        source: { embedStem: "yōl", matrixStem: "xōchi" },
        relation: "character",
    });
    s.eq("missing choices, copied Results, and strings cannot authorize", {
        missing: [missingChoice.authorizationStatus, missingChoice.blockReason],
        copied: [copied.authorizationStatus, copied.blockReason],
        string: [stringOnly.authorizationStatus, stringOnly.blockReason],
    }, {
        missing: ["blocked",
            "39.9-full-or-omitted-characteristic-matrix-choice-required"],
        copied: ["blocked",
            "39.6-owner-issued-patientive-nnc-grammar-frame-required"],
        string: ["blocked",
            "39.6-exact-owner-issued-patientive-nnc-result-required"],
    });

    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"
    ), "utf8");
    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"
    ), "utf8");
    s.ok("Grammar exposes the genuine full-versus-omitted choice",
        shell.includes("classical-deverbal-nnc-characteristic-embed-realization")
        && shell.includes('<option value="full">keep the full yō formation</option>')
        && shell.includes('<option value="omitted">omit the yō matrix, keep its meaning</option>')
        && rendering.includes("buildCharacteristicPatientiveEmbedContinuationRequest")
        && rendering.includes("deverbal-nnc-characteristic-embed-realization"));
    s.ok("the Result exposes a clickable Group 23 cue",
        rendering.includes("lesson39-life-heart-embed-contrast")
        && rendering.includes("characteristicMatrixRealization"));

    const groupProof = Boolean(
        heartFull.authorizationStatus === "authorized"
        && heartShort.authorizationStatus === "authorized"
        && produceFull.authorizationStatus === "authorized"
        && produceShort.authorizationStatus === "authorized"
        && unlistedShort.authorizationStatus === "authorized"
        && missingChoice.authorizationStatus === "blocked"
        && copied.authorizationStatus === "blocked"
        && stringOnly.authorizationStatus === "blocked"
    );
    for (const record of writing) {
        s.ok(record.atomId, groupProof);
        s.ok(`mutation:${record.atomId}`,
            missingChoice.authorizationStatus === "blocked"
            && copied.authorizationStatus === "blocked"
            && stringOnly.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
