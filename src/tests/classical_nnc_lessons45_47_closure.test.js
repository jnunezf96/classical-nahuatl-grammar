"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_nnc_lessons45_47_closure");
    const nounstemRequestKind = ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND
        || "classical-nahuatl-nnc-nounstem-request";
    const asOneNounstemRequest = (input = {}) => {
        if (input.nounstem) {
            return input;
        }
        const {
            stemId,
            option,
            constructionKind,
            sourceKind,
            formationId,
            sourceVoice,
            sourceStem,
            embeddedStem,
            relationalSourceStem,
            sourceMode: requestedSourceMode,
            sourceEmbedStem: requestedSourceEmbedStem,
            sourceMatrixStem: requestedSourceMatrixStem,
            targetMatrixStem,
            affective,
            sourceLexemeId,
            lexicalExceptionId,
            lexicalClass,
            relationalFunction,
            sourceEndsInCoOrC,
            pertinencySourceKind,
            nounConnector,
            upstreamResult,
            ...nncRequest
        } = input;
        const relationalStem = (ctx.getClassicalNahuatlRelationalStemInventory?.() || [])
            .find((entry) => entry.stemId === stemId);
        const relationalNnc = !constructionKind || constructionKind === "relational-nnc";
        const sourceMode = requestedSourceMode || (relationalNnc
            ? option === "option-one" ? "whole-stem" : "embed-matrix"
            : "");
        const sourceEmbedStem = requestedSourceEmbedStem || (relationalNnc && option !== "option-one"
            ? relationalSourceStem || embeddedStem || ""
            : "");
        const sourceMatrixStem = requestedSourceMatrixStem || (relationalNnc
            ? relationalStem?.stemId === "co-c-specific-location"
                ? sourceLexemeId === "tle-fire" || !/[aeiouāēīō]$/u.test(sourceEmbedStem) ? "co" : "c"
                : relationalStem?.classicalMatrix || ""
            : "");
        return {
            ...nncRequest,
            nounstem: {
                kind: nounstemRequestKind,
                stemId,
                formation: option,
                operation: constructionKind,
                sourceKind,
                sourceFormation: formationId,
                sourceVoice,
                sourceMode,
                sourceStem: option === "option-one"
                    ? sourceMatrixStem
                    : sourceStem || relationalSourceStem || embeddedStem || "",
                sourceEmbedStem,
                sourceMatrixStem,
                downstreamTargetStem: targetMatrixStem,
                affective,
                sourceLexemeId,
                lexicalExceptionId,
                lexicalClass,
                relationalFunction,
                sourceEndsInCoOrC,
                pertinencySourceKind,
                nounConnector,
                upstreamResult,
            },
        };
    };
    const evaluate = (request = {}) =>
        ctx["evaluateClassicalNahuatlRelationalNnc"](asOneNounstemRequest(request));
    const buildOwnerIssuedSourceResult = (
        formationId,
        sourceKind = "",
        sourceStem = "",
    ) => {
        if (["preterit-agentive", "active-action"].includes(formationId)) {
            return ctx.requestClassicalDeverbalNncResult({
                constructionKind: "predicate-nominalization",
                nominalizationKind: formationId,
                source: {
                    sourceStage: formationId === "preterit-agentive"
                        ? "preterit-predicate"
                        : "distant-past-predicate",
                    sourceStem: sourceStem || (
                        formationId === "preterit-agentive"
                            ? "mich-namaca"
                            : "cochi"
                    ),
                    verbClass: formationId === "preterit-agentive" ? "A" : "B",
                    sourceVoice: "active",
                    sourceValence: "intransitive",
                    sourceObjectPattern: "none",
                    sourceSubject: "3sg",
                },
                subject: "3sg",
                state: "absolutive",
            });
        }
        const incorporated = sourceKind.includes("incorporated-adverb");
        const requestByFormation = {
            "imperfect-active": {
                sourceStem: incorporated ? "nōhui-cochi" : "cochi",
                verbClass: "B",
                sourceValence: "intransitive",
                tense: "imperfect",
                requestedVoice: "active",
                ...(incorporated ? { incorporatedAdverb: "nōhui" } : {}),
            },
            "imperfect-passive": {
                sourceStem: "pōhua",
                verbClass: "A",
                sourceValence: "specific-projective",
                objectPerson: "3sg",
                tense: "imperfect",
                requestedVoice: "passive",
            },
            "imperfect-impersonal": {
                sourceStem: "cochi",
                verbClass: "B",
                sourceValence: "intransitive",
                tense: "imperfect",
                requestedVoice: "impersonal",
                nonactiveOptionId: "inherent-impersonal",
            },
            "present-yohua": {
                sourceStem: "yohua",
                verbClass: "A",
                sourceValence: "intransitive",
                tense: "present",
                requestedVoice: "active",
            },
            "perfective-active": {
                sourceStem: incorporated ? "ahco-nemi" : "cati",
                verbClass: "B",
                sourceValence: "intransitive",
                tense: "preterit",
                requestedVoice: "active",
                ...(incorporated ? { incorporatedAdverb: "ahco" } : {}),
            },
            "perfective-impersonal-tla": {
                sourceStem: "nēci",
                verbClass: "B",
                sourceValence: "intransitive",
                tense: "preterit",
                requestedVoice: "impersonal",
                nonactiveOptionId: "tla-impersonal",
            },
        };
        const request = requestByFormation[formationId];
        return request
            ? ctx.requestClassicalVncApplicationResult({
                ...request,
                sourceStem: sourceStem || request.sourceStem,
                subject: "3sg",
                mood: "indicative",
            })
            : null;
    };

    const inventory = ctx.getClassicalNahuatlRelationalStemInventory();
    const lcmAxisIds = ctx.CLASSICAL_NAHUATL_LESSONS45_47_LCM.axes.map((axis) => axis.axisId);

    s.eq(
        "Lessons 45-47 install one typed GCD, the complete 55-axis LCM, and 22 relational stem families",
        {
            api: [
                typeof ctx.evaluateClassicalNahuatlRelationalNnc,
                typeof ctx.buildClassicalNahuatlPreparedPlan,
                typeof ctx.isClassicalNahuatlPreparedPlan,
                typeof ctx.projectClassicalNahuatlPreparedCoordinate,
                typeof ctx.isClassicalNahuatlRelationalNncGrammarFrame,
            ],
            gcd: ctx.CLASSICAL_NAHUATL_LESSONS45_47_GCD,
            lcmSourceCategory: ctx.CLASSICAL_NAHUATL_LESSONS45_47_LCM.sourceCategory,
            lcmDerivedLexicalClasses: ctx.CLASSICAL_NAHUATL_LESSONS45_47_LCM.derivedLexicalClasses,
            lcmNounstemCount: ctx.CLASSICAL_NAHUATL_LESSONS45_47_LCM.nounstemIds.length,
            axisCount: lcmAxisIds.length,
            uniqueAxisCount: new Set(lcmAxisIds).size,
            stemCount: inventory.length,
            uniqueStemCount: new Set(inventory.map((stem) => stem.stemId)).size,
            optionGroups: [...new Set(inventory.map((stem) => stem.optionGroup))].sort(),
        },
        {
            api: ["function", "function", "function", "function", "function"],
            gcd: {
                identityId: "typed-nounstem+derived-lexical-class+licensed-formation+participant-state-mapping+boundary-realization+nnc-result",
                stageOrder: [
                    "validate-one-nounstem",
                    "derive-nounstem-lexical-class",
                    "select-licensed-formation",
                    "map-state-and-participants",
                    "realize-relational-boundaries",
                    "compose-nnc-result",
                ],
                typedSourceRequired: true,
                typedOperationRequired: true,
                canonicalResultRequired: true,
                formulaStringAuthority: false,
                surfaceStringAuthority: false,
                lessonMetadataAuthority: false,
            },
            lcmSourceCategory: "nounstem",
            lcmDerivedLexicalClasses: ["relational"],
            lcmNounstemCount: 22,
            axisCount: 55,
            uniqueAxisCount: 55,
            stemCount: 22,
            uniqueStemCount: 22,
            optionGroups: [
                "option-one-only",
                "option-two-only",
                "options-one-three",
                "options-one-two",
                "options-one-two-three",
            ],
        }
    );

    s.eq(
        "one typed nounstem request derives relational class, rejects caller class authority, and closes split legacy paths",
        (() => {
            const unified = evaluate({
                stemId: "tlan-bottom",
                option: "option-two",
                sourceKind: "nounstem",
                embeddedStem: "cal",
                lexicalClass: "ordinary",
                state: "absolutive",
            });
            const split = ctx["evaluateClassicalNahuatlRelationalNnc"]({
                stemId: "tlan-bottom",
                option: "option-two",
                sourceKind: "nounstem",
                embeddedStem: "cal",
                state: "absolutive",
            });
            const oldPredicateRequest = ctx["evaluateClassicalNahuatlRelationalNnc"]({
                predicateStem: {
                    kind: "classical-nahuatl-relational-nnc-predicate-request",
                    stemId: "tlan-bottom",
                    formation: "option-two",
                    operation: "relational-nnc",
                    sourceKind: "nounstem",
                    sourceStem: "cal",
                },
                state: "absolutive",
            });
            return {
                unified: {
                    status: unified.authorizationStatus,
                    predicate: unified.predicateStemFrame?.predicateStem,
                    oneNncPredicate: unified.predicateStemFrame?.oneNncPredicate,
                    sourceCategory: unified.predicateStemFrame?.sourceCategory,
                    lexicalClass: unified.predicateStemFrame?.lexicalClass,
                    lcmSourceCategory: unified.leastCommonMultiple?.sourceCategory,
                    lcmDerivedLexicalClass: unified.leastCommonMultiple?.derivedLexicalClass,
                    sourceFrameKind: unified.sourceFrame?.predicateStemFrame?.kind,
                    internalAnalysis: unified.predicateStemFrame?.internalAnalysis,
                },
                split: {
                    status: split.authorizationStatus,
                    diagnostics: split.diagnostics,
                },
                oldPredicateRequest: {
                    status: oldPredicateRequest.authorizationStatus,
                    diagnostics: oldPredicateRequest.diagnostics,
                },
            };
        })(),
        {
            unified: {
                status: "authorized",
                predicate: "callan",
                oneNncPredicate: true,
                sourceCategory: "nounstem",
                lexicalClass: "relational",
                lcmSourceCategory: "nounstem",
                lcmDerivedLexicalClass: "relational",
                sourceFrameKind: "classical-nahuatl-relational-nnc-predicate-source-frame",
                internalAnalysis: {
                    embed: "cal",
                    matrix: "tlan",
                    connective: "",
                },
            },
            split: {
                status: "blocked",
                diagnostics: ["nounstem-request-required"],
            },
            oldPredicateRequest: {
                status: "blocked",
                diagnostics: ["nounstem-request-required"],
            },
        }
    );

    const requestFor = (stem, option) => {
        if (option === "option-one") {
            return {
                stemId: stem.stemId,
                option,
                sourceKind: "possessor",
                state: "possessive",
                possessorId: stem.stemId === "c-means-purpose-reason-time" ? "3common" : "1sg",
            };
        }
        if (option === "option-four") {
            return {
                stemId: stem.stemId,
                option,
                constructionKind: "compound-embed",
                sourceKind: stem.allowedSourceKinds[0],
                targetMatrixStem: "cal",
            };
        }
        const sourceKind = stem.allowedSourceKinds.find((kind) =>
            !["possessor", "interrogative-empty"].includes(kind)
        ) || stem.allowedSourceKinds[0];
        const request = {
            stemId: stem.stemId,
            option,
            sourceKind,
            embeddedStem: stem.stemId === "nal-far-bank" ? "ā" : "cal",
            state: "absolutive",
        };
        if (stem.stemId === "n-locative") {
            request.formationId = "plain-nounstem";
        }
        if (stem.stemId === "yan-locative") {
            request.formationId = "perfective-active";
            request.sourceKind = "perfective-core";
            request.embeddedStem = "";
            request.upstreamResult = buildOwnerIssuedSourceResult(
                request.formationId,
                request.sourceKind,
            );
        }
        if (stem.stemId === "pa-frequency") {
            request.sourceKind = "numeral";
            request.embeddedStem = "ōm";
        }
        if (stem.stemId === "nal-far-bank") {
            request.sourceKind = "water-stem";
        }
        if (stem.stemId === "ic-downward-direction") {
            request.sourceKind = "body-part-stem";
        }
        if (stem.stemId === "chi-direction-toward") {
            request.sourceKind = "ground-stem";
        }
        return request;
    };

    s.eq(
        "every stem family executes every licensed usage option including universal option four",
        inventory.flatMap((stem) => stem.allowedOptions.map((option) => {
            const result = evaluate(requestFor(stem, option));
            return {
                stemId: stem.stemId,
                option,
                status: result.authorizationStatus,
                surface: Boolean(result.surface),
                gcd: result.greatestCommonDivisor?.satisfied === true,
                lcm: result.leastCommonMultiple?.licensedAxisSetComplete === true,
                sourceStructure: option === "option-four"
                    ? true
                    : result.sourceFrame?.predicateStemFrame?.sourceMode
                        === (option === "option-one" ? "whole-stem" : "embed-matrix")
                      && result.sourceFrame?.predicateStemFrame?.sourceMatrixStem
                        === (stem.stemId === "co-c-specific-location"
                            ? /[aeiouāēīō]$/u.test(result.sourceFrame?.predicateStemFrame?.sourceEmbedStem || "") ? "c" : "co"
                            : stem.classicalMatrix)
                      && (option === "option-one"
                          || Boolean(result.sourceFrame?.predicateStemFrame?.sourceEmbedStem)),
                formulaForm: result.leastCommonMultiple?.formulaForm === result.formula
                    && result.formula.includes(`(${result.formulaPredicateStem})`),
                writtenForm: result.greatestCommonDivisor?.writtenForm === result.surface
                    && result.writtenPredicateStem === result.predicateStem,
            };
        })),
        inventory.flatMap((stem) => stem.allowedOptions.map((option) => ({
            stemId: stem.stemId,
            option,
            status: "authorized",
            surface: true,
            gcd: true,
            lcm: true,
            sourceStructure: true,
            formulaForm: true,
            writtenForm: true,
        })))
    );

    const requestForSourceKind = (stem, sourceKind) => {
        const option = stem.allowedOptions.find((candidate) =>
            !["option-one", "option-four"].includes(candidate)
        );
        const request = {
            stemId: stem.stemId,
            option,
            sourceKind,
            embeddedStem: stem.stemId === "nal-far-bank" ? "ā" : "cal",
            state: "absolutive",
        };
        if (stem.stemId === "n-locative") {
            const formationBySourceKind = {
                "nounstem": "plain-nounstem",
                "preterit-agentive-general-use": "preterit-agentive",
                "active-action": "active-action",
                "interrogative-empty": "can-interrogative",
                "interrogative-modifier": "can-modified",
                "imperfect-predicate": "imperfect-active",
                "incorporated-adverb-imperfect-predicate": "imperfect-active",
            };
            request.formationId = formationBySourceKind[sourceKind];
            request.embeddedStem = sourceKind === "interrogative-empty"
                ? ""
                : sourceKind === "interrogative-modifier"
                    ? "huel"
                    : sourceKind.includes("imperfect")
                        ? "cochiyā"
                        : "cal";
            if ([
                "preterit-agentive",
                "active-action",
                "imperfect-active",
            ].includes(request.formationId)) {
                request.upstreamResult = buildOwnerIssuedSourceResult(
                    request.formationId,
                    sourceKind,
                );
                request.embeddedStem = "";
            }
        }
        if (stem.stemId === "yan-locative") {
            request.formationId = sourceKind === "impersonal-tla-perfective-core"
                ? "perfective-impersonal-tla"
                : "perfective-active";
            request.embeddedStem = "";
            request.upstreamResult = buildOwnerIssuedSourceResult(
                request.formationId,
                sourceKind,
            );
        }
        if (stem.stemId === "pa-frequency") {
            request.embeddedStem = "ōm";
        }
        if (["active-action", "imperfect-predicate", "perfective-core"].includes(sourceKind)) {
            request.possessorId = "1sg";
        }
        return request;
    };

    s.eq(
        "every declared nonpossessor source kind executes through its licensed option and source formation",
        inventory.flatMap((stem) => stem.allowedSourceKinds
            .filter((sourceKind) => sourceKind !== "possessor")
            .map((sourceKind) => {
                const result = evaluate(
                    requestForSourceKind(stem, sourceKind)
                );
                return [stem.stemId, sourceKind, result.authorizationStatus, Boolean(result.surface)];
            })),
        inventory.flatMap((stem) => stem.allowedSourceKinds
            .filter((sourceKind) => sourceKind !== "possessor")
            .map((sourceKind) => [stem.stemId, sourceKind, "authorized", true]))
    );

    s.eq(
        "all 22 relational families productively realize both affective formations with final co",
        inventory.flatMap((stem) => ["honorific", "pejorative"].map((affective) => {
            const option = stem.allowedOptions.find((candidate) => candidate !== "option-four");
            const result = evaluate({
                ...requestFor(stem, option),
                affective,
            });
            return {
                stemId: stem.stemId,
                affective,
                status: result.authorizationStatus,
                finalCo: /co$/u.test(result.predicateStem || ""),
                trace: result.operationFrame?.operationTrace?.slice(-2),
            };
        })),
        inventory.flatMap((stem) => ["honorific", "pejorative"].map((affective) => ({
            stemId: stem.stemId,
            affective,
            status: "authorized",
            finalCo: true,
            trace: ["embed-relational-stem-in-affective", "validate-adverbiality-with-final-co"],
        })))
    );

    s.eq(
        "conditioned boundaries are productive and preserve selected formulas through Classical written surfaces",
        [
            {
                id: "n-supportive-i",
                request: {
                    stemId: "n-locative",
                    option: "option-two",
                    sourceKind: "nounstem",
                    formationId: "plain-nounstem",
                    embeddedStem: "cec",
                },
            },
            {
                id: "n-after-vowel",
                request: {
                    stemId: "n-locative",
                    option: "option-two",
                    formationId: "preterit-agentive",
                    upstreamResult: buildOwnerIssuedSourceResult(
                        "preterit-agentive",
                        "",
                        "mich-namaca",
                    ),
                },
            },
            {
                id: "co-after-consonant",
                request: {
                    stemId: "co-c-specific-location",
                    option: "option-two",
                    sourceKind: "nounstem",
                    embeddedStem: "cal",
                },
            },
            {
                id: "c-after-vowel",
                request: {
                    stemId: "co-c-specific-location",
                    option: "option-two",
                    sourceKind: "nounstem",
                    embeddedStem: "tecoma",
                },
            },
            {
                id: "fire-co-exception",
                request: {
                    stemId: "co-c-specific-location",
                    option: "option-two",
                    sourceKind: "nounstem",
                    embeddedStem: "tle",
                    sourceLexemeId: "tle-fire",
                },
            },
            {
                id: "linked-t",
                request: {
                    stemId: "tech-contact",
                    option: "option-three",
                    sourceKind: "nounstem",
                    embeddedStem: "cal",
                },
            },
            {
                id: "frequency-m-p",
                request: {
                    stemId: "pa-frequency",
                    option: "option-two",
                    sourceKind: "numeral",
                    embeddedStem: "ōm",
                },
            },
            {
                id: "affective-final-co",
                request: {
                    stemId: "co-c-specific-location",
                    option: "option-two",
                    sourceKind: "nounstem",
                    embeddedStem: "teohcal",
                    affective: "honorific",
                },
            },
        ].map(({ id, request }) => {
            const result = evaluate(request);
            return {
                id,
                predicate: result.predicateStem,
                formula: result.formula,
                surface: result.surface,
                trace: result.operationFrame?.operationTrace,
            };
        }),
        [
            {
                id: "n-supportive-i",
                predicate: "cecni",
                formula: "#Ø-Ø(cec-ni)Ø-Ø#",
                surface: "cecni",
                trace: ["retain-typed-embedded-source", "retain-licensed-source-stem", "insert-supportive-i-before-locative-n"],
            },
            {
                id: "n-after-vowel",
                predicate: "michnamacacān",
                formula: "#Ø-Ø(mich-namaca-0-cā-n)Ø-Ø#",
                surface: "michnamacacān",
                trace: ["retain-typed-embedded-source", "retain-licensed-source-stem", "attach-locative-n"],
            },
            {
                id: "co-after-consonant",
                predicate: "calco",
                formula: "#Ø-Ø(cal-co)Ø-Ø#",
                surface: "calco",
                trace: ["retain-typed-embedded-source", "select-co-after-consonant-or-fire"],
            },
            {
                id: "c-after-vowel",
                predicate: "tecomac",
                formula: "#Ø-Ø(tecoma-c)Ø-Ø#",
                surface: "tecomac",
                trace: ["retain-typed-embedded-source", "select-c-after-vowel"],
            },
            {
                id: "fire-co-exception",
                predicate: "tleco",
                formula: "#Ø-Ø(tle-co)Ø-Ø#",
                surface: "tleco",
                trace: ["retain-typed-embedded-source", "select-co-after-consonant-or-fire"],
            },
            {
                id: "linked-t",
                predicate: "caltitech",
                formula: "#Ø-Ø(cal-ti-tech)Ø-Ø#",
                surface: "caltitech",
                trace: ["retain-typed-embedded-source", "insert-connective-t-with-supportive-i", "attach-linked-relational-matrix"],
            },
            {
                id: "frequency-m-p",
                predicate: "ōppa",
                formula: "#Ø-Ø(ōm-pa)Ø-Ø#",
                surface: "ōppa",
                trace: ["retain-typed-embedded-source", "attach-frequency-pa", "realize-frequency-assimilation"],
            },
            {
                id: "affective-final-co",
                predicate: "teohcaltzinco",
                formula: "#Ø-Ø(teohcal-tzin-co)Ø-Ø#",
                surface: "teohcaltzinco",
                trace: ["retain-typed-embedded-source", "select-co-after-consonant-or-fire", "embed-relational-stem-in-affective", "validate-adverbiality-with-final-co"],
            },
        ]
    );

    s.eq(
        "source voice and formation determine the Lesson 46 locative state without caller fallback",
        [
            ["imperfect-active", "active", "possessive", "1sg"],
            ["imperfect-passive", "passive", "possessive", "3pl"],
            ["imperfect-impersonal", "impersonal", "absolutive", ""],
            ["present-yohua", "active", "absolutive", ""],
        ].map(([formationId, sourceVoice, state, possessorId]) => {
            const result = evaluate({
                stemId: "n-locative",
                option: "option-two",
                sourceKind: "imperfect-predicate",
                formationId,
                sourceVoice,
                upstreamResult: buildOwnerIssuedSourceResult(
                    formationId,
                    "imperfect-predicate",
                ),
                state: state === "possessive" ? "absolutive" : "possessive",
                possessorId,
            });
            return {
                formationId,
                status: result.authorizationStatus,
                state: result.sourceState,
                possessor: result.formulaSlots?.possessor || "",
            };
        }),
        [
            { formationId: "imperfect-active", status: "authorized", state: "possessive", possessor: "no" },
            { formationId: "imperfect-passive", status: "authorized", state: "possessive", possessor: "īn" },
            { formationId: "imperfect-impersonal", status: "authorized", state: "absolutive", possessor: "" },
            { formationId: "present-yohua", status: "authorized", state: "absolutive", possessor: "" },
        ]
    );

    const tlaCaquiImperfectImpersonal =
        ctx.requestClassicalVncApplicationResult({
            sourceStem: "caqui",
            verbClass: "B",
            sourceValence: "projective-nonhuman",
            subject: "3sg",
            mood: "indicative",
            tense: "imperfect",
            requestedDerivation: "direct",
            requestedVoice: "impersonal",
            nonactiveOptionId: "ō:cac-ō",
        });
    const tlaCaquiLocative = evaluate({
        stemId: "n-locative",
        option: "option-two",
        formationId: "imperfect-impersonal",
        upstreamResult: tlaCaquiImperfectImpersonal,
        state: "possessive",
    });
    s.eq(
        "an exact tla-bearing impersonal imperfect Result retains its whole predicate before locative n",
        {
            upstream: [
                tlaCaquiImperfectImpersonal.authorizationStatus,
                tlaCaquiImperfectImpersonal.resultFrame
                    ?.formulaRealization,
                tlaCaquiImperfectImpersonal.resultFrame
                    ?.surfaceRealization,
            ],
            result: [
                tlaCaquiLocative.authorizationStatus,
                tlaCaquiLocative.sourceState,
                tlaCaquiLocative.operationFrame
                    ?.sourceFrame?.predicateStemFrame?.sourceEmbedStem,
                tlaCaquiLocative.operationFrame
                    ?.sourceFrame?.predicateStemFrame?.sourceMatrixStem,
                tlaCaquiLocative.formula,
                tlaCaquiLocative.surface,
                tlaCaquiLocative.sentenceSurface,
                tlaCaquiLocative.sentenceFormulaDisplay,
                tlaCaquiLocative.diagrammaticProjection?.rows.map(
                    row => row.role
                ),
            ],
        },
        {
            upstream: [
                "authorized",
                "#0-0+tla(cac-ō)ya+0-0#",
                "tlacacōya",
            ],
            result: [
                "authorized",
                "absolutive",
                "tla-cac-ō-ya",
                "n",
                "#Ø-Ø(tla-cac-ō-ya-n)Ø-Ø#",
                "tlacacōyan",
                "Tlacacōyan.",
                "#Ø-Ø(tla-cac-ō-ya-n)Ø-Ø#.",
                ["Subject", "Predicate", "embed", "matrix"],
            ],
        }
    );

    s.eq(
        "all ic functions and temporal interrogative/fusion conditions remain typed context facts rather than translation authority",
        {
            functions: ["means", "purpose", "reason", "time", "ordinal", "adverbial", "degree", "measurement"]
                .map((relationalFunction) => {
                    const result = evaluate({
                        stemId: "c-means-purpose-reason-time",
                        option: "option-one",
                        sourceKind: "possessor",
                        possessorId: "3common",
                        relationalFunction,
                        translationLabel: "forged translation",
                    });
                    return [relationalFunction, result.authorizationStatus, result.formula, result.surface];
                }),
            contexts: [
                { sentencePosition: "initial", negative: false, adjunctorIn: false, dependentClausePresent: false },
                { sentencePosition: "noninitial", negative: false, adjunctorIn: false, dependentClausePresent: false },
                { sentencePosition: "initial", negative: true, adjunctorIn: false, dependentClausePresent: false },
                { sentencePosition: "initial", negative: false, adjunctorIn: true, dependentClausePresent: false },
                { sentencePosition: "initial", negative: false, adjunctorIn: true, dependentClausePresent: true },
            ].map((context) => {
                const result = evaluate({
                    stemId: "c-means-purpose-reason-time",
                    option: "option-one",
                    sourceKind: "possessor",
                    possessorId: "3common",
                    relationalFunction: "time",
                    ...context,
                });
                return [
                    context.sentencePosition,
                    context.negative,
                    context.adjunctorIn,
                    context.dependentClausePresent,
                    result.contextualFacts?.interrogativeForce,
                    result.contextualFacts?.fusedAdjunctorSurfaceAllowed,
                ];
            }),
        },
        {
            functions: ["means", "purpose", "reason", "time", "ordinal", "adverbial", "degree", "measurement"]
                .map((relationalFunction) => [relationalFunction, "authorized", "#Ø-Ø+ī-Ø(c)Ø-Ø#", "īc"]),
            contexts: [
                ["initial", false, false, false, true, false],
                ["noninitial", false, false, false, false, false],
                ["initial", true, false, false, false, false],
                ["initial", false, true, false, true, true],
                ["initial", false, true, true, true, false],
            ],
        }
    );

    s.eq(
        "associated-entity and both pertinency routes consume typed relational sources and keep the outer NNC distinct",
        [
            {
                constructionKind: "associated-entity",
                relationalSourceStem: "cuauhtlah",
                sourceEndsInCoOrC: false,
                expectedOperation: "relational-associated-entity-ca",
            },
            {
                constructionKind: "associated-entity",
                relationalSourceStem: "cuauhtēnco",
                sourceEndsInCoOrC: true,
                expectedOperation: "relational-associated-entity-ca",
            },
            {
                constructionKind: "pertinency",
                pertinencySourceKind: "direct-relational",
                relationalSourceStem: "huehcapan",
                expectedOperation: "relational-pertinency-direct",
            },
            {
                constructionKind: "pertinency",
                pertinencySourceKind: "associated-entity",
                relationalSourceStem: "cuauhtlahca",
                expectedOperation: "relational-pertinency-from-associated-entity",
            },
        ].map((request) => {
            const upstreamResult =
                request.pertinencySourceKind === "associated-entity"
                    ? evaluate({
                        stemId: "pan-surface-time",
                        constructionKind: "associated-entity",
                        relationalSourceStem: "cuauhtlah",
                        subjectMode: "normal",
                        nounConnector: "tl",
                    })
                    : null;
            const result = evaluate({
                stemId: "pan-surface-time",
                subjectMode: "normal",
                nounConnector: "tl",
                ...request,
                ...(upstreamResult
                    ? {
                        relationalSourceStem: "",
                        upstreamResult,
                    }
                    : {}),
            });
            return {
                constructionKind: request.constructionKind,
                source: request.relationalSourceStem,
                operationId: result.operationFrame?.operationId,
                predicate: result.predicateStem,
                surface: result.surface,
                associatedEntityIsGentilic: result.contextualFacts?.associatedEntityIsGentilic,
                embeddedPossessorControlsOuterState: result.contextualFacts?.embeddedPossessorControlsOuterState,
            };
        }),
        [
            {
                constructionKind: "associated-entity",
                source: "cuauhtlah",
                operationId: "relational-associated-entity-ca",
                predicate: "cuauhtlahca",
                surface: "cuauhtlahcatl",
                associatedEntityIsGentilic: false,
                embeddedPossessorControlsOuterState: false,
            },
            {
                constructionKind: "associated-entity",
                source: "cuauhtēnco",
                operationId: "relational-associated-entity-ca",
                predicate: "cuauhtēnca",
                surface: "cuauhtēncatl",
                associatedEntityIsGentilic: false,
                embeddedPossessorControlsOuterState: false,
            },
            {
                constructionKind: "pertinency",
                source: "huehcapan",
                operationId: "relational-pertinency-direct",
                predicate: "huehcapanyō",
                surface: "huehcapanyōtl",
                associatedEntityIsGentilic: false,
                embeddedPossessorControlsOuterState: false,
            },
            {
                constructionKind: "pertinency",
                source: "cuauhtlahca",
                operationId: "relational-pertinency-from-associated-entity",
                predicate: "cuauhtlahcayō",
                surface: "cuauhtlahcayōtl",
                associatedEntityIsGentilic: false,
                embeddedPossessorControlsOuterState: false,
            },
        ]
    );

    s.eq(
        "option-four and option-three boundaries are selected from the matrix edge rather than copied from display strings",
        [
            {
                stemId: "huan-company",
                option: "option-four",
                constructionKind: "compound-embed",
                targetMatrixStem: "poh",
            },
            {
                stemId: "tloc-proximity",
                option: "option-four",
                constructionKind: "compound-embed",
                targetMatrixStem: "eh",
            },
            {
                stemId: "icpac-top",
                option: "option-three",
                sourceKind: "nounstem",
                embeddedStem: "tlāl",
                state: "absolutive",
            },
        ].map((request) => {
            const result = evaluate(request);
            return {
                predicate: result.predicateStem,
                formula: result.formula,
                trace: result.operationFrame?.operationTrace,
            };
        }),
        [
            {
                predicate: "huāmpoh",
                formula: "#Ø-Ø(huān-poh)Ø-Ø#",
                trace: ["retain-relational-source", "place-relational-stem-in-embed", "realize-n-before-p-as-m", "attach-selected-target-matrix"],
            },
            {
                predicate: "tloqueh",
                formula: "#Ø-Ø(tloc-eh)Ø-Ø#",
                trace: ["retain-relational-source", "place-relational-stem-in-embed", "realize-c-before-front-vowel-as-qu", "attach-selected-target-matrix"],
            },
            {
                predicate: "tlālticpac",
                formula: "#Ø-Ø(tlāl-t-icpa-c)Ø-Ø#",
                trace: ["retain-typed-embedded-source", "insert-connective-t", "attach-linked-relational-matrix"],
            },
        ]
    );

    s.eq(
        "contextual written spellings and frequency assimilation cannot rewrite LCM formula carriers or boundaries",
        (() => {
            const requests = [
                {
                    stemId: "huan-company",
                    option: "option-four",
                    constructionKind: "compound-embed",
                    targetMatrixStem: "poh",
                },
                {
                    stemId: "tloc-proximity",
                    option: "option-four",
                    constructionKind: "compound-embed",
                    targetMatrixStem: "eh",
                },
                {
                    stemId: "pa-frequency",
                    option: "option-two",
                    sourceKind: "numeral",
                    embeddedStem: "ōm",
                },
            ];
            const results = requests.map((request) => evaluate(request));
            const typedHostileRequest = asOneNounstemRequest(requests[0]);
            const hostile = ctx.evaluateClassicalNahuatlRelationalNnc({
                ...typedHostileRequest,
                formula: "#FORGED#",
                surface: "forged",
                predicateSegments: [{ formulaCarrier: "FORGED", writtenCarrier: "forged" }],
                formulaProjection: { result: "#FORGED#" },
                writtenProjection: { result: "forged" },
                nounstem: {
                    ...typedHostileRequest.nounstem,
                    formulaPredicate: "FORGED",
                    writtenPredicate: "forged",
                    predicateSegments: [{ formulaCarrier: "FORGED", writtenCarrier: "forged" }],
                },
            });
            return {
                projections: results.map((result) => ({
                    formula: result.formula,
                    written: result.surface,
                    formulaCarriers: result.formulaProjection.predicateProjection.segmentCarriers,
                    writtenCarriers: result.writtenProjection.predicateProjection.segmentCarriers,
                    formulaDerivedFromWritten: result.formulaDerivedFromWritten,
                    writtenDerivedFromFormula: result.writtenDerivedFromFormula,
                })),
                exactNegatives: [
                    results[0].formula.includes("huām-poh"),
                    results[1].formula.includes("tloqu-eh"),
                    results[2].formula.includes("ō-ppa"),
                ],
                hostile: {
                    formula: hostile.formula,
                    written: hostile.surface,
                    formulaCarriers: hostile.formulaProjection.predicateProjection.segmentCarriers,
                    writtenCarriers: hostile.writtenProjection.predicateProjection.segmentCarriers,
                    callerSuppliedAuthorityAccepted: hostile.callerSuppliedAuthorityAccepted,
                },
            };
        })(),
        {
            projections: [
                {
                    formula: "#Ø-Ø(huān-poh)Ø-Ø#",
                    written: "huāmpoh",
                    formulaCarriers: ["huān", "poh"],
                    writtenCarriers: ["huām", "poh"],
                    formulaDerivedFromWritten: false,
                    writtenDerivedFromFormula: false,
                },
                {
                    formula: "#Ø-Ø(tloc-eh)Ø-Ø#",
                    written: "tloqueh",
                    formulaCarriers: ["tloc", "eh"],
                    writtenCarriers: ["tloqu", "eh"],
                    formulaDerivedFromWritten: false,
                    writtenDerivedFromFormula: false,
                },
                {
                    formula: "#Ø-Ø(ōm-pa)Ø-Ø#",
                    written: "ōppa",
                    formulaCarriers: ["ōm", "pa"],
                    writtenCarriers: ["ō", "ppa"],
                    formulaDerivedFromWritten: false,
                    writtenDerivedFromFormula: false,
                },
            ],
            exactNegatives: [false, false, false],
            hostile: {
                formula: "#Ø-Ø(huān-poh)Ø-Ø#",
                written: "huāmpoh",
                formulaCarriers: ["huān", "poh"],
                writtenCarriers: ["huām", "poh"],
                callerSuppliedAuthorityAccepted: false,
            },
        }
    );

    s.eq(
        "incorporated-adverb and impersonal source kinds derive exceptional absolutive State while ordinary perfective and imperfect sources derive possessive State",
        [
            ["n-locative", "imperfect-predicate", "imperfect-active", "cochiyā"],
            ["n-locative", "incorporated-adverb-imperfect-predicate", "imperfect-active", "nōhuiyā"],
            ["yan-locative", "perfective-core", "perfective-active", "cati"],
            ["yan-locative", "incorporated-adverb-perfective-core", "perfective-active", "nēmiuh"],
            ["yan-locative", "impersonal-tla-perfective-core", "perfective-impersonal-tla", "tlacel"],
        ].map(([stemId, sourceKind, formationId, embeddedStem]) => {
            const result = evaluate({
                stemId,
                option: "option-two",
                sourceKind,
                formationId,
                upstreamResult: buildOwnerIssuedSourceResult(
                    formationId,
                    sourceKind,
                ),
                state: sourceKind.includes("incorporated") || sourceKind.includes("impersonal") ? "possessive" : "absolutive",
                possessorId: "1sg",
            });
            return [sourceKind, result.authorizationStatus, result.sourceState, result.formulaSlots?.possessor || ""];
        }),
        [
            ["imperfect-predicate", "authorized", "possessive", "no"],
            ["incorporated-adverb-imperfect-predicate", "authorized", "absolutive", ""],
            ["perfective-core", "authorized", "possessive", "no"],
            ["incorporated-adverb-perfective-core", "authorized", "absolutive", ""],
            ["impersonal-tla-perfective-core", "authorized", "absolutive", ""],
        ]
    );

    s.eq(
        "associated-entity final co or c replacement and relational affective availability are engine-derived",
        {
            replacement: (() => {
                const result = evaluate({
                    stemId: "pan-surface-time",
                    constructionKind: "associated-entity",
                    relationalSourceStem: "cuauhtēnco",
                    sourceEndsInCoOrC: false,
                });
                return [result.predicateStem, result.operationFrame?.operationTrace];
            })(),
            nonAffectiveStemIds: inventory.filter((stem) => stem.affective !== true).map((stem) => stem.stemId),
        },
        {
            replacement: [
                "cuauhtēnca",
                ["consume-compound-relational-source", "replace-final-co-or-c-with-silent-variant", "attach-associated-entity-ca"],
            ],
            nonAffectiveStemIds: [],
        }
    );

    const sourceAdmissionSpecs = [
        ["tlah-abundance-place", "xoch", "varietal-nounstem", "", "tlah"],
        ["co-c-specific-location", "tecoma", "nounstem", "", "c"],
        ["co-c-specific-location", "tle", "nounstem", "tle-fire", "co"],
        ["co-c-specific-location", "mōztlayō", "temporal-yo-stem", "", "c"],
        ["co-c-specific-location", "mā", "body-part-stem", "", "c"],
        ["pa-direction", "nē", "particle", "", "pa"],
        ["pa-frequency", "miec", "quantitive", "", "pa"],
        ["chi-direction-toward", "ātēn", "rare-nounstem", "", "chi"],
    ];
    const admissions = sourceAdmissionSpecs.map(([
        stemId,
        sourceEmbedStem,
    ]) => ctx.issueClassicalNahuatlRelationalSourceAdmissionFrame({
        stemId,
        sourceEmbedStem,
    }));
    const ambiguous = ctx.issueClassicalNahuatlRelationalSourceAdmissionFrame({
        stemId: "co-c-specific-location",
        sourceEmbedStem: "izta",
    });
    const selectedAmbiguous =
        ctx.issueClassicalNahuatlRelationalSourceAdmissionFrame({
            stemId: "co-c-specific-location",
            sourceEmbedStem: "izta",
            requestedSourceKind: "temporal-yo-stem",
        });
    const conflicting =
        ctx.issueClassicalNahuatlRelationalSourceAdmissionFrame({
            stemId: "tlah-abundance-place",
            sourceEmbedStem: "xoch",
            requestedSourceKind: "nounstem",
        });
    s.eq("the owner types specialized relational embeds and leaves only real ambiguity open", {
        known: admissions.map(frame => ({
            valid: ctx.isClassicalNahuatlRelationalSourceAdmissionFrame(frame),
            status: frame.authorizationStatus,
            sourceKind: frame.selectedSourceKind,
            lexeme: frame.sourceLexemeId,
            matrix: frame.sourceMatrixStem,
            choice: frame.selectionRequired,
        })),
        ambiguous: {
            valid: ctx.isClassicalNahuatlRelationalSourceAdmissionFrame(ambiguous),
            status: ambiguous.authorizationStatus,
            selected: ambiguous.selectedSourceKind,
            choice: ambiguous.selectionRequired,
            matrix: ambiguous.sourceMatrixStem,
            kinds: ambiguous.allowedSourceKinds,
        },
        selectedAmbiguous: [
            selectedAmbiguous.authorizationStatus,
            selectedAmbiguous.selectedSourceKind,
            selectedAmbiguous.selectionRequired,
            selectedAmbiguous.sourceMatrixStem,
        ],
        conflicting: [
            conflicting.authorizationStatus,
            conflicting.diagnostics,
        ],
        copyValid: ctx.isClassicalNahuatlRelationalSourceAdmissionFrame({
            ...admissions[0],
        }),
    }, {
        known: sourceAdmissionSpecs.map(([, , sourceKind, lexeme, matrix]) => ({
            valid: true,
            status: "authorized",
            sourceKind,
            lexeme,
            matrix,
            choice: false,
        })),
        ambiguous: {
            valid: true,
            status: "authorized",
            selected: "",
            choice: true,
            matrix: "c",
            kinds: [
                "nounstem",
                "compound-nounstem",
                "temporal-yo-stem",
                "body-part-stem",
            ],
        },
        selectedAmbiguous: ["authorized", "temporal-yo-stem", false, "c"],
        conflicting: ["blocked", [
            "relational-source-kind-conflicts-with-owner-lexical-analysis",
        ]],
        copyValid: false,
    });

    s.eq(
        "all explicit negative gates fail closed",
        [
            {},
            { stemId: "fabricated", option: "option-one", sourceKind: "possessor", possessorId: "1sg" },
            { stemId: "huan-company", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal" },
            { stemId: "huan-company", option: "option-one", sourceKind: "nounstem", embeddedStem: "cal", possessorId: "1sg" },
            { stemId: "tzalan-between", option: "option-two", sourceKind: "possessor", embeddedStem: "cal" },
            { stemId: "huan-company", option: "option-one", sourceKind: "possessor", state: "absolutive" },
            { stemId: "c-means-purpose-reason-time", option: "option-one", sourceKind: "possessor", possessorId: "1sg" },
            { stemId: "pa-frequency", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal" },
            { stemId: "nal-far-bank", option: "option-two", sourceKind: "rare-nounstem", embeddedStem: "cal" },
            { stemId: "ic-downward-direction", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal" },
            { stemId: "tlan-bottom", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal", sourceMatrixStem: "pan" },
            { stemId: "pan-surface-time", constructionKind: "associated-entity" },
            { stemId: "pan-surface-time", option: "option-four", constructionKind: "compound-embed" },
        ].map((request) => {
            const result = evaluate(request);
            return {
                status: result.authorizationStatus,
                surface: result.surface,
                diagnostics: result.diagnostics,
            };
        }),
        [
            "relational-stem-license-required",
            "relational-stem-license-required",
            "relational-option-not-licensed-for-stem",
            "relational-option-one-requires-possessor-source",
            "relational-compound-option-requires-embedded-source",
            "relational-state-not-licensed-for-option",
            "relational-fixed-possessor-mismatch",
            "relational-source-kind-not-licensed",
            "relational-source-kind-not-licensed",
            "relational-source-kind-not-licensed",
            "relational-source-matrix-mismatch",
            "typed-relational-source-required",
            "target-matrix-stem-required",
        ].map((diagnostic) => ({
            status: "blocked",
            surface: "",
            diagnostics: [diagnostic],
        }))
    );

    s.eq(
        "lesson, formula, surface, translation, evidence, and caller frames cannot alter a typed result",
        (() => {
            const request = {
                stemId: "tlan-bottom",
                option: "option-two",
                sourceKind: "nounstem",
                embeddedStem: "cal",
                state: "absolutive",
            };
            const canonical = evaluate(request);
            const hostile = evaluate({
                ...request,
                lesson: 999,
                formula: "#FORGED#",
                formulaEcho: "#FORGED#",
                surface: "forged",
                result: "forged",
                translationLabel: "under",
                evidenceSource: "forged evidence",
                sourceFrame: { kind: "forged" },
                operationFrame: { kind: "forged" },
                restoredState: { stemId: "huan-company" },
                displayText: "huan-company",
            });
            return {
                canonical: [canonical.predicateStem, canonical.formula, canonical.surface],
                hostile: [hostile.predicateStem, hostile.formula, hostile.surface],
                flags: [
                    hostile.callerSuppliedAuthorityAccepted,
                    hostile.formulaStringAuthority,
                    hostile.surfaceStringAuthority,
                    hostile.lessonMetadataAuthority,
                ],
            };
        })(),
        {
            canonical: ["callan", "#Ø-Ø(cal-lan)Ø-Ø#", "callan"],
            hostile: ["callan", "#Ø-Ø(cal-lan)Ø-Ø#", "callan"],
            flags: [false, false, false, false],
        }
    );

    s.eq(
        "prepared coordinates are pointwise identical to scalar evaluation",
        (() => {
            const baseRequest = asOneNounstemRequest({
                stemId: "pan-surface-time",
                option: "option-one",
                sourceKind: "possessor",
                state: "possessive",
            });
            const coordinates = [
                { coordinateId: "1sg", possessorId: "1sg" },
                { coordinateId: "2sg", possessorId: "2sg" },
                { coordinateId: "3sg", possessorId: "3sg" },
                { coordinateId: "1pl", possessorId: "1pl" },
                { coordinateId: "2pl", possessorId: "2pl" },
                { coordinateId: "3pl", possessorId: "3pl" },
                { coordinateId: "te", possessorId: "nonspecific-human" },
                { coordinateId: "tla", possessorId: "nonspecific-nonhuman" },
                { coordinateId: "ne", possessorId: "reciprocal" },
            ];
            const plan =
                ctx.prepareClassicalRelationalNncParadigmPlan(
                    baseRequest,
                    coordinates
                );
            const projectedCoordinates =
                ctx.projectClassicalRelationalNncParadigmCoordinates(plan);
            return {
                kind: plan.kind,
                count: plan.coordinateCount,
                rows: coordinates.map((coordinate, index) => {
                    const scalar = evaluate({
                        ...baseRequest,
                        ...coordinate,
                    });
                    const projected = projectedCoordinates[index];
                    return {
                        coordinateId: coordinate.coordinateId,
                        scalar: [scalar.formula, scalar.surface],
                        projected: [projected.formula, projected.surface],
                        equal: scalar.formula === projected.formula && scalar.surface === projected.surface,
                    };
                }),
            };
        })(),
        {
            kind: "classical-nahuatl-relational-nnc-prepared-plan",
            count: 9,
            rows: [
                ["1sg", "#Ø-Ø+no-Ø(pan)Ø-Ø#", "nopan"],
                ["2sg", "#Ø-Ø+mo-Ø(pan)Ø-Ø#", "mopan"],
                ["3sg", "#Ø-Ø+ī-Ø(pan)Ø-Ø#", "īpan"],
                ["1pl", "#Ø-Ø+to-Ø(pan)Ø-Ø#", "topan"],
                ["2pl", "#Ø-Ø+amo-Ø(pan)Ø-Ø#", "amopan"],
                ["3pl", "#Ø-Ø+īn-Ø(pan)Ø-Ø#", "īnpan"],
                ["te", "#Ø-Ø+tē-Ø(pan)Ø-Ø#", "tēpan"],
                ["tla", "#Ø-Ø+tla-Ø(pan)Ø-Ø#", "tlapan"],
                ["ne", "#Ø-Ø+ne-Ø(pan)Ø-Ø#", "nepan"],
            ].map(([coordinateId, formula, surface]) => ({
                coordinateId,
                scalar: [formula, surface],
                projected: [formula, surface],
                equal: true,
            })),
        }
    );

    s.eq(
        "prepared-coordinate projection requires the exact owner-issued plan",
        (() => {
            const baseRequest = asOneNounstemRequest({
                stemId: "pan-surface-time",
                option: "option-two",
                constructionKind: "associated-entity",
                sourceKind: "nounstem",
                sourceStem: "cuauhtlah",
                nounConnector: "tl",
                subjectMode: "normal",
                state: "absolutive",
            });
            const coordinates = [{
                coordinateId: "third",
                subjectId: "3sg",
            }];
            const plan =
                ctx.buildClassicalNahuatlPreparedPlan(
                    baseRequest,
                    coordinates
                );
            const copiedPlan = JSON.parse(JSON.stringify(plan));
            const forgedPlan = {
                kind: "classical-nahuatl-relational-nnc-prepared-plan",
                contractKind:
                    "classical-nahuatl-relational-nnc-prepared-plan",
                version: 1,
                authorizationStatus: "authorized",
                coordinateCount: copiedPlan.coordinateCount,
                coordinates: copiedPlan.coordinates,
                coordinateResults: copiedPlan.coordinateResults,
                baseRequest: copiedPlan.baseRequest,
                scalarEvaluatorIdentity:
                    "evaluateClassicalNahuatlRelationalNnc",
                callerSuppliedCoordinateAuthorityAccepted: false,
                formulaStringAuthority: false,
                surfaceStringAuthority: false,
                lessonMetadataAuthority: false,
            };
            const project = candidate =>
                ctx.projectClassicalNahuatlPreparedCoordinate(
                    candidate,
                    "third"
                );
            const scalar =
                ctx.evaluateClassicalNahuatlRelationalNnc({
                    ...baseRequest,
                    ...coordinates[0],
                });
            const issued = project(plan);
            const copied = project(copiedPlan);
            const forged = project(forgedPlan);
            return {
                canonical: [
                    ctx.isClassicalNahuatlPreparedPlan(plan),
                    issued.authorizationStatus,
                    issued.formula,
                    issued.surface,
                    issued.formula === scalar.formula
                        && issued.surface === scalar.surface,
                ],
                copied: [
                    ctx.isClassicalNahuatlPreparedPlan(copiedPlan),
                    copied.authorizationStatus,
                    copied.diagnostics?.[0],
                    copied.formula,
                    copied.surface,
                ],
                forged: [
                    ctx.isClassicalNahuatlPreparedPlan(forgedPlan),
                    forged.authorizationStatus,
                    forged.diagnostics?.[0],
                    forged.formula,
                    forged.surface,
                ],
            };
        })(),
        {
            canonical: [
                true,
                "authorized",
                "#Ø-Ø(cuauhtlah-ca)tl-Ø#",
                "cuauhtlahcatl",
                true,
            ],
            copied: [
                false,
                "blocked",
                "authorized-relational-prepared-plan-required",
                "",
                "",
            ],
            forged: [
                false,
                "blocked",
                "authorized-relational-prepared-plan-required",
                "",
                "",
            ],
        }
    );

    s.eq(
        "the grammar application returns the same canonical relational Result without a generic-generation lane",
        (() => {
            const request = asOneNounstemRequest({
                stemId: "tzalan-between",
                option: "option-two",
                sourceKind: "nounstem",
                embeddedStem: "cal",
                state: "absolutive",
            });
            const scalar = ctx.evaluateClassicalNahuatlRelationalNnc(
                request
            );
            const application = ctx.requestClassicalRelationalNncResult(request);
            return {
                scalar: [scalar.authorizationStatus, scalar.formula, scalar.surface],
                application: [
                    application.authorizationStatus,
                    application.formula,
                    application.surface,
                ],
                identical: application === scalar,
                genericRoute: typeof ctx.executeRelationalNncGenerationRoute,
            };
        })(),
        {
            scalar: ["authorized", "#Ø-Ø(cal-tzālan)Ø-Ø#", "caltzālan"],
            application: ["authorized", "#Ø-Ø(cal-tzālan)Ø-Ø#", "caltzālan"],
            identical: false,
            genericRoute: "undefined",
        }
    );

    s.eq(
        "the registry accepts canonical grammar/result/prepared contracts and rejects a same-shape forged GCD",
        (() => {
            const result = evaluate({
                stemId: "teuh-similarity",
                option: "option-two",
                sourceKind: "nounstem",
                embeddedStem: "te",
            });
            const plan = ctx.buildClassicalNahuatlPreparedPlan(asOneNounstemRequest({
                stemId: "pan-surface-time",
                option: "option-one",
                sourceKind: "possessor",
                state: "possessive",
            }), [{ coordinateId: "one", possessorId: "1sg" }]);
            const copiedPlan = JSON.parse(JSON.stringify(plan));
            const registry = ctx.getDefaultGrammarContractRegistry();
            const forged = {
                ...result.grammarFrame,
                greatestCommonDivisor: {
                    ...result.grammarFrame.greatestCommonDivisor,
                    identityId: "forged",
                },
            };
            return {
                source: ctx.inspectRegisteredGrammarContract(registry, result.sourceFrame).ok,
                operation: ctx.inspectRegisteredGrammarContract(registry, result.operationFrame).ok,
                grammar: ctx.inspectRegisteredGrammarContract(registry, result.grammarFrame).ok,
                result: ctx.inspectRegisteredGrammarContract(registry, result).ok,
                plan: ctx.inspectRegisteredGrammarContract(registry, plan).ok,
                copiedPlan:
                    ctx.inspectRegisteredGrammarContract(
                        registry,
                        copiedPlan
                    ).ok,
                forged: ctx.inspectRegisteredGrammarContract(registry, forged).ok,
                canonical: ctx.isClassicalNahuatlRelationalNncGrammarFrame(result.grammarFrame),
                planCanonical:
                    ctx.isClassicalNahuatlPreparedPlan(plan),
                copiedPlanCanonical:
                    ctx.isClassicalNahuatlPreparedPlan(copiedPlan),
                forgedCanonical: ctx.isClassicalNahuatlRelationalNncGrammarFrame(forged),
            };
        })(),
        {
            source: true,
            operation: true,
            grammar: true,
            result: true,
            plan: true,
            copiedPlan: false,
            forged: false,
            canonical: true,
            planCanonical: true,
            copiedPlanCanonical: false,
            forgedCanonical: false,
        }
    );

  return s;
}

module.exports = { run };
