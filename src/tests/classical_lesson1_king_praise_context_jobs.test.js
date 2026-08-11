"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P035-L004-CF7EDADCCF", "the-king-example-preserves-general-thrust-but-not-particular-affect"],
    ["ACI-P035-L005-D4F5096E32", "the-canvas-cites-the-king-sentence-from-florentine-codex-six-page-57"],
    ["ACI-P035-L005-D4F5096E32-02", "anderson-and-dibble-render-it-as-now-thou-hast-merited-thou-hast-deserved-the-city"],
    ["ACI-P035-L006-B152308376", "the-speaker-intends-to-congratulate-the-addressee"],
    ["ACI-P035-L006-B152308376-02", "the-speaker-intends-to-flatter-the-addressee"],
    ["ACI-P035-L006-B152308376-03", "the-addressee-is-a-newly-chosen-human-king"],
    ["ACI-P035-L006-B152308376-04", "the-english-rendering-preserves-the-general-congratulatory-and-flattering-purpose"],
]);

function exact(result, fact) {
    return result.authorizationStatus === "authorized"
        && result.facts.includes(fact)
        && result.relations.includes(
            "general-pragmatic-purpose-and-citation-evidence-cannot-decide-the-internal-participant-relations",
        )
        && result.generationAllowed === false;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_king_praise_context_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "king-praise-general-affect-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;
    s.eq("the king-praise context group contains 7 atoms", EXACT_FACTS.length, 7);
    for (const [atomId, fact] of EXACT_FACTS) {
        s.ok(`${atomId} performs its exact context job`, exact(result, fact));
        s.ok(`mutation:${atomId} fails when its context job is removed`, !exact({
            ...result,
            facts: result.facts.filter(value => value !== fact),
        }, fact));
    }
    return s;
}

module.exports = { run };
