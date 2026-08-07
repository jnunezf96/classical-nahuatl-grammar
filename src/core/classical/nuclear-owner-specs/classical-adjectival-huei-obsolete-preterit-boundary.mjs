const spec = {
  "ownerId": "classical-adjectival-huei-obsolete-preterit-boundary",
  "prefix": "ClassicalAdjectivalHueiObsoletePreteritBoundary",
  "operationId": "classical.adjectival.huei.obsolete.preterit.boundary.execute",
  "inputContract": "complete-typed-classical-adjectival-huei-obsolete-preterit-boundary-source",
  "domain": "classical-adjectival-huei-obsolete-preterit-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3930",
    "claim-p3931"
  ],
  "coordinates": {
    "claim-p3930::p3930-while-the-obsolete-preterit-agentive-nounstem-hue-i-c": {
      "assertionId": "classical-adjectival-huei-obsolete-preterit-boundary:p3930-while-the-obsolete-preterit-agentive-nounstem-hue-i-c",
      "canonicalPath": "contract.translationAuthority"
    },
    "claim-p3931::p3931-see-54-2-3-for-the-formation-of-the": {
      "assertionId": "classical-adjectival-huei-obsolete-preterit-boundary:p3931-see-54-2-3-for-the-formation-of-the",
      "canonicalPath": "contract.storedExampleAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3930": [],
    "claim-p3931": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3930": "authorized",
    "claim-p3931": "authorized"
  }
};
export default Object.freeze(spec);
