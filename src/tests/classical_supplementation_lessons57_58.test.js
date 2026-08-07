"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_supplementation_lessons57_58");

    const buildVnc = (
        stem,
        {
            subject = "3sg",
            valence = "intransitive",
            objectKind = "none",
            objectPerson = "",
        } = {}
    ) => ctx.classicalNahuatlVncApplication.evaluate({
        sourceStem: stem,
        sourceSubject: subject,
        subject,
        mood: "indicative",
        tense: "present",
        verbClass: "A",
        sourceValence: valence,
        objectKind,
        objectPerson,
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
    const buildNnc = (
        stem,
        {
            subject = "3sg",
            nounClass = "zero",
            animacy = "animate",
            pluralConnector = "",
        } = {}
    ) => ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject,
            nounClass,
            animacy,
            pluralConnector,
    });
    const envelope = (frame, options) =>
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            frame,
            options
        );
    const relation = (principalClause, supplementClause, options = {}) =>
        ctx.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "relation",
            principalClause,
            supplementClause,
            options,
        });
    const particleResult = particleId => {
        const sourceFrame =
            ctx.buildClassicalNahuatlParticleSourceFrame(particleId);
        return ctx.buildClassicalNahuatlParticleResultFrame(
            sourceFrame
        );
    };
    const particle = (particleId, referenceId = particleId) =>
        envelope(particleResult(particleId), { referenceId });
    const frameOfKind = (frame, kind) =>
        frame.operationFrames?.find((candidate) => candidate.kind === kind);

    const hasteRows = [
        ["l58-oc-eh", "oc eh", "oc + eh", "Oc eh!", "oc yeh", "oc + yeh", "Oc yeh!"],
        ["l58-tia-oc-eh", "tiā oc eh", "tiā + oc + eh", "Tiā oc eh!", "tiā oc yeh", "tiā + oc + yeh", "Tiā oc yeh!"],
        ["l58-ma-oc-eh", "mā oc eh", "mā + oc + eh", "Mā oc eh!", "mā oc yeh", "mā + oc + yeh", "Mā oc yeh!"],
        ["l58-tia-cuel", "tiā cuēl", "tiā + cuēl", "Tiā cuēl!", "", "", ""],
        ["l58-tia-cuel-eh", "tiā cuēl eh", "tiā + cuēl + eh", "Tiā cuēl eh!", "tiā cuēl yeh", "tiā + cuēl + yeh", "Tiā cuēl yeh!"],
        ["l58-tia-cuel-ehhuatl", "tiā cuēl ehhuātl", "tiā + cuēl + ehhuātl", "Tiā cuēl ehhuātl!", "tiā cuēl yehhuātl", "tiā + cuēl + yehhuātl", "Tiā cuēl yehhuātl!"],
        ["l58-ma-cuel", "mā cuēl", "mā + cuēl", "Mā cuēl!", "", "", ""],
        ["l58-ma-cuel-eh", "mā cuēl eh", "mā + cuēl + eh", "Mā cuēl eh!", "mā cuēl yeh", "mā + cuēl + yeh", "Mā cuēl yeh!"],
        ["l58-ma-cuel-ehhuatl", "mā cuēl ehhuātl", "mā + cuēl + ehhuātl", "Mā cuēl ehhuātl!", "mā cuēl yehhuātl", "mā + cuēl + yehhuātl", "Mā cuēl yehhuātl!"],
        ["l58-ma-ye-cuel", "mā ye cuēl", "mā + ye + cuēl", "Mā ye cuēl!", "", "", ""],
        ["l58-ma-ye-cuel-eh", "mā ye cuēl eh", "mā + ye + cuēl + eh", "Mā ye cuēl eh!", "mā ye cuēl yeh", "mā + ye + cuēl + yeh", "Mā ye cuēl yeh!"],
        ["l58-tia-ye-cuel", "tiā ye cuēl", "tiā + ye + cuēl", "Tiā ye cuēl!", "", "", ""],
        ["l58-tia-ye-cuel-eh", "tiā ye cuēl eh", "tiā + ye + cuēl + eh", "Tiā ye cuēl eh!", "tiā ye cuēl yeh", "tiā + ye + cuēl + yeh", "Tiā ye cuēl yeh!"],
    ];
    s.eq(
        "58.3 haste collocations and their licensed personal-pronoun variants are owner-issued particle Results",
        hasteRows.map(([id]) => {
            const clause = particle(id);
            const direct =
                ctx.evaluateClassicalNahuatlSupplementationOperation({
                    operationKind: "exclamatory-utterance",
                    constituents: [clause],
                });
            const variant =
                ctx.evaluateClassicalNahuatlSupplementationOperation({
                    operationKind: "exclamatory-utterance",
                    constituents: [clause],
                    options: { personalPronounVariant: "y-initial" },
                });
            return [
                id,
                clause.surface,
                clause.formulaRealization,
                direct.surfaceRealization,
                clause.contextualRealizationFrame
                    ?.variants?.[0]?.writtenSurface || "",
                variant.authorizationStatus === "authorized"
                    ? variant.formulaRealization
                    : "",
                variant.authorizationStatus === "authorized"
                    ? variant.surfaceRealization
                    : "",
                variant.authorizationStatus === "authorized"
                    ? ""
                    : variant.blockReason,
            ];
        }),
        hasteRows.map(([
            id,
            surface,
            formula,
            utterance,
            variant,
            variantFormula,
            variantUtterance,
        ]) => [
            id,
            surface,
            formula,
            utterance,
            variant,
            variantFormula,
            variantUtterance,
            variant ? "" : "exclamatory-personal-pronoun-variant-not-licensed",
        ])
    );

    s.eq(
        "58.3 contextual alternants are read-only owner facts and cannot be injected into another particle",
        (() => {
            const eligibleSource =
                ctx.buildClassicalNahuatlParticleSourceFrame(
                    "l58-oc-eh"
                );
            const eligible =
                ctx.buildClassicalNahuatlParticleResultFrame(
                    eligibleSource
                );
            const ineligibleSource =
                ctx.buildClassicalNahuatlParticleSourceFrame(
                    "l58-tia-cuel"
                );
            const ineligible =
                ctx.buildClassicalNahuatlParticleResultFrame(
                    ineligibleSource
                );
            const forged = {
                ...ineligible,
                contextualRealizationFrame:
                    eligible.contextualRealizationFrame,
            };
            const forgedEnvelope =
                ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
                    forged,
                    { referenceId: "forged-contextual-variant" }
                );
            const optionInjection =
                ctx.buildClassicalNahuatlParticleResultFrame(
                    ineligibleSource,
                    {
                        contextualRealizationFrame:
                            eligible.contextualRealizationFrame,
                    }
                );
            const variant =
                eligible.contextualRealizationFrame.variants[0];
            return {
                sourceContainsLexicalVariant:
                    Object.prototype.hasOwnProperty.call(
                        eligibleSource,
                        "contextualRealizationFrame"
                    ),
                eligible: [
                    variant.variantId,
                    variant.formulaSegments,
                    variant.writtenSurface,
                    variant.formulaDerivedFromWrittenProjection,
                    variant.writtenDerivedFromFormulaProjection,
                    Object.isFrozen(
                        eligible.contextualRealizationFrame
                    ),
                ],
                ineligibleVariantCount:
                    ineligible.contextualRealizationFrame.variants.length,
                forged: [
                    ctx.isClassicalNahuatlParticleResultFrame(
                        forged
                    ),
                    forgedEnvelope.authorizationStatus,
                    forgedEnvelope.blockReason,
                ],
                optionInjection: [
                    optionInjection.authorizationStatus,
                    optionInjection.blockReason,
                ],
            };
        })(),
        {
            sourceContainsLexicalVariant: false,
            eligible: [
                "y-initial",
                ["oc", "yeh"],
                "oc yeh",
                false,
                false,
                true,
            ],
            ineligibleVariantCount: 0,
            forged: [
                false,
                "blocked",
                "authorized-canonical-nuclear-clause-required",
            ],
            optionInjection: [
                "blocked",
                "classical-particle-result-option-forbidden:contextualRealizationFrame",
            ],
        }
    );

    s.eq(
        "58.3 #e is a typed bound particle and exclamatory composition realizes its written and formula boundaries independently",
        (() => {
            const noun = envelope(buildNnc("nocn"), {
                referenceId: "friend",
            });
            const vocativeParticle = particle(
                "l3-e-vocative",
                "vocative-particle"
            );
            const result =
                ctx.evaluateClassicalNahuatlSupplementationOperation({
                    operationKind: "exclamatory-utterance",
                    constituents: [noun, vocativeParticle],
                });
            return {
                particle: [
                    vocativeParticle.authorizationStatus,
                    vocativeParticle.surface,
                    vocativeParticle.formulaRealization,
                    vocativeParticle.particlePlacementScope,
                ],
                result: [
                    result.authorizationStatus,
                    result.formulaRealization,
                    result.surfaceRealization,
                    result.projectionsGeneratedIndependently,
                ],
                copiedParticleBlocked:
                    ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
                        {
                            ...particleResult("l3-e-vocative"),
                        },
                        { referenceId: "copy" }
                    ).blockReason,
            };
        })(),
        {
            particle: ["authorized", "e", "#e", "bound-to-previous"],
            result: [
                "authorized",
                "#0-0(nocn)0-0#e",
                "Nocne!",
                true,
            ],
            copiedParticleBlocked:
                "authorized-canonical-nuclear-clause-required",
        }
    );

    const firstPersonPrincipal = envelope(
        buildVnc("cuīca", { subject: "1sg" }),
        { referenceId: "speaker" }
    );
    const firstPersonSupplement = envelope(
        buildVnc("mati", { subject: "1sg" }),
        { referenceId: "speaker" }
    );
    const thirdPersonSupplement = envelope(
        buildVnc("mati", { subject: "3sg" }),
        { referenceId: "speaker" }
    );
    const reflexiveSingular = envelope(
        buildVnc("mati", {
            subject: "1sg",
            valence: "mainline-reflexive",
            objectKind: "reflexive",
        }),
        { referenceId: "speaker" }
    );
    const reflexivePlural = envelope(
        buildVnc("mati", {
            subject: "1pl",
            valence: "mainline-reflexive",
            objectKind: "reflexive",
        }),
        { referenceId: "speakers" }
    );
    s.eq(
        "57.6 silent first person is a contextual realization of typed first-person VNCs and never a third-person fallback",
        (() => {
            const ordinary = relation(
                firstPersonPrincipal,
                firstPersonSupplement,
                { referenceMode: "shared", headRole: "subject" }
            );
            const selected = relation(
                firstPersonPrincipal,
                firstPersonSupplement,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    contextualSilentFirstPerson: true,
                }
            );
            const singleton = (principalClause) =>
                ctx.evaluateClassicalNahuatlSupplementationOperation({
                    operationKind:
                        "contextual-first-person-realization",
                    principalClause,
                    options: { contextualSilentFirstPerson: true },
                });
            return {
                ordinary: [
                    ordinary.formulaRealization,
                    ordinary.surfaceRealization,
                    frameOfKind(
                        ordinary,
                        "classical-nahuatl-contextual-silent-first-person-frame"
                    )?.pers1Realization,
                ],
                selected: [
                    selected.formulaRealization,
                    selected.surfaceRealization,
                    frameOfKind(
                        selected,
                        "classical-nahuatl-contextual-silent-first-person-frame"
                    )?.pers1Realization,
                ],
                reflexiveSingular: [
                    singleton(reflexiveSingular).formulaRealization,
                    singleton(reflexiveSingular).surfaceRealization,
                ],
                reflexivePlural: [
                    singleton(reflexivePlural).formulaRealization,
                    singleton(reflexivePlural).surfaceRealization,
                ],
                thirdFallback: relation(
                    firstPersonPrincipal,
                    thirdPersonSupplement,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                        contextualSilentFirstPerson: true,
                    }
                ).blockReason,
                nonreflexiveIndependent:
                    singleton(firstPersonPrincipal).blockReason,
                copiedIndependent:
                    singleton({ ...reflexiveSingular }).blockReason,
            };
        })(),
        {
            ordinary: [
                "#ni-0(cuīca)0+0-0# + #ni-0(mati)0+0-0#",
                "Nicuīca nimati.",
                "sounded",
            ],
            selected: [
                "#ni-0(cuīca)0+0-0# + #0-0(mati)0+0-0#",
                "Nicuīca mati.",
                "silent",
            ],
            reflexiveSingular: [
                "#0-0+n-o(mati)0+0-0#",
                "Nomati.",
            ],
            reflexivePlural: [
                "#0-0+t-o(mati)0+0-h#",
                "Tomatih.",
            ],
            thirdFallback:
                "silent-first-person-requires-typed-first-person-not-third-person-fallback",
            nonreflexiveIndependent:
                "independent-silent-first-person-requires-distinctive-first-person-reflexive-object",
            copiedIndependent:
                "contextual-first-person-realization-requires-owner-issued-first-person-vnc",
        }
    );

    const absoluteTopicRecord =
        ctx.buildClassicalNahuatlSupplementationContextRecord({
            kind: "absolute-topic",
            referenceId: "cure",
        });
    const commentClause = envelope(buildVnc("miqui"), {
        referenceId: "event",
    });
    const absoluteTopicClause = envelope(buildNnc("zpāhyo"), {
        referenceId: "cure",
        contextRecords: [absoluteTopicRecord],
    });
    const topicalizedClause = envelope(buildNnc("ixāyac"), {
        referenceId: "mask",
    });
    const topicalizedComment = envelope(buildNnc("chālchihuitl"), {
        referenceId: "mask",
    });
    const personMismatchPrincipal = envelope(
        buildVnc("cuīca", { subject: "3pl" }),
        { referenceId: "same-person" }
    );
    const maleBondingContext =
        ctx.buildClassicalNahuatlSupplementationContextRecord({
            kind: "male-bonding",
            referenceId: "same-person",
            discourseSourceContextFrame:
                ctx.buildClassicalNahuatlDiscourseSourceContextFrame({
                    speakerGender: "male",
                    speakerGroupMembership: "member",
                }),
        });
    const personMismatchSupplement = envelope(
        buildNnc("oquich", {
            subject: "1pl",
            nounClass: "tli",
            pluralConnector: "t-in",
        }),
        {
            referenceId: "same-person",
            contextRecords: [maleBondingContext],
        }
    );
    const numberMismatchPrincipal = envelope(
        buildVnc("cuīca", { subject: "3pl" }),
        { referenceId: "same-group" }
    );
    const numberMismatchSupplement = envelope(
        buildNnc("mochi", { subject: "3sg" }),
        { referenceId: "same-group" }
    );
    const nonspecificObjectPrincipal = envelope(
        buildVnc("mati", {
            valence: "transitive",
            objectKind: "nonspecific-nonhuman",
        }),
        {
            referenceId: "knower",
            subjectReferenceId: "knower",
            objectReferenceId: "flowers",
        }
    );
    const specificObjectSupplement = envelope(
        buildNnc("xōchitl", { animacy: "nonanimate" }),
        { referenceId: "flowers" }
    );
    s.eq(
        "57.3-57.4 distinguish absolute topic from grammatical topicalization and derive agreement mismatches only for one referent",
        (() => {
            const absolute = relation(
                commentClause,
                absoluteTopicClause,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    order: "supplement-first",
                }
            );
            const topicalized = relation(
                topicalizedComment,
                topicalizedClause,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    order: "supplement-first",
                }
            );
            const personMismatch = relation(
                personMismatchPrincipal,
                personMismatchSupplement,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    agreementException: "male-bonding",
                }
            );
            const numberMismatch = relation(
                numberMismatchPrincipal,
                numberMismatchSupplement,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    agreementException: "collective",
                }
            );
            const specificityMismatch = relation(
                nonspecificObjectPrincipal,
                specificObjectSupplement,
                {
                    referenceMode: "shared",
                    headRole: "object",
                    supplementContactRole: "subject",
                }
            );
            const forgedDiscourseContext =
                ctx.buildClassicalNahuatlDiscourseSourceContextFrame({
                    speakerGender: "male",
                    speakerGroupMembership: "member",
                    formula: "#attacker#",
                });
            const rawContextRecord =
                ctx.buildClassicalNahuatlSupplementationContextRecord({
                    kind: "male-bonding",
                    referenceId: "same-person",
                    speakerGender: "male",
                    speakerIsGroupMember: true,
                });
            const copiedDiscourseContextRecord =
                ctx.buildClassicalNahuatlSupplementationContextRecord({
                    kind: "male-bonding",
                    referenceId: "same-person",
                    discourseSourceContextFrame: {
                        ...maleBondingContext.discourseSourceContextFrame,
                    },
                });
            const poisonedAbsoluteTopic =
                ctx.buildClassicalNahuatlSupplementationContextRecord({
                    kind: "absolute-topic",
                    referenceId: "cure",
                    discourseSourceContextFrame:
                        maleBondingContext.discourseSourceContextFrame,
                });
            return {
                absolute: frameOfKind(
                    absolute,
                    "classical-nahuatl-topic-comment-relation-frame"
                ),
                topicalized: frameOfKind(
                    topicalized,
                    "classical-nahuatl-topic-comment-relation-frame"
                ),
                personMismatch: frameOfKind(
                    personMismatch,
                    "classical-nahuatl-referent-conditioned-agreement-frame"
                )?.mismatchDimensions,
                numberMismatch: frameOfKind(
                    numberMismatch,
                    "classical-nahuatl-referent-conditioned-agreement-frame"
                )?.mismatchDimensions,
                specificityMismatch: frameOfKind(
                    specificityMismatch,
                    "classical-nahuatl-referent-conditioned-agreement-frame"
                )?.mismatchDimensions,
                differentReferentBlocked: relation(
                    personMismatchPrincipal,
                    envelope(
                        buildNnc("tlācatl", { subject: "3sg" }),
                        { referenceId: "different-person" }
                    ),
                    { referenceMode: "shared", headRole: "subject" }
                ).blockReason,
                copiedContextIgnored: envelope(buildNnc("zpāhyo"), {
                    referenceId: "cure",
                    contextRecords: [{ ...absoluteTopicRecord }],
                }).absoluteTopic,
                hostileSourceContext: [
                    forgedDiscourseContext.authorizationStatus,
                    forgedDiscourseContext.blockReason,
                    rawContextRecord.authorizationStatus,
                    rawContextRecord.blockReason,
                    copiedDiscourseContextRecord.authorizationStatus,
                    copiedDiscourseContextRecord.blockReason,
                    poisonedAbsoluteTopic.authorizationStatus,
                    poisonedAbsoluteTopic.blockReason,
                ],
            };
        })(),
        {
            absolute: {
                kind:
                    "classical-nahuatl-topic-comment-relation-frame",
                sourceSection: "57.3",
                relation: "absolute-topic",
                topicRelationToComment: "none",
                supplementRelation: false,
                derivedFromTypedContext: true,
                applicationUserSelectable: true,
                availabilityDerivedReadOnly: true,
            },
            topicalized: {
                kind:
                    "classical-nahuatl-topic-comment-relation-frame",
                sourceSection: "57.3",
                relation:
                    "topicalized-supplement-or-modification-head",
                topicRelationToComment: "grammatical-head",
                supplementRelation: true,
                derivedFromTypedContext: true,
                applicationUserSelectable: true,
                availabilityDerivedReadOnly: true,
            },
            personMismatch: ["person"],
            numberMismatch: ["number"],
            specificityMismatch: ["specificity"],
            differentReferentBlocked:
                "shared-referent-identity-mismatch",
            copiedContextIgnored: false,
            hostileSourceContext: [
                "blocked",
                "unrecognized-discourse-source-context-field:formula",
                "blocked",
                "raw-supplementation-context-authority-rejected",
                "blocked",
                "owner-issued-discourse-source-context-required",
                "blocked",
                "unrecognized-supplementation-context-field:discourseSourceContextFrame",
            ],
        }
    );

    const quenPotential =
        ctx.resolveClassicalNahuatlAdverbialPotential({
            stem: "quēn",
            clauseKind: "nnc-absolutive",
        });
    const quenClause = envelope(
        ctx.requestClassicalAdverbialNncResult({
            adverbialPotentialFrame: quenPotential,
            degree: "second-degree",
            scope: "external-clause",
        }),
        { referenceId: "flowers" }
    );
    s.eq(
        "57.5 derives adverbial-NNC supplement versus modifier status from the typed head relationship",
        (() => {
            const supplementaryObject = relation(
                nonspecificObjectPrincipal,
                quenClause,
                {
                    referenceMode: "shared",
                    headRole: "object",
                    supplementContactRole: "subject",
                }
            );
            const modifier = relation(
                envelope(buildVnc("miqui"), {
                    referenceId: "flowers",
                }),
                quenClause,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                }
            );
            return {
                typed: [
                    quenClause.unitKind,
                    quenClause.formulaRealization,
                    quenClause.surface,
                ],
                supplement: frameOfKind(
                    supplementaryObject,
                    "classical-nahuatl-adverbial-nnc-relation-frame"
                )?.relation,
                modifier: frameOfKind(
                    modifier,
                    "classical-nahuatl-adverbial-nnc-relation-frame"
                )?.relation,
            };
        })(),
        {
            typed: ["nnc", "#Ø-Ø(quē-n)Ø-Ø#", "quēn"],
            supplement: "supplementary-object",
            modifier: "adverbial-modifier",
        }
    );

    const pronominalPrincipal = (sourceSpec, polarity) => {
        const source =
            ctx.buildClassicalNahuatlPronominalNncSourceFrame(
                sourceSpec
            );
        const operation =
            ctx.buildClassicalNahuatlPronominalNncOperationFrame(
                source,
                {
                    subject: "3sg",
                    clausePosition: "initial",
                    adjunctorInMode: "none",
                    sentenceType: "statement",
                    polarity,
                }
            );
        return envelope(
            ctx.requestClassicalPronominalNncResult(
                source,
                operation
            ),
            {
                referenceId:
                    `principal-${sourceSpec.stem === "ā-0" ? "ac" : "tleh"}-${polarity}`,
            }
        );
    };
    const relationalPrincipal = (kind, negative) => {
        const requestKind =
            ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND
            || "classical-nahuatl-nnc-nounstem-request";
        const request = kind === "can"
            ? {
                nounstem: {
                    kind: requestKind,
                    stemId: "n-locative",
                    operation: "relational-nnc",
                    formation: "option-two",
                    sourceKind: "interrogative-empty",
                    sourceFormation: "can-interrogative",
                    sourceMode: "embed-matrix",
                    sourceStem: "",
                    sourceEmbedStem: "",
                    sourceMatrixStem: "n",
                },
                state: "absolutive",
                subjectMode: "adverbialized",
                negative,
            }
            : {
                nounstem: {
                    kind: requestKind,
                    stemId: "c-means-purpose-reason-time",
                    operation: "relational-nnc",
                    formation: "option-one",
                    sourceKind: "possessor",
                    sourceMode: "whole-stem",
                    sourceStem: "c",
                    sourceMatrixStem: "c",
                    relationalFunction: "time",
                },
                state: "possessive",
                possessorId: "3common",
                subjectMode: "adverbialized",
                sentencePosition: "initial",
                negative,
            };
        return envelope(
            ctx.requestClassicalRelationalNncResult(request),
            { referenceId: `${kind}-${negative ? "negative" : "positive"}` }
        );
    };
    const iuhPotential =
        ctx.resolveClassicalNahuatlAdverbialPotential({
            stem: "iuh",
            clauseKind: "vnc",
        });
    const principals = [
        pronominalPrincipal({ stem: "ā-0" }, "positive"),
        pronominalPrincipal({
            stem: "tl-eh",
            embedStem: "tl",
            matrixStem: "eh",
        }, "positive"),
        relationalPrincipal("can", false),
        relationalPrincipal("ic", false),
        particle("l3-cuix", "cuix-principal"),
        particle("l3-ahzo", "ahzo-principal"),
        particle("l58-ahmo", "ahmo-principal"),
        envelope(buildNnc("iuhqui"), { referenceId: "iuhqui-principal" }),
        envelope(
            ctx.requestClassicalAdverbialNncResult({
                adverbialPotentialFrame: iuhPotential,
                degree: "first-degree",
                scope: "external-clause",
            }),
            { referenceId: "iuh-principal" }
        ),
        pronominalPrincipal({ stem: "ā-0" }, "negative"),
        pronominalPrincipal({
            stem: "tl-eh",
            embedStem: "tl",
            matrixStem: "eh",
        }, "negative"),
        relationalPrincipal("can", true),
        relationalPrincipal("ic", true),
    ];
    const adjoined = envelope(buildVnc("mati"), {
        referenceId: "adjoined-clause",
    });
    const mah = particle("l3-mah", "mah-marker");
    const mahCa = particle("l58-mah-ca", "mah-ca-marker");
    const optionalIn = particle("l3-in", "optional-in");
    const suchThat = (
        principalClause,
        markerClause = mah,
        adjunctorClause = null
    ) => ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "such-that-adjunction",
        principalClause,
        supplementClause: adjoined,
        markerClause,
        adjunctorClause,
    });
    s.eq(
        "58.4-58.6 reuse one such-that operation for every licensed principal and derive strong polarity",
        principals.map((principalClause) => {
            const result = suchThat(principalClause);
            return [
                result.principalIdentity,
                result.authorizationStatus,
                result.computedPolarity,
            ];
        }),
        [
            ["ac", "authorized", "ordinary"],
            ["tleh", "authorized", "ordinary"],
            ["can", "authorized", "ordinary"],
            ["ic", "authorized", "ordinary"],
            ["cuix", "authorized", "ordinary"],
            ["ahzo", "authorized", "ordinary"],
            ["ahmo", "authorized", "strong-negative"],
            ["iuhqui", "authorized", "ordinary"],
            ["iuh", "authorized", "ordinary"],
            ["ayac", "authorized", "strong-negative"],
            ["ahtleh", "authorized", "strong-negative"],
            ["ahcan", "authorized", "strong-negative"],
            ["aic", "authorized", "strong-negative"],
        ]
    );

    s.eq(
        "58.4 optional in, mah ca#, frozen yes collocations, and hostile authority all preserve one canonical path",
        (() => {
            const positive = principals[0];
            const negative = principals[9];
            const marked = suchThat(positive, mahCa, optionalIn);
            const negativeMahCa = suchThat(negative, mahCa);
            const frozen = ["l58-quemah", "l58-quemahca"].map(
                (id) => ctx.evaluateClassicalNahuatlSupplementationOperation({
                    operationKind: "such-that-adjunction",
                    principalClause: particle(id, `${id}-principal`),
                })
            );
            const copiedPrincipal = { ...positive };
            const copiedRequest =
                ctx.buildClassicalNahuatlSupplementationOperationRequest({
                    operationKind: "such-that-adjunction",
                    principalClause: positive,
                    supplementClause: adjoined,
                    markerClause: mah,
                });
            const scalarRequests = [
                {
                    operationKind: "relation",
                    principalClause: firstPersonPrincipal,
                    supplementClause: firstPersonSupplement,
                    options: {
                        referenceMode: "shared",
                        headRole: "subject",
                        contextualSilentFirstPerson: true,
                    },
                },
                {
                    operationKind:
                        "contextual-first-person-realization",
                    principalClause: reflexiveSingular,
                    options: { contextualSilentFirstPerson: true },
                },
                {
                    operationKind: "exclamatory-utterance",
                    constituents: [particle("l58-tia-cuel")],
                },
                {
                    operationKind: "such-that-adjunction",
                    principalClause: positive,
                    supplementClause: adjoined,
                    markerClause: mah,
                },
            ];
            const paradigm =
                ctx.evaluateClassicalNahuatlSupplementationOperationParadigm(
                    scalarRequests
                );
            const scalars = scalarRequests.map((request) =>
                ctx.evaluateClassicalNahuatlSupplementationOperation(
                    request
                )
            );
            return {
                marked: [
                    marked.formulaRealization,
                    marked.surfaceRealization,
                ],
                negativeMahCa: [
                    negativeMahCa.computedPolarity,
                    negativeMahCa.formulaRealization,
                    negativeMahCa.surfaceRealization,
                ],
                frozen: frozen.map((frame) => [
                    frame.formulaRealization,
                    frame.surfaceRealization,
                    frame.frozenEllipsis,
                ]),
                wrongMarker: suchThat(
                    positive,
                    particle("l3-ma", "wish-marker")
                ).blockReason,
                wrongIn: suchThat(
                    positive,
                    mah,
                    particle("l3-ahzo", "wrong-in")
                ).blockReason,
                copiedPrincipal:
                    suchThat(copiedPrincipal).blockReason,
                hostileAuthorityBlocked:
                    ctx.evaluateClassicalNahuatlSupplementationOperation({
                        ...copiedRequest,
                        surface: "Canvas answer",
                        formula: "Canvas formula",
                    }).blockReason,
                hostileOptionBlocked:
                    ctx.evaluateClassicalNahuatlSupplementationOperation({
                        ...copiedRequest,
                        options: {
                            storedSurface: "Canvas answer",
                        },
                    }).blockReason,
                scalarParity: paradigm.rows.every((row, index) =>
                    row.authorizationStatus
                        === scalars[index].authorizationStatus
                    && row.formulaRealization
                        === (scalars[index].formulaRealization || "")
                    && row.surfaceRealization
                        === (scalars[index].surfaceRealization || "")
                ),
            };
        })(),
        {
            marked: [
                "#0-0(ā-0)c-0# + in + mah + ca#0-0(mati)0+0-0#",
                "Āc in mah camati?",
            ],
            negativeMahCa: [
                "strong-affirmative",
                "ay#0-0(ā-0)c-0# + mah + ca#0-0(mati)0+0-0#",
                "Ayāc mah camati.",
            ],
            frozen: [
                ["quē + mah", "quēmah", true],
                ["quē + mah + ca#", "quemahca", true],
            ],
            wrongMarker:
                "such-that-adjunction-requires-licensed-principal-marker-and-adjoined-clause",
            wrongIn:
                "such-that-adjunction-requires-licensed-principal-marker-and-adjoined-clause",
            copiedPrincipal:
                "such-that-adjunction-requires-licensed-principal-marker-and-adjoined-clause",
            hostileAuthorityBlocked:
                "forbidden-supplementation-request-authority:formula",
            hostileOptionBlocked:
                "unrecognized-supplementation-operation-option:storedSurface",
            scalarParity: true,
        }
    );

    s.eq(
        "the shared clause workflow accepts only an owner-issued typed quil VNC and keeps fusion inside one canonical report operation",
        (() => {
            const controllerTarget = Object.create(ctx);
            const controllerApi =
                ctx.createClassicalClauseRelationControllerGlobals(
                    controllerTarget
                );
            Object.defineProperties(
                controllerTarget,
                Object.getOwnPropertyDescriptors(controllerApi)
            );
            const applicationVnc = (
                sourceStem,
                subject,
                tense,
                sourceValence,
                objectPerson = ""
            ) => ctx.executeClassicalGrammarApplicationRequest({
                operationId: "vnc:application",
                args: [{
                    sourceStem,
                    verbClass: "A",
                    sourceValence,
                    subject,
                    objectKind: objectPerson
                        ? "specific-projective"
                        : "none",
                    objectPerson,
                    requestedDerivation: "direct",
                    requestedVoice: "active",
                    mood: "indicative",
                    tense,
                    outputScope: "single",
                }],
            });
            const principal = applicationVnc(
                "il",
                "3sg",
                "preterit",
                "specific-projective",
                "3sg"
            );
            const reported = applicationVnc(
                "yā",
                "3pl",
                "preterit",
                "intransitive"
            );
            const compose = (fuseQuilMach) => {
                const controller =
                    controllerTarget
                        .createClassicalClauseRelationController();
                const principalCapture = controller.captureCurrentResult(
                    "principal",
                    principal.canonicalResult
                );
                const reportedCapture = controller.captureCurrentResult(
                    "adjoined",
                    reported.canonicalResult
                );
                const result = controller.compose({
                    relation: "rumored-report",
                    mach: "present",
                    fuseQuilMach,
                });
                return {
                    captures: [
                        principalCapture.authorizationStatus,
                        reportedCapture.authorizationStatus,
                    ],
                    result,
                };
            };
            const separate = compose("separate");
            const fused = compose("fused");
            const wrongController =
                controllerTarget.createClassicalClauseRelationController();
            const wrongPrincipal = applicationVnc(
                "itta",
                "3sg",
                "preterit",
                "specific-projective",
                "3sg"
            );
            wrongController.captureCurrentResult(
                "principal",
                wrongPrincipal.canonicalResult
            );
            wrongController.captureCurrentResult(
                "adjoined",
                reported.canonicalResult
            );
            const wrong = wrongController.compose({
                relation: "rumored-report",
                mach: "present",
                fuseQuilMach: "separate",
            });
            return {
                captures: separate.captures,
                separate: [
                    separate.result.authorizationStatus,
                    separate.result.presentation.formula,
                    separate.result.presentation.surface,
                    separate.result.canonicalRequest
                        .projectionsGeneratedIndependently,
                    separate.result.canonicalResult
                        ?.projectionsGeneratedIndependently,
                ],
                fused: [
                    fused.result.authorizationStatus,
                    fused.result.presentation.formula,
                    fused.result.presentation.surface,
                    fused.result.canonicalRequest
                        .applicationOperationId,
                ],
                wrong: [
                    wrong.authorizationStatus,
                    wrong.blockReason,
                ],
            };
        })(),
        {
            captures: ["authorized", "authorized"],
            separate: [
                "authorized",
                "#0-0+qu-0(il)0+⎕-0# + mach + in + #0-0(yah)0+qu-eh#",
                "Quil mach in yahqueh.",
                true,
                true,
            ],
            fused: [
                "authorized",
                "#0-0+qu-0(il)0+⎕-0# + mach + in + #0-0(yah)0+qu-eh#",
                "Quilmach in yahqueh.",
                "sentence:supplementation",
            ],
            wrong: [
                "blocked",
                "classical-clause-relation-rumored-report-source-incompatible",
            ],
        }
    );

    return s;
}

module.exports = { run };
