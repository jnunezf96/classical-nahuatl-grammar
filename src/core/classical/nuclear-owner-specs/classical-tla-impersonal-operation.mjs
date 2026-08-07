const spec = {
  "ownerId": "classical-tla-impersonal-operation",
  "prefix": "ClassicalTlaImpersonalOperation",
  "operationId": "classical.tla.impersonal.operation.execute",
  "inputContract": "complete-typed-classical-tla-impersonal-operation-source",
  "domain": "classical-tla-impersonal-operation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2168",
    "claim-p2169",
    "claim-p2170",
    "claim-p2171"
  ],
  "coordinates": {
    "claim-p2168::p2168-in-addition-to-the-impersonal-voice-vnc-built-on": {
      "assertionId": "classical-tla-impersonal-operation:p2168-in-addition-to-the-impersonal-voice-vnc-built-on",
      "canonicalPath": "impersonal.tla.authorizationStatus"
    },
    "claim-p2169::p2169-by-prefixing-the-derivational-morpheme-tla-to-an-active": {
      "assertionId": "classical-tla-impersonal-operation:p2169-by-prefixing-the-derivational-morpheme-tla-to-an-active",
      "canonicalPath": "impersonal.tla.stem"
    },
    "claim-p2170::p2170-the-source-verbstem-usually-has-an-inceptive-or-inchoative": {
      "assertionId": "classical-tla-impersonal-operation:p2170-the-source-verbstem-usually-has-an-inceptive-or-inchoative",
      "canonicalPath": "impersonal.tla.subject"
    },
    "claim-p2171::p2171-the-impersonalizing-tla-prefix-should-not-be-confused-with": {
      "assertionId": "classical-tla-impersonal-operation:p2171-the-impersonalizing-tla-prefix-should-not-be-confused-with",
      "canonicalPath": "impersonal.tlaRecord.callerSuppliedTargetAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2168": [],
    "claim-p2169": [],
    "claim-p2170": [],
    "claim-p2171": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2168": "authorized",
    "claim-p2169": "authorized",
    "claim-p2170": "authorized",
    "claim-p2171": "authorized"
  }
};
export default Object.freeze(spec);
