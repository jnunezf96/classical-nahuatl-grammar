"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P036-L028-052FB969AC", "molinas-vocabulario-was-published-in-complete-form-in-1571"],
    ["ACI-P036-L028-052FB969AC-02", "molinas-vocabulario-uses-sixteenth-century-spanish"],
    ["ACI-P036-L029-C10E7D16E1", "a-modern-user-must-account-for-unfamiliar-sixteenth-century-spanish-usage"],
    ["ACI-P036-L029-C10E7D16E1-02", "barba-inferior-witnesses-unfamiliar-historical-spanish-usage"],
    ["ACI-P036-L029-C10E7D16E1-03", "a-modern-user-must-account-for-spanish-semantic-change-since-the-sixteenth-century"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_historical_spanish_semantic_change_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({ analysisDomain: "translation-authority-boundary", requestedAnalysisKind: "historical-spanish-semantic-change-boundary" });
    const result = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.authority.source-language.firewall.enforce", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    s.eq("the historical-Spanish group contains 5 atoms", EXACT_FACTS.length, 5);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized" && value.facts.includes(fact) && value.relations.includes("modern-spanish-meaning-cannot-be-projected-backward-to-authorize-a-nahuatl-analysis") && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact historical-language job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
