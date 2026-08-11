"use strict";

const { createSuite } = require("./runner");

function observeSilentSigemeResult(ctx, result) {
    const sigeme = result?.carrierFrame?.selectedCarriers
        ?.find(carrier => carrier.segment === "⎕") || null;
    return Boolean(
        ctx.isClassicalNahuatlTranscriptionFrame(result)
        && result.formula === "#(/n/a⎕)#"
        && result.surface === "na"
        && sigeme?.carrier?.class === "sigeme"
        && sigeme?.carrier?.phoneme === false
        && sigeme?.carrier?.pronounced === false
        && sigeme?.carrier?.surface === ""
    );
}

function run(ctx) {
    const s = createSuite("classical_lesson2_sigeme_result");
    const source = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
        constituents: [{ segments: ["/n/", "a", "⎕"] }],
    });
    const applicationResult = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "orthography:transcription",
        args: [source],
    });
    const result = applicationResult.canonicalResult;

    s.eq("the normal application keeps the sigeme in Formula but not in Result", {
        source: source.authorizationStatus,
        application: applicationResult.authorizationStatus,
        exact: observeSilentSigemeResult(ctx, result),
        formula: result.formula,
        surface: result.surface,
    }, {
        source: "authorized",
        application: "authorized",
        exact: true,
        formula: "#(/n/a⎕)#",
        surface: "na",
    });

    const pronouncedSource = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
        constituents: [{ segments: ["/n/", "a", "/s/"] }],
    });
    const pronouncedResult = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "orthography:transcription",
        args: [pronouncedSource],
    }).canonicalResult;
    s.eq("mutation: replacing silence with a pronounced segment fails the exact job", {
        canonicalMutation: ctx.isClassicalNahuatlTranscriptionFrame(pronouncedResult),
        surface: pronouncedResult.surface,
        exactSigemeObservation: observeSilentSigemeResult(ctx, pronouncedResult),
    }, {
        canonicalMutation: true,
        surface: "naz",
        exactSigemeObservation: false,
    });

    return s;
}

module.exports = { run };

