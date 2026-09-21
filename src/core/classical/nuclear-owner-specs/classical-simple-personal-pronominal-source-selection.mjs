const spec = {
  "ownerId": "classical-simple-personal-pronominal-source-selection",
  "prefix": "ClassicalSimplePersonalPronominalSourceSelection",
  "operationId": "classical.simple.personal.pronominal.source.selection.execute",
  "inputContract": "complete-typed-classical-simple-personal-pronominal-source-selection-source",
  "domain": "classical-simple-personal-pronominal-source-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1653",
    "claim-p1654",
    "claim-p1655",
    "claim-p1656",
    "claim-p1657",
    "claim-p1658",
    "claim-p1659"
  ],
  "coordinates": {
    "claim-p1653::p1653-the-latter-is-used-in-third-person-nncs": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1653-the-latter-is-used-in-third-person-nncs",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceStem"
    },
    "claim-p1654::p1654-the-simple-stem-has-two-variant-shapes-eh-and": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1654-the-simple-stem-has-two-variant-shapes-eh-and",
      "canonicalPath": "pronominalFrame.sourceFrame.subject"
    },
    "claim-p1655::p1655-these-nncs-have-a-limited-use-see-18-2": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1655-these-nncs-have-a-limited-use-see-18-2",
      "canonicalPath": "formulaRealization"
    },
    "claim-p1656::p1656-the-regular-variant-eh-also-occurs-in-an-nnc": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1656-the-regular-variant-eh-also-occurs-in-an-nnc",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceStem"
    },
    "claim-p1657::p1657-subject-especially-when-that-subject-has-an-abstract-referent": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1657-subject-especially-when-that-subject-has-an-abstract-referent",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceIdentityAlternants"
    },
    "claim-p1658::p1658-this-nnc-is-frequently-found-as-the-final-member": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1658-this-nnc-is-frequently-found-as-the-final-member",
      "canonicalPath": "pronominalFrame.sourceFrame.structuralPluralType"
    },
    "claim-p1659::p1659-the-nnc-yeh-may-also-be-used-in-this": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1659-the-nnc-yeh-may-also-be-used-in-this",
      "canonicalPath": "numberFrame.internalPluralMorph"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1653": [
      "l16-personal-simple-third"
    ],
    "claim-p1654": [
      "l16-personal-simple-third"
    ],
    "claim-p1655": [
      "l16-personal-simple-third"
    ],
    "claim-p1656": [
      "l16-personal-simple"
    ],
    "claim-p1657": [
      "l16-personal-simple"
    ],
    "claim-p1658": [
      "l16-personal-simple"
    ],
    "claim-p1659": [
      "l16-personal-simple"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1653": "authorized",
    "claim-p1654": "authorized",
    "claim-p1655": "authorized",
    "claim-p1656": "authorized",
    "claim-p1657": "authorized",
    "claim-p1658": "authorized",
    "claim-p1659": "authorized"
  },
  "nonExecutableObservations": {
    "claim-p1660::p1660-que-n-oc-eh-quenoque-que-n-oc-yeh": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1660-que-n-oc-eh-quenoque-que-n-oc-yeh",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas5416–5417 gives quēn oc eh/yeh collocations and traditional spellings. The isolated first-person personal-simple recipe and English-translation authority flag do not observe these collocations.",
      "retiredCanonicalPath": "discourseFrame.EnglishPronounTranslationIsAuthority",
      "executionCredit": false,
      "grammarAuthority": false
    },
    "claim-p1661::p1661-que-n-zan-eh-que-n-zan-yeh-how": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1661-que-n-zan-eh-que-n-zan-yeh-how",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas5418 gives quēn zan eh/yeh collocations and readings. The isolated first-person personal-simple recipe and selection-authority field do not observe these collocations.",
      "retiredCanonicalPath": "contextSelectionRecord.selectionAuthority",
      "executionCredit": false,
      "grammarAuthority": false
    },
    "claim-p1662::p1662-no-zo-eh-noce-because-of-elision-also-maybe": {
      "assertionId": "classical-simple-personal-pronominal-source-selection:p1662-no-zo-eh-noce-because-of-elision-also-maybe",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas5420 gives no zo eh and traditional noce due to elision. The isolated first-person personal-simple recipe and formula-authority flag do not observe the collocation or its elision.",
      "retiredCanonicalPath": "formulaStringAuthority",
      "executionCredit": false,
      "grammarAuthority": false
    }
  }
};
export default Object.freeze(spec);
