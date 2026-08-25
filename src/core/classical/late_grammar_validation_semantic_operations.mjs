// Non-authorizing validation projection for the independent semantic owners in
// Lessons 57-58. The projection shares typed construction mechanics only.

import { createClassicalNahuatlVncApplicationModule } from "../../application/classical/vnc_application.mjs?v=20260824-universal-capability-navigator-280";
import { createClassicalNahuatlSourceStemInventoryApi } from "./source_stem_inventory.mjs";
import { createClassicalNahuatlSupplementationApi } from "../sentence/supplementation.mjs";
import { createClassicalNahuatlDenominalVncGrammarApi } from "./denominal_vnc_grammar.mjs";
import { installClassicalNahuatlNominalConstructionGlobals } from "./nominal_construction.mjs";

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.hasOwn(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`late-grammar-validation-capability-required:${name}`);
  }
}

function rejected(value) {
  return value == null || value.authorizationStatus === "blocked";
}

function createDelegatingRuntimeTarget(target) {
  return new Proxy(Object.create(null), {
    get(local, propertyName, receiver) {
      if (propertyName === "window" || propertyName === "module") {
        return undefined;
      }
      if (Reflect.has(local, propertyName)) {
        return Reflect.get(local, propertyName, receiver);
      }
      return target?.[propertyName];
    },
    has(local, propertyName) {
      return propertyName !== "window"
        && propertyName !== "module"
        && (Reflect.has(local, propertyName) || propertyName in target);
    },
    defineProperty(local, propertyName, descriptor) {
      return Reflect.defineProperty(local, propertyName, descriptor);
    },
    getOwnPropertyDescriptor(local, propertyName) {
      return Reflect.getOwnPropertyDescriptor(local, propertyName);
    },
  });
}

export function createClassicalLateGrammarValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject : globalThis;
  const canonicalTarget = createDelegatingRuntimeTarget(target);
  const vnc = createClassicalNahuatlVncApplicationModule(canonicalTarget);
  Object.defineProperties(
    canonicalTarget,
    Object.getOwnPropertyDescriptors(vnc),
  );
  const sourceInventory = createClassicalNahuatlSourceStemInventoryApi();
  const supplementationApi = createClassicalNahuatlSupplementationApi(
    canonicalTarget,
  );
  const denominal = createClassicalNahuatlDenominalVncGrammarApi(
    canonicalTarget,
  );
  installClassicalNahuatlNominalConstructionGlobals(canonicalTarget);

  const buildVnc = (
    sourceStem,
    {
      subject = "3sg",
      tense = "present",
      sourceValence = "intransitive",
      objectKind = sourceValence === "intransitive"
        ? "none" : "specific-projective",
      objectPerson = "",
    } = {},
  ) => vnc.evaluateClassicalNahuatlVncApplication({
    sourceStem,
    sourceSubject: subject,
    subject,
    mood: "indicative",
    tense,
    verbClass: "A",
    sourceValence,
    objectKind,
    objectPerson,
    requestedDerivation: "direct",
    requestedVoice: "active",
  });

  const buildNnc = (stem, subject = "3sg") => (
    target.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
      subject,
      nounClass: "zero",
      animacy: "nonanimate",
    })
  );

  const envelope = (frame, options = {}) => (
    supplementationApi.buildClassicalNahuatlSupplementationClauseEnvelope(
      frame,
      options,
    )
  );

  const particleEnvelope = (particleId, referenceId = particleId) => {
    const source = target.buildClassicalNahuatlParticleSourceFrame(particleId);
    const result = target.buildClassicalNahuatlParticleResultFrame(source);
    return envelope(result, { referenceId });
  };

  const supplementation = request => {
    return supplementationApi.evaluateClassicalNahuatlSupplementationOperation(
      request,
    );
  };

  const ordinaryNnc = stem => {
    const sourceFrame = target.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
    const operationFrame = target.buildClassicalNahuatlOrdinaryNncOperationFrame(
      sourceFrame,
      {
        state: "absolutive",
        subject: "3sg",
        sentenceType: "statement",
        polarity: "positive",
      },
    );
    return {
      sourceFrame,
      resultFrame: target.requestClassicalOrdinaryNncResult(
        sourceFrame,
        operationFrame,
      ),
    };
  };

  function buildProfileResult(profileId, variant = "default") {
    if (profileId === "contextual-time") {
      const finite = buildVnc("nemi", {
        tense: variant === "future-imminence" ? "future" : "present",
      });
      const frame = vnc.interpretClassicalNahuatlVncContextualTime(finite, {
        referenceTime: variant === "future-imminence" ? "present" : "past",
        eventRelation: variant === "future-imminence"
          ? "immediately-prior" : "same",
        relationScope: variant === "future-imminence"
          ? "neighboring-vnc" : "discourse",
        ...(variant === "future-imminence"
          ? { yeParticleResult: target.buildClassicalNahuatlParticleResultFrame(
            target.buildClassicalNahuatlParticleSourceFrame("l3-ye"),
          ) }
          : {}),
      });
      return {
        canonical: frame,
        valid: vnc.isClassicalNahuatlVncContextualTimeFrame(frame),
        operationKind: "vnc-contextual-time",
        detail: frame?.timeReading || "",
      };
    }
    if (profileId === "valence-source-analysis") {
      const frame = sourceInventory.buildClassicalNahuatlValenceSourceAnalysis(
        variant === "compound"
          ? {
            sourceStem: "",
            observedValence: "transitive",
            incorporatedObjectStem: "ā-man-tē-0-ca-yō",
            matrixStem: "tlāliā",
          }
          : { sourceStem: "itt-a", observedValence: "intransitive" },
      );
      return {
        canonical: frame,
        valid: sourceInventory.isClassicalNahuatlValenceSourceAnalysisFrame(frame),
        operationKind: "source-valence-analysis",
        detail: frame?.classification || "",
      };
    }
    if (profileId === "absolute-topic") {
      const context = supplementationApi.buildClassicalNahuatlSupplementationContextRecord({
        kind: "absolute-topic",
        referenceId: "topic-referent",
      });
      const principalSource = buildVnc("nemi");
      const principal = envelope(principalSource, {
        referenceId: "comment-referent",
      });
      const supplementSource = buildVnc("nemi");
      const supplement = envelope(supplementSource, {
        referenceId: "topic-referent",
        contextRecords: [context],
      });
      const frame = supplementation({
        operationKind: "relation",
        principalClause: principal,
        supplementClause: supplement,
        options: {
          referenceMode: "absolute-topic",
          headRole: "subject",
          supplementContactRole: "subject",
          order: "supplement-first",
        },
      });
      return {
        canonical: frame,
        valid: supplementationApi.isClassicalNahuatlSupplementationFrame(frame),
        operationKind: "absolute-topic",
        detail: frame?.operationFrames?.find(candidate => (
          candidate.kind === "classical-nahuatl-topic-comment-relation-frame"
        ))?.relation || `${vnc.isClassicalNahuatlVncApplicationFrame(
          principalSource,
        )}:${principalSource?.authorizationStatus || ""}:${
          principalSource?.blockReason || ""
        }:${JSON.stringify(principalSource?.missingCapabilities || [])
        }:${principal?.authorizationStatus}:${
          principal?.blockReason || ""
        }/${supplement?.authorizationStatus}:${supplement?.blockReason || ""}`,
      };
    }
    if (profileId === "referent-conditioned-agreement") {
      const principal = envelope(buildVnc("nemi", { subject: "3pl" }), {
        referenceId: "shared-number-referent",
      });
      const supplement = envelope(buildNnc("mochi"), {
        referenceId: "shared-number-referent",
      });
      const frame = supplementation({
        operationKind: "relation",
        principalClause: principal,
        supplementClause: supplement,
        options: {
          referenceMode: "shared",
          headRole: "subject",
          supplementContactRole: "subject",
          agreementException: "collective",
        },
      });
      return {
        canonical: frame,
        valid: supplementationApi.isClassicalNahuatlSupplementationFrame(frame),
        operationKind: "referent-conditioned-agreement",
        detail: frame?.operationFrames?.find(candidate => (
          candidate.kind === "classical-nahuatl-referent-conditioned-agreement-frame"
        ))?.mismatchDimensions?.[0] || "",
      };
    }
    if (profileId === "adverbial-nnc-supplement") {
      const principal = envelope(buildVnc("tōca", {
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
      }), {
        referenceId: "actor",
        objectReferenceId: "adverbial-object",
      });
      const potential = target.prepareClassicalAdverbialNncSource({
        stem: "huel",
        clauseKind: "nnc-absolutive",
      });
      const adverbial = target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: potential,
      });
      const frame = supplementation({
        operationKind: "relation",
        principalClause: principal,
        supplementClause: envelope(adverbial, {
          referenceId: "adverbial-object",
        }),
        options: {
          referenceMode: "shared",
          headRole: "object",
          supplementContactRole: "subject",
        },
      });
      return {
        canonical: frame,
        valid: supplementationApi.isClassicalNahuatlSupplementationFrame(frame),
        operationKind: "adverbial-nnc-supplement",
        detail: frame?.operationFrames?.find(candidate => (
          candidate.kind === "classical-nahuatl-adverbial-nnc-relation-frame"
        ))?.relation || "",
      };
    }
    if (profileId === "deleted-speech-head") {
      const potential = target.prepareClassicalAdverbialNncSource({
        stem: "huel",
        clauseKind: "nnc-absolutive",
      });
      const adverbial = target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: potential,
      });
      const adverbialClause = envelope(adverbial, {
        referenceId: "adverbial-object",
      });
      const visiblePrincipal =
        supplementationApi.buildClassicalNahuatlSupplementationAdverbialModifierFrame(
          adverbialClause,
          { adverbialRole: "manner" },
        );
      const reported = envelope(buildVnc("yā", {
        subject: "3pl",
        tense: "preterit",
      }), {
        referenceId: "reported-event",
        sentenceKind: "assertion",
      });
      const sayingResult = vnc.evaluateClassicalNahuatlVncApplication({
        sourceStem: "ilhuia",
        sourceSubject: "1sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass: "A",
        sourceValence: "multiple-object",
        objectKind: "specific-projective",
        requestedDerivation: "direct",
        requestedVoice: "active",
        sourceInitialISelection: "real",
        objectRequests: [{
          objectId: "reported-supplement",
          objectKind: "specific-projective",
          objectPerson: "3sg",
          governor: "directive",
          derivationalLevel: 1,
        }, {
          objectId: "addressees",
          objectKind: "specific-projective",
          objectPerson: "3pl",
          governor: "applicative",
          derivationalLevel: 2,
        }],
      });
      const saying = envelope(sayingResult, {
        referenceId: "speaker",
        subjectReferenceId: "speaker",
        objectReferenceIds: {
          "reported-supplement": "reported-event",
          addressees: "addressees",
        },
      });
      const deletedSupplementationFrame = supplementation({
        operationKind: "relation",
        principalClause: saying,
        supplementClause: reported,
        options: {
          referenceMode: "included",
          headRole: "object",
          principalObjectId: "reported-supplement",
          speechDirectness: "direct",
        },
      });
      const frame = supplementation({
        operationKind: "deleted-principal",
        visiblePrincipalClause: visiblePrincipal,
        deletedPrincipalClause: saying,
        supplementClause: reported,
        options: {
          deletionKind: "saying-adverb-only",
          speechDirectness: "direct",
          deletedSupplementationFrame,
        },
      });
      return {
        canonical: frame,
        valid: supplementationApi.isClassicalNahuatlDeletedPrincipalFrame(frame),
        operationKind: "deleted-speech-head",
        detail: frame?.adverbOnlyPrincipal === true
          ? "adverb-only-principal" : "",
      };
    }
    if (profileId === "silent-first-person") {
      const principal = envelope(buildVnc("nemi", { subject: "1sg" }), {
        referenceId: "speaker",
      });
      const supplement = envelope(buildVnc("mati", { subject: "1sg" }), {
        referenceId: "speaker",
      });
      const frame = supplementation({
        operationKind: "relation",
        principalClause: principal,
        supplementClause: supplement,
        options: {
          referenceMode: "shared",
          headRole: "subject",
          supplementContactRole: "subject",
          contextualSilentFirstPerson: true,
        },
      });
      return {
        canonical: frame,
        valid: supplementationApi.isClassicalNahuatlSupplementationFrame(frame),
        operationKind: "silent-first-person",
        detail: frame?.operationFrames?.find(candidate => (
          candidate.kind === "classical-nahuatl-contextual-silent-first-person-frame"
        ))?.license || "",
      };
    }
    if (profileId === "lexical-nounstem-l") {
      const { sourceFrame, resultFrame } = ordinaryNnc("te-l");
      return {
        canonical: resultFrame,
        valid: target.isClassicalNahuatlOrdinaryNncResult(resultFrame),
        operationKind: "ordinary-nnc-lexical-l",
        detail: sourceFrame?.lexicalFormation || "",
      };
    }
    if (profileId === "instrumental-az") {
      const sourceStem = variant === "connector-n"
        ? "tzon-hu-āz" : "tepon-āz";
      const authorization =
        denominal.buildClassicalNahuatlInstrumentalAzSourceAuthorization(
          sourceStem,
        );
      const operationId = variant === "o-a-continuation"
        ? "intransitive-o-a-use" : "applicative-huia-use";
      const frame = target.requestClassicalDenominalVncResult({
        nounStem: sourceStem,
        sourceKind: "nounstem",
        sourceState: "absolutive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        objectPeople: operationId === "applicative-huia-use" ? ["3sg"] : [],
        operationId,
        outputScope: "single",
      });
      return {
        canonical: frame,
        valid: target.isClassicalNahuatlDenominalVncResultFrame(frame),
        operationKind: operationId,
        detail: authorization.connectorClass,
      };
    }
    if (profileId === "closed-construction-exception") {
      const requests = {
        default: {
          constructionFamily: "ehua-retains-source-num1",
          source: {
            embedStem: "tzahtzi-z",
            retainedSourceNum1: "tl",
            matrixStem: "ē-hu-a",
          },
        },
        "solid-spelling": {
          constructionFamily: "solid-spelling-supplement",
          source: {
            supplementNounstem: "pōc",
            principalStem: "ē-hua-toc",
            relation: "supplementary-subject",
          },
        },
        "connective-t-vnc": {
          constructionFamily: "connective-t-nounstem-embed",
          source: {
            embedNounstem: "xo-nāuh",
            connective: "t",
            matrixStem: "i-uh",
          },
        },
        "object-complement": {
          constructionFamily: "preterit-agentive-object-complement",
          source: {
            embedStem: "mic-0-t-o",
            retainedSourceNum1: "c",
            matrixStem: "cāhua",
            controller: "matrix-object",
          },
        },
        "matrix-object-control": {
          constructionFamily: "connective-t-matrix-object-control",
          source: {
            embedStem: "iuh-0",
            connective: "ti",
            matrixStem: "cāhua",
            controller: "matrix-object",
          },
        },
        "connective-t-nnc": {
          constructionFamily: "connective-t-nonrelational-nounstem",
          source: {
            embedNounstem: "tla-zo-h",
            connective: "ti",
            matrixNounstem: "tlāca",
            matrixRelationClass: "nonrelational",
          },
        },
        "frozen-reflexive": {
          constructionFamily: "frozen-third-person-reflexive",
          source: {
            incorporatedAdverbialNounstem: "tlāl",
            frozenReflexive: "m-0",
            matrixStem: "āhui-l-ti-ā",
          },
        },
      };
      const frame = canonicalTarget.validateClassicalNahuatlClosedConstructionException(
        requests[variant] || requests.default,
      );
      return {
        canonical: frame,
        valid: canonicalTarget.isClassicalNahuatlClosedConstructionExceptionValidation(frame),
        operationKind: "closed-construction-exception",
        detail: frame?.constructionFamily || "",
      };
    }
    if (profileId === "exclamatory-utterance") {
      const frame = supplementation({
        operationKind: "exclamatory-utterance",
        constituents: [particleEnvelope("l58-tia-cuel-ehhuatl")],
      });
      return {
        canonical: frame,
        valid: supplementationApi.isClassicalNahuatlSupplementationFrame(frame),
        operationKind: "exclamatory-utterance",
        detail: frame?.operationFrames?.find(candidate => (
          candidate.kind === "classical-nahuatl-exclamatory-composition-frame"
        ))?.closedCollocation === true ? "closed-collocation" : "",
      };
    }
    if (profileId === "such-that-adjunction") {
      const frame = supplementation({
        operationKind: "such-that-adjunction",
        principalClause: particleEnvelope("l58-ahmo"),
        supplementClause: envelope(buildVnc("mati", { subject: "1sg" }), {
          referenceId: "such-that-event",
        }),
        markerClause: particleEnvelope(
          variant === "strong-affirmative" ? "l58-mah-ca" : "l3-mah",
        ),
        ...(variant === "optional-in"
          ? { adjunctorClause: particleEnvelope("l3-in") }
          : {}),
      });
      return {
        canonical: frame,
        valid: supplementationApi.isClassicalNahuatlSupplementationFrame(frame),
        operationKind: "such-that-adjunction",
        detail: frame?.computedPolarity || "",
      };
    }
    if (profileId === "incorporated-noun-role") {
      const voice = variant === "passive" ? "passive" : "active";
      const nominal = canonicalTarget.evaluateClassicalNahuatlNominalConstruction({
        constructionKind: "nominal-embed-vnc",
        source: {
          embedStem: voice === "passive" ? "cōā" : "quimich",
          embedClass: "zero",
          matrixStem: voice === "passive" ? "cuā" : "patl-ā-ni",
          matrixVerbClass: "A",
          matrixValence: voice === "passive" ? "single-object" : "intransitive",
          objectPeople: voice === "passive" ? ["3sg"] : [],
        },
        relation: "adverb",
        route: voice === "passive"
          ? "passive-adverbialized-subject" : "direct-adverb",
        adverbRole: voice === "passive" ? "means" : "compared-manner",
        orientation: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice,
        outputKind: "single",
      });
      const frame = canonicalTarget.validateClassicalNahuatlIncorporatedNounRole(
        nominal,
        { claimedRole: voice === "passive" ? "means-instrument" : "adverbial" },
      );
      return {
        canonical: frame,
        valid: canonicalTarget.isClassicalNahuatlIncorporatedNounRoleValidation(frame),
        operationKind: "incorporated-noun-role",
        detail: frame?.derivedRole || "",
      };
    }
    if (profileId === "textual-diagnostic") {
      const forbiddenApis = [
        "correctClassicalNahuatlText",
        "normalizeClassicalNahuatlDocumentaryText",
        "generateClassicalNahuatlTextualCorrection",
        "requestClassicalNahuatlTextualCorrection",
      ].filter(name => typeof target[name] === "function");
      return {
        canonical: deepFreeze({
          kind: "classical-nahuatl-textual-diagnostic-boundary",
          authorizationStatus: "authorized",
          diagnosticOnly: true,
          productionApisAbsent: forbiddenApis.length === 0,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        }),
        valid: forbiddenApis.length === 0,
        operationKind: "documentary-diagnostic-only",
        detail: "no-production-route",
      };
    }
    throw new Error(`late-grammar-validation-profile-required:${profileId}`);
  }

  function buildClassicalLateGrammarValidationFrame(
    profileId = "contextual-time",
    variant = "default",
  ) {
    for (const capability of [
      "evaluateClassicalNahuatlVncApplication",
      "buildClassicalNahuatlSupplementationClauseEnvelope",
      "evaluateClassicalNahuatlSupplementationOperation",
    ]) assertRuntime(target, capability);
    const result = buildProfileResult(profileId, variant);
    if (!result.valid) {
      throw new Error(
        `late-grammar-validation-canonical-result-required:${profileId}:${variant}:${
          result.canonical?.blockReason || "no-block-reason"
        }:${result.canonical?.authorizationStatus || "no-status"}:${result.detail || "no-detail"}`,
      );
    }
    let hostileAuthorityBlocked = false;
    try {
      const hostile = supplementationApi.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        formula: "#stored-answer-cannot-authorize#",
      });
      hostileAuthorityBlocked = rejected(hostile);
    } catch (error) {
      hostileAuthorityBlocked = String(error?.message || error)
        .includes("forbidden-authority:formula");
    }
    const frame = deepFreeze({
      kind: "classical-late-grammar-validation-frame",
      version: 1,
      authorizationStatus: "authorized",
      profileId,
      result: {
        canonicalResult: true,
        operationKind: result.operationKind,
        detail: result.detail,
        canonicalAuthorizationStatus:
          result.canonical?.authorizationStatus || "authorized",
      },
      analysis: {
        semanticBoundary: profileId,
        hostileAuthorityBlocked,
        documentaryAnalysisOnly: profileId === "textual-diagnostic",
        documentaryProductionRouteAbsent: profileId === "textual-diagnostic"
          ? result.canonical.productionApisAbsent === true : true,
        translationAuthority: false,
        traditionalSpellingAuthority: false,
        curriculumCoordinateAuthority: false,
        sharedProjectionOwnsGrammar: false,
        sharedProjectionOwnsAtoms: false,
        separateOwnerProofRequired: true,
      },
    });
    ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalLateGrammarValidationFrame(frame = null) {
    return Boolean(
      frame
      && ISSUED_VALIDATION_FRAMES.has(frame)
      && frame.kind === "classical-late-grammar-validation-frame"
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.result?.canonicalResult === true
      && frame.analysis?.hostileAuthorityBlocked === true
      && frame.analysis?.documentaryProductionRouteAbsent === true
      && frame.analysis?.sharedProjectionOwnsAtoms === false
      && frame.analysis?.separateOwnerProofRequired === true
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalLateGrammarValidationFrame,
    isClassicalLateGrammarValidationFrame,
  });
}

export function installClassicalLateGrammarValidationSemanticOperationsGlobals(
  targetObject = globalThis,
) {
  const api = createClassicalLateGrammarValidationSemanticOperationsApi(
    targetObject,
  );
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
