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

    return s;
}

module.exports = { run };
