const spec = {
  "ownerId": "classical-impersonal-valence-passive-complementarity",
  "prefix": "ClassicalImpersonalValencePassiveComplementarity",
  "operationId": "classical.impersonal.valence.passive.complementarity.execute",
  "inputContract": "complete-typed-classical-impersonal-valence-passive-complementarity-source",
  "domain": "classical-impersonal-valence-passive-complementarity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2152",
    "claim-p2153",
    "claim-p2154",
    "claim-p2155",
    "claim-p2156",
    "claim-p2157",
    "claim-p2158"
  ],
  "coordinates": {
    "claim-p2152::p2152-unlike-the-passive-transformation-the-impersonal-one-may-be": {
      "assertionId": "classical-impersonal-valence-passive-complementarity:p2152-unlike-the-passive-transformation-the-impersonal-one-may-be",
      "canonicalPath": "voice.impersonalIntransitive.sourceValence"
    },
    "claim-p2153::p2153-but-if-the-vnc-is-transitive-the-transformation-can": {
      "assertionId": "classical-impersonal-valence-passive-complementarity:p2153-but-if-the-vnc-is-transitive-the-transformation-can",
      "canonicalPath": "voice.impersonalNonspecific.sourceValence"
    },
    "claim-p2154::p2154-notice-that-a-specific-reflexive-object-in-the-source": {
      "assertionId": "classical-impersonal-valence-passive-complementarity:p2154-notice-that-a-specific-reflexive-object-in-the-source",
      "canonicalPath": "voice.passiveSingle.sourceValence"
    },
    "claim-p2155::p2155-this-restriction-is-based-on-the-fact-that-in": {
      "assertionId": "classical-impersonal-valence-passive-complementarity:p2155-this-restriction-is-based-on-the-fact-that-in",
      "canonicalPath": "contract.restrictions.3"
    },
    "claim-p2156::p2156-in-its-use-of-the-nonactive-stem-for-both": {
      "assertionId": "classical-impersonal-valence-passive-complementarity:p2156-in-its-use-of-the-nonactive-stem-for-both",
      "canonicalPath": "voice.impersonalIntransitive.sourceValence"
    },
    "claim-p2157::p2157-confusion-between-the-two-voices-is-prevented-by-the": {
      "assertionId": "classical-impersonal-valence-passive-complementarity:p2157-confusion-between-the-two-voices-is-prevented-by-the",
      "canonicalPath": "voice.impersonalNonspecific.sourceValence"
    },
    "claim-p2158::p2158-but-while-the-impersonal-voice-vnc-is-an-impersonal": {
      "assertionId": "classical-impersonal-valence-passive-complementarity:p2158-but-while-the-impersonal-voice-vnc-is-an-impersonal",
      "canonicalPath": "voice.passiveSingle.sourceValence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2152": [],
    "claim-p2153": [],
    "claim-p2154": [],
    "claim-p2155": [],
    "claim-p2156": [],
    "claim-p2157": [],
    "claim-p2158": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2152": "authorized",
    "claim-p2153": "authorized",
    "claim-p2154": "authorized",
    "claim-p2155": "authorized",
    "claim-p2156": "authorized",
    "claim-p2157": "authorized",
    "claim-p2158": "authorized"
  }
};
export default Object.freeze(spec);
