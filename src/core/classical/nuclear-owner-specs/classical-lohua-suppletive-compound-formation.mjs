const spec = {
  "ownerId": "classical-lohua-suppletive-compound-formation",
  "prefix": "ClassicalLohuaSuppletiveCompoundFormation",
  "operationId": "classical.lohua.suppletive.compound.formation.execute",
  "inputContract": "complete-typed-classical-lohua-suppletive-compound-formation-source",
  "domain": "classical-lohua-suppletive-compound-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2004",
    "claim-p2005",
    "claim-p2006",
    "claim-p2007",
    "claim-p2008",
    "claim-p2009",
    "claim-p2010"
  ],
  "coordinates": {
    "claim-p2004::p2004-the-combination-lo-hua-is-suffixed-to-only-a": {
      "assertionId": "classical-lohua-suppletive-compound-formation:p2004-the-combination-lo-hua-is-suffixed-to-only-a",
      "canonicalPath": "nonactive.records.lohua.suffixFamily"
    },
    "claim-p2005::p2005-the-nonactive-stem-of-these-is-formed-on-one": {
      "assertionId": "classical-lohua-suppletive-compound-formation:p2005-the-nonactive-stem-of-these-is-formed-on-one",
      "canonicalPath": "nonactive.records.lohua.formationCore"
    },
    "claim-p2006::p2006-ca-h-to-be": {
      "assertionId": "classical-lohua-suppletive-compound-formation:p2006-ca-h-to-be",
      "canonicalPath": "nonactive.records.lohua.formationContinuation"
    },
    "claim-p2007::p2007-ya-uh-to-go": {
      "assertionId": "classical-lohua-suppletive-compound-formation:p2007-ya-uh-to-go",
      "canonicalPath": "nonactive.records.lohua.targetClass"
    },
    "claim-p2008::p2008-hui-tz-to-come": {
      "assertionId": "classical-lohua-suppletive-compound-formation:p2008-hui-tz-to-come",
      "canonicalPath": "nonactive.records.lohua.suffixFamily"
    },
    "claim-p2009::p2009-tla-itqui-tz-to-carry-s-th": {
      "assertionId": "classical-lohua-suppletive-compound-formation:p2009-tla-itqui-tz-to-carry-s-th",
      "canonicalPath": "nonactive.records.lohua.formationCore"
    },
    "claim-p2010::p2010-tla-huica-tz-to-bring-s-th": {
      "assertionId": "classical-lohua-suppletive-compound-formation:p2010-tla-huica-tz-to-bring-s-th",
      "canonicalPath": "nonactive.records.lohua.formationContinuation"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2004": [],
    "claim-p2005": [],
    "claim-p2006": [],
    "claim-p2007": [],
    "claim-p2008": [],
    "claim-p2009": [],
    "claim-p2010": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2004": "authorized",
    "claim-p2005": "authorized",
    "claim-p2006": "authorized",
    "claim-p2007": "authorized",
    "claim-p2008": "authorized",
    "claim-p2009": "authorized",
    "claim-p2010": "authorized"
  }
};
export default Object.freeze(spec);
