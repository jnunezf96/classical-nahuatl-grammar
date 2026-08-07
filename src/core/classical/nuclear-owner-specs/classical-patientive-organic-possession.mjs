const spec = {
  "ownerId": "classical-patientive-organic-possession",
  "prefix": "ClassicalPatientiveOrganicPossession",
  "operationId": "classical.patientive.organic.possession.execute",
  "inputContract": "complete-typed-classical-patientive-organic-possession-source",
  "domain": "classical-patientive-organic-possession",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3787",
    "claim-p3788",
    "claim-p3789",
    "claim-p3790",
    "claim-p3791",
    "claim-p3792",
    "claim-p3793",
    "claim-p3794",
    "claim-p3795"
  ],
  "coordinates": {
    "claim-p3787::p3787-other-body-parts-such-as-hair-eyes-fingers-fingernails": {
      "assertionId": "classical-patientive-organic-possession:p3787-other-body-parts-such-as-hair-eyes-fingers-fingernails",
      "canonicalPath": "cases.organicPossession.authorizationStatus"
    },
    "claim-p3788::p3788-even-a-body-part-named-by-a-compound-nounstem": {
      "assertionId": "classical-patientive-organic-possession:p3788-even-a-body-part-named-by-a-compound-nounstem",
      "canonicalPath": "cases.organicPossession.first.canonicalResult"
    },
    "claim-p3789::p3789-furthermore-a-compound-stem-with-yo-tl-as-matrix": {
      "assertionId": "classical-patientive-organic-possession:p3789-furthermore-a-compound-stem-with-yo-tl-as-matrix",
      "canonicalPath": "cases.organicPossession.second.canonicalResult"
    },
    "claim-p3790::p3790-peculiar-discrepancies-may-occur": {
      "assertionId": "classical-patientive-organic-possession:p3790-peculiar-discrepancies-may-occur",
      "canonicalPath": "cases.organicPossession.second.allowedStates.0"
    },
    "claim-p3791::p3791-furthermore-when-in-the-meaning-of-upper-part-end": {
      "assertionId": "classical-patientive-organic-possession:p3791-furthermore-when-in-the-meaning-of-upper-part-end",
      "canonicalPath": "cases.organicPossession.authorizationStatus"
    },
    "claim-p3792::p3792-the-notion-of-organic-versus-adventitious-possession-is-not": {
      "assertionId": "classical-patientive-organic-possession:p3792-the-notion-of-organic-versus-adventitious-possession-is-not",
      "canonicalPath": "cases.organicPossession.first.canonicalResult"
    },
    "claim-p3793::p3793-the-kind-of-compound-stem-in-which-yo-tl": {
      "assertionId": "classical-patientive-organic-possession:p3793-the-kind-of-compound-stem-in-which-yo-tl",
      "canonicalPath": "cases.organicPossession.second.canonicalResult"
    },
    "claim-p3794::p3794-remark-there-are-those-who-misread-to-naca-yo": {
      "assertionId": "classical-patientive-organic-possession:p3794-remark-there-are-those-who-misread-to-naca-yo",
      "canonicalPath": "cases.organicPossession.second.allowedStates.0"
    },
    "claim-p3795::p3795-the-kind-of-compound-nounstem-in-which-yo-tl": {
      "assertionId": "classical-patientive-organic-possession:p3795-the-kind-of-compound-nounstem-in-which-yo-tl",
      "canonicalPath": "cases.organicPossession.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3787": [],
    "claim-p3788": [],
    "claim-p3789": [],
    "claim-p3790": [],
    "claim-p3791": [],
    "claim-p3792": [],
    "claim-p3793": [],
    "claim-p3794": [],
    "claim-p3795": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3787": "authorized",
    "claim-p3788": "authorized",
    "claim-p3789": "authorized",
    "claim-p3790": "authorized",
    "claim-p3791": "authorized",
    "claim-p3792": "authorized",
    "claim-p3793": "authorized",
    "claim-p3794": "authorized",
    "claim-p3795": "authorized"
  }
};
export default Object.freeze(spec);
