import {
  buildClassicalNahuatlParticipantFrame,
  isClassicalNahuatlParticipantFrame,
  areClassicalNahuatlParticipantFramesReferentiallyCompatible,
  parseClassicalNahuatlPersonNumber,
} from "../classical/participant_frame.mjs?v=20260823-passive-formation-continuity-238";

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
  "additionalSharedContacts",
  "interveningClauses",
  "principalContinuationFrames",
  "supplementContinuationFrames",
  "reusePrincipalIntervener",
  "discontinuousHeadPosition",
  "principalActsAsStandaloneUtterance",
  "supplementActsAsStandaloneUtterance",
  "principalObjectId",
  "supplementObjectId",
  "wishRealizability",
  "speechDirectness",
  "contextualSilentFirstPerson",
  "specificityDomainRestriction",
]);
const OPERATION_OPTION_FIELDS = Object.freeze({
  relation: RELATION_OPTION_FIELDS,
  vocative: Object.freeze([
    "discourseSourceContextFrame",
    "glottalVariant",
    "finalIRealization",
    "silentPluralIn",
    "companionClause",
    "companionOrder",
  ]),
  "rumored-report": Object.freeze([
    "mach",
    "fuseQuilMach",
    "adjunctor",
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
// Sign the graph once per object, retaining shared-frame identity in the signature.
// Expanding every path duplicates derivation evidence exponentially.
function stableStringify(value, seen = new Map()) {
  if (!value || typeof value !== "object") return JSON.stringify(value);
  if (seen.has(value)) return `reference:${seen.get(value)}`;
  seen.set(value, seen.size);
  if (Array.isArray(value)) {
    return `[${value.map(entry => stableStringify(entry, seen)).join(",")}]`;
  }
  return `{${Object.keys(value)
    .filter(key => value[key] !== undefined)
    .sort()
    .map(key => `${JSON.stringify(key)}:${stableStringify(value[key], seen)}`)
    .join(",")}}`;
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
  return parseClassicalNahuatlPersonNumber(category);
}

export function areClassicalNahuatlPersonNumberFeaturesCompatible(
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
  // These are alternative projections of the same object inventory, not
  // additional objects. Prefer the final owner-issued target inventory.
  const candidates = [
    frame?.targetObjectClusterFrame?.positions,
    frame?.multipleObjectClusterFrame?.positions,
    // Final typed positions include the owner's sounded/silent realization;
    // request inventories describe the objects before that realization.
    slotFrame?.slots?.prePredicate?.map(slot => slot?.objectPositionFrame)
      .filter(Boolean),
    frame?.targetObjectRequests,
    frame?.sourceObjectRequests,
    singleObjectFrame ? [singleObjectFrame] : [],
  ].find(records => Array.isArray(records) && records.length) || [];
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
        || (["reflexive", "mainline-reflexive"].includes(objectKind)
          ? getSubjectCategory(slotFrame, frame) : "")
        || (/nonspecific/u.test(objectKind) ? "nonspecific" : "");
      const id = String(
        record?.objectId
        || record?.slotId
        || `object-${index + 1}`
      ).trim();
      const silentSpecificObject = Boolean(
        record?.silentSpecificObject === true || record?.sounded === false
      );
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
        participantFrame: buildClassicalNahuatlParticipantFrame({
          role: record?.governor === "causative" ? "causee" : "object",
          agreement: category,
          animacy: record?.animacy || "unspecified",
          humanness: record?.humanness
            || (/nonspecific-human|tē/u.test(`${objectKind}:${record?.carrier || ""}`) ? "human"
              : /nonspecific-nonhuman|tla/u.test(`${objectKind}:${record?.carrier || ""}`) ? "nonhuman"
                : "unspecified"),
          specificity: /nonspecific|tē|tla/u.test(`${category}:${objectKind}:${record?.carrier || ""}`)
            ? "nonspecific"
            : "specific",
        }),
        objectKind,
        sounded: !silentSpecificObject,
        silent: silentSpecificObject,
        carrier: String(
          record?.carrier || (silentSpecificObject ? "0-0" : ""),
        ),
        realization: silentSpecificObject ? "0-0" : String(
          record?.carrier || "",
        ),
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

function getPossessorRecord(frame = null, slotFrame = null, canonicalRelationalPossessor = "") {
  const stateSlotPossessor = Array.from(
    slotFrame?.slots?.state?.slots || []
  )
    .map(slot => String(
      slot?.possessorPerson || slot?.possessorCategory || ""
    ).trim())
    .find(Boolean) || "";
  const category = String(
    canonicalRelationalPossessor
    || frame?.possessor
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
        participantFrame: buildClassicalNahuatlParticipantFrame({
          role: "possessor",
          agreement: category,
          animacy: category === "3common" ? "nonanimate" : "unspecified",
        }),
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
  const deeplyImmutableGraphs = new WeakSet();
  const validatedImmutableClauseEnvelopes = new WeakSet();
  const immutableSourceEnvelopes = new WeakMap();
  function isDeeplyImmutableDataGraph(value) {
    if (!value || typeof value !== "object") return false;
    if (deeplyImmutableGraphs.has(value)) return true;
    const seen = new Set();
    const pending = [value];
    try {
      while (pending.length) {
        const current = pending.pop();
        if (seen.has(current) || deeplyImmutableGraphs.has(current)) continue;
        seen.add(current);
        const prototype = Object.getPrototypeOf(current);
        if ((Array.isArray(current) ? prototype !== Array.prototype
          : prototype !== Object.prototype && prototype !== null)
          || !Object.isFrozen(current)) return false;
        if (Array.isArray(current)) {
          for (let index = 0; index < current.length; index += 1) {
            if (!Object.prototype.hasOwnProperty.call(current, index)) return false;
          }
        }
        for (const key of Reflect.ownKeys(current)) {
          if (typeof key !== "string") return false;
          const descriptor = Object.getOwnPropertyDescriptor(current, key);
          if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) return false;
          const child = descriptor.value;
          if (child && typeof child === "object") pending.push(child);
          else if (!["string", "number", "boolean", "undefined"].includes(typeof child) && child !== null) return false;
        }
      }
    } catch (_error) { return false; }
    for (const current of seen) deeplyImmutableGraphs.add(current);
    return true;
  }
  function getReusableEnvelopeOptionsSnapshot(options) {
    if (!options || typeof options !== "object" || Array.isArray(options)
      || ![Object.prototype, null].includes(Object.getPrototypeOf(options))) return null;
    const optionNames = ["referenceId", "subjectReferenceId", "objectReferenceId", "objectReferenceIds",
      "possessorReferenceId", "sourceStem", "semanticGroup", "shortPronominal", "collectiveReference",
      "namedPartnerEligible", "maleBondingStem", "demonstrativeKind", "interrogativeKind",
      "silentObjectKind", "antecessiveOrder", "contextRecords", "mood", "tense", "sentenceKind"];
    if (optionNames.some(name => name in options && !Object.prototype.hasOwnProperty.call(options, name))) return null;
    const snapshot = Object.create(null);
    for (const key of Reflect.ownKeys(options)) {
      if (typeof key !== "string") return null;
      const descriptor = Object.getOwnPropertyDescriptor(options, key);
      if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) return null;
      const value = descriptor.value;
      if (typeof value === "number" && !Number.isFinite(value)) return null;
      if (value !== null && typeof value === "object") {
        if (key === "contextRecords" && Array.isArray(value) && value.length === 0
          && Reflect.ownKeys(value).length === 1) snapshot[key] = [];
        else if (key === "objectReferenceIds" && !Array.isArray(value)
          && Object.getPrototypeOf(value) === null) {
          const entries = Object.getOwnPropertyDescriptors(value);
          if (Reflect.ownKeys(entries).some(name => typeof name !== "string"
            || !Object.prototype.hasOwnProperty.call(entries[name], "value")
            || typeof entries[name].value !== "string")) return null;
          snapshot[key] = Object.assign(Object.create(null), Object.fromEntries(Object.entries(entries).map(([name, entry]) => [name, entry.value])));
        } else return null;
      } else if (["string", "number", "boolean", "undefined"].includes(typeof value) || value === null) snapshot[key] = value;
      else return null;
    }
    return {key: stableStringify(snapshot), options: snapshot};
  }
  const reusableEnvelopeSourceValidators = Object.freeze([
    "isClassicalNahuatlVncApplicationFrame", "isClassicalNahuatlClosureFrame",
    "isClassicalNahuatlVncSentenceResultFrame", "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
    "isClassicalNahuatlParticleResultFrame", "isClassicalNahuatlOrdinaryNncResult",
    "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
  ]);

  const issuedImpersonalSubjectDomains = new WeakSet();
  const issuedSupplementationFrames = new WeakSet();
  const supplementationReloadInputs = new WeakMap();
  const issuedVocativeFrames = new WeakSet();
  const issuedRumoredReportFrames = new WeakSet();
  const issuedDeletedPrincipalFrames = new WeakSet();
  const issuedOperationRequests = new WeakSet();
  const lexicalizedNncSources = new WeakMap();
  const lexicalizedNncBindings = new WeakMap();
  const lexicalizedNncInnerSources = new WeakSet();
  const lexicalizedNncInnerSlots = new WeakSet();
  const consumingLexicalizedNncInnerSources = new WeakSet();
  let lexicalizedDoubleNucleusSource = null;


  function issueFrame(registry, value) {
    const frame = freezeDeep(value);
    registry.add(frame);
    return frame;
  }

  // §22.3 has existent but faceless transformed agency. This domain is not
  // the nonexistent inherent agent of §22.2, or an adverbial silent subject.
  function buildTransformedImpersonalSubjectDomain(application) {
    if (targetObject.isClassicalNahuatlVncApplicationFrame?.(application) !== true
      || application.authorizationStatus !== "authorized") return null;
    const machinery = application.resultFrame?.selectedMachineryFrame;
    const transformation = machinery?.voiceTransformationFrame;
    const target = application.resultFrame?.participantProjection?.targetSubject;
    if (machinery?.voice !== "impersonal"
      || transformation?.authorizationStatus !== "authorized"
      || transformation.impersonalSubjectReferent !== "none"
      || !isClassicalNahuatlParticipantFrame(target)
      || target.impersonal !== true || target.hasReferent !== false
      || target.specificity !== "nonspecific") return null;
    return issueFrame(issuedImpersonalSubjectDomains, {
      kind: "classical-nahuatl-transformed-impersonal-subject-domain",
      canonicalVncApplicationFrame: application,
      selectedMachineryFrame: machinery,
      voiceTransformationFrame: transformation,
      targetParticipantFrame: target,
      sourceActorParticipantFrame: application.normalizedRequest.sourceSubjectFrame,
      existentialAgency: "existent-but-faceless",
      sourceActorControlsTarget: false,
      identityUnified: false,
    });
  }

  function isTransformedImpersonalSubjectDomain(frame) {
    if (!frame || !issuedImpersonalSubjectDomains.has(frame)) return false;
    if (frame.kind === "classical-nahuatl-whole-impersonal-conjunction-subject-domain") {
      const whole = frame.wholeConjunctionResult;
      return targetObject.isClassicalNahuatlClauseConjunctionResultFrame?.(whole) === true
        && whole.operationKind === "conjunction"
        && whole.relationFrame?.coordinationType === "additive"
        && frame.memberEnvelopes.length === whole.conjuncts.length
        && frame.memberEnvelopes.every((member, index) => (
          member === whole.conjuncts[index].envelope
          && isClassicalNahuatlSupplementationClauseEnvelope(member)
          && member.unitKind === "vnc"
          && member.impersonalSubjectDomainFrame === frame.memberDomains[index]
          && clauseEnvelopeSources.get(member) === frame.memberSourceResults[index]
          && isTransformedImpersonalSubjectDomain(frame.memberDomains[index])
        ));
    }
    const application = frame.canonicalVncApplicationFrame;
    return targetObject.isClassicalNahuatlVncApplicationFrame?.(application) === true
      && application.resultFrame?.selectedMachineryFrame === frame.selectedMachineryFrame
      && frame.selectedMachineryFrame.voice === "impersonal"
      && frame.selectedMachineryFrame.voiceTransformationFrame === frame.voiceTransformationFrame
      && frame.voiceTransformationFrame.impersonalSubjectReferent === "none"
      && application.resultFrame.participantProjection.targetSubject === frame.targetParticipantFrame
      && application.normalizedRequest.sourceSubjectFrame === frame.sourceActorParticipantFrame
      && frame.targetParticipantFrame.hasReferent === false
      && frame.targetParticipantFrame.impersonal === true
      && frame.targetParticipantFrame.specificity === "nonspecific";
  }

  function hasTransformedImpersonalSubjectDomain(envelope) {
    return isClassicalNahuatlSupplementationClauseEnvelope(envelope)
      && envelope.unitKind === "vnc"
      && envelope.transformedImpersonalSubjectDomainEligible === true
      && isTransformedImpersonalSubjectDomain(envelope.impersonalSubjectDomainFrame)
      && envelope.subject.participantFrame?.hasReferent === false
      && envelope.subject.participantFrame?.impersonal === true
      && envelope.subject.features?.specificity === "nonspecific";
  }


  // §35.14 supplies this entire analyzed, lexicalized possessor-supplement
  // unit. Its fixed morphic cells do not choose a semantic singular/plural
  // referent, or turn the inner mich nucleus into an independent fish event.
  function resolveClassicalNahuatlLexicalizedNncSourceFrame(request = {}) {
    if (!request || typeof request !== "object" || Array.isArray(request)
      || Reflect.ownKeys(request).some(key => !["enteredStem", "sourceUse"].includes(key))
      || request.sourceUse !== "lexicalized-nnc"
      || String(request.enteredStem || "").normalize("NFC").trim().replace(/\s+/gu, " ").toLowerCase()
        !== "michin īīx") return null;
    if (lexicalizedDoubleNucleusSource) return lexicalizedDoubleNucleusSource;
    const buildSlot = targetObject.buildClassicalNahuatlNncSlotFrame;
    if (typeof buildSlot !== "function") return null;
    const structuralParticipant = (role, referenceId) => buildClassicalNahuatlParticipantFrame({
      role, person: "3", number: "unspecified", referenceId,
      specificity: "unspecified",
    });
    const fishContact = structuralParticipant("subject", "lexicalized-35-14-possessor");
    const eyeContact = structuralParticipant("subject", "lexicalized-35-14-principal");
    const possessorContact = structuralParticipant("possessor", fishContact.referenceId);
    const makeInnerSource = (role, stem, participant, stateSlots, num1) => {
      const slot = buildSlot({
        sourceFrameKind: "classical-nahuatl-lexicalized-inner-nnc-source-frame",
        sourceAuthorizationStatus: "authorized", stem,
        personFrame: {authorizationStatus: "authorized", pers1: "Ø", pers2: "Ø",
          subject: "", participantFrame: participant},
        stateFrame: {authorizationStatus: "authorized",
          arity: stateSlots.length ? "dyadic" : "vacant", slots: stateSlots},
        numberFrame: {authorizationStatus: "authorized", num1, num2: "Ø"},
        nncFamily: "lexicalized-inner-cell",
        appliedOperationIds: ["nnc-clause-shell"],
      });
      if (targetObject.isClassicalNahuatlNncSlotFrame?.(slot) !== true) return null;
      const inner = freezeDeep({
        kind: "classical-nahuatl-lexicalized-inner-nnc-source-frame", version: 1,
        authorizationStatus: "authorized", sourceSection: "35.14", role,
        typedSlotFrame: slot, semanticSubjectFrame: participant,
        semanticNumberStatus: "unresolved", independentClauseUseAuthorized: false,
        externalEntityAssertion: false, ordinaryNounParadigmAuthorized: false,
      });
      lexicalizedNncInnerSources.add(inner); lexicalizedNncInnerSlots.add(slot); return inner;
    };
    const supplement = makeInnerSource("supplement", "mich", fishContact, [], "in");
    const principal = makeInnerSource("principal", "īx", eyeContact,
      [{role: "st1", carrier: "ī"}, {role: "st2", carrier: "Ø"}], "Ø");
    if (!principal || !supplement) return null;
    const source = freezeDeep({
      kind: "classical-nahuatl-lexicalized-nnc-source-frame", version: 1,
      authorizationStatus: "authorized", sourceUse: "lexicalized-nnc", sourceStem: "michin īīx",
      sourceRank: "lexicalized-double-nucleus-nnc", sourceSection: "35.14",
      sourceAnalysis: {relation: "possessor-supplementation", order: "supplement-first",
        principalStem: "īx", principalState: ["ī", "Ø"], principalNumber: ["Ø", "Ø"],
        supplementStem: "mich", supplementNumber: ["in", "Ø"],
        innerSubjectDyads: [["Ø", "Ø"], ["Ø", "Ø"]],
        semanticNumberStatus: "unresolved", lexicalMeaning: "wart-or-warts",
        ordinaryNounParadigmAuthorized: false, externalFishEntityAuthored: false},
      principalSourceFrame: principal, supplementSourceFrame: supplement,
      sourceClauseOrder: [supplement, principal],
      typedFrameAuthority: true, callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    });
    lexicalizedNncSources.set(source, Object.freeze({principal, supplement,
      principalSubject: eyeContact, supplementSubject: fishContact,
      principalPossessor: possessorContact}));
    lexicalizedDoubleNucleusSource = source; return source;
  }
  function isClassicalNahuatlLexicalizedNncSourceFrame(source = null) {
    const c = source && lexicalizedNncSources.get(source);
    return Boolean(c && Object.isFrozen(source)
      && source.kind === "classical-nahuatl-lexicalized-nnc-source-frame"
      && source.sourceUse === "lexicalized-nnc" && source.sourceRank === "lexicalized-double-nucleus-nnc"
      && source.principalSourceFrame === c.principal
      && source.supplementSourceFrame === c.supplement
      && source.sourceClauseOrder.length === 2
      && source.sourceClauseOrder[0] === c.supplement && source.sourceClauseOrder[1] === c.principal
      && lexicalizedNncInnerSources.has(c.principal) && lexicalizedNncInnerSources.has(c.supplement)
      && [c.principal, c.supplement].every(inner =>
        targetObject.isClassicalNahuatlNncSlotFrame?.(inner.typedSlotFrame) === true
        && inner.semanticSubjectFrame.number === "unspecified"));
  }
  function issueClassicalNahuatlLexicalizedNncBindingFrame(source = null, selections = {}) {
    if (!isClassicalNahuatlLexicalizedNncSourceFrame(source)) return null;
    const supported = selections && typeof selections === "object" && !Array.isArray(selections)
      && Reflect.ownKeys(selections).length === 0;
    const frame = freezeDeep({
      kind: "classical-nahuatl-lexicalized-nnc-binding-frame", version: 1,
      operationId: "sentence:supplementation", exactSourceFrame: source,
      bindingStatus: supported ? "ready" : "rejected",
      authorizationStatus: supported ? "authorized" : "blocked",
      blockReason: supported ? "" : "lexicalized-nnc-fixed-source-context-required",
      callerSelections: selections && typeof selections === "object" ? {...selections} : {},
      effectiveSelections: {}, requiredChoiceIds: [], choiceOptionProjection: {},
      executionArgs: supported ? [{operationKind: "lexicalized-nnc", sourceFrame: source}] : [],
      ownerInputAcceptanceProven: true, exactSourceIdentityPreserved: true,
      ownerChoicesRequired: false, ownerExecutionStillRequired: supported,
      callerSuppliedAuthorityAccepted: false, grammarAuthority: false,
    });
    lexicalizedNncBindings.set(frame, source); return frame;
  }
  function isClassicalNahuatlLexicalizedNncBindingFrame(frame = null) {
    const source = frame && lexicalizedNncBindings.get(frame);
    return Boolean(source && isClassicalNahuatlLexicalizedNncSourceFrame(source)
      && Object.isFrozen(frame) && frame.exactSourceFrame === source
      && ["ready", "rejected"].includes(frame.bindingStatus)
      && (frame.bindingStatus !== "ready" || frame.executionArgs.length === 1
        && frame.executionArgs[0].sourceFrame === source
        && frame.executionArgs[0].operationKind === "lexicalized-nnc"));
  }
  function buildLexicalizedNncInnerEnvelope(source, subject, possessor = null) {
    if (!lexicalizedNncInnerSources.has(source)) return null;
    // Reuse the typed writer with this exact private inner Source. Its
    // canonical contact retains third person with UNRESOLVED semantic number.
    consumingLexicalizedNncInnerSources.add(source);
    let base;
    try {
      base = buildClassicalNahuatlSupplementationClauseEnvelope(source, {
        referenceId: `lexicalized-35-14-${source.role}`,
        subjectReferenceId: subject.referenceId,
      });
    } finally { consumingLexicalizedNncInnerSources.delete(source); }
    if (!isClassicalNahuatlSupplementationClauseEnvelope(base)) return null;
    const record = (id, participant) => Object.freeze({id,
      category: participant.category,
      features: Object.freeze({person: participant.person, number: participant.number,
        specificity: participant.specificity}), participantFrame: participant,
      referenceId: participant.referenceId, referenceDomain: "lexicalized-inner-structure"});
    const projection = { ...base, subject: record("subject", subject),
      possessor: possessor ? record("possessor", possessor) : null,
      lexicalizedInnerSourceFrame: source, semanticNumberStatus: "unresolved",
      externalEntityAssertion: false, independentClauseUseAuthorized: false };
    delete projection.canonicalSignature;
    const envelope = issueFrame(issuedClauseEnvelopes, {...projection,
      canonicalSignature: signValue(projection, "supplementation-clause")});
    clauseEnvelopeSources.set(envelope, source); return envelope;
  }
  function evaluateLexicalizedNncSourceRequest(request) {
    if (!request || Reflect.ownKeys(request).some(key => !["operationKind", "sourceFrame"].includes(key))
      || !isClassicalNahuatlLexicalizedNncSourceFrame(request.sourceFrame)) {
      return blockedSupplementationFrame("issued-lexicalized-nnc-source-required");
    }
    const source = request.sourceFrame, c = lexicalizedNncSources.get(source);
    const principal = buildLexicalizedNncInnerEnvelope(c.principal, c.principalSubject, c.principalPossessor);
    const supplement = buildLexicalizedNncInnerEnvelope(c.supplement, c.supplementSubject);
    const whole = buildClassicalNahuatlSupplementationFrame(principal, supplement, {
      referenceMode: "shared", headRole: "possessor", supplementContactRole: "subject",
      order: "supplement-first", adjunctor: "none",
    });
    if (!isClassicalNahuatlSupplementationFrame(whole)) return whole;
    const projection = {...whole, canonicalLexicalizedNncSourceFrame: source,
      lexicalizedInnerSourceFrames: source.sourceClauseOrder,
      lexicalizedInnerSlotFrames: [c.supplement.typedSlotFrame, c.principal.typedSlotFrame],
      lexicalizedSourceUse: "lexicalized-nnc", semanticNumberStatus: "unresolved",
      externalFishEntityAuthored: false, independentInnerClauseResultsMade: false};
    delete projection.canonicalSignature;
    return issueFrame(issuedSupplementationFrames, {...projection,
      canonicalSignature: signValue(projection, "supplementation-frame")});
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
      && ["none", "speaker", "addressee", "third-person"].includes(knownParticipant)
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
      || !["none", "speaker", "addressee", "third-person"].includes(
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
    // The public sentence wrapper keeps the exact issued VNC parent.
    // Unwrap only an owner-validated wrapper; a structural copy has no authority.
    if (targetObject.isClassicalNahuatlVncSentenceResultFrame?.(
      principalSourceFrame
    ) === true) {
      principalSourceFrame = principalSourceFrame.vncApplicationFrame;
    }
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

  function deriveClauseSemanticGroup(sourceFrame = null, sourceStem = "", canonicalMachinery = null) {
    const normalizedStem = normalizeLexicalStem(sourceStem);
    const sourceCandidates = [
      normalizedStem,
      normalizeLexicalStem(sourceFrame?.stem),
      normalizeLexicalStem(sourceFrame?.sourceVerbstem),
      normalizeLexicalStem(sourceFrame?.targetStem),
    ].filter(Boolean);
    // Productive layers retain the lexical meaning in their issued source
    // machinery. Read that ancestry rather than interpreting a finished stem.
    const seen = new Set();
    let machinery = canonicalMachinery;
    while (machinery && !seen.has(machinery)) {
      seen.add(machinery);
      const issuedLate = targetObject.isClassicalNahuatlMachineryFrame?.(machinery) === true;
      const issuedDerived = targetObject.isClassicalNahuatlDerivedVncMachineryFrame?.(machinery) === true;
      const issuedBase = targetObject.isClassicalNahuatlVerbstemClassFrame?.(machinery) === true;
      if (!issuedLate && !issuedDerived && !issuedBase) break;
      sourceCandidates.push(...[
        machinery.stem, machinery.sourceVerbstem, machinery.targetStem,
      ].map(normalizeLexicalStem).filter(Boolean));
      machinery = issuedLate || issuedDerived ? machinery.sourceMachineryFrame : null;
    }
    const matches = (...stems) => sourceCandidates.some(candidate => (
      stems.includes(candidate)
      || stems.some(stem => candidate.endsWith(`-${stem}`))
    ));
    if (matches("nanquilia", "nan-qui-lia", "notza")) return "speech-action";
    if (matches("ilhuia", "il-huia")) return "saying";
    if (matches("ihtoa", "iht-o-a")) {
      const valence = normalizeToken(sourceFrame?.normalizedRequest?.sourceValence
        || canonicalMachinery?.requestedSourceValence || "");
      return valence === "projective-nonhuman" ? "speech-action" : "speech";
    }
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

  function buildQuantityModifiedNominalCollectiveFrame(modification) {
    if (targetObject.isClassicalNahuatlResultFrame?.(modification) !== true
      || modification.operationKind !== "adjectival-modification"
      || modification.authorizationStatus !== "authorized") return null;
    const clauses = modification.selectedClauses || [];
    const head = clauses[0];
    if (head?.unitKind !== "nnc" || head.subjectId !== "3sg") return null;
    const sameSubjectClauses = clauses.filter((clause, index) => clause.unitKind === "nnc"
      && clause.subjectId === head.subjectId
      && (index === 0 || modification.modifierLinkRoles?.[index - 1] === "shared-subject"));
    const quantitive = sameSubjectClauses.find(clause =>
      targetObject.isClassicalNahuatlNncSlotFrame?.(clause.typedSlotFrame) === true
      && clause.typedSlotFrame.pronominalSubtype === "quantitive");
    const nominal = sameSubjectClauses.find(clause => clause !== quantitive
      && targetObject.isClassicalNahuatlNncSlotFrame?.(clause.typedSlotFrame) === true
      && clause.typedSlotFrame.subjectAnimacy === "animate");
    if (!quantitive || !nominal) return null;
    // §42.8.5 supplies contextual plural reference to this issued structure.
    // Its NNC subjects remain formally singular; no noun or count spelling
    // supplies this permission, and the outer contact must retain their person.
    return freezeDeep({kind: "classical-nahuatl-quantity-modified-nominal-collective-frame",
      authorizationStatus: "authorized", sourceSection: "42.8.5",
      wholeModificationResult: modification, nominalResult: nominal.sourceResult,
      quantitiveResult: quantitive.sourceResult, nominalSlotFrame: nominal.typedSlotFrame,
      quantitiveSlotFrame: quantitive.typedSlotFrame, formalSubject: head.subjectId,
      formalPerson: head.subjectId[0], formalNumber: "singular",
      contextualPluralReferencePermitted: true, formalAgreementChanged: false,
      formulaStringAuthority: false, surfaceStringAuthority: false});
  }

  function buildAdjectivalUnconsumedObjectContacts(modification, referenceOptions = {}) {
    const contacts = [];
    for (const [index, clause] of (modification.selectedClauses || []).entries()) {
      if (index === 0 || clause.unitKind !== "vnc"
        || modification.modifierLinkRoles?.[index - 1] !== "vnc-subject"
        || targetObject.isClassicalNahuatlVncSlotFrame?.(clause.typedSlotFrame) !== true) continue;
      const prefix = `modifier-${index}:`;
      const envelope = buildClassicalNahuatlSupplementationClauseEnvelope(clause.sourceResult, {
        ...referenceOptions,
        objectReferenceIds: Object.fromEntries(Object.entries(referenceOptions.objectReferenceIds || {})
          .filter(([id]) => id.startsWith(prefix))
          .map(([id, reference]) => [id.slice(prefix.length), reference])),
      });
      if (!isClassicalNahuatlSupplementationClauseEnvelope(envelope)
        || envelope.unitKind !== "vnc"
        || clauseEnvelopeSources.get(envelope) !== clause.sourceResult) continue;
      for (const object of envelope.objects) {
        if (object.objectKind !== "specific-projective"
          || object.features.specificity !== "specific"
          || !object.participantFrame?.hasReferent) continue;
        contacts.push({ ...object, id: `${prefix}${object.id}`,
          nestedObjectContactFrame: freezeDeep({
            kind: "classical-nahuatl-unconsumed-modifier-object-contact-frame",
            exactModificationResult: modification,
            exactModifierResult: clause.sourceResult,
            selectedModifierClause: clause,
            typedSlotFrame: clause.typedSlotFrame,
            modifierEnvelope: envelope,
            originObjectId: object.id,
            originObject: object,
            consumedModifierContact: "subject",
            availableContactRole: "object",
            formalObjectCategory: object.category,
            formalActorCategory: envelope.subject.category,
            factsAreReadOnly: true,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          }),
        });
      }
    }
    return contacts;
  }

  function buildUnconsumedSupplementObjectContacts(source) {
    const contact = source.referenceFrame;
    return (source.supplementClause.objects || []).filter(object => object.nestedObjectContactFrame
      && !(contact.referenceMode === "shared" && contact.supplementContactRole === "object"
        && contact.supplementContact.id === object.id)).map(object => ({
          ...object, id: `supplement:${object.id}`,
        }));
  }

  const attestedExternalEnvelopeSources = new WeakMap();
  function buildClassicalNahuatlSupplementationClauseEnvelope(sourceFrame = null, options = {}) {
    const optionsSnapshot = getReusableEnvelopeOptionsSnapshot(options);
    const optionsKey = optionsSnapshot?.key ?? null;
    const reusableSource = optionsKey !== null && isDeeplyImmutableDataGraph(sourceFrame);
    const existing = reusableSource ? immutableSourceEnvelopes.get(sourceFrame)?.get(optionsKey) : null;
    // A cache never grants Source authority: ask the same canonical owner on
    // every hit, then retain the exact issued envelope and its identity links.
    if (existing && targetObject[existing.validator]?.(sourceFrame) === true
      && isClassicalNahuatlSupplementationClauseEnvelope(existing.envelope)) return existing.envelope;
    const envelope = buildUncachedClassicalNahuatlSupplementationClauseEnvelope(
      sourceFrame, optionsSnapshot ? optionsSnapshot.options : options,
    );
    if (reusableSource && envelope.authorizationStatus === "authorized"
      && isDeeplyImmutableDataGraph(envelope)) {
      const validator = reusableEnvelopeSourceValidators.find(name => targetObject[name]?.(sourceFrame) === true);
      if (validator) {
        let byOptions = immutableSourceEnvelopes.get(sourceFrame);
        if (!byOptions) { byOptions = new Map(); immutableSourceEnvelopes.set(sourceFrame, byOptions); }
        if (byOptions.size >= 16) byOptions.delete(byOptions.keys().next().value);
        byOptions.set(optionsKey, {validator, envelope});
      }
    }
    return envelope;
  }

  function buildUncachedClassicalNahuatlSupplementationClauseEnvelope(
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
    if (["classical-nahuatl-attested-nnc-cell-result-frame","classical-nahuatl-attested-place-result-frame","classical-nahuatl-attested-principal-collocation-result-frame"].includes(sourceFrame?.kind)
      && targetObject.isClassicalNahuatlAttestedNncCellResult?.(sourceFrame)!==true
      && targetObject.isClassicalNahuatlAttestedPlaceResult?.(sourceFrame)!==true
      && targetObject.isClassicalNahuatlAttestedPrincipalCollocationResult?.(sourceFrame)!==true)
      return freezeDeep({kind:"classical-nahuatl-supplementation-clause-envelope",authorizationStatus:"blocked",blockReason:"issued-attested-cell-required"});
    // Attested cells retain only their private external clause projection.
    // No ordinary noun class, inner genealogy or finite actor is inferred.
    const attestedNominal = targetObject.getClassicalNahuatlAttestedNncCellExternalProjection?.(sourceFrame);
    const attestedPlace = targetObject.getClassicalNahuatlAttestedPlaceExternalProjection?.(sourceFrame);
    const attestedPrincipal = targetObject.isClassicalNahuatlAttestedPrincipalCollocationResult?.(sourceFrame) === true;
    if (attestedNominal || attestedPlace || attestedPrincipal) {
      const external = attestedNominal || attestedPlace;
      const id = normalizeReferenceId(referenceId);
      if (!id) return freezeDeep({kind:"classical-nahuatl-supplementation-clause-envelope",authorizationStatus:"blocked",blockReason:"canonical-reference-id-required"});
      const records = (Array.isArray(contextRecords) ? contextRecords : []).filter(isClassicalNahuatlSupplementationContextRecord);
      const participant = external?.subjectParticipantFrame || null;
      const contact = (p, role, contactId) => p ? {id:role,role,category:p.category,
        features:{person:p.person,number:p.number,
          ...(["specific","nonspecific"].includes(p.specificity) ? {specificity:p.specificity} : {})},participantFrame:p,
        referenceId:normalizeReferenceId(contactId || id)} : null;
      const subject = contact(participant,"subject",subjectReferenceId);
      const possessor = contact(attestedNominal?.possessorParticipantFrame,"possessor",possessorReferenceId || `${id}:possessor`);
      const projection = {kind:"classical-nahuatl-supplementation-clause-envelope",version:CONTRACT_VERSION,
        authorizationStatus:"authorized",blockReason:"",unitKind:attestedPrincipal ? "clause" : "nnc",referenceId:id,
        sourceFrameKind:sourceFrame.kind,sourceStem:external?.canonicalSourceFrame?.sourceStem || sourceFrame.sourceFrame.sourceStem,
        subject,objects:[],possessor,embeddedPossessor:null,semanticGroup:"",sentenceKind:"assertion",polarity:"positive",mood:"",tense:"",
        shortPronominal:false,collectiveReference:false,
        namedPartnerEligible:records.some(r=>r.contextKind==="named-partner" && r.namedPartnerReferenceId===id),
        maleBondingStem:false,demonstrativeKind:"",interrogativeKind:"",silentObjectKind:"",antecessiveOrder:false,
        absoluteTopic:false,isAdverbialVnc:false,isAdverbialNnc:Boolean(attestedPlace),adverbialRole:attestedPlace?"place":"",
        ...(attestedPlace ? {uniqueSocialPlaceReference:true,subjectReference:"unique-socially-designated-place"}:{}),
        ...(attestedPrincipal ? {grammaticalSubjectAnalysis:"unclaimed",permittedExternalUse:"condition-principal",writingQualification:sourceFrame.writingQualification}:{}),
        contextRecords:records,formulaRealization:sourceFrame.formulaRealization,surface:sourceFrame.wordSurface,
        nuclearFormulaRealization:sourceFrame.formulaRealization,nuclearSurface:sourceFrame.wordSurface,
        formulaWithoutAntecessive:sourceFrame.formulaRealization,surfaceWithoutAntecessive:sourceFrame.wordSurface,
        callerDerivedFactAuthority:false,typedFrameAuthority:true,formulaStringAuthority:false,surfaceStringAuthority:false,callerSuppliedSurfaceAccepted:false};
      const issued=issueFrame(issuedClauseEnvelopes,{...projection,canonicalSignature:signValue(projection,"supplementation-clause")});
      clauseEnvelopeSources.set(issued,sourceFrame);attestedExternalEnvelopeSources.set(issued,sourceFrame);return issued;
    }
    const lexicalizedInnerSlot = getNncSlotFrame(sourceFrame);
    if ((sourceFrame?.kind === "classical-nahuatl-lexicalized-inner-nnc-source-frame"
        || lexicalizedNncInnerSlots.has(lexicalizedInnerSlot)
        || lexicalizedInnerSlot?.nncFamily === "lexicalized-inner-cell")
      && (!lexicalizedNncInnerSources.has(sourceFrame)
        || !consumingLexicalizedNncInnerSources.has(sourceFrame))) {
      return freezeDeep({kind: "classical-nahuatl-supplementation-clause-envelope",
        authorizationStatus: "blocked", blockReason: "lexicalized-inner-nucleus-requires-whole-source",
        formulaStringAuthority: false, surfaceStringAuthority: false});
    }
    if (sourceFrame?.kind === "classical-nahuatl-nnc-sentence-surface-frame"
      && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sourceFrame) !== true) {
      return freezeDeep({
        kind: "classical-nahuatl-supplementation-clause-envelope",
        authorizationStatus: "blocked", blockReason: "issued-nnc-sentence-surface-required",
        formulaStringAuthority: false, surfaceStringAuthority: false,
      });
    }
    const boundNominalMaterial = targetObject.isClassicalNahuatlBoundCustomaryAgentiveNncMaterial;
    if (boundNominalMaterial?.(sourceFrame) === true
      || boundNominalMaterial?.(getNncSlotFrame(sourceFrame)) === true) {
      return freezeDeep({
        kind: "classical-nahuatl-supplementation-clause-envelope",
        authorizationStatus: "blocked",
        blockReason: "bound-customary-agentive-material-cannot-form-complete-clause",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    if (targetObject.isClassicalNahuatlClauseConjunctionResultFrame?.(sourceFrame) === true) {
      const members = sourceFrame.conjuncts.map(node => node.envelope);
      if (sourceFrame.operationKind === "conjunction"
        && sourceFrame.relationFrame?.coordinationType === "additive"
        && members.length > 1
        && members.every(hasTransformedImpersonalSubjectDomain)) {
        // §57.4.3a: every predicate applies to the same entire specified group.
        // A separate whole-domain contact retains every member. It supplies
        // neither an actor, object nor possessor from the first conjunct.
        const sharedReferenceId = normalizeReferenceId(subjectReferenceId || referenceId
          || members[0].subject.referenceId);
        const participant = buildClassicalNahuatlParticipantFrame({
          role: "subject", agreement: "3sg", specificity: "nonspecific",
          impersonal: true, referenceId: sharedReferenceId,
        });
        const domain = issueFrame(issuedImpersonalSubjectDomains, {
          kind: "classical-nahuatl-whole-impersonal-conjunction-subject-domain",
          wholeConjunctionResult: sourceFrame,
          memberEnvelopes: Object.freeze([...members]),
          memberSourceResults: Object.freeze(members.map(member => clauseEnvelopeSources.get(member))),
          memberDomains: Object.freeze(members.map(member => member.impersonalSubjectDomainFrame)),
          targetParticipantFrame: participant,
          contactRole: "subject", memberActorsRemainSeparate: true,
          firstMemberRepresentsWhole: false,
        });
        const projection = {
          kind: "classical-nahuatl-supplementation-clause-envelope",
          version: CONTRACT_VERSION, authorizationStatus: "authorized", blockReason: "",
          unitKind: "vnc", referenceId: normalizeReferenceId(referenceId || sharedReferenceId),
          subject: {id: "subject", category: "3sg", referenceId: sharedReferenceId,
            features: {...parsePersonNumber("3sg"), specificity: "nonspecific"}, participantFrame: participant},
          objects: [], possessor: null, contextRecords: [], sentenceKind: "assertion",
          sourceFrameKind: sourceFrame.kind, canonicalConjunctionResult: sourceFrame,
          transformedImpersonalSubjectDomainEligible: true, impersonalSubjectDomainFrame: domain,
          formulaRealization: String(sourceFrame.formulaRealization || "").trim().replace(/[.?!]$/u, ""),
          surface: embedSentenceSurface(sourceFrame.surfaceRealization),
          typedFrameAuthority: true, formulaStringAuthority: false,
          surfaceStringAuthority: false, callerSuppliedSurfaceAccepted: false,
        };
        const issued = issueFrame(issuedClauseEnvelopes, {...projection,
          canonicalSignature: signValue(projection, "supplementation-clause")});
        clauseEnvelopeSources.set(issued, sourceFrame);return issued;
      }
      const sharedLexicalSubject = sourceFrame.operationKind === "lexical-conjunction"
        && sourceFrame.relationFrame?.stateRealization === "conjoined-stems"
        && sourceFrame.relationFrame?.sameSubjectReferent === true
        && [2, 3].includes(members.length)
        && members.every(member => isClassicalNahuatlSupplementationClauseEnvelope(member)
          && member.unitKind === "nnc"
          && member.subject.category === members[0].subject.category
          && member.subject.referenceId === members[0].subject.referenceId
          && isClassicalNahuatlParticipantFrame(member.subject.participantFrame)
          && member.subject.participantFrame.category === member.subject.category
          && members.every(other =>
            areClassicalNahuatlParticipantFramesReferentiallyCompatible(
              member.subject.participantFrame, other.subject?.participantFrame)
            && [member.subject.participantFrame.specificity,
              other.subject?.participantFrame?.specificity]
              .filter(value => value && value !== "unspecified")
              .every(value => value === (member.subject.participantFrame.specificity !== "unspecified"
                ? member.subject.participantFrame.specificity : other.subject.participantFrame.specificity))));
      if (sharedLexicalSubject) {
        // §52.6: the whole lexical unit can be a supplementary subject.
        // Member possessors remain inside that unit; neither a single
        // conjunct nor its lexical properties represents the whole.
        const subject = members[0].subject;
        const sharedFacts = Object.fromEntries(["animacy", "humanness", "specificity"]
          .map(axis => [axis, members.map(member => member.subject.participantFrame[axis])
            .find(value => value && value !== "unspecified") || "unspecified"]));
        const sharedReferenceId = normalizeReferenceId(
          subjectReferenceId || referenceId || subject.referenceId
        );
        const projection = {
          kind: "classical-nahuatl-supplementation-clause-envelope",
          version: CONTRACT_VERSION,
          authorizationStatus: "authorized",
          blockReason: "",
          unitKind: "nnc",
          referenceId: normalizeReferenceId(referenceId || members[0].referenceId),
          subject: { ...subject, referenceId: sharedReferenceId,
            participantFrame: buildClassicalNahuatlParticipantFrame({
              ...subject.participantFrame,
              ...sharedFacts,
              referenceId: sharedReferenceId,
            }) },
          objects: [],
          possessor: null,
          contextRecords: [],
          sourceFrameKind: sourceFrame.kind,
          canonicalConjunctionResult: sourceFrame,
          lexicalConjunctionMembers: members,
          sharedLexicalConjunctionSubjectContact: true,
          formulaRealization: String(sourceFrame.formulaRealization || "").trim().replace(/[.?!]$/u, ""),
          surface: embedSentenceSurface(sourceFrame.surfaceRealization),
          typedFrameAuthority: true,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          callerSuppliedSurfaceAccepted: false,
        };
        const issued = issueFrame(issuedClauseEnvelopes, { ...projection,
          canonicalSignature: signValue(projection, "supplementation-clause") });
        clauseEnvelopeSources.set(issued, sourceFrame);
        return issued;
      }
      const sharedCommonNominal = sourceFrame.operationKind === "conjunction"
        && ["additive", "alternative"].includes(sourceFrame.relationFrame?.coordinationType)
        && members.length > 1
        && members.every(member => isClassicalNahuatlSupplementationClauseEnvelope(member)
          && member.unitKind === "nnc" && member.subject?.category === "3common"
          && !member.objects.length && !member.possessor);
      if (!sharedCommonNominal) return freezeDeep({
        kind: "classical-nahuatl-supplementation-clause-envelope",
        authorizationStatus: "blocked", blockReason: "conjunction-shared-common-nominal-contact-required",
        formulaStringAuthority: false, surfaceStringAuthority: false,
      });
      // §52.1 permits both additive and alternative conjunction at adjoined
      // rank; §52.2 gives the common nominal supplementary-object construction.
      // The signed whole owns the coordination meaning. Preserve every
      // conjunct; do not infer plural or a lexical noun.
      const nucleus = members[0];
      const projection = { ...nucleus,
        referenceId: referenceId || nucleus.referenceId,
        subject: {...nucleus.subject, referenceId: subjectReferenceId || referenceId || nucleus.subject.referenceId},
        sourceFrameKind: sourceFrame.kind,
        canonicalConjunctionResult: sourceFrame,
        sharedCommonNominalContact: true,
        formulaRealization: String(sourceFrame.formulaRealization || "").trim().replace(/[.?!]$/u, ""),
        surface: embedSentenceSurface(sourceFrame.surfaceRealization),
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, { ...projection,
        canonicalSignature: signValue(projection, "supplementation-clause") });
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    if (isClassicalNahuatlVocativeFrame(sourceFrame)) {
      // Carry the issued companion's participant topology while retaining the
      // entire address and clause as the reusable utterance.
      const nucleus = sourceFrame.companionClause || sourceFrame.sourceClause;
      const punctuation = sourceFrame.surfaceRealization.match(/[.?!]$/u)?.[0];
      const projection = {
        ...nucleus,
        referenceId: referenceId || nucleus.referenceId,
        sourceFrameKind: sourceFrame.kind,
        formulaRealization: sourceFrame.formulaRealization,
        surface: sourceFrame.embeddedSurface,
        sentenceKind: punctuation === "?" ? "question"
          : punctuation === "!" ? "exclamation" : "assertion",
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, {
        ...projection,
        canonicalSignature: signValue(projection, "supplementation-clause"),
      });
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    if (isClassicalNahuatlSupplementationFrame(sourceFrame)
      && sourceFrame.operationKind === "contextual-first-person-realization") {
      const principal = sourceFrame.principalClause;
      const canonicalSourceResult = clauseEnvelopeSources.get(principal);
      const sourceTypedSlotFrame = getVncSlotFrame(canonicalSourceResult);
      const operation = sourceFrame.operationFrames[0];
      const contextualProjection = operation?.contextualProjection;
      const selected = operation?.applicationSelected === true;
      const contextualTypedSlotFrame = selected
        ? contextualProjection?.contextualTypedSlotFrame : sourceTypedSlotFrame;
      // This whole has one contextual VNC projection, rather than two
      // ordinary supplement clauses. Its original finite remains its Source.
      if (!isClassicalNahuatlSupplementationClauseEnvelope(principal)
        || principal.unitKind !== "vnc"
        || operation?.kind !== "classical-nahuatl-contextual-silent-first-person-frame"
        || operation.sameExtralinguisticReferent !== true
        || operation.thirdPersonFallbackAllowed !== false
        || !sourceTypedSlotFrame
        || targetObject.isClassicalNahuatlVncSlotFrame?.(contextualTypedSlotFrame) !== true
        || (selected && contextualProjection?.sourceTypedSlotFrame !== sourceTypedSlotFrame)
        || sourceFrame.linearizationFrame.kind !== "classical-nahuatl-contextual-first-person-linearization-frame"
        || sourceFrame.linearizationFrame.formulaToken !== sourceFrame.formulaRealization
        || !sourceFrame.linearizationFrame.writtenToken) {
        return freezeDeep({
          kind: "classical-nahuatl-supplementation-clause-envelope",
          authorizationStatus: "blocked",
          blockReason: "issued-contextual-first-person-whole-projection-required",
        });
      }
      const projection = {
        ...principal,
        referenceId: referenceId || principal.referenceId,
        sourceFrameKind: sourceFrame.kind,
        formulaRealization: sourceFrame.linearizationFrame.formulaToken,
        surface: sourceFrame.linearizationFrame.writtenToken,
        sentenceKind: sourceFrame.linearizationFrame.punctuation === "?"
          ? "question" : sourceFrame.linearizationFrame.punctuation === "!"
            ? "exclamation" : "assertion",
        canonicalContextualFirstPersonFrame: {
          canonicalResult: sourceFrame,
          canonicalPrincipalEnvelope: principal,
          canonicalSourceResult,
          sourceTypedSlotFrame,
          contextualTypedSlotFrame,
          applicationSelected: selected,
        },
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, {
        ...projection,
        canonicalSignature: signValue(projection, "supplementation-clause"),
      });
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    if (isClassicalNahuatlSupplementationFrame(sourceFrame)) {
      const principalObjects = sourceFrame.principalClause.objects.filter(object =>
        !object.nestedObjectContactFrame
        || !(sourceFrame.referenceFrame.referenceMode === "shared"
          && sourceFrame.referenceFrame.headRole === "object"
          && sourceFrame.referenceFrame.principalHead.id === object.id));
      const projection = {
        ...sourceFrame.principalClause,
        objects: [...principalObjects, ...buildUnconsumedSupplementObjectContacts(sourceFrame)],
        referenceId: referenceId || sourceFrame.principalClause.referenceId,
        sourceFrameKind: sourceFrame.kind,
        formulaRealization: sourceFrame.formulaRealization,
        surface: sourceFrame.embeddedSurface,
        sentenceKind: sourceFrame.linearizationFrame.punctuation === "?"
          ? "question" : sourceFrame.linearizationFrame.punctuation === "!"
            ? "exclamation" : "assertion",
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, {
        ...projection,
        canonicalSignature: signValue(projection, "supplementation-clause"),
      });
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    if (targetObject.isAdverbialAdjunctionResult?.(sourceFrame) === true) {
      const nucleus = buildClassicalNahuatlSupplementationClauseEnvelope(
        sourceFrame.sourceContract?.principal?.issuedResult,
        arguments[1] || {},
      );
      if (!isClassicalNahuatlSupplementationClauseEnvelope(nucleus)) return nucleus;
      const adjoined = buildClassicalNahuatlSupplementationClauseEnvelope(
        sourceFrame.sourceContract?.adjoined?.issuedResult,
        arguments[1] || {},
      );
      if (!isClassicalNahuatlSupplementationClauseEnvelope(adjoined)) return adjoined;
      const markerSource = sourceFrame.sourceContract?.marker;
      const compositeMarkerRole = markerSource?.compositeMarkerRole || null;
      const markerSourceUse = compositeMarkerRole
        ? targetObject.getClassicalNahuatlParticleRelationalUse?.(markerSource?.issuedResult)
        : null;
      const authenticatedCompositeMarkerRole = compositeMarkerRole
        && Object.isFrozen(compositeMarkerRole)
        && compositeMarkerRole.kind === "classical-composite-inner-marker-projection"
        && compositeMarkerRole.exactParticleResult === markerSource.issuedResult
        && markerSourceUse?.compositeRoles?.innerMarker
        && compositeMarkerRole.sourceUse === markerSourceUse
        && compositeMarkerRole.sourceRole === markerSourceUse?.compositeRoles?.innerMarker
        ? compositeMarkerRole : null;
      if (compositeMarkerRole && !authenticatedCompositeMarkerRole) {
        return freezeDeep({kind: "classical-nahuatl-supplementation-clause-envelope",
          authorizationStatus: "blocked", blockReason: "issued-composite-inner-marker-projection-required",
          formulaStringAuthority: false, surfaceStringAuthority: false});
      }
      const marker = !authenticatedCompositeMarkerRole && markerSource?.issuedResult
        ? buildClassicalNahuatlSupplementationClauseEnvelope(
            markerSource.issuedResult, arguments[1] || {},
          ) : null;
      if (marker && !isClassicalNahuatlSupplementationClauseEnvelope(marker)) return marker;
      const markerFormula = authenticatedCompositeMarkerRole?.formula
        || marker?.formulaRealization || "";
      const markerRightAttached = authenticatedCompositeMarkerRole
        ? authenticatedCompositeMarkerRole.rightAttachedToFollowingUnit === true
        : markerSource?.grammarFrame?.morphBoundaryFrame?.rightAttachedToFollowingUnit === true;
      const markedAdjoinedFormula = markerRightAttached
        ? joinExternalFormulaPrefix(markerFormula, adjoined.formulaRealization)
        : [markerFormula, adjoined.formulaRealization].filter(Boolean).join(" + ");
      const order = sourceFrame.ruleProfile.order;
      const orderedFormulas = order === "head-modifier" || order === "appositive-head-modifier"
        ? [nucleus.formulaRealization, markedAdjoinedFormula]
        : order === "principal-adverbial-head"
          ? [adjoined.formulaRealization, markerFormula, nucleus.formulaRealization]
          : [markedAdjoinedFormula, nucleus.formulaRealization];
      const selectedFormula = sourceFrame.sharedIntervenerProjection?.formula
        || sourceFrame.wishAdverbialProjection?.formula
        || orderedFormulas.filter(Boolean).join(" + ");
      const projection = {
        ...nucleus,
        sourceFrameKind: sourceFrame.kind,
        formulaRealization: selectedFormula.replace(/[.?!]+$/u, ""),
        surface: sourceFrame.embeddedSurface ?? embedSentenceSurface(sourceFrame.surface),
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, {
        ...projection,
        canonicalSignature: signValue(projection, "supplementation-clause"),
      });
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    if (sourceFrame?.kind === "classical-nahuatl-adjectival-modification-result-frame"
      && targetObject.isClassicalNahuatlResultFrame?.(sourceFrame) !== true) {
      return freezeDeep({kind: "classical-nahuatl-supplementation-clause-envelope",
        authorizationStatus: "blocked", blockReason: "issued-adjectival-modification-result-required",
        formulaStringAuthority: false, surfaceStringAuthority: false});
    }
    if (targetObject.isClassicalNahuatlResultFrame?.(sourceFrame) === true
      && sourceFrame.operationKind === "adjectival-modification") {
      const head = sourceFrame.selectedClauses?.[0];
      const nucleus = buildClassicalNahuatlSupplementationClauseEnvelope(
        head?.sourceResult, arguments[1] || {},
      );
      if (!isClassicalNahuatlSupplementationClauseEnvelope(nucleus)) return nucleus;
      const quantityModifiedNominalCollectiveFrame = buildQuantityModifiedNominalCollectiveFrame(sourceFrame)
        || nucleus.quantityModifiedNominalCollectiveFrame || null;
      const projection = { ...nucleus,
        objects: [...nucleus.objects, ...buildAdjectivalUnconsumedObjectContacts(sourceFrame, arguments[1] || {})],
        collectiveReference: nucleus.collectiveReference || Boolean(quantityModifiedNominalCollectiveFrame),
        ...(quantityModifiedNominalCollectiveFrame ? {quantityModifiedNominalCollectiveFrame} : {}),
        sourceFrameKind: sourceFrame.kind,
        formulaRealization: sourceFrame.formulaProjection.result,
        surface: String(sourceFrame.writtenProjection.unitSurface || "").trim().replace(/[.?!]$/u, ""),
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, { ...projection,
        canonicalSignature: signValue(projection, "supplementation-clause") });
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    if (targetObject.isClassicalNahuatlNominalConstructionResult?.(sourceFrame) === true
      && sourceFrame.constructionKind === "nominal-embed-vnc"
      && targetObject.isClassicalNahuatlVncApplicationFrame?.(sourceFrame.canonicalResult) === true) {
      const nucleus = buildClassicalNahuatlSupplementationClauseEnvelope(sourceFrame.canonicalResult, arguments[1] || {});
      if (!isClassicalNahuatlSupplementationClauseEnvelope(nucleus)) return nucleus;
      const projection = {...nucleus, sourceFrameKind: sourceFrame.kind,
        formulaRealization: sourceFrame.formulaRealization,
        surface: sourceFrame.wordSurface,
        canonicalNominalConstructionResult: sourceFrame,
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, {...projection,
        canonicalSignature: signValue(projection, "supplementation-clause")});
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    if (targetObject.isClassicalNahuatlVncSentenceResultFrame?.(sourceFrame)) {
      const nucleus = buildClassicalNahuatlSupplementationClauseEnvelope(
        sourceFrame.vncApplicationFrame || sourceFrame.lateOperationClosureFrame,
        arguments[1] || {},
      );
      if (!isClassicalNahuatlSupplementationClauseEnvelope(nucleus)) return nucleus;
      const projection = {...nucleus,
        sourceFrameKind: sourceFrame.kind,
        sentenceKind: ["question", "yes-no-question", "information-question"].includes(sourceFrame.sentenceSurfaceFrame?.sentenceType)
          || sourceFrame.sentenceSurfaceFrame?.finalPunctuation === "?"
          ? "question"
          : sourceFrame.sentenceSurfaceFrame?.finalPunctuation === "!"
            ? "exclamation" : nucleus.sentenceKind,
        formulaRealization: sourceFrame.sentenceFormulaDisplay.replace(/[.?!]+$/u, ""),
        surface: sourceFrame.embeddedSurface
          ?? sourceFrame.sentenceSurfaceFrame?.embeddedSentenceSurface
          ?? embedSentenceSurface(sourceFrame.sentenceSurfaceDisplay),
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, {...projection,
        canonicalSignature: signValue(projection, "supplementation-clause")});
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    if (targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(sourceFrame)
      && sourceFrame.authorizationStatus === "authorized") {
      const nucleus = buildClassicalNahuatlSupplementationClauseEnvelope(
        sourceFrame.contextualNncSentenceFrame || sourceFrame.canonicalInputFrame,
        arguments[1] || {},
      );
      if (!isClassicalNahuatlSupplementationClauseEnvelope(nucleus)) return nucleus;
      const projection = {
        ...nucleus,
        sourceFrameKind: sourceFrame.kind,
        polarity: sourceFrame.contextualNncSentenceFrame?.discourseFrame?.polarity
          || nucleus.polarity,
        formulaRealization: sourceFrame.formulaProjection.formula.replace(/[.?!]+$/u, ""),
        surface: embedSentenceSurface(sourceFrame.writtenProjection.surface),
      };
      delete projection.canonicalSignature;
      const issued = issueFrame(issuedClauseEnvelopes, {
        ...projection,
        canonicalSignature: signValue(projection, "supplementation-clause"),
      });
      clauseEnvelopeSources.set(issued, sourceFrame);
      return issued;
    }
    const placeGentilicCandidate = sourceFrame?.kind
      === "classical-nahuatl-place-gentilic-nnc-frame";
    const placeGentilicNncResultAuthorized = Boolean(
      targetObject.isPlaceGentilicNncFrame?.(sourceFrame) === true
      && sourceFrame.authorizationStatus === "authorized"
    );
    const nncSlotFrame = getNncSlotFrame(sourceFrame)
      || (placeGentilicNncResultAuthorized
        ? sourceFrame.agreementFrame?.typedSlotFrame
          || sourceFrame.finiteFrame?.typedSlotFrame : null);
    const personalNameNncResultAuthorized = Boolean(
      targetObject.isPersonalNameNncResult?.(sourceFrame) === true
      && sourceFrame.coordinateParts?.length === 1
    );
    const personalNameOuterParticipant = personalNameNncResultAuthorized
      && targetObject.isPersonalNameOpaqueQuotedInnerSourceFrame?.(sourceFrame.typedSlotFrame?.downgradedSource) === true
      && sourceFrame.typedSlotFrame.downgradedSource.referenceKind === "quoted-designation"
      && isClassicalNahuatlParticipantFrame(sourceFrame.outerParticipantFrame)
      && sourceFrame.outerParticipantFrame === sourceFrame.typedSlotFrame.outerSubject.participantFrame
      && sourceFrame.outerParticipantFrame === sourceFrame.typedSlotFrame.downgradedSource.citationOuterParticipantFrame
      ? sourceFrame.outerParticipantFrame : null;
    const quantitativePredicateAuthorized = targetObject.isClassicalNahuatlQuantitativePredicateResult?.(sourceFrame) === true;
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
    // A causative honorific retains the genuine underlying reflexive
    // participant. Its singular finite carrier is not its reference number.
    const honorificCausativeApplication = lateVncClosureAuthorized
      && sourceFrame.operationFrame?.operation === "honorific"
      && sourceFrame.operationFrame?.variant === "causative"
      && targetObject.isClassicalNahuatlVncApplicationFrame?.(sourceFrame.baseApplicationFrame) === true
      && sourceFrame.baseApplicationFrame.authorizationStatus === "authorized"
      && sourceFrame.baseApplicationFrame.resultFrame?.derivationOperationFrame
        ?.participantTransformFrame?.causativeObjectPersonBinding === "target-subject-coordinate"
      ? sourceFrame.baseApplicationFrame : null;
    const projectedVncTargetParticipant = (vncApplicationResultFrame
      || honorificCausativeApplication?.resultFrame)?.participantProjection?.targetSubject;
    const canonicalVncTargetParticipant = (vncApplicationResultAuthorized || honorificCausativeApplication)
      && sourceFrame.authorizationStatus === "authorized"
      && isClassicalNahuatlParticipantFrame(projectedVncTargetParticipant)
      ? projectedVncTargetParticipant : null;
    const transformedImpersonalSubjectDomain = vncApplicationResultAuthorized
      ? buildTransformedImpersonalSubjectDomain(sourceFrame) : null;
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
    const issuedNncSentence = targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sourceFrame) === true;
    const sentenceOrdinaryNncResult = issuedNncSentence
      ? targetObject.getClassicalNahuatlOrdinaryNncResultForTypedSlotFrame?.(sourceFrame.sourceNncSlotFrame)
      : null;
    const includedPredicateResult = (ordinaryNncResultAuthorized
      ? sourceFrame : sentenceOrdinaryNncResult)?.sourceFrame?.adjectivalProfile?.includesPossessor === true
      ? (ordinaryNncResultAuthorized ? sourceFrame : sentenceOrdinaryNncResult) : null;
    const nominalConstructionResultAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlNominalConstructionResult
        === "function"
      && targetObject.isClassicalNahuatlNominalConstructionResult(
        sourceFrame
      )
    );
    const calendarDateCandidate = sourceFrame?.kind === "classical-nahuatl-nominal-construction-result-frame"
      && sourceFrame.constructionKind === "calendar-date-nnc";
    const calendarDateResultAuthorized = calendarDateCandidate && nominalConstructionResultAuthorized;
    const affectiveDemonstrativeSource = nominalConstructionResultAuthorized
      && sourceFrame.constructionKind === "affective-nnc"
      && sourceFrame.operationFrame?.affectRoute === "compound"
      && sourceFrame.sourceFrame?.affectiveMatrix === "tzin"
        ? targetObject.issueCanonicalNncSourceFrame?.({
            stem: sourceFrame.sourceFrame.embedStem,
          }) : null;
    const affectiveDemonstrative = Boolean(
      targetObject.isClassicalNahuatlPronominalNncSourceFrame?.(affectiveDemonstrativeSource)
      && ["demonstrative-this", "demonstrative-that"].includes(affectiveDemonstrativeSource.familyId)
    );
    const deverbalNncResultAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlDeverbalNncGrammarFrame
        === "function"
      && targetObject.isClassicalNahuatlDeverbalNncGrammarFrame(sourceFrame)
      && sourceFrame?.canonicalResult?.nncSlotFrame
    );
    const activeActionNncResultAuthorized = Boolean(
      deverbalNncResultAuthorized
      && sourceFrame?.constructionKind === "deverbal-action"
      && sourceFrame?.operationFrame?.actionKind === "active-action"
      && sourceFrame?.operationFrame?.deverbalActionFrame
        ?.exactVncResultIdentityPreserved === true
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
      pronominalNncResultAuthorized
      || ordinaryNncResultAuthorized
      || nominalConstructionResultAuthorized
      || personalNameNncResultAuthorized
      || placeGentilicNncResultAuthorized;
    const nncAuthorized = Boolean(
      // A copied gentilic cannot acquire whole-Result authority by presenting
      // an otherwise authentic agreement slot frame to the generic adapter.
      (!placeGentilicCandidate || placeGentilicNncResultAuthorized)
      && (!calendarDateCandidate || calendarDateResultAuthorized)
      && (sourceFrame?.kind !== "classical-nahuatl-pronominal-nnc-result-frame"
        || pronominalNncResultAuthorized)
      && (sourceFrame?.kind !== "classical-nahuatl-ordinary-nnc-result-frame"
        || ordinaryNncResultAuthorized)
      && (sourceFrame?.kind !== "classical-nahuatl-relational-nnc-relational-result"
        || relationalNncResultAuthorized)
      && (quantitativePredicateAuthorized || relationalNncResultAuthorized
        || personalNameNncResultAuthorized
        || (
          nncSlotFrame
          && sourceFrame?.authorizationStatus === "authorized"
          && typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
          && targetObject.isClassicalNahuatlNncSlotFrame(nncSlotFrame)
        ))
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
    const canonicalSourceStem = personalNameNncResultAuthorized
      ? "personal-name-quoted-statement"
      : String(
      includedPredicateResult?.sourceFrame?.stem
      || sourceFrame?.selectedOutputLogicFrame?.outputFillers
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
    const completedNncSentenceSurface = personalNameNncResultAuthorized
      ? String(sourceFrame.writtenProjection.result || "").trim()
      : placeGentilicNncResultAuthorized || calendarDateResultAuthorized
      // This owned word may preserve the place's lexical capital; it is not
      // a sentence-initial capital to remove when the whole NNC is embedded.
      ? String(sourceFrame.wordSurface || "").trim()
      : completedNncResultAuthorized
      ? (targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sourceFrame.sentenceFrame)
          ? sourceFrame.sentenceFrame.embeddedSentenceSurface
          : embedSentenceSurface(String(
          sourceFrame.sentenceFrame?.sentenceSurface
          || sourceFrame.surfaceRealization
          || sourceFrame.sentenceSurface
          || sourceFrame.wordSurface
          || ""
        ).trim()))
      : "";
    const nuclearSurface = quantitativePredicateAuthorized
      ? sourceFrame.wordSurface
      : issuedNncSentence
      ? sourceFrame.embeddedSentenceSurface
      : particleAuthorized
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
    const nuclearFormulaRealization = quantitativePredicateAuthorized
      ? sourceFrame.formulaRealization
      : issuedNncSentence
      ? String(sourceFrame.sentenceFormulaDisplay || "").trim().replace(/[.?!]+$/u, "")
      : particleAuthorized
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
    const subjectCategory = personalNameNncResultAuthorized
      ? sourceFrame.outerSubject
      : quantitativePredicateAuthorized
      ? sourceFrame.referenceConstitution.subject
      : particleAuthorized
      ? ""
      : relationalNncResultAuthorized
        ? String(sourceFrame.sourceFrame?.subjectId || "3common").trim()
      : adverbialNuclearResultAuthorized
        ? adverbialSubjectCategory
      : canonicalVncTargetParticipant
        ? canonicalVncTargetParticipant.category
      : vncApplicationResultAuthorized || lateVncClosureAuthorized
        ? String(canonicalVncMachineryFrame?.subject || sourceFrame.normalizedRequest?.subject || "").trim()
      : lexicalizedNncInnerSources.has(sourceFrame)
          && consumingLexicalizedNncInnerSources.has(sourceFrame)
        ? sourceFrame.semanticSubjectFrame.category
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
    // §45.2: the adverbialized relational subject has third-singular form
    // without naming an entity. Only its authenticated owner supplies this
    // fact; ordinary relational subjects and VNC voice remain unchanged.
    const nonreferentialRelationalSubject = Boolean(
      relationalNncResultAuthorized
      && sourceFrame.sourceFrame?.subjectMode === "adverbialized"
      && sourceFrame.sourceFrame?.adverbialSubject?.subjectHasReferent
        === false
    );
    // A socially designated place has a relational reference even though its
    // formal subject is adverbialized. Keep that owner distinction at contact.
    const uniqueSocialPlaceReference = Boolean(placeGentilicNncResultAuthorized
      && sourceFrame.constructionKind === "place-name"
      && sourceFrame.finiteFrame?.subjectMode === "adverbialized"
      && sourceFrame.finiteFrame.subjectReference === "unique-socially-designated-place"
      && sourceFrame.finiteFrame.typedSlotFrame?.referentCategory === "unique-social"
      && sourceFrame.finiteFrame.typedSlotFrame.referentCategoryAuthority === "place-name-nnc-owner");
    const normalizedSilentObjectKind = normalizeToken(silentObjectKind);
    const nominalSilentActivation = Boolean(deverbalNncResultAuthorized
      && sourceFrame.operationFrame?.activationLicenseFrame?.silentSpecificObject === true
      && targetObject.getClassicalNahuatlDeverbalNncSlotExternalObject?.(nncSlotFrame)
        ?.silentSpecificObject === true);
    const ownerIssuedSilentSpecificObject = Boolean(
      nominalSilentActivation
      || sourceFrame?.normalizedRequest?.silentSpecificObject === true
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
      (issuedNncSentence ? sourceFrame : null)
      || ((completedNncResultAuthorized || relationalNncResultAuthorized)
        && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sourceFrame.sentenceFrame)
        ? sourceFrame.sentenceFrame : null)
      || sourceFrame?.sentenceSurfaceFrame
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
      || ["question", "yes-no-question", "yes-no-intonation", "yes-no-cuix", "information-question"].includes(sourceSentenceType)
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
    // Full-amount reference belongs to the issued quantitive structure, not
    // to a flat spelling of its independently realized constituents.
    const lexicalCollectiveReference = Boolean(
      pronominalNncResultAuthorized
      && sourceFrame.sourceFrame?.familyId === "quantitive"
      && sourceFrame.sourceFrame?.embedStem === "mo"
      && sourceFrame.sourceFrame?.matrixFamily === "chi"
    );
    const canonicalAntecessiveOrder =
      canonicalVncOutsidePrefixes.includes("ō#");
    const silentAyiLicensed = Boolean(
      silentAyiRequested
      && (nominalSilentActivation || (unitKind === "vnc"
        && /(?:^|-)(?:āyi|ayi)$/u.test(canonicalSourceStem)
        && sourcePerfectiveStem === "āx"))
    );
    const canonicalVncSelectedObjectClusterPresent = Boolean(
      canonicalVncMachineryFrame?.targetObjectClusterFrame
        ?.positions?.length
      || canonicalVncMachineryFrame?.multipleObjectClusterFrame
        ?.positions?.length
      || canonicalVncMachineryFrame?.targetObjectRequests?.length
    );
    const lateSourceAnalysis = lateVncClosureAuthorized
      ? targetObject.buildClassicalNahuatlVncDerivationSourceAnalysisFrame?.(
          canonicalVncMachineryFrame)
      : null;
    const lateParticipantProjection =
      targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame?.(lateSourceAnalysis) === true
        ? {targetObjectRequests: lateSourceAnalysis.participantSurfaceObjectRequests}
        : null;
    const canonicalVncObjectSource = vncApplicationResultAuthorized
      ? canonicalVncSelectedObjectClusterPresent
        ? canonicalVncMachineryFrame
        : sourceFrame.normalizedRequest
      : lateVncClosureAuthorized
        ? canonicalVncSelectedObjectClusterPresent
          ? canonicalVncMachineryFrame
          : lateParticipantProjection || canonicalVncMachineryFrame || sourceFrame
      : sourceFrame;
    const nominalExternalObject = unitKind === "nnc" && !personalNameNncResultAuthorized
      ? targetObject.getClassicalNahuatlDeverbalNncSlotExternalObject?.(slotFrame)
        || targetObject.getClassicalNahuatlNominalConstructionSlotExternalObject?.(slotFrame)
      : null;
    const canonicalObjects = unitKind === "vnc"
      ? getObjectRecords(
          canonicalVncObjectSource,
          slotFrame
        ).map(object => ({
          ...object,
          referenceId: normalizeReferenceId(
            ["reflexive", "mainline-reflexive"].includes(object.objectKind)
              ? normalizedSubjectReferenceId
              : objectReferenceIds?.[object.id]
            || objectReferenceId
            || referenceId
          ),
        }))
      : nominalExternalObject
        ? getObjectRecords({ objectFrame: nominalExternalObject }, slotFrame)
          .map(object => ({ ...object, referenceId: normalizeReferenceId(
            objectReferenceIds?.[object.id] || objectReferenceId || referenceId
          ) }))
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
      : canonicalObjects;
    const possessor = unitKind === "nnc" && !personalNameNncResultAuthorized
      ? (() => {
          const record = getPossessorRecord(sourceFrame, slotFrame,
            relationalNncResultAuthorized && sourceFrame.predicateState === "possessive"
              ? sourceFrame.sourceFrame?.possessorId || "" : "");
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
    const includedPossessor = includedPredicateResult?.operationFrame?.includedPossessor || "";
    // An included possessor is inside the predicate of an absolutive NNC.
    // Keep that contact separate from its outer possessive-state function.
    const embeddedPossessor = includedPossessor ? {
      id:"embedded-possessor",category:includedPossessor,
      features:parsePersonNumber(includedPossessor),
      participantFrame:buildClassicalNahuatlParticipantFrame({role:"possessor",agreement:includedPossessor,
        referenceId:normalizeReferenceId(possessorReferenceId || referenceId)}),
      referenceId:normalizeReferenceId(possessorReferenceId || referenceId),
      embeddedInPredicate:true,canonicalNncOperationFrame:includedPredicateResult.operationFrame,
    } : null;
    const nonanimateAffectiveAgreementFrame = unitKind === "nnc"
      && sourceFrame?.operationFrame?.nonanimateAffectiveAgreementFrame
        ?.authorizationStatus === "authorized"
      ? sourceFrame.operationFrame.nonanimateAffectiveAgreementFrame
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
      transformedImpersonalSubjectDomainEligible: Boolean(transformedImpersonalSubjectDomain),
      impersonalSubjectDomainFrame: transformedImpersonalSubjectDomain,
      ...(personalNameNncResultAuthorized ? {
        personalNamePredicateSource: sourceFrame.typedSlotFrame.downgradedSource,
        personalNameOuterNumber: sourceFrame.outerNumberDyad,
        personalNameInnerSubjectBarrier: sourceFrame.innerSubjectBarrier,
      } : {}),
      ...(quantitativePredicateAuthorized ? {quantitativePredicateFrame:sourceFrame.quantitativePredicateFrame,
        classStatus:'unclaimed',decompositionStatus:'unclaimed',wholeCitation:sourceFrame.sourceFrame.citation} : {}),
      activeActionNncSupplementEligible:
        activeActionNncResultAuthorized,
      activeActionNncSourceKind: activeActionNncResultAuthorized
        ? normalizeToken(sourceFrame.operationFrame.actionKind)
        : "",
      activeActionNncSuffix: activeActionNncResultAuthorized
        ? normalizeToken(sourceFrame.operationFrame.actionSuffix)
        : "",
      activeActionNncExactResultIdentityPreserved:
        activeActionNncResultAuthorized
        && sourceFrame.canonicalResult != null,
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
            ...(uniqueSocialPlaceReference ? {
              referenceKind: sourceFrame.finiteFrame.subjectReference,
              referenceDomain: "place-relation", structuralSubjectMode: "adverbialized",
            } : {}),
            features: {
              ...parsePersonNumber(subjectCategory),
              ...(canonicalVncTargetParticipant ? {
                person: canonicalVncTargetParticipant.person,
                number: canonicalVncTargetParticipant.number,
              } : {}),
              ...(personalNameOuterParticipant ? {
                person: personalNameOuterParticipant.person,
                number: personalNameOuterParticipant.number,
              } : {}),
              specificity: subjectSpecificity,
            },
            participantFrame: personalNameOuterParticipant || buildClassicalNahuatlParticipantFrame({
              role: "subject",
              agreement: subjectCategory,
              animacy: canonicalVncTargetParticipant?.animacy
                || sourceFrame?.normalizedRequest?.sourceSubjectFrame?.animacy
                || slotFrame?.slots?.subject?.participantFrame?.animacy
                || "unspecified",
              humanness: canonicalVncTargetParticipant?.humanness
                || sourceFrame?.normalizedRequest?.sourceSubjectFrame?.humanness
                || slotFrame?.slots?.subject?.participantFrame?.humanness
                || "unspecified",
              ...(canonicalVncTargetParticipant ? {
                number: canonicalVncTargetParticipant.number,
              } : {}),
              specificity: subjectSpecificity,
              referenceId: normalizedSubjectReferenceId,
              impersonal: subjectSpecificity === "nonspecific",
              hasReferent: nonreferentialRelationalSubject ? false : undefined,
            }),
            referenceId: normalizedSubjectReferenceId,
          },
      objects,
      possessor,
      embeddedPossessor,
      sourceStem: canonicalSourceStem,
      callerSourceStem,
      callerSourceStemMatchesCanonical:
        !callerSourceStem || callerSourceStem === canonicalSourceStem,
      callerSourceStemAuthority: false,
      sourcePerfectiveStem,
      directionalPrefix,
      semanticGroup: deriveClauseSemanticGroup(
        sourceFrame,
        canonicalSourceStem,
        canonicalVncMachineryFrame
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
      demonstrativeKind: affectiveDemonstrative
        ? normalizeLexicalStem(affectiveDemonstrativeSource.stem)
        : ["in", "on"].includes(
            normalizeLexicalStem(nncSlotFrame?.slots?.predicate?.stem)
          ) ? normalizeLexicalStem(nncSlotFrame?.slots?.predicate?.stem) : "",
      demonstrativeFormation: affectiveDemonstrative ? "honorific-affective" : "simple",
      affectiveDemonstrativeSourceFrame: affectiveDemonstrative
        ? affectiveDemonstrativeSource : null,
      interrogativeKind:
        (sourceSentenceFrame?.discourseFrame || sourceFrame?.discourseFrame)
          ?.interrogativeReadingActive === false
          ? ""
          : nncSlotFrame?.pronominalSubtype === "quantitive"
          && sourceSentenceFrame?.discourseFrame?.interrogativeReadingActive === true
          ? "quantitive"
          : nncSlotFrame?.pronominalSubtypeDetail === "what-person"
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
      nonanimateAffectiveAgreementFrame,
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
      isAdverbialVnc: adverbialVncResultAuthorized,
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
      || !["nnc", "vnc", "particle", "clause"].includes(frame.unitKind)
      || !frame.referenceId
      || (!["particle", "clause"].includes(frame.unitKind) && !frame.subject?.category)
      || (frame.unitKind === "clause" && (targetObject.isClassicalNahuatlAttestedPrincipalCollocationResult?.(attestedExternalEnvelopeSources.get(frame)) !== true || frame.subject !== null || frame.permittedExternalUse !== "condition-principal"))
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
    if (validatedImmutableClauseEnvelopes.has(frame)) return true;
    const projection = { ...frame };
    delete projection.canonicalSignature;
    const valid = frame.canonicalSignature === signValue(projection, "supplementation-clause");
    if (valid && isDeeplyImmutableDataGraph(frame)) validatedImmutableClauseEnvelopes.add(frame);
    return valid;
  }

  // §§51.2.3, 57.5: a locative adverbial subject is in grammatical
  // harmony with the naming causative's tla. Neither contact becomes an entity.
  function getDesignatingNamingAncestor(source, seen = new Set()) {
    if (!source || seen.has(source)) return null;
    seen.add(source);
    if (targetObject.isClassicalNahuatlDenominalVncResultFrame?.(source) === true) {
      const operation = source.operationFrame;
      const possession = operation.sourceFrame?.priorOperationFrame;
      const nominal = possession?.sourceFrame;
      // The name noun is a lexical fact, while possession + causative are
      // the actual issued derivation. No realized verb string grants this use.
      return operation.operationId === "ti-a-causative-single"
        && possession?.operationId === "possession-ti"
        && nominal?.nounStem === "tōcā-yō"
        && operation.objectCount === 1
        && operation.objectRequests?.[0]?.objectKind === "non-specific-nonhuman"
        ? source : null;
    }
    if (targetObject.isClassicalNahuatlVncSentenceResultFrame?.(source) === true) {
      return getDesignatingNamingAncestor(
        source.vncApplicationFrame || source.lateOperationClosureFrame, seen);
    }
    if (targetObject.isClassicalNahuatlClosureFrame?.(source) === true
      && ["frequentative", "compound"].includes(source.operationFrame?.operation)) {
      return getDesignatingNamingAncestor(source.baseApplicationFrame, seen);
    }
    if (targetObject.isClassicalNahuatlVncApplicationFrame?.(source) === true) {
      const projection = targetObject.getClassicalNahuatlVncContinuationSourceConstituents?.(source);
      return getDesignatingNamingAncestor(projection?.canonicalContinuationSourceResultFrame, seen);
    }
    return null;
  }

  function buildDesignatingLocativeSupplementFrame(
    principalClause, supplementClause, principalHead, supplementContact,
    {referenceMode, headRole, contactRole, principalContinuationFrames = []} = {},
  ) {
    if (referenceMode !== "shared" || headRole !== "object" || contactRole !== "subject"
      || principalClause.unitKind !== "vnc" || supplementClause.unitKind !== "nnc"
      || principalHead?.objectKind !== "nonspecific-nonhuman"
      || principalHead.participantFrame?.specificity !== "nonspecific"
      || supplementContact !== supplementClause.subject
      || supplementContact.participantFrame?.hasReferent !== false
      || !principalHead.referenceId
      || principalHead.referenceId !== supplementContact.referenceId) return null;
    const locative = clauseEnvelopeSources.get(supplementClause);
    if (targetObject.isClassicalNahuatlRelationalResult?.(locative) !== true
      || locative.relationalKind !== "locative"
      || locative.sourceFrame.subjectMode !== "adverbialized"
      || locative.sourceFrame.adverbialSubject?.subjectHasReferent !== false
      || !getNncSlotFrame(locative)) return null;
    const principalSource = clauseEnvelopeSources.get(principalClause);
    const retainedSupplementation = isClassicalNahuatlSupplementationFrame(principalSource)
      ? principalSource
      : Array.from(principalContinuationFrames).find(frame =>
          isClassicalNahuatlSupplementationFrame(frame)
          && frame.principalClause === principalClause
          && frame.referenceFrame.designatingLocativeSupplementFrame) || null;
    const previous = retainedSupplementation?.referenceFrame.designatingLocativeSupplementFrame;
    const naming = previous?.originalNamingResult
      || getDesignatingNamingAncestor(principalSource);
    if (!naming || (previous && (previous.originalNamingObject !== principalHead
      || previous.originalNamingObjectId !== principalHead.id
      || previous.originalNamingReferenceId !== principalHead.referenceId))) return null;
    return Object.freeze({
      kind: "classical-nahuatl-designating-locative-supplement-frame",
      sourceSections: Object.freeze(["51.2.3", "57.5"]),
      relationship: "adverbial-subject-in-harmony-with-naming-causative-tla",
      originalNamingResult: naming,
      originalNamingClause: previous?.originalNamingClause || principalClause,
      originalNamingObject: previous?.originalNamingObject || principalHead,
      originalNamingObjectId: principalHead.id,
      originalNamingReferenceId: principalHead.referenceId,
      canonicalPrincipalSource: principalSource,
      canonicalLocativeResult: locative,
      canonicalLocativeSlot: getNncSlotFrame(locative),
      selectedImperfectPredicateSource: locative.sourceFrame.selectedImperfectPredicateSource || null,
      previousSupplementation: previous ? retainedSupplementation : null,
      principalHead, supplementContact,
      identityUnified: false, nonreferentialLocativePreserved: true,
      ordinaryEntityReferenceClaimed: false,
    });
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
      && (!supplementClause.quantityModifiedNominalCollectiveFrame
        || principalParticipant.features?.person
          === supplementClause.quantityModifiedNominalCollectiveFrame.formalPerson
          && supplementParticipant === supplementClause.subject)
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
    if (
      exceptionKind === "nonanimate-affective-plural-common-head"
      && supplementClause.unitKind === "nnc"
      && supplementClause.nonanimateAffectiveAgreementFrame
        ?.authorizationStatus === "authorized"
      && supplementClause.nonanimateAffectiveAgreementFrame
        ?.supplementHeadMayRemainCommon === true
      && principalParticipant.features?.person === "3"
      && ["common", "singular"].includes(
        principalParticipant.features?.number
      )
      && supplementParticipant.features?.person === "3"
      && supplementParticipant.features?.number === "plural"
    ) {
      return {
        kind: "nonanimate-affective-plural-common-head",
        licensed: true,
        sourceSection: "32.7",
      };
    }
    return {
      kind: exceptionKind,
      licensed: false,
      sourceSection: "",
    };
  }

  function isTypedReflexiveNequiPrincipal(principalClause) {
    const sourceFrame = clauseEnvelopeSources.get(principalClause);
    const applicationAuthorized = Boolean(
      typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(sourceFrame)
    );
    const request = sourceFrame?.normalizedRequest;
    const slotFrame = getVncSlotFrame(sourceFrame);
    const valenceSlots = slotFrame?.slots?.prePredicate?.filter(
      slot => slot.role === "va1-va2"
    ) || [];
    // 19.3.3.c / 21.4: this exact active/reflexive necessity construction
    // takes an included subject. A wish label, displayed monequi, or another
    // reflexive verb does not establish that construction. Keep lexical
    // identity separate from the tense-conditioned predicate realization.
    return Boolean(
      applicationAuthorized
      && principalClause.unitKind === "vnc"
      && String(request?.sourceStem || "").normalize("NFC") === "nequi"
      && request.requestedDerivation === "direct"
      && request.requestedVoice === "active"
      && request.derivationType === "direct"
      && request.targetVoiceOperation === "active"
      && request.targetValence === "mainline-reflexive"
      && request.sourceValence === "mainline-reflexive"
      && request.objectKind === "mainline-reflexive"
      && typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
      && targetObject.isClassicalNahuatlVncSlotFrame(slotFrame)
      && valenceSlots.length === 1
      && valenceSlots[0].va1 === "m"
      && valenceSlots[0].va2 === "o"
    );
  }

  function validateComplementPolicy(principalClause, supplementClause, options) {
    const group = normalizeToken(principalClause.semanticGroup);
    if (!group) {
      return { authorized: true, frame: null };
    }
    const mood = normalizeToken(supplementClause.mood);
    const tense = normalizeToken(supplementClause.tense);
    const completeSupplement = options.supplementContinuationFrames?.at(-1);
    const utterance = isClassicalNahuatlSupplementationFrame(completeSupplement)
      ? buildClassicalNahuatlSupplementationClauseEnvelope(completeSupplement)
      : supplementClause;
    const sentenceKind = normalizeToken(utterance.sentenceKind);
    const realizability = normalizeToken(options.wishRealizability);
    const speechDirectness = normalizeToken(options.speechDirectness);
    const speechAct = {
      assertion: "statement",
      question: "question",
      command: "command",
      wish: "wish",
      exclamation: "exclamation",
    }[sentenceKind] || "";
    const headRole = normalizeToken(options.headRole);
    const reflexiveNequiSubject = group === "wish"
      && headRole === "subject"
      && isTypedReflexiveNequiPrincipal(principalClause);
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
    if (
      objectContentGroups.includes(group)
      && headRole !== "object"
      && !reflexiveNequiSubject
    ) {
      authorized = false;
      blockReason = "included-content-complement-requires-object-head";
    } else if (group === "affect" && headRole !== "subject") {
      authorized = false;
      blockReason = "affect-complement-requires-supplementary-subject";
    }
    if (authorized && (group === "speech" || group === "saying")) {
      authorized = ["direct", "indirect"].includes(speechDirectness)
        && ["statement", "question", "command", "wish", "exclamation"].includes(speechAct);
      // 19.3 contrasts future-indicative reported instructions with
      // Xiquilhui mā oc huālmocuepa, retaining the nonpast optative.
      // The clause owner calls optative clauses wishes; reporting them
      // does not require replacing their issued mood or tense.
    } else if (authorized && group === "wish") {
      if (realizability === "realizable") {
        authorized = (
          (mood === "indicative" && tense === "future")
          || (mood === "optative" && ["nonpast", "future"].includes(tense))
        );
      } else if (realizability === "present-or-future-impossible") {
        // 9.5: an expressed ō# restricts the past optative to a past
        // event; it contradicts an explicitly present/future-only context.
        authorized = mood === "optative"
          && tense === "past"
          && !supplementClause.antecessiveOrder;
      } else if (realizability === "past-counterfactual") {
        // 19.3.3.c says ō# usually precedes this past optative, not that
        // it must. 9.5 explicitly gives the same past regret without ō#.
        authorized = mood === "optative" && tense === "past";
      } else {
        authorized = false;
      }
      blockReason = authorized ? "" : "wish-complement-mood-tense-condition-failed";
    } else if (authorized && group === "perception") {
      // 19.3.3.d describes the ordinary VNC tense, not an exclusive
      // admission condition. The supplement is still a typed clause (19.3),
      // not an arbitrary particle or a caller-provided tense exception.
      authorized = ["nnc", "vnc"].includes(supplementClause.unitKind);
      blockReason = authorized ? "" : "perception-complement-requires-nuclear-clause";
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
        ...(reflexiveNequiSubject ? {
          principalConstruction: {
            kind: "reflexive-nequi-necessity",
            sourceSection: "19.3.3.c",
            reflexiveUseSection: "21.4",
            grammaticalVoice: "active",
            supplementaryRole: "subject",
            admissionAuthority: false,
          },
        } : {}),
        ...(group === "perception" ? {
          tenseUsage: {
            sourceSection: "19.3.3.d",
            scope: "vnc",
            normalTense: "present",
            matchesNormalTense: supplementClause.unitKind === "vnc"
              ? tense === "present"
              : null,
            admissionAuthority: false,
          },
        } : {}),
        ...(group === "wish" && realizability === "past-counterfactual" ? {
          antecessiveUsage: {
            sourceSection: "19.3.3.c",
            usual: true,
            selected: supplementClause.antecessiveOrder === true,
            required: false,
            admissionAuthority: false,
          },
        } : {}),
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

  // Locate the nominal boundary through issued sentence layers, keeping their
  // outer particles outside a migrated antecessive (Andrews §19.3).
  function getNominalAntecessiveOffsets(sourceFrame) {
    if (targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(sourceFrame)) {
      const inner = sourceFrame.contextualNncSentenceFrame || sourceFrame.canonicalInputFrame;
      const offsets = getNominalAntecessiveOffsets(inner);
      const envelope = buildClassicalNahuatlSupplementationClauseEnvelope(inner, {referenceId: "antecessive-boundary"});
      if (!offsets || !isClassicalNahuatlSupplementationClauseEnvelope(envelope)) return null;
      const outerSurface = embedSentenceSurface(sourceFrame.writtenProjection.surface);
      const innerSurface = embedSentenceSurface(envelope.surface);
      const outerFormula = String(sourceFrame.formulaProjection.formula).replace(/[.?!]+$/u, "");
      const innerFormula = String(envelope.formulaRealization).replace(/[.?!]+$/u, "");
      // Particle owners expose the complete consumed clause as the suffix.
      // Refuse a projection that does not preserve that typed boundary.
      if (!outerSurface.endsWith(innerSurface)
        || !outerFormula.toLowerCase().endsWith(innerFormula.toLowerCase())) return null;
      return {
        surface: outerSurface.length - innerSurface.length + offsets.surface,
        formula: outerFormula.length - innerFormula.length + offsets.formula,
      };
    }
    if (targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sourceFrame)) {
      const particles = sourceFrame.sentenceParticles || [];
      const prefixLength = particles.length ? particles.join(" ").length + 1 : 0;
      return { surface: prefixLength, formula: prefixLength };
    }
    return getNncSlotFrame(sourceFrame) ? { surface: 0, formula: 0 } : null;
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

  function getReusableIntervenerProjection(continuation) {
    if (isClassicalNahuatlSupplementationFrame(continuation)
      && continuation.linearizationFrame?.order === "discontinuous"
      && continuation.interveningClauses?.length === 1) {
      return {
        linearizationFrame: continuation.linearizationFrame,
        sharedClause: continuation.interveningClauses[0],
        source: clauseEnvelopeSources.get(continuation.interveningClauses[0]),
      };
    }
    if (targetObject.isClassicalNahuatlResultFrame?.(continuation) !== true
      || continuation.operationKind !== "adjectival-modification"
      || continuation.topology !== "discontinuous"
      || continuation.selectedClauses?.length !== 3) return null;
    const [head, modifier, intervener] = continuation.selectedClauses;
    if (intervener.role !== "intervening-1") return null;
    const tokens = continuation.linearizationTokens.map(token => {
      if (token.kind === "adjunctor") return {role: "adjunctor", surface: token.value};
      return {role: token.clause === head ? "principal"
        : token.clause === intervener ? "intervener-1" : "supplement",
        surface: token.clause.unitSurface};
    });
    const formulaTokens = continuation.linearizationTokens.map((token, index) => ({
      role: tokens[index].role,
      formula: token.kind === "adjunctor" ? token.value : token.clause.formula,
    }));
    return {
      source: intervener.sourceResult,
      sharedClause: intervener,
      linearizationFrame: {
        discontinuousHeadPosition: continuation.order === "discontinuous-head-first" ? "first" : "last",
        tokens, formulaTokens,
      },
    };
  }

  function canReuseClassicalSupplementationIntervener(principalClause, continuation) {
    const profile = getReusableIntervenerProjection(continuation);
    return Boolean(isClassicalNahuatlSupplementationClauseEnvelope(principalClause)
      && profile?.source
      && clauseEnvelopeSources.get(principalClause) === profile.source);
  }

  function getClassicalSupplementationIntervenerSource(continuation) {
    return getReusableIntervenerProjection(continuation)?.source || null;
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
    const requestedSpecificityDomainRestriction = normalizeToken(options.specificityDomainRestriction || "");
    const specificityDomainEligible = referenceMode === "shared"
      && headRole === "subject" && contactRole === "subject"
      && hasTransformedImpersonalSubjectDomain(principalClause)
      && isClassicalNahuatlParticipantFrame(supplementContact?.participantFrame)
      && supplementContact.participantFrame.hasReferent === true
      && supplementContact.participantFrame.specificity === "specific";
    if (requestedSpecificityDomainRestriction && (
      requestedSpecificityDomainRestriction !== "same-entire-group" || !specificityDomainEligible)) {
      return blockedSupplementationFrame("specificity-domain-restriction-requires-transformed-impersonal-head-and-specific-subject", {principalClause, supplementClause});
    }
    if (specificityDomainEligible && !requestedSpecificityDomainRestriction) {
      return blockedSupplementationFrame("specificity-domain-same-entire-group-context-required", {principalClause, supplementClause});
    }
    const specificityDomainRestrictionFrame = specificityDomainEligible
      && requestedSpecificityDomainRestriction === "same-entire-group"
      ? Object.freeze({
        kind: "classical-nahuatl-supplementation-specificity-domain-restriction-frame",
        relationship: "nonspecific-head-domain-restricted-by-specific-supplement",
        sourceSection: "57.4.3a", explicitContext: "same-entire-group",
        sameEntireExtralinguisticGroup: true, partialOverlapAllowed: false,
        principalClause, supplementClause, principalHead, specificSupplement: supplementContact,
        principalSubjectDomain: principalClause.impersonalSubjectDomainFrame,
        canonicalPrincipalSource: clauseEnvelopeSources.get(principalClause),
        canonicalSupplementSource: clauseEnvelopeSources.get(supplementClause),
        identityUnified: false, targetRemainsNonreferential: true,
        sourceActorReclassified: false, specificSupplementPersonNumberPreserved: true,
      }) : null;
    const designatingLocativeSupplementFrame = buildDesignatingLocativeSupplementFrame(
      principalClause, supplementClause, principalHead, supplementContact,
      {referenceMode, headRole, contactRole,
        principalContinuationFrames: Array.isArray(options.principalContinuationFrames)
          ? options.principalContinuationFrames : []},
    );
    if (!designatingLocativeSupplementFrame
      && ((!absoluteTopicContext && !specificityDomainRestrictionFrame && principalHead.participantFrame?.hasReferent === false)
        || (["shared", "absolute-topic"].includes(referenceMode)
          && supplementContact?.participantFrame?.hasReferent === false))) {
      return blockedSupplementationFrame(
        "lesson22-impersonal-subject-cannot-be-supplemented",
        { principalClause, supplementClause },
      );
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
      && !principalClause.objects?.length
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
      // The included clause supplies singular reference (Andrews §19.3).
      // A nonanimate common-number head can carry that reference; an overt
      // plural or a first/second-person head cannot.
      && !areClassicalNahuatlPersonNumberFeaturesCompatible(
        principalHead.features,
        { person: "3", number: "singular" }
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
      supplementClause.nonanimateAffectiveAgreementFrame
        ?.supplementAgreementExceptionKind
        === "nonanimate-affective-plural-common-head"
        ? "nonanimate-affective-plural-common-head"
        // Ac is morphologically frozen in 3sg; its shared referent can be
        // plural with a verbal or nominal principal (Andrews 19.2.2).
        : supplementClause.interrogativeKind === "ac"
          && supplementContact === supplementClause.subject
          && principalHead.features?.number === "plural"
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
    // Independently captured constructions own local referent identities.
    // An explicit shared relation joins their selected contacts without
    // rewriting either issued inner construction or its other participants.
    const capturedContinuationContactsJoined = referenceMode === "shared"
      && [
        [options.principalContinuationFrames, principalClause],
        [options.supplementContinuationFrames, supplementClause],
      ].every(([frames, clause]) => Array.isArray(frames)
        && frames.length > 0
        && frames.every(frame => isClassicalNahuatlSupplementationFrame(frame)
          && frame.principalClause === clause));
    const sharedReferencesMatch = principalHead.referenceId
      === supplementContact?.referenceId || capturedContinuationContactsJoined;
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
      && !specificityDomainRestrictionFrame
      && !designatingLocativeSupplementFrame
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
        || !(order === "supplement-first"
          || (order === "discontinuous"
            && (options.discontinuousHeadPosition || "last") === "last"))
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
      && (entry.frame.principalClause.canonicalSignature === entry.expectedSignature
        // A whole wrapper can additionally expose an unconsumed contact in
        // its retained modifier. Its principal predicate/valence stays intact.
        || (() => {
          const clause = entry.attachTo === "principal" ? principalClause : supplementClause;
          return clauseEnvelopeSources.get(clause) === entry.frame
            && clause.objects.some(object => object.nestedObjectContactFrame);
        })())
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
    // Meaning belongs to an occurrence in the issued clause graph. Preserve
    // ambiguous immutable parents; authentic distribution resolves them here.
    const affectiveOccurrences = [];
    const seenContextClauses = new Set();
    const seenContextRelations = new Set();
    let frequentativeParent = null;
    const unwrapContextResult = source => {
      if (targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(source)) {
        return unwrapContextResult(source.contextualNncSentenceFrame || source.canonicalInputFrame);
      }
      if (targetObject.isClassicalNahuatlVncSentenceResultFrame?.(source)) {
        return unwrapContextResult(source.vncApplicationFrame || source.lateOperationClosureFrame);
      }
      return source;
    };
    const collectAffectiveOccurrence = clause => {
      if (!isClassicalNahuatlSupplementationClauseEnvelope(clause)
        || seenContextClauses.has(clause)) return;
      seenContextClauses.add(clause);
      const sourceResult = clauseEnvelopeSources.get(clause);
      const nominal = unwrapContextResult(sourceResult);
      if (targetObject.isClassicalNahuatlNominalConstructionResult?.(nominal)
        && nominal.constructionKind === "affective-nnc"
        && nominal.sourceFrame?.nonanimateReduplicationAnalysisFrame?.authorizationStatus === "authorized") {
        affectiveOccurrences.push({clause, sourceResult, nominal,
          analysisFrame: nominal.sourceFrame.nonanimateReduplicationAnalysisFrame});
      }
    };
    const sharedObjectRelation = frame => isClassicalNahuatlSupplementationFrame(frame)
      && frame.referenceFrame.referenceMode === "shared"
      && frame.referenceFrame.headRole === "object"
      && frame.referenceFrame.supplementContactRole === "subject";
    const collectContextPrincipal = clause => {
      const source = unwrapContextResult(clauseEnvelopeSources.get(clause));
      if (sharedObjectRelation(source)) {
        collectContextRelation(source);
      } else if (targetObject.isClassicalNahuatlClosureFrame?.(source)
        && source.operationFrame?.operation === "frequentative"
        && source.operationFrame.variant === "ordinary-short-glottal") frequentativeParent = source;
    };
    const collectContextRelation = frame => {
      if (!sharedObjectRelation(frame) || seenContextRelations.has(frame)) return;
      seenContextRelations.add(frame);
      collectAffectiveOccurrence(frame.supplementClause);
      collectContextPrincipal(frame.principalClause);
      frame.principalContinuationFrames.forEach(collectContextRelation);
    };
    if (referenceMode === "shared" && headRole === "object"
      && contactRole === "subject") {
      collectAffectiveOccurrence(supplementClause);
      collectContextPrincipal(principalClause);
      principalContinuationFrames.forEach(collectContextRelation);
    }
    const distributiveQuantityParents = affectiveOccurrences.map(({nominal}) => (
      nominal.operationFrame?.quantitiveEmbedAllomorphFrame?.parentResult
    )).filter(parent => targetObject.isClassicalNahuatlPronominalNncResult?.(parent)
      && parent.sourceFrame?.familyId === "quantitive"
      && parent.operationFrame?.internalReduplicationFrame?.copiedMorpheme === "iz");
    const contextImposesDistribution = Boolean(frequentativeParent || distributiveQuantityParents.length);
    if (contextImposesDistribution && affectiveOccurrences.some(({analysisFrame}) => (
      analysisFrame.selectedReading === "affinity"
    ))) return blockedSupplementationFrame(
      "affective-supplement-reading-conflicts-with-issued-context", {principalClause, supplementClause});
    const affectiveSupplementContextFrame = contextImposesDistribution && affectiveOccurrences.length
      ? freezeDeep({kind: "classical-nahuatl-affective-supplement-context-frame",
          sourceSection: "32.7", imposedReading: "distributive-varietal",
          frequentativeParent, distributiveQuantityParents,
          occurrences: affectiveOccurrences.map(({clause, sourceResult, nominal, analysisFrame}) => ({
            clause, sourceResult, nominalParent: nominal, originalAnalysisFrame: analysisFrame,
            selectedReading: "distributive-varietal", parentUnchanged: true,
          })), userSelectableGrammar: false, callerEvidenceAuthority: false}) : null;
    const immediatePrincipalRelation = principalContinuationFrames.at(-1)
      || unwrapContextResult(clauseEnvelopeSources.get(principalClause));
    const parallelSupplementBoundaryFrame = order === "supplement-first"
      && sharedObjectRelation(immediatePrincipalRelation)
      && immediatePrincipalRelation.linearizationFrame.order === "supplement-first"
      && affectiveOccurrences.some(({clause}) => clause === supplementClause)
      && affectiveOccurrences.some(({clause}) => clause === immediatePrincipalRelation.supplementClause)
      && affectiveSupplementContextFrame
      && affectiveOccurrences.length > 1
      ? freezeDeep({kind: "classical-nahuatl-parallel-supplement-boundary-frame",
          sourceSection: "32.7", boundary: ",", order: "supplement-first",
          referenceMode: "shared", headRole: "object", contactRole: "subject",
          occurrences: affectiveOccurrences.map(({clause}) => clause),
          retainedParallelRelation: immediatePrincipalRelation,
          formulaUnchanged: true, userSelectableGrammar: false}) : null;
    const additionalSharedContacts = [];
    const requestedAdditionalContacts = options.additionalSharedContacts || [];
    if (!Array.isArray(requestedAdditionalContacts)) {
      return blockedSupplementationFrame("additional-shared-contacts-must-be-array", { principalClause, supplementClause });
    }
    const nestedPrincipalClauses = new Set();
    const collectPrincipalContacts = frames => {
      for (const frame of frames) {
        nestedPrincipalClauses.add(frame.principalClause);
        nestedPrincipalClauses.add(frame.supplementClause);
        collectPrincipalContacts(frame.principalContinuationFrames || []);
        collectPrincipalContacts(frame.supplementContinuationFrames || []);
      }
    };
    collectPrincipalContacts(principalContinuationFrames);
    const selectedAdditionalClauses = new Set();
    for (const selection of requestedAdditionalContacts) {
      const clause = selection?.clause;
      if (referenceMode !== "shared" || selection?.role !== "possessor"
        || !nestedPrincipalClauses.has(clause)
        || !isClassicalNahuatlSupplementationClauseEnvelope(clause)
        || !clause.possessor || selectedAdditionalClauses.has(clause)) {
        return blockedSupplementationFrame("additional-shared-contact-requires-distinct-issued-nested-possessor", { principalClause, supplementClause });
      }
      const participant = clause.possessor;
      const sameFeatures = participant.features?.person === supplementContact.features?.person
        && participant.features?.number === supplementContact.features?.number;
      const extraAgreement = sameFeatures ? null : validateAgreementException({
        exceptionKind,
        principalParticipant: participant,
        supplementParticipant: supplementContact,
        principalClause: clause,
        supplementClause,
      });
      if (!sameFeatures && !extraAgreement?.licensed) {
        return blockedSupplementationFrame("additional-shared-contact-person-number-mismatch", { principalClause, supplementClause });
      }
      selectedAdditionalClauses.add(clause);
      additionalSharedContacts.push({
        headRole: "possessor", principalClause: clause, principalHead: participant,
        supplementContact, principalReferenceId: participant.referenceId,
        supplementReferenceId: supplementContact.referenceId,
        referenceRelationship: "identical", agreementException: extraAgreement,
        constituentIdentitiesPreserved: true,
      });
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

    const discontinuousHeadPosition = options.discontinuousHeadPosition || "last";
    if (!["first", "last"].includes(discontinuousHeadPosition)) {
      return blockedSupplementationFrame("discontinuous-head-position-not-licensed",
        { principalClause, supplementClause });
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
    const nestedSupplementSurface = supplementContinuationFrames.at(-1)?.embeddedSurface
      || embedSentenceSurface(supplementContinuationFrames.at(-1)?.surfaceRealization)
      || baseSupplementSurface;
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
    const nestedPrincipalSurface = principalContinuationFrames.at(-1)?.embeddedSurface
      || embedSentenceSurface(principalContinuationFrames.at(-1)?.surfaceRealization)
      || basePrincipalSurface;
    const nestedPrincipalFormula = String(
      principalContinuationFrames.at(-1)?.formulaRealization
      || basePrincipalFormula
      || ""
    ).trim();
    const nominalAntecessiveOffsets = includedAntecessiveJump
      ? getNominalAntecessiveOffsets(clauseEnvelopeSources.get(principalClause))
      : null;
    if (includedAntecessiveJump && !nominalAntecessiveOffsets) {
      return blockedSupplementationFrame("included-antecessive-nominal-boundary-required",
        { principalClause, supplementClause });
    }
    const principalToken = includedAntecessiveJump
      ? nestedPrincipalSurface.slice(0, nominalAntecessiveOffsets.surface)
        + "ō" + nestedPrincipalSurface.slice(nominalAntecessiveOffsets.surface)
      : nestedPrincipalSurface;
    const principalFormula = includedAntecessiveJump
      ? nestedPrincipalFormula.slice(0, nominalAntecessiveOffsets.formula)
        + joinExternalFormulaPrefix("ō#", nestedPrincipalFormula.slice(nominalAntecessiveOffsets.formula))
      : nestedPrincipalFormula;
    const reusedContinuation = options.reusePrincipalIntervener === true
      ? supplementContinuationFrames.at(-1) || clauseEnvelopeSources.get(supplementClause) : null;
    const reusedProfile = getReusableIntervenerProjection(reusedContinuation);
    if (options.reusePrincipalIntervener === true && !(
      referenceMode === "shared" && headRole === "subject"
      && contactRole === "subject"
      && order === (reusedProfile?.linearizationFrame.discontinuousHeadPosition === "first"
        ? "supplement-first" : "principal-first")
      && principalContinuationFrames.length === 0
      && canReuseClassicalSupplementationIntervener(principalClause, reusedContinuation)
    )) {
      return blockedSupplementationFrame(
        "shared-intervener-requires-exact-discontinuous-subject-continuation",
        { principalClause, supplementClause }
      );
    }
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
      if (discontinuousHeadPosition === "first") {
        tokens.push({ role: "principal", surface: principalToken });
        formulaTokens.push({ role: "principal", formula: principalFormula });
      } else appendSupplement();
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
      if (discontinuousHeadPosition === "first") appendSupplement();
      else {
        tokens.push({ role: "principal", surface: principalToken });
        formulaTokens.push({ role: "principal", formula: principalFormula });
      }
    }
    if (reusedContinuation) {
      // Reuse the issued occurrence, retaining the inner relation's order.
      // The outer marker and integrated antecessive belong to the inner head.
      const inner = reusedProfile.linearizationFrame;
      tokens.splice(0, tokens.length, ...inner.tokens.map(token => integratedAntecessive
        ? token.role === "principal" ? { ...token, surface: `ō${token.surface}` }
          : token.role === "intervener-1" ? { ...token, surface: principalToken } : token
        : token).flatMap(token => (
        token.role === "principal" && adjunctor === "in"
          ? [{ role: "outer-adjunctor", surface: "in" }, token] : [token]
      )));
      formulaTokens.splice(0, formulaTokens.length,
        ...inner.formulaTokens.map(token => integratedAntecessive
          ? token.role === "principal"
            ? { ...token, formula: joinExternalFormulaPrefix("ō#", token.formula) }
            : token.role === "intervener-1" ? { ...token, formula: principalFormula } : token
          : token).flatMap(token => (
          token.role === "principal" && adjunctor === "in"
            ? [{ role: "outer-adjunctor", formula: "in" }, token] : [token]
        )));
    }
    const punctuation = informationQuestion || principalClause.sentenceKind === "question"
      ? "?" : principalClause.sentenceKind === "exclamation" ? "!" : ".";
    const directSpeech = complementPolicy.frame?.speechDirectness === "direct";
    const quotedSentenceKind = complementPolicy.frame?.supplementSentenceKind
      || supplementClause.sentenceKind;
    const quotedPunctuation = quotedSentenceKind === "question"
      ? "?" : quotedSentenceKind === "exclamation" ? "!" : ".";
    const renderedTokens = tokens.map((token, index) => {
      if (directSpeech && ["supplement", "topic-supplement"].includes(token.role)) {
        return `"${capitalizeSentence(token.surface, quotedPunctuation)}"`;
      }
      // The optional adjunctor already marks the quotation boundary (§19.3.3.a).
      const beforeQuotation = directSpeech
        && ["supplement", "topic-supplement"].includes(tokens[index + 1]?.role)
        && token.role !== "adjunctor";
      const beforeParallelSupplement = parallelSupplementBoundaryFrame
        && ["supplement", "topic-supplement"].includes(token.role)
        && tokens[index + 1]?.role === "principal";
      return `${token.surface}${beforeQuotation || beforeParallelSupplement ? "," : ""}`;
    });
    const unpunctuatedSurface = renderedTokens.join(" ");
    const endsInQuotation = directSpeech
      && ["supplement", "topic-supplement"].includes(tokens.at(-1)?.role);
    const surfaceRealization = capitalizeSentence(
      unpunctuatedSurface,
      endsInQuotation ? "" : punctuation
    );
    const formulaRealization = formulaTokens
      .map(token => token.formula)
      .filter(Boolean)
      .join(" + ");
    const referenceFrame = freezeDeep({
      kind: "classical-nahuatl-supplementation-reference-frame",
      additionalSharedContacts,
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
      capturedContinuationContactsJoined,
      specificityDomainRestrictionFrame,
      ...(designatingLocativeSupplementFrame ? {designatingLocativeSupplementFrame} : {}),
      referenceIdentityUnified: referenceMode === "shared"
        ? !specificityDomainRestrictionFrame && !designatingLocativeSupplementFrame && sharedReferencesMatch
        : false,
      referenceRelationship: designatingLocativeSupplementFrame
        ? designatingLocativeSupplementFrame.relationship
        : specificityDomainRestrictionFrame
        ? specificityDomainRestrictionFrame.relationship
        : sharedReferenceExceptionLicensed
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
      && supplementClause.demonstrativeFormation !== "honorific-affective"
      && ["in", "on"].includes(supplementClause.demonstrativeKind)
    )
      ? (() => {
          const principalWritten = principalClause.surface;
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
    // A writing witness, never a substitute for the two owner-issued clauses.
    // Andrews §32.5 writes the zero-root i-h / qu-eh principal without h,
    // followed solid by the quantity-unmarked honorific demonstrative.
    const honorificExistentialSpellingFrame =
      pronominalPluralCooperationAuthorized
      && pronominalPluralFrame?.zeroRootPrincipal
      && pronominalPluralFrame.route === "demonstrative"
      && supplementClause.demonstrativeFormation === "honorific-affective"
      && referenceMode === "shared"
      && headRole === "subject" && contactRole === "subject"
      && order === "principal-first" && adjunctor === "none"
      && principalClause.surface === principalClause.nuclearSurface
      && supplementClause.surface === supplementClause.nuclearSurface
        ? freezeDeep({
            kind: "classical-nahuatl-honorific-existential-spelling-frame",
            sourceSection: "32.5",
            separatedSurface: surfaceRealization,
            traditionalSolidSurface: `ique${supplementClause.nuclearSurface
              .normalize("NFD").replace(/\p{M}+/gu, "")}`,
            grammaticalRelationPreserved: true,
            spellingProjectionAuthority: "typed-zero-root-honorific-cooperation",
            userSelectableGrammar: false,
          })
        : null;
    const principalSpellingSlot = getNncSlotFrame(principalOperationSourceFrame);
    const supplementSpellingSlot = getNncSlotFrame(
      clauseEnvelopeSources.get(supplementClause));
    const interrogativePersonalSupplementSpellingFrame =
      order === "principal-first" && referenceMode === "shared"
      && headRole === "subject" && contactRole === "subject" && adjunctor === "none"
      && principalSpellingSlot?.pronominalSubtypeDetail === "which-entity"
      && principalSpellingSlot?.slots?.number?.num1 === "tl"
      && principalSpellingSlot?.slots?.number?.num2 === "0"
      && supplementSpellingSlot?.pronominalSubtypeDetail === "personal-simple-eh"
      && supplementSpellingSlot?.slots?.subject?.subject === "3common"
      && supplementSpellingSlot?.slots?.subject?.pers1 === "0"
      && supplementSpellingSlot?.slots?.subject?.pers2 === "0"
      && supplementSpellingSlot?.slots?.number?.num1 === "0"
      && supplementSpellingSlot?.slots?.number?.num2 === "0"
      && principalClause.surface === principalClause.nuclearSurface
      && supplementClause.surface === supplementClause.nuclearSurface
        ? freezeDeep({
            kind: "classical-nahuatl-interrogative-personal-supplement-spelling-frame",
            sourceSection: "18.2",
            separatedSurface: surfaceRealization,
            fusedSurface: `${principalClause.nuclearSurface}${supplementClause.nuclearSurface}`,
            grammaticalRelationPreserved: true,
            spellingProjectionAuthority: "typed-interrogative-personal-supplement",
            userSelectableGrammar: false,
          })
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
      supplementClause.activeActionNncSupplementEligible
        && referenceMode === "shared"
        && headRole === "object"
        && contactRole === "subject"
        ? {
            kind:
              "classical-nahuatl-action-nnc-supplementary-object-frame",
            sourceSection: "37.7",
            relation: "supplementary-object",
            supplementSourceKind:
              supplementClause.activeActionNncSourceKind,
            actionSuffix: supplementClause.activeActionNncSuffix,
            exactOwnerIssuedActionNncResultPreserved:
              supplementClause
                .activeActionNncExactResultIdentityPreserved === true,
            sharedReferentId: supplementContact.referenceId,
            principalParticipantRole: headRole,
            supplementParticipantRole: contactRole,
            sharedSupplementationOwnerReused: true,
            separateLesson37SupplementationEngineCreated: false,
            acyclicHierarchyRequired: true,
            nounstemIdentityAuthorizesRelation: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          }
        : null,
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
      honorificExistentialSpellingFrame,
      reusedContinuation ? {
        kind: "classical-nahuatl-shared-intervener-frame",
        sourceSection: "18.4",
        reusedContinuation,
        sharedClause: reusedProfile.sharedClause,
        exactSourceIdentityRequired: true,
      } : null,
      interrogativePersonalSupplementSpellingFrame,
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
      specificityDomainRestrictionFrame || referentConditionedAgreement || agreementException?.licensed
        ? {
            kind:
              "classical-nahuatl-referent-conditioned-agreement-frame",
            sourceSection: "57.4",
            mismatchDimensions,
            agreementExceptionKind: agreementException?.kind || "",
            agreementExceptionSourceSection:
              agreementException?.sourceSection || "",
            sameExtralinguisticReferent: Boolean(specificityDomainRestrictionFrame) || sharedReferencesMatch,
            specificityDomainRestrictionFrame,
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
        discontinuousHeadPosition: order === "discontinuous" ? discontinuousHeadPosition : null,
        interveningClauseCount: interveners.length,
      },
      {
        kind: "classical-nahuatl-supplementation-adjunctor-frame",
        adjunctor,
        fusesWithDemonstrative: fusedAdjunctor,
        affectsPredicateDeterminacy: false,
        ...(supplementClause.demonstrativeFormation === "honorific-affective"
          ? {
              honorificDemonstrative: true,
              expandedDemonstrativeSurface: `in ${embedSentenceSurface(supplementClause.surface)}`,
              fusedDemonstrativeSurface: `in${embedSentenceSurface(supplementClause.surface)}`,
              traditionalFusedDemonstrativeSurface: `in${embedSentenceSurface(supplementClause.surface)}`
                .normalize("NFD").replace(/\u0304/g, "").normalize("NFC"),
              spellingSourceSection: "32.3",
              userSelectableGrammar: false,
            } : {}),
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
      affectiveSupplementContextFrame,
    ].filter(Boolean);
    const linearizationFrame = freezeDeep({
      kind: "classical-nahuatl-supplementation-linearization-frame",
      order,
      discontinuousHeadPosition: order === "discontinuous" ? discontinuousHeadPosition : null,
      tokens,
      formulaTokens,
      formulaRealization,
      surfaceRealization,
      punctuation,
      parallelSupplementBoundaryFrame,
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
      embeddedSurface: unpunctuatedSurface,
      principalContinuationFrames,
      supplementContinuationFrames,
      interveningClauses: interveners,
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
    const frame = issueFrame(issuedSupplementationFrames, {
      ...projection,
      canonicalSignature: signValue(projection, "supplementation-frame"),
    });
    const snapshot = value => {
      if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
      return Object.freeze(Array.isArray(value) ? value.map(snapshot)
        : Object.fromEntries(Object.entries(value).map(([key, child]) => [key, snapshot(child)])));
    };
    supplementationReloadInputs.set(frame, Object.freeze({principalClause, supplementClause,
      options: snapshot({...options})}));
    return frame;
  }

  function getClassicalNahuatlSupplementationReloadInputs(frame = null) {
    return isClassicalNahuatlSupplementationFrame(frame)
      ? supplementationReloadInputs.get(frame) || null : null;
  }

  // Retain original relation inputs when replacing one authenticated child.
  // This issues no Result: preview and explicit Make evaluate the same request.
  function buildClassicalNahuatlSupplementationReplacementRequest(parent, role, replacement) {
    const inputs = getClassicalNahuatlSupplementationReloadInputs(parent);
    if (!inputs || !["principal", "adjoined"].includes(role)) return null;
    const key = role === "principal" ? "principalClause" : "supplementClause";
    const continuationKey = role === "principal" ? "principalContinuationFrames" : "supplementContinuationFrames";
    const previous = inputs[key];
    const continuations = inputs.options[continuationKey] || [];
    // Multiple independent continuations need a separate occurrence contract.
    if (continuations.length > 1) return null;
    const oldSource = continuations[0] || clauseEnvelopeSources.get(previous);
    if (!oldSource || !replacement) return null;
    let next = previous;
    let options = inputs.options;
    if (replacement !== oldSource) {
      next = buildClassicalNahuatlSupplementationClauseEnvelope(replacement, {
        ...previous.callerDerivedFacts,
        referenceId: previous.referenceId,
        subjectReferenceId: previous.subject?.referenceId || "",
        objectReferenceIds: Object.fromEntries(previous.objects.map(object => [object.id, object.referenceId])),
        possessorReferenceId: previous.possessor?.referenceId || "",
        contextRecords: previous.contextRecords,
      });
      if (!isClassicalNahuatlSupplementationClauseEnvelope(next)) return null;
      if (continuations.length) {
        if (!isClassicalNahuatlSupplementationFrame(replacement)) return null;
        // A continued relation's exact principal envelope is its contact.
        next = replacement.principalClause;
        options = {...options, [continuationKey]: [replacement]};
      }
    }
    return buildClassicalNahuatlSupplementationOperationRequest({operationKind: "relation",
      principalClause: key === "principalClause" ? next : inputs.principalClause,
      supplementClause: key === "supplementClause" ? next : inputs.supplementClause,
      options});
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
    // Andrews 58.4–58.6 restricts the principal's lexical/construction
    // identity. Neither a written suffix nor quantity-folded display text
    // establishes that identity. Read the privately bound Source instead.
    const source = clauseEnvelopeSources.get(principalClause);
    if (!source) return "";
    const ownedBy = validator => typeof targetObject[validator] === "function"
      && targetObject[validator](source);
    const exact = value => String(value || "").normalize("NFC");
    let identity = "";
    let negative = false;
    if (ownedBy("isClassicalNahuatlRelationalResult")) {
      const facts = source.sourceFrame;
      if (
        facts.stemId === "n-locative"
        && facts.option === "option-two"
        && facts.sourceKind === "interrogative-empty"
        && facts.formationId === "can-interrogative"
        && facts.state === "absolutive"
        && facts.subjectMode === "adverbialized"
      ) identity = "can";
      if (
        facts.stemId === "c-means-purpose-reason-time"
        && facts.option === "option-one"
        && facts.sourceKind === "possessor"
        && facts.state === "possessive"
        && facts.possessorId === "3common"
        && facts.subjectMode === "adverbialized"
        && facts.relationalFunction === "time"
      ) identity = "ic";
      negative = facts.negative === true;
    } else if (ownedBy("isClassicalNahuatlAdverbialNuclearResult")) {
      // This owner's lexicalized iuh is the preterit VNC of 58.6;
      // an NNC merely spelled iuh is not the same construction.
      if (
        source.scope === "external-clause"
        && source.sourceFrame?.clauseKind === "vnc"
        && exact(source.sourceFrame?.stem) === "iuh"
        && source.lexicalAuthorizationFrame?.family === "lexicalized-vnc"
      ) identity = "iuh";
    } else {
      const slotFrame = getNncSlotFrame(source);
      if (
        typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
        && targetObject.isClassicalNahuatlNncSlotFrame(slotFrame)
      ) {
        const stem = exact(slotFrame.slots.predicate.stem);
        // Exact whole lexical predicates, including the lexicalized
        // preterit-agentive NNC iuhqui, remain valid typed Sources.
        identity = {
          "āc": "ac", "tleh": "tleh", "tl-eh": "tleh",
          "cān": "can", "īc": "ic", "iuhqui": "iuhqui",
          "ayāc": "ayac", "ahtleh": "ahtleh",
          "ahcān": "ahcan", "aīc": "aic",
        }[stem] || "";
        if (
          !identity
          && targetObject.isClassicalNahuatlIssuedDeverbalNncSlotFrame?.(
            slotFrame
          ) === true
          && slotFrame.nncFamily === "preterit-agentive"
          && slotFrame.resultOperationId
            === "predicate-nominalization:preterit-agentive"
          && stem === "iuh-0"
        ) {
          // Andrews 53.1.7 and 58.6 identify the issued (iuh-Ø)-qui
          // construction. Its predicate and number occupy separate typed
          // slots; no display spelling establishes the lexical identity.
          identity = "iuhqui";
        }
        if (
          stem === "ā-0"
          && slotFrame.pronominalSubtype === "interrogative"
          && slotFrame.pronominalSubtypeDetail === "what-person"
          && slotFrame.slots.number.num1 === "c"
        ) identity = "ac";
        if (
          ownedBy("isClassicalNahuatlPronominalNncResult")
          || ownedBy("isClassicalNahuatlOrdinaryNncResult")
        ) negative = source.operationFrame?.polarity === "negative";
        else if (ownedBy("isClassicalNahuatlIssuedNncSentenceSurfaceFrame")) {
          negative = source.polarity === "negative";
        }
      }
    }
    return negative
      ? negativeIdentityByPositiveIdentity[identity] || identity
      : identity;
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
      ahcan: "ahcān",
      aic: "aīc",
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

  function hasTypedVocativeSilentPluralIn(nncClause = null) {
    // The envelope's private Source binding preserves the NNC slots even when
    // the captured Result is sentence-only. Written endings do not license
    // the optional num2 realization (Andrews 18.11).
    const slotFrame = getNncSlotFrame(clauseEnvelopeSources.get(nncClause));
    return Boolean(
      typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
      && targetObject.isClassicalNahuatlNncSlotFrame(slotFrame)
      && slotFrame.slots.subject.subject === "3pl"
      && slotFrame.slots.state.arity === "vacant"
      && slotFrame.slots.number.num1 === "t"
      && slotFrame.slots.number.num2 === "in"
    );
  }

  function hasTypedVocativeFinalGlottal(
    nncClause = null,
    { silentPluralIn = false } = {}
  ) {
    const slotFrame = getNncSlotFrame(clauseEnvelopeSources.get(nncClause));
    if (
      typeof targetObject.isClassicalNahuatlNncSlotFrame !== "function"
      || !targetObject.isClassicalNahuatlNncSlotFrame(slotFrame)
      || typeof targetObject.buildClassicalNahuatlDerivationalBoundarySpellingFrame
        !== "function"
      || (silentPluralIn && !hasTypedVocativeSilentPluralIn(nncClause))
    ) {
      return false;
    }
    const { subject, participant, state, predicate, number } = slotFrame.slots;
    const carriers = [
      subject.pers1,
      subject.pers2,
      ...(participant?.slots || []).map(slot => slot.carrier),
      ...state.slots.map(slot => slot.carrier),
      predicate.stem,
      number.num1,
      silentPluralIn ? "⎕" : number.num2,
    ];
    const finalCarrier = carriers
      .flatMap(carrier => String(carrier || "").split("-"))
      .map(carrier => carrier.trim())
      .filter(carrier => carrier && !["0", "Ø", "⎕"].includes(carrier))
      .at(-1);
    // Lesson 2 segments typed morphs, not the displayed NNC: h is the glottal
    // spelling, whereas uh and ch are distinct single-consonant digraphs.
    // A sounded number morph takes precedence over the predicate's ending.
    if (!finalCarrier) return false;
    const boundaryFrame =
      targetObject.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
        sourceStem: finalCarrier,
        retainedStem: finalCarrier,
        followingMorpheme: "e",
      });
    return boundaryFrame?.authorizationStatus === "authorized"
      && boundaryFrame.underlyingFinalConsonant === "h";
  }

  function getTypedVocativeSupportiveIAnalysis(nncClause = null) {
    const slotFrame = getNncSlotFrame(clauseEnvelopeSources.get(nncClause));
    return typeof targetObject.getClassicalNahuatlNncFinalSupportiveIAnalysis
      === "function"
      ? targetObject.getClassicalNahuatlNncFinalSupportiveIAnalysis(slotFrame)
      : null;
  }

  function buildClassicalNahuatlVocativeFrame(
    nncClause = null,
    {
      discourseSourceContextFrame = null,
      glottalVariant = "retain",
      finalIRealization = "",
      silentPluralIn = false,
      companionClause = null,
      companionOrder = "clause-first",
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
    if ((companionClause !== null
      && !isClassicalNahuatlSupplementationClauseEnvelope(companionClause))
      || !["clause-first", "vocative-first"].includes(companionOrder)) {
      return freezeDeep({
        kind: "classical-nahuatl-vocative-frame",
        authorizationStatus: "blocked",
        blockReason: "vocative-companion-requires-issued-clause-and-valid-order",
        surfaceRealization: "",
      });
    }
    let base = nncClause.surface;
    let formulaRealization = nncClause.formulaRealization;
    const exactVocativeParent = clauseEnvelopeSources.get(nncClause);
    const selectedFinalI = normalizeToken(finalIRealization);
    const finalIFacts = gender === "male"
      ? targetObject.getClassicalNahuatlCustomaryAgentiveFinalIBoundaryFacts?.(
        exactVocativeParent, { useKind: "vocative" },
      ) : null;
    if (selectedFinalI && (selectedFinalI !== "preserve"
      && (selectedFinalI !== "drop" || finalIFacts?.authorizationStatus !== "authorized"
        || finalIFacts.canonicalParentResult !== exactVocativeParent
        || !finalIFacts.availableRealizations?.includes("drop")))) {
      return freezeDeep({
        kind: "classical-nahuatl-vocative-frame",
        authorizationStatus: "blocked",
        blockReason: "vocative-final-i-realization-not-licensed-for-exact-source",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    // Preserve the complete nominal Sentence when no optional ni/#é boundary
    // is offered. Its ordinary realization retains overt number carriers.
    const preserveCustomarySentence = finalIFacts?.authorizationStatus === "authorized"
      && !finalIFacts.availableRealizations.includes("drop");
    const preteritVocative = gender === "male" && !preserveCustomarySentence
      ? targetObject.getClassicalNahuatlPreteritNncVocativeProjection?.(
        exactVocativeParent,
        { hToYVariant: normalizeToken(glottalVariant) === "y",
          ...(selectedFinalI ? { finalIRealization: selectedFinalI } : {}), },
      ) || null : null;
    if (selectedFinalI === "drop" && !preteritVocative) {
      return freezeDeep({
        kind: "classical-nahuatl-vocative-frame",
        authorizationStatus: "blocked",
        blockReason: "vocative-final-i-requires-owned-boundary-projection",
        surfaceRealization: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    const supportiveIAnalysis = gender === "male"
      ? getTypedVocativeSupportiveIAnalysis(nncClause)
      : null;
    const operations = [];
    let vocativeWritingResult = null;
    if (gender === "male") {
      if (silentPluralIn) {
        if (!hasTypedVocativeSilentPluralIn(nncClause)) {
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
      if (supportiveIAnalysis && !preteritVocative) {
        base = base.slice(0, -1);
        operations.push("absorb-final-supportive-i");
      }
      if (normalizeToken(glottalVariant) === "y") {
        if (!hasTypedVocativeFinalGlottal(nncClause, { silentPluralIn })) {
          return freezeDeep({
            kind: "classical-nahuatl-vocative-frame",
            authorizationStatus: "blocked",
            blockReason: "vocative-glottal-y-variant-requires-final-glottal-stop",
            surfaceRealization: "",
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          });
        }
        if (!preteritVocative) base = base.replace(/h$/u, "y");
        operations.push("intervocalic-glottal-to-y");
      }
      const reducedLongVowel = typeof targetObject.getClassicalNahuatlNncFinalReducedLongVowelAnalysis === "function"
        ? targetObject.getClassicalNahuatlNncFinalReducedLongVowelAnalysis(
          getNncSlotFrame(clauseEnvelopeSources.get(nncClause)))
        : null;
      if (!preteritVocative && reducedLongVowel && base.endsWith(reducedLongVowel.finalSpelling)) {
        // Appending the vocative makes the predicate vowel vocable-medial.
        base = base.slice(0, -1) + reducedLongVowel.underlyingVowel;
        operations.push("restore-medial-long-vowel-before-vocative");
      }
      // Andrews §18.11 writes the exceptional final stress with an acute.
      if (!preteritVocative) {
        const writingSource = targetObject.issueClassicalNahuatlLesson2WritingSource?.({
          parts: [{role: "written-vocable", value: base}, {role: "vocative-particle", value: "é"}],
          boundaryKind: "typed-vocative",
        });
        vocativeWritingResult = targetObject.writeClassicalNahuatlLesson2Result?.(writingSource);
      }
      base = preteritVocative ? preteritVocative.surface
        : targetObject.isClassicalNahuatlLesson2WrittenResult?.(vocativeWritingResult)
          ? vocativeWritingResult.surface : `${base}é`;
      if (preteritVocative) operations.push(
        ...preteritVocative.canonicalBoundaryResult.operationFrame.appliedSemanticRules,
      );
      formulaRealization = preteritVocative ? preteritVocative.formula : `${formulaRealization}e`;
      operations.push("append-male-vocative-e");
    } else {
      operations.push("female-high-tone-affected-stress");
    }
    const embeddedSurface = companionClause
      ? (companionOrder === "vocative-first"
        ? `${base}, ${companionClause.surface}`
        : `${companionClause.surface}, ${base}`)
      : base;
    if (companionClause) {
      formulaRealization = companionOrder === "vocative-first"
        ? `${formulaRealization} + ${companionClause.formulaRealization}`
        : `${companionClause.formulaRealization} + ${formulaRealization}`;
    }
    const projection = {
      kind: "classical-nahuatl-vocative-frame",
      version: CONTRACT_VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      sourceClause: nncClause,
      discourseSourceContextFrame,
      speakerGender: gender,
      supportiveIAnalysis,
      preteritVocativeProjection: preteritVocative,
      vocativeWritingResult,
      operations,
      prosody: gender === "female"
        ? "final-syllable-high-tone-with-affected-stress"
        : "vocative-e-bears-exceptional-stress",
      formulaRealization,
      companionClause,
      companionOrder,
      embeddedSurface,
      surfaceRealization: capitalizeSentence(embeddedSurface, companionClause
        ? companionClause.sentenceKind === "question" ? "?"
          : companionClause.sentenceKind === "exclamation" ? "!" : "."
        : "!"),
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
    const capturedSource =
      isClassicalNahuatlSupplementationClauseEnvelope(principalClause)
        ? clauseEnvelopeSources.get(principalClause) || null
        : null;
    const sourceFrame = targetObject.isClassicalNahuatlVncSentenceResultFrame?.(capturedSource) === true
      ? capturedSource.vncApplicationFrame
      : capturedSource;
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
    { mach = false, fuseQuilMach = false, adjunctor = "in" } = {}
  ) {
    if (!["in", "none"].includes(adjunctor) || !isClassicalNahuatlSupplementationClauseEnvelope(supplementClause)) {
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
      adjunctor,
      machSelected: mach === true,
      quilMachFused: mach === true && fuseQuilMach === true,
      formulaRealization: [
        principalClause.formulaRealization,
        ...(mach === true ? ["mach"] : []),
        ...(adjunctor === "in" ? ["in"] : []),
        supplementClause.formulaRealization,
      ].join(" + "),
      surfaceRealization: capitalizeSentence(
        [marker, ...(adjunctor === "in" ? ["in"] : []), supplementClause.surface].join(" ")
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
      // The first 19.6 example has silent content, but xicmilhui retains
      // sounded specific content before its reflexive addressee (23.3-5).
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
      // Andrews 19.6 juxtaposes the surviving speech action with the
      // saying complement without a direct grammatical relation. A shared
      // sounded addressee is not obligatory (compare Xitlahtlani).
      authorized = Boolean(
        visiblePrincipalClause?.unitKind === "vnc"
        && ["speech-action", "requesting"].includes(visiblePrincipalClause.semanticGroup)
        && deletedPrincipalClause?.unitKind === "vnc"
        && ["speech", "saying"].includes(deletedPrincipalClause.semanticGroup)
        && visiblePrincipalClause.subject.referenceId
          === deletedPrincipalClause.subject.referenceId
        && areClassicalNahuatlPersonNumberFeaturesCompatible(
          visiblePrincipalClause.subject.features,
          deletedPrincipalClause.subject.features,
        )
        && deletedSayingSupplementationAuthorized
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
    const directSpeech = kind.startsWith("saying")
      && normalizedSpeechDirectness === "direct";
    const directFirstPerson = directSpeech
      && supplementClause.subject?.features?.person === "1"
      && supplementClause.subject.features.number === "singular";
    const utteranceKind = deletedSupplementationFrame?.operationFrames
      ?.find(frame => frame.kind === "classical-nahuatl-supplementation-complement-policy-frame")
      ?.supplementSentenceKind || supplementClause.sentenceKind;
    const quotedPunctuation = utteranceKind === "question" ? "?"
      : utteranceKind === "exclamation" ? "!" : ".";
    const survivingAdjunctors = kind.startsWith("saying")
      ? deletedSupplementationFrame.linearizationFrame.tokens
          .filter(token => token.role === "adjunctor")
      : [];
    const survivingSupplement = [
      ...survivingAdjunctors.map(token => token.surface),
      directSpeech
        ? `"${capitalizeSentence(supplementClause.surface, quotedPunctuation)}"`
        : supplementClause.surface,
    ].filter(Boolean).join(" ");
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
      ...(directFirstPerson ? {quotationOrigoFrame: freezeDeep({
        reportingSpeakerReferenceId: deletedPrincipalClause.subject.referenceId,
        quotedFirstPersonReferenceId: deletedPrincipalClause.subject.referenceId,
        quotedClauseSubjectReferenceId: supplementClause.subject.referenceId,
        referenceMapping: "direct-quotation-first-person-denotes-reporting-speaker",
        quotedGrammaticalCategory: supplementClause.subject.category,
        directQuotation: true, grammaticalPersonShiftDoesNotChangeReferent: true,
        canonicalQuotedSource: clauseEnvelopeSources.get(supplementClause),
        grammarAuthority: false,
      })} : {}),
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
        ...survivingAdjunctors.map(token => token.surface),
        supplementClause.formulaRealization,
      ].join(" + "),
      surfaceRealization: capitalizeSentence(
        `${remainingFirst}${directSpeech && kind === "saying" && !survivingAdjunctors.length ? ", " : " "}${survivingSupplement}`,
        directSpeech ? "" : kind === "cah-proxy" && visiblePrincipalClause.clause.sentenceKind === "question"
          ? "?" : "."
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
    if (request?.operationKind === "lexicalized-nnc") return evaluateLexicalizedNncSourceRequest(request);
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

  function getClassicalNahuatlDoubleNucleusOwnerhoodProjection(result) {
    if (!isClassicalNahuatlSupplementationFrame(result)
      || result.referenceFrame.referenceMode !== "shared"
      || result.referenceFrame.headRole !== "possessor"
      || result.referenceFrame.supplementContactRole !== "subject"
      || result.linearizationFrame.order !== "supplement-first"
      || result.principalContinuationFrames.length
      || result.supplementContinuationFrames.length
      || result.interveningClauses.length
      || result.principalClause.unitKind !== "nnc"
      || result.supplementClause.unitKind !== "nnc"
      || result.principalClause.surface !== result.principalClause.nuclearSurface
      || result.supplementClause.surface !== result.supplementClause.nuclearSurface
      || result.linearizationFrame.tokens.length !== 2) return null;
    const canonicalPrincipalSource = clauseEnvelopeSources.get(result.principalClause);
    const canonicalSupplementSource = clauseEnvelopeSources.get(result.supplementClause);
    const principalSlotFrame = getNncSlotFrame(canonicalPrincipalSource);
    const supplementSlotFrame = getNncSlotFrame(canonicalSupplementSource);
    if (targetObject.isClassicalNahuatlNncSlotFrame?.(principalSlotFrame) !== true
      || targetObject.isClassicalNahuatlNncSlotFrame?.(supplementSlotFrame) !== true) return null;
    const carriers = slotFrame => {
      const s = slotFrame.slots;
      return [s.subject.pers1, s.subject.pers2,
        ...s.participant.slots.map(slot => slot.carrier),
        ...s.state.slots.map(slot => slot.carrier), s.predicate.stem];
    };
    const supplement = supplementSlotFrame.slots;
    const sourceStem = [...carriers(supplementSlotFrame),
      supplement.number.num1, supplement.number.num2,
      ...carriers(principalSlotFrame)]
      .filter(carrier => carrier && !["0", "Ø", "⎕"].includes(carrier)).join("-");
    return freezeDeep({
      kind: "classical-nahuatl-double-nucleus-ownerhood-projection",
      exactSourceResult: result, canonicalPrincipalSource, canonicalSupplementSource,
      principalSlotFrame, supplementSlotFrame, sourceStem,
      order: "supplement-first", principalNumberRemoved: true,
      internalPersonPositionsPreserved: true, supplementNumberPreserved: true,
      grammarAuthority: false, formulaStringAuthority: false, surfaceStringAuthority: false,
    });
  }

  return {
    resolveClassicalNahuatlLexicalizedNncSourceFrame,
    isClassicalNahuatlLexicalizedNncSourceFrame,
    issueClassicalNahuatlLexicalizedNncBindingFrame,
    isClassicalNahuatlLexicalizedNncBindingFrame,
    getClassicalNahuatlSupplementationClauseSourceFrame(envelope) {
      return isClassicalNahuatlSupplementationClauseEnvelope(envelope)
        ? clauseEnvelopeSources.get(envelope) || null : null;
    },
    getClassicalNahuatlDoubleNucleusOwnerhoodProjection,
    canReuseClassicalSupplementationIntervener,
    getClassicalSupplementationIntervenerSource,
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
    getClassicalNahuatlSupplementationReloadInputs,
    buildClassicalNahuatlSupplementationReplacementRequest,
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
