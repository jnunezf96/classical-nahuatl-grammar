"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P035-L034-0B9811FA50", "classical-nahuatl-dictionaries-are-particularly-disappointing"],
    ["ACI-P035-L034-56025A8250", "molinas-vocabulario-is-treated-as-the-premier-classical-nahuatl-dictionary"],
    ["ACI-P035-L034-56025A8250-02", "alonso-de-molina-authored-the-vocabulario"],
    ["ACI-P035-L034-56025A8250-03", "the-vocabulario-was-published-in-mexico-from-1555-through-1571"],
    ["ACI-P035-L034-56025A8250-04", "one-vocabulario-section-runs-from-spanish-to-nahuatl"],
    ["ACI-P035-L034-56025A8250-05", "the-other-vocabulario-section-runs-from-nahuatl-to-spanish"],
    ["ACI-P035-L036-6EC5060031", "the-vocabulario-was-partly-intended-to-subdue-the-nahuatl-speaking-population"],
    ["ACI-P035-L036-6EC5060031-02", "its-colonial-method-substituted-sermonizing-for-armed-battle"],
    ["ACI-P035-L036-6EC5060031-03", "that-purpose-especially-prejudices-the-vocabulario"],
    ["ACI-P035-L036-6EC5060031-04", "the-vocabulario-frequently-filters-nahuatl-categories-through-spanish-categories"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_dictionary_source_colonial_filter_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "dictionary-source-colonial-filter-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;
    s.eq("the dictionary-source group contains 10 atoms", EXACT_FACTS.length, 10);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized"
            && value.facts.includes(fact)
            && value.relations.includes("dictionary-direction-history-prestige-and-colonial-purpose-cannot-authorize-spanish-categories-as-nahuatl-grammar")
            && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact dictionary-source job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({
            ...result,
            facts: result.facts.filter(value => value !== fact),
        }));
    }
    return s;
}

module.exports = { run };
