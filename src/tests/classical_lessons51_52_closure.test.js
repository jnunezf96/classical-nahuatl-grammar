"use strict";

const { createSuite } = require("./runner");

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function buildVnc(ctx, stem, {
    subject = "3sg",
    subjectReferenceId = "subject",
    tense = "present",
    mood = "indicative",
    verbClass = "A",
    valence = "intransitive",
    objectKind = "none",
    objectPerson = "",
    objectReferenceId = "",
} = {}) {
    const source = ctx.requestClassicalVncApplicationResult({
        sourceStem: stem,
        subject,
        mood,
        tense,
        verbClass,
        sourceValence: valence,
        objectKind,
        objectPerson,
        requestedDerivation: "direct",
        requestedVoice: "active",
        outputScope: "single",
    });
    return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(source, {
        referenceId: subjectReferenceId,
        subjectReferenceId,
        objectReferenceId,
    });
}

function buildNnc(ctx, stem, {
    subject = "3sg",
    referenceId = "referent",
    nounClass = "zero",
    animacy = "nonanimate",
} = {}) {
    return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(
        ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject,
            nounClass,
            animacy,
        }),
        { referenceId }
    );
}

function buildPossessiveNnc(ctx, stem, {
    subject = "3sg",
    referenceId = "state",
    possessor = "1sg",
    possessorReferenceId = "possessor",
} = {}) {
    const source = ctx.buildClassicalNahuatlPossessiveNncFrame(stem, {
        subject,
        possessor,
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        possessorCompatibility: "ordinary",
        animacy: "nonanimate",
    });
    return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(source, {
        referenceId,
        subjectReferenceId: referenceId,
        possessorReferenceId,
    });
}

function buildRelationalNnc(ctx, stemId, {
    option = "option-one",
    sourceKind = option === "option-one"
        ? "possessor"
        : "relational-compound",
    embeddedStem = "",
} = {}) {
    const stem = ctx.getClassicalNahuatlRelationalStemInventory()
        .find(candidate => candidate.stemId === stemId);
    const result = ctx.requestClassicalRelationalNncResult({
        state: option === "option-one" ? "possessive" : "absolutive",
        possessorId: "nonspecific-human",
        subjectMode: "adverbialized",
        subjectId: "3common",
        sentencePosition: "noninitial",
        adjunctorIn: false,
        dependentClausePresent: false,
        negative: false,
        nounstem: {
            kind: ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND,
            stemId,
            formation: option,
            operation: "relational-nnc",
            sourceKind,
            sourceFormation: "plain-nounstem",
            sourceVoice: "active",
            sourceMode: option === "option-one"
                ? "whole-stem"
                : "embed-matrix",
            sourceStem: option === "option-one"
                ? stem.classicalMatrix
                : embeddedStem,
            sourceEmbedStem: option === "option-one" ? "" : embeddedStem,
            sourceMatrixStem: stem.classicalMatrix,
            downstreamTargetStem: "",
            affective: "none",
            sourceLexemeId: "",
            lexicalExceptionId: "",
            relationalFunction: "",
            sourceEndsInCoOrC: false,
            pertinencySourceKind: "direct-relational",
            nounConnector: "",
            upstreamResult: null,
        },
    });
    return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(result, {
        referenceId: "object",
    });
}

function buildPassiveChihua(ctx, referenceId = "patient") {
    const passive = ctx.requestClassicalVncApplicationResult({
        sourceStem: "chīhua",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        requestedDerivation: "direct",
        requestedVoice: "passive",
        outputScope: "single",
    });
    return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(passive, {
        referenceId,
        subjectReferenceId: referenceId,
    });
}

function conjunction(ctx, conjuncts, options = {}, sharedSupplement = null) {
    return ctx.evaluateClassicalNahuatlClauseConjunction({
        operationKind: "conjunction",
        conjuncts,
        sharedSupplement,
        options: {
            relation: "unmarked",
            coordinationType: "additive",
            level: "principal",
            polarity: "positive",
            ...options,
        },
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons51_52_closure");
    const chief = buildNnc(ctx, "tlahtoāni", {
        referenceId: "chief",
        animacy: "animate",
    });
    const maker = buildVnc(ctx, "chīhua", {
        subject: "3pl",
        subjectReferenceId: "makers",
        valence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        objectReferenceId: "chief",
    });
    const singer = buildVnc(ctx, "cuīca", {
        subjectReferenceId: "performer",
    });
    const dancer = buildVnc(ctx, "mihtōtīa", {
        subjectReferenceId: "performer",
    });

    s.eq(
        "Clause composition exposes one semantic GCD and the exhaustive 21 plus 35 axis LCM",
        (() => {
            const contract = ctx.buildClassicalNahuatlClauseCompositionGrammarContract();
            return {
                canonical: ctx.isClassicalNahuatlClauseCompositionGrammarContract(contract),
                registered: ctx.inspectRegisteredGrammarContract(
                    ctx.getDefaultGrammarContractRegistry(),
                    contract
                ).ok,
                gcd: contract.greatestCommonDivisor.identityId,
                stages: contract.greatestCommonDivisor.stageOrder,
                counts: contract.leastCommonMultiple.semanticOwnerAxisCounts,
                total: contract.leastCommonMultiple.distinctionAxisCount,
                unique: new Set(contract.leastCommonMultiple.distinctionAxes.map(axis => axis.axisId)).size,
                complementationExecutors: [...new Set(contract.leastCommonMultiple.distinctionAxes
                    .filter(axis => axis.semanticOwner === "clause-complementation")
                    .flatMap(axis => axis.canonicalExecutorIds))],
                conjunctionExecutors: [...new Set(contract.leastCommonMultiple.distinctionAxes
                    .filter(axis => axis.semanticOwner === "clause-conjunction")
                    .flatMap(axis => axis.canonicalExecutorIds))],
                curriculumFields: contract.leastCommonMultiple.distinctionAxes
                    .flatMap(axis => Object.keys(axis))
                    .filter(key => /lesson/i.test(key)),
                authority: [
                    contract.greatestCommonDivisor.curriculumOrderAuthority,
                    contract.greatestCommonDivisor.storedExampleAuthority,
                    contract.greatestCommonDivisor.formulaStringAuthority,
                    contract.greatestCommonDivisor.surfaceStringAuthority,
                ],
            };
        })(),
        {
            canonical: true,
            registered: true,
            gcd: "typed-clause-source-semantic-relation-reference-graph-surface-result",
            stages: [
                "typed-clause-source",
                "licensed-semantic-relation",
                "rank-and-reference-graph",
                "ordered-clause-realization",
                "sentence-result",
            ],
            counts: {
                "clause-complementation": 21,
                "clause-conjunction": 35,
            },
            total: 56,
            unique: 56,
            complementationExecutors: ["evaluateClassicalNahuatlClauseComplementation"],
            conjunctionExecutors: ["evaluateClassicalNahuatlClauseConjunction"],
            curriculumFields: [],
            authority: [false, false, false, false],
        }
    );

    s.eq(
        "Clause composition exposes only semantic owner contracts and rejects copied owner results",
        (() => {
            const complementationRequest =
                ctx.buildClassicalNahuatlClauseComplementationOperationRequest({
                    operationKind: "object-complement",
                    principalClause: maker,
                    complementClause: chief,
                    options: { semanticCategory: "change" },
                });
            const complementationResult =
                ctx.evaluateClassicalNahuatlClauseComplementation(
                    complementationRequest
                );
            const complementationParadigm =
                ctx.evaluateClassicalNahuatlClauseComplementationParadigm([{
                    coordinateId: "complementation",
                    operationKind: "object-complement",
                    principalClause: maker,
                    complementClause: chief,
                    options: { semanticCategory: "change" },
                }]);
            const conjunctionRequest =
                ctx.buildClassicalNahuatlClauseConjunctionOperationRequest({
                    operationKind: "conjunction",
                    conjuncts: [singer, dancer],
                    options: {
                        relation: "unmarked",
                        coordinationType: "additive",
                        level: "principal",
                        polarity: "positive",
                    },
                });
            const conjunctionResult =
                ctx.evaluateClassicalNahuatlClauseConjunction(
                    conjunctionRequest
                );
            const conjunctionParadigm =
                ctx.evaluateClassicalNahuatlClauseConjunctionParadigm([{
                    coordinateId: "conjunction",
                    operationKind: "conjunction",
                    conjuncts: [singer, dancer],
                    options: {
                        relation: "unmarked",
                        coordinationType: "additive",
                        level: "principal",
                        polarity: "positive",
                    },
                }]);
            const contract =
                ctx.buildClassicalNahuatlClauseCompositionGrammarContract();
            const kinds = [
                chief.kind,
                complementationRequest.kind,
                complementationResult.kind,
                complementationParadigm.kind,
                conjunctionRequest.kind,
                conjunctionResult.kind,
                conjunctionParadigm.kind,
                contract.kind,
            ];
            const removedPublicNames = [
                "buildClassicalNahuatlLessons5152ClauseFrame",
                "isClassicalNahuatlLessons5152ClauseFrame",
                "buildClassicalNahuatlLesson51OperationRequest",
                "isClassicalNahuatlLesson51OperationRequest",
                "evaluateClassicalNahuatlLesson51ComplementOperation",
                "isClassicalNahuatlLesson51ResultFrame",
                "evaluateClassicalNahuatlLesson51ComplementParadigm",
                "isClassicalNahuatlLessons5152CompositionNode",
                "buildClassicalNahuatlLesson52OperationRequest",
                "isClassicalNahuatlLesson52OperationRequest",
                "evaluateClassicalNahuatlLesson52ConjunctionOperation",
                "isClassicalNahuatlLesson52ResultFrame",
                "evaluateClassicalNahuatlLesson52ConjunctionParadigm",
                "buildClassicalNahuatlLessons5152GrammarContract",
                "isClassicalNahuatlLessons5152GrammarContract",
                "evaluateClassicalNahuatlLessons5152Operation",
            ];
            return {
                kinds,
                lessonNamedKinds: kinds.filter(kind => /lesson/i.test(kind)),
                survivingRemovedPublicNames: removedPublicNames.filter(
                    name => Object.hasOwn(ctx, name)
                ),
                ownerIssuedResults: [
                    ctx.isClassicalNahuatlClauseComplementationResultFrame(
                        complementationResult
                    ),
                    ctx.isClassicalNahuatlClauseConjunctionResultFrame(
                        conjunctionResult
                    ),
                ],
                copiedResults: [
                    ctx.isClassicalNahuatlClauseComplementationResultFrame(
                        clone(complementationResult)
                    ),
                    ctx.isClassicalNahuatlClauseConjunctionResultFrame(
                        clone(conjunctionResult)
                    ),
                ],
            };
        })(),
        {
            kinds: [
                "classical-nahuatl-clause-composition-source-frame",
                "classical-nahuatl-clause-complementation-operation-request",
                "classical-nahuatl-clause-complementation-result-frame",
                "classical-nahuatl-clause-complementation-paradigm-frame",
                "classical-nahuatl-clause-conjunction-operation-request",
                "classical-nahuatl-clause-conjunction-result-frame",
                "classical-nahuatl-clause-conjunction-paradigm-frame",
                "classical-nahuatl-clause-composition-grammar-contract",
            ],
            lessonNamedKinds: [],
            survivingRemovedPublicNames: [],
            ownerIssuedResults: [true, true],
            copiedResults: [false, false],
        }
    );

    s.eq(
        "Lesson 51 object complementation generates change, material, designation, and state from typed references",
        [
            ["change", maker],
            ["material-composition", maker],
            ["designation", buildVnc(ctx, "ihtoa", {
                subjectReferenceId: "speakers",
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                objectReferenceId: "chief",
            })],
            ["state", buildVnc(ctx, "teci", {
                subjectReferenceId: "grinder",
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                objectReferenceId: "chief",
            })],
        ].map(([semanticCategory, principalClause]) => {
            const result = ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "object-complement",
                principalClause,
                complementClause: chief,
                options: { semanticCategory },
            });
            return [semanticCategory, result.authorizationStatus, result.relationFrame?.referenceIdentityUnified];
        }),
        [
            ["change", "authorized", true],
            ["material-composition", "authorized", true],
            ["designation", "authorized", true],
            ["state", "authorized", true],
        ]
    );

    s.eq(
        "Lesson 51 derives reflexive contact and category mismatch instead of accepting display claims",
        (() => {
            const reflexive = buildVnc(ctx, "cuepa", {
                subject: "3sg",
                subjectReferenceId: "addressee",
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                objectReferenceId: "addressee",
            });
            const mismatched = buildNnc(ctx, "tetl", {
                subject: "1sg",
                referenceId: "addressee",
                animacy: "nonanimate",
            });
            const cleanRequest = {
                operationKind: "object-complement",
                principalClause: reflexive,
                complementClause: mismatched,
                options: {
                    semanticCategory: "change",
                },
            };
            const result =
                ctx.evaluateClassicalNahuatlClauseComplementation(
                    cleanRequest
                );
            const hostile =
                ctx.evaluateClassicalNahuatlClauseComplementation({
                ...cleanRequest,
                options: {
                    ...cleanRequest.options,
                    reflexiveObject: false,
                    participantCategoryAgreement: true,
                },
            });
            return {
                status: result.authorizationStatus,
                reflexive: result.relationFrame?.reflexiveObject,
                agreement: result.relationFrame?.participantCategoryAgreement,
                mismatch: result.relationFrame?.agreementMismatchLicensed,
                hostile: [
                    hostile.authorizationStatus,
                    hostile.blockReason,
                ],
            };
        })(),
        {
            status: "authorized",
            reflexive: true,
            agreement: false,
            mismatch: true,
            hostile: [
                "blocked",
                "unrecognized-clause-complementation-operation-option:reflexiveObject",
            ],
        }
    );

    s.eq(
        "Lesson 51 implements all three designation structures",
        (() => {
            const ordinary = ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "object-complement",
                principalClause: buildVnc(ctx, "tōcāyōtia", {
                    subjectReferenceId: "namer",
                    valence: "specific-projective",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    objectReferenceId: "named",
                }),
                complementClause: buildNnc(ctx, "Cuātatl", { referenceId: "named" }),
                options: { semanticCategory: "designation" },
            });
            const tlaPrincipal = buildVnc(ctx, "tōcāyōtia", {
                subjectReferenceId: "namer",
                valence: "projective-nonhuman",
                objectKind: "nonspecific-nonhuman",
                objectReferenceId: "place",
            });
            const tla = ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "object-complement",
                principalClause: tlaPrincipal,
                complementClause: buildNnc(ctx, "Huēhuehcuauhtitlan", { referenceId: "place" }),
                auxiliaryClause: buildNnc(ctx, "oncān", { referenceId: "place" }),
                options: {
                    semanticCategory: "designation",
                    designationStructure: "tla-locative-supplement-plus-place-name",
                },
            });
            const possessive = ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "object-complement",
                principalClause: buildPossessiveNnc(ctx, "tōcāyōcān", {
                    referenceId: "place-state",
                    possessor: "3sg",
                    possessorReferenceId: "place",
                }),
                complementClause: buildNnc(ctx, "Cochtocān", { referenceId: "place" }),
                options: {
                    semanticCategory: "designation",
                    designationStructure: "possessive-name-possessor-complement",
                    linkKind: "possessor-subject",
                },
            });
            return [ordinary, tla, possessive].map(result => [
                result.authorizationStatus,
                result.relationFrame?.designationStructure,
                Boolean(result.auxiliaryClause),
            ]);
        })(),
        [
            ["authorized", "ordinary-object-complement", false],
            ["authorized", "tla-locative-supplement-plus-place-name", true],
            ["authorized", "possessive-name-possessor-complement", false],
        ]
    );

    s.eq(
        "Lesson 51 subject complement covers identity, composition, state, cel, el, iyoh, and passive transformation",
        (() => {
            const principal = buildVnc(ctx, "nēci", {
                subject: "1sg",
                subjectReferenceId: "speaker",
            });
            const ordinary = ["identity", "composition", "state"].map(semanticCategory => (
                ctx.evaluateClassicalNahuatlClauseComplementation({
                    operationKind: "subject-complement",
                    principalClause: principal,
                    complementClause: buildNnc(ctx, semanticCategory === "composition" ? "tetl" : "tēlpōchtli", {
                        subject: "1sg",
                        referenceId: "speaker",
                        animacy: semanticCategory === "composition" ? "nonanimate" : "animate",
                    }),
                    options: { semanticCategory },
                })
            ));
            const special = [
                ["cēl", "embedded-possessor-cel"],
                ["el", "embedded-possessor-el"],
            ].map(([stem, contactKind]) => ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "subject-complement",
                principalClause: principal,
                complementClause: buildPossessiveNnc(ctx, stem, {
                    referenceId: `${contactKind}-state`,
                    possessorReferenceId: "speaker",
                }),
                options: { semanticCategory: "state", contactKind },
            }));
            const iyoh = ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "subject-complement",
                principalClause: principal,
                complementClause: buildNnc(ctx, "iyoh", {
                    subject: "1sg",
                    referenceId: "speaker",
                    animacy: "animate",
                }),
                options: {
                    semanticCategory: "state",
                    contactKind: "preterit-agentive-subject-iyoh",
                },
            });
            const passive = ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "subject-complement",
                principalClause: buildPassiveChihua(ctx, "chief"),
                complementClause: chief,
                options: {
                    semanticCategory: "passive-object-complement-transform",
                    passiveTransform: true,
                },
            });
            return [...ordinary, ...special, iyoh, passive].map(result => [
                result.authorizationStatus,
                result.relationFrame?.contactKind || "",
                result.relationFrame?.passiveTransformOfObjectComplement || false,
            ]);
        })(),
        [
            ["authorized", "subject", false],
            ["authorized", "subject", false],
            ["authorized", "subject", false],
            ["authorized", "embedded-possessor-cel", false],
            ["authorized", "embedded-possessor-el", false],
            ["authorized", "preterit-agentive-subject-iyoh", false],
            ["authorized", "subject", true],
        ]
    );

    s.eq(
        "Lesson 51 implements every adverbial complement family and all four lexicalized relational pairs",
        (() => {
            const shared = "actor";
            const vncComplement = buildVnc(ctx, "cuīca", {
                subjectReferenceId: shared,
                tense: "present",
            });
            const familyPrincipals = [
                ["coverage", "moca", buildNnc(ctx, "zoquitl", { referenceId: "mud" })],
                ["beginning", "pēhua", vncComplement],
                ["satisfaction", "pachihui", vncComplement],
                ["daring", "tlahpalihui", vncComplement],
                ["cessation", "mocāhua", vncComplement],
                ["tarrying", "huehcāhua", vncComplement],
            ];
            const families = familyPrincipals.map(([semanticCategory, stem, complementClause]) => (
                ctx.evaluateClassicalNahuatlClauseComplementation({
                    operationKind: "adverbial-complement",
                    principalClause: buildVnc(ctx, stem, { subjectReferenceId: shared }),
                    complementClause,
                    options: { semanticCategory },
                }).authorizationStatus
            ));
            const pairs = [
                ["te-ca+cahcayahua", "cahcayahua", "ca-means", {}],
                ["te-pan+teca", "teca", "pan-surface-time", {}],
                ["te-tech+chicotlamati", "chicotlamati", "tech-contact", {}],
                ["te-tech-pa+tlaocoya", "tlaocoya", "pa-direction", {
                    option: "option-two",
                    sourceKind: "relational-compound",
                    embeddedStem: "tētech",
                }],
            ].map(([relationalPairId, principalStem, relationalStemId, relationalOptions]) => (
                ctx.evaluateClassicalNahuatlClauseComplementation({
                    operationKind: "adverbial-complement",
                    principalClause: buildVnc(ctx, principalStem, { subjectReferenceId: shared }),
                    complementClause: buildRelationalNnc(
                        ctx,
                        relationalStemId,
                        relationalOptions
                    ),
                    options: {
                        semanticCategory: "relational-lexicalized",
                        relationalPairId,
                    },
                }).authorizationStatus
            ));
            return { families, pairs };
        })(),
        {
            families: Array(6).fill("authorized"),
            pairs: Array(4).fill("authorized"),
        }
    );

    s.eq(
        "Lesson 51 enforces its nearby negative gates",
        [
            ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "object-complement",
                principalClause: buildVnc(ctx, "cuīca", {
                    subjectReferenceId: "agent",
                    valence: "specific-projective",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    objectReferenceId: "chief",
                }),
                complementClause: chief,
                options: { semanticCategory: "change" },
            }),
            ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "adverbial-complement",
                principalClause: buildVnc(ctx, "pachihui", { subjectReferenceId: "actor" }),
                complementClause: buildVnc(ctx, "cuīca", {
                    subjectReferenceId: "actor",
                    tense: "future",
                }),
                options: { semanticCategory: "satisfaction" },
            }),
            ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "adverbial-complement",
                principalClause: buildVnc(ctx, "tlaōcoya", { subjectReferenceId: "actor" }),
                complementClause: buildNnc(ctx, "tēpan", { referenceId: "object" }),
                options: {
                    semanticCategory: "relational-lexicalized",
                    relationalPairId: "te-tech-pa+tlaocoya",
                },
            }),
        ].map(result => result.authorizationStatus),
        ["blocked", "blocked", "blocked"]
    );

    s.eq(
        "Lesson 51 derives the only principal object but requires an exact owner object id when the typed Source has more than one object",
        (() => {
            const multipleObjectSource =
                ctx.requestClassicalVncApplicationResult({
                    sourceStem: "chīhua",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    sourceValence: "multiple-object",
                    requestedDerivation: "direct",
                    requestedVoice: "active",
                    outputScope: "single",
                    objectRequests: [{
                            objectId: "changed-object",
                            objectKind: "specific-projective",
                            objectPerson: "3sg",
                            governor: "directive",
                            derivationalLevel: 1,
                        }, {
                            objectId: "retained-object",
                            objectKind: "specific-projective",
                            objectPerson: "3pl",
                            governor: "applicative",
                            derivationalLevel: 2,
                        }],
                });
            const multipleObjectPrincipal =
                ctx.buildClassicalNahuatlClauseCompositionSourceFrame(
                    multipleObjectSource,
                    {
                        referenceId: "maker",
                        subjectReferenceId: "maker",
                        objectReferenceIds: {
                            "changed-object": "chief",
                            "retained-object": "others",
                        },
                    }
                );
            const request = principalObjectId => ({
                operationKind: "object-complement",
                principalClause: multipleObjectPrincipal,
                complementClause: chief,
                options: {
                    semanticCategory: "change",
                    ...(principalObjectId === undefined
                        ? {}
                        : { principalObjectId }),
                },
            });
            const single = ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "object-complement",
                principalClause: maker,
                complementClause: chief,
                options: { semanticCategory: "change" },
            });
            const missing = ctx.evaluateClassicalNahuatlClauseComplementation(
                request(undefined)
            );
            const foreign = ctx.evaluateClassicalNahuatlClauseComplementation(
                request("stored-example-object")
            );
            const selected = ctx.evaluateClassicalNahuatlClauseComplementation(
                request("changed-object")
            );
            const selectedParadigm =
                ctx.evaluateClassicalNahuatlClauseComplementationParadigm([{
                    coordinateId: "multiple-object-selected",
                    ...request("changed-object"),
                }]);
            return {
                source: [
                    multipleObjectPrincipal.authorizationStatus,
                    multipleObjectPrincipal.objects?.map(object => object.id),
                ],
                single: [
                    single.authorizationStatus,
                    single.relationFrame?.principalObjectId,
                ],
                missing: [missing.authorizationStatus, missing.blockReason],
                foreign: [foreign.authorizationStatus, foreign.blockReason],
                selected: [
                    selected.authorizationStatus,
                    selected.relationFrame?.principalObjectId,
                    selectedParadigm.pointwiseScalarEquivalent,
                    selectedParadigm.rows[0]?.formulaRealization
                        === selected.formulaRealization,
                    selectedParadigm.rows[0]?.surfaceRealization
                        === selected.surfaceRealization,
                ],
            };
        })(),
        {
            source: [
                "authorized",
                ["retained-object", "changed-object"],
            ],
            single: ["authorized", "source-object-1"],
            missing: [
                "blocked",
                "principal-object-id-required-for-multiple-typed-objects",
            ],
            foreign: [
                "blocked",
                "principal-object-id-not-owned-by-principal-source",
            ],
            selected: [
                "authorized",
                "changed-object",
                true,
                true,
                true,
            ],
        }
    );

    s.eq(
        "Lesson 52 generates unmarked, marked, sentence-initial, adjoined, shared-supplement, and nested clause-group conjunction",
        (() => {
            const unmarked = conjunction(ctx, [singer, dancer], {
                sharedModifierScope: "before-first-applies-to-all",
                sharedModifier: "aic",
            }, chief);
            const marked = conjunction(ctx, [singer, dancer], {
                relation: "marked",
                coordinationType: "adversative",
            });
            const initial = conjunction(ctx, [singer], {
                relation: "marked",
                leftContextAbsent: true,
                level: "principal",
            });
            const adjoined = conjunction(ctx, [singer, dancer], {
                level: "adjoined",
                adjoinedFunction: "adverbial-adjunct",
            });
            const nested = conjunction(ctx, [unmarked, marked]);
            return [unmarked, marked, initial, adjoined, nested].map(result => [
                result.authorizationStatus,
                result.relationFrame?.marker || "",
                result.sharedSupplementNormallyAfterLastConjunct || false,
                result.conjuncts?.some(node => node.rank === "clause-group")
                    || false,
            ]);
        })(),
        [
            ["authorized", "", true, false],
            ["authorized", "auh", false, false],
            ["authorized", "auh", false, false],
            ["authorized", "", false, false],
            ["authorized", "", false, true],
        ]
    );

    s.eq(
        "Lesson 52 exhausts every licensed additive, alternative, and adversative modifier",
        (() => {
            const inventories = {
                additive: ["", "no", "oc", "oc-no", "ihuan", "oc-ihuan", "no-ihuan", "oc-no-ihuan", "ahno", "ahmo-no", "no-zo", "no-zo-eh", "ma-no-zo", "ma-no-zo-eh"],
                alternative: ["", "ahzo", "ahzo-eh", "no-zo", "no-zo-eh", "ma-no-zo", "ma-no-zo-eh", "ahno-zo", "ahno-zo-eh"],
                adversative: ["", "zan", "tel", "yeceh", "yeh", "neh"],
            };
            return Object.fromEntries(Object.entries(inventories).map(([coordinationType, modifiers]) => [
                coordinationType,
                modifiers.map(rightwardModifier => conjunction(ctx, [singer, dancer], {
                    coordinationType,
                    rightwardModifier,
                }).authorizationStatus),
            ]));
        })(),
        {
            additive: Array(14).fill("authorized"),
            alternative: Array(9).fill("authorized"),
            adversative: Array(6).fill("authorized"),
        }
    );

    s.eq(
        "Lesson 52 keeps in and ihuan in their typed modifier roles",
        [
            conjunction(ctx, [singer, dancer], {
                coordinationType: "alternative",
                rightwardModifier: "ahzo",
                modifierAdjunctor: "in",
            }),
            conjunction(ctx, [singer, dancer], {
                coordinationType: "adversative",
                rightwardModifier: "yeh",
                modifierAdjunctor: "in",
            }),
            conjunction(ctx, [singer, dancer], {
                rightwardModifier: "ihuan",
            }),
        ].map(result => [
            result.authorizationStatus,
            result.relationFrame?.modifierIsConjunctor,
            result.relationFrame?.ihuanPossessorAntecedent || "",
        ]),
        [
            ["authorized", false, ""],
            ["authorized", false, ""],
            ["authorized", false, "leftward-state-of-affairs"],
        ]
    );

    s.eq(
        "Lesson 52 applies pre-first shared scope and clause rank semantically in both independent projections",
        (() => {
            const shared = conjunction(ctx, [singer, dancer], {
                sharedModifierScope: "before-first-applies-to-all",
                sharedModifier: "aic",
            });
            const sharedParadigm =
                ctx.evaluateClassicalNahuatlClauseConjunctionParadigm([{
                    coordinateId: "shared-pre-first",
                    operationKind: "conjunction",
                    conjuncts: [singer, dancer],
                    options: {
                        relation: "unmarked",
                        coordinationType: "additive",
                        level: "principal",
                        polarity: "positive",
                        sharedModifierScope:
                            "before-first-applies-to-all",
                        sharedModifier: "aic",
                    },
                }]);
            const scopeWithoutModifier = conjunction(ctx, [singer, dancer], {
                sharedModifierScope: "before-first-applies-to-all",
            });
            const adjoinedWithoutFunction = conjunction(
                ctx,
                [singer, dancer],
                { level: "adjoined" }
            );
            const principalWithAdjoinedFunction = conjunction(
                ctx,
                [singer, dancer],
                { adjoinedFunction: "adverbial-adjunct" }
            );
            const obsoleteSentenceRank = conjunction(
                ctx,
                [singer, dancer],
                { level: "sentence" }
            );
            return {
                shared: {
                    status: shared.authorizationStatus,
                    surface: shared.surfaceRealization,
                    formula: shared.formulaRealization,
                    scope: shared.relationFrame?.sharedModifierScope,
                    rank: shared.relationFrame?.syntacticRank,
                    noHead:
                        shared.relationFrame?.balancedConjunctsWithoutHead,
                    parity: [
                        sharedParadigm.pointwiseScalarEquivalent,
                        sharedParadigm.rows[0]?.formulaRealization
                            === shared.formulaRealization,
                        sharedParadigm.rows[0]?.surfaceRealization
                            === shared.surfaceRealization,
                    ],
                },
                negatives: [
                    scopeWithoutModifier,
                    adjoinedWithoutFunction,
                    principalWithAdjoinedFunction,
                    obsoleteSentenceRank,
                ].map(result => [
                    result.authorizationStatus,
                    result.blockReason,
                ]),
            };
        })(),
        {
            shared: {
                status: "authorized",
                surface: "Aīc cuīca mihtōtīa.",
                formula:
                    "ah + īc + #0-0(cuīca)0+0-0# + #0-0(mihtōtīa)0+0-0#",
                scope: "before-first-applies-to-all",
                rank: "principal-clause-group",
                noHead: true,
                parity: [true, true, true],
            },
            negatives: [
                [
                    "blocked",
                    "shared-modifier-and-pre-first-scope-must-be-jointly-licensed",
                ],
                [
                    "blocked",
                    "licensed-adjoined-conjunction-function-requires-adjoined-level",
                ],
                [
                    "blocked",
                    "licensed-adjoined-conjunction-function-requires-adjoined-level",
                ],
                [
                    "blocked",
                    "complete-conjunction-relation-type-level-and-polarity-required",
                ],
            ],
        }
    );

    s.eq(
        "Lesson 52 exhausts standard and loose correlation",
        (() => {
            const standard = ["ahzo-ahzo", "ahzo-eh-ahzo-eh", "ahzo-ahzo-no", "ahmo-no-ahmo-no"]
                .map(pattern => ctx.evaluateClassicalNahuatlClauseConjunction({
                    operationKind: "correlative-conjunction",
                    conjuncts: [singer, dancer],
                    options: { correlationType: "standard", pattern },
                }).authorizationStatus);
            const loose = ctx.evaluateClassicalNahuatlClauseConjunction({
                operationKind: "correlative-conjunction",
                conjuncts: [
                    buildNnc(ctx, "ce", { referenceId: "left" }),
                    buildNnc(ctx, "occe", { referenceId: "right" }),
                ],
                options: { correlationType: "loose", pattern: "paired-nncs" },
            });
            return { standard, loose: loose.authorizationStatus };
        })(),
        {
            standard: Array(4).fill("authorized"),
            loose: "authorized",
        }
    );

    s.eq(
        "Lesson 52 lexical conjunction covers both semantic types, both arities, state, and adjunctor while downstream compatibility remains a read-only lexical fact",
        (() => {
            const lexicalNodes = [
                buildNnc(ctx, "tēuctli", { referenceId: "ruler", animacy: "animate" }),
                buildNnc(ctx, "tlahtoāni", { referenceId: "ruler", animacy: "animate" }),
                buildNnc(ctx, "tiyācāuh", { referenceId: "ruler", animacy: "animate" }),
            ];
            const requests = [
                { lexicalType: "lord-and-master", nodes: lexicalNodes.slice(0, 2), stateRealization: "compound-handoff", adjunctorDistribution: "in-before-each" },
                { lexicalType: "lord-and-master", nodes: lexicalNodes, stateRealization: "conjoined-stems", adjunctorDistribution: "in-before-left-only" },
                { lexicalType: "bread-and-butter", nodes: lexicalNodes.slice(0, 2), stateRealization: "conjoined-stems", adjunctorDistribution: "none" },
            ];
            return requests.map(({ nodes, ...options }) => {
                const result = ctx.evaluateClassicalNahuatlClauseConjunction({
                    operationKind: "lexical-conjunction",
                    conjuncts: nodes,
                    options,
                });
                return [
                    result.authorizationStatus,
                    result.relationFrame?.lexicalType,
                    result.relationFrame?.arity,
                    result.relationFrame?.downstreamEligibility,
                    Object.hasOwn(result, "downstreamHandoffFrame"),
                ];
            });
        })(),
        [
            ["authorized", "lord-and-master", "biclausalism", ["conjunctive-compound", "incorporation", "verbstem-derivation"], false],
            ["authorized", "lord-and-master", "triclausalism", ["conjunctive-compound", "incorporation", "verbstem-derivation"], false],
            ["authorized", "bread-and-butter", "biclausalism", ["conjunctive-compound", "incorporation", "verbstem-derivation"], false],
        ]
    );

    s.eq(
        "Lesson 52 exhausts rephrasive axes, both appositives, progressive, and combined parallelism",
        (() => {
            const axes = [
                "nonspecific-specific-object",
                "active-passive",
                "tense-shift",
                "incorporated-supplementary-object",
                "intransitive-reflexive-transitive",
            ].map(rephraseAxis => ctx.evaluateClassicalNahuatlClauseConjunction({
                operationKind: "parallel-structure",
                conjuncts: [singer, dancer],
                options: { parallelType: "rephrasive", rephraseAxis },
            }).authorizationStatus);
            const relatives = [
                ["rephrasive", "clarifying"],
                ["rephrasive", "summarizing"],
                ["progressive", "none"],
                ["combined", "none"],
            ].map(([parallelType, appositiveType]) => ctx.evaluateClassicalNahuatlClauseConjunction({
                operationKind: "parallel-structure",
                conjuncts: [singer, dancer],
                options: { parallelType, appositiveType },
            }).authorizationStatus);
            return { axes, relatives };
        })(),
        {
            axes: Array(5).fill("authorized"),
            relatives: Array(4).fill("authorized"),
        }
    );

    s.eq(
        "Lesson 52 enforces adversative arity, marked-adjoined, modifier, and lexical-reference gates",
        [
            conjunction(ctx, [singer, dancer, chief], {
                coordinationType: "adversative",
            }),
            conjunction(ctx, [singer, dancer], {
                relation: "marked",
                level: "adjoined",
            }),
            conjunction(ctx, [singer, dancer], {
                rightwardModifier: "not-canvas",
            }),
            ctx.evaluateClassicalNahuatlClauseConjunction({
                operationKind: "lexical-conjunction",
                conjuncts: [
                    buildNnc(ctx, "tēuctli", { referenceId: "one" }),
                    buildNnc(ctx, "tlahtoāni", { referenceId: "two" }),
                ],
                options: { lexicalType: "lord-and-master" },
            }),
            ctx.evaluateClassicalNahuatlClauseConjunction({
                operationKind: "lexical-conjunction",
                conjuncts: [
                    buildNnc(ctx, "tēuctli", { referenceId: "one" }),
                    buildNnc(ctx, "tlahtoāni", { referenceId: "one" }),
                ],
                options: {
                    lexicalType: "lord-and-master",
                    downstreamOperation: "incorporation",
                },
            }),
        ].map(result => result.authorizationStatus),
        ["blocked", "blocked", "blocked", "blocked", "blocked"]
    );

    s.eq(
        "Clause composition independently preserves complete source formulas and realizes the written sentence",
        (() => {
            const complement = ctx.evaluateClassicalNahuatlClauseComplementation({
                operationKind: "object-complement",
                principalClause: maker,
                complementClause: chief,
                options: { semanticCategory: "change" },
            });
            const markedConjunction = conjunction(ctx, [singer, dancer], {
                relation: "marked",
                coordinationType: "adversative",
            });
            return {
                complement: {
                    formula: complement.formulaRealization,
                    formulaRecord: complement.formulaRecord?.formula,
                    formulaSequence: complement.formulaSequence,
                    written: complement.surfaceRealization,
                    realizationSurface:
                        complement.formulaRealizationRecord?.surface,
                },
                conjunction: {
                    formula: markedConjunction.formulaRealization,
                    formulaRecord: markedConjunction.formulaRecord?.formula,
                    formulaSequence: markedConjunction.formulaSequence,
                    written: markedConjunction.surfaceRealization,
                    realizationSurface:
                        markedConjunction.formulaRealizationRecord?.surface,
                },
            };
        })(),
        {
            complement: {
                formula:
                    "#0-0(tlahtoāni)0-0# + #0-0+qui-0(chīhua)0+0-h#",
                formulaRecord:
                    "#0-0(tlahtoāni)0-0# + #0-0+qui-0(chīhua)0+0-h#",
                formulaSequence: [
                    "#0-0(tlahtoāni)0-0#",
                    "#0-0+qui-0(chīhua)0+0-h#",
                ],
                written: "Tlahtoāni quichīhuah.",
                realizationSurface: "Tlahtoāni quichīhuah.",
            },
            conjunction: {
                formula:
                    "#0-0(cuīca)0+0-0# + auh + #0-0(mihtōtīa)0+0-0#",
                formulaRecord:
                    "#0-0(cuīca)0+0-0# + auh + #0-0(mihtōtīa)0+0-0#",
                formulaSequence: [
                    "#0-0(cuīca)0+0-0#",
                    "auh",
                    "#0-0(mihtōtīa)0+0-0#",
                ],
                written: "Cuīca auh mihtōtīa.",
                realizationSurface: "Cuīca auh mihtōtīa.",
            },
        }
    );

    s.eq(
        "Scalar and paradigm evaluation are pointwise identical",
        (() => {
            const lesson51Requests = [{
                coordinateId: "l51",
                operationKind: "object-complement",
                principalClause: maker,
                complementClause: chief,
                options: { semanticCategory: "change" },
            }];
            const lesson52Requests = [{
                coordinateId: "l52",
                operationKind: "conjunction",
                conjuncts: [singer, dancer],
                options: {
                    relation: "unmarked",
                    coordinationType: "additive",
                    level: "principal",
                    polarity: "positive",
                },
            }];
            const l51Scalar = ctx.evaluateClassicalNahuatlClauseComplementation(lesson51Requests[0]);
            const l52Scalar = ctx.evaluateClassicalNahuatlClauseConjunction(lesson52Requests[0]);
            const l51Paradigm = ctx.evaluateClassicalNahuatlClauseComplementationParadigm(lesson51Requests);
            const l52Paradigm = ctx.evaluateClassicalNahuatlClauseConjunctionParadigm(lesson52Requests);
            return [
                l51Paradigm.pointwiseScalarEquivalent,
                l51Paradigm.formulaProjectionPointwiseScalarEquivalent,
                l51Paradigm.writtenProjectionPointwiseScalarEquivalent,
                l51Paradigm.rows[0].formulaRealization === l51Scalar.formulaRealization,
                l51Paradigm.rows[0].surfaceRealization === l51Scalar.surfaceRealization,
                l52Paradigm.pointwiseScalarEquivalent,
                l52Paradigm.formulaProjectionPointwiseScalarEquivalent,
                l52Paradigm.writtenProjectionPointwiseScalarEquivalent,
                l52Paradigm.rows[0].formulaRealization === l52Scalar.formulaRealization,
                l52Paradigm.rows[0].surfaceRealization === l52Scalar.surfaceRealization,
            ];
        })(),
        [true, true, true, true, true, true, true, true, true, true]
    );

    s.eq(
        "Hostile raw surfaces, formula strings, lesson metadata, and altered signatures cannot authorize output",
        (() => {
            const poisonedClause = clone(chief);
            poisonedClause.surface = "FAKE";
            const raw = ctx.evaluateClassicalNahuatlClauseConjunction({
                operationKind: "conjunction",
                conjuncts: ["FAKE", singer],
                options: {
                    relation: "unmarked",
                    coordinationType: "additive",
                    level: "principal",
                    polarity: "positive",
                },
            });
            const altered = conjunction(ctx, [poisonedClause, singer]);
            const request = ctx.buildClassicalNahuatlClauseComplementationOperationRequest({
                operationKind: "object-complement",
                principalClause: maker,
                complementClause: chief,
                formula: "#FAKE#",
                surface: "FAKE",
                lesson: 51,
                options: {
                    semanticCategory: "change",
                    storedAnswer: "FAKE",
                },
            });
            const poisonedContract = clone(ctx.buildClassicalNahuatlClauseCompositionGrammarContract());
            poisonedContract.leastCommonMultiple.distinctionAxisCount = 57;
            const poisonedEvaluation =
                ctx.evaluateClassicalNahuatlClauseComplementation(
                    request
                );
            return {
                raw: raw.authorizationStatus,
                altered: altered.authorizationStatus,
                requestKeys: Object.keys(request).filter(key => /formula|surface|lesson|stored/i.test(key)),
                requestCanonical: ctx.isClassicalNahuatlClauseComplementationOperationRequest(request),
                poisonedEvaluation: [
                    poisonedEvaluation.authorizationStatus,
                    poisonedEvaluation.blockReason,
                ],
                poisonedContractCanonical: ctx.isClassicalNahuatlClauseCompositionGrammarContract(poisonedContract),
            };
        })(),
        {
            raw: "blocked",
            altered: "blocked",
            requestKeys: [
                "lessonMetadataAuthority",
                "formulaStringAuthority",
                "surfaceStringAuthority",
                "callerSuppliedSurfaceAccepted",
            ],
            requestCanonical: true,
            poisonedEvaluation: [
                "blocked",
                "forbidden-clause-complementation-request-authority:formula",
            ],
            poisonedContractCanonical: false,
        }
    );

    return s;
}

module.exports = { run };
