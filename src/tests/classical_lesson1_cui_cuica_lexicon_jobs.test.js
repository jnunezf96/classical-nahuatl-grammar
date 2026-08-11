"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P037-L034-A8887817C6", "a-dictionary-error-can-result-from-a-grammatical-analysis-mistake"],
    ["ACI-P037-L035-A5D62592A6", "simeons-cuica-entry-is-glossed-to-sing"],
    ["ACI-P037-L035-A5D62592A6-02", "simeon-places-amix-amonacaz-xiccuican-under-cuica"],
    ["ACI-P037-L035-A5D62592A6-03", "molinas-spanish-gloss-marks-the-phrase-as-a-plural-command"],
    ["ACI-P037-L035-A5D62592A6-04", "the-spanish-gloss-includes-be-cautious"],
    ["ACI-P037-L035-A5D62592A6-05", "the-spanish-gloss-includes-be-prudent"],
    ["ACI-P037-L035-A5D62592A6-06", "the-spanish-gloss-includes-be-wise"],
    ["ACI-P037-L037-47557F3B55", "simeons-translation-omits-avisados"],
    ["ACI-P037-L037-47557F3B55-02", "simeons-prudent-and-wise-rendering-preserves-the-plural-command"],
    ["ACI-P037-L037-47557F3B55-03", "simeon-adds-sing-to-your-faces-and-ears"],
    ["ACI-P037-L037-47557F3B55-04", "the-added-singing-translation-is-structurally-impossible"],
    ["ACI-P037-L040-04631E4CC1", "basic-grammar-requires-cui-not-cuīca-for-xiccuican"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_cui_cuica_lexicon_jobs");
    const cuiSource = ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
        enteredStem: "cui",
        basalUnit: "vnc",
        valence: "transitive",
    });
    const cuicaSource = ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
        enteredStem: "cuīca",
        basalUnit: "vnc",
        valence: "intransitive",
    });
    const source = ctx.buildClassicalVerbstemLexiconSource({
        analysisDomain: "classical-verbstem-lexicon",
        requestedAnalysisKind: "cui-cuica-lexical-contrast",
        participantChoice: "cui≠cuīca",
        prerequisites: { cuiSource, cuicaSource },
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.verbstem.lexicon.authorize",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;

    s.eq("the cui/cuīca group contains 12 atoms", EXACT_FACTS.length, 12);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized"
            && value.analysisKind === "cui-cuica-lexical-contrast"
            && value.participantChoice === "cui≠cuīca"
            && value.facts.includes(fact)
            && value.payload?.selectedSource === "cui"
            && value.payload?.rejectedSource === "cuīca"
            && value.payload?.canonicalLiteralMeaning === "use (pl) your eyes and your ears";
        s.ok(`${atomId} performs its exact verbstem job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact verbstem fact is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
        s.ok(`mutation:${atomId} fails when cuīca wrongly replaces cui`, !exact({ ...result, payload: { ...result.payload, selectedSource: "cuīca" } }));
    }
    return s;
}

module.exports = { run };
