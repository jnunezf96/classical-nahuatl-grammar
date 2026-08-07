"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11_full_paradigm_source_registry");

    s.eq(
        "A catalogued Lesson 11 initial-i source reaches its full paradigm without an invented source choice",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "ih-ca",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "ih-ca",
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["imperfective-indicative", "perfective-indicative"],
                tenseKeys: ["preterit-as-present", "distant-past-as-past"],
                subjectKeys: ["1sg"]
            });
            const find = (tense) => frame.rows.find((row) => row.subject === "1sg" && row.mood === "indicative" && row.tense === tense) || {};
            const inventory = ctx.getClassicalNahuatlCanonicalSourceStemInventory("vnc");
            const source = inventory.find((record) => record.stem === "ih-ca" && record.valenceDisplay === "intransitive") || {};
            const preteritAsPresent = find("preterit-as-present");
            const distantPastAsPast = find("distant-past-as-past");
            return {
                status: frame.authorizationStatus,
                rows: frame.rowCount,
                sourceInitialIKind: source.initialIAnalysis?.kind || "",
                preteritAsPresent: [
                    preteritAsPresent.paradigmTense,
                    preteritAsPresent.semanticTenseValue,
                    preteritAsPresent.morphologicalTense,
                    preteritAsPresent.formula,
                ],
                distantPastAsPast: [
                    distantPastAsPast.paradigmTense,
                    distantPastAsPast.semanticTenseValue,
                    distantPastAsPast.morphologicalTense,
                    distantPastAsPast.formula,
                ]
            };
        })(),
        {
            status: "authorized",
            rows: 2,
            sourceInitialIKind: "real",
            preteritAsPresent: ["preterit-as-present", "present", "preterit", "#n-0(ih-ca)0+c-0#"],
            distantPastAsPast: ["distant-past-as-past", "general-past", "distant-past", "#n-0(ih-ca)ca+0-0#"]
        }
    );

    s.eq(
        "Known Lesson 11 initial-i sources reach their own typed gates before a paradigm is omitted",
        (() => {
            const build = (stem, verbClass) => ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem,
                sourceTransitivity: "intransitive",
                sourceMatrixStem: stem,
                verbClass,
                requestedVerbClass: verbClass,
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["imperfective-indicative"],
                tenseKeys: ["present"],
                subjectKeys: ["1sg"]
            });
            return [
                ["itz", build("itz", "B")],
                ["i-ā", build("i-ā", "C")]
            ].map(([stem, frame]) => [
                stem,
                frame.omissionReasons?.["classical-vnc-source-initial-i-selection-required"] || 0,
                Object.keys(frame.omissionReasons || {})[0] || ""
            ]);
        })(),
        [
            ["itz", 0, "canonical-vnc-application-paradigm-plan-required"],
            ["i-ā", 0, "canonical-vnc-application-paradigm-plan-required"]
        ]
    );

    s.eq(
        "Lesson 11 compact aliases preserve their canonical internal morpheme boundaries in full-paradigm formulas",
        (() => {
            const build = (stem) => ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem,
                sourceTransitivity: "intransitive",
                sourceMatrixStem: stem,
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["imperfective-indicative"],
                tenseKeys: ["present"],
                subjectKeys: ["1sg"]
            });
            return [
                ["ono", "on-o"],
                ["ihca", "ih-ca"],
                ["pilca", "pil-ca"]
            ].map(([compactStem, canonicalStem]) => {
                const compact = build(compactStem);
                const canonical = build(canonicalStem);
                const compactPlan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan(compactStem, {
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present"
                });
                return [
                    compact.authorizationStatus,
                    compact.rows[0]?.formula || "",
                    compact.rows[0]?.surface || "",
                    canonical.rows[0]?.formula || "",
                    canonical.rows[0]?.surface || "",
                    compactPlan.canonicalSourceStem,
                    compactPlan.sourceStemCanonicalized
                ];
            });
        })(),
        [
            ["authorized", "#n-0(on-o)0+c-0#", "nonoc", "#n-0(on-o)0+c-0#", "nonoc", "on-o", true],
            ["authorized", "#n-0(ih-ca)0+c-0#", "nihcac", "#n-0(ih-ca)0+c-0#", "nihcac", "ih-ca", true],
            ["authorized", "#ni-0(pil-ca)0+c-0#", "nipilcac", "#ni-0(pil-ca)0+c-0#", "nipilcac", "pil-ca", true]
        ]
    );

    s.eq(
        "Lesson 11.3.1 full paradigms keep ahco-cui as the imperfective source and ahco-uc as the perfective member",
        (() => {
            const source = {
                basalUnit: "vnc",
                lesson: "7",
                stem: "ahco-cui",
                sourceTransitivity: "transitive",
                sourceEmbedStem: "ahco",
                sourceMatrixStem: "cui",
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "specific-projective",
                requestedValence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            };
            const frame = ctx.buildClassicalVncParadigmFrame(source, {
                groupKeys: ["imperfective-indicative", "perfective-indicative"],
                tenseKeys: ["present", "preterit"],
                subjectKeys: ["1sg"]
            });
            const presentPlan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("ahco-cui", {
                subject: "1sg",
                mood: "indicative",
                tense: "present"
            });
            const preteritPlan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("ahco-cui", {
                subject: "1sg",
                mood: "indicative",
                tense: "preterit"
            });
            return {
                status: frame.authorizationStatus,
                rows: frame.rows.map((row) => [row.tense, row.formula, row.surface, row.typedSlotFrame?.slots?.predicate?.stem || ""]),
                presentPlan: [presentPlan.selectedClassOverride, presentPlan.selectedStemOverride],
                preteritPlan: [preteritPlan.selectedClassOverride, preteritPlan.selectedStemOverride]
            };
        })(),
        {
            status: "authorized",
            rows: [
                ["present", "#ni-0+c-0(ahco-cui)0+0-0#", "nicahcocui", "ahco-cui"],
                ["preterit", "#ni-0+c-0(ahco-uc)0+⎕-0#", "nicahcouc", "ahco-uc"]
            ],
            presentPlan: ["B", ""],
            preteritPlan: ["B", "ahco-uc"]
        }
    );

    s.eq(
        "Lesson 11 plural-only cen-hui prepares from an authorized coordinate without inventing singular rows",
        (() => {
            const source = {
                basalUnit: "vnc",
                lesson: "7",
                stem: "cen-hui",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "cen-hui",
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            };
            const pluralTable = ctx.buildClassicalVncParadigmFrame(source, {
                groupKeys: ["imperfective-indicative"],
                tenseKeys: ["present"],
                subjectKeys: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
            });
            const singularOnly = ctx.buildClassicalVncParadigmFrame(source, {
                groupKeys: ["imperfective-indicative"],
                tenseKeys: ["present"],
                subjectKeys: ["1sg"]
            });
            const generalPast = ctx.buildClassicalVncParadigmFrame(source, {
                tenseKeys: ["general-past"],
                subjectKeys: ["1pl", "2pl", "3pl"]
            });
            const generalPastPlan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("cen-hui", {
                subject: "1pl",
                mood: "indicative",
                tense: "general-past"
            });
            return [
                pluralTable.authorizationStatus,
                pluralTable.rowCount,
                pluralTable.rows.map(row => [row.subject, row.formula, row.surface]),
                pluralTable.omissionReasons?.["cen-hui-requires-a-plural-subject"] || 0,
                singularOnly.authorizationStatus,
                singularOnly.rowCount,
                singularOnly.omissionReasons?.["canonical-vnc-application-paradigm-plan-required"] || 0,
                generalPast.authorizationStatus,
                generalPast.rows.map(row => [row.subject, row.formula, row.surface]),
                generalPastPlan.morphologicalTense,
                generalPastPlan.deletePostStemK
            ];
        })(),
        [
            "authorized",
            3,
            [
                ["1pl", "#ti-0(cen-hui)0+0-h#", "ticenhuih"],
                ["2pl", "#an-0(cen-hui)0+0-h#", "ancenhuih"],
                ["3pl", "#0-0(cen-hui)0+0-h#", "cenhuih"]
            ],
            3,
            "blocked",
            0,
            1,
            "authorized",
            [
                ["1pl", "#ti-0(cen-hui)a+0-h#", "ticenhuiah"],
                ["2pl", "#an-0(cen-hui)a+0-h#", "ancenhuiah"],
                ["3pl", "#0-0(cen-hui)a+0-h#", "cenhuiah"]
            ],
            "distant-past",
            true
        ]
    );

    s.eq(
        "Semantic pronominal-NNC construction obtains Lesson 16 cooperation for scalar and full-paradigm zero-root i-a",
        (() => {
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const scalar = application.evaluate({
                sourceStem: "i-ā",
                verbClass: "C",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                construction: "pronominal-nnc"
            });
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "i-ā",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "i-ā",
                verbClass: "C",
                requestedVerbClass: "C",
                valence: "intransitive",
                requestedValence: "intransitive",
                subject: "3sg",
                constructionSelection: "pronominal-nnc",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["imperfective-indicative"],
                tenseKeys: ["present"],
                subjectKeys: ["3sg", "1sg"]
            });
            const matching = frame.rows.find((row) => row.subject === "3sg") || {};
            return [
                scalar.authorizationStatus,
                scalar.resultFrame?.formulaRealization || "",
                frame.authorizationStatus,
                frame.rowCount,
                matching.formula || "",
                frame.omissionReasons?.["zero-i-a-requires-pronominal-nnc-cooperation"] || 0
            ];
        })(),
        ["authorized", "#0-0(0-i-h)0+⎕-0#", "authorized", 2, "#0-0(0-i-h)0+⎕-0#", 0]
    );

    s.eq(
        "Lesson 11 fused directionals own their VNC slot, so a full paradigm cannot double on-o or hual-la",
        (() => {
            const build = ({ stem, verbClass, directionalPrefix }) => ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem,
                sourceTransitivity: "intransitive",
                sourceMatrixStem: stem,
                verbClass,
                requestedVerbClass: verbClass,
                valence: "intransitive",
                requestedValence: "intransitive",
                directionalPrefix,
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["imperfective-indicative"],
                tenseKeys: ["present"],
                subjectKeys: ["1sg"]
            });
            const blockedOn = build({ stem: "on-o", verbClass: "A", directionalPrefix: "on" });
            const blockedHual = build({ stem: "huāl-lā", verbClass: "D", directionalPrefix: "huāl" });
            const connectiveMatrix = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("on-o", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                directionalPrefix: "on",
                connectiveTMatrix: true
            });
            return [
                blockedOn.authorizationStatus,
                blockedOn.rowCount,
                blockedOn.omissionReasons?.["canonical-vnc-application-paradigm-plan-required"] || 0,
                blockedHual.authorizationStatus,
                blockedHual.rowCount,
                blockedHual.omissionReasons?.["canonical-vnc-application-paradigm-plan-required"] || 0,
                connectiveMatrix.authorizationStatus,
                connectiveMatrix.selectedStemOverride
            ];
        })(),
        ["blocked", 0, 1, "blocked", 0, 1, "authorized", "o"]
    );

    s.eq(
        "Lesson 11 alert itz reuses its available preterit indicative form for the preterit-optative coordinate",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "itz",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "itz",
                verbClass: "B",
                requestedVerbClass: "B",
                valence: "intransitive",
                requestedValence: "intransitive",
                lexicalReadingSelection: "alert-observant",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["perfective-optative"],
                tenseKeys: ["preterit"],
                subjectKeys: ["1sg"]
            });
            const row = frame.rows[0] || {};
            return [frame.authorizationStatus, frame.rowCount, row.formula, row.surface];
        })(),
        ["authorized", 1, "#n-0(itz)0+⎕-0#", "Mā ōnitz."]
    );

    s.eq(
        "Lesson 11.5.1.c.i keeps one be preterit-as-present GCD and its complete conditioned LCM",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "ye",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "ye",
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["imperfective-indicative", "perfective-indicative"],
                tenseKeys: ["preterit-as-present"],
                subjectKeys: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
            });
            const project = (row) => {
                const conditioned = row.conditionedParadigmCellFrame || {};
                const gcd = conditioned.greatestCommonDivisor || {};
                const lcm = conditioned.leastCommonMultiple || {};
                return {
                    subject: row.subject,
                    formula: row.formula,
                    gcd: [
                        gcd.paradigmCellId,
                        gcd.paradigmTense,
                        gcd.semanticTenseValue,
                        gcd.morphologicalTense,
                        gcd.morphologicalAspect
                    ],
                    selectedSubjectNumber: lcm.selectedSubjectNumber,
                    defaultVariantId: lcm.defaultVariantId,
                    authorizedVariantIds: lcm.authorizedVariantIds,
                    selectedRealizations: (lcm.selectedRealizations || []).map(realization => [
                        realization.variantId,
                        realization.stemMember,
                        realization.numberDyad?.num1 || "",
                        realization.numberDyad?.num2 || "",
                        realization.usage,
                        realization.preference
                    ])
                };
            };
            const firstLcm = frame.rows[0]?.conditionedParadigmCellFrame?.leastCommonMultiple || {};
            const conditionedContract = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                frame.rows[0]?.conditionedParadigmCellFrame
            );
            const singularDefault = firstLcm.selectedRealizations?.[0] || {};
            const pluralDefault = frame.rows.find(row => row.subject === "1pl")
                ?.conditionedParadigmCellFrame?.leastCommonMultiple?.selectedRealizations?.[0] || {};
            const projectDetail = (row) => {
                const projection = ctx.buildClassicalVncParadigmConditionedDetailProjection(
                    row?.conditionedParadigmCellFrame
                );
                return projection ? {
                    gcd: [
                        projection.greatestCommonDivisor.paradigmCellId,
                        projection.greatestCommonDivisor.semanticTenseValue,
                        projection.greatestCommonDivisor.morphologicalTense,
                        projection.greatestCommonDivisor.morphologicalAspect
                    ],
                    lcm: [
                        projection.leastCommonMultiple.distinctionAxes,
                        projection.leastCommonMultiple.selectedSubjectNumber,
                        projection.leastCommonMultiple.defaultVariantId,
                        projection.leastCommonMultiple.realizations.map(realization => [
                            realization.variantId,
                            realization.stemMember,
                            realization.num1,
                            realization.num2,
                            realization.usage,
                            realization.preference,
                            realization.formulaRealization,
                            realization.surfaceRealization
                        ])
                    ],
                    diagrams: projection.leastCommonMultiple.realizations.map(realization => {
                        const diagram = ctx.buildClassicalNahuatlVncDiagrammaticFrame(realization.typedSlotFrame);
                        return [
                            realization.variantId,
                            diagram.authorizationStatus,
                            diagram.predicateStem,
                            diagram.linearFormula
                        ];
                    }),
                    authority: [
                        projection.callerSuppliedAuthorityAccepted,
                        projection.formulaStringAuthority,
                        projection.displayTextAuthority
                    ]
                } : null;
            };
            const hostileRegular = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("pāca", {
                mood: "indicative",
                tense: "preterit-as-present"
            });
            return {
                status: frame.authorizationStatus,
                rowCount: frame.rowCount,
                conditionedContract: [conditionedContract.status, conditionedContract.authorityRole],
                rows: frame.rows.map(project),
                distinctionAxes: firstLcm.distinctionAxes,
                inventory: (firstLcm.realizationInventory || []).map(realization => [
                    realization.variantId,
                    realization.condition.subjectNumber,
                    realization.stemMember,
                    realization.numberDyad.num1,
                    realization.numberDyad.num2,
                    realization.usage
                ]),
                boundaryRealizations: {
                    singular: [
                        singularDefault.sourceNumberDyad?.num1 || "",
                        singularDefault.numberDyad?.num1 || "",
                        singularDefault.operations || []
                    ],
                    plural: [
                        pluralDefault.sourceNumberDyad?.num1 || "",
                        pluralDefault.numberDyad?.num1 || "",
                        pluralDefault.operations || []
                    ]
                },
                finiteRealizations: {
                    phase: frame.rows[0]?.conditionedParadigmCellFrame?.realizationPhase || "",
                    singular: (firstLcm.selectedRealizations || []).map(realization => [
                        realization.variantId,
                        realization.formulaRealization,
                        realization.surfaceRealization
                    ]),
                    plural: (frame.rows.find(row => row.subject === "1pl")
                        ?.conditionedParadigmCellFrame?.leastCommonMultiple?.selectedRealizations || []).map(realization => [
                        realization.variantId,
                        realization.formulaRealization,
                        realization.surfaceRealization
                    ])
                },
                detailProjections: {
                    singular: projectDetail(frame.rows[0]),
                    plural: projectDetail(frame.rows.find(row => row.subject === "1pl")),
                    structuralRejected: ctx.buildClassicalVncParadigmConditionedDetailProjection({
                        ...frame.rows[0]?.conditionedParadigmCellFrame,
                        realizationPhase: "structural"
                    })
                },
                hostileRegular: [hostileRegular.authorizationStatus, hostileRegular.blockReason]
            };
        })(),
        {
            status: "authorized",
            rowCount: 6,
            conditionedContract: ["valid", "typed-conditioned-paradigm-cell-identity-and-realization"],
            rows: [
                {
                    subject: "1sg",
                    formula: "#ni-0(ca-h)0+⎕-0#",
                    gcd: ["be-suppletive:preterit-as-present", "preterit-as-present", "present", "preterit", "perfective"],
                    selectedSubjectNumber: "singular",
                    defaultVariantId: "current-singular-ca-h",
                    authorizedVariantIds: ["current-singular-ca-h", "antiquated-singular-ca-t-qui"],
                    selectedRealizations: [
                        ["current-singular-ca-h", "ca-h", "⎕", "0", "current", "default"],
                        ["antiquated-singular-ca-t-qui", "ca-t", "qui", "0", "antiquated", "marked-not-default"]
                    ]
                },
                {
                    subject: "2sg",
                    formula: "#ti-0(ca-h)0+⎕-0#",
                    gcd: ["be-suppletive:preterit-as-present", "preterit-as-present", "present", "preterit", "perfective"],
                    selectedSubjectNumber: "singular",
                    defaultVariantId: "current-singular-ca-h",
                    authorizedVariantIds: ["current-singular-ca-h", "antiquated-singular-ca-t-qui"],
                    selectedRealizations: [
                        ["current-singular-ca-h", "ca-h", "⎕", "0", "current", "default"],
                        ["antiquated-singular-ca-t-qui", "ca-t", "qui", "0", "antiquated", "marked-not-default"]
                    ]
                },
                {
                    subject: "3sg",
                    formula: "#0-0(ca-h)0+⎕-0#",
                    gcd: ["be-suppletive:preterit-as-present", "preterit-as-present", "present", "preterit", "perfective"],
                    selectedSubjectNumber: "singular",
                    defaultVariantId: "current-singular-ca-h",
                    authorizedVariantIds: ["current-singular-ca-h", "antiquated-singular-ca-t-qui"],
                    selectedRealizations: [
                        ["current-singular-ca-h", "ca-h", "⎕", "0", "current", "default"],
                        ["antiquated-singular-ca-t-qui", "ca-t", "qui", "0", "antiquated", "marked-not-default"]
                    ]
                },
                {
                    subject: "1pl",
                    formula: "#ti-0(ca-t)0+⎕-eh#",
                    gcd: ["be-suppletive:preterit-as-present", "preterit-as-present", "present", "preterit", "perfective"],
                    selectedSubjectNumber: "plural",
                    defaultVariantId: "current-plural-ca-t-silent-num1",
                    authorizedVariantIds: ["current-plural-ca-t-silent-num1"],
                    selectedRealizations: [
                        ["current-plural-ca-t-silent-num1", "ca-t", "⎕", "eh", "current", "default"]
                    ]
                },
                {
                    subject: "2pl",
                    formula: "#an-0(ca-t)0+⎕-eh#",
                    gcd: ["be-suppletive:preterit-as-present", "preterit-as-present", "present", "preterit", "perfective"],
                    selectedSubjectNumber: "plural",
                    defaultVariantId: "current-plural-ca-t-silent-num1",
                    authorizedVariantIds: ["current-plural-ca-t-silent-num1"],
                    selectedRealizations: [
                        ["current-plural-ca-t-silent-num1", "ca-t", "⎕", "eh", "current", "default"]
                    ]
                },
                {
                    subject: "3pl",
                    formula: "#0-0(ca-t)0+⎕-eh#",
                    gcd: ["be-suppletive:preterit-as-present", "preterit-as-present", "present", "preterit", "perfective"],
                    selectedSubjectNumber: "plural",
                    defaultVariantId: "current-plural-ca-t-silent-num1",
                    authorizedVariantIds: ["current-plural-ca-t-silent-num1"],
                    selectedRealizations: [
                        ["current-plural-ca-t-silent-num1", "ca-t", "⎕", "eh", "current", "default"]
                    ]
                }
            ],
            distinctionAxes: ["subject-number", "suppletive-stem-member", "number-dyad", "usage-register"],
            inventory: [
                ["current-singular-ca-h", "singular", "ca-h", "⎕", "0", "current"],
                ["current-plural-ca-t-silent-num1", "plural", "ca-t", "⎕", "eh", "current"],
                ["antiquated-singular-ca-t-qui", "singular", "ca-t", "qui", "0", "antiquated"]
            ],
            boundaryRealizations: {
          singular: ["⎕", "⎕", ["select-ca-h-for-singular-subject", "realize-ca-h-final-boundary-num1-as-silent"]],
                plural: ["⎕", "⎕", ["select-ca-t-for-plural-subject", "replace-num1-qu-with-silent-carrier"]]
            },
            finiteRealizations: {
                phase: "finite",
                singular: [
                    ["current-singular-ca-h", "#ni-0(ca-h)0+⎕-0#", "nicah"],
                    ["antiquated-singular-ca-t-qui", "#ni-0(ca-t)0+qui-0#", "nicatqui"]
                ],
                plural: [
                    ["current-plural-ca-t-silent-num1", "#ti-0(ca-t)0+⎕-eh#", "ticateh"]
                ]
            },
            detailProjections: {
                singular: {
                    gcd: ["be-suppletive:preterit-as-present", "present", "preterit", "perfective"],
                    lcm: [
                        ["subject-number", "suppletive-stem-member", "number-dyad", "usage-register"],
                        "singular",
                        "current-singular-ca-h",
                        [
                            ["current-singular-ca-h", "ca-h", "⎕", "0", "current", "default", "#ni-0(ca-h)0+⎕-0#", "nicah"],
                            ["antiquated-singular-ca-t-qui", "ca-t", "qui", "0", "antiquated", "marked-not-default", "#ni-0(ca-t)0+qui-0#", "nicatqui"]
                        ]
                    ],
                    diagrams: [
                        ["current-singular-ca-h", "authorized", "ca-h", "#ni-0(ca-h)0+⎕-0#"],
                        ["antiquated-singular-ca-t-qui", "authorized", "ca-t", "#ni-0(ca-t)0+qui-0#"]
                    ],
                    authority: [false, false, false]
                },
                plural: {
                    gcd: ["be-suppletive:preterit-as-present", "present", "preterit", "perfective"],
                    lcm: [
                        ["subject-number", "suppletive-stem-member", "number-dyad", "usage-register"],
                        "plural",
                        "current-plural-ca-t-silent-num1",
                        [
                            ["current-plural-ca-t-silent-num1", "ca-t", "⎕", "eh", "current", "default", "#ti-0(ca-t)0+⎕-eh#", "ticateh"]
                        ]
                    ],
                    diagrams: [
                        ["current-plural-ca-t-silent-num1", "authorized", "ca-t", "#ti-0(ca-t)0+⎕-eh#"]
                    ],
                    authority: [false, false, false]
                },
                structuralRejected: null
            },
            hostileRegular: ["blocked", "vnc-irregular-paradigm-tense-not-authorized-for-selected-verbstem"]
        }
    );

    s.eq(
        "Lesson 11.5.1.c.ii gives be distant-past-as-past the same typed conditioned-cell organization",
        (() => {
            const build = (stem) => ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem,
                sourceTransitivity: "intransitive",
                sourceMatrixStem: stem,
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement"
            }, {
                groupKeys: ["perfective-indicative"],
                tenseKeys: ["distant-past-as-past"],
                subjectKeys: ["1sg", "1pl"]
            });
            const frame = build("ye");
            const project = (row) => {
                const conditioned = row.conditionedParadigmCellFrame || {};
                const gcd = conditioned.greatestCommonDivisor || {};
                const lcm = conditioned.leastCommonMultiple || {};
                const detail = ctx.buildClassicalVncParadigmConditionedDetailProjection(conditioned);
                return {
                    subject: row.subject,
                    formula: row.formula,
                    sourceSection: conditioned.sourceSection,
                    gcd: [
                        gcd.paradigmCellId,
                        gcd.paradigmTense,
                        gcd.semanticTenseValue,
                        gcd.morphologicalTense,
                        gcd.morphologicalAspect
                    ],
                    axes: lcm.distinctionAxes,
                    inventory: (lcm.realizationInventory || []).map(realization => [
                        realization.variantId,
                        realization.condition.subjectNumber,
                        realization.stemMember,
                        realization.tenseMorph,
                        realization.numberDyad.num1,
                        realization.numberDyad.num2
                    ]),
                    selected: (detail?.leastCommonMultiple?.realizations || []).map(realization => {
                        const diagram = ctx.buildClassicalNahuatlVncDiagrammaticFrame(realization.typedSlotFrame);
                        return [
                            realization.variantId,
                            realization.stemMember,
                            realization.num1,
                            realization.num2,
                            realization.usage,
                            realization.preference,
                            realization.formulaRealization,
                            realization.surfaceRealization,
                            diagram.linearFormula
                        ];
                    })
                };
            };
            const conditionedContract = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                frame.rows[0]?.conditionedParadigmCellFrame
            );
            const poisonedContract = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...frame.rows[0]?.conditionedParadigmCellFrame,
                    sourceSection: "11.5.1.c.i"
                }
            );
            return {
                status: frame.authorizationStatus,
                rowCount: frame.rowCount,
                conditionedContract: [conditionedContract.status, conditionedContract.authorityRole],
                poisonedSourceContract: poisonedContract.status,
                rows: frame.rows.map(project),
                unrelatedDistantPastConditioned: build("ih-ca").rows[0]?.conditionedParadigmCellFrame || null
            };
        })(),
        {
            status: "authorized",
            rowCount: 2,
            conditionedContract: ["valid", "typed-conditioned-paradigm-cell-identity-and-realization"],
            poisonedSourceContract: "invalid",
            rows: [{
                subject: "1sg",
                formula: "#ni-0(ca-t)ca+0-0#",
                sourceSection: "11.5.1.c.ii",
                gcd: ["be-suppletive:distant-past-as-past", "distant-past-as-past", "general-past", "distant-past", "perfective"],
                axes: ["subject-number", "suppletive-stem-member", "tense-morph", "number-dyad"],
                inventory: [
                    ["current-singular-ca-t-distant-past", "singular", "ca-t", "ca", "0", "0"],
                    ["current-plural-ca-t-distant-past", "plural", "ca-t", "ca", "0", "h"]
                ],
                selected: [
                    ["current-singular-ca-t-distant-past", "ca-t", "0", "0", "current", "default", "#ni-0(ca-t)ca+0-0#", "nicatca", "#ni-0(ca-t)ca+0-0#"]
                ]
            }, {
                subject: "1pl",
                formula: "#ti-0(ca-t)ca+0-h#",
                sourceSection: "11.5.1.c.ii",
                gcd: ["be-suppletive:distant-past-as-past", "distant-past-as-past", "general-past", "distant-past", "perfective"],
                axes: ["subject-number", "suppletive-stem-member", "tense-morph", "number-dyad"],
                inventory: [
                    ["current-singular-ca-t-distant-past", "singular", "ca-t", "ca", "0", "0"],
                    ["current-plural-ca-t-distant-past", "plural", "ca-t", "ca", "0", "h"]
                ],
                selected: [
                    ["current-plural-ca-t-distant-past", "ca-t", "0", "h", "current", "default", "#ti-0(ca-t)ca+0-h#", "ticatcah", "#ti-0(ca-t)ca+0-h#"]
                ]
            }],
            unrelatedDistantPastConditioned: null
        }
    );

    return s;
}

module.exports = { run };
