const spec = {
  "ownerId": "classical-vowel-graphemic-representation",
  "prefix": "ClassicalVowelGraphemicRepresentation",
  "operationId": "classical.transcription.classical-vowel-graphemic-representation.analyze",
  "inputContract": "complete-typed-classical-vowel-graphemic-representation-source",
  "domain": "classical-vowel-graphemic-representation",
  "mode": "canonical-fact",
  "selections": [
    "system"
  ],
  "facets": [
    "spelling-vowels-spelled-letters-a-e-i-o",
    "length-represented-a-macron-a-e-i-o",
    "reduced-long-vowels-spelled-without-a-macron-if-were"
  ],
  "coordinates": {
    "system::spelling-vowels-spelled-letters-a-e-i-o": {
      "assertionId": "classical-vowel-graphemic-representation:spelling-vowels-spelled-letters-a-e-i-o",
      "canonicalPath": ""
    },
    "system::length-represented-a-macron-a-e-i-o": {
      "assertionId": "classical-vowel-graphemic-representation:length-represented-a-macron-a-e-i-o",
      "canonicalPath": ""
    },
    "system::reduced-long-vowels-spelled-without-a-macron-if-were": {
      "assertionId": "classical-vowel-graphemic-representation:reduced-long-vowels-spelled-without-a-macron-if-were",
      "canonicalPath": ""
    }
  },
  "systemCapabilityName": "CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_SYSTEM_FACTS",
  "collectionCapabilityName": "CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS",
  "selectionRecords": {
    "a-pair": [
      "a",
      "ā"
    ],
    "e-pair": [
      "e",
      "ē"
    ],
    "i-pair": [
      "i",
      "ī"
    ],
    "o-pair": [
      "o",
      "ō"
    ]
  }
};
export default Object.freeze(spec);
