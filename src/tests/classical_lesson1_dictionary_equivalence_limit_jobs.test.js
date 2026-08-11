"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P035-L023-D81F9676C8", "a-wintu-speakers-english-equivalent-rarely-revealed-the-exact-wintu-meaning"],
    ["ACI-P035-L023-D81F9676C8-02", "the-wintu-observation-is-cited-to-dorothy-lee-freedom-and-culture-page-126"],
    ["ACI-P035-L026-ADF0ACC476", "classical-nahuatl-translation-equivalence-is-difficult-to-reach"],
    ["ACI-P035-L026-ADF0ACC476-02", "classical-nahuatl-meaning-beyond-equivalence-is-still-more-difficult"],
    ["ACI-P035-L027-C7717C8419", "no-living-native-speakers-of-classical-nahuatl-are-available"],
    ["ACI-P035-L027-C7717C8419-02", "no-living-native-informants-can-supply-direct-classical-nahuatl-judgments"],
    ["ACI-P035-L028-A584272863", "interpretation-therefore-resorts-to-foreign-language-dictionaries"],
    ["ACI-P035-L028-A584272863-02", "dictionary-reliance-is-inherently-unsatisfactory-because-translation-is-deficient"],
    ["ACI-P035-L030-41F8979B14", "a-dictionary-supplies-equivalents-not-direct-lexical-meaning"],
    ["ACI-P035-L030-41F8979B14-02", "dictionary-equivalents-reflect-the-compilers-interests"],
    ["ACI-P035-L030-41F8979B14-03", "dictionary-equivalents-reflect-the-compilers-cultural-worldview"],
    ["ACI-P035-L030-41F8979B14-04", "translated-renderings-are-not-source-lexical-definitions"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_dictionary_equivalence_limit_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({ analysisDomain: "translation-authority-boundary", requestedAnalysisKind: "dictionary-equivalence-limit-boundary" });
    const result = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.authority.source-language.firewall.enforce", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    s.eq("the dictionary-equivalence group contains 12 atoms", EXACT_FACTS.length, 12);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized" && value.facts.includes(fact) && value.relations.includes("absence-of-native-informants-and-use-of-dictionaries-neither-create-nor-block-a-grammar-result") && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact dictionary-boundary job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
