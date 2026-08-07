const spec = {
  "ownerId": "classical-supportive-initial-i-formation",
  "prefix": "ClassicalSupportiveInitialIFormation",
  "operationId": "classical.supportive.initial.i.form",
  "inputContract": "complete-typed-classical-supportive-initial-i-formation-source",
  "domain": "classical-supportive-initial-i-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-supportive-initial-i-formation",
  "selections": [
    "claim-p941",
    "claim-p942",
    "claim-p943",
    "claim-p944"
  ],
  "coordinates": {
    "claim-p941::p941-note-1-when-the-mainline-reflexive-object-is-prefixed": {
      "assertionId": "classical-supportive-initial-i-formation:p941-note-1-when-the-mainline-reflexive-object-is-prefixed",
      "canonicalPath": "tlaDropsSupportiveI"
    },
    "claim-p942::p942-those-verbstems-that-have-a-supportive-i-for-an": {
      "assertionId": "classical-supportive-initial-i-formation:p942-those-verbstems-that-have-a-supportive-i-for-an",
      "canonicalPath": "tlaStemRealization"
    },
    "claim-p943::p943-this-does-not-happen-after-the-nonspecific-human-projective": {
      "assertionId": "classical-supportive-initial-i-formation:p943-this-does-not-happen-after-the-nonspecific-human-projective",
      "canonicalPath": "teBlocksSupportiveIDrop"
    },
    "claim-p944::p944-some-verbstems-are-inconsistent-especially-those-beginning-with-ih": {
      "assertionId": "classical-supportive-initial-i-formation:p944-some-verbstems-are-inconsistent-especially-those-beginning-with-ih",
      "canonicalPath": "realInitialVowelRemains"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupportiveInitialISystemFrame",
  "executionValidatorName": "isClassicalNahuatlSupportiveInitialISystemFrame",
  "executionArgsBySelection": {
    "claim-p941": [],
    "claim-p942": [],
    "claim-p943": [],
    "claim-p944": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p941": "authorized",
    "claim-p942": "authorized",
    "claim-p943": "authorized",
    "claim-p944": "authorized"
  }
};
export default Object.freeze(spec);
