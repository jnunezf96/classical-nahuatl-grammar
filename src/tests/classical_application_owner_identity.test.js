"use strict";

const { createSuite } = require("./runner");
function buildCanonicalNncClause(ctx, stem) {
    const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject: "3sg",
        nounClass: "zero",
        animacy: "animate",
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [
            nnc.nncSlotFrame,
            {
                sentenceType: "assertion",
                polarity: "positive",
            },
        ],
    });
    return receipt.canonicalResult;
}

function run(ctx) {
    const s = createSuite("classical_application_owner_identity");

    const nominalRequest = {
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: "coy-ō",
            embedClass: "zero",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
        },
        relation: "adverb",
        route: "direct-adverb",
        adverbRole: "compared-manner",
        orientation: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
    };
    const deverbalRequest = {
        constructionKind: "vocative",
        source: {
            wordStem: "pix",
            numberConnector: "c",
        },
    };
    const adverbialRequest = {
        adverbialPotentialFrame:
            ctx.resolveClassicalNahuatlAdverbialPotential({
                stem: "cencah",
                clauseKind: "vnc",
            }),
    };
    const relationalRequest = {
        nounstem: {
            kind: "classical-nahuatl-nnc-nounstem-request",
            stemId: "tlan-bottom",
            operation: "relational-nnc",
            formation: "option-two",
            sourceKind: "nounstem",
            sourceMode: "embed-matrix",
            sourceStem: "cal",
            sourceEmbedStem: "cal",
            sourceMatrixStem: "tlan",
        },
        state: "absolutive",
        subjectMode: "adverbialized",
    };
    const principal = buildCanonicalNncClause(ctx, "cueitl");
    const modifier = buildCanonicalNncClause(ctx, "canahuac");
    const adjunctionRequest = {
        principalClause: principal,
        adjoinedUnit: modifier,
        semanticRelation: "place",
        adverbializationDegree: "first",
        structureKind: "simple",
        adjoinedUnitType: "nnc",
        order: "modifier-head",
        recursion: "none",
        marking: "unmarked",
    };
    const ownerCases = [
        {
            id: "nominal-scalar",
            validator: "isClassicalNahuatlNominalConstructionResult",
            ownerResult:
                ctx.evaluateClassicalNahuatlNominalConstruction(
                    nominalRequest
                ),
            applicationResult:
                ctx.requestClassicalNominalConstructionResult(nominalRequest),
        },
        {
            id: "deverbal-scalar",
            validator: "isClassicalNahuatlDeverbalNncGrammarFrame",
            ownerResult:
                ctx.evaluateClassicalNahuatlDeverbalNnc(deverbalRequest),
            applicationResult:
                ctx.requestClassicalDeverbalNncResult(deverbalRequest),
        },
        {
            id: "adverbial-scalar",
            validator: "isClassicalNahuatlAdverbialNuclearResult",
            ownerResult:
                ctx.evaluateClassicalNahuatlAdverbialNuclear(
                    adverbialRequest
                ),
            applicationResult:
                ctx.requestClassicalAdverbialNncResult(adverbialRequest),
        },
        {
            id: "relational-scalar",
            validator: "isClassicalNahuatlRelationalResult",
            ownerResult:
                ctx.evaluateClassicalNahuatlRelationalNnc(
                    relationalRequest
                ),
            applicationResult:
                ctx.requestClassicalRelationalNncResult(relationalRequest),
        },
        {
            id: "adverbial-adjunction-scalar",
            validator: "isAdverbialAdjunctionResult",
            ownerResult:
                ctx.evaluateAdverbialAdjunction(adjunctionRequest),
            applicationResult:
                ctx.requestClassicalAdverbialAdjunctionResult(
                    adjunctionRequest
                ),
        },
    ];

    s.eq(
        "selected scalar routes accept only their owner-issued canonical result",
        ownerCases.map((entry) => ({
            id: entry.id,
            ownerIssued: ctx[entry.validator](entry.ownerResult),
            applicationIssued: ctx[entry.validator](
                entry.applicationResult
            ),
            applicationAuthorized:
                entry.applicationResult?.authorizationStatus
                    === "authorized"
                || entry.applicationResult?.supported === true
                    && entry.applicationResult?.ok === true,
        })),
        ownerCases.map((entry) => ({
            id: entry.id,
            ownerIssued: true,
            applicationIssued: true,
            applicationAuthorized: true,
        }))
    );

    s.eq(
        "spread and JSON shape copies cannot impersonate owner issuance",
        ownerCases.map((entry) => ({
            id: entry.id,
            spreadAccepted: ctx[entry.validator]({
                ...entry.ownerResult,
            }),
            frozenShapePerfectAccepted: ctx[entry.validator](
                Object.freeze({
                    ...entry.ownerResult,
                })
            ),
            jsonAccepted: ctx[entry.validator](
                JSON.parse(JSON.stringify(entry.ownerResult))
            ),
        })),
        ownerCases.map((entry) => ({
            id: entry.id,
            spreadAccepted: false,
            frozenShapePerfectAccepted: false,
            jsonAccepted: false,
        }))
    );

    const nominalPlan =
        ctx.prepareClassicalNominalConstructionParadigmPlan({
            ...nominalRequest,
            subjects: ["3sg"],
        });
    const nominalCoordinates =
        ctx.projectClassicalNominalConstructionParadigmCoordinates(
            nominalPlan,
            [{
                subject: "3sg",
                state: "not-applicable",
            }]
        );
    s.eq(
        "nominal scalar, plan, and coordinate projections each retain owner identity",
        {
            planStatus: nominalPlan?.authorizationStatus,
            planIssued:
                ctx.isClassicalNahuatlNominalConstructionParadigmPlan(
                    nominalPlan
                ),
            planSpread:
                ctx.isClassicalNahuatlNominalConstructionParadigmPlan({
                    ...nominalPlan,
                }),
            planFrozenShapePerfect:
                ctx.isClassicalNahuatlNominalConstructionParadigmPlan(
                    Object.freeze({
                        ...nominalPlan,
                    })
                ),
            planJson:
                ctx.isClassicalNahuatlNominalConstructionParadigmPlan(
                    JSON.parse(JSON.stringify(nominalPlan))
                ),
            coordinateCount: nominalCoordinates?.length,
            coordinateStatus:
                nominalCoordinates?.[0]?.authorizationStatus,
            coordinateIssued:
                ctx.isClassicalNahuatlNominalConstructionParadigmCoordinate(
                    nominalCoordinates?.[0]
                ),
            coordinateSpread:
                ctx.isClassicalNahuatlNominalConstructionParadigmCoordinate({
                    ...nominalCoordinates?.[0],
                }),
            coordinateFrozenShapePerfect:
                ctx.isClassicalNahuatlNominalConstructionParadigmCoordinate(
                    Object.freeze({
                        ...nominalCoordinates?.[0],
                    })
                ),
            coordinateJson:
                ctx.isClassicalNahuatlNominalConstructionParadigmCoordinate(
                    JSON.parse(JSON.stringify(nominalCoordinates?.[0]))
                ),
        },
        {
            planStatus: "authorized",
            planIssued: true,
            planSpread: false,
            planFrozenShapePerfect: false,
            planJson: false,
            coordinateCount: 1,
            coordinateStatus: "authorized",
            coordinateIssued: true,
            coordinateSpread: false,
            coordinateFrozenShapePerfect: false,
            coordinateJson: false,
        }
    );

    return s;
}

module.exports = { run };
