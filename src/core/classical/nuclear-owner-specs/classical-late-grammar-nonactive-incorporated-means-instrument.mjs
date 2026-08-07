const spec = {
  "ownerId": "classical-late-grammar-nonactive-incorporated-means-instrument",
  "prefix": "ClassicalLateGrammarNonactiveIncorporatedMeansInstrument",
  "operationId": "classical.late.grammar.nonactive.incorporated.means.instrument.execute",
  "inputContract": "complete-typed-classical-late-grammar-nonactive-incorporated-means-instrument-source",
  "domain": "classical-late-grammar-nonactive-incorporated-means-instrument",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-incorporated-noun-role-runtime",
  "selections": [
    "claim-p5342",
    "claim-p5343"
  ],
  "coordinates": {
    "claim-p5342::p5342-after-all-in-the-active-source-of-these-nonactive": {
      "assertionId": "classical-late-grammar-nonactive-incorporated-means-instrument:p5342-after-all-in-the-active-source-of-these-nonactive",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5343::p5343-what-was-a-subject-as-agent-in-the-doublenucleus": {
      "assertionId": "classical-late-grammar-nonactive-incorporated-means-instrument:p5343-what-was-a-subject-as-agent-in-the-doublenucleus",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5342": [
      "incorporated-noun-role",
      "passive"
    ],
    "claim-p5343": [
      "incorporated-noun-role",
      "passive"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5342": "authorized",
    "claim-p5343": "authorized"
  }
};
export default Object.freeze(spec);
