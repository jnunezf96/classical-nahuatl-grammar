const spec = {
  "ownerId": "classical-short-pronominal-supplement-boundary",
  "prefix": "ClassicalShortPronominalSupplementBoundary",
  "operationId": "classical.short.pronominal.supplement.boundary.execute",
  "inputContract": "complete-typed-classical-short-pronominal-supplement-boundary-source",
  "domain": "classical-short-pronominal-supplement-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1833",
    "claim-p1834"
  ],
  "coordinates": {
    "claim-p1833::p1833-the-pronominal-nncs-neh-teh-etc-cannot-stand-alone": {
      "assertionId": "classical-short-pronominal-supplement-boundary:p1833-the-pronominal-nncs-neh-teh-etc-cannot-stand-alone",
      "canonicalPath": "extractedFrames.shortPronominal.standaloneUtteranceAllowed"
    },
    "claim-p1834::p1834-they-occur-ordinarily-as-supplements-they-may-however-serve": {
      "assertionId": "classical-short-pronominal-supplement-boundary:p1834-they-occur-ordinarily-as-supplements-they-may-however-serve",
      "canonicalPath": "extractedFrames.shortPronominal.completeClauseStatusPreserved"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1833": [],
    "claim-p1834": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1833": "authorized",
    "claim-p1834": "authorized"
  }
};
export default Object.freeze(spec);
