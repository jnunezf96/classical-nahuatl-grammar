const spec = {
  "ownerId": "carrier-vocable-prosody",
  "operationId": "classical.carrier.vocable.prosody.validate",
  "prefix": "ClassicalCarrierVocableProsody",
  "domain": "carrier-vocable-prosody",
  "inputContract": "typed-carrier-vocable-prosody-source",
  "analyses": {
    "polysyllabic-stress": {
      "classification": "normally-one-stressed-syllable-in-polysyllabic-vocable",
      "facts": [
        "normally-one-syllable-of-a-polysyllabic-vocable-is-pronounced-with-more-force"
      ],
      "relation": "stress-selection-requires-an-owner-issued-polysyllabic-vocable",
      "checkpoint": "carrier-vocable-polysyllabic-stress-checkpoint",
      "unitConstructed": false
    }
  }
};
export default Object.freeze(spec);
