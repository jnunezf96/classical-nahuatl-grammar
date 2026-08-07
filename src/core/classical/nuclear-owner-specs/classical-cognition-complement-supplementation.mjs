const spec = {
  "ownerId": "classical-cognition-complement-supplementation",
  "prefix": "ClassicalCognitionComplementSupplementation",
  "operationId": "classical.cognition.complement.supplementation.execute",
  "inputContract": "complete-typed-classical-cognition-complement-supplementation-source",
  "domain": "classical-cognition-complement-supplementation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1952",
    "claim-p1953",
    "claim-p1954",
    "claim-p1955",
    "claim-p1956",
    "claim-p1957"
  ],
  "coordinates": {
    "claim-p1952::p1952-h-i-am-quite-aware-that-you-have-an": {
      "assertionId": "classical-cognition-complement-supplementation:p1952-h-i-am-quite-aware-that-you-have-an",
      "canonicalPath": "extractedFrames.cognitionPolicy.semanticGroup"
    },
    "claim-p1953::p1953-object-is-the-referent-of-the-nuclear-object-of": {
      "assertionId": "classical-cognition-complement-supplementation:p1953-object-is-the-referent-of-the-nuclear-object-of",
      "canonicalPath": "extractedFrames.cognitionPolicy.speechAct"
    },
    "claim-p1954::p1954-he-no-longer-knew-what-he-was-doing-the": {
      "assertionId": "classical-cognition-complement-supplementation:p1954-he-no-longer-knew-what-he-was-doing-the",
      "canonicalPath": "cognition.referenceFrame.wholeSupplementIsReferent"
    },
    "claim-p1955::p1955-the-adjoined-sentence-cuix-oc-quipiyaya-the-supplementary-object": {
      "assertionId": "classical-cognition-complement-supplementation:p1955-the-adjoined-sentence-cuix-oc-quipiyaya-the-supplementary-object",
      "canonicalPath": "cognition.authorizationStatus"
    },
    "claim-p1956::p1956-the-adjoined-sentence-ca-mpa-o-tocontla-lih-the": {
      "assertionId": "classical-cognition-complement-supplementation:p1956-the-adjoined-sentence-ca-mpa-o-tocontla-lih-the",
      "canonicalPath": "extractedFrames.cognitionPolicy.semanticGroup"
    },
    "claim-p1957::p1957-used-to-badly-mistreat-his-wife-the-verbstem-te": {
      "assertionId": "classical-cognition-complement-supplementation:p1957-used-to-badly-mistreat-his-wife-the-verbstem-te",
      "canonicalPath": "extractedFrames.cognitionPolicy.speechAct"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1952": [],
    "claim-p1953": [],
    "claim-p1954": [],
    "claim-p1955": [],
    "claim-p1956": [],
    "claim-p1957": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1952": "authorized",
    "claim-p1953": "authorized",
    "claim-p1954": "authorized",
    "claim-p1955": "authorized",
    "claim-p1956": "authorized",
    "claim-p1957": "authorized"
  }
};
export default Object.freeze(spec);
