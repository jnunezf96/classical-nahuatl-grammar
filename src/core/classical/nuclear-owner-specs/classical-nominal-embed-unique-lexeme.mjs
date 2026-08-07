const spec = {
  "ownerId": "classical-nominal-embed-unique-lexeme",
  "prefix": "ClassicalNominalEmbedUniqueLexeme",
  "operationId": "classical.nominal.embed.unique.lexeme.execute",
  "inputContract": "complete-typed-classical-nominal-embed-unique-lexeme-source",
  "domain": "classical-nominal-embed-unique-lexeme",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3002",
    "claim-p3003",
    "claim-p3004",
    "claim-p3005",
    "claim-p3006",
    "claim-p3007",
    "claim-p3008",
    "claim-p3009",
    "claim-p3010"
  ],
  "coordinates": {
    "claim-p3002::p3002-in-certain-instances-the-nounstem-serving-as-an-incorporated": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3002-in-certain-instances-the-nounstem-serving-as-an-incorporated",
      "canonicalPath": "cases.uniqueLexeme.rules.nominal-embed/unique-lexeme"
    },
    "claim-p3003::p3003-examples-of-such-nounstems-are-il-tel-pol-poz": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3003-examples-of-such-nounstems-are-il-tel-pol-poz",
      "canonicalPath": "cases.uniqueLexeme.authorizationStatus"
    },
    "claim-p3004::p3004-the-meaning-of-these-stems-and-of-others-like": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3004-the-meaning-of-these-stems-and-of-others-like",
      "canonicalPath": "cases.uniqueLexeme.gcdSatisfied"
    },
    "claim-p3005::p3005-te-tla-tel-chihua-to-despise-s-o-or": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3005-te-tla-tel-chihua-to-despise-s-o-or",
      "canonicalPath": "cases.uniqueLexeme.lcmComplete"
    },
    "claim-p3006::p3006-te-tla-tel-icza-to-kick-s-o-or": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3006-te-tla-tel-icza-to-kick-s-o-or",
      "canonicalPath": "cases.uniqueLexeme.rules.nominal-embed/unique-lexeme"
    },
    "claim-p3007::p3007-m-o-te-tel-quetza-to-stop-oneself-or": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3007-m-o-te-tel-quetza-to-stop-oneself-or",
      "canonicalPath": "cases.uniqueLexeme.authorizationStatus"
    },
    "claim-p3008::p3008-pol-aqui-to-become-submerged-in-water-to-plunge": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3008-pol-aqui-to-become-submerged-in-water-to-plunge",
      "canonicalPath": "cases.uniqueLexeme.gcdSatisfied"
    },
    "claim-p3009::p3009-tla-poz-tequi-to-break-s-th": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3009-tla-poz-tequi-to-break-s-th",
      "canonicalPath": "cases.uniqueLexeme.lcmComplete"
    },
    "claim-p3010::p3010-e-g-a-stick-a-leg-tla-tequi-to": {
      "assertionId": "classical-nominal-embed-unique-lexeme:p3010-e-g-a-stick-a-leg-tla-tequi-to",
      "canonicalPath": "cases.uniqueLexeme.rules.nominal-embed/unique-lexeme"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3002": [],
    "claim-p3003": [],
    "claim-p3004": [],
    "claim-p3005": [],
    "claim-p3006": [],
    "claim-p3007": [],
    "claim-p3008": [],
    "claim-p3009": [],
    "claim-p3010": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3002": "authorized",
    "claim-p3003": "authorized",
    "claim-p3004": "authorized",
    "claim-p3005": "authorized",
    "claim-p3006": "authorized",
    "claim-p3007": "authorized",
    "claim-p3008": "authorized",
    "claim-p3009": "authorized",
    "claim-p3010": "authorized"
  }
};
export default Object.freeze(spec);
