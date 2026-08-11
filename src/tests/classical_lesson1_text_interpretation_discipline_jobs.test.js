"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P038-L023-4B0DCB91CE", "classical-nahuatl-is-the-language-of-a-disappeared-civilization"],
    ["ACI-P038-L023-4B0DCB91CE-02", "studying-classical-nahuatl-serves-understanding-that-civilization"],
    ["ACI-P038-L023-4B0DCB91CE-03", "a-cultural-account-based-on-faulty-readings-is-unreliable-or-fictional"],
    ["ACI-P038-L023-4B0DCB91CE-04", "pedagogical-motivation-does-not-authorize-or-block-a-grammar-result"],
    ["ACI-P038-L024-A664F9A770", "interpretation-based-on-faulty-textual-readings-is-not-grounded-in-the-texts"],
    ["ACI-P038-L026-D3B3AB0419", "understanding-the-culture-requires-time-and-energy-to-master-classical-nahuatl"],
    ["ACI-P038-L026-D3B3AB0419-02", "some-past-interpreters-did-not-master-the-language-before-interpreting-the-culture"],
    ["ACI-P038-L028-B157263C0B", "classical-nahuatl-interpretation-must-resist-aversion-to-grammar"],
    ["ACI-P038-L028-B157263C0B-02", "classical-nahuatl-interpretation-must-resist-linguicentrism"],
    ["ACI-P038-L028-B157263C0B-03", "classical-nahuatl-interpretation-must-resist-translation-mirage"],
    ["ACI-P038-L028-B157263C0B-04", "classical-nahuatl-interpretation-must-resist-ethnocentrism"],
    ["ACI-P038-L028-B157263C0B-05", "a-personal-interpretation-cannot-be-forced-onto-a-text-to-support-an-invention"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_text_interpretation_discipline_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "classical-text-interpretation-discipline-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;

    s.eq("the text-interpretation group contains 12 atoms", EXACT_FACTS.length, 12);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized"
            && value.facts.includes(fact)
            && value.relations.includes("only-source-grounded-nahuatl-analysis-may-support-interpretation-and-the-pedagogical-purpose-itself-never-selects-grammar")
            && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact interpretation-safety job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact interpretation rule is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
