"use strict";

/**
 * Tests for src/core/parsing/parsing.mjs
 * Covers: normalizeMovingTargetCoreText, splitTopLevelByPlus, stripPrefixOnce,
 *         serializeRegexInputValue, findFinalTopLevelWrappedCore,
 *         isRecognizedCurrentRegexValue, applyObj2ToObj1Chain.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("parsing");
    const summarizeOrdinaryNncClassifications = (parsed) => (
        Array.isArray(parsed?.ordinaryNncFixtureClassifications)
            ? parsed.ordinaryNncFixtureClassifications.map((entry) => ({
                kind: entry.kind,
                role: entry.role,
                value: entry.value,
                normalizedInput: entry.normalizedInput,
                fixture: entry.fixture && {
                    id: entry.fixture.id,
                    stem: entry.fixture.stem,
                    lemma: entry.fixture.lemma,
                    nounClass: entry.fixture.nounClass,
                    animacy: entry.fixture.animacy,
                },
            }))
            : []
    );
    const summarizeGenerated = (result) => ({
        error: result?.error === true,
        result: result?.result || "",
        surfaceForms: result?.surfaceForms || [],
    });

    // normalizeMovingTargetCoreText — lowercases, strips non-alphabetic
    s.eq("normalize: uppercases lowercased", ctx.normalizeMovingTargetCoreText("CHIWA"), "chiwa");
    s.eq("normalize: mixed case", ctx.normalizeMovingTargetCoreText("Nemi"), "nemi");
    s.eq("normalize: already lowercase", ctx.normalizeMovingTargetCoreText("kisa"), "kisa");
    s.eq("normalize: empty", ctx.normalizeMovingTargetCoreText(""), "");

    // splitTopLevelByPlus — splits on + at depth 0 (respects parentheses)
    s.eq("split: single token", ctx.splitTopLevelByPlus("nemi"), ["nemi"]);
    s.eq("split: two tokens", ctx.splitTopLevelByPlus("ni+nemi"), ["ni", "nemi"]);
    s.eq("split: three tokens", ctx.splitTopLevelByPlus("ni+k+chiwa"), ["ni", "k", "chiwa"]);
    s.eq("split: parens protect inner +", ctx.splitTopLevelByPlus("a+(b+c)+d"), ["a", "(b+c)", "d"]);
    s.eq("split: empty returns null", ctx.splitTopLevelByPlus(""), null);

    // stripPrefixOnce — removes a literal prefix string from the start
    s.eq("stripPrefix: removes ni+", ctx.stripPrefixOnce("ni+nemi", "ni+"), "nemi");
    s.eq("stripPrefix: no match returns original", ctx.stripPrefixOnce("nemi", "ni+"), "nemi");
    s.eq("stripPrefix: empty prefix", ctx.stripPrefixOnce("nemi", ""), "nemi");

    // serializeRegexInputValue — trims whitespace, preserves case
    s.eq("serialize: trims whitespace", ctx.serializeRegexInputValue("  NEMI  "), "NEMI");
    s.eq("serialize: ni+nemi preserved", ctx.serializeRegexInputValue("ni+nemi"), "ni+nemi");
    s.eq("serialize: empty", ctx.serializeRegexInputValue(""), "");
    const serializeSourceFrame = ctx.buildCurrentRegexParseSourceFrame("(qui)-(nemi)");
    const serializeOperationFrame = ctx.buildCurrentRegexParseOperationFrame(serializeSourceFrame);
    const contradictorySerializeOperationFrame = {
        ...serializeOperationFrame,
        targetFrame: {
            ...serializeOperationFrame.targetFrame,
            regexValue: "-(paka)",
        },
    };
    s.eq("serialize: current regex display requires typed parse operation target", {
        direct: ctx.serializeRegexInputValue("(qui)-(nemi)"),
        fromOperation: ctx.serializeRegexInputValueFromOperationFrame("(qui)-(nemi)", serializeOperationFrame),
        missingOperation: ctx.serializeRegexInputValueFromOperationFrame("(qui)-(nemi)", null),
        contradictoryOperation: ctx.serializeRegexInputValueFromOperationFrame(
            "(qui)-(nemi)",
            contradictorySerializeOperationFrame
        ),
    }, {
        direct: "(qui)-(nemi)",
        fromOperation: "(qui)-(nemi)",
        missingOperation: "",
        contradictoryOperation: "",
    });
    const composerParseOperationFrame = ctx.buildCurrentRegexParseOperationFrameFromRawInput("(qui)-(nemi)");
    const composerLegacyParsed = ctx.parseMovingTargetRegexInput("(qui)-(nemi)");
    const composerContradictoryOperationFrame = {
        ...composerParseOperationFrame,
        targetFrame: {
            ...composerParseOperationFrame.targetFrame,
            coreText: "poison",
        },
    };
    const originalComposerStateBuilder = ctx.buildComposerStateFromMovingTargetParsed;
    let composerStateWithPoisonedOldBuilder = null;
    try {
        ctx.buildComposerStateFromMovingTargetParsed = () => ({
            mode: "composer",
            transitivity: "bitransitive",
            slotCStem: "poison",
        });
        composerStateWithPoisonedOldBuilder = ctx.parseComposerStateFromRegexValue("(qui)-(nemi)");
    } finally {
        ctx.buildComposerStateFromMovingTargetParsed = originalComposerStateBuilder;
    }
    const composerStateFromOperation = ctx.buildComposerStateFromCurrentRegexParseOperationFrame(
        "(qui)-(nemi)",
        composerParseOperationFrame
    );
    const composerStateFromLegacyParsed = ctx.buildComposerStateFromMovingTargetParsed(
        composerLegacyParsed,
        "(qui)-(nemi)"
    );
    const composerStateFromLyingLegacyParsed = ctx.buildComposerStateFromMovingTargetParsed(
        {
            ...composerLegacyParsed,
            coreText: "poison",
            result: "poison-result",
            surface: "poison-surface",
            formulaEcho: "#poison#",
        },
        "(qui)-(nemi)",
        composerParseOperationFrame
    );
    const composerStateFromContradictoryOperation = ctx.buildComposerStateFromCurrentRegexParseOperationFrame(
        "(qui)-(nemi)",
        composerContradictoryOperationFrame
    );
    s.eq("composer regex state consumes typed parse operation frame instead of parsed strings", {
        liveStem: ctx.getComposerActiveStemValue(composerStateWithPoisonedOldBuilder),
        liveTransitivity: composerStateWithPoisonedOldBuilder.transitivity,
        operationStem: ctx.getComposerActiveStemValue(composerStateFromOperation),
        legacyStem: ctx.getComposerActiveStemValue(composerStateFromLegacyParsed),
        legacyBlocked: composerStateFromLegacyParsed.currentRegexParseBlockedReason,
        lyingStem: ctx.getComposerActiveStemValue(composerStateFromLyingLegacyParsed),
        lyingFormulaEcho: composerStateFromLyingLegacyParsed.formulaEcho || "",
        contradictoryStem: ctx.getComposerActiveStemValue(composerStateFromContradictoryOperation),
        contradictoryBlocked: composerStateFromContradictoryOperation.currentRegexParseBlockedReason,
    }, {
        liveStem: "nemi",
        liveTransitivity: "transitive",
        operationStem: "nemi",
        legacyStem: "",
        legacyBlocked: "current-regex-parse-operation-frame-required",
        lyingStem: "nemi",
        lyingFormulaEcho: "",
        contradictoryStem: "",
        contradictoryBlocked: "current-regex-parse-contradictory-target-frame",
    });
    const supportiveToggleParseOperation = ctx.buildCurrentRegexParseOperationFrameFromRawInput("(ihuīca)");
    const supportiveToggleSourceFrame = ctx.buildCurrentRegexSupportiveToggleSourceFrame(
        "(ihuīca)",
        supportiveToggleParseOperation
    );
    const supportiveToggleOperation = ctx.buildCurrentRegexSupportiveToggleOperationFrame(
        supportiveToggleSourceFrame
    );
    const supportiveToggleOperationWithLyingDisplays = {
        ...supportiveToggleOperation,
        surface: "poison-surface",
        result: "poison-result",
        formulaEcho: "#poison#",
    };
    const contradictorySupportiveToggleOperation = {
        ...supportiveToggleOperation,
        targetFrame: {
            ...supportiveToggleOperation.targetFrame,
            nextValue: "(poison)",
        },
    };
    const originalParseVerbInput = ctx.parseVerbInput;
    const originalRawMetadata = ctx.getRawInputTiCausativeMetadata;
    let supportiveToggleWithPoisonedOldHelpers = null;
    try {
        ctx.parseVerbInput = () => ({ exactBaseVerb: "poison" });
        ctx.getRawInputTiCausativeMetadata = () => ({ displayVerb: "(poison)" });
        supportiveToggleWithPoisonedOldHelpers = ctx.getRegexSupportiveIToggleInfo("(ihuīca)");
    } finally {
        ctx.parseVerbInput = originalParseVerbInput;
        ctx.getRawInputTiCausativeMetadata = originalRawMetadata;
    }
    s.eq("regex supportive toggle consumes typed current-regex operation target", {
        direct: ctx.getRegexSupportiveIToggleInfo("(ihuīca)"),
        removeMarker: ctx.getRegexSupportiveIToggleInfo("([i]huīca)"),
        fromOperation: ctx.getRegexSupportiveIToggleInfoFromOperationFrame(
            "(ihuīca)",
            supportiveToggleOperation
        ),
        missingOperation: ctx.getRegexSupportiveIToggleInfoFromOperationFrame("(ihuīca)", null),
        contradictoryOperation: ctx.getRegexSupportiveIToggleInfoFromOperationFrame(
            "(ihuīca)",
            contradictorySupportiveToggleOperation
        ),
        lyingDisplays: ctx.getRegexSupportiveIToggleInfoFromOperationFrame(
            "(ihuīca)",
            supportiveToggleOperationWithLyingDisplays
        ),
        poisonedOldHelpers: supportiveToggleWithPoisonedOldHelpers,
    }, {
        direct: {
            canToggle: true,
            hasMarker: false,
            nextValue: "([i]huīca)",
            blockReason: "",
        },
        removeMarker: {
            canToggle: true,
            hasMarker: true,
            nextValue: "(ihuīca)",
            blockReason: "",
        },
        fromOperation: {
            canToggle: true,
            hasMarker: false,
            nextValue: "([i]huīca)",
            blockReason: "",
        },
        missingOperation: {
            canToggle: false,
            hasMarker: false,
            nextValue: "(ihuīca)",
            blockReason: "current-regex-supportive-toggle-operation-frame-required",
        },
        contradictoryOperation: {
            canToggle: false,
            hasMarker: false,
            nextValue: "(ihuīca)",
            blockReason: "current-regex-supportive-toggle-contradictory-target-frame",
        },
        lyingDisplays: {
            canToggle: true,
            hasMarker: false,
            nextValue: "([i]huīca)",
            blockReason: "",
        },
        poisonedOldHelpers: {
            canToggle: true,
            hasMarker: false,
            nextValue: "([i]huīca)",
            blockReason: "",
        },
    });
    // findFinalTopLevelWrappedCore — finds the last top-level (...) wrapper
    const wrapped = ctx.findFinalTopLevelWrappedCore("(nemi)");
    s.ok("findWrappedCore: finds (nemi)", wrapped !== null);
    s.eq("findWrappedCore: coreText=nemi", wrapped && wrapped.coreText, "nemi");
    s.eq("findWrappedCore: no wrapper returns null", ctx.findFinalTopLevelWrappedCore("nemi"), null);

    // isRecognizedCurrentRegexValue — validates that input is non-empty
    s.ok("isRecognized: nemi is valid", ctx.isRecognizedCurrentRegexValue("nemi"));
    s.no("isRecognized: empty is invalid", ctx.isRecognizedCurrentRegexValue(""));
    s.no("isRecognized: whitespace-only is invalid", ctx.isRecognizedCurrentRegexValue("   "));
    s.eq(
        "compound marker constants consume structured token classes instead of regex strings",
        (() => {
            const oldMarker = ctx.COMPOUND_MARKER_RE;
            const oldSplit = ctx.COMPOUND_MARKER_SPLIT_RE;
            const oldAllowed = ctx.COMPOUND_ALLOWED_RE;
            try {
                ctx.applyStaticConstants({
                    compoundTokenClasses: {
                        letterRanges: [{ from: "a", to: "z" }],
                        markerTokens: ["@"],
                        splitTokens: ["@"],
                    },
                });
                const structured = {
                    marker: "x@y".replace(ctx.COMPOUND_MARKER_RE, ""),
                    split: "x@y".split(ctx.COMPOUND_MARKER_SPLIT_RE),
                    allowed: "x!@y".replace(ctx.COMPOUND_ALLOWED_RE, ""),
                };
                ctx.applyStaticConstants({
                    compoundMarkerRe: { pattern: "x", flags: "g" },
                    compoundMarkerSplitRe: { pattern: "x" },
                    compoundAllowedRe: { pattern: "x", flags: "g" },
                });
                const poisonedLegacyRegex = {
                    marker: "x@y".replace(ctx.COMPOUND_MARKER_RE, ""),
                    split: "x@y".split(ctx.COMPOUND_MARKER_SPLIT_RE),
                    allowed: "x!@y".replace(ctx.COMPOUND_ALLOWED_RE, ""),
                };
                return { structured, poisonedLegacyRegex };
            } finally {
                ctx.COMPOUND_MARKER_RE = oldMarker;
                ctx.COMPOUND_MARKER_SPLIT_RE = oldSplit;
                ctx.COMPOUND_ALLOWED_RE = oldAllowed;
            }
        })(),
        {
            structured: {
                marker: "xy",
                split: ["x", "y"],
                allowed: "x@y",
            },
            poisonedLegacyRegex: {
                marker: "xy",
                split: ["x", "y"],
                allowed: "x@y",
            },
        }
    );

    const shorthandSourceFrame = ctx.buildCurrentRegexShorthandSourceFrame("nemi");
    const shorthandOperationFrame = ctx.buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame);
    s.eq("current regex shorthand route requires source and operation frames", {
        directOldApi: ctx.getCurrentRegexShorthandParseInput("nemi"),
        framedApi: ctx.getCurrentRegexShorthandParseInput("nemi", shorthandOperationFrame),
        sourceKind: shorthandSourceFrame.kind,
        sourceLayer: shorthandSourceFrame.sourceLayer,
        targetKind: shorthandOperationFrame.targetFrame.kind,
        operationKind: shorthandOperationFrame.kind,
        operationStatus: shorthandOperationFrame.status,
        parsedVerb: ctx.parseVerbInput("nemi").verb,
        parsedDisplay: ctx.parseVerbInput("nemi").displayVerb,
        parsedSourceFrame: ctx.parseVerbInput("nemi").currentRegexShorthandSourceFrame?.kind || "",
        parsedOperationFrame: ctx.parseVerbInput("nemi").currentRegexShorthandOperationFrame?.kind || "",
        canonicalOperationFrame: ctx.parseVerbInput("nemi").canonical.currentRegexShorthandOperationFrame?.kind || "",
    }, {
        directOldApi: "",
        framedApi: "(nemi)",
        sourceKind: "current-regex-shorthand-source-frame",
        sourceLayer: "original-current-regex-input",
        targetKind: "current-regex-shorthand-target-frame",
        operationKind: "andrews-current-regex-shorthand-operation-frame",
        operationStatus: "authorized",
        parsedVerb: "nemi",
        parsedDisplay: "nemi",
        parsedSourceFrame: "current-regex-shorthand-source-frame",
        parsedOperationFrame: "andrews-current-regex-shorthand-operation-frame",
        canonicalOperationFrame: "andrews-current-regex-shorthand-operation-frame",
    });
    s.eq("current regex shorthand blocks slash-boundary shorthand from source frame", {
        blockReason: ctx.buildCurrentRegexShorthandSourceFrame("ta/nemi").blockReason,
        framedResult: ctx.getCurrentRegexShorthandParseInputFromSourceFrame("ta/nemi"),
    }, {
        blockReason: "boundary-present",
        framedResult: "",
    });
    s.eq("current regex shorthand hostile frames cannot authorize target", {
        missingOperation: ctx.getCurrentRegexShorthandParseInput("nemi"),
        changedSource: ctx.getCurrentRegexShorthandParseInput("paka", shorthandOperationFrame),
        contradictoryTarget: ctx.buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame, {
            kind: "current-regex-shorthand-target-frame",
            regexInput: "(paka)",
        }).blockReason,
        missingTarget: ctx.buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame, {
            kind: "not-a-target-frame",
            regexInput: "(nemi)",
        }).blockReason,
        displayPoisoned: ctx.getCurrentRegexShorthandParseInput("nemi", {
            ...shorthandOperationFrame,
            sourceFrame: {
                ...shorthandOperationFrame.sourceFrame,
                stem: "paka",
                surface: "-(paka)",
                result: "-(paka)",
                formulaEcho: "#bad#",
            },
            stem: "paka",
            surface: "-(paka)",
            result: "-(paka)",
            formulaEcho: "#bad#",
        }),
    }, {
        missingOperation: "",
        changedSource: "",
        contradictoryTarget: "contradictory-target-frame",
        missingTarget: "missing-target-frame",
        displayPoisoned: "(nemi)",
    });

    const currentRegexParseSourceFrame = ctx.buildCurrentRegexParseSourceFrame("(qui)-(nemi)");
    const currentRegexParseOperationFrame = ctx.buildCurrentRegexParseOperationFrame(currentRegexParseSourceFrame);
    const currentRegexPoisonedParsed = {
        isValid: true,
        regexValue: "-(paka)",
        transitivity: "transitive",
        outerPieces: [{ type: "valence", value: "ta" }],
        directionalPrefix: "",
        coreText: "paka",
        originalCoreText: "paka",
    };
    const currentRegexContradictoryTargetOperationFrame = {
        ...currentRegexParseOperationFrame,
        targetFrame: {
            ...currentRegexParseOperationFrame.targetFrame,
            coreText: "paka",
        },
    };
    const currentRegexParsedFromOperation = ctx.buildParsedVerbFromMovingTargetInput(
        "(qui)-(nemi)",
        currentRegexPoisonedParsed,
        {
            displayVerb: "poison",
            displayCore: "poison",
            surface: "poison",
            result: "poison",
            formulaEcho: "#poison#",
        },
        currentRegexParseOperationFrame
    );
    const currentRegexParsedFromDirect = ctx.parseVerbInput("(qui)-(nemi)");
    s.eq("current regex parser route requires typed parse operation frames", {
        sourceKind: currentRegexParseSourceFrame.kind,
        operation: currentRegexParseOperationFrame.operationId,
        targetKind: currentRegexParseOperationFrame.targetFrame?.kind || "",
        targetCore: currentRegexParseOperationFrame.targetFrame?.coreText || "",
        missingOperation: ctx.buildParsedVerbFromMovingTargetInput(
            "(qui)-(nemi)",
            ctx.parseMovingTargetRegexInput("(qui)-(nemi)")
        ),
        oldStringParseModel: ctx.buildMovingTargetParsedFromCurrentRegexParseOperationFrame(null),
        poisonedParsedVerb: currentRegexParsedFromOperation?.verb || "",
        poisonedParsedMatrix: currentRegexParsedFromOperation?.exactBaseVerb || "",
        directParsedVerb: currentRegexParsedFromDirect.verb,
        directParsedOperation: currentRegexParsedFromDirect.currentRegexParseOperationFrame?.operationId || "",
        contradictoryTarget: ctx.buildParsedVerbFromMovingTargetInput(
            "(qui)-(nemi)",
            ctx.parseMovingTargetRegexInput("(qui)-(nemi)"),
            null,
            currentRegexContradictoryTargetOperationFrame
        ),
        contradictoryMismatch: ctx.getCurrentRegexParseOperationMismatch(
            "(qui)-(nemi)",
            currentRegexContradictoryTargetOperationFrame
        ),
    }, {
        sourceKind: "current-regex-parse-source-frame",
        operation: "andrews-current-regex-parse",
        targetKind: "current-regex-parse-target-frame",
        targetCore: "nemi",
        missingOperation: null,
        oldStringParseModel: null,
        poisonedParsedVerb: "quinemi",
        poisonedParsedMatrix: "nemi",
        directParsedVerb: "quinemi",
        directParsedOperation: "andrews-current-regex-parse",
        contradictoryTarget: null,
        contradictoryMismatch: "current-regex-parse-contradictory-target-frame",
    });

    const currentRegexValidationSourceFrame = ctx.buildCurrentRegexParseSourceFrame("-(paka)");
    const currentRegexValidationOperationFrame = ctx.buildCurrentRegexParseOperationFrame(currentRegexValidationSourceFrame);
    const currentRegexValidationContradictoryOperationFrame = {
        ...currentRegexValidationOperationFrame,
        targetFrame: {
            ...currentRegexValidationOperationFrame.targetFrame,
            regexValue: "-(nemi)",
        },
    };
    const currentRegexShorthandValidationOperationFrame = ctx.buildCurrentRegexShorthandParseOperationFrameFromRawInput("paka");
    s.eq("current regex validation route consumes typed parse operation frames", {
        recognizedFromOperation: ctx.isCurrentRegexParseOperationFrameRecognized(
            "-(paka)",
            currentRegexValidationOperationFrame
        ),
        missingOperationRecognized: ctx.isCurrentRegexParseOperationFrameRecognized("-(paka)", null),
        contradictoryOperationRecognized: ctx.isCurrentRegexParseOperationFrameRecognized(
            "-(paka)",
            currentRegexValidationContradictoryOperationFrame
        ),
        contradictoryMismatch: ctx.getCurrentRegexParseOperationMismatch(
            "-(paka)",
            currentRegexValidationContradictoryOperationFrame
        ),
        directRecognized: ctx.isRecognizedCurrentRegexValue("-(paka)"),
        directInvalidStructure: ctx.getInvalidVerbStructure("-(paka)"),
        shorthandOperation: currentRegexShorthandValidationOperationFrame?.operationId || "",
        shorthandTargetCore: currentRegexShorthandValidationOperationFrame?.targetFrame?.coreText || "",
        shorthandRecognized: ctx.isRecognizedCurrentRegexValue("paka"),
        shorthandInvalidStructure: ctx.getInvalidVerbStructure("paka"),
    }, {
        recognizedFromOperation: true,
        missingOperationRecognized: false,
        contradictoryOperationRecognized: false,
        contradictoryMismatch: "current-regex-parse-contradictory-target-frame",
        directRecognized: true,
        directInvalidStructure: "",
        shorthandOperation: "andrews-current-regex-parse",
        shorthandTargetCore: "paka",
        shorthandRecognized: true,
        shorthandInvalidStructure: "",
    });

    const disambiguationSourceFrame = ctx.buildVerbDisambiguationSourceFrame(
        "taketza",
        ctx.parseVerbInput("taketza")
    );
    const disambiguationOperationFrame = ctx.buildVerbDisambiguationOperationFrame(disambiguationSourceFrame, {
        isTransitive: false,
    });
    const disambiguationPayload = ctx.buildVerbDisambiguationCandidates("taketza");
    s.eq("verb disambiguation does not invent boundaries from an unlicensed source spelling", {
        sourceKind: disambiguationPayload.sourceFrame?.kind || "",
        sourceLayer: disambiguationPayload.sourceFrame?.sourceLayer || "",
        sourceCore: disambiguationPayload.sourceFrame?.sourceCore || "",
        operationKind: disambiguationPayload.operationFrame?.kind || "",
        operationStatus: disambiguationPayload.operationFrame?.status || "",
        candidateKinds: (disambiguationPayload.operationFrame?.candidateFrames || []).map((frame) => frame.candidateKind),
        suggestions: disambiguationPayload.suggestions.map((entry) => entry.value),
    }, {
        sourceKind: "verb-disambiguation-source-frame",
        sourceLayer: "current-regex-parse-structure",
        sourceCore: "taketza",
        operationKind: "andrews-verb-disambiguation-operation-frame",
        operationStatus: "authorized",
        candidateKinds: [],
        suggestions: [],
    });
    s.eq("verb disambiguation hostile frames cannot authorize candidates", {
        directExecutorMissingOperation: ctx.buildVerbDisambiguationCandidatesFromOperationFrame("taketza").blockReason,
        changedSource: ctx.buildVerbDisambiguationCandidatesFromOperationFrame("paka", disambiguationOperationFrame).blockReason,
        displayPoisonedSuggestions: ctx.buildVerbDisambiguationCandidatesFromOperationFrame("taketza", {
            ...disambiguationOperationFrame,
            sourceFrame: {
                ...disambiguationOperationFrame.sourceFrame,
                stem: "paka",
                surface: "paka",
                result: "paka",
                formulaEcho: "#bad#",
            },
            stem: "paka",
            surface: "paka",
            result: "paka",
            formulaEcho: "#bad#",
        }).suggestions.map((entry) => entry.value),
        slashDisplayBlock: ctx.buildVerbDisambiguationCandidates("ta/nemi").blockReason,
    }, {
        directExecutorMissingOperation: "missing-operation-frame",
        changedSource: "contradictory-source-frame",
        displayPoisonedSuggestions: [],
        slashDisplayBlock: "missing-structured-source-core",
    });

    // applyObj2ToObj1Chain — composes obj2 onto the obj1 chain
    s.eq("obj2 chain: ni + ch = nich", ctx.applyObj2ToObj1Chain("ni", "ch"), "nich");
    s.eq("obj2 chain: empty marker unchanged", ctx.applyObj2ToObj1Chain("ni", ""), "ni");
    s.eq("obj2 chain: empty obj1 + marker", ctx.applyObj2ToObj1Chain("", "mits"), "mits");

    // getParsedSyllableAnalysisTarget — parser-owned syllable normalization
    s.eq("parsedSyllableTarget: wrapped core", ctx.getParsedSyllableAnalysisTarget("(nemi)"), "nemi");
    s.eq(
        "parsedSyllableTarget: assume final vowel",
        ctx.getParsedSyllableAnalysisTarget("nem", { assumeFinalV: true }),
        "nema"
    );

    const noCompound = ctx.parseVerbInput("(nemi)");
    s.eq("compoundAst: plain input returns null", noCompound.compoundAst, null);
    s.eq("compoundAst: plain canonical returns null", noCompound.canonical.compoundAst, null);
    s.eq("ordinaryNnc: plain verb has no fixture classifications", summarizeOrdinaryNncClassifications(noCompound), []);

    const ordinaryKal = ctx.parseVerbInput("kal");
    s.eq(
        "ordinaryNnc: parser does not infer typed Source class from a stored kal fixture",
        summarizeOrdinaryNncClassifications(ordinaryKal),
        []
    );
    s.eq("ordinaryNnc: kal keeps verb parse core fields", {
        verb: ordinaryKal.verb,
        analysisVerb: ordinaryKal.analysisVerb,
        exactBaseVerb: ordinaryKal.exactBaseVerb,
        displayVerb: ordinaryKal.displayVerb,
        displayCore: ordinaryKal.displayCore,
    }, {
        verb: "kal",
        analysisVerb: "kal",
        exactBaseVerb: "kal",
        displayVerb: "kal",
        displayCore: "kal",
    });
    s.eq(
        "ordinaryNnc: kal remains unclassified until typed Source selection",
        summarizeOrdinaryNncClassifications(ordinaryKal),
        []
    );

    const ordinaryShuchit = ctx.parseVerbInput("shuchit");
    s.eq("ordinaryNnc: shuchit keeps verb parse core fields", {
        verb: ordinaryShuchit.verb,
        analysisVerb: ordinaryShuchit.analysisVerb,
        exactBaseVerb: ordinaryShuchit.exactBaseVerb,
        displayVerb: ordinaryShuchit.displayVerb,
        displayCore: ordinaryShuchit.displayCore,
    }, {
        verb: "shuchit",
        analysisVerb: "shuchit",
        exactBaseVerb: "shuchit",
        displayVerb: "shuchit",
        displayCore: "shuchit",
    });
    s.eq(
        "ordinaryNnc: shuchit does not recover noun class from documentary fixture text",
        summarizeOrdinaryNncClassifications(ordinaryShuchit),
        []
    );

    const ordinaryMistun = ctx.parseVerbInput("mistun");
    s.eq(
        "ordinaryNnc: mistun does not acquire animacy from a stored example",
        summarizeOrdinaryNncClassifications(ordinaryMistun),
        []
    );

    const unconfiguredOrdinaryNnc = ctx.parseVerbInput("unconfigurednnc");
    s.eq("ordinaryNnc: unconfigured stem has no fixture classifications", summarizeOrdinaryNncClassifications(unconfiguredOrdinaryNnc), []);

    const earlyAllomorphicEntrada = ctx.buildEntradaGrammarObjectFromCanonicalVerbSpec(
        {
            matrixStem: "mati",
            matrixRuleBase: "mati",
            adjacentEmbed: "",
            transitivity: "transitive",
            valenceTokens: ["mitz"],
            valenceEmbeds: [],
        },
        {
            rawInput: "mitzmati",
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "ati", displayStem: "ati" },
                obj1: { slot: "obj1", token: "m-itz", displayPrefix: "m-itz" },
            },
            sourceFormulaEcho: "#0-0+m-itz(ati)0+0-0#",
        }
    );
    s.eq(
        "#1 entrada stages Lesson 1 allomorphy before formula boundary",
        {
            layerOrderStart: (earlyAllomorphicEntrada?.layerOrder || []).slice(0, 2),
            morphBoundaryKind: earlyAllomorphicEntrada?.morphBoundaryFrame?.kind || "",
            morphBoundaryOrder: earlyAllomorphicEntrada?.morphBoundaryFrame?.evaluationOrder || "",
            objectAllomorphs: earlyAllomorphicEntrada?.morphBoundaryFrame?.allomorphs || [],
            governingObjectMorph: (() => {
                const objectMorph = earlyAllomorphicEntrada?.morphBoundaryFrame?.objectMorphs?.[0] || {};
                return {
                    governingSlotId: objectMorph.governingSlotId || "",
                    governingPath: objectMorph.governingPath || "",
                    valencePosition: objectMorph.valencePosition || "",
                    predicatePositionStatus: objectMorph.predicatePositionStatus || "",
                    sourceSections: objectMorph.sourceSections || [],
                    va1: objectMorph.va1?.morph || "",
                    va2: objectMorph.va2?.morph || "",
                    classicalDyad: objectMorph.governingFrame?.classicalDyad || "",
                    surfaceMorph: objectMorph.governingFrame?.surfaceMorph || "",
                };
            })(),
            candidateObj1: earlyAllomorphicEntrada?.formulaBoundaryFrame?.candidateFormulaSlots?.obj1 || null,
            formulaFixed: earlyAllomorphicEntrada?.formulaBoundaryFrame?.frameFixed === true,
            objectSlotsCovered: earlyAllomorphicEntrada?.formulaBoundaryFrame?.objectSlotsCovered === true,
            formulaEvidenceAuthorizesValence:
                earlyAllomorphicEntrada?.formulaBoundaryFrame?.formulaEvidenceAuthorizesValence,
            formulaEvidenceIsDocumentaryOnly:
                earlyAllomorphicEntrada?.formulaBoundaryFrame?.formulaEvidenceIsDocumentaryOnly,
            valenceFrameFixed: earlyAllomorphicEntrada?.valenceFrame?.frameFixed === true,
            objectFrameToken: earlyAllomorphicEntrada?.objectFrame?.slots?.[0]?.token || "",
            objectFrameFormulaMorph: earlyAllomorphicEntrada?.objectFrame?.slots?.[0]?.formulaMorph || "",
            routeRankingAllowed: earlyAllomorphicEntrada?.routeFrame?.routeRankingAllowed === true,
            functionUseOrder: earlyAllomorphicEntrada?.functionUseFrame?.evaluationOrder || "",
        },
        {
            layerOrderStart: ["morph-boundary-frame", "formula-boundary"],
            morphBoundaryKind: "andrews-lesson-1-entrada-morph-boundary-frame",
            morphBoundaryOrder: "before-formula-boundary",
            objectAllomorphs: [
                {
                    slotId: "obj1",
                    role: "object-marker",
                    surfaceMorph: "mitz",
                    formulaMorph: "m-itz",
                    morphs: ["m", "itz"],
                    allomorphyKind: "lesson-1-morph-boundary-object-prefix",
                    ownerLayer: "object-frame",
                    beforeFormulaBoundary: true,
                },
                {
                    slotId: "predicateStem",
                    role: "predicate-stem",
                    formulaMorph: "ati",
                    surfaceMorph: "mati",
                    allomorphyKind: "lesson-1-morph-boundary-stem-shape",
                    ownerLayer: "stem-frame",
                    beforeFormulaBoundary: true,
                },
            ],
            governingObjectMorph: {
                governingSlotId: "va1-va2",
                governingPath: "dyadic-specific-projective-non-third",
                valencePosition: "va1-va2",
                predicatePositionStatus: "dyadic",
                sourceSections: ["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"],
                va1: "m",
                va2: "itz",
                classicalDyad: "m-itz",
                surfaceMorph: "mitz",
            },
            candidateObj1: {
                slot: "obj1",
                token: "m-itz",
                surfaceToken: "mitz",
                allomorphicFormulaMorph: "m-itz",
                ownerLayer: "object-frame",
            },
            formulaFixed: true,
            objectSlotsCovered: true,
            formulaEvidenceAuthorizesValence: false,
            formulaEvidenceIsDocumentaryOnly: true,
            valenceFrameFixed: false,
            objectFrameToken: "mitz",
            objectFrameFormulaMorph: "m-itz",
            routeRankingAllowed: false,
            functionUseOrder: "last",
        }
    );

    const malformedCompound = ctx.parseVerbInput("ta+(");
    s.eq("compoundAst: malformed compound-like input returns null", malformedCompound.compoundAst, null);
    s.eq("compoundAst: malformed canonical returns null", malformedCompound.canonical.compoundAst, null);
    s.eq("ordinaryNnc: malformed compound-like input has no fixture classifications", summarizeOrdinaryNncClassifications(malformedCompound), []);

    const generatePresent = (verb) => ctx.executeNuclearClauseSurfaceRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: verb,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq("compoundAst: generated Classical xōchi-cui remains direct", generatePresent("(xōchi)-(cui)").surfaceForms, ["nixōchicui"]);
    s.eq("ordinaryNnc: generated Classical cal-cui remains direct", generatePresent("(cal)-(cui)").surfaceForms, ["nicalcui"]);
    s.eq("ordinaryNnc: generated Classical miztōn-cui remains direct", generatePresent("(miztōn)-(cui)").surfaceForms, ["nimiztōncui"]);
    s.eq("compoundAst: generated Classical ix-cui remains direct", generatePresent("-(ix-cui)").surfaceForms, ["niixcui"]);
    s.eq("ordinaryNnc: bare kal generation remains verb-routed", summarizeGenerated(generatePresent("kal")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });
    const bareKalBlocked = generatePresent("kal");
    s.eq("ordinaryNnc: bare kal no-output keeps an LCM blocked frame", {
        ok: bareKalBlocked.ok,
        surface: bareKalBlocked.surface,
        framesIsGrammarFrame: bareKalBlocked.frames === bareKalBlocked.grammarFrame,
        unitKind: bareKalBlocked.frames.unitFrame.unitKind,
        routeStage: bareKalBlocked.frames.routeContract.routeStage,
        generationAllowed: bareKalBlocked.frames.routeContract.generationAllowed,
        diagnosticId: bareKalBlocked.diagnostics[0].id,
    }, {
        ok: false,
        surface: "",
        framesIsGrammarFrame: true,
        unitKind: "verbal-nuclear-clause",
        routeStage: "raw-input-final-vowel-gate",
        generationAllowed: false,
        diagnosticId: "nuclear-clause-surface-final-vowel-gate-blocked",
    });
    s.eq("ordinaryNnc: bare shuchit generation remains verb-routed", summarizeGenerated(generatePresent("shuchit")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });
    s.eq("ordinaryNnc: bare mistun generation remains verb-routed", summarizeGenerated(generatePresent("mistun")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });

    return s;
}

module.exports = { run };
