const spec = {
  "ownerId": "classical-absolutive-nounstem-predicate-semantics",
  "prefix": "ClassicalAbsolutiveNounstemPredicateSemantics",
  "operationId": "classical.absolutive.nounstem.predicate.semantics.execute",
  "inputContract": "complete-typed-classical-absolutive-nounstem-predicate-semantics-source",
  "domain": "classical-absolutive-nounstem-predicate-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1321",
    "claim-p1322",
    "claim-p1323",
    "claim-p1324",
    "claim-p1325",
    "claim-p1326",
    "claim-p1327",
    "claim-p1328",
    "claim-p1329",
    "claim-p1330"
  ],
  "coordinates": {
    "claim-p1321::p1321-when-the-state-position-is-vacant-signaling-an-absolutive": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1321-when-the-state-position-is-vacant-signaling-an-absolutive",
      "canonicalPath": "stateFrame.arity"
    },
    "claim-p1322::p1322-result-signaling-an-absolutive-state-formation-the-nounstem-alone": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1322-result-signaling-an-absolutive-state-formation-the-nounstem-alone",
      "canonicalPath": "slotFrame.slots.predicate.stem"
    },
    "claim-p1323::p1323-since-this-predicate-does-not-contain-a-tense-morph": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1323-since-this-predicate-does-not-contain-a-tense-morph",
      "canonicalPath": "slotFrame.slots.predicate.tenseSlot"
    },
    "claim-p1324::p1324-a-nahuatl-nnc-is-equivalent-to-an-english-sentence": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1324-a-nahuatl-nnc-is-equivalent-to-an-english-sentence",
      "canonicalPath": "predicateSemanticsFrame.timeReferenceSource"
    },
    "claim-p1325::p1325-when-necessary": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1325-when-necessary",
      "canonicalPath": "predicateSemanticsFrame.predicateRoleOptions.0"
    },
    "claim-p1326::p1326-when-necessary-nahuatl-does-have-a-means-of-assigning": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1326-when-necessary-nahuatl-does-have-a-means-of-assigning",
      "canonicalPath": "predicateSemanticsFrame.tenseCategoryEncoded"
    },
    "claim-p1327::p1327-in-their-role-as-predicate-they-either-identify-describe": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1327-in-their-role-as-predicate-they-either-identify-describe",
      "canonicalPath": "predicateSemanticsFrame.predicateRoleOptions"
    },
    "claim-p1328::p1328-nahuatl-nounstems-are-the-locus-of-lexical-meaning": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1328-nahuatl-nounstems-are-the-locus-of-lexical-meaning",
      "canonicalPath": "slotFrame.slots.predicate.stem"
    },
    "claim-p1329::p1329-it-is-this-compulsory-predicative-function-that-sets-them": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1329-it-is-this-compulsory-predicative-function-that-sets-them",
      "canonicalPath": "predicateSemanticsFrame.referentialityAccedesTo"
    },
    "claim-p1330::p1330-the-nahuatl-nominal-predicate-also-lacks-any-indication-of": {
      "assertionId": "classical-absolutive-nounstem-predicate-semantics:p1330-the-nahuatl-nominal-predicate-also-lacks-any-indication-of",
      "canonicalPath": "predicateSemanticsFrame.definitenessEncoded"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1321": [
      "common-tli"
    ],
    "claim-p1322": [
      "common-tli"
    ],
    "claim-p1323": [
      "common-tli"
    ],
    "claim-p1324": [
      "common-tli"
    ],
    "claim-p1325": [
      "common-tli"
    ],
    "claim-p1326": [
      "common-tli"
    ],
    "claim-p1327": [
      "common-tli"
    ],
    "claim-p1328": [
      "common-tli"
    ],
    "claim-p1329": [
      "common-tli"
    ],
    "claim-p1330": [
      "common-tli"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1321": "authorized",
    "claim-p1322": "authorized",
    "claim-p1323": "authorized",
    "claim-p1324": "authorized",
    "claim-p1325": "authorized",
    "claim-p1326": "authorized",
    "claim-p1327": "authorized",
    "claim-p1328": "authorized",
    "claim-p1329": "authorized",
    "claim-p1330": "authorized"
  }
};
export default Object.freeze(spec);
