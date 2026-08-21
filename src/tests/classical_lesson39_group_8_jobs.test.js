"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-characteristic-organic-possession";

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

function characteristic(ctx, canonicalNncResult, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "organic-possession",
        canonicalNncResult,
        subject: "3common",
        state: "possessive",
        possessor: "3sg",
        animacy: "nonanimate",
        ...fields,
    });
}

function organicFrame(result) {
    return result.operationFrame?.characteristicOrganicPossessionFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_8_jobs");
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
    }, { atoms: 132, writing: 95, reading: 37, accepted: true });

    const boneSource = ordinaryResult(ctx, "omi", "zero");
    const bone = characteristic(ctx, boneSource);
    const boneFrame = organicFrame(bone);
    s.eq("organic possession preserves the exact NNC Source and typed roles", {
        status: bone.authorizationStatus,
        exact: boneFrame?.canonicalNncResult === boneSource,
        source: boneFrame?.sourceIdentityStem,
        predicate: boneFrame?.predicateStem,
        state: boneFrame?.resultState,
        stateAutomatic: boneFrame?.resultStateDerivedAutomatically,
        stateUserChoice: boneFrame?.resultStateSelectedByUser,
        possessor: boneFrame?.possessor,
        possessorRole: boneFrame?.possessorParticipantRole,
        possessum: boneFrame?.possessumSubject,
        possessumRole: boneFrame?.possessumParticipantRole,
        whole: boneFrame?.possessorIdentifiesWhole,
        part: boneFrame?.possessumIdentifiesIntegralPart,
    }, {
        status: "authorized",
        exact: true,
        source: "omi",
        predicate: "omi",
        state: "possessive",
        stateAutomatic: true,
        stateUserChoice: false,
        possessor: "3sg",
        possessorRole: "whole",
        possessum: "3common",
        possessumRole: "organic-part-segment-appendage-or-integral-product",
        whole: true,
        part: true,
    });

    s.eq("organic possession derives the possessive form and common number", {
        target: bone.operationFrame?.targetStems,
        formula: bone.formulaRealization,
        allowedStates: bone.operationFrame?.allowedStates,
        numberOptions: boneFrame?.possessumNumberOptions,
        commonNumber:
            boneFrame?.commonNumberPreservesSingularPluralPossibility,
    }, {
        target: { restrictedUse: "", generalUse: "omi-yo" },
        formula: "#0-0+ī-0(omi-yo)0-0#",
        allowedStates: ["possessive"],
        numberOptions: ["singular", "plural"],
        commonNumber: true,
    });

    const absolutive = characteristic(ctx, boneSource, {
        state: "absolutive",
    });
    const noPossessor = characteristic(ctx, boneSource, {
        possessor: "",
    });
    s.eq("organic possession requires possessive state and an explicit whole", {
        absolutive: [absolutive.authorizationStatus, absolutive.blockReason],
        noPossessor: [noPossessor.authorizationStatus, noPossessor.blockReason],
    }, {
        absolutive: ["blocked",
            "39.3.4-organic-possession-is-possessive-only"],
        noPossessor: ["blocked",
            "39.3.4-organic-possession-requires-typed-possessor-whole"],
    });

    const ordinaryCharacteristic = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult: boneSource,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    s.eq("visible yō and body-part meaning do not imply organic possession", {
        ordinaryStatus: ordinaryCharacteristic.authorizationStatus,
        ordinaryOrganicFrame:
            ordinaryCharacteristic.operationFrame
                ?.characteristicOrganicPossessionFrame,
        yōGate: boneFrame?.yōShapeAloneAuthorizesOrganicPossession,
        bodyPartGate:
            boneFrame?.bodyPartMeaningAloneAuthorizesOrganicPossession,
        shapeSelects: boneFrame?.sourceShapeSelectsPossessionRelation,
        otherAbsolutive:
            boneFrame?.otherCharacteristicReadingMayUseAbsolutiveState,
    }, {
        ordinaryStatus: "authorized",
        ordinaryOrganicFrame: null,
        yōGate: false,
        bodyPartGate: false,
        shapeSelects: false,
        otherAbsolutive: true,
    });

    const naturalSource = ordinaryResult(ctx, "yaca");
    const natural = characteristic(ctx, naturalSource, {
        possessor: "1sg",
    });
    s.eq("the exact NNC Source carries its prior natural-possession analysis", {
        status: natural.authorizationStatus,
        policy: organicFrame(natural)?.sourceNaturalPossessionPolicy,
        semantics: organicFrame(natural)?.sourceNaturalPossessionSemantics,
        sourceState: organicFrame(natural)?.sourceState,
        relationAuthority: organicFrame(natural)?.relationSelectionAuthority,
    }, {
        status: "authorized",
        policy: "naturally-possessed",
        semantics: "body-part",
        sourceState: "possessive",
        relationAuthority: "explicit-user-selected-organic-possession-reading",
    });

    const distributions = [
        ["omi", "zero", "formal-organic-versus-adventitious-contrast"],
        ["xō-chi", "tl-1-a", "formal-organic-versus-adventitious-contrast"],
        ["tzon", "tli-1", "sense-dependent-organic-possession"],
        ["tzo", "tl-1-a", "yo-compound-does-not-imply-formal-contrast"],
        ["cal-tech", "tli-1", "nonliving-whole-organic-possession"],
        ["tecol", "tli-1", "nonliving-whole-organic-possession"],
    ].map(([stem, sourceClass, status]) => {
        const result = characteristic(ctx, ordinaryResult(
            ctx,
            stem,
            sourceClass
        ));
        const frame = organicFrame(result);
        return [
            stem,
            result.authorizationStatus,
            frame?.lexicalDistributionFact?.contrastStatus,
            frame?.lexicalFactAuthorizesProductiveRoute,
            frame?.possessorMayBeLivingOrNonliving,
            status,
        ];
    });
    s.eq("witnessed distributions and exceptions remain non-authorizing facts",
        distributions.map(item => item.slice(0, 5)),
        distributions.map(item => [
            item[0], "authorized", item[5], false, true,
        ]));

    s.eq("the formal contrast is frequent but not universal", {
        ambiguous: boneFrame?.ordinaryPartWholePossessionMayRemainAmbiguous,
        universal:
            !boneFrame?.formalOrganicAdventitiousContrastIsNotUniversal,
        detachmentSelects:
            boneFrame?.detachmentPossibilityAloneSelectsRelation,
        adventitious:
            boneFrame?.adventitiousCounterpartUsesNormalNounstem,
    }, {
        ambiguous: true,
        universal: false,
        detachmentSelects: false,
        adventitious: true,
    });

    const unlistedSource = ordinaryResult(ctx, "zahui", "tl-1-a");
    const unlisted = characteristic(ctx, unlistedSource, {
        possessor: "1pl",
    });
    s.eq("a compatible unlisted typed Source remains productive", {
        status: unlisted.authorizationStatus,
        target: unlisted.operationFrame?.targetStems?.generalUse,
        fact: organicFrame(unlisted)?.lexicalDistributionFact,
        productive:
            organicFrame(unlisted)?.compatibleUnlistedSourceRemainsProductive,
        exampleGate:
            organicFrame(unlisted)?.exampleIdentityAuthorizesProductiveRoute,
    }, {
        status: "authorized",
        target: "zahui-yo",
        fact: null,
        productive: true,
        exampleGate: false,
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "organic-possession",
        canonicalNncResult: boneSource,
        subject: "3common",
        state: "possessive",
        possessor: "3sg",
        animacy: "nonanimate",
        outputScope: "paradigm",
        subjects: ["3common"],
        states: ["possessive"],
    });
    const coordinates = ctx.projectClassicalNahuatlParadigmCoordinates(plan);
    s.eq("scalar and paradigm application preserve the organic relation", {
        plan: [plan.authorizationStatus, plan.coordinateCount],
        coordinates: coordinates.map(coordinate => [
            coordinate.authorizationStatus,
            coordinate.scalarEquivalent,
            coordinate.preparedFrame.operationFrame
                ?.characteristicOrganicPossessionFrame?.resultState,
            coordinate.preparedFrame.operationFrame
                ?.characteristicOrganicPossessionFrame?.possessorParticipantRole,
        ]),
    }, {
        plan: ["authorized", 1],
        coordinates: Array.from({ length: 1 }, () => [
            "authorized", true, "possessive", "whole",
        ]),
    });

    const groupProof = Boolean(
        bone.authorizationStatus === "authorized"
        && boneFrame?.possessorIdentifiesWhole
        && boneFrame?.possessumIdentifiesIntegralPart
        && absolutive.authorizationStatus === "blocked"
        && noPossessor.authorizationStatus === "blocked"
        && ordinaryCharacteristic.authorizationStatus === "authorized"
        && natural.authorizationStatus === "authorized"
        && distributions.every(item => item[1] === "authorized")
        && unlisted.authorizationStatus === "authorized"
        && coordinates.every(coordinate => coordinate.scalarEquivalent)
    );
    for (const record of writing) {
        s.ok(record.atomId, groupProof);
        s.ok(`mutation:${record.atomId}`,
            absolutive.authorizationStatus === "blocked"
            && noPossessor.authorizationStatus === "blocked"
            && ordinaryCharacteristic.operationFrame
                ?.characteristicOrganicPossessionFrame == null);
    }
    return s;
}

module.exports = { run };
