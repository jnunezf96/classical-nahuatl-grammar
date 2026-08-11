"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P036-L017-6019D79687", "molina-attests-imaxtli-with-pendejo-or-barba-inferior"],
    ["ACI-P036-L017-6019D79687-02", "pendejo-gives-imaxtli-the-singular-reading-one-pubic-hair"],
    ["ACI-P036-L017-6019D79687-03", "barba-inferior-literally-gives-imaxtli-the-reading-nether-beard"],
    ["ACI-P036-L017-6019D79687-04", "the-nether-beard-reading-corresponds-to-pubes-or-a-pubic-hair-patch"],
    ["ACI-P036-L017-6019D79687-05", "the-paired-gloss-witnesses-singular-hair-and-collective-pubes-without-owning-the-grammar"],
    ["ACI-P036-L019-94E9D1DA68", "simeon-renders-imaxtli-as-french-barbe-poil-follet"],
    ["ACI-P036-L019-94E9D1DA68-02", "french-barbe-poil-follet-means-beard-or-down"],
    ["ACI-P036-L019-94E9D1DA68-03", "the-french-reading-refers-to-first-human-beard-growth-not-molinas-pubic-hair-meaning"],
    ["ACI-P036-L021-56E7C88CB0", "the-spanish-translation-renders-french-barbe-as-beard"],
    ["ACI-P036-L021-56E7C88CB0-02", "the-spanish-translation-renders-french-poil-follet-as-upper-lip-fuzz"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_imaxtli_semantic_drift_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({ analysisDomain: "translation-authority-boundary", requestedAnalysisKind: "imaxtli-semantic-drift-boundary" });
    const result = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.authority.source-language.firewall.enforce", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    s.eq("the imaxtli semantic-drift group contains 10 atoms", EXACT_FACTS.length, 10);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized" && value.facts.includes(fact) && value.relations.includes("later-french-and-spanish-gloss-drift-cannot-erase-the-nahuatl-singular-or-collective-imaxtli-readings") && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact imaxtli job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
