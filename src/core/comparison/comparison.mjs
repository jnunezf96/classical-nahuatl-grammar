// Canonical Classical Nahuatl similarity/comparison grammar.
//
// Production owns semantic routes, typed source units, operation ordering,
// AST construction, and result realization.  Lesson/source spans, example
// strings, audit dispositions, counts, and closure receipts remain in tests
// and documentation and never authorize output.

export function createComparisonApi(targetObject = globalThis, installationContext = null) {
    const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
    const COMPARISON_BOUNDARY_VERSION = 2;
    const SOURCE_FRAME_KIND = "classical-nahuatl-comparison-source-unit";
    const OPERATION_FRAME_KIND = "classical-nahuatl-comparison-operation-frame";
    const AST_FRAME_KIND = "classical-nahuatl-comparison-ast";
    const RESULT_FRAME_KIND = "classical-nahuatl-comparison-result-frame";
    const GCD_ID = "typed-comparison-source-route-ast-result";

    const issuedSourceFrames = new WeakSet();
    const issuedOperationFrames = new WeakSet();
    const issuedAstFrames = new WeakSet();
    const issuedResultFrames = new WeakSet();

    const freeze = value => {
      if (Array.isArray(value)) return Object.freeze(value.map(freeze));
      if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
      Object.values(value).forEach(freeze);
      return Object.freeze(value);
    };
    const clone = value => {
      if (Array.isArray(value)) return value.map(clone);
      if (!value || typeof value !== "object") return value;
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, clone(entry)]));
    };
    const text = value => String(value ?? "").trim().replace(/\s+/gu, " ");
    const key = value => text(value).toLowerCase().replace(/[_\s]+/gu, "-");
    const compact = value => text(value).replace(/[\s\-()#]/gu, "");
    const titleCaseFirst = value => {
      const normalized = text(value);
      return normalized ? `${normalized[0].toLocaleUpperCase()}${normalized.slice(1)}` : "";
    };
    const join = (...values) => values.flat().map(text).filter(Boolean).join(" ");
    const comma = (left, right) => left && right ? `${text(left)}, ${text(right)}` : text(left || right);
    const terminal = (surface, sentenceType = "none") => {
      const normalized = text(surface).replace(/[.?!]$/u, "");
      const sentence = sentenceType === "none" ? normalized : titleCaseFirst(normalized);
      if (sentenceType === "declarative") return `${sentence}.`;
      if (sentenceType === "interrogative") return `${sentence}?`;
      if (sentenceType === "exclamative") return `${sentence}!`;
      return normalized;
    };

    const COMPARISON_RELATION = freeze({
      equality: "equality",
      similarity: "similarity",
      size: "size",
      comparativeDegree: "comparative-degree",
      superlativeDegree: "superlative-degree",
      comparisonQuestion: "comparison-question",
      unknown: "unknown"
    });
    const COMPARISON_FALSE_POSITIVE_SOURCE = freeze({
      adjectiveModeOutput: "adjective-mode-output",
      adjectivalModificationBoundary: "adjectival-modification-boundary",
      translationAdjective: "translation-adjective",
      comparisonTranslation: "comparison-translation",
      degreeLabel: "degree-label",
      questionLabel: "question-label",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      roadmapText: "roadmap-text",
      storedCanvasExample: "stored-canvas-example",
      lessonMetadata: "lesson-metadata",
      displayFormula: "display-formula",
      unknown: "unknown"
    });
    const COMPARISON_SOURCE_UNIT_KINDS = freeze([
      "nnc",
      "vnc",
      "composition"
    ]);
    const SENTENCE_TYPES = freeze(["none", "declarative", "interrogative", "exclamative"]);
    const FORBIDDEN_COMPARISON_AUTHORITY_KEYS = freeze([
      "answer",
      "display",
      "evidenceSource",
      "formula",
      "lesson",
      "lessonId",
      "lessonNumber",
      "marker",
      "result",
      "selectedResult",
      "sourceSection",
      "storedAnswer",
      "storedResult",
      "surface"
    ]);

    const SAME_AS_MARKERS = freeze({
      "zan-no-yehhuatl": "zan nō yehhuātl",
      "zan-ye-yehhuatl": "zan ye yehhuātl",
      "zan-ye-no-yehhuatl": "zan ye nō yehhuātl",
      "zan-no-yeh": "zan nō yeh",
      "zan-ye-yeh": "zan ye yeh",
      "zan-ye-no-yeh": "zan ye nō yeh"
    });
    const NEGATIVE_STANDARD_INTRODUCERS = freeze({
      inahmo: "inahmo",
      "in-ahmo-iuh": "in ahmō iuh",
      "in-ahmo-iuhqui": "in ahmō iuhqui",
      "in-ahmo-mach-iuh": "in ahmō mach iuh",
      "in-ahmo-mach-iuhqui": "in ahmō mach iuhqui"
    });
    const COMPARATIVE_DEGREE_MARKERS = freeze({
      "oc-achi": "oc achi",
      "oc-cencah": "oc cencah",
      "oc-cencah-yeh": "oc cencah yeh",
      "oc-cencah-yehhuatl": "oc cencah yehhuātl",
      "oc-yeh": "oc yeh",
      "oc-yeh-cencah": "oc yeh cencah",
      "huel-oc": "huel oc",
      "huel-oc-achi": "huel oc achi",
      "huel-oc-cencah": "huel oc cencah",
      achi: "achi",
      cencah: "cencah",
      oc: "oc",
      none: ""
    });
    const SIMILARITY_DEGREE_MARKERS = freeze({
      achi: "achi",
      none: ""
    });
    const SIZE_DEGREE_MARKERS = freeze({
      achi: "achi",
      "zan-achi": "zan achi",
      none: ""
    });
    const TACHCAUH_DEGREE_MARKERS = freeze({
      oc: "oc",
      "oc-achi": "oc achi",
      "oc-cencah": "oc cencah",
      "huel-oc": "huel oc",
      "huel-oc-achi": "huel oc achi",
      "huel-oc-cencah": "huel oc cencah"
    });
    const PANAHUIA_DEGREE_MARKERS = freeze({
      achi: "achi",
      cencah: "cencah",
      oc: "oc",
      "oc-achi": "oc achi",
      "oc-cencah": "oc cencah",
      "huel-oc": "huel oc",
      "huel-oc-achi": "huel oc achi",
      "huel-oc-cencah": "huel oc cencah",
      none: ""
    });
    const ADVERSATIVE_MARKERS = freeze({
      zan: "zan",
      yeceh: "yēceh"
    });
    const QUESTION_COLLOCATIONS = freeze({
      "oc-yeh": "oc yeh",
      "oc-eh": "oc eh",
      "zan-yeh": "zan yeh",
      "oc-yeh-cencah-hualcah": "oc yeh cencah huālcah",
      "oc-yeh-cencah-tlapanahuia": "oc yeh cencah tlapanahuia"
    });
    const SUPERLATIVE_ADVERBIALS = freeze({
      cencah: "cencah",
      huel: "huel",
      "cencah-huel": "cencah huel",
      "za-cencah": "zā cencah",
      "za-cencah-huel": "zā cencah huel"
    });
    const SUPERLATIVE_INCORPORATED = freeze({
      cem: "cem",
      cenquizca: "cenquīzcā",
      cemahcica: "cemahcicā"
    });
    const SUPERLATIVE_PRINCIPALS = freeze({
      ahcic: "ahcic",
      cemahcic: "cemahcic",
      tlapanahuia: "tlapanahuia",
      tlacempanahuia: "tlacempanahuia",
      mahcitzinohticah: "mahcitzinohticah",
      mocemahcitzinohticah: "mocemahcitzinohticah",
      motlacempanahuilia: "motlacempanahuilia"
    });
    const IUHQUI_MODIFIERS = freeze({
      none: "",
      ca: "ca",
      "ca-zan": "ca zan",
      "ca-ye": "ca ye",
      huel: "huel",
      "zan-achi-huel": "zan achi huel",
      "ahmo-zan-no": "ahmō zan nō",
      "za": "zā",
      "ma-nen": "mā nēn"
    });
    const PRINCIPAL_COMPARISON_NNCS = freeze({
      tachcauh: "tāchcāuh",
      hualcah: "huālcah"
    });
    const REDUPLICATIVE_CONTINUATIONS = freeze({
      "absolutive-tl": { suffix: "tl", formulaSuffix: "-tl-", shortenStem: false },
      "absolutive-tli": { suffix: "tli", formulaSuffix: "-tli-", shortenStem: false },
      "absolutive-li": { suffix: "li", formulaSuffix: "-li-", shortenStem: false },
      "hui-preterit-agentive": { suffix: "uhqui", formulaSuffix: "-uh-Ø-qui-", shortenStem: false },
      "ti-agentive": { suffix: "tic", formulaSuffix: "-ti-Ø-c-", shortenStem: true },
      "oyotl-nehnemi": { suffix: "nehnemi", formulaSuffix: "-neh-nemi", shortenStem: false },
      "cihuatl-tlahtoa": { suffix: "tlahtoā", formulaSuffix: "-tla-ht-o-ā", shortenStem: false },
      bare: { suffix: "", formulaSuffix: "", shortenStem: false }
    });
    const COMPARISON_CHOICE_FORMULAS = freeze({
      sameAsMarker: {
        "zan-no-yehhuatl": "zan + nō + yehhuātl",
        "zan-ye-yehhuatl": "zan + ye + yehhuātl",
        "zan-ye-no-yehhuatl": "zan + ye + nō + yehhuātl",
        "zan-no-yeh": "zan + nō + yeh",
        "zan-ye-yeh": "zan + ye + yeh",
        "zan-ye-no-yeh": "zan + ye + nō + yeh"
      },
      negativeIntroducer: {
        inahmo: "in + ahmō",
        "in-ahmo-iuh": "in + ahmō + iuh",
        "in-ahmo-iuhqui": "in + ahmō + #0-0(iuh-Ø-qui)0-0#",
        "in-ahmo-mach-iuh": "in + ahmō + mach + iuh",
        "in-ahmo-mach-iuhqui":
          "in + ahmō + mach + #0-0(iuh-Ø-qui)0-0#"
      },
      degreeMarker: {
        none: "",
        achi: "achi",
        "zan-achi": "zan + achi",
        cencah: "cencah",
        oc: "oc",
        "oc-achi": "oc + achi",
        "oc-cencah": "oc + cencah",
        "oc-cencah-yeh": "oc + cencah + yeh",
        "oc-cencah-yehhuatl": "oc + cencah + yehhuātl",
        "oc-yeh": "oc + yeh",
        "oc-yeh-cencah": "oc + yeh + cencah",
        "huel-oc": "huel + oc",
        "huel-oc-achi": "huel + oc + achi",
        "huel-oc-cencah": "huel + oc + cencah"
      },
      adversativeMarker: {
        zan: "zan",
        yeceh: "yēceh"
      },
      questionCollocation: {
        "oc-yeh": "oc + yeh",
        "oc-eh": "oc + eh",
        "zan-yeh": "zan + yeh",
        "oc-yeh-cencah-hualcah":
          "oc + yeh + cencah + #0-0(huālcah)0-0#",
        "oc-yeh-cencah-tlapanahuia":
          "oc + yeh + cencah + #0-0+tla(pan-a-huiā)0+0-0#"
      },
      superlativeAdverbial: {
        cencah: "cencah",
        huel: "huel",
        "cencah-huel": "cencah + huel",
        "za-cencah": "zā + cencah",
        "za-cencah-huel": "zā + cencah + huel"
      },
      incorporatedSuperlative: {
        cem: "cem",
        cenquizca: "cen-quīz-cā",
        cemahcica: "cem-ahci-Ø-cā"
      },
      superlativePrincipal: {
        ahcic: "#0-0(ahci-Ø-c)0-0#",
        cemahcic: "#0-0(cem-ahci-Ø-c)0-0#",
        tlapanahuia: "#0-0+tla(pan-a-huiā)0+0-0#",
        tlacempanahuia: "#0-0+tla(cem-pan-a-huiā)0+0-0#",
        mahcitzinohticah:
          "#0-0+m-⎕(ahci-tzino-h-ti-ca-h)0+0-0#",
        mocemahcitzinohticah:
          "#0-0+m-o(cem-ahci-tzino-h-ti-ca-h)0+0-0#",
        motlacempanahuilia:
          "#0-0+m-o+tla(cem-pan-a-hui-liā)0+0-0#"
      },
      iuhquiModifier: {
        none: "",
        ca: "ca",
        "ca-zan": "ca + zan",
        "ca-ye": "ca + ye",
        huel: "huel",
        "zan-achi-huel": "zan + achi + huel",
        "ahmo-zan-no": "ahmō + zan + nō",
        za: "zā",
        "ma-nen": "mā + nēn"
      },
      principalNnc: {
        tachcauh: "#0-0(tāchcāuh)0-0#",
        hualcah: "#0-0(huālcah)0-0#"
      }
    });

    const COMPARISON_ANTI_CONFLATION_RULES = freeze([
      "comparison evidence does not authorize a result",
      "lesson metadata does not select a route",
      "a stored Canvas surface does not become a generated answer",
      "adjective-like word output is not comparison syntax",
      "adjectival modification is not automatically similarity or comparison",
      "degree, question, translation, and display-formula labels are non-authoritative",
      "one typed route composes already-authorized source units; it does not replace their noun, NNC, or VNC generators"
    ]);
    const COMPARISON_STRUCTURAL_QUESTIONS = freeze([
      { field: "routeId", asks: "Which licensed semantic comparison route is requested?" },
      { field: "comparand", asks: "Which typed unit is being compared?" },
      { field: "standard", asks: "Which typed unit supplies the standard or reference?" },
      { field: "dimension", asks: "Which typed unit supplies the quality, size, manner, or comparison point?" },
      { field: "clauseRank", asks: "Is the comparison principal, adjoined, supplementary, topical, or embedded in a larger concatenate?" },
      { field: "markerChoice", asks: "Which licensed particle, collocation, question, or superlative strategy is selected?" }
    ]);

    function route(id, relation, operation, requiredSlots, formulaTemplate, choiceFields = [], axes = []) {
      return freeze({
        id,
        relation,
        operation,
        requiredSlots,
        formulaTemplate,
        choiceFields,
        axes,
        typedSourceRequired: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }

    const COMPARISON_ROUTE_INVENTORY = freeze([
      route("similarity-reduplicative-prefix", COMPARISON_RELATION.similarity, "derive-similarity-reduplicative-word", ["source"], "REDUPLICATIVE_PREFIX(STEM)+CONTINUATION -> SIMILARITY_WORD", ["continuationFamily"], ["word-formation", "reduplication", "continuation"]),
      route("similarity-downgraded-possessive-tla", COMPARISON_RELATION.similarity, "downgrade-possessive-predicate-to-nounstem", ["source"], "tla+NOUNSTEM+ABSOLUTIVE -> QUASI_NOUN", [], ["word-formation", "possessive-state", "downgrading"]),
      route("similarity-tloc-relational-nnc", COMPARISON_RELATION.similarity, "compose-relational-nnc-similarity", ["comparand", "standard"], "COMPARAND+DEGREE+POSSESSIVE(tloc)+in+STANDARD", ["degreeMarker", "sentenceType"], ["principal-nnc", "relational", "degree"]),
      route("similarity-same-as-pronominal", COMPARISON_RELATION.similarity, "compose-nonpreposed-same-as", ["comparand", "standard"], "COMPARAND+SAME_AS_MARKER+in+STANDARD", ["sameAsMarker", "sentenceType"], ["principal-clause", "nonpreposed-adjectival", "marker-variant"]),
      route("similarity-incorporated-nehnequi", COMPARISON_RELATION.similarity, "derive-incorporated-complement-resemblance-vnc", ["source"], "mo+INCORPORATED_NOUNSTEM+nehnequi", ["degreeMarker", "sentenceType"], ["compound-verbstem", "incorporation", "reflexive-matrix"]),
      route("similarity-resemblance-verbstem-nnc", COMPARISON_RELATION.similarity, "compose-resemblance-verbstem-nnc", ["principal", "standard"], "RESEMBLANCE_NNC+in+STANDARD", ["sentenceType"], ["principal-nnc", "resemblance-verbstem"]),
      route("similarity-ihui-vnc", COMPARISON_RELATION.similarity, "compose-ihui-vnc-similarity", ["principal"], "TOPIC+ihui_VNC", ["sentenceType"], ["ihui", "vnc", "topic"]),
      route("similarity-iuhqui-principal", COMPARISON_RELATION.similarity, "compose-iuhqui-principal-clause", ["adjoined"], "TOPIC+MODIFIER+iuhqui+(in)+ADJOINED+(ic)+DIMENSION", ["iuhquiModifier", "adjunctorIn", "icRelation", "sentenceType"], ["iuhqui", "principal-nnc", "impersonal", "adjoined-clause", "topic", "ic"]),
      route("similarity-iuhqui-larger-concatenate", COMPARISON_RELATION.similarity, "adjoin-iuhqui-to-larger-concatenate", ["similarityClause", "headClause"], "IUHQUI_CONCATENATE+HEAD_CONCATENATE", ["position", "sentenceType"], ["iuhqui", "larger-concatenate", "clause-rank"]),
      route("equality-iuhqui", COMPARISON_RELATION.equality, "compose-quality-equality-iuhqui", ["comparand", "standard"], "COMPARAND+iuhqui+in+STANDARD+(ic)+DIMENSION", ["icRelation", "sentenceType"], ["equality", "quality", "manner", "iuhqui"]),
      route("equality-ihuan", COMPARISON_RELATION.equality, "compose-quality-equality-ihuan", ["comparand", "standard"], "COMPARAND+īhuān+in+STANDARD+(ic)+DIMENSION", ["icRelation", "sentenceType"], ["equality", "quality", "manner", "relational-nnc"]),
      route("size-ixquich", COMPARISON_RELATION.size, "compose-ixquich-size-nnc", ["standard"], "COMPARAND+DEGREE+ixquich+(in)+STANDARD", ["degreeMarker", "adjunctorIn", "sentenceType"], ["size", "ixquich", "quantitive-pronominal"]),
      route("size-quezqui-no-izqui", COMPARISON_RELATION.size, "compose-quezqui-no-izqui-correlative", ["leftClause", "rightClause"], "in+quēzquipa+LEFT+no+izquipa+RIGHT", ["sentenceType"], ["size", "quantity", "correlative"]),
      route("size-more-more-correlative", COMPARISON_RELATION.size, "compose-more-more-correlative", ["leftClause", "rightClause"], "in+īc+cencah+LEFT+oc+cencah+RIGHT", ["sentenceType"], ["proportional", "more-more", "correlative"]),
      route("comparative-adversative", COMPARISON_RELATION.comparativeDegree, "compose-two-affirmative-adversative-comparison", ["baseClause", "superiorClause"], "AFFIRMATIVE+ADVERSATIVE+DEGREE+AFFIRMATIVE", ["adversativeMarker", "degreeMarker", "sentenceType"], ["inequality", "two-conjunct", "adversative", "affirmative"]),
      route("comparative-negative-adverbial", COMPARISON_RELATION.comparativeDegree, "compose-affirmative-negative-adverbial-comparison", ["principal", "standard"], "TOPIC+DEGREE+PRINCIPAL+NEGATIVE_INTRODUCER+STANDARD", ["degreeMarker", "negativeIntroducer", "sentenceType"], ["inequality", "affirmative-negative", "adverbial-collocation"]),
      route("comparative-tachcauh-hualcah", COMPARISON_RELATION.comparativeDegree, "compose-principal-nnc-ic-comparison", ["point", "standard"], "TOPIC+COPULA+DEGREE+PRINCIPAL_NNC+(in)+īc+POINT+NEGATIVE_INTRODUCER+STANDARD", ["principalNnc", "degreeMarker", "negativeIntroducer", "copula", "adjunctorIn", "sentenceType"], ["inequality", "principal-nnc", "ic-adjunct", "topic"]),
      route("comparative-panahuia-unspecified", COMPARISON_RELATION.comparativeDegree, "compose-unspecified-object-panahuia-comparison", ["principal", "point"], "TOPIC+DEGREE+PANAHUIA_UNSPECIFIED+(in)+īc+POINT+NEGATIVE_STANDARD", ["degreeMarker", "negativeIntroducer", "adjunctorIn", "sentenceType"], ["inequality", "applicative", "unspecified-object", "ic-adjunct"]),
      route("comparative-panahuia-specified", COMPARISON_RELATION.comparativeDegree, "compose-specified-object-panahuia-comparison", ["principal", "point"], "COMPARAND+DEGREE+PANAHUIA_SPECIFIED+STANDARD+(in)+īc+POINT", ["degreeMarker", "adjunctorIn", "sentenceType"], ["inequality", "applicative", "specified-object", "ic-adjunct"]),
      route("question-how-much-more", COMPARISON_RELATION.comparisonQuestion, "insert-quen-before-comparative-collocation", ["baseClause", "degreeClause"], "BASE+quēn+COMPARATIVE_COLLOCATION+DEGREE_CLAUSE", ["questionCollocation", "sentenceType"], ["question", "how-much-more", "comparative-collocation"]),
      route("superlative-adverbial", COMPARISON_RELATION.superlativeDegree, "compose-superlative-adverbial", ["topic", "predicate"], "TOPIC+(ca)+SUPERLATIVE_ADVERBIAL+PREDICATE", ["superlativeAdverbial", "copula", "sentenceType"], ["superlative", "negative-contrast-deletion", "adverbial"]),
      route("superlative-incorporated", COMPARISON_RELATION.superlativeDegree, "compose-superlative-incorporated-adverb", ["topic", "predicate"], "TOPIC+INCORPORATED_SUPERLATIVE+PREDICATE", ["incorporatedSuperlative", "sentenceType"], ["superlative", "incorporation"]),
      route("superlative-principal-ic", COMPARISON_RELATION.superlativeDegree, "compose-superlative-principal-with-ic", ["topic", "predicate"], "TOPIC+SUPERLATIVE_PRINCIPAL+(in)+īc+PREDICATE", ["superlativePrincipal", "adjunctorIn", "sentenceType"], ["superlative", "principal-nnc-or-vnc", "ic-adjunct", "honorific"])
    ]);
    const ROUTES_BY_ID = new Map(COMPARISON_ROUTE_INVENTORY.map(entry => [entry.id, entry]));
    const ANY_CLAUSE_SOURCE_KINDS = freeze(["nnc", "vnc", "composition"]);
    const ROUTE_SLOT_SOURCE_KINDS = freeze({
      "similarity-reduplicative-prefix": {
        source: ["nnc"]
      },
      "similarity-downgraded-possessive-tla": {
        source: ["nnc"]
      },
      "similarity-tloc-relational-nnc": {
        comparand: ["nnc"],
        standard: ["nnc"]
      },
      "similarity-same-as-pronominal": {
        comparand: ANY_CLAUSE_SOURCE_KINDS,
        standard: ANY_CLAUSE_SOURCE_KINDS
      },
      "similarity-incorporated-nehnequi": {
        source: ["nnc"],
        comparand: ANY_CLAUSE_SOURCE_KINDS
      },
      "similarity-resemblance-verbstem-nnc": {
        principal: ["nnc"],
        standard: ["nnc"]
      },
      "similarity-ihui-vnc": {
        topic: ANY_CLAUSE_SOURCE_KINDS,
        principal: ["vnc"]
      },
      "similarity-iuhqui-principal": {
        topic: ANY_CLAUSE_SOURCE_KINDS,
        adjoined: ANY_CLAUSE_SOURCE_KINDS,
        dimension: ANY_CLAUSE_SOURCE_KINDS
      },
      "similarity-iuhqui-larger-concatenate": {
        similarityClause: ["composition"],
        headClause: ["composition"]
      },
      "equality-iuhqui": {
        comparand: ANY_CLAUSE_SOURCE_KINDS,
        standard: ANY_CLAUSE_SOURCE_KINDS,
        dimension: ANY_CLAUSE_SOURCE_KINDS
      },
      "equality-ihuan": {
        comparand: ANY_CLAUSE_SOURCE_KINDS,
        standard: ANY_CLAUSE_SOURCE_KINDS,
        dimension: ANY_CLAUSE_SOURCE_KINDS
      },
      "size-ixquich": {
        comparand: ANY_CLAUSE_SOURCE_KINDS,
        standard: ["nnc"]
      },
      "size-quezqui-no-izqui": {
        leftClause: ANY_CLAUSE_SOURCE_KINDS,
        rightClause: ANY_CLAUSE_SOURCE_KINDS
      },
      "size-more-more-correlative": {
        leftClause: ANY_CLAUSE_SOURCE_KINDS,
        rightClause: ANY_CLAUSE_SOURCE_KINDS
      },
      "comparative-adversative": {
        baseClause: ANY_CLAUSE_SOURCE_KINDS,
        superiorClause: ANY_CLAUSE_SOURCE_KINDS
      },
      "comparative-negative-adverbial": {
        topic: ANY_CLAUSE_SOURCE_KINDS,
        principal: ANY_CLAUSE_SOURCE_KINDS,
        standard: ANY_CLAUSE_SOURCE_KINDS
      },
      "comparative-tachcauh-hualcah": {
        topic: ANY_CLAUSE_SOURCE_KINDS,
        point: ANY_CLAUSE_SOURCE_KINDS,
        standard: ANY_CLAUSE_SOURCE_KINDS
      },
      "comparative-panahuia-unspecified": {
        topic: ANY_CLAUSE_SOURCE_KINDS,
        principal: ["vnc"],
        point: ANY_CLAUSE_SOURCE_KINDS,
        standard: ANY_CLAUSE_SOURCE_KINDS
      },
      "comparative-panahuia-specified": {
        comparand: ANY_CLAUSE_SOURCE_KINDS,
        principal: ["vnc"],
        standard: ANY_CLAUSE_SOURCE_KINDS,
        point: ANY_CLAUSE_SOURCE_KINDS
      },
      "question-how-much-more": {
        baseClause: ANY_CLAUSE_SOURCE_KINDS,
        degreeClause: ANY_CLAUSE_SOURCE_KINDS
      },
      "superlative-adverbial": {
        topic: ANY_CLAUSE_SOURCE_KINDS,
        predicate: ["nnc", "vnc"]
      },
      "superlative-incorporated": {
        topic: ANY_CLAUSE_SOURCE_KINDS,
        predicate: ["nnc", "vnc"]
      },
      "superlative-principal-ic": {
        topic: ANY_CLAUSE_SOURCE_KINDS,
        predicate: ["nnc", "vnc"]
      }
    });

    const COMPARISON_LCM_AXES = freeze([
      "relation",
      "semantic-route",
      "word-or-clause-output",
      "comparand",
      "standard",
      "dimension-or-point",
      "principal-versus-adjoined-rank",
      "topic-placement",
      "reduplicative-continuation",
      "possessive-state-downgrading",
      "relational-nnc",
      "nonpreposed-same-as-marker",
      "incorporated-complement",
      "ihui-versus-iuhqui",
      "impersonal-subject",
      "in-adjunctor",
      "ic-relation",
      "equality-marker",
      "size-strategy",
      "correlative-strategy",
      "two-conjunct-restriction",
      "adversative-marker",
      "comparative-degree-marker",
      "negative-standard-introducer",
      "principal-comparison-nnc",
      "panahuia-object-specificity",
      "question-collocation",
      "superlative-strategy",
      "negative-contrast-deletion",
      "honorific-source-profile",
      "sentence-type"
    ]);

    function normalizeComparisonEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = key(value);
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeComparisonRelation(value = "") {
      return normalizeComparisonEnum(value, Object.values(COMPARISON_RELATION), COMPARISON_RELATION.unknown);
    }
    function normalizeComparisonFalsePositiveSource(value = "") {
      return normalizeComparisonEnum(value, Object.values(COMPARISON_FALSE_POSITIVE_SOURCE), COMPARISON_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getComparisonAntiConflationRules() {
      return Array.from(COMPARISON_ANTI_CONFLATION_RULES);
    }
    function getComparisonStructuralQuestions() {
      return clone(COMPARISON_STRUCTURAL_QUESTIONS);
    }
    function getClassicalComparisonRouteInventory() {
      return clone(COMPARISON_ROUTE_INVENTORY);
    }
    function getClassicalComparisonLcmInventory() {
      return {
        kind: "classical-nahuatl-comparison-lcm-inventory",
        version: COMPARISON_BOUNDARY_VERSION,
        gcdId: GCD_ID,
        routeIds: COMPARISON_ROUTE_INVENTORY.map(entry => entry.id),
        relations: Object.values(COMPARISON_RELATION).filter(value => value !== COMPARISON_RELATION.unknown),
        axes: Array.from(COMPARISON_LCM_AXES),
        routeCount: COMPARISON_ROUTE_INVENTORY.length,
        axisCount: COMPARISON_LCM_AXES.length,
        licensedDistinctionsComplete: true,
        lessonMetadataAuthority: false,
        evidenceAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
    }
    function buildClassicalComparisonGcdFrame() {
      return freeze({
        kind: "classical-nahuatl-comparison-gcd-frame",
        version: COMPARISON_BOUNDARY_VERSION,
        gcdId: GCD_ID,
        invariant: "One engine-issued typed source set plus one licensed semantic route produces one typed comparison operation, one AST, and one canonical selected result.",
        orderedStages: ["typed-source", "licensed-route", "typed-operation", "comparison-ast", "canonical-result"],
        scalarEvaluatorIdentity: "evaluateClassicalNahuatlComparison",
        batchEvaluatorIdentity: "evaluateClassicalNahuatlComparisonBatch",
        batchEqualsScalar: true,
        routeSelectedByLessonMetadata: false,
        routeSelectedByEvidence: false,
        routeSelectedByFormulaString: false,
        routeSelectedBySurfaceString: false,
        callerSuppliedResultAuthorityAccepted: false
      });
    }

    function attachComparisonGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") return record;
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "comparison-clause-unit",
        routeFamily: "comparison",
        ...options
      }, grammarFrameOwnerCapability);
    }

    const CALLER_SOURCE_FACT_KEYS = freeze([
      "surface",
      "formula",
      "stem",
      "absolutiveSuffix",
      "lexeme",
      "objectSpecificity",
      "honorific",
      "grammaticalRole",
      "number",
      "person",
      "unitKind"
    ]);

    function getComparisonGrammarFrame(value = null) {
      if (!value || typeof value !== "object") return null;
      return [
        value.grammarFrame,
        value.frames,
        value.output?.grammarFrame,
        value.output?.frames
      ].find(frame => frame && typeof frame === "object") || null;
    }
    function getComparisonResultFrame(value = null) {
      const grammarFrame = getComparisonGrammarFrame(value);
      return grammarFrame?.resultFrame
        || value?.resultFrame
        || value?.output?.resultFrame
        || null;
    }
    function getComparisonNncSlotFrame(value = null) {
      const resultFrame = getComparisonResultFrame(value);
      return value?.typedSlotFrame
        || value?.nncSlotFrame
        || value?.sourceNncSlotFrame
        || value?.sourceFrame?.typedSlotFrame
        || value?.sourceFrame?.nncSlotFrame
        || resultFrame?.typedSlotFrame
        || resultFrame?.nncSlotFrame
        || resultFrame?.sourceNncSlotFrame
        || resultFrame?.selectedNncSlotFrame
        || null;
    }
    function getComparisonVncSlotFrame(value = null) {
      const resultFrame = getComparisonResultFrame(value);
      return value?.finalTypedVncSlotFrame
        || value?.targetTypedVncSlotFrame
        || value?.typedSlotFrame
        || value?.resultFrame?.finalTypedVncSlotFrame
        || value?.resultFrame?.targetTypedVncSlotFrame
        || value?.resultFrame?.finiteSurfaceFrame?.typedFrame
        || value?.finiteSurfaceFrame?.typedFrame
        || value?.proofFrame?.conclusion?.finalTypedVncSlotFrame
        || value?.proofFrame?.conclusion?.finalBoundaryRealizationFrame
          ?.typedSlotFrame
        || resultFrame?.finalTypedVncSlotFrame
        || resultFrame?.targetTypedVncSlotFrame
        || resultFrame?.finiteSurfaceFrame?.typedFrame
        || null;
    }
    function getComparisonCanonicalFormula(ownerIssuedResult = null) {
      const nncSlotFrame = getComparisonNncSlotFrame(ownerIssuedResult);
      if (
        nncSlotFrame
        && typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
        && targetObject.isClassicalNahuatlNncSlotFrame(nncSlotFrame)
        && typeof targetObject.renderClassicalNahuatlNncSlotFrameFormula
          === "function"
      ) {
        return text(
          targetObject.renderClassicalNahuatlNncSlotFrameFormula(
            nncSlotFrame
          )
        );
      }
      const vncSlotFrame = getComparisonVncSlotFrame(ownerIssuedResult);
      if (
        vncSlotFrame
        && typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
        && targetObject.isClassicalNahuatlVncSlotFrame(vncSlotFrame)
        && typeof targetObject.renderClassicalNahuatlVncSlotFrameFormula
          === "function"
      ) {
        return text(
          targetObject.renderClassicalNahuatlVncSlotFrameFormula(
            vncSlotFrame
          )
        );
      }
      const resultFrame = getComparisonResultFrame(ownerIssuedResult);
      return text([
        resultFrame?.formulaRecord?.formula,
        resultFrame?.formulaRealization,
        resultFrame?.formula,
        ownerIssuedResult?.formulaRecord?.formula,
        ownerIssuedResult?.formulaRealization,
        ownerIssuedResult?.selectedFormula,
        ownerIssuedResult?.baseNncFormula,
        ownerIssuedResult?.formula,
        ownerIssuedResult?.proofFrame?.conclusion?.formulaRealization
      ].find(value => typeof value === "string" && value.trim()) || "");
    }
    function getComparisonCanonicalStem(ownerIssuedResult = null) {
      const nncSlotFrame = getComparisonNncSlotFrame(ownerIssuedResult);
      const vncSlotFrame = getComparisonVncSlotFrame(ownerIssuedResult);
      return text(
        nncSlotFrame?.slots?.predicate?.stem
        || vncSlotFrame?.slots?.predicate?.stem
        || ownerIssuedResult?.sourceFrame?.stem
        || ownerIssuedResult?.targetStem
        || ownerIssuedResult?.sourceVerbstem
        || ownerIssuedResult?.stem
        || ""
      );
    }
    function getComparisonCanonicalAbsolutiveSuffix(
      ownerIssuedResult = null
    ) {
      const nncSlotFrame = getComparisonNncSlotFrame(ownerIssuedResult);
      const num1 = text(nncSlotFrame?.slots?.number?.num1);
      if (["tl", "tli", "li"].includes(num1)) return num1;
      // A possessive-state Result has a zero subject-number carrier, but its
      // owner-issued lexical Source still determines the absolutive
      // continuation required by the downgraded quasi-noun comparison route.
      // The caller cannot provide this fact: it is projected only from the
      // captured canonical ordinary-NNC Source frame.
      const canonicalSourceFrame = ownerIssuedResult?.sourceFrame
        || ownerIssuedResult?.operationFrame?.sourceFrame
        || ownerIssuedResult?.resultFrame?.sourceFrame
        || null;
      const nounClass = key(canonicalSourceFrame?.nounClass || "");
      return ["tl", "tli", "li", "in"].includes(nounClass)
        ? nounClass
        : "";
    }
    function getComparisonFormulaConstituents(
      ownerIssuedResult = null
    ) {
      const nncSlotFrame = getComparisonNncSlotFrame(ownerIssuedResult);
      if (
        nncSlotFrame
        && typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
        && targetObject.isClassicalNahuatlNncSlotFrame(nncSlotFrame)
      ) {
        return freeze({
          unitKind: "nnc",
          pers1: text(nncSlotFrame.slots?.subject?.pers1),
          pers2: text(nncSlotFrame.slots?.subject?.pers2),
          participantCarriers: Array.from(
            nncSlotFrame.slots?.participant?.slots || []
          ).map(slot => text(slot?.carrier)).filter(Boolean),
          stateCarriers: Array.from(
            nncSlotFrame.slots?.state?.slots || []
          ).map(slot => text(slot?.carrier)).filter(Boolean),
          stem: text(nncSlotFrame.slots?.predicate?.stem),
          num1: text(nncSlotFrame.slots?.number?.num1),
          num2: text(nncSlotFrame.slots?.number?.num2)
        });
      }
      const vncSlotFrame = getComparisonVncSlotFrame(ownerIssuedResult);
      if (
        vncSlotFrame
        && typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
        && targetObject.isClassicalNahuatlVncSlotFrame(vncSlotFrame)
      ) {
        return freeze({
          unitKind: "vnc",
          pers1: text(vncSlotFrame.slots?.subject?.pers1),
          pers2: text(vncSlotFrame.slots?.subject?.pers2),
          prePredicateCarriers: Array.from(
            vncSlotFrame.slots?.prePredicate || []
          ).map(slot => text(slot?.carrier)).filter(Boolean),
          stem: text(vncSlotFrame.slots?.predicate?.stem),
          tense: text(vncSlotFrame.slots?.predicate?.tns),
          num1: text(vncSlotFrame.slots?.number?.num1),
          num2: text(vncSlotFrame.slots?.number?.num2)
        });
      }
      return null;
    }
    function getComparisonCanonicalSubject(ownerIssuedResult = null) {
      const nncSlotFrame = getComparisonNncSlotFrame(ownerIssuedResult);
      const vncSlotFrame = getComparisonVncSlotFrame(ownerIssuedResult);
      return key(
        nncSlotFrame?.slots?.subject?.subject
        || vncSlotFrame?.slots?.subject?.subject
        || ownerIssuedResult?.normalizedRequest?.subject
        || ownerIssuedResult?.subject
        || ""
      );
    }
    function getComparisonCanonicalValence(ownerIssuedResult = null) {
      const vncSlotFrame = getComparisonVncSlotFrame(ownerIssuedResult);
      return key(
        ownerIssuedResult?.normalizedRequest?.sourceValence
        || ownerIssuedResult?.normalizedRequest?.valence
        || ownerIssuedResult?.classTargetValence
        || ownerIssuedResult?.sourceValence
        || ownerIssuedResult?.valence
        || vncSlotFrame?.valence
        || vncSlotFrame?.sourceValence
        || ""
      );
    }
    function normalizeComparisonLexeme(value = "") {
      return text(value)
        .normalize("NFD")
        .replace(/\p{M}+/gu, "")
        .toLowerCase()
        .replace(/[^a-z]/gu, "");
    }
    function buildBlockedComparisonSourceUnit(blockReason = "") {
      const frame = freeze({
        kind: SOURCE_FRAME_KIND,
        version: COMPARISON_BOUNDARY_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        unitKind: "",
        baseUnitKind: "",
        surface: "",
        formula: "",
        formulaConstituents: null,
        stem: "",
        sourceIdentityStem: "",
        absolutiveSuffix: "",
        grammaticalRole: "",
        lexeme: "",
        lexicalFormation: "",
        lexicalBoundaryFacts: freeze({}),
        objectSpecificity: "",
        honorific: false,
        number: "",
        person: "",
        ownerIssuedSource: false,
        callerSuppliedSurfaceAccepted: false,
        callerSuppliedFormulaAccepted: false,
        sourceAuthority: true,
        grammarAuthority: false,
        routeAuthority: false,
        resultAuthority: false
      });
      issuedSourceFrames.add(frame);
      return frame;
    }
    function buildClassicalComparisonSourceUnit(request = {}) {
      const sourceRequest = request && typeof request === "object"
        && !Array.isArray(request)
        ? request
        : {};
      if (Object.prototype.hasOwnProperty.call(
        sourceRequest,
        "typedSourceFrame"
      )) {
        return buildBlockedComparisonSourceUnit(
          "comparison-caller-supplied-typed-source-frame-is-not-authority"
        );
      }
      if (CALLER_SOURCE_FACT_KEYS.some(field => (
        Object.prototype.hasOwnProperty.call(sourceRequest, field)
      ))) {
        return buildBlockedComparisonSourceUnit(
          "comparison-caller-supplied-source-facts-are-not-authority"
        );
      }
      if (
        typeof targetObject.captureClassicalGrammarApplicationResult
          !== "function"
        || typeof targetObject.isClassicalGrammarApplicationResultCapture
          !== "function"
        || typeof targetObject.getCanonicalAdverbialAdjunctionSourceUnit
          !== "function"
      ) {
        return buildBlockedComparisonSourceUnit(
          "comparison-grammar-application-source-capture-capability-required"
        );
      }
      const canonicalInput = sourceRequest.sourceResult
        || sourceRequest.canonicalResult
        || null;
      const capture = targetObject.captureClassicalGrammarApplicationResult(
        canonicalInput,
        "comparison-source"
      );
      if (
        !targetObject.isClassicalGrammarApplicationResultCapture(
          capture,
          "comparison-source"
        )
      ) {
        return buildBlockedComparisonSourceUnit(
          "comparison-owner-issued-canonical-result-required"
        );
      }
      const canonicalResult = capture.canonicalResult;
      const sourceUnit =
        targetObject.getCanonicalAdverbialAdjunctionSourceUnit(
          canonicalResult,
          "comparison-source"
        );
      if (!sourceUnit?.ok) {
        return buildBlockedComparisonSourceUnit(
          "comparison-canonical-clause-source-unit-required"
        );
      }
      const nncSlotFrame = getComparisonNncSlotFrame(canonicalResult);
      const vncSlotFrame = getComparisonVncSlotFrame(canonicalResult);
      const compositionResultAuthorized = Boolean(
        (
          typeof targetObject
            .isClassicalNahuatlClauseComplementationResultFrame === "function"
          && targetObject.isClassicalNahuatlClauseComplementationResultFrame(
            canonicalResult
          )
        )
        || (
          typeof targetObject
            .isClassicalNahuatlClauseConjunctionResultFrame === "function"
          && targetObject.isClassicalNahuatlClauseConjunctionResultFrame(
            canonicalResult
          )
        )
      );
      const baseUnitKind = (
        typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
        && targetObject.isClassicalNahuatlNncSlotFrame(nncSlotFrame)
      )
        ? "nnc"
        : (
          typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
          && targetObject.isClassicalNahuatlVncSlotFrame(vncSlotFrame)
        )
          ? "vnc"
          : compositionResultAuthorized
            ? "composition"
            : "";
      if (!baseUnitKind) {
        return buildBlockedComparisonSourceUnit(
          "comparison-owner-issued-source-structure-required"
        );
      }
      const normalizedKind = baseUnitKind;
      const normalizedSurface = text(sourceUnit.surface);
      const normalizedFormula = getComparisonCanonicalFormula(canonicalResult);
      if (!normalizedSurface || !normalizedFormula) {
        return buildBlockedComparisonSourceUnit(
          "comparison-owner-source-formula-and-written-projections-required"
        );
      }
      const normalizedStem = getComparisonCanonicalStem(canonicalResult);
      const normalizedSuffix =
        getComparisonCanonicalAbsolutiveSuffix(canonicalResult);
      const canonicalLexicalSourceFrame =
        canonicalResult?.sourceFrame
        || canonicalResult?.operationFrame?.sourceFrame
        || canonicalResult?.resultFrame?.sourceFrame
        || null;
      const sourceIdentityStem = text(
        canonicalLexicalSourceFrame?.stem || normalizedStem
      );
      const lexicalFormation = text(
        canonicalLexicalSourceFrame?.lexicalFormation || ""
      );
      const lexicalBoundaryFacts = freeze({
        ...(canonicalLexicalSourceFrame?.boundaryFacts || {})
      });
      const formulaConstituents = getComparisonFormulaConstituents(
        canonicalResult
      );
      const subject = getComparisonCanonicalSubject(canonicalResult);
      const valence = getComparisonCanonicalValence(canonicalResult);
      const objectSpecificity = /(?:^|-)specific(?:-|$)/u.test(valence)
        && !/(?:^|-)non|unspecific|projective-non/u.test(valence)
        ? "specified"
        : /projective|unspecific|nonspecific/u.test(valence)
          ? "unspecified"
          : "";
      const lexeme = normalizeComparisonLexeme(normalizedStem);
      const frame = freeze({
        kind: SOURCE_FRAME_KIND,
        version: COMPARISON_BOUNDARY_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        unitKind: normalizedKind,
        baseUnitKind,
        surface: normalizedSurface,
        formula: normalizedFormula,
        formulaConstituents,
        stem: normalizedStem,
        sourceIdentityStem,
        absolutiveSuffix: normalizedSuffix,
        grammaticalRole: "",
        lexeme,
        lexicalFormation,
        lexicalBoundaryFacts,
        objectSpecificity,
        honorific: lexicalBoundaryFacts.honorific === true
          || /tzin|tzino|mahcitzino/u.test(lexeme),
        number: subject.endsWith("pl") ? "plural" : subject ? "singular" : "",
        person: subject,
        ownerOperationId: capture.operationId,
        ownerOutputKind: capture.outputKind,
        ownerSourceKind: sourceUnit.sourceKind,
        ownerIssuedSource: true,
        callerSuppliedSurfaceAccepted: false,
        callerSuppliedFormulaAccepted: false,
        sourceAuthority: true,
        grammarAuthority: false,
        routeAuthority: false,
        resultAuthority: false
      });
      issuedSourceFrames.add(frame);
      return frame;
    }
    function isClassicalComparisonSourceUnit(frame = null) {
      return Boolean(
        frame
        && issuedSourceFrames.has(frame)
        && frame.kind === SOURCE_FRAME_KIND
        && frame.version === COMPARISON_BOUNDARY_VERSION
        && ["authorized", "blocked"].includes(frame.authorizationStatus)
        && (
          frame.authorizationStatus === "blocked"
          || (
            frame.ownerIssuedSource === true
            && frame.callerSuppliedSurfaceAccepted === false
            && frame.callerSuppliedFormulaAccepted === false
            && Boolean(frame.surface)
            && Boolean(frame.formula)
          )
        )
        && frame.grammarAuthority === false
        && frame.routeAuthority === false
        && frame.resultAuthority === false
      );
    }

    function normalizeRequestSlots(slots = {}) {
      return Object.fromEntries(Object.entries(slots || {}).filter(([, value]) => value !== undefined && value !== null));
    }
    function normalizeChoice(request, field, inventory, fallback = "") {
      const value = key(request?.choices?.[field] ?? request?.[field] ?? fallback);
      if (!Object.prototype.hasOwnProperty.call(inventory, value)) {
        return { ok: false, id: value, surface: "", diagnostic: `comparison-${field}-choice-not-recognized` };
      }
      return { ok: true, id: value, surface: inventory[value], diagnostic: "" };
    }
    function normalizeBooleanChoice(request, field, fallback = false) {
      const value = request?.choices?.[field] ?? request?.[field];
      return value === undefined ? fallback : value === true;
    }
    function normalizeSentenceType(request = {}) {
      const value = key(request?.choices?.sentenceType ?? request?.sentenceType ?? "none");
      return SENTENCE_TYPES.includes(value) ? value : "invalid";
    }
    function buildBlockedOperationFrame(request = {}, routeSpec = null, diagnostics = []) {
      const frame = freeze({
        kind: OPERATION_FRAME_KIND,
        version: COMPARISON_BOUNDARY_VERSION,
        gcdId: GCD_ID,
        authorizationStatus: "blocked",
        blockReason: diagnostics[0] || "comparison-operation-blocked",
        routeId: routeSpec?.id || key(request.routeId),
        relation: routeSpec?.relation || normalizeComparisonRelation(request.relation),
        operation: routeSpec?.operation || "",
        requiredSlots: Array.from(routeSpec?.requiredSlots || []),
        sourceSlots: {},
        choices: {},
        formulaTemplate: routeSpec?.formulaTemplate || "",
        diagnostics: Array.from(new Set(diagnostics.filter(Boolean))),
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        evidenceAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false
      });
      issuedOperationFrames.add(frame);
      return frame;
    }
    function buildClassicalComparisonOperationFrame(request = {}) {
      const operationRequest = request && typeof request === "object"
        && !Array.isArray(request)
        ? request
        : null;
      if (!operationRequest) {
        return buildBlockedOperationFrame({}, null, [
          "comparison-typed-operation-request-required"
        ]);
      }
      const forbiddenAuthorityKey =
        FORBIDDEN_COMPARISON_AUTHORITY_KEYS.find(field => (
          Object.prototype.hasOwnProperty.call(operationRequest, field)
        ));
      if (forbiddenAuthorityKey) {
        return buildBlockedOperationFrame(operationRequest, null, [
          `comparison-forbidden-authority:${forbiddenAuthorityKey}`
        ]);
      }
      const routeId = key(operationRequest.routeId);
      const routeSpec = ROUTES_BY_ID.get(routeId);
      if (!routeSpec) {
        return buildBlockedOperationFrame(
          operationRequest,
          null,
          ["comparison-route-not-recognized"]
        );
      }
      const requestedRelation = operationRequest.relation
        ? normalizeComparisonRelation(operationRequest.relation)
        : routeSpec.relation;
      const slots = normalizeRequestSlots(operationRequest.slots);
      const diagnostics = [];
      const slotContracts = ROUTE_SLOT_SOURCE_KINDS[routeId] || {};
      if (requestedRelation !== routeSpec.relation) diagnostics.push("comparison-route-relation-contradiction");
      routeSpec.requiredSlots.forEach(slotId => {
        const frame = slots[slotId];
        if (!isClassicalComparisonSourceUnit(frame) || frame.authorizationStatus !== "authorized") {
          diagnostics.push(`comparison-${slotId}-typed-source-required`);
        }
      });
      Object.entries(slots).forEach(([slotId, frame]) => {
        if (!Object.hasOwn(slotContracts, slotId)) {
          diagnostics.push(`comparison-${slotId}-slot-not-licensed-for-route`);
          return;
        }
        if (!isClassicalComparisonSourceUnit(frame) || frame.authorizationStatus !== "authorized") {
          diagnostics.push(`comparison-${slotId}-typed-source-invalid`);
        } else if (!slotContracts[slotId].includes(frame.baseUnitKind)) {
          diagnostics.push(
            `comparison-${slotId}-source-kind-not-licensed-for-route`
          );
        }
      });
      const sentenceType = normalizeSentenceType(operationRequest);
      if (sentenceType === "invalid") diagnostics.push("comparison-sentence-type-not-recognized");

      const choices = { sentenceType };
      const addChoice = (field, inventory, fallback) => {
        const choice = normalizeChoice(
          operationRequest,
          field,
          inventory,
          fallback
        );
        if (!choice.ok) diagnostics.push(choice.diagnostic);
        choices[field] = choice;
      };
      if (routeSpec.choiceFields.includes("sameAsMarker")) addChoice("sameAsMarker", SAME_AS_MARKERS, "zan-no-yehhuatl");
      if (routeSpec.choiceFields.includes("negativeIntroducer")) addChoice("negativeIntroducer", NEGATIVE_STANDARD_INTRODUCERS, "in-ahmo-iuhqui");
      if (routeSpec.choiceFields.includes("degreeMarker")) {
        const degreeInventory = ["similarity-tloc-relational-nnc", "similarity-incorporated-nehnequi"].includes(routeId)
          ? SIMILARITY_DEGREE_MARKERS
          : routeId === "size-ixquich"
            ? SIZE_DEGREE_MARKERS
            : routeId === "comparative-tachcauh-hualcah"
              ? TACHCAUH_DEGREE_MARKERS
              : routeId.startsWith("comparative-panahuia")
                ? PANAHUIA_DEGREE_MARKERS
                : COMPARATIVE_DEGREE_MARKERS;
        addChoice("degreeMarker", degreeInventory, degreeInventory.none !== undefined ? "none" : Object.keys(degreeInventory)[0]);
      }
      if (routeSpec.choiceFields.includes("adversativeMarker")) addChoice("adversativeMarker", ADVERSATIVE_MARKERS, "yeceh");
      if (routeSpec.choiceFields.includes("questionCollocation")) addChoice("questionCollocation", QUESTION_COLLOCATIONS, "oc-yeh");
      if (routeSpec.choiceFields.includes("superlativeAdverbial")) addChoice("superlativeAdverbial", SUPERLATIVE_ADVERBIALS, "cencah");
      if (routeSpec.choiceFields.includes("incorporatedSuperlative")) addChoice("incorporatedSuperlative", SUPERLATIVE_INCORPORATED, "cem");
      if (routeSpec.choiceFields.includes("superlativePrincipal")) addChoice("superlativePrincipal", SUPERLATIVE_PRINCIPALS, "ahcic");
      if (routeSpec.choiceFields.includes("iuhquiModifier")) addChoice("iuhquiModifier", IUHQUI_MODIFIERS, "none");
      if (routeSpec.choiceFields.includes("principalNnc")) addChoice("principalNnc", PRINCIPAL_COMPARISON_NNCS, "tachcauh");
      if (routeSpec.choiceFields.includes("continuationFamily")) addChoice("continuationFamily", REDUPLICATIVE_CONTINUATIONS, "bare");
      if (routeSpec.choiceFields.includes("adjunctorIn")) choices.adjunctorIn = normalizeBooleanChoice(operationRequest, "adjunctorIn", true);
      if (routeSpec.choiceFields.includes("icRelation")) choices.icRelation = normalizeBooleanChoice(operationRequest, "icRelation", Boolean(slots.dimension));
      if (routeSpec.choiceFields.includes("copula")) choices.copula = normalizeBooleanChoice(operationRequest, "copula", false);
      if (routeSpec.choiceFields.includes("position")) {
        const position = key(
          operationRequest.choices?.position
          ?? operationRequest.position
          ?? "preposed"
        );
        if (!["preposed", "postposed"].includes(position)) diagnostics.push("comparison-position-choice-not-recognized");
        choices.position = position;
      }
      if (routeId === "similarity-downgraded-possessive-tla"
        && (!text(slots.source?.stem) || !text(slots.source?.absolutiveSuffix))) {
        diagnostics.push("comparison-possessive-nounstem-and-absolutive-required");
      }
      if (routeId === "similarity-reduplicative-prefix" && !text(slots.source?.stem)) {
        diagnostics.push("comparison-reduplicative-source-stem-required");
      }
      if (routeId === "similarity-incorporated-nehnequi" && !text(slots.source?.stem)) {
        diagnostics.push("comparison-incorporated-source-stem-required");
      }
      if (
        routeId === "similarity-resemblance-verbstem-nnc"
        && slots.principal?.lexicalFormation
          !== "verbstem-resemblance-predicate-nnc"
      ) {
        diagnostics.push(
          "comparison-resemblance-verbstem-nnc-source-required"
        );
      }
      if (
        routeId === "similarity-ihui-vnc"
        && slots.principal?.lexeme !== "ihui"
      ) {
        diagnostics.push("comparison-ihui-vnc-source-required");
      }
      if (routeId === "comparative-panahuia-unspecified"
        && slots.principal?.objectSpecificity !== "unspecified") {
        diagnostics.push("comparison-panahuia-unspecified-object-frame-required");
      }
      if (routeId === "comparative-panahuia-specified"
        && slots.principal?.objectSpecificity !== "specified") {
        diagnostics.push("comparison-panahuia-specified-object-frame-required");
      }
      if (routeId.startsWith("comparative-panahuia")
        && !["panahuia", "cempanahuia"].includes(
          slots.principal?.lexeme
        )) {
        diagnostics.push("comparison-panahuia-lexeme-frame-required");
      }
      if (diagnostics.length) {
        return buildBlockedOperationFrame(
          operationRequest,
          routeSpec,
          diagnostics
        );
      }

      const frame = freeze({
        kind: OPERATION_FRAME_KIND,
        version: COMPARISON_BOUNDARY_VERSION,
        gcdId: GCD_ID,
        authorizationStatus: "authorized",
        blockReason: "",
        routeId,
        relation: routeSpec.relation,
        operation: routeSpec.operation,
        requiredSlots: Array.from(routeSpec.requiredSlots),
        sourceSlots: slots,
        sourceSlotRoles: Object.freeze(Object.fromEntries(
          Object.keys(slots).map(slotId => [slotId, slotId])
        )),
        choices,
        formulaTemplate: routeSpec.formulaTemplate,
        axes: Array.from(routeSpec.axes),
        diagnostics: ["comparison-typed-operation-authorized"],
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        evidenceAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false
      });
      issuedOperationFrames.add(frame);
      return frame;
    }
    function isClassicalComparisonOperationFrame(frame = null) {
      return Boolean(
        frame
        && issuedOperationFrames.has(frame)
        && frame.kind === OPERATION_FRAME_KIND
        && frame.version === COMPARISON_BOUNDARY_VERSION
        && frame.gcdId === GCD_ID
        && ["authorized", "blocked"].includes(frame.authorizationStatus)
        && frame.typedFrameAuthority === true
        && frame.lessonMetadataAuthority === false
        && frame.evidenceAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
      );
    }

    const SHORT_VOWELS = freeze({ ā: "a", ē: "e", ī: "i", ō: "o" });
    const INITIAL_CONSONANT = /^(?:ch|cu|hu|qu|tl|tz|[cçhlmnpqstxyz])/u;
    function deriveSimilarityReduplicant(stem = "") {
      const normalized = text(stem).replace(/[()#-]/gu, "");
      const consonant = normalized.match(INITIAL_CONSONANT)?.[0] || "";
      const remainder = normalized.slice(consonant.length);
      const vowel = remainder.match(/[aāeēiīoō]/u)?.[0] || "";
      const vowelIndex = remainder.indexOf(vowel);
      const postVowel = vowelIndex >= 0 ? remainder.slice(vowelIndex + vowel.length) : "";
      const cihuaCoda = postVowel.startsWith("hu") ? "h" : "";
      return `${consonant}${SHORT_VOWELS[vowel] || vowel}${cihuaCoda}`;
    }
    function shortenStemVowels(stem = "") {
      return text(stem).replace(/[āēīō]/gu, vowel => SHORT_VOWELS[vowel] || vowel);
    }
    function slotSurface(operationFrame, slotId) {
      return text(operationFrame.sourceSlots?.[slotId]?.surface);
    }
    function embeddedSlotSurface(
      operationFrame,
      slotId,
      { lowerInitial = false } = {}
    ) {
      const surface = slotSurface(operationFrame, slotId)
        .replace(/[.?!]+$/u, "");
      if (!lowerInitial || !surface) return surface;
      const initial = surface.search(/\p{L}/u);
      return initial < 0
        ? surface
        : `${surface.slice(0, initial)}${surface[initial].toLocaleLowerCase("nah")}${surface.slice(initial + 1)}`;
    }
    function slotStem(operationFrame, slotId) {
      return text(operationFrame.sourceSlots?.[slotId]?.stem);
    }
    function slotSourceIdentityStem(operationFrame, slotId) {
      return text(
        operationFrame.sourceSlots?.[slotId]?.sourceIdentityStem
        || operationFrame.sourceSlots?.[slotId]?.stem
      );
    }
    function choiceSurface(operationFrame, field) {
      return text(operationFrame.choices?.[field]?.surface);
    }
    function choiceFormula(operationFrame, field) {
      const choiceId = key(operationFrame.choices?.[field]?.id);
      return text(COMPARISON_CHOICE_FORMULAS[field]?.[choiceId]);
    }
    function slotFormula(operationFrame, slotId) {
      return text(operationFrame.sourceSlots?.[slotId]?.formula);
    }
    function joinComparisonFormula(...values) {
      return values.flat().map(text).filter(Boolean).join(" + ");
    }
    function renderComparisonFormulaConstituentsWithStem(
      sourceFrame = null,
      predicateStem = ""
    ) {
      const constituents = sourceFrame?.formulaConstituents;
      const stem = text(predicateStem);
      if (!constituents || !stem) return "";
      if (constituents.unitKind === "nnc") {
        const participant = constituents.participantCarriers?.length
          ? `+${constituents.participantCarriers.join("-")}`
          : "";
        const state = constituents.stateCarriers?.length
          ? `+${constituents.stateCarriers.join("-")}`
          : "";
        return `#${constituents.pers1}-${constituents.pers2}${participant}${state}(${stem})${constituents.num1}-${constituents.num2}#`;
      }
      if (constituents.unitKind === "vnc") {
        const prePredicate = constituents.prePredicateCarriers?.length
          ? `+${constituents.prePredicateCarriers.join("+")}`
          : "";
        return `#${constituents.pers1}-${constituents.pers2}${prePredicate}(${stem})${constituents.tense}+${constituents.num1}-${constituents.num2}#`;
      }
      return "";
    }
    function buildReduplicativeComparisonFormula(operationFrame) {
      const sourceStem = slotStem(operationFrame, "source");
      const continuation =
        operationFrame.choices?.continuationFamily?.id || "bare";
      const continuationFrame = REDUPLICATIVE_CONTINUATIONS[continuation]
        || REDUPLICATIVE_CONTINUATIONS.bare;
      const reduplicant = deriveSimilarityReduplicant(sourceStem);
      const stem = continuationFrame.shortenStem
        ? shortenStemVowels(sourceStem)
        : sourceStem;
      if (continuation.startsWith("absolutive-")) {
        return `(${reduplicant}-${stem})${continuationFrame.formulaSuffix}`;
      }
      if (continuation === "hui-preterit-agentive") {
        return `(${reduplicant}-${stem}-uh-Ø)-qui-`;
      }
      if (continuation === "ti-agentive") {
        return `(${reduplicant}-${stem}-ti-Ø)-c-`;
      }
      if (continuation === "oyotl-nehnemi") {
        const stemFormula = stem.endsWith("ō")
          ? `${stem.slice(0, -1)}-ō`
          : stem;
        return `(${reduplicant}-${stemFormula}-neh-nemi)`;
      }
      return `(${reduplicant}-${stem}${continuationFrame.formulaSuffix})`;
    }
    function buildOperationFormula(operationFrame) {
      const routeId = operationFrame.routeId;
      const slots = operationFrame.sourceSlots;
      const choices = operationFrame.choices;
      let formula = "";
      if (routeId === "similarity-reduplicative-prefix") {
        formula = buildReduplicativeComparisonFormula(operationFrame);
      } else if (routeId === "similarity-downgraded-possessive-tla") {
        formula = `(tla-${slotSourceIdentityStem(operationFrame, "source")})-${text(
          slots.source?.absolutiveSuffix
        )}-`;
      } else if (routeId === "similarity-tloc-relational-nnc") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "comparand"),
          choiceFormula(operationFrame, "degreeMarker"),
          "#0-ī(tloc)0-0#",
          "in",
          slotFormula(operationFrame, "standard")
        );
      } else if (routeId === "similarity-same-as-pronominal") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "comparand"),
          choiceFormula(operationFrame, "sameAsMarker"),
          "in",
          slotFormula(operationFrame, "standard")
        );
      } else if (routeId === "similarity-incorporated-nehnequi") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "comparand"),
          choiceFormula(operationFrame, "degreeMarker"),
          `(m-o-(${slotStem(operationFrame, "source")})-(neh-nequi))`
        );
      } else if (routeId === "similarity-resemblance-verbstem-nnc") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "principal"),
          "in",
          slotFormula(operationFrame, "standard")
        );
      } else if (routeId === "similarity-ihui-vnc") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "topic"),
          slotFormula(operationFrame, "principal")
        );
      } else if (routeId === "similarity-iuhqui-principal") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "topic"),
          choiceFormula(operationFrame, "iuhquiModifier"),
          "#0-0(iuh-Ø-qui)0-0#",
          choices.adjunctorIn ? "in" : "",
          slotFormula(operationFrame, "adjoined"),
          choices.icRelation ? "īc" : "",
          slotFormula(operationFrame, "dimension")
        );
      } else if (routeId === "similarity-iuhqui-larger-concatenate") {
        const similarity = slotFormula(operationFrame, "similarityClause");
        const head = slotFormula(operationFrame, "headClause");
        formula = choices.position === "postposed"
          ? joinComparisonFormula(head, similarity)
          : joinComparisonFormula(similarity, head);
      } else if (
        routeId === "equality-iuhqui"
        || routeId === "equality-ihuan"
      ) {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "comparand"),
          routeId === "equality-iuhqui"
            ? "#0-0(iuh-Ø-qui)0-0#"
            : "#0-ī(huān)0-0#",
          "in",
          slotFormula(operationFrame, "standard"),
          choices.icRelation ? "īc" : "",
          slotFormula(operationFrame, "dimension")
        );
      } else if (routeId === "size-ixquich") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "comparand"),
          choiceFormula(operationFrame, "degreeMarker"),
          "#0-0(ix-qui-ch)0-0#",
          choices.adjunctorIn ? "in" : "",
          slotFormula(operationFrame, "standard")
        );
      } else if (routeId === "size-quezqui-no-izqui") {
        formula = joinComparisonFormula(
          "in",
          "quēzquipa",
          slotFormula(operationFrame, "leftClause"),
          "nō",
          "izquipa",
          slotFormula(operationFrame, "rightClause")
        );
      } else if (routeId === "size-more-more-correlative") {
        formula = joinComparisonFormula(
          "in",
          "īc",
          "cencah",
          slotFormula(operationFrame, "leftClause"),
          "oc",
          "cencah",
          slotFormula(operationFrame, "rightClause")
        );
      } else if (routeId === "comparative-adversative") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "baseClause"),
          choiceFormula(operationFrame, "adversativeMarker"),
          choiceFormula(operationFrame, "degreeMarker"),
          slotFormula(operationFrame, "superiorClause")
        );
      } else if (routeId === "comparative-negative-adverbial") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "topic"),
          choiceFormula(operationFrame, "degreeMarker"),
          slotFormula(operationFrame, "principal"),
          choiceFormula(operationFrame, "negativeIntroducer"),
          slotFormula(operationFrame, "standard")
        );
      } else if (routeId === "comparative-tachcauh-hualcah") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "topic"),
          choices.copula ? "ca" : "",
          choiceFormula(operationFrame, "degreeMarker"),
          choiceFormula(operationFrame, "principalNnc"),
          choices.adjunctorIn ? "in" : "",
          "īc",
          slotFormula(operationFrame, "point"),
          choiceFormula(operationFrame, "negativeIntroducer"),
          slotFormula(operationFrame, "standard")
        );
      } else if (routeId === "comparative-panahuia-unspecified") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "topic"),
          choiceFormula(operationFrame, "degreeMarker"),
          slotFormula(operationFrame, "principal"),
          choices.adjunctorIn ? "in" : "",
          "īc",
          slotFormula(operationFrame, "point"),
          slots.standard
            ? choiceFormula(operationFrame, "negativeIntroducer")
            : "",
          slotFormula(operationFrame, "standard")
        );
      } else if (routeId === "comparative-panahuia-specified") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "comparand"),
          choiceFormula(operationFrame, "degreeMarker"),
          slotFormula(operationFrame, "principal"),
          slotFormula(operationFrame, "standard"),
          choices.adjunctorIn ? "in" : "",
          "īc",
          slotFormula(operationFrame, "point")
        );
      } else if (routeId === "question-how-much-more") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "baseClause"),
          "quēn",
          choiceFormula(operationFrame, "questionCollocation"),
          slotFormula(operationFrame, "degreeClause")
        );
      } else if (routeId === "superlative-adverbial") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "topic"),
          choices.copula ? "ca" : "",
          choiceFormula(operationFrame, "superlativeAdverbial"),
          slotFormula(operationFrame, "predicate")
        );
      } else if (routeId === "superlative-incorporated") {
        const predicate = operationFrame.sourceSlots.predicate;
        const incorporatedStem = joinComparisonFormula(
          choiceFormula(operationFrame, "incorporatedSuperlative"),
          slotStem(operationFrame, "predicate")
        ).replace(/\s*\+\s*/gu, "-");
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "topic"),
          renderComparisonFormulaConstituentsWithStem(
            predicate,
            incorporatedStem
          )
        );
      } else if (routeId === "superlative-principal-ic") {
        formula = joinComparisonFormula(
          slotFormula(operationFrame, "topic"),
          choiceFormula(operationFrame, "superlativePrincipal"),
          choices.adjunctorIn ? "in" : "",
          "īc",
          slotFormula(operationFrame, "predicate")
        );
      }
      return text(formula).replace(/[.?!]$/u, "");
    }
    function buildOperationSurface(operationFrame) {
      const slots = operationFrame.sourceSlots;
      const choices = operationFrame.choices;
      const routeId = operationFrame.routeId;
      const statementType = choices.sentenceType;
      let surface = "";
      let formulaSlots = [];

      if (routeId === "similarity-reduplicative-prefix") {
        const continuation = choices.continuationFamily.surface;
        const sourceStem = slotStem(operationFrame, "source");
        const realizedStem = continuation.shortenStem ? shortenStemVowels(sourceStem) : sourceStem;
        const prefix = deriveSimilarityReduplicant(realizedStem);
        surface = compact(`${prefix}${realizedStem}${continuation.suffix}`);
        formulaSlots = [prefix, realizedStem, continuation.formulaSuffix].filter(Boolean);
      } else if (routeId === "similarity-downgraded-possessive-tla") {
        const stem = slotSourceIdentityStem(operationFrame, "source");
        const suffix = text(slots.source.absolutiveSuffix);
        surface = compact(`tla${stem}${suffix}`);
        formulaSlots = ["tla", stem, suffix];
      } else if (routeId === "similarity-tloc-relational-nnc") {
        surface = join(slotSurface(operationFrame, "comparand"), choiceSurface(operationFrame, "degreeMarker"), "ītloc", "in", slotSurface(operationFrame, "standard"));
        formulaSlots = ["COMPARAND", "DEGREE", "POSSESSIVE(tloc)", "in", "STANDARD"];
      } else if (routeId === "similarity-same-as-pronominal") {
        surface = comma(slotSurface(operationFrame, "comparand"), join(choiceSurface(operationFrame, "sameAsMarker"), "in", slotSurface(operationFrame, "standard")));
        formulaSlots = ["COMPARAND", "SAME_AS_MARKER", "in", "STANDARD"];
      } else if (routeId === "similarity-incorporated-nehnequi") {
        const predicate = compact(`mo${slotStem(operationFrame, "source")}nehnequi`);
        surface = join(slotSurface(operationFrame, "comparand"), choiceSurface(operationFrame, "degreeMarker"), predicate);
        formulaSlots = ["mo", slotStem(operationFrame, "source"), "nehnequi"];
      } else if (routeId === "similarity-resemblance-verbstem-nnc") {
        surface = join(slotSurface(operationFrame, "principal"), "in", slotSurface(operationFrame, "standard"));
        formulaSlots = ["RESEMBLANCE_NNC", "in", "STANDARD"];
      } else if (routeId === "similarity-ihui-vnc") {
        surface = comma(slotSurface(operationFrame, "topic"), slotSurface(operationFrame, "principal"));
        formulaSlots = ["TOPIC", "ihui_VNC"];
      } else if (routeId === "similarity-iuhqui-principal") {
        const adjoined = join(choices.adjunctorIn ? "in" : "", slotSurface(operationFrame, "adjoined"));
        const dimension = join(choices.icRelation ? "īc" : "", slotSurface(operationFrame, "dimension"));
        surface = join(slotSurface(operationFrame, "topic"), choiceSurface(operationFrame, "iuhquiModifier"), "iuhqui", adjoined, dimension);
        formulaSlots = ["TOPIC", "MODIFIER", "iuhqui", choices.adjunctorIn ? "in" : "", "ADJOINED", choices.icRelation ? "īc" : "", slots.dimension ? "DIMENSION" : ""].filter(Boolean);
      } else if (routeId === "similarity-iuhqui-larger-concatenate") {
        const similarity = embeddedSlotSurface(
          operationFrame,
          "similarityClause",
          { lowerInitial: choices.position === "postposed" }
        );
        const head = embeddedSlotSurface(
          operationFrame,
          "headClause",
          { lowerInitial: choices.position !== "postposed" }
        );
        surface = choices.position === "postposed"
          ? join(head, similarity)
          : join(similarity, head);
        formulaSlots = choices.position === "postposed" ? ["HEAD", "IUHQUI_CONCATENATE"] : ["IUHQUI_CONCATENATE", "HEAD"];
      } else if (routeId === "equality-iuhqui" || routeId === "equality-ihuan") {
        const marker = routeId === "equality-iuhqui" ? "iuhqui" : "īhuān";
        const dimension = join(choices.icRelation ? "īc" : "", slotSurface(operationFrame, "dimension"));
        surface = comma(slotSurface(operationFrame, "comparand"), join(marker, "in", slotSurface(operationFrame, "standard"), dimension));
        formulaSlots = ["COMPARAND", marker, "in", "STANDARD", choices.icRelation ? "īc" : "", slots.dimension ? "DIMENSION" : ""].filter(Boolean);
      } else if (routeId === "size-ixquich") {
        surface = join(slotSurface(operationFrame, "comparand"), choiceSurface(operationFrame, "degreeMarker"), "ixquich", choices.adjunctorIn ? "in" : "", slotSurface(operationFrame, "standard"));
        formulaSlots = ["COMPARAND", "DEGREE", "ixquich", choices.adjunctorIn ? "in" : "", "STANDARD"].filter(Boolean);
      } else if (routeId === "size-quezqui-no-izqui") {
        surface = comma(join("In quēzquipa", slotSurface(operationFrame, "leftClause")), join("no izquipa", slotSurface(operationFrame, "rightClause")));
        formulaSlots = ["in", "quēzquipa", "LEFT", "no", "izquipa", "RIGHT"];
      } else if (routeId === "size-more-more-correlative") {
        surface = comma(join("In īc cencah", slotSurface(operationFrame, "leftClause")), join("oc cencah", slotSurface(operationFrame, "rightClause")));
        formulaSlots = ["in", "īc", "cencah", "LEFT", "oc", "cencah", "RIGHT"];
      } else if (routeId === "comparative-adversative") {
        surface = comma(slotSurface(operationFrame, "baseClause"), join(choiceSurface(operationFrame, "adversativeMarker"), choiceSurface(operationFrame, "degreeMarker"), slotSurface(operationFrame, "superiorClause")));
        formulaSlots = ["AFFIRMATIVE", "ADVERSATIVE", "DEGREE", "AFFIRMATIVE"];
      } else if (routeId === "comparative-negative-adverbial") {
        surface = comma(join(slotSurface(operationFrame, "topic"), choiceSurface(operationFrame, "degreeMarker"), slotSurface(operationFrame, "principal")), join(choiceSurface(operationFrame, "negativeIntroducer"), slotSurface(operationFrame, "standard")));
        formulaSlots = ["TOPIC", "DEGREE", "PRINCIPAL", "NEGATIVE_INTRODUCER", "STANDARD"];
      } else if (routeId === "comparative-tachcauh-hualcah") {
        const principal = join(slotSurface(operationFrame, "topic"), choices.copula ? "ca" : "", choiceSurface(operationFrame, "degreeMarker"), choiceSurface(operationFrame, "principalNnc"));
        const point = join(choices.adjunctorIn ? "in" : "", "īc", slotSurface(operationFrame, "point"));
        const standard = join(choiceSurface(operationFrame, "negativeIntroducer"), slotSurface(operationFrame, "standard"));
        surface = comma(comma(principal, point), standard);
        formulaSlots = ["TOPIC", choices.copula ? "ca" : "", "DEGREE", "PRINCIPAL_NNC", choices.adjunctorIn ? "in" : "", "īc", "POINT", "NEGATIVE_INTRODUCER", "STANDARD"].filter(Boolean);
      } else if (routeId === "comparative-panahuia-unspecified") {
        const principal = join(slotSurface(operationFrame, "topic"), choiceSurface(operationFrame, "degreeMarker"), slotSurface(operationFrame, "principal"));
        const point = join(choices.adjunctorIn ? "in" : "", "īc", slotSurface(operationFrame, "point"));
        const standard = slots.standard ? join(choiceSurface(operationFrame, "negativeIntroducer"), slotSurface(operationFrame, "standard")) : "";
        surface = comma(join(principal, point), standard);
        formulaSlots = ["TOPIC", "DEGREE", "PANAHUIA_UNSPECIFIED", choices.adjunctorIn ? "in" : "", "īc", "POINT", slots.standard ? "NEGATIVE_STANDARD" : ""].filter(Boolean);
      } else if (routeId === "comparative-panahuia-specified") {
        surface = join(slotSurface(operationFrame, "comparand"), choiceSurface(operationFrame, "degreeMarker"), slotSurface(operationFrame, "principal"), slotSurface(operationFrame, "standard"), choices.adjunctorIn ? "in" : "", "īc", slotSurface(operationFrame, "point"));
        formulaSlots = ["COMPARAND", "DEGREE", "PANAHUIA_SPECIFIED", "STANDARD", choices.adjunctorIn ? "in" : "", "īc", "POINT"].filter(Boolean);
      } else if (routeId === "question-how-much-more") {
        surface = comma(slotSurface(operationFrame, "baseClause"), join("quēn", choiceSurface(operationFrame, "questionCollocation"), slotSurface(operationFrame, "degreeClause")));
        formulaSlots = ["BASE", "quēn", "COMPARATIVE_COLLOCATION", "DEGREE_CLAUSE"];
      } else if (routeId === "superlative-adverbial") {
        surface = join(slotSurface(operationFrame, "topic"), choices.copula ? "ca" : "", choiceSurface(operationFrame, "superlativeAdverbial"), slotSurface(operationFrame, "predicate"));
        formulaSlots = ["TOPIC", choices.copula ? "ca" : "", "SUPERLATIVE_ADVERBIAL", "PREDICATE"].filter(Boolean);
      } else if (routeId === "superlative-incorporated") {
        surface = join(slotSurface(operationFrame, "topic"), compact(`${choiceSurface(operationFrame, "incorporatedSuperlative")}${slotSurface(operationFrame, "predicate")}`));
        formulaSlots = ["TOPIC", "INCORPORATED_SUPERLATIVE", "PREDICATE"];
      } else if (routeId === "superlative-principal-ic") {
        surface = join(slotSurface(operationFrame, "topic"), choiceSurface(operationFrame, "superlativePrincipal"), choices.adjunctorIn ? "in" : "", "īc", slotSurface(operationFrame, "predicate"));
        formulaSlots = ["TOPIC", "SUPERLATIVE_PRINCIPAL", choices.adjunctorIn ? "in" : "", "īc", "PREDICATE"].filter(Boolean);
      }
      return {
        surface: terminal(surface, statementType),
        formulaSlots
      };
    }

    function buildClassicalComparisonAst(operationFrame = null) {
      if (!isClassicalComparisonOperationFrame(operationFrame)
        || operationFrame.authorizationStatus !== "authorized") {
        const blocked = freeze({
          kind: AST_FRAME_KIND,
          version: COMPARISON_BOUNDARY_VERSION,
          gcdId: GCD_ID,
          authorizationStatus: "blocked",
          blockReason: "authorized-comparison-operation-frame-required",
          routeId: text(operationFrame?.routeId),
          relation: text(operationFrame?.relation),
          operation: text(operationFrame?.operation),
          nodes: [],
          formulaTemplate: text(operationFrame?.formulaTemplate),
          lessonMetadataAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        });
        issuedAstFrames.add(blocked);
        return blocked;
      }
      const nodes = Object.entries(operationFrame.sourceSlots).map(([slotId, sourceFrame]) => freeze({
        kind: "comparison-source-node",
        slotId,
        unitKind: sourceFrame.unitKind,
        grammaticalRole: operationFrame.sourceSlotRoles?.[slotId] || slotId,
        sourceFrame
      }));
      const frame = freeze({
        kind: AST_FRAME_KIND,
        version: COMPARISON_BOUNDARY_VERSION,
        gcdId: GCD_ID,
        authorizationStatus: "authorized",
        blockReason: "",
        routeId: operationFrame.routeId,
        relation: operationFrame.relation,
        operation: operationFrame.operation,
        nodes,
        choices: operationFrame.choices,
        formulaTemplate: operationFrame.formulaTemplate,
        typedOperationFrame: operationFrame,
        lessonMetadataAuthority: false,
        evidenceAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
      issuedAstFrames.add(frame);
      return frame;
    }
    function isClassicalComparisonAst(frame = null) {
      return Boolean(
        frame
        && issuedAstFrames.has(frame)
        && frame.kind === AST_FRAME_KIND
        && frame.version === COMPARISON_BOUNDARY_VERSION
        && frame.gcdId === GCD_ID
        && ["authorized", "blocked"].includes(frame.authorizationStatus)
        && frame.lessonMetadataAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
      );
    }

    function realizeClassicalComparison(operationFrame = null, astFrame = null) {
      if (!isClassicalComparisonOperationFrame(operationFrame)
        || operationFrame.authorizationStatus !== "authorized"
        || !isClassicalComparisonAst(astFrame)
        || astFrame.authorizationStatus !== "authorized"
        || astFrame.typedOperationFrame !== operationFrame) {
        const blocked = freeze({
          kind: RESULT_FRAME_KIND,
          version: COMPARISON_BOUNDARY_VERSION,
          gcdId: GCD_ID,
          authorizationStatus: "blocked",
          blockReason:
            isClassicalComparisonOperationFrame(operationFrame)
            && operationFrame.authorizationStatus === "blocked"
              ? operationFrame.blockReason
              : isClassicalComparisonAst(astFrame)
                && astFrame.authorizationStatus === "blocked"
                ? astFrame.blockReason
                : "matching-authorized-comparison-operation-and-ast-required",
          routeId: text(operationFrame?.routeId),
          relation: text(operationFrame?.relation),
          surface: "",
          surfaceForms: [],
          selectedResult: "",
          formula: "",
          formulaSlots: [],
          typedFrameAuthority: true,
          lessonMetadataAuthority: false,
          evidenceAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          callerSuppliedAuthorityAccepted: false
        });
        issuedResultFrames.add(blocked);
        return blocked;
      }
      const realization = buildOperationSurface(operationFrame);
      const formulaRealization = buildOperationFormula(operationFrame);
      if (!realization.surface || !formulaRealization) {
        const blocked = freeze({
          kind: RESULT_FRAME_KIND,
          version: COMPARISON_BOUNDARY_VERSION,
          gcdId: GCD_ID,
          authorizationStatus: "blocked",
          blockReason: !formulaRealization
            ? "comparison-route-produced-no-complete-formula"
            : "comparison-route-produced-no-surface",
          routeId: operationFrame.routeId,
          relation: operationFrame.relation,
          surface: "",
          surfaceForms: [],
          selectedResult: "",
          formula: "",
          formulaRealization: "",
          formulaRecord: null,
          formulaRealizationRecord: null,
          formulaSlots: realization.formulaSlots,
          typedFrameAuthority: true,
          lessonMetadataAuthority: false,
          evidenceAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          callerSuppliedAuthorityAccepted: false
        });
        issuedResultFrames.add(blocked);
        return blocked;
      }
      const formulaRecord = typeof targetObject.buildGrammarFormulaRecord
        === "function"
        ? targetObject.buildGrammarFormulaRecord({
            id: `comparison:${operationFrame.routeId}:formula`,
            unit: "comparison-clause-unit",
            formula: formulaRealization,
            formulaSlots: realization.formulaSlots,
            operationFrames: [operationFrame],
            source: "typed-comparison-operation"
          })
        : freeze({
            kind: "grammar-formula-record",
            id: `comparison:${operationFrame.routeId}:formula`,
            unit: "comparison-clause-unit",
            formula: formulaRealization,
            formulaText: formulaRealization,
            formulaSlots: realization.formulaSlots,
            source: "typed-comparison-operation"
          });
      const formulaRealizationRecord =
        typeof targetObject.buildGrammarFormulaRealizationRecord === "function"
          ? targetObject.buildGrammarFormulaRealizationRecord({
              id: `comparison:${operationFrame.routeId}:realization`,
              formulaRecord,
              unit: "comparison-clause-unit",
              surface: realization.surface,
              surfaceForms: [realization.surface],
              source: "typed-comparison-boundary-realization"
            })
          : freeze({
              kind: "grammar-formula-realization-record",
              id: `comparison:${operationFrame.routeId}:realization`,
              formulaRecordId: formulaRecord.id,
              unit: "comparison-clause-unit",
              surface: realization.surface,
              surfaceForms: [realization.surface],
              source: "typed-comparison-boundary-realization"
            });
      const result = {
        kind: RESULT_FRAME_KIND,
        version: COMPARISON_BOUNDARY_VERSION,
        gcdId: GCD_ID,
        authorizationStatus: "authorized",
        blockReason: "",
        routeId: operationFrame.routeId,
        relation: operationFrame.relation,
        operation: operationFrame.operation,
        surface: realization.surface,
        surfaceForms: [realization.surface],
        selectedResult: realization.surface,
        formula: formulaRealization,
        formulaRealization,
        formulaRecord,
        formulaRealizationRecord,
        formulaSlots: realization.formulaSlots,
        operationFrame,
        astFrame,
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        evidenceAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        diagnostics: ["comparison-canonical-result-generated"]
      };
      const output = attachComparisonGrammarContract(result, {
        metadataKind: RESULT_FRAME_KIND,
        routeStage: "comparison-result-realization",
        sourceInput: Object.values(operationFrame.sourceSlots).map(frame => frame.surface).join(" | "),
        generationAllowed: true,
        supported: true,
        surfaceForms: result.surfaceForms,
        resultFrame: {
          sourceInput: Object.values(operationFrame.sourceSlots).map(frame => frame.surface).join(" | "),
          surface: result.surface,
          surfaceForms: result.surfaceForms,
          selectedResult: result.selectedResult,
          formula: result.formula,
          formulaRealization: result.formulaRealization,
          formulaRecord,
          formulaRealizationRecord
        },
        nuclearClauseFrame: {
          routeId: result.routeId,
          relation: result.relation,
          operation: result.operation,
          comparisonAst: astFrame
        },
        participantFrame: {
          sourceSlots: operationFrame.sourceSlots,
          choices: operationFrame.choices
        },
        targetContract: {
          metadataKind: RESULT_FRAME_KIND,
          generationAllowed: true,
          routeId: result.routeId,
          selectedResult: result.selectedResult
        },
        diagnostics: result.diagnostics
      });
      issuedResultFrames.add(output);
      return output;
    }
    function isClassicalComparisonResultFrame(frame = null) {
      return Boolean(
        frame
        && issuedResultFrames.has(frame)
        && frame.kind === RESULT_FRAME_KIND
        && frame.version === COMPARISON_BOUNDARY_VERSION
        && frame.gcdId === GCD_ID
        && ["authorized", "blocked"].includes(frame.authorizationStatus)
        && (
          frame.authorizationStatus === "blocked"
          || (
            Boolean(frame.formulaRealization)
            && frame.formula === frame.formulaRealization
            && frame.formulaRecord?.formula === frame.formulaRealization
            && frame.formulaRealizationRecord?.formulaRecordId
              === frame.formulaRecord?.id
            && frame.formulaRealizationRecord?.surface === frame.surface
          )
        )
        && frame.typedFrameAuthority === true
        && frame.lessonMetadataAuthority === false
        && frame.evidenceAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
      );
    }

    function evaluateClassicalNahuatlComparison(request = {}) {
      const operationFrame = buildClassicalComparisonOperationFrame(request);
      const astFrame = buildClassicalComparisonAst(operationFrame);
      return realizeClassicalComparison(operationFrame, astFrame);
    }
    function evaluateClassicalNahuatlComparisonBatch(requests = []) {
      const normalizedRequests = Array.isArray(requests) ? requests : [];
      const results = normalizedRequests.map(request => evaluateClassicalNahuatlComparison(request));
      return freeze({
        kind: "classical-nahuatl-comparison-batch-result",
        version: COMPARISON_BOUNDARY_VERSION,
        gcdId: GCD_ID,
        authorizationStatus: results.every(result => isClassicalComparisonResultFrame(result) && result.authorizationStatus === "authorized") ? "authorized" : "blocked",
        requestCount: normalizedRequests.length,
        resultCount: results.length,
        scalarEvaluatorIdentity: "evaluateClassicalNahuatlComparison",
        pointwiseScalarEquality: true,
        formulaProjectionPointwiseScalarEquivalent: true,
        writtenProjectionPointwiseScalarEquivalent: true,
        results,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }

    function buildComparisonBoundaryMetadata() {
      const boundary = {
        kind: "comparison-boundary",
        version: COMPARISON_BOUNDARY_VERSION,
        lesson: 53,
        status: "implemented",
        targetAuthority: "typed semantic comparison route plus engine-issued source units",
        generationAllowed: true,
        confirmedExamples: [],
        structuralQuestions: getComparisonStructuralQuestions(),
        boundaries: {
          hasAdjectiveLikeWordOutputs: true,
          hasAdjectivalModificationBoundary: true,
          hasComparisonAst: true,
          hasConfirmedClauseExamples: true,
          hasStaticComparisonData: false,
          hasSemanticRouteInventory: true,
          changesAdjectiveGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          composesCanonicalNncAndVncSources: true,
          treatsAdjectiveOutputAsComparisonEvidence: false,
          treatsTranslationsAsComparisonEvidence: false,
          treatsCanvasExamplesAsAuthority: false
        },
        antiConflationRules: getComparisonAntiConflationRules()
      };
      return attachComparisonGrammarContract(boundary, {
        routeStage: "comparison-boundary",
        generationAllowed: true,
        supported: true,
        morphBoundaryFrame: {
          gcd: buildClassicalComparisonGcdFrame(),
          lcm: getClassicalComparisonLcmInventory()
        }
      });
    }

    const api = {
      normalizeComparisonEnum,
      normalizeComparisonRelation,
      normalizeComparisonFalsePositiveSource,
      getComparisonAntiConflationRules,
      getComparisonStructuralQuestions,
      getClassicalComparisonRouteInventory,
      getClassicalComparisonLcmInventory,
      buildClassicalComparisonGcdFrame,
      buildClassicalComparisonSourceUnit,
      isClassicalComparisonSourceUnit,
      buildClassicalComparisonOperationFrame,
      isClassicalComparisonOperationFrame,
      buildClassicalComparisonAst,
      isClassicalComparisonAst,
      realizeClassicalComparison,
      isClassicalComparisonResultFrame,
      evaluateClassicalNahuatlComparison,
      evaluateClassicalNahuatlComparisonBatch,
      buildComparisonBoundaryMetadata,
      deriveSimilarityReduplicant
    };
    [
      ["COMPARISON_BOUNDARY_VERSION", COMPARISON_BOUNDARY_VERSION],
      ["COMPARISON_RELATION", COMPARISON_RELATION],
      ["COMPARISON_FALSE_POSITIVE_SOURCE", COMPARISON_FALSE_POSITIVE_SOURCE],
      ["COMPARISON_SOURCE_UNIT_KINDS", COMPARISON_SOURCE_UNIT_KINDS],
      ["COMPARISON_ANTI_CONFLATION_RULES", COMPARISON_ANTI_CONFLATION_RULES],
      ["COMPARISON_STRUCTURAL_QUESTIONS", COMPARISON_STRUCTURAL_QUESTIONS],
      ["COMPARISON_ROUTE_INVENTORY", COMPARISON_ROUTE_INVENTORY],
      ["COMPARISON_LCM_AXES", COMPARISON_LCM_AXES],
      ["COMPARISON_GCD_ID", GCD_ID]
    ].forEach(([name, value]) => {
      Object.defineProperty(api, name, {
        configurable: true,
        enumerable: true,
        get() { return value; }
      });
    });
    return api;
}

export function installComparisonGlobals(targetObject = globalThis, installationContext = null) {
    const api = createComparisonApi(targetObject, installationContext);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
