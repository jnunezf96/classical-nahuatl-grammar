const spec = {
  "ownerId": "classical-adjectival-transitive-vnc-reference-contact",
  "prefix": "ClassicalAdjectivalTransitiveVncReferenceContact",
  "operationId": "classical.adjectival.transitive.vnc.reference.contact.execute",
  "inputContract": "complete-typed-classical-adjectival-transitive-vnc-reference-contact-source",
  "domain": "classical-adjectival-transitive-vnc-reference-contact",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4047",
    "claim-p4048",
    "claim-p4049",
    "claim-p4050",
    "claim-p4051",
    "claim-p4052",
    "claim-p4053",
    "claim-p4054",
    "claim-p4055",
    "claim-p4056",
    "claim-p4057",
    "claim-p4058"
  ],
  "coordinates": {
    "claim-p4047::p4047-if-the-transitive-clause-contains-only-a-reflexive-object": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4047-if-the-transitive-clause-contains-only-a-reflexive-object",
      "canonicalPath": "cases.vncObjectContact.canonicalResult"
    },
    "claim-p4048::p4048-for-one-thing-the-point-of-shared-referent-contact": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4048-for-one-thing-the-point-of-shared-referent-contact",
      "canonicalPath": "cases.vncObjectContact.linkRole"
    },
    "claim-p4049::p4049-for-another-the-construction-may-or-may-not-show": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4049-for-another-the-construction-may-or-may-not-show",
      "canonicalPath": "cases.vncObjectContact.modifierClauseType"
    },
    "claim-p4050::p4050-unambiguous-concatenation-modification-only": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4050-unambiguous-concatenation-modification-only",
      "canonicalPath": "blockedCases.vncSubjectMismatch.blockReason"
    },
    "claim-p4051::p4051-concatenation-by-means-of-the-nnc-s-subject-pronoun": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4051-concatenation-by-means-of-the-nnc-s-subject-pronoun",
      "canonicalPath": "cases.vncObjectContact.canonicalResult"
    },
    "claim-p4052::p4052-ambiguous-concatenation-either-supplementation-or-modification": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4052-ambiguous-concatenation-either-supplementation-or-modification",
      "canonicalPath": "cases.vncObjectContact.linkRole"
    },
    "claim-p4053::p4053-concatenation-by-means-of-the-vnc-s-subject-pronoun": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4053-concatenation-by-means-of-the-vnc-s-subject-pronoun",
      "canonicalPath": "cases.vncObjectContact.modifierClauseType"
    },
    "claim-p4054::p4054-concatenation-by-means-of-the-vnc-s-object-pronoun": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4054-concatenation-by-means-of-the-vnc-s-object-pronoun",
      "canonicalPath": "blockedCases.vncSubjectMismatch.blockReason"
    },
    "claim-p4055::p4055-when-the-transitive-vnc-permits-the-ambiguity-pointed-out": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4055-when-the-transitive-vnc-permits-the-ambiguity-pointed-out",
      "canonicalPath": "cases.vncObjectContact.canonicalResult"
    },
    "claim-p4056::p4056-the-ambiguity-is-even-more-complicated-when-the-transitive": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4056-the-ambiguity-is-even-more-complicated-when-the-transitive",
      "canonicalPath": "cases.vncObjectContact.linkRole"
    },
    "claim-p4057::p4057-when-the-concatenate-structures-are-adjoined-to-a-larger": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4057-when-the-concatenate-structures-are-adjoined-to-a-larger",
      "canonicalPath": "cases.vncObjectContact.modifierClauseType"
    },
    "claim-p4058::p4058-when-the-concatenate-structures-are-adjoined-to-a-larger": {
      "assertionId": "classical-adjectival-transitive-vnc-reference-contact:p4058-when-the-concatenate-structures-are-adjoined-to-a-larger",
      "canonicalPath": "blockedCases.vncSubjectMismatch.blockReason"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4047": [],
    "claim-p4048": [],
    "claim-p4049": [],
    "claim-p4050": [],
    "claim-p4051": [],
    "claim-p4052": [],
    "claim-p4053": [],
    "claim-p4054": [],
    "claim-p4055": [],
    "claim-p4056": [],
    "claim-p4057": [],
    "claim-p4058": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4047": "authorized",
    "claim-p4048": "authorized",
    "claim-p4049": "authorized",
    "claim-p4050": "authorized",
    "claim-p4051": "authorized",
    "claim-p4052": "authorized",
    "claim-p4053": "authorized",
    "claim-p4054": "authorized",
    "claim-p4055": "authorized",
    "claim-p4056": "authorized",
    "claim-p4057": "authorized",
    "claim-p4058": "authorized"
  }
};
export default Object.freeze(spec);
