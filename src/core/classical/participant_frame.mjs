// Canonical participant features shared by Classical NNC, VNC, and clause grammar.

const PERSON_VALUES = new Set(["1", "2", "3", "unspecified"]);
const NUMBER_VALUES = new Set(["singular", "plural", "common", "unspecified"]);
const ANIMACY_VALUES = new Set(["animate", "nonanimate", "unspecified"]);
const HUMANNESS_VALUES = new Set(["human", "nonhuman", "unspecified"]);
const PARTICIPANT_ROLE_TRANSITION_FRAMES = new WeakSet();

const CASE_BY_ROLE = Object.freeze({
  subject: "nominative",
  object: "objective",
  causee: "objective",
  possessor: "possessive",
  supplement: "referential",
});

function token(value = "") {
  return String(value || "").trim().toLowerCase();
}

function roleList(values = []) {
  return Object.freeze([...(Array.isArray(values) ? values : [])]
    .map(token)
    .filter(Boolean)
    .filter((value, index, all) => all.indexOf(value) === index));
}

export function buildClassicalNahuatlParticipantRoleTransitionFrame({
  operationId = "",
  sourceRoles = [],
  targetRoles = [],
  retiredSourceRoles = [],
  activatedTargetRoles = [],
  preservedParticipantFacts = [],
} = {}) {
  const normalizedOperationId = token(operationId);
  const normalizedSourceRoles = roleList(sourceRoles);
  const normalizedTargetRoles = roleList(targetRoles);
  const normalizedRetiredSourceRoles = roleList(retiredSourceRoles);
  const normalizedActivatedTargetRoles = roleList(activatedTargetRoles);
  const normalizedPreservedParticipantFacts = roleList(
    preservedParticipantFacts
  );
  const grammaticalRhymeMovements = roleList([
    ...(normalizedPreservedParticipantFacts.length
      ? ["preserve-participant-identity"]
      : []),
    ...(normalizedRetiredSourceRoles.length
      ? ["retire-source-role"]
      : []),
    ...(normalizedActivatedTargetRoles.length
      ? ["activate-target-role"]
      : []),
    ...(normalizedTargetRoles.length ? ["emit-target-role-structure"] : []),
  ]);
  const frame = Object.freeze({
    kind: "classical-nahuatl-participant-role-transition-frame",
    version: 1,
    authorizationStatus: normalizedOperationId ? "authorized" : "blocked",
    blockReason: normalizedOperationId
      ? ""
      : "participant-role-transition-operation-required",
    operationId: normalizedOperationId,
    sourceRoles: normalizedSourceRoles,
    targetRoles: normalizedTargetRoles,
    retiredSourceRoles: normalizedRetiredSourceRoles,
    activatedTargetRoles: normalizedActivatedTargetRoles,
    preservedParticipantFacts: normalizedPreservedParticipantFacts,
    grammaticalRhymeShape: grammaticalRhymeMovements.join("+"),
    grammaticalRhymeCoordinates: Object.freeze({
      preservesParticipantIdentity:
        normalizedPreservedParticipantFacts.length > 0,
      retiresSourceRole: normalizedRetiredSourceRoles.length > 0,
      activatesTargetRole: normalizedActivatedTargetRoles.length > 0,
      emitsTargetRoleStructure: normalizedTargetRoles.length > 0,
      sourceRoleCount: normalizedSourceRoles.length,
      retiredSourceRoleCount: normalizedRetiredSourceRoles.length,
      activatedTargetRoleCount: normalizedActivatedTargetRoles.length,
      targetRoleCount: normalizedTargetRoles.length,
    }),
    sourceRolesCannotControlTargetAfterRetirement: true,
    participantIdentityAndCurrentRoleRemainDistinct: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    callerSuppliedAuthorityAccepted: false,
  });
  PARTICIPANT_ROLE_TRANSITION_FRAMES.add(frame);
  return frame;
}

export function isClassicalNahuatlParticipantRoleTransitionFrame(frame = null) {
  return Boolean(
    PARTICIPANT_ROLE_TRANSITION_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-participant-role-transition-frame"
    && frame.version === 1
    && frame.authorizationStatus === "authorized"
    && frame.operationId
    && Array.isArray(frame.sourceRoles)
    && Array.isArray(frame.targetRoles)
    && Array.isArray(frame.retiredSourceRoles)
    && Array.isArray(frame.activatedTargetRoles)
    && Array.isArray(frame.preservedParticipantFacts)
    && typeof frame.grammaticalRhymeShape === "string"
    && frame.grammaticalRhymeCoordinates
    && Object.isFrozen(frame.grammaticalRhymeCoordinates)
    && frame.sourceRolesCannotControlTargetAfterRetirement === true
    && frame.participantIdentityAndCurrentRoleRemainDistinct === true
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && Object.isFrozen(frame)
  );
}

export function getClassicalNahuatlParticipantRoleTransitionRhymeShape(
  frame = null,
) {
  return isClassicalNahuatlParticipantRoleTransitionFrame(frame)
    ? frame.grammaticalRhymeShape
    : "";
}

export function doesClassicalNahuatlParticipantTransitionRetireSourceRole(
  frame = null,
  role = "",
) {
  return Boolean(
    isClassicalNahuatlParticipantRoleTransitionFrame(frame)
    && frame.retiredSourceRoles.includes(token(role))
  );
}

export function parseClassicalNahuatlPersonNumber(category = "") {
  const normalized = token(category);
  const match = /^([123])(?:-|)(sg|pl|common|singular|plural)$/u.exec(normalized);
  if (!match) return null;
  return Object.freeze({
    category: normalized,
    person: match[1],
    number: Object.freeze({
      sg: "singular",
      pl: "plural",
      common: "common",
      singular: "singular",
      plural: "plural",
    })[match[2]],
  });
}

export function buildClassicalNahuatlParticipantFrame(options = {}) {
  const role = token(options.role || "subject");
  const requestedAgreement = token(options.agreement || options.category);
  const agreementFeatures = parseClassicalNahuatlPersonNumber(requestedAgreement);
  const impersonal = options.impersonal === true || options.hasReferent === false;
  let person = token(options.person || agreementFeatures?.person || "unspecified");
  let number = token(options.number || agreementFeatures?.number || "unspecified");
  let animacy = token(options.animacy || "unspecified");
  let humanness = token(options.humanness || "unspecified");

  person = PERSON_VALUES.has(person) ? person : "unspecified";
  number = NUMBER_VALUES.has(number) ? number : "unspecified";
  animacy = ANIMACY_VALUES.has(animacy) ? animacy : "unspecified";
  humanness = HUMANNESS_VALUES.has(humanness) ? humanness : "unspecified";

  if (impersonal) {
    person = "3";
    number = "singular";
    animacy = "unspecified";
    humanness = "unspecified";
  } else if (animacy === "animate" && humanness === "nonhuman") {
    person = "3";
    if (number === "common") number = "singular";
  } else if (person === "1" || person === "2") {
    animacy = "animate";
    humanness = "human";
    if (number === "common" || number === "unspecified") number = "singular";
  } else if (animacy === "nonanimate") {
    person = "3";
    humanness = "nonhuman";
    number = "common";
  } else if (animacy === "animate") {
    if (number === "common") number = "singular";
  } else if (humanness === "human") {
    animacy = "animate";
  }

  const caseCategory = token(options.caseCategory || options.case || CASE_BY_ROLE[role] || "unspecified");
  const category = impersonal
    ? "impersonal"
    : person !== "unspecified" && number !== "unspecified"
      ? number === "common"
        ? `${person}common`
        : `${person}${number === "plural" ? "pl" : "sg"}`
      : requestedAgreement || "unspecified";
  const morphologicalAgreement = category === "3common" || category === "impersonal"
    ? "3sg"
    : category;
  return Object.freeze({
    kind: "classical-nahuatl-participant-frame",
    version: 1,
    role,
    case: caseCategory,
    category,
    agreement: morphologicalAgreement,
    morphologicalAgreement,
    requestedAgreement,
    person,
    animacy,
    humanness,
    number,
    specificity: token(options.specificity || "unspecified"),
    referenceId: String(options.referenceId || "").trim(),
    hasReferent: !impersonal,
    impersonal,
    commonNumberUsesSingularMorphology: !impersonal && animacy === "nonanimate",
    humannessSelectionRequired:
      !impersonal
      && person === "3"
      && animacy === "animate"
      && humanness === "unspecified",
  });
}

export function isClassicalNahuatlParticipantFrame(frame = null) {
  if (!frame || frame.kind !== "classical-nahuatl-participant-frame" || frame.version !== 1) return false;
  if (!PERSON_VALUES.has(frame.person) || !NUMBER_VALUES.has(frame.number) || !ANIMACY_VALUES.has(frame.animacy) || !HUMANNESS_VALUES.has(frame.humanness)) return false;
  if (!frame.category || !frame.morphologicalAgreement || frame.agreement !== frame.morphologicalAgreement) return false;
  if (frame.impersonal === true) {
    return frame.hasReferent === false
      && frame.person === "3"
      && frame.number === "singular"
      && frame.animacy === "unspecified"
      && frame.humanness === "unspecified";
  }
  if (frame.hasReferent !== true) return false;
  if (["1", "2"].includes(frame.person) && (frame.animacy !== "animate" || frame.humanness !== "human")) return false;
  if (frame.animacy === "nonanimate" && (frame.person !== "3" || frame.humanness !== "nonhuman" || frame.number !== "common")) return false;
  if (frame.animacy === "animate" && frame.humanness === "nonhuman" && frame.person !== "3") return false;
  return true;
}

export function areClassicalNahuatlParticipantFramesReferentiallyCompatible(left = null, right = null) {
  if (!isClassicalNahuatlParticipantFrame(left) || !isClassicalNahuatlParticipantFrame(right)) return false;
  if (!left.hasReferent || !right.hasReferent) return false;
  if (left.referenceId && right.referenceId && left.referenceId !== right.referenceId) return false;
  if (left.person !== "unspecified" && right.person !== "unspecified" && left.person !== right.person) return false;
  if (left.number !== right.number) {
    const numbers = new Set([left.number, right.number]);
    if (!(left.person === "3" && right.person === "3" && numbers.size === 2 && numbers.has("singular") && numbers.has("common"))) return false;
  }
  if (left.animacy !== "unspecified" && right.animacy !== "unspecified" && left.animacy !== right.animacy) return false;
  if (left.humanness !== "unspecified" && right.humanness !== "unspecified" && left.humanness !== right.humanness) return false;
  return true;
}
