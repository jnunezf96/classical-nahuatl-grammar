"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-imperfective-patientive-foundation";

function buildImperfective(ctx, fields = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "cuica",
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
    const s = createSuite("classical_lesson39_group_4_jobs");
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
    }, { atoms: 46, writing: 22, reading: 24, accepted: true });

    const cuicaVnc = buildImperfective(ctx);
    const cuica = patientive(ctx, cuicaVnc);
    const cuicaFrame = cuica.operationFrame?.imperfectivePatientiveFrame;
    s.eq("exact active present Result supplies the imperfective predicate", {
        statuses: [cuicaVnc.authorizationStatus, cuica.authorizationStatus],
        exact: cuicaFrame?.canonicalActivePresentVncResult
            === cuicaVnc.resultFrame,
        analysis: cuicaFrame?.canonicalVncSourceAnalysisFrame
            === cuicaVnc.resultFrame?.sourceAnalysisFrame,
        source: cuicaFrame?.lexicalSourceStem,
        imperfective: cuicaFrame?.imperfectivePredicateStem,
        shape: cuicaFrame?.selectedShapeRule,
        target: cuica.operationFrame?.targetStems?.restrictedUse,
        nounClass: cuica.operationFrame?.nounClass,
        formula: cuica.formulaRealization,
        word: cuica.wordSurface,
    }, {
        statuses: ["authorized", "authorized"],
        exact: true,
        analysis: true,
        source: "cuica",
        imperfective: "cuica",
        shape: "class-a-or-b-full-imperfective-stem",
        target: "cuica",
        nounClass: "tl",
        formula: "#0-0(cuica)tl-0#",
        word: "cuicatl",
    });

    const tocaVnc = buildImperfective(ctx, {
        sourceStem: "toca",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
    });
    const tocaPassive = patientive(ctx, tocaVnc, {
        patientiveAnalogy: "passive",
    });
    const tocaImpersonal = patientive(ctx, tocaVnc);
    const intransitivePassive = patientive(ctx, cuicaVnc, {
        patientiveAnalogy: "passive",
    });
    s.eq("passive analogy is offered only for a transitive Source", {
        passive: [tocaPassive.authorizationStatus,
            tocaPassive.operationFrame?.targetStems?.restrictedUse],
        impersonal: [tocaImpersonal.authorizationStatus,
            tocaImpersonal.operationFrame?.targetStems?.restrictedUse],
        options: tocaPassive.operationFrame
            ?.imperfectivePatientiveFrame?.analogyOptions,
        choice: tocaPassive.operationFrame
            ?.imperfectivePatientiveFrame?.analogyIsGenuineUserChoice,
        blocked: [intransitivePassive.authorizationStatus,
            intransitivePassive.blockReason],
    }, {
        passive: ["authorized", "toca"],
        impersonal: ["authorized", "tla-toca"],
        options: ["impersonal", "passive"],
        choice: true,
        blocked: ["blocked",
            "39.2.1-passive-analogy-requires-transitive-source"],
    });

    const classC = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "ihcuil-o-ā",
        verbClass: "C",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
    }), { patientiveAnalogy: "passive" });
    const classD = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "cihuā-hua",
        verbClass: "D",
    }));
    s.eq("typed class and morphemic edge derive the imperfective shape", {
        c: [classC.authorizationStatus,
            classC.blockReason,
            classC.sourceFrame?.sourceStem,
            classC.sourceFrame?.imperfectivePatientiveVncCaptureFrame
                ?.lexicalSourceStem,
            classC.operationFrame?.targetStems?.restrictedUse,
            classC.operationFrame?.imperfectivePatientiveFrame
                ?.selectedShapeRule],
        d: [classD.authorizationStatus,
            classD.operationFrame?.targetStems?.restrictedUse,
            classD.operationFrame?.imperfectivePatientiveFrame
                ?.selectedShapeRule],
        automatic: [classC, classD].every(frame => frame.operationFrame
            ?.imperfectivePatientiveFrame
            ?.sourceShapeRuleDerivedAutomatically),
    }, {
        c: ["authorized", "", "ihcuil-o-ā", "ihcuil-o-ā", "ihcuil-ō",
            "class-c-truncated-final-long-o-or-i"],
        d: ["authorized", "cihuā-huā", "class-d-final-long-a"],
        automatic: true,
    });

    const copied = patientive(ctx, {
        resultFrame: { ...cuicaVnc.resultFrame },
    });
    const jsonCopy = patientive(ctx, {
        resultFrame: JSON.parse(JSON.stringify(cuicaVnc.resultFrame)),
    });
    const wrongTense = patientive(ctx, buildImperfective(ctx, {
        tense: "preterit",
    }));
    const raw = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "impersonal",
        source: {
            sourceStage: "imperfective-core",
            sourceStem: "cuica",
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
        },
        subject: "3sg",
        state: "absolutive",
    });
    s.eq("only the exact active present owner Result is admitted", {
        copied: [copied.authorizationStatus, copied.blockReason],
        json: [jsonCopy.authorizationStatus, jsonCopy.blockReason],
        tense: [wrongTense.authorizationStatus, wrongTense.blockReason],
        raw: [raw.authorizationStatus, raw.blockReason],
    }, {
        copied: ["blocked",
            "exact-owner-issued-active-present-vnc-result-required"],
        json: ["blocked",
            "exact-owner-issued-active-present-vnc-result-required"],
        tense: ["blocked", "active-present-vnc-result-required"],
        raw: ["blocked",
            "exact-owner-issued-active-present-vnc-result-required"],
    });

    const unlisted = patientive(ctx, buildImperfective(ctx, {
        sourceStem: "nehnemi",
        verbClass: "B",
    }));
    s.eq("compatible unlisted Sources remain productive", {
        status: unlisted.authorizationStatus,
        target: unlisted.operationFrame?.targetStems?.restrictedUse,
        productive: unlisted.operationFrame?.imperfectivePatientiveFrame
            ?.unlistedCompatibleSourceRemainsProductive,
        examples: unlisted.operationFrame?.imperfectivePatientiveFrame
            ?.exampleIdentityAuthorizesProductiveRoute,
        meaning: unlisted.operationFrame?.imperfectivePatientiveFrame
            ?.shapeSelectsLexicalMeaning,
    }, {
        status: "authorized",
        target: "nehnemi",
        productive: true,
        examples: false,
        meaning: false,
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "impersonal",
        canonicalVncResult: tocaVnc.resultFrame,
        subjects: ["3sg"],
        states: ["absolutive", "possessive"],
        animacy: "animate",
    });
    const parity = ctx.projectClassicalNahuatlParadigmCoordinates(plan);
    s.eq("imperfective patientive keeps scalar and paradigm handoff exact", {
        status: plan.authorizationStatus,
        count: parity.length,
        scalar: parity.every(frame => frame.scalarEquivalent),
        exact: parity.every(frame => frame.preparedFrame.sourceFrame
            === plan.preparedSourceFrame),
    }, { status: "authorized", count: 2, scalar: true, exact: true });

    const groupProof = Boolean(
        cuicaFrame?.exactActivePresentResultIdentityPreserved
        && tocaPassive.authorizationStatus === "authorized"
        && intransitivePassive.authorizationStatus === "blocked"
        && classC.authorizationStatus === "authorized"
        && classD.authorizationStatus === "authorized"
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
