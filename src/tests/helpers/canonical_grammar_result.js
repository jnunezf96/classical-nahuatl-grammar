"use strict";

function buildCanonicalVncTestResult(ctx, {
    stem = "miqui",
    tense = "preterito",
    derivationMode = ctx.DERIVATION_MODE.nonactive,
    voiceMode = ctx.VOICE_MODE.passive,
    pers1 = "",
    pers2 = "",
} = {}) {
    const posicionesFormula = {
        pers1,
        obj1: "",
        tronco: stem,
        pers2,
        num2: pers2,
        tiempo: tense,
    };
    return ctx.executeNuclearClauseSurfaceRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode,
                derivationType: ctx.DERIVATION_TYPE.direct,
                voiceMode,
                tiempo: tense,
                posicionesFormula,
            },
        },
        posicionesFormula,
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
}

function getCanonicalVncTestGrammarFrame(ctx, options = {}) {
    const result = buildCanonicalVncTestResult(ctx, options);
    let grammarFrame = result?.grammarFrame || result?.frames || null;
    let pairs = grammarFrame
        ? ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
            grammarFrame
        )
        : [];
    if (!grammarFrame || !ctx.isIssuedGrammarFrame(grammarFrame) || !pairs.length) {
        const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame(
            "cal",
            {
                subject: "3sg",
                nounClass: "zero",
                animacy: "animate",
            }
        );
        const receipt = ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            outputKind: "scalar",
            args: [
                nnc.nncSlotFrame,
                {
                    sentenceType: "assertion",
                    polarity: "positive",
                },
            ],
        });
        grammarFrame =
            receipt.canonicalResult?.grammarFrame
            || receipt.canonicalResult?.frames
            || null;
        pairs = grammarFrame
            ? ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                grammarFrame
            )
            : [];
    }
    if (!grammarFrame || !ctx.isIssuedGrammarFrame(grammarFrame) || !pairs.length) {
        const particleResult =
            ctx.requestClassicalParticleResult("l3-ca");
        grammarFrame =
            particleResult?.grammarFrame
            || particleResult?.frames
            || null;
        pairs = grammarFrame
            ? ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                grammarFrame
            )
            : [];
    }
    if (
        !grammarFrame
        || !ctx.isIssuedGrammarFrame(grammarFrame)
        || !pairs.length
    ) {
        throw new Error(
            "canonical VNC test fixture did not produce an owner-issued canonical grammar frame"
        );
    }
    return grammarFrame;
}

module.exports = {
    buildCanonicalVncTestResult,
    getCanonicalVncTestGrammarFrame,
};
