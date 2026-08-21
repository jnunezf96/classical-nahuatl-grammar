"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson39-perfective-patientive-foundation",
    "lesson39-perfective-impersonal-model",
    "lesson39-perfective-compounds-and-ownerhood",
];

function buildPerfective(ctx, fields = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "miqui",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "preterit",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...fields,
    });
}

function patientive(ctx, application, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "perfective-active-core",
        patientiveAnalogy: "impersonal",
        canonicalVncResult: application?.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    s.eq("accepted batch has the exact atom-job denominator", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        groups: [...new Set(records.map(record => record.reviewGroupId))],
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
    }, {
        atoms: 124,
        writing: 58,
        reading: 66,
        groups: GROUPS,
        accepted: true,
    });

    const miqui = buildPerfective(ctx);
    const mic = patientive(ctx, miqui);
    const micFrame = mic.operationFrame?.perfectivePatientiveFrame;
    s.eq("exact active preterit Result supplies the perfective predicate", {
        statuses: [miqui.authorizationStatus, mic.authorizationStatus],
        exact: micFrame?.canonicalActivePreteritVncResult
            === miqui.resultFrame,
        analysis: micFrame?.canonicalVncSourceAnalysisFrame
            === miqui.resultFrame?.sourceAnalysisFrame,
        source: micFrame?.lexicalSourceStem,
        perfective: micFrame?.perfectivePredicateStem,
        final: micFrame?.perfectiveFinalEdge,
        target: mic.operationFrame?.targetStems?.restrictedUse,
        nounClass: mic.operationFrame?.nounClass,
        formula: mic.formulaRealization,
        word: mic.wordSurface,
    }, {
        statuses: ["authorized", "authorized"],
        exact: true,
        analysis: true,
        source: "miqui",
        perfective: "mic",
        final: "c",
        target: "mic",
        nounClass: "tli",
        formula: "#0-0(mic)tli-0#",
        word: "mictli",
    });

    const quemi = buildPerfective(ctx, {
        sourceStem: "quēmi",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
    });
    const quemiPassive = patientive(ctx, quemi, {
        patientiveAnalogy: "passive",
    });
    const quemiImpersonal = patientive(ctx, quemi);
    const intransitivePassive = patientive(ctx, miqui, {
        patientiveAnalogy: "passive",
    });
    s.eq("passive analogy is a real choice only for a transitive Source", {
        passive: [quemiPassive.authorizationStatus,
            quemiPassive.operationFrame?.targetStems?.restrictedUse],
        impersonal: [quemiImpersonal.authorizationStatus,
            quemiImpersonal.operationFrame?.targetStems?.restrictedUse],
        options: quemiPassive.operationFrame
            ?.perfectivePatientiveFrame?.analogyOptions,
        choice: quemiPassive.operationFrame
            ?.perfectivePatientiveFrame?.analogyIsGenuineUserChoice,
        blocked: [intransitivePassive.authorizationStatus,
            intransitivePassive.blockReason],
    }, {
        passive: ["authorized", "quēn"],
        impersonal: ["authorized", "tla-quēn"],
        options: ["impersonal", "passive"],
        choice: true,
        blocked: ["blocked",
            "39.1.1-passive-analogy-requires-transitive-source"],
    });

    const human = patientive(ctx, buildPerfective(ctx, {
        sourceStem: "notza",
        sourceValence: "projective-human",
        objectKind: "nonspecific-human",
    }));
    const reflexive = patientive(ctx, buildPerfective(ctx, {
        sourceStem: "xima",
        sourceValence: "mainline-reflexive",
        objectKind: "reflexive",
    }));
    const nonhuman = patientive(ctx, buildPerfective(ctx, {
        sourceStem: "chihua",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
    }));
    s.eq("impersonal model preserves object history and derives carriers", {
        human: [human.operationFrame?.perfectivePatientiveFrame
            ?.sourceObjectPattern,
        human.operationFrame?.perfectivePatientiveFrame
            ?.realizedObjectPattern,
        human.operationFrame?.targetStems?.restrictedUse],
        reflexive: [reflexive.operationFrame?.perfectivePatientiveFrame
            ?.sourceObjectPattern,
        reflexive.operationFrame?.targetStems?.restrictedUse],
        nonhuman: [nonhuman.operationFrame?.perfectivePatientiveFrame
            ?.sourceObjectPattern,
        nonhuman.operationFrame?.targetStems?.restrictedUse],
    }, {
        human: ["nonspecific-human", "nonspecific-nonhuman", "tla-notz"],
        reflexive: ["reflexive", "ne-xin"],
        nonhuman: ["nonspecific-nonhuman", "tla-chiuh"],
    });

    const copied = patientive(ctx, { resultFrame: { ...miqui.resultFrame } });
    const jsonCopy = patientive(ctx, {
        resultFrame: JSON.parse(JSON.stringify(miqui.resultFrame)),
    });
    const wrongTense = patientive(ctx, ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "miqui",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    }));
    const raw = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "perfective-active-core",
        patientiveAnalogy: "impersonal",
        source: {
            sourceStage: "perfective-core",
            sourceStem: "mic",
            verbClass: "B",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
        },
        subject: "3sg",
        state: "absolutive",
    });
    s.eq("only the exact active preterit owner Result is admitted", {
        copied: [copied.authorizationStatus, copied.blockReason],
        json: [jsonCopy.authorizationStatus, jsonCopy.blockReason],
        tense: [wrongTense.authorizationStatus, wrongTense.blockReason],
        raw: [raw.authorizationStatus, raw.blockReason],
    }, {
        copied: ["blocked",
            "exact-owner-issued-active-preterit-vnc-result-required"],
        json: ["blocked",
            "exact-owner-issued-active-preterit-vnc-result-required"],
        tense: ["blocked", "active-preterit-vnc-result-required"],
        raw: ["blocked",
            "exact-owner-issued-active-preterit-vnc-result-required"],
    });

    const vowelFinal = patientive(ctx, buildPerfective(ctx, {
        sourceStem: "temō",
        verbClass: "A",
    }));
    const unlistedCompatible = patientive(ctx, buildPerfective(ctx, {
        sourceStem: "paca",
        verbClass: "B",
    }));
    s.eq("shape constrains the productive rule without becoming a stem list", {
        vowel: [vowelFinal.authorizationStatus, vowelFinal.blockReason],
        unlisted: [unlistedCompatible.authorizationStatus,
            unlistedCompatible.operationFrame?.targetStems?.restrictedUse],
        productive: unlistedCompatible.operationFrame
            ?.perfectivePatientiveFrame
            ?.unlistedCompatibleSourceRemainsProductive,
        examples: unlistedCompatible.operationFrame
            ?.perfectivePatientiveFrame
            ?.exampleIdentityAuthorizesProductiveRoute,
    }, {
        vowel: ["blocked", "39.1-perfective-source-ending-not-licensed"],
        unlisted: ["authorized", "pāc"],
        productive: true,
        examples: false,
    });

    const compoundVnc = buildPerfective(ctx, {
        sourceStem: "mā-tla-chihua",
        sourceEmbedStem: "mā-tla",
        sourceMatrixStem: "chihua",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
    });
    const compoundMissing = patientive(ctx, compoundVnc);
    const compound = patientive(ctx, compoundVnc, {
        patientiveCompoundRelation: "adverbial-embed",
    });
    const compoundFrame = compound.operationFrame
        ?.compoundSourcePatientiveFrame;
    s.eq("compound perfective Source is retained rather than flattened", {
        missing: [compoundMissing.authorizationStatus,
            compoundMissing.blockReason],
        status: compound.authorizationStatus,
        exact: compoundFrame?.canonicalVncResult
            === compoundVnc.resultFrame,
        analysis: compoundFrame?.canonicalVncSourceAnalysisFrame
            === compoundVnc.resultFrame?.sourceAnalysisFrame,
        members: [compoundFrame?.embedStem, compoundFrame?.matrixStem],
        relation: compoundFrame?.selectedRelation,
        perfective: compound.operationFrame?.perfectivePatientiveFrame
            ?.perfectivePredicateStem,
        target: compound.operationFrame?.targetStems?.restrictedUse,
    }, {
        missing: ["blocked",
            "38.2.1-compound-source-relation-choice-required"],
        status: "authorized",
        exact: true,
        analysis: true,
        members: ["mā-tla", "chihua"],
        relation: "adverbial-embed",
        perfective: "mā-tla-chiuh",
        target: "tla-mā-tla-chiuh",
    });

    const wife = patientive(ctx, buildPerfective(ctx, {
        sourceStem: "cihuā-hua",
        verbClass: "D",
    }));
    const heart = patientive(ctx, buildPerfective(ctx, {
        sourceStem: "yōl-yo-ā",
        verbClass: "C",
    }));
    s.eq("ownerhood examples add narrow facts but never gate formation", {
        wife: [wife.authorizationStatus,
            wife.operationFrame?.perfectivePatientiveFrame
                ?.lexicalOwnerhoodFact?.reading],
        heart: [heart.authorizationStatus,
            heart.operationFrame?.perfectivePatientiveFrame
                ?.lexicalOwnerhoodFact?.reading],
        narrow: [wife, heart].every(frame => frame.operationFrame
            ?.perfectivePatientiveFrame
            ?.lexicalFactAuthorizesOnlyNarrowReading),
        route: [wife, heart].every(frame => !frame.operationFrame
            ?.perfectivePatientiveFrame
            ?.exampleIdentityAuthorizesProductiveRoute),
    }, {
        wife: ["authorized",
            "one-who-has-acquired-a-woman-or-wife"],
        heart: ["authorized", "abounding-in-life-or-heart"],
        narrow: true,
        route: true,
    });

    const parityPlan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "patientive",
        patientiveSourceFamily: "perfective-active-core",
        patientiveAnalogy: "impersonal",
        canonicalVncResult: quemi.resultFrame,
        subjects: ["3sg"],
        states: ["absolutive", "possessive"],
        animacy: "animate",
    });
    const parity = ctx.projectClassicalNahuatlParadigmCoordinates(parityPlan);
    s.eq("perfective patientive keeps scalar and paradigm handoff exact", {
        status: parityPlan.authorizationStatus,
        count: parity.length,
        scalar: parity.every(frame => frame.scalarEquivalent),
        exact: parity.every(frame => frame.preparedFrame.sourceFrame
            === parityPlan.preparedSourceFrame),
    }, { status: "authorized", count: 2, scalar: true, exact: true });

    const groupProof = {
        "lesson39-perfective-patientive-foundation": Boolean(
            micFrame?.exactActivePreteritResultIdentityPreserved
            && quemiPassive.authorizationStatus === "authorized"
            && intransitivePassive.authorizationStatus === "blocked"
        ),
        "lesson39-perfective-impersonal-model": Boolean(
            human.authorizationStatus === "authorized"
            && reflexive.authorizationStatus === "authorized"
            && nonhuman.authorizationStatus === "authorized"
        ),
        "lesson39-perfective-compounds-and-ownerhood": Boolean(
            compoundFrame?.exactResultIdentityPreserved
            && wife.operationFrame?.perfectivePatientiveFrame
                ?.lexicalFactAuthorizesOnlyNarrowReading
            && unlistedCompatible.authorizationStatus === "authorized"
        ),
    };
    for (const record of writing) {
        s.ok(record.atomId, groupProof[record.reviewGroupId]);
        s.ok(`mutation:${record.atomId}`,
            raw.authorizationStatus === "blocked"
            && copied.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
