// Canonical modern ESM module.

import {
  CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES,
  validateClassicalNahuatlVncSemanticSelection,
} from "./vnc_layer_evaluator.mjs?v=20260815-lesson23-complete-302";

export function createClassicalNahuatlIrregularVncApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON11_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO = "\u2395";
    const CLASSICAL_NAHUATL_LESSON11_LEDGER_TAG_ID = "cn-l11-irregular-vnc-paradigm";
    const issuedClassicalNahuatlIdiomFrames = new WeakMap();
    function freezeClassicalNahuatlIrregularValue(value, seen = new WeakSet()) {
      if (!value || typeof value !== "object" || seen.has(value)) return value;
      seen.add(value);
      for (const key of Reflect.ownKeys(value)) {
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          freezeClassicalNahuatlIrregularValue(descriptor.value, seen);
        }
      }
      return Object.freeze(value);
    }
    const CLASSICAL_NAHUATL_LESSON11_ACTIONS = Object.freeze({
      REUSE_REGULAR_SOUND_RULE: "reuse-regular-sound-rule",
      OVERRIDE_COMPOUND_CLASS: "override-derived-compound-class",
      ADD_CONDITIONED_VARIANT: "add-conditioned-perfective-variant",
      REMAP_TENSE_MEANING: "remap-semantic-tense-to-morphological-tense",
      DISABLE_PARADIGM_CELL: "disable-unavailable-paradigm-cell",
      SELECT_SUPPLETIVE_STEM: "select-suppletive-stem-by-environment",
      ALTER_FINAL_MORPH: "alter-tense-or-number-morph-at-final-boundary",
      REQUIRE_CONSTRUCTION: "require-authorized-construction",
      REQUIRE_LEXICAL_READING: "require-lexical-reading-for-homophonous-stem",
      SELECT_PARADIGM_CELL: "select-suppletive-paradigm-cell",
      DELETE_POST_STEM_K: "delete-post-stem-k-at-final-boundary",
      RECORD_MARKED_VARIANT: "record-marked-authorized-variant",
      REMOVE_FUSED_PREFIX_IN_CONNECTIVE_MATRIX: "remove-fused-prefix-in-connective-t-matrix",
      ASSIGN_CONTEXTUAL_INTERPRETATION: "assign-contextual-interpretation",
      REQUIRE_SEMANTIC_SELECTION: "require-semantic-selection-for-marked-usage",
      KEEP_IDIOM_OUTSIDE_GENERATION: "keep-idiom-outside-ordinary-vnc-generation",
      PRESERVE_ZERO_ROOT: "preserve-zero-root-inside-verbstem"
    });
    const CLASSICAL_NAHUATL_LESSON11_RULES = Object.freeze([Object.freeze({
      id: "cn-l11-111-irregularity-loci",
      section: "11.1",
      lineStart: 3991,
      lineEnd: 3993,
      exactWitness: "Irregularity in Nahuatl VNCs appears primarily (1) in the formation of the perfective stem and (2) in the dislocation of tense forms in regard to tense meanings."
    }), Object.freeze({
      id: "cn-l11-112-speech-not-spelling",
      section: "11.2",
      lineStart: 3994,
      lineEnd: 3998,
      exactWitness: "irregularity in the formation of the perfective stem is judged by the criterion of speech, not spelling"
    }), Object.freeze({
      id: "cn-l11-1131-compound-class-shift",
      section: "11.3.1",
      lineStart: 3999,
      lineEnd: 4008,
      exactWitness: "As a rule, a compound verbstem belongs to the same class as its matrix stem. Not to do so constitutes an irregularity"
    }), Object.freeze({
      id: "cn-l11-1132-ti-perfective-variants",
      section: "11.3.2",
      lineStart: 4009,
      lineEnd: 4036,
      exactWitness: "Certain Class B verbstems that end in ti have alternate perfective stems"
    }), Object.freeze({
      id: "cn-l11-114-form-meaning-dislocation",
      section: "11.4",
      lineStart: 4037,
      lineEnd: 4047,
      exactWitness: "Irregularities due to the dislocation of form and meaning produce a preterit-as-present tense and a distant-past-as-past tense."
    }), Object.freeze({
      id: "cn-l11-114-preterit-as-present-no-antecessive",
      section: "11.4",
      lineStart: 4039,
      lineEnd: 4041,
      exactWitness: "the antecessive-order particle\no# can never occur with VNCs manifesting this tense"
    }), Object.freeze({
      id: "cn-l11-114-no-present-indicative-morph",
      section: "11.4",
      lineStart: 4044,
      lineEnd: 4046,
      exactWitness: "Verbs having this irregularity do not permit VNCs with a present-indicative tense morph."
    }), Object.freeze({
      id: "cn-l11-1141-ihca",
      section: "11.4.1",
      lineStart: 4048,
      lineEnd: 4055,
      exactWitness: "(ih-ca) > (ih-ca) = to be standing"
    }), Object.freeze({
      id: "cn-l11-1142-ono",
      section: "11.4.2",
      lineStart: 4056,
      lineEnd: 4070,
      exactWitness: "(on-o) > (on-o) = to be lying down"
    }), Object.freeze({
      id: "cn-l11-1142-ono-connective-t-matrix",
      section: "11.4.2",
      lineStart: 4056,
      lineEnd: 4058,
      exactWitness: "Except when occurring in connective-t compound\nverbstems as a matrix, the stem (o) always has the directional/locative prefix on\nfused to it"
    }), Object.freeze({
      id: "cn-l11-1143-pilca",
      section: "11.4.3",
      lineStart: 4071,
      lineEnd: 4077,
      exactWitness: "(pil-ca) > (pil-ca) = to be hanging"
    }), Object.freeze({
      id: "cn-l11-1144-a-defective",
      section: "11.4.4",
      lineStart: 4078,
      lineEnd: 4090,
      exactWitness: "This is a defective Class A verb. It lacks an imperfective stem"
    }), Object.freeze({
      id: "cn-l11-1145-itzi-defective",
      section: "11.4.5",
      lineStart: 4091,
      lineEnd: 4130,
      exactWitness: "This is a defective Class B verb. It does not use the imperfective stem"
    }), Object.freeze({
      id: "cn-l11-1145-itzi-compound-only",
      section: "11.4.5",
      lineStart: 4095,
      lineEnd: 4100,
      exactWitness: "This verb never occurs in a simple-stemmed VNC."
    }), Object.freeze({
      id: "cn-l11-1145-itzi-post-stem-k-deletion",
      section: "11.4.5",
      lineStart: 4091,
      lineEnd: 4094,
      exactWitness: "a /k/ sound in a tense morph or a\nnum¹ morph is deleted after the stem"
    }), Object.freeze({
      id: "cn-l11-1145-itzi-second-person-command",
      section: "11.4.5 Note 1",
      lineStart: 4125,
      lineEnd: 4127,
      exactWitness: "the preterit-as-present indicative VNC with a second-person subject\npronoun can be used to express a command"
    }), Object.freeze({
      id: "cn-l11-1145-itzi-homophone",
      section: "11.4.5 Note 2",
      lineStart: 4128,
      lineEnd: 4130,
      exactWitness: "There is a homophonous irregular verbstem (itz), \"to be alert/observant/to look\""
    }), Object.freeze({
      id: "cn-l11-1145-alert-itz-perfective-only",
      section: "11.4.5 Note 2",
      lineStart: 4128,
      lineEnd: 4130,
      exactWitness: "also limited\nto the perfective stem"
    }), Object.freeze({
      id: "cn-l11-1146-amia-defective",
      section: "11.4.6",
      lineStart: 4131,
      lineEnd: 4142,
      exactWitness: "it is used only in special constructions with the interrogative adverb quēn"
    }), Object.freeze({
      id: "cn-l11-1146-amia-incorporated-quen",
      section: "11.4.6",
      lineStart: 4140,
      lineEnd: 4142,
      exactWitness: "The quēn can be incorporated to create a compound verbstem"
    }), Object.freeze({
      id: "cn-l11-1147-zero-ia-defective",
      section: "11.4.7",
      lineStart: 4143,
      lineEnd: 4155,
      exactWitness: "The stem is unusual in that its root is Ø. ihqueh = #Ø-Ø(Ø-i-h)Ø+qu-eh#"
    }), Object.freeze({
      id: "cn-l11-1148-mani",
      section: "11.4.8",
      lineStart: 4156,
      lineEnd: 4162,
      exactWitness: "preterit-tense predicates are not built on the perfective stem"
    }), Object.freeze({
      id: "cn-l11-1148-mani-referent-usage",
      section: "11.4.8",
      lineStart: 4158,
      lineEnd: 4160,
      exactWitness: "It is not ordinarily used for individual animate\nbeings."
    }), Object.freeze({
      id: "cn-l11-1149-nemi",
      section: "11.4.9",
      lineStart: 4163,
      lineEnd: 4167,
      exactWitness: "VNCs built on these stems are regular in all tenses"
    }), Object.freeze({
      id: "cn-l11-115-suppletion",
      section: "11.5",
      lineStart: 4168,
      lineEnd: 4171,
      exactWitness: "they fill out their paradigm by means of a suppletive stem"
    }), Object.freeze({
      id: "cn-l11-1151-ye-ca",
      section: "11.5.1",
      lineStart: 4172,
      lineEnd: 4252,
      exactWitness: "(ye) > (ye) ~ (ca-t) ~ (ca-h) = to be/exist"
    }), Object.freeze({
      id: "cn-l11-1151-ca-plural-silent-num1",
      section: "11.5.1.c.i",
      lineStart: 4215,
      lineEnd: 4224,
      exactWitness: "the num¹ morphic carrier\nqu is replaced by the silent variant ⎕"
    }), Object.freeze({
      id: "cn-l11-1151-catqui-antiquated",
      section: "11.5.1.c.i",
      lineStart: 4225,
      lineEnd: 4230,
      exactWitness: "One finds antiquated forms of VNCs built on (ca-t)"
    }), Object.freeze({
      id: "cn-l11-1152-ya-hui",
      section: "11.5.2",
      lineStart: 4253,
      lineEnd: 4340,
      exactWitness: "(yā) ~ (ya-uh) ~ (hui) > (yah) ~ (hui) = to go"
    }), Object.freeze({
      id: "cn-l11-1152-hui-post-stem-k-deletion",
      section: "11.5.2",
      lineStart: 4256,
      lineEnd: 4259,
      exactWitness: "Tense and num¹ morphs that have an initial /k/ sound lose it when joined to the (hui)\nstem."
    }), Object.freeze({
      id: "cn-l11-1152-yahui-dialectal-rejected",
      section: "11.5.2 Note",
      lineStart: 4331,
      lineEnd: 4336,
      exactWitness: "These are not, however, considered good usage."
    }), Object.freeze({
      id: "cn-l11-1152-cenhui-plural-only",
      section: "11.5.2 Note",
      lineStart: 4337,
      lineEnd: 4338,
      exactWitness: "The stem (hui) also occurs in the stem (cen-hui), \"to go as one,\" i.e., \"to go along together\"; as the meaning\nmakes clear, VNCs built on it have a plural subject"
    }), Object.freeze({
      id: "cn-l11-1153-hual-la",
      section: "11.5.3",
      lineStart: 4341,
      lineEnd: 4354,
      exactWitness: "(huāl-lā) ~ (huāl-la-uh) ~ (huāl-hui) > (huāl-lah) ~ (huāl-hui) = to come"
    }), Object.freeze({
      id: "cn-l11-1153-hual-fusion",
      section: "11.5.3",
      lineStart: 4341,
      lineEnd: 4345,
      exactWitness: "The directional\nprefix is fused to the stem. Since /l/ + /y/ > [ll]"
    }), Object.freeze({
      id: "cn-l11-116-idioms",
      section: "11.6",
      lineStart: 4355,
      lineEnd: 4371,
      exactWitness: "Irregular VNCs are frequently used in idiomatic expressions."
    })]);
    const CLASSICAL_NAHUATL_LESSON11_IDIOMS = Object.freeze([Object.freeze({
      id: "quēn-ton-yez-queh",
      surface: "Quēn tonyezqueh?",
      meaning: "How shall we act?",
      lineStart: 4357,
      lineEnd: 4358
    }), Object.freeze({
      id: "ahquēn-ni-c-mati",
      surface: "Ahquēn nicmati.",
      meaning: "By no means do I know it.",
      lineStart: 4359,
      lineEnd: 4360
    }), Object.freeze({
      id: "ahquēn-ni-o-c-mati",
      surface: "Ahquēn nocommati.",
      meaning: "In no way do I know about it.",
      lineStart: 4365,
      lineEnd: 4366
    }), Object.freeze({
      id: "zan-huītz",
      surface: "Zan huītz.",
      meaning: "He is a foreigner; it is exotic.",
      lineStart: 4367,
      lineEnd: 4367
    }), Object.freeze({
      id: "quin-yez",
      surface: "Quin yez.",
      meaning: "It will be presently; it is a thing in the future.",
      lineStart: 4368,
      lineEnd: 4368
    }), Object.freeze({
      id: "ni-huāl-la-mati",
      surface: "Nihuāllamati.",
      meaning: "I frequent the place.",
      lineStart: 4369,
      lineEnd: 4369
    }), Object.freeze({
      id: "mā-am-m-o-mat-t-in",
      surface: "Mā ammomattin.",
      meaning: "Beware (pl) of dithering.",
      lineStart: 4370,
      lineEnd: 4370
    }), Object.freeze({
      id: "oc-on-ya-uh",
      surface: "Oc onyauh.",
      meaning: "It is still going forward.",
      lineStart: 4371,
      lineEnd: 4371
    })]);
    function cloneClassicalNahuatlLesson11Value(value) {
      if (Array.isArray(value)) return value.map(cloneClassicalNahuatlLesson11Value);
      if (!value || typeof value !== "object") return value;
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneClassicalNahuatlLesson11Value(entry)]));
    }
    function normalizeClassicalNahuatlIrregularVncStem(value = "") {
      return String(value || "").trim().toLowerCase().replace(/^\((.*)\)$/u, "$1").replace(/^\++/u, "");
    }
    function getClassicalNahuatlStemKey(value = "") {
      return normalizeClassicalNahuatlIrregularVncStem(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").replace(/[^a-z]/gu, "");
    }
    function realizeClassicalNahuatlLesson11CanvasZeroForFormula(value = "") {
      return String(value || "").replace(/[Øø]/gu, "0");
    }
    function buildClassicalNahuatlZeroRootOperationFrame(canvasStemMember = "") {
      const canvasMember = normalizeClassicalNahuatlIrregularVncStem(canvasStemMember);
      const canvasMorphs = canvasMember.split("-").filter(Boolean);
      const formulaStemMember = realizeClassicalNahuatlLesson11CanvasZeroForFormula(canvasMember);
      const formulaMorphs = formulaStemMember.split("-").filter(Boolean);
      const zeroRootAuthorized = canvasMorphs[0] === "ø" || canvasMorphs[0] === "Ø";
      const canonicalCanvasStemMember = zeroRootAuthorized ? ["Ø", ...canvasMorphs.slice(1)].join("-") : canvasMember;
      const rule = getClassicalNahuatlRule("cn-l11-1147-zero-ia-defective");
      return {
        kind: "classical-nahuatl-irregular-vnc-zero-root-operation-frame",
        lesson: "Andrews Lesson 11",
        section: "11.4.7",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT,
        canvasStemMember: canonicalCanvasStemMember,
        canvasRootMorpheme: zeroRootAuthorized ? "Ø" : "",
        formulaStemMember: zeroRootAuthorized ? formulaStemMember : "",
        formulaRootMorpheme: zeroRootAuthorized ? "0" : "",
        rootMorphemeRole: zeroRootAuthorized ? "verbstem-root" : "",
        rootPosition: zeroRootAuthorized ? 0 : -1,
        writtenRootRealization: "",
        spokenRootRealization: "",
        surfaceStemMember: zeroRootAuthorized ? formulaMorphs.slice(1).join("-") : "",
        zeroRootPreservedInFormula: zeroRootAuthorized,
        zeroRootSilentOnSurface: zeroRootAuthorized,
        authorizationStatus: zeroRootAuthorized ? "authorized" : "blocked",
        blockReason: zeroRootAuthorized ? "" : "canvas-stem-member-does-not-have-zero-root",
        action: CLASSICAL_NAHUATL_LESSON11_ACTIONS.PRESERVE_ZERO_ROOT,
        ruleRefs: rule ? [{
          ...cloneClassicalNahuatlLesson11Value(rule),
          tagId: rule.id
        }] : [],
        formulaStringsAreAuthority: false
      };
    }
    function getClassicalNahuatlRule(ruleId = "") {
      return CLASSICAL_NAHUATL_LESSON11_RULES.find(rule => rule.id === ruleId) || null;
    }
    function getClassicalNahuatlIrregularVncRules() {
      return CLASSICAL_NAHUATL_LESSON11_RULES.map(cloneClassicalNahuatlLesson11Value);
    }
    function getClassicalNahuatlSubjectNumber(subject = "3sg") {
      return /pl$/u.test(String(subject || "")) ? "plural" : "singular";
    }
    function getClassicalNahuatlUsesPerfectiveStem({
      mood = "indicative",
      tense = "present"
    } = {}) {
      const normalizedMood = String(mood || "").trim().toLowerCase();
      const normalizedTense = String(tense || "").trim().toLowerCase();
      return normalizedMood === "admonitive" || normalizedTense === "preterit" || normalizedTense === "distant-past";
    }
    function getClassicalNahuatlLexemeIdentity(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlIrregularVncStem(stem);
      const key = getClassicalNahuatlStemKey(normalizedStem);
      const lexicalReading = String(options.lesson11LexicalReading || options.lexicalReading || options.stemReading || "").trim().toLowerCase();
      if (key === "itz") {
        if (["alert", "alert-observant", "observant"].includes(lexicalReading)) {
          return {
            lexemeId: "itz-alert-observant",
            kind: "defective-alert-perfective-only",
            ruleIds: ["cn-l11-1145-itzi-homophone", "cn-l11-1145-alert-itz-perfective-only"],
            sourceStem: normalizedStem,
            sourceKey: key,
            lexicalReading
          };
        }
        return {
          lexemeId: "itz-homophone",
          kind: lexicalReading === "motion" || lexicalReading === "come-go" ? "defective-motion-itz-simple-blocked" : "ambiguous-itz-reading",
          ruleIds: ["cn-l11-1145-itzi-defective"],
          sourceStem: normalizedStem,
          sourceKey: key,
          lexicalReading
        };
      }
      const exact = {
        ceya: {
          lexemeId: "ce-ya",
          kind: "lesson7-delegated-irregular-sound-change",
          ruleIds: ["cn-l11-112-speech-not-spelling"]
        },
        ahcocui: {
          lexemeId: "ahco-cui",
          kind: "compound-class-shift",
          ruleIds: ["cn-l11-1131-compound-class-shift"]
        },
        cecui: {
          lexemeId: "ce-cui",
          kind: "compound-class-shift",
          ruleIds: ["cn-l11-1131-compound-class-shift"]
        },
        mati: {
          lexemeId: "mati",
          kind: "conditioned-ti-perfective",
          ruleIds: ["cn-l11-1132-ti-perfective-variants"]
        },
        cati: {
          lexemeId: "ca-ti",
          kind: "conditioned-ti-perfective",
          ruleIds: ["cn-l11-1132-ti-perfective-variants"]
        },
        huehueti: {
          lexemeId: "huē-huē-ti",
          kind: "conditioned-ti-perfective",
          ruleIds: ["cn-l11-1132-ti-perfective-variants"]
        },
        ilamati: {
          lexemeId: "ilama-ti",
          kind: "conditioned-ti-perfective",
          ruleIds: ["cn-l11-1132-ti-perfective-variants"]
        },
        ihca: {
          lexemeId: "ih-ca",
          kind: "form-meaning-dislocation",
          ruleIds: ["cn-l11-1141-ihca", "cn-l11-114-preterit-as-present-no-antecessive", "cn-l11-114-no-present-indicative-morph"]
        },
        ono: {
          lexemeId: "on-o",
          kind: "form-meaning-dislocation",
          ruleIds: ["cn-l11-1142-ono", "cn-l11-1142-ono-connective-t-matrix", "cn-l11-114-preterit-as-present-no-antecessive", "cn-l11-114-no-present-indicative-morph"]
        },
        pilca: {
          lexemeId: "pil-ca",
          kind: "form-meaning-dislocation",
          ruleIds: ["cn-l11-1143-pilca", "cn-l11-114-preterit-as-present-no-antecessive", "cn-l11-114-no-present-indicative-morph"]
        },
        a: {
          lexemeId: "ā",
          kind: "defective-preterit-as-present",
          ruleIds: ["cn-l11-1144-a-defective"]
        },
        huitz: {
          lexemeId: "itz-come-go",
          kind: "defective-compound-only",
          ruleIds: ["cn-l11-1145-itzi-defective", "cn-l11-1145-itzi-compound-only", "cn-l11-1145-itzi-post-stem-k-deletion", "cn-l11-1145-itzi-second-person-command"]
        },
        itquitz: {
          lexemeId: "itz-come-go",
          kind: "defective-compound-only",
          ruleIds: ["cn-l11-1145-itzi-defective", "cn-l11-1145-itzi-compound-only", "cn-l11-1145-itzi-post-stem-k-deletion"]
        },
        huicatz: {
          lexemeId: "itz-come-go",
          kind: "defective-compound-only",
          ruleIds: ["cn-l11-1145-itzi-defective", "cn-l11-1145-itzi-compound-only", "cn-l11-1145-itzi-post-stem-k-deletion"]
        },
        amia: {
          lexemeId: "am-i-ā",
          kind: "defective-construction-bound",
          ruleIds: ["cn-l11-1146-amia-defective", "cn-l11-1146-amia-incorporated-quen"]
        },
        ia: {
          lexemeId: "0-i-ā",
          canvasLexemeId: "Ø-i-ā",
          kind: "defective-nnc-cooperation",
          ruleIds: ["cn-l11-1147-zero-ia-defective"]
        },
        mani: {
          lexemeId: "mani",
          kind: "preterit-stem-exception",
          ruleIds: ["cn-l11-1148-mani", "cn-l11-1148-mani-referent-usage"]
        },
        nemi: {
          lexemeId: "nemi",
          kind: "regular-with-optional-past-reading",
          ruleIds: ["cn-l11-1149-nemi"]
        },
        ye: {
          lexemeId: "be-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1151-ye-ca", "cn-l11-1151-ca-plural-silent-num1", "cn-l11-1151-catqui-antiquated"]
        },
        cat: {
          lexemeId: "be-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1151-ye-ca", "cn-l11-1151-ca-plural-silent-num1", "cn-l11-1151-catqui-antiquated"]
        },
        cah: {
          lexemeId: "be-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1151-ye-ca", "cn-l11-1151-ca-plural-silent-num1", "cn-l11-1151-catqui-antiquated"]
        },
        ya: {
          lexemeId: "go-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1152-ya-hui", "cn-l11-1152-hui-post-stem-k-deletion", "cn-l11-1152-yahui-dialectal-rejected"]
        },
        yauh: {
          lexemeId: "go-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1152-ya-hui", "cn-l11-1152-hui-post-stem-k-deletion", "cn-l11-1152-yahui-dialectal-rejected"]
        },
        hui: {
          lexemeId: "go-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1152-ya-hui", "cn-l11-1152-hui-post-stem-k-deletion", "cn-l11-1152-yahui-dialectal-rejected"]
        },
        yah: {
          lexemeId: "go-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1152-ya-hui", "cn-l11-1152-hui-post-stem-k-deletion", "cn-l11-1152-yahui-dialectal-rejected"]
        },
        cenhui: {
          lexemeId: "cen-hui",
          kind: "plural-only-hui-compound",
          ruleIds: ["cn-l11-1152-cenhui-plural-only", "cn-l11-1152-hui-post-stem-k-deletion"]
        },
        hualla: {
          lexemeId: "come-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1153-hual-la", "cn-l11-1153-hual-fusion", "cn-l11-1152-hui-post-stem-k-deletion"]
        },
        huallauh: {
          lexemeId: "come-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1153-hual-la", "cn-l11-1153-hual-fusion", "cn-l11-1152-hui-post-stem-k-deletion"]
        },
        hualhui: {
          lexemeId: "come-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1153-hual-la", "cn-l11-1153-hual-fusion", "cn-l11-1152-hui-post-stem-k-deletion"]
        },
        huallah: {
          lexemeId: "come-suppletive",
          kind: "suppletive",
          ruleIds: ["cn-l11-1153-hual-la", "cn-l11-1153-hual-fusion", "cn-l11-1152-hui-post-stem-k-deletion"]
        }
      }[key] || null;
      return exact ? {
        ...exact,
        sourceStem: normalizedStem,
        sourceKey: key
      } : null;
    }
    function getClassicalNahuatlCanonicalSourceStem(identity = null) {
      // The identity matcher deliberately accepts ordinary unsegmented input,
      // but its recognition must not erase the grammatical boundaries which
      // Andrews/Canvas records for the canonical generator.
      const canonicalStemByLexemeId = {
        "ce-ya": "ce-ya",
        "ahco-cui": "ahco-cui",
        "ce-cui": "ce-cui",
        "ca-ti": "ca-ti",
        "huē-huē-ti": "huē-huē-ti",
        "ilama-ti": "ilama-ti",
        "ih-ca": "ih-ca",
        "on-o": "on-o",
        "pil-ca": "pil-ca",
        "am-i-ā": "am-i-ā",
        "0-i-ā": "i-ā",
        "cen-hui": "cen-hui",
        "come-suppletive": "huāl-lā"
      };
      return canonicalStemByLexemeId[identity?.lexemeId] || identity?.sourceStem || "";
    }
    function getClassicalNahuatlParadigmRelationFrame(identityOrStem = null, options = {}) {
      const identity = typeof identityOrStem === "string" ? getClassicalNahuatlLexemeIdentity(identityOrStem, options) : identityOrStem;
      if (!identity?.lexemeId) return null;
      const records = {
        "ce-ya": {
          imperfective: ["ce-ya"],
          perfective: ["ce-z"],
          display: "(ce-ya) > (ce-z)",
          ruleId: "cn-l11-112-speech-not-spelling"
        },
        "ahco-cui": {
          imperfective: ["ahco-cui"],
          perfective: ["ahco-uc", "ahco-c"],
          display: "tla-(ahco-cui) > tla-(ahco-uc) ~ tla-(ahco-c)",
          ruleId: "cn-l11-1131-compound-class-shift"
        },
        "ce-cui": {
          imperfective: ["ce-cui"],
          perfective: ["ce-uc"],
          display: "(ce-cui) > (ce-uc)",
          ruleId: "cn-l11-1131-compound-class-shift"
        },
        mati: {
          imperfective: ["mati"],
          perfective: ["mat", "mah"],
          display: "(mati) > (mat) ~ (mah)",
          ruleId: "cn-l11-1132-ti-perfective-variants"
        },
        "ca-ti": {
          imperfective: ["ca-ti"],
          perfective: ["ca-t", "ca-h"],
          display: "*(ca-ti) > (ca-t) ~ (ca-h)",
          ruleId: "cn-l11-1132-ti-perfective-variants"
        },
        "huē-huē-ti": {
          imperfective: ["huē-huē-ti"],
          perfective: ["huē-huē-t", "huē-hue-h"],
          display: "(huē-huē-ti) > (huē-huē-t) ~ (huē-hue-h)",
          ruleId: "cn-l11-1132-ti-perfective-variants"
        },
        "ilama-ti": {
          imperfective: ["ilama-ti"],
          perfective: ["ilama-t", "ilama-h"],
          display: "(ilama-ti) > (ilama-t) ~ (ilama-h)",
          ruleId: "cn-l11-1132-ti-perfective-variants"
        },
        "ih-ca": {
          imperfective: ["ih-ca"],
          perfective: ["ih-ca"],
          display: "(ih-ca) > (ih-ca)",
          ruleId: "cn-l11-1141-ihca"
        },
        "on-o": {
          imperfective: ["on-o"],
          perfective: ["on-o"],
          display: "(on-o) > (on-o)",
          ruleId: "cn-l11-1142-ono"
        },
        "pil-ca": {
          imperfective: ["pil-ca"],
          perfective: ["pil-ca"],
          display: "(pil-ca) > (pil-ca)",
          ruleId: "cn-l11-1143-pilca"
        },
        "ā": {
          imperfective: [],
          perfective: ["ā"],
          display: "*(ā) > (ā)",
          ruleId: "cn-l11-1144-a-defective",
          imperfectiveUnavailable: true
        },
        "itz-come-go": {
          imperfective: ["itzi"],
          perfective: ["itz"],
          display: "*(itzi) > (itz)",
          ruleId: "cn-l11-1145-itzi-defective",
          imperfectiveUnused: true
        },
        "am-i-ā": {
          imperfective: ["am-i-ā"],
          perfective: ["am-i-h"],
          display: "*(am-i-ā) > (am-i-h)",
          ruleId: "cn-l11-1146-amia-defective",
          imperfectiveUnused: true
        },
        "0-i-ā": {
          imperfective: ["Ø-i-ā"],
          perfective: ["Ø-i-h"],
          display: "*(Ø-i-ā) > (Ø-i-h)",
          ruleId: "cn-l11-1147-zero-ia-defective",
          imperfectiveUnused: true
        },
        mani: {
          imperfective: ["mani"],
          perfective: ["man"],
          display: "(mani) > (man)",
          ruleId: "cn-l11-1148-mani"
        },
        nemi: {
          imperfective: ["nemi"],
          perfective: ["nen"],
          display: "(nemi) > (nen)",
          ruleId: "cn-l11-1149-nemi"
        },
        "be-suppletive": {
          imperfective: ["ye"],
          perfective: ["ye", "ca-t", "ca-h"],
          display: "(ye) > (ye) ~ (ca-t) ~ (ca-h)",
          ruleId: "cn-l11-1151-ye-ca"
        },
        "go-suppletive": {
          imperfective: ["yā", "ya-uh", "hui"],
          perfective: ["yah", "hui"],
          display: "(yā) ~ (ya-uh) ~ (hui) > (yah) ~ (hui)",
          ruleId: "cn-l11-1152-ya-hui"
        },
        "come-suppletive": {
          imperfective: ["huāl-lā", "huāl-la-uh", "huāl-hui"],
          perfective: ["huāl-lah", "huāl-hui"],
          display: "(huāl-lā) ~ (huāl-la-uh) ~ (huāl-hui) > (huāl-lah) ~ (huāl-hui)",
          ruleId: "cn-l11-1153-hual-la"
        }
      };
      const record = records[identity.lexemeId] || null;
      if (!record) return null;
      const rule = getClassicalNahuatlRule(record.ruleId);
      const canvasImperfectiveMembers = [...record.imperfective];
      const canvasPerfectiveMembers = [...record.perfective];
      return {
        kind: "classical-nahuatl-irregular-vnc-paradigm-relation-frame",
        lesson: "Andrews Lesson 11",
        sourceDocument: CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT,
        sourceAuthority: "Andrews transcription",
        lexemeId: identity.lexemeId,
        canvasLexemeId: identity.canvasLexemeId || identity.lexemeId,
        canvasImperfectiveMembers,
        canvasPerfectiveMembers,
        imperfectiveMembers: canvasImperfectiveMembers.map(realizeClassicalNahuatlLesson11CanvasZeroForFormula),
        perfectiveMembers: canvasPerfectiveMembers.map(realizeClassicalNahuatlLesson11CanvasZeroForFormula),
        canvasRelationDisplay: record.display,
        relationDisplay: realizeClassicalNahuatlLesson11CanvasZeroForFormula(record.display),
        imperfectiveUnavailable: record.imperfectiveUnavailable === true,
        imperfectiveUnused: record.imperfectiveUnused === true,
        authorizationStatus: "authorized",
        ruleRefs: rule ? [{
          ...cloneClassicalNahuatlLesson11Value(rule),
          tagId: rule.id
        }] : [],
        generatedFromCanvasIdentity: true,
        userEntryRequired: false,
        formulaStringsAreAuthority: false
      };
    }
    function getClassicalNahuatlTiPerfectivePair(identity = null) {
      const pairs = {
        mati: ["mat", "mah"],
        "ca-ti": ["ca-t", "ca-h"],
        "huē-huē-ti": ["huē-huē-t", "huē-hue-h"],
        "ilama-ti": ["ilama-t", "ilama-h"]
      };
      return pairs[identity?.lexemeId] || [];
    }
    function fuseClassicalNahuatlLesson11HualToGoStem(stem = "") {
      const fused = {
        "yā": "huāl-lā",
        "ya-uh": "huāl-la-uh",
        hui: "huāl-hui",
        yah: "huāl-lah"
      }[stem] || "";
      return {
        sourceStem: stem,
        fusedStem: fused,
        operation: /^y/u.test(stem) ? "fuse-hual-and-apply-l-plus-y-progressive-assimilation" : "fuse-hual-before-hui-without-l-plus-y-assimilation"
      };
    }
    function isClassicalNahuatlBorrowedIndicativeOptative(mood = "", tense = "") {
      return String(mood || "") === "optative"
        && ["future", "preterit"].includes(String(tense || ""));
    }
    function getClassicalNahuatlFusedDirectionalSlotOwnership(identity = null, options = {}) {
      const externalDirectional = String(options.directionalPrefix || options.directional || options.directionalLocativePrefix || "").trim();
      const connectiveTMatrix = identity?.lexemeId === "on-o"
        && (options.connectiveTMatrix === true || options.matrixInConnectiveTCompound === true || String(options.compoundBoundaryType || options.matrixBoundaryType || "") === "connective-t");
      const fusedDirectional = identity?.lexemeId === "on-o"
        ? "on"
        : identity?.lexemeId === "come-suppletive"
          ? "huāl"
          : "";
      return Object.freeze({
        fusedDirectional,
        externalDirectional: externalDirectional === "none" ? "" : externalDirectional,
        connectiveTMatrix,
        externalDirectionalAuthorized: !fusedDirectional || connectiveTMatrix
      });
    }
    function selectClassicalNahuatlLesson11SuppletiveStem(lexemeId = "", options = {}) {
      const mood = String(options.mood || "indicative");
      const tense = String(options.semanticTense || options.tense || "present");
      const number = getClassicalNahuatlSubjectNumber(options.subject);
      const plural = number === "plural";
      // Lesson 9's future- and preterit-optative values borrow an already
      // existing indicative form.  They are semantic sentence uses, not new
      // suppletive stem cells, so select the stem under the form's mood.
      const borrowedIndicativeOptative = isClassicalNahuatlBorrowedIndicativeOptative(mood, tense);
      const formMood = borrowedIndicativeOptative ? "indicative" : mood;
      let member = "";
      let sourceParadigmMember = "";
      let tnsOverride = "";
      let num1Override = "";
      let morphologicalTense = tense;
      let available = true;
      let blockReason = "";
      let deletePostStemK = false;
      const authorizedAlternatives = [];
      const rejectedVariants = [];
      if (lexemeId === "be-suppletive") {
        if (formMood === "admonitive") {
          member = "ye";
          morphologicalTense = "nonpast";
          available = tense === "nonpast";
        } else if (formMood === "optative") {
          member = "ye";
          available = ["nonpast", "past"].includes(tense);
        } else if (tense === "present") {
          member = plural ? "ca-t" : "ca-h";
          morphologicalTense = "preterit";
          num1Override = CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO;
          if (!plural) {
            authorizedAlternatives.push({
              stemOverride: "ca-t",
              num1Override: "qui",
              usage: "antiquated",
              preference: "marked-not-default",
              witness: "nicatqui = #ni-Ø(ca-t)Ø+qui-Ø#"
            });
          }
        } else if (tense === "general-past") {
          member = "ca-t";
          morphologicalTense = "distant-past";
        } else if (["customary-present", "imperfect", "future"].includes(tense)) {
          member = "ye";
        } else {
          available = false;
          blockReason = "be-suppletive-past-meanings-use-general-past-cell";
        }
      } else if (lexemeId === "go-suppletive" || lexemeId === "come-suppletive") {
        if (formMood === "admonitive") {
          sourceParadigmMember = "yah";
          morphologicalTense = "nonpast";
          available = tense === "nonpast";
        } else if (formMood === "optative" && tense === "nonpast") {
          sourceParadigmMember = plural ? "hui" : "ya-uh";
          if (plural) num1Override = CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO;
        } else if (formMood === "optative" && tense === "past") {
          sourceParadigmMember = "yā";
        } else if (formMood !== "indicative") {
          available = false;
          blockReason = "go-suppletive-mood-tense-cell-not-authorized";
        } else if (tense === "present") {
          sourceParadigmMember = plural ? "hui" : "ya-uh";
        } else if (tense === "general-past") {
          sourceParadigmMember = "hui";
          morphologicalTense = "distant-past";
          tnsOverride = "a";
        } else if (["preterit", "distant-past"].includes(tense)) {
          sourceParadigmMember = "yah";
        } else if (["customary-present", "imperfect", "future"].includes(tense)) {
          sourceParadigmMember = "yā";
        } else {
          available = false;
          blockReason = "go-suppletive-indicative-tense-cell-not-authorized";
        }
        member = sourceParadigmMember;
        deletePostStemK = sourceParadigmMember === "hui";
        if (lexemeId === "come-suppletive") {
          const fusion = fuseClassicalNahuatlLesson11HualToGoStem(sourceParadigmMember);
          member = fusion.fusedStem;
        } else if (tense === "present" && plural) {
          rejectedVariants.push({
            stem: "ya-hui",
            usage: "dialectal-not-good-usage"
          });
        }
      }
      if (!available && !blockReason) blockReason = "suppletive-paradigm-cell-not-authorized";
      return {
        member,
        sourceParadigmMember: sourceParadigmMember || member,
        tnsOverride,
        num1Override,
        number,
        morphologicalTense,
        available,
        blockReason,
        deletePostStemK,
        authorizedAlternatives,
        rejectedVariants
      };
    }
    function getClassicalNahuatlParadigmTenseIdentity(semanticTense = "", morphologicalTense = "") {
      if (semanticTense === "present" && morphologicalTense === "preterit") {
        return "preterit-as-present";
      }
      if (semanticTense === "general-past" && morphologicalTense === "distant-past") {
        return "distant-past-as-past";
      }
      return semanticTense;
    }
    function getClassicalNahuatlAllowedParadigmTenses(identity = null, allowedSemanticTenses = [], requestedMood = "") {
      const presentUsesPreterit = requestedMood === "indicative" && Boolean(identity) && (
        ["form-meaning-dislocation", "defective-preterit-as-present", "defective-compound-only", "defective-construction-bound", "defective-nnc-cooperation"].includes(identity.kind)
        || identity.kind === "suppletive" && identity.lexemeId === "be-suppletive"
      );
      return Array.from(new Set(allowedSemanticTenses.map(semanticTense => {
        if (semanticTense === "present" && presentUsesPreterit) return "preterit-as-present";
        if (semanticTense === "general-past") return "distant-past-as-past";
        return semanticTense;
      })));
    }
    function buildClassicalNahuatlIrregularVncParadigmPlan(stem = "", options = {}) {
      const sourceStem = normalizeClassicalNahuatlIrregularVncStem(stem);
      const identity = getClassicalNahuatlLexemeIdentity(sourceStem, options);
      const canonicalSourceStem = getClassicalNahuatlCanonicalSourceStem(identity);
      const sourceStemCanonicalized = Boolean(identity && canonicalSourceStem && canonicalSourceStem !== sourceStem);
      const paradigmRelationFrame = getClassicalNahuatlParadigmRelationFrame(identity, options);
      const requestedMoodInput = String(options.requestedMood || options.mood || "indicative");
      const requestedSemanticTenseInput = String(options.requestedSemanticTense || options.semanticTense || options.tense || "present");
      const semanticSelectionFrame = validateClassicalNahuatlVncSemanticSelection({
        mood: requestedMoodInput,
        tense: requestedSemanticTenseInput,
        enforceMoodCompatibility: false,
      });
      const requestedMood = semanticSelectionFrame.mood || semanticSelectionFrame.requestedMood;
      const requestedSemanticTense = semanticSelectionFrame.semanticTense || semanticSelectionFrame.requestedSemanticTense;
      const requestedParadigmTense = semanticSelectionFrame.paradigmTense || semanticSelectionFrame.requestedParadigmTense;
      const borrowedIndicativeOptative = isClassicalNahuatlBorrowedIndicativeOptative(requestedMood, requestedSemanticTense);
      const formMood = borrowedIndicativeOptative ? "indicative" : requestedMood;
      const subjectNumber = getClassicalNahuatlSubjectNumber(options.subject);
      const actions = [];
      const alternatives = [];
      const authorizedAlternatives = [];
      const rejectedVariants = [];
      let selectedStemOverride = "";
      let sourceParadigmMember = "";
      let selectedClassOverride = "";
      let morphologicalMood = requestedMood;
      let morphologicalTense = requestedSemanticTense;
      let tnsOverride = "";
      let num1Override = "";
      let available = true;
      let blockReason = "";
      let preference = "";
      let kDeletionAfterStem = false;
      let deletePostStemK = false;
      let contextualInterpretation = "";
      let usageStatus = "ordinary";
      let constructionSurfaceMode = "";
      let requiredCooperatingLayer = "";
      let rootMorpheme = "";
      let rootMorphemeRole = "";
      let zeroRootPreserved = false;
      let zeroRootOperationFrame = null;
      let pronominalNncCooperationFrame = null;
      const authorizedSentenceRoles = ["statement"];
      const supersededLowerRuleIds = [];
      const fusedDirectionalSlotOwnership = getClassicalNahuatlFusedDirectionalSlotOwnership(identity, options);
      const ordinarySemanticTenses = ["present", "preterit", "future", "distant-past", "customary-present", "imperfect"];
      const regularSemanticTenses = requestedMood === "indicative"
        ? ordinarySemanticTenses
        : [...CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES];
      if (semanticSelectionFrame.authorizationStatus !== "authorized") {
        return {
          kind: "classical-nahuatl-irregular-vnc-paradigm-plan",
          version: CLASSICAL_NAHUATL_LESSON11_VERSION,
          lesson: "Andrews Lesson 11",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT,
          sourceStem,
          canonicalSourceStem,
          sourceStemCanonicalized,
          paradigmRelationFrame,
          identity: cloneClassicalNahuatlLesson11Value(identity),
          lexemeId: identity?.lexemeId || "",
          irregularityKind: identity?.kind || "",
          applies: Boolean(identity),
          requestedMood,
          requestedSemanticTense,
          requestedParadigmTense,
          paradigmTense: requestedParadigmTense,
          semanticTenseValue: requestedSemanticTense,
          morphologicalMood,
          morphologicalTense,
          authorizationStatus: "blocked",
          available: false,
          blockReason: semanticSelectionFrame.blockReason,
          actions: [CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL],
          allowedSemanticTenses: semanticSelectionFrame.moodTenses,
          allowedParadigmTenses: semanticSelectionFrame.moodParadigmTenses,
          semanticSelectionFrame,
          regularSystemRemainsAuthority: !identity,
          formulaStringsAreAuthority: false,
        };
      }
      if (!identity) {
        const regularSemanticSelectionFrame = validateClassicalNahuatlVncSemanticSelection({
          mood: requestedMood,
          tense: requestedSemanticTense,
          allowedSemanticTenses: regularSemanticTenses,
          enforceMoodCompatibility: false,
        });
        const irregularParadigmTenseRequested = ["preterit-as-present", "distant-past-as-past"].includes(requestedParadigmTense);
        const authorized = Boolean(sourceStem)
          && regularSemanticSelectionFrame.authorizationStatus === "authorized"
          && !irregularParadigmTenseRequested;
        return {
          kind: "classical-nahuatl-irregular-vnc-paradigm-plan",
          version: CLASSICAL_NAHUATL_LESSON11_VERSION,
          lesson: "Andrews Lesson 11",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT,
          sourceStem,
          canonicalSourceStem,
          sourceStemCanonicalized,
          paradigmRelationFrame,
          identity: null,
          applies: false,
          requestedMood,
          requestedSemanticTense,
          requestedParadigmTense,
          paradigmTense: requestedSemanticTense,
          semanticTenseValue: requestedSemanticTense,
          morphologicalMood,
          morphologicalTense,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason: !sourceStem
            ? "missing-stem"
            : irregularParadigmTenseRequested
              ? "vnc-irregular-paradigm-tense-not-authorized-for-selected-verbstem"
              : regularSemanticSelectionFrame.blockReason,
          actions,
          allowedSemanticTenses: regularSemanticTenses,
          allowedParadigmTenses: regularSemanticTenses,
          semanticSelectionFrame: regularSemanticSelectionFrame,
          regularSystemRemainsAuthority: true
        };
      }
      if (identity.kind === "lesson7-delegated-irregular-sound-change") {
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REUSE_REGULAR_SOUND_RULE);
      } else if (identity.kind === "compound-class-shift") {
        selectedClassOverride = "B";
        const variants = identity.lexemeId === "ahco-cui" ? ["ahco-uc", "ahco-c"] : ["ce-uc"];
        const usesPerfectiveStem = getClassicalNahuatlUsesPerfectiveStem({
          mood: requestedMood,
          tense: morphologicalTense
        });
        if (usesPerfectiveStem) {
          selectedStemOverride = variants[0];
          alternatives.push(...variants.slice(1));
          authorizedAlternatives.push(...variants.slice(1).map(variant => ({
            stemOverride: variant,
            usage: "authorized-perfective-alternative"
          })));
        }
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.OVERRIDE_COMPOUND_CLASS);
      } else if (identity.kind === "conditioned-ti-perfective") {
        const [regular, irregular] = getClassicalNahuatlTiPerfectivePair(identity);
        const conditioned = subjectNumber === "singular" && (requestedSemanticTense === "preterit" || requestedMood === "admonitive");
        selectedClassOverride = "B";
        if (conditioned) {
          selectedStemOverride = irregular;
          alternatives.push(regular);
          authorizedAlternatives.push({
            stemOverride: regular,
            usage: "regular-authorized-alternative"
          });
          preference = "irregular-preferred-regular-authorized";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.ADD_CONDITIONED_VARIANT);
        }
      } else if (identity.kind === "ambiguous-itz-reading") {
        available = false;
        blockReason = "itz-reading-must-distinguish-motion-from-alert-observant";
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REQUIRE_LEXICAL_READING);
      } else if (identity.kind === "defective-motion-itz-simple-blocked") {
        available = false;
        blockReason = "motion-itz-never-occurs-in-a-simple-stemmed-vnc";
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REQUIRE_LEXICAL_READING, CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL);
      } else if (["form-meaning-dislocation", "defective-preterit-as-present"].includes(identity.kind)) {
        selectedClassOverride = "A";
        if (requestedSemanticTense === "present") {
          morphologicalTense = "preterit";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REMAP_TENSE_MEANING);
        } else if (requestedSemanticTense === "general-past") {
          morphologicalTense = "distant-past";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REMAP_TENSE_MEANING);
        } else if (identity.kind === "defective-preterit-as-present") {
          available = false;
          blockReason = "defective-a-only-preterit-as-present";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL);
        }
        if (fusedDirectionalSlotOwnership.connectiveTMatrix) {
          selectedStemOverride = "o";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REMOVE_FUSED_PREFIX_IN_CONNECTIVE_MATRIX);
        }
        if (identity.lexemeId === "ā") {
          const negativeRequested = options.negative === true || options.polarity === "negative" || Boolean(options.negativePrefix || options.requestedNegativePrefix);
          contextualInterpretation = negativeRequested ? "be-absent" : "be-present";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.ASSIGN_CONTEXTUAL_INTERPRETATION);
        }
      } else if (identity.kind === "defective-compound-only") {
        selectedClassOverride = "B";
        if (!["present", "general-past"].includes(requestedSemanticTense)) {
          available = false;
          blockReason = "defective-itz-only-preterit-as-present-or-distant-past-as-past";
        } else {
          morphologicalTense = requestedSemanticTense === "present" ? "preterit" : "distant-past";
          kDeletionAfterStem = true;
          deletePostStemK = true;
          if (requestedSemanticTense === "general-past") tnsOverride = "a";
          if (requestedSemanticTense === "present" && /^2/u.test(String(options.subject || ""))) {
            authorizedSentenceRoles.push("command");
            contextualInterpretation = "second-person-indicative-may-express-command";
            actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.ASSIGN_CONTEXTUAL_INTERPRETATION);
          }
        }
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL, CLASSICAL_NAHUATL_LESSON11_ACTIONS.ALTER_FINAL_MORPH);
      } else if (identity.kind === "defective-alert-perfective-only") {
        selectedClassOverride = "B";
        available = formMood === "admonitive" || formMood === "indicative" && ["preterit", "distant-past"].includes(requestedSemanticTense);
        if (!available) blockReason = "alert-observant-itz-is-limited-to-the-perfective-stem";
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL);
      } else if (identity.kind === "defective-construction-bound") {
        selectedClassOverride = "C";
        const construction = String(options.construction || options.requiredConstruction || "");
        available = requestedSemanticTense === "present" && ["quēn", "quen", "quēn-mach", "quen-mach", "incorporated-quēn", "incorporated-quen"].includes(construction);
        morphologicalTense = "preterit";
        if (!available) blockReason = "am-i-a-requires-quen-construction-and-present-meaning";
        if (["incorporated-quēn", "incorporated-quen"].includes(construction)) {
          selectedStemOverride = "quē-n-am-i-h";
          constructionSurfaceMode = "incorporated-inside-verbstem";
        } else {
          constructionSurfaceMode = "sentence-particle-outside-vnc";
        }
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REQUIRE_CONSTRUCTION);
      } else if (identity.kind === "defective-nnc-cooperation") {
        selectedClassOverride = "C";
        zeroRootOperationFrame = buildClassicalNahuatlZeroRootOperationFrame(paradigmRelationFrame?.canvasPerfectiveMembers?.[0] || "");
        selectedStemOverride = zeroRootOperationFrame.formulaStemMember;
        rootMorpheme = zeroRootOperationFrame.formulaRootMorpheme;
        rootMorphemeRole = zeroRootOperationFrame.rootMorphemeRole;
        zeroRootPreserved = zeroRootOperationFrame.authorizationStatus === "authorized";
        const candidateCooperationFrame = options.pronominalNncCooperationFrame;
        const requestedSubject = String(options.subject || options.subjectPerson || "").trim();
        const lesson16CooperationAuthorized =
          candidateCooperationFrame?.kind
            === "classical-nahuatl-pronominal-nnc-irregular-vnc-cooperation-frame"
          && typeof targetObject
            .isClassicalNahuatlCooperationFrame === "function"
          && targetObject.isClassicalNahuatlCooperationFrame(
            candidateCooperationFrame,
            requestedSubject ? { subject: requestedSubject } : {}
          );
        const pronominalPluralCooperationAuthorized =
          candidateCooperationFrame?.kind
            === "classical-nahuatl-pronominal-plural-cooperation-frame"
          && typeof targetObject
            .isClassicalNahuatlPronominalPluralCooperationFrame === "function"
          && targetObject.isClassicalNahuatlPronominalPluralCooperationFrame(
            candidateCooperationFrame
          );
        const typedCooperationAuthorized =
          (
            lesson16CooperationAuthorized
            || pronominalPluralCooperationAuthorized
          )
          && (
            candidateCooperationFrame.requiredDefectiveIdentity
            || candidateCooperationFrame.requiredLesson11Identity
          )
            === "defective-nnc-cooperation"
          && (
            candidateCooperationFrame.selectedTypedNncRequired === true
            || (
              pronominalPluralCooperationAuthorized
              && candidateCooperationFrame.selectedTypedNncRequired === false
              && candidateCooperationFrame.compoundTypedRouteRequired === true
              && Boolean(candidateCooperationFrame.formulaStemMember)
            )
          )
          && candidateCooperationFrame.booleanClaimAuthority === false
          && (
            !requestedSubject
            || candidateCooperationFrame.cooperatingSubject === requestedSubject
          );
        pronominalNncCooperationFrame = typedCooperationAuthorized ? cloneClassicalNahuatlLesson11Value(candidateCooperationFrame) : null;
        if (
          typedCooperationAuthorized
          && candidateCooperationFrame.compoundTypedRouteRequired === true
        ) {
          selectedStemOverride = candidateCooperationFrame.formulaStemMember;
        }
        available = requestedSemanticTense === "present" && typedCooperationAuthorized;
        if (!zeroRootPreserved) available = false;
        morphologicalTense = "preterit";
        if (!zeroRootPreserved) {
          blockReason = zeroRootOperationFrame.blockReason;
        } else if (!available) {
          blockReason = "zero-i-a-requires-pronominal-nnc-cooperation";
        }
        requiredCooperatingLayer =
          candidateCooperationFrame?.compoundTypedRouteRequired === true
            ? "Lesson 19 typed pronominal compound"
            : "Lesson 16 pronominal NNC";
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.PRESERVE_ZERO_ROOT, CLASSICAL_NAHUATL_LESSON11_ACTIONS.REQUIRE_CONSTRUCTION);
      } else if (identity.kind === "preterit-stem-exception") {
        selectedClassOverride = "B";
        if (requestedSemanticTense === "preterit") selectedStemOverride = "mani";
        if (requestedSemanticTense === "general-past") morphologicalTense = "distant-past";
        const referentKind = String(options.predicateReferentKind || options.referentKind || "").trim();
        if (referentKind === "individual-animate") {
          usageStatus = "marked-not-ordinary";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REQUIRE_SEMANTIC_SELECTION, CLASSICAL_NAHUATL_LESSON11_ACTIONS.RECORD_MARKED_VARIANT);
        } else if (["wide-flat-thing", "mass-or-crowd"].includes(referentKind)) {
          contextualInterpretation = referentKind;
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.ASSIGN_CONTEXTUAL_INTERPRETATION);
        }
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REMAP_TENSE_MEANING);
      } else if (identity.kind === "regular-with-optional-past-reading") {
        selectedClassOverride = "B";
        if (requestedSemanticTense === "general-past") morphologicalTense = "distant-past";
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REMAP_TENSE_MEANING);
      } else if (identity.kind === "suppletive") {
        selectedClassOverride = ["go-suppletive", "come-suppletive"].includes(identity.lexemeId) ? "D" : "A";
        const suppletive = selectClassicalNahuatlLesson11SuppletiveStem(identity.lexemeId, {
          ...options,
          mood: requestedMood,
          semanticTense: requestedSemanticTense
        });
        selectedStemOverride = suppletive.member;
        sourceParadigmMember = suppletive.sourceParadigmMember;
        tnsOverride = suppletive.tnsOverride;
        num1Override = suppletive.num1Override;
        morphologicalTense = suppletive.morphologicalTense;
        available = suppletive.available;
        blockReason = suppletive.blockReason;
        deletePostStemK = suppletive.deletePostStemK;
        authorizedAlternatives.push(...suppletive.authorizedAlternatives);
        rejectedVariants.push(...suppletive.rejectedVariants);
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.SELECT_SUPPLETIVE_STEM, CLASSICAL_NAHUATL_LESSON11_ACTIONS.SELECT_PARADIGM_CELL, ...(deletePostStemK ? [CLASSICAL_NAHUATL_LESSON11_ACTIONS.DELETE_POST_STEM_K] : []), ...(authorizedAlternatives.length ? [CLASSICAL_NAHUATL_LESSON11_ACTIONS.RECORD_MARKED_VARIANT] : []));
        if (identity.lexemeId === "come-suppletive") {
          supersededLowerRuleIds.push("cn-l2-210-progressive-assimilation-boundary-realization", "cn-l7-76-guideline-class-inference");
        }
        if (options.directionalPrefix === "on" && identity.lexemeId === "be-suppletive") {
          contextualInterpretation = "there-to-be";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.ASSIGN_CONTEXTUAL_INTERPRETATION);
        }
        if (identity.lexemeId === "go-suppletive" && requestedSemanticTense === "imperfect") {
          usageStatus = "authorized-less-elegant-than-hui-general-past";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.RECORD_MARKED_VARIANT);
        }
      } else if (identity.kind === "plural-only-hui-compound") {
        available = subjectNumber === "plural";
        if (!available) blockReason = "cen-hui-requires-a-plural-subject";
        // (cen-hui) retains the Lesson 11 hui-stem behavior inside its
        // compound.  Its plural restriction does not erase hui's
        // distant-past-as-past semantic coordinate.
        if (requestedSemanticTense === "general-past") {
          morphologicalTense = "distant-past";
          actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REMAP_TENSE_MEANING);
        }
        deletePostStemK = true;
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.REQUIRE_SEMANTIC_SELECTION, CLASSICAL_NAHUATL_LESSON11_ACTIONS.DELETE_POST_STEM_K);
      }
      // A lexicalized directional occupies the single Directional/locative
      // position of an ordinary VNC.  This applies alike to on-o (§11.4.2)
      // and fused huāl-lā (§11.5.3), rather than trusting the later generic
      // directional layer to spot a doubled prefix in a completed stem.
      if (available
        && fusedDirectionalSlotOwnership.externalDirectional
        && !fusedDirectionalSlotOwnership.externalDirectionalAuthorized) {
        available = false;
        blockReason = "lesson11-fused-directional-already-occupies-directional-slot";
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL);
      }
      const antecessiveRequested = options.antecessive === true || options.antecessiveOrder === true || options.sentenceAntecessive === true || options.prefixStackMode === "antecessive" || Array.isArray(options.outsidePrefixes) && options.outsidePrefixes.some(prefix => ["o", "ō", "o#", "ō#"].includes(String(prefix)));
      const preteritAsPresent = requestedMood === "indicative" && requestedSemanticTense === "present" && morphologicalTense === "preterit";
      if (available && preteritAsPresent && antecessiveRequested) {
        available = false;
        blockReason = "preterit-as-present-cannot-take-antecessive-order-prefix";
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL);
      }
      const ruleRefs = identity.ruleIds.map(getClassicalNahuatlRule).filter(Boolean);
      let allowedSemanticTenses = [...regularSemanticTenses];
      if (identity.kind === "defective-preterit-as-present") allowedSemanticTenses = ["present"];
      if (identity.kind === "defective-compound-only") allowedSemanticTenses = ["present", "general-past"];
      if (identity.kind === "defective-alert-perfective-only") {
        allowedSemanticTenses = requestedMood === "admonitive"
          ? ["nonpast"]
          : requestedMood === "indicative"
            ? ["preterit", "distant-past"]
            : requestedMood === "optative"
              ? ["preterit"]
              : [];
      }
      if (["defective-construction-bound", "defective-nnc-cooperation"].includes(identity.kind)) allowedSemanticTenses = ["present"];
      if (["form-meaning-dislocation", "preterit-stem-exception", "regular-with-optional-past-reading"].includes(identity.kind)) {
        if (requestedMood === "indicative") allowedSemanticTenses.push("general-past");
      }
      if (identity.kind === "plural-only-hui-compound" && requestedMood === "indicative") {
        allowedSemanticTenses.push("general-past");
      }
      if (identity.kind === "suppletive" && identity.lexemeId === "be-suppletive") {
        allowedSemanticTenses = requestedMood === "indicative" ? ["present", "general-past", "customary-present", "imperfect", "future"] : requestedMood === "optative" ? ["nonpast", "past", "future"] : ["nonpast"];
      }
      if (identity.kind === "suppletive" && ["go-suppletive", "come-suppletive"].includes(identity.lexemeId)) {
        allowedSemanticTenses = requestedMood === "indicative" ? ["present", "preterit", "future", "distant-past", "general-past", "customary-present", "imperfect"] : requestedMood === "optative" ? ["nonpast", "past", "future", "preterit"] : ["nonpast"];
      }
      const paradigmTense = getClassicalNahuatlParadigmTenseIdentity(
        requestedSemanticTense,
        morphologicalTense,
      );
      const allowedParadigmTenses = getClassicalNahuatlAllowedParadigmTenses(
        identity,
        allowedSemanticTenses,
        requestedMood,
      );
      const explicitIrregularParadigmTense = ["preterit-as-present", "distant-past-as-past"].includes(requestedParadigmTense);
      if (available && explicitIrregularParadigmTense && paradigmTense !== requestedParadigmTense) {
        available = false;
        blockReason = "vnc-irregular-paradigm-tense-not-authorized-for-selected-verbstem";
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL);
      }
      const contextualSemanticSelectionFrame = validateClassicalNahuatlVncSemanticSelection({
        mood: requestedMood,
        tense: requestedParadigmTense,
        allowedSemanticTenses: requestedMood === "indicative" ? allowedSemanticTenses : null,
      });
      if (contextualSemanticSelectionFrame.authorizationStatus !== "authorized") {
        available = false;
        if (!blockReason) blockReason = contextualSemanticSelectionFrame.blockReason;
        actions.push(CLASSICAL_NAHUATL_LESSON11_ACTIONS.DISABLE_PARADIGM_CELL);
      }
      const defaultStemOverride = selectedStemOverride;
      const requestedAlternativeStem = normalizeClassicalNahuatlIrregularVncStem(
        options.irregularStemChoice || options.irregularAlternativeStem || ""
      );
      let selectedAlternativeStem = "";
      if (requestedAlternativeStem) {
        const selectedAlternativeIndex = authorizedAlternatives.findIndex(alternative => (
          normalizeClassicalNahuatlIrregularVncStem(alternative?.stemOverride || "") === requestedAlternativeStem
        ));
        if (selectedAlternativeIndex < 0) {
          available = false;
          if (!blockReason) blockReason = "lesson11-irregular-alternative-not-authorized-for-selected-cell";
        } else {
          const [selectedAlternative] = authorizedAlternatives.splice(selectedAlternativeIndex, 1);
          selectedStemOverride = selectedAlternative.stemOverride;
          selectedAlternativeStem = selectedStemOverride;
          if (selectedAlternative.tnsOverride) {
            tnsOverride = selectedAlternative.tnsOverride;
          }
          if (selectedAlternative.num1Override) {
            num1Override = selectedAlternative.num1Override;
          }
          if (defaultStemOverride && defaultStemOverride !== selectedStemOverride) {
            authorizedAlternatives.unshift({
              stemOverride: defaultStemOverride,
              usage: "canvas-default-alternative",
              preference: "default"
            });
          }
        }
      }
      return {
        kind: "classical-nahuatl-irregular-vnc-paradigm-plan",
        version: CLASSICAL_NAHUATL_LESSON11_VERSION,
        lesson: "Andrews Lesson 11",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT,
        sourceStem,
        canonicalSourceStem,
        sourceStemCanonicalized,
        paradigmRelationFrame,
        identity: cloneClassicalNahuatlLesson11Value(identity),
        lexemeId: identity.lexemeId,
        irregularityKind: identity.kind,
        applies: true,
        requestedMood,
        requestedSemanticTense,
        requestedParadigmTense,
        paradigmTense,
        semanticTenseValue: requestedSemanticTense,
        morphologicalMood,
        morphologicalTense,
        subjectNumber,
        selectedStemOverride,
        defaultStemOverride,
        requestedAlternativeStem,
        selectedAlternativeStem,
        sourceParadigmMember,
        selectedClassOverride,
        alternatives,
        preference,
        tnsOverride,
        num1Override,
        kDeletionAfterStem,
        deletePostStemK,
        authorizedAlternatives: cloneClassicalNahuatlLesson11Value(authorizedAlternatives),
        rejectedVariants: cloneClassicalNahuatlLesson11Value(rejectedVariants),
        contextualInterpretation,
        usageStatus,
        constructionSurfaceMode,
        requiredCooperatingLayer,
        fusedDirectionalSlotOwnership: cloneClassicalNahuatlLesson11Value(
          fusedDirectionalSlotOwnership,
        ),
        rootMorpheme,
        rootMorphemeRole,
        zeroRootPreserved,
        zeroRootOperationFrame: cloneClassicalNahuatlLesson11Value(zeroRootOperationFrame),
        pronominalNncCooperationFrame: cloneClassicalNahuatlLesson11Value(pronominalNncCooperationFrame),
        authorizedSentenceRoles: Array.from(new Set(authorizedSentenceRoles)),
        supersededLowerRuleIds,
        available,
        authorizationStatus: available ? "authorized" : "blocked",
        blockReason,
        actions: Array.from(new Set(actions)),
        allowedSemanticTenses: Array.from(new Set(allowedSemanticTenses)),
        allowedParadigmTenses,
        semanticSelectionFrame: contextualSemanticSelectionFrame,
        ruleRefs: ruleRefs.map(rule => ({
          ...cloneClassicalNahuatlLesson11Value(rule),
          tagId: rule.id
        })),
        regularSystemRemainsAuthority: true,
        formulaStringsAreAuthority: false,
        witnessesAreProofAnchorsNotGeneralWhitelist: true
      };
    }
    function buildClassicalNahuatlConditionedIrregularParadigmCellFrame(
      plan = null,
      typedVncSlotFrame = null,
      alternativeTypedVncSlotFrames = []
    ) {
      if (
        plan?.authorizationStatus !== "authorized"
        || plan.lexemeId !== "be-suppletive"
        || !["preterit-as-present", "distant-past-as-past"].includes(plan.paradigmTense)
        || !typedVncSlotFrame?.slots?.predicate
        || !typedVncSlotFrame?.slots?.number
      ) {
        return null;
      }
      const preteritAsPresent = plan.paradigmTense === "preterit-as-present";
      const realizationInventory = preteritAsPresent ? [{
          variantId: "current-singular-ca-h",
          condition: { subjectNumber: "singular" },
          stemMember: "ca-h",
          numberDyad: { num1: CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO, num2: "0" },
          usage: "current",
          preference: "default",
          operations: ["select-ca-h-for-singular-subject", "realize-ca-h-final-boundary-num1-as-silent"]
        }, {
          variantId: "current-plural-ca-t-silent-num1",
          condition: { subjectNumber: "plural" },
          stemMember: "ca-t",
          numberDyad: { num1: CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO, num2: "eh" },
          usage: "current",
          preference: "default",
          operations: ["select-ca-t-for-plural-subject", "replace-num1-qu-with-silent-carrier"]
        }, {
          variantId: "antiquated-singular-ca-t-qui",
          condition: { subjectNumber: "singular" },
          stemMember: "ca-t",
          numberDyad: { num1: "qui", num2: "0" },
          usage: "antiquated",
          preference: "marked-not-default",
          operations: ["select-ca-t-for-antiquated-singular", "retain-num1-qui"]
        }]
        : [{
          variantId: "current-singular-ca-t-distant-past",
          condition: { subjectNumber: "singular" },
          stemMember: "ca-t",
          tenseMorph: "ca",
          numberDyad: { num1: "0", num2: "0" },
          usage: "current",
          preference: "default",
          operations: ["select-ca-t-for-distant-past-as-past", "retain-distant-past-ca", "realize-singular-number-dyad"]
        }, {
          variantId: "current-plural-ca-t-distant-past",
          condition: { subjectNumber: "plural" },
          stemMember: "ca-t",
          tenseMorph: "ca",
          numberDyad: { num1: "0", num2: "h" },
          usage: "current",
          preference: "default",
          operations: ["select-ca-t-for-distant-past-as-past", "retain-distant-past-ca", "realize-plural-number-dyad"]
        }];
      const selectedSubjectNumber = plan.subjectNumber === "plural" ? "plural" : "singular";
      const defaultVariantId = preteritAsPresent
        ? selectedSubjectNumber === "plural"
          ? "current-plural-ca-t-silent-num1"
          : "current-singular-ca-h"
        : selectedSubjectNumber === "plural"
          ? "current-plural-ca-t-distant-past"
          : "current-singular-ca-t-distant-past";
      const authorizedVariantIds = realizationInventory
        .filter(realization => realization.condition.subjectNumber === selectedSubjectNumber)
        .map(realization => realization.variantId);
      const selectedPredicate = typedVncSlotFrame.slots.predicate;
      const selectedNumber = typedVncSlotFrame.slots.number;
      const defaultInventoryRealization = realizationInventory.find(
        realization => realization.variantId === defaultVariantId
      );
      const selectedRealizations = [{
        variantId: defaultVariantId,
        typedVncSlotFrame: cloneClassicalNahuatlLesson11Value(typedVncSlotFrame),
        stemMember: selectedPredicate.stem,
        tenseMorph: selectedPredicate.tns,
        sourceNumberDyad: {
          num1: selectedNumber.num1,
          num2: selectedNumber.num2
        },
        numberDyad: cloneClassicalNahuatlLesson11Value(defaultInventoryRealization?.numberDyad),
        operations: cloneClassicalNahuatlLesson11Value(defaultInventoryRealization?.operations || []),
        usage: "current",
        preference: "default"
      }, ...alternativeTypedVncSlotFrames.map((alternativeFrame, index) => {
        const variantId = authorizedVariantIds[index + 1] || `authorized-alternative-${index + 1}`;
        const inventoryRealization = realizationInventory.find(realization => realization.variantId === variantId);
        return {
          variantId,
          typedVncSlotFrame: cloneClassicalNahuatlLesson11Value(alternativeFrame),
          stemMember: alternativeFrame.slots?.predicate?.stem || "",
          tenseMorph: alternativeFrame.slots?.predicate?.tns || "",
          sourceNumberDyad: {
            num1: alternativeFrame.slots?.number?.num1 || "",
            num2: alternativeFrame.slots?.number?.num2 || ""
          },
          numberDyad: cloneClassicalNahuatlLesson11Value(inventoryRealization?.numberDyad || {
            num1: alternativeFrame.slots?.number?.num1 || "",
            num2: alternativeFrame.slots?.number?.num2 || ""
          }),
          operations: cloneClassicalNahuatlLesson11Value(inventoryRealization?.operations || []),
          usage: alternativeFrame.lesson11Alternative?.usage || "marked",
          preference: alternativeFrame.lesson11Alternative?.preference || "marked-not-default",
          witness: alternativeFrame.lesson11Alternative?.witness || ""
        };
      })];
      return {
        kind: "classical-nahuatl-vnc-conditioned-paradigm-cell-frame",
        version: 1,
        authorizationStatus: "authorized",
        realizationPhase: "structural",
        sourceDocument: CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT,
        sourceSection: preteritAsPresent ? "11.5.1.c.i" : "11.5.1.c.ii",
        greatestCommonDivisor: {
          paradigmCellId: `be-suppletive:${plan.paradigmTense}`,
          lexemeId: "be-suppletive",
          meaning: "be-or-exist",
          paradigmTense: plan.paradigmTense,
          semanticTenseValue: preteritAsPresent ? "present" : "general-past",
          morphologicalTense: preteritAsPresent ? "preterit" : "distant-past",
          morphologicalAspect: "perfective"
        },
        leastCommonMultiple: {
          distinctionAxes: preteritAsPresent
            ? ["subject-number", "suppletive-stem-member", "number-dyad", "usage-register"]
            : ["subject-number", "suppletive-stem-member", "tense-morph", "number-dyad"],
          realizationInventory,
          selectedSubjectNumber,
          defaultVariantId,
          authorizedVariantIds,
          selectedRealizations
        },
        ruleRefs: (preteritAsPresent
          ? ["cn-l11-1151-ye-ca", "cn-l11-1151-ca-plural-silent-num1", "cn-l11-1151-catqui-antiquated"]
          : ["cn-l11-114-form-meaning-dislocation", "cn-l11-1151-ye-ca"])
          .map(ruleId => cloneClassicalNahuatlLesson11Value(getClassicalNahuatlRule(ruleId)))
          .filter(Boolean),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function applyClassicalNahuatlLesson11PlanToVncSlotFrame(plan = null, vncSlotFrame = null) {
      if (!plan || plan.kind !== "classical-nahuatl-irregular-vnc-paradigm-plan" || !vncSlotFrame) {
        return {
          kind: "classical-nahuatl-irregular-vnc-vnc-application-frame",
          authorizationStatus: "blocked",
          blockReason: "missing-plan-or-typed-vnc-frame",
          typedVncSlotFrame: null
        };
      }
      if (plan.authorizationStatus !== "authorized") {
        return {
          kind: "classical-nahuatl-irregular-vnc-vnc-application-frame",
          authorizationStatus: "blocked",
          blockReason: plan.blockReason,
          typedVncSlotFrame: null,
          plan
        };
      }
      let frame = cloneClassicalNahuatlLesson11Value(vncSlotFrame);
      let predicate = frame.slots?.predicate;
      let number = frame.slots?.number;
      if (!predicate || !number) {
        return {
          kind: "classical-nahuatl-irregular-vnc-vnc-application-frame",
          authorizationStatus: "blocked",
          blockReason: "incomplete-typed-vnc-frame",
          typedVncSlotFrame: null,
          plan
        };
      }
      const sourcePredicateStem = predicate.stem;
      const sourceTns = predicate.tns;
      const sourceNum1 = number.num1;
      // A recognized compact alias is input spelling, not a second grammar
      // representation.  Retain the original source for traceability while
      // projecting its canonical segmented stem into the typed VNC frame.
      if (plan.selectedStemOverride || plan.sourceStemCanonicalized) {
        predicate.stem = plan.selectedStemOverride || plan.canonicalSourceStem;
      }
      // A Lesson 19 compound can change the predicate's initial boundary from
      // vowel-initial to consonant-initial. Rebuild that typed finite carrier
      // through the canonical lower VNC owner so first/second-person supportive
      // i is recalculated; copying the old subject slot would preserve the
      // allomorph selected for (i-h) and produce a mismatched semantic identity.
      if (
        plan.pronominalNncCooperationFrame?.compoundTypedRouteRequired === true
        && predicate.stem
        && typeof targetObject.buildClassicalNahuatlFiniteVncResult === "function"
      ) {
        const rebuilt = targetObject.buildClassicalNahuatlFiniteVncResult(
          predicate.stem,
          {
            subject:
              plan.pronominalNncCooperationFrame.cooperatingSubject || "",
            mood: plan.morphologicalMood || "indicative",
            tense: plan.morphologicalTense || "preterit",
            verbClass: plan.selectedClassOverride || "C",
          },
        );
        if (
          typeof targetObject.isClassicalNahuatlFiniteVncResult === "function"
          && targetObject.isClassicalNahuatlFiniteVncResult(rebuilt)
          && rebuilt.vncSlotFrame
        ) {
          frame = cloneClassicalNahuatlLesson11Value(rebuilt.vncSlotFrame);
          predicate = frame.slots?.predicate;
          number = frame.slots?.number;
        }
      }
      if (plan.tnsOverride) predicate.tns = plan.tnsOverride;
      if (plan.num1Override) number.num1 = plan.num1Override;
      if (plan.kDeletionAfterStem || plan.deletePostStemK) {
        if (/^c/u.test(predicate.tns)) predicate.tns = predicate.tns.slice(1) || "0";
        if (/^(?:c|qu|qui)$/u.test(number.num1)) number.num1 = CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO;
      }
      frame.lesson11Plan = cloneClassicalNahuatlLesson11Value(plan);
      frame.phase = "lesson11-irregular-paradigm-applied";
      frame.semanticIdentity = [frame.slots.subject?.pers1 || "", frame.slots.subject?.pers2 || "", ...(frame.slots.prePredicate || []).map(slot => slot.carrier), predicate.stem, predicate.tns, number.num1, number.num2].join("|");
      const alternativeTypedVncSlotFrames = (plan.authorizedAlternatives || []).map(alternative => {
        const alternativeFrame = cloneClassicalNahuatlLesson11Value(vncSlotFrame);
        const alternativePredicate = alternativeFrame.slots?.predicate;
        const alternativeNumber = alternativeFrame.slots?.number;
        if (!alternativePredicate || !alternativeNumber) return null;
        if (alternative.stemOverride) alternativePredicate.stem = alternative.stemOverride;
        if (alternative.tnsOverride || plan.tnsOverride) alternativePredicate.tns = alternative.tnsOverride || plan.tnsOverride;
        if (alternative.num1Override || plan.num1Override) alternativeNumber.num1 = alternative.num1Override || plan.num1Override;
        const deleteAlternativeK = alternative.deletePostStemK === true || plan.kDeletionAfterStem === true || plan.deletePostStemK === true;
        if (deleteAlternativeK) {
          if (/^c/u.test(alternativePredicate.tns)) alternativePredicate.tns = alternativePredicate.tns.slice(1) || "0";
          if (/^(?:c|qu|qui)$/u.test(alternativeNumber.num1)) alternativeNumber.num1 = CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO;
        }
        alternativeFrame.lesson11Plan = cloneClassicalNahuatlLesson11Value(plan);
        alternativeFrame.lesson11Alternative = cloneClassicalNahuatlLesson11Value(alternative);
        alternativeFrame.phase = "lesson11-irregular-authorized-alternative-applied";
        alternativeFrame.semanticIdentity = [alternativeFrame.slots.subject?.pers1 || "", alternativeFrame.slots.subject?.pers2 || "", ...(alternativeFrame.slots.prePredicate || []).map(slot => slot.carrier), alternativePredicate.stem, alternativePredicate.tns, alternativeNumber.num1, alternativeNumber.num2].join("|");
        return alternativeFrame;
      }).filter(Boolean);
      const conditionedParadigmCellFrame = buildClassicalNahuatlConditionedIrregularParadigmCellFrame(
        plan,
        frame,
        alternativeTypedVncSlotFrames
      );
      return {
        kind: "classical-nahuatl-irregular-vnc-vnc-application-frame",
        lesson: "Andrews Lesson 11",
        authorizationStatus: "authorized",
        plan,
        sourceTypedVncSlotFrame: cloneClassicalNahuatlLesson11Value(vncSlotFrame),
        typedVncSlotFrame: frame,
        alternativeTypedVncSlotFrames,
        conditionedParadigmCellFrame,
        sourcePredicateStem,
        selectedPredicateStem: predicate.stem,
        sourceTns,
        selectedTns: predicate.tns,
        sourceNum1,
        selectedNum1: number.num1,
        alternatives: plan.alternatives || [],
        actions: plan.actions || []
      };
    }
    function buildClassicalNahuatlIdiomFrame(idiomId = "") {
      const normalizedId = String(idiomId || "").trim().toLowerCase();
      const record = CLASSICAL_NAHUATL_LESSON11_IDIOMS.find(idiom => idiom.id === normalizedId || idiom.surface.toLowerCase() === normalizedId) || null;
      const witnessed = Boolean(record);
      const frame = freezeClassicalNahuatlIrregularValue({
        kind: "classical-nahuatl-irregular-vnc-idiom-boundary-frame",
        lesson: "Andrews Lesson 11",
        section: "11.6",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT,
        idiomId: normalizedId,
        idiomRecord: cloneClassicalNahuatlLesson11Value(record),
        phraseSurface: record?.surface || "",
        phraseMeaning: record?.meaning || "",
        transcriptionLineStart: record?.lineStart || 0,
        transcriptionLineEnd: record?.lineEnd || 0,
        witnessed,
        authorizationStatus: witnessed ? "authorized" : "blocked",
        blockReason: witnessed ? "" : "idiom-not-witnessed-in-lesson11",
        ordinaryVncGenerationAffected: false,
        phraseGenerationAllowed: witnessed,
        phraseRequiresItsOwnConstructionFrame: true,
        action: CLASSICAL_NAHUATL_LESSON11_ACTIONS.KEEP_IDIOM_OUTSIDE_GENERATION,
        ruleRefs: [cloneClassicalNahuatlLesson11Value(getClassicalNahuatlRule("cn-l11-116-idioms"))]
      });
      issuedClassicalNahuatlIdiomFrames.set(frame, Object.freeze({
        idiomId: frame.idiomId,
        witnessed: frame.witnessed,
        authorizationStatus: frame.authorizationStatus,
      }));
      return frame;
    }
    function isClassicalNahuatlIdiomFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedClassicalNahuatlIdiomFrames.get(frame)
        : null;
      return Boolean(
        receipt
        && frame.kind === "classical-nahuatl-irregular-vnc-idiom-boundary-frame"
        && frame.idiomId === receipt.idiomId
        && frame.witnessed === receipt.witnessed
        && frame.authorizationStatus === receipt.authorizationStatus
        && frame.ordinaryVncGenerationAffected === false
        && frame.phraseRequiresItsOwnConstructionFrame === true
        && frame.action === CLASSICAL_NAHUATL_LESSON11_ACTIONS.KEEP_IDIOM_OUTSIDE_GENERATION
        && Object.isFrozen(frame)
      );
    }
    function installClassicalNahuatlIrregularVncClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") return null;
      Object.assign(globalTarget, {
        CLASSICAL_NAHUATL_LESSON11_ACTIONS,
        getClassicalNahuatlIrregularVncRules,
        getClassicalNahuatlLexemeIdentity,
        getClassicalNahuatlParadigmRelationFrame,
        realizeClassicalNahuatlLesson11CanvasZeroForFormula,
        buildClassicalNahuatlZeroRootOperationFrame,
        buildClassicalNahuatlIrregularVncParadigmPlan,
        buildClassicalNahuatlConditionedIrregularParadigmCellFrame,
        applyClassicalNahuatlLesson11PlanToVncSlotFrame,
        buildClassicalNahuatlIdiomFrame,
        isClassicalNahuatlIdiomFrame
      });
      return globalTarget;
    }
    installClassicalNahuatlIrregularVncClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_SQUARE_ZERO; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_LEDGER_TAG_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_LEDGER_TAG_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_IDIOMS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_IDIOMS; },
    });
    api.cloneClassicalNahuatlLesson11Value = cloneClassicalNahuatlLesson11Value;
    api.normalizeClassicalNahuatlIrregularVncStem = normalizeClassicalNahuatlIrregularVncStem;
    api.getClassicalNahuatlStemKey = getClassicalNahuatlStemKey;
    api.realizeClassicalNahuatlLesson11CanvasZeroForFormula = realizeClassicalNahuatlLesson11CanvasZeroForFormula;
    api.buildClassicalNahuatlZeroRootOperationFrame = buildClassicalNahuatlZeroRootOperationFrame;
    api.getClassicalNahuatlRule = getClassicalNahuatlRule;
    api.getClassicalNahuatlIrregularVncRules = getClassicalNahuatlIrregularVncRules;
    api.getClassicalNahuatlSubjectNumber = getClassicalNahuatlSubjectNumber;
    api.getClassicalNahuatlLexemeIdentity = getClassicalNahuatlLexemeIdentity;
    api.getClassicalNahuatlParadigmRelationFrame = getClassicalNahuatlParadigmRelationFrame;
    api.getClassicalNahuatlTiPerfectivePair = getClassicalNahuatlTiPerfectivePair;
    api.fuseClassicalNahuatlLesson11HualToGoStem = fuseClassicalNahuatlLesson11HualToGoStem;
    api.selectClassicalNahuatlLesson11SuppletiveStem = selectClassicalNahuatlLesson11SuppletiveStem;
    api.buildClassicalNahuatlIrregularVncParadigmPlan = buildClassicalNahuatlIrregularVncParadigmPlan;
    api.buildClassicalNahuatlConditionedIrregularParadigmCellFrame = buildClassicalNahuatlConditionedIrregularParadigmCellFrame;
    api.applyClassicalNahuatlLesson11PlanToVncSlotFrame = applyClassicalNahuatlLesson11PlanToVncSlotFrame;
    api.buildClassicalNahuatlIdiomFrame = buildClassicalNahuatlIdiomFrame;
    api.isClassicalNahuatlIdiomFrame = isClassicalNahuatlIdiomFrame;
    api.installClassicalNahuatlIrregularVncClassicGlobals = installClassicalNahuatlIrregularVncClassicGlobals;
    return api;
}

export function installClassicalNahuatlIrregularVncGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlIrregularVncApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
