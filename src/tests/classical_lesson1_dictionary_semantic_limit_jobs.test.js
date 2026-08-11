"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P038-L010-A09A9FA9F1", "foreign-dictionaries-can-create-an-illusion-of-clear-cut-equivalence"],
    ["ACI-P038-L010-A09A9FA9F1-02", "most-source-and-target-language-correspondences-are-ill-fitting"],
    ["ACI-P038-L010-A09A9FA9F1-03", "most-source-and-target-language-correspondences-overlap-only-partly"],
    ["ACI-P038-L013-C19BF92264", "calli-is-ordinarily-rendered-as-house"],
    ["ACI-P038-L013-C19BF92264-02", "house-is-only-a-sometimes-equivalent-rendering-of-calli"],
    ["ACI-P038-L013-C19BF92264-03", "calpolli-can-be-rendered-as-big-house-or-town-quarter"],
    ["ACI-P038-L013-C19BF92264-04", "acalli-can-be-rendered-as-dugout-canoe-or-boat"],
    ["ACI-P038-L013-C19BF92264-05", "chinan-calli-can-be-rendered-as-a-hedge-enclosure"],
    ["ACI-P038-L013-C19BF92264-06", "tzoncalli-can-be-rendered-as-scalp-hair-or-wig"],
    ["ACI-P038-L013-C19BF92264-07", "dictionary-limits-make-morphology-morphosyntax-and-syntax-essential"],
    ["ACI-P038-L013-C19BF92264-08", "grammar-does-not-remove-the-limits-of-dictionaries"],
    ["ACI-P038-L013-C19BF92264-09", "grammar-enables-the-fullest-use-of-available-source-material"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_dictionary_semantic_limit_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "dictionary-equivalent-semantic-limit-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;

    s.eq("the dictionary semantic-limit group contains 12 atoms", EXACT_FACTS.length, 12);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized"
            && value.facts.includes(fact)
            && value.relations.includes("the-canonical-nahuatl-structure-and-context-select-meaning-while-no-single-dictionary-equivalent-defines-the-source-item")
            && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact dictionary-meaning job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact dictionary-meaning fact is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
