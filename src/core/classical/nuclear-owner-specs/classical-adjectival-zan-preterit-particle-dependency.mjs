const spec = {
  "ownerId": "classical-adjectival-zan-preterit-particle-dependency",
  "prefix": "ClassicalAdjectivalZanPreteritParticleDependency",
  "operationId": "classical.adjectival.zan.preterit.particle.dependency.execute",
  "inputContract": "complete-typed-classical-adjectival-zan-preterit-particle-dependency-source",
  "domain": "classical-adjectival-zan-preterit-particle-dependency",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3918"
  ],
  "coordinates": {
    "claim-p3918::p3918-the-particle-zan-ordinarily-precedes-the-nnc": {
      "assertionId": "classical-adjectival-zan-preterit-particle-dependency:p3918-the-particle-zan-ordinarily-precedes-the-nnc",
      "canonicalPath": "cases.ordinary.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3918": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3918": "authorized"
  }
};
export default Object.freeze(spec);
