const spec = {
  "ownerId": "classical-nounstem-use-shape-selection",
  "prefix": "ClassicalNounstemUseShapeSelection",
  "operationId": "classical.nounstem.use.shape.selection.execute",
  "inputContract": "complete-typed-classical-nounstem-use-shape-selection-source",
  "domain": "classical-nounstem-use-shape-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1448",
    "claim-p1449",
    "claim-p1450",
    "claim-p1451",
    "claim-p1452",
    "claim-p1453",
    "claim-p1454",
    "claim-p1455",
    "claim-p1456"
  ],
  "coordinates": {
    "claim-p1448::p1448-depending-on-their-class-and-their-usage-general-use": {
      "assertionId": "classical-nounstem-use-shape-selection:p1448-depending-on-their-class-and-their-usage-general-use",
      "canonicalPath": "contractLeastCommonMultiple.useStemShapeInventory.length"
    },
    "claim-p1449::p1449-the-general-use-stem-is-identical-to-the-restricted": {
      "assertionId": "classical-nounstem-use-shape-selection:p1449-the-general-use-stem-is-identical-to-the-restricted",
      "canonicalPath": "sourceFrame.generalUseShape"
    },
    "claim-p1450::p1450-base-shape": {
      "assertionId": "classical-nounstem-use-shape-selection:p1450-base-shape",
      "canonicalPath": "contractLeastCommonMultiple.useStemShapeInventory.0.identity"
    },
    "claim-p1451::p1451-truncated-shape": {
      "assertionId": "classical-nounstem-use-shape-selection:p1451-truncated-shape",
      "canonicalPath": "contractLeastCommonMultiple.useStemShapeInventory.1.identity"
    },
    "claim-p1452::p1452-the-general-use-stem-lacks-an-ephemeral-vowel-that": {
      "assertionId": "classical-nounstem-use-shape-selection:p1452-the-general-use-stem-lacks-an-ephemeral-vowel-that",
      "canonicalPath": "sourceFrame.useShapeAction"
    },
    "claim-p1453::p1453-the-general-use-stem-has-a-short-vowel-plus": {
      "assertionId": "classical-nounstem-use-shape-selection:p1453-the-general-use-stem-has-a-short-vowel-plus",
      "canonicalPath": "glottalizedGeneralUseFrame.replacement"
    },
    "claim-p1454::p1454-glottalized-shape": {
      "assertionId": "classical-nounstem-use-shape-selection:p1454-glottalized-shape",
      "canonicalPath": "glottalizedGeneralUseFrame.generalUseStem"
    },
    "claim-p1455::p1455-a-glottalized-stem-is-rare-it-occurs-only-on": {
      "assertionId": "classical-nounstem-use-shape-selection:p1455-a-glottalized-stem-is-rare-it-occurs-only-on",
      "canonicalPath": "glottalizedGeneralUseFrame.usageEnvironment"
    },
    "claim-p1456::p1456-when-they-fill-the-embed-subposition-of-a-compound": {
      "assertionId": "classical-nounstem-use-shape-selection:p1456-when-they-fill-the-embed-subposition-of-a-compound",
      "canonicalPath": "glottalizedGeneralUseFrame.matrixDeterminesChoice"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1448": [
      "absolutive-common-tli"
    ],
    "claim-p1449": [
      "absolutive-common-tli"
    ],
    "claim-p1450": [
      "absolutive-common-tli"
    ],
    "claim-p1451": [
      "absolutive-common-tli"
    ],
    "claim-p1452": [
      "use-stem-possessive-truncated"
    ],
    "claim-p1453": [
      "glottalized-compound-embed"
    ],
    "claim-p1454": [
      "glottalized-compound-embed"
    ],
    "claim-p1455": [
      "glottalized-compound-embed"
    ],
    "claim-p1456": [
      "glottalized-compound-embed"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1448": "authorized",
    "claim-p1449": "authorized",
    "claim-p1450": "authorized",
    "claim-p1451": "authorized",
    "claim-p1452": "authorized",
    "claim-p1453": "authorized",
    "claim-p1454": "authorized",
    "claim-p1455": "authorized",
    "claim-p1456": "authorized"
  }
};
export default Object.freeze(spec);
