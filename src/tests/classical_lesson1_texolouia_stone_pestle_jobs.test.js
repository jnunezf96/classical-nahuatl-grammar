"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P037-L016-9B9F396CAF", "te-embed-not-teh-pronoun", "te≠tē", "molinas-xolouia-nitetla-entry-means-to-pound-something-with-a-pestle"],
    ["ACI-P037-L016-E57E467B9B", "te-embed-not-teh-pronoun", "te≠tē", "molina-misplaces-te-rock-outside-the-stem-as-teh-someone"],
    ["ACI-P037-L017-8EC85AF98F", "texolouia-source", "te-xōlo-uiā", "molina-also-lists-the-correct-texolouia-formation-for-pounding-with-a-stone-pestle"],
    ["ACI-P037-L019-2514D18E7B", "te-xolo-nounstem", "te-xōlo-tl", "te-xolo-tl-literally-combines-stone-and-servant"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_texolouia_stone_pestle_jobs");
    const evaluate = (kind, choice) => {
        const source = ctx.buildClassicalObjectEmbedDistinctionSource({ analysisDomain: "classical-object-embed-distinction", requestedAnalysisKind: kind, participantChoice: choice });
        return ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.verbstem.object-embed.validate", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    };
    s.eq("the texolouia stone-pestle group contains 4 atoms", EXACT_FACTS.length, 4);
    for (const [atomId, kind, choice, fact] of EXACT_FACTS) {
        const result = evaluate(kind, choice);
        const exact = value => value.authorizationStatus === "authorized" && value.analysisKind === kind && value.participantChoice === choice && value.facts.includes(fact) && value.payload?.rejectedObjectPrefix !== "te";
        s.ok(`${atomId} performs its exact stone-pestle job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact stem structure is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
