const spec = {
  "ownerId": "classical-object-participant-history-ceiling",
  "prefix": "ClassicalObjectParticipantHistoryCeiling",
  "operationId": "classical.object.participant.history.ceiling.execute",
  "inputContract": "complete-typed-classical-object-participant-history-ceiling-source",
  "domain": "classical-object-participant-history-ceiling",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2194",
    "claim-p2195",
    "claim-p2196",
    "claim-p2197",
    "claim-p2198",
    "claim-p2199",
    "claim-p2200",
    "claim-p2201",
    "claim-p2202"
  ],
  "coordinates": {
    "claim-p2194::p2194-this-means-that-in-addition-to-the-single-object": {
      "assertionId": "classical-object-participant-history-ceiling:p2194-this-means-that-in-addition-to-the-single-object",
      "canonicalPath": "objectHistory.maximumLicensedObjectCount"
    },
    "claim-p2195::p2195-no-core-however-can-have-more-than-three": {
      "assertionId": "classical-object-participant-history-ceiling:p2195-no-core-however-can-have-more-than-three",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positionCount"
    },
    "claim-p2196::p2196-because-verb-objects-can-be-brought-into-a-verbal": {
      "assertionId": "classical-object-participant-history-ceiling:p2196-because-verb-objects-can-be-brought-into-a-verbal",
      "canonicalPath": "objectHistory.reflexiveNonspecific.derivationalLevelsContiguous"
    },
    "claim-p2197::p2197-va-ibase-suf": {
      "assertionId": "classical-object-participant-history-ceiling:p2197-va-ibase-suf",
      "canonicalPath": "objectHistory.maximumLicensedObjectCount"
    },
    "claim-p2198::p2198-va-va-ibase-suf-suf": {
      "assertionId": "classical-object-participant-history-ceiling:p2198-va-va-ibase-suf-suf",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positionCount"
    },
    "claim-p2199::p2199-va-va-va-ibase-suf-suf-suf": {
      "assertionId": "classical-object-participant-history-ceiling:p2199-va-va-va-ibase-suf-suf-suf",
      "canonicalPath": "objectHistory.reflexiveNonspecific.derivationalLevelsContiguous"
    },
    "claim-p2200::p2200-va-stem": {
      "assertionId": "classical-object-participant-history-ceiling:p2200-va-stem",
      "canonicalPath": "objectHistory.maximumLicensedObjectCount"
    },
    "claim-p2201::p2201-va-va-dbase-suf": {
      "assertionId": "classical-object-participant-history-ceiling:p2201-va-va-dbase-suf",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positionCount"
    },
    "claim-p2202::p2202-va-va-va-dbase-suf-suf": {
      "assertionId": "classical-object-participant-history-ceiling:p2202-va-va-va-dbase-suf-suf",
      "canonicalPath": "objectHistory.reflexiveNonspecific.derivationalLevelsContiguous"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2194": [],
    "claim-p2195": [],
    "claim-p2196": [],
    "claim-p2197": [],
    "claim-p2198": [],
    "claim-p2199": [],
    "claim-p2200": [],
    "claim-p2201": [],
    "claim-p2202": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2194": "authorized",
    "claim-p2195": "authorized",
    "claim-p2196": "authorized",
    "claim-p2197": "authorized",
    "claim-p2198": "authorized",
    "claim-p2199": "authorized",
    "claim-p2200": "authorized",
    "claim-p2201": "authorized",
    "claim-p2202": "authorized"
  }
};
export default Object.freeze(spec);
