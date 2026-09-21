const spec = {
  "ownerId": "classical-affective-affinity-absolutive-evidence-analysis",
  "prefix": "ClassicalAffectiveAffinityAbsolutiveEvidenceAnalysis",
  "operationId": "classical.affective.affinity.absolutive.evidence.analysis.execute",
  "inputContract": "complete-typed-classical-affective-affinity-absolutive-evidence-analysis-source",
  "domain": "classical-affective-affinity-absolutive-evidence-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3160",
    "claim-p3161"
  ],
  "coordinates": {
    "claim-p3160::p3160-the-vnc-and-its-supplementary-subject-are-traditionally-written": {
      "assertionId": "classical-affective-affinity-absolutive-evidence-analysis:p3160-the-vnc-and-its-supplementary-subject-are-traditionally-written",
      "canonicalPath": "cases.affinityAbsolutive.authorizationStatus"
    },
    "claim-p3161::p3161-in-the-instance-of-some-nounstems-both-the-embedded": {
      "assertionId": "classical-affective-affinity-absolutive-evidence-analysis:p3161-in-the-instance-of-some-nounstems-both-the-embedded",
      "canonicalPath": "contract.evidenceRoles.affinityAbsolutiveExamples"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3160": [],
    "claim-p3161": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3160": "authorized",
    "claim-p3161": "authorized"
  },
  "nonExecutableObservations": {
    "claim-p3162::p3162-the-formation-may-be-optional": {
      "assertionId": "classical-affective-affinity-absolutive-evidence-analysis:p3162-the-formation-may-be-optional",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas11682–11686 contrasts optional with obligatory double affinity for particular nounstems. One affinity result and stored-example authority do not establish optionality; the separate flawed-subject optional analysis is a different claim.",
      "retiredCanonicalPath": "contract.storedExampleAuthority",
      "executionCredit": false,
      "grammarAuthority": false
    }
  }
};
export default Object.freeze(spec);
