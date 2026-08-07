const spec = {
  "ownerId": "classical-passive-source-transformation",
  "prefix": "ClassicalPassiveSourceTransformation",
  "operationId": "classical.passive.source.transformation.execute",
  "inputContract": "complete-typed-classical-passive-source-transformation-source",
  "domain": "classical-passive-source-transformation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2100",
    "claim-p2101",
    "claim-p2102",
    "claim-p2103",
    "claim-p2104",
    "claim-p2105",
    "claim-p2106"
  ],
  "coordinates": {
    "claim-p2100::p2100-the-shift-in-focus-from-one-voice-to-another": {
      "assertionId": "classical-passive-source-transformation:p2100-the-shift-in-focus-from-one-voice-to-another",
      "canonicalPath": "voice.passiveSingle.voice"
    },
    "claim-p2101::p2101-in-nahuatl-the-passive-transformation-operates-upon-an-active": {
      "assertionId": "classical-passive-source-transformation:p2101-in-nahuatl-the-passive-transformation-operates-upon-an-active",
      "canonicalPath": "voice.passiveSingle.sourceSubjectDeleted"
    },
    "claim-p2102::p2102-it-is-accomplished-by-1-the-deletion-of-the": {
      "assertionId": "classical-passive-source-transformation:p2102-it-is-accomplished-by-1-the-deletion-of-the",
      "canonicalPath": "voice.passiveSingle.sourceValence"
    },
    "claim-p2103::p2103-the-deletion-of-the-subject-of-the-source-vnc": {
      "assertionId": "classical-passive-source-transformation:p2103-the-deletion-of-the-subject-of-the-source-vnc",
      "canonicalPath": "voice.passiveSingle.targetValence"
    },
    "claim-p2104::p2104-the-third-requirement-mentioned-above-means-that-a-nahuatl": {
      "assertionId": "classical-passive-source-transformation:p2104-the-third-requirement-mentioned-above-means-that-a-nahuatl",
      "canonicalPath": "voice.passiveSingle.voice"
    },
    "claim-p2105::p2105-while-english-has-a-similar-prohibition-regarding-an-intransitive": {
      "assertionId": "classical-passive-source-transformation:p2105-while-english-has-a-similar-prohibition-regarding-an-intransitive",
      "canonicalPath": "voice.passiveSingle.sourceSubjectDeleted"
    },
    "claim-p2106::p2106-such-a-transformation-is-not-possible-to-the-nahuatl": {
      "assertionId": "classical-passive-source-transformation:p2106-such-a-transformation-is-not-possible-to-the-nahuatl",
      "canonicalPath": "voice.passiveSingle.sourceValence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2100": [],
    "claim-p2101": [],
    "claim-p2102": [],
    "claim-p2103": [],
    "claim-p2104": [],
    "claim-p2105": [],
    "claim-p2106": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2100": "authorized",
    "claim-p2101": "authorized",
    "claim-p2102": "authorized",
    "claim-p2103": "authorized",
    "claim-p2104": "authorized",
    "claim-p2105": "authorized",
    "claim-p2106": "authorized"
  }
};
export default Object.freeze(spec);
