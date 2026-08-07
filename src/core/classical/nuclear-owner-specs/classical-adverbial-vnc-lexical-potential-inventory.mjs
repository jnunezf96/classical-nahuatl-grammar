const spec = {
  "ownerId": "classical-adverbial-vnc-lexical-potential-inventory",
  "prefix": "ClassicalAdverbialVncLexicalPotentialInventory",
  "operationId": "classical.adverbial.vnc.lexical.potential.inventory.execute",
  "inputContract": "complete-typed-classical-adverbial-vnc-lexical-potential-inventory-source",
  "domain": "classical-adverbial-vnc-lexical-potential-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4147",
    "claim-p4148",
    "claim-p4149",
    "claim-p4150"
  ],
  "coordinates": {
    "claim-p4147::p4147-only-a-small-number-of-vncs-permit-adverbialization": {
      "assertionId": "classical-adverbial-vnc-lexical-potential-inventory:p4147-only-a-small-number-of-vncs-permit-adverbialization",
      "canonicalPath": "cases.vncLexical.canonicalResult"
    },
    "claim-p4148::p4148-most-of-those-that-do-are-lexicalized-in-an": {
      "assertionId": "classical-adverbial-vnc-lexical-potential-inventory:p4148-most-of-those-that-do-are-lexicalized-in-an",
      "canonicalPath": "cases.vncLexical.family"
    },
    "claim-p4149::p4149-the-following-are-some-of-the-most-common": {
      "assertionId": "classical-adverbial-vnc-lexical-potential-inventory:p4149-the-following-are-some-of-the-most-common",
      "canonicalPath": "cases.vncLexical.typedPotential"
    },
    "claim-p4150::p4150-the-use-of-these-formations-is-so-alien-to": {
      "assertionId": "classical-adverbial-vnc-lexical-potential-inventory:p4150-the-use-of-these-formations-is-so-alien-to",
      "canonicalPath": "cases.vncLexical.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4147": [],
    "claim-p4148": [],
    "claim-p4149": [],
    "claim-p4150": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4147": "authorized",
    "claim-p4148": "authorized",
    "claim-p4149": "authorized",
    "claim-p4150": "authorized"
  }
};
export default Object.freeze(spec);
