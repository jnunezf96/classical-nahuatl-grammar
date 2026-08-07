const spec = {
  "ownerId": "classical-compound-valence-combination-system",
  "prefix": "ClassicalCompoundValenceCombinationSystem",
  "operationId": "classical.compound.valence.combination.system.execute",
  "inputContract": "complete-typed-classical-compound-valence-combination-system-source",
  "domain": "classical-compound-valence-combination-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2751",
    "claim-p2752",
    "claim-p2753",
    "claim-p2754",
    "claim-p2755",
    "claim-p2756",
    "claim-p2757",
    "claim-p2758",
    "claim-p2759",
    "claim-p2760"
  ],
  "coordinates": {
    "claim-p2751::p2751-when-the-predicate-of-a-vnc-is-incorporated-into": {
      "assertionId": "classical-compound-valence-combination-system:p2751-when-the-predicate-of-a-vnc-is-incorporated-into",
      "canonicalPath": "contract.valencePatterns.0"
    },
    "claim-p2752::p2752-there-are-then-four-possible-combinations-in-a-compound": {
      "assertionId": "classical-compound-valence-combination-system:p2752-there-are-then-four-possible-combinations-in-a-compound",
      "canonicalPath": "contract.valencePatterns.1"
    },
    "claim-p2753::p2753-istem-tstem": {
      "assertionId": "classical-compound-valence-combination-system:p2753-istem-tstem",
      "canonicalPath": "contract.valencePatterns.2"
    },
    "claim-p2754::p2754-istem-istem": {
      "assertionId": "classical-compound-valence-combination-system:p2754-istem-istem",
      "canonicalPath": "contract.valencePatterns.3"
    },
    "claim-p2755::p2755-tstem-istem": {
      "assertionId": "classical-compound-valence-combination-system:p2755-tstem-istem",
      "canonicalPath": "contract.embedDeterminesCompoundValence"
    },
    "claim-p2756::p2756-tstem-tstem": {
      "assertionId": "classical-compound-valence-combination-system:p2756-tstem-tstem",
      "canonicalPath": "blockedCases.unknownMatrix.blockReason"
    },
    "claim-p2757::p2757-the-choice-of-stem-in-the-matrix-subposition-is": {
      "assertionId": "classical-compound-valence-combination-system:p2757-the-choice-of-stem-in-the-matrix-subposition-is",
      "canonicalPath": "contract.valencePatterns.0"
    },
    "claim-p2758::p2758-the-choice-of-an-intransitive-or-a-transitive-stem": {
      "assertionId": "classical-compound-valence-combination-system:p2758-the-choice-of-an-intransitive-or-a-transitive-stem",
      "canonicalPath": "contract.valencePatterns.1"
    },
    "claim-p2759::p2759-the-embed-subposition-determines-the-valence-of-the-compound": {
      "assertionId": "classical-compound-valence-combination-system:p2759-the-embed-subposition-determines-the-valence-of-the-compound",
      "canonicalPath": "contract.valencePatterns.2"
    },
    "claim-p2760::p2760-there-are-five-possible-patterns": {
      "assertionId": "classical-compound-valence-combination-system:p2760-there-are-five-possible-patterns",
      "canonicalPath": "contract.valencePatterns.3"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2751": [],
    "claim-p2752": [],
    "claim-p2753": [],
    "claim-p2754": [],
    "claim-p2755": [],
    "claim-p2756": [],
    "claim-p2757": [],
    "claim-p2758": [],
    "claim-p2759": [],
    "claim-p2760": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2751": "authorized",
    "claim-p2752": "authorized",
    "claim-p2753": "authorized",
    "claim-p2754": "authorized",
    "claim-p2755": "authorized",
    "claim-p2756": "authorized",
    "claim-p2757": "authorized",
    "claim-p2758": "authorized",
    "claim-p2759": "authorized",
    "claim-p2760": "authorized"
  }
};
export default Object.freeze(spec);
