"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_nnc_lessons12_16");
    const withTypedQuantitiveAuthority = (options = {}) => {
        if (options.subtype !== "quantitive") return options;
        const {
            quantitiveMatrix,
            quantitiveEmbed,
            matrixAllomorph,
            predicatePluralization,
            plainPluralVariantAuthorized,
            interrogativeMeaning,
            ...typedOptions
        } = options;
        const subject = typedOptions.subject || "3common";
        const familyKey = String(quantitiveMatrix || "");
        const matrixForm = matrixAllomorph || (familyKey === "quich" || familyKey === "qui-ch" ? "qui-ch" : "");
        const plural = subject.endsWith("pl");
        const selectedPluralization = predicatePluralization || (
            !plural ? "not-applicable"
                : (familyKey === "quich" || familyKey === "qui-ch") ? "plain-qui-ch"
                    : plainPluralVariantAuthorized === true ? "plain-variant" : "internal-n"
        );
        return {
            ...typedOptions,
            subtype: "quantitive",
            quantitiveAuthorityRecord: ctx.buildClassicalNahuatlQuantitiveAuthorityRecord({
                subject,
                matrixFamily: familyKey,
                matrixForm,
                embedStem: quantitiveEmbed,
                predicatePluralization: selectedPluralization,
                plainVariantLexicallyAuthorized: plainPluralVariantAuthorized === true,
                interrogativeMeaning: interrogativeMeaning === true,
            }),
        };
    };

    s.eq(
        "Lesson 12 realizes the four absolutive common-number class connectors from typed slots",
        [
            ctx.buildClassicalNahuatlAbsolutiveNncFrame("cihua", { subject: "1sg", nounClass: "tl", animacy: "animate" }),
            ctx.buildClassicalNahuatlAbsolutiveNncFrame("cal", { subject: "3common", nounClass: "tli", animacy: "nonanimate" }),
            ctx.buildClassicalNahuatlAbsolutiveNncFrame("mich", { subject: "3sg", nounClass: "in", animacy: "animate" }),
            ctx.buildClassicalNahuatlAbsolutiveNncFrame("chichi", { subject: "3sg", nounClass: "zero", animacy: "animate" }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            class: frame.numberFrame.nounClass,
            numberBelongsTo: frame.numberFrame.numberBelongsTo,
            tenseSlot: frame.nncSlotFrame.slots.predicate.tenseSlot,
        })),
        [
            { status: "authorized", formula: "#ni-0(cihua)tl-0#", class: "tl", numberBelongsTo: "subject-personal-pronoun", tenseSlot: "none" },
            { status: "authorized", formula: "#0-0(cal)li-0#", class: "tli", numberBelongsTo: "subject-personal-pronoun", tenseSlot: "none" },
            { status: "authorized", formula: "#0-0(mich)in-0#", class: "in", numberBelongsTo: "subject-personal-pronoun", tenseSlot: "none" },
            { status: "authorized", formula: "#0-0(chichi)0-0#", class: "zero", numberBelongsTo: "subject-personal-pronoun", tenseSlot: "none" },
        ]
    );

    s.eq(
        "Lesson 12 preserves one absolutive GCD and the complete typed LCM inventory",
        (() => {
            const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame("mich", {
                subject: "3sg",
                nounClass: "in",
                animacy: "animate",
                formulaArtifact: "#x-0(FAKE)past+c-an#",
            });
            const contract = frame.absolutiveParadigmContractFrame;
            const report = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                contract
            );
            const poisonedAxes = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...contract,
                    leastCommonMultiple: {
                        ...contract.leastCommonMultiple,
                        distinctionAxes: contract.leastCommonMultiple.distinctionAxes.map(
                            (axis, index) => index === 0 ? "display-text-only" : axis
                        )
                    }
                }
            );
            const poisonedGcd = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...contract,
                    greatestCommonDivisor: {
                        ...contract.greatestCommonDivisor,
                        tensePosition: "present"
                    }
                }
            );
            const poisonedShapeInventory = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...contract,
                    leastCommonMultiple: {
                        ...contract.leastCommonMultiple,
                        subjectPronounShapeInventory:
                            contract.leastCommonMultiple.subjectPronounShapeInventory.map(
                                (shape, index) => index === 0
                                    ? { ...shape, subjectIdentity: "display-only" }
                                    : shape
                            )
                    }
                }
            );
            const selected = contract.leastCommonMultiple.selectedCoordinate;
            return {
                contract: [report.status, report.authorityRole],
                gcd: contract.greatestCommonDivisor,
                axes: contract.leastCommonMultiple.distinctionAxes,
                subjects: contract.leastCommonMultiple.subjectPersonInventory.map(entry => [
                    entry.identity,
                    entry.subject,
                    entry.number
                ]),
                numberDyads: contract.leastCommonMultiple.numberDyadInventory.map(entry => [
                    entry.identity,
                    entry.subjectNumber,
                    entry.num1,
                    entry.num2,
                    entry.num1SurfaceVariants || []
                ]),
                predicateFunctions: contract.leastCommonMultiple.predicateFunctionInventory,
                animacyReferences: contract.leastCommonMultiple.animacyReferenceInventory,
                subjectShapeCount:
                    contract.leastCommonMultiple.subjectPronounShapeInventory.length,
                subjectShapeCounts: Object.fromEntries(
                    contract.leastCommonMultiple.subjectPersonInventory.map(subject => [
                        subject.identity,
                        contract.leastCommonMultiple.subjectPronounShapeInventory.filter(
                            shape => shape.subjectIdentity === subject.identity
                        ).length
                    ])
                ),
                selected: {
                    id: selected.coordinateId,
                    subject: selected.subject,
                    subjectIdentity: selected.subjectIdentity,
                    subjectNumber: selected.subjectNumber,
                    personMorphs: [selected.pers1, selected.pers2],
                    nounClass: selected.nounClass,
                    numberDyad: selected.numberDyad,
                    numberDyadIdentity: selected.numberDyadIdentity,
                    subjectPronounShapeIdentity: selected.subjectPronounShapeIdentity,
                    animacy: selected.animacy,
                    metaphoricalUse: selected.metaphoricalUse,
                    stateAvailability: selected.lexicalStateAvailability,
                    predicateStem: selected.predicateStem,
                    formula: selected.formulaRealization,
                    slotKind: selected.typedSlotFrame.kind,
                    artifactAuthority: selected.typedSlotFrame.formulaArtifactAuthority,
                    formulaStringAuthority: selected.formulaStringAuthority,
                    displayTextAuthority: selected.displayTextAuthority,
                },
                poisoned: [
                    poisonedAxes.status,
                    poisonedGcd.status,
                    poisonedShapeInventory.status
                ]
            };
        })(),
        {
            contract: ["valid", "typed-absolutive-nnc-common-identity-and-complete-distinction-inventory"],
            gcd: {
                identityId: "lesson12:absolutive-state-nnc",
                clauseKind: "nominal-nuclear-clause",
                state: "absolutive",
                stateArity: "vacant",
                predicateKind: "nounstem",
                formulaTemplate: "#pers1-pers2(STEM)num1-num2#",
                valencePosition: "replaced-by-state",
                tensePosition: "absent",
                numberBelongsTo: "subject-personal-pronoun"
            },
            axes: [
                "subject-person",
                "subject-number",
                "subject-person-morphs",
                "absolutive-number-dyad",
                "noun-class-conditioned-connector",
                "animacy-reference",
                "lexical-state-availability",
                "predicate-function",
                "discourse-time-reference"
            ],
            subjects: [
                ["first-singular", "1sg", "singular"],
                ["second-singular", "2sg", "singular"],
                ["third-singular-or-common", "3sg-or-common", "singular-or-common"],
                ["first-plural", "1pl", "plural"],
                ["second-plural", "2pl", "plural"],
                ["third-plural", "3pl", "plural"]
            ],
            numberDyads: [
                ["absolutive-singular-common-tl", "singular-or-common", "tl", "0", []],
                ["absolutive-singular-common-tli-li", "singular-or-common", "tli", "0", ["tli", "li"]],
                ["absolutive-singular-common-in", "singular-or-common", "in", "0", []],
                ["absolutive-singular-common-zero", "singular-or-common", "0", "0", []],
                ["absolutive-plural-t-in", "plural", "t", "in", []],
                ["absolutive-plural-m-eh", "plural", "m", "eh", []],
                ["absolutive-plural-zero-h", "plural", "0", "h", []]
            ],
            predicateFunctions: ["identify", "describe", "locate"],
            animacyReferences: [
                "animate-singular",
                "animate-plural",
                "nonanimate-common",
                "metaphorical-animate"
            ],
            subjectShapeCount: 21,
            subjectShapeCounts: {
                "first-singular": 4,
                "second-singular": 4,
                "third-singular-or-common": 4,
                "first-plural": 3,
                "second-plural": 3,
                "third-plural": 3
            },
            selected: {
                id: "3sg:singular:in:in-0:animate:literal",
                subject: "3sg",
                subjectIdentity: "third-singular-or-common",
                subjectNumber: "singular",
                personMorphs: ["0", "0"],
                nounClass: "in",
                numberDyad: { num1: "in", num2: "0" },
                numberDyadIdentity: "absolutive-singular-common-in",
                subjectPronounShapeIdentity:
                    "third-singular-or-common:absolutive-singular-common-in",
                animacy: "animate",
                metaphoricalUse: false,
                stateAvailability: "both",
                predicateStem: "mich",
                formula: "#0-0(mich)in-0#",
                slotKind: "classical-nahuatl-nnc-slot-frame",
                artifactAuthority: "display-only-not-authority",
                formulaStringAuthority: false,
                displayTextAuthority: false
            },
            poisoned: ["invalid", "invalid", "invalid"]
        }
    );

    s.eq(
        "Lesson 12 plural subject uses a lexically selected connector and remains nominative",
        (() => {
            const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame("col", {
                subject: "1pl",
                nounClass: "tli",
                pluralConnector: "t-in",
                animacy: "animate",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                subject: frame.personFrame.subject,
                case: frame.personFrame.case,
                resultOperation: frame.operationEvaluationFrame.resultOperationId,
                formulaStringAuthority: frame.selectedOutputLogicFrame.formulaStringAuthority,
            };
        })(),
        {
            status: "authorized",
            formula: "#ti-0(col)t-in#",
            subject: "1pl",
            case: "nominative",
            resultOperation: "nnc-absolutive-state",
            formulaStringAuthority: false,
        }
    );

    s.eq(
        "NNC diagrammatic format projects absolutive Subject and Predicate from typed slots",
        (() => {
            const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame("cihua", {
                subject: "1sg",
                nounClass: "tl",
                animacy: "animate",
            });
            const diagram = ctx.buildClassicalNahuatlNncDiagrammaticFrame(frame.nncSlotFrame);
            return {
                status: diagram.authorizationStatus,
                linear: diagram.linearFormula,
                generalLinear: diagram.generalLinearFormula,
                rows: diagram.rows.map((row) => `${row.expression} ${row.role}`),
                generalRows: diagram.generalRows.map((row) => `${row.expression} ${row.role}`),
                hierarchy: diagram.hierarchy,
                stringAuthority: diagram.formulaStringAuthority,
            };
        })(),
        {
            status: "authorized",
            linear: "#ni-0(cihua)tl-0#",
            generalLinear: "#pers¹-pers²(STEM)num¹-num²#",
            rows: ["#ni-0( ... )tl-0# Subject", "(cihua) Predicate"],
            generalRows: ["#pers¹-pers²( ... )num¹-num²# Subject", "(STEM) Predicate"],
            hierarchy: ["nounstem", "predicate", "NNC"],
            stringAuthority: false,
        }
    );

    s.eq(
        "Lesson 12 rejects nonanimate plural unless the user selects a metaphorical animate reference",
        (() => {
            const blocked = ctx.buildClassicalNahuatlAbsolutiveNncFrame("chimalli", {
                subject: "3pl",
                nounClass: "tl",
                pluralConnector: "m-eh",
                animacy: "nonanimate",
            });
            const metaphorical = ctx.buildClassicalNahuatlAbsolutiveNncFrame("chimalli", {
                subject: "3pl",
                nounClass: "tl",
                pluralConnector: "m-eh",
                animacy: "nonanimate",
                metaphoricalOverride: true,
            });
            return {
                blockedStatus: blocked.authorizationStatus,
                blockedReason: blocked.blockReason,
                metaphoricalStatus: metaphorical.authorizationStatus,
                metaphoricalFormula: metaphorical.formulaRealization,
            };
        })(),
        {
            blockedStatus: "blocked",
            blockedReason: "nonanimate-plural-requires-metaphorical-override",
            metaphoricalStatus: "authorized",
            metaphoricalFormula: "#0-0(chimalli)m-eh#",
        }
    );

    s.eq(
        "Hostile VNC tense and valence cannot enter an NNC",
        [
            ctx.buildClassicalNahuatlAbsolutiveNncFrame("cal", { subject: "3common", nounClass: "tli", tense: "present" }),
            ctx.buildClassicalNahuatlAbsolutiveNncFrame("cal", { subject: "3common", nounClass: "tli", valence: "tla" }),
        ].map((frame) => ({ status: frame.authorizationStatus, reason: frame.blockReason, formula: frame.formulaRealization })),
        [
            { status: "blocked", reason: "nnc-has-no-tense-slot", formula: "" },
            { status: "blocked", reason: "nnc-state-replaces-valence", formula: "" },
        ]
    );

    s.eq(
        "Lesson 12 preserves lexical State restrictions and does not invent tense or definiteness",
        (() => {
            const blocked = ctx.buildClassicalNahuatlAbsolutiveNncFrame("nan", {
                subject: "3sg",
                nounClass: "tli",
                animacy: "animate",
                stateAvailability: "possessive-only",
            });
            const ordinary = ctx.buildClassicalNahuatlAbsolutiveNncFrame("cal", {
                subject: "3common",
                nounClass: "tli",
                animacy: "nonanimate",
            });
            return {
                blockedStatus: blocked.authorizationStatus,
                blockedReason: blocked.blockReason,
                ordinaryStatus: ordinary.authorizationStatus,
                tenseEncoded: ordinary.predicateSemanticsFrame.tenseCategoryEncoded,
                timeReferenceSource: ordinary.predicateSemanticsFrame.timeReferenceSource,
                definitenessEncoded: ordinary.predicateSemanticsFrame.definitenessEncoded,
            };
        })(),
        {
            blockedStatus: "blocked",
            blockedReason: "nounstem-restricted-to-possessive-state",
            ordinaryStatus: "authorized",
            tenseEncoded: false,
            timeReferenceSource: "discourse-context",
            definitenessEncoded: false,
        }
    );

    s.eq(
        "A lying formula string cannot authorize or alter Lesson 12 selected output",
        (() => {
            const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame("mich", {
                subject: "3sg",
                nounClass: "in",
                animacy: "animate",
                formulaArtifact: "#x-0+THIS-IS-NOT-AN-NNC(mich)past+c-an#",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                artifact: frame.nncSlotFrame.sourceFormulaArtifact,
                artifactAuthority: frame.nncSlotFrame.formulaArtifactAuthority,
                containsLie: frame.formulaRealization.includes("THIS"),
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0(mich)in-0#",
            artifact: "#x-0+THIS-IS-NOT-AN-NNC(mich)past+c-an#",
            artifactAuthority: "display-only-not-authority",
            containsLie: false,
        }
    );

    s.eq(
        "Contradictory typed NNC slots fail closed while curriculum-order poison cannot change a complete Lesson 12 word",
        (() => {
            const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame("mich", {
                subject: "3sg",
                nounClass: "in",
                animacy: "animate",
            });
            const contradictory = {
                ...frame.nncSlotFrame,
                slots: {
                    ...frame.nncSlotFrame.slots,
                    predicate: { ...frame.nncSlotFrame.slots.predicate, tenseSlot: "present" },
                },
            };
            const curriculumPoison = ctx.buildClassicalNahuatlAbsolutiveNncFrame("mich", {
                subject: "3sg",
                nounClass: "in",
                animacy: "animate",
                highestActiveLesson: 99,
                finalizerLayerId: "not-a-grammar-operation",
            });
            return {
                contradictoryValid: ctx.isClassicalNahuatlNncSlotFrame(contradictory),
                contradictoryFormula: ctx.renderClassicalNahuatlNncSlotFrameFormula(contradictory),
                poisonedStatus: curriculumPoison.authorizationStatus,
                poisonedFormula: curriculumPoison.formulaRealization,
                resultOperation: curriculumPoison.operationEvaluationFrame.resultOperationId,
                curriculumOrderAuthority: curriculumPoison.operationEvaluationFrame.curriculumOrderAuthority,
            };
        })(),
        {
            contradictoryValid: false,
            contradictoryFormula: "",
            poisonedStatus: "authorized",
            poisonedFormula: "#0-0(mich)in-0#",
            resultOperation: "nnc-absolutive-state",
            curriculumOrderAuthority: false,
        }
    );

    s.ok(
        "Lesson 12 frame stays inside the Classical firewall and carries exact witness actions",
        (() => {
            const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame("chichi", {
                subject: "3sg",
                nounClass: "zero",
                animacy: "animate",
            });
            return frame.ruleRefs.length === 7
                && frame.ruleRefs.every((rule) => rule.transcriptionLineStart > 0 && rule.transcriptionLineEnd >= rule.transcriptionLineStart && rule.exactWitness)
                && frame.sourceAuthority === "Andrews transcription"
                && frame.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
                && frame.selectedOutputLogicFrame.selectedOutputAuthority === "typed-nnc-slots"
                && frame.selectedOutputLogicFrame.formulaStringAuthority === false;
        })()
    );

    s.eq(
        "Lesson 13 realizes monadic and dyadic possessive State from typed possessor slots",
        [
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "te",
                singularConnector: "0",
                nounstemRelationKind: "nonrelational",
                animacy: "nonanimate",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "0",
                animacy: "nonanimate",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("ā", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "uh",
                animacy: "nonanimate",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            arity: frame.stateFrame.arity,
            subjectAnimacy: frame.nncSlotFrame.subjectAnimacy,
            metaphoricalUse: frame.nncSlotFrame.metaphoricalUse,
            resultOperation: frame.operationEvaluationFrame.resultOperationId,
        })),
        [
            { status: "authorized", formula: "#0-0+tē(cal)0-0#", arity: "monadic", subjectAnimacy: "nonanimate", metaphoricalUse: false, resultOperation: "nnc-possessive-state" },
            { status: "authorized", formula: "#0-0+n-o(cal)0-0#", arity: "dyadic", subjectAnimacy: "nonanimate", metaphoricalUse: false, resultOperation: "nnc-possessive-state" },
            { status: "authorized", formula: "#0-0+n-⎕(ā)uh-0#", arity: "dyadic", subjectAnimacy: "nonanimate", metaphoricalUse: false, resultOperation: "nnc-possessive-state" },
        ]
    );

    s.eq(
        "Lesson 13 preserves one possessive GCD and the complete typed LCM inventory",
        (() => {
            const frame = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "2pl",
                possessor: "1sg",
                formulaArtifact: "#x-0+tla(FAKE)past+c-an#",
            });
            const contract = frame.possessiveParadigmContractFrame;
            const report = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                contract
            );
            const poisonedGcd = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...contract,
                    greatestCommonDivisor: {
                        ...contract.greatestCommonDivisor,
                        tensePosition: "present"
                    }
                }
            );
            const poisonedSubjectShapes = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...contract,
                    leastCommonMultiple: {
                        ...contract.leastCommonMultiple,
                        subjectPronounShapeInventory:
                            contract.leastCommonMultiple.subjectPronounShapeInventory.map(
                                (shape, index) => index === 0
                                    ? { ...shape, numberDyadIdentity: "display-only" }
                                    : shape
                            )
                    }
                }
            );
            const poisonedStateShapes = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...contract,
                    leastCommonMultiple: {
                        ...contract.leastCommonMultiple,
                        possessorStateShapeInventory:
                            contract.leastCommonMultiple.possessorStateShapeInventory.map(
                                (shape, index) => index === 0
                                    ? { ...shape, conditioning: "display-only" }
                                    : shape
                            )
                    }
                }
            );
            const selected = contract.leastCommonMultiple.selectedCoordinate;
            return {
                contract: [report.status, report.authorityRole],
                gcd: contract.greatestCommonDivisor,
                axes: contract.leastCommonMultiple.distinctionAxes,
                formulaTemplates:
                    contract.leastCommonMultiple.formulaTemplateInventory.map(entry => [
                        entry.identity,
                        entry.stateArity,
                        entry.formulaTemplate
                    ]),
                subjectShapeCount:
                    contract.leastCommonMultiple.subjectPronounShapeInventory.length,
                subjectShapeCounts: Object.fromEntries(
                    contract.leastCommonMultiple.subjectPersonInventory.map(subject => [
                        subject.identity,
                        contract.leastCommonMultiple.subjectPronounShapeInventory.filter(
                            shape => shape.subjectIdentity === subject.identity
                        ).length
                    ])
                ),
                possessorStateShapeCount:
                    contract.leastCommonMultiple.possessorStateShapeInventory.length,
                possessorStateArityCounts: Object.fromEntries(
                    ["monadic", "dyadic"].map(arity => [
                        arity,
                        contract.leastCommonMultiple.possessorStateShapeInventory.filter(
                            shape => shape.stateArity === arity
                        ).length
                    ])
                ),
                selected: {
                    id: selected.coordinateId,
                    subject: selected.subject,
                    subjectIdentity: selected.subjectIdentity,
                    personMorphs: [selected.pers1, selected.pers2],
                    subjectPronounShapeIdentity: selected.subjectPronounShapeIdentity,
                    numberDyadIdentity: selected.numberDyadIdentity,
                    formulaTemplateIdentity: selected.formulaTemplateIdentity,
                    stateArity: selected.stateArity,
                    possessor: selected.possessor,
                    possessorStateShapeIdentity: selected.possessorStateShapeIdentity,
                    stateSlots: selected.typedStateSlots.map(slot => [
                        slot.role,
                        slot.carrier
                    ]),
                    formula: selected.formulaRealization,
                    slotKind: selected.typedSlotFrame.kind,
                    artifactAuthority: selected.typedSlotFrame.formulaArtifactAuthority,
                    formulaStringAuthority: selected.formulaStringAuthority,
                    displayTextAuthority: selected.displayTextAuthority,
                },
                poisoned: [
                    poisonedGcd.status,
                    poisonedSubjectShapes.status,
                    poisonedStateShapes.status
                ]
            };
        })(),
        {
            contract: ["valid", "typed-possessive-nnc-common-identity-and-complete-distinction-inventory"],
            gcd: {
                identityId: "lesson13:possessive-state-nnc",
                clauseKind: "nominal-nuclear-clause",
                state: "possessive",
                statePosition: "nonvacant-prefixal-pronoun",
                stateArity: "monadic-or-dyadic",
                stateCategories: ["person", "number", "possessive-case"],
                predicateKind: "nounstem",
                formulaSchema: "#pers1-pers2+STATE(STEM)num1-num2#",
                subjectPersonSystem: "same-as-absolutive-nnc",
                valencePosition: "replaced-by-state",
                tensePosition: "absent",
                numberBelongsTo: "subject-personal-pronoun"
            },
            axes: [
                "formula-state-arity",
                "subject-person",
                "subject-number",
                "subject-person-morphs",
                "subject-person-boundary-conditioning",
                "possessive-number-dyad",
                "subject-connector-conditioning",
                "possessor-reference-type",
                "possessor-person",
                "possessor-number",
                "possessive-case-location",
                "possessor-state-morphs",
                "possessor-boundary-conditioning",
                "nounstem-possessor-compatibility"
            ],
            formulaTemplates: [
                [
                    "possessive-monadic-state",
                    "monadic",
                    "#pers1-pers2+st(STEM)num1-num2#"
                ],
                [
                    "possessive-dyadic-state",
                    "dyadic",
                    "#pers1-pers2+st1-st2(STEM)num1-num2#"
                ]
            ],
            subjectShapeCount: 12,
            subjectShapeCounts: {
                "first-singular": 3,
                "second-singular": 3,
                "third-singular-or-common": 3,
                "first-plural": 1,
                "second-plural": 1,
                "third-plural": 1
            },
            possessorStateShapeCount: 14,
            possessorStateArityCounts: {
                monadic: 3,
                dyadic: 11
            },
            selected: {
                id: "second-plural:possessive-plural-hu-an:dyadic-first-singular-o:cal",
                subject: "2pl",
                subjectIdentity: "second-plural",
                personMorphs: ["an", "0"],
                subjectPronounShapeIdentity:
                    "second-plural:possessive-plural-hu-an",
                numberDyadIdentity: "possessive-plural-hu-an",
                formulaTemplateIdentity: "possessive-dyadic-state",
                stateArity: "dyadic",
                possessor: "1sg",
                possessorStateShapeIdentity: "dyadic-first-singular-o",
                stateSlots: [["st1", "n"], ["st2", "o"]],
                formula: "#an-0+n-o(cal)hu-ān#",
                slotKind: "classical-nahuatl-nnc-slot-frame",
                artifactAuthority: "display-only-not-authority",
                formulaStringAuthority: false,
                displayTextAuthority: false
            },
            poisoned: ["invalid", "invalid", "invalid"]
        }
    );

    s.eq(
        "Lesson 13 separates structural subject morphs from their boundary realizations",
        (() => {
            const subjects = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"];
            const frames = subjects.map(subject => (
                ctx.buildClassicalNahuatlPossessiveNncFrame("pah", {
                    subject,
                    possessor: "te",
                    singularConnector: "0",
                })
            ));
            return {
                reports: frames.map(frame => (
                    ctx.inspectRegisteredGrammarContract(
                        ctx.getDefaultGrammarContractRegistry(),
                        frame.possessiveParadigmContractFrame
                    ).status
                )),
                selectedPers1: frames.map(frame => (
                    frame.possessiveParadigmContractFrame.leastCommonMultiple
                        .selectedCoordinate.pers1
                )),
                inventoryVariants: frames[0].possessiveParadigmContractFrame
                    .leastCommonMultiple.subjectPersonInventory
                    .map(subject => [subject.identity, subject.pers1SurfaceVariants]),
            };
        })(),
        {
            reports: ["valid", "valid", "valid", "valid", "valid", "valid"],
            selectedPers1: ["ni", "ti", "0", "ti", "an", "0"],
            inventoryVariants: [
                ["first-singular", ["n", "ni"]],
                ["second-singular", ["t", "ti"]],
                ["third-singular-or-common", ["0"]],
                ["first-plural", ["t", "ti"]],
                ["second-plural", ["am", "an"]],
                ["third-plural", ["0"]],
            ],
        }
    );

    s.eq(
        "Lesson 13 restricts reciprocative possessor ne to a third-person subject",
        [
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "1sg",
                possessor: "ne",
                singularConnector: "0",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3sg",
                possessor: "ne",
                singularConnector: "0",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3pl",
                possessor: "ne",
            }),
        ].map(frame => ({
            status: frame.authorizationStatus,
            reason: frame.blockReason,
            formula: frame.formulaRealization,
            contract: frame.possessiveParadigmContractFrame?.kind || null,
        })),
        [
            {
                status: "blocked",
                reason: "reciprocal-possessor-requires-third-person-subject",
                formula: "",
                contract: null
            },
            {
                status: "authorized",
                reason: "",
                formula: "#0-0+ne(cal)0-0#",
                contract: "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame"
            },
            {
                status: "authorized",
                reason: "",
                formula: "#0-0+ne(cal)hu-ān#",
                contract: "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame"
            }
        ]
    );

    s.eq(
        "Lesson 13 full-paradigm plans project only typed LCM coordinates",
        (() => {
            const frame = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3sg",
                possessor: "1sg",
                singularConnector: "0",
            });
            const animate = ctx.buildClassicalNahuatlPossessiveParadigmPlan(
                frame.possessiveParadigmContractFrame,
                { referent: "animate" }
            );
            const nonanimate = ctx.buildClassicalNahuatlPossessiveParadigmPlan(
                frame.possessiveParadigmContractFrame,
                { referent: "nonanimate" }
            );
            const animateReport = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                animate
            );
            const nonanimateReport = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                nonanimate
            );
            const poisoned = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...animate,
                    coordinates: animate.coordinates.map((coordinate, index) => (
                        index === 0
                            ? { ...coordinate, requestedPossessor: "display-only" }
                            : coordinate
                    ))
                }
            );
            const summarize = plan => ({
                status: plan.authorizationStatus,
                gcd: plan.greatestCommonDivisorIdentity,
                referent: plan.fixedReferent,
                inventory: plan.lcmInventory,
                stateShapes: plan.applicablePossessorStateShapeCount,
                coordinates: plan.coordinateCount,
                subjects: Array.from(new Set(
                    plan.coordinates.map(coordinate => coordinate.subject)
                )),
                possessors: Array.from(new Set(
                    plan.coordinates.map(coordinate => coordinate.requestedPossessor)
                )),
                reciprocalSubjects: plan.coordinates
                    .filter(coordinate => coordinate.possessorIdentity === "reciprocal")
                    .map(coordinate => coordinate.subject),
                stringAuthority: plan.formulaStringAuthority,
            });
            return {
                animate: summarize(animate),
                nonanimate: summarize(nonanimate),
                reports: [animateReport.status, nonanimateReport.status, poisoned.status]
            };
        })(),
        {
            animate: {
                status: "authorized",
                gcd: "lesson13:possessive-state-nnc",
                referent: "animate",
                inventory: {
                    formulaTemplateCount: 2,
                    subjectPronounShapeCount: 12,
                    possessorStateShapeCount: 14
                },
                stateShapes: 9,
                coordinates: 50,
                subjects: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
                possessors: [
                    "te",
                    "tla",
                    "1sg",
                    "1pl",
                    "2sg",
                    "2pl",
                    "3sg",
                    "3pl",
                    "reciprocal"
                ],
                reciprocalSubjects: ["3sg", "3pl"],
                stringAuthority: false
            },
            nonanimate: {
                status: "authorized",
                gcd: "lesson13:possessive-state-nnc",
                referent: "nonanimate",
                inventory: {
                    formulaTemplateCount: 2,
                    subjectPronounShapeCount: 12,
                    possessorStateShapeCount: 14
                },
                stateShapes: 9,
                coordinates: 9,
                subjects: ["3common"],
                possessors: [
                    "reciprocal",
                    "te",
                    "tla",
                    "1sg",
                    "1pl",
                    "2sg",
                    "2pl",
                    "3sg",
                    "3pl"
                ],
                reciprocalSubjects: ["3common"],
                stringAuthority: false
            },
            reports: ["valid", "valid", "invalid"]
        }
    );

    s.eq(
        "NNC diagrammatic format keeps monadic and dyadic State inside the Predicate row",
        [
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "te",
                singularConnector: "0",
                nounstemRelationKind: "nonrelational",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "0",
            }),
        ].map((frame) => {
            const diagram = ctx.buildClassicalNahuatlNncDiagrammaticFrame(frame.nncSlotFrame);
            return {
                arity: diagram.stateArity,
                rows: diagram.rows.map((row) => `${row.expression} ${row.role}`),
                generalLinear: diagram.generalLinearFormula,
                generalRows: diagram.generalRows.map((row) => `${row.expression} ${row.role}`),
            };
        }),
        [
            {
                arity: "monadic",
                rows: ["#0-0+ ... )0-0# Subject", "+tē(cal) Predicate"],
                generalLinear: "#pers¹-pers²+st(STEM)num¹-num²#",
                generalRows: ["#pers¹-pers²+ ... )num¹-num²# Subject", "+st(STEM) Predicate"],
            },
            {
                arity: "dyadic",
                rows: ["#0-0+ ... )0-0# Subject", "+n-o(cal) Predicate"],
                generalLinear: "#pers¹-pers²+st¹-st²(STEM)num¹-num²#",
                generalRows: ["#pers¹-pers²+ ... )num¹-num²# Subject", "+st¹-st²(STEM) Predicate"],
            },
        ]
    );

    s.eq(
        "Hostile linear formula cannot authorize an NNC diagram without typed slots",
        [
            ctx.buildClassicalNahuatlNncDiagrammaticFrame("#ni-0(FAKE)tl-0#"),
            ctx.buildClassicalNahuatlNncDiagrammaticFrame({
                kind: "classical-nahuatl-nnc-slot-frame",
                authorizationStatus: "authorized",
                formulaArtifactAuthority: "display-only-not-authority",
                formulaStringAuthority: true,
                slots: {},
            }),
        ].map((diagram) => ({
            status: diagram.authorizationStatus,
            reason: diagram.blockReason,
            rows: diagram.rows.length,
        })),
        [
            { status: "blocked", reason: "authorized-typed-nnc-slot-frame-required", rows: 0 },
            { status: "blocked", reason: "authorized-typed-nnc-slot-frame-required", rows: 0 },
        ]
    );

    s.eq(
        "Lesson 13 carries plural subject and third-person possessor categories in separate typed positions",
        [
            ctx.buildClassicalNahuatlPossessiveNncFrame("cihua", {
                subject: "1pl",
                possessor: "3sg",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3sg",
                possessor: "3pl",
                thirdPluralPossessorNumberMorph: "n",
                singularConnector: "0",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            subjectNumber: frame.numberFrame.subjectNumber,
            possessor: frame.stateFrame.possessor,
            numberBelongsTo: frame.numberFrame.numberBelongsTo,
        })),
        [
            { status: "authorized", formula: "#t-0+ī-0(cihua)hu-ān#", subjectNumber: "plural", possessor: "3sg", numberBelongsTo: "subject-personal-pronoun" },
            { status: "authorized", formula: "#0-0+ī-n(cal)0-0#", subjectNumber: "singular", possessor: "3pl", numberBelongsTo: "subject-personal-pronoun" },
        ]
    );

    s.eq(
        "Lesson 13 takes plural num2 vowel length from typed Canvas authority, not a short-vowel formula artifact",
        (() => {
            const frame = ctx.buildClassicalNahuatlPossessiveNncFrame("cihua", {
                subject: "1pl",
                possessor: "3sg",
                formulaArtifact: "#t-0+i-0(cihua)hu-an#",
            });
            return {
                status: frame.authorizationStatus,
                num1: frame.numberFrame.num1,
                num2: frame.numberFrame.num2,
                formula: frame.formulaRealization,
                hostileArtifact: frame.nncSlotFrame.sourceFormulaArtifact,
                artifactAuthority: frame.nncSlotFrame.formulaArtifactAuthority,
            };
        })(),
        {
            status: "authorized",
            num1: "hu",
            num2: "ān",
            formula: "#t-0+ī-0(cihua)hu-ān#",
            hostileArtifact: "#t-0+i-0(cihua)hu-an#",
            artifactAuthority: "display-only-not-authority",
        }
    );

    s.eq(
        "Lesson 13 blocks invalid State, connector, and third-plural possessor environments",
        [
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "tla",
                singularConnector: "0",
                nounstemRelationKind: "nonrelational",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("ā", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "hui",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "3pl",
                singularConnector: "0",
            }),
            ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "0",
                stateAvailability: "absolutive-only",
            }),
        ].map((frame) => ({ status: frame.authorizationStatus, reason: frame.blockReason, formula: frame.formulaRealization })),
        [
            { status: "blocked", reason: "tla-possessor-requires-relational-or-analogical-derived-nounstem", formula: "" },
            { status: "blocked", reason: "possessive-singular-connector-must-match-stem-boundary-and-lexical-selection", formula: "" },
            { status: "authorized", reason: "", formula: "#0-0+ī-n(cal)0-0#" },
            { status: "blocked", reason: "nounstem-restricted-to-absolutive-state", formula: "" },
        ]
    );

    s.eq(
        "Lesson 13 ignores a lying possessive formula artifact",
        (() => {
            const frame = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "0",
                formulaArtifact: "#x-0+tla(FAKE)past+c-an#",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                artifact: frame.nncSlotFrame.sourceFormulaArtifact,
                artifactAuthority: frame.nncSlotFrame.formulaArtifactAuthority,
                containsFake: frame.formulaRealization.includes("FAKE"),
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0+n-o(cal)0-0#",
            artifact: "#x-0+tla(FAKE)past+c-an#",
            artifactAuthority: "display-only-not-authority",
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 13 consumes typed tla compatibility and source-authorized third-plural m or n options",
        (() => {
            const relationalSource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("nacaz", {
                selectedState: "possessive",
                possessorCompatibility: "relational-tla",
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const nOnlySource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("cal", {
                selectedState: "possessive",
                thirdPluralPossessorSt2Options: ["n"],
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const tla = ctx.buildClassicalNahuatlPossessiveNncFrame("nacaz", {
                subject: "3common",
                possessor: "tla",
                singularConnector: "0",
                nncSourceAuthorityFrame: relationalSource,
            });
            const selectedN = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "3pl",
                thirdPluralPossessorNumberMorph: "n",
                singularConnector: "0",
                nncSourceAuthorityFrame: nOnlySource,
            });
            const ignoredM = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "3pl",
                thirdPluralPossessorNumberMorph: "m",
                singularConnector: "0",
                nncSourceAuthorityFrame: nOnlySource,
            });
            return {
                tla: { status: tla.authorizationStatus, formula: tla.formulaRealization },
                selectedN: {
                    status: selectedN.authorizationStatus,
                    formula: selectedN.formulaRealization,
                    allowed: selectedN.stateFrame.authorizedThirdPluralPossessorSt2Options,
                },
                ignoredM: {
                    status: ignoredM.authorizationStatus,
                    reason: ignoredM.blockReason,
                    formula: ignoredM.formulaRealization,
                    suppliedAuthority: ignoredM.stateFrame.suppliedThirdPluralPossessorSt2Authority,
                },
            };
        })(),
        {
            tla: { status: "authorized", formula: "#0-0+tla(nacaz)0-0#" },
            selectedN: { status: "authorized", formula: "#0-0+ī-n(cal)0-0#", allowed: ["n"] },
            ignoredM: {
                status: "authorized",
                reason: "",
                formula: "#0-0+ī-n(cal)0-0#",
                suppliedAuthority: false,
            },
        }
    );

    s.eq(
        "Lesson 13 derives third-plural possessor st2 from the following stem sound",
        ["ā", "mā", "pīl", "cal", "teō"].map((stem) => {
            const resolution = ctx.resolveClassicalNahuatlThirdPluralPossessorSt2(stem);
            return {
                stem,
                st2: resolution.st2,
                followingSound: resolution.followingSound,
                rule: resolution.selectionRule,
                userAuthority: resolution.userSelectionAuthority,
            };
        }),
        [
            { stem: "ā", st2: "m", followingSound: "a", rule: "lesson13-st2-m-before-vowel-m-or-p", userAuthority: false },
            { stem: "mā", st2: "m", followingSound: "m", rule: "lesson13-st2-m-before-vowel-m-or-p", userAuthority: false },
            { stem: "pīl", st2: "m", followingSound: "p", rule: "lesson13-st2-m-before-vowel-m-or-p", userAuthority: false },
            { stem: "cal", st2: "n", followingSound: "c", rule: "lesson13-st2-n-outside-m-environment", userAuthority: false },
            { stem: "teō", st2: "n", followingSound: "t", rule: "lesson13-st2-n-outside-m-environment", userAuthority: false },
        ]
    );

    s.eq(
        "Lesson 13 typed source authority defeats relational spelling and loose-boolean poisoning",
        (() => {
            const ordinarySource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tla-cal", {
                selectedState: "possessive",
                possessorCompatibility: "ordinary",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                formula: "#FAKE#",
                surface: "tla-FAKE",
            });
            const frame = ctx.buildClassicalNahuatlPossessiveNncFrame("tla-cal", {
                subject: "3common",
                possessor: "tla",
                singularConnector: "0",
                nounstemRelationKind: "relational",
                analogicalTlaDerivedStem: true,
                nncSourceAuthorityFrame: ordinarySource,
            });
            return {
                sourceStatus: ordinarySource.authorizationStatus,
                sourceCompatibility: ordinarySource.possessorCompatibility,
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                leakedFake: JSON.stringify(frame).includes("FAKE"),
            };
        })(),
        {
            sourceStatus: "authorized",
            sourceCompatibility: "ordinary",
            status: "blocked",
            reason: "tla-possessor-requires-relational-or-analogical-derived-nounstem",
            leakedFake: false,
        }
    );

    s.eq(
        "Lesson 14 treats form as class guidance and never as class authority",
        (() => {
            const vowelGuidance = ctx.getClassicalNahuatlClassFormGuidance("cihuā");
            const consonantGuidance = ctx.getClassicalNahuatlClassFormGuidance("cal");
            const missingSelection = ctx.buildClassicalNahuatlNounstemSourceFrame("cihuā", {
                state: "absolutive",
            });
            const contradictorySelection = ctx.buildClassicalNahuatlNounstemSourceFrame("cal", {
                state: "absolutive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
            });
            return {
                vowelCandidates: vowelGuidance.candidateClasses,
                consonantCandidates: consonantGuidance.candidateClasses,
                guidanceAuthorizes: vowelGuidance.classAuthorized,
                missingReason: missingSelection.blockReason,
                contradictoryReason: contradictorySelection.blockReason,
            };
        })(),
        {
            vowelCandidates: ["tl", "zero"],
            consonantCandidates: ["tli", "in", "zero"],
            guidanceAuthorizes: false,
            missingReason: "lexical-noun-class-selection-required",
            contradictoryReason: "selected-class-contradicts-canvas-form-constraint",
        }
    );
    s.eq(
        "Lesson 14 rejects the Modern ti class alias and lets Classical aliases normalize without manufacturing provenance",
        ["ti", "li", "null"].map((nounClass) => {
            const stem = nounClass === "ti" ? "cihuā" : "cal";
            const frame = ctx.buildClassicalNahuatlNounstemSourceFrame(stem, {
                state: "absolutive",
                nounClass,
            });
            return {
                nounClass: frame.nounClass,
                status: frame.authorizationStatus,
                reason: frame.blockReason,
            };
        }),
        [
            { nounClass: "", status: "blocked", reason: "lexical-noun-class-selection-required" },
            { nounClass: "tli", status: "blocked", reason: "class-must-be-user-selected-or-supplied-by-external-lexical-record" },
            { nounClass: "zero", status: "blocked", reason: "class-must-be-user-selected-or-supplied-by-external-lexical-record" },
        ]
    );

    s.eq(
        "Lesson 14 selects restricted versus general use and deletes only a tagged ephemeral vowel",
        (() => {
            const absolutive = ctx.buildClassicalNahuatlNounstemSourceFrame("naca", {
                state: "absolutive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
            });
            const possessive = ctx.buildClassicalNahuatlNounstemSourceFrame("naca", {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "a",
                tlSubclass: "2B",
            });
            const hostileUntypedDeletion = ctx.buildClassicalNahuatlNounstemSourceFrame("naca", {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                tlSubclass: "2B",
            });
            return {
                absolutive: absolutive.selectedUseStem,
                possessive: possessive.selectedUseStem,
                action: possessive.useShapeAction,
                hostileStatus: hostileUntypedDeletion.authorizationStatus,
                hostileReason: hostileUntypedDeletion.blockReason,
            };
        })(),
        {
            absolutive: "naca",
            possessive: "nac",
            action: "delete-tagged-ephemeral-vowel",
            hostileStatus: "blocked",
            hostileReason: "truncation-requires-matching-tagged-ephemeral-a-or-i",
        }
    );

    s.eq(
        "Lesson 14 writes exposed final m as n after productive Subclass 2-B truncation",
        [
            ["nemi", "i"],
            ["coma", "a"],
            ["zami", "i"],
        ].map(([stem, ephemeralFinalVowel]) => {
            const source = ctx.buildClassicalNahuatlNounstemSourceFrame(stem, {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel,
                tlSubclass: "2B",
            });
            const result = ctx.buildClassicalNahuatlClassGovernedNncFrame(stem, {
                state: "possessive",
                subject: "3sg",
                possessor: "3sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel,
                tlSubclass: "2B",
            });
            return {
                source: source.restrictedUseStem,
                underlying: source.underlyingGeneralUseStem,
                generalUse: source.generalUseStem,
                action: source.useShapeAction,
                applies: source.exposedFinalMFrame?.applies,
                exampleAuthority: source.exposedFinalMFrame?.exampleStemAuthority,
                formula: result.formulaRealization,
            };
        }),
        [
            {
                source: "nemi",
                underlying: "nem",
                generalUse: "nen",
                action: "delete-tagged-ephemeral-vowel-then-realize-exposed-final-m-as-n",
                applies: true,
                exampleAuthority: false,
                formula: "#0-0+ī-0(nen)0-0#",
            },
            {
                source: "coma",
                underlying: "com",
                generalUse: "con",
                action: "delete-tagged-ephemeral-vowel-then-realize-exposed-final-m-as-n",
                applies: true,
                exampleAuthority: false,
                formula: "#0-0+ī-0(con)0-0#",
            },
            {
                source: "zami",
                underlying: "zam",
                generalUse: "zan",
                action: "delete-tagged-ephemeral-vowel-then-realize-exposed-final-m-as-n",
                applies: true,
                exampleAuthority: false,
                formula: "#0-0+ī-0(zan)0-0#",
            },
        ]
    );

    s.eq(
        "Lesson 14 Subclass 2-C composes supportive i with k-before-i spelling after ephemeral-a deletion",
        (() => {
            const options = {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "a",
                truncationRepair: "supportive-i",
                tlSubclass: "2C",
            };
            const source = ctx.buildClassicalNahuatlNounstemSourceFrame("coz-ca", options);
            const selected = ctx.buildClassicalNahuatlClassGovernedNncFrame("coz-ca", {
                ...options,
                subject: "3common",
                possessor: "3sg",
                tlSubclass: "2C",
            });
            const hostilePreRealizedStem = ctx.buildClassicalNahuatlNounstemSourceFrame("coz-ca", {
                ...options,
                generalUseStem: "coz-ci",
            });
            return {
                sourceStatus: source.authorizationStatus,
                sourceStem: source.generalUseStem,
                formula: selected.formulaRealization,
                supportiveRule: source.truncationRepairFrame.supportiveIFrame.selectedRuleId,
                kSpellingRule: source.truncationRepairFrame.kBeforeIFrame.selectedRuleId,
                orderedRules: source.truncationRepairFrame.orderedRuleIds,
                stringAuthority: source.truncationRepairFrame.stringConcatenationAuthority,
                containsForbiddenCozci: selected.formulaRealization.includes("coz-ci"),
                hostileStatus: hostilePreRealizedStem.authorizationStatus,
                hostileReason: hostilePreRealizedStem.blockReason,
            };
        })(),
        {
            sourceStatus: "authorized",
            sourceStem: "coz-qui",
            formula: "#0-0+ī-0(coz-qui)0-0#",
            supportiveRule: "cn-l2-25-supportive-i-kept",
            kSpellingRule: "cn-l2-25-stem-final-k-before-e-i-qu",
            orderedRules: ["cn-l2-25-supportive-i-kept", "cn-l2-25-stem-final-k-before-e-i-qu"],
            stringAuthority: false,
            containsForbiddenCozci: false,
            hostileStatus: "blocked",
            hostileReason: "truncation-requires-matching-tagged-ephemeral-a-or-i",
        }
    );

    s.eq(
        "Lesson 14 enforces the distinct 2-A, 2-B, and 2-C source-shape preconditions",
        (() => {
            const validate = (stem, options) => {
                const frame =
                    ctx.validateClassicalNahuatlSubclassSourceShape(
                        stem,
                        {
                            nounClass: "tl",
                            generalUseShape: "truncated",
                            ...options,
                        }
                    );
                return [
                    frame.authorizationStatus,
                    frame.conditionId,
                    frame.blockReason,
                ];
            };
            const hostileReclassification =
                ctx.buildClassicalNahuatlStemOperationRecord("naci", {
                    operation: "tl-2a-to-1a",
                    selectionAuthority: "user-selection",
                    nounClass: "tl",
                    useShape: "truncated-i",
                    subclass: "tl-2a",
                    state: "absolutive",
                });
            return {
                twoA: validate("māi", {
                    tlSubclass: "2A",
                    ephemeralFinalVowel: "i",
                }),
                hostileTwoA: validate("naci", {
                    tlSubclass: "2A",
                    ephemeralFinalVowel: "i",
                }),
                twoB: validate("naca", {
                    tlSubclass: "2B",
                    ephemeralFinalVowel: "a",
                }),
                hostileTwoBCluster: validate("coz-ca", {
                    tlSubclass: "2B",
                    ephemeralFinalVowel: "a",
                }),
                twoC: validate("coz-ca", {
                    tlSubclass: "2C",
                    ephemeralFinalVowel: "a",
                    truncationRepair: "supportive-i",
                }),
                hostileTwoCNoCompound: validate("cozca", {
                    tlSubclass: "2C",
                    ephemeralFinalVowel: "a",
                    truncationRepair: "supportive-i",
                }),
                hostileReclassification: [
                    hostileReclassification.authorizationStatus,
                    hostileReclassification.blockReason,
                ],
            };
        })(),
        {
            twoA: [
                "authorized",
                "tl-2a-final-i-after-long-a-or-e",
                "",
            ],
            hostileTwoA: [
                "blocked",
                "tl-2a-final-i-after-long-a-or-e",
                "tl-subclass2a-requires-final-i-after-long-a-or-e",
            ],
            twoB: [
                "authorized",
                "tl-2b-final-a-or-i-after-one-consonant",
                "",
            ],
            hostileTwoBCluster: [
                "blocked",
                "tl-2b-final-a-or-i-after-one-consonant",
                "tl-subclass2b-requires-final-a-or-i-after-one-consonant",
            ],
            twoC: [
                "authorized",
                "tl-2c-final-a-after-cluster-plus-supportive-i",
                "",
            ],
            hostileTwoCNoCompound: [
                "blocked",
                "tl-2c-final-a-after-cluster-plus-supportive-i",
                "tl-subclass2c-requires-typed-compound-source-analysis",
            ],
            hostileReclassification: [
                "blocked",
                "tl-2a-to-1a-reclassification-requires-typed-tl-2a-source-analysis",
            ],
        }
    );

    s.eq(
        "Lesson 14 consumes Lessons 12 and 13 and finalizes class-governed NNC formulas",
        [
            ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
                state: "absolutive",
                subject: "3common",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                animacy: "nonanimate",
            }),
            ctx.buildClassicalNahuatlClassGovernedNncFrame("naca", {
                state: "possessive",
                subject: "3common",
                possessor: "2sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "a",
                tlSubclass: "2B",
            }),
            ctx.buildClassicalNahuatlClassGovernedNncFrame("cihuā", {
                state: "possessive",
                subject: "1sg",
                possessor: "2sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "base",
                tlSubclass: "1A",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            consumed: frame.lowerNncFrame.kind,
            resultOperation: frame.operationEvaluationFrame.resultOperationId,
        })),
        [
            { status: "authorized", formula: "#0-0(cal)li-0#", consumed: "classical-nahuatl-absolutive-nnc-absolutive-nnc-frame", resultOperation: "nnc-nounstem-selection" },
            { status: "authorized", formula: "#0-0+m-o(nac)0-0#", consumed: "classical-nahuatl-possessive-nnc-possessive-nnc-frame", resultOperation: "nnc-nounstem-selection" },
            { status: "authorized", formula: "#ni-0+m-o(cihuā)uh-0#", consumed: "classical-nahuatl-possessive-nnc-possessive-nnc-frame", resultOperation: "nnc-nounstem-selection" },
        ]
    );

    s.eq(
        "Lesson 14 GCD and LCM preserve every nounstem distinction and reject forged class relationships",
        (() => {
            const hand = ctx.buildClassicalNahuatlClassGovernedNncFrame("māi", {
                state: "possessive",
                subject: "3common",
                possessor: "3sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "i",
                tlSubclass: "2A",
            });
            const dog = ctx.buildClassicalNahuatlClassGovernedNncFrame("chichi", {
                state: "possessive",
                subject: "3common",
                possessor: "3sg",
                nounClass: "zero",
                classSelectionAuthority: "user-selection",
                generalUseShape: "base",
                tlSubclass: "1B",
            });
            const contract = hand.nounstemParadigmContractFrame;
            const registry = ctx.getDefaultGrammarContractRegistry();
            const forgedGcd = JSON.parse(JSON.stringify(contract));
            forgedGcd.greatestCommonDivisor.nounstemRelationIsGrammaticalNumber = true;
            const forgedClassInventory = JSON.parse(JSON.stringify(contract));
            forgedClassInventory.leastCommonMultiple.classSubclassInventory[0].nounClass = "zero";
            const forgedCoordinate = JSON.parse(JSON.stringify(dog.nounstemParadigmContractFrame));
            forgedCoordinate.leastCommonMultiple.selectedCoordinate.classSubclassIdentity = "tl-1b";
            forgedCoordinate.leastCommonMultiple.selectedRealizations[0].classSubclassIdentity = "tl-1b";
            const forgedLexicalRecord = JSON.parse(JSON.stringify(contract));
            forgedLexicalRecord.leastCommonMultiple.selectedCoordinate
                .lexicalSelectionRecord.selectedRestrictedUseStem = "fake";
            forgedLexicalRecord.leastCommonMultiple.selectedRealizations[0]
                .lexicalSelectionRecord.selectedRestrictedUseStem = "fake";
            return {
                exportedBuilder: typeof ctx.buildClassicalNahuatlNounstemParadigmContractFrame,
                handStatus: hand.authorizationStatus,
                handFormula: hand.formulaRealization,
                handContractStatus: ctx.inspectRegisteredGrammarContract(registry, contract).status,
                gcd: contract.greatestCommonDivisor,
                axes: contract.leastCommonMultiple.distinctionAxes,
                inventoryCounts: [
                    contract.leastCommonMultiple.useStemKindInventory.length,
                    contract.leastCommonMultiple.useStemShapeInventory.length,
                    contract.leastCommonMultiple.nounClassInventory.length,
                    contract.leastCommonMultiple.classSubclassInventory.length,
                    contract.leastCommonMultiple.stemRelationInventory.length,
                    contract.leastCommonMultiple.stateSubjectEnvironmentInventory.length,
                    contract.leastCommonMultiple.numberDyadInventory.length,
                    contract.leastCommonMultiple.constituentAmbiguityInventory.length,
                ],
                handCoordinate: {
                    useStem: contract.leastCommonMultiple.selectedCoordinate.selectedUseStem,
                    predicateStem: contract.leastCommonMultiple.selectedCoordinate.selectedPredicateStem,
                    nounClass: contract.leastCommonMultiple.selectedCoordinate.nounClass,
                    subclass: contract.leastCommonMultiple.selectedCoordinate.classSubclassIdentity,
                    numberDyad: contract.leastCommonMultiple.selectedCoordinate.numberDyadIdentity,
                    connectorOwner: contract.leastCommonMultiple.selectedCoordinate.connectorBelongsTo,
                    stemHasNumber: contract.leastCommonMultiple.selectedCoordinate.grammaticalNumberInPredicateStem,
                },
                irrelevantSubclass: {
                    status: dog.authorizationStatus,
                    connectorTlSubclass: dog.connectorSelectionFrame.tlSubclass,
                    selectedSubclass: dog.nounstemParadigmContractFrame.leastCommonMultiple.selectedCoordinate.classSubclassIdentity,
                },
                poisoned: [
                    ctx.inspectRegisteredGrammarContract(registry, forgedGcd).status,
                    ctx.inspectRegisteredGrammarContract(registry, forgedClassInventory).status,
                    ctx.inspectRegisteredGrammarContract(registry, forgedCoordinate).status,
                    ctx.inspectRegisteredGrammarContract(registry, forgedLexicalRecord).status,
                ],
            };
        })(),
        {
            exportedBuilder: "function",
            handStatus: "authorized",
            handFormula: "#0-0+ī-0(mā)0-0#",
            handContractStatus: "valid",
            gcd: {
                identityId: "lesson14:class-governed-nounstem-selection",
                operationKind: "nounstem-selection-inside-nnc-predicate",
                inputKind: "lexically-classified-restricted-use-nounstem",
                outputKind: "one-selected-nounstem-in-predicate-slot",
                predicateSlot: "STEM",
                formulaSlotDelta: 0,
                connectorBelongsTo: "subject-personal-pronoun",
                nounstemRelationIsGrammaticalNumber: false,
                classMembershipSource: "lexical-not-form-prediction",
                prerequisiteOperations: ["nnc-clause-shell", "nnc-absolutive-state-or-possessive-state"],
            },
            axes: [
                "use-stem-kind",
                "use-stem-shape",
                "nounstem-class",
                "class-subclass",
                "stem-relation",
                "state",
                "subject-number",
                "subject-reference-animacy",
                "class-conditioned-number-dyad",
                "lexical-alternative",
                "constituent-analysis",
                "orthographic-boundary-realization",
            ],
            inventoryCounts: [2, 3, 4, 7, 3, 4, 12, 5],
            handCoordinate: {
                useStem: "mā",
                predicateStem: "mā",
                nounClass: "tl",
                subclass: "tl-2a",
                numberDyad: "possessive-singular-common-zero",
                connectorOwner: "subject-personal-pronoun",
                stemHasNumber: false,
            },
            irrelevantSubclass: {
                status: "authorized",
                connectorTlSubclass: "",
                selectedSubclass: "not-applicable",
            },
            poisoned: ["invalid", "invalid", "invalid", "invalid"],
        }
    );

    s.eq(
        "Lesson 15 preserves the specific Lesson 14 selection failure instead of hiding it behind a generic typed-frame message",
        (() => {
            const lesson14 = ctx.buildClassicalNahuatlClassGovernedNncFrame("icniuh", {
                state: "possessive",
                subject: "3sg",
                possessor: "3sg",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                generalUseShape: "base",
                tlSubclass: "1A",
            });
            const lesson15 = ctx.buildClassicalNahuatlHigherNncFrame(lesson14);
            return {
                lesson14Status: lesson14.authorizationStatus,
                lesson14Reason: lesson14.blockReason,
                lesson15Status: lesson15.authorizationStatus,
                lesson15Reason: lesson15.blockReason,
            };
        })(),
        {
            lesson14Status: "blocked",
            lesson14Reason: "tli-possessive-common-subclass-selection-required",
            lesson15Status: "blocked",
            lesson15Reason: "tli-possessive-common-subclass-selection-required",
        }
    );

    s.eq(
        "Affinity and distributive formations remain one internal predicate stem and never become grammatical number",
        [
            ctx.buildClassicalNahuatlClassGovernedNncFrame("teō", {
                state: "absolutive",
                subject: "3pl",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                stemFormation: "affinity",
                pluralConnector: "0-h",
                pluralSelectionAuthority: "user-selection",
                animacy: "animate",
            }),
            ctx.buildClassicalNahuatlClassGovernedNncFrame("te", {
                state: "absolutive",
                subject: "3common",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                stemFormation: "distributive",
                animacy: "nonanimate",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            stem: frame.nncSlotFrame.slots.predicate.stem,
            derivationPosition: frame.derivedStemFrame.derivationPosition,
            grammaticalNumber: frame.derivedStemFrame.grammaticalNumberValue,
            subjectNumber: frame.nncSlotFrame.subjectNumber,
        })),
        [
            { status: "authorized", formula: "#0-0(tē-teō)0-h#", stem: "tē-teō", derivationPosition: "inside-predicate-stem", grammaticalNumber: "none", subjectNumber: "plural" },
            { status: "authorized", formula: "#0-0(teh-te)tl-0#", stem: "teh-te", derivationPosition: "inside-predicate-stem", grammaticalNumber: "none", subjectNumber: "common" },
        ]
    );

    s.eq(
        "Lesson 14.3 derives arbitrary affinity and distributive stems from Canvas rules rather than witness whitelists",
        [
            ["tah", "affinity"],
            ["cal", "affinity"],
            ["cal", "distributive-varietal"],
            ["āhui-l", "distributive-varietal"],
            ["icxi", "distributive-varietal"],
            ["xochitl", "affinity"],
        ].map(([stem, formation]) => {
            const frame = ctx.deriveClassicalNahuatlStem(stem, formation);
            return {
                status: frame.authorizationStatus,
                operation: frame.operationId,
                result: frame.derivedStem,
                sourcePreserved: frame.sourceStemPreserved,
                formulaSlotDelta: frame.formulaSlotDelta,
                grammaticalNumber: frame.grammaticalNumberValue,
            };
        }),
        [
            { status: "authorized", operation: "nnc-add-long-vowel-affinity-reduplicative-prefix", result: "tā-tah", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "nnc-add-long-vowel-affinity-reduplicative-prefix", result: "cā-cal", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "nnc-add-glottal-stop-distributive-varietal-reduplicative-prefix", result: "cah-cal", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "nnc-add-glottal-stop-distributive-varietal-reduplicative-prefix", result: "ah-āhui-l", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "nnc-add-glottal-stop-distributive-varietal-reduplicative-prefix", result: "ih-icxi", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "nnc-add-long-vowel-affinity-reduplicative-prefix", result: "xō-xochitl", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
        ]
    );

    s.eq(
        "Lesson 14.3 rejects an invented finished spelling and keeps supportive i inside the one predicate stem",
        (() => {
            const contradiction = ctx.buildClassicalNahuatlDerivedStemFrame("cal", {
                stemFormation: "affinity",
                derivedStem: "witness-shaped-cal",
            });
            const supportive = ctx.buildClassicalNahuatlClassGovernedNncFrame("icxi", {
                state: "absolutive",
                subject: "3common",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                stemFormation: "distributive-varietal",
                animacy: "nonanimate",
            });
            return {
                contradictionStatus: contradiction.authorizationStatus,
                contradictionReason: contradiction.blockReason,
                suppliedIsAuthority: contradiction.suppliedDerivedStemIsAuthority,
                supportiveFormula: supportive.formulaRealization,
                supportiveStem: supportive.nncSlotFrame?.slots?.predicate?.stem,
                supportiveKept: supportive.derivedStemFrame.derivationOperationFrame.supportiveInitialIKeptInSource,
                supportiveReduplicated: supportive.derivedStemFrame.derivationOperationFrame.supportiveInitialIReduplicatedAsSupportive,
            };
        })(),
        {
            contradictionStatus: "blocked",
            contradictionReason: "supplied-derived-stem-contradicts-canvas-rule-derivation",
            suppliedIsAuthority: false,
            supportiveFormula: "#0-0(ih-icxi)tl-0#",
            supportiveStem: "ih-icxi",
            supportiveKept: true,
            supportiveReduplicated: true,
        }
    );

    s.eq(
        "Lesson 14 plural class tendencies cannot invent or override lexical connector selection",
        (() => {
            const missing = ctx.buildClassicalNahuatlClassGovernedNncFrame("cōl", {
                state: "absolutive",
                subject: "1pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                animacy: "animate",
            });
            const distributiveMismatch = ctx.buildClassicalNahuatlClassGovernedNncFrame("tah", {
                state: "absolutive",
                subject: "3pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                stemFormation: "distributive",
                derivedStem: "tah-tah",
                pluralConnector: "m-eh",
                sourcePlainPluralConnector: "t-in",
                pluralSelectionAuthority: "user-selection",
                animacy: "animate",
            });
            const selected = ctx.buildClassicalNahuatlClassGovernedNncFrame("cōl", {
                state: "absolutive",
                subject: "1pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                pluralConnector: "t-in",
                pluralSelectionAuthority: "user-selection",
                animacy: "animate",
            });
            return {
                missing: missing.blockReason,
                mismatch: distributiveMismatch.blockReason,
                selected: selected.formulaRealization,
                guidanceIsSelection: selected.connectorSelectionFrame.classGuidelineIsLexicalSelection,
            };
        })(),
        {
            missing: "lexical-plural-number-dyad-selection-required",
            mismatch: "distributive-plural-must-follow-source-stem-connector",
            selected: "#ti-0(cōl)t-in#",
            guidanceIsSelection: false,
        }
    );

    s.eq(
        "Lesson 14 supports typed subclass alternatives without allowing an unlicensed silent connector",
        (() => {
            const ordinary = ctx.buildClassicalNahuatlClassGovernedNncFrame("ich", {
                state: "possessive",
                subject: "3sg",
                possessor: "2pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                tliSubclass: "2",
                singularConnector: "hui",
            });
            const silent = ctx.buildClassicalNahuatlClassGovernedNncFrame("ich", {
                state: "possessive",
                subject: "3sg",
                possessor: "2pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                tliSubclass: "2",
                singularConnector: "⎕",
                lesson14LexicalSelectionRecord:
                    ctx.buildClassicalNahuatlLexicalSelectionRecord("ich", {
                        selectionAuthority: "external-lexical-record",
                        nounClass: "tli",
                        stemFormation: "plain",
                        tliSubclass2SilentNum1Authorized: true,
                    }),
            });
            const hostileSilent = ctx.buildClassicalNahuatlClassGovernedNncFrame("ich", {
                state: "possessive",
                subject: "3sg",
                possessor: "2pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                tliSubclass: "2",
                singularConnector: "⎕",
            });
            return {
                ordinary: ordinary.formulaRealization,
                silent: silent.formulaRealization,
                hostileStatus: hostileSilent.authorizationStatus,
                hostileReason: hostileSilent.blockReason,
            };
        })(),
        {
            ordinary: "#0-0+am-⎕(ich)hui-0#",
            silent: "#0-0+am-⎕(ich)⎕-0#",
            hostileStatus: "blocked",
            hostileReason: "tli-subclass2-requires-hui-or-lexically-authorized-silent-alternative",
        }
    );

    s.eq(
        "Lesson 14 lexical alternatives are one typed record and legacy exception flags have no authority",
        (() => {
            const lexicalRecord = ctx.buildClassicalNahuatlLexicalSelectionRecord("tōch", {
                selectionAuthority: "external-lexical-record",
                nounClass: "tli",
                classMembershipOptions: ["in", "tli"],
                stemFormation: "affinity",
                pluralStemFormationOptions: ["plain", "affinity"],
                pluralStemFormationRequirement: "allowed",
                preferredPluralStemFormation: "affinity",
                pluralConnector: "m-eh",
                pluralConnectorOptions: ["t-in", "m-eh"],
                preferredPluralConnector: "t-in",
                affinityConnectorExceptionAuthorized: true,
            });
            const selected = ctx.buildClassicalNahuatlClassGovernedNncFrame("tōch", {
                state: "absolutive",
                subject: "3pl",
                nounClass: "tli",
                classSelectionAuthority: "external-lexical-record",
                stemFormation: "affinity",
                pluralConnector: "m-eh",
                pluralSelectionAuthority: "external-lexical-record",
                animacy: "animate",
                lesson14LexicalSelectionRecord: lexicalRecord,
            });
            const looseException = ctx.buildClassicalNahuatlClassGovernedNncFrame("tōch", {
                state: "absolutive",
                subject: "3pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                stemFormation: "affinity",
                pluralConnector: "m-eh",
                pluralSelectionAuthority: "user-selection",
                lexicalExceptionAuthorized: true,
                animacy: "animate",
            });
            return {
                recordStatus: lexicalRecord.authorizationStatus,
                classes: lexicalRecord.classMembershipOptions,
                formations: lexicalRecord.pluralStemFormationOptions,
                preferred: [
                    lexicalRecord.preferredPluralStemFormation,
                    lexicalRecord.preferredPluralConnector,
                ],
                selected: selected.formulaRealization,
                selectedRule: selected.connectorSelectionFrame.selectionRule,
                looseStatus: looseException.authorizationStatus,
                looseReason: looseException.blockReason,
            };
        })(),
        {
            recordStatus: "authorized",
            classes: ["in", "tli"],
            formations: ["plain", "affinity"],
            preferred: ["affinity", "t-in"],
            selected: "#0-0(tō-tōch)m-eh#",
            selectedRule: "lexical-affinity-plural-selection-with-class-guideline",
            looseStatus: "blocked",
            looseReason: "affinity-plural-connector-contradicts-class-guideline-without-lexical-exception",
        }
    );

    s.eq(
        "Lesson 14 mechanically derives supportive-initial and compound-only glottalized general-use variants",
        (() => {
            const supportiveRecord =
                ctx.buildClassicalNahuatlLexicalSelectionRecord("icxi", {
                    selectionAuthority: "external-lexical-record",
                    nounClass: "tl",
                    stemFormation: "plain",
                    supportiveInitialI: true,
                    selectedInitialVariant: "omitted",
                });
            const supportive = ctx.buildClassicalNahuatlNounstemSourceFrame("icxi", {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "external-lexical-record",
                lesson14LexicalSelectionRecord: supportiveRecord,
            });
            const glottalized = ctx.buildClassicalNahuatlGlottalizedGeneralUseFrame("teō", {
                matrixMorpheme: "calli",
                lexicallyGlottalizable: true,
            });
            const hostileSpelling = ctx.buildClassicalNahuatlGlottalizedGeneralUseFrame("teō", {
                matrixMorpheme: "calli",
                lexicallyGlottalizable: true,
                glottalizedStem: "invented",
            });
            const looseSupportive = ctx.buildClassicalNahuatlNounstemSourceFrame("icxi", {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                supportiveInitialVariant: "cxi",
            });
            return {
                supportive: {
                    status: supportive.authorizationStatus,
                    selected: supportive.selectedRestrictedUseStem,
                    alternatives: supportive.supportiveInitialAlternatives,
                },
                glottalized: {
                    status: glottalized.authorizationStatus,
                    stem: glottalized.generalUseStem,
                    operation: glottalized.operationId,
                    transcription: glottalized.transcriptionLongVowelGlottalFrame.authorizationStatus,
                    suppliedAuthority: glottalized.suppliedStemIsAuthority,
                },
                hostile: [hostileSpelling.authorizationStatus, hostileSpelling.blockReason],
                looseSupportiveAlternatives: looseSupportive.supportiveInitialAlternatives,
            };
        })(),
        {
            supportive: {
                status: "authorized",
                selected: "cxi",
                alternatives: ["icxi", "cxi"],
            },
            glottalized: {
                status: "authorized",
                stem: "teoh",
                operation: "nnc-select-glottalized-general-use-compound-embed",
                transcription: "authorized",
                suppliedAuthority: false,
            },
            hostile: ["blocked", "supplied-glottalized-stem-contradicts-canvas-rule-derivation"],
            looseSupportiveAlternatives: ["icxi"],
        }
    );

    s.eq(
        "Lesson 14.8 retains every typed orthographic boundary distinction in the registered LCM",
        (() => {
            const frame = ctx.buildClassicalNahuatlClassGovernedNncFrame("teō", {
                state: "possessive",
                subject: "3common",
                possessor: "3sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "base",
                tlSubclass: "1A",
            });
            const longI = ctx.buildClassicalNahuatlClassGovernedNncFrame("īx", {
                state: "possessive",
                subject: "3common",
                possessor: "3sg",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                tliSubclass: "1",
            });
            const glottalInitial = ctx.buildClassicalNahuatlClassGovernedNncFrame("ihte", {
                state: "possessive",
                subject: "3common",
                possessor: "3sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                tlSubclass: "1B",
            });
            const supportiveRecord =
                ctx.buildClassicalNahuatlLexicalSelectionRecord("icxi", {
                    selectionAuthority: "external-lexical-record",
                    nounClass: "tl",
                    stemFormation: "plain",
                    supportiveInitialI: true,
                    selectedInitialVariant: "omitted",
                });
            const supportiveInitial = ctx.buildClassicalNahuatlClassGovernedNncFrame("icxi", {
                state: "possessive",
                subject: "3common",
                possessor: "3sg",
                nounClass: "tl",
                classSelectionAuthority: "external-lexical-record",
                tlSubclass: "1B",
                lesson14LexicalSelectionRecord: supportiveRecord,
            });
            const contract = frame.nounstemParadigmContractFrame;
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                applied: [
                    frame,
                    longI,
                    glottalInitial,
                    supportiveInitial,
                ].map((item) => ({
                    formula: item.formulaRealization,
                    actions: item.orthographicBoundaryFrame.appliedActionIds,
                })),
                inventory: contract.leastCommonMultiple.orthographicBoundaryInventory
                    .map((entry) => entry.identity),
                registry: ctx.inspectRegisteredGrammarContract(
                    ctx.getDefaultGrammarContractRegistry(),
                    contract
                ).status,
                underwritingAuthority:
                    frame.orthographicBoundaryFrame.traditionalUnderwritingIsAuthority,
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0+ī-0(teō)uh-0#",
            applied: [
                {
                    formula: "#0-0+ī-0(teō)uh-0#",
                    actions: ["long-o-before-uh-preserved"],
                },
                {
                    formula: "#0-0+ī-0(īx)0-0#",
                    actions: ["third-possessor-i-plus-long-initial-i-preserved"],
                },
                {
                    formula: "#0-0+i-0(ihte)0-0#",
                    actions: ["third-possessor-i-shortened-before-i-glottal"],
                },
                {
                    formula: "#0-0+ī-0(cxi)0-0#",
                    actions: ["supportive-initial-i-deleted-after-third-possessor-i"],
                },
            ],
            inventory: [
                "long-o-before-uh-preserved",
                "third-possessor-i-plus-long-initial-i-preserved",
                "third-possessor-i-shortened-before-i-glottal",
                "supportive-initial-i-deleted-after-third-possessor-i",
            ],
            registry: "valid",
            underwritingAuthority: false,
        }
    );

    s.eq(
        "Lesson 14 preserves typed constituent alternatives, rejects string-only analyses, and requires selection",
        (() => {
            const analyses = [
                {
                    kind: "stem-final-uh-analysis",
                    id: "stem-final-uh",
                    slots: { stem: "teuh", num1: "0" },
                    vowelLengthAuthority: "explicit-typed-source-spelling",
                },
                "#0-0+n-o(te)uh-0#",
                {
                    kind: "num1-uh-analysis",
                    id: "num1-uh",
                    slots: { stem: "te", num1: "uh" },
                    vowelLengthAuthority: "explicit-typed-source-spelling",
                },
            ];
            const ambiguity = ctx.buildClassicalNahuatlConstituentAnalysisFrame(analyses);
            const selected = ctx.buildClassicalNahuatlConstituentAnalysisFrame(analyses, {
                selectedAnalysisId: "num1-uh",
                selectionAuthority: "user-selection",
            });
            return {
                status: ambiguity.authorizationStatus,
                reason: ambiguity.blockReason,
                count: ambiguity.alternativeCount,
                preserved: ambiguity.ambiguityPreserved,
                rejected: ambiguity.rejectedUntypedAnalysisCount,
                spellingSelects: ambiguity.spellingAloneSelectsAnalysis,
                selectedStatus: selected.authorizationStatus,
                selectedId: selected.selectedAnalysisId,
                selectedStem: selected.selectedAnalysis.slots.stem,
                selectedAuthority: selected.selectionAuthority,
            };
        })(),
        {
            status: "blocked",
            reason: "constituent-analysis-selection-required",
            count: 2,
            preserved: true,
            rejected: 1,
            spellingSelects: false,
            selectedStatus: "authorized",
            selectedId: "num1-uh",
            selectedStem: "te",
            selectedAuthority: "user-selection",
        }
    );

    s.eq(
        "Lesson 14.8 selected typed analysis controls boundary slots and preserves explicit vowel length",
        (() => {
            const baseOptions = {
                state: "possessive",
                subject: "3common",
                possessor: "1sg",
                nounClass: "zero",
                classSelectionAuthority: "user-selection",
                constituentAmbiguityKind: "front-o",
                constituentAlternativeStem: "mī",
                formulaArtifact: "#x-0+FAKE(wrong)0-0#",
            };
            const unresolved = ctx.buildClassicalNahuatlClassGovernedNncFrame("omi", baseOptions);
            const current = ctx.buildClassicalNahuatlClassGovernedNncFrame("omi", {
                ...baseOptions,
                selectedConstituentAnalysisId: "current-typed-slots",
                constituentAnalysisSelectionAuthority: "user-selection",
            });
            const alternative = ctx.buildClassicalNahuatlClassGovernedNncFrame("omi", {
                ...baseOptions,
                selectedConstituentAnalysisId: "alternative-typed-slots",
                constituentAnalysisSelectionAuthority: "user-selection",
            });
            return {
                unresolved: [unresolved.authorizationStatus, unresolved.blockReason],
                current: [current.authorizationStatus, current.formulaRealization],
                alternative: [alternative.authorizationStatus, alternative.formulaRealization],
                selectedStem: alternative.ambiguityFrame.selectedAnalysis.slots.stem,
                selectedSt2: alternative.ambiguityFrame.selectedAnalysis.slots.st2,
                formulaPoisonAuthorized: alternative.formulaRealization.includes("FAKE"),
                stringAuthority: alternative.selectedOutputLogicFrame.formulaStringAuthority,
            };
        })(),
        {
            unresolved: ["blocked", "constituent-analysis-selection-required"],
            current: ["authorized", "#0-0+n-⎕(omi)0-0#"],
            alternative: ["authorized", "#0-0+n-o(mī)0-0#"],
            selectedStem: "mī",
            selectedSt2: "o",
            formulaPoisonAuthorized: false,
            stringAuthority: false,
        }
    );

    s.eq(
        "A lying formula cannot replace Lesson 14 typed class, use-stem, or selected output authority",
        (() => {
            const frame = ctx.buildClassicalNahuatlClassGovernedNncFrame("naca", {
                state: "possessive",
                subject: "3common",
                possessor: "2sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "a",
                tlSubclass: "2B",
                formulaArtifact: "#x-0+FAKE(wrong)past+c-an#",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                artifact: frame.nncSlotFrame.sourceFormulaArtifact,
                selectedAuthority: frame.selectedOutputLogicFrame.selectedOutputAuthority,
                containsFake: frame.formulaRealization.includes("FAKE"),
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0+m-o(nac)0-0#",
            artifact: "#x-0+FAKE(wrong)past+c-an#",
            selectedAuthority: "typed-nnc-slots-after-nounstem-selection-operation",
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 15 stem formations use one Canvas option per grammatical operation",
        (() => {
            const ids = (stem, context) => ctx.getClassicalNahuatlPredicateOptionContract(stem, context).optionIds;
            return {
                pilAbsolutive: ids("pil", { state: "absolutive" }),
                pilPossessive: ids("pil", { state: "possessive" }),
                teucOrdinary: ids("tēuc", { state: "possessive", subject: "1sg", possessor: "2sg" }),
                teucTotec: ids("tēuc", { state: "possessive", subject: "3sg", possessor: "1pl" }),
                achCauh: ids("āch-cāuh", { state: "possessive" }),
                maiReclassification: ids("māi", {
                    state: "possessive",
                    subject: "3sg",
                    possessor: "3sg",
                    nounClass: "tl",
                    useShape: "truncated-i",
                    subclass: "tl-2a",
                }),
                analogical: ["māi", "ix-cuāi", "nacaz", "nel-hua"].map((stem) => ids(stem, { state: "absolutive" })),
            };
        })(),
        {
            pilAbsolutive: ["source-stem", "yo-matrix", "analogical-restricted-use"],
            pilPossessive: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
            teucOrdinary: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
            teucTotec: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use", "tec-title"],
            achCauh: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
            maiReclassification: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use", "tl-2a-to-1a"],
            analogical: [
                ["source-stem", "yo-matrix", "analogical-restricted-use"],
                ["source-stem", "yo-matrix", "analogical-restricted-use"],
                ["source-stem", "yo-matrix", "analogical-restricted-use"],
                ["source-stem", "yo-matrix", "analogical-restricted-use"],
            ],
        }
    );

    s.eq(
        "Lesson 15 stem-formation authority resolves matrix boundaries and rejects invented choices",
        (() => {
            const genericCanvasOption = ctx.buildClassicalNahuatlStemOperationRecord("tēuc", {
                predicateOptionId: "yo-matrix",
                state: "possessive",
                subject: "1sg",
                possessor: "2sg",
                selectionAuthority: "canvas-predicate-option",
            });
            const selected = ctx.buildClassicalNahuatlStemOperationRecord("tēuc", {
                operation: "yo-matrix",
                state: "possessive",
                subject: "1sg",
                possessor: "2sg",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const selectedPlural = ctx.buildClassicalNahuatlStemOperationRecord("tēuc", {
                operation: "yo-matrix",
                state: "possessive",
                subject: "3pl",
                possessor: "2sg",
                selectionAuthority: "external-lexical-record",
            });
            const selectedLBoundary = ctx.buildClassicalNahuatlStemOperationRecord("pil", {
                operation: "yo-matrix",
                state: "possessive",
                subject: "1sg",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const selectedLBoundaryPlural = ctx.buildClassicalNahuatlStemOperationRecord("pil", {
                operation: "yo-matrix",
                state: "possessive",
                subject: "3pl",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const productivePrefix = ctx.buildClassicalNahuatlStemOperationRecord("cal", {
                operation: "secondary-general-use",
                state: "possessive",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const poisonedTarget = ctx.buildClassicalNahuatlStemOperationRecord("tēuc", {
                operation: "yo-matrix",
                targetStem: "tla-POISON",
                state: "possessive",
                subject: "1sg",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const exactTotec = ctx.buildClassicalNahuatlStemOperationRecord("tēuc", {
                predicateOptionId: "tec-title",
                state: "possessive",
                subject: "3sg",
                possessor: "1pl",
                selectionAuthority: "canvas-predicate-option",
            });
            const wrongTotecContext = ctx.buildClassicalNahuatlStemOperationRecord("tēuc", {
                predicateOptionId: "tec-title",
                state: "possessive",
                subject: "1sg",
                possessor: "2sg",
                selectionAuthority: "canvas-predicate-option",
            });
            const spurious = ctx.buildClassicalNahuatlStemOperationRecord("tēuc", {
                predicateOptionId: "tecu-i-yo",
                state: "possessive",
                subject: "3sg",
                possessor: "1pl",
                targetStem: "tēcuiyo",
                selectionAuthority: "canvas-predicate-option",
            });
            const retiredSurfaceOption = ctx.buildClassicalNahuatlStemOperationRecord("pil", {
                predicateOptionId: "suffix-lo",
                state: "possessive",
                selectionAuthority: "canvas-predicate-option",
            });
            return {
                genericCanvasOption: [
                    genericCanvasOption.authorizationStatus,
                    genericCanvasOption.blockReason,
                ],
                selected: {
                    status: selected.authorizationStatus,
                    operation: selected.operation,
                    target: selected.targetStem,
                    connector: selected.suppletiveConnector,
                    authority: selected.selectionAuthority,
                    derivation: selected.targetStemDerivation,
                },
                selectedPluralTarget: selectedPlural.targetStem,
                selectedLBoundaryTargets: [selectedLBoundary.targetStem, selectedLBoundaryPlural.targetStem],
                productivePrefix: [productivePrefix.authorizationStatus, productivePrefix.targetStem],
                poisonedTarget: [
                    poisonedTarget.authorizationStatus,
                    poisonedTarget.blockReason,
                    poisonedTarget.targetStem,
                ],
                exactTotec: [
                    exactTotec.authorizationStatus,
                    exactTotec.targetStem,
                    exactTotec.targetStemDerivation,
                ],
                wrongTotecContext: [wrongTotecContext.authorizationStatus, wrongTotecContext.blockReason],
                spurious: [spurious.authorizationStatus, spurious.blockReason, spurious.targetStem],
                retiredSurfaceOption: [retiredSurfaceOption.authorizationStatus, retiredSurfaceOption.blockReason],
            };
        })(),
        {
            genericCanvasOption: [
                "blocked",
                "lesson15-stem-operation-requires-typed-lexical-authority",
            ],
            selected: {
                status: "authorized",
                operation: "yo-matrix",
                target: "tēuc-yo",
                connector: "not-applicable",
                authority: "user-supplied-lexical-analysis",
                derivation: "canonical-semantic-operation",
            },
            selectedPluralTarget: "tēuc-yō",
            selectedLBoundaryTargets: ["pil-lo", "pil-lō"],
            productivePrefix: ["authorized", "tē-cal"],
            poisonedTarget: [
                "blocked",
                "supplied-lesson15-target-stem-contradicts-canvas-operation",
                "tēuc-yo",
            ],
            exactTotec: ["authorized", "tēc", "exact-canvas-lexical-option"],
            wrongTotecContext: ["blocked", "lesson15-predicate-option-not-authorized-for-source-and-context"],
            spurious: ["blocked", "lesson15-predicate-option-not-authorized-for-source-and-context", "tēuc"],
            retiredSurfaceOption: ["blocked", "lesson15-predicate-option-not-authorized-for-source-and-context"],
        }
    );

    s.eq(
        "Lesson 15 yo matrix selects the source general-use embed before either target State",
        (() => {
            const build = (state, subject) => {
                const operationRecord =
                    ctx.buildClassicalNahuatlStemOperationRecord(
                        "tle-māi",
                        {
                            operation: "yo-matrix",
                            state,
                            subject,
                            nounClass: "tl",
                            useShape: "truncated-i",
                            subclass: "tl-2a",
                            stemFormation: "plain",
                            selectionAuthority:
                                "user-supplied-lexical-analysis",
                        }
                    );
                const sourceAuthority =
                    ctx.buildClassicalNahuatlNncSourceAuthorityFrame(
                        "tle-māi",
                        {
                            selectedState: state,
                            policySelectionAuthority:
                                "user-supplied-lexical-analysis",
                            lesson15StemOperationRecord: operationRecord,
                        }
                    );
                const lesson14 =
                    ctx.buildClassicalNahuatlClassGovernedNncFrame(
                        "tle-māi",
                        {
                            state,
                            subject,
                            possessor: "3sg",
                            nounClass: "tl",
                            classSelectionAuthority: "user-selection",
                            generalUseShape: "truncated",
                            ephemeralFinalVowel: "i",
                            tlSubclass: "2A",
                            animacy: "nonanimate",
                            nncSourceAuthorityFrame: sourceAuthority,
                        }
                    );
                const lesson15 =
                    ctx.buildClassicalNahuatlHigherNncFrame(lesson14);
                return {
                    operationStatus: operationRecord.authorizationStatus,
                    matrixEmbed: operationRecord.matrixEmbedStem,
                    target: operationRecord.targetStem,
                    resultStatus: lesson15.authorizationStatus,
                    formula: lesson15.formulaRealization,
                    actionEmbed:
                        lesson15.operationFrame?.appliedActions?.[0]
                            ?.matrixEmbedStem,
                };
            };
            const buildFinalATl2B = (stem) => {
                const operationRecord =
                    ctx.buildClassicalNahuatlStemOperationRecord(
                        stem,
                        {
                            operation: "yo-matrix",
                            state: "possessive",
                            subject: "3sg",
                            nounClass: "tl",
                            useShape: "truncated-a",
                            subclass: "tl-2b",
                            stemFormation: "plain",
                            selectionAuthority:
                                "user-supplied-lexical-analysis",
                        }
                    );
                return {
                    status: operationRecord.authorizationStatus,
                    matrixEmbed: operationRecord.matrixEmbedStem,
                    target: operationRecord.targetStem,
                };
            };
            const hostile =
                ctx.buildClassicalNahuatlStemOperationRecord(
                    "tle-māi",
                    {
                        operation: "yo-matrix",
                        targetStem: "tle-māi-yō",
                        state: "absolutive",
                        subject: "3common",
                        nounClass: "tl",
                        useShape: "truncated-i",
                        subclass: "tl-2a",
                        stemFormation: "plain",
                        selectionAuthority: "user-supplied-lexical-analysis",
                    }
                );
            return {
                absolutive: build("absolutive", "3common"),
                possessive: build("possessive", "3sg"),
                canvasFinalA: buildFinalATl2B("petla"),
                unlistedFinalA: buildFinalATl2B("zaxa"),
                hostile: [
                    hostile.authorizationStatus,
                    hostile.blockReason,
                    hostile.targetStem,
                ],
            };
        })(),
        {
            absolutive: {
                operationStatus: "authorized",
                matrixEmbed: "tle-mā",
                target: "tle-mā-yō",
                resultStatus: "authorized",
                formula: "#0-0(tle-mā-yō)tl-0#",
                actionEmbed: "tle-mā",
            },
            possessive: {
                operationStatus: "authorized",
                matrixEmbed: "tle-mā",
                target: "tle-mā-yo",
                resultStatus: "authorized",
                formula: "#0-0+ī-0(tle-mā-yo)0-0#",
                actionEmbed: "tle-mā",
            },
            canvasFinalA: {
                status: "authorized",
                matrixEmbed: "petla",
                target: "petla-yo",
            },
            unlistedFinalA: {
                status: "authorized",
                matrixEmbed: "zaxa",
                target: "zaxa-yo",
            },
            hostile: [
                "blocked",
                "supplied-lesson15-target-stem-contradicts-canvas-operation",
                "tle-mā-yō",
            ],
        }
    );

    s.eq(
        "Lesson 15 productively resolves stem-final voiceless w and n only before the possessive plural number dyad hu-ān",
        (() => {
            const eagle = ctx.buildClassicalNahuatlClassGovernedNncFrame("cuāuh", {
                state: "possessive", subject: "3pl", possessor: "1sg",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const mother = ctx.buildClassicalNahuatlClassGovernedNncFrame("nān", {
                state: "possessive", subject: "1pl", possessor: "1pl",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const nearby = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
                state: "possessive", subject: "3pl", possessor: "1sg",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const outputs = [eagle, mother, nearby].map((frame) => ctx.buildClassicalNahuatlHigherNncFrame(frame));
            return outputs.map((frame) => ({
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                actions: frame.operationFrame.appliedActions.map((action) => action.action),
            }));
        })(),
        [
            { status: "authorized", formula: "#0-0+n-o(cuā)hu-ān#", actions: ["delete-final-voiceless-w-before-possessive-plural-number-dyad"] },
            { status: "authorized", formula: "#ti-0+t-o(nā)hu-ān#", actions: ["assimilate-final-n-before-possessive-plural-number-dyad"] },
            { status: "authorized", formula: "#0-0+n-o(cal)hu-ān#", actions: [] },
        ]
    );

    s.eq(
        "Lesson 15 keeps lexical suppletion separate from productive boundary behavior",
        (() => {
            const operationRecord = ctx.buildClassicalNahuatlStemOperationRecord("tlācoh", {
                operation: "suppletive",
                targetStem: "tlāca",
                suppletiveConnector: "uh",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const sourceAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tlācoh", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: operationRecord,
            });
            const source = ctx.buildClassicalNahuatlClassGovernedNncFrame("tlācoh", {
                state: "possessive", subject: "1sg", possessor: "2sg",
                nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
                nncSourceAuthorityFrame: sourceAuthority,
            });
            const selected = ctx.buildClassicalNahuatlHigherNncFrame(source);
            const hostile = ctx.buildClassicalNahuatlHigherNncFrame(source, {
                suppletivePossessiveStem: "tlāca",
                suppletiveSingularConnector: "uh",
            });
            return {
                selectedStatus: selected.authorizationStatus,
                selectedFormula: selected.formulaRealization,
                selectedAction: selected.operationFrame.appliedActions[0].action,
                hostileReason: hostile.blockReason,
                examplesAreWhitelist: selected.operationFrame.lexicalExamplesAreRuleWhitelist,
                rejectedHistoricalOutput: selected.operationFrame.prohibitedDerivationRecords[0].rejectedOutput,
            };
        })(),
        {
            selectedStatus: "authorized",
            selectedFormula: "#ni-0+m-o(tlāca)uh-0#",
            selectedAction: "substitute-lexically-authorized-possessive-stem",
            hostileReason: "lesson15-stem-operation-requires-typed-source-record",
            examplesAreWhitelist: false,
            rejectedHistoricalOutput: "totēcuiyo",
        }
    );

    s.eq(
        "Lesson 15 secondary, analogical, and reclassification operations alter typed stems rather than formula text",
        (() => {
            const secondaryAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tah", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: ctx.buildClassicalNahuatlStemOperationRecord("tah", {
                    operation: "secondary-general-use",
                    targetStem: "tē-tah",
                    secondaryPossessorCarrier: "tē",
                    selectionAuthority: "user-supplied-lexical-analysis",
                }),
            });
            const analogicalAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("naca", {
                selectedState: "absolutive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: ctx.buildClassicalNahuatlStemOperationRecord("naca", {
                    operation: "analogical-restricted-use",
                    targetStem: "tla-naca",
                    selectionAuthority: "user-supplied-lexical-analysis",
                }),
            });
            const reclassificationAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("māi", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: ctx.buildClassicalNahuatlStemOperationRecord("māi", {
                    operation: "tl-2a-to-1a",
                    targetStem: "mā",
                    nounClass: "tl",
                    useShape: "truncated-i",
                    subclass: "tl-2a",
                    selectionAuthority: "user-selection",
                }),
            });
            const secondarySource = ctx.buildClassicalNahuatlClassGovernedNncFrame("tah", {
                state: "possessive", subject: "3sg", possessor: "3pl", thirdPluralPossessorNumberMorph: "n",
                nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
                nncSourceAuthorityFrame: secondaryAuthority,
            });
            const analogicalSource = ctx.buildClassicalNahuatlClassGovernedNncFrame("naca", {
                state: "absolutive", subject: "3common",
                nounClass: "tl", classSelectionAuthority: "user-selection",
                nncSourceAuthorityFrame: analogicalAuthority,
            });
            const reclassificationSource = ctx.buildClassicalNahuatlClassGovernedNncFrame("māi", {
                state: "possessive", subject: "3sg", possessor: "3sg",
                nounClass: "tl", classSelectionAuthority: "user-selection",
                generalUseShape: "truncated", ephemeralFinalVowel: "i", tlSubclass: "2A",
                nncSourceAuthorityFrame: reclassificationAuthority,
            });
            const outputs = [
                ctx.buildClassicalNahuatlHigherNncFrame(secondarySource),
                ctx.buildClassicalNahuatlHigherNncFrame(analogicalSource),
                ctx.buildClassicalNahuatlHigherNncFrame(reclassificationSource),
            ];
            return outputs.map((frame) => ({
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                stem: frame.nncSlotFrame.slots.predicate.stem,
                action: frame.operationFrame.appliedActions[0].action,
            }));
        })(),
        [
            { status: "authorized", formula: "#0-0+ī-n(tē-tah)0-0#", stem: "tē-tah", action: "downgrade-inner-possessive-predicate-to-general-use-stem" },
            { status: "authorized", formula: "#0-0(tla-naca)tl-0#", stem: "tla-naca", action: "downgrade-tla-possessive-predicate-to-restricted-use-stem" },
            { status: "authorized", formula: "#0-0+ī-0(mā)uh-0#", stem: "mā", action: "reclassify-tl-2a-as-tl-1a" },
        ]
    );

    s.eq(
        "Lesson 15 typed operation records exclude neighboring routes and preserve PDF-backed carrier length",
        (() => {
            const shortCarrier = ctx.buildClassicalNahuatlStemOperationRecord("tah", {
                operation: "secondary-general-use",
                targetStem: "te-tah",
                secondaryPossessorCarrier: "te",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const oneOperation = ctx.buildClassicalNahuatlStemOperationRecord("tlācoh", {
                operation: "suppletive",
                targetStem: "tlāca",
                suppletiveConnector: "uh",
                selectionAuthority: "user-supplied-lexical-analysis",
                analogicalRestrictedUseStem: "tla-POISON",
                formulaArtifact: "#POISON#",
            });
            const invalidSource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tlācoh", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: {
                    ...oneOperation,
                    sourceStem: "other",
                    formulaArtifact: "#POISON#",
                },
            });
            return {
                shortCarrierStatus: shortCarrier.authorizationStatus,
                shortCarrierReason: shortCarrier.blockReason,
                selectedOperation: oneOperation.operation,
                selectedTarget: oneOperation.targetStem,
                exactMacron: oneOperation.targetStem.includes("ā"),
                formulaAuthority: oneOperation.formulaStringAuthority,
                invalidSourceStatus: invalidSource.authorizationStatus,
                invalidSourceReason: invalidSource.blockReason,
            };
        })(),
        {
            shortCarrierStatus: "blocked",
            shortCarrierReason: "secondary-general-use-carrier-must-be-te-long-ti-or-t",
            selectedOperation: "suppletive",
            selectedTarget: "tlāca",
            exactMacron: true,
            formulaAuthority: false,
            invalidSourceStatus: "blocked",
            invalidSourceReason: "authorized-lesson15-stem-operation-record-required",
        }
    );

    s.eq(
        "Lesson 15 possessor reduplication duplicates the typed State dyad and keeps subject number separate",
        (() => {
            const selectedAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("pil", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15PossessorReduplicationSelection: ctx.buildClassicalNahuatlPossessorReduplicationSelection("pil", {
                    selected: true,
                    selectionAuthority: "user-selection",
                }),
            });
            const source = ctx.buildClassicalNahuatlClassGovernedNncFrame("pil", {
                state: "possessive", subject: "3pl", possessor: "1sg",
                nounClass: "tli", classSelectionAuthority: "user-selection",
                nncSourceAuthorityFrame: selectedAuthority,
            });
            const selected = ctx.buildClassicalNahuatlHigherNncFrame(source);
            const nearby = ctx.buildClassicalNahuatlClassGovernedNncFrame("pil", {
                state: "possessive", subject: "3sg", possessor: "1sg",
                nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
                nncSourceAuthorityFrame: selectedAuthority,
            });
            const hostile = ctx.buildClassicalNahuatlHigherNncFrame(nearby);
            return {
                formula: selected.formulaRealization,
                arity: selected.nncSlotFrame.slots.state.arity,
                slots: selected.nncSlotFrame.slots.state.slots.map((slot) => `${slot.role}:${slot.carrier}`),
                subjectNumber: selected.nncSlotFrame.subjectNumber,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            formula: "#0-0+n-o-n-o(pil)hu-ān#",
            arity: "reduplicated-dyadic",
            slots: ["st1:n", "st2:o", "st1:n", "st2:o"],
            subjectNumber: "plural",
            hostileReason: "possessor-reduplication-requires-dyadic-possessive-plural-subject",
        }
    );

    s.eq(
        "Lesson 15 permits a derived nonanimate possessive stem with common grammatical number",
        (() => {
            const source = ctx.buildClassicalNahuatlClassGovernedNncFrame("chān", {
                state: "possessive", subject: "3common", possessor: "3pl", thirdPluralPossessorNumberMorph: "n",
                nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
                stemFormation: "distributive", derivedStem: "chah-chān",
            });
            const frame = ctx.buildClassicalNahuatlHigherNncFrame(source, { animacy: "nonanimate" });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                relation: frame.nncSlotFrame.lesson15DerivedNonanimateReading,
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0+ī-n(chah-chān)0-0#",
            relation: {
                active: true,
                subjectNumber: "common",
                EnglishPluralTranslationDoesNotChangeGrammarNumber: true,
            },
        }
    );

    s.eq(
        "Lesson 15 enforces natural-possession State restrictions but permits an explicit metaphorical override",
        (() => {
            const absolute = ctx.buildClassicalNahuatlClassGovernedNncFrame("chān", {
                state: "absolutive", subject: "3common",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const possessive = ctx.buildClassicalNahuatlClassGovernedNncFrame("tōnati", {
                state: "possessive", subject: "3sg", possessor: "1sg",
                nounClass: "tl", classSelectionAuthority: "user-selection", tlSubclass: "1A",
            });
            const naturalBlocked = ctx.buildClassicalNahuatlHigherNncFrame(absolute, { naturalPossessionPolicy: "naturally-possessed" });
            const neverBlocked = ctx.buildClassicalNahuatlHigherNncFrame(possessive, { naturalPossessionPolicy: "never-possessive" });
            const metaphor = ctx.buildClassicalNahuatlHigherNncFrame(possessive, {
                naturalPossessionPolicy: "never-possessive", metaphoricalOverride: true,
            });
            return {
                naturalReason: naturalBlocked.blockReason,
                neverReason: neverBlocked.blockReason,
                metaphorStatus: metaphor.authorizationStatus,
                possessorRole: metaphor.nncSlotFrame.slots.state.nuclearPossessorRole,
            };
        })(),
        {
            naturalReason: "naturally-possessed-nounstem-requires-possessive-state",
            neverReason: "nounstem-never-possessive-without-metaphorical-override",
            metaphorStatus: "authorized",
            possessorRole: "nuclear-basic-possessor",
        }
    );

    s.eq(
        "Lesson 15 hands one typed NNC to sentence authority without pretending its formula is sentence authority",
        (() => {
            const source = ctx.buildClassicalNahuatlClassGovernedNncFrame("tīci", {
                state: "absolutive", subject: "1sg",
                nounClass: "tl", classSelectionAuthority: "user-selection",
            });
            const frame = ctx.buildClassicalNahuatlHigherNncFrame(source, {
                sentenceType: "wish", polarity: "negative", predicateKind: "equative",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                sentenceStatus: frame.sentenceHandoffFrame.authorizationStatus,
                sentenceType: frame.sentenceHandoffFrame.sentenceType,
                polarity: frame.sentenceHandoffFrame.polarity,
                consumedNncStatus: frame.sentenceHandoffFrame.consumedNncStatus,
                compositionOperation: frame.sentenceHandoffFrame.sentenceCompositionOperationId,
                formulaIsSentenceAuthority: frame.sentenceHandoffFrame.nncFormulaIsSentenceAuthority,
                sentenceSurfaceRealizedHere: frame.sentenceHandoffFrame.sentenceSurfaceRealizedHere,
                definitenessAmbiguous: frame.sentenceHandoffFrame.definitenessRemainsAmbiguous,
            };
        })(),
        {
            status: "authorized",
            formula: "#ni-0(tīci)tl-0#",
            sentenceStatus: "authorized",
            sentenceType: "wish",
            polarity: "negative",
            consumedNncStatus: "complete",
            compositionOperation: "nnc-sentence-composition",
            formulaIsSentenceAuthority: false,
            sentenceSurfaceRealizedHere: false,
            definitenessAmbiguous: true,
        }
    );

    s.eq(
        "Lesson 15 tl 2-A to 1-A reclassification follows typed source structure and recomputes each connector",
        (() => {
            const build = (state, subject) => {
                const operationRecord = ctx.buildClassicalNahuatlStemOperationRecord("māi", {
                    operation: "tl-2a-to-1a",
                    nounClass: "tl",
                    useShape: "truncated-i",
                    subclass: "tl-2a",
                    selectionAuthority: "user-selection",
                });
                const sourceAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("māi", {
                    selectedState: state,
                    policySelectionAuthority: "user-supplied-lexical-analysis",
                    lesson15StemOperationRecord: operationRecord,
                });
                const lesson14 = ctx.buildClassicalNahuatlClassGovernedNncFrame("māi", {
                    state,
                    subject,
                    possessor: "3sg",
                    nounClass: "tl",
                    classSelectionAuthority: "user-selection",
                    generalUseShape: "truncated",
                    ephemeralFinalVowel: "i",
                    tlSubclass: "2A",
                    nncSourceAuthorityFrame: sourceAuthority,
                    animacy: state === "absolutive" ? "nonanimate" : "animate",
                });
                const lesson15 = ctx.buildClassicalNahuatlHigherNncFrame(lesson14);
                return {
                    status: lesson15.authorizationStatus,
                    formula: lesson15.formulaRealization,
                    predicate: lesson15.nncSlotFrame?.slots?.predicate?.stem,
                    number: lesson15.nncSlotFrame?.slots?.number,
                    action: lesson15.operationFrame?.appliedActions?.[0]?.action,
                    crossLessonContract:
                        lesson15.lessons12To15GrammarSurfaceContractFrame
                            ?.authorizationStatus,
                };
            };
            const untyped = ctx.buildClassicalNahuatlStemOperationRecord("māi", {
                operation: "tl-2a-to-1a",
                selectionAuthority: "user-selection",
            });
            const paradigm = ctx.buildClassicalNncParadigmFrame({
                basalUnit: "nnc",
                stem: "māi",
                nncType: "ordinary",
                nncState: "absolutive",
                nncPredicateOptionId: "tl-2a-to-1a",
                nncPossessor: "3sg",
                nncAnimacy: "nonanimate",
                sentenceSurfaceMode: "statement",
                sentenceNegativeMode: "positive",
            });
            return {
                absolutive: build("absolutive", "3common"),
                possessiveSingular: build("possessive", "3sg"),
                possessivePlural: build("possessive", "3pl"),
                untyped: [untyped.authorizationStatus, untyped.blockReason],
                optionContexts: [
                    { state: "absolutive", subject: "3common" },
                    { state: "possessive", subject: "3pl" },
                ].map((context) => (
                    ctx.getClassicalNahuatlPredicateOptionContract("māi", {
                        ...context,
                        nounClass: "tl",
                        useShape: "truncated-i",
                        subclass: "tl-2a",
                    }).optionIds.includes("tl-2a-to-1a")
                )),
                paradigm: {
                    status: paradigm.authorizationStatus,
                    stateCounts: ["absolutive", "possessive"].map((selectedState) => (
                        paradigm.rows.filter((row) => row.state.nncState === selectedState).length
                    )),
                    everyRowReclassified: paradigm.rows.every((row) => (
                        row.typedSlotFrame?.lesson15ReclassifiedNounClass?.toSubclass === "1A"
                    )),
                    hasFathom: paradigm.rows.some((row) => (
                        row.formula === "#0-0(mā)tl-0#" && row.surface === "Mātl."
                    )),
                },
            };
        })(),
        {
            absolutive: {
                status: "authorized",
                formula: "#0-0(mā)tl-0#",
                predicate: "mā",
                number: {
                    num1: "tl",
                    num2: "0",
                    belongsTo: "subject-personal-pronoun",
                },
                action: "reclassify-tl-2a-as-tl-1a",
                crossLessonContract: "authorized",
            },
            possessiveSingular: {
                status: "authorized",
                formula: "#0-0+ī-0(mā)uh-0#",
                predicate: "mā",
                number: {
                    num1: "uh",
                    num2: "0",
                    belongsTo: "subject-personal-pronoun",
                },
                action: "reclassify-tl-2a-as-tl-1a",
                crossLessonContract: "authorized",
            },
            possessivePlural: {
                status: "authorized",
                formula: "#0-0+ī-0(mā)hu-ān#",
                predicate: "mā",
                number: {
                    num1: "hu",
                    num2: "ān",
                    belongsTo: "subject-personal-pronoun",
                },
                action: "reclassify-tl-2a-as-tl-1a",
                crossLessonContract: "authorized",
            },
            untyped: [
                "blocked",
                "tl-2a-to-1a-reclassification-requires-typed-tl-2a-source-analysis",
            ],
            optionContexts: [true, true],
            paradigm: {
                status: "authorized",
                stateCounts: [3, 24],
                everyRowReclassified: true,
                hasFathom: true,
            },
        }
    );

    s.eq(
        "Lesson 15.1.7 preserves the typed 2-A source, ephemeral i loss, 1-A target, semantic and construction alternatives, and State-specific connectors",
        (() => {
            const registry = ctx.getDefaultGrammarContractRegistry();
            const build = (state, subject) => {
                const operationRecord =
                    ctx.buildClassicalNahuatlStemOperationRecord("māi", {
                        operation: "tl-2a-to-1a",
                        nounClass: "tl",
                        useShape: "truncated-i",
                        subclass: "tl-2a",
                        selectionAuthority: "user-selection",
                    });
                const sourceAuthority =
                    ctx.buildClassicalNahuatlNncSourceAuthorityFrame("māi", {
                        selectedState: state,
                        policySelectionAuthority: "user-supplied-lexical-analysis",
                        lesson15StemOperationRecord: operationRecord,
                    });
                const lesson14 =
                    ctx.buildClassicalNahuatlClassGovernedNncFrame("māi", {
                        state,
                        subject,
                        possessor: "3sg",
                        nounClass: "tl",
                        classSelectionAuthority: "user-selection",
                        generalUseShape: "truncated",
                        ephemeralFinalVowel: "i",
                        tlSubclass: "2A",
                        animacy: "nonanimate",
                        nncSourceAuthorityFrame: sourceAuthority,
                    });
                return ctx.buildClassicalNahuatlHigherNncFrame(lesson14);
            };
            const frames = [
                build("absolutive", "3common"),
                build("possessive", "3sg"),
                build("possessive", "3pl"),
            ];
            const contracts = frames.map(
                (frame) => frame.reclassificationContractFrame
            );
            const poison = (mutate) => {
                const forged = JSON.parse(JSON.stringify(contracts[0]));
                mutate(forged);
                return ctx.inspectRegisteredGrammarContract(registry, forged).status;
            };
            const lcm = contracts[0].leastCommonMultiple;
            return {
                exportedBuilder:
                    typeof ctx.buildClassicalNahuatlReclassificationContractFrame,
                contractStatuses: contracts.map((contract) => [
                    contract.authorizationStatus,
                    ctx.inspectRegisteredGrammarContract(registry, contract).status,
                ]),
                gcd: {
                    identity: contracts[0].greatestCommonDivisor.identityId,
                    input: contracts[0].greatestCommonDivisor.inputKind,
                    operation: contracts[0].greatestCommonDivisor.operationKind,
                    output: contracts[0].greatestCommonDivisor.outputKind,
                    connectorRecomputation:
                        contracts[0].greatestCommonDivisor
                            .connectorRecomputationRequired,
                },
                axes: lcm.distinctionAxes,
                inventories: {
                    source: lcm.sourceAnalysisInventory.map(
                        (entry) => [
                            entry.nounClass,
                            entry.subclass,
                            entry.generalUseShape,
                            entry.finalSegmentStatus,
                        ]
                    ),
                    loss: lcm.ephemeralILossInventory.map(
                        (entry) => [entry.inputEnding, entry.operation]
                    ),
                    target: lcm.targetClassInventory.map(
                        (entry) => [
                            entry.nounClass,
                            entry.subclass,
                            entry.connectorSelection,
                        ]
                    ),
                    semantics: lcm.semanticOutcomeInventory.map(
                        (entry) => [entry.identity, entry.meaningRelation]
                    ),
                    constructions: lcm.constructionEnvironmentInventory.map(
                        (entry) => [entry.identity, entry.position]
                    ),
                    states: lcm.targetStateInventory.map(
                        (entry) => [entry.state, entry.connectorRule]
                    ),
                },
                selected: frames.map((frame, index) => {
                    const coordinate =
                        contracts[index].leastCommonMultiple.selectedCoordinate;
                    return {
                        state: coordinate.selectedState,
                        source: [
                            coordinate.sourceStem,
                            coordinate.sourceSubclass,
                        ],
                        target: [
                            coordinate.targetStem,
                            coordinate.targetSubclass,
                        ],
                        number: coordinate.selectedNumberDyad,
                        semanticOutcome: coordinate.semanticOutcome,
                        constructionEnvironment:
                            coordinate.constructionEnvironment,
                        formula: frame.formulaRealization,
                        ordinaryContract:
                            ctx.inspectRegisteredGrammarContract(
                                registry,
                                frame.ordinaryNncContractFrame
                            ).status,
                        grammarContract:
                            ctx.inspectRegisteredGrammarContract(
                                registry,
                                frame.lessons12To15GrammarSurfaceContractFrame
                            ).status,
                    };
                }),
                examplesAreWhitelist:
                    contracts[0].lexicalExamplesAreRuleWhitelist,
                poisoned: [
                    poison((forged) => {
                        forged.leastCommonMultiple.selectedCoordinate
                            .deletedSegmentStatus = "phonologically-predictable";
                    }),
                    poison((forged) => {
                        forged.leastCommonMultiple.selectedCoordinate
                            .targetSubclass = "tl-2a";
                    }),
                    poison((forged) => {
                        forged.greatestCommonDivisor
                            .connectorRecomputationRequired = false;
                    }),
                    poison((forged) => {
                        forged.semanticOutcomeIsGenerated = true;
                    }),
                ],
            };
        })(),
        {
            exportedBuilder: "function",
            contractStatuses: [
                ["authorized", "valid"],
                ["authorized", "valid"],
                ["authorized", "valid"],
            ],
            gcd: {
                identity: "lesson15.1.7:tl-2a-to-tl-1a-reclassification",
                input: "typed-tl-2a-nounstem-with-truncated-i-general-use-shape",
                operation:
                    "delete-lexically-ephemeral-final-i-and-reclassify-subclass",
                output: "typed-tl-1a-nounstem",
                connectorRecomputation: true,
            },
            axes: [
                "source-analysis",
                "ephemeral-i-loss",
                "target-class",
                "semantic-outcome",
                "construction-environment",
                "target-state-reentry",
            ],
            inventories: {
                source: [["tl", "tl-2a", "truncated-i", "lexically-ephemeral"]],
                loss: [["i", "delete-final-segment"]],
                target: [
                    ["tl", "tl-1a", "recompute-from-target-class-and-state"],
                ],
                semantics: [
                    ["meaning-shift", "new-lexical-meaning"],
                    ["stylistic-no-meaning-shift", "same-lexical-meaning"],
                ],
                constructions: [
                    ["standalone-nounstem", "predicate-nounstem"],
                    ["compound-constituent", "inside-compound-nounstem"],
                ],
                states: [
                    ["absolutive", "tl-1a-absolutive"],
                    ["possessive", "tl-1a-possessive"],
                ],
            },
            selected: [{
                state: "absolutive",
                source: ["māi", "tl-2a"],
                target: ["mā", "tl-1a"],
                number: { num1: "tl", num2: "0" },
                semanticOutcome: "lexically-undetermined",
                constructionEnvironment: "not-selected-by-reclassification",
                formula: "#0-0(mā)tl-0#",
                ordinaryContract: "valid",
                grammarContract: "valid",
            }, {
                state: "possessive",
                source: ["māi", "tl-2a"],
                target: ["mā", "tl-1a"],
                number: { num1: "uh", num2: "0" },
                semanticOutcome: "lexically-undetermined",
                constructionEnvironment: "not-selected-by-reclassification",
                formula: "#0-0+ī-0(mā)uh-0#",
                ordinaryContract: "valid",
                grammarContract: "valid",
            }, {
                state: "possessive",
                source: ["māi", "tl-2a"],
                target: ["mā", "tl-1a"],
                number: { num1: "hu", num2: "ān" },
                semanticOutcome: "lexically-undetermined",
                constructionEnvironment: "not-selected-by-reclassification",
                formula: "#0-0+ī-0(mā)hu-ān#",
                ordinaryContract: "valid",
                grammarContract: "valid",
            }],
            examplesAreWhitelist: false,
            poisoned: ["invalid", "invalid", "invalid", "invalid"],
        }
    );

    s.eq(
        "Lesson 15.1.6 preserves the tla possessive predicate, rank transition, two use stems, both target states, and source disposition alternatives",
        (() => {
            const registry = ctx.getDefaultGrammarContractRegistry();
            const build = (state) => {
                const operationRecord =
                    ctx.buildClassicalNahuatlStemOperationRecord("māi", {
                        operation: "analogical-restricted-use",
                        nounClass: "tl",
                        useShape: "truncated-i",
                        subclass: "tl-2a",
                        selectionAuthority: "user-supplied-lexical-analysis",
                    });
                const sourceAuthority =
                    ctx.buildClassicalNahuatlNncSourceAuthorityFrame("māi", {
                        selectedState: state,
                        policySelectionAuthority: "user-supplied-lexical-analysis",
                        lesson15StemOperationRecord: operationRecord,
                    });
                const lesson14 =
                    ctx.buildClassicalNahuatlClassGovernedNncFrame("māi", {
                        state,
                        subject: "3common",
                        possessor: "3sg",
                        nounClass: "tl",
                        classSelectionAuthority: "user-selection",
                        generalUseShape: "truncated",
                        ephemeralFinalVowel: "i",
                        tlSubclass: "2A",
                        animacy: "nonanimate",
                        nncSourceAuthorityFrame: sourceAuthority,
                    });
                return ctx.buildClassicalNahuatlHigherNncFrame(lesson14);
            };
            const frames = [build("absolutive"), build("possessive")];
            const contracts = frames.map(
                (frame) => frame.analogicalRestrictedUseContractFrame
            );
            const poison = (mutate) => {
                const forged = JSON.parse(JSON.stringify(contracts[0]));
                mutate(forged);
                return ctx.inspectRegisteredGrammarContract(registry, forged).status;
            };
            const lcm = contracts[0].leastCommonMultiple;
            return {
                exportedBuilder:
                    typeof ctx.buildClassicalNahuatlAnalogicalRestrictedUseContractFrame,
                contractStatuses: contracts.map((contract) => [
                    contract.authorizationStatus,
                    ctx.inspectRegisteredGrammarContract(registry, contract).status,
                ]),
                gcd: {
                    identity: contracts[0].greatestCommonDivisor.identityId,
                    input: contracts[0].greatestCommonDivisor.inputKind,
                    output: contracts[0].greatestCommonDivisor.outputKind,
                    possessor: contracts[0].greatestCommonDivisor.sourcePossessorPronoun,
                    rankDespiteSameSurface:
                        contracts[0].greatestCommonDivisor
                            .surfaceIdentityDoesNotCollapseRank,
                },
                axes: lcm.distinctionAxes,
                inventories: {
                    sourcePredicate: lcm.sourcePredicateInventory.map(
                        (entry) => [
                            entry.state,
                            entry.possessorPronoun,
                            entry.predicateStemKind,
                        ]
                    ),
                    rank: lcm.rankTransitionInventory.map(
                        (entry) => [entry.inputRank, entry.outputRank]
                    ),
                    useStems: lcm.derivedUseStemInventory.map(
                        (entry) => [entry.stemKind, entry.formation]
                    ),
                    targetStates: lcm.targetStateInventory.map(
                        (entry) => [entry.state, entry.selectedUseStemKind]
                    ),
                    sourceDisposition: lcm.sourceDispositionInventory.map(
                        (entry) => [
                            entry.identity,
                            entry.sourceAbsolutiveRemainsAvailable,
                        ]
                    ),
                },
                states: frames.map((frame, index) => {
                    const selected =
                        contracts[index].leastCommonMultiple.selectedCoordinate;
                    return {
                        state: selected.selectedState,
                        sourcePair: [
                            selected.sourceRestrictedUseStem,
                            selected.sourceGeneralUseStem,
                        ],
                        sourcePredicate: selected.sourcePossessivePredicateStem,
                        targetPair: [
                            selected.derivedRestrictedUseStem,
                            selected.derivedGeneralUseStem,
                        ],
                        selectedUse: selected.selectedUseStemKind,
                        selectedStem: selected.selectedPredicateStemAfterOuterBoundary,
                        disposition: selected.sourceStemDisposition,
                        dispositionAuthority:
                            selected.sourceStemDispositionAuthority,
                        formula: frame.formulaRealization,
                        ordinaryContract:
                            ctx.inspectRegisteredGrammarContract(
                                registry,
                                frame.ordinaryNncContractFrame
                            ).status,
                        grammarContract:
                            ctx.inspectRegisteredGrammarContract(
                                registry,
                                frame.lessons12To15GrammarSurfaceContractFrame
                            ).status,
                    };
                }),
                examplesAreWhitelist:
                    contracts[0].lexicalExamplesAreRuleWhitelist,
                poisoned: [
                    poison((forged) => {
                        forged.leastCommonMultiple.selectedCoordinate
                            .sourcePossessivePredicateStem = "tla-māi";
                    }),
                    poison((forged) => {
                        forged.leastCommonMultiple.selectedCoordinate
                            .selectedUseStemKind = "general-use";
                    }),
                    poison((forged) => {
                        forged.greatestCommonDivisor
                            .surfaceIdentityDoesNotCollapseRank = false;
                    }),
                    poison((forged) => {
                        forged.sourceDispositionIsGenerated = true;
                    }),
                ],
            };
        })(),
        {
            exportedBuilder: "function",
            contractStatuses: [
                ["authorized", "valid"],
                ["authorized", "valid"],
            ],
            gcd: {
                identity:
                    "lesson15.1.6:tla-possessive-predicate-to-restricted-use-stem",
                input: "lexically-authorized-possessive-state-predicate",
                output: "derived-restricted-use-nounstem-with-general-use-stem",
                possessor: "tla",
                rankDespiteSameSurface: true,
            },
            axes: [
                "source-possessive-predicate",
                "rank-transition",
                "derived-use-stem-lifecycle",
                "target-state-reentry",
                "source-stem-disposition",
            ],
            inventories: {
                sourcePredicate: [
                    ["possessive", "tla", "source-general-use-stem"],
                ],
                rank: [
                    ["possessive-state-predicate", "restricted-use-stem"],
                ],
                useStems: [
                    ["restricted-use", "tla-plus-source-restricted-use-stem"],
                    ["general-use", "tla-plus-source-general-use-stem"],
                ],
                targetStates: [
                    ["absolutive", "restricted-use"],
                    ["possessive", "general-use"],
                ],
                sourceDisposition: [
                    ["coexisting-analogical-derivative", true],
                    ["derived-stem-replaces-source-in-absolutive", false],
                ],
            },
            states: [{
                state: "absolutive",
                sourcePair: ["māi", "mā"],
                sourcePredicate: "tla-mā",
                targetPair: ["tla-māi", "tla-mā"],
                selectedUse: "restricted-use",
                selectedStem: "tla-māi",
                disposition: "lexically-undetermined",
                dispositionAuthority: "lexical-not-generated",
                formula: "#0-0(tla-māi)tl-0#",
                ordinaryContract: "valid",
                grammarContract: "valid",
            }, {
                state: "possessive",
                sourcePair: ["māi", "mā"],
                sourcePredicate: "tla-mā",
                targetPair: ["tla-māi", "tla-mā"],
                selectedUse: "general-use",
                selectedStem: "tla-mā",
                disposition: "lexically-undetermined",
                dispositionAuthority: "lexical-not-generated",
                formula: "#0-0+ī-0(tla-mā)0-0#",
                ordinaryContract: "valid",
                grammarContract: "valid",
            }],
            examplesAreWhitelist: false,
            poisoned: ["invalid", "invalid", "invalid", "invalid"],
        }
    );

    s.eq(
        "Lesson 15 preserves one ordinary-NNC GCD and every Canvas distinction in a registered LCM coordinate",
        (() => {
            const operationRecord = ctx.buildClassicalNahuatlStemOperationRecord("māi", {
                operation: "tl-2a-to-1a",
                nounClass: "tl",
                useShape: "truncated-i",
                subclass: "tl-2a",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const sourceAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("māi", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: operationRecord,
            });
            const lesson14 = ctx.buildClassicalNahuatlClassGovernedNncFrame("māi", {
                state: "possessive",
                subject: "3sg",
                possessor: "3sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "i",
                tlSubclass: "2A",
                nncSourceAuthorityFrame: sourceAuthority,
            });
            const frame = ctx.buildClassicalNahuatlHigherNncFrame(lesson14, {
                sentenceType: "wish",
                polarity: "negative",
                predicateKind: "equative",
                sentenceModifier: "aya",
            });
            const contract = frame.ordinaryNncContractFrame;
            const registry = ctx.getDefaultGrammarContractRegistry();
            const poison = (mutate) => {
                const forged = JSON.parse(JSON.stringify(contract));
                mutate(forged);
                return ctx.inspectRegisteredGrammarContract(registry, forged).status;
            };
            const modifierStatuses = ["none", "zan", "oc", "ahzo", "aya", "poison"]
                .map((sentenceModifier) => ctx.buildClassicalNahuatlHigherNncFrame(
                    lesson14,
                    { sentenceType: "assertion", sentenceModifier }
                ))
                .map((candidate) => [candidate.authorizationStatus, candidate.blockReason]);
            const selected = contract.leastCommonMultiple.selectedCoordinate;
            return {
                exportedBuilder:
                    typeof ctx.buildClassicalNahuatlOrdinaryNncContractFrame,
                contractStatus:
                    ctx.inspectRegisteredGrammarContract(registry, contract).status,
                gcd: contract.greatestCommonDivisor,
                axes: contract.leastCommonMultiple.distinctionAxes,
                inventoryCounts: [
                    contract.leastCommonMultiple.stemOperationInventory.length,
                    contract.leastCommonMultiple.possessivePluralBoundaryInventory.length,
                    contract.leastCommonMultiple.yoMatrixAllomorphInventory.length,
                    contract.leastCommonMultiple.derivedNonanimateInventory.length,
                    contract.leastCommonMultiple.possessorReduplicationInventory.length,
                    contract.leastCommonMultiple.secondaryPossessorCarrierInventory.length,
                    contract.leastCommonMultiple.analogicalSourcePredicateInventory.length,
                    contract.leastCommonMultiple.analogicalRankTransitionInventory.length,
                    contract.leastCommonMultiple.analogicalDerivedUseStemInventory.length,
                    contract.leastCommonMultiple.analogicalTargetStateInventory.length,
                    contract.leastCommonMultiple.analogicalSourceDispositionInventory.length,
                    contract.leastCommonMultiple.reclassificationSourceAnalysisInventory.length,
                    contract.leastCommonMultiple.reclassificationEphemeralILossInventory.length,
                    contract.leastCommonMultiple.reclassificationTargetClassInventory.length,
                    contract.leastCommonMultiple.reclassificationSemanticOutcomeInventory.length,
                    contract.leastCommonMultiple.reclassificationConstructionEnvironmentInventory.length,
                    contract.leastCommonMultiple.reclassificationTargetStateInventory.length,
                    contract.leastCommonMultiple.possessorRoleInventory.length,
                    contract.leastCommonMultiple.naturalPossessionPolicyInventory.length,
                    contract.leastCommonMultiple.naturalPossessionSemanticInventory.length,
                    contract.leastCommonMultiple.sentenceCompositionScopeInventory.length,
                    contract.leastCommonMultiple.predicateKindInventory.length,
                    contract.leastCommonMultiple.sentenceForceInventory.length,
                    contract.leastCommonMultiple.polarityInventory.length,
                    contract.leastCommonMultiple.sentenceModifierInventory.length,
                    contract.leastCommonMultiple.interpretationInventory.length,
                ],
                selected: {
                    coordinateId: selected.coordinateId,
                    sourceLesson14Coordinate: selected.sourceLesson14CoordinateId,
                    stemOperation: selected.stemOperation,
                    sourceStem: selected.sourceStem,
                    predicateStem: selected.selectedPredicateStem,
                    derivation: selected.stemOperationRecord.targetStemDerivation,
                    canvasOptionAuthority:
                        selected.stemOperationRecord.canvasPredicateOptionIsGrammarAuthority,
                    sentenceScope: selected.sentenceCompositionScope,
                    sentenceForce: selected.sentenceForce,
                    polarity: selected.polarity,
                    modifier: selected.sentenceModifier,
                    formula: selected.formulaRealization,
                },
                finalNAlternatives:
                    contract.leastCommonMultiple.possessivePluralBoundaryInventory
                        .find((entry) => entry.identity === "final-n-before-hu-an")
                        .spellingAlternatives,
                modifierStatuses,
                poisoned: [
                    poison((forged) => {
                        forged.greatestCommonDivisor.tensePosition = "present";
                    }),
                    poison((forged) => {
                        forged.leastCommonMultiple.distinctionAxes[0] = "display-text";
                    }),
                    poison((forged) => {
                        forged.leastCommonMultiple.stemOperationInventory[1]
                            .lexicalSelectionRequired = false;
                    }),
                    poison((forged) => {
                        forged.leastCommonMultiple.yoMatrixAllomorphInventory[0]
                            .state = "possessive";
                    }),
                    poison((forged) => {
                        forged.leastCommonMultiple.selectedCoordinate
                            .stemOperationRecord.canvasPredicateOptionIsGrammarAuthority = true;
                    }),
                    poison((forged) => {
                        forged.leastCommonMultiple.selectedCoordinate
                            .sourceLesson14CoordinateId = "";
                    }),
                ],
            };
        })(),
        {
            exportedBuilder: "function",
            contractStatus: "valid",
            gcd: {
                identityId: "lesson15:ordinary-nnc-conditions",
                operationKind:
                    "apply-ordinary-nnc-conditions-to-complete-class-governed-nnc",
                inputKind: "complete-lesson14-class-governed-nnc",
                outputKind:
                    "one-conditioned-ordinary-nnc-with-optional-sentence-handoff",
                formulaSchemaChanged: false,
                predicateStemRemainsSingleSlot: true,
                numberBelongsTo: "subject-personal-pronoun",
                possessorBelongsTo: "state",
                basicPossessorLocation: "inside-nnc-nucleus",
                supplementaryPossessorLocation: "outside-nnc-nucleus",
                tensePosition: "absent",
                prerequisiteOperations: [
                    "nnc-clause-shell",
                    "nnc-absolutive-state-or-possessive-state",
                    "nnc-nounstem-selection",
                ],
            },
            axes: [
                "stem-operation",
                "possessive-plural-boundary",
                "yo-matrix-allomorph",
                "derived-nonanimate-relation",
                "possessor-reduplication",
                "secondary-possessor-carrier",
                "analogical-source-predicate",
                "analogical-rank-transition",
                "analogical-use-stem-lifecycle",
                "analogical-state-reentry",
                "analogical-source-disposition",
                "reclassification-source-analysis",
                "reclassification-ephemeral-i-loss",
                "reclassification-target-class",
                "reclassification-semantic-outcome",
                "reclassification-construction-environment",
                "reclassification-state-reentry",
                "possessor-role",
                "natural-possession-policy",
                "natural-possession-semantics",
                "state-availability-and-metaphorical-override",
                "sentence-composition-scope",
                "sentence-predicate-kind",
                "sentence-force",
                "sentence-polarity",
                "sentence-modifier",
                "contextual-interpretation",
            ],
            inventoryCounts: [6, 3, 6, 3, 2, 3, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 3, 5, 2, 3, 5, 2, 5, 5],
            selected: {
                coordinateId:
                    "tl-2a-to-1a:no-special-boundary-action:single-dyadic:ordinary:sentence-composition-requested:wish:equative:negative:aya",
                sourceLesson14Coordinate:
                    "possessive:3sg:tl:tl-2a:general-use:truncated:plain:possessive-singular-common-zero:current-typed-slots",
                stemOperation: "tl-2a-to-1a",
                sourceStem: "māi",
                predicateStem: "mā",
                derivation: "canonical-semantic-operation",
                canvasOptionAuthority: false,
                sentenceScope: "sentence-composition-requested",
                sentenceForce: "wish",
                polarity: "negative",
                modifier: "aya",
                formula: "#0-0+ī-0(mā)uh-0#",
            },
            finalNAlternatives: ["assimilated-without-n", "retained-n"],
            modifierStatuses: [
                ["authorized", ""],
                ["authorized", ""],
                ["authorized", ""],
                ["authorized", ""],
                ["authorized", ""],
                ["blocked", "unknown-lesson15-sentence-modifier"],
            ],
            poisoned: ["invalid", "invalid", "invalid", "invalid", "invalid", "invalid"],
        }
    );

    s.eq(
        "Lessons 12 through 15 compose one registered Grammar-surface GCD and complete qualified LCM",
        (() => {
            const registry = ctx.getDefaultGrammarContractRegistry();
            const absolutiveLesson14 =
                ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
                    state: "absolutive",
                    subject: "3common",
                    nounClass: "tli",
                    classSelectionAuthority: "user-selection",
                    animacy: "nonanimate",
                });
            const possessiveLesson14 =
                ctx.buildClassicalNahuatlClassGovernedNncFrame("pah", {
                    state: "possessive",
                    subject: "2pl",
                    possessor: "2sg",
                    nounClass: "tli",
                    classSelectionAuthority: "user-selection",
                    generalUseShape: "base",
                    tliSubclass: "1",
                    pluralConnector: "m-eh",
                    pluralSelectionAuthority: "user-selection",
                    animacy: "animate",
                });
            const contracts = [
                ctx.buildClassicalNahuatlHigherNncFrame(
                    absolutiveLesson14,
                    { animacy: "nonanimate" }
                ).lessons12To15GrammarSurfaceContractFrame,
                ctx.buildClassicalNahuatlHigherNncFrame(
                    possessiveLesson14,
                    { animacy: "animate" }
                ).lessons12To15GrammarSurfaceContractFrame,
            ];
            const poison = (contract, mutate) => {
                const forged = JSON.parse(JSON.stringify(contract));
                mutate(forged);
                return ctx.inspectRegisteredGrammarContract(registry, forged).status;
            };
            const absolutive = contracts[0];
            return {
                exportedBuilder:
                    typeof ctx.buildClassicalNahuatlGrammarSurfaceContractFrame,
                statuses: contracts.map((contract) => (
                    ctx.inspectRegisteredGrammarContract(registry, contract).status
                )),
                gcd: absolutive.greatestCommonDivisor,
                lessonAxisCounts:
                    absolutive.leastCommonMultiple.lessonAxisInventory
                        .map((lesson) => [lesson.lesson, lesson.distinctionAxes.length]),
                qualifiedAxisCount:
                    absolutive.leastCommonMultiple.qualifiedAxisInventory.length,
                semanticGroupCounts:
                    absolutive.leastCommonMultiple.semanticGroupInventory
                        .map((group) => [group.groupId, group.axisIds.length]),
                sourceEvidenceBoundary: absolutive.sourceEvidenceBoundary,
                sourceClosurePresent:
                    Object.prototype.hasOwnProperty.call(
                        absolutive,
                        "sourceClosureFrame"
                    ),
                branches:
                    contracts.map((contract) => (
                        contract.leastCommonMultiple.selectedCoordinate.activeStateBranch
                    )),
                activeKinds:
                    contracts.map((contract) => (
                        contract.leastCommonMultiple.activeContractRefs
                            .map((ref) => ref.contractKind)
                    )),
                hostileStatuses: [
                    poison(absolutive, (forged) => {
                        forged.greatestCommonDivisor.numberBelongsTo = "predicate";
                    }),
                    poison(absolutive, (forged) => {
                        forged.leastCommonMultiple.qualifiedAxisInventory[0].axisId =
                            "lesson12:display-string";
                    }),
                    poison(absolutive, (forged) => {
                        forged.leastCommonMultiple.qualifiedAxisInventory[0].semanticGroup =
                            "sentence";
                    }),
                    poison(absolutive, (forged) => {
                        forged.leastCommonMultiple.selectedCoordinate.lesson14CoordinateId =
                            "forged-coordinate";
                    }),
                    poison(absolutive, (forged) => {
                        forged.lessonMetadataAuthority = true;
                    }),
                    poison(absolutive, (forged) => {
                        forged.leastCommonMultiple.qualifiedAxisInventory.find(
                            (axis) => axis.axisId
                                === "lesson12:noun-class-conditioned-connector"
                        ).semanticGroup = "nounstem";
                        forged.leastCommonMultiple.qualifiedAxisInventory.find(
                            (axis) => axis.axisId === "lesson12:predicate-function"
                        ).semanticGroup = "subject";
                    }),
                ],
            };
        })(),
        {
            exportedBuilder: "function",
            statuses: ["valid", "valid"],
            gcd: {
                identityId: "lessons12-15:ordinary-nnc-grammar-architecture",
                clauseKind: "nominal-nuclear-clause",
                formulaTemplate: "#pers1-pers2(+STATE)(STEM)num1-num2#",
                subjectPredicateArchitecture: true,
                statePosition: "before-predicate-nounstem",
                predicateStemCardinality: "exactly-one",
                numberBelongsTo: "subject-personal-pronoun",
                possessorBelongsTo: "state",
                tensePosition: "absent",
                semanticGroupOrder: ["subject", "state", "nounstem", "sentence"],
                sourceToResultPath: [
                    "typed-nounstem-source",
                    "typed-grammar-selections",
                    "canonical-nnc-engine",
                    "authorized-result",
                ],
                sourceClosureRequired: false,
            },
            lessonAxisCounts: [["12", 9], ["13", 14], ["14", 12], ["15", 27]],
            qualifiedAxisCount: 62,
            semanticGroupCounts: [
                ["subject", 15],
                ["state", 16],
                ["nounstem", 24],
                ["sentence", 7],
            ],
            sourceEvidenceBoundary:
                "test-only-not-imported-by-production-grammar",
            sourceClosurePresent: false,
            branches: ["absolutive", "possessive"],
            activeKinds: [
                [
                    "classical-nahuatl-absolutive-nnc-absolutive-paradigm-contract-frame",
                    "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame",
                    "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame",
                ],
                [
                    "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame",
                    "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame",
                    "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame",
                ],
            ],
            hostileStatuses: [
                "invalid",
                "invalid",
                "invalid",
                "invalid",
                "invalid",
                "invalid",
            ],
        }
    );

    s.eq(
        "Lessons 12-15 source ledgers are not production grammar APIs",
        (() => {
            const frame =
                ctx.buildClassicalNahuatlClassGovernedNncFrame(
                    "cal",
                    {
                        state: "absolutive",
                        subject: "3common",
                        nounClass: "tli",
                        classSelectionAuthority: "user-selection",
                    }
                );
            const contract =
                ctx.buildClassicalNahuatlGrammarSurfaceContractFrame(
                    ctx.buildClassicalNahuatlHigherNncFrame(frame, {
                        animacy: "nonanimate",
                    })
                );
            return {
                runtimeClosureBuilder:
                    typeof ctx.buildClassicalNahuatlLessons12To15ClosureFrame,
                contractStatus: contract.authorizationStatus,
                sourceEvidenceBoundary: contract.sourceEvidenceBoundary,
                hasSourceClosureFrame:
                    Object.prototype.hasOwnProperty.call(
                        contract,
                        "sourceClosureFrame"
                    ),
                sourceClosureRequired:
                    contract.greatestCommonDivisor.sourceClosureRequired,
            };
        })(),
        {
            runtimeClosureBuilder: "undefined",
            contractStatus: "authorized",
            sourceEvidenceBoundary:
                "test-only-not-imported-by-production-grammar",
            hasSourceClosureFrame: false,
            sourceClosureRequired: false,
        }
    );

    s.eq(
        "#2 Grammar and #3 Result do not expose the test-only source ledger",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            && typeof ctx.buildClassicalRuleTransformationObservationRows
                === "function"
            && typeof ctx.buildClassicalNncParadigmFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncType: "ordinary",
                    nncState: "absolutive",
                    nncOutputScope: "single",
                    nncNounClass: "tli",
                    nncSubclass: "tli-1",
                    nncUseShape: "base",
                    nncReferent: "nonanimate",
                    nncAnimacy: "nonanimate",
                    subject: "3common",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                });
                const resultRows =
                    ctx.buildClassicalRuleTransformationObservationRows(
                        surface
                    );
                const paradigm = ctx.buildClassicalNncParadigmFrame({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncType: "ordinary",
                    nncState: "absolutive",
                    nncOutputScope: "paradigm",
                    nncNounClass: "tli",
                    nncSubclass: "tli-1",
                    nncUseShape: "base",
                    nncNumberForm: "m-eh",
                    nncReferent: "nonanimate",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                });
                return {
                    grammar: [
                        surface.authorizationStatus,
                        surface.nncGrammarSurfaceContractInspection?.status,
                        Object.prototype.hasOwnProperty.call(
                            surface.nncGrammarSurfaceContract || {},
                            "sourceClosureFrame"
                        ),
                    ],
                    resultHasAudit: resultRows.some((row) => (
                        row.kind === "lessons12-15-source-closure"
                    )),
                    paradigm: [
                        paradigm.authorizationStatus,
                        Object.prototype.hasOwnProperty.call(
                            paradigm,
                            "lessons12To15SourceClosureFrame"
                        ),
                        paradigm.rows.some((row) => (
                            Object.prototype.hasOwnProperty.call(
                                row,
                                "lessons12To15SourceClosureFrame"
                            )
                            || Object.prototype.hasOwnProperty.call(
                                row,
                                "lessons12To15GrammarSurfaceContractFrame"
                            )
                        )),
                    ],
                    sourceEvidenceBoundaryAbsent:
                        !Object.prototype.hasOwnProperty.call(
                            surface.nncGrammarSurfaceContract || {},
                            "sourceEvidenceBoundary"
                        ),
                };
            })()
            : null,
        {
            grammar: ["authorized", "valid", false],
            resultHasAudit: false,
            paradigm: ["authorized", false, false],
            sourceEvidenceBoundaryAbsent: true,
        }
    );

    s.eq(
        "Ordinary-NNC full paradigms enumerate both States through canonical pointwise scalar coordinates",
        typeof ctx.buildClassicalNncParadigmFrame === "function"
            ? (() => {
                const frames = [
                    ctx.buildClassicalNncParadigmFrame({
                        basalUnit: "nnc",
                        stem: "cal",
                        nncType: "ordinary",
                        nncState: "absolutive",
                        nncOutputScope: "paradigm",
                        nncPossessor: "1sg",
                        nncAnimacy: "nonanimate",
                        sentenceSurfaceMode: "statement",
                        sentenceNegativeMode: "positive",
                    }),
                    ctx.buildClassicalNncParadigmFrame({
                        basalUnit: "nnc",
                        stem: "pah",
                        nncType: "ordinary",
                        nncState: "possessive",
                        nncOutputScope: "paradigm",
                        nncPossessor: "2sg",
                        nncAnimacy: "animate",
                        sentenceSurfaceMode: "statement",
                        sentenceNegativeMode: "positive",
                    }),
                ];
                return frames.map((frame) => ({
                    status: frame.authorizationStatus,
                    version: frame.version,
                    authority: frame.authority,
                    planKind: frame.coordinatePlan?.kind,
                    planStatus: frame.coordinatePlan?.authorizationStatus,
                    planCoordinates: frame.coordinatePlan?.coordinateCount,
                    rows: frame.rowCount,
                    states: Array.from(new Set(
                        frame.rows.map((row) => row.state.nncState)
                    )),
                    subjects: frame.coordinatePlan?.subjects,
                    stemFormations:
                        frame.sourceFrame?.stemFormationOptions,
                    pluralConnectors:
                        frame.sourceFrame?.pluralConnectorOptions,
                    absolutivePluralSubjects: Array.from(new Set(
                        frame.rows
                            .filter((row) => (
                                row.state.nncState === "absolutive"
                                && row.state.subject.endsWith("pl")
                            ))
                            .map((row) => row.state.subject)
                    )),
                    rowsUseCanonicalScalar: frame.rows.every((row) => (
                        ctx.isClassicalNahuatlOrdinaryNncParadigmCoordinate(
                            row.ordinaryNncParadigmCoordinate
                        )
                        && ctx.isClassicalNahuatlOrdinaryNncResult(
                            row.ordinaryNncResult
                        )
                        && row.scalarEvaluatorIdentity
                            === "evaluateClassicalNahuatlOrdinaryNnc"
                        && row.pointwiseEquivalent === true
                        && row.formula
                            === row.ordinaryNncResult.formulaRealization
                    )),
                }));
            })()
            : null,
        [
            {
                status: "authorized",
                version: 4,
                authority:
                    "canonical-ordinary-nnc-source-operation-result-projection",
                planKind:
                    "classical-nahuatl-ordinary-nnc-paradigm-plan",
                planStatus: "authorized",
                planCoordinates: 27,
                rows: 27,
                states: ["absolutive", "possessive"],
                subjects: ["3common"],
                stemFormations: [
                    "plain",
                    "affinity",
                    "distributive-varietal",
                ],
                pluralConnectors: ["t-in"],
                absolutivePluralSubjects: [],
                rowsUseCanonicalScalar: true,
            },
            {
                status: "authorized",
                version: 4,
                authority:
                    "canonical-ordinary-nnc-source-operation-result-projection",
                planKind:
                    "classical-nahuatl-ordinary-nnc-paradigm-plan",
                planStatus: "authorized",
                planCoordinates: 106,
                rows: 106,
                states: ["absolutive", "possessive"],
                subjects: [
                    "1sg",
                    "2sg",
                    "3sg",
                    "1pl",
                    "2pl",
                    "3pl",
                ],
                stemFormations: [
                    "plain",
                    "affinity",
                    "distributive-varietal",
                ],
                pluralConnectors: ["t-in", "m-eh"],
                absolutivePluralSubjects: ["1pl", "2pl", "3pl"],
                rowsUseCanonicalScalar: true,
            },
        ]
    );

    s.eq(
        "Full paradigm keeps one selected nounstem analysis and derives its authorized State inventory without a single-form veto",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? [
                {
                    stem: "cal",
                    nncPredicateOptionId: "secondary-general-use",
                },
                {
                    stem: "māi",
                    nncPredicateOptionId: "tl-2a-to-1a",
                },
                {
                    stem: "tēuc",
                    nncPredicateOptionId: "yo-matrix",
                },
            ].map((analysis) => {
                const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    nncType: "ordinary",
                    nncState: "absolutive",
                    nncOutputScope: "paradigm",
                    subject: "3common",
                    nncAnimacy: "nonanimate",
                    nncPossessor: "1sg",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                    ...analysis,
                });
                const paradigm = frame.nncParadigmFrame;
                return {
                    status: frame.authorizationStatus,
                    blockReason: frame.blockReason,
                    authorizationSource:
                        frame.fullParadigmAuthorizationSource,
                    operation: frame.state.nncPredicateOptionId,
                    paradigmStatus: paradigm?.authorizationStatus,
                    rowCount: paradigm?.rowCount,
                    states: Array.from(new Set(
                        paradigm?.rows?.map((row) => row.state.nncState) || []
                    )),
                    initialState:
                        paradigm?.fixedSourceAnalysis?.initialState,
                    stateLabel:
                        paradigm?.fixedSourceAnalysis?.state,
                    predicateStems: Array.from(new Set(
                        paradigm?.rows?.map((row) => (
                            row.formula.match(/\([^)]*\)/u)?.[0] || ""
                        )) || []
                    )),
                };
            })
            : null,
        [
            {
                status: "authorized",
                blockReason: "",
                authorizationSource: "validated-generated-row-inventory",
                operation: "secondary-general-use",
                paradigmStatus: "authorized",
                rowCount: 24,
                states: ["possessive"],
                initialState: "possessive",
                stateLabel: "possessive",
                predicateStems: ["(tē-cal)"],
            },
            {
                status: "authorized",
                blockReason: "",
                authorizationSource: "validated-generated-row-inventory",
                operation: "tl-2a-to-1a",
                paradigmStatus: "authorized",
                rowCount: 27,
                states: ["absolutive", "possessive"],
                initialState: "absolutive",
                stateLabel: "all authorized states",
                predicateStems: ["(mā)"],
            },
            {
                status: "authorized",
                blockReason: "",
                authorizationSource: "validated-generated-row-inventory",
                operation: "yo-matrix",
                paradigmStatus: "authorized",
                rowCount: 27,
                states: ["absolutive", "possessive"],
                initialState: "absolutive",
                stateLabel: "all authorized states",
                predicateStems: [
                    "(tēuc-yō)",
                    "(tē-tēuc-yō)",
                    "(teh-tēuc-yō)",
                    "(tēuc-yo)",
                    "(tē-tēuc-yo)",
                    "(teh-tēuc-yo)",
                ],
            },
        ]
    );

    s.eq(
        "Full paradigm projects the yo matrix from the same general-use embed in both States",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "tle-māi",
                    sourceEmbedStem: "tle",
                    sourceMatrixStem: "māi",
                    nncType: "ordinary",
                    nncState: "absolutive",
                    nncOutputScope: "paradigm",
                    subject: "3common",
                    nncAnimacy: "nonanimate",
                    nncPossessor: "3sg",
                    nncPredicateOptionId: "yo-matrix",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                });
                const paradigm = frame.nncParadigmFrame;
                const absolutive = paradigm?.rows?.find(
                    (row) => row.formula === "#0-0(tle-mā-yō)tl-0#"
                );
                return {
                    status: frame.authorizationStatus,
                    paradigmStatus: paradigm?.authorizationStatus,
                    states: Array.from(new Set(
                        paradigm?.rows?.map((row) => row.state.nncState) || []
                    )),
                    predicateStems: Array.from(new Set(
                        paradigm?.rows?.map((row) => (
                            row.formula.match(/\([^)]*\)/u)?.[0] || ""
                        )) || []
                    )),
                    absolutiveSurface: absolutive?.surface,
                    leaksRestrictedUseMatrix:
                        paradigm?.rows?.some((row) => (
                            row.formula.includes("(tle-māi-y")
                        )),
                };
            })()
            : null,
        {
            status: "authorized",
            paradigmStatus: "authorized",
            states: ["absolutive", "possessive"],
            predicateStems: [
                "(tle-mā-yō)",
                "(tlē-tle-mā-yō)",
                "(tleh-tle-mā-yō)",
                "(tle-mā-yo)",
                "(tlē-tle-mā-yo)",
                "(tleh-tle-mā-yo)",
            ],
            absolutiveSurface: "Tlemāyōtl.",
            leaksRestrictedUseMatrix: false,
        }
    );

    s.eq(
        "Lesson 15 reclassification authority survives URL round trip as a typed Source class",
        (() => {
            const hash = ctx.buildEntradaUrlHash({
                input: "(māi)",
                board: "ordinary-nnc",
                ordinaryNnc: { enabled: true },
                classicalNnc: {
                    active: true,
                    sourceClass: "tl-2-a",
                    tl2ARealization: "reclassify-1a",
                    predicateOptionId: "source-stem",
                    possessiveFormation: "regular",
                    lesson15TargetStem: "",
                    state: "possessive",
                    nounClass: "tl",
                    useShape: "truncated-i",
                    subclass: "tl-2a",
                },
            });
            const restored = ctx.parseEntradaUrlSegmentString(hash);
            return {
                hasSourceClassSegment:
                    hash.includes("/cn-source-class/tl-2-a"),
                hasClassRealizationSegment:
                    hash.includes(
                        "/cn-tl2a-realization/reclassify-1a"
                    ),
                reclassificationOperationAbsent:
                    !hash.includes("/cn-l15-operation/tl-2a-to-1a"),
                sourceClass: restored.classicalNnc.sourceClass,
                classRealization:
                    restored.classicalNnc.tl2ARealization,
                visibleOperation:
                    restored.classicalNnc.predicateOptionId,
                legacyFormationAbsent:
                    !Object.hasOwn(restored.classicalNnc, "possessiveFormation"),
                targetStemAbsent:
                    !Object.hasOwn(restored.classicalNnc, "lesson15TargetStem"),
                explicitVisibleOperation:
                    restored.presentFields.includes("classicalNncPredicateOptionId"),
            };
        })(),
        {
            hasSourceClassSegment: true,
            hasClassRealizationSegment: true,
            reclassificationOperationAbsent: true,
            sourceClass: "tl-2-a",
            classRealization: "reclassify-1a",
            visibleOperation: "source-stem",
            legacyFormationAbsent: true,
            targetStemAbsent: true,
            explicitVisibleOperation: true,
        }
    );

    s.eq(
        "Classical saved routes distinguish VNC from NNC while retaining old verb links",
        (() => {
            const nncHash = ctx.buildEntradaUrlHash({
                input: "(tleh)",
                slots: { a: { embed: "tl", stem: "eh" } },
                classicalNnc: { active: true, subject: "3pl" },
            });
            const legacyNnc = ctx.parseEntradaUrlSegmentString(
                "#classical/v1/verb/(tleh)/cn/1/cn-subj/3pl"
            );
            return {
                nncKind: nncHash.startsWith("#classical/v1/nnc/(tleh)"),
                keepsNncActivationState: nncHash.includes("/cn/1"),
                legacyNncStillOpens: legacyNnc.classicalNnc.active,
                legacyNncRewritesAsNnc: ctx.buildEntradaUrlHash(legacyNnc)
                    .startsWith("#classical/v1/nnc/(tleh)"),
                vncKind: ctx.buildEntradaUrlHash({
                    input: "(nemi)",
                    transitivity: "intransitive",
                }).startsWith("#classical/v1/vnc/(nemi)"),
            };
        })(),
        {
            nncKind: true,
            keepsNncActivationState: true,
            legacyNncStillOpens: true,
            legacyNncRewritesAsNnc: true,
            vncKind: true,
        }
    );

    s.eq(
        "Curriculum metadata cannot select an ordinary-NNC operation, while an unapplied semantic operation fails closed",
        (() => {
            const frame = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
                state: "absolutive", subject: "3common",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const forged = {
                ...frame.nncSlotFrame,
                highestActiveLesson: 99,
                finalizerLayerId: "nnc-ordinary-conditions",
            };
            const curriculumPoisonEvaluation = ctx.buildClassicalNahuatlNncOperationEvaluationFrame({ nncSlotFrame: forged });
            const missingSemanticOperation = ctx.buildClassicalNahuatlNncOperationEvaluationFrame({
                nncSlotFrame: frame.nncSlotFrame,
                requiredOperationIds: [...frame.nncSlotFrame.appliedOperationIds, "nnc-ordinary-conditions"],
                resultOperationId: "nnc-ordinary-conditions",
                requestedOutputKind: "selected-ordinary-nnc-formula",
            });
            return {
                poisonedStatus: curriculumPoisonEvaluation.authorizationStatus,
                poisonedResultOperation: curriculumPoisonEvaluation.resultOperationId,
                curriculumOrderAuthority: curriculumPoisonEvaluation.curriculumOrderAuthority,
                missingStatus: missingSemanticOperation.authorizationStatus,
                missingReason: missingSemanticOperation.blockReason,
                missing: missingSemanticOperation.missingOperationIds,
            };
        })(),
        {
            poisonedStatus: "authorized",
            poisonedResultOperation: "nnc-nounstem-selection",
            curriculumOrderAuthority: false,
            missingStatus: "blocked",
            missingReason: "required-grammar-operation-not-applied",
            missing: ["nnc-ordinary-conditions"],
        }
    );

    s.eq(
        "Lesson 16 source ledger is not a production grammar API",
        typeof ctx.buildClassicalNahuatlLesson16ClosureFrame,
        "undefined"
    );

    s.eq(
        "Lesson 16 canonical scalar contract carries no source-ledger authority",
        (() => {
            const frame = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound",
                subject: "3sg",
            });
            return {
                status: frame.authorizationStatus,
                sourceEvidenceBoundary:
                    frame.lesson16GrammarContractFrame
                        ?.sourceEvidenceBoundary,
                hasSourceClosureFrame:
                    Object.prototype.hasOwnProperty.call(
                        frame.lesson16GrammarContractFrame || {},
                        "sourceClosureFrame"
                    ),
            };
        })(),
        {
            status: "authorized",
            sourceEvidenceBoundary:
                "test-only-not-imported-by-production-grammar",
            hasSourceClosureFrame: false,
        }
    );

    s.eq(
        "Lesson 16 scalar GCD and selected LCM coordinate are registry-valid and formula poison is nonauthorizing",
        (() => {
            const frame = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound",
                subject: "1pl",
                thirdCommonVariant: "eh",
                pluralConnector: "t-in",
                formulaArtifact: "#FAKE#",
            });
            const contract = frame.lesson16GrammarContractFrame;
            const report = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                contract
            );
            const hostileReport = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                {
                    ...contract,
                    greatestCommonDivisor: {
                        ...contract.greatestCommonDivisor,
                        formula: "#FAKE#",
                    },
                }
            );
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                gcd: contract.greatestCommonDivisor.identityId,
                axisCount: contract.leastCommonMultiple.axisCount,
                coordinateFormula: contract.leastCommonMultiple.selectedCoordinate.formulaRealization,
                registry: report.status,
                hostileRegistry: hostileReport.status,
                containsFake: frame.formulaRealization.includes("FAKE"),
            };
        })(),
        {
            status: "authorized",
            formula: "#t-0(eh-huā-n)t-in#",
            gcd: "lesson16:pronominal-absolutive-nnc",
            axisCount: 19,
            coordinateFormula: "#t-0(eh-huā-n)t-in#",
            registry: "valid",
            hostileRegistry: "invalid",
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 16 full-paradigm planning rebuilds subject-bound records and retains contextual variants",
        (() => {
            const plan = ctx.buildClassicalNahuatlPronominalParadigmPlan({
                subtype: "personal-compound",
                thirdCommonVariant: "eh",
                enteredStem: "eh-huā",
            });
            const report = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                plan
            );
            const onePlural = plan.coordinates.filter(coordinate => coordinate.subject === "1pl");
            return {
                status: plan.authorizationStatus,
                registry: report.status,
                gcd: plan.greatestCommonDivisor.identityId,
                subjects: Array.from(new Set(plan.coordinates.map(coordinate => coordinate.subject))),
                onePluralContextVariants: Array.from(new Set(
                    onePlural.map(coordinate => coordinate.doubledFirstPluralSelected)
                )),
                subjectRecordsMatch: plan.coordinates.every(coordinate =>
                    coordinate.sourceFrame.subject === coordinate.subject
                    && coordinate.contextSelectionRecord.subject === coordinate.subject
                ),
                firstCoordinateAuthority: plan.firstCoordinateAuthority,
            };
        })(),
        {
            status: "authorized",
            registry: "valid",
            gcd: "lesson16:pronominal-absolutive-nnc",
            subjects: ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"],
            onePluralContextVariants: [false, true],
            subjectRecordsMatch: true,
            firstCoordinateAuthority: false,
        }
    );

    s.eq(
        "Pronominal full paradigm consumes one semantic plan and preserves scalar pointwise identity",
        (() => {
            const frame = ctx.buildClassicalNncParadigmFrame({
                basalUnit: "nnc",
                stem: "eh-huā",
                sourceEmbedStem: "eh",
                sourceMatrixStem: "huā",
                nncType: "personal-compound",
                nncState: "absolutive",
                nncClausePosition: "initial",
                sentenceSurfaceMode: "statement",
                sentenceNegativeMode: "positive",
            });
            return {
                status: frame.authorizationStatus,
                version: frame.version,
                authority: frame.authority,
                planKind: frame.coordinatePlan?.kind,
                planStatus: frame.coordinatePlan?.authorizationStatus,
                rowsPresent: frame.rowCount > 0,
                subjects: Array.from(new Set(frame.rows.map(row => row.state.subject))),
                hasDoubledFirstPlural: frame.rows.some(row =>
                    row.state.contextualVariant === "doubled-first-plural"
                ),
                everyContractValid: frame.rows.every(row =>
                    ctx.isClassicalNahuatlPronominalNncParadigmCoordinate(
                        row.pronominalNncParadigmCoordinate
                    )
                    && ctx.isClassicalNahuatlPronominalNncResult(
                        row.pronominalNncResult
                    )
                    && row.scalarEvaluatorIdentity
                        === "evaluateClassicalNahuatlPronominalNnc"
                    && row.pointwiseEquivalent === true
                    && row.formula
                        === row.pronominalNncResult.formulaRealization
                ),
                invalidCandidatesRendered: frame.invalidCandidatesRendered,
            };
        })(),
        {
            status: "authorized",
            version: 5,
            authority:
                "canonical-pronominal-nnc-source-operation-result-projection",
            planKind:
                "classical-nahuatl-pronominal-nnc-paradigm-plan",
            planStatus: "authorized",
            rowsPresent: true,
            subjects: ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"],
            hasDoubledFirstPlural: true,
            everyContractValid: true,
            invalidCandidatesRendered: false,
        }
    );

    s.eq(
        "Quantitive full paradigm derives source-specific coordinates through the shared scalar evaluator",
        (() => {
            const frame = ctx.buildClassicalNncParadigmFrame({
                basalUnit: "nnc",
                stem: "miye-c",
                sourceEmbedStem: "miye",
                sourceMatrixStem: "c",
                nncType: "quantitive",
                nncState: "absolutive",
                nncNumberForm: "t-in",
                nncQuantitiveMatrix: "qui",
                nncQuantitiveMatrixForm: "c",
                nncQuantitivePredicatePluralization: "plain-variant",
                nncClausePosition: "initial",
                sentenceSurfaceMode: "statement",
                sentenceNegativeMode: "positive",
            });
            return {
                status: frame.authorizationStatus,
                blockReason: frame.blockReason,
                planKind: frame.coordinatePlan?.kind,
                planStatus: frame.coordinatePlan?.authorizationStatus,
                planCoordinates: frame.coordinatePlan?.coordinateCount,
                rows: frame.rowCount,
                subjects: Array.from(new Set(frame.rows.map(row => row.state.subject))),
                numberForms: Array.from(new Set(frame.rows.map(row => row.state.nncNumberForm))),
                matrixForms: Array.from(new Set(frame.rows.map(row =>
                    row.pronominalNncParadigmCoordinate.matrixForm
                ))),
                pluralStrategies: Array.from(new Set(frame.rows.map(row =>
                    row.pronominalNncParadigmCoordinate
                        .predicatePluralization
                ))),
                everySourceSpecific: frame.rows.every(row =>
                    row.pronominalNncResult?.sourceFrame?.stem === "miye-c"
                    && row.scalarEvaluatorIdentity
                        === "evaluateClassicalNahuatlPronominalNnc"
                    && row.pointwiseEquivalent === true
                ),
            };
        })(),
        {
            status: "authorized",
            blockReason: "",
            planKind:
                "classical-nahuatl-pronominal-nnc-paradigm-plan",
            planStatus: "authorized",
            planCoordinates: 13,
            rows: 13,
            subjects: ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"],
            numberForms: ["sounded", "t-in", "silent-silent"],
            matrixForms: ["c"],
            pluralStrategies: ["not-applicable", "plain-variant", "internal-n"],
            everySourceSpecific: true,
        }
    );

    s.eq(
        "Lesson 16 quantitive source identity reconstructs its embed without renderer repetition",
        (() => {
            const analysis =
                ctx.buildClassicalNahuatlQuantitiveSourceAnalysis({
                    sourceStem: "miye-c",
                    matrixForm: "quī",
                });
            const compound =
                ctx.buildClassicalNahuatlQuantitiveSourceAnalysis({
                    sourceStem: "quē-x-qui-ch",
                    matrixForm: "qui-ch",
                });
            return {
                status: analysis.authorizationStatus,
                source: analysis.sourceStem,
                canonicalSource: analysis.canonicalSourceStem,
                embed: analysis.embedStem,
                selected: analysis.selectedStem,
                compoundStatus: compound.authorizationStatus,
                compoundEmbed: compound.embedStem,
            };
        })(),
        {
            status: "authorized",
            source: "miye-c",
            canonicalSource: "miye-qui",
            embed: "miye",
            selected: "miye-quī",
            compoundStatus: "authorized",
            compoundEmbed: "quē-x",
        }
    );

    s.eq(
        "Lesson 16 pronominal NNCs are absolutive typed NNCs, not English pronoun substitutions",
        (() => {
            const personal = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-simple", subject: "1sg", EnglishPronoun: "I",
            });
            const possessive = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-simple", subject: "1sg", state: "possessive",
            });
            const relative = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "relative", subject: "3sg",
            });
            return {
                status: personal.authorizationStatus,
                formula: personal.formulaRealization,
                family: personal.nncSlotFrame.nncFamily,
                semanticKind: personal.sourceFrame.semanticKind,
                translationAuthority: personal.sourceFrame.EnglishPronounTranslationIsStructuralAuthority,
                possessiveReason: possessive.blockReason,
                relativeReason: relative.blockReason,
            };
        })(),
        {
            status: "authorized",
            formula: "#n-0(eh)0-0#",
            family: "pronominal",
            semanticKind: "entitive",
            translationAuthority: false,
            possessiveReason: "pronominal-nncs-occur-only-in-absolutive-state",
            relativeReason: "canvas-has-no-relative-pronominal-nnc-subtype",
        }
    );

    s.eq(
        "Lesson 16 carries typed pronominal noun class and referent category into selected NNC slots",
        [
            ["tl-eh-huā", { subtype: "interrogative", interrogativeKind: "tleh-huā", subject: "3sg", numberVariant: "sounded" }],
            ["eh", { subtype: "personal-simple", subject: "1sg" }],
            ["cā", { subtype: "interrogative", interrogativeKind: "cā", subject: "3sg" }],
            ["ā-0", { subtype: "interrogative", interrogativeKind: "āc", subject: "3sg" }],
            ["a-c-ah", { subtype: "indefinite", indefiniteKind: "someone", subject: "3sg" }],
            ["ix-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "ix" }],
            ["mo-ch-eh-huā", { subtype: "quantitive-personal-compound", subject: "3sg", quantitiveEmbed: "mo-ch", quantitivePersonalMatrix: "eh-huā", numberVariant: "sounded" }],
        ].map(([stem, options]) => {
            const frame = ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority(options),
                enteredStem: stem,
                requireEnteredStem: true,
            });
            return {
                stem,
                nounClass: frame.nncSlotFrame.nounClass,
                nounClassAuthority: frame.nncSlotFrame.nounClassAuthority,
                referent: frame.nncSlotFrame.referentCategory,
                referentAuthority: frame.nncSlotFrame.referentCategoryAuthority,
            };
        }),
        [
            { stem: "tl-eh-huā", nounClass: "tl", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "entity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "eh", nounClass: "zero", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "entity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "cā", nounClass: "tl", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "entity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "ā-0", nounClass: "c", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "person", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "a-c-ah", nounClass: "zero", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "person", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "ix-qui-ch", nounClass: "zero", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "quantity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "mo-ch-eh-huā", nounClass: "tl", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "quantity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
        ]
    );

    s.eq(
        "Every Canvas stem example exposed by NNC Source reaches an authorized typed output",
        (() => {
            const ordinary = [
                ["cal", "tli"],
                ["pah", "tli"],
                ["mich", "in"],
                ["chichi", "zero"],
            ].map(([stem, nounClass]) => {
                const lesson14 = ctx.buildClassicalNahuatlClassGovernedNncFrame(stem, {
                    state: "absolutive",
                    subject: "3common",
                    nounClass,
                    classSelectionAuthority: "user-selection",
                    animacy: "animate",
                });
                const frame = ctx.buildClassicalNahuatlHigherNncFrame(lesson14, { animacy: "animate" });
                return [stem, frame.authorizationStatus, frame.formulaRealization, frame.blockReason];
            });
            const pronominalOptions = [
                ["eh", { subtype: "personal-simple", subject: "1sg" }],
                ["yeh", { subtype: "personal-simple", subject: "3sg" }],
                ["eh-huā", { subtype: "personal-compound", subject: "1sg", numberVariant: "sounded" }],
                ["yeh-huā", { subtype: "personal-compound", subject: "3sg", numberVariant: "sounded" }],
                ["yeh-yeh-huā", { subtype: "personal-compound-derived", subject: "3common", derivedPersonalStem: "yeh-yeh-huā" }],
                ["eh-eh-huā", { subtype: "personal-compound-derived", subject: "3common", derivedPersonalStem: "eh-eh-huā" }],
                ["tl-eh", { subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg" }],
                ["tl-eh-huā", { subtype: "interrogative", interrogativeKind: "tleh-huā", subject: "3sg", numberVariant: "sounded" }],
                ["cā", { subtype: "interrogative", interrogativeKind: "cā", subject: "3sg" }],
                ["cā-tl-eh", { subtype: "interrogative", interrogativeKind: "cā", compoundInterrogativeStem: "cā-tl-eh", compoundInterrogativeEmbed: "cā", compoundInterrogativeMatrix: "tl-eh", compoundInterrogativeNumberClass: "zero", subject: "3sg" }],
                ["cā-tl-e-in", { subtype: "interrogative", interrogativeKind: "cā", compoundInterrogativeStem: "cā-tl-e-in", compoundInterrogativeEmbed: "cā", compoundInterrogativeMatrix: "tl-e-in", compoundInterrogativeNumberClass: "zero", subject: "3sg" }],
                ["cā-tl-eh-huā", { subtype: "interrogative", interrogativeKind: "cā", compoundInterrogativeStem: "cā-tl-eh-huā", compoundInterrogativeEmbed: "cā", compoundInterrogativeMatrix: "tl-eh-huā", compoundInterrogativeNumberClass: "tl", subject: "3sg" }],
                ["ā-0", { subtype: "interrogative", interrogativeKind: "āc", subject: "3sg" }],
                ["īn", { subtype: "demonstrative", demonstrative: "īn", subject: "3common" }],
                ["ōn", { subtype: "demonstrative", demonstrative: "ōn", subject: "3common" }],
                ["a-c-ah", { subtype: "indefinite", indefiniteKind: "someone", subject: "3sg" }],
                ["itl-ah", { subtype: "indefinite", indefiniteKind: "something", subject: "3common" }],
                ["ix-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "ix" }],
                ["cem-ix-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "cem-ix" }],
                ["quē-x-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "quē-x", interrogativeMeaning: true }],
                ["quē-x-ix-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "quē-x-ix", interrogativeMeaning: true }],
                ["miya-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "miya", matrixAllomorph: "qui" }],
                ["miya-c", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "miya", matrixAllomorph: "c" }],
                ["miye-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "miye", matrixAllomorph: "qui" }],
                ["miye-c", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "miye", matrixAllomorph: "c" }],
                ["ce-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "ce", matrixAllomorph: "qui" }],
                ["iz-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "iz", matrixAllomorph: "qui" }],
                ["quē-z-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "quē-z", matrixAllomorph: "qui", interrogativeMeaning: true }],
                ["quē-c-iz-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "quē-c-iz", matrixAllomorph: "qui", interrogativeMeaning: true }],
                ["a-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "a", matrixAllomorph: "qui" }],
                ["a-chi", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "chi", quantitiveEmbed: "a", matrixAllomorph: "chi" }],
                ["mo-chi", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "chi", quantitiveEmbed: "mo", matrixAllomorph: "chi" }],
                ["mo-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "chi", quantitiveEmbed: "mo", matrixAllomorph: "ch" }],
                ["mo-ch-eh-huā", { subtype: "quantitive-personal-compound", subject: "3sg", quantitiveEmbed: "mo-ch", quantitivePersonalMatrix: "eh-huā", numberVariant: "sounded" }],
                ["ix-a-chi", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "chi", quantitiveEmbed: "ix-a", matrixAllomorph: "chi" }],
            ];
            const pronominal = pronominalOptions.map(([stem, options]) => {
                const frame = ctx.buildClassicalNahuatlPronominalNncFrame({
                    ...withTypedQuantitiveAuthority(options),
                    enteredStem: stem,
                    requireEnteredStem: true,
                });
                return [stem, frame.authorizationStatus, frame.formulaRealization, frame.blockReason];
            });
            return [...ordinary, ...pronominal];
        })(),
        [
            ["cal", "authorized", "#0-0(cal)li-0#", ""],
            ["pah", "authorized", "#0-0(pah)tli-0#", ""],
            ["mich", "authorized", "#0-0(mich)in-0#", ""],
            ["chichi", "authorized", "#0-0(chichi)0-0#", ""],
            ["eh", "authorized", "#n-0(eh)0-0#", ""],
            ["yeh", "authorized", "#0-0(yeh)0-0#", ""],
            ["eh-huā", "authorized", "#n-0(eh-huā)tl-0#", ""],
            ["yeh-huā", "authorized", "#0-0(yeh-huā)tl-0#", ""],
            ["yeh-yeh-huā", "authorized", "#0-0(yeh-yeh-huā)tl-0#", ""],
            ["eh-eh-huā", "authorized", "#0-0(eh-eh-huā)tl-0#", ""],
            ["tl-eh", "authorized", "#0-0(tl-eh)0-0#", ""],
            ["tl-eh-huā", "authorized", "#0-0(tl-eh-huā)tl-0#", ""],
            ["cā", "authorized", "#0-0(cā)tl-0#", ""],
            ["cā-tl-eh", "authorized", "#0-0(cā-tl-eh)0-0#", ""],
            ["cā-tl-e-in", "authorized", "#0-0(cā-tl-e-in)0-0#", ""],
            ["cā-tl-eh-huā", "authorized", "#0-0(cā-tl-eh-huā)tl-0#", ""],
            ["ā-0", "authorized", "#0-0(ā-0)c-0#", ""],
            ["īn", "authorized", "#0-0(īn)0-0#", ""],
            ["ōn", "authorized", "#0-0(ōn)0-0#", ""],
            ["a-c-ah", "authorized", "#0-0(a-c-ah)0-0#", ""],
            ["itl-ah", "authorized", "#0-0(itl-ah)0-0#", ""],
            ["ix-qui-ch", "authorized", "#0-0(ix-qui-ch)0-0#", ""],
            ["cem-ix-qui-ch", "authorized", "#0-0(cem-ix-qui-ch)0-0#", ""],
            ["quē-x-qui-ch", "authorized", "#0-0(quē-x-qui-ch)0-0#", ""],
            ["quē-x-ix-qui-ch", "authorized", "#0-0(quē-x-ix-qui-ch)0-0#", ""],
            ["miya-qui", "authorized", "#0-0(miya-qui)0-0#", ""],
            ["miya-c", "authorized", "#0-0(miya-c)0-0#", ""],
            ["miye-qui", "authorized", "#0-0(miye-qui)0-0#", ""],
            ["miye-c", "authorized", "#0-0(miye-c)0-0#", ""],
            ["ce-qui", "authorized", "#0-0(ce-qui)0-0#", ""],
            ["iz-qui", "authorized", "#0-0(iz-qui)0-0#", ""],
            ["quē-z-qui", "authorized", "#0-0(quē-z-qui)0-0#", ""],
            ["quē-c-iz-qui", "authorized", "#0-0(quē-c-iz-qui)0-0#", ""],
            ["a-qui", "authorized", "#0-0(a-qui)0-0#", ""],
            ["a-chi", "authorized", "#0-0(a-chi)0-0#", ""],
            ["mo-chi", "authorized", "#0-0(mo-chi)0-0#", ""],
            ["mo-ch", "authorized", "#0-0(mo-ch)0-0#", ""],
            ["mo-ch-eh-huā", "authorized", "#0-0(mo-ch-eh-huā)tl-0#", ""],
            ["ix-a-chi", "authorized", "#0-0(ix-a-chi)0-0#", ""],
        ]
    );

    s.eq(
        "Lesson 16 quantitive source licensing rejects an arbitrary embed and the embed-only ce-c form",
        (() => {
            const nearbyUnlistedStem = ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive",
                    subject: "3common",
                    quantitiveMatrix: "qui",
                    quantitiveEmbed: "nehnemi",
                    matrixAllomorph: "qui",
                }),
                enteredStem: "nehnemi-qui",
                requireEnteredStem: true,
            });
            const forbiddenEmbedOnlyStem = ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive",
                    subject: "3common",
                    quantitiveMatrix: "qui",
                    quantitiveEmbed: "ce",
                    matrixAllomorph: "c",
                }),
                enteredStem: "ce-c",
                requireEnteredStem: true,
            });
            return {
                nearbyStatus: nearbyUnlistedStem.authorizationStatus,
                nearbyFormula: nearbyUnlistedStem.formulaRealization,
                embedOnlyStatus: forbiddenEmbedOnlyStem.authorizationStatus,
                embedOnlyReason: forbiddenEmbedOnlyStem.blockReason,
            };
        })(),
        {
            nearbyStatus: "blocked",
            nearbyFormula: "",
            embedOnlyStatus: "blocked",
            embedOnlyReason: "ce-c-is-embed-only-not-a-complete-pronominal-nnc-source",
        }
    );

    s.eq(
        "Lesson 16 personal Source alternants let subject grammar select the Result stem",
        (() => {
            const matched = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-simple", subject: "3sg",
                enteredStem: "yeh", requireEnteredStem: true,
            });
            const conditionedAlternant = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-simple", subject: "3sg",
                enteredStem: "eh", requireEnteredStem: true,
            });
            const absent = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-simple", subject: "3sg",
                requireEnteredStem: true,
            });
            return {
                matched: [matched.authorizationStatus, matched.sourceFrame.enteredStemMatchesAnalysis, matched.formulaRealization],
                conditionedAlternant: [
                    conditionedAlternant.authorizationStatus,
                    conditionedAlternant.sourceFrame.enteredStemMatchesAnalysis,
                    conditionedAlternant.formulaRealization,
                ],
                absent: [absent.authorizationStatus, absent.blockReason],
            };
        })(),
        {
            matched: ["authorized", true, "#0-0(yeh)0-0#"],
            conditionedAlternant: ["authorized", true, "#0-0(yeh)0-0#"],
            absent: ["blocked", "pronominal-nnc-entered-stem-required"],
        }
    );

    s.eq(
        "Lesson 16 third-common personal variants remain source-selected instead of being rewritten",
        [
            ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-simple", subject: "3common", thirdCommonVariant: "eh",
                enteredStem: "eh", requireEnteredStem: true,
            }),
            ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound", subject: "3common", thirdCommonVariant: "eh",
                enteredStem: "eh-huā", requireEnteredStem: true,
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            sourceStem: frame.sourceFrame.sourceStem,
            formula: frame.formulaRealization,
        })),
        [
            { status: "authorized", sourceStem: "eh", formula: "#0-0(eh)0-0#" },
            { status: "authorized", sourceStem: "eh-huā", formula: "#0-0(eh-huā)tl-0#" },
        ]
    );

    s.eq(
        "Lesson 16 personal families keep plain plural and internal-n plural structurally distinct",
        [
            ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "personal-simple", subject: "3sg" }),
            ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "personal-simple", subject: "1pl" }),
            ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "personal-compound", subject: "3pl", pluralConnector: "t-in" }),
            ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "personal-compound", subject: "2pl", pluralConnector: "silent-silent" }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            stem: frame.numberFrame.predicateStem,
            internalPlural: frame.numberFrame.internalPluralMorph,
            subjectDyad: `${frame.numberFrame.num1}-${frame.numberFrame.num2}`,
        })),
        [
            { status: "authorized", formula: "#0-0(yeh)0-0#", stem: "yeh", internalPlural: "none", subjectDyad: "0-0" },
            { status: "authorized", formula: "#t-0(eh)m-eh#", stem: "eh", internalPlural: "none", subjectDyad: "m-eh" },
            { status: "authorized", formula: "#0-0(yeh-huā-n)t-in#", stem: "yeh-huā-n", internalPlural: "n-inside-stem", subjectDyad: "t-in" },
            { status: "authorized", formula: "#am-0(eh-huā-n)⎕-⎕#", stem: "eh-huā-n", internalPlural: "n-inside-stem", subjectDyad: "⎕-⎕" },
        ]
    );

    s.eq(
        "Lesson 16 personal compound number variants and doubled first plural stay explicitly conditioned",
        (() => {
            const sounded = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound", subject: "1sg", numberVariant: "sounded",
            });
            const silent = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound", subject: "1sg", numberVariant: "silent",
            });
            const doubled = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound", subject: "1pl", pluralConnector: "t-in",
                contextSelectionRecord: ctx.buildClassicalNahuatlContextSelectionRecord({
                    subtype: "personal-compound", subject: "1pl", doubledFirstPluralSelected: true,
                }),
            });
            const hostile = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound", subject: "2pl", pluralConnector: "t-in",
                contextSelectionRecord: ctx.buildClassicalNahuatlContextSelectionRecord({
                    subtype: "personal-compound", subject: "2pl", doubledFirstPluralSelected: true,
                }),
            });
            return {
                sounded: sounded.formulaRealization,
                silent: silent.formulaRealization,
                doubled: doubled.formulaRealization,
                doubledMeaning: doubled.personFrame.contextualMeaning,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            sounded: "#n-0(eh-huā)tl-0#",
            silent: "#n-0(eh-huā)⎕-0#",
            doubled: "#ti-t-0(eh-huā-n)t-in#",
            doubledMeaning: "member-or-members-of-our-people",
            hostileReason: "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc",
        }
    );

    s.eq(
        "Lesson 16 emits the typed personal-pronominal partner required by Lesson 11.4.7",
        (() => {
            const personal = ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "personal-compound", subject: "3pl" });
            const demonstrative = ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "demonstrative", demonstrative: "īn", subject: "3pl" });
            return {
                personalStatus: personal.lesson11CooperationFrame.authorizationStatus,
                personalSubject: personal.lesson11CooperationFrame.cooperatingSubject,
                requiredIdentity: personal.lesson11CooperationFrame.requiredLesson11Identity,
                booleanAuthority: personal.lesson11CooperationFrame.booleanClaimAuthority,
                demonstrativeStatus: demonstrative.lesson11CooperationFrame.authorizationStatus,
            };
        })(),
        {
            personalStatus: "authorized",
            personalSubject: "3pl",
            requiredIdentity: "defective-nnc-cooperation",
            booleanAuthority: false,
            demonstrativeStatus: "not-authorized",
        }
    );

    s.eq(
        "Lesson 16 interrogative identity stems retain typed context, restrictions, and separate adjunct writing",
        (() => {
            const positive = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", clauseInitial: true,
                contextSelectionRecord: ctx.buildClassicalNahuatlContextSelectionRecord({
                    subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg",
                    dependentClauseIntroducedByInSelected: true,
                }),
            });
            const negative = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", polarity: "negative",
            });
            const noninitial = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", clauseInitial: false,
            });
            const who = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg",
            });
            const hostileWho = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "1sg",
            });
            const dependentSentence = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(
                positive.nncSlotFrame,
                { sentenceType: "statement", polarity: "positive", discourseFrame: positive.discourseFrame }
            );
            return {
                positiveFormula: positive.formulaRealization,
                positiveReading: positive.discourseFrame.interrogativeReadingActive,
                writing: positive.discourseFrame.adjunctWritingPolicy,
                dependentSurface: dependentSentence.sentenceSurface,
                dependentFormula: dependentSentence.sentenceFormulaDisplay,
                negativeReading: negative.discourseFrame.interrogativeReadingActive,
                negativeReason: negative.discourseFrame.noninterrogativeReason,
                noninitialReason: noninitial.discourseFrame.noninterrogativeReason,
                whoFormula: who.formulaRealization,
                hostileReason: hostileWho.blockReason,
            };
        })(),
        {
            positiveFormula: "#0-0(tl-eh)0-0#",
            positiveReading: true,
            writing: "write-pronominal-nnc-and-in-separately",
            dependentSurface: "Tleh in …?",
            dependentFormula: "#0-0(tl-eh)0-0# in …?",
            negativeReading: false,
            negativeReason: "negative-pronominal-nnc-loses-interrogative-quality",
            noninitialReason: "noninitial-pronominal-nnc-loses-interrogative-quality",
            whoFormula: "#0-0(ā-0)c-0#",
            hostileReason: "ac-interrogative-requires-third-singular-subject",
        }
    );

    s.eq(
        "Lesson 16 discourse finalizes inherent interrogative punctuation after the lower NNC formula",
        (() => {
            const positive = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", clauseInitial: true,
            });
            const negative = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", polarity: "negative",
            });
            const noninitial = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", clauseInitial: false,
            });
            const realize = (frame, polarity) => ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(
                frame.nncSlotFrame,
                {
                    sentenceType: "statement",
                    polarity,
                    discourseFrame: frame.discourseFrame,
                    formulaArtifact: "#FAKE(wrong)past#",
                }
            );
            const positiveSentence = realize(positive, "positive");
            const negativeSentence = realize(negative, "negative");
            const noninitialSentence = realize(noninitial, "positive");
            return {
                lowerFormula: positive.formulaRealization,
                positiveFormula: positiveSentence.sentenceFormulaDisplay,
                positiveSurface: positiveSentence.sentenceSurface,
                consumedNncStatus: positiveSentence.consumedNuclearClauseStatus,
                compositionOperation: positiveSentence.sentenceCompositionOperationId,
                negativeSurface: negativeSentence.sentenceSurface,
                noninitialSurface: noninitialSentence.sentenceSurface,
                containsFake: `${positiveSentence.sentenceFormulaDisplay}${positiveSentence.sentenceSurface}`.includes("FAKE"),
            };
        })(),
        {
            lowerFormula: "#0-0(ā-0)c-0#",
            positiveFormula: "#0-0(ā-0)c-0#?",
            positiveSurface: "Āc?",
            consumedNncStatus: "complete",
            compositionOperation: "nnc-sentence-composition",
                negativeSurface: "Ayāc.",
            noninitialSurface: "Āc.",
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 16 elliptical in fusions are typed sentence operations and source-specific",
        (() => {
            const build = (interrogativeKind, subject, adjunctorInMode) => {
                const contextSelectionRecord = ctx.buildClassicalNahuatlContextSelectionRecord({
                    subtype: "interrogative",
                    interrogativeKind,
                    subject,
                    adjunctorInMode,
                });
                const frame = ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "interrogative",
                    interrogativeKind,
                    subject,
                    contextSelectionRecord,
                });
                const sentence = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(
                    frame.nncSlotFrame,
                    {
                        sentenceType: "statement",
                        polarity: "positive",
                        discourseFrame: frame.discourseFrame,
                    }
                );
                return { contextSelectionRecord, frame, sentence };
            };
            const tlein = build("tleh", "3sg", "fused-tlein");
            const tlei = build("tleh", "3sg", "fused-tlei");
            const tlen = build("tleh", "3sg", "fused-tlen");
            const aquin = build("āc", "3sg", "fused-aquin");
            const aqui = build("āc", "3sg", "fused-aqui");
            const hostile = ctx.buildClassicalNahuatlAdjunctorInFrame({
                subtype: "interrogative",
                interrogativeKind: "tleh",
                subject: "3sg",
                adjunctorInMode: "fused-aquin",
            });
            return {
                surfaces: [
                    tlein.sentence.sentenceSurface,
                    tlei.sentence.sentenceSurface,
                    tlen.sentence.sentenceSurface,
                    aquin.sentence.sentenceSurface,
                    aqui.sentence.sentenceSurface,
                ],
                formula: tlein.sentence.sentenceFormulaDisplay,
                lowerFormulaUnchanged: tlein.frame.formulaRealization,
                writing: tlein.sentence.adjunctWritingPolicy,
                canonicalNuclearSurface: tlein.sentence.canonicalNuclearSurface,
                fusedSurface: tlein.sentence.fusedAdjunctorInSurface,
                hostile: [hostile.authorizationStatus, hostile.blockReason],
                stringAuthority: tlein.contextSelectionRecord.adjunctorInFrame.surfaceStringAuthority,
            };
        })(),
        {
            surfaces: ["Tlein?", "Tlei?", "Tlen?", "Āquin?", "Aqui?"],
            formula: "#0-0(tl-eh)0-0# +in?",
            lowerFormulaUnchanged: "#0-0(tl-eh)0-0#",
            writing: "fuse-in-after-dependent-clause-ellipsis",
            canonicalNuclearSurface: "tleh",
            fusedSurface: "tlein",
            hostile: ["blocked", "selected-adjunctor-in-mode-not-authorized-for-pronominal-source"],
            stringAuthority: false,
        }
    );

    s.eq(
        "Lesson 16 interrogative paradigm plan enumerates separate and elliptical in consequences",
        (() => {
            const plan = ctx.buildClassicalNahuatlPronominalParadigmPlan({
                subtype: "interrogative",
                interrogativeKind: "tleh",
                enteredStem: "tl-eh",
            });
            return {
                status: plan.authorizationStatus,
                registry: ctx.inspectRegisteredGrammarContract(
                    ctx.getDefaultGrammarContractRegistry(),
                    plan
                ).status,
                modes: Array.from(new Set(plan.coordinates.map(
                    coordinate => coordinate.adjunctorInMode
                ))),
                positions: Array.from(new Set(plan.coordinates.map(
                    coordinate => coordinate.clausePosition
                ))),
                allScalarEquivalent: plan.coordinates.every(coordinate =>
                    Boolean(coordinate.formulaRealization)
                    && coordinate.contextSelectionRecord.adjunctorInFrame.mode
                        === coordinate.adjunctorInMode
                ),
            };
        })(),
        {
            status: "authorized",
            registry: "valid",
            modes: ["none", "dependent-clause", "fused-tlein", "fused-tlei", "fused-tlen"],
            positions: ["initial", "noninitial"],
            allScalarEquivalent: true,
        }
    );

    s.eq(
        "Lesson 16 cā plus tl-e-in plural applies the Canvas stem alternation before fixed m-eh",
        (() => {
            const build = (pluralConnector) => ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative",
                interrogativeKind: "cā",
                compoundInterrogativeStem: "cā-tl-e-in",
                compoundInterrogativeEmbed: "cā",
                compoundInterrogativeMatrix: "tl-e-in",
                compoundInterrogativeNumberClass: "zero",
                subject: "3pl",
                pluralConnector,
                enteredStem: "cā-tl-e-in",
                requireEnteredStem: true,
            });
            const authorized = build("m-eh");
            const hostile = build("t-in");
            return {
                status: authorized.authorizationStatus,
                formula: authorized.formulaRealization,
                predicateStem: authorized.numberFrame.predicateStem,
                stemAction: authorized.numberFrame.predicateStemAction,
                witness: authorized.numberFrame.legalWitnessTagIds,
                hostileStatus: hostile.authorizationStatus,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0(cā-tl-e-i)m-eh#",
            predicateStem: "cā-tl-e-i",
            stemAction: "realize-final-in-as-i-before-m-eh",
            witness: ["cn-l16-161-pronominal-family", "cn-l16-164-identificational-interrogative", "cn-l16-1643-ca-tlein-plural"],
            hostileStatus: "blocked",
            hostileReason: "ca-tlein-plural-number-dyad-must-be-m-eh",
        }
    );

    s.eq(
        "Lesson 16 demonstratives remain invariant third-person stems while plural is reported silently by the subject",
        [
            ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "demonstrative", demonstrative: "īn", subject: "3sg" }),
            ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "demonstrative", demonstrative: "īn", subject: "3pl" }),
            ctx.buildClassicalNahuatlPronominalNncFrame({ subtype: "demonstrative", demonstrative: "ōn", subject: "3pl" }),
        ].map((frame) => ({ formula: frame.formulaRealization, internalPlural: frame.numberFrame.internalPluralMorph })),
        [
            { formula: "#0-0(īn)0-0#", internalPlural: "none" },
            { formula: "#0-0(īn)⎕-⎕#", internalPlural: "none" },
            { formula: "#0-0(ōn)⎕-⎕#", internalPlural: "none" },
        ]
    );

    s.eq(
        "Lesson 16 plural proximal demonstrative accepts the PDF stem with vowel length intact",
        (() => {
            const frame = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "demonstrative",
                demonstrative: "īn",
                subject: "3pl",
                enteredStem: "īn",
                requireEnteredStem: true,
            });
            return {
                status: frame.authorizationStatus,
                enteredStemMatches: frame.sourceFrame.enteredStemMatchesAnalysis,
                formula: frame.formulaRealization,
                blockReason: frame.blockReason,
            };
        })(),
        {
            status: "authorized",
            enteredStemMatches: true,
            formula: "#0-0(īn)⎕-⎕#",
            blockReason: "",
        }
    );

    s.eq(
        "Lesson 16 indefinite compounds expose the ah matrix and gate human itlah use",
        (() => {
            const someone = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "someone", subject: "1pl",
            });
            const blockedSomething = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "something", subject: "2sg",
            });
            const selectedSomething = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "something", subject: "2sg",
                contextSelectionRecord: ctx.buildClassicalNahuatlContextSelectionRecord({
                    subtype: "indefinite", indefiniteKind: "something", subject: "2sg",
                    specialHumanUseSelected: true,
                }),
            });
            return {
                formula: someone.formulaRealization,
                composition: someone.sourceFrame.composition,
                blockedReason: blockedSomething.blockReason,
                selectedFormula: selectedSomething.formulaRealization,
            };
        })(),
        {
            formula: "#t-0(a-c-ah)m-eh#",
            composition: { embed: "a-c", matrix: "ah", embedVowelLengthAction: "remove-length-before-ah-matrix" },
            blockedReason: "itlah-with-human-subject-requires-special-situation-selection",
            selectedFormula: "#t-0(itl-ah)0-0#",
        }
    );

    s.eq(
        "Lesson 16 special human itlah applies to third person as well as first and second person",
        (() => {
            const plan = ctx.buildClassicalNahuatlPronominalParadigmPlan({
                subtype: "indefinite",
                indefiniteKind: "something",
                enteredStem: "itl-ah",
            });
            const source = ctx.issueCanonicalNncSourceFrame({
                stem: "itl-ah",
                embedStem: "itl",
                matrixStem: "ah",
            });
            const thirdSingularChoices = ctx.getCanonicalNncOperationSelectionFrame(source, {
                subject: "3sg",
                animacy: "animate",
            });
            const thirdPluralChoices = ctx.getCanonicalNncOperationSelectionFrame(source, {
                subject: "3pl",
                animacy: "animate",
            });
            const selectedThirdSingular = ctx.issueCanonicalNncOperationFrame(source, {
                subject: "3sg",
                specialHumanUse: true,
            });
            const selectedThirdSingularResult = ctx.requestClassicalPronominalNncResult(
                source,
                selectedThirdSingular,
            );
            return {
                planSubjects: Array.from(new Set(plan.coordinates.map((coordinate) => coordinate.subject))),
                thirdSingularChoiceAvailable: thirdSingularChoices.specialHumanUseAvailable,
                thirdPluralChoiceAvailable: thirdPluralChoices.specialHumanUseAvailable,
                selectedThirdSingularStatus: selectedThirdSingular.authorizationStatus,
                selectedThirdSingularFormula: selectedThirdSingularResult.formulaRealization,
            };
        })(),
        {
            planSubjects: ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"],
            thirdSingularChoiceAvailable: true,
            thirdPluralChoiceAvailable: true,
            selectedThirdSingularStatus: "authorized",
            selectedThirdSingularFormula: "#0-0(itl-ah)0-0#",
        }
    );

    s.eq(
        "Lesson 16 contextual choices require typed records and ignore fused or printed claims",
        (() => {
            const looseDoubled = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound", subject: "1pl", doubledFirstPluralPerson: true,
            });
            const looseDependent = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg",
                adjunctClausePresent: true,
            });
            const looseHuman = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "something", subject: "2sg", specialHumanUse: true,
            });
            const fusedSource = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg",
                enteredStem: "tl-e-in", requireEnteredStem: true,
                formulaArtifact: "#0-0(tl-eh)0-0# in dependent-clause",
            });
            const stringRecord = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg",
                contextSelectionRecord: "dependent-in-present",
            });
            return {
                looseDoubled: looseDoubled.blockReason,
                looseDependent: looseDependent.blockReason,
                looseHuman: looseHuman.blockReason,
                fusedSource: fusedSource.blockReason,
                fusedSelected: fusedSource.discourseFrame.dependentClauseIntroducedByIn,
                stringRecord: stringRecord.blockReason,
            };
        })(),
        {
            looseDoubled: "loose-lesson16-context-claims-are-not-authority",
            looseDependent: "loose-lesson16-context-claims-are-not-authority",
            looseHuman: "loose-lesson16-context-claims-are-not-authority",
            fusedSource: "entered-stem-does-not-match-selected-pronominal-nnc-analysis",
            fusedSelected: false,
            stringRecord: "typed-lesson16-context-selection-record-required",
        }
    );

    s.eq(
        "Lesson 15.3 realizes an NNC sentence from typed slots and ignores a hostile formula artifact",
        (() => {
            const someone = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "someone", subject: "1pl",
                formulaArtifact: "#FAKE(wrong)past#",
            });
            const statement = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(someone.nncSlotFrame, {
                sentenceType: "statement",
                polarity: "positive",
                formulaArtifact: "#FAKE(wrong)past#",
            });
            const question = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(someone.nncSlotFrame, {
                sentenceType: "question-cuix",
                polarity: "positive",
            });
            const negative = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(someone.nncSlotFrame, {
                sentenceType: "statement",
                polarity: "negative",
            });
            return {
                status: statement.authorizationStatus,
                formula: statement.baseNncFormula,
                sentenceFormula: statement.sentenceFormulaDisplay,
                surface: statement.sentenceSurface,
                question: question.sentenceSurface,
                negative: negative.sentenceSurface,
                stringAuthority: statement.formulaStringAuthority,
                containsFake: `${statement.sentenceFormulaDisplay}${statement.sentenceSurface}`.includes("FAKE"),
            };
        })(),
        {
            status: "authorized",
            formula: "#t-0(a-c-ah)m-eh#",
            sentenceFormula: "#t-0(a-c-ah)m-eh#.",
            surface: "Tacahmeh.",
            question: "Cuix tacahmeh?",
            negative: "Ahtacahmeh.",
            stringAuthority: false,
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 16 quantitive matrices are compositional and their allomorph is typed rather than guessed",
        (() => {
            const quich = ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "quich", quantitiveEmbed: "ix",
                }),
            });
            const qui = ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "qui", quantitiveEmbed: "miye",
                    matrixAllomorph: "qui",
                }),
                pluralConnector: "silent-silent",
            });
            const hostile = ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "qui", quantitiveEmbed: "miye",
                    matrixAllomorph: "chi",
                }),
            });
            return {
                quichFormula: quich.formulaRealization,
                quichComposition: quich.sourceFrame.composition,
                quiFormula: qui.formulaRealization,
                quiInternalPlural: qui.numberFrame.internalPluralMorph,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            quichFormula: "#t-0(ix-qui-ch)t-in#",
            quichComposition: {
                embed: "ix", matrixFamily: "qui-ch", matrixAllomorph: "qui-ch",
                matrixAllomorphSelectionAuthority: "typed-engine-source-analysis", predicatePluralization: "plain-qui-ch",
                deploymentFullyPredictable: false,
            },
            quiFormula: "#ti-0(miye-quī-n)⎕-⎕#",
            quiInternalPlural: "n-inside-stem",
            hostileReason: "selected-quantitive-matrix-form-not-authorized-for-family",
        }
    );

    s.eq(
        "Lesson 16 qui and chi families distinguish internal-n plural from lexically authorized plain variants",
        [
            ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "chi", quantitiveEmbed: "mo",
                    matrixAllomorph: "chi",
                }),
                pluralConnector: "t-in",
            }),
            ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "chi", quantitiveEmbed: "mo",
                    matrixAllomorph: "ch", plainPluralVariantAuthorized: true,
                }),
                pluralConnector: "t-in",
            }),
            ctx.buildClassicalNahuatlPronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "qui", quantitiveEmbed: "iz",
                    matrixAllomorph: "quī", plainPluralVariantAuthorized: true,
                }),
                pluralConnector: "m-eh",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            internalPlural: frame.numberFrame.internalPluralMorph,
            subjectDyad: `${frame.numberFrame.num1}-${frame.numberFrame.num2}`,
        })),
        [
            { status: "authorized", formula: "#ti-0(mo-chī-n)t-in#", internalPlural: "n-inside-stem", subjectDyad: "t-in" },
            { status: "authorized", formula: "#ti-0(mo-ch)t-in#", internalPlural: "none", subjectDyad: "t-in" },
            { status: "authorized", formula: "#t-0(iz-quī)m-eh#", internalPlural: "none", subjectDyad: "m-eh" },
        ]
    );

    s.eq(
        "Lesson 16 citation aliases preserve the canonical operation family while boundary realization supplies long quī before internal n",
        (() => {
            const record = ctx.buildClassicalNahuatlQuantitiveAuthorityRecord({
                subject: "1pl",
                sourceStem: "miye-c",
                matrixFamily: "qui",
                matrixForm: "c",
                embedStem: "miye",
                predicatePluralization: "internal-n",
            });
            const frame = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "quantitive",
                subject: "1pl",
                quantitiveAuthorityRecord: record,
                pluralConnector: "t-in",
            });
            return {
                recordStatus: record.authorizationStatus,
                canonicalSourceStem: record.sourceAnalysis.canonicalSourceStem,
                selectedFormOperations: record.sourceAnalysis.selectedMatrixFormPluralizations,
                familyOperations: record.sourceAnalysis.allowedPluralizations,
                pluralizedStem: record.pluralizedStem,
                frameStatus: frame.authorizationStatus,
                formula: frame.formulaRealization,
                surfaceConditionedFormSelectable: record.allowedMatrixForms.includes("quih"),
            };
        })(),
        {
            recordStatus: "authorized",
            canonicalSourceStem: "miye-qui",
            selectedFormOperations: ["plain-variant"],
            familyOperations: ["internal-n", "plain-variant"],
            pluralizedStem: "miye-quī-n",
            frameStatus: "authorized",
            formula: "#ti-0(miye-quī-n)t-in#",
            surfaceConditionedFormSelectable: false,
        }
    );

    s.eq(
        "Lesson 16 quantitive authority preserves vowel truth and fails closed on strings and unauthorized plural routes",
        (() => {
            const shortForm = ctx.buildClassicalNahuatlQuantitiveAuthorityRecord({
                subject: "3common", matrixFamily: "qui", matrixForm: "qui", embedStem: "iz",
            });
            const longForm = ctx.buildClassicalNahuatlQuantitiveAuthorityRecord({
                subject: "3common", matrixFamily: "qui", matrixForm: "quī", embedStem: "iz",
            });
            const forbiddenInternalN = ctx.buildClassicalNahuatlQuantitiveAuthorityRecord({
                subject: "1pl", matrixFamily: "qui-ch", matrixForm: "qui-ch", embedStem: "ix",
                predicatePluralization: "internal-n",
            });
            const unauthorisedPlainC = ctx.buildClassicalNahuatlQuantitiveAuthorityRecord({
                subject: "1pl", matrixFamily: "qui", matrixForm: "c", embedStem: "nehnemi",
                predicatePluralization: "plain-variant",
            });
            const typedC = ctx.buildClassicalNahuatlQuantitiveAuthorityRecord({
                subject: "3common", matrixFamily: "qui", matrixForm: "c", embedStem: "miye",
            });
            const contradictoryVisibleStem = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "quantitive", subject: "3common", quantitiveAuthorityRecord: typedC,
                enteredStem: "miye-quī", requireEnteredStem: true,
            });
            const looseStringClaim = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui",
                quantitiveEmbed: "iz", matrixAllomorph: "quī",
            });
            return {
                shortStem: shortForm.selectedStem,
                longStem: longForm.selectedStem,
                shareTypedValue: longForm.shortAndLongIShareTypedValue,
                forbiddenInternalN: forbiddenInternalN.blockReason,
                unauthorisedPlainC: unauthorisedPlainC.blockReason,
                contradictoryVisibleStem: contradictoryVisibleStem.blockReason,
                looseStringClaim: looseStringClaim.blockReason,
            };
        })(),
        {
            shortStem: "iz-qui",
            longStem: "iz-quī",
            shareTypedValue: false,
            forbiddenInternalN: "qui-ch-matrix-cannot-acquire-internal-plural-n",
            unauthorisedPlainC: "quantitive-source-not-licensed-by-lesson16-inventory",
            contradictoryVisibleStem: "entered-stem-does-not-match-selected-pronominal-nnc-analysis",
            looseStringClaim: "loose-lesson16-quantitive-claims-are-not-authority",
        }
    );

    s.eq(
        "Lesson 16 selected output ignores formula poison and proves the specialized active-layer path",
        (() => {
            const frame = ctx.buildClassicalNahuatlPronominalNncFrame({
                subtype: "personal-compound", subject: "3pl", pluralConnector: "t-in",
                formulaArtifact: "#x-0+FAKE(wrong)past+c-an#",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                containsFake: frame.formulaRealization.includes("FAKE"),
                artifactAuthority: frame.nncSlotFrame.formulaArtifactAuthority,
                requiredOperations: frame.operationEvaluationFrame.requiredOperationIds,
                appliedOperations: frame.operationEvaluationFrame.appliedOperationIds,
                resultOperation: frame.operationEvaluationFrame.resultOperationId,
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0(yeh-huā-n)t-in#",
            containsFake: false,
            artifactAuthority: "display-only-not-authority",
            requiredOperations: ["nnc-clause-shell", "nnc-pronominal-family"],
            appliedOperations: ["nnc-clause-shell", "nnc-pronominal-family"],
            resultOperation: "nnc-pronominal-family",
        }
    );

    s.eq(
        "typed NNC source authority surfaces lexical State availability and requires an explicit metaphorical exception",
        (() => {
            const natural = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("nān", {
                selectedState: "possessive",
                naturalPossessionPolicy: "naturally-possessed",
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const blockedNever = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("teōtl", {
                selectedState: "possessive",
                naturalPossessionPolicy: "never-possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const metaphoricalNever = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("teōtl", {
                selectedState: "possessive",
                naturalPossessionPolicy: "never-possessive",
                metaphoricalOverride: true,
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            return {
                natural: {
                    status: natural.authorizationStatus,
                    availability: natural.stateAvailability,
                    allowed: natural.allowedStateValues,
                    macron: natural.sourceStem,
                },
                blockedNever: {
                    status: blockedNever.authorizationStatus,
                    reason: blockedNever.blockReason,
                },
                metaphoricalNever: {
                    status: metaphoricalNever.authorizationStatus,
                    availability: metaphoricalNever.stateAvailability,
                    overrideUsed: metaphoricalNever.metaphoricalOverrideUsedForState,
                },
            };
        })(),
        {
            natural: {
                status: "authorized",
                availability: "possessive-only",
                allowed: ["possessive"],
                macron: "nān",
            },
            blockedNever: {
                status: "blocked",
                reason: "nounstem-never-possessive-without-metaphorical-override",
            },
            metaphoricalNever: {
                status: "authorized",
                availability: "absolutive-only",
                overrideUsed: true,
            },
        }
    );

    s.eq(
        "typed NNC source authority fails closed on contradictions and ignores formula and surface poison",
        (() => {
            const contradictory = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("āxcā", {
                selectedState: "possessive",
                naturalPossessionPolicy: "naturally-possessed",
                stateAvailability: "both",
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const poisoned = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("āxcā", {
                selectedState: "possessive",
                naturalPossessionPolicy: "naturally-possessed",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                formula: "#FAKE#",
                surface: "FAKE",
            });
            return {
                contradiction: {
                    status: contradictory.authorizationStatus,
                    reason: contradictory.blockReason,
                },
                poisoned: {
                    status: poisoned.authorizationStatus,
                    sourceStem: poisoned.sourceStem,
                    formulaAuthority: poisoned.formulaStringAuthority,
                    surfaceAuthority: poisoned.surfaceStringAuthority,
                    leakedFake: JSON.stringify(poisoned).includes("FAKE"),
                },
            };
        })(),
        {
            contradiction: {
                status: "blocked",
                reason: "natural-possession-policy-contradicts-state-availability",
            },
            poisoned: {
                status: "authorized",
                sourceStem: "āxcā",
                formulaAuthority: false,
                surfaceAuthority: false,
                leakedFake: false,
            },
        }
    );

    s.eq(
        "Lesson 16 finite source inventories reject forged compounds and inconsistent decomposition",
        (() => {
            const forgedDerived =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "personal-compound-derived",
                    subject: "3common",
                    derivedPersonalStem: "foo-eh-huā",
                });
            const forgedCa =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "interrogative",
                    interrogativeKind: "cā",
                    subject: "3sg",
                    compoundInterrogativeStem: "cā-foo",
                });
            const mismatchedCa =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "interrogative",
                    interrogativeKind: "cā",
                    subject: "3sg",
                    compoundInterrogativeStem: "cā-tl-eh",
                    compoundInterrogativeEmbed: "foo",
                    compoundInterrogativeMatrix: "tl-eh",
                });
            const forgedQuantitivePersonal =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "quantitive-personal-compound",
                    subject: "3sg",
                    quantitiveEmbed: "foo",
                    quantitivePersonalMatrix: "eh-huā",
                });
            const mismatchedQuantitive =
                ctx.buildClassicalNahuatlQuantitiveSourceAnalysis({
                    sourceStem: "miye-c",
                    embedStem: "foo",
                    matrixForm: "c",
                });
            return [
                [forgedDerived.authorizationStatus, forgedDerived.blockReason],
                [forgedCa.authorizationStatus, forgedCa.blockReason],
                [mismatchedCa.authorizationStatus, mismatchedCa.blockReason],
                [
                    forgedQuantitivePersonal.authorizationStatus,
                    forgedQuantitivePersonal.blockReason,
                ],
                [
                    mismatchedQuantitive.authorizationStatus,
                    mismatchedQuantitive.blockReason,
                ],
            ];
        })(),
        [
            ["blocked", "derived-personal-compound-stem-not-licensed"],
            ["blocked", "ca-compound-source-not-licensed-by-lesson16"],
            [
                "blocked",
                "ca-compound-decomposition-does-not-match-canonical-source",
            ],
            [
                "blocked",
                "quantitive-personal-compound-requires-mo-ch-embed",
            ],
            [
                "blocked",
                "quantitive-embed-does-not-match-canonical-source-identity",
            ],
        ]
    );

    s.eq(
        "Lesson 16 derived person and plural morphology ignore caller surface shortcuts",
        (() => {
            const thirdEh =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "personal-compound",
                    subject: "3sg",
                    thirdCommonVariant: "eh",
                });
            const plural =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "personal-compound",
                    subject: "3pl",
                    pluralConnector: "t-in",
                    plainPluralVariantAuthorized: true,
                    pluralizedStem: "FAKE-n",
                });
            return {
                thirdStem: thirdEh.sourceFrame.sourceStem,
                thirdFormula: thirdEh.formulaRealization,
                pluralStem: plural.numberFrame.predicateStem,
                pluralFormula: plural.formulaRealization,
                leakedFake: JSON.stringify(plural).includes("FAKE"),
            };
        })(),
        {
            thirdStem: "yeh-huā",
            thirdFormula: "#0-0(yeh-huā)tl-0#",
            pluralStem: "yeh-huā-n",
            pluralFormula: "#0-0(yeh-huā-n)t-in#",
            leakedFake: false,
        }
    );

    s.eq(
        "Lesson 16 source audit stays internal and cannot return to Grammar Result or paradigm presentation",
        (() => {
            const scalar =
                ctx.buildClassicalNahuatlPronominalNncFrame({
                    subtype: "personal-compound",
                    subject: "3pl",
                    pluralConnector: "t-in",
                });
            const plan =
                ctx.buildClassicalNahuatlPronominalParadigmPlan({
                    subtype: "interrogative",
                    interrogativeKind: "āc",
                    enteredStem: "ā-0",
                });
            const surface =
                ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "ā-0",
                    nncType: "interrogative-who",
                    nncState: "absolutive",
                    nncOutputScope: "single",
                    subject: "3sg",
                    sentenceSurfaceMode: "information-question",
                    sentenceNegativeMode: "positive",
                });
            const resultRows =
                ctx.buildClassicalRuleTransformationObservationRows(surface);
            return {
                contractHasAudit:
                    Object.prototype.hasOwnProperty.call(
                        scalar.lesson16GrammarContractFrame,
                        "sourceClosureFrame"
                    ),
                planHasAudit:
                    Object.prototype.hasOwnProperty.call(
                        plan,
                        "sourceClosureFrame"
                    ),
                resultHasAudit: resultRows.some(
                    (row) => row.kind === "lesson16-source-closure"
                ),
                lcmAxes:
                    scalar.lesson16GrammarContractFrame.leastCommonMultiple
                        .distinctionAxes,
                runtimeClosureBuilder:
                    typeof ctx.buildClassicalNahuatlLesson16ClosureFrame,
                sourceEvidenceBoundary:
                    scalar.lesson16GrammarContractFrame
                        .sourceEvidenceBoundary,
            };
        })(),
        {
            contractHasAudit: false,
            planHasAudit: false,
            resultHasAudit: false,
            lcmAxes: [
                "semantic-kind",
                "entitive-subtype",
                "typed-source-analysis",
                "subject-person",
                "subject-number",
                "predicate-structural-plural-type",
                "predicate-internal-plural-n",
                "subject-number-dyad",
                "compound-number-variant",
                "quantitive-matrix-family",
                "quantitive-matrix-allomorph",
                "quantitive-plural-strategy",
                "interrogative-identity",
                "clause-position",
                "polarity",
                "interrogative-force",
                "dependent-in-writing",
                "doubled-first-plural",
                "special-human-itlah-use",
            ],
            runtimeClosureBuilder: "undefined",
            sourceEvidenceBoundary:
                "test-only-not-imported-by-production-grammar",
        }
    );

    return s;
}

module.exports = { run };
