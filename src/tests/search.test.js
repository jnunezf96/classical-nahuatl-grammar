"use strict";

/**
 * Tests for src/core/search/runtime.mjs
 * Covers: search normalization, nominal mode detection, and search-plan helpers.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("search");
    const summarizeOrdinaryNncSearchCandidate = (candidate) => candidate && ({
        kind: candidate.kind,
        candidateKind: candidate.candidateKind,
        supported: candidate.supported,
        input: candidate.input,
        base: candidate.base,
        trimmedBase: candidate.trimmedBase,
        normalizedInput: candidate.normalizedInput,
        fixture: candidate.fixture && {
            id: candidate.fixture.id,
            stem: candidate.fixture.stem,
            lemma: candidate.fixture.lemma,
            nounClass: candidate.fixture.nounClass,
            animacy: candidate.fixture.animacy,
        },
        entries: candidate.paradigmSet && Array.isArray(candidate.paradigmSet.entries)
            ? candidate.paradigmSet.entries.map((entry) => entry.result)
            : [],
        diagnostics: candidate.paradigmSet ? candidate.paradigmSet.diagnostics : [],
    });

    const split = ctx.splitSearchInput("nemi");
    s.eq("splitSearchInput keeps raw base", split.base, "nemi");
    s.no("splitSearchInput has no query by default", split.hasQuery);

    const parts = ctx.getSearchParts("  nemi  ");
    s.eq("getSearchParts trims base separately", parts.trimmedBase, "nemi");
    s.eq("getSearchInputBase returns base only", ctx.getSearchInputBase("nemi"), "nemi");
    const currentRegexMetadataSourceFrame = ctx.buildCurrentRegexParseSourceFrame("(qui)-(nemi)");
    const currentRegexMetadataOperationFrame = ctx.buildCurrentRegexParseOperationFrame(currentRegexMetadataSourceFrame);
    const currentRegexMetadataContradictoryOperationFrame = {
        ...currentRegexMetadataOperationFrame,
        targetFrame: {
            ...currentRegexMetadataOperationFrame.targetFrame,
            regexValue: "-(paca)",
        },
    };
    s.eq("raw input regex metadata consumes typed parse operation target", {
        direct: (() => {
            const metadata = ctx.getRawInputTiCausativeMetadata("(qui)-(nemi)");
            return {
                normalizedInput: metadata.normalizedInput,
                displayCore: metadata.displayCore,
                displayVerb: metadata.displayVerb,
                operation: metadata.currentRegexParseOperationFrame?.operationId || "",
                slots: metadata.semanticObjectSlotCount,
            };
        })(),
        fromOperation: (() => {
            const metadata = ctx.getRawInputTiCausativeMetadataFromParseOperationFrame(
                "(qui)-(nemi)",
                currentRegexMetadataOperationFrame
            );
            return {
                normalizedInput: metadata?.normalizedInput || "",
                displayCore: metadata?.displayCore || "",
                operation: metadata?.currentRegexParseOperationFrame?.operationId || "",
            };
        })(),
        missingOperation: ctx.getRawInputTiCausativeMetadataFromParseOperationFrame("(qui)-(nemi)", null),
        oldParsedPayload: ctx.getRawInputTiCausativeMetadataFromParseOperationFrame(
            "(qui)-(nemi)",
            ctx.parseMovingTargetRegexInput("(qui)-(nemi)")
        ),
        contradictoryOperation: ctx.getRawInputTiCausativeMetadataFromParseOperationFrame(
            "(qui)-(nemi)",
            currentRegexMetadataContradictoryOperationFrame
        ),
    }, {
        direct: {
            normalizedInput: "(qui)-(nemi)",
            displayCore: "nemi",
            displayVerb: "(qui)-(nemi)",
            operation: "andrews-current-regex-parse",
            slots: 1,
        },
        fromOperation: {
            normalizedInput: "(qui)-(nemi)",
            displayCore: "nemi",
            operation: "andrews-current-regex-parse",
        },
        missingOperation: null,
        oldParsedPayload: null,
        contradictoryOperation: null,
    });
    s.eq("ordinaryNnc: search candidate helper is exported", typeof ctx.getOrdinaryNncSearchCandidateInfo, "function");
    s.eq("ordinaryNnc: search candidate boolean helper is exported", typeof ctx.isOrdinaryNncSearchCandidate, "function");
    s.eq(
        "ordinaryNnc: the removed fixture lane cannot classify Classical stems or legacy spellings",
        ["cal", "xōchitl", "miztōn", "unconfigured-nnc"].map((value) => [
            summarizeOrdinaryNncSearchCandidate(
                ctx.getOrdinaryNncSearchCandidateInfo(value)
            ),
            ctx.isOrdinaryNncSearchCandidate(value),
        ]),
        [
            [null, false],
            [null, false],
            [null, false],
            [null, false],
        ]
    );
    s.eq("ordinaryNnc: search input base remains unchanged", ctx.getSearchInputBase(" xōchitl "), " xōchitl ");
    s.eq("ordinaryNnc: search parts trimming remains unchanged", ctx.getSearchParts(" xōchitl ").trimmedBase, "xōchitl");
    s.eq("ordinaryNnc: search query info remains null", ctx.getSearchQueryInfo("xōchitl"), null);
    s.no("ordinaryNnc: a nounstem does not become search mode", ctx.isSearchModeInput("xōchitl"));

    s.ok("template-only base detects underscore shell", ctx.isComposerTemplateOnlyBaseValue("-_tmpl"));
    s.no("template-only base rejects real verb", ctx.isComposerTemplateOnlyBaseValue("nemi"));

    s.eq(
        "normalizeConjugationSearchText strips punctuation",
        ctx.normalizeConjugationSearchText("Ne-mi?!"),
        "nemi"
    );
    const originalSearchLanguageProfileGetter = ctx.getActiveLanguageProfileMode;
    try {
        ctx.getActiveLanguageProfileMode = () => ctx.LANGUAGE_PROFILE_MODE.classicalNahuatl;
        s.eq(
            "Classical conjugation search preserves macron root letters",
            ctx.normalizeConjugationSearchText("zō-mā?!"),
            "zōmā"
        );
        ctx.getActiveLanguageProfileMode = () => ctx.LANGUAGE_PROFILE_MODE.nawatPipil;
        s.eq(
            "Obsolete Nawat/Pipil profile state cannot switch the fixed Classical search runtime",
            ctx.normalizeConjugationSearchText("zō-mā?!"),
            "zōmā"
        );
    } finally {
        ctx.getActiveLanguageProfileMode = originalSearchLanguageProfileGetter;
    }
    s.ok("matchesSearchVariant supports contains", ctx.matchesSearchVariant("quinemi", "nemi", "contains"));
    s.ok("matchesSearchVariant supports starts", ctx.matchesSearchVariant("quinemi", "qui", "starts"));
    s.ok("matchesSearchVariant supports ends", ctx.matchesSearchVariant("quinemi", "nemi", "ends"));
    s.no("matchesSearchVariant exact mode requires full equality", ctx.matchesSearchVariant("quinemi", "nemi", "exact"));

    s.ok("isNominalTenseMode accepts sustantivo", ctx.isNominalTenseMode(ctx.TENSE_MODE.sustantivo));
    s.no("isNominalTenseMode rejects verbo", ctx.isNominalTenseMode(ctx.TENSE_MODE.verbo));

    const groups = ctx.getSearchModeGroups(ctx.TENSE_MODE.verbo);
    s.eq("getSearchModeGroups returns tense first for verbo", groups[0], ctx.CONJUGATION_GROUPS.tense);
    s.eq("getSearchModeGroups includes universal for verbo", groups[1], ctx.CONJUGATION_GROUPS.universal);

    const optionPlan = ctx.buildSearchOptionPlan(["a", "b", "c"], "b", "a");
    s.eq("buildSearchOptionPlan preserves stored selection first", optionPlan[0], "b");
    s.eq("buildSearchOptionPlan keeps remaining order", optionPlan[1], "a");

    s.eq("getNounObjectSlotStateKey appends indirect suffix", ctx.getNounObjectSlotStateKey("noun|x", "object2"), "noun|x|indirect");
    s.eq("getNounObjectSlotStateKey leaves primary object key untouched", ctx.getNounObjectSlotStateKey("noun|x", "object"), "noun|x");

    s.eq("getDefaultPossessorForTense defaults calificativo-instrumentivo to i", ctx.getDefaultPossessorForTense("calificativo-instrumentivo"), "i");
    s.eq("getDefaultPossessorForTense defaults others to empty", ctx.getDefaultPossessorForTense("agentivo"), "");

    const selectionModels = ctx.buildNounObjectSlotSelectionModels([
        {
            id: "object",
            activeId: "ta",
            toggleValues: ["ta", "te"],
        },
        {
            id: "object2",
            activeId: ctx.OBJECT_TOGGLE_ALL,
            toggleValues: ["ta", "te"],
        },
    ]);
    const seenSelections = [];
    ctx.iterateNounObjectSlotSelections(selectionModels, (selectedBySlot) => {
        seenSelections.push(`${selectedBySlot.object}|${selectedBySlot.object2}`);
    });
    s.eq("iterateNounObjectSlotSelections emits first combined selection", seenSelections[0], "ta|ta");
    s.eq("iterateNounObjectSlotSelections emits second combined selection", seenSelections[1], "ta|te");

    return s;
}

module.exports = { run };
