"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_relational");
    const nounstemKind =
        ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND
        || "classical-nahuatl-nnc-nounstem-request";
    const request = (nounstem, clause = {}) => ({
        nounstem: {
            kind: nounstemKind,
            ...nounstem,
        },
        subjectMode: "adverbialized",
        ...clause,
    });
    const preteritAgentive = (sourceStem = "mich-namaca") =>
        ctx.requestClassicalDeverbalNncResult({
            constructionKind: "predicate-nominalization",
            nominalizationKind: "preterit-agentive",
            source: {
                sourceStage: "preterit-predicate",
                sourceStem,
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
                sourceSubject: "3sg",
            },
            subject: "3sg",
            state: "absolutive",
        });

    s.eq(
        "the retired relational classifier, lesson-specific builder, and generic generation route are absent",
        {
            classifier: typeof ctx.classifyRelationalNncCandidate,
            lessonBuilder:
                typeof ctx.buildLesson46PreteritAgentiveLocativeNncFromSource,
            genericRoute: typeof ctx.executeRelationalNncGenerationRoute,
            pseudoTense: ctx.TENSE_ORDER.includes(
                "locativo-agentivo-preterito"
            ),
        },
        {
            classifier: "undefined",
            lessonBuilder: "undefined",
            genericRoute: "undefined",
            pseudoTense: false,
        }
    );

    s.eq(
        "section 46.3.1.a consumes the owner-issued preterit-agentive Result and independently preserves its zero boundary",
        (() => {
            const upstream = preteritAgentive();
            const result = ctx.requestClassicalRelationalNncResult(request({
                stemId: "n-locative",
                operation: "relational-nnc",
                formation: "option-two",
                sourceFormation: "preterit-agentive",
                sourceMode: "embed-matrix",
                upstreamResult: upstream,
            }, {
                state: "possessive",
            }));
            return {
                upstream: [
                    upstream.authorizationStatus,
                    upstream.operationFrame?.operationId,
                    upstream.operationFrame?.targetStems?.generalUse,
                ],
                result: [
                    result.authorizationStatus,
                    result.sourceState,
                    result.formula,
                    result.surface,
                ],
                carrier: {
                    kind: result.sourceFrame?.upstreamSourceCarrier?.kind,
                    owner:
                        result.sourceFrame?.upstreamSourceCarrier?.ownerOperationId,
                    sameOwner:
                        result.sourceFrame?.upstreamSourceCarrier?.ownerResult
                        === upstream,
                    sourceKind:
                        result.sourceFrame?.upstreamSourceCarrier?.sourceKind,
                    sourceStem:
                        result.sourceFrame?.upstreamSourceCarrier?.sourceStem,
                    typedSegmentIdentity:
                        Boolean(
                            result.sourceFrame?.upstreamSourceCarrier
                                ?.sourceSegments
                        )
                        && result.sourceFrame.upstreamSourceCarrier
                            .sourceSegments
                        === upstream.operationFrame?.predicateStemFrame
                            ?.predicateSegments,
                    callerAuthority:
                        result.sourceFrame?.upstreamSourceCarrier
                            ?.callerSuppliedAuthorityAccepted,
                },
                projections: {
                    formulaCarriers:
                        result.formulaProjection?.predicateProjection
                            ?.segmentCarriers,
                    writtenCarriers:
                        result.writtenProjection?.predicateProjection
                            ?.segmentCarriers,
                    formulaDerivedFromWritten:
                        result.formulaDerivedFromWritten,
                    writtenDerivedFromFormula:
                        result.writtenDerivedFromFormula,
                },
            };
        })(),
        {
            upstream: [
                "authorized",
                "predicate-nominalization:preterit-agentive",
                "mich-namaca-0-cā",
            ],
            result: [
                "authorized",
                "absolutive",
                "#Ø-Ø(mich-namaca-0-cā-n)Ø-Ø#",
                "michnamacacān",
            ],
            carrier: {
                kind: "classical-nahuatl-relational-derived-source-carrier",
                owner: "predicate-nominalization:preterit-agentive",
                sameOwner: true,
                sourceKind: "preterit-agentive-general-use",
                sourceStem: "mich-namaca-0-cā",
                typedSegmentIdentity: false,
                callerAuthority: false,
            },
            projections: {
                formulaCarriers: ["mich", "namaca", "0", "cā", "n"],
                writtenCarriers: ["mich", "namaca", "", "cā", "n"],
                formulaDerivedFromWritten: false,
                writtenDerivedFromFormula: false,
            },
        }
    );

    s.eq(
        "missing, copied, wrong-operation, and contradictory upstream authority all fail closed",
        (() => {
            const issued = preteritAgentive();
            const copied = JSON.parse(JSON.stringify(issued));
            const activeAction =
                ctx.requestClassicalDeverbalNncResult({
                    constructionKind: "predicate-nominalization",
                    nominalizationKind: "active-action",
                    source: {
                        sourceStage: "distant-past-predicate",
                        sourceStem: "cochi",
                        verbClass: "B",
                        sourceVoice: "active",
                        sourceValence: "intransitive",
                        sourceObjectPattern: "none",
                        sourceSubject: "3sg",
                    },
                    subject: "3sg",
                    state: "absolutive",
                });
            const evaluateAttempt = (upstreamResult, extra = {}) => {
                return ctx.evaluateClassicalNahuatlRelationalNnc(request({
                    stemId: "n-locative",
                    operation: "relational-nnc",
                    formation: "option-two",
                    sourceFormation: "preterit-agentive",
                    upstreamResult,
                    ...extra,
                }));
            };
            const associated = ctx.requestClassicalRelationalNncResult(request({
                stemId: "pan-surface-time",
                operation: "associated-entity",
                formation: "option-two",
                sourceStem: "cuauhtlah",
                nounConnector: "tl",
            }, {
                subjectMode: "normal",
            }));
            const copiedAssociated = JSON.parse(JSON.stringify(associated));
            copiedAssociated.formulaPredicateStem = "FORGED";
            copiedAssociated.operationFrame.predicateStemFrame
                .predicateSegments = [{
                    morpheme: "FORGED",
                    formulaCarrier: "FORGED",
                    writtenCarrier: "forged",
                }];
            const copiedAssociatedPertinency =
                ctx.evaluateClassicalNahuatlRelationalNnc(request({
                    stemId: "pan-surface-time",
                    operation: "pertinency",
                    formation: "option-two",
                    pertinencySourceKind: "associated-entity",
                    upstreamResult: copiedAssociated,
                    nounConnector: "tl",
                }, {
                    subjectMode: "normal",
                }));
            return [
                evaluateAttempt(null),
                evaluateAttempt(copied),
                evaluateAttempt(activeAction),
                evaluateAttempt(issued, {
                    sourceKind: "nounstem",
                }),
                copiedAssociatedPertinency,
            ].map((result) => [
                result.authorizationStatus,
                result.diagnostics?.[0],
                result.surface,
                result.formula,
            ]);
        })(),
        [
            ["blocked", "owner-issued-upstream-result-required", "", ""],
            [
                "blocked",
                "canonical-deverbal-upstream-result-required",
                "",
                "",
            ],
            ["blocked", "deverbal-upstream-operation-mismatch", "", ""],
            ["blocked", "caller-derived-source-claim-mismatch", "", ""],
            [
                "blocked",
                "canonical-associated-entity-upstream-result-required",
                "",
                "",
            ],
        ]
    );

    s.eq(
        "option four, associated entity, and both pertinency compositions use the same canonical relational operation",
        (() => {
            const compound = ctx.requestClassicalRelationalNncResult(request({
                stemId: "huan-company",
                operation: "compound-embed",
                formation: "option-four",
                downstreamTargetStem: "poh",
            }));
            const associated = ctx.requestClassicalRelationalNncResult(request({
                stemId: "pan-surface-time",
                operation: "associated-entity",
                formation: "option-two",
                sourceStem: "cuauhtēnco",
                nounConnector: "tl",
            }, {
                subjectMode: "normal",
            }));
            const directPertinency =
                ctx.requestClassicalRelationalNncResult(request({
                    stemId: "pan-surface-time",
                    operation: "pertinency",
                    formation: "option-two",
                    sourceStem: "huehcapan",
                    pertinencySourceKind: "direct-relational",
                    nounConnector: "tl",
                }, {
                    subjectMode: "normal",
                }));
            const associatedSource =
                ctx.requestClassicalRelationalNncResult(request({
                    stemId: "pan-surface-time",
                    operation: "associated-entity",
                    formation: "option-two",
                    sourceStem: "cuauhtlah",
                    nounConnector: "tl",
                }, {
                    subjectMode: "normal",
                }));
            const associatedPertinency =
                ctx.requestClassicalRelationalNncResult(request({
                    stemId: "pan-surface-time",
                    operation: "pertinency",
                    formation: "option-two",
                    pertinencySourceKind: "associated-entity",
                    upstreamResult: associatedSource,
                    nounConnector: "tl",
                }, {
                    subjectMode: "normal",
                }));
            return [
                compound,
                associated,
                directPertinency,
                associatedPertinency,
            ].map((result) => ({
                operation: result.constructionKind,
                operationId: result.operationFrame?.operationId,
                formula: result.formula,
                surface: result.surface,
                owner:
                    result.sourceFrame?.upstreamSourceCarrier?.ownerOperationId
                    || "",
                typedSegmentIdentity:
                    Boolean(
                        result.sourceFrame?.upstreamSourceCarrier?.sourceSegments
                    )
                    && result.sourceFrame.upstreamSourceCarrier.sourceSegments
                    === associatedSource.operationFrame?.predicateStemFrame
                        ?.predicateSegments,
            }));
        })(),
        [
            {
                operation: "compound-embed",
                operationId: "relational-option-four-compound-embed",
                formula: "#Ø-Ø(huān-poh)Ø-Ø#",
                surface: "huāmpoh",
                owner: "",
                typedSegmentIdentity: false,
            },
            {
                operation: "associated-entity",
                operationId: "relational-associated-entity-ca",
                formula: "#Ø-Ø(cuauhtēn-ca)tl-Ø#",
                surface: "cuauhtēncatl",
                owner: "",
                typedSegmentIdentity: false,
            },
            {
                operation: "pertinency",
                operationId: "relational-pertinency-direct",
                formula: "#Ø-Ø(huehcapan-yō)tl-Ø#",
                surface: "huehcapanyōtl",
                owner: "",
                typedSegmentIdentity: false,
            },
            {
                operation: "pertinency",
                operationId: "relational-pertinency-from-associated-entity",
                formula: "#Ø-Ø(cuauhtlah-ca-yō)tl-Ø#",
                surface: "cuauhtlahcayōtl",
                owner: "relational-associated-entity-ca",
                typedSegmentIdentity: true,
            },
        ]
    );

    s.eq(
        "owner-issued composition remains pointwise identical between scalar and prepared coordinates",
        (() => {
            const upstream = preteritAgentive("pix-ca");
            const baseRequest = request({
                stemId: "n-locative",
                operation: "relational-nnc",
                formation: "option-two",
                sourceFormation: "preterit-agentive",
                upstreamResult: upstream,
            }, {
                state: "absolutive",
                subjectMode: "normal",
            });
            const coordinates = [
                { coordinateId: "first", subjectId: "1sg" },
                { coordinateId: "third", subjectId: "3sg" },
                { coordinateId: "plural", subjectId: "2pl" },
            ];
            const plan =
                ctx.buildClassicalNahuatlPreparedPlan(
                    baseRequest,
                    coordinates
                );
            return coordinates.map((coordinate) => {
                const scalar =
                    ctx.evaluateClassicalNahuatlRelationalNnc({
                        ...baseRequest,
                        ...coordinate,
                    });
                const projected =
                    ctx.projectClassicalNahuatlPreparedCoordinate(
                        plan,
                        coordinate.coordinateId
                    );
                return {
                    coordinateId: coordinate.coordinateId,
                    scalar: [scalar.formula, scalar.surface],
                    projected: [projected.formula, projected.surface],
                    equal:
                        scalar.formula === projected.formula
                        && scalar.surface === projected.surface,
                };
            });
        })(),
        [
            {
                coordinateId: "first",
                scalar: ["#ni-Ø(pix-ca-0-cā-n)Ø-Ø#", "nipixcacān"],
                projected: ["#ni-Ø(pix-ca-0-cā-n)Ø-Ø#", "nipixcacān"],
                equal: true,
            },
            {
                coordinateId: "third",
                scalar: ["#Ø-Ø(pix-ca-0-cā-n)Ø-Ø#", "pixcacān"],
                projected: ["#Ø-Ø(pix-ca-0-cā-n)Ø-Ø#", "pixcacān"],
                equal: true,
            },
            {
                coordinateId: "plural",
                scalar: ["#an-Ø(pix-ca-0-cā-n)Ø-Ø#", "anpixcacān"],
                projected: ["#an-Ø(pix-ca-0-cā-n)Ø-Ø#", "anpixcacān"],
                equal: true,
            },
        ]
    );

    return s;
}

module.exports = { run };
