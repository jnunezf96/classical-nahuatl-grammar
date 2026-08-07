const spec = {
  "ownerId": "classical-incorporated-adverb-supplement",
  "prefix": "ClassicalIncorporatedAdverbSupplement",
  "operationId": "classical.incorporated.adverb.supplement.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-supplement-source",
  "domain": "classical-incorporated-adverb-supplement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3018",
    "claim-p3019",
    "claim-p3020",
    "claim-p3021",
    "claim-p3022",
    "claim-p3023"
  ],
  "coordinates": {
    "claim-p3018::p3018-the-incorporated-adverb-vncs-of-30-6-30-13": {
      "assertionId": "classical-incorporated-adverb-supplement:p3018-the-incorporated-adverb-vncs-of-30-6-30-13",
      "canonicalPath": "cases.supplementSubject.rules.incorporated-adverb/supplement"
    },
    "claim-p3019::p3019-the-other-kind-of-incorporated-adverb-vnc-mentioned-in": {
      "assertionId": "classical-incorporated-adverb-supplement:p3019-the-other-kind-of-incorporated-adverb-vnc-mentioned-in",
      "canonicalPath": "cases.supplementSubject.authorizationStatus"
    },
    "claim-p3020::p3020-this-kind-of-compound-stemmed-vnc-is-especially-to": {
      "assertionId": "classical-incorporated-adverb-supplement:p3020-this-kind-of-compound-stemmed-vnc-is-especially-to",
      "canonicalPath": "cases.supplementSubject.gcdSatisfied"
    },
    "claim-p3021::p3021-there-a-possessor-pronoun-was-taken-for-granted-here": {
      "assertionId": "classical-incorporated-adverb-supplement:p3021-there-a-possessor-pronoun-was-taken-for-granted-here",
      "canonicalPath": "cases.supplementSubject.lcmComplete"
    },
    "claim-p3022::p3022-furthermore-here-the-embedded-nounstem-can-signify-not-only": {
      "assertionId": "classical-incorporated-adverb-supplement:p3022-furthermore-here-the-embedded-nounstem-can-signify-not-only",
      "canonicalPath": "cases.supplementSubject.rules.incorporated-adverb/supplement"
    },
    "claim-p3023::p3023-the-following-discussion-presents-first-the-adverbial-embed-resulting": {
      "assertionId": "classical-incorporated-adverb-supplement:p3023-the-following-discussion-presents-first-the-adverbial-embed-resulting",
      "canonicalPath": "cases.supplementSubject.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3018": [],
    "claim-p3019": [],
    "claim-p3020": [],
    "claim-p3021": [],
    "claim-p3022": [],
    "claim-p3023": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3018": "authorized",
    "claim-p3019": "authorized",
    "claim-p3020": "authorized",
    "claim-p3021": "authorized",
    "claim-p3022": "authorized",
    "claim-p3023": "authorized"
  }
};
export default Object.freeze(spec);
