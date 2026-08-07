const spec = {
  "ownerId": "classical-personal-name-nnc-source-opacity-analysis",
  "prefix": "ClassicalPersonalNameNncSourceOpacityAnalysis",
  "operationId": "classical.personal.name.nnc.source.opacity.analysis.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-source-opacity-analysis-source",
  "domain": "classical-personal-name-nnc-source-opacity-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5156",
    "claim-p5157",
    "claim-p5158"
  ],
  "coordinates": {
    "claim-p5156::p5156-sometimes-one-or-more-of-the-constituent-stems-is": {
      "assertionId": "classical-personal-name-nnc-source-opacity-analysis:p5156-sometimes-one-or-more-of-the-constituent-stems-is",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5157::p5157-if-the-stems-are-understood": {
      "assertionId": "classical-personal-name-nnc-source-opacity-analysis:p5157-if-the-stems-are-understood",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5158::p5158-sometimes-even-if-the-stems-are-understood-the-meaning": {
      "assertionId": "classical-personal-name-nnc-source-opacity-analysis:p5158-sometimes-even-if-the-stems-are-understood-the-meaning",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5156": [
      "source-opacity-analysis",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5157": [
      "source-opacity-analysis",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5158": [
      "source-opacity-analysis",
      "preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5156": "authorized",
    "claim-p5157": "authorized",
    "claim-p5158": "authorized"
  }
};
export default Object.freeze(spec);
