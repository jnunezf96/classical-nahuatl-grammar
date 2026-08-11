"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P036-L009-F5821058EB", "a-spanish-speaking-molina-user-meets-a-spanish-semantic-system-superimposed-on-nahuatl"],
    ["ACI-P036-L009-F5821058EB-02", "an-english-speaking-molina-user-has-a-greater-semantic-disadvantage-than-a-spanish-speaking-user"],
    ["ACI-P036-L010-75EAF930F4", "an-english-user-of-a-spanish-nahuatl-dictionary-meets-an-additional-interpretive-layer"],
    ["ACI-P036-L010-75EAF930F4-02", "the-english-user-maps-english-meaning-onto-spanish-meaning-already-mapped-onto-nahuatl"],
    ["ACI-P036-L011-AA44D1293C", "remi-simeons-dictionnaire-was-published-in-paris-in-1885"],
    ["ACI-P036-L011-AA44D1293C-02", "simeons-dictionary-translated-molinas-work-into-nahuatl-french-format"],
    ["ACI-P036-L011-AA44D1293C-03", "simeon-added-entries-from-other-texts"],
    ["ACI-P036-L013-943D62DC2E", "an-english-user-of-simeon-maps-english-onto-french-onto-spanish-onto-nahuatl"],
    ["ACI-P036-L013-943D62DC2E-02", "simeons-dictionary-was-translated-into-spanish-in-mexico-city-in-1977"],
    ["ACI-P036-L015-665A4D398F", "the-1977-spanish-translation-of-simeon-is-documented"],
    ["ACI-P036-L015-8DBAC8196B", "an-english-reader-of-the-spanish-simeon-translation-adds-an-english-semantic-projection"],
    ["ACI-P036-L015-8DBAC8196B-02", "every-added-cross-language-semantic-layer-creates-a-possibility-of-misreading"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_dictionary_projection_chain_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({ analysisDomain: "translation-authority-boundary", requestedAnalysisKind: "multilanguage-dictionary-projection-chain-boundary" });
    const result = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.authority.source-language.firewall.enforce", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    s.eq("the dictionary-projection group contains 12 atoms", EXACT_FACTS.length, 12);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized" && value.facts.includes(fact) && value.relations.includes("no-dictionary-projection-chain-can-replace-direct-nahuatl-structure-or-meaning-authority") && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact projection-chain job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
