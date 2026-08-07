const spec = {
  "ownerId": "classical-never-possessive-metaphorical-override",
  "prefix": "ClassicalNeverPossessiveMetaphoricalOverride",
  "operationId": "classical.never.possessive.metaphorical.override.execute",
  "inputContract": "complete-typed-classical-never-possessive-metaphorical-override-source",
  "domain": "classical-never-possessive-metaphorical-override",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1638",
    "claim-p1639"
  ],
  "coordinates": {
    "claim-p1638::p1638-note-2-in-contrast-to-naturally-possessed-stems-there": {
      "assertionId": "classical-never-possessive-metaphorical-override:p1638-note-2-in-contrast-to-naturally-possessed-stems-there",
      "canonicalPath": "blockedPossessiveFrame.blockReason"
    },
    "claim-p1639::p1639-of-course-metaphorical-usage-can-override-this-restriction": {
      "assertionId": "classical-never-possessive-metaphorical-override:p1639-of-course-metaphorical-usage-can-override-this-restriction",
      "canonicalPath": "metaphoricalOverrideFrame.metaphoricalOverrideUsedForState"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1638": [
      "l15-never-possessive"
    ],
    "claim-p1639": [
      "l15-never-possessive"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1638": "authorized",
    "claim-p1639": "authorized"
  }
};
export default Object.freeze(spec);
