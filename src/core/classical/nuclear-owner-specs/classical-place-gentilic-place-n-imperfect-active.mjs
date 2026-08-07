const spec = {
  "ownerId": "classical-place-gentilic-place-n-imperfect-active",
  "prefix": "ClassicalPlaceGentilicPlaceNImperfectActive",
  "operationId": "classical.place.gentilic.place.n.imperfect.active.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-n-imperfect-active-source",
  "domain": "classical-place-gentilic-place-n-imperfect-active",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4565",
    "claim-p4566",
    "claim-p4567"
  ],
  "coordinates": {
    "claim-p4565::p4565-the-formation-types-of-this-group-are-based-on": {
      "assertionId": "classical-place-gentilic-place-n-imperfect-active:p4565-the-formation-types-of-this-group-are-based-on",
      "canonicalPath": "cases.nImperfectActive.canonicalFrame"
    },
    "claim-p4566::p4566-the-n-tli-embeds-a-nominalized-imperfect-tense-predicate": {
      "assertionId": "classical-place-gentilic-place-n-imperfect-active:p4566-the-n-tli-embeds-a-nominalized-imperfect-tense-predicate",
      "canonicalPath": "cases.nImperfectActive.lcmAxisId"
    },
    "claim-p4567::p4567-the-formation-may-be-according-to-46-4-1": {
      "assertionId": "classical-place-gentilic-place-n-imperfect-active:p4567-the-formation-may-be-according-to-46-4-1",
      "canonicalPath": "cases.nImperfectActive.sourceVoice"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4565": [],
    "claim-p4566": [],
    "claim-p4567": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4565": "authorized",
    "claim-p4566": "authorized",
    "claim-p4567": "authorized"
  }
};
export default Object.freeze(spec);
