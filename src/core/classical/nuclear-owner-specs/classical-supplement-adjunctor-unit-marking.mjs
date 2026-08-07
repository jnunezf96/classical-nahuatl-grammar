const spec = {
  "ownerId": "classical-supplement-adjunctor-unit-marking",
  "prefix": "ClassicalSupplementAdjunctorUnitMarking",
  "operationId": "classical.supplement.adjunctor.unit.marking.execute",
  "inputContract": "complete-typed-classical-supplement-adjunctor-unit-marking-source",
  "domain": "classical-supplement-adjunctor-unit-marking",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1835",
    "claim-p1836",
    "claim-p1837",
    "claim-p1838",
    "claim-p1839"
  ],
  "coordinates": {
    "claim-p1835::p1835-to-avoid-or-lessen-this-ambiguity-or-simply-to": {
      "assertionId": "classical-supplement-adjunctor-unit-marking:p1835-to-avoid-or-lessen-this-ambiguity-or-simply-to",
      "canonicalPath": "extractedFrames.topicAdjunctor.adjunctor"
    },
    "claim-p1836::p1836-when-in-is-placed-in-front-of-an-nnc": {
      "assertionId": "classical-supplement-adjunctor-unit-marking:p1836-when-in-is-placed-in-front-of-an-nnc",
      "canonicalPath": "extractedFrames.topicAdjunctor.affectsPredicateDeterminacy"
    },
    "claim-p1837::p1837-this-means-that-when-in-is-placed-in-front": {
      "assertionId": "classical-supplement-adjunctor-unit-marking:p1837-this-means-that-when-in-is-placed-in-front",
      "canonicalPath": "extractedFrames.demonstrativeAdjunctor.fusesWithDemonstrative"
    },
    "claim-p1838::p1838-see-43-1-3-for-another-translation-of-this": {
      "assertionId": "classical-supplement-adjunctor-unit-marking:p1838-see-43-1-3-for-another-translation-of-this",
      "canonicalPath": "topic.supplementClause.unitKind"
    },
    "claim-p1839::p1839-in-traditional-spelling-the-adjunctor-is-usually-written-solid": {
      "assertionId": "classical-supplement-adjunctor-unit-marking:p1839-in-traditional-spelling-the-adjunctor-is-usually-written-solid",
      "canonicalPath": "topic.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1835": [],
    "claim-p1836": [],
    "claim-p1837": [],
    "claim-p1838": [],
    "claim-p1839": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1835": "authorized",
    "claim-p1836": "authorized",
    "claim-p1837": "authorized",
    "claim-p1838": "authorized",
    "claim-p1839": "authorized"
  }
};
export default Object.freeze(spec);
