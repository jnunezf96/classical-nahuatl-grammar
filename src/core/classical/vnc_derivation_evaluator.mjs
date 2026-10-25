// Canonical modern ESM module.

import {
  getClassicalNahuatlKarttunen1992DerivationEvidenceInventory as getSharedKarttunen1992DerivationEvidenceInventory,
  getClassicalNahuatlKarttunen1992DerivationEvidenceMatches as getSharedKarttunen1992DerivationEvidenceMatches,
} from "./karttunen_1992_derivation_evidence.mjs?v=20260726-lessons2-58-one-system-094";
import {
  normalizeClassicalNahuatlVncParadigmTense,
  normalizeClassicalNahuatlVncSemanticTense,
} from "./vnc_layer_evaluator.mjs?v=20261001-reader-26-4-optional-weather-2&andrewsRelease=20261024-1";
import {
  getClassicalNahuatlPhoneRepertoryRelation,
} from "../concepts/phone_repertory_facts.mjs?v=20260810-atom099-001";
import {
  buildClassicalNahuatlParticipantFrame,
  buildClassicalNahuatlParticipantRoleTransitionFrame,
  isClassicalNahuatlParticipantFrame,
} from "./participant_frame.mjs?v=20260823-passive-formation-continuity-238";

// This participant transition is shared by suffixal and nominal causatives.
// Callers retain the original owned Source; these are its transformed objects.
export function projectClassicalNahuatlRetainedReflexiveShuntline(
  sourceObjectRequests = [],
  { targetSubject = "", retainSubjectCoreference = false } = {},
) {
  const targetObjectPerson = retainSubjectCoreference ? targetSubject : "nonfirst-common";
  const reflexives = sourceObjectRequests.filter(request => request.objectKind === "reflexive");
  const targetObjectRequests = Object.freeze(sourceObjectRequests.map(request =>
    request.objectKind === "reflexive"
      ? Object.freeze({ ...request, objectPerson: targetObjectPerson }) : request));
  const ruleFrame = reflexives.length ? Object.freeze({
    kind: "classical-nahuatl-retained-source-reflexive-shuntline-rule-frame",
    version: 1, authorizationStatus: "authorized",
    ruleId: retainSubjectCoreference
      ? "cn-l26-2616-nextia-retained-subject-reflexive-exception"
      : "cn-vnc-retained-source-mainline-reflexive-to-shuntline-ne",
    operation: retainSubjectCoreference
      ? "retain-source-subject-reflexive-person-in-shuntline"
      : "replace-retained-source-mainline-reflexive-person-with-nonfirst-common-shuntline",
    ...(retainSubjectCoreference ? {
      sourceAuthority: "Andrews 26.16 rare lexical exception", subjectCoreferenceRetained: true,
    } : {}),
    sourceReflexiveObjectIds: Object.freeze(reflexives.map(request => request.objectId)),
    targetObjectPerson, typedParticipantAuthority: true,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  }) : null;
  return Object.freeze({ sourceObjectRequests, targetObjectRequests, ruleFrame });
}

export const CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES = Object.freeze(["direct", "causative", "applicative"]);

export function normalizeClassicalNahuatlVncDerivationType(value = "") {
  const normalized = String(value == null ? "" : value).trim().toLowerCase();
  return CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES.includes(normalized) ? normalized : "";
}

export function getClassicalNahuatlVncDerivationTypeVocabulary() {
  return {
    kind: "classical-nahuatl-vnc-derivation-type-vocabulary",
    version: 1,
    derivationTypes: [...CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES],
    directType: "direct",
    derivedTypes: CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES.filter(type => type !== "direct"),
    authority: "Classical Nahuatl semantic derivational operations",
    contextualAuthorizationRemainsTyped: true,
  };
}

export function validateClassicalNahuatlVncDerivationTypeSelection(value = "") {
  const requestedDerivationType = String(value == null ? "" : value).trim().toLowerCase();
  const derivationType = normalizeClassicalNahuatlVncDerivationType(requestedDerivationType);
  return {
    kind: "classical-nahuatl-vnc-derivation-type-selection-frame",
    version: 1,
    requestedDerivationType,
    derivationType,
    allowedDerivationTypes: [...CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES],
    authorizationStatus: derivationType ? "authorized" : "blocked",
    blockReason: derivationType ? "" : "classical-vnc-derivation-type-not-recognized",
    contextualAuthorizationRemainsTyped: true,
  };
}

export function validateClassicalNahuatlVncDerivationTypeControlInventory({
  options = [],
  authorityOptionTags = [],
} = {}) {
  const normalizedOptions = Array.isArray(options) ? options.map(option => typeof option === "string"
    ? { value: String(option), tagId: "" }
    : { value: String(option?.value || ""), tagId: String(option?.tagId || "") }) : [];
  const values = normalizedOptions.map(option => option.value);
  const expectedValues = [...CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES];
  const records = Array.isArray(authorityOptionTags) ? authorityOptionTags : [];
  const mismatchedAuthorityOptions = normalizedOptions.filter(option => {
    const record = records.find(candidate => String(candidate?.tagId || "") === option.tagId);
    return !record || String(record.controlId || "") !== "classical-derivation-type" || String(record.value || "") !== option.value;
  }).map(option => `classical-derivation-type:${option.value}:${option.tagId || "<untagged>"}`);
  const duplicateValues = values.filter((value, index, all) => all.indexOf(value) !== index);
  const inventoryMatches = values.length === expectedValues.length && values.every((value, index) => value === expectedValues[index]);
  const authorized = inventoryMatches && !duplicateValues.length && !mismatchedAuthorityOptions.length;
  return {
    kind: "classical-nahuatl-vnc-derivation-type-control-inventory-validation-frame",
    version: 1,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "classical-vnc-derivation-type-control-inventory-mismatch",
    values,
    expectedValues,
    inventoryMatches,
    duplicateValues: Array.from(new Set(duplicateValues)),
    mismatchedAuthorityOptions,
    shellAndLedgerAreNotGrammarAuthority: true,
  };
}

export function createClassicalNahuatlVncDerivationEvaluatorApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION = 1;
    const CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH = 12;
    const CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_INTERNAL_BRIDGE_KIND =
      "classical-nahuatl-type-two-causative-internal-nonactive-bridge-frame";
    const CLASSICAL_NAHUATL_DESTOCKAL_TYPE_INVENTORY = Object.freeze([
      Object.freeze({
        typeId: "long-vowel-ni-or-hui",
        stockFormativeQuantity: "long",
        stemFormatives: Object.freeze(["ni", "hui"]),
      }),
      Object.freeze({
        typeId: "long-vowel-hua",
        stockFormativeQuantity: "long",
        stemFormatives: Object.freeze(["hua"]),
      }),
      Object.freeze({
        typeId: "short-vowel-hui",
        stockFormativeQuantity: "short",
        stemFormatives: Object.freeze(["hui"]),
      }),
    ]);
    const CLASSICAL_NAHUATL_DESTOCKAL_NI_HUI_CLASS_SYSTEM_FRAME = Object.freeze({
      kind: "classical-nahuatl-destockal-ni-hui-class-system-frame",
      version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
      authorizationStatus: "authorized",
      typeId: "long-vowel-ni-or-hui",
      sourceAssignment: Object.freeze({
        rank: "intransitive-verbstem",
        stemFormatives: Object.freeze(["ni", "hui"]),
        classId: "B",
        andrewsSection: "24.5.6",
        contextualFactIsUserChoice: false,
      }),
      targetAssignments: Object.freeze({
        replacement: Object.freeze({
          procedure: "replacement",
          outputSequences: Object.freeze(["n-a", "hu-a"]),
          classId: "B",
          andrewsSection: "24.5.8",
          contextualFactIsUserChoice: false,
        }),
        addition: Object.freeze({
          procedure: "addition",
          outputSequences: Object.freeze(["ni-ā", "hui-ā"]),
          classId: "C",
          andrewsSection: "24.5.8",
          contextualFactIsUserChoice: false,
        }),
      }),
      contextualFactIsUserChoice: false,
      canvasExampleAuthority: false,
      callerSuppliedGrammarAuthority: false,
    });
    const CLASSICAL_NAHUATL_DESTOCKAL_LONG_STOCK_HARMONY = Object.freeze({
      stockFormativeQuantity: "long",
      controller: Object.freeze({ rank: "root", vowelQuantity: "short" }),
      realizationsByRootVowel: Object.freeze({
        a: Object.freeze({ default: "ā" }),
        i: Object.freeze({ default: "ī" }),
        o: Object.freeze({ default: "ō" }),
        e: Object.freeze({ default: "ō", withHuiAlternative: "ē" }),
      }),
      normalRelation: "root-vowel-harmony",
    });
    const classicalNahuatlIssuedTypeTwoCausativeInternalBridgeFrames =
      new WeakSet();
    // One typed Source plus one lexical license has one internal prerequisite.
    // Distinct causative/applicative operations may consume it, but neither
    // operation nor a Lesson 20 selection may mint a second authority object.
    const classicalNahuatlTypeTwoInternalBridgeFrameCache = new Map();
    const classicalNahuatlIssuedVncDerivationSourceAnalysisFrames =
      new WeakSet();
    const classicalNahuatlIssuedVncDerivationOptions = new WeakSet();
    const classicalNahuatlIssuedVncDerivationOptionInventories =
      new WeakSet();
    const classicalNahuatlIssuedVncDerivationOperationFrames = new WeakSet();
    const classicalNahuatlIssuedVncDerivationOperationBatchFrames =
      new WeakSet();
    const classicalNahuatlIssuedDerivedVncMachineryFrames = new WeakSet();
    const analyticalVncSources = new WeakMap();
    const analyticalVncSourceRecords = new WeakMap();
    const analyticalVncArgumentContexts = new WeakMap();
    const ANALYTICAL_ARGUMENT_CONTEXT_KIND = "classical-nahuatl-analytical-vnc-argument-context-frame";
    const CLASSICAL_NAHUATL_VNC_DERIVATION_OBJECT_KINDS = Object.freeze(["specific-projective", "reflexive", "nonspecific-human", "nonspecific-nonhuman"]);
    const CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS = Object.freeze(["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]);
    const CLASSICAL_NAHUATL_VNC_DERIVATION_BASE_SOURCE_KINDS = Object.freeze([
      "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
      "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame"
    ]);
    const CLASSICAL_NAHUATL_VNC_DERIVATION_VOICE_SOURCE_KIND = "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame";
    const CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_WITNESSES = Object.freeze([Object.freeze({
      sourceStem: "tomi",
      sourceClass: "B",
      sourceValence: "intransitive",
      sourceObjectCount: 0,
      targetStem: "tom-a",
      targetClass: "B",
      ruleId: "cn-l24-2431a-tomi-tom-a",
      ruleTagId: "cn-l24-type-one-causative-a",
      andrewsSection: "24.3.1.a",
      formationLesson: "24",
      evidenceSections: Object.freeze(["24.3.1.a", "24.8.1", "24.9"]),
      scopeModel: "causative-source-vnc-core",
      scopeSection: "24.9",
      scopeRule: "The causative governs the source subject together with the source VNC core.",
      participantRule: "The source subject becomes the causative object and a new outer subject is imported.",
      derivationSubtype: "type-one",
      derivationRoute: "type-one-replacement-exact"
    }), Object.freeze({
      sourceStem: "tēmi",
      sourceClass: "B",
      sourceValence: "intransitive",
      sourceObjectCount: 0,
      targetStem: "tēm-a",
      targetClass: "B",
      sourceMeaning: "become-brimming-full",
      targetMeaning: "cause-something-to-fill-a-container",
      additionalTargetReadings: Object.freeze([Object.freeze({
        meaning: "put-something-somewhere",
        relation: "also"
      }), Object.freeze({
        meaning: "bake-something-in-a-small-oven",
        relation: "lexical-extension"
      })]),
      ruleId: "cn-l24-2431a-temi-tem-a",
      ruleTagId: "cn-l24-type-one-causative-a",
      andrewsSection: "24.3.1.a",
      formationLesson: "24",
      evidenceSections: Object.freeze(["24.3.1.a", "24.8.1", "24.9"]),
      scopeModel: "causative-source-vnc-core",
      scopeSection: "24.9",
      scopeRule: "The causative governs the source subject together with the source VNC core.",
      participantRule: "The source subject becomes the causative object and a new outer subject is imported.",
      derivationSubtype: "type-one",
      derivationRoute: "type-one-replacement-exact"
    })]);
    const CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_NEGATIVE_LICENSES = Object.freeze([Object.freeze({
      sourceStem: "pil-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      blockedRoute: "type-one-destockal-hui-to-o-a",
      andrewsSection: "24.7 note 2",
      reason: "The documented i-hui source has no o-a causative counterpart."
    }), Object.freeze({
      sourceStem: "mīx-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      blockedRoute: "type-one-destockal-hui-to-o-a",
      andrewsSection: "25.2.4",
      reason: "The o-a stem is explicitly unattested for this exact source."
    }), Object.freeze({
      sourceStem: "tlatz-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      blockedRoute: "type-one-destockal-hui-to-o-a",
      andrewsSection: "25.2.4",
      reason: "The o-a stem is explicitly unattested for this exact source."
    }), Object.freeze({
      sourceStem: "ihc-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      blockedRoute: "type-one-destockal-hui-to-o-a",
      andrewsSection: "25.2.4",
      reason: "The corresponding type-one causative is explicitly rejected."
    })]);
    const CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_LIA_SOURCE_DISPOSITIONS = Object.freeze([
      Object.freeze({
        sourceDispositionId: "cn-l25-2551-tlacati-lia-source",
        derivationLicenseId: "cn-l25-2551-tlacati-lia",
        sourceStem: "tlāca-ti",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2551-tlacati-denominal-source",
        sourceAnalysisCategory: "denominal-ti-candidate",
        canonicalSegments: Object.freeze(["tlāca", "ti"]),
        canonicalRoot: "tlāca",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2551-denominal-ti-lia",
        derivationRoute: "type-two-lia-from-typed-denominal-ti",
        andrewsSection: "25.5.1",
        evidenceSections: Object.freeze(["25.1", "25.5.1", "25.9", "25.15"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2551-nelti-lia-source",
        derivationLicenseId: "cn-l25-2551-nelti-lia",
        sourceStem: "nel-ti",
        sourceClasses: Object.freeze(["A"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2551-nelti-denominal-source",
        sourceAnalysisCategory: "denominal-ti-candidate",
        canonicalSegments: Object.freeze(["nel", "ti"]),
        canonicalRoot: "nel",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2551-denominal-ti-lia",
        derivationRoute: "type-two-lia-from-typed-denominal-ti",
        andrewsSection: "25.5.1",
        evidenceSections: Object.freeze(["25.1", "25.5.1", "25.9", "25.15"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2551-mazati-lia-source",
        derivationLicenseId: "cn-l25-2551-mazati-lia",
        sourceStem: "mazā-ti",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2551-mazati-denominal-source",
        sourceAnalysisCategory: "denominal-ti-candidate",
        canonicalSegments: Object.freeze(["mazā", "ti"]),
        canonicalRoot: "mazā",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2551-denominal-ti-lia",
        derivationRoute: "type-two-lia-from-typed-denominal-ti",
        andrewsSection: "25.5.1",
        evidenceSections: Object.freeze(["25.1", "25.5.1", "25.9", "25.15"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2552-ahhuiaya-lia-source",
        derivationLicenseId: "cn-l25-2552-ahhuialia",
        sourceStem: "ahhuiā-ya",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2552-ahhuiaya-root-plus-ya-source",
        sourceAnalysisCategory: "root-plus-ya",
        canonicalSegments: Object.freeze(["ahhuiā", "ya"]),
        canonicalRoot: "ahhuiā",
        themeHostRank: "root",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2552-root-plus-ya-lia",
        derivationRoute: "type-two-lia-from-typed-root-plus-ya",
        andrewsSection: "25.5.2",
        evidenceSections: Object.freeze(["25.1", "25.5.2", "25.9", "25.15"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2552-ceceya-lia-source",
        derivationLicenseId: "cn-l25-2552-cecelia",
        sourceStem: "ce-ce-ya",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2552-ceceya-root-plus-ya-source",
        sourceAnalysisCategory: "root-plus-ya",
        canonicalSegments: Object.freeze(["ce", "ce", "ya"]),
        canonicalRoot: "ce-ce",
        themeHostRank: "root",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2552-root-plus-ya-lia",
        derivationRoute: "type-two-lia-from-typed-root-plus-ya",
        andrewsSection: "25.5.2",
        evidenceSections: Object.freeze(["25.1", "25.5.2", "25.9", "25.15"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2552-xocoya-lia-source",
        derivationLicenseId: "cn-l25-2552-xocolia",
        sourceStem: "xoco-ya",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2552-xocoya-root-plus-ya-source",
        sourceAnalysisCategory: "root-plus-ya",
        canonicalSegments: Object.freeze(["xoco", "ya"]),
        canonicalRoot: "xoco",
        themeHostRank: "root",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2552-root-plus-ya-lia",
        derivationRoute: "type-two-lia-from-typed-root-plus-ya",
        andrewsSection: "25.5.2",
        evidenceSections: Object.freeze(["25.1", "25.5.2", "25.9", "25.15"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2552-chichiya-lia-source",
        derivationLicenseId: "cn-l25-2552-chichilia",
        sourceStem: "chichi-ya",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2552-chichiya-root-plus-ya-source",
        sourceAnalysisCategory: "root-plus-ya",
        canonicalSegments: Object.freeze(["chichi", "ya"]),
        canonicalRoot: "chichi",
        themeHostRank: "root",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2552-root-plus-ya-lia",
        derivationRoute: "type-two-lia-from-typed-root-plus-ya",
        andrewsSection: "25.5.2",
        evidenceSections: Object.freeze(["25.1", "25.5.2", "25.9", "25.15"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2552-tetiya-lia-source",
        derivationLicenseId: "cn-l25-2552-tetilia",
        sourceStem: "te-ti-ya",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2552-tetiya-root-plus-ya-source",
        sourceAnalysisCategory: "root-plus-ya",
        canonicalSegments: Object.freeze(["te", "ti", "ya"]),
        canonicalRoot: "te-ti",
        themeHostRank: "verbstem",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2552-root-plus-ya-lia",
        derivationRoute: "type-two-lia-from-typed-root-plus-ya",
        andrewsSection: "25.5.2",
        evidenceSections: Object.freeze(["25.1", "25.5.2", "25.9", "25.15", "54.2.3.b"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2552-xoxohuiya-lia-source",
        derivationLicenseId: "cn-l25-2552-xoxohuilia",
        sourceStem: "xo-xō-hui-ya",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2552-xoxohuiya-root-plus-ya-source",
        sourceAnalysisCategory: "root-plus-ya",
        canonicalSegments: Object.freeze(["xo", "xō", "hui", "ya"]),
        canonicalRoot: "xo-xō-hui",
        themeHostRank: "verbstem",
        disposition: "licensed-lia",
        ruleId: "cn-l25-2552-root-plus-ya-lia",
        derivationRoute: "type-two-lia-from-typed-root-plus-ya",
        andrewsSection: "25.5.2",
        evidenceSections: Object.freeze(["25.1", "25.5.2", "25.9", "25.15", "54.2.3.b"]),
        blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua", "lō"]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2548-tlaocoya-lia-exception",
        sourceStem: "tlaōco-ya",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2548-tlaocoya-root-plus-ya-source",
        sourceAnalysisCategory: "root-plus-ya",
        canonicalSegments: Object.freeze(["tlaōco", "ya"]),
        canonicalRoot: "tlaōco",
        themeHostRank: "root",
        disposition: "blocked-lia-use-l-tia",
        blockedRuleId: "cn-l25-2552-root-plus-ya-lia",
        andrewsSection: "25.4.8",
        evidenceSections: Object.freeze(["25.4.8", "25.5.2"]),
        blockedLesson20SuffixFamilies: Object.freeze([]),
      }),
      Object.freeze({
        sourceDispositionId: "cn-l25-2548-ahuiya-lia-exception",
        sourceStem: "āhui-ya",
        sourceClasses: Object.freeze(["A", "B"]),
        sourceValence: "intransitive",
        sourceAnalysisId: "cn-l25-2548-ahuiya-root-plus-ya-source",
        sourceAnalysisCategory: "root-plus-ya",
        canonicalSegments: Object.freeze(["āhui", "ya"]),
        canonicalRoot: "āhui",
        themeHostRank: "root",
        disposition: "blocked-lia-use-l-tia",
        blockedRuleId: "cn-l25-2552-root-plus-ya-lia",
        andrewsSection: "25.4.8",
        evidenceSections: Object.freeze(["25.4.8", "25.5.2"]),
        blockedLesson20SuffixFamilies: Object.freeze([]),
      }),
    ]);
    const CLASSICAL_NAHUATL_LESSONS24_25_SOURCE_ANALYSIS_WITNESSES = Object.freeze([Object.freeze({
      analysisId: "cn-l24-2431a-huaqui-fused-destockal",
      sourceAliases: Object.freeze(["huā-qui", "huāqui", "hua-qui", "huaqui"]),
      categories: Object.freeze(["fused-destockal-final-i", "type-one-consonant-alternation"]),
      canonicalSegments: Object.freeze(["huā", "qui"]),
      andrewsSections: Object.freeze(["24.3.1.a", "24.5.9", "25.8"])
    }), Object.freeze({
      analysisId: "cn-l24-245-cualani-destockal",
      sourceAliases: Object.freeze(["cual-ā-ni", "cualāni", "cual-a-ni", "cualani"]),
      categories: Object.freeze(["destockal-ni-candidate", "fused-destockal-ni-exact"]),
      canonicalSegments: Object.freeze(["cual", "ā", "ni"]),
      andrewsSections: Object.freeze(["24.5", "25.3"])
    }), Object.freeze({
      analysisId: "cn-l24-2451-tlatzini-stock-harmony-exception",
      sourceAliases: Object.freeze(["tlatz-ī-ni", "tlatzīni"]),
      categories: Object.freeze(["destockal-ni-candidate"]),
      canonicalSegments: Object.freeze(["tlatz", "ī", "ni"]),
      lexicalReadings: Object.freeze(["make-a-bursting-or-explosive-noise"]),
      andrewsSections: Object.freeze(["22.6", "24.5.1"])
    }), Object.freeze({
      analysisId: "cn-l24-2453-olini-long-root-source",
      sourceAliases: Object.freeze(["ōl-ī-ni", "ōlīni"]),
      categories: Object.freeze(["destockal-ni-candidate"]),
      canonicalSegments: Object.freeze(["ōl", "ī", "ni"]),
      lexicalReadings: Object.freeze(["move", "move-along-a-path", "tremble-or-quake"]),
      andrewsSections: Object.freeze(["24.5.3", "24.5.7"])
    }), Object.freeze({
      analysisId: "cn-l24-2432b-cocoya-root-plus-ya",
      sourceAliases: Object.freeze(["coco-ya", "cocoya"]),
      categories: Object.freeze(["root-plus-ya"]),
      canonicalSegments: Object.freeze(["coco", "ya"]),
      canonicalRoot: "coco",
      themeHostRank: "root",
      andrewsSections: Object.freeze(["24.3.2.b"])
    }), Object.freeze({
      analysisId: "cn-l24-2432b-tlapihuiya-root-plus-ya",
      sourceAliases: Object.freeze([
        "tlap-ī-hui-ya",
        "tlapīhuiya",
        "tlap-i-hui-ya",
        "tlapihuiya"
      ]),
      categories: Object.freeze(["root-plus-ya"]),
      canonicalSegments: Object.freeze(["tlap-ī-hui", "ya"]),
      canonicalRoot: "tlap-ī-hui",
      themeHostRank: "verbstem",
      andrewsSections: Object.freeze(["24.3.2.b"])
    }), Object.freeze({
      analysisId: "cn-l24-2432b-yocoya-retentive-exception",
      sourceAliases: Object.freeze(["yōco-ya", "yōcoya", "yoco-ya", "yocoya"]),
      categories: Object.freeze(["root-plus-ya", "root-plus-ya-retentive-exception"]),
      canonicalSegments: Object.freeze(["yōco", "ya"]),
      themeHostRank: "root",
      andrewsSections: Object.freeze(["24.3.2.b note"])
    }), Object.freeze({
      analysisId: "cn-l25-253-mahui-hidden-o-hua",
      sourceAliases: Object.freeze(["mahui"]),
      categories: Object.freeze(["hidden-nonactive-o-hua", "type-two-consonant-alternation"]),
      canonicalSegments: Object.freeze(["mahu", "i"]),
      andrewsSections: Object.freeze(["25.3"])
    }), Object.freeze({
      analysisId: "cn-l25-253-254-quemi-hidden-bases",
      sourceAliases: Object.freeze(["quēmi", "quemi"]),
      categories: Object.freeze(["hidden-nonactive-o-hua", "hidden-nonactive-lo", "type-two-consonant-alternation"]),
      canonicalSegments: Object.freeze(["quēm", "i"]),
      andrewsSections: Object.freeze(["25.3", "25.4"])
    }), Object.freeze({
      analysisId: "cn-l25-251-yauh-suppletive-source",
      sourceAliases: Object.freeze(["ya-uh", "yauh"]),
      categories: Object.freeze(["suppletive-causative-source"]),
      canonicalSegments: Object.freeze(["ya", "uh"]),
      andrewsSections: Object.freeze(["25.1 note"])
    }), Object.freeze({
      analysisId: "cn-l25-251-huallauh-suppletive-source",
      sourceAliases: Object.freeze(["huāl-la-uh", "huāllauh", "hual-la-uh", "huallauh"]),
      categories: Object.freeze(["suppletive-causative-source", "directional-suppletive-causative-source"]),
      canonicalSegments: Object.freeze(["huāl", "la", "uh"]),
      andrewsSections: Object.freeze(["25.1 note"])
    }), Object.freeze({
      analysisId: "cn-l24-2459-mini-fused-destockal",
      sourceAliases: Object.freeze(["mī-ni", "mīni"]),
      categories: Object.freeze(["destockal-ni-candidate", "fused-destockal-ni-exact"]),
      canonicalSegments: Object.freeze(["mi", "ī", "ni"]),
      reconstructionDisposition: Object.freeze({ extantSourceStem: "mī-ni" }),
      andrewsSections: Object.freeze(["24.5.9"])
    }), Object.freeze({
      analysisId: "cn-l24-2459-xini-fused-destockal",
      sourceAliases: Object.freeze(["xī-ni", "xīni"]),
      categories: Object.freeze(["destockal-ni-candidate", "fused-destockal-ni-exact"]),
      canonicalSegments: Object.freeze(["xi", "ī", "ni"]),
      reconstructionDisposition: Object.freeze({ extantSourceStem: "xī-ni" }),
      andrewsSections: Object.freeze(["24.5.9"])
    }), Object.freeze({
      analysisId: "cn-l24-2459-cehui-fused-destockal",
      sourceAliases: Object.freeze(["cē-hui", "cēhui", "ce-ē-hui"]),
      categories: Object.freeze(["destockal-hui-candidate", "fused-destockal-hui-exact"]),
      canonicalSegments: Object.freeze(["ce", "ē", "hui"]),
      reconstructionDisposition: Object.freeze({ extantSourceStem: "cē-hui" }),
      andrewsSections: Object.freeze(["24.5.9"])
    }), Object.freeze({
      analysisId: "cn-l24-2462-cehua-fused-destockal",
      sourceAliases: Object.freeze(["cē-hua", "cēhua", "ce-ē-hua"]),
      categories: Object.freeze(["destockal-long-vowel-hua", "fused-destockal-hua-exact"]),
      canonicalSegments: Object.freeze(["ce", "ē", "hua"]),
      reconstructionDisposition: Object.freeze({ extantSourceStem: "cē-hua" }),
      andrewsSections: Object.freeze(["24.6.2"])
    }), Object.freeze({
      analysisId: "cn-l24-2462-ehua-fused-destockal",
      sourceAliases: Object.freeze(["ē-hua", "ēhua", "e-ē-hua"]),
      categories: Object.freeze(["destockal-long-vowel-hua", "fused-destockal-hua-exact"]),
      canonicalSegments: Object.freeze(["e", "ē", "hua"]),
      reconstructionDisposition: Object.freeze({ extantSourceStem: "ē-hua" }),
      andrewsSections: Object.freeze(["24.6.2"])
    }), Object.freeze({
      analysisId: "cn-l24-2457b-tlapihui-addition-preference",
      sourceAliases: Object.freeze(["tlap-ī-hui", "tlapīhui", "tlap-i-hui", "tlapihui"]),
      categories: Object.freeze(["destockal-hui-candidate"]),
      canonicalSegments: Object.freeze(["tlap", "ī", "hui"]),
      andrewsSections: Object.freeze(["24.5.7"])
    }), ...CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_LIA_SOURCE_DISPOSITIONS.map(disposition => Object.freeze({
      analysisId: disposition.sourceAnalysisId,
      sourceAliases: Object.freeze([disposition.sourceStem]),
      categories: Object.freeze([disposition.sourceAnalysisCategory]),
      canonicalSegments: disposition.canonicalSegments,
      canonicalRoot: disposition.canonicalRoot,
      themeHostRank: disposition.themeHostRank || "root",
      andrewsSections: disposition.evidenceSections,
    }))]);
    const CLASSICAL_NAHUATL_TYPE_ONE_ROOT_PLUS_YA_EXACT_PROFILES = Object.freeze([
      Object.freeze({
        sourceAliases: Object.freeze(["coco-ya", "cocoya"]),
        causativeCitationRole: "tē",
        implicitAgentObjectKind: "nonspecific-human"
      }),
      Object.freeze({
        sourceAliases: Object.freeze([
          "tlap-ī-hui-ya",
          "tlapīhuiya",
          "tlap-i-hui-ya",
          "tlapihuiya"
        ]),
        causativeCitationRole: "tla",
        implicitAgentObjectKind: "nonspecific-nonhuman"
      }),
      Object.freeze({
        sourceAliases: Object.freeze(["yōco-ya", "yōcoya", "yoco-ya", "yocoya"]),
        causativeCitationRole: "tla",
        implicitAgentObjectKind: "nonspecific-nonhuman",
        sourceMeaning: "become-comely-or-well-formed",
        targetMeaning: "cause-something-to-become-well-formed",
        additionalTargetReadings: Object.freeze([Object.freeze({
          meaning: "form-invent-or-create-something",
          relation: "lexical-extension"
        })])
      })
    ]);
    const CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_ALTERNATIONS = Object.freeze([Object.freeze({
      sourceAliases: Object.freeze(["ē-hua", "ēhua", "e-ē-hua"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      sourceAnalysisCategory: "fused-destockal-hua-exact",
      markedTargetStem: "ē-hu-a",
      unmarkedTargetStem: "e-hu-a",
      targetClass: "B",
      sourceMeaning: "arise-or-depart",
      additionalSourceReadings: Object.freeze([Object.freeze({
        meaning: "lift-off-in-flight",
        relation: "bird-animate-nonhuman-subject"
      })]),
      targetMeaning: "lift-something",
      additionalTargetReadings: Object.freeze([Object.freeze({
        meaning: "carry-something-heavy",
        relation: "heavy-nonhuman-object"
      }), Object.freeze({
        meaning: "sing-something",
        relation: "song-nonhuman-object"
      })]),
      ruleId: "cn-l24-2432a-ehua-e-hu-a",
      andrewsSection: "24.3.2.a",
      derivationRoute: "type-one-final-a-morphological-replacement-exact",
      procedure: "replace-the-source-final-a-with-homophonous-causative-a-and-expose-the-hu-a-boundary",
      targetConstruction: Object.freeze({ operation: "morphological-replacement", preserve: "ē-hu", remove: "source-a", add: "causative-a", surfaceChange: false })
    }), Object.freeze({
      sourceAliases: Object.freeze(["to-tō-ca", "totōca", "to-to-ca", "totoca"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "to-tō-tz-a",
      unmarkedTargetStem: "to-to-tz-a",
      targetClass: "B",
      ruleId: "cn-l24-2432a-totoca-tototza",
      andrewsSection: "24.3.2.a",
      derivationRoute: "type-one-final-ca-to-tz-a-exact",
      procedure: "replace-final-ca-with-tz-plus-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-final-and-consonant", remove: "ca", add: "tz-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["huā-qui", "huāqui", "hua-qui", "huaqui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "huā-tz-a",
      unmarkedTargetStem: "hua-tz-a",
      causativeCitationRole: "tla",
      targetClass: "B",
      ruleId: "cn-l24-2431a-huaqui-huatza",
      andrewsSection: "24.3.1.a",
      derivationRoute: "type-one-final-i-consonant-alternation-exact",
      procedure: "replace-final-qui-with-tz-plus-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-final-and-consonant", remove: "qui", add: "tz-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["zahui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "zahu-a",
      unmarkedTargetStem: "zahu-a",
      targetClass: "B",
      ruleId: "cn-l24-2431a-zahui-zahua",
      andrewsSection: "24.3.1.a",
      derivationRoute: "type-one-final-i-replacement-exact-simple-source",
      procedure: "treat-the-attested-source-as-simple-final-i-and-replace-i-with-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-final", remove: "i", add: "a", blocksCompetingAnalysis: "destockal-i-hui" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["ilpi"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "ilpi-ā",
      unmarkedTargetStem: "ilpi-ā",
      targetClass: "C",
      ruleId: "cn-l24-2431b-ilpi-ilpia",
      andrewsSection: "24.3.1.b",
      derivationRoute: "type-one-final-i-addition-exact-long-a",
      procedure: "preserve-final-i-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["aqui"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "aqui-ā",
      unmarkedTargetStem: "aqui-ā",
      targetClass: "C",
      ruleId: "cn-l24-2431b-aqui-aquia",
      andrewsSection: "24.3.1.b",
      derivationRoute: "type-one-final-i-addition-exact-long-a",
      procedure: "preserve-final-i-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pah-ti"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pah-ti-ā",
      unmarkedTargetStem: "pah-ti-ā",
      targetClass: "C",
      ruleId: "cn-l24-2431b-pahti-pahtia",
      andrewsSection: "24.3.1.b",
      derivationRoute: "type-one-final-i-addition-exact-long-a",
      procedure: "preserve-denominal-ti-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlap-ī-hui-ya"]),
      sourceClasses: Object.freeze(["A", "B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "tlap-ī-hui-ā",
      unmarkedTargetStem: "tlap-ī-hui-ā",
      targetClass: "C",
      sourceAnalysisCategory: "root-plus-ya",
      ruleId: "cn-l24-2432b-tlapihuiya-tlapihuia",
      andrewsSection: "24.3.2.b",
      derivationRoute: "type-one-root-plus-ya-replacement-exact-quantity",
      procedure: "delete-derivational-ya-preserve-internal-long-i-and-append-long-causative-a",
      targetConstruction: Object.freeze({
        operation: "replace-morpheme",
        remove: "ya",
        preserveInternalQuantity: true,
        add: "ā",
        underlyingAdd: "a",
        lengtheningEnvironment: "preceding-vowel"
      })
    }), Object.freeze({
      sourceAliases: Object.freeze(["ōl-ī-ni"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "ōl-ī-ni-ā",
      unmarkedTargetStem: "ol-i-ni-a",
      targetClass: "C",
      sourceAnalysisCategory: "destockal-ni-candidate",
      ruleId: "cn-l24-2457a-olini-olinia",
      andrewsSection: "24.5.7",
      derivationRoute: "type-one-destockal-ni-addition-exact-quantity",
      procedure: "preserve-destockal-ni-quantity-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, preserveInternalQuantity: true, add: "ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["chay-ā-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "chay-ā-hu-a",
      unmarkedTargetStem: "chay-a-hu-a",
      targetClass: "B",
      sourceAnalysisCategory: "destockal-hui-candidate",
      ruleId: "cn-l24-2457b-chayahui-chayahua",
      andrewsSection: "24.5.7",
      derivationRoute: "type-one-destockal-hui-replacement-exact-quantity",
      procedure: "replace-final-hui-with-hu-a-and-preserve-stock-vowel-quantity",
      targetConstruction: Object.freeze({ operation: "replace-morpheme", preserveInternalQuantity: true, remove: "hui", add: "hu-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlap-ī-hui", "tlap-i-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "tlap-ī-hui-ā",
      unmarkedTargetStem: "tlap-ī-hui-ā",
      targetClass: "C",
      sourceAnalysisCategory: "destockal-hui-candidate",
      ruleId: "cn-l24-2457b-tlapihui-tlapihuia",
      andrewsSection: "24.5.7",
      derivationRoute: "type-one-destockal-hui-addition-exact-long-a",
      procedure: "preserve-destockal-hui-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pol-i-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pol-o-ā",
      unmarkedTargetStem: "pol-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-polihui-poloa",
      andrewsSection: "24.7",
      derivationRoute: "type-one-destockal-hui-to-o-a-exact-long-a",
      procedure: "replace-i-hui-with-o-plus-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "i-hui", add: "o-ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlal-i-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "tlal-o-ā",
      unmarkedTargetStem: "tlal-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-tlalihui-tlaloa",
      andrewsSection: "24.7",
      derivationRoute: "type-one-destockal-hui-to-o-a-exact-long-a",
      procedure: "replace-i-hui-with-o-plus-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "i-hui", add: "o-ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pix-a-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pix-o-ā",
      unmarkedTargetStem: "pix-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-pixahui-pixoa",
      andrewsSection: "24.7",
      derivationRoute: "type-one-destockal-hui-to-o-a-exact-long-a",
      procedure: "replace-a-hui-with-o-plus-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "a-hui", add: "o-ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlap-o-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "tlap-o-ā",
      unmarkedTargetStem: "tlap-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-note1-tlapohui-tlapoa",
      andrewsSection: "24.7 note 1",
      derivationRoute: "type-one-destockal-o-hui-to-o-a-exact-long-a",
      procedure: "replace-final-hui-with-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "hui", add: "ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pil-ca"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pil-o-ā",
      unmarkedTargetStem: "pil-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-note2-pilca-piloa",
      andrewsSection: "24.7 note 2",
      derivationRoute: "type-one-totally-irregular-pilca-piloa-exact",
      procedure: "apply-the-bounded-pilca-to-piloa-lexical-relation",
      targetConstruction: Object.freeze({ operation: "exact-lexical-replacement", remove: "pil-ca", add: "pil-o-ā", productiveFinalCaRule: false })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pīn-ā-hua"]),
      sourceClasses: Object.freeze(["A", "B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pīn-ā-hu-a",
      unmarkedTargetStem: "pīn-ā-hu-a",
      targetClass: "B",
      ruleId: "cn-l25-258-pinahua-pinahua-type-one",
      andrewsSection: "25.8",
      derivationRoute: "type-one-destockal-hua-replacement-exact",
      procedure: "replace-hua-with-hu-a-and-preserve-the-attested-root-quantity",
      targetConstruction: Object.freeze({ operation: "replace-morpheme", preserveInternalQuantity: true, remove: "hua", add: "hu-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["yōco-ya", "yōcoya", "yoco-ya", "yocoya"]),
      sourceClasses: Object.freeze(["A", "B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "yōco-y-a",
      unmarkedTargetStem: "yōco-y-a",
      targetClass: "B",
      sourceAnalysisCategory: "root-plus-ya-retentive-exception",
      ruleId: "cn-l24-2432b-yocoya-retains-y-a",
      andrewsSection: "24.3.2.b note",
      derivationRoute: "type-one-root-plus-ya-retentive-exception-exact",
      procedure: "preserve-root-final-y-and-replace-source-a-with-causative-a",
      targetConstruction: Object.freeze({ operation: "morphological-replacement", preserve: "y", remove: "source-a", add: "causative-a", surfaceChange: false })
    })]);
    const CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_DESTOCKAL_ALTERNATIONS = Object.freeze([Object.freeze({
      sourceAliases: Object.freeze(["pach-i-hui", "pachihui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceLexemeIds: Object.freeze([
        "cn-vnc-pachihui-pressed-down",
      ]),
      targetStem: "pach-o-ā",
      targetClass: "C",
      ruleId: "cn-l25-2524-pachihui-pachoa-semantic-alternative",
      andrewsSection: "25.2.4",
      derivationRoute: "type-one-destockal-pachihui-to-pachoa-exact-semantic-alternative",
      procedure: "consume-the-typed-pressed-down-source-lexeme-and-replace-i-hui-with-o-plus-long-causative-a",
      sourceAnalysisCategory: "destockal-i-a-o-hui",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "i-hui", add: "o-ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["mī-ni", "mīni"]),
      sourceClasses: Object.freeze(["B"]),
      targetStem: "mī-n-a",
      causativeCitationRole: "tla",
      targetClass: "B",
      ruleId: "cn-l24-2459-mini-mi-n-a",
      andrewsSection: "24.5.9",
      derivationRoute: "type-one-fused-destockal-mini-replacement-exact",
      procedure: "recover-underlying-mi-i-ni-and-preserve-the-coalesced-long-vowel-while-replacing-final-i-with-causative-a",
      sourceAnalysisCategory: "fused-destockal-ni-exact",
      targetConstruction: Object.freeze({ operation: "recover-fused-stock-and-replace", underlyingSource: "mi-ī-ni", preserveCoalescedQuantity: true, remove: "i-ni", add: "i-n-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["xī-ni", "xīni"]),
      sourceClasses: Object.freeze(["B"]),
      targetStem: "xī-ni-ā",
      causativeCitationRole: "tla",
      targetClass: "C",
      ruleId: "cn-l24-2459-xini-xi-ni-a",
      andrewsSection: "24.5.9",
      derivationRoute: "type-one-fused-destockal-xini-addition-exact",
      procedure: "recover-underlying-xi-i-ni-with-root-lengthening-and-add-causative-a",
      sourceAnalysisCategory: "fused-destockal-ni-exact",
      targetConstruction: Object.freeze({ operation: "recover-fused-stock-and-append", underlyingSource: "xi-ī-ni", preserve: "ni", add: "ā", rootVowelChange: "i-to-ī" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["cē-hui", "cēhui", "ce-ē-hui"]),
      sourceClasses: Object.freeze(["B"]),
      targetStem: "cē-hui-ā",
      causativeCitationRole: "tla",
      targetClass: "C",
      ruleId: "cn-l24-2459-cehui-ce-hui-a",
      andrewsSection: "24.5.9",
      derivationRoute: "type-one-fused-destockal-cehui-addition-exact",
      procedure: "preserve-fused-ce-ē-hui-source-and-add-causative-a",
      sourceAnalysisCategory: "fused-destockal-hui-exact",
      targetConstruction: Object.freeze({ operation: "recover-fused-stock-and-append", underlyingSource: "ce-ē-hui", preserve: "cē-hui", add: "ā" })
    })]);
    const CLASSICAL_NAHUATL_TYPE_ONE_DESTOCKAL_PREFERENCE_OVERRIDES = Object.freeze([Object.freeze({
      sourceAliases: Object.freeze(["tlap-ā-ni", "tlapāni", "tlap-a-ni", "tlapani"]),
      preferredProcedure: "replacement",
      ruleId: "cn-l24-2457a-tlapani-prefers-replacement"
    }), Object.freeze({
      sourceAliases: Object.freeze(["tzay-ā-ni", "tzayāni"]),
      preferredProcedure: "replacement",
      ruleId: "cn-l24-2457a-tzayani-prefers-replacement"
    }), Object.freeze({
      sourceAliases: Object.freeze(["cot-ō-ni", "cotōni"]),
      preferredProcedure: "replacement",
      ruleId: "cn-l24-2457a-cotoni-prefers-replacement"
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlap-ī-hui", "tlapīhui", "tlap-i-hui", "tlapihui"]),
      preferredProcedure: "addition",
      ruleId: "cn-l24-2457b-tlapihui-prefers-addition"
    })]);
    const CLASSICAL_NAHUATL_FINAL_O_HUIA_EXACT_ROUTE_CHOICES = Object.freeze([Object.freeze({
      sourceStem: "temō",
      route: "direct",
      directFinalVowelQuantity: "short"
    }), Object.freeze({
      sourceStem: "tlehcō",
      route: "replacive"
    }), Object.freeze({
      sourceStem: "panō",
      route: "replacive"
    })]);
    const CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES = Object.freeze([Object.freeze({
      // §33.8 retains hui in this attested causative. §25.1 permits a
      // hypothetical internal basis; ordinary hua → tiā realizes the suffix.
      derivationLicenseId: "cn-l33-338-ciyahui-internal-hua-basis",
      sourceStem: "ciya-hui", sourceClass: "B", sourceValence: "intransitive",
      minimumSourceObjectCount: 0, maximumSourceObjectCount: 0,
      bridgeBaseOperation: "lengthen-final-i", bridgeSuffixFamily: "hua",
      lesson20PrerequisitePolicy: "internal-only", targetClass: "C",
      ruleId: "cn-l33-338-ciyahui-internal-hua-basis",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.1", formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2", "33.8"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-ciyahui-retained-hua-internal-base",
      citationBridgeHypothetical: true,
    }), Object.freeze({
      // The neutral cui has short i; §33.8 attests a long-i lō operand
      // distinct from its existing hua route. Replace only ō with ordinary tiā.
      derivationLicenseId: "cn-l33-338-cui-internal-lo-basis",
      sourceStem: "cui", sourceClass: "A", sourceValence: "specific-projective",
      minimumSourceObjectCount: 1, maximumSourceObjectCount: 1,
      bridgeBaseOperation: "lengthen-final-i", bridgeSuffixFamily: "lō",
      lesson20PrerequisitePolicy: "internal-only", targetClass: "C",
      ruleId: "cn-l33-338-cui-internal-lo-basis",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.1", formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2", "33.8"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-cui-long-i-lo-internal-base",
      citationBridgeHypothetical: true,
    }), Object.freeze({
      // §33.2 attests this causative; §25.1 allows its hypothetical
      // internal nonactive basis. Replace a with i, apply §25.2 quantity,
      // then let the shared hua → tiā operation derive the causative.
      derivationLicenseId: "cn-l33-332-ehua-internal-hua-basis",
      sourceStem: "ē-hua", sourceClass: "A", sourceValence: "intransitive",
      minimumSourceObjectCount: 0, maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-a-with-i", bridgeSuffixFamily: "hua",
      lesson20PrerequisitePolicy: "internal-only", targetClass: "C",
      ruleId: "cn-l33-332-ehua-internal-hua-basis",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.2", formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2", "33.2"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-documented-ehua-internal-hua-base",
      citationBridgeHypothetical: true,
    }), Object.freeze({
      // §33.2 documents short huetzi in the causative base. Preserve that
      // exceptional internal allomorph; this is not a general tzi rule
      // and does not alter the independently issued Lesson 20 inventory.
      derivationLicenseId: "cn-l33-332-huetzi-short-internal-hua-basis",
      sourceStem: "huetzi", sourceClass: "B", sourceValence: "intransitive",
      minimumSourceObjectCount: 0, maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source", bridgeSuffixFamily: "hua",
      lesson20PrerequisitePolicy: "internal-only", targetClass: "C",
      ruleId: "cn-l33-332-huetzi-short-internal-hua-basis",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "33.2", formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2", "33.2"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-documented-short-huetzi-internal-hua-base",
      citationBridgeHypothetical: true,
    }), Object.freeze({
      // §21.4 attests nemītia. §25.1 permits an internal nonactive basis
      // different from the independently attested Lesson 20 formation.
      // Issue nemī-hua as that basis; the shared hua → tiā operation derives
      // the causative. This does not alter ordinary nem-o-hua or nen-tiā.
      derivationLicenseId: "cn-l21-214-nemi-internal-hua-basis",
      sourceStem: "nemi",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "lengthen-final-i",
      bridgeSuffixFamily: "hua",
      lesson20PrerequisitePolicy: "internal-only",
      targetClass: "C",
      ruleId: "cn-l21-214-nemi-internal-hua-basis",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.2",
      formationLesson: "25",
      evidenceSections: Object.freeze(["21.4", "25.1", "25.2"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-attested-nemi-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-2515-cui-cuitia",
      sourceStem: "cui",
      sourceClass: "A",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "lengthen-final-i",
      bridgeSuffixFamily: "hua",
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-2515-cui-cuitia-surface",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.15",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-exact-cui-hua-license"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-mahui-mauh-tia",
      sourceStem: "mahui",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "delete-final-i",
      bridgeSuffixFamily: "o-hua",
      blockedLesson20SuffixFamilies: Object.freeze(["hua"]),
      targetClass: "C",
      ruleId: "cn-l25-253-mahui-mauh-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.3",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.3", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-o-hua-w-to-uh-exact"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-tomi-tom-tia",
      sourceStem: "tomi",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "delete-final-i",
      bridgeSuffixFamily: "o-hua",
      classBFinalMToNBoundaryPolicy: "preserve-m",
      blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "lō"]),
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-253-tomi-tom-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.3",
      formationLesson: "25",
      evidenceSections: Object.freeze([
        "24.8.3",
        "25.1",
        "25.3",
        "25.9",
        "25.10",
      ]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-tom-o-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-quiza-quix-tia",
      sourceStem: "quīza",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-za-with-x",
      bridgeSuffixFamily: "o-hua",
      blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "lō"]),
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-253-quiza-quix-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.3",
      formationLesson: "25",
      evidenceSections: Object.freeze([
        "25.1",
        "25.3",
        "25.9",
        "25.10",
      ]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-quix-o-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-25113-piya-piya-l-tia",
      sourceStem: "piya",
      sourceClass: "B",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "mainline-reflexive",
        "shuntline-reflexive",
        "human-reciprocal",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      blockedLesson20SuffixFamilies: Object.freeze(["hua", "ō", "o-hua"]),
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-25113-piya-piya-l-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.11.3.b",
      formationLesson: "25",
      evidenceSections: Object.freeze([
        "25.1",
        "25.4",
        "25.9",
        "25.11",
        "25.11.3.b",
      ]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-piya-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-quemi-quen-tia",
      sourceStem: "quēmi",
      sourceClass: "B",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "delete-final-i",
      bridgeSuffixFamily: "o-hua",
      targetClass: "C",
      ruleId: "cn-l25-253-quemi-quen-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.3",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.3", "25.11", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-o-hua-m-to-n-exact"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-quemi-quemi-l-tia",
      sourceStem: "quēmi",
      sourceClass: "B",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "mainline-reflexive",
        "shuntline-reflexive",
        "human-reciprocal",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-quemi-quemi-l-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-quemi-lo-internal-base"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-long-chihua-lo-to-l-tia",
      sourceStem: "chīhua",
      sourceClass: "B",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal", "multiple-object"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 2,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-254-long-chihua-lo-to-l-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-exact-long-chihua-lo-license"
    }), Object.freeze({
      derivationLicenseId: "cn-l26-2623-nequi-nequi-l-tia",
      sourceStem: "nequi",
      sourceClass: "B",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l26-2623-nequi-nequi-l-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "26.23",
      formationLesson: "26",
      evidenceSections: Object.freeze(["25.1", "25.4", "26.23"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-exact-nequi-lo-license",
      causativeCitationRole: "tē+tla"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-258-huaqui-huaquiltia",
      sourceStem: "huā-qui",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      blockedLesson20SuffixFamilies: Object.freeze(["o-hua"]),
      targetClass: "C",
      ruleId: "cn-l25-258-huaqui-huaquiltia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.8",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.4", "25.8", "25.9"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-exact-huaqui-lo-license",
      causativeCitationRole: "tla"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-mati-mach-tia",
      sourceStem: "mati",
      sourceClass: "B",
      sourceValence: "intransitive",
      sourceValences: Object.freeze(["intransitive"]),
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ti-with-ch",
      bridgeSuffixFamily: "ō",
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-253-mati-mach-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.3",
      formationLesson: "25",
      evidenceSections: Object.freeze([
        "25.1",
        "25.3",
        "25.9",
        "25.11",
        "25.13",
      ]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-mach-o-internal-base",
      causativeCitationRole: "tē",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-mati-machi-tia",
      sourceStem: "mati",
      sourceClass: "B",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "mainline-reflexive",
        "shuntline-reflexive",
        "human-reciprocal",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-ti-with-chi",
      bridgeSuffixFamily: "hua",
      targetClass: "C",
      ruleId: "cn-l25-252-mati-machi-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.2.3",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2.3", "25.9"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-machi-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-2524-mixihui-mixihuitia",
      sourceStem: "mīx-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "hua",
      blockedLesson20SuffixFamilies: Object.freeze(["o-hua"]),
      targetClass: "C",
      ruleId: "cn-l25-2524-mixihui-mixihuitia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.2.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute:
        "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
      causativeCitationRole: "tē",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-2524-tlatzihui-tlatzihuitia",
      sourceStem: "tlatz-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "hua",
      blockedLesson20SuffixFamilies: Object.freeze(["o-hua"]),
      targetClass: "C",
      ruleId: "cn-l25-2524-tlatzihui-tlatzihuitia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.2.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute:
        "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
      causativeCitationRole: "m-o",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-2524-polihui-polihuitia",
      sourceStem: "pol-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "hua",
      blockedLesson20SuffixFamilies: Object.freeze(["o-hua"]),
      targetClass: "C",
      ruleId: "cn-l25-2524-polihui-polihuitia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.2.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute:
        "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
      causativeCitationRole: "m-o",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-2524-pachihui-pachihuitia",
      sourceStem: "pach-i-hui",
      sourceLexemeIds: Object.freeze([
        "cn-vnc-pachihui-satiated",
      ]),
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "hua",
      blockedLesson20SuffixFamilies: Object.freeze(["o-hua"]),
      targetClass: "C",
      ruleId: "cn-l25-2524-pachihui-pachihuitia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.2.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute:
        "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
      causativeCitationRole: "tē",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-2524-ihcihui-ihcihuitia",
      sourceStem: "ihc-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "hua",
      blockedLesson20SuffixFamilies: Object.freeze(["o-hua"]),
      targetClass: "C",
      ruleId: "cn-l25-2524-ihcihui-ihcihuitia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.2.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute:
        "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
      causativeCitationRole: "tē~tla",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-mati-machi-l-tia",
      sourceStem: "mati",
      sourceClass: "B",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "mainline-reflexive",
        "shuntline-reflexive",
        "human-reciprocal",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-ti-with-chi",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-mati-machi-l-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.4.6",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.4.6", "25.9"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-machi-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-itzti-itzti-l-tia",
      sourceStem: "itz-ti",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-itzti-itzti-l-tia",
      andrewsSection: "25.4.7",
      evidenceSections: Object.freeze(["25.1", "25.4.7", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-itzti-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-cochi-cochi-tia",
      sourceStem: "cochi",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "hua",
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-252-cochi-cochi-tia",
      andrewsSection: "25.2",
      evidenceSections: Object.freeze(["25.1", "25.2", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-cochi-hua-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-itqui-itqui-tia",
      sourceStem: "itqui",
      sourceClass: "A",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-nonhuman",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "hua",
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-252-itqui-itqui-tia",
      andrewsSection: "25.2",
      evidenceSections: Object.freeze(["25.1", "25.2", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-itqui-hua-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-caqui-caqui-tia",
      sourceStem: "caqui",
      sourceClass: "B",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "mainline-reflexive",
        "shuntline-reflexive",
        "human-reciprocal",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "hua",
      targetClass: "C",
      ruleId: "cn-l25-252-caqui-caqui-tia",
      andrewsSection: "25.2.1",
      evidenceSections: Object.freeze(["25.1", "25.2.1", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-caqui-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-caqui-caqui-l-tia",
      sourceStem: "caqui",
      sourceClass: "B",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "mainline-reflexive",
        "shuntline-reflexive",
        "human-reciprocal",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-caqui-caqui-l-tia",
      andrewsSection: "25.4.1",
      evidenceSections: Object.freeze(["25.1", "25.4.1", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-caqui-lo-internal-base",
    }), Object.freeze({
      // §26.6 supplies the attested pāca-l-tiā Source. Together with
      // §25.4.1 this licenses a preserved-ka internal lō basis, without
      // asserting independent attestation of a basal pāca-lō verb.
      derivationLicenseId: "cn-l26-266-paca-preserved-ka-lo-basis",
      sourceStem: "pāca",
      sourceClass: "A",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      lesson20PrerequisitePolicy: "internal-only",
      targetClass: "C",
      ruleId: "cn-l26-266-paca-preserved-ka-lo-basis",
      andrewsSection: "25.4.1",
      evidenceSections: Object.freeze(["25.1", "25.4.1", "26.6"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-paca-preserved-ka-lo-internal-base",
    }), Object.freeze({
      // §33.6 attests the cuepi member of this stem's causal formation.
      // Construct its internal lō operand and apply ordinary ō > tiā;
      // this does not assert an independently usable cuepi-lō verb.
      derivationLicenseId: "cn-l33-336-cuepa-cuepi-lo-basis",
      sourceStem: "cuepa",
      sourceClass: "B",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-a-with-i",
      bridgeSuffixFamily: "lō",
      lesson20PrerequisitePolicy: "internal-only",
      targetClass: "C",
      ruleId: "cn-l33-336-cuepa-cuepi-lo-basis",
      andrewsSection: "33.6",
      evidenceSections: Object.freeze(["25.1", "25.4", "33.6"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-cuepi-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-choca-choqui-tia",
      sourceStem: "chōca",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ca-with-qui",
      bridgeSuffixFamily: "hua",
      targetClass: "C",
      ruleId: "cn-l25-252-choca-choqui-tia",
      andrewsSection: "25.2.1",
      evidenceSections: Object.freeze(["25.1", "25.2.1", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-choqui-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-choca-choca-l-tia",
      sourceStem: "chōca",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-choca-choca-l-tia",
      andrewsSection: "25.4.1",
      evidenceSections: Object.freeze(["25.1", "25.4.1", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-choca-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-choca-choqui-l-tia",
      sourceStem: "chōca",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ca-with-qui",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-choca-choqui-l-tia",
      andrewsSection: "25.4.1",
      evidenceSections: Object.freeze(["25.1", "25.4.1", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-choqui-lo-internal-base",
    }), Object.freeze({
      // §27.5.2 attests a rare lexical lō basis, not a productive tz-ca rule.
      // The ordinary type-two operations still construct qui + l + tiā.
      derivationLicenseId: "cn-l27-275-pipitzca-pipitzqui-l-tia",
      sourceStem: "pi-pi-tz-ca",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ca-with-qui",
      bridgeSuffixFamily: "lō",
      lesson20PrerequisitePolicy: "internal-only",
      targetClass: "C",
      ruleId: "cn-l27-275-pipitzca-pipitzqui-l-tia",
      andrewsSection: "27.5.2",
      evidenceSections: Object.freeze(["25.4", "27.5.2"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-pipitzqui-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-cualani-cualani-l-tia",
      sourceStem: "cual-ā-ni",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-cualani-cualani-l-tia",
      andrewsSection: "25.4.2",
      evidenceSections: Object.freeze(["25.1", "25.4.2", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-cualani-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-cualani-cualana-l-tia",
      sourceStem: "cual-ā-ni",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ni-with-na",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-cualani-cualana-l-tia",
      andrewsSection: "25.4.2",
      evidenceSections: Object.freeze(["25.1", "25.4.2", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-cualana-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-cualani-cualan-tia",
      sourceStem: "cual-ā-ni",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ni-with-n",
      bridgeSuffixFamily: "ō",
      lesson20PrerequisitePolicy: "independent-lesson20",
      blockedLesson20SuffixFamilies: Object.freeze(["hua", "o-hua"]),
      targetClass: "C",
      ruleId: "cn-l25-253-cualani-cualan-tia",
      andrewsSection: "25.3",
      evidenceSections: Object.freeze(["25.1", "25.3", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-cualan-o-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-huetzca-huetzqui-tia",
      sourceStem: "hue-tz-ca",
      sourceClass: "A",
      sourceValences: Object.freeze([
        "intransitive",
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "mainline-reflexive",
        "shuntline-reflexive",
        "human-reciprocal",
      ]),
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-ca-with-quī",
      bridgeSuffixFamily: "hua",
      targetClass: "C",
      ruleId: "cn-l25-252-huetzca-huetzqui-tia",
      andrewsSection: "25.2.4",
      evidenceSections: Object.freeze(["25.1", "25.2.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-huetzqui-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-ihza-ihxi-tia",
      targetInitialIKind: "real",
      sourceStem: "ihza",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-za-with-xi",
      bridgeSuffixFamily: "hua",
      targetClass: "C",
      ruleId: "cn-l25-252-ihza-ihxi-tia",
      andrewsSection: "25.2.2",
      evidenceSections: Object.freeze(["25.1", "25.2.2", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-ihxi-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-ihza-ihxi-l-tia",
      sourceStem: "ihza",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-za-with-xi",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-ihza-ihxi-l-tia",
      andrewsSection: "25.4.4",
      evidenceSections: Object.freeze(["25.1", "25.4.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-ihxi-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-imacaci-imacaxi-l-tia",
      sourceStem: "īmacaci",
      sourceClass: "B",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-ci-with-xi",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-imacaci-imacaxi-l-tia",
      andrewsSection: "25.4.4",
      evidenceSections: Object.freeze(["25.1", "25.4.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-imacaxi-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-iucci-iucxi-tia",
      sourceStem: "iuc-ci",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ci-with-xi",
      bridgeSuffixFamily: "hua",
      targetClass: "C",
      ruleId: "cn-l25-252-iucci-iucxi-tia",
      andrewsSection: "25.2.2",
      evidenceSections: Object.freeze(["25.1", "25.2.2", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-iucxi-hua-internal-base",
      causativeCitationRole: "tla",
      implicitAgentObjectKind: "nonspecific-nonhuman",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-itta-itti-tia",
      sourceStem: "itt-a",
      sourceClass: "A",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-a-with-i",
      bridgeSuffixFamily: "hua",
      bridgeFinalIQuantityOverride:
        "long-apparent-geminate-single-phone",
      targetClass: "C",
      ruleId: "cn-l25-252-itta-itti-tia",
      andrewsSection: "25.2.3",
      evidenceSections: Object.freeze(["25.1", "25.2.3", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-itti-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-itta-itta-l-tia",
      sourceStem: "itt-a",
      sourceClass: "A",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-254-itta-itta-l-tia",
      andrewsSection: "25.4",
      evidenceSections: Object.freeze(["25.1", "25.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-itta-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-ixtlahua-ixtlahua-l-tia",
      sourceStem: "ix-tlā-hu-a",
      sourceClass: "B",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-ixtlahua-ixtlahua-l-tia",
      andrewsSection: "25.4.5",
      evidenceSections: Object.freeze(["25.1", "25.4.5", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-ixtlahua-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-ixtlahua-ixtlahui-l-tia",
      sourceStem: "ix-tlā-hu-a",
      sourceClass: "B",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-a-with-i",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-ixtlahua-ixtlahui-l-tia",
      andrewsSection: "25.4.5",
      evidenceSections: Object.freeze(["25.1", "25.4.5", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-ixtlahui-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-maca-maqui-l-tia",
      sourceStem: "maca",
      sourceClass: "A",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "multiple-object",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 2,
      bridgeBaseOperation: "replace-final-ca-with-qui",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-maca-maqui-l-tia",
      andrewsSection: "25.4.1",
      evidenceSections: Object.freeze(["25.1", "25.4.1", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-maqui-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-252-neci-nexi-tia",
      sourceStem: "nēci",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ci-with-xi",
      bridgeSuffixFamily: "hua",
      targetClass: "C",
      ruleId: "cn-l25-252-neci-nexi-tia",
      andrewsSection: "25.2.2",
      evidenceSections: Object.freeze(["25.1", "25.2.2", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-nexi-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-neci-nex-tia",
      sourceStem: "nēci",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "replace-final-ci-with-x",
      bridgeSuffixFamily: "o-hua",
      lesson20PrerequisitePolicy: "independent-lesson20",
      targetClass: "C",
      ruleId: "cn-l25-253-neci-nex-tia",
      andrewsSection: "25.3",
      evidenceSections: Object.freeze(["25.1", "25.3", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-nex-o-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-ono-ono-l-tia",
      sourceStem: "on-o",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-ono-ono-l-tia",
      andrewsSection: "25.6",
      evidenceSections: Object.freeze(["25.1", "25.6", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-ono-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-tlaocoya-tlaoco-l-tia",
      sourceStem: "tlaōco-ya",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "delete-final-ya",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-tlaocoya-tlaoco-l-tia",
      andrewsSection: "25.4.8",
      evidenceSections: Object.freeze(["25.1", "25.4.8", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-root-plus-ya-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-ahuiya-ahui-l-tia",
      sourceStem: "āhui-ya",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "delete-final-ya",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-ahuiya-ahui-l-tia",
      andrewsSection: "25.4.8",
      evidenceSections: Object.freeze(["25.1", "25.4.8", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-root-plus-ya-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-ahuiya-ahuiya-l-tia",
      sourceStem: "āhui-ya",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-ahuiya-ahuiya-l-tia",
      andrewsSection: "25.4.8",
      evidenceSections: Object.freeze(["25.1", "25.4.8", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-retained-ya-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-256-pano-pano-l-tia",
      sourceStem: "panō",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-256-pano-pano-l-tia",
      andrewsSection: "25.6",
      evidenceSections: Object.freeze(["25.1", "25.6", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-pano-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-256-tlehco-tlehco-l-tia",
      sourceStem: "tlehcō",
      sourceClass: "A",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "preserve-source",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-256-tlehco-tlehco-l-tia",
      andrewsSection: "25.6",
      evidenceSections: Object.freeze(["25.1", "25.6", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-tlehco-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-tzacua-tzacui-l-tia",
      sourceStem: "tzacu-a",
      sourceClass: "B",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-a-with-i",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-tzacua-tzacui-l-tia",
      andrewsSection: "25.4.3",
      evidenceSections: Object.freeze(["25.1", "25.4.3", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-tzacui-lo-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-choloa-cholo-l-tia",
      sourceStem: "chol-o-ā",
      sourceClass: "C",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "delete-final-a",
      bridgeSuffixFamily: "lō",
      targetClass: "C",
      ruleId: "cn-l25-254-choloa-cholo-l-tia",
      andrewsSection: "25.4",
      evidenceSections: Object.freeze(["25.1", "25.4", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-class-c-lo-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l25-258-temi-temi-tia",
      sourceStem: "tēmi",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      bridgeBaseOperation: "lengthen-final-i",
      bridgeSuffixFamily: "hua",
      targetClass: "C",
      ruleId: "cn-l25-258-temi-temi-tia",
      andrewsSection: "25.8",
      evidenceSections: Object.freeze(["25.1", "25.2", "25.8", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-temi-hua-internal-base",
    }), Object.freeze({
      derivationLicenseId: "cn-l26-2623-nequi-nec-tia-causative",
      sourceStem: "nequi",
      sourceClass: "B",
      sourceValences: Object.freeze([
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
      ]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      bridgeBaseOperation: "replace-final-qui-with-c",
      bridgeSuffixFamily: "ō",
      targetClass: "C",
      ruleId: "cn-l26-2623-nequi-nec-tia-causative",
      andrewsSection: "26.23",
      evidenceSections: Object.freeze(["25.1", "25.3", "26.11", "26.23"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-nec-o-internal-base",
      causativeCitationRole: "tē+tla",
    })]);
    const CLASSICAL_NAHUATL_CAUSATIVE_PARALLEL_FORMATION_LEXICAL_RELATIONS =
      Object.freeze([
        Object.freeze({
          relationId: "cn-l25-258-huaqui-parallel-causatives",
          sourceStem: "huā-qui",
          sourceClasses: Object.freeze(["B"]),
          typeOneRuleId: "cn-l24-2431a-huaqui-huatza",
          typeTwoRuleId: "cn-l25-258-huaqui-huaquiltia",
          meaningRelation: "same-meaning",
          typeOneSemanticRole: "causative-in-meaning",
          typeTwoSemanticRole: "causative-in-meaning",
          lexicalFactsReadOnly: true,
          userSelectable: false,
          operationSelectionAuthority: false,
          translationAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          lessonMetadataAuthority: false,
          andrewsSection: "25.8",
        }),
        Object.freeze({
          relationId: "cn-l25-258-temi-parallel-causatives",
          sourceStem: "tēmi",
          sourceClasses: Object.freeze(["B"]),
          typeOneRuleId: "cn-l24-2431a-temi-tem-a",
          typeTwoRuleId: "cn-l25-258-temi-temi-tia",
          meaningRelation: "different-meaning",
          typeOneSemanticRole: "placement-causative-in-meaning",
          typeTwoSemanticRole: "filling-causative-in-meaning",
          lexicalFactsReadOnly: true,
          userSelectable: false,
          operationSelectionAuthority: false,
          translationAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          lessonMetadataAuthority: false,
          andrewsSection: "25.8",
        }),
        Object.freeze({
          relationId: "cn-l25-258-pinahua-parallel-formations",
          sourceStem: "pīn-ā-hua",
          sourceClasses: Object.freeze(["A", "B"]),
          typeOneRuleId: "cn-l25-258-pinahua-pinahua-type-one",
          typeTwoRuleId: "cn-l25-258-pinahua-pinauhtia-type-two",
          meaningRelation: "different-meaning",
          typeOneSemanticRole: "applicative-in-meaning",
          typeTwoSemanticRole: "causative-in-meaning",
          lexicalFactsReadOnly: true,
          userSelectable: false,
          operationSelectionAuthority: false,
          translationAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          lessonMetadataAuthority: false,
          andrewsSection: "25.8",
        }),
      ]);
    const CLASSICAL_NAHUATL_APPLICATIVE_FINAL_TL_TO_T_EXACT_LICENSES = Object.freeze([Object.freeze({
      derivationLicenseId: "cn-l26-267-patla-pa-ti-lia",
      sourceStem: "pa-tla",
      sourceClass: "A",
      sourceValence: "specific-projective",
      sourceObjectCount: 1,
      targetStem: "pa-ti-liā",
      ruleId: "cn-l26-267-patla-pa-ti-lia",
      andrewsSection: "26.7",
      exactWitness: "tla-(pa-tla) > tē+tla-(pa-ti-liā)",
      evidenceSections: Object.freeze(["26.7", "26.14", "26.23"])
    }), Object.freeze({
      derivationLicenseId: "cn-l26-267-tlazohtla-tlazohti-lia",
      sourceStem: "tla-zo-h-tla",
      sourceClass: "A",
      sourceValence: "specific-projective",
      sourceObjectCount: 1,
      targetStem: "tla-zo-h-ti-liā",
      ruleId: "cn-l26-267-tlazohtla-tlazohti-lia",
      andrewsSection: "26.7",
      exactWitness: "tē-(tla-zo-h-tla) > tē+tē-(tla-zo-h-ti-liā)",
      evidenceSections: Object.freeze(["26.7", "26.14", "26.23"])
    })]);
    const CLASSICAL_NAHUATL_APPLICATIVE_EXACT_FORMATIONS = Object.freeze([
      {
        sourceAliases: ["chihcha"], sourceClasses: ["A"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        targetClass: "A", sourceAttestedObjectRuleId: "cn-l42-4285-chihcha-formally-unjustified-object",
        derivationSubtype: "source-attested-object", derivationRoute: "source-attested-formally-unjustified-object",
        procedure: "preserve-ordinary-source-stem-and-retain-attested-object", ruleId: "cn-l42-4285-chihcha-formally-unjustified-object",
        andrewsSection: "42.8.5", evidenceSections: Object.freeze(["20.2.1", "26.1", "26.7", "42.8.5"]),
        productivityStatus: "source-attestation-only", lexicalChoiceRequired: true,
        targetConstruction: Object.freeze({operation: "identity-stem-with-valence-increase"}),
      },
      {
        sourceAliases: ["maca"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "maca", unmarkedTargetStem: "maca", targetClass: "A",
        derivationSubtype: "inherent-applicative", derivationRoute: "inherent-applicative-valence-import",
        procedure: "preserve-inherently-applicative-stem-and-import-object", ruleId: "cn-l26-2611-inherent-maca",
        andrewsSection: "26.1.1", targetConstruction: { operation: "identity-stem-with-valence-increase" }
      },
      {
        sourceAliases: ["itzi"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "itt-a", unmarkedTargetStem: "itt-a", targetClass: "A",
        derivationSubtype: "irregular-applicative", derivationRoute: "irregular-applicative-itzi-to-itta",
        procedure: "replace-affricate-release-and-add-irregular-applicative-a", ruleId: "cn-l26-2612-itzi-itta",
        andrewsSection: "26.1.2", suppressGenericTypeOne: true,
        sourceDefective: true,
        sourceMeaning: "be-alert-or-observant",
        geminateStatus: "unique-not-normal-morphology",
        phonologicalShift: {
          operation: "replace-release-feature",
          sourceFeature: "sibilant-release",
          targetFeature: "stop-release",
          resultingPhone: "t",
          writtenManifestation: "tt"
        },
        targetConstruction: { operation: "replace-final-tzi", remove: "tzi", add: "tt-a" }
      },
      {
        sourceAliases: ["itzi"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "itzi", unmarkedTargetStem: "itzi", targetClass: "B",
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "valence-neutral-applicative-identity",
        procedure: "preserve-valence-neutral-stem-and-import-object", ruleId: "cn-l26-2612-itzi-valence-neutral",
        andrewsSection: "26.1.2", suppressGenericTypeOne: true,
        targetConstruction: { operation: "identity-stem-with-valence-increase" }
      },
      ...[
        ["huetzca", "A", "hue-tz-ca", "hue-tz-ca", "cn-l26-2613-huetzca"],
        ["mayāna", "A", "mayāna", "mayana", "cn-l26-2613-mayana"],
        ["āmiqui", "B", "ā-miqui", "a-miqui", "cn-l26-2613-amiqui"],
        ["tēmiqui", "B", "tēmiqui", "temiqui", "cn-l26-2613-temiqui"],
        ["teohcihui", "B", "teo-hc-i-hui", "teo-hc-i-hui", "cn-l26-2613-teohcihui"],
        ["nenehcihui", "B", "nene-hc-i-hui", "nene-hc-i-hui", "cn-l26-2613-nenehcihui"]
      ].map(([sourceStem, sourceClass, markedTargetStem, unmarkedTargetStem, ruleId]) => ({
        sourceAliases: [
          sourceStem,
          sourceStem.replace(/[āēīō]/gu, vowel => ({ ā: "a", ē: "e", ī: "i", ō: "o" })[vowel]),
          ...(sourceStem === "huetzca" ? ["huētzca"] : [])
        ],
        sourceClasses: [sourceClass], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem, unmarkedTargetStem, targetClass: sourceClass,
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "valence-neutral-applicative-identity",
        procedure: "preserve-valence-neutral-stem-and-import-object", ruleId, andrewsSection: "26.1.3",
        suppressGenericTypeOne: true, targetConstruction: { operation: "identity-stem-with-valence-increase" }
      })),
      {
        sourceAliases: ["ixca"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "ixqu-iā", unmarkedTargetStem: "ixqu-ia", targetClass: "C",
        derivationSubtype: "type-one", derivationRoute: "type-one-final-ca-to-qu-ia-exact",
        procedure: "replace-final-ca-with-qu-and-add-ia", ruleId: "cn-l26-262-ixca-ixquia",
        andrewsSection: "26.2", suppressGenericTypeOne: true,
        targetConstruction: { operation: "replace-final", remove: "ca", add: "qu-iā" }
      },
      {
        sourceAliases: ["ohquetza", "oh-quetza"], sourceClasses: ["A"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "oh-quech-iā", unmarkedTargetStem: "oh-quech-ia", targetClass: "C",
        derivationSubtype: "type-one", derivationRoute: "type-one-final-tza-to-ch-ia-exact",
        procedure: "replace-final-tza-with-ch-and-add-ia", ruleId: "cn-l26-262-ohquetza-ohquechia",
        andrewsSection: "26.2", suppressGenericTypeOne: true,
        targetConstruction: { operation: "replace-final", remove: "tza", add: "ch-iā" }
      },
      {
        sourceAliases: ["tlatzihui", "tlatz-i-hui"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "tlatz-i-l-huiā", unmarkedTargetStem: "tlatz-i-l-huia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-irregular-final-hui-to-i-l-huia-exact",
        procedure: "replace-final-hui-with-i-l-huia", ruleId: "cn-l26-264-tlatzihui-irregular-huia",
        andrewsSection: "26.4", targetConstruction: { operation: "replace-final", remove: "hui", add: "i-l-huiā", irregular: true,
          presupposedSourceShape: "transitive-o-ā", presupposedSourceAttested: false, presuppositionControlsSourceValence: false }
      },
      {
        sourceAliases: ["huetzi"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "huechi-liā", unmarkedTargetStem: "huechi-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-final-tzi-to-chi-lia-exact",
        procedure: "replace-final-tzi-with-chi-and-append-lia", ruleId: "cn-l26-264-huetzi-huechilia",
        andrewsSection: "26.4", targetConstruction: { operation: "replace-and-append", remove: "tzi", add: "chi-liā" }
      },
      {
        sourceAliases: ["mati"], sourceClasses: ["B"], transitiveOnly: true,
        markedTargetStem: "machi-liā", unmarkedTargetStem: "machi-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-final-ti-to-chi-lia-exact",
        procedure: "replace-final-ti-with-chi-and-append-lia", ruleId: "cn-l26-264-mati-machilia",
        andrewsSection: "26.4", targetConstruction: { operation: "replace-and-append", remove: "ti", add: "chi-liā" }
      },
      {
        sourceAliases: ["ōya", "oya"], sourceClasses: ["B"], transitiveOnly: true,
        markedTargetStem: "ōyi-liā", unmarkedTargetStem: "oyi-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-final-oya-to-oyi-lia-exact",
        procedure: "replace-final-a-with-i-and-append-lia", ruleId: "cn-l26-267-oya-oyilia",
        andrewsSection: "26.7", targetConstruction: { operation: "replace-and-append", remove: "a", add: "i-liā" }
      },
      {
        sourceAliases: ["yōcoya", "yōco-ya", "yocoya", "yoco-ya"], sourceClasses: ["B"], transitiveOnly: true,
        markedTargetStem: "yōco-liā", unmarkedTargetStem: "yōco-liā", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-transitive-valence-neutral-oya-delete-ya-exact",
        procedure: "delete-final-ya-from-valence-neutral-root-plus-ya-and-add-lia", ruleId: "cn-l26-2684-yocoya-yocolia",
        andrewsSection: "26.8.4", targetConstruction: { operation: "replace-final", remove: "ya", add: "liā" }
      },
      {
        sourceAliases: ["ihtoā", "iht-o-ā", "ihtoa", "iht-o-a"], sourceClasses: ["C"], transitiveOnly: true,
        markedTargetStem: "il-huiā", unmarkedTargetStem: "il-huia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-suppletive-ihtoa-to-il-huia-exact",
        procedure: "select-suppletive-il-base-and-add-huia", ruleId: "cn-l26-2691-ihtoa-ilhuia",
        formationRuleTier: "suppletive-lexical-rule", productivityStatus: "genuine-suppletive-exception",
        andrewsSection: "26.9.1", targetConstruction: { operation: "suppletive-base", sourceBase: "iht", targetBase: "il", add: "huiā" }
      },
      {
        sourceAliases: ["tēm-o-ā", "tem-o-a", "tēmoā", "temoa"], sourceClasses: ["C"], transitiveOnly: true,
        markedTargetStem: "tēm-o-liā", unmarkedTargetStem: "tem-o-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-exceptional-final-o-a-to-o-lia",
        procedure: "replace-final-a-with-exceptional-lia", ruleId: "cn-l26-2694-temoa-temolia-exception",
        andrewsSection: "26.9.4", suppressGenericFinalOa: true,
        formationRuleTier: "exceptional-lexical-rule", productivityStatus: "genuine-lexical-exception",
        targetConstruction: { operation: "replace-final", remove: "a", add: "liā" }
      },
      {
        sourceAliases: ["namaca"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "namaqui-l-tiā", unmarkedTargetStem: "namaqui-l-tia", targetClass: "C",
        derivationSubtype: "type-three", derivationRoute: "type-three-applicative-from-lo-nonactive-exact",
        procedure: "derive-lo-nonactive-then-replace-o-with-tia", ruleId: "cn-l26-2611-namaca-namaquiltia",
        andrewsSection: "26.11", citationBridgeHypothetical: true, targetConstruction: { operation: "typed-nonactive-bridge", nonactiveStem: "namaquī-lo", remove: "o", add: "tiā" }
      },
      {
        sourceAliases: ["nequi"], sourceClasses: ["B"], transitiveOnly: true,
        markedTargetStem: "nec-tiā", unmarkedTargetStem: "nec-tia", targetClass: "C",
        derivationSubtype: "type-three", derivationRoute: "type-three-applicative-from-o-nonactive-exact",
        procedure: "derive-o-nonactive-then-replace-o-with-tia", ruleId: "cn-l26-2611-nequi-nectia",
        andrewsSection: "26.11", targetConstruction: { operation: "typed-nonactive-bridge", nonactiveStem: "nec-ō", remove: "ō", add: "tiā" }
      },
      {
        sourceAliases: ["nequi"], sourceClasses: ["B"],
        sourceValences: ["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"],
        sourceObjectCount: 1,
        markedTargetStem: "nequi-l-tiā", unmarkedTargetStem: "nequi-l-tia", targetClass: "C",
        derivationSubtype: "type-three", derivationRoute: "type-three-applicative-from-exact-nequi-lo-prerequisite",
        procedure: "consume-exact-nequi-lo-prerequisite-and-replace-o-with-tia", ruleId: "cn-l26-2623-nequi-nequiltia-applicative",
        andrewsSection: "26.23",
        internalNonactivePrerequisiteLicenseId: "cn-l26-2623-nequi-nequi-l-tia",
        targetConstruction: { operation: "typed-nonactive-bridge", nonactiveStem: "nequi-lō", remove: "ō", add: "tiā" }
      },
      {
        sourceAliases: ["cōhua", "cohua"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "cōhui-liā", unmarkedTargetStem: "cohui-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-parallel-final-hua-to-hui-lia-exact",
        procedure: "replace-final-a-with-i-and-append-lia", ruleId: "cn-l26-2612-cohua-cohuilia",
        andrewsSection: "26.12", targetConstruction: { operation: "replace-and-append", remove: "a", add: "i-liā" }
      },
      {
        sourceAliases: ["chīhua", "chihua"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "chīhui-liā", unmarkedTargetStem: "chihui-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-parallel-final-hua-to-hui-lia-exact",
        procedure: "replace-final-a-with-i-and-append-lia", ruleId: "cn-l26-2612-chihua-chihuilia",
        andrewsSection: "26.12", targetConstruction: { operation: "replace-and-append", remove: "a", add: "i-liā" }
      },
      {
        sourceAliases: ["tla-hua-hua-l-o-ā", "tlahuahualoā", "tla-hua-hua-l-o-a", "tlahuahualoa"], sourceClasses: ["C"], transitiveOnly: true,
        markedTargetStem: "hua-hua-l-o-ā", unmarkedTargetStem: "hua-hua-l-o-a", targetClass: "C",
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "causative-form-with-defused-tla-applicative-valence-exact",
        procedure: "move-fused-tla-to-the-object-prefix-line-and-import-applicative-object", ruleId: "cn-l26-23-huahualoa-applicative-valence",
        andrewsSection: "26.23", targetConstruction: { operation: "defuse-tla-and-increase-valence", remove: "fused-tla", addOutsideStem: "tla-object-prefix" }
      },
      {
        sourceAliases: ["tlāni", "tlani"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "tlāni", unmarkedTargetStem: "tlani", targetClass: "B",
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "object-reading-applicative-identity-exact",
        procedure: "preserve-direct-stem-and-select-applicative-reading", ruleId: "cn-l26-21-tlani-applicative-reading",
        andrewsSection: "26.21", suppressGenericTypeOne: true, targetConstruction: { operation: "identity-stem-with-valence-increase" }
      },
      {
        sourceAliases: ["nō-nōtza", "nōnōtza", "no-notza", "nonotza"], sourceClasses: ["A"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "nō-nōtza", unmarkedTargetStem: "no-notza", targetClass: "A",
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "object-reading-applicative-identity-exact",
        procedure: "preserve-direct-stem-and-select-applicative-reading", ruleId: "cn-l26-21-nonotza-applicative-reading",
        andrewsSection: "26.21", suppressGenericTypeOne: true, targetConstruction: { operation: "identity-stem-with-valence-increase" }
      }
    ].map(formation => Object.freeze({
      ...formation,
      sourceAliases: Object.freeze(formation.sourceAliases),
      sourceClasses: Object.freeze(formation.sourceClasses),
      sourceValences: formation.sourceValences ? Object.freeze(formation.sourceValences) : null,
      typedNonactivePrerequisite: formation.typedNonactivePrerequisite
        ? Object.freeze({ ...formation.typedNonactivePrerequisite })
        : null,
      targetConstruction: Object.freeze(formation.targetConstruction),
      evidenceSections: Object.freeze([formation.andrewsSection, "26.13", "26.14", "26.23"])
    })));

    function normalizeClassicalNahuatlVncDerivationToken(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlVncDerivationStem(value = "") {
      return normalizeClassicalNahuatlVncDerivationToken(value).replace(/^\((.*)\)$/u, "$1").normalize("NFC").trim();
    }
    function getClassicalNahuatlVncDerivationLexicalKey(value = "") {
      return normalizeClassicalNahuatlVncDerivationStem(value).replace(/-/gu, "");
    }
    function hasClassicalNahuatlVncDerivationLexicalKey(value = "", expected = "") {
      return Boolean(getClassicalNahuatlVncDerivationLexicalKey(value) && getClassicalNahuatlVncDerivationLexicalKey(value) === getClassicalNahuatlVncDerivationLexicalKey(expected));
    }
    function getClassicalNahuatlVncDerivationQuantityNeutralLexicalKey(
      value = "",
    ) {
      return getClassicalNahuatlVncDerivationLexicalKey(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gu, "");
    }
    function getClassicalNahuatlKarttunen1992DerivationEvidenceInventory() {
      return getSharedKarttunen1992DerivationEvidenceInventory();
    }
    function getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({ derivationType = "", sourceStem = "", targetStem = "" } = {}) {
      return getSharedKarttunen1992DerivationEvidenceMatches({
        derivationType,
        sourceStem,
        targetStem,
      });
    }
    function cloneClassicalNahuatlVncDerivationValue(value) {
      if (Array.isArray(value)) {
        return value.map(cloneClassicalNahuatlVncDerivationValue);
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneClassicalNahuatlVncDerivationValue(entry)]));
    }
    function areClassicalNahuatlVncDerivationValuesEqual(left, right) {
      if (left === right) return true;
      // Canonical proofs share subgraphs. Compare each completed object pair
      // once in this synchronous comparison, without caching owner validity or
      // retaining a positive answer across later mutations or validator calls.
      const completed = new WeakMap();
      const active = new WeakMap();
      const compare = (a, b) => {
        try {
          if (a === b) return true;
          const aObject = a !== null && typeof a === "object";
          const bObject = b !== null && typeof b === "object";
          if (!aObject && !bObject) {
            return JSON.stringify(a === undefined ? null : a)
              === JSON.stringify(b === undefined ? null : b);
          }
          if (!aObject || !bObject) return false;
          const array = Array.isArray(a);
          if (array !== Array.isArray(b) || (array && a.length !== b.length)) return false;
          if (completed.get(a)?.has(b)) return true;
          // A pending pair is a cycle, not a completed equality proof.
          if (active.get(a)?.has(b)) return false;
          if (!active.has(a)) active.set(a, new WeakSet());
          active.get(a).add(b);
          try {
            let matches = true;
            if (array) {
              for (let index = 0; index < a.length; index += 1) {
                const aDescriptor = Object.getOwnPropertyDescriptor(a, String(index));
                const bDescriptor = Object.getOwnPropertyDescriptor(b, String(index));
                if (Boolean(aDescriptor) !== Boolean(bDescriptor)) {
                  matches = false;
                  break;
                }
                if (!aDescriptor) continue;
                if (!Object.prototype.hasOwnProperty.call(aDescriptor, "value")
                  || !Object.prototype.hasOwnProperty.call(bDescriptor, "value")
                  || !compare(aDescriptor.value, bDescriptor.value)) {
                  matches = false;
                  break;
                }
              }
            } else {
              const aKeys = Object.keys(a).sort();
              const bKeys = Object.keys(b).sort();
              matches = aKeys.length === bKeys.length && aKeys.every((key, index) => {
                if (key !== bKeys[index]) return false;
                const aDescriptor = Object.getOwnPropertyDescriptor(a, key);
                const bDescriptor = Object.getOwnPropertyDescriptor(b, key);
                return Boolean(aDescriptor && bDescriptor)
                  && Object.prototype.hasOwnProperty.call(aDescriptor, "value")
                  && Object.prototype.hasOwnProperty.call(bDescriptor, "value")
                  && compare(aDescriptor.value, bDescriptor.value);
              });
            }
            if (matches) {
              if (!completed.has(a)) completed.set(a, new WeakSet());
              completed.get(a).add(b);
            }
            return matches;
          } finally {
            active.get(a).delete(b);
          }
        } catch (_error) {
          return false;
        }
      };
      return compare(left, right);
    }
    function signClassicalNahuatlVncDerivationValue(value) {
      let hash = 2166136261;
      const updateHash = token => {
        const serializedToken = String(token);
        for (let index = 0; index < serializedToken.length; index += 1) {
          hash ^= serializedToken.charCodeAt(index);
          hash = Math.imul(hash, 16777619);
        }
      };
      const visit = entry => {
        if (Array.isArray(entry)) {
          updateHash("[");
          for (let index = 0; index < entry.length; index += 1) {
            if (index > 0) {
              updateHash(",");
            }
            const descriptor = Object.getOwnPropertyDescriptor(entry, String(index));
            if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
              visit(descriptor.value);
            } else if (descriptor) {
              updateHash("<accessor>");
            }
          }
          updateHash("]");
          return;
        }
        if (entry && typeof entry === "object") {
          updateHash("{");
          Object.keys(entry).sort().forEach((key, index) => {
            if (index > 0) {
              updateHash(",");
            }
            updateHash(JSON.stringify(key));
            updateHash(":");
            const descriptor = Object.getOwnPropertyDescriptor(entry, key);
            if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
              visit(descriptor.value);
            } else {
              updateHash("<accessor>");
            }
          });
          updateHash("}");
          return;
        }
        updateHash(JSON.stringify(entry === undefined ? null : entry));
      };
      try {
        visit(value);
      } catch (_error) {
        return `v${CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION}:invalid`;
      }
      return `v${CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION}:${(hash >>> 0).toString(16).padStart(8, "0")}`;
    }
    function createClassicalNahuatlVncDerivationValidationContext() {
      return {
        baseSources: new WeakSet(),
        voiceSources: new WeakSet(),
        sourceAnalyses: new WeakSet(),
        inventories: new WeakSet(),
        operations: new WeakSet(),
        machineryFrames: new WeakSet()
      };
    }
    function getClassicalNahuatlVncDerivationRuntimeTarget() {
      if (targetObject && typeof targetObject === "object") {
        return targetObject;
      }
      return typeof globalThis !== "undefined" ? globalThis : null;
    }
    function getClassicalNahuatlVncDerivationFinalTypedFrame(machineryFrame = null) {
      return machineryFrame?.targetTypedVncSlotFrame || machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || machineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame || machineryFrame?.finalBoundaryRealizationFrame?.typedSlotFrame || null;
    }
    function getClassicalNahuatlVncDerivationSemanticIdentity(frame = null) {
      const subject = frame?.slots?.subject || {};
      const predicate = frame?.slots?.predicate || {};
      const number = frame?.slots?.number || {};
      const prePredicate = Array.isArray(frame?.slots?.prePredicate) ? frame.slots.prePredicate : [];
      return [subject.pers1 || "", subject.pers2 || "", ...prePredicate.map(slot => slot?.carrier || ""), predicate.stem || "", predicate.tns || "", number.num1 || "", number.num2 || ""].join("|");
    }
    function isClassicalNahuatlVncDerivationTypedSlotFrame(frame = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      return Boolean(typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function" && runtimeTarget.isClassicalNahuatlVncSlotFrame(frame) && frame.semanticIdentity === getClassicalNahuatlVncDerivationSemanticIdentity(frame));
    }
    function normalizeClassicalNahuatlVncDerivationObjectKind(value = "") {
      const normalized = normalizeClassicalNahuatlVncDerivationToken(value);
      return {
        "mainline-reflexive": "reflexive",
        "shuntline-reflexive": "reflexive",
        "human-reciprocal": "reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman"
      }[normalized] || normalized;
    }
    function normalizeClassicalNahuatlVncDerivationObjectRequest(request = {}, index = 0) {
      const objectKind = normalizeClassicalNahuatlVncDerivationObjectKind(request?.objectKind);
      return Object.freeze({
        objectId: normalizeClassicalNahuatlVncDerivationToken(request?.objectId || `source-object-${index + 1}`),
        objectKind,
        ...(objectKind === "reflexive" && request?.shuntlineReflexivePosition === "late"
          ? { shuntlineReflexivePosition: "late" } : {}),
        ...(objectKind === "reflexive" && request?.shuntlineReflexiveBoundaryVariant === "ihyana-contracted"
          ? { shuntlineReflexiveBoundaryVariant: "ihyana-contracted" } : {}),
        objectPerson: objectKind === "specific-projective" || objectKind === "reflexive" ? normalizeClassicalNahuatlVncDerivationToken(request?.objectPerson) : "",
        ...(objectKind === "specific-projective"
          && request?.silentSpecificObject === true
          ? { silentSpecificObject: true }
          : {}),
        governor: normalizeClassicalNahuatlVncDerivationToken(request?.governor || "directive"),
        derivationalLevel: Number(request?.derivationalLevel || index + 1),
        // A private multiple-object cluster retains semantic common number;
        // its third-singular carrier does not replace that Participant.
        ...(request?.participantFrame ? {
          participantFrame: request.participantFrame,
          ...Object.fromEntries(["referenceId", "person", "number", "animacy", "humanness"].map(key => [
            key, normalizeClassicalNahuatlVncDerivationToken(request[key] || request.participantFrame[key]),
          ])),
          morphologicalObjectPerson: normalizeClassicalNahuatlVncDerivationToken(
            request.morphologicalObjectPerson || request.participantFrame.morphologicalAgreement,
          ),
        } : {}),
      });
    }
    function isClassicalNahuatlVncDerivationObjectParticipantCompatible(request = {}) {
      const participant = request.participantFrame;
      if (!participant) return request.objectPerson !== "3common";
      return isClassicalNahuatlParticipantFrame(participant)
        && Object.isFrozen(participant)
        && ["object", "causee"].includes(participant.role)
        && (!request.objectPerson || [participant.category, participant.requestedAgreement].includes(request.objectPerson))
        && (!request.morphologicalObjectPerson || request.morphologicalObjectPerson === participant.morphologicalAgreement)
        && ["referenceId", "person", "number", "animacy", "humanness"].every(key =>
          !request[key] || request[key] === participant[key])
        && (request.objectPerson !== "3common" || (
          participant.category === "3common" && participant.person === "3"
          && participant.number === "common" && participant.animacy === "nonanimate"
          && participant.humanness === "nonhuman" && participant.morphologicalAgreement === "3sg"
        ));
    }
    function areClassicalNahuatlVncDerivationObjectRequestsValid(requests = [], { maximumCount = 2 } = {}) {
      if (!Array.isArray(requests) || requests.length > maximumCount) {
        return false;
      }
      const levels = [];
      const objectIds = [];
      for (let index = 0; index < requests.length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(requests, String(index));
        if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          return false;
        }
        const request = descriptor.value;
        if (!request?.objectId
          || !CLASSICAL_NAHUATL_VNC_DERIVATION_OBJECT_KINDS.includes(request.objectKind)
          || !["directive", "causative", "applicative", "lexical"].includes(request.governor)
          || !Number.isInteger(request.derivationalLevel)
          || request.derivationalLevel < 1
          || request.derivationalLevel > 3
          || !isClassicalNahuatlVncDerivationObjectParticipantCompatible(request)
          || (request.objectKind === "specific-projective"
            && !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(request.objectPerson)
            && request.objectPerson !== "3common")
          || (request.silentSpecificObject === true
            && (
              request.objectKind !== "specific-projective"
              || request.objectPerson !== "3sg"
            ))
          || (request.objectKind === "reflexive"
            && request.objectPerson
            && request.objectPerson !== "nonfirst-common"
            && !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(request.objectPerson))) {
          return false;
        }
        levels.push(request.derivationalLevel);
        objectIds.push(request.objectId);
      }
      return new Set(objectIds).size === objectIds.length && new Set(levels).size === levels.length;
    }
    function getClassicalNahuatlVncDerivationAvailableObjectId(sourceObjectRequests = [], baseId = "object", preferredSuffix = 1) {
      const usedIds = new Set(sourceObjectRequests.map(request => request.objectId));
      if (!usedIds.has(baseId)) {
        return baseId;
      }
      let suffix = Math.max(1, Number(preferredSuffix || 1));
      while (usedIds.has(`${baseId}-${suffix}`)) {
        suffix += 1;
      }
      return `${baseId}-${suffix}`;
    }
    function getClassicalNahuatlVncDerivationSourceObjectRequests(sourceMachineryFrame = null, sourceStem = "", finalTypedFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const derivedRequests = sourceMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame" ? sourceMachineryFrame.targetObjectRequests : null;
      const clusterFrame = sourceMachineryFrame?.multipleObjectClusterFrame || sourceMachineryFrame?.targetObjectClusterFrame || null;
      if (Array.isArray(derivedRequests)) {
        if (derivedRequests.length >= 2 && !(typeof runtimeTarget?.isClassicalNahuatlObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlObjectClusterFrame(clusterFrame, sourceStem))) {
          return null;
        }
        return Object.freeze(derivedRequests.map(normalizeClassicalNahuatlVncDerivationObjectRequest));
      }
      if (clusterFrame) {
        if (!(typeof runtimeTarget?.isClassicalNahuatlObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlObjectClusterFrame(clusterFrame, sourceStem))) {
          return null;
        }
        return Object.freeze(clusterFrame.objectRequests.map(normalizeClassicalNahuatlVncDerivationObjectRequest));
      }
      const objectFrame = sourceMachineryFrame?.priorVncFrame?.objectFrame || null;
      if (!objectFrame || !objectFrame.objectKind || objectFrame.valenceArity === "vacant") {
        const typedValenceSlots = (finalTypedFrame?.slots?.prePredicate || []).filter(slot => /^valence(?:-|$)/u.test(slot?.id || ""));
        return typedValenceSlots.length ? null : Object.freeze([]);
      }
      const provenance = runtimeTarget?.getClassicalNahuatlVncMachineryParticipantProvenance?.(sourceMachineryFrame);
      const retained = provenance?.objectRequests?.length === 1 ? provenance.objectRequests[0] : null;
      if (objectFrame.objectKind === "specific-projective" && retained
        && Object.isFrozen(provenance) && Object.isFrozen(provenance.objectRequests)
        && retained.objectId === "source-object-1" && retained.objectKind === objectFrame.objectKind
        && retained.governor === "directive" && retained.derivationalLevel === 1
        && retained.participantFrame?.morphologicalAgreement === objectFrame.objectPerson
        && isClassicalNahuatlVncDerivationObjectParticipantCompatible(retained)) {
        return Object.freeze([normalizeClassicalNahuatlVncDerivationObjectRequest(retained)]);
      }
      const request = normalizeClassicalNahuatlVncDerivationObjectRequest({
        objectId: "source-object-1",
        objectKind: objectFrame.objectKind,
        objectPerson: objectFrame.objectPerson,
        silentSpecificObject:
          objectFrame.objectKind === "specific-projective"
          && objectFrame.silentSpecificObject === true,
        governor: "directive",
        derivationalLevel: 1
      });
      return Object.freeze([request]);
    }
    function getClassicalNahuatlVncDerivationSourceSignaturePayload(source = {}) {
      return {
        sourceKind: source.sourceKind,
        sourceVoice: source.sourceVoice || "active",
        sourceStem: source.sourceStem,
        sourceLexemeId: source.sourceLexemeId || "",
        sourceInitialIKind: source.sourceInitialIKind || "",
        sourceClass: source.sourceClass,
        sourceValence: source.sourceValence,
        sourceSubject: source.sourceSubject,
        mood: source.mood,
        tense: source.tense,
        morphologicalMood: source.morphologicalMood || source.mood,
        morphologicalTense: source.morphologicalTense || source.tense,
        typedSemanticIdentity: source.finalTypedFrame?.semanticIdentity || "",
        formationTypedSemanticIdentity: source.formationFinalTypedFrame?.semanticIdentity || "",
        formationSourceSignature: source.formationSourceSignature || "",
        participantSurfaceSubject: source.participantSurfaceSubject || "",
        participantSurfaceObjectRequests: source.participantSurfaceObjectRequests || [],
        promotedSourceObjectRequest: source.promotedSourceObjectRequest || null,
        implicitAgentObjectKind: source.implicitAgentObjectKind || "",
        objectRequests: source.sourceObjectRequests || [],
        ...(source.sourceSubjectParticipantFrame
          ? {sourceSubjectParticipantFrame: source.sourceSubjectParticipantFrame} : {}),
        ...(source.analyticalSourceFrame ? {analyticalSourceAnalysis:source.analyticalSourceAnalysis,
          abstractInnerSubjectParticipantFrame:source.abstractInnerSubjectParticipantFrame,
          targetSubjectParticipantFrame:source.targetSubjectParticipantFrame} : {}),
        priorDerivationSignature: source.priorDerivationSignature || ""
      };
    }
    function getClassicalNahuatlVncDerivationBaseSourceAuthorityProjection(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        stem: frame.stem,
        classTargetStem: frame.classTargetStem,
        classTargetValence: frame.classTargetValence,
        sourceVerbstem: frame.sourceVerbstem,
        denominalCausativeOperationFrame: frame.denominalCausativeOperationFrame || null,
        canonicalSourceSelectionFrame:
          frame.canonicalSourceSelectionFrame || null,
        classId: frame.classId,
        classProfile: frame.classProfile,
        sourceSelectionFrame: frame.sourceSelectionFrame,
        progressiveAssimilationFrame: frame.progressiveAssimilationFrame,
        lesson11ParadigmPlan: frame.lesson11ParadigmPlan,
        lesson11VncApplicationFrame: frame.lesson11VncApplicationFrame,
        citationRuleFrame: frame.citationRuleFrame,
        structureRuleFrame: frame.structureRuleFrame,
        classRuleFrame: frame.classRuleFrame,
        predicateFormationRuleFrame: frame.predicateFormationRuleFrame,
        analysisRuleFrame: frame.analysisRuleFrame,
        objectRelationshipRuleFrame: frame.objectRelationshipRuleFrame,
        tlaFusionRuleFrame: frame.tlaFusionRuleFrame,
        expandedVncBoundaryFrame: frame.expandedVncBoundaryFrame,
        sentenceSurfaceFrame: frame.sentenceSurfaceFrame,
        grammarOperationEvaluationFrame: frame.grammarOperationEvaluationFrame,
        priorVncFrame: frame.priorVncFrame,
        multipleObjectClusterFrame: frame.multipleObjectClusterFrame,
        formulaRealization: frame.formulaRealization,
        proofFrame: frame.proofFrame,
        selectedOutputLogicFrame: frame.selectedOutputLogicFrame,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        formulaOutputAllowed: frame.formulaOutputAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed
      };
    }
    function getClassicalNahuatlVncDerivationSemanticEnvironment(sourceMachineryFrame = null) {
      const priorVncFrame = sourceMachineryFrame?.priorVncFrame || {};
      const lesson11Plan = sourceMachineryFrame?.lesson11ParadigmPlan || {};
      const retainedSemanticEnvironment = sourceMachineryFrame?.sourceSemanticEnvironment || {};
      // Borrowed optatives retain their semantic mood in predicate formation;
      // the prior VNC carries the indicative morphology that realizes it.
      const predicateFormation = sourceMachineryFrame?.predicateFormationRuleFrame || {};
      const retainedMorphologicalEnvironment = sourceMachineryFrame?.targetMorphologicalEnvironment || {};
      return Object.freeze({
        mood: normalizeClassicalNahuatlVncDerivationToken(retainedSemanticEnvironment.mood || lesson11Plan.requestedMood || predicateFormation.mood || priorVncFrame.personDyad?.mood || priorVncFrame.mood || "indicative"),
        tense: normalizeClassicalNahuatlVncDerivationToken(retainedSemanticEnvironment.tense || lesson11Plan.requestedSemanticTense || priorVncFrame.tense || "present"),
        paradigmTense: normalizeClassicalNahuatlVncDerivationToken(retainedSemanticEnvironment.paradigmTense || lesson11Plan.paradigmTense || lesson11Plan.requestedSemanticTense || priorVncFrame.tense || "present"),
        semanticTenseValue: normalizeClassicalNahuatlVncDerivationToken(retainedSemanticEnvironment.semanticTenseValue || lesson11Plan.semanticTenseValue || lesson11Plan.requestedSemanticTense || priorVncFrame.tense || "present"),
        morphologicalMood: normalizeClassicalNahuatlVncDerivationToken(retainedMorphologicalEnvironment.mood || lesson11Plan.morphologicalMood || priorVncFrame.personDyad?.mood || priorVncFrame.mood || "indicative"),
        morphologicalTense: normalizeClassicalNahuatlVncDerivationToken(retainedMorphologicalEnvironment.tense || lesson11Plan.morphologicalTense || priorVncFrame.tense || "present")
      });
    }
    function rebuildClassicalNahuatlVncDerivationBaseSourceMachineryFrame(sourceMachineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.buildClassicalNahuatlVerbstemClassFrame !== "function") {
        return null;
      }
      if (runtimeTarget?.isClassicalNahuatlVerbstemClassFrame?.(sourceMachineryFrame) === true
        && sourceMachineryFrame.obsoleteRootSourceMachineryFrame) {
        return runtimeTarget.buildClassicalNahuatlObsoleteRootVerbstemFrame?.(
          sourceMachineryFrame.obsoleteRootSourceMachineryFrame,
        ) || null;
      }
      const proofConclusion = sourceMachineryFrame?.proofFrame?.conclusion || {};
      const priorVncFrame = sourceMachineryFrame?.priorVncFrame || {};
      const sourceSelectionFrame = sourceMachineryFrame?.sourceSelectionFrame || {};
      const objectFrame = priorVncFrame.objectFrame || {};
      const sourceStem = normalizeClassicalNahuatlVncDerivationStem(sourceMachineryFrame?.stem || sourceMachineryFrame?.sourceVerbstem || proofConclusion.sourceVerbstem);
      const sourceClass = normalizeClassicalNahuatlVncDerivationToken(proofConclusion.classId || sourceMachineryFrame?.classId).toUpperCase();
      const sourceValence = normalizeClassicalNahuatlVncDerivationToken(proofConclusion.classTargetValence || sourceMachineryFrame?.classTargetValence || sourceMachineryFrame?.citationRuleFrame?.valence);
      const sourceSubject = normalizeClassicalNahuatlVncDerivationToken(priorVncFrame.personDyad?.subject || priorVncFrame.subject || sourceMachineryFrame?.multipleObjectClusterFrame?.subject);
      // Reconstruction and source validation must consume the same semantic
      // environment. Lesson 11 can realize that request through a different
      // morphological tense without changing the source VNC coordinate.
      const semanticEnvironment = getClassicalNahuatlVncDerivationSemanticEnvironment(sourceMachineryFrame);
      const { mood, tense } = semanticEnvironment;
      const sourceObjectPerson = normalizeClassicalNahuatlVncDerivationToken(objectFrame.objectPerson || sourceMachineryFrame?.objectRelationshipRuleFrame?.selectedObjectPerson);
      if (!sourceStem || !["A", "B", "C", "D"].includes(sourceClass) || !sourceValence || !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(sourceSubject)) {
        return null;
      }
      // Class resolution is Source evidence. An inferred class must remain
      // inferred when replayed; selecting that same letter changes its basis.
      const replaySourceClass = sourceMachineryFrame?.classProfile?.classResolutionBasis
        === "canvas-source-shape-or-lexical-analysis" ? "" : sourceClass;
      const sourceOptions = {
        ...getClassicalNahuatlDerivedVncCanonicalSentenceOptions(sourceMachineryFrame),
        tenseMode: "verbo",
        subject: sourceSubject,
        mood,
        // Preserve the selected paradigm coordinate as well as its meaning.
        // Replacing preterit-as-present with present changes the issued plan.
        tense: sourceMachineryFrame?.lesson11ParadigmPlan?.requestedParadigmTense || tense,
        irregularStemChoice: sourceMachineryFrame?.lesson11ParadigmPlan?.requestedAlternativeStem || "",
        // The planner validates the original issuer-bound NNC dependency.
        pronominalNncCooperationFrame: sourceMachineryFrame?.lesson11ParadigmPlan?.pronominalNncCooperationFrame || null,
        verbClass: replaySourceClass,
        perfectiveClass: replaySourceClass,
        // Replay the original fusion input, not its resulting intransitive
        // class target. The issued fusion rule retains that distinction.
        requestedSourceValence: sourceMachineryFrame?.tlaFusionRuleFrame?.fused
          ? sourceMachineryFrame.tlaFusionRuleFrame.ruleInputs?.requestedSourceValence || sourceValence
          : sourceValence,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceMachineryFrame?.objectRelationshipRuleFrame?.selectedObjectKind || (sourceValence === "intransitive" ? "none" : sourceValence),
        // Rebuild the issued meaning as well as its identical reflexive morphology.
        objectInterpretation: objectFrame.requestedInterpretation || "reflexive",
        objectPerson: sourceObjectPerson,
        object: sourceObjectPerson,
        silentSpecificObject: objectFrame.objectKind === "specific-projective"
          && objectFrame.silentSpecificObject === true,
        tlaFusion: sourceMachineryFrame?.tlaFusionRuleFrame?.fused === true,
        sourceSelectionKind: sourceSelectionFrame.requestedSelectionKind || "",
        sourceEmbedStem: sourceSelectionFrame.explicitEmbedStem || "",
        sourceMatrixStem: sourceSelectionFrame.explicitMatrixStem || "",
        predicateTnsOverride: priorVncFrame.predicateTnsOverride || ""
      };
      // Reconstruct the selected input, including an omitted ending. The
      // sentence frame supplies the resolved default, whereas the finite
      // Source retains whether that default was explicitly requested.
      if (Object.hasOwn(priorVncFrame.source || {}, "finiteSingularConnector")) sourceOptions.finiteSingularConnector = priorVncFrame.source.finiteSingularConnector;
      if (Object.hasOwn(priorVncFrame.source || {}, "admonitivePluralEnding")) {
        sourceOptions.admonitivePluralEnding =
          priorVncFrame.source.admonitivePluralEnding;
      }
      if (sourceMachineryFrame?.canonicalSourceSelectionFrame) {
        sourceOptions.canonicalSourceSelectionFrame =
          sourceMachineryFrame.canonicalSourceSelectionFrame;
      }
      if (sourceMachineryFrame?.denominalCausativeOperationFrame) {
        sourceOptions.denominalCausativeOperationFrame = sourceMachineryFrame.denominalCausativeOperationFrame;
      }
      const canonicalSourceStemRecord = getClassicalNahuatlVncDerivationCanonicalSourceStemRecord(sourceStem, sourceValence);
      const sourceInitialIKind = getClassicalNahuatlVncDerivationSourceInitialIKind(canonicalSourceStemRecord, sourceMachineryFrame);
      if (sourceInitialIKind) {
        sourceOptions.initialVowelKind = sourceInitialIKind;
      }
      const rebuiltLesson7 = runtimeTarget.buildClassicalNahuatlVerbstemClassFrame(sourceStem, sourceOptions);
      if (sourceMachineryFrame.kind === "classical-nahuatl-verbstem-verbstem-class-machinery-frame") {
        return rebuiltLesson7;
      }
      if (sourceMachineryFrame.kind !== "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame" || typeof runtimeTarget?.buildClassicalNahuatlMultipleObjectVncFrame !== "function") {
        return null;
      }
      const clusterFrame = sourceMachineryFrame.multipleObjectClusterFrame;
      if (!(typeof runtimeTarget?.isClassicalNahuatlObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlObjectClusterFrame(clusterFrame, sourceStem))) {
        return null;
      }
      return runtimeTarget.buildClassicalNahuatlMultipleObjectVncFrame(rebuiltLesson7, {
        objectRequests: clusterFrame.objectRequests,
        // A continued derived VNC retains its authenticated formula context
        // when the ordinary multiple-object Source is reconstructed here.
        // The multiple-object owner checks this exact issued derivation and
        // its object requests before accepting the context.
        formulaProjectionSourceFrame: sourceMachineryFrame.formulaProjectionSourceFrame || null,
        rareThirdCausativeMeaningSupported:
          clusterFrame.rareThirdCausativeMeaningSupported === true,
        exceptionalSuffixOrderAuthorized:
          clusterFrame.exceptionalSuffixOrderAuthorized === true,
        formulaArtifact: clusterFrame.formulaArtifact || "",
        surfaceArtifact: clusterFrame.surfaceArtifact || ""
      });
    }
    function isCanonicalClassicalNahuatlVncDerivationBaseSourceMachineryFrame(frame = null, validationContext = null) {
      if (!frame || !CLASSICAL_NAHUATL_VNC_DERIVATION_BASE_SOURCE_KINDS.includes(frame.kind) || frame.authorizationStatus !== "authorized") {
        return false;
      }
      if (validationContext?.baseSources?.has(frame)) {
        return true;
      }
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const ownerIssued = frame.kind
        === "classical-nahuatl-verbstem-verbstem-class-machinery-frame"
        ? typeof runtimeTarget?.isClassicalNahuatlVerbstemClassFrame
            === "function"
          && runtimeTarget.isClassicalNahuatlVerbstemClassFrame(frame)
            === true
        : typeof runtimeTarget?.isClassicalNahuatlMultipleObjectVncFrame
            === "function"
          && runtimeTarget.isClassicalNahuatlMultipleObjectVncFrame(
            frame,
          ) === true;
      if (!ownerIssued) {
        return false;
      }
      const rebuilt = rebuildClassicalNahuatlVncDerivationBaseSourceMachineryFrame(frame);
      const canonical = Boolean(rebuilt?.authorizationStatus === "authorized" && areClassicalNahuatlVncDerivationValuesEqual(getClassicalNahuatlVncDerivationBaseSourceAuthorityProjection(frame), getClassicalNahuatlVncDerivationBaseSourceAuthorityProjection(rebuilt)));
      if (canonical) {
        validationContext?.baseSources?.add(frame);
      }
      return canonical;
    }
    function getClassicalNahuatlVncDerivationVoiceSourceAuthorityProjection(frame = {}) {
      const finalTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(frame);
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        voice: frame.voice,
        stem: frame.stem,
        sourceVerbstem: frame.sourceVerbstem,
        sourceValence: frame.sourceValence,
        valence: frame.valence,
        sourceSubject: frame.sourceSubject,
        subject: frame.subject,
        selectedNonactiveAspect: frame.selectedNonactiveAspect,
        nonactiveStemRecord: frame.nonactiveStemRecord,
        inherentImpersonalRecord: frame.inherentImpersonalRecord || null,
        tlaImpersonalStemRecord: frame.tlaImpersonalStemRecord || null,
        sourceObjectClusterFrame: frame.sourceObjectClusterFrame,
        voiceObjectClusterFrame: frame.voiceObjectClusterFrame,
        voiceTransformationFrame: frame.voiceTransformationFrame,
        finalTypedVncSlotFrame: finalTypedFrame,
        formulaRealization: frame.formulaRealization,
        selectedOutputFillers: frame.selectedOutputLogicFrame?.outputFillers || null,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        formulaOutputAllowed: frame.formulaOutputAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed
      };
    }
    function getClassicalNahuatlNominalVoiceSourceSignaturePayload(frame, formationSourceSignature) {
      const payload = getClassicalNahuatlVncDerivationVoiceSourceAuthorityProjection(frame);
      const active = frame?.activeMachineryFrame;
      const cluster = frame?.voiceObjectClusterFrame;
      // The Source and voice have already passed the unchanged owner/rebuild
      // checks. Digest their semantic witness without expanding retained
      // nominal proof graphs; live Result links remain exact and untouched.
      if (active?.operationFrame?.operation !== "nominal-prefix"
        || getClassicalNahuatlVncDerivationRuntimeTarget()?.isClassicalNahuatlMachineryFrame?.(active) !== true
        || !formationSourceSignature
        || cluster?.sourceMachineryFrame !== active
        || frame.voiceTransformationFrame?.targetObjectClusterFrame !== cluster) return payload;
      const semanticCluster = {
        ...cluster,
        sourceMachineryFrame: { formationSourceSignature },
      };
      return {
        ...payload,
        voiceObjectClusterFrame: semanticCluster,
        voiceTransformationFrame: {
          ...payload.voiceTransformationFrame,
          targetObjectClusterFrame: semanticCluster,
        },
      };
    }
    function getClassicalNahuatlVncDerivationRetainedInherentSubject(frame = null, runtimeTarget = null) {
      const participant = runtimeTarget?.getClassicalNahuatlVncMachineryParticipantProvenance?.(frame)?.subjectFrame;
      return frame?.voice === "inherent-impersonal"
        && isClassicalNahuatlParticipantFrame(participant) && Object.isFrozen(participant)
        && participant.role === "subject" && participant.person === "3"
        && participant.number === "singular" && participant.morphologicalAgreement === "3sg"
        && participant.impersonal === true && participant.hasReferent === false ? participant : null;
    }
    function rebuildClassicalNahuatlVncDerivationVoiceSourceMachineryFrame(frame = null, depth = 0, validationContext = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const activeMachineryFrame = frame?.activeMachineryFrame || null;
      const activeDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(activeMachineryFrame, depth + 1, validationContext);
      if (frame?.kind !== CLASSICAL_NAHUATL_VNC_DERIVATION_VOICE_SOURCE_KIND || !["passive", "impersonal", "inherent-impersonal", "tla-impersonal"].includes(normalizeClassicalNahuatlVncDerivationToken(frame.voice)) || activeDescriptor.authorizationStatus !== "authorized" || typeof runtimeTarget?.buildClassicalNahuatlDerivedVncFrame !== "function") {
        return null;
      }
      const specificSourceObject = activeDescriptor.sourceObjectRequests.find(request => request.objectKind === "specific-projective") || null;
      const targetEnvironment = getClassicalNahuatlVncDerivationSemanticEnvironment(frame);
      return runtimeTarget.buildClassicalNahuatlDerivedVncFrame(activeMachineryFrame, {
        voice: frame.voice,
        nonactiveStemRecord: frame.nonactiveStemRecord,
        inherentImpersonalRecord: frame.inherentImpersonalRecord || null,
        tlaImpersonalStemRecord: frame.tlaImpersonalStemRecord || null,
        sourceObjectClusterFrame: frame.sourceObjectClusterFrame,
        sourceValence: activeDescriptor.sourceValence,
        sourceSubject: getClassicalNahuatlVncDerivationRetainedInherentSubject(frame, runtimeTarget)
          ?.morphologicalAgreement || activeDescriptor.sourceSubject,
        sourceObjectPerson: specificSourceObject?.objectPerson || "",
        mood: targetEnvironment.mood,
        tense: targetEnvironment.paradigmTense,
        verbClass: activeDescriptor.sourceClass,
        sentenceOptions: getClassicalNahuatlDerivedVncCanonicalSentenceOptions(frame)
      });
    }
    function isCanonicalClassicalNahuatlVncDerivationVoiceSourceMachineryFrame(frame = null, depth = 0, validationContext = null) {
      if (!frame || frame.kind !== CLASSICAL_NAHUATL_VNC_DERIVATION_VOICE_SOURCE_KIND || frame.authorizationStatus !== "authorized" || !["passive", "impersonal", "inherent-impersonal", "tla-impersonal"].includes(normalizeClassicalNahuatlVncDerivationToken(frame.voice)) || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH) {
        return false;
      }
      if (validationContext?.voiceSources?.has(frame)) {
        return true;
      }
      const activeDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(frame.activeMachineryFrame, depth + 1, validationContext);
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const inherentSource = frame.voice === "inherent-impersonal";
      const retainedInherentSubject = getClassicalNahuatlVncDerivationRetainedInherentSubject(frame, runtimeTarget);
      const nonactiveRecordCanonical = activeDescriptor.authorizationStatus === "authorized"
        && (frame.voice === "tla-impersonal"
          ? activeDescriptor.sourceValence === "intransitive"
            && activeDescriptor.sourceObjectCount === 0
            && runtimeTarget?.isClassicalNahuatlTlaImpersonalStemRecord?.(frame.tlaImpersonalStemRecord, activeDescriptor.sourceStem) === true
          : inherentSource
          ? (activeDescriptor.sourceSubject === "3sg" || retainedInherentSubject)
            && activeDescriptor.sourceObjectCount === 0
            && typeof runtimeTarget?.isClassicalNahuatlInherentImpersonalRecord === "function"
            && runtimeTarget.isClassicalNahuatlInherentImpersonalRecord(frame.inherentImpersonalRecord, activeDescriptor.sourceStem)
          : typeof runtimeTarget?.isClassicalNahuatlNonactiveStemRecord === "function"
            && runtimeTarget.isClassicalNahuatlNonactiveStemRecord(frame.nonactiveStemRecord, activeDescriptor.sourceStem));
      if (!nonactiveRecordCanonical) {
        return false;
      }
      if (frame.sourceObjectClusterFrame && !(typeof runtimeTarget?.isClassicalNahuatlObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlObjectClusterFrame(frame.sourceObjectClusterFrame, activeDescriptor.sourceStem))) {
        return false;
      }
      const rebuilt = rebuildClassicalNahuatlVncDerivationVoiceSourceMachineryFrame(frame, depth + 1, validationContext);
      const canonical = Boolean(rebuilt?.authorizationStatus === "authorized"
        && areClassicalNahuatlVncDerivationValuesEqual(getClassicalNahuatlVncDerivationVoiceSourceAuthorityProjection(frame), getClassicalNahuatlVncDerivationVoiceSourceAuthorityProjection(rebuilt)));
      if (canonical) {
        validationContext?.voiceSources?.add(frame);
      }
      return canonical;
    }
    function getClassicalNahuatlVncDerivationTypedSubjectCandidates(finalTypedFrame = null, {
      stem = "",
      mood = "indicative",
      tense = "present",
      canonicalIrregularPlan = null
    } = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.getClassicalNahuatlFiniteSubjectPersonDyad !== "function" || typeof runtimeTarget?.getClassicalNahuatlFiniteSubjectNumberDyad !== "function") {
        return [];
      }
      const typedSubject = finalTypedFrame?.slots?.subject || {};
      const typedNumber = finalTypedFrame?.slots?.number || {};
      const firstPrePredicateCarrier = normalizeClassicalNahuatlVncDerivationToken(
        finalTypedFrame?.slots?.prePredicate?.[0]?.carrier,
      );
      const followingMaterial = firstPrePredicateCarrier
        && !/^[0⎕□-]+$/u.test(firstPrePredicateCarrier)
        ? firstPrePredicateCarrier
        : stem;
      return CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.filter(subject => {
        let personDyad = null;
        let numberDyad = null;
        try {
          personDyad = runtimeTarget.getClassicalNahuatlFiniteSubjectPersonDyad(subject, mood, {
            followingMaterial,
            stem: followingMaterial
          });
          numberDyad = runtimeTarget.getClassicalNahuatlFiniteSubjectNumberDyad({
            subject,
            mood,
            tense,
            stem
          });
        } catch {
          return false;
        }
        const pers1Candidates = new Set([personDyad?.pers1, ...(personDyad?.pers1Variants || [])].map(normalizeClassicalNahuatlVncDerivationToken));
        const directionalSubjectCarrier = typeof runtimeTarget.getClassicalNahuatlVncDirectionalSubjectCarrierRealization === "function"
          ? runtimeTarget.getClassicalNahuatlVncDirectionalSubjectCarrierRealization(finalTypedFrame, personDyad?.pers1)
          : "";
        if (directionalSubjectCarrier) {
          pers1Candidates.add(normalizeClassicalNahuatlVncDerivationToken(directionalSubjectCarrier));
        }
        const irregularNumber = canonicalIrregularPlan?.applies === true
          && canonicalIrregularPlan.authorizationStatus === "authorized"
          && (canonicalIrregularPlan.num1Override
            || canonicalIrregularPlan.kDeletionAfterStem
            || canonicalIrregularPlan.deletePostStemK);
        if (irregularNumber && canonicalIrregularPlan.subjectNumber
          !== (subject.endsWith("pl") ? "plural" : "singular")) return false;
        // The source machinery and its Lesson 11 plan were rebuilt and checked
        // before this comparison. Its obligatory allomorph replaces the regular
        // number carrier; it does not add an alternative caller spelling.
        const num1Candidates = new Set((irregularNumber
          ? [canonicalIrregularPlan.num1Override
            || (/^(?:c|qu|qui)$/u.test(numberDyad?.num1 || "")
              ? "⎕" : numberDyad?.num1)]
          : [numberDyad?.num1, ...(numberDyad?.num1Variants || [])]
        ).map(normalizeClassicalNahuatlVncDerivationToken));
        const num2Candidates = new Set([numberDyad?.num2, ...(numberDyad?.num2Variants || [])].map(normalizeClassicalNahuatlVncDerivationToken));
        return pers1Candidates.has(normalizeClassicalNahuatlVncDerivationToken(typedSubject.pers1))
          && normalizeClassicalNahuatlVncDerivationToken(personDyad?.pers2) === normalizeClassicalNahuatlVncDerivationToken(typedSubject.pers2)
          && num1Candidates.has(normalizeClassicalNahuatlVncDerivationToken(typedNumber.num1))
          && num2Candidates.has(normalizeClassicalNahuatlVncDerivationToken(typedNumber.num2));
      });
    }
    function getClassicalNahuatlVncDerivationCanonicalSourceStemRecord(sourceStem = "", sourceValence = "") {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (
        typeof runtimeTarget?.resolveClassicalNahuatlCanonicalSourceStemRecord
          !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlCanonicalSourceStemRecord
          !== "function"
      ) {
        return null;
      }
      const normalizedStem = normalizeClassicalNahuatlVncDerivationStem(sourceStem);
      const normalizedValence = normalizeClassicalNahuatlVncDerivationToken(sourceValence);
      const expectedDisplay = normalizedValence === "intransitive" ? "intransitive" : "transitive";
      const record =
        runtimeTarget.resolveClassicalNahuatlCanonicalSourceStemRecord({
          enteredStem: normalizedStem,
          basalUnit: "vnc",
          valence: expectedDisplay,
        });
      return runtimeTarget.isClassicalNahuatlCanonicalSourceStemRecord(record)
        ? record
        : null;
    }
    function getClassicalNahuatlVncDerivationSourceInitialIKind(canonicalSourceStemRecord = null, sourceMachineryFrame = null) {
      // Reconstruct the analysis admitted by the source owner. A newly looked-up
      // lexical default cannot replace an explicit analysis of an open source.
      const generatedKind = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame?.citationRuleFrame?.initialVowelKind);
      if (["real", "supportive"].includes(generatedKind)) return generatedKind;
      const sourceKind = normalizeClassicalNahuatlVncDerivationToken(canonicalSourceStemRecord?.initialIAnalysis?.kind);
      return ["real", "supportive"].includes(sourceKind) ? sourceKind : "";
    }
    function buildClassicalNahuatlVncDerivationBoundaryEnvironmentFrame({
      sourceDescriptor = null,
      inputStem = "",
      outputStem = "",
      followingMorpheme = "",
      boundaryType = "derivational-morpheme-boundary",
      ruleId = "",
      changeRule = ""
    } = {}) {
      const canonicalSourceStemRecord = sourceDescriptor?.canonicalSourceStemRecord || null;
      const sourceSelectionFrame =
        sourceDescriptor?.canonicalSourceSelectionFrame || null;
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const openSourceAnalysisAuthorized = Boolean(
        sourceSelectionFrame?.openStemSource === true
        && typeof runtimeTarget?.isClassicalNahuatlCanonicalSourceSelectionFrame
          === "function"
        && runtimeTarget.isClassicalNahuatlCanonicalSourceSelectionFrame(
          sourceSelectionFrame,
        )
        && sourceSelectionFrame.canonicalRecord === null
        && sourceSelectionFrame.canonicalStem
          === sourceDescriptor?.sourceStem
        && sourceSelectionFrame.valence === sourceDescriptor?.sourceValence
        && sourceSelectionFrame.verbClass === sourceDescriptor?.sourceClass
      );
      const sourceAuthorized = Boolean(
        canonicalSourceStemRecord || openSourceAnalysisAuthorized,
      );
      return Object.freeze({
        kind: "classical-nahuatl-vnc-derivational-boundary-environment-frame",
        sourceAuthority: "canonical-source-verbstem-and-typed-grammar-rule",
        sourceStem: canonicalSourceStemRecord?.stem || sourceDescriptor?.sourceStem || "",
        sourceValence: sourceDescriptor?.sourceValence || "",
        canonicalSourceStemRecord,
        canonicalSourceSelectionFrame: sourceSelectionFrame,
        inputStem,
        outputStem,
        followingMorpheme,
        boundaryType,
        ruleId,
        changeRule,
        authorizationStatus: sourceAuthorized ? "authorized" : "blocked",
        blockReason: sourceAuthorized
          ? ""
          : "typed-source-verbstem-analysis-required"
      });
    }
    function resolveClassicalNahuatlAnalyticalVncSourceFrame(request = {}) {
      if (!request || typeof request !== "object" || Array.isArray(request)
        || Object.keys(request).some(key=>!["enteredStem","valence"].includes(key))
        || request.valence !== "intransitive") return null;
      const r=getClassicalNahuatlVncDerivationRuntimeTarget();
      const record=r.resolveClassicalNahuatlCanonicalSourceStemRecord?.({enteredStem:request.enteredStem,basalUnit:"vnc",valence:request.valence});
      const analysis=record?.canonicalAnalyticalSourceAnalysis;
      if (r.isClassicalNahuatlCanonicalSourceStemRecord?.(record)!==true || !analysis
        || normalizeClassicalNahuatlVncDerivationStem(request.enteredStem)!==record.stem) return null;
      if (analyticalVncSources.has(record)) return analyticalVncSources.get(record);
      const source=Object.freeze({kind:"classical-nahuatl-analytical-vnc-source-frame",sourceStem:record.stem,
        sourceRank:analysis.sourceRank,sourceClass:analysis.sourceClass,sourceValence:record.defaultSourceValence,
        sourceAnalysis:analysis,canonicalSourceStemRecord:record,independentFiniteUseLicensed:false,
        grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      analyticalVncSources.set(record,source);analyticalVncSourceRecords.set(source,record);return source;
    }
    function isClassicalNahuatlAnalyticalVncSourceFrame(source = null) {
      const record=source && analyticalVncSourceRecords.get(source),r=getClassicalNahuatlVncDerivationRuntimeTarget();
      return Boolean(record && r.isClassicalNahuatlCanonicalSourceStemRecord(record) && Object.isFrozen(source)
        && source.canonicalSourceStemRecord===record && source.sourceAnalysis===record.canonicalAnalyticalSourceAnalysis
        && source.sourceStem===record.stem && source.sourceClass===source.sourceAnalysis.sourceClass
        && source.sourceRank==="restricted-analytical-verbstem-operand" && source.sourceValence==="intransitive"
        && source.independentFiniteUseLicensed===false);
    }
    function isAuthenticatedAnalyticalOperand(source) {
      const r=getClassicalNahuatlVncDerivationRuntimeTarget();
      return isClassicalNahuatlAnalyticalVncSourceFrame(source) || r.isClassicalNahuatlImperfectiveVncSourceFrame?.(source)===true
        && source.sourceValence==="intransitive" && source.sourceAnalysis.formation==="root-plus-ya"
        && source.sourceAnalysis.licensedOperationRuleIds?.length>0;
    }
    function buildClassicalNahuatlAnalyticalVncDerivationContextFrame(source = null, options = {}) {
      const participant=options?.innerSubjectParticipantFrame;
      const targetParticipant=options?.targetSubjectParticipantFrame;
      if (!isAuthenticatedAnalyticalOperand(source) || !options || typeof options!=="object"
        || Object.keys(options).some(key=>!["innerSubjectParticipantFrame","targetSubjectParticipantFrame"].includes(key))
        || !isClassicalNahuatlParticipantFrame(participant) || !Object.isFrozen(participant)
        || participant.role!=="causee" || !participant.hasReferent
        || !isClassicalNahuatlParticipantFrame(targetParticipant) || !Object.isFrozen(targetParticipant)
        || targetParticipant.role!=="subject" || !targetParticipant.hasReferent
        || !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(targetParticipant.morphologicalAgreement)
        || !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(participant.morphologicalAgreement)) return null;
      const context=Object.freeze({kind:ANALYTICAL_ARGUMENT_CONTEXT_KIND,canonicalAnalyticalSourceFrame:source,
        abstractInnerSubjectParticipantFrame:participant,targetSubjectParticipantFrame:targetParticipant,
        sourceTypedVncSlotFrame:null,sourceFiniteEventAsserted:false,
        grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const descriptor={authorizationStatus:"authorized",blockReason:"",sourceKind:context.kind,sourceVoice:"active",
        sourceStem:source.sourceStem,enteredSourceStem:source.sourceStem,canonicalSourceStemRecord:source.canonicalSourceStemRecord,
        sourceClass:source.sourceClass || "",sourceValence:source.sourceValence,sourceInitialIKind:"",
        sourceSubject:participant.morphologicalAgreement,participantSurfaceSubject:participant.morphologicalAgreement,
        sourceObjectRequests:Object.freeze([]),sourceObjectCount:0,participantSurfaceObjectRequests:Object.freeze([]),
        finalTypedFrame:null,formationFinalTypedFrame:null,formationSourceSignature:"",sourceMachineryFrame:context,
        formationSourceMachineryFrame:context,analyticalSourceFrame:source,analyticalSourceAnalysis:source.sourceAnalysis,
        abstractInnerSubjectParticipantFrame:participant,targetSubjectParticipantFrame:targetParticipant};
      descriptor.sourceSignature=signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceSignaturePayload(descriptor));
      analyticalVncArgumentContexts.set(context,Object.freeze(descriptor));return context;
    }
    function isClassicalNahuatlAnalyticalVncDerivationContextFrame(context = null) {
      const d=context && analyticalVncArgumentContexts.get(context);
      return Boolean(d && Object.isFrozen(context) && isAuthenticatedAnalyticalOperand(d.analyticalSourceFrame)
        && context.canonicalAnalyticalSourceFrame===d.analyticalSourceFrame
        && context.abstractInnerSubjectParticipantFrame===d.abstractInnerSubjectParticipantFrame
        && context.targetSubjectParticipantFrame===d.targetSubjectParticipantFrame
        && context.sourceTypedVncSlotFrame===null && context.sourceFiniteEventAsserted===false);
    }
    function getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame = null, depth = 0, validationContext = null) {
      if (!sourceMachineryFrame || typeof sourceMachineryFrame !== "object" || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-authorized-source-machinery-required" };
      }
      if (isClassicalNahuatlAnalyticalVncDerivationContextFrame(sourceMachineryFrame))
        return analyticalVncArgumentContexts.get(sourceMachineryFrame);
      const runtime = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (runtime.isClassicalNahuatlImperfectiveVncApplicationFrame?.(sourceMachineryFrame) === true) {
        const projection = runtime.getClassicalNahuatlVncContinuationSourceConstituents?.(sourceMachineryFrame);
        const source = projection?.canonicalImperfectiveSourceFrame;
        const body = projection?.canonicalResultFrame;
        const typed = body?.finalTypedVncSlotFrame;
        const shape = runtime.buildClassicalNahuatlStemFinalShapeFrame?.(source?.sourceStem);
        if (!projection || !runtime.isClassicalNahuatlImperfectiveVncSourceFrame?.(source)
          || projection.verbClass !== "" || projection.sourceVoice !== "active"
          || projection.sourceValence !== "specific-projective"
          || projection.sourceStem !== source.sourceStem
          || source.sourceAnalysis.formation !== "lexical-transitive"
          || !["oya", "oyā"].includes(shape?.letterTail?.three)
          || !isClassicalNahuatlVncDerivationTypedSlotFrame(typed)
          || projection.sourceObjectRequests?.length !== 1
          || !areClassicalNahuatlVncDerivationObjectRequestsValid(projection.sourceObjectRequests)
          || typed !== body.finalTypedVncSlotFrame
          || projection.canonicalApplicationFrame?.resultFrame !== body
          || body.canonicalImperfectiveSourceFrame !== source) {
          return {authorizationStatus:"blocked",blockReason:"classical-vnc-class-independent-applicative-source-required"};
        }
        const coordinate = projection.canonicalApplicationFrame.normalizedRequest;
        const descriptor = {authorizationStatus:"authorized",blockReason:"",sourceKind:sourceMachineryFrame.kind,
          sourceVoice:"active",sourceStem:source.sourceStem,enteredSourceStem:source.sourceStem,
          canonicalSourceStemRecord:source.canonicalSourceStemRecord,sourceClass:"",sourceValence:projection.sourceValence,
          sourceSubject:projection.sourceSubjectFrame.morphologicalAgreement,sourceSubjectParticipantFrame:projection.sourceSubjectFrame,
          mood:coordinate.mood,tense:coordinate.tense,morphologicalMood:coordinate.mood,morphologicalTense:coordinate.tense,
          sourceObjectRequests:projection.sourceObjectRequests,sourceObjectCount:1,
          participantSurfaceSubject:projection.sourceSubjectFrame.morphologicalAgreement,participantSurfaceObjectRequests:projection.sourceObjectRequests,
          finalTypedFrame:typed,formationFinalTypedFrame:typed,formationSourceSignature:"",
          sourceMachineryFrame,formationSourceMachineryFrame:sourceMachineryFrame,
          classIndependentApplicativeSource:true};
        descriptor.sourceSignature=signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceSignaturePayload(descriptor));
        return descriptor;
      }
      const sourceKind = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.kind);
      if (sourceKind === "classical-nahuatl-late-vnc-derivation-operation-machinery-frame") {
        const owner = getClassicalNahuatlVncDerivationRuntimeTarget();
        if (owner?.isClassicalNahuatlMachineryFrame?.(sourceMachineryFrame) !== true) {
          return {authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-late-source-owner-required"};
        }
        const operation = sourceMachineryFrame.operationFrame;
        const finalTypedFrame = operation.targetTypedVncSlotFrame;
        const coordinate = operation.targetCoordinate
          || operation.targetApplicationFrame?.normalizedRequest || {};
        let sourceObjectRequests = (finalTypedFrame.slots.prePredicate || [])
          .map(slot => slot.objectPositionFrame).filter(Boolean)
          .map((position, index) => ({
            objectId: position.objectId || `source-object-${index + 1}`,
            objectKind: position.objectKind,
            objectPerson: position.objectPerson || "",
            objectNumber: position.objectNumber || "",
            governor: position.governor || "directive",
            derivationalLevel: Number(position.derivationalLevel || index + 1),
            // The issued position owns its selected shuntline realization.
            // Returning the late Result to Source must preserve that boundary.
            ...(position.shuntlineReflexivePosition === "late"
              ? { shuntlineReflexivePosition: "late" } : {}),
            ...(position.shuntlineReflexiveBoundaryVariant === "ihyana-contracted"
              ? { shuntlineReflexiveBoundaryVariant: "ihyana-contracted" } : {}),
          }));
        const valenceSlots = (finalTypedFrame.slots.prePredicate || [])
          .filter(slot => /^valence(?:-|$)/u.test(slot.id || ""));
        if (sourceObjectRequests.length !== valenceSlots.length) {
          const prior = getClassicalNahuatlVncDerivationSourceDescriptor(
            operation.sourceMachineryFrame, depth + 1, validationContext);
          const priorSlots = (prior.finalTypedFrame?.slots.prePredicate || [])
            .filter(slot => /^valence(?:-|$)/u.test(slot.id || ""));
          const preserved = prior.authorizationStatus === "authorized"
            && prior.sourceValence === operation.targetValence
            && priorSlots.length === valenceSlots.length
            && valenceSlots.every((slot, index) => slot.va1 === priorSlots[index].va1
              && slot.va2 === priorSlots[index].va2 && slot.carrier === priorSlots[index].carrier);
          if (!preserved) return {authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-late-object-topology-required"};
          sourceObjectRequests = prior.sourceObjectRequests;
        }
        const descriptor = {
          authorizationStatus: "authorized", blockReason: "", sourceKind,
          sourceVoice: "active", sourceStem: operation.targetStem,
          enteredSourceStem: operation.targetStem,
          sourceClass: operation.targetClass, sourceValence: operation.targetValence,
          sourceInitialIKind: operation.targetApplicationFrame?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind || "",
          sourceSubject: coordinate.subject,
          mood: coordinate.mood, tense: coordinate.tense,
          morphologicalMood: coordinate.mood, morphologicalTense: coordinate.tense,
          sourceObjectRequests, sourceObjectCount: sourceObjectRequests.length,
          finalTypedFrame, formationFinalTypedFrame: finalTypedFrame,
          formationSourceSignature: "", formationSourceMachineryFrame: sourceMachineryFrame,
          participantSurfaceSubject: coordinate.subject,
          participantSurfaceObjectRequests: sourceObjectRequests,
          promotedSourceObjectRequest: null, implicitAgentObjectKind: "",
          priorDerivationSignature: finalTypedFrame.semanticIdentity,
          sourceMachineryFrame,
        };
        descriptor.sourceSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceSignaturePayload(descriptor));
        return descriptor;
      }
      const voicedSource = sourceKind === CLASSICAL_NAHUATL_VNC_DERIVATION_VOICE_SOURCE_KIND;
      if (voicedSource) {
        if (sourceMachineryFrame.authorizationStatus !== "authorized") {
          return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-machinery-kind-not-authorized" };
        }
        if (!isCanonicalClassicalNahuatlVncDerivationVoiceSourceMachineryFrame(sourceMachineryFrame, depth + 1, validationContext)) {
          return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-voice-source-not-canonical" };
        }
        const formationDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame.activeMachineryFrame, depth + 1, validationContext);
        const finalTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(sourceMachineryFrame);
        if (formationDescriptor.authorizationStatus !== "authorized" || !isClassicalNahuatlVncDerivationTypedSlotFrame(finalTypedFrame)) {
          return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-voice-source-typed-bases-required" };
        }
        const sourceVoice = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.voice);
        const voiceClusterFrame = sourceMachineryFrame.voiceObjectClusterFrame || null;
        const promotedObjectId = normalizeClassicalNahuatlVncDerivationToken(voiceClusterFrame?.promotedObjectId);
        const promotedSourceObjectRequest = sourceVoice === "passive"
          ? formationDescriptor.sourceObjectRequests.find(request => request.objectId === promotedObjectId)
            || formationDescriptor.sourceObjectRequests.find(request => request.objectKind === "specific-projective")
            || null
          : null;
        const retainedObjectIds = new Set(Array.isArray(voiceClusterFrame?.retainedObjectIds) ? voiceClusterFrame.retainedObjectIds : []);
        const participantSurfaceObjectRequests = sourceVoice === "passive"
          ? Object.freeze(formationDescriptor.sourceObjectRequests.filter(request => request.objectId !== promotedSourceObjectRequest?.objectId && (!voiceClusterFrame || retainedObjectIds.has(request.objectId))))
          : Object.freeze([...formationDescriptor.sourceObjectRequests]);
        const descriptor = {
          authorizationStatus: "authorized",
          blockReason: "",
          sourceKind,
          sourceVoice,
          sourceStem: formationDescriptor.sourceStem,
          enteredSourceStem:
            formationDescriptor.enteredSourceStem
            || formationDescriptor.sourceStem,
          canonicalSourceStemRecord: formationDescriptor.canonicalSourceStemRecord || null,
          sourceLexemeId: formationDescriptor.sourceLexemeId || "",
          sourceInitialIKind: formationDescriptor.sourceInitialIKind || "",
          sourceClass: formationDescriptor.sourceClass,
          sourceValence: formationDescriptor.sourceValence,
          sourceSubject: formationDescriptor.sourceSubject,
          mood: formationDescriptor.mood,
          tense: formationDescriptor.tense,
          paradigmTense: formationDescriptor.paradigmTense || formationDescriptor.tense,
          semanticTenseValue: formationDescriptor.semanticTenseValue || formationDescriptor.tense,
          morphologicalMood: formationDescriptor.morphologicalMood || formationDescriptor.mood,
          morphologicalTense: formationDescriptor.morphologicalTense || formationDescriptor.tense,
          sourceObjectRequests: formationDescriptor.sourceObjectRequests,
          sourceObjectCount: formationDescriptor.sourceObjectCount,
          finalTypedFrame,
          formationFinalTypedFrame: formationDescriptor.finalTypedFrame,
          formationSourceSignature: formationDescriptor.sourceSignature,
          formationSourceMachineryFrame: sourceMachineryFrame.activeMachineryFrame,
          participantSurfaceSubject: normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.subject || sourceMachineryFrame.voiceTransformationFrame?.targetSubject),
          participantSurfaceObjectRequests,
          promotedSourceObjectRequest,
          implicitAgentObjectKind: sourceVoice === "inherent-impersonal" ? "" : "nonspecific-human",
          priorDerivationSignature: signClassicalNahuatlVncDerivationValue(getClassicalNahuatlNominalVoiceSourceSignaturePayload(sourceMachineryFrame, formationDescriptor.sourceSignature)),
          sourceMachineryFrame
        };
        descriptor.sourceSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceSignaturePayload(descriptor));
        return descriptor;
      }
      const derivedSource = sourceKind === "classical-nahuatl-vnc-derived-machinery-frame";
      if (!derivedSource && !CLASSICAL_NAHUATL_VNC_DERIVATION_BASE_SOURCE_KINDS.includes(sourceKind)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-machinery-kind-not-authorized" };
      }
      if (derivedSource && !isCanonicalClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, depth + 1, validationContext)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-derived-source-signature-invalid" };
      }
      if (!derivedSource && !isCanonicalClassicalNahuatlVncDerivationBaseSourceMachineryFrame(sourceMachineryFrame, validationContext)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-base-source-not-canonical" };
      }
      const finalTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(sourceMachineryFrame);
      const proofAuthorized = sourceMachineryFrame.authorizationStatus === "authorized" && sourceMachineryFrame.proofFrame?.authorizationStatus === "authorized" && sourceMachineryFrame.proofFrame?.conclusion?.authorized === true;
      if (!proofAuthorized || !isClassicalNahuatlVncDerivationTypedSlotFrame(finalTypedFrame)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-authorized-typed-source-required" };
      }
      const proofConclusion = sourceMachineryFrame.proofFrame.conclusion || {};
      const typedPredicateStem = normalizeClassicalNahuatlVncDerivationStem(finalTypedFrame.slots.predicate?.stem);
      const fusedSource = sourceMachineryFrame.tlaFusionRuleFrame?.fused === true;
      const sourceStem = normalizeClassicalNahuatlVncDerivationStem(
        fusedSource ? sourceMachineryFrame.tlaFusionRuleFrame.derivedStem
          : proofConclusion.sourceVerbstem || proofConclusion.classTargetStem || proofConclusion.verbstem
      );
      // Canonical final boundary realization may remove an imaginary initial i.
      // Compare the final typed predicate with that issued boundary, while the
      // separate Source identities below retain the underlying stem.
      const canonicalTypedPredicateStem = normalizeClassicalNahuatlVncDerivationStem(
        proofConclusion.finalBoundaryRealizationFrame?.typedSlotFrame?.slots?.predicate?.stem
          || proofConclusion.predicateExpectedStemVariant
          || proofConclusion.stemVariant
          || typedPredicateStem
      );
      const sourceLexicalKey = getClassicalNahuatlVncDerivationLexicalKey(sourceStem);
      const typedPredicateLexicalKey = getClassicalNahuatlVncDerivationLexicalKey(typedPredicateStem);
      const canonicalTypedPredicateLexicalKey = getClassicalNahuatlVncDerivationLexicalKey(canonicalTypedPredicateStem);
      const stemContinuityCandidates = [
        sourceMachineryFrame.targetStem,
        sourceMachineryFrame.sourceVerbstem,
        sourceMachineryFrame.stem,
        sourceMachineryFrame.classTargetStem,
        sourceMachineryFrame.classRuleFrame?.stem,
        sourceMachineryFrame.classRuleFrame?.sourceVerbstem,
        proofConclusion.verbstem,
        proofConclusion.stemAsFormulaPredicate,
        proofConclusion.classTargetStem,
        proofConclusion.sourceVerbstem
      ].map(normalizeClassicalNahuatlVncDerivationStem).filter(Boolean);
      const stemContinuityLexicalKeys = (fusedSource
        ? [sourceMachineryFrame.classTargetStem, sourceMachineryFrame.classRuleFrame?.stem,
          proofConclusion.classTargetStem, sourceMachineryFrame.tlaFusionRuleFrame.derivedStem]
        : stemContinuityCandidates).map(getClassicalNahuatlVncDerivationLexicalKey).filter(Boolean);
      if (!sourceLexicalKey || !typedPredicateLexicalKey || typedPredicateLexicalKey !== canonicalTypedPredicateLexicalKey || !stemContinuityLexicalKeys.length || stemContinuityLexicalKeys.some(candidate => candidate !== sourceLexicalKey)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-stem-continuity-failed" };
      }
      const sourceClass = normalizeClassicalNahuatlVncDerivationToken(proofConclusion.classId).toUpperCase();
      const classContinuityCandidates = [
        sourceMachineryFrame.targetClass,
        sourceMachineryFrame.classId,
        sourceMachineryFrame.classRuleFrame?.classId,
        sourceMachineryFrame.classProfile?.classId,
        proofConclusion.classId
      ].map(value => normalizeClassicalNahuatlVncDerivationToken(value).toUpperCase()).filter(Boolean);
      if (!["A", "B", "C", "D"].includes(sourceClass) || !classContinuityCandidates.length || classContinuityCandidates.some(candidate => candidate !== sourceClass)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-class-continuity-failed" };
      }
      const typedValenceSlots = (finalTypedFrame.slots.prePredicate || []).filter(slot => /^valence(?:-|$)/u.test(slot?.id || ""));
      const sourceObjectRequests = getClassicalNahuatlVncDerivationSourceObjectRequests(sourceMachineryFrame, sourceStem, finalTypedFrame);
      if (!sourceObjectRequests) {
        return { authorizationStatus: "blocked", blockReason: typedValenceSlots.length ? "classical-vnc-derivation-source-object-slot-continuity-failed" : "classical-vnc-derivation-source-identity-or-object-contract-invalid" };
      }
      if (!areClassicalNahuatlVncDerivationObjectRequestsValid(sourceObjectRequests, { maximumCount: 3 })) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-identity-or-object-contract-invalid" };
      }
      if (typedValenceSlots.length !== sourceObjectRequests.length) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-object-slot-continuity-failed" };
      }
      const canonicalBaseValence = normalizeClassicalNahuatlVncDerivationToken(proofConclusion.classTargetValence);
      const canonicalShuntlineReflexive = canonicalBaseValence === "shuntline-reflexive"
        && sourceMachineryFrame.priorVncFrame?.objectFrame?.prominence === "shuntline";
      const expectedTypedValenceArity = sourceObjectRequests.length > 1
        ? "multiple"
        : sourceObjectRequests.length === 0
          ? "vacant"
          : sourceObjectRequests[0].objectKind === "specific-projective"
            || (sourceObjectRequests[0].objectKind === "reflexive" && !canonicalShuntlineReflexive)
            ? "dyadic"
            : "monadic";
      if (finalTypedFrame.valenceArity !== expectedTypedValenceArity) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-object-slot-continuity-failed" };
      }
      const baseValenceContinuityCandidates = [
        fusedSource ? "" : sourceMachineryFrame.citationRuleFrame?.valence,
        sourceMachineryFrame.classTargetValence,
        sourceMachineryFrame.classRuleFrame?.classTargetValence,
        proofConclusion.classTargetValence
      ].map(normalizeClassicalNahuatlVncDerivationToken).filter(Boolean);
      if (!canonicalBaseValence || !baseValenceContinuityCandidates.length || baseValenceContinuityCandidates.some(candidate => candidate !== canonicalBaseValence)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-valence-continuity-failed" };
      }
      const sourceValence = sourceObjectRequests.length > 1 ? "multiple-object" : canonicalBaseValence;
      const outerValence = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.valence);
      if (outerValence && outerValence !== sourceValence) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-valence-continuity-failed" };
      }
      if (sourceObjectRequests.length === 0 && sourceValence !== "intransitive" || sourceObjectRequests.length === 1 && sourceValence === "intransitive") {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-valence-continuity-failed" };
      }
      const { mood, tense, paradigmTense, semanticTenseValue, morphologicalMood, morphologicalTense } = getClassicalNahuatlVncDerivationSemanticEnvironment(sourceMachineryFrame);
      const typedSubjectCandidates = getClassicalNahuatlVncDerivationTypedSubjectCandidates(finalTypedFrame, {
        stem: typedPredicateStem,
        mood: morphologicalMood,
        tense: morphologicalTense,
        canonicalIrregularPlan: sourceMachineryFrame.lesson11ParadigmPlan || null
      });
      if (typedSubjectCandidates.length !== 1) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-subject-continuity-failed" };
      }
      const sourceSubject = typedSubjectCandidates[0];
      const participantProvenance = runtime.getClassicalNahuatlVncMachineryParticipantProvenance?.(sourceMachineryFrame);
      const sourceParticipant = participantProvenance?.subjectFrame;
      const sourceSubjectParticipantFrame = isClassicalNahuatlParticipantFrame(sourceParticipant)
        && Object.isFrozen(sourceParticipant) && sourceParticipant.role === "subject"
        && sourceParticipant.morphologicalAgreement === sourceSubject
        ? sourceParticipant : null;
      const subjectContinuityCandidates = [
        sourceMachineryFrame.targetSubject,
        sourceMachineryFrame.priorVncFrame?.subject,
        sourceMachineryFrame.priorVncFrame?.personDyad?.subject,
        sourceMachineryFrame.multipleObjectClusterFrame?.subject
      ].map(normalizeClassicalNahuatlVncDerivationToken).filter(Boolean);
      if (!subjectContinuityCandidates.length || subjectContinuityCandidates.some(candidate => candidate !== sourceSubject)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-subject-continuity-failed" };
      }
      const canonicalSourceStemRecord = getClassicalNahuatlVncDerivationCanonicalSourceStemRecord(sourceStem, sourceValence);
      const canonicalSourceSelectionFrame =
        sourceMachineryFrame.canonicalSourceSelectionFrame || null;
      const canonicalSourceSelectionAuthorized = Boolean(
        canonicalSourceSelectionFrame
        && typeof getClassicalNahuatlVncDerivationRuntimeTarget()
          ?.isClassicalNahuatlCanonicalSourceSelectionFrame === "function"
        && getClassicalNahuatlVncDerivationRuntimeTarget()
          .isClassicalNahuatlCanonicalSourceSelectionFrame(
            canonicalSourceSelectionFrame,
          )
        && canonicalSourceSelectionFrame.canonicalStem === sourceStem
        && (
          canonicalSourceStemRecord
            ? canonicalSourceSelectionFrame.openStemSource === false
              && canonicalSourceSelectionFrame.canonicalRecord
                === canonicalSourceStemRecord
            : canonicalSourceSelectionFrame.openStemSource === true
              && canonicalSourceSelectionFrame.canonicalRecord === null
              && canonicalSourceSelectionFrame.verbClass === sourceClass
              && canonicalSourceSelectionFrame.valence === sourceValence
        )
      );
      if (
        canonicalSourceStemRecord?.sourceLexemeSelectionRequired === true
        && !canonicalSourceSelectionAuthorized
      ) {
        return {
          authorizationStatus: "blocked",
          blockReason:
            "classical-vnc-derivation-canonical-source-lexeme-required",
        };
      }
      const descriptor = {
        authorizationStatus: "authorized",
        blockReason: "",
        sourceKind,
        sourceVoice: "active",
        sourceStem,
        enteredSourceStem: canonicalSourceSelectionAuthorized
          ? canonicalSourceSelectionFrame.enteredStem
          : sourceStem,
        canonicalSourceStemRecord,
        canonicalSourceSelectionFrame:
          canonicalSourceSelectionAuthorized
            ? canonicalSourceSelectionFrame
            : null,
        sourceLexemeId: canonicalSourceSelectionAuthorized
          ? canonicalSourceSelectionFrame.sourceLexemeId
          : "",
        sourceInitialIKind: getClassicalNahuatlVncDerivationSourceInitialIKind(canonicalSourceStemRecord, sourceMachineryFrame),
        sourceClass,
        sourceValence,
        sourceSubject,
        ...(sourceSubjectParticipantFrame ? {sourceSubjectParticipantFrame} : {}),
        mood,
        tense,
        paradigmTense,
        semanticTenseValue,
        morphologicalMood,
        morphologicalTense,
        sourceObjectRequests,
        sourceObjectCount: sourceObjectRequests.length,
        finalTypedFrame,
        formationFinalTypedFrame: finalTypedFrame,
        formationSourceSignature: "",
        formationSourceMachineryFrame: sourceMachineryFrame,
        participantSurfaceSubject: sourceSubject,
        participantSurfaceObjectRequests: sourceObjectRequests,
        promotedSourceObjectRequest: null,
        implicitAgentObjectKind: "",
        priorDerivationSignature: derivedSource ? sourceMachineryFrame.canonicalSignature : "",
        sourceMachineryFrame
      };
      descriptor.sourceSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceSignaturePayload(descriptor));
      return descriptor;
    }
    function isClassicalNahuatlVncDerivationSourceMachineryFrame(frame = null) {
      // An abstract argument context supports morphology, never a base finite.
      if (frame?.kind===ANALYTICAL_ARGUMENT_CONTEXT_KIND) return false;
      // A private finite Result can feed the class-independent applicative
      // consumer without becoming a primitive Source in public navigation.
      if (getClassicalNahuatlVncDerivationRuntimeTarget().isClassicalNahuatlImperfectiveVncApplicationFrame?.(frame) === true) return false;
      return getClassicalNahuatlVncDerivationSourceDescriptor(frame, 0, createClassicalNahuatlVncDerivationValidationContext()).authorizationStatus === "authorized";
    }
    function isClassicalNahuatlVncDerivationBaseSourceMachineryFrame(frame = null) {
      // Shared lower-frame qualification, without admitting a new derivation.
      // Never accept a caller-owned validation cache as proof of reconstruction.
      return isCanonicalClassicalNahuatlVncDerivationBaseSourceMachineryFrame(
        frame,
        createClassicalNahuatlVncDerivationValidationContext(),
      );
    }
    function sourceUsesClassicalNahuatlLongVowelNotation(stem = "") {
      return /[āēīō]/u.test(normalizeClassicalNahuatlVncDerivationStem(stem));
    }
    function getClassicalNahuatlVncDerivationLongSuffix(stem = "", marked = "", unmarked = "") {
      return sourceUsesClassicalNahuatlLongVowelNotation(stem) ? marked : unmarked;
    }
    function joinClassicalNahuatlVncDerivationMorphemes(...parts) {
      return parts.map(part => normalizeClassicalNahuatlVncDerivationStem(part).replace(/^-+|-+$/gu, "")).filter(Boolean).join("-");
    }
    function buildClassicalNahuatlVncDerivationBoundarySpellingFrame(sourceStem = "", retainedStem = "", followingMorpheme = "") {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.buildClassicalNahuatlDerivationalBoundarySpellingFrame !== "function") {
        throw new Error("Classical derivation requires the canonical transcription boundary-spelling capability");
      }
      const frame = runtimeTarget.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
        sourceStem,
        retainedStem,
        followingMorpheme
      });
      if (frame?.authorizationStatus !== "authorized") {
        throw new Error(`Classical Lesson 2 boundary spelling blocked: ${frame?.blockReason || "unknown reason"}`);
      }
      return frame;
    }
    function replaceClassicalNahuatlVncDerivationRightEdge(stem = "", removeCharacterCount = 0, ...morphemes) {
      const normalizedStem = normalizeClassicalNahuatlVncDerivationStem(stem);
      const retainedStem = normalizedStem.slice(0, Math.max(0, normalizedStem.length - Number(removeCharacterCount || 0))).replace(/-+$/gu, "");
      if (!morphemes[0]) {
        return joinClassicalNahuatlVncDerivationMorphemes(retainedStem);
      }
      const boundaryFrame = buildClassicalNahuatlVncDerivationBoundarySpellingFrame(normalizedStem, retainedStem, morphemes[0]);
      return joinClassicalNahuatlVncDerivationMorphemes(boundaryFrame.realizedRetainedStem, ...morphemes);
    }
    function replaceClassicalNahuatlVncDerivationRightEdgeBeforeVowel(stem = "", removeCharacterCount = 0, followingVowel = "", ...remainingMorphemes) {
      const normalizedStem = normalizeClassicalNahuatlVncDerivationStem(stem);
      const retainedStem = normalizedStem.slice(0, Math.max(0, normalizedStem.length - Number(removeCharacterCount || 0))).replace(/-+$/gu, "");
      const boundaryFrame = buildClassicalNahuatlVncDerivationBoundarySpellingFrame(normalizedStem, retainedStem, followingVowel);
      return joinClassicalNahuatlVncDerivationMorphemes(boundaryFrame.realizedRetainedStem, followingVowel, ...remainingMorphemes);
    }
    function replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(stem = "", removeCharacterCount = 0, replacementSegment = "") {
      const normalizedStem = normalizeClassicalNahuatlVncDerivationStem(stem);
      const retainedStem = normalizedStem.slice(0, Math.max(0, normalizedStem.length - Number(removeCharacterCount || 0))).replace(/-+$/gu, "");
      const normalizedReplacement = normalizeClassicalNahuatlVncDerivationToken(replacementSegment).replace(/^-+|-+$/gu, "");
      const boundaryFrame = buildClassicalNahuatlVncDerivationBoundarySpellingFrame(normalizedStem, retainedStem, normalizedReplacement);
      return `${boundaryFrame.realizedRetainedStem}${normalizedReplacement}`;
    }
    function getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(frame = {}) {
      return {
        sourceSignature: frame.sourceSignature || "",
        sourceVoice: frame.sourceVoice || "active",
        formationSourceSignature: frame.formationSourceSignature || "",
        sourceStem: frame.sourceStem || "",
        sourceLexemeId: frame.sourceLexemeId || "",
        lexicalStem: frame.lexicalStem || "",
        sourceClass: frame.sourceClass || "",
        sourceValence: frame.sourceValence || "",
        participantSourceTypedIdentity: frame.participantSourceTypedIdentity || "",
        participantSurfaceSubject: frame.participantSurfaceSubject || "",
        participantSurfaceObjectRequests: frame.participantSurfaceObjectRequests || [],
        promotedSourceObjectRequest: frame.promotedSourceObjectRequest || null,
        implicitAgentObjectKind: frame.implicitAgentObjectKind || "",
        explicitBoundaryObserved: frame.explicitBoundaryObserved === true,
        boundaryAuthority: frame.boundaryAuthority || "",
        morphemicSourceProfile: frame.morphemicSourceProfile || null,
        analyses: frame.analyses || [],
        authorizationStatus: frame.authorizationStatus || "",
        blockReason: frame.blockReason || "",
        callerSuppliedAnalysisAllowed: frame.callerSuppliedAnalysisAllowed,
        formulaArtifactAuthority: frame.formulaArtifactAuthority,
        surfaceArtifactAuthority: frame.surfaceArtifactAuthority
      };
    }
    function buildClassicalNahuatlVncDerivationSourceAnalysisFromDescriptor(sourceDescriptor = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.buildClassicalNahuatlStemFinalShapeFrame !== "function" || typeof runtimeTarget?.buildClassicalNahuatlActiveStemIdentityFrame !== "function") {
        return null;
      }
      const sourceFinalShapeFrame = runtimeTarget.buildClassicalNahuatlStemFinalShapeFrame(sourceDescriptor.sourceStem);
      const sourceIdentityFrame = runtimeTarget.buildClassicalNahuatlActiveStemIdentityFrame(sourceDescriptor.sourceStem, {
        verbClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence
      });
      if (sourceFinalShapeFrame?.authorizationStatus !== "authorized" || sourceFinalShapeFrame.stem !== sourceDescriptor.sourceStem || sourceIdentityFrame?.authorizationStatus !== "authorized" || sourceIdentityFrame.enteredStem !== sourceDescriptor.sourceStem) {
        return null;
      }
      const lexicalStem = getClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem);
      const analyses = [];
      const analysisIds = new Set();
      const buildStockVowelHarmonyFrame = (root = "", stockFormative = "", stemFormative = "", lexicalStatus = "") => {
        const normalizedRoot = normalizeClassicalNahuatlVncDerivationStem(root).replace(/^-+|-+$/gu, "");
        const normalizedStock = normalizeClassicalNahuatlVncDerivationStem(stockFormative).replace(/^-+|-+$/gu, "");
        const normalizedTheme = normalizeClassicalNahuatlVncDerivationStem(stemFormative).replace(/^-+|-+$/gu, "");
        if (!normalizedRoot || !/^[āēīō]$/u.test(normalizedStock) || !["ni", "hui"].includes(normalizedTheme)) {
          return null;
        }
        const rootVowels = normalizedRoot.match(/[aeioāēīō]/gu) || [];
        const rootVowel = rootVowels.at(-1) || "";
        const rootVowelQuantity = /^[aeio]$/u.test(rootVowel)
          ? "short" : /^[āēīō]$/u.test(rootVowel) ? "long" : "unresolved";
        const normalRuleApplicable = rootVowelQuantity === "short";
        const regularLongStockHarmony = CLASSICAL_NAHUATL_DESTOCKAL_LONG_STOCK_HARMONY;
        const realization = regularLongStockHarmony.realizationsByRootVowel[rootVowel];
        const expectedStockFormative = realization?.default || "";
        const allowedStockFormatives = Object.freeze([
          ...(expectedStockFormative ? [expectedStockFormative] : []),
          ...(normalizedTheme === "hui" && realization?.withHuiAlternative
            ? [realization.withHuiAlternative] : []),
        ]);
        const regularHarmony = allowedStockFormatives.includes(normalizedStock);
        const exceptionalAnalysis = normalRuleApplicable && !regularHarmony;
        const lexicalExceptionLicensed = exceptionalAnalysis
          && lexicalStatus === "lexically-licensed-source-analysis";
        return Object.freeze({
          kind: "classical-nahuatl-destockal-stock-vowel-harmony-frame",
          version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
          authorizationStatus: "authorized",
          root: normalizedRoot,
          rootVowel,
          rootVowelQuantity,
          normalRuleApplicable,
          stockFormative: normalizedStock,
          stemFormative: normalizedTheme,
          expectedStockFormative,
          allowedStockFormatives,
          regularLongStockHarmony,
          relation: !normalRuleApplicable
            ? rootVowelQuantity === "long"
              ? "outside-normal-short-root-domain"
              : "root-vowel-cue-unresolved"
            : regularHarmony
              ? "regular-root-vowel-harmony"
              : "exceptional-stock-vowel-analysis",
          regularHarmony,
          exceptionalAnalysis,
          lexicalExceptionLicensed,
          exceptionAuthority: !exceptionalAnalysis ? ""
            : lexicalExceptionLicensed ? "typed-lexical-source-analysis"
              : "source-analysis-selection-required",
          userChoiceRequired: exceptionalAnalysis && !lexicalExceptionLicensed,
          surfaceShapeExceptionAuthority: false,
          canvasExampleAuthority: false,
          callerSuppliedGrammarAuthority: false
        });
      };
      const buildShortStockVowelSelectionFrame = (root = "", stockFormative = "", stemFormative = "") => {
        const normalizedRoot = normalizeClassicalNahuatlVncDerivationStem(root).replace(/^-+|-+$/gu, "");
        const normalizedStock = normalizeClassicalNahuatlVncDerivationStem(stockFormative).replace(/^-+|-+$/gu, "");
        const normalizedTheme = normalizeClassicalNahuatlVncDerivationStem(stemFormative).replace(/^-+|-+$/gu, "");
        if (!normalizedRoot || !["i", "a", "o"].includes(normalizedStock) || normalizedTheme !== "hui") {
          return null;
        }
        const rootVowels = normalizedRoot.match(/[aeioāēīō]/gu) || [];
        const rootVowel = rootVowels.at(-1) || "";
        const rootFinalLOverride = normalizedRoot.endsWith("l");
        const expectedStockFormative = rootFinalLOverride
          ? "i"
          : /[aeāē]/u.test(rootVowel)
            ? "i"
            : /[ioīō]/u.test(rootVowel)
              ? "a"
              : "";
        const specialOHui = normalizedStock === "o";
        const regularSelection = !specialOHui
          && Boolean(expectedStockFormative)
          && expectedStockFormative === normalizedStock;
        return Object.freeze({
          kind: "classical-nahuatl-destockal-short-stock-vowel-selection-frame",
          version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
          authorizationStatus: "authorized",
          root: normalizedRoot,
          rootVowel,
          rootFinalLOverride,
          stockFormative: normalizedStock,
          stemFormative: normalizedTheme,
          expectedStockFormative,
          relation: specialOHui
            ? "special-o-hui-source"
            : !expectedStockFormative
              ? "root-vowel-cue-unresolved"
              : regularSelection
                ? "regular-short-stock-selection"
                : "exceptional-short-stock-analysis",
          regularSelection,
          specialOHui,
          exceptionalAnalysis: Boolean(!specialOHui && expectedStockFormative && !regularSelection),
          userChoiceRequired: Boolean(!specialOHui && expectedStockFormative && !regularSelection),
          canvasExampleAuthority: false,
          callerSuppliedGrammarAuthority: false
        });
      };
      const getDestockalTypeId = (
        category = "",
        stockFormative = "",
        stemFormative = "",
      ) => {
        if (!String(category).includes("destockal")) return "";
        const longStock = /^[āēīō]$/u.test(stockFormative);
        const shortStock = /^[aeio]$/u.test(stockFormative);
        if (longStock && ["ni", "hui"].includes(stemFormative)) {
          return "long-vowel-ni-or-hui";
        }
        if (longStock && stemFormative === "hua") {
          return "long-vowel-hua";
        }
        if (shortStock && stemFormative === "hui") {
          return "short-vowel-hui";
        }
        return "";
      };
      const buildDestockalStructureFrame = ({
        category = "",
        root = "",
        stockFormative = "",
        stemFormative = "",
      } = {}) => {
        const typeId = getDestockalTypeId(
          category,
          stockFormative,
          stemFormative,
        );
        if (!root || !stockFormative || !stemFormative || !typeId) {
          return null;
        }
        const stock = joinClassicalNahuatlVncDerivationMorphemes(
          root,
          stockFormative,
        );
        const verbstem = joinClassicalNahuatlVncDerivationMorphemes(
          stock,
          stemFormative,
        );
        return Object.freeze({
          kind: "classical-nahuatl-destockal-structure-frame",
          version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
          authorizationStatus: "authorized",
          definition: Object.freeze({
            term: "destockal-verbstem",
            processKind: "stock-mediated-two-step-derivation",
            processStepCount: 2,
            intermediateRank: "stock",
          }),
          rankTopology: Object.freeze({
            order: Object.freeze(["root", "stock", "stem"]),
            finalRankSubtype: "intransitive-verbstem",
          }),
          rankPrivileges: Object.freeze({
            rootToVerbstem: "lexically-licensed",
            stockToVerbstem: "forbidden",
            stockRequiresStemFormative: true,
          }),
          steps: Object.freeze({
            stockFormation: Object.freeze({
              ordinal: 1,
              input: root,
              inputRank: "root",
              operation: "suffix-derivation",
              formative: stockFormative,
              formativeRole: "stock-formative",
              output: stock,
              outputRank: "stock",
            }),
            stemFormation: Object.freeze({
              ordinal: 2,
              input: stock,
              inputRank: "stock",
              operation: "suffix-derivation",
              formative: stemFormative,
              formativeRoles: Object.freeze(["stem-formative", "theme"]),
              output: verbstem,
              outputRank: "intransitive-verbstem",
            }),
          }),
          typeId,
          typeInventory: CLASSICAL_NAHUATL_DESTOCKAL_TYPE_INVENTORY,
          classSystemFrame: typeId === "long-vowel-ni-or-hui"
            ? CLASSICAL_NAHUATL_DESTOCKAL_NI_HUI_CLASS_SYSTEM_FRAME
            : null,
          typedRankRestrictionOnly: true,
          surfaceShapeIsNotAnAdmissionGate: true,
          canvasExampleAuthority: false,
          callerSuppliedGrammarAuthority: false,
        });
      };
      const buildThemeFrame = ({
        category = "",
        root = "",
        stockFormative = "",
        stemFormative = "",
        themeHostRank = "",
      } = {}) => {
        const isDestockal = String(category).includes("destockal");
        const isYa = String(category).includes("root-plus-ya")
          && stemFormative === "ya";
        if ((!isDestockal && !isYa) || !root || !stemFormative) {
          return null;
        }
        const hostRank = isDestockal
          ? "stock"
          : themeHostRank === "verbstem" ? "verbstem" : "root";
        const host = isDestockal
          ? joinClassicalNahuatlVncDerivationMorphemes(root, stockFormative)
          : root;
        return Object.freeze({
          kind: "classical-nahuatl-theme-formation-frame",
          version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
          authorizationStatus: "authorized",
          formative: stemFormative,
          role: "stem-formative",
          terminology: Object.freeze({
            preferredTerm: "theme",
            exactTerm: "thematic-morpheme",
          }),
          function: "attach-to-a-morphological-unit-to-create-a-stem",
          inputRank: "morphological-unit",
          possibleOutputRanks: Object.freeze(["verbstem", "nounstem"]),
          host,
          hostRank,
          outputRank: isDestockal
            ? "intransitive-verbstem" : "verbstem",
          normalHostRanks: Object.freeze(
            isYa ? ["root", "verbstem"] : [hostRank],
          ),
          canvasExampleAuthority: false,
          callerSuppliedGrammarAuthority: false,
        });
      };
      const addAnalysis = ({ analysisId = "", category = "", segments = [], root = "", stockFormative = "", stemFormative = "", themeHostRank = "", analysisAuthority = "andrews-final-shape-category", lexicalStatus = "shape-licensed-candidate", andrewsSections = [], sourceAnalysisSelectionRequired = false, shortHuiCausativeRelationFrame = null, lexicalReadings = [], reconstructionDisposition = null } = {}) => {
        const normalizedSegments = segments.map(segment => normalizeClassicalNahuatlVncDerivationStem(segment).replace(/^-+|-+$/gu, "")).filter(Boolean);
        if (!analysisId || !category || analysisIds.has(analysisId)) {
          return;
        }
        analysisIds.add(analysisId);
        const normalizedRoot = normalizeClassicalNahuatlVncDerivationStem(root).replace(/^-+|-+$/gu, "");
        const normalizedStockFormative = normalizeClassicalNahuatlVncDerivationStem(stockFormative).replace(/^-+|-+$/gu, "");
        const normalizedStemFormative = normalizeClassicalNahuatlVncDerivationStem(stemFormative).replace(/^-+|-+$/gu, "");
        const shortStockVowelSelectionFrame = buildShortStockVowelSelectionFrame(
          normalizedRoot,
          normalizedStockFormative,
          normalizedStemFormative,
        );
        const destockalStructureFrame = buildDestockalStructureFrame({
          category,
          root: normalizedRoot,
          stockFormative: normalizedStockFormative,
          stemFormative: normalizedStemFormative,
        });
        const themeFrame = buildThemeFrame({
          category,
          root: normalizedRoot,
          stockFormative: normalizedStockFormative,
          stemFormative: normalizedStemFormative,
          themeHostRank,
        });
        // §§24.5.9 and 24.6.2 mark the underlying source as reconstructed. This lexical
        // annotation neither generates a stem nor makes a starred input nonextant.
        const reconstructionNotationFrame = reconstructionDisposition
          && ["long-vowel-ni-or-hui", "long-vowel-hua"].includes(destockalStructureFrame?.typeId)
          ? Object.freeze({
            kind: "classical-nahuatl-destockal-reconstruction-notation-frame",
            notation: "*",
            notationScope: "underlying-destockal-source",
            status: "reconstructed-underlying-source-of-extant-fused-stem",
            underlyingStem: destockalStructureFrame.steps.stemFormation.output,
            extantSourceStem: reconstructionDisposition.extantSourceStem,
            destockalStructureFrame,
            grammarAuthority: false,
            sourceAdmissionAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
            canvasExampleAuthority: false,
            callerSuppliedGrammarAuthority: false,
          }) : null;
        analyses.push(Object.freeze({
          analysisId,
          category,
          segments: Object.freeze(normalizedSegments),
          root: normalizedRoot,
          stockFormative: normalizedStockFormative,
          stemFormative: normalizedStemFormative,
          destockalStructureFrame,
          themeFrame,
          ...(reconstructionNotationFrame ? { reconstructionNotationFrame } : {}),
          lexicalReadings: Object.freeze([...lexicalReadings]),
          stockVowelHarmonyFrame: buildStockVowelHarmonyFrame(
            normalizedRoot,
            normalizedStockFormative,
            normalizedStemFormative,
            lexicalStatus,
          ),
          shortStockVowelSelectionFrame,
          shortHuiCausativeRelationFrame,
          analysisAuthority,
          lexicalStatus,
          andrewsSections: Object.freeze([...andrewsSections]),
          sourceAnalysisSelectionRequired: sourceAnalysisSelectionRequired === true
            || shortStockVowelSelectionFrame?.userChoiceRequired === true,
          userAuthoredBoundaryRequired: false
        }));
      };
      const exactWitness = CLASSICAL_NAHUATL_LESSONS24_25_SOURCE_ANALYSIS_WITNESSES.find(witness => witness.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias))) || null;
      if (exactWitness) {
        exactWitness.categories.forEach(category => addAnalysis({
          analysisId: `${exactWitness.analysisId}:${category}`,
          category,
          segments: exactWitness.canonicalSegments,
          root: exactWitness.canonicalRoot
            || (["denominal-ti-candidate", "root-plus-ya"].includes(category)
              ? exactWitness.canonicalSegments.slice(0, -1).join("-")
              : exactWitness.canonicalSegments[0])
            || "",
          stockFormative: category.includes("destockal")
            && exactWitness.canonicalSegments.length > 2
            ? exactWitness.canonicalSegments.at(-2) : "",
          stemFormative: exactWitness.canonicalSegments.at(-1) || "",
          themeHostRank: exactWitness.themeHostRank || "",
          analysisAuthority: "typed-lexical-source-analysis",
          lexicalStatus: "lexically-licensed-source-analysis",
          andrewsSections: exactWitness.andrewsSections,
          lexicalReadings: exactWitness.lexicalReadings || [],
          reconstructionDisposition: ["fused-destockal-ni-exact", "fused-destockal-hui-exact", "fused-destockal-hua-exact"].includes(category)
            ? exactWitness.reconstructionDisposition : null,
        }));
      }
      const destockalOaMatch = lexicalStem.match(/^(.*?)([iao])hui$/u);
      if (destockalOaMatch?.[1] && (!exactWitness || exactWitness.categories.includes("destockal-i-a-o-hui"))) {
        const exactNegativeShortHui = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_NEGATIVE_LICENSES.find((license) => (
          hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem)
          && license.sourceClass === sourceDescriptor.sourceClass
          && license.sourceValence === sourceDescriptor.sourceValence
        )) || null;
        addAnalysis({
          analysisId: `cn-l24-boundary-free-destockal-${destockalOaMatch[2]}-hui:${lexicalStem}`,
          category: "destockal-i-a-o-hui",
          segments: [destockalOaMatch[1], destockalOaMatch[2], "hui"],
          root: destockalOaMatch[1],
          stockFormative: destockalOaMatch[2],
          stemFormative: "hui",
          andrewsSections: ["24.4", "24.7"],
          shortHuiCausativeRelationFrame: exactNegativeShortHui
            ? Object.freeze({
              kind: "classical-nahuatl-short-hui-causative-relation-frame",
              version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
              authorizationStatus: "authorized",
              relation: "exact-o-a-counterpart-blocked",
              blockedRoute: exactNegativeShortHui.blockedRoute,
              andrewsSection: exactNegativeShortHui.andrewsSection,
              reason: exactNegativeShortHui.reason,
              canvasExampleAuthority: false,
              callerSuppliedGrammarAuthority: false
            })
            : Object.freeze({
              kind: "classical-nahuatl-short-hui-causative-relation-frame",
              version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
              authorizationStatus: "authorized",
              relation: destockalOaMatch[2] === "o"
                ? "special-o-hui-to-o-a"
                : "productive-i-a-hui-to-o-a",
              blockedRoute: "",
              andrewsSection: destockalOaMatch[2] === "o" ? "24.7 note 1" : "24.7",
              reason: "",
              canvasExampleAuthority: false,
              callerSuppliedGrammarAuthority: false
            })
        });
      }
      const destockalHuaMatch = lexicalStem.match(/^(.*?)([āē])hua$/u);
      if (destockalHuaMatch?.[1] && !exactWitness?.categories.includes("destockal-long-vowel-hua")) {
        addAnalysis({
          analysisId: `cn-l24-boundary-free-destockal-${destockalHuaMatch[2]}-hua:${lexicalStem}`,
          category: "destockal-long-vowel-hua",
          segments: [destockalHuaMatch[1], destockalHuaMatch[2], "hua"],
          root: destockalHuaMatch[1],
          stockFormative: destockalHuaMatch[2],
          stemFormative: "hua",
          andrewsSections: ["24.4", "24.6"]
        });
      }
      if (lexicalStem.length > 2 && lexicalStem.endsWith("ya") && !exactWitness?.categories.includes("root-plus-ya")) {
        const root = lexicalStem.slice(0, -2);
        const witnessedRootPlusYa = exactWitness?.categories.includes("root-plus-ya") === true;
        addAnalysis({
          analysisId: `cn-l24-25-boundary-free-root-plus-ya:${lexicalStem}`,
          category: "root-plus-ya",
          segments: [root, "ya"],
          root,
          stemFormative: "ya",
          lexicalStatus: witnessedRootPlusYa ? "lexically-licensed-source-analysis" : "shape-licensed-lexical-choice",
          andrewsSections: ["24.3.2.b", "25.4.8", "25.5.2"],
          sourceAnalysisSelectionRequired: !witnessedRootPlusYa
        });
      }
      if (lexicalStem.length > 2
        && lexicalStem.endsWith("ti")
        && !exactWitness?.categories.includes("denominal-ti-candidate")) {
        const root = lexicalStem.slice(0, -2);
        addAnalysis({
          analysisId: `cn-l25-boundary-free-denominal-ti:${lexicalStem}`,
          category: "denominal-ti-candidate",
          segments: [root, "ti"],
          root,
          stemFormative: "ti",
          lexicalStatus: "shape-licensed-lexical-choice",
          andrewsSections: ["25.5.1", "54.2.1"],
          sourceAnalysisSelectionRequired: true
        });
      }
      const longVowelDestockalMatch = lexicalStem.match(/^(.*?)([āēīō])(ni|hui)$/u);
      if (lexicalStem.length > 2 && lexicalStem.endsWith("ni") && !exactWitness?.categories.includes("destockal-ni-candidate")) {
        const root = longVowelDestockalMatch?.[3] === "ni"
          ? longVowelDestockalMatch[1]
          : lexicalStem.slice(0, -2);
        const stockFormative = longVowelDestockalMatch?.[3] === "ni"
          ? longVowelDestockalMatch[2]
          : "";
        addAnalysis({
          analysisId: `cn-l24-boundary-free-destockal-ni:${lexicalStem}`,
          category: "destockal-ni-candidate",
          segments: stockFormative ? [root, stockFormative, "ni"] : [root, "ni"],
          root,
          stockFormative,
          stemFormative: "ni",
          lexicalStatus: "shape-licensed-lexical-choice",
          andrewsSections: ["24.4", "24.5"],
          sourceAnalysisSelectionRequired: true
        });
      }
      if (lexicalStem.length > 3 && lexicalStem.endsWith("hui") && !destockalOaMatch) {
        const root = longVowelDestockalMatch?.[3] === "hui"
          ? longVowelDestockalMatch[1]
          : lexicalStem.slice(0, -3);
        const stockFormative = longVowelDestockalMatch?.[3] === "hui"
          ? longVowelDestockalMatch[2]
          : "";
        addAnalysis({
          analysisId: `cn-l24-boundary-free-destockal-hui:${lexicalStem}`,
          category: "destockal-hui-candidate",
          segments: stockFormative ? [root, stockFormative, "hui"] : [root, "hui"],
          root,
          stockFormative,
          stemFormative: "hui",
          lexicalStatus: "shape-licensed-lexical-choice",
          andrewsSections: ["24.4", "24.5"],
          sourceAnalysisSelectionRequired: true
        });
      }
      const observedMorphemicSourceProfile =
        sourceIdentityFrame.internalMorphology?.morphemicSourceProfile
        || null;
      const underlyingMorphemeSequences = analyses
        .filter(candidate => candidate.segments.length > 1)
        .map(candidate => Object.freeze({
          analysisId: candidate.analysisId,
          category: candidate.category,
          segments: candidate.segments,
          analysisAuthority: candidate.analysisAuthority,
          lexicalStatus: candidate.lexicalStatus,
          sourceAnalysisSelectionRequired:
            candidate.sourceAnalysisSelectionRequired === true,
        }));
      const morphemicSourceProfile = observedMorphemicSourceProfile
        ? Object.freeze({
          ...observedMorphemicSourceProfile,
          observedMorphemicComplexity:
            observedMorphemicSourceProfile.morphemicComplexity,
          morphemicComplexity:
            observedMorphemicSourceProfile.morphemicComplexity
              === "polymorphemic"
              || underlyingMorphemeSequences.length
              ? "polymorphemic"
              : "monomorphemic",
          underlyingMorphemeSequences:
            Object.freeze(underlyingMorphemeSequences),
          fusionPreservesUnderlyingStructure: Boolean(
            observedMorphemicSourceProfile.morphemicComplexity
              === "monomorphemic"
            && underlyingMorphemeSequences.length
          ),
          sourceAnalysisChoiceRequired: underlyingMorphemeSequences.some(
            candidate => candidate.sourceAnalysisSelectionRequired,
          ),
        })
        : null;
      const frame = {
        kind: "classical-nahuatl-vnc-derivation-source-analysis",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        sourceAuthority: "Andrews Lessons 24-25 typed source morphology",
        sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceSignature: sourceDescriptor.sourceSignature,
        sourceVoice: sourceDescriptor.sourceVoice || "active",
        formationSourceSignature: sourceDescriptor.formationSourceSignature || sourceDescriptor.sourceSignature,
        sourceStem: sourceDescriptor.sourceStem,
        sourceLexemeId: sourceDescriptor.sourceLexemeId || "",
        sourceInitialIKind: sourceDescriptor.sourceInitialIKind || "",
        lexicalStem,
        sourceClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence,
        sourceMachineryFrame: sourceDescriptor.sourceMachineryFrame,
        formationSourceMachineryFrame: sourceDescriptor.formationSourceMachineryFrame || sourceDescriptor.sourceMachineryFrame,
        participantSourceTypedIdentity: sourceDescriptor.finalTypedFrame?.semanticIdentity || "",
        participantSurfaceSubject: sourceDescriptor.participantSurfaceSubject || sourceDescriptor.sourceSubject,
        participantSurfaceObjectRequests: sourceDescriptor.participantSurfaceObjectRequests || sourceDescriptor.sourceObjectRequests,
        promotedSourceObjectRequest: sourceDescriptor.promotedSourceObjectRequest || null,
        implicitAgentObjectKind: sourceDescriptor.implicitAgentObjectKind || "",
        sourceFinalShapeFrame,
        sourceIdentityFrame,
        sourceInternalMorphology: sourceIdentityFrame.internalMorphology || null,
        morphemicSourceProfile,
        explicitBoundaryObserved: normalizeClassicalNahuatlVncDerivationStem(
          sourceDescriptor.enteredSourceStem || sourceDescriptor.sourceStem,
        ).includes("-"),
        boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
        analyses: Object.freeze(analyses),
        analysisCount: analyses.length,
        callerSuppliedAnalysisAllowed: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      frame.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(frame));
      Object.freeze(frame);
      classicalNahuatlIssuedVncDerivationSourceAnalysisFrames.add(frame);
      return frame;
    }
    function getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor = {}) {
      return buildClassicalNahuatlVncDerivationSourceAnalysisFromDescriptor(
        getClassicalNahuatlVncDerivationGenerationSourceDescriptor(
          sourceDescriptor,
        ),
      );
    }
    function doesClassicalNahuatlMorphemicSourceProfileAgree(
      analysis = null,
      sourceDescriptor = {},
    ) {
      const profile = analysis?.morphemicSourceProfile || null;
      const shape = analysis?.sourceFinalShapeFrame || null;
      return Boolean(
        analysis?.authorizationStatus === "authorized"
        && profile?.authorizationStatus === "authorized"
        && shape?.authorizationStatus === "authorized"
        && profile.sourceStem === analysis.sourceStem
        && profile.sourceStem === sourceDescriptor.sourceStem
        && profile.sourceClass === analysis.sourceClass
        && profile.sourceClass === sourceDescriptor.sourceClass
        && profile.sourceValence === analysis.sourceValence
        && profile.sourceValence === sourceDescriptor.sourceValence
        && profile.phonologicalShape?.finalLetter === shape.finalLetter
        && profile.edgeStructure?.letterTail?.two === shape.letterTail?.two
        && profile.edgeStructure?.letterTail?.three === shape.letterTail?.three
      );
    }
    function buildClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceMachineryFrame = null) {
      const descriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, 1, createClassicalNahuatlVncDerivationValidationContext());
      if (descriptor.authorizationStatus !== "authorized") {
        return Object.freeze({
          kind: "classical-nahuatl-vnc-derivation-source-analysis",
          version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
          sourceAuthority: "Andrews Lessons 24-25 typed source morphology",
          sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason: descriptor.blockReason,
          sourceSignature: "",
          sourceVoice: "",
          formationSourceSignature: "",
          sourceStem: "",
          sourceLexemeId: "",
          lexicalStem: "",
          sourceClass: "",
          sourceValence: "",
          sourceMachineryFrame: null,
          formationSourceMachineryFrame: null,
          participantSourceTypedIdentity: "",
          participantSurfaceSubject: "",
          participantSurfaceObjectRequests: Object.freeze([]),
          promotedSourceObjectRequest: null,
          implicitAgentObjectKind: "",
          morphemicSourceProfile: null,
          analyses: Object.freeze([]),
          analysisCount: 0,
          callerSuppliedAnalysisAllowed: false,
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false,
          canonicalSignature: ""
        });
      }
      return buildClassicalNahuatlVncDerivationSourceAnalysisFromDescriptor(
        getClassicalNahuatlVncDerivationGenerationSourceDescriptor(
          descriptor,
        ),
      );
    }
    function getComparableClassicalNahuatlVncDerivationSourceAnalysisFrame(frame = {}) {
      return Object.fromEntries(Object.entries(frame).filter(([key]) => !["sourceMachineryFrame", "formationSourceMachineryFrame"].includes(key)));
    }
    function isClassicalNahuatlVncDerivationSourceAnalysisFrameInternal(frame = null, depth = 0, validationContext = null) {
      if (!frame || !classicalNahuatlIssuedVncDerivationSourceAnalysisFrames.has(frame) || frame.kind !== "classical-nahuatl-vnc-derivation-source-analysis" || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION || frame.authorizationStatus !== "authorized" || !frame.sourceSignature || !frame.sourceStem || !frame.lexicalStem || !Array.isArray(frame.analyses) || frame.analysisCount !== frame.analyses.length || frame.callerSuppliedAnalysisAllowed !== false || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH) {
        return false;
      }
      if (validationContext?.sourceAnalyses?.has(frame)) {
        return true;
      }
      if (frame.canonicalSignature !== signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(frame))) {
        return false;
      }
      for (let index = 0; index < frame.analyses.length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(frame.analyses, String(index));
        const analysis = descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value") ? descriptor.value : null;
        if (!analysis?.analysisId || !analysis?.category || !Array.isArray(analysis.segments) || analysis.userAuthoredBoundaryRequired !== false) {
          return false;
        }
      }
      const descriptor = getClassicalNahuatlVncDerivationSourceDescriptor(frame.sourceMachineryFrame, depth + 1, validationContext);
      const rebuilt = descriptor.authorizationStatus === "authorized"
        ? buildClassicalNahuatlVncDerivationSourceAnalysisFromDescriptor(
          getClassicalNahuatlVncDerivationGenerationSourceDescriptor(
            descriptor,
          ),
        )
        : null;
      const canonical = Boolean(rebuilt && frame.sourceSignature === descriptor.sourceSignature && areClassicalNahuatlVncDerivationValuesEqual(getComparableClassicalNahuatlVncDerivationSourceAnalysisFrame(frame), getComparableClassicalNahuatlVncDerivationSourceAnalysisFrame(rebuilt)));
      if (canonical) {
        validationContext?.sourceAnalyses?.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame = null) {
      return isClassicalNahuatlVncDerivationSourceAnalysisFrameInternal(frame, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getClassicalNahuatlVncDerivationSourceAnalysisByCategory(frame = null, category = "") {
      const normalizedCategory = normalizeClassicalNahuatlVncDerivationToken(category);
      const structurallySigned = Boolean(frame
        && classicalNahuatlIssuedVncDerivationSourceAnalysisFrames.has(frame)
        && frame.kind === "classical-nahuatl-vnc-derivation-source-analysis"
        && frame.version === CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION
        && frame.authorizationStatus === "authorized"
        && Array.isArray(frame.analyses)
        && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(
          getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(frame),
        ));
      return structurallySigned ? frame.analyses.find(analysis => analysis.category === normalizedCategory) || null : null;
    }
    function hasClassicalNahuatlVncDerivationSourceAnalysisCategory(frame = null, category = "") {
      return Boolean(getClassicalNahuatlVncDerivationSourceAnalysisByCategory(frame, category));
    }
    function getClassicalNahuatlVncDerivationFinalShapeFingerprint(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        stem: frame.stem,
        orthographicTail: frame.orthographicTail,
        letterTail: frame.letterTail,
        soundTail: frame.soundTail,
        morphemeTail: frame.morphemeTail,
        morphemes: frame.morphemes,
        finalLetter: frame.finalLetter,
        precedingLetter: frame.precedingLetter,
        finalSound: frame.finalSound,
        precedingSound: frame.precedingSound,
        finalVowelLength: frame.finalVowelLength,
        hasMorphemeBoundary: frame.hasMorphemeBoundary
      };
    }
    function getClassicalNahuatlVncDerivationInternalMorphologyFingerprint(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        morphemes: frame.morphemes || [],
        hasExplicitBoundary: frame.hasExplicitBoundary === true,
        explicitRootPlusYaBoundary: frame.explicitRootPlusYaBoundary === true,
        rootPlusYaBoundaryStatus: frame.rootPlusYaBoundaryStatus || "",
        hiddenIntervocalicY: frame.hiddenIntervocalicY === true,
        finalVowelAllomorph: frame.finalVowelAllomorph || "",
        morphemicSourceProfile: frame.morphemicSourceProfile || null
      };
    }
    function hasClassicalNahuatlTwoConsonantClusterBeforeFinalVowel(stem = "") {
      const normalized = normalizeClassicalNahuatlVncDerivationStem(stem).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f-]/gu, "");
      const units = normalized.match(/ch|tl|tz|qu|hu|[aeio]|./gu) || [];
      let finalVowelIndex = -1;
      for (let index = units.length - 1; index >= 0; index -= 1) {
        if (/^[aeio]$/u.test(units[index])) {
          finalVowelIndex = index;
          break;
        }
      }
      if (finalVowelIndex < 0) {
        return false;
      }
      let consonantCount = 0;
      for (let index = finalVowelIndex - 1; index >= 0 && !/^[aeio]$/u.test(units[index]); index -= 1) {
        consonantCount += 1;
      }
      return consonantCount >= 2;
    }
    function hasClassicalNahuatlExactDerivationSourceSelfReference(sourceDescriptor = {}, derivationType = "") {
      const derivationalRoute = derivationType === "causative" || derivationType === "applicative";
      const personCategoryRequiresReflexive = ["1sg", "2sg", "1pl", "2pl"].includes(sourceDescriptor.sourceSubject);
      return Boolean(derivationalRoute && personCategoryRequiresReflexive && sourceDescriptor.sourceObjectRequests?.some(request => (
        request.objectKind === "specific-projective"
        && request.objectPerson === sourceDescriptor.sourceSubject
      )));
    }
    function getClassicalNahuatlVncDerivationOptionSignaturePayload(option = {}) {
      return {
        optionId: option.optionId,
        derivationType: option.derivationType,
        derivationSubtype: option.derivationSubtype,
        derivationRoute: option.derivationRoute || "",
        procedure: option.procedure,
        shuntlineReflexivePosition: option.shuntlineReflexivePosition || "",
        shuntlineReflexiveBoundaryVariant: option.shuntlineReflexiveBoundaryVariant || "",
        underlyingSuffix: option.underlyingSuffix || "",
        suffixLength: option.suffixLength || "",
        sourceStem: option.sourceStem,
        sourceSignature: option.sourceSignature,
        targetStem: option.targetStem,
        stemRelation: option.stemRelation || "",
        targetClass: option.targetClass,
        targetInitialIKind: option.targetInitialIKind || "",
        ruleId: option.ruleId,
        ruleTagId: option.ruleTagId,
        andrewsSection: option.andrewsSection,
        formationLesson: option.formationLesson || "",
        evidenceSections: option.evidenceSections || [],
        scopeModel: option.scopeModel || "",
        scopeSection: option.scopeSection || "",
        scopeRule: option.scopeRule || "",
        participantRule: option.participantRule || "",
        sourceMeaning: option.sourceMeaning || "",
        additionalSourceReadings: Array.isArray(option.additionalSourceReadings)
          ? option.additionalSourceReadings.map(reading => ({
            meaning: reading?.meaning || "",
            relation: reading?.relation || ""
          }))
          : [],
        targetMeaning: option.targetMeaning || "",
        additionalTargetReadings: Array.isArray(option.additionalTargetReadings)
          ? option.additionalTargetReadings.map(reading => ({
            meaning: reading?.meaning || "",
            relation: reading?.relation || ""
          }))
          : [],
        authorityStatus: option.authorityStatus,
        derivationLicenseId: option.derivationLicenseId || "",
        licensedSourceClass: option.licensedSourceClass || "",
        licensedSourceValence: option.licensedSourceValence || "",
        licensedMinimumSourceObjectCount: option.licensedMinimumSourceObjectCount ?? null,
        licensedMaximumSourceObjectCount: option.licensedMaximumSourceObjectCount ?? null,
        licensedLesson20OptionId: option.licensedLesson20OptionId || "",
        licensedLesson20RuleId: option.licensedLesson20RuleId || "",
        licensedLesson20NonactiveStem: option.licensedLesson20NonactiveStem || "",
        licensedLesson20SuffixFamily: option.licensedLesson20SuffixFamily || "",
        lesson20OptionId: option.lesson20OptionId || "",
        lesson20RuleId: option.lesson20RuleId || "",
        lesson20RecordSignature: option.lesson20RecordSignature || "",
        typeTwoBridgeStem: option.typeTwoBridgeStem || "",
        typeTwoBridgeSuffixFamily: option.typeTwoBridgeSuffixFamily || "",
        formulaTargetStem: option.formulaTargetStem || option.targetStem || "",
        typeTwoInternalBridgeSignature:
          option.typeTwoInternalBridgeFrame?.canonicalSignature || "",
        sourceAnalysisSignature: option.sourceAnalysisFrame?.canonicalSignature || "",
        sourceAnalysisId: option.sourceAnalysisId || "",
        destockalClassAssignmentFrame:
          option.destockalClassAssignmentFrame || null,
        sourceAnalysisSelectionRequired: option.sourceAnalysisSelectionRequired === true,
        sourceFinalShapeFrame: getClassicalNahuatlVncDerivationFinalShapeFingerprint(option.sourceFinalShapeFrame),
        sourceInternalMorphology: getClassicalNahuatlVncDerivationInternalMorphologyFingerprint(option.sourceInternalMorphology),
        formationRuleTier: option.formationRuleTier || "",
        productivityStatus: option.productivityStatus || "",
        lexicalChoiceRequired: option.lexicalChoiceRequired === true,
        lexicalEvidenceMatches: option.lexicalEvidenceMatches || [],
        derivationalPreference: option.derivationalPreference || "",
        preferenceRuleId: option.preferenceRuleId || "",
        preferenceAndrewsSection: option.preferenceAndrewsSection || "",
        targetConstruction: option.targetConstruction || null,
        targetEnvironment: option.targetEnvironment || null,
        sourceAttestationFrame: option.sourceAttestationFrame || null,
        implicitAgentObjectKind: option.implicitAgentObjectKind || "",
        causativeOaHistory: option.causativeOaHistory || null,
        citationBridgeStem: option.citationBridgeStem || "",
        citationBridgeVisibility: option.citationBridgeVisibility || "",
        citationBridgeHypothetical: option.citationBridgeHypothetical ?? null,
        citationBridgeAuthority: option.citationBridgeAuthority || "",
        causativeCitationRole: option.causativeCitationRole || "",
        parallelFormationLexicalRelation:
          option.parallelFormationLexicalRelation || null,
        phoneRepertoryRelation: option.phoneRepertoryRelation
          || option.typeTwoInternalBridgeFrame?.phoneRepertoryRelation
          || null,
      };
    }
    function getClassicalNahuatlRecordFingerprintPayload(record = null) {
      if (!record || typeof record !== "object") {
        return null;
      }
      return {
        kind: record.kind,
        version: record.version,
        authorizationStatus: record.authorizationStatus,
        sourceStem: record.sourceStem,
        nonactiveStem: record.nonactiveStem,
        suffixFamily: record.suffixFamily,
        targetClass: record.targetClass,
        selectedOptionId: record.selectedOptionId,
        selectedRuleId: record.selectedRuleId,
        selectedFormationAuthority: record.selectedFormationAuthority,
        formationCore: record.formationCore,
        formationContinuation: record.formationContinuation,
        formationSequence: record.formationSequence || [],
        lexicalEvidenceMatches: record.lexicalEvidenceMatches || [],
        lexicalEvidenceSignature: record.lexicalEvidenceSignature || "",
        sourceIdentityStem: record.sourceIdentityFrame?.enteredStem || "",
        sourceIdentityAuthorizationStatus: record.sourceIdentityFrame?.authorizationStatus || "",
        finalShapeSourceStem: record.finalShapeRelation?.sourceFinalShapeFrame?.stem || "",
        finalShapeTargetStem: record.finalShapeRelation?.nonactiveFinalShapeFrame?.stem || "",
        finalShapeSuffixFamily: record.finalShapeRelation?.suffixFamily || "",
        formulaArtifactAuthority: record.formulaArtifactAuthority,
        surfaceArtifactAuthority: record.surfaceArtifactAuthority
      };
    }
    function getClassicalNahuatlRecordSignature(record = null) {
      const payload = getClassicalNahuatlRecordFingerprintPayload(record);
      return payload ? signClassicalNahuatlVncDerivationValue(payload) : "";
    }
    function getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(sourceDescriptor = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const record = sourceDescriptor.canonicalSourceStemRecord || null;
      if (typeof runtimeTarget?.resolveClassicalNahuatlCanonicalSourceStemRecord !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlCanonicalSourceStemRecord !== "function"
        || !record
        || !runtimeTarget.isClassicalNahuatlCanonicalSourceStemRecord(record)) {
        return null;
      }
      const expectedValence = sourceDescriptor.sourceValence === "intransitive"
        ? "intransitive"
        : "transitive";
      return runtimeTarget.resolveClassicalNahuatlCanonicalSourceStemRecord({
        enteredStem: sourceDescriptor.sourceStem,
        basalUnit: "vnc",
        valence: expectedValence,
        sourceLexemeId: sourceDescriptor.sourceLexemeId || "",
      }) === record
        ? record
        : null;
    }
    function getClassicalNahuatlVncDerivationGenerationSourceDescriptor(
      sourceDescriptor = {},
    ) {
      const lexicalSourceRecord =
        getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(
          sourceDescriptor,
        );
      return lexicalSourceRecord
        ? {
          ...sourceDescriptor,
          enteredSourceStem:
            sourceDescriptor.enteredSourceStem || sourceDescriptor.sourceStem,
          sourceStem: lexicalSourceRecord.stem,
          canonicalSourceStemRecord: lexicalSourceRecord,
        }
        : sourceDescriptor;
    }
    function getClassicalNahuatlFinalOHuiaExactRouteChoice(sourceDescriptor = {}) {
      const lexicalSourceRecord = getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(sourceDescriptor);
      if (!lexicalSourceRecord) {
        return "";
      }
      return CLASSICAL_NAHUATL_FINAL_O_HUIA_EXACT_ROUTE_CHOICES
        .find(choice => hasClassicalNahuatlVncDerivationLexicalKey(lexicalSourceRecord.stem, choice.sourceStem))
        || null;
    }
    function getClassicalNahuatlFinalOHuiaFormationRoutes(sourceDescriptor = {}) {
      const huia = "huiā";
      const exactRouteChoice =
        getClassicalNahuatlFinalOHuiaExactRouteChoice(sourceDescriptor);
      const shortDirectFinal = exactRouteChoice?.directFinalVowelQuantity === "short";
      const directBase = shortDirectFinal
        ? replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(sourceDescriptor.sourceStem, 1, "o")
        : sourceDescriptor.sourceStem;
      const replaciveBase =
        replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(
          sourceDescriptor.sourceStem,
          1,
          "a",
        );
      return [{
        route: "direct",
        targetStem: joinClassicalNahuatlVncDerivationMorphemes(
          directBase,
          huia,
        ),
        operation: shortDirectFinal ? "shorten-final-o-and-append-huia" : "append-huia-to-final-o",
        causativeRuleId: "cn-l25-256-final-o-direct-huia",
        applicativeRuleId: "cn-l26-2610-final-o-direct-huia",
        targetConstruction: Object.freeze({
          operation: shortDirectFinal ? "shorten-final-o-and-append-huia" : "append-huia-to-final-o",
          sharedFormationRuleId:
            "cn-vnc-final-o-huia-formation",
          sourceFinal: "ō",
          preserveSourceFinalQuantity: !shortDirectFinal,
          remove: shortDirectFinal ? "ō" : "",
          ...(shortDirectFinal ? { replaceWith: "o", sourceQuantityPreserved: true } : {}),
          add: huia,
        }),
      }, {
        route: "replacive",
        targetStem: joinClassicalNahuatlVncDerivationMorphemes(
          replaciveBase,
          huia,
        ),
        operation:
          "replace-final-o-with-a-within-base-and-append-huia",
        causativeRuleId: "cn-l25-256-final-o-replacive-a-huia",
        applicativeRuleId:
          "cn-l26-2610-final-o-replacive-a-huia",
        targetConstruction: Object.freeze({
          operation:
            "replace-final-o-with-a-within-base-and-append-huia",
          sharedFormationRuleId:
            "cn-vnc-final-o-huia-formation",
          sourceFinal: "ō",
          preserveSourceFinalQuantity: false,
          remove: "ō",
          replaceWith: "a",
          add: huia,
        }),
      }]
        .filter(route => (
          !exactRouteChoice || route.route === exactRouteChoice.route
        ));
    }
    function isClassicalNahuatlVncDerivationSourceLexemeLicensed(
      sourceDescriptor = {},
      license = {},
    ) {
      const licensedSourceLexemeIds = Array.isArray(
        license?.sourceLexemeIds,
      )
        ? license.sourceLexemeIds
        : [];
      return !licensedSourceLexemeIds.length
        || licensedSourceLexemeIds.includes(
          normalizeClassicalNahuatlVncDerivationToken(
            sourceDescriptor.sourceLexemeId,
          ),
        );
    }
    function getClassicalNahuatlTypeTwoHuaStructuralBridgeLicenses(
      sourceDescriptor = {},
    ) {
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(
        sourceDescriptor,
      );
      const shape = analysis?.sourceFinalShapeFrame || null;
      const morphemicSourceProfile = analysis?.morphemicSourceProfile || null;
      if (
        !shape
        || shape.authorizationStatus !== "authorized"
        || !doesClassicalNahuatlMorphemicSourceProfileAgree(
          analysis,
          sourceDescriptor,
        )
        || sourceDescriptor.sourceObjectCount > 2
      ) {
        return [];
      }
      const exactHuaWitnessExists =
        CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES.some(
          license => (
            license.bridgeSuffixFamily === "hua"
            && hasClassicalNahuatlVncDerivationLexicalKey(
              sourceDescriptor.sourceStem,
              license.sourceStem,
            )
          ),
        );
      const exactLiaDisposition =
        getClassicalNahuatlTypeTwoCausativeLiaSourceDisposition(
          sourceDescriptor,
        );
      if (
        (exactHuaWitnessExists
          && morphemicSourceProfile.edgeStructure.letterTail.three !== "hua")
        || exactLiaDisposition?.disposition === "licensed-lia"
      ) {
        return [];
      }
      const finalTwo = morphemicSourceProfile.edgeStructure.letterTail.two;
      const finalThree = morphemicSourceProfile.edgeStructure.letterTail.three;
      const structuralRoutes = [];
      if (finalThree === "hua") {
        structuralRoutes.push(...["preserve-source", "replace-final-a-with-i"].map(operation => ({
          structuralFamilyId: `cn-l25-2545-final-wa-internal-lo-source:${operation}`,
          bridgeBaseOperation: operation,
          bridgeSuffixFamily: "lō",
          ruleId: `cn-l25-2545-final-wa-lo-to-l-tia:${operation}`,
          andrewsSection: "25.4.5",
        })));
      } else if (finalTwo === "ca") {
        structuralRoutes.push({
          structuralFamilyId: "cn-l25-2521-final-ca-hua-source",
          bridgeBaseOperation: "replace-final-ca-with-quī",
          ruleId: "cn-l25-2521-final-ka-hua-to-tia",
          andrewsSection: "25.2.1",
        });
      } else if (["ci", "si"].includes(finalTwo)) {
        structuralRoutes.push({
          structuralFamilyId: "cn-l25-2522-final-si-hua-source",
          bridgeBaseOperation: finalTwo === "ci"
            ? "replace-final-ci-with-xi"
            : "replace-final-si-with-xi",
          ruleId: "cn-l25-2522-final-si-hua-to-tia",
          andrewsSection: "25.2.2",
        });
      } else if (["sa", "za"].includes(finalTwo)) {
        structuralRoutes.push({
          structuralFamilyId: "cn-l25-2522-final-sa-hua-source",
          bridgeBaseOperation: "replace-final-za-with-xi",
          ruleId: "cn-l25-2522-final-sa-hua-to-tia",
          andrewsSection: "25.2.2",
        });
      } else if (finalTwo === "ta") {
        structuralRoutes.push({
          structuralFamilyId: "cn-l25-2523-final-ta-hua-source",
          bridgeBaseOperation: "replace-final-a-with-i",
          ruleId: "cn-l25-2523-final-ta-hua-to-tia",
          andrewsSection: "25.2.3",
        });
      } else if (/^[aeioāēīō]ti$/u.test(finalThree)) {
        structuralRoutes.push({
          structuralFamilyId: "cn-l25-2523-postvocalic-ti-hua-source",
          bridgeBaseOperation: "replace-final-ti-with-chi",
          ruleId: "cn-l25-2523-postvocalic-ti-hua-to-tia",
          andrewsSection: "25.2.3",
        });
      }
      return structuralRoutes.map(route => Object.freeze({
        derivationLicenseId: route.ruleId,
        sourceStem: sourceDescriptor.sourceStem,
        sourceClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence,
        sourceValences: Object.freeze([sourceDescriptor.sourceValence]),
        minimumSourceObjectCount: sourceDescriptor.sourceObjectCount,
        maximumSourceObjectCount: sourceDescriptor.sourceObjectCount,
        bridgeBaseOperation: route.bridgeBaseOperation,
        bridgeSuffixFamily: route.bridgeSuffixFamily || "hua",
        lesson20PrerequisitePolicy: "internal-only",
        targetClass: "C",
        ruleId: route.ruleId,
        ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
        andrewsSection: route.andrewsSection,
        formationLesson: "25",
        evidenceSections: Object.freeze(["25.1", route.andrewsSection, "25.9", "25.15"]),
        derivationSubtype: "type-two",
        derivationRoute: "type-two-tia-from-typed-morphemic-hua-source",
        sourceMatchAuthority: "typed-morphemic-source-structure",
        morphemicSourceProfile,
        sourceShapeAgreement: true,
        structuralFamilyId: route.structuralFamilyId,
        canvasExampleAuthority: false,
      }));
    }
    function getClassicalNahuatlTypeTwoKiLoStructuralBridgeLicenses(sourceDescriptor = {}) {
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor);
      const morphemicSourceProfile = analysis?.morphemicSourceProfile;
      if (analysis?.sourceFinalShapeFrame?.authorizationStatus !== "authorized"
        || !doesClassicalNahuatlMorphemicSourceProfileAgree(analysis, sourceDescriptor)
        || morphemicSourceProfile?.edgeStructure?.letterTail?.three !== "qui"
        || sourceDescriptor.sourceObjectCount > 2) return [];
      // §25.4.1 licenses an internal lō base by final /ki/ shape, even
      // when the corresponding nonactive is not independently attested.
      const exactRoute = CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES.some(license =>
        license.bridgeSuffixFamily === "lō"
        && license.bridgeBaseOperation === "preserve-source"
        && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem));
      if (exactRoute) return [];
      const ruleId = "cn-l25-2541-final-ki-lo-to-l-tia";
      return [Object.freeze({
        derivationLicenseId: ruleId, sourceStem: sourceDescriptor.sourceStem,
        sourceClass: sourceDescriptor.sourceClass, sourceValence: sourceDescriptor.sourceValence,
        sourceValences: Object.freeze([sourceDescriptor.sourceValence]),
        minimumSourceObjectCount: sourceDescriptor.sourceObjectCount,
        maximumSourceObjectCount: sourceDescriptor.sourceObjectCount,
        bridgeBaseOperation: "preserve-source", bridgeSuffixFamily: "lō",
        lesson20PrerequisitePolicy: "internal-only", targetClass: "C", ruleId,
        ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
        andrewsSection: "25.4.1", formationLesson: "25",
        evidenceSections: Object.freeze(["25.1", "25.4.1", "25.9", "25.15"]),
        derivationSubtype: "type-two", derivationRoute: "type-two-tia-from-typed-final-ki-lo-source",
        sourceMatchAuthority: "typed-morphemic-source-structure", morphemicSourceProfile,
        sourceShapeAgreement: true, structuralFamilyId: "cn-l25-2541-final-ki-lo-source",
        canvasExampleAuthority: false,
      })];
    }
    function getClassicalNahuatlTypeTwoNiLoStructuralBridgeLicenses(sourceDescriptor = {}) {
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor);
      const morphemicSourceProfile = analysis?.morphemicSourceProfile;
      if (analysis?.sourceFinalShapeFrame?.authorizationStatus !== "authorized"
        || !doesClassicalNahuatlMorphemicSourceProfileAgree(analysis, sourceDescriptor)
        || morphemicSourceProfile?.edgeStructure?.letterTail?.two !== "ni"
        || sourceDescriptor.sourceObjectCount > 2) return [];
      // §25.4.2 permits either ni or na before an internal, hypothetical lō
      // basis. This offers Type2 choices; it does not license ordinary lō voice.
      return ["preserve-source", "replace-final-ni-with-na"].flatMap(bridgeBaseOperation => {
        const exactRoute = CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES.some(license =>
          license.bridgeSuffixFamily === "lō"
          && license.bridgeBaseOperation === bridgeBaseOperation
          && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem));
        if (exactRoute) return [];
        const variant = bridgeBaseOperation === "preserve-source" ? "retain-ni" : "ni-to-na";
        const ruleId = `cn-l25-2542-final-ni-${variant}-lo-to-l-tia`;
        return [Object.freeze({
          derivationLicenseId: ruleId, sourceStem: sourceDescriptor.sourceStem,
          sourceClass: sourceDescriptor.sourceClass, sourceValence: sourceDescriptor.sourceValence,
          sourceValences: Object.freeze([sourceDescriptor.sourceValence]),
          minimumSourceObjectCount: sourceDescriptor.sourceObjectCount,
          maximumSourceObjectCount: sourceDescriptor.sourceObjectCount,
          bridgeBaseOperation, bridgeSuffixFamily: "lō",
          lesson20PrerequisitePolicy: "internal-only", targetClass: "C", ruleId,
          ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
          andrewsSection: "25.4.2", formationLesson: "25",
          evidenceSections: Object.freeze(["25.1", "25.4.2", "25.9", "25.15"]),
          derivationSubtype: "type-two", derivationRoute: "type-two-tia-from-typed-final-ni-internal-lo-source",
          sourceMatchAuthority: "typed-morphemic-source-structure", morphemicSourceProfile,
          sourceShapeAgreement: true, structuralFamilyId: "cn-l25-2542-final-ni-internal-lo-source",
          citationBridgeHypothetical: true,
          canvasExampleAuthority: false,
        })];
      });
    }
    function buildClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
      sourceDescriptor = {},
      license = null,
    ) {
      if (!license) return null;
      const lexicalSourceRecord =
        getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(
          sourceDescriptor,
        );
      const sourceMatchAuthority = normalizeClassicalNahuatlVncDerivationToken(
        license.sourceMatchAuthority || "typed-lexical-source",
      );
      const sourceStemForMatch = lexicalSourceRecord?.stem
        || sourceDescriptor.sourceStem;
      const sourceMatches = Boolean(
        sourceStemForMatch
        && (
          sourceMatchAuthority === "typed-morphemic-source-structure"
          || hasClassicalNahuatlVncDerivationLexicalKey(
            sourceStemForMatch,
            license.sourceStem,
          )
        )
        && sourceDescriptor.sourceClass === license.sourceClass
        && (license.sourceValences || [license.sourceValence])
          .includes(sourceDescriptor.sourceValence)
        && sourceDescriptor.sourceObjectCount
          >= Number(license.minimumSourceObjectCount ?? 0)
        && sourceDescriptor.sourceObjectCount
          <= Number(license.maximumSourceObjectCount ?? 2)
        && isClassicalNahuatlVncDerivationSourceLexemeLicensed(
          sourceDescriptor,
          license,
        )
      );
      if (!sourceMatches) return null;
      const sourceStem = normalizeClassicalNahuatlVncDerivationStem(
        sourceStemForMatch,
      );
      const lesson20PrerequisitePolicy =
        normalizeClassicalNahuatlVncDerivationToken(
          license.lesson20PrerequisitePolicy || "internal-only",
        );
      if (
        !["internal-only", "independent-lesson20"].includes(
          lesson20PrerequisitePolicy,
        )
      ) {
        return null;
      }
      const cacheKey = [
        sourceDescriptor.sourceSignature,
        license.derivationLicenseId,
      ].join("\u0000");
      const cachedFrame =
        classicalNahuatlTypeTwoInternalBridgeFrameCache.get(cacheKey) || null;
      if (
        cachedFrame
        && isClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
          cachedFrame,
          sourceDescriptor,
        )
      ) {
        return cachedFrame;
      }
      const blockedLesson20SuffixFamilies = Object.freeze(
        Array.isArray(license.blockedLesson20SuffixFamilies)
          ? license.blockedLesson20SuffixFamilies
            .map(normalizeClassicalNahuatlVncDerivationStem)
            .filter(Boolean)
          : [],
      );
      const classBFinalMToNBoundaryPolicy =
        normalizeClassicalNahuatlVncDerivationToken(
          license.classBFinalMToNBoundaryPolicy
            || "apply-when-licensed-by-category",
        );
      if (
        ![
          "apply-when-licensed-by-category",
          "preserve-m",
        ].includes(classBFinalMToNBoundaryPolicy)
      ) {
        return null;
      }
      const bridgeBaseOperation =
        normalizeClassicalNahuatlVncDerivationToken(
          license.bridgeBaseOperation,
        );
      let bridgeBaseStem = "";
      const bridgePhoneRepertoryRelation = [
        "replace-final-ti-with-ch",
        "replace-final-ti-with-chi",
      ].includes(bridgeBaseOperation)
        ? getClassicalNahuatlPhoneRepertoryRelation("t", "ch")
        : null;
      if (bridgeBaseOperation === "preserve-source") {
        bridgeBaseStem = sourceStem;
      } else if (
        bridgeBaseOperation === "delete-final-i"
        && /i$/u.test(sourceStem)
      ) {
        bridgeBaseStem = sourceStem.slice(0, -1);
      } else if (
        bridgeBaseOperation === "lengthen-final-i"
        && /i$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -1)}ī`;
      } else if (
        bridgeBaseOperation === "replace-final-ti-with-ch"
        && /ti$/u.test(sourceStem)
        && bridgePhoneRepertoryRelation
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}${bridgePhoneRepertoryRelation.phone}`;
      } else if (
        bridgeBaseOperation === "replace-final-ti-with-chi"
        && /ti$/u.test(sourceStem)
        && bridgePhoneRepertoryRelation
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}${bridgePhoneRepertoryRelation.phone}i`;
      } else if (
        bridgeBaseOperation === "replace-final-ca-with-qui"
        && /ca$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}qui`;
      } else if (
        bridgeBaseOperation === "replace-final-ca-with-quī"
        && /ca$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}quī`;
      } else if (
        bridgeBaseOperation === "replace-final-za-with-xi"
        && /[sz]a$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}xi`;
      } else if (
        bridgeBaseOperation === "replace-final-za-with-x"
        && /za$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}x`;
      } else if (
        bridgeBaseOperation === "replace-final-ci-with-xi"
        && /ci$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}xi`;
      } else if (
        bridgeBaseOperation === "replace-final-si-with-xi"
        && /si$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}xi`;
      } else if (
        bridgeBaseOperation === "replace-final-ci-with-x"
        && /ci$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}x`;
      } else if (
        bridgeBaseOperation === "replace-final-ni-with-na"
        && /ni$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}na`;
      } else if (
        bridgeBaseOperation === "replace-final-ni-with-n"
        && /ni$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -2)}n`;
      } else if (
        bridgeBaseOperation === "replace-final-a-with-i"
        && /[aā]$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -1)}i`;
      } else if (
        bridgeBaseOperation === "delete-final-ya"
        && /ya$/u.test(sourceStem)
      ) {
        bridgeBaseStem = sourceStem.slice(0, -2).replace(/-+$/gu, "");
      } else if (
        bridgeBaseOperation === "delete-final-a"
        && /[aā]$/u.test(sourceStem)
      ) {
        bridgeBaseStem = sourceStem.slice(0, -1).replace(/-+$/gu, "");
      } else if (
        bridgeBaseOperation === "replace-final-qui-with-c"
        && /qui$/u.test(sourceStem)
      ) {
        bridgeBaseStem = `${sourceStem.slice(0, -3)}c`;
      }
      const suffixFamily = normalizeClassicalNahuatlVncDerivationStem(
        license.bridgeSuffixFamily,
      );
      const bridgeBaseStemBeforeQuantity = bridgeBaseStem;
      const bridgeFinalIQuantityOverride =
        normalizeClassicalNahuatlVncDerivationToken(
          license.bridgeFinalIQuantityOverride,
        );
      if (
        bridgeFinalIQuantityOverride
        && bridgeFinalIQuantityOverride
          !== "long-apparent-geminate-single-phone"
      ) {
        return null;
      }
      const typeTwoHuaQuantityApplies = Boolean(
        suffixFamily === "hua"
        && /^25\.2(?:\.|$)/u.test(String(license.andrewsSection || ""))
        && /[iī]$/u.test(bridgeBaseStem),
      );
      const bridgeBaseFinalIAlreadyLong = /ī$/u.test(bridgeBaseStem);
      const twoConsonantClusterBeforeFinalI = typeTwoHuaQuantityApplies
        && !bridgeBaseFinalIAlreadyLong
        && !bridgeFinalIQuantityOverride
        && hasClassicalNahuatlTwoConsonantClusterBeforeFinalVowel(
          bridgeBaseStem,
        );
      if (
        typeTwoHuaQuantityApplies
        && !bridgeBaseFinalIAlreadyLong
        && !twoConsonantClusterBeforeFinalI
      ) {
        bridgeBaseStem = `${bridgeBaseStem.slice(0, -1)}ī`;
      }
      const baseFinalIQuantityRuleFrame = typeTwoHuaQuantityApplies
        ? Object.freeze({
          kind: "classical-nahuatl-type-two-hua-base-final-i-quantity-frame",
          version: 1,
          authorizationStatus: "authorized",
          ruleId: "cn-l25-252-hua-long-i-with-two-consonant-shortening",
          inputStem: bridgeBaseStemBeforeQuantity,
          inputAlreadyLong: bridgeBaseFinalIAlreadyLong,
          quantityOverride: bridgeFinalIQuantityOverride,
          twoConsonantClusterBeforeFinalI,
          operation: bridgeBaseFinalIAlreadyLong
            ? "preserve-long-final-i"
            : bridgeFinalIQuantityOverride
              ? "lengthen-final-i-apparent-geminate-single-phone"
              : twoConsonantClusterBeforeFinalI
                ? "preserve-short-final-i"
                : "lengthen-final-i",
          outputStem: bridgeBaseStem,
          derivedFromShape: true,
          userSelectable: false,
        })
        : null;
      const familyRule = {
        hua: Object.freeze({ removeCount: 3, remove: "hua" }),
        ō: Object.freeze({ removeCount: 1, remove: "ō" }),
        "o-hua": Object.freeze({ removeCount: 5, remove: "o-hua" }),
        lō: Object.freeze({ removeCount: 1, remove: "ō" }),
      }[suffixFamily] || null;
      if (!bridgeBaseStem || !familyRule) return null;
      const nonactiveStem = joinClassicalNahuatlVncDerivationMorphemes(
        bridgeBaseStem,
        suffixFamily,
      );
      const retainedStem = nonactiveStem
        .slice(0, Math.max(0, nonactiveStem.length - familyRule.removeCount))
        .replace(/-+$/gu, "");
      const followingMorpheme = "tiā";
      const retainedBaseOperation =
        normalizeClassicalNahuatlVncDerivationToken(
          license.retainedBaseOperation || "preserve",
        );
      const operationAdjustedRetainedStem =
        retainedBaseOperation === "shorten-final-long-i"
        && /ī$/u.test(retainedStem)
          ? `${retainedStem.slice(0, -1)}i`
          : retainedBaseOperation === "shorten-long-i-before-final-x"
            && /īx$/u.test(retainedStem)
            ? `${retainedStem.slice(0, -2)}ix`
          : retainedBaseOperation === "lengthen-final-i"
            && /i$/u.test(retainedStem)
            ? `${retainedStem.slice(0, -1)}ī`
            : retainedBaseOperation === "lengthen-initial-i"
              && /^i/u.test(retainedStem)
              ? `ī${retainedStem.slice(1)}`
          : retainedStem;
      const formulaTargetStem = joinClassicalNahuatlVncDerivationMorphemes(
        operationAdjustedRetainedStem,
        followingMorpheme,
      );
      const boundarySpellingFrame =
        buildClassicalNahuatlVncDerivationBoundarySpellingFrame(
          nonactiveStem,
          operationAdjustedRetainedStem,
          followingMorpheme,
        );
      const requiresClassBFinalMToNBoundary =
        sourceDescriptor.sourceClass === "B"
        && suffixFamily === "o-hua"
        && classBFinalMToNBoundaryPolicy
          !== "preserve-m"
        && /m$/u.test(boundarySpellingFrame.realizedRetainedStem);
      const classBFinalMToNBoundaryFrame =
        requiresClassBFinalMToNBoundary
          ? buildClassicalNahuatlVncDerivationBoundaryEnvironmentFrame({
            sourceDescriptor,
            inputStem: boundarySpellingFrame.realizedRetainedStem,
            outputStem:
              boundarySpellingFrame.realizedRetainedStem.replace(/m$/u, "n"),
            followingMorpheme,
            ruleId: "cn-l7-74-phonological-changes",
            changeRule: "class-b-m-to-n",
          })
          : null;
      if (
        requiresClassBFinalMToNBoundary
        && classBFinalMToNBoundaryFrame?.authorizationStatus !== "authorized"
      ) {
        return null;
      }
      const realizedRetainedStem =
        classBFinalMToNBoundaryFrame?.outputStem
        || boundarySpellingFrame.realizedRetainedStem;
      const targetStem = joinClassicalNahuatlVncDerivationMorphemes(
        realizedRetainedStem,
        followingMorpheme,
      );
      const frame = {
        kind: CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_INTERNAL_BRIDGE_KIND,
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceSignature: sourceDescriptor.sourceSignature,
        sourceStem,
        sourceLexemeId: sourceDescriptor.sourceLexemeId || "",
        sourceClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence,
        sourceObjectCount: sourceDescriptor.sourceObjectCount,
        lexicalSourceRecord,
        sourceMatchAuthority,
        structuralFamilyId: license.structuralFamilyId || "",
        derivationLicenseId: license.derivationLicenseId,
        lesson20PrerequisitePolicy,
        blockedLesson20SuffixFamilies,
        classBFinalMToNBoundaryPolicy,
        bridgeBaseOperation,
        bridgeBaseStem,
        baseFinalIQuantityRuleFrame,
        phoneRepertoryRelation: bridgePhoneRepertoryRelation,
        suffixFamily,
        nonactiveStem,
        retainedStem,
        retainedBaseOperation,
        operationAdjustedRetainedStem,
        formulaTargetStem,
        followingMorpheme,
        boundarySpellingFrame,
        classBFinalMToNBoundaryFrame,
        realizedRetainedStem,
        targetStem,
        targetClass: license.targetClass,
        userSelectable: false,
        internalPrerequisiteOnly: true,
        typedSourceAuthority: true,
        callerSuppliedAuthorityAccepted: false,
        lesson20OperationAuthority: false,
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      };
      frame.canonicalSignature = signClassicalNahuatlVncDerivationValue({
        kind: frame.kind,
        version: frame.version,
        sourceSignature: frame.sourceSignature,
        sourceLexemeId: frame.sourceLexemeId,
        derivationLicenseId: frame.derivationLicenseId,
        sourceMatchAuthority: frame.sourceMatchAuthority,
        structuralFamilyId: frame.structuralFamilyId,
        lesson20PrerequisitePolicy: frame.lesson20PrerequisitePolicy,
        blockedLesson20SuffixFamilies:
          frame.blockedLesson20SuffixFamilies,
        classBFinalMToNBoundaryPolicy:
          frame.classBFinalMToNBoundaryPolicy,
        bridgeBaseOperation: frame.bridgeBaseOperation,
        bridgeBaseStem: frame.bridgeBaseStem,
        baseFinalIQuantityRuleId:
          frame.baseFinalIQuantityRuleFrame?.ruleId || "",
        baseFinalIQuantityInputStem:
          frame.baseFinalIQuantityRuleFrame?.inputStem || "",
        baseFinalIQuantityInputAlreadyLong:
          frame.baseFinalIQuantityRuleFrame?.inputAlreadyLong === true,
        baseFinalIQuantityOverride:
          frame.baseFinalIQuantityRuleFrame?.quantityOverride || "",
        baseFinalIQuantityCluster:
          frame.baseFinalIQuantityRuleFrame
            ?.twoConsonantClusterBeforeFinalI === true,
        baseFinalIQuantityOperation:
          frame.baseFinalIQuantityRuleFrame?.operation || "",
        baseFinalIQuantityOutputStem:
          frame.baseFinalIQuantityRuleFrame?.outputStem || "",
        suffixFamily: frame.suffixFamily,
        nonactiveStem: frame.nonactiveStem,
        retainedStem: frame.retainedStem,
        retainedBaseOperation: frame.retainedBaseOperation,
        operationAdjustedRetainedStem:
          frame.operationAdjustedRetainedStem,
        formulaTargetStem: frame.formulaTargetStem,
        followingMorpheme: frame.followingMorpheme,
        realizedRetainedStem: frame.realizedRetainedStem,
        targetStem: frame.targetStem,
        targetClass: frame.targetClass,
        boundarySpellingKind: frame.boundarySpellingFrame?.kind || "",
        classBBoundarySignature:
          frame.classBFinalMToNBoundaryFrame?.canonicalSignature || "",
      });
      Object.freeze(frame);
      classicalNahuatlIssuedTypeTwoCausativeInternalBridgeFrames.add(frame);
      classicalNahuatlTypeTwoInternalBridgeFrameCache.set(cacheKey, frame);
      return frame;
    }
    function isClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
      frame = null,
      sourceDescriptor = {},
    ) {
      return Boolean(
        frame
        && classicalNahuatlIssuedTypeTwoCausativeInternalBridgeFrames.has(
          frame,
        )
        && frame.kind
          === CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_INTERNAL_BRIDGE_KIND
        && frame.version === CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION
        && frame.authorizationStatus === "authorized"
        && frame.sourceSignature === sourceDescriptor.sourceSignature
        && frame.sourceStem
          === (
            getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(
              sourceDescriptor,
            )?.stem
            || sourceDescriptor.sourceStem
          )
        && frame.sourceLexemeId
          === (sourceDescriptor.sourceLexemeId || "")
        && frame.sourceClass === sourceDescriptor.sourceClass
        && frame.sourceValence === sourceDescriptor.sourceValence
        && frame.sourceObjectCount === sourceDescriptor.sourceObjectCount
        && frame.lexicalSourceRecord
          === getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(
            sourceDescriptor,
          )
        && [
          "typed-lexical-source",
          "typed-morphemic-source-structure",
        ].includes(frame.sourceMatchAuthority)
        && frame.userSelectable === false
        && frame.internalPrerequisiteOnly === true
        && frame.callerSuppliedAuthorityAccepted === false
        && ["internal-only", "independent-lesson20"].includes(
          frame.lesson20PrerequisitePolicy,
        )
        && Array.isArray(frame.blockedLesson20SuffixFamilies)
        && Object.isFrozen(frame.blockedLesson20SuffixFamilies)
        && [
          "apply-when-licensed-by-category",
          "preserve-m",
        ].includes(frame.classBFinalMToNBoundaryPolicy)
        && frame.lesson20OperationAuthority === false
        && frame.curriculumOrderAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && Object.isFrozen(frame)
      );
    }
    function getClassicalNahuatlCausativeParallelFormationLexicalRelation(
      sourceDescriptor = {},
      option = {},
    ) {
      return CLASSICAL_NAHUATL_CAUSATIVE_PARALLEL_FORMATION_LEXICAL_RELATIONS
        .find(relation => (
          hasClassicalNahuatlVncDerivationLexicalKey(
            sourceDescriptor.sourceStem,
            relation.sourceStem,
          )
          && relation.sourceClasses.includes(sourceDescriptor.sourceClass)
          && [relation.typeOneRuleId, relation.typeTwoRuleId]
            .includes(option.ruleId)
        )) || null;
    }
    function buildClassicalNahuatlDestockalClassAssignmentFrame(option = {}) {
      const sourceAnalysisFrame = option.sourceAnalysisFrame;
      const sourceAnalysisId = String(option.sourceAnalysisId || "");
      const sourceAnalysisIsSigned = Boolean(
        sourceAnalysisId
        && sourceAnalysisFrame
        && classicalNahuatlIssuedVncDerivationSourceAnalysisFrames.has(
          sourceAnalysisFrame,
        )
        && sourceAnalysisFrame.authorizationStatus === "authorized"
        && sourceAnalysisFrame.canonicalSignature
          === signClassicalNahuatlVncDerivationValue(
            getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(
              sourceAnalysisFrame,
            ),
          )
      );
      if (
        !sourceAnalysisIsSigned
        || option.derivationType !== "causative"
        || option.derivationSubtype !== "type-one"
        || sourceAnalysisFrame.sourceClass
          !== CLASSICAL_NAHUATL_DESTOCKAL_NI_HUI_CLASS_SYSTEM_FRAME
            .sourceAssignment.classId
        || sourceAnalysisFrame.sourceValence !== "intransitive"
        || option.licensedSourceClass !== sourceAnalysisFrame.sourceClass
        || option.licensedSourceValence !== sourceAnalysisFrame.sourceValence
      ) {
        return null;
      }
      const sourceAnalysis = sourceAnalysisFrame.analyses.find(candidate => (
        candidate.analysisId === sourceAnalysisId
      )) || null;
      if (
        !sourceAnalysis
        || !["destockal-ni-candidate", "destockal-hui-candidate"]
          .includes(sourceAnalysis.category)
        || sourceAnalysis.destockalStructureFrame?.typeId
          !== CLASSICAL_NAHUATL_DESTOCKAL_NI_HUI_CLASS_SYSTEM_FRAME.typeId
        || sourceAnalysis.destockalStructureFrame?.classSystemFrame
          !== CLASSICAL_NAHUATL_DESTOCKAL_NI_HUI_CLASS_SYSTEM_FRAME
        || !CLASSICAL_NAHUATL_DESTOCKAL_NI_HUI_CLASS_SYSTEM_FRAME
          .sourceAssignment.stemFormatives
          .includes(sourceAnalysis.stemFormative)
      ) {
        return null;
      }
      const targetConstruction = option.targetConstruction || {};
      const sourceStemFormative = sourceAnalysis.stemFormative;
      let procedure = "";
      let outputSequence = "";
      if (
        targetConstruction.operation === "append"
        && targetConstruction.preserveSource === true
        && targetConstruction.add === "ā"
      ) {
        procedure = "addition";
        outputSequence = `${sourceStemFormative}-ā`;
      } else if (
        sourceStemFormative === "ni"
        && targetConstruction.operation === "replace-final"
        && targetConstruction.remove === "i"
        && targetConstruction.add === "a"
      ) {
        procedure = "replacement";
        outputSequence = "n-a";
      } else if (
        sourceStemFormative === "hui"
        && (
          (
            targetConstruction.operation === "replace-final"
            && targetConstruction.remove === "i"
            && targetConstruction.add === "a"
          )
          || (
            targetConstruction.operation === "replace-morpheme"
            && targetConstruction.remove === "hui"
            && targetConstruction.add === "hu-a"
          )
        )
      ) {
        procedure = "replacement";
        outputSequence = "hu-a";
      }
      const targetAssignment =
        CLASSICAL_NAHUATL_DESTOCKAL_NI_HUI_CLASS_SYSTEM_FRAME
          .targetAssignments[procedure] || null;
      if (!targetAssignment?.outputSequences.includes(outputSequence)) {
        return null;
      }
      return Object.freeze({
        kind: "classical-nahuatl-destockal-class-assignment-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        authorizationStatus: "authorized",
        sourceAnalysisId,
        sourceTypeId: sourceAnalysis.destockalStructureFrame.typeId,
        sourceStemFormative,
        sourceClass: sourceAnalysisFrame.sourceClass,
        sourceValence: sourceAnalysisFrame.sourceValence,
        procedure,
        outputSequence,
        targetClass: targetAssignment.classId,
        classAssignmentAuthority:
          "signed-source-analysis-and-typed-target-construction",
        suffixOnlyInference: false,
        classSystemFrame:
          CLASSICAL_NAHUATL_DESTOCKAL_NI_HUI_CLASS_SYSTEM_FRAME,
        contextualFactIsUserChoice: false,
        canvasExampleAuthority: false,
        callerSuppliedGrammarAuthority: false,
      });
    }
    function finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor = {}, option = {}) {
      const finalized = {
        ...option,
        sourceStem: sourceDescriptor.sourceStem,
        sourceSignature: sourceDescriptor.sourceSignature,
        targetStem: normalizeClassicalNahuatlVncDerivationStem(option.targetStem),
        targetInitialIKind: CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES
          .find(license => license.derivationLicenseId === option.derivationLicenseId)
          ?.targetInitialIKind || "",
        parallelFormationLexicalRelation:
          getClassicalNahuatlCausativeParallelFormationLexicalRelation(
            sourceDescriptor,
            option,
          ),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedTargetAllowed: false
      };
      finalized.derivationRoute = finalized.derivationRoute || finalized.derivationSubtype;
      const targetOperation = normalizeClassicalNahuatlVncDerivationToken(finalized.targetConstruction?.operation || "");
      const surfaceIdentical = hasClassicalNahuatlVncDerivationLexicalKey(finalized.sourceStem, finalized.targetStem);
      finalized.stemRelation = surfaceIdentical
        ? targetOperation === "identity-stem-with-valence-increase"
          ? "surface-identical-valence-addition"
          : "surface-identical-morphological-replacement"
        : "surface-changing";
      finalized.subtype = ["type-one", "type-two", "type-three"].find(type => String(finalized.derivationRoute || "").startsWith(type))
        || finalized.derivationSubtype
        || "type-two";
      finalized.formationType = finalized.subtype;
      const destockalClassAssignmentFrame =
        buildClassicalNahuatlDestockalClassAssignmentFrame(finalized);
      if (destockalClassAssignmentFrame) {
        finalized.destockalClassAssignmentFrame =
          destockalClassAssignmentFrame;
        finalized.targetClass = destockalClassAssignmentFrame.targetClass;
      }
      finalized.lesson20RecordSignature = getClassicalNahuatlRecordSignature(finalized.lesson20NonactiveStemRecord);
      finalized.lexicalEvidenceMatches = getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({
        derivationType: finalized.derivationType,
        sourceStem: finalized.sourceStem,
        targetStem: finalized.targetStem
      });
      const optionAliases = Array.isArray(option.optionAliases) ? option.optionAliases : [finalized.ruleId, finalized.lesson20RuleId];
      finalized.optionAliases = Object.freeze(Array.from(new Set(optionAliases.map(normalizeClassicalNahuatlVncDerivationToken).filter(Boolean))));
      finalized.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationOptionSignaturePayload(finalized));
      Object.freeze(finalized);
      classicalNahuatlIssuedVncDerivationOptions.add(finalized);
      return finalized;
    }
    function getClassicalNahuatlTypeTwoCausativeLiaSourceDisposition(sourceDescriptor = {}) {
      const lexicalSourceRecord =
        getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(
          sourceDescriptor,
        );
      if (!lexicalSourceRecord || sourceDescriptor.sourceObjectCount !== 0) {
        return null;
      }
      return CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_LIA_SOURCE_DISPOSITIONS
        .find(disposition => (
          hasClassicalNahuatlVncDerivationLexicalKey(
            lexicalSourceRecord.stem,
            disposition.sourceStem,
          )
          && (disposition.sourceClasses.includes(sourceDescriptor.sourceClass)
            || sourceDescriptor.sourceClass==="" && sourceDescriptor.analyticalSourceAnalysis?.formation==="root-plus-ya"
              && sourceDescriptor.analyticalSourceAnalysis.licensedOperationRuleIds.includes(disposition.ruleId))
          && disposition.sourceValence === sourceDescriptor.sourceValence
        )) || null;
    }
    function isClassicalNahuatlRecursiveCaquiCausativeSourceLicensed(
      sourceDescriptor = {},
    ) {
      const sourceKey =
        getClassicalNahuatlVncDerivationQuantityNeutralLexicalKey(
          sourceDescriptor.sourceStem,
        );
      const caquiCausativeKey =
        getClassicalNahuatlVncDerivationQuantityNeutralLexicalKey(
          "caqui-tiā",
        );
      if (sourceKey !== caquiCausativeKey) {
        return true;
      }
      const activeFormationFrame =
        sourceDescriptor.sourceKind
          === "classical-nahuatl-vnc-derived-machinery-frame"
          ? sourceDescriptor.sourceMachineryFrame
          : sourceDescriptor.formationSourceMachineryFrame;
      const priorOperation =
        activeFormationFrame?.derivationOperationFrame || null;
      return Boolean(
        activeFormationFrame?.kind
          === "classical-nahuatl-vnc-derived-machinery-frame"
        && priorOperation?.authorizationStatus === "authorized"
        && priorOperation.derivationType === "causative"
        && priorOperation.selectedOption?.derivationSubtype === "type-two"
        && getClassicalNahuatlVncDerivationQuantityNeutralLexicalKey(
          priorOperation.targetStem,
        ) === caquiCausativeKey
        && getClassicalNahuatlVncDerivationQuantityNeutralLexicalKey(
          activeFormationFrame.targetStem,
        ) === caquiCausativeKey
        && sourceDescriptor.sourceObjectCount === 2
      );
    }
    function getClassicalNahuatlTypeOneCausativeOptions(sourceDescriptor = {}) {
      if (sourceDescriptor.sourceValence !== "intransitive" || sourceDescriptor.sourceObjectCount !== 0) {
        return [];
      }
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor);
      if (!doesClassicalNahuatlMorphemicSourceProfileAgree(analysis, sourceDescriptor)) {
        return [];
      }
      const shape = analysis.sourceFinalShapeFrame;
      const morphemicSourceProfile = analysis.morphemicSourceProfile;
      const morphology = analysis.sourceInternalMorphology || {};
      const morphemes = morphemicSourceProfile.explicitMorphemes;
      const finalMorpheme = morphemes.at(-1) || "";
      const precedingMorpheme = morphemes.at(-2) || "";
      const longA = "ā";
      const common = {
        derivationType: "causative",
        ruleTagId: "cn-l24-type-one-causative-a",
        formationLesson: "24",
        scopeModel: "causative-source-vnc-core",
        scopeSection: "24.9",
        scopeRule: "The causative governs the source subject together with the source VNC core.",
        participantRule: "The source subject becomes the causative object and a new outer subject is imported.",
        licensedSourceClass: sourceDescriptor.sourceClass,
        licensedSourceValence: sourceDescriptor.sourceValence,
        licensedMinimumSourceObjectCount: 0,
        licensedMaximumSourceObjectCount: 0,
        sourceAnalysisFrame: analysis,
        sourceFinalShapeFrame: shape,
        morphemicSourceProfile,
        sourceShapeAgreement: true,
        productiveSourceAuthority: "typed-morphemic-source-profile",
        sourceInternalMorphology: analysis.sourceInternalMorphology,
        formationRuleTier: "productive-final-shape",
        productivityStatus: "andrews-category-rule",
        lexicalChoiceRequired: false,
        optionAliases: []
      };
      const candidates = [];
      const exactWitness = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_WITNESSES.find(witness => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, witness.sourceStem) && witness.sourceClass === sourceDescriptor.sourceClass && witness.sourceValence === sourceDescriptor.sourceValence && witness.sourceObjectCount === sourceDescriptor.sourceObjectCount) || null;
      const exactAlternation = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_ALTERNATIONS.find(formation => formation.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias)) && formation.sourceClasses.includes(sourceDescriptor.sourceClass) && formation.sourceValences.includes(sourceDescriptor.sourceValence) && formation.sourceObjectCount === sourceDescriptor.sourceObjectCount) || null;
      const exactRootPlusYaProfile = CLASSICAL_NAHUATL_TYPE_ONE_ROOT_PLUS_YA_EXACT_PROFILES.find(profile => (
        profile.sourceAliases.some(alias => (
          hasClassicalNahuatlVncDerivationLexicalKey(
            sourceDescriptor.sourceStem,
            alias,
          )
        ))
      )) || null;
      const exactDestockalAlternation = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_DESTOCKAL_ALTERNATIONS.find(formation => (
        formation.sourceAliases.some(alias =>
          hasClassicalNahuatlVncDerivationLexicalKey(
            sourceDescriptor.sourceStem,
            alias,
          )
        )
        && formation.sourceClasses.includes(sourceDescriptor.sourceClass)
        && isClassicalNahuatlVncDerivationSourceLexemeLicensed(
          sourceDescriptor,
          formation,
        )
      )) || null;
      const exactNegativeDestockalOa = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_NEGATIVE_LICENSES.find(license => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem) && license.sourceClass === sourceDescriptor.sourceClass && license.sourceValence === sourceDescriptor.sourceValence) || null;
      const destockalOaAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-i-a-o-hui");
      const destockalHuaAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-long-vowel-hua");
      const rootPlusYaAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "root-plus-ya");
      const destockalNiAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-ni-candidate");
      const destockalHuiAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-hui-candidate");
      const destockalPreferenceOverride = CLASSICAL_NAHUATL_TYPE_ONE_DESTOCKAL_PREFERENCE_OVERRIDES.find(preference => preference.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias))) || null;
      let preferredDestockalProcedure = destockalPreferenceOverride?.preferredProcedure || "";
      if (!preferredDestockalProcedure && destockalNiAnalysis) {
        preferredDestockalProcedure = "addition";
      } else if (!preferredDestockalProcedure && destockalHuiAnalysis) {
        preferredDestockalProcedure = "replacement";
      }
      const destockalPreferenceRuleId = destockalPreferenceOverride?.ruleId || (destockalNiAnalysis
        ? "cn-l24-2457a-destockal-ni-prefers-addition"
        : destockalHuiAnalysis
          ? "cn-l24-2457b-destockal-hui-prefers-replacement"
          : "");
      const getDestockalPreferenceFields = procedure => preferredDestockalProcedure ? {
        derivationalPreference: procedure === preferredDestockalProcedure ? "preferred" : "available-alternative",
        preferenceRuleId: destockalPreferenceRuleId,
        preferenceAndrewsSection: "24.5.7"
      } : {};
      const sourceHasRestrictedDestockalOaLexeme = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_DESTOCKAL_ALTERNATIONS.some(formation => (
        Array.isArray(formation.sourceLexemeIds)
        && formation.sourceLexemeIds.length
        && formation.sourceAliases.some(alias =>
          hasClassicalNahuatlVncDerivationLexicalKey(
            sourceDescriptor.sourceStem,
            alias,
          )
        )
      ));
      const destockalOaRoute = sourceDescriptor.sourceClass === "B"
        && Boolean(destockalOaAnalysis)
        && !exactNegativeDestockalOa
        && !sourceHasRestrictedDestockalOaLexeme;
      const destockalHuaRoute = Boolean(destockalHuaAnalysis)
        && (["A", "B"].includes(sourceDescriptor.sourceClass)
          || sourceDescriptor.analyticalSourceAnalysis?.formation==="destockal-long-vowel-hua"
            && sourceDescriptor.sourceClass===""
            && sourceDescriptor.analyticalSourceAnalysis.licensedOperationRuleIds.includes("cn-l24-2465-destockal-hua-hu-a"));
      const rootPlusYaRoute = ["A", "B"].includes(sourceDescriptor.sourceClass) && Boolean(rootPlusYaAnalysis);
      if (exactNegativeDestockalOa) {
        return candidates;
      }
      if (exactAlternation) {
        const targetStem = exactAlternation.markedTargetStem;
        const sourceAnalysisCategory = exactAlternation.sourceAnalysisCategory
          || (exactAlternation.ruleId.includes("huaqui")
            ? "type-one-consonant-alternation"
            : exactAlternation.ruleId.includes("yocoya")
              ? "root-plus-ya-retentive-exception"
              : "destockal-hui-candidate");
        const sourceAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(
          analysis,
          sourceAnalysisCategory,
        );
        const exactDestockalPreference = exactAlternation.ruleId === "cn-l24-2457b-chayahui-chayahua"
          ? Object.freeze({ preferredProcedure: "replacement", ruleId: "cn-l24-2457b-destockal-hui-prefers-replacement" })
          : exactAlternation.ruleId === "cn-l24-2457b-tlapihui-tlapihuia"
            ? Object.freeze({ preferredProcedure: "addition", ruleId: "cn-l24-2457b-tlapihui-prefers-addition" })
            : null;
        const exactCausativeOaHistory = exactAlternation.ruleId === "cn-l24-247-polihui-poloa"
          ? Object.freeze({ sourceRoute: "destockal-i-hui-a-hui", root: "pol", underlyingDestockalVowel: "i" })
          : exactAlternation.ruleId === "cn-l24-247-note1-tlapohui-tlapoa"
            ? Object.freeze({ sourceRoute: "destockal-o-hui", root: "tlap", underlyingDestockalVowel: "o" })
            : null;
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:exact-alternation:${exactAlternation.ruleId}:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-one causative · licensed lexical alternation)`,
          derivationSubtype: "type-one",
          derivationRoute: exactAlternation.derivationRoute,
          procedure: exactAlternation.procedure,
          suffix: "a",
          targetStem,
          targetClass: exactAlternation.targetClass,
          sourceMeaning: exactAlternation.sourceMeaning
            || exactRootPlusYaProfile?.sourceMeaning
            || "",
          additionalSourceReadings: Object.freeze(
            (exactAlternation.additionalSourceReadings
              || exactRootPlusYaProfile?.additionalSourceReadings
              || []).map(reading => (
              Object.freeze({
                meaning: reading?.meaning || "",
                relation: reading?.relation || ""
              })
            ))
          ),
          targetMeaning: exactAlternation.targetMeaning
            || exactRootPlusYaProfile?.targetMeaning
            || "",
          additionalTargetReadings: Object.freeze(
            (exactAlternation.additionalTargetReadings
              || exactRootPlusYaProfile?.additionalTargetReadings
              || []).map(reading => (
              Object.freeze({
                meaning: reading?.meaning || "",
                relation: reading?.relation || ""
              })
            ))
          ),
          ruleId: exactAlternation.ruleId,
          andrewsSection: exactAlternation.andrewsSection,
          evidenceSections: Object.freeze([exactAlternation.andrewsSection, "24.8.1", "24.9"]),
          authorityStatus: "typed-lexical-alternation-over-category-rule",
          targetQuantityAuthority: "typed-lexical-source-analysis-not-literal-witness-spelling",
          exactWitness: true,
          lexicalChoiceRequired: false,
          derivationLicenseId: exactAlternation.ruleId,
          optionAliases: [exactAlternation.ruleId],
          sourceAnalysisId: sourceAnalysis?.analysisId || "",
          causativeOaHistory: exactCausativeOaHistory,
          causativeCitationRole: exactAlternation.causativeCitationRole
            || exactRootPlusYaProfile?.causativeCitationRole
            || "",
          implicitAgentObjectKind:
            exactRootPlusYaProfile?.implicitAgentObjectKind || "",
          ...(exactDestockalPreference ? {
            derivationalPreference: "preferred",
            preferenceRuleId: exactDestockalPreference.ruleId,
            preferenceAndrewsSection: "24.5.7"
          } : {}),
          targetConstruction: exactAlternation.targetConstruction
        }));
        if (exactDestockalPreference) {
          const replacementPreferred = exactDestockalPreference.preferredProcedure === "replacement";
          const alternateTargetStem = replacementPreferred ? "chay-ā-hui-ā" : "tlap-ī-hu-a";
          const alternateRoute = replacementPreferred
            ? "type-one-destockal-hui-addition-exact-long-a"
            : "type-one-destockal-hui-replacement-exact-quantity";
          const alternateRuleId = replacementPreferred
            ? "cn-l24-2457b-chayahui-chayahui-a-alternate"
            : "cn-l24-2457b-tlapihui-tlapihua-alternate";
          candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...common,
            optionId: `causative:type-one:exact-alternation:${alternateRuleId}:${sourceDescriptor.sourceStem}:${alternateTargetStem}`,
            label: `${alternateTargetStem} (type-one causative · licensed lexical alternative)`,
            derivationSubtype: "type-one",
            derivationRoute: alternateRoute,
            procedure: replacementPreferred ? "preserve-destockal-hui-and-append-long-causative-a" : "replace-final-hui-with-hu-a-and-preserve-stock-vowel-quantity",
            suffix: replacementPreferred ? "ā" : "a",
            targetStem: alternateTargetStem,
            targetClass: replacementPreferred ? "C" : "B",
            ruleId: alternateRuleId,
            andrewsSection: "24.5.7",
            evidenceSections: Object.freeze(["24.5.7", "24.8.1", "24.9"]),
            authorityStatus: "typed-lexical-alternative-over-category-rule",
            exactWitness: true,
            lexicalChoiceRequired: false,
            derivationLicenseId: alternateRuleId,
            optionAliases: [alternateRuleId],
            sourceAnalysisId: sourceAnalysis?.analysisId || "",
            derivationalPreference: "available-alternative",
            preferenceRuleId: exactDestockalPreference.ruleId,
            preferenceAndrewsSection: "24.5.7",
            targetConstruction: Object.freeze(replacementPreferred
              ? { operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" }
              : { operation: "replace-morpheme", preserveInternalQuantity: true, remove: "hui", add: "hu-a" })
          }));
        }
        return candidates;
      }
      if (exactDestockalAlternation) {
        const sourceAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, exactDestockalAlternation.sourceAnalysisCategory);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:exact-destockal:${exactDestockalAlternation.ruleId}:${sourceDescriptor.sourceStem}:${exactDestockalAlternation.targetStem}`,
          label: `${exactDestockalAlternation.targetStem} (type-one causative · licensed fused-destockal formation)`,
          derivationSubtype: "type-one",
          derivationRoute: exactDestockalAlternation.derivationRoute,
          procedure: exactDestockalAlternation.procedure,
          suffix: "a",
          targetStem: exactDestockalAlternation.targetStem,
          targetClass: exactDestockalAlternation.targetClass,
          ruleId: exactDestockalAlternation.ruleId,
          andrewsSection: exactDestockalAlternation.andrewsSection,
          evidenceSections: Object.freeze([exactDestockalAlternation.andrewsSection, "24.8.1", "24.9"]),
          authorityStatus: "typed-lexical-fused-destockal-alternation",
          exactWitness: true,
          lexicalChoiceRequired: false,
          derivationLicenseId: exactDestockalAlternation.ruleId,
          optionAliases: [exactDestockalAlternation.ruleId],
          formationRuleTier: "typed-lexical-destockal-exact",
          sourceAnalysisId: sourceAnalysis?.analysisId || "",
          sourceAnalysisSelectionRequired: sourceAnalysis?.sourceAnalysisSelectionRequired === true,
          causativeCitationRole: exactDestockalAlternation.causativeCitationRole || "",
          targetConstruction: exactDestockalAlternation.targetConstruction
        }));
        return candidates;
      }
      if (sourceHasRestrictedDestockalOaLexeme) {
        // The same printed pach-i-hui stem names two Canvas-distinct Source
        // lexemes.  A type-one operation is licensed only for the
        // pressed-down lexeme above; final-shape fallbacks cannot recreate it
        // for the satiated lexeme.
        return candidates;
      }
      if (destockalOaRoute) {
        const stockFormative = destockalOaAnalysis.stockFormative;
        const root = destockalOaAnalysis.root;
        const targetStem = stockFormative === "o"
          ? joinClassicalNahuatlVncDerivationMorphemes(root, "o", longA)
          : joinClassicalNahuatlVncDerivationMorphemes(root, "o", longA);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:destockal-o-a:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-one causative · boundary-free destockal ${stockFormative}-hui → ${stockFormative === "o" ? longA : `o-${longA}`})`,
          derivationSubtype: "type-one",
          derivationRoute: stockFormative === "o" ? "type-one-destockal-o-hui-to-o-a" : "type-one-destockal-hui-to-o-a",
          procedure: stockFormative === "o" ? "replace-typed-destockal-o-hui-final-hui-with-a" : "replace-typed-destockal-i-hui-or-a-hui-with-o-a",
          suffix: stockFormative === "o" ? longA : `o-${longA}`,
          targetStem,
          targetClass: "C",
          ruleId: stockFormative === "o" ? "cn-l24-247-note1-destockal-o-hui-o-a" : "cn-l24-247-destockal-i-hui-a-hui-o-a",
          andrewsSection: stockFormative === "o" ? "24.7 note 1" : "24.7",
          evidenceSections: Object.freeze([stockFormative === "o" ? "24.7 note 1" : "24.7", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-rule-from-boundary-free-typed-morphology",
          derivationLicenseId: stockFormative === "o" ? "cn-l24-247-note1-destockal-o-hui-o-a" : "cn-l24-247-destockal-i-hui-a-hui-o-a",
          formationRuleTier: "typed-internal-morphology",
          sourceAnalysisId: destockalOaAnalysis.analysisId,
          targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: stockFormative === "o" ? "hui" : `${stockFormative}-hui`, add: stockFormative === "o" ? longA : `o-${longA}` }),
          causativeOaHistory: Object.freeze({ sourceRoute: stockFormative === "o" ? "destockal-o-hui" : "destockal-i-hui-a-hui", root, underlyingDestockalVowel: stockFormative })
        }));
        return candidates;
      }
      if (destockalHuaRoute) {
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 3, "hu", "a");
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:destockal-hua:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-one causative · typed destockal hua → hu-a)`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-destockal-hua-replacement",
          procedure: "replace-typed-destockal-hua-with-hu-a",
          suffix: "a",
          targetStem,
          targetClass: "B",
          ruleId: "cn-l24-2465-destockal-hua-hu-a",
          andrewsSection: "24.6.5",
          evidenceSections: Object.freeze(["24.6.5", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-rule-from-typed-explicit-morphology",
          derivationLicenseId: "cn-l24-2465-destockal-hua-hu-a",
          formationRuleTier: "typed-internal-morphology",
          sourceAnalysisId: destockalHuaAnalysis.analysisId,
          targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "hua", add: "hu-a" })
        }));
        return candidates;
      }
      if (rootPlusYaRoute) {
        const root = rootPlusYaAnalysis.root;
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, longA);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:root-plus-ya:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-one causative · typed root+ya → ${longA})`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-root-plus-ya-replacement",
          procedure: "delete-typed-derivational-ya-and-add-causative-a",
          suffix: longA,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l24-2432b-root-plus-ya-a",
          andrewsSection: "24.3.2.b",
          evidenceSections: Object.freeze(["24.3.2.b", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-rule-from-boundary-free-typed-morphology",
          derivationLicenseId: "cn-l24-2432b-root-plus-ya-a",
          formationRuleTier: "typed-internal-morphology",
          sourceAnalysisId: rootPlusYaAnalysis.analysisId,
          sourceAnalysisSelectionRequired: rootPlusYaAnalysis.sourceAnalysisSelectionRequired === true,
          causativeCitationRole:
            exactRootPlusYaProfile?.causativeCitationRole || "",
          implicitAgentObjectKind:
            exactRootPlusYaProfile?.implicitAgentObjectKind || "",
          targetConstruction: Object.freeze({
            operation: "replace-morpheme",
            remove: "ya",
            add: longA,
            underlyingAdd: "a",
            lengtheningEnvironment: "preceding-vowel"
          }),
          causativeOaHistory: Object.freeze({ sourceRoute: "root-plus-ya-to-a", root, underlyingDestockalVowel: "root-plus-ya" })
        }));
        return candidates;
      }
      if (sourceDescriptor.sourceClass === "B" && shape.finalLetter === "i") {
        const replacementTarget = exactWitness?.targetStem || replaceClassicalNahuatlVncDerivationRightEdgeBeforeVowel(sourceDescriptor.sourceStem, 1, "a");
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          ...getDestockalPreferenceFields("replacement"),
          optionId: `causative:type-one:replacement:${sourceDescriptor.sourceStem}:${replacementTarget}`,
          label: `${replacementTarget} (type-one causative · final i replacement${exactWitness ? " · lexical license" : ""})`,
          derivationSubtype: "type-one",
          derivationRoute: exactWitness?.derivationRoute || "type-one-final-i-replacement",
          procedure: "replace-final-i-with-causative-a",
          suffix: "a",
          targetStem: replacementTarget,
          targetClass: "B",
          sourceMeaning: exactWitness?.sourceMeaning || "",
          targetMeaning: exactWitness?.targetMeaning || "",
          additionalTargetReadings: Object.freeze(
            (exactWitness?.additionalTargetReadings || []).map(reading => (
              Object.freeze({
                meaning: reading?.meaning || "",
                relation: reading?.relation || ""
              })
            ))
          ),
          ruleId: exactWitness?.ruleId || "cn-l24-2431a-final-i-replacement",
          andrewsSection: "24.3.1.a",
          evidenceSections: exactWitness?.evidenceSections || Object.freeze(["24.3.1.a", "24.8.1", "24.9"]),
          authorityStatus: exactWitness ? "exact-witness-over-productive-andrews-rule" : "productive-andrews-final-shape-rule",
          exactWitness: Boolean(exactWitness),
          lexicalChoiceRequired: !exactWitness,
          derivationLicenseId: exactWitness?.ruleId || "cn-l24-2431a-final-i-replacement",
          optionAliases: exactWitness ? [exactWitness.ruleId] : [],
          sourceAnalysisId: destockalNiAnalysis?.analysisId || destockalHuiAnalysis?.analysisId || "",
          sourceAnalysisSelectionRequired: (destockalNiAnalysis || destockalHuiAnalysis)?.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "replace-final", remove: "i", add: "a" })
        }));
        if (exactWitness) {
          return candidates;
        }
        const additionTarget = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, longA);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          ...getDestockalPreferenceFields("addition"),
          optionId: `causative:type-one:addition:${sourceDescriptor.sourceStem}:${additionTarget}`,
          label: `${additionTarget} (type-one causative · preserve final i + ${longA})`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-final-i-addition",
          procedure: "preserve-source-and-add-long-causative-a",
          suffix: longA,
          underlyingSuffix: "ā",
          suffixLength: "long-after-vowel",
          targetStem: additionTarget,
          targetClass: "C",
          ruleId: "cn-l24-2431b-final-i-addition",
          andrewsSection: "24.3.1.b",
          evidenceSections: Object.freeze(["24.3.1.b", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-final-shape-alternative",
          lexicalChoiceRequired: true,
          derivationLicenseId: "cn-l24-2431b-final-i-addition",
          sourceAnalysisId: destockalNiAnalysis?.analysisId || destockalHuiAnalysis?.analysisId || "",
          sourceAnalysisSelectionRequired: (destockalNiAnalysis || destockalHuiAnalysis)?.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: longA })
        }));
      } else if (sourceDescriptor.sourceClass === "A" && shape.finalLetter === "i") {
        const additionTarget = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, longA);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:addition:${sourceDescriptor.sourceStem}:${additionTarget}`,
          label: `${additionTarget} (type-one causative · Class A final i preserved + ${longA})`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-final-i-addition",
          procedure: "preserve-source-and-add-long-causative-a",
          suffix: longA,
          underlyingSuffix: "ā",
          suffixLength: "long-after-vowel",
          targetStem: additionTarget,
          targetClass: "C",
          ruleId: "cn-l24-2431b-final-i-addition",
          andrewsSection: "24.3.1.b",
          evidenceSections: Object.freeze(["24.3.1.b", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-class-a-final-i-addition",
          lexicalChoiceRequired: false,
          derivationLicenseId: "cn-l24-2431b-final-i-addition",
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: longA })
        }));
      } else if (sourceDescriptor.sourceClass === "A" && shape.finalLetter === "a" && shape.precedingLetter !== "y") {
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:final-a-replacement:${sourceDescriptor.sourceStem}`,
          label: `${sourceDescriptor.sourceStem} (type-one causative · final a replaced morphologically; same surface)`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-final-a-morphological-replacement",
          procedure: "replace-final-source-a-with-homophonous-causative-a",
          suffix: "a",
          targetStem: sourceDescriptor.sourceStem,
          targetClass: "B",
          ruleId: "cn-l24-2432a-final-a-morphological-replacement",
          andrewsSection: "24.3.2.a",
          evidenceSections: Object.freeze(["24.3.2.a", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-final-shape-rule",
          derivationLicenseId: "cn-l24-2432a-final-a-morphological-replacement",
          targetConstruction: Object.freeze({ operation: "morphological-replacement", remove: "source-a", add: "causative-a", surfaceChange: false })
        }));
      }
      return candidates;
    }
    function getClassicalNahuatlTypeTwoCausativeOptions(sourceDescriptor = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.getClassicalNahuatlNonactiveStemOptions !== "function" || typeof runtimeTarget?.deriveClassicalNahuatlNonactiveStemRecord !== "function" || typeof runtimeTarget?.isClassicalNahuatlNonactiveStemRecord !== "function") {
        return [];
      }
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor);
      if (!doesClassicalNahuatlMorphemicSourceProfileAgree(analysis, sourceDescriptor)) {
        return [];
      }
      if (
        !isClassicalNahuatlRecursiveCaquiCausativeSourceLicensed(
          sourceDescriptor,
        )
      ) {
        return [];
      }
      const shape = analysis.sourceFinalShapeFrame;
      const morphemicSourceProfile = analysis.morphemicSourceProfile;
      const intransitiveWithoutObjects = sourceDescriptor.sourceValence === "intransitive" && sourceDescriptor.sourceObjectCount === 0;
      const scopeFields = {
        derivationType: "causative",
        derivationSubtype: "type-two",
        ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
        formationLesson: "25",
        scopeModel: "causative-source-vnc-core",
        scopeSection: "24.9",
        scopeRule: "The causative governs the source subject together with the source VNC core.",
        participantRule: sourceDescriptor.sourceObjectCount ? "The source subject becomes the causative object; older source objects remain at their earlier derivational levels." : "The source subject becomes the causative object and a new outer subject is imported.",
        licensedSourceClass: sourceDescriptor.sourceClass,
        licensedSourceValence: sourceDescriptor.sourceValence,
        licensedMinimumSourceObjectCount: 0,
        licensedMaximumSourceObjectCount: 2,
        sourceAnalysisFrame: analysis,
        sourceFinalShapeFrame: shape,
        morphemicSourceProfile,
        sourceShapeAgreement: true,
        productiveSourceAuthority: "typed-morphemic-source-profile",
        sourceInternalMorphology: analysis.sourceInternalMorphology,
        productivityStatus: "andrews-category-rule",
        lexicalChoiceRequired: false,
        optionAliases: []
      };
      const candidates = [];
      const lia = "liā";
      if (intransitiveWithoutObjects
        && ["A", "B"].includes(sourceDescriptor.sourceClass)
        && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "pīn-ā-hua")) {
        // §24.6 supplies the hua/uh alternation; §25.8 licenses this
        // exceptional Type 2 formation. Retain the authenticated root and
        // stock, alternate only hua, then append tiā. No invented nonactive
        // bridge or whole-stem answer substitutes for these operations.
        const retainedBase = replaceClassicalNahuatlVncDerivationRightEdge(
          sourceDescriptor.sourceStem, 3, "uh",
        );
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(retainedBase, "tiā");
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:exact-pinahua-pinauhtia:${sourceDescriptor.sourceStem}`,
          label: `${targetStem} (type-two causative · hua → uh + tiā)`,
          derivationRoute: "type-two-exact-pinahua-to-pinauhtia",
          procedure: "alternate-licensed-final-hua-with-uh-and-append-tia",
          suffix: "tiā",
          targetStem,
          targetClass: "C",
          ruleId: "cn-l25-258-pinahua-pinauhtia-type-two",
          andrewsSection: "25.8",
          evidenceSections: Object.freeze(["24.6.1", "25.8", "25.9", "25.15"]),
          authorityStatus: "typed-source-alternation-and-causative-suffix",
          exactWitness: true,
          derivationLicenseId: "cn-l25-258-pinahua-pinauhtia-type-two",
          formationRuleTier: "typed-lexical-exact",
          productivityStatus: "exact-andrews-witness",
          lexicalChoiceRequired: false,
          targetConstruction: Object.freeze({
            operation: "replace-morpheme-and-append",
            preserveInternalQuantity: true,
            remove: "hua",
            replaceWith: "uh",
            retainedBase,
            add: "tiā"
          })
        }));
      }
      if (intransitiveWithoutObjects && sourceDescriptor.sourceClass === "A" && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "tla-zo-h-ti")) {
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:exact-tlazohti-lia:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `Type 2 causative · ${targetStem} · Andrews §26.7 note`,
          derivationRoute: "type-two-denominal-ti-lia-homophone-exact",
          procedure: "preserve-denominal-ti-source-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-267-note-tlazohti-causative-homophone",
          andrewsSection: "26.7 note",
          evidenceSections: Object.freeze(["25.5.1", "26.7 note", "26.23"]),
          authorityStatus: "exact-andrews-homophonous-causative-analysis",
          exactWitness: true,
          derivationLicenseId: "cn-l26-267-note-tlazohti-causative-homophone",
          formationRuleTier: "exact-lexical-overlay",
          productivityStatus: "exact-andrews-witness",
          lexicalChoiceRequired: false,
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: lia })
        }));
      }
      const denominalTiAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "denominal-ti-candidate");
      const rootPlusYaAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "root-plus-ya");
      const exactLiaSourceDisposition =
        getClassicalNahuatlTypeTwoCausativeLiaSourceDisposition(
          sourceDescriptor,
        );
      const exactLiaLicensed =
        exactLiaSourceDisposition?.disposition === "licensed-lia";
      const exactLiaBlocked =
        exactLiaSourceDisposition?.disposition === "blocked-lia-use-l-tia";
      const exactLiaSourceAnalysisId = exactLiaSourceDisposition
        ? `${exactLiaSourceDisposition.sourceAnalysisId}:`
          + exactLiaSourceDisposition.sourceAnalysisCategory
        : "";
      const boundaryFreeDenominalTi = intransitiveWithoutObjects
        && ["A", "B"].includes(sourceDescriptor.sourceClass)
        && Boolean(denominalTiAnalysis)
        && !exactLiaBlocked
        && (!exactLiaSourceDisposition
          || (exactLiaLicensed
            && denominalTiAnalysis.analysisId === exactLiaSourceAnalysisId));
      if (boundaryFreeDenominalTi) {
        const analyzedSourceStem = joinClassicalNahuatlVncDerivationMorphemes(
          ...denominalTiAnalysis.segments,
        );
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(
          analyzedSourceStem,
          lia,
        );
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:denominal-ti-lia:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two causative · boundary-free denominal-ti analysis + ${lia})`,
          derivationRoute: "type-two-lia-from-typed-denominal-ti",
          procedure: "preserve-typed-denominal-ti-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: exactLiaSourceDisposition?.ruleId || "cn-l25-2551-denominal-ti-lia",
          andrewsSection: exactLiaSourceDisposition?.andrewsSection || "25.5.1",
          evidenceSections: exactLiaSourceDisposition?.evidenceSections || Object.freeze(["25.1", "25.5.1", "25.9", "25.15"]),
          authorityStatus: exactLiaLicensed
            ? "owner-issued-typed-lexical-source-analysis"
            : "productive-andrews-rule-from-boundary-free-typed-morphology",
          exactWitness: exactLiaLicensed,
          derivationLicenseId: exactLiaSourceDisposition?.derivationLicenseId || "cn-l25-2551-denominal-ti-lia",
          formationRuleTier: exactLiaLicensed
            ? "typed-lexical-source-analysis"
            : "typed-internal-morphology-exception",
          lexicalChoiceRequired: !exactLiaLicensed,
          sourceAnalysisId: denominalTiAnalysis.analysisId,
          sourceAnalysisSelectionRequired: denominalTiAnalysis.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: lia })
        }));
      }
      const boundaryFreeRootPlusYa = intransitiveWithoutObjects
        && (["A", "B"].includes(sourceDescriptor.sourceClass)
          || sourceDescriptor.sourceClass==="" && sourceDescriptor.analyticalSourceAnalysis?.formation==="root-plus-ya"
            && sourceDescriptor.analyticalSourceAnalysis.licensedOperationRuleIds.includes("cn-l25-2552-root-plus-ya-lia"))
        && Boolean(rootPlusYaAnalysis)
        && !exactLiaBlocked
        && (!exactLiaSourceDisposition
          || (exactLiaLicensed
            && rootPlusYaAnalysis.analysisId === exactLiaSourceAnalysisId));
      if (boundaryFreeRootPlusYa) {
        const root = rootPlusYaAnalysis.root;
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:root-plus-ya-lia:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two causative · boundary-free root+ya → root+${lia})`,
          derivationRoute: "type-two-lia-from-typed-root-plus-ya",
          procedure: "delete-typed-derivational-ya-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: exactLiaSourceDisposition?.ruleId || "cn-l25-2552-root-plus-ya-lia",
          andrewsSection: exactLiaSourceDisposition?.andrewsSection || "25.5.2",
          evidenceSections: exactLiaSourceDisposition?.evidenceSections || Object.freeze(["25.1", "25.5.2", "25.9", "25.15"]),
          authorityStatus: exactLiaLicensed
            ? "owner-issued-typed-lexical-source-analysis"
            : "productive-andrews-rule-from-boundary-free-typed-morphology",
          exactWitness: exactLiaLicensed,
          derivationLicenseId: exactLiaSourceDisposition?.derivationLicenseId || "cn-l25-2552-root-plus-ya-lia",
          formationRuleTier: exactLiaLicensed
            ? "typed-lexical-source-analysis"
            : "typed-internal-morphology-exception",
          lexicalChoiceRequired: !exactLiaLicensed,
          sourceAnalysisId: rootPlusYaAnalysis.analysisId,
          sourceAnalysisSelectionRequired: rootPlusYaAnalysis.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "ya", add: lia })
        }));
      }
      const yauhSuppletiveWitness = CLASSICAL_NAHUATL_LESSONS24_25_SOURCE_ANALYSIS_WITNESSES.find(witness => witness.analysisId === "cn-l25-251-yauh-suppletive-source") || null;
      const huallauhSuppletiveWitness = CLASSICAL_NAHUATL_LESSONS24_25_SOURCE_ANALYSIS_WITNESSES.find(witness => witness.analysisId === "cn-l25-251-huallauh-suppletive-source") || null;
      const matchesYauhSuppletive = yauhSuppletiveWitness?.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias)) === true;
      const matchesHuallauhSuppletive = huallauhSuppletiveWitness?.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias)) === true;
      const suppletiveAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, matchesHuallauhSuppletive ? "directional-suppletive-causative-source" : "suppletive-causative-source");
      if (suppletiveAnalysis && intransitiveWithoutObjects && sourceDescriptor.sourceClass === "D" && (matchesYauhSuppletive || matchesHuallauhSuppletive)) {
        const targetStem = "huīca";
        const directionalTargetEnvironment = matchesHuallauhSuppletive ? Object.freeze({
          directionalPrefix: "huāl",
          directionalMeaning: "proximity-hither-here",
          environmentSource: "suppletive-huallauh-causative",
          andrewsSection: "25.1 note"
        }) : null;
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:${matchesHuallauhSuppletive ? "suppletive-huallauh-hual-huica" : "suppletive-yauh-huica"}:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${matchesHuallauhSuppletive ? `huāl+${targetStem}` : targetStem} (type-two causative · suppletive source for ${matchesHuallauhSuppletive ? "huāl-la-uh" : "ya-uh"})`,
          derivationRoute: matchesHuallauhSuppletive ? "type-two-suppletive-huallauh-hual-huica" : "type-two-suppletive-yauh-huica",
          procedure: matchesHuallauhSuppletive ? "replace-irregular-huallauh-source-with-directional-hual-plus-suppletive-huica" : "replace-irregular-yauh-source-with-suppletive-huica",
          suffix: "",
          targetStem,
          targetClass: "A",
          ruleId: matchesHuallauhSuppletive ? "cn-l25-251-note-huallauh-hual-huica-suppletion" : "cn-l25-251-note-yauh-huica-suppletion",
          andrewsSection: "25.1 note",
          evidenceSections: Object.freeze(["25.1 note", "25.9", "25.15"]),
          authorityStatus: "exact-andrews-suppletive-causative-source",
          exactWitness: true,
          derivationLicenseId: matchesHuallauhSuppletive ? "cn-l25-251-note-huallauh-hual-huica-suppletion" : "cn-l25-251-note-yauh-huica-suppletion",
          formationRuleTier: "typed-lexical-suppletion",
          sourceAnalysisId: suppletiveAnalysis.analysisId,
          targetConstruction: Object.freeze({
            operation: "suppletion",
            remove: matchesHuallauhSuppletive ? "huāl-la-uh" : "ya-uh",
            add: targetStem,
            ...(directionalTargetEnvironment ? { directionalPrefix: directionalTargetEnvironment.directionalPrefix } : {})
          }),
          targetEnvironment: directionalTargetEnvironment
        }));
      }
      const structuralInternalBridgeLicenses =
        getClassicalNahuatlTypeTwoHuaStructuralBridgeLicenses(
          sourceDescriptor,
        );
      const internalBridgeLicenses = [
        ...CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES,
        ...structuralInternalBridgeLicenses,
        ...getClassicalNahuatlTypeTwoKiLoStructuralBridgeLicenses(sourceDescriptor),
        ...getClassicalNahuatlTypeTwoNiLoStructuralBridgeLicenses(sourceDescriptor),
      ];
      const exactInternalBridgeFrames =
        internalBridgeLicenses
          .map(license =>
            buildClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
              sourceDescriptor,
              license,
            ))
          .filter(frame =>
            isClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
              frame,
              sourceDescriptor,
            ));
      const canonicalLexicalSourceRecord =
        getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(
          sourceDescriptor,
        );
      if (
        canonicalLexicalSourceRecord?.sourceLexemeSelectionRequired === true
        && !exactInternalBridgeFrames.length
      ) {
        // A genuinely ambiguous lexical Source must resolve its lexical
        // identity before derivation. Mere presence in a Canvas witness table
        // never prevents a differently typed Source with the same spelling
        // from using the productive Lesson 20 shape route.
        return [];
      }
      const inventory = runtimeTarget.getClassicalNahuatlNonactiveStemOptions(sourceDescriptor.sourceStem, {
        verbClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence
      });
      const permittedFamilies = new Set(["hua", "ō", "o-hua", "lō"]);
      const bridgeOptions = (Array.isArray(inventory?.options) ? inventory.options : []).filter(option => permittedFamilies.has(option.suffixFamily)).flatMap(option => {
        if (exactLiaLicensed
          && exactLiaSourceDisposition.blockedLesson20SuffixFamilies.includes(
            option.suffixFamily,
          )) {
          return [];
        }
        if (exactInternalBridgeFrames.some(frame =>
          frame.blockedLesson20SuffixFamilies.includes(
            option.suffixFamily,
          ))) {
          return [];
        }
        if (["ō", "o-hua"].includes(option.suffixFamily) && hasClassicalNahuatlTwoConsonantClusterBeforeFinalVowel(sourceDescriptor.sourceStem)) {
          return [];
        }
        const record = runtimeTarget.deriveClassicalNahuatlNonactiveStemRecord(sourceDescriptor.sourceStem, {
          verbClass: sourceDescriptor.sourceClass,
          sourceValence: sourceDescriptor.sourceValence,
          optionId: option.optionId
        });
        if (!runtimeTarget.isClassicalNahuatlNonactiveStemRecord(record, sourceDescriptor.sourceStem) || record.selectedOptionId !== option.optionId || record.selectedRuleId !== option.ruleId || record.nonactiveStem !== option.nonactiveStem || record.suffixFamily !== option.suffixFamily) {
          return [];
        }
        const licensedExactFrameForRecord = exactInternalBridgeFrames.find(
          frame => (
            frame.suffixFamily === record.suffixFamily
            && [
              record.nonactiveStem,
              record.imperfectiveNonactiveStem,
              record.perfectiveNonactiveStem,
            ].filter(Boolean).some(nonactiveAllomorph =>
              hasClassicalNahuatlVncDerivationLexicalKey(
                frame.nonactiveStem,
                nonactiveAllomorph,
              ))
          ),
        ) || null;
        if (
          licensedExactFrameForRecord
          && licensedExactFrameForRecord.lesson20PrerequisitePolicy
            !== "independent-lesson20"
        ) {
          return [];
        }
        const exactFamilyLicenses = exactInternalBridgeFrames.filter(
          frame => frame.suffixFamily === record.suffixFamily,
        );
        if (
          exactFamilyLicenses.length
          && !exactFamilyLicenses.some(frame =>
            [
              record.nonactiveStem,
              record.imperfectiveNonactiveStem,
              record.perfectiveNonactiveStem,
            ].filter(Boolean).some(nonactiveAllomorph =>
              hasClassicalNahuatlVncDerivationLexicalKey(
                nonactiveAllomorph,
                frame.nonactiveStem,
              )))
        ) {
          return [];
        }
        const retainedRootPlusYaNonactive = rootPlusYaAnalysis
          && hasClassicalNahuatlVncDerivationLexicalKey(record.nonactiveStem, `${sourceDescriptor.sourceStem}-lō`);
        if (rootPlusYaAnalysis
          && record.suffixFamily === "lō"
          && !hasClassicalNahuatlVncDerivationLexicalKey(record.nonactiveStem, `${rootPlusYaAnalysis.root}-lō`)
          && !retainedRootPlusYaNonactive) {
          return [];
        }
        if (sourceDescriptor.sourceClass === "A" && intransitiveWithoutObjects && shape.finalLetter === "ō" && record.suffixFamily === "hua") {
          const huia = "huiā";
          const exactRouteChoice = getClassicalNahuatlFinalOHuiaExactRouteChoice(sourceDescriptor);
          const routes =
            getClassicalNahuatlFinalOHuiaFormationRoutes(sourceDescriptor);
          return routes.map(route => finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...scopeFields,
            optionId: `causative:type-two:final-o:${route.route}:${record.selectedOptionId}`,
            label: `${route.targetStem} (type-two causative · final ō ${route.route} ${huia}${exactRouteChoice ? " · lexical route" : " · user-selectable route"})`,
            derivationRoute: `type-two-final-o-${route.route}-huia`,
            procedure: route.operation,
            suffix: huia,
            targetStem: route.targetStem,
            targetClass: "C",
            ruleId: route.causativeRuleId,
            andrewsSection: "25.6",
            evidenceSections: Object.freeze(["25.1", "25.6", "25.9", "25.15"]),
            authorityStatus: exactRouteChoice ? "typed-lexical-route-over-productive-huia-rule" : "productive-rule-plus-typed-hua-nonactive-record",
            exactWitness: Boolean(exactRouteChoice),
            derivationLicenseId: route.causativeRuleId,
            licensedLesson20OptionId: record.selectedOptionId,
            licensedLesson20RuleId: record.selectedRuleId,
            licensedLesson20NonactiveStem: record.nonactiveStem,
            licensedLesson20SuffixFamily: record.suffixFamily,
            lesson20OptionId: record.selectedOptionId,
            lesson20RuleId: record.selectedRuleId,
            lesson20NonactiveStemRecord: record,
            formationRuleTier: exactRouteChoice ? "typed-lexical-route" : "typed-nonactive-category-rule",
            lexicalChoiceRequired: !exactRouteChoice,
            citationBridgeStem: record.citationBridgeVisibility ? record.nonactiveStem : "",
            citationBridgeVisibility: record.citationBridgeVisibility || "",
            citationBridgeHypothetical: typeof record.citationBridgeHypothetical === "boolean"
              ? record.citationBridgeHypothetical
              : null,
            citationBridgeAuthority: record.citationBridgeVisibility ? "typed-nonactive-bridge" : "",
            targetConstruction: route.targetConstruction
          }));
        }
        // Type-two causative -tiā is inherently long in Andrews §25.1. The
        // source's use or absence of other macrons never shortens this suffix;
        // bounded lexical witnesses may still relocate quantity internally.
        const tia = "tiā";
        const familyRule = {
          hua: { section: "25.2", ruleId: "cn-l25-252-hua-to-tia", route: "type-two-tia-from-hua-nonactive", removeCount: 3, remove: "hua" },
          "ō": { section: "25.3", ruleId: "cn-l25-253-o-to-tia", route: "type-two-tia-from-o-nonactive", removeCount: 1, remove: "ō" },
          "o-hua": { section: "25.3", ruleId: "cn-l25-253-o-hua-to-tia", route: "type-two-tia-from-o-hua-nonactive", removeCount: 5, remove: "o-hua" },
          "lō": { section: "25.4", ruleId: "cn-l25-254-lo-to-l-tia", route: "type-two-tia-from-lo-nonactive", removeCount: 1, remove: "ō" }
        }[record.suffixFamily];
        const retainedStemBeforeDerivativeBoundary = normalizeClassicalNahuatlVncDerivationStem(record.nonactiveStem)
          .slice(0, Math.max(0, normalizeClassicalNahuatlVncDerivationStem(record.nonactiveStem).length - familyRule.removeCount))
          .replace(/-+$/gu, "");
        const boundarySpellingFrame = buildClassicalNahuatlVncDerivationBoundarySpellingFrame(record.nonactiveStem, retainedStemBeforeDerivativeBoundary, tia);
        const requiresClassBFinalMToNBoundary = sourceDescriptor.sourceClass === "B"
          && record.suffixFamily === "o-hua"
          && licensedExactFrameForRecord?.classBFinalMToNBoundaryPolicy
            !== "preserve-m"
          && /m$/u.test(boundarySpellingFrame.realizedRetainedStem);
        const classBFinalMToNBoundaryFrame = requiresClassBFinalMToNBoundary
          ? buildClassicalNahuatlVncDerivationBoundaryEnvironmentFrame({
            sourceDescriptor,
            inputStem: boundarySpellingFrame.realizedRetainedStem,
            outputStem: boundarySpellingFrame.realizedRetainedStem.replace(/m$/u, "n"),
            followingMorpheme: tia,
            ruleId: "cn-l7-74-phonological-changes",
            changeRule: "class-b-m-to-n"
          })
          : null;
        if (requiresClassBFinalMToNBoundary && classBFinalMToNBoundaryFrame?.authorizationStatus !== "authorized") {
          return [];
        }
        const realizedRetainedStem = classBFinalMToNBoundaryFrame?.outputStem || boundarySpellingFrame.realizedRetainedStem;
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(realizedRetainedStem, tia);
        const exactBridgeFrame = licensedExactFrameForRecord;
        const exactLicense = exactBridgeFrame
          ? internalBridgeLicenses.find(
            license => license.derivationLicenseId
              === exactBridgeFrame.derivationLicenseId,
          ) || null
          : null;
        const resolvedTargetStem = exactBridgeFrame?.targetStem || targetStem;
        return [finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:${record.selectedOptionId}`,
          label: `${resolvedTargetStem} (type-two causative · ${record.suffixFamily} nonactive → ${tia}${exactLicense?.sourceMatchAuthority === "typed-morphemic-source-structure" ? " · typed Source structure" : exactLicense ? " · lexical license" : ""})`,
          derivationRoute: exactLicense?.derivationRoute || familyRule.route,
          procedure: "map-canonical-lesson20-nonactive-family-to-type-two-causative",
          suffix: tia,
          targetStem: resolvedTargetStem,
          targetClass: "C",
          ruleId: exactLicense?.ruleId || `${familyRule.ruleId}:${record.selectedRuleId}`,
          andrewsSection: exactLicense?.andrewsSection || familyRule.section,
          evidenceSections: exactLicense?.evidenceSections || Object.freeze(["25.1", familyRule.section, "25.11", "25.15"]),
          authorityStatus: exactLicense?.sourceMatchAuthority === "typed-morphemic-source-structure"
            ? "typed-morphemic-source-rule-over-productive-nonactive-bridge"
            : exactLicense
              ? "typed-lexical-license-over-productive-nonactive-bridge"
              : "productive-rule-plus-typed-nonactive-record",
          exactWitness: Boolean(exactLicense && exactLicense.sourceMatchAuthority !== "typed-morphemic-source-structure"),
          derivationLicenseId: exactLicense?.derivationLicenseId || familyRule.ruleId,
          licensedLesson20OptionId: record.selectedOptionId,
          licensedLesson20RuleId: record.selectedRuleId,
          licensedLesson20NonactiveStem: record.nonactiveStem,
          licensedLesson20SuffixFamily: record.suffixFamily,
          lesson20OptionId: record.selectedOptionId,
          lesson20RuleId: record.selectedRuleId,
          lesson20NonactiveStemRecord: record,
          sourceFinalShapeFrame: record.sourceFinalShapeFrame,
          sourceInternalMorphology: record.sourceInternalMorphology,
          formationRuleTier: exactLicense?.sourceMatchAuthority === "typed-morphemic-source-structure"
            ? "typed-morphemic-source-rule"
            : exactLicense
              ? "typed-lexical-license"
              : "typed-nonactive-category-rule",
          productivityStatus: "andrews-category-rule",
          lexicalChoiceRequired: false,
          optionAliases: exactLicense ? [exactLicense.ruleId] : [],
          citationBridgeStem: record.citationBridgeVisibility ? record.nonactiveStem : "",
          citationBridgeVisibility: record.citationBridgeVisibility || "",
          citationBridgeHypothetical: typeof record.citationBridgeHypothetical === "boolean"
            ? record.citationBridgeHypothetical
            : null,
          citationBridgeAuthority: record.citationBridgeVisibility ? "typed-nonactive-bridge" : "",
          causativeCitationRole: exactLicense?.causativeCitationRole || "",
          ...(exactBridgeFrame ? {
            typeTwoBridgeStem: exactBridgeFrame.nonactiveStem,
            typeTwoBridgeSuffixFamily: exactBridgeFrame.suffixFamily,
            formulaTargetStem: exactBridgeFrame.formulaTargetStem,
            typeTwoInternalBridgeFrame: exactBridgeFrame,
          } : {}),
          targetConstruction: Object.freeze({
            operation: "replace-nonactive-right-edge",
            nonactiveStem:
              exactBridgeFrame?.nonactiveStem
              || record.nonactiveStem,
            remove: familyRule.remove,
            add: tia,
            ...(boundarySpellingFrame.changed || classBFinalMToNBoundaryFrame || exactBridgeFrame ? {
              productiveTargetStem: resolvedTargetStem,
              boundarySpellingFrame:
                exactBridgeFrame?.boundarySpellingFrame
                || boundarySpellingFrame,
              ...((exactBridgeFrame?.classBFinalMToNBoundaryFrame
                || classBFinalMToNBoundaryFrame) ? {
                classBFinalMToNBoundaryFrame:
                  exactBridgeFrame?.classBFinalMToNBoundaryFrame
                  || classBFinalMToNBoundaryFrame
              } : {})
            } : {})
          })
        })];
      });
      const bridgedExactLicenseIds = new Set(
        bridgeOptions
          .map(option => option.derivationLicenseId)
          .filter(Boolean),
      );
      const internalBridgeOptions = exactInternalBridgeFrames
        .filter(frame => !bridgedExactLicenseIds.has(frame.derivationLicenseId))
        .map(frame => {
          const license =
            internalBridgeLicenses.find(
              candidate => candidate.derivationLicenseId
                === frame.derivationLicenseId,
            );
          if (!license) return null;
          return finalizeClassicalNahuatlVncDerivationOption(
            sourceDescriptor,
            {
              ...scopeFields,
              optionId:
                `causative:type-two:${license.derivationLicenseId}:`
                + `${sourceDescriptor.sourceStem}`,
              label:
                `${frame.targetStem} (type-two causative · `
                + `${frame.suffixFamily} internal nonactive prerequisite)`,
              derivationRoute: license.derivationRoute,
              procedure:
                "derive-internal-nonactive-prerequisite-and-replace-right-edge-with-tia",
              suffix: frame.followingMorpheme,
              targetStem: frame.targetStem,
              targetClass: frame.targetClass,
              ruleId: license.ruleId,
              andrewsSection: license.andrewsSection,
              evidenceSections: license.evidenceSections,
              authorityStatus: license.sourceMatchAuthority === "typed-morphemic-source-structure"
                ? "typed-morphemic-source-rule-plus-derived-internal-nonactive-prerequisite"
                : "typed-lexical-route-plus-derived-internal-nonactive-prerequisite",
              exactWitness: license.sourceMatchAuthority !== "typed-morphemic-source-structure",
              derivationLicenseId: license.derivationLicenseId,
              formationRuleTier: license.sourceMatchAuthority === "typed-morphemic-source-structure"
                ? "typed-morphemic-internal-nonactive-prerequisite"
                : "typed-lexical-internal-nonactive-prerequisite",
              productivityStatus: "andrews-internal-base-rule",
              lexicalChoiceRequired: false,
              optionAliases: [license.ruleId],
              typeTwoBridgeStem: frame.nonactiveStem,
              typeTwoBridgeSuffixFamily: frame.suffixFamily,
              formulaTargetStem: frame.formulaTargetStem,
              typeTwoInternalBridgeFrame: frame,
              citationBridgeStem: frame.nonactiveStem,
              citationBridgeVisibility: "typed-internal-prerequisite",
              citationBridgeHypothetical: license.citationBridgeHypothetical === true,
              citationBridgeAuthority:
                "owner-issued-derivation-internal-nonactive-prerequisite",
              causativeCitationRole: license.causativeCitationRole || "",
              implicitAgentObjectKind:
                license.implicitAgentObjectKind || "",
              targetConstruction: Object.freeze({
                operation: "replace-internal-nonactive-right-edge",
                nonactiveStem: frame.nonactiveStem,
                remove: frame.suffixFamily === "lō"
                  ? "ō"
                  : frame.suffixFamily,
                add: frame.followingMorpheme,
                productiveTargetStem: frame.targetStem,
                boundarySpellingFrame: frame.boundarySpellingFrame,
                ...(frame.classBFinalMToNBoundaryFrame
                  ? {
                    classBFinalMToNBoundaryFrame:
                      frame.classBFinalMToNBoundaryFrame,
                  }
                  : {}),
              }),
            },
          );
        })
        .filter(Boolean);
      return [...candidates, ...bridgeOptions, ...internalBridgeOptions];
    }
    function hasClassicalNahuatlEstablishedCausativeLiaSource(sourceDescriptor = {}) {
      return sourceDescriptor.sourceValence === "intransitive"
        && sourceDescriptor.sourceObjectCount === 0
        && getClassicalNahuatlTypeTwoCausativeOptions(sourceDescriptor).some(option => (
          ["type-two-lia-from-typed-denominal-ti",
            "type-two-lia-from-typed-root-plus-ya",
            "type-two-denominal-ti-lia-homophone-exact"].includes(option.derivationRoute)
          && option.sourceAnalysisSelectionRequired !== true
          && option.lexicalChoiceRequired !== true
        ));
    }
    function getClassicalNahuatlLicensedApplicativeOptions(sourceDescriptor = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor);
      if (
        !doesClassicalNahuatlMorphemicSourceProfileAgree(analysis, sourceDescriptor)
        || sourceDescriptor.sourceObjectCount > 2
      ) {
        return [];
      }
      // §26.3 excludes Sources with an established causative-liā analysis.
      // Reuse the causative owner's issued formation category, not a finished
      // target spelling or every merely possible noun+ti/root+ya analysis.
      if (hasClassicalNahuatlEstablishedCausativeLiaSource(sourceDescriptor)) {
        return [];
      }
      const shape = analysis.sourceFinalShapeFrame;
      const morphemicSourceProfile = analysis.morphemicSourceProfile;
      const morphology = analysis.sourceInternalMorphology || {};
      const morphemes = morphemicSourceProfile.explicitMorphemes;
      const finalMorpheme = morphemes.at(-1) || "";
      // These are canonical tenseless applicative stems. Their suffix vowel is
      // long here; Lesson 7 selects the tense-bearing formulaic allomorph.
      const lia = "liā";
      const huia = "huiā";
      const transitiveSource = sourceDescriptor.sourceValence !== "intransitive";
      // Fusion removes the old tla object, but preserves its authenticated
      // stem formation history. Use that history only for suffix formation;
      // participant import still uses the actual zero-object fused Source.
      const fusionFrame = sourceDescriptor.formationSourceMachineryFrame?.tlaFusionRuleFrame;
      const fusedTransitiveFormationSource = sourceDescriptor.sourceObjectCount === 0
        && fusionFrame?.authorizationStatus === "authorized"
        && fusionFrame.fused === true
        && fusionFrame.ruleInputs?.requestedSourceValence === "projective-nonhuman"
        && fusionFrame.ruleOutputs?.targetObjectSlot === "none";
      const common = {
        derivationType: "applicative",
        derivationSubtype: "type-two",
        ruleTagId: "cn-l26-applicative-imported-object-transform",
        formationLesson: "26",
        scopeModel: "applicative-object-suffix-discontinuous-unit",
        scopeSection: "26.23",
        scopeRule: "The imported object and applicative suffix form a discontinuous unit; the source VNC is not the applicative object.",
        participantRule: "The source subject is preserved while a new applicative object is imported above older source objects.",
        licensedSourceClass: sourceDescriptor.sourceClass,
        licensedSourceValence: sourceDescriptor.sourceValence,
        licensedMinimumSourceObjectCount: 0,
        licensedMaximumSourceObjectCount: 2,
        sourceAnalysisFrame: analysis,
        sourceFinalShapeFrame: shape,
        morphemicSourceProfile,
        sourceShapeAgreement: true,
        productiveSourceAuthority: "typed-morphemic-source-profile",
        sourceInternalMorphology: analysis.sourceInternalMorphology,
        formationRuleTier: "productive-final-shape",
        productivityStatus: "andrews-category-rule",
        lexicalChoiceRequired: false,
        optionAliases: []
      };
      const candidates = [];
      const exactFormations = CLASSICAL_NAHUATL_APPLICATIVE_EXACT_FORMATIONS.filter(formation => (
        formation.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias))
        && formation.sourceClasses.includes(sourceDescriptor.sourceClass)
        && (!formation.sourceValences || formation.sourceValences.includes(sourceDescriptor.sourceValence))
        && (!formation.transitiveOnly || transitiveSource)
        && (formation.sourceObjectCount == null || formation.sourceObjectCount === sourceDescriptor.sourceObjectCount)
      ));
      exactFormations.forEach(formation => {
        const sourceAttestationFrame = formation.sourceAttestedObjectRuleId
          ? getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(sourceDescriptor)?.sourceAttestedObjectFact || null
          : null;
        if (formation.sourceAttestedObjectRuleId && sourceAttestationFrame?.ruleId !== formation.sourceAttestedObjectRuleId) return;
        const targetStem = sourceAttestationFrame ? sourceDescriptor.sourceStem : formation.markedTargetStem;
        const internalBridgeLicenseId =
          normalizeClassicalNahuatlVncDerivationToken(
            formation.internalNonactivePrerequisiteLicenseId,
          );
        const internalBridgeLicense = internalBridgeLicenseId
          ? CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES.find(
            license => license.derivationLicenseId === internalBridgeLicenseId,
          ) || null
          : null;
        const internalBridgeFrame = internalBridgeLicense
          ? buildClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
            sourceDescriptor,
            internalBridgeLicense,
          )
          : null;
        if (
          internalBridgeLicenseId
          && (
            !internalBridgeLicense
            || !isClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
              internalBridgeFrame,
              sourceDescriptor,
            )
            || internalBridgeFrame.nonactiveStem
              !== formation.targetConstruction?.nonactiveStem
            || internalBridgeFrame.targetStem !== targetStem
          )
        ) {
          return;
        }
        const targetConstruction = internalBridgeFrame
          ? Object.freeze({
            operation: "replace-internal-nonactive-right-edge",
            nonactiveStem: internalBridgeFrame.nonactiveStem,
            remove: internalBridgeFrame.suffixFamily === "lō"
              ? "ō"
              : internalBridgeFrame.suffixFamily,
            add: internalBridgeFrame.followingMorpheme,
            productiveTargetStem: internalBridgeFrame.targetStem,
            boundarySpellingFrame:
              internalBridgeFrame.boundarySpellingFrame,
            ...(internalBridgeFrame.classBFinalMToNBoundaryFrame
              ? {
                classBFinalMToNBoundaryFrame:
                  internalBridgeFrame.classBFinalMToNBoundaryFrame,
              }
              : {}),
          })
          : formation.targetConstruction;
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:${formation.derivationSubtype}:exact:${formation.ruleId}:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: sourceAttestationFrame
            ? `Attested object; formally unjustified · no suffix · Andrews §${formation.andrewsSection}`
            : `${formation.derivationSubtype.replace(/-/gu, " ")} applicative · ${targetStem} · Andrews §${formation.andrewsSection}`,
          derivationSubtype: formation.derivationSubtype,
          derivationRoute: formation.derivationRoute,
          procedure: formation.procedure,
          suffix: formation.derivationSubtype === "type-three" ? "tiā" : formation.derivationSubtype === "type-one" ? "iā" : "",
          targetStem,
          targetClass: formation.targetClass,
          ruleId: formation.ruleId,
          andrewsSection: formation.andrewsSection,
          evidenceSections: formation.evidenceSections,
          authorityStatus: "exact-andrews-source-target-license",
          exactWitness: true,
          derivationLicenseId: formation.ruleId,
          ...(typeof formation.citationBridgeHypothetical === "boolean"
            ? { citationBridgeHypothetical: formation.citationBridgeHypothetical } : {}),
          formationRuleTier: formation.formationRuleTier || "exact-lexical-overlay",
          productivityStatus: formation.productivityStatus || "exact-andrews-witness",
          sourceDefective: formation.sourceDefective === true,
          sourceMeaning: formation.sourceMeaning || "",
          geminateStatus: formation.geminateStatus || "",
          phonologicalShift: formation.phonologicalShift
            ? Object.freeze({ ...formation.phonologicalShift })
            : null,
          lexicalChoiceRequired: formation.lexicalChoiceRequired === true,
          ...(sourceAttestationFrame ? {
            sourceAttestationFrame,
            scopeModel: "source-attested-object-without-formal-suffix-license",
            scopeSection: sourceAttestationFrame.sourceSection,
            scopeRule: sourceAttestationFrame.explanation,
            productiveSourceAuthority: "none-source-attestation-only",
            authorityStatus: "exact-source-attestation-with-formal-limitation",
          } : {}),
          optionAliases: [formation.ruleId],
          ...(internalBridgeFrame ? {
            typeTwoBridgeStem: internalBridgeFrame.nonactiveStem,
            typeTwoBridgeSuffixFamily: internalBridgeFrame.suffixFamily,
            formulaTargetStem: internalBridgeFrame.formulaTargetStem,
            typeTwoInternalBridgeFrame: internalBridgeFrame,
            formationRuleTier:
              "typed-shared-internal-nonactive-prerequisite",
            citationBridgeStem: internalBridgeFrame.nonactiveStem,
            citationBridgeVisibility: "typed-internal-prerequisite",
            citationBridgeHypothetical: false,
            citationBridgeAuthority:
              "owner-issued-derivation-internal-nonactive-prerequisite",
          } : {}),
          targetConstruction,
        }));
      });
      const genericTypeOneSuppressed = exactFormations.some(formation => formation.suppressGenericTypeOne === true);
      if (!genericTypeOneSuppressed && ["A", "B"].includes(sourceDescriptor.sourceClass) && ["a", "ā", "i"].includes(shape.finalLetter)) {
        const ia = "iā";
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 1, ia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-one:optional-final-vowel-replacement:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `Type 1 applicative · ${targetStem} · Andrews §26.2 · lexical choice`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-final-vowel-replacement-optional",
          procedure: "delete-source-final-vowel-and-add-ia-as-a-user-selected-lexical-route",
          suffix: ia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-262-optional-final-vowel-replacement-ia",
          andrewsSection: "26.2",
          evidenceSections: Object.freeze(["26.2", "26.12", "26.13", "26.14", "26.23"]),
          authorityStatus: "andrews-category-possibility-requiring-lexical-choice",
          derivationLicenseId: "cn-l26-262-optional-final-vowel-replacement-ia",
          formationRuleTier: "productive-possibility-with-lexical-selection",
          productivityStatus: "andrews-unpredictable-user-selected-category",
          lexicalChoiceRequired: true,
          targetConstruction: Object.freeze({ operation: "replace-final-vowel", remove: shape.finalLetter, add: ia })
        }));
      }
      const exactFinalTlToTLicense = CLASSICAL_NAHUATL_APPLICATIVE_FINAL_TL_TO_T_EXACT_LICENSES.find(license => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem) && license.sourceClass === sourceDescriptor.sourceClass && transitiveSource && license.sourceObjectCount === sourceDescriptor.sourceObjectCount) || null;
      if (exactFinalTlToTLicense) {
        const phoneRepertoryRelation =
          getClassicalNahuatlPhoneRepertoryRelation("tl", "t");
        const repertoryBuiltTargetStem = phoneRepertoryRelation
          ? sourceDescriptor.sourceStem.replace(
            /tla$/u,
            `${phoneRepertoryRelation.phone}i-${lia}`,
          )
          : "";
        if (!hasClassicalNahuatlVncDerivationLexicalKey(repertoryBuiltTargetStem, exactFinalTlToTLicense.targetStem)) {
          return candidates;
        }
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:exact-final-tl-to-t:${exactFinalTlToTLicense.sourceStem}:${exactFinalTlToTLicense.targetStem}`,
          label: `${exactFinalTlToTLicense.targetStem} (type-two applicative · exact tl → t allomorph)`,
          derivationSubtype: "type-two-lia-exact",
          derivationRoute: "type-two-final-tla-to-ti-lia-exact",
          procedure: "replace-exact-final-tla-with-ti-and-append-lia",
          suffix: lia,
          targetStem: repertoryBuiltTargetStem,
          targetClass: "C",
          ruleId: exactFinalTlToTLicense.ruleId,
          andrewsSection: exactFinalTlToTLicense.andrewsSection,
          evidenceSections: exactFinalTlToTLicense.evidenceSections,
          authorityStatus: "exact-andrews-source-target-license",
          exactWitness: true,
          derivationLicenseId: exactFinalTlToTLicense.derivationLicenseId,
          formationRuleTier: "exact-lexical-overlay",
          productivityStatus: "exact-andrews-witness",
          optionAliases: [exactFinalTlToTLicense.ruleId],
          phoneRepertoryRelation,
          targetConstruction: Object.freeze({ operation: "replace-final-tla-with-ti-and-append", remove: "tla", add: `ti-${lia}` })
        }));
      }
      const priorOaHistory = sourceDescriptor.sourceKind === "classical-nahuatl-vnc-derived-machinery-frame" ? sourceDescriptor.sourceMachineryFrame?.derivationOperationFrame?.selectedOption?.causativeOaHistory || null : null;
      if (priorOaHistory?.root && ["i", "a", "o", "root-plus-ya"].includes(priorOaHistory.underlyingDestockalVowel)) {
        const root = normalizeClassicalNahuatlVncDerivationStem(priorOaHistory.root);
        let targetStem = "";
        if (priorOaHistory.underlyingDestockalVowel === "root-plus-ya") {
          targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, "l", huia);
        } else if (/l$/u.test(root)) {
          targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, huia);
        } else if (/o$/u.test(root)) {
          targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, "l", huia);
        } else {
          targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, priorOaHistory.underlyingDestockalVowel, "l", huia);
        }
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:typed-o-a-history:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · signed prior o-a causative history)`,
          derivationRoute: "type-two-huia-from-signed-causative-o-a-history",
          procedure: "consume-signed-causative-o-a-history-and-add-huia",
          suffix: huia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-269-causative-o-a-to-huia",
          andrewsSection: "26.9",
          evidenceSections: Object.freeze(["26.9", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-rule-from-signed-prior-derivation",
          derivationLicenseId: "cn-l26-269-causative-o-a-to-huia",
          formationRuleTier: "signed-prior-derivation-history",
          targetConstruction: Object.freeze({ operation: "consume-prior-o-a-history", root, underlyingDestockalVowel: priorOaHistory.underlyingDestockalVowel, add: huia })
        }));
      }
      const explicitOaMorphemeTail = ["o-a", "o-ā"].includes(shape.morphemeTail.two);
      const boundarylessSourceStem = getClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem);
      const boundarylessOaTail = /o(?:a|ā)$/u.test(boundarylessSourceStem);
      const explicitFinalAOnORoot = sourceDescriptor.sourceClass === "C"
        && morphology.hasExplicitBoundary === true
        && ["a", "ā"].includes(finalMorpheme)
        && morphemes.length >= 2
        && /o$/u.test(morphemes.at(-2) || "")
        && !["o", "ō"].includes(morphemes.at(-2) || "");
      const genericFinalOaSuppressed = exactFormations.some(formation => formation.suppressGenericFinalOa === true);
      if (!priorOaHistory && !genericFinalOaSuppressed && sourceDescriptor.sourceClass === "C" && explicitFinalAOnORoot) {
        const root = joinClassicalNahuatlVncDerivationMorphemes(...morphemes.slice(0, -1));
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, "l", huia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:root-final-o-plus-a:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · typed root-final-o or root+ya causative base)`,
          derivationRoute: "type-two-huia-from-root-final-o-plus-causative-a",
          procedure: "preserve-root-final-o-and-add-l-huia",
          suffix: huia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-26923-root-final-o-plus-a-to-l-huia",
          andrewsSection: "26.9.2-3",
          evidenceSections: Object.freeze(["26.9.2", "26.9.3", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-rule-from-typed-root-shape",
          derivationLicenseId: "cn-l26-26923-root-final-o-plus-a-to-l-huia",
          formationRuleTier: "typed-internal-morphology",
          targetConstruction: Object.freeze({ operation: "replace-final-a", preserve: root, add: `l-${huia}` })
        }));
      } else if (!priorOaHistory && !genericFinalOaSuppressed && sourceDescriptor.sourceClass === "C" && (explicitOaMorphemeTail || boundarylessOaTail)) {
        const root = explicitOaMorphemeTail
          ? joinClassicalNahuatlVncDerivationMorphemes(...morphemes.slice(0, -2))
          : replaceClassicalNahuatlVncDerivationRightEdge(boundarylessSourceStem, 2);
        const baseWithoutFinalA = explicitOaMorphemeTail
          ? joinClassicalNahuatlVncDerivationMorphemes(...morphemes.slice(0, -1))
          : replaceClassicalNahuatlVncDerivationRightEdge(boundarylessSourceStem, 1);
        if (root && /l$/u.test(root)) {
          const targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, huia);
          candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...common,
            optionId: `applicative:type-two:root-final-l-o-a:${sourceDescriptor.sourceStem}:${targetStem}`,
            label: `${targetStem} (type-two applicative · root-final-l + o-a → huiā)`,
            derivationSubtype: "type-two",
            derivationRoute: "type-two-huia-from-root-final-l-o-a",
            procedure: "delete-o-a-and-add-huia-to-root-final-l",
            suffix: huia,
            targetStem,
            targetClass: "C",
            ruleId: "cn-l26-2691-root-final-l-o-a-to-huia",
            andrewsSection: "26.9.1",
            evidenceSections: Object.freeze(["26.9.1", "26.14", "26.23"]),
            authorityStatus: "productive-andrews-rule-from-root-shape",
            derivationLicenseId: "cn-l26-2691-root-final-l-o-a-to-huia",
            formationRuleTier: "typed-internal-morphology",
            productivityStatus: "andrews-category-rule",
            lexicalChoiceRequired: false,
            targetConstruction: Object.freeze({ operation: "replace-final-o-a", retainedRoot: root, remove: "o-a", add: huia })
          }));
        } else {
          [
            { history: "a-hui", targetStem: joinClassicalNahuatlVncDerivationMorphemes(root, "a", "l", huia), operation: "recover-a-hui-history-and-add-a-l-huia" },
            { history: "i-hui", targetStem: joinClassicalNahuatlVncDerivationMorphemes(root, "i", "l", huia), operation: "recover-i-hui-history-and-add-i-l-huia" },
            { history: "root-final-o", targetStem: joinClassicalNahuatlVncDerivationMorphemes(baseWithoutFinalA, "l", huia), operation: "treat-final-o-as-part-of-root-and-add-l-huia" }
          ].filter(choice => root && choice.targetStem).forEach(choice => {
            candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
              ...common,
              optionId: `applicative:type-two:unknown-o-a-history:${choice.history}:${sourceDescriptor.sourceStem}:${choice.targetStem}`,
              label: `${choice.targetStem} (type-two applicative · assume underlying ${choice.history})`,
              derivationSubtype: "type-two",
              derivationRoute: `type-two-huia-from-selected-${choice.history}-history`,
              procedure: choice.operation,
              suffix: huia,
              targetStem: choice.targetStem,
              targetClass: "C",
              ruleId: `cn-l26-269-source-history-${choice.history}`,
              andrewsSection: "26.9.2-3",
              evidenceSections: Object.freeze(["26.9.2", "26.9.3", "26.13", "26.14", "26.23"]),
              authorityStatus: "andrews-rule-generated-source-history-choice",
              derivationLicenseId: `cn-l26-269-source-history-${choice.history}`,
              formationRuleTier: "generated-source-history-choice",
              productivityStatus: "andrews-conditioned-user-selected-source-analysis",
              lexicalChoiceRequired: true,
              sourceHistoryChoice: choice.history,
              targetConstruction: Object.freeze({ operation: choice.operation, underlyingSourceHistory: choice.history, retainedRoot: choice.history === "root-final-o" ? baseWithoutFinalA : root, add: choice.history === "a-hui" ? `a-l-${huia}` : choice.history === "i-hui" ? `i-l-${huia}` : `l-${huia}` })
            }));
          });
        }
      }
      if (shape.finalLetter === "ō" && sourceDescriptor.sourceClass === "A" && sourceDescriptor.sourceValence === "intransitive" && typeof runtimeTarget?.getClassicalNahuatlNonactiveStemOptions === "function" && typeof runtimeTarget?.deriveClassicalNahuatlNonactiveStemRecord === "function" && typeof runtimeTarget?.isClassicalNahuatlNonactiveStemRecord === "function") {
        const nonactiveInventory = runtimeTarget.getClassicalNahuatlNonactiveStemOptions(sourceDescriptor.sourceStem, {
          verbClass: sourceDescriptor.sourceClass,
          sourceValence: sourceDescriptor.sourceValence
        });
        (nonactiveInventory.options || []).filter(option => option.suffixFamily === "hua").forEach(option => {
          const record = runtimeTarget.deriveClassicalNahuatlNonactiveStemRecord(sourceDescriptor.sourceStem, {
            verbClass: sourceDescriptor.sourceClass,
            sourceValence: sourceDescriptor.sourceValence,
            optionId: option.optionId
          });
          if (!runtimeTarget.isClassicalNahuatlNonactiveStemRecord(record, sourceDescriptor.sourceStem)) {
            return;
          }
          const exactRouteChoice = getClassicalNahuatlFinalOHuiaExactRouteChoice(sourceDescriptor);
          getClassicalNahuatlFinalOHuiaFormationRoutes(sourceDescriptor)
            .forEach(route => candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
              ...common,
              optionId: `applicative:type-two:final-o:${route.route}:${record.selectedOptionId}`,
              label: `${route.targetStem} (type-two applicative · final ō ${route.route} huiā route)`,
              derivationRoute: `type-two-final-o-${route.route}-huia`,
              procedure: route.operation,
              suffix: huia,
              targetStem: route.targetStem,
              targetClass: "C",
              ruleId: route.applicativeRuleId,
              andrewsSection: "26.10",
              evidenceSections: Object.freeze(["25.6", "26.10", "26.14", "26.23"]),
              authorityStatus: exactRouteChoice ? "typed-lexical-route-over-shared-productive-huia-rule" : "productive-andrews-rule-plus-typed-hua-nonactive-record",
              exactWitness: Boolean(exactRouteChoice),
              derivationLicenseId: route.applicativeRuleId,
              lesson20OptionId: record.selectedOptionId,
              lesson20RuleId: record.selectedRuleId,
              lesson20NonactiveStemRecord: record,
              formationRuleTier: exactRouteChoice ? "typed-lexical-route" : "typed-lesson20-nonactive-bridge",
              lexicalChoiceRequired: !exactRouteChoice,
              targetConstruction: route.targetConstruction
            })));
        });
      } else if (sourceDescriptor.sourceClass === "D") {
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:class-d:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · Class D preserves final vowel)`,
          derivationRoute: "type-two-class-d-append-lia",
          procedure: "preserve-class-d-source-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-2681-class-d-append-lia",
          andrewsSection: "26.8.1",
          evidenceSections: Object.freeze(["26.8.1", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-class-rule",
          derivationLicenseId: "cn-l26-2681-class-d-append-lia",
          formationRuleTier: "typed-class-exception",
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: lia })
        }));
      } else if (sourceDescriptor.sourceClass === "B" && (transitiveSource || fusedTransitiveFormationSource) && shape.letterTail.three === "iya") {
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:class-b-iya:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · transitive Class B iya preserves source)`,
          derivationRoute: "type-two-class-b-transitive-iya-append-lia",
          procedure: "preserve-transitive-class-b-iya-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-2682-class-b-iya-append-lia",
          andrewsSection: "26.8.2",
          evidenceSections: Object.freeze(["26.8.2", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-class-and-valence-rule",
          derivationLicenseId: "cn-l26-2682-class-b-iya-append-lia",
          formationRuleTier: "typed-class-valence-exception",
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: lia })
        }));
      } else if (sourceDescriptor.sourceClass === "B" && !transitiveSource && shape.letterTail.three === "eya") {
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 2, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:class-b-eya:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · intransitive Class B eya loses ya)`,
          derivationRoute: "type-two-class-b-intransitive-eya-delete-ya-add-lia",
          procedure: "delete-final-ya-from-intransitive-class-b-eya-and-add-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-2683-class-b-eya-delete-ya-add-lia",
          andrewsSection: "26.8.3",
          evidenceSections: Object.freeze(["26.8.3", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-class-and-valence-rule",
          derivationLicenseId: "cn-l26-2683-class-b-eya-delete-ya-add-lia",
          formationRuleTier: "typed-class-valence-exception",
          targetConstruction: Object.freeze({ operation: "replace-final", remove: "ya", add: lia })
        }));
      } else if (!transitiveSource && ["oya", "oyā"].includes(shape.letterTail.three)) {
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 2, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:intransitive-oya:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · intransitive oya loses ya)`,
          derivationRoute: "type-two-intransitive-oya-delete-ya-add-lia",
          procedure: "delete-final-ya-from-intransitive-oya-and-add-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-2684-intransitive-oya-delete-ya-add-lia",
          andrewsSection: "26.8.4",
          evidenceSections: Object.freeze(["26.8.4", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-valence-and-final-shape-rule",
          derivationLicenseId: "cn-l26-2684-intransitive-oya-delete-ya-add-lia",
          formationRuleTier: "typed-valence-exception",
          targetConstruction: Object.freeze({ operation: "replace-final", remove: "ya", add: lia })
        }));
      } else if (transitiveSource && ["oya", "oyā"].includes(shape.letterTail.three)) {
        const typedRootPlusYa = morphology.explicitRootPlusYaBoundary === true && shape.orthographicTail.three === "-ya";
        const targetStem = typedRootPlusYa
          ? replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 2, lia)
          : joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:transitive-oya:${typedRootPlusYa ? "root" : "whole"}:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · transitive oya ${typedRootPlusYa ? "typed root+ya" : "whole-stem"} route)`,
          derivationRoute: typedRootPlusYa ? "type-two-transitive-valence-neutral-oya-delete-ya-add-lia" : "type-two-transitive-oya-append-lia",
          procedure: typedRootPlusYa ? "delete-final-ya-from-typed-valence-neutral-oya-and-add-lia" : "preserve-transitive-oya-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: typedRootPlusYa ? "cn-l26-2684-transitive-valence-neutral-oya-delete-ya-add-lia" : "cn-l26-2684-transitive-oya-append-lia",
          andrewsSection: "26.8.4",
          evidenceSections: Object.freeze(["26.8.4", "26.13", "26.14", "26.23"]),
          authorityStatus: typedRootPlusYa ? "productive-andrews-rule-from-explicit-typed-morphology" : "productive-andrews-transitive-oya-rule",
          derivationLicenseId: typedRootPlusYa ? "cn-l26-2684-transitive-valence-neutral-oya-delete-ya-add-lia" : "cn-l26-2684-transitive-oya-append-lia",
          formationRuleTier: typedRootPlusYa ? "typed-internal-morphology-exception" : "typed-valence-exception",
          targetConstruction: Object.freeze({ operation: typedRootPlusYa ? "replace-final" : "append", remove: typedRootPlusYa ? "ya" : "", add: lia })
        }));
      } else if (shape.finalLetter === "i") {
        const sibilantFinal = ["ci", "si"].includes(shape.letterTail.two);
        const lexicalSourceRecord = getClassicalNahuatlVncDerivationCanonicalLexicalSourceRecord(sourceDescriptor);
        const lengthenedFinalI = lexicalSourceRecord
          && hasClassicalNahuatlVncDerivationLexicalKey(lexicalSourceRecord.stem, "cui");
        const applicativeBase = lengthenedFinalI
          ? replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 1, "ī")
          : sourceDescriptor.sourceStem;
        const targetStem = sibilantFinal
          ? joinClassicalNahuatlVncDerivationMorphemes(replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(sourceDescriptor.sourceStem, 2, "xi"), lia)
          : joinClassicalNahuatlVncDerivationMorphemes(applicativeBase, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:final-i:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · final i${sibilantFinal ? " with si → xi" : lengthenedFinalI ? " with lexical i → ī" : ""})`,
          derivationRoute: sibilantFinal ? "type-two-final-si-to-xi-append-lia" : "type-two-final-i-append-lia",
          procedure: sibilantFinal ? "replace-final-si-with-xi-and-append-lia" : "append-lia-to-final-i",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: sibilantFinal ? "cn-l26-264-final-si-xi-lia" : "cn-l26-264-final-i-append-lia",
          andrewsSection: "26.4",
          evidenceSections: Object.freeze(["26.4", "26.5", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-final-shape-rule",
          derivationLicenseId: sibilantFinal ? "cn-l26-264-final-si-xi-lia" : "cn-l26-264-final-i-append-lia",
          targetConstruction: Object.freeze({ operation: sibilantFinal || lengthenedFinalI ? "replace-and-append" : "append", remove: sibilantFinal ? shape.letterTail.two : lengthenedFinalI ? "i" : "", add: sibilantFinal ? `xi-${lia}` : lengthenedFinalI ? `ī-${lia}` : lia,
            ...(lengthenedFinalI ? { lexicalVowelLengthening: true, sourceVowel: "i", targetVowel: "ī", sourceQuantityAuthority: "Andrews §26.4 lexical vowel alternation" } : {}) })
        }));
        const optionalFinalTzi = shape.letterTail.three === "tzi";
        const optionalVowelTi = /[aeioāēīō]ti$/u.test(getClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem));
        if (optionalFinalTzi || optionalVowelTi) {
          const remove = optionalFinalTzi ? "tzi" : "ti";
          const shiftedBase = replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(sourceDescriptor.sourceStem, remove.length, "chi");
          const shiftedTarget = joinClassicalNahuatlVncDerivationMorphemes(shiftedBase, lia);
          candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...common,
            optionId: `applicative:type-two:optional-final-${remove}-to-chi:${sourceDescriptor.sourceStem}:${shiftedTarget}`,
            label: `${shiftedTarget} (type-two applicative · optional ${remove} → chi)`,
            derivationRoute: `type-two-optional-final-${remove}-to-chi-lia`,
            procedure: "optional-final-consonant-alternation-and-append-lia",
            suffix: lia,
            targetStem: shiftedTarget,
            targetClass: "C",
            ruleId: `cn-l26-264-optional-final-${remove}-chi-lia`,
            andrewsSection: "26.4",
            evidenceSections: Object.freeze(["26.4", "26.13", "26.14", "26.23"]),
            authorityStatus: "productive-andrews-final-shape-rule",
            derivationLicenseId: `cn-l26-264-optional-final-${remove}-chi-lia`,
            targetConstruction: Object.freeze({ operation: "replace-and-append", remove, add: `chi-${lia}` })
          }));
        }
      } else if (sourceDescriptor.sourceClass === "C" && ["ia", "iā"].includes(shape.letterTail.two)) {
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 1, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:final-ia:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · final iā loses ā)`,
          derivationRoute: "type-two-final-ia-delete-a-add-lia",
          procedure: "delete-final-a-from-class-c-ia-and-add-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-266-final-ia-delete-a-add-lia",
          andrewsSection: "26.6",
          evidenceSections: Object.freeze(["26.6", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-final-shape-and-class-rule",
          derivationLicenseId: "cn-l26-266-final-ia-delete-a-add-lia",
          targetConstruction: Object.freeze({ operation: "replace-final", remove: shape.finalLetter, add: lia })
        }));
      } else if (!exactFinalTlToTLicense && shape.finalLetter === "a" && !["oya", "oyā"].includes(shape.letterTail.three) && !/[aeioāēīō]/u.test(shape.precedingLetter)) {
        const tlaOrTza = ["tla", "tza"].includes(shape.letterTail.three);
        const sa = ["sa", "za"].includes(shape.letterTail.two);
        const ca = shape.letterTail.two === "ca";
        const removeCount = tlaOrTza ? 3 : sa || ca ? 2 : 1;
        const replacement = tlaOrTza ? "chi" : sa ? "xi" : ca ? "qui" : "i";
        const replaciveBase = replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(sourceDescriptor.sourceStem, removeCount, replacement);
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(replaciveBase, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:consonant-a:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · ${tlaOrTza ? `${shape.letterTail.three} → chi` : sa ? `${shape.letterTail.two} → xi` : ca ? "ca → qui" : "final a → i"})`,
          derivationRoute: tlaOrTza ? "type-two-final-tla-tza-to-chi-lia" : sa ? "type-two-final-sa-to-xi-lia" : ca ? "type-two-final-ca-to-qui-lia" : "type-two-consonant-final-a-to-i-lia",
          procedure: "replace-consonant-plus-final-a-allomorph-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: tlaOrTza ? "cn-l26-267-final-tla-tza-chi-lia" : sa ? "cn-l26-267-final-sa-xi-lia" : ca ? "cn-l26-267-final-ca-qui-lia" : "cn-l26-267-consonant-a-i-lia",
          andrewsSection: "26.7",
          evidenceSections: Object.freeze(["26.7", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-final-shape-rule",
          derivationLicenseId: tlaOrTza ? "cn-l26-267-final-tla-tza-chi-lia" : sa ? "cn-l26-267-final-sa-xi-lia" : ca ? "cn-l26-267-final-ca-qui-lia" : "cn-l26-267-consonant-a-i-lia",
          targetConstruction: Object.freeze({ operation: "replace-and-append", remove: tlaOrTza ? shape.letterTail.three : sa || ca ? shape.letterTail.two : "a", add: `${replacement}-${lia}` })
        }));
      }
      return candidates;
    }
    function getClassicalNahuatlVncDerivationInventorySignaturePayload(inventory = {}) {
      return {
        derivationType: inventory.derivationType,
        applicativeObjectKind: inventory.applicativeObjectKind || "",
        sourceSignature: inventory.sourceSignature,
        sourceAnalysisSignature: inventory.sourceAnalysisFrame?.canonicalSignature || "",
        authorizationStatus: inventory.authorizationStatus,
        blockReason: inventory.blockReason,
        optionSignatures: (inventory.options || []).map(option => option.canonicalSignature),
        selectorRequired: inventory.selectorRequired,
        analysisSelectionRequired: inventory.analysisSelectionRequired === true,
        automaticOptionId: inventory.automaticOptionId
      };
    }
    function getClassicalNahuatlVncDerivationOptionInventoryInternal(sourceMachineryFrame = null, options = {}, depth = 0, validationContext = null) {
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, depth + 1, validationContext);
      const derivationType = normalizeClassicalNahuatlVncDerivationToken(options?.derivationType || "direct").toLowerCase();
      const requestedClass = normalizeClassicalNahuatlVncDerivationToken(options?.verbClass).toUpperCase();
      const requestedValence = normalizeClassicalNahuatlVncDerivationToken(options?.sourceValence);
      let blockReason = sourceDescriptor.authorizationStatus === "authorized" ? "" : sourceDescriptor.blockReason;
      if (!CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES.includes(derivationType)) {
        blockReason = "classical-vnc-derivation-type-not-recognized";
      } else if (sourceDescriptor.classIndependentApplicativeSource && derivationType !== "applicative") {
        blockReason = "classical-vnc-class-independent-source-only-licenses-applicative";
      } else if (requestedClass && sourceDescriptor.authorizationStatus === "authorized" && requestedClass !== sourceDescriptor.sourceClass) {
        blockReason = "classical-vnc-derivation-source-class-contradiction";
      } else if (requestedValence && sourceDescriptor.authorizationStatus === "authorized" && requestedValence !== sourceDescriptor.sourceValence) {
        blockReason = "classical-vnc-derivation-source-valence-contradiction";
      } else if (!blockReason && hasClassicalNahuatlExactDerivationSourceSelfReference(sourceDescriptor, derivationType)) {
        blockReason = `classical-vnc-${derivationType}-source-specific-self-reference-must-be-reflexive`;
      }
      const generationSourceDescriptor =
        getClassicalNahuatlVncDerivationGenerationSourceDescriptor(
          sourceDescriptor,
        );
      let generatedOptions = [];
      if (!blockReason && derivationType === "causative") {
        generatedOptions = [...getClassicalNahuatlTypeOneCausativeOptions(generationSourceDescriptor), ...getClassicalNahuatlTypeTwoCausativeOptions(generationSourceDescriptor)];
      } else if (!blockReason && derivationType === "applicative") {
        generatedOptions = getClassicalNahuatlLicensedApplicativeOptions(generationSourceDescriptor);
      }
      if (sourceDescriptor.classIndependentApplicativeSource) generatedOptions = generatedOptions.filter(option =>
        option.ruleId === "cn-l26-2684-transitive-oya-append-lia");
      if (sourceDescriptor.analyticalSourceFrame) generatedOptions=generatedOptions.filter(option=>
        sourceDescriptor.analyticalSourceAnalysis.licensedOperationRuleIds.includes(option.ruleId));
      const applicativeObjectKind = derivationType === "applicative"
        ? normalizeClassicalNahuatlVncDerivationObjectKind(options.applicativeObjectKind) : "";
      // §23.5 Remark 2 permits shunt ne in Column III or VI. Expose the
      // later position only for the actual tē + retained-reflexive choice.
      if (derivationType === "applicative" && applicativeObjectKind === "nonspecific-human"
        && sourceDescriptor.sourceVoice === "active"
        && sourceDescriptor.sourceValence === "mainline-reflexive"
        && sourceDescriptor.sourceObjectRequests?.length === 1
        && sourceDescriptor.sourceObjectRequests[0].objectKind === "reflexive") {
        generatedOptions = generatedOptions.flatMap(option => {
          const late = finalizeClassicalNahuatlVncDerivationOption(generationSourceDescriptor, {
            ...option, optionId: `${option.optionId}:shunt-ne-late`, optionAliases: [],
            shuntlineReflexivePosition: "late", label: `${option.label} · tē + ne`,
          });
          // §33.7 attests a contracted ne operand in this lexical boundary;
          // §26.3 retains ne+i. Keep both, without a general vowel-loss rule.
          const contracted = hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "ihyāna")
            && sourceDescriptor.sourceInitialIKind === "real"
            ? finalizeClassicalNahuatlVncDerivationOption(generationSourceDescriptor, {
              ...late, optionId: `${late.optionId}:contracted`, optionAliases: [],
              shuntlineReflexiveBoundaryVariant: "ihyana-contracted",
              label: `${option.label} · tē + ne (contracted)`,
              evidenceSections: Object.freeze([...option.evidenceSections, "33.7"]),
            }) : null;
          return [option, late, ...(contracted ? [contracted] : [])];
        });
      }
      const optionIdDeduped = Array.from(new Map(
        generatedOptions.map(option => [option.optionId, option]),
      ).values());
      const finalCompositionChoiceKey = (option) => JSON.stringify({
        subtype: option.derivationSubtype || option.subtype || "",
        shuntlineReflexivePosition: option.shuntlineReflexivePosition || "",
        shuntlineReflexiveBoundaryVariant: option.shuntlineReflexiveBoundaryVariant || "",
        targetStem: option.targetStem || "",
        targetClass: option.targetClass || "",
        targetConstruction: option.targetConstruction || null,
        sourceHistoryChoice: option.sourceHistoryChoice || "",
        selectedSourceHistory: option.selectedSourceHistory || "",
        sourceAnalysisId: option.sourceAnalysisId || "",
        typeTwoBridgeSuffixFamily: option.typeTwoBridgeSuffixFamily || "",
        implicitAgentObjectKind: option.implicitAgentObjectKind || "",
      });
      const finalCompositionChoices = optionIdDeduped.reduce((choices, option) => {
        const key = finalCompositionChoiceKey(option);
        if (!choices.has(key)) choices.set(key, option);
        return choices;
      }, new Map());
      const dedupedOptions = Object.freeze(derivationType === "applicative"
        ? Array.from(finalCompositionChoices.values())
        : optionIdDeduped);
      if (!blockReason && derivationType !== "direct" && !dedupedOptions.length) {
        blockReason = derivationType === "applicative"
          && hasClassicalNahuatlEstablishedCausativeLiaSource(generationSourceDescriptor)
          ? "classical-vnc-causative-lia-source-has-no-applicative"
          : `classical-vnc-${derivationType}-no-rule-derived-options`;
      }
      const sourceAnalysisFrame = sourceDescriptor.authorizationStatus === "authorized" ? getClassicalNahuatlVncDerivationSourceAnalysis(generationSourceDescriptor) : null;
      const analysisSelectionRequired = dedupedOptions.some(option => option.sourceAnalysisSelectionRequired === true);
      const selectorRequired = dedupedOptions.length > 1 || analysisSelectionRequired;
      const automaticOptionId = dedupedOptions.length === 1 && !selectorRequired ? dedupedOptions[0].optionId : "";
      const inventory = {
        kind: "classical-nahuatl-vnc-derivation-option-inventory",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        sourceAuthority: "Andrews transcription and typed lower-lesson frames",
        sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        derivationType,
        applicativeObjectKind,
        sourceStem: generationSourceDescriptor.sourceStem || "",
        sourceClass: sourceDescriptor.sourceClass || "",
        sourceValence: sourceDescriptor.sourceValence || "",
        sourceSubject: sourceDescriptor.sourceSubject || "",
        sourceSignature: sourceDescriptor.sourceSignature || "",
        sourceAnalysisFrame,
        sourceMachineryFrame,
        sourceTypedVncSlotFrame: sourceDescriptor.finalTypedFrame || null,
        options: dedupedOptions,
        optionCount: dedupedOptions.length,
        selectionRequired: selectorRequired,
        selectorRequired,
        analysisSelectionRequired,
        automaticOptionId,
        defaultOptionId: "",
        callerSuppliedTargetAllowed: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      inventory.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationInventorySignaturePayload(inventory));
      Object.freeze(inventory);
      if (inventory.authorizationStatus === "authorized") {
        classicalNahuatlIssuedVncDerivationOptionInventories.add(inventory);
      }
      return inventory;
    }
    function getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame = null, options = {}) {
      return getClassicalNahuatlVncDerivationOptionInventoryInternal(sourceMachineryFrame, options, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getComparableClassicalNahuatlVncDerivationOptionInventory(inventory = {}) {
      return Object.fromEntries(Object.entries(inventory).filter(([key]) => !["sourceMachineryFrame", "sourceAnalysisFrame"].includes(key)));
    }
    function isClassicalNahuatlVncDerivationOptionInventoryInternal(frame = null, depth = 0, validationContext = null) {
      if (!frame || !classicalNahuatlIssuedVncDerivationOptionInventories.has(frame) || frame.kind !== "classical-nahuatl-vnc-derivation-option-inventory" || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION || frame.authorizationStatus !== "authorized" || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH || frame.callerSuppliedTargetAllowed !== false || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false) {
        return false;
      }
      if (validationContext?.inventories?.has(frame)) {
        return true;
      }
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(frame.sourceMachineryFrame, depth + 1, validationContext);
      if (sourceDescriptor.authorizationStatus !== "authorized" || sourceDescriptor.sourceSignature !== frame.sourceSignature || !isClassicalNahuatlVncDerivationSourceAnalysisFrameInternal(frame.sourceAnalysisFrame, depth + 1, validationContext) || frame.sourceAnalysisFrame.sourceSignature !== frame.sourceSignature) {
        return false;
      }
      if (!(frame.options || []).every(option => (
        classicalNahuatlIssuedVncDerivationOptions.has(option)
        && (
          !option.typeTwoInternalBridgeFrame
          || isClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
            option.typeTwoInternalBridgeFrame,
            sourceDescriptor,
          )
        )
      ))) {
        return false;
      }
      const rebuilt = getClassicalNahuatlVncDerivationOptionInventoryInternal(frame.sourceMachineryFrame, {
        derivationType: frame.derivationType,
        applicativeObjectKind: frame.applicativeObjectKind,
        sourceValence: frame.sourceValence,
        verbClass: frame.sourceClass
      }, depth + 1, validationContext);
      const canonical = Boolean(rebuilt.authorizationStatus === "authorized" && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationInventorySignaturePayload(frame)) && areClassicalNahuatlVncDerivationValuesEqual(getComparableClassicalNahuatlVncDerivationOptionInventory(frame), getComparableClassicalNahuatlVncDerivationOptionInventory(rebuilt)));
      if (canonical) {
        validationContext?.inventories?.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlVncDerivationOptionInventory(frame = null) {
      return isClassicalNahuatlVncDerivationOptionInventoryInternal(frame, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getClassicalNahuatlVncCausativeParticipantEvidenceSection({
      derivationType = "",
      sourceVoice = "active",
      sourceObjectCount = 0,
      targetObjectCount = 0,
      addedObjectRequest = null
    } = {}) {
      if (derivationType !== "causative") return "";
      if (sourceObjectCount === 2 && targetObjectCount === 3) {
        return "25.12";
      }
      const depthSection = sourceObjectCount === 0 && targetObjectCount === 1
        ? "25.10"
        : sourceObjectCount === 1 && targetObjectCount === 2
          ? "25.11"
          : "";
      if (!depthSection) return "";
      if (sourceVoice !== "active") return `${depthSection}.3`;
      return addedObjectRequest?.objectKind === "reflexive"
        ? `${depthSection}.2`
        : `${depthSection}.1`;
    }
    function deriveClassicalNahuatlVncParticipantTransform(sourceDescriptor = {}, derivationType = "", options = {}) {
      const sourceObjectRequests = Object.freeze((
        Array.isArray(sourceDescriptor.sourceObjectRequests)
          ? sourceDescriptor.sourceObjectRequests
          : []
      ).map(request => Object.freeze({ ...request })));
      const sourceVoice = normalizeClassicalNahuatlVncDerivationToken(sourceDescriptor.sourceVoice || "active");
      const newestLevel = sourceObjectRequests.reduce((maximum, request) => Math.max(maximum, request.derivationalLevel), 0) + 1;
      let blockReason = sourceObjectRequests.length > 2 ? "classical-vnc-derivation-source-object-limit-exceeded" : "";
      let targetSubject = normalizeClassicalNahuatlVncDerivationToken(options?.targetSubject);
      const requestedCausativeObjectKindToken = normalizeClassicalNahuatlVncDerivationToken(options?.causativeObjectKind);
      const requestedCausativeObjectKind = normalizeClassicalNahuatlVncDerivationObjectKind(requestedCausativeObjectKindToken);
      let causativeSpecificShuntlineRealization = normalizeClassicalNahuatlVncDerivationToken(options?.causativeSpecificShuntlineRealization);
      // Coreference is the reflexive Valence route; it is not an additional
      // referent-relation choice.  When only one causee Valence is possible the
      // grammar derives it.  Equal non-first-person categories genuinely admit
      // two typed structures, so Grammar must choose the causee Valence itself.
      const selectedOption = options?.selectedOption || null;
      const licensedImplicitAgentObjectKind = normalizeClassicalNahuatlVncDerivationObjectKind(selectedOption?.implicitAgentObjectKind || "");
      // Impersonal agreement is distinct from the faceless participant's
      // contextual reference (25.5 tē/tla; 22.3; 25.10). A licensed lexical
      // reference remains fixed; otherwise Type 2 retains the usual tē default
      // while admitting the genuine human/nonhuman referent decision.
      const nonspecificCauseeReferenceChoice = derivationType === "causative"
        && sourceVoice === "impersonal"
        && selectedOption?.derivationSubtype === "type-two"
        && !licensedImplicitAgentObjectKind;
      const causativeSubjectsSharePersonCategory = targetSubject === sourceDescriptor.sourceSubject;
      const allowedCausativeObjectKinds = derivationType === "causative" && sourceVoice === "active"
        ? Object.freeze(causativeSubjectsSharePersonCategory
          ? ["1sg", "2sg"].includes(targetSubject)
            ? ["reflexive"]
            : ["specific-projective", "reflexive"]
          : ["specific-projective"])
        : Object.freeze(nonspecificCauseeReferenceChoice
          ? ["nonspecific-human", "nonspecific-nonhuman"]
          : derivationType === "causative"
            && ["nonspecific-human", "nonspecific-nonhuman"].includes(licensedImplicitAgentObjectKind)
            ? [licensedImplicitAgentObjectKind] : []);
      const causativeObjectKindChoiceEligible = allowedCausativeObjectKinds.length > 1;
      const causativeObjectKindSelectionRequired = causativeObjectKindChoiceEligible && sourceVoice === "active";
      const selectedActiveCausativeObjectKind = requestedCausativeObjectKind
        || (allowedCausativeObjectKinds.length === 1 ? allowedCausativeObjectKinds[0] : "");
      let addedObjectRequest = null;
      const implicitAgentObjectKind = sourceVoice === "active"
        || (sourceVoice === "inherent-impersonal" && derivationType === "applicative")
        ? ""
        : nonspecificCauseeReferenceChoice && allowedCausativeObjectKinds.includes(requestedCausativeObjectKind)
          ? requestedCausativeObjectKind
          : ["nonspecific-human", "nonspecific-nonhuman"].includes(licensedImplicitAgentObjectKind)
            ? licensedImplicitAgentObjectKind
            : sourceVoice === "impersonal" && selectedOption?.derivationSubtype === "type-one"
              ? "nonspecific-nonhuman"
              : "nonspecific-human";
      if (!blockReason && derivationType === "causative") {
        if (!CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(targetSubject)) {
          blockReason = "classical-vnc-causative-target-subject-required";
        } else if (requestedCausativeObjectKindToken && !["specific-projective", "reflexive", "mainline-reflexive", "shuntline-reflexive", "nonspecific-human", "nonspecific-nonhuman"].includes(requestedCausativeObjectKindToken)) {
          blockReason = "classical-vnc-causative-causee-valence-not-recognized";
        } else if (requestedCausativeObjectKind && !allowedCausativeObjectKinds.includes(requestedCausativeObjectKind)) {
          blockReason = "classical-vnc-causative-causee-valence-not-applicable";
        } else if (causativeObjectKindSelectionRequired && !selectedActiveCausativeObjectKind) {
          blockReason = "classical-vnc-causative-causee-valence-selection-required";
        } else {
          const selectedCausativeObjectKind = sourceVoice === "active"
            ? selectedActiveCausativeObjectKind
            : implicitAgentObjectKind;
          const objectId = getClassicalNahuatlVncDerivationAvailableObjectId(sourceObjectRequests, "causative-object", newestLevel);
          addedObjectRequest = normalizeClassicalNahuatlVncDerivationObjectRequest({
            objectId,
            objectKind: selectedCausativeObjectKind,
            objectPerson: sourceVoice === "active" && selectedCausativeObjectKind === "reflexive"
              ? targetSubject
              : sourceVoice === "active" && selectedCausativeObjectKind === "specific-projective"
                ? sourceDescriptor.sourceSubject
                : "",
            governor: "causative",
            derivationalLevel: newestLevel
          }, sourceObjectRequests.length);
          if (sourceDescriptor.analyticalSourceFrame && addedObjectRequest) {
            const participantFrame = sourceDescriptor.abstractInnerSubjectParticipantFrame;
            // The analytical causee's category can be common-number while
            // its third-singular carrier remains the same. Keep that exact
            // Participant and its reference at the objective role contact.
            addedObjectRequest = normalizeClassicalNahuatlVncDerivationObjectRequest({
              ...addedObjectRequest,
              objectPerson: addedObjectRequest.objectKind === "specific-projective"
                ? participantFrame.category : addedObjectRequest.objectPerson,
              participantFrame,
            }, sourceObjectRequests.length);
          } else if (sourceVoice === "active" && addedObjectRequest
            && sourceDescriptor.sourceSubjectParticipantFrame) {
            // §24.8 changes the Source subject's case, not its referent.
            const participantFrame = buildClassicalNahuatlParticipantFrame({
              ...sourceDescriptor.sourceSubjectParticipantFrame,
              role: "causee", case: "objective",
              agreement: sourceDescriptor.sourceSubjectParticipantFrame.morphologicalAgreement,
            });
            addedObjectRequest = normalizeClassicalNahuatlVncDerivationObjectRequest({
              ...addedObjectRequest, participantFrame,
            }, sourceObjectRequests.length);
          }
        }
      } else if (!blockReason && derivationType === "applicative") {
        if (targetSubject && targetSubject !== sourceDescriptor.sourceSubject) {
          blockReason = "classical-vnc-applicative-target-subject-must-preserve-source-subject";
        }
        targetSubject = sourceDescriptor.sourceSubject;
        const objectKind = normalizeClassicalNahuatlVncDerivationObjectKind(options?.applicativeObjectKind || "specific-projective");
        const objectPerson = normalizeClassicalNahuatlVncDerivationToken(options?.applicativeObjectPerson);
        // §33.3 restricts this lexical reflexive applicative to honorific
        // use. Its ordinary nonreflexive beneficiaries are not prohibited.
        if (!blockReason && objectKind === "reflexive"
          && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "miqui")
          && hasClassicalNahuatlVncDerivationLexicalKey(selectedOption?.targetStem, "miqui-liā")) {
          blockReason = "classical-vnc-miqui-reflexive-applicative-requires-honorific";
        }
        if (!blockReason && !CLASSICAL_NAHUATL_VNC_DERIVATION_OBJECT_KINDS.includes(objectKind)) {
          blockReason = "classical-vnc-applicative-object-kind-not-authorized";
        } else if (!blockReason && objectKind === "specific-projective" && !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(objectPerson)) {
          blockReason = "classical-vnc-applicative-specific-object-person-required";
        } else if (!blockReason && objectKind === "specific-projective" && ["1sg", "2sg", "1pl", "2pl"].includes(targetSubject) && objectPerson === targetSubject) {
          blockReason = "classical-vnc-applicative-coreferential-specific-object-must-be-reflexive";
        } else if (!blockReason) {
          const objectId = getClassicalNahuatlVncDerivationAvailableObjectId(sourceObjectRequests, "applicative-object", newestLevel);
          addedObjectRequest = normalizeClassicalNahuatlVncDerivationObjectRequest({
            objectId,
            objectKind,
            objectPerson,
            governor: "applicative",
            derivationalLevel: newestLevel
          }, sourceObjectRequests.length);
          if (sourceDescriptor.classIndependentApplicativeSource) {
            // Reuse the application Participant convention. Nonreflexive
            // objects get the actual object ID; a reflexive keeps the exact
            // Source subject's reference through its objective role contact.
            const reflexive = objectKind === "reflexive";
            const sourceParticipant = sourceDescriptor.sourceSubjectParticipantFrame;
            if (reflexive && objectPerson && objectPerson !== targetSubject) {
              blockReason = "classical-vnc-class-independent-reflexive-subject-reference-required";
            }
            const participantFrame = buildClassicalNahuatlParticipantFrame({
              role:"object",agreement:reflexive?sourceParticipant.category:objectPerson,
              ...(reflexive ? {
                person:sourceParticipant.person,number:sourceParticipant.number,
                animacy:sourceParticipant.animacy,humanness:sourceParticipant.humanness,
                specificity:sourceParticipant.specificity,hasReferent:sourceParticipant.hasReferent,
                referenceId:sourceParticipant.referenceId,
              } : {
                animacy:objectKind==="nonspecific-human"?"animate":"unspecified",
                humanness:objectKind==="nonspecific-human"?"human":objectKind==="nonspecific-nonhuman"?"nonhuman":"unspecified",
                specificity:objectKind.startsWith("nonspecific-")?"nonspecific":"specific",referenceId:objectId,
              }),
            });
            addedObjectRequest = normalizeClassicalNahuatlVncDerivationObjectRequest({
              ...addedObjectRequest,objectPerson:reflexive?targetSubject:objectPerson,participantFrame,
            },sourceObjectRequests.length);
          }
        }
      }
      // Andrews 26.16 explicitly contrasts this lexical exception with normal
      // demotion to ne. Preserve its old reflexive participant and governor;
      // the ordinary cluster realizes its subject-coreferential dyad.
      const retainedReflexiveSubjectCoreferenceException = derivationType === "applicative"
        && sourceVoice === "active"
        && sourceDescriptor.sourceClass === "C"
        && sourceDescriptor.sourceValence === "mainline-reflexive"
        && sourceDescriptor.sourceMachineryFrame?.priorVncFrame?.objectFrame?.requestedInterpretation === "reflexive"
        && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "nēx-ti-ā")
        && selectedOption?.derivationSubtype === "type-two"
        && hasClassicalNahuatlVncDerivationLexicalKey(selectedOption?.targetStem, "nēx-ti-liā")
        && sourceObjectRequests.length === 1
        && sourceObjectRequests[0].objectKind === "reflexive"
        && ["", sourceDescriptor.sourceSubject].includes(sourceObjectRequests[0].objectPerson || "")
        && addedObjectRequest?.objectKind === "nonspecific-human";
      const retainedReflexiveTransition = projectClassicalNahuatlRetainedReflexiveShuntline(
        sourceObjectRequests, { targetSubject,
          retainSubjectCoreference: retainedReflexiveSubjectCoreferenceException },
      );
      const retainedTargetObjectRequests = Object.freeze(sourceObjectRequests.map((request, requestIndex) => {
        if (["causative", "applicative"].includes(derivationType)
          && request.objectKind === "reflexive") {
          return normalizeClassicalNahuatlVncDerivationObjectRequest({
            ...request,
            ...(selectedOption?.shuntlineReflexivePosition === "late"
              ? { shuntlineReflexivePosition: "late" } : {}),
            ...(selectedOption?.shuntlineReflexiveBoundaryVariant === "ihyana-contracted"
              ? { shuntlineReflexiveBoundaryVariant: "ihyana-contracted" } : {}),
            objectPerson: retainedReflexiveTransition.targetObjectRequests[requestIndex].objectPerson
          }, requestIndex);
        }
        if (request.objectKind === "specific-projective" && ["1sg", "2sg"].includes(targetSubject) && request.objectPerson === targetSubject) {
          return normalizeClassicalNahuatlVncDerivationObjectRequest({
            ...request,
            objectKind: "reflexive",
            objectPerson: targetSubject
          }, requestIndex);
        }
        return request;
      }));
      const retainedSourceReflexiveShuntlineRuleFrame = ["causative", "applicative"].includes(derivationType)
        ? retainedReflexiveTransition.ruleFrame : null;
      const targetObjectRequests = Object.freeze(addedObjectRequest ? [...retainedTargetObjectRequests, addedObjectRequest] : [...retainedTargetObjectRequests]);
      const specificShuntlineChoiceEligible = derivationType === "causative"
        && retainedTargetObjectRequests.filter(request => request.objectKind === "specific-projective").length === 1
        && addedObjectRequest?.governor === "causative"
        && ["nonspecific-human", "nonspecific-nonhuman"].includes(addedObjectRequest?.objectKind);
      if (specificShuntlineChoiceEligible && !causativeSpecificShuntlineRealization) {
        causativeSpecificShuntlineRealization = "silent";
      }
      if (!blockReason && causativeSpecificShuntlineRealization && !["silent", "sounded"].includes(causativeSpecificShuntlineRealization)) {
        blockReason = "classical-vnc-causative-specific-shuntline-realization-not-recognized";
      } else if (!blockReason && causativeSpecificShuntlineRealization && !specificShuntlineChoiceEligible) {
        blockReason = "classical-vnc-causative-specific-shuntline-realization-not-applicable";
      }
      if (!blockReason && !areClassicalNahuatlVncDerivationObjectRequestsValid(targetObjectRequests, { maximumCount: 3 })) {
        blockReason = "classical-vnc-derivation-target-object-contract-invalid";
      }
      const participantEvidenceSection = getClassicalNahuatlVncCausativeParticipantEvidenceSection({
        derivationType,
        sourceVoice,
        sourceObjectCount: sourceObjectRequests.length,
        targetObjectCount: targetObjectRequests.length,
        addedObjectRequest
      });
      const participantRoleTransitionFrame = blockReason
        ? null
        : buildClassicalNahuatlParticipantRoleTransitionFrame({
          operationId: `derivation:${derivationType}`,
          sourceRoles: [
            "source-subject",
            ...(sourceObjectRequests.length ? ["source-object"] : []),
          ],
          targetRoles: [
            "target-subject",
            ...(targetObjectRequests.length ? ["target-object"] : []),
          ],
          retiredSourceRoles: derivationType === "causative"
            ? ["source-subject-controller"]
            : [],
          activatedTargetRoles: derivationType === "causative"
            ? [
              "new-matrix-subject-controller",
              sourceVoice === "active"
                ? "source-subject-as-causative-object"
                : sourceVoice === "impersonal"
                  ? "impersonal-source-subject-as-causative-object"
                  : "implicit-agent-as-causative-object",
            ]
            : ["added-applicative-object"],
          preservedParticipantFacts: [
            "typed-source-history",
            "source-object-participant-identities",
            ...(derivationType === "applicative"
              ? ["source-subject-role-and-identity"]
              : ["source-subject-participant-identity"]),
          ],
        });
      const participantTransformFrame = {
        frameRole: "typed-participant-transform",
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        derivationType,
        sourceVoice,
        sourceSubject: sourceDescriptor.sourceSubject,
        participantSurfaceSubject: sourceDescriptor.participantSurfaceSubject || sourceDescriptor.sourceSubject,
        participantSurfaceObjectRequests: sourceDescriptor.participantSurfaceObjectRequests || sourceObjectRequests,
        promotedSourceObjectRequest: sourceDescriptor.promotedSourceObjectRequest || null,
        implicitAgentObjectKind,
        targetSubject,
        requestedCausativeObjectKind,
        causativeObjectKind: addedObjectRequest?.objectKind || "",
        causativeObjectKindChoiceEligible,
        allowedCausativeObjectKinds,
        causativeObjectKindSelectionRequired,
        causativeObjectPersonBinding: addedObjectRequest?.governor !== "causative"
          ? ""
          : addedObjectRequest.objectKind === "reflexive"
            ? "target-subject-coordinate"
            : addedObjectRequest.objectKind === "specific-projective"
              ? "fixed-source-subject"
              : sourceVoice === "impersonal"
                ? "impersonal-source-subject"
                : "derived-implicit-agent",
        causativeSpecificShuntlineRealization,
        causativeSpecificShuntlineChoiceEligible: specificShuntlineChoiceEligible,
        sourceSubjectBecomesCausativeObject: derivationType === "causative" && ["active", "impersonal"].includes(sourceVoice),
        implicitAgentBecomesCausativeObject: derivationType === "causative" && sourceVoice !== "active",
        // Transformed impersonal subjects are faceless, not nonexistent
        // (Andrews 22.3, 24.8.3, 25.10.3). Their zero agreement continues as
        // the nonspecific causee; passive promoted subjects remain distinct.
        referentiallyEmptySourceSubjectDiscarded: false,
        passivePromotedSubjectRetainedAsObject: derivationType === "causative" && sourceVoice === "passive",
        sourceSubjectPreservedByApplicative: derivationType === "applicative",
        sourceObjectRequests,
        retainedTargetObjectRequests,
        retainedSourceReflexiveShuntlineRuleFrame,
        addedObjectRequest,
        targetObjectRequests,
        sourceObjectCount: sourceObjectRequests.length,
        targetObjectCount: targetObjectRequests.length,
        newestDerivationalLevel: newestLevel,
        participantEvidenceSection,
        participantRoleTransitionFrame,
        ...(sourceDescriptor.analyticalSourceFrame ? {
          abstractInnerSubjectParticipantFrame:sourceDescriptor.abstractInnerSubjectParticipantFrame,
          causativeObjectParticipantFrame:sourceDescriptor.abstractInnerSubjectParticipantFrame,
        } : {}),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      participantTransformFrame.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncParticipantTransformSignaturePayload(participantTransformFrame, sourceDescriptor.sourceSignature));
      return Object.freeze(participantTransformFrame);
    }
    function getClassicalNahuatlVncParticipantTransformSignaturePayload(participantTransformFrame = {}, sourceSignature = "") {
      return {
        derivationType: participantTransformFrame.derivationType,
        sourceSignature,
        sourceVoice: participantTransformFrame.sourceVoice || "active",
        sourceSubject: participantTransformFrame.sourceSubject,
        participantSurfaceSubject: participantTransformFrame.participantSurfaceSubject || "",
        participantSurfaceObjectRequests: participantTransformFrame.participantSurfaceObjectRequests || [],
        promotedSourceObjectRequest: participantTransformFrame.promotedSourceObjectRequest || null,
        implicitAgentObjectKind: participantTransformFrame.implicitAgentObjectKind || "",
        targetSubject: participantTransformFrame.targetSubject,
        requestedCausativeObjectKind: participantTransformFrame.requestedCausativeObjectKind || "",
        causativeObjectKind: participantTransformFrame.causativeObjectKind || "",
        causativeObjectKindChoiceEligible: participantTransformFrame.causativeObjectKindChoiceEligible === true,
        allowedCausativeObjectKinds: participantTransformFrame.allowedCausativeObjectKinds || [],
        causativeObjectKindSelectionRequired: participantTransformFrame.causativeObjectKindSelectionRequired === true,
        causativeObjectPersonBinding: participantTransformFrame.causativeObjectPersonBinding || "",
        causativeSpecificShuntlineRealization: participantTransformFrame.causativeSpecificShuntlineRealization || "",
        causativeSpecificShuntlineChoiceEligible: participantTransformFrame.causativeSpecificShuntlineChoiceEligible === true,
        sourceSubjectBecomesCausativeObject: participantTransformFrame.sourceSubjectBecomesCausativeObject === true,
        implicitAgentBecomesCausativeObject: participantTransformFrame.implicitAgentBecomesCausativeObject === true,
        referentiallyEmptySourceSubjectDiscarded: participantTransformFrame.referentiallyEmptySourceSubjectDiscarded === true,
        passivePromotedSubjectRetainedAsObject: participantTransformFrame.passivePromotedSubjectRetainedAsObject === true,
        sourceSubjectPreservedByApplicative: participantTransformFrame.sourceSubjectPreservedByApplicative === true,
        sourceObjectRequests: participantTransformFrame.sourceObjectRequests || [],
        retainedTargetObjectRequests: participantTransformFrame.retainedTargetObjectRequests || [],
        retainedSourceReflexiveShuntlineRuleFrame: participantTransformFrame.retainedSourceReflexiveShuntlineRuleFrame || null,
        addedObjectRequest: participantTransformFrame.addedObjectRequest || null,
        targetObjectRequests: participantTransformFrame.targetObjectRequests || [],
        sourceObjectCount: participantTransformFrame.sourceObjectCount,
        targetObjectCount: participantTransformFrame.targetObjectCount,
        newestDerivationalLevel: participantTransformFrame.newestDerivationalLevel,
        participantEvidenceSection: participantTransformFrame.participantEvidenceSection || "",
        participantRoleTransitionFrame: participantTransformFrame.participantRoleTransitionFrame || null,
        authorizationStatus: participantTransformFrame.authorizationStatus,
        blockReason: participantTransformFrame.blockReason || "",
        formulaArtifactAuthority: participantTransformFrame.formulaArtifactAuthority,
        surfaceArtifactAuthority: participantTransformFrame.surfaceArtifactAuthority
      };
    }
    function buildClassicalNahuatlVncDerivationReverseSourceAnalyses(sourceDescriptor = {}, selectedOption = null, participantTransformFrame = null) {
      if (!selectedOption) {
        return Object.freeze([]);
      }
      const selectedSourceAnalysis = {
        analysisId: `identified-source:${sourceDescriptor.sourceSignature}`,
        analysisStatus: "identified-source",
        formationStem: sourceDescriptor.sourceStem,
        formationClass: sourceDescriptor.sourceClass,
        sourceVoice: sourceDescriptor.sourceVoice || "active",
        sourceValence: sourceDescriptor.sourceValence,
        sourceObjectCount: sourceDescriptor.sourceObjectCount,
        sourceSubject: sourceDescriptor.sourceSubject,
        sourceTypedSemanticIdentity: sourceDescriptor.finalTypedFrame?.semanticIdentity || "",
        sourceSignature: sourceDescriptor.sourceSignature,
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze([selectedOption.andrewsSection, "25.9", "25.13"].filter(Boolean)),
        silentSourceObjectRequired: false,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      };
      const normalizedTarget = getClassicalNahuatlVncDerivationLexicalKey(selectedOption.targetStem);
      const normalizedSource = getClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem);
      const exactMachAmbiguity = normalizedSource === "mati" && ["machtia", "machtiā"].includes(normalizedTarget);
      const machReverseAnalyses = [{
        analysisId: "cn-l25-253-mach-tia-from-intransitive-mati",
        analysisStatus: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence === "intransitive" ? "identified-source" : "canonically-licensed-reverse-source",
        formationStem: sourceDescriptor.sourceStem,
        formationClass: "B",
        sourceVoice: "active",
        sourceValence: "intransitive",
        sourceObjectCount: 0,
        sourceSubject: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence === "intransitive" ? sourceDescriptor.sourceSubject : "context-dependent",
        sourceTypedSemanticIdentity: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence === "intransitive" ? sourceDescriptor.finalTypedFrame?.semanticIdentity || "" : "",
        sourceSignature: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence === "intransitive" ? sourceDescriptor.sourceSignature : "",
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze(["25.3", "25.13"]),
        silentSourceObjectRequired: false,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      }, {
        analysisId: "cn-l25-253-mach-tia-from-transitive-tla-mati",
        analysisStatus: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence !== "intransitive" ? "identified-source" : "canonically-licensed-reverse-source",
        formationStem: sourceDescriptor.sourceStem,
        formationClass: "B",
        sourceVoice: "active",
        sourceValence: "specific-projective",
        sourceObjectCount: 1,
        sourceSubject: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence !== "intransitive" ? sourceDescriptor.sourceSubject : "context-dependent",
        sourceTypedSemanticIdentity: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence !== "intransitive" ? sourceDescriptor.finalTypedFrame?.semanticIdentity || "" : "",
        sourceSignature: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence !== "intransitive" ? sourceDescriptor.sourceSignature : "",
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze(["25.3", "25.13"]),
        silentSourceObjectRequired: true,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      }];
      // Fixed prefix order can conceal grammatical roles, but the same
      // object kinds do not prove the same audible transform. Ask Lesson 23
      // which participants actually sound before describing a role alternative.
      const roleObjects = participantTransformFrame?.targetObjectRequests || [];
      const mainlineCausee = participantTransformFrame?.addedObjectRequest;
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const roleCluster = selectedOption.derivationType === "causative"
        && participantTransformFrame?.authorizationStatus === "authorized"
        && roleObjects.length >= 2
        && !roleObjects.some(request => request.objectKind === "reflexive")
        ? runtimeTarget?.buildClassicalNahuatlObjectClusterFrame?.(
          selectedOption.targetStem, {
            subject: participantTransformFrame.targetSubject,
            objectRequests: roleObjects,
            causativeSpecificShuntlineRealization:
              participantTransformFrame.causativeSpecificShuntlineRealization,
            rareThirdCausativeMeaningSupported: roleObjects.length === 3,
            exceptionalSuffixOrderAuthorized: roleObjects.length === 3
              && roleObjects.some(request => request.governor === "applicative"),
            minimumPositionCount: roleObjects.length,
            maximumPositionCount: roleObjects.length,
          },
        ) : null;
      const soundedRoles = roleCluster?.authorizationStatus === "authorized"
        ? roleCluster.positions.filter(position => position.sounded === true)
        : [];
      const soundedMainline = soundedRoles.find(position => (
        position.objectId === mainlineCausee?.objectId
      ));
      const otherRole = soundedRoles.find(position => (
        position.objectId !== mainlineCausee?.objectId
        && ((soundedMainline?.objectKind === "specific-projective"
          && position.objectKind === "nonspecific-human")
          || (soundedMainline?.objectKind === "nonspecific-human"
            && position.objectKind === "specific-projective"))
      ));
      const causativeAmbiguityAnalyses = !exactMachAmbiguity && otherRole
        ? [selectedSourceAnalysis, {
          analysisId: `cn-l25-2513-contextual-object-role-alternative:${sourceDescriptor.sourceSignature}`,
          analysisStatus: "contextual-object-role-alternative",
          formationStem: "",
          formationClass: "",
          sourceVoice: "",
          sourceValence: "",
          sourceObjectCount: null,
          sourceSubject: "context-dependent",
          sourceTypedSemanticIdentity: "",
          sourceSignature: "",
          selectedDerivationRoute: selectedOption.derivationRoute,
          andrewsSections: Object.freeze(["25.13", "23.5"]),
          objectRoleInterpretation:
            "context-dependent-mainline-and-shuntline-assignment",
          objectIds: Object.freeze([soundedMainline.objectId, otherRole.objectId]),
          generationAuthority: false,
          formulaAuthority: false,
          surfaceAuthority: false,
        }] : [];
      const applicativeRoleAmbiguityAnalyses = selectedOption.derivationType === "applicative"
        && participantTransformFrame?.sourceObjectCount === 2
        && participantTransformFrame?.targetObjectCount === 3
        ? [selectedSourceAnalysis, {
          analysisId: `cn-l26-2618-contextual-object-role-alternative:${sourceDescriptor.sourceSignature}`,
          analysisStatus: "canonically-licensed-role-alternative",
          formationStem: sourceDescriptor.sourceStem,
          formationClass: sourceDescriptor.sourceClass,
          sourceVoice: sourceDescriptor.sourceVoice || "active",
          sourceValence: sourceDescriptor.sourceValence,
          sourceObjectCount: sourceDescriptor.sourceObjectCount,
          sourceSubject: "context-dependent",
          sourceTypedSemanticIdentity: "",
          sourceSignature: "",
          selectedDerivationRoute: selectedOption.derivationRoute,
          andrewsSections: Object.freeze(["26.18", selectedOption.andrewsSection].filter(Boolean)),
          silentSourceObjectRequired: participantTransformFrame.targetObjectRequests.some(request => request.silentSpecificObject === true),
          objectRoleInterpretation: "context-dependent-mainline-and-shuntline-assignment",
          participantCoordinates: Object.freeze(participantTransformFrame.targetObjectRequests.map(request => Object.freeze({
            objectKind: request.objectKind,
            objectPerson: request.objectPerson,
            governor: request.governor,
            derivationalLevel: request.derivationalLevel
          }))),
          generationAuthority: false,
          formulaAuthority: false,
          surfaceAuthority: false
        }]
        : [];
      const analyses = applicativeRoleAmbiguityAnalyses.length
        ? applicativeRoleAmbiguityAnalyses
        : causativeAmbiguityAnalyses.length
        ? causativeAmbiguityAnalyses
        : exactMachAmbiguity
        ? [selectedSourceAnalysis, ...machReverseAnalyses.filter(analysis => (
          analysis.analysisStatus !== "identified-source"
        ))]
        : [selectedSourceAnalysis];
      return Object.freeze(analyses.map(analysis => Object.freeze({
        ...analysis,
        canonicalSignature: signClassicalNahuatlVncDerivationValue(analysis)
      })));
    }
    function deriveClassicalNahuatlVncDerivationOperationFrameFromCanonicalContext(sourceMachineryFrame = null, sourceDescriptor = {}, inventory = {}, options = {}) {
      const derivationType = normalizeClassicalNahuatlVncDerivationToken(options?.derivationType).toLowerCase();
      const requestedOptionId = normalizeClassicalNahuatlVncDerivationToken(options?.optionId || options?.derivationOptionId);
      const selectedOptionId = requestedOptionId || inventory.automaticOptionId;
      const selectedOption = inventory.options.find(option => option.optionId === selectedOptionId || option.optionAliases?.includes(selectedOptionId)) || null;
      let blockReason = sourceDescriptor.authorizationStatus === "authorized" ? inventory.blockReason : sourceDescriptor.blockReason;
      if (!blockReason && derivationType === "direct") {
        blockReason = "classical-vnc-direct-derivation-has-no-operation";
      } else if (!blockReason && inventory.selectionRequired && !requestedOptionId) {
        blockReason = "classical-vnc-derivation-option-selection-required";
      } else if (!blockReason && !selectedOption) {
        blockReason = "classical-vnc-derivation-selected-option-was-not-generated";
      }
      const participantTransformFrame = selectedOption && sourceDescriptor.authorizationStatus === "authorized" ? deriveClassicalNahuatlVncParticipantTransform(sourceDescriptor, derivationType, {
        ...options,
        selectedOption
      }) : null;
      if (!blockReason && participantTransformFrame?.authorizationStatus !== "authorized") {
        blockReason = participantTransformFrame?.blockReason || "classical-vnc-derivation-participant-transform-blocked";
      }
      const attestation = selectedOption?.sourceAttestationFrame;
      if (!blockReason && attestation && (sourceDescriptor.sourceVoice !== "active"
        || participantTransformFrame.targetSubject !== attestation.targetScope.subject
        || participantTransformFrame.targetObjectRequests.length !== 1
        || participantTransformFrame.targetObjectRequests[0].objectKind !== attestation.observedObjectKind
        || participantTransformFrame.targetObjectRequests[0].objectPerson !== attestation.observedObjectPerson)) {
        blockReason = "classical-vnc-source-attestation-participant-scope-required";
      }
      const reverseSourceAnalyses = selectedOption && sourceDescriptor.authorizationStatus === "authorized"
        ? buildClassicalNahuatlVncDerivationReverseSourceAnalyses(sourceDescriptor, selectedOption, participantTransformFrame)
        : Object.freeze([]);
      const operationFrame = {
        kind: "classical-nahuatl-vnc-derivation-operation-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        sourceAuthority: "Andrews transcription and rebuilt typed option inventory",
        sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        derivationType,
        sourceMachineryFrame,
        sourceTypedVncSlotFrame: sourceDescriptor.finalTypedFrame || null,
        formationSourceMachineryFrame: sourceDescriptor.formationSourceMachineryFrame || sourceMachineryFrame,
        formationSourceTypedVncSlotFrame: sourceDescriptor.formationFinalTypedFrame || sourceDescriptor.finalTypedFrame || null,
        sourceVoice: sourceDescriptor.sourceVoice || "active",
        sourceStem: sourceDescriptor.sourceStem || "",
        sourceSignature: sourceDescriptor.sourceSignature || "",
        sourceSubject: sourceDescriptor.sourceSubject || "",
        targetSubject: participantTransformFrame?.targetSubject || "",
        requestedCausativeObjectKind: participantTransformFrame?.requestedCausativeObjectKind || "",
        causativeObjectKind: participantTransformFrame?.causativeObjectKind || "",
        causativeObjectKindChoiceEligible: participantTransformFrame?.causativeObjectKindChoiceEligible === true,
        allowedCausativeObjectKinds: participantTransformFrame?.allowedCausativeObjectKinds || Object.freeze([]),
        causativeObjectKindSelectionRequired: participantTransformFrame?.causativeObjectKindSelectionRequired === true,
        causativeObjectPersonBinding: participantTransformFrame?.causativeObjectPersonBinding || "",
        causativeSpecificShuntlineRealization: participantTransformFrame?.causativeSpecificShuntlineRealization || "",
        requestedOptionId,
        selectedOptionId: selectedOption?.optionId || "",
        selectedOption,
        targetStem: selectedOption?.targetStem || "",
        formulaTargetStem:
          selectedOption?.formulaTargetStem
          || selectedOption?.targetStem
          || "",
        targetClass: selectedOption?.targetClass || "",
        targetEnvironment: selectedOption?.targetEnvironment || null,
        participantTransformFrame,
        reverseSourceAnalyses,
        targetObjectRequests: participantTransformFrame?.targetObjectRequests || Object.freeze([]),
        applicativeObjectKind: normalizeClassicalNahuatlVncDerivationObjectKind(options?.applicativeObjectKind || "specific-projective"),
        applicativeObjectPerson: normalizeClassicalNahuatlVncDerivationToken(options?.applicativeObjectPerson),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedTargetAllowed: false
      };
      operationFrame.canonicalSignature = signClassicalNahuatlVncDerivationValue({
        derivationType,
        sourceSignature: operationFrame.sourceSignature,
        selectedOptionSignature: selectedOption?.canonicalSignature || "",
        targetEnvironment: operationFrame.targetEnvironment,
        participantTransformSignature: participantTransformFrame?.canonicalSignature || "",
        reverseSourceAnalysisSignatures: reverseSourceAnalyses.map(analysis => analysis.canonicalSignature),
        authorizationStatus: operationFrame.authorizationStatus,
        blockReason
      });
      Object.freeze(operationFrame);
      if (operationFrame.authorizationStatus === "authorized") {
        classicalNahuatlIssuedVncDerivationOperationFrames.add(operationFrame);
      }
      return operationFrame;
    }
    function deriveClassicalNahuatlVncDerivationOperationFrameInternal(sourceMachineryFrame = null, options = {}, depth = 0, validationContext = null) {
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, depth + 1, validationContext);
      const derivationType = normalizeClassicalNahuatlVncDerivationToken(options?.derivationType).toLowerCase();
      const inventory = getClassicalNahuatlVncDerivationOptionInventoryInternal(sourceMachineryFrame, { derivationType, applicativeObjectKind: options?.applicativeObjectKind }, depth + 1, validationContext);
      return deriveClassicalNahuatlVncDerivationOperationFrameFromCanonicalContext(sourceMachineryFrame, sourceDescriptor, inventory, options);
    }
    function normalizeClassicalNahuatlVncDerivationOperationBatchRequest(options = {}) {
      return Object.freeze({
        derivationType: normalizeClassicalNahuatlVncDerivationToken(options?.derivationType).toLowerCase(),
        optionId: normalizeClassicalNahuatlVncDerivationToken(options?.optionId || options?.derivationOptionId),
        targetSubject: normalizeClassicalNahuatlVncDerivationToken(options?.targetSubject),
        causativeObjectKind: normalizeClassicalNahuatlVncDerivationToken(options?.causativeObjectKind),
        causativeSpecificShuntlineRealization: normalizeClassicalNahuatlVncDerivationToken(options?.causativeSpecificShuntlineRealization),
        applicativeObjectKind: normalizeClassicalNahuatlVncDerivationToken(options?.applicativeObjectKind),
        applicativeObjectPerson: normalizeClassicalNahuatlVncDerivationToken(options?.applicativeObjectPerson)
      });
    }
    function getClassicalNahuatlVncDerivationOperationBatchSignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        sourceSignature: frame.sourceSignature,
        derivationInventorySignature: frame.derivationOptionInventory?.canonicalSignature || "",
        operationRequests: frame.operationRequests || [],
        operationSignatures: (frame.operationFrames || []).map(operationFrame => operationFrame?.canonicalSignature || ""),
        operationCount: frame.operationCount || 0,
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaArtifactAuthority: frame.formulaArtifactAuthority,
        surfaceArtifactAuthority: frame.surfaceArtifactAuthority,
        callerSuppliedTargetAllowed: frame.callerSuppliedTargetAllowed
      };
    }
    function deriveClassicalNahuatlVncDerivationOperationBatchFrameInternal(sourceMachineryFrame = null, derivationOptionInventory = null, operationRequests = [], depth = 0, validationContext = null) {
      const normalizedOperationRequests = Object.freeze((Array.isArray(operationRequests) ? operationRequests : []).map(normalizeClassicalNahuatlVncDerivationOperationBatchRequest));
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, depth + 1, validationContext);
      const inventoryCanonical = derivationOptionInventory?.sourceMachineryFrame === sourceMachineryFrame
        && isClassicalNahuatlVncDerivationOptionInventoryInternal(derivationOptionInventory, depth + 1, validationContext);
      let blockReason = sourceDescriptor.authorizationStatus === "authorized" ? "" : sourceDescriptor.blockReason;
      if (!blockReason && !inventoryCanonical) {
        blockReason = "classical-vnc-derivation-operation-batch-canonical-inventory-required";
      } else if (!blockReason && !normalizedOperationRequests.length) {
        blockReason = "classical-vnc-derivation-operation-batch-requests-required";
      } else if (!blockReason && normalizedOperationRequests.some(request => request.derivationType !== derivationOptionInventory.derivationType)) {
        blockReason = "classical-vnc-derivation-operation-batch-type-must-match-inventory";
      }
      const operationFrames = Object.freeze(blockReason ? [] : normalizedOperationRequests.map(request => deriveClassicalNahuatlVncDerivationOperationFrameFromCanonicalContext(
        sourceMachineryFrame,
        sourceDescriptor,
        derivationOptionInventory,
        request
      )));
      if (!blockReason) {
        const blockedOperation = operationFrames.find(operation => operation.authorizationStatus !== "authorized");
        if (blockedOperation) {
          blockReason = blockedOperation.blockReason || "classical-vnc-derivation-operation-batch-child-blocked";
        }
      }
      const frame = {
        kind: "classical-nahuatl-vnc-derivation-operation-batch-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceMachineryFrame,
        sourceSignature: sourceDescriptor.sourceSignature || "",
        derivationOptionInventory,
        operationRequests: normalizedOperationRequests,
        operationFrames,
        operationCount: operationFrames.length,
        typedFrameAuthority: true,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedTargetAllowed: false
      };
      frame.canonicalSignature = blockReason ? "" : signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationOperationBatchSignaturePayload(frame));
      Object.freeze(frame);
      if (frame.authorizationStatus === "authorized") {
        classicalNahuatlIssuedVncDerivationOperationBatchFrames.add(frame);
      }
      return frame;
    }
    function deriveClassicalNahuatlVncDerivationOperationBatchFrame(sourceMachineryFrame = null, derivationOptionInventory = null, operationRequests = []) {
      return deriveClassicalNahuatlVncDerivationOperationBatchFrameInternal(sourceMachineryFrame, derivationOptionInventory, operationRequests, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function isClassicalNahuatlVncDerivationOperationBatchFrame(frame = null) {
      if (!frame
        || !classicalNahuatlIssuedVncDerivationOperationBatchFrames.has(frame)
        || frame.kind !== "classical-nahuatl-vnc-derivation-operation-batch-frame"
        || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.formulaArtifactAuthority !== false
        || frame.surfaceArtifactAuthority !== false
        || frame.callerSuppliedTargetAllowed !== false
        || frame.operationCount !== frame.operationFrames?.length
        || frame.operationCount !== frame.operationRequests?.length
        || !classicalNahuatlIssuedVncDerivationOptionInventories.has(
          frame.derivationOptionInventory,
        )
        || !frame.operationFrames.every(operationFrame =>
          classicalNahuatlIssuedVncDerivationOperationFrames.has(
            operationFrame,
          ))) {
        return false;
      }
      const rebuilt = deriveClassicalNahuatlVncDerivationOperationBatchFrameInternal(
        frame.sourceMachineryFrame,
        frame.derivationOptionInventory,
        frame.operationRequests,
        0,
        createClassicalNahuatlVncDerivationValidationContext()
      );
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.sourceMachineryFrame === frame.sourceMachineryFrame
        && rebuilt.derivationOptionInventory === frame.derivationOptionInventory
        && frame.operationFrames.every(operationFrame => operationFrame?.sourceMachineryFrame === frame.sourceMachineryFrame)
        && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationOperationBatchSignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlVncDerivationValuesEqual(rebuilt, frame));
    }
    function deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame = null, options = {}) {
      return deriveClassicalNahuatlVncDerivationOperationFrameInternal(sourceMachineryFrame, options, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getComparableClassicalNahuatlVncDerivationOperationFrame(frame = {}) {
      return Object.fromEntries(Object.entries(frame).filter(([key]) => ![
        "sourceMachineryFrame",
        "formationSourceMachineryFrame"
      ].includes(key)));
    }
    function isClassicalNahuatlVncDerivationOperationFrameInternal(frame = null, depth = 0, validationContext = null) {
      if (!frame || !classicalNahuatlIssuedVncDerivationOperationFrames.has(frame) || frame.kind !== "classical-nahuatl-vnc-derivation-operation-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION || frame.authorizationStatus !== "authorized" || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false || frame.callerSuppliedTargetAllowed !== false) {
        return false;
      }
      if (validationContext?.operations?.has(frame)) {
        return true;
      }
      const rebuilt = deriveClassicalNahuatlVncDerivationOperationFrameInternal(frame.sourceMachineryFrame, {
        derivationType: frame.derivationType,
        optionId: frame.requestedOptionId,
        targetSubject: frame.targetSubject,
        causativeObjectKind: frame.requestedCausativeObjectKind,
        causativeSpecificShuntlineRealization: frame.causativeSpecificShuntlineRealization,
        applicativeObjectKind: frame.applicativeObjectKind,
        applicativeObjectPerson: frame.applicativeObjectPerson
      }, depth + 1, validationContext);
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const selectedOptionSignatureValid = frame.selectedOption?.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationOptionSignaturePayload(frame.selectedOption));
      const selectedOptionOwnerIssued =
        classicalNahuatlIssuedVncDerivationOptions.has(frame.selectedOption);
      const participantSignatureValid = frame.participantTransformFrame?.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncParticipantTransformSignaturePayload(frame.participantTransformFrame, frame.sourceSignature));
      const lesson20Record = frame.selectedOption?.lesson20NonactiveStemRecord || null;
      const lesson20RecordValid = !lesson20Record || typeof runtimeTarget?.isClassicalNahuatlNonactiveStemRecord === "function" && runtimeTarget.isClassicalNahuatlNonactiveStemRecord(lesson20Record, frame.selectedOption?.sourceStem || frame.sourceStem) && frame.selectedOption.lesson20RecordSignature === getClassicalNahuatlRecordSignature(lesson20Record);
      const internalBridgeValid = !frame.selectedOption?.typeTwoInternalBridgeFrame
        || isClassicalNahuatlTypeTwoCausativeInternalBridgeFrame(
          frame.selectedOption.typeTwoInternalBridgeFrame,
          getClassicalNahuatlVncDerivationSourceDescriptor(
            frame.sourceMachineryFrame,
            depth + 1,
            validationContext,
          ),
        );
      const canonical = Boolean(rebuilt.authorizationStatus === "authorized" && frame.canonicalSignature === rebuilt.canonicalSignature && frame.sourceSignature === rebuilt.sourceSignature && frame.formationSourceMachineryFrame === rebuilt.formationSourceMachineryFrame && frame.targetStem === rebuilt.targetStem && frame.targetClass === rebuilt.targetClass && selectedOptionOwnerIssued && selectedOptionSignatureValid && lesson20RecordValid && internalBridgeValid && frame.selectedOption?.canonicalSignature === rebuilt.selectedOption?.canonicalSignature && areClassicalNahuatlVncDerivationValuesEqual(frame.selectedOption, rebuilt.selectedOption) && areClassicalNahuatlVncDerivationValuesEqual(frame.targetObjectRequests, rebuilt.targetObjectRequests) && participantSignatureValid && frame.participantTransformFrame?.canonicalSignature === rebuilt.participantTransformFrame?.canonicalSignature && areClassicalNahuatlVncDerivationValuesEqual(frame.participantTransformFrame, rebuilt.participantTransformFrame) && areClassicalNahuatlVncDerivationValuesEqual(getComparableClassicalNahuatlVncDerivationOperationFrame(frame), getComparableClassicalNahuatlVncDerivationOperationFrame(rebuilt)));
      if (canonical) {
        validationContext?.operations?.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlVncDerivationOperationFrame(frame = null) {
      return isClassicalNahuatlVncDerivationOperationFrameInternal(frame, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getClassicalNahuatlVncDerivationValenceForObjectKind(objectKind = "") {
      return {
        reflexive: "mainline-reflexive",
        "nonspecific-human": "projective-human",
        "nonspecific-nonhuman": "projective-nonhuman",
        "specific-projective": "specific-projective"
      }[normalizeClassicalNahuatlVncDerivationObjectKind(objectKind)] || "specific-projective";
    }
    function getClassicalNahuatlVncDerivationSafeSentenceOptions(options = {}) {
      const source = options?.sentenceOptions && typeof options.sentenceOptions === "object" ? options.sentenceOptions : options;
      const keys = ["directionalPrefix", "directionalIttaContraction", "incorporatedAdverb", "adverbPosition", "sentenceType", "punctuationMode", "admonitivePluralEnding", "finiteSingularConnector", "defectiveANegativeVariant", "negative", "questionMode", "introductoryParticle", "prefaceParticle", "lesson9PrefaceParticle", "introductoryModifier", "lesson9IntroductoryModifier", "admonitiveTranslationReading", "translationReading", "requestedTranslationReading", "admonitiveContrastReading", "contrastReading", "requestedContrastReading", "sentenceAntecessive", "antecessive", "requestedNegativePrefix", "negativePrefix", "outsidePrefixes", "construction", "lesson11LexicalReading"];
      return Object.fromEntries(keys.filter(key => Object.prototype.hasOwnProperty.call(source || {}, key)).map(key => [key, Array.isArray(source[key]) ? [...source[key]] : source[key]]));
    }
    function buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame = null, operationFrame = null, blockReason = "classical-vnc-derived-machinery-not-authorized") {
      return Object.freeze({
        kind: "classical-nahuatl-vnc-derived-machinery-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        stem: "",
        targetStem: operationFrame?.targetStem || "",
        targetClass: operationFrame?.targetClass || "",
        valence: "",
        sourceMachineryFrame,
        sourceTypedVncSlotFrame: getClassicalNahuatlVncDerivationFinalTypedFrame(sourceMachineryFrame),
        derivationOperationFrame: operationFrame,
        participantTransformFrame: operationFrame?.participantTransformFrame || null,
        targetObjectRequests: operationFrame?.targetObjectRequests || Object.freeze([]),
        multipleObjectClusterFrame: null,
        targetObjectClusterFrame: null,
        targetTypedVncSlotFrame: null,
        finalTypedVncSlotFrame: null,
        typedFrameAuthority: true,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlDerivedVncMachinerySignaturePayload(frame = {}) {
      return {
        sourceSignature: frame.sourceSignature,
        operationSignature: frame.derivationOperationFrame?.canonicalSignature || "",
        targetStem: frame.targetStem,
        formulaTargetStem: frame.formulaTargetStem || frame.targetStem,
        targetClass: frame.targetClass,
        targetSubject: frame.targetSubject,
        sourceSemanticEnvironment: frame.sourceSemanticEnvironment || null,
        targetSemanticEnvironment: frame.targetSemanticEnvironment || null,
        targetMorphologicalEnvironment: frame.targetMorphologicalEnvironment || null,
        targetObjectRequests: frame.targetObjectRequests || [],
        targetTypedSemanticIdentity: frame.targetTypedVncSlotFrame?.semanticIdentity || "",
        targetClusterPositions: frame.targetObjectClusterFrame?.positions || []
      };
    }
    function getClassicalNahuatlDerivedVncCanonicalSentenceOptions(sourceMachineryFrame = null) {
      const conclusion = sourceMachineryFrame?.proofFrame?.conclusion || {};
      const expandedBoundary = sourceMachineryFrame?.expandedVncBoundaryFrame || conclusion.expandedVncBoundaryFrame || {};
      const sentenceFrame = sourceMachineryFrame?.sentenceSurfaceFrame || conclusion.sentenceSurfaceFrame || {};
      const sentenceAntecessive = conclusion.antecessiveOutsideVnc === true || sentenceFrame.sentenceAntecessive === true || sentenceFrame.antecessive === true;
      const negative = sentenceFrame.lesson9NegativeRequested === true || sentenceFrame.lesson10NegativeRequested === true || sentenceFrame.sentenceType === "negative-assertion" || Boolean(sentenceFrame.negativePrefix);
      return getClassicalNahuatlVncDerivationSafeSentenceOptions({
        directionalPrefix: expandedBoundary.directionalPrefix || conclusion.directionalPrefix || "",
        directionalIttaContraction: expandedBoundary.directionalIttaContractionFrame?.requestedSelection || "",
        incorporatedAdverb: conclusion.incorporatedAdverb || "",
        adverbPosition: conclusion.adverbPosition || "",
        sentenceType: sentenceFrame.sentenceType || "",
        punctuationMode: sentenceFrame.punctuationMode || "",
        admonitivePluralEnding: sentenceFrame.admonitivePluralEnding || "",
        finiteSingularConnector: sentenceFrame.finiteSingularConnector || "",
        defectiveANegativeVariant: sentenceFrame.defectiveANegativeVariant || "",
        negative,
        questionMode: sentenceFrame.questionMode || "",
        introductoryParticle: sentenceFrame.introductoryParticle || "",
        prefaceParticle: sentenceFrame.prefaceParticle || "",
        lesson9PrefaceParticle: sentenceFrame.requestedPrefaceParticle || sentenceFrame.prefaceParticle || "",
        introductoryModifier: sentenceFrame.introductoryModifier || "",
        lesson9IntroductoryModifier: sentenceFrame.requestedIntroductoryModifier || sentenceFrame.introductoryModifier || "",
        admonitiveTranslationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        translationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        requestedTranslationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        admonitiveContrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        contrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        requestedContrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        sentenceAntecessive,
        antecessive: sentenceAntecessive,
        requestedNegativePrefix: expandedBoundary.negativePrefixes?.[0] || "",
        negativePrefix: expandedBoundary.negativePrefixes?.[0] || "",
        outsidePrefixes: Array.isArray(conclusion.outsidePrefixes) ? [...conclusion.outsidePrefixes] : [],
        construction: sentenceFrame.lesson11Construction || "",
        // The issued irregular plan owns the lexical reading. Retain it when
        // reconstructing homophonous defective Sources for validation.
        lesson11LexicalReading: sourceMachineryFrame?.lesson11VncApplicationFrame?.selectedLexicalReading
          || sourceMachineryFrame?.lesson11ParadigmPlan?.identity?.lexicalReading
          || ""
      });
    }
    function getClassicalNahuatlDerivedVncAuthoritativeProjection(frame = {}) {
      return {
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        stem: frame.stem,
        targetStem: frame.targetStem,
        targetClass: frame.targetClass,
        targetSubject: frame.targetSubject,
        sourceSemanticEnvironment: frame.sourceSemanticEnvironment,
        targetSemanticEnvironment: frame.targetSemanticEnvironment,
        targetMorphologicalEnvironment: frame.targetMorphologicalEnvironment,
        valence: frame.valence,
        sourceSignature: frame.sourceSignature,
        participantTransformFrame: frame.participantTransformFrame,
        targetObjectRequests: frame.targetObjectRequests,
        multipleObjectClusterFrame: frame.multipleObjectClusterFrame,
        targetObjectClusterFrame: frame.targetObjectClusterFrame,
        targetTypedVncSlotFrame: frame.targetTypedVncSlotFrame,
        finalTypedVncSlotFrame: frame.finalTypedVncSlotFrame,
        sourceOperationTargetFrames: frame.sourceOperationTargetFrames,
        formulaRealization: frame.formulaRealization,
        proofFrame: frame.proofFrame,
        selectedOutputLogicFrame: frame.selectedOutputLogicFrame,
        expandedVncBoundaryFrame: frame.expandedVncBoundaryFrame,
        sentenceSurfaceFrame: frame.sentenceSurfaceFrame,
        grammarOperationEvaluationFrame: frame.grammarOperationEvaluationFrame,
        ruleLogicFrames: frame.ruleLogicFrames,
        ruleLogicFrameKinds: frame.ruleLogicFrameKinds,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        formulaOutputAllowed: frame.formulaOutputAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed,
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaArtifactAuthority: frame.formulaArtifactAuthority,
        surfaceArtifactAuthority: frame.surfaceArtifactAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted
      };
    }
    function buildClassicalNahuatlDerivedVncMachineryFrameInternal(sourceMachineryFrame = null, operationFrame = null, options = {}, depth = 0, validationContext = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, depth + 1, validationContext);
      if (sourceDescriptor.authorizationStatus !== "authorized") {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, sourceDescriptor.blockReason);
      }
      if (!isClassicalNahuatlVncDerivationOperationFrameInternal(operationFrame, depth + 1, validationContext) || operationFrame.sourceSignature !== sourceDescriptor.sourceSignature) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-canonical-operation-required");
      }
      if (typeof runtimeTarget?.buildClassicalNahuatlVerbstemClassFrame !== "function" || typeof runtimeTarget?.buildClassicalNahuatlObjectClusterFrame !== "function" || typeof runtimeTarget?.isClassicalNahuatlObjectClusterFrame !== "function" || typeof runtimeTarget?.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame !== "function") {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-lower-layer-capabilities-unavailable");
      }
      const targetSubject = operationFrame.targetSubject;
      const requestedTargetSubject = normalizeClassicalNahuatlVncDerivationToken(options?.targetSubject);
      const targetMood = normalizeClassicalNahuatlVncDerivationToken(options?.mood || sourceDescriptor.mood);
      const requestedTargetParadigmTense = normalizeClassicalNahuatlVncParadigmTense(options?.tense || sourceDescriptor.paradigmTense || sourceDescriptor.tense);
      const targetTense = normalizeClassicalNahuatlVncSemanticTense(requestedTargetParadigmTense || options?.tense || sourceDescriptor.tense);
      if (requestedTargetSubject && requestedTargetSubject !== targetSubject) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-target-subject-contradiction");
      }
      // Stem-level derivation consumes the authorized Source predicate. The
      // resulting predicate is then inflected at its own target coordinate;
      // source mood/tense remain provenance and cannot constrain that later
      // finite application. Lesson 11 resolves any semantic/morphological
      // difference inside the target's ordinary Lesson 7 machinery.
      const targetObjectRequests = operationFrame.targetObjectRequests;
      if (!targetObjectRequests.length || targetObjectRequests.length > 3) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-one-to-three-target-objects-required");
      }
      const semanticSourceMachinery =
        typeof runtimeTarget.buildClassicalNahuatlIrregularVncParadigmPlan
          === "function"
        ? runtimeTarget.buildClassicalNahuatlIrregularVncParadigmPlan(
          sourceDescriptor.sourceStem,
          {
            subject: sourceDescriptor.sourceSubject,
            mood: targetMood,
            tense: requestedTargetParadigmTense || targetTense,
            sourceLexemeId: sourceDescriptor.sourceLexemeId || "",
          },
        )
        : null;
      const semanticSourcePlan =
        semanticSourceMachinery?.applies === true
          ? semanticSourceMachinery
          : null;
      if (
        semanticSourcePlan
        && semanticSourcePlan.authorizationStatus !== "authorized"
      ) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(
          sourceMachineryFrame,
          operationFrame,
          semanticSourcePlan.blockReason
            || "classical-vnc-derived-source-semantic-coordinate-blocked",
        );
      }
      const requestedTargetMorphologicalMood =
        targetMood;
      const requestedTargetMorphologicalTense =
        requestedTargetParadigmTense || targetTense;
      const oldestObjectRequest = targetObjectRequests.slice().sort((left, right) => left.derivationalLevel - right.derivationalLevel)[0];
      const baseValence = getClassicalNahuatlVncDerivationValenceForObjectKind(oldestObjectRequest.objectKind);
      const callerSentenceOptions = getClassicalNahuatlVncDerivationSafeSentenceOptions(options);
      const sentenceOptions = operationFrame.targetEnvironment?.directionalPrefix ? {
        ...callerSentenceOptions,
        directionalPrefix: operationFrame.targetEnvironment.directionalPrefix
      } : callerSentenceOptions;
      const attestation = operationFrame.selectedOption?.sourceAttestationFrame;
      if (attestation && (targetSubject !== attestation.targetScope.subject
        || targetMood !== attestation.targetScope.mood || targetTense !== attestation.targetScope.tense
        || sentenceOptions.directionalPrefix !== attestation.targetScope.directionalPrefix)) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame,
          "classical-vnc-source-attestation-finite-scope-required");
      }
      const targetLesson7Machinery = runtimeTarget.buildClassicalNahuatlVerbstemClassFrame(operationFrame.targetStem, {
        ...sentenceOptions,
        subject: targetSubject,
        mood: requestedTargetMorphologicalMood,
        tense: requestedTargetMorphologicalTense,
        verbClass: operationFrame.targetClass,
        perfectiveClass: operationFrame.targetClass,
        ...(operationFrame.selectedOption?.derivationRoute === "type-one-final-a-morphological-replacement"
          ? {vncCausativeOperationFrame:operationFrame} : {}),
        requestedSourceValence: baseValence,
        valence: baseValence,
        transitivity: "transitive",
        objectKind: oldestObjectRequest.objectKind,
        objectPerson: oldestObjectRequest.objectPerson,
        object: oldestObjectRequest.objectPerson,
        initialVowelKind: /^[iī]/iu.test(normalizeClassicalNahuatlVncDerivationStem(operationFrame.targetStem))
          ? operationFrame.selectedOption?.targetInitialIKind || sourceDescriptor.sourceInitialIKind
          : ""
      });
      let selectedMachineryFrame = targetLesson7Machinery;
      let targetObjectClusterFrame = null;
      const lowerTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(targetLesson7Machinery);
      if (targetLesson7Machinery?.authorizationStatus !== "authorized" || !isClassicalNahuatlVncDerivationTypedSlotFrame(lowerTypedFrame)) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, targetLesson7Machinery?.blockReason || "classical-vnc-derived-target-lesson7-machinery-blocked");
      }
      if (targetObjectRequests.length >= 2) {
        const orderedTargetObjectRequests = targetObjectRequests
          .slice()
          .sort((left, right) => left.derivationalLevel - right.derivationalLevel);
        const newestTargetObjectRequest = orderedTargetObjectRequests.at(-1) || null;
        const typedOperationAddsThirdCausative =
          operationFrame.derivationType === "causative"
          && targetObjectRequests.length === 3
          && newestTargetObjectRequest?.governor === "causative";
        const typedOperationAuthorizesExceptionalSuffixHistory =
          typedOperationAddsThirdCausative
          && orderedTargetObjectRequests
            .slice(0, -1)
            .some((request) => request.governor === "applicative");
        targetObjectClusterFrame = runtimeTarget.buildClassicalNahuatlObjectClusterFrame(operationFrame.targetStem, {
          subject: targetSubject,
          subjectCarrier: lowerTypedFrame.slots.subject.pers1,
          predicateStem: lowerTypedFrame.slots.predicate.stem,
          tense: targetLesson7Machinery?.lesson11ParadigmPlan
            ?.morphologicalTense
            || requestedTargetMorphologicalTense,
          objectRequests: targetObjectRequests,
          causativeSpecificShuntlineRealization: operationFrame.causativeSpecificShuntlineRealization,
          // The owner-issued operation is itself the user's intended meaning
          // and history. It supplies these narrow Lesson 23 permissions
          // automatically; no extra switch or stem list is needed.
          rareThirdCausativeMeaningSupported:
            typedOperationAddsThirdCausative,
          exceptionalSuffixOrderAuthorized:
            typedOperationAuthorizesExceptionalSuffixHistory,
          minimumPositionCount: targetObjectRequests.length,
          maximumPositionCount: targetObjectRequests.length
        });
        if (!runtimeTarget.isClassicalNahuatlObjectClusterFrame(targetObjectClusterFrame, operationFrame.targetStem)) {
          return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, targetObjectClusterFrame?.blockReason || "classical-vnc-derived-target-object-cluster-blocked");
        }
        selectedMachineryFrame = runtimeTarget.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(targetLesson7Machinery, targetObjectClusterFrame, {
          sourceFrameKind: "classical-nahuatl-vnc-derived-machinery-frame"
        });
      }
      const targetTypedVncSlotFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(selectedMachineryFrame);
      if (!selectedMachineryFrame || selectedMachineryFrame.authorizationStatus !== "authorized" || !isClassicalNahuatlVncDerivationTypedSlotFrame(targetTypedVncSlotFrame)) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, selectedMachineryFrame?.blockReason || "classical-vnc-derived-target-typed-slot-blocked");
      }
      if (sourceDescriptor.analyticalSourceFrame) {
        const participant=sourceDescriptor.abstractInnerSubjectParticipantFrame;
        const causer=sourceDescriptor.targetSubjectParticipantFrame;
        const valenceContacts=targetTypedVncSlotFrame.slots.prePredicate
          .filter(slot=>["monadic-valence","dyadic-valence"].includes(slot.kind));
        if (targetObjectRequests.length!==1 || valenceContacts.length!==1
          || targetObjectRequests[0].participantFrame!==participant
          || causer.morphologicalAgreement!==targetSubject) {
          return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame,operationFrame,
            "classical-vnc-analytical-target-participant-contact-required");
        }
        // These are the target owner's newly issued contacts, not a copied
        // Source slot. Keep the semantic identities next to their actual
        // morphological carriers without changing those carriers.
        targetTypedVncSlotFrame.slots.subject.participantFrame=causer;
        valenceContacts[0].objectRequestFrame=targetObjectRequests[0];
        valenceContacts[0].participantFrame=participant;
      }
      if (sourceDescriptor.classIndependentApplicativeSource) {
        const participant = sourceDescriptor.sourceSubjectParticipantFrame;
        if (operationFrame.derivationType !== "applicative" || !isClassicalNahuatlParticipantFrame(participant)
          || participant.morphologicalAgreement !== targetSubject) {
          return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame,operationFrame,
            "classical-vnc-class-independent-applicative-subject-required");
        }
        targetTypedVncSlotFrame.slots.subject.participantFrame = participant;
      }
      const targetLesson11ParadigmPlan =
        targetLesson7Machinery?.lesson11ParadigmPlan || null;
      const targetMorphologicalMood =
        targetLesson11ParadigmPlan?.morphologicalMood
        || requestedTargetMorphologicalMood;
      const targetMorphologicalTense =
        targetLesson11ParadigmPlan?.morphologicalTense
        || requestedTargetMorphologicalTense;
      const existingRuleLogicFrames = Array.isArray(selectedMachineryFrame.ruleLogicFrames) ? selectedMachineryFrame.ruleLogicFrames : [];
      const derivedFrame = {
        ...selectedMachineryFrame,
        kind: "classical-nahuatl-vnc-derived-machinery-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        lesson: operationFrame.derivationType === "causative" ? "Andrews Lessons 24-25" : "Andrews Lesson 26",
        lessonTitle: operationFrame.derivationType === "causative" ? "Causative VNC Derivation" : "Applicative VNC Derivation",
        authorizationStatus: "authorized",
        blockReason: "",
        stem: operationFrame.targetStem,
        targetStem: operationFrame.targetStem,
        formulaTargetStem:
          operationFrame.formulaTargetStem || operationFrame.targetStem,
        targetClass: operationFrame.targetClass,
        targetEnvironment: operationFrame.targetEnvironment,
        targetSubject,
        ...(sourceDescriptor.analyticalSourceFrame ? {sourceFiniteEventAsserted:false} : {}),
        sourceSemanticEnvironment: sourceDescriptor.analyticalSourceFrame ? null : Object.freeze({
          mood: semanticSourcePlan?.requestedMood || targetMood,
          tense:
            semanticSourcePlan?.requestedSemanticTense || targetTense,
          paradigmTense:
            semanticSourcePlan?.paradigmTense
              || requestedTargetParadigmTense
              || targetTense,
          semanticTenseValue:
            semanticSourcePlan?.semanticTenseValue || targetTense
        }),
        targetSemanticEnvironment: Object.freeze({
          mood: targetMood,
          tense: targetTense,
          paradigmTense: requestedTargetParadigmTense || targetTense,
          semanticTenseValue:
            targetLesson11ParadigmPlan?.semanticTenseValue || targetTense
        }),
        targetMorphologicalEnvironment: Object.freeze({ mood: targetMorphologicalMood, tense: targetMorphologicalTense }),
        valence: targetObjectRequests.length > 1 ? "multiple-object" : baseValence,
        sourceMachineryFrame,
        sourceTypedVncSlotFrame: sourceDescriptor.finalTypedFrame,
        sourceSignature: sourceDescriptor.sourceSignature,
        derivationOperationFrame: operationFrame,
        participantTransformFrame: operationFrame.participantTransformFrame,
        targetObjectRequests,
        multipleObjectClusterFrame: targetObjectClusterFrame,
        targetObjectClusterFrame,
        targetLesson7MachineryFrame: targetLesson7Machinery,
        targetTypedVncSlotFrame,
        finalTypedVncSlotFrame: targetTypedVncSlotFrame,
        sourceOperationTargetFrames: Object.freeze({
          source: sourceDescriptor.finalTypedFrame,
          operation: operationFrame,
          target: targetTypedVncSlotFrame
        }),
        ruleLogicFrames: [operationFrame, ...(targetObjectClusterFrame ? [targetObjectClusterFrame] : []), ...existingRuleLogicFrames],
        ruleLogicFrameKinds: [operationFrame.kind, ...(targetObjectClusterFrame ? [targetObjectClusterFrame.kind] : []), ...(Array.isArray(selectedMachineryFrame.ruleLogicFrameKinds) ? selectedMachineryFrame.ruleLogicFrameKinds : [])],
        typedFrameAuthority: true,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedAuthorityAccepted: false
      };
      derivedFrame.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlDerivedVncMachinerySignaturePayload(derivedFrame));
      Object.freeze(derivedFrame);
      classicalNahuatlIssuedDerivedVncMachineryFrames.add(derivedFrame);
      return derivedFrame;
    }
    function buildClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame = null, operationFrame = null, options = {}) {
      return buildClassicalNahuatlDerivedVncMachineryFrameInternal(sourceMachineryFrame, operationFrame, options, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function isCanonicalClassicalNahuatlDerivedVncMachineryFrame(frame = null, depth = 0, validationContext = null) {
      if (!frame || !classicalNahuatlIssuedDerivedVncMachineryFrames.has(frame) || frame.kind !== "classical-nahuatl-vnc-derived-machinery-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION || frame.authorizationStatus !== "authorized" || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH || frame.typedFrameAuthority !== true || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false || frame.callerSuppliedAuthorityAccepted !== false) {
        return false;
      }
      if (validationContext?.machineryFrames?.has(frame)) {
        return true;
      }
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(frame.sourceMachineryFrame, depth + 1, validationContext);
      const operationAuthorized = isClassicalNahuatlVncDerivationOperationFrameInternal(frame.derivationOperationFrame, depth + 1, validationContext);
      const targetTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(frame);
      if (sourceDescriptor.authorizationStatus !== "authorized" || !operationAuthorized || frame.sourceSignature !== sourceDescriptor.sourceSignature || frame.derivationOperationFrame.sourceSignature !== sourceDescriptor.sourceSignature || frame.targetStem !== frame.derivationOperationFrame.targetStem || frame.targetClass !== frame.derivationOperationFrame.targetClass || !isClassicalNahuatlVncDerivationTypedSlotFrame(targetTypedFrame) || targetTypedFrame.semanticIdentity !== frame.targetTypedVncSlotFrame?.semanticIdentity || !areClassicalNahuatlVncDerivationValuesEqual(frame.targetObjectRequests, frame.derivationOperationFrame.targetObjectRequests)) {
        return false;
      }
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (frame.targetObjectRequests.length >= 2 && !(typeof runtimeTarget?.isClassicalNahuatlObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlObjectClusterFrame(frame.targetObjectClusterFrame, frame.targetStem))) {
        return false;
      }
      const rebuiltOperation = deriveClassicalNahuatlVncDerivationOperationFrameInternal(frame.sourceMachineryFrame, {
        derivationType: frame.derivationOperationFrame.derivationType,
        optionId: frame.derivationOperationFrame.requestedOptionId,
        targetSubject: frame.derivationOperationFrame.targetSubject,
        causativeObjectKind: frame.derivationOperationFrame.requestedCausativeObjectKind,
        causativeSpecificShuntlineRealization: frame.derivationOperationFrame.causativeSpecificShuntlineRealization,
        applicativeObjectKind: frame.derivationOperationFrame.applicativeObjectKind,
        applicativeObjectPerson: frame.derivationOperationFrame.applicativeObjectPerson
      }, depth + 1, validationContext);
      if (!isClassicalNahuatlVncDerivationOperationFrameInternal(rebuiltOperation, depth + 1, validationContext)) {
        return false;
      }
      if (!areClassicalNahuatlVncDerivationValuesEqual(getComparableClassicalNahuatlVncDerivationOperationFrame(frame.derivationOperationFrame), getComparableClassicalNahuatlVncDerivationOperationFrame(rebuiltOperation)) || !areClassicalNahuatlVncDerivationValuesEqual(frame.derivationOperationFrame.sourceMachineryFrame, frame.sourceMachineryFrame) || !areClassicalNahuatlVncDerivationValuesEqual(frame.participantTransformFrame, frame.derivationOperationFrame.participantTransformFrame)) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlDerivedVncMachineryFrameInternal(frame.sourceMachineryFrame, rebuiltOperation, {
        mood: frame.targetSemanticEnvironment?.mood,
        tense: frame.targetSemanticEnvironment?.paradigmTense
          || frame.targetSemanticEnvironment?.tense,
        targetSubject: rebuiltOperation.targetSubject,
        sentenceOptions:
          getClassicalNahuatlDerivedVncCanonicalSentenceOptions(frame)
      }, depth + 1, validationContext);
      if (rebuilt?.authorizationStatus !== "authorized") {
        return false;
      }
      const authoritativeProjectionMatches = areClassicalNahuatlVncDerivationValuesEqual(getClassicalNahuatlDerivedVncAuthoritativeProjection(frame), getClassicalNahuatlDerivedVncAuthoritativeProjection(rebuilt));
      const canonical = Boolean(authoritativeProjectionMatches && frame.canonicalSignature === rebuilt.canonicalSignature && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlDerivedVncMachinerySignaturePayload(frame)));
      if (canonical) {
        validationContext?.machineryFrames?.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlDerivedVncMachineryFrame(frame = null) {
      return isCanonicalClassicalNahuatlDerivedVncMachineryFrame(frame, 0, createClassicalNahuatlVncDerivationValidationContext());
    }

    return {
      CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
      CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES,
      normalizeClassicalNahuatlVncDerivationType,
      getClassicalNahuatlVncDerivationTypeVocabulary,
      validateClassicalNahuatlVncDerivationTypeSelection,
      validateClassicalNahuatlVncDerivationTypeControlInventory,
      getClassicalNahuatlKarttunen1992DerivationEvidenceInventory,
      getClassicalNahuatlKarttunen1992DerivationEvidenceMatches,
      resolveClassicalNahuatlAnalyticalVncSourceFrame,
      isClassicalNahuatlAnalyticalVncSourceFrame,
      buildClassicalNahuatlAnalyticalVncDerivationContextFrame,
      isClassicalNahuatlAnalyticalVncDerivationContextFrame,
      isClassicalNahuatlVncDerivationSourceMachineryFrame,
      isClassicalNahuatlVncDerivationBaseSourceMachineryFrame,
      getClassicalNahuatlVncDerivationCanonicalSourceStemRecord,
      buildClassicalNahuatlVncDerivationBoundaryEnvironmentFrame,
      buildClassicalNahuatlVncDerivationSourceAnalysisFrame,
      isClassicalNahuatlVncDerivationSourceAnalysisFrame,
      getClassicalNahuatlVncDerivationOptionInventory,
      isClassicalNahuatlVncDerivationOptionInventory,
      deriveClassicalNahuatlVncDerivationOperationBatchFrame,
      isClassicalNahuatlVncDerivationOperationBatchFrame,
      deriveClassicalNahuatlVncDerivationOperationFrame,
      isClassicalNahuatlVncDerivationOperationFrame,
      buildClassicalNahuatlDerivedVncMachineryFrame,
      isClassicalNahuatlDerivedVncMachineryFrame
    };
}

export function installClassicalNahuatlVncDerivationEvaluatorGlobals(targetObject = globalThis, installationContext = {}) {
    const semanticTarget = Object.create(targetObject);
    Object.defineProperties(semanticTarget, Object.getOwnPropertyDescriptors(
      installationContext?.moduleDependencyCapabilities || {}
    ));
    const api = createClassicalNahuatlVncDerivationEvaluatorApi(semanticTarget);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
