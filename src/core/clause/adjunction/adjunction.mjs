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
        "nnc:quantitative-predicate": "nnc",
        "nnc:attested-cell": "nnc",
        "nnc:attested-place": "nnc",
        "clause:attested-collocation": "clause",
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
      intensification: "intensification",
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
      maNelZan: "ma-nel-zan",
      maZanNel: "ma-zan-nel",
      maNelZa: "ma-nel-za",
      maZaNel: "ma-za-nel",
      maTelZa: "ma-tel-za",
      maTelZaYeh: "ma-tel-za-yeh",
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
      first: Object.freeze(["place", "duration", "manner", "compared-manner", "means", "intensification"]),
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
      // A contextual adverb's complete phrase belongs to its issued Result.
      // The lexical word alone can omit a required preceding particle.
      if (targetObject.isClassicalNahuatlAdverbialNuclearResult?.(result) === true
        && result.scope === "external-clause"
        && targetObject.isClassicalNahuatlAdverbialContextFrame?.(
          result.operationFrame?.contextFrame) === true) {
        return String(result.operationFrame.contextFrame.phraseSurface || "").trim();
      }
      // A genuine complementary whole owns separate sentence and embedded
      // realizations. Its terminal punctuation belongs only to the outer clause.
      if (targetObject.isClassicalNahuatlClauseComplementationResultFrame?.(result) === true) {
        return String(result.embeddedSurface || "").trim();
      }
      const sentence = result?.sentenceFrame;
      if (sentence?.polarity === "negative"
        && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sentence) === true) {
        return String(sentence.sentenceSurface || "").trim()
          .replace(/[.?!]$/u, "").replace(/^./u, character => character.toLowerCase());
      }
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
      const result = capture?.canonicalResult || null;
      const unitType = operationId === "nnc:adverbial"
        && targetObject.isClassicalNahuatlAdverbialNuclearResult?.(result) === true
        && result.sourceFrame?.clauseKind === "vnc"
        ? "vnc"
        : ADVERBIAL_ADJUNCTION_APPLICATION_SOURCE_UNIT_BY_OPERATION[operationId]
          || "";
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
          sentencePunctuation: String(
            targetObject.isClassicalNahuatlClauseComplementationResultFrame?.(result) === true
              ? result.surfaceRealization
              : result.sentenceSurfaceDisplay || result.sentenceSurface
                || result.sentenceFrame?.sentenceSurface || ""
          ).match(/[.?!]$/u)?.[0] || "",
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
    function getIssuedAdverbialNucleus(input) {
      const visited = new Set();
      while (input && !visited.has(input)) {
        visited.add(input);
        if (targetObject.isClassicalNahuatlAdverbialNuclearResult?.(input) === true) return input;
        if (targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(input) === true) {
          input = input.canonicalInputFrame;
        } else if (isAdverbialAdjunctionResult(input)) {
          input = input.sourceContract?.principal?.issuedResult;
        } else return null;
      }
      return null;
    }
    function getConjoinedRelationalAdverbialUse(input = null) {
      if (targetObject.isClassicalNahuatlClauseConjunctionResultFrame?.(input) !== true)
        return null;
      const lexical = input.operationKind === "lexical-conjunction"
        && input.relationFrame?.stateRealization === "conjoined-stems";
      const adjoined = input.operationKind === "conjunction"
        && input.relationFrame?.level === "adjoined"
        && input.relationFrame?.adjoinedFunction === "adverbial-adjunct";
      if ((!lexical && !adjoined) || input.conjuncts.length < 2) return null;
      const children = [];
      for (const node of input.conjuncts) {
        if (targetObject.isClassicalNahuatlClauseCompositionSourceFrame?.(node) !== true)
          return null;
        const child = targetObject.getClassicalNahuatlSupplementationClauseSourceFrame?.(node.envelope);
        if (targetObject.isClassicalNahuatlRelationalResult?.(child) !== true
          || child.sourceFrame.constructionKind !== "relational-nnc"
          || child.sourceFrame.subjectMode !== "adverbialized"
          || child.sourceFrame.adverbialSubject?.subjectHasReferent !== false
          || node.subject.participantFrame?.hasReferent !== false
          || targetObject.isClassicalNahuatlNncSlotFrame?.(child.nncSlotFrame) !== true)
          return null;
        const degree = child.sourceFrame.adverbializationDegree;
        const carrier = child.nncSlotFrame.slots.number.num1;
        if (!(degree === "first" && child.sourceFrame.state === "possessive" && carrier === "Ø")
          && !(degree === "second" && child.sourceFrame.state === "absolutive" && carrier === "⎕"))
          return null;
        children.push(Object.freeze({canonicalResult: child, canonicalSourceFrame: child.sourceFrame,
          canonicalTypedSlotFrame: child.nncSlotFrame, degree}));
      }
      const degrees = new Set(children.map(child => child.degree));
      // Mixed ranks require a separate containing analysis; a caller's selected
      // tag cannot promote one child's rank onto the other.
      if (degrees.size !== 1) return null;
      return Object.freeze({canonicalResult: input, degree: children[0].degree,
        children: Object.freeze(children)});
    }
    function getCanonicalAdverbialAdjunctionSourceUnit(input = null, role = "unknown") {
      // Andrews 53.1.7: the actual iuhqui concatenate may modify a further
      // clause. Keep its issued whole and owner-written embedded form intact.
      if (targetObject.isClassicalComparisonResultFrame?.(input) === true
        && input.authorizationStatus === "authorized"
        && input.routeId === "similarity-iuhqui-principal") {
        const surface = input.embeddedSurface;
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit", role,
          ok: Boolean(surface && input.formulaRealization),
          sourceKind: "composition-ast", unitType: "clause", surface,
          surfaceForms: Object.freeze(surface ? [surface] : []),
          formulaRealizationRecordId: input.formulaRealizationRecord.id,
          formulaRecordId: input.formulaRecord.id, astKind: input.astFrame.kind,
          features: Object.freeze({unitKind: "clause", mood: "", tense: "",
            antecessive: false, futureEmbed: false, sentenceType: "comparison",
            sentencePunctuation: String(input.surface).match(/[.?!]$/u)?.[0] || "",
            adverbialCenter: "", negativizedParticle: ""}),
          grammarFrame: null, issuedResult: input,
        });
      }
      const attestedCell=targetObject.getClassicalNahuatlAttestedNncCellExternalProjection?.(input);
      const attestedPlace=targetObject.getClassicalNahuatlAttestedPlaceExternalProjection?.(input);
      const attestedCollocation=targetObject.isClassicalNahuatlAttestedPrincipalCollocationResult?.(input)===true;
      if(attestedCell || attestedPlace || attestedCollocation){
        const unitType=attestedCollocation?"clause":"nnc";
        return Object.freeze({kind:"canonical-adverbial-adjunction-source-unit",role,ok:!attestedCollocation||role==="principal",
          sourceKind:"issued-attested-cell",unitType,surface:input.wordSurface,surfaceForms:Object.freeze([input.wordSurface]),
          formulaRealizationRecordId:input.formulaRealization,formulaRecordId:input.formulaRealization,astKind:input.kind,
          features:Object.freeze({unitKind:unitType,mood:"",tense:"",antecessive:false,futureEmbed:false,sentenceType:"",sentencePunctuation:String(input.sentenceSurface || "").match(/[.?!]$/u)?.[0] || "",adverbialCenter:attestedPlace?"place":"",negativizedParticle:""}),
          grammarFrame:null,issuedResult:input,attestedPrincipalUse:attestedCollocation?"condition-principal":""});
      }
      const conjoinedUse = getConjoinedRelationalAdverbialUse(input);
      if (conjoinedUse) {
        // Reuse the canonical whole linearization, including every conjunct.
        // This is an NNC unit with adverbial subjects, not adverbial recursion.
        const surface = input.surfaceSequence.join(" ").trim();
        return Object.freeze({kind: "canonical-adverbial-adjunction-source-unit", role,
          ok: Boolean(surface), sourceKind: "issued-relational-nnc-conjunction", unitType: "nnc",
          surface, surfaceForms: Object.freeze([surface]),
          formulaRealizationRecordId: input.canonicalSignature, formulaRecordId: input.canonicalSignature,
          astKind: input.kind, features: Object.freeze({unitKind: "nnc", mood: "", tense: "",
            antecessive: false, futureEmbed: false, sentenceType: "", adverbialCenter: "", negativizedParticle: ""}),
          grammarFrame: null, issuedResult: input, conjoinedRelationalAdverbialUse: conjoinedUse});
      }
      if (isAdverbialAdjunctionResult(input)) {
        const principal = input.sourceContract.principal;
        const adverbial = input.ruleProfile?.relation === "manner"
          ? input.sourceContract.adjoined?.issuedResult : null;
        const exactIuh = targetObject.isClassicalNahuatlAdverbialNuclearResult?.(adverbial) === true
          && adverbial.sourceFrame?.clauseKind === "vnc"
          && adverbial.lexicalEntryId === "44.3-iuh"
          && adverbial.scope === "external-clause" ? adverbial : null;
        // Reuse the owner-issued embedded wording. Lowercasing the displayed
        // sentence would erase lexical capitals whenever a result is reused.
        const surface = input.embeddedSurface ?? String(input.surface || "").trim()
          .replace(/[.?!]$/u, "");
        return Object.freeze({
          ...principal,
          features: Object.freeze({...principal.features,
            // Andrews 50.7.2.b: the exact issued clause retains its conditional
            // cue when a manner adjunct supplies it; caller flags are not evidence.
            conditionalCue: principal.features?.conditionalCue === true
              || (input.ruleProfile?.relation === "manner"
                && input.sourceContract.adjoined?.features?.conditionalCue === true),
            sentencePunctuation: input.sentencePunctuation || principal.features.sentencePunctuation,
            ...(exactIuh ? {adverbialCenter: "iuh", canonicalAdverbialResultFrame: exactIuh} : {})}),
          role,
          ok: Boolean(surface),
          sourceKind: "composition-ast",
          surface,
          surfaceForms: Object.freeze([surface]),
          formulaRealizationRecordId: input.formulaRealizationRecord?.id || "",
          formulaRecordId: input.formulaRecord?.id || "",
          astKind: input.kind,
          issuedResult: input,
        });
      }

      if (targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(input) === true) {
        // The issued particle layer capitalizes its sentence-initial particle.
        // Embedding removes only that syntactic capital, not internal spelling.
        const sentenceFrame = input.canonicalInputFrame?.sentenceSurfaceFrame;
        const withinWish = sentenceFrame?.mood === "optative"
          && sentenceFrame.sentenceParticles?.some(particle => ["mā", "tlā"].includes(particle));
        const consumedSurface = input.embeddedSentenceSurface
          ?? getCanonicalAdverbialAdjunctionSourceUnit(input.canonicalInputFrame, role)?.surface;
        const structuralSurface = withinWish
          ? targetObject.buildClassicalNahuatlVncSentenceSurfaceRealization?.(sentenceFrame,
              input.consumedNuclearSurface, input.particleResultFrame, {embedded: true})
          : input.independentUtterance ? input.sourceForm
            : typeof input.sourceForm === "string" && typeof consumedSurface === "string"
              ? `${input.sourceForm}${input.rightAttachedToNucleus ? "" : " "}${consumedSurface}`.trim().replace(/[.?!]$/u, "")
              : "";
        const surface = input.embeddedSurface ?? structuralSurface;
        const actualParticleSource = getCanonicalAdverbialAdjunctionSourceUnit(input.particleResultFrame, "marker");
        const innerClauseSource = getCanonicalAdverbialAdjunctionSourceUnit(input.canonicalInputFrame, role);
        const negativizedParticle = actualParticleSource.ok
          && actualParticleSource.features?.negativizedParticle === "ahzo"
          ? "ahzo" : innerClauseSource.ok && innerClauseSource.features?.negativizedParticle === "ahzo"
            ? "ahzo" : "";
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit", role, ok: Boolean(surface),
          sourceKind: "issued-particle-sentence-layer", unitType: input.nuclearClauseKind,
          surface, surfaceForms: Object.freeze([surface]),
          formulaRealizationRecordId: input.sentenceFormulaDisplay,
          formulaRecordId: input.consumedNuclearFormula, astKind: "",
          features: Object.freeze({ ...innerClauseSource.features, unitKind: input.nuclearClauseKind, sentenceType: "particle-sentence", conditionalCue: actualParticleSource.ok && actualParticleSource.features?.conditionalCue === true
            || innerClauseSource.ok && innerClauseSource.features?.conditionalCue === true, sentencePunctuation: String(input.sentenceSurfaceDisplay || "").trim().match(/[.?!]$/u)?.[0] || "", adverbialCenter: "", negativizedParticle }),
          grammarFrame: null, issuedResult: input,
        });
      }
      if (targetObject.isClassicalNahuatlVocativeFrame?.(input) === true) {
        const surface = input.embeddedSurface;
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit",
          role, ok: Boolean(surface), sourceKind: "composition-ast",
          unitType: "sentence", surface,
          surfaceForms: Object.freeze([surface]),
          formulaRealizationRecordId: input.canonicalSignature,
          formulaRecordId: input.canonicalSignature,
          astKind: input.kind,
          features: Object.freeze({unitKind: "sentence", mood: "", tense: "",
            antecessive: false, futureEmbed: false, sentenceType: "vocative",
            sentencePunctuation: input.surfaceRealization.match(/[.?!]$/u)?.[0] || "",
            nuclearCenter: (input.companionClause || input.sourceClause).unitKind,
            adverbialCenter: "", negativizedParticle: ""}),
          grammarFrame: null, issuedResult: input,
        });
      }
      const deletedCahPlace = targetObject.isClassicalNahuatlDeletedPrincipalFrame?.(input) === true
        && input.deletionKind === "cah-proxy"
        && targetObject.isClassicalNahuatlSupplementationAdverbialModifierFrame?.(
          input.visiblePrincipalClause) === true
        && input.visiblePrincipalClause.adverbialRole === "place"
        && targetObject.isClassicalNahuatlSupplementationClauseEnvelope?.(
          input.visiblePrincipalClause.clause) === true
        && input.visiblePrincipalClause.clause.unitKind === "nnc"
        && input.visiblePrincipalClause.clause.isAdverbialNnc === true
        && input.visiblePrincipalClause.clause.adverbialRole === "place"
        && targetObject.isClassicalNahuatlSupplementationClauseEnvelope?.(
          input.supplementClause) === true
        && input.supplementClause.unitKind === "nnc"
        && targetObject.isClassicalNahuatlSupplementationClauseEnvelope?.(
          input.deletedPrincipalClause) === true;
      if (deletedCahPlace) {
        // §50.3 Note retains the adverbial predicate and its nominal subject
        // after the private cah-proxy owner has retired the finite principal.
        // Their complete reduced clause is the external adjunct; no new lexical
        // adverbialization or standalone locative replacement is introduced.
        const visible = input.visiblePrincipalClause.clause;
        const surface = `${visible.surface} ${input.supplementClause.surface}`.trim();
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit", role,
          ok: Boolean(surface), sourceKind: "issued-deleted-cah-place-whole",
          unitType: "sentence", surface, surfaceForms: Object.freeze([surface]),
          formulaRealizationRecordId: input.canonicalSignature,
          formulaRecordId: input.canonicalSignature, astKind: input.kind,
          features: Object.freeze({unitKind: "sentence", nuclearCenter: "nnc",
            mood: "", tense: "", antecessive: false, futureEmbed: false,
            sentenceType: "deleted-cah-place-clause",
            sentencePunctuation: input.surfaceRealization.match(/[.?!]$/u)?.[0] || "",
            adverbialCenter: "place", negativizedParticle: ""}),
          grammarFrame: null, issuedResult: input,
          canonicalDeletedCahPlaceFrame: Object.freeze({canonicalResult: input,
            canonicalLocativeEnvelope: visible,
            canonicalSubjectEnvelope: input.supplementClause,
            canonicalDeletedPrincipalEnvelope: input.deletedPrincipalClause}),
        });
      }
      const issuedSupplementation = Boolean(
        input
        && typeof targetObject.isClassicalNahuatlSupplementationFrame
          === "function"
        && targetObject.isClassicalNahuatlSupplementationFrame(input) === true
        && input.authorizationStatus === "authorized"
      );
      if (issuedSupplementation
        && input.operationKind === "contextual-first-person-realization") {
        const envelope = targetObject.buildClassicalNahuatlSupplementationClauseEnvelope?.(input);
        const contextual = envelope?.canonicalContextualFirstPersonFrame;
        const authorized = targetObject.isClassicalNahuatlSupplementationClauseEnvelope?.(envelope) === true
          && targetObject.getClassicalNahuatlSupplementationClauseSourceFrame?.(envelope) === input
          && contextual?.canonicalResult === input
          && contextual.canonicalPrincipalEnvelope === input.principalClause;
        return Object.freeze({
          kind: "canonical-adverbial-adjunction-source-unit",
          role: String(role || "unknown"),
          ok: authorized,
          sourceKind: "composition-ast",
          unitType: "sentence",
          surface: authorized ? envelope.surface : "",
          surfaceForms: Object.freeze(authorized ? [envelope.surface] : []),
          formulaRealizationRecordId: input.canonicalSignature,
          formulaRecordId: input.principalClause.canonicalSignature,
          astKind: "classical-nahuatl-supplementation-ast",
          features: Object.freeze({
            unitKind: "sentence",
            mood: envelope?.mood || "",
            tense: envelope?.tense || "",
            antecessive: false,
            futureEmbed: false,
            sentenceType: "contextual-first-person-realization",
            sentencePunctuation: input.linearizationFrame.punctuation,
            nuclearCenter: input.principalClause.unitKind,
            adverbialCenter: "",
            negativizedParticle: "",
          }),
          grammarFrame: null,
          issuedResult: input,
          canonicalContextualFirstPersonFrame: contextual || null,
        });
      }
      if (issuedSupplementation) {
        const surface = input.linearizationFrame.tokens
          .map(token => token.surface).join(" ").trim();
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
            sentencePunctuation: input.linearizationFrame.punctuation,
            nuclearCenter: input.principalClause?.unitKind || "",
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
        // The validated Sentence already owns its embedded projection. Build
        // the legacy envelope only when that projection is absent.
        const envelope = input.embeddedSurface == null
          ? targetObject.buildClassicalNahuatlSupplementationClauseEnvelope?.(input)
          : null;
        const surface = input.embeddedSurface
          ?? (targetObject.isClassicalNahuatlSupplementationClauseEnvelope?.(envelope)
            ? envelope.surface : "");
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
            nuclearCenter: "vnc",
            mood: input.sentenceSurfaceFrame?.mood || "",
            tense: input.sentenceSurfaceFrame?.tense || "",
            antecessive: input.sentenceSurfaceFrame?.sentencePrefixalStack?.includes("ō#") === true,
            futureEmbed: false,
            sentenceType: "vnc-sentence",
            sentencePunctuation: String(input.sentenceSurfaceDisplay || "").match(/[.?!]$/u)?.[0] || ".",
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
          conditionalCue: grammarFrame?.unitFrame?.conditionalCue === true
            || (isAdverbialAdjunctionResult(input) && input.ruleProfile?.relation === "manner"
              && input.sourceContract?.adjoined?.features?.conditionalCue === true),
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
        grammarFrame,
        ...(isAdverbialAdjunctionResult(input)
          || targetObject.isClassicalNahuatlParticleResultFrame?.(input) === true
          ? { issuedResult: input } : {})
      });
    }
    function getPossessiveRelationalAdverbialRanks(source, relation) {
      const result = source?.issuedResult;
      if (targetObject.isClassicalNahuatlRelationalResult?.(result) !== true
        || result.sourceFrame?.constructionKind !== "relational-nnc"
        || result.sourceFrame.subjectMode !== "adverbialized"
        || result.sourceFrame.state !== "possessive") return null;
      // §44.2 fixes possessive NNCs to first degree. §45.4's temporal īc
      // is licensed by its nounstem's meaning, beyond §49.1's sample list.
      const temporal = relation === "time"
        && result.sourceFrame.stem.relationalKind.split("-").includes("time");
      return Object.freeze(temporal || ADVERBIALIZED_RELATIONS_BY_RANK.first.includes(relation)
        ? [ADVERBIAL_ADJUNCTION_DEGREE.first] : []);
    }
    function getIssuedAdverbialUseConstraint(source = null) {
      const nucleus = getIssuedAdverbialNucleus(source?.issuedResult);
      const relations = nucleus?.lexicalAuthorizationFrame?.licensedAdjunctionRelations;
      return Array.isArray(relations)
        ? Object.freeze({nucleus, relations}) : null;
    }
    function getAdverbialAdjunctionRanksForUnit(
      relation = "",
      unitType = ADVERBIAL_ADJUNCTION_UNIT.unknown,
      source = null
    ) {
      const conjoinedUse = getConjoinedRelationalAdverbialUse(source?.issuedResult);
      if (conjoinedUse) return Object.freeze(
        ADVERBIALIZED_RELATIONS_BY_RANK[conjoinedUse.degree]?.includes(relation)
          ? [conjoinedUse.degree] : []);
      const use = getIssuedAdverbialUseConstraint(source);
      if (use && !use.relations.includes(relation)) return Object.freeze([]);
      const possessiveRanks = getPossessiveRelationalAdverbialRanks(source, relation);
      if (possessiveRanks !== null) return possessiveRanks;
      const issuedAdverbial = getIssuedAdverbialNucleus(source?.issuedResult);
      if (targetObject.isClassicalNahuatlAdverbialNuclearResult?.(issuedAdverbial) === true) {
        const degree = ({ "first-degree": ADVERBIAL_ADJUNCTION_DEGREE.first, "second-degree": ADVERBIAL_ADJUNCTION_DEGREE.second })[issuedAdverbial.operationFrame?.degree];
        return Object.freeze(ADVERBIALIZED_RELATIONS_BY_RANK[degree]?.includes(relation) ? [degree] : []);
      }
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
    function getIntensityAdverbSource(adjoinedUnit) {
      const nucleus = getIssuedAdverbialNucleus(adjoinedUnit);
      if (!nucleus || nucleus.scope !== "external-clause"
        || nucleus.operationFrame?.degree !== "first-degree"
        || nucleus.operationFrame?.semanticDomain !== "degree"
        || !nucleus.lexicalAuthorizationFrame?.licensedUses?.includes("intensifier")) return null;
      if (nucleus.canonicalSourceResult
        && nucleus.exactSourceResultIdentityPreserved === true) return nucleus.canonicalSourceResult;
      // Primitive adverbial subjects have no referential finite parent. Reuse
      // their privately authenticated Source rather than inventing one.
      const potential = nucleus.adverbialPotentialFrame;
      const lexical = nucleus.lexicalVncSourceFrame;
      if (targetObject.isClassicalNahuatlAdverbialPotentialFrame?.(potential) === true
        && potential.authorizationStatus === "authorized"
        && potential.sourceInputMode === "owner-issued-lexical-adverbial-vnc-source"
        && lexical && potential.lexicalVncSourceFrame === lexical
        && potential.canonicalTypedSlotFrame === lexical.typedSlotFrame
        && nucleus.canonicalTypedSlotFrame === lexical.typedSlotFrame
        && lexical.finiteSubjectAsserted === false
        && lexical.ordinaryVncUseAuthorized === false
        && lexical.ordinaryVncApplicationResult === null) return lexical;
      const primitive = nucleus.primitiveAdverbialSourceFrame;
      return targetObject.isClassicalNahuatlPrimitiveAdverbialPotentialFrame?.(potential) === true
        && potential.authorizationStatus === "authorized"
        && primitive && potential.primitiveAdverbialSourceFrame === primitive
        && primitive.finiteSubjectAsserted === false
        && primitive.ordinaryVncApplicationResult === null ? primitive : null;
    }
    function isAdverbialAdjunctionIntensityRoleSource(exactResult, role) {
      const attestedAdjective=targetObject.getClassicalNahuatlAttestedNncCellExternalProjection?.(exactResult);
      if (role === "adjoined") return Boolean(getIntensityAdverbSource(exactResult));
      return role === "principal"
        && ((attestedAdjective?.canonicalResultFrame === exactResult
            && attestedAdjective.adjectivalFunction === "predicative-quality")
          || targetObject.isClassicalNahuatlQuantitativePredicateResult?.(exactResult) === true
          || (targetObject.isClassicalNahuatlDeverbalNncGrammarFrame?.(exactResult) === true
            && exactResult.operationFrame?.constructionKind === "predicate-nominalization"
            && (exactResult.sourceFrame?.sourceCapturedFromExactVncResult === true
              || exactResult.sourceFrame?.sourceCapturedFromExactNncResult === true))
          || ((targetObject.isClassicalNahuatlOrdinaryNncResult?.(exactResult) === true
              || targetObject.isClassicalNahuatlPronominalNncResult?.(exactResult) === true)
            && Boolean(exactResult.sourceFrame?.adjectivalProfile)))
        && getCanonicalAdverbialAdjunctionSourceUnit(exactResult, "principal")?.ok === true;
    }
    function getQuantityIntensityUse(principalClause, adjoinedUnit) {
      const adverbialNucleus = getIssuedAdverbialNucleus(adjoinedUnit);
      const quantityHead = targetObject.isClassicalNahuatlQuantitativePredicateResult?.(principalClause) === true;
      const exactAdverbSource = getIntensityAdverbSource(adjoinedUnit);
      if (!isAdverbialAdjunctionIntensityRoleSource(principalClause, "principal")
        || !exactAdverbSource) return null;
      return Object.freeze({
        kind: quantityHead ? "owned-quantity-intensifier-use" : "owned-nominal-predicate-intensifier-use",
        referenceHead: principalClause,
        exactAdverbResult: adjoinedUnit,
        exactAdverbialNucleus: adverbialNucleus,
        exactAdverbSource,
        ...(quantityHead ? {quantitySource: principalClause.sourceFrame} : {predicateSource: principalClause.sourceFrame}),
        order: "modifier-head",
        readOnly: true,
        grammarAuthority: false,
      });
    }
    // Formal facts are read only from actual owners and their named child
    // roles. A profile label, a surface, or an unrelated descendant is no fact.
    function getTemporalConstructionFacts(exact, visited = new Set()) {
      const empty = {temporalWitnesses: [], corroboratingWitnesses: [], iuhState: null, iuhqui: null,
        demonstrative: null, counting: null};
      if (!exact || visited.has(exact)
        || !getCanonicalAdverbialAdjunctionSourceUnit(exact, "adjoined")?.ok) return empty;
      visited.add(exact);
      if (isAdverbialAdjunctionResult(exact)) {
        const head = getTemporalConstructionFacts(exact.sourceContract.principal.issuedResult, new Set(visited));
        const modifier = getTemporalConstructionFacts(exact.sourceContract.adjoined.issuedResult, new Set(visited));
        return {...head, temporalWitnesses: [
          ...head.temporalWitnesses,
          ...(exact.ruleProfile.relation === "time" ? modifier.temporalWitnesses : []),
        ], corroboratingWitnesses: [...head.corroboratingWitnesses,
          ...(exact.ruleProfile.relation === "time" ? modifier.corroboratingWitnesses : [])]};
      }
      if (targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(exact) === true) {
        const head = getTemporalConstructionFacts(exact.canonicalInputFrame, new Set(visited));
        const particle = getTemporalConstructionFacts(exact.particleResultFrame, new Set(visited));
        return {...head, temporalWitnesses: [...head.temporalWitnesses, ...particle.temporalWitnesses],
          corroboratingWitnesses: [...head.corroboratingWitnesses, ...particle.corroboratingWitnesses]};
      }
      if (targetObject.isClassicalNahuatlVncSentenceResultFrame?.(exact) === true) {
        const parent = exact.vncApplicationFrame;
        return parent === exact.canonicalSourceFrame
          && targetObject.isClassicalNahuatlVncApplicationFrame?.(parent) === true
            ? getTemporalConstructionFacts(parent, visited) : empty;
      }
      if (targetObject.isClassicalNahuatlSupplementationFrame?.(exact) === true) {
        const envelope = exact.principalClause;
        const head = targetObject.isClassicalNahuatlSupplementationClauseEnvelope?.(envelope) === true
          ? targetObject.getClassicalNahuatlSupplementationClauseSourceFrame?.(envelope) : null;
        return getTemporalConstructionFacts(head, visited);
      }
      if (targetObject.isClassicalNahuatlAdverbialNuclearResult?.(exact) === true
        && exact.operationFrame?.semanticDomain === "time") {
        return {...empty, temporalWitnesses: [exact], corroboratingWitnesses: [exact]};
      }
      if (targetObject.isClassicalNahuatlRelationalResult?.(exact) === true
        && exact.sourceFrame?.subjectMode === "adverbialized"
        && exact.sourceFrame.relationalFunction === "time"
        && targetObject.isClassicalNahuatlNncSlotFrame?.(exact.nncSlotFrame) === true) {
        return {...empty, temporalWitnesses: [exact], corroboratingWitnesses: [exact]};
      }
      if (targetObject.isClassicalNahuatlParticleResultFrame?.(exact) === true
        && exact.lexicalFactFrame.temporalUse?.domain === "time") {
        return {...empty,
          temporalWitnesses: exact.lexicalFactFrame.temporalUse.adjoinedExplicitIndicator ? [exact] : [],
          corroboratingWitnesses: exact.lexicalFactFrame.temporalUse.principalCorroboratingElement ? [exact] : []};
      }
      if (targetObject.isClassicalNahuatlVncApplicationFrame?.(exact) === true) {
        const request = exact.normalizedRequest;
        const iuh = request?.sourceStem === "ihui"
          && request.verbClass === "B" && request.sourceValence === "intransitive"
          && request.subject === "3sg" && request.mood === "indicative"
          && request.tense === "preterit"
          && request.sourceInitialISelection === "real"
          && request.sourceVoice === "active" && request.voice === "active"
          && ["direct", ""].includes(request.requestedDerivation || "")
          && exact.resultFrame?.selectedMachineryFrame?.predicateTableCell === "B:indicative:preterit";
        return {...empty, iuhState: iuh ? exact : null};
      }
      if (targetObject.isClassicalNahuatlDeverbalNncGrammarFrame?.(exact) === true
        && exact.operationFrame?.constructionKind === "predicate-nominalization"
        && exact.operationFrame.nominalizationKind === "preterit-agentive") {
        const source = exact.sourceFrame;
        const parent = source.canonicalVncResult;
        const capture = source.preteritVncCaptureFrame;
        const captured = parent
          && targetObject.isClassicalNahuatlPreteritVncNominalizationCaptureFrame?.(capture) === true
          && getTemporalConstructionFacts(parent, visited).iuhState === parent;
        // The same nominalization owner also admits an explicit typed
        // preterit predicate Source; its genuine source analysis is retained.
        const typed = !parent && source.sourceStem === "iuh"
          && source.sourceStage === "preterit-predicate"
          && source.sourceVoice === "active"
          && source.sourceValence === "intransitive" && source.verbClass === "B";
        return {...empty, iuhqui: captured || typed ? exact : null};
      }
      if (targetObject.isClassicalNahuatlPronominalNncResult?.(exact) === true
        && ["demonstrative-this", "demonstrative-that"].includes(exact.sourceFrame?.familyId)) {
        return {...empty, demonstrative: exact};
      }
      if (targetObject.isClassicalNahuatlNominalConstructionResult?.(exact) === true
        && exact.constructionKind === "cardinal-numeral-nnc"
        && exact.sourceFrame?.kind === "classical-nahuatl-cardinal-nominal-source-frame"
        && exact.operationFrame?.kind === "classical-nahuatl-cardinal-nominal-operation-frame"
        && targetObject.isClassicalNahuatlNncSlotFrame?.(exact.canonicalResult?.nncSlotFrame) === true) {
        return {...empty, counting: exact};
      }
      return empty;
    }
    function getTemporalProfileEligibility(principalClause, adjoinedUnit, markerUnit = null) {
      const tuple = [["principal", principalClause], ["adjoined", adjoinedUnit]];
      const missingCaptureRoles = tuple.filter(([, value]) => value == null).map(([role]) => role);
      const invalid = tuple.some(([role, value]) => value != null
        && !getCanonicalAdverbialAdjunctionSourceUnit(value, role)?.ok);
      const principal = getTemporalConstructionFacts(principalClause);
      const adjoined = getTemporalConstructionFacts(adjoinedUnit);
      const evidence = {
        implicit: adjoinedUnit && !adjoined.temporalWitnesses.length ? [adjoinedUnit] : [],
        explicit: adjoined.temporalWitnesses,
        corroborating: principal.corroboratingWitnesses,
        "iuh-state": [adjoined.iuhState].filter(Boolean),
        iuhqui: [adjoined.iuhqui].filter(Boolean),
        elliptical: [adjoined.demonstrative].filter(Boolean),
        "one-out-of-number": principal.counting && adjoined.counting
          ? [principal.counting, adjoined.counting] : [],
      };
      return Object.freeze({principalClause, adjoinedUnit, markerUnit, generationAuthority: false,
        profiles: Object.freeze(Object.entries(evidence).map(([profile, witnesses]) => {
          const status = invalid ? "incompatible" : missingCaptureRoles.length ? "needs-capture"
            : witnesses.length ? "available" : "incompatible";
          return Object.freeze({profile, status,
            blockReason: status === "available" ? "" : invalid
              ? "adverbial-adjunction-temporal-profile-canonical-source-required"
              : status === "needs-capture" ? "adverbial-adjunction-temporal-profile-capture-required"
              : `adverbial-adjunction-temporal-profile-structure-required:${profile}`,
            requiredCaptureRoles: Object.freeze(["principal", "adjoined"]),
            missingCaptureRoles: Object.freeze(missingCaptureRoles),
            witnesses: Object.freeze(witnesses), generationAuthority: false});
        }))});
    }
    function issueAdverbialAdjunctionAvailabilityContract({
      principalClause = null,
      adjoinedUnit = null,
      markerUnit = null
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
      const intensityUse = getQuantityIntensityUse(principalClause, adjoinedUnit);
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
          .filter(relation => relation !== ADVERBIAL_ADJUNCTION_RELATION.intensification || intensityUse)
          .map(relation => Object.freeze({
            relation,
            ranks: getAdverbialAdjunctionRanksForUnit(relation, unitType, adjoinedSource)
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
        intensityUse,
        temporalProfileEligibility: getTemporalProfileEligibility(principalClause, adjoinedUnit, markerUnit),
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
      const intensityUse = relation === ADVERBIAL_ADJUNCTION_RELATION.intensification
        ? getQuantityIntensityUse(request.principalClause, request.adjoinedUnit) : null;
      const temporalProfileEligibility = relation === "time" && degree === "nonadverbialized"
        ? getTemporalProfileEligibility(request.principalClause, request.adjoinedUnit, request.markerUnit) : null;
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
        intensifier: Boolean(intensityUse) || request.intensifier === true,
        intensityUse,
        selectedUse: intensityUse ? "intensifier" : "ordinary-adverb",
        inherentlyInterrogative: request.inherentlyInterrogative === true,
        interrogativeForceRetained: request.interrogativeForceRetained === true,
        includedInLargerSentence: request.includedInLargerSentence === true,
        conditionalCuePresent: request.conditionalCuePresent === true,
        negative: request.negative === true,
        temporalProfileEligibility,
        principalCorroboratingAdverbial: temporalProfileEligibility?.profiles
          .find(entry => entry.profile === "corroborating")?.status === "available",
        reducedCopula: request.reducedCopula === true,
        explicitAdverbialIndicator: temporalProfileEligibility?.profiles
          .find(entry => entry.profile === "explicit")?.status === "available"
      });
    }
    function getCompositeInnerMarkerSource(markerSource = null, profile = null) {
      const exactParticleResult = markerSource?.issuedResult;
      const sourceUse = targetObject.getClassicalNahuatlParticleRelationalUse?.(exactParticleResult);
      const sourceRole = sourceUse?.compositeRoles?.innerMarker;
      if (!markerSource?.ok || !sourceRole || sourceUse.relation !== profile?.relation
        || sourceUse.degree !== profile.degree
        || normalizeAdverbialAdjunctionMarking(sourceRole.semanticMarker) !== profile.marking) return markerSource;
      const allMembers = exactParticleResult.formulaSegments;
      const outerRole = sourceUse.compositeRoles.outerConjunctor;
      if (!Array.isArray(allMembers) || !Number.isInteger(sourceRole.memberStart)
        || !Number.isInteger(sourceRole.memberCount) || sourceRole.memberCount < 1
        || outerRole?.memberStart !== 0 || outerRole.memberCount !== sourceRole.memberStart
        || sourceRole.memberStart + sourceRole.memberCount !== allMembers.length) return markerSource;
      const formulaSegments = Object.freeze(allMembers.slice(sourceRole.memberStart));
      // These are authenticated ordered Source members, including # boundary
      // notation; no display string or caller-supplied span supplies a role.
      const formula = formulaSegments.reduce((text, member) => text
        ? `${text}${member.startsWith("#") || text.endsWith("#") ? "" : " "}${member}` : member, "");
      const surface = formulaSegments.map(member => member.replace(/^#|#$/gu, "")).join(" ");
      const rightAttachedToFollowingUnit = formulaSegments.at(-1).endsWith("#");
      const compositeMarkerRole = Object.freeze({
        kind: "classical-composite-inner-marker-projection",
        exactParticleResult, sourceUse, sourceRole, formulaSegments, formula, surface,
        rightAttachedToFollowingUnit, separatelyIssuedParticle: false,
        callerSuppliedAuthorityAccepted: false,
      });
      return Object.freeze({...markerSource, sourceKind: "composite-particle-inner-role",
        surface, surfaceForms: Object.freeze([surface]), compositeMarkerRole,
        grammarFrame: Object.freeze({
          unitFrame: Object.freeze({...markerSource.grammarFrame?.unitFrame,
            semanticMarker: sourceRole.semanticMarker, marking: sourceRole.semanticMarker}),
          morphBoundaryFrame: Object.freeze({...markerSource.grammarFrame?.morphBoundaryFrame,
            semanticMarker: sourceRole.semanticMarker, marking: sourceRole.semanticMarker,
            rightAttachedToFollowingUnit}),
        }),
      });
    }
    function adverbialAdjunctionMarkerMatchesProfile(markerSource, marking) {
      if (!markerSource?.ok || marking === ADVERBIAL_ADJUNCTION_MARKING.unknown) return false;
      if (marking === ADVERBIAL_ADJUNCTION_MARKING.particle) {
        return (markerSource.features?.unitKind || markerSource.unitType)
          === ADVERBIAL_ADJUNCTION_UNIT.particle;
      }
      const grammarFrame = markerSource.grammarFrame;
      const result = markerSource.issuedResult;
      if (isAdverbialAdjunctionResult(result) && result.ok && result.supported
        && result.ruleProfile?.relation === "manner" && result.ruleProfile?.order === "head-modifier"
        && result.sourceContract?.adjoined?.issuedResult?.sourceFrame?.familyId === "personal-simple"
        && result.sourceContract.adjoined.issuedResult.operationFrame?.subject === "3common"
        && result.sourceContract?.principal?.grammarFrame?.unitFrame?.semanticMarker === "in-tla-nel") {
        return marking === ADVERBIAL_ADJUNCTION_MARKING.inTlaNel;
      }
      const semanticMarker = markerSource.compositeMarkerRole?.sourceRole?.semanticMarker
        || result?.semanticMarker
        || grammarFrame?.unitFrame?.semanticMarker
        || grammarFrame?.morphBoundaryFrame?.semanticMarker
        || grammarFrame?.unitFrame?.marking
        || grammarFrame?.morphBoundaryFrame?.marking
        || "";
      if (semanticMarker) {
        return normalizeAdverbialAdjunctionMarking(semanticMarker) === marking;
      }
      // iuh is an adverbial NNC identity, not a particle inventory spelling.
      return marking === ADVERBIAL_ADJUNCTION_MARKING.iuh
        && (result?.lexicalEntryId === "44.3-iuh"
          || result?.lexicalAuthorizationFrame?.lexicalEntryId === "44.3-iuh"
          || grammarFrame?.nuclearClauseFrame?.adverbialCenter === "iuh"
          || grammarFrame?.morphBoundaryFrame?.adverbialCenter === "iuh");
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
      if ((principalSource?.attestedPrincipalUse === "condition-principal" || adjoinedSource?.attestedPrincipalUse)
        && (profile.relation !== ADVERBIAL_ADJUNCTION_RELATION.condition || adjoinedSource?.attestedPrincipalUse))
        diagnostics.push("attested-collocation-condition-principal-only");
      if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.unknown) {
        diagnostics.push("adverbial-adjunction-relation-required");
      }
      if (profile.order === ADVERBIAL_ADJUNCTION_ORDER.unknown) {
        diagnostics.push("adverbial-adjunction-order-required");
      }
      if (profile.unitType === ADVERBIAL_ADJUNCTION_UNIT.unknown) {
        diagnostics.push("adverbial-adjunction-unit-type-required");
      }
      const use = getIssuedAdverbialUseConstraint(adjoinedSource);
      if (use) {
        if (!use.relations.includes(profile.relation)) {
          diagnostics.push("adverbial-adjunction-source-use-relation-not-licensed");
        }
        const issuedDegree = ({"first-degree": "first", "second-degree": "second"})[
          use.nucleus.operationFrame?.degree];
        if (profile.degree !== issuedDegree) {
          diagnostics.push("adverbial-adjunction-source-degree-does-not-match-issued-adverbial");
        }
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
      if (profile.marking !== ADVERBIAL_ADJUNCTION_MARKING.unmarked
        && markerSource?.ok
        && !adverbialAdjunctionMarkerMatchesProfile(markerSource, profile.marking)) {
        diagnostics.push("adverbial-adjunction-marker-identity-does-not-match-marking");
      }
      const isAdverbialized = profile.degree === ADVERBIAL_ADJUNCTION_DEGREE.first
        || profile.degree === ADVERBIAL_ADJUNCTION_DEGREE.second;
      const isNonadverbialized =
        profile.degree === ADVERBIAL_ADJUNCTION_DEGREE.nonadverbialized;
      if (!isAdverbialized && !isNonadverbialized) {
        diagnostics.push("adverbial-adjunction-degree-required");
      }
      if (isAdverbialized) {
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.intensification && !profile.intensityUse) {
          diagnostics.push("adverbial-adjunction-licensed-intensifier-and-quantity-required");
        }
        const licensedDomains =
          ADVERBIALIZED_RELATIONS_BY_RANK[profile.degree] || [];
        const possessiveRanks = getPossessiveRelationalAdverbialRanks(adjoinedSource, profile.relation);
        const conjoinedUse = getConjoinedRelationalAdverbialUse(adjoinedSource?.issuedResult);
        if (conjoinedUse && profile.degree !== conjoinedUse.degree) {
          diagnostics.push("adverbial-adjunction-conjoined-nnc-degree-must-match-actual-children");
        }
        if (possessiveRanks !== null && !possessiveRanks.includes(profile.degree)) {
          diagnostics.push("adverbial-adjunction-possessive-nnc-allows-first-degree-only");
        }
        if (!licensedDomains.includes(profile.relation)
          && !possessiveRanks?.includes(profile.degree)) {
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
        if (profile.relation === ADVERBIAL_ADJUNCTION_RELATION.time) {
          const eligibility = getTemporalProfileEligibility(
            principalSource?.issuedResult, adjoinedSource?.issuedResult
          ).profiles.find(entry => entry.profile === profile.timeProfile);
          if (eligibility?.status !== "available") diagnostics.push(eligibility?.blockReason
            || "adverbial-adjunction-time-profile-required");
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
            && ![ADVERBIAL_ADJUNCTION_UNIT.nnc, ADVERBIAL_ADJUNCTION_UNIT.vnc, ADVERBIAL_ADJUNCTION_UNIT.clause].includes(profile.unitType)
            && !((adjoinedSource?.features?.sentenceType === "supplementation"
                && adjoinedSource.features.nuclearCenter === "nnc")
              || adjoinedSource?.features?.nuclearCenter === "vnc")) {
            diagnostics.push("adverbial-adjunction-open-condition-center-required");
          }
          if (profile.conditionType === ADVERBIAL_ADJUNCTION_CONDITION.open
            && (profile.unitType === ADVERBIAL_ADJUNCTION_UNIT.vnc
              || adjoinedSource?.features?.nuclearCenter === "vnc")) {
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
            [ADVERBIAL_ADJUNCTION_CONCESSION.atLeast]: [ADVERBIAL_ADJUNCTION_MARKING.maNelZan, ADVERBIAL_ADJUNCTION_MARKING.maZanNel, ADVERBIAL_ADJUNCTION_MARKING.maNelZa, ADVERBIAL_ADJUNCTION_MARKING.maZaNel, ADVERBIAL_ADJUNCTION_MARKING.maTelZa, ADVERBIAL_ADJUNCTION_MARKING.maTelZaYeh]
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
      surface = "",
      sharedIntervenerProjection = null
    } = {}) {
      const markerFormulaId = String(markerSource?.formulaRecordId || markerSource?.formulaRealizationRecordId || "");
      const principalFormulaId = String(principalSource?.formulaRecordId || principalSource?.formulaRealizationRecordId || principalSource?.astKind || "");
      const adjoinedFormulaId = String(adjoinedSource?.formulaRecordId || adjoinedSource?.formulaRealizationRecordId || adjoinedSource?.astKind || "");
      const formulaText = sharedIntervenerProjection?.formula || (profile.order === ADVERBIAL_ADJUNCTION_ORDER.headModifier
        || profile.order === ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier
        ? "PRINCIPAL(CN) + MARKER? + ADJOINED(CN)"
        : profile.order === ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead
          ? "ADVERBIAL-PRINCIPAL(CN) + ADJUNCTOR? + ADJOINED-HEAD(CN)"
          : "MARKER? + ADJOINED(CN) + PRINCIPAL(CN)");
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
    function getPurposeIntroductionProjection(adjoinedSource, markerSource, profile) {
      const sentence = adjoinedSource?.issuedResult;
      if (profile.relation !== ADVERBIAL_ADJUNCTION_RELATION.purpose
        || ![ADVERBIAL_ADJUNCTION_PURPOSE.maOptative, ADVERBIAL_ADJUNCTION_PURPOSE.maAdmonitiveLest].includes(profile.purposeType)
        || ![ADVERBIAL_ADJUNCTION_MARKING.ma, ADVERBIAL_ADJUNCTION_MARKING.inMa].includes(profile.marking)
        || targetObject.isClassicalNahuatlVncSentenceResultFrame?.(sentence) !== true
        || markerSource?.ok !== true) return null;
      const sentenceFrame = sentence.sentenceSurfaceFrame;
      const particles = sentenceFrame?.sentenceParticles;
      if (!Array.isArray(particles) || particles.filter(particle => particle === "mā").length !== 1) return null;
      // §50.6.2 supplies the same mā introduction at the clause boundary.
      // Consume its structural occurrence once, retaining all other particles
      // and prefix carriers. This is a realization projection, not a new owner.
      const remainingParticles = Object.freeze(particles.filter(particle => particle !== "mā"));
      const realizationFrame = {...sentenceFrame, sentenceParticles: remainingParticles, finalPunctuation: ""};
      const surface = targetObject.buildClassicalNahuatlVncSentenceSurfaceRealization(
        realizationFrame, sentence.consumedNuclearSurface, null, {embedded: true});
      const formula = targetObject.buildClassicalNahuatlVncSentenceFormulaRealization(
        realizationFrame, sentence.consumedNuclearFormula);
      return surface && formula ? Object.freeze({exactSentence: sentence,
        exactMarker: markerSource.issuedResult, consumedIntroduction: "mā",
        remainingParticles, surface, formula, grammarAuthority: false}) : null;
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
      const profile = buildAdverbialAdjunctionRuleProfile({ ...effectiveRequest,
        conditionalCuePresent: adjoinedSource?.features?.conditionalCue === true });
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
        : getCompositeInnerMarkerSource(
            getCanonicalAdverbialAdjunctionSourceUnit(request.markerUnit, "marker"), profile);
      const validation = validateAdverbialAdjunctionRuleProfile({
        principalSource,
        adjoinedSource,
        markerSource,
        profile
      });
      const purposeIntroductionProjection = getPurposeIntroductionProjection(adjoinedSource, markerSource, profile);
      const realizedAdjoinedSource = purposeIntroductionProjection
        ? Object.freeze({...adjoinedSource, surface: purposeIntroductionProjection.surface,
            surfaceForms: Object.freeze([purposeIntroductionProjection.surface])})
        : adjoinedSource;
      const composed = buildAdverbialAdjunctionAst({
        principalClause: principalSource,
        adjoinedUnit: realizedAdjoinedSource,
        semanticRelation: profile.relation,
        adjoinedUnitType: profile.unitType,
        order: profile.order,
        recursion: profile.recursion,
        marking: profile.marking,
        marker: markerSource.surface,
        markerRightAttached: markerSource.grammarFrame?.morphBoundaryFrame?.rightAttachedToFollowingUnit === true,
        adjoinedClauseAdverbialized: profile.degree !== ADVERBIAL_ADJUNCTION_DEGREE.nonadverbialized,
        conditionType: profile.conditionType,
        purposeMood: adjoinedSource.features.mood,
        evidenceSource: "canonical-typed-clause-results"
      });
      const sharedIntervenerRequested = profile.order === ADVERBIAL_ADJUNCTION_ORDER.discontinuous;
      const sharedIntervenerAuthorized = sharedIntervenerRequested
        && principalSource.ok && adjoinedSource.ok
        && profile.relation === ADVERBIAL_ADJUNCTION_RELATION.place
        && profile.degree === ADVERBIAL_ADJUNCTION_DEGREE.first
        && [ADVERBIAL_ADJUNCTION_MARKING.unmarked, ADVERBIAL_ADJUNCTION_MARKING.in].includes(profile.marking)
        && request.adjoinedUnit?.operationKind === "adjectival-modification"
        && targetObject.getClassicalSupplementationIntervenerSource?.(request.adjoinedUnit)
          === request.principalClause;
      const sharedTokens = sharedIntervenerAuthorized
        ? request.adjoinedUnit.linearizationTokens.flatMap(token => {
          const head = token.kind === "clause"
            && token.clause === request.adjoinedUnit.selectedClauses[0];
          return [
            ...(head && profile.marking === ADVERBIAL_ADJUNCTION_MARKING.in
              ? [{surface: markerSource.surface, formula: "in", sourceResult: request.markerUnit}] : []),
            token.kind === "adjunctor"
              ? {surface: token.value, formula: token.value}
              : {surface: token.clause.unitSurface, formula: token.clause.formula, sourceResult: token.clause.sourceResult},
          ];
        }) : [];
      const sharedSurface = sharedTokens.map(token => token.surface).join(" ");
      const sharedIntervenerProjection = sharedIntervenerAuthorized ? Object.freeze({
        principalResult: request.principalClause,
        adjoinedResult: request.adjoinedUnit,
        markerResult: profile.marking === ADVERBIAL_ADJUNCTION_MARKING.in ? request.markerUnit : null,
        tokens: Object.freeze(sharedTokens.map(Object.freeze)),
        surface: sharedSurface.replace(/^./u, initial => initial.toUpperCase()) + ".",
        formula: sharedTokens.map(token => token.formula).join(" "),
        exactOccurrenceReused: true,
      }) : null;
      const relationalFamilyDiagnostics =
        relationalNumeralCoCContract?.authorizationStatus === "blocked"
          ? [relationalNumeralCoCContract.blockReason]
          : [];
      const supported = validation.ok
        && composed.supported === true
        && relationalFamilyDiagnostics.length === 0
        && (!sharedIntervenerRequested || sharedIntervenerAuthorized);
      const principalSentence = principalSource.issuedResult;
      const nuclearAdverbial = adjoinedSource.issuedResult;
      const recursiveModifier = profile.structure === ADVERBIAL_ADJUNCTION_STRUCTURE.complex
        && profile.recursion === ADVERBIAL_ADJUNCTION_RECURSION.modifier
        && isAdverbialAdjunctionResult(nuclearAdverbial);
      const insideWish = supported
        && (profile.structure === ADVERBIAL_ADJUNCTION_STRUCTURE.simple || recursiveModifier)
        && [ADVERBIAL_ADJUNCTION_DEGREE.first, ADVERBIAL_ADJUNCTION_DEGREE.second].includes(profile.degree)
        && profile.order === ADVERBIAL_ADJUNCTION_ORDER.modifierHead
        && profile.marking === ADVERBIAL_ADJUNCTION_MARKING.unmarked
        && targetObject.isClassicalNahuatlVncSentenceResultFrame?.(principalSentence) === true
        && ["optative", "admonitive"].includes(principalSentence.sentenceSurfaceFrame?.mood)
        && principalSentence.sentenceSurfaceFrame.sentenceParticles?.some(particle => ["mā", "tlā"].includes(particle))
        && (targetObject.isClassicalNahuatlAdverbialNuclearResult?.(nuclearAdverbial) === true
          || targetObject.isClassicalNahuatlRelationalResult?.(nuclearAdverbial) === true
            && nuclearAdverbial.sourceFrame?.subjectMode === "adverbialized"
          || targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(nuclearAdverbial) === true && nuclearAdverbial.nuclearClauseKind === "nnc"
          || recursiveModifier);
      // Andrews 49.5 places the whole modifier after mā. The sentence owner
      // consumes the issued AST, rather than rebuilding it from its words.
      const wishFormula = insideWish
        ? targetObject.buildClassicalNahuatlVncSentenceFormulaRealization(principalSentence.sentenceSurfaceFrame, principalSentence.consumedNuclearFormula, nuclearAdverbial) : "";
      const wishSurface = insideWish
        ? targetObject.buildClassicalNahuatlVncSentenceSurfaceRealization(principalSentence.sentenceSurfaceFrame, principalSentence.consumedNuclearSurface, nuclearAdverbial) : "";
      const wishEmbeddedSurface = insideWish
        ? targetObject.buildClassicalNahuatlVncSentenceSurfaceRealization(principalSentence.sentenceSurfaceFrame, principalSentence.consumedNuclearSurface, nuclearAdverbial, {embedded: true}) : "";
      const wishAdverbialProjection = insideWish && wishFormula && wishSurface && wishEmbeddedSurface ? Object.freeze({
        principalSentence,
        nuclearAdverbial,
        placement: "after-wish-introduction-before-nucleus",
        formula: wishFormula,
        surface: wishSurface,
        embeddedSurface: wishEmbeddedSurface,
      }) : null;
      const relationalDiscourse = targetObject.isClassicalNahuatlRelationalResult?.(adjoinedSource.issuedResult) === true
        ? adjoinedSource.issuedResult.sentenceFrame?.discourseFrame : null;
      const initialRelationalQuestion = relationalDiscourse?.interrogativeReadingActive === true
        && profile.order === ADVERBIAL_ADJUNCTION_ORDER.modifierHead
        && !profile.negative && !profile.includedInLargerSentence;
      const issuedAdverbialNucleus = getIssuedAdverbialNucleus(adjoinedSource.issuedResult);
      const issuedAdverbialContext = issuedAdverbialNucleus?.operationFrame?.contextFrame;
      const initialAdverbialQuestion = targetObject.isClassicalNahuatlAdverbialContextFrame?.(issuedAdverbialContext) === true
        && issuedAdverbialContext.interrogativeForce === true
        && [ADVERBIAL_ADJUNCTION_ORDER.modifierHead, ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead].includes(profile.order)
        && !profile.negative && !profile.includedInLargerSentence;
      const sentencePunctuation = initialRelationalQuestion || initialAdverbialQuestion ? "?"
        : profile.intensityUse ? profile.intensityUse.referenceHead.sentencePunctuation || principalSource.features.sentencePunctuation
          : principalSource.features.sentencePunctuation;
      const composedSentenceSurface = supported
        && sentencePunctuation
        ? `${composed.surface.charAt(0).toUpperCase()}${composed.surface.slice(1)}${sentencePunctuation}`
        : composed.surface;
      const surface = supported ? sharedIntervenerProjection?.surface || wishAdverbialProjection?.surface || composedSentenceSurface : "";
      const artifacts = buildAdverbialAdjunctionFormulaArtifacts({
        principalSource,
        adjoinedSource: realizedAdjoinedSource,
        markerSource,
        profile,
        surface,
        sharedIntervenerProjection
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
        ...(profile.intensityUse ? {
          quantitativePredicateParent: request.principalClause,
          intensityAdverbParent: request.adjoinedUnit,
          savedStateCapability: "deliberately-unsupported",
          savedStateNote: "Session only",
        } : {}),
        formulaRecord: artifacts.formulaRecord,
        formulaRealizationRecord: artifacts.formulaRealizationRecord,
        surfaceSequence: supported ? sharedIntervenerProjection || wishAdverbialProjection ? [surface] : composed.surfaceSequence : [],
        wishAdverbialProjection,
        sharedIntervenerProjection,
        purposeIntroductionProjection,
        surface,
        sentencePunctuation,
        embeddedSurface: supported
          ? sharedIntervenerProjection ? sharedSurface
            : wishAdverbialProjection
              ? wishAdverbialProjection.embeddedSurface
              : composed.surface
          : "",
        changesCanonicalSurfaceForms: false,
        newWordGenerationAllowed: false,
        generationAllowed: supported,
        diagnostics: Array.from(new Set([
          ...validation.diagnostics,
          ...(sharedIntervenerRequested && !sharedIntervenerAuthorized
            ? ["discontinuous-place-requires-exact-shared-intervener"] : []),
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
      marker = "",
      markerRightAttached = false
    } = {}) {
      const principal = String(principalSurface || "").trim();
      const adjoined = String(adjoinedSurface || "").trim();
      const normalizedOrder = normalizeAdverbialAdjunctionOrder(order);
      const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking || marker);
      const markerText = String(marker || "").trim() || (normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.unmarked ? "" : normalizedMarking.replace("-", " "));
      const markedAdjoined = [markerText, adjoined].filter(Boolean).join(markerRightAttached ? "" : " ");
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
      markerRightAttached = false,
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
        marker,
        markerRightAttached
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
    api.isAdverbialAdjunctionIntensityRoleSource = isAdverbialAdjunctionIntensityRoleSource;
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
