const spec = {
  "ownerId": "classical-adjectival-possessor-included-adjectival-system",
  "prefix": "ClassicalAdjectivalPossessorIncludedAdjectivalSystem",
  "operationId": "classical.adjectival.possessor.included.adjectival.system.execute",
  "inputContract": "complete-typed-classical-adjectival-possessor-included-adjectival-system-source",
  "domain": "classical-adjectival-possessor-included-adjectival-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3872",
    "claim-p3873",
    "claim-p3874",
    "claim-p3875",
    "claim-p3876",
    "claim-p3877"
  ],
  "coordinates": {
    "claim-p3872::p3872-the-nncs-formed-on-them-are-translated-into-english": {
      "assertionId": "classical-adjectival-possessor-included-adjectival-system:p3872-the-nncs-formed-on-them-are-translated-into-english",
      "canonicalPath": "sources.higherPronominal.authorizationStatus"
    },
    "claim-p3873::p3873-two-adjective-stems-are-anomalous": {
      "assertionId": "classical-adjectival-possessor-included-adjectival-system:p3873-two-adjective-stems-are-anomalous",
      "canonicalPath": "cases.pronominalHead.canonicalResult"
    },
    "claim-p3874::p3874-when-the-subject-pronoun-is-plural": {
      "assertionId": "classical-adjectival-possessor-included-adjectival-system:p3874-when-the-subject-pronoun-is-plural",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    },
    "claim-p3875::p3875-despite-the-presence-of-the-possessor-pronoun-the-nncs": {
      "assertionId": "classical-adjectival-possessor-included-adjectival-system:p3875-despite-the-presence-of-the-possessor-pronoun-the-nncs",
      "canonicalPath": "sources.higherPronominal.authorizationStatus"
    },
    "claim-p3876::p3876-the-peculiarity-here-is-that-these-nncs-have-possessor": {
      "assertionId": "classical-adjectival-possessor-included-adjectival-system:p3876-the-peculiarity-here-is-that-these-nncs-have-possessor",
      "canonicalPath": "cases.pronominalHead.canonicalResult"
    },
    "claim-p3877::p3877-the-nnc-s-subject-pronoun-s-person-position-is": {
      "assertionId": "classical-adjectival-possessor-included-adjectival-system:p3877-the-nnc-s-subject-pronoun-s-person-position-is",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3872": [],
    "claim-p3873": [],
    "claim-p3874": [],
    "claim-p3875": [],
    "claim-p3876": [],
    "claim-p3877": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3872": "authorized",
    "claim-p3873": "authorized",
    "claim-p3874": "authorized",
    "claim-p3875": "authorized",
    "claim-p3876": "authorized",
    "claim-p3877": "authorized"
  }
};
export default Object.freeze(spec);
