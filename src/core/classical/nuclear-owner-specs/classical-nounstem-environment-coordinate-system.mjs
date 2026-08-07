const spec = {
  "ownerId": "classical-nounstem-environment-coordinate-system",
  "prefix": "ClassicalNounstemEnvironmentCoordinateSystem",
  "operationId": "classical.nounstem.environment.coordinate.system.execute",
  "inputContract": "complete-typed-classical-nounstem-environment-coordinate-system-source",
  "domain": "classical-nounstem-environment-coordinate-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1484",
    "claim-p1485",
    "claim-p1486",
    "claim-p1487",
    "claim-p1488",
    "claim-p1489",
    "claim-p1490",
    "claim-p1491",
    "claim-p1492",
    "claim-p1493",
    "claim-p1494",
    "claim-p1495",
    "claim-p1496"
  ],
  "coordinates": {
    "claim-p1484::p1484-base-shape": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1484-base-shape",
      "canonicalPath": "contractLeastCommonMultiple.useStemShapeInventory.0.identity"
    },
    "claim-p1485::p1485-general-use-stem": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1485-general-use-stem",
      "canonicalPath": "contractLeastCommonMultiple.useStemKindInventory.1.identity"
    },
    "claim-p1486::p1486-base-shape": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1486-base-shape",
      "canonicalPath": "contractLeastCommonMultiple.useStemShapeInventory.0.action"
    },
    "claim-p1487::p1487-truncated-shape": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1487-truncated-shape",
      "canonicalPath": "contractLeastCommonMultiple.useStemShapeInventory.1.action"
    },
    "claim-p1488::p1488-glottalized-shape": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1488-glottalized-shape",
      "canonicalPath": "contractLeastCommonMultiple.useStemShapeInventory.2.action"
    },
    "claim-p1489::p1489-plural-referent-of-subject-stem-types": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1489-plural-referent-of-subject-stem-types",
      "canonicalPath": "contractLeastCommonMultiple.stemRelationInventory.length"
    },
    "claim-p1490::p1490-plain-stem": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1490-plain-stem",
      "canonicalPath": "contractLeastCommonMultiple.stemRelationInventory.0.identity"
    },
    "claim-p1491::p1491-affinity-stem": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1491-affinity-stem",
      "canonicalPath": "contractLeastCommonMultiple.stemRelationInventory.1.identity"
    },
    "claim-p1492::p1492-distributive-varietal-stem": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1492-distributive-varietal-stem",
      "canonicalPath": "contractLeastCommonMultiple.stemRelationInventory.2.identity"
    },
    "claim-p1493::p1493-when-it-is-a-matter-of-a-restricted-use": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1493-when-it-is-a-matter-of-a-restricted-use",
      "canonicalPath": "sourceFrame.selectedUseShape"
    },
    "claim-p1494::p1494-when-it-is-a-matter-of-a-restricted-use": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1494-when-it-is-a-matter-of-a-restricted-use",
      "canonicalPath": "contractLeastCommonMultiple.stateSubjectEnvironmentInventory.0.useStemKind"
    },
    "claim-p1495::p1495-result-one-uses-a-base-shape-a-truncated-shape": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1495-result-one-uses-a-base-shape-a-truncated-shape",
      "canonicalPath": "contractLeastCommonMultiple.useStemKindInventory.1.allowedShapeIdentities"
    },
    "claim-p1496::p1496-when-it-is-a-matter-of-a-general-use": {
      "assertionId": "classical-nounstem-environment-coordinate-system:p1496-when-it-is-a-matter-of-a-general-use",
      "canonicalPath": "contractLeastCommonMultiple.useStemShapeInventory.length"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1484": [
      "absolutive-common-tli"
    ],
    "claim-p1485": [
      "absolutive-common-tli"
    ],
    "claim-p1486": [
      "absolutive-common-tli"
    ],
    "claim-p1487": [
      "absolutive-common-tli"
    ],
    "claim-p1488": [
      "absolutive-common-tli"
    ],
    "claim-p1489": [
      "absolutive-common-tli"
    ],
    "claim-p1490": [
      "absolutive-common-tli"
    ],
    "claim-p1491": [
      "absolutive-common-tli"
    ],
    "claim-p1492": [
      "absolutive-common-tli"
    ],
    "claim-p1493": [
      "use-stem-absolutive"
    ],
    "claim-p1494": [
      "absolutive-common-tli"
    ],
    "claim-p1495": [
      "absolutive-common-tli"
    ],
    "claim-p1496": [
      "absolutive-common-tli"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1484": "authorized",
    "claim-p1485": "authorized",
    "claim-p1486": "authorized",
    "claim-p1487": "authorized",
    "claim-p1488": "authorized",
    "claim-p1489": "authorized",
    "claim-p1490": "authorized",
    "claim-p1491": "authorized",
    "claim-p1492": "authorized",
    "claim-p1493": "authorized",
    "claim-p1494": "authorized",
    "claim-p1495": "authorized",
    "claim-p1496": "authorized"
  }
};
export default Object.freeze(spec);
