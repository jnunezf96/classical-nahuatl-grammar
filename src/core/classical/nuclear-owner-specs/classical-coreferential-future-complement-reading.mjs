const spec = {
  "ownerId": "classical-coreferential-future-complement-reading",
  "prefix": "ClassicalCoreferentialFutureComplementReading",
  "operationId": "classical.coreferential.future.complement.reading.execute",
  "inputContract": "complete-typed-classical-coreferential-future-complement-reading-source",
  "domain": "classical-coreferential-future-complement-reading",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1958",
    "claim-p1959",
    "claim-p1960"
  ],
  "coordinates": {
    "claim-p1958::p1958-when-a-structure-of-included-referent-supplementation-has-1": {
      "assertionId": "classical-coreferential-future-complement-reading:p1958-when-a-structure-of-included-referent-supplementation-has-1",
      "canonicalPath": "extractedFrames.coreferentialFuture.supplementTense"
    },
    "claim-p1959::p1959-to-know-how-to-to-remember-to-etc-when": {
      "assertionId": "classical-coreferential-future-complement-reading:p1959-to-know-how-to-to-remember-to-etc-when",
      "canonicalPath": "extractedFrames.coreferentialFuture.subjectsCoreferential"
    },
    "claim-p1960::p1960-the-mentioned-verbstems-are-therefore-translated-to-know-how": {
      "assertionId": "classical-coreferential-future-complement-reading:p1960-the-mentioned-verbstems-are-therefore-translated-to-know-how",
      "canonicalPath": "extractedFrames.coreferentialFuture.infinitiveReadingLicensed"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1958": [],
    "claim-p1959": [],
    "claim-p1960": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1958": "authorized",
    "claim-p1959": "authorized",
    "claim-p1960": "authorized"
  }
};
export default Object.freeze(spec);
