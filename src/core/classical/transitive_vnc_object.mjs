// Canonical modern ESM module.

export function createClassicalNahuatlTransitiveVncObjectRuntime(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON6_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const classicalNahuatlLesson6IssuedTransitiveObjectFrames = new WeakSet();
    const CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE = "#pers1-pers2+va(STEM)tns+num1-num2#";
    const CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE = "#pers1-pers2+va1-va2(STEM)tns+num1-num2#";
    const CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO = "\u2395";
    const CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY = "Transcription line ranges are the legal deed; digest anchors are navigation aids only.";
    const CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS = Object.freeze(["pers1-pers2", "va", "va1-va2", "tns", "num1-num2"]);
    const CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY = "conditional-support-vowel-boundary-action";
    const CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS = Object.freeze({
      INSERT: "insert",
      DROP: "drop",
      RETAIN: "retain",
      NOT_NEEDED: "not-needed",
      NOT_SUPPORTIVE: "not-supportive"
    });
    const CLASSICAL_NAHUATL_LESSON6_FORMULA_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-61-transitive-valence-difference",
      tagId: "cn-l6-transitive-vnc-formulas",
      section: "6.1",
      lineStart: 2684,
      lineEnd: 2691,
      exactWitness: "The two transitive formulas given in \u00a7 4.5 differ from the\nintransitive formula only in the Valence position",
      rule: "The transitive VNC formulas differ from the intransitive VNC formula only by the objective Valence position.",
      clauseKind: "verbal-nuclear-clause",
      transitivity: "transitive",
      valencePositionRequired: true
    }), Object.freeze({
      id: "cn-l6-62-monadic-linear-formula",
      tagId: "cn-l6-monadic-valence-position",
      section: "6.2",
      lineStart: 2716,
      lineEnd: 2725,
      exactWitness: "Linear format: #pers\u00b9-pers\u00b2+va(STEM)tns+num\u00b9-num\u00b2#",
      rule: "The monadic transitive VNC formula uses a single +va valence position.",
      formulaTemplate: CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE,
      valencePosition: "va",
      valenceArity: "monadic"
    }), Object.freeze({
      id: "cn-l6-63-dyadic-linear-formula",
      tagId: "cn-l6-dyadic-valence-position",
      section: "6.3",
      lineStart: 2744,
      lineEnd: 2749,
      exactWitness: "Linear format: #pers\u00b9-pers\u00b2+va\u00b9-va\u00b2(STEM)tns+num\u00b9-num\u00b2#.",
      rule: "The dyadic transitive VNC formula uses +va1-va2 for specific mainline object pronouns.",
      formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
      valencePosition: "va1-va2",
      valenceArity: "dyadic"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_OBJECT_CATEGORY_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-61-objective-case-valence-position",
      tagId: "cn-l6-object-pronoun-categories",
      section: "6.1",
      lineStart: 2687,
      lineEnd: 2691,
      exactWitness: "The case category\nhere exploits the feature objective.",
      rule: "The Lesson 6 Valence position is an objective-case personal-pronoun position.",
      category: "case",
      feature: "objective"
    }), Object.freeze({
      id: "cn-l6-61-trajectory-features",
      tagId: "cn-l6-object-pronoun-categories",
      section: "6.1",
      lineStart: 2692,
      lineEnd: 2698,
      exactWitness: "The category of trajectory has three features: projective, reflexive, reciprocative.",
      rule: "Objective pronouns distinguish projective, reflexive, and reciprocative trajectory.",
      category: "trajectory",
      features: Object.freeze(["projective", "reflexive", "reciprocative"])
    }), Object.freeze({
      id: "cn-l6-61-specificity-features",
      tagId: "cn-l6-object-pronoun-categories",
      section: "6.1",
      lineStart: 2699,
      lineEnd: 2705,
      exactWitness: "The category of specificity has two features: specific and nonspecific.",
      rule: "Specific objects are personal pronouns; nonspecific objects are indefinite pronouns.",
      category: "specificity",
      features: Object.freeze(["specific", "nonspecific"])
    }), Object.freeze({
      id: "cn-l6-61-prominence-features",
      tagId: "cn-l6-object-pronoun-categories",
      section: "6.1",
      lineStart: 2706,
      lineEnd: 2711,
      exactWitness: "The category of prominence has two features: mainline and shuntline.",
      rule: "Objective pronouns distinguish mainline and shuntline prominence.",
      category: "prominence",
      features: Object.freeze(["mainline", "shuntline"])
    })]);
    const CLASSICAL_NAHUATL_LESSON6_MONADIC_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-62-monadic-three-morphs",
      tagId: "cn-l6-monadic-valence-position",
      section: "6.2",
      lineStart: 2724,
      lineEnd: 2730,
      exactWitness: "The Valence position in this formula concentrates the pronominal categories into one of three\npossible morphs:",
      rule: "Monadic +va concentrates the object-pronoun categories into ne, tē, or tla.",
      valencePosition: "va"
    }), Object.freeze({
      id: "cn-l6-621-shuntline-reflexive-ne",
      tagId: "cn-l6-monadic-valence-position",
      section: "6.2.1",
      lineStart: 2726,
      lineEnd: 2727,
      exactWitness: "a shuntline reflexive/reciprocative-object morph: ne",
      rule: "ne is the monadic shuntline reflexive/reciprocative object morph.",
      valencePosition: "va",
      morph: "ne"
    }), Object.freeze({
      id: "cn-l6-622-nonspecific-te-tla",
      tagId: "cn-l6-monadic-valence-position",
      section: "6.2.2",
      lineStart: 2728,
      lineEnd: 2743,
      exactWitness: "a. tē = someone; anyone; people (in general); everyone; all",
      rule: "tē and tla are nonspecific third-person projective indefinite-pronoun morphs.",
      valencePosition: "va",
      morphs: Object.freeze(["tē", "tla"])
    })]);
    const CLASSICAL_NAHUATL_LESSON6_DYADIC_PROJECTIVE_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-63-specific-mainline-dyadic",
      tagId: "cn-l6-dyadic-valence-position",
      section: "6.3",
      lineStart: 2744,
      lineEnd: 2749,
      exactWitness: "When the personal\npronoun in the objective case is mainline and has specific reference",
      rule: "Specific mainline objective personal pronouns use dyadic va1-va2.",
      valencePosition: "va1-va2"
    }), Object.freeze({
      id: "cn-l6-64-projective-distribution",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4",
      lineStart: 2758,
      lineEnd: 2760,
      exactWitness: "When the valence position is dyadic, the categories\nof person, number, and case are combined differently in va1 and va2",
      rule: "Projective dyadic object fillers distribute person, number, and objective case by third-person status.",
      valencePosition: "va1-va2"
    }), Object.freeze({
      id: "cn-l6-641-va1-person-never-alone",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1",
      lineStart: 2761,
      lineEnd: 2762,
      exactWitness: "Subposition va1 always manifests the category of person, but it is NEVER present as the\nonly information in the subposition.",
      rule: "va1 always carries person, but never person alone.",
      slot: "va1"
    }), Object.freeze({
      id: "cn-l6-641a-third-person-va1",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1.a",
      lineStart: 2763,
      lineEnd: 2775,
      exactWitness: "For the 3rd person, person is combined with objective case in the va1 subposition.",
      rule: "For third-person projective objects, va1 combines person with objective case and selects c/qu or qui.",
      slot: "va1",
      objectPersonClass: "third"
    }), Object.freeze({
      id: "cn-l6-641b-nonthird-va1",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1.b",
      lineStart: 2776,
      lineEnd: 2784,
      exactWitness: "For the 1st and 2nd persons,person is combined with number in the va1 subposition.",
      rule: "For non-third-person projective objects, va1 combines person with number.",
      slot: "va1",
      objectPersonClass: "non-third"
    }), Object.freeze({
      id: "cn-l6-642-va2-completes-category",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.2",
      lineStart: 2785,
      lineEnd: 2786,
      exactWitness: "Subposition va2 makes up for the category not contained in va1.",
      rule: "va2 supplies the category not contained in va1.",
      slot: "va2"
    }), Object.freeze({
      id: "cn-l6-642a-third-person-va2-number",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.2.a",
      lineStart: 2787,
      lineEnd: 2796,
      exactWitness: "For the 3rd person, the va2 subposition manifests number:",
      rule: "For third-person projective objects, va2 manifests singular 0 or plural im/in.",
      slot: "va2",
      objectPersonClass: "third"
    }), Object.freeze({
      id: "cn-l6-642b-nonthird-va2-objective",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.2.b",
      lineStart: 2797,
      lineEnd: 2803,
      exactWitness: "For the non-3rd persons the va2 subposition expresses objective case",
      rule: "For non-third-person projective objects, va2 expresses objective case as ēch or itz.",
      slot: "va2",
      objectPersonClass: "non-third"
    }), Object.freeze({
      id: "cn-l6-65-projective-summary",
      tagId: "cn-l6-projective-object-summary",
      section: "6.5",
      lineStart: 2804,
      lineEnd: 2813,
      exactWitness: "+n-ēch( = \"+lsg-obj(\" = me",
      rule: "The projective object paradigm supplies n-ēch, t-ēch, m-itz, am-ēch, c/qu/qui-0, and qu-im.",
      valencePosition: "va1-va2"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_RULES = Object.freeze([Object.freeze({
      id: "cn-l2-26-supportive-i-illegal-consonant-sequence",
      tagId: "cn-l2-syllable-structure",
      section: "2.6 note 1",
      lineStart: 1738,
      lineEnd: 1740,
      exactWitness: "any type-level consonant sequence\nthat is illegal at the token level is lifted into a pronounceable sequence by the introduction of an [i]",
      rule: "Supportive [i] repairs an otherwise illegal token-level consonant sequence.",
      sourceLesson: "Andrews Lesson 2"
    }), Object.freeze({
      id: "cn-l6-641a-c-qu-regular-spelling",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1.a",
      lineStart: 2763,
      lineEnd: 2766,
      exactWitness: "The\nmorphic filler has the variants c/qu ~ qui. The first two are merely spelling variants.",
      rule: "Third-person projective va1 is the regular /k/ morph spelled c or qu when an internal vowel stands on either side.",
      sourceLesson: "Andrews Lesson 6"
    }), Object.freeze({
      id: "cn-l6-641a-qui-supportive-i",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1.a",
      lineStart: 2764,
      lineEnd: 2772,
      exactWitness: "The [i] on\nthe third is a supportive vowel.",
      rule: "The i of qui is supportive, used before a consonant when the VNC subject pronoun has 0-0.",
      sourceLesson: "Andrews Lesson 6"
    }), Object.freeze({
      id: "cn-l7-78-supportive-initial-i-object-boundary",
      tagId: "cn-l7-supportive-initial-i",
      section: "7.8 Note 1",
      lineStart: 3200,
      lineEnd: 3224,
      exactWitness: "supportive\n[i], the [i] is no longer needed and is omitted.",
      rule: "A stem-initial supportive i drops after mainline reflexive object prefixes and after nonspecific nonhuman tla; real initial i remains.",
      sourceLesson: "Andrews Lesson 7"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_REFLEXIVE_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-66-mainline-reflexive-reflects-subject",
      tagId: "cn-l6-mainline-reflexive-fillers",
      section: "6.6",
      lineStart: 2814,
      lineEnd: 2819,
      exactWitness: "A mainline reflexive/reciprocative verb object reflects the person\nand number information of the subject.",
      rule: "Mainline reflexive/reciprocative objects reflect the subject's person and number.",
      valencePosition: "va1-va2"
    }), Object.freeze({
      id: "cn-l6-661-reflexive-va1-person-number",
      tagId: "cn-l6-mainline-reflexive-fillers",
      section: "6.6.1",
      lineStart: 2820,
      lineEnd: 2824,
      exactWitness: "Subposition va1 is the locus of the categories of person and number.",
      rule: "For mainline reflexive objects, va1 is the person-number locus.",
      slot: "va1"
    }), Object.freeze({
      id: "cn-l6-662-reflexive-va2-objective-o-square",
      tagId: "cn-l6-mainline-reflexive-fillers",
      section: "6.6.2",
      lineStart: 2825,
      lineEnd: 2827,
      exactWitness: "Subposition va2 is the locus of the objective-case feature",
      rule: "For mainline reflexive objects, va2 carries objective case as o, replaced by square-zero before a vowel-initial stem.",
      slot: "va2"
    }), Object.freeze({
      id: "cn-l6-67-reflexive-summary",
      tagId: "cn-l6-mainline-reflexive-summary",
      section: "6.7",
      lineStart: 2828,
      lineEnd: 2837,
      exactWitness: "+n-o( ~ +n-0( = \"+ lsg-reflexobj(\" = myself",
      rule: "The mainline reflexive object paradigm supplies n-o/n-square, t-o/t-square, and m-o/m-square.",
      valencePosition: "va1-va2"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_RECEIPT_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-receipt-mirrors-selected-output-logic",
      tagId: "cn-l6-receipt-not-authority",
      section: "6.1-6.7",
      lineStart: 2681,
      lineEnd: 2837,
      exactWitness: "The Transitive VNC Formula. Object Pronouns",
      rule: "The receipt may display only the Lesson 6 formula and object fillers authorized by selected-output logic; it is not itself authority.",
      receiptRole: "display-only",
      authorityRole: "not-authority"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS = Object.freeze({
      "shuntline-reflexive": Object.freeze({
        id: "shuntline-reflexive",
        va: "ne",
        objectLabel: "shuntline reflexive/reciprocative",
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "shuntline",
        pronounClass: "personal-pronoun"
      }),
      "nonspecific-human": Object.freeze({
        id: "nonspecific-human",
        va: "tē",
        objectLabel: "nonspecific human projective",
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline-or-shuntline",
        humanness: "human",
        pronounClass: "indefinite-pronoun"
      }),
      "nonspecific-nonhuman": Object.freeze({
        id: "nonspecific-nonhuman",
        va: "tla",
        objectLabel: "nonspecific nonhuman projective",
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline-or-shuntline",
        humanness: "nonhuman",
        pronounClass: "indefinite-pronoun"
      })
    });
    const CLASSICAL_NAHUATL_LESSON6_PROJECTIVE_OBJECTS = Object.freeze({
      "1sg": Object.freeze({
        id: "1sg",
        va1: "n",
        va2: "ēch",
        va1Carries: Object.freeze(["person", "number"]),
        va2Carries: Object.freeze(["objective-case"]),
        objectPerson: "1sg",
        gloss: "me"
      }),
      "1pl": Object.freeze({
        id: "1pl",
        va1: "t",
        va2: "ēch",
        va1Carries: Object.freeze(["person", "number"]),
        va2Carries: Object.freeze(["objective-case"]),
        objectPerson: "1pl",
        gloss: "us"
      }),
      "2sg": Object.freeze({
        id: "2sg",
        va1: "m",
        va2: "itz",
        va1Carries: Object.freeze(["person", "number"]),
        va2Carries: Object.freeze(["objective-case"]),
        objectPerson: "2sg",
        gloss: "you-sg"
      }),
      "2pl": Object.freeze({
        id: "2pl",
        va1: "am",
        va2: "ēch",
        va1Carries: Object.freeze(["person", "number"]),
        va2Carries: Object.freeze(["objective-case"]),
        objectPerson: "2pl",
        gloss: "you-pl"
      })
    });
    function getClassicalNahuatlTransitiveVncRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function cloneClassicalNahuatlLesson6Rule(rule = {}) {
      const cloned = {
        ...rule
      };
      ["features", "morphs", "va1Carries", "va2Carries", "valenceSlots", "outputableSlots", "ruleFrameKinds"].forEach(key => {
        if (Array.isArray(rule[key])) {
          cloned[key] = Array.from(rule[key]);
        }
      });
      return cloned;
    }
    function getClassicalNahuatlFormulaRules() {
      return CLASSICAL_NAHUATL_LESSON6_FORMULA_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlObjectCategoryRules() {
      return CLASSICAL_NAHUATL_LESSON6_OBJECT_CATEGORY_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlMonadicRules() {
      return CLASSICAL_NAHUATL_LESSON6_MONADIC_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlDyadicProjectiveRules() {
      return CLASSICAL_NAHUATL_LESSON6_DYADIC_PROJECTIVE_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlSupportiveIRules() {
      return CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlReflexiveRules() {
      return CLASSICAL_NAHUATL_LESSON6_REFLEXIVE_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlTransitiveVncReceiptRules() {
      return CLASSICAL_NAHUATL_LESSON6_RECEIPT_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlTransitiveVncRuleLogicRules() {
      return {
        formula: getClassicalNahuatlFormulaRules(),
        objectCategories: getClassicalNahuatlObjectCategoryRules(),
        monadic: getClassicalNahuatlMonadicRules(),
        dyadicProjective: getClassicalNahuatlDyadicProjectiveRules(),
        supportiveI: getClassicalNahuatlSupportiveIRules(),
        reflexive: getClassicalNahuatlReflexiveRules(),
        receipt: getClassicalNahuatlTransitiveVncReceiptRules()
      };
    }
    function normalizeClassicalNahuatlTransitiveVncToken(value = "") {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function normalizeClassicalNahuatlTransitiveVncStem(value = "") {
      return String(value == null ? "" : value).trim().replace(/^-+\s*/u, "").replace(/^\((.*)\)$/u, "$1").trim();
    }
    function normalizeClassicalNahuatlTransitiveVncSubject(value = "") {
      const normalized = normalizeClassicalNahuatlTransitiveVncToken(value || "3sg").replace(/-/gu, "").replace(/\s+/gu, "");
      const aliases = {
        "1": "1sg",
        "1sg": "1sg",
        "2": "2sg",
        "2sg": "2sg",
        "3": "3sg",
        "3sg": "3sg",
        "1pl": "1pl",
        "1p": "1pl",
        "2pl": "2pl",
        "2p": "2pl",
        "3pl": "3pl",
        "3p": "3pl"
      };
      return aliases[normalized] || "3sg";
    }
    function normalizeClassicalNahuatlTransitiveVncMood(value = "") {
      const normalized =
        normalizeClassicalNahuatlTransitiveVncToken(value || "indicative");
      return {
        indicativo: "indicative",
        optativo: "optative",
        admonitivo: "admonitive",
      }[normalized] || normalized || "indicative";
    }
    function normalizeClassicalNahuatlTransitiveVncTense(value = "", mood = "indicative") {
      const normalized = normalizeClassicalNahuatlTransitiveVncToken(
        value || (mood === "indicative" ? "present" : "nonpast"),
      );
      return {
        presente: "present",
        habitual: "customary-present",
        imperfecto: "imperfect",
        futuro: "future",
        preterito: "preterit",
        "pretérito": "preterit",
        remoto: "distant-past",
        pasado: "past",
        "no-pasado": "nonpast",
      }[normalized] || normalized;
    }
    function getClassicalNahuatlFollowingSound(value = "") {
      const normalized = normalizeClassicalNahuatlTransitiveVncStem(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const match = normalized.match(/[a-z]/u);
      return match ? match[0] : "";
    }
    function isClassicalNahuatlTransitiveVncVowelSound(sound = "") {
      return /^[aeio]$/u.test(String(sound || "").toLowerCase());
    }
    function getClassicalNahuatlTransitiveVncInitialVowelKind(stem = "", options = {}) {
      const normalized = normalizeClassicalNahuatlTransitiveVncStem(stem);
      if (!/^[aeioāēīō]/iu.test(normalized)) {
        return "consonant-or-supportive-i";
      }
      const explicit = normalizeClassicalNahuatlTransitiveVncToken(options.initialVowelKind || "");
      if (explicit === "real" || explicit === "supportive") {
        return explicit;
      }
      if (/^[iī]/iu.test(normalized) && options.supportiveInitialI === true) {
        return "supportive";
      }
      return "real";
    }
    function omitClassicalNahuatlLesson6InitialSupportiveI(stem = "") {
      return normalizeClassicalNahuatlTransitiveVncStem(stem).replace(/^[iī]/iu, "");
    }
    function buildClassicalNahuatlTransitiveVncInitialSupportiveIFrame({
      stem = "",
      objectKind = "",
      initialVowelKind = ""
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlTransitiveVncStem(stem);
      const normalizedObjectKind = normalizeClassicalNahuatlObjectKind({
        objectKind
      });
      const resolvedInitialVowelKind = initialVowelKind || getClassicalNahuatlTransitiveVncInitialVowelKind(normalizedStem);
      const boundaryCanDrop = normalizedObjectKind === "mainline-reflexive" || normalizedObjectKind === "nonspecific-nonhuman";
      const initialSupportiveIDropped = Boolean(boundaryCanDrop && resolvedInitialVowelKind === "supportive");
      const stemRealization = initialSupportiveIDropped ? omitClassicalNahuatlLesson6InitialSupportiveI(normalizedStem) : normalizedStem;
      const supportiveISurfaceAction = initialSupportiveIDropped ? CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.DROP : resolvedInitialVowelKind === "supportive" ? CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.RETAIN : CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_SUPPORTIVE;
      const supportiveISurfaceReason = initialSupportiveIDropped ? "boundary-removes-need-for-support" : resolvedInitialVowelKind === "supportive" ? "boundary-does-not-license-supportive-i-drop" : resolvedInitialVowelKind === "real" ? "real-initial-vowel-remains" : "stem-does-not-begin-with-supportive-i";
      return {
        kind: "classical-nahuatl-transitive-vnc-initial-supportive-i-boundary-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlSupportiveIRules().filter(rule => rule.tagId === "cn-l2-syllable-structure" || rule.tagId === "cn-l7-supportive-initial-i"),
        inputStem: normalizedStem,
        stemRealization,
        objectKind: normalizedObjectKind,
        initialVowelKind: resolvedInitialVowelKind,
        boundaryCanDrop,
        initialSupportiveIDropped,
        supportiveVowel: initialSupportiveIDropped ? "i" : "",
        supportiveVowelRole: initialSupportiveIDropped ? "boundary-no-longer-needed" : "not-present-or-not-dropped",
        supportiveISurfacePolicy: CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY,
        supportiveISurfaceAction,
        supportiveISurfaceReason,
        supportiveIIsOnlyAdditionOrDeletion: false,
        dropsAfter: boundaryCanDrop ? normalizedObjectKind : "",
        realInitialVowelRemains: resolvedInitialVowelKind === "real",
        environmentRule: initialSupportiveIDropped ? "lesson-7.8-note1-initial-supportive-i-drops-after-object-boundary" : resolvedInitialVowelKind === "real" ? "lesson-7.8-note1-real-initial-vowel-remains" : "lesson-7.8-note1-initial-supportive-i-not-applicable"
      };
    }
    function getClassicalNahuatlPersonDyad(subject = "3sg", mood = "indicative", stem = "") {
      const builder = getClassicalNahuatlTransitiveVncRuntimeTarget()?.getClassicalNahuatlFiniteSubjectPersonDyad;
      if (typeof builder === "function") {
        return builder(subject, mood, {
          stem
        });
      }
      return null;
    }
    function getClassicalNahuatlTenseFrame({
      mood = "indicative",
      tense = "present",
      verbClass = ""
    } = {}) {
      const builder = getClassicalNahuatlTransitiveVncRuntimeTarget()?.getClassicalNahuatlFiniteMoodTenseFrame;
      if (typeof builder === "function") {
        return builder({
          mood,
          tense,
          verbClass
        });
      }
      return null;
    }
    function getClassicalNahuatlNumberDyad({
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      stem = ""
    } = {}) {
      const builder = getClassicalNahuatlTransitiveVncRuntimeTarget()?.getClassicalNahuatlFiniteSubjectNumberDyad;
      if (typeof builder === "function") {
        return builder({
          subject,
          mood,
          tense,
          stem
        });
      }
      return null;
    }
    function normalizeClassicalNahuatlObjectPerson(value = "") {
      const normalized = normalizeClassicalNahuatlTransitiveVncToken(value || "3sg").replace(/-/gu, "").replace(/\s+/gu, "");
      const aliases = {
        "1": "1sg",
        "1s": "1sg",
        "1sg": "1sg",
        me: "1sg",
        "1p": "1pl",
        "1pl": "1pl",
        us: "1pl",
        "2": "2sg",
        "2s": "2sg",
        "2sg": "2sg",
        "2p": "2pl",
        "2pl": "2pl",
        "3": "3sg",
        "3s": "3sg",
        "3sg": "3sg",
        "3p": "3pl",
        "3pl": "3pl",
        them: "3pl"
      };
      return aliases[normalized] || "3sg";
    }
    function normalizeClassicalNahuatlObjectKind(options = {}) {
      const raw = normalizeClassicalNahuatlTransitiveVncToken(options.objectKind || options.objectType || options.object || options.objectPerson || options.obj || "specific-projective");
      if (["ne", "shuntline-reflexive", "shuntline-reflexive-reciprocative"].includes(raw)) {
        return "shuntline-reflexive";
      }
      if (["te", "tē", "nonspecific-human", "nonspecific-projective-human"].includes(raw)) {
        return "nonspecific-human";
      }
      if (["tla", "nonspecific-nonhuman", "nonspecific-projective-nonhuman"].includes(raw)) {
        return "nonspecific-nonhuman";
      }
      if (["reflexive", "mainline-reflexive", "reciprocative", "mainline-reciprocative", "mu"].includes(raw)) {
        return "mainline-reflexive";
      }
      return "specific-projective";
    }
    function getClassicalNahuatlCarrierInitialSound(value = "") {
      return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().match(/[a-z]/u)?.[0] || "";
    }
    function hasClassicalNahuatlLesson6VowelCarrier(value = "") {
      return /[aeio]/u.test(String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase());
    }
    function buildClassicalNahuatlThirdPersonVa1SupportiveVowelFrame({
      stem = "",
      personDyad = null,
      va2 = "0"
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlTransitiveVncStem(stem);
      const normalizedVa2 = String(va2 || "0").trim();
      const personDyadValue = `${personDyad?.pers1 || ""}-${personDyad?.pers2 || ""}`;
      const leftCarrier = [personDyad?.pers1 || "", personDyad?.pers2 || ""].join("");
      const leftHasInternalVowel = hasClassicalNahuatlLesson6VowelCarrier(leftCarrier);
      const va2HasSoundedCarrier = normalizedVa2 && normalizedVa2 !== "0" && normalizedVa2 !== CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO;
      const rightCarrier = va2HasSoundedCarrier ? normalizedVa2 : normalizedStem;
      const rightCarrierSource = va2HasSoundedCarrier ? "va2" : "stem";
      const rightSound = va2HasSoundedCarrier ? getClassicalNahuatlCarrierInitialSound(normalizedVa2) : getClassicalNahuatlFollowingSound(normalizedStem);
      const stemFollowingSound = getClassicalNahuatlFollowingSound(normalizedStem);
      const rightHasInternalVowel = isClassicalNahuatlTransitiveVncVowelSound(rightSound);
      const hasInternalVowelOnEitherSide = leftHasInternalVowel || rightHasInternalVowel;
      const zeroSubjectBeforeStemConsonant = personDyadValue === "0-0" && !va2HasSoundedCarrier && stemFollowingSound && !isClassicalNahuatlTransitiveVncVowelSound(stemFollowingSound);
      const supportiveVowelPresent = zeroSubjectBeforeStemConsonant && !hasInternalVowelOnEitherSide;
      const regularKSpelling = rightSound === "e" || rightSound === "i" ? "qu" : "c";
      const selectedVa1 = supportiveVowelPresent ? "qui" : regularKSpelling;
      const supportiveISurfaceAction = supportiveVowelPresent ? CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.INSERT : CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_NEEDED;
      const supportiveISurfaceReason = supportiveVowelPresent ? "zero-subject-before-consonant-requires-support" : "internal-vowel-or-regular-k-boundary-does-not-require-support";
      return {
        kind: "classical-nahuatl-transitive-vnc-third-person-va1-supportive-vowel-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlSupportiveIRules(),
        morpheme: "/k/",
        regularMorph: "[k]",
        baseMorphSpelling: supportiveVowelPresent ? "qu" : selectedVa1,
        selectedVa1,
        selectedCarrier: selectedVa1,
        variants: ["c", "qu", "qui"],
        spellingVariants: ["c", "qu"],
        supportiveVariant: "qui",
        supportiveVowelPresent,
        supportiveVowel: supportiveVowelPresent ? "i" : "",
        supportiveVowelRole: supportiveVowelPresent ? "pronounceability-repair" : "not-present",
        supportiveVowelSource: supportiveVowelPresent ? "lesson-2-syllable-structure" : "",
        supportiveISurfacePolicy: CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY,
        supportiveISurfaceAction,
        supportiveISurfaceReason,
        supportiveIIsOnlyAdditionOrDeletion: false,
        leftCarrier,
        leftHasInternalVowel,
        rightCarrier,
        rightCarrierSource,
        rightSound,
        rightHasInternalVowel,
        hasInternalVowelOnEitherSide,
        personDyad: personDyadValue,
        stemFollowingSound,
        environmentRule: supportiveVowelPresent ? "lesson-6.4.1a-qui-supportive-i-before-consonant-with-zero-subject" : rightSound === "e" || rightSound === "i" ? "lesson-6.4.1a-qu-before-e-i-vowel" : "lesson-6.4.1a-c-regular-k-spelling"
      };
    }
    function buildClassicalNahuatlThirdPersonKObjectMorphIdentityFrame({
      objectPerson = "3sg",
      va2 = "0",
      supportiveVowelFrame = null
    } = {}) {
      const normalizedObjectPerson = normalizeClassicalNahuatlObjectPerson(objectPerson);
      return {
        kind: "classical-nahuatl-transitive-vnc-third-person-k-object-morph-identity-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlSupportiveIRules(),
        slot: "va1",
        objectPerson: normalizedObjectPerson,
        objectPersonClass: "third-person",
        objectRole: "person-and-objective-case",
        morphIdentity: "/k/",
        morphIdentityKind: "object-pronoun-va1",
        regularMorph: "[k]",
        regularSpellings: ["c", "qu"],
        supportiveSpelling: "qui",
        supportiveVowel: "i",
        supportiveVowelIsObjectIdentity: false,
        va2: String(va2 || "0"),
        selectedCarrierBeforeFinalBoundary: supportiveVowelFrame?.selectedVa1 || "",
        selectedCarrierSource: "pre-final-boundary-environment",
        finalBoundaryRealizationRequired: true,
        spellingAuthority: "Lesson 2 k-spelling after full slot order is known",
        supportVowelAuthority: "Lesson 2 supportive-i repair after full slot order is known"
      };
    }
    function getClassicalNahuatlThirdPersonVa1({
      stem = "",
      personDyad = null,
      va2 = "0"
    } = {}) {
      const supportiveVowelFrame = buildClassicalNahuatlThirdPersonVa1SupportiveVowelFrame({
        stem,
        personDyad,
        va2
      });
      const morphIdentityFrame = buildClassicalNahuatlThirdPersonKObjectMorphIdentityFrame({
        objectPerson: va2 === "0" ? "3sg" : "3pl",
        va2,
        supportiveVowelFrame
      });
      return {
        va1: supportiveVowelFrame.selectedVa1,
        rule: supportiveVowelFrame.environmentRule,
        followingSound: supportiveVowelFrame.stemFollowingSound,
        va1RightSound: supportiveVowelFrame.rightSound,
        va1RightCarrierSource: supportiveVowelFrame.rightCarrierSource,
        morphIdentityFrame,
        supportiveVowelFrame
      };
    }
    function getClassicalNahuatlThirdPluralVa2(stem = "") {
      const followingSound = getClassicalNahuatlFollowingSound(stem);
      const usesIm = isClassicalNahuatlTransitiveVncVowelSound(followingSound) || followingSound === "m" || followingSound === "p";
      return {
        va2: usesIm ? "im" : "in",
        variants: ["im", "in", "iz", "ix"],
        rule: usesIm ? "lesson-6.4.2a-im-before-vowel-m-p" : "lesson-6.4.2a-in-with-nasal-assimilation",
        followingSound
      };
    }
    function getClassicalNahuatlSpecificProjectiveObjectFrame({
      objectPerson = "3sg",
      stem = "",
      personDyad = null,
      silentSpecificObject = false
    } = {}) {
      const normalizedObjectPerson = normalizeClassicalNahuatlObjectPerson(objectPerson);
      if (normalizedObjectPerson === "3sg" && silentSpecificObject === true) {
        return {
          kind: "classical-nahuatl-transitive-vnc-object-valence-frame",
          objectKind: "specific-projective",
          valenceArity: "dyadic",
          valencePosition: "va1-va2",
          formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
          expectedNuclearClauseSlotArity: "dyadic",
          objectPerson: "3sg",
          va1: CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO,
          va2: "0",
          va1Variants: [CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO],
          va2Variants: ["0"],
          va1Carries: ["person", "objective-case"],
          va2Carries: ["number"],
          trajectory: "projective",
          specificity: "specific",
          prominence: "mainline",
          caseFeature: "objective",
          pronounClass: "personal-pronoun",
          objectLabel: "silently present third singular object",
          objectRule: "lesson-18.8-silently-present-third-singular-object",
          silentSpecificObject: true,
          sourceAuthority: "Andrews transcription"
        };
      }
      const base = CLASSICAL_NAHUATL_LESSON6_PROJECTIVE_OBJECTS[normalizedObjectPerson];
      if (base) {
        return {
          kind: "classical-nahuatl-transitive-vnc-object-valence-frame",
          objectKind: "specific-projective",
          valenceArity: "dyadic",
          valencePosition: "va1-va2",
          formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
          expectedNuclearClauseSlotArity: "dyadic",
          objectPerson: normalizedObjectPerson,
          va1: base.va1,
          va2: base.va2,
          va1Variants: [base.va1],
          va2Variants: [base.va2],
          va1Carries: Array.from(base.va1Carries),
          va2Carries: Array.from(base.va2Carries),
          trajectory: "projective",
          specificity: "specific",
          prominence: "mainline",
          caseFeature: "objective",
          pronounClass: "personal-pronoun",
          objectLabel: base.gloss,
          objectRule: "lesson-6.4-nonthird-projective-object",
          sourceAuthority: "Andrews transcription"
        };
      }
      if (normalizedObjectPerson === "3pl") {
        const thirdVa2 = getClassicalNahuatlThirdPluralVa2(stem);
        const thirdVa1 = getClassicalNahuatlThirdPersonVa1({
          stem,
          personDyad,
          va2: thirdVa2.va2
        });
        return {
          kind: "classical-nahuatl-transitive-vnc-object-valence-frame",
          objectKind: "specific-projective",
          valenceArity: "dyadic",
          valencePosition: "va1-va2",
          formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
          expectedNuclearClauseSlotArity: "dyadic",
          objectPerson: "3pl",
          va1: thirdVa1.va1,
          va2: thirdVa2.va2,
          va1Variants: ["qu"],
          va2Variants: thirdVa2.variants,
          va1Carries: ["person", "objective-case"],
          va2Carries: ["number"],
          trajectory: "projective",
          specificity: "specific",
          prominence: "mainline",
          caseFeature: "objective",
          pronounClass: "personal-pronoun",
          objectLabel: "them",
          objectRule: thirdVa2.rule,
          va1Rule: thirdVa1.rule,
          va1MorphIdentityFrame: thirdVa1.morphIdentityFrame,
          va1MorphIdentity: thirdVa1.morphIdentityFrame.morphIdentity,
          va1MorphIdentityKind: thirdVa1.morphIdentityFrame.morphIdentityKind,
          va1RegularSpellings: thirdVa1.morphIdentityFrame.regularSpellings,
          va1SupportiveSpelling: thirdVa1.morphIdentityFrame.supportiveSpelling,
          va1FinalBoundaryRealizationRequired: thirdVa1.morphIdentityFrame.finalBoundaryRealizationRequired,
          va1BaseMorphSpelling: thirdVa1.supportiveVowelFrame.baseMorphSpelling,
          va1SupportiveVowelPresent: thirdVa1.supportiveVowelFrame.supportiveVowelPresent,
          va1SupportiveVowel: thirdVa1.supportiveVowelFrame.supportiveVowel,
          va1SupportiveISurfacePolicy: thirdVa1.supportiveVowelFrame.supportiveISurfacePolicy,
          va1SupportiveISurfaceAction: thirdVa1.supportiveVowelFrame.supportiveISurfaceAction,
          va1SupportiveISurfaceReason: thirdVa1.supportiveVowelFrame.supportiveISurfaceReason,
          va1SupportiveIIsOnlyAdditionOrDeletion: thirdVa1.supportiveVowelFrame.supportiveIIsOnlyAdditionOrDeletion,
          va1RightSound: thirdVa1.va1RightSound,
          va1RightCarrierSource: thirdVa1.va1RightCarrierSource,
          supportiveVowelFrame: thirdVa1.supportiveVowelFrame,
          followingSound: thirdVa2.followingSound,
          sourceAuthority: "Andrews transcription"
        };
      }
      const thirdVa1 = getClassicalNahuatlThirdPersonVa1({
        stem,
        personDyad,
        va2: "0"
      });
      return {
        kind: "classical-nahuatl-transitive-vnc-object-valence-frame",
        objectKind: "specific-projective",
        valenceArity: "dyadic",
        valencePosition: "va1-va2",
        formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
        expectedNuclearClauseSlotArity: "dyadic",
        objectPerson: "3sg",
        va1: thirdVa1.va1,
        va2: "0",
        va1Variants: ["c", "qu", "qui"],
        va2Variants: ["0"],
        va1Carries: ["person", "objective-case"],
        va2Carries: ["number"],
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        caseFeature: "objective",
        pronounClass: "personal-pronoun",
        objectLabel: "third singular object",
        objectRule: thirdVa1.rule,
        va1Rule: thirdVa1.rule,
        va1MorphIdentityFrame: thirdVa1.morphIdentityFrame,
        va1MorphIdentity: thirdVa1.morphIdentityFrame.morphIdentity,
        va1MorphIdentityKind: thirdVa1.morphIdentityFrame.morphIdentityKind,
        va1RegularSpellings: thirdVa1.morphIdentityFrame.regularSpellings,
        va1SupportiveSpelling: thirdVa1.morphIdentityFrame.supportiveSpelling,
        va1FinalBoundaryRealizationRequired: thirdVa1.morphIdentityFrame.finalBoundaryRealizationRequired,
        va1BaseMorphSpelling: thirdVa1.supportiveVowelFrame.baseMorphSpelling,
        va1SupportiveVowelPresent: thirdVa1.supportiveVowelFrame.supportiveVowelPresent,
        va1SupportiveVowel: thirdVa1.supportiveVowelFrame.supportiveVowel,
        va1SupportiveISurfacePolicy: thirdVa1.supportiveVowelFrame.supportiveISurfacePolicy,
        va1SupportiveISurfaceAction: thirdVa1.supportiveVowelFrame.supportiveISurfaceAction,
        va1SupportiveISurfaceReason: thirdVa1.supportiveVowelFrame.supportiveISurfaceReason,
        va1SupportiveIIsOnlyAdditionOrDeletion: thirdVa1.supportiveVowelFrame.supportiveIIsOnlyAdditionOrDeletion,
        va1RightSound: thirdVa1.va1RightSound,
        va1RightCarrierSource: thirdVa1.va1RightCarrierSource,
        supportiveVowelFrame: thirdVa1.supportiveVowelFrame,
        followingSound: thirdVa1.followingSound,
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlMainlineReflexiveObjectFrame({
      subject = "3sg",
      stem = "",
      supportiveInitialI = false,
      initialVowelKind = ""
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlTransitiveVncSubject(subject);
      const supportiveInitialIFrame = buildClassicalNahuatlTransitiveVncInitialSupportiveIFrame({
        stem,
        objectKind: "mainline-reflexive",
        initialVowelKind: initialVowelKind || getClassicalNahuatlTransitiveVncInitialVowelKind(stem, {
          supportiveInitialI
        })
      });
      const followingSound = getClassicalNahuatlFollowingSound(supportiveInitialIFrame.stemRealization);
      const va1 = normalizedSubject === "1sg" ? "n" : normalizedSubject === "1pl" ? "t" : "m";
      const va2 = supportiveInitialIFrame.initialVowelKind === "real" ? CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO : isClassicalNahuatlTransitiveVncVowelSound(followingSound) ? CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO : "o";
      return {
        kind: "classical-nahuatl-transitive-vnc-object-valence-frame",
        objectKind: "mainline-reflexive",
        valenceArity: "dyadic",
        valencePosition: "va1-va2",
        formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
        expectedNuclearClauseSlotArity: "dyadic",
        subject: normalizedSubject,
        objectPerson: normalizedSubject.startsWith("1") ? normalizedSubject : "nonfirst-common",
        va1,
        va2,
        va1Variants: ["n", "t", "m"],
        va2Variants: ["o", CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO],
        alternateObjectDyads: [`${va1}-o`, `${va1}-${CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO}`],
        va1Carries: ["person", "number"],
        va2Carries: ["objective-case"],
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "mainline",
        caseFeature: "objective",
        pronounClass: "personal-pronoun",
        pluralMayBeReciprocal: normalizedSubject.endsWith("pl"),
        objectReflectsSubject: true,
        objectRule: va2 === CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO ? "lesson-6.6.2-square-zero-before-vowel" : "lesson-6.6.2-o-before-consonant",
        stemRealization: supportiveInitialIFrame.stemRealization,
        initialVowelKind: supportiveInitialIFrame.initialVowelKind,
        initialSupportiveIDropped: supportiveInitialIFrame.initialSupportiveIDropped,
        initialSupportiveISurfacePolicy: supportiveInitialIFrame.supportiveISurfacePolicy,
        initialSupportiveISurfaceAction: supportiveInitialIFrame.supportiveISurfaceAction,
        initialSupportiveISurfaceReason: supportiveInitialIFrame.supportiveISurfaceReason,
        initialSupportiveIIsOnlyAdditionOrDeletion: supportiveInitialIFrame.supportiveIIsOnlyAdditionOrDeletion,
        initialSupportiveIFrame: supportiveInitialIFrame,
        followingSound,
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlMonadicObjectFrame(objectKind = "nonspecific-human", options = {}) {
      const selected = CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS[objectKind] || CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS["nonspecific-human"];
      const supportiveInitialIFrame = buildClassicalNahuatlTransitiveVncInitialSupportiveIFrame({
        stem: options.stem || "",
        objectKind: selected.id,
        initialVowelKind: getClassicalNahuatlTransitiveVncInitialVowelKind(options.stem || "", options)
      });
      return {
        kind: "classical-nahuatl-transitive-vnc-object-valence-frame",
        objectKind: selected.id,
        ...selected,
        valenceArity: "monadic",
        valencePosition: "va",
        formulaTemplate: CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE,
        expectedNuclearClauseSlotArity: "monadic",
        vaVariants: selected.id === "nonspecific-nonhuman" ? ["tla"] : [selected.va],
        caseFeature: "objective",
        objectRule: `lesson-6.2-${selected.id}`,
        stemRealization: supportiveInitialIFrame.stemRealization,
        initialVowelKind: supportiveInitialIFrame.initialVowelKind,
        initialSupportiveIDropped: supportiveInitialIFrame.initialSupportiveIDropped,
        initialSupportiveISurfacePolicy: supportiveInitialIFrame.supportiveISurfacePolicy,
        initialSupportiveISurfaceAction: supportiveInitialIFrame.supportiveISurfaceAction,
        initialSupportiveISurfaceReason: supportiveInitialIFrame.supportiveISurfaceReason,
        initialSupportiveIIsOnlyAdditionOrDeletion: supportiveInitialIFrame.supportiveIIsOnlyAdditionOrDeletion,
        initialSupportiveIFrame: supportiveInitialIFrame,
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlObjectValenceFrame(options = {}) {
      const objectKind = normalizeClassicalNahuatlObjectKind(options);
      if (objectKind === "mainline-reflexive") {
        return getClassicalNahuatlMainlineReflexiveObjectFrame({
          subject: options.subject,
          stem: options.stem,
          supportiveInitialI: options.supportiveInitialI === true,
          initialVowelKind: options.initialVowelKind
        });
      }
      if (objectKind !== "specific-projective") {
        return getClassicalNahuatlMonadicObjectFrame(objectKind, options);
      }
      return getClassicalNahuatlSpecificProjectiveObjectFrame({
        objectPerson: options.objectPerson || options.object || options.obj || "3sg",
        stem: options.stem,
        personDyad: options.personDyad,
        silentSpecificObject: options.silentSpecificObject === true
      });
    }
    function buildClassicalNahuatlFormulaRuleFrame({
      stem = "",
      objectFrame = null,
      nuclearClauseResult = null,
      personDyad = null,
      tenseFrame = null,
      numberDyad = null
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlTransitiveVncStem(stem);
      const valenceArity = objectFrame?.valenceArity || "dyadic";
      const formulaTemplate = valenceArity === "monadic" ? CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE : CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE;
      const runtimeTarget = getClassicalNahuatlTransitiveVncRuntimeTarget();
      const nuclearClauseAuthorized = Boolean(
        typeof runtimeTarget?.isClassicalNahuatlNuclearClauseResult === "function"
        && runtimeTarget.isClassicalNahuatlNuclearClauseResult(nuclearClauseResult)
        && nuclearClauseResult.clauseKind === "verbal-nuclear-clause"
        && nuclearClauseResult.transitivity === "transitive"
        && nuclearClauseResult.slotArity === valenceArity
      );
      return {
        kind: "classical-nahuatl-transitive-vnc-transitive-vnc-formula-rule-frame",
        lesson: "Andrews Lesson 6",
        section: valenceArity === "monadic" ? "6.1-6.2" : "6.1, 6.3",
        ruleLogicRole: "transitive-vnc-formula-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlFormulaRules(),
        inputRole: "stem-only",
        stem: normalizedStem,
        formulaTemplate,
        formulaRealization: realizeClassicalNahuatlLesson6Formula({
          stem: normalizedStem,
          personDyad,
          tenseFrame,
          numberDyad,
          objectFrame
        }),
        clauseKind: "verbal-nuclear-clause",
        transitivity: "transitive",
        valenceArity,
        valencePosition: objectFrame?.valencePosition || "",
        nuclearClauseResultKind: nuclearClauseResult?.kind || "",
        authorizationStatus: nuclearClauseAuthorized ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
      };
    }
    function buildClassicalNahuatlObjectCategoryRuleFrame(objectFrame = null) {
      const authorized = Boolean(objectFrame?.caseFeature === "objective" && objectFrame?.trajectory && objectFrame?.specificity && objectFrame?.prominence);
      return {
        kind: "classical-nahuatl-transitive-vnc-object-category-rule-frame",
        lesson: "Andrews Lesson 6",
        section: "6.1",
        ruleLogicRole: "objective-pronoun-category-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlObjectCategoryRules(),
        caseFeature: objectFrame?.caseFeature || "",
        trajectory: objectFrame?.trajectory || "",
        specificity: objectFrame?.specificity || "",
        prominence: objectFrame?.prominence || "",
        pronounClass: objectFrame?.pronounClass || "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
      };
    }
    function buildClassicalNahuatlObjectFillerRuleFrame(objectFrame = null) {
      const baseRuleRefs = objectFrame?.valenceArity === "monadic" ? getClassicalNahuatlMonadicRules() : objectFrame?.objectKind === "mainline-reflexive" ? getClassicalNahuatlReflexiveRules() : getClassicalNahuatlDyadicProjectiveRules();
      const ruleRefs = [...baseRuleRefs, ...(objectFrame?.supportiveVowelFrame?.ruleRefs || []), ...(objectFrame?.initialSupportiveIFrame?.ruleRefs || [])];
      const hasMonadicFiller = objectFrame?.valenceArity === "monadic" && Boolean(objectFrame?.va);
      const hasDyadicFiller = objectFrame?.valenceArity === "dyadic" && Boolean(objectFrame?.va1 && objectFrame?.va2);
      return {
        kind: "classical-nahuatl-transitive-vnc-object-filler-rule-frame",
        lesson: "Andrews Lesson 6",
        section: objectFrame?.valenceArity === "monadic" ? "6.2" : objectFrame?.objectKind === "mainline-reflexive" ? "6.6-6.7" : "6.4-6.5",
        ruleLogicRole: "objective-valence-filler-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs,
        objectFrameKind: objectFrame?.kind || "",
        objectKind: objectFrame?.objectKind || "",
        valenceArity: objectFrame?.valenceArity || "",
        valencePosition: objectFrame?.valencePosition || "",
        va: objectFrame?.va || "",
        va1: objectFrame?.va1 || "",
        va2: objectFrame?.va2 || "",
        va1Rule: objectFrame?.va1Rule || "",
        va1SupportiveVowelPresent: objectFrame?.va1SupportiveVowelPresent === true,
        va1SupportiveVowel: objectFrame?.va1SupportiveVowel || "",
        va1SupportiveISurfacePolicy: objectFrame?.va1SupportiveISurfacePolicy || "",
        va1SupportiveISurfaceAction: objectFrame?.va1SupportiveISurfaceAction || "",
        va1SupportiveISurfaceReason: objectFrame?.va1SupportiveISurfaceReason || "",
        va1SupportiveIIsOnlyAdditionOrDeletion: objectFrame?.va1SupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        va1RightCarrierSource: objectFrame?.va1RightCarrierSource || "",
        va1RightSound: objectFrame?.va1RightSound || "",
        stemRealization: objectFrame?.stemRealization || "",
        initialVowelKind: objectFrame?.initialVowelKind || "",
        initialSupportiveIDropped: objectFrame?.initialSupportiveIDropped === true,
        initialSupportiveISurfacePolicy: objectFrame?.initialSupportiveISurfacePolicy || "",
        initialSupportiveISurfaceAction: objectFrame?.initialSupportiveISurfaceAction || "",
        initialSupportiveISurfaceReason: objectFrame?.initialSupportiveISurfaceReason || "",
        initialSupportiveIIsOnlyAdditionOrDeletion: objectFrame?.initialSupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        va1Carries: objectFrame?.va1Carries || [],
        va2Carries: objectFrame?.va2Carries || [],
        objectRule: objectFrame?.objectRule || "",
        authorizationStatus: hasMonadicFiller || hasDyadicFiller ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
      };
    }
    function realizeClassicalNahuatlLesson6Formula({
      stem = "",
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      objectFrame = null
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlTransitiveVncStem(stem);
      const realizedStem = objectFrame?.stemRealization || normalizedStem;
      const person = `${personDyad?.pers1 || "0"}-${personDyad?.pers2 || "0"}`;
      const tense = tenseFrame?.tns || "0";
      const number = `${numberDyad?.num1 || "0"}-${numberDyad?.num2 || "0"}`;
      if (objectFrame?.valenceArity === "monadic") {
        return `#${person}+${objectFrame.va || "va"}(${realizedStem || "STEM"})${tense}+${number}#`;
      }
      return `#${person}+${objectFrame?.va1 || "va1"}-${objectFrame?.va2 || "va2"}(${realizedStem || "STEM"})${tense}+${number}#`;
    }
    function getClassicalNahuatlNuclearClauseResult(stem = "", objectFrame = null, options = {}) {
      const builder = getClassicalNahuatlTransitiveVncRuntimeTarget()?.buildClassicalNahuatlNuclearClauseResult;
      if (typeof builder === "function") {
        return builder(stem, {
          tenseMode: options.tenseMode || options.mode || "verbo",
          nuclearClauseKind: "verbal-nuclear-clause",
          transitivity: "transitive",
          valenceArity: objectFrame?.valenceArity || "dyadic"
        });
      }
      return null;
    }
    function buildClassicalNahuatlTransitiveVncLogicProofFrame({
      nuclearClauseResult = null,
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      objectFrame = null,
      formulaRuleFrame = null,
      objectCategoryRuleFrame = null,
      objectFillerRuleFrame = null,
      formulaRealization = ""
    } = {}) {
      const runtimeTarget = getClassicalNahuatlTransitiveVncRuntimeTarget();
      const nuclearClauseAuthorized = Boolean(
        typeof runtimeTarget?.isClassicalNahuatlNuclearClauseResult === "function"
        && runtimeTarget.isClassicalNahuatlNuclearClauseResult(nuclearClauseResult)
        && nuclearClauseResult.clauseKind === "verbal-nuclear-clause"
        && nuclearClauseResult.transitivity === "transitive"
        && nuclearClauseResult.slotArity === objectFrame?.valenceArity
      );
      const personDyadValid = Boolean(personDyad?.pers1 && personDyad?.pers2 === "0");
      const tenseValid = Boolean(tenseFrame?.tns != null && tenseFrame?.tns !== "");
      const numberDyadValid = Boolean(numberDyad?.num1 != null && numberDyad?.num2 != null);
      const formulaValid = formulaRuleFrame?.authorizationStatus === "authorized";
      const categoryValid = objectCategoryRuleFrame?.authorizationStatus === "authorized";
      const fillerValid = objectFillerRuleFrame?.authorizationStatus === "authorized";
      const authorized = Boolean(nuclearClauseAuthorized && personDyadValid && tenseValid && numberDyadValid && formulaValid && categoryValid && fillerValid);
      return {
        kind: "classical-nahuatl-transitive-vnc-logic-proof-frame",
        lesson: "Andrews Lesson 6",
        proofKind: "logic-proof",
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleFrameKinds: [formulaRuleFrame?.kind || "", objectCategoryRuleFrame?.kind || "", objectFillerRuleFrame?.kind || ""].filter(Boolean),
        premises: [{
          layer: "nuclear-clause-source",
          rule: "Transitive object filling consumes the owner-issued transitive nuclear-clause Source result.",
          passed: nuclearClauseAuthorized,
          resultKind: nuclearClauseResult?.kind || ""
        }, {
          lesson: "Andrews Lesson 6",
          layer: "transitive-vnc-domain",
          rule: "Lesson 6 applies only to VNC formulas with an objective Valence position.",
          passed: nuclearClauseAuthorized && formulaValid,
          clauseKind: nuclearClauseResult?.clauseKind || "",
          valencePosition: objectFrame?.valencePosition || "",
          legalWitnessTagId: "cn-l6-transitive-vnc-formulas",
          ruleFrameKind: formulaRuleFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 5",
          layer: "subject-person-dyad",
          rule: "Lesson 6 reuses the Lesson 5 subject pers1-pers2 filler.",
          passed: personDyadValid,
          pers1: personDyad?.pers1 || "",
          pers2: personDyad?.pers2 || ""
        }, {
          lesson: "Andrews Lesson 5",
          layer: "predicate-tense-and-subject-number",
          rule: "Lesson 6 reuses Lesson 5 tense and final subject-number fillers.",
          passed: tenseValid && numberDyadValid,
          tns: tenseFrame?.tns || "",
          num1: numberDyad?.num1 || "",
          num2: numberDyad?.num2 || ""
        }, {
          lesson: "Andrews Lesson 6",
          layer: "objective-pronoun-categories",
          rule: "The object must carry objective case plus trajectory, specificity, and prominence.",
          passed: categoryValid,
          legalWitnessTagId: "cn-l6-object-pronoun-categories",
          ruleFrameKind: objectCategoryRuleFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 6",
          layer: "objective-valence-filler",
          rule: "The object filler must match the monadic or dyadic Valence position authorized by Transcription.",
          passed: fillerValid,
          va: objectFrame?.va || "",
          va1: objectFrame?.va1 || "",
          va2: objectFrame?.va2 || "",
          va1Rule: objectFrame?.va1Rule || "",
          va1SupportiveVowelPresent: objectFrame?.va1SupportiveVowelPresent === true,
          va1SupportiveISurfaceAction: objectFrame?.va1SupportiveISurfaceAction || "",
          va1RightCarrierSource: objectFrame?.va1RightCarrierSource || "",
          stemRealization: objectFrame?.stemRealization || "",
          initialVowelKind: objectFrame?.initialVowelKind || "",
          initialSupportiveIDropped: objectFrame?.initialSupportiveIDropped === true,
          initialSupportiveISurfaceAction: objectFrame?.initialSupportiveISurfaceAction || "",
          legalWitnessTagId: objectFrame?.valenceArity === "monadic" ? "cn-l6-monadic-valence-position" : objectFrame?.objectKind === "mainline-reflexive" ? "cn-l6-mainline-reflexive-fillers" : "cn-l6-projective-object-fillers",
          ruleFrameKind: objectFillerRuleFrame?.kind || ""
        }],
        conclusion: {
          authorized,
          formulaTemplate: authorized ? objectFrame?.formulaTemplate || "" : "",
          formulaRealization: authorized ? formulaRealization : "",
          subject: authorized ? personDyad?.subject || "" : "",
          objectKind: authorized ? objectFrame?.objectKind || "" : "",
          objectPerson: authorized ? objectFrame?.objectPerson || "" : "",
          valencePosition: authorized ? objectFrame?.valencePosition || "" : "",
          mood: authorized ? tenseFrame?.mood || "" : "",
          tense: authorized ? tenseFrame?.tense || "" : ""
        }
      };
    }
    function buildClassicalNahuatlTransitiveVncSelectedOutputLogicFrame({
      proofFrame = null,
      inputStem = "",
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      objectFrame = null,
      formulaRuleFrame = null,
      objectCategoryRuleFrame = null,
      objectFillerRuleFrame = null
    } = {}) {
      const authorized = proofFrame?.conclusion?.authorized === true;
      const normalizedStem = normalizeClassicalNahuatlTransitiveVncStem(inputStem);
      const outputFillers = authorized ? {
        pers1: personDyad?.pers1 || "",
        pers2: personDyad?.pers2 || "",
        va: objectFrame?.va || "",
        va1: objectFrame?.va1 || "",
        va2: objectFrame?.va2 || "",
        objectRule: objectFrame?.objectRule || "",
        va1Rule: objectFrame?.va1Rule || "",
        va1MorphIdentityFrame: objectFrame?.va1MorphIdentityFrame || null,
        va1MorphIdentity: objectFrame?.va1MorphIdentity || "",
        va1MorphIdentityKind: objectFrame?.va1MorphIdentityKind || "",
        va1RegularSpellings: objectFrame?.va1RegularSpellings || [],
        va1SupportiveSpelling: objectFrame?.va1SupportiveSpelling || "",
        va1FinalBoundaryRealizationRequired: objectFrame?.va1FinalBoundaryRealizationRequired === true,
        va1BaseMorphSpelling: objectFrame?.va1BaseMorphSpelling || "",
        va1SupportiveVowelPresent: objectFrame?.va1SupportiveVowelPresent === true,
        va1SupportiveVowel: objectFrame?.va1SupportiveVowel || "",
        va1SupportiveISurfacePolicy: objectFrame?.va1SupportiveISurfacePolicy || "",
        va1SupportiveISurfaceAction: objectFrame?.va1SupportiveISurfaceAction || "",
        va1SupportiveISurfaceReason: objectFrame?.va1SupportiveISurfaceReason || "",
        va1SupportiveIIsOnlyAdditionOrDeletion: objectFrame?.va1SupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        va1RightCarrierSource: objectFrame?.va1RightCarrierSource || "",
        va1RightSound: objectFrame?.va1RightSound || "",
        stemRealization: objectFrame?.stemRealization || normalizedStem,
        initialVowelKind: objectFrame?.initialVowelKind || "",
        initialSupportiveIDropped: objectFrame?.initialSupportiveIDropped === true,
        initialSupportiveISurfacePolicy: objectFrame?.initialSupportiveISurfacePolicy || "",
        initialSupportiveISurfaceAction: objectFrame?.initialSupportiveISurfaceAction || "",
        initialSupportiveISurfaceReason: objectFrame?.initialSupportiveISurfaceReason || "",
        initialSupportiveIIsOnlyAdditionOrDeletion: objectFrame?.initialSupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        tns: tenseFrame?.tns || "",
        num1: numberDyad?.num1 || "",
        num2: numberDyad?.num2 || "",
        num1VariantRule: numberDyad?.num1VariantRule || "",
        num1VariantNote: numberDyad?.num1VariantNote || "",
        numberConditioningStem: numberDyad?.conditioningStem || "",
        numberStemFinalSound: numberDyad?.stemFinalSound || "",
        numberStemFinalSoundKind: numberDyad?.stemFinalSoundKind || ""
      } : {};
      return {
        kind: "classical-nahuatl-transitive-vnc-selected-output-logic-frame",
        lesson: "Andrews Lesson 6",
        logicRole: "selected-output-logic",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        authorizationStatus: authorized ? "authorized" : "blocked",
        inputRole: "stem-only",
        inputStem: normalizedStem,
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS],
        selectedFormulaRole: authorized ? "selected-output-instance" : "",
        selectedFormula: authorized ? proofFrame.conclusion.formulaRealization : "",
        outputFillers,
        ruleFrameKinds: authorized ? [formulaRuleFrame?.kind || "", objectCategoryRuleFrame?.kind || "", objectFillerRuleFrame?.kind || ""].filter(Boolean) : [],
        legalWitnessTagIds: authorized ? Array.from(new Set([...(formulaRuleFrame?.ruleRefs || []), ...(objectCategoryRuleFrame?.ruleRefs || []), ...(objectFillerRuleFrame?.ruleRefs || [])].map(rule => rule.tagId).filter(Boolean))) : [],
        steps: authorized ? [{
          layer: "input-stem",
          role: "input",
          value: normalizedStem
        }, {
          layer: "subject-person-dyad",
          role: "outputable",
          value: `${outputFillers.pers1}-${outputFillers.pers2}`
        }, {
          layer: "objective-valence",
          role: "outputable",
          value: objectFrame?.valenceArity === "monadic" ? outputFillers.va : `${outputFillers.va1}-${outputFillers.va2}`,
          rule: outputFillers.objectRule,
          va1Rule: outputFillers.va1Rule,
          va1MorphIdentity: outputFillers.va1MorphIdentity,
          va1RegularSpellings: outputFillers.va1RegularSpellings,
          va1SupportiveSpelling: outputFillers.va1SupportiveSpelling,
          va1FinalBoundaryRealizationRequired: outputFillers.va1FinalBoundaryRealizationRequired,
          va1BaseMorphSpelling: outputFillers.va1BaseMorphSpelling,
          va1SupportiveVowelPresent: outputFillers.va1SupportiveVowelPresent,
          va1SupportiveISurfacePolicy: outputFillers.va1SupportiveISurfacePolicy,
          va1SupportiveISurfaceAction: outputFillers.va1SupportiveISurfaceAction,
          va1SupportiveISurfaceReason: outputFillers.va1SupportiveISurfaceReason,
          va1SupportiveIIsOnlyAdditionOrDeletion: outputFillers.va1SupportiveIIsOnlyAdditionOrDeletion,
          va1RightCarrierSource: outputFillers.va1RightCarrierSource,
          va1RightSound: outputFillers.va1RightSound,
          stemRealization: outputFillers.stemRealization,
          initialVowelKind: outputFillers.initialVowelKind,
          initialSupportiveIDropped: outputFillers.initialSupportiveIDropped,
          initialSupportiveISurfacePolicy: outputFillers.initialSupportiveISurfacePolicy,
          initialSupportiveISurfaceAction: outputFillers.initialSupportiveISurfaceAction,
          initialSupportiveISurfaceReason: outputFillers.initialSupportiveISurfaceReason,
          initialSupportiveIIsOnlyAdditionOrDeletion: outputFillers.initialSupportiveIIsOnlyAdditionOrDeletion,
          ruleFrameKind: objectFillerRuleFrame?.kind || ""
        }, {
          layer: "vnc-tense-slot",
          role: "outputable",
          value: outputFillers.tns
        }, {
          layer: "subject-number-dyad",
          role: "outputable",
          value: `${outputFillers.num1}-${outputFillers.num2}`,
          rule: outputFillers.num1VariantRule,
          conditioningStem: outputFillers.numberConditioningStem,
          stemFinalSoundKind: outputFillers.numberStemFinalSoundKind
        }] : [],
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function getClassicalNahuatlObjectOptions({
      subject = "3sg",
      stem = "",
      personDyad = null
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlTransitiveVncStem(stem);
      return [getClassicalNahuatlMonadicObjectFrame("shuntline-reflexive"), getClassicalNahuatlMonadicObjectFrame("nonspecific-human"), getClassicalNahuatlMonadicObjectFrame("nonspecific-nonhuman"), ...["1sg", "1pl", "2sg", "2pl", "3sg", "3pl"].map(objectPerson => getClassicalNahuatlSpecificProjectiveObjectFrame({
        objectPerson,
        stem: normalizedStem,
        personDyad
      })), getClassicalNahuatlMainlineReflexiveObjectFrame({
        subject,
        stem: normalizedStem
      })].map(frame => ({
        id: frame.objectKind === "specific-projective" ? `specific-${frame.objectPerson}` : frame.objectKind,
        label: frame.objectLabel || frame.objectKind,
        valenceArity: frame.valenceArity,
        valencePosition: frame.valencePosition,
        output: frame.valenceArity === "monadic" ? frame.va : `${frame.va1}-${frame.va2}`,
        objectKind: frame.objectKind,
        objectPerson: frame.objectPerson || "",
        trajectory: frame.trajectory,
        specificity: frame.specificity,
        prominence: frame.prominence,
        sourceAuthority: "Andrews transcription"
      }));
    }
    function buildClassicalNahuatlTransitiveVncReceiptInventory({
      stem = "",
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      verbClass = ""
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlTransitiveVncStem(stem);
      const normalizedSubject = normalizeClassicalNahuatlTransitiveVncSubject(subject);
      const normalizedMood = normalizeClassicalNahuatlTransitiveVncMood(mood);
      const normalizedTense = normalizeClassicalNahuatlTransitiveVncTense(tense, normalizedMood);
      const personDyad = getClassicalNahuatlPersonDyad(normalizedSubject, normalizedMood, normalizedStem);
      const tenseFrame = getClassicalNahuatlTenseFrame({
        mood: normalizedMood,
        tense: normalizedTense,
        verbClass
      });
      const numberDyad = getClassicalNahuatlNumberDyad({
        subject: normalizedSubject,
        mood: normalizedMood,
        tense: normalizedTense,
        stem: normalizedStem
      });
      const formulas = getClassicalNahuatlObjectOptions({
        subject: normalizedSubject,
        stem: normalizedStem,
        personDyad
      }).map(option => {
        const objectFrame = getClassicalNahuatlObjectValenceFrame({
          objectKind: option.objectKind,
          objectPerson: option.objectPerson,
          subject: normalizedSubject,
          stem: normalizedStem,
          personDyad
        });
        return {
          objectKind: option.objectKind,
          objectPerson: option.objectPerson,
          valencePosition: option.valencePosition,
          formula: realizeClassicalNahuatlLesson6Formula({
            stem: normalizedStem,
            personDyad,
            tenseFrame,
            numberDyad,
            objectFrame
          }),
          slotSummary: {
            person: `${personDyad.pers1}-${personDyad.pers2}`,
            valence: option.output,
            tense: tenseFrame.tns,
            number: `${numberDyad.num1}-${numberDyad.num2}`
          }
        };
      });
      return {
        kind: "classical-nahuatl-transitive-vnc-display-receipt-inventory",
        receiptRole: "display-only",
        authorityRole: "not-authority",
        inputRole: "stem-only",
        inputStem: normalizedStem,
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS],
        formulaCount: formulas.length,
        formulas
      };
    }
    function buildClassicalNahuatlTransitiveVncDisplayReceiptFrame({
      proofFrame = null,
      formulaRealizationRecord = null,
      objectFrame = null,
      receiptInventory = null,
      selectedOutputLogicFrame = null
    } = {}) {
      const firstFailedPremise = Array.isArray(proofFrame?.premises) ? proofFrame.premises.find(premise => premise.passed !== true) : null;
      const authorized = proofFrame?.conclusion?.authorized === true;
      const selectedFormula = authorized ? proofFrame.conclusion.formulaRealization : "";
      return {
        kind: "classical-nahuatl-transitive-vnc-display-receipt-frame",
        lesson: "Andrews Lesson 6",
        receiptRole: "display-only",
        authorityRole: "not-authority",
        inputRole: "stem-only",
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS],
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlTransitiveVncReceiptRules(),
        mirrorsLogicProof: proofFrame?.kind || "classical-nahuatl-transitive-vnc-logic-proof-frame",
        status: proofFrame?.authorizationStatus || "blocked",
        selectedFormula,
        formula: selectedFormula,
        selectedFormulaRole: authorized ? "selected-output-instance" : "",
        selectedOutputLogicKind: authorized ? selectedOutputLogicFrame?.kind || "" : "",
        selectedOutputLogicStatus: selectedOutputLogicFrame?.authorizationStatus || "blocked",
        formulaSetCount: authorized ? receiptInventory?.formulaCount || 0 : 0,
        formulaSetSample: authorized && Array.isArray(receiptInventory?.formulas) ? receiptInventory.formulas.slice(0, 6).map(entry => entry.formula) : [],
        receiptInventoryKind: authorized ? receiptInventory?.kind || "" : "",
        blockedBy: authorized ? "" : firstFailedPremise?.layer || "logic-proof",
        slotSummary: authorized ? {
          valence: objectFrame?.valenceArity === "monadic" ? objectFrame?.va || "" : `${objectFrame?.va1 || ""}-${objectFrame?.va2 || ""}`,
          valencePosition: objectFrame?.valencePosition || "",
          objectKind: objectFrame?.objectKind || ""
        } : {},
        formulaRealizationRecordKind: formulaRealizationRecord?.kind || "",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function buildClassicalNahuatlTransitiveVncReceiptAuthorityFrame({
      proofFrame = null,
      selectedOutputLogicFrame = null,
      displayReceiptFrame = null
    } = {}) {
      const proofAuthorized = proofFrame?.conclusion?.authorized === true;
      const selectedOutputAuthorized = selectedOutputLogicFrame?.authorizationStatus === "authorized";
      const receiptMirrorsSelectedOutput = displayReceiptFrame?.selectedFormula === selectedOutputLogicFrame?.selectedFormula && displayReceiptFrame?.status === selectedOutputLogicFrame?.authorizationStatus;
      const receiptCanDisplay = Boolean(proofAuthorized && selectedOutputAuthorized && receiptMirrorsSelectedOutput);
      return {
        kind: "classical-nahuatl-transitive-vnc-receipt-authority-rule-frame",
        lesson: "Andrews Lesson 6",
        section: "6.1-6.7",
        ruleLogicRole: "display-receipt-boundary",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlTransitiveVncReceiptRules(),
        receiptRole: "display-only",
        authorityRole: "not-authority",
        proofFrameKind: proofFrame?.kind || "",
        selectedOutputLogicKind: selectedOutputLogicFrame?.kind || "",
        displayReceiptKind: displayReceiptFrame?.kind || "",
        proofAuthorized,
        selectedOutputAuthorized,
        receiptMirrorsSelectedOutput,
        receiptCanDisplay,
        receiptCannotAuthorize: true,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
      };
    }
    function buildClassicalNahuatlTransitiveVncObjectFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlTransitiveVncStem(stem);
      const subject = normalizeClassicalNahuatlTransitiveVncSubject(options.subject || options.subjectPerson || options.subj || "");
      const mood = normalizeClassicalNahuatlTransitiveVncMood(options.mood || options.sentenceMood || "");
      const tense = normalizeClassicalNahuatlTransitiveVncTense(options.tense || options.tenseKey || "", mood);
      const personDyad = getClassicalNahuatlPersonDyad(subject, mood, normalizedStem);
      const tenseFrame = getClassicalNahuatlTenseFrame({
        mood,
        tense,
        verbClass: options.verbClass || options.perfectiveClass || ""
      });
      const numberDyad = getClassicalNahuatlNumberDyad({
        subject,
        mood,
        tense,
        stem: normalizedStem
      });
      const objectFrame = getClassicalNahuatlObjectValenceFrame({
        ...options,
        subject,
        stem: normalizedStem,
        personDyad
      });
      const nuclearClauseResult = getClassicalNahuatlNuclearClauseResult(normalizedStem || stem, objectFrame, {
        ...options,
        subject,
        mood,
        tense
      });
      const formulaRealization = realizeClassicalNahuatlLesson6Formula({
        stem: normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame
      });
      const formulaRuleFrame = buildClassicalNahuatlFormulaRuleFrame({
        stem: normalizedStem,
        objectFrame,
        nuclearClauseResult,
        personDyad,
        tenseFrame,
        numberDyad
      });
      const objectCategoryRuleFrame = buildClassicalNahuatlObjectCategoryRuleFrame(objectFrame);
      const objectFillerRuleFrame = buildClassicalNahuatlObjectFillerRuleFrame(objectFrame);
      const proofFrame = buildClassicalNahuatlTransitiveVncLogicProofFrame({
        nuclearClauseResult,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame,
        formulaRuleFrame,
        objectCategoryRuleFrame,
        objectFillerRuleFrame,
        formulaRealization
      });
      const formulaRealizationRecord = {
        kind: "classical-nahuatl-transitive-vnc-formula-realization-record",
        formulaRealization: proofFrame.conclusion.formulaRealization,
        fillers: {
          pers1: proofFrame.conclusion.authorized ? personDyad.pers1 : "",
          pers2: proofFrame.conclusion.authorized ? personDyad.pers2 : "",
          valence: proofFrame.conclusion.authorized && objectFrame.valenceArity === "monadic" ? objectFrame.va : "",
          va1: proofFrame.conclusion.authorized && objectFrame.valenceArity === "dyadic" ? objectFrame.va1 : "",
          va2: proofFrame.conclusion.authorized && objectFrame.valenceArity === "dyadic" ? objectFrame.va2 : "",
          stem: proofFrame.conclusion.authorized ? objectFrame.stemRealization || normalizedStem : "",
          inputStem: proofFrame.conclusion.authorized ? normalizedStem : "",
          tns: proofFrame.conclusion.authorized ? tenseFrame.tns : "",
          num1: proofFrame.conclusion.authorized ? numberDyad.num1 : "",
          num2: proofFrame.conclusion.authorized ? numberDyad.num2 : ""
        }
      };
      const vncSlotFrameBuilder = getClassicalNahuatlTransitiveVncRuntimeTarget()?.buildClassicalNahuatlVncSlotFrame;
      const vncSlotFrame = typeof vncSlotFrameBuilder === "function" ? vncSlotFrameBuilder({
        sourceFrameKind: "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
        sourceAuthorizationStatus: proofFrame.conclusion.authorized ? "authorized" : "blocked",
        stem: objectFrame.stemRealization || normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame,
        formulaArtifact: proofFrame.conclusion.formulaRealization
      }) : null;
      const selectedOutputLogicFrame = buildClassicalNahuatlTransitiveVncSelectedOutputLogicFrame({
        proofFrame,
        inputStem: normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame,
        formulaRuleFrame,
        objectCategoryRuleFrame,
        objectFillerRuleFrame
      });
      const receiptInventory = buildClassicalNahuatlTransitiveVncReceiptInventory({
        stem: normalizedStem,
        subject,
        mood,
        tense,
        verbClass: options.verbClass || options.perfectiveClass || ""
      });
      const displayReceiptFrame = buildClassicalNahuatlTransitiveVncDisplayReceiptFrame({
        proofFrame,
        formulaRealizationRecord,
        objectFrame,
        receiptInventory,
        selectedOutputLogicFrame
      });
      const receiptAuthorityFrame = buildClassicalNahuatlTransitiveVncReceiptAuthorityFrame({
        proofFrame,
        selectedOutputLogicFrame,
        displayReceiptFrame
      });
      const ruleLogicFrames = [formulaRuleFrame, objectCategoryRuleFrame, objectFillerRuleFrame, receiptAuthorityFrame];
      const frame = {
        kind: "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
        version: CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION,
        lesson: "Andrews Lesson 6",
        lessonTitle: "The Transitive VNC Formula. Object Pronouns",
        machineryScope: "transitive-vnc-object-fillers",
        activeAuthority: "Andrews transcription",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        outputAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        sourceProfileId: CLASSICAL_NAHUATL_LESSON6_PROFILE_ID,
        targetProfileId: CLASSICAL_NAHUATL_LESSON6_PROFILE_ID,
        outputLanguage: "Classical Nahuatl",
        orthographyPolicy: "transcription-direct",
        stem: normalizedStem,
        subject,
        mood,
        tense,
        nuclearClauseResult,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame,
        formulaRuleFrame,
        objectCategoryRuleFrame,
        objectFillerRuleFrame,
        receiptAuthorityFrame,
        ruleLogicFrames,
        ruleLogicFrameKinds: ruleLogicFrames.map(frame => frame.kind),
        ruleRefs: getClassicalNahuatlTransitiveVncRuleLogicRules(),
        formulaTemplate: objectFrame.formulaTemplate,
        formulaRealization,
        formulaRecord: {
          kind: "classical-nahuatl-transitive-vnc-formula-record",
          formulaTemplate: objectFrame.formulaTemplate,
          valencePosition: objectFrame.valencePosition,
          slotOrder: objectFrame.valenceArity === "monadic" ? ["pers1", "pers2", "va", "stem", "tns", "num1", "num2"] : ["pers1", "pers2", "va1", "va2", "stem", "tns", "num1", "num2"],
          sourceAuthority: "Andrews transcription"
        },
        formulaRealizationRecord,
        vncSlotFrame,
        proofFrame,
        selectedOutputLogicFrame,
        receiptInventory,
        displayReceiptFrame,
        objectOptions: getClassicalNahuatlObjectOptions({
          subject,
          stem: normalizedStem,
          personDyad
        }),
        grammarGenerationAllowed: false,
        formulaOutputAllowed: proofFrame.conclusion.authorized,
        surfaceGenerationAllowed: false,
        blocksInput: proofFrame.conclusion.authorized !== true
      };
      classicalNahuatlLesson6IssuedTransitiveObjectFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlTransitiveVncObjectFrame(frame = null) {
      return Boolean(
        frame
        && classicalNahuatlLesson6IssuedTransitiveObjectFrames.has(frame)
        && frame.kind
          === "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame"
        && frame.version === CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION
      );
    }
    function installClassicalNahuatlTransitiveVncObjectClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlFormulaRules,
        getClassicalNahuatlObjectCategoryRules,
        getClassicalNahuatlMonadicRules,
        getClassicalNahuatlDyadicProjectiveRules,
        getClassicalNahuatlSupportiveIRules,
        getClassicalNahuatlReflexiveRules,
        getClassicalNahuatlTransitiveVncReceiptRules,
        getClassicalNahuatlTransitiveVncRuleLogicRules,
        buildClassicalNahuatlThirdPersonVa1SupportiveVowelFrame,
        buildClassicalNahuatlThirdPersonKObjectMorphIdentityFrame,
        buildClassicalNahuatlTransitiveVncInitialSupportiveIFrame,
        getClassicalNahuatlThirdPersonVa1,
        getClassicalNahuatlObjectValenceFrame,
        getClassicalNahuatlSpecificProjectiveObjectFrame,
        getClassicalNahuatlMainlineReflexiveObjectFrame,
        getClassicalNahuatlObjectOptions,
        buildClassicalNahuatlFormulaRuleFrame,
        buildClassicalNahuatlObjectCategoryRuleFrame,
        buildClassicalNahuatlObjectFillerRuleFrame,
        buildClassicalNahuatlTransitiveVncLogicProofFrame,
        buildClassicalNahuatlTransitiveVncSelectedOutputLogicFrame,
        buildClassicalNahuatlTransitiveVncReceiptInventory,
        buildClassicalNahuatlTransitiveVncDisplayReceiptFrame,
        buildClassicalNahuatlTransitiveVncReceiptAuthorityFrame,
        buildClassicalNahuatlTransitiveVncObjectFrame,
        isClassicalNahuatlTransitiveVncObjectFrame
      });
      return globalTarget;
    }
    installClassicalNahuatlTransitiveVncObjectClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_FORMULA_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_FORMULA_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_OBJECT_CATEGORY_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_OBJECT_CATEGORY_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_MONADIC_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_MONADIC_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_DYADIC_PROJECTIVE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_DYADIC_PROJECTIVE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_REFLEXIVE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_REFLEXIVE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_RECEIPT_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_RECEIPT_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_PROJECTIVE_OBJECTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_PROJECTIVE_OBJECTS; },
    });
    api.getClassicalNahuatlTransitiveVncRuntimeTarget = getClassicalNahuatlTransitiveVncRuntimeTarget;
    api.cloneClassicalNahuatlLesson6Rule = cloneClassicalNahuatlLesson6Rule;
    api.getClassicalNahuatlFormulaRules = getClassicalNahuatlFormulaRules;
    api.getClassicalNahuatlObjectCategoryRules = getClassicalNahuatlObjectCategoryRules;
    api.getClassicalNahuatlMonadicRules = getClassicalNahuatlMonadicRules;
    api.getClassicalNahuatlDyadicProjectiveRules = getClassicalNahuatlDyadicProjectiveRules;
    api.getClassicalNahuatlSupportiveIRules = getClassicalNahuatlSupportiveIRules;
    api.getClassicalNahuatlReflexiveRules = getClassicalNahuatlReflexiveRules;
    api.getClassicalNahuatlTransitiveVncReceiptRules = getClassicalNahuatlTransitiveVncReceiptRules;
    api.getClassicalNahuatlTransitiveVncRuleLogicRules = getClassicalNahuatlTransitiveVncRuleLogicRules;
    api.normalizeClassicalNahuatlTransitiveVncToken = normalizeClassicalNahuatlTransitiveVncToken;
    api.normalizeClassicalNahuatlTransitiveVncStem = normalizeClassicalNahuatlTransitiveVncStem;
    api.normalizeClassicalNahuatlTransitiveVncSubject = normalizeClassicalNahuatlTransitiveVncSubject;
    api.normalizeClassicalNahuatlTransitiveVncMood = normalizeClassicalNahuatlTransitiveVncMood;
    api.normalizeClassicalNahuatlTransitiveVncTense = normalizeClassicalNahuatlTransitiveVncTense;
    api.getClassicalNahuatlFollowingSound = getClassicalNahuatlFollowingSound;
    api.isClassicalNahuatlTransitiveVncVowelSound = isClassicalNahuatlTransitiveVncVowelSound;
    api.getClassicalNahuatlTransitiveVncInitialVowelKind = getClassicalNahuatlTransitiveVncInitialVowelKind;
    api.omitClassicalNahuatlLesson6InitialSupportiveI = omitClassicalNahuatlLesson6InitialSupportiveI;
    api.buildClassicalNahuatlTransitiveVncInitialSupportiveIFrame = buildClassicalNahuatlTransitiveVncInitialSupportiveIFrame;
    api.getClassicalNahuatlPersonDyad = getClassicalNahuatlPersonDyad;
    api.getClassicalNahuatlTenseFrame = getClassicalNahuatlTenseFrame;
    api.getClassicalNahuatlNumberDyad = getClassicalNahuatlNumberDyad;
    api.normalizeClassicalNahuatlObjectPerson = normalizeClassicalNahuatlObjectPerson;
    api.normalizeClassicalNahuatlObjectKind = normalizeClassicalNahuatlObjectKind;
    api.getClassicalNahuatlCarrierInitialSound = getClassicalNahuatlCarrierInitialSound;
    api.hasClassicalNahuatlLesson6VowelCarrier = hasClassicalNahuatlLesson6VowelCarrier;
    api.buildClassicalNahuatlThirdPersonVa1SupportiveVowelFrame = buildClassicalNahuatlThirdPersonVa1SupportiveVowelFrame;
    api.buildClassicalNahuatlThirdPersonKObjectMorphIdentityFrame = buildClassicalNahuatlThirdPersonKObjectMorphIdentityFrame;
    api.getClassicalNahuatlThirdPersonVa1 = getClassicalNahuatlThirdPersonVa1;
    api.getClassicalNahuatlThirdPluralVa2 = getClassicalNahuatlThirdPluralVa2;
    api.getClassicalNahuatlSpecificProjectiveObjectFrame = getClassicalNahuatlSpecificProjectiveObjectFrame;
    api.getClassicalNahuatlMainlineReflexiveObjectFrame = getClassicalNahuatlMainlineReflexiveObjectFrame;
    api.getClassicalNahuatlMonadicObjectFrame = getClassicalNahuatlMonadicObjectFrame;
    api.getClassicalNahuatlObjectValenceFrame = getClassicalNahuatlObjectValenceFrame;
    api.buildClassicalNahuatlFormulaRuleFrame = buildClassicalNahuatlFormulaRuleFrame;
    api.buildClassicalNahuatlObjectCategoryRuleFrame = buildClassicalNahuatlObjectCategoryRuleFrame;
    api.buildClassicalNahuatlObjectFillerRuleFrame = buildClassicalNahuatlObjectFillerRuleFrame;
    api.realizeClassicalNahuatlLesson6Formula = realizeClassicalNahuatlLesson6Formula;
    api.getClassicalNahuatlNuclearClauseResult = getClassicalNahuatlNuclearClauseResult;
    api.buildClassicalNahuatlTransitiveVncLogicProofFrame = buildClassicalNahuatlTransitiveVncLogicProofFrame;
    api.buildClassicalNahuatlTransitiveVncSelectedOutputLogicFrame = buildClassicalNahuatlTransitiveVncSelectedOutputLogicFrame;
    api.getClassicalNahuatlObjectOptions = getClassicalNahuatlObjectOptions;
    api.buildClassicalNahuatlTransitiveVncReceiptInventory = buildClassicalNahuatlTransitiveVncReceiptInventory;
    api.buildClassicalNahuatlTransitiveVncDisplayReceiptFrame = buildClassicalNahuatlTransitiveVncDisplayReceiptFrame;
    api.buildClassicalNahuatlTransitiveVncReceiptAuthorityFrame = buildClassicalNahuatlTransitiveVncReceiptAuthorityFrame;
    api.buildClassicalNahuatlTransitiveVncObjectFrame = buildClassicalNahuatlTransitiveVncObjectFrame;
    api.isClassicalNahuatlTransitiveVncObjectFrame = isClassicalNahuatlTransitiveVncObjectFrame;
    api.installClassicalNahuatlTransitiveVncObjectClassicGlobals = installClassicalNahuatlTransitiveVncObjectClassicGlobals;
    return api;
}

export function installClassicalNahuatlTransitiveVncObjectGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlTransitiveVncObjectRuntime(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
