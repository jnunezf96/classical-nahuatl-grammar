"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_supplementation_lessons17_19");
    const buildSupplementation = (principalClause, supplementClause, options = {}) =>
        ctx.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "relation",
            principalClause,
            supplementClause,
            options,
        });
    const proofFamilyStatus = Object.create(null);
    const prove = (families, label, actual, expected) => {
        const passed = JSON.stringify(actual) === JSON.stringify(expected);
        for (const family of families) {
            proofFamilyStatus[family] =
                proofFamilyStatus[family] === false ? false : passed;
        }
        s.eq(label, actual, expected);
    };
    s.eq(
        "supplementation exposes only the licensed shared operation evaluator",
        [
            typeof ctx.evaluateClassicalNahuatlSupplementationOperation,
            typeof ctx.buildClassicalNahuatlSupplementationFrame,
        ],
        ["function", "undefined"]
    );
    const vncApplication = ctx.createClassicalNahuatlVncApplication(ctx);

    const buildVnc = (
        stem,
        {
            subject = "3sg",
            mood = "indicative",
            valence = "intransitive",
            objectPerson = "",
            tense = "present",
            directionalPrefix = "",
            negative = false,
            antecessive = false,
            sentenceType = "assertion",
            verbClass = "A",
            sourceInitialISelection = "",
            objectRequests = [],
            construction = "",
            silentSpecificObject = false,
        } = {}
    ) => vncApplication.evaluate({
        sourceStem: stem,
        verbClass,
        ...(sourceInitialISelection ? { sourceInitialISelection } : {}),
        sourceValence: valence,
        sourceSubject: subject,
        subject,
        mood,
        tense,
        requestedDerivation: "direct",
        objectKind: valence === "specific-projective"
            ? "specific-projective"
            : valence === "intransitive"
                ? ""
                : "nonspecific-human",
        objectPerson,
        requestedVoice: "active",
        silentSpecificObject,
        ...(objectRequests.length ? { objectRequests } : {}),
        sentenceOptions: {
            directionalPrefix,
            negative,
            antecessive,
            sentenceAntecessive: antecessive,
            sentenceType,
            construction,
            outsidePrefixes: antecessive ? ["ō#"] : [],
        },
    });
    const buildVncSubjectSource = (
        stem,
        {
            subject = "3sg",
            tense = "present",
            verbClass = "C",
            sourceInitialISelection = "",
        } = {}
    ) => buildVnc(stem, {
        subject,
        tense,
        verbClass,
        sourceInitialISelection,
        construction: stem === "i-ā" ? "pronominal-nnc" : "",
    });
    const buildNnc = (
        stem,
        {
            subject = "3sg",
            nounClass = "zero",
            animacy = "animate",
        } = {}
    ) => ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject,
        nounClass,
        animacy,
    });
    const envelope = (frame, options) => (
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(frame, options)
    );
    const context = (kind, referenceId, options = {}) => (
        ctx.buildClassicalNahuatlSupplementationContextRecord({
            kind,
            referenceId,
            ...options,
        })
    );
    const discourseContext = (options = {}) => (
        ctx.buildClassicalNahuatlDiscourseSourceContextFrame(options)
    );

    s.eq(
        "source-audit contracts are absent from the production runtime",
        {
            claims:
                typeof ctx.CLASSICAL_NAHUATL_LESSONS17_19_SOURCE_CLAIMS,
            contract:
                typeof ctx.CLASSICAL_NAHUATL_LESSONS17_19_GRAMMAR_CONTRACT,
            getter:
                typeof ctx.getClassicalNahuatlLessons17To19GrammarContract,
            inspection:
                typeof ctx.inspectClassicalNahuatlLessons17To19GrammarContract,
            registry:
                ctx.listGrammarContractDefinitions(
                    ctx.getDefaultGrammarContractRegistry()
                ).some(
                    (entry) => entry.contractKind
                        === "classical-nahuatl-supplementation-grammar-contract"
                ),
        },
        {
            claims: "undefined",
            contract: "undefined",
            getter: "undefined",
            inspection: "undefined",
            registry: false,
        }
    );

    prove(
        ["gcd"],
        "GCD is one signed allowlisted typed operation request for scalar and paradigm evaluation",
        (() => {
            const canonical =
                ctx.buildClassicalNahuatlSupplementationOperationRequest({
                    operationKind: "relation",
                    principalClause: null,
                    supplementClause: null,
                    options: {
                        referenceMode: "shared",
                        headRole: "subject",
                        sourceSpan: "5762-6738",
                    },
                    surface: "stored Canvas result",
                    formula: "stored Canvas formula",
                    lesson: 19,
                });
            const forged = {
                ...canonical,
                operationKind: "vocative",
                surface: "stored Canvas result",
            };
            return {
                request: [
                    canonical.kind,
                    canonical.operationKind,
                    canonical.operationKindLicensed,
                    canonical.options,
                    Object.hasOwn(canonical, "surface"),
                    Object.hasOwn(canonical, "formula"),
                    Object.hasOwn(canonical, "lesson"),
                ],
                canonical:
                    ctx.isClassicalNahuatlSupplementationOperationRequest(
                        canonical
                    ),
                forged:
                    ctx.isClassicalNahuatlSupplementationOperationRequest(
                        forged
                    ),
                hostileResult:
                    ctx.evaluateClassicalNahuatlSupplementationOperation(
                        forged
                    ).blockReason,
            };
        })(),
        {
            request: [
                "classical-nahuatl-supplementation-operation-request",
                "relation",
                true,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                },
                false,
                false,
                false,
            ],
            canonical: true,
            forged: false,
            hostileResult:
                "forbidden-supplementation-request-authority:surface",
        }
    );

    const sing1 = buildVnc("cuīca", { subject: "1sg" });
    const peter1 = buildNnc("Petoloh", { subject: "1sg" });
    const principal1 = envelope(sing1, {
        referenceId: "speaker",
        sourceStem: "cuīca",
        mood: "indicative",
        tense: "present",
    });
    const supplement1 = envelope(peter1, {
        referenceId: "speaker",
        sourceStem: "Petoloh",
    });

    prove(
        ["gcd", "clause-kind"],
        "GCD consumes canonical VNC/NNC frames and rejects forged or incomplete clause carriers",
        {
            principal: [principal1.authorizationStatus, principal1.unitKind, principal1.subject.category, principal1.formulaRealization, principal1.surface],
            supplement: [supplement1.authorizationStatus, supplement1.unitKind, supplement1.subject.category, supplement1.formulaRealization, supplement1.surface],
            forged: envelope({
                authorizationStatus: "authorized",
                kind: "canvas-example",
                surface: "Nicuīca",
                formula: "#ni-0(cuīca)0+0-0#",
            }, { referenceId: "speaker" }).blockReason,
            noReference: envelope(sing1, {}).blockReason,
            alteredSignatureAccepted: ctx.isClassicalNahuatlSupplementationClauseEnvelope({
                ...principal1,
                surface: "Canvas answer",
            }),
            copiedEnvelopeAccepted:
                ctx.isClassicalNahuatlSupplementationClauseEnvelope({
                    ...principal1,
                }),
        },
        {
            principal: ["authorized", "vnc", "1sg", "#ni-0(cuīca)0+0-0#", "nicuīca"],
            supplement: ["authorized", "nnc", "1sg", "#ni-0(Petoloh)0-0#", "niPetoloh"],
            forged: "authorized-canonical-nuclear-clause-required",
            noReference: "typed-participant-reference-ids-required",
            alteredSignatureAccepted: false,
            copiedEnvelopeAccepted: false,
        }
    );

    const sharedSubject = buildSupplementation(
        principal1,
        supplement1,
        {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            order: "principal-first",
        }
    );
    const topicMarked = buildSupplementation(
        principal1,
        supplement1,
        {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            order: "supplement-first",
            adjunctor: "in",
            commentEmphaticCa: true,
        }
    );
    const mismatchSupplement = envelope(
        buildNnc("Petoloh", { subject: "2sg" }),
        { referenceId: "addressee" }
    );

    prove(
        ["reference", "order", "adjunctor"],
        "shared reference, topic/comment order, marking, and mismatch blockers execute mechanically",
        {
            shared: [
                sharedSubject.authorizationStatus,
                sharedSubject.referenceFrame.referenceIdentityUnified,
                sharedSubject.formulaRealization,
                sharedSubject.surfaceRealization,
            ],
            topic: [
                topicMarked.authorizationStatus,
                topicMarked.operationFrames.find(frame => (
                    frame.kind
                    === "classical-nahuatl-supplementation-order-frame"
                ))?.topic,
                topicMarked.operationFrames.find(frame => (
                    frame.kind
                    === "classical-nahuatl-supplementation-adjunctor-frame"
                ))?.adjunctor,
                topicMarked.formulaRealization,
                topicMarked.surfaceRealization,
            ],
            referenceMismatch: buildSupplementation(
                principal1,
                mismatchSupplement,
                { referenceMode: "shared", headRole: "subject" }
            ).blockReason,
            forgedSurfaceAccepted: ctx.isClassicalNahuatlSupplementationFrame({
                ...sharedSubject,
                surfaceRealization: "Stored Canvas transform.",
            }),
            copiedResultAccepted:
                ctx.isClassicalNahuatlSupplementationFrame({
                    ...sharedSubject,
                }),
        },
        {
            shared: ["authorized", true, "#ni-0(cuīca)0+0-0# + #ni-0(Petoloh)0-0#", "Nicuīca niPetoloh."],
            topic: ["authorized", true, "in", "in + #ni-0(Petoloh)0-0# + ca + #ni-0(cuīca)0+0-0#", "In niPetoloh ca nicuīca."],
            referenceMismatch: "shared-referent-identity-mismatch",
            forgedSurfaceAccepted: false,
            copiedResultAccepted: false,
        }
    );

    const see1 = envelope(
        buildVnc("itta", {
            sourceInitialISelection: "real",
            subject: "3sg",
            valence: "specific-projective",
            objectPerson: "1sg",
        }),
        {
            referenceId: "viewer",
            subjectReferenceId: "viewer",
            objectReferenceId: "speaker",
            sourceStem: "itta",
        }
    );
    const possessiveHouse = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3sg",
        possessor: "1sg",
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        animacy: "nonanimate",
    });
    const house1 = envelope(possessiveHouse, {
        referenceId: "speaker",
        sourceStem: "cal",
    });

    prove(
        ["head-role"],
        "subject, object, and possessor heads are derived from typed clause slots",
        {
            object: buildSupplementation(
                see1,
                supplement1,
                {
                    referenceMode: "shared",
                    headRole: "object",
                    supplementContactRole: "subject",
                }
            ).authorizationStatus,
            possessor: buildSupplementation(
                house1,
                supplement1,
                {
                    referenceMode: "shared",
                    headRole: "possessor",
                    supplementContactRole: "subject",
                }
            ).authorizationStatus,
            nncObjectBlocked: buildSupplementation(
                house1,
                supplement1,
                {
                    referenceMode: "shared",
                    headRole: "object",
                    supplementContactRole: "subject",
                }
            ).blockReason,
            vncPossessorBlocked: buildSupplementation(
                principal1,
                supplement1,
                {
                    referenceMode: "shared",
                    headRole: "possessor",
                    supplementContactRole: "subject",
                }
            ).blockReason,
        },
        {
            object: "authorized",
            possessor: "authorized",
            nncObjectBlocked: "typed-principal-personal-head-required",
            vncPossessorBlocked: "typed-principal-personal-head-required",
        }
    );

    const integratedPrincipal = envelope(buildVnc("cuīca", {
        subject: "1sg",
        tense: "preterit",
        antecessive: true,
    }), {
        referenceId: "speaker",
        sourceStem: "cuīca",
    });
    prove(
        ["integrated", "question"],
        "integrated antecessive placement and information-question replacement enforce all conditions",
        (() => {
            const integrated = buildSupplementation(
                integratedPrincipal,
                supplement1,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    order: "supplement-first",
                    integratedAntecessive: true,
                }
            );
            const whoFrame = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative",
                interrogativeKind: "āc",
                subject: "3sg",
            });
            const who = envelope(whoFrame, {
                referenceId: "third",
            });
            const dies = envelope(buildVnc("miqui", { subject: "3sg" }), {
                referenceId: "third",
                sourceStem: "miqui",
            });
            const question = buildSupplementation(
                dies,
                who,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    order: "supplement-first",
                    informationQuestion: true,
                }
            );
            return {
                integrated: [
                    integrated.authorizationStatus,
                    integrated.operationFrames.find((frame) => frame.kind.includes("integrated"))?.attachesTo,
                    integrated.surfaceRealization,
                ],
                integratedWithoutO: buildSupplementation(
                    principal1,
                    supplement1,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                        order: "supplement-first",
                        integratedAntecessive: true,
                    }
                ).blockReason,
                question: [
                    question.authorizationStatus,
                    question.operationFrames.find((frame) => frame.kind.includes("information-question"))?.requiredPosition,
                    question.surfaceRealization,
                ],
                questionWrongOrder: buildSupplementation(
                    dies,
                    who,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                        order: "principal-first",
                        informationQuestion: true,
                    }
                ).blockReason,
            };
        })(),
        {
            integrated: ["authorized", "supplement", "ŌniPetoloh nicuīcac."],
            integratedWithoutO: "integrated-antecessive-conditions-not-met",
            question: ["authorized", "sentence-initial", "Āc miqui?"],
            questionWrongOrder: "information-question-requires-initial-interrogative-nnc-supplement",
        }
    );

    prove(
        ["integrated", "adjunctor", "included"],
        "included antecessive jump and demonstrative adjunctor fusion require typed carriers",
        (() => {
            const truth = envelope(
                buildNnc("nelli", { subject: "3sg" }),
                { referenceId: "event" }
            );
            const occurred = envelope(
                buildVnc("cuil-tonoh", {
                    subject: "1pl",
                    tense: "preterit",
                    antecessive: true,
                }),
                {
                    referenceId: "event",
                    subjectReferenceId: "group",
                }
            );
            const jumped = buildSupplementation(
                truth,
                occurred,
                {
                    referenceMode: "included",
                    headRole: "subject",
                    includedAntecessiveJump: true,
                }
            );
            const withoutTypedAntecessive =
                buildSupplementation(
                    truth,
                    envelope(
                        buildVnc("cuil-tonoh", {
                            subject: "1pl",
                            tense: "preterit",
                        }),
                        {
                            referenceId: "event",
                            subjectReferenceId: "group",
                            antecessiveOrder: true,
                        }
                    ),
                    {
                        referenceMode: "included",
                        headRole: "subject",
                        includedAntecessiveJump: true,
                    }
                );
            const thirdPrincipal = envelope(
                buildVnc("miqui", { subject: "3sg" }),
                { referenceId: "third" }
            );
            const demonstrative = envelope(
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "demonstrative",
                    demonstrative: "īn",
                    subject: "3sg",
                }),
                { referenceId: "third" }
            );
            const fused = buildSupplementation(
                thirdPrincipal,
                demonstrative,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    adjunctor: "in",
                    fuseDemonstrativeAdjunctor: true,
                }
            );
            const frameOfKind = (result, kind) => result.operationFrames.find(
                frame => frame.kind === kind
            );
            return {
                jump: [
                    jumped.authorizationStatus,
                    frameOfKind(
                        jumped,
                        "classical-nahuatl-supplementation-included-antecessive-jump-frame"
                    )?.targetCarrier,
                ],
                forgedRawJump: withoutTypedAntecessive.blockReason,
                fusion: [
                    fused.authorizationStatus,
                    frameOfKind(
                        fused,
                        "classical-nahuatl-supplementation-adjunctor-frame"
                    )?.fusesWithDemonstrative,
                ],
                fusionAgainstOrdinaryNnc:
                    buildSupplementation(
                        principal1,
                        supplement1,
                        {
                            referenceMode: "shared",
                            headRole: "subject",
                            adjunctor: "in",
                            fuseDemonstrativeAdjunctor: true,
                        }
                    ).operationFrames.find(
                        frame => frame.kind
                          === "classical-nahuatl-supplementation-adjunctor-frame"
                    )?.fusesWithDemonstrative,
            };
        })(),
        {
            jump: ["authorized", "nnc-principal"],
            forgedRawJump:
                "included-antecessive-jump-conditions-not-met",
            fusion: ["authorized", true],
            fusionAgainstOrdinaryNnc: false,
        }
    );

    prove(
        ["recursion", "order"],
        "discontinuous and recursive projections retain typed edges and reject untyped interveners",
        (() => {
            const friend = envelope(buildNnc("icnīuh", { subject: "1sg" }), {
                referenceId: "speaker",
            });
            const discontinuous = buildSupplementation(
                principal1,
                supplement1,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    order: "discontinuous",
                    interveningClauses: [friend],
                }
            );
            const nested = buildSupplementation(
                friend,
                supplement1,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    order: "principal-first",
                }
            );
            const recursive = buildSupplementation(
                principal1,
                friend,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContinuationFrames: [nested],
                }
            );
            const recursionFrame = recursive.operationFrames.find(
                frame => frame.kind
                  === "classical-nahuatl-supplementation-recursive-clause-graph-frame"
            );
            return {
                discontinuous: [
                    discontinuous.authorizationStatus,
                    discontinuous.operationFrames[0].interveningClauseCount,
                    discontinuous.surfaceRealization,
                ],
                nested: [
                    nested.authorizationStatus,
                    nested.referenceFrame.referenceIdentityUnified,
                ],
                recursive: [
                    recursive.authorizationStatus,
                    recursionFrame?.completeClauseNodeCount,
                    recursionFrame?.continuations[0].attachTo,
                    recursive.supplementContinuationFrames[0]
                        .canonicalSignature === nested.canonicalSignature,
                ],
                forgedIntervener: buildSupplementation(
                    principal1,
                    supplement1,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                        order: "discontinuous",
                        interveningClauses: [{ surface: "formula-only" }],
                    }
                ).blockReason,
                forgedContinuation:
                    buildSupplementation(
                        principal1,
                        friend,
                        {
                            referenceMode: "shared",
                            headRole: "subject",
                            supplementContinuationFrames: [
                                { canonicalSignature: "display-only" },
                            ],
                        }
                    ).blockReason,
            };
        })(),
        {
            discontinuous: ["authorized", 1, "NiPetoloh nicnīuh nicuīca."],
            nested: ["authorized", true],
            recursive: ["authorized", 3, "supplement", true],
            forgedIntervener: "discontinuous-order-requires-typed-intervening-clauses",
            forgedContinuation:
                "recursive-supplementation-requires-typed-acyclic-continuations",
        }
    );

    prove(
        ["agreement-exception"],
        "collective, named-partner, male-bonding, and ac mismatches are narrow typed exceptions",
        (() => {
            const namedPartnerSourceContext = discourseContext({
                namedPartnerKnownParticipant: "speaker",
            });
            const namedAddresseeSourceContext = discourseContext({
                namedPartnerKnownParticipant: "addressee",
            });
            const maleGroupSourceContext = discourseContext({
                speakerGender: "male",
                speakerGroupMembership: "member",
            });
            const pluralPrincipal = envelope(
                buildVnc("miqui", { subject: "3pl" }),
                { referenceId: "group" }
            );
            const collective = envelope(
                buildNnc("mochi", { subject: "3sg" }),
                {
                    referenceId: "group",
                }
            );
            const partner = envelope(
                buildNnc("icnīuh", { subject: "3sg" }),
                {
                    referenceId: "named-third",
                    contextRecords: [context("named-partner", "group", {
                        discourseSourceContextFrame:
                            namedPartnerSourceContext,
                        groupReferenceId: "group",
                        namedPartnerReferenceId: "named-third",
                        speakerOrAddresseeReferenceId: "speaker",
                    })],
                }
            );
            const addresseePartner = envelope(
                buildNnc("icnīuh", { subject: "3sg" }),
                {
                    referenceId: "named-third",
                    contextRecords: [context("named-partner", "group", {
                        discourseSourceContextFrame:
                            namedAddresseeSourceContext,
                        groupReferenceId: "group",
                        namedPartnerReferenceId: "named-third",
                        speakerOrAddresseeReferenceId: "addressee",
                    })],
                }
            );
            const menFrame =
                ctx.buildClassicalNahuatlAbsolutiveNncFrame("oquich", {
                    subject: "1pl",
                    nounClass: "tli",
                    animacy: "animate",
                    pluralConnector: "t-in",
                });
            const men = envelope(
                menFrame,
                {
                    referenceId: "group",
                    contextRecords: [context("male-bonding", "group", {
                        discourseSourceContextFrame:
                            maleGroupSourceContext,
                    })],
                }
            );
            const forgedRawMen = envelope(
                menFrame,
                {
                    referenceId: "group",
                    maleBondingStem: true,
                }
            );
            const build = (supplement, agreementException, extra = {}) => (
                buildSupplementation(
                    pluralPrincipal,
                    supplement,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                        agreementException,
                        ...extra,
                    }
                )
            );
            const ordinaryMismatch = build(collective, "");
            return {
                ordinaryMismatch: [
                    ordinaryMismatch.authorizationStatus,
                    ordinaryMismatch.blockReason,
                    ordinaryMismatch.operationFrames.find(frame => (
                        frame.kind
                        === "classical-nahuatl-referent-conditioned-agreement-frame"
                    ))?.sameExtralinguisticReferent,
                ],
                collective: build(collective, "collective").authorizationStatus,
                namedPartner: build(partner, "named-partner").authorizationStatus,
                namedAddressee:
                    build(addresseePartner, "named-partner")
                        .authorizationStatus,
                namedPartnerRelationship:
                    build(partner, "named-partner")
                        .referenceFrame.referenceRelationship,
                maleBonding: build(men, "male-bonding").authorizationStatus,
                forgedRawBlocked:
                    build(forgedRawMen, "male-bonding").blockReason,
                womanContext: context("male-bonding", "group", {
                    discourseSourceContextFrame: discourseContext({
                        speakerGender: "female",
                        speakerGroupMembership: "member",
                    }),
                }).blockReason,
                nonmemberContext: context("male-bonding", "group", {
                    discourseSourceContextFrame: discourseContext({
                        speakerGender: "male",
                        speakerGroupMembership: "nonmember",
                    }),
                }).blockReason,
                incompleteNamedContext:
                    context("named-partner", "group", {
                        discourseSourceContextFrame:
                            namedPartnerSourceContext,
                        namedPartnerReferenceId: "named-third",
                    }).blockReason,
                absentKnownPartnerContext:
                    context("named-partner", "group", {
                        discourseSourceContextFrame: discourseContext(),
                        groupReferenceId: "group",
                        namedPartnerReferenceId: "named-third",
                        speakerOrAddresseeReferenceId: "speaker",
                    }).blockReason,
                copiedDiscourseContext:
                    context("male-bonding", "group", {
                        discourseSourceContextFrame: {
                            ...maleGroupSourceContext,
                        },
                    }).blockReason,
                rawContextAuthority:
                    context("male-bonding", "group", {
                        speakerGender: "male",
                        speakerIsGroupMember: true,
                    }).blockReason,
                retiredCollectiveContext:
                    context("collective-reference", "group").blockReason,
                retiredAntecessiveContext:
                    context("antecessive-order", "group").blockReason,
            };
        })(),
        {
            ordinaryMismatch: [
                "blocked",
                "shared-referent-person-number-mismatch",
                undefined,
            ],
            collective: "authorized",
            namedPartner: "authorized",
            namedAddressee: "authorized",
            namedPartnerRelationship:
                "named-partner-is-member-of-principal-group",
            maleBonding: "authorized",
            forgedRawBlocked: "requested-agreement-exception-not-licensed",
            womanContext: "male-bonding-context-requires-male-group-member",
            nonmemberContext: "male-bonding-context-requires-male-group-member",
            incompleteNamedContext:
                "named-partner-context-requires-typed-group-members",
            absentKnownPartnerContext:
                "named-partner-context-requires-typed-group-members",
            copiedDiscourseContext:
                "owner-issued-discourse-source-context-required",
            rawContextAuthority:
                "raw-supplementation-context-authority-rejected",
            retiredCollectiveContext:
                "recognized-supplementation-context-kind-required",
            retiredAntecessiveContext:
                "recognized-supplementation-context-kind-required",
        }
    );

    prove(
        ["included", "reference", "wish"],
        "included reference enforces a third-singular head and semantic complement conditioning",
        (() => {
            const wishPrincipal = envelope(
                buildVnc("nequi", {
                    subject: "3sg",
                    valence: "specific-projective",
                    objectPerson: "3sg",
                }),
                {
                    referenceId: "wisher",
                    objectReferenceId: "proposition",
                    semanticGroup: "forged-display-value",
                }
            );
            const futureWish = envelope(
                buildVnc("yā", { subject: "1pl", tense: "future" }),
                {
                    referenceId: "proposition",
                    mood: "indicative",
                    tense: "future",
                    sentenceKind: "assertion",
                }
            );
            const included = buildSupplementation(
                wishPrincipal,
                futureWish,
                {
                    referenceMode: "included",
                    headRole: "object",
                    wishRealizability: "realizable",
                    adjunctor: "in",
                }
            );
            const badWish = buildSupplementation(
                wishPrincipal,
                envelope(buildVnc("yā", { subject: "1pl" }), {
                    referenceId: "proposition",
                    mood: "indicative",
                    tense: "present",
                    sentenceKind: "assertion",
                }),
                {
                    referenceMode: "included",
                    headRole: "object",
                    wishRealizability: "realizable",
                }
            );
            const pluralHead = envelope(
                buildVnc("miqui", { subject: "3pl" }),
                { referenceId: "proposition" }
            );
            return {
                included: [
                    included.authorizationStatus,
                    included.referenceFrame?.wholeSupplementIsReferent
                        || false,
                    included.surfaceRealization,
                ],
                badWish: badWish.blockReason,
                pluralHead: buildSupplementation(
                    pluralHead,
                    futureWish,
                    { referenceMode: "included", headRole: "subject" }
                ).blockReason,
            };
        })(),
        {
            included: ["authorized", true, "Quinequi in tiyāzqueh."],
            badWish: "wish-complement-mood-tense-condition-failed",
            pluralHead: "included-referent-head-must-be-third-person-singular",
        }
    );

    prove(
        ["speech", "complement"],
        "speech, perception, cognition, and affect complement policies keep their distinct gates",
        (() => {
            const semanticPrincipal = (stem, {
                headRole = "object",
            } = {}) => envelope(
                buildVnc(stem, {
                    subject: "3sg",
                    valence: headRole === "object"
                        ? "specific-projective"
                        : "intransitive",
                    objectPerson: headRole === "object" ? "3sg" : "",
                }),
                {
                    referenceId: headRole === "subject"
                        ? "proposition"
                        : "speaker",
                    objectReferenceId: "proposition",
                    semanticGroup: "forged-caller-group",
                }
            );
            const speechPrincipal = semanticPrincipal("ihtoa");
            const perceptionPrincipal = semanticPrincipal("itta");
            const cognitionPrincipal = semanticPrincipal("mati");
            const affectPrincipal = semanticPrincipal("pactia");
            const affectSubjectPrincipal = semanticPrincipal("pactia", {
                headRole: "subject",
            });
            const future = envelope(buildVnc("yā", {
                subject: "2pl",
                tense: "future",
                sentenceType: "command-sentence",
            }), {
                referenceId: "proposition",
            });
            const present = envelope(buildVnc("huītz", { subject: "3sg" }), {
                referenceId: "proposition",
                mood: "indicative",
                tense: "present",
                sentenceKind: "assertion",
            });
            const question = envelope(
                buildVnc("huītz", {
                    subject: "3sg",
                    sentenceType: "yes-no-question",
                }),
                {
                    referenceId: "proposition",
                    mood: "indicative",
                    tense: "present",
                    sentenceKind: "question",
                }
            );
            const buildIncluded = (
                principal,
                supplement,
                headRole = "object",
                extra = {}
            ) => (
                buildSupplementation(
                    principal,
                    supplement,
                    {
                        referenceMode: "included",
                        headRole,
                        ...extra,
                    }
                )
            );
            return {
                indirectCommand: buildIncluded(speechPrincipal, future, "object", {
                    speechDirectness: "indirect",
                }).authorizationStatus,
                directStatement: buildIncluded(speechPrincipal, present, "object", {
                    speechDirectness: "direct",
                }).authorizationStatus,
                hostileSpeechAct:
                    ctx.evaluateClassicalNahuatlSupplementationOperation({
                        operationKind: "relation",
                        principalClause: speechPrincipal,
                        supplementClause: present,
                        options: {
                            referenceMode: "included",
                            headRole: "object",
                            speechDirectness: "direct",
                            speechAct: "statement",
                        },
                    }).blockReason,
                missingSpeechChoice:
                    buildIncluded(speechPrincipal, present).blockReason,
                perceptionPresent:
                    buildIncluded(perceptionPrincipal, present).authorizationStatus,
                perceptionFuture:
                    buildIncluded(perceptionPrincipal, future).blockReason,
                cognitionQuestion:
                    buildIncluded(cognitionPrincipal, question).authorizationStatus,
                affectSubject:
                    buildIncluded(
                        affectSubjectPrincipal,
                        present,
                        "subject"
                    ).authorizationStatus,
                affectObjectBlocked:
                    buildIncluded(affectPrincipal, present, "object").blockReason,
            };
        })(),
        {
            indirectCommand: "authorized",
            directStatement: "authorized",
            hostileSpeechAct:
                "unrecognized-supplementation-operation-option:speechAct",
            missingSpeechChoice: "included-complement-policy-failed",
            perceptionPresent: "authorized",
            perceptionFuture: "perception-complement-normally-requires-present",
            cognitionQuestion: "authorized",
            affectSubject: "authorized",
            affectObjectBlocked: "affect-complement-requires-supplementary-subject",
        }
    );

    prove(
        ["complement"],
        "causing, requesting, and coreferential future consequences derive from canonical clause facts",
        (() => {
            const principalWithObject = (stem, subjectReferenceId = "speaker") => (
                envelope(
                    buildVnc(stem, {
                        subject: "1sg",
                        valence: "specific-projective",
                        objectPerson: "3sg",
                    }),
                    {
                        referenceId: subjectReferenceId,
                        subjectReferenceId,
                        objectReferenceId: "event",
                        semanticGroup: "forged-caller-group",
                    }
                )
            );
            const supplement = ({
                subjectReferenceId = "speaker",
                tense = "future",
                sentenceKind = "assertion",
            } = {}) => envelope(
                buildVnc("yā", { subject: "1sg", tense }),
                {
                    referenceId: "event",
                    subjectReferenceId,
                    sentenceKind,
                    mood: "forged",
                    tense: "forged",
                }
            );
            const included = (principal, child, extra = {}) => (
                buildSupplementation(
                    principal,
                    child,
                    {
                        referenceMode: "included",
                        headRole: "object",
                        ...extra,
                    }
                )
            );
            const frameOfKind = (result, kind) => result.operationFrames.find(
                frame => frame.kind === kind
            );
            const cognition = included(
                principalWithObject("mati"),
                supplement()
            );
            const noncoreferential = included(
                principalWithObject("mati"),
                supplement({ subjectReferenceId: "other" })
            );
            const nonfuture = included(
                principalWithObject("mati"),
                supplement({ tense: "present" })
            );
            const nequi = included(
                principalWithObject("nequi"),
                supplement(),
                { wishRealizability: "realizable" }
            );
            const causing = included(
                principalWithObject("chihua"),
                supplement({ sentenceKind: "command" })
            );
            const requesting = included(
                principalWithObject("ihtlani"),
                supplement({ sentenceKind: "wish" })
            );
            const unsupportedRequest = included(
                principalWithObject("ihtlani"),
                supplement({ sentenceKind: "exclamation" })
            );
            return {
                canonicalMoodTense: [
                    supplement().mood,
                    supplement().tense,
                    supplement().callerDerivedFacts.mood,
                    supplement().callerDerivedFacts.tense,
                    supplement().callerDerivedFactAuthority,
                ],
                cognition: [
                    cognition.authorizationStatus,
                    frameOfKind(
                        cognition,
                        "classical-nahuatl-supplementation-coreferential-future-frame"
                    )?.infinitiveReadingLicensed,
                ],
                noncoreferential: frameOfKind(
                    noncoreferential,
                    "classical-nahuatl-supplementation-coreferential-future-frame"
                )?.authorizationStatus,
                nonfuture: frameOfKind(
                    nonfuture,
                    "classical-nahuatl-supplementation-coreferential-future-frame"
                )?.authorizationStatus,
                nequiSeparateRoute: frameOfKind(
                    nequi,
                    "classical-nahuatl-supplementation-coreferential-future-frame"
                )?.nequiIncorporatedAlternativeIsSeparateDerivationalRoute,
                causing: causing.authorizationStatus,
                requesting: requesting.authorizationStatus,
                hostileCallerSentenceKind: [
                    unsupportedRequest.authorizationStatus,
                    unsupportedRequest.supplementClause.sentenceKind,
                    unsupportedRequest.supplementClause
                        .callerDerivedFacts.sentenceKind,
                    unsupportedRequest.supplementClause
                        .callerDerivedFactAuthority,
                ],
            };
        })(),
        {
            canonicalMoodTense: [
                "indicative",
                "future",
                "forged",
                "forged",
                false,
            ],
            cognition: ["authorized", true],
            noncoreferential: "blocked",
            nonfuture: "blocked",
            nequiSeparateRoute: true,
            causing: "authorized",
            requesting: "authorized",
            hostileCallerSentenceKind: [
                "authorized",
                "assertion",
                "exclamation",
                false,
            ],
        }
    );

    prove(
        ["scalar", "paradigm"],
        "scalar and full-paradigm paths call the same evaluator and preserve blocked coordinates",
        (() => {
            const recursivePrincipal = envelope(
                buildNnc("icnīuh", { subject: "1sg" }),
                { referenceId: "speaker" }
            );
            const recursiveContinuation =
                buildSupplementation(
                    recursivePrincipal,
                    supplement1,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                    }
                );
            const paradigm = ctx.buildClassicalNahuatlSupplementationParadigm([
                {
                    coordinateId: "principal-first",
                    principalClause: principal1,
                    supplementClause: supplement1,
                    options: { referenceMode: "shared", headRole: "subject" },
                },
                {
                    coordinateId: "topic",
                    principalClause: principal1,
                    supplementClause: supplement1,
                    options: {
                        referenceMode: "shared",
                        headRole: "subject",
                        order: "supplement-first",
                    },
                },
                {
                    coordinateId: "recursive",
                    principalClause: principal1,
                    supplementClause: recursivePrincipal,
                    options: {
                        referenceMode: "shared",
                        headRole: "subject",
                        supplementContinuationFrames: [
                            recursiveContinuation,
                        ],
                    },
                },
                {
                    coordinateId: "poisoned-reference",
                    principalClause: principal1,
                    supplementClause: mismatchSupplement,
                    options: { referenceMode: "shared", headRole: "subject" },
                },
            ]);
            return {
                status: paradigm.authorizationStatus,
                counts: [paradigm.coordinateCount, paradigm.authorizedCoordinateCount],
                scalarBuilder: paradigm.scalarBuilder,
                equivalence: paradigm.scalarParadigmEquivalence,
                rows: paradigm.rows.map((row) => [
                    row.coordinateId,
                    row.authorizationStatus,
                    row.formulaRealization,
                    row.surfaceRealization,
                    row.blockReason,
                ]),
            };
        })(),
        {
            status: "authorized",
            counts: [4, 3],
            scalarBuilder:
                "evaluateClassicalNahuatlSupplementationOperation",
            equivalence: true,
            rows: [
                ["principal-first", "authorized", "#ni-0(cuīca)0+0-0# + #ni-0(Petoloh)0-0#", "Nicuīca niPetoloh.", ""],
                ["topic", "authorized", "#ni-0(Petoloh)0-0# + #ni-0(cuīca)0+0-0#", "NiPetoloh nicuīca.", ""],
                [
                    "recursive",
                    "authorized",
                    "#ni-0(cuīca)0+0-0# + #n-0(icnīuh)0-0# + #ni-0(Petoloh)0-0#",
                    "Nicuīca nicnīuh niPetoloh.",
                    "",
                ],
                ["poisoned-reference", "blocked", "", "", "shared-referent-identity-mismatch"],
            ],
        }
    );

    prove(
        ["vocative"],
        "real vocative realization applies speaker, supportive-i, glottal, and plural conditions",
        (() => {
            const pilli = envelope(
                buildNnc("pil", { subject: "3sg", nounClass: "tli" }),
                { referenceId: "addressee" }
            );
            const teotl = envelope(
                buildNnc("tēteoh", { subject: "3sg", nounClass: "zero" }),
                { referenceId: "addressees" }
            );
            const plural = envelope(
                ctx.buildClassicalNahuatlAbsolutiveNncFrame("pil", {
                    subject: "3pl",
                    nounClass: "tli",
                    animacy: "animate",
                    pluralConnector: "t-in",
                }),
                { referenceId: "addressees" }
            );
            const vocative = (nncClause, options) => (
                ctx.evaluateClassicalNahuatlSupplementationOperation({
                    operationKind: "vocative",
                    nncClause,
                    options,
                })
            );
            const maleContext = discourseContext({
                speakerGender: "male",
            });
            const femaleContext = discourseContext({
                speakerGender: "female",
            });
            const unspecifiedContext = discourseContext();
            const silentPlural =
                vocative(plural, {
                    discourseSourceContextFrame: maleContext,
                    silentPluralIn: true,
                });
            const optativePrincipal = envelope(
                buildVnc("cāhua", {
                    subject: "2sg",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "A",
                }),
                { referenceId: "addressee" }
            );
            const secondPersonSubject = envelope(
                buildNnc("pil", { subject: "2sg", nounClass: "tli" }),
                { referenceId: "addressee" }
            );
            const soCalledVocative =
                ctx.evaluateClassicalNahuatlSupplementationOperation({
                    operationKind: "relation",
                    principalClause: optativePrincipal,
                    supplementClause: secondPersonSubject,
                    options: {
                        referenceMode: "shared",
                        headRole: "subject",
                    },
                });
            return {
                maleSupportive: (() => {
                    const frame = vocative(pilli, {
                        discourseSourceContextFrame: maleContext,
                    });
                    return [
                        frame.formulaRealization,
                        frame.surfaceRealization,
                        ctx.isClassicalNahuatlVocativeFrame(frame),
                        ctx.isClassicalNahuatlVocativeFrame({ ...frame }),
                    ];
                })(),
                maleGlottal: (() => {
                    const frame = vocative(teotl, {
                        discourseSourceContextFrame: maleContext,
                        glottalVariant: "y",
                    });
                    return [frame.formulaRealization, frame.surfaceRealization];
                })(),
                female: [
                    vocative(pilli, {
                        discourseSourceContextFrame: femaleContext,
                    }).formulaRealization,
                    vocative(pilli, {
                        discourseSourceContextFrame: femaleContext,
                    }).surfaceRealization,
                    vocative(pilli, {
                        discourseSourceContextFrame: femaleContext,
                    }).prosody,
                ],
                silentPlural: [
                    silentPlural.authorizationStatus,
                    silentPlural.formulaRealization,
                    silentPlural.surfaceRealization,
                    silentPlural.operations.includes(
                        "replace-plural-in-with-silent-variant"
                    ),
                ],
                soCalledVocative: [
                    optativePrincipal.mood,
                    soCalledVocative.authorizationStatus,
                    soCalledVocative.operationFrames.find(
                        frame => frame.kind
                          === "classical-nahuatl-supplementation-command-subject-frame"
                    )?.isRealVocative,
                ],
                secondPersonBlocked: vocative(
                    envelope(buildNnc("pil", { subject: "2sg", nounClass: "tli" }), {
                        referenceId: "addressee",
                    }),
                    { discourseSourceContextFrame: maleContext }
                ).blockReason,
                invalidGlottalBlocked: vocative(pilli, {
                    discourseSourceContextFrame: maleContext,
                    glottalVariant: "y",
                }).blockReason,
                rawSpeakerGenderBlocked: vocative(pilli, {
                    speakerGender: "male",
                }).blockReason,
                copiedContextBlocked: vocative(pilli, {
                    discourseSourceContextFrame: { ...maleContext },
                }).blockReason,
                unspecifiedSpeakerBlocked: [
                    ctx.isClassicalNahuatlDiscourseSourceContextFrame(
                        unspecifiedContext
                    ),
                    vocative(pilli, {
                        discourseSourceContextFrame: unspecifiedContext,
                    }).blockReason,
                ],
                invalidSourceCoordinates: [
                    discourseContext({
                        speakerGender: "documentary-answer",
                    }).blockReason,
                    discourseContext({
                        speakerGroupMembership: "stored-member",
                    }).blockReason,
                    discourseContext({
                        namedPartnerKnownParticipant: "lesson-example",
                    }).blockReason,
                ],
                ownerContext: [
                    ctx.isClassicalNahuatlDiscourseSourceContextFrame(
                        maleContext
                    ),
                    ctx.isClassicalNahuatlDiscourseSourceContextFrame({
                        ...maleContext,
                    }),
                    maleContext.grammarOperationAuthority,
                    maleContext.restoredStateAuthority,
                ],
            };
        })(),
        {
            maleSupportive: ["#0-0(pil)li-0#e", "Pille!", true, false],
            maleGlottal: ["#0-0(tēteoh)0-0#e", "Tēteoye!"],
            female: ["#0-0(pil)li-0#", "Pilli!", "final-syllable-high-tone-with-affected-stress"],
            silentPlural: ["authorized", "#0-0(pil)t-⎕#e", "Pilte!", true],
            soCalledVocative: ["optative", "authorized", false],
            secondPersonBlocked: "real-vocative-requires-typed-third-person-nnc",
            invalidGlottalBlocked: "vocative-glottal-y-variant-requires-final-glottal-stop",
            rawSpeakerGenderBlocked:
                "unrecognized-supplementation-operation-option:speakerGender",
            copiedContextBlocked:
                "vocative-owner-issued-discourse-source-context-required",
            unspecifiedSpeakerBlocked: [
                true,
                "vocative-speaker-gender-required",
            ],
            invalidSourceCoordinates: [
                "recognized-discourse-source-context-values-required",
                "recognized-discourse-source-context-values-required",
                "recognized-discourse-source-context-values-required",
            ],
            ownerContext: [true, false, false, false],
        }
    );

    prove(
        ["report", "deletion", "silent-head", "speech"],
        "quil rumored-report and principal deletion are typed exceptions with hostile blockers",
        (() => {
            const rumoredReport = (
                principalClause,
                supplementClause,
                options = {}
            ) => (
                ctx.evaluateClassicalNahuatlSupplementationOperation({
                    operationKind: "rumored-report",
                    principalClause,
                    supplementClause,
                    options,
                })
            );
            const deletedPrincipal = (
                visiblePrincipalClause,
                deletedPrincipalClause,
                supplementClause,
                options = {}
            ) => ctx.evaluateClassicalNahuatlSupplementationOperation({
                operationKind: "deleted-principal",
                visiblePrincipalClause,
                deletedPrincipalClause,
                supplementClause,
                options,
            });
            const reported = envelope(buildVnc("yā", { subject: "3pl", tense: "preterit" }), {
                referenceId: "reported-event",
                sentenceKind: "assertion",
            });
            const reporter = envelope(buildVnc("il", {
                sourceInitialISelection: "real",
                subject: "3sg",
                tense: "preterit",
                valence: "specific-projective",
                objectPerson: "3sg",
            }), {
                referenceId: "rumor-speaker",
                subjectReferenceId: "rumor-speaker",
                objectReferenceId: "reported-event",
            });
            const report = rumoredReport(reporter, reported, {
                mach: true,
                fuseQuilMach: true,
            });
            const answer = envelope(buildVnc("nānquilia", {
                subject: "1sg",
                valence: "specific-projective",
                objectPerson: "3pl",
            }), {
                referenceId: "speaker",
                subjectReferenceId: "speaker",
                objectReferenceId: "addressees",
            });
            const sayingMultiple = buildVnc("ilhuia", {
                sourceInitialISelection: "real",
                subject: "1sg",
                valence: "multiple-object",
                objectRequests: [{
                    objectId: "reported-supplement",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    governor: "directive",
                    derivationalLevel: 1,
                }, {
                    objectId: "addressees",
                    objectKind: "specific-projective",
                    objectPerson: "3pl",
                    governor: "applicative",
                    derivationalLevel: 2,
                }],
            });
            const saying = envelope(sayingMultiple, {
                referenceId: "speaker",
                subjectReferenceId: "speaker",
                objectReferenceIds: {
                    "reported-supplement": "reported-event",
                    addressees: "addressees",
                },
            });
            const deletedSupplementation =
                buildSupplementation(
                    saying,
                    reported,
                    {
                        referenceMode: "included",
                        headRole: "object",
                        principalObjectId: "reported-supplement",
                        speechDirectness: "direct",
                    }
                );
            const deleted = deletedPrincipal(
                answer,
                saying,
                reported,
                {
                    deletionKind: "saying",
                    deletedSupplementationFrame: deletedSupplementation,
                }
            );
            const deletedCah = envelope(
                buildVnc("ca-h", { subject: "3sg" }),
                { referenceId: "home" }
            );
            const home = envelope(
                buildNnc("chān", { subject: "3sg" }),
                { referenceId: "home" }
            );
            const placeClause = envelope(
                buildNnc("cāmpa", { subject: "3sg" }),
                { referenceId: "place" }
            );
            const placeModifier =
                ctx.buildClassicalNahuatlSupplementationAdverbialModifierFrame(
                    placeClause,
                    { adverbialRole: "place" }
                );
            const cahProxy = deletedPrincipal(
                placeModifier,
                deletedCah,
                home,
                { deletionKind: "cah-proxy" }
            );
            const indirectDeleted =
                deletedPrincipal(
                    answer,
                    saying,
                    reported,
                    {
                        deletionKind: "saying",
                        speechDirectness: "indirect",
                        deletedSupplementationFrame:
                            deletedSupplementation,
                    }
                );
            const adverbOnly =
                deletedPrincipal(
                    placeModifier,
                    saying,
                    reported,
                    {
                        deletionKind: "saying-adverb-only",
                        speechDirectness: "direct",
                        deletedSupplementationFrame:
                            deletedSupplementation,
                    }
                );
            return {
                report: [
                    report.authorizationStatus,
                    report.principalClause?.subject?.category || "",
                    report.principalClause?.tense || "",
                    report.formulaRealization,
                    report.surfaceRealization,
                    ctx.isClassicalNahuatlRumoredReportFrame(report),
                    ctx.isClassicalNahuatlRumoredReportFrame({ ...report }),
                ],
                reportWithoutTypedClause: rumoredReport(reporter, {
                    surface: "Canvas quotation",
                }).blockReason,
                reportWithoutTypedPrincipal: rumoredReport(
                    null,
                    reported
                ).blockReason,
                deleted: [
                    sayingMultiple.authorizationStatus,
                    saying.objects.map((object) => [
                        object.id,
                        object.sounded,
                        object.referenceId,
                    ]),
                    deletedSupplementation.authorizationStatus,
                    deletedSupplementation.referenceFrame.principalHead.id,
                    deletedSupplementation.referenceFrame.principalHead.silent,
                    deleted.authorizationStatus,
                    deleted.supplementHasNoDirectRelationToVisiblePrincipal,
                    deleted.deletedSupplementationCanonicalSignature
                        === deletedSupplementation.canonicalSignature,
                    deleted.formulaRealization,
                    deleted.surfaceRealization,
                    ctx.isClassicalNahuatlDeletedPrincipalFrame(deleted),
                    ctx.isClassicalNahuatlDeletedPrincipalFrame({ ...deleted }),
                ],
                wrongDeletedPrincipal: deletedPrincipal(
                    answer,
                    principal1,
                    reported,
                    {
                        deletionKind: "saying",
                        deletedSupplementationFrame:
                            deletedSupplementation,
                    }
                ).blockReason,
                missingSilentHead:
                    deletedPrincipal(
                        answer,
                        envelope(buildVnc("ilhuia", {
                            sourceInitialISelection: "real",
                            subject: "1sg",
                            valence: "specific-projective",
                            objectPerson: "3pl",
                        }), {
                            referenceId: "speaker",
                            subjectReferenceId: "speaker",
                            objectReferenceId: "addressees",
                        }),
                        reported,
                        {
                            deletionKind: "saying",
                            deletedSupplementationFrame:
                                deletedSupplementation,
                        }
                    ).blockReason,
                cahProxy: [
                    placeModifier.authorizationStatus,
                    cahProxy.authorizationStatus,
                    cahProxy.proxyPrincipalCreated,
                    cahProxy.deletedNodeCanonicalSignature
                        === deletedCah.canonicalSignature,
                    cahProxy.formulaRealization,
                    cahProxy.surfaceRealization,
                ],
                rawAdverbBlocked:
                    deletedPrincipal(
                        null,
                        deletedCah,
                        home,
                        {
                            deletionKind: "cah-proxy",
                            visibleAdverbSurface: "cāmpa",
                        }
                    ).blockReason,
                speechSurvivors: [
                    deleted.speechDirectness,
                    indirectDeleted.authorizationStatus,
                    indirectDeleted.speechDirectness,
                ],
                adverbOnly: [
                    adverbOnly.authorizationStatus,
                    adverbOnly.adverbOnlyPrincipal,
                    adverbOnly.supplementHasNoDirectRelationToVisiblePrincipal,
                    adverbOnly.adverbialNncRelationFrame?.relation,
                ],
                invalidDirectness:
                    deletedPrincipal(
                        answer,
                        saying,
                        reported,
                        {
                            deletionKind: "saying",
                            speechDirectness: "display-label",
                            deletedSupplementationFrame:
                                deletedSupplementation,
                        }
                    ).blockReason,
            };
        })(),
        {
            report: [
                "authorized",
                "3sg",
                "preterit",
                "#0-0+qu-0(il)0+⎕-0# + mach + in + #0-0(yah)0+qu-eh#",
                "Quilmach in yahqueh.",
                true,
                false,
            ],
            reportWithoutTypedClause: "rumored-report-requires-typed-included-supplement",
            reportWithoutTypedPrincipal:
                "rumored-report-requires-captured-owner-issued-quil-principal",
            deleted: [
                "authorized",
                [
                    ["addressees", true, "addressees"],
                    ["reported-supplement", false, "reported-event"],
                ],
                "authorized",
                "reported-supplement",
                true,
                "authorized",
                true,
                true,
                "#ni-0+qu-in(nānquilia)0+0-0# + #0-0(yah)0+qu-eh#",
                "Niquinnānquilia yahqueh.",
                true,
                false,
            ],
            wrongDeletedPrincipal: "deleted-saying-principal-conditions-not-met",
            missingSilentHead: "deleted-saying-principal-conditions-not-met",
            cahProxy: [
                "authorized",
                "authorized",
                true,
                true,
                "#0-0(cāmpa)0-0# + #0-0(chān)0-0#",
                "Cāmpa chān.",
            ],
            rawAdverbBlocked:
                "unrecognized-supplementation-operation-option:visibleAdverbSurface",
            speechSurvivors: ["direct", "authorized", "indirect"],
            adverbOnly: [
                "authorized",
                true,
                true,
                "deleted-principal-speech-head",
            ],
            invalidDirectness: "deleted-saying-principal-conditions-not-met",
        }
    );

    prove(
        [
            "have",
            "ambiguity",
            "short-pronoun",
            "silent-head",
            "evidence",
            "pronominal-plural",
        ],
        "have, contact ambiguity, short pronouns, ayi silent objects, and pronominal plurals execute as typed operation frames",
        (() => {
            const caPrincipal = envelope(
                buildVnc("ca-h", {
                    subject: "3sg",
                    directionalPrefix: "on",
                }),
                {
                    referenceId: "owner",
                }
            );
            const possessedHouseFrame =
                ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                    subject: "3sg",
                    possessor: "1sg",
                    singularConnector: "0",
                    nounstemRelationKind: "nonrelational",
                    animacy: "nonanimate",
                });
            const possessedHouse = envelope(possessedHouseFrame, {
                referenceId: "owner",
                subjectReferenceId: "owner",
                possessorReferenceId: "speaker",
                sourceStem: "cal",
            });
            const have = buildSupplementation(
                caPrincipal,
                possessedHouse,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                }
            );
            const unlocatedCah = buildSupplementation(
                envelope(
                    buildVnc("ca-h", { subject: "3sg" }),
                    { referenceId: "owner" }
                ),
                possessedHouse,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                }
            );

            const ambiguousPrincipal = envelope(
                buildVnc("itta", {
                    sourceInitialISelection: "real",
                    subject: "3sg",
                    valence: "specific-projective",
                    objectPerson: "3sg",
                }),
                {
                    referenceId: "third",
                    subjectReferenceId: "third",
                    objectReferenceId: "third",
                    sourceStem: "itta",
                }
            );
            const thirdSupplement = envelope(
                buildNnc("Petoloh", { subject: "3sg" }),
                { referenceId: "third" }
            );
            const ambiguity = buildSupplementation(
                ambiguousPrincipal,
                thirdSupplement,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                    retainContactAlternatives: true,
                }
            );
            const noAmbiguity = buildSupplementation(
                principal1,
                supplement1,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                    retainContactAlternatives: true,
                }
            );

            const shortFrame =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "personal-simple",
                    subject: "1sg",
                });
            const shortClause = envelope(shortFrame, {
                referenceId: "speaker",
            });
            const shortSupplement = buildSupplementation(
                principal1,
                shortClause,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                }
            );
            const shortStandalone = buildSupplementation(
                principal1,
                shortClause,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                    supplementActsAsStandaloneUtterance: true,
                }
            );

            const ayiClause = envelope(
                buildVnc("āyi", {
                    subject: "3sg",
                    tense: "preterit",
                    verbClass: "B",
                    valence: "specific-projective",
                    objectPerson: "3sg",
                    silentSpecificObject: true,
                }),
                {
                    referenceId: "agent",
                    subjectReferenceId: "agent",
                    objectReferenceId: "patient",
                    sourceStem: "āyi",
                    silentObjectKind: "ayi-specific-object",
                    tense: "preterit",
                }
            );
            const ayiResult = buildSupplementation(
                ayiClause,
                envelope(buildNnc("tlācatl", { subject: "3sg" }), {
                    referenceId: "agent",
                }),
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                }
            );
            const forgedSilent = envelope(
                buildVnc("itta", {
                    sourceInitialISelection: "real",
                    subject: "3sg",
                    valence: "specific-projective",
                    objectPerson: "3sg",
                }),
                {
                    referenceId: "agent",
                    sourceStem: "itta",
                    silentObjectKind: "ayi-specific-object",
                }
            );
            const ichtequiContrast = envelope(
                buildVnc("ichtequi", {
                    sourceInitialISelection: "real",
                    subject: "1sg",
                    valence: "specific-projective",
                    objectPerson: "3sg",
                }),
                {
                    referenceId: "thief",
                    subjectReferenceId: "thief",
                    objectReferenceId: "stolen-item",
                    silentObjectKind: "ayi-specific-object",
                }
            );

            const demonstrativeFrame =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "demonstrative",
                    demonstrative: "īn",
                    subject: "3pl",
                });
            const demonstrativeClause = envelope(
                demonstrativeFrame,
                {
                    referenceId: "group",
                }
            );
            const demonstrativeCooperation =
                ctx.buildClassicalNahuatlPronominalPluralCooperationFrame(
                    buildVncSubjectSource("i-ā", {
                        subject: "3pl",
                        sourceInitialISelection: "real",
                    }),
                    demonstrativeClause
                );
            const rawLesson5PrincipalBlocked =
                ctx.buildClassicalNahuatlPronominalPluralCooperationFrame(
                    {
                        kind: "retired-lesson-named-vnc-subject-carrier",
                        authorizationStatus: "authorized",
                        sourceStem: "i-ā",
                        subject: "3pl",
                    },
                    demonstrativeClause
                );
            const zeroRootPrincipal = envelope(
                buildVnc("i-ā", {
                    sourceInitialISelection: "real",
                    subject: "3pl",
                    verbClass: "C",
                    construction: "pronominal-nnc",
                }),
                { referenceId: "group" }
            );
            const demonstrativePlural =
                buildSupplementation(
                    zeroRootPrincipal,
                    demonstrativeClause,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                        supplementContactRole: "subject",
                    }
                );
            const forgedZeroRootPrincipal = envelope(
                buildVnc("i", {
                    subject: "3pl",
                    tense: "preterit",
                    sourceInitialISelection: "real",
                }),
                {
                    referenceId: "group",
                    sourceStem: "0-i-h",
                }
            );
            const ordinaryPluralBlocked =
                buildSupplementation(
                    forgedZeroRootPrincipal,
                    demonstrativeClause,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                        supplementContactRole: "subject",
                    }
                );
            const obsoleteRouteBlocked =
                buildSupplementation(
                    zeroRootPrincipal,
                    demonstrativeClause,
                    {
                        referenceMode: "shared",
                        headRole: "subject",
                        supplementContactRole: "subject",
                        pronominalPluralRoute: "demonstrative",
                    }
                );
            const frameOfKind = (result, kind) => result.operationFrames.find(
                frame => frame.kind === kind
            );
            return {
                have: [
                    have.authorizationStatus,
                    frameOfKind(
                        have,
                        "classical-nahuatl-supplementation-have-frame"
                    )?.createsHaveVerb,
                ],
                ordinaryCaNoHave: !frameOfKind(
                    sharedSubject,
                    "classical-nahuatl-supplementation-have-frame"
                ),
                unlocatedCahNoHave: !frameOfKind(
                    unlocatedCah,
                    "classical-nahuatl-supplementation-have-frame"
                ),
                ambiguity: [
                    ambiguity.authorizationStatus,
                    frameOfKind(
                        ambiguity,
                        "classical-nahuatl-supplementation-contact-alternatives-frame"
                    )?.alternatives.map((alternative) => alternative.headRole),
                ],
                ambiguityBlocked: noAmbiguity.blockReason,
                short: [
                    shortSupplement.authorizationStatus,
                    frameOfKind(
                        shortSupplement,
                        "classical-nahuatl-short-pronominal-boundary-frame"
                    )?.completeClauseStatusPreserved,
                ],
                shortStandalone: shortStandalone.blockReason,
                ayi: [
                    ayiClause.authorizationStatus,
                    ayiClause.objects.some((object) => (
                        object.silent === true
                        && object.realization === "0-0"
                    )),
                    frameOfKind(
                        ayiResult,
                        "classical-nahuatl-ayi-silent-object-frame"
                    )?.perfectiveStem,
                ],
                forgedSilent: forgedSilent.blockReason,
                ichtequiContrast: ichtequiContrast.blockReason,
                demonstrativePlural: [
                    demonstrativePlural.authorizationStatus,
                    demonstrativeCooperation.authorizationStatus,
                    zeroRootPrincipal.sourceStem,
                    frameOfKind(
                        demonstrativePlural,
                        "classical-nahuatl-supplementation-pronominal-plural-frame"
                    )?.zeroRootPrincipal,
                ],
                ordinaryPluralBlocked: ordinaryPluralBlocked.blockReason,
                obsoleteRouteBlocked: obsoleteRouteBlocked.blockReason,
                rawLesson5PrincipalBlocked: [
                    rawLesson5PrincipalBlocked.authorizationStatus,
                    rawLesson5PrincipalBlocked.blockReason,
                    ctx.isClassicalNahuatlPronominalPluralCooperationFrame(
                        rawLesson5PrincipalBlocked
                    ),
                ],
                hostileAyi: ctx.isClassicalNahuatlSupplementationClauseEnvelope({
                    ...ayiClause,
                    silentSpecificObjectAuthorized: false,
                }),
            };
        })(),
        {
            have: ["authorized", false],
            ordinaryCaNoHave: true,
            unlocatedCahNoHave: true,
            ambiguity: ["authorized", ["subject", "object"]],
            ambiguityBlocked:
                "contact-ambiguity-requires-two-typed-third-person-head-candidates",
            short: ["authorized", true],
            shortStandalone:
                "short-personal-pronominal-nnc-cannot-stand-alone",
            ayi: ["authorized", true, "āx"],
            forgedSilent: "ayi-silent-object-requires-typed-ayi-vnc",
            ichtequiContrast: "ayi-silent-object-requires-typed-ayi-vnc",
            demonstrativePlural: [
                "authorized",
                "authorized",
                "i-ā",
                true,
            ],
            ordinaryPluralBlocked: "",
            obsoleteRouteBlocked:
                "unrecognized-supplementation-operation-option:"
                + "pronominalPluralRoute",
            rawLesson5PrincipalBlocked: [
                "blocked",
                "pronominal-plural-cooperation-conditions-not-met",
                false,
            ],
            hostileAyi: false,
        }
    );

    prove(
        ["pronominal-plural"],
        "āc mismatch and Lesson 19 compound plurals cooperate with the canonical zero-root generator",
        (() => {
            const zeroRoot = (cooperationFrame, subject) => (
                ctx.buildClassicalNahuatlVerbstemClassFrame("(i-ā)", {
                    subject,
                    mood: "indicative",
                    tense: "present",
                    valence: "intransitive",
                    pronominalNncCooperationFrame: cooperationFrame,
                })
            );
            const whoFrame =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "interrogative",
                    interrogativeKind: "āc",
                    subject: "3sg",
                });
            const acSupplement = envelope(
                whoFrame,
                { referenceId: "group" }
            );
            const acCooperation =
                ctx.buildClassicalNahuatlPronominalPluralCooperationFrame(
                    buildVncSubjectSource("i-ā", {
                        subject: "1pl",
                        sourceInitialISelection: "real",
                    }),
                    acSupplement
                );
            const acPrincipal = envelope(
                buildVnc("i-ā", {
                    sourceInitialISelection: "real",
                    subject: "1pl",
                    verbClass: "C",
                    construction: "pronominal-nnc",
                }),
                { referenceId: "group" }
            );
            const acResult = buildSupplementation(
                acPrincipal,
                acSupplement,
                {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                }
            );
            const compoundCases = [
                ["amaquihqueh-compound", "2pl", "ā-qu-0-i-h"],
                ["tleh-compound", "1pl", "tl-e-0-i-h"],
                ["catleh-compound", "3pl", "cā-tl-e-0-i-h"],
                ["catl-zero-root-compound", "2sg", "cā-tl-0-i-h"],
            ].map(([route, subject, expectedStem]) => {
                const cooperation =
                    ctx.buildClassicalNahuatlPronominalPluralCooperationFrame(
                        buildVncSubjectSource(expectedStem, { subject }),
                        null
                    );
                const generated = zeroRoot(cooperation, subject);
                return [
                    route,
                    cooperation.authorizationStatus,
                    generated.authorizationStatus,
                    generated.selectedOutputLogicFrame?.outputFillers
                        ?.lesson11SelectedStem
                        || generated.sourceVerbstem
                        || generated.stem
                        || "",
                    expectedStem,
                ];
            });
            const forgedCompound =
                ctx.buildClassicalNahuatlPronominalPluralCooperationFrame(
                    buildVncSubjectSource(
                        "ā-qu-0-i-h",
                        { subject: "3pl" }
                    ),
                    null
                );
            const negativeAcSources = [
                "1pl",
                "2pl",
                "3pl",
                "1sg",
            ].map(subject => envelope(
                buildVnc("ā", { subject, negative: true }),
                { referenceId: `negative-${subject}` }
            ));
            const negativeAcParadigm =
                ctx.buildClassicalNahuatlNegativeAcPluralParadigm(
                    negativeAcSources
                );
            const negativeAcPlural = negativeAcParadigm.rows.map((row) => {
                const generated = row.frame;
                return [
                    row.subject,
                    generated.authorizationStatus,
                    generated.morphologicalTense,
                    generated.contextualInterpretation,
                    generated.vncFormula,
                    generated.formulaRealization,
                    generated.surfaceRealization,
                ];
            });
            return {
                ac: [
                    acCooperation.authorizationStatus,
                    acPrincipal.sourceStem,
                    acResult.authorizationStatus,
                    acResult.referenceFrame?.agreementException?.kind || "",
                ],
                compounds: compoundCases,
                wrongAmaSubject: forgedCompound.blockReason,
                negativeAcParadigm: [
                    negativeAcParadigm.authorizationStatus,
                    negativeAcParadigm.scalarBuilder,
                    negativeAcParadigm.coordinateCount,
                    negativeAcParadigm.authorizedCoordinateCount,
                ],
                negativeAcPlural,
                hostileNegativeAc:
                    ctx.isClassicalNahuatlNegativeAcPluralFrame({
                        ...ctx.buildClassicalNahuatlNegativeAcPluralFrame(
                            negativeAcSources[2]
                        ),
                        vncWord: "Canvas-answer",
                    }),
                hostileCompound:
                    ctx.isClassicalNahuatlPronominalPluralCooperationFrame({
                        ...ctx.buildClassicalNahuatlPronominalPluralCooperationFrame(
                            buildVncSubjectSource(
                                "tl-e-0-i-h",
                                { subject: "1pl" }
                            ),
                            null
                        ),
                        formulaStemMember: "display-string",
                    }),
            };
        })(),
        {
            ac: [
                "authorized",
                "i-ā",
                "authorized",
                "ac-pronominal-plural",
            ],
            compounds: [
                [
                    "amaquihqueh-compound",
                    "authorized",
                    "authorized",
                    "ā-qu-0-i-h",
                    "ā-qu-0-i-h",
                ],
                [
                    "tleh-compound",
                    "authorized",
                    "authorized",
                    "tl-e-0-i-h",
                    "tl-e-0-i-h",
                ],
                [
                    "catleh-compound",
                    "authorized",
                    "authorized",
                    "cā-tl-e-0-i-h",
                    "cā-tl-e-0-i-h",
                ],
                [
                    "catl-zero-root-compound",
                    "authorized",
                    "authorized",
                    "cā-tl-0-i-h",
                    "cā-tl-0-i-h",
                ],
            ],
            wrongAmaSubject:
                "pronominal-plural-cooperation-conditions-not-met",
            negativeAcParadigm: [
                "authorized",
                "evaluateClassicalNahuatlSupplementationOperation",
                4,
                3,
            ],
            negativeAcPlural: [
                [
                    "1pl",
                    "authorized",
                    "preterit",
                    "be-absent",
                    "#t-0(ā)0+qu-eh#",
                    "ah#t-0(ā)0+qu-eh#",
                    "Ahtāqueh.",
                ],
                [
                    "2pl",
                    "authorized",
                    "preterit",
                    "be-absent",
                    "#am-0(ā)0+qu-eh#",
                    "ah#am-0(ā)0+qu-eh#",
                    "Ahamāqueh.",
                ],
                [
                    "3pl",
                    "authorized",
                    "preterit",
                    "be-absent",
                    "#0-0(ā)0+qu-eh#",
                    "ah#0-0(ā)0+qu-eh#",
                    "Ahāqueh.",
                ],
                [
                    "1sg",
                    "blocked",
                    "preterit",
                    "be-absent",
                    "",
                    "",
                    "",
                ],
            ],
            hostileNegativeAc: false,
            hostileCompound: false,
        }
    );

    prove(
        ["scalar", "paradigm", "gcd"],
        "one typed operation evaluator owns scalar and mixed full-paradigm generation",
        (() => {
            const vocativeClause = envelope(
                buildNnc("pil", { subject: "3sg", nounClass: "tli" }),
                { referenceId: "addressee" }
            );
            const reportedClause = envelope(
                buildVnc("yā", { subject: "3pl", tense: "preterit" }),
                { referenceId: "reported-event" }
            );
            const reportPrincipalClause = envelope(
                buildVnc("il", {
                    sourceInitialISelection: "real",
                    subject: "3sg",
                    tense: "preterit",
                    valence: "specific-projective",
                    objectPerson: "3sg",
                }),
                {
                    referenceId: "rumor-speaker",
                    subjectReferenceId: "rumor-speaker",
                    objectReferenceId: "reported-event",
                }
            );
            const deletedCah = envelope(
                buildVnc("ca-h", { subject: "3sg" }),
                { referenceId: "home" }
            );
            const home = envelope(
                buildNnc("chān", { subject: "3sg" }),
                { referenceId: "home" }
            );
            const placeClause = envelope(
                buildNnc("cāmpa", { subject: "3sg" }),
                { referenceId: "place" }
            );
            const placeModifier =
                ctx.buildClassicalNahuatlSupplementationAdverbialModifierFrame(
                    placeClause,
                    { adverbialRole: "place" }
                );
            const negativeAcClause = envelope(
                buildVnc("ā", { subject: "3pl", negative: true }),
                { referenceId: "negative-ac-group" }
            );
            const requests = [{
                coordinateId: "relation",
                operationKind: "relation",
                principalClause: principal1,
                supplementClause: supplement1,
                options: {
                    referenceMode: "shared",
                    headRole: "subject",
                    supplementContactRole: "subject",
                },
            }, {
                coordinateId: "vocative",
                operationKind: "vocative",
                nncClause: vocativeClause,
                options: {
                    discourseSourceContextFrame: discourseContext({
                        speakerGender: "male",
                    }),
                },
            }, {
                coordinateId: "report",
                operationKind: "rumored-report",
                principalClause: reportPrincipalClause,
                supplementClause: reportedClause,
                options: { mach: true },
            }, {
                coordinateId: "deletion",
                operationKind: "deleted-principal",
                visiblePrincipalClause: placeModifier,
                deletedPrincipalClause: deletedCah,
                supplementClause: home,
                options: { deletionKind: "cah-proxy" },
            }, {
                coordinateId: "negative-ac",
                operationKind: "negative-ac-plural",
                principalClause: negativeAcClause,
            }, {
                coordinateId: "hostile",
                operationKind: "canvas-answer",
                surface: "stored result",
            }];
            const paradigm =
                ctx.evaluateClassicalNahuatlSupplementationOperationParadigm(
                    requests
                );
            return {
                status: paradigm.authorizationStatus,
                scalarBuilder: paradigm.scalarBuilder,
                counts: [
                    paradigm.coordinateCount,
                    paradigm.authorizedCoordinateCount,
                ],
                rows: paradigm.rows.map((row) => [
                    row.coordinateId,
                    row.operationKind,
                    row.authorizationStatus,
                    row.formulaRealization,
                    row.surfaceRealization,
                    row.blockReason,
                ]),
                scalarEquivalence: paradigm.rows.every((row, index) => (
                    JSON.stringify(row.frame)
                    === JSON.stringify(
                        ctx.evaluateClassicalNahuatlSupplementationOperation(
                            requests[index]
                        )
                    )
                )),
            };
        })(),
        {
            status: "authorized",
            scalarBuilder:
                "evaluateClassicalNahuatlSupplementationOperation",
            counts: [6, 5],
            rows: [
                [
                    "relation",
                    "relation",
                    "authorized",
                    "#ni-0(cuīca)0+0-0# + #ni-0(Petoloh)0-0#",
                    "Nicuīca niPetoloh.",
                    "",
                ],
                [
                    "vocative",
                    "vocative",
                    "authorized",
                    "#0-0(pil)li-0#e",
                    "Pille!",
                    "",
                ],
                [
                    "report",
                    "rumored-report",
                    "authorized",
                    "#0-0+qu-0(il)0+⎕-0# + mach + in + #0-0(yah)0+qu-eh#",
                    "Quil mach in yahqueh.",
                    "",
                ],
                [
                    "deletion",
                    "deleted-principal",
                    "authorized",
                    "#0-0(cāmpa)0-0# + #0-0(chān)0-0#",
                    "Cāmpa chān.",
                    "",
                ],
                [
                    "negative-ac",
                    "negative-ac-plural",
                    "authorized",
                    "ah#0-0(ā)0+qu-eh#",
                    "Ahāqueh.",
                    "",
                ],
                [
                    "hostile",
                    "canvas-answer",
                    "blocked",
                    "",
                    "",
                    "unknown-supplementation-operation-kind",
                ],
            ],
            scalarEquivalence: true,
        }
    );

    s.eq(
        "every source claim and every LCM axis is bound to a passing executable proof family and canonical runtime path",
        (() => {
            const failures = [];
            const claims =
                ctx.__TEST_LESSONS17_19_SOURCE_CLAIMS || [];
            const contract =
                ctx.__TEST_LESSONS17_19_GRAMMAR_CONTRACT || {};
            const axisProofFamilies =
                ctx.__TEST_LESSONS17_19_LCM_AXIS_PROOF_FAMILIES
                || {};
            const proofKinds = [
                "positive",
                "negative",
                "interaction",
                "hostile",
                "scalar",
                "paradigm",
            ];
            for (const claim of claims) {
                if (proofFamilyStatus[claim.executableProofFamily] !== true) {
                    failures.push(
                        `${claim.id}: executable proof family did not pass`
                    );
                }
                for (const path of claim.canonicalObjectIds || []) {
                    if (typeof ctx[path] !== "function") {
                        failures.push(
                            `${claim.id}: canonical runtime path ${path} is unavailable`
                        );
                    }
                }
                for (const proofKind of proofKinds) {
                    if (
                        claim.proofIds?.[proofKind]
                        !== `supplementation:${claim.id}:${proofKind}`
                    ) {
                        failures.push(
                            `${claim.id}: ${proofKind} proof identity is not claim-specific`
                        );
                    }
                }
                if (
                    proofFamilyStatus.scalar !== true
                    || proofFamilyStatus.paradigm !== true
                ) {
                    failures.push(
                        `${claim.id}: scalar/paradigm equivalence proof did not pass`
                    );
                }
            }
            for (const axis of contract.leastCommonMultiple?.axes || []) {
                const families = axisProofFamilies[axis] || [];
                if (!families.length) {
                    failures.push(`${axis}: no executable proof family`);
                    continue;
                }
                if (
                    !families.some(
                        family => proofFamilyStatus[family] === true
                    )
                ) {
                    failures.push(
                        `${axis}: mapped executable proof family did not pass`
                    );
                }
            }
            if (
                Object.keys(axisProofFamilies).length
                !== contract.leastCommonMultiple?.axes?.length
            ) {
                failures.push(
                    "LCM axis proof map does not exactly cover the licensed axes"
                );
            }
            return failures;
        })(),
        []
    );

    return s;
}

module.exports = { run };
