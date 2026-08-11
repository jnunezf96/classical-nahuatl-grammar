"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P034-L032-54C24D7AAC", "young-woman-you-know-nothing-is-only-a-rough-english-equivalent"],
    ["ACI-P034-L033-439B3B7758", "you-are-ignorant-is-only-an-approximate-paraphrase"],
    ["ACI-P034-L033-439B3B7758-02", "the-contextual-implication-is-therefore-pay-attention-to-what-i-say"],
    ["ACI-P034-L034-2FDA695160", "the-addressee-survived-the-danger-of-death-in-childbirth"],
    ["ACI-P034-L034-2FDA695160-02", "surviving-childbirth-does-not-place-the-addressee-out-of-danger"],
    ["ACI-P034-L034-2FDA695160-03", "the-woman-and-her-child-face-an-uncertain-future"],
    ["ACI-P034-L035-AC1435044C", "the-elderly-speaker-addresses-the-woman-respectfully"],
    ["ACI-P034-L035-AC1435044C-02", "english-H-notation-marks-an-honored-addressee"],
    ["ACI-P034-L035-AC1435044C-03", "childbirth-survival-context-motivates-respectful-address"],
    ["ACI-P034-L035-AC1435044C-04", "the-passage-characterizes-childbirth-survival-as-victory-over-death"],
    ["ACI-P034-L037-BBEBA173B3", "the-speaker-is-neither-pampering-nor-indulging-the-addressee"],
]);

function exact(result, fact) {
    return result.authorizationStatus === "authorized"
        && result.facts.includes(fact)
        && result.relations.includes(
            "context-and-english-paraphrase-can-support-but-cannot-create-or-reverse-the-honorific-admonitory-grammar",
        )
        && result.generationAllowed === false;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_admonitory_context_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "admonitory-context-paraphrase-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;
    s.eq("the admonitory-context group contains 11 atoms", EXACT_FACTS.length, 11);
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
