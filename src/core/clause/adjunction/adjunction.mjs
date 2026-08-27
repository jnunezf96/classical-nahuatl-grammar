// Canonical modern ESM module.

export function createAdverbialAdjunctionGlobals(targetObject = globalThis, installationContext = null) {
    const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
    const ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION = 2;
    const issuedAdverbialAdjunctionResults = new WeakSet();
    const issuedAdverbialAdjunctionSelectionContracts = new WeakSet();
    const issuedRelationalNumeralCoCContracts = new WeakSet();
    const ADVERBIAL_ADJUNCTION_APPLICATION_SOURCE_UNIT_BY_OPERATION =
      Object.freeze({
        "particle:result": "particle",
        "vnc:application": "vnc",
        "vnc:sentence-result": "sentence",
        "nnc:ordinary": "nnc",
        "nnc:pronominal": "nnc",
        "nnc:sentence-surface": "nnc",
        "grammar:nominal-construction": "nnc",
        "nnc:deverbal-construction": "nnc",
        "nnc:adjectival-modification": "nnc",
        "nnc:adverbial": "nnc",
        "nnc:relational": "nnc",
        "nnc:place-gentilic": "nnc",
        "clause:composition": "clause",
        "vnc:denominal": "vnc",
        "nnc:personal-name": "nnc"
      });
    const ADVERBIAL_ADJUNCTION_RELATION = Object.freeze({
      time: "time",
      place: "place",
      duration: "duration",
      manner: "manner",
      comparedManner: "compared-manner",
      means: "means",
      consideration: "consideration",
      purpose: "purpose",
      condition: "condition",
      concession: "concession",
      consequence: "consequence",
      proviso: "proviso",
      reason: "reason",
      recursive: "recursive",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_UNIT = Object.freeze({
      nnc: "nnc",
      vnc: "vnc",
      particle: "particle",
      clause: "clause",
      sentence: "sentence",
      relationAst: "relation-ast",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_ORDER = Object.freeze({
      modifierHead: "modifier-head",
      headModifier: "head-modifier",
      appositiveHeadModifier: "appositive-head-modifier",
      principalAdverbialHead: "principal-adverbial-head",
      discontinuous: "discontinuous",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_RECURSION = Object.freeze({
      none: "none",
      head: "head",
      modifier: "modifier",
      both: "both",
      appositive: "appositive",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_MARKING = Object.freeze({
      unmarked: "unmarked",
      in: "in",
      tla: "tla",
      inTla: "in-tla",
      ma: "ma",
      inMa: "in-ma",
      inTlaNel: "in-tla-nel",
      inMaNel: "in-ma-nel",
      maNel: "ma-nel",
      maZo: "ma-zo",
      maZoTel: "ma-zo-tel",
      ca: "ca",
      iuh: "iuh",
      ahzo: "ahzo",
      particle: "particle",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_DEGREE = Object.freeze({
      first: "first",
      second: "second",
      nonadverbialized: "nonadverbialized",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_STRUCTURE = Object.freeze({
      simple: "simple",
      multipleNucleus: "multiple-nucleus",
      complex: "complex",
      apposition: "apposition",
      adverbialPrincipal: "adverbial-principal",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_CONTRAST = Object.freeze({
      adverbialModification: "adverbial-modification",
      supplementarySubject: "supplementary-subject",
      metaphoricalSupplement: "metaphorical-supplement",
      incorporatedAdverb: "incorporated-adverb",
      includedReferentSupplementation: "included-referent-supplementation",
      conjunction: "conjunction",
      adjectivalModification: "adjectival-modification",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_TIME_PROFILE = Object.freeze({
      implicit: "implicit",
      explicit: "explicit",
      corroborating: "corroborating",
      iuhState: "iuh-state",
      iuhqui: "iuhqui",
      elliptical: "elliptical",
      oneOutOfNumber: "one-out-of-number",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_CONDITION = Object.freeze({
      open: "open",
      hypotheticalPresentFuture: "hypothetical-present-future",
      hypotheticalPast: "hypothetical-past",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_PURPOSE = Object.freeze({
      unmarked: "unmarked",
      maOptative: "ma-optative",
      maAdmonitiveLest: "ma-admonitive-lest",
      purposiveVnc: "purposive-vnc",
      weak: "weak",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_CONCESSION = Object.freeze({
      inTlaNel: "in-tla-nel",
      inMaNel: "in-ma-nel",
      maZo: "ma-zo",
      maZoTel: "ma-zo-tel",
      atLeast: "at-least",
      unknown: "unknown"
    });
    const ADVERBIALIZED_RELATIONS_BY_RANK = Object.freeze({
      first: Object.freeze(["place", "duration", "manner", "compared-manner", "means"]),
      second: Object.freeze(["place", "time", "manner", "compared-manner"])
    });
    const NONADVERBIALIZED_ADJUNCTION_RELATIONS = Object.freeze([
      "time",
      "place",
      "manner",
      "consideration",
      "purpose",
      "condition",
      "concession",
      "consequence",
      "proviso",
      "reason"
    ]);
    const ADVERBIAL_ADJUNCTION_CAPABILITY_IDS = Object.freeze([
      "ambiguity.third-singular",
      "apposition.general-before-specific",
      "collocation.negative",
      "collocation.particle-adverbial",
      "collocation.traditional-solid-spelling",
      "concession.at-least",
      "concession.in-ma-nel",
      "concession.in-tla-nel",
      "concession.intensive-pronoun",
      "concession.ma-zo-family",
      "concession.negative",
      "concession.tel",
      "concession.za-zan-distinction",
      "condition.antecessive-absent",
      "condition.antecessive-optional-matched",
      "condition.center-nnc",
      "condition.center-vnc",
      "condition.future-embed-principal",
      "condition.future-optative",
      "condition.hypothetical",
      "condition.hypothetical-past",
      "condition.hypothetical-present-future",
      "condition.in-tla",
      "condition.indicative-optative-ambiguity",
      "condition.negative-ca",
      "condition.negative-camo",
      "condition.nonpast-optative",
      "condition.open",
      "condition.order-both",
      "condition.past-optative",
      "condition.present-for-past",
      "condition.present-indicative",
      "condition.preterit-optative",
      "condition.principal-sentence-types",
      "condition.principal-tense-governs-time",
      "condition.tla",
      "condition.tla-omitted-with-cue",
      "condition.until",
      "condition.wish-upgrade",
      "consequence.adverbialized-iuh",
      "consideration.intransitive-principal",
      "consideration.nonspecific-projective",
      "consideration.reflexive-principal",
      "consideration.shared-reference",
      "contrast.compared-manner",
      "contrast.included-referent-supplementation",
      "contrast.incorporated-adverb-counterpart",
      "contrast.metaphorical",
      "contrast.modification-conjunction",
      "contrast.supplementary-subject",
      "degree.first",
      "degree.nonadverbialized",
      "degree.second",
      "domain.compared-manner",
      "domain.duration",
      "domain.manner",
      "domain.means",
      "domain.place",
      "domain.time",
      "intensifier.adjectival-nnc-head",
      "intensifier.adverbial-head",
      "intensifier.lexicalized-collocation",
      "intensifier.precedes-head",
      "manner.iuh",
      "manner.quen",
      "nucleus.adjectival-modification",
      "nucleus.combination",
      "nucleus.supplementation",
      "order.head-modifier",
      "order.modifier-head",
      "place.apposition-ambiguity",
      "place.future-from-past",
      "place.reduced-copula",
      "proviso.negativized-ahzo",
      "purpose.adjectival-ambiguity",
      "purpose.conjunction-ambiguity",
      "purpose.future-usual",
      "purpose.in-optional",
      "purpose.ma-admonitive-lest",
      "purpose.ma-optative",
      "purpose.other-tense",
      "purpose.purposive-vnc",
      "purpose.unmarked",
      "purpose.weak-reading",
      "question.adjunctor-in",
      "question.cuix-initial-without-inherent",
      "question.cuix-optional",
      "question.included-loses-force",
      "question.inherent-initial",
      "question.mach",
      "question.quen-exception",
      "question.rhetorical-surrender",
      "rank.adverbial-principal",
      "rank.interrogative-upgrade",
      "reason.ca-principal-introducer",
      "reason.juxtaposed-sentences",
      "reason.negative",
      "reason.not-conjunction",
      "reason.translation-mirage",
      "recursion.appositive",
      "recursion.both",
      "recursion.head",
      "recursion.modifier",
      "recursion.modifier-internal",
      "recursion.unbounded",
      "relation.concession",
      "relation.condition",
      "relation.consequence",
      "relation.consideration",
      "relation.manner",
      "relation.place",
      "relation.proviso",
      "relation.purpose",
      "relation.reason",
      "relation.ten-types",
      "relation.time",
      "structure.complex",
      "structure.simple",
      "time.corroborating-principal",
      "time.downgrade-to-multiple-nucleus",
      "time.ellipsis",
      "time.explicit",
      "time.higher-principal-tense",
      "time.ic",
      "time.ihcuac",
      "time.implicit",
      "time.iuh-state",
      "time.iuhqui",
      "time.oc-ic",
      "time.one-out-of-number",
      "time.other-expression"
    ]);
    const ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE = Object.freeze({
      configuredAdverbioSurface: "configured-adverbio-surface",
      adverbialNuclearBoundary: "adverbial-nuclear-boundary",
      relationalNncBoundary: "relational-nnc-boundary",
      placeGentilicBoundary: "place-gentilic-boundary",
      adjectivalModificationBoundary: "adjectival-modification-boundary",
      particleLabel: "particle-label",
      routeLabel: "route-label",
      translationLabel: "translation-label",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES = Object.freeze(["adverbial-adjunction boundary metadata is not generation", "configured adverbio word output is not a clause-adjunction AST", "adverbial nuclear-clause metadata is not recursive adverbial adjunction", "relational and place/gentilic boundary metadata are not adjoined-clause evidence", "single generated NNC or VNC words do not prove adjoined-unit relations", "translations for time, place, manner, purpose, reason, or condition are not generated-clause evidence", "Andrews adverbial-adjunction categories are architecture; display or spelling text cannot authorize output"]);
    const ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "principalClause",
      asks: "Which Classical Nahuatl principal clause or sentence hosts the adjoined unit?"
    }), Object.freeze({
      field: "adjoinedUnit",
      asks: "Which NNC, VNC, particle-looking form, clause, or sentence is adjoined?"
    }), Object.freeze({
      field: "semanticRelation",
      asks: "Is the relation time, place, manner, consideration, purpose, concession, consequence, proviso, reason, recursive, or unknown?"
    }), Object.freeze({
      field: "adjoinedUnitType",
      asks: "Is the adjoined unit an NNC, VNC, particle, clause, sentence, or unknown?"
    }), Object.freeze({
      field: "marking",
      asks: "What marker, order, scope, or discontinuity evidence supports adjoined status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Andrews source model or user-provided clause context supports adverbial adjunction?"
    })]);
    function normalizeAdverbialAdjunctionEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeAdverbialAdjunctionRelation(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_RELATION), ADVERBIAL_ADJUNCTION_RELATION.unknown);
    }
    function normalizeAdverbialAdjunctionUnit(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_UNIT), ADVERBIAL_ADJUNCTION_UNIT.unknown);
    }
    function normalizeAdverbialAdjunctionOrder(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        preposed: ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
        "modifier-precedes-head": ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
        postposed: ADVERBIAL_ADJUNCTION_ORDER.headModifier,
        "modifier-follows-head": ADVERBIAL_ADJUNCTION_ORDER.headModifier,
        apposition: ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
        appositive: ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
        principal: ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead,
        "adverbial-principal": ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead
      };
      return aliases[normalized] || normalizeAdverbialAdjunctionEnum(normalized, Object.values(ADVERBIAL_ADJUNCTION_ORDER), ADVERBIAL_ADJUNCTION_ORDER.unknown);
    }
    function normalizeAdverbialAdjunctionRecursion(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_RECURSION), ADVERBIAL_ADJUNCTION_RECURSION.unknown);
    }
    function normalizeAdverbialAdjunctionMarking(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        "": ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        none: ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        unmarked: ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        "in-tla": ADVERBIAL_ADJUNCTION_MARKING.inTla,
        intla: ADVERBIAL_ADJUNCTION_MARKING.inTla,
        "in-ma": ADVERBIAL_ADJUNCTION_MARKING.inMa,
        inma: ADVERBIAL_ADJUNCTION_MARKING.inMa
      };
      return aliases[normalized] || normalizeAdverbialAdjunctionEnum(normalized, Object.values(ADVERBIAL_ADJUNCTION_MARKING), ADVERBIAL_ADJUNCTION_MARKING.unknown);
    }
    function normalizeAdverbialAdjunctionFalsePositiveSource(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE), ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE.unknown);
    }
    function normalizeAdverbialAdjunctionDegree(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_DEGREE), ADVERBIAL_ADJUNCTION_DEGREE.unknown);
    }
    function normalizeAdverbialAdjunctionStructure(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_STRUCTURE), ADVERBIAL_ADJUNCTION_STRUCTURE.unknown);
    }
    function normalizeAdverbialAdjunctionContrast(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_CONTRAST), ADVERBIAL_ADJUNCTION_CONTRAST.unknown);
    }
    function normalizeAdverbialAdjunctionTimeProfile(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_TIME_PROFILE), ADVERBIAL_ADJUNCTION_TIME_PROFILE.unknown);
    }
    function normalizeAdverbialAdjunctionCondition(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        hypothetical: ADVERBIAL_ADJUNCTION_CONDITION.hypotheticalPresentFuture,
        "present-future": ADVERBIAL_ADJUNCTION_CONDITION.hypotheticalPresentFuture,
        past: ADVERBIAL_ADJUNCTION_CONDITION.hypotheticalPast
      };
      return aliases[normalized] || normalizeAdverbialAdjunctionEnum(normalized, Object.values(ADVERBIAL_ADJUNCTION_CONDITION), ADVERBIAL_ADJUNCTION_CONDITION.unknown);
    }
    function normalizeAdverbialAdjunctionPurpose(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_PURPOSE), ADVERBIAL_ADJUNCTION_PURPOSE.unknown);
    }
    function normalizeAdverbialAdjunctionConcession(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_CONCESSION), ADVERBIAL_ADJUNCTION_CONCESSION.unknown);
    }
    function getAdverbialAdjunctionAntiConflationRules() {
      return Array.from(ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES);
    }
    function getAdverbialAdjunctionCapabilityInventory() {
      const readOnlyPrefixes = ["collocation.", "ambiguity.", "contrast."];
      return ADVERBIAL_ADJUNCTION_CAPABILITY_IDS.map(id => ({
        id,
        owner: readOnlyPrefixes.some(prefix => id.startsWith(prefix))
          ? "typed-adverbial-adjunction-analysis"
          : "canonical-adverbial-adjunction-evaluator",
        runtimeEffect: readOnlyPrefixes.some(prefix => id.startsWith(prefix))
          ? "classification-or-restriction"
          : "validation-or-composition",
        authorizesSurfaceSpelling: false,
        authorizesClauseComposition: !id.startsWith("collocation.")
      }));
    }
    function getAdverbialAdjunctionStructuralQuestions() {
      return ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachAdverbialAdjunctionGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "adverbial-adjunction",
        routeFamily: "adverbial-adjunction",
        ...options
      }, grammarFrameOwnerCapability);
    }
    function getAdverbialAdjunctionApplicationCapture(input = null, role = "unknown") {
      if (
        !input
        || typeof input !== "object"
        || typeof targetObject.captureClassicalGrammarApplicationResult !== "function"
        || typeof targetObject.isClassicalGrammarApplicationResultCapture !== "function"
      ) {
        return null;
      }
      const slotId = `adverbial-adjunction:${String(role || "unknown")}`;
      const capture = targetObject.captureClassicalGrammarApplicationResult(
        input,
        slotId
      );
      return targetObject.isClassicalGrammarApplicationResultCapture(
        capture,
        slotId
      ) === true
        ? capture
        : null;
    }
    function getAdverbialAdjunctionApplicationSurface(result = null) {
      const candidates = [
        result?.wordSurface,
        result?.surfaceRealization,
        result?.surface,
        result?.writtenProjection?.result,
        result?.sentenceSurfaceDisplay,
        result?.sentenceSurface,
        result?.canonicalNuclearSurface,
        result?.nuclearSurface,
        result?.resultFrame?.wordSurface,
        result?.resultFrame?.surfaceRealization,
        result?.resultFrame?.surface,
        result?.finiteSurfaceFrame?.wordSurface,
        result?.finiteSurfaceFrame?.surfaceRealization
      ];
      return String(
        candidates.find(value => String(value || "").trim()) || ""
      ).trim();
    }
    function getAdverbialAdjunctionApplicationFeatureValue(
      result = null,
      keys = []
    ) {
      const frames = [
        result,
        result?.normalizedRequest,
        result?.operationFrame,
        result?.operationFrame?.operationFacts,
        result?.canonicalVncFrame,
        result?.canonicalVncFrame?.normalizedRequest,
        result?.canonicalVncFrame?.resultFrame,
        result?.resultFrame,
        result?.resultFrame?.normalizedRequest,
        result?.finiteSurfaceFrame,
        result?.sourceFrame
      ].filter(frame => frame && typeof frame === "object");
      for (const frame of frames) {
        for (const key of keys) {
          if (frame[key] !== undefined && frame[key] !== null && frame[key] !== "") {
            return frame[key];
          }
        }
      }
      return "";
    }
    function buildAdverbialAdjunctionApplicationSourceUnit(
      capture = null,
      role = "unknown"
    ) {
      const operationId = String(capture?.operationId || "");
      const unitType =
        ADVERBIAL_ADJUNCTION_APPLICATION_SOURCE_UNIT_BY_OPERATION[operationId]
        || "";
      const result = capture?.canonicalResult || null;
      if (
        !unitType
        || capture?.outputKind !== "scalar"
        || !result
        || typeof result !== "object"
      ) {
        return null;
      }
      const surface = getAdverbialAdjunctionApplicationSurface(result);
      const mood = String(getAdverbialAdjunctionApplicationFeatureValue(
        result,
        ["requestedSemanticMood", "semanticMood", "mood"]
      ) || "").trim().toLowerCase();
      const tense = String(getAdverbialAdjunctionApplicationFeatureValue(
        result,
        [
          "semanticTenseValue",
          "requestedSemanticTense",
          "semanticTense",
          "tense"
        ]
      ) || "").trim().toLowerCase();
      const lexicalEntryId = String(
        result.lexicalEntryId
        || result.lexicalAuthorizationFrame?.lexicalEntryId
        || ""
      ).trim().toLowerCase();
      const formulaIdentity = [
        "classical-grammar-application",
        operationId,
        String(result.kind || "canonical-result")
      ].join(":");
      return Object.freeze({
        kind: "canonical-adverbial-adjunction-source-unit",
        role: String(role || "unknown"),
        ok: Boolean(surface),
        sourceKind: "application-canonical-result",
        unitType,
        surface,
        surfaceForms: Object.freeze(surface ? [surface] : []),
        formulaRealizationRecordId: formulaIdentity,
        formulaRecordId: formulaIdentity,
        astKind: "",
        features: Object.freeze({
          unitKind: unitType,
          mood,
          tense,
          antecessive: getAdverbialAdjunctionApplicationFeatureValue(
            result,
            ["sentenceAntecessive", "antecessive"]
          ) === true,
          futureEmbed: false,
          sentenceType: String(getAdverbialAdjunctionApplicationFeatureValue(
            result,
            ["sentenceType"]
          ) || ""),
          adverbialCenter: operationId === "nnc:adverbial"
            && (lexicalEntryId === "44.3-iuh" || surface.toLowerCase() === "iuh")
            ? "iuh"
            : "",
          negativizedParticle: ""
        }),
        grammarFrame: null,
        applicationCapture: capture,
        issuedResult: result
      });
    }
    function getCanonicalAdverbialAdjunctionSourceUnit(input = null, role = "unknown") {
      const issuedSupplementation = Boolean(
        input
        && typeof targetObject.isClassicalNahuatlSupplementationFrame
          === "function"
        && targetObject.isClassicalNahuatlSupplementationFrame(input) === true
        && input.authorizationStatus === "authorized"
      );
      if (issuedSupplementation) {
        const surface = String(input.surfaceRealization || "")
          .trim()
          .replace(/[.?!]$/u, "");
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit",
          role: String(role || "unknown"),
          ok: Boolean(
            surface
            && input.formulaRealization
            && input.canonicalSignature
          ),
          sourceKind: "composition-ast",
          unitType: "sentence",
          surface,
          surfaceForms: Object.freeze(surface ? [surface] : []),
          formulaRealizationRecordId: input.canonicalSignature,
          formulaRecordId:
            input.principalClause?.canonicalSignature
            || input.canonicalSignature,
          astKind: "classical-nahuatl-supplementation-ast",
          features: Object.freeze({
            unitKind: "sentence",
            mood: "",
            tense: "",
            antecessive: false,
            futureEmbed: false,
            sentenceType: "supplementation",
            adverbialCenter: "",
            negativizedParticle: "",
          }),
          grammarFrame: null,
          issuedResult: input,
        });
      }
      const issuedLateVncClosure = Boolean(
        input
        && typeof targetObject.isClassicalNahuatlClosureFrame
          === "function"
        && targetObject.isClassicalNahuatlClosureFrame(input)
          === true
        && input.authorizationStatus === "authorized"
      );
      if (issuedLateVncClosure) {
        const finiteSurface = input.finiteSurfaceFrame || {};
        const normalizedRequest = input.normalizedRequest || {};
        const baseNormalizedRequest =
          input.baseApplicationFrame?.normalizedRequest || {};
        const surface = String(
          input.surfaceRealization
          || finiteSurface.wordRealization
          || ""
        ).trim();
        const semanticMood = String(
          normalizedRequest.mood
          || baseNormalizedRequest.requestedSemanticMood
          || baseNormalizedRequest.mood
          || ""
        ).trim().toLowerCase();
        const semanticTense = String(
          normalizedRequest.tense
          || baseNormalizedRequest.semanticTenseValue
          || baseNormalizedRequest.requestedSemanticTense
          || baseNormalizedRequest.tense
          || ""
        ).trim().toLowerCase();
        const futureEmbed = [
          normalizedRequest.variant,
          input.operationFrame?.operation,
          input.operationFrame?.variant,
          input.operationFrame?.ruleFamily,
          input.operationFrame?.operationFacts?.embedTenseMorph
            ? input.operationFrame?.operationFacts?.variant
            : ""
        ].some(value => (
          String(value || "").trim().toLowerCase().includes("future-embed")
        ));
        const antecessive = Boolean(
          normalizedRequest.sentenceAntecessive === true
          || normalizedRequest.sentenceOptions?.sentenceAntecessive === true
          || baseNormalizedRequest.sentenceAntecessive === true
          || baseNormalizedRequest.sentenceOptions?.sentenceAntecessive === true
          || input.operationFrame?.operationFacts?.antecessive === true
          || (
            input.operationFrame?.operationFacts?.antecessiveOrderRequested
              === true
            && input.operationFrame?.operationFacts
              ?.antecessiveScopesFiniteMatrixTense === true
          )
        );
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit",
          role: String(role || "unknown"),
          ok: Boolean(surface),
          sourceKind: "issued-late-vnc-closure-result",
          unitType: "vnc",
          surface,
          surfaceForms: Object.freeze(surface ? [surface] : []),
          formulaRealizationRecordId: String(
            finiteSurface.canonicalSignature
            || `${input.kind}:finite-result`
          ),
          formulaRecordId: String(
            finiteSurface.typedFrame?.canonicalSignature
            || input.finalTypedVncSlotFrame?.semanticIdentity
            || `${input.kind}:typed-vnc-result`
          ),
          astKind: "",
          features: Object.freeze({
            unitKind: "vnc",
            mood: semanticMood,
            tense: semanticTense,
            antecessive,
            futureEmbed,
            sentenceType: String(
              baseNormalizedRequest.sentenceOptions?.sentenceType
              || baseNormalizedRequest.sentenceType
              || ""
            ),
            adverbialCenter: "",
            negativizedParticle: ""
          }),
          grammarFrame: null,
          issuedResult: input
        });
      }
      const issuedVncApplication = Boolean(
        input
        && typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
        && targetObject.isClassicalNahuatlVncApplicationFrame(input) === true
      );
      if (issuedVncApplication) {
        const applicationResult = input.resultFrame || {};
        const finiteSurface = applicationResult.finiteSurfaceFrame || {};
        const surface = String(
          applicationResult.surfaceRealization
          || finiteSurface.wordRealization
          || ""
        ).trim();
        const normalizedRequest = input.normalizedRequest || {};
        const semanticMood = String(
          normalizedRequest.requestedSemanticMood
          || normalizedRequest.mood
          || ""
        ).trim().toLowerCase();
        const semanticTense = String(
          normalizedRequest.semanticTenseValue
          || normalizedRequest.requestedSemanticTense
          || normalizedRequest.tense
          || ""
        ).trim().toLowerCase();
        const futureEmbed = [
          normalizedRequest.lateVariant,
          normalizedRequest.compoundVariant,
          applicationResult.derivationOperationFrame?.operationFamily,
          applicationResult.derivationOperationFrame?.variant
        ].some(value => String(value || "").toLowerCase().includes("future-embed"));
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit",
          role: String(role || "unknown"),
          ok: Boolean(surface),
          sourceKind: "issued-vnc-application-result",
          unitType: "vnc",
          surface,
          surfaceForms: Object.freeze(surface ? [surface] : []),
          formulaRealizationRecordId: String(
            finiteSurface.canonicalSignature
            || `${input.kind}:finite-result`
          ),
          formulaRecordId: String(
            finiteSurface.typedFrame?.canonicalSignature
            || `${input.kind}:typed-vnc-result`
          ),
          astKind: "",
          features: Object.freeze({
            unitKind: "vnc",
            mood: semanticMood,
            tense: semanticTense,
            antecessive: normalizedRequest.sentenceAntecessive === true
              || normalizedRequest.sentenceOptions?.sentenceAntecessive === true,
            futureEmbed,
            sentenceType: String(
              normalizedRequest.sentenceOptions?.sentenceType
              || normalizedRequest.sentenceType
              || ""
            ),
            adverbialCenter: "",
            negativizedParticle: ""
          }),
          grammarFrame: null,
          issuedResult: input
        });
      }
      const issuedNncSentence = Boolean(
        input
        && typeof targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame === "function"
        && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(input) === true
      );
      if (issuedNncSentence) {
        const surface = String(
          input.canonicalNuclearSurface
          || input.nuclearSurface
          || ""
        ).trim();
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit",
          role: String(role || "unknown"),
          ok: Boolean(surface),
          sourceKind: "issued-nnc-sentence-result",
          unitType: "nnc",
          surface,
          surfaceForms: Object.freeze(surface ? [surface] : []),
          formulaRealizationRecordId: "nnc-sentence-composition:issued-result",
          formulaRecordId: "nnc-nuclear-clause:typed-result",
          astKind: "",
          features: Object.freeze({
            unitKind: "nnc",
            mood: "",
            tense: "",
            antecessive: false,
            futureEmbed: false,
            sentenceType: String(input.sentenceType || ""),
            adverbialCenter: "",
            negativizedParticle: ""
          }),
          grammarFrame: null,
          issuedResult: input
        });
      }
      const issuedVncSentence = Boolean(
        input
        && typeof targetObject.isClassicalNahuatlVncSentenceResultFrame === "function"
        && targetObject.isClassicalNahuatlVncSentenceResultFrame(input) === true
      );
      if (issuedVncSentence) {
        const surface = String(
          input.sentenceSurfaceDisplay
          || input.consumedNuclearSurface
          || ""
        ).trim();
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit",
          role: String(role || "unknown"),
          ok: Boolean(surface),
          sourceKind: "issued-vnc-sentence-result",
          unitType: "sentence",
          surface,
          surfaceForms: Object.freeze(surface ? [surface] : []),
          formulaRealizationRecordId:
            "vnc-sentence-composition:issued-result",
          formulaRecordId: "vnc-nuclear-clause:typed-result",
          astKind: "",
          features: Object.freeze({
            unitKind: "sentence",
            mood: "",
            tense: "",
            antecessive: false,
            futureEmbed: false,
            sentenceType: "",
            adverbialCenter: "",
            negativizedParticle: ""
          }),
          grammarFrame: null,
          issuedResult: input
        });
      }
      const issuedGrammarBackedResult = Boolean(
        getAdverbialAdjunctionResultFrame(input)
      );
      const applicationCapture = issuedGrammarBackedResult
        ? null
        : getAdverbialAdjunctionApplicationCapture(input, role);
      const applicationSource =
        buildAdverbialAdjunctionApplicationSourceUnit(
          applicationCapture,
          role
        );
      if (applicationSource?.ok) {
        return applicationSource;
      }
      if (
        applicationCapture
        && applicationCapture.canonicalResult
        && applicationCapture.canonicalResult !== input
      ) {
        return getCanonicalAdverbialAdjunctionSourceUnit(
          applicationCapture.canonicalResult,
          role
        );
      }
      if (applicationSource) {
        return applicationSource;
      }
      const grammarFrame = getAdverbialAdjunctionResultFrame(input);
      const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
      const realizationRecords = resultFrame
        ? (Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length
          ? resultFrame.formulaRealizationRecords
          : resultFrame.formulaRealizationRecord
            ? [resultFrame.formulaRealizationRecord]
            : [])
        : [];
      const canonicalRealization = realizationRecords.find(record => (
        record
        && typeof record === "object"
        && record.kind === "grammar-formula-realization-record"
        && getAdverbialAdjunctionCanonicalRealizationSurfaceForms({
          formulaRealizationRecords: [record]
        }).length
      )) || null;
      const canonicalAst = grammarFrame?.astFrame
        && typeof grammarFrame.astFrame === "object"
        && grammarFrame.astFrame.supported === true
        && String(grammarFrame.astFrame.kind || "").endsWith("-ast")
        ? grammarFrame.astFrame
        : null;
      const surfaceForms = canonicalRealization
        ? getAdverbialAdjunctionCanonicalRealizationSurfaceForms({
          formulaRealizationRecords: [canonicalRealization]
        })
        : canonicalAst && resultFrame
          ? [resultFrame.surface, ...(Array.isArray(resultFrame.surfaceForms) ? resultFrame.surfaceForms : [])]
            .map(entry => String(entry || "").trim())
            .filter((entry, index, list) => entry && !entry.includes("/") && list.indexOf(entry) === index)
          : [];
      const surface = surfaceForms[0] || "";
      const inflectionFrame = grammarFrame?.inflectionFrame && typeof grammarFrame.inflectionFrame === "object"
        ? grammarFrame.inflectionFrame
        : {};
      const nuclearClauseFrame = grammarFrame?.nuclearClauseFrame && typeof grammarFrame.nuclearClauseFrame === "object"
        ? grammarFrame.nuclearClauseFrame
        : {};
      const routeTarget = grammarFrame?.routeContract?.targetContract
        && typeof grammarFrame.routeContract.targetContract === "object"
        ? grammarFrame.routeContract.targetContract
        : {};
      const morphBoundaryFrame = grammarFrame?.morphBoundaryFrame
        && typeof grammarFrame.morphBoundaryFrame === "object"
        ? grammarFrame.morphBoundaryFrame
        : {};
      const futureEmbed = [
        routeTarget.operation,
        routeTarget.operationFamily,
        routeTarget.compoundType,
        routeTarget.compoundVariant,
        morphBoundaryFrame.operation,
        morphBoundaryFrame.operationFamily,
        morphBoundaryFrame.compoundType,
        morphBoundaryFrame.compoundVariant
      ].some(value => String(value || "").toLowerCase().includes("future-embed"));
      const mood = String(
        inflectionFrame.semanticMood
        || inflectionFrame.mood
        || nuclearClauseFrame.semanticMood
        || nuclearClauseFrame.mood
        || ""
      ).trim().toLowerCase();
      const tense = String(
        inflectionFrame.semanticTense
        || inflectionFrame.tense
        || nuclearClauseFrame.semanticTense
        || nuclearClauseFrame.tense
        || ""
      ).trim().toLowerCase();
      const antecessive = [
        inflectionFrame.antecessiveOrder,
        inflectionFrame.antecessive,
        nuclearClauseFrame.antecessiveOrder,
        nuclearClauseFrame.antecessive,
        morphBoundaryFrame.antecessiveOrder,
        morphBoundaryFrame.antecessive
      ].some(value => value === true);
      return Object.freeze({
        kind: "canonical-adverbial-adjunction-source-unit",
        role: String(role || "unknown"),
        ok: Boolean(resultFrame?.ok !== false && surface && (canonicalRealization || canonicalAst)),
        sourceKind: canonicalAst ? "composition-ast" : canonicalRealization ? "formula-realization" : "untrusted",
        unitType: String(
          grammarFrame?.unitFrame?.unitKind
          || grammarFrame?.unitFrame?.outputKind
          || resultFrame?.outputKind
          || ""
        ),
        surface,
        surfaceForms: Object.freeze(surfaceForms),
        formulaRealizationRecordId: String(canonicalRealization?.id || ""),
        formulaRecordId: String(canonicalRealization?.formulaRecordId || resultFrame?.formulaRecord?.id || ""),
        astKind: String(canonicalAst?.kind || ""),
        features: Object.freeze({
          unitKind: String(
            grammarFrame?.unitFrame?.unitKind
            || grammarFrame?.unitFrame?.outputKind
            || resultFrame?.outputKind
            || ""
          ),
          mood,
          tense,
          antecessive,
          futureEmbed,
          sentenceType: String(nuclearClauseFrame.sentenceType || ""),
          adverbialCenter: String(
            nuclearClauseFrame.adverbialCenter
            || nuclearClauseFrame.predicateCenter
            || morphBoundaryFrame.adverbialCenter
            || ""
          ).trim().toLowerCase(),
          negativizedParticle: String(
            nuclearClauseFrame.negativizedParticle
            || morphBoundaryFrame.negativizedParticle
            || (
              String(morphBoundaryFrame.marking || "").trim().toLowerCase()
                === "ahzo"
                ? "ahzo"
                : ""
            )
            || ""
          ).trim().toLowerCase()
        }),
        grammarFrame
      });
    }
    function getAdverbialAdjunctionRanksForUnit(
      relation = "",
      unitType = ADVERBIAL_ADJUNCTION_UNIT.unknown
    ) {
      const ranks = [];
      if (unitType === ADVERBIAL_ADJUNCTION_UNIT.nnc) {
        for (const rank of [
          ADVERBIAL_ADJUNCTION_DEGREE.first,
          ADVERBIAL_ADJUNCTION_DEGREE.second
        ]) {
          if (ADVERBIALIZED_RELATIONS_BY_RANK[rank]?.includes(relation)) {
            ranks.push(rank);
          }
        }
      }
      if (NONADVERBIALIZED_ADJUNCTION_RELATIONS.includes(relation)) {
        ranks.push(ADVERBIAL_ADJUNCTION_DEGREE.nonadverbialized);
      }
      return Object.freeze(ranks);
    }
    function issueRelationalNumeralCoCAdjunctionContract(
      principalClause = null,
      adjoinedUnit = null,
    ) {
      const exactRelational = value => Boolean(
        typeof targetObject.isClassicalNahuatlRelationalResult === "function"
        && targetObject.isClassicalNahuatlRelationalResult(value) === true
      );
      const headIsCoC = exactRelational(principalClause)
        && principalClause.stemId === "co-c-specific-location"
        && principalClause.option === "option-two";
      if (!headIsCoC) return null;
      const rawCardinal = Boolean(
        typeof targetObject.isClassicalNahuatlNominalConstructionResult
          === "function"
        && targetObject.isClassicalNahuatlNominalConstructionResult(
          adjoinedUnit,
        ) === true
        && adjoinedUnit.constructionKind === "cardinal-numeral-nnc"
      );
      const modifierIsRelational = exactRelational(adjoinedUnit);
      const modifierSource = modifierIsRelational
        ? adjoinedUnit.sourceFrame || {}
        : {};
      const modifierSegments = modifierIsRelational
        ? adjoinedUnit.operationFrame?.predicateStemFrame?.predicateSegments
          || []
        : [];
      const modifierEmbed = String(
        modifierSource.predicateStemFrame?.internalAnalysis?.embed || "",
      );
      const modifierMorphemes = modifierSegments.map(
        segment => String(segment?.morpheme || ""),
      );
      const supportiveNShape = modifierEmbed === "cec"
        && modifierMorphemes.length === 2
        && modifierMorphemes[0] === "cec"
        && modifierMorphemes[1] === "ni";
      const positionalCanShape = modifierSource.formationId === "can-modified"
        && ["cec", "ōc"].includes(modifierEmbed)
        && modifierMorphemes.length === 3
        && modifierMorphemes[0] === modifierEmbed
        && modifierMorphemes[1] === "cā"
        && modifierMorphemes[2] === "n";
      const numeralLocativeShape = modifierIsRelational
        && adjoinedUnit.stemId === "n-locative"
        && adjoinedUnit.option === "option-two"
        && (supportiveNShape || positionalCanShape);
      if (!rawCardinal && !numeralLocativeShape) return null;
      const diagnostics = [];
      if (rawCardinal) {
        diagnostics.push("numeral-modifier-adverbial-result-required");
      }
      if (
        principalClause.sourceState !== "absolutive"
        || principalClause.sourceFrame?.subjectMode !== "adverbialized"
      ) {
        diagnostics.push(
          "co-c-head-adverbialized-absolutive-result-required",
        );
      }
      if (
        numeralLocativeShape
        && (
          adjoinedUnit.sourceState !== "absolutive"
          || modifierSource.subjectMode !== "adverbialized"
        )
      ) {
        diagnostics.push(
          "numeral-modifier-adverbialized-absolutive-result-required",
        );
      }
      const frame = Object.freeze({
        kind:
          "classical-nahuatl-relational-numeral-co-c-adjunction-contract",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        authorizationStatus: diagnostics.length ? "blocked" : "authorized",
        blockReason: diagnostics[0] || "",
        diagnostics: Object.freeze(diagnostics),
        recovery: rawCardinal
          ? "First make the numeral locative Result (for example cecni or ceccān), then use that Result as the modifier."
          : "",
        principalResult: principalClause,
        adjoinedResult: numeralLocativeShape ? adjoinedUnit : null,
        exactResultIdentitiesPreserved: !diagnostics.length,
        relation: ADVERBIAL_ADJUNCTION_RELATION.place,
        degree: ADVERBIAL_ADJUNCTION_DEGREE.second,
        structure: ADVERBIAL_ADJUNCTION_STRUCTURE.simple,
        order: ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
        recursion: ADVERBIAL_ADJUNCTION_RECURSION.none,
        marking: ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        sourceShape: supportiveNShape
          ? "cec-ni"
          : positionalCanShape
            ? "numeral-ca-n"
            : "raw-cardinal",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
      });
      issuedRelationalNumeralCoCContracts.add(frame);
      return frame;
    }
    function isRelationalNumeralCoCAdjunctionContract(frame = null) {
      return Boolean(
        frame
        && issuedRelationalNumeralCoCContracts.has(frame)
        && frame.kind
          === "classical-nahuatl-relational-numeral-co-c-adjunction-contract"
        && frame.version === ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION
        && ["authorized", "blocked"].includes(frame.authorizationStatus)
        && Array.isArray(frame.diagnostics)
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.lessonMetadataAuthority === false
        && Object.isFrozen(frame)
        && Object.isFrozen(frame.diagnostics)
      );
    }
    function issueAdverbialAdjunctionAvailabilityContract({
      principalClause = null,
      adjoinedUnit = null
    } = {}) {
      const principalSource = getCanonicalAdverbialAdjunctionSourceUnit(
        principalClause,
        "principal"
      );
      const adjoinedSource = getCanonicalAdverbialAdjunctionSourceUnit(
        adjoinedUnit,
        "adjoined"
      );
      const diagnostics = [];
      if (!principalSource?.ok) {
        diagnostics.push(
          "adverbial-adjunction-availability-canonical-principal-result-required"
        );
      }
      if (!adjoinedSource?.ok) {
        diagnostics.push(
          "adverbial-adjunction-availability-canonical-adjoined-result-required"
        );
      }
      const unitType = normalizeAdverbialAdjunctionUnit(
        adjoinedSource?.features?.unitKind || adjoinedSource?.unitType || ""
      );
      if (
        adjoinedSource?.ok
        && unitType === ADVERBIAL_ADJUNCTION_UNIT.unknown
      ) {
        diagnostics.push(
          "adverbial-adjunction-availability-canonical-unit-type-required"
        );
      }
      const relationalNumeralCoCContract =
        issueRelationalNumeralCoCAdjunctionContract(
          principalClause,
          adjoinedUnit,
        );
      if (
        relationalNumeralCoCContract?.authorizationStatus === "blocked"
      ) {
        diagnostics.push(relationalNumeralCoCContract.blockReason);
      }
      const relationRanks = diagnostics.length
        ? []
        : relationalNumeralCoCContract?.authorizationStatus === "authorized"
          ? [Object.freeze({
            relation: ADVERBIAL_ADJUNCTION_RELATION.place,
            ranks: Object.freeze([ADVERBIAL_ADJUNCTION_DEGREE.second]),
          })]
          : Object.values(ADVERBIAL_ADJUNCTION_RELATION)
          .filter(relation => ![
            ADVERBIAL_ADJUNCTION_RELATION.recursive,
            ADVERBIAL_ADJUNCTION_RELATION.unknown
          ].includes(relation))
          .map(relation => Object.freeze({
            relation,
            ranks: getAdverbialAdjunctionRanksForUnit(relation, unitType)
          }))
          .filter(entry => entry.ranks.length);
      const contract = Object.freeze({
        kind: "adverbial-adjunction-availability-contract",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        operationId: "clause:adverbial-adjunction",
        evaluationMode: "scalar-clause-composition",
        paradigmApplicability: "not-applicable",
        authorizationStatus: diagnostics.length ? "blocked" : "authorized",
        blockReason: diagnostics[0] || "",
        diagnostics: Object.freeze(diagnostics),
        sourceContract: Object.freeze({
          principalSourceKind: principalSource?.sourceKind || "",
          adjoinedSourceKind: adjoinedSource?.sourceKind || "",
          adjoinedUnitType: unitType,
          rejectsRawStrings: true,
          rejectsCopiedResults: true,
          rejectsLessonMetadata: true,
          rejectsStoredAnswers: true
        }),
        relationalNumeralCoCContract,
        recovery: relationalNumeralCoCContract?.recovery || "",
        relationRanks: Object.freeze(relationRanks),
        availableRelations: Object.freeze(
          relationRanks.map(entry => entry.relation)
        ),
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        storedStateAuthority: false
      });
      issuedAdverbialAdjunctionSelectionContracts.add(contract);
      return contract;
    }
    function isAdverbialAdjunctionAvailabilityContract(contract = null) {
      return Boolean(
        issuedAdverbialAdjunctionSelectionContracts.has(contract)
        && contract?.kind === "adverbial-adjunction-availability-contract"
        && contract.version === ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION
        && contract.operationId === "clause:adverbial-adjunction"
        && ["authorized", "blocked"].includes(contract.authorizationStatus)
        && Array.isArray(contract.relationRanks)
        && Array.isArray(contract.availableRelations)
        && (
          contract.relationalNumeralCoCContract == null
          || isRelationalNumeralCoCAdjunctionContract(
            contract.relationalNumeralCoCContract,
          )
        )
        && contract.formulaStringAuthority === false
        && contract.surfaceStringAuthority === false
      );
    }
    function getAdverbialAdjunctionRanksFromAvailability(
      contract = null,
      relation = ""
    ) {
      if (
        !isAdverbialAdjunctionAvailabilityContract(contract)
        || contract.authorizationStatus !== "authorized"
      ) {
        return Object.freeze([]);
      }
      const normalizedRelation = normalizeAdverbialAdjunctionRelation(relation);
      const availability = contract.relationRanks.find(
        entry => entry.relation === normalizedRelation
      );
      return Object.freeze(
        Array.isArray(availability?.ranks)
          ? Array.from(availability.ranks)
          : []
      );
    }
    function buildAdverbialAdjunctionRuleProfile(request = {}) {
      const relation = normalizeAdverbialAdjunctionRelation(request.semanticRelation || request.relation);
      const degree = normalizeAdverbialAdjunctionDegree(request.adverbializationDegree || request.degree);
      const structure = normalizeAdverbialAdjunctionStructure(request.structureKind || request.structure);
      const order = normalizeAdverbialAdjunctionOrder(request.order);
      const recursion = normalizeAdverbialAdjunctionRecursion(request.recursion);
      const marking = normalizeAdverbialAdjunctionMarking(request.marking);
      const contrast = normalizeAdverbialAdjunctionContrast(request.contrast);
      const timeProfile = normalizeAdverbialAdjunctionTimeProfile(request.timeProfile);
      const conditionType = normalizeAdverbialAdjunctionCondition(request.conditionType);
      const purposeType = normalizeAdverbialAdjunctionPurpose(request.purposeType);
      const concessionType = normalizeAdverbialAdjunctionConcession(request.concessionType);
      return Object.freeze({
        kind: "adverbial-adjunction-rule-profile",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        relation,
        degree,
        structure,
        order,
        recursion,
        marking,
        contrast,
        timeProfile,
        conditionType,
        purposeType,
        concessionType,
        unitType: normalizeAdverbialAdjunctionUnit(request.adjoinedUnitType),
        intensifier: request.intensifier === true,
        inherentlyInterrogative: request.inherentlyInterrogative === true,
        interrogativeForceRetained: request.interrogativeForceRetained === true,
        includedInLargerSentence: request.includedInLargerSentence === true,
        conditionalCuePresent: request.conditionalCuePresent === true,
        negative: request.negative === true,
        principalCorroboratingAdverbial: request.principalCorroboratingAdverbial === true,
        reducedCopula: request.reducedCopula === true,
        explicitAdverbialIndicator: request.explicitAdverbialIndicator === true
      });
    }
    function validateAdverbialAdjunctionRuleProfile({
      principalSource = null,
      adjoinedSource = null,
      markerSource = null,
      profile = null
    } = {}) {
      const diagnostics = [];
      if (!principalSource?.ok) diagnostics.push("adverbial-adjunction-canonical-principal-result-required");
      if (!adjoinedSource?.ok) diagnostics.push("adverbial-adjunction-canonical-adjoined-result-required");
      if (!profile || profile.kind !== "adverbial-adjunction-rule-profile") {
        diagnostics.push("adverbial-adjunction-typed-rule-profile-required");
        return Object.freeze({
          ok: false,
          diagnostics: Object.freeze(diagnostics)
        });
      }
      if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.unknown) {
        diagnostics.push("adverbial-adjunction-relation-required");
      }
      if (profile.order === ADVERBIAL_ADJUNCTION_ORDER.unknown) {
        diagnostics.push("adverbial-adjunction-order-required");
      }
      if (profile.unitType === ADVERBIAL_ADJUNCTION_UNIT.unknown) {
        diagnostics.push("adverbial-adjunction-unit-type-required");
      }
      const canonicalAdjoinedUnitType = normalizeAdverbialAdjunctionUnit(
        adjoinedSource?.features?.unitKind || adjoinedSource?.unitType || ""
      );
      if (
        adjoinedSource?.ok
        && canonicalAdjoinedUnitType !== ADVERBIAL_ADJUNCTION_UNIT.unknown
        && profile.unitType !== ADVERBIAL_ADJUNCTION_UNIT.unknown
        && canonicalAdjoinedUnitType !== profile.unitType
      ) {
        diagnostics.push(
          "adverbial-adjunction-adjoined-unit-type-does-not-match-canonical-result"
        );
      }
      if (profile.marking !== ADVERBIAL_ADJUNCTION_MARKING.unmarked && !markerSource?.ok) {
        diagnostics.push("adverbial-adjunction-canonical-marker-result-required");
      }
      const isAdverbialized = profile.degree === ADVERBIAL_ADJUNCTION_DEGREE.first
        || profile.degree === ADVERBIAL_ADJUNCTION_DEGREE.second;
      const isNonadverbialized =
        profile.degree === ADVERBIAL_ADJUNCTION_DEGREE.nonadverbialized;
      if (!isAdverbialized && !isNonadverbialized) {
        diagnostics.push("adverbial-adjunction-degree-required");
      }
      if (isAdverbialized) {
        const licensedDomains =
          ADVERBIALIZED_RELATIONS_BY_RANK[profile.degree] || [];
        if (!licensedDomains.includes(profile.relation)) {
          diagnostics.push("adverbial-adjunction-degree-domain-not-licensed");
        }
        if (profile.structure === ADVERBIAL_ADJUNCTION_STRUCTURE.unknown) {
          diagnostics.push(
            "adverbial-adjunction-adverbialized-structure-required"
          );
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.comparedManner
          && profile.contrast !== ADVERBIAL_ADJUNCTION_CONTRAST.adverbialModification) {
          diagnostics.push("adverbial-adjunction-compared-manner-contrast-required");
        }
        if (profile.intensifier && profile.order !== ADVERBIAL_ADJUNCTION_ORDER.modifierHead) {
          diagnostics.push("adverbial-adjunction-intensifier-must-precede-head");
        }
        if (profile.inherentlyInterrogative
          && ![ADVERBIAL_ADJUNCTION_ORDER.modifierHead, ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead].includes(profile.order)) {
          diagnostics.push("adverbial-adjunction-interrogative-modifier-must-be-initial");
        }
        if (profile.includedInLargerSentence && profile.interrogativeForceRetained) {
          diagnostics.push("adverbial-adjunction-included-interrogative-loses-force");
        }
        if (profile.structure === ADVERBIAL_ADJUNCTION_STRUCTURE.apposition) {
          if (![ADVERBIAL_ADJUNCTION_RELATION.place, ADVERBIAL_ADJUNCTION_RELATION.time].includes(profile.relation)) {
            diagnostics.push("adverbial-adjunction-apposition-requires-place-or-time");
          }
          if (profile.order !== ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier) {
            diagnostics.push("adverbial-adjunction-appositive-modifier-must-follow-head");
          }
          if (profile.recursion !== ADVERBIAL_ADJUNCTION_RECURSION.appositive) {
            diagnostics.push("adverbial-adjunction-appositive-recursion-profile-required");
          }
        }
        if (profile.structure === ADVERBIAL_ADJUNCTION_STRUCTURE.adverbialPrincipal
          && profile.order !== ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead) {
          diagnostics.push("adverbial-adjunction-adverbial-principal-rank-order-required");
        }
        const principalIsAst = principalSource?.sourceKind === "composition-ast";
        const adjoinedIsAst = adjoinedSource?.sourceKind === "composition-ast";
        if (profile.recursion === ADVERBIAL_ADJUNCTION_RECURSION.head && !principalIsAst) {
          diagnostics.push("adverbial-adjunction-head-recursion-requires-recursive-head");
        }
        if (profile.recursion === ADVERBIAL_ADJUNCTION_RECURSION.modifier && !adjoinedIsAst) {
          diagnostics.push("adverbial-adjunction-modifier-recursion-requires-recursive-modifier");
        }
        if (profile.recursion === ADVERBIAL_ADJUNCTION_RECURSION.both && (!principalIsAst || !adjoinedIsAst)) {
          diagnostics.push("adverbial-adjunction-both-recursion-requires-two-recursive-units");
        }
      }
      if (isNonadverbialized) {
        if (!NONADVERBIALIZED_ADJUNCTION_RELATIONS.includes(profile.relation)) {
          diagnostics.push(
            "adverbial-adjunction-nonadverbialized-relation-not-licensed"
          );
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.time
          && profile.timeProfile === ADVERBIAL_ADJUNCTION_TIME_PROFILE.unknown) {
          diagnostics.push("adverbial-adjunction-time-profile-required");
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.time
          && profile.timeProfile === ADVERBIAL_ADJUNCTION_TIME_PROFILE.explicit
          && !profile.explicitAdverbialIndicator) {
          diagnostics.push("adverbial-adjunction-explicit-time-indicator-required");
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.time
          && profile.timeProfile === ADVERBIAL_ADJUNCTION_TIME_PROFILE.corroborating
          && !profile.principalCorroboratingAdverbial) {
          diagnostics.push("adverbial-adjunction-corroborating-principal-adverbial-required");
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.consideration
          && profile.contrast !== ADVERBIAL_ADJUNCTION_CONTRAST.adverbialModification) {
          diagnostics.push("adverbial-adjunction-consideration-supplementation-contrast-required");
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.purpose) {
          if (profile.purposeType === ADVERBIAL_ADJUNCTION_PURPOSE.unknown) {
            diagnostics.push("adverbial-adjunction-purpose-profile-required");
          }
          if (profile.purposeType === ADVERBIAL_ADJUNCTION_PURPOSE.maOptative
            && adjoinedSource?.features?.mood !== "optative") {
            diagnostics.push("adverbial-adjunction-purpose-ma-requires-optative");
          }
          if (profile.purposeType === ADVERBIAL_ADJUNCTION_PURPOSE.maOptative
            && ![ADVERBIAL_ADJUNCTION_MARKING.ma, ADVERBIAL_ADJUNCTION_MARKING.inMa].includes(profile.marking)) {
            diagnostics.push("adverbial-adjunction-purpose-optative-requires-ma-marker");
          }
          if (profile.purposeType === ADVERBIAL_ADJUNCTION_PURPOSE.maAdmonitiveLest
            && adjoinedSource?.features?.mood !== "admonitive") {
            diagnostics.push("adverbial-adjunction-purpose-lest-requires-admonitive");
          }
          if (profile.purposeType === ADVERBIAL_ADJUNCTION_PURPOSE.maAdmonitiveLest
            && ![ADVERBIAL_ADJUNCTION_MARKING.ma, ADVERBIAL_ADJUNCTION_MARKING.inMa].includes(profile.marking)) {
            diagnostics.push("adverbial-adjunction-purpose-lest-requires-ma-marker");
          }
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.condition) {
          if (profile.conditionType === ADVERBIAL_ADJUNCTION_CONDITION.unknown) {
            diagnostics.push("adverbial-adjunction-condition-profile-required");
          }
          const hasConditionMarker = [ADVERBIAL_ADJUNCTION_MARKING.tla, ADVERBIAL_ADJUNCTION_MARKING.inTla].includes(profile.marking);
          if (!hasConditionMarker && !profile.conditionalCuePresent) {
            diagnostics.push("adverbial-adjunction-condition-marker-or-cue-required");
          }
          if (profile.conditionType === ADVERBIAL_ADJUNCTION_CONDITION.open
            && ![ADVERBIAL_ADJUNCTION_UNIT.nnc, ADVERBIAL_ADJUNCTION_UNIT.vnc, ADVERBIAL_ADJUNCTION_UNIT.clause].includes(profile.unitType)) {
            diagnostics.push("adverbial-adjunction-open-condition-center-required");
          }
          if (profile.conditionType === ADVERBIAL_ADJUNCTION_CONDITION.open
            && profile.unitType === ADVERBIAL_ADJUNCTION_UNIT.vnc) {
            const mood = adjoinedSource?.features?.mood;
            const tense = adjoinedSource?.features?.tense;
            const licensedOpenVnc = (mood === "optative" && ["nonpast", "future", "preterit", "past"].includes(tense))
              || (mood === "indicative" && tense === "present");
            if (!licensedOpenVnc) {
              diagnostics.push("adverbial-adjunction-open-vnc-mood-tense-not-licensed");
            }
          }
          if (profile.conditionType === ADVERBIAL_ADJUNCTION_CONDITION.hypotheticalPresentFuture
            || profile.conditionType === ADVERBIAL_ADJUNCTION_CONDITION.hypotheticalPast) {
            if (adjoinedSource?.features?.mood !== "optative" || adjoinedSource?.features?.tense !== "past") {
              diagnostics.push("adverbial-adjunction-hypothetical-requires-past-optative-adjunct");
            }
            if (!principalSource?.features?.futureEmbed) {
              diagnostics.push("adverbial-adjunction-hypothetical-requires-future-embed-principal");
            }
          }
          if (profile.conditionType === ADVERBIAL_ADJUNCTION_CONDITION.hypotheticalPresentFuture
            && adjoinedSource?.features?.antecessive) {
            diagnostics.push("adverbial-adjunction-present-future-hypothetical-forbids-antecessive");
          }
          if (profile.conditionType === ADVERBIAL_ADJUNCTION_CONDITION.hypotheticalPast
            && principalSource?.features?.antecessive !== adjoinedSource?.features?.antecessive) {
            diagnostics.push("adverbial-adjunction-past-hypothetical-antecessive-must-match");
          }
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.concession) {
          if (profile.concessionType === ADVERBIAL_ADJUNCTION_CONCESSION.unknown) {
            diagnostics.push("adverbial-adjunction-concession-profile-required");
          }
          const concessionMarkers = {
            [ADVERBIAL_ADJUNCTION_CONCESSION.inTlaNel]: [ADVERBIAL_ADJUNCTION_MARKING.inTlaNel],
            [ADVERBIAL_ADJUNCTION_CONCESSION.inMaNel]: [ADVERBIAL_ADJUNCTION_MARKING.inMaNel, ADVERBIAL_ADJUNCTION_MARKING.maNel],
            [ADVERBIAL_ADJUNCTION_CONCESSION.maZo]: [ADVERBIAL_ADJUNCTION_MARKING.maZo],
            [ADVERBIAL_ADJUNCTION_CONCESSION.maZoTel]: [ADVERBIAL_ADJUNCTION_MARKING.maZoTel],
            [ADVERBIAL_ADJUNCTION_CONCESSION.atLeast]: [ADVERBIAL_ADJUNCTION_MARKING.maNel, ADVERBIAL_ADJUNCTION_MARKING.maZo, ADVERBIAL_ADJUNCTION_MARKING.maZoTel]
          };
          if (concessionMarkers[profile.concessionType]
            && !concessionMarkers[profile.concessionType].includes(profile.marking)) {
            diagnostics.push("adverbial-adjunction-concession-marker-profile-mismatch");
          }
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.consequence
          && adjoinedSource?.features?.adverbialCenter !== "iuh") {
          diagnostics.push("adverbial-adjunction-consequence-requires-adverbialized-iuh");
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.proviso
          && adjoinedSource?.features?.negativizedParticle !== "ahzo"
          && markerSource?.features?.negativizedParticle !== "ahzo") {
          diagnostics.push("adverbial-adjunction-proviso-requires-negativized-ahzo");
        }
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.reason) {
          if (profile.marking !== ADVERBIAL_ADJUNCTION_MARKING.ca) {
            diagnostics.push("adverbial-adjunction-reason-requires-ca-principal-introducer");
          }
          if (profile.unitType !== ADVERBIAL_ADJUNCTION_UNIT.sentence) {
            diagnostics.push("adverbial-adjunction-reason-is-juxtaposed-principal-sentence");
          }
        }
      }
      return Object.freeze({
        ok: diagnostics.length === 0,
        diagnostics: Object.freeze(Array.from(new Set(diagnostics)))
      });
    }
    function buildAdverbialAdjunctionFormulaArtifacts({
      principalSource,
      adjoinedSource,
      markerSource,
      profile,
      surface = ""
    } = {}) {
      const markerFormulaId = String(markerSource?.formulaRecordId || markerSource?.formulaRealizationRecordId || "");
      const principalFormulaId = String(principalSource?.formulaRecordId || principalSource?.formulaRealizationRecordId || principalSource?.astKind || "");
      const adjoinedFormulaId = String(adjoinedSource?.formulaRecordId || adjoinedSource?.formulaRealizationRecordId || adjoinedSource?.astKind || "");
      const formulaText = profile.order === ADVERBIAL_ADJUNCTION_ORDER.headModifier
        || profile.order === ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier
        ? "PRINCIPAL(CN) + MARKER? + ADJOINED(CN)"
        : profile.order === ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead
          ? "ADVERBIAL-PRINCIPAL(CN) + ADJUNCTOR? + ADJOINED-HEAD(CN)"
          : "MARKER? + ADJOINED(CN) + PRINCIPAL(CN)";
      const formulaRecord = typeof targetObject.buildGrammarFormulaRecord === "function"
        ? targetObject.buildGrammarFormulaRecord({
          id: `adverbial-adjunction:${profile.degree}:${profile.relation}:${profile.order}`,
          unit: "CLAUSE_RELATION",
          formula: formulaText,
          formulaSlots: {
            principalClause: {
              slot: "PRINCIPAL",
              sourceFormulaRecordId: principalFormulaId
            },
            adjoinedUnit: {
              slot: "ADJOINED",
              sourceFormulaRecordId: adjoinedFormulaId
            },
            marker: {
              slot: "MARKER",
              sourceFormulaRecordId: markerFormulaId,
              marking: profile.marking
            },
            relation: {
              slot: "RELATION",
              value: profile.relation
            }
          },
          operationFrames: [{
            operationId: "compose-adverbial-adjunction",
            degree: profile.degree,
            relation: profile.relation,
            order: profile.order,
            recursion: profile.recursion
          }],
          source: "typed-adverbial-adjunction-source-units"
        })
        : null;
      const formulaRealizationRecord = formulaRecord && String(surface || "").trim()
        && typeof targetObject.buildGrammarFormulaRealizationRecord === "function"
        ? targetObject.buildGrammarFormulaRealizationRecord({
          id: `${formulaRecord.id}::selected`,
          formulaRecord,
          unit: "CLAUSE_RELATION",
          segmentFrames: [
            {
              slot: "principalClause",
              role: "principal",
              formulaValue: principalFormulaId,
              surface: principalSource?.surface || "",
              sourceFrameId: principalFormulaId
            },
            {
              slot: "marker",
              role: "clause-marker",
              formulaValue: markerFormulaId,
              surface: markerSource?.surface || "",
              sourceFrameId: markerFormulaId
            },
            {
              slot: "adjoinedUnit",
              role: "adjoined",
              formulaValue: adjoinedFormulaId,
              surface: adjoinedSource?.surface || "",
              sourceFrameId: adjoinedFormulaId
            }
          ],
          surfaceForms: surface ? [surface] : [],
          source: "typed-adverbial-adjunction-composition"
        })
        : null;
      return Object.freeze({
        formulaRecord,
        formulaRealizationRecord
      });
    }
    function evaluateAdverbialAdjunction(request = {}) {
      const principalSource = getCanonicalAdverbialAdjunctionSourceUnit(request.principalClause, "principal");
      const adjoinedSource = getCanonicalAdverbialAdjunctionSourceUnit(request.adjoinedUnit, "adjoined");
      const relationalNumeralCoCContract =
        issueRelationalNumeralCoCAdjunctionContract(
          request.principalClause,
          request.adjoinedUnit,
        );
      const effectiveRequest =
        relationalNumeralCoCContract?.authorizationStatus === "authorized"
          ? {
            ...request,
            semanticRelation: relationalNumeralCoCContract.relation,
            adverbializationDegree: relationalNumeralCoCContract.degree,
            structureKind: relationalNumeralCoCContract.structure,
            adjoinedUnitType: ADVERBIAL_ADJUNCTION_UNIT.nnc,
            order: relationalNumeralCoCContract.order,
            recursion: relationalNumeralCoCContract.recursion,
            marking: relationalNumeralCoCContract.marking,
          }
          : request;
      const profile = buildAdverbialAdjunctionRuleProfile(effectiveRequest);
      const markerSource = profile.marking === ADVERBIAL_ADJUNCTION_MARKING.unmarked
        ? Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit",
          role: "marker",
          ok: true,
          sourceKind: "structural-zero",
          surface: "",
          surfaceForms: Object.freeze([]),
          formulaRealizationRecordId: "",
          formulaRecordId: "",
          astKind: "",
          features: Object.freeze({})
        })
        : getCanonicalAdverbialAdjunctionSourceUnit(request.markerUnit, "marker");
      const validation = validateAdverbialAdjunctionRuleProfile({
        principalSource,
        adjoinedSource,
        markerSource,
        profile
      });
      const composed = buildAdverbialAdjunctionAst({
        principalClause: principalSource,
        adjoinedUnit: adjoinedSource,
        semanticRelation: profile.relation,
        adjoinedUnitType: profile.unitType,
        order: profile.order,
        recursion: profile.recursion,
        marking: profile.marking,
        marker: markerSource.surface,
        adjoinedClauseAdverbialized: profile.degree !== ADVERBIAL_ADJUNCTION_DEGREE.nonadverbialized,
        conditionType: profile.conditionType,
        purposeMood: adjoinedSource.features.mood,
        evidenceSource: "canonical-typed-clause-results"
      });
      const relationalFamilyDiagnostics =
        relationalNumeralCoCContract?.authorizationStatus === "blocked"
          ? [relationalNumeralCoCContract.blockReason]
          : [];
      const supported = validation.ok
        && composed.supported === true
        && relationalFamilyDiagnostics.length === 0;
      const surface = supported ? composed.surface : "";
      const artifacts = buildAdverbialAdjunctionFormulaArtifacts({
        principalSource,
        adjoinedSource,
        markerSource,
        profile,
        surface
      });
      const result = targetObject.attachGrammarAstContract({
        ...composed,
        kind: "adverbial-adjunction-ast",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        supported,
        confirmed: supported,
        strictAuthority: true,
        sourceContract: {
          kind: "adverbial-adjunction-source-contract",
          principal: principalSource,
          adjoined: adjoinedSource,
          marker: markerSource,
          rejectsRawStrings: true,
          rejectsDisplayText: true,
          rejectsLessonMetadata: true,
          rejectsStoredAnswers: true
        },
        relationalNumeralCoCContract,
        ruleProfile: profile,
        formulaRecord: artifacts.formulaRecord,
        formulaRealizationRecord: artifacts.formulaRealizationRecord,
        surfaceSequence: supported ? composed.surfaceSequence : [],
        surface,
        changesCanonicalSurfaceForms: false,
        newWordGenerationAllowed: false,
        generationAllowed: supported,
        diagnostics: Array.from(new Set([
          ...validation.diagnostics,
          ...relationalFamilyDiagnostics,
          ...(supported ? composed.diagnostics.filter(diagnostic => diagnostic === "adverbial-adjunction-ca-is-not-conjunction") : [])
        ]))
      }, {
        astKind: "adverbial-adjunction-ast",
        unitKind: "clause-relation",
        structuralSource: "canonical-adverbial-adjunction-grammar",
        sourceInput: [
          principalSource.formulaRecordId || principalSource.astKind,
          adjoinedSource.formulaRecordId || adjoinedSource.astKind
        ].filter(Boolean).join("+")
      }, grammarFrameOwnerCapability);
      if (result?.supported === true && result.ok === true) {
        issuedAdverbialAdjunctionResults.add(result);
      }
      return result;
    }
    function isAdverbialAdjunctionResult(frame = null) {
      return Boolean(
        issuedAdverbialAdjunctionResults.has(frame)
        && frame?.kind === "adverbial-adjunction-ast"
        && frame.version === ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION
        && frame.supported === true
        && frame.ok === true
        && frame.strictAuthority === true
        && frame.principalClause
        && typeof frame.principalClause === "object"
        && frame.adjoinedUnit
        && typeof frame.adjoinedUnit === "object"
        && frame.grammarFrame?.resultFrame?.ok === true
        && frame.formulaRecord
        && frame.formulaRealizationRecord
        && frame.generationAllowed === true
        && (
          frame.relationalNumeralCoCContract == null
          || (
            isRelationalNumeralCoCAdjunctionContract(
              frame.relationalNumeralCoCContract,
            )
            && frame.relationalNumeralCoCContract.authorizationStatus
              === "authorized"
          )
        )
      );
    }
    function buildAdverbialAdjunctionBoundaryMetadata() {
      return {
        kind: "adverbial-adjunction-boundary",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        status: "implemented",
        structuralSource: "canonical-adverbial-adjunction-grammar",
        targetAuthority: "canonical generated clause and marker result frames",
        generationAllowed: false,
        clauseCompositionAllowed: true,
        confirmedExamples: [],
        structuralQuestions: getAdverbialAdjunctionStructuralQuestions(),
        boundaries: {
          hasConfiguredAdverbioSurface: true,
          hasAdverbialNuclearBoundary: true,
          hasRelationalNncBoundary: true,
          hasPlaceGentilicBoundary: true,
          hasClauseAdjunctionAst: true,
          hasCanonicalTypedComposition: true,
          hasCompleteDistinctionInventory: true,
          hasConfirmedClauseExamples: false,
          hasStaticAdjunctionData: false,
          changesAdverbioGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          changesRouteBehavior: false,
          treatsSingleGeneratedWordAsAdjunctionEvidence: false,
          treatsTranslationAsAdjunctionEvidence: false
        },
        antiConflationRules: getAdverbialAdjunctionAntiConflationRules()
      };
    }
    function getAdverbialAdjunctionSurface(input = "", fallback = "") {
      if (typeof input === "string") {
        return String(input || fallback || "").trim();
      }
      if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
      }
      const surface = getAdverbialAdjunctionSurfaceForms(input)[0];
      if (getAdverbialAdjunctionResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
      }
      return String(surface || fallback || "").trim();
    }
    function splitAdverbialAdjunctionSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—");
    }
    function getAdverbialAdjunctionCanonicalRealizationSurfaceForms(resultFrame = null) {
      if (!resultFrame || typeof resultFrame !== "object") {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-realization-record").flatMap(record => [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""]).map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
    }
    function getAdverbialAdjunctionSelectedRealizationVariant(input = null) {
      if (!input || typeof input !== "object") {
        return null;
      }
      const grammarFrame = getAdverbialAdjunctionResultFrame(input);
      const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      if (!resultFrame) {
        return null;
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      for (const record of records) {
        if (!record || typeof record !== "object" || record.kind !== "grammar-formula-realization-record") {
          continue;
        }
        const surfaces = [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""].map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
        if (!surfaces.length) {
          continue;
        }
        const formulaRealizationRecordId = String(record.id || "");
        const formulaRecordId = String(record.formulaRecordId || resultFrame.formulaRecord?.id || "");
        const selectedVariantIndex = 0;
        return {
          kind: "grammar-formula-realization-selected-variant",
          selectedVariantId: `${formulaRealizationRecordId || formulaRecordId || "realization"}::surface-${selectedVariantIndex}`,
          selectedVariantIndex,
          formulaRealizationRecordId,
          formulaRecordId,
          unit: String(record.unit || resultFrame.formulaRecord?.unit || "")
        };
      }
      return null;
    }
    function getAdverbialAdjunctionResultFrame(input = null) {
      const isIssuedGrammarFrame = frame => Boolean(
        frame
        && typeof frame === "object"
        && typeof targetObject.isIssuedGrammarFrame === "function"
        && targetObject.isIssuedGrammarFrame(frame) === true
      );
      if (isAdverbialAdjunctionResult(input)) {
        return isIssuedGrammarFrame(input.grammarFrame)
          ? input.grammarFrame
          : null;
      }
      if (
        input
        && typeof targetObject.isClassicalNahuatlParticleResultFrame
          === "function"
        && targetObject.isClassicalNahuatlParticleResultFrame(input)
          === true
      ) {
        return isIssuedGrammarFrame(input.grammarFrame)
          ? input.grammarFrame
          : null;
      }
      return null;
    }
    function getAdverbialAdjunctionSurfaceForms(input = null) {
      if (typeof input === "string") {
        return splitAdverbialAdjunctionSurfaceText(input);
      }
      if (!input || typeof input !== "object") {
        return [];
      }
      const grammarFrame = getAdverbialAdjunctionResultFrame(input);
      const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(frameResult);
      const canonicalForms = getAdverbialAdjunctionCanonicalRealizationSurfaceForms(frameResult);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—" && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(input.surfaceForms)) {
        forms.push(...input.surfaceForms);
      }
      if (!hasResultFrame && input.surface) {
        forms.push(input.surface);
      }
      if (!hasResultFrame && input.surfaceDisplay) {
        forms.push(input.surfaceDisplay);
      }
      if (!hasResultFrame && Array.isArray(input.output?.surfaceForms)) {
        forms.push(...input.output.surfaceForms);
      }
      if (!hasResultFrame && input.output?.surface) {
        forms.push(input.output.surface);
      }
      if (!hasResultFrame && input.result) {
        forms.push(input.result);
      }
      if (!hasResultFrame && input.word) {
        forms.push(input.word);
      }
      return forms.flatMap(entry => splitAdverbialAdjunctionSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getAdverbialAdjunctionFormulaEcho(input = null) {
      if (!input || typeof input !== "object") {
        return "";
      }
      return String(input.formulaEcho || input.clauseFrame?.formulaEcho || input.nncBasic?.formulaEcho || input.nuclearClauseShell?.formulaEcho || input.adverbialNuclearFrame?.source?.raw || "");
    }
    function buildAdverbialAdjunctionClauseNode(input = "", role = "unknown", fallbackSurface = "") {
      const surface = getAdverbialAdjunctionSurface(input, fallbackSurface);
      const selectedVariant = getAdverbialAdjunctionSelectedRealizationVariant(input);
      return {
        kind: "adverbial-adjunction-clause-node",
        role: String(role || "unknown"),
        surface,
        ...(selectedVariant ? {
          selectedVariant,
          selectedVariantId: selectedVariant.selectedVariantId,
          formulaRealizationRecordId: selectedVariant.formulaRealizationRecordId,
          formulaRecordId: selectedVariant.formulaRecordId
        } : {}),
        clauseKind: typeof input === "object" && input ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown") : "unknown",
        unitType: typeof input === "object" && input ? normalizeAdverbialAdjunctionUnit(input.adjoinedUnitType || input.unitType || input.clauseKind || "") : ADVERBIAL_ADJUNCTION_UNIT.unknown,
        formulaEcho: getAdverbialAdjunctionFormulaEcho(input),
        preservesSurface: true
      };
    }
    function buildAdverbialAdjunctionSurfaceSequence({
      principalSurface = "",
      adjoinedSurface = "",
      order = ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
      marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
      marker = ""
    } = {}) {
      const principal = String(principalSurface || "").trim();
      const adjoined = String(adjoinedSurface || "").trim();
      const normalizedOrder = normalizeAdverbialAdjunctionOrder(order);
      const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking || marker);
      const markerText = String(marker || "").trim() || (normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.unmarked ? "" : normalizedMarking.replace("-", " "));
      const markedAdjoined = [markerText, adjoined].filter(Boolean).join(" ");
      switch (normalizedOrder) {
        case ADVERBIAL_ADJUNCTION_ORDER.headModifier:
        case ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier:
          return [principal, markedAdjoined].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead:
          return [adjoined, markerText, principal].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.discontinuous:
          return [markedAdjoined, "...", principal].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.modifierHead:
        default:
          return [markedAdjoined, principal].filter(Boolean);
      }
    }
    function buildAdverbialAdjunctionRelationContract({
      relation = ADVERBIAL_ADJUNCTION_RELATION.unknown,
      marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
      adjoinedClauseAdverbialized = false,
      conditionType = "",
      purposeMood = ""
    } = {}) {
      const normalizedRelation = normalizeAdverbialAdjunctionRelation(relation);
      const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking);
      const base = {
        relation: normalizedRelation,
        adjoinedUnitMode: adjoinedClauseAdverbialized
          ? "adverbialized"
          : "nonadverbialized",
        adjoinedClauseAdverbialized: adjoinedClauseAdverbialized === true,
        marking: normalizedMarking,
        translationMirage: false
      };
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.reason) {
        return {
          ...base,
          principalClauseIntroducer: normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.ca ? "ca" : "",
          caIsConjunction: false,
          translationMirage: true,
          note: "ca introduces a principal clause; because/for/since are translation effects"
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.condition) {
        return {
          ...base,
          conditionType: String(conditionType || "open"),
          expectedMarker: "tla or in tla",
          adjoinedClauseMayPrecedeOrFollow: true
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.purpose) {
        return {
          ...base,
          purposeMood: String(purposeMood || ""),
          sharedReferentPossible: true,
          admonitiveMayMeanLest: true
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.concession) {
        return {
          ...base,
          expectedMarkers: ["in tla nel", "ma nel", "in ma nel"]
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.consequence) {
        return {
          ...base,
          expectedMarker: "iuh"
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.proviso) {
        return {
          ...base,
          expectedMarker: "ahzo"
        };
      }
      return base;
    }
    function buildAdverbialAdjunctionAst({
      principalClause = "",
      adjoinedUnit = "",
      principalSurface = "",
      adjoinedSurface = "",
      semanticRelation = ADVERBIAL_ADJUNCTION_RELATION.unknown,
      adjoinedUnitType = ADVERBIAL_ADJUNCTION_UNIT.unknown,
      order = ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
      recursion = ADVERBIAL_ADJUNCTION_RECURSION.none,
      marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
      marker = "",
      adjoinedClauseAdverbialized = true,
      conditionType = "",
      purposeMood = "",
      evidenceSource = "",
      confirmed = false
    } = {}) {
      const normalizedRelation = normalizeAdverbialAdjunctionRelation(semanticRelation);
      const normalizedUnit = normalizeAdverbialAdjunctionUnit(adjoinedUnitType);
      const normalizedOrder = normalizeAdverbialAdjunctionOrder(order);
      const normalizedRecursion = normalizeAdverbialAdjunctionRecursion(recursion);
      const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking || marker);
      const principalNode = buildAdverbialAdjunctionClauseNode(principalClause, "principal", principalSurface);
      const adjoinedNode = buildAdverbialAdjunctionClauseNode(adjoinedUnit, "adjoined", adjoinedSurface);
      const diagnostics = [];
      if (!principalNode.surface) {
        diagnostics.push("adverbial-adjunction-requires-principal-clause-surface");
      }
      if (!adjoinedNode.surface) {
        diagnostics.push("adverbial-adjunction-requires-adjoined-unit-surface");
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.unknown) {
        diagnostics.push("adverbial-adjunction-relation-unconfirmed");
      }
      if (normalizedUnit === ADVERBIAL_ADJUNCTION_UNIT.unknown) {
        diagnostics.push("adverbial-adjunction-unit-unconfirmed");
      }
      if (normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.unknown) {
        diagnostics.push("adverbial-adjunction-order-unconfirmed");
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.condition && ![ADVERBIAL_ADJUNCTION_MARKING.tla, ADVERBIAL_ADJUNCTION_MARKING.inTla].includes(normalizedMarking)) {
        diagnostics.push("adverbial-adjunction-condition-usually-requires-tla-marker");
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.reason && normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.ca) {
        diagnostics.push("adverbial-adjunction-ca-is-not-conjunction");
      }
      if (!String(evidenceSource || "").trim()) {
        diagnostics.push("adverbial-adjunction-source-gated");
      }
      const supported = Boolean(principalNode.surface && adjoinedNode.surface && normalizedRelation !== ADVERBIAL_ADJUNCTION_RELATION.unknown && normalizedUnit !== ADVERBIAL_ADJUNCTION_UNIT.unknown && normalizedOrder !== ADVERBIAL_ADJUNCTION_ORDER.unknown);
      const surfaceSequence = supported ? buildAdverbialAdjunctionSurfaceSequence({
        principalSurface: principalNode.surface,
        adjoinedSurface: adjoinedNode.surface,
        order: normalizedOrder,
        marking: normalizedMarking,
        marker
      }) : [];
      return targetObject.attachGrammarAstContract({
        kind: "adverbial-adjunction-ast",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        structuralSource: "canonical-adverbial-adjunction-grammar",
        targetAuthority: "Classical Andrews transcription",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        semanticRelation: normalizedRelation,
        adjoinedUnitType: normalizedUnit,
        order: normalizedOrder,
        recursion: {
          locus: normalizedRecursion,
          recursive: normalizedRecursion !== ADVERBIAL_ADJUNCTION_RECURSION.none && normalizedRecursion !== ADVERBIAL_ADJUNCTION_RECURSION.unknown,
          pattern: normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.head ? "modifier + (head = modifier + head)" : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.modifier ? "(modifier = modifier + head) + head" : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.both ? "(modifier = modifier + head) + (head = modifier + head)" : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.appositive ? "general place/time adjunct + specific place/time appositive" : ""
        },
        marking: {
          value: normalizedMarking,
          marker: String(marker || ""),
          isMarked: normalizedMarking !== ADVERBIAL_ADJUNCTION_MARKING.unmarked
        },
        principalClause: principalNode,
        adjoinedUnit: adjoinedNode,
        relationContract: buildAdverbialAdjunctionRelationContract({
          relation: normalizedRelation,
          marking: normalizedMarking,
          adjoinedClauseAdverbialized: adjoinedClauseAdverbialized === true,
          conditionType,
          purposeMood
        }),
        transformations: {
          adjoinedUnitPrecedesHead: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.modifierHead || normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.discontinuous,
          adjoinedUnitFollowsHead: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.headModifier || normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
          adverbialUnitIsPrincipal: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead,
          isAppositivePlaceTime: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
          isDiscontinuous: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.discontinuous
        },
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesCanonicalSurfaceForms: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildAdverbialAdjunctionBoundaryMetadata()
      }, {
        astKind: "adverbial-adjunction-ast",
        structuralSource: "canonical-adverbial-adjunction-grammar"
      }, grammarFrameOwnerCapability);
    }
    function classifyAdverbialAdjunctionCandidate({
      principalClause = "",
      adjoinedUnit = "",
      candidate = "",
      semanticRelation = "",
      adjoinedUnitType = "",
      marking = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRelation = normalizeAdverbialAdjunctionRelation(semanticRelation);
      const normalizedUnit = normalizeAdverbialAdjunctionUnit(adjoinedUnitType);
      const normalizedFalsePositive = normalizeAdverbialAdjunctionFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "adverbial-adjunction-candidate-classification",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        principalClause: String(principalClause || ""),
        adjoinedUnit: String(adjoinedUnit || ""),
        candidate: String(candidate || ""),
        semanticRelation: normalizedRelation,
        adjoinedUnitType: normalizedUnit,
        marking: String(marking || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "adverbial-adjunction-needs-validation" : "adverbial-adjunction-source-gated", normalizedRelation !== ADVERBIAL_ADJUNCTION_RELATION.unknown ? "adverbial-adjunction-relation-recognized" : "adverbial-adjunction-relation-unconfirmed", normalizedUnit !== ADVERBIAL_ADJUNCTION_UNIT.unknown ? "adverbial-adjunction-unit-recognized" : "adverbial-adjunction-unit-unconfirmed", normalizedFalsePositive !== ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE.unknown ? "adverbial-adjunction-false-positive-source" : "adverbial-adjunction-unconfirmed"],
        boundary: buildAdverbialAdjunctionBoundaryMetadata()
      };
    }

    const api = {};
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_RELATION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_UNIT; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_ORDER; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_RECURSION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_RECURSION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_MARKING", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_MARKING; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_DEGREE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_DEGREE; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_STRUCTURE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_STRUCTURE; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_CONTRAST", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_CONTRAST; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_TIME_PROFILE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_TIME_PROFILE; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_CONDITION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_CONDITION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_PURPOSE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_PURPOSE; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_CONCESSION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_CONCESSION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_CAPABILITY_IDS", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_CAPABILITY_IDS; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeAdverbialAdjunctionEnum = normalizeAdverbialAdjunctionEnum;
    api.normalizeAdverbialAdjunctionRelation = normalizeAdverbialAdjunctionRelation;
    api.normalizeAdverbialAdjunctionUnit = normalizeAdverbialAdjunctionUnit;
    api.normalizeAdverbialAdjunctionOrder = normalizeAdverbialAdjunctionOrder;
    api.normalizeAdverbialAdjunctionRecursion = normalizeAdverbialAdjunctionRecursion;
    api.normalizeAdverbialAdjunctionMarking = normalizeAdverbialAdjunctionMarking;
    api.normalizeAdverbialAdjunctionFalsePositiveSource = normalizeAdverbialAdjunctionFalsePositiveSource;
    api.normalizeAdverbialAdjunctionDegree = normalizeAdverbialAdjunctionDegree;
    api.normalizeAdverbialAdjunctionStructure = normalizeAdverbialAdjunctionStructure;
    api.normalizeAdverbialAdjunctionContrast = normalizeAdverbialAdjunctionContrast;
    api.normalizeAdverbialAdjunctionTimeProfile = normalizeAdverbialAdjunctionTimeProfile;
    api.normalizeAdverbialAdjunctionCondition = normalizeAdverbialAdjunctionCondition;
    api.normalizeAdverbialAdjunctionPurpose = normalizeAdverbialAdjunctionPurpose;
    api.normalizeAdverbialAdjunctionConcession = normalizeAdverbialAdjunctionConcession;
    api.getAdverbialAdjunctionAntiConflationRules = getAdverbialAdjunctionAntiConflationRules;
    api.getAdverbialAdjunctionCapabilityInventory = getAdverbialAdjunctionCapabilityInventory;
    api.getAdverbialAdjunctionStructuralQuestions = getAdverbialAdjunctionStructuralQuestions;
    api.getCanonicalAdverbialAdjunctionSourceUnit = getCanonicalAdverbialAdjunctionSourceUnit;
    api.issueRelationalNumeralCoCAdjunctionContract =
      issueRelationalNumeralCoCAdjunctionContract;
    api.isRelationalNumeralCoCAdjunctionContract =
      isRelationalNumeralCoCAdjunctionContract;
    api.issueAdverbialAdjunctionAvailabilityContract =
      issueAdverbialAdjunctionAvailabilityContract;
    api.isAdverbialAdjunctionAvailabilityContract =
      isAdverbialAdjunctionAvailabilityContract;
    api.getAdverbialAdjunctionRanksFromAvailability =
      getAdverbialAdjunctionRanksFromAvailability;
    api.buildAdverbialAdjunctionRuleProfile = buildAdverbialAdjunctionRuleProfile;
    api.validateAdverbialAdjunctionRuleProfile = validateAdverbialAdjunctionRuleProfile;
    api.buildAdverbialAdjunctionFormulaArtifacts = buildAdverbialAdjunctionFormulaArtifacts;
    api.evaluateAdverbialAdjunction = evaluateAdverbialAdjunction;
    api.isAdverbialAdjunctionResult = isAdverbialAdjunctionResult;
    api.buildAdverbialAdjunctionBoundaryMetadata = buildAdverbialAdjunctionBoundaryMetadata;
    return api;
}

export function installAdverbialAdjunctionGlobals(targetObject = globalThis, installationContext = null) {
    const api = createAdverbialAdjunctionGlobals(targetObject, installationContext);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
