const spec = {
  "ownerId": "classical-passive-recursive-three-object-transformation",
  "prefix": "ClassicalPassiveRecursiveThreeObjectTransformation",
  "operationId": "classical.passive.recursive.three.object.transformation.execute",
  "inputContract": "complete-typed-classical-passive-recursive-three-object-transformation-source",
  "domain": "classical-passive-recursive-three-object-transformation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2125"
  ],
  "coordinates": {
    "claim-p2125::p2125-if-the-active-source-has-three-object-pronouns-see": {
      "assertionId": "classical-passive-recursive-three-object-transformation:p2125-if-the-active-source-has-three-object-pronouns-see",
      "canonicalPath": "voice.threeSpecificPassive.derived.objectCarriers"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2125": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2125": "authorized"
  }
};
export default Object.freeze(spec);
