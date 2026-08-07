const spec = {
  "ownerId": "classical-connective-t-compound-allomorphy",
  "prefix": "ClassicalConnectiveTCompoundAllomorphy",
  "operationId": "classical.connective.t.compound.allomorphy.execute",
  "inputContract": "complete-typed-classical-connective-t-compound-allomorphy-source",
  "domain": "classical-connective-t-compound-allomorphy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2761",
    "claim-p2762",
    "claim-p2763",
    "claim-p2764"
  ],
  "coordinates": {
    "claim-p2761::p2761-three-of-the-compound-verbstem-patterns-belong-overtly-to": {
      "assertionId": "classical-connective-t-compound-allomorphy:p2761-three-of-the-compound-verbstem-patterns-belong-overtly-to",
      "canonicalPath": "contract.connectiveAllomorphs.beforeVowel"
    },
    "claim-p2762::p2762-this-morpheme-has-two-morphs-t-and-ti-the": {
      "assertionId": "classical-connective-t-compound-allomorphy:p2762-this-morpheme-has-two-morphs-t-and-ti-the",
      "canonicalPath": "contract.connectiveAllomorphs.beforeConsonant"
    },
    "claim-p2763::p2763-as-has-been-suggested-in-28-3-this-connective": {
      "assertionId": "classical-connective-t-compound-allomorphy:p2763-as-has-been-suggested-in-28-3-this-connective",
      "canonicalPath": "contract.connectiveAllomorphs.supportiveVowelSeparatesConstituents"
    },
    "claim-p2764::p2764-this-is-not-what-happens-however-since-as-has": {
      "assertionId": "classical-connective-t-compound-allomorphy:p2764-this-is-not-what-happens-however-since-as-has",
      "canonicalPath": "contract.connectiveAllomorphs.beforeVowel"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2761": [],
    "claim-p2762": [],
    "claim-p2763": [],
    "claim-p2764": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2761": "authorized",
    "claim-p2762": "authorized",
    "claim-p2763": "authorized",
    "claim-p2764": "authorized"
  }
};
export default Object.freeze(spec);
