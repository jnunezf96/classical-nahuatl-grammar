"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P038-L002-852DEE7B83", "space-limits-prevent-the-source-from-listing-more-dictionary-examples"],
    ["ACI-P038-L002-852DEE7B83-02", "many-additional-dictionary-problems-exist"],
    ["ACI-P038-L002-852DEE7B83-03", "the-given-examples-are-sufficient-to-show-dictionary-untrustworthiness"],
    ["ACI-P038-L002-852DEE7B83-04", "molinas-dictionary-is-more-reliable-than-simeons"],
    ["ACI-P038-L004-3F2A76679C", "simeons-proposed-source-roots-require-grammar-checking"],
    ["ACI-P038-L005-1BEB3C20F1", "simeon-claims-tla-tzatzanatza-is-a-frequentative-of-tzahtzi"],
    ["ACI-P038-L005-1BEB3C20F1-02", "the-false-derivation-is-like-deriving-ratchet-from-rat"],
    ["ACI-P038-L005-1BEB3C20F1-03", "tla-tzatzanatza-is-transitive"],
    ["ACI-P038-L005-1BEB3C20F1-04", "tzahtzi-is-intransitive"],
    ["ACI-P038-L007-83307DDAC2", "tzatz-source-segment-is-not-tzahtz-source-segment"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_dictionary_root_tzatzanatza_jobs");
    const tzatzanatzaSource = ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
        enteredStem: "tla-tzatzanatza",
        basalUnit: "vnc",
        valence: "transitive",
    });
    const tzahtziSource = ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
        enteredStem: "tzahtzi",
        basalUnit: "vnc",
        valence: "intransitive",
    });
    const source = ctx.buildClassicalVerbstemLexiconSource({
        analysisDomain: "classical-verbstem-lexicon",
        requestedAnalysisKind: "tzatzanatza-tzahtzi-source-contrast",
        participantChoice: "tla-tzatzanatza≠freq(tzahtzi)",
        prerequisites: { tzatzanatzaSource, tzahtziSource },
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.verbstem.lexicon.authorize",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;

    s.eq("the dictionary-root group contains 10 atoms", EXACT_FACTS.length, 10);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized"
            && value.facts.includes(fact)
            && value.payload?.tzatzanatzaValence === "transitive"
            && value.payload?.tzahtziValence === "intransitive"
            && value.payload?.frequentativeRelationAuthorized === false
            && value.payload?.dictionaryRootAuthority === false;
        s.ok(`${atomId} performs its exact source-root job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact source-root fact is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
        s.ok(`mutation:${atomId} fails when the false frequentative link is allowed`, !exact({ ...result, payload: { ...result.payload, frequentativeRelationAuthorized: true } }));
    }
    return s;
}

module.exports = { run };
