const spec = {
  "ownerId": "classical-clause-conjunction-sex-differentiated-reference",
  "prefix": "ClassicalClauseConjunctionSexDifferentiatedReference",
  "operationId": "classical.clause.conjunction.sex.differentiated.reference.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-sex-differentiated-reference-source",
  "domain": "classical-clause-conjunction-sex-differentiated-reference",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4901",
    "claim-p4902",
    "claim-p4903"
  ],
  "coordinates": {
    "claim-p4901::p4901-because-of-the-already-mentioned-requirement-that-the-subject": {
      "assertionId": "classical-clause-conjunction-sex-differentiated-reference:p4901-because-of-the-already-mentioned-requirement-that-the-subject",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4902::p4902-when-the-constituent-stems-refer-to-human-beings-differing": {
      "assertionId": "classical-clause-conjunction-sex-differentiated-reference:p4902-when-the-constituent-stems-refer-to-human-beings-differing",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4903::p4903-for-example-na-n-tli-mother-and-tah-tli": {
      "assertionId": "classical-clause-conjunction-sex-differentiated-reference:p4903-for-example-na-n-tli-mother-and-tah-tli",
      "canonicalPath": "analysis.rawStoredAuthorityBlocked"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4901": [
      "sex-differentiated-reference"
    ],
    "claim-p4902": [
      "sex-differentiated-reference"
    ],
    "claim-p4903": [
      "sex-differentiated-reference"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4901": "authorized",
    "claim-p4902": "authorized",
    "claim-p4903": "authorized"
  }
};
export default Object.freeze(spec);
