"use strict";

const { createSuite } = require("./runner");

function createHarness(ctx) {
    const applicationTarget = ctx;

    let wrapperCallCount = 0;
    let lastWrapperRequest = null;
    let compositionWrapperCallCount = 0;
    let comparisonWrapperCallCount = 0;
    let lastCompositionWrapperRequest = null;
    let lastComparisonWrapperRequest = null;
    const controllerTarget = Object.create(applicationTarget);
    Object.defineProperty(controllerTarget, "requestClassicalAdverbialAdjunctionResult", {
        configurable: true,
        enumerable: true,
        value(request) {
            wrapperCallCount += 1;
            lastWrapperRequest = request;
            return applicationTarget.requestClassicalAdverbialAdjunctionResult(request);
        },
    });
    Object.defineProperty(controllerTarget, "requestClassicalClauseCompositionResult", {
        configurable: true,
        enumerable: true,
        value(request) {
            compositionWrapperCallCount += 1;
            lastCompositionWrapperRequest = request;
            return applicationTarget.requestClassicalClauseCompositionResult(
                request
            );
        },
    });
    Object.defineProperty(controllerTarget, "requestClassicalComparisonResult", {
        configurable: true,
        enumerable: true,
        value(request) {
            comparisonWrapperCallCount += 1;
            lastComparisonWrapperRequest = request;
            return applicationTarget.requestClassicalComparisonResult(request);
        },
    });
    const controllerApi =
        ctx.createClassicalClauseRelationControllerGlobals(controllerTarget);
    Object.defineProperties(
        controllerTarget,
        Object.getOwnPropertyDescriptors(controllerApi)
    );

    const issue = spec => {
        if (spec.unitKind === "nnc") {
            const nounFrame = spec.pronominalSubtype === "interrogative"
                ? applicationTarget.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "interrogative",
                    interrogativeKind: spec.interrogativeKind || "āc",
                    subject: spec.subject || "3sg",
                })
                : spec.nncSourceKind === "absolutive"
                    ? applicationTarget
                        .buildClassicalNahuatlAbsolutiveNncFrame(
                            spec.surface,
                            {
                                state: "absolutive",
                                subject: spec.subject || "3sg",
                                nounClass: spec.nounClass || "zero",
                                animacy: spec.animacy || "animate",
                                pluralConnector:
                                    spec.pluralConnector || "",
                            }
                        )
                : applicationTarget
                    .buildClassicalNahuatlClassGovernedNncFrame(
                        spec.surface,
                        {
                            state: "absolutive",
                            subject: spec.subject || "3sg",
                            nounClass: spec.nounClass || "zero",
                            classSelectionAuthority: "user-selection",
                        }
                    );
            const applicationResult =
                applicationTarget.executeClassicalGrammarApplicationRequest({
                operationId: "nnc:sentence-surface",
                args: [
                    nounFrame.nncSlotFrame,
                    {
                        sentenceType: spec.sentenceType || "assertion",
                        polarity: "positive",
                    },
                ],
            });
            return applicationResult;
        }
        if (spec.unitKind === "particle") {
            const particleId = {
                "in-tla": "l3-in-tla",
                in: "l3-in",
                ca: "l3-ca",
                "ma-zo": "l3-ma-zo",
            }[spec.marking] || "l3-in-tla";
            const sourceFrame =
                applicationTarget.buildClassicalNahuatlParticleSourceFrame(
                    particleId
                );
            const applicationResult =
                applicationTarget.executeClassicalGrammarApplicationRequest({
                operationId: "particle:result",
                args: [sourceFrame],
            });
            return applicationResult;
        }
        const principal = spec.surface === "niyāuh";
        const applicationResult =
            applicationTarget.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                sourceStem: spec.sourceStem
                    || (principal ? "yāuh" : "huāllā"),
                verbClass: spec.verbClass || "A",
                sourceValence: spec.sourceValence || "intransitive",
                subject: spec.subject || (principal ? "1sg" : "2sg"),
                objectKind: spec.objectKind || "none",
                objectPerson: spec.objectPerson || "",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: spec.mood || "indicative",
                tense: spec.tense || "present",
                antecessive: spec.antecessive === true,
                sentenceType: spec.sentenceType || "",
                outputScope: "single",
            }],
        });
        return applicationResult;
    };
    return {
        applicationTarget,
        controllerTarget,
        controller: controllerTarget.createClassicalClauseRelationController(),
        issue,
        getWrapperCallCount: () => wrapperCallCount,
        getLastWrapperRequest: () => lastWrapperRequest,
        getCompositionWrapperCallCount: () => compositionWrapperCallCount,
        getComparisonWrapperCallCount: () => comparisonWrapperCallCount,
        getLastCompositionWrapperRequest: () =>
            lastCompositionWrapperRequest,
        getLastComparisonWrapperRequest: () => lastComparisonWrapperRequest,
    };
}

function run(ctx) {
    const s = createSuite("classical_clause_relation_controller");

    s.eq(
        "the application boundary captures only its own issued current canonical Results",
        (() => {
            const harness = createHarness(ctx);
            const issued = harness.issue({
                id: "principal",
                surface: "niyāuh",
                unitKind: "vnc",
                mood: "indicative",
                tense: "present",
            });
            const canonicalCapture =
                harness.applicationTarget.captureClassicalGrammarApplicationResult(
                    issued.canonicalResult,
                    "principal"
                );
            const envelopeCapture =
                harness.applicationTarget.captureClassicalGrammarApplicationResult(
                    issued,
                    "principal"
                );
            const forgedCanonical = {
                ...issued.canonicalResult,
                formula: "#forged#",
                surface: "forged",
            };
            const forgedCapture =
                harness.applicationTarget.captureClassicalGrammarApplicationResult(
                    forgedCanonical,
                    "principal"
                );
            return {
                issuedAuthorization: issued.authorizationStatus,
                issuedBlockReason: issued.blockReason,
                issuedGcdSatisfied:
                    issued.greatestCommonDivisor?.satisfied === true,
                canonicalAuthorized: canonicalCapture.authorizationStatus,
                canonicalValid:
                    harness.applicationTarget.isClassicalGrammarApplicationResultCapture(
                        canonicalCapture,
                        "principal"
                    ),
                envelopeAuthorized: envelopeCapture.authorizationStatus,
                envelopeValid:
                    harness.applicationTarget.isClassicalGrammarApplicationResultCapture(
                        envelopeCapture,
                        "principal"
                    ),
                sameApplicationResult:
                    canonicalCapture.applicationResult === issued
                    && envelopeCapture.applicationResult === issued,
                forgedStatus: forgedCapture.authorizationStatus,
                forgedReason: forgedCapture.blockReason,
                forgedValid:
                    harness.applicationTarget.isClassicalGrammarApplicationResultCapture(
                        forgedCapture,
                        "principal"
                    ),
            };
        })(),
        {
            issuedAuthorization: "authorized",
            issuedBlockReason: "",
            issuedGcdSatisfied: true,
            canonicalAuthorized: "authorized",
            canonicalValid: true,
            envelopeAuthorized: "authorized",
            envelopeValid: true,
            sameApplicationResult: true,
            forgedStatus: "blocked",
            forgedReason:
                "classical-grammar-application-issued-authorized-result-required",
            forgedValid: false,
        }
    );

    s.eq(
        "relation availability follows owner-issued VNC and NNC captures without retaining an impossible selection",
        (() => {
            const harness = createHarness(ctx);
            const summarize = contract => {
                const decision = contract.decisions.find(
                    item => item.id === "relation"
                );
                const option = value => {
                    const record = decision.optionAvailability.find(
                        item => item.value === value
                    );
                    return [
                        record.status,
                        record.missingCaptureRoles,
                        decision.values.includes(value),
                    ];
                };
                return {
                    adjectival: option("adjectival-modification"),
                    objectComplement: option("object-complement"),
                    subjectComplement: option("subject-complement"),
                    lexicalConjunction: option("lexical-conjunction"),
                    comparison: option("comparison"),
                    vocative: option("vocative"),
                    negativeAc: option("negative-ac-plural"),
                    contextualFirst:
                        option("contextual-first-person-realization"),
                    place: option("place"),
                    consequence: option("consequence"),
                    proviso: option("proviso"),
                    reason: option("reason"),
                };
            };
            const empty = summarize(
                harness.controller.buildDecisionContract()
            );
            const principalVnc = harness.issue({
                surface: "quichīhuah",
                unitKind: "vnc",
                sourceStem: "chīhua",
                sourceValence: "specific-projective",
                subject: "3pl",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            harness.controller.captureCurrentResult(
                "principal",
                principalVnc.canonicalResult
            );
            const vncOnly = summarize(
                harness.controller.buildDecisionContract()
            );
            const complementNnc = harness.issue({
                surface: "tlahtoāni",
                unitKind: "nnc",
            });
            harness.controller.captureCurrentResult(
                "adjoined",
                complementNnc.canonicalResult
            );
            const vncAndNnc = summarize(
                harness.controller.buildDecisionContract()
            );
            const selectedBeforeTransition =
                harness.controller.buildDecisionContract({
                    relation: "subject-complement",
                });
            const principalNnc = harness.issue({
                surface: "pilli",
                unitKind: "nnc",
            });
            harness.controller.captureCurrentResult(
                "principal",
                principalNnc.canonicalResult
            );
            const nncAndNnc = summarize(
                harness.controller.buildDecisionContract()
            );
            const selectedAfterTransition =
                harness.controller.buildDecisionContract({
                    relation: "subject-complement",
                });
            return {
                empty,
                vncOnly,
                vncAndNnc,
                nncAndNnc,
                transition: [
                    selectedBeforeTransition.relation,
                    selectedAfterTransition.relation,
                    selectedAfterTransition.authorizationStatus,
                    selectedAfterTransition.blockReason,
                ],
            };
        })(),
        {
            empty: {
                adjectival: ["missing-prerequisite", ["principal", "adjoined"], true],
                objectComplement: ["missing-prerequisite", ["principal", "adjoined"], true],
                subjectComplement: ["missing-prerequisite", ["principal", "adjoined"], true],
                lexicalConjunction: ["missing-prerequisite", ["principal", "adjoined"], true],
                comparison: ["missing-prerequisite", ["principal"], true],
                vocative: ["missing-prerequisite", ["principal"], true],
                negativeAc: ["missing-prerequisite", ["principal"], true],
                contextualFirst: ["missing-prerequisite", ["principal"], true],
                place: ["missing-prerequisite", ["principal", "adjoined"], true],
                consequence: ["missing-prerequisite", ["principal", "adjoined"], true],
                proviso: ["missing-prerequisite", ["principal", "adjoined"], true],
                reason: ["missing-prerequisite", ["principal", "adjoined"], true],
            },
            vncOnly: {
                adjectival: ["incompatible", [], true],
                objectComplement: ["missing-prerequisite", ["adjoined"], true],
                subjectComplement: ["missing-prerequisite", ["adjoined"], true],
                lexicalConjunction: ["incompatible", [], true],
                comparison: ["available", [], true],
                vocative: ["incompatible", [], true],
                negativeAc: ["incompatible", [], true],
                contextualFirst: ["incompatible", [], true],
                place: ["missing-prerequisite", ["adjoined"], true],
                consequence: ["missing-prerequisite", ["adjoined"], true],
                proviso: ["missing-prerequisite", ["adjoined"], true],
                reason: ["missing-prerequisite", ["adjoined"], true],
            },
            vncAndNnc: {
                adjectival: ["incompatible", [], true],
                objectComplement: ["available", [], true],
                subjectComplement: ["available", [], true],
                lexicalConjunction: ["incompatible", [], true],
                comparison: ["available", [], true],
                vocative: ["incompatible", [], true],
                negativeAc: ["incompatible", [], true],
                contextualFirst: ["incompatible", [], true],
                place: ["available", [], true],
                consequence: ["incompatible", [], true],
                proviso: ["missing-prerequisite", ["marker"], true],
                reason: ["incompatible", [], true],
            },
            nncAndNnc: {
                adjectival: ["available", [], true],
                objectComplement: ["incompatible", [], true],
                subjectComplement: ["incompatible", [], true],
                lexicalConjunction: ["available", [], true],
                comparison: ["available", [], true],
                vocative: ["missing-prerequisite", [], true],
                negativeAc: ["incompatible", [], true],
                contextualFirst: ["incompatible", [], true],
                place: ["available", [], true],
                consequence: ["incompatible", [], true],
                proviso: ["missing-prerequisite", ["marker"], true],
                reason: ["incompatible", [], true],
            },
            transition: [
                "subject-complement",
                "",
                "blocked",
                "classical-clause-relation-subject-complement-source-incompatible",
            ],
        }
    );

    s.eq(
        "one Clause composition controller captures principal and adjoined Results and delegates the selected relation to the global application wrapper",
        (() => {
            const harness = createHarness(ctx);
            const principal = harness.issue({
                id: "principal",
                surface: "niyāuh",
                unitKind: "vnc",
                mood: "indicative",
                tense: "present",
            });
            const adjoined = harness.issue({
                id: "place",
                surface: "nepa",
                unitKind: "nnc",
            });
            const principalCapture = harness.controller.captureCurrentResult(
                "principal",
                principal.canonicalResult
            );
            const adjoinedCapture = harness.controller.captureCurrentResult(
                "adjoined",
                adjoined.canonicalResult
            );
            const decisionContract = harness.controller.buildDecisionContract({
                relation: "place",
                degree: "first",
                order: "modifier-head",
            });
            const result = harness.controller.compose({
                relation: "place",
                degree: "first",
                order: "modifier-head",
            });
            const request = harness.getLastWrapperRequest();
            return {
                captures: [
                    principalCapture.authorizationStatus,
                    adjoinedCapture.authorizationStatus,
                ],
                selectable: decisionContract.userSelectableFieldIds,
                derived: decisionContract.derived,
                wrapperCallCount: harness.getWrapperCallCount(),
                requestKeys: Object.keys(request || {}).sort(),
                status: result.authorizationStatus,
                blockReason: result.blockReason,
                formula: result.presentation.formula,
                surface: result.presentation.surface,
                canonicalFormula:
                    result.canonicalResult?.grammarFrame?.resultFrame
                        ?.formulaRecord?.formula || "",
                canonicalSurface:
                    result.canonicalResult?.grammarFrame?.resultFrame
                        ?.formulaRealizationRecord?.surface || "",
            };
        })(),
        {
            captures: ["authorized", "authorized"],
            selectable: ["relation", "degree", "order"],
            derived: {
                unitType: "nnc",
                mood: "",
                tense: "",
                antecessive: false,
                futureEmbed: false,
                structureKind: "simple",
                recursion: "none",
                order: "modifier-head",
                marking: "unmarked",
                principalSourceKind: "issued-vnc-application-result",
                adjoinedSourceKind: "issued-nnc-sentence-result",
            },
            wrapperCallCount: 1,
            requestKeys: [
                "adjoinedUnit",
                "adjoinedUnitType",
                "adverbializationDegree",
                "marking",
                "order",
                "principalClause",
                "recursion",
                "semanticRelation",
                "structureKind",
            ],
            status: "authorized",
            blockReason: "",
            formula: "MARKER? + ADJOINED(CN) + PRINCIPAL(CN)",
            surface: "nepa niyauh",
            canonicalFormula: "MARKER? + ADJOINED(CN) + PRINCIPAL(CN)",
            canonicalSurface: "nepa niyauh",
        }
    );

    s.eq(
        "unit, inflection features, structure, and recursion are derived while only unresolved semantic choices are exposed",
        (() => {
            const harness = createHarness(ctx);
            const principal = harness.issue({
                id: "principal",
                surface: "niyāuh",
                unitKind: "vnc",
                mood: "indicative",
                tense: "present",
            });
            const adjoined = harness.issue({
                id: "condition",
                surface: "tihualāz",
                unitKind: "vnc",
                mood: "optative",
                tense: "nonpast",
            });
            const marker = harness.issue({
                id: "condition-marker",
                surface: "in tla",
                unitKind: "particle",
                marking: "in-tla",
            });
            harness.controller.captureCurrentResult(
                "principal",
                principal.canonicalResult
            );
            harness.controller.captureCurrentResult(
                "adjoined",
                adjoined.canonicalResult
            );
            harness.controller.captureCurrentResult(
                "marker",
                marker.canonicalResult
            );
            const open = harness.controller.buildDecisionContract({
                relation: "condition",
                relationProfile: "open",
                order: "modifier-head",
            });
            const result = harness.controller.compose({
                relation: "condition",
                relationProfile: "open",
                order: "modifier-head",
            });
            const poisonedDerived = harness.controller.buildDecisionContract({
                relation: "condition",
                relationProfile: "open",
                order: "modifier-head",
                unitType: "sentence",
            });
            return {
                decisions: open.decisions.map(decision => ({
                    id: decision.id,
                    values: decision.values,
                    selected: decision.selectedValue,
                })),
                derived: open.derived,
                status: result.authorizationStatus,
                blockReason: result.blockReason,
                surface: result.presentation.surface,
                ruleProfile: result.canonicalResult?.ruleProfile || null,
                poisonedStatus: poisonedDerived.authorizationStatus,
                poisonedReason: poisonedDerived.blockReason,
            };
        })(),
        {
            decisions: [
                {
                    id: "relation",
                    values: [
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
                    selected: "condition",
                },
                {
                    id: "order",
                    values: ["modifier-head", "head-modifier"],
                    selected: "modifier-head",
                },
                {
                    id: "relation-profile",
                    values: [
                        "open",
                        "hypothetical-present-future",
                        "hypothetical-past",
                    ],
                    selected: "open",
                },
            ],
            derived: {
                unitType: "vnc",
                mood: "optative",
                tense: "nonpast",
                antecessive: false,
                futureEmbed: false,
                structureKind: "complex",
                recursion: "none",
                order: "modifier-head",
                marking: "in-tla",
                principalSourceKind: "issued-vnc-application-result",
                adjoinedSourceKind: "issued-vnc-application-result",
            },
            status: "authorized",
            blockReason: "",
            surface: "in tlā xihuāllauh niyauh",
            ruleProfile: {
                kind: "adverbial-adjunction-rule-profile",
                version: 2,
                relation: "condition",
                degree: "nonadverbialized",
                structure: "complex",
                order: "modifier-head",
                recursion: "none",
                marking: "in-tla",
                contrast: "unknown",
                timeProfile: "unknown",
                conditionType: "open",
                purposeType: "unknown",
                concessionType: "unknown",
                unitType: "vnc",
                intensifier: false,
                inherentlyInterrogative: false,
                interrogativeForceRetained: false,
                includedInLargerSentence: false,
                conditionalCuePresent: false,
                negative: false,
                principalCorroboratingAdverbial: false,
                reducedCopula: false,
                explicitAdverbialIndicator: false,
            },
            poisonedStatus: "blocked",
            poisonedReason:
                "classical-clause-relation-selection-not-recognized:unitType",
        }
    );

    s.eq(
        "composition Results remain app-issued and can be captured recursively without copying formula or surface strings",
        (() => {
            const harness = createHarness(ctx);
            const principal = harness.issue({
                id: "principal",
                surface: "niyāuh",
                unitKind: "vnc",
            });
            const manner = harness.issue({
                id: "manner",
                surface: "ihciuhca",
                unitKind: "nnc",
            });
            harness.controller.captureCurrentResult(
                "principal",
                principal.canonicalResult
            );
            harness.controller.captureCurrentResult(
                "adjoined",
                manner.canonicalResult
            );
            const inner = harness.controller.compose({
                relation: "manner",
                degree: "second",
                order: "modifier-head",
            });
            const time = harness.issue({
                id: "time",
                surface: "āxcān",
                unitKind: "nnc",
            });
            const innerCapture = harness.controller.captureCurrentResult(
                "principal",
                inner.canonicalResult
            );
            harness.controller.captureCurrentResult(
                "adjoined",
                time.canonicalResult
            );
            const outer = harness.controller.compose({
                relation: "time",
                degree: "second",
                structureProfile: "modification",
                order: "modifier-head",
            });
            return {
                innerStatus: inner.authorizationStatus,
                captureStatus: innerCapture.authorizationStatus,
                captureKind: innerCapture.sourceKind,
                outerStatus: outer.authorizationStatus,
                recursion: outer.decisionContract.derived.recursion,
                structure: outer.decisionContract.derived.structureKind,
                surface: outer.presentation.surface,
            };
        })(),
        {
            innerStatus: "authorized",
            captureStatus: "authorized",
            captureKind: "composition-ast",
            outerStatus: "authorized",
            recursion: "head",
            structure: "complex",
            surface: "āxcān ihciuhca niyauh",
        }
    );

    s.eq(
        "restored DOM, URL, stored answers, and display strings never replace captured Result identity",
        (() => {
            const harness = createHarness(ctx);
            const principal = harness.issue({
                id: "principal",
                surface: "niyāuh",
                unitKind: "vnc",
            });
            const adjoined = harness.issue({
                id: "place",
                surface: "nepa",
                unitKind: "nnc",
            });
            harness.controller.captureCurrentResult(
                "principal",
                principal.canonicalResult
            );
            harness.controller.captureCurrentResult(
                "adjoined",
                adjoined.canonicalResult
            );
            const forgedCapture = harness.controller.captureCurrentResult(
                "principal",
                {
                    kind: "classical-grammar-application-result",
                    authorizationStatus: "authorized",
                    canonicalResult: principal.canonicalResult,
                    surface: "restored-principal",
                }
            );
            const hostileKeys = [
                ["formula", "#restored#"],
                ["surface", "restored surface"],
                ["selectedResult", { surface: "stored result" }],
                ["urlState", "relation=reason&surface=forged"],
                ["restoredState", { relation: "reason" }],
                ["storedAnswer", "forged answer"],
                ["lesson", 50],
            ];
            const blocked = hostileKeys.map(([key, value]) => {
                const result = harness.controller.compose({
                    relation: "place",
                    degree: "first",
                    order: "modifier-head",
                    [key]: value,
                });
                return [key, result.authorizationStatus, result.blockReason];
            });
            const clean = harness.controller.compose({
                relation: "place",
                degree: "first",
                order: "modifier-head",
            });
            return {
                forgedCapture: [
                    forgedCapture.authorizationStatus,
                    forgedCapture.blockReason,
                ],
                blocked,
                wrapperCalls: harness.getWrapperCallCount(),
                cleanSurface: clean.presentation.surface,
                principalSurface:
                    harness.controller.getState().captures.principal.surface,
            };
        })(),
        {
            forgedCapture: [
                "blocked",
                "classical-grammar-application-issued-authorized-result-required",
            ],
            blocked: [
                [
                    "formula",
                    "blocked",
                    "classical-clause-relation-forbidden-authority:formula",
                ],
                [
                    "surface",
                    "blocked",
                    "classical-clause-relation-forbidden-authority:surface",
                ],
                [
                    "selectedResult",
                    "blocked",
                    "classical-clause-relation-forbidden-authority:selectedResult",
                ],
                [
                    "urlState",
                    "blocked",
                    "classical-clause-relation-forbidden-authority:urlState",
                ],
                [
                    "restoredState",
                    "blocked",
                    "classical-clause-relation-forbidden-authority:restoredState",
                ],
                [
                    "storedAnswer",
                    "blocked",
                    "classical-clause-relation-forbidden-authority:storedAnswer",
                ],
                [
                    "lesson",
                    "blocked",
                    "classical-clause-relation-forbidden-authority:lesson",
                ],
            ],
            wrapperCalls: 1,
            cleanSurface: "nepa niyauh",
            principalSurface: "niyauh",
        }
    );

    s.eq(
        "Lesson 51 object complementation consumes captured owner Results and independently projects exact formula and written form",
        (() => {
            const harness = createHarness(ctx);
            const principal = harness.issue({
                surface: "quichīhuah",
                unitKind: "vnc",
                sourceStem: "chīhua",
                sourceValence: "specific-projective",
                subject: "3pl",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const complement = harness.issue({
                surface: "tlahtoāni",
                unitKind: "nnc",
            });
            const captures = [
                ["principal", principal],
                ["adjoined", complement],
            ].map(([role, result]) => harness.controller.captureCurrentResult(
                role,
                result.canonicalResult
            ).authorizationStatus);
            const selections = {
                relation: "object-complement",
                semanticCategory: "change",
                complementOrder: "complement-principal",
                linkKind: "object-subject",
                designationStructure: "ordinary-object-complement",
            };
            const result = harness.controller.compose(selections);
            return {
                captures,
                wrapperCalls: harness.getCompositionWrapperCallCount(),
                operation:
                    harness.getLastCompositionWrapperRequest()?.operationKind,
                principalObjectId:
                    harness.getLastCompositionWrapperRequest()
                        ?.options?.principalObjectId,
                principalObjectDecisionPresent:
                    result.decisionContract.decisions.some(
                        decision => decision.id === "principal-object-id"
                    ),
                derivedPrincipalObjectId:
                    result.decisionContract.derived
                        ?.principalObjectIdDerived,
                status: result.authorizationStatus,
                blockReason: result.blockReason,
                formula: result.presentation.formula,
                surface: result.presentation.surface,
                records: [
                    result.canonicalResult?.formulaRecord?.formula,
                    result.canonicalResult?.formulaRealizationRecord?.surface,
                ],
                authority: [
                    result.formulaStringAuthority,
                    result.surfaceStringAuthority,
                ],
            };
        })(),
        {
            captures: ["authorized", "authorized"],
            wrapperCalls: 1,
            operation: "object-complement",
            principalObjectId: "source-object-1",
            principalObjectDecisionPresent: false,
            derivedPrincipalObjectId: "source-object-1",
            status: "authorized",
            blockReason: "",
            formula:
                "#0-0(tlahtoāni)0-0# + #0-0+qui-0(chīhua)0+0-h#",
            surface: "Tlahtoāni quichīhuah.",
            records: [
                "#0-0(tlahtoāni)0-0# + #0-0+qui-0(chīhua)0+0-h#",
                "Tlahtoāni quichīhuah.",
            ],
            authority: [false, false],
        }
    );

    s.eq(
        "Lesson 52 conjunction reuses the same captures and canonical composition wrapper",
        (() => {
            const harness = createHarness(ctx);
            const left = harness.issue({
                surface: "nitlamatini",
                unitKind: "nnc",
            });
            const right = harness.issue({
                surface: "titlamatini",
                unitKind: "nnc",
            });
            [["principal", left], ["adjoined", right]].forEach(
                ([role, result]) => {
                    harness.controller.captureCurrentResult(
                        role,
                        result.canonicalResult
                    );
                }
            );
            const result = harness.controller.compose({
                relation: "conjunction",
                coordinationRelation: "unmarked",
                coordinationType: "additive",
                clauseLevel: "principal",
                polarity: "positive",
                leftContext: "present",
                rightwardModifier: "none",
                modifierAdjunctor: "none",
                sharedModifierScope: "none",
                sharedModifier: "none",
                adjoinedFunction: "none",
            });
            const lexicalContract =
                harness.controller.buildDecisionContract({
                    relation: "lexical-conjunction",
                    lexicalType: "lord-and-master",
                    adjunctorDistribution: "none",
                    stateRealization: "conjoined-stems",
                });
            return {
                wrapperCalls: harness.getCompositionWrapperCallCount(),
                operation:
                    harness.getLastCompositionWrapperRequest()?.operationKind,
                conjunctCount:
                    harness.getLastCompositionWrapperRequest()?.conjuncts
                        ?.length,
                status: result.authorizationStatus,
                formula: result.presentation.formula,
                surface: result.presentation.surface,
                levels: result.decisionContract.decisions.find(
                    decision => decision.id === "clause-level"
                )?.values,
                sharedModifiers: result.decisionContract.decisions.find(
                    decision => decision.id === "shared-modifier"
                )?.values,
                lexicalDecisionIds:
                    lexicalContract.decisions.map(decision => decision.id),
            };
        })(),
        {
            wrapperCalls: 1,
            operation: "conjunction",
            conjunctCount: 2,
            status: "authorized",
            formula:
                "#0-0(nitlamatini)0-0# + #0-0(titlamatini)0-0#",
            surface: "Nitlamatini titlamatini.",
            levels: ["principal", "adjoined"],
            sharedModifiers: ["none", "ah", "aic"],
            lexicalDecisionIds: [
                "relation",
                "lexical-type",
                "adjunctor-distribution",
                "state-realization",
            ],
        }
    );

    s.eq(
        "Lesson 53 comparison uses owner-issued source projections, exact complete formula, and pointwise scalar parity",
        (() => {
            const harness = createHarness(ctx);
            const comparand = harness.issue({
                surface: "tomāhuac",
                unitKind: "nnc",
            });
            const standard = harness.issue({
                surface: "chicāhuac",
                unitKind: "nnc",
            });
            [["principal", comparand], ["adjoined", standard]].forEach(
                ([role, result]) => {
                    harness.controller.captureCurrentResult(
                        role,
                        result.canonicalResult
                    );
                }
            );
            const selections = {
                relation: "comparison",
                comparisonRoute: "equality-iuhqui",
                icRelation: "no",
                sentenceType: "none",
            };
            const result = harness.controller.compose(selections);
            const request = harness.getLastComparisonWrapperRequest();
            const batch = ctx.evaluateClassicalNahuatlComparisonBatch([
                request,
                request,
            ]);
            return {
                wrapperCalls: harness.getComparisonWrapperCallCount(),
                route: request?.routeId,
                sourceOwners: Object.values(request?.slots || {}).map(
                    source => source.ownerIssuedSource
                ),
                sourceRoles: Object.values(request?.slots || {}).map(
                    source => source.grammaticalRole
                ),
                operationRoles:
                    result.canonicalResult?.operationFrame?.sourceSlotRoles,
                status: result.authorizationStatus,
                formula: result.presentation.formula,
                surface: result.presentation.surface,
                recordPair: [
                    result.canonicalResult?.formulaRecord?.formula,
                    result.canonicalResult?.formulaRealizationRecord?.surface,
                ],
                batch: {
                    status: batch.authorizationStatus,
                    scalar: batch.scalarEvaluatorIdentity,
                    pointwise: batch.pointwiseScalarEquality,
                    formulaParity:
                        batch.formulaProjectionPointwiseScalarEquivalent,
                    writtenParity:
                        batch.writtenProjectionPointwiseScalarEquivalent,
                    formulas: batch.results.map(row => row.formula),
                    surfaces: batch.results.map(row => row.surface),
                },
            };
        })(),
        {
            wrapperCalls: 1,
            route: "equality-iuhqui",
            sourceOwners: [true, true],
            sourceRoles: ["", ""],
            operationRoles: {
                comparand: "comparand",
                standard: "standard",
            },
            status: "authorized",
            formula:
                "#0-0(tomāhuac)0-0# + #0-0(iuh-Ø-qui)0-0# + in + #0-0(chicāhuac)0-0#",
            surface:
                "tomāhuac, iuhqui in chicāhuac",
            recordPair: [
                "#0-0(tomāhuac)0-0# + #0-0(iuh-Ø-qui)0-0# + in + #0-0(chicāhuac)0-0#",
                "tomāhuac, iuhqui in chicāhuac",
            ],
            batch: {
                status: "authorized",
                scalar: "evaluateClassicalNahuatlComparison",
                pointwise: true,
                formulaParity: true,
                writtenParity: true,
                formulas: [
                    "#0-0(tomāhuac)0-0# + #0-0(iuh-Ø-qui)0-0# + in + #0-0(chicāhuac)0-0#",
                    "#0-0(tomāhuac)0-0# + #0-0(iuh-Ø-qui)0-0# + in + #0-0(chicāhuac)0-0#",
                ],
                surfaces: [
                    "tomāhuac, iuhqui in chicāhuac",
                    "tomāhuac, iuhqui in chicāhuac",
                ],
            },
        }
    );

    s.eq(
        "all 23 Lesson 53 routes remain in one workflow while copied Results, caller source frames, null requests, and raw source strings fail closed",
        (() => {
            const harness = createHarness(ctx);
            const sources = [
                harness.issue({ surface: "cualli", unitKind: "nnc" }),
                harness.issue({ surface: "yectli", unitKind: "nnc" }),
                harness.issue({ surface: "huēi", unitKind: "nnc" }),
                harness.issue({ surface: "tepitōn", unitKind: "nnc" }),
            ];
            ["principal", "adjoined", "dependent", "supplement"].forEach(
                (role, index) => {
                    harness.controller.captureCurrentResult(
                        role,
                        sources[index].canonicalResult
                    );
                }
            );
            const routeIds =
                ctx.getClassicalComparisonRouteInventory().map(
                    route => route.id
                );
            const routeContracts = routeIds.map(routeId => {
                const contract = harness.controller.buildDecisionContract({
                    relation: "comparison",
                    comparisonRoute: routeId,
                });
                return [
                    routeId,
                    contract.authorizationStatus,
                    contract.blockReason,
                ];
            });
            const copiedResult = {
                ...sources[0].canonicalResult,
            };
            const copiedCapture = harness.controller.captureCurrentResult(
                "principal",
                copiedResult
            );
            const callerTypedSource = ctx.buildClassicalComparisonSourceUnit({
                sourceResult: sources[0].canonicalResult,
                typedSourceFrame:
                    sources[0].canonicalResult.sourceNncSlotFrame,
            });
            const nullBatch =
                ctx.evaluateClassicalNahuatlComparisonBatch([null]);
            const rawSource = ctx.buildClassicalComparisonSourceUnit({
                unitKind: "clause",
                surface: "stored Canvas answer",
            });
            return {
                routeCount: routeIds.length,
                routeContracts,
                copied: [
                    copiedCapture.authorizationStatus,
                    copiedCapture.blockReason,
                ],
                callerTypedSource: [
                    callerTypedSource.authorizationStatus,
                    callerTypedSource.blockReason,
                ],
                nullBatch: [
                    nullBatch.authorizationStatus,
                    nullBatch.results[0]?.authorizationStatus,
                    nullBatch.results[0]?.blockReason,
                ],
                rawSource: [
                    rawSource.authorizationStatus,
                    rawSource.blockReason,
                ],
            };
        })(),
        {
            routeCount: 23,
            routeContracts: ctx.getClassicalComparisonRouteInventory().map(
                route => [route.id, "authorized", ""]
            ),
            copied: [
                "blocked",
                "classical-grammar-application-issued-authorized-result-required",
            ],
            callerTypedSource: [
                "blocked",
                "comparison-caller-supplied-typed-source-frame-is-not-authority",
            ],
            nullBatch: [
                "blocked",
                "blocked",
                "comparison-typed-operation-request-required",
            ],
            rawSource: [
                "blocked",
                "comparison-caller-supplied-source-facts-are-not-authority",
            ],
        }
    );

    s.eq(
        "Lessons 17-19 supplementation choices run through captured owner Results, typed markers, boundary movement, included speech, and recursive scalar composition",
        (() => {
            const markedHarness = createHarness(ctx);
            const singer = markedHarness.issue({
                surface: "cuīca",
                sourceStem: "cuīca",
                unitKind: "vnc",
                subject: "1sg",
            });
            const peter = markedHarness.issue({
                surface: "Petoloh",
                unitKind: "nnc",
                subject: "1sg",
            });
            const inMarker = markedHarness.issue({
                unitKind: "particle",
                marking: "in",
            });
            markedHarness.controller.captureCurrentResult(
                "principal",
                singer.canonicalResult
            );
            markedHarness.controller.captureCurrentResult(
                "adjoined",
                peter.canonicalResult
            );
            markedHarness.controller.captureCurrentResult(
                "marker",
                inMarker.canonicalResult
            );
            const marked = markedHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "shared",
                supplementationHeadRole: "subject",
                supplementationContactRole: "subject",
                supplementationOrder: "principal-first",
            });
            const caMarker = markedHarness.issue({
                unitKind: "particle",
                marking: "ca",
            });
            markedHarness.controller.captureCurrentResult(
                "marker",
                caMarker.canonicalResult
            );
            const comment = markedHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "shared",
                supplementationHeadRole: "subject",
                supplementationContactRole: "subject",
                supplementationOrder: "supplement-first",
            });

            const questionHarness = createHarness(ctx);
            const dies = questionHarness.issue({
                surface: "miqui",
                sourceStem: "miqui",
                unitKind: "vnc",
                subject: "3sg",
            });
            const who = questionHarness.issue({
                unitKind: "nnc",
                pronominalSubtype: "interrogative",
                interrogativeKind: "āc",
                subject: "3sg",
            });
            questionHarness.controller.captureCurrentResult(
                "principal",
                dies.canonicalResult
            );
            questionHarness.controller.captureCurrentResult(
                "adjoined",
                who.canonicalResult
            );
            const question = questionHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "shared",
                supplementationHeadRole: "subject",
                supplementationContactRole: "subject",
                supplementationOrder: "supplement-first",
            });

            const boundaryHarness = createHarness(ctx);
            const sang = boundaryHarness.issue({
                surface: "cuīca",
                sourceStem: "cuīca",
                unitKind: "vnc",
                subject: "1sg",
                tense: "preterit",
                antecessive: true,
            });
            const namedSinger = boundaryHarness.issue({
                surface: "Petoloh",
                unitKind: "nnc",
                subject: "1sg",
            });
            const boundaryPrincipalCapture =
                boundaryHarness.controller.captureCurrentResult(
                "principal",
                sang.canonicalResult
            );
            const boundaryAdjoinedCapture =
                boundaryHarness.controller.captureCurrentResult(
                "adjoined",
                namedSinger.canonicalResult
            );
            const boundaryContract =
                boundaryHarness.controller.buildDecisionContract({
                    relation: "supplementation",
                    supplementationReferenceMode: "shared",
                    supplementationHeadRole: "subject",
                    supplementationContactRole: "subject",
                    supplementationOrder: "supplement-first",
                    supplementationAntecessivePlacement:
                        "integrate-with-supplement",
                });
            const integrated = boundaryHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "shared",
                supplementationHeadRole: "subject",
                supplementationContactRole: "subject",
                supplementationOrder: "supplement-first",
                supplementationAntecessivePlacement:
                    "integrate-with-supplement",
            });

            const speechHarness = createHarness(ctx);
            const says = speechHarness.issue({
                surface: "ihtoa",
                sourceStem: "ihtoa",
                unitKind: "vnc",
                subject: "3sg",
                sourceValence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const leaves = speechHarness.issue({
                surface: "yā",
                sourceStem: "yā",
                unitKind: "vnc",
                subject: "3sg",
                tense: "future",
                sentenceType: "command-sentence",
            });
            speechHarness.controller.captureCurrentResult(
                "principal",
                says.canonicalResult
            );
            speechHarness.controller.captureCurrentResult(
                "adjoined",
                leaves.canonicalResult
            );
            const speech = speechHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "included",
                supplementationHeadRole: "object",
                supplementationOrder: "principal-first",
                speechDirectness: "indirect",
            });
            const speechContract =
                speechHarness.controller.buildDecisionContract({
                    relation: "supplementation",
                    supplementationReferenceMode: "included",
                    supplementationHeadRole: "object",
                    supplementationOrder: "principal-first",
                    speechDirectness: "indirect",
                });
            const hostileSpeech =
                speechHarness.controller.buildDecisionContract({
                    relation: "supplementation",
                    supplementationReferenceMode: "included",
                    supplementationHeadRole: "object",
                    supplementationOrder: "principal-first",
                    speechDirectness: "indirect",
                    speechAct: "stored-canvas-answer",
                });

            const recursiveHarness = createHarness(ctx);
            const recursiveSinger = recursiveHarness.issue({
                surface: "cuīca",
                sourceStem: "cuīca",
                unitKind: "vnc",
                subject: "1sg",
            });
            const friend = recursiveHarness.issue({
                surface: "icnīuh",
                unitKind: "nnc",
                subject: "1sg",
            });
            recursiveHarness.controller.captureCurrentResult(
                "principal",
                recursiveSinger.canonicalResult
            );
            recursiveHarness.controller.captureCurrentResult(
                "adjoined",
                friend.canonicalResult
            );
            const inner = recursiveHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "shared",
                supplementationHeadRole: "subject",
                supplementationContactRole: "subject",
                supplementationOrder: "principal-first",
            });
            const peterAgain = recursiveHarness.issue({
                surface: "Petoloh",
                unitKind: "nnc",
                subject: "1sg",
            });
            const recursiveCapture =
                recursiveHarness.controller.captureCurrentResult(
                    "principal",
                    inner.canonicalResult
                );
            recursiveHarness.controller.captureCurrentResult(
                "adjoined",
                peterAgain.canonicalResult
            );
            const outer = recursiveHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "shared",
                supplementationHeadRole: "subject",
                supplementationContactRole: "subject",
                supplementationOrder: "principal-first",
            });
            const hostileAuthority =
                recursiveHarness.controller.buildDecisionContract({
                    relation: "supplementation",
                    formula: "#stored-canvas-answer#",
                });
            return {
                markerProfiles:
                    markedHarness.controller.getMarkerProfilesForRelation(
                        "supplementation"
                    ),
                marked: [
                    marked.authorizationStatus,
                    marked.presentation.formula,
                    marked.presentation.surface,
                ],
                comment: [
                    comment.authorizationStatus,
                    comment.presentation.formula,
                    comment.presentation.surface,
                ],
                question: [
                    question.authorizationStatus,
                    question.presentation.formula,
                    question.presentation.surface,
                ],
                boundaryDecision:
                    boundaryContract.decisions.find(
                        decision => decision.id
                            === "supplementation-antecessive-placement"
                    )?.values || [],
                integrated: [
                    boundaryPrincipalCapture.authorizationStatus,
                    boundaryAdjoinedCapture.authorizationStatus,
                    boundaryContract.authorizationStatus,
                    integrated.authorizationStatus,
                    integrated.presentation.formula,
                    integrated.presentation.surface,
                ],
                speech: [
                    speech.authorizationStatus,
                    speech.presentation.formula,
                    speech.presentation.surface,
                    speechContract.derived?.speechAct,
                    speechContract.decisions.some(
                        decision => decision.id === "speech-act"
                    ),
                ],
                hostileSpeech: [
                    hostileSpeech.authorizationStatus,
                    hostileSpeech.blockReason,
                ],
                recursive: [
                    inner.authorizationStatus,
                    recursiveCapture.authorizationStatus,
                    recursiveCapture.blockReason,
                    outer.authorizationStatus,
                    outer.presentation.formula,
                    outer.presentation.surface,
                ],
                hostileAuthority: [
                    hostileAuthority.authorizationStatus,
                    hostileAuthority.blockReason,
                ],
            };
        })(),
        {
            markerProfiles: ["in", "ca"],
            marked: [
                "authorized",
                "#ni-0(cuīca)0+0-0# + in + #ni-0(Petoloh)0-0#",
                "Nicuīca in niPetoloh.",
            ],
            comment: [
                "authorized",
                "#ni-0(Petoloh)0-0# + ca + #ni-0(cuīca)0+0-0#",
                "NiPetoloh ca nicuīca.",
            ],
            question: [
                "authorized",
                "#0-0(ā-0)c-0# + #0-0(miqui)0+0-0#",
                "Āc miqui?",
            ],
            boundaryDecision: [
                "retain-with-vnc",
                "integrate-with-supplement",
            ],
            integrated: [
                "authorized",
                "authorized",
                "authorized",
                "authorized",
                "ō#ni-0(Petoloh)0-0# + #ni-0(cuīca)0+c-0#",
                "ŌniPetoloh nicuīcac.",
            ],
            speech: [
                "authorized",
                "#0-0+qu-0(ihtoa)0+0-0# + #0-0(yā)z+⎕-0#",
                "Quihtoa yāz.",
                "command",
                false,
            ],
            hostileSpeech: [
                "blocked",
                "classical-clause-relation-selection-not-recognized:speechAct",
            ],
            recursive: [
                "authorized",
                "authorized",
                "",
                "authorized",
                "#ni-0(cuīca)0+0-0# + #n-0(icnīuh)0-0# + #ni-0(Petoloh)0-0#",
                "Nicuīca nicnīuh niPetoloh.",
            ],
            hostileAuthority: [
                "blocked",
                "classical-clause-relation-forbidden-authority:formula",
            ],
        }
    );

    s.eq(
        "supplementation consumes owner-issued Source context without exposing contextual facts as Grammar choices",
        (() => {
            const vocativeHarness = createHarness(ctx);
            const noble = vocativeHarness.issue({
                surface: "pil",
                unitKind: "nnc",
                subject: "3sg",
                nounClass: "tli",
            });
            const maleContext =
                vocativeHarness.controller.issueDiscourseSourceContextFrame({
                    speakerGender: "male",
                });
            const hostileIssuedContext =
                vocativeHarness.controller.issueDiscourseSourceContextFrame({
                    speakerGender: "male",
                    storedAnswer: "male",
                });
            const copiedContextCapture =
                vocativeHarness.controller.captureCurrentResult(
                    "principal",
                    noble.canonicalResult,
                    { ...maleContext }
                );
            const rawContextCapture =
                vocativeHarness.controller.captureCurrentResult(
                    "principal",
                    noble.canonicalResult,
                    {
                        speakerGender: "male",
                        speakerGroupMembership: "member",
                    }
                );
            const nobleCapture =
                vocativeHarness.controller.captureCurrentResult(
                    "principal",
                    noble.canonicalResult,
                    maleContext
                );
            const vocativeContract =
                vocativeHarness.controller.buildDecisionContract({
                    relation: "vocative",
                });
            const vocative = vocativeHarness.controller.compose({
                relation: "vocative",
            });
            const vocativeState =
                vocativeHarness.controller.getState().captures.principal;

            const missingHarness = createHarness(ctx);
            const missingNoble = missingHarness.issue({
                surface: "pil",
                unitKind: "nnc",
                subject: "3sg",
                nounClass: "tli",
            });
            missingHarness.controller.captureCurrentResult(
                "principal",
                missingNoble.canonicalResult
            );
            const missingContext =
                missingHarness.controller.buildDecisionContract({
                    relation: "vocative",
                });

            const namedHarness = createHarness(ctx);
            const namedPrincipal = namedHarness.issue({
                surface: "miqui",
                sourceStem: "miqui",
                unitKind: "vnc",
                subject: "3pl",
            });
            const namedThird = namedHarness.issue({
                surface: "icnīuh",
                unitKind: "nnc",
                subject: "3sg",
                nounClass: "zero",
            });
            const namedContext =
                namedHarness.controller.issueDiscourseSourceContextFrame({
                    namedPartnerKnownParticipant: "speaker",
                });
            namedHarness.controller.captureCurrentResult(
                "principal",
                namedPrincipal.canonicalResult
            );
            namedHarness.controller.captureCurrentResult(
                "adjoined",
                namedThird.canonicalResult,
                namedContext
            );
            const namedContract =
                namedHarness.controller.buildDecisionContract({
                    relation: "supplementation",
                    supplementationReferenceMode: "shared",
                    supplementationHeadRole: "subject",
                    supplementationContactRole: "subject",
                    supplementationOrder: "principal-first",
                });
            const namedPartner = namedHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "shared",
                supplementationHeadRole: "subject",
                supplementationContactRole: "subject",
                supplementationOrder: "principal-first",
            });

            const bondingHarness = createHarness(ctx);
            const bondingPrincipal = bondingHarness.issue({
                surface: "cuīca",
                sourceStem: "cuīca",
                unitKind: "vnc",
                subject: "3pl",
            });
            const men = bondingHarness.issue({
                surface: "oquich",
                unitKind: "nnc",
                subject: "1pl",
                nounClass: "tli",
                nncSourceKind: "absolutive",
                pluralConnector: "t-in",
            });
            const bondingContext =
                bondingHarness.controller.issueDiscourseSourceContextFrame({
                    speakerGender: "male",
                    speakerGroupMembership: "member",
                });
            const bondingPrincipalCapture =
                bondingHarness.controller.captureCurrentResult(
                "principal",
                bondingPrincipal.canonicalResult
                );
            const menCapture =
                bondingHarness.controller.captureCurrentResult(
                "adjoined",
                men.canonicalResult,
                bondingContext
                );
            const bondingContract =
                bondingHarness.controller.buildDecisionContract({
                    relation: "supplementation",
                    supplementationReferenceMode: "shared",
                    supplementationHeadRole: "subject",
                    supplementationContactRole: "subject",
                    supplementationOrder: "principal-first",
                });
            const maleBonding = bondingHarness.controller.compose({
                relation: "supplementation",
                supplementationReferenceMode: "shared",
                supplementationHeadRole: "subject",
                supplementationContactRole: "subject",
                supplementationOrder: "principal-first",
            });

            return {
                hostileCapture: [
                    hostileIssuedContext,
                    copiedContextCapture.authorizationStatus,
                    copiedContextCapture.blockReason,
                    rawContextCapture.authorizationStatus,
                    rawContextCapture.blockReason,
                ],
                vocative: [
                    nobleCapture.authorizationStatus,
                    vocativeContract.authorizationStatus,
                    vocativeContract.derived?.speakerGender,
                    vocativeContract.decisions.some(
                        decision => decision.id === "speaker-gender"
                    ),
                    vocative.authorizationStatus,
                    vocative.presentation.formula,
                    vocative.presentation.surface,
                ],
                state: [
                    vocativeState.discourseSourceContextFramePresent,
                    vocativeState.discourseSourceContext?.speakerGender,
                    vocativeState.discourseSourceContext
                        ?.grammarOperationAuthority,
                ],
                missingContext: [
                    missingContext.authorizationStatus,
                    missingContext.blockReason,
                ],
                namedPartner: [
                    namedContract.authorizationStatus,
                    namedContract.operationSelections?.agreementException,
                    namedContract.decisions.some(
                        decision => decision.id === "agreement-exception"
                    ),
                    namedPartner.authorizationStatus,
                    namedPartner.presentation.formula,
                    namedPartner.presentation.surface,
                ],
                maleBonding: [
                    bondingPrincipal.authorizationStatus,
                    men.authorizationStatus,
                    men.blockReason,
                    men.canonicalResult?.blockReason,
                    bondingPrincipalCapture.authorizationStatus,
                    menCapture.authorizationStatus,
                    menCapture.blockReason,
                    bondingContract.authorizationStatus,
                    bondingContract.operationSelections?.agreementException,
                    maleBonding.authorizationStatus,
                    maleBonding.blockReason,
                    maleBonding.canonicalResult?.blockReason,
                    maleBonding.presentation.formula,
                    maleBonding.presentation.surface,
                ],
            };
        })(),
        {
            hostileCapture: [
                null,
                "blocked",
                "classical-clause-relation-owner-issued-discourse-source-context-required",
                "blocked",
                "classical-clause-relation-owner-issued-discourse-source-context-required",
            ],
            vocative: [
                "authorized",
                "authorized",
                "male",
                false,
                "authorized",
                "#0-0(pil)li-0#e",
                "Pille!",
            ],
            state: [true, "male", false],
            missingContext: [
                "blocked",
                "classical-clause-relation-vocative-discourse-context-required",
            ],
            namedPartner: [
                "authorized",
                "named-partner",
                false,
                "authorized",
                "#0-0(miqui)0+0-h# + #0-0(icnīuh)0-0#",
                "Miquih icnīuh.",
            ],
            maleBonding: [
                "authorized",
                "authorized",
                "",
                "",
                "authorized",
                "authorized",
                "",
                "authorized",
                "male-bonding",
                "authorized",
                "",
                "",
                "#0-0(cuīca)0+0-h# + #t-0(oquich)t-in#",
                "Cuīcah toquichtin.",
            ],
        }
    );

    return s;
}

module.exports = { run };
