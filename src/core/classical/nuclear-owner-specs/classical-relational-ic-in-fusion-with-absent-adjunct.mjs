const spec = {
  "ownerId": "classical-relational-ic-in-fusion-with-absent-adjunct",
  "prefix": "ClassicalRelationalIcInFusionWithAbsentAdjunct",
  "operationId": "classical.relational.ic.in.fusion.with.absent.adjunct.execute",
  "inputContract": "complete-typed-classical-relational-ic-in-fusion-with-absent-adjunct-source",
  "domain": "classical-relational-ic-in-fusion-with-absent-adjunct",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4292",
    "claim-p4293",
    "claim-p4294",
    "claim-p4295",
    "claim-p4296"
  ],
  "coordinates": {
    "claim-p4292::p4292-when-i-c-serves-as-the-principal-clause-in": {
      "assertionId": "classical-relational-ic-in-fusion-with-absent-adjunct:p4292-when-i-c-serves-as-the-principal-clause-in",
      "canonicalPath": "cases.icFusedIn.canonicalResult"
    },
    "claim-p4293::p4293-when-i-c-serves-as-the-principal-clause-in": {
      "assertionId": "classical-relational-ic-in-fusion-with-absent-adjunct:p4293-when-i-c-serves-as-the-principal-clause-in",
      "canonicalPath": "cases.icFusedIn.contextualFacts.fusedAdjunctorSurfaceAllowed"
    },
    "claim-p4294::p4294-when-the-clause-that-in-should-introduce-is-left": {
      "assertionId": "classical-relational-ic-in-fusion-with-absent-adjunct:p4294-when-the-clause-that-in-should-introduce-is-left",
      "canonicalPath": "cases.icSeparatedIn.contextualFacts.fusedAdjunctorSurfaceAllowed"
    },
    "claim-p4295::p4295-but-the-collocation-i-c-in-is-used-so": {
      "assertionId": "classical-relational-ic-in-fusion-with-absent-adjunct:p4295-but-the-collocation-i-c-in-is-used-so",
      "canonicalPath": "cases.icFusedIn.canonicalResult"
    },
    "claim-p4296::p4296-this-fusion-brought-about-by-the-absence-of-a": {
      "assertionId": "classical-relational-ic-in-fusion-with-absent-adjunct:p4296-this-fusion-brought-about-by-the-absence-of-a",
      "canonicalPath": "cases.icFusedIn.contextualFacts.fusedAdjunctorSurfaceAllowed"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4292": [],
    "claim-p4293": [],
    "claim-p4294": [],
    "claim-p4295": [],
    "claim-p4296": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4292": "authorized",
    "claim-p4293": "authorized",
    "claim-p4294": "authorized",
    "claim-p4295": "authorized",
    "claim-p4296": "authorized"
  }
};
export default Object.freeze(spec);
