const spec = {
  "ownerId": "classical-lo-class-c-quantity-formation",
  "prefix": "ClassicalLoClassCQuantityFormation",
  "operationId": "classical.lo.class.c.quantity.formation.execute",
  "inputContract": "complete-typed-classical-lo-class-c-quantity-formation-source",
  "domain": "classical-lo-class-c-quantity-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p1996",
    "claim-p1997",
    "claim-p1998",
    "claim-p1999",
    "claim-p2000"
  ],
  "coordinates": {
    "claim-p1996::p1996-class-c-source-base-final-phonemes-o-and-i": {
      "assertionId": "classical-lo-class-c-quantity-formation:p1996-class-c-source-base-final-phonemes-o-and-i",
      "canonicalPath": "nonactive.loClassC.authorizationStatus"
    },
    "claim-p1997::p1997-tla-ce-lia-to-receives-th": {
      "assertionId": "classical-lo-class-c-quantity-formation:p1997-tla-ce-lia-to-receives-th",
      "canonicalPath": "nonactive.loClassC.options.0.nonactiveStem"
    },
    "claim-p1998::p1998-tla-ihcuani-a-to-move-s-th": {
      "assertionId": "classical-lo-class-c-quantity-formation:p1998-tla-ihcuani-a-to-move-s-th",
      "canonicalPath": "nonactive.loClassC.options.0.finalVowelLength"
    },
    "claim-p1999::p1999-tla-tla-ti-a-to-burn-s-th": {
      "assertionId": "classical-lo-class-c-quantity-formation:p1999-tla-tla-ti-a-to-burn-s-th",
      "canonicalPath": "contract.exceptionFamilies.1"
    },
    "claim-p2000::p2000-there-are-exceptional-instances-in-which-a-long-vowel": {
      "assertionId": "classical-lo-class-c-quantity-formation:p2000-there-are-exceptional-instances-in-which-a-long-vowel",
      "canonicalPath": "nonactive.loClassC.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p1996": [],
    "claim-p1997": [],
    "claim-p1998": [],
    "claim-p1999": [],
    "claim-p2000": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1996": "authorized",
    "claim-p1997": "authorized",
    "claim-p1998": "authorized",
    "claim-p1999": "authorized",
    "claim-p2000": "authorized"
  }
};
export default Object.freeze(spec);
