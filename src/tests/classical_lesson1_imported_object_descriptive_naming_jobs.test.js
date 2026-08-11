"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P035-L038-0767A17839", "molina-often-represents-imported-spanish-objects-and-ideas-with-descriptive-nahuatl-formations"],
    ["ACI-P035-L038-0767A17839-02", "petlacalmecahuehueh-is-used-for-the-imported-object-clavichord"],
    ["ACI-P035-L038-0767A17839-03", "petlacalmecahuehueh-compositionally-describes-an-upright-stringed-drum-shaped-like-a-wickerwork-coffer"],
    ["ACI-P035-L038-0767A17839-04", "acalcuachpamitl-is-used-for-the-imported-object-sail"],
    ["ACI-P035-L038-0767A17839-05", "acalcuachpamitl-compositionally-describes-a-large-cotton-blanket-shaped-banner-for-a-boat"],
    ["ACI-P035-L038-0767A17839-06", "the-clavichord-and-sail-entries-witness-descriptive-naming-without-limiting-meaning-to-dictionary-attestation"],
    ["ACI-P035-L042-9432A1A3F1", "the-descriptive-imported-item-entries-were-probably-coined-by-native-nahuatl-speakers"],
    ["ACI-P035-L042-9432A1A3F1-02", "those-probable-coinages-named-newly-encountered-european-objects-and-concepts"],
    ["ACI-P035-L042-9432A1A3F1-03", "molina-prefers-some-imported-item-formations-over-strictly-native-cultural-vocabulary"],
    ["ACI-P035-L042-9432A1A3F1-04", "the-disfavored-native-items-especially-concern-colonially-targeted-cultural-lifeways"],
    ["ACI-P035-L042-9432A1A3F1-05", "molina-includes-mahomacalli-with-the-translation-moorish-mosque"],
    ["ACI-P035-L042-9432A1A3F1-06", "molina-includes-mahomatlatlatlauhtilizcalli-with-the-translation-moorish-mosque"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_imported_object_descriptive_naming_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "imported-object-descriptive-naming-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;
    s.eq("the imported-object naming group contains 12 atoms", EXACT_FACTS.length, 12);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized"
            && value.facts.includes(fact)
            && value.relations.includes("dictionary-witnesses-and-imported-object-glosses-cannot-replace-compositional-nahuatl-analysis-or-whitelist-lexical-meaning")
            && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact descriptive-naming job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({
            ...result,
            facts: result.facts.filter(value => value !== fact),
        }));
    }
    return s;
}

module.exports = { run };
