// Canonical typed supplementation grammar for Andrews Lessons 17-19.
//
// Source-span inventory and closure bookkeeping live only in test tooling.
// Runtime authorization comes only from typed nuclear-clause frames and the
// reusable supplementation operations in this module.

const CONTRACT_VERSION = 1;
const SUPPLEMENTATION_OPERATION_KINDS = Object.freeze([
  "relation",
  "vocative",
  "rumored-report",
  "deleted-principal",
  "negative-ac-plural",
  "contextual-first-person-realization",
  "exclamatory-utterance",
  "such-that-adjunction",
]);
const RELATION_OPTION_FIELDS = Object.freeze([
  "referenceMode",
  "headRole",
  "supplementContactRole",
  "order",
  "adjunctor",
  "commentEmphaticCa",
  "fuseDemonstrativeAdjunctor",
  "informationQuestion",
  "integratedAntecessive",
  "includedAntecessiveJump",
  "agreementException",
  "retainContactAlternatives",
  "interveningClauses",
  "principalContinuationFrames",
  "supplementContinuationFrames",
  "principalActsAsStandaloneUtterance",
  "supplementActsAsStandaloneUtterance",
  "principalObjectId",
  "supplementObjectId",
  "wishRealizability",
  "speechDirectness",
  "contextualSilentFirstPerson",
]);
const OPERATION_OPTION_FIELDS = Object.freeze({
  relation: RELATION_OPTION_FIELDS,
  vocative: Object.freeze([
    "discourseSourceContextFrame",
    "glottalVariant",
    "silentPluralIn",
  ]),
  "rumored-report": Object.freeze([
    "mach",
    "fuseQuilMach",
  ]),
  "deleted-principal": Object.freeze([
    "deletionKind",
    "speechDirectness",
    "deletedSupplementationFrame",
  ]),
  "negative-ac-plural": Object.freeze([]),
  "contextual-first-person-realization": Object.freeze([
    "contextualSilentFirstPerson",
  ]),
  "exclamatory-utterance": Object.freeze([
    "personalPronounVariant",
  ]),
  "such-that-adjunction": Object.freeze([]),
});
const FORBIDDEN_REQUEST_AUTHORITY_FIELDS = Object.freeze([
  "formula",
  "formulaRealization",
  "surface",
  "surfaceRealization",
  "lesson",
  "lessonId",
  "lessonNumber",
  "storedAnswer",
  "storedFormula",
  "storedSurface",
]);

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .filter(key => value[key] !== undefined)
      .sort()
      .map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function signValue(value, prefix = "supplementation") {
  const serialized = stableStringify(value);
  let hash = 2166136261;
  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= serialized.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}:${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function freezeDeep(value) {
  if (value && typeof value === "object" && Object.isFrozen(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return Object.freeze(value.map(freezeDeep));
  }
  if (value && typeof value === "object") {
    return Object.freeze(
      Object.fromEntries(
        Object.entries(value).map(([key, child]) => [key, freezeDeep(child)])
      )
    );
  }
  return value;
}

function normalizeToken(value = "") {
  return String(value || "").trim().toLowerCase().replace(/[_\s]+/gu, "-");
}

function normalizeReferenceId(value = "") {
  const normalized = String(value || "").trim();
  return /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u.test(normalized)
    ? normalized
    : "";
}

function normalizeLexicalStem(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{M}+/gu, "")
    .toLowerCase()
    .replace(/[()…*]/gu, "")
    .replace(/[+\s_]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

function clone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function selectOperationOptions(operationKind, options = {}) {
  return Object.fromEntries(
    (OPERATION_OPTION_FIELDS[operationKind] || [])
      .filter(field => Object.hasOwn(options || {}, field))
      .map(field => [field, options[field]])
  );
}

function getNncSlotFrame(frame = null) {
  return (
    frame?.typedSlotFrame
    || frame?.nncSlotFrame
    || frame?.sourceNncSlotFrame
    || frame?.canonicalResult?.nncSlotFrame
    || frame?.selectedOutputLogicFrame?.selectedNncSlotFrame
    || frame?.proofFrame?.conclusion?.nncSlotFrame
    || null
  );
}

function getVncSlotFrame(frame = null) {
  return (
    frame?.finalTypedVncSlotFrame
    || frame?.resultFrame?.finalTypedVncSlotFrame
    || frame?.targetTypedVncSlotFrame
    || frame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
    || frame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame
    || null
  );
}

function getSubjectCategory(slotFrame = null, sourceFrame = null) {
  return String(
    slotFrame?.slots?.subject?.subject
    || slotFrame?.subject
    || slotFrame?.subjectPerson
    || sourceFrame?.subject
    || sourceFrame?.targetSubject
    || sourceFrame?.sourceSubject
    || sourceFrame?.priorVncFrame?.subject
    || sourceFrame?.proofFrame?.conclusion?.subject
    || sourceFrame?.selectedOutputLogicFrame?.selectedSubject
    || ""
  ).trim();
}

function parsePersonNumber(category = "") {
  const normalized = String(category || "").trim();
  const match = /^([123])(?:-|)(sg|pl|common|singular|plural)$/u.exec(normalized);
  if (!match) {
    return null;
  }
  return freezeDeep({
    category: normalized,
    person: match[1],
    number: {
      sg: "singular",
      pl: "plural",
      common: "common",
      singular: "singular",
      plural: "plural",
    }[match[2]],
  });
}

function areClassicalNahuatlPersonNumberFeaturesCompatible(
  leftFeatures = null,
  rightFeatures = null
) {
  const leftPerson = String(leftFeatures?.person || "");
  const rightPerson = String(rightFeatures?.person || "");
  const leftNumber = String(leftFeatures?.number || "");
  const rightNumber = String(rightFeatures?.number || "");
  if (
    !leftPerson
    || !rightPerson
    || !leftNumber
    || !rightNumber
    || leftPerson !== rightPerson
  ) {
    return false;
  }
  if (leftNumber === rightNumber) {
    return true;
  }
  // Andrews §§5.2 and 25.16: a third-person singular pronoun may have
  // nonanimate reference, while common number is the nonanimate value for one
  // or more entities and has the same shape as singular.  Shared reference can
  // therefore identify 3sg with 3common; it may not collapse animate plural
  // or any first/second-person number contrast.
  return leftPerson === "3"
    && new Set([leftNumber, rightNumber]).size === 2
    && [leftNumber, rightNumber].every(
      number => ["singular", "common"].includes(number)
    );
}

function getObjectRecords(frame = null, slotFrame = null) {
  const singleObjectFrame =
    frame?.priorVncFrame?.objectFrame
    || frame?.objectFrame
    || frame?.sourceObjectFrame
    || null;
  const finalClusterCandidates = [
    ...(Array.isArray(frame?.targetObjectClusterFrame?.positions)
      ? frame.targetObjectClusterFrame.positions
      : []),
    ...(Array.isArray(frame?.multipleObjectClusterFrame?.positions)
      ? frame.multipleObjectClusterFrame.positions
      : []),
  ];
  const candidates = finalClusterCandidates.length
    ? finalClusterCandidates
    : [
        ...(Array.isArray(frame?.targetObjectRequests)
          ? frame.targetObjectRequests
          : []),
        ...(Array.isArray(frame?.sourceObjectRequests)
          ? frame.sourceObjectRequests
          : []),
        ...(Array.isArray(slotFrame?.slots?.prePredicate)
          ? slotFrame.slots.prePredicate
              .map(slot => slot?.objectPositionFrame)
              .filter(Boolean)
          : []),
        ...(singleObjectFrame ? [singleObjectFrame] : []),
      ];
  const seen = new Set();
  return candidates
    .map((record, index) => {
      const objectKind = String(
        record?.objectKind || record?.kind || ""
      ).trim();
      const explicitCategory = String(
        record?.objectPerson
        || record?.personCategory
        || record?.person
        || ""
      ).trim();
      const category = explicitCategory
        || (/nonspecific/u.test(objectKind) ? "nonspecific" : "");
      const id = String(
        record?.objectId
        || record?.slotId
        || `object-${index + 1}`
      ).trim();
      return {
        id,
        category,
        features: {
          ...parsePersonNumber(category),
          specificity: /nonspecific|tē|tla/u.test(
            `${category}:${objectKind}:${record?.carrier || ""}`
          )
            ? "nonspecific"
            : "specific",
        },
        objectKind,
        sounded: record?.sounded !== false,
        silent: record?.sounded === false,
        carrier: String(record?.carrier || ""),
      };
    })
    .filter(record => {
      const key = `${record.id}:${record.category}:${record.carrier}`;
      if (!record.category || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function getPossessorRecord(frame = null, slotFrame = null) {
  const stateSlotPossessor = Array.from(
    slotFrame?.slots?.state?.slots || []
  )
    .map(slot => String(
      slot?.possessorPerson || slot?.possessorCategory || ""
    ).trim())
    .find(Boolean) || "";
  const category = String(
    frame?.possessor
    || frame?.possessorCategory
    || slotFrame?.possessor
    || slotFrame?.slots?.state?.possessor
    || stateSlotPossessor
    || slotFrame?.slots?.predicate?.possessor
    || ""
  ).trim();
  return category
    ? {
        id: "possessor",
        category,
        features: parsePersonNumber(category),
      }
    : null;
}

function capitalizeSentence(word = "", punctuation = ".") {
  const normalized = String(word || "").trim();
  return normalized
    ? `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}${punctuation}`
    : "";
}

function embedSentenceSurface(surface = "") {
  const normalized = String(surface || "")
    .trim()
    .replace(/[.?!]$/u, "");
  return normalized
    ? `${normalized.charAt(0).toLowerCase()}${normalized.slice(1)}`
    : "";
}

export function createClassicalNahuatlSupplementationApi(
  targetObject = globalThis
) {
  const issuedPronominalPluralFrames = new WeakSet();
  const issuedNegativeAcPluralFrames = new WeakSet();
  const issuedDiscourseSourceContextFrames = new WeakSet();
  const issuedContextRecords = new WeakSet();
  const issuedAdverbialModifierFrames = new WeakSet();
  const issuedClauseEnvelopes = new WeakSet();
  const clauseEnvelopeSources = new WeakMap();
  const issuedSupplementationFrames = new WeakSet();
  const issuedVocativeFrames = new WeakSet();
  const issuedRumoredReportFrames = new WeakSet();
  const issuedDeletedPrincipalFrames = new WeakSet();
  const issuedOperationRequests = new WeakSet();

  function issueFrame(registry, value) {
    const frame = freezeDeep(value);
    registry.add(frame);
    return frame;
  }

  function buildClassicalNahuatlDiscourseSourceContextFrame(
    request = {}
  ) {
    const {
      speakerGender = "unspecified",
      speakerGroupMembership = "unspecified",
      namedPartnerKnownParticipant = "none",
    } = request || {};
    const allowedFields = new Set([
      "speakerGender",
      "speakerGroupMembership",
      "namedPartnerKnownParticipant",
    ]);
    const unexpectedFields = Object.keys(request || {}).filter(
      field => !allowedFields.has(field)
    );
    const gender = normalizeToken(speakerGender || "unspecified");
    const groupMembership = normalizeToken(
      speakerGroupMembership || "unspecified"
    );
    const knownParticipant = normalizeToken(
      namedPartnerKnownParticipant || "none"
    );
    const authorized = Boolean(
      !unexpectedFields.length
      && ["unspecified", "male", "female"].includes(gender)
      && ["unspecified", "member", "nonmember"].includes(groupMembership)
      && ["none", "speaker", "addressee"].includes(knownParticipant)
    );
    const projection = {
      kind: "classical-nahuatl-discourse-source-context-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : unexpectedFields.length
          ? `unrecognized-discourse-source-context-field:${
              unexpectedFields[0]
            }`
          : "recognized-discourse-source-context-values-required",
      speakerGender: gender,
      speakerGroupMembership: groupMembership,
      namedPartnerKnownParticipant: knownParticipant,
      namedThirdPartyIdentitySource: knownParticipant === "none"
        ? ""
        : "captured-supplement-referent",
      contextualSourceAuthority: true,
      grammarOperationAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      restoredStateAuthority: false,
      lessonMetadataAuthority: false,
    };
    return issueFrame(issuedDiscourseSourceContextFrames, {
      ...projection,
      canonicalSignature: authorized
        ? signValue(projection, "discourse-source-context")
        : "",
    });
  }

  function isClassicalNahuatlDiscourseSourceContextFrame(frame = null) {
    if (
      !issuedDiscourseSourceContextFrames.has(frame)
      || frame?.kind
        !== "classical-nahuatl-discourse-source-context-frame"
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || !["unspecified", "male", "female"].includes(frame.speakerGender)
      || !["unspecified", "member", "nonmember"].includes(
        frame.speakerGroupMembership
      )
      || !["none", "speaker", "addressee"].includes(
        frame.namedPartnerKnownParticipant
      )
      || frame.namedThirdPartyIdentitySource !== (
        frame.namedPartnerKnownParticipant === "none"
          ? ""
          : "captured-supplement-referent"
      )
      || frame.contextualSourceAuthority !== true
      || frame.grammarOperationAuthority !== false
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.restoredStateAuthority !== false
      || frame.lessonMetadataAuthority !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature === signValue(
      projection,
      "discourse-source-context"
    );
  }

  function buildClassicalNahuatlPronominalPluralCooperationFrame(
    principalSourceFrame = null,
    supplementClause = null
  ) {
    const principalAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlVncApplicationFrame
        === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(
        principalSourceFrame
      )
      && principalSourceFrame?.resultFrame?.authorizationStatus
        === "authorized"
      && principalSourceFrame.resultFrame.finalTypedVncSlotFrame
    );
    const supplementAuthorized =
      isClassicalNahuatlSupplementationClauseEnvelope(supplementClause);
    const normalizedPrincipalSubject = principalAuthorized
      ? String(
          principalSourceFrame.normalizedRequest?.subject
          || ""
        ).trim()
      : "";
    const principalFeatures = parsePersonNumber(normalizedPrincipalSubject);
    const supplementSubject = supplementAuthorized
      ? String(supplementClause.subject?.category || "").trim()
      : "";
    const supplementFeatures = parsePersonNumber(supplementSubject);
    const predicateStem = supplementAuthorized
      ? String(supplementClause.sourceStem || "").trim()
      : "";
    const principalSourceStem = principalAuthorized
      ? String(
          principalSourceFrame.normalizedRequest?.sourceStem
          || ""
        ).trim()
      : "";
    const normalizedPrincipalSourceStem = normalizeLexicalStem(
      principalSourceStem
    );
    const compoundStemMembers = {
      "amaquihqueh-compound": "ā-qu-0-i-h",
      "tleh-compound": "tl-e-0-i-h",
      "catleh-compound": "cā-tl-e-0-i-h",
      "catl-zero-root-compound": "cā-tl-0-i-h",
    };
    const compoundRoute = Object.entries(compoundStemMembers).find(
      ([, formulaStemMember]) => (
        normalizeLexicalStem(formulaStemMember)
          === normalizedPrincipalSourceStem
      )
    )?.[0] || "";
    const derivedRoute = supplementAuthorized
      && ["in", "on"].includes(supplementClause.demonstrativeKind)
        ? "demonstrative"
        : supplementAuthorized
          && supplementClause.interrogativeKind === "ac"
            ? "ac"
            : compoundRoute;
    const normalizedRoute = derivedRoute;
    const zeroRootSourceAuthorized = ["demonstrative", "ac"].includes(
      normalizedRoute
    )
      ? normalizedPrincipalSourceStem === "i-a"
      : Boolean(compoundStemMembers[normalizedRoute]);
    const demonstrativeAuthorized = Boolean(
      normalizedRoute === "demonstrative"
      && principalAuthorized
      && supplementAuthorized
      && supplementClause.unitKind === "nnc"
      && principalFeatures?.category === "3pl"
      && supplementFeatures?.category === "3pl"
      && ["in", "on"].includes(supplementClause.demonstrativeKind)
      && zeroRootSourceAuthorized
    );
    const acAuthorized = Boolean(
      normalizedRoute === "ac"
      && principalAuthorized
      && supplementAuthorized
      && supplementClause.unitKind === "nnc"
      && principalFeatures?.number === "plural"
      && supplementFeatures?.category === "3sg"
      && supplementClause.interrogativeKind === "ac"
      && zeroRootSourceAuthorized
    );
    const compoundFormulaStemMember =
      compoundStemMembers[normalizedRoute] || "";
    const compoundSubjectAuthorized = Boolean(
      normalizedRoute === "amaquihqueh-compound"
        ? principalFeatures?.category === "2pl"
        : ["tleh-compound", "catleh-compound"].includes(normalizedRoute)
          ? principalFeatures?.number === "plural"
          : normalizedRoute === "catl-zero-root-compound"
            ? Boolean(principalFeatures)
            : false
    );
    const compoundAuthorized = Boolean(
      compoundFormulaStemMember
      && compoundSubjectAuthorized
      && principalAuthorized
      && normalizedPrincipalSourceStem
        === normalizeLexicalStem(compoundFormulaStemMember)
      && !supplementClause
    );
    const authorized =
      demonstrativeAuthorized || acAuthorized || compoundAuthorized;
    const projection = {
      kind: "classical-nahuatl-pronominal-plural-cooperation-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : "pronominal-plural-cooperation-conditions-not-met",
      sourceSection:
        normalizedRoute === "demonstrative"
          ? "19.2.1"
          : normalizedRoute === "ac"
            ? "19.2.2"
            : "19.2 note",
      route: normalizedRoute,
      principalSubject: normalizedPrincipalSubject,
      cooperatingSubject: normalizedPrincipalSubject,
      supplementSubject,
      predicateStem,
      principalSourceKind: principalAuthorized
        ? principalSourceFrame.kind
        : "",
      principalSourceStem,
      principalSourceFormula: principalAuthorized
        ? String(
            principalSourceFrame.resultFrame?.formulaRealization
            || ""
          )
        : "",
      supplementClauseSignature: supplementAuthorized
        ? supplementClause.canonicalSignature
        : "",
      typedNncSemanticIdentity: supplementClause?.typedSemanticIdentity || "",
      typedVncSemanticIdentity: principalAuthorized
        ? String(
            principalSourceFrame.resultFrame?.finalTypedVncSlotFrame
              ?.semanticIdentity
            || ""
          )
        : "",
      requiredDefectiveIdentity: "defective-nnc-cooperation",
      selectedTypedNncRequired: !compoundFormulaStemMember,
      compoundTypedRouteRequired: Boolean(compoundFormulaStemMember),
      formulaStemMember: compoundFormulaStemMember || "0-i-h",
      zeroRootOperationRequired: true,
      booleanClaimAuthority: false,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      callerRouteAuthority: false,
      routeDerivedFromTypedSource: true,
    };
    return issueFrame(issuedPronominalPluralFrames, {
      ...projection,
      canonicalSignature: authorized
        ? signValue(projection, "pronominal-plural-cooperation")
        : "",
    });
  }

  function hasValidClassicalNahuatlPronominalPluralCooperationProjection(
    frame = null
  ) {
    if (
      frame?.kind !==
        "classical-nahuatl-pronominal-plural-cooperation-frame"
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || ![
        "demonstrative",
        "ac",
        "amaquihqueh-compound",
        "tleh-compound",
        "catleh-compound",
        "catl-zero-root-compound",
      ].includes(frame.route)
      || !frame.principalSubject
      || (
        ["demonstrative", "ac"].includes(frame.route)
          ? (
              !frame.typedNncSemanticIdentity
              || !frame.typedVncSemanticIdentity
              || frame.principalSourceKind
                !== "classical-nahuatl-vnc-application-frame"
              || normalizeLexicalStem(frame.principalSourceStem) !== "i-a"
              || !frame.supplementClauseSignature
              || frame.selectedTypedNncRequired !== true
              || frame.compoundTypedRouteRequired !== false
              || frame.formulaStemMember !== "0-i-h"
            )
          : (
              frame.typedNncSemanticIdentity
              || !frame.typedVncSemanticIdentity
              || frame.principalSourceKind
                !== "classical-nahuatl-vnc-application-frame"
              || normalizeLexicalStem(frame.principalSourceStem)
                !== normalizeLexicalStem(frame.formulaStemMember)
              || frame.supplementClauseSignature
              || frame.selectedTypedNncRequired !== false
              || frame.compoundTypedRouteRequired !== true
              || ![
                "ā-qu-0-i-h",
                "tl-e-0-i-h",
                "cā-tl-e-0-i-h",
                "cā-tl-0-i-h",
              ].includes(frame.formulaStemMember)
            )
      )
      || frame.requiredDefectiveIdentity !== "defective-nnc-cooperation"
      || frame.zeroRootOperationRequired !== true
      || frame.booleanClaimAuthority !== false
      || frame.typedFrameAuthority !== true
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.lessonMetadataAuthority !== false
      || frame.callerRouteAuthority !== false
      || frame.routeDerivedFromTypedSource !== true
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature === signValue(
      projection,
      "pronominal-plural-cooperation"
    );
  }

  function isClassicalNahuatlPronominalPluralCooperationFrame(frame = null) {
    return Boolean(
      issuedPronominalPluralFrames.has(frame)
      && hasValidClassicalNahuatlPronominalPluralCooperationProjection(frame)
    );
  }

  function buildClassicalNahuatlNegativeAcPluralFrame(
    principalClause = null
  ) {
    const sourceFrame = isClassicalNahuatlSupplementationClauseEnvelope(
      principalClause
    )
      ? clauseEnvelopeSources.get(principalClause) || null
      : null;
    const canonicalVncMachineryFrame = Boolean(
      sourceFrame
      && typeof targetObject.isClassicalNahuatlVncApplicationFrame
        === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(sourceFrame)
    )
      ? sourceFrame.resultFrame?.selectedMachineryFrame || null
      : null;
    const normalizedSubject = String(
      principalClause?.subject?.category || ""
    ).trim();
    const subjectFeatures = parsePersonNumber(normalizedSubject);
    const slotFrame = getVncSlotFrame(sourceFrame);
    const plan =
      canonicalVncMachineryFrame?.lesson11ParadigmPlan
      || sourceFrame?.lesson11ParadigmPlan
      || null;
    const sentenceFrame =
      canonicalVncMachineryFrame?.sentenceSurfaceFrame
      || sourceFrame?.sentenceSurfaceFrame
      || null;
    const word = String(
      principalClause?.nuclearSurface
      || principalClause?.surface
      || ""
    ).trim();
    const authorized = Boolean(
      subjectFeatures?.number === "plural"
      && ["1", "2", "3"].includes(subjectFeatures.person)
      && isClassicalNahuatlSupplementationClauseEnvelope(principalClause)
      && principalClause.unitKind === "vnc"
      && sourceFrame?.authorizationStatus === "authorized"
      && (
        !canonicalVncMachineryFrame
        || canonicalVncMachineryFrame.authorizationStatus === "authorized"
        || canonicalVncMachineryFrame.proofFrame?.authorizationStatus
          === "authorized"
      )
      && typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
      && targetObject.isClassicalNahuatlVncSlotFrame(slotFrame)
      && plan?.authorizationStatus === "authorized"
      && plan.identity?.lexemeId === "ā"
      && plan.morphologicalTense === "preterit"
      && plan.contextualInterpretation === "be-absent"
      && sentenceFrame?.authorizationStatus === "authorized"
      && sentenceFrame.negativePrefix === "ah#"
      && sentenceFrame.negativePrefixOutsideVnc === true
      && word
    );
    const vncFormula = authorized
      ? String(
          principalClause.nuclearFormulaRealization
          || principalClause.formulaRealization
          || ""
        ).trim()
      : "";
    const formulaRealization = authorized && vncFormula
      ? `${sentenceFrame.negativePrefix}${vncFormula.startsWith("#")
          ? vncFormula.slice(1)
          : vncFormula}`
      : "";
    const projection = {
      kind: "classical-nahuatl-negative-ac-plural-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : "negative-ac-plural-requires-canonical-plural-a-preterit",
      sourceSection: "19.2.2",
      subject: normalizedSubject,
      semanticTense: "present",
      morphologicalTense: plan?.morphologicalTense || "",
      contextualInterpretation: plan?.contextualInterpretation || "",
      negativePrefix: sentenceFrame?.negativePrefix || "",
      negativePrefixOutsideVnc:
        sentenceFrame?.negativePrefixOutsideVnc === true,
      vncFormula,
      vncWord: authorized ? word : "",
      formulaRealization,
      surfaceRealization: authorized
        ? capitalizeSentence(`ah${word}`)
        : "",
      principalClause,
      projectionsGeneratedIndependently: true,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedSurfaceAccepted: false,
    };
    return issueFrame(issuedNegativeAcPluralFrames, {
      ...projection,
      canonicalSignature: authorized
        ? signValue(projection, "negative-ac-plural")
        : "",
    });
  }

  function isClassicalNahuatlNegativeAcPluralFrame(frame = null) {
    if (
      frame?.kind !== "classical-nahuatl-negative-ac-plural-frame"
      || !issuedNegativeAcPluralFrames.has(frame)
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || !["1pl", "2pl", "3pl"].includes(frame.subject)
      || frame.morphologicalTense !== "preterit"
      || frame.contextualInterpretation !== "be-absent"
      || frame.negativePrefix !== "ah#"
      || frame.negativePrefixOutsideVnc !== true
      || !frame.vncFormula
      || !frame.vncWord
      || !frame.formulaRealization
      || !frame.surfaceRealization
      || frame.projectionsGeneratedIndependently !== true
      || !isClassicalNahuatlSupplementationClauseEnvelope(
        frame.principalClause
      )
      || frame.typedFrameAuthority !== true
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.callerSuppliedSurfaceAccepted !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature
      === signValue(projection, "negative-ac-plural");
  }

  function buildClassicalNahuatlNegativeAcPluralParadigm(
    principalClauses = []
  ) {
    const rows = (Array.isArray(principalClauses) ? principalClauses : [])
      .map(principalClause => {
      const frame = evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "negative-ac-plural",
        principalClause,
      });
      return freezeDeep({
        subject: String(principalClause?.subject?.category || "").trim(),
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        frame,
        formulaRealization: frame.formulaRealization || "",
        surfaceRealization: frame.surfaceRealization,
      });
      });
    const authorizedRows = rows.filter(row => (
      isClassicalNahuatlNegativeAcPluralFrame(row.frame)
    ));
    return freezeDeep({
      kind: "classical-nahuatl-negative-ac-plural-paradigm-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: authorizedRows.length
        ? "authorized"
        : "blocked",
      blockReason: authorizedRows.length
        ? ""
        : "no-authorized-negative-ac-plural-coordinate",
      scalarBuilder: "evaluateClassicalNahuatlSupplementationOperation",
      coordinateCount: rows.length,
      authorizedCoordinateCount: authorizedRows.length,
      rows,
      grammarGenerationAllowed: true,
      surfaceGenerationAllowed: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildClassicalNahuatlSupplementationContextRecord(
    request = {}
  ) {
    const {
      kind = "",
      referenceId = "",
      discourseSourceContextFrame = null,
      groupReferenceId = "",
      namedPartnerReferenceId = "",
      speakerOrAddresseeReferenceId = "",
    } = request || {};
    const normalizedKind = normalizeToken(kind);
    const normalizedReferenceId = normalizeReferenceId(referenceId);
    const normalizedGroupReferenceId = normalizeReferenceId(
      groupReferenceId || referenceId
    );
    const normalizedNamedPartnerReferenceId = normalizeReferenceId(
      namedPartnerReferenceId
    );
    const normalizedSpeakerOrAddresseeReferenceId = normalizeReferenceId(
      speakerOrAddresseeReferenceId
    );
    const allowedKinds = new Set([
      "named-partner",
      "male-bonding",
      "absolute-topic",
    ]);
    const discourseContextRequired = [
      "named-partner",
      "male-bonding",
    ].includes(normalizedKind);
    const allowedFieldsByKind = {
      "named-partner": new Set([
        "kind",
        "referenceId",
        "discourseSourceContextFrame",
        "groupReferenceId",
        "namedPartnerReferenceId",
        "speakerOrAddresseeReferenceId",
      ]),
      "male-bonding": new Set([
        "kind",
        "referenceId",
        "discourseSourceContextFrame",
      ]),
      "absolute-topic": new Set([
        "kind",
        "referenceId",
      ]),
    };
    const unexpectedFields = Object.keys(request || {}).filter(
      field => !allowedFieldsByKind[normalizedKind]?.has(field)
    );
    const discourseContextAuthorized = Boolean(
      !discourseContextRequired
      || isClassicalNahuatlDiscourseSourceContextFrame(
        discourseSourceContextFrame
      )
    );
    const rawContextAuthorityRejected = unexpectedFields.some(field => [
      "speakerGender",
      "speakerIsGroupMember",
      "speakerGroupMembership",
      "namedPartnerKnownParticipant",
    ].includes(field));
    const maleConditionsSatisfied = normalizedKind !== "male-bonding"
      || (
        discourseSourceContextFrame?.speakerGender === "male"
        && discourseSourceContextFrame?.speakerGroupMembership === "member"
      );
    const namedPartnerConditionsSatisfied =
      normalizedKind !== "named-partner"
      || (
        discourseSourceContextFrame?.namedPartnerKnownParticipant
          !== "none"
        && normalizedGroupReferenceId
        && normalizedNamedPartnerReferenceId
        && normalizedSpeakerOrAddresseeReferenceId
        && normalizedNamedPartnerReferenceId
          !== normalizedSpeakerOrAddresseeReferenceId
      );
    const authorized = Boolean(
      allowedKinds.has(normalizedKind)
      && normalizedReferenceId
      && discourseContextAuthorized
      && !unexpectedFields.length
      && !rawContextAuthorityRejected
      && maleConditionsSatisfied
      && namedPartnerConditionsSatisfied
    );
    const projection = {
      kind: "classical-nahuatl-supplementation-context-record",
      version: CONTRACT_VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : !allowedKinds.has(normalizedKind)
          ? "recognized-supplementation-context-kind-required"
          : !normalizedReferenceId
            ? "typed-context-reference-id-required"
            : rawContextAuthorityRejected
              ? "raw-supplementation-context-authority-rejected"
              : unexpectedFields.length
                ? `unrecognized-supplementation-context-field:${
                    unexpectedFields[0]
                  }`
              : !discourseContextAuthorized
                ? "owner-issued-discourse-source-context-required"
                : !maleConditionsSatisfied
                  ? "male-bonding-context-requires-male-group-member"
                  : "named-partner-context-requires-typed-group-members",
      contextKind: normalizedKind,
      referenceId: normalizedReferenceId,
      discourseSourceContextFrame: discourseContextRequired
        ? discourseSourceContextFrame
        : null,
      speakerGender: normalizedKind === "male-bonding"
        ? discourseSourceContextFrame?.speakerGender || ""
        : "",
      speakerIsGroupMember: normalizedKind === "male-bonding"
        ? discourseSourceContextFrame?.speakerGroupMembership === "member"
        : false,
      namedPartnerKnownParticipant: normalizedKind === "named-partner"
        ? discourseSourceContextFrame?.namedPartnerKnownParticipant || ""
        : "",
      groupReferenceId: normalizedKind === "named-partner"
        ? normalizedGroupReferenceId
        : "",
      namedPartnerReferenceId: normalizedKind === "named-partner"
        ? normalizedNamedPartnerReferenceId
        : "",
      speakerOrAddresseeReferenceId: normalizedKind === "named-partner"
        ? normalizedSpeakerOrAddresseeReferenceId
        : "",
      typedFrameAuthority: true,
      booleanClaimAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    };
    return issueFrame(issuedContextRecords, {
      ...projection,
      canonicalSignature: authorized
        ? signValue(projection, "supplementation-context")
        : "",
    });
  }

  function isClassicalNahuatlSupplementationContextRecord(frame = null) {
    if (
      frame?.kind !== "classical-nahuatl-supplementation-context-record"
      || !issuedContextRecords.has(frame)
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || ![
        "named-partner",
        "male-bonding",
        "absolute-topic",
      ].includes(frame.contextKind)
      || !normalizeReferenceId(frame.referenceId)
      || (
        ["named-partner", "male-bonding"].includes(frame.contextKind)
        && !isClassicalNahuatlDiscourseSourceContextFrame(
          frame.discourseSourceContextFrame
        )
      )
      || (
        frame.contextKind === "absolute-topic"
        && (
          frame.discourseSourceContextFrame !== null
          || frame.speakerGender !== ""
          || frame.speakerIsGroupMember !== false
          || frame.namedPartnerKnownParticipant !== ""
          || frame.groupReferenceId !== ""
          || frame.namedPartnerReferenceId !== ""
          || frame.speakerOrAddresseeReferenceId !== ""
        )
      )
      || (
        frame.contextKind === "male-bonding"
        && (
          frame.speakerGender !== "male"
          || frame.speakerIsGroupMember !== true
          || frame.discourseSourceContextFrame.speakerGender !== "male"
          || frame.discourseSourceContextFrame
            .speakerGroupMembership !== "member"
        )
      )
      || (
        frame.contextKind === "named-partner"
        && (
          frame.namedPartnerKnownParticipant
            !== frame.discourseSourceContextFrame
              .namedPartnerKnownParticipant
          || frame.namedPartnerKnownParticipant === "none"
          || !normalizeReferenceId(frame.groupReferenceId)
          || !normalizeReferenceId(frame.namedPartnerReferenceId)
          || !normalizeReferenceId(frame.speakerOrAddresseeReferenceId)
          || frame.namedPartnerReferenceId
            === frame.speakerOrAddresseeReferenceId
        )
      )
      || frame.typedFrameAuthority !== true
      || frame.booleanClaimAuthority !== false
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.lessonMetadataAuthority !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature === signValue(
      projection,
      "supplementation-context"
    );
  }

  function buildClassicalNahuatlSupplementationAdverbialModifierFrame(
    clauseEnvelope = null,
    { adverbialRole = "" } = {}
  ) {
    const normalizedRole = normalizeToken(adverbialRole);
    const authorized = Boolean(
      isClassicalNahuatlSupplementationClauseEnvelope(clauseEnvelope)
      && ["place", "time", "manner", "degree"].includes(normalizedRole)
    );
    const projection = {
      kind:
        "classical-nahuatl-supplementation-adverbial-modifier-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : "typed-adverbial-clause-and-semantic-role-required",
      clause: clauseEnvelope,
      adverbialRole: normalizedRole,
      canModifyCahPrincipal: authorized,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    };
    return issueFrame(issuedAdverbialModifierFrames, {
      ...projection,
      canonicalSignature: authorized
        ? signValue(projection, "supplementation-adverbial-modifier")
        : "",
    });
  }

  function isClassicalNahuatlSupplementationAdverbialModifierFrame(
    frame = null
  ) {
    if (
      frame?.kind !==
        "classical-nahuatl-supplementation-adverbial-modifier-frame"
      || !issuedAdverbialModifierFrames.has(frame)
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || !isClassicalNahuatlSupplementationClauseEnvelope(frame.clause)
      || !["place", "time", "manner", "degree"].includes(frame.adverbialRole)
      || frame.canModifyCahPrincipal !== true
      || frame.typedFrameAuthority !== true
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.lessonMetadataAuthority !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature === signValue(
      projection,
      "supplementation-adverbial-modifier"
    );
  }

  function deriveClauseSemanticGroup(sourceFrame = null, sourceStem = "") {
    const normalizedStem = normalizeLexicalStem(sourceStem);
    const sourceCandidates = [
      normalizedStem,
      normalizeLexicalStem(sourceFrame?.stem),
      normalizeLexicalStem(sourceFrame?.sourceVerbstem),
      normalizeLexicalStem(sourceFrame?.targetStem),
    ].filter(Boolean);
    const matches = (...stems) => sourceCandidates.some(candidate => (
      stems.includes(candidate)
      || stems.some(stem => candidate.endsWith(`-${stem}`))
    ));
    if (matches("nanquilia")) return "speech-action";
    if (matches("ilhuia")) return "saying";
    if (matches("ihtoa", "iht-o-a")) return "speech";
    if (matches("ihtlani", "ih-tlani", "tlani")) return "requesting";
    if (matches("nequi", "el-e-hu-ia", "elehuia")) return "wish";
    if (matches("itta", "caqui")) return "perception";
    if (matches("mati", "il-namiqui", "ilcahua", "il-cahua")) {
      return "cognition";
    }
    if (
      matches(
        "pactia",
        "tlaocoltia",
        "pāquiltia",
        "paquiltia",
        "mauhtia",
        "mauh-tia",
        "cualitta",
        "cual-itta",
        "cocolia",
        "cocoloa",
        "tlatlacoa"
      )
    ) {
      return "affect";
    }
    if (
      matches(
        "chihua",
        "chi-hua",
        "chihualtia",
        "chihuilia",
        "chihua-1-tia"
      )
    ) {
      return "causing";
    }
    return "";
  }

  function getTypedClauseSurface(unitKind, slotFrame, sourceFrame) {
    if (
      unitKind === "nnc"
      && typeof targetObject.buildClassicalNahuatlNncSentenceSurfaceFrame
        === "function"
    ) {
      const result = targetObject.buildClassicalNahuatlNncSentenceSurfaceFrame(
        slotFrame,
        { sentenceType: "assertion", polarity: "positive" }
      );
      if (
        result?.authorizationStatus === "authorized"
        && result.typedSlotAuthority === true
        && result.formulaStringAuthority === false
      ) {
        return String(result.nuclearSurface || "").trim();
      }
    }
    if (
      unitKind === "vnc"
      && typeof targetObject.realizeClassicalNahuatlLesson25TypedVncWord
        === "function"
    ) {
      return String(
        targetObject.realizeClassicalNahuatlLesson25TypedVncWord(slotFrame) || ""
      ).trim();
    }
    return "";
  }

  function getTypedClauseFormula(unitKind, slotFrame) {
    if (
      unitKind === "nnc"
      && typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
      && targetObject.isClassicalNahuatlNncSlotFrame(slotFrame)
      && typeof targetObject.renderClassicalNahuatlNncSlotFrameFormula
        === "function"
    ) {
      return String(
        targetObject.renderClassicalNahuatlNncSlotFrameFormula(slotFrame)
        || ""
      ).trim();
    }
    if (
      unitKind === "vnc"
      && typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
      && targetObject.isClassicalNahuatlVncSlotFrame(slotFrame)
      && typeof targetObject.renderClassicalNahuatlVncSlotFrameFormula
        === "function"
    ) {
      return String(
        targetObject.renderClassicalNahuatlVncSlotFrameFormula(slotFrame)
        || ""
      ).trim();
    }
    return "";
  }

  function joinExternalFormulaPrefix(prefix = "", nuclearFormula = "") {
    const normalizedPrefix = String(prefix || "").trim();
    const normalizedFormula = String(nuclearFormula || "").trim();
    if (!normalizedPrefix || !normalizedFormula) return "";
    return `${normalizedPrefix}${normalizedFormula.startsWith("#")
      ? normalizedFormula.slice(1)
      : normalizedFormula}`;
  }

  function realizeTypedVncExternalBoundary(
    nuclearFormula = "",
    nuclearSurface = "",
    outsidePrefixes = []
  ) {
    const normalizedFormula = String(nuclearFormula || "").trim();
    const normalizedSurface = String(nuclearSurface || "").trim();
    const normalizedPrefixes = Array.from(new Set(
      (Array.isArray(outsidePrefixes) ? outsidePrefixes : [])
        .map(prefix => String(prefix || "").trim().toLowerCase())
        .filter(prefix => ["ah#", "ca#", "ō#"].includes(prefix))
    ));
    if (!normalizedFormula || !normalizedSurface) return null;
    if (!normalizedPrefixes.length) {
      return freezeDeep({
        formulaRealization: normalizedFormula,
        surfaceRealization: normalizedSurface,
        outsidePrefixes: [],
        projectionsGeneratedIndependently: true,
      });
    }
    const orderedPrefixes = [
      normalizedPrefixes.includes("ca#")
        ? "ca#"
        : normalizedPrefixes.includes("ah#")
          ? "ah#"
          : "",
      normalizedPrefixes.includes("ō#") ? "ō#" : "",
    ].filter(Boolean);
    const orderedFormulaPrefix = orderedPrefixes.join("");
    const orderedSurfacePrefix = orderedPrefixes.map(prefix => ({
      "ō#": "ō",
      "ca#": "ca",
      "ah#": "ah",
    })[prefix] || "").join("");
    const boundaryNuclearFormula = orderedFormulaPrefix
      && normalizedFormula.toLowerCase().startsWith(orderedFormulaPrefix)
      ? `#${normalizedFormula.slice(orderedFormulaPrefix.length)}`
      : normalizedFormula;
    const boundaryNuclearWritten = orderedSurfacePrefix
      && normalizedSurface.toLocaleLowerCase("en-US")
        .startsWith(orderedSurfacePrefix)
      ? normalizedSurface.slice(orderedSurfacePrefix.length)
      : normalizedSurface;
    const sentenceBoundaryFrame = freezeDeep({
      kind: "classical-nahuatl-supplementation-vnc-boundary-source-frame",
      sentenceSurfaceApplies: true,
      sentenceParticles: [],
      sentencePrefixalStack: normalizedPrefixes,
      finalPunctuation: "",
      typedPrefixAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    const formulaRealization =
      typeof targetObject.buildClassicalNahuatlVncSentenceFormulaRealization
        === "function"
        ? String(
            targetObject.buildClassicalNahuatlVncSentenceFormulaRealization(
              sentenceBoundaryFrame,
              boundaryNuclearFormula
            ) || ""
          ).trim()
        : `${orderedPrefixes.join("")}${boundaryNuclearFormula.startsWith("#")
          ? boundaryNuclearFormula.slice(1)
          : boundaryNuclearFormula}`;
    const generatedSurface =
      typeof targetObject.buildClassicalNahuatlVncSentenceSurfaceRealization
        === "function"
        ? String(
            targetObject.buildClassicalNahuatlVncSentenceSurfaceRealization(
              sentenceBoundaryFrame,
              boundaryNuclearWritten
            ) || ""
          ).trim()
        : `${
            orderedPrefixes.map(prefix => ({
              "ō#": "ō",
              "ca#": "ca",
              "ah#": "ah",
            })[prefix] || "").join("")
          }${boundaryNuclearWritten}`;
    const surfaceRealization = embedSentenceSurface(generatedSurface);
    return formulaRealization && surfaceRealization
      ? freezeDeep({
          formulaRealization,
          surfaceRealization,
          outsidePrefixes: normalizedPrefixes,
          projectionsGeneratedIndependently: true,
        })
      : null;
  }

  function realizeNegativeRelationalNncBoundary(
    formulaRealization = "",
    surface = ""
  ) {
    const normalizedFormula = String(formulaRealization || "").trim();
    const normalizedSurface = String(surface || "").trim();
    if (!normalizedFormula || !normalizedSurface) {
      return null;
    }
    const vowelInitial = /^[āēīōaeio]/u.test(normalizedSurface);
    const initialLongI = normalizedSurface.startsWith("ī");
    const glottalToYFrame = initialLongI
      && typeof targetObject
        .buildClassicalNahuatlConsonantPhoneShiftFrame === "function"
      ? targetObject.buildClassicalNahuatlConsonantPhoneShiftFrame({
          sourceConsonant: "glottal",
          followingVowel: "i",
          grammaticalConstruction: true,
        })
      : null;
    const intervocalicYLossFrame = initialLongI
      && typeof targetObject
        .buildClassicalNahuatlConsonantPhoneShiftFrame === "function"
      ? targetObject.buildClassicalNahuatlConsonantPhoneShiftFrame({
          sourceConsonant: "glottal",
          followingVowel: "i",
          position: "intervocalic",
          intervocalicYDisappears: true,
          grammaticalConstruction: true,
        })
      : null;
    if (
      vowelInitial
      && (
        !initialLongI
        || glottalToYFrame?.authorizationStatus !== "authorized"
        || intervocalicYLossFrame?.authorizationStatus !== "authorized"
      )
    ) {
      return null;
    }
    return freezeDeep({
      kind:
        "classical-nahuatl-negative-relational-nnc-boundary-frame",
      sourceSection: "2.13.1",
      authorizationStatus: "authorized",
      negativePrefix: "ah#",
      nuclearFormula: normalizedFormula,
      nuclearSurface: normalizedSurface,
      formulaRealization: joinExternalFormulaPrefix(
        "ah#",
        normalizedFormula
      ),
      surfaceRealization: initialLongI
        ? `a${normalizedSurface}`
        : `ah${normalizedSurface}`,
      glottalToYFrame,
      intervocalicYLossFrame,
      formulaBoundaryPreserved: true,
      writtenBoundaryContextualized: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildClassicalNahuatlSupplementationClauseEnvelope(
    sourceFrame = null,
    {
      referenceId = "",
      subjectReferenceId = "",
      objectReferenceId = "",
      objectReferenceIds = {},
      possessorReferenceId = "",
      sourceStem = "",
      semanticGroup = "",
      shortPronominal = false,
      collectiveReference = false,
      namedPartnerEligible = false,
      maleBondingStem = false,
      demonstrativeKind = "",
      interrogativeKind = "",
      silentObjectKind = "",
      antecessiveOrder = false,
      contextRecords = [],
      mood = "",
      tense = "",
      sentenceKind = "assertion",
    } = {}
  ) {
    const nncSlotFrame = getNncSlotFrame(sourceFrame);
    const vncApplicationResultAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlVncApplicationFrame
        === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(sourceFrame)
    );
    const lateVncClosureAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlClosureFrame === "function"
      && targetObject.isClassicalNahuatlClosureFrame(sourceFrame)
      && sourceFrame?.authorizationStatus === "authorized"
    );
    const vncApplicationResultFrame = vncApplicationResultAuthorized
      ? sourceFrame.resultFrame
      : null;
    const canonicalVncMachineryFrame = lateVncClosureAuthorized
      ? sourceFrame.selectedMachineryFrame || null
      : vncApplicationResultAuthorized
        ? vncApplicationResultFrame?.selectedMachineryFrame || null
        : null;
    const vncSlotFrame = getVncSlotFrame(sourceFrame)
      || vncApplicationResultFrame?.finalTypedVncSlotFrame
      || null;
    const pronominalNncResultAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlPronominalNncResult
        === "function"
      && targetObject.isClassicalNahuatlPronominalNncResult(sourceFrame)
    );
    const ordinaryNncResultAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlOrdinaryNncResult === "function"
      && targetObject.isClassicalNahuatlOrdinaryNncResult(sourceFrame)
    );
    const deverbalNncResultAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlDeverbalNncGrammarFrame
        === "function"
      && targetObject.isClassicalNahuatlDeverbalNncGrammarFrame(sourceFrame)
      && ["predicate-nominalization", "deverbal-action"].includes(
        sourceFrame?.constructionKind
      )
      && sourceFrame?.canonicalResult?.nncSlotFrame
    );
    const relationalNncResultAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlRelationalResult
        === "function"
      && targetObject.isClassicalNahuatlRelationalResult(
        sourceFrame
      )
      && sourceFrame?.clauseKind === "nominal-nuclear-clause"
    );
    const adverbialNuclearResultAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlAdverbialNuclearResult
        === "function"
      && targetObject.isClassicalNahuatlAdverbialNuclearResult(sourceFrame)
      && sourceFrame.scope === "external-clause"
    );
    const adverbialNncResultAuthorized = Boolean(
      adverbialNuclearResultAuthorized
      && /^nnc-/u.test(sourceFrame.sourceFrame?.clauseKind || "")
    );
    const adverbialVncResultAuthorized = Boolean(
      adverbialNuclearResultAuthorized
      && sourceFrame.sourceFrame?.clauseKind === "vnc"
    );
    const completedNncResultAuthorized =
      pronominalNncResultAuthorized || ordinaryNncResultAuthorized;
    const nncAuthorized = Boolean(
      relationalNncResultAuthorized
      || (
        nncSlotFrame
        && sourceFrame?.authorizationStatus === "authorized"
        && typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
        && targetObject.isClassicalNahuatlNncSlotFrame(nncSlotFrame)
      )
    );
    const vncAuthorized = Boolean(
      (vncApplicationResultAuthorized || lateVncClosureAuthorized)
      && vncSlotFrame
      && typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
      && targetObject.isClassicalNahuatlVncSlotFrame(vncSlotFrame)
    );
    const particleAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlParticleResultFrame
        === "function"
      && targetObject.isClassicalNahuatlParticleResultFrame(sourceFrame)
    );
    const unitKind = nncAuthorized || adverbialNncResultAuthorized
      ? "nnc"
      : vncAuthorized || adverbialVncResultAuthorized
        ? "vnc"
        : particleAuthorized
          ? "particle"
          : "";
    const slotFrame = nncSlotFrame || vncSlotFrame;
    let canonicalVncFiniteSurfaceFrame = lateVncClosureAuthorized
      ? sourceFrame.finiteSurfaceFrame || null
      : vncApplicationResultFrame?.finiteSurfaceFrame || null;
    if (
      canonicalVncFiniteSurfaceFrame
      && (
        typeof targetObject.isClassicalNahuatlVncFiniteSurfaceFrame
          !== "function"
        || !targetObject.isClassicalNahuatlVncFiniteSurfaceFrame(
          canonicalVncFiniteSurfaceFrame
        )
      )
    ) {
      canonicalVncFiniteSurfaceFrame = null;
    }
    const relationalPolarityFrame = relationalNncResultAuthorized
      && sourceFrame.sourceFrame?.negative === true
      ? realizeNegativeRelationalNncBoundary(
          sourceFrame.formula,
          sourceFrame.surface
        )
      : null;
    const canonicalSourceStem = String(
      sourceFrame?.selectedOutputLogicFrame?.outputFillers
        ?.lesson11SelectedStem
      || (
        completedNncResultAuthorized
          ? sourceFrame?.sourceFrame?.stem
          : ""
      )
      || (
        adverbialNuclearResultAuthorized
          ? sourceFrame?.sourceFrame?.stem
          : ""
      )
      || (
        relationalNncResultAuthorized
          ? sourceFrame?.predicateStem
          : ""
      )
      || (
        deverbalNncResultAuthorized
          ? sourceFrame?.operationFrame?.targetStems?.restrictedUse
          : ""
      )
      || sourceFrame?.targetStem
      || sourceFrame?.operationFrame?.targetStem
      || sourceFrame?.sourceVerbstem
      || sourceFrame?.stem
      || (
        vncApplicationResultAuthorized
          ? sourceFrame.normalizedRequest?.sourceStem
            || canonicalVncMachineryFrame?.targetStem
            || canonicalVncMachineryFrame?.sourceVerbstem
            || canonicalVncMachineryFrame?.stem
          : ""
      )
      || slotFrame?.slots?.predicate?.stem
      || ""
    ).trim();
    const callerSourceStem = String(sourceStem || "").trim();
    const normalizedReferenceId = normalizeReferenceId(referenceId);
    const normalizedSubjectReferenceId = normalizeReferenceId(
      subjectReferenceId || referenceId
    );
    const validatedContextRecords = (
      Array.isArray(contextRecords) ? contextRecords : []
    ).filter(isClassicalNahuatlSupplementationContextRecord);
    const hasContext = kind => validatedContextRecords.some(record => (
      record.contextKind === kind
      && record.referenceId === normalizedReferenceId
    ));
    const namedPartnerContext = validatedContextRecords.find(record => (
      record.contextKind === "named-partner"
      && record.namedPartnerReferenceId === normalizedReferenceId
    )) || null;
    const completedNncSentenceSurface = completedNncResultAuthorized
      ? String(
          sourceFrame.surfaceRealization
          || sourceFrame.wordSurface
          || sourceFrame.sentenceSurface
          || ""
        ).trim().replace(/[.?!]+$/u, "")
      : "";
    const nuclearSurface = particleAuthorized
      ? String(sourceFrame.surface || "").trim()
      : relationalNncResultAuthorized
        ? String(
            relationalPolarityFrame?.surfaceRealization
            || sourceFrame.surface
            || ""
          ).trim()
      : deverbalNncResultAuthorized
        ? String(sourceFrame.wordSurface || "").trim()
      : adverbialNuclearResultAuthorized
        ? String(sourceFrame.wordSurface || "").trim()
      : completedNncResultAuthorized
        ? completedNncSentenceSurface
      : lateVncClosureAuthorized
        ? String(
            sourceFrame.surfaceRealization
            || canonicalVncFiniteSurfaceFrame?.wordRealization
            || ""
          ).trim()
      : vncAuthorized && canonicalVncFiniteSurfaceFrame
        ? String(
            canonicalVncFiniteSurfaceFrame.wordRealization || ""
          ).trim()
      : unitKind
        ? getTypedClauseSurface(unitKind, slotFrame, sourceFrame)
        : "";
    const completedNncSentenceFormula = completedNncResultAuthorized
      ? String(
          sourceFrame.sentenceFrame?.sentenceFormulaDisplay
          || sourceFrame.formulaRealization
          || ""
        ).trim().replace(/[.?!]+$/u, "")
      : "";
    const nuclearFormulaRealization = particleAuthorized
      ? String(
          sourceFrame.formula
          || sourceFrame.formulaRecord?.formula
          || ""
        ).trim()
      : relationalNncResultAuthorized
        ? String(
            relationalPolarityFrame?.formulaRealization
            || sourceFrame.formula
            || ""
          ).trim()
      : deverbalNncResultAuthorized
        ? String(sourceFrame.formulaRealization || "").trim()
      : adverbialNuclearResultAuthorized
        ? String(sourceFrame.formulaRealization || "").trim()
      : completedNncResultAuthorized
        ? completedNncSentenceFormula
      : lateVncClosureAuthorized
        ? String(
            sourceFrame.formulaRealization
            || canonicalVncFiniteSurfaceFrame?.formulaRealization
            || ""
          ).trim()
      : unitKind
        ? getTypedClauseFormula(unitKind, slotFrame)
        : "";
    const canonicalVncOutsidePrefixes = unitKind === "vnc"
      ? Array.from(new Set([
          ...Array.from(
          sourceFrame?.expandedVncBoundaryFrame?.outsidePrefixes
          || sourceFrame?.proofFrame?.conclusion
            ?.expandedVncBoundaryFrame?.outsidePrefixes
          || sourceFrame?.proofFrame?.conclusion?.outsidePrefixes
          || sourceFrame?.sentenceSurfaceFrame?.sentencePrefixalStack
          || sourceFrame?.proofFrame?.conclusion?.sentenceSurfaceFrame
            ?.sentencePrefixalStack
          || (
            vncApplicationResultAuthorized
              ? sourceFrame.normalizedRequest?.sentenceOptions
                ?.outsidePrefixes
              : null
          )
          || []
          ),
          ...(
            vncApplicationResultAuthorized
            && sourceFrame.normalizedRequest?.sentenceOptions?.antecessive
              === true
              ? ["ō#"]
              : []
          ),
        ])).map(prefix => String(prefix || "").trim().toLowerCase())
          .filter(prefix => ["ah#", "ca#", "ō#"].includes(prefix))
      : [];
    const typedVncBoundaryProjection = unitKind === "vnc"
      ? realizeTypedVncExternalBoundary(
          nuclearFormulaRealization,
          nuclearSurface,
          canonicalVncOutsidePrefixes
        )
      : null;
    const typedVncBoundaryWithoutAntecessive = unitKind === "vnc"
      ? realizeTypedVncExternalBoundary(
          nuclearFormulaRealization,
          nuclearSurface,
          canonicalVncOutsidePrefixes.filter(prefix => prefix !== "ō#")
        )
      : null;
    const formulaRealization = unitKind === "vnc"
      ? typedVncBoundaryProjection?.formulaRealization || ""
      : nuclearFormulaRealization;
    const surface = unitKind === "vnc"
      ? typedVncBoundaryProjection?.surfaceRealization || ""
      : nuclearSurface;
    const adverbialSubjectSlots =
      sourceFrame?.operationFrame?.subjectOperationFrame
        ?.resultSubjectSlots || null;
    const adverbialPers1 = normalizeToken(adverbialSubjectSlots?.pers1)
      .replace(/ø/gu, "0");
    const adverbialPers2 = normalizeToken(adverbialSubjectSlots?.pers2)
      .replace(/ø/gu, "0");
    const adverbialSubjectCategory = !adverbialNuclearResultAuthorized
      ? ""
      : ["n", "ni"].includes(adverbialPers1)
        ? "1sg"
        : ["am", "an"].includes(adverbialPers1)
          ? "2pl"
          : ["t", "ti"].includes(adverbialPers1)
            ? "2sg"
            : ["0", "⎕"].includes(adverbialPers1)
              && ["0", "⎕"].includes(adverbialPers2)
              ? "3sg"
              : "";
    const subjectCategory = particleAuthorized
      ? ""
      : relationalNncResultAuthorized
        ? String(sourceFrame.sourceFrame?.subjectId || "3common").trim()
      : adverbialNuclearResultAuthorized
        ? adverbialSubjectCategory
      : vncApplicationResultAuthorized || lateVncClosureAuthorized
        ? String(sourceFrame.normalizedRequest?.subject || "").trim()
      : getSubjectCategory(slotFrame, sourceFrame);
    const selectedVoiceOperation = normalizeToken(
      sourceFrame?.selectedVoiceOperation
      || sourceFrame?.controlFrame?.selectedVoiceOperation
      || sourceFrame?.voice
      || sourceFrame?.selectedMachineryFrame?.voice
      || canonicalVncMachineryFrame?.voice
      || ""
    );
    const subjectSpecificity = [
      "impersonal",
      "inherent-impersonal",
      "tla-impersonal",
    ].includes(selectedVoiceOperation)
      ? "nonspecific"
      : "specific";
    const normalizedSilentObjectKind = normalizeToken(silentObjectKind);
    const ownerIssuedSilentSpecificObject = Boolean(
      sourceFrame?.normalizedRequest?.silentSpecificObject === true
      || canonicalVncMachineryFrame?.normalizedRequest
        ?.silentSpecificObject === true
      || sourceFrame?.resultFrame?.normalizedRequest
        ?.silentSpecificObject === true
    );
    const silentAyiRequested = Boolean(
      normalizedSilentObjectKind === "ayi-specific-object"
      || ownerIssuedSilentSpecificObject
    );
    const sourcePerfectiveStem = String(
      sourceFrame?.perfectiveStem
      || (
        vncApplicationResultAuthorized
          ? canonicalVncMachineryFrame?.perfectiveStem
          : ""
      )
      || canonicalVncMachineryFrame?.selectedOutputLogicFrame?.outputFillers
        ?.classBAnalyzedPerfectiveStem
      || canonicalVncMachineryFrame?.selectedOutputLogicFrame?.outputFillers
        ?.traditionalSpellingPerfectiveStem
      || sourceFrame?.selectedOutputLogicFrame?.outputFillers
        ?.classBAnalyzedPerfectiveStem
      || sourceFrame?.selectedOutputLogicFrame?.outputFillers
        ?.traditionalSpellingPerfectiveStem
      || ""
    ).trim();
    const directionalPrefix = normalizeToken(
      sourceFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame
        ?.directionalPrefix
      || sourceFrame?.expandedVncBoundaryFrame?.directionalPrefix
      || sourceFrame?.proofFrame?.conclusion?.directionalPrefix
      || canonicalVncMachineryFrame?.proofFrame?.conclusion
        ?.finalBoundaryRealizationFrame?.directionalPrefix
      || canonicalVncMachineryFrame?.expandedVncBoundaryFrame
        ?.directionalPrefix
      || canonicalVncMachineryFrame?.proofFrame?.conclusion
        ?.directionalPrefix
      || ""
    );
    const canonicalMood = normalizeToken(
      sourceFrame?.lesson11ParadigmPlan?.requestedMood
      || canonicalVncMachineryFrame?.lesson11ParadigmPlan?.requestedMood
      || (
        vncApplicationResultAuthorized || lateVncClosureAuthorized
          ? sourceFrame.normalizedRequest?.mood
          : ""
      )
      || sourceFrame?.lesson11VncApplicationFrame?.plan?.requestedMood
      || sourceFrame?.proofFrame?.conclusion?.lesson11ParadigmPlan
        ?.requestedMood
      || sourceFrame?.priorVncFrame?.mood
      || sourceFrame?.mood
      || ""
    );
    const canonicalTense = normalizeToken(
      sourceFrame?.selectedOutputLogicFrame?.outputFillers
        ?.lesson11RequestedSemanticTense
      || canonicalVncMachineryFrame?.selectedOutputLogicFrame?.outputFillers
        ?.lesson11RequestedSemanticTense
      || (
        vncApplicationResultAuthorized || lateVncClosureAuthorized
          ? sourceFrame.normalizedRequest?.tense
          : ""
      )
      || sourceFrame?.lesson11ParadigmPlan?.requestedSemanticTense
      || sourceFrame?.lesson11VncApplicationFrame?.plan
        ?.requestedSemanticTense
      || sourceFrame?.proofFrame?.conclusion
        ?.lesson11RequestedSemanticTense
      || sourceFrame?.priorVncFrame?.tense
      || sourceFrame?.tense
      || ""
    );
    const sourceSentenceFrame =
      sourceFrame?.sentenceSurfaceFrame
      || sourceFrame?.proofFrame?.conclusion?.sentenceSurfaceFrame
      || canonicalVncMachineryFrame?.sentenceSurfaceFrame
      || canonicalVncMachineryFrame?.proofFrame?.conclusion
        ?.sentenceSurfaceFrame
      || null;
    const sourceSentenceType = normalizeToken(
      sourceSentenceFrame?.sentenceType || ""
    );
    const sourceSentenceRole = normalizeToken(
      sourceSentenceFrame?.canvasSentenceRole || ""
    );
    const canonicalSentenceKind = sourceSentenceFrame?.questionMode
      || sourceSentenceType === "yes-no-question"
      ? "question"
      : ["command-sentence", "exhortation-sentence"].includes(
          sourceSentenceType
        )
        || [
          "direct-command",
          "indirect-command",
          "exhortation",
          "command-or-exhortation",
        ].includes(sourceSentenceRole)
        ? "command"
      : ["exclamation", "exclamatory-utterance"].includes(
          sourceSentenceType
        )
        ? "exclamation"
      : sourceSentenceType === "wish-sentence"
        || sourceSentenceRole === "wish"
        || canonicalMood === "optative"
        ? "wish"
        : ["admonitive", "imperative"].includes(canonicalMood)
          ? "command"
          : "assertion";
    const normalizedCanonicalSourceStem = normalizeLexicalStem(
      canonicalSourceStem
    );
    const lexicalCollectiveReference = [
      "moch",
      "mochi",
    ].some(stem => (
      normalizedCanonicalSourceStem === stem
      || normalizedCanonicalSourceStem.endsWith(`-${stem}`)
    ));
    const canonicalAntecessiveOrder =
      canonicalVncOutsidePrefixes.includes("ō#");
    const silentAyiLicensed = Boolean(
      silentAyiRequested
      && unitKind === "vnc"
      && /(?:^|-)(?:āyi|ayi)$/u.test(canonicalSourceStem)
      && sourcePerfectiveStem === "āx"
    );
    const canonicalVncSelectedObjectClusterPresent = Boolean(
      canonicalVncMachineryFrame?.targetObjectClusterFrame
        ?.positions?.length
      || canonicalVncMachineryFrame?.multipleObjectClusterFrame
        ?.positions?.length
      || canonicalVncMachineryFrame?.targetObjectRequests?.length
    );
    const canonicalVncObjectSource = vncApplicationResultAuthorized
      ? canonicalVncSelectedObjectClusterPresent
        ? canonicalVncMachineryFrame
        : sourceFrame.normalizedRequest
      : lateVncClosureAuthorized
        ? canonicalVncMachineryFrame || sourceFrame
      : sourceFrame;
    const canonicalObjects = unitKind === "vnc"
      ? getObjectRecords(
          canonicalVncObjectSource,
          slotFrame
        ).map(object => ({
          ...object,
          referenceId: normalizeReferenceId(
            objectReferenceIds?.[object.id]
            || objectReferenceId
            || referenceId
          ),
        }))
      : [];
    const objects = unitKind === "vnc"
      ? canonicalObjects.concat(
          silentAyiLicensed
            && canonicalObjects.length === 0
            ? [{
                id: "silent-specific-object",
                category: "3sg",
                features: parsePersonNumber("3sg"),
                referenceId: normalizeReferenceId(
                  objectReferenceIds?.["silent-specific-object"]
                  || objectReferenceId
                  || referenceId
                ),
                realization: "0-0",
                silent: true,
                sourceSection: "18.8",
              }]
            : []
        )
      : [];
    const possessor = unitKind === "nnc"
      ? (() => {
          const record = getPossessorRecord(sourceFrame, slotFrame);
          return record
            ? {
                ...record,
                referenceId: normalizeReferenceId(
                  possessorReferenceId || referenceId
                ),
              }
            : null;
        })()
      : null;
    const authorized = Boolean(
      unitKind
      && surface
      && formulaRealization
      && (particleAuthorized || subjectCategory)
      && normalizedReferenceId
      && normalizedSubjectReferenceId
      && objects.every(object => object.referenceId)
      && (!possessor || possessor.referenceId)
      && (!silentAyiRequested || silentAyiLicensed)
      && (
        !relationalNncResultAuthorized
        || sourceFrame.sourceFrame?.negative !== true
        || relationalPolarityFrame?.authorizationStatus === "authorized"
      )
    );
    const projection = {
      kind: "classical-nahuatl-supplementation-clause-envelope",
      version: CONTRACT_VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : !unitKind
          ? "authorized-canonical-nuclear-clause-required"
          : !surface
            ? "typed-nuclear-clause-surface-unavailable"
            : !formulaRealization
              ? "typed-nuclear-clause-formula-unavailable"
            : !particleAuthorized && !subjectCategory
              ? "typed-subject-category-required"
              : relationalNncResultAuthorized
                && sourceFrame.sourceFrame?.negative === true
                && relationalPolarityFrame?.authorizationStatus
                  !== "authorized"
                ? "negative-relational-nnc-boundary-realization-unavailable"
              : silentAyiRequested && !silentAyiLicensed
                ? "ayi-silent-object-requires-typed-ayi-vnc"
              : "typed-participant-reference-ids-required",
      unitKind,
      particleId: particleAuthorized ? sourceFrame.particleId : "",
      semanticMarker: particleAuthorized ? sourceFrame.semanticMarker : "",
      particlePlacementScope: particleAuthorized
        ? String(
            sourceFrame.grammarFrame?.unitFrame?.placementScope || ""
          ).trim()
        : "",
      formulaSegments: particleAuthorized
        ? Array.from(sourceFrame.formulaSegments || [])
        : [],
      contextualRealizationFrame: particleAuthorized
        ? sourceFrame.contextualRealizationFrame
        : null,
      sourceFrameKind: String(sourceFrame?.kind || ""),
      lateVncOperation: lateVncClosureAuthorized
        ? normalizeToken(sourceFrame.operationFrame?.operation)
        : "",
      lateVncVariant: lateVncClosureAuthorized
        ? normalizeToken(sourceFrame.operationFrame?.variant)
        : "",
      lateVncRuleFamily: lateVncClosureAuthorized
        ? normalizeToken(sourceFrame.operationFrame?.ruleFamily)
        : "",
      lateVncEmbedStem: lateVncClosureAuthorized
        ? String(
            sourceFrame.operationFrame?.operationFacts?.embedStem || ""
          ).trim()
        : "",
      lateVncMatrixStem: lateVncClosureAuthorized
        ? String(
            sourceFrame.operationFrame?.operationFacts?.matrixStem || ""
          ).trim()
        : "",
      lateVncConnective: lateVncClosureAuthorized
        ? String(
            sourceFrame.operationFrame?.operationFacts?.connective || ""
          ).trim()
        : "",
      sourceCanonicalSignature: String(sourceFrame?.canonicalSignature || ""),
      vncBoundaryRealizationFrame: unitKind === "vnc"
        ? canonicalVncFiniteSurfaceFrame
        : null,
      typedSemanticIdentity: String(
        slotFrame?.semanticIdentity
        || (
          relationalNncResultAuthorized
            ? sourceFrame.formulaProjection?.result
            : ""
        )
        || (
          adverbialNuclearResultAuthorized
            ? sourceFrame.selectedResultId
            : ""
        )
        || ""
      ),
      referenceId: normalizedReferenceId,
      subject: particleAuthorized
        ? null
        : {
            id: "subject",
            category: subjectCategory,
            features: {
              ...parsePersonNumber(subjectCategory),
              specificity: subjectSpecificity,
            },
            referenceId: normalizedSubjectReferenceId,
          },
      objects,
      possessor,
      sourceStem: canonicalSourceStem,
      callerSourceStem,
      callerSourceStemMatchesCanonical:
        !callerSourceStem || callerSourceStem === canonicalSourceStem,
      callerSourceStemAuthority: false,
      sourcePerfectiveStem,
      directionalPrefix,
      semanticGroup: deriveClauseSemanticGroup(
        sourceFrame,
        canonicalSourceStem
      ),
      callerSemanticGroup: normalizeToken(semanticGroup),
      callerSemanticGroupAuthority: false,
      sentenceKind: canonicalSentenceKind,
      polarity: normalizeToken(
        completedNncResultAuthorized
          ? sourceFrame.operationFrame?.polarity
            || sourceFrame.sentenceFrame?.polarity
            || "positive"
          : relationalNncResultAuthorized
            ? sourceFrame.sourceFrame?.negative === true
              ? "negative"
              : "positive"
          : vncApplicationResultAuthorized || lateVncClosureAuthorized
            ? sourceFrame.normalizedRequest?.sentenceOptions?.negative === true
              ? "negative"
              : "positive"
            : sourceFrame?.polarity || "positive"
      ) || "positive",
      mood: canonicalMood,
      tense: canonicalTense,
      shortPronominal: nncSlotFrame?.pronominalSubtype === "personal-simple",
      collectiveReference: lexicalCollectiveReference,
      namedPartnerEligible: Boolean(namedPartnerContext),
      maleBondingStem: Boolean(
        normalizeLexicalStem(nncSlotFrame?.slots?.predicate?.stem) === "oquich"
        && hasContext("male-bonding")
      ),
      demonstrativeKind: ["in", "on"].includes(
        normalizeLexicalStem(nncSlotFrame?.slots?.predicate?.stem)
      )
        ? normalizeLexicalStem(nncSlotFrame?.slots?.predicate?.stem)
        : "",
      interrogativeKind:
        nncSlotFrame?.pronominalSubtypeDetail === "what-person"
          ? "ac"
          : nncSlotFrame?.pronominalSubtypeDetail === "what-entity"
            ? "tleh"
            : ["ac", "tleh", "catleh"].includes(
                normalizeLexicalStem(nncSlotFrame?.slots?.predicate?.stem)
              )
              ? normalizeLexicalStem(nncSlotFrame?.slots?.predicate?.stem)
              : "",
      silentObjectKind: normalizedSilentObjectKind,
      silentSpecificObjectAuthorized: silentAyiLicensed,
      antecessiveOrder: canonicalAntecessiveOrder,
      absoluteTopic: hasContext("absolute-topic"),
      personDyad: unitKind === "vnc"
        ? {
            pers1: String(slotFrame?.slots?.subject?.pers1 || ""),
            pers2: String(slotFrame?.slots?.subject?.pers2 || ""),
          }
        : null,
      numberDyad: unitKind === "vnc"
        ? {
            num1: String(slotFrame?.slots?.number?.num1 || ""),
            num2: String(slotFrame?.slots?.number?.num2 || ""),
          }
        : null,
      adverbialRole: (() => {
        const explicitRole = normalizeToken(
          sourceFrame?.adverbialRole
          || sourceFrame?.grammarFrame?.unitFrame?.adverbialRole
          || ""
        );
        if (["place", "time", "manner", "degree"].includes(explicitRole)) {
          return explicitRole;
        }
        const semanticDomain = normalizeToken(
          sourceFrame?.operationFrame?.semanticDomain
          || sourceFrame?.lexicalAuthorizationFrame?.semanticDomain
          || ""
        );
        if (["location", "direction"].includes(semanticDomain)) return "place";
        if (["time", "duration"].includes(semanticDomain)) return "time";
        if (["manner", "degree"].includes(semanticDomain)) return semanticDomain;
        return relationalNncResultAuthorized
          && sourceFrame.sourceFrame?.subjectMode === "adverbialized"
          ? "place"
          : "";
      })(),
      isAdverbialNnc: Boolean(
        adverbialNncResultAuthorized
        || relationalNncResultAuthorized
          && sourceFrame.sourceFrame?.subjectMode === "adverbialized"
        || unitKind === "nnc"
        && (
          sourceFrame?.adverbialRole
          || sourceFrame?.adverbializationDegree
          || sourceFrame?.grammarFrame?.unitFrame?.adverbialRank
          || sourceFrame?.grammarFrame?.unitFrame?.adverbialRole
        )
      ),
      contextRecords: validatedContextRecords,
      callerDerivedFacts: {
        semanticGroup: normalizeToken(semanticGroup),
        shortPronominal: shortPronominal === true,
        collectiveReference: collectiveReference === true,
        namedPartnerEligible: namedPartnerEligible === true,
        maleBondingStem: maleBondingStem === true,
        demonstrativeKind: normalizeToken(demonstrativeKind),
        interrogativeKind: normalizeToken(interrogativeKind),
        antecessiveOrder: antecessiveOrder === true,
        mood: normalizeToken(mood),
        tense: normalizeToken(tense),
        sentenceKind: normalizeToken(sentenceKind),
      },
      callerDerivedFactAuthority: false,
      nuclearFormulaRealization,
      nuclearSurface,
      outsidePrefixes: canonicalVncOutsidePrefixes,
      formulaWithoutAntecessive:
        typedVncBoundaryWithoutAntecessive?.formulaRealization
        || formulaRealization,
      surfaceWithoutAntecessive:
        typedVncBoundaryWithoutAntecessive?.surfaceRealization
        || surface,
      externalBoundaryProjection: typedVncBoundaryProjection,
      externalBoundaryProjectionAuthority:
        unitKind === "vnc" ? "typed-vnc-source-boundary" : "not-applicable",
      formulaRealization,
      surface,
      relationalNncBoundaryFrame: relationalPolarityFrame,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedSurfaceAccepted: false,
    };
    const issued = issueFrame(issuedClauseEnvelopes, {
      ...projection,
      canonicalSignature: authorized
        ? signValue(projection, "supplementation-clause")
        : "",
    });
    if (authorized) clauseEnvelopeSources.set(issued, sourceFrame);
    return issued;
  }

  function isClassicalNahuatlSupplementationClauseEnvelope(frame = null) {
    if (
      frame?.kind !== "classical-nahuatl-supplementation-clause-envelope"
      || !issuedClauseEnvelopes.has(frame)
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || !["nnc", "vnc", "particle"].includes(frame.unitKind)
      || !frame.referenceId
      || (frame.unitKind !== "particle" && !frame.subject?.category)
      || (frame.unitKind === "particle" && (!frame.particleId || frame.subject))
      || !frame.formulaRealization
      || !frame.surface
      || frame.typedFrameAuthority !== true
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.callerSuppliedSurfaceAccepted !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature
      === signValue(projection, "supplementation-clause");
  }

  function getClauseParticipant(
    envelope = null,
    role = "subject",
    objectId = ""
  ) {
    if (!isClassicalNahuatlSupplementationClauseEnvelope(envelope)) {
      return null;
    }
    if (role === "subject") {
      return envelope.subject;
    }
    if (role === "possessor") {
      return envelope.possessor || null;
    }
    if (role === "object") {
      const normalizedObjectId = String(objectId || "").trim();
      return (
        envelope.objects.find(object => (
          !normalizedObjectId || object.id === normalizedObjectId
        ))
        || null
      );
    }
    return null;
  }

  function blockedSupplementationFrame(blockReason, inputs = {}) {
    return freezeDeep({
      kind: "classical-nahuatl-supplementation-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: "blocked",
      blockReason,
      principalClause: inputs.principalClause || null,
      supplementClause: inputs.supplementClause || null,
      referenceFrame: null,
      operationFrames: [],
      linearizationFrame: null,
      grammarGenerationAllowed: false,
      surfaceGenerationAllowed: false,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedSurfaceAccepted: false,
      canonicalSignature: "",
    });
  }

  function validateAgreementException({
    exceptionKind,
    principalParticipant,
    supplementParticipant,
    principalClause,
    supplementClause,
  }) {
    if (!exceptionKind) {
      return null;
    }
    if (
      exceptionKind === "collective"
      && supplementClause.collectiveReference
      && principalParticipant.features?.number === "plural"
    ) {
      return {
        kind: "collective-reference",
        licensed: true,
        sourceSection: "18.5",
      };
    }
    if (
      exceptionKind === "named-partner"
      && supplementClause.namedPartnerEligible
      && supplementClause.contextRecords.some(record => (
        record.contextKind === "named-partner"
        && record.groupReferenceId === principalParticipant.referenceId
        && record.namedPartnerReferenceId
          === supplementParticipant.referenceId
        && record.speakerOrAddresseeReferenceId
      ))
      && principalParticipant.features?.number === "plural"
      && supplementParticipant.features?.person === "3"
      && supplementParticipant.features?.number === "singular"
    ) {
      return {
        kind: "named-partner",
        licensed: true,
        sourceSection: "18.6",
      };
    }
    if (
      exceptionKind === "male-bonding"
      && supplementClause.maleBondingStem
      && supplementClause.contextRecords.some(record => (
        record.contextKind === "male-bonding"
        && record.referenceId === supplementClause.referenceId
        && record.speakerGender === "male"
        && record.speakerIsGroupMember === true
      ))
      && supplementParticipant.features?.person === "1"
      && supplementParticipant.features?.number === "plural"
      && principalParticipant.features?.person === "3"
    ) {
      return {
        kind: "male-bonding",
        licensed: true,
        sourceSection: "18.7",
      };
    }
    if (
      exceptionKind === "ac-pronominal-plural"
      && supplementClause.interrogativeKind === "ac"
      && principalParticipant.features?.number === "plural"
    ) {
      return {
        kind: "ac-pronominal-plural",
        licensed: true,
        sourceSection: "19.2.2",
      };
    }
    return {
      kind: exceptionKind,
      licensed: false,
      sourceSection: "",
    };
  }

  function validateComplementPolicy(principalClause, supplementClause, options) {
    const group = normalizeToken(principalClause.semanticGroup);
    if (!group) {
      return { authorized: true, frame: null };
    }
    const mood = normalizeToken(supplementClause.mood);
    const tense = normalizeToken(supplementClause.tense);
    const sentenceKind = normalizeToken(supplementClause.sentenceKind);
    const realizability = normalizeToken(options.wishRealizability);
    const speechDirectness = normalizeToken(options.speechDirectness);
    const speechAct = {
      assertion: "statement",
      question: "question",
      command: "command",
      exclamation: "exclamation",
    }[sentenceKind] || "";
    const headRole = normalizeToken(options.headRole);
    const objectContentGroups = [
      "speech",
      "saying",
      "wish",
      "perception",
      "cognition",
      "causing",
      "requesting",
    ];
    let authorized = true;
    let blockReason = "";
    if (objectContentGroups.includes(group) && headRole !== "object") {
      authorized = false;
      blockReason = "included-content-complement-requires-object-head";
    } else if (group === "affect" && headRole !== "subject") {
      authorized = false;
      blockReason = "affect-complement-requires-supplementary-subject";
    }
    if (authorized && (group === "speech" || group === "saying")) {
      authorized = ["direct", "indirect"].includes(speechDirectness)
        && ["statement", "question", "command", "exclamation"].includes(speechAct);
      if (authorized && speechAct === "command" && speechDirectness === "indirect") {
        authorized = mood === "indicative" && tense === "future";
        blockReason = authorized
          ? ""
          : "reported-indirect-command-requires-future-indicative-supplement";
      }
    } else if (authorized && group === "wish") {
      if (realizability === "realizable") {
        authorized = (
          (mood === "indicative" && tense === "future")
          || (mood === "optative" && ["nonpast", "future"].includes(tense))
        );
      } else if (realizability === "present-or-future-impossible") {
        authorized = mood === "optative" && tense === "past";
      } else if (realizability === "past-counterfactual") {
        authorized = mood === "optative"
          && tense === "past"
          && supplementClause.antecessiveOrder;
      } else {
        authorized = false;
      }
      blockReason = authorized ? "" : "wish-complement-mood-tense-condition-failed";
    } else if (authorized && group === "perception") {
      authorized = tense === "present";
      blockReason = authorized ? "" : "perception-complement-normally-requires-present";
    } else if (authorized && group === "affect") {
      authorized = true;
      blockReason = "";
    } else if (
      authorized && (
        group === "cognition"
      || group === "causing"
      || group === "requesting"
      )
    ) {
      authorized = ["assertion", "question", "wish", "command"].includes(sentenceKind);
      blockReason = authorized ? "" : "unsupported-included-complement-sentence-kind";
    } else if (authorized) {
      authorized = false;
      blockReason = "unknown-included-complement-semantic-group";
    }
    if (!authorized && !blockReason) {
      blockReason = "included-complement-policy-failed";
    }
    return {
      authorized,
      blockReason,
      frame: freezeDeep({
        kind: "classical-nahuatl-supplementation-complement-policy-frame",
        semanticGroup: group,
        supplementMood: mood,
        supplementTense: tense,
        supplementSentenceKind: sentenceKind,
        headRole,
        wishRealizability: realizability,
        speechDirectness,
        speechAct,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        translationStringAuthority: false,
      }),
    };
  }

  function buildContextualSilentFirstPersonProjection(
    clauseEnvelope = null
  ) {
    const sourceFrame = clauseEnvelopeSources.get(clauseEnvelope) || null;
    const sourceTypedSlotFrame = getVncSlotFrame(sourceFrame);
    if (
      !isClassicalNahuatlSupplementationClauseEnvelope(clauseEnvelope)
      || clauseEnvelope.unitKind !== "vnc"
      || clauseEnvelope.subject?.features?.person !== "1"
      || !sourceTypedSlotFrame
      || typeof targetObject.isClassicalNahuatlVncSlotFrame !== "function"
      || !targetObject.isClassicalNahuatlVncSlotFrame(sourceTypedSlotFrame)
      || ["", "0", "⎕"].includes(
        String(sourceTypedSlotFrame.slots?.subject?.pers1 || "")
      )
    ) {
      return null;
    }
    const contextualTypedSlotFrame = clone(sourceTypedSlotFrame);
    contextualTypedSlotFrame.sourceFrameKind =
      "classical-nahuatl-contextual-silent-first-person-operation";
    contextualTypedSlotFrame.slots.subject.pers1 = "0";
    contextualTypedSlotFrame.slots.subject.baseMorph = "0";
    contextualTypedSlotFrame.semanticIdentity = [
      "0",
      contextualTypedSlotFrame.slots.subject.pers2,
      ...contextualTypedSlotFrame.slots.prePredicate.map(
        slot => slot.carrier
      ),
      contextualTypedSlotFrame.slots.predicate.stem,
      contextualTypedSlotFrame.slots.predicate.tns,
      contextualTypedSlotFrame.slots.number.num1,
      contextualTypedSlotFrame.slots.number.num2,
    ].join("|");
    if (
      !targetObject.isClassicalNahuatlVncSlotFrame(
        contextualTypedSlotFrame
      )
      || typeof targetObject.renderClassicalNahuatlVncSlotFrameFormula
        !== "function"
      || typeof targetObject.realizeClassicalNahuatlLesson25TypedVncWord
        !== "function"
    ) {
      return null;
    }
    const formulaRealization = String(
      targetObject.renderClassicalNahuatlVncSlotFrameFormula(
        contextualTypedSlotFrame
      ) || ""
    ).trim();
    const surfaceRealization = String(
      targetObject.realizeClassicalNahuatlLesson25TypedVncWord(
        contextualTypedSlotFrame
      ) || ""
    ).trim();
    if (!formulaRealization || !surfaceRealization) return null;
    return freezeDeep({
      kind:
        "classical-nahuatl-contextual-silent-first-person-projection-frame",
      sourceSection: "57.6",
      authorizationStatus: "authorized",
      sourceTypedSlotFrame,
      contextualTypedSlotFrame,
      formulaRealization,
      surfaceRealization,
      formulaDerivedFromContextualTypedSlots: true,
      writtenDerivedFromContextualTypedSlots: true,
      formulaAndWrittenGeneratedIndependently: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildClassicalNahuatlContextualFirstPersonRealizationFrame(
    principalClause = null,
    {
      contextualSilentFirstPerson = false,
    } = {}
  ) {
    const sourceFrame = isClassicalNahuatlSupplementationClauseEnvelope(
      principalClause
    )
      ? clauseEnvelopeSources.get(principalClause) || null
      : null;
    const sourceTypedSlotFrame = getVncSlotFrame(sourceFrame);
    const reflexiveSlot = sourceTypedSlotFrame?.slots?.prePredicate?.find(
      slot => (
        slot?.role === "va1-va2"
        && slot?.va2 === "o"
        && ["n", "t"].includes(String(slot?.va1 || ""))
      )
    ) || null;
    const firstPersonAuthorized = Boolean(
      isClassicalNahuatlSupplementationClauseEnvelope(principalClause)
      && principalClause.unitKind === "vnc"
      && principalClause.subject?.features?.person === "1"
      && sourceTypedSlotFrame
      && typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
      && targetObject.isClassicalNahuatlVncSlotFrame(sourceTypedSlotFrame)
      && !["", "0", "⎕"].includes(
        String(sourceTypedSlotFrame.slots?.subject?.pers1 || "")
      )
    );
    if (!firstPersonAuthorized) {
      return blockedSupplementationFrame(
        principalClause?.subject?.features?.person === "3"
          ? "silent-first-person-requires-typed-first-person-not-third-person-fallback"
          : "contextual-first-person-realization-requires-owner-issued-first-person-vnc",
        { principalClause }
      );
    }
    if (!reflexiveSlot) {
      return blockedSupplementationFrame(
        "independent-silent-first-person-requires-distinctive-first-person-reflexive-object",
        { principalClause }
      );
    }
    const applicationSelected = contextualSilentFirstPerson === true;
    const contextualProjection = applicationSelected
      ? buildContextualSilentFirstPersonProjection(principalClause)
      : null;
    if (applicationSelected && !contextualProjection) {
      return blockedSupplementationFrame(
        "contextual-silent-first-person-projection-unavailable",
        { principalClause }
      );
    }
    const formulaRealization = applicationSelected
      ? contextualProjection.formulaRealization
      : principalClause.formulaRealization;
    const wordSurface = applicationSelected
      ? contextualProjection.surfaceRealization
      : principalClause.surface;
    const surfaceRealization = capitalizeSentence(wordSurface);
    const projection = {
      kind: "classical-nahuatl-supplementation-frame",
      version: CONTRACT_VERSION,
      operationKind: "contextual-first-person-realization",
      authorizationStatus: "authorized",
      blockReason: "",
      principalClause,
      supplementClause: null,
      operationFrames: [{
        kind:
          "classical-nahuatl-contextual-silent-first-person-frame",
        sourceSection: "57.6 note",
        subjectPerson: "first",
        targetClauseRole: "principal",
        priorClauseRole: "distinctive-reflexive-object",
        applicationSelected,
        pers1Realization: applicationSelected ? "silent" : "sounded",
        contextualAlternativeAvailable: true,
        license: "distinctive-first-person-reflexive-object",
        contextRelation: "independent-reflexive",
        sameExtralinguisticReferent: true,
        thirdPersonFallbackAllowed: false,
        reflexiveObjectCarrier: `${reflexiveSlot.va1}-${reflexiveSlot.va2}`,
        applicationUserSelectable: true,
        availabilityDerivedReadOnly: true,
        formulaAndWrittenGeneratedIndependently:
          contextualProjection
            ?.formulaAndWrittenGeneratedIndependently === true
          || !applicationSelected,
        contextualProjection,
      }],
      linearizationFrame: {
        kind:
          "classical-nahuatl-contextual-first-person-linearization-frame",
        formulaToken: formulaRealization,
        writtenToken: wordSurface,
        punctuation: ".",
      },
      formulaProjection: {
        formulaRealization,
        source: applicationSelected
          ? "contextual-typed-vnc-slot-projection"
          : "owner-issued-typed-vnc-slot-projection",
      },
      writtenProjection: {
        surfaceRealization,
        source: applicationSelected
          ? "contextual-typed-vnc-boundary-projection"
          : "owner-issued-typed-vnc-boundary-projection",
      },
      formulaRealization,
      surfaceRealization,
      projectionsGeneratedIndependently: true,
      grammarGenerationAllowed: true,
      surfaceGenerationAllowed: true,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedSurfaceAccepted: false,
    };
    return issueFrame(issuedSupplementationFrames, {
      ...projection,
      canonicalSignature: signValue(projection, "supplementation-frame"),
    });
  }

  function buildClassicalNahuatlSupplementationFrame(
    principalClause = null,
    supplementClause = null,
    options = {}
  ) {
    if (
      !isClassicalNahuatlSupplementationClauseEnvelope(principalClause)
      || !isClassicalNahuatlSupplementationClauseEnvelope(supplementClause)
    ) {
      return blockedSupplementationFrame(
        "authorized-typed-principal-and-supplement-required",
        { principalClause, supplementClause }
      );
    }
    if (principalClause.canonicalSignature === supplementClause.canonicalSignature) {
      return blockedSupplementationFrame(
        "principal-and-supplement-must-be-distinct-clause-nodes",
        { principalClause, supplementClause }
      );
    }
    const absoluteTopicContext = supplementClause.contextRecords.some(
      record => (
        record.contextKind === "absolute-topic"
        && record.referenceId === supplementClause.referenceId
      )
    );
    const requestedReferenceMode = normalizeToken(
      options.referenceMode || "shared"
    );
    const referenceMode = absoluteTopicContext
      ? "absolute-topic"
      : requestedReferenceMode;
    const headRole = normalizeToken(options.headRole || "subject");
    const contactRole = normalizeToken(
      options.supplementContactRole || "subject"
    );
    const order = normalizeToken(options.order || "principal-first");
    const adjunctor = normalizeToken(options.adjunctor || "none");
    const principalHead = getClauseParticipant(
      principalClause,
      headRole,
      options.principalObjectId
    );
    const supplementContact = getClauseParticipant(
      supplementClause,
      contactRole,
      options.supplementObjectId
    );
    if (!["shared", "included", "absolute-topic"].includes(referenceMode)) {
      return blockedSupplementationFrame("unknown-supplementation-reference-mode", {
        principalClause,
        supplementClause,
      });
    }
    if (!["subject", "object", "possessor"].includes(headRole) || !principalHead) {
      return blockedSupplementationFrame("typed-principal-personal-head-required", {
        principalClause,
        supplementClause,
      });
    }
    if (
      !["subject", "object", "possessor"].includes(contactRole)
      || (
        ["shared", "absolute-topic"].includes(referenceMode)
        && !supplementContact
      )
    ) {
      return blockedSupplementationFrame("typed-supplement-contact-pronoun-required", {
        principalClause,
        supplementClause,
      });
    }
    if (
      principalClause.unitKind === "nnc"
      && headRole === "object"
      || principalClause.unitKind === "vnc"
        && headRole === "possessor"
    ) {
      return blockedSupplementationFrame(
        "principal-clause-kind-does-not-license-requested-head-role",
        { principalClause, supplementClause }
      );
    }
    if (
      referenceMode === "included"
      && (
        principalHead.features?.person !== "3"
        || principalHead.features?.number !== "singular"
      )
    ) {
      return blockedSupplementationFrame(
        "included-referent-head-must-be-third-person-singular",
        { principalClause, supplementClause }
      );
    }
    if (
      referenceMode === "included"
      && (
        principalClause.unitKind === "nnc"
          ? !["subject", "possessor"].includes(headRole)
          : !["subject", "object"].includes(headRole)
      )
    ) {
      return blockedSupplementationFrame(
        "included-referent-role-not-licensed-for-principal-kind",
        { principalClause, supplementClause }
      );
    }

    const principalOperationSourceFrame =
      clauseEnvelopeSources.get(principalClause) || null;
    const pronominalPluralCooperationFrame =
      buildClassicalNahuatlPronominalPluralCooperationFrame(
        principalOperationSourceFrame,
        supplementClause
      );
    const pronominalPluralCooperationAuthorized =
      isClassicalNahuatlPronominalPluralCooperationFrame(
        pronominalPluralCooperationFrame
      );
    const derivedAgreementExceptionKind =
      pronominalPluralCooperationAuthorized
      && pronominalPluralCooperationFrame.route === "ac"
        ? "ac-pronominal-plural"
        : "";
    const requestedAgreementExceptionKind = normalizeToken(
      options.agreementException || ""
    );
    if (
      derivedAgreementExceptionKind
      && requestedAgreementExceptionKind
      && requestedAgreementExceptionKind !== derivedAgreementExceptionKind
    ) {
      return blockedSupplementationFrame(
        "contextually-derived-agreement-exception-cannot-be-overridden",
        { principalClause, supplementClause }
      );
    }
    const exceptionKind =
      derivedAgreementExceptionKind || requestedAgreementExceptionKind;
    const agreementException = validateAgreementException({
      exceptionKind,
      principalParticipant: principalHead,
      supplementParticipant: supplementContact || supplementClause.subject,
      principalClause,
      supplementClause,
    });
    if (agreementException && !agreementException.licensed) {
      return blockedSupplementationFrame(
        "requested-agreement-exception-not-licensed",
        { principalClause, supplementClause }
      );
    }
    const sharedReferencesMatch = principalHead.referenceId
      === supplementContact?.referenceId;
    const sharedReferenceExceptionLicensed = Boolean(
      agreementException?.licensed
      && agreementException.kind === "named-partner"
    );
    const personNumberFeaturesCompatible =
      areClassicalNahuatlPersonNumberFeaturesCompatible(
        principalHead.features,
        supplementContact?.features
      );
    const mismatchDimensions = [
      ["person", principalHead.features?.person,
        supplementContact?.features?.person],
      ["number", principalHead.features?.number,
        supplementContact?.features?.number],
      ["specificity", principalHead.features?.specificity || "specific",
        supplementContact?.features?.specificity || "specific"],
    ]
      .filter(([, principalValue, supplementValue]) => (
        principalValue && supplementValue
        && principalValue !== supplementValue
      ))
      .map(([dimension]) => dimension)
      .filter(dimension => (
        dimension !== "number"
        || !personNumberFeaturesCompatible
      ));
    const referentConditionedAgreement = Boolean(
      referenceMode === "shared"
      && sharedReferencesMatch
      && mismatchDimensions.length === 1
      && mismatchDimensions[0] === "specificity"
      && principalHead.features?.specificity === "nonspecific"
      && (supplementContact?.features?.specificity || "specific")
        === "specific"
    );
    const sharedFeaturesMatch = Boolean(
      principalHead.features
      && supplementContact?.features
      && personNumberFeaturesCompatible
      && (
        principalHead.features.specificity || "specific"
      ) === (
        supplementContact.features.specificity || "specific"
      )
    );
    const contextualSilentFirstPersonRequested =
      options.contextualSilentFirstPerson === true;
    const earlierFirstPersonClause = order === "principal-first"
      ? principalClause
      : supplementClause;
    const laterFirstPersonClause = order === "principal-first"
      ? supplementClause
      : principalClause;
    const earlierPers1 = String(
      earlierFirstPersonClause.personDyad?.pers1 || ""
    );
    const laterPers1 = String(
      laterFirstPersonClause.personDyad?.pers1 || ""
    );
    const contextualSilentFirstPersonEligible = Boolean(
      referenceMode === "shared"
      && principalClause.unitKind === "vnc"
      && supplementClause.unitKind === "vnc"
      && earlierFirstPersonClause.subject?.features?.person === "1"
      && laterFirstPersonClause.subject?.features?.person === "1"
      && earlierFirstPersonClause.subject.referenceId
        === laterFirstPersonClause.subject.referenceId
      && !["", "0", "⎕"].includes(earlierPers1)
      && !["", "0", "⎕"].includes(laterPers1)
    );
    const silentFirstPersonThirdFallbackAttempt = Boolean(
      contextualSilentFirstPersonRequested
      && earlierFirstPersonClause.unitKind === "vnc"
      && laterFirstPersonClause.unitKind === "vnc"
      && earlierFirstPersonClause.subject?.features?.person === "1"
      && laterFirstPersonClause.subject?.features?.person === "3"
      && earlierFirstPersonClause.subject.referenceId
        === laterFirstPersonClause.subject.referenceId
    );
    if (silentFirstPersonThirdFallbackAttempt) {
      return blockedSupplementationFrame(
        "silent-first-person-requires-typed-first-person-not-third-person-fallback",
        { principalClause, supplementClause }
      );
    }
    if (
      contextualSilentFirstPersonRequested
      && !contextualSilentFirstPersonEligible
    ) {
      return blockedSupplementationFrame(
        "contextual-silent-first-person-requires-prior-sounded-coreferential-first-person-vnc",
        { principalClause, supplementClause }
      );
    }
    const contextualSilentFirstPersonProjection =
      contextualSilentFirstPersonRequested
        ? buildContextualSilentFirstPersonProjection(
            laterFirstPersonClause
          )
        : null;
    if (
      contextualSilentFirstPersonRequested
      && !contextualSilentFirstPersonProjection
    ) {
      return blockedSupplementationFrame(
        "contextual-silent-first-person-projection-unavailable",
        { principalClause, supplementClause }
      );
    }
    if (
      referenceMode === "shared"
      && (
        (!sharedReferencesMatch && !sharedReferenceExceptionLicensed)
        || (
          !sharedFeaturesMatch
          && !agreementException?.licensed
          && !referentConditionedAgreement
        )
      )
    ) {
      return blockedSupplementationFrame(
        !sharedReferencesMatch
          ? "shared-referent-identity-mismatch"
          : "shared-referent-person-number-mismatch",
        { principalClause, supplementClause }
      );
    }
    if (
      supplementClause.shortPronominal
      && options.supplementActsAsStandaloneUtterance === true
    ) {
      return blockedSupplementationFrame(
        "short-personal-pronominal-nnc-cannot-stand-alone",
        { principalClause, supplementClause }
      );
    }
    if (
      principalClause.shortPronominal
      && options.principalActsAsStandaloneUtterance === true
    ) {
      return blockedSupplementationFrame(
        "short-personal-pronominal-nnc-cannot-stand-alone",
        { principalClause, supplementClause }
      );
    }
    if (!["principal-first", "supplement-first", "discontinuous"].includes(order)) {
      return blockedSupplementationFrame("unknown-supplementation-linear-order", {
        principalClause,
        supplementClause,
      });
    }
    if (options.commentEmphaticCa === true && order !== "supplement-first") {
      return blockedSupplementationFrame(
        "comment-emphatic-ca-requires-topic-before-comment-order",
        { principalClause, supplementClause }
      );
    }
    if (!["none", "in"].includes(adjunctor)) {
      return blockedSupplementationFrame("unknown-supplementation-adjunctor", {
        principalClause,
        supplementClause,
      });
    }
    const informationQuestion = options.informationQuestion === true;
    if (
      informationQuestion
      && (
        referenceMode !== "shared"
        || order !== "supplement-first"
        || supplementClause.unitKind !== "nnc"
        || !supplementClause.interrogativeKind
      )
    ) {
      return blockedSupplementationFrame(
        "information-question-requires-initial-interrogative-nnc-supplement",
        { principalClause, supplementClause }
      );
    }
    const integratedAntecessive = options.integratedAntecessive === true;
    if (
      integratedAntecessive
      && (
        order !== "supplement-first"
        || principalClause.unitKind !== "vnc"
        || !principalClause.antecessiveOrder
        || !["subject", "object"].includes(headRole)
        || referenceMode !== "shared"
      )
    ) {
      return blockedSupplementationFrame(
        "integrated-antecessive-conditions-not-met",
        { principalClause, supplementClause }
      );
    }
    const includedAntecessiveJump =
      options.includedAntecessiveJump === true;
    if (
      includedAntecessiveJump
      && (
        referenceMode !== "included"
        || principalClause.unitKind !== "nnc"
        || supplementClause.unitKind !== "vnc"
        || !supplementClause.antecessiveOrder
        || !["subject", "possessor"].includes(headRole)
      )
    ) {
      return blockedSupplementationFrame(
        "included-antecessive-jump-conditions-not-met",
        { principalClause, supplementClause }
      );
    }
    const complementPolicy = referenceMode === "included"
      ? validateComplementPolicy(principalClause, supplementClause, {
          ...options,
          headRole,
        })
      : { authorized: true, frame: null };
    if (!complementPolicy.authorized) {
      return blockedSupplementationFrame(complementPolicy.blockReason, {
        principalClause,
        supplementClause,
      });
    }
    const retainContactAlternatives =
      options.retainContactAlternatives === true;
    const contactAlternatives = retainContactAlternatives
      ? [
          ["subject", principalClause.subject],
          ...principalClause.objects.map(object => ["object", object]),
          ["possessor", principalClause.possessor],
        ]
          .filter(([, participant]) => (
            participant
            && participant.referenceId === supplementContact?.referenceId
            && participant.features?.person === "3"
            && supplementContact?.features?.person === "3"
            && participant.features?.person ===
              supplementContact?.features?.person
            && participant.features?.number ===
              supplementContact?.features?.number
          ))
          .map(([role, participant]) => ({
            headRole: role,
            participantId: participant.id,
            referenceId: participant.referenceId,
          }))
      : [];
    if (retainContactAlternatives && contactAlternatives.length < 2) {
      return blockedSupplementationFrame(
        "contact-ambiguity-requires-two-typed-third-person-head-candidates",
        { principalClause, supplementClause }
      );
    }
    const principalContinuationFrames = Array.isArray(
      options.principalContinuationFrames
    )
      ? options.principalContinuationFrames
      : [];
    const supplementContinuationFrames = Array.isArray(
      options.supplementContinuationFrames
    )
      ? options.supplementContinuationFrames
      : [];
    const continuationFrames = [
      ...principalContinuationFrames.map(frame => ({
        attachTo: "principal",
        frame,
        expectedSignature: principalClause.canonicalSignature,
      })),
      ...supplementContinuationFrames.map(frame => ({
        attachTo: "supplement",
        frame,
        expectedSignature: supplementClause.canonicalSignature,
      })),
    ];
    const continuationSignatures = continuationFrames.map(
      entry => entry.frame?.canonicalSignature || ""
    );
    const collectContinuationGraph = (entries = [], depth = 1) => (
      entries.flatMap(entry => {
        const nestedPrincipal = Array.from(
          entry.frame?.principalContinuationFrames || []
        ).map(frame => ({ attachTo: "principal", frame }));
        const nestedSupplement = Array.from(
          entry.frame?.supplementContinuationFrames || []
        ).map(frame => ({ attachTo: "supplement", frame }));
        return [
          { ...entry, depth },
          ...collectContinuationGraph(
            [...nestedPrincipal, ...nestedSupplement],
            depth + 1
          ),
        ];
      })
    );
    const continuationGraph = collectContinuationGraph(continuationFrames);
    const continuationGraphSignatures = continuationGraph.map(
      entry => entry.frame?.canonicalSignature || ""
    );
    const continuationsAuthorized = continuationFrames.every(entry => (
      isClassicalNahuatlSupplementationFrame(entry.frame)
      && entry.frame.principalClause.canonicalSignature
        === entry.expectedSignature
    ))
      && continuationGraph.every(entry => (
        isClassicalNahuatlSupplementationFrame(entry.frame)
      ))
      && new Set(continuationGraphSignatures).size
        === continuationGraphSignatures.length
      && new Set(continuationSignatures).size
        === continuationSignatures.length;
    if (!continuationsAuthorized) {
      return blockedSupplementationFrame(
        "recursive-supplementation-requires-typed-acyclic-continuations",
        { principalClause, supplementClause }
      );
    }
    let pronominalPluralFrame = null;
    if (pronominalPluralCooperationAuthorized) {
      pronominalPluralFrame = freezeDeep({
        kind: "classical-nahuatl-supplementation-pronominal-plural-frame",
        route: pronominalPluralCooperationFrame.route,
        sourceSection: pronominalPluralCooperationFrame.sourceSection,
        zeroRootPrincipal:
          pronominalPluralCooperationFrame.formulaStemMember === "0-i-h",
        compoundKind:
          pronominalPluralCooperationFrame.compoundTypedRouteRequired
          ? pronominalPluralCooperationFrame.route
          : "",
        typedMismatchException:
          agreementException?.kind === "ac-pronominal-plural",
        cooperationSignature:
          pronominalPluralCooperationFrame.canonicalSignature,
        cooperationDerivedFromOwnerIssuedVncSource: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }

    const interveners = order === "discontinuous"
      ? (Array.isArray(options.interveningClauses)
          ? options.interveningClauses
          : [])
      : [];
    if (
      order === "discontinuous"
      && !interveners.length
    ) {
      return blockedSupplementationFrame(
        "discontinuous-order-requires-typed-intervening-clauses",
        { principalClause, supplementClause }
      );
    }
    if (
      interveners.some(
        candidate => !isClassicalNahuatlSupplementationClauseEnvelope(candidate)
      )
    ) {
      return blockedSupplementationFrame(
        "discontinuous-order-requires-typed-intervening-clauses",
        { principalClause, supplementClause }
      );
    }
    const topic = order === "supplement-first";
    const fusedAdjunctor = adjunctor === "in"
      && options.fuseDemonstrativeAdjunctor === true
      && ["in", "on"].includes(supplementClause.demonstrativeKind);
    const contextualSilentTargetsSupplement = Boolean(
      contextualSilentFirstPersonProjection
      && laterFirstPersonClause === supplementClause
    );
    const contextualSilentTargetsPrincipal = Boolean(
      contextualSilentFirstPersonProjection
      && laterFirstPersonClause === principalClause
    );
    const baseSupplementSurface = contextualSilentTargetsSupplement
      ? contextualSilentFirstPersonProjection.surfaceRealization
      : includedAntecessiveJump
        ? supplementClause.surfaceWithoutAntecessive
        : supplementClause.surface;
    const baseSupplementFormula = contextualSilentTargetsSupplement
      ? contextualSilentFirstPersonProjection.formulaRealization
      : includedAntecessiveJump
        ? supplementClause.formulaWithoutAntecessive
        : supplementClause.formulaRealization;
    const nestedSupplementSurface = embedSentenceSurface(
      supplementContinuationFrames.at(-1)?.surfaceRealization
    ) || baseSupplementSurface;
    const nestedSupplementFormula = String(
      supplementContinuationFrames.at(-1)?.formulaRealization
      || baseSupplementFormula
      || ""
    ).trim();
    const supplementSurface = fusedAdjunctor
      ? `in${nestedSupplementSurface}`
      : nestedSupplementSurface;
    const supplementToken = integratedAntecessive
      ? `ō${supplementSurface}`
      : supplementSurface;
    const supplementFormula = integratedAntecessive
      ? joinExternalFormulaPrefix("ō#", nestedSupplementFormula)
      : nestedSupplementFormula;
    const basePrincipalSurface = contextualSilentTargetsPrincipal
      ? contextualSilentFirstPersonProjection.surfaceRealization
      : integratedAntecessive
        ? principalClause.surfaceWithoutAntecessive
        : principalClause.surface;
    const basePrincipalFormula = contextualSilentTargetsPrincipal
      ? contextualSilentFirstPersonProjection.formulaRealization
      : integratedAntecessive
        ? principalClause.formulaWithoutAntecessive
        : principalClause.formulaRealization;
    const nestedPrincipalSurface = embedSentenceSurface(
      principalContinuationFrames.at(-1)?.surfaceRealization
    ) || basePrincipalSurface;
    const nestedPrincipalFormula = String(
      principalContinuationFrames.at(-1)?.formulaRealization
      || basePrincipalFormula
      || ""
    ).trim();
    const principalToken = includedAntecessiveJump
      ? `ō${nestedPrincipalSurface}`
      : nestedPrincipalSurface;
    const principalFormula = includedAntecessiveJump
      ? joinExternalFormulaPrefix("ō#", nestedPrincipalFormula)
      : nestedPrincipalFormula;
    const tokens = [];
    const formulaTokens = [];
    const appendSupplement = () => {
      if (adjunctor === "in" && !fusedAdjunctor) {
        tokens.push({ role: "adjunctor", surface: "in" });
      }
      if (adjunctor === "in") {
        formulaTokens.push({ role: "adjunctor", formula: "in" });
      }
      tokens.push({
        role: topic ? "topic-supplement" : "supplement",
        surface: supplementToken,
      });
      formulaTokens.push({
        role: topic ? "topic-supplement" : "supplement",
        formula: supplementFormula,
      });
    };
    if (order === "supplement-first") {
      appendSupplement();
      if (options.commentEmphaticCa === true) {
        tokens.push({ role: "comment-emphasis", surface: "ca" });
        formulaTokens.push({ role: "comment-emphasis", formula: "ca" });
      }
      tokens.push({ role: "principal", surface: principalToken });
      formulaTokens.push({ role: "principal", formula: principalFormula });
    } else if (order === "principal-first") {
      tokens.push({ role: "principal", surface: principalToken });
      formulaTokens.push({ role: "principal", formula: principalFormula });
      appendSupplement();
    } else {
      appendSupplement();
      interveners.forEach((intervener, index) => {
        tokens.push({
          role: `intervener-${index + 1}`,
          surface: intervener.surface,
        });
        formulaTokens.push({
          role: `intervener-${index + 1}`,
          formula: intervener.formulaRealization,
        });
      });
      tokens.push({ role: "principal", surface: principalToken });
      formulaTokens.push({ role: "principal", formula: principalFormula });
    }
    const punctuation = informationQuestion ? "?" : ".";
    const unpunctuatedSurface = tokens.map(token => token.surface).join(" ");
    const surfaceRealization = capitalizeSentence(
      unpunctuatedSurface,
      punctuation
    );
    const formulaRealization = formulaTokens
      .map(token => token.formula)
      .filter(Boolean)
      .join(" + ");
    const referenceFrame = freezeDeep({
      kind: "classical-nahuatl-supplementation-reference-frame",
      referenceMode,
      headRole,
      supplementContactRole: contactRole,
      principalHead,
      supplementContact: referenceMode === "shared"
        ? supplementContact
        : {
            id: "whole-supplement",
            category: "3sg",
            features: parsePersonNumber("3sg"),
          },
      principalReferenceId: principalHead.referenceId,
      supplementReferenceId: referenceMode === "shared"
        ? supplementContact.referenceId
        : supplementClause.referenceId,
      referenceIdentityUnified: referenceMode === "shared"
        ? sharedReferencesMatch
        : false,
      referenceRelationship: sharedReferenceExceptionLicensed
        ? "named-partner-is-member-of-principal-group"
        : sharedReferencesMatch
          ? "identical"
          : referenceMode === "included"
            ? "whole-supplement"
            : "",
      wholeSupplementIsReferent: referenceMode === "included",
      agreementException,
    });
    const demonstrativeSupplementSpellingFrame = (
      order === "principal-first"
      && ["in", "on"].includes(supplementClause.demonstrativeKind)
    )
      ? (() => {
          const principalWritten = embedSentenceSurface(
            principalClause.surface
          );
          const demonstrativeWritten = supplementClause.demonstrativeKind
            === "in"
              ? "in"
              : "ōn";
          const fused = `${principalWritten}${demonstrativeWritten}`;
          const plain = fused.normalize("NFD").replace(/\p{M}+/gu, "");
          return freezeDeep({
            kind:
              "classical-nahuatl-demonstrative-supplement-spelling-frame",
            sourceSection: "17.4.3",
            demonstrativeKind: supplementClause.demonstrativeKind,
            separatedSurface: surfaceRealization,
            traditionalFusedAlternatives: [
              fused,
              plain.endsWith("n") ? plain.slice(0, -1) : plain,
            ],
            grammaticalRelationPreserved: true,
            spellingProjectionAuthority: "typed-demonstrative-supplement",
            userSelectableGrammar: false,
          });
        })()
      : null;
    const normalizedPrincipalStem = normalizeLexicalStem(
      principalClause.sourceStem
    );
    const coreferentialFutureEligible = [
      "mati",
      "il-namiqui",
      "il-cahua",
      "ilcahua",
      "nequi",
      "qui",
    ].some(stem => (
      normalizedPrincipalStem === stem
      || normalizedPrincipalStem.endsWith(`-${stem}`)
    ));
    const coreferentialFutureFrame = coreferentialFutureEligible
      ? freezeDeep({
          kind:
            "classical-nahuatl-supplementation-coreferential-future-frame",
          sourceSection: "19.4",
          eligiblePrincipalStem: normalizedPrincipalStem,
          supplementIsVnc: supplementClause.unitKind === "vnc",
          supplementTense: supplementClause.tense,
          subjectsCoreferential:
            principalClause.subject.referenceId
              === supplementClause.subject.referenceId,
          authorizationStatus:
            supplementClause.unitKind === "vnc"
            && supplementClause.tense === "future"
            && principalClause.subject.referenceId
              === supplementClause.subject.referenceId
              ? "authorized"
              : "blocked",
          infinitiveReadingLicensed:
            supplementClause.unitKind === "vnc"
            && supplementClause.tense === "future"
            && principalClause.subject.referenceId
              === supplementClause.subject.referenceId,
          nequiIncorporatedAlternativeIsSeparateDerivationalRoute:
            normalizedPrincipalStem === "nequi",
          quiFutureEmbedAlternativeIsSeparateDerivationalRoute:
            normalizedPrincipalStem === "qui",
          translationStringAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        })
      : null;
    const operationFrames = [
      principalClause.unitKind === "vnc"
        && principalClause.lateVncOperation === "compound"
        && principalClause.lateVncEmbedStem === "ye"
        && ["t", "ti"].includes(principalClause.lateVncConnective)
        && supplementClause.unitKind === "nnc"
        && Boolean(supplementClause.possessor)
        && referenceMode === "shared"
        && headRole === "subject"
        && contactRole === "subject"
        ? {
            kind:
              "classical-nahuatl-accompanying-possession-frame",
            sourceSection: "28.8",
            possessiveResultKind: supplementClause.sourceFrameKind,
            yeCompoundResultKind: principalClause.sourceFrameKind,
            yeEmbedStem: principalClause.lateVncEmbedStem,
            connective: principalClause.lateVncConnective,
            matrixStem: principalClause.lateVncMatrixStem,
            supplementarySubjectAuthorized: true,
            nestedSupplementaryPossessorPreserved: true,
            matrixSubjectPreserved: true,
            possessedResultIsTopic: order === "supplement-first",
            createsHaveVerb: false,
            createsSecondSupplementationEngine: false,
            readingKind: "accompanying-possession",
            readingOptions: [
              "have-along-with-one",
              "have-on-one",
              "carry-with-one",
              "wear-on-one",
            ],
            itemInventoryAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          }
        : null,
      principalClause.unitKind === "vnc"
        && /(?:^|-)ca-h$/u.test(principalClause.sourceStem)
        && principalClause.directionalPrefix === "on"
        && supplementClause.unitKind === "nnc"
        && Boolean(supplementClause.possessor)
        && referenceMode === "shared"
        && headRole === "subject"
        && contactRole === "subject"
        ? {
            kind: "classical-nahuatl-supplementation-have-frame",
            sourceSection: "17.3.1",
            locativePrincipalStem: principalClause.sourceStem,
            possessiveSupplement: true,
            createsHaveVerb: false,
          }
        : null,
      retainContactAlternatives
        ? {
            kind:
              "classical-nahuatl-supplementation-contact-alternatives-frame",
            sourceSections: ["17.4.4", "17.5"],
            alternatives: contactAlternatives,
            selectedHeadRole: headRole,
            orderSelectsPrincipal: false,
          }
        : null,
      demonstrativeSupplementSpellingFrame,
      principalClause.shortPronominal || supplementClause.shortPronominal
        ? {
            kind: "classical-nahuatl-short-pronominal-boundary-frame",
            sourceSection: "18.2",
            principalShort: principalClause.shortPronominal,
            supplementShort: supplementClause.shortPronominal,
            completeClauseStatusPreserved: true,
            standaloneUtteranceAllowed: false,
          }
        : null,
      principalClause.unitKind === "vnc"
        && principalClause.mood === "optative"
        && supplementClause.subject.features?.person === "2"
        && referenceMode === "shared"
        && headRole === "subject"
        ? {
            kind:
              "classical-nahuatl-supplementation-command-subject-frame",
            sourceSection: "18.10",
            isRealVocative: false,
            remainsSupplementarySubject: true,
          }
        : null,
      principalClause.silentSpecificObjectAuthorized
        || supplementClause.silentSpecificObjectAuthorized
        ? {
            kind: "classical-nahuatl-ayi-silent-object-frame",
            sourceSection: "18.8",
            carrier:
              principalClause.silentSpecificObjectAuthorized
                ? "principal"
                : "supplement",
            realization: "0-0",
            specificObjectOnly: true,
            perfectiveStem:
              principalClause.silentSpecificObjectAuthorized
                ? principalClause.sourcePerfectiveStem
                : supplementClause.sourcePerfectiveStem,
            perfectiveStemAuthority: "canonical-lesson7-class-b-analysis",
          }
        : null,
      topic
        ? {
            kind: "classical-nahuatl-topic-comment-relation-frame",
            sourceSection: "57.3",
            relation: absoluteTopicContext
              ? "absolute-topic"
              : "topicalized-supplement-or-modification-head",
            topicRelationToComment: absoluteTopicContext
              ? "none"
              : "grammatical-head",
            supplementRelation: !absoluteTopicContext,
            derivedFromTypedContext: true,
            applicationUserSelectable: true,
            availabilityDerivedReadOnly: true,
          }
        : null,
      referentConditionedAgreement || agreementException?.licensed
        ? {
            kind:
              "classical-nahuatl-referent-conditioned-agreement-frame",
            sourceSection: "57.4",
            mismatchDimensions,
            agreementExceptionKind: agreementException?.kind || "",
            agreementExceptionSourceSection:
              agreementException?.sourceSection || "",
            sameExtralinguisticReferent: sharedReferencesMatch,
            principalReferenceId: principalHead.referenceId,
            supplementReferenceId: supplementContact.referenceId,
            referenceWinsOverGrammar: true,
            userSelectable: false,
          }
        : null,
      supplementClause.isAdverbialNnc
        ? {
            kind: "classical-nahuatl-adverbial-nnc-relation-frame",
            sourceSection: "57.5",
            relation:
              referenceMode === "shared"
              && headRole === "object"
              && principalHead.features?.specificity === "nonspecific"
                ? "supplementary-object"
                : "adverbial-modifier",
            directPersonalHeadPresent: Boolean(
              referenceMode === "shared"
              && ["subject", "object", "possessor"].includes(headRole)
            ),
            deletedSpeechHead: false,
            userSelectable: false,
          }
        : null,
      contextualSilentFirstPersonEligible
        ? {
            kind:
              "classical-nahuatl-contextual-silent-first-person-frame",
            sourceSection: "57.6",
            subjectPerson: "first",
            targetClauseRole: laterFirstPersonClause === principalClause
              ? "principal"
              : "supplement",
            priorClauseRole: earlierFirstPersonClause === principalClause
              ? "principal"
              : "supplement",
            applicationSelected: contextualSilentFirstPersonRequested,
            pers1Realization: contextualSilentFirstPersonRequested
              ? "silent"
              : "sounded",
            contextualAlternativeAvailable: true,
            license: "prior-sounded-coreferential-first-person",
            contextRelation: "adjunction",
            sameExtralinguisticReferent: true,
            thirdPersonFallbackAllowed: false,
            applicationUserSelectable: true,
            availabilityDerivedReadOnly: true,
            formulaAndWrittenGeneratedIndependently:
              contextualSilentFirstPersonProjection
                ?.formulaAndWrittenGeneratedIndependently === true,
            contextualProjection:
              contextualSilentFirstPersonProjection,
          }
        : null,
      pronominalPluralFrame,
      continuationFrames.length
        ? {
            kind:
              "classical-nahuatl-supplementation-recursive-clause-graph-frame",
            sourceSections: ["17.4.1", "17.5", "19.1.1", "19.3.1"],
            continuations: continuationGraph.map(entry => ({
              attachTo: entry.attachTo,
              depth: entry.depth,
              canonicalSignature: entry.frame.canonicalSignature,
              principalClauseSignature:
                entry.frame.principalClause.canonicalSignature,
            })),
            acyclic: true,
            completeClauseNodeCount: new Set([
              principalClause.canonicalSignature,
              supplementClause.canonicalSignature,
              ...continuationGraph.flatMap(entry => [
                entry.frame.principalClause.canonicalSignature,
                entry.frame.supplementClause.canonicalSignature,
              ]),
            ]).size,
          }
        : null,
      {
        kind: "classical-nahuatl-supplementation-order-frame",
        order,
        topic,
        comment: topic,
        discontinuous: order === "discontinuous",
        interveningClauseCount: interveners.length,
      },
      {
        kind: "classical-nahuatl-supplementation-adjunctor-frame",
        adjunctor,
        fusesWithDemonstrative: fusedAdjunctor,
        affectsPredicateDeterminacy: false,
      },
      integratedAntecessive
        ? {
            kind: "classical-nahuatl-supplementation-integrated-antecessive-frame",
            sourceSection: "18.1",
            attachesTo: "supplement",
            logicalScope: "principal-vnc",
          }
        : null,
      includedAntecessiveJump
        ? {
            kind:
              "classical-nahuatl-supplementation-included-antecessive-jump-frame",
            sourceSection: "19.3.1",
            sourceCarrier: "included-supplement-vnc",
            targetCarrier: "nnc-principal",
            referenceMode: "included",
          }
        : null,
      informationQuestion
        ? {
            kind: "classical-nahuatl-supplementation-information-question-frame",
            sourceSection: "17.6",
            interrogativeKind: supplementClause.interrogativeKind,
            requiredPosition: "sentence-initial",
          }
        : null,
      complementPolicy.frame,
      coreferentialFutureFrame,
    ].filter(Boolean);
    const linearizationFrame = freezeDeep({
      kind: "classical-nahuatl-supplementation-linearization-frame",
      order,
      tokens,
      formulaTokens,
      formulaRealization,
      surfaceRealization,
      punctuation,
      surfaceAuthority: "typed-clause-realizers-plus-typed-sentence-operations",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    const projection = {
      kind: "classical-nahuatl-supplementation-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      principalClause,
      supplementClause,
      principalContinuationFrames,
      supplementContinuationFrames,
      referenceFrame,
      operationFrames,
      linearizationFrame,
      formulaRealization,
      surfaceRealization,
      projectionsGeneratedIndependently: true,
      grammarGenerationAllowed: true,
      surfaceGenerationAllowed: true,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedSurfaceAccepted: false,
    };
    return issueFrame(issuedSupplementationFrames, {
      ...projection,
      canonicalSignature: signValue(projection, "supplementation-frame"),
    });
  }

  function isClassicalNahuatlSupplementationFrame(frame = null) {
    const operationKind = normalizeToken(frame?.operationKind || "relation");
    const relationInputsAuthorized = operationKind === "relation"
      && isClassicalNahuatlSupplementationClauseEnvelope(frame?.principalClause)
      && isClassicalNahuatlSupplementationClauseEnvelope(frame?.supplementClause);
    const exclamatoryInputsAuthorized =
      operationKind === "exclamatory-utterance"
      && Array.isArray(frame?.constituents)
      && frame.constituents.length > 0
      && frame.constituents.every(
        isClassicalNahuatlSupplementationClauseEnvelope
      );
    const contextualFirstPersonInputAuthorized =
      operationKind === "contextual-first-person-realization"
      && isClassicalNahuatlSupplementationClauseEnvelope(
        frame?.principalClause
      )
      && frame.principalClause.unitKind === "vnc"
      && frame.supplementClause == null;
    const suchThatInputsAuthorized =
      operationKind === "such-that-adjunction"
      && (
        frame?.frozenEllipsis === true
          ? (
              isClassicalNahuatlSupplementationClauseEnvelope(
                frame.principalClause
              )
              && frame.principalClause.unitKind === "particle"
            )
          : (
              isClassicalNahuatlSupplementationClauseEnvelope(
                frame?.principalClause
              )
              && isClassicalNahuatlSupplementationClauseEnvelope(
                frame?.supplementClause
              )
              && isClassicalNahuatlSupplementationClauseEnvelope(
                frame?.markerClause
              )
            )
      );
    if (
      frame?.kind !== "classical-nahuatl-supplementation-frame"
      || !issuedSupplementationFrames.has(frame)
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || !(
        relationInputsAuthorized
        || contextualFirstPersonInputAuthorized
        || exclamatoryInputsAuthorized
        || suchThatInputsAuthorized
      )
      || !frame.formulaRealization
      || !frame.surfaceRealization
      || frame.projectionsGeneratedIndependently !== true
      || frame.grammarGenerationAllowed !== true
      || frame.surfaceGenerationAllowed !== true
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.callerSuppliedSurfaceAccepted !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature
      === signValue(projection, "supplementation-frame");
  }

  function stripClausePunctuation(value = "") {
    return String(value || "").trim().replace(/[.?!]+$/u, "");
  }

  function getSuchThatPrincipalIdentity(principalClause = null) {
    if (
      !isClassicalNahuatlSupplementationClauseEnvelope(principalClause)
    ) {
      return "";
    }
    if (principalClause.unitKind === "particle") {
      return {
        "l3-cuix": "cuix",
        "l3-ahzo": "ahzo",
        "l58-ahmo": "ahmo",
        "l58-quemah": "quemah",
        "l58-quemahca": "quemahca",
      }[principalClause.particleId] || "";
    }
    const negativeIdentityByPositiveIdentity = {
      ac: "ayac",
      tleh: "ahtleh",
      can: "ahcan",
      ic: "aic",
    };
    const normalizedSurface = normalizeLexicalStem(
      stripClausePunctuation(principalClause.surface)
    );
    if (principalClause.polarity === "negative") {
      const explicitNegativeIdentity = [
        "ayac",
        "ahtleh",
        "ahcan",
        "aic",
      ].find(identity => (
        normalizedSurface === identity
        || normalizedSurface.endsWith(`-${identity}`)
      ));
      if (explicitNegativeIdentity) return explicitNegativeIdentity;
      const positiveIdentity = [
        principalClause.interrogativeKind,
        principalClause.sourceStem,
      ].map(normalizeLexicalStem).find(identity => (
        Object.hasOwn(negativeIdentityByPositiveIdentity, identity)
      ));
      if (positiveIdentity) {
        return negativeIdentityByPositiveIdentity[positiveIdentity];
      }
    }
    const candidates = [
      principalClause.interrogativeKind,
      principalClause.sourceStem,
      normalizedSurface,
    ].map(normalizeLexicalStem);
    return [
      "ac",
      "tleh",
      "can",
      "ic",
      "iuhqui",
      "iuh",
      "ayac",
      "ahtleh",
      "ahcan",
      "aic",
    ].find(identity => candidates.some(candidate => (
      candidate === identity || candidate.endsWith(`-${identity}`)
    ))) || "";
  }

  function buildClassicalNahuatlExclamatoryUtteranceFrame(
    constituents = [],
    {
      personalPronounVariant = "default",
    } = {}
  ) {
    const typedConstituents = Array.isArray(constituents)
      ? constituents
      : [];
    if (
      !typedConstituents.length
      || typedConstituents.some(
        constituent => !isClassicalNahuatlSupplementationClauseEnvelope(
          constituent
        )
      )
      || new Set(
        typedConstituents.map(constituent => constituent.canonicalSignature)
      ).size !== typedConstituents.length
    ) {
      return blockedSupplementationFrame(
        "exclamatory-utterance-requires-distinct-owner-issued-constituents"
      );
    }
    const normalizedPersonalPronounVariant = normalizeToken(
      personalPronounVariant || "default"
    );
    const yInitialVariantRequested =
      normalizedPersonalPronounVariant === "y-initial";
    const getSelectedContextualRealization = constituent => (
      constituent.contextualRealizationFrame?.variants?.find(
        variant => (
          variant.variantId === normalizedPersonalPronounVariant
        )
      ) || null
    );
    const eligibleVariantConstituents = typedConstituents.filter(
      constituent => (
        constituent.unitKind === "particle"
        && getSelectedContextualRealization(constituent)
      )
    );
    if (
      !["default", "y-initial"].includes(
        normalizedPersonalPronounVariant
      )
      || yInitialVariantRequested
        && !eligibleVariantConstituents.length
    ) {
      return blockedSupplementationFrame(
        "exclamatory-personal-pronoun-variant-not-licensed"
      );
    }
    const formulaTokens = typedConstituents.map(constituent => {
      const realization = yInitialVariantRequested
        ? getSelectedContextualRealization(constituent)
        : null;
      if (!realization) {
        return constituent.formulaRealization;
      }
      return realization.formulaSegments.join(" + ");
    });
    const writtenTokens = typedConstituents.map(constituent => {
      const realization = yInitialVariantRequested
        ? getSelectedContextualRealization(constituent)
        : null;
      return realization
        ? realization.writtenSurface
        : stripClausePunctuation(constituent.surface);
    });
    const formulaRealization = formulaTokens.reduce(
      (realization, token, index) => {
        if (!realization) return token;
        if (
          typedConstituents[index]?.particlePlacementScope
            === "bound-to-previous"
        ) {
          return `${realization}${String(token).replace(/^#/u, "")}`;
        }
        return `${realization} + ${token}`;
      },
      ""
    );
    const writtenRealization = writtenTokens.reduce(
      (realization, token, index) => (
        !realization
          ? token
          : typedConstituents[index]?.particlePlacementScope
              === "bound-to-previous"
            ? `${realization}${token}`
            : `${realization} ${token}`
      ),
      ""
    );
    const surfaceRealization = capitalizeSentence(
      writtenRealization,
      "!"
    );
    const projection = {
      kind: "classical-nahuatl-supplementation-frame",
      version: CONTRACT_VERSION,
      operationKind: "exclamatory-utterance",
      authorizationStatus: "authorized",
      blockReason: "",
      principalClause: typedConstituents[0],
      supplementClause: typedConstituents[1] || null,
      constituents: typedConstituents,
      operationFrames: [{
        kind: "classical-nahuatl-exclamatory-composition-frame",
        sourceSection: "58.3",
        unitKinds: typedConstituents.map(constituent => constituent.unitKind),
        abruptExcitedUtterance: true,
        closedCollocation:
          typedConstituents.length === 1
          && typedConstituents[0].semanticMarker === "haste-collocation",
        contextualVariants: typedConstituents.flatMap(
          constituent => constituent.contextualRealizationFrame
            ?.variants?.map(variant => variant.writtenSurface) || []
        ),
        selectedPersonalPronounVariant:
          normalizedPersonalPronounVariant,
        userSelectableVariant: true,
        variantAvailabilityDerivedFromTypedParticle: true,
      }],
      linearizationFrame: {
        kind: "classical-nahuatl-exclamatory-linearization-frame",
        formulaTokens,
        writtenTokens,
        boundToPreviousParticleIndexes: typedConstituents
          .map((constituent, index) => (
            constituent.particlePlacementScope === "bound-to-previous"
              ? index
              : -1
          ))
          .filter(index => index >= 0),
        punctuation: "!",
      },
      formulaProjection: {
        formulaRealization,
        source: "typed-constituent-formula-projections",
      },
      writtenProjection: {
        surfaceRealization,
        source: "typed-constituent-written-projections",
        boundaryRealization: "sentence-spacing-and-exclamatory-punctuation",
      },
      formulaRealization,
      surfaceRealization,
      projectionsGeneratedIndependently: true,
      grammarGenerationAllowed: true,
      surfaceGenerationAllowed: true,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedSurfaceAccepted: false,
    };
    return issueFrame(issuedSupplementationFrames, {
      ...projection,
      canonicalSignature: signValue(projection, "supplementation-frame"),
    });
  }

  function buildClassicalNahuatlSuchThatAdjunctionFrame(
    principalClause = null,
    supplementClause = null,
    markerClause = null,
    adjunctorClause = null
  ) {
    const principalIdentity = getSuchThatPrincipalIdentity(principalClause);
    const frozenEllipsis = ["quemah", "quemahca"].includes(
      principalIdentity
    );
    if (frozenEllipsis) {
      if (supplementClause || markerClause || adjunctorClause) {
        return blockedSupplementationFrame(
          "frozen-quemah-ellipsis-does-not-accept-productive-constituents"
        );
      }
      const formulaRealization = principalClause.formulaRealization;
      const surfaceRealization = principalClause.surface;
      const projection = {
        kind: "classical-nahuatl-supplementation-frame",
        version: CONTRACT_VERSION,
        operationKind: "such-that-adjunction",
        authorizationStatus: "authorized",
        blockReason: "",
        principalClause,
        supplementClause: null,
        markerClause: null,
        adjunctorClause: null,
        frozenEllipsis: true,
        computedPolarity: "ordinary",
        operationFrames: [{
          kind: "classical-nahuatl-such-that-frozen-ellipsis-frame",
          sourceSection: "58.4 note",
          principalIdentity: "que",
          markerIdentity: principalIdentity === "quemahca"
            ? "mah-ca"
            : "mah",
          writtenSolidBecauseCaHasNoHeadToRight:
            principalIdentity === "quemahca",
          userSelectable: false,
        }],
        formulaProjection: {
          formulaRealization,
          source: "typed-frozen-collocation-formula-projection",
        },
        writtenProjection: {
          surfaceRealization,
          source: "typed-frozen-collocation-written-projection",
        },
        formulaRealization,
        surfaceRealization,
        projectionsGeneratedIndependently: true,
        grammarGenerationAllowed: true,
        surfaceGenerationAllowed: true,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedSurfaceAccepted: false,
      };
      return issueFrame(issuedSupplementationFrames, {
        ...projection,
        canonicalSignature: signValue(projection, "supplementation-frame"),
      });
    }
    const markerIdentity = markerClause?.particleId === "l3-mah"
      ? "mah"
      : markerClause?.particleId === "l58-mah-ca"
        ? "mah-ca"
        : "";
    const adjunctorAuthorized = !adjunctorClause
      || (
        isClassicalNahuatlSupplementationClauseEnvelope(adjunctorClause)
        && adjunctorClause.unitKind === "particle"
        && adjunctorClause.particleId === "l3-in"
      );
    const principalLicensed = [
      "ac",
      "tleh",
      "can",
      "ic",
      "cuix",
      "ahzo",
      "ahmo",
      "iuhqui",
      "iuh",
      "ayac",
      "ahtleh",
      "ahcan",
      "aic",
    ].includes(principalIdentity);
    if (
      !principalLicensed
      || !isClassicalNahuatlSupplementationClauseEnvelope(supplementClause)
      || !isClassicalNahuatlSupplementationClauseEnvelope(markerClause)
      || markerClause.unitKind !== "particle"
      || !markerIdentity
      || !adjunctorAuthorized
    ) {
      return blockedSupplementationFrame(
        "such-that-adjunction-requires-licensed-principal-marker-and-adjoined-clause",
        { principalClause, supplementClause }
      );
    }
    const principalNegative = [
      "ahmo",
      "ayac",
      "ahtleh",
      "ahcan",
      "aic",
    ].includes(principalIdentity);
    const computedPolarity = principalNegative
      ? markerIdentity === "mah-ca"
        ? "strong-affirmative"
        : "strong-negative"
      : "ordinary";
    const adjoinedFormula = markerIdentity === "mah-ca"
      ? joinExternalFormulaPrefix(
          "ca#",
          supplementClause.formulaRealization
        )
      : supplementClause.formulaRealization;
    const formulaTokens = [
      principalClause.formulaRealization,
      adjunctorClause?.formulaRealization || "",
      "mah",
      adjoinedFormula,
    ].filter(Boolean);
    const negativePrincipalWrittenByIdentity = {
      ayac: "ayāc",
      ahtleh: "ahtleh",
      ahcan: "ahcan",
      aic: "aic",
    };
    const principalWritten = principalNegative
      && Object.hasOwn(
        negativePrincipalWrittenByIdentity,
        principalIdentity
      )
      ? negativePrincipalWrittenByIdentity[principalIdentity]
      : stripClausePunctuation(principalClause.surface);
    const adjoinedWritten = stripClausePunctuation(supplementClause.surface);
    const writtenTokens = [
      principalWritten,
      adjunctorClause ? stripClausePunctuation(adjunctorClause.surface) : "",
      markerIdentity === "mah-ca"
        ? `mah ca${adjoinedWritten.charAt(0).toLowerCase()}${adjoinedWritten.slice(1)}`
        : `mah ${adjoinedWritten}`,
    ].filter(Boolean);
    const informationQuestion = [
      "ac",
      "tleh",
      "can",
      "ic",
      "cuix",
      "ahzo",
    ].includes(principalIdentity);
    const formulaRealization = formulaTokens.join(" + ");
    const surfaceRealization = capitalizeSentence(
      writtenTokens.join(" "),
      informationQuestion ? "?" : "."
    );
    const projection = {
      kind: "classical-nahuatl-supplementation-frame",
      version: CONTRACT_VERSION,
      operationKind: "such-that-adjunction",
      authorizationStatus: "authorized",
      blockReason: "",
      principalClause,
      supplementClause,
      markerClause,
      adjunctorClause,
      frozenEllipsis: false,
      principalIdentity,
      principalKind: principalClause.unitKind,
      principalPolarity: principalNegative ? "negative" : "positive",
      markerIdentity,
      markerPolarity: markerIdentity === "mah-ca"
        ? "negative"
        : "positive",
      computedPolarity,
      operationFrames: [{
        kind: "classical-nahuatl-such-that-adjunction-frame",
        sourceSections: ["58.4", "58.5", "58.6"],
        principalIdentity,
        principalKind: principalClause.unitKind,
        markerIdentity,
        optionalAdjunctorInPresent: Boolean(adjunctorClause),
        computedPolarity,
        negativeMarkerBoundaryPreservedInFormula:
          markerIdentity === "mah-ca",
        wishMarkerConfusionAllowed: false,
        icRelationshipAvailable:
          principalIdentity === "ic"
          || principalIdentity === "iuh"
          || principalIdentity === "iuhqui",
        userSelectablePolarity: false,
      }],
      linearizationFrame: {
        kind: "classical-nahuatl-such-that-linearization-frame",
        formulaTokens,
        writtenTokens,
        negativePrefixBoundaryPreservedInFormula:
          markerIdentity === "mah-ca",
        contextualBoundarySpellingAppliedToWritten:
          markerIdentity === "mah-ca",
        punctuation: informationQuestion ? "?" : ".",
      },
      formulaProjection: {
        formulaRealization,
        source: "typed-constituent-formula-projections",
        internalBoundariesPreserved: true,
      },
      writtenProjection: {
        surfaceRealization,
        source: "typed-constituent-written-projections",
        boundaryRealization: markerIdentity === "mah-ca"
          ? "ca-prefix-attached-to-adjoined-written-form"
          : "word-spacing",
      },
      formulaRealization,
      surfaceRealization,
      projectionsGeneratedIndependently: true,
      grammarGenerationAllowed: true,
      surfaceGenerationAllowed: true,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedSurfaceAccepted: false,
    };
    return issueFrame(issuedSupplementationFrames, {
      ...projection,
      canonicalSignature: signValue(projection, "supplementation-frame"),
    });
  }

  function buildClassicalNahuatlSupplementationParadigm(
    coordinates = []
  ) {
    const normalizedCoordinates = Array.isArray(coordinates) ? coordinates : [];
    const rows = normalizedCoordinates.map((coordinate, index) => {
      const frame = evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: coordinate?.principalClause,
        supplementClause: coordinate?.supplementClause,
        options: coordinate?.options || {},
      });
      return freezeDeep({
        coordinateId: String(coordinate?.coordinateId || `coordinate-${index + 1}`),
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        frame,
        formulaRealization: frame.formulaRealization || "",
        surfaceRealization: frame.surfaceRealization || "",
      });
    });
    const authorizedRows = rows.filter(
      row => isClassicalNahuatlSupplementationFrame(row.frame)
    );
    const projection = {
      kind: "classical-nahuatl-supplementation-paradigm-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: authorizedRows.length
        ? "authorized"
        : "blocked",
      blockReason: authorizedRows.length
        ? ""
        : "no-authorized-supplementation-coordinate",
      rows,
      authorizedRows,
      coordinateCount: rows.length,
      authorizedCoordinateCount: authorizedRows.length,
      scalarBuilder: "evaluateClassicalNahuatlSupplementationOperation",
      scalarParadigmEquivalence: rows.every(row => (
        row.authorizationStatus === row.frame.authorizationStatus
      )),
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    };
    return freezeDeep({
      ...projection,
      canonicalSignature: signValue(projection, "supplementation-paradigm"),
    });
  }

  function buildClassicalNahuatlVocativeFrame(
    nncClause = null,
    {
      discourseSourceContextFrame = null,
      glottalVariant = "retain",
      silentPluralIn = false,
    } = {}
  ) {
    if (
      !isClassicalNahuatlSupplementationClauseEnvelope(nncClause)
      || nncClause.unitKind !== "nnc"
      || nncClause.subject.features?.person !== "3"
    ) {
      return freezeDeep({
        kind: "classical-nahuatl-vocative-frame",
        authorizationStatus: "blocked",
        blockReason: "real-vocative-requires-typed-third-person-nnc",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    if (
      !isClassicalNahuatlDiscourseSourceContextFrame(
        discourseSourceContextFrame
      )
    ) {
      return freezeDeep({
        kind: "classical-nahuatl-vocative-frame",
        authorizationStatus: "blocked",
        blockReason: "vocative-owner-issued-discourse-source-context-required",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    const gender = discourseSourceContextFrame.speakerGender;
    if (!["male", "female"].includes(gender)) {
      return freezeDeep({
        kind: "classical-nahuatl-vocative-frame",
        authorizationStatus: "blocked",
        blockReason: "vocative-speaker-gender-required",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    let base = nncClause.surface;
    let formulaRealization = nncClause.formulaRealization;
    const operations = [];
    if (gender === "male") {
      if (silentPluralIn) {
        if (
          nncClause.subject.features?.number !== "plural"
          || !/tin$/u.test(base)
          || !/t-in#$/u.test(formulaRealization)
        ) {
          return freezeDeep({
            kind: "classical-nahuatl-vocative-frame",
            authorizationStatus: "blocked",
            blockReason: "silent-plural-in-requires-typed-absolutive-t-in-surface",
            surfaceRealization: "",
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          });
        }
        base = base.replace(/in$/u, "");
        formulaRealization = formulaRealization.replace(/t-in#$/u, "t-⎕#");
        operations.push("replace-plural-in-with-silent-variant");
      }
      if (/i$/u.test(base)) {
        base = base.slice(0, -1);
        operations.push("absorb-final-supportive-i");
      }
      if (normalizeToken(glottalVariant) === "y") {
        if (!/h$/u.test(base)) {
          return freezeDeep({
            kind: "classical-nahuatl-vocative-frame",
            authorizationStatus: "blocked",
            blockReason: "vocative-glottal-y-variant-requires-final-glottal-stop",
            surfaceRealization: "",
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          });
        }
        base = base.replace(/h$/u, "y");
        operations.push("intervocalic-glottal-to-y");
      }
      base = `${base}e`;
      formulaRealization = `${formulaRealization}e`;
      operations.push("append-male-vocative-e");
    } else {
      operations.push("female-high-tone-affected-stress");
    }
    const projection = {
      kind: "classical-nahuatl-vocative-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      sourceClause: nncClause,
      discourseSourceContextFrame,
      speakerGender: gender,
      operations,
      prosody: gender === "female"
        ? "final-syllable-high-tone-with-affected-stress"
        : "vocative-e-bears-exceptional-stress",
      formulaRealization,
      surfaceRealization: capitalizeSentence(base, "!"),
      projectionsGeneratedIndependently: true,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    };
    return issueFrame(issuedVocativeFrames, {
      ...projection,
      canonicalSignature: signValue(projection, "vocative-frame"),
    });
  }

  function isClassicalNahuatlVocativeFrame(frame = null) {
    if (
      !issuedVocativeFrames.has(frame)
      || frame?.kind !== "classical-nahuatl-vocative-frame"
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || !isClassicalNahuatlSupplementationClauseEnvelope(frame.sourceClause)
      || !["male", "female"].includes(frame.speakerGender)
      || !isClassicalNahuatlDiscourseSourceContextFrame(
        frame.discourseSourceContextFrame
      )
      || frame.discourseSourceContextFrame.speakerGender
        !== frame.speakerGender
      || !frame.formulaRealization
      || !frame.surfaceRealization
      || frame.projectionsGeneratedIndependently !== true
      || frame.typedFrameAuthority !== true
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature
      === signValue(projection, "vocative-frame");
  }

  function isTypedRumoredReportQuilPrincipalClause(
    principalClause = null,
    supplementClause = null
  ) {
    const sourceFrame =
      isClassicalNahuatlSupplementationClauseEnvelope(principalClause)
        ? clauseEnvelopeSources.get(principalClause) || null
        : null;
    const lesson7SourceFrame = Boolean(
      sourceFrame
      && typeof targetObject.isClassicalNahuatlVerbstemClassFrame
        === "function"
      && targetObject.isClassicalNahuatlVerbstemClassFrame(
        sourceFrame
      )
    )
      ? sourceFrame
      : Boolean(
        sourceFrame
        && typeof targetObject.isClassicalNahuatlVncApplicationFrame
          === "function"
        && targetObject.isClassicalNahuatlVncApplicationFrame(sourceFrame)
        && typeof targetObject.isClassicalNahuatlVerbstemClassFrame
          === "function"
        && targetObject.isClassicalNahuatlVerbstemClassFrame(
          sourceFrame.resultFrame?.selectedMachineryFrame
        )
      )
        ? sourceFrame.resultFrame.selectedMachineryFrame
        : null;
    return Boolean(
      lesson7SourceFrame
      && principalClause.unitKind === "vnc"
      && normalizeLexicalStem(principalClause.sourceStem) === "il"
      && principalClause.subject?.features?.person === "3"
      && principalClause.subject?.features?.number === "singular"
      && principalClause.tense === "preterit"
      && principalClause.objects.length === 1
      && principalClause.objects[0].features?.person === "3"
      && principalClause.objects[0].features?.number === "singular"
      && principalClause.objects[0].referenceId
        === supplementClause?.referenceId
    );
  }

  function buildClassicalNahuatlRumoredReportFrame(
    principalClause = null,
    supplementClause = null,
    { mach = false, fuseQuilMach = false } = {}
  ) {
    if (!isClassicalNahuatlSupplementationClauseEnvelope(supplementClause)) {
      return freezeDeep({
        kind: "classical-nahuatl-rumored-report-frame",
        authorizationStatus: "blocked",
        blockReason: "rumored-report-requires-typed-included-supplement",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    if (
      !isTypedRumoredReportQuilPrincipalClause(
        principalClause,
        supplementClause
      )
    ) {
      return freezeDeep({
        kind: "classical-nahuatl-rumored-report-frame",
        authorizationStatus: "blocked",
        blockReason:
          "rumored-report-requires-captured-owner-issued-quil-principal",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    const marker = mach
      ? fuseQuilMach
        ? `${principalClause.surface}mach`
        : `${principalClause.surface} mach`
      : principalClause.surface;
    const projection = {
      kind: "classical-nahuatl-rumored-report-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      principalClause,
      supplementClause,
      machSelected: mach === true,
      quilMachFused: mach === true && fuseQuilMach === true,
      formulaRealization: [
        principalClause.formulaRealization,
        ...(mach === true ? ["mach"] : []),
        "in",
        supplementClause.formulaRealization,
      ].join(" + "),
      surfaceRealization: capitalizeSentence(
        `${marker} in ${supplementClause.surface}`
      ),
      projectionsGeneratedIndependently: true,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    };
    return issueFrame(issuedRumoredReportFrames, {
      ...projection,
      canonicalSignature: signValue(projection, "rumored-report"),
    });
  }

  function isClassicalNahuatlRumoredReportFrame(frame = null) {
    if (
      !issuedRumoredReportFrames.has(frame)
      || frame?.kind !== "classical-nahuatl-rumored-report-frame"
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || !isClassicalNahuatlSupplementationClauseEnvelope(frame.supplementClause)
      || !isTypedRumoredReportQuilPrincipalClause(
        frame.principalClause,
        frame.supplementClause
      )
      || !frame.formulaRealization
      || !frame.surfaceRealization
      || frame.projectionsGeneratedIndependently !== true
      || frame.typedFrameAuthority !== true
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature
      === signValue(projection, "rumored-report");
  }

  function buildClassicalNahuatlDeletedPrincipalFrame(
    visiblePrincipalClause = null,
    deletedPrincipalClause = null,
    supplementClause = null,
    {
      deletionKind = "saying",
      speechDirectness = "direct",
      deletedSupplementationFrame = null,
    } = {}
  ) {
    const kind = normalizeToken(deletionKind);
    const normalizedSpeechDirectness = normalizeToken(speechDirectness);
    const typedVisibleNode = [
      "cah-proxy",
      "saying-adverb-only",
    ].includes(kind)
      ? isClassicalNahuatlSupplementationAdverbialModifierFrame(
          visiblePrincipalClause
        )
      : isClassicalNahuatlSupplementationClauseEnvelope(
          visiblePrincipalClause
        );
    if (
      !isClassicalNahuatlSupplementationClauseEnvelope(supplementClause)
      || !typedVisibleNode
      || (
        deletedPrincipalClause
        && !isClassicalNahuatlSupplementationClauseEnvelope(deletedPrincipalClause)
      )
    ) {
      return freezeDeep({
        kind: "classical-nahuatl-deleted-principal-frame",
        authorizationStatus: "blocked",
        blockReason: "principal-deletion-requires-typed-clause-inputs",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    let authorized = false;
    let sourceSection = "";
    const deletedSayingSupplementationAuthorized = Boolean(
      isClassicalNahuatlSupplementationFrame(
        deletedSupplementationFrame
      )
      && deletedSupplementationFrame.principalClause.canonicalSignature
        === deletedPrincipalClause?.canonicalSignature
      && deletedSupplementationFrame.supplementClause.canonicalSignature
        === supplementClause.canonicalSignature
      && deletedSupplementationFrame.referenceFrame.referenceMode
        === "included"
      && deletedSupplementationFrame.referenceFrame.headRole === "object"
      && deletedSupplementationFrame.referenceFrame.principalHead?.silent
        === true
      && deletedSupplementationFrame.referenceFrame
        .wholeSupplementIsReferent === true
    );
    if (kind === "cah-proxy") {
      authorized = Boolean(
        deletedPrincipalClause?.unitKind === "vnc"
        && /(?:^|-)ca-h$/u.test(deletedPrincipalClause.sourceStem)
        && visiblePrincipalClause.canModifyCahPrincipal
        && supplementClause.unitKind === "nnc"
        && deletedPrincipalClause.subject.referenceId
          === supplementClause.subject.referenceId
      );
      sourceSection = "18.9";
    } else if (kind === "saying") {
      const visibleAddresseeObjects = visiblePrincipalClause?.objects
        ?.filter(object => object.sounded !== false) || [];
      const deletedAddresseeObjects = deletedPrincipalClause?.objects
        ?.filter(object => object.sounded !== false) || [];
      const addresseeRelationshipAuthorized =
        visibleAddresseeObjects.some(visibleObject => (
          deletedAddresseeObjects.some(deletedObject => (
            visibleObject.referenceId === deletedObject.referenceId
            && visibleObject.category === deletedObject.category
          ))
        ));
      authorized = Boolean(
        visiblePrincipalClause?.unitKind === "vnc"
        && visiblePrincipalClause.semanticGroup === "speech-action"
        && deletedPrincipalClause?.unitKind === "vnc"
        && ["speech", "saying"].includes(deletedPrincipalClause.semanticGroup)
        && visiblePrincipalClause.subject.referenceId
          === deletedPrincipalClause.subject.referenceId
        && deletedSayingSupplementationAuthorized
        && addresseeRelationshipAuthorized
        && ["direct", "indirect"].includes(normalizedSpeechDirectness)
      );
      sourceSection = "19.6";
    } else if (kind === "saying-adverb-only") {
      authorized = Boolean(
        visiblePrincipalClause.adverbialRole
        && deletedPrincipalClause?.unitKind === "vnc"
        && ["speech", "saying"].includes(deletedPrincipalClause.semanticGroup)
        && deletedSayingSupplementationAuthorized
        && ["direct", "indirect"].includes(normalizedSpeechDirectness)
      );
      sourceSection = "19.6";
    }
    if (!authorized) {
      return freezeDeep({
        kind: "classical-nahuatl-deleted-principal-frame",
        authorizationStatus: "blocked",
        blockReason: kind === "cah-proxy"
          ? "cah-proxy-deletion-conditions-not-met"
          : kind === "saying-adverb-only"
            ? "deleted-saying-adverb-only-conditions-not-met"
            : "deleted-saying-principal-conditions-not-met",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    const remainingFirst = [
      "cah-proxy",
      "saying-adverb-only",
    ].includes(kind)
      ? visiblePrincipalClause.clause.surface
      : visiblePrincipalClause.surface;
    const remainingFirstFormula = [
      "cah-proxy",
      "saying-adverb-only",
    ].includes(kind)
      ? visiblePrincipalClause.clause.formulaRealization
      : visiblePrincipalClause.formulaRealization;
    const projection = {
      kind: "classical-nahuatl-deleted-principal-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      deletionKind: kind,
      sourceSection,
      speechDirectness: kind.startsWith("saying")
        ? normalizedSpeechDirectness
        : "",
      visiblePrincipalClause,
      deletedPrincipalClause,
      supplementClause,
      deletedSupplementationFrame: kind.startsWith("saying")
        ? deletedSupplementationFrame
        : null,
      deletedNodeCanonicalSignature:
        deletedPrincipalClause?.canonicalSignature || "",
      deletedSupplementationCanonicalSignature:
        kind.startsWith("saying")
          ? deletedSupplementationFrame.canonicalSignature
          : "",
      supplementHasNoDirectRelationToVisiblePrincipal:
        kind.startsWith("saying"),
      proxyPrincipalCreated: kind === "cah-proxy",
      adverbOnlyPrincipal: kind === "saying-adverb-only",
      adverbialNncRelationFrame:
        kind === "saying-adverb-only"
          ? {
              kind: "classical-nahuatl-adverbial-nnc-relation-frame",
              sourceSection: "57.5",
              relation: "deleted-principal-speech-head",
              directPersonalHeadPresent: false,
              deletedSpeechHead: true,
              userSelectable: false,
            }
          : null,
      formulaRealization: [
        remainingFirstFormula,
        supplementClause.formulaRealization,
      ].join(" + "),
      surfaceRealization: capitalizeSentence(
        `${remainingFirst} ${supplementClause.surface}`
      ),
      projectionsGeneratedIndependently: true,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    };
    return issueFrame(issuedDeletedPrincipalFrames, {
      ...projection,
      canonicalSignature: signValue(projection, "deleted-principal"),
    });
  }

  function isClassicalNahuatlDeletedPrincipalFrame(frame = null) {
    if (
      !issuedDeletedPrincipalFrames.has(frame)
      || frame?.kind !== "classical-nahuatl-deleted-principal-frame"
      || frame.version !== CONTRACT_VERSION
      || frame.authorizationStatus !== "authorized"
      || !["cah-proxy", "saying", "saying-adverb-only"].includes(
        frame.deletionKind
      )
      || !isClassicalNahuatlSupplementationClauseEnvelope(frame.supplementClause)
      || !frame.formulaRealization
      || !frame.surfaceRealization
      || frame.projectionsGeneratedIndependently !== true
      || frame.typedFrameAuthority !== true
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
    ) {
      return false;
    }
    const projection = { ...frame };
    delete projection.canonicalSignature;
    return frame.canonicalSignature
      === signValue(projection, "deleted-principal");
  }

  function buildClassicalNahuatlSupplementationOperationRequest(
    request = {}
  ) {
    const operationKind = normalizeToken(
      request?.operationKind || "relation"
    );
    const allowedOptionFields =
      OPERATION_OPTION_FIELDS[operationKind] || [];
    const unknownOptionFields = Object.keys(request?.options || {})
      .filter(field => !allowedOptionFields.includes(field));
    const forbiddenAuthorityFields =
      FORBIDDEN_REQUEST_AUTHORITY_FIELDS.filter(
        field => Object.hasOwn(request || {}, field)
      );
    const projection = {
      kind: "classical-nahuatl-supplementation-operation-request",
      version: CONTRACT_VERSION,
      operationKind,
      operationKindLicensed:
        SUPPLEMENTATION_OPERATION_KINDS.includes(operationKind),
      principalClause: request?.principalClause || null,
      supplementClause: request?.supplementClause || null,
      markerClause: request?.markerClause || null,
      adjunctorClause: request?.adjunctorClause || null,
      constituents: Array.isArray(request?.constituents)
        ? Array.from(request.constituents)
        : [],
      nncClause: request?.nncClause || null,
      visiblePrincipalClause: request?.visiblePrincipalClause || null,
      deletedPrincipalClause: request?.deletedPrincipalClause || null,
      options: selectOperationOptions(
        operationKind,
        request?.options || {}
      ),
      unknownOptionFields,
      operationOptionsLicensed: unknownOptionFields.length === 0,
      forbiddenAuthorityFields,
      requestAuthorityLicensed:
        forbiddenAuthorityFields.length === 0,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      callerSuppliedSurfaceAccepted: false,
    };
    return issueFrame(issuedOperationRequests, {
      ...projection,
      canonicalSignature: signValue(
        projection,
        "supplementation-operation-request"
      ),
    });
  }

  function isClassicalNahuatlSupplementationOperationRequest(
    request = null
  ) {
    if (
      request?.kind
        !== "classical-nahuatl-supplementation-operation-request"
      || !issuedOperationRequests.has(request)
      || request.version !== CONTRACT_VERSION
      || request.typedFrameAuthority !== true
      || request.formulaStringAuthority !== false
      || request.surfaceStringAuthority !== false
      || request.lessonMetadataAuthority !== false
      || request.callerSuppliedSurfaceAccepted !== false
      || !Array.isArray(OPERATION_OPTION_FIELDS[request.operationKind])
    ) {
      return false;
    }
    const projection = { ...request };
    delete projection.canonicalSignature;
    return request.canonicalSignature === signValue(
      projection,
      "supplementation-operation-request"
    );
  }

  function evaluateClassicalNahuatlSupplementationOperation(
    request = {}
  ) {
    const operationRequest =
      isClassicalNahuatlSupplementationOperationRequest(request)
        ? request
        : buildClassicalNahuatlSupplementationOperationRequest(request);
    const operationKind = operationRequest.operationKind;
    if (!operationRequest.operationKindLicensed) {
      return freezeDeep({
        kind: "classical-nahuatl-supplementation-operation-frame",
        version: CONTRACT_VERSION,
        operationKind,
        authorizationStatus: "blocked",
        blockReason: "unknown-supplementation-operation-kind",
        surfaceRealization: "",
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    if (operationRequest.requestAuthorityLicensed !== true) {
      return freezeDeep({
        kind: "classical-nahuatl-supplementation-operation-frame",
        version: CONTRACT_VERSION,
        operationKind,
        authorizationStatus: "blocked",
        blockReason:
          `forbidden-supplementation-request-authority:${
            operationRequest.forbiddenAuthorityFields?.[0] || "unknown"
          }`,
        formulaRealization: "",
        surfaceRealization: "",
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    if (operationRequest.operationOptionsLicensed !== true) {
      return freezeDeep({
        kind: "classical-nahuatl-supplementation-operation-frame",
        version: CONTRACT_VERSION,
        operationKind,
        authorizationStatus: "blocked",
        blockReason:
          `unrecognized-supplementation-operation-option:${
            operationRequest.unknownOptionFields?.[0] || "unknown"
          }`,
        formulaRealization: "",
        surfaceRealization: "",
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    if (operationKind === "relation") {
      return buildClassicalNahuatlSupplementationFrame(
        operationRequest.principalClause,
        operationRequest.supplementClause,
        operationRequest.options
      );
    }
    if (operationKind === "vocative") {
      return buildClassicalNahuatlVocativeFrame(
        operationRequest.nncClause,
        operationRequest.options
      );
    }
    if (operationKind === "rumored-report") {
      return buildClassicalNahuatlRumoredReportFrame(
        operationRequest.principalClause,
        operationRequest.supplementClause,
        operationRequest.options
      );
    }
    if (operationKind === "deleted-principal") {
      return buildClassicalNahuatlDeletedPrincipalFrame(
        operationRequest.visiblePrincipalClause,
        operationRequest.deletedPrincipalClause,
        operationRequest.supplementClause,
        operationRequest.options
      );
    }
    if (operationKind === "negative-ac-plural") {
      return buildClassicalNahuatlNegativeAcPluralFrame(
        operationRequest.principalClause
      );
    }
    if (operationKind === "contextual-first-person-realization") {
      return buildClassicalNahuatlContextualFirstPersonRealizationFrame(
        operationRequest.principalClause,
        operationRequest.options
      );
    }
    if (operationKind === "exclamatory-utterance") {
      return buildClassicalNahuatlExclamatoryUtteranceFrame(
        operationRequest.constituents,
        operationRequest.options
      );
    }
    if (operationKind === "such-that-adjunction") {
      return buildClassicalNahuatlSuchThatAdjunctionFrame(
        operationRequest.principalClause,
        operationRequest.supplementClause,
        operationRequest.markerClause,
        operationRequest.adjunctorClause
      );
    }
    return freezeDeep({
      kind: "classical-nahuatl-supplementation-operation-frame",
      version: CONTRACT_VERSION,
      operationKind,
      authorizationStatus: "blocked",
      blockReason: "unknown-supplementation-operation-kind",
      surfaceRealization: "",
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function evaluateClassicalNahuatlSupplementationOperationParadigm(
    requests = []
  ) {
    const rows = (Array.isArray(requests) ? requests : []).map(
      (request, index) => {
        const operationRequest =
          isClassicalNahuatlSupplementationOperationRequest(request)
            ? request
            : buildClassicalNahuatlSupplementationOperationRequest(
                request
              );
        const frame = evaluateClassicalNahuatlSupplementationOperation(
          operationRequest
        );
        return freezeDeep({
          coordinateId: String(
            request?.coordinateId || `coordinate-${index + 1}`
          ),
          operationKind: operationRequest.operationKind,
          authorizationStatus: frame.authorizationStatus,
          blockReason: frame.blockReason || "",
          frame,
          formulaRealization: frame.formulaRealization || "",
          surfaceRealization: frame.surfaceRealization || "",
        });
      }
    );
    const authorizedRows = rows.filter(
      row => row.authorizationStatus === "authorized"
    );
    return freezeDeep({
      kind:
        "classical-nahuatl-supplementation-operation-paradigm-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: authorizedRows.length
        ? "authorized"
        : "blocked",
      blockReason: authorizedRows.length
        ? ""
        : "no-authorized-supplementation-operation-coordinate",
      scalarBuilder:
        "evaluateClassicalNahuatlSupplementationOperation",
      coordinateCount: rows.length,
      authorizedCoordinateCount: authorizedRows.length,
      rows,
      grammarGenerationAllowed: true,
      surfaceGenerationAllowed: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  return {
    buildClassicalNahuatlDiscourseSourceContextFrame,
    isClassicalNahuatlDiscourseSourceContextFrame,
    buildClassicalNahuatlPronominalPluralCooperationFrame,
    isClassicalNahuatlPronominalPluralCooperationFrame,
    buildClassicalNahuatlNegativeAcPluralFrame,
    isClassicalNahuatlNegativeAcPluralFrame,
    buildClassicalNahuatlNegativeAcPluralParadigm,
    buildClassicalNahuatlSupplementationContextRecord,
    isClassicalNahuatlSupplementationContextRecord,
    buildClassicalNahuatlSupplementationAdverbialModifierFrame,
    isClassicalNahuatlSupplementationAdverbialModifierFrame,
    buildClassicalNahuatlSupplementationClauseEnvelope,
    isClassicalNahuatlSupplementationClauseEnvelope,
    isClassicalNahuatlSupplementationFrame,
    buildClassicalNahuatlContextualFirstPersonRealizationFrame,
    buildClassicalNahuatlExclamatoryUtteranceFrame,
    buildClassicalNahuatlSuchThatAdjunctionFrame,
    buildClassicalNahuatlSupplementationParadigm,
    buildClassicalNahuatlSupplementationOperationRequest,
    isClassicalNahuatlSupplementationOperationRequest,
    evaluateClassicalNahuatlSupplementationOperation,
    evaluateClassicalNahuatlSupplementationOperationParadigm,
    buildClassicalNahuatlVocativeFrame,
    isClassicalNahuatlVocativeFrame,
    buildClassicalNahuatlRumoredReportFrame,
    isClassicalNahuatlRumoredReportFrame,
    buildClassicalNahuatlDeletedPrincipalFrame,
    isClassicalNahuatlDeletedPrincipalFrame,
  };
}

export function installClassicalNahuatlSupplementationGlobals(
  targetObject = globalThis
) {
  const api = createClassicalNahuatlSupplementationApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
