"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P034-L002-5032BAB8D5", "most-language-specific-ways-of-thinking-are-lost-in-translation"],
    ["ACI-P034-L002-5032BAB8D5-02", "translation-usually-converts-foreignness-into-the-target-audience-rather-than-carrying-the-audience-into-foreignness"],
    ["ACI-P034-L002-5032BAB8D5-03", "target-language-conventions-can-dominate-a-translation"],
    ["ACI-P034-L004-D49A1980C3", "translation-textbooks-advise-target-language-originality-of-style"],
    ["ACI-P034-L004-D49A1980C3-02", "translation-textbooks-advise-considering-the-target-readers-nature-and-interests"],
    ["ACI-P034-L004-D49A1980C3-03", "translation-textbooks-advise-tailoring-the-translation-to-the-target-readers"],
    ["ACI-P034-L007-68901E5798", "translation-textbooks-also-seek-the-meaning-understood-by-source-language-speakers"],
    ["ACI-P034-L009-1B6FA866A8", "source-language-and-translation-audiences-are-distinct"],
    ["ACI-P034-L009-1B6FA866A8-02", "audience-conflation-rests-on-naive-universal-equivalence"],
    ["ACI-P034-L009-1B6FA866A8-03", "universality-reaches-only-highly-general-common-denominator-abstractions"],
    ["ACI-P034-L015-E7382DF2C2", "linguistic-universals-omit-detailed-lived-experience-meanings"],
    ["ACI-P034-L016-D0A76465EC", "translation-removes-the-differentia-dimension-of-meaning"],
    ["ACI-P034-L017-ACBEB07035", "translation-readers-may-not-know-what-meaning-was-lost"],
    ["ACI-P034-L019-3B414E3B12", "some-source-meaning-dislocation-is-unavoidable-in-translation"],
    ["ACI-P034-L019-3B414E3B12-02", "mistranslation-adds-avoidable-source-meaning-dislocation"],
    ["ACI-P034-L021-C7C39A3891", "translation-mirage-can-conceal-both-unavoidable-loss-and-mistranslation"],
]);

function exact(result, fact) {
    return result.authorizationStatus === "authorized"
        && result.ownerExecutionCompleted === true
        && result.generationAllowed === false
        && result.facts.includes(fact)
        && result.relations.includes(
            "target-audience-style-and-expectations-cannot-select-source-language-structure-or-result",
        )
        && result.restrictions.includes(
            "translation-gloss-and-reader-interpretation-cannot-authorize-nahuatl-grammar",
        );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_target_language_dominance_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "target-language-dominance-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;

    s.eq("the target-language dominance group contains 16 atoms", EXACT_FACTS.length, 16);
    for (const [atomId, fact] of EXACT_FACTS) {
        s.ok(`${atomId} performs its exact protection job`, exact(result, fact));
        const mutation = {
            ...result,
            facts: result.facts.filter(value => value !== fact),
        };
        s.ok(`mutation:${atomId} fails when its exact protection is removed`, !exact(mutation, fact));
    }

    const copied = ctx.evaluateTranslationAuthorityBoundary(Object.freeze({ ...source }));
    s.eq("a copied translation description cannot control grammar", [
        copied.authorizationStatus,
        copied.blockReason,
    ], [
        "blocked",
        "owner-issued-translation-authority-boundary-source-required",
    ]);
    return s;
}

module.exports = { run };
