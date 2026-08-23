// Canonical modern ESM module.

export function createClassicalNahuatlSourceStemInventoryApi() {
    const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const issuedCanonicalSourceStemRecords = new WeakSet();
    const issuedCanonicalSourceSelectionFrames = new WeakSet();
    const issuedValenceSourceAnalysisFrames = new WeakSet();
    const INITIAL_I_SOURCE_ANALYSES = Object.freeze({
      "vnc|intransitive|iuc-ci": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l25-2522-iucci-iucxitia-source-supportive-i",
        sourceAuthority: "Andrews 25.2.2",
        exactWitness: "(iuc-ci) > (iuc-xi-hua) > (iuc-xi-tiā): the initial i is supportive in the canonical source route."
      }),
      "vnc|transitive|iht-o-ā": Object.freeze({
        kind: "contextual",
        resolvedKindsByValence: Object.freeze({
          "projective-nonhuman": "supportive"
        }),
        defaultResolvedKind: "real",
        ruleId: "cn-l2-26-ihtoa-contextual-initial-i-source",
        sourceAuthority: "Andrews 2.6 Note 1",
        exactWitness: "tla-(iht-o-a) > tlahtoa: after tla- the initial i is supportive and is rejected; the same source can retain i in another licensed boundary."
      })
    });
    const VNC_LEXICAL_ALTERNATIVE_FACTS = Object.freeze({
      "tep-ē-hua": Object.freeze({
        groupId: "cn-l24-2463-tep-e-hua-hui",
        relation: "lexical-source-alternative",
      }),
      "tep-ē-hui": Object.freeze({
        groupId: "cn-l24-2463-tep-e-hua-hui",
        relation: "lexical-source-alternative",
      }),
      "tōy-ā-hua": Object.freeze({
        groupId: "cn-l24-2463-toy-a-hua-hui",
        relation: "lexical-source-alternative",
      }),
      "tōy-ā-hui": Object.freeze({
        groupId: "cn-l24-2463-toy-a-hua-hui",
        relation: "lexical-source-alternative",
      }),
    });
    const VNC_SOURCE_LEXEME_FACTS = Object.freeze({
      "pach-i-hui": Object.freeze({
        relation: "lexical-source-sense-distinction",
        sourceLexemeSelectionRequired: true,
        sourceLexemeIds: Object.freeze([
          "cn-vnc-pachihui-pressed-down",
          "cn-vnc-pachihui-satiated",
        ]),
        sourceSections: Object.freeze(["24.7", "25.2.4"]),
      }),
    });
    const VNC_SOURCE_ROWS = Object.freeze([
      ["ā-miqui", "intransitive", "26.1"], ["ahci", "intransitive", "24.2"], ["ahci", "transitive", "24.2"], ["ahhuiā-ya", "intransitive", "25.5.2"],
      ["āhui-ya", "intransitive", "25.4.8"], ["āna", "transitive", "26.7"], ["aqui", "intransitive", "24.3.1.b"], ["āyacach-o-ā", "intransitive", "26.9"],
      ["āyi", "transitive", "26.4"], ["caqui", "transitive", "25.2.1"], ["ce-ce-ya", "intransitive", "25.5.2"], ["ce-li-liā", "transitive", "26.6"],
      ["ce-liā", "transitive", "26.6"], ["ce-ya", "intransitive", "26.8"], ["chacu-ā-ni", "intransitive", "24.5.7"], ["chay-ā-hui", "intransitive", "24.5.7"],
      ["chich-ī-ni", "intransitive", "24.5.7"], ["chichi-ya", "intransitive", "25.5.2"], ["chīhua", "transitive", "25.4"], ["chip-ā-hua", "intransitive", "24.6.5"],
      ["chōca", "intransitive", "25.2.1"], ["chol-o-ā", "intransitive", "25.4"], ["ciy-ā-hua", "intransitive", "24.6.5"], ["ciya-hui", "intransitive", "24.2"],
      ["ciya-hui", "transitive", "24.2"], ["cochi", "intransitive", "25.2"], ["coco-a", "transitive", "26.9"], ["coco-ya", "intransitive", "24.3.2.b"],
      ["cōhua", "transitive", "26.2"], ["cot-ō-ni", "intransitive", "24.5.7"], ["cuā", "transitive", "25.4"], ["cual-ā-ni", "intransitive", "25.3"],
      ["cuepi", "intransitive", "24.3.1.a"], ["cui", "transitive", "26.2"], ["cuīca", "intransitive", "1.13"], ["cuica-ti", "intransitive", "26.2"],
      ["ē-hua", "intransitive", "24.3.2.a"],
      ["huā-qui", "intransitive", "24.3.1.a"], ["huāl-la-uh", "intransitive", "25.1"], ["hue-tz-ca", "intransitive", "25.2.4"], ["hue-tz-ca", "transitive", "25.2.4"],
      ["cel-i-ya", "intransitive", "22.6"], ["ihyā-ya", "intransitive", "22.6"], ["cah-ca-h", "intransitive", "22.6"], ["chic-ā-hua", "intransitive", "22.6"],
      ["huē-i-ya", "intransitive", "22.6"], ["it-hui", "intransitive", "22.6"], ["petl-ā-ni", "intransitive", "22.6"], ["tlatz-i-ni", "intransitive", "22.6"],
      ["poy-ā-hua", "intransitive", "22.6"], ["yohua", "intransitive", "22.6"], ["ih-cahu-a-ca", "intransitive", "22.6"], ["cue-cuech-ca", "intransitive", "22.6"], ["izta-ya", "intransitive", "22.6"],
      ["huetzi", "intransitive", "26.4"], ["huī-tequi", "intransitive", "24.2"], ["huī-tequi", "transitive", "24.2"], ["ī", "transitive", "25.2"],
      ["ih-tlani", "transitive", "26.2"], ["ihc-i-hui", "intransitive", "25.2.4"], ["ihcuil-o-ā", "transitive", "26.9"], ["ih-ca", "intransitive", "11.4.1"], ["iht-o-ā", "transitive", "26.9"],
      ["ihtzoma", "transitive", "26.2"], ["ihza", "intransitive", "25.2.2"], ["il-pītza", "transitive", "26.7"], ["ilama-ti", "intransitive", "11.3.2"], ["ilpi", "intransitive", "24.3.1.b"],
      ["itz", "intransitive", "11.4.5 note 2"], ["itz-ti", "intransitive", "25.4.7"], ["i-ā", "intransitive", "11.4.7"],
      ["īmacaci", "transitive", "25.4.4"], ["ināya", "transitive", "26.7"], ["itqui", "transitive", "25.2"], ["itt-a", "transitive", "25.2.3"],
      ["iuc-ci", "intransitive", "25.2.2"], ["ix-tlā-hu-a", "transitive", "25.4.5"], ["ix-tlā-hu-iā", "transitive", "26.6"], ["ix-tlā-hui", "intransitive", "24.3.1.a"],
      ["ixca", "transitive", "26.2"], ["maca", "transitive", "25.4.1"], ["mahui", "intransitive", "25.3"], ["māmā", "transitive", "26.8"],
      ["mani", "intransitive", "24.3.1.a"], ["mati", "intransitive", "24.2"], ["mati", "transitive", "24.2"], ["mayāna", "intransitive", "24.2"],
      ["mayāna", "transitive", "24.2"], ["mazā-ti", "intransitive", "25.5.1"], ["miqui", "intransitive", "25.3"], ["mīx-i-hui", "intransitive", "25.2.4"],
      ["mōtla", "transitive", "26.7"], ["nāhua-ti", "intransitive", "26.2"], ["namaca", "transitive", "26.11"], ["nāmoyā", "transitive", "26.8"],
      ["nāpal-o-ā", "transitive", "26.9"], ["nec-ō", "intransitive", "26.11"], ["nēci", "intransitive", "25.2.2"], ["nel-ti", "intransitive", "25.5.1"],
      ["nemi", "intransitive", "26.4"], ["nene-hc-i-hui", "intransitive", "26.1"], ["nequi", "transitive", "26.11"], ["nōtza", "transitive", "26.7"],
      ["oh-quetza", "intransitive", "26.2"], ["ōl-ī-ni", "intransitive", "24.5.7"], ["on-o", "intransitive", "25.6"], ["ōya", "transitive", "26.7"],
      ["pā", "transitive", "26.8"], ["pā-hua-ci", "transitive", "26.4"], ["pa-tla", "transitive", "26.7"], ["pā-tz-ca", "transitive", "26.7"],
      ["pāca-l-tiā", "transitive", "26.6"], ["pach-i-hui", "intransitive", "25.2.4"], ["pach-o-ā", "transitive", "26.9"], ["pah-ti", "intransitive", "24.3.1.b"],
      ["panō", "intransitive", "25.6"], ["pāqui", "intransitive", "24.2"], ["pāqui", "transitive", "24.2"], ["pil-ca", "intransitive", "24.7 note 2"],
      ["pil-o-ā", "transitive", "26.9"], ["pīn-ā-hua", "intransitive", "25.8"], ["pix-a-hui", "intransitive", "24.7"], ["pix-ca", "intransitive", "24.2"],
      ["pix-ca", "transitive", "24.2"], ["piya", "transitive", "26.8"], ["pōhui", "intransitive", "24.3.1.a"], ["pol-i-hui", "intransitive", "24.7"],
      ["pol-o-ā", "transitive", "26.9"], ["poz-tequi", "intransitive", "24.2"], ["poz-tequi", "transitive", "24.2"], ["quēmi", "transitive", "25.3"],
      ["quetza", "transitive", "26.7"], ["quiy-a-hui", "intransitive", "26.2"], ["quīza", "intransitive", "25.3"], ["te-ti-ya", "intransitive", "25.5.2"],
      ["teci", "intransitive", "24.2"], ["teci", "transitive", "24.2"], ["tēm-o-ā", "transitive", "26.9"], ["tēmi", "intransitive", "24.3.1.a"],
      ["tēmiqui", "intransitive", "24.2"], ["tēmiqui", "transitive", "24.2"], ["temō", "intransitive", "25.6"], ["teo-hc-i-hui", "intransitive", "26.1"],
      ["tep-ē-hua", "intransitive", "24.6.3"], ["tep-ē-hui", "intransitive", "24.6.3"],
      ["tla-chiya", "intransitive", "26.8"], ["tla-tzatzanatza", "transitive", "1.13"], ["tlā-ti-ā", "transitive", "25.4"], ["tla-zo-h-ti", "intransitive", "26.7"],
      ["tla-zo-h-tla", "transitive", "26.7"], ["tlāca-ti", "intransitive", "25.5.1"], ["tlal-i-hui", "intransitive", "24.7"], ["tlami-ā", "transitive", "26.6"],
      ["tlaōco-ya", "intransitive", "25.4.8"], ["tlap-ā-ni", "intransitive", "24.5.7"], ["tlap-ī-hui", "intransitive", "24.5.7"], ["tlap-ī-hui-ya", "intransitive", "24.3.2.b"],
      ["tlap-o-ā", "transitive", "26.9"], ["tlap-o-hui", "intransitive", "24.7 note 1"], ["tlatz-i-hui", "intransitive", "25.2.4"], ["tlāza", "transitive", "26.7"],
      ["tlehcō", "intransitive", "25.6"], ["tōca", "intransitive", "24.2"], ["tōca", "transitive", "24.2"], ["tomi", "intransitive", "24.3.1.a"],
      ["tōn-ē-hua", "intransitive", "24.6.5"], ["top-ē-hua", "intransitive", "24.6.5"],
      ["tōy-ā-hua", "intransitive", "24.6.3"], ["tōy-ā-hui", "intransitive", "24.6.3"], ["tzacu-a", "transitive", "25.4.3"],
      ["tzacui", "intransitive", "24.3.1.a"], ["tzahtzi", "intransitive", "1.13"], ["tzay-ā-ni", "intransitive", "24.5.7"], ["tzitz-qu-iā", "transitive", "26.6"], ["tzoy-ō-ni", "intransitive", "24.5.7"],
      ["xel-o-ā", "transitive", "26.9"], ["xo-xō-hui-ya", "intransitive", "25.5.2"], ["xoco-ya", "intransitive", "25.5.2"], ["ya-uh", "intransitive", "25.1"],
      ["yaca", "intransitive", "26.2"], ["yōco-ya", "intransitive", "24.3.2.b"], ["yōco-ya", "transitive", "26.8"], ["zaca-mo-ā", "intransitive", "26.9"],
      ["zahui", "intransitive", "24.3.1.a"]
    ]);
    const NNC_SOURCE_ROWS = Object.freeze([
      "a-c-ah", "a-chi", "a-qui", "cal", "ce-qui", "cem-ix-qui-ch", "chichi", "cā", "cā-tl-e-in", "cā-tl-eh", "cā-tl-eh-huā",
      "eh", "eh-eh-huā", "eh-huā", "itl-ah", "ix-a-chi", "ix-qui-ch", "iz-qui", "mich", "miya-c", "miya-qui", "miye-c", "miye-qui",
      "mo-ch", "mo-ch-eh-huā", "mo-chi", "pah", "quē-c-iz-qui", "quē-x-ix-qui-ch", "quē-x-qui-ch", "quē-z-qui", "tl-eh", "tl-eh-huā",
      "yeh", "yeh-huā", "yeh-yeh-huā", "ā-0", "īn", "ōn"
    ]);
    // Later lessons contribute lexical Source entries to the same NNC source
    // inventory.  These are selectable nounstems, not lesson-specific routes.
    // Their source histories and boundary facts remain read-only lexical data
    // in the ordinary-NNC owner.
    const NNC_LATE_SOURCE_ROWS = Object.freeze([
      ["te-l", "57.7"], ["ca-l", "57.7"], ["tle-l", "57.7"],
      ["cē-l", "57.7"], ["icpa-l", "57.7"], ["cā-cā-l", "57.7"],
      ["ah-co-l", "57.7"], ["xā-l", "57.7"], ["xi-l", "57.7"],
      ["te-nām-āz", "58.1"], ["tepon-āz", "58.1"],
      ["tzō-tzop-āz", "58.1"], ["ma-tzō-tzop-āz", "58.1"],
      ["tzi-tzic-āz", "58.1"], ["tle-hcu-āz", "58.1"],
      ["pi-āz", "58.1"], ["ā-pi-āz", "58.1"], ["te-ā-pi-āz", "58.1"],
      ["mamal-hu-āz", "58.1"], ["māma-l-hu-āz", "58.1"],
      ["tla-pi-pi-l-hu-āz", "58.1"], ["cuauh-tla-pi-pī-l-hu-āz", "58.1"],
      ["ā-pi-pi-l-hu-āz", "58.1"], ["te-ā-pi-l-hu-āz", "58.1"],
      ["ā-yōl-hu-āz", "58.1"], ["ā-ol-hu-āz", "58.1"],
      ["tla-tze-tzel-hu-āz", "58.1"], ["tla-ht-ō-l-hu-āz", "58.1"],
      ["tla-hcal-hu-āz", "58.1"], ["te-hcuil-hu-āz", "58.1"],
      ["neh-ne-hcuil-hu-āz", "58.1"], ["tzon-hu-āz", "58.1"],
      ["tla-chpān-hu-az", "58.1"], ["ehca-hu-āz", "58.1"],
      ["cuauh-ehca-hu-āz", "58.1"], ["me-ca-ehca-hu-āz", "58.1"],
      ["cuauh-pana-hu-āz", "58.1"], ["cuap-pana-hu-āz", "58.1"],
      ["tzicua-hu-āz", "58.1"], ["tzica-hu-āz", "58.1"],
      ["tla-pi-āz", "58.1"], ["āz-ca", "58.1"], ["ah-āz", "58.1"]
    ]);
    function getInitialISourceAnalysis(stem, basalUnit, valence) {
      const key = `${basalUnit}|${valence}|${stem}`;
      const explicit = INITIAL_I_SOURCE_ANALYSES[key] || null;
      if (explicit) {
        return explicit;
      }
      if (!/^[iī]/iu.test(stem)) {
        return Object.freeze({
          kind: "not-applicable",
          ruleId: "",
          sourceAuthority: "not-initial-i",
          exactWitness: ""
        });
      }
      return Object.freeze({
        kind: "real",
        ruleId: "cn-l7-78-real-initial-vowel-source-default",
        sourceAuthority: "canonical-source-verbstem",
        exactWitness: "The canonical source retains a real initial i unless an Andrews source analysis identifies it as supportive."
      });
    }
    function makeRecord(stem, basalUnit, valence, section) {
      const citation = basalUnit === "vnc" && valence === "transitive" ? `...-(${stem})` : `(${stem})`;
      const initialIAnalysis = getInitialISourceAnalysis(stem, basalUnit, valence);
      const lexicalAlternativeFact = basalUnit === "vnc"
        ? VNC_LEXICAL_ALTERNATIVE_FACTS[stem] || null
        : null;
      const sourceLexemeFact = basalUnit === "vnc"
        ? VNC_SOURCE_LEXEME_FACTS[stem] || null
        : null;
      const record = Object.freeze({
        kind: "classical-nahuatl-canonical-source-stem-record",
        version: 1,
        stem,
        basalUnit,
        stemKind: basalUnit === "vnc" ? "verbstem" : "nounstem",
        valenceDisplay: basalUnit === "vnc" ? valence : "not-applicable",
        defaultSourceValence: basalUnit !== "vnc"
          ? "not-applicable"
          : valence === "transitive"
            ? "specific-projective"
            : "intransitive",
        citation,
        sourceDocument: SOURCE_DOCUMENT,
        sourceSection: section || "12-16",
        selectionAuthority: "source-only",
        initialIAnalysis,
        lexicalAlternativeGroupId: lexicalAlternativeFact?.groupId || "",
        lexicalAlternativeRelation: lexicalAlternativeFact?.relation || "",
        lexicalFactsReadOnly: Boolean(lexicalAlternativeFact),
        sourceLexemeRelation: sourceLexemeFact?.relation || "",
        sourceLexemeSelectionRequired:
          sourceLexemeFact?.sourceLexemeSelectionRequired === true,
        sourceLexemeIds:
          sourceLexemeFact?.sourceLexemeIds || Object.freeze([]),
        sourceLexemeSections:
          sourceLexemeFact?.sourceSections || Object.freeze([]),
        sourceLexemeFactsReadOnly: Boolean(sourceLexemeFact),
        translationAuthority: false,
        userSelectableOperation: false,
        grammarAuthority: false,
        formulaStringAuthority: false
      });
      issuedCanonicalSourceStemRecords.add(record);
      return record;
    }
    const INVENTORY = Object.freeze([
      ...VNC_SOURCE_ROWS.map(([stem, valence, section]) => makeRecord(stem, "vnc", valence, section)),
      makeRecord("itt-a", "vnc", "intransitive", "57.2"),
      makeRecord("cuā", "vnc", "intransitive", "57.2"),
      ...NNC_SOURCE_ROWS.map(stem => makeRecord(stem, "nnc", "not-applicable", "12-16")),
      ...NNC_LATE_SOURCE_ROWS.map(([stem, section]) => (
        makeRecord(stem, "nnc", "not-applicable", section)
      ))
    ]);
    function normalizeValenceSourceStem(value = "") {
      return String(value || "")
        .normalize("NFC")
        .trim()
        .toLowerCase()
        .replace(/[Øø⎕]/gu, "0")
        .replace(/[()[\]{}#]/gu, "")
        .replace(/\s+/gu, "")
        .replace(/^-+|-+$/gu, "");
    }
    function buildClassicalNahuatlValenceSourceAnalysis(request = {}) {
      const allowedKeys = new Set([
        "sourceStem",
        "observedValence",
        "incorporatedObjectStem",
        "matrixStem",
      ]);
      const requestObject = request && typeof request === "object"
        && !Array.isArray(request)
        ? request
        : {};
      const forbiddenKey = Reflect.ownKeys(requestObject)
        .find(key => typeof key !== "string" || !allowedKeys.has(key));
      const sourceStem = normalizeValenceSourceStem(requestObject.sourceStem);
      const observedValence = String(requestObject.observedValence || "")
        .trim()
        .toLowerCase();
      const incorporatedObjectStem = normalizeValenceSourceStem(
        requestObject.incorporatedObjectStem
      );
      const matrixStem = normalizeValenceSourceStem(requestObject.matrixStem);
      const simpleKey = `${sourceStem}|${observedValence}`;
      const simpleRecords = {
        "itt-a|intransitive": {
          expectedValence: "transitive",
          classification: "true-irregular-valence",
          sourceStructure: "simple-verbstem",
        },
        "cuā|intransitive": {
          expectedValence: "transitive",
          classification: "true-irregular-valence",
          sourceStructure: "simple-verbstem",
        },
      };
      const compoundAuthorized = (
        observedValence === "transitive"
        && incorporatedObjectStem === "ā-man-tē-0-ca-yō"
        && matrixStem === "tlāliā"
      );
      const record = simpleRecords[simpleKey] || (compoundAuthorized
        ? {
          expectedValence: "transitive",
          classification:
            "incorporated-compound-nounstem-object-not-irregular",
          sourceStructure: "incorporated-object-plus-transitive-matrix",
        }
        : null);
      const blockReason = forbiddenKey
        ? "valence-source-analysis-accepts-source-constituents-only"
        : !record
          ? "valence-source-analysis-not-lexically-authorized"
          : "";
      const frame = Object.freeze({
        kind: "classical-nahuatl-valence-source-analysis-frame",
        version: 1,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceStem,
        observedValence,
        incorporatedObjectStem,
        matrixStem,
        expectedValence: record?.expectedValence || "",
        classification: record?.classification || "",
        sourceStructure: record?.sourceStructure || "",
        lexicalFactsReadOnly: true,
        unknownSourcesBlocked: true,
        translationAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (!blockReason) issuedValenceSourceAnalysisFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlValenceSourceAnalysisFrame(frame = null) {
      return Boolean(
        issuedValenceSourceAnalysisFrames.has(frame)
        && frame?.kind === "classical-nahuatl-valence-source-analysis-frame"
        && frame.version === 1
        && frame.authorizationStatus === "authorized"
        && frame.lexicalFactsReadOnly === true
        && frame.unknownSourcesBlocked === true
        && frame.translationAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(frame)
      );
    }
    function getClassicalNahuatlCanonicalSourceStemInventory(basalUnit = "") {
      const normalizedUnit = String(basalUnit || "").trim().toLowerCase();
      return INVENTORY.filter(record => !normalizedUnit || record.basalUnit === normalizedUnit);
    }
    function getQuantityNeutralSourceStemKey(value = "") {
      return normalizeValenceSourceStem(value)
        .replace(/-/gu, "")
        .normalize("NFD")
        .replace(/\p{M}/gu, "");
    }
    function resolveClassicalNahuatlCanonicalSourceStemRecord(request = {}) {
      const allowedKeys = new Set([
        "enteredStem",
        "basalUnit",
        "valence",
        "sourceLexemeId",
      ]);
      const requestObject = request && typeof request === "object"
        && !Array.isArray(request)
        ? request
        : {};
      const forbiddenKey = Reflect.ownKeys(requestObject)
        .find(key => typeof key !== "string" || !allowedKeys.has(key));
      if (forbiddenKey) return null;
      const enteredStem = normalizeValenceSourceStem(requestObject.enteredStem);
      const basalUnit = String(requestObject.basalUnit || "").trim().toLowerCase();
      const valence = String(requestObject.valence || "")
        .trim()
        .toLowerCase();
      const sourceLexemeId = String(requestObject.sourceLexemeId || "")
        .trim()
        .toLowerCase();
      const validValence = basalUnit === "vnc"
        ? ["intransitive", "transitive"].includes(valence)
        : basalUnit === "nnc" && valence === "not-applicable";
      if (!enteredStem || !validValence) return null;
      const candidates = INVENTORY.filter(record => (
        record.basalUnit === basalUnit
        && record.valenceDisplay === valence
      ));
      const exactMatches = candidates.filter(record => (
        normalizeValenceSourceStem(record.stem) === enteredStem
      ));
      if (
        exactMatches.length === 1
        && (
          !sourceLexemeId
          || exactMatches[0].sourceLexemeIds.includes(sourceLexemeId)
        )
      ) return exactMatches[0];
      if (exactMatches.length > 1) return null;
      const quantityNeutralKey = getQuantityNeutralSourceStemKey(enteredStem);
      const quantityNeutralMatches = candidates.filter(record => (
        getQuantityNeutralSourceStemKey(record.stem) === quantityNeutralKey
      ));
      const sourceLexemeMatches = sourceLexemeId
        ? quantityNeutralMatches.filter(record =>
          record.sourceLexemeIds.includes(sourceLexemeId)
        )
        : quantityNeutralMatches;
      return sourceLexemeMatches.length === 1
        ? sourceLexemeMatches[0]
        : null;
    }
    function buildClassicalNahuatlCanonicalSourceSelectionFrame(request = {}) {
      const allowedKeys = new Set([
        "enteredStem",
        "basalUnit",
        "valence",
        "sourceLexemeId",
        "verbClass",
      ]);
      const requestObject = request && typeof request === "object"
        && !Array.isArray(request)
        ? request
        : {};
      const forbiddenKey = Reflect.ownKeys(requestObject)
        .find(key => typeof key !== "string" || !allowedKeys.has(key));
      const enteredStem = normalizeValenceSourceStem(
        requestObject.enteredStem,
      );
      const basalUnit = String(requestObject.basalUnit || "")
        .trim()
        .toLowerCase();
      const valence = String(requestObject.valence || "")
        .trim()
        .toLowerCase();
      const sourceLexemeId = String(requestObject.sourceLexemeId || "")
        .trim()
        .toLowerCase();
      const verbClass = String(requestObject.verbClass || "")
        .trim()
        .toUpperCase();
      const canonicalRecord = forbiddenKey
        ? null
        : resolveClassicalNahuatlCanonicalSourceStemRecord({
          enteredStem,
          basalUnit,
          valence,
          sourceLexemeId,
        });
      const openVncAnalysis = Boolean(
        !canonicalRecord
        && basalUnit === "vnc"
        && enteredStem
        && ["intransitive", "transitive"].includes(valence)
        && ["A", "B", "C", "D"].includes(verbClass)
        && !sourceLexemeId
      );
      const sourceLexemeAccepted = Boolean(
        canonicalRecord
        && (
          canonicalRecord.sourceLexemeSelectionRequired
            ? canonicalRecord.sourceLexemeIds.includes(sourceLexemeId)
            : !sourceLexemeId
        )
      );
      const blockReason = forbiddenKey
        ? "canonical-source-selection-accepts-source-constituents-only"
        : !canonicalRecord && !openVncAnalysis
          ? basalUnit === "vnc" && !verbClass
            ? "classical-source-verbstem-class-selection-required"
            : "classical-source-lexical-analysis-not-authorized"
          : canonicalRecord && !sourceLexemeAccepted
            ? canonicalRecord.sourceLexemeSelectionRequired
              ? "canonical-source-lexeme-selection-required"
              : "canonical-source-lexeme-selection-not-applicable"
          : "";
      const frame = Object.freeze({
        kind: "classical-nahuatl-canonical-source-selection-frame",
        version: 1,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        enteredStem,
        canonicalStem: canonicalRecord?.stem || (openVncAnalysis ? enteredStem : ""),
        basalUnit,
        valence,
        canonicalRecord,
        lexicalSelectionAuthority: canonicalRecord
          ? "canonical-lexical-inventory"
          : openVncAnalysis
            ? "user-supplied-lexical-analysis"
            : "",
        openStemSource: openVncAnalysis,
        verbClass: openVncAnalysis ? verbClass : "",
        sourceLexemeId: sourceLexemeAccepted ? sourceLexemeId : "",
        sourceLexemeSelectionRequired:
          canonicalRecord?.sourceLexemeSelectionRequired === true,
        availableSourceLexemeIds:
          canonicalRecord?.sourceLexemeIds || Object.freeze([]),
        sourceLexemeFactsReadOnly:
          canonicalRecord?.sourceLexemeFactsReadOnly === true,
        explicitBoundaryObserved: enteredStem.includes("-"),
        sourceConstituentAuthority: !blockReason,
        lexicalSourceAuthority: !blockReason,
        translationAuthority: false,
        editorialBoundaryAuthority: false,
        callerSuppliedGrammarAuthorityAccepted: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
      if (!blockReason) {
        issuedCanonicalSourceSelectionFrames.add(frame);
      }
      return frame;
    }
    function isClassicalNahuatlCanonicalSourceSelectionFrame(frame = null) {
      return Boolean(
        issuedCanonicalSourceSelectionFrames.has(frame)
        && frame?.kind
          === "classical-nahuatl-canonical-source-selection-frame"
        && frame.version === 1
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && (
          frame.openStemSource === true
            ? frame.basalUnit === "vnc"
              && frame.canonicalRecord === null
              && frame.canonicalStem === frame.enteredStem
              && ["intransitive", "transitive"].includes(frame.valence)
              && ["A", "B", "C", "D"].includes(frame.verbClass)
              && frame.lexicalSelectionAuthority
                === "user-supplied-lexical-analysis"
              && frame.sourceLexemeId === ""
              && frame.sourceLexemeSelectionRequired === false
              && frame.availableSourceLexemeIds.length === 0
              && frame.sourceLexemeFactsReadOnly === false
            : frame.openStemSource === false
              && frame.lexicalSelectionAuthority
                === "canonical-lexical-inventory"
              && frame.verbClass === ""
              && frame.canonicalRecord
              && isClassicalNahuatlCanonicalSourceStemRecord(
                frame.canonicalRecord,
              )
              && frame.canonicalRecord.stem === frame.canonicalStem
              && frame.canonicalRecord.basalUnit === frame.basalUnit
              && frame.canonicalRecord.valenceDisplay === frame.valence
              && resolveClassicalNahuatlCanonicalSourceStemRecord({
                enteredStem: frame.enteredStem,
                basalUnit: frame.basalUnit,
                valence: frame.valence,
                sourceLexemeId: frame.sourceLexemeId,
              }) === frame.canonicalRecord
              && frame.sourceLexemeSelectionRequired
                === frame.canonicalRecord.sourceLexemeSelectionRequired
              && frame.availableSourceLexemeIds
                === frame.canonicalRecord.sourceLexemeIds
              && frame.sourceLexemeFactsReadOnly
                === frame.canonicalRecord.sourceLexemeFactsReadOnly
              && (
                frame.sourceLexemeSelectionRequired
                  ? frame.canonicalRecord.sourceLexemeIds.includes(
                    frame.sourceLexemeId,
                  )
                  : frame.sourceLexemeId === ""
              )
        )
        && frame.explicitBoundaryObserved
          === frame.enteredStem.includes("-")
        && frame.sourceConstituentAuthority === true
        && frame.lexicalSourceAuthority === true
        && frame.translationAuthority === false
        && frame.editorialBoundaryAuthority === false
        && frame.callerSuppliedGrammarAuthorityAccepted === false
        && frame.lessonMetadataAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && Object.isFrozen(frame)
      );
    }
    function isClassicalNahuatlCanonicalSourceStemRecord(record = null) {
      if (!issuedCanonicalSourceStemRecords.has(record)
        || record.kind !== "classical-nahuatl-canonical-source-stem-record"
        || record.version !== 1) return false;
      if (!['vnc', 'nnc'].includes(record.basalUnit) || !record.stem || record.grammarAuthority !== false || record.formulaStringAuthority !== false) return false;
      const expectedDefaultSourceValence = record.basalUnit !== "vnc"
        ? "not-applicable"
        : record.valenceDisplay === "transitive"
          ? "specific-projective"
          : "intransitive";
      if (record.defaultSourceValence !== expectedDefaultSourceValence) return false;
      if (/[#>+=□]/u.test(record.citation)) return false;
      if (!record.initialIAnalysis || !["not-applicable", "real", "supportive", "contextual"].includes(record.initialIAnalysis.kind)) return false;
      if (/^[iī]/iu.test(record.stem) !== (record.initialIAnalysis.kind !== "not-applicable")) return false;
      const lexicalAlternativeFact = record.basalUnit === "vnc"
        ? VNC_LEXICAL_ALTERNATIVE_FACTS[record.stem] || null
        : null;
      const sourceLexemeFact = record.basalUnit === "vnc"
        ? VNC_SOURCE_LEXEME_FACTS[record.stem] || null
        : null;
      if (record.lexicalAlternativeGroupId !== (lexicalAlternativeFact?.groupId || "")
        || record.lexicalAlternativeRelation !== (lexicalAlternativeFact?.relation || "")
        || record.lexicalFactsReadOnly !== Boolean(lexicalAlternativeFact)
        || record.sourceLexemeRelation !== (sourceLexemeFact?.relation || "")
        || record.sourceLexemeSelectionRequired
          !== (sourceLexemeFact?.sourceLexemeSelectionRequired === true)
        || record.sourceLexemeIds
          !== (sourceLexemeFact?.sourceLexemeIds || record.sourceLexemeIds)
        || record.sourceLexemeSections
          !== (sourceLexemeFact?.sourceSections || record.sourceLexemeSections)
        || record.sourceLexemeFactsReadOnly !== Boolean(sourceLexemeFact)
        || !Array.isArray(record.sourceLexemeIds)
        || !Object.isFrozen(record.sourceLexemeIds)
        || !Array.isArray(record.sourceLexemeSections)
        || !Object.isFrozen(record.sourceLexemeSections)
        || record.translationAuthority !== false
        || record.userSelectableOperation !== false) return false;
      if (!sourceLexemeFact
        && (record.sourceLexemeIds.length || record.sourceLexemeSections.length)) {
        return false;
      }
      const expected = record.basalUnit === "vnc" && record.valenceDisplay === "transitive" ? `...-(${record.stem})` : `(${record.stem})`;
      return record.citation === expected;
    }
    function auditClassicalNahuatlCanonicalSourceStemInventory() {
      const invalidRecords = INVENTORY.filter(record => !isClassicalNahuatlCanonicalSourceStemRecord(record));
      const duplicateKeys = [];
      const seen = new Set();
      INVENTORY.forEach(record => {
        const key = `${record.basalUnit}|${record.valenceDisplay}|${record.stem}`;
        if (seen.has(key)) duplicateKeys.push(key);
        seen.add(key);
      });
      const quantityConflictPresent = INVENTORY.some(record => record.stem === "pin-ā-hua");
      const canonicalQuantityPresent = INVENTORY.some(record => record.stem === "pīn-ā-hua");
      return Object.freeze({
        kind: "classical-nahuatl-canonical-source-stem-inventory-audit",
        version: 1,
        recordCount: INVENTORY.length,
        vncCount: INVENTORY.filter(record => record.basalUnit === "vnc").length,
        nncCount: INVENTORY.filter(record => record.basalUnit === "nnc").length,
        invalidRecordCount: invalidRecords.length,
        duplicateCount: duplicateKeys.length,
        quantityConflictPresent,
        canonicalQuantityPresent,
        ok: invalidRecords.length === 0 && duplicateKeys.length === 0 && !quantityConflictPresent && canonicalQuantityPresent
      });
    }
    return {
      getClassicalNahuatlCanonicalSourceStemInventory,
      resolveClassicalNahuatlCanonicalSourceStemRecord,
      buildClassicalNahuatlCanonicalSourceSelectionFrame,
      isClassicalNahuatlCanonicalSourceSelectionFrame,
      getInitialISourceAnalysis,
      isClassicalNahuatlCanonicalSourceStemRecord,
      auditClassicalNahuatlCanonicalSourceStemInventory,
      buildClassicalNahuatlValenceSourceAnalysis,
      isClassicalNahuatlValenceSourceAnalysisFrame
    };
}

export function installClassicalNahuatlSourceStemInventoryGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlSourceStemInventoryApi();
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
