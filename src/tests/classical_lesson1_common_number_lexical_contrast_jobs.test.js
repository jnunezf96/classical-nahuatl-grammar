"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P036-L022-18FA3D9CB9", "one-nahuatl-compound-verbstem-means-to-pluck-out-individual-pubic-hairs"],
    ["ACI-P036-L022-18FA3D9CB9-02", "a-distinct-nahuatl-compound-verbstem-means-to-shave-off-the-pubic-hair-patch"],
    ["ACI-P036-L022-18FA3D9CB9-03", "simeon-reduces-the-pubic-hair-plucking-compound-to-to-shave"],
    ["ACI-P036-L022-18FA3D9CB9-04", "simeon-reduces-the-pubic-patch-shaving-compound-to-to-shave"],
    ["ACI-P036-L022-18FA3D9CB9-05", "simeons-spanish-translators-also-reduce-the-plucking-compound-to-to-shave"],
    ["ACI-P036-L022-18FA3D9CB9-06", "simeons-spanish-translators-also-reduce-the-patch-shaving-compound-to-to-shave"],
    ["ACI-P036-L024-E64BE26F47", "nahuatl-common-number-one-or-more-resolves-molinas-paired-imaxtli-reading"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_common_number_lexical_contrast_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({ analysisDomain: "translation-authority-boundary", requestedAnalysisKind: "common-number-lexical-contrast-boundary" });
    const result = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.authority.source-language.firewall.enforce", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    s.eq("the common-number lexical-contrast group contains 7 atoms", EXACT_FACTS.length, 7);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized" && value.facts.includes(fact) && value.relations.includes("a-shared-translation-cannot-merge-distinct-nahuatl-verbstems-and-common-number-selects-one-or-more-without-changing-the-nahuatl-form") && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact lexical-contrast job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
