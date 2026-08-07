const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-class-taxonomy",
  "prefix": "ClassicalDenominalVncIncludedPossessorClassTaxonomy",
  "operationId": "classical.denominal.vnc.included.possessor.class.taxonomy.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-class-taxonomy-source",
  "domain": "classical-denominal-vnc-included-possessor-class-taxonomy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5032",
    "claim-p5033",
    "claim-p5034"
  ],
  "coordinates": {
    "claim-p5032::p5032-in-all-of-them-the-verbstem-belongs-to-class": {
      "assertionId": "classical-denominal-vnc-included-possessor-class-taxonomy:p5032-in-all-of-them-the-verbstem-belongs-to-class",
      "canonicalPath": "result.targetClass"
    },
    "claim-p5033::p5033-only-four-types-of-these-verbstems-are-presented-here": {
      "assertionId": "classical-denominal-vnc-included-possessor-class-taxonomy:p5033-only-four-types-of-these-verbstems-are-presented-here",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5034::p5034-in-the-citation-forms-the-possessor-pronoun-te-can": {
      "assertionId": "classical-denominal-vnc-included-possessor-class-taxonomy:p5034-in-the-citation-forms-the-possessor-pronoun-te-can",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5032": [
      "included-possessor-class-taxonomy",
      "included-possessor-ti",
      "proxy"
    ],
    "claim-p5033": [
      "included-possessor-class-taxonomy",
      "included-possessor-ti",
      "proxy"
    ],
    "claim-p5034": [
      "included-possessor-class-taxonomy",
      "included-possessor-ti",
      "proxy"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5032": "authorized",
    "claim-p5033": "authorized",
    "claim-p5034": "authorized"
  }
};
export default Object.freeze(spec);
