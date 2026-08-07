const spec = {
  "ownerId": "classical-compound-translation-weight-analysis",
  "prefix": "ClassicalCompoundTranslationWeightAnalysis",
  "operationId": "classical.compound.translation.weight.analysis.execute",
  "inputContract": "complete-typed-classical-compound-translation-weight-analysis-source",
  "domain": "classical-compound-translation-weight-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2769",
    "claim-p2770"
  ],
  "coordinates": {
    "claim-p2769::p2769-when-a-connective-t-compound-verbstem-has-an-intransitive": {
      "assertionId": "classical-compound-translation-weight-analysis:p2769-when-a-connective-t-compound-verbstem-has-an-intransitive",
      "canonicalPath": "contract.translationRole"
    },
    "claim-p2770::p2770-both-of-these-translations-reverse-the-weight-of-the": {
      "assertionId": "classical-compound-translation-weight-analysis:p2770-both-of-these-translations-reverse-the-weight-of-the",
      "canonicalPath": "contract.matrixAfterEmbed"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2769": [],
    "claim-p2770": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2769": "authorized",
    "claim-p2770": "authorized"
  }
};
export default Object.freeze(spec);
