const spec = {
  "ownerId": "classical-causative-type-taxonomy",
  "prefix": "ClassicalCausativeTypeTaxonomy",
  "operationId": "classical.causative.type.taxonomy.execute",
  "inputContract": "complete-typed-classical-causative-type-taxonomy-source",
  "domain": "classical-causative-type-taxonomy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2282",
    "claim-p2283",
    "claim-p2284",
    "claim-p2285",
    "claim-p2286",
    "claim-p2287",
    "claim-p2288"
  ],
  "coordinates": {
    "claim-p2282::p2282-there-are-three-types-of-causative-verbstem-formations": {
      "assertionId": "classical-causative-type-taxonomy:p2282-there-are-three-types-of-causative-verbstem-formations",
      "canonicalPath": "contract.axes.1.axisId"
    },
    "claim-p2283::p2283-the-first-two-types-are-created-by-means-of": {
      "assertionId": "classical-causative-type-taxonomy:p2283-the-first-two-types-are-created-by-means-of",
      "canonicalPath": "derivations.tomi.options.0.derivationSubtype"
    },
    "claim-p2284::p2284-the-first-type-is-presented-here": {
      "assertionId": "classical-causative-type-taxonomy:p2284-the-first-type-is-presented-here",
      "canonicalPath": "derivations.tomi.options.1.derivationSubtype"
    },
    "claim-p2285::p2285-regardless-of-the-situations-presented-in-24-1-2": {
      "assertionId": "classical-causative-type-taxonomy:p2285-regardless-of-the-situations-presented-in-24-1-2",
      "canonicalPath": "derivations.tomi.options.0.procedure"
    },
    "claim-p2286::p2286-the-causative-suffix-a-converts-an-intrasitive-verbstem-ending": {
      "assertionId": "classical-causative-type-taxonomy:p2286-the-causative-suffix-a-converts-an-intrasitive-verbstem-ending",
      "canonicalPath": "contract.axes.1.axisId"
    },
    "claim-p2287::p2287-it-can-also-create-a-causative-stem-from-an": {
      "assertionId": "classical-causative-type-taxonomy:p2287-it-can-also-create-a-causative-stem-from-an",
      "canonicalPath": "derivations.tomi.options.0.derivationSubtype"
    },
    "claim-p2288::p2288-the-causative-a-is-short-after-consonants-and-long": {
      "assertionId": "classical-causative-type-taxonomy:p2288-the-causative-a-is-short-after-consonants-and-long",
      "canonicalPath": "derivations.tomi.options.1.derivationSubtype"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2282": [],
    "claim-p2283": [],
    "claim-p2284": [],
    "claim-p2285": [],
    "claim-p2286": [],
    "claim-p2287": [],
    "claim-p2288": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2282": "authorized",
    "claim-p2283": "authorized",
    "claim-p2284": "authorized",
    "claim-p2285": "authorized",
    "claim-p2286": "authorized",
    "claim-p2287": "authorized",
    "claim-p2288": "authorized"
  }
};
export default Object.freeze(spec);
