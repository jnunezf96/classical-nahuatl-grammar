const spec = {
  "ownerId": "classical-attitude-pejorative-preterit-embed",
  "prefix": "ClassicalAttitudePejorativePreteritEmbed",
  "operationId": "classical.attitude.pejorative.preterit.embed.execute",
  "inputContract": "complete-typed-classical-attitude-pejorative-preterit-embed-source",
  "domain": "classical-attitude-pejorative-preterit-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3242",
    "claim-p3243",
    "claim-p3244",
    "claim-p3245"
  ],
  "coordinates": {
    "claim-p3242::p3242-just-as-there-are-special-vncs-a-speaker-can": {
      "assertionId": "classical-attitude-pejorative-preterit-embed:p3242-just-as-there-are-special-vncs-a-speaker-can",
      "canonicalPath": "cases.pejorativePreteritEmbed.rules.pejorative-preterit-embed"
    },
    "claim-p3243::p3243-these-pejorative-vncs-are-constructed-according-to-the-preterit": {
      "assertionId": "classical-attitude-pejorative-preterit-embed:p3243-these-pejorative-vncs-are-constructed-according-to-the-preterit",
      "canonicalPath": "cases.pejorativePreteritEmbed.authorizationStatus"
    },
    "claim-p3244::p3244-this-matrix-stem-which-is-used-only-in-this": {
      "assertionId": "classical-attitude-pejorative-preterit-embed:p3244-this-matrix-stem-which-is-used-only-in-this",
      "canonicalPath": "cases.pejorativePreteritEmbed.gcdSatisfied"
    },
    "claim-p3245::p3245-the-formation-of-the-compound-vnc-is-the-same": {
      "assertionId": "classical-attitude-pejorative-preterit-embed:p3245-the-formation-of-the-compound-vnc-is-the-same",
      "canonicalPath": "cases.pejorativePreteritEmbed.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3242": [],
    "claim-p3243": [],
    "claim-p3244": [],
    "claim-p3245": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3242": "authorized",
    "claim-p3243": "authorized",
    "claim-p3244": "authorized",
    "claim-p3245": "authorized"
  }
};
export default Object.freeze(spec);
