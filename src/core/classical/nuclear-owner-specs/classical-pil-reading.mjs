const spec = {
  "ownerId": "classical-pil-reading",
  "prefix": "ClassicalPilReading",
  "operationId": "classical.pil.reading.execute",
  "inputContract": "complete-typed-classical-pil-reading-source",
  "domain": "classical-pil-reading",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3170",
    "claim-p3171",
    "claim-p3172",
    "claim-p3173"
  ],
  "coordinates": {
    "claim-p3170::p3170-the-basic-meaning-of-the-nounstem-pil-li-is": {
      "assertionId": "classical-pil-reading:p3170-the-basic-meaning-of-the-nounstem-pil-li-is",
      "canonicalPath": "cases.pilReading.rules.pil/reading"
    },
    "claim-p3171::p3171-the-meaning-is-also-obvious-in-certain-compound-nounstems": {
      "assertionId": "classical-pil-reading:p3171-the-meaning-is-also-obvious-in-certain-compound-nounstems",
      "canonicalPath": "cases.pilReading.authorizationStatus"
    },
    "claim-p3172::p3172-when-however-the-nounstem-is-used-in-simple-stemmed": {
      "assertionId": "classical-pil-reading:p3172-when-however-the-nounstem-is-used-in-simple-stemmed",
      "canonicalPath": "cases.pilReading.gcdSatisfied"
    },
    "claim-p3173::p3173-for-the-most-part-nncs-built-on-the-stem": {
      "assertionId": "classical-pil-reading:p3173-for-the-most-part-nncs-built-on-the-stem",
      "canonicalPath": "cases.pilReading.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3170": [],
    "claim-p3171": [],
    "claim-p3172": [],
    "claim-p3173": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3170": "authorized",
    "claim-p3171": "authorized",
    "claim-p3172": "authorized",
    "claim-p3173": "authorized"
  }
};
export default Object.freeze(spec);
