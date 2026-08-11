"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P034-L022-2FEC4AB471", "anderson-and-dibble-render-the-first-cited-sentence-as-be-of-good-cheer"],
    ["ACI-P034-L022-2FEC4AB471-02", "anderson-and-dibble-render-the-second-cited-sentence-as-rest-in-peace"],
    ["ACI-P034-L022-2FEC4AB471-03", "florentine-codex-six-page-184-is-the-cited-location"],
    ["ACI-P034-L024-07A2CE61B6", "rest-in-peace-is-the-diplomatic-continuation-of-the-cited-english-rendering"],
    ["ACI-P034-L024-E8D2AB4479", "the-speech-context-is-an-elderly-human-man-addressing-a-young-human-woman-recently-delivered-of-a-human-baby"],
    ["ACI-P034-L025-5E8ECB329A", "an-english-reader-without-nahuatl-may-not-question-the-apparent-exactness"],
    ["ACI-P034-L026-B2CD7926F3", "the-english-rendering-can-sound-contextually-appropriate"],
    ["ACI-P034-L026-B2CD7926F3-02", "the-english-rendering-matches-an-english-readers-cultural-expectation-for-the-scene"],
    ["ACI-P034-L027-5CB66E435F", "the-speaker-is-a-nahuatl-speaker-not-an-english-speaker"],
    ["ACI-P034-L027-5CB66E435F-02", "the-following-speech-functions-as-a-solemn-admonition"],
    ["ACI-P034-L027-5CB66E435F-03", "the-following-speech-is-not-merely-congratulatory-rhetoric"],
]);

function exact(result, fact) {
    return result.authorizationStatus === "authorized"
        && result.ownerExecutionCompleted === true
        && result.generationAllowed === false
        && result.facts.includes(fact)
        && result.relations.includes(
            "translation-witnesses-and-reader-expectations-can-check-an-analysis-but-cannot-create-block-or-replace-nahuatl-grammar",
        )
        && result.restrictions.includes(
            "the-source-language-owner-remains-required-for-every-grammar-decision",
        );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_misleading_translation_context_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "misleading-translation-context-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;

    s.eq("the misleading-translation setup contains 11 atoms", EXACT_FACTS.length, 11);
    for (const [atomId, fact] of EXACT_FACTS) {
        s.ok(`${atomId} performs its exact evidence or protection job`, exact(result, fact));
        const mutation = {
            ...result,
            facts: result.facts.filter(value => value !== fact),
        };
        s.ok(`mutation:${atomId} fails when its exact job is removed`, !exact(mutation, fact));
    }

    s.ok(
        "these witnesses never generate or suppress a Nahuatl Result",
        result.generationAllowed === false
            && result.formulaGenerated === false
            && result.soundedSurfaceGenerated === false
            && result.writtenSurfaceGenerated === false,
    );
    return s;
}

module.exports = { run };
