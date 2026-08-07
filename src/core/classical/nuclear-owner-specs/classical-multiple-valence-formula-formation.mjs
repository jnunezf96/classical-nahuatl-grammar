const spec = {
  "ownerId": "classical-multiple-valence-formula-formation",
  "prefix": "ClassicalMultipleValenceFormulaFormation",
  "operationId": "classical.multiple.valence.formula.formation.execute",
  "inputContract": "complete-typed-classical-multiple-valence-formula-formation-source",
  "domain": "classical-multiple-valence-formula-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2226",
    "claim-p2227",
    "claim-p2228",
    "claim-p2229",
    "claim-p2230"
  ],
  "coordinates": {
    "claim-p2226::p2226-linear-format-pers1-pers2-va-va-va-dbase-caus": {
      "assertionId": "classical-multiple-valence-formula-formation:p2226-linear-format-pers1-pers2-va-va-va-dbase-caus",
      "canonicalPath": "objectHistory.twoSpecificPassive.authorizationStatus"
    },
    "claim-p2227::p2227-1-pers1-pers2-num1-num2-subject": {
      "assertionId": "classical-multiple-valence-formula-formation:p2227-1-pers1-pers2-num1-num2-subject",
      "canonicalPath": "objectHistory.twoSpecificPassive.formulaRealization"
    },
    "claim-p2228::p2228-2-va-dbase-direc-srce-caus-srce-caus-applic": {
      "assertionId": "classical-multiple-valence-formula-formation:p2228-2-va-dbase-direc-srce-caus-srce-caus-applic",
      "canonicalPath": "objectHistory.twoSpecific.valenceArity"
    },
    "claim-p2229::p2229-earlier-lines-inside-the-core-lines-3-and-2": {
      "assertionId": "classical-multiple-valence-formula-formation:p2229-earlier-lines-inside-the-core-lines-3-and-2",
      "canonicalPath": "objectHistory.twoSpecificPassive.authorizationStatus"
    },
    "claim-p2230::p2230-the-mainline-object-pronoun-the-object-last-added-in": {
      "assertionId": "classical-multiple-valence-formula-formation:p2230-the-mainline-object-pronoun-the-object-last-added-in",
      "canonicalPath": "objectHistory.twoSpecificPassive.formulaRealization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2226": [],
    "claim-p2227": [],
    "claim-p2228": [],
    "claim-p2229": [],
    "claim-p2230": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2226": "authorized",
    "claim-p2227": "authorized",
    "claim-p2228": "authorized",
    "claim-p2229": "authorized",
    "claim-p2230": "authorized"
  }
};
export default Object.freeze(spec);
