const spec = {
  "ownerId": "classical-wish-complement-realizability",
  "prefix": "ClassicalWishComplementRealizability",
  "operationId": "classical.wish.complement.realizability.execute",
  "inputContract": "complete-typed-classical-wish-complement-realizability-source",
  "domain": "classical-wish-complement-realizability",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1941",
    "claim-p1942",
    "claim-p1943",
    "claim-p1944",
    "claim-p1945",
    "claim-p1946",
    "claim-p1947",
    "claim-p1948",
    "claim-p1949",
    "claim-p1950"
  ],
  "coordinates": {
    "claim-p1941::p1941-if-the-wish-etc-is-realizable-the-adjoined-clause": {
      "assertionId": "classical-wish-complement-realizability:p1941-if-the-wish-etc-is-realizable-the-adjoined-clause",
      "canonicalPath": "extractedFrames.wishPolicy.semanticGroup"
    },
    "claim-p1942::p1942-result-etc-is-realizable-the-adjoined-clause-functioning-as": {
      "assertionId": "classical-wish-complement-realizability:p1942-result-etc-is-realizable-the-adjoined-clause-functioning-as",
      "canonicalPath": "extractedFrames.wishPolicy.wishRealizability"
    },
    "claim-p1943::p1943-the-adjoined-clause-has-a-nonpast-optative-vnc-because": {
      "assertionId": "classical-wish-complement-realizability:p1943-the-adjoined-clause-has-a-nonpast-optative-vnc-because",
      "canonicalPath": "extractedFrames.wishPolicy.supplementMood"
    },
    "claim-p1944::p1944-the-verbstem-m-o-nequi-to-want-itself-is": {
      "assertionId": "classical-wish-complement-realizability:p1944-the-verbstem-m-o-nequi-to-want-itself-is",
      "canonicalPath": "extractedFrames.wishPolicy.supplementTense"
    },
    "claim-p1945::p1945-the-adjoined-clause-functions-as-a-supplementary-subject-for": {
      "assertionId": "classical-wish-complement-realizability:p1945-the-adjoined-clause-functions-as-a-supplementary-subject-for",
      "canonicalPath": "includedWish.referenceFrame.wholeSupplementIsReferent"
    },
    "claim-p1946::p1946-if-the-wish-is-unrealizable-because-it-does-not": {
      "assertionId": "classical-wish-complement-realizability:p1946-if-the-wish-is-unrealizable-because-it-does-not",
      "canonicalPath": "includedWish.authorizationStatus"
    },
    "claim-p1947::p1947-if-the-wish-is-unrealizable-because-it-does-not": {
      "assertionId": "classical-wish-complement-realizability:p1947-if-the-wish-is-unrealizable-because-it-does-not",
      "canonicalPath": "extractedFrames.wishPolicy.semanticGroup"
    },
    "claim-p1948::p1948-but-it-is-not-possible": {
      "assertionId": "classical-wish-complement-realizability:p1948-but-it-is-not-possible",
      "canonicalPath": "extractedFrames.wishPolicy.wishRealizability"
    },
    "claim-p1949::p1949-if-the-wish-is-unfulfillable-because-it-is-contrary": {
      "assertionId": "classical-wish-complement-realizability:p1949-if-the-wish-is-unfulfillable-because-it-is-contrary",
      "canonicalPath": "extractedFrames.wishPolicy.supplementMood"
    },
    "claim-p1950::p1950-result-the-past-optative-usually-preceded-by-the-antecessive": {
      "assertionId": "classical-wish-complement-realizability:p1950-result-the-past-optative-usually-preceded-by-the-antecessive",
      "canonicalPath": "extractedFrames.wishPolicy.supplementTense"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1941": [],
    "claim-p1942": [],
    "claim-p1943": [],
    "claim-p1944": [],
    "claim-p1945": [],
    "claim-p1946": [],
    "claim-p1947": [],
    "claim-p1948": [],
    "claim-p1949": [],
    "claim-p1950": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1941": "authorized",
    "claim-p1942": "authorized",
    "claim-p1943": "authorized",
    "claim-p1944": "authorized",
    "claim-p1945": "authorized",
    "claim-p1946": "authorized",
    "claim-p1947": "authorized",
    "claim-p1948": "authorized",
    "claim-p1949": "authorized",
    "claim-p1950": "authorized"
  }
};
export default Object.freeze(spec);
