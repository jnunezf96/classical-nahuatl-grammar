"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P033-L027-B424119E0E", "english-widower-can-be-paraphrased-as-entering-a-male-counterpart-condition"],
    ["ACI-P033-L027-B424119E0E-02", "english-widower-carries-a-cultural-expectation-that-husbands-usually-die-first"],
    ["ACI-P033-L027-B424119E0E-03", "english-widower-and-onicihuamic-share-only-the-lowest-common-event-denominator"],
    ["ACI-P033-L032-B9CC020337", "translation-discards-language-specific-culturally-controlled-experience"],
    ["ACI-P033-L034-B151411339", "translation-replaces-source-nuances-with-target-language-nuances"],
    ["ACI-P033-L034-B151411339-02", "translation-replaces-source-connotations-with-target-language-connotations"],
    ["ACI-P033-L034-B151411339-03", "translation-replaces-source-implications-with-target-language-implications"],
    ["ACI-P033-L034-B151411339-04", "translation-replaces-source-suppositions-with-target-language-suppositions"],
    ["ACI-P033-L034-B151411339-05", "native-speakers-understand-unsaid-meaning-dimensions-without-conscious-analysis"],
    ["ACI-P033-L034-B151411339-06", "native-speakers-use-unsaid-meaning-while-producing-and-interpreting-explicit-speech"],
    ["ACI-P033-L034-B151411339-07", "translation-mirage-conceals-replaced-meaning-dimensions"],
    ["ACI-P033-L037-38C616CDFE", "translation-mirage-conceals-source-language-cultural-and-semantic-differences"],
]);

function exact(result, fact) {
    return result.authorizationStatus === "authorized"
        && result.ownerExecutionCompleted === true
        && result.generationAllowed === false
        && result.facts.includes(fact)
        && result.restrictions.includes(
            "translation-gloss-and-reader-interpretation-cannot-authorize-nahuatl-grammar"
        );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_translation_loss_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "source-meaning-loss-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;

    s.eq("the source-meaning-loss group contains 12 atoms", EXACT_FACTS.length, 12);
    for (const [atomId, fact] of EXACT_FACTS) {
        s.ok(`${atomId} performs its exact protection job`, exact(result, fact));
        const mutation = {
            ...result,
            facts: result.facts.filter(value => value !== fact),
        };
        s.ok(`mutation:${atomId} fails when its exact protection is removed`, !exact(mutation, fact));
    }

    const copied = ctx.evaluateTranslationAuthorityBoundary(
        Object.freeze({ ...source })
    );
    s.eq("a copied description cannot become grammar authority", [
        copied.authorizationStatus,
        copied.blockReason,
    ], [
        "blocked",
        "owner-issued-translation-authority-boundary-source-required",
    ]);
    return s;
}

module.exports = { run };
