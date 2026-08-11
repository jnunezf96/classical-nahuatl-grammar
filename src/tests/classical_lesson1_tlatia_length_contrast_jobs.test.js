"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P037-L005-AF03ADE002", "length-and-glottal-distinctiveness", "vowel-length+glottal-stop", "molinas-disregard-for-vowel-length-and-glottal-stops-creates-lexical-analysis-problems"],
    ["ACI-P037-L006-9C5D7E55DA", "length-and-glottal-distinctiveness", "vowel-length+glottal-stop", "failure-to-recognize-vowel-length-can-collapse-two-different-stems-into-one-entry"],
    ["ACI-P037-L008-4254BF86A2", "length-collapse-split", "tlātiā≠tlatiā", "molinas-combined-tlatia-entry-must-be-split"],
    ["ACI-P037-L008-4254BF86A2-02", "length-collapse-split", "tlātiā≠tlatiā", "reflexive-m-o-tlā-ti-ā-means-to-hide-oneself", "m-o-(tlā-ti-ā)", "to hide oneself"],
    ["ACI-P037-L008-4254BF86A2-03", "length-collapse-split", "tlātiā≠tlatiā", "reflexive-m-o-tla-ti-ā-means-to-burn-oneself", "m-o-(tla-ti-ā)", "to burn oneself"],
    ["ACI-P037-L008-4254BF86A2-04", "length-collapse-split", "tlātiā≠tlatiā", "hide-and-burn-stems-differ-in-vowel-length-and-internal-structure"],
    ["ACI-P037-L008-4254BF86A2-05", "length-collapse-split", "tlātiā≠tlatiā", "merging-the-two-tlatia-stems-obscures-distinct-structures-and-results"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_tlatia_length_contrast_jobs");
    const evaluate = (kind, choice) => {
        const source = ctx.buildClassicalPhonologicalDistinctionSource({ analysisDomain: "classical-phonological-distinction", requestedAnalysisKind: kind, participantChoice: choice });
        const receipt = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.source.phonological-identity.validate", args: [source], languageId: "classical-nahuatl" });
        if (!receipt.canonicalResult) throw new Error(`phonological route blocked: ${receipt.blockReason}`);
        return receipt.canonicalResult;
    };
    s.eq("the tlatia length-contrast group contains 7 atoms", EXACT_FACTS.length, 7);
    for (const [atomId, kind, choice, fact, expectedForm, expectedMeaning] of EXACT_FACTS) {
        const result = evaluate(kind, choice);
        const exact = value => value.authorizationStatus === "authorized"
            && value.analysisKind === kind
            && value.participantChoice === choice
            && value.facts.includes(fact)
            && value.payload?.collapseAllowed !== true
            && (!expectedForm || value.payload?.reflexiveRealizations?.some(realization => realization.form === expectedForm && realization.meaning === expectedMeaning));
        s.ok(`${atomId} performs its exact vowel-length job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact distinction is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
        if (expectedForm) {
            const wrongForm = expectedForm.includes("tlā")
                ? expectedForm.replace("tlā", "tla")
                : expectedForm.replace("tla", "tlā");
            const brokenRealizations = result.payload.reflexiveRealizations.map(realization => realization.form === expectedForm ? { ...realization, form: wrongForm } : realization);
            s.ok(`mutation:${atomId} fails when its exact vowel length is changed`, !exact({ ...result, payload: { ...result.payload, reflexiveRealizations: brokenRealizations } }));
        }
    }
    return s;
}

module.exports = { run };
