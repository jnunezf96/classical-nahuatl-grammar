"use strict";

/**
 * Tests for src/ui/state.mjs — Toggle Lock functions.
 * Covers: isToggleLockEnabled, getToggleLockStateKey,
 *         getToggleStateValue, setToggleStateValue,
 *         clearToggleLockValueState, clearAllToggleStateMaps,
 *         applyDefaultToggleStateOnce.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("state");
    const grammarSystemReadout = ctx.getClassicalGrammarSystemReadout();
    s.eq(
        "Classical UI state exposes one read-only grammar-system GCD/LCM",
        {
            kind: grammarSystemReadout.kind,
            authorizationStatus: grammarSystemReadout.authorizationStatus,
            operationCount: grammarSystemReadout.operationCount,
            gcd: grammarSystemReadout.greatestCommonDivisorIdentity,
            gcdInvariantCount: grammarSystemReadout.greatestCommonDivisorInvariantIds.length,
            lcmAxisCount: grammarSystemReadout.leastCommonMultipleAxisCount,
            readOnly: grammarSystemReadout.readOnly,
            curriculumOrderAuthority: grammarSystemReadout.curriculumOrderAuthority,
            lessonMetadataAuthority: grammarSystemReadout.lessonMetadataAuthority,
            formulaStringAuthority: grammarSystemReadout.formulaStringAuthority,
            surfaceStringAuthority: grammarSystemReadout.surfaceStringAuthority,
        },
        {
            kind: "classical-grammar-system-readout",
            authorizationStatus: "authorized",
            operationCount: 85,
            gcd: "typed-semantic-application-to-canonical-result",
            gcdInvariantCount: 9,
            lcmAxisCount: grammarSystemReadout.leastCommonMultipleAxisCount,
            readOnly: true,
            curriculumOrderAuthority: false,
            lessonMetadataAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        }
    );
    s.ok(
        "Classical system LCM retains the full cross-domain union",
        grammarSystemReadout.leastCommonMultipleAxisCount > 100
    );
    const deverbalProjection = ctx.getClassicalDeverbalNncOperationProjection();
    s.eq(
        "Classical UI state projects the canonical deverbal NNC operation without a route profile",
        {
            kind: deverbalProjection.kind,
            authorizationStatus: deverbalProjection.authorizationStatus,
            operationId: deverbalProjection.operationId,
            capabilityName: deverbalProjection.capabilityName,
            axisIds: deverbalProjection.axisIds,
            capabilityInstalled: deverbalProjection.capabilityInstalled,
            readOnly: deverbalProjection.readOnly,
            routeProfileAuthority: deverbalProjection.routeProfileAuthority,
            surfaceStringAuthority: deverbalProjection.surfaceStringAuthority,
        },
        {
            kind: "classical-grammar-application-operation-projection",
            authorizationStatus: "authorized",
            operationId: "nnc:deverbal-construction",
            capabilityName: "evaluateClassicalNahuatlDeverbalNnc",
            axisIds: [
                "source-stage",
                "source-voice",
                "nominalization-family",
                "patientive-family",
                "external-object",
                "double-nucleus-ownerhood",
            ],
            capabilityInstalled: true,
            readOnly: true,
            routeProfileAuthority: false,
            surfaceStringAuthority: false,
        }
    );

    // isToggleLockEnabled — ToggleLockState starts disabled
    s.no("toggle lock off by default", ctx.isToggleLockEnabled());
    s.eq("particle mode is a selectable output mode", ctx.TENSE_MODE.particula, "particula");
    s.eq("particle mode has no tense paradigm tabs", ctx.getTenseOrderForMode(ctx.TENSE_MODE.particula), []);
    s.eq("canonical NNC mode has no retired deverbal noun-tense tabs", ctx.getTenseOrderForMode(ctx.TENSE_MODE.sustantivo), []);
    s.eq(
        "Andrews formal tense modes stay limited to CNV, CNN, and Partícula",
        Object.keys(ctx.FORMAL_TENSE_MODE || {}),
        ["verbo", "sustantivo", "particula"]
    );
    s.eq(
        "adjectival/adverbial functions remain routes, not formal classes",
        Object.keys(ctx.FUNCTION_TENSE_MODE || {}),
        ["adjetivo", "adverbio"]
    );
    s.eq("european mode scaffold remains available", ctx.TENSE_MODE_SYSTEM.european, "european");
    s.eq(
        "Andrews syntactical/formal class mode-system aliases are available",
        {
            function: ctx.TENSE_MODE_SYSTEM.function,
            unit: ctx.TENSE_MODE_SYSTEM.unit,
        },
        {
            function: "function",
            unit: "unit",
        }
    );
    s.eq(
        "Andrews syntactical/formal class state helpers are exported",
        [
            typeof ctx.getActiveFunctionMode,
            typeof ctx.getActiveFunctionRole,
            typeof ctx.setActiveFunctionMode,
            typeof ctx.setActiveFunctionRole,
            typeof ctx.getActiveUnitKind,
            typeof ctx.setActiveUnitMode,
            typeof ctx.setActiveUnitKind,
        ],
        ["function", "function", "function", "function", "function", "function", "function"]
    );
    s.eq(
        "unit source-target route options are authorized by typed Andrews source and operation frames",
        (() => {
            const sourceFrame = ctx.buildAndrewsUnitSourceTargetRouteOptionsSourceFrame("verbo");
            const operationFrame = ctx.buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(sourceFrame);
            const result = ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(operationFrame);
            return {
                ok: result.ok,
                targetFormulaType: result.targetFormulaType,
                sourceTargetOptions: result.sourceTargetOptions,
                sourceTargetOptionList: result.sourceTargetOptionList,
                sourceKind: operationFrame.sourceFrame?.kind || "",
                operation: operationFrame.operation || "",
            };
        })(),
        {
            ok: true,
            targetFormulaType: "CNV",
            sourceTargetOptions: "CNV->CNV|CNN->CNV|CNV/CNN->CNV/CNN",
            sourceTargetOptionList: ["CNV->CNV", "CNN->CNV", "CNV/CNN->CNV/CNN"],
            sourceKind: "andrews-unit-source-target-route-options-source-frame",
            operation: "resolve-unit-target-route-options-from-andrews-source-frame",
        }
    );
    s.eq(
        "unit source-target route options block string-only and contradictory operation authority",
        (() => {
            const sourceFrame = ctx.buildAndrewsUnitSourceTargetRouteOptionsSourceFrame("sustantivo");
            const poisonedDisplaySourceFrame = {
                ...sourceFrame,
                displaySourceTargetOptions: "CNV->CNV|CNN->CNV",
                sourceTargetOptions: "CNV->CNV|CNN->CNV",
                formulaEcho: "CNV->CNV",
                result: "CNV->CNV",
                surface: "CNV->CNV",
            };
            const displayPoisonResult = ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(
                ctx.buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(poisonedDisplaySourceFrame),
            );
            const operationFrame = ctx.buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(sourceFrame);
            const contradictoryTarget = {
                ...operationFrame,
                targetFrame: {
                    ...operationFrame.targetFrame,
                    targetFormulaFrame: {
                        ...operationFrame.targetFrame.targetFormulaFrame,
                        formulaType: "CNV",
                    },
                },
            };
            const fakeOperators = {
                dataset: {
                    sourceTargetOptions: "CNV->CNV|CNN->CNV",
                    targetFormulaType: "CNV",
                },
            };
            const applied = ctx.applyAndrewsUnitSourceTargetRouteOptionsDataset(fakeOperators, operationFrame);
            return {
                directString: ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame("CNV->CNV|CNN->CNV").diagnosticId,
                missingOperation: ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(null).diagnosticId,
                displayPoison: {
                    ok: displayPoisonResult.ok,
                    diagnosticId: displayPoisonResult.diagnosticId,
                    targetFormulaType: displayPoisonResult.targetFormulaType,
                    sourceTargetOptions: displayPoisonResult.sourceTargetOptions,
                },
                contradictoryTarget: ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(contradictoryTarget).diagnosticId,
                applied: {
                    ok: applied.ok,
                    sourceTargetOptions: fakeOperators.dataset.sourceTargetOptions,
                    targetFormulaType: fakeOperators.dataset.targetFormulaType,
                    status: fakeOperators.dataset.sourceTargetOptionsStatus,
                    authority: fakeOperators.dataset.sourceTargetOptionsAuthority,
                },
            };
        })(),
        {
            directString: "andrews-unit-source-target-route-options-missing-operation-frame",
            missingOperation: "andrews-unit-source-target-route-options-missing-operation-frame",
            displayPoison: {
                ok: false,
                diagnosticId: "andrews-unit-source-target-route-options-unissued-source-frame",
                targetFormulaType: "",
                sourceTargetOptions: "",
            },
            contradictoryTarget: "andrews-unit-source-target-route-options-contradictory-target-frame",
            applied: {
                ok: true,
                sourceTargetOptions: "CNV->CNN|CNN->CNN|CNV/CNN->CNV/CNN",
                targetFormulaType: "CNN",
                status: "andrews-structured-authorized",
                authority: "andrews-unit-source-target-route-options-operation-frame",
            },
        }
    );
    s.eq(
        "legacy ordinary-NNC UI state and request lane is retired",
        [
            typeof ctx.isOrdinaryNncGenerationModeEnabled,
            typeof ctx.setOrdinaryNncGenerationModeEnabled,
            typeof ctx.setOrdinaryNncGenerationState,
            typeof ctx.getOrdinaryNncGenerationState,
            typeof ctx.buildOrdinaryNncGenerateWordRequest,
            typeof ctx.parseOrdinaryNncGenerationAnalogueInput,
            typeof ctx.formatOrdinaryNncGenerationAnalogueInput,
        ],
        ["undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined"]
    );
    s.eq(
        "canonical NNC application helpers remain the only generation entry",
        [
            typeof ctx.issueCanonicalNncSourceFrame,
            typeof ctx.issueCanonicalNncOperationFrame,
            typeof ctx.requestClassicalOrdinaryNncResult,
            typeof ctx.getCurrentNuclearClauseShell,
        ],
        ["function", "function", "function", "function"]
    );
    const currentShell = ctx.getCurrentNuclearClauseShell();
    s.eq(
        "current UI exposes a diagnostic nuclear-clause shell",
        {
            kind: currentShell?.kind,
            clauseKind: currentShell?.clauseKind,
            generationAllowed: currentShell?.generationAllowed,
        },
        {
            kind: "nuclear-clause-shell",
            clauseKind: "verbal-nuclear-clause",
            generationAllowed: false,
        }
    );
    s.eq(
        "entrada URL segment helpers are exported",
        [
            typeof ctx.getEntradaUrlSegmentFieldKeys,
            typeof ctx.normalizeEntradaUrlStateSnapshot,
            typeof ctx.buildEntradaUrlSegmentString,
            typeof ctx.parseEntradaUrlSegmentString,
            typeof ctx.buildEntradaUrlHash,
            typeof ctx.normalizeComposerSecondaryValenceSelection,
            typeof ctx.getComposerDirectionalPrefixInventory,
            typeof ctx.normalizeComposerDirectionalPrefix,
            typeof ctx.getComposerBracketDirectionalPrefixToken,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );
    const entradaUrlFieldKeys = ctx.getEntradaUrlSegmentFieldKeys();
    s.eq(
        "entrada URL schema covers all current #1 Entrada control families",
        [
            "input",
            "board",
            "transitivity",
            "slotAEmbed",
            "slotAStem",
            "slotAObjectEmbed",
            "slotBEmbed",
            "slotBStem",
            "slotBObjectEmbed",
            "slotCEmbed",
            "slotCStem",
            "slotCObjectEmbed",
            "valenceIntransitive",
            "valence",
            "valenceSecondary",
            "directionalPrefix",
            "supportiveMarker",
            "vncOutputScope",
            "slotASerialType",
            "slotATemplateSuffix",
            "classicalNncEnabled",
            "classicalNncSubject",
            "classicalNncState",
            "classicalNncPredicateOptionId",
            "classicalNncPossessorReduplication",
            "classicalNncPossessor",
            "classicalNncStemRelation",
            "classicalNncOutputScope",
            "classicalNncAnimacy",
            "classicalNncMetaphoricalUse",
            "classicalNncClausePosition",
            "classicalNncDoubledFirstPlural",
            "classicalNncAdjunctorInMode",
            "classicalNncDependentClauseIntroducedByIn",
            "classicalNncSpecialHumanUse",
        ].every((fieldKey) => entradaUrlFieldKeys.includes(fieldKey)),
        true
    );
    s.eq(
        "entrada URL schema omits retired noun-to-verb bridge state",
        ["slotATemplateSurface", "slotATemplateTiCausativeClass"]
            .some((fieldKey) => entradaUrlFieldKeys.includes(fieldKey)),
        false
    );
    const composerEntradaHash = ctx.buildEntradaUrlHash({
        input: "[huāl]/ix/(tla)-mati",
        board: "noun-to-verb",
        transitivity: "transitive",
        valence: "tla",
        directionalPrefix: "huāl",
        supportiveMarker: "i",
        slots: {
            a: {
                embed: "cal",
                stem: "ti",
                objectEmbed: "ix",
                serialType: "ti-have",
                templateSuffix: "ti",
                templateSurface: "cal",
                templateTiCausativeClass: "have",
            },
            b: {
                embed: "ix",
                stem: "mati",
                objectEmbed: "",
                serialType: "auto",
            },
        },
    });
    s.eq(
        "Classical URL names an ordinary verb nuclear clause as VNC",
        ctx.buildEntradaUrlHash({
            input: "(nemi)",
            transitivity: "intransitive",
        }),
        "#classical/v1/vnc/(nemi)/tr/intransitive"
    );
    const parsedComposerEntrada = ctx.parseEntradaUrlSegmentString(composerEntradaHash);
    s.eq(
        "entrada URL schema rejects the retired version without a compatibility adapter",
        ctx.parseEntradaUrlSegmentString("#entrada/v2/verb/(nemi)/tr/intransitive"),
        null
    );
    s.eq(
        "Classical URL schema rejects the retired entrada link family",
        ctx.parseEntradaUrlSegmentString("#entrada/v3/verb/(kawi)/screen/output/tr/intransitive"),
        null
    );
    const retiredLegacyLocation = {
        hash: "#entrada/v3/verb/(kawi)/screen/output/tr/intransitive",
        pathname: "/",
        search: "",
    };
    let retiredLegacyReplacement = "";
    const retiredVerb = ctx.document.getElementById("verb");
    const retiredWholeStem = ctx.document.getElementById("classical-source-whole");
    const retiredResult = ctx.document.getElementById("classical-rule-logic-surface");
    retiredVerb.value = "(kawi)";
    retiredWholeStem.value = "kawi";
    retiredResult.innerHTML = "retired Result";
    retiredResult.hidden = false;
    const retiredLegacyApplied = ctx.applyEntradaUrlSegmentsFromLocation({
        location: retiredLegacyLocation,
        history: {
            replaceState(_state, _title, value) {
                retiredLegacyReplacement = value;
            },
        },
    });
    s.eq(
        "opening a retired link clears it without restoring its state or Result",
        {
            applied: retiredLegacyApplied,
            replacement: retiredLegacyReplacement,
            verb: retiredVerb.value,
            stem: retiredWholeStem.value,
            result: retiredResult.innerHTML,
            resultHidden: retiredResult.hidden,
        },
        {
            applied: false,
            replacement: "/",
            verb: "",
            stem: "",
            result: "",
            resultHidden: true,
        }
    );
    s.eq(
        "retired generic Result builders and helpers are not callable",
        {
            retiredNames: Object.getOwnPropertyNames(ctx).filter(
                name => /generateword/iu.test(name)
            ),
            classicalBuilder: typeof ctx.generateNuclearClauseSurface,
            classicalExecutor: typeof ctx.executeNuclearClauseSurfaceRequest,
            classicalCache: typeof ctx.getCachedSilentNuclearClauseSurface,
            compatibilityName: ctx.NUCLEAR_CLAUSE_SURFACE_ENGINE?.compatibilityGenerateFunction,
        },
        {
            retiredNames: [],
            classicalBuilder: "function",
            classicalExecutor: "function",
            classicalCache: "function",
            compatibilityName: undefined,
        }
    );
    s.eq(
        "entrada URL segments round-trip V controls and normalize the retired S-to-V board closed",
        {
            hashPrefix: composerEntradaHash.startsWith("#classical/v1/"),
            board: parsedComposerEntrada.board,
            input: parsedComposerEntrada.input,
            transitivity: parsedComposerEntrada.transitivity,
            directionalPrefix: parsedComposerEntrada.directionalPrefix,
            supportiveMarker: parsedComposerEntrada.supportiveMarker,
            valence: parsedComposerEntrada.valence,
            slotA: parsedComposerEntrada.slots.a,
            slotB: parsedComposerEntrada.slots.b,
        },
        {
            hashPrefix: true,
            board: "general",
            input: "[huāl]/ix/(tla)-mati",
            transitivity: "transitive",
            directionalPrefix: "huāl",
            supportiveMarker: "i",
            valence: "tla",
            slotA: {
                embed: "",
                stem: "",
                objectEmbed: "ix",
                serialType: "ti-have",
                templateSuffix: "ti",
            },
            slotB: {
                embed: "",
                stem: "",
                objectEmbed: "",
                serialType: "auto",
                templateSuffix: "",
            },
        }
    );
    s.eq(
        "composer Source inventories expose only semantic Classical valence and directional tokens",
        {
            secondaryValence: ctx.getComposerSecondaryValenceInventory(),
            directional: ctx.getComposerDirectionalPrefixInventory(),
            canonicalValence: ["tla", "tlahtla", "tē", "tēhtē", "mo", "mohmo"]
                .map((token) => ctx.normalizeComposerSecondaryValenceSurfaceToken(token)),
            canonicalDirectional: ["huāl", "on"]
                .map((token) => ctx.normalizeComposerDirectionalPrefix(token)),
        },
        {
            secondaryValence: ["tla", "tlahtla", "tē", "tēhtē", "mo", "mohmo"],
            directional: ["huāl", "on"],
            canonicalValence: ["tla", "tlahtla", "tē", "tēhtē", "mo", "mohmo"],
            canonicalDirectional: ["huāl", "on"],
        }
    );
    s.eq(
        "composer Source rejects Modern valence and directional spellings instead of converting them",
        {
            valence: ["ta", "tajta", "te", "tejte", "mu", "mujmu"]
                .map((token) => ctx.normalizeComposerSecondaryValenceSurfaceToken(token)),
            directional: ["wal", "w", "kw", "k"]
                .map((token) => ctx.normalizeComposerDirectionalPrefix(token)),
            bracketDirectional: ["[wal]", "[w]", "[kw]", "[k]"]
                .map((token) => ctx.getComposerBracketDirectionalPrefixToken(token)),
        },
        {
            valence: ["", "", "", "", "", ""],
            directional: ["", "", "", ""],
            bracketDirectional: ["", "", "", ""],
        }
    );
    const canonicalSecondaryEntradaHash = ctx.buildEntradaUrlHash({
        transitivity: "bitransitive",
        valenceSecondary: "tēhtē+tlahtla",
    });
    const canonicalSecondaryEntrada = ctx.parseEntradaUrlSegmentString(canonicalSecondaryEntradaHash);
    s.eq(
        "entrada URL preserves the exact canonical secondary-valence selection",
        {
            hash: canonicalSecondaryEntradaHash,
            valenceSecondary: canonicalSecondaryEntrada.valenceSecondary,
            invalid: canonicalSecondaryEntrada.invalidComposerFields,
        },
        {
            hash: "#classical/v1/tr/bitransitive/val-c/t%C4%93ht%C4%93%2Btlahtla",
            valenceSecondary: "tēhtē+tlahtla",
            invalid: [],
        }
    );
    const rejectedComposerEntradaRoutes = [
        ["#classical/v1/val-b/ta", "valence"],
        ["#classical/v1/val-b/tajta", "valence"],
        ["#classical/v1/val-b/te", "valence"],
        ["#classical/v1/val-b/tejte", "valence"],
        ["#classical/v1/val-b/mu", "valence"],
        ["#classical/v1/val-b/mujmu", "valence"],
        ["#classical/v1/dir/wal", "directionalPrefix"],
        ["#classical/v1/dir/w", "directionalPrefix"],
        ["#classical/v1/dir/kw", "directionalPrefix"],
        ["#classical/v1/dir/k", "directionalPrefix"],
        ["#classical/v1/verb/%5Bwal%5D%2Fix%2F(ta)-mati", "input"],
    ].map(([route, field]) => {
        const parsed = ctx.parseEntradaUrlSegmentString(route);
        return {
            route,
            field,
            invalid: parsed.invalidComposerFields,
            normalizedValue: field === "input" ? parsed.input : parsed[field],
            rebuilt: ctx.buildEntradaUrlHash(parsed),
            applied: ctx.applyEntradaUrlStateSnapshot(parsed, {
                triggerGenerate: false,
                immediateRefresh: false,
            }),
        };
    });
    s.eq(
        "entrada URL restoration fails closed for every legacy composer Source spelling",
        rejectedComposerEntradaRoutes,
        rejectedComposerEntradaRoutes.map(({ route, field }) => ({
            route,
            field,
            invalid: [field],
            normalizedValue: "",
            rebuilt: "",
            applied: false,
        }))
    );
    s.eq(
        "composer semantic serialization accepts Classical tokens and blocks legacy authority",
        {
            canonical: ctx.serializeComposerSemanticToRegexInput(ctx.buildComposerSemanticState({
                transitivity: "transitive",
                directionalPrefix: "huāl",
                valence: "tēhtē",
                slotBStem: "mati",
            })),
            legacyValence: ctx.serializeComposerSemanticToRegexInput(ctx.buildComposerSemanticState({
                transitivity: "transitive",
                valence: "tejte",
                slotBStem: "mati",
            })),
            legacyDirectional: ctx.serializeComposerSemanticToRegexInput(ctx.buildComposerSemanticState({
                transitivity: "transitive",
                directionalPrefix: "wal",
                valence: "tēhtē",
                slotBStem: "mati",
            })),
        },
        {
            canonical: "huāl+tēhtē-(mati)",
            legacyValence: "",
            legacyDirectional: "",
        }
    );
    const originalLanguageProfileGetter = ctx.getActiveLanguageProfileMode;
    const originalUiDensityGetter = ctx.getActiveUiDensityMode;
    const originalClassListContains = ctx.document.body.classList.contains;
    const originalGetClientRects = ctx.document.body.getClientRects;
    const originalVerbComposerState = { ...ctx.VerbComposerState };
    const originalVerbInputValue = ctx.document.getElementById("verb").value;
    try {
        ctx.getActiveLanguageProfileMode = () => ctx.LANGUAGE_PROFILE_MODE.classicalNahuatl;
        ctx.document.body.classList.contains = (className) => className === "is-language-classical";
        ctx.document.body.getClientRects = () => [{ width: 1, height: 1 }];
        ctx.getActiveUiDensityMode = () => ctx.UI_DENSITY_MODE.simple;
        s.eq(
            "Classical entrada stem normalization preserves macrons",
            {
                macronStem: ctx.normalizeComposerStem("zōmā"),
                boundedStem: ctx.normalizeComposerStem("pa-tla"),
                wrappedStem: ctx.normalizeComposerStem("-(zōmā)"),
            },
            {
                macronStem: "zōmā",
                boundedStem: "patla",
                wrappedStem: "zōmā",
            }
        );
        const staleClassicalRoute = ctx.parseEntradaUrlSegmentString("#classical/v1/verb/-(z%C5%8Dm%C4%81)/tr/transitive/b-stem/zm");
        ctx.applyEntradaUrlStateSnapshot(staleClassicalRoute, {
            triggerGenerate: false,
            immediateRefresh: false,
        });
        s.eq(
            "Classical entrada input stem outranks stale ASCII b-stem route cache",
            {
                transitivity: ctx.VerbComposerState.transitivity,
                slotBStem: ctx.VerbComposerState.slotBStem,
                serialized: ctx.buildComposerModeBundle(ctx.VerbComposerState, "").regexValue,
            },
            {
                transitivity: "transitive",
                slotBStem: "zōmā",
                serialized: "-(zōmā)",
            }
        );
    } finally {
        ctx.getActiveLanguageProfileMode = originalLanguageProfileGetter;
        ctx.getActiveUiDensityMode = originalUiDensityGetter;
        ctx.document.body.classList.contains = originalClassListContains;
        ctx.document.body.getClientRects = originalGetClientRects;
        Object.assign(ctx.VerbComposerState, originalVerbComposerState);
        ctx.document.getElementById("verb").value = originalVerbInputValue;
    }
    const retiredOrdinaryEntradaHash = ctx.buildEntradaUrlSegmentString({
        input: "(cihuā)tl",
        board: "ordinary-nnc",
        ordinaryNnc: {
            enabled: true,
            state: "possessive",
            number: "plural",
            pluralType: "distributive",
            pers1: "ti",
            pers2: "h",
            subjectKey: "1pl",
            possessor: "no",
            nounClass: "tl",
            animacy: "animate",
        },
    });
    const retiredOrdinaryEntrada = ctx.parseEntradaUrlSegmentString(retiredOrdinaryEntradaHash);
    s.eq(
        "entrada URL rejects the retired ordinary-NNC board and segment family",
        {
            board: retiredOrdinaryEntrada.board,
            input: retiredOrdinaryEntrada.input,
            hasLegacyState: Object.hasOwn(retiredOrdinaryEntrada, "ordinaryNnc"),
            hasLegacySegments: /\/s-(?:enabled|state|number|plural|p1|p2|subj|poss|class|anim)\//u.test(retiredOrdinaryEntradaHash),
        },
        {
            board: "general",
            input: "(cihuā)tl",
            hasLegacyState: false,
            hasLegacySegments: false,
        }
    );
    const classicalNncRoute = ctx.buildEntradaUrlHash({
        input: "(toma)",
        classicalNnc: {
            active: true,
            sourceClass: "tl-2-a",
            subject: "1pl",
            state: "possessive",
            predicateOptionId: "source-stem",
            possessorReduplication: true,
            possessor: "3pl",
            stemRelation: "affinity",
            outputScope: "paradigm",
            animacy: "animate",
            metaphoricalUse: true,
            clausePosition: "noninitial",
            doubledFirstPlural: true,
            adjunctorInMode: "dependent-clause",
            dependentClauseIntroducedByIn: true,
            specialHumanUse: true,
        },
    });
    const classicalNncEntrada = ctx.parseEntradaUrlSegmentString(classicalNncRoute);
    const legacySharedVerbNnc = ctx.parseEntradaUrlSegmentString(
        "#classical/v1/verb/(toma)/cn/1/cn-subj/1pl"
    );
    s.eq(
        "Classical URL names NNC directly and rewrites the former shared verb route",
        {
            directRouteStartsWithNnc: classicalNncRoute.startsWith("#classical/v1/nnc/(toma)"),
            directRouteKeepsNncActivation: classicalNncRoute.includes("/cn/1"),
            parsedDirectNncActive: classicalNncEntrada.classicalNnc.active,
            legacyNncActive: legacySharedVerbNnc.classicalNnc.active,
            rewrittenLegacyRouteStartsWithNnc: ctx.buildEntradaUrlHash(legacySharedVerbNnc)
                .startsWith("#classical/v1/nnc/(toma)"),
            rewrittenLegacyRouteKeepsSharedVerb: ctx.buildEntradaUrlHash(legacySharedVerbNnc)
                .includes("/verb/"),
            rewrittenLegacyRouteKeepsNncActivation: ctx.buildEntradaUrlHash(legacySharedVerbNnc)
                .includes("/cn/1"),
            rewrittenLegacyVncRoute: ctx.buildEntradaUrlHash(
                ctx.parseEntradaUrlSegmentString("#classical/v1/verb/(nemi)/tr/intransitive")
            ),
        },
        {
            directRouteStartsWithNnc: true,
            directRouteKeepsNncActivation: true,
            parsedDirectNncActive: true,
            legacyNncActive: true,
            rewrittenLegacyRouteStartsWithNnc: true,
            rewrittenLegacyRouteKeepsSharedVerb: false,
            rewrittenLegacyRouteKeepsNncActivation: true,
            rewrittenLegacyVncRoute: "#classical/v1/vnc/(nemi)/tr/intransitive",
        }
    );
    s.eq(
        "entrada URL keeps only the canonical Classical NNC control state",
        {
            hasClassicalSegments: [
                "cn-subj",
                "cn-source-class",
                "cn-state",
                "cn-l15-operation",
                "cn-l15-redup",
                "cn-poss",
                "cn-relation",
                "cn-output",
                "cn-animacy",
                "cn-metaphorical",
                "cn-position",
                "cn-l16-double",
                "cn-l16-adjunctor",
                "cn-l16-in",
                "cn-l16-human",
            ]
                .every((segment) => ctx.buildEntradaUrlSegmentString(classicalNncEntrada).includes(`/${segment}/`)),
            classicalNnc: classicalNncEntrada.classicalNnc,
            hasLegacyState: Object.hasOwn(classicalNncEntrada, "ordinaryNnc"),
        },
        {
            hasClassicalSegments: true,
            classicalNnc: {
                active: true,
                sourceClass: "tl-2-a",
                subject: "1pl",
                state: "possessive",
                pluralConnector: "",
                predicateOptionId: "source-stem",
                possessorReduplication: true,
                possessor: "3pl",
                stemRelation: "affinity",
                outputScope: "paradigm",
                animacy: "animate",
                metaphoricalUse: true,
                clausePosition: "noninitial",
                doubledFirstPlural: true,
                adjunctorInMode: "dependent-clause",
                dependentClauseIntroducedByIn: true,
                specialHumanUse: true,
            },
            hasLegacyState: false,
        }
    );

    // getToggleLockStateKey — pure string key normalization
    s.eq("key: empty → empty", ctx.getToggleLockStateKey(""), "");
    s.eq("key: short key (< 3 parts) returned unchanged", ctx.getToggleLockStateKey("nemi|t"), "nemi|t");
    s.eq("key: 3-part key strips tense segment", ctx.getToggleLockStateKey("nemi|present|sg"), "nemi|sg");
    s.eq("key: 4-part key with nonactive strips both tense segments", ctx.getToggleLockStateKey("nemi|nonactive|past|t"), "nemi|t");
    s.eq("key: 3-part key, nonactive at tenseIndex+1 yields stem only", ctx.getToggleLockStateKey("ki|nonactive|t"), "ki");

    const sourceScopeBeforeLock = ctx.getVerbSourceScope();
    const combinedModeBeforeLock = ctx.getCombinedMode();
    ctx.setVerbSourceScope(ctx.VERB_SOURCE_SCOPE.active);
    ctx.setToggleLockEnabled(true, { persist: false, refreshUi: false });
    ctx.setCombinedMode(ctx.COMBINED_MODE.nonactive);
    s.eq(
        "toggle lock pins ACT source scope through combined-mode changes",
        ctx.getVerbSourceScope(),
        ctx.VERB_SOURCE_SCOPE.active
    );
    ctx.setVerbSourceScope(ctx.VERB_SOURCE_SCOPE.nonactive, { syncCombinedMode: false });
    s.eq(
        "toggle lock ignores automatic source scope restores",
        ctx.getVerbSourceScope(),
        ctx.VERB_SOURCE_SCOPE.active
    );
    ctx.setVerbSourceScope(ctx.VERB_SOURCE_SCOPE.nonactive, { syncLock: true, respectLock: false });
    s.eq(
        "manual source scope selection updates the locked choice",
        ctx.getVerbSourceScope(),
        ctx.VERB_SOURCE_SCOPE.nonactive
    );
    ctx.setToggleLockEnabled(false, { resetToDefaults: true, persist: false, refreshUi: false });
    s.eq(
        "unlocking the toggle lock resets source scope to TODOS",
        ctx.getVerbSourceScope(),
        ctx.VERB_SOURCE_SCOPE.both
    );
    ctx.setCombinedMode(combinedModeBeforeLock);
    ctx.setVerbSourceScope(sourceScopeBeforeLock, {
        syncCombinedMode: false,
        syncLock: false,
        respectLock: false,
    });

    // getToggleStateValue — reads from an arbitrary Map
    const m1 = new Map([["a|b", "val1"]]);
    s.eq("getToggleStateValue: existing key returns value", ctx.getToggleStateValue(m1, "a|b"), "val1");
    s.eq("getToggleStateValue: missing key returns undefined", ctx.getToggleStateValue(m1, "missing"), undefined);
    s.eq("getToggleStateValue: missing key with fallback", ctx.getToggleStateValue(m1, "missing", "fb"), "fb");
    s.eq("getToggleStateValue: null map returns fallback", ctx.getToggleStateValue(null, "k", "fb"), "fb");
    s.eq("getToggleStateValue: empty stateKey returns fallback", ctx.getToggleStateValue(m1, "", "fb"), "fb");

    // setToggleStateValue — writes to map, no lock sync
    const m2 = new Map();
    ctx.setToggleStateValue(m2, "x|y", "hello");
    s.eq("setToggleStateValue: value written to map", ctx.getToggleStateValue(m2, "x|y"), "hello");
    ctx.setToggleStateValue(m2, "x|y", "world");
    s.eq("setToggleStateValue: overwrites existing value", ctx.getToggleStateValue(m2, "x|y"), "world");
    ctx.setToggleStateValue(null, "x|y", "ignored"); // should not throw
    s.ok("setToggleStateValue: null map is a no-op (no throw)", true);

    // applyDefaultToggleStateOnce — applies only the first time for a given verbKey+stateKey pair
    const m3 = new Map();
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbA", "ki");
    s.eq("applyDefaultToggleStateOnce: first call sets value", ctx.getToggleStateValue(m3, "slot|sg"), "ki");
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbA", "kin");
    s.eq("applyDefaultToggleStateOnce: second call with same verbKey is ignored", ctx.getToggleStateValue(m3, "slot|sg"), "ki");
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbB", "kin");
    s.eq("applyDefaultToggleStateOnce: different verbKey can overwrite", ctx.getToggleStateValue(m3, "slot|sg"), "kin");

    s.eq(
        "UI state exposes no surface-reduplication result rewriter",
        {
            surfaceBuilder: typeof ctx.buildReduplicatedSurfaceForm,
            displayRewriter: typeof ctx.reduplicateConjugationDisplay,
            resultRewriter: typeof ctx.buildReduplicatedConjugationResult,
        },
        {
            surfaceBuilder: "undefined",
            displayRewriter: "undefined",
            resultRewriter: "undefined",
        }
    );

    const forgedTransitivitySnapshot = ctx.parseEntradaUrlSegmentString(
        "#classical/v1/verb/(nemi)/tr/fabricated/a-stem/forged"
    );
    const previousComposerTransitivity = ctx.VerbComposerState.transitivity;
    ctx.VerbComposerState.transitivity = ctx.COMPOSER_TRANSITIVITY.transitive;
    const forgedTransitivityApplied = ctx.applyEntradaUrlStateSnapshot(forgedTransitivitySnapshot, {
        triggerGenerate: false,
    });
    s.eq(
        "Entrada rejects forged source transitivity before slot A or prior state can be applied",
        {
            requested: forgedTransitivitySnapshot.sourceTransitivitySelectionFrame?.requestedSourceTransitivity,
            status: forgedTransitivitySnapshot.sourceTransitivitySelectionFrame?.authorizationStatus,
            normalized: forgedTransitivitySnapshot.transitivity,
            sourceSlot: forgedTransitivitySnapshot.sourceTransitivitySelectionFrame?.sourceSlotKey,
            applied: forgedTransitivityApplied,
            retainedState: ctx.VerbComposerState.transitivity,
        },
        {
            requested: "fabricated",
            status: "blocked",
            normalized: "",
            sourceSlot: "",
            applied: false,
            retainedState: "transitive",
        }
    );
    ctx.VerbComposerState.transitivity = previousComposerTransitivity;
    s.eq(
        "Entrada source-transitivity aliases normalize to canonical full tokens",
        ["vi", "vt", "vb"].map((alias) => {
            const snapshot = ctx.parseEntradaUrlSegmentString(`#classical/v1/verb/(nemi)/tr/${alias}`);
            return [snapshot.transitivity, snapshot.sourceTransitivitySelectionFrame?.sourceSlotKey];
        }),
        [["intransitive", "a"], ["transitive", "b"], ["bitransitive", "c"]]
    );
    const forgedOrdinaryClass = ctx.parseEntradaUrlSegmentString("#classical/v1/board/ordinary-nnc/s-enabled/1/s-class/fabricated");
    s.eq(
        "Entrada discards the retired ordinary-NNC board and forged lexical carrier",
        {
            board: forgedOrdinaryClass.board,
            legacyStatePresent: Object.hasOwn(forgedOrdinaryClass, "ordinaryNnc"),
            rebuiltContainsLegacy:
                /\/(?:board\/ordinary-nnc|s-enabled|s-class)\//u.test(
                    ctx.buildEntradaUrlHash(forgedOrdinaryClass)
                ),
            applied: ctx.applyEntradaUrlStateSnapshot(forgedOrdinaryClass, { triggerGenerate: false }),
        },
        {
            board: "general",
            legacyStatePresent: false,
            rebuiltContainsLegacy: false,
            applied: true,
        }
    );
    const forgedClassicalClass = ctx.parseEntradaUrlSegmentString("#classical/v1/cn/1/cn-class/fabricated");
    s.eq(
        "Entrada ignores a retired forged Classical noun-class segment",
        {
            classFieldPresent: Object.hasOwn(
                forgedClassicalClass.classicalNnc,
                "nounClass"
            ),
            selectionFramePresent: Object.hasOwn(
                forgedClassicalClass.classicalNnc,
                "nounClassSelectionFrame"
            ),
            rebuiltContainsClass:
                ctx.buildEntradaUrlHash(forgedClassicalClass)
                    .includes("/cn-class/"),
            applied: ctx.applyEntradaUrlStateSnapshot(forgedClassicalClass, { triggerGenerate: false }),
        },
        {
            classFieldPresent: false,
            selectionFramePresent: false,
            rebuiltContainsClass: false,
            applied: true,
        }
    );
    const forgedNncOutputScope = ctx.parseEntradaUrlSegmentString("#classical/v1/cn/1/cn-output/fabricated");
    const forgedVncOutputScope = ctx.parseEntradaUrlSegmentString("#classical/v1/verb/(nemi)/vnc-output/fabricated");
    s.eq(
        "Entrada retains malformed explicit NNC and VNC output scope as blocked",
        {
            nnc: {
                requested: forgedNncOutputScope.classicalNnc.outputScopeSelectionFrame?.requestedValue,
                normalized: forgedNncOutputScope.classicalNnc.outputScope,
                status: forgedNncOutputScope.classicalNnc.outputScopeSelectionFrame?.authorizationStatus,
                applied: ctx.applyEntradaUrlStateSnapshot(forgedNncOutputScope, { triggerGenerate: false }),
            },
            vnc: {
                requested: forgedVncOutputScope.vncOutputScopeSelectionFrame?.requestedValue,
                normalized: forgedVncOutputScope.vncOutputScope,
                status: forgedVncOutputScope.vncOutputScopeSelectionFrame?.authorizationStatus,
                applied: ctx.applyEntradaUrlStateSnapshot(forgedVncOutputScope, { triggerGenerate: false }),
            },
        },
        {
            nnc: { requested: "fabricated", normalized: "", status: "blocked", applied: false },
            vnc: { requested: "fabricated", normalized: "", status: "blocked", applied: false },
        }
    );
    s.eq(
        "Direct VNC and Classical NNC paradigm scope round-trip through literal URL fields",
        {
            vnc: ctx.parseEntradaUrlSegmentString(ctx.buildEntradaUrlHash({ input: "(nemi)", vncOutputScope: "paradigm" }))?.vncOutputScope,
            vncSegment: ctx.buildEntradaUrlHash({ input: "(nemi)", vncOutputScope: "paradigm" }).includes("/vnc-output/paradigm"),
            nnc: ctx.parseEntradaUrlSegmentString(ctx.buildEntradaUrlHash({
                classicalNnc: { active: true, outputScope: "paradigm" },
            }))?.classicalNnc?.outputScope,
        },
        { vnc: "paradigm", vncSegment: true, nnc: "paradigm" }
    );

    return s;
}

module.exports = { run };
