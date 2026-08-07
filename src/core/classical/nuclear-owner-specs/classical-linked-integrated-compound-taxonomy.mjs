const spec = {
  "ownerId": "classical-linked-integrated-compound-taxonomy",
  "prefix": "ClassicalLinkedIntegratedCompoundTaxonomy",
  "operationId": "classical.linked.integrated.compound.taxonomy.execute",
  "inputContract": "complete-typed-classical-linked-integrated-compound-taxonomy-source",
  "domain": "classical-linked-integrated-compound-taxonomy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2745",
    "claim-p2746",
    "claim-p2747",
    "claim-p2748",
    "claim-p2749",
    "claim-p2750"
  ],
  "coordinates": {
    "claim-p2745::p2745-depending-on-the-relationship-between-embed-and-matrix-a": {
      "assertionId": "classical-linked-integrated-compound-taxonomy:p2745-depending-on-the-relationship-between-embed-and-matrix-a",
      "canonicalPath": "contract.compoundTypes.0"
    },
    "claim-p2746::p2746-in-linked-compounding-which-is-the-simpler-of-the": {
      "assertionId": "classical-linked-integrated-compound-taxonomy:p2746-in-linked-compounding-which-is-the-simpler-of-the",
      "canonicalPath": "contract.compoundTypes.1"
    },
    "claim-p2747::p2747-this-compartmentalization-can-be-accomplished-either-overtly-by-means": {
      "assertionId": "classical-linked-integrated-compound-taxonomy:p2747-this-compartmentalization-can-be-accomplished-either-overtly-by-means",
      "canonicalPath": "contract.linkedRealizations.0"
    },
    "claim-p2748::p2748-stems-of-the-former-kind-are-called-connectivet-compounds": {
      "assertionId": "classical-linked-integrated-compound-taxonomy:p2748-stems-of-the-former-kind-are-called-connectivet-compounds",
      "canonicalPath": "contract.linkedRealizations.1"
    },
    "claim-p2749::p2749-in-integrated-compounding-the-matrix-takes-over-or-enslaves": {
      "assertionId": "classical-linked-integrated-compound-taxonomy:p2749-in-integrated-compounding-the-matrix-takes-over-or-enslaves",
      "canonicalPath": "contract.compoundTypes.0"
    },
    "claim-p2750::p2750-compound-verbstems-are-discussed-in-the-rest-of-this": {
      "assertionId": "classical-linked-integrated-compound-taxonomy:p2750-compound-verbstems-are-discussed-in-the-rest-of-this",
      "canonicalPath": "contract.compoundTypes.1"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2745": [],
    "claim-p2746": [],
    "claim-p2747": [],
    "claim-p2748": [],
    "claim-p2749": [],
    "claim-p2750": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2745": "authorized",
    "claim-p2746": "authorized",
    "claim-p2747": "authorized",
    "claim-p2748": "authorized",
    "claim-p2749": "authorized",
    "claim-p2750": "authorized"
  }
};
export default Object.freeze(spec);
