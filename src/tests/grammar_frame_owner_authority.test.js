"use strict";

const { createSuite } = require("./runner");
const {
    getCanonicalVncTestGrammarFrame,
} = require("./helpers/canonical_grammar_result");

function run(ctx = {}) {
    const s = createSuite("grammar_frame_owner_authority");

    s.eq(
        "public frame and attachment helpers cannot mint grammar authority",
        {
            frame: ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "forged",
                    surfaceForms: ["forged"],
                }),
            }),
            metadata: ctx.attachGrammarMetadataContract({
                supported: true,
                generationAllowed: true,
                surface: "forged",
            }),
            ast: ctx.attachGrammarAstContract({
                supported: true,
                generationAllowed: true,
                surface: "forged",
            }),
        },
        {
            frame: null,
            metadata: null,
            ast: null,
        }
    );

    const genuineFrame = getCanonicalVncTestGrammarFrame(ctx);
    const secondGenuineFrame = getCanonicalVncTestGrammarFrame(ctx);
    const ownerId =
        ctx.getIssuedGrammarFrameOwnerId(genuineFrame);
    const secondOwnerId =
        ctx.getIssuedGrammarFrameOwnerId(secondGenuineFrame);
    const copiedFrame = {
        ...genuineFrame,
    };
    const jsonCopy = JSON.parse(JSON.stringify(genuineFrame));
    const mutableFormulaSlots =
        secondGenuineFrame.resultFrame?.formulaRecord?.formulaSlots;
    const mutationAvailable =
        mutableFormulaSlots
        && typeof mutableFormulaSlots === "object"
        && !Object.isFrozen(mutableFormulaSlots);
    if (mutationAvailable) {
        mutableFormulaSlots.__hostileAuthority = "forged";
    }

    s.eq(
        "only intact owner-issued canonical frames retain projection authority",
        {
            genuineIssued: ctx.isIssuedGrammarFrame(genuineFrame),
            genuinePairs:
                ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                    genuineFrame
                ).length,
            ownerInspectorInstalled:
                typeof ctx.getIssuedGrammarFrameOwnerId === "function",
            ownerId,
            ownerIdStable:
                ownerId === secondOwnerId
                && ownerId
                    === ctx.getIssuedGrammarFrameOwnerId(genuineFrame),
            copiedIssued: ctx.isIssuedGrammarFrame(copiedFrame),
            copiedPairs:
                ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                    copiedFrame
                ).length,
            jsonIssued: ctx.isIssuedGrammarFrame(jsonCopy),
            jsonPairs:
                ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                    jsonCopy
                ).length,
            mutationAvailable,
            mutatedIssued:
                ctx.isIssuedGrammarFrame(secondGenuineFrame),
            mutatedPairs:
                ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                    secondGenuineFrame
                ).length,
        },
        {
            genuineIssued: true,
            genuinePairs: 1,
            ownerInspectorInstalled: true,
            ownerId: "src/core/generation/engine.mjs",
            ownerIdStable: true,
            copiedIssued: false,
            copiedPairs: 0,
            jsonIssued: false,
            jsonPairs: 0,
            mutationAvailable: true,
            mutatedIssued: false,
            mutatedPairs: 0,
        }
    );

    s.eq(
        "retired raw composer authority helpers are absent",
        [
            "parseComposerOrdinaryNncAnalogueInput",
            "normalizeComposerOrdinaryNncNounClass",
            "getComposerOrdinaryNncConnectorSurface",
            "formatComposerOrdinaryNncAnalogueInput",
            "stripComposerOrdinaryNncConnectorFromStem",
            "buildComposerOrdinaryNncInputBundle",
            "getClassicalCanvasBuiltSourceFrame",
            "applyClassicalCanvasSourcePartsAuthorityFromWholeStem",
            "clearClassicalCanvasSourcePartsAuthority",
        ].map((name) => ({
            name,
            installed: typeof ctx[name] === "function",
        })),
        [
            "parseComposerOrdinaryNncAnalogueInput",
            "normalizeComposerOrdinaryNncNounClass",
            "getComposerOrdinaryNncConnectorSurface",
            "formatComposerOrdinaryNncAnalogueInput",
            "stripComposerOrdinaryNncConnectorFromStem",
            "buildComposerOrdinaryNncInputBundle",
            "getClassicalCanvasBuiltSourceFrame",
            "applyClassicalCanvasSourcePartsAuthorityFromWholeStem",
            "clearClassicalCanvasSourcePartsAuthority",
        ].map((name) => ({
            name,
            installed: false,
        }))
    );

    return s;
}

module.exports = { run };
