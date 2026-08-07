const spec = {
  "ownerId": "classical-personal-name-nnc-two-tier-statement-downgrade",
  "prefix": "ClassicalPersonalNameNncTwoTierStatementDowngrade",
  "operationId": "classical.personal.name.nnc.two.tier.statement.downgrade.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-two-tier-statement-downgrade-source",
  "domain": "classical-personal-name-nnc-two-tier-statement-downgrade",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5160",
    "claim-p5161",
    "claim-p5162"
  ],
  "coordinates": {
    "claim-p5160::p5160-but-it-must-be-immediately-pointed-out-that-nahuatl": {
      "assertionId": "classical-personal-name-nnc-two-tier-statement-downgrade:p5160-but-it-must-be-immediately-pointed-out-that-nahuatl",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5161::p5161-they-use-a-two-tiered-construction-an-entire-statement": {
      "assertionId": "classical-personal-name-nnc-two-tier-statement-downgrade:p5161-they-use-a-two-tiered-construction-an-entire-statement",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5162::p5162-in-every-personal-name-nnc-there-are-then-two": {
      "assertionId": "classical-personal-name-nnc-two-tier-statement-downgrade:p5162-in-every-personal-name-nnc-there-are-then-two",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5160": [
      "two-tier-statement-downgrade",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5161": [
      "two-tier-statement-downgrade",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5162": [
      "two-tier-statement-downgrade",
      "preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5160": "authorized",
    "claim-p5161": "authorized",
    "claim-p5162": "authorized"
  }
};
export default Object.freeze(spec);
