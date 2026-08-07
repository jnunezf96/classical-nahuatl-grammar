"use strict";

/**
 * Tests for src/core/clause/clause.mjs
 */

const { createSuite } = require("./runner");
const fs = require("fs");
const path = require("path");

const CLAUSE_SOURCE = fs.readFileSync(
    path.resolve(__dirname, "..", "core", "clause", "clause.mjs"),
    "utf8"
);

function compactShell(shell) {
    return shell && {
        kind: shell.kind,
        version: shell.version,
        clauseKind: shell.clauseKind,
        displayLabel: shell.displayLabel,
        formulaType: shell.formulaType,
        formulaAbbreviation: shell.formulaAbbreviation,
        formulaLabel: shell.formulaLabel,
        terminology: shell.terminology,
        formula: shell.formula,
        expandedFormula: shell.expandedFormula,
        formulaSlots: shell.formulaSlots,
        formulaEcho: shell.formulaEcho,
        lesson4ActiveFormula: shell.lesson4?.activeFormula || null,
        organizationalLayers: shell.organizationalLayers,
        personalPronounCases: shell.personalPronounFrame?.cases || null,
        hasTensePosition: shell.hasTensePosition,
        generationAllowed: shell.generationAllowed,
        slots: shell.slots,
    };
}

function run(ctx) {
    const s = createSuite("clause");

    s.eq(
        "canonical clause shell and typed valence APIs remain installed",
        [
            typeof ctx.buildNuclearClauseShellMetadata,
            typeof ctx.buildVerbalNuclearClauseShell,
            typeof ctx.buildNominalNuclearClauseShell,
            typeof ctx.buildNuclearClauseFrame,
            typeof ctx.getClassicalValenceGoverningInventory,
            typeof ctx.buildClassicalValenceGoverningFrame,
        ],
        Array.from({ length: 6 }, () => "function")
    );

    s.eq(
        "retired route-board, obstacle, statistics, pursuit, and PDF authority carriers are absent",
        (() => {
            const retiredApis = [
                "buildAndrewsCnvCnnRouteBoard",
                "getAndrewsCnvCnnBackAndForthObstacleCatalog",
                "buildAndrewsCnvCnnBackAndForthResistanceStatistics",
                "buildAndrewsCnvCnnBackAndForthAudit",
                "getAndrewsCnvCnnSurfaceInputCandidateFrame",
                "buildAndrewsCnvCnnBackAndForthRouteActionContract",
                "buildNuclearClauseLesson4PursuitFrame",
                "ANDREWS_CNV_CNN_BACK_AND_FORTH_ROUTE_RECORDS",
            ];
            const retiredSourceCarriers = [
                "pdfSearchTerm:",
                "pdfPages:",
                "\"Andrews PDF\"",
                "\"direct-pdf\"",
                "RouteBoard",
                "ObstacleCatalog",
                "ResistanceStatistics",
                "PursuitFrame",
            ];
            return {
                exported: retiredApis.filter((key) =>
                    Object.prototype.hasOwnProperty.call(ctx, key)
                ),
                sourceCarriers: retiredSourceCarriers.filter((carrier) =>
                    CLAUSE_SOURCE.includes(carrier)
                ),
            };
        })(),
        {
            exported: [],
            sourceCarriers: [],
        }
    );

    s.eq(
        "Lesson 4 subsection inventory indexes Canvas evidence without granting generation",
        (() => {
            const inventory = ctx.getNuclearClauseSubsectionInventory();
            const frame = ctx.buildNuclearClauseFrame({
                formulaType: "VNC",
                predicatePositionStatus: "monadic",
            });
            return {
                sections: inventory.map((entry) => entry.andrewsSection),
                canvasRefs: frame.canvasRefs,
                categories: inventory.map((entry) => entry.category),
                redirectActions: inventory.map((entry) => entry.redirectAction),
                generationAllowed: inventory.map((entry) => entry.generationAllowed),
                validationRefs: inventory.map((entry) => entry.validationRefs),
                subsectionCount: frame.subsectionInventory.length,
            };
        })(),
        {
            sections: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6"],
            canvasRefs: [
                "Andrews Lesson 4.1",
                "Andrews Lesson 4.2",
                "Andrews Lesson 4.3",
                "Andrews Lesson 4.4",
                "Andrews Lesson 4.5",
                "Andrews Lesson 4.6",
            ],
            categories: [
                "nuclear-clause-scope",
                "vnc-nnc-kinds",
                "formula-stage-1",
                "formula-stage-2",
                "formula-stage-3",
                "personal-pronouns",
            ],
            redirectActions: ["reframe-metadata", "reframe-metadata", "keep", "keep", "keep", "diagnostic-only"],
            generationAllowed: [false, false, false, false, false, false],
            validationRefs: Array.from({ length: 6 }, () => ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"]),
            subsectionCount: 6,
        }
    );

    s.eq(
        "Lesson 4 exposes six staged formulas and affixal pronoun case boundaries",
        (() => {
            const inventory = ctx.getNuclearClauseFormulaInventory();
            const frame = ctx.buildNuclearClauseFrame({
                formulaType: "NNC",
                predicatePositionStatus: "monadic",
            });
            return {
                vocableScope: frame.vocableScopeFrame,
                formulaBoundaries: inventory.formulaBoundaryFrame,
                subjectFrame: inventory.subjectFrame,
                positionComplexity: inventory.positionComplexityFrame.positions,
                stage1: inventory.stage1.formula,
                stage2Vnc: inventory.stage2.formulas.VNC,
                stage2Nnc: inventory.stage2.formulas.NNC,
                vncFormulas: inventory.stage3.VNC.map((entry) => entry.formula),
                nncFormulas: inventory.stage3.NNC.map((entry) => entry.formula),
                activeFormula: frame.activeFormula.formula,
                activeStatus: frame.activeFormula.predicatePositionStatus,
                layerKeys: frame.organizationalLayers.map((entry) => entry.key),
                pronounForm: frame.personalPronounFrame.form,
                pronounMinimumMorphemeCount: frame.personalPronounFrame.minimumMorphemeCount,
                pronounsAreOnlyReferringElements: frame.personalPronounFrame.onlyReferringElements,
                pronounNoGender: frame.personalPronounFrame.noGender,
                pronounCategories: frame.personalPronounFrame.categories,
                pronounCategoryFeatures: frame.personalPronounFrame.categoryFeatures,
                objectiveOccursIn: frame.personalPronounFrame.cases.objective.occursIn,
                possessiveOccursIn: frame.personalPronounFrame.cases.possessive.occursIn,
                boundaries: frame.boundaries,
            };
        })(),
        {
            vocableScope: {
                sourceSection: "Andrews §4.1",
                appliesTo: "all-non-particle-vocables",
                excludedFormalClass: "particle",
                unitKind: "nuclear-clause",
                requiredFunctions: ["subject", "predicate"],
                isMorphologicalWord: false,
                rejectsSentenceWordLabel: true,
                useRoles: ["simple-sentence", "main-clause", "dependent-clause", "conjoined-clause"],
            },
            formulaBoundaries: {
                sourceSections: ["Andrews §4.3", "Andrews §4.4", "Andrews §4.5"],
                foreAftBoundary: "#",
                positionBoundary: "+",
                subpositionBoundary: "-",
                stemBoundary: "()",
                vacantPositionSymbol: "absence",
                formulaRepresentsSlotCategories: true,
                formulaRepresentsMorphicFillers: true,
                formulaIsEngineContract: true,
                surfaceGenerationAuthority: false,
                orthographyCannotChangeSlotOrder: true,
                stemDimensionsExplicit: true,
            },
            subjectFrame: {
                sourceSection: "Andrews §4.4",
                role: "subject",
                structure: "discontinuous-circumfix",
                prefixPosition: "person",
                suffixPosition: "number",
                genericFormula: "#person+...+number#",
                occursIn: ["VNC", "NNC"],
            },
            positionComplexity: {
                person: { complexity: "dyadic", subpositions: ["pers1", "pers2"] },
                number: { complexity: "dyadic", subpositions: ["num1", "num2"] },
                tense: { complexity: "monadic", slot: "tns", occursIn: ["VNC"] },
                valence: {
                    complexityOptions: ["dyadic", "monadic", "vacant"],
                    slotsByStatus: { dyadic: "va1-va2", monadic: "va", vacant: "Ø" },
                    occursIn: ["VNC"],
                },
                state: {
                    complexityOptions: ["dyadic", "monadic", "vacant"],
                    slotsByStatus: { dyadic: "st1-st2", monadic: "st", vacant: "Ø" },
                    occursIn: ["NNC"],
                },
                stem: { complexityOptions: ["monadic", "polyadic"], lessonsDeferredTo: ["Lesson 7", "Lesson 14"] },
            },
            stage1: "Subject + Predicate",
            stage2Vnc: "#person+valence(STEM)tense+number#",
            stage2Nnc: "#person+state(STEM)number#",
            vncFormulas: [
                "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                "#pers1-pers2+va(STEM)tns+num1-num2#",
                "#pers1-pers2(STEM)tns+num1-num2#",
            ],
            nncFormulas: [
                "#pers1-pers2+st1-st2(STEM)num1-num2#",
                "#pers1-pers2+st(STEM)num1-num2#",
                "#pers1-pers2(STEM)num1-num2#",
            ],
            activeFormula: "#pers1-pers2+st(STEM)num1-num2#",
            activeStatus: "monadic",
            layerKeys: ["nounstem", "nouncore", "nnc"],
            pronounForm: "affixal-only",
            pronounMinimumMorphemeCount: 2,
            pronounsAreOnlyReferringElements: true,
            pronounNoGender: true,
            pronounCategories: ["person", "animacy", "humanness", "number", "case"],
            pronounCategoryFeatures: {
                person: ["first", "second", "third"],
                animacy: ["animate", "nonanimate"],
                humanness: ["human", "nonhuman"],
                number: { animate: ["singular", "plural"], nonanimate: ["common"] },
                case: ["nominative", "objective", "possessive"],
            },
            objectiveOccursIn: ["VNC"],
            possessiveOccursIn: ["NNC"],
            boundaries: {
                formulaInventoryIsNotGeneration: true,
                subjectAndPredicateRequired: true,
                stemIsFoundation: true,
                personalPronounsAreAffixalOnly: true,
                objectiveCaseOnlyInVncPredicate: true,
                possessiveCaseOnlyInNncPredicate: true,
            },
        }
    );

    s.eq(
        "Lesson 6 typed owner maps Andrews va and va1-va2 directly to Classical morphs",
        (() => {
            const inventory = ctx.getClassicalValenceGoverningInventory();
            const summarize = (value, options = {}) => {
                const frame = ctx.buildClassicalValenceGoverningFrame(value, options);
                return frame ? {
                    value,
                    governingPath: frame.governingPath,
                    sourceSections: frame.sourceSections,
                    formula: frame.formula,
                    valencePosition: frame.valencePosition,
                    classicalMorph: frame.classicalMorph || "",
                    classicalDyad: frame.classicalDyad || "",
                    surfaceMorph: frame.surfaceMorph || "",
                    visibleFormulaPrefix: frame.visibleFormulaPrefix || "",
                    va: frame.va?.morph || "",
                    va1: frame.va1?.morph || "",
                    va2: frame.va2?.morph || "",
                    stemCondition: frame.stemCondition || "",
                } : null;
            };
            return {
                kind: inventory.kind,
                sourceSections: inventory.sourceSections,
                formulas: [
                    inventory.monadic.formula,
                    inventory.dyadicSpecificProjective.formula,
                    inventory.dyadicMainlineReflexive.formula,
                ],
                frames: [
                    summarize("tla"),
                    summarize("mitz", { visibleFormulaPrefix: "m-itz" }),
                    summarize("mo", { stem: "miki", visibleFormulaPrefix: "m-o" }),
                    summarize("mo", { stem: "ita", visibleFormulaPrefix: "m-0" }),
                    summarize("quin", { visibleFormulaPrefix: "qu-in" }),
                ],
                retiredAlternateLane: summarize("kinh"),
            };
        })(),
        {
            kind: "andrews-lesson-6-classical-valence-governing-frame",
            sourceSections: ["Andrews §6.2", "Andrews §6.3", "Andrews §6.4", "Andrews §6.5", "Andrews §6.6"],
            formulas: [
                "#pers1-pers2+va(STEM)tns+num1-num2#",
                "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
            ],
            frames: [
                {
                    value: "tla",
                    governingPath: "monadic-nonspecific-projective-nonhuman",
                    sourceSections: ["Andrews §6.2"],
                    formula: "#pers1-pers2+va(STEM)tns+num1-num2#",
                    valencePosition: "va",
                    classicalMorph: "tla",
                    classicalDyad: "",
                    surfaceMorph: "tla",
                    visibleFormulaPrefix: "tla",
                    va: "tla",
                    va1: "",
                    va2: "",
                    stemCondition: "",
                },
                {
                    value: "mitz",
                    governingPath: "dyadic-specific-projective-non-third",
                    sourceSections: ["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"],
                    formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    valencePosition: "va1-va2",
                    classicalMorph: "",
                    classicalDyad: "m-itz",
                    surfaceMorph: "mitz",
                    visibleFormulaPrefix: "m-itz",
                    va: "",
                    va1: "m",
                    va2: "itz",
                    stemCondition: "",
                },
                {
                    value: "mo",
                    governingPath: "dyadic-mainline-reflexive-reciprocative",
                    sourceSections: ["Andrews §6.6"],
                    formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    valencePosition: "va1-va2",
                    classicalMorph: "",
                    classicalDyad: "m-o",
                    surfaceMorph: "mo",
                    visibleFormulaPrefix: "m-o",
                    va: "",
                    va1: "m",
                    va2: "o",
                    stemCondition: "consonant-initial-stem",
                },
                {
                    value: "mo",
                    governingPath: "dyadic-mainline-reflexive-reciprocative",
                    sourceSections: ["Andrews §6.6"],
                    formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    valencePosition: "va1-va2",
                    classicalMorph: "",
                    classicalDyad: "m-0",
                    surfaceMorph: "m",
                    visibleFormulaPrefix: "m-0",
                    va: "",
                    va1: "m",
                    va2: "0",
                    stemCondition: "vowel-initial-stem-allomorph",
                },
                {
                    value: "quin",
                    governingPath: "dyadic-specific-projective-third",
                    sourceSections: ["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"],
                    formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    valencePosition: "va1-va2",
                    classicalMorph: "",
                    classicalDyad: "qu-im",
                    surfaceMorph: "quin",
                    visibleFormulaPrefix: "qu-in",
                    va: "",
                    va1: "qu",
                    va2: "in",
                    stemCondition: "",
                },
            ],
            retiredAlternateLane: null,
        }
    );

    s.eq(
        "Lesson 4 frame covers clause use predicate function tree controls and pronoun resolution",
        (() => {
            const frame = ctx.buildNuclearClauseFrame({
                formulaType: "VNC",
                predicatePositionStatus: "dyadic",
                predicatePositionStatusSource: "explicit",
                usageRole: "dependent",
                slots: {
                    pers1Pers2: { slot: "pers1-pers2", prefix: "ni", suffix: "" },
                    obj1: { slot: "obj1", prefix: "c", role: "mainline-object" },
                    predicateStem: { slot: "STEM", stem: "nemi" },
                    tensePosition: { slot: "tns", label: "presente" },
                },
            });
            return {
                useRole: frame.useFrame.activeRole,
                useOptions: frame.useFrame.options.map((entry) => entry.role),
                functionLabel: frame.predicateFunctionProfile.labelEs,
                functionValues: frame.predicateFunctionProfile.predicatorValuesEs,
                treeTop: frame.diagramTree.root.children.map((entry) => entry.key),
                subjectTree: frame.diagramTree.root.children[0].children.map((entry) => `${entry.key}:${entry.slot || ""}`),
                predicateTree: frame.diagramTree.root.children[1].children.map((entry) => entry.key),
                coreTree: frame.diagramTree.root.children[1].children[0].children.map((entry) => `${entry.key}:${entry.slot || ""}`),
                activeSlot: frame.predicatePositionControl.activeSlot,
                optionSlots: frame.predicatePositionControl.options.map((entry) => entry.predicatePositionSlot),
                diagnosticStatus: frame.predicatePositionControl.diagnosticStatus,
                pronouns: frame.personalPronounFrame.fillers.map((entry) => ({
                    caseKey: entry.caseKey,
                    display: entry.display,
                    person: entry.features?.person,
                    number: entry.features?.number,
                })),
                referenceStatus: frame.personalPronounFrame.referenceResolution.status,
                commonNumber: frame.personalPronounFrame.commonNumberResolution,
                diagnosticIds: frame.diagnostics.map((entry) => entry.id),
            };
        })(),
        {
            useRole: "dependent-clause",
            useOptions: ["simple-sentence", "main-clause", "dependent-clause", "conjoined-clause"],
            functionLabel: "CNV: predicado verbal",
            functionValues: ["verbo intransitivo", "verbo transitivo"],
            treeTop: ["subject", "predicate"],
            subjectTree: ["person:pers1-pers2", "number:num1-num2"],
            predicateTree: ["verbcore", "tense"],
            coreTree: ["valence:va1-va2", "stem:"],
            activeSlot: "va1-va2",
            optionSlots: ["va1-va2", "va", "Ø"],
            diagnosticStatus: "explicit",
            pronouns: [
                { caseKey: "nominative", display: "ni", person: 1, number: "sg" },
                { caseKey: "objective", display: "c", person: 3, number: "sg" },
            ],
            referenceStatus: "context-required",
            commonNumber: { ambiguous: true, status: "context-required" },
            diagnosticIds: [
                "lesson4-nuclear-clause-use-classified",
                "lesson4-predicate-position-explicit",
                "lesson4-objective-third-person-reference-context",
                "lesson4-objective-common-number-context",
            ],
        }
    );

    s.eq(
        "Lesson 4 CNN shell resolves possessive pronoun filler without adding tense",
        (() => {
            const shell = ctx.buildNuclearClauseShellMetadata({
                clauseKind: "nnc",
                usageRole: "simple-sentence",
                subject: { prefix: "", suffix: "" },
                predicate: {
                    stem: "kal",
                    state: "possessive",
                    stateSlot: {
                        possessorPrefix: "no",
                        predicatePositionStatus: "monadic",
                    },
                },
            });
            return {
                formula: shell.formula,
                useRole: shell.lesson4.useFrame.activeRole,
                functionLabel: shell.lesson4.predicateFunctionProfile.labelEs,
                activeSlot: shell.lesson4.predicatePositionControl.activeSlot,
                hasTensePosition: shell.hasTensePosition,
                pronouns: shell.lesson4.personalPronounFrame.fillers.map((entry) => ({
                    caseKey: entry.caseKey,
                    display: entry.display,
                    person: entry.features?.person,
                    number: entry.features?.number,
                })),
            };
        })(),
        {
            formula: "#pers1-pers2+st(STEM)num1-num2#",
            useRole: "simple-sentence",
            functionLabel: "CNN: predicado nominal",
            activeSlot: "st",
            hasTensePosition: false,
            pronouns: [
                { caseKey: "nominative", display: "Ø", person: 3, number: "sg" },
                { caseKey: "possessive", display: "no", person: 1, number: "sg" },
            ],
        }
    );

    s.eq(
        "VNC shell exposes subject predicate object and tense slots without generation",
        compactShell(ctx.buildNuclearClauseShellMetadata({
            clauseKind: "vnc",
            subject: { prefix: "ni", suffix: "" },
            object: { prefix: "c" },
            predicate: { stem: "nemi", valency: "intransitivo" },
            tenseValue: "presente",
            tenseLabel: "presente",
        })),
        {
            kind: "nuclear-clause-shell",
            version: 1,
            clauseKind: "verbal-nuclear-clause",
            displayLabel: "cláusula nuclear verbal (CNV)",
            formulaType: "VNC",
            formulaAbbreviation: "CNV",
            formulaLabel: "Fórmula CNV",
            terminology: {
                abbreviation: "CNV",
                english: "verbal nuclear clause",
                spanish: "cláusula nuclear verbal",
                conceptId: "vnc",
                legacyFormulaType: "VNC",
                semanticId: "verbal-nuclear-clause",
            },
            formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
            expandedFormula: "#pers1-pers2+obj1-obj2-obj3-reflexivo(STEM)tiempo+num1-num2#",
            formulaSlots: {
                pers1Pers2: {
                    slot: "pers1-pers2",
                    role: "subject",
                    prefix: "ni",
                    suffix: "",
                    displayPrefix: "ni",
                    displaySuffix: "Ø",
                    label: "",
                },
                obj1: {
                    slot: "obj1",
                    role: "mainline-object",
                    prefix: "c",
                    displayPrefix: "c",
                    isPresent: true,
                    label: "",
                },
                obj2: {
                    slot: "obj2",
                    role: "secondary-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                obj3: {
                    slot: "obj3",
                    role: "tertiary-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                reflexivo: {
                    slot: "reflexivo",
                    role: "reflexive-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                predicateStem: {
                    slot: "STEM",
                    role: "verbal-predicate",
                    stem: "nemi",
                    displayStem: "nemi",
                    valency: "intransitivo",
                },
                tensePosition: {
                    slot: "tns",
                    role: "tense-position",
                    tenseValue: "presente",
                    label: "indicativo presente",
                    compatibilityLabel: "presente",
                    morph: "Ø",
                    displayMorph: "Ø",
                    mood: "indicative",
                    andrewsTense: "present",
                    isPresent: true,
                    notAvailableInOrdinaryNnc: true,
                    andrewsSource: "Andrews §5.4.1/§5.5",
                    compatibilityRoute: "",
                },
                num1Num2: {
                    slot: "num1-num2",
                    role: "subject-number-connector",
                    connector: "",
                    displayConnector: "Ø-Ø",
                    num1: "",
                    num2: "",
                    belongsTo: "subject",
                    notTense: true,
                    andrewsSource: "Andrews §5.4",
                    connectorPattern: "",
                },
            },
            formulaEcho: "#ni-Ø+c(nemi)Ø+Ø-Ø#",
            lesson4ActiveFormula: {
                stage: 3,
                sourceSection: "Andrews §4.5",
                formulaType: "VNC",
                formulaAbbreviation: "CNV",
                predicatePosition: "valence",
                predicatePositionLabel: "valencia",
                predicatePositionStatus: "dyadic",
                predicatePositionStatusLabel: "diádica",
                predicatePositionSlot: "va1-va2",
                formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                generationAllowed: false,
            },
            organizationalLayers: [
                { level: 1, key: "verbstem", label: "verbstem", labelEs: "tronco verbal", role: "foundation" },
                { level: 2, key: "verbcore", label: "verbcore = valence + stem", labelEs: "núcleo verbal = valencia + base", role: "core" },
                { level: 3, key: "predicate", label: "predicate = verbcore + tense", labelEs: "predicado = núcleo verbal + tiempo", role: "predicate" },
                { level: 4, key: "vnc", label: "VNC = subject + predicate", labelEs: "CNV = sujeto + predicado", role: "nuclear-clause" },
            ],
            personalPronounCases: {
                nominative: { functionRole: "subject", occursIn: ["VNC", "NNC"] },
                objective: { functionRole: "verb-object", occursIn: ["VNC"] },
                possessive: { functionRole: "possessor", occursIn: ["NNC"] },
            },
            hasTensePosition: true,
            generationAllowed: false,
            slots: {
                pers1Pers2: {
                    slot: "pers1-pers2",
                    role: "subject",
                    prefix: "ni",
                    suffix: "",
                    displayPrefix: "ni",
                    displaySuffix: "Ø",
                    label: "",
                },
                obj1: {
                    slot: "obj1",
                    role: "mainline-object",
                    prefix: "c",
                    displayPrefix: "c",
                    isPresent: true,
                    label: "",
                },
                obj2: {
                    slot: "obj2",
                    role: "secondary-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                obj3: {
                    slot: "obj3",
                    role: "tertiary-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                reflexivo: {
                    slot: "reflexivo",
                    role: "reflexive-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                predicateStem: {
                    slot: "STEM",
                    role: "verbal-predicate",
                    stem: "nemi",
                    displayStem: "nemi",
                    valency: "intransitivo",
                },
                tensePosition: {
                    slot: "tns",
                    role: "tense-position",
                    tenseValue: "presente",
                    label: "indicativo presente",
                    compatibilityLabel: "presente",
                    morph: "Ø",
                    displayMorph: "Ø",
                    mood: "indicative",
                    andrewsTense: "present",
                    isPresent: true,
                    notAvailableInOrdinaryNnc: true,
                    andrewsSource: "Andrews §5.4.1/§5.5",
                    compatibilityRoute: "",
                },
                num1Num2: {
                    slot: "num1-num2",
                    role: "subject-number-connector",
                    connector: "",
                    displayConnector: "Ø-Ø",
                    num1: "",
                    num2: "",
                    belongsTo: "subject",
                    notTense: true,
                    andrewsSource: "Andrews §5.4",
                    connectorPattern: "",
                },
            },
        }
    );

    {
        const shell = ctx.buildNuclearClauseShellMetadata({
            clauseKind: "vnc",
            subject: { prefix: "ti", suffix: "h" },
            object: { prefix: "c" },
            object2: { prefix: "tla" },
            object3: { prefix: "tē" },
            reflexive: { prefix: "mo" },
            predicate: { stem: "ilpia" },
            tenseValue: "presente",
        });
        s.eq(
            "VNC shell exposes Andrews-rooted object/reflexive slot inventory",
            {
                formula: shell.formula,
                formulaEcho: shell.formulaEcho,
                slotKeys: Object.keys(shell.formulaSlots || {}),
                obj2: shell.formulaSlots?.obj2?.prefix,
                obj3: shell.formulaSlots?.obj3?.prefix,
                reflexivo: shell.formulaSlots?.reflexivo?.prefix,
            },
            {
                formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                formulaEcho: "#ti-Ø+c-tla-tē-mo(ilpia)Ø+0-h#",
                slotKeys: ["pers1Pers2", "obj1", "obj2", "obj3", "reflexivo", "predicateStem", "tensePosition", "num1Num2"],
                obj2: "tla",
                obj3: "tē",
                reflexivo: "mo",
            }
        );
    }

    s.eq(
        "NNC shell keeps tense absent and connector outside predicate",
        compactShell(ctx.buildNuclearClauseShellMetadata({
            clauseKind: "nnc",
            formulaSlots: {
                pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
                predicateStem: { slot: "STEM", stem: "shuchi", state: "absolutive" },
                num1Num2: { slot: "num1-num2", connector: "t", nounClass: "t" },
            },
        })),
        {
            kind: "nuclear-clause-shell",
            version: 1,
            clauseKind: "nominal-nuclear-clause",
            displayLabel: "cláusula nuclear nominal (CNN)",
            formulaType: "NNC",
            formulaAbbreviation: "CNN",
            formulaLabel: "Fórmula CNN",
            terminology: {
                abbreviation: "CNN",
                english: "nominal nuclear clause",
                spanish: "cláusula nuclear nominal",
                conceptId: "nnc",
                legacyFormulaType: "NNC",
                semanticId: "nominal-nuclear-clause",
            },
            formula: "#pers1-pers2(STEM)num1-num2#",
            expandedFormula: "#pers1-pers2(STEM)num1-num2#",
            formulaSlots: {
                pers1Pers2: {
                    slot: "pers1-pers2",
                    role: "subject",
                    prefix: "",
                    suffix: "",
                    displayPrefix: "Ø",
                    displaySuffix: "Ø",
                    label: "3sg",
                },
                predicateStem: {
                    slot: "STEM",
                    role: "nominal-predicate",
                    stem: "shuchi",
                    displayStem: "shuchi",
                    state: "absolutive",
                    stateSlot: null,
                },
                num1Num2: {
                    slot: "num1-num2",
                    role: "subject-number-connector",
                    formulaSchemaId: "ordinary-nnc-shell",
                    formulaSlot: "num1-num2",
                    slotPath: "subject.num1-num2",
                    connector: "t",
                    displayConnector: "t",
                    nounClass: "t",
                    blockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"],
                    notLexicalSuffix: true,
                    notStemSuffix: true,
                    notTense: true,
                },
            },
            formulaEcho: "#Ø-Ø(shuchi)t#",
            lesson4ActiveFormula: {
                stage: 3,
                sourceSection: "Andrews §4.5",
                formulaType: "NNC",
                formulaAbbreviation: "CNN",
                predicatePosition: "state",
                predicatePositionLabel: "estado",
                predicatePositionStatus: "vacant",
                predicatePositionStatusLabel: "vacante",
                predicatePositionSlot: "Ø",
                formula: "#pers1-pers2(STEM)num1-num2#",
                generationAllowed: false,
            },
            organizationalLayers: [
                { level: 1, key: "nounstem", label: "nounstem", labelEs: "tronco nominal", role: "foundation" },
                { level: 2, key: "nouncore", label: "nouncore = predicate = state + stem", labelEs: "núcleo nominal = predicado = estado + base", role: "predicate" },
                { level: 3, key: "nnc", label: "NNC = subject + predicate", labelEs: "CNN = sujeto + predicado", role: "nuclear-clause" },
            ],
            personalPronounCases: {
                nominative: { functionRole: "subject", occursIn: ["VNC", "NNC"] },
                objective: { functionRole: "verb-object", occursIn: ["VNC"] },
                possessive: { functionRole: "possessor", occursIn: ["NNC"] },
            },
            hasTensePosition: false,
            generationAllowed: false,
            slots: {
                pers1Pers2: {
                    slot: "pers1-pers2",
                    role: "subject",
                    prefix: "",
                    suffix: "",
                    displayPrefix: "Ø",
                    displaySuffix: "Ø",
                    label: "3sg",
                },
                predicateStem: {
                    slot: "STEM",
                    role: "nominal-predicate",
                    stem: "shuchi",
                    displayStem: "shuchi",
                    state: "absolutive",
                    stateSlot: null,
                },
                num1Num2: {
                    slot: "num1-num2",
                    role: "subject-number-connector",
                    formulaSchemaId: "ordinary-nnc-shell",
                    formulaSlot: "num1-num2",
                    slotPath: "subject.num1-num2",
                    connector: "t",
                    displayConnector: "t",
                    nounClass: "t",
                    blockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"],
                    notLexicalSuffix: true,
                    notStemSuffix: true,
                    notTense: true,
                },
            },
        }
    );

    s.eq(
        "unissued result-frame surfaces cannot override typed NNC shell input",
        (() => {
            const shell = ctx.buildNuclearClauseShellMetadata({
                clauseKind: "nnc",
                formulaSlots: {
                    pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
                    predicateStem: {
                        slot: "STEM",
                        stem: "stale-predicate",
                        surface: "stale-surface",
                        state: "absolutive",
                        grammarFrame: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                surfaceForms: ["frame-predicate"],
                            }),
                        }),
                    },
                    num1Num2: {
                        slot: "num1-num2",
                        connector: "stale-connector",
                        displayConnector: "stale-display",
                        nounClass: "t",
                        grammarFrame: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                surface: "frame-connector",
                            }),
                        }),
                    },
                },
            });
            return {
                predicateStem: shell.slots.predicateStem.stem,
                predicateDisplay: shell.slots.predicateStem.displayStem,
                connector: shell.slots.num1Num2.connector,
                connectorDisplay: shell.slots.num1Num2.displayConnector,
                formulaEcho: shell.formulaEcho,
            };
        })(),
        {
            predicateStem: "stale-predicate",
            predicateDisplay: "stale-predicate",
            connector: "stale-connector",
            connectorDisplay: "stale-display",
            formulaEcho: "#Ø-Ø(stale-predicate)stale-display#",
        }
    );

    s.eq(
        "unissued empty result frame has no authority over typed NNC shell input",
        (() => {
            const emptyFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surface: "",
                    surfaceForms: [],
                }),
            });
            const shell = ctx.buildNuclearClauseShellMetadata({
                clauseKind: "nnc",
                formulaSlots: {
                    pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
                    predicateStem: {
                        slot: "STEM",
                        stem: "stale-predicate",
                        surface: "stale-surface",
                        state: "absolutive",
                        grammarFrame: emptyFrame,
                    },
                    num1Num2: {
                        slot: "num1-num2",
                        connector: "stale-connector",
                        displayConnector: "stale-display",
                        displaySurface: "stale-surface",
                        nounClass: "t",
                        grammarFrame: emptyFrame,
                    },
                },
                predicate: { stem: "fallback-predicate" },
            });
            return {
                predicateStem: shell.slots.predicateStem.stem,
                predicateDisplay: shell.slots.predicateStem.displayStem,
                connector: shell.slots.num1Num2.connector,
                connectorDisplay: shell.slots.num1Num2.displayConnector,
                formulaEcho: shell.formulaEcho,
            };
        })(),
        {
            predicateStem: "stale-predicate",
            predicateDisplay: "stale-predicate",
            connector: "stale-connector",
            connectorDisplay: "stale-display",
            formulaEcho: "#Ø-Ø(stale-predicate)stale-display#",
        }
    );

    s.eq(
        "VNC formula echo derives from formulaSlots",
        ctx.buildVerbalNuclearClauseFormulaEchoFromSlots({
            pers1Pers2: { prefix: "ti", displayPrefix: "ti" },
            obj1: { prefix: "", displayPrefix: "Ø" },
            predicateStem: { stem: "kisa", displayStem: "kisa" },
            tensePosition: { tenseValue: "preterito", label: "preterito", morph: "Ø" },
        }),
        "#ti-Ø(kisa)Ø+Ø-Ø#"
    );

    s.eq(
        "VNC formula echo does not double-wrap an already framed predicate",
        ctx.buildVerbalNuclearClauseFormulaEchoFromSlots({
            pers1Pers2: { prefix: "ni", displayPrefix: "ni" },
            obj1: { prefix: "mu", displayPrefix: "mu" },
            predicateStem: { stem: "-(ilpia)", displayStem: "-(ilpia)" },
            tensePosition: { tenseValue: "presente", label: "presente", morph: "Ø" },
        }),
        "#ni-Ø+mu-(ilpia)Ø+Ø-Ø#"
    );

    s.eq(
        "VNC formula echo includes nonzero subject suffix slot",
        ctx.buildVerbalNuclearClauseFormulaEchoFromSlots({
            pers1Pers2: { prefix: "", suffix: "t", displayPrefix: "Ø", displaySuffix: "t" },
            obj1: { prefix: "ki", displayPrefix: "ki" },
            predicateStem: { stem: "-(ilpia)", displayStem: "-(ilpia)" },
            tensePosition: { tenseValue: "presente", label: "presente", morph: "Ø" },
        }),
        "#Ø-Ø+ki-(ilpia)Ø+Ø-t#"
    );

    s.eq(
        "nuclear clause shell carries anti-conflation boundary",
        ctx.buildNuclearClauseShellMetadata({ clauseKind: "vnc" }).antiConflationRules,
        [
            "nuclear clause shell is not generation",
            "VNC/NNC surface output is not a complete sentence model",
            "CNV/CNN are the visible Andrews-derived names for the legacy VNC/NNC generator categories",
            "Lesson 4 formulas are shell architecture, not generated Classical Nahuatl surfaces",
            "tense position belongs to VNC, not ordinary NNC",
            "objective personal pronouns belong only in VNC predicates",
            "possessive personal pronouns belong only in NNC predicates",
            "topic and supplementation are clause-level relations, not noun classes",
            "Andrews slot order is architecture, not a post-generation spelling bridge",
            "Andrews formulas are engine contracts, not optional metadata",
        ]
    );
    const shell = ctx.buildNuclearClauseShellMetadata({
        clauseKind: "nnc",
        formulaSlots: {
            pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
            predicateStem: { slot: "STEM", stem: "shuchi", state: "absolutive" },
            num1Num2: { slot: "num1-num2", connector: "t", nounClass: "t" },
        },
    });
    const shellFrame = shell.grammarFrame;
    s.eq(
        "nuclear clause shell exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(shellFrame),
            routeFamily: shellFrame?.routeContract?.routeFamily || "",
            routeStage: shellFrame?.routeContract?.routeStage || "",
            generationAllowed: shellFrame?.routeContract?.generationAllowed,
            formulaType: shellFrame?.nuclearClauseFrame?.formulaType || "",
            formulaAbbreviation: shellFrame?.nuclearClauseFrame?.formulaAbbreviation || "",
            formulaLabel: shellFrame?.nuclearClauseFrame?.formulaLabel || "",
            displayLabel: shellFrame?.nuclearClauseFrame?.displayLabel || "",
            hasTensePosition: shellFrame?.inflectionFrame?.hasTensePosition,
            andrewsRef: shellFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(shell, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "nuclear-clause-shell",
            routeStage: "classify-shell",
            generationAllowed: false,
            formulaType: "NNC",
            formulaAbbreviation: "CNN",
            formulaLabel: "Fórmula CNN",
            displayLabel: "cláusula nuclear nominal (CNN)",
            hasTensePosition: false,
            andrewsRef: "Andrews Lesson 4",
            enumerableGrammarFrame: false,
        }
    );
    s.eq(
        "unissued handoff realization cannot outrank top-level display input",
        (() => {
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "clause-shell-handoff-formula",
                unit: "NNC",
                formula: "#0-0(canonical-clause)0-0#",
                formulaSlots: {
                    predicateStem: { stem: "canonical-clause", slot: "STEM" },
                },
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "clause-shell-handoff-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "canonical-clause", surface: "canonical-clause" },
                ],
                surfaceForms: ["canonical-clause"],
            });
            const input = {
                surface: "top-lie / top-alt-lie",
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: {
                        ...ctx.buildGrammarResultFrame({
                            ok: true,
                            formulaRecord,
                            formulaRealizationRecord,
                        }),
                        surface: "frame-lie",
                        surfaceForms: ["frame-lie / frame-alt-lie"],
                        formulaRecord,
                        formulaRecords: [formulaRecord],
                        formulaRealizationRecord,
                        formulaRealizationRecords: [formulaRealizationRecord],
                    },
                }),
            };
            return {
                framed: ctx.getNuclearClauseShellFramedSurface(input),
                resolved: ctx.resolveNuclearClauseShellText(input, ["surface"], "fallback-lie"),
                selectedVariantId: ctx.getNuclearClauseShellSelectedRealizationVariant(input)?.selectedVariantId || "",
                formulaRealizationRecordId: ctx.getNuclearClauseShellSelectedRealizationVariant(input)?.formulaRealizationRecordId || "",
            };
        })(),
        {
            framed: null,
            resolved: "top-lie / top-alt-lie",
            selectedVariantId: "",
            formulaRealizationRecordId: "",
        }
    );
    s.eq(
        "nuclear clause shell handoff blocks slash-joined result-frame display strings",
        (() => {
            const input = {
                surface: "top-clause-lie",
                grammarFrame: {
                    resultFrame: {
                        kind: "grammar-result-frame",
                        ok: true,
                        surface: "frame-clause-a / frame-clause-b",
                        surfaceForms: ["frame-clause-a / frame-clause-b"],
                    },
                },
            };
            return {
                framed: ctx.getNuclearClauseShellFramedSurface(input),
                resolved: ctx.resolveNuclearClauseShellText(input, ["surface"], "fallback-lie"),
            };
        })(),
        {
            framed: "",
            resolved: "",
        }
    );

    return s;
}

module.exports = { run };
