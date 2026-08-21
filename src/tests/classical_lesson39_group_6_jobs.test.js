"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-characteristic-patientive-foundation";

function ordinaryResult(ctx, stem, sourceClass = "") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
        ...(sourceClass ? { sourceClass } : {}),
    });
    const state = source.allowedStateValues?.includes("absolutive")
        ? "absolutive"
        : "possessive";
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state,
            subject: source.referentialAnimacy === "nonanimate"
                ? "3common"
                : "3sg",
            humanness: source.referentialAnimacy === "nonanimate"
                ? "nonhuman"
                : "",
            possessor: state === "possessive" ? "3sg" : "",
            predicateFormation: "source-stem",
            stemFormation: "plain",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.evaluateClassicalNahuatlOrdinaryNnc(source, operation);
}

function characteristic(ctx, stem, fields = {}) {
    const { sourceClass = "", ...requestFields } = fields;
    const canonicalNncResult = ordinaryResult(ctx, stem, sourceClass);
    return {
        canonicalNncResult,
        frame: ctx.evaluateClassicalNahuatlDeverbalNnc({
            constructionKind: "patientive",
            patientiveKind: "characteristic-property",
            characteristicReading: "inherent-quality",
            canonicalNncResult,
            subject: "3sg",
            state: "absolutive",
            animacy: "nonanimate",
            ...requestFields,
        }),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson39-review-ledger.json"
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
    }, { atoms: 53, writing: 28, reading: 25, accepted: true });

    const grease = characteristic(ctx, "tla-īx", {
        sourceClass: "tli-1",
    });
    const greaseFoundation = grease.frame.operationFrame
        ?.characteristicPatientiveFoundationFrame;
    s.eq("characteristic patientive captures the exact ordinary NNC Result", {
        status: grease.frame.authorizationStatus,
        source: grease.frame.sourceFrame?.sourceStem,
        target: grease.frame.operationFrame?.targetStems,
        exact: greaseFoundation?.canonicalNncResult
            === grease.canonicalNncResult,
        sourceFrame: greaseFoundation?.canonicalNncSourceFrame
            === grease.canonicalNncResult.sourceFrame,
        operationFrame: greaseFoundation?.canonicalNncOperationFrame
            === grease.canonicalNncResult.operationFrame,
        slotFrame: greaseFoundation?.canonicalNncTypedSlotFrame
            === grease.canonicalNncResult.typedSlotFrame,
    }, {
        status: "authorized",
        source: "tla-īx",
        target: { restrictedUse: "tla-īx-xō", generalUse: "tla-īx-xo" },
        exact: true,
        sourceFrame: true,
        operationFrame: true,
        slotFrame: true,
    });

    const assimilation = [
        ["cua-l", "tli-1", "cua-l-lō", "l", true],
        ["mahuiz", "tli-1", "mahuiz-zō", "z", true],
        ["mix", "", "mix-xō", "x", true],
        ["huitz", "tli-1", "huitz-tzō", "tz", true],
        ["oquich", "tli-1", "oquich-chō", "ch", true],
        ["teō", "tl-1-a", "teō-yō", "ō", false],
        ["tēuc", "", "tēuc-yō", "c", false],
    ].map(([stem, sourceClass, targetStem, environment, applied]) => {
        const result = characteristic(ctx, stem, { sourceClass });
        const foundation = result.frame.operationFrame
            ?.characteristicPatientiveFoundationFrame;
        return {
            stem,
            status: result.frame.authorizationStatus,
            target: result.frame.operationFrame?.targetStems?.restrictedUse,
            environment: foundation?.yAssimilationEnvironment,
            applied: foundation?.yAssimilationApplied,
            expected: [targetStem, environment, applied],
        };
    });
    s.eq("typed final shape applies only the Canvas y-assimilations",
        assimilation.map(item => [
            item.stem,
            item.status,
            item.target,
            item.environment,
            item.applied,
        ]),
        assimilation.map(item => [
            item.stem,
            "authorized",
            ...item.expected,
        ]));

    const possessive = characteristic(ctx, "tla-īx", {
        sourceClass: "tli-1",
        state: "possessive",
        possessor: "3sg",
    }).frame;
    s.eq("Subclass 1-B tl and possessive zero-zero are automatic", {
        nounClass: grease.frame.operationFrame?.nounClass,
        subclass: grease.frame.operationFrame?.nounSubclass,
        absolutive: grease.frame.formulaRealization,
        possessive: possessive.formulaRealization,
        possessiveStem: possessive.operationFrame?.targetStems?.generalUse,
        zeroZero: possessive.operationFrame
            ?.characteristicPatientiveFoundationFrame
            ?.possessiveStateUsesZeroZero,
        shortO: possessive.operationFrame
            ?.characteristicPatientiveFoundationFrame
            ?.possessiveStateShortensFinalO,
    }, {
        nounClass: "tl",
        subclass: "1-B",
        absolutive: "#0-0(tla-īx-xō)tl-0#",
        possessive: "#0-0+ī-0(tla-īx-xo)0-0#",
        possessiveStem: "tla-īx-xo",
        zeroZero: true,
        shortO: true,
    });

    const quality = [
        ["tla-īx", "tli-1", "grease-or-oily-surface"],
        ["cua-l", "tli-1", "goodness"],
        ["huē-hueh", "tli-1", "old-agedness"],
        ["oquich", "tli-1", "virility-or-manliness"],
        ["tēuc", "", "lordship"],
    ].map(([stem, sourceClass, reading]) => {
        const result = characteristic(ctx, stem, { sourceClass });
        const foundation = result.frame.operationFrame
            ?.characteristicPatientiveFoundationFrame;
        return [
            stem,
            result.frame.authorizationStatus,
            foundation?.selectedReading,
            foundation?.lexicalReadingFact?.reading,
            foundation?.compositionalReadingRemainsAvailable,
            foundation?.shapeSelectsLexicalMeaning,
            reading,
        ];
    });
    s.eq("inherent-quality readings stay narrow and non-authorizing",
        quality.map(item => item.slice(0, 6)),
        quality.map(item => [item[0], "authorized", "inherent-quality",
            item[6], true, false]));

    const unlisted = characteristic(ctx, "zahui", {
        sourceClass: "tl-1-a",
    }).frame;
    s.eq("compatible unlisted NNC Results remain productive", {
        status: unlisted.authorizationStatus,
        target: unlisted.operationFrame?.targetStems?.restrictedUse,
        productive: unlisted.operationFrame
            ?.characteristicPatientiveFoundationFrame
            ?.unlistedCompatibleNncResultRemainsProductive,
        lexical: unlisted.operationFrame
            ?.characteristicPatientiveFoundationFrame?.lexicalReadingFact,
        exampleGate: unlisted.operationFrame
            ?.characteristicPatientiveFoundationFrame
            ?.exampleIdentityAuthorizesProductiveRoute,
    }, {
        status: "authorized",
        target: "zahui-yō",
        productive: true,
        lexical: null,
        exampleGate: false,
    });

    const copied = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult: { ...grease.canonicalNncResult },
        subject: "3sg",
        state: "absolutive",
    });
    const raw = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        source: { sourceStage: "nounstem-embed", sourceStem: "tla-īx" },
        subject: "3sg",
        state: "absolutive",
    });
    const pronominalSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({ stem: "yeh" });
    const pronominalOperation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(
            pronominalSource,
            {
                subject: "3sg",
                clausePosition: "initial",
                adjunctorInMode: "none",
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const pronominalResult = ctx.evaluateClassicalNahuatlPronominalNnc(
        pronominalSource,
        pronominalOperation
    );
    const wrongFamily = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult: pronominalResult,
        subject: "3sg",
        state: "absolutive",
    });
    s.eq("raw, copied, and pronominal lookalikes cannot authorize the route", {
        raw: [raw.authorizationStatus, raw.blockReason],
        copied: [copied.authorizationStatus, copied.blockReason],
        pronominal: [wrongFamily.authorizationStatus, wrongFamily.blockReason],
    }, {
        raw: ["blocked",
            "exact-owner-issued-ordinary-nnc-result-required-for-characteristic-patientive"],
        copied: ["blocked",
            "exact-owner-issued-ordinary-nnc-result-required-for-characteristic-patientive"],
        pronominal: ["blocked",
            "exact-owner-issued-ordinary-nnc-result-required-for-characteristic-patientive"],
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult: grease.canonicalNncResult,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
        outputScope: "paradigm",
        subjects: ["3sg", "3pl"],
        states: ["absolutive", "possessive"],
    });
    const coordinates = ctx.projectClassicalNahuatlParadigmCoordinates(plan);
    s.eq("scalar and paradigm application retain the same exact Source", {
        plan: [plan.authorizationStatus, plan.coordinateCount],
        coordinates: coordinates.map(coordinate => [
            coordinate.authorizationStatus,
            coordinate.scalarEquivalent,
            coordinate.preparedFrame.sourceFrame.canonicalNncResult
                === grease.canonicalNncResult,
        ]),
    }, {
        plan: ["authorized", 4],
        coordinates: Array.from({ length: 4 }, () => [
            "authorized", true, true,
        ]),
    });

    const groupProof = Boolean(
        greaseFoundation?.exactOwnerIssuedOrdinaryNncResultIdentityPreserved
        && assimilation.every(item => item.status === "authorized")
        && possessive.authorizationStatus === "authorized"
        && unlisted.authorizationStatus === "authorized"
        && raw.authorizationStatus === "blocked"
        && copied.authorizationStatus === "blocked"
        && wrongFamily.authorizationStatus === "blocked"
        && coordinates.every(coordinate => coordinate.scalarEquivalent)
    );
    for (const record of writing) {
        s.ok(record.atomId, groupProof);
        s.ok(`mutation:${record.atomId}`, raw.authorizationStatus === "blocked"
            && copied.authorizationStatus === "blocked"
            && wrongFamily.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
