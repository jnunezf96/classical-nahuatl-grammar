"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-characteristic-ownerhood-contrasts";

function ordinaryResult(ctx, stem, fields = {}) {
    const {
        sourceClass = "tl-1-a",
        embedStem = "",
        matrixStem = "",
    } = fields;
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
        sourceClass,
        ...(embedStem && matrixStem ? { embedStem, matrixStem } : {}),
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

function characteristic(ctx, stem, reading, fields = {}) {
    const canonicalNncResult = ordinaryResult(ctx, stem, fields);
    return {
        canonicalNncResult,
        frame: ctx.evaluateClassicalNahuatlDeverbalNnc({
            constructionKind: "patientive",
            patientiveKind: "characteristic-property",
            characteristicReading: reading,
            canonicalNncResult,
            subject: "3sg",
            state: "absolutive",
            animacy: "nonanimate",
        }),
    };
}

function contrastFrame(result) {
    return result.frame.operationFrame
        ?.characteristicOwnerhoodContrastFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_7_jobs");
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
    }, { atoms: 59, writing: 19, reading: 40, accepted: true });

    const pertaining = characteristic(ctx, "teō", "pertaining-to");
    const intrinsic = characteristic(ctx, "teō", "intrinsic-aspect");
    const pertainingFrame = contrastFrame(pertaining);
    const intrinsicFrame = contrastFrame(intrinsic);
    s.eq("the same typed Source preserves two distinct compositional analyses", {
        statuses: [
            pertaining.frame.authorizationStatus,
            intrinsic.frame.authorizationStatus,
        ],
        exact: [
            pertainingFrame?.exactOwnerIssuedOrdinaryNncResultIdentityPreserved,
            intrinsicFrame?.exactOwnerIssuedOrdinaryNncResultIdentityPreserved,
        ],
        targets: [
            pertaining.frame.operationFrame?.targetStems?.restrictedUse,
            intrinsic.frame.operationFrame?.targetStems?.restrictedUse,
        ],
        readings: [
            pertainingFrame?.selectedRelation,
            intrinsicFrame?.selectedRelation,
        ],
        selectedLexicalReadings: [
            pertainingFrame?.selectedLexicalReading,
            intrinsicFrame?.selectedLexicalReading,
        ],
        choice: pertainingFrame?.readingRelationIsGenuineUserChoice,
        shapeSelects: pertainingFrame?.sourceShapeAloneSelectsReading,
        translationMerges: pertainingFrame?.translationSelectsOrMergesAnalysis,
    }, {
        statuses: ["authorized", "authorized"],
        exact: [true, true],
        targets: ["teō-yō", "teō-yō"],
        readings: [
            "thing-pertaining-to-incorporated-nounstem",
            "thing-intrinsic-to-incorporated-nounstem",
        ],
        selectedLexicalReadings: ["doctrine-or-ritual", ""],
        choice: true,
        shapeSelects: false,
        translationMerges: false,
    });

    const nestedOwnerhood = characteristic(
        ctx,
        "mich-huah-Ø-cā",
        "pertaining-to",
        {
            embedStem: "mich",
            matrixStem: "huah-Ø-cā",
        }
    );
    const nestedFrame = contrastFrame(nestedOwnerhood);
    s.eq("ordinary ownerhood inside the embed stays distinct from outer abundant ownerhood", {
        status: nestedOwnerhood.frame.authorizationStatus,
        sourceConstituents: nestedFrame?.sourceConstituents,
        embedded: nestedFrame?.embeddedOwnerhoodKind,
        embeddedMatrix: nestedFrame?.embeddedOwnerhoodMatrixConstituent,
        embeddedPreserved: nestedFrame?.embeddedOwnerhoodAnalysisPreserved,
        outer: nestedFrame?.outerOwnerhoodKind,
        outerMatrix: nestedFrame?.outerOwnerhoodMatrix,
        distinct:
            nestedFrame?.ordinaryAndAbundantOwnerhoodAnalysesRemainDistinct,
    }, {
        status: "authorized",
        sourceConstituents: ["mich", "huah-Ø-cā"],
        embedded: "ordinary-ownerhood",
        embeddedMatrix: "huah-Ø-cā",
        embeddedPreserved: true,
        outer: "abundant-ownerhood",
        outerMatrix: "yō-ā",
        distinct: true,
    });

    const honor = characteristic(ctx, "mahui-z", "pertaining-to", {
        sourceClass: "tli-1",
    });
    const honorFact = contrastFrame(honor)?.lexicalFact;
    s.eq("traditional spelling cannot manufacture another verbal Source", {
        status: honor.frame.authorizationStatus,
        target: honor.frame.operationFrame?.targetStems?.restrictedUse,
        reading: honorFact?.lexicalReading,
        spelling: honorFact?.traditionalSpelling,
        rejectedSource: honorFact?.rejectedSourceReanalysis,
        spellingAuthorizes:
            honorFact?.traditionalSpellingAuthorizesRejectedReanalysis,
        frameRejects:
            contrastFrame(honor)?.traditionalSpellingAuthorizesSourceReanalysis,
    }, {
        status: "authorized",
        target: "mahui-z-zō",
        reading: "honor",
        spelling: "mahuizo",
        rejectedSource: "tla-mahui-z-o-ā",
        spellingAuthorizes: false,
        frameRejects: false,
    });

    const irritation = characteristic(ctx, "cual-ā-n", "intrinsic-aspect", {
        sourceClass: "tli-1",
    });
    const irritationFrame = contrastFrame(irritation);
    s.eq("intrinsic irritation remains distinct from the human-characteristic comparison", {
        status: irritation.frame.authorizationStatus,
        target: irritation.frame.operationFrame?.targetStems?.restrictedUse,
        relation: irritationFrame?.selectedRelation,
        reading: irritationFrame?.lexicalFact?.lexicalReading,
        comparisonSource: irritationFrame?.comparisonSource,
        comparisonReading: irritationFrame?.comparisonReading,
        distinct:
            irritationFrame?.ordinaryAndAbundantOwnerhoodAnalysesRemainDistinct,
    }, {
        status: "authorized",
        target: "cual-a-n-yō",
        relation: "thing-intrinsic-to-incorporated-nounstem",
        reading: "irritation",
        comparisonSource: "cual-ā-n-Ø-cā",
        comparisonReading: "characteristic-of-an-angry-human-person",
        distinct: true,
    });

    const histories = [
        ["pa-ti", "passive-patientive-nounstem", "tla-pa-tla", "patio"],
        ["ih-i", "reduplicative-nounstem", undefined, "ihio"],
    ].map(([stem, kind, verbal, spelling]) => {
        const result = characteristic(ctx, stem, "intrinsic-aspect");
        const frame = contrastFrame(result);
        return [
            stem,
            result.frame.authorizationStatus,
            frame?.lexicalFact?.reconstructedEmbedKind,
            frame?.lexicalFact?.reconstructedVerbalSource,
            frame?.lexicalFact?.traditionalSpelling,
            frame?.reconstructedHistoryIsReadingEvidenceOnly,
            frame?.lexicalFactAuthorizesProductiveRoute,
            kind,
            verbal,
            spelling,
        ];
    });
    s.eq("reconstructed embeds stay reading evidence rather than route authority",
        histories.map(item => item.slice(0, 7)),
        histories.map(item => [
            item[0], "authorized", item[7], item[8], item[9], true, false,
        ]));

    const downgraded = characteristic(
        ctx,
        "ti-yah-Ø-ca-uh",
        "intrinsic-aspect",
        { sourceClass: "zero" }
    );
    s.eq("a downgraded possessive predicate preserves its general-use history", {
        status: downgraded.frame.authorizationStatus,
        history: contrastFrame(downgraded)
            ?.lexicalFact?.sourceRankHistory,
        required: contrastFrame(downgraded)
            ?.lexicalFact?.generalUseStatusRequired,
        target: downgraded.frame.operationFrame?.targetStems?.restrictedUse,
    }, {
        status: "authorized",
        history: "downgraded-possessive-predicate-to-general-use-stem",
        required: true,
        target: "ti-yah-Ø-ca-uh-yō",
    });

    const unlistedPertaining = characteristic(
        ctx,
        "zahui",
        "pertaining-to"
    );
    const unlistedIntrinsic = characteristic(
        ctx,
        "zahui",
        "intrinsic-aspect"
    );
    s.eq("unlisted compatible Sources remain productive for both relations", {
        statuses: [
            unlistedPertaining.frame.authorizationStatus,
            unlistedIntrinsic.frame.authorizationStatus,
        ],
        targets: [
            unlistedPertaining.frame.operationFrame?.targetStems?.restrictedUse,
            unlistedIntrinsic.frame.operationFrame?.targetStems?.restrictedUse,
        ],
        facts: [
            contrastFrame(unlistedPertaining)?.lexicalFact,
            contrastFrame(unlistedIntrinsic)?.lexicalFact,
        ],
        productive: [
            contrastFrame(unlistedPertaining)
                ?.compatibleUnlistedSourceRemainsProductive,
            contrastFrame(unlistedIntrinsic)
                ?.compatibleUnlistedSourceRemainsProductive,
        ],
        exampleGate: contrastFrame(unlistedPertaining)
            ?.exampleIdentityAuthorizesProductiveRoute,
    }, {
        statuses: ["authorized", "authorized"],
        targets: ["zahui-yō", "zahui-yō"],
        facts: [null, null],
        productive: [true, true],
        exampleGate: false,
    });

    const invalid = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "translation-only-ownerhood",
        canonicalNncResult: pertaining.canonicalNncResult,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
    });
    s.eq("an unlicensed translation label cannot select an analysis", {
        status: invalid.authorizationStatus,
        reason: invalid.blockReason,
    }, {
        status: "blocked",
        reason: "39.3-characteristic-reading-required",
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "pertaining-to",
        canonicalNncResult: pertaining.canonicalNncResult,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
        outputScope: "paradigm",
        subjects: ["3sg", "3pl"],
        states: ["absolutive", "possessive"],
    });
    const coordinates = ctx.projectClassicalNahuatlParadigmCoordinates(plan);
    s.eq("scalar and paradigm application preserve the same ownerhood analysis", {
        plan: [plan.authorizationStatus, plan.coordinateCount],
        coordinates: coordinates.map(coordinate => [
            coordinate.authorizationStatus,
            coordinate.scalarEquivalent,
            coordinate.preparedFrame.operationFrame
                ?.characteristicOwnerhoodContrastFrame?.selectedReading,
        ]),
    }, {
        plan: ["authorized", 4],
        coordinates: Array.from({ length: 4 }, () => [
            "authorized", true, "pertaining-to",
        ]),
    });

    const groupProof = Boolean(
        pertaining.frame.authorizationStatus === "authorized"
        && intrinsic.frame.authorizationStatus === "authorized"
        && nestedFrame?.ordinaryAndAbundantOwnerhoodAnalysesRemainDistinct
        && honor.frame.authorizationStatus === "authorized"
        && irritation.frame.authorizationStatus === "authorized"
        && downgraded.frame.authorizationStatus === "authorized"
        && unlistedPertaining.frame.authorizationStatus === "authorized"
        && unlistedIntrinsic.frame.authorizationStatus === "authorized"
        && coordinates.every(coordinate => coordinate.scalarEquivalent)
    );
    for (const record of writing) {
        s.ok(record.atomId, groupProof);
        s.ok(`mutation:${record.atomId}`,
            invalid.authorizationStatus === "blocked"
            && pertainingFrame?.selectedRelation
                !== intrinsicFrame?.selectedRelation
            && pertaining.frame.operationFrame?.targetStems?.restrictedUse
                === intrinsic.frame.operationFrame?.targetStems?.restrictedUse);
    }
    return s;
}

module.exports = { run };
