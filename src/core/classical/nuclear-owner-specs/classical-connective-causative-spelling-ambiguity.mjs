const spec = {
  "ownerId": "classical-connective-causative-spelling-ambiguity",
  "prefix": "ClassicalConnectiveCausativeSpellingAmbiguity",
  "operationId": "classical.connective.causative.spelling.ambiguity.execute",
  "inputContract": "complete-typed-classical-connective-causative-spelling-ambiguity-source",
  "domain": "classical-connective-causative-spelling-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2789",
    "claim-p2790",
    "claim-p2791",
    "claim-p2792",
    "claim-p2793",
    "claim-p2794"
  ],
  "coordinates": {
    "claim-p2789::p2789-note-2-in-texts-with-a-traditional-spelling-a": {
      "assertionId": "classical-connective-causative-spelling-ambiguity:p2789-note-2-in-texts-with-a-traditional-spelling-a",
      "canonicalPath": "contract.traditionalSpellingRole"
    },
    "claim-p2790::p2790-the-ending-spelled-tia-in-such-texts-may-represent": {
      "assertionId": "classical-connective-causative-spelling-ambiguity:p2790-the-ending-spelled-tia-in-such-texts-may-represent",
      "canonicalPath": "contract.formulaStringAuthority"
    },
    "claim-p2791::p2791-thus-mauhtia-is-a-connective-t-vnc-i-e": {
      "assertionId": "classical-connective-causative-spelling-ambiguity:p2791-thus-mauhtia-is-a-connective-t-vnc-i-e",
      "canonicalPath": "contract.surfaceStringAuthority"
    },
    "claim-p2792::p2792-there-are-occasional-instances-when-no-overt-distinctions-are": {
      "assertionId": "classical-connective-causative-spelling-ambiguity:p2792-there-are-occasional-instances-when-no-overt-distinctions-are",
      "canonicalPath": "contract.traditionalSpellingRole"
    },
    "claim-p2793::p2793-similarly-an-imperfect-indicative-vnc-spelled-with-a-final": {
      "assertionId": "classical-connective-causative-spelling-ambiguity:p2793-similarly-an-imperfect-indicative-vnc-spelled-with-a-final",
      "canonicalPath": "contract.formulaStringAuthority"
    },
    "claim-p2794::p2794-the-traditionally-spelled-ending-tiani-may-represent-the-connective": {
      "assertionId": "classical-connective-causative-spelling-ambiguity:p2794-the-traditionally-spelled-ending-tiani-may-represent-the-connective",
      "canonicalPath": "contract.surfaceStringAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2789": [],
    "claim-p2790": [],
    "claim-p2791": [],
    "claim-p2792": [],
    "claim-p2793": [],
    "claim-p2794": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2789": "authorized",
    "claim-p2790": "authorized",
    "claim-p2791": "authorized",
    "claim-p2792": "authorized",
    "claim-p2793": "authorized",
    "claim-p2794": "authorized"
  }
};
export default Object.freeze(spec);
