"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P035-L014-0115D6F835", "translation-and-foreign-language-acquisition-move-in-opposite-directions"],
    ["ACI-P035-L014-FCAB9E362B", "translation-accommodates-foreign-material-to-the-readers-framework"],
    ["ACI-P035-L015-C657D40829", "language-acquisition-reorients-the-learner-toward-the-foreign-language-framework"],
    ["ACI-P035-L016-8600EE4A16", "language-learning-is-not-only-a-search-for-how-to-say-translation-equivalents"],
    ["ACI-P035-L016-8600EE4A16-02", "language-learning-pursues-anthropological-understanding-within-language-and-culture"],
    ["ACI-P035-L018-0AA0C59217", "foreign-language-study-pursues-meaning-rather-than-translation"],
    ["ACI-P035-L020-DA9CC6C354", "translation-equivalence-is-an-initial-access-instrument"],
    ["ACI-P035-L020-DA9CC6C354-02", "translation-equivalence-is-superficial"],
    ["ACI-P035-L020-DA9CC6C354-03", "translation-equivalence-can-be-treacherous-or-misleading"],
    ["ACI-P035-L020-DA9CC6C354-04", "the-learner-must-move-toward-fuller-foreign-meaning"],
    ["ACI-P035-L021-EA96211063", "moving-into-fuller-foreign-meaning-is-difficult"],
    ["ACI-P035-L021-EA96211063-02", "learners-often-overestimate-their-success-in-reaching-foreign-meaning"],
    ["ACI-P035-L021-EA96211063-03", "translation-mirage-contributes-to-that-overestimation"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_language_acquisition_reorientation_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({ analysisDomain: "translation-authority-boundary", requestedAnalysisKind: "language-acquisition-reorientation-boundary" });
    const result = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.authority.source-language.firewall.enforce", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    s.eq("the language-acquisition group contains 13 atoms", EXACT_FACTS.length, 13);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized" && value.facts.includes(fact) && value.relations.includes("translation-equivalence-can-aid-entry-but-cannot-become-source-language-grammar-or-meaning-authority") && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact learning-boundary job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
