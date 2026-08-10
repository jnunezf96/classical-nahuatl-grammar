const spec = {
  "ownerId": "classical-vnc-subject-paradigm-formation",
  "prefix": "ClassicalVncSubjectParadigmFormation",
  "operationId": "classical.vnc.subject.paradigm.form",
  "inputContract": "complete-typed-classical-vnc-subject-paradigm-formation-source",
  "domain": "classical-vnc-subject-paradigm-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-finite-vnc-slots",
  "selections": [
    "claim-p728",
    "claim-p729",
    "claim-p730",
    "claim-p731",
    "claim-p732"
  ],
  "coordinates": {
    "claim-p728::p728-for-vncs-expressing-the-present-customary-present-imperfect-or": {
      "assertionId": "classical-vnc-subject-paradigm-formation:p728-for-vncs-expressing-the-present-customary-present-imperfect-or",
      "canonicalPath": "mainIndicative"
    },
    "claim-p729::p729-con-number-connector-morph": {
      "assertionId": "classical-vnc-subject-paradigm-formation:p729-con-number-connector-morph",
      "canonicalPath": "mainIndicativeConnector"
    },
    "claim-p730::p730-for-vncs-expressing-the-future-or-preterit-indicative-only": {
      "assertionId": "classical-vnc-subject-paradigm-formation:p730-for-vncs-expressing-the-future-or-preterit-indicative-only",
      "canonicalPath": "futurePreterit"
    },
    "claim-p731::p731-3-for-vncs-expressing-the-nonpast-optative": {
      "assertionId": "classical-vnc-subject-paradigm-formation:p731-3-for-vncs-expressing-the-nonpast-optative",
      "canonicalPath": "nonpastOptative"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSubjectParadigmSystemFrame",
  "executionValidatorName": "isClassicalNahuatlSubjectParadigmSystemFrame",
  "executionArgsBySelection": {
    "claim-p728": [],
    "claim-p729": [],
    "claim-p730": [],
    "claim-p731": [],
    "claim-p732": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p728": "authorized",
    "claim-p729": "authorized",
    "claim-p730": "authorized",
    "claim-p731": "authorized",
    "claim-p732": "authorized"
  }
};
export default Object.freeze(spec);
