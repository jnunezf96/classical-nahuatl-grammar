// Canonical modern ESM module.

export function createClassicalNahuatlSourceStemInventoryApi() {
    const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    // Lexical genealogy identifies an entered derived stem; only the Lesson20
    // owner may authenticate the rule result or authorize a later finite use.
    const NONACTIVE_SOURCE_ANALYSES = Object.freeze({
      "nec-ō":Object.freeze({sourceStem:"nequi",sourceValence:"specific-projective",optionId:"ō:nec-ō"}),
    });
    // Attested preformed morphology is lexical Source analysis, not an
    // invitation to parse arbitrary repeated spelling as a derivation.
    const PREFORMED_SOURCE_ANALYSES = Object.freeze({
      "cah-ca-h": Object.freeze({baseStem:"ca-h",operation:"frequentative",variant:"ordinary-short-glottal",
        target:"lexical-stem",repetitions:1,sourceSections:Object.freeze(["22.6","11.5.1","27.2.1"]) }),
    });
    // These are attested analytical operands, not independently predicated
    // bases. The derivation owner must authenticate their licensed morphology.
    const ANALYTICAL_SOURCE_ANALYSES = Object.freeze(Object.fromEntries([
      ["chich-ī-ni", "B", "destockal-ni", "cn-l24-2431a-final-i-replacement", "24.5.7"],
      ["ciy-ā-hua", "", "destockal-long-vowel-hua", "cn-l24-2465-destockal-hua-hu-a", "24.6.5"],
      ["top-ē-hua", "", "destockal-long-vowel-hua", "cn-l24-2465-destockal-hua-hu-a", "24.6.5"],
      ["itz-ti", "A", "denominal-ti-internal-lo", "cn-l25-254-itzti-itzti-l-tia", "25.4.7"],
    ].map(([stem,sourceClass,formation,ruleId,sourceSection])=>[stem,Object.freeze({
      sourceRank:"restricted-analytical-verbstem-operand",sourceClass,formation,
      licensedOperationRuleIds:Object.freeze([ruleId]),sourceSection,
      independentFiniteUseLicensed:false,
    })])));
    // Restricted containing uses are separate from causative analytical Sources.
    // The containing owner must consume the actual lexical/structural operands.
    const RESTRICTED_CONTAINING_SOURCE_ANALYSES = Object.freeze({
      "cuā": Object.freeze({sourceRank:"restricted-intransitive-compound-matrix",sourceClass:"D",
        containingFamily:"adverbial-matrix",sourceSection:"57.2",independentFiniteUseLicensed:false,
        requiredAdverbialEntryId:"44.7-ichtaca",requiredAdverbialStem:"ichtacā",requiredAdverbialDegree:"second-degree"}),
      "it-hui": Object.freeze({sourceRank:"restricted-tla-impersonal-operand",sourceClass:"",
        containingFamily:"tla-impersonal",sourceSection:"22.6",independentFiniteUseLicensed:false,
        requiredSourceAttestation:"reconstructed-source",classIndependentTargetTenses:Object.freeze(["present"])}),
      "itz": Object.freeze({sourceRank:"defective-perfective-compound-matrix",sourceClass:"B",
        containingFamily:"archaic-motion-matrix",sourceSection:"11.4.5",independentFiniteUseLicensed:false,
        requiredSourceLexemeId:"cn-vnc-itz-motion-matrix",attestedEmbedStems:Object.freeze(["hui","itqui","huīca"])}),
    });
    const NOMINAL_SOURCE_RANK_CORRECTIONS = Object.freeze({
      "yaca":Object.freeze({actualBasalUnit:"nnc",sourceRank:"nounstem",coarseNounClass:"tl",
        sourceSection:"44.6",independentVncUseLicensed:false,licensedOperationId:"inceptive-ti",
        independentlyLicensedTargetClass:"B",perfectiveEvidence:"yaca-t",alternativeAStatus:"unestablished"}),
    });
    const IMPERFECTIVE_SOURCE_ANALYSES = Object.freeze(Object.fromEntries([
      ["āhui-ya","root-plus-ya"],["ahhuiā-ya","root-plus-ya"],
      ["ce-ce-ya","root-plus-ya"],["cuīca-ti","possession-ti"],
      ["aqui","lexical-intransitive"],["ciya-hui","lexical-intransitive"],
      ["huī-tequi","lexical-intransitive"],
      ["ihyā-ya","root-plus-ya"],["xoco-ya","root-plus-ya"],
      ["mazā-ti","inceptive-ti"],
      ["nāhua-ti","lexical-intransitive"],["nene-hc-i-hui","lexical-intransitive"],
      ["teci","lexical-intransitive"],["teo-hc-i-hui","lexical-intransitive"],
    ].map(([stem,formation])=>[stem,Object.freeze({sourceForm:"full-imperfective",formation,perfectiveClassStatus:"unresolved",
      ...(stem==="xoco-ya"?{licensedOperationRuleIds:Object.freeze(["cn-l25-2552-root-plus-ya-lia"]),sourceSection:"25.5.2"}:{})})])));
    // §50.6 attested full compounded future; perfective membership is unclaimed.
    const ADDITIONAL_IMPERFECTIVE_SOURCE_ANALYSES = Object.freeze({
      // §51.4.1 attests mo-ca in present VNCs. The admitted coordinate
      // does not establish a perfective class or prohibit unattested tenses.
      "mo-ca":Object.freeze({sourceForm:"full-imperfective",formation:"lexical-coverage-verbstem",
        perfectiveClassStatus:"unresolved",sourceSection:"51.4.1",classIndependentTenses:Object.freeze(["present"])}),
      "quiy-a-hui":Object.freeze({sourceForm:"full-imperfective",formation:"lexical-inherent-impersonal",perfectiveClassStatus:"established",
        sourceVoice:"inherent-impersonal",sourceSection:"22.1/30.11/50.9",sourceClass:"B",
        perfectiveClassEvidence:Object.freeze({
          ruleId:"cn-l55-556-quiy-a-hui-family-class-b",evidenceKind:"explicit-formation-class-rule",
          sourceDocument:SOURCE_DOCUMENT,sourceSection:"55.6",lineStart:23961,lineEnd:24003,
          sourceAuthority:"Andrews24.7;55.6;22.1",
          exactWitness:"The i-hui/a-hui family belongs to Class B; quiy-a-hui is discussed as probably root-formed, without an attested nominal ancestor.",
          classDefinitionSection:"7.3.1",nominalAncestryEstablished:false,attestedPerfectiveTokenEstablished:false
        })}),
      "xocohcihui":Object.freeze({sourceForm:"full-imperfective",formation:"attested-whole-imperfective",perfectiveClassStatus:"unresolved",sourceSection:"57.6",classIndependentTenses:Object.freeze(["present"])}),
      "ōn-xiuh-ti":Object.freeze({sourceForm:"full-imperfective",formation:"possessive-duration-ti",perfectiveClassStatus:"unresolved",classIndependentTenses:Object.freeze(["future"])}),
      "cal-aqui":Object.freeze({sourceForm:"full-imperfective",formation:"noun-verb-compound",perfectiveClassStatus:"established",
        sourceSection:"46.15",sourceClass:"B",perfectiveStem:"cal-ac",
        perfectiveClassEvidence:Object.freeze({
          ruleId:"cn-l28-28614-cal-aqui-perfective-class-b",sourceDocument:SOURCE_DOCUMENT,
          sourceSection:"28.6.14",lineStart:9648,lineEnd:9652,
          sourceAuthority:"Andrews28.6.14;47.3.2.a;7.3.1;7.4.1",
          exactWitness:"cal-aqui → cal-ac; Ōtitotlalohticalacqueh; Ōintlan nicalac",
          classDefinitionSection:"7.3.1/7.4.1",standaloneMatrixClassEstablished:false
        }),
        sourceConstituents:Object.freeze([Object.freeze({stem:"cal",rank:"nounstem"}),Object.freeze({stem:"aqui",rank:"verbstem"})])})
    });
    const TRANSITIVE_IMPERFECTIVE_SOURCE_ANALYSES = Object.freeze(Object.fromEntries([
      // §53.1.6 supplies objective-prefixed present predicates. Its introductory
      // NNC label is inconsistent with those examples; no perfective is given.
      ...["nēnehuilia", "nehuihuilia"].map(stem => [stem, Object.freeze({
        sourceForm: "full-imperfective", formation: "attested-resemblance-verbstem",
        perfectiveClassStatus: "unresolved", sourceSection: "53.1.6",
        classIndependentTenses: Object.freeze(["present"]),
        classIndependentObjectKinds: Object.freeze(["specific-projective"]),
      })]),
      ...[["ināya","7.8 Note1"],["ztlac-mēya","57.6"]].map(([stem,sourceSection])=>[stem,Object.freeze({
        sourceForm:"full-imperfective",formation:"attested-whole-reflexive-imperfective",sourceValence:"mainline-reflexive",
        containedObjectKind:"reflexive",perfectiveClassStatus:"unresolved",sourceSection,classIndependentTenses:Object.freeze(["present"]),
        ...(stem==="ztlac-mēya"?{sourceRank:"selected-reflexive-nonpast-allomorph",allowedSubjects:Object.freeze(["1sg"])}:{})})]),
      ...["ciya-hui", "huī-tequi", "īmacaci", "ih-tlani", "tēmiqui", "teci"].map(stem => [stem, Object.freeze({
        sourceForm:"full-imperfective", formation:"lexical-transitive", perfectiveClassStatus:"unresolved"
      })]),
      ["tla-tzatzanatza",Object.freeze({sourceForm:"full-imperfective",formation:"attested-analyzed-object-prefix",perfectiveClassStatus:"unresolved",
        sourceRank:"analyzed-object-prefixed-imperfective-verbstem",lexicalVerbstem:"tzatzanatza",containedObjectKind:"nonspecific-nonhuman",
        containedObjectPrefix:"tla",sourceValence:"projective-nonhuman",classIndependentTenses:Object.freeze(["present"]),
        sourcePrefixAnalysis:Object.freeze({prefix:"tla",role:"nonspecific-nonhuman-object",lexicalVerbstem:"tzatzanatza",independentLexicalEvidence:"Molina1571:142v+Andrews1.13"})})],
      ["ihtzoma", Object.freeze({
        sourceForm:"full-imperfective", formation:"lexical-transitive", perfectiveClassStatus:"unresolved",
        classIndependentTenses:Object.freeze(["present", "future"])
      })],
      // §§26.16/26.21 attest direct presents; §2.2 explains final reduced-long
      // spelling. External lexical perfectives establish A; retain the full
      // citation and permanent earlier written-present witness ID.
      ["nāmoyā", Object.freeze({
        sourceForm:"full-imperfective", formation:"lexical-transitive", perfectiveClassStatus:"established",
        sourceClass:"A",perfectiveStem:"nāmoyā",perfectiveSubclassStatus:"unclaimed",
        perfectiveClassEvidence:Object.freeze({
          ruleId:"cn-lexical-namoya-perfective-class-a",
          url:"https://nahuatl.wired-humanities.org/content/namoya",
          sourceAuthority:"Karttunen1992:159;Molina1571:062v.2;Lockhart2001:226",
          exactWitness:"NĀMOYĀ → NĀMOYĀC; Lockhart Class 1, ōnicnāmoyāc",
          classDefinitionSection:"Andrews7.3",alternativeShortPerfectiveLicensed:false
        }),
        classIndependentObjectKinds:Object.freeze(["specific-projective","nonspecific-human","nonspecific-nonhuman"]),
        finalImperfectiveVowelRealization:"ordinary-long-vowel",
        attestedFiniteCells:Object.freeze([Object.freeze({
          id:"cn-l26-2621-namoya-human-present-cell",sourceSection:"26.21",stem:"nāmoya",
          stemRole:"written-boundary-witness-not-lexical-allomorph",underlyingStem:"nāmoyā",
          selections:Object.freeze({subject:"1sg",subjectAnimacy:"animate",subjectHumanness:"human",
            mood:"indicative",tense:"present",requestedVoice:"active",requestedDerivation:"direct",
            objectSelection:"nonspecific-human:"})
        })])
      })]
    ]));
    const issuedCanonicalSourceStemRecords = new WeakSet();
    const issuedCanonicalSourceSelectionFrames = new WeakSet();
    const issuedValenceSourceAnalysisFrames = new WeakSet();
    const INITIAL_I_SOURCE_ANALYSES = Object.freeze({
      "vnc|transitive|ih-zō-tla": Object.freeze({
        kind:"real",
        nonactiveBoundaryProfile:Object.freeze({context:"impersonal-shuntline-ne",sourceValence:"mainline-reflexive",
          targetValence:"shuntline-reflexive",sourceInitialVowelKind:"real",targetInitialVowelKind:"supportive",
          tenses:Object.freeze(["future"]),sourceSections:Object.freeze(["2.6 Note1","55.2","57.3"])}),
        ruleId:"cn-l2-26-ihzotla-lexical-context-initial-i",
        sourceAuthority:"Andrews 55.2 original601 m-Ø-(ih-zō-tla);57.3 original625 ne-hzō-tla-lō-z;2.6 Note1",
        exactWitness:"The cited mainline reflexive retains real i; the attested impersonal future rejects i after shuntline ne. Other lexical contexts are unclaimed."
      }),
      "vnc|transitive|ihtzoma": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l26-262-ihtzoma-image-imaginary-initial-i",
        sourceAuthority: "Andrews 26.2 printed page 212, initial italic i",
        exactWitness: "The original ihtzoma and ihtzom-iā have italic initial i, contrasting upright suffix iā."
      }),
      "vnc|transitive|il-pītza": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l26-267-ilpitza-supportive-initial-i",
        sourceAuthority: "Andrews 26.7 printed page 216; explicit supportive-i nounstem analysis",
        exactWitness: "The compound il-pītza has nounstem *(il)-li as embed; its initial i is explicitly supportive."
      }),
      "vnc|transitive|ixca": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l26-262-ixca-image-imaginary-initial-i",
        sourceAuthority: "Andrews 26.2 printed page 212, initial italic i",
        exactWitness: "The printed ixca and ixqu-iā mark their initial i as imaginary/supportive."
      }),
      "vnc|intransitive|ilpi": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l24-2431b-ilpi-image-imaginary-initial-i",
        sourceAuthority: "Andrews 24.3.1.b printed page 184, initial italic i",
        exactWitness: "The printed ilpi, ilpi-ā and ilpi-h mark the initial i as imaginary/supportive."
      }),
      "vnc|intransitive|ix-tlā-hui": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l24-2431a-ixtlahui-image-imaginary-initial-i",
        sourceAuthority: "Andrews 24.3.1.a printed page 184, initial italic i",
        exactWitness: "The printed ix-tlā-hui and ix-tlā-hu-a mark the initial i as imaginary/supportive."
      }),
      "vnc|transitive|ix-tlā-hu-a": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l24-2431a-ixtlahua-image-imaginary-initial-i",
        sourceAuthority: "Andrews 24.3.1.a printed page 184, initial italic i",
        exactWitness: "The printed ix-tlā-hu-a retains the source's imaginary/supportive initial i."
      }),
      "vnc|transitive|ihcali": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l20-206-ihcali-image-imaginary-initial-i",
        sourceAuthority: "Andrews 20.6 printed page 164, initial italic i",
        exactWitness: "The printed ihcali shows italic initial i, marking imaginary/supportive i."
      }),
      "vnc|transitive|ihcuani-ā": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l20-206-ihcuani-ā-image-imaginary-initial-i",
        sourceAuthority: "Andrews 20.6 printed page 164, initial italic i",
        exactWitness: "The printed ihcuani-ā shows italic initial i, marking imaginary/supportive i."
      }),
      "vnc|intransitive|ihza": Object.freeze({
        kind: "real",
        // Keep this historical fact identity resolvable; its old name is not an analysis.
        ruleId: "cn-l20-205-ihza-image-imaginary-initial-i",
        sourceAuthority: "Andrews 20.5 printed page 163 and 25.2.2 printed page 196, roman initial i",
        exactWitness: "The original ihza, ihx-o-hua and ihxi-hua have upright initial i, contrasted with the italic imaginary i of itqui. The prior supportive reading was incorrect."
      }),
      "vnc|transitive|itqui": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l20-204-itqui-image-imaginary-initial-i",
        sourceAuthority: "Andrews 20.4 printed page 162, initial italic i",
        exactWitness: "The printed itqui and itc-ō show italic initial i, marking imaginary/supportive i."
      }),
      "vnc|transitive|itt-a": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l7-79-itta-supportive-initial-i-source",
        sourceAuthority: "Andrews 7.9",
        exactWitness: "(itt-a) has supportive initial i: niquitta and nitēitta contrast with ninotta, timotta, titottah and nitlatta."
      }),
      "vnc|intransitive|ihc-i-hui": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l25-2524-ihcihui-image-imaginary-initial-i",
        sourceAuthority: "Andrews 25.2.4 printed page 197, initial italic i",
        exactWitness: "The printed ihc-i-hui and ihc-i-huī-tiā mark initial i as imaginary/supportive; internal stock i is roman."
      }),
      "vnc|intransitive|iuc-ci": Object.freeze({
        kind: "supportive",
        ruleId: "cn-l25-2522-iucci-iucxitia-source-supportive-i",
        sourceAuthority: "Andrews 25.2.2",
        exactWitness: "(iuc-ci) > (iuc-xi-hua) > (iuc-xi-tiā): the initial i is supportive in the canonical source route."
      }),
      "vnc|transitive|ih-tlani": Object.freeze({
        kind: "contextual",
        defaultResolvedKind: "real",
        allowedResolvedKindsByValence: Object.freeze({
          "projective-nonhuman": Object.freeze(["real", "supportive"])
        }),
        ruleId: "cn-l26-262-incorporated-ih-optional-supportive-i-after-tla",
        sourceAuthority: "Andrews 26.2",
        exactWitness: "At times the i of incorporated ih is treated like a supportive i after tla; retained i remains permitted."
      }),
      "vnc|transitive|iht-o-ā": Object.freeze({
        kind: "contextual",
        resolvedKindsByValence: Object.freeze({
          "projective-nonhuman": "supportive"
        }),
        allowedResolvedKindsByValence: Object.freeze({
          "mainline-reflexive": Object.freeze(["real", "supportive"])
        }),
        defaultResolvedKind: "real",
        ruleId: "cn-l2-26-ihtoa-contextual-initial-i-source",
        sourceAuthority: "Andrews 2.6 Note 1",
        exactWitness: "tla-(iht-o-a) > tlahtoa: after tla- the initial i is supportive and is rejected; §37.9.2 ne-ht-ō-l retains its reflexive source's supportive-i analysis. Other licensed boundaries retain real i."
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
      "itz": Object.freeze({relation:"lexical-source-sense-distinction",sourceLexemeSelectionRequired:true,
        sourceLexemeIds:Object.freeze(["cn-vnc-itz-motion-matrix","cn-vnc-itz-alert-observant"]),
        sourceSections:Object.freeze(["11.4.5"]),
        sourceLexemeOptions:Object.freeze([
          Object.freeze({id:"cn-vnc-itz-motion-matrix",label:"come / go, in the archaic compound",reading:"motion"}),
          Object.freeze({id:"cn-vnc-itz-alert-observant",label:"be alert / observant",reading:"alert-observant"})])}),

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
    // This is an attested lexical anomaly, not a productive valence rule.
    // §20 gives the ordinary zero-object Source; §42.8.5 explicitly calls
    // its observed applicative object formally unjustified.
    const VNC_ATTESTED_OBJECT_FACTS = Object.freeze({
      chihcha: Object.freeze({
        kind: "classical-nahuatl-source-attested-object-fact",
        ruleId: "cn-l42-4285-chihcha-formally-unjustified-object",
        sourceDocument: SOURCE_DOCUMENT,
        sourceSection: "42.8.5",
        ordinarySourceSection: "20.2.1",
        ordinarySourceClass: "A",
        ordinarySourceValence: "intransitive",
        ordinarySourceObjectCount: 0,
        observedObjectKind: "specific-projective",
        observedObjectPerson: "3sg",
        formallyLicensed: false,
        applicativeSuffixPresent: false,
        explanation: "Andrews attests an applicative object here and explicitly calls it formally unjustified. The ordinary Source remains intransitive; no applicative suffix is present.",
        targetScope: Object.freeze({subject: "3sg", mood: "indicative", tense: "present", voice: "active", directionalPrefix: "on"}),
        otherParadigmCellsClaimed: false,
      }),
    });
    const VNC_SOURCE_ROWS = Object.freeze([
      ["chihcha", "intransitive", "20.2.1"],
      ["ā-miqui", "intransitive", "26.1"], ["ahci", "intransitive", "24.2"], ["ahci", "transitive", "24.2"], ["ahhuiā-ya", "intransitive", "25.5.2"],
      ["āhui-ya", "intransitive", "25.4.8"], ["āna", "transitive", "26.7"], ["aqui", "intransitive", "24.3.1.b"], ["āyacach-o-ā", "intransitive", "26.9"],
      ["āyi", "transitive", "26.4"], ["caqui", "transitive", "25.2.1"], ["ce-ce-ya", "intransitive", "25.5.2"], ["ce-li-liā", "transitive", "26.6"],
      ["ce-liā", "transitive", "26.6"], ["ce-ya", "intransitive", "26.8"], ["chacu-ā-ni", "intransitive", "24.5.7"], ["chay-ā-hui", "intransitive", "24.5.7"],
      ["chich-ī-ni", "intransitive", "24.5.7"], ["chichi-ya", "intransitive", "25.5.2"], ["chīhua", "transitive", "25.4"], ["chip-ā-hua", "intransitive", "24.6.5"],
      ["chōca", "intransitive", "25.2.1"], ["chol-o-ā", "intransitive", "25.4"], ["ciy-ā-hua", "intransitive", "24.6.5"], ["ciya-hui", "intransitive", "24.2"],
      ["ciya-hui", "transitive", "24.2"], ["cochi", "intransitive", "25.2"], ["coco-a", "transitive", "26.9"], ["coco-ya", "intransitive", "24.3.2.b"],
      ["cōhua", "transitive", "26.2"], ["cot-ō-ni", "intransitive", "24.5.7"], ["cuā", "transitive", "25.4"], ["cual-ā-ni", "intransitive", "25.3"],
      ["cuepi", "intransitive", "24.3.1.a"], ["cui", "transitive", "26.2"], ["cuīca", "intransitive", "1.13"], ["cuīca-ti", "intransitive", "26.2"],
      ["ē-hua", "intransitive", "24.3.2.a"],
      ["huā-qui", "intransitive", "24.3.1.a"], ["huāl-la-uh", "intransitive", "25.1"], ["hue-tz-ca", "intransitive", "25.2.4"], ["hue-tz-ca", "transitive", "25.2.4"],
      ["cel-i-ya", "intransitive", "22.6"], ["ihyā-ya", "intransitive", "22.6"], ["cah-ca-h", "intransitive", "22.6"], ["chic-ā-hua", "intransitive", "22.6"],
      ["huē-i-ya", "intransitive", "22.6"], ["it-hui", "intransitive", "22.6"], ["petl-ā-ni", "intransitive", "22.6"], ["tlatz-ī-ni", "intransitive", "22.6"],
      ["poy-ā-hua", "intransitive", "22.6"], ["yohua", "intransitive", "22.6"], ["ih-cahu-a-ca", "intransitive", "22.6"], ["cue-cuech-ca", "intransitive", "22.6"], ["izta-ya", "intransitive", "22.6"],
      ["huetzi", "intransitive", "26.4"], ["huī-tequi", "intransitive", "24.2"], ["huī-tequi", "transitive", "24.2"], ["ī", "transitive", "25.2"],
      ["ih-tlani", "transitive", "26.2"], ["ihc-i-hui", "intransitive", "25.2.4"], ["ihcuil-o-ā", "transitive", "26.9"], ["ih-ca", "intransitive", "11.4.1"], ["iht-o-ā", "transitive", "26.9"],
      ["ihtzoma", "transitive", "26.2"], ["ihza", "intransitive", "25.2.2"], ["il-pītza", "transitive", "26.7"], ["ilama-ti", "intransitive", "11.3.2"], ["ilpi", "intransitive", "24.3.1.b"],
      ["itz", "intransitive", "11.4.5 note 2"], ["itz-ti", "intransitive", "25.4.7"], ["i-ā", "intransitive", "11.4.7"],
      ["īmacaci", "transitive", "25.4.4"], ["īnāya", "transitive", "26.7"], ["itqui", "transitive", "25.2"], ["itt-a", "transitive", "25.2.3"],
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
      ["nel", "44.5.1"], ["hueli", "44.5.2"], ["nēn", "44.5.3"],
      ["mō", "44.5.4"], ["cuēl", "44.5.5"], ["mach", "44.5.6"],
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
        canonicalImperfectiveAnalysis: basalUnit !== "vnc" ? null
          : valence === "intransitive" ? IMPERFECTIVE_SOURCE_ANALYSES[stem] || ADDITIONAL_IMPERFECTIVE_SOURCE_ANALYSES[stem] || null
            : valence === "transitive" ? TRANSITIVE_IMPERFECTIVE_SOURCE_ANALYSES[stem] || null : null,
        ...(basalUnit === "vnc" && valence === "intransitive" && ANALYTICAL_SOURCE_ANALYSES[stem]
          ? {canonicalAnalyticalSourceAnalysis:ANALYTICAL_SOURCE_ANALYSES[stem]} : {}),
        ...(basalUnit === "vnc" && valence === "intransitive" && RESTRICTED_CONTAINING_SOURCE_ANALYSES[stem]
          ? {canonicalRestrictedContainingSourceAnalysis:RESTRICTED_CONTAINING_SOURCE_ANALYSES[stem]} : {}),
        ...(basalUnit === "vnc" && valence === "intransitive" && NOMINAL_SOURCE_RANK_CORRECTIONS[stem]
          ? {canonicalNominalSourceRankCorrection:NOMINAL_SOURCE_RANK_CORRECTIONS[stem]} : {}),
        ...(sourceLexemeFact?.sourceLexemeOptions ? {sourceLexemeOptions:sourceLexemeFact.sourceLexemeOptions} : {}),
        canonicalPreformedDerivation: basalUnit === "vnc" ? PREFORMED_SOURCE_ANALYSES[stem] || null : null,
        canonicalNonactiveDerivation: basalUnit === "vnc" ? NONACTIVE_SOURCE_ANALYSES[stem] || null : null,
        sourceAttestedObjectFact: basalUnit === "vnc" ? VNC_ATTESTED_OBJECT_FACTS[stem] || null : null,
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
    // Attested full Sources used as containing-clause inputs need canonical
    // analysis without creating a second example-picker address.
    const CONTAINING_CONTEXT_SOURCE_RECORDS=Object.freeze([
      ...Object.keys(ADDITIONAL_IMPERFECTIVE_SOURCE_ANALYSES).filter(stem=>!VNC_SOURCE_ROWS.some(row=>row[0]===stem && row[1]==="intransitive"))
        .map(stem=>makeRecord(stem,"vnc","intransitive",ADDITIONAL_IMPERFECTIVE_SOURCE_ANALYSES[stem].sourceSection||"50.6")),
      ...Object.keys(TRANSITIVE_IMPERFECTIVE_SOURCE_ANALYSES).filter(stem=>!VNC_SOURCE_ROWS.some(row=>row[0]===stem && row[1]==="transitive"))
        .map(stem=>makeRecord(stem,"vnc","transitive",TRANSITIVE_IMPERFECTIVE_SOURCE_ANALYSES[stem].sourceSection || "7.8")),
      makeRecord("ih-zō-tla","vnc","transitive","55.2")
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
    // Only immutable lexical records (or an unresolved lookup) are reused.
    // Source frames, Participants and grammatical authorizations are not keys
    // or values here; each owner instance keeps a bounded lookup of its facts.
    const canonicalSourceStemRecordLookupCache = new Map();
    const canonicalSourceStemRecordLookupCacheLimit = 256;
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
      const lookupKey = JSON.stringify([
        enteredStem, basalUnit, valence, sourceLexemeId,
      ]);
      if (canonicalSourceStemRecordLookupCache.has(lookupKey)) {
        return canonicalSourceStemRecordLookupCache.get(lookupKey);
      }
      const rememberRecord = record => {
        if (canonicalSourceStemRecordLookupCache.size
          >= canonicalSourceStemRecordLookupCacheLimit) {
          canonicalSourceStemRecordLookupCache.delete(
            canonicalSourceStemRecordLookupCache.keys().next().value,
          );
        }
        canonicalSourceStemRecordLookupCache.set(lookupKey, record);
        return record;
      };
      const candidates = [...INVENTORY,...CONTAINING_CONTEXT_SOURCE_RECORDS].filter(record => (
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
      ) return rememberRecord(exactMatches[0]);
      if (exactMatches.length > 1) return rememberRecord(null);
      const quantityNeutralKey = getQuantityNeutralSourceStemKey(enteredStem);
      const quantityNeutralMatches = candidates.filter(record => (
        getQuantityNeutralSourceStemKey(record.stem) === quantityNeutralKey
      ));
      const sourceLexemeMatches = sourceLexemeId
        ? quantityNeutralMatches.filter(record =>
          record.sourceLexemeIds.includes(sourceLexemeId)
        )
        : quantityNeutralMatches;
      return rememberRecord(sourceLexemeMatches.length === 1
        ? sourceLexemeMatches[0]
        : null);
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
      if (record.sourceAttestedObjectFact !== (record.basalUnit === "vnc"
        ? VNC_ATTESTED_OBJECT_FACTS[record.stem] || null : null)) return false;
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
