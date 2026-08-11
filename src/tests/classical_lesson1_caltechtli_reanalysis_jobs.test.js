"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P036-L030-B38C91C722", "molinas-dictionary-lists-the-nahuatl-headword-caltechtli"],
    ["ACI-P036-L030-B38C91C722-02", "molina-glosses-caltechtli-as-pared-la-hazera-della"],
    ["ACI-P036-L031-5817960769", "karttunen-gives-caltechtli-the-reading-wall-of-a-house"],
    ["ACI-P036-L031-5817960769-02", "karttunen-also-gives-caltechtli-the-reading-walkway-along-the-side-of-a-house"],
    ["ACI-P036-L032-929590077D", "caltechtli-is-correctly-read-as-house-wall-facing-from-house-side-surface-composition"],
    ["ACI-P036-L034-8773CD4D0A", "historical-hazera-is-not-modern-acera-sidewalk"],
    ["ACI-P036-L034-8773CD4D0A-02", "historical-hazera-is-derived-from-haz"],
    ["ACI-P036-L034-8773CD4D0A-03", "historical-haz-can-mean-face"],
    ["ACI-P036-L034-8773CD4D0A-04", "historical-haz-can-mean-surface"],
    ["ACI-P036-L034-8773CD4D0A-05", "hazera-as-a-derivative-of-haz-was-normal-in-molinas-time"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_caltechtli_reanalysis_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({ analysisDomain: "translation-authority-boundary", requestedAnalysisKind: "caltechtli-historical-gloss-reanalysis-boundary" });
    const result = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.authority.source-language.firewall.enforce", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    s.eq("the caltechtli group contains 10 atoms", EXACT_FACTS.length, 10);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized" && value.facts.includes(fact) && value.relations.includes("the-caltechtli-result-must-follow-house-side-surface-composition-and-reject-the-modern-sidewalk-lookalike") && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact caltechtli job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
