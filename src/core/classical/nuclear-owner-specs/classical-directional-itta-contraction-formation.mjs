const spec = {
  "ownerId": "classical-directional-itta-contraction-formation",
  "prefix": "ClassicalDirectionalIttaContractionFormation",
  "operationId": "classical.directional.itta.contraction.form",
  "inputContract": "complete-typed-classical-directional-itta-contraction-formation-source",
  "domain": "classical-directional-itta-contraction-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-directional-itta-contraction-formation",
  "selections": [
    "claim-p983",
    "claim-p984"
  ],
  "coordinates": {
    "claim-p983::p983-with-the-verb-te-tla-itt-a-to-see": {
      "assertionId": "classical-directional-itta-contraction-formation:p983-with-the-verb-te-tla-itt-a-to-see",
      "canonicalPath": "optional"
    },
    "claim-p984::p984-the-resulting-noco-toco-and-xoco-entail-the-dismissal": {
      "assertionId": "classical-directional-itta-contraction-formation:p984-the-resulting-noco-toco-and-xoco-entail-the-dismissal",
      "canonicalPath": "selectedStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDirectionalIttaContractionSystemFrame",
  "executionValidatorName": "isClassicalNahuatlDirectionalIttaContractionSystemFrame",
  "executionArgsBySelection": {
    "claim-p983": [],
    "claim-p984": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p983": "authorized",
    "claim-p984": "authorized"
  }
};
export default Object.freeze(spec);
