const spec = {
  "ownerId": "classical-passive-formula-agent-deletion",
  "prefix": "ClassicalPassiveFormulaAgentDeletion",
  "operationId": "classical.passive.formula.agent.deletion.execute",
  "inputContract": "complete-typed-classical-passive-formula-agent-deletion-source",
  "domain": "classical-passive-formula-agent-deletion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2107",
    "claim-p2108",
    "claim-p2109"
  ],
  "coordinates": {
    "claim-p2107::p2107-the-formula-of-a-passive-voice-vnc-may-be": {
      "assertionId": "classical-passive-formula-agent-deletion:p2107-the-formula-of-a-passive-voice-vnc-may-be",
      "canonicalPath": "voice.passiveSingle.agentExpressible"
    },
    "claim-p2108::p2108-it-should-be-remembered-that-the-subject-pronoun-of": {
      "assertionId": "classical-passive-formula-agent-deletion:p2108-it-should-be-remembered-that-the-subject-pronoun-of",
      "canonicalPath": "voice.passiveSingle.sourceSubjectDeleted"
    },
    "claim-p2109::p2109-the-following-rules-govern-the-generation-of-passive-vncs": {
      "assertionId": "classical-passive-formula-agent-deletion:p2109-the-following-rules-govern-the-generation-of-passive-vncs",
      "canonicalPath": "voice.passiveSingle.formulaStringAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2107": [],
    "claim-p2108": [],
    "claim-p2109": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2107": "authorized",
    "claim-p2108": "authorized",
    "claim-p2109": "authorized"
  }
};
export default Object.freeze(spec);
