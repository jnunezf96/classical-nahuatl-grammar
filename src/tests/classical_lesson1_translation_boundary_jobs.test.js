"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        args,
        languageId: "classical-nahuatl",
    }).canonicalResult;
}

const EXACT_FACTS = Object.freeze([
    ["ACI-P032-L041-7040FF94C3", "reading-a-translation-can-create-an-illusion-of-direct-contact-with-the-source"],
    ["ACI-P032-L042-15726C4274", "translation-mirage-can-be-more-misleading-than-an-optical-mirage"],
    ["ACI-P033-L002-4D51F4A555", "a-reader-without-the-source-language-cannot-independently-detect-a-gross-mistranslation"],
    ["ACI-P033-L003-4BF4015CE3", "a-reader-without-nahuatl-cannot-independently-detect-the-criticized-cantares-errors"],
    ["ACI-P033-L003-4BF4015CE3-02", "bierhorst-repeated-swans-and-red-swans-are-checked-as-forced-unjustified-renderings"],
    ["ACI-P033-L006-BE4F0A58EC", "forced-source-misreadings-can-produce-unjustified-translations"],
    ["ACI-P033-L007-E77CBBC23D", "translator-tact-does-not-remove-the-translation-authority-boundary"],
    ["ACI-P033-L007-E77CBBC23D-02", "translation-presents-interpretive-choices-at-every-step"],
    ["ACI-P033-L007-E77CBBC23D-03", "a-translation-reader-cannot-independently-verify-every-interpretive-choice"],
    ["ACI-P033-L010-66D17133B2", "a-translator-translates-an-interpretation-not-the-source-text-directly"],
    ["ACI-P033-L010-66D17133B2-02", "interpretation-is-conditioned-by-the-interpreters-historical-time"],
    ["ACI-P033-L010-66D17133B2-03", "interpretation-is-conditioned-by-the-interpreters-society-and-culture"],
    ["ACI-P033-L010-66D17133B2-04", "interpretation-is-conditioned-by-the-interpreters-personality"],
    ["ACI-P033-L010-66D17133B2-05", "interpretation-is-conditioned-by-the-structure-of-the-interpreters-language"],
    ["ACI-P033-L010-66D17133B2-06", "interpretation-is-conditioned-by-the-interpreters-mastery-of-that-language"],
    ["ACI-P033-L010-66D17133B2-07", "interpretation-is-conditioned-by-the-interpreters-source-language-knowledge"],
    ["ACI-P033-L015-D2ABDEFA57", "translation-converts-alien-structure-into-familiar-structure"],
    ["ACI-P033-L015-C59E77BD11", "translation-reinterprets-foreign-phonology-grammar-and-semantics-through-familiar-systems"],
    ["ACI-P033-L017-4ED3EBFF2C", "languages-are-mutually-translatable-only-at-some-level"],
    ["ACI-P033-L017-4ED3EBFF2C-02", "an-utterance-can-have-an-analogue-without-having-identical-language-specific-structure"],
    ["ACI-P033-L017-4ED3EBFF2C-03", "target-language-perspective-biases-the-selected-analogue"],
    ["ACI-P033-L020-ED59A3D7F9", "translation-necessarily-loses-some-native-source-meaning-quality"],
]);

function exactJob(result, fact) {
    return result.authorizationStatus === "authorized"
        && result.ownerExecutionCompleted === true
        && result.generationAllowed === false
        && result.facts.includes(fact)
        && result.restrictions.includes(
            "translation-gloss-and-reader-interpretation-cannot-authorize-nahuatl-grammar"
        );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_translation_boundary_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "translation-mirage-boundary",
    });
    const result = execute(ctx, "classical.authority.source-language.firewall.enforce", [source]);

    s.eq("the opening translation-mirage group contains 22 atoms", EXACT_FACTS.length, 22);
    for (const [atomId, fact] of EXACT_FACTS) {
        s.ok(`${atomId} performs its exact protection or check job`, exactJob(result, fact));
        const mutation = Object.freeze({
            ...result,
            facts: Object.freeze(result.facts.map(value => value === fact ? `broken-${value}` : value)),
        });
        s.ok(`mutation:${atomId} fails when its exact boundary fact is broken`, !exactJob(mutation, fact));
    }

    const copiedSource = Object.freeze({ ...source });
    const copiedResult = ctx.evaluateTranslationAuthorityBoundary(copiedSource);
    s.eq("copied translation material cannot become an owner-issued grammar source", {
        status: copiedResult.authorizationStatus,
        reason: copiedResult.blockReason,
        generated: copiedResult.generationAllowed,
    }, {
        status: "blocked",
        reason: "owner-issued-translation-authority-boundary-source-required",
        generated: false,
    });

    const translationAsConcept = ctx.evaluateClassicalGrammarConcept(
        ctx.buildClassicalGrammarConceptSource({
            domain: "linguistic-element",
            selection: "English translation",
        })
    );
    s.eq("normal concept input rejects translation as grammar authority", [
        translationAsConcept.authorizationStatus,
        translationAsConcept.blockReason,
    ], ["blocked", "owner-issued-concept-source-required"]);

    return s;
}

module.exports = { run };
