const spec = {
  "ownerId": "classical-relational-locative-can-patientive-modifier-state",
  "prefix": "ClassicalRelationalLocativeCanPatientiveModifierState",
  "operationId": "classical.relational.locative.can.patientive.modifier.state.execute",
  "inputContract": "complete-typed-classical-relational-locative-can-patientive-modifier-state-source",
  "domain": "classical-relational-locative-can-patientive-modifier-state",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4363",
    "claim-p4364",
    "claim-p4365"
  ],
  "coordinates": {
    "claim-p4363::p4363-the-embed-may-be-a-patientive-nounstem-cua-l": {
      "assertionId": "classical-relational-locative-can-patientive-modifier-state:p4363-the-embed-may-be-a-patientive-nounstem-cua-l",
      "canonicalPath": "cases.canPatientive.canonicalResult"
    },
    "claim-p4364::p4364-when-the-embed-is-an-imperfective-patientive-nounstem-formed": {
      "assertionId": "classical-relational-locative-can-patientive-modifier-state:p4364-when-the-embed-is-an-imperfective-patientive-nounstem-formed",
      "canonicalPath": "cases.canPatientive.predicateStem"
    },
    "claim-p4365::p4365-when-the-embed-is-an-imperfective-patientive-nounstem-formed": {
      "assertionId": "classical-relational-locative-can-patientive-modifier-state:p4365-when-the-embed-is-an-imperfective-patientive-nounstem-formed",
      "canonicalPath": "cases.canPatientive.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4363": [],
    "claim-p4364": [],
    "claim-p4365": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4363": "authorized",
    "claim-p4364": "authorized",
    "claim-p4365": "authorized"
  }
};
export default Object.freeze(spec);
