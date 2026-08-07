const spec = {
  "ownerId": "classical-adjectival-compound-whole-metaphoric-target",
  "prefix": "ClassicalAdjectivalCompoundWholeMetaphoricTarget",
  "operationId": "classical.adjectival.compound.whole.metaphoric.target.execute",
  "inputContract": "complete-typed-classical-adjectival-compound-whole-metaphoric-target-source",
  "domain": "classical-adjectival-compound-whole-metaphoric-target",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4042",
    "claim-p4043"
  ],
  "coordinates": {
    "claim-p4042::p4042-if-the-compound-nounstem-s-meaning-is-metaphorically-distanced": {
      "assertionId": "classical-adjectival-compound-whole-metaphoric-target:p4042-if-the-compound-nounstem-s-meaning-is-metaphorically-distanced",
      "canonicalPath": "cases.compoundWhole.canonicalResult"
    },
    "claim-p4043::p4043-of-course-if-the-compound-nounstem-s-meaning-is": {
      "assertionId": "classical-adjectival-compound-whole-metaphoric-target:p4043-of-course-if-the-compound-nounstem-s-meaning-is",
      "canonicalPath": "cases.compoundWhole.compoundHeadTarget"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4042": [],
    "claim-p4043": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4042": "authorized",
    "claim-p4043": "authorized"
  }
};
export default Object.freeze(spec);
