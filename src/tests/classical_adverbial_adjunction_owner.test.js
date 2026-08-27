"use strict";

const { createSuite } = require("./runner");

function issuePrincipal(ctx) {
    return ctx.requestClassicalPlaceGentilicResult({
        constructionKind: "place-name",
        formation: "co",
        source: { embedStem: "Cal" },
        usage: "predicate",
    });
}

function issuePlace(ctx) {
    return ctx.requestClassicalPlaceGentilicResult({
        constructionKind: "place-name",
        formation: "co",
        source: { embedStem: "Tlach" },
        usage: "adverbial",
    });
}

function issueRelationalNnc(ctx, {
    stemId,
    embedStem,
    matrixStem,
    sourceKind = "nounstem",
    sourceFormation = "plain-nounstem",
}) {
    return ctx.requestClassicalRelationalNncResult({
        nounstem: {
            kind: ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND
                || "classical-nahuatl-nnc-nounstem-request",
            stemId,
            formation: "option-two",
            operation: "relational-nnc",
            sourceKind,
            sourceFormation,
            sourceMode: "embed-matrix",
            sourceStem: embedStem,
            sourceEmbedStem: embedStem,
            sourceMatrixStem: matrixStem,
        },
        state: "absolutive",
        subjectMode: "adverbialized",
        subjectId: "3common",
    });
}

function issueNumeralLocative(ctx) {
    return issueRelationalNnc(ctx, {
        stemId: "n-locative",
        embedStem: "cec",
        matrixStem: "n",
    });
}

function issueCoCLocative(ctx) {
    return issueRelationalNnc(ctx, {
        stemId: "co-c-specific-location",
        embedStem: "xahcal",
        matrixStem: "co",
    });
}

function issueCardinal(ctx, value) {
    return ctx.requestClassicalNominalConstructionResult({
        constructionKind: "cardinal-numeral-nnc",
        value,
        classifier: "basic",
        countKind: "ordinary",
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
}

function createController(ctx, overrides = {}) {
    const target = Object.create(ctx);
    Object.entries(overrides).forEach(([name, value]) => {
        Object.defineProperty(target, name, {
            configurable: true,
            enumerable: true,
            value,
        });
    });
    const api = ctx.createClassicalClauseRelationControllerGlobals(target);
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
    return target.createClassicalClauseRelationController();
}

function run(ctx) {
    const s = createSuite("classical_adverbial_adjunction_owner");

    s.eq(
        "the semantic adjunction owner issues relation and rank availability from canonical Source Results only",
        (() => {
            const principal = issuePrincipal(ctx);
            const place = issuePlace(ctx);
            const contract =
                ctx.issueAdverbialAdjunctionAvailabilityContract({
                    principalClause: principal,
                    adjoinedUnit: place,
                });
            const copied = {
                ...contract,
                availableRelations: [...contract.availableRelations],
                relationRanks: contract.relationRanks.map(entry => ({
                    relation: entry.relation,
                    ranks: [...entry.ranks],
                })),
            };
            const raw = ctx.issueAdverbialAdjunctionAvailabilityContract({
                principalClause: {
                    kind: "forged-principal",
                    surface: "stored principal",
                },
                adjoinedUnit: {
                    kind: "forged-adjoined",
                    surface: "stored adjunct",
                },
            });
            const copiedSources =
                ctx.issueAdverbialAdjunctionAvailabilityContract({
                    principalClause: { ...principal },
                    adjoinedUnit: { ...place },
                });
            return {
                kind: contract.kind,
                operationId: contract.operationId,
                evaluationMode: contract.evaluationMode,
                paradigmApplicability: contract.paradigmApplicability,
                status: contract.authorizationStatus,
                relations: contract.availableRelations,
                placeRanks:
                    ctx.getAdverbialAdjunctionRanksFromAvailability(
                        contract,
                        "place",
                    ),
                timeRanks:
                    ctx.getAdverbialAdjunctionRanksFromAvailability(
                        contract,
                        "time",
                    ),
                durationRanks:
                    ctx.getAdverbialAdjunctionRanksFromAvailability(
                        contract,
                        "duration",
                    ),
                issuedValid:
                    ctx.isAdverbialAdjunctionAvailabilityContract(contract),
                copiedValid:
                    ctx.isAdverbialAdjunctionAvailabilityContract(copied),
                copiedRanks:
                    ctx.getAdverbialAdjunctionRanksFromAvailability(
                        copied,
                        "place",
                    ),
                raw: [
                    ctx.isAdverbialAdjunctionAvailabilityContract(raw),
                    raw.authorizationStatus,
                    raw.blockReason,
                    raw.availableRelations,
                ],
                copiedSources: [
                    copiedSources.authorizationStatus,
                    copiedSources.blockReason,
                    copiedSources.availableRelations,
                ],
                retiredLessonGlobals: [
                    typeof ctx.LESSON49_SIMPLE_ADVERBIAL_MODIFICATION_FRAME,
                    typeof ctx.LESSON50_TIME_PLACE_MANNER_FRAME,
                    typeof ctx.getLesson49AdverbialAdjunctionSubsectionInventory,
                    typeof ctx.getLesson50AdverbialAdjunctionSubsectionInventory,
                ],
            };
        })(),
        {
            kind: "adverbial-adjunction-availability-contract",
            operationId: "clause:adverbial-adjunction",
            evaluationMode: "scalar-clause-composition",
            paradigmApplicability: "not-applicable",
            status: "authorized",
            relations: [
                "time",
                "place",
                "duration",
                "manner",
                "compared-manner",
                "means",
                "consideration",
                "purpose",
                "condition",
                "concession",
                "consequence",
                "proviso",
                "reason",
            ],
            placeRanks: ["first", "second", "nonadverbialized"],
            timeRanks: ["second", "nonadverbialized"],
            durationRanks: ["first"],
            issuedValid: true,
            copiedValid: false,
            copiedRanks: [],
            raw: [
                true,
                "blocked",
                "adverbial-adjunction-availability-canonical-principal-result-required",
                [],
            ],
            copiedSources: [
                "blocked",
                "adverbial-adjunction-availability-canonical-principal-result-required",
                [],
            ],
            retiredLessonGlobals: [
                "undefined",
                "undefined",
                "undefined",
                "undefined",
            ],
        }
    );

    s.eq(
        "the controller consumes only owner-issued availability and preserves one scalar Result with independent formula and written projections",
        (() => {
            const principal = issuePrincipal(ctx);
            const place = issuePlace(ctx);
            const controller = createController(ctx);
            const captures = [
                controller.captureCurrentResult("principal", principal),
                controller.captureCurrentResult("adjoined", place),
            ].map(result => result.authorizationStatus);
            const decision = controller.buildDecisionContract({
                relation: "place",
                degree: "first",
                order: "modifier-head",
            });
            const result = controller.compose({
                relation: "place",
                degree: "first",
                order: "modifier-head",
            });
            const issuedAvailability =
                ctx.issueAdverbialAdjunctionAvailabilityContract({
                    principalClause: principal,
                    adjoinedUnit: place,
                });
            const copiedAvailability = {
                ...issuedAvailability,
                availableRelations: [...issuedAvailability.availableRelations],
            };
            const hostileController = createController(ctx, {
                issueAdverbialAdjunctionAvailabilityContract() {
                    return copiedAvailability;
                },
            });
            hostileController.captureCurrentResult("principal", principal);
            hostileController.captureCurrentResult("adjoined", place);
            const hostile = hostileController.buildDecisionContract({
                relation: "place",
                degree: "first",
                order: "modifier-head",
            });
            const copiedResult = { ...result.canonicalResult };
            return {
                captures,
                relationValues:
                    decision.decisions.find(item => item.id === "relation")
                        ?.values,
                rankValues:
                    decision.decisions.find(item => item.id === "degree")
                        ?.values,
                selectedRank: decision.degree,
                status: result.authorizationStatus,
                ownerResult:
                    ctx.isAdverbialAdjunctionResult(result.canonicalResult),
                copiedResult:
                    ctx.isAdverbialAdjunctionResult(copiedResult),
                formula:
                    result.canonicalResult?.grammarFrame?.resultFrame
                        ?.formulaRecord?.formula,
                written:
                    result.canonicalResult?.grammarFrame?.resultFrame
                        ?.formulaRealizationRecord?.surface,
                hostile: {
                    status: hostile.authorizationStatus,
                    reason: hostile.blockReason,
                    relationValues:
                        hostile.decisions.find(item => item.id === "relation")
                            ?.values,
                },
            };
        })(),
        {
            captures: ["authorized", "authorized"],
            relationValues: [
                "adjectival-modification",
                "object-complement",
                "subject-complement",
                "adverbial-complement",
                "conjunction",
                "correlative-conjunction",
                "lexical-conjunction",
                "parallel-structure",
                "comparison",
                "supplementation",
                "vocative",
                "rumored-report",
                "deleted-principal",
                "negative-ac-plural",
                "contextual-first-person-realization",
                "exclamatory-utterance",
                "such-that-adjunction",
                "time",
                "place",
                "duration",
                "manner",
                "compared-manner",
                "means",
                "consideration",
                "purpose",
                "condition",
                "concession",
                "consequence",
                "proviso",
                "reason",
            ],
            rankValues: ["first", "second", "nonadverbialized"],
            selectedRank: "first",
            status: "authorized",
            ownerResult: true,
            copiedResult: false,
            formula: "MARKER? + ADJOINED(CN) + PRINCIPAL(CN)",
            written: "Tlachco Calco",
            hostile: {
                status: "blocked",
                reason: "classical-clause-relation-place-owner-incompatible",
                relationValues: [
                    "adjectival-modification",
                    "object-complement",
                    "subject-complement",
                    "adverbial-complement",
                    "conjunction",
                    "correlative-conjunction",
                    "lexical-conjunction",
                    "parallel-structure",
                    "comparison",
                    "supplementation",
                    "vocative",
                    "rumored-report",
                    "deleted-principal",
                    "negative-ac-plural",
                    "contextual-first-person-realization",
                    "exclamatory-utterance",
                    "such-that-adjunction",
                    "time",
                    "place",
                    "duration",
                    "manner",
                    "compared-manner",
                    "means",
                    "consideration",
                    "purpose",
                    "condition",
                    "concession",
                    "consequence",
                    "proviso",
                    "reason",
                ],
            },
        }
    );

    s.eq(
        "the Lesson 46 owner composes an exact adverbialized numeral locative with an exact co/c Result under one fixed place profile",
        (() => {
            const head = issueCoCLocative(ctx);
            const modifier = issueNumeralLocative(ctx);
            const ownerContract =
                ctx.issueRelationalNumeralCoCAdjunctionContract(
                    head,
                    modifier,
                );
            const availability =
                ctx.issueAdverbialAdjunctionAvailabilityContract({
                    principalClause: head,
                    adjoinedUnit: modifier,
                });
            const result = ctx.requestClassicalAdverbialAdjunctionResult({
                principalClause: head,
                adjoinedUnit: modifier,
                semanticRelation: "time",
                adverbializationDegree: "first",
                structureKind: "apposition",
                adjoinedUnitType: "nnc",
                order: "head-modifier",
                recursion: "appositive",
                marking: "unmarked",
            });
            const controller = createController(ctx);
            const captures = [
                controller.captureCurrentResult("principal", head),
                controller.captureCurrentResult("adjoined", modifier),
            ].map(capture => capture.authorizationStatus);
            const decision = controller.buildDecisionContract({
                relation: "place",
            });
            const composed = controller.compose({ relation: "place" });
            return {
                exactSources: [
                    ctx.isClassicalNahuatlRelationalResult(head),
                    ctx.isClassicalNahuatlRelationalResult(modifier),
                    head.surface,
                    modifier.surface,
                ],
                owner: {
                    exact:
                        ctx.isRelationalNumeralCoCAdjunctionContract(
                            ownerContract,
                        ),
                    status: ownerContract.authorizationStatus,
                    profile: [
                        ownerContract.relation,
                        ownerContract.degree,
                        ownerContract.structure,
                        ownerContract.order,
                        ownerContract.recursion,
                        ownerContract.marking,
                    ],
                    identities: [
                        ownerContract.principalResult === head,
                        ownerContract.adjoinedResult === modifier,
                    ],
                },
                availability: {
                    status: availability.authorizationStatus,
                    relations: availability.availableRelations,
                    placeRanks:
                        ctx.getAdverbialAdjunctionRanksFromAvailability(
                            availability,
                            "place",
                        ),
                    sameOwner:
                        availability.relationalNumeralCoCContract
                            ?.principalResult === head
                        && availability.relationalNumeralCoCContract
                            ?.adjoinedResult === modifier,
                },
                result: {
                    exact: ctx.isAdverbialAdjunctionResult(result),
                    surface: result.surface,
                    profile: [
                        result.ruleProfile?.relation,
                        result.ruleProfile?.degree,
                        result.ruleProfile?.structure,
                        result.ruleProfile?.order,
                        result.ruleProfile?.recursion,
                        result.ruleProfile?.marking,
                    ],
                    identities: [
                        result.relationalNumeralCoCContract
                            ?.principalResult === head,
                        result.relationalNumeralCoCContract
                            ?.adjoinedResult === modifier,
                    ],
                },
                controller: {
                    captures,
                    status: decision.authorizationStatus,
                    unresolved: decision.unresolvedDecisionIds,
                    decisions: decision.decisions.map(item => item.id),
                    fixed: [
                        decision.relation,
                        decision.degree,
                        decision.derived?.structureKind,
                        decision.derived?.order,
                        decision.derived?.recursion,
                        decision.derived?.marking,
                        decision.derived?.relationalNumeralCoCFixedProfile,
                    ],
                    composed: [
                        composed.authorizationStatus,
                        composed.presentation?.surface,
                        ctx.isAdverbialAdjunctionResult(
                            composed.canonicalResult,
                        ),
                    ],
                },
            };
        })(),
        {
            exactSources: [true, true, "xahcalco", "cecni"],
            owner: {
                exact: true,
                status: "authorized",
                profile: [
                    "place",
                    "second",
                    "simple",
                    "modifier-head",
                    "none",
                    "unmarked",
                ],
                identities: [true, true],
            },
            availability: {
                status: "authorized",
                relations: ["place"],
                placeRanks: ["second"],
                sameOwner: true,
            },
            result: {
                exact: true,
                surface: "cecni xahcalco",
                profile: [
                    "place",
                    "second",
                    "simple",
                    "modifier-head",
                    "none",
                    "unmarked",
                ],
                identities: [true, true],
            },
            controller: {
                captures: ["authorized", "authorized"],
                status: "authorized",
                unresolved: [],
                decisions: ["relation"],
                fixed: [
                    "place",
                    "second",
                    "simple",
                    "modifier-head",
                    "none",
                    "unmarked",
                    true,
                ],
                composed: ["authorized", "cecni xahcalco", true],
            },
        }
    );

    s.eq(
        "the Lesson 46 owner rejects raw cē and ōme Results and gives the exact recovery step",
        [1, 2].map(value => {
            const head = issueCoCLocative(ctx);
            const rawCardinal = issueCardinal(ctx, value);
            const ownerContract =
                ctx.issueRelationalNumeralCoCAdjunctionContract(
                    head,
                    rawCardinal,
                );
            const availability =
                ctx.issueAdverbialAdjunctionAvailabilityContract({
                    principalClause: head,
                    adjoinedUnit: rawCardinal,
                });
            const attempted = ctx.evaluateAdverbialAdjunction({
                principalClause: head,
                adjoinedUnit: rawCardinal,
                semanticRelation: "place",
                adverbializationDegree: "second",
                structureKind: "simple",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                recursion: "none",
                marking: "unmarked",
            });
            return {
                value,
                rawSurface: rawCardinal.wordSurface,
                rawExact:
                    ctx.isClassicalNahuatlNominalConstructionResult(
                        rawCardinal,
                    ),
                ownerExact:
                    ctx.isRelationalNumeralCoCAdjunctionContract(
                        ownerContract,
                    ),
                ownerStatus: ownerContract.authorizationStatus,
                reason: ownerContract.blockReason,
                recovery: ownerContract.recovery,
                availability: [
                    availability.authorizationStatus,
                    availability.blockReason,
                    availability.availableRelations,
                ],
                attempted: [
                    attempted.supported,
                    ctx.isAdverbialAdjunctionResult(attempted),
                    attempted.diagnostics.includes(
                        "numeral-modifier-adverbial-result-required",
                    ),
                ],
            };
        }),
        [
            {
                value: 1,
                rawSurface: "cē",
                rawExact: true,
                ownerExact: true,
                ownerStatus: "blocked",
                reason: "numeral-modifier-adverbial-result-required",
                recovery:
                    "First make the numeral locative Result (for example cecni or ceccān), then use that Result as the modifier.",
                availability: [
                    "blocked",
                    "numeral-modifier-adverbial-result-required",
                    [],
                ],
                attempted: [false, false, true],
            },
            {
                value: 2,
                rawSurface: "ōme",
                rawExact: true,
                ownerExact: true,
                ownerStatus: "blocked",
                reason: "numeral-modifier-adverbial-result-required",
                recovery:
                    "First make the numeral locative Result (for example cecni or ceccān), then use that Result as the modifier.",
                availability: [
                    "blocked",
                    "numeral-modifier-adverbial-result-required",
                    [],
                ],
                attempted: [false, false, true],
            },
        ]
    );

    return s;
}

module.exports = { run };
