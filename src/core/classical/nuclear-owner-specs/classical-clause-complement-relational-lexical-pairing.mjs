const spec = {
  "ownerId": "classical-clause-complement-relational-lexical-pairing",
  "prefix": "ClassicalClauseComplementRelationalLexicalPairing",
  "operationId": "classical.clause.complement.relational.lexical.pairing.execute",
  "inputContract": "complete-typed-classical-clause-complement-relational-lexical-pairing-source",
  "domain": "classical-clause-complement-relational-lexical-pairing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4832",
    "claim-p4833"
  ],
  "coordinates": {
    "claim-p4832::p4832-the-verbstem-and-the-relational-nounstem-become-idiomatically-associated": {
      "assertionId": "classical-clause-complement-relational-lexical-pairing:p4832-the-verbstem-and-the-relational-nounstem-become-idiomatically-associated",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4833::p4833-such-combinations-in-both-languages-must-be-learned-as": {
      "assertionId": "classical-clause-complement-relational-lexical-pairing:p4833-such-combinations-in-both-languages-must-be-learned-as",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4832": [
      "relational-lexical-pairing"
    ],
    "claim-p4833": [
      "relational-lexical-pairing"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4832": "authorized",
    "claim-p4833": "authorized"
  }
};
export default Object.freeze(spec);
