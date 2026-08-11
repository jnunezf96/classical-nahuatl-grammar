"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P037-L021-4CCD597B87", "dictionary-untrustworthiness-extends-beyond-the-earlier-problem-types"],
    ["ACI-P037-L022-34DB0685AE", "a-dictionary-translation-can-be-wrong"],
    ["ACI-P037-L022-27D75D900E", "simeon-glosses-chimalpopoca-as-smoking-shield"],
    ["ACI-P037-L022-27D75D900E-02", "smoking-shield-is-rejected-as-the-meaning-of-chimalpopoca"],
    ["ACI-P037-L022-27D75D900E-03", "section-56-2-1-b-is-the-required-canonical-chimalpopoca-analysis"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_chimalpopoca_translation_error_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "dictionary-translation-error-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;

    s.eq("the Chimalpopoca translation-error group contains 5 atoms", EXACT_FACTS.length, 5);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized"
            && value.facts.includes(fact)
            && value.relations.includes("the-smoking-shield-gloss-cannot-authorize-a-result-and-the-canonical-personal-name-owner-remains-required")
            && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact translation-error job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact job is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
