"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P037-L009-1CA3CEF619", "xima-valence-contrast", "tē-xīma≠te-xīma", "molina-combines-shave-someone-and-work-stone-under-xima-nite"],
    ["ACI-P037-L009-1CA3CEF619-02", "xima-valence-contrast", "tē-xīma≠te-xīma", "shave-someone-selects-a-nonspecific-human-object"],
    ["ACI-P037-L009-1CA3CEF619-03", "xima-valence-contrast", "tē-xīma≠te-xīma", "work-stone-selects-incorporated-nonhuman-stone-not-a-human-object-prefix"],
    ["ACI-P037-L009-1CA3CEF619-04", "xima-valence-contrast", "tē-xīma≠te-xīma", "combining-human-object-and-incorporated-stone-readings-is-erroneous"],
    ["ACI-P037-L011-AF64F276AC", "xima-valence-contrast", "tē-xīma≠te-xīma", "teh-xima-is-simple-transitive-while-te-xima-is-compound-intransitive"],
    ["ACI-P037-L013-6CEC7A61B8", "te-xima-inventory", "te-xīma", "molina-should-list-te-xima-as-texima-ni-like-quauhxima-ni"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_xima_object_embed_jobs");
    const evaluate = (kind, choice) => {
        const source = ctx.buildClassicalObjectEmbedDistinctionSource({ analysisDomain: "classical-object-embed-distinction", requestedAnalysisKind: kind, participantChoice: choice });
        return ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.verbstem.object-embed.validate", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    };
    s.eq("the xima object/embed group contains 6 atoms", EXACT_FACTS.length, 6);
    for (const [atomId, kind, choice, fact] of EXACT_FACTS) {
        const result = evaluate(kind, choice);
        const exact = value => value.authorizationStatus === "authorized" && value.analysisKind === kind && value.participantChoice === choice && value.facts.includes(fact) && value.payload?.valence !== "transitive-compound";
        s.ok(`${atomId} performs its exact object/embed job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact distinction is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
    }
    return s;
}

module.exports = { run };
