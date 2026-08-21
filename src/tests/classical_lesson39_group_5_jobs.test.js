"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-imperfective-impersonal-model";

function buildImperfective(ctx, fields = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "cuīca",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...fields,
    });
}

function patientive(ctx, application, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "impersonal",
        canonicalVncResult: application?.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_5_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"), "utf8"));
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
    }, { atoms: 38, writing: 7, reading: 31, accepted: true });

    const cuicaVnc = buildImperfective(ctx);
    const cuica = patientive(ctx, cuicaVnc);
    const cuicaFrame = cuica.operationFrame
        ?.imperfectiveImpersonalPatientiveFrame;
    const pacaVnc = buildImperfective(ctx, {
        sourceStem: "pāca",
        verbClass: "B",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
    });
    const paca = patientive(ctx, pacaVnc);
    s.eq("impersonal model admits transitive and intransitive Sources", {
        intransitive: [cuica.authorizationStatus,
            cuica.operationFrame?.targetStems?.restrictedUse,
            cuicaFrame?.carrierSequence],
        transitive: [paca.authorizationStatus,
            paca.operationFrame?.targetStems?.restrictedUse,
            paca.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.carrierSequence],
        exact: [cuicaFrame?.canonicalActivePresentVncResult
            === cuicaVnc.resultFrame,
        paca.operationFrame?.imperfectiveImpersonalPatientiveFrame
            ?.canonicalActivePresentVncResult === pacaVnc.resultFrame],
        allowed: [cuica, paca].every(frame => frame.operationFrame
            ?.imperfectiveImpersonalPatientiveFrame
            ?.transitiveAndIntransitiveSourcesAllowed),
    }, {
        intransitive: ["authorized", "cuīca", []],
        transitive: ["authorized", "tla-pāca", ["tla"]],
        exact: [true, true],
        allowed: true,
    });

    const human = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "nōtza",
        sourceValence: "projective-human",
        objectKind: "nonspecific-human",
    }));
    const reflexive = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "xima",
        sourceValence: "mainline-reflexive",
        objectKind: "reflexive",
    }));
    s.eq("typed participant structure derives carriers", {
        human: [human.authorizationStatus,
            human.operationFrame?.targetStems?.restrictedUse,
            human.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.carrierSequence],
        reflexive: [reflexive.authorizationStatus,
            reflexive.operationFrame?.targetStems?.restrictedUse,
            reflexive.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.carrierSequence,
            reflexive.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.reflexiveOrReciprocalNePreserved],
        derived: [human, reflexive].every(frame => frame.operationFrame
            ?.imperfectiveImpersonalPatientiveFrame
            ?.carrierSequenceDerivedFromTypedParticipants),
    }, {
        human: ["authorized", "tē-nōtza", ["tē"]],
        reflexive: ["authorized", "ne-xima", ["ne"], true],
        derived: true,
    });

    s.eq("visible carriers do not determine Source grammar", {
        values: [cuica, paca, human, reflexive].map(frame => [
            frame.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.visibleCarrierDeterminesSourceValence,
            frame.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.visibleCarrierDeterminesReferentIdentity,
        ]),
        patterns: [cuica, paca, human, reflexive].map(frame => (
            frame.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.sourceObjectPattern
        )),
    }, {
        values: [[false, false], [false, false], [false, false],
            [false, false]],
        patterns: ["none", "nonspecific-nonhuman",
            "nonspecific-human", "reflexive"],
    });

    const breeze = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "eh-ca",
    }));
    const opossum = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "tla-cuā",
    }));
    const dawn = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "tla-t-hui",
    }));
    s.eq("narrow readings and Source histories never become route gates", {
        breeze: [breeze.authorizationStatus,
            breeze.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.lexicalReadingFact],
        opossum: [opossum.authorizationStatus,
            opossum.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.lexicalReadingFact?.reading,
            opossum.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.affectiveContinuationIsSeparateOperation],
        dawn: [dawn.authorizationStatus,
            dawn.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.lexicalReadingFact?.reading,
            dawn.operationFrame?.imperfectiveImpersonalPatientiveFrame
                ?.sourceHistoryPreserved],
        nonauthorizing: [breeze, opossum, dawn].every(frame => !frame
            .operationFrame?.imperfectiveImpersonalPatientiveFrame
            ?.exampleIdentityAuthorizesProductiveRoute),
    }, {
        breeze: ["authorized", {
            reading: "breeze",
            sourceAnalysis: "intransitive-verbstem-with-ca-suffix",
            rejectedSurfaceReanalysis: "noun-compound-with-ca-matrix",
            glottalStopIsTypedSourceEvidence: true,
        }],
        opossum: ["authorized", "opossum", true],
        dawn: ["authorized", "dawn", [
            "intransitive-it-hui",
            "impersonal-tla-t-hui",
            "imperfective-patientive-tla-t-hui-tl",
        ]],
        nonauthorizing: true,
    });

    const unlisted = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "zahui",
        verbClass: "B",
    }));
    s.eq("compatible unlisted Sources retain literal productive reading", {
        status: unlisted.authorizationStatus,
        target: unlisted.operationFrame?.targetStems?.restrictedUse,
        productive: unlisted.operationFrame
            ?.imperfectiveImpersonalPatientiveFrame
            ?.unlistedCompatibleSourceRemainsProductive,
        literal: unlisted.operationFrame
            ?.imperfectiveImpersonalPatientiveFrame
            ?.compositionalReadingRemainsAvailable,
        lexical: unlisted.operationFrame
            ?.imperfectiveImpersonalPatientiveFrame?.lexicalReadingFact,
        shapeMeaning: unlisted.operationFrame
            ?.imperfectiveImpersonalPatientiveFrame
            ?.shapeSelectsLexicalMeaning,
    }, {
        status: "authorized",
        target: "zahui",
        productive: true,
        literal: true,
        lexical: null,
        shapeMeaning: false,
    });

    const copied = patientive(ctx, {
        resultFrame: { ...cuicaVnc.resultFrame },
    });
    const raw = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "impersonal",
        source: {
            sourceStage: "imperfective-core",
            sourceStem: "tla-pāca",
            verbClass: "B",
            sourceVoice: "active",
            sourceValence: "projective-nonhuman",
            sourceObjectPattern: "nonspecific-nonhuman",
        },
        subject: "3sg",
        state: "absolutive",
    });
    s.eq("copied and raw-looking Sources remain blocked", {
        copied: [copied.authorizationStatus, copied.blockReason],
        raw: [raw.authorizationStatus, raw.blockReason],
    }, {
        copied: ["blocked",
            "exact-owner-issued-active-present-vnc-result-required"],
        raw: ["blocked",
            "exact-owner-issued-active-present-vnc-result-required"],
    });

    const groupProof = Boolean(
        cuicaFrame?.exactActivePresentResultIdentityPreserved
        && paca.authorizationStatus === "authorized"
        && human.authorizationStatus === "authorized"
        && reflexive.authorizationStatus === "authorized"
        && opossum.operationFrame?.imperfectiveImpersonalPatientiveFrame
            ?.affectiveContinuationIsSeparateOperation
        && dawn.operationFrame?.imperfectiveImpersonalPatientiveFrame
            ?.sourceHistoryPreserved?.length === 3
        && unlisted.authorizationStatus === "authorized"
    );
    for (const record of writing) {
        s.ok(record.atomId, groupProof);
        s.ok(`mutation:${record.atomId}`,
            raw.authorizationStatus === "blocked"
            && copied.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
