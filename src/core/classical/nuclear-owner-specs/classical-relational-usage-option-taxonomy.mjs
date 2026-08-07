const spec = {
  "ownerId": "classical-relational-usage-option-taxonomy",
  "prefix": "ClassicalRelationalUsageOptionTaxonomy",
  "operationId": "classical.relational.usage.option.taxonomy.execute",
  "inputContract": "complete-typed-classical-relational-usage-option-taxonomy-source",
  "domain": "classical-relational-usage-option-taxonomy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4252",
    "claim-p4253",
    "claim-p4254",
    "claim-p4255"
  ],
  "coordinates": {
    "claim-p4252::p4252-there-are-four-options-for-usage-open-to-relational": {
      "assertionId": "classical-relational-usage-option-taxonomy:p4252-there-are-four-options-for-usage-open-to-relational",
      "canonicalPath": "catalog.stemCount"
    },
    "claim-p4253::p4253-except-for-the-third-there-is-nothing-distinctive-about": {
      "assertionId": "classical-relational-usage-option-taxonomy:p4253-except-for-the-third-there-is-nothing-distinctive-about",
      "canonicalPath": "catalog.optionGroups"
    },
    "claim-p4254::p4254-what-is-perhaps-peculiar-about-relational-stems-however-is": {
      "assertionId": "classical-relational-usage-option-taxonomy:p4254-what-is-perhaps-peculiar-about-relational-stems-however-is",
      "canonicalPath": "catalog.axisCount"
    },
    "claim-p4255::p4255-when-reading-the-translations-given-below-in-the-examples": {
      "assertionId": "classical-relational-usage-option-taxonomy:p4255-when-reading-the-translations-given-below-in-the-examples",
      "canonicalPath": "catalog.stemCount"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4252": [],
    "claim-p4253": [],
    "claim-p4254": [],
    "claim-p4255": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4252": "authorized",
    "claim-p4253": "authorized",
    "claim-p4254": "authorized",
    "claim-p4255": "authorized"
  }
};
export default Object.freeze(spec);
