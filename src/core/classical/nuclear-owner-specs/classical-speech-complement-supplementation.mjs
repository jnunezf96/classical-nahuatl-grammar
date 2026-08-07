const spec = {
  "ownerId": "classical-speech-complement-supplementation",
  "prefix": "ClassicalSpeechComplementSupplementation",
  "operationId": "classical.speech.complement.supplementation.execute",
  "inputContract": "complete-typed-classical-speech-complement-supplementation-source",
  "domain": "classical-speech-complement-supplementation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1936",
    "claim-p1937",
    "claim-p1938",
    "claim-p1939",
    "claim-p1940"
  ],
  "coordinates": {
    "claim-p1936::p1936-verbstems-of-saying-questioning-etc-the-adjoined-sentence-can": {
      "assertionId": "classical-speech-complement-supplementation:p1936-verbstems-of-saying-questioning-etc-the-adjoined-sentence-can",
      "canonicalPath": "extractedFrames.speechPolicy.semanticGroup"
    },
    "claim-p1937::p1937-with-direct-speech-the-exact-expressions-spoken-written-etc": {
      "assertionId": "classical-speech-complement-supplementation:p1937-with-direct-speech-the-exact-expressions-spoken-written-etc",
      "canonicalPath": "extractedFrames.speechPolicy.speechDirectness"
    },
    "claim-p1938::p1938-since-direct-and-indirect-speech-stand-in-an-equally": {
      "assertionId": "classical-speech-complement-supplementation:p1938-since-direct-and-indirect-speech-stand-in-an-equally",
      "canonicalPath": "extractedFrames.speechPolicy.speechAct"
    },
    "claim-p1939::p1939-when-a-question-is-reported-in-indirect-or-direct": {
      "assertionId": "classical-speech-complement-supplementation:p1939-when-a-question-is-reported-in-indirect-or-direct",
      "canonicalPath": "speech.referenceFrame.wholeSupplementIsReferent"
    },
    "claim-p1940::p1940-when-a-command-is-reported-in-indirect-speech-verbstems": {
      "assertionId": "classical-speech-complement-supplementation:p1940-when-a-command-is-reported-in-indirect-speech-verbstems",
      "canonicalPath": "speech.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1936": [],
    "claim-p1937": [],
    "claim-p1938": [],
    "claim-p1939": [],
    "claim-p1940": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1936": "authorized",
    "claim-p1937": "authorized",
    "claim-p1938": "authorized",
    "claim-p1939": "authorized",
    "claim-p1940": "authorized"
  }
};
export default Object.freeze(spec);
