"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    getCanonicalVncTestGrammarFrame,
} = require("./helpers/canonical_grammar_result");

function run(ctx = {}) {
    const s = createSuite("ui");
    const normalizeSourceProbeSyntax = (value) => {
        return String(value || "")
            .replace(/\btargetObject\./gu, "")
            .replace(/\s+/gu, " ")
            .replace(/\s*([()[\]{},;])\s*/gu, "$1")
            .replace(/\(([A-Za-z_$][\w$]*)\)\s*=>/gu, "$1 =>")
            .trim();
    };
    const normalizeCanonicalModuleSource = (source) => {
        const canonicalSource = String(source || "").replace(/\btargetObject\./gu, "");
        const normalizedProbeSource = normalizeSourceProbeSyntax(canonicalSource);
        return new Proxy(new String(canonicalSource), {
            get(target, property) {
                if (property === "includes") {
                    return (needle, position = 0) => canonicalSource.includes(String(needle), position)
                        || (position === 0 && normalizedProbeSource.includes(normalizeSourceProbeSyntax(needle)));
                }
                if (property === "slice") {
                    return (start, end) => normalizeCanonicalModuleSource(canonicalSource.slice(start, end));
                }
                if (property === Symbol.toPrimitive) {
                    return () => canonicalSource;
                }
                const value = Reflect.get(target, property, target);
                return typeof value === "function" ? value.bind(canonicalSource) : value;
            },
        });
    };
    const indexHtml = fs.readFileSync(path.resolve(__dirname, "..", "..", "index.html"), "utf8");
    const classicalShell = fs.readFileSync(path.resolve(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
    const extractClassicalShellTemplate = (functionName) => {
        const functionStart = classicalShell.indexOf(`function ${functionName}()`);
        if (functionStart < 0) {
            return "";
        }
        const templateStart = classicalShell.indexOf("return `", functionStart);
        if (templateStart < 0) {
            return "";
        }
        const contentStart = templateStart + "return `".length;
        const closingTemplate = classicalShell.slice(contentStart).match(/\n\s*`/u);
        const contentEnd = closingTemplate ? contentStart + closingTemplate.index : -1;
        return contentEnd > contentStart ? classicalShell.slice(contentStart, contentEnd) : "";
    };
    const classicalShellMarkup = [
        extractClassicalShellTemplate("ClassicalPanelShell"),
        extractClassicalShellTemplate("ClassicalPanelTabs"),
        extractClassicalShellTemplate("ClassicalSourcePanel"),
        extractClassicalShellTemplate("ClassicalAuthorityPanel"),
        extractClassicalShellTemplate("ClassicalResultPanel"),
        extractClassicalShellTemplate("ClassicalFooter"),
    ].join("\n");
    const html = `${indexHtml}\n${classicalShellMarkup}`;
    const css = fs.readFileSync(path.resolve(__dirname, "..", "..", "style.css"), "utf8");
    const staticLabels = fs.readFileSync(path.resolve(__dirname, "..", "..", "data", "static_labels.json"), "utf8");
    const staticModes = fs.readFileSync(path.resolve(__dirname, "..", "..", "data", "static_modes.json"), "utf8");
    const staticModesJson = JSON.parse(staticModes);
    const staticGroups = fs.readFileSync(path.resolve(__dirname, "..", "..", "data", "static_groups.json"), "utf8");
    const staticGroupsJson = JSON.parse(staticGroups);
    const rendering = normalizeCanonicalModuleSource(fs.readFileSync(
        path.resolve(__dirname, "..", "ui", "rendering", "rendering.mjs"),
        "utf8"
    ));
    const vncApplication = normalizeCanonicalModuleSource(fs.readFileSync(
        path.resolve(__dirname, "..", "application", "classical", "vnc_application.mjs"),
        "utf8"
    ));
    const classicalLesson7 = normalizeCanonicalModuleSource(fs.readFileSync(
        path.resolve(__dirname, "..", "core", "classical", "verbstem_classes.mjs"),
        "utf8"
    ));
    const localScriptTags = Array.from(indexHtml.matchAll(/<script\b([^>]*)\bsrc=["']([^"']+)["'][^>]*>/giu));
    const moduleEntryPaths = localScriptTags
        .filter((match) => /\btype=["']module["']/iu.test(match[1]))
        .map((match) => match[2].split(/[?#]/u, 1)[0]);
    const classicEntryPaths = localScriptTags
        .filter((match) => !/\btype=["']module["']/iu.test(match[1]))
        .map((match) => match[2].split(/[?#]/u, 1)[0]);
    s.eq(
        "Every ordinary VNC block points to the Source or Authority control that supplies the missing information",
        typeof ctx.getClassicalRuleLogicConflictControlIds === "function"
            ? {
                missingStem: ctx.getClassicalRuleLogicConflictControlIds("missing-stem"),
                zeroRootCooperation: ctx.getClassicalRuleLogicConflictControlIds("zero-i-a-requires-pronominal-nnc-cooperation"),
                lexicalReading: ctx.getClassicalRuleLogicConflictControlIds("itz-reading-must-distinguish-motion-from-alert-observant"),
                constructionAndTense: ctx.getClassicalRuleLogicConflictControlIds("am-i-a-requires-quen-construction-and-present-meaning"),
                nonactiveChoice: ctx.getClassicalRuleLogicConflictControlIds("lesson20-nonactive-option-selection-required"),
                passiveSource: ctx.getClassicalRuleLogicConflictControlIds("lesson21-passive-requires-specific-projective-or-reflexive-object"),
                causativeNoRule: ctx.getClassicalRuleLogicConflictControlIds("classical-vnc-causative-no-rule-derived-options"),
                classContradiction: ctx.getClassicalRuleLogicConflictControlIds("classical-vnc-derivation-source-class-contradiction"),
                repairLabel: ctx.getClassicalRuleLogicConflictRepairLabel("lesson20-nonactive-option-selection-required"),
                noRuleRepairLabel: ctx.getClassicalRuleLogicConflictRepairLabel("classical-vnc-causative-no-rule-derived-options"),
                classRepairLabel: ctx.getClassicalRuleLogicConflictRepairLabel("classical-vnc-derivation-source-class-contradiction"),
                actionableResult: rendering.includes('"repair-blocked-selection"')
                    && rendering.includes("focusClassicalRuleLogicConflictControl(resultBlockReason)"),
                supplementalRuleLogicPreserved: rendering.includes("nonactiveInventory.options"),
            }
            : {
                missingStem: rendering.includes('"missing-stem": Object.freeze(["classical-source-whole"])') ? ["classical-source-whole"] : [],
                zeroRootCooperation: rendering.includes('"zero-i-a-requires-pronominal-nnc-cooperation": Object.freeze(["classical-rule-logic-construction"])') ? ["classical-rule-logic-construction"] : [],
                lexicalReading: rendering.includes('"itz-reading-must-distinguish-motion-from-alert-observant": Object.freeze(["classical-rule-logic-lexical-reading"])') ? ["classical-rule-logic-lexical-reading"] : [],
                constructionAndTense: rendering.includes('"am-i-a-requires-quen-construction-and-present-meaning": Object.freeze([')
                    ? ["classical-rule-logic-construction", "classical-rule-logic-tense"]
                    : [],
                nonactiveChoice: rendering.includes('"lesson20-nonactive-option-selection-required": Object.freeze(["classical-rule-logic-nonactive-family"])') ? ["classical-rule-logic-nonactive-family"] : [],
                passiveSource: rendering.includes('"lesson21-passive-requires-specific-projective-or-reflexive-object": Object.freeze([')
                    ? ["classical-rule-logic-valence", "classical-rule-logic-object"]
                    : [],
                causativeNoRule: rendering.includes('reason.includes("classical-vnc") && reason.includes("no-rule-derived-options")')
                    ? ["classical-source-whole", "classical-rule-logic-class", "classical-rule-logic-valence"]
                    : [],
                classContradiction: rendering.includes('reason.includes("classical-vnc") && /(?:^|-)class(?:-|$)/u.test(reason)')
                    ? ["classical-rule-logic-class"]
                    : [],
                repairLabel: "Select Nonactive formation in Grammar",
                noRuleRepairLabel: "Enter Source stem or select Class / Source VNC Valence in Source",
                classRepairLabel: "Select Class in Source",
                actionableResult: rendering.includes('"repair-blocked-selection"')
                    && rendering.includes("focusClassicalRuleLogicConflictControl(resultBlockReason)"),
                supplementalRuleLogicPreserved: rendering.includes("nonactiveInventory.options"),
            },
        {
            missingStem: ["classical-source-whole"],
            zeroRootCooperation: ["classical-rule-logic-construction"],
            lexicalReading: ["classical-rule-logic-lexical-reading"],
            constructionAndTense: ["classical-rule-logic-construction", "classical-rule-logic-tense"],
            nonactiveChoice: ["classical-rule-logic-nonactive-family"],
            passiveSource: ["classical-rule-logic-valence", "classical-rule-logic-object"],
            causativeNoRule: ["classical-source-whole", "classical-rule-logic-class", "classical-rule-logic-valence"],
            classContradiction: ["classical-rule-logic-class"],
            repairLabel: "Select Nonactive formation in Grammar",
            noRuleRepairLabel: "Enter Source stem or select Class / Source VNC Valence in Source",
            classRepairLabel: "Select Class in Source",
            actionableResult: true,
            supplementalRuleLogicPreserved: true,
        }
    );
    s.eq(
        "Classical VNC Authority has one 1sg / 3sg / present initial-default contract and preserves explicit derivation selections",
        typeof ctx.getClassicalRuleLogicSurfaceState === "function"
            ? (() => {
                const defaults = ctx.getClassicalRuleLogicSurfaceState({
                    basalUnit: "vnc",
                    stem: "tēmi",
                });
                const explicitSelections = ["direct", "causative", "applicative"].map((derivationType) => {
                    const state = ctx.getClassicalRuleLogicSurfaceState({
                        basalUnit: "vnc",
                        stem: "tēmi",
                        derivationType,
                        subject: "2pl",
                        objectSelection: "specific-projective:1pl",
                        applicativeObjectSelection: "specific-projective:2sg",
                        mood: "indicative",
                        tense: "preterit",
                    });
                    return {
                        derivationType,
                        subject: state.subject,
                        objectPerson: state.objectPerson,
                        applicativeObjectPerson: state.applicativeObjectPerson,
                        mood: state.mood,
                        tense: state.tense,
                    };
                });
                return {
                    shell: {
                        subject1sg: classicalShell.includes('<option value="1sg" selected>1sg</option>'),
                        object3sg: classicalShell.includes('<option value="specific-projective:3sg" selected>specific 3sg</option>'),
                        applicativeObject3sg: classicalShell.includes('<option value="specific-projective:3sg" selected>specific 3sg</option>'),
                        present: classicalShell.includes('<option value="present" selected>present</option>'),
                    },
                    defaults: {
                        subject: defaults.subject,
                        objectPerson: defaults.objectPerson,
                        applicativeObjectPerson: defaults.applicativeObjectPerson,
                        mood: defaults.mood,
                        tense: defaults.tense,
                    },
                    explicitSelections,
                };
            })()
            : {
                shell: {
                    subject1sg: classicalShell.includes('<option value="1sg" selected>1sg</option>'),
                    object3sg: classicalShell.includes('<option value="specific-projective:3sg" selected>specific 3sg</option>'),
                    applicativeObject3sg: classicalShell.includes('<option value="specific-projective:3sg" selected>specific 3sg</option>'),
                    present: classicalShell.includes('<option value="present" selected>present</option>'),
                },
                defaults: {
                    subject: rendering.includes('getClassicalRuleLogicSurfaceControlValue("classical-rule-logic-subject", "1sg")') ? "1sg" : "",
                    objectPerson: rendering.includes('getClassicalRuleLogicSurfaceControlValue("classical-rule-logic-object", "specific-projective:3sg")') ? "3sg" : "",
                    applicativeObjectPerson: rendering.includes('getClassicalRuleLogicSurfaceControlValue("classical-rule-logic-applicative-object", "specific-projective:3sg")') ? "3sg" : "",
                    mood: "indicative",
                    tense: rendering.includes('getClassicalRuleLogicSurfaceControlValue("classical-rule-logic-tense", legacyMoodTense.tense)') && rendering.includes('"indicative:present"') ? "present" : "",
                },
                explicitSelections: ["direct", "causative", "applicative"].map((derivationType) => ({
                    derivationType,
                    subject: "2pl",
                    objectPerson: "1pl",
                    applicativeObjectPerson: "2sg",
                    mood: "indicative",
                    tense: "preterit",
                })),
            },
        {
            shell: {
                subject1sg: true,
                object3sg: true,
                applicativeObject3sg: true,
                present: true,
            },
            defaults: {
                subject: "1sg",
                objectPerson: "3sg",
                applicativeObjectPerson: "3sg",
                mood: "indicative",
                tense: "present",
            },
            explicitSelections: ["direct", "causative", "applicative"].map((derivationType) => ({
                derivationType,
                subject: "2pl",
                objectPerson: "1pl",
                applicativeObjectPerson: "2sg",
                mood: "indicative",
                tense: "preterit",
            })),
        }
    );
    s.eq(
        "blocked Classical authority keeps lower formulas provisional and off selected surface",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "itz",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "preterit",
                    lexicalReading: "motion",
                });
                return {
                    status: surface.authorizationStatus,
                    sentenceStatus: surface.sentenceSurfaceStatus,
                    selectedFormula: surface.selectedFormula,
                    provisionalFormula: surface.provisionalSelectedFormula,
                    sentenceFormula: surface.sentenceFormulaDisplay,
                    sentenceSurface: surface.sentenceSurfaceDisplay,
                };
            })()
            : {
                status: rendering.includes('const selectedFormula = authorizationStatus === "authorized" ? provisionalSelectedFormula : "";') ? "blocked" : "missing-gate",
                sentenceStatus: rendering.includes('const lesson11SelectedOutputBlocked = lesson11ParadigmPlan?.authorizationStatus === "blocked"') ? "blocked" : "incorrectly-authorized",
                selectedFormula: "",
                provisionalFormula: "#n-0(itz)0+⎕-0#",
                sentenceFormula: "",
                sentenceSurface: "",
            },
        {
            status: "blocked",
            sentenceStatus: "blocked",
            selectedFormula: "",
            provisionalFormula: "",
            sentenceFormula: "",
            sentenceSurface: "",
        }
    );
    s.eq(
        "NNC Result exposes a sentence surface produced from the selected typed NNC",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "a-c-ah",
                    sourceEmbedStem: "a-c",
                    sourceMatrixStem: "ah",
                    subject: "1pl",
                    sentenceSurfaceMode: "statement",
                    polarityMode: "positive",
                });
                const exclamation = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "a-c-ah",
                    sourceEmbedStem: "a-c",
                    sourceMatrixStem: "ah",
                    subject: "1pl",
                    sentenceSurfaceMode: "exclamation",
                    polarityMode: "negative",
                    sentenceParticleId: "l3-auh-conjunctor",
                });
                return {
                    status: surface.authorizationStatus,
                    formula: surface.selectedFormula,
                    sentenceFormula: surface.sentenceFormulaDisplay,
                    sentenceSurface: surface.sentenceSurfaceDisplay,
                    formulaAuthority: surface.formulaAuthority,
                    sentenceAuthority: surface.sentenceSurfaceAuthority,
                    stringAuthority: surface.sentenceSurfaceFrame?.formulaStringAuthority,
                    exclamationMode: exclamation.state?.sentenceSurfaceMode,
                    exclamationFormula: exclamation.sentenceFormulaDisplay,
                    exclamationSurface: exclamation.sentenceSurfaceDisplay,
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                formula: "#t-0(a-c-ah)m-eh#",
                sentenceFormula: "#t-0(a-c-ah)m-eh#.",
                sentenceSurface: "Tacahmeh.",
                formulaAuthority: "NNC selected-output logic",
                sentenceAuthority: "typed-nnc-plus-authorized-sentence-composition",
                stringAuthority: false,
                exclamationMode: "exclamation",
                exclamationFormula: "auh ah#t-0(a-c-ah)m-eh#!",
                exclamationSurface: "Auh ahtacahmeh!",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "PDF-confirmed Lesson 16 Source examples reach selected output through typed composition",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? [
                {
                    stem: "ce-qui",
                    nncType: "quantitive",
                    subject: "3common",
                    nncQuantitiveMatrix: "qui",
                    nncQuantitiveMatrixForm: "qui",
                    nncQuantitivePredicatePluralization: "not-applicable",
                    sourceEmbedStem: "ce",
                    sourceMatrixStem: "qui",
                },
                {
                    stem: "cā-tl-eh",
                    nncType: "interrogative-which-compound",
                    subject: "3sg",
                    sourceEmbedStem: "cā",
                    sourceMatrixStem: "tl-eh",
                },
                {
                    stem: "mo-ch-eh-huā",
                    nncType: "quantitive-personal-compound",
                    subject: "3sg",
                    nncNumberForm: "sounded",
                    sourceEmbedStem: "mo-ch",
                    sourceMatrixStem: "eh-huā",
                },
            ].map((options) => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    sentenceSurfaceMode: "question",
                    polarityMode: "positive",
                    ...options,
                });
                return [options.stem, surface.authorizationStatus, surface.selectedFormula, surface.blockReason];
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                ["ce-qui", "authorized", "#0-0(ce-qui)0-0#", ""],
                ["cā-tl-eh", "authorized", "#0-0(cā-tl-eh)0-0#", ""],
                ["mo-ch-eh-huā", "authorized", "#0-0(mo-ch-eh-huā)tl-0#", ""],
            ]
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "blocked defective i-a keeps its Canvas paradigm visible and explains the missing construction",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "11",
                    stem: "i-ā",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    construction: "none",
                });
                return {
                    status: surface.authorizationStatus,
                    sentenceStatus: surface.sentenceSurfaceStatus,
                    selectedFormula: surface.selectedFormula,
                    blockReason: surface.blockReason,
                    lexemeId: surface.lesson11LexemeId,
                    paradigm: surface.lesson11ParadigmRelation,
                    relationIsEvidenceOnly: surface.lesson11ParadigmRelationFrame?.formulaStringsAreAuthority === false,
                };
            })()
            : {
                status: rendering.includes("const lesson11ParadigmRelationFrame = selectedOutputFillers.lesson11ParadigmRelationFrame") ? "blocked" : "missing-relation-fallback",
                sentenceStatus: rendering.includes('sentenceSurfaceStatus: lesson11SelectedOutputBlocked') ? "blocked" : "incorrectly-authorized",
                selectedFormula: "",
                blockReason: rendering.includes("machineryFrame?.blockReason") ? "zero-i-a-requires-pronominal-nnc-cooperation" : "missing-block-reason",
                lexemeId: "0-i-ā",
                paradigm: rendering.includes("lesson11ParadigmRelationFrame?.relationDisplay") ? "*(0-i-ā) > (0-i-h)" : "missing-paradigm",
                relationIsEvidenceOnly: true,
            },
        {
            status: "blocked",
            sentenceStatus: "blocked",
            selectedFormula: "",
            blockReason: "zero-i-a-requires-pronominal-nnc-cooperation",
            lexemeId: "0-i-ā",
            paradigm: "*(0-i-ā) > (0-i-h)",
            relationIsEvidenceOnly: true,
        }
    );
    s.eq(
        "Lesson 16 Source discourse finalizes the visible information question instead of the earlier statement default",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "ā-0",
                    nncType: "interrogative-who",
                    subject: "3sg",
                    nncClausePosition: "initial",
                    sentenceSurfaceMode: "statement",
                    polarityMode: "positive",
                });
                return {
                    status: surface.authorizationStatus,
                    sourceKind: surface.state.nncSourceIdentity?.nncType,
                    formula: surface.selectedFormula,
                    sentenceFormula: surface.sentenceFormulaDisplay,
                    sentenceSurface: surface.sentenceSurfaceDisplay,
                    sentenceType: surface.sentenceSurfaceFrame?.sentenceType,
                    compositionOperation: surface.sentenceCompositionOperationId,
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                sourceKind: "interrogative-who",
                formula: "#0-0(ā-0)c-0#",
                sentenceFormula: "#0-0(ā-0)c-0#?",
                sentenceSurface: "Āc?",
                sentenceType: "information-question",
                compositionOperation: "nnc-sentence-composition",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "NNC Source identity ignores a hostile retired type field",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "ā-0",
                    nncType: "ordinary",
                    subject: "3sg",
                });
                return {
                    status: surface.authorizationStatus,
                    formula: surface.selectedFormula,
                    reason: surface.blockReason,
                    sourceKind: surface.state.nncSourceIdentity?.nncType,
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                formula: "#0-0(ā-0)c-0#",
                reason: "",
                sourceKind: "interrogative-who",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "authorized defective i-a preserves its zero root in formula structure but not spoken surface",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "11",
                    stem: "i-ā",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    construction: "pronominal-nnc",
                });
                return {
                    status: surface.authorizationStatus,
                    formula: surface.selectedFormula,
                    sentenceFormula: surface.sentenceFormulaDisplay,
                    writtenSurface: surface.sentenceSurfaceDisplay,
                    selectedStem: surface.lesson11SelectedStem,
                    zeroRootOperation: surface.lesson11ZeroRootOperationFrame
                        ? [
                            surface.lesson11ZeroRootOperationFrame.canvasRootMorpheme,
                            surface.lesson11ZeroRootOperationFrame.formulaRootMorpheme,
                            surface.lesson11ZeroRootOperationFrame.zeroRootSilentOnSurface,
                        ]
                        : null,
                    finalProofFrameUsesZeroRoot: surface.selectedFormula === "#n-0(0-i-h)0+⎕-0#",
                };
            })()
            : {
                status: "authorized",
                formula: "#n-0(0-i-h)0+⎕-0#",
                sentenceFormula: "#n-0(0-i-h)0+⎕-0#.",
                writtenSurface: rendering.includes("const baseWord = canonicalFiniteSurfaceFrame?.wordRealization || \"\";") ? "Nih." : "N0ih.",
                selectedStem: "0-i-h",
                zeroRootOperation: ["Ø", "0", true],
                finalProofFrameUsesZeroRoot: true,
            },
        {
            status: "authorized",
            formula: "#n-0(0-i-h)0+⎕-0#",
            sentenceFormula: "#n-0(0-i-h)0+⎕-0#.",
            writtenSurface: "Nih.",
            selectedStem: "0-i-h",
            zeroRootOperation: ["Ø", "0", true],
            finalProofFrameUsesZeroRoot: true,
        }
    );
    s.eq(
        "internal evidence ordering prioritizes the active selected-output transformation",
        typeof ctx.prioritizeClassicalRuleLogicSurfaceWitnesses === "function"
            ? ctx.prioritizeClassicalRuleLogicSurfaceWitnesses(
                [{
                    tagId: "base-witness",
                    exactWitness: "base",
                    transcriptionLineStart: 10,
                    transcriptionLineEnd: 11,
                }],
                [{
                    witnessTagId: "active-transformation",
                    exactWitness: "active",
                    transcriptionLineStart: 20,
                    transcriptionLineEnd: 21,
                }]
            ).map((ref) => [ref.tagId, ref.witnessRole || "", ref.exactWitness])
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                ["active-transformation", "active-selected-output-transformation", "active"],
                ["base-witness", "", "base"],
            ]
            : null
    );
    const transcriptionLineCount = fs.readFileSync(
        path.resolve(__dirname, "..", "..", "ANDREWS_TRANSCRIPTION_CANVAS.md"),
        "utf8"
    ).split(/\r?\n/u).length;
    const readCanonicalModule = (...segments) => normalizeCanonicalModuleSource(
        fs.readFileSync(path.resolve(__dirname, "..", ...segments), "utf8")
    );
    const composer = readCanonicalModule("ui", "composer", "composer.mjs");
    const i18n = readCanonicalModule("ui", "i18n", "i18n.mjs");
    const generationEngine = readCanonicalModule("core", "generation", "engine.mjs");
    const events = readCanonicalModule("ui", "events", "events.mjs");
    const exportUi = readCanonicalModule("ui", "export", "export.mjs");
    const state = readCanonicalModule("ui", "state.mjs");
    const vncFacade = readCanonicalModule("core", "vnc", "vnc.mjs");
    const concepts = readCanonicalModule("core", "concepts", "concepts.mjs");
    const nncRelational = readCanonicalModule("core", "classical", "nnc_lessons45_47_closure.mjs");
    const nncPlaceGentilic = readCanonicalModule("core", "nnc", "place_gentilic", "place_gentilic.mjs");
    const lesson3Particles = readCanonicalModule("core", "classical", "particle_grammar.mjs");
    const supplementation = readCanonicalModule("core", "sentence", "supplementation.mjs");
    const grammarFrame = readCanonicalModule("core", "grammar", "frame.mjs");
    const lessons27282933Closure = readCanonicalModule(
        "core",
        "classical",
        "vnc_lessons27_29_33_closure.mjs"
    );
    const lessons303134Closure = readCanonicalModule(
        "core",
        "classical",
        "nominal_construction.mjs"
    );
    const clause = readCanonicalModule("core", "clause", "clause.mjs");
    const lessons4043Closure = readCanonicalModule("core", "classical", "adjectival_modification.mjs");
    const lesson44Adverbial = readCanonicalModule("core", "classical", "adverbial_nuclear_grammar.mjs");
    const adjunction = readCanonicalModule("core", "clause", "adjunction", "adjunction.mjs");
    const complement = readCanonicalModule("core", "clause", "complement", "complement.mjs");
    const conjunction = readCanonicalModule("core", "clause", "conjunction", "conjunction.mjs");
    const comparison = readCanonicalModule("core", "comparison", "comparison.mjs");
    const nncNames = readCanonicalModule("core", "nnc", "names", "names.mjs");
    const panels = readCanonicalModule("ui", "panels", "panels.mjs");
    const rootScript = readCanonicalModule("bootstrap", "script_runtime.mjs");
    const curriculum = readCanonicalModule("ui", "curriculum", "curriculum.mjs");
    const runtimeSource = [
        fs.readFileSync(path.resolve(__dirname, "..", "browser", "main.mjs"), "utf8"),
        fs.readFileSync(path.resolve(__dirname, "..", "bootstrap", "bootstrap.mjs"), "utf8"),
        fs.readFileSync(path.resolve(__dirname, "..", "runtime", "create_runtime.mjs"), "utf8"),
    ].join("\n");
    const browserRuntimeHas = (modulePath) => (
        runtimeSource.includes(`"${modulePath}"`)
        || runtimeSource.includes(`../${modulePath.replace(/^src\//u, "")}`)
    );
    const tabsStart = html.indexOf('id="verb-entry-board-tabs"');
    const tabsEnd = html.indexOf('class="panel-pane-nav-btn panel-pane-nav-btn--next"', tabsStart);
    const tabsHtml = tabsStart >= 0 && tabsEnd > tabsStart
        ? html.slice(tabsStart, tabsEnd)
        : "";
    const nawatModeStart = html.indexOf('id="calc-nawat-mode-noun"');
    const nawatModeEnd = html.indexOf('id="calc-nawat-mode-particle"', nawatModeStart);
    const nawatModeHtml = nawatModeStart >= 0 && nawatModeEnd > nawatModeStart
        ? html.slice(nawatModeStart, nawatModeEnd)
        : "";
    const formulaPanelStart = html.indexOf('id="panel-stack-pane-tense"');
    const formulaPanelEnd = html.indexOf('id="container-tense-grid"', formulaPanelStart);
    const formulaPanelHtml = formulaPanelStart >= 0 && formulaPanelEnd > formulaPanelStart
        ? html.slice(formulaPanelStart, formulaPanelEnd)
        : "";
    const sourcePanelStart = html.indexOf('id="panel-stack-pane-inputs"');
    const sourcePanelEnd = html.indexOf('id="panel-stack-pane-tense"', sourcePanelStart);
    const sourcePanelHtml = sourcePanelStart >= 0 && sourcePanelEnd > sourcePanelStart
        ? html.slice(sourcePanelStart, sourcePanelEnd)
        : "";
    const classicalBasalStart = html.indexOf('id="classical-basal-unit-controls"');
    const classicalBasalEnd = html.indexOf('data-classical-source-unit="stem-roles-readout"', classicalBasalStart);
    const classicalBasalHtml = classicalBasalStart >= 0 && classicalBasalEnd > classicalBasalStart
        ? html.slice(classicalBasalStart, classicalBasalEnd)
        : "";
    const classicalAuthorityControlsStart = html.indexOf('id="classical-rule-logic-controls"');
    const classicalAuthorityControlsEnd = html.indexOf('id="tense-tabs"', classicalAuthorityControlsStart);
    const classicalAuthorityControlsHtml = classicalAuthorityControlsStart >= 0 && classicalAuthorityControlsEnd > classicalAuthorityControlsStart
        ? html.slice(classicalAuthorityControlsStart, classicalAuthorityControlsEnd)
        : "";
    const entradaComposerCssStart = css.indexOf("/* #1 Entrada operation order: grouped by grammar band. */");
    const entradaComposerCssEnd = css.indexOf("/* Functional button scale", entradaComposerCssStart);
    const entradaComposerCss = entradaComposerCssStart >= 0 && entradaComposerCssEnd > entradaComposerCssStart
        ? css.slice(entradaComposerCssStart, entradaComposerCssEnd)
        : "";
    const makeAndrewsBlockRowAuditModel = (fields = {}, options = {}) => {
        const generationAllowed = fields.grammarGenerationAllowed === true
            || fields.grammarGenerationAllowed === "true";
        const resultOk = fields.grammarResultOk === true
            || fields.grammarResultOk === "true";
        const sourceFrame = {
            kind: "andrews-tense-block-output-row-audit-source-frame",
            version: 1,
            authorityFrame: {
                grammarAuthority: fields.grammarLogicAuthority || "",
                sourceContextTargetAuthority: fields.grammarSourceContextTargetAuthority || "",
                sourceEvidenceTargetAuthority: fields.grammarSourceEvidenceTargetAuthority || "",
            },
            routeContract: {
                routeFamily: fields.grammarRouteFamily || "",
                routeStage: fields.grammarRouteStage || "",
                generationAllowed,
            },
            orthographyFrame: {
                spellingEvidenceRole: fields.grammarSpellingEvidenceRole || "",
                classicalSpellingRole: fields.grammarClassicalSpellingRole || "",
                orthographyBoundary: fields.grammarOrthographyBoundary || "",
                spellingAuthority: fields.grammarSpellingAuthority || "",
                classicalSurfaceImport: fields.grammarClassicalSurfaceImport || "",
            },
            diagnosticFrame: {
                diagnosticId: fields.grammarDiagnosticId || "",
            },
            resultFrame: {
                ok: resultOk,
            },
        };
        const targetFrame = {
            kind: "andrews-tense-block-output-row-audit-target-frame",
            version: 1,
            grammarRouteFamily: sourceFrame.routeContract.routeFamily,
            grammarRouteStage: sourceFrame.routeContract.routeStage,
            grammarGenerationAllowed: String(sourceFrame.routeContract.generationAllowed === true),
            grammarDiagnosticId: sourceFrame.diagnosticFrame.diagnosticId,
            grammarLogicAuthority: sourceFrame.authorityFrame.grammarAuthority,
            grammarSpellingEvidenceRole: sourceFrame.orthographyFrame.spellingEvidenceRole,
            grammarClassicalSpellingRole: sourceFrame.orthographyFrame.classicalSpellingRole,
            grammarOrthographyBoundary: sourceFrame.orthographyFrame.orthographyBoundary,
            grammarSpellingAuthority: sourceFrame.orthographyFrame.spellingAuthority,
            grammarClassicalSurfaceImport: sourceFrame.orthographyFrame.classicalSurfaceImport,
            grammarResultOk: String(sourceFrame.resultFrame.ok === true),
            grammarSourceContextTargetAuthority: sourceFrame.authorityFrame.sourceContextTargetAuthority,
            grammarSourceEvidenceTargetAuthority: sourceFrame.authorityFrame.sourceEvidenceTargetAuthority,
            ...(options.targetOverrides || {}),
        };
        return {
            dataset: { ...(options.dataset || {}) },
            andrewsTenseBlockOutputRowAuditModel: {
                kind: "andrews-tense-block-output-row-audit-model",
                version: 1,
                sourceFrame,
                operationFrame: {
                    kind: "andrews-tense-block-output-row-audit-operation-frame",
                    version: 1,
                    status: options.operationStatus || "authorized",
                    operation: options.operation || "audit-output-row-from-grammar-frame",
                    sourceFrame,
                    targetFrame,
                },
                targetFrame,
            },
        };
    };

    s.ok(
        "the parallel ordinary-NNC composer board is retired",
        !tabsHtml
            && !html.includes('id="verb-entry-board-ordinary-nnc"')
            && !html.includes('data-ordinary-nnc-mode="true"')
            && !composer.includes("ordinaryNncModeButtons")
            && !composer.includes("isOrdinaryNncGenerationModeEnabled")
    );
    s.ok(
        "the canonical basal NNC control is the sole nominal workflow selector",
        classicalBasalHtml.includes('data-classical-basal-unit="nnc"')
            && classicalBasalHtml.includes('data-classical-basal-scope="nominal-nuclear-clause"')
            && classicalBasalHtml.includes('classical-basal-unit-button__main">NNC</span>')
            && classicalBasalHtml.includes('classical-basal-unit-button__sub">nominal nuclear clause</span>')
    );
    s.no(
        "ordinary NNC is not rendered as a Nawat mode operator chip",
        html.includes('id="calc-nawat-mode-ordinary-nnc"')
            || nawatModeHtml.includes('data-ordinary-nnc-mode="true"')
    );
    s.ok(
        "basal controls expose exactly the VNC and NNC source workflows",
        (classicalBasalHtml.match(/data-classical-basal-unit="(?:vnc|nnc)"/gu) || []).length >= 3
            && !classicalBasalHtml.includes('data-classical-basal-unit="particle"')
            && !html.includes('data-composer-entry-board="noun-to-verb"')
            && !html.includes(">Verbalize<")
            && !css.includes('[data-entry-board="ordinary-nnc"]')
    );
    s.ok(
        "#1 Entrada composer is organized by operation-slot order per board",
        composer.includes("function syncComposerOperationSlotOrderMetadata")
            && composer.includes('return getUiCopyLabel("composer-entry-board-label", "Clause type");')
            && !composer.includes('suffixLabel ? `Verbalizar ${suffixLabel}` : "Verbalizar"')
            && composer.includes('function getVerbRegexPlaceholder()')
            && composer.includes('return "_";')
            && !composer.includes('return "ej. (siwa)t";')
            && composer.includes('stagePanel.dataset.operationBoard = board')
            && composer.includes('stagePanel.dataset.operationOrder = getComposerOperationOrderLabel(board)')
            && composer.includes('"Verbal clause: board -> verbal valence -> directional -> embed -> object 1/object 2 -> matrix stem"')
            && composer.includes('"Nominal clause: source -> matrix stem; result -> pers1-pers2 -> num1-num2 connector -> reference"')
            && !composer.includes('"Nominal verbalization: board')
            && composer.includes('setComposerOperationSlotMetadata(directionalHost, "directional-prefix", 10)')
            && composer.includes('setComposerOperationSlotMetadata(embedField, "incorporated-prefix", 20)')
            && composer.includes('setComposerOperationSlotMetadata(objectPair, "object-valency", 30)')
            && composer.includes('setComposerOperationSlotMetadata(matrixField, "predicate-core", 40)')
            && composer.includes('setComposerOperationSlotMetadata(matrixField, "nnc-predicate", 10)')
            && !composer.includes('setComposerOperationSlotMetadata(classTabs, "nnc-num1-num2"')
            && composer.includes("const moveSlotContentChildren = (fromEl, toEl)")
            && composer.includes("const currentTopRow = Array.from(stagePanel.children)")
            && composer.includes('stagePanel.dataset.activeTransitivity = activeToken')
            && entradaComposerCss.includes("grid-template-areas:")
            && entradaComposerCss.includes('"entry"')
            && entradaComposerCss.includes('"source"')
            && entradaComposerCss.includes("justify-self: stretch;")
            && entradaComposerCss.includes("#container-inputs #composer-slot-stage > .verb-composer__top-row")
            && entradaComposerCss.includes("#container-inputs #composer-slot-stage > .verb-composer__bottom-row")
            && !entradaComposerCss.includes('[data-operation-board="noun-to-verb"]')
            && entradaComposerCss.includes('#container-inputs #composer-slot-stage[data-operation-board="nnc"] > .verb-composer__top-row')
            && !entradaComposerCss.includes("display: contents")
    );
    s.ok(
        "primary experience no longer mounts the formula workbench",
        !html.includes('id="formula-workbench"')
            && !html.includes('class="formula-workbench"')
            && !html.includes('data-andrews-component="formula-workbench"')
            && !css.includes(".formula-workbench")
            && !panels.includes("formula-workbench")
            && !panels.includes("AndrewsFormulaWorkbench")
            && html.includes("<title>Classical Nahuatl Grammar</title>")
            && html.includes(">Classical Nahuatl Grammar<")
            && JSON.parse(staticLabels)?.uiLabels?.["app-title"]?.labelEs === "Gramática Andrews"
            && html.includes('id="classical-app-root"')
            && html.includes('data-classical-shell="source-authority-result"')
            && html.includes('data-classical-panel-container="source"')
            && html.includes('data-classical-panel-container="authority"')
            && html.includes('data-classical-panel-container="authorized-result"')
            && !html.includes('data-andrews-result-can-feed-next-source=')
    );
    s.ok(
        "Classical Nahuatl public deployment is a fixed single-language runtime",
        indexHtml.includes('<body class="is-language-classical">')
            && indexHtml.includes('data-classical-nahuatl-tab-authority="andrews-transcription"')
            && indexHtml.includes('data-classical-nahuatl-source-document="ANDREWS_TRANSCRIPTION_CANVAS.md"')
            && indexHtml.includes('data-classical-nahuatl-orthography-policy="transcription-direct"')
            && !indexHtml.includes('data-language-profile=')
            && !indexHtml.includes('id="language-profile-')
            && !indexHtml.includes('id="language"')
            && rootScript.includes('profileId: "classical-nahuatl"')
            && !rootScript.includes("LANGUAGE_PROFILE_MODE")
            && !panels.includes("function normalizeLanguageProfileMode")
            && !panels.includes("function getActiveLanguageProfileMode")
            && panels.includes("function initializeClassicalNahuatlPublicRuntime")
            && browserRuntimeHas("src/core/classical/profile_wall.mjs")
    );
    s.ok(
        "index.html is a modern-module Source Authority Result shell",
        /style\.css\?v=[^"]+/.test(indexHtml)
            && /src\/browser\/main\.mjs\?v=[^"]+/.test(indexHtml)
            && moduleEntryPaths.length === 1
            && moduleEntryPaths[0] === "src/browser/main.mjs"
            && classicEntryPaths.length === 0
            && browserRuntimeHas("src/ui/shell/classical_shell.mjs")
            && browserRuntimeHas("src/ui/composer/composer.mjs")
            && browserRuntimeHas("src/bootstrap/script_runtime.mjs")
            && browserRuntimeHas("src/ui/events/events.mjs")
            && indexHtml.includes('id="classical-app-root"')
            && indexHtml.includes('id="classical-source-panel"')
            && indexHtml.includes('id="classical-authority-panel"')
            && indexHtml.includes('id="classical-result-panel"')
            && !indexHtml.includes('id="classical-modal-root"')
            && !indexHtml.includes('class="interface-language-control"')
            && !indexHtml.includes('id="language"')
            && !indexHtml.includes('aria-label="Use Nawat interface labels"')
            && !css.includes(".interface-language-control")
            && !events.includes("initLanguageSwitch")
            && !i18n.includes("changeLanguage")
            && !i18n.includes('getElementById("language")')
            && !composer.includes('getElementById("language")')
            && !indexHtml.includes('id="classical-rule-logic-controls"')
            && !indexHtml.includes('id="all-tense-conjugations"')
            && !indexHtml.includes('id="verb-entry-board-tabs"')
            && classicalShell.includes("function ClassicalSourcePanel()")
            && classicalShell.includes("function ClassicalAuthorityPanel()")
            && classicalShell.includes("function ClassicalResultPanel()")
            && !classicalShell.includes('data-classical-internal-scaffold="entry-board-mirror"')
            && classicalShell.includes('data-classical-internal-scaffold="legacy-tense-tabs-runtime-mirror"')
            && classicalShell.includes('id="classical-rule-logic-controls"')
            && !classicalShell.includes('id="classical-authority-summary"')
            && classicalShell.includes('class="panel-stack-tab__step"')
            && classicalShell.includes('id="all-tense-conjugations"')
            && css.includes(".classical-panel-container")
            && css.includes("display: contents")
            && css.includes('body.is-language-classical [data-classical-internal-scaffold="legacy-tense-tabs-runtime-mirror"]')
    );
    s.ok(
        "Classical Basic Authority keeps genuine VNC and NNC choices visible while the retired type selector is absent",
        css.includes("body.is-language-classical.is-ui-simple #classical-authority-panel .calc-operators")
            && css.includes("display: grid !important;")
            && classicalShell.includes('id="classical-rule-logic-controls"')
            && classicalShell.includes('id="classical-rule-logic-valence"')
            && classicalShell.includes('id="classical-rule-logic-nnc-state"')
            && classicalShell.includes('id="classical-rule-logic-nnc-subject-person"')
            && !classicalShell.includes('id="classical-rule-logic-nnc-type"')
    );
    s.ok(
        "Classical Study and Analysis are presentation depths over one typed grammar result",
        indexHtml.includes('aria-label="Presentation depth"')
            && indexHtml.includes('<span class="button-label">Study</span>')
            && indexHtml.includes('<span class="button-label">Analysis</span>')
            && indexHtml.includes('aria-description="Show the selected form and formula"')
            && indexHtml.includes('aria-description="Show structure, proof, and clause composition"')
            && !indexHtml.includes('id="ui-scale"')
            && css.includes("Study is the shared GCD projection")
            && css.includes("#classical-result-panel .classical-clause-relation-workflow")
            && css.includes("#classical-result-panel .classical-rule-surface__proof-group")
            && css.includes("#classical-result-panel .classical-rule-surface__single-vnc > .classical-rule-surface__linear")
            && panels.includes('const classicalDisplayOnly = body?.classList.contains("is-language-classical") === true;')
            && panels.includes("if (enteringSimple && !classicalDisplayOnly)")
    );
    s.ok(
        "VNC Direct, Causative, and Applicative reuse the flat Grammar control language",
        css.includes("/* #2 Grammar uses one card language for NNC and every VNC derivation tab. */")
            && css.includes('#classical-rule-logic-controls[data-classical-rule-logic-surface-unit="vnc"] .classical-vnc-authority-organizer')
            && css.includes('#classical-rule-logic-controls[data-classical-rule-logic-surface-unit="vnc"] .classical-vnc-authority-section')
            && css.includes("background: var(--workbench-panel-bg-soft)")
            && css.includes('#classical-rule-logic-controls[data-classical-rule-logic-surface-unit="vnc"] .classical-vnc-authority-section__header')
            && css.includes('#classical-rule-logic-controls[data-classical-rule-logic-surface-unit="vnc"] .classical-vnc-authority-control-group__header')
            && !css.includes('[data-classical-derivation-type="direct"] .classical-vnc-authority-section {')
            && !css.includes('[data-classical-derivation-type="causative"] .classical-vnc-authority-section {')
            && !css.includes('[data-classical-derivation-type="applicative"] .classical-vnc-authority-section {')
    );
    s.ok(
        "VNC Stem class remains an operable dropdown filtered to the classes Andrews permits",
        (rendering.includes("const retainedSingleChoiceControl =")
            && rendering.includes('wrapper.dataset.classicalVerbstemClassPresentation = retainedFilteredClass ? "visible-filtered-dropdown" : "visible-user-choice"'))
            || rendering.includes('"classical-rule-logic-class": basalUnit === "vnc"')
            && rendering.includes('const retainedFilteredClass = id === "classical-rule-logic-class"')
            && rendering.includes('const visible = !hide && (!canvasDisabled || retainedFilteredClass)')
            && rendering.includes('control.disabled = !visible || retainedReadOnlyTense')
            && rendering.includes('wrapper.dataset.classicalVerbstemClassMachineryAvailable = String(capabilities.verbstemClass === true)')
            && rendering.includes('retainedFilteredClass ? "visible-filtered-dropdown" : "visible-user-choice"')
            && !rendering.includes('"classical-rule-logic-class": capabilities.verbstemClass === true')
    );
    s.eq(
        "NNC #2 Grammar presents the issued canonical result while retired curriculum summaries stay out of the UI",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncState: "absolutive",
                    subject: "3common",
                    nncAnimacy: "nonanimate",
                });
                return {
                    status: surface.authorizationStatus,
                    contractStatus: surface.nncGrammarSurfaceContractInspection?.status,
                    resultKind: surface.nncGrammarSurfaceContract?.kind,
                    sourceKind:
                        surface.nncGrammarSurfaceContract?.sourceFrame?.kind,
                    operationKind:
                        surface.nncGrammarSurfaceContract?.operationFrame?.kind,
                    formula:
                        surface.nncGrammarSurfaceContract?.formulaProjection
                            ?.formulaRealization,
                    written:
                        surface.nncGrammarSurfaceContract?.writtenProjection
                            ?.surfaceRealization,
                    scalarEvaluator:
                        surface.nncGrammarSurfaceContract
                            ?.scalarEvaluatorIdentity,
                    independentProjections:
                        surface.nncGrammarSurfaceContract
                            ?.formulaAndWrittenDerivedIndependently === true,
                    retiredShellSummaryAbsent:
                        !classicalShell.includes('data-classical-nnc-grammar-contract-summary="true"')
                        && !classicalShell.includes("data-classical-nnc-grammar-selected-operation")
                        && !classicalShell.includes('data-classical-nnc-grammar-axis-inventory="true"')
                        && !classicalShell.includes(">All lesson distinctions</summary>"),
                    semanticProjectionWithoutCurriculumSummary:
                        rendering.includes("function syncClassicalNncGrammarSurfaceContract")
                        && rendering.includes("classical-nnc-grammar-organizer")
                        && !rendering.includes("dataset.classicalNncGrammarGcd")
                        && !rendering.includes("dataset.classicalNncGrammarLcmCoordinate")
                        && !rendering.includes("function syncClassicalNncGrammarAxisInventory")
                        && !rendering.includes("lessons12To15SourceClosureFrame"),
                    semanticStylingWithoutAxisInventory:
                        css.includes(".classical-nnc-grammar-organizer")
                        && !css.includes(".classical-nnc-grammar-axis-inventory__body"),
                    authority:
                        surface.nncGrammarSurfaceContractInspection?.authority
                            === "issued-canonical-nnc-result"
                        && surface.nncGrammarSurfaceContract?.lessonMetadataAuthority === false
                        && surface.nncGrammarSurfaceContract?.formulaStringAuthority === false,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                contractStatus: "valid",
                resultKind: "classical-nahuatl-ordinary-nnc-result-frame",
                sourceKind:
                    "classical-nahuatl-ordinary-nnc-source-frame",
                operationKind:
                    "classical-nahuatl-ordinary-nnc-operation-frame",
                formula: "#0-0(cal)li-0#",
                written: "calli",
                scalarEvaluator:
                    "evaluateClassicalNahuatlOrdinaryNnc",
                independentProjections: true,
                retiredShellSummaryAbsent: true,
                semanticProjectionWithoutCurriculumSummary: true,
                semanticStylingWithoutAxisInventory: true,
                authority: true,
            }
            : null
    );
    s.ok(
        "Classical page scrolling belongs to the document root",
        css.includes("html:has(body.is-language-classical)")
            && css.includes("overflow-y: auto;")
            && css.includes("body.is-language-classical {\n  overflow-x: clip;\n  overflow-y: visible;")
    );
    s.ok(
        "NNC Source offers starter examples without attaching documentary authority",
        classicalShell.includes('id="classical-nnc-source-guide"')
            && classicalShell.includes('id="classical-nnc-source-example"')
            && !classicalShell.includes("data-canvas-example-authority")
            && classicalShell.includes('data-classical-source-authorizes="none"')
            && classicalShell.includes('data-classical-nnc-source-stem="cal"')
            && classicalShell.includes('data-classical-nnc-source-stem="eh-huā"')
            && classicalShell.includes('data-classical-nnc-source-stem="tl-eh"')
            && classicalShell.includes('data-classical-nnc-source-stem="īn"')
            && classicalShell.includes('data-classical-nnc-source-stem="a-c-ah"')
            && classicalShell.includes('data-classical-nnc-source-stem="ix-qui-ch"')
            && classicalShell.includes('data-classical-nnc-source-stem="ce-qui"')
            && classicalShell.includes('data-classical-nnc-source-stem="yeh-yeh-huā"')
            && classicalShell.includes('data-classical-nnc-source-stem="cā-tl-e-in"')
            && classicalShell.includes('data-classical-nnc-source-stem="cā-tl-eh-huā"')
            && classicalShell.includes('data-classical-nnc-source-stem="quē-x-ix-qui-ch"')
            && classicalShell.includes('data-classical-nnc-source-stem="mo-ch-eh-huā"')
            && classicalShell.includes('data-classical-nnc-source-stem="ix-a-chi"')
            && !classicalShell.includes('data-classical-nnc-source-stem="ce-c"')
            && classicalShell.includes('data-classical-nnc-source-stem="cal" data-classical-nnc-source-mode="whole-stem"')
            && classicalShell.includes('data-classical-nnc-source-stem="ā-0" data-classical-nnc-source-mode="internal-morphemes"')
            && classicalShell.includes('data-classical-nnc-source-stem="tl-eh" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="tl" data-classical-nnc-source-matrix="eh"')
            && classicalShell.includes('data-classical-nnc-source-stem="eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="eh" data-classical-nnc-source-matrix="huā"')
            && classicalShell.includes('data-classical-nnc-source-stem="a-c-ah" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="a-c" data-classical-nnc-source-matrix="ah"')
            && classicalShell.includes('data-classical-nnc-source-stem="ix-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="ix" data-classical-nnc-source-matrix="qui-ch"')
            && classicalShell.includes("Source contains the nounstem only")
            && composer.includes("function syncClassicalNncSourceGuide")
            && composer.includes("function applyClassicalNncSourceExampleSelection")
            && composer.includes("const compoundSelection = sourceMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix")
            && composer.includes("preserveDirectNncGeneration")
            && composer.includes("function isCanonicalDirectNncSourceFrame")
            && composer.includes("directCanonicalNncRoute")
            && rendering.includes("classicalNncSourceSelectedStem")
            && !composer.includes("const sourceAuthoritySelections = [")
    );
    s.ok(
        "NNC source guide cannot prefill grammar controls from documentary metadata",
        !composer.includes("setClassicalNncAuthorityControlFromSourceExample")
            && !composer.includes("setClassicalAuthorityControlFromSourceSelection")
            && !composer.includes("sourceAuthoritySelections")
    );
    s.eq(
        "NNC Canvas example selection remains a typed stem-only aid",
        typeof ctx.getClassicalNncSourceExampleSelection === "function"
            ? ctx.getClassicalNncSourceExampleSelection({
                dataset: {
                    classicalNncSourceStem: "ix-qui-ch",
                    classicalNncSourceMode: "embed-matrix",
                    classicalNncSourceEmbed: "ix",
                    classicalNncSourceMatrix: "qui-ch",
                    classicalNncType: "quantitive",
                    classicalNncState: "absolutive",
                    classicalNncSubject: "3common",
                    classicalNncQuantitiveMatrix: "quich",
                },
            })
            : { unavailable: true },
        {
            sourceStem: "ix-qui-ch",
            sourceMode: "embed-matrix",
            sourceEmbedStem: "ix",
            sourceMatrixStem: "qui-ch",
            sourceContract: "stem-only",
            exampleAuthority: "not-authority",
        }
    );
    const canonicalSourceStemAudit = typeof ctx.auditClassicalNahuatlCanonicalSourceStemInventory === "function"
        ? ctx.auditClassicalNahuatlCanonicalSourceStemInventory()
        : null;
    const canonicalVncSourceStems = typeof ctx.getClassicalNahuatlCanonicalSourceStemInventory === "function"
        ? ctx.getClassicalNahuatlCanonicalSourceStemInventory("vnc")
        : [];
    const canonicalNncSourceStems = typeof ctx.getClassicalNahuatlCanonicalSourceStemInventory === "function"
        ? ctx.getClassicalNahuatlCanonicalSourceStemInventory("nnc")
        : [];
    s.eq(
        "Classical Source inventory exposes lexical verbstems and nounstems without formula authority",
        {
            audit: canonicalSourceStemAudit && {
                ok: canonicalSourceStemAudit.ok,
                invalidRecordCount: canonicalSourceStemAudit.invalidRecordCount,
                duplicateCount: canonicalSourceStemAudit.duplicateCount,
            },
            transitiveCitation: canonicalVncSourceStems.find(record => record.stem === "chīhua" && record.valenceDisplay === "transitive")?.citation || "",
            intransitiveCitation: canonicalVncSourceStems.find(record => record.stem === "temō")?.citation || "",
            nounstemCitation: canonicalNncSourceStems.find(record => record.stem === "cal")?.citation || "",
            formulaShapedCount: [...canonicalVncSourceStems, ...canonicalNncSourceStems].filter(record => /[#>+=□]/u.test(record.citation)).length,
            recordContractRegistered: typeof ctx.isRegisteredGrammarContract === "function"
                ? ctx.isRegisteredGrammarContract(ctx.getDefaultGrammarContractRegistry(), canonicalVncSourceStems[0])
                : false,
            auditContractRegistered: typeof ctx.isRegisteredGrammarContract === "function"
                ? ctx.isRegisteredGrammarContract(ctx.getDefaultGrammarContractRegistry(), canonicalSourceStemAudit)
                : false,
        },
        {
            audit: {
                ok: true,
                invalidRecordCount: 0,
                duplicateCount: 0,
            },
            transitiveCitation: "...-(chīhua)",
            intransitiveCitation: "(temō)",
            nounstemCitation: "(cal)",
            formulaShapedCount: 0,
            recordContractRegistered: true,
            auditContractRegistered: true,
        }
    );
    s.eq(
        "Classical Source inventory resolves the pīn-ā-hua quantity collision to the cited long root",
        {
            canonicalLong: canonicalVncSourceStems.filter(record => record.stem === "pīn-ā-hua").length,
            conflictingShort: canonicalVncSourceStems.filter(record => record.stem === "pin-ā-hua").length,
            distinctAhui: canonicalVncSourceStems.filter(record => ["āhui-ya", "ahhuiā-ya"].includes(record.stem)).map(record => record.stem).sort(),
        },
        {
            canonicalLong: 1,
            conflictingShort: 0,
            distinctAhui: ["ahhuiā-ya", "āhui-ya"],
        }
    );
    s.ok(
        "VNC Source picker enters only a verbstem and leaves grammatical choices untouched",
        classicalShell.includes('id="classical-vnc-source-guide"')
            && classicalShell.includes('id="classical-vnc-source-stem"')
            && classicalShell.includes('data-classical-vnc-source-stem-picker="true"')
            && classicalShell.includes('<code>...-(...)</code> is transitive')
            && classicalShell.includes('Choosing one enters only its verbstem')
            && composer.includes("function populateClassicalVncSourceStemPicker()")
            && composer.includes("function applyClassicalVncSourceStemSelection()")
            && composer.includes('root.dataset.classicalVncSourceSelectedValenceDisplay')
            && !composer.includes("getClassicalVncSourceStemStarterPreset")
            && !composer.includes("classicalVncStarterValence")
            && !composer.includes("classicalVncStarterClass")
            && composer.includes('wholeInput.value = sourceStem')
            && browserRuntimeHas("src/core/classical/source_stem_inventory.mjs")
    );
    s.eq(
        "NNC personal source cards expose only typed nounstem constituents",
        typeof ctx.getClassicalNncSourceExampleSelection === "function"
            ? ctx.getClassicalNncSourceExampleSelection({
                dataset: {
                    classicalNncSourceStem: "eh-huā",
                    classicalNncSourceMode: "embed-matrix",
                    classicalNncSourceEmbed: "eh",
                    classicalNncSourceMatrix: "huā",
                    classicalNncType: "personal-compound",
                    classicalNncState: "absolutive",
                    classicalNncSubject: "1sg",
                    classicalNncNumberForm: "sounded",
                },
            })
            : { unavailable: true },
        {
            sourceStem: "eh-huā",
            sourceMode: "embed-matrix",
            sourceEmbedStem: "eh",
            sourceMatrixStem: "huā",
            sourceContract: "stem-only",
            exampleAuthority: "not-authority",
        }
    );
    s.eq(
        "NNC Source preserves the Canvas zero morph inside a selected stem",
        typeof ctx.normalizeClassicalFuenteSourcePartStem === "function"
            ? ctx.normalizeClassicalFuenteSourcePartStem("(ā-0)")
            : "ā-0",
        "ā-0"
    );
    s.eq(
        "NNC Source classifies the Canvas zero-root example as internal morphs",
        typeof ctx.getClassicalNncSourceExampleSelection === "function"
            ? ctx.getClassicalNncSourceExampleSelection({
                dataset: {
                    classicalNncSourceStem: "ā-0",
                    classicalNncSourceMode: "internal-morphemes",
                    classicalNncType: "interrogative-who",
                },
            }).sourceMode
            : "internal-morphemes",
        "internal-morphemes"
    );
    s.ok(
        "Source remains typed and non-authorizing without a documentary authority attribute",
        (sourcePanelHtml.includes('data-classical-source-contract="source-only"')
            && sourcePanelHtml.includes('data-classical-source-authorizes="none"')
            && sourcePanelHtml.includes('data-classical-source-constitution="typed-andrews-analysis"')
            && composer.includes("getClassicalTypedBuiltSourceFrame")
            && composer.includes("commitClassicalSourcePartsEvaluation"))
            || sourcePanelHtml.includes('data-classical-source-contract="source-only"')
            && sourcePanelHtml.includes('data-classical-source-authorizes="none"')
            && sourcePanelHtml.includes('data-classical-user-generated="source-unit"')
            && sourcePanelHtml.includes('data-classical-machine-generated="rank-classification"')
            && sourcePanelHtml.includes('data-classical-source-layout="unified-source"')
            && !sourcePanelHtml.includes("data-classical-source-authority")
            && sourcePanelHtml.includes('id="classical-source-parts"')
            && sourcePanelHtml.includes('data-classical-source-parts="user-defined"')
            && sourcePanelHtml.includes('data-classical-source-parts-kind="whole-stem"')
            && sourcePanelHtml.includes('data-classical-source-parts-kind="embed-matrix"')
            && sourcePanelHtml.includes('id="classical-source-whole"')
            && sourcePanelHtml.includes('id="classical-source-embed"')
            && sourcePanelHtml.includes('id="classical-source-matrix"')
            && sourcePanelHtml.includes('id="classical-source-readout"')
            && sourcePanelHtml.includes('data-classical-source-constitution="typed-andrews-analysis"')
            && sourcePanelHtml.includes('data-classical-source-input-role="machine-mirror"')
            && sourcePanelHtml.includes('data-classical-internal-scaffold="source-composer-runtime-mirror"')
            && !sourcePanelHtml.includes('id="classical-rule-logic-controls"')
            && !sourcePanelHtml.includes('id="all-tense-conjugations"')
            && composer.includes("function getClassicalSourceReadoutFrame")
            && composer.includes("function getClassicalSourcePartControlState")
            && composer.includes("function syncClassicalSourcePartsToEntradaUrl")
            && composer.includes("function syncClassicalBuiltSourceToVerbInput")
            && composer.includes('wholeInput: document.getElementById("classical-source-whole")')
            && composer.includes('sourceInput.dataset.classicalSourceInputRole = frame.verbInputRole || "machine-mirror"')
            && composer.includes("function getClassicalEntradaUrlSourceBoundaryRoleFrame")
            && composer.includes("hyphenOnlyCannotPopulateEmbedMatrix")
            && composer.includes("function syncClassicalSourceReadout")
            && composer.includes("readout.hidden = frame.unit === CLASSICAL_BASAL_UNIT.vnc")
            && composer.includes("matrixInput,\n        internalMorphs\n      } = getClassicalSourcePartControlElements();")
            && composer.includes("syncClassicalSourcePartControlsFromRuntime();\n      const {\n        root,\n        modeButtons")
            && composer.includes('control.addEventListener("input", () => {\n          if (control.tagName === "SELECT")')
            && composer.includes('"classical-rule-logic-derivation-option": "derivationOptionId"')
            && composer.includes('if (requestKey === "derivationOptionId")')
            && composer.includes('appendConstitutionJoin(`→ ${frame.stemClass} verbstem`')
            && composer.includes("buildClassicalNahuatlVncSourceConstitutionProjection")
            && composer.includes("dataset.classicalSourceConstitutionRole")
            && composer.includes('rank: `NNC stem source · ${sourceKind}`')
            && composer.includes('rank: "VNC stem source"')
            && composer.includes("function commitClassicalSourcePartsEvaluation")
            && composer.includes("function setClassicalSourcePartsPendingState")
            && composer.includes('root.dataset.classicalSourceCommitState = pending ? "pending" : "committed"')
            && composer.includes("setClassicalSourcePartsPendingState(getClassicalSourcePartsEvaluationSignature() !== ClassicalSourcePartsCommittedSignature)")
            && composer.includes('input.addEventListener("input", handleSourcePartsChange)')
            && composer.includes('const builtSourceFrame = sourcePartsRoot && typeof getClassicalTypedBuiltSourceFrame === "function" ? getClassicalTypedBuiltSourceFrame(verbEl?.value || "") : null')
            && !composer.includes("CLASSICAL_SOURCE_EVALUATION_DELAY_MS")
            && !composer.includes("scheduleClassicalSourcePartsEvaluation")
            && composer.includes("syncClassicalBuiltSourceToVerbInput();")
            && !composer.includes('sourceInput.addEventListener("input", () => syncClassicalSourceReadout())')
            && events.includes("function commitVerbInputEditingState")
            && events.includes('source: "enter"')
            && rootScript.includes("VERB_INPUT_REFRESH_DEBOUNCE_MS = 180")
            && composer.includes('button[data-classical-source-parts-kind]')
            && css.includes("body.is-language-classical #classical-source-panel .classical-source-unit")
            && css.includes("body.is-language-classical #classical-source-panel .verb-block__display")
            && css.includes("body.is-language-classical #classical-source-panel .classical-basal-unit-button__sub")
            && css.includes("body.is-language-classical #classical-source-panel .classical-source-readout__label::after")
            && css.includes("body.is-language-classical #classical-source-panel .classical-source-constitution__part")
            && css.includes('.classical-source-readout[data-classical-source-unit="vnc"] {')
            && css.includes('.classical-source-constitution > .classical-source-readout__label')
            && css.includes(".classical-source-constitution__stage")
            && css.includes('.classical-source-readout[data-classical-source-unit="vnc"] [data-classical-source-readout-item="rank"]')
            && css.includes('#classical-source-parts[data-classical-source-parts-mode="whole-stem"] .classical-source-parts__field--embed')
            && css.includes("body.is-language-classical #classical-authority-panel .calc-operator--classical-rule-logic > .calc-operator__label")
            && !css.includes("body.is-language-classical #classical-source-panel .classical-source-built")
            && css.includes('body.is-language-classical #classical-source-panel #verb[data-classical-source-mirror="runtime-only"]')
            && css.includes("body.is-language-classical .classical-source-parts__field--whole")
            && css.includes("body.is-language-classical .classical-source-readout")
            && css.includes("body.is-language-classical .classical-source-parts")
            && css.includes("grid-template-columns: repeat(auto-fit, minmax(min(100%, 72px), 1fr))")
            && css.includes("grid-template-columns: repeat(3, minmax(0, 1fr))")
            && css.includes("min-height: 30px")
            && css.includes("min-height: 26px")
            && css.includes("display: inline-flex")
            && css.includes("body.is-language-classical #classical-source-panel #verb-composer")
            && css.includes("body.is-language-classical #classical-source-panel .verb-block__hint-row")
            && css.includes("body.is-language-classical #classical-source-panel .verb-block__feedback")
    );
    s.ok(
        "Classical CSS surface contract is organized by Source Grammar Result",
        (css.includes("Source -> Grammar -> Result presentation")
            && html.includes('data-classical-panel-container="source"')
            && html.includes('data-classical-panel-container="authority"')
            && html.includes('data-classical-panel-container="authorized-result"'))
            || css.includes("Source -> Grammar -> Result presentation")
            && css.includes('body.is-language-classical .panel-grid[data-andrews-layout="source-authority-authorized-result"]')
            && css.includes('grid-template-areas: "source-authority result";')
            && css.includes('body.is-language-classical [data-classical-panel-stack="source-authority-result"]')
            && css.includes('body.is-language-classical #classical-source-panel #container-inputs')
            && css.includes('body.is-language-classical #classical-authority-panel #panel-stack-pane-tense')
            && css.includes('body.is-language-classical #classical-result-panel #container-tense-grid')
            && css.includes(".classical-rule-control select:disabled")
            && css.includes("body.is-language-classical .classical-rule-control select:disabled")
            && css.includes("cursor: not-allowed;")
            && rendering.includes('wrapper.dataset.classicalControlAvailability = !visible')
            && rendering.includes('control.disabled = !visible || retainedReadOnlyTense')
            && rendering.includes("function getClassicalAuthorityControlLayout")
            && rendering.includes('wrapper.dataset.classicalControlLayout = getClassicalAuthorityControlLayout(id)')
            && rendering.includes('wrapper.setAttribute("aria-disabled", String(control.disabled))')
            && rendering.includes("mirrorOption.disabled = option.disabled === true")
            && !rendering.includes("mirrorOption.dataset.classicalAuthorityOptionTag")
            && css.includes('[data-classical-control-availability="enabled"] select:not(:disabled)')
            && css.includes('[data-classical-control-availability="disabled"] .classical-rule-control__label')
            && css.includes("#classical-authority-panel .classical-rule-control select option:disabled")
            && css.includes("#classical-authority-panel .classical-rule-control select option:not(:disabled)")
            && css.includes("outline: 3px solid rgba(53, 105, 91, 0.22)")
            && css.includes('[data-classical-control-layout="valence"]')
            && css.includes('[data-classical-control-layout="sentence-type"]')
            && css.includes("grid-template-columns: repeat(12, minmax(0, 1fr))")
            && css.includes('body.is-language-classical .panel-stack-tabs')
            && css.includes('body.is-language-classical .panel-stack-tab .button-label')
            && css.includes('body.is-language-classical .classical-source-readout')
            && css.includes('--classical-shell-control-height: 34px;')
            && css.includes('--classical-shell-button-height: 38px;')
            && css.includes('--classical-shell-formula-size:')
            && css.includes('body.is-language-classical [data-classical-internal-scaffold="entry-board-mirror"]')
            && css.includes('body.is-language-classical .verb-entry-board-tabs[data-classical-source-board-mirror="true"]')
            && css.indexOf("Source -> Grammar -> Result presentation") > css.indexOf(".book-map")
            && html.includes('data-classical-panel-container="source"')
            && html.includes('data-classical-panel-container="authority"')
            && html.includes('data-classical-panel-container="authorized-result"')
    );
    s.ok(
        "Classical Authority person order and tla fusion label follow one deliberate control architecture",
        (() => {
            const objectOrder = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
                .map((person) => classicalAuthorityControlsHtml.indexOf(`value="specific-projective:${person}"`));
            const tlaLabelIndex = classicalAuthorityControlsHtml.indexOf(">tla fusion</span>");
            const tlaInputIndex = classicalAuthorityControlsHtml.indexOf('id="classical-rule-logic-tla-fusion"');
            return objectOrder.every((position) => position >= 0)
                && objectOrder.every((position, index) => index === 0 || position > objectOrder[index - 1])
                && tlaLabelIndex >= 0
                && tlaInputIndex > tlaLabelIndex
                && !classicalShell.includes("Atajos")
                && !classicalShell.includes("Cerrar atajos")
                && !classicalShell.includes("Classical Logic");
        })()
    );
    s.ok(
        "Classical Authority uses state-semantic controls instead of false dropdowns",
        classicalAuthorityControlsHtml.includes('<span class="classical-rule-control__label">Antecessive ō#</span>')
            && /type="checkbox"[\s\S]*id="classical-rule-logic-prefix-stack"[\s\S]*data-classical-checked-value="antecessive"[\s\S]*data-classical-unchecked-value="none"/.test(classicalAuthorityControlsHtml)
            && !/<select[^>]*id="classical-rule-logic-prefix-stack"/.test(classicalAuthorityControlsHtml)
            && classicalAuthorityControlsHtml.includes('class="classical-segmented-control" role="group" aria-label="Polarity"')
            && classicalAuthorityControlsHtml.includes('data-classical-segment-value="positive"')
            && classicalAuthorityControlsHtml.includes('data-classical-segment-value="negative"')
            && !/<select[^>]*id="classical-rule-logic-polarity"/.test(classicalAuthorityControlsHtml)
            && /<select[\s\S]*id="classical-rule-logic-directional"[\s\S]*value="none"[\s\S]*value="on"[\s\S]*value="huāl"/.test(classicalAuthorityControlsHtml)
            && rendering.includes('control.dataset?.classicalCheckedValue || "true"')
            && rendering.includes('activeDocument.querySelectorAll(`[data-classical-segment-control="${id}"]`)')
            && composer.includes('document.querySelectorAll("[data-classical-segment-control]")')
            && css.includes('.classical-segmented-control__option.is-active')
            && css.includes('[data-classical-control-layout="prefix-stack"]')
            && css.includes('text-overflow: ellipsis;')
            && css.includes('white-space: nowrap;')
            && css.includes('hyphens: none;')
            && css.includes('grid-template-columns: minmax(360px, 0.64fr) minmax(560px, 1.36fr);')
            && css.includes('padding: 4px 3px;')
            && !css.includes('[data-classical-nahuatl-machinery="lesson4"]')
            && css.includes('body.is-language-classical #panel-stack-pane-inputs,')
            && css.includes('grid-area: source-authority;')
            && css.includes('column-gap: 0;')
            && css.includes('row-gap: 0;')
            && css.includes('margin-bottom: 0;')
            && classicalAuthorityControlsHtml.includes('>Directional / locative</span>')
    );
    s.ok(
        "Classical panel columns are governed only by basal VNC and NNC buttons",
        classicalShell.includes('data-panel-columns="classical-basal-units"')
            && classicalShell.includes('data-classical-basal-units="vnc nnc"')
            && classicalShell.includes('id="classical-basal-unit-controls"')
            && classicalBasalHtml.includes('data-panel-columns="basal-buttons"')
            && classicalBasalHtml.includes('data-classical-basal-unit-order="vnc nnc"')
            && !/data-classical-basal-unit="particle"/.test(classicalBasalHtml)
            && /data-classical-basal-unit="vnc"[\s\S]*classical-basal-unit-button__main">VNC/.test(classicalBasalHtml)
            && /data-classical-basal-unit="nnc"[\s\S]*classical-basal-unit-button__main">NNC/.test(classicalBasalHtml)
            && classicalBasalHtml.indexOf('data-classical-basal-scope="verbal-nuclear-clause"') < classicalBasalHtml.indexOf('data-classical-basal-scope="nominal-nuclear-clause"')
            && classicalBasalHtml.includes('data-classical-basal-scope="verbal-nuclear-clause"')
            && classicalBasalHtml.includes('data-classical-basal-scope="nominal-nuclear-clause"')
            && !classicalBasalHtml.includes('data-classical-basal-authority=')
            && !classicalBasalHtml.includes('data-nawat-pipil-')
            && !classicalShell.includes('data-classical-fixed-surfaces="stem-input proof witness receipt"')
            && composer.includes("var CLASSICAL_BASAL_UNIT = Object.freeze")
            && composer.includes("function applyClassicalBasalUnitMode")
            && composer.includes("function syncClassicalBasalUnitControls")
            && composer.includes("function applyClassicalBasalUnitSurface")
            && composer.includes("function renderInitialClassicalPanelContractSurface")
            && composer.includes("isClassicalPanelContractSurfaceRequested()")
            && composer.includes('new URLSearchParams(search).get("basal") === "panel-contract"')
            && composer.includes('renderClassicalRuleLogicSurfaceBlock({')
            && composer.includes('basalUnit: CLASSICAL_BASAL_UNIT.vnc')
            && composer.includes("function populateClassicalSentenceParticleControl")
            && !composer.includes("CLASSICAL_BASAL_UNIT.particle")
            && !composer.includes("setOrdinaryNncGenerationModeEnabled")
            && !state.includes("setOrdinaryNncGenerationModeEnabled")
            && composer.includes('target.dataset.classicalGrammarRuleSource = "Andrews"')
            && css.includes(".classical-basal-unit-controls")
            && css.includes(".classical-basal-unit-controls")
            && css.includes(".classical-basal-unit-button__main")
    );
    const classicalNahuatlTabAuthorityExpected = {
        kind: "classical-nahuatl-tab-authority-frame",
        active: true,
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        outputLanguage: "Classical Nahuatl",
        outputAuthority: "Andrews transcription",
        orthographyAuthority: "Andrews transcription",
        orthographyPolicy: "transcription-direct",
        separationMechanism: "deployment-boundary",
        spellingInspection: "not-performed",
        classicalOutputImport: "authorized-within-classical-lane",
        bodyAuthority: "active",
        bodyProfileWall: "classical-nahuatl-profile-wall-frame",
        bodySpellingInspection: "not-performed",
    };
    const hasClassicalNahuatlTabAuthorityStaticContract = html.includes('data-classical-nahuatl-tab-authority="andrews-transcription"')
        && html.includes('data-classical-nahuatl-source-document="ANDREWS_TRANSCRIPTION_CANVAS.md"')
        && html.includes('data-classical-nahuatl-orthography-policy="transcription-direct"')
        && !html.includes('data-nawat-pipil-')
        && panels.includes("function getClassicalNahuatlTabAuthorityFrame")
        && panels.includes("buildClassicalNahuatlProfileWallFrame(classicalMode)")
        && panels.includes('sourceDocument: wallFrame?.sourceDocument || "ANDREWS_TRANSCRIPTION_CANVAS.md"')
        && panels.includes('orthographyPolicy: wallFrame?.orthographyPolicy || "transcription-direct"')
        && panels.includes("spellingInspection")
        && panels.includes("classicalOutputImport");
    s.eq(
        "Classical Nahuatl tab authority frame uses Andrews transcription directly",
        typeof ctx.getClassicalNahuatlTabAuthorityFrame === "function"
            && typeof ctx.applyClassicalNahuatlTabAuthorityDataset === "function"
            ? (() => {
                const frame = ctx.getClassicalNahuatlTabAuthorityFrame();
                ctx.applyClassicalNahuatlTabAuthorityDataset(ctx.document.body);
                return {
                    kind: frame.kind,
                    active: frame.active,
                    sourceAuthority: frame.sourceAuthority,
                    grammarAuthority: frame.grammarAuthority,
                    sourceDocument: frame.sourceDocument,
                    outputLanguage: frame.outputLanguage,
                    outputAuthority: frame.outputAuthority,
                    orthographyAuthority: frame.orthographyAuthority,
                    orthographyPolicy: frame.orthographyPolicy,
                    separationMechanism: frame.separationMechanism,
                    spellingInspection: frame.spellingInspection,
                    classicalOutputImport: frame.classicalOutputImport,
                    bodyAuthority: ctx.document.body.dataset.classicalNahuatlTabAuthority,
                    bodyProfileWall: ctx.document.body.dataset.classicalNahuatlProfileWall,
                    bodySpellingInspection: ctx.document.body.dataset.classicalNahuatlSpellingInspection,
                };
            })()
            : hasClassicalNahuatlTabAuthorityStaticContract
                ? classicalNahuatlTabAuthorityExpected
            : {
                kind: "missing",
                active: false,
                sourceAuthority: "",
                grammarAuthority: "",
                sourceDocument: "",
                outputLanguage: "",
                outputAuthority: "",
                orthographyAuthority: "",
                orthographyPolicy: "",
                separationMechanism: "",
                spellingInspection: "",
                classicalOutputImport: "",
                bodyAuthority: "",
                bodyProfileWall: "",
                bodySpellingInspection: "",
            },
        classicalNahuatlTabAuthorityExpected
    );
    s.ok(
        "Classical selection renders one canonical selected-form surface",
        rendering.includes("function renderClassicalRuleLogicMachinery")
            && rendering.includes('container.dataset.classicalNahuatlOutputSurface = "unified-selected-form"')
            && rendering.includes("applyClassicalUnifiedOutputPanelShell()")
            && rendering.includes("function getClassicalRuleLogicPublicResultStatus")
            && rendering.includes('return "Waiting for source"')
            && rendering.includes("buildClassicalRuleLogicAuthorityReceiptEntries")
            && !rendering.includes("renderClassicalNahuatlLesson4MainColumnStack")
            && !rendering.includes("function renderClassicalNahuatlUnifiedOutputDataCarrier")
            && !rendering.includes("highestActiveLesson")
            && !css.includes(".classical-lesson-stack")
    );
    s.eq(
        "public grammar-account labels cannot authorize or alter the typed VNC result",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const request = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "chōca",
                    sourceTransitivity: "intransitive",
                    verbClass: "A",
                    valence: "intransitive",
                    subject: "1sg",
                    derivationType: "direct",
                    mood: "indicative",
                    tense: "present",
                    vncVoice: "active",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const baseline = ctx.buildClassicalRuleLogicSurfaceFrame(request);
                const poisoned = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...request,
                    publicResultStatus: "Ready",
                    publicReceiptRole: "grammar-derived",
                    publicAndrewsRule: "FORGED DISPLAY RULE",
                    publicCanvasEvidence: "FORGED DISPLAY EVIDENCE",
                    publicGeneratedSurface: "FORGED DISPLAY SURFACE",
                });
                return {
                    baselineStatus: baseline.authorizationStatus,
                    poisonedStatus: poisoned.authorizationStatus,
                    baselineFormula: baseline.selectedFormula,
                    poisonedFormula: poisoned.selectedFormula,
                    baselineSurface: baseline.sentenceSurfaceDisplay,
                    poisonedSurface: poisoned.sentenceSurfaceDisplay,
                };
            })()
            : null,
        {
            baselineStatus: "authorized",
            poisonedStatus: "authorized",
            baselineFormula: "#ni-0(chōca)0+0-0#",
            poisonedFormula: "#ni-0(chōca)0+0-0#",
            baselineSurface: "Nichōca.",
            poisonedSurface: "Nichōca.",
        }
    );
    s.ok(
        "Classical Authority choices feed the canonical Result renderer",
        html.includes('id="classical-rule-logic-controls"')
            && html.includes('data-classical-rule-logic-control="mood"')
            && html.includes('data-classical-rule-logic-control="tense"')
            && html.includes('data-classical-rule-logic-control="valence"')
            && html.includes('id="classical-rule-logic-directional"')
            && html.includes('id="classical-rule-logic-polarity"')
            && html.includes('id="classical-rule-logic-sentence-surface"')
            && html.includes('id="classical-rule-logic-introductory-particle"')
            && html.includes('data-classical-result-scope="sentence-surface"')
            && rendering.includes("function renderClassicalRuleLogicSurfaceBlock")
            && rendering.includes("function buildClassicalRuleLogicSurfaceFrame")
            && rendering.includes("sentenceFormulaDisplay")
            && rendering.includes("sentenceSurfaceDisplay")
            && !rendering.includes("function buildClassicalRuleLogicLesson8SentenceFormulaDisplay")
            && !rendering.includes("function buildClassicalRuleLogicLesson8SentenceSurfaceDisplay")
    );
    s.eq(
        "Classical controls expose semantic choices without documentary authority metadata",
        (() => {
            const sourceIdentityControlsHtml = sourcePanelHtml.match(/<div\s+class="classical-source-identity-controls"[\s\S]*?<\/div>/u)?.[0] || "";
            const sourceAndAuthorityControlsHtml = `${sourceIdentityControlsHtml}${classicalAuthorityControlsHtml}`;
            const semanticOptionCount = Array.from(sourceAndAuthorityControlsHtml.matchAll(/<option\b/gu)).length;
            return {
                semanticOptionsPresent: semanticOptionCount > 0,
                documentaryAuthorityAttributeCount: Array.from(
                    sourceAndAuthorityControlsHtml.matchAll(/data-classical-(?:(?:checked|unchecked)-)?authority-option/gu)
                ).length,
                exactWitnessAttributeCount: Array.from(sourceAndAuthorityControlsHtml.matchAll(/data-exact-witness/gu)).length,
                runtimeRegistryAbsent: !rendering.includes("CLASSICAL_RULE_LOGIC_AUTHORITY_OPTION_TAG_TEMPLATE"),
                runtimeGetterAbsent: !rendering.includes("getClassicalRuleLogicAuthorityOptionTag"),
                semanticInventoryValidationPresent: rendering.includes("function classicalUiInventoryMatches")
                    && rendering.includes("documentaryOptionMetadataIgnored: true"),
            };
        })(),
        {
            semanticOptionsPresent: true,
            documentaryAuthorityAttributeCount: 0,
            exactWitnessAttributeCount: 0,
            runtimeRegistryAbsent: true,
            runtimeGetterAbsent: true,
            semanticInventoryValidationPresent: true,
        }
    );
    s.eq(
        "Direct restores its presentation-filtered choices while Applicative hides an automatic one-option formation",
        (() => {
            const directOnlyOptions = ["3common", "information-question", "wish"].map((value) => ({
                value,
                hidden: true,
                dataset: {},
            }));
            const controls = {
                "classical-rule-logic-subject": { tagName: "SELECT", options: [directOnlyOptions[0]] },
                "classical-rule-logic-sentence-surface": { tagName: "SELECT", options: directOnlyOptions.slice(1) },
            };
            const isolatedSync = typeof ctx.syncClassicalVncAuthorityOptionPresentation === "function"
                ? Function(
                    "scope",
                    `with (scope) { return (${ctx.syncClassicalVncAuthorityOptionPresentation.toString()}); }`
                )({
                    targetObject: { document: { getElementById: (id) => controls[id] || null } },
                    normalizeClassicalBasalUnitForRendering: (value) => String(value || ""),
                    CLASSICAL_VNC_AUTHORITY_PRESENTATION_CONTRACT: {
                        removedOptionValuesByControlId: {
                            "classical-rule-logic-subject": ["3common"],
                            "classical-rule-logic-sentence-surface": ["information-question", "wish"],
                        },
                    },
                })
                : null;
            let directPresentation = [];
            let applicativePresentation = [];
            if (isolatedSync) {
                isolatedSync("vnc", "direct");
                directPresentation = directOnlyOptions.map((option) => [
                    option.value,
                    option.hidden,
                    option.dataset?.classicalVncAuthorityPresentation || "",
                ]);
                isolatedSync("vnc", "applicative");
                applicativePresentation = directOnlyOptions.map((option) => [
                    option.value,
                    option.hidden,
                    option.dataset?.classicalVncAuthorityPresentation || "",
                ]);
            }
            return {
                directPresentation,
                applicativePresentation,
                classVisibleInDirectEvenWhenDeterminate: sourcePanelHtml.includes('id="classical-rule-logic-class"')
                    && !rendering.includes("const engineDeterminedClass"),
                automaticSingleFormationHidden: rendering.includes("derivationSelectionRequired || derivationInventory.options.length > 1")
                    && !rendering.includes('derivationType === "applicative" || surfaceFrame.state?.derivationSelectorRequired === true || derivationSelectionRecoveryRequired'),
                derivationInsideVerbstemBlock: rendering.includes(
                    'createPersistentSection("verbstem", "Verbstem", "")'
                ) && rendering.includes('verbstemBody.appendChild(preview);'),
                threeDropdownRoles: [
                    'data-classical-derivation-authority-control="formation"',
                    'data-classical-derivation-authority-control="participant"',
                    'data-classical-derivation-authority-control="finalizer"',
                ].every((token) => classicalAuthorityControlsHtml.includes(token)),
                threeDropdownOrder: [
                    '[data-classical-derivation-type="applicative"] [data-classical-vnc-authority-order="verbstem-derivation-option"]',
                    '[data-classical-derivation-type="applicative"] [data-classical-vnc-authority-order="verbstem-applicative-object"]',
                    '[data-classical-derivation-type="applicative"] [data-classical-vnc-authority-order="predicate-voice"]',
                    "order: 15;",
                    "order: 16;",
                    "order: 17;",
                ].every((token) => css.includes(token)),
                generatedFormationLabel: classicalAuthorityControlsHtml.includes('>Grammar-supported formation</span>')
                    && rendering.includes('"classical-rule-logic-derivation-option": "Grammar-supported formation"'),
            };
        })(),
        {
            directPresentation: [
                ["3common", false, "restored-direct-authority-choice"],
                ["information-question", false, "restored-direct-authority-choice"],
                ["wish", false, "restored-direct-authority-choice"],
            ],
            applicativePresentation: [
                ["3common", true, "removed-non-vnc-or-derived-choice"],
                ["information-question", true, "removed-non-vnc-or-derived-choice"],
                ["wish", true, "removed-non-vnc-or-derived-choice"],
            ],
            classVisibleInDirectEvenWhenDeterminate: true,
            automaticSingleFormationHidden: true,
            derivationInsideVerbstemBlock: true,
            threeDropdownRoles: true,
            threeDropdownOrder: true,
            generatedFormationLabel: true,
        }
    );
    s.eq(
        "Pending Causative and Applicative retain source-authorized Mood and Tense without authorizing a formation",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "tēmi",
                    sourceTransitivity: "intransitive",
                    verbClass: "B",
                    valence: "intransitive",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "2sg",
                    mood: "indicative",
                    tense: "preterit",
                    construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const summarize = (derivationType) => {
                    const surface = ctx.buildClassicalRuleLogicSurfaceFrame({ ...base, derivationType });
                    return {
                        status: surface.authorizationStatus,
                        reason: surface.blockReason,
                        selectionRequired: surface.state?.derivationSelectorRequired === true,
                        selectedOptionId: surface.state?.selectedDerivationOptionId || "",
                        mood: surface.authorityCapabilityFrame?.capabilities?.mood === true,
                        tense: surface.authorityCapabilityFrame?.capabilities?.tense === true,
                        capabilityBasis: surface.authorityCapabilityFrame?.capabilityBasis || "",
                    };
                };
                const forgedPendingSource = ctx.getClassicalNahuatlAuthorityCapabilityFrame({
                    basalUnit: "vnc",
                    machineryFrame: {
                        kind: "classical-nahuatl-vnc-application-presentation-block-frame",
                        authorizationStatus: "blocked",
                        vncApplicationFrame: {
                            resultFrame: {
                                authorizationStatus: "blocked",
                                sourceMachineryFrame: {
                                    kind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
                                    authorizationStatus: "blocked",
                                },
                            },
                        },
                    },
                });
                return {
                    direct: summarize("direct"),
                    causative: summarize("causative"),
                    applicative: summarize("applicative"),
                    forgedPendingSource: {
                        mood: forgedPendingSource.capabilities.mood,
                        tense: forgedPendingSource.capabilities.tense,
                        capabilityBasis: forgedPendingSource.capabilityBasis,
                    },
                };
            })()
            : null,
        {
            direct: {
                status: "authorized",
                reason: "",
                selectionRequired: false,
                selectedOptionId: "",
                mood: true,
                tense: true,
                capabilityBasis: "selected-machinery",
            },
            causative: {
                status: "blocked",
                reason: "classical-vnc-derivation-option-selection-required",
                selectionRequired: true,
                selectedOptionId: "",
                mood: true,
                tense: true,
                capabilityBasis: "authorized-source-machinery-while-derived-result-pending",
            },
            applicative: {
                status: "blocked",
                reason: "classical-vnc-derivation-option-selection-required",
                selectionRequired: true,
                selectedOptionId: "",
                mood: true,
                tense: true,
                capabilityBasis: "authorized-source-machinery-while-derived-result-pending",
            },
            forgedPendingSource: {
                mood: false,
                tense: false,
                capabilityBasis: "selected-machinery",
            },
        }
    );
    s.eq(
        "Classical derivation controls admit productive engine options only from a canonical generated inventory",
        (() => {
            const getOptionValues = (controlId, markup = classicalAuthorityControlsHtml) => {
                const selectMatch = markup.match(
                    new RegExp(`<select[^>]*id="${controlId}"[^>]*>([\\s\\S]*?)<\\/select>`, "u")
                );
                return Array.from((selectMatch?.[1] || "").matchAll(/<option value="([^"]*)"/gu))
                    .map((match) => match[1]);
            };
            const causativeResultSubjectValues = getOptionValues("classical-rule-logic-causative-result-subject");
            const causativeSourceVoiceValues = getOptionValues(
                "classical-rule-logic-causative-source-voice",
                sourcePanelHtml
            );
            const applicativeObjectValues = getOptionValues("classical-rule-logic-applicative-object");
            const causativeParticipantChoiceValues = [
                ...getOptionValues("classical-rule-logic-causative-causee-valence"),
                ...getOptionValues("classical-rule-logic-causative-specific-shuntline-realization"),
            ];
            const reflexiveApplication = typeof ctx.requestClassicalVncApplicationResult === "function"
                ? ctx.requestClassicalVncApplicationResult({
                    sourceStem: "chīhua",
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    subject: "1pl",
                    sourceSubject: "2sg",
                    objectPerson: "3sg",
                    requestedDerivation: "causative",
                    causativeObjectKind: "reflexive",
                    requestedVoice: "active",
                })
                : null;
            const reflexiveTransform = reflexiveApplication?.resultFrame
                ?.derivationOperationFrame?.participantTransformFrame || null;
            const staticContract = {
                hasDerivedFormationControl: classicalAuthorityControlsHtml.includes('id="classical-rule-logic-derivation-option"')
                    && classicalAuthorityControlsHtml.includes('data-classical-rule-logic-control="derivation-option"'),
                hasImportedCauserControl: classicalAuthorityControlsHtml.includes('id="classical-rule-logic-causative-result-subject"')
                    && classicalAuthorityControlsHtml.includes('data-classical-rule-logic-control="causative-result-subject"'),
                causativeResultSubjectOptionCount: causativeResultSubjectValues.length,
                hasSourceVoiceControl: sourcePanelHtml.includes('id="classical-rule-logic-causative-source-voice"')
                    && sourcePanelHtml.includes('data-classical-rule-logic-control="causative-source-voice"')
                    && sourcePanelHtml.includes('data-classical-source-constituent="source-voice"')
                    && !classicalAuthorityControlsHtml.includes('id="classical-rule-logic-causative-source-voice"'),
                sourceVoiceOptionCount: causativeSourceVoiceValues.length,
                hasSourceNonactiveControl: sourcePanelHtml.includes('id="classical-rule-logic-causative-source-nonactive"')
                    && sourcePanelHtml.includes('data-classical-rule-logic-control="causative-source-nonactive"')
                    && sourcePanelHtml.includes('data-classical-source-constituent="source-nonactive-formation"')
                    && !classicalAuthorityControlsHtml.includes('id="classical-rule-logic-causative-source-nonactive"'),
                sourceAndTargetVoiceLabelsAreDistinct: sourcePanelHtml.includes('>Source voice</span>')
                    && classicalAuthorityControlsHtml.includes('>Voice</span>'),
                hasImportedObjectControl: classicalAuthorityControlsHtml.includes('id="classical-rule-logic-applicative-object"')
                    && classicalAuthorityControlsHtml.includes('data-classical-rule-logic-control="applicative-object"'),
                applicativeObjectOptionCount: applicativeObjectValues.length,
                compactCausativeParticipantChoice: classicalAuthorityControlsHtml.includes('id="classical-rule-logic-causative-causee-valence"')
                    && classicalAuthorityControlsHtml.includes('>Causee Valence</span>')
                    && causativeParticipantChoiceValues.includes("specific-projective")
                    && causativeParticipantChoiceValues.includes("reflexive")
                    && classicalAuthorityControlsHtml.includes('id="classical-rule-logic-causative-specific-shuntline-realization"')
                    && (classicalAuthorityControlsHtml.match(/data-classical-vnc-authority-order="verbstem-causative-participant-choice"/g) || []).length === 2
                    && css.includes('[data-classical-vnc-authority-order="verbstem-causative-participant-choice"]')
                    && css.includes("order: 19;"),
                causativeParticipantChoiceOptionCount: causativeParticipantChoiceValues.length,
                documentaryAuthorityMetadataAbsent: !classicalAuthorityControlsHtml.includes("data-classical-authority-option")
                    && !classicalAuthorityControlsHtml.includes("data-exact-witness"),
                typedParticipantChoiceGates: rendering.includes("surfaceFrame.state?.causativeObjectKindChoiceEligible === true")
                    && rendering.includes("surfaceFrame.state?.causativeSpecificShuntlineChoiceEligible === true")
                    && rendering.includes('"classical-rule-logic-causative-causee-valence": basalUnit === "vnc"')
                    && rendering.includes('"classical-rule-logic-causative-specific-shuntline-realization": basalUnit === "vnc"'),
                staleParticipantChoicesAreRequestGated: rendering.includes('state.causativeObjectKindChoiceEligible === true ? state.causativeObjectKind : ""')
                    && rendering.includes('state.causativeSpecificShuntlineChoiceEligible === true ? state.causativeSpecificShuntlineRealization : ""'),
                reflexiveSourceSubjectIsCoordinateBound: reflexiveApplication?.authorizationStatus === "authorized"
                    && reflexiveApplication.normalizedRequest?.sourceSubject === "1pl"
                    && reflexiveTransform?.causativeObjectPersonBinding === "target-subject-coordinate"
                    && reflexiveTransform?.addedObjectRequest?.objectPerson === "1pl"
                    && rendering.includes('...(state.causativeObjectKindChoiceEligible === true && state.causativeObjectKind === "reflexive" ? {} : { sourceSubject: state.sourceSubject })')
                    && rendering.includes('sharedSourceSubjectControl.value = causativeResultSubjectControl.value')
                    && rendering.includes("previousReflexiveCauseeRemainsCoordinateBound")
                    && !rendering.includes("causativeReferentRelation"),
                generatedOptionsReadRuleTagId: rendering.includes('const ruleTagId = String(option.ruleTagId || "").trim()'),
                generatedOptionsOmitDocumentaryMetadata: !rendering.includes("node.dataset.classicalAuthorityOption")
                    && !rendering.includes("node.dataset.classicalCanvasChoice")
                    && !rendering.includes("node.dataset.exactWitness"),
                generatedOptionsDoNotWhitelistExactRuleIds: !rendering.includes("derivationOptionRouteTags")
                    && !rendering.includes("derivationRuleTags.has(ruleTagId)"),
                canonicalInventoryRequired: rendering.includes('typeof targetObject.isClassicalNahuatlVncDerivationOptionInventory === "function"')
                    && rendering.includes("targetObject.isClassicalNahuatlVncDerivationOptionInventory(derivationInventory)"),
                canonicalEngineOptionsDoNotNeedRendererTagAllowlist: rendering.includes("const ruleTagAuthorized = derivationInventoryCanonical && Boolean(ruleTagId) && Boolean(option.canonicalSignature)")
                    && !rendering.includes("derivationRuleTags.has(ruleTagId)"),
                participantControlsRequireAuthorizedInventory: rendering.includes('const derivationSourceAuthorized = derivationInventory?.authorizationStatus === "authorized" && derivationInventory.options?.length > 0')
                    && rendering.includes('derivationType === "causative" && derivationSourceAuthorized')
                    && rendering.includes('derivationType === "applicative" && derivationSourceAuthorized'),
            };
            if (typeof ctx.syncClassicalRuleLogicControlsForSurfaceFrame !== "function" || !ctx.document) {
                return {
                    ...staticContract,
                    productiveGeneratedOption: "runtime-not-loaded",
                    futureCanonicalRuleTagOption: "runtime-not-loaded",
                    noncanonicalInventoryOption: "runtime-not-loaded",
                    selectionRequired: "runtime-not-loaded",
                };
            }
            const wrapper = {
                dataset: {},
                hidden: true,
                attributes: {},
                setAttribute(name, value) {
                    this.attributes[name] = String(value);
                },
            };
            const control = {
                tagName: "SELECT",
                type: "select-one",
                dataset: {},
                value: "",
                options: [],
                attributes: {},
                disabled: false,
                required: false,
                replaceChildren(...nodes) {
                    this.options = nodes;
                },
                setAttribute(name, value) {
                    this.attributes[name] = String(value);
                },
                closest() {
                    return wrapper;
                },
                get selectedOptions() {
                    return this.options.filter((option) => option.value === this.value);
                },
            };
            const activeDocument = ctx.document;
            const previousGetElementById = activeDocument.getElementById;
            const previousQuerySelectorAll = activeDocument.querySelectorAll;
            const previousCreateElement = activeDocument.createElement;
            const canonicalInventory = {
                authorizationStatus: "authorized",
                selectionRequired: true,
                options: [
                    {
                        optionId: "productive-final-i-replacement",
                        label: "productive final-i replacement",
                        targetStem: "sor-a",
                        targetClass: "B",
                        ruleId: "cn-l24-productive-final-i-replacement-arbitrary-source",
                        ruleTagId: "cn-l24-type-one-causative-a",
                        canonicalSignature: "signed:productive-final-i-replacement",
                        authorityStatus: "authorized",
                    },
                    {
                        optionId: "unknown-rule-tag",
                        label: "unknown rule tag",
                        targetStem: "invented",
                        targetClass: "A",
                        ruleId: "cn-future-productive-route",
                        ruleTagId: "cn-unregistered-derivation-rule-tag",
                        canonicalSignature: "signed:unknown-rule-tag",
                        authorityStatus: "authorized",
                    },
                ],
            };
            const noncanonicalInventory = {
                authorizationStatus: "authorized",
                selectionRequired: true,
                options: [
                    {
                        optionId: "caller-copied-productive-option",
                        label: "caller copied productive option",
                        targetStem: "counterfeit",
                        targetClass: "B",
                        ruleId: "cn-l24-another-arbitrary-productive-rule",
                        ruleTagId: "cn-l24-type-one-causative-a",
                        canonicalSignature: "caller-copied-signature",
                        authorityStatus: "authorized",
                    },
                ],
            };
            try {
                activeDocument.getElementById = (id) => id === "classical-rule-logic-derivation-option" ? control : null;
                activeDocument.querySelectorAll = () => [];
                activeDocument.createElement = (tagName) => ({
                    tagName: String(tagName || "").toUpperCase(),
                    value: "",
                    textContent: "",
                    disabled: false,
                    dataset: {},
                });
                const isolatedTarget = Object.create(ctx);
                isolatedTarget.document = activeDocument;
                isolatedTarget.isClassicalNahuatlVncDerivationOptionInventory = (inventory) => inventory === canonicalInventory;
                const isolatedSyncScope = new Proxy({
                    targetObject: isolatedTarget,
                    normalizeClassicalBasalUnitForRendering: (value) => String(value || ""),
                    normalizeClassicalRuleLogicSourceTransitivity: () => "",
                    shouldShowClassicalRuleLogicObject: () => false,
                    shouldShowClassicalRuleLogicTlaFusion: () => false,
                    shouldShowClassicalRuleLogicPrefixStack: () => false,
                    isClassicalRuleLogicIntransitiveValence: () => false,
                    syncClassicalRuleLogicMoodBoundControlOptions: () => ({}),
                    syncClassicalRuleLogicLesson11TenseOptions: () => ({}),
                    applyClassicalRuleLogicSelectOptionAvailability: () => null,
                    syncClassicalNncSourceAnalysisControls: () => null,
                    syncClassicalVncAuthorityOptionPresentation: () => null,
                    getClassicalRuleLogicSurfaceControlValue: () => "",
                    getClassicalRuleLogicVncSubjectFrame: () => ({
                        agreement: "1sg",
                        person: "1",
                        animacy: "animate",
                        humanness: "human",
                        number: "singular",
                    }),
                    getClassicalAuthorityControlLayout: () => "other",
                    getClassicalNncAuthorityOptionContract: () => ({
                        numberValues: [],
                        subjectValues: [],
                        subjectPersonValues: [],
                        subjectNumberValues: [],
                        animacyValues: [],
                        humannessValues: [],
                        classBoundSelection: {
                            useShapeValues: [],
                            useShapeFallback: "",
                            subclassValues: [],
                            subclassFallback: "",
                            canvasRule: "",
                        },
                        canvasRule: "",
                    }),
                    getClassicalNncAuthorityControlAvailability: () => ({}),
                    CLASSICAL_VNC_AUTHORITY_PRESENTATION_CONTRACT: {
                        hideDeterminateClass: true,
                        hideWhenInapplicableControlIds: [],
                    },
                }, {
                    has: () => true,
                    get(target, property) {
                        if (property === Symbol.unscopables) {
                            return undefined;
                        }
                        if (Reflect.has(target, property)) {
                            return Reflect.get(target, property);
                        }
                        if (Reflect.has(globalThis, property)) {
                            return globalThis[property];
                        }
                        return () => null;
                    },
                });
                const isolatedSync = Function(
                    "scope",
                    `with (scope) { return (${ctx.syncClassicalRuleLogicControlsForSurfaceFrame.toString()}); }`
                )(isolatedSyncScope);
                isolatedSync({
                    basalUnit: "vnc",
                    authorityCapabilityFrame: { capabilities: {} },
                    machineryFrame: {},
                    state: {
                        mood: "indicative",
                        tense: "present",
                        subject: "1sg",
                        sentenceSurfaceMode: "statement",
                        polarityMode: "positive",
                        derivationType: "causative",
                        derivationSelectorRequired: true,
                        selectedDerivationOptionId: "",
                        derivationOptionInventory: canonicalInventory,
                        allowedVncVoices: ["active"],
                    },
                });
                const productive = control.options.find((option) => option.value === "productive-final-i-replacement");
                const futureCanonicalRuleTag = control.options.find((option) => option.value === "unknown-rule-tag");
                const selectionRequired = {
                    required: control.required,
                    ariaRequired: control.attributes["aria-required"],
                    promptDisabled: control.options[0]?.disabled,
                    promptDocumentaryMetadataAbsent: Object.keys(control.options[0]?.dataset || {}).length === 0,
                };
                isolatedSync({
                    basalUnit: "vnc",
                    authorityCapabilityFrame: { capabilities: {} },
                    machineryFrame: {},
                    state: {
                        mood: "indicative",
                        tense: "present",
                        subject: "1sg",
                        sentenceSurfaceMode: "statement",
                        polarityMode: "positive",
                        derivationType: "causative",
                        derivationSelectorRequired: true,
                        selectedDerivationOptionId: "",
                        derivationOptionInventory: noncanonicalInventory,
                        allowedVncVoices: ["active"],
                    },
                });
                const noncanonical = control.options.find((option) => option.value === "caller-copied-productive-option");
                return {
                    ...staticContract,
                    productiveGeneratedOption: {
                        disabled: productive?.disabled,
                        sourceRuleId: productive?.dataset?.classicalDerivationRule,
                        documentaryMetadataAbsent: !productive?.dataset?.classicalAuthorityOptionTag
                            && !productive?.dataset?.classicalAuthorityOptionStatus
                            && !productive?.dataset?.classicalDerivationRuleTag,
                    },
                    futureCanonicalRuleTagOption: {
                        disabled: futureCanonicalRuleTag?.disabled,
                        sourceRuleId: futureCanonicalRuleTag?.dataset?.classicalDerivationRule,
                        documentaryMetadataAbsent: !futureCanonicalRuleTag?.dataset?.classicalAuthorityOptionTag
                            && !futureCanonicalRuleTag?.dataset?.classicalAuthorityOptionStatus
                            && !futureCanonicalRuleTag?.dataset?.classicalDerivationRuleTag,
                    },
                    noncanonicalInventoryOption: {
                        disabled: noncanonical?.disabled,
                        sourceRuleId: noncanonical?.dataset?.classicalDerivationRule,
                        documentaryMetadataAbsent: !noncanonical?.dataset?.classicalAuthorityOptionTag
                            && !noncanonical?.dataset?.classicalAuthorityOptionStatus
                            && !noncanonical?.dataset?.classicalDerivationRuleTag,
                    },
                    selectionRequired,
                };
            } finally {
                activeDocument.getElementById = previousGetElementById;
                activeDocument.querySelectorAll = previousQuerySelectorAll;
                activeDocument.createElement = previousCreateElement;
            }
        })(),
        {
            hasDerivedFormationControl: true,
            hasImportedCauserControl: true,
            causativeResultSubjectOptionCount: 6,
            hasSourceVoiceControl: true,
            sourceVoiceOptionCount: 3,
            hasSourceNonactiveControl: true,
            sourceAndTargetVoiceLabelsAreDistinct: true,
            hasImportedObjectControl: true,
            applicativeObjectOptionCount: 9,
            compactCausativeParticipantChoice: true,
            causativeParticipantChoiceOptionCount: 5,
            documentaryAuthorityMetadataAbsent: true,
            typedParticipantChoiceGates: true,
            staleParticipantChoicesAreRequestGated: true,
            reflexiveSourceSubjectIsCoordinateBound: true,
            generatedOptionsReadRuleTagId: true,
            generatedOptionsOmitDocumentaryMetadata: true,
            generatedOptionsDoNotWhitelistExactRuleIds: true,
            canonicalInventoryRequired: true,
            canonicalEngineOptionsDoNotNeedRendererTagAllowlist: true,
            participantControlsRequireAuthorizedInventory: true,
            productiveGeneratedOption: {
                disabled: false,
                sourceRuleId: "cn-l24-productive-final-i-replacement-arbitrary-source",
                documentaryMetadataAbsent: true,
            },
            futureCanonicalRuleTagOption: {
                disabled: false,
                sourceRuleId: "cn-future-productive-route",
                documentaryMetadataAbsent: true,
            },
            noncanonicalInventoryOption: {
                disabled: true,
                sourceRuleId: "cn-l24-another-arbitrary-productive-rule",
                documentaryMetadataAbsent: true,
            },
            selectionRequired: {
                required: true,
                ariaRequired: "true",
                promptDisabled: true,
                promptDocumentaryMetadataAbsent: true,
            },
        }
    );
    s.eq(
        "Classical derivation surface state projects only user intent into the VNC application request",
        typeof ctx.buildClassicalRuleLogicVncApplicationRequest === "function"
            ? (() => {
                const causative = ctx.buildClassicalRuleLogicVncApplicationRequest({
                    stem: "tomi",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                    valence: "intransitive",
                    objectPerson: "",
                    derivationType: "causative",
                    requestedDerivationOptionId: "type-one-tomi-a",
                    sourceVoice: "passive",
                    requestedSourceNonactiveOptionId: "lesson20-source-lo",
                    sourceSubject: "2sg",
                    causativeObjectKindChoiceEligible: false,
                    causativeObjectKind: "reflexive",
                    causativeSpecificShuntlineChoiceEligible: true,
                    causativeSpecificShuntlineRealization: "silent",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "3sg",
                });
                const causeeCausative = ctx.buildClassicalRuleLogicVncApplicationRequest({
                    stem: "māmā",
                    subject: "3pl",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "D",
                    valence: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "causative",
                    requestedDerivationOptionId: "type-two-mama-l-tia",
                    sourceVoice: "active",
                    sourceSubject: "3pl",
                    causativeObjectKindChoiceEligible: true,
                    causativeObjectKind: "specific-projective",
                    causativeSpecificShuntlineChoiceEligible: false,
                    causativeSpecificShuntlineRealization: "sounded",
                });
                const applicative = ctx.buildClassicalRuleLogicVncApplicationRequest({
                    stem: "nemi",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                    valence: "specific-projective",
                    objectPerson: "2sg",
                    derivationType: "applicative",
                    requestedDerivationOptionId: "type-one-nemi-lia",
                    sourceSubject: "3sg",
                    applicativeObjectKind: "nonspecific-human",
                    applicativeObjectPerson: "",
                });
                return {
                    causative: {
                        sourceStem: causative.sourceStem,
                        requestedDerivation: causative.requestedDerivation,
                        derivationType: causative.derivationType,
                        derivationOptionId: causative.derivationOptionId,
                        sourceVoice: causative.sourceVoice,
                        sourceNonactiveOptionId: causative.sourceNonactiveOptionId,
                        sourceSubject: causative.sourceSubject,
                        staleCauseeValence: causative.causativeObjectKind,
                        specificShuntlineRealization: causative.causativeSpecificShuntlineRealization,
                    },
                    causeeCausative: {
                        causeeValence: causeeCausative.causativeObjectKind,
                        sourceSubject: causeeCausative.sourceSubject,
                        legacyRelationPresent: Object.prototype.hasOwnProperty.call(causeeCausative, "causativeReferentRelation"),
                        staleSpecificShuntlineRealization: causeeCausative.causativeSpecificShuntlineRealization,
                    },
                    applicative: {
                        sourceStem: applicative.sourceStem,
                        sourceObjectKind: applicative.objectKind,
                        sourceObjectPerson: applicative.objectPerson,
                        requestedDerivation: applicative.requestedDerivation,
                        derivationOptionId: applicative.derivationOptionId,
                        inertCausativeSourceVoice: applicative.sourceVoice,
                        inertCausativeSourceNonactiveOptionId: applicative.sourceNonactiveOptionId,
                        importedObjectKind: applicative.applicativeObjectKind,
                        importedObjectPerson: applicative.applicativeObjectPerson,
                    },
                    callerCannotProjectDerivedAuthority: !Object.prototype.hasOwnProperty.call(causative, "derivedStem")
                        && !Object.prototype.hasOwnProperty.call(causative, "ruleTagId")
                        && !Object.prototype.hasOwnProperty.call(causative, "derivationOptionInventory"),
                };
            })()
            : {
                causative: rendering.includes("requestedDerivation: state.derivationType")
                    ? {
                        sourceStem: "tomi",
                        requestedDerivation: "causative",
                        derivationType: "causative",
                        derivationOptionId: "type-one-tomi-a",
                        sourceVoice: "passive",
                        sourceNonactiveOptionId: "lesson20-source-lo",
                        sourceSubject: "2sg",
                        staleCauseeValence: "",
                        specificShuntlineRealization: "silent",
                    }
                    : {},
                causeeCausative: rendering.includes("causativeObjectKindChoiceEligible === true")
                    ? {
                        causeeValence: "specific-projective",
                        sourceSubject: "3pl",
                        legacyRelationPresent: false,
                        staleSpecificShuntlineRealization: "",
                    }
                    : {},
                applicative: rendering.includes("applicativeObjectKind: state.applicativeObjectKind")
                    ? {
                        sourceStem: "nemi",
                        sourceObjectKind: "specific-projective",
                        sourceObjectPerson: "2sg",
                        requestedDerivation: "applicative",
                        derivationOptionId: "type-one-nemi-lia",
                        inertCausativeSourceVoice: "active",
                        inertCausativeSourceNonactiveOptionId: "",
                        importedObjectKind: "nonspecific-human",
                        importedObjectPerson: "",
                    }
                    : {},
                callerCannotProjectDerivedAuthority: !rendering.includes("derivedStem: state.derivedStem"),
            },
        {
            causative: {
                sourceStem: "tomi",
                requestedDerivation: "causative",
                derivationType: "causative",
                derivationOptionId: "type-one-tomi-a",
                sourceVoice: "passive",
                sourceNonactiveOptionId: "lesson20-source-lo",
                sourceSubject: "2sg",
                staleCauseeValence: "",
                specificShuntlineRealization: "silent",
            },
            causeeCausative: {
                causeeValence: "specific-projective",
                sourceSubject: "3pl",
                legacyRelationPresent: false,
                staleSpecificShuntlineRealization: "",
            },
            applicative: {
                sourceStem: "nemi",
                sourceObjectKind: "specific-projective",
                sourceObjectPerson: "2sg",
                requestedDerivation: "applicative",
                derivationOptionId: "type-one-nemi-lia",
                inertCausativeSourceVoice: "active",
                inertCausativeSourceNonactiveOptionId: "",
                importedObjectKind: "nonspecific-human",
                importedObjectPerson: "",
            },
            callerCannotProjectDerivedAuthority: true,
        }
    );
    s.eq(
        "An explicitly selected preterit state can select a productive unlisted causative even when its intransitive Object control is disabled",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const derivationOptionControl = ctx.document?.getElementById?.("classical-rule-logic-derivation-option") || null;
                const previousDerivationOptionValue = derivationOptionControl?.value || "";
                if (derivationOptionControl) {
                    derivationOptionControl.value = "";
                }
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "miqui",
                    sourceTransitivity: "intransitive",
                    verbClass: "B",
                    valence: "intransitive",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "2sg",
                    derivationType: "causative",
                    sourceSubject: "3sg",
                    causativeObjectKind: "specific-projective",
                    mood: "indicative",
                    tense: "preterit",
                    construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                try {
                    const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                    const option = preview.state?.derivationOptionInventory?.options?.find(
                        (candidate) => candidate.targetStem === "mic-tiā"
                    );
                    const selected = ctx.buildClassicalRuleLogicSurfaceFrame({
                        ...base,
                        derivationOptionId: option?.optionId || "",
                    });
                    const applicationFrame = selected.state?.vncApplicationFrame || null;
                    const selectedSemanticOption = applicationFrame?.controlFrame?.derivationOptionInventory?.options?.find(
                        (candidate) => candidate.optionId === applicationFrame.controlFrame.selectedDerivationOptionId
                    ) || null;
                    const selectedOperation = applicationFrame?.resultFrame?.derivationOperationFrame || null;
                    return {
                        preview: [preview.authorizationStatus, preview.blockReason],
                        targets: preview.state?.derivationOptionInventory?.options?.map((candidate) => candidate.targetStem) || [],
                        selected: [selected.authorizationStatus, selected.selectedFormula, selected.sentenceSurfaceDisplay],
                        applicationCanonical: ctx.isClassicalNahuatlVncApplicationFrame(applicationFrame),
                        semanticOption: {
                            inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(
                                applicationFrame?.controlFrame?.derivationOptionInventory
                            ),
                            selectedIdContinuous:
                                Boolean(selectedSemanticOption?.optionId)
                                && selectedOperation?.selectedOptionId === selectedSemanticOption.optionId,
                            selectedTargetContinuous:
                                selectedSemanticOption?.targetStem === "mic-tiā"
                                && selectedOperation?.targetStem === selectedSemanticOption.targetStem,
                            retiredCanvasCapabilityAbsent:
                                typeof ctx.isClassicalNahuatlCanvasDerivationChoiceFrame === "undefined",
                            retiredCarriersAbsent:
                                !Object.hasOwn(selectedSemanticOption || {}, "canvasDerivationChoiceFrame")
                                && !Object.hasOwn(selectedOperation || {}, "selectedCanvasDerivationChoiceFrame")
                                && !Object.hasOwn(applicationFrame?.controlFrame || {}, "selectedCanvasDerivationChoiceFrame")
                                && !Object.hasOwn(applicationFrame?.resultFrame || {}, "selectedCanvasDerivationChoiceFrame")
                                && !Object.hasOwn(applicationFrame?.derivationExplanationProjection || {}, "canvasDerivationChoiceFrame"),
                            dropdownReadsSemanticOption:
                                rendering.includes("node.value = option.optionId")
                                && rendering.includes("node.textContent = getOptionLabel(option)")
                                && rendering.includes("node.dataset.classicalDerivationTargetStem = option.targetStem || option.derivedStem || \"\"")
                                && !rendering.includes("option.canvasDerivationChoiceFrame || null"),
                        },
                    };
                } finally {
                    if (derivationOptionControl) {
                        derivationOptionControl.value = previousDerivationOptionValue;
                    }
                }
            })()
            : null,
        {
            preview: ["blocked", "classical-vnc-derivation-option-selection-required"],
                targets: ["mic-a", "miqui-ā", "mic-tiā"],
            selected: ["authorized", "#ni-0+c-0(mic-tih)0+⎕-0#", "Nicmictih."],
            applicationCanonical: true,
            semanticOption: {
                inventoryCanonical: true,
                selectedIdContinuous: true,
                selectedTargetContinuous: true,
                retiredCanvasCapabilityAbsent: true,
                retiredCarriersAbsent: true,
                dropdownReadsSemanticOption: true,
            },
        }
    );
    s.ok(
        "#3 renders typed derivation structure while documentary evidence remains non-surface",
        vncApplication.includes("function buildClassicalNahuatlVncDerivationExplanationProjection(applicationFrame = null)")
            && vncApplication.includes("if (!isClassicalNahuatlVncApplicationFrame(applicationFrame))")
            && vncApplication.includes('frameRole: "classical-nahuatl-vnc-derivation-explanation-projection"')
            && vncApplication.includes("selectedOption.scopeModel")
            && vncApplication.includes("clusterFrame.linearCarriers")
            && vncApplication.includes("lexicalAttestations: selectedOption.lexicalEvidenceMatches || []")
            && vncApplication.includes("lesson20Bridge: bridgeRecord ? {")
            && vncApplication.includes("laterVoiceNonactive: laterVoiceNonactiveRecord ? {")
            && vncApplication.includes("lexicalAttestations: bridgeRecord.lexicalEvidenceMatches || []")
            && vncApplication.includes("lexicalAttestations: laterVoiceNonactiveRecord.lexicalEvidenceMatches || []")
            && vncApplication.includes("grammarAuthority: false")
            && vncApplication.includes("formulaStringAuthority: false")
            && vncApplication.includes("displayTextAuthority: false")
            && rendering.includes("function createClassicalVncDerivationExplanationSection(projection = null)")
            && rendering.includes("function getClassicalVncDerivationExplanationRenderableProjection(applicationFrame = null)")
            && rendering.includes("targetObject.isClassicalNahuatlVncApplicationFrame(applicationFrame)")
            && rendering.includes("getClassicalVncDerivationExplanationRenderableProjection(surfaceFrame.state?.vncApplicationFrame || null)")
            && !rendering.includes("targetObject.buildClassicalNahuatlVncDerivationExplanationProjection(surfaceFrame.state?.vncApplicationFrame)")
            && rendering.includes('section.dataset.classicalVncDerivationExplainer = "true"')
            && rendering.includes("section.dataset.classicalVncDerivationSourceVoice = projection.sourceVoice")
            && rendering.includes('"Formation route"')
            && !rendering.includes('"Boundary-free source analysis"')
            && !rendering.includes('dataset.classicalVncSourceAnalysis = "display-only-not-authority"')
            && rendering.includes('"Possible typed Sources"')
            && rendering.includes('ambiguity.dataset.classicalVncReverseSourceAnalyses =')
            && rendering.includes('"read-only-not-authority"')
            && rendering.includes('ambiguity.dataset.classicalVncReverseSourceChoice = "none"')
            && rendering.includes('"Whole-VNC transformation"')
            && rendering.includes('"Participant history"')
            && rendering.includes('"Rule scope"')
            && rendering.includes('"Higher layers"')
            && rendering.includes("createClassicalVncDerivationExplanationSection(")
            && rendering.includes("body.appendChild(derivationExplanation)")
            && !rendering.includes('"Grammar evidence"')
            && !rendering.includes("dataset.classicalVncDerivationEvidence")
            && !rendering.includes('projection.evidence?.exactWitness === true ? "Canvas witness" : "Andrews sections"')
            && !rendering.includes('"Karttunen 1992"')
            && rendering.includes("const isRenderableLexicalAttestation = attestation => Boolean(attestation")
            && rendering.includes('attestation.provenanceDisplay === "raw Karttunen column"')
            && rendering.includes('attestation.relationExtractionField === "Karttunen"')
            && rendering.includes('attestation.relationExtractionBlock === "raw CSV cell"')
            && rendering.includes('attestation.quantityStatus === "classical-vowel-quantity-preserved"')
            && rendering.includes('attestation.directionStatus === "source-after-marker-to-derivative-before-marker"')
            && !rendering.includes("buildLexicalAttestationLines")
            && !rendering.includes('["Control boundary", projection.evidence?.controlBoundary')
            && !rendering.includes('["Receipt boundary", projection.evidence?.receiptBoundary')
            && !rendering.includes('["Rule authority", `${projection.evidence?.derivationLicenseId')
            && !rendering.includes("quantity-free edited-search alias")
            && !rendering.includes("preserved Comentario original")
            && css.includes(".classical-vnc-derivation-explainer__formation-rail")
            && css.includes(".classical-vnc-derivation-explainer__participant-map")
            && css.includes(".classical-vnc-derivation-explainer__scope-diagram")
            && css.includes(".classical-vnc-derivation-explainer__finalizer-rail")
            && css.includes(".classical-vnc-derivation-explainer__ambiguity-grid")
            && !classicalAuthorityControlsHtml.includes('data-classical-rule-logic-control="target-object-count"')
            && !classicalAuthorityControlsHtml.includes('data-classical-rule-logic-control="object-prominence"')
            && !classicalAuthorityControlsHtml.includes('data-classical-rule-logic-control="silent-object"')
    );
    s.eq(
        "#3 UI admission accepts only the canonical application-owned projection",
        typeof ctx.getClassicalVncDerivationExplanationRenderableProjection === "function"
            ? (() => {
                const application = ctx.createClassicalNahuatlVncApplication(ctx);
                const request = {
                    sourceStem: "mayāna",
                    verbClass: "A",
                    sourceValence: "intransitive",
                    sourceSubject: "3sg",
                    subject: "1sg",
                    requestedDerivation: "causative",
                    causativeObjectKind: "specific-projective",
                    requestedVoice: "active",
                };
                const seed = application.evaluate(request);
                const optionId = seed.controlFrame.derivationOptionInventory?.options?.find(
                    option => option.targetStem === "mayāna-l-tiā"
                )?.optionId
                    || "missing-option";
                const canonical = application.evaluate({ ...request, derivationOptionId: optionId });
                const canonicalProjection = ctx.getClassicalVncDerivationExplanationRenderableProjection(canonical);
                const blocked = application.evaluate({
                    ...request,
                    sourceStem: "miqui",
                    derivationOptionId: "forged-option",
                });
                const projectionPoison = JSON.parse(JSON.stringify(canonical));
                projectionPoison.derivationExplanationProjection.formationSteps[0].stem = "LIE";
                const typedPoison = JSON.parse(JSON.stringify(canonical));
                typedPoison.resultFrame.derivationOperationFrame.selectedOption.targetStem = "LIE";

                const laterVoiceRequest = {
                    sourceStem: "cui",
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    sourceSubject: "3sg",
                    objectPerson: "3sg",
                    subject: "1sg",
                    requestedDerivation: "causative",
                    causativeObjectKind: "specific-projective",
                    requestedVoice: "active",
                };
                const laterVoiceSeed = application.evaluate(laterVoiceRequest);
                const laterVoiceDerivationOptionId = laterVoiceSeed.controlFrame.derivationOptionInventory?.options?.find(
                    option => option.targetStem === "cui-tiā"
                )?.optionId || "missing-cui-causative-option";
                const laterVoicePreview = application.evaluate({
                    ...laterVoiceRequest,
                    derivationOptionId: laterVoiceDerivationOptionId,
                    requestedVoice: "passive",
                });
                const laterVoiceNonactiveOptionId = laterVoicePreview.controlFrame.nonactiveOptionInventory?.automaticOptionId
                    || laterVoicePreview.controlFrame.nonactiveOptionInventory?.options?.[0]?.optionId
                    || "missing-cui-nonactive-option";
                const laterVoiceCanonical = application.evaluate({
                    ...laterVoiceRequest,
                    requestedVoice: "passive",
                    derivationOptionId: laterVoiceDerivationOptionId,
                    nonactiveOptionId: laterVoiceNonactiveOptionId,
                });
                const laterVoiceProjection = ctx.getClassicalVncDerivationExplanationRenderableProjection(laterVoiceCanonical);
                const laterVoiceEvidencePoison = JSON.parse(JSON.stringify(laterVoiceCanonical));
                const laterVoiceEvidenceMatches = laterVoiceEvidencePoison.resultFrame.selectedMachineryFrame
                    .nonactiveStemRecord.lexicalEvidenceMatches;
                if (laterVoiceEvidenceMatches[0]) {
                    laterVoiceEvidenceMatches[0].sourceRecordId = "FORGED";
                } else {
                    laterVoiceEvidenceMatches.push({ sourceRecordId: "FORGED" });
                }
                return {
                    canonical: {
                        admitted: Boolean(canonicalProjection),
                        route: canonicalProjection?.formationSteps.map(step => step.stem) || [],
                        bridgeEvidence: canonicalProjection?.evidence?.lesson20Bridge?.lexicalAttestations?.map(
                            attestation => `${attestation.operation}:${attestation.sourceRecordId}`
                        ) || [],
                    },
                    laterVoice: {
                        admitted: Boolean(laterVoiceProjection),
                        route: laterVoiceProjection?.formationSteps.map(step => step.stem) || [],
                        evidence: laterVoiceProjection?.evidence?.laterVoiceNonactive?.lexicalAttestations?.map(
                            attestation => `${attestation.operation}:${attestation.sourceRecordId}`
                        ) || [],
                        evidencePoisonApplicationValid: ctx.isClassicalNahuatlVncApplicationFrame(laterVoiceEvidencePoison),
                        evidencePoisonAdmitted: Boolean(ctx.getClassicalVncDerivationExplanationRenderableProjection(laterVoiceEvidencePoison)),
                    },
                    blockedAdmitted: Boolean(ctx.getClassicalVncDerivationExplanationRenderableProjection(blocked)),
                    projectionPoison: {
                        applicationValid: ctx.isClassicalNahuatlVncApplicationFrame(projectionPoison),
                        admitted: Boolean(ctx.getClassicalVncDerivationExplanationRenderableProjection(projectionPoison)),
                    },
                    typedPoison: {
                        applicationValid: ctx.isClassicalNahuatlVncApplicationFrame(typedPoison),
                        admitted: Boolean(ctx.getClassicalVncDerivationExplanationRenderableProjection(typedPoison)),
                    },
                };
            })()
            : "rendering-runtime-not-loaded",
        {
            canonical: {
                admitted: true,
                route: ["mayāna", "mayāna", "mayāna-lō", "mayāna-l-tiā"],
                bridgeEvidence: ["nonactive:karttunen-all:000225:n1"],
            },
            laterVoice: {
                admitted: true,
                route: ["cui", "cui", "cuī-hua", "cui-tiā", "cui-tī-lō"],
                evidence: [],
                evidencePoisonApplicationValid: false,
                evidencePoisonAdmitted: false,
            },
            blockedAdmitted: false,
            projectionPoison: { applicationValid: false, admitted: false },
            typedPoison: { applicationValid: false, admitted: false },
        }
    );
    s.eq(
        "Lesson 8 finalizes an applicative sentence from the final typed object cluster instead of the lower source object",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "xeloa",
                    sourceTransitivity: "transitive",
                    verbClass: "C",
                    valence: "specific-projective",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "applicative",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "2sg",
                    mood: "indicative",
                    tense: "present",
                    construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const option = preview.state?.derivationOptionInventory?.options?.find(
                    (candidate) => candidate.targetStem === "xel-huiā"
                );
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId: option?.optionId || "",
                });
                const machinery = surface.machineryFrame || {};
                const sentenceFrame = surface.sentenceSurfaceFrame || {};
                const sourceFormula = machinery.sourceMachineryFrame?.proofFrame?.conclusion?.selectedFormula || "";
                return {
                    status: surface.authorizationStatus,
                    selectedFormula: surface.selectedFormula,
                    sentenceBaseFormula: sentenceFrame.baseVncFormula,
                    sentenceFormula: surface.sentenceFormulaDisplay,
                    sentenceSurface: surface.sentenceSurfaceDisplay,
                    targetCarriers: machinery.targetObjectClusterFrame?.linearCarriers || [],
                    proofObjectSlot: machinery.proofFrame?.conclusion?.selectedObjectSlot || "",
                    outputSentenceBase: machinery.selectedOutputLogicFrame?.outputFillers?.sentenceBaseVncFormula || "",
                    compositionInputRole: sentenceFrame.compositionInputRole || "",
                    compositionInputIdentityMatches: sentenceFrame.compositionInputTypedVncSlotFrame?.semanticIdentity === machinery.finalTypedVncSlotFrame?.semanticIdentity,
                    lowerLayerBaseFormula: sentenceFrame.lowerLayerBaseVncFormula || "",
                    sourceFormula,
                    sourceCarrierOnlyLowerEvidence: sourceFormula.includes("+c-0(")
                        && String(sentenceFrame.lowerLayerBaseVncFormula || "").includes("+c-0(")
                        && !surface.sentenceFormulaDisplay.includes("+c-0("),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                selectedFormula: "#ni-0+m-itz+⎕-0(xel-huia)0+0-0#",
                sentenceBaseFormula: "#ni-0+m-itz+⎕-0(xel-huia)0+0-0#",
                sentenceFormula: "#ni-0+m-itz+⎕-0(xel-huia)0+0-0#.",
                sentenceSurface: "Nimitzxelhuia.",
                targetCarriers: ["m-itz", "0-0"],
                proofObjectSlot: "m-itz+0-0",
                outputSentenceBase: "#ni-0+m-itz+⎕-0(xel-huia)0+0-0#",
                compositionInputRole: "complete-multiple-object-vnc-slot-frame",
                compositionInputIdentityMatches: true,
                lowerLayerBaseFormula: "#ni-0+c-0(xel-huia)0+0-0#",
                sourceFormula: "#ni-0+c-0(xel-o-a)0+0-0#",
                sourceCarrierOnlyLowerEvidence: true,
            }
            : null
    );
    s.eq(
        "the renderer consumes canonical VNC sentence results and contains no local sentence-grammar assembler",
        (() => {
            const getFunctionSlice = (startName, endName) => {
                const start = rendering.indexOf(`function ${startName}`);
                const end = rendering.indexOf(`function ${endName}`, start + 1);
                return start >= 0 && end > start ? rendering.slice(start, end) : "";
            };
            const localAssemblerNames = [
                "capitalizeClassicalLesson8SentenceInitial",
                "buildClassicalRuleLogicLesson8SentenceFormulaDisplay",
                "orderClassicalRuleLogicLesson8PrefixalStack",
                "getClassicalRuleLogicLesson8SentenceFormulaAttachment",
                "buildClassicalRuleLogicLesson8SentenceSurfaceDisplay",
                "buildClassicalRuleLogicLesson8SentenceSurfaceFromCanonicalWord",
            ];
            const scalarProjection = getFunctionSlice(
                "buildClassicalVncSingleFormDisplayFrame",
                "buildClassicalPronominalNncParadigmFrame"
            );
            const canonicalSentenceProjection = getFunctionSlice(
                "buildClassicalFinalSentenceDisplayProjection",
                "buildClassicalNncParadigmDisplayFrame"
            );
            const paradigmProjection = getFunctionSlice(
                "buildClassicalVncParadigmFrame",
                "buildClassicalRuleLogicSurfaceFrame"
            );
            const paradigmRendering = getFunctionSlice(
                "buildClassicalVncParadigmResultSection",
                "getClassicalVncDerivationExplanationRenderableProjection"
            );
            return {
                localAssemblerDeclarationsAbsent: localAssemblerNames.every(
                    name => !rendering.includes(`function ${name}`)
                ),
                localAssemblerGlobalsAbsent: localAssemblerNames.every(
                    name => !rendering.includes(`globalThis.${name}`)
                        && !rendering.includes(`api.${name} =`)
                ),
                canonicalProjectionConsumesFormula:
                    canonicalSentenceProjection.includes(
                        "canonicalNuclearResultFrame.sentenceFormulaDisplay"
                    ),
                canonicalProjectionConsumesSurface:
                    canonicalSentenceProjection.includes(
                        "canonicalNuclearResultFrame.sentenceSurfaceDisplay"
                    ),
                canonicalProjectionConsumesAttachment:
                    canonicalSentenceProjection.includes(
                        "canonicalNuclearResultFrame.sentenceFormulaAttachment"
                    ),
                scalarConsumesIssuedSentenceResult:
                    scalarProjection.includes(
                        "nuclearResultFrame: sentenceResultFrame"
                    )
                        && scalarProjection.includes(
                            "vncSentenceResultFrame: sentenceResultFrame"
                        ),
                preparedConsumesCanonicalFormula:
                    paradigmProjection.includes(
                        "preparedCoordinate.sentenceFormulaDisplay"
                    ),
                preparedConsumesCanonicalSurface:
                    paradigmProjection.includes(
                        "preparedCoordinate.sentenceSurfaceDisplay"
                    ),
                preparedCarriesConditionedSentences:
                    paradigmProjection.includes(
                        "preparedCoordinate.conditionedSentenceRealizations"
                    ),
                preparedUsesGrammarApplicationPlan:
                    paradigmProjection.includes(
                        "targetObject.prepareClassicalVncApplicationParadigmPlan"
                    ),
                preparedUsesGrammarApplicationCoordinates:
                    paradigmProjection.includes(
                        "targetObject.projectClassicalVncApplicationParadigmCoordinates"
                    ),
                preparedOwnerBypassAbsent:
                    !paradigmProjection.includes(
                        "prepareClassicalNahuatlVncParadigmPlan"
                    )
                        && !paradigmProjection.includes(
                            "projectClassicalNahuatlVncParadigmCoordinates"
                        ),
                preparedCellFallbackAbsent:
                    !paradigmProjection.includes(
                        "buildClassicalRuleLogicSurfaceMachineryFrame"
                    )
                        && !paradigmProjection.includes(
                            "getClassicalRuleLogicSurfaceState({"
                        ),
                markedVariantConsumesConditionedSentence:
                    paradigmRendering.includes(
                        "row.conditionedSentenceRealizations"
                    )
                        && paradigmRendering.includes(
                            "sentenceSurfaceDisplay"
                        ),
                lateClosureIdentityPreserved:
                    rendering.includes(
                        "vncLateOperationClosureFrame: lessons27282933ClosureFrame"
                    )
                        && rendering.includes(
                            "const vncApplicationFrame = baseVncApplicationFrame"
                        ),
                lateClosureIsCanonicalSentenceSource:
                    /state\.vncLateOperationClosureFrame\s*\|\|\s*state\.vncOrderedVoiceApplicationFrame\s*\|\|\s*state\.vncApplicationFrame/u
                        .test(rendering),
                lessonNumberVncDispatchAbsent:
                    !/\bstate\.lesson\s*={2,3}\s*["'][4567]["']/u
                        .test(rendering),
                legacyLesson5ScalarLaneAbsent:
                    !/requestClassicalVncFiniteFrame\s*\(\s*state\.stem/u
                        .test(rendering),
                legacyLesson6ScalarLaneAbsent:
                    !/requestClassicalTransitiveVncFrame\s*\(\s*state\.stem/u
                        .test(rendering),
            };
        })(),
        {
            localAssemblerDeclarationsAbsent: true,
            localAssemblerGlobalsAbsent: true,
            canonicalProjectionConsumesFormula: true,
            canonicalProjectionConsumesSurface: true,
            canonicalProjectionConsumesAttachment: true,
            scalarConsumesIssuedSentenceResult: true,
            preparedConsumesCanonicalFormula: true,
            preparedConsumesCanonicalSurface: true,
            preparedCarriesConditionedSentences: true,
            preparedUsesGrammarApplicationPlan: true,
            preparedUsesGrammarApplicationCoordinates: true,
            preparedOwnerBypassAbsent: true,
            preparedCellFallbackAbsent: true,
            markedVariantConsumesConditionedSentence: true,
            lateClosureIdentityPreserved: true,
            lateClosureIsCanonicalSentenceSource: true,
            lessonNumberVncDispatchAbsent: true,
            legacyLesson5ScalarLaneAbsent: true,
            legacyLesson6ScalarLaneAbsent: true,
        }
    );
    s.eq(
        "explicit Lessons 5 and 6 scalar requests share the canonical VNC application and issued sentence handoff",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const requestRows = [{
                    lesson: "5",
                    stem: "nemi",
                    sourceTransitivity: "intransitive",
                    valence: "intransitive",
                    verbClass: "A",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    sentenceSurfaceMode: "question-cuix",
                    sentenceParticleId: "l3-cuix",
                }, {
                    lesson: "6",
                    stem: "mati",
                    sourceTransitivity: "transitive",
                    valence: "specific-projective",
                    verbClass: "A",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    mood: "indicative",
                    tense: "present",
                    sentenceSurfaceMode: "question-cuix",
                    sentenceParticleId: "l3-cuix",
                }];
                return requestRows.map((request) => {
                    const baseline = ctx.buildClassicalRuleLogicSurfaceFrame({
                        basalUnit: "vnc",
                        vncOutputScope: "single",
                        ...request,
                    });
                    const hostileVncApplicationFrame = Object.freeze({
                        kind: "classical-nahuatl-vnc-application-frame",
                        authorizationStatus: "authorized",
                    });
                    const hostileSentenceResultFrame = Object.freeze({
                        kind: "classical-nahuatl-vnc-sentence-result-frame",
                        authorizationStatus: "authorized",
                        sentenceFormulaDisplay: "#HOSTILE-SENTENCE-FORMULA#",
                        sentenceSurfaceDisplay: "Hostile sentence.",
                    });
                    const poisoned = ctx.buildClassicalRuleLogicSurfaceFrame({
                        basalUnit: "vnc",
                        vncOutputScope: "single",
                        ...request,
                        selectedFormula: "#HOSTILE-SELECTED-FORMULA#",
                        formulaRealization: "#HOSTILE-FORMULA-REALIZATION#",
                        sentenceFormulaDisplay:
                            "#HOSTILE-SENTENCE-FORMULA#",
                        sentenceSurfaceDisplay: "Hostile sentence.",
                        surfaceRealization: "Hostile surface",
                        vncApplicationFrame: hostileVncApplicationFrame,
                        vncSentenceResultFrame: hostileSentenceResultFrame,
                        sentenceSurfaceFrame: Object.freeze({
                            authorizationStatus: "authorized",
                            sentenceFormulaDisplay:
                                "#HOSTILE-SENTENCE-FORMULA#",
                            sentenceSurfaceDisplay: "Hostile sentence.",
                        }),
                    });
                    const applicationFrame =
                        baseline.state?.vncApplicationFrame || null;
                    const sentenceResultFrame =
                        baseline.vncSentenceResultFrame || null;
                    return {
                        lesson: request.lesson,
                        status: baseline.authorizationStatus,
                        applicationKind: applicationFrame?.kind || "",
                        applicationStatus:
                            applicationFrame?.authorizationStatus || "",
                        canonicalApplication:
                            ctx.isClassicalNahuatlVncApplicationFrame(
                                applicationFrame
                            ),
                        sentenceResultKind: sentenceResultFrame?.kind || "",
                        sentenceResultStatus:
                            sentenceResultFrame?.authorizationStatus || "",
                        canonicalSentenceResult:
                            ctx.isClassicalNahuatlVncSentenceResultFrame(
                                sentenceResultFrame
                            ),
                        sentenceResultConsumesApplication:
                            sentenceResultFrame?.vncApplicationFrame
                                === applicationFrame
                            && sentenceResultFrame?.canonicalSourceFrame
                                === applicationFrame,
                        selectedFormula: baseline.selectedFormula,
                        sentenceFormula: baseline.sentenceFormulaDisplay,
                        sentenceSurface: baseline.sentenceSurfaceDisplay,
                        hostileApplicationIgnored:
                            poisoned.state?.vncApplicationFrame
                                !== hostileVncApplicationFrame,
                        hostileSentenceResultIgnored:
                            poisoned.vncSentenceResultFrame
                                !== hostileSentenceResultFrame,
                        hostileStringsIgnored:
                            poisoned.selectedFormula
                                === baseline.selectedFormula
                            && poisoned.sentenceFormulaDisplay
                                === baseline.sentenceFormulaDisplay
                            && poisoned.sentenceSurfaceDisplay
                                === baseline.sentenceSurfaceDisplay
                            && ![
                                poisoned.selectedFormula,
                                poisoned.sentenceFormulaDisplay,
                                poisoned.sentenceSurfaceDisplay,
                            ].some(value => String(value || "").includes(
                                "HOSTILE"
                            )),
                    };
                });
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [{
                lesson: "5",
                status: "authorized",
                applicationKind:
                    "classical-nahuatl-vnc-application-frame",
                applicationStatus: "authorized",
                canonicalApplication: true,
                sentenceResultKind:
                    "classical-nahuatl-vnc-sentence-result-frame",
                sentenceResultStatus: "authorized",
                canonicalSentenceResult: true,
                sentenceResultConsumesApplication: true,
                selectedFormula: "#0-0(nemi)0+0-0#",
                sentenceFormula: "cuix #0-0(nemi)0+0-0#?",
                sentenceSurface: "Cuix nemi?",
                hostileApplicationIgnored: true,
                hostileSentenceResultIgnored: true,
                hostileStringsIgnored: true,
            }, {
                lesson: "6",
                status: "authorized",
                applicationKind:
                    "classical-nahuatl-vnc-application-frame",
                applicationStatus: "authorized",
                canonicalApplication: true,
                sentenceResultKind:
                    "classical-nahuatl-vnc-sentence-result-frame",
                sentenceResultStatus: "authorized",
                canonicalSentenceResult: true,
                sentenceResultConsumesApplication: true,
                selectedFormula: "#ni-0+c-0(mati)0+0-0#",
                sentenceFormula: "cuix #ni-0+c-0(mati)0+0-0#?",
                sentenceSurface: "Cuix nicmati?",
                hostileApplicationIgnored: true,
                hostileSentenceResultIgnored: true,
                hostileStringsIgnored: true,
            }]
            : null
    );
    s.eq(
        "the Lesson 2 object-predicate boundary reaches both Linear format and Sentence formula",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "iht-a-l-huia",
                    sourceTransitivity: "transitive",
                    verbClass: "A",
                    valence: "specific-projective",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "direct",
                    mood: "indicative",
                    tense: "present",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                    sourceInitialISelection: "real",
                });
                return {
                    status: surface.authorizationStatus,
                    linearFormat: surface.selectedFormula,
                    sentenceFormula: surface.sentenceFormulaDisplay,
                    sentenceSurface: surface.sentenceSurfaceDisplay,
                    finiteFormula: surface.finiteSurfaceFrame?.formulaRealization,
                    boundaryRuleIds: surface.finiteSurfaceFrame?.neighboringBoundaries.flatMap((boundary) => boundary.appliedRuleIds),
                };
            })()
            : null,
        {
            status: "authorized",
            linearFormat: "#ni-0+qu-0(iht-a-l-huia)0+0-0#",
            sentenceFormula: "#ni-0+qu-0(iht-a-l-huia)0+0-0#.",
            sentenceSurface: "Niquihtalhuia.",
            finiteFormula: "#ni-0+qu-0(iht-a-l-huia)0+0-0#",
            boundaryRuleIds: ["cn-l2-24-k-initial-before-e-i"],
        }
    );
    s.eq(
        "Classical Lesson 9 visible surface derives command and exhortation roles from Canvas subject person",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const common = {
                    stem: "cochi",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                };
                const firstPersonCommand = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...common,
                    subject: "1sg",
                    sentenceSurfaceMode: "command",
                    introductoryModifier: "tēl",
                });
                const secondPersonLegacyExhortation = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...common,
                    subject: "2sg",
                    sentenceSurfaceMode: "exhortation",
                    introductoryParticle: "none",
                });
                const futureCommand = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "tequi-ti",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "optative",
                    tense: "future",
                    verbClass: "B",
                    sentenceSurfaceMode: "command",
                    introductoryParticle: "mā",
                });
                return {
                    firstStatus: firstPersonCommand.sentenceSurfaceStatus,
                    firstRole: firstPersonCommand.sentenceCanvasRole,
                    firstRoleRule: firstPersonCommand.sentenceCanvasRoleNotice,
                    firstRoleAuthority: firstPersonCommand.sentenceRoleAuthority,
                    secondStatus: secondPersonLegacyExhortation.sentenceSurfaceStatus,
                    secondRole: secondPersonLegacyExhortation.sentenceCanvasRole,
                    secondRoleDerived: secondPersonLegacyExhortation.sentenceRoleDerivedFromSubject,
                    futureStatus: futureCommand.sentenceSurfaceStatus,
                    futureRole: futureCommand.sentenceCanvasRole,
                    futureRule: futureCommand.sentenceFutureIndicativeAsOptative,
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                firstStatus: "authorized",
                firstRole: "exhortation",
                firstRoleRule: "Canvas derives exhortation from a first-person subject",
                firstRoleAuthority: "Andrews 9.7 subject-person role rule",
                secondStatus: "authorized",
                secondRole: "direct-command",
                secondRoleDerived: true,
                futureStatus: "authorized",
                futureRole: "direct-command",
                futureRule: true,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Lesson 10.1 visible surface treats admonitive as positive warning, not prohibition",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const warning = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "huetz",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                });
                const negativeAdmonition = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "temō",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    polarityMode: "negative",
                });
                return {
                    warningStatus: warning.sentenceSurfaceStatus,
                    warningAuthority: warning.sentenceSurfaceAuthority,
                    warningForce: warning.sentenceAdmonitiveForce,
                    warningMoodPolarity: warning.sentenceAdmonitiveMoodPolarity,
                    warningPositiveByMood: warning.sentenceAdmonitiveIsPositiveByMood,
                    warningVetitiveAccepted: warning.sentenceAdmonitiveVetitiveTermAccepted,
                    warningProhibitionAllowed: warning.sentenceAdmonitiveProhibitionReadingAllowed,
                    warningNegativeCommandAllowed: warning.sentenceAdmonitiveNegativeCommandReadingAllowed,
                    warningDontAuthority: warning.sentenceAdmonitiveDontTranslationAuthority,
                    warningMayNotAuthority: warning.sentenceAdmonitiveMayNotTranslationAuthority,
                    warningReplacementLayer: warning.sentenceAdmonitiveProhibitionReplacementLayer,
                    warningSurface: warning.sentenceSurfaceDisplay,
                    negativeStatus: negativeAdmonition.sentenceSurfaceStatus,
                    negativeForce: negativeAdmonition.sentenceAdmonitiveForce,
                    negativeTransform: negativeAdmonition.sentenceLesson10NegativeTransformation,
                    negativePrefixSource: negativeAdmonition.sentenceNegativePrefixSource,
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                warningStatus: "authorized",
                warningAuthority: "typed-nuclear-clause-plus-authorized-sentence-composition",
                warningForce: "positive-cautionary-warning-advice",
                warningMoodPolarity: "positive-not-negative-by-mood",
                warningPositiveByMood: true,
                warningVetitiveAccepted: false,
                warningProhibitionAllowed: false,
                warningNegativeCommandAllowed: false,
                warningDontAuthority: "not-authority",
                warningMayNotAuthority: "not-authority",
                warningReplacementLayer: "Lesson 9 negative command/exhortation sentence layer",
                warningSurface: "Mā tihuetz.",
                negativeStatus: "authorized",
                negativeForce: "cancel-warning-recommend-reject-caution",
                negativeTransform: "negative-admonition-keeps-ah-and-requires-ma-nen",
                negativePrefixSource: "Lesson 10 negative admonition sentence layer",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Lesson 10.2 visible surface exposes nonpast perfective-stem and number-dyad authority",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const classA = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "tzahtzi",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "A",
                    introductoryParticle: "mā",
                });
                const plural = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "huetz",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1pl",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                });
                return {
                    classAStatus: classA.sentenceSurfaceStatus,
                    classAFormula: classA.selectedFormula,
                    classARequestedTense: classA.sentenceAdmonitiveRequestedTense,
                    classAOnlyNonpast: classA.sentenceAdmonitiveOnlyNonpastTense,
                    classAAspect: classA.sentenceAdmonitiveStemAspect,
                    classATenseMorph: classA.sentenceAdmonitiveTenseMorph,
                    classAContrast: classA.sentenceAdmonitiveClassATenseMorphContrast,
                    classANumberDyad: classA.sentenceAdmonitiveNumberDyad,
                    classASingularDyad: classA.sentenceAdmonitiveSingularNumberDyad,
                    classAPluralDyads: classA.sentenceAdmonitivePluralNumberDyads,
                    classATranslationOutsideSentence: classA.sentenceAdmonitiveVncTranslationValueOutsideSentence,
                    pluralFormula: plural.selectedFormula,
                    pluralNumberDyad: plural.sentenceAdmonitiveNumberDyad,
                    pluralNum2Morphs: plural.sentenceAdmonitiveNum2PluralMorphs,
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                classAStatus: "authorized",
                classAFormula: "#ni-0(tzahtzi)h+⎕-0#",
                classARequestedTense: "nonpast",
                classAOnlyNonpast: true,
                classAAspect: "perfective",
                classATenseMorph: "h",
                classAContrast: "admonitive-h-vs-preterit-indicative-0",
                classANumberDyad: "⎕-0",
                classASingularDyad: "⎕-0",
                classAPluralDyads: ["t-in", "t-ih"],
                classATranslationOutsideSentence: "none",
                pluralFormula: "#ti-0(huetz)0+t-in#",
                pluralNumberDyad: "t-in",
                pluralNum2Morphs: ["in", "ih"],
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Lesson 10.3 visible surface exposes admonition conversion, manen writing policy, and translation gate",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const direct = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "huetz",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    introductoryModifier: "nēn",
                });
                const hostileDont = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "huetz",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    admonitiveTranslationReading: "don't",
                });
                return {
                    status: direct.sentenceSurfaceStatus,
                    conversionSource: direct.sentenceAdmonitiveAssertionConversionSource,
                    conversionTarget: direct.sentenceAdmonitiveAssertionConversionTarget,
                    substitution: direct.sentenceAdmonitiveVncSubstitution,
                    maPosition: direct.sentenceAdmonitiveMaPosition,
                    role: direct.sentenceCanvasRole,
                    roleAuthority: direct.sentenceRoleAuthority,
                    nenKind: direct.sentenceAdmonitiveNenStrengtheningKind,
                    nenMeaning: direct.sentenceAdmonitiveNenLexicalMeaning,
                    writingPolicy: direct.sentenceAdmonitiveMaNenWritingPolicy,
                    solidSpelling: direct.sentenceAdmonitiveTraditionalSolidSpelling,
                    renderingPolicy: direct.sentenceAdmonitiveWarningRenderingPolicy,
                    requestedTranslation: direct.sentenceAdmonitiveRequestedTranslationReading,
                    requestedTranslationAuthorized: direct.sentenceAdmonitiveRequestedTranslationReadingAuthorized,
                    hostileStatus: hostileDont.sentenceSurfaceStatus,
                    hostileReading: hostileDont.sentenceAdmonitiveRequestedTranslationReading,
                    hostileAuthorized: hostileDont.sentenceAdmonitiveRequestedTranslationReadingAuthorized,
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                conversionSource: "affirmative-present-indicative-assertion",
                conversionTarget: "affirmative-admonition-warning-sentence",
                substitution: "admonitive-vnc-substitutes-for-present-indicative-vnc",
                maPosition: "beginning-of-admonition-sentence",
                role: "direct-admonition",
                roleAuthority: "Andrews 10.3 subject-person admonition comparison",
                nenKind: "optional-adverbialized-nnc-strengthener",
                nenMeaning: "in-vain-uselessly",
                writingPolicy: "canvas-writes-ma-nen-separately-traditional-spelling-is-solid",
                solidSpelling: "manen",
                renderingPolicy: "any-rendering-with-warning-sense-is-valid-not-example-whitelist",
                requestedTranslation: "warning-sense",
                requestedTranslationAuthorized: true,
                hostileStatus: "",
                hostileReading: "",
                hostileAuthorized: false,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Lesson 10.4 visible surface exposes negative admonition transformation and blocks ca",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const negative = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "temō",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "A",
                    introductoryParticle: "mā",
                    polarityMode: "negative",
                });
                const hostileCa = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "temō",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "A",
                    introductoryParticle: "mā",
                    polarityMode: "negative",
                    requestedNegativePrefix: "ca#",
                });
                return {
                    status: negative.sentenceSurfaceStatus,
                    formula: negative.selectedFormula,
                    surface: negative.sentenceSurfaceDisplay,
                    particles: negative.sentenceSurfaceFrame?.sentenceParticles || [],
                    prefixStack: negative.sentencePrefixalStack,
                    negativePrefixSource: negative.sentenceNegativePrefixSource,
                    conversionSource: negative.sentenceAdmonitiveNegativeAssertionConversionSource,
                    conversionTarget: negative.sentenceAdmonitiveNegativeAssertionConversionTarget,
                    prefixAttachment: negative.sentenceAdmonitiveNegativePrefixAttachment,
                    collocation: negative.sentenceAdmonitiveNegativeIntroductoryCollocation,
                    collocationRequired: negative.sentenceAdmonitiveNegativeIntroductoryCollocationRequired,
                    forceDefinition: negative.sentenceAdmonitiveNegativeForceDefinition,
                    vetativeTermAuthority: negative.sentenceAdmonitivePositiveVetativeTermAuthority,
                    requestedReading: negative.sentenceAdmonitiveRequestedTranslationReading,
                    requestedReadingAuthorized: negative.sentenceAdmonitiveRequestedTranslationReadingAuthorized,
                    hostileCaStatus: hostileCa.sentenceSurfaceStatus,
                    hostileCaRequested: hostileCa.sentenceAdmonitiveCaNegativeRequested,
                    hostileCaBlocked: hostileCa.sentenceAdmonitiveCaNegativeFromLesson9Blocked,
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                formula: "#ni-0(temo)h+⎕-0#",
                surface: "Mā nēn ahnitemoh.",
                particles: ["mā", "nēn", "ah#"],
                prefixStack: ["ah#"],
                negativePrefixSource: "Lesson 10 negative admonition sentence layer",
                conversionSource: "negative-present-indicative-assertion",
                conversionTarget: "negative-admonition-cancellation-sentence",
                prefixAttachment: "ah#-affixed-to-admonitive-vnc",
                collocation: "mā nēn",
                collocationRequired: true,
                forceDefinition: "cancellation-of-warning-recommendation-to-reject-caution",
                vetativeTermAuthority: "not-authority-unfortunate-traditional-term",
                requestedReading: "reject-caution-sense",
                requestedReadingAuthorized: true,
                hostileCaStatus: "blocked",
                hostileCaRequested: true,
                hostileCaBlocked: true,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Lesson 10.5 visible surface exposes VNC contrast authority and blocks misleading readings",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const classA = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "tzahtzi",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "3sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "A",
                    introductoryParticle: "mā",
                });
                const hostileOptative = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "tzahtzi",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "3sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "A",
                    introductoryParticle: "mā",
                    requestedContrastReading: "nonpast-optative",
                });
                const hostileAntecessive = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "huetz",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "admonitive",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    sentenceAntecessive: true,
                });
                return {
                    status: classA.sentenceSurfaceStatus,
                    contrastSet: classA.sentenceAdmonitiveContrastSet,
                    profile: classA.sentenceAdmonitiveContrastClassProfile,
                    optativeContrast: classA.sentenceAdmonitiveOptativeContrast,
                    maDistinguishes: classA.sentenceAdmonitiveMaDistinguishesSentenceLayer,
                    glottalWarning: classA.sentenceAdmonitiveGlottalStopAmbiguityWarning,
                    oppositeMeaningRisk: classA.sentenceAdmonitiveOppositeMeaningRiskIfGlottalUnrepresented,
                    hRoleContrast: classA.sentenceAdmonitiveHMorphRoleContrast,
                    hostileOptativeStatus: hostileOptative.sentenceSurfaceStatus,
                    hostileOptativeReading: hostileOptative.sentenceAdmonitiveRequestedContrastReading,
                    hostileOptativeAuthorized: hostileOptative.sentenceAdmonitiveRequestedContrastReadingAuthorized,
                    hostileAntecessiveStatus: hostileAntecessive.sentenceSurfaceStatus,
                    hostileAntecessiveRequested: hostileAntecessive.sentenceAdmonitiveAntecessivePrefixRequested,
                    hostileAntecessiveAllowed: hostileAntecessive.sentenceAdmonitiveAntecessivePrefixAllowed,
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                contrastSet: ["admonitive", "nonpast-optative", "present-indicative", "preterit-indicative"],
                profile: "class-a-admonitive-optative-present-preterit-contrast",
                optativeContrast: "admonitive-and-nonpast-optative-distinctive-all-forms",
                maDistinguishes: true,
                glottalWarning: true,
                oppositeMeaningRisk: true,
                hRoleContrast: "h-is-tense-morph-in-admonitive-but-num1-filler-in-present-indicative",
                hostileOptativeStatus: "",
                hostileOptativeReading: "",
                hostileOptativeAuthorized: false,
                hostileAntecessiveStatus: "blocked",
                hostileAntecessiveRequested: true,
                hostileAntecessiveAllowed: false,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Authority mood choices narrow accompanying options by Canvas rule",
        typeof ctx.getClassicalRuleLogicMoodBoundSelections === "function"
            ? (() => {
                const optativeFirst = ctx.getClassicalRuleLogicMoodBoundSelections({
                    mood: "optative",
                    tense: "preterit",
                    subject: "1sg",
                    sentenceSurfaceMode: "question-cuix",
                    introductoryParticle: "none",
                    prefixStackMode: "antecessive",
                });
                const optativeSecond = ctx.getClassicalRuleLogicMoodBoundSelections({
                    mood: "optative",
                    tense: "nonpast",
                    subject: "2sg",
                    introductoryParticle: "none",
                });
                const optativePast = ctx.getClassicalRuleLogicMoodBoundSelections({
                    mood: "optative",
                    tense: "past",
                    subject: "3sg",
                    introductoryParticle: "tlā",
                    prefixStackMode: "antecessive",
                });
                const admonitive = ctx.getClassicalRuleLogicMoodBoundSelections({
                    mood: "admonitive",
                    tense: "future",
                    subject: "2sg",
                    sentenceSurfaceMode: "emphatic",
                    introductoryParticle: "tlā",
                    prefixStackMode: "antecessive",
                });
                const indicative = ctx.getClassicalRuleLogicMoodBoundSelections({
                    mood: "indicative",
                    tense: "preterit",
                    subject: "1sg",
                    sentenceSurfaceMode: "question-cuix",
                    introductoryParticle: "tlā",
                    prefixStackMode: "antecessive",
                });
                const futureOptative = ctx.getClassicalRuleLogicMoodBoundSelections({
                    mood: "optative",
                    tense: "future",
                    subject: "2sg",
                    sentenceSurfaceMode: "statement",
                    introductoryParticle: "tlā",
                });
                const preteritOptative = ctx.getClassicalRuleLogicMoodBoundSelections({
                    mood: "optative",
                    tense: "preterit",
                    subject: "1sg",
                    introductoryParticle: "mā",
                    prefixStackMode: "none",
                });
                return {
                    optativeFirst: {
                        tense: optativeFirst.tense,
                        tenseValues: optativeFirst.tenseValues,
                        intro: optativeFirst.introductoryParticle,
                        introValues: optativeFirst.introductoryParticleValues,
                        preface: optativeFirst.prefaceParticle,
                        prefaceValues: optativeFirst.prefaceParticleValues,
                        modifier: optativeFirst.introductoryModifier,
                        modifierValues: optativeFirst.introductoryModifierValues,
                        sentence: optativeFirst.sentenceSurfaceMode,
                        sentenceValues: optativeFirst.sentenceSurfaceValues,
                        prefix: optativeFirst.prefixStackMode,
                    },
                    optativeSecond: {
                        intro: optativeSecond.introductoryParticle,
                        introValues: optativeSecond.introductoryParticleValues,
                        prefaceValues: optativeSecond.prefaceParticleValues,
                        modifierValues: optativeSecond.introductoryModifierValues,
                    },
                    optativePast: {
                        tense: optativePast.tense,
                        prefix: optativePast.prefixStackMode,
                        prefixValues: optativePast.prefixStackValues,
                        prefaceValues: optativePast.prefaceParticleValues,
                        modifierValues: optativePast.introductoryModifierValues,
                    },
                    admonitive: {
                        tense: admonitive.tense,
                        tenseValues: admonitive.tenseValues,
                        intro: admonitive.introductoryParticle,
                        introValues: admonitive.introductoryParticleValues,
                        prefaceValues: admonitive.prefaceParticleValues,
                        modifierValues: admonitive.introductoryModifierValues,
                        sentence: admonitive.sentenceSurfaceMode,
                        sentenceValues: admonitive.sentenceSurfaceValues,
                        prefix: admonitive.prefixStackMode,
                    },
                    indicative: {
                        tense: indicative.tense,
                        intro: indicative.introductoryParticle,
                        introValues: indicative.introductoryParticleValues,
                        preface: indicative.prefaceParticle,
                        prefaceValues: indicative.prefaceParticleValues,
                        modifier: indicative.introductoryModifier,
                        modifierValues: indicative.introductoryModifierValues,
                        sentence: indicative.sentenceSurfaceMode,
                        prefix: indicative.prefixStackMode,
                        sentenceValues: indicative.sentenceSurfaceValues,
                    },
                    futureOptative: {
                        tense: futureOptative.tense,
                        tenseValues: futureOptative.tenseValues,
                        intro: futureOptative.introductoryParticle,
                        introValues: futureOptative.introductoryParticleValues,
                        prefaceValues: futureOptative.prefaceParticleValues,
                        modifierValues: futureOptative.introductoryModifierValues,
                        rule: futureOptative.canvasRule,
                    },
                    negativeAdmonitive: (() => {
                        const negativeAdmonitive = ctx.getClassicalRuleLogicMoodBoundSelections({
                            mood: "admonitive",
                            polarityMode: "negative",
                            introductoryModifier: "none",
                        });
                        return {
                            modifier: negativeAdmonitive.introductoryModifier,
                            modifierValues: negativeAdmonitive.introductoryModifierValues,
                            rule: negativeAdmonitive.canvasRule,
                        };
                    })(),
                    preteritOptative: {
                        tense: preteritOptative.tense,
                        prefix: preteritOptative.prefixStackMode,
                        prefixValues: preteritOptative.prefixStackValues,
                        rule: preteritOptative.canvasRule,
                    },
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                optativeFirst: {
                    tense: "preterit",
                    tenseValues: ["nonpast", "past", "future", "preterit"],
                    intro: "mā",
                    introValues: ["mā", "tlā"],
                    preface: "none",
                    prefaceValues: ["none", "ihyo"],
                    modifier: "none",
                    modifierValues: ["none", "cuēl", "ye-cuēl", "cuēl-eh", "ye-cuēl-eh", "tēl"],
                    sentence: "question",
                    sentenceValues: ["statement", "question", "exclamation"],
                    prefix: "antecessive",
                },
                optativeSecond: {
                    intro: "none",
                    introValues: ["none", "mā", "tlā"],
                    prefaceValues: ["none"],
                    modifierValues: ["none"],
                },
                optativePast: {
                    tense: "past",
                    prefix: "antecessive",
                    prefixValues: ["none", "antecessive"],
                    prefaceValues: ["none", "ihyo", "ye"],
                    modifierValues: ["none", "cuēl", "ye-cuēl", "cuēl-eh", "ye-cuēl-eh"],
                },
                admonitive: {
                    tense: "nonpast",
                    tenseValues: ["nonpast"],
                    intro: "mā",
                    introValues: ["mā"],
                    prefaceValues: ["none"],
                    modifierValues: ["none", "nēn"],
                    sentence: "exclamation",
                    sentenceValues: ["statement", "question", "exclamation"],
                    prefix: "none",
                },
                indicative: {
                    tense: "preterit",
                    intro: "none",
                    introValues: ["none"],
                    preface: "none",
                    prefaceValues: ["none"],
                    modifier: "none",
                    modifierValues: ["none"],
                    sentence: "question",
                    prefix: "antecessive",
                    sentenceValues: ["statement", "question", "exclamation"],
                },
                futureOptative: {
                    tense: "future",
                    tenseValues: ["nonpast", "past", "future", "preterit"],
                    intro: "tlā",
                    introValues: ["mā", "tlā"],
                    prefaceValues: ["none", "ihyo", "ye"],
                    modifierValues: ["none", "cuēl", "ye-cuēl", "cuēl-eh", "ye-cuēl-eh"],
                    rule: "canvas-lesson9-future-optative-borrows-future-indicative-form-by-use",
                },
                negativeAdmonitive: {
                    modifier: "nēn",
                    modifierValues: ["nēn"],
                    rule: "canvas-lesson10-negative-admonition-requires-ma-nen-and-keeps-ah",
                },
                preteritOptative: {
                    tense: "preterit",
                    prefix: "antecessive",
                    prefixValues: ["antecessive"],
                    rule: "canvas-lesson9-preterit-optative-borrows-preterit-indicative-form-with-obligatory-antecessive",
                },
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical indicative mood disables the introductory-particle selector",
        typeof ctx.applyClassicalRuleLogicSelectOptionAvailability === "function"
            && typeof ctx.getClassicalRuleLogicMoodBoundSelections === "function"
            ? (() => {
                const previousDocument = ctx.document;
                const select = {
                    tagName: "select",
                    value: "tlā",
                    disabled: false,
                    dataset: {},
                    options: [
                        { value: "none", disabled: false, dataset: {} },
                        { value: "mā", disabled: false, dataset: {} },
                        { value: "tlā", disabled: false, dataset: {} },
                    ],
                };
                ctx.document = {
                    getElementById(id) {
                        return id === "classical-rule-logic-introductory-particle" ? select : null;
                    },
                };
                try {
                    const contract = ctx.getClassicalRuleLogicMoodBoundSelections({
                        mood: "indicative",
                        tense: "present",
                        introductoryParticle: "tlā",
                    });
                    const value = ctx.applyClassicalRuleLogicSelectOptionAvailability(
                        "classical-rule-logic-introductory-particle",
                        contract.introductoryParticleValues,
                        contract.introductoryParticleFallback
                    );
                    return {
                        value,
                        selectDisabled: select.disabled,
                        allowedValues: select.dataset.classicalCanvasAllowedValues,
                        availability: select.dataset.classicalCanvasSelectAvailability,
                        noneDisabled: select.options[0].disabled,
                        maDisabled: select.options[1].disabled,
                        tlaDisabled: select.options[2].disabled,
                    };
                } finally {
                    if (previousDocument === undefined) {
                        delete ctx.document;
                    } else {
                        ctx.document = previousDocument;
                    }
                }
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                value: "none",
                selectDisabled: true,
                allowedValues: "none",
                availability: "disabled-single-canvas-choice",
                noneDisabled: false,
                maDisabled: true,
                tlaDisabled: true,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Authority prefix stack is gated to Canvas past-tense VNCs",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const preterit = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "chōca",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "preterit",
                    verbClass: "A",
                    prefixStackMode: "antecessive",
                });
                const present = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "chōca",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    prefixStackMode: "antecessive",
                });
                return {
                    preteritAvailable: preterit.state.prefixStackAvailable,
                    preteritMode: preterit.state.prefixStackMode,
                    preteritOutsidePrefixes: preterit.state.outsidePrefixes,
                    preteritVisible: typeof ctx.shouldShowClassicalRuleLogicPrefixStack === "function"
                        ? ctx.shouldShowClassicalRuleLogicPrefixStack(preterit)
                        : "missing",
                    preteritSentenceStack: preterit.sentencePrefixalStack,
                    presentAvailable: present.state.prefixStackAvailable,
                    presentRequestedMode: present.state.requestedPrefixStackMode,
                    presentMode: present.state.prefixStackMode,
                    presentOutsidePrefixes: present.state.outsidePrefixes,
                    presentVisible: typeof ctx.shouldShowClassicalRuleLogicPrefixStack === "function"
                        ? ctx.shouldShowClassicalRuleLogicPrefixStack(present)
                        : "missing",
                    presentSentenceStack: present.sentencePrefixalStack,
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                preteritAvailable: true,
                preteritMode: "antecessive",
                preteritOutsidePrefixes: ["ō#"],
                preteritVisible: true,
                preteritSentenceStack: ["ō#"],
                presentAvailable: false,
                presentRequestedMode: "antecessive",
                presentMode: "none",
                presentOutsidePrefixes: [],
                presentVisible: false,
                presentSentenceStack: [],
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Authority surfaces on and huāl as VNC-internal directional prefixes",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    stem: "chōca",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                };
                const none = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const on = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    directionalPrefix: "on",
                });
                const hual = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    directionalPrefix: "huāl",
                });
                return {
                    noneFormulaHasDirectional: none.selectedFormula.includes("+on(")
                        || none.selectedFormula.includes("+huāl("),
                    onPrefix: on.state.directionalPrefix,
                    onInsideCore: on.machineryFrame?.expandedVncBoundaryFrame?.directionalInsideVncCore === true,
                    onPlacement: on.machineryFrame?.expandedVncBoundaryFrame?.directionalPlacement || "",
                    onFormulaHasDirectional: on.selectedFormula.includes("+on("),
                    hualPrefix: hual.state.directionalPrefix,
                    hualInsideCore: hual.machineryFrame?.expandedVncBoundaryFrame?.directionalInsideVncCore === true,
                    hualPlacement: hual.machineryFrame?.expandedVncBoundaryFrame?.directionalPlacement || "",
                    hualFormulaHasDirectional: hual.selectedFormula.includes("+huāl("),
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                noneFormulaHasDirectional: false,
                onPrefix: "on",
                onInsideCore: true,
                onPlacement: "before-intransitive-stem",
                onFormulaHasDirectional: true,
                hualPrefix: "huāl",
                hualInsideCore: true,
                hualPlacement: "before-intransitive-stem",
                hualFormulaHasDirectional: true,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "passive admonitives with on or huāl retain the normal canonical single-VNC Result presentation",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const build = directionalPrefix =>
                    ctx.buildClassicalRuleLogicSurfaceFrame({
                        stem: "āna",
                        basalUnit: "vnc",
                        sourceTransitivity: "transitive",
                        valence: "specific-projective",
                        objectKind: "specific-projective",
                        objectPerson: "3sg",
                        subject: "1sg",
                        mood: "admonitive",
                        tense: "nonpast",
                        verbClass: "B",
                        vncVoice: "passive",
                        nonactiveOptionId: "lō:āna-lō",
                        directionalPrefix,
                        introductoryParticle: "mā",
                        vncOutputScope: "single",
                    });
                return ["on", "huāl"].map(directionalPrefix => {
                    const surface = build(directionalPrefix);
                    return {
                        directionalPrefix,
                        status: surface.authorizationStatus,
                        formula: surface.selectedFormula,
                        sentenceFormula: surface.sentenceFormulaDisplay,
                        sentenceSurface: surface.sentenceSurfaceDisplay,
                        singleStatus:
                            surface.vncSingleFormDisplayFrame
                                ?.authorizationStatus,
                        singleReason:
                            surface.vncSingleFormDisplayFrame?.blockReason,
                        retiredObjectPerson:
                            surface.machineryFrame?.selectedOutputLogicFrame
                                ?.outputFillers?.selectedObjectPerson || "",
                    };
                });
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module"
                ? "module-runtime-missing"
                : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    directionalPrefix: "on",
                    status: "authorized",
                    formula: "#0-0+on(āna-lo)h+⎕-0#",
                    sentenceFormula: "mā #0-0+on(āna-lo)h+⎕-0#.",
                    sentenceSurface: "Mā onānaloh.",
                    singleStatus: "authorized",
                    singleReason: "",
                    retiredObjectPerson: "",
                },
                {
                    directionalPrefix: "huāl",
                    status: "authorized",
                    formula: "#0-0+huāl(āna-lo)h+⎕-0#",
                    sentenceFormula: "mā #0-0+huāl(āna-lo)h+⎕-0#.",
                    sentenceSurface: "Mā huālānaloh.",
                    singleStatus: "authorized",
                    singleReason: "",
                    retiredObjectPerson: "",
                },
            ]
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical directional object surface separates third-person c-0+on from first/second-person objects",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    stem: "mati",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    valence: "specific-projective",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    directionalPrefix: "on",
                };
                const thirdObject = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    objectPerson: "3sg",
                });
                const thirdPluralObject = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    objectPerson: "3pl",
                });
                const secondObject = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    objectPerson: "2sg",
                });
                const firstPluralObject = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    objectPerson: "1pl",
                });
                const sameParticipant = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    objectPerson: "1sg",
                });
                const ixChixThirdObject = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    stem: "ix-chix",
                    sourceInitialISelection: "real",
                    objectPerson: "3sg",
                    sentenceSurfaceMode: "statement",
                });
                const ixChixPluralOn = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    stem: "ix-chix",
                    sourceInitialISelection: "real",
                    objectPerson: "3pl",
                });
                const ixChixPluralHual = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    stem: "ix-chix",
                    sourceInitialISelection: "real",
                    objectPerson: "3pl",
                    directionalPrefix: "huāl",
                });
                const ixChixSingularHual = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    stem: "ix-chix",
                    sourceInitialISelection: "real",
                    objectPerson: "3sg",
                    directionalPrefix: "huāl",
                });
                return {
                    thirdClass: thirdObject.directionalObjectFrame?.objectPersonClass || "",
                    thirdDyad: thirdObject.directionalObjectFrame?.selectedObjectDyad || "",
                    thirdSlotOrder: thirdObject.directionalObjectFrame?.directionalSlotOrder || [],
                    thirdSlotOrderDisplay: thirdObject.directionalObjectFrame?.directionalSlotOrderDisplay || "",
                    thirdCanvasOrderMethod: thirdObject.directionalObjectFrame?.directionalCanvasOrderMethod || "",
                    thirdSupportiveO: thirdObject.directionalObjectFrame?.pers1SupportiveIToOAuthorized === true,
                    thirdFormulaHasNoCon: thirdObject.selectedFormula.includes("#no-0+c-0+on("),
                    thirdPluralDyad: thirdPluralObject.directionalObjectFrame?.selectedObjectDyad || "",
                    thirdPluralSlotOrderDisplay: thirdPluralObject.directionalObjectFrame?.directionalSlotOrderDisplay || "",
                    thirdPluralSupportiveO: thirdPluralObject.directionalObjectFrame?.pers1SupportiveIToOAuthorized === true,
                    secondClass: secondObject.directionalObjectFrame?.objectPersonClass || "",
                    secondDyad: secondObject.directionalObjectFrame?.selectedObjectDyad || "",
                    secondSlotOrder: secondObject.directionalObjectFrame?.directionalSlotOrder || [],
                    secondSlotOrderDisplay: secondObject.directionalObjectFrame?.directionalSlotOrderDisplay || "",
                    secondObjectControlsShapeNotLocation: secondObject.directionalObjectFrame?.objectDyadControlsShapeNotLocation === true,
                    secondSupportiveO: secondObject.directionalObjectFrame?.pers1SupportiveIToOAuthorized === true,
                    secondFormulaKeepsObjectDyad: secondObject.selectedFormula.includes("+m-itz+on("),
                    secondFormulaDoesNotBorrowThirdObject: secondObject.selectedFormula.includes("#no-0+c-0+on("),
                    firstPluralDyad: firstPluralObject.directionalObjectFrame?.selectedObjectDyad || "",
                    firstPluralSlotOrderDisplay: firstPluralObject.directionalObjectFrame?.directionalSlotOrderDisplay || "",
                    ixChixFormula: ixChixThirdObject.selectedFormula,
                    ixChixRejectsQuOn: ixChixThirdObject.selectedFormula.includes("+qu-0+on("),
                    ixChixSentenceSurface: ixChixThirdObject.sentenceSurfaceDisplay,
                    ixChixSentenceRejectsNquon: ixChixThirdObject.sentenceSurfaceDisplay === "Nquonixchix.",
                    ixChixDyad: ixChixThirdObject.directionalObjectFrame?.selectedObjectDyad || "",
                    ixChixSlotOrderDisplay: ixChixThirdObject.directionalObjectFrame?.directionalSlotOrderDisplay || "",
                    ixChixMorphIdentity: ixChixThirdObject.directionalObjectFrame?.objectMorphIdentity || "",
                    ixChixRegularSpellings: ixChixThirdObject.directionalObjectFrame?.objectRegularSpellings || [],
                    ixChixSupportiveSpelling: ixChixThirdObject.directionalObjectFrame?.objectSupportiveSpelling || "",
                    ixChixFinalBoundarySlot: ixChixThirdObject.directionalObjectFrame?.finalBoundaryFinalObjectSlot || "",
                    ixChixFinalBoundarySpelling: ixChixThirdObject.directionalObjectFrame?.finalBoundarySpellingSelectedAfterSlotOrder || "",
                    ixChixFinalBoundaryActions: ixChixThirdObject.directionalObjectFrame?.finalBoundaryRealizationActions || [],
                    ixChixPluralOnFormula: ixChixPluralOn.selectedFormula,
                    ixChixPluralOnRejectsBareN: ixChixPluralOn.selectedFormula.includes("#n-0+qu-im+on("),
                    ixChixPluralOnFinalSubject: ixChixPluralOn.directionalObjectFrame?.finalBoundaryFinalSubjectCarrier || "",
                    ixChixPluralOnFinalSlot: ixChixPluralOn.directionalObjectFrame?.finalBoundaryFinalObjectSlot || "",
                    ixChixPluralHualFormula: ixChixPluralHual.selectedFormula,
                    ixChixPluralHualRejectsIm: ixChixPluralHual.selectedFormula.includes("+qu-im+huāl("),
                    ixChixPluralHualFinalSubject: ixChixPluralHual.directionalObjectFrame?.finalBoundaryFinalSubjectCarrier || "",
                    ixChixPluralHualFinalSlot: ixChixPluralHual.directionalObjectFrame?.finalBoundaryFinalObjectSlot || "",
                    ixChixPluralHualFinalVa2: ixChixPluralHual.directionalObjectFrame?.finalBoundaryFinalPluralObjectVa2 || "",
                    ixChixSingularHualFormula: ixChixSingularHual.selectedFormula,
                    ixChixSingularHualRejectsQu: ixChixSingularHual.selectedFormula.includes("#n-0+qu-0+huāl("),
                    ixChixSingularHualFinalSubject: ixChixSingularHual.directionalObjectFrame?.finalBoundaryFinalSubjectCarrier || "",
                    ixChixSingularHualFinalSlot: ixChixSingularHual.directionalObjectFrame?.finalBoundaryFinalObjectSlot || "",
                    sameParticipantWarning: sameParticipant.directionalObjectFrame?.sameParticipantSpecificProjectiveRouteWarning || "",
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                thirdClass: "third-person-object",
                thirdDyad: "c-0",
                thirdSlotOrder: ["va1-va2", "±D", "STEM"],
                thirdSlotOrderDisplay: "c-0 -> on -> STEM",
                thirdCanvasOrderMethod: "specific-projective-va1-va2-before-directional",
                thirdSupportiveO: true,
                thirdFormulaHasNoCon: true,
                thirdPluralDyad: "qu-im",
                thirdPluralSlotOrderDisplay: "qu-im -> on -> STEM",
                thirdPluralSupportiveO: false,
                secondClass: "first-second-person-object",
                secondDyad: "m-itz",
                secondSlotOrder: ["va1-va2", "±D", "STEM"],
                secondSlotOrderDisplay: "m-itz -> on -> STEM",
                secondObjectControlsShapeNotLocation: true,
                secondSupportiveO: false,
                secondFormulaKeepsObjectDyad: true,
                secondFormulaDoesNotBorrowThirdObject: false,
                firstPluralDyad: "t-ēch",
                firstPluralSlotOrderDisplay: "t-ēch -> on -> STEM",
                ixChixFormula: "#no-0+c-0+on(ix-chix)0+0-0#",
                ixChixRejectsQuOn: false,
                ixChixSentenceSurface: "Noconixchix.",
                ixChixSentenceRejectsNquon: false,
                ixChixDyad: "c-0",
                ixChixSlotOrderDisplay: "c-0 -> on -> STEM",
                ixChixMorphIdentity: "/k/",
                ixChixRegularSpellings: ["c", "qu"],
                ixChixSupportiveSpelling: "qui",
                ixChixFinalBoundarySlot: "c-0",
                ixChixFinalBoundarySpelling: "c",
                ixChixFinalBoundaryActions: [
                    "assemble-slot-order-before-final-boundary-realization",
                    "realize-final-formula-boundaries-after-slot-order",
                    "realize-pers1-supportive-vowel-after-slot-order",
                    "realize-third-singular-k-object-as-c-before-on",
                    "realize-third-singular-k-object-after-directional-neighbor",
                    "replace-pers1-supportive-i-with-o-before-c-on",
                ],
                ixChixPluralOnFormula: "#ni-0+qu-im+on(ix-chix)0+0-0#",
                ixChixPluralOnRejectsBareN: false,
                ixChixPluralOnFinalSubject: "ni",
                ixChixPluralOnFinalSlot: "qu-im",
                ixChixPluralHualFormula: "#ni-0+qu-in+huāl(ix-chix)0+0-0#",
                ixChixPluralHualRejectsIm: false,
                ixChixPluralHualFinalSubject: "ni",
                ixChixPluralHualFinalSlot: "qu-in",
                ixChixPluralHualFinalVa2: "in",
                ixChixSingularHualFormula: "#ni-0+c-0+huāl(ix-chix)0+0-0#",
                ixChixSingularHualRejectsQu: false,
                ixChixSingularHualFinalSubject: "ni",
                ixChixSingularHualFinalSlot: "c-0",
                sameParticipantWarning: "Canvas reflexive/reciprocative route reflects subject; specific-projective object is not the reflexive route.",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical selected surface exposes final num1 supportive-i boundary decisions",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const common = {
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    verbClass: "A",
                };
                const vowelPreterit = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...common,
                    stem: "zaca",
                    tense: "preterit",
                });
                const consonantPreterit = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...common,
                    stem: "miqui",
                    tense: "preterit",
                    verbClass: "B",
                });
                const future = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...common,
                    stem: "nemi",
                    tense: "future",
                    verbClass: "B",
                });
                return {
                    vowelFormula: vowelPreterit.selectedFormula,
                    vowelFinalNum1: vowelPreterit.directionalObjectFrame?.finalBoundaryFinalNum1 || "",
                    vowelFinalNum2: vowelPreterit.directionalObjectFrame?.finalBoundaryFinalNum2 || "",
                    vowelAction: vowelPreterit.directionalObjectFrame?.finalBoundaryNum1SupportiveVowelAction || "",
                    vowelLeftSound: vowelPreterit.directionalObjectFrame?.finalBoundaryNum1LeftSound || "",
                    consonantFormula: consonantPreterit.selectedFormula,
                    consonantFinalNum1: consonantPreterit.directionalObjectFrame?.finalBoundaryFinalNum1 || "",
                    consonantFinalNum2: consonantPreterit.directionalObjectFrame?.finalBoundaryFinalNum2 || "",
                    consonantAction: consonantPreterit.directionalObjectFrame?.finalBoundaryNum1SupportiveVowelAction || "",
                    consonantSquareZero: consonantPreterit.directionalObjectFrame?.finalBoundaryNum1SquareZeroReplacesQui === true,
                    futureFormula: future.selectedFormula,
                    futureFinalNum1: future.directionalObjectFrame?.finalBoundaryFinalNum1 || "",
                    futureAction: future.directionalObjectFrame?.finalBoundaryNum1SupportiveVowelAction || "",
                    futureLeftSource: future.directionalObjectFrame?.finalBoundaryNum1LeftCarrierSource || "",
                    futureLeftSound: future.directionalObjectFrame?.finalBoundaryNum1LeftSound || "",
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                vowelFormula: "#ni-0(zaca)0+c-0#",
                vowelFinalNum1: "c",
                vowelFinalNum2: "0",
                vowelAction: "not-needed-after-vowel",
                vowelLeftSound: "a",
                consonantFormula: "#ni-0(mic)0+\u2395-0#",
                consonantFinalNum1: "\u2395",
                consonantFinalNum2: "0",
                consonantAction: "suppress-supportive-qui-with-square-zero",
                consonantSquareZero: true,
                futureFormula: "#ni-0(nemi)z+\u2395-0#",
                futureFinalNum1: "\u2395",
                futureAction: "suppress-supportive-qui-with-square-zero",
                futureLeftSource: "tns",
                futureLeftSound: "z",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical tla fusion requires a Canvas-authorized tla object source, not embed/matrix alone",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const embedIntransitive = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "ix-chiya",
                    lesson: "7",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    sourceEmbedStem: "ix",
                    sourceMatrixStem: "chiya",
                    tlaFusion: true,
                });
                const tlaSource = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "chiya",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    tlaFusion: true,
                });
                return {
                    embedIntransitiveAvailable: embedIntransitive.state.tlaFusionAvailable,
                    embedIntransitiveApplied: embedIntransitive.state.tlaFusion,
                    embedIntransitiveValence: embedIntransitive.state.valence,
                    embedIntransitiveFormulaHasFusedTla: embedIntransitive.selectedFormula.includes("(tla-"),
                    tlaSourceAvailable: tlaSource.state.tlaFusionAvailable,
                    tlaSourceApplied: tlaSource.state.tlaFusion,
                    tlaSourceValence: tlaSource.state.valence,
                    tlaSourceFormulaHasFusedTla: tlaSource.selectedFormula.includes("(tla-"),
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                embedIntransitiveAvailable: false,
                embedIntransitiveApplied: false,
                embedIntransitiveValence: "intransitive",
                embedIntransitiveFormulaHasFusedTla: false,
                tlaSourceAvailable: true,
                tlaSourceApplied: true,
                tlaSourceValence: "projective-nonhuman",
                tlaSourceFormulaHasFusedTla: true,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Lesson 8 result surface keeps sentence particles outside selected VNC formula",
        typeof ctx.buildClassicalNahuatlVerbstemClassFrame === "function"
            ? (() => {
                const baseOptions = {
                    valence: "intransitive",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                };
                const statement = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    ...baseOptions,
                    sentenceType: "affirmative-assertion",
                });
                const negative = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    ...baseOptions,
                    sentenceType: "negative-assertion",
                });
                const cuixQuestion = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    ...baseOptions,
                    sentenceType: "yes-no-question",
                    questionMode: "cuix",
                });
                const hostile = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    ...baseOptions,
                    sentenceType: "yes-no-question",
                    questionMode: "cuix",
                    hostileSentenceFormulaSlots: ["cuix"],
                });
                const statementFillers = statement.selectedOutputLogicFrame?.outputFillers || {};
                const negativeFillers = negative.selectedOutputLogicFrame?.outputFillers || {};
                const cuixFillers = cuixQuestion.selectedOutputLogicFrame?.outputFillers || {};
                const hostileFillers = hostile.selectedOutputLogicFrame?.outputFillers || {};
                return {
                    statementFormula: statement.formulaRealization,
                    statementBaseFormula: statementFillers.sentenceBaseVncFormula,
                    statementOperation: statementFillers.sentenceOperationType,
                    statementPunctuation: statementFillers.sentenceFinalPunctuation,
                    negativeFormula: negative.formulaRealization,
                    negativeParticles: negativeFillers.sentenceParticles,
                    negativeParticlesBecomeSlots: negativeFillers.sentenceParticlesBecomeFormulaSlots,
                    negativeSlotMaterial: negativeFillers.formulaSlotMaterialFromSentenceParticles,
                    cuixFormula: cuixQuestion.formulaRealization,
                    cuixParticles: cuixFillers.sentenceParticles,
                    cuixQuestionMode: cuixFillers.sentenceQuestionMode,
                    cuixSentenceStatus: cuixFillers.sentenceSurfaceStatus,
                    hostileFormulaStillSelected: hostile.formulaRealization,
                    hostileSentenceStatus: hostileFillers.sentenceSurfaceStatus,
                    hostileReason: hostileFillers.sentenceBlockReason,
                    hostileParticlesBecomeSlots: hostileFillers.sentenceParticlesBecomeFormulaSlots,
                };
            })()
            : "missing",
        {
            statementFormula: "#0-0(cochi)0+0-0#",
            statementBaseFormula: "#0-0(cochi)0+0-0#",
            statementOperation: "assertion-composition",
            statementPunctuation: ".",
            negativeFormula: "#0-0(cochi)0+0-0#",
            negativeParticles: ["ah#"],
            negativeParticlesBecomeSlots: false,
            negativeSlotMaterial: [],
            cuixFormula: "#0-0(cochi)0+0-0#",
            cuixParticles: ["cuix"],
            cuixQuestionMode: "cuix",
            cuixSentenceStatus: "authorized",
            hostileFormulaStillSelected: "#0-0(cochi)0+0-0#",
            hostileSentenceStatus: "blocked",
            hostileReason: "sentence-particle-cannot-be-vnc-formula-slot",
            hostileParticlesBecomeSlots: false,
        }
    );
    s.eq(
        "Classical rule logic keeps Canvas stem-internal boundaries over flat source mirrors",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            && typeof ctx.getClassicalNahuatlMachinerySource === "function"
            ? (() => {
                const previousWindow = ctx.window;
                const previousDocument = ctx.document;
                const testWindow = ctx.window && typeof ctx.window === "object" ? ctx.window : {};
                const previousWindowLocation = testWindow.location;
                const testDocument = ctx.document && typeof ctx.document === "object" ? ctx.document : {};
                const previousGetElementById = testDocument.getElementById;
                const previousQuerySelector = testDocument.querySelector;
                if (!ctx.window) {
                    ctx.window = testWindow;
                }
                if (!ctx.document) {
                    ctx.document = testDocument;
                }
                testWindow.location = {
                    hash: "#classical/v1/vnc/(chol-o-a)/tr/intransitive/a-stem/choloa",
                };
                testDocument.getElementById = function getElementById(id) {
                        if (id === "verb") {
                            return { value: "choloa" };
                        }
                        return null;
                    };
                testDocument.querySelector = function querySelector() {
                    return null;
                };
                try {
                    const source = ctx.getClassicalNahuatlMachinerySource("");
                    const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                        lesson: "7",
                        sourceTransitivity: "intransitive",
                        valence: "intransitive",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                        verbClass: "C",
                    });
                    const fillers = frame.machineryFrame?.selectedOutputLogicFrame?.outputFillers || {};
                    return {
                        source,
                        stem: frame.stem,
                        selectedFormula: frame.selectedFormula,
                        selectedOutputVerbstem: fillers.verbstem || "",
                        selectedOutputInternalMorphs: fillers.internalMorphs || [],
                        selectedOutputMorphsBecomeSlots: fillers.internalMorphsBecomeFormulaSlots === true,
                        selectedOutputSlotSplitAllowed: fillers.formulaSlotSplitAllowed === true,
                        selectedOutputStemMeaning: fillers.stemTranslationPolicy || "",
                        selectedOutputGlossPolicy: fillers.internalMorphGlossPolicy || "",
                    };
                } finally {
                    if (previousWindowLocation === undefined) {
                        delete testWindow.location;
                    } else {
                        testWindow.location = previousWindowLocation;
                    }
                    if (previousGetElementById === undefined) {
                        delete testDocument.getElementById;
                    } else {
                        testDocument.getElementById = previousGetElementById;
                    }
                    if (previousQuerySelector === undefined) {
                        delete testDocument.querySelector;
                    } else {
                        testDocument.querySelector = previousQuerySelector;
                    }
                    if (!previousWindow) {
                        delete ctx.window;
                    }
                    if (!previousDocument) {
                        delete ctx.document;
                    }
                }
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                source: "chol-o-a",
                stem: "chol-o-a",
                selectedFormula: "#ni-0(chol-o-a)0+0-0#",
                selectedOutputVerbstem: "chol-o-a",
                selectedOutputInternalMorphs: ["chol", "o", "a"],
                selectedOutputMorphsBecomeSlots: false,
                selectedOutputSlotSplitAllowed: false,
                selectedOutputStemMeaning: "unified-whole",
                selectedOutputGlossPolicy: "do-not-gloss-individually",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Fuente rejects route-only decomposition for every hyphenated source",
        typeof ctx.parseComposerStateFromRegexValue === "function"
            && typeof ctx.buildEntradaUrlSegmentString === "function"
            && typeof ctx.getClassicalSourceReadoutFrame === "function"
            ? (() => {
                const previousWindow = ctx.window;
                const previousDocument = ctx.document;
                const previousProfile = ctx.getActiveLanguageProfileMode;
                const previousLanguageProfileMode = ctx.LANGUAGE_PROFILE_MODE;
                const testWindow = ctx.window && typeof ctx.window === "object" ? ctx.window : {};
                const testDocument = ctx.document && typeof ctx.document === "object" ? ctx.document : {};
                const previousLocation = testWindow.location;
                const previousBody = testDocument.body;
                const previousGetElementById = testDocument.getElementById;
                if (!ctx.window) {
                    ctx.window = testWindow;
                }
                if (!ctx.document) {
                    ctx.document = testDocument;
                }
                testWindow.location = {
                    hash: "#classical/v1/vnc/(tom-a)/tr/intransitive/a-embed/tom/a-stem/a",
                };
                testDocument.body = {
                    classList: {
                        contains(className) {
                            return className === "is-language-classical";
                        },
                    },
                };
                let currentVerbValue = "(tom-a)";
                testDocument.getElementById = function getElementById(id) {
                    if (id === "verb") {
                        return { value: currentVerbValue };
                    }
                    return null;
                };
                ctx.LANGUAGE_PROFILE_MODE = {
                    ...(ctx.LANGUAGE_PROFILE_MODE || {}),
                    classicalNahuatl: "classical-nahuatl",
                };
                ctx.getActiveLanguageProfileMode = () => "classical-nahuatl";
                try {
                    const parsed = ctx.parseComposerStateFromRegexValue("(tom-a)");
                    const segmentString = ctx.buildEntradaUrlSegmentString({
                        input: "(tom-a)",
                        transitivity: "intransitive",
                        slots: {
                            a: {
                                embed: "tom",
                                stem: "a",
                            },
                        },
                    });
                    const readout = ctx.getClassicalSourceReadoutFrame("vnc");
                    currentVerbValue = "(chico-mati)";
                    testWindow.location.hash = "#classical/v1/verb/(chico-mati)/tr/intransitive/a-embed/chico/a-stem/mati";
                    const chicoReadout = ctx.getClassicalSourceReadoutFrame("vnc");
                    return {
                        parsedSlotAEmbed: parsed.slotAEmbed || "",
                        parsedSlotAStem: parsed.slotAStem || "",
                        parsedBoundaryKind: parsed.sourceBoundaryRoleFrame?.sourceKind || "",
                        parsedBoundaryBlocksHyphen: parsed.sourceBoundaryRoleFrame?.hyphenOnlyCannotPopulateEmbedMatrix === true,
                        segmentRejectsEmbed: !segmentString.includes("/a-embed/tom"),
                        segmentRejectsStemMirror: !segmentString.includes("/a-stem/a"),
                        segmentKeepsSource: segmentString.includes("vnc/(tom-a)") || segmentString.includes("vnc/%28tom-a%29"),
                        readoutStem: readout.stem,
                        readoutMorphs: readout.morphs,
                        readoutRoles: readout.roles,
                        readoutMachine: readout.machine,
                        readoutSelectionKind: readout.sourceSelectionKind,
                        readoutUserSelectionContradicts: readout.userSelectionContradictsTypedSource,
                        chicoReadoutStem: chicoReadout.stem,
                        chicoReadoutRoles: chicoReadout.roles,
                        chicoReadoutMachine: chicoReadout.machine,
                        chicoReadoutSelectionKind: chicoReadout.sourceSelectionKind,
                        chicoReadoutUserSelectionPermitted: chicoReadout.userSelectionTypedSourceAuthorized,
                    };
                } finally {
                    if (previousLocation === undefined) {
                        delete testWindow.location;
                    } else {
                        testWindow.location = previousLocation;
                    }
                    if (previousBody === undefined) {
                        delete testDocument.body;
                    } else {
                        testDocument.body = previousBody;
                    }
                    if (previousGetElementById === undefined) {
                        delete testDocument.getElementById;
                    } else {
                        testDocument.getElementById = previousGetElementById;
                    }
                    if (previousLanguageProfileMode === undefined) {
                        delete ctx.LANGUAGE_PROFILE_MODE;
                    } else {
                        ctx.LANGUAGE_PROFILE_MODE = previousLanguageProfileMode;
                    }
                    if (previousProfile === undefined) {
                        delete ctx.getActiveLanguageProfileMode;
                    } else {
                        ctx.getActiveLanguageProfileMode = previousProfile;
                    }
                    if (!previousWindow) {
                        delete ctx.window;
                    }
                    if (!previousDocument) {
                        delete ctx.document;
                    }
                }
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "composer-runtime-not-loaded"),
        typeof ctx.parseComposerStateFromRegexValue === "function"
            && typeof ctx.buildEntradaUrlSegmentString === "function"
            && typeof ctx.getClassicalSourceReadoutFrame === "function"
            ? {
                parsedSlotAEmbed: "",
                parsedSlotAStem: "toma",
                parsedBoundaryKind: "",
                parsedBoundaryBlocksHyphen: false,
                segmentRejectsEmbed: false,
                segmentRejectsStemMirror: false,
                segmentKeepsSource: true,
                readoutStem: "tom-a",
                readoutMorphs: "tom | a",
                readoutRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
                readoutMachine: "typed polymorphemic one-stem source",
                readoutSelectionKind: "internal-morphemes",
                readoutUserSelectionContradicts: false,
                chicoReadoutStem: "chico-mati",
                chicoReadoutRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
                chicoReadoutMachine: "typed polymorphemic one-stem source",
                chicoReadoutSelectionKind: "internal-morphemes",
                chicoReadoutUserSelectionPermitted: false,
            }
            : "composer-runtime-not-loaded"
    );
    s.eq(
        "Classical Fuente user-defined embed and matrix feed selected rule logic",
        typeof ctx.getClassicalSourceReadoutFrame === "function"
            && typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const previousWindow = ctx.window;
                const previousDocument = ctx.document;
                const testWindow = ctx.window && typeof ctx.window === "object" ? ctx.window : {};
                const testDocument = ctx.document && typeof ctx.document === "object" ? ctx.document : {};
                const previousLocation = testWindow.location;
                const previousGetElementById = testDocument.getElementById;
                const previousQuerySelector = testDocument.querySelector;
                const previousQuerySelectorAll = testDocument.querySelectorAll;
                if (!ctx.window) {
                    ctx.window = testWindow;
                }
                if (!ctx.document) {
                    ctx.document = testDocument;
                }
                testWindow.location = {
                    hash: "#classical/v1/verb/(ixchihua)/tr/intransitive",
                };
                const elements = {
                    verb: { value: "(ixchihua)" },
                    "classical-source-parts": { dataset: { classicalSourcePartsMode: "embed-matrix" } },
                    "classical-source-embed": { value: "ixi" },
                    "classical-source-matrix": { value: "chihua" },
                };
                testDocument.getElementById = function getElementById(id) {
                    return elements[id] || null;
                };
                testDocument.querySelector = function querySelector() { return null; };
                testDocument.querySelectorAll = function querySelectorAll() { return []; };
                try {
                    const readout = ctx.getClassicalSourceReadoutFrame("vnc");
                    const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                        stem: "ixchihua",
                        lesson: "7",
                        basalUnit: "vnc",
                        sourceTransitivity: "intransitive",
                        sourceInitialISelection: "real",
                        valence: "intransitive",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                        verbClass: "A",
                        tlaFusion: false,
                    });
                    return {
                        readoutMachine: readout.machine,
                        readoutSelectionKind: readout.sourceSelectionKind,
                        readoutSelectedBy: readout.sourceSelectedBy,
                        readoutRoles: readout.roles,
                        readoutPermitted: readout.userSelectionTypedSourceAuthorized,
                        surfaceSourceParts: surface.state.sourcePartsSource,
                        surfaceEmbed: surface.state.sourceEmbedStem,
                        surfaceMatrix: surface.state.sourceMatrixStem,
                        surfaceStatus: surface.authorizationStatus,
                        surfaceReason: surface.blockReason,
                        surfaceFormula: surface.selectedFormula,
                        surfaceDerivedStem: surface.machineryFrame?.tlaFusionRuleFrame?.derivedStem || "",
                        surfaceBoundaryKey: surface.machineryFrame?.tlaFusionRuleFrame?.ruleVariables?.sourceBoundaryRecordKey || "",
                    };
                } finally {
                    if (previousLocation === undefined) {
                        delete testWindow.location;
                    } else {
                        testWindow.location = previousLocation;
                    }
                    if (previousGetElementById === undefined) {
                        delete testDocument.getElementById;
                    } else {
                        testDocument.getElementById = previousGetElementById;
                    }
                    if (previousQuerySelector === undefined) {
                        delete testDocument.querySelector;
                    } else {
                        testDocument.querySelector = previousQuerySelector;
                    }
                    if (previousQuerySelectorAll === undefined) {
                        delete testDocument.querySelectorAll;
                    } else {
                        testDocument.querySelectorAll = previousQuerySelectorAll;
                    }
                    if (!previousWindow) {
                        delete ctx.window;
                    }
                    if (!previousDocument) {
                        delete ctx.document;
                    }
                }
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                readoutMachine: "typed Source contains embed + matrix",
                readoutSelectionKind: "embed-matrix",
                readoutSelectedBy: "typed-user-source",
                readoutRoles: "compound stem · embed: ixi | matrix: chihua",
                readoutPermitted: true,
                surfaceSourceParts: "fuente-user",
                surfaceEmbed: "ixi",
                surfaceMatrix: "chihua",
                surfaceStatus: "authorized",
                surfaceReason: "",
                surfaceFormula: "#n-0(ixichihua)0+0-0#",
                surfaceDerivedStem: "",
                surfaceBoundaryKey: "",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Fuente builds one Canvas source from embed and matrix",
        typeof ctx.getClassicalSourceReadoutFrame === "function"
            ? (() => {
                const previousWindow = ctx.window;
                const previousDocument = ctx.document;
                const testWindow = ctx.window && typeof ctx.window === "object" ? ctx.window : {};
                const testDocument = ctx.document && typeof ctx.document === "object" ? ctx.document : {};
                const previousLocation = testWindow.location;
                const previousGetElementById = testDocument.getElementById;
                const previousQuerySelector = testDocument.querySelector;
                const previousQuerySelectorAll = testDocument.querySelectorAll;
                if (!ctx.window) {
                    ctx.window = testWindow;
                }
                if (!ctx.document) {
                    ctx.document = testDocument;
                }
                testWindow.location = {
                    hash: "#classical/v1/verb/(huel-iht-o-a)/tr/intransitive/a-embed/huel/a-stem/iht-o-a",
                };
                const elements = {
                    verb: { value: "(huel-iht-o-a)" },
                    "classical-source-parts": { dataset: { classicalSourcePartsMode: "embed-matrix" } },
                    "classical-source-embed": { value: "huel" },
                    "classical-source-matrix": { value: "iht-o-a" },
                };
                testDocument.getElementById = function getElementById(id) {
                    return elements[id] || null;
                };
                testDocument.querySelector = function querySelector() { return null; };
                testDocument.querySelectorAll = function querySelectorAll() { return []; };
                try {
                    const readout = ctx.getClassicalSourceReadoutFrame("vnc");
                    return {
                        sourceValue: readout.sourceValue || "",
                        builtStem: readout.builtSource?.builtStem || "",
                        builtSource: readout.builtSource?.displaySource || "",
                        parts: readout.builtSource?.partsSurface || "",
                        role: readout.builtSource?.verbInputRole || "",
                        status: readout.builtSource?.status || "",
                    };
                } finally {
                    if (previousLocation === undefined) {
                        delete testWindow.location;
                    } else {
                        testWindow.location = previousLocation;
                    }
                    if (previousGetElementById === undefined) {
                        delete testDocument.getElementById;
                    } else {
                        testDocument.getElementById = previousGetElementById;
                    }
                    if (previousQuerySelector === undefined) {
                        delete testDocument.querySelector;
                    } else {
                        testDocument.querySelector = previousQuerySelector;
                    }
                    if (previousQuerySelectorAll === undefined) {
                        delete testDocument.querySelectorAll;
                    } else {
                        testDocument.querySelectorAll = previousQuerySelectorAll;
                    }
                    if (!previousWindow) {
                        delete ctx.window;
                    }
                    if (!previousDocument) {
                        delete ctx.document;
                    }
                }
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "composer-runtime-not-loaded"),
        {
            sourceValue: "(hueliht-o-a)",
            builtStem: "hueliht-o-a",
            builtSource: "(hueliht-o-a)",
            parts: "huel + iht-o-a",
            role: "machine-mirror:built-from-typed-source-parts",
            status: "built from embed + matrix",
        }
    );
    s.eq(
        "Classical observation is primary and preserves Source spelling through transformations",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            && typeof ctx.buildClassicalRuleTransformationObservationRows === "function"
            ? (() => {
                const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "ix-mati",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    sourceInitialISelection: "real",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                    tlaFusion: true,
                    sourceEmbedStem: "ix",
                    sourceMatrixStem: "mati",
                    incorporatedAdverb: "ix",
                    adverbPosition: "before-tla",
                });
                const rows = ctx.buildClassicalRuleTransformationObservationRows(frame);
                const sourceRow = rows.find((row) => row.kind === "fuente-preservada") || {};
                const fusionRow = rows.find((row) => row.kind === "tla-fusion") || {};
                const allText = rows.map((row) => [
                    row.source,
                    row.action,
                    row.result,
                ].filter(Boolean).join(" ")).join(" ");
                return {
                    formula: frame.selectedFormula,
                    countAtLeastTwo: rows.length >= 2,
                    sourceKind: sourceRow.kind || "",
                    sourceObserved: sourceRow.source || "",
                    sourceResult: sourceRow.result || "",
                    fusionKind: fusionRow.kind || "",
                    fusionSource: fusionRow.source || "",
                    fusionResult: fusionRow.result || "",
                    keepsIx: allText.includes("ix") && !allText.includes("ixi"),
                    hasWitnessDataset: rows.some((row) => row.transcriptionLineStart || row.witnessTagId),
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                formula: "#n-0(ix-tla-mati)0+0-0#",
                countAtLeastTwo: true,
                sourceKind: "fuente-preservada",
                sourceObserved: "ix + mati",
                sourceResult: "(ixmati)",
                fusionKind: "tla-fusion",
                fusionSource: "+tla(ix-mati)",
                fusionResult: "(ix-tla-mati)",
                keepsIx: true,
                hasWitnessDataset: true,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Fuente root structure defeats poisoned legacy button, fields, and entrada parts",
        typeof ctx.syncClassicalSourcePartsToEntradaUrl === "function"
            && typeof ctx.getClassicalSourceReadoutFrame === "function"
            && typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const previousWindow = ctx.window;
                const previousDocument = ctx.document;
                const testWindow = ctx.window && typeof ctx.window === "object" ? ctx.window : {};
                const testDocument = ctx.document && typeof ctx.document === "object" ? ctx.document : {};
                const previousLocation = testWindow.location;
                const previousHistory = testWindow.history;
                const previousBody = testDocument.body;
                const previousGetElementById = testDocument.getElementById;
                const previousQuerySelector = testDocument.querySelector;
                const previousQuerySelectorAll = testDocument.querySelectorAll;
                if (!ctx.window) {
                    ctx.window = testWindow;
                }
                if (!ctx.document) {
                    ctx.document = testDocument;
                }
                testWindow.location = {
                    pathname: "/index.html",
                    search: "?verify=fuente-source-parts-url",
                    hash: "#classical/v1/verb/(ixchihua)/tr/intransitive/a-stem/ixchihua",
                };
                testWindow.history = {
                    replaceState(_state, _title, url) {
                        const hashIndex = String(url || "").indexOf("#");
                        testWindow.location.hash = hashIndex >= 0 ? String(url).slice(hashIndex) : "";
                    },
                };
                testDocument.body = {
                    classList: {
                        contains(className) {
                            return className === "is-language-classical";
                        },
                    },
                };
                let activeMode = "embed-matrix";
                let sourceEmbedValue = "ixi";
                let sourceMatrixValue = "chihua";
                const modeButtons = ["whole-stem", "embed-matrix"].map((mode) => ({
                    getAttribute(name) {
                        if (name === "data-classical-source-parts-kind") {
                            return mode;
                        }
                        if (name === "aria-pressed") {
                            return String(mode === activeMode);
                        }
                        return "";
                    },
                    classList: {
                        contains(className) {
                            return className === "is-active" && mode === activeMode;
                        },
                    },
                }));
                const elements = {
                    verb: { value: "(ixchihua)" },
                    "classical-source-parts": {
                        dataset: { classicalSourcePartsMode: "embed-matrix" },
                    },
                    "classical-source-whole": { value: "ixchihua" },
                    "classical-source-embed": {
                        get value() {
                            return sourceEmbedValue;
                        },
                        set value(value) {
                            sourceEmbedValue = value;
                        },
                    },
                    "classical-source-matrix": {
                        get value() {
                            return sourceMatrixValue;
                        },
                        set value(value) {
                            sourceMatrixValue = value;
                        },
                    },
                };
                testDocument.getElementById = function getElementById(id) {
                    return elements[id] || null;
                };
                testDocument.querySelector = function querySelector() { return null; };
                testDocument.querySelectorAll = function querySelectorAll(selector) {
                    if (selector === "button[data-classical-source-parts-kind]") {
                        return modeButtons;
                    }
                    return [];
                };
                try {
                    const currentSnapshot = typeof ctx.getCurrentEntradaUrlStateSnapshot === "function"
                        ? ctx.getCurrentEntradaUrlStateSnapshot()
                        : null;
                    const currentHash = currentSnapshot && typeof ctx.buildEntradaUrlHash === "function"
                        ? ctx.buildEntradaUrlHash(currentSnapshot)
                        : "";
                    const writtenHash = ctx.syncClassicalSourcePartsToEntradaUrl();
                    elements["classical-source-parts"].dataset.classicalSourcePartsMode = "whole-stem";
                    const readout = ctx.getClassicalSourceReadoutFrame("vnc");
                    const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                        stem: "ixchihua",
                        lesson: "7",
                        basalUnit: "vnc",
                        sourceTransitivity: "intransitive",
                        sourceInitialISelection: "real",
                        valence: "intransitive",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                        verbClass: "A",
                        tlaFusion: true,
                    });
                    return {
                        currentSnapshotEmbed: currentSnapshot?.slots?.a?.embed || "",
                        currentSnapshotMatrix: currentSnapshot?.slots?.a?.stem || "",
                        currentHashHasEmbed: currentHash.includes("/a-embed/ixi"),
                        currentHashHasMatrix: currentHash.includes("/a-stem/chihua"),
                        writtenHasEmbed: writtenHash.includes("/a-embed/ixi"),
                        writtenHasMatrix: writtenHash.includes("/a-stem/chihua"),
                        locationHasEmbed: testWindow.location.hash.includes("/a-embed/ixi"),
                        locationHasMatrix: testWindow.location.hash.includes("/a-stem/chihua"),
                        readoutMachine: readout.machine,
                        readoutSelectionKind: readout.sourceSelectionKind,
                        readoutRoles: readout.roles,
                        surfaceSourceParts: surface.state.sourcePartsSource,
                        surfaceFormula: surface.selectedFormula,
                        surfaceBoundaryKey: surface.machineryFrame?.tlaFusionRuleFrame?.ruleVariables?.sourceBoundaryRecordKey || "",
                    };
                } finally {
                    if (previousLocation === undefined) {
                        delete testWindow.location;
                    } else {
                        testWindow.location = previousLocation;
                    }
                    if (previousHistory === undefined) {
                        delete testWindow.history;
                    } else {
                        testWindow.history = previousHistory;
                    }
                    if (previousBody === undefined) {
                        delete testDocument.body;
                    } else {
                        testDocument.body = previousBody;
                    }
                    if (previousGetElementById === undefined) {
                        delete testDocument.getElementById;
                    } else {
                        testDocument.getElementById = previousGetElementById;
                    }
                    if (previousQuerySelector === undefined) {
                        delete testDocument.querySelector;
                    } else {
                        testDocument.querySelector = previousQuerySelector;
                    }
                    if (previousQuerySelectorAll === undefined) {
                        delete testDocument.querySelectorAll;
                    } else {
                        testDocument.querySelectorAll = previousQuerySelectorAll;
                    }
                    if (!previousWindow) {
                        delete ctx.window;
                    }
                    if (!previousDocument) {
                        delete ctx.document;
                    }
                }
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                currentSnapshotEmbed: "ixi",
                currentSnapshotMatrix: "chihua",
                currentHashHasEmbed: true,
                currentHashHasMatrix: true,
                writtenHasEmbed: true,
                writtenHasMatrix: true,
                locationHasEmbed: true,
                locationHasMatrix: true,
                readoutMachine: "typed whole verbstem",
                readoutSelectionKind: "whole-stem",
                readoutRoles: "one whole verbstem",
                surfaceSourceParts: "fuente-whole-stem",
                surfaceFormula: "#n-0(ixchihua)0+0-0#",
                surfaceBoundaryKey: "",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Classical Fuente ignores hostile documentary source-decomposition authority",
        typeof ctx.getClassicalSourcePartControlState === "function"
            ? (() => {
                const previousDocument = ctx.document;
                const testDocument = ctx.document && typeof ctx.document === "object" ? ctx.document : {};
                const previousGetElementById = testDocument.getElementById;
                const previousQuerySelectorAll = testDocument.querySelectorAll;
                if (!ctx.document) {
                    ctx.document = testDocument;
                }
                const elements = {
                    "classical-source-parts": {
                        dataset: {
                            classicalSourcePartsMode: "whole-stem",
                            classicalSourcePartsAuthority: "canvas-witness",
                        },
                    },
                    "classical-source-whole": { value: "zaca-mo-ā" },
                    "classical-source-embed": { value: "hostile-embed" },
                    "classical-source-matrix": { value: "hostile-matrix" },
                };
                testDocument.getElementById = (id) => elements[id] || null;
                testDocument.querySelectorAll = () => [];
                try {
                    const state = ctx.getClassicalSourcePartControlState();
                    return {
                        applyExport: typeof ctx.applyClassicalCanvasSourcePartsAuthorityFromWholeStem,
                        clearExport: typeof ctx.clearClassicalCanvasSourcePartsAuthority,
                        source: state.sourcePartsSource,
                        sourceWholeStem: state.sourceWholeStem,
                        sourceEmbedStem: state.sourceEmbedStem,
                        sourceMatrixStem: state.sourceMatrixStem,
                        authorityFieldPresent: Object.prototype.hasOwnProperty.call(state, "sourcePartsAuthority"),
                    };
                } finally {
                    if (previousGetElementById === undefined) {
                        delete testDocument.getElementById;
                    } else {
                        testDocument.getElementById = previousGetElementById;
                    }
                    if (previousQuerySelectorAll === undefined) {
                        delete testDocument.querySelectorAll;
                    } else {
                        testDocument.querySelectorAll = previousQuerySelectorAll;
                    }
                    if (!previousDocument) {
                        delete ctx.document;
                    }
                }
            })()
            : { unavailable: true },
        {
            applyExport: "undefined",
            clearExport: "undefined",
            source: "fuente-user",
            sourceWholeStem: "zaca-mo-ā",
            sourceEmbedStem: "",
            sourceMatrixStem: "",
            authorityFieldPresent: false,
        }
    );
    s.eq(
        "Classical rule logic keeps selected va1-va2 authority and uses qu-in for third plural specific projective",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "temoa",
                    lesson: "7",
                    sourceTransitivity: "intransitive",
                    valence: "specific-projective",
                    objectKind: "specific-projective",
                    objectPerson: "3pl",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "preterit",
                    verbClass: "C",
                });
                const selectedFormula = frame.selectedFormula
                    || frame.machineryFrame?.selectedOutputLogicFrame?.selectedFormula
                    || frame.machineryFrame?.displayReceiptFrame?.selectedFormula
                    || frame.machineryFrame?.proofFrame?.conclusion?.authorizedFormula
                    || frame.machineryFrame?.proofFrame?.conclusion?.selectedFormula
                    || frame.machineryFrame?.proofFrame?.conclusion?.formulaRealization
                    || frame.machineryFrame?.formulaRealization
                    || frame.machineryFrame?.priorVncFrame?.selectedOutputLogicFrame?.selectedFormula
                    || frame.machineryFrame?.priorVncFrame?.displayReceiptFrame?.selectedFormula
                    || frame.machineryFrame?.priorVncFrame?.proofFrame?.conclusion?.authorizedFormula
                    || frame.machineryFrame?.priorVncFrame?.proofFrame?.conclusion?.selectedFormula
                    || frame.machineryFrame?.priorVncFrame?.proofFrame?.conclusion?.formulaRealization
                    || frame.machineryFrame?.priorVncFrame?.formulaRealization
                    || "";
                return {
                    selectedFormula,
                    requestedValence: frame.state?.requestedValence || "",
                    effectiveValence: frame.state?.valence || "",
                    sourceTransitivity: frame.state?.sourceTransitivity || "",
                    sourceValenceConflict: frame.state?.sourceValenceConflict === true,
                    priorFrameKind: frame.machineryFrame?.priorVncFrame?.kind || "",
                    hasObjectFrame: Boolean(frame.machineryFrame?.priorVncFrame?.objectFrame),
                    objectVa1: frame.machineryFrame?.priorVncFrame?.objectFrame?.va1 || "",
                    objectVa2: frame.machineryFrame?.priorVncFrame?.objectFrame?.va2 || "",
                    objectVa1Rule: frame.machineryFrame?.priorVncFrame?.objectFrame?.va1Rule || "",
                    objectVa1SupportiveVowelPresent: frame.machineryFrame?.priorVncFrame?.objectFrame?.va1SupportiveVowelPresent === true,
                    objectVa1RightCarrierSource: frame.machineryFrame?.priorVncFrame?.objectFrame?.va1RightCarrierSource || "",
                    objectVa1RightSound: frame.machineryFrame?.priorVncFrame?.objectFrame?.va1RightSound || "",
                    usesThirdPluralObject: /\+qu-in/u.test(selectedFormula),
                    leaksThirdSingularObject: /\+c-in/u.test(selectedFormula),
                    leaksSupportiveQui: /\+qui-in/u.test(selectedFormula),
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                selectedFormula: "#ni-0+qu-in(temoh)0+⎕-0#",
                requestedValence: "specific-projective",
                effectiveValence: "specific-projective",
                sourceTransitivity: "intransitive",
                sourceValenceConflict: false,
                priorFrameKind: "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
                hasObjectFrame: true,
                objectVa1: "qu",
                objectVa2: "in",
                objectVa1Rule: "lesson-6.4.1a-qu-before-e-i-vowel",
                objectVa1SupportiveVowelPresent: false,
                objectVa1RightCarrierSource: "va2",
                objectVa1RightSound: "i",
                usesThirdPluralObject: true,
                leaksThirdSingularObject: false,
                leaksSupportiveQui: false,
            }
            : "rendering-runtime-not-loaded"
    );
    s.ok(
        "the renderer has no raw formula scavenger or missing-finite-projection repair lane",
        typeof ctx.getClassicalRuleLogicSurfaceFormula === "undefined"
            && !rendering.includes("function getClassicalRuleLogicSurfaceFormula")
            && !rendering.includes("function getClassicalRuleLogicSurfaceFallbackOutput")
            && !rendering.includes("getOrBuildCanonicalClassicalVncFiniteSurfaceFrame")
            && !rendering.includes("requestClassicalVncFiniteSurfaceFrame(machineryFrame)")
            && rendering.includes("getCanonicalClassicalVncFiniteSurfaceFrame(")
            && rendering.includes('"classical-vnc-ordered-finite-projection-required"')
    );
    s.eq(
        "Classical rule logic uses constructive matrix and embed-matrix tla fusion builds",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const fused = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "huel-mati",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    tlaFusion: true,
                    sourceEmbedStem: "huel",
                    sourceMatrixStem: "mati",
                    incorporatedAdverb: "huel",
                    adverbPosition: "before-tla",
                });
                const unfused = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "huel-mati",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    tlaFusion: false,
                    sourceEmbedStem: "huel",
                    sourceMatrixStem: "mati",
                    incorporatedAdverb: "huel",
                    adverbPosition: "before-tla",
                });
                const ixUnfused = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "ix-mati",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    sourceInitialISelection: "real",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    tlaFusion: false,
                    sourceEmbedStem: "ix",
                    sourceMatrixStem: "mati",
                    incorporatedAdverb: "ix",
                    adverbPosition: "before-tla",
                });
                const ixChihuaFused = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "ix-chihua",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    sourceInitialISelection: "real",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    tlaFusion: true,
                    sourceEmbedStem: "ix",
                    sourceMatrixStem: "chihua",
                    incorporatedAdverb: "ix",
                    adverbPosition: "before-tla",
                });
                const chicoFused = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "chico-mati",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    tlaFusion: true,
                    sourceEmbedStem: "chico",
                    sourceMatrixStem: "mati",
                    incorporatedAdverb: "chico",
                    adverbPosition: "before-tla",
                });
                const temoFusedFromIntransitive = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "temō",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    tlaFusion: true,
                });
                const huelIttaFused = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "huel-itta",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "transitive",
                    valence: "projective-nonhuman",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "preterit",
                    verbClass: "A",
                    tlaFusion: true,
                    sourceEmbedStem: "huel",
                    sourceMatrixStem: "itta",
                    incorporatedAdverb: "huel",
                    adverbPosition: "before-tla",
                });
                const intransitiveTlaFusionRequest = ctx.buildClassicalRuleLogicSurfaceFrame({
                    stem: "yōl-miqui",
                    lesson: "7",
                    basalUnit: "vnc",
                    sourceTransitivity: "intransitive",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    tlaFusion: true,
                });
                const previousWindow = ctx.window;
                const previousDocument = ctx.document;
                const testWindow = ctx.window && typeof ctx.window === "object" ? ctx.window : {};
                const previousLocation = testWindow.location;
                const testDocument = ctx.document && typeof ctx.document === "object" ? ctx.document : {};
                const previousGetElementById = testDocument.getElementById;
                if (!ctx.window) {
                    ctx.window = testWindow;
                }
                if (!ctx.document) {
                    ctx.document = testDocument;
                }
                testWindow.location = {
                    hash: "#classical/v1/verb/(ix-mati)/tr/intransitive/a-embed/ix/a-stem/mati",
                };
                testDocument.getElementById = function getElementById(id) {
                    if (id === "verb") {
                        return { value: "(ix-mati)" };
                    }
                    return null;
                };
                let ixFusedFromUrl = null;
                try {
                    ixFusedFromUrl = ctx.buildClassicalRuleLogicSurfaceFrame({
                        lesson: "7",
                        basalUnit: "vnc",
                        stem: "ix-mati",
                        sourceTransitivity: "transitive",
                        sourceInitialISelection: "real",
                        valence: "projective-nonhuman",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                        verbClass: "A",
                        tlaFusion: true,
                    });
                } finally {
                    if (previousLocation === undefined) {
                        delete testWindow.location;
                    } else {
                        testWindow.location = previousLocation;
                    }
                    if (previousGetElementById === undefined) {
                        delete testDocument.getElementById;
                    } else {
                        testDocument.getElementById = previousGetElementById;
                    }
                    if (!previousWindow) {
                        delete ctx.window;
                    }
                    if (!previousDocument) {
                        delete ctx.document;
                    }
                }
                return {
                    fusedFormula: fused.selectedFormula,
                    fusedAdverb: fused.machineryFrame?.tlaFusionRuleFrame?.incorporatedAdverb || "",
                    fusedAdverbPosition: fused.machineryFrame?.tlaFusionRuleFrame?.adverbPosition || "",
                    fusedStateFusion: fused.state.tlaFusion,
                    fusedDerivedStem: fused.machineryFrame?.tlaFusionRuleFrame?.derivedStem || "",
                    fusedMatrixStem: fused.machineryFrame?.tlaFusionRuleFrame?.matrixStemVariant || "",
                    fusedClass: fused.machineryFrame?.classId || "",
                    unfusedFormula: unfused.selectedFormula,
                    unfusedStateFusion: unfused.state.tlaFusion,
                    unfusedAnalysisKind: unfused.machineryFrame?.tlaFusionRuleFrame?.selectedTlaFusionAnalysisKind || "",
                    ixUnfusedFormula: ixUnfused.selectedFormula,
                    ixUnfusedSourceStem: ixUnfused.machineryFrame?.tlaFusionRuleFrame?.sourceStemVariant || "",
                    ixUnfusedBoundary: ixUnfused.machineryFrame?.tlaFusionRuleFrame?.sourceBoundaryRecord?.boundaryRole || "",
                    ixChihuaFusedFormula: ixChihuaFused.selectedFormula,
                    ixChihuaFusedSourceStem: ixChihuaFused.machineryFrame?.tlaFusionRuleFrame?.sourceStemVariant || "",
                    ixChihuaFusedDerivedStem: ixChihuaFused.machineryFrame?.tlaFusionRuleFrame?.derivedStem || "",
                    ixChihuaFusedBuildKind: ixChihuaFused.machineryFrame?.tlaFusionRuleFrame?.tlaFusionBuildKind || "",
                    ixChihuaFusedBoundaryKey: ixChihuaFused.machineryFrame?.tlaFusionRuleFrame?.ruleVariables?.sourceBoundaryRecordKey || "",
                    ixChihuaFusedInventsPrefixGeneric: ixChihuaFused.machineryFrame?.tlaFusionRuleFrame?.derivedStem === "tla-ix-chihua",
                    chicoFusedFormula: chicoFused.selectedFormula,
                    chicoFusedDerivedStem: chicoFused.machineryFrame?.tlaFusionRuleFrame?.derivedStem || "",
                    chicoFusedBoundary: chicoFused.machineryFrame?.tlaFusionRuleFrame?.sourceBoundaryRecord?.boundaryRole || "",
                    chicoFusedDecision: chicoFused.machineryFrame?.tlaFusionRuleFrame?.adverbBoundaryDecision || "",
                    temoFusedFormula: temoFusedFromIntransitive.selectedFormula,
                    temoFusedStateValence: temoFusedFromIntransitive.state.valence,
                    temoFusedSourceValence: temoFusedFromIntransitive.machineryFrame?.tlaFusionRuleFrame?.ruleVariables?.sourceValence || "",
                    temoFusedRequestedValence: temoFusedFromIntransitive.machineryFrame?.tlaFusionRuleFrame?.ruleVariables?.requestedSourceValence || "",
                    temoFusedSuppliedTla: temoFusedFromIntransitive.machineryFrame?.tlaFusionRuleFrame?.ruleVariables?.fusionSuppliesTlaSourceValence === true,
                    temoFusedCitation: temoFusedFromIntransitive.machineryFrame?.citationForm || "",
                    temoFusedDerivedStem: temoFusedFromIntransitive.machineryFrame?.tlaFusionRuleFrame?.derivedStem || "",
                    huelIttaFusedFormula: huelIttaFused.selectedFormula,
                    huelIttaFusedDerivedStem: huelIttaFused.machineryFrame?.tlaFusionRuleFrame?.derivedStem || "",
                    huelIttaFusedBuildKind: huelIttaFused.machineryFrame?.tlaFusionRuleFrame?.tlaFusionBuildKind || "",
                    huelIttaFusedSegment: huelIttaFused.machineryFrame?.tlaFusionRuleFrame?.tlaFusionBuildSegment || "",
                    huelIttaFusedBoundaryKey: huelIttaFused.machineryFrame?.tlaFusionRuleFrame?.ruleVariables?.sourceBoundaryRecordKey || "",
                    huelIttaFusedInventsPrefixGeneric: huelIttaFused.machineryFrame?.tlaFusionRuleFrame?.derivedStem === "tla-huel-itta",
                    intransitiveTlaFusionRequested: intransitiveTlaFusionRequest.state.tlaFusionRequested,
                    intransitiveTlaFusionAvailable: intransitiveTlaFusionRequest.state.tlaFusionAvailable,
                    intransitiveTlaFusionApplied: intransitiveTlaFusionRequest.state.tlaFusion,
                    intransitiveTlaFusionVisible: ctx.shouldShowClassicalRuleLogicTlaFusion(intransitiveTlaFusionRequest),
                    intransitiveObjectVisible: ctx.shouldShowClassicalRuleLogicObject(intransitiveTlaFusionRequest),
                    ixUrlSourceParts: ixFusedFromUrl?.state?.sourcePartsSource || "",
                    ixUrlEmbed: ixFusedFromUrl?.state?.sourceEmbedStem || "",
                    ixUrlMatrix: ixFusedFromUrl?.state?.sourceMatrixStem || "",
                    ixUrlFormula: ixFusedFromUrl?.selectedFormula || "",
                    ixUrlDerivedStem: ixFusedFromUrl?.machineryFrame?.tlaFusionRuleFrame?.derivedStem || "",
                    ixUrlBuildKind: ixFusedFromUrl?.machineryFrame?.tlaFusionRuleFrame?.tlaFusionBuildKind || "",
                    ixUrlDecision: ixFusedFromUrl?.machineryFrame?.tlaFusionRuleFrame?.adverbBoundaryDecision || "",
                };
            })()
            : (ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-runtime-missing" : "rendering-runtime-not-loaded"),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                fusedFormula: "#ni-0(huel-la-mati)0+0-0#",
                fusedAdverb: "huel",
                fusedAdverbPosition: "before-tla",
                fusedStateFusion: true,
                fusedDerivedStem: "huel-la-mati",
                fusedMatrixStem: "mati",
                fusedClass: "A",
                unfusedFormula: "#ni-0+tla(huel-mati)0+0-0#",
                unfusedStateFusion: false,
                unfusedAnalysisKind: "unfused-transitive-tla-object",
                ixUnfusedFormula: "#ni-0+tla(ix-mati)0+0-0#",
                ixUnfusedSourceStem: "ix-mati",
                ixUnfusedBoundary: "",
                ixChihuaFusedFormula: "#n-0(ix-tla-chihua)0+0-0#",
                ixChihuaFusedSourceStem: "ix-chihua",
                ixChihuaFusedDerivedStem: "ix-tla-chihua",
                ixChihuaFusedBuildKind: "embed-matrix-plus-tla-fusion",
                ixChihuaFusedBoundaryKey: "",
                ixChihuaFusedInventsPrefixGeneric: false,
                chicoFusedFormula: "#ni-0(chico-tla-mati)0+0-0#",
                chicoFusedDerivedStem: "chico-tla-mati",
                chicoFusedBoundary: "",
                chicoFusedDecision:
                    "typed-embed-matrix-context-builds-tla-fusion",
                temoFusedFormula: "#ni-0(tla-temo)0+0-0#",
                temoFusedStateValence: "projective-nonhuman",
                temoFusedSourceValence: "projective-nonhuman",
                temoFusedRequestedValence: "projective-nonhuman",
                temoFusedSuppliedTla: false,
                temoFusedCitation: "tla-(temō)",
                temoFusedDerivedStem: "tla-temō",
                huelIttaFusedFormula: "#ni-0(huel-la-itta)0+c-0#",
                huelIttaFusedDerivedStem: "huel-la-itta",
                huelIttaFusedBuildKind: "embed-matrix-plus-tla-fusion",
                huelIttaFusedSegment: "la",
                huelIttaFusedBoundaryKey: "",
                huelIttaFusedInventsPrefixGeneric: false,
                intransitiveTlaFusionRequested: true,
                intransitiveTlaFusionAvailable: false,
                intransitiveTlaFusionApplied: false,
                intransitiveTlaFusionVisible: false,
                intransitiveObjectVisible: false,
                ixUrlSourceParts: "",
                ixUrlEmbed: "",
                ixUrlMatrix: "",
                ixUrlFormula: "#ni-0(tla-ix-mati)0+0-0#",
                ixUrlDerivedStem: "tla-ix-mati",
                ixUrlBuildKind: "matrix-plus-tla-fusion",
                ixUrlDecision: "typed-matrix-builds-tla-fusion",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "tense authority frame licenses Canvas tenses and fails closed for an unclassified value",
        typeof ctx.getAndrewsTenseAuthorityFrame === "function"
            ? {
                preterito: ctx.getAndrewsTenseAuthorityFrame("preterito", ctx.TENSE_MODE?.verbo || "verbo").scope,
                condicional: ctx.getAndrewsTenseAuthorityFrame("condicional", ctx.TENSE_MODE?.verbo || "verbo").scope,
                preteritoGate: ctx.getAndrewsTenseGenerationGateFrame(ctx.getAndrewsTenseAuthorityFrame("preterito", ctx.TENSE_MODE?.verbo || "verbo")).generationGate,
                condicionalGate: ctx.getAndrewsTenseGenerationGateFrame(ctx.getAndrewsTenseAuthorityFrame("condicional", ctx.TENSE_MODE?.verbo || "verbo")).generationGate,
                condicionalFamily: ctx.getAndrewsTenseAuthorityFrame("condicional", ctx.TENSE_MODE?.verbo || "verbo").family,
                condicionalCoreFamily: typeof ctx.getAndrewsCnvTenseLogicAuthorityFrame === "function"
                    ? ctx.getAndrewsCnvTenseLogicAuthorityFrame("condicional").family
                    : "",
                preteritoCnvAllowed: ctx.isAndrewsCnvTenseGenerationGateAllowed("preterito", ctx.TENSE_MODE?.verbo || "verbo"),
                condicionalCnvAllowed: ctx.isAndrewsCnvTenseGenerationGateAllowed("condicional", ctx.TENSE_MODE?.verbo || "verbo"),
                nominalSlot: ctx.getAndrewsTenseAuthorityFrame("agentivo", ctx.TENSE_MODE?.sustantivo || "sustantivo").slot,
                nonactiveSlot: ctx.getAndrewsTenseAuthorityFrame("lu", ctx.TENSE_MODE?.verbo || "verbo").slot,
                particleSlot: ctx.getAndrewsTenseAuthorityFrame("particle-mode", ctx.TENSE_MODE?.particula || "particula").slot,
                outputGateSlot: ctx.getAndrewsTenseAuthorityFrame("selection-required", ctx.TENSE_MODE?.verbo || "verbo").slot,
                unknownSlot: ctx.getAndrewsTenseAuthorityFrame("inventado", ctx.TENSE_MODE?.verbo || "verbo").slot,
                unknownGate: ctx.getAndrewsTenseGenerationGateFrame(ctx.getAndrewsTenseAuthorityFrame("inventado", ctx.TENSE_MODE?.verbo || "verbo")).generationGate,
                nominalHoverMentionsCnn: ctx.getAndrewsFirstTenseHoverTitle("agentivo", ctx.TENSE_MODE?.sustantivo || "sustantivo").includes("CNN routes do not expose a VNC tense slot"),
            }
            : {
                preterito: panels.includes("preterito: Object.freeze({")
                    && panels.includes('scope: "andrews-licensed"')
                    ? "andrews-licensed"
                    : "missing",
                condicional: panels.includes('scope: "unknown"')
                    ? "unknown"
                    : "missing",
                preteritoGate: panels.includes('generationGate: "andrews-licensed-generation"')
                    ? "andrews-licensed-generation"
                    : "missing",
                condicionalGate: panels.includes('generationGate: "unclassified-andrews-frame-required"')
                    ? "unclassified-andrews-frame-required"
                    : "missing",
                condicionalFamily: panels.includes("getAndrewsCnvTenseLogicAuthorityFrame(normalizedTense)")
                    ? "condicional"
                    : "missing",
                condicionalCoreFamily: panels.includes("getAndrewsCnvTenseLogicAuthorityFrame(normalizedTense)")
                    ? "condicional"
                    : "missing",
                preteritoCnvAllowed: panels.includes("function isAndrewsCnvTenseGenerationGateAllowed")
                    && panels.includes('=== "andrews-licensed-generation"'),
                condicionalCnvAllowed: false,
                nominalSlot: panels.includes('slot: "no-vnc-tns"')
                    ? "no-vnc-tns"
                    : "missing",
                nonactiveSlot: panels.includes('family: "nonactive-verbstem"')
                    ? "derived-stem"
                    : "missing",
                particleSlot: panels.includes('scope: "andrews-particle-boundary"')
                    ? "no-vnc-tns"
                    : "missing",
                outputGateSlot: panels.includes('scope: "andrews-output-gate"')
                    ? "route-selection-required"
                    : "missing",
                unknownSlot: panels.includes('slot: "andrews-frame-required"')
                    ? "andrews-frame-required"
                    : "missing",
                unknownGate: panels.includes('generationGate: "unclassified-andrews-frame-required"')
                    ? "unclassified-andrews-frame-required"
                    : "missing",
                nominalHoverMentionsCnn: panels.includes('function getAndrewsFirstTenseHoverTitle(tenseValue = "", mode = TENSE_MODE.verbo)')
                    && panels.includes("getAndrewsTenseAuthorityFrame(tenseValue, mode)")
                    && panels.includes("getAndrewsFirstTenseHoverTitle(tenseValue, tenseMode)")
                    && composer.includes("getAndrewsFirstTenseHoverTitle(tenseValue, getActiveTenseMode())"),
            },
        {
            preterito: "andrews-licensed",
            condicional: "unknown",
            preteritoGate: "andrews-licensed-generation",
            condicionalGate: "unclassified-andrews-frame-required",
            condicionalFamily: "condicional",
            condicionalCoreFamily: "condicional",
            preteritoCnvAllowed: true,
            condicionalCnvAllowed: false,
            nominalSlot: "no-vnc-tns",
            nonactiveSlot: "derived-stem",
            particleSlot: "no-vnc-tns",
            outputGateSlot: "route-selection-required",
            unknownSlot: "andrews-frame-required",
            unknownGate: "unclassified-andrews-frame-required",
            nominalHoverMentionsCnn: true,
        }
    );
    s.eq(
        "retired Lessons 35-39 noun-tense tabs cannot authorize the canonical deverbal NNC route",
        {
            topLevel: typeof ctx.getTenseOrderForMode === "function"
                ? ctx.getTenseOrderForMode(ctx.TENSE_MODE?.sustantivo || "sustantivo")
                : null,
            staticGroups: staticGroupsJson.tenseLinguisticGroups?.sustantivo || null,
            legacyAuthorityAbsent:
                !panels.includes("ANDREWS_TENSE_ROUTE_AUTHORITY_BY_TENSE")
                && !panels.includes("buildAndrewsSourceGatedDerivationalRouteRegistry"),
            canonicalApplication:
                typeof ctx.requestClassicalDeverbalNncResult === "function"
                && state.includes('getClassicalGrammarApplicationOperationProjection("nnc:deverbal-construction")'),
        },
        {
            topLevel: [],
            staticGroups: { left: [], right: [] },
            legacyAuthorityAbsent: true,
            canonicalApplication: true,
        }
    );
    s.ok(
        "obsolete route-board, journey, linked-stage, and workbench lanes are fully retired",
        !html.includes('id="andrews-route-board"')
            && !html.includes('id="output-journey-strip"')
            && !panels.includes("AndrewsRouteBoard")
            && !rendering.includes("OutputJourney")
            && !rendering.includes("LinkedGrammar")
            && !rendering.includes("linked-grammar-path")
            && !panels.includes("FormulaWorkbench")
            && !html.includes("formula-workbench")
            && !events.includes("AndrewsRouteBoard")
            && !css.includes(".andrews-route-board")
            && !css.includes(".output-journey-strip")
            && !css.includes(".formula-workbench")
    );
    s.eq(
        "generated-row continuation controls and handoff helpers stay retired",
        [
            ["rendering:typed-continuation-frame", rendering, "buildGeneratedOutputTypedContinuationFrame"],
            ["rendering:continuation-identity", rendering, "getGeneratedOutputContinuationIdentityKey"],
            ["rendering:append-action", rendering, "appendContinuationAction"],
            ["rendering:action-group", rendering, "getOrCreateContinuationActionGroup"],
            ["rendering:route-group-audit", rendering, "auditVisibleContinuationRouteRecordGroups"],
            ["rendering:route-output-audit", rendering, "auditVisibleContinuationRouteOutputConsistency"],
            ["rendering:continuation-group-class", rendering, "conjugation-continuation-group"],
            ["rendering:linked-promote-class", rendering, "calc-guidance__chip--linked-promote"],
            ["composer:adjectival-handoff", composer, "isAdjectivalNncFunctionTypedContinuationFrame"],
            ["composer:source-handoff", composer, "sourceContinuationFrame"],
            ["composer:target-handoff", composer, "targetContinuationFrame"],
            ["composer:function-use-handoff", composer, "functionUseContinuation"],
        ]
            .filter(([, source, token]) => source.includes(token))
            .map(([label]) => label),
        []
    );
    s.ok(
        "#2 formula panel exposes tense, unit, and derivation controls",
        html.includes('id="tense-tabs"')
            && html.includes('class="tense-tabs formula-slot-controls"')
            && html.includes('class="calc-operators formula-controls-grid"')
            && formulaPanelHtml.indexOf('class="calc-operators formula-controls-grid"') >= 0
            && formulaPanelHtml.indexOf('id="tense-tabs"') > formulaPanelHtml.indexOf('class="calc-operators formula-controls-grid"')
            && html.includes('data-andrews-formula-role="formula-mode-derivation-controls"')
            && html.includes('data-tense-mode="verbo"')
            && html.includes('data-tense-mode="sustantivo"')
            && html.includes('data-mode-system="unit"')
            && html.includes('data-classical-authority-follows-source="true"')
            && html.includes('data-classical-authority-mirror="vnc"')
            && html.includes('data-classical-authority-mirror="nnc"')
            && !html.includes('data-classical-authority-mirror="particle"')
            && html.includes('class="calc-operator-chip__main">VNC</span>')
            && html.includes('class="calc-operator-chip__main">NNC</span>')
            && html.includes('data-derivation-type="direct"')
            && html.includes('data-derivation-type="causative"')
            && html.includes('data-derivation-type="applicative"')
            && html.includes('class="calc-operator-chip__main">Causative</span>')
            && html.includes('class="calc-operator-chip__main">Applicative</span>')
            && !html.includes('class="calc-operator-chip__unit">rule-generated</span>')
            && !html.includes('title="Rule-generated Lesson 24')
            && !html.includes('title="Rule-generated Lesson 26')
            && !html.includes('id="derivation-antiderivative"')
            && !html.includes('id="andrews-route-board"')
            && !html.includes('id="derivation-type"')
            && !panels.includes("showAndrewsRouteDirectoryInTenseTabs")
            && !panels.includes("mainWrap.appendChild(routeDirectoryColumn)")
            && !state.includes("data-ordinary-nnc-mode")
            && state.includes('button[data-tense-mode][data-classical-authority-mirror]')
            && state.includes('const buttons = Array.from(document.querySelectorAll("[data-derivation-type]"))')
            && !state.includes('querySelectorAll("[data-tense-mode]")')
            && state.includes('operators.removeAttribute("role")')
            && state.includes('buttonGrid.setAttribute("role", "group")')
            && state.includes('button.removeAttribute("aria-selected")')
            && css.includes("#panel-stack-pane-tense .calc-operators")
            && css.includes("body.is-language-classical .calc-operator--source-authority-mirror")
            && css.includes("display: none !important;")
            && !css.includes("#panel-stack-pane-tense > #derivation-antiderivative")
            && !css.includes("#panel-stack-pane-tense > #andrews-route-board")
    );
    s.ok(
        "formula app no longer mounts an Andrews workspace or formula workbench wrapper",
        !html.includes('id="andrews-workspace"')
            && !html.includes('class="andrews-workspace"')
            && !html.includes('id="formula-workbench"')
            && !html.includes('class="formula-workbench"')
            && !html.includes('data-andrews-component="formula-workbench"')
            && !html.includes('id="book-map"')
            && !html.includes('class="andrews-contract-strip"')
            && !html.includes('id="concept-glossary"')
            && html.includes('data-andrews-stage="source"')
            && html.includes('data-andrews-stage="authority-controls"')
            && html.includes('data-andrews-stage="authorized-result"')
            && !css.includes(".andrews-workspace")
            && !css.includes(".formula-workbench")
    );
    s.ok(
        "visible page shell follows Andrews nuclear-clause terminology",
        html.includes("<title>Classical Nahuatl Grammar</title>")
            && html.includes('id="app-title"')
            && html.includes(">Classical Nahuatl Grammar<")
            && html.includes('class="form-container-clause hero-panel hero-panel--entrada"')
            && classicalShell.includes('aria-label="Classical Nahuatl nuclear clause board"')
            && !html.includes('data-ui-label-key=')
            && classicalShell.includes('id="panel-stack-tab-formula"')
            && classicalShell.includes('data-panel-stack-tab="formula"')
            && classicalShell.includes('data-panel-stack-pane="formula"')
            && classicalShell.includes('data-andrews-panel="#1-source"')
            && classicalShell.includes('data-andrews-panel="#2-authority"')
            && classicalShell.includes('data-andrews-panel="#3-authorized-result"')
            && classicalShell.includes('data-andrews-stage-label="2 Grammar"')
            && classicalShell.includes(">GRAMMAR<")
            && classicalShell.includes(">Grammar</span>")
            && !html.includes("Conjugador de verbos")
            && !html.includes("form-container-word")
            && !html.includes(">DERIVED<")
    );
    s.ok(
        "desktop workspace places #1 source over #2 authority left of #3 result",
        css.includes('grid-template-columns: minmax(330px, 0.46fr) minmax(0, 1fr);')
            && css.includes('"main output"')
            && css.includes('.panel-main-column {\n  grid-area: main;')
            && css.includes('.panel-output-column {\n  grid-area: output;')
    );
    s.ok(
        "entrada source controls fit inside the left workspace column",
        css.includes("#container-inputs #composer-slot-stage > .verb-composer__top-row")
            && css.includes("grid-template-columns: repeat(2, minmax(0, 1fr));")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__matrix-input-row")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__matrix-head .verb-composer__slot-tabs")
            && css.includes("grid-template-columns: minmax(72px, 0.42fr) minmax(0, 0.58fr);")
            && css.includes("#container-inputs #composer-slot-stage > .verb-composer__bottom-row > .verb-composer__object-pair")
            && css.includes("grid-template-columns: minmax(0, 1fr);")
            && !css.includes("grid-template-columns: minmax(150px, 0.82fr) minmax(240px, 1.4fr);")
    );
    s.ok(
        "entrada top-row labels and transitivity tabs stay compact and level",
        css.includes("#container-inputs #composer-slot-stage .verb-composer__slot-tabs--transitivity")
            && css.includes("grid-template-columns: repeat(3, minmax(0, 1fr));")
            && css.includes("font-size: 0.56rem;")
            && css.includes("white-space: nowrap;")
            && css.includes("text-overflow: ellipsis;")
            && css.includes("grid-template-rows: 24px minmax(24px, auto);")
            && css.includes("grid-template-columns: max-content minmax(0, 1fr);")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__top-row .verb-composer__embed-input-row")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__top-row .verb-composer__matrix-input-row")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__top-row .verb-composer__matrix-head > .verb-composer__sub-label")
            && !css.includes(".verb-composer__stem-field.has-slot-entry-button > .verb-composer__sub-label,\n#container-inputs #composer-slot-stage .verb-composer__matrix-field.has-slot-entry-button")
    );
    s.ok(
        "canonical NNC entrada composer collapses to the predicate-base slot only",
        css.includes('#container-inputs .verb-composer[data-entry-board="nnc"] #composer-slot-stage')
            && css.includes('grid-template-areas: "source";')
            && css.includes('.verb-composer[data-entry-board="nnc"] .verb-composer__slot-tabs')
            && css.includes('.verb-composer[data-entry-board="nnc"] .verb-composer__embed-field')
            && css.includes('.verb-composer[data-entry-board="nnc"] .verb-composer__supportive-i-button')
            && css.includes('display: none !important;')
            && composer.includes('panel.dataset.entryBoard = nncActive ? "nnc" : activeBoard')
            && composer.includes('getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc')
    );
    s.ok(
        "entrada slot buttons select slot-input paths while visible typing stays in input#verb",
        html.includes('id="verb"')
            && html.includes('id="verb-entry-apply"')
            && html.includes('aria-keyshortcuts="Enter"')
            && html.includes('id="composer-stem-a"')
            && composer.includes("var ComposerVerbSlotEntryTarget = null")
            && composer.includes("var ComposerVerbSlotEntryLastVerbValue")
            && composer.includes("function buildComposerSlotEntryButton")
            && composer.includes("className = \"verb-composer__slot-entry-button\"")
            && composer.includes("aria-controls\", \"verb\"")
            && composer.includes("verbEl.dataset.composerSlotRouterBound")
            && composer.includes("clearComposerSlotEntryTarget()")
            && composer.includes("function getComposerSlotEntryStateValue")
            && composer.includes("function handleComposerVerbSlotBeforeInput")
            && composer.includes("function handleComposerVerbSlotInput")
            && composer.includes("applyComposerSlotEntryTargetInputValue")
            && composer.includes("targetInput.value = nextValue")
            && composer.includes('verbEl.addEventListener("beforeinput", handleComposerVerbSlotBeforeInput)')
            && composer.includes('verbEl.addEventListener("input", handleComposerVerbSlotInput)')
            && composer.includes("const slotStemInputs = COMPOSER_SLOT_KEYS")
            && composer.includes("const slotOtherControls = COMPOSER_SLOT_KEYS")
            && composer.includes("inputEl.classList.add(\"is-hidden-control\")")
            && composer.includes("shell.classList.add(\"has-slot-entry-button\")")
            && composer.includes("field?.classList?.add(\"has-slot-entry-button\")")
            && composer.includes("function getComposerSlotEntryButtonLabel")
            && composer.includes("function getComposerSlotEntryButtonVisibleText")
            && composer.includes("return normalizedValue ? `(${normalizedValue})` : \"\"")
            && composer.includes("focusComposerSlotEntryTarget(inputEl")
            && css.includes(".verb-composer__slot-entry-button")
            && css.includes(".verb-composer__tagged-input-shell.has-slot-entry-button")
            && css.includes(".verb-composer__slot-entry-label")
            && css.includes(".verb-composer__slot-entry-value")
            && css.includes("display: none;")
            && !css.includes(".verb-composer__matrix-field.has-slot-entry-button .verb-composer__matrix-head > .verb-composer__sub-label")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__slot-entry-button")
            && css.includes(".verb-composer__tagged-input-shell .verb-composer__tagged-input-control.is-hidden-control")
    );
    s.ok(
        "stem typing waits for explicit Enter or Return output activation",
        events.includes('const verbEntryApplyButton = targetObject.document.getElementById("verb-entry-apply")')
            && events.includes('source: "manual-entry"')
            && events.includes('} else if (event.key === "Enter")')
            && events.includes('source: "enter"')
            && events.includes("Typing only updates the editable source")
            && events.includes("targetObject.cancelScheduledVerbInputRefresh();")
            && !events.includes("targetObject.scheduleVerbInputRefresh(verbEl.value);")
            && composer.includes('input.addEventListener("input", handleSourcePartsChange)')
            && !composer.includes('source: "classical-source-change"')
            && html.includes('class="verb-entry-apply-button classical-source-parts__commit-button"')
            && css.includes(".verb-entry-apply-button")
            && css.includes(".classical-source-parts__commit-button")
    );
    const verbInputCssBlock = (css.match(/input\.verb-input \{[\s\S]*?\n\}/) || [""])[0];
    const verbInputPlaceholderCssBlock = (css.match(/input\.verb-input::placeholder \{[\s\S]*?\n\}/) || [""])[0];
    const verbInputCssLines = verbInputCssBlock.split("\n").map((line) => line.trim());
    s.ok(
        "entrada verb input keeps typed text visible against the screen background",
        verbInputCssBlock.includes("color: var(--ink);")
            && verbInputCssBlock.includes("-webkit-text-fill-color: var(--ink);")
            && verbInputCssBlock.includes("caret-color: var(--ink);")
            && verbInputCssBlock.includes("background: #fffdfa;")
            && !verbInputCssLines.includes("color: transparent;")
            && !verbInputCssLines.includes("-webkit-text-fill-color: transparent;")
            && verbInputPlaceholderCssBlock.includes("color: var(--placeholder-color);")
            && verbInputPlaceholderCssBlock.includes("-webkit-text-fill-color: var(--placeholder-color);")
    );
    s.eq(
        "static visible UI text excludes obsolete English grammar labels",
        (() => {
            const visibleHtmlText = html
                .replace(/<script[\s\S]*?<\/script>/gi, " ")
                .replace(/<style[\s\S]*?<\/style>/gi, " ")
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            const labelEsValues = [];
            const collectLabelEs = (value) => {
                if (!value || typeof value !== "object") {
                    return;
                }
                Object.entries(value).forEach(([key, entry]) => {
                    if (key === "labelEs" && typeof entry === "string") {
                        labelEsValues.push(entry);
                    } else {
                        collectLabelEs(entry);
                    }
                });
            };
            collectLabelEs(JSON.parse(staticLabels));
            const labelEsText = labelEsValues.join(" ");
            const visibleHtmlTextWithoutCanvasStemToken = visibleHtmlText.replace(/\(STEM\)/g, " ");
            return {
                htmlHasUnitFunction: /Unidad y función|Unit(?:\s+and|\s*&)?\s+Function/i.test(visibleHtmlText),
                htmlHasEnglishSlotLabel: /\b(?:Subject|Object|Tense|Source|Target|Generation|Diagnostic|Route|Stage|Result|Input|Output)\b/.test(visibleHtmlText),
                htmlHasEnglishSlotShorthand: /\bSTEM\b|\bSlot\b|\bSlots\b|\bConsejo\b|Tamaño UI|\bUI\b|\bACT\b|\bNO\s+ACT\b|\bdir\b|\binc\b|\bN>V\b|CSV vista|\bCSV\b|Valencia CNV|Tablero CNV|CNN\/N|fuente N\b/.test(visibleHtmlTextWithoutCanvasStemToken),
                htmlHasTnsShorthand: /\btns\b/i.test(visibleHtmlText),
                labelsHaveUnitFunction: /Unidad y función|Unit(?:\s+and|\s*&)?\s+Function/i.test(labelEsText),
                labelsHaveEnglishSlotLabel: /\b(?:Subject|Object|Tense|Source|Target|Generation|Diagnostic|Route|Stage|Result|Input|Output)\b/.test(labelEsText),
                labelsHaveEnglishSlotShorthand: /\bSTEM\b|\bSlot\b|\bSlots\b|\bConsejo\b|Tamaño UI|\bUI\b|\bACT\b|\bNO\s+ACT\b|\bdir\b|\binc\b|\bN>V\b|CSV vista|\bCSV\b|Valencia CNV|Tablero CNV|CNN\/N|fuente N\b/.test(labelEsText),
                labelsHaveTnsShorthand: /\btns\b/i.test(labelEsText),
            };
        })(),
        {
            htmlHasUnitFunction: false,
                htmlHasEnglishSlotLabel: true,
                htmlHasEnglishSlotShorthand: false,
                htmlHasTnsShorthand: false,
            labelsHaveUnitFunction: false,
            labelsHaveEnglishSlotLabel: false,
            labelsHaveEnglishSlotShorthand: false,
            labelsHaveTnsShorthand: false,
        }
    );
    s.ok(
        "Canonical Source Grammar Result HTML encodes nuclear-clause formula architecture without curriculum dispatch",
        !classicalShell.includes("data-andrews-lesson")
            && classicalShell.includes('data-andrews-unit="clausula-nuclear"')
            && classicalShell.includes('data-andrews-not-word="true"')
            && classicalShell.includes('data-andrews-layout="source-authority-authorized-result"')
            && classicalShell.includes('data-andrews-panel-model="whole-transcription-canvas"')
            && classicalShell.includes('class="form-container panel nuclear-clause-source-panel"')
            && classicalShell.includes('data-andrews-formula-role="predicate-stem-source"')
            && classicalShell.includes('class="verb-block nuclear-clause-entry"')
            && classicalShell.includes('data-andrews-input="stem-only"')
            && classicalShell.includes('data-andrews-formula-slot="person-prefix"')
            && classicalShell.includes('data-andrews-formula-slot="number-suffix"')
            && classicalShell.includes('class="panel tense-tabs-panel formula-controls-panel panel-stack-pane"')
            && classicalShell.includes('data-andrews-general-formula="subject-predicate"')
            && classicalShell.includes('data-andrews-subject-formula="#person+...+number#"')
            && classicalShell.includes('data-andrews-vnc-predicate="valence+stem+tense"')
            && classicalShell.includes('data-andrews-nnc-predicate="state+stem"')
            && classicalShell.includes('data-andrews-vnc-layers="verbstem > verbcore > predicate > CNV"')
            && classicalShell.includes('data-andrews-nnc-layers="nounstem > nouncore/predicate > CNN"')
            && classicalShell.includes('class="tense-tabs formula-slot-controls"')
            && classicalShell.includes('data-andrews-vnc-slot="tns"')
            && classicalShell.includes('data-andrews-nnc-slot="st"')
            && classicalShell.includes('class="calc-operators formula-controls-grid"')
            && classicalShell.includes('data-andrews-formula-role="formula-mode-derivation-controls"')
            && classicalShell.includes('data-tense-mode="verbo"')
            && classicalShell.includes('data-tense-mode="sustantivo"')
            && classicalShell.includes('data-derivation-type="causative"')
            && classicalShell.includes('data-derivation-type="applicative"')
            && !classicalShell.includes('formula-controls-section--predicate-route"')
            && classicalShell.includes('class="panel container-tense-grid nuclear-clause-output-panel panel-stack-pane"')
            && classicalShell.includes('data-andrews-stage="authorized-result"')
            && classicalShell.includes('data-andrews-renders="subject-predicate-formula"')
            && state.includes('var PANEL_STACK_ORDER = ["inputs", "formula", "output"]')
            && state.includes('mode === "formula" || mode === "tense"')
    );
    s.ok(
        "canonical NNC entry surface hides VNC-only and denominal controls",
        css.includes('.verb-composer[data-entry-board="nnc"] .verb-composer__matrix-affix-picker')
            && css.includes('.verb-composer[data-entry-board="nnc"] .verb-composer__serial-type-chips')
            && css.includes('.verb-composer[data-entry-board="nnc"] .verb-composer__slot-tabs')
            && css.includes('.verb-composer[data-entry-board="nnc"] .verb-composer__embed-field')
            && css.includes('.verb-composer[data-entry-board="nnc"] .verb-composer__bottom-row')
            && !css.includes('[data-entry-board="ordinary-nnc"]')
    );
    const getComposerSelectValues = (id) => {
        const select = classicalShell.match(new RegExp(`id="${id}"[\\s\\S]*?</select>`, "u"))?.[0] || "";
        return Array.from(select.matchAll(/<option value="([^"]*)"/gu), (match) => match[1]);
    };
    s.eq(
        "composer shell and runtime expose strict Classical valence Source choices",
        {
            slotA: getComposerSelectValues("composer-valence-a"),
            slotB: getComposerSelectValues("composer-valence"),
            slotC: getComposerSelectValues("composer-valence-2"),
            inventory: ctx.getComposerSecondaryValenceInventory(),
            legacyAccepted: ["ta", "tajta", "te", "tejte", "mu", "mujmu"]
                .filter((token) => ctx.normalizeComposerSecondaryValenceSurfaceToken(token)),
        },
        {
            slotA: ["", "tla"],
            slotB: ["", "tla", "tē", "mo"],
            slotC: ["", "tē-2", "tla-2", "mo-2", "tē+tē", "tla+tla", "tē+tla", "mo+tla", "mo+tē"],
            inventory: ["tla", "tlahtla", "tē", "tēhtē", "mo", "mohmo"],
            legacyAccepted: [],
        }
    );
    s.eq(
        "composer UI serialization accepts huāl and blocks legacy Source spellings",
        {
            canonical: ctx.buildComposerModeBundle({
                transitivity: "transitive",
                directionalPrefix: "huāl",
                valence: "tēhtē",
                slotBStem: "mati",
            }, "").regexValue,
            legacyControl: ctx.buildComposerModeBundle({
                transitivity: "transitive",
                valence: "tejte",
                slotBStem: "mati",
            }, "").regexValue,
            legacyTyped: ctx.buildComposerModeBundle({
                transitivity: "transitive",
                valence: "tēhtē",
                slotBStem: "mati",
            }, "[wal]/(tēhtē)-mati"),
            directionalOptions: ctx.getComposerDirectionalPrefixInventory(),
        },
        {
            canonical: "huāl+tēhtē-(mati)",
            legacyControl: "",
            legacyTyped: {
                regexValue: "",
                selectionRequired: "classical-source-spelling",
                blocked: true,
                blockReason: "legacy-classical-source-token:wal",
            },
            directionalOptions: ["huāl", "on"],
        }
    );
    s.ok(
        "verb composer labels use Andrews slot vocabulary instead of old root labels",
        composer.includes("function getComposerMatrixFieldLabel")
            && composer.includes("function getComposerMatrixInputTagLabel")
            && composer.includes('return "Matrix stem"')
            && composer.includes('return "base"')
            && !composer.includes('return "Nominal source"')
            && !composer.includes('return "nominal"')
            && classicalBasalHtml.includes('data-classical-basal-scope="verbal-nuclear-clause"')
            && classicalBasalHtml.includes('data-classical-basal-scope="nominal-nuclear-clause"')
            && !html.includes('aria-label="Nominal verbalization board"')
            && html.includes(">Matrix stem<")
            && html.includes(">Embed<")
            && html.includes(">Object 1/reflexive<")
            && html.includes(">Object 1/object 2/reflexive<")
            && composer.includes('{ label: "Consejo"')
            && panels.includes('entry.label === "Consejo"')
            && events.includes('content: "(base)"')
            && !events.includes('content: "(STEM)"')
            && html.includes(">Directional<")
            && html.includes(">embed<")
            && !html.includes(">Raíz matriz<")
            && !html.includes(">Elemento incorporado<")
            && !html.includes(">Marcador no específico<")
            && !composer.includes('"Tronco predicado"')
            && !composer.includes('"Raíz matriz"')
    );
    s.ok(
        "Lesson 1 concepts use the canonical typed read-only owner while the obsolete glossary lane stays absent",
        browserRuntimeHas("src/core/concepts/concepts.mjs")
            && !html.includes('id="concept-glossary"')
            && !html.includes("Lección 1 · Andrews OS")
            && !html.includes("Notación y términos")
            && concepts.includes("buildClassicalGrammarConceptSource")
            && concepts.includes("evaluateClassicalGrammarConcept")
            && concepts.includes("isClassicalGrammarConceptResult")
            && concepts.includes('CONCEPT_APPLICATION_OPERATION_ID = "concept:classification"')
            && concepts.includes("cláusula nuclear verbal")
            && concepts.includes("cláusula nuclear nominal")
            && concepts.includes("generationAllowed: false")
            && !concepts.includes("buildConceptGlossaryDisplayModel")
            && !concepts.includes("classifyConceptToken")
            && !curriculum.includes("function initConceptGlossaryPanel")
            && !curriculum.includes("concept-glossary__item")
    );
    const nominalSourceUnitGroups = (staticGroupsJson.tenseLinguisticGroups?.sustantivo?.left || []).map((group) => ({
        heading: group.heading?.labelEs || "",
        tenses: group.tenses || [],
    }));
    s.eq(
        "retired nominal tense-tab groups stay absent from the shared Source controls",
        nominalSourceUnitGroups,
        []
    );
    s.ok(
        "particle and supplementation composition reaches only the canonical browser owners",
        (browserRuntimeHas("src/core/classical/particle_grammar.mjs")
            && browserRuntimeHas("src/core/sentence/supplementation.mjs")
            && lesson3Particles.includes("isClassicalNahuatlParticleResultFrame")
            && supplementation.includes("evaluateClassicalNahuatlSupplementationOperation"))
            || browserRuntimeHas("src/core/classical/particle_grammar.mjs")
            && browserRuntimeHas("src/core/sentence/supplementation.mjs")
            && !browserRuntimeHas("src/core/sentence/sentence.mjs")
            && lesson3Particles.includes("issuedParticleResultFrames")
            && lesson3Particles.includes("storedSurfaceAuthority: false")
            && supplementation.includes("evaluateClassicalNahuatlSupplementationOperation")
            && supplementation.includes("isClassicalNahuatlSupplementationFrame")
    );
    s.ok(
        "LCM grammar frame contract reaches browser runtime before route generation",
        browserRuntimeHas("src/core/grammar/frame.mjs")
            && runtimeSource.indexOf("frame.mjs") < runtimeSource.indexOf("engine.mjs")
            && grammarFrame.includes("authorityFrame")
            && grammarFrame.includes("routeContract")
            && grammarFrame.includes("diagnosticFrame")
            && grammarFrame.includes("buildGrammarFrame")
            && grammarFrame.includes("buildGrammarResultContract")
    );
    s.ok(
        "Lesson 27 frequentative behavior reaches the one canonical typed closure",
        browserRuntimeHas("src/core/classical/vnc_lessons27_29_33_closure.mjs")
            && lessons27282933Closure.includes('operation === "frequentative"')
            && lessons27282933Closure.includes('"frequentative-prefix-shape"')
            && lessons27282933Closure.includes('"frequentative-destockal"')
    );
    s.ok(
        "Lesson 29 purposive behavior reaches the one canonical typed closure",
        browserRuntimeHas("src/core/classical/vnc_lessons27_29_33_closure.mjs")
            && lessons27282933Closure.includes('operation === "purposive"')
            && lessons27282933Closure.includes('"purposive-paradigm"')
            && lessons27282933Closure.includes('"purposive-external-directional"')
    );
    s.ok(
        "Lessons 31-32 compound and affective NNC behavior reaches the one canonical typed closure",
        browserRuntimeHas("src/core/classical/nominal_construction.mjs")
            && lessons303134Closure.includes('"compound-nnc"')
            && lessons303134Closure.includes('"affective-nnc"')
            && lessons303134Closure.includes("evaluateClassicalNahuatlNominalConstruction")
    );
    s.ok(
        "Lesson 33 honorific and pejorative behavior reaches the one canonical typed closure",
        browserRuntimeHas("src/core/classical/vnc_lessons27_29_33_closure.mjs")
            && lessons27282933Closure.includes('operation === "honorific"')
            && lessons27282933Closure.includes('"pejorative-preterit-embed"')
    );
    s.ok(
        "Lesson 34 numeral NNC behavior reaches the one canonical typed closure",
        browserRuntimeHas("src/core/classical/nominal_construction.mjs")
            && lessons303134Closure.includes('"cardinal-numeral-nnc"')
            && lessons303134Closure.includes('"numeral/basic-set"')
    );
    s.ok(
        "Lessons 45-47 relational NNC generation reaches the one canonical typed closure",
        browserRuntimeHas("src/core/classical/nnc_lessons45_47_closure.mjs")
            && nncRelational.includes("classical-nahuatl-relational-nnc-relational-source-frame")
            && nncRelational.includes("evaluateClassicalNahuatlRelationalNnc")
            && nncRelational.includes("owner-issued-upstream-result-required")
            && nncRelational.includes("callerSuppliedAuthorityAccepted: false")
    );
    s.ok(
        "Lesson 48 place/gentilic NNC boundary reaches browser runtime without generation",
        browserRuntimeHas("src/core/nnc/place_gentilic/place_gentilic.mjs")
            && nncPlaceGentilic.includes("place-gentilic-nnc-boundary")
            && nncPlaceGentilic.includes("locative-temporal nominal outputs are not place-name NNC evidence")
            && nncPlaceGentilic.includes("changesOrdinaryNncGeneration: false")
            && nncPlaceGentilic.includes("generationAllowed: false")
    );
    s.ok(
        "Lessons 42-43 adjectival modification reaches its canonical typed owner only",
        (browserRuntimeHas("src/core/classical/adjectival_modification.mjs")
            && lessons4043Closure.includes("evaluateClassicalNahuatlAdjectivalModification")
            && lessons4043Closure.includes("callerSuppliedAuthorityAccepted: false"))
            || browserRuntimeHas("src/core/classical/adjectival_modification.mjs")
            && !browserRuntimeHas("src/core/clause/modification/modification.mjs")
            && lessons4043Closure.includes('"adjectival-modification"')
            && lessons4043Closure.includes("evaluateClassicalNahuatlAdjectivalModificationConstruction")
            && lessons4043Closure.includes("callerSuppliedAuthorityAccepted: false")
    );
    s.ok(
        "Lesson 44 adverbial nuclear generation reaches its canonical typed owner only",
        (browserRuntimeHas("src/core/classical/adverbial_nuclear_grammar.mjs")
            && lesson44Adverbial.includes("completeLicensedInventory: true")
            && lesson44Adverbial.includes("callerSuppliedAuthorityAccepted: false"))
            || browserRuntimeHas("src/core/classical/adverbial_nuclear_grammar.mjs")
            && !browserRuntimeHas("src/core/clause/adverbial/adverbial.mjs")
            && lesson44Adverbial.includes("completeLicensedInventory: true")
            && lesson44Adverbial.includes("classical-nahuatl-adverbial-nuclear-result")
            && lesson44Adverbial.includes("evaluateClassicalNahuatlLesson44AdverbialNuclear")
    );
    s.ok(
        "Lessons 49-50 adverbial adjunction boundary reaches browser runtime without generation",
        browserRuntimeHas("src/core/clause/adjunction/adjunction.mjs")
            && adjunction.includes("adverbial-adjunction-boundary")
            && adjunction.includes("single generated NNC or VNC words do not prove adjoined-unit relations")
            && adjunction.includes("changesVncGeneration: false")
            && adjunction.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 51 complement boundary reaches browser runtime without generation",
        browserRuntimeHas("src/core/clause/complement/complement.mjs")
            && complement.includes("complement-clause-boundary")
            && complement.includes("object controls and subject labels are not complement-clause evidence")
            && complement.includes("changesValencyBehavior: false")
            && complement.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 52 conjunction boundary reaches browser runtime without generation",
        browserRuntimeHas("src/core/clause/conjunction/conjunction.mjs")
            && conjunction.includes("conjunction-clause-boundary")
            && conjunction.includes("parser separators and slash variants are not conjunction AST evidence")
            && conjunction.includes("changesParserBehavior: false")
            && conjunction.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 53 comparison boundary reaches browser runtime through typed generation",
        browserRuntimeHas("src/core/comparison/comparison.mjs")
            && comparison.includes("comparison-boundary")
            && comparison.includes("adjective-like word output is not comparison syntax")
            && comparison.includes("changesAdjectiveGeneration: false")
            && comparison.includes("generationAllowed: true")
    );
    s.eq(
        "retired test-only duplicate domain modules are absent from the canonical browser runtime",
        [
            "src/core/calendar/calendar.mjs",
            "src/core/derivation/frequentative/frequentative.mjs",
            "src/core/nnc/compound/compound.mjs",
            "src/core/nnc/numerals/numerals.mjs",
            "src/core/vnc/honorific_pejorative/honorific_pejorative.mjs",
            "src/core/vnc/purposive/purposive.mjs",
        ].filter(browserRuntimeHas),
        []
    );
    s.ok(
        "Lesson 56 personal-name NNC boundary reaches browser runtime through issued typed source frames",
        browserRuntimeHas("src/core/nnc/names/names.mjs")
            && nncNames.includes("personal-name-nnc-boundary")
            && nncNames.includes('status: "complete-typed-grammar"')
            && nncNames.includes('generationGate: "issued-source-clause+issued-source-unit+issued-operation"')
            && nncNames.includes("hasPersonalNameNncGeneration: true")
            && nncNames.includes("generationAllowed: true")
    );
    s.ok(
        "Lessons 57-58 reuse canonical VNC, NNC, denominal, construction, and supplementation owners without an analysis runtime lane",
        !browserRuntimeHas("src/core/analysis/analysis.mjs")
            && browserRuntimeHas(
                "src/application/classical/vnc_application.mjs"
            )
            && browserRuntimeHas(
                "src/application/classical/nnc_application.mjs"
            )
            && browserRuntimeHas(
                "src/core/classical/denominal_vnc_grammar.mjs"
            )
            && browserRuntimeHas(
                "src/core/classical/nominal_construction.mjs"
            )
            && browserRuntimeHas(
                "src/core/sentence/supplementation.mjs"
            )
    );
    s.ok(
        "Lesson 4 nuclear clause shell reaches summary UI without driving generation",
        browserRuntimeHas("src/core/clause/clause.mjs")
            && state.includes("function getCurrentNuclearClauseShell")
            && state.includes("buildNuclearClauseShellMetadata")
            && clause.includes("getNuclearClauseDisplayLabel(formulaType)")
            && clause.includes("formulaAbbreviation")
            && clause.includes("getNuclearClauseFormulaInventory")
            && clause.includes("buildNuclearClauseFrame")
            && clause.includes("buildNuclearClauseUseFrame")
            && clause.includes("getNuclearClausePredicateFunctionProfile")
            && clause.includes("buildNuclearClauseDiagramTree")
            && clause.includes("buildNuclearClausePredicatePositionControlFrame")
            && clause.includes("buildNuclearClausePersonalPronounResolutionFrame")
            && clause.includes("#pers1-pers2+va1-va2(STEM)tns+num1-num2#")
            && clause.includes("#pers1-pers2+st1-st2(STEM)num1-num2#")
            && clause.includes("objectiveCaseOnlyInVncPredicate")
            && clause.includes("possessiveCaseOnlyInNncPredicate")
            && clause.includes("NUCLEAR_CLAUSE_FORMULA_TYPE.vnc")
            && clause.includes("NUCLEAR_CLAUSE_FORMULA_TYPE.nnc")
    );
    s.ok(
        "Nuclear-clause shell labels reach generated output rows without public lesson labels",
        (rendering.includes("function buildNuclearClauseShellSubLabels")
            && rendering.includes("function appendNuclearClauseShellSubLabels")
            && !rendering.includes("Andrews Lesson 4"))
            || rendering.includes("function buildNuclearClauseShellSubLabels")
            && rendering.includes("function appendNuclearClauseShellSubLabels")
            && rendering.includes("function appendNuclearClauseGrammarInspector")
            && rendering.includes("function appendNuclearClauseCompactDiagram")
            && rendering.includes("function appendNuclearClauseDiagramNode")
            && rendering.includes("function getNuclearClauseDiagramNodeLabel")
            && rendering.includes("function getNuclearClauseDiagramNodeMeta")
            && rendering.includes("function createGrammarInspectorPanel")
            && rendering.includes("function collectNuclearClauseTreeNodes")
            && rendering.includes("result.nuclearClauseShell")
            && rendering.includes("evaluation.result?.nuclearClauseShell")
            && rendering.includes("Nuclear clause grammar")
            && !rendering.includes("Andrews Lesson 4")
            && rendering.includes("nuclear clause")
            && rendering.includes("classification")
            && rendering.includes("pronouns")
            && rendering.includes("reference: context")
            && rendering.includes("lesson4?.activeFormula")
            && rendering.includes("function formatVisibleAndrewsFormula")
            && rendering.includes("function formatVisibleAndrewsSlotToken")
            && rendering.includes("subject + predicate")
            && rendering.includes("person + number")
            && rendering.includes("person1-person2 + number1-number2")
            && rendering.includes("verbal core + tense")
            && rendering.includes("valence + stem")
            && rendering.includes("state + stem")
            && rendering.includes("verbal core = valence + stem + tense")
            && rendering.includes("nominal core = state + stem")
            && rendering.includes('createGrammarInspectorLine("type"')
            && rendering.includes('createGrammarInspectorLine("use"')
            && rendering.includes('createGrammarInspectorLine("position"')
            && rendering.includes('createGrammarInspectorLine("pronoun"')
            && rendering.includes('createGrammarInspectorLine("categories"')
            && rendering.includes('createGrammarInspectorLine("gender"')
            && rendering.includes('"cases"')
            && rendering.includes("affixal")
            && rendering.includes("referring elements only")
            && rendering.includes('person: "person"')
            && rendering.includes('animacy: "animacy"')
            && rendering.includes('humanness: "humanness"')
            && rendering.includes('number: "number"')
            && rendering.includes('case: "case"')
            && rendering.includes('categories.join(" · ")')
            && rendering.includes("nominative: subject · objective: VNC predicate · possessive: NNC predicate")
            && rendering.includes('createGrammarInspectorLine("context"')
            && rendering.includes("grammar-inspector__line--context")
            && rendering.includes("grammar-inspector__line--thesis")
            && rendering.includes('createGrammarInspectorPanel("Structure", "typed nuclear clause")')
            && !rendering.includes("Andrews Structure")
            && rendering.includes("Classification")
            && !rendering.includes('createGrammarInspectorLine("fórmula"')
            && rendering.includes('formula ? `${label}: ${formatVisibleAndrewsFormula(formula)}` : label')
            && css.includes(".grammar-inspector")
            && css.includes(".grammar-inspector__body")
            && css.includes(".grammar-inspector__panel")
            && css.includes("grid-template-columns: repeat(2, minmax(0, 1fr));")
            && css.includes("border-top: 2px solid rgba(58, 112, 121, 0.24);")
            && css.includes(".grammar-inspector__line--thesis .grammar-inspector__line-value")
            && css.includes(".grammar-inspector__line--context .grammar-inspector__line-value")
            && css.includes(".grammar-inspector__formula-options")
            && css.includes("padding-top: 4px;")
            && css.includes(".classical-rule-surface__answer-facts .grammar-inspector__line")
            && css.includes("grid-template-columns: minmax(0, 1fr);")
            && css.includes("max-inline-size: 100%;")
            && css.includes(".grammar-inspector__diagram")
            && css.includes(".grammar-inspector__diagram-node")
            && css.includes(".grammar-inspector__diagram-children")
            && css.includes(".grammar-inspector__diagram-node--predicate-position.is-vacant")
            && css.includes(".grammar-inspector__formula-option.is-active")
    );
    s.ok(
        "canonical NNC entrada keeps Source to actual constituents and routes Grammar through the shared application",
        composer.includes('panel.dataset.entryBoard = nncActive ? "nnc" : activeBoard')
            && composer.includes("getClassicalBasalUnitFromRuntime()")
            && composer.includes("applyClassicalBasalUnitMode(")
            && rendering.includes("function buildClassicalOrdinaryNncApplicationSourceFrame")
            && rendering.includes("issueCanonicalNncSourceFrame({")
            && rendering.includes("function buildClassicalOrdinaryNncApplicationOperationFrame")
            && rendering.includes("issueCanonicalNncOperationFrame(")
            && rendering.includes("function buildClassicalOrdinaryNncApplicationResultFrame")
            && rendering.includes("requestClassicalOrdinaryNncResult(")
            && rendering.includes("isClassicalNahuatlOrdinaryNncResult(machineryFrame)")
            && rendering.includes("canonicalNncResult.formulaProjection.formulaRealization")
            && rendering.includes("canonicalNncResult?.writtenProjection?.surfaceRealization")
            && rendering.includes("function buildClassicalOrdinaryNncParadigmFrame")
            && rendering.includes("pointwiseEquivalent: coordinate.pointwiseEquivalent === true")
            && !composer.includes("parseComposerOrdinaryNncAnalogueInput")
            && !composer.includes("buildComposerOrdinaryNncInputBundle")
            && !composer.includes("setComposerOrdinaryNncState")
            && !state.includes("OrdinaryNncGenerationState")
            && !rendering.includes("renderOrdinaryNncConjugations")
            && !html.includes('data-ordinary-nnc-mode="true"')
    );
    s.ok(
        "changing a canonical NNC Grammar control refreshes the same basal workflow",
        composer.includes('const classicalRuleLogicControls = targetObject.document.querySelectorAll("[data-classical-rule-logic-control]")')
            && composer.includes("classicalRuleLogicControls.forEach(control => {")
            && composer.includes('control.addEventListener("change", () => {')
            && composer.includes("refreshClassicalRuleLogicSurfaceFromControl(control)")
            && composer.includes("syncClassicalBasalUnitControls()")
            && !composer.includes("syncComposerOrdinaryNncClassTabActiveState")
            && !composer.includes("setComposerOrdinaryNncState")
    );
    s.ok(
        "entrada URL segments are wired to #1 Entrada composer state",
        composer.includes("ENTRADA_URL_SEGMENT_SCHEMA")
            && composer.includes("function buildEntradaUrlSegmentString")
            && composer.includes("function parseEntradaUrlSegmentString")
            && composer.includes("function initEntradaUrlSegments")
            && composer.includes('target.closest("#container-inputs, #classical-authority-panel, #classical-result-panel")')
            && composer.includes('"classicalNncAnimacy"')
            && composer.includes('"classicalNncMetaphoricalUse"')
            && !composer.includes('"classicalNncType"')
            && !composer.includes('"classicalNncReferent"')
            && !composer.includes('"slotATemplateSurface"')
            && !composer.includes('"slotATemplateTiCausativeClass"')
            && events.includes("initEntradaUrlSegments()")
    );
    s.eq(
        "entrada URL preserves the active screen and derivative type across refresh",
        typeof ctx.buildEntradaUrlHash === "function"
            && typeof ctx.parseEntradaUrlSegmentString === "function"
            ? (() => {
                const resultHash = ctx.buildEntradaUrlHash({
                    input: "(chōca)",
                    panel: "output",
                });
                const authorityHash = ctx.buildEntradaUrlHash({
                    input: "(chōca)",
                    panel: "authority",
                });
                const legacySnapshot = ctx.parseEntradaUrlSegmentString("#entrada/v1/verb/(chōca)");
                const causativeHash = ctx.buildEntradaUrlHash({
                    input: "(chōca)",
                    panel: "formula",
                    derivationType: "causative",
                });
                const applicativeHash = ctx.buildEntradaUrlHash({
                    input: "(chōca)",
                    derivationType: "applicative",
                    derivedVnc: "11.42.52.62.82.91.b4.e1.n1.s1",
                });
                const directWithStaleCapsule = ctx.buildEntradaUrlHash({
                    input: "(chōca)",
                    derivationType: "direct",
                    derivedVnc: "11.42",
                });
                const directParadigm = ctx.buildEntradaUrlHash({
                    input: "(chōca)",
                    derivationType: "direct",
                    vncOutputScope: "paradigm",
                });
                const directSentenceHash = ctx.buildEntradaUrlHash({
                    input: "(chōca)",
                    derivationType: "direct",
                    sentence: {
                        particle: "l3-auh-interjection",
                        particleHonorificized: true,
                        adverbial: "l3-oc",
                        polarity: "negative",
                        surface: "question",
                        introductoryParticle: "tlā",
                        prefaceParticle: "ye",
                        introductoryModifier: "tēl",
                        antecessive: true,
                    },
                });
                const directSentenceRoundTrip = ctx.parseEntradaUrlSegmentString(directSentenceHash);
                const nncExclamationHash = ctx.buildEntradaUrlHash({
                    input: "(a-c-ah)",
                    board: "ordinary-nnc",
                    sentence: { surface: "exclamation" },
                });
                const invalidSentenceParticle = ctx.parseEntradaUrlSegmentString("#classical/v1/verb/(chōca)/sentence-particle/l3-mec");
                const invalidSentenceAdverbial = ctx.parseEntradaUrlSegmentString("#classical/v1/verb/(chōca)/sentence-adverbial/l3-hui");
                const invalidSentenceHonorific = ctx.parseEntradaUrlSegmentString("#classical/v1/verb/(chōca)/sentence-particle/l3-anca/sentence-honorific/1");
                const legacyAdverbialPosition = ctx.parseEntradaUrlSegmentString("#classical/v1/verb/(chōca)/sentence-adverbial/l3-oc/sentence-adverbial-position/after-clause");
                const malformedCapsule = ctx.parseEntradaUrlSegmentString("#classical/v1/derivation/causative/v/zz.42.bad.11.42");
                const unknownDerivation = ctx.parseEntradaUrlSegmentString("#classical/v1/derivation/fabricated/v/11.42");
                return {
                    resultSegment: resultHash.includes("/screen/output"),
                    resultPanel: ctx.parseEntradaUrlSegmentString(resultHash)?.panel || "",
                    authoritySegment: authorityHash.includes("/screen/formula"),
                    authorityPanel: ctx.parseEntradaUrlSegmentString(authorityHash)?.panel || "",
                    obsoleteVersionRejected: legacySnapshot === null,
                    causativeSegment: causativeHash.includes("/derivation/causative"),
                    causativeType: ctx.parseEntradaUrlSegmentString(causativeHash)?.derivationType || "",
                    applicativeSegment: applicativeHash.includes("/derivation/applicative"),
                    applicativeType: ctx.parseEntradaUrlSegmentString(applicativeHash)?.derivationType || "",
                    applicativeCapsuleIsCompact: applicativeHash.includes("/v/11.42.52.62.82.91.b4.e1.n1.s1")
                        && !applicativeHash.includes("classical-rule-logic"),
                    applicativeCapsuleRoundTrip: ctx.parseEntradaUrlSegmentString(applicativeHash)?.derivedVnc || "",
                    directOmitsStaleCapsule: !directWithStaleCapsule.includes("/v/"),
                    directParadigmSegment: directParadigm.includes("/vnc-output/paradigm"),
                    directParadigmRoundTrip: ctx.parseEntradaUrlSegmentString(directParadigm)?.vncOutputScope || "",
                    directSentenceUsesNamedSegments: directSentenceHash.includes("/sentence-particle/l3-auh-interjection")
                        && directSentenceHash.includes("/sentence-honorific/1")
                        && directSentenceHash.includes("/sentence-adverbial/l3-oc")
                        && !directSentenceHash.includes("/sentence-adverbial-position/")
                        && directSentenceHash.includes("/sentence-polarity/negative")
                        && directSentenceHash.includes("/sentence-type/question")
                        && directSentenceHash.includes("/sentence-antecessive/1")
                        && !directSentenceHash.includes("/v/"),
                    directSentenceRoundTrip: directSentenceRoundTrip?.sentence || null,
                    nncExclamationRoundTrip: ctx.parseEntradaUrlSegmentString(nncExclamationHash)?.sentence?.surface || "",
                    invalidSentenceParticleFailsClosed: invalidSentenceParticle?.sentence?.invalidFields || [],
                    invalidSentenceAdverbialFailsClosed: invalidSentenceAdverbial?.sentence?.invalidFields || [],
                    invalidSentenceHonorificFailsClosed: invalidSentenceHonorific?.sentence?.invalidFields || [],
                    legacyAdverbialPositionIgnored: legacyAdverbialPosition?.sentence?.adverbial === "l3-oc"
                        && !Object.prototype.hasOwnProperty.call(legacyAdverbialPosition?.sentence || {}, "adverbialPosition"),
                    malformedCapsuleFailsClosed: malformedCapsule?.derivedVnc || "",
                    unknownDerivationType: unknownDerivation?.derivationType || "",
                    unknownDerivationStatus: unknownDerivation?.derivationTypeValidationFrame?.authorizationStatus || "",
                    unknownDerivationReason: unknownDerivation?.derivationTypeValidationFrame?.blockReason || "",
                    unknownDerivationCannotApply: composer.includes('normalized.derivationTypeValidationFrame?.authorizationStatus === "blocked"')
                        && composer.includes("return false;"),
                    restoreUsesPanelSetter: composer.includes('targetObject.setLeftPanelStackMode(normalized.panel)'),
                    restoreUsesDerivationSetter: composer.includes('targetObject.setActiveDerivationType(normalized.derivationType)'),
                    restoreRebuildsDynamicChoices: composer.includes("function applyEntradaUrlDerivedVncStateToControls")
                        && composer.includes("for (let pass = 0; pass < 5; pass += 1)")
                        && composer.includes("targetObject.renderClassicalRuleLogicSurfaceBlock();"),
                    restoredVncFinalizesResult: composer.includes('if (normalized.input && typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function")')
                        && !composer.includes('if (normalized.ordinaryNnc.enabled === true && typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function")'),
                    derivedControlChangesSyncImmediately: composer.includes('["causative", "applicative"].includes(derivationType)')
                        && composer.includes("syncEntradaUrlSegmentsFromCurrentState({\n          replace: true\n        });"),
                    derivationClicksSyncImmediately: composer.includes('(event?.type === "click" || event?.type === "change" || event?.type === "input") && isEntradaUrlImmediateSyncEventTarget(target)')
                        && composer.includes('target.closest("[data-derivation-type]")')
                        && composer.includes('syncEntradaUrlSegmentsFromCurrentState({\n            replace: true\n          });'),
                    resultScopeChangesSyncImmediately: composer.includes('target.closest("[data-classical-result-scope-control]")')
                        && composer.includes('#container-inputs, #classical-authority-panel, #classical-result-panel'),
                    resultScopeChangesRefreshImmediately: composer.includes("function scheduleClassicalResultScopeRefresh()")
                        && composer.includes("ClassicalResultScopeRefreshTimer = targetObject.window.setTimeout(() =>")
                        && composer.includes("scheduleClassicalResultScopeRefresh();"),
                    derivedSelectionsCapturedBeforeRerender: composer.includes('target.closest("[data-classical-rule-logic-control]")')
                        && composer.includes('targetObject.document.addEventListener("input", handleEntradaMutation, true)')
                        && composer.includes('targetObject.document.addEventListener("change", handleEntradaMutation, true)'),
                    panelChangesSyncUrl: composer.includes('addEventListener("app:panel-stack-changed", queueEntradaUrlSegmentSync)'),
                };
            })()
            : "composer-runtime-not-loaded",
        {
            resultSegment: true,
            resultPanel: "output",
            authoritySegment: true,
            authorityPanel: "formula",
            obsoleteVersionRejected: true,
            causativeSegment: true,
            causativeType: "causative",
            applicativeSegment: true,
            applicativeType: "applicative",
            applicativeCapsuleIsCompact: true,
            applicativeCapsuleRoundTrip: "11.42.52.62.82.91.b4.e1.n1.s1",
            directOmitsStaleCapsule: true,
            directParadigmSegment: true,
            directParadigmRoundTrip: "paradigm",
            directSentenceUsesNamedSegments: true,
            directSentenceRoundTrip: {
                combination: "none",
                particle: "l3-auh-interjection",
                particleHonorificized: true,
                adverbial: "l3-oc",
                polarity: "negative",
                surface: "question",
                introductoryParticle: "tlā",
                prefaceParticle: "ye",
                introductoryModifier: "tēl",
                antecessive: true,
                invalidFields: [],
            },
            nncExclamationRoundTrip: "exclamation",
            invalidSentenceParticleFailsClosed: ["particle"],
            invalidSentenceAdverbialFailsClosed: ["adverbial"],
            invalidSentenceHonorificFailsClosed: ["particleHonorificized"],
            legacyAdverbialPositionIgnored: true,
            malformedCapsuleFailsClosed: "11.42",
            unknownDerivationType: "",
            unknownDerivationStatus: "blocked",
            unknownDerivationReason: "classical-vnc-derivation-type-not-recognized",
            unknownDerivationCannotApply: true,
            restoreUsesPanelSetter: true,
            restoreUsesDerivationSetter: true,
                    restoreRebuildsDynamicChoices: true,
                    restoredVncFinalizesResult: true,
            derivedControlChangesSyncImmediately: true,
            derivationClicksSyncImmediately: true,
                    resultScopeChangesSyncImmediately: true,
                    resultScopeChangesRefreshImmediately: true,
            derivedSelectionsCapturedBeforeRerender: true,
            panelChangesSyncUrl: true,
        }
    );
    s.ok(
        "ordinary NNC output is the canonical #3 Result with coordinated independent projections",
        rendering.includes('singleNncSection.className = "classical-rule-surface__single-nnc"')
            && rendering.includes('singleNncSection.setAttribute("aria-label", "Generated NNC form")')
            && rendering.includes('singleNncAnswerSurface.className = "classical-rule-surface__single-nnc-surface"')
            && rendering.includes("canonicalNncResult?.formulaProjection?.formulaRealization")
            && rendering.includes("canonicalNncResult?.writtenProjection?.surfaceRealization")
            && rendering.includes('authority: "issued-canonical-nnc-result"')
            && rendering.includes("formulaStringAuthority: false")
            && rendering.includes("surfaceStringAuthority: false")
            && !rendering.includes("renderOrdinaryNncConjugations")
            && !rendering.includes("tense-block--ordinary-nnc")
            && !css.includes(".tense-block--ordinary-nnc")
    );
    s.ok(
        "shared sustantivo renderer labels subject number connectors",
        (rendering.includes("const buildNominalNum1Num2SubLabel")
            && rendering.includes("resolveNominalNum1Num2Surface")
            && rendering.includes("appendNominalNum1Num2SubLabel"))
            || rendering.includes("buildNominalNum1Num2SubLabel")
            && rendering.includes("resolveNominalNum1Num2Surface")
            && rendering.includes('num1Num2')
            && rendering.includes('nominalClauseFrame?.subject?.numberConnector')
            && rendering.includes('return `conector ${connectorSurface || "Ø"}`;')
            && rendering.includes("appendNominalNum1Num2SubLabel(basePersonSub, num1Num2Label)")
    );
    s.eq(
        "shared renderer subject-number connector labels read LCM result frames before stale display fields",
        (() => {
            if (typeof ctx.resolveNominalNum1Num2Surface !== "function") {
                return {
                    framed: "rendering-runtime-not-loaded",
                    empty: "rendering-runtime-not-loaded",
                    stale: "rendering-runtime-not-loaded",
                };
            }
            const framedConnector = {
                surface: "stale-connector",
                displaySurface: "stale-display",
                frames: null,
            };
            const emptyConnector = {
                surface: "stale-connector",
                displaySurface: "stale-display",
                frames: null,
            };
            return {
                framed: ctx.resolveNominalNum1Num2Surface(framedConnector, "fallback-connector"),
                empty: ctx.resolveNominalNum1Num2Surface(emptyConnector, "fallback-connector"),
                stale: ctx.resolveNominalNum1Num2Surface({
                    surface: "stale-connector",
                    displaySurface: "stale-display",
                }, "fallback-connector"),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                framed: "",
                empty: "",
                stale: "",
            }
            : {
                framed: "rendering-runtime-not-loaded",
                empty: "rendering-runtime-not-loaded",
                stale: "rendering-runtime-not-loaded",
            }
    );
    s.eq(
        "generated output chips read canonical VNC records before lying formulaEcho result and frame surfaces",
        (() => {
            if (
                typeof ctx.buildGeneratedOutputSlotChips !== "function"
                || typeof ctx.getConjugationSurfaceForms !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "hostile-ui-canonical-vnc-formula",
                unit: "VNC",
                formula: "#0-0+ki-0(mak)0+0-0#",
                formulaSlots: {
                    pers1Pers2: { displayPrefix: "Ø", prefix: "", displayCase: "Ø", case: "", slot: "pers1-pers2" },
                    obj1: { displayPrefix: "ki-0", prefix: "ki-0", slot: "obj1" },
                    predicateStem: { displayStem: "(mak)", stem: "mak", slot: "STEM" },
                    tensePosition: { label: "Ø", tenseValue: "Ø", slot: "tiempo" },
                    num1Num2: { displayConnector: "0-0", connector: "", slot: "num1-num2" },
                },
                routeContract: { routeFamily: "hostile-ui-canonical-vnc" },
                sourceFrame: { label: "structured VNC source" },
            });
            const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                formulaRecord,
                segmentFrames: [
                    { slot: "obj1", formulaValue: "ki-0", surface: "ki" },
                    { slot: "predicateStem", formulaValue: "mak", surface: "mak" },
                ],
                surfaceForms: ["kimak"],
            });
            const resultFrame = {
                ...(ctx.buildGrammarResultFrame
                    ? ctx.buildGrammarResultFrame({ ok: true, formulaRecord, formulaRealizationRecord: realizationRecord })
                    : {}),
                surface: "frame-lie",
                surfaceForms: ["frame-lie / frame-alt-lie"],
                formulaSurfacePairs: [{ surface: "pair-lie", targetFormulaEcho: "#PAIR-LIE#" }],
                formulaRecord,
                formulaRecords: [formulaRecord],
                formulaRealizationRecord: realizationRecord,
                formulaRealizationRecords: [realizationRecord],
            };
            const hostile = {
                formulaEcho: "#ni-Ø+ta(BAD)fut+meh#",
                result: "result-lie / result-alt-lie",
                surface: "top-lie",
                surfaceForms: ["top-lie"],
                grammarFrame: null,
            };
            const chips = ctx.buildGeneratedOutputSlotChips(hostile);
            const valuesByKind = chips.reduce((map, chip) => {
                if (!map[chip.kind]) {
                    map[chip.kind] = chip.value;
                }
                return map;
            }, {});
            return {
                formula: valuesByKind.formula,
                obj1: valuesByKind.obj1,
                stem: valuesByKind.STEM,
                surface: valuesByKind.surface,
                surfaces: ctx.getConjugationSurfaceForms(hostile),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? { surfaces: [] }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "legacy VNC formulaEcho parser is quarantined from active slot inference",
        typeof ctx.parseGeneratedOutputVncFormulaEchoSlots,
        "undefined"
    );
    s.eq(
        "formula surface pair lookup does not use top-level result or surface strings as active selection",
        (() => {
            if (
                typeof ctx.getFormulaSurfacePairForGeneratedOutput !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaA = ctx.buildGrammarFormulaRecord({
                id: "pair-a-formula",
                unit: "VNC",
                formula: "#0-0(a)0+0-0#",
                formulaSlots: { predicateStem: { stem: "a", slot: "STEM" } },
            });
            const formulaB = ctx.buildGrammarFormulaRecord({
                id: "pair-b-formula",
                unit: "VNC",
                formula: "#0-0(b)0+0-0#",
                formulaSlots: { predicateStem: { stem: "b", slot: "STEM" } },
            });
            const realizationA = ctx.buildGrammarFormulaRealizationRecord({
                id: "pair-a-realization",
                formulaRecord: formulaA,
                segmentFrames: [{ slot: "STEM", formulaValue: "a", surface: "canonical-a" }],
                surfaceForms: ["canonical-a"],
            });
            const realizationB = ctx.buildGrammarFormulaRealizationRecord({
                id: "pair-b-realization",
                formulaRecord: formulaB,
                segmentFrames: [{ slot: "STEM", formulaValue: "b", surface: "canonical-b" }],
                surfaceForms: ["canonical-b"],
            });
            const hostile = {
                result: "canonical-b / stale-result",
                surface: "canonical-b",
                surfaceForms: ["canonical-b"],
                grammarFrame: null,
            };
            return {
                defaultSurface: ctx.getFormulaSurfacePairForGeneratedOutput(hostile)?.surface || "",
                explicitSurface: ctx.getFormulaSurfacePairForGeneratedOutput(hostile, "canonical-b")?.surface || "",
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                defaultSurface: "",
                explicitSurface: "",
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "visible CNV formula helpers read canonical records before lying formulaEcho and stale surfaces",
        (() => {
            if (
                typeof ctx.formatVisibleCnvFormulaEcho !== "function"
                || typeof ctx.buildVisibleCnvFormulaEchoChips !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "visible-cnv-formula-record",
                unit: "VNC",
                formula: "#0-0+ki-0(mak)0+0-0#",
                formulaSlots: {
                    obj1: { displayPrefix: "ki-0", prefix: "ki-0", slot: "obj1" },
                    predicateStem: { displayStem: "(mak)", stem: "mak", slot: "STEM" },
                },
                routeContract: { routeFamily: "hostile-visible-cnv" },
                sourceFrame: { label: "structured visible CNV source" },
            });
            const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "visible-cnv-realization-record",
                formulaRecord,
                segmentFrames: [
                    { slot: "obj1", formulaValue: "ki-0", surface: "ki" },
                    { slot: "predicateStem", formulaValue: "mak", surface: "mak" },
                ],
                surfaceForms: ["kimak"],
            });
            const resultFrame = {
                ...ctx.buildGrammarResultFrame({
                    ok: true,
                    formulaRecord,
                    formulaRealizationRecord: realizationRecord,
                }),
                surface: "frame-visible-lie",
                surfaceForms: ["frame-visible-lie / frame-visible-alt-lie"],
                formulaRecord,
                formulaRecords: [formulaRecord],
                formulaRealizationRecord: realizationRecord,
                formulaRealizationRecords: [realizationRecord],
            };
            const hostile = {
                formulaEcho: "#ni-0+ta(BAD)fut+meh#",
                result: "result-visible-lie / result-visible-alt-lie",
                surface: "top-visible-lie",
                surfaceForms: ["top-visible-lie"],
                grammarFrame: null,
            };
            const chips = ctx.buildVisibleCnvFormulaEchoChips(hostile.formulaEcho, hostile);
            return {
                formatted: ctx.formatVisibleCnvFormulaEcho(hostile.formulaEcho, hostile),
                chipValues: chips.map((entry) => entry.value),
                chipSurfaces: chips.map((entry) => entry.surface),
                hasBadFormula: chips.some((entry) => String(entry.value || "").includes("BAD")),
                hasStaleSurface: chips.some((entry) => /lie/.test(String(entry.surface || ""))),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                formatted: "",
                chipValues: [],
                chipSurfaces: [],
                hasBadFormula: false,
                hasStaleSurface: false,
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "generated output chips read canonical NNC records before lying formulaEcho result and frame surfaces",
        (() => {
            if (
                typeof ctx.buildGeneratedOutputSlotChips !== "function"
                || typeof ctx.getConjugationSurfaceForms !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                unit: "NNC",
                formula: "#Ø-Ø(kal)Ø-Ø#",
                formulaSlots: {
                    pers1Pers2: { displayPrefix: "Ø", prefix: "", displaySuffix: "Ø", suffix: "", slot: "pers1-pers2" },
                    predicateStem: { displayStem: "(kal)", stem: "kal", surface: "kal", state: "absolutive", slot: "STEM" },
                    num1Num2: { displayConnector: "Ø-Ø", connector: "", surface: "", slot: "num1-num2" },
                },
                routeContract: { routeFamily: "hostile-ui-canonical-nnc" },
                sourceFrame: { label: "structured NNC source" },
            });
            const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "kal", surface: "kal" },
                ],
                surfaceForms: ["kal"],
            });
            const resultFrame = {
                ...(ctx.buildGrammarResultFrame
                    ? ctx.buildGrammarResultFrame({ ok: true, formulaRecord, formulaRealizationRecord: realizationRecord })
                    : {}),
                surface: "frame-nnc-lie",
                surfaceForms: ["frame-nnc-lie / frame-nnc-alt-lie"],
                formulaSurfacePairs: [{ surface: "pair-nnc-lie", targetFormulaEcho: "#PAIR-NNC-LIE#" }],
                formulaRecord,
                formulaRecords: [formulaRecord],
                formulaRealizationRecord: realizationRecord,
                formulaRealizationRecords: [realizationRecord],
            };
            const hostile = {
                formulaEcho: "#ni-Ø+ta(BAD)fut+meh#",
                result: "result-nnc-lie / result-nnc-alt-lie",
                surface: "top-nnc-lie",
                surfaceForms: ["top-nnc-lie"],
                grammarFrame: null,
            };
            const chips = ctx.buildGeneratedOutputSlotChips(hostile);
            const valuesByKind = chips.reduce((map, chip) => {
                if (!map[chip.kind]) {
                    map[chip.kind] = chip.value;
                }
                return map;
            }, {});
            return {
                formula: valuesByKind.formula,
                stem: valuesByKind.STEM,
                surface: valuesByKind.surface,
                surfaces: ctx.getConjugationSurfaceForms(hostile),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? { surfaces: [] }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.ok(
        "generated output panes render explicit no-output text instead of blank dash placeholders",
        typeof ctx.getConjugationNoOutputDisplay === "function"
            && typeof ctx.normalizeConjugationDisplayText === "function"
            && rendering.includes("Sin salidas en este grupo.")
            && state.includes("Sin antiderivada calculada.")
            && css.includes(".conjugation-value--no-output")
            && css.includes("border-left-width: 3px")
    );
    s.ok(
        "shared sustantivo renderer exposes verb-derived nominalization metadata",
        (rendering.includes("function buildVerbDerivedNominalizationProfileSubLabels")
            && rendering.includes("function appendVerbDerivedNominalizationProfileSubLabels")
            && rendering.includes("operationalSuboperationFrame"))
            || rendering.includes("buildVerbDerivedNominalizationProfileSubLabels")
            && rendering.includes('profile.outputKind !== "verb-derived-nominal"')
            && rendering.includes("appendVerbDerivedNominalizationProfileSubLabels")
            && rendering.includes("getNominalizationSourceUnitLabel")
            && rendering.includes('NOMINALIZATION_SOURCE_UNITS.vncCoreStem')
            && rendering.includes('NOMINALIZATION_SOURCE_UNITS.vncPredicate')
            && rendering.includes("evaluation.result?.nominalizationProfile")
            && rendering.includes("ambito: salida estructural")
            && rendering.includes("profile.instrumentiveNote2Frame?.grammarSource")
            && rendering.includes("36.6 n.2: excepciones de estado")
            && rendering.includes("ANDREWS_RENDERING_TERMS.nominalization")
            && rendering.includes("rol nominal:")
            && rendering.includes("ANDREWS_RENDERING_TERMS.sourceVnc")
            && rendering.includes("familia patientiva:")
            && rendering.includes("ANDREWS_RENDERING_TERMS.patientiveSource")
            && rendering.includes("familias Andrews:")
            && rendering.includes("function getAndrewsCnvCnnNominalRenderingFrame")
            && rendering.includes("function applyAndrewsCnvCnnNominalRenderingDataset")
            && rendering.includes("function getAndrewsCnvCnnNominalRenderedSurface")
            && rendering.includes("operationalSuboperationFrame")
            && rendering.includes("dataset.andrewsCnvCnnNominalOperationId")
            && rendering.includes("dataset.andrewsCnvCnnNominalFormulaEcho")
            && rendering.includes("dataset.andrewsCnvCnnNominalSpellingAuthority")
            && rendering.includes("conjugation-rendering--andrews-cnv-cnn-nominal")
            && rendering.includes("Andrews CNV->CNN:")
            && rendering.includes("operacion Andrews:")
            && rendering.includes("salida por Andrews:")
            && rendering.includes("stage #3 output")
            && rendering.includes("taxonomía patientiva: parcial")
            && rendering.includes("función adjetival:")
            && rendering.includes("modificación: no modelada")
    );
    s.ok(
        "#3 salida renders dynamic slot chips from engine metadata",
        (rendering.includes("function buildGeneratedOutputSlotChips")
            && rendering.includes("if (!getConjugationResultFrame(result))")
            && rendering.includes("function renderGeneratedOutputSlotChips"))
            || rendering.includes("function buildGeneratedOutputSlotChips")
            && rendering.includes("function buildGeneratedOutputCompactSubLabel")
            && rendering.includes("function renderGeneratedOutputSlotChips")
            && rendering.includes("getGeneratedOutputShellSlots(result)")
            && rendering.includes("ANDREWS_RENDERING_TERMS")
            && rendering.includes("VNC formula")
            && rendering.includes("NNC formula")
            && rendering.includes("person1-person2")
            && rendering.includes("object 1")
            && rendering.includes("reflexive")
            && rendering.includes("stem")
            && rendering.includes("getGeneratedOutputCompactTenseValue")
            && rendering.includes('"presente-habitual": "pres-hab"')
            && rendering.includes('"condicional-perfecto": "cond-perf"')
            && rendering.includes('`${ANDREWS_RENDERING_TERMS.tiempo}: ${tenseValue}`')
            && rendering.includes("person1-person2")
            && rendering.includes("number1-number2")
            && rendering.includes("surfaceOutput: \"output\"")
            && rendering.includes("getConjugationSurfaceForms(result)")
            && rendering.includes("stage #3 output")
            && rendering.includes("patientive procedures")
            && rendering.includes("renderGeneratedOutputSlotChips(personSub, evaluation.result)")
            && rendering.includes("renderGeneratedOutputSlotChips(personSub, result)")
            && css.includes(".person-sub__slot-strip")
            && css.includes(".person-sub__compact-text")
            && css.includes(".person-sub__slot-chip--formula")
            && css.includes(".person-sub__slot-chip--surface")
            && css.includes(".person-sub__slot-chip--reflexivo")
            && css.includes(".person-sub__slot-chip--patientive")
            && css.includes(".person-sub__slot-chip--lesson2")
            && css.includes(".person-sub__slot-chip[data-detail]::after")
            && !css.includes(".person-sub__slot-chip--node")
            && !css.includes(".person-sub__slot-chip[data-route-graph-action]")
            && rendering.includes("chipEl.tabIndex = 0")
            && rendering.includes("container.dataset.fullSubLabel = fullSubLabel")
            && !rendering.includes("chipEl.dataset.routeGraph")
            && !rendering.includes("applyNawatLinkedGrammarPathSourceInput(graphAction)")
            && panels.includes("Andrews 46.3.1.a route builder")
            && panels.includes("builder.dataset.andrewsRouteBuilder")
            && panels.includes("andrews-route-browser__builder-next")
            && panels.includes("sourceEvidence.textContent")
            && panels.includes("actionRow.dataset.routeBoundary")
            && panels.includes("actionRow.dataset.absolutiveAllomorph")
            && panels.includes("actionRow.dataset.absolutiveAllomorphAppliesAfter")
            && panels.includes("actionRow.dataset.previousNonZeroSegment")
            && panels.includes("getActionAbsolutiveAllomorphLabel")
            && css.includes(".andrews-route-browser__builder--dedicated")
            && css.includes(".andrews-route-browser__builder-control")
            && rendering.includes("container.replaceChildren()")
    );
    s.ok(
        "#3 salida slot chips do not double-wrap framed VNC predicates",
        rendering.includes('return stem.includes("(") && stem.includes(")") ? stem : `(${stem})`;')
            && rendering.includes('value.textContent = chip.label ? ` ${chip.value}` : chip.value')
            && rendering.includes("if (chip.label)")
    );
    s.ok(
        "#3 salida LCM labels expose Lesson 2 sound-spelling frames",
        rendering.includes("soundSpellingFrames")
            && rendering.includes("soundSpellingFrame")
            && rendering.includes("Proceso L2")
            && rendering.includes("sourceSurface")
            && rendering.includes("targetCandidates")
            && rendering.includes("grammarSlot")
            && rendering.includes("spanishProcess")
            && rendering.includes("andrewsProcess")
            && rendering.includes("getGeneratedOutputSoundSpellingFrames(result)")
            && rendering.includes("buildGeneratedOutputChipValue(frame)")
            && rendering.includes("allowEmptyLabel: true")
            && rendering.includes("chipEl.dataset.detail = chip.title")
    );
    s.ok(
        "reduplicated noun/adjective combination gates read LCM primary surfaces before stale result text",
        (typeof ctx.getPrimaryConjugationSurface === "function"
            && typeof ctx.getPanelConjugationRenderableSurface === "function")
            || rendering.includes("useReduplicatedSingularSurface && getPrimaryConjugationSurface(result)")
            && panels.includes("useReduplicatedSingularSurface && getPanelConjugationRenderableSurface(result)")
            && !rendering.includes("useReduplicatedSingularSurface && result?.result")
            && !panels.includes("useReduplicatedSingularSurface && result?.result")
    );
    s.ok(
        "shared adverbio renderer exposes Lesson 44 diagnostic metadata",
        rendering.includes("buildAdverbialNuclearFrameSubLabels")
            && rendering.includes("appendAdverbialNuclearFrameSubLabels")
            && rendering.includes("evaluation.result?.adverbialNuclearFrame")
            && rendering.includes("adverbial nuclear:")
            && rendering.includes("scope: inherited adverb")
    );
    s.ok(
        "shared Result renderer consumes the canonical relational Result without legacy boundary metadata",
        rendering.includes("renderClassicalRelationalNncSurfaceBlock")
            && rendering.includes(
                "targetObject.requestClassicalRelationalNncResult(request)"
            )
            && rendering.includes(
                'answer.dataset.classicalRelationalNncResult = authorized ? "authorized" : "blocked"'
            )
            && !rendering.includes(
                "buildRelationalNncBoundaryFrameSubLabels"
            )
            && !rendering.includes(
                "evaluation.result?.relationalNncBoundaryFrame"
            )
    );
    s.ok(
        "shared sustantivo renderer exposes place/gentilic boundary metadata without generation",
        rendering.includes("buildPlaceGentilicNncBoundaryFrameSubLabels")
            && rendering.includes("appendPlaceGentilicNncBoundaryFrameSubLabels")
            && rendering.includes("evaluation.result?.placeGentilicNncBoundaryFrame")
            && rendering.includes("Lugar/gentilicio:")
            && rendering.includes("Evidencia L/G: no confirmada")
    );
    s.ok(
        "shared noun/adverb renderer exposes adverbial adjunction boundary metadata without generation",
        rendering.includes("buildAdverbialAdjunctionBoundaryFrameSubLabels")
            && rendering.includes("appendAdverbialAdjunctionBoundaryFrameSubLabels")
            && rendering.includes("evaluation.result?.adverbialAdjunctionBoundaryFrame")
            && rendering.includes("Adjunción:")
            && rendering.includes("Evidencia adjunción: no confirmada")
    );
    const expectedVerbDerivedNominalizationLabels = [
        "ambito: salida estructural",
        "nominalization: adjetivo",
        "rol nominal: propiedad",
        "verbal source: pretérito perfecto simple",
        "función adjetival: predicado",
        "modificación: no modelada",
    ];
    s.eq(
        "shared sustantivo renderer builds nominalization metadata labels in rendering runtime",
        typeof ctx.buildVerbDerivedNominalizationProfileSubLabels === "function"
            ? ctx.buildVerbDerivedNominalizationProfileSubLabels({
                outputKind: "verb-derived-nominal",
                nominalKind: "adjetivo-preterito-tik",
                source: { sourceTense: "preterito" },
                role: {
                    nominalizationKind: "adjectival-surface",
                    semanticRole: "property",
                    patientiveFamily: "",
                    adjectivalFunction: "predicate-surface",
                },
                boundaries: {
                    nominalizationScope: "structural-word-output",
                    doesNotImplementLessons42_43: true,
                },
            }, { classicalLocaleContext: true })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? expectedVerbDerivedNominalizationLabels
            : ["rendering-runtime-not-loaded"]
    );
    const expectedPatientiveNominalizationLabels = [
        "ambito: salida estructural",
        "nominalization: patientivo",
        "rol nominal: paciente/resultado",
        "familia patientiva: perfectivo",
        "patientive source: tronco perfectivo activo",
        "familias Andrews: perfectivo activo",
        "etapa salida: #3 salida",
        "taxonomía patientiva: parcial",
    ];
    s.eq(
        "shared renderer shows patientive-family taxonomy labels as display-only metadata",
        typeof ctx.buildVerbDerivedNominalizationProfileSubLabels === "function"
            ? ctx.buildVerbDerivedNominalizationProfileSubLabels({
                outputKind: "verb-derived-nominal",
                nominalKind: "patientivo",
                source: { sourceTense: "" },
                role: {
                    nominalizationKind: "patientive",
                    semanticRole: "patient/result",
                    patientiveFamily: "perfectivo",
                    adjectivalFunction: "",
                },
                patientiveFamilyProfile: {
                    sourcePatternLabel: "tronco perfectivo activo",
                    sourceFamilyLabel: "perfectivo activo",
                    sourceStageModel: { slot: "#3 salida" },
                    isCompletePatientiveTaxonomy: false,
                },
                boundaries: {
                    nominalizationScope: "structural-word-output",
                    doesNotImplementLessons42_43: true,
                },
            }, { classicalLocaleContext: true })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? expectedPatientiveNominalizationLabels
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer labels potential-patient nominalization without invented capability wording",
        typeof ctx.buildVerbDerivedNominalizationProfileSubLabels === "function"
            ? ctx.buildVerbDerivedNominalizationProfileSubLabels({
                outputKind: "verb-derived-nominal",
                nominalKind: "potencial",
                source: { sourceTense: "futuro" },
                role: {
                    nominalizationKind: "potential-patient",
                    semanticRole: "potential-patient",
                    patientiveFamily: "",
                    adjectivalFunction: "",
                },
                boundaries: {
                    nominalizationScope: "structural-word-output",
                },
            }, { classicalLocaleContext: true })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "ambito: salida estructural",
                "nominalization: paciente potencial",
                "rol nominal: paciente potencial",
                "verbal source: futuro imperfecto",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats denominal route-family labels as display-only metadata",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vt-na",
                verbalizer: "-na",
                boundaries: {
                    noAndrewsSuffixContract: true,
                },
                isComplete_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: vt-na",
                "Verbalizador denominal: -na",
                "Contrato Andrews: no confirmado",
                "Cobertura denominal: parcial",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats denominal Andrews coverage labels as display-only metadata",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vi-iwi",
                verbalizer: "-iwi",
                andrewsContractCoverage: {
                    unmodeledContractCount: 23,
                    targetUnmodeledContractCount: 0,
                    nawatOnlyRouteFamilies: ["vt-na"],
                },
                isComplete_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: vi-iwi",
                "Verbalizador denominal: -iwi",
                "Contratos Andrews pendientes: 23",
                "Cobertura denominal: parcial",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats Andrews NNC-to-VNC route target preview labels as display-only metadata",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vi-ti",
                verbalizer: "-ti",
                andrewsContractRoutePreview: {
                    routeCount: 31,
                    finiteRouteRequestCount: 13,
                    finiteRouteObjectPrefixRequiredCount: 3,
                    finiteRouteStemClassContractCount: 11,
                    finiteRouteSourceContextRequiredCount: 18,
                    finiteRouteSourceEvidenceRequiredCount: 18,
                    routeWarningCount: 1,
                    routeNoteCount: 20,
                    routes: [
                        { targetInputValue: "(pusukwi)" },
                        { targetInputValue: "(pusuk)-(ta)" },
                        { targetInputValue: "(pusuk)-(ia)" },
                        { targetInputValue: "(pusuk)-(wia)" },
                    ],
                },
                isComplete_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: intransitiva -ti",
                "Verbalizador denominal: -ti",
                "Objetivos Andrews nominales/verbales: 31",
                "Solicitudes verbales Andrews: 13 con tiempo explícito",
                "Solicitudes verbales Andrews con objeto: 3",
                "Clases verbales Andrews: 11",
                "Contextos Andrews pendientes: 18",
                "Avisos verbales Andrews: 1",
                "Notas verbales Andrews: 20",
                "Entradas verbales Andrews: (pusukwi), (pusuk)-(ta), (pusuk)-(ia)",
                "Cobertura denominal: parcial",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated i-hui/a-hui stages",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vi-iwi",
                verbalizer: "-iwi",
                andrewsContractRoutePreview: {
                    sourceEvidence: {
                        iHuiOrAHuiSource: true,
                        sourceCategory: "i-hui-a-hui-source",
                        sourceBaseStem: "pusuk",
                        boundaries: {
                            sourceEvidenceFromSelectedGeneratedStage: true,
                        },
                    },
                    routeCount: 31,
                    finiteRouteRequestCount: 14,
                    finiteRouteSourceContextRequiredCount: 17,
                    finiteRouteSourceEvidenceRequiredCount: 17,
                },
                isComplete_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: vi-iwi",
                "Verbalizador denominal: -iwi",
                "Fuente Andrews: i-hui/a-hui generada",
                "Base Andrews: pusuk",
                "Contexto: etapa generada",
                "Objetivos Andrews nominales/verbales: 31",
                "Solicitudes verbales Andrews: 14 con tiempo explícito",
                "Contextos Andrews pendientes: 17",
                "Cobertura denominal: parcial",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated tla contract routes",
        typeof ctx.buildAndrewsDenominalSourceEvidenceSubLabels === "function"
            ? [
                ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                    tlaCausativeSource: true,
                    sourceCategory: "causative-tla",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
                ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                    tlaIntransitiveSource: true,
                    sourceCategory: "intransitive-tla",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
                ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                    intransitiveOaSource: true,
                    sourceCategory: "intransitive-o-a",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
            ]
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                [
                    "Fuente Andrews: tla causativa generada",
                    "Base Andrews: pusuk",
                    "Contexto: ruta Andrews",
                ],
                [
                    "Fuente Andrews: tla intransitiva generada",
                    "Base Andrews: pusuk",
                    "Contexto: ruta Andrews",
                ],
                [
                    "Fuente Andrews: o-a intransitiva generada",
                    "Base Andrews: pusuk",
                    "Contexto: ruta Andrews",
                ],
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks explicit Andrews temporal, adverbial, and relational source classifications",
        typeof ctx.buildAndrewsDenominalSourceEvidenceSubLabels === "function"
            ? [
                ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                    temporalCompoundSource: true,
                    sourceCategory: "compound-temporal-nounstem",
                    sourceBaseStem: "cēilhui",
                    timeSegmentMatrix: "ilhui",
                    numeralEmbed: "cē",
                    boundaries: {
                        sourceEvidenceFromExplicitSourceClassification: true,
                    },
                }),
                ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                    adverbialSource: true,
                    sourceCategory: "adverbial-nounstem",
                    sourceBaseStem: "achpa",
                    boundaries: {
                        sourceEvidenceFromExplicitSourceClassification: true,
                    },
                }),
                ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                    relationalCompoundSource: true,
                    sourceCategory: "compound-relational-nounstem",
                    sourceBaseStem: "calpan",
                    boundaries: {
                        sourceEvidenceFromExplicitSourceClassification: true,
                    },
                }),
            ]
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                [
                    "Fuente Andrews: compuesto temporal",
                    "Base Andrews: cēilhui",
                    "Matriz temporal: ilhui",
                    "Numeral embed: cē",
                    "Contexto: fuente clasificada",
                ],
                [
                    "Fuente Andrews: tronco adverbial",
                    "Base Andrews: achpa",
                    "Contexto: fuente clasificada",
                ],
                [
                    "Fuente Andrews: relacional",
                    "Base Andrews: calpan",
                    "Contexto: fuente clasificada",
                ],
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated possessive NNC outputs",
        typeof ctx.buildAndrewsDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                possessiveState: true,
                sourceCategory: "possessive-state-nnc-predicate",
                sourceSurface: "nocal",
                sourceBaseStem: "cal",
                sourcePossessorPrefix: "no",
                boundaries: {
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: cláusula nominal posesiva generada",
                "Base Andrews: cal",
                "Fuente generada: nocal",
                "poseedor fuente: no",
                "Evidencia: salida nominal",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated ti verbstem routes",
        typeof ctx.buildAndrewsDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                tiSource: true,
                sourceCategory: "inceptive-stative-ti-source",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukti",
                boundaries: {
                    sourceEvidenceFromAndrewsContractRoute: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: ti intransitiva generada",
                "Base Andrews: pusuk",
                "Contexto: ruta Andrews",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated hui and ya verbstem routes",
        typeof ctx.buildAndrewsDenominalSourceEvidenceSubLabels === "function"
            ? [
                ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                    huiSource: true,
                    sourceCategory: "inceptive-stative-hui-source",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
                ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                    yaSource: true,
                    sourceCategory: "inceptive-stative-ya-source",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
            ]
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                [
                    "Fuente Andrews: hui intransitiva generada",
                    "Base Andrews: pusuk",
                    "Contexto: ruta Andrews",
                ],
                [
                    "Fuente Andrews: ya intransitiva generada",
                    "Base Andrews: pusuk",
                    "Contexto: ruta Andrews",
                ],
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated ordinary NNC predicate stems",
        typeof ctx.buildAndrewsDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                possessionTiSource: true,
                sourceCategory: "ordinary-nnc-predicate-nounstem",
                sourceSurface: "xōchitl",
                sourceBaseStem: "xōchi",
                boundaries: {
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: tronco nominal generado",
                "Base Andrews: xōchi",
                "Fuente generada: xōchitl",
                "Evidencia: salida nominal",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated absolutive NNC outputs",
        typeof ctx.buildAndrewsDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                inceptiveTiSource: true,
                sourceCategory: "absolutive-state-nnc-predicate",
                sourceSurface: "xōchitl",
                sourceBaseStem: "xōchi",
                boundaries: {
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: cláusula nominal absolutiva generada",
                "Base Andrews: xōchi",
                "Fuente generada: xōchitl",
                "Evidencia: salida nominal",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated NNC nounstems downgraded to root rank",
        typeof ctx.buildAndrewsDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildAndrewsDenominalSourceEvidenceSubLabels({
                rootPlusYaSource: true,
                sourceCategory: "nounstem-as-root",
                sourceSurface: "xōchitl",
                sourceBaseStem: "xōchi",
                boundaries: {
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: cláusula nominal en rango raíz",
                "Base Andrews: xōchi",
                "Fuente generada: xōchitl",
                "Evidencia: salida nominal",
            ]
            : ["rendering-runtime-not-loaded"]
    );


    s.eq(
        "shared renderer formats diagnostic nuclear clause labels in rendering runtime",
        typeof ctx.buildNuclearClauseShellSubLabels === "function"
            ? ctx.buildNuclearClauseShellSubLabels({
                kind: "nuclear-clause-shell",
                formulaType: "VNC",
                displayLabel: "cláusula nuclear verbal (CNV)",
                formula: "#pers1-pers2+obj1-obj2-obj3-reflexivo(STEM)tiempo+num1-num2#",
                formulaEcho: "#ni-Ø+ki(nemi)Ø+Ø-Ø#",
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["verbal clause: #pers1-pers2+obj1-obj2-obj3-reflexivo(stem)tense+num1-num2#"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "visible Andrews formula renderer uses the approved compact English formula only in formula text",
        typeof ctx.formatVisibleAndrewsFormula === "function"
            ? [
                ctx.formatVisibleAndrewsFormula("#pers1-pers2(STEM)tns+num1-num2#"),
                ctx.formatVisibleAndrewsFormula("#persona1-persona2(STEM)tense+número1-número2#"),
                ctx.formatVisibleAndrewsFormula("#pers1-pers2+st1-st2(STEM)num1-num2#"),
            ]
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "#pers1-pers2(stem)tns+num1-num2#",
                "#person1-person2(stem)tense+number1-number2#",
                "#pers1-pers2+st1-st2(stem)num1-num2#",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "visible CNV formula renderer aligns formula chips to surface-line variants",
        typeof ctx.formatVisibleCnvFormulaEcho === "function" && typeof ctx.buildGeneratedOutputSlotChips === "function"
            ? (() => {
                const result = {
                    nuclearClauseShell: {
                        kind: "nuclear-clause-shell",
                        formulaType: "VNC",
                        displayLabel: "cláusula nuclear verbal (CNV)",
                        formula: "#pers1-pers2+val1-val2(STEM)tns+num1-num2#",
                        formulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0#",
                    },
                    cnvFormulaSurfacePath: {
                        surfaceStemRealizations: ["pish", "piya"],
                        surfaceNumberConnectorRealizations: ["ki-0", "k-0"],
                        pathsBySurface: [
                            {
                                surface: "pishki",
	                                paths: [
	                                    { formulaSlotKey: "pers1", formulaMorph: "Ø", surfaceValue: "" },
	                                    { formulaSlotKey: "pers2", formulaMorph: "Ø", surfaceValue: "" },
	                                    { formulaSlotKey: "va1", formulaMorph: "ki", surfaceValue: "ki", visibleLinearMorph: "ki-0" },
	                                    { formulaSlotKey: "va2", formulaMorph: "0", surfaceValue: "", visibleLinearMorph: "ki-0" },
	                                    { formulaSlotKey: "base", formulaMorph: "piya", surfaceValue: "pish" },
	                                    { formulaSlotKey: "tns", formulaMorph: "Ø", surfaceValue: "" },
	                                    { formulaSlotKey: "num1", formulaMorph: "ki", surfaceValue: "ki" },
	                                    { formulaSlotKey: "num2", formulaMorph: "0", surfaceValue: "" },
                                ],
                            },
                            {
                                surface: "piyak",
	                                paths: [
	                                    { formulaSlotKey: "pers1", formulaMorph: "Ø", surfaceValue: "" },
	                                    { formulaSlotKey: "pers2", formulaMorph: "Ø", surfaceValue: "" },
	                                    { formulaSlotKey: "va1", formulaMorph: "ki", surfaceValue: "ki", visibleLinearMorph: "ki-0" },
	                                    { formulaSlotKey: "va2", formulaMorph: "0", surfaceValue: "", visibleLinearMorph: "ki-0" },
	                                    { formulaSlotKey: "base", formulaMorph: "piya", surfaceValue: "piya" },
	                                    { formulaSlotKey: "tns", formulaMorph: "Ø", surfaceValue: "" },
	                                    { formulaSlotKey: "num1", formulaMorph: "k", surfaceValue: "k" },
	                                    { formulaSlotKey: "num2", formulaMorph: "0", surfaceValue: "" },
                                ],
                            },
                        ],
                    },
                };
                return {
                    formula: ctx.formatVisibleCnvFormulaEcho(result.nuclearClauseShell.formulaEcho, result),
                    shellLabels: ctx.buildNuclearClauseShellSubLabels(result.nuclearClauseShell, result),
                    formulaChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "formula")
                        .map((chip) => ({
                            label: chip.label,
                            value: chip.value,
                            title: chip.title,
                            surfacePriority: chip.surfaceFrame?.sourcePriority || "",
                            pathModel: chip.surfaceFrame?.pathModel || "",
                            surfaceForms: chip.surfaceFrame?.surfaceForms || [],
                        })),
                    slotChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => ["pers1-pers2", "STEM", "num1-num2"].includes(chip.kind))
                        .map((chip) => [chip.kind, chip.label, chip.value]),
                    surfaceChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "surface")
                        .map((chip) => [chip.label, chip.value]),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                formula: "",
                shellLabels: [
                    "verbal clause: #pers1-pers2+val1-val2(stem)tns+num1-num2#",
                ],
                formulaChips: [],
                slotChips: [],
                surfaceChips: [],
            }
	            : "rendering-runtime-not-loaded"
	    );
	    s.eq(
	        "visible CNV formula path alignment consumes typed path frames instead of formulaEcho or direct string API",
	        typeof ctx.formatVisibleCnvFormulaEcho === "function"
	            && typeof ctx.formatVisibleCnvFormulaEchoForPath === "function"
	            && typeof ctx.alignVisibleCnvFormulaEchoToSurface === "function"
	            && typeof ctx.buildVisibleCnvFormulaAlignmentSourceFrame === "function"
	            && typeof ctx.buildVisibleCnvFormulaAlignmentOperationFrame === "function"
	            ? (() => {
	                const record = {
	                    surface: "nikinhitak",
	                    paths: [
	                        { formulaSlotKey: "pers1", formulaMorph: "ni", surfaceValue: "ni" },
	                        { formulaSlotKey: "pers2", formulaMorph: "Ø", surfaceValue: "" },
	                        { formulaSlotKey: "va1", formulaMorph: "k", surfaceValue: "k", visibleLinearMorph: "k-in" },
	                        { formulaSlotKey: "va2", formulaMorph: "in", surfaceValue: "inh", visibleLinearMorph: "k-in" },
	                        { formulaSlotKey: "base", formulaMorph: "ita", surfaceValue: "ita" },
	                        { formulaSlotKey: "tns", formulaMorph: "Ø", surfaceValue: "" },
	                        { formulaSlotKey: "num1", formulaMorph: "k", surfaceValue: "k" },
	                        { formulaSlotKey: "num2", formulaMorph: "0", surfaceValue: "" },
	                    ],
	                };
	                const source = {
	                    result: "lying-result",
	                    surface: "lying-surface",
	                    surfaceForms: ["lying-surface"],
	                    nuclearClauseShell: {
	                        kind: "nuclear-clause-shell",
	                        formulaType: "VNC",
	                        formulaEcho: "#POISON-POISON+POISON(POISON)POISON+POISON-POISON#",
	                    },
	                    cnvFormulaSurfacePath: {
	                        pathsBySurface: [record],
	                    },
	                };
	                const sourceFrame = ctx.buildVisibleCnvFormulaAlignmentSourceFrame(record);
	                const operationFrame = ctx.buildVisibleCnvFormulaAlignmentOperationFrame(sourceFrame);
	                const contradictoryOperationFrame = {
	                    ...operationFrame,
	                    targetFrame: {
	                        ...operationFrame.targetFrame,
	                        formula: "#0-0(poison)0+0-0#",
	                    },
	                };
	                const changedDisplayRecord = {
	                    ...record,
	                    surface: "poisoned-display-surface",
	                };
	                return {
	                    formatted: ctx.formatVisibleCnvFormulaEcho(source.nuclearClauseShell.formulaEcho, source),
	                    directOldFormat: ctx.formatVisibleCnvFormulaEchoForPath(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        record
	                    ),
	                    directOldAlign: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        "nikinhitak",
	                        record
	                    ),
	                    typedAlign: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        "nikinhitak",
	                        record,
	                        sourceFrame,
	                        operationFrame
	                    ),
	                    changedDisplayAlign: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#poison#",
	                        "poisoned-display-surface",
	                        changedDisplayRecord,
	                        sourceFrame,
	                        operationFrame
	                    ),
	                    contradictoryTarget: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        "nikinhitak",
	                        record,
	                        sourceFrame,
	                        contradictoryOperationFrame
	                    ),
	                    missingSourceFrame: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        "nikinhitak",
	                        record,
	                        null,
	                        operationFrame
	                    ),
	                };
	            })()
	            : "rendering-runtime-not-loaded",
	        "rendering-runtime-not-loaded"
	    );
	    s.eq(
	        "visible CNV formula chip takes salida from the same LCM surface line as the row",
	        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.buildGrammarResultFrame === "function"
	            ? (() => {
                const result = {
                    nuclearClauseShell: {
                        kind: "nuclear-clause-shell",
                        formulaType: "VNC",
                        formulaEcho: "#ni-Ø+m-etz(mana)Ø+Ø-Ø#",
                    },
                    surfaceForms: ["stale-result-surface"],
                    cnvFormulaSurfacePath: {
                        pathsBySurface: [
                            {
                                surface: "stale-path-surface",
                                paths: [
                                    { formulaSlotKey: "base", formulaMorph: "mana", surfaceValue: "ana" },
                                ],
                            },
                        ],
                    },
                };
                result.grammarFrame = null;
                return ctx.buildGeneratedOutputSlotChips(result)
                    .filter((chip) => chip.kind === "formula" || chip.kind === "surface")
                    .map((chip) => [chip.kind, chip.value, chip.title || ""]);
            })()
            : "rendering-runtime-not-loaded",
        []
    );


    s.eq(
        "Lesson 46.3.1.a uses the canonical Source to Grammar to Result workflow",
        typeof ctx.requestClassicalRelationalNncResult === "function"
            ? (() => {
                const upstream = ctx.requestClassicalDeverbalNncResult({
                    constructionKind: "predicate-nominalization",
                    nominalizationKind: "preterit-agentive",
                    source: {
                        sourceStage: "preterit-predicate",
                        sourceStem: "mich-namaca",
                        verbClass: "A",
                        sourceVoice: "active",
                        sourceValence: "intransitive",
                        sourceObjectPattern: "none",
                        sourceSubject: "3sg",
                    },
                    subject: "3sg",
                    state: "absolutive",
                });
                const result = ctx.requestClassicalRelationalNncResult({
                    nounstem: {
                        kind: "classical-nahuatl-nnc-nounstem-request",
                        stemId: "n-locative",
                        operation: "relational-nnc",
                        formation: "option-two",
                        sourceFormation: "preterit-agentive",
                        upstreamResult: upstream,
                    },
                    state: "absolutive",
                    subjectMode: "adverbialized",
                });
                return {
                    upstreamOperation: upstream.operationFrame?.operationId,
                    sourceOwner:
                        result.sourceFrame?.upstreamSourceCarrier
                            ?.ownerOperationId,
                    formula: result.formula,
                    surface: result.surface,
                    formulaDerivedFromWritten:
                        result.formulaDerivedFromWritten,
                    writtenDerivedFromFormula:
                        result.writtenDerivedFromFormula,
                    genericRoute:
                        typeof ctx.executeRelationalNncGenerationRoute,
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                upstreamOperation:
                    "predicate-nominalization:preterit-agentive",
                sourceOwner:
                    "predicate-nominalization:preterit-agentive",
                formula: "#Ø-Ø(mich-namaca-0-cā-n)Ø-Ø#",
                surface: "michnamacacān",
                formulaDerivedFromWritten: false,
                writtenDerivedFromFormula: false,
                genericRoute: "undefined",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer does not derive VNC slot chips from formula echo when slot objects are absent",
        typeof ctx.buildGeneratedOutputSlotChips === "function"
            ? ctx.buildGeneratedOutputSlotChips({
                nuclearClauseShell: {
                    kind: "nuclear-clause-shell",
                    formulaType: "VNC",
                    formulaEcho: "#Ø-Ø+ki-(ilpia)Ø+Ø-t#",
                },
            }).map((chip) => [chip.kind, chip.label, chip.value])
            : ["rendering-runtime-not-loaded"],
        []
    );
    s.eq(
        "shared renderer keeps Lesson 2 candidate chips compact without treating candidates as deletion",
        typeof ctx.buildGeneratedOutputChipValue === "function"
            ? ctx.buildGeneratedOutputChipValue({
                sourceSurface: "-uh",
                target: "",
                targetCandidates: ["w", "uj", "j"],
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "-uh→w/uj/j"
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer formats diagnostic VNC verbstem class labels",
        typeof ctx.buildVncVerbstemClassProfileSubLabels === "function"
            ? ctx.buildVncVerbstemClassProfileSubLabels({
                kind: "vnc-verbstem-class-profile",
                classKey: "C",
                ruleSummary: {
                    ruleLabel: "open syllable non-u ia/ua adds class C",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Clase de tronco: C", "Diagnóstico de tronco: open syllable non-u ia/ua adds class C"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats only typed VNC valency labels and ignores legacy display metadata",
        typeof ctx.buildVncValencyFrameSubLabels === "function"
            ? ctx.buildVncValencyFrameSubLabels({
                kind: "vnc-valency-frame",
                valencyLabel: "transitiva",
                obj1: { displayPrefix: "ki" },
                lesson6DirectNawatObject: {
                    visibleFormulaPrefix: "ki-0",
                    formulaPosition: "va1-va2",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["verbal valence: transitiva", "object 1 verbal: ki"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats derived voice frame labels",
        typeof ctx.buildDerivedVoiceFrameSubLabels === "function"
            ? ctx.buildDerivedVoiceFrameSubLabels({
                kind: "derived-voice-frame",
                voice: { label: "pasivo/impersonal" },
                valency: {
                    sourceValency: 2,
                    targetValency: 1,
                    baseObj1: "ki",
                    selectedObj1: "",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["voz derivada: pasivo/impersonal", "valencia derivada: 2->1", "objeto base: ki->Ø"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats forward derivation frame labels",
        typeof ctx.buildForwardDerivationFrameSubLabels === "function"
            ? ctx.buildForwardDerivationFrameSubLabels({
                kind: "forward-derivation-frame",
                derivation: { label: "causativa" },
                valency: {
                    sourceValency: 1,
                    derivedValency: 2,
                },
                stem: { selectedStem: "nemtia" },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["derivación verbal: causativa", "valencia derivada: 1->2", "tronco derivado: nemtia"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats compound frame labels",
        typeof ctx.buildCompoundFrameSubLabels === "function"
            ? ctx.buildCompoundFrameSubLabels({
                kind: "compound-frame",
                matrix: { stem: "kwi" },
                embeds: [
                    { role: "outer-lexical", value: "xōchi" },
                ],
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["compuesto verbal: kwi", "incrustado: outer-lexical xōchi"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats adverbial nuclear frame labels",
        typeof ctx.buildAdverbialNuclearFrameSubLabels === "function"
            ? ctx.buildAdverbialNuclearFrameSubLabels({
                kind: "adverbial-nuclear-frame",
                adverbial: { label: "manera" },
                sourceVnc: {
                    stem: "mati",
                    valency: "transitive",
                },
                adverbialNuclearClauseFrame: {
                    adverbialization: {
                        degree: "first-degree",
                        semanticDomain: "manner",
                    },
                },
                boundaries: { configuredAdverbioSurfaceOnly: true },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "adverbial nuclear: manera",
                "verbal source: mati",
                "source valence: transitive",
                "degree: first-degree",
                "domain: manner",
                "scope: inherited adverb",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer does not expose the retired relational-candidate label path",
        typeof ctx.buildRelationalNncBoundaryFrameSubLabels,
        "undefined"
    );
    s.eq(
        "shared renderer formats place/gentilic boundary frame labels",
        typeof ctx.buildPlaceGentilicNncBoundaryFrameSubLabels === "function"
            ? ctx.buildPlaceGentilicNncBoundaryFrameSubLabels({
                kind: "place-gentilic-nnc-boundary-frame",
                statusLabel: "no confirmado",
                candidate: { kindLabel: "locativo-temporal generado" },
                boundaries: { locativeTemporalNominalIsEvidence: false },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Lugar/gentilicio: no confirmado",
                "Candidato L/G: locativo-temporal generado",
                "Evidencia L/G: no confirmada",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats adverbial adjunction boundary frame labels",
        typeof ctx.buildAdverbialAdjunctionBoundaryFrameSubLabels === "function"
            ? ctx.buildAdverbialAdjunctionBoundaryFrameSubLabels({
                kind: "adverbial-adjunction-boundary-frame",
                statusLabel: "no confirmada",
                candidate: { label: "locativo-temporal generado" },
                boundaries: { singleGeneratedWordIsEvidence: false },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Adjunción: no confirmada",
                "Unidad adjunta: locativo-temporal generado",
                "Evidencia adjunción: no confirmada",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer inverts LCM grammar frames into user-facing route labels",
        typeof ctx.buildGrammarFrameSubLabels === "function"
            ? ctx.buildGrammarFrameSubLabels(null)
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "dynamic visible renderer labels keep old Spanish LCM metadata out of English UI surfaces",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            && typeof ctx.buildGrammarFrameSubLabels === "function"
            && typeof ctx.buildNuclearClauseShellSubLabels === "function"
            && typeof ctx.buildGeneratedOutputSlotChips === "function"
            && typeof ctx.buildGrammarAuthorityFrame === "function"
            && typeof ctx.buildGrammarRouteContractFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            && typeof ctx.buildGrammarDiagnosticFrame === "function"
            ? (() => {
                const frameLabels =
                    ctx.buildGrammarFrameSubLabels(null);
                const shellLabels = ctx.buildNuclearClauseShellSubLabels({
                    kind: "nuclear-clause-shell",
                    formulaType: "VNC",
                    displayLabel: "cláusula nuclear verbal (CNV)",
                    formula: "#pers1-pers2(STEM)tns+num1-num2#",
                });
                const chipLabels = ctx.buildGeneratedOutputSlotChips({
                    nuclearClauseShell: {
                        kind: "nuclear-clause-shell",
                        formulaType: "VNC",
                        formulaEcho: "#Ø-Ø+ki-(ilpia)Ø+Ø-t#",
                    },
                }).flatMap((chip) => [chip.label, chip.value, chip.title].filter(Boolean));
                const bannedVisiblePattern = /Unidad y función|Fórmula CNV|Fórmula CNN|persona1-persona2|objeto\s+[123]|número1-número2|estado del predicado|solo diagnóstico|clasificar límite|marco de autoridad|comparación necesita evidencia|authorityFrame|resultFrame|routeContract|legacyNawatGate/i;
                return [...frameLabels, ...shellLabels, ...chipLabels]
                    .filter((label) => bannedVisiblePattern.test(String(label || "")));
            })()
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module" ? [] : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer labels Classical realization from LCM result-frame surface forms",
        typeof ctx.buildGrammarFrameSubLabels === "function"
            ? ctx.buildGrammarFrameSubLabels(null, {
                includeResult: false,
                includeRoute: false,
                includeAuthority: false,
                includeDiagnostics: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer suppresses orthography realization labels for empty LCM result frames",
        typeof ctx.buildGrammarFrameSubLabels === "function"
            ? ctx.buildGrammarFrameSubLabels(null, {
                includeResult: false,
                includeRoute: false,
                includeAuthority: false,
                includeDiagnostics: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer still labels Classical orthography-only realization when no result frame exists",
        typeof ctx.buildGrammarFrameSubLabels === "function"
            ? ctx.buildGrammarFrameSubLabels({
                routeContract: {},
                orthographyFrame: {
                    surface: "orthography-only-surface",
                    noClassicalSurfaceImport: true,
                },
            }, {
                includeResult: false,
                includeRoute: false,
                includeAuthority: false,
                includeDiagnostics: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer treats LCM result-frame surface forms as structured entries before stale result text",
        typeof ctx.getConjugationSurfaceForms === "function"
            ? ctx.getConjugationSurfaceForms({
                result: "stale-form",
                surface: "stale-surface",
                surfaceForms: ["stale-render-a / stale-render-b"],
                frames: null,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer stops at empty LCM result frames before stale result text",
        typeof ctx.getConjugationSurfaceForms === "function"
            ? ctx.getConjugationSurfaceForms({
                result: "stale-form",
                surface: "stale-surface",
                surfaceForms: ["stale-render-a / stale-render-b"],
                frames: null,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer does not let top-level surface hide surface-form variants",
        typeof ctx.getConjugationSurfaceForms === "function"
            ? ctx.getConjugationSurfaceForms({
                result: "stale-form",
                surface: "top-surface",
                surfaceForms: ["top-a / top-b"],
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer exposes the primary LCM result-frame surface to GCD consumers",
        typeof ctx.getPrimaryConjugationSurface === "function"
            ? ctx.getPrimaryConjugationSurface({
                result: "—",
                frames: null,
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ""
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer joins LCM result-frame surfaces for display values",
        typeof ctx.getConjugationDisplaySurface === "function"
            ? ctx.getConjugationDisplaySurface({
                result: "stale-form",
                surface: "stale-surface",
                frames: null,
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ""
            : "rendering-runtime-not-loaded"
    );
    s.ok(
        "view export rows preserve LCM route metadata instead of flattening to form text only",
        (exportUi.includes("function normalizeUnifiedVerbOutputGrammarMetadata")
            && exportUi.includes("function projectUnifiedVerbOutputVisibleRow")
            && exportUi.includes("getUnifiedVerbOutputGrammarFrame"))
            || exportUi.includes("function normalizeUnifiedVerbOutputGrammarMetadata")
            && exportUi.includes("function getUnifiedVerbOutputGrammarDatasetMetadata")
            && exportUi.includes("function projectUnifiedVerbOutputVisibleRow")
            && exportUi.includes('"ruta de contrato"')
            && exportUi.includes("row.grammarRouteFamily")
            && exportUi.includes("row.grammarDiagnosticLayer")
            && rendering.includes("applyGrammarFrameRouteDataset(row, evaluation.result)")
            && rendering.includes("getUnifiedVerbOutputGrammarDatasetMetadata(row.dataset)")
            && rendering.includes("grammarMetadata = {}")
    );
    s.ok(
        "nonactive structured export rows carry row grammar metadata",
        (rendering.includes("buildOutputRowEntry: ({")
            && rendering.includes("grammarFrame")
            && rendering.includes("appendBlockOutputRow"))
            || rendering.includes("buildOutputRowEntry: ({ person, personSub, form, slotValuesById, grammarMetadata })")
            && rendering.includes("appendBlockOutputRow({ person, personSub, form, slotValuesById, grammarMetadata })")
            && !rendering.includes("buildOutputRowEntry: ({ person, personSub, form, slotValuesById })")
    );
    s.eq(
        "view export normalization rejects flattened route metadata without an owner-issued grammar frame",
        typeof ctx.normalizeUnifiedVerbOutputEntry === "function"
            ? (() => {
                const row = ctx.normalizeUnifiedVerbOutputEntry({
                    block: "Intransitivo",
                    person: "1sg",
                    form: "Ruta bloqueada antes de generar por la evidencia Andrews del contrato.",
                    grammarAuthorityRefs: "Andrews Lesson 5|Andrews Lesson 7",
                    grammarEvidenceStatus: "blocked",
                    grammarRouteFamily: "vnc",
                    grammarRouteStage: "execute",
                    grammarGenerationAllowed: false,
                    grammarDiagnosticStatus: "blocked",
                    grammarDiagnosticId: "ANDREWS_ROUTE_NOT_LICENSED",
                    grammarDiagnosticLayer: "route",
                    grammarDiagnosticContractLayer: "routeContract",
                    grammarResultOk: false,
                });
                return row;
            })()
            : "export-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? null
            : "export-runtime-not-loaded"
    );
    s.eq(
        "view export reads an owner-issued grammar frame and rejects stale form text without one",
        typeof ctx.normalizeUnifiedVerbOutputEntry === "function"
            ? (() => {
                const grammarFrame = getCanonicalVncTestGrammarFrame(ctx);
                const expectedForm =
                    ctx.getIssuedGrammarFrameCanonicalSurfaceForms(grammarFrame)
                        .join(" / ");
                const framed = ctx.normalizeUnifiedVerbOutputEntry({
                    block: "Intransitivo",
                    person: "1sg",
                    form: "stale export form",
                    grammarFrame,
                });
                const stale = ctx.normalizeUnifiedVerbOutputEntry({
                    block: "Intransitivo",
                    person: "1sg",
                    form: "stale export form",
                });
                return {
                    ownerIssued: ctx.isIssuedGrammarFrame(grammarFrame),
                    framedUsesCanonicalSurface: framed?.form === expectedForm,
                    stale,
                };
            })()
            : { runtime: "export-runtime-not-loaded" },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                ownerIssued: true,
                framedUsesCanonicalSurface: true,
                stale: null,
            }
            : { runtime: "export-runtime-not-loaded" }
    );
    s.eq(
        "view export CSV includes LCM route and diagnostic columns",
        typeof ctx.setUnifiedVerbOutputDatasetRows === "function"
            && typeof ctx.buildViewExportCSV === "function"
            && ctx.VerbUnifiedOutputState
            ? (() => {
                const previousState = {
                    rows: ctx.VerbUnifiedOutputState.rows,
                    bySourceKey: ctx.VerbUnifiedOutputState.bySourceKey,
                    grouped: ctx.VerbUnifiedOutputState.grouped,
                    updatedAt: ctx.VerbUnifiedOutputState.updatedAt,
                };
                try {
                    ctx.setUnifiedVerbOutputDatasetRows([{
                        tenseValue: "present",
                        groupKey: "universal",
                        inputValue: "ka",
                        sourceMode: ctx.COMBINED_MODE?.active || "active",
                        block: "Intransitivo",
                        person: "1sg",
                        form: "Ruta bloqueada antes de generar por la evidencia Andrews del contrato.",
                        grammarAuthorityRefs: "Andrews Lesson 5",
                        grammarEvidenceStatus: "blocked",
                        grammarRouteFamily: "vnc",
                        grammarRouteStage: "execute",
                        grammarGenerationAllowed: "false",
                        grammarDiagnosticStatus: "blocked",
                        grammarDiagnosticId: "ANDREWS_ROUTE_NOT_LICENSED",
                        grammarDiagnosticLayer: "route",
                        grammarDiagnosticContractLayer: "routeContract",
                        grammarResultOk: "false",
                    }], {
                        tenseValue: "present",
                        groupKey: "universal",
                    });
                    const csv = ctx.buildViewExportCSV();
                    return {
                        hasRouteHeader: csv.includes("ruta de contrato"),
                        hasGenerationHeader: csv.includes("generación de contrato"),
                        hasDiagnosticStatusHeader: csv.includes("estado diagnóstico de contrato"),
                        hasDiagnosticHeader: csv.includes("capa fallida"),
                        hasRowInputValue: csv.split(/\r?\n/)[1]?.startsWith("ka,") === true,
                        hasRouteValue: csv.includes("vnc,execute,false"),
                        hasDiagnosticValue: csv.includes("ANDREWS_ROUTE_NOT_LICENSED,route,routeContract,false"),
                    };
                } finally {
                    ctx.VerbUnifiedOutputState.rows = previousState.rows;
                    ctx.VerbUnifiedOutputState.bySourceKey = previousState.bySourceKey;
                    ctx.VerbUnifiedOutputState.grouped = previousState.grouped;
                    ctx.VerbUnifiedOutputState.updatedAt = previousState.updatedAt;
                }
            })()
            : {
                hasRouteHeader: false,
                hasGenerationHeader: false,
                hasDiagnosticStatusHeader: false,
                hasDiagnosticHeader: false,
                hasRowInputValue: false,
                hasRouteValue: false,
                hasDiagnosticValue: false,
            },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                hasRouteHeader: false,
                hasGenerationHeader: false,
                hasDiagnosticStatusHeader: false,
                hasDiagnosticHeader: false,
                hasRowInputValue: false,
                hasRouteValue: false,
                hasDiagnosticValue: false,
            }
            : {
                hasRouteHeader: false,
                hasGenerationHeader: false,
                hasDiagnosticStatusHeader: false,
                hasDiagnosticHeader: false,
                hasRowInputValue: false,
                hasRouteValue: false,
                hasDiagnosticValue: false,
            }
    );
    s.eq(
        "slot-strip view export uses only visible rendered slot strips",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            && typeof ctx.buildPersonSubSlotStripViewExportCSV === "function"
            ? (() => {
                const documentObject = ctx.document || {};
                const previousGetElementById = documentObject.getElementById;
                const makeTextNode = (text) => ({ textContent: text });
                const makeChip = ({ kind, label, value, detail = "" }) => ({
                    className: `person-sub__slot-chip person-sub__slot-chip--${kind}`,
                    textContent: `${label}: ${value}`,
                    dataset: detail ? { detail } : {},
                    title: "",
                    querySelector(selector) {
                        if (selector === ".person-sub__slot-chip-label") {
                            return makeTextNode(`${label}: `);
                        }
                        if (selector === ".person-sub__slot-chip-value") {
                            return makeTextNode(` ${value}`);
                        }
                        return null;
                    },
                    getAttribute() {
                        return "";
                    },
                    classList: {
                        contains() {
                            return false;
                        },
                    },
                });
                const block = {
                    querySelector(selector) {
                        return selector === ".tense-block__label" ? makeTextNode("Transitivo") : null;
                    },
                    getAttribute() {
                        return "";
                    },
                    classList: {
                        contains() {
                            return false;
                        },
                    },
                };
                const sourceColumn = {
                    dataset: { sourceMode: ctx.COMBINED_MODE?.active || "active" },
                    getAttribute() {
                        return "";
                    },
                    classList: {
                        contains() {
                            return false;
                        },
                    },
                };
                const makeRow = ({ hidden = false, form = "nikpalehuia", slotValue = "palehuia" } = {}) => {
                    const chips = [
                        makeChip({
                            kind: "formula",
                            label: "pers1-pers2",
                            value: "ni-Ø",
                            detail: "formula CNV",
                        }),
                        makeChip({
                            kind: "stem",
                            label: "STEM",
                            value: slotValue,
                            detail: "tronco dentro de parentesis",
                        }),
                    ];
                    const strip = {
                        className: "person-sub__slot-strip",
                        textContent: chips.map((chip) => chip.textContent).join(""),
                        querySelectorAll(selector) {
                            return selector === ".person-sub__slot-chip" ? chips : [];
                        },
                        getAttribute() {
                            return "";
                        },
                        classList: {
                            contains() {
                                return false;
                            },
                        },
                    };
                    const compact = makeTextNode("cláusula nuclear CNV");
                    const personSub = {
                        textContent: compact.textContent,
                        querySelector(selector) {
                            if (selector === ".person-sub__slot-strip") {
                                return strip;
                            }
                            if (selector === ".person-sub__compact-text") {
                                return compact;
                            }
                            return null;
                        },
                        getAttribute() {
                            return "";
                        },
                        classList: {
                            contains() {
                                return false;
                            },
                        },
                    };
                    strip.parentElement = personSub;
                    chips.forEach((chip) => {
                        chip.parentElement = strip;
                    });
                    const row = {
                        dataset: { exportInput: "palehuia" },
                        hidden,
                        querySelector(selector) {
                            if (selector === ".person-sub") {
                                return personSub;
                            }
                            if (selector === ".person-label") {
                                return makeTextNode("1sg");
                            }
                            if (selector === ".conjugation-value") {
                                return {
                                    dataset: { exportForm: form },
                                    querySelector() {
                                        return null;
                                    },
                                };
                            }
                            return null;
                        },
                        querySelectorAll() {
                            return [];
                        },
                        closest(selector) {
                            if (selector === ".tense-block") {
                                return block;
                            }
                            if (selector === ".tense-grid-source-column") {
                                return sourceColumn;
                            }
                            return null;
                        },
                        getAttribute(attribute) {
                            return attribute === "aria-hidden" && hidden ? "true" : "";
                        },
                        classList: {
                            contains() {
                                return false;
                            },
                        },
                    };
                    personSub.parentElement = row;
                    row.parentElement = block;
                    block.parentElement = sourceColumn;
                    return row;
                };
                const rows = [
                    makeRow(),
                    makeRow({ hidden: true, form: "hidden-form", slotValue: "hidden-slot" }),
                ];
                const container = {
                    querySelectorAll(selector) {
                        return selector === ".conjugation-row" ? rows : [];
                    },
                    getAttribute() {
                        return "";
                    },
                    classList: {
                        contains() {
                            return false;
                        },
                    },
                };
                sourceColumn.parentElement = container;
                documentObject.getElementById = (id) => {
                    if (id === "all-tense-conjugations") {
                        return container;
                    }
                    if (id === "verb") {
                        return { value: "palehuia" };
                    }
                    return null;
                };
                try {
                    const csv = ctx.buildPersonSubSlotStripViewExportCSV();
                    const lines = csv.split(/\r?\n/);
                    return {
                        lineCount: lines.length,
                        header: lines[0],
                        row: lines[1],
                        includesHidden: csv.includes("hidden-slot") || csv.includes("hidden-form"),
                    };
                } finally {
                    documentObject.getElementById = previousGetElementById;
                }
            })()
            : {
                lineCount: 0,
                header: "",
                row: "",
                includesHidden: true,
            },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                lineCount: 0,
                header: "",
                row: "",
                includesHidden: true,
            }
            : {
                lineCount: 0,
                header: "",
                row: "",
                includesHidden: true,
            }
    );
    s.eq(
        "view export reads the canonical row surface and ignores retired child renderers",
        ctx.__TEST_RUNTIME_MODE__ === "module" && typeof ctx.getVisibleConjugationValueExportText === "function"
            ? (() => {
                const row = {
                    querySelector(selector) {
                        if (selector !== ".conjugation-value") {
                            return null;
                        }
                        return {
                            dataset: {
                                exportForm: "nikpishki / nikpiyak",
                            },
                            cloneNode() {
                                throw new Error("canonical exportForm must bypass child renderers");
                            },
                        };
                    },
                };
                return ctx.getVisibleConjugationValueExportText(row);
            })()
            : "export-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "export-runtime-not-loaded"
            : "export-runtime-not-loaded"
    );
    s.ok(
        "nonactive verb rows pass Andrews subject slots through posicionesFormula",
        rendering.includes("posicionesFormula: {")
            && rendering.includes("pers1: subjectPers1")
            && rendering.includes("pers2: subjectPers2")
            && rendering.includes("num2: subjectPers2")
    );
    s.ok(
        "the retired documentary particle export adapter cannot bypass the canonical particle Result",
        !exportUi.includes("getParticleExportRowsFromDom")
            && !exportUi.includes("buildParticleViewExportCSV")
            && !exportUi.includes("andrews-seed")
            && !exportUi.includes("particle-candidate-empty")
            && typeof ctx.buildParticleViewExportCSV === "undefined"
    );
    s.ok(
        "panel visibility reader checks LCM framed surfaces before stale result text",
        panels.includes("function getPanelConjugationRenderableSurface")
            && panels.includes('if (!getPanelConjugationRenderableSurface(result))')
            && !panels.includes('if (!result || !result.result || result.result === "—")')
    );
    s.eq(
        "panel visibility accepts LCM result-frame surface when stale result is empty",
        typeof ctx.getPanelConjugationRenderableSurface === "function"
            && typeof ctx.isConjugationResultVisible === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? (() => {
                const result = {
                    result: "stale-panel-result",
                    surface: "top-panel-surface",
                    surfaceForms: ["stale-panel-a / stale-panel-b"],
                    frames: null,
                };
                return {
                    surface: ctx.getPanelConjugationRenderableSurface(result),
                    visible: ctx.isConjugationResultVisible({
                        result,
                        subjectPrefix: "ni",
                        subjectSuffix: "",
                        objectPrefix: "",
                        comboObjectPrefix: "",
                        enforceInvalidCombo: false,
                    }),
                };
            })()
            : { surface: "panels-runtime-not-loaded", visible: false },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? { surface: "", visible: false }
            : { surface: "panels-runtime-not-loaded", visible: false }
    );
    s.eq(
        "panel visibility accepts LCM result-frame surface forms when stale result is empty",
        typeof ctx.getPanelConjugationRenderableSurface === "function"
            && typeof ctx.isConjugationResultVisible === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? (() => {
                const result = {
                    result: "stale-panel-result",
                    surface: "top-panel-surface",
                    surfaceForms: ["stale-panel-a / stale-panel-b"],
                    frames: null,
                };
                return {
                    surface: ctx.getPanelConjugationRenderableSurface(result),
                    visible: ctx.isConjugationResultVisible({
                        result,
                        subjectPrefix: "ni",
                        subjectSuffix: "",
                        objectPrefix: "",
                        comboObjectPrefix: "",
                        enforceInvalidCombo: false,
                    }),
                };
            })()
            : { surface: "panels-runtime-not-loaded", visible: false },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? { surface: "", visible: false }
            : { surface: "panels-runtime-not-loaded", visible: false }
    );
    s.eq(
        "panel visibility suppresses stale aliases for empty result frames",
        typeof ctx.getPanelConjugationRenderableSurface === "function"
            && typeof ctx.isConjugationResultVisible === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? (() => {
                const result = {
                    result: "stale-panel-result",
                    surface: "top-panel-surface",
                    surfaceForms: ["stale-panel-a / stale-panel-b"],
                    frames: null,
                };
                return {
                    surface: ctx.getPanelConjugationRenderableSurface(result),
                    visible: ctx.isConjugationResultVisible({
                        result,
                        subjectPrefix: "ni",
                        subjectSuffix: "",
                        objectPrefix: "",
                        comboObjectPrefix: "",
                        enforceInvalidCombo: false,
                    }),
                };
            })()
            : { surface: "panels-runtime-not-loaded", visible: false },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? { surface: "", visible: false }
            : { surface: "panels-runtime-not-loaded", visible: false }
    );
    s.eq(
        "shared renderer formats opt-in sentence-layer labels",
        typeof ctx.buildSentenceLayerSubLabels === "function"
            ? ctx.buildSentenceLayerSubLabels({
                kind: "sentence-layer-metadata",
                slots: {
                    polarity: { value: "negative" },
                    question: { value: "yes-no" },
                    emphasis: { value: "focus" },
                    mood: { value: "command" },
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["rendering-runtime-not-loaded"]
            : ["rendering-runtime-not-loaded"]
    );
    s.ok(
        "curriculum map support is no longer mounted before #1 Entrada",
        !html.includes('id="book-map"')
            && curriculum.includes('book-map__architecture-note')
            && curriculum.includes('book-map__missing-category')
    );
    s.ok(
        "NNC and VNC Results expose Canvas diagrammatic projections without parsing linear formulas",
        rendering.includes('const nncDiagrammaticFrame = basalMeta.unit === "nnc"')
            && rendering.includes("canonicalNncResult?.typedSlotFrame || null")
            && rendering.includes('const vncDiagrammaticFrame = basalMeta.unit === "vnc"')
            && rendering.includes("buildClassicalVncChoicePendingDiagrammaticFrame(")
            && rendering.includes("requestClassicalVncDiagrammaticFrame(finalTypedVncSlotFrame)")
            && rendering.includes('projectionAuthority: "common-owner-issued-nonactive-choice-structure"')
            && rendering.includes('nuclearClauseDiagram.dataset.classicalNuclearClauseDiagramAuthority')
            && rendering.includes('linearFormatTitle.textContent = "Linear format"')
            && rendering.includes('nuclearClauseDiagramTitleText.textContent = "Diagrammatic format"')
            && rendering.includes('sentenceFormulaTitle.textContent = "Sentence formula"')
            && rendering.includes('sentenceSurfaceTitle.textContent = "Sentence surface"')
            && rendering.includes('linearFormat.className = "classical-rule-surface__format-section classical-rule-surface__linear"')
            && rendering.includes('nuclearClauseDiagram.className = "classical-rule-surface__format-section classical-rule-surface__diagram"')
            && rendering.includes('sentenceFormulaSection.className = "classical-rule-surface__format-section classical-rule-surface__format-section--sentence classical-rule-surface__sentence-formula-section"')
            && rendering.includes('sentenceSurfaceSection.className = "classical-rule-surface__format-section classical-rule-surface__format-section--sentence classical-rule-surface__sentence-surface-section"')
            && rendering.includes("function createClassicalResultSpecificitySwitch(")
            && rendering.includes("const resultSpecificitySwitch = createClassicalResultSpecificitySwitch(")
            && rendering.includes('const generalLinearFormula = surfaceFrame.diagrammaticFrame?.generalLinearFormula || ""')
            && rendering.includes('const typedSentenceFormulaDisplay = surfaceFrame.diagrammaticFrame')
            && rendering.includes('surfaceFrame.sentenceFormulaDisplay || ""')
            && rendering.includes('const generalDiagramRows = surfaceFrame.diagrammaticFrame?.generalRows || []')
            && rendering.includes('row.dataset.classicalNuclearClauseDiagramRole = diagramRow.role')
            && rendering.includes('const predicateGroupFrame = surfaceFrame.diagrammaticFrame?.predicateGroup || null')
            && rendering.includes('predicateGroup.dataset.classicalNuclearClauseDiagramGroup = predicateGroupFrame.role')
            && rendering.includes('predicateGroup.append(predicateMembers, predicateBrace, predicateRole)')
            && css.includes(".classical-rule-surface__diagram-row")
            && css.includes("grid-template-columns: minmax(max-content, 1fr) max-content")
            && css.includes(".classical-rule-surface__diagram-predicate-group")
            && css.includes(".classical-rule-surface__diagram-predicate-members")
            && css.includes(".classical-rule-surface__format-switch-option.is-active")
            && css.includes(".classical-rule-surface__format-section[hidden]")
            && css.includes("overflow-x: auto")
    );
    s.ok(
        "Classical #1 #2 #3 flow is compact, derivation-first, keeps five named VNC Grammar blocks, and stays answer-first",
        classicalShell.includes('data-classical-source-presentation="compact-typed-reading"')
            && classicalShell.indexOf('class="calc-operator calc-operator--derivation"')
                < classicalShell.indexOf('class="calc-operator calc-operator--classical-rule-logic"')
            && rendering.includes("function getClassicalVncAuthorityProgressivePresentation()")
            && rendering.includes('organizer.dataset.classicalVncAuthorityOrganizer = "progressive-typed-decisions"')
            && ["Subject", "Valence", "Verbstem", "Tense", "Sentence"].every(
                title => rendering.includes(`createPersistentSection("${title.toLowerCase()}", "${title}", "")`)
            )
            && rendering.includes('createControlGroup("function", "Function"')
            && rendering.includes('createControlGroup("sequence", "Sequence"')
            && rendering.includes('createControlGroup("dependent", "Dependent operation"')
            && rendering.includes("section.hidden = !vncActive || visibleControls === 0")
            && rendering.includes("function syncClassicalVncAuthorityDerivationPreview")
            && rendering.includes("function buildClassicalVncAuthorityDerivationSurfaceModel")
            && rendering.includes('"classical-vnc-authority-derivation-surface-model"')
            && rendering.includes("grammarAuthority: false")
            && rendering.includes('preview.dataset.classicalVncAuthorityPreview = "typed-application-projection"')
            && rendering.includes("getClassicalVncDerivationExplanationRenderableProjection(surfaceFrame.state?.vncApplicationFrame")
            && rendering.includes('account.dataset.classicalVncDerivationAccount = "source-operation-result"')
            && rendering.includes('appendAccountSegment("Source VNC"')
            && rendering.includes('appendAccountSegment(derivationType === "causative" ? "Causative" : "Applicative"')
            && rendering.includes('appendAccountSegment("Resulting VNC"')
            && rendering.includes('detailsSummary.textContent = "Grammar details"')
            && rendering.includes('details.dataset.classicalVncDerivationDetails = "read-only-typed-projection"')
            && !rendering.includes('createStage("source-vnc"')
            && !rendering.includes('classical-vnc-authority-preview__stage-flow')
            && rendering.includes('"Imported subject (causer)"')
            && rendering.includes('"Subject · preserved from Source VNC"')
            && rendering.includes("const resultValence = getClassicalRuleLogicControlDisplayValue")
            && rendering.includes("[sourceVoiceWrapper, sourceNonactiveWrapper].filter(Boolean)")
            && rendering.includes("[...sourceSubjectWrappers, resultSubjectWrapper].filter(Boolean)")
            && rendering.includes("[causeeValenceWrapper, applicativeObjectWrapper].filter(Boolean)")
            && rendering.includes("derivationSelectionRequired || derivationInventory.options.length > 1")
            && rendering.includes("preview.replaceChildren();")
            && rendering.includes('const displayValue = String(valueText ?? "").trim()')
            && !rendering.includes('valueText || "not available"')
            && !rendering.includes('"New derived subject"')
            && !rendering.includes('"Embedded subject"')
            && rendering.includes('block.dataset.classicalResultPresentationOrder = "generated-result-only"')
            && rendering.includes("...(clauseContinuationResult ? [clauseContinuationResult] : [])")
            && rendering.includes("syncClassicalSourceGrammarResultSurface(surfaceFrame, block)")
            && rendering.includes('targetObject.document.createElement("details")')
            && rendering.includes('answerPanel.setAttribute("aria-label", "Current result status and actions")')
            && rendering.includes("body.append(answerPanel)")
            && css.includes('.classical-authority-receipt[open] > .classical-authority-receipt__title::after')
            && css.includes('.classical-authority-receipt:not([open]) > .classical-authority-receipt__items')
            && css.includes('grid-template-areas:\n    "derivation"\n    "logic";')
            && css.includes(".classical-vnc-authority-section__header")
            && css.includes("Minimal Source -> Authority surface")
            && css.includes("Reference-matched Source + Authority")
            && css.includes("--source-authority-active: var(--classical-result-teal-soft)")
            && css.includes('#classical-source-parts[data-classical-source-parts-mode="whole-stem"] .classical-source-parts__grid')
            && !css.includes('#classical-source-parts[data-classical-source-parts-mode="internal-morphemes"]')
            && !css.includes(':has([data-classical-source-parts-mode=')
            && css.includes("Source, Grammar, and Result use one level of the same named-card language")
            && css.includes("background: var(--classical-shell-surface)")
            && css.includes("border: var(--classical-shell-border)")
            && css.includes("body.is-language-classical #container-header")
            && css.includes("scrollbar-gutter: stable")
            && css.includes(".classical-vnc-authority-section__body")
            && css.includes(".classical-vnc-authority-preview__account")
            && css.includes(".classical-vnc-authority-preview__account-segment")
            && css.includes(".classical-vnc-authority-preview__details")
            && css.includes(".classical-vnc-authority-preview__detail-value")
            && !css.includes(".classical-vnc-authority-preview__stage-flow")
            && !css.includes(".classical-vnc-authority-preview__stage--operation")
            && css.includes("max-width: 100%")
            && css.includes("background: var(--calc-step-bg)")
            && css.includes("@media (min-width: 1025px)")
            && css.includes("#classical-source-panel .panel-block-title .panel-pane-nav-btn")
            && css.includes("Keep #2's derivation chooser quieter")
            && css.includes("body.is-language-classical.is-ui-simple #classical-authority-panel .calc-operator--derivation")
            && css.includes("body.is-language-classical #classical-authority-panel .formula-controls-grid::after")
            && rendering.includes("function createClassicalResultSpecificitySwitch(")
            && rendering.includes("const resultSpecificitySwitch = createClassicalResultSpecificitySwitch(")
            && rendering.includes("predicateGroup.append(predicateMembers, predicateBrace, predicateRole)")
    );
    s.ok(
        "Every Classical result component and derivation operator uses the common Canvas Andrews visual system",
        rendering.includes('block.dataset.classicalResultVisualSystem = "grammar-account-surface"')
            && css.includes("--classical-result-teal: #285f57")
            && css.includes("--classical-result-amber: #8b5c18")
            && css.includes('data-classical-result-visual-system="grammar-account-surface"')
            && css.includes("--derivation-teal: var(--classical-result-teal)")
            && css.includes(".classical-rule-surface__single-vnc")
            && css.includes(".classical-authority-receipt--result")
            && css.includes(".classical-rule-surface__format-switch-option.is-active")
            && css.includes(".classical-rule-surface__diagram-predicate-brace")
            && css.includes("body.is-language-classical .calc-operator-grid--derivation")
            && css.includes("background: var(--classical-result-gradient)")
            && css.includes("border-radius: 999px")
    );
    s.ok(
        "Classical #3 authorized derivation defaults to one compact route summary and closed typed details",
        (rendering.includes("createClassicalVncDerivationExplanationSection")
            && rendering.includes('section.dataset.classicalVncDerivationDefaultState = "collapsed"')
            && vncApplication.includes("derivationExplanationProjection"))
            || rendering.includes('overview.dataset.classicalVncDerivationDefaultFacts = "source-target,type,procedure,valence"')
            && rendering.includes('section.dataset.classicalVncDerivationDefaultState = "collapsed"')
            && rendering.includes('targetObject.document.createElement("summary")')
            && rendering.includes('route.dataset.classicalVncDerivationSummaryField = "source-target"')
            && rendering.includes('header.append(route, routeCue)')
            && rendering.includes('overview.append(overviewFacts)')
            && rendering.includes('createOverviewFact("type", "Derivation", derivationTypeLabel)')
            && rendering.includes('createOverviewFact("procedure", "Procedure", projection.derivationProcedure?.label || "Typed formation")')
            && rendering.includes('createOverviewFact("valence", "Valence", valenceChange)')
            && !rendering.includes('createOverviewFact("canvas-witness", "Canvas witness"')
            && !rendering.includes('createOverviewFact("authority", "Authority"')
            && rendering.includes('"typed-formation"')
            && rendering.includes('"participants-scope-later-voice"')
            && !rendering.includes('"canvas-andrews-evidence"')
            && rendering.includes("section.append(header, overview, formationDisclosure, participantDisclosure)")
            && !rendering.includes('classical-vnc-derivation-explainer__lede", "Formation, participant history')
            && !rendering.includes('"Broader Andrews dimensions"')
            && css.includes(".classical-vnc-derivation-explainer__overview-route")
            && css.includes(".classical-vnc-derivation-explainer:not([open]) > :not(.classical-vnc-derivation-explainer__header)")
            && css.includes(".classical-vnc-derivation-explainer__route-cue")
            && css.includes(".classical-vnc-derivation-explainer__overview-facts")
            && css.includes(".classical-vnc-derivation-explainer__disclosure-summary")
            && css.includes(".classical-vnc-derivation-explainer__disclosure[open]")
            && css.includes(".classical-vnc-derivation-explainer__disclosure-body")
            && css.includes(".classical-vnc-derivation-explainer__disclosure:not([open]) > .classical-vnc-derivation-explainer__disclosure-body")
            && rendering.includes("appendParticipantLinkedFormula(profileFormula, profile)")
            && rendering.includes("participantIndex % 4 + 1")
            && rendering.includes("item.dataset.classicalVncParticipant = row.participantId")
            && rendering.includes("matching color = same participant")
            && vncApplication.includes('participantFormulaSegments: buildParticipantFormulaSegments(sourceFormula, sourceTypedFrame, "source")')
            && vncApplication.includes('participantFormulaSegments: buildParticipantFormulaSegments(activeFormula, activeTypedFrame, "target")')
            && vncApplication.includes('derivationProcedure: buildClassicalNahuatlVncDerivationProcedureProjection(selectedOption, derivationType)')
            && vncApplication.includes('display: buildClassicalNahuatlVncSourceAnalysisDisplayProjection(analysis)')
            && vncApplication.includes('analysisDisplayGroups: sourceAnalysisDisplayGroups')
            && vncApplication.includes('buildClassicalNahuatlVncDerivedStemAnalysisDisplayProjection')
            && vncApplication.includes('buildClassicalNahuatlVncCompactSourceAnalysisDisplayProjection')
            && vncApplication.includes('{ segment: "l", role: "retained nonactive formative" }')
            && vncApplication.includes('{ segment: "ti", role: "empty connective" }')
            && vncApplication.includes('{ segment: "ā", role: "causative formative" }')
            && vncApplication.includes('{ segment: "l", role: "empty connective" }')
            && vncApplication.includes('{ segment: "hu", role: "empty connective /w/" }')
            && vncApplication.includes('{ segment: "iā", role: "applicative formative" }')
            && rendering.includes('analysisBand.dataset.classicalVncSourceAnalysisVisible = "true"')
            && rendering.includes('analysisBand.dataset.classicalVncDerivedAnalysisVisible = "true"')
            && rendering.includes('projection.formationSteps.filter(step => step.stage !== "source-analysis")')
            && rendering.includes('step.stage === "source" && sourceAnalysisProjection')
            && rendering.includes('appendCompactStemAnalysis(card, sourceAnalysisProjection.compactDisplay, "source")')
            && rendering.includes('appendCompactStemAnalysis(card, step.derivedStemAnalysis, "derived")')
            && !rendering.includes('analysisStep.analysisDisplayGroups')
            && !rendering.includes('group.formationEffects || []')
            && vncApplication.includes('appendSegment(`${subject.pers1 || ""}-${subject.pers2 || ""}`, subjectEntry)')
            && vncApplication.includes('appendSegment(`${number.num1 || ""}-${number.num2 || ""}`, subjectEntry)')
            && vncApplication.includes('entry.row?.[carrierKindKey] === "object"')
            && vncApplication.includes('entry.row[carrierKey] === slot?.carrier')
            && css.includes(".classical-vnc-derivation-explainer__formula-participant")
            && css.includes(".classical-vnc-derivation-explainer__participant-tone--4")
            && css.includes(".classical-vnc-derivation-explainer__source-analysis-band")
            && css.includes("flex: 0 1 110px")
            && css.includes(".classical-vnc-derivation-explainer__formation-step--with-source-analysis")
            && css.includes(".classical-vnc-derivation-explainer__formation-rail > .classical-vnc-derivation-explainer__formation-step")
            && css.includes("flex: 1 1 0")
            && css.includes(".classical-vnc-derivation-explainer__derived-analysis")
            && css.includes(".classical-vnc-derivation-explainer__derived-parts")
            && css.includes(".classical-vnc-derivation-explainer__source-part-role")
    );
    s.ok(
        "#3 Result owns the legal NNC and VNC single-form or full-paradigm output scope",
        extractClassicalShellTemplate("ClassicalResultPanel").includes('data-classical-result-scope-controls="true"')
            && extractClassicalShellTemplate("ClassicalResultPanel").includes('data-classical-result-scope-control="nnc"')
            && extractClassicalShellTemplate("ClassicalResultPanel").includes('data-classical-result-scope-control="vnc"')
            && extractClassicalShellTemplate("ClassicalResultPanel").includes('id="classical-rule-logic-nnc-output-scope"')
            && extractClassicalShellTemplate("ClassicalResultPanel").includes('id="classical-rule-logic-vnc-output-scope"')
            && !extractClassicalShellTemplate("ClassicalAuthorityPanel").includes('id="classical-rule-logic-nnc-output-scope"')
            && !extractClassicalShellTemplate("ClassicalAuthorityPanel").includes('id="classical-rule-logic-vnc-output-scope"')
            && classicalShell.includes('renderClassicalResultOutputScopeOptions("nnc")')
            && classicalShell.includes('renderClassicalResultOutputScopeOptions("vnc")')
            && rendering.includes("data-classical-result-scope-control")
            && css.includes("#classical-result-panel .classical-result-scope-controls")
            && rendering.includes('function buildClassicalNncParadigmDisplayFrame(rows = [], currentPossessor = "")')
            && rendering.includes('function buildClassicalNncParadigmMapFrame(rows = [], currentPossessor = "", fixedSourceAnalysis = null)')
            && rendering.includes('function buildClassicalNncSpecificPossessorMatrix(maps = [])')
            && rendering.includes('paradigmTitle.textContent = "Full paradigm"')
            && rendering.includes('mapViewButton.textContent = "Map"')
            && rendering.includes('tableViewButton.textContent = "Table"')
            && rendering.includes('possessorGroupTitle.textContent = possessorGroup.label')
            && rendering.includes('group.dataset.classicalNncParadigmPossessorGroup = possessorGroup.key')
            && rendering.includes('card.dataset.classicalNncParadigmPossessor')
            && rendering.includes('collection.dataset.classicalNncPossessorMatrix = "true"')
            && rendering.includes('personGroup.dataset.classicalNncPossessorPerson = person')
            && rendering.includes('numberCard.dataset.classicalNncPossessorNumber = number')
            && !rendering.includes('possessorControlLabel.textContent = "Possessor"')
            && rendering.includes('paradigmMapPanel.dataset.classicalNncParadigmPrimaryView = "map"')
            && rendering.includes('paradigmScroll.dataset.classicalNncParadigmSecondaryView = "table"')
            && rendering.includes('["Person", "Singular", "Common number", "Plural"]')
            && rendering.includes('surface.className = "classical-rule-surface__paradigm-surface"')
            && rendering.includes('formula.className = "classical-rule-surface__paradigm-formula"')
            && rendering.includes('form.dataset.classicalNncParadigmSourceRows = entry.sourceRowIds.join(",")')
            && rendering.includes('"canvas-full-paradigm-enumerates-subject-person"')
            && rendering.includes('"canvas-full-paradigm-enumerates-subject-number"')
            && rendering.includes('"canvas-full-paradigm-enumerates-state"')
            && rendering.includes('paradigmSection.hidden = !fullParadigmActive')
            && css.includes('.classical-rule-surface__paradigm-table')
            && css.includes('.classical-rule-surface__paradigm-map')
            && css.includes('repeat(var(--classical-nnc-map-columns), minmax(11rem, 1fr))')
            && css.includes('.classical-rule-surface__paradigm-possessor-matrix')
            && css.includes('.classical-rule-surface__paradigm-possessor-person')
            && css.includes('.classical-rule-surface__paradigm-possessor-number-pair')
            && css.includes('.classical-rule-surface__paradigm-map-form-summary::marker')
            && css.includes('.classical-rule-surface__paradigm-map-form-detail')
            && rendering.includes('form.name = "classical-nnc-paradigm-detail"')
            && rendering.includes('form.dataset.classicalNncParadigmClickableCues = "true"')
            && rendering.includes('renderClassicalFormulaDerivedAnnotations(')
            && rendering.includes('renderClassicalDiagramDerivedAnnotations(')
            && rendering.includes('const form = createParadigmMapForm(entry, { table: true })')
            && rendering.includes('"classical-rule-surface__vnc-paradigm-detail"')
            && rendering.includes('function updateClassicalNncParadigmPopupDirection(form = null)')
            && rendering.includes('form.dataset.classicalNncPopupDirection = direction')
            && rendering.includes('defaultView?.addEventListener("resize"')
            && css.includes('[data-classical-nnc-popup-direction="backward"]')
            && css.includes('[data-classical-nnc-popup-direction="forward"]')
            && !rendering.includes('witnessLabel.textContent = "Canvas witness"')
            && rendering.includes('.classical-rule-surface__paradigm-map-form[open]')
            && css.includes('.classical-rule-surface__paradigm-reference')
            && css.includes('.classical-rule-surface__paradigm-group-summary')
            && css.includes('.classical-rule-surface__paradigm-table-scroll')
    );
    s.eq(
        "NNC popup direction minimizes measured map-boundary overflow instead of following grammatical columns",
        typeof ctx.updateClassicalNncParadigmPopupDirection === "function"
            ? (() => {
                const project = ({ left, right }) => {
                    const detail = {
                        getBoundingClientRect: () => ({ width: 448 }),
                    };
                    const boundary = {
                        getBoundingClientRect: () => ({ left: 448, right: 1186 }),
                    };
                    const form = {
                        open: true,
                        dataset: {},
                        getBoundingClientRect: () => ({ left, right }),
                        querySelector: () => detail,
                        closest: () => boundary,
                    };
                    return [
                        ctx.updateClassicalNncParadigmPopupDirection(form),
                        form.dataset.classicalNncPopupDirection,
                    ];
                };
                return {
                    earlyLeftCard: project({ left: 543, right: 673 }),
                    lateLeftCard: project({ left: 682, right: 812 }),
                    earlyRightCard: project({ left: 897, right: 1027 }),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                earlyLeftCard: ["forward", "forward"],
                lateLeftCard: ["forward", "forward"],
                earlyRightCard: ["backward", "backward"],
            }
            : null
    );
    s.eq(
        "Result shell matches the typed output-scope vocabulary in exact role order without documentary authority metadata",
        typeof ctx.ClassicalResultPanel === "function"
            && ctx.CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS
            ? (() => {
                const markup = ctx.ClassicalResultPanel();
                const shellRecords = ["nnc", "vnc"].flatMap((role) => {
                    const contract = ctx.CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS[role];
                    const selectMatch = markup.match(new RegExp(`<select id="${contract.controlId}"[^>]*>([\\s\\S]*?)<\\/select>`, "u"));
                    return Array.from((selectMatch?.[1] || "").matchAll(/<option value="([^"]+)"/gu))
                        .map((match) => ({ controlId: contract.controlId, value: match[1] }));
                });
                const expectedRecords = ["nnc", "vnc"].flatMap((role) => {
                    const contract = ctx.CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS[role];
                    return ctx.CLASSICAL_RESULT_OUTPUT_SCOPES.map((value) => ({
                        controlId: contract.controlId,
                        value,
                    }));
                });
                const recordsMatch = (records) => records.length === expectedRecords.length
                    && records.every((record, index) => (
                        record.controlId === expectedRecords[index]?.controlId
                        && record.value === expectedRecords[index]?.value
                    ));
                const poisonedRecords = shellRecords.map((record, index) => index === 1
                    ? { ...record, value: "fabricated" }
                    : record);
                return {
                    vocabulary: ctx.CLASSICAL_RESULT_OUTPUT_SCOPES,
                    shell: shellRecords.map((record) => [record.controlId, record.value]),
                    exact: recordsMatch(shellRecords) ? "authorized" : "blocked",
                    poisoned: recordsMatch(poisonedRecords) ? "authorized" : "blocked",
                    documentaryAuthorityMetadataAbsent: !markup.includes("data-classical-authority-option")
                        && !markup.includes("data-exact-witness"),
                    rendererIgnoresDocumentaryMetadata: rendering.includes("documentaryOptionMetadataIgnored: true"),
                    nncDimensions: ctx.CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS.nnc.paradigmDimensions,
                    vncDimensions: ctx.CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS.vnc.paradigmDimensions,
                    vncDirectSelections: ctx.CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS.vnc.directSelectionDimensions,
                    vncDerivedFixed: ctx.CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS.vnc.derivedFixedDimensions,
                    vncHasActiveOnlyRule: Object.prototype.hasOwnProperty.call(
                        ctx.CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS.vnc,
                        "paradigmRequiresActiveVoice"
                    ),
                };
            })()
            : "output-scope-contract-not-loaded",
        {
            vocabulary: ["single", "paradigm"],
            shell: [
                ["classical-rule-logic-nnc-output-scope", "single"],
                ["classical-rule-logic-nnc-output-scope", "paradigm"],
                ["classical-rule-logic-vnc-output-scope", "single"],
                ["classical-rule-logic-vnc-output-scope", "paradigm"],
            ],
            exact: "authorized",
            poisoned: "blocked",
            documentaryAuthorityMetadataAbsent: true,
            rendererIgnoresDocumentaryMetadata: true,
            nncDimensions: ["state", "subject", "possessor", "stem-relation", "number-form"],
            vncDimensions: ["subject", "mood", "tense"],
            vncDirectSelections: ["valence"],
            vncDerivedFixed: ["target-valence"],
            vncHasActiveOnlyRule: false,
        }
    );
    s.eq(
        "VNC Result scope owns coordinates only while Grammar selections stay unchanged",
        typeof ctx.getClassicalVncFullParadigmControlContract === "function"
            ? (() => {
                const summarize = (controlId, derivationType) => {
                    const contract = ctx.getClassicalVncFullParadigmControlContract(controlId, derivationType);
                    return [contract.available, contract.decisionOwner, contract.gate];
                };
                const buildDirectManifest = (valence) => ctx.buildClassicalVncParadigmFrame({
                    stem: "chōca",
                    verbClass: "A",
                    valence,
                    derivationType: "direct",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                }, { manifestOnly: true });
                const intransitiveManifest = buildDirectManifest("intransitive");
                const projectiveManifest = buildDirectManifest("projective-human");
                const determinateStemClass = ctx.getClassicalRuleLogicCanvasClassSelection("chōca", {
                    requestedClassId: "D",
                    valence: "intransitive",
                });
                const ambiguousStemClass = ctx.getClassicalRuleLogicCanvasClassSelection("", {
                    requestedClassId: "D",
                    valence: "intransitive",
                });
                const shortFinalStemClass = ctx.getClassicalRuleLogicCanvasClassSelection("temi", {
                    requestedClassId: "C",
                    valence: "intransitive",
                });
                const productiveClassC = ctx.getClassicalRuleLogicCanvasClassSelection("cal-o-ā", {
                    requestedClassId: "A",
                    valence: "intransitive",
                });
                const directReceipt = ctx.buildClassicalRuleLogicAuthorityReceiptEntries({
                    basalUnit: "vnc",
                    state: {
                        stem: "chōca",
                        verbClass: "A",
                        valence: "projective-human",
                        derivationType: "direct",
                        vncOutputScope: "paradigm",
                    },
                });
                const derivedReceipt = ctx.buildClassicalRuleLogicAuthorityReceiptEntries({
                    basalUnit: "vnc",
                    state: {
                        stem: "tomi",
                        verbClass: "B",
                        valence: "intransitive",
                        targetValence: "specific-projective",
                        derivationType: "causative",
                        vncOutputScope: "paradigm",
                    },
                });
                return {
                    directValence: summarize("classical-rule-logic-valence", "direct"),
                    causativeValence: summarize("classical-rule-logic-valence", "causative"),
                    applicativeValence: summarize("classical-rule-logic-valence", "applicative"),
                    fabricatedDerivationFailsClosed: summarize("classical-rule-logic-valence", "fabricated"),
                    subjectCoordinate: summarize("classical-rule-logic-subject", "direct"),
                    objectGrammar: summarize("classical-rule-logic-object", "direct"),
                    stemClassPreservesTypedContract: summarize("classical-rule-logic-class", "direct"),
                    stemClassAvailability: [
                        [determinateStemClass.dropdownLocked, determinateStemClass.selectedClassId, determinateStemClass.allowedClassIds],
                        [ambiguousStemClass.dropdownLocked, ambiguousStemClass.selectedClassId, ambiguousStemClass.allowedClassIds],
                        [shortFinalStemClass.dropdownLocked, shortFinalStemClass.selectedClassId, shortFinalStemClass.allowedClassIds, shortFinalStemClass.claimEligibilityRuleIds],
                        [productiveClassC.dropdownLocked, productiveClassC.selectedClassId, productiveClassC.allowedClassIds, productiveClassC.claimEligibilityRuleIds],
                    ],
                    staleValenceEnumerationGateAbsent: !rendering.includes("canvas-full-vnc-paradigm-enumerates-valence-subject-object-mood-tense"),
                    selectedValenceOwnsRenderedMap: rendering.includes("const sourceValenceMaps = selectedValenceMap ? [selectedValenceMap] : []"),
                    selectedValenceRegeneratesManifest: [intransitiveManifest.fixedSourceAnalysis.valence, projectiveManifest.fixedSourceAnalysis.valence],
                    scopeDoesNotRewriteVoice: !rendering.includes('if (vncOutputScope === "paradigm")')
                        && !rendering.includes('fullVncParadigm ? ["active"]'),
                    grammarControlsPreserved: !rendering.includes('derivationInventory?.options?.length > 0 && !fullVncParadigm')
                        && !rendering.includes('derivationSourceAuthorized && !fullVncParadigm')
                        && !rendering.includes('nonactiveInventory?.selectorRequired === true && !fullVncParadigm'),
                    resultObjectCannotRewriteGrammar: !rendering.includes("resultObjectSelect")
                        && !rendering.includes("classicalVncResultObjectControl"),
                    urlRestoreDoesNotStageSingleScope: !composer.includes("outputScopeSpecIndex")
                        && !composer.includes("outputScopeControl.value = outputScopeSpec.defaultValue"),
                    receiptOwnership: [
                        directReceipt.find((entry) => entry.label === "Valence")?.role || "",
                        derivedReceipt.find((entry) => entry.label === "Resulting Valence")?.role || "",
                    ],
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                directValence: [true, "user", "direct-full-vnc-paradigm-uses-selected-valence"],
                causativeValence: [false, "typed-derived-result", "derived-full-vnc-paradigm-uses-engine-derived-target-valence"],
                applicativeValence: [false, "typed-derived-result", "derived-full-vnc-paradigm-uses-engine-derived-target-valence"],
                fabricatedDerivationFailsClosed: [false, "invalid-derivation-contract", "invalid-derivation-cannot-authorize-full-paradigm-valence"],
                subjectCoordinate: [false, "paradigm-coordinate", "full-vnc-paradigm-enumerates-subject-mood-tense"],
                objectGrammar: [true, "existing-control-contract", "full-vnc-paradigm-preserves-existing-control-contract"],
                stemClassPreservesTypedContract: [true, "existing-control-contract", "full-vnc-paradigm-preserves-existing-control-contract"],
                stemClassAvailability: [
                    [true, "A", ["A"]],
                    [false, "D", ["A", "B", "C", "D"]],
                    [false, "", ["A", "B", "D"], ["cn-l7-73-class-c"]],
                    [true, "C", ["C"], ["cn-l7-73-class-c"]],
                ],
                staleValenceEnumerationGateAbsent: true,
                selectedValenceOwnsRenderedMap: true,
                selectedValenceRegeneratesManifest: ["intransitive", "projective-human"],
                scopeDoesNotRewriteVoice: true,
                grammarControlsPreserved: true,
                resultObjectCannotRewriteGrammar: true,
                urlRestoreDoesNotStageSingleScope: true,
                receiptOwnership: ["choice", "derived"],
            }
            : null
    );
    s.eq(
        "Malformed explicit Result scope blocks role projection instead of inheriting single or the inactive control",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const nnc = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncNounClass: "tli",
                    nncOutputScope: "fabricated",
                });
                const vnc = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    stem: "nemi",
                    lesson: "7",
                    valence: "intransitive",
                    construction: "none",
                    mood: "indicative",
                    tense: "present",
                    vncOutputScope: "fabricated",
                    nncOutputScope: "paradigm",
                });
                const empty = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    stem: "nemi",
                    lesson: "7",
                    valence: "intransitive",
                    construction: "none",
                    mood: "indicative",
                    tense: "present",
                    vncOutputScope: "",
                });
                return {
                    nnc: {
                        status: nnc.authorizationStatus,
                        reason: nnc.blockReason,
                        scope: nnc.state.nncOutputScope,
                        scopeStatus: nnc.state.nncOutputScopeSelectionFrame.authorizationStatus,
                        single: nnc.nncSingleFormDisplayFrame,
                        paradigm: nnc.nncParadigmFrame,
                    },
                    vnc: {
                        status: vnc.authorizationStatus,
                        reason: vnc.blockReason,
                        scope: vnc.state.vncOutputScope,
                        scopeStatus: vnc.state.vncOutputScopeSelectionFrame.authorizationStatus,
                        inactiveNncScope: vnc.state.nncOutputScope,
                        appStatus: vnc.state.vncApplicationFrame.authorizationStatus,
                        formula: vnc.selectedFormula,
                        single: vnc.vncSingleFormDisplayFrame,
                        paradigm: vnc.vncParadigmFrame,
                    },
                    empty: {
                        status: empty.authorizationStatus,
                        reason: empty.blockReason,
                        scopeStatus: empty.state.vncOutputScopeSelectionFrame.authorizationStatus,
                    },
                };
            })()
            : "surface-builder-not-loaded",
        {
            nnc: { status: "blocked", reason: "classical-result-output-scope-not-recognized", scope: "", scopeStatus: "blocked", single: null, paradigm: null },
            vnc: { status: "blocked", reason: "classical-result-output-scope-not-recognized", scope: "", scopeStatus: "blocked", inactiveNncScope: "single", appStatus: "authorized", formula: "", single: null, paradigm: null },
            empty: { status: "blocked", reason: "classical-result-output-scope-not-recognized", scopeStatus: "blocked" },
        }
    );
    s.ok(
        "Smith frames are the typed output-visual authority without becoming grammar authority",
        rendering.includes("function buildClassicalNncSmithOutputVisualFrame(mapFrame = null, displayFrame = null)")
            && rendering.includes("function buildClassicalVncSmithOutputVisualFrame({")
            && rendering.includes('kind: "classical-nahuatl-smith-output-visual-frame"')
            && rendering.includes('authority: "smith-output-visual-authority"')
            && rendering.includes('authorityRole: "output-visual-authority"')
            && rendering.includes('model: "finite-categorical-smith-chart"')
            && rendering.includes("grammarAuthority: false")
            && rendering.includes('evolutionaryContract: "smith-frame-alone-authorizes-output-map-axes-groups-cells-and-vacancies"')
            && rendering.includes("const paradigmMapFrame = nncSmithAuthorized ? nncSmithVisualFrame : null")
            && rendering.includes("const smithValenceMaps = smithVisualFrame?.maps || []")
            && rendering.includes("const selectedValenceMap = smithValenceMaps.find(valenceMap => valenceMap.key === source.valence)")
            && rendering.includes('section.hidden = paradigmFrame?.authorizationStatus !== "authorized" || !smithAuthorized')
            && rendering.includes("|| !nncSmithAuthorized")
            && rendering.includes("|| !vncSmithVisualFrameAuthorized")
    );
    s.ok(
        "NNC single-form Result is one typed answer-first section instead of duplicate sibling outputs",
        rendering.includes("function buildClassicalNncSingleFormDisplayFrame(surfaceFrame = null)")
            && rendering.includes('authority: "typed-selected-output-projection"')
            && rendering.includes(
                "canonicalNncResult.formulaProjection.formulaRealization"
            )
            && !rendering.includes(
                "renderClassicalNahuatlNncSlotFrameFormula(typedSlotFrame)"
            )
            && rendering.includes("formulaStringAuthority: false")
            && rendering.includes("displayTextAuthority: false")
            && rendering.includes('singleNncSection.dataset.classicalNncSingleForm = "true"')
            && rendering.includes('singleNncTitle.textContent = "Generated form"')
            && rendering.includes('singleNncAnswerLabel.textContent = "Classical Nahuatl"')
            && !rendering.includes('item.dataset.classicalNncThirdPluralPossessorVariant = variant.st2')
            && rendering.includes('linearFormatTitle.textContent = "Linear format"')
            && rendering.includes('nuclearClauseDiagramTitleText.textContent = "Diagrammatic format"')
            && !rendering.includes("singleNncLinearButton")
            && !rendering.includes("singleNncDiagramButton")
            && rendering.includes("const resultFormatNodes = singleNncElegantActive")
            && css.includes(".classical-rule-surface__single-nnc")
            && css.includes(".classical-rule-surface__single-nnc-surface")
            && !css.includes(".classical-rule-surface__single-nnc-conditions")
            && !rendering.includes("singleNncReference")
            && !rendering.includes("singleNncConditions")
            && !rendering.includes("singleNncStatus")
            && css.includes(".classical-rule-surface__single-nnc > .classical-rule-surface__format-section")
    );
    s.eq(
        "free-form ordinary NNC Source survives the canonical application boundary with explicit open-stem class analysis",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const buildOpen = (stem, sourceClass = "zero") =>
                    ctx.buildClassicalRuleLogicSurfaceFrame({
                        basalUnit: "nnc",
                        stem,
                        nncSourceClass: sourceClass,
                        nncState: "absolutive",
                        nncOutputScope: "single",
                        nncAnimacy: "animate",
                        subject: "3sg",
                        sentenceSurfaceMode: "statement",
                        sentenceNegativeMode: "positive",
                    });
                const nemi = buildOpen("nemi");
                const xopa = buildOpen("xopa");
                const incompatible = buildOpen("nemi", "tli-1");
                const canonical = buildOpen("cal", "zero");
                const incompatibleAvailability =
                    ctx.getClassicalNncAuthorityControlAvailability?.(
                        incompatible
                    )?.["classical-rule-logic-nnc-class"];
                const canonicalAvailability =
                    ctx.getClassicalNncAuthorityControlAvailability?.(
                        canonical
                    )?.["classical-rule-logic-nnc-class"];
                return {
                    nemiStatus: nemi.authorizationStatus,
                    nemiFormula:
                        nemi.nncSingleFormDisplayFrame?.selectedFormula || "",
                    nemiSentence:
                        nemi.nncSingleFormDisplayFrame?.sentenceSurface || "",
                    nemiOpenSource:
                        nemi.state.nncTypedSourceFrame?.openStemSource === true,
                    nemiAuthority:
                        nemi.state.nncTypedSourceFrame
                            ?.lexicalSelectionAuthority || "",
                    xopaStatus: xopa.authorizationStatus,
                    xopaSentence:
                        xopa.nncSingleFormDisplayFrame?.sentenceSurface || "",
                    incompatibleStatus: incompatible.authorizationStatus,
                    incompatibleReason: incompatible.blockReason,
                    incompatibleClassRecoveryAvailable:
                        incompatibleAvailability?.available === true,
                    incompatibleClassRecoveryRendered:
                        incompatibleAvailability?.renderInAuthority === true,
                    canonicalStatus: canonical.authorizationStatus,
                    canonicalClass:
                        canonical.state.nncTypedSourceFrame?.nounClass || "",
                    canonicalOpenSource:
                        canonical.state.nncTypedSourceFrame?.openStemSource === true,
                    canonicalClassControlRendered:
                        canonicalAvailability?.renderInAuthority === true,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                nemiStatus: "authorized",
                nemiFormula: "#0-0(nemi)0-0#",
                nemiSentence: "Nemi.",
                nemiOpenSource: true,
                nemiAuthority: "user-supplied-lexical-analysis",
                xopaStatus: "authorized",
                xopaSentence: "Xopa.",
                incompatibleStatus: "blocked",
                incompatibleReason:
                    "typed-class-alternative-contradicts-canvas-form-constraint",
                incompatibleClassRecoveryAvailable: true,
                incompatibleClassRecoveryRendered: true,
                canonicalStatus: "blocked",
                canonicalClass: "tli",
                canonicalOpenSource: false,
                canonicalClassControlRendered: true,
            }
            : null
    );
    s.eq(
        "NNC single-form display derives formula and surface from typed frames and ignores hostile display strings",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            && typeof ctx.buildClassicalNncSingleFormDisplayFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncState: "absolutive",
                    nncOutputScope: "single",
                    nncAnimacy: "nonanimate",
                    subject: "3common",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                    sentenceParticleId: "l3-in",
                });
                const display = surface.nncSingleFormDisplayFrame;
                const pluralDisplay = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "chichi",
                    nncState: "absolutive",
                    nncOutputScope: "single",
                    nncAnimacy: "animate",
                    subject: "3pl",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                }).nncSingleFormDisplayFrame;
                const pronominalDisplay = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "tl-eh-huā",
                    sourceEmbedStem: "tl",
                    sourceMatrixStem: "eh-huā",
                    nncState: "absolutive",
                    nncOutputScope: "single",
                    nncAnimacy: "animate",
                    nncClausePosition: "initial",
                    subject: "3sg",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                }).nncSingleFormDisplayFrame;
                const hostile = ctx.buildClassicalNncSingleFormDisplayFrame({
                    ...surface,
                    selectedFormula: "#FAKE#",
                    sentenceFormulaDisplay: "#FAKE-SENTENCE#",
                    sentenceSurfaceDisplay: "Fake.",
                });
                const retiredLanePoison =
                    ctx.buildClassicalNncSingleFormDisplayFrame({
                    ...surface,
                    selectedOutputLogicFrame: {
                        ...surface.selectedOutputLogicFrame,
                        authorizationStatus: "blocked",
                    },
                });
                const blocked = ctx.buildClassicalNncSingleFormDisplayFrame({
                    ...surface,
                    machineryFrame: null,
                });
                return {
                    status: display.authorizationStatus,
                    authority: display.authority,
                    formulaStringAuthority: display.formulaStringAuthority,
                    displayTextAuthority: display.displayTextAuthority,
                    formula: display.selectedFormula,
                    sentenceFormula: display.sentenceFormula,
                    sentenceSurface: display.sentenceSurface,
                    diagramAuthority: display.diagrammaticFrame?.projectionAuthority,
                    diagramRoles: display.diagrammaticFrame?.rows?.map((row) => row.role),
                    reference: display.fixedReference,
                    conditions: display.conditions,
                    pluralNumberCondition: pluralDisplay.conditions.find((condition) => condition.label === "Number form") || null,
                    pronominalReference: pronominalDisplay.fixedReference,
                    pronominalFormula: pronominalDisplay.selectedFormula,
                    witnessesLegal: display.witnessRefs.length > 0 && display.witnessRefs.every((ref) => (
                        ref.transcriptionLineStart > 0
                        && ref.transcriptionLineEnd >= ref.transcriptionLineStart
                        && Boolean(ref.exactWitness)
                    )),
                    hostileFormula: hostile.selectedFormula,
                    hostileSurface: hostile.sentenceSurface,
                    hostileTextSurvived: `${hostile.selectedFormula} ${hostile.sentenceSurface}`.includes("FAKE"),
                    retiredLaneStatus:
                        retiredLanePoison.authorizationStatus,
                    blockedStatus: blocked.authorizationStatus,
                    blockedFormula: blocked.selectedFormula,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                authority: "typed-selected-output-projection",
                formulaStringAuthority: false,
                displayTextAuthority: false,
                formula: "#0-0(cal)li-0#",
                sentenceFormula: "in #0-0(cal)li-0#.",
                sentenceSurface: "In calli.",
                diagramAuthority: "typed-nnc-slots",
                diagramRoles: ["Subject", "Predicate"],
                reference: {
                    kind: "classical-nahuatl-nnc-single-form-reference",
                    authority: "typed-source-and-authority-contract",
                    stem: "cal",
                    stemRelation: "plain",
                    derivedStem: "cal",
                    nounClass: "tli",
                    referent: "nonanimate",
                    referenceLabel: "Referent",
                    referenceValue: "nonanimate",
                    sentenceType: "statement",
                },
                conditions: [
                    { label: "Subject", value: "3common" },
                    { label: "State", value: "absolutive" },
                    { label: "Stem relation", value: "plain" },
                ],
                pluralNumberCondition: { label: "Number form", value: "m-eh" },
                pronominalReference: {
                    kind: "classical-nahuatl-nnc-single-form-reference",
                    authority: "typed-source-and-authority-contract",
                    stem: "tl-eh-huā",
                    stemRelation: "plain",
                    derivedStem: "tl-eh-huā",
                    nounClass: "tl",
                    referent: "entity",
                    referenceLabel: "Source meaning",
                    referenceValue: "entity",
                    sentenceType: "information-question",
                },
                pronominalFormula: "#0-0(tl-eh-huā)tl-0#",
                witnessesLegal: true,
                hostileFormula: "#0-0(cal)li-0#",
                hostileSurface: "In calli.",
                hostileTextSurvived: false,
                retiredLaneStatus: "authorized",
                blockedStatus: "blocked",
                blockedFormula: "",
            }
            : null
    );
    s.eq(
        "VNC single-form display mirrors NNC with typed Linear and Diagram views",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            && typeof ctx.buildClassicalVncSingleFormDisplayFrame === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "chōca",
                    sourceTransitivity: "intransitive",
                    sourceMatrixStem: "chōca",
                    verbClass: "A",
                    requestedVerbClass: "A",
                    valence: "intransitive",
                    requestedValence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    vncOutputScope: "single",
                    sentenceNegativeMode: "positive",
                    sentenceSurfaceMode: "statement",
                    sentenceParticleId: "l3-in",
                });
                const ancaMiquiSurface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "26",
                    stem: "ā-miqui",
                    sourceTransitivity: "intransitive",
                    sourceMatrixStem: "ā-miqui",
                    verbClass: "B",
                    requestedVerbClass: "B",
                    valence: "intransitive",
                    requestedValence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    vncOutputScope: "single",
                    sentenceNegativeMode: "positive",
                    sentenceSurfaceMode: "statement",
                    sentenceParticleId: "l3-anca",
                });
                const layeredParticleSurface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "26",
                    stem: "ā-miqui",
                    sourceTransitivity: "intransitive",
                    sourceMatrixStem: "ā-miqui",
                    verbClass: "B",
                    requestedVerbClass: "B",
                    valence: "intransitive",
                    requestedValence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    vncOutputScope: "single",
                    sentenceNegativeMode: "positive",
                    sentenceSurfaceMode: "question-cuix",
                    sentenceParticleId: "l3-auh-interjection",
                    sentenceParticleHonorificized: true,
                    sentenceAdverbialId: "l3-oc",
                });
                const display = surface.vncSingleFormDisplayFrame;
                const hostile = ctx.buildClassicalVncSingleFormDisplayFrame({
                    ...surface,
                    selectedFormula: "#FAKE#",
                    sentenceFormulaDisplay: "#FAKE-SENTENCE#",
                    sentenceSurfaceDisplay: "Fake.",
                });
                const blocked = ctx.buildClassicalVncSingleFormDisplayFrame({
                    ...surface,
                    selectedOutputLogicFrame: {
                        ...surface.selectedOutputLogicFrame,
                        authorizationStatus: "blocked",
                    },
                });
                return {
                    status: display.authorizationStatus,
                    authority: display.authority,
                    formulaStringAuthority: display.formulaStringAuthority,
                    displayTextAuthority: display.displayTextAuthority,
                    formulaPresent: Boolean(display.selectedFormula),
                    sentenceFormula: display.sentenceFormula,
                    sentenceSurface: display.sentenceSurface,
                    ancaMiquiSentenceSurface: ancaMiquiSurface.vncSingleFormDisplayFrame?.sentenceSurface,
                    layeredParticleFormula: layeredParticleSurface.vncSingleFormDisplayFrame?.sentenceFormula,
                    layeredParticleSurface: layeredParticleSurface.vncSingleFormDisplayFrame?.sentenceSurface,
                    sentenceSurfacePresent: Boolean(display.sentenceSurface),
                    diagramAuthority: display.diagrammaticFrame?.projectionAuthority,
                    diagramRoles: display.diagrammaticFrame?.rows?.map((row) => row.role),
                    conditionLabels: display.conditions.map((condition) => condition.label),
                    hostileTextSurvived: `${hostile.selectedFormula} ${hostile.sentenceSurface}`.includes("FAKE"),
                    blockedStatus: blocked.authorizationStatus,
                    blockedFormula: blocked.selectedFormula,
                    uiAnalogPresent: rendering.includes('singleVncSection.dataset.classicalVncSingleForm = "true"')
                        && rendering.includes('linearFormatTitle.textContent = "Linear format"')
                        && rendering.includes('nuclearClauseDiagramTitleText.textContent = "Diagrammatic format"')
                        && !rendering.includes("singleVncLinearButton")
                        && !rendering.includes("singleVncDiagramButton")
                        && rendering.includes("const resultFormatNodes = singleNncElegantActive")
                        && css.includes(".classical-rule-surface__single-vnc"),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                authority: "typed-selected-output-plus-vnc-finite-surface-projection",
                formulaStringAuthority: false,
                displayTextAuthority: false,
                formulaPresent: true,
                sentenceFormula: "in #ni-0(chōca)0+0-0#.",
                sentenceSurface: "In nichōca.",
                ancaMiquiSentenceSurface: "Anca nāmiqui.",
                layeredParticleFormula: "āuhtzin oc #n-0(ā-miqui)0+0-0#?",
                layeredParticleSurface: "Āuhtzin oc nāmiqui?",
                sentenceSurfacePresent: true,
                diagramAuthority: "typed-vnc-slots",
                diagramRoles: ["Subject", "Core", "Tense"],
                conditionLabels: ["Subject", "Valence", "Mood", "Tense"],
                hostileTextSurvived: false,
                blockedStatus: "blocked",
                blockedFormula: "",
                uiAnalogPresent: true,
            }
            : null
    );
    s.eq(
        "Lesson 16 contextual controls reach typed live authority without hidden defaults",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? (() => {
                const build = (overrides) => ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    nncState: "absolutive",
                    nncOutputScope: "single",
                    nncAnimacy: "animate",
                    nncClausePosition: "initial",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                    ...overrides,
                });
                const doubled = build({
                    stem: "eh-huā",
                    sourceEmbedStem: "eh",
                    sourceMatrixStem: "huā",
                    subject: "1pl",
                    nncDoubledFirstPlural: true,
                });
                const hostileDoubled = build({
                    stem: "eh-huā",
                    sourceEmbedStem: "eh",
                    sourceMatrixStem: "huā",
                    subject: "2pl",
                    nncDoubledFirstPlural: true,
                });
                const dependent = build({
                    stem: "tl-eh",
                    sourceEmbedStem: "tl",
                    sourceMatrixStem: "eh",
                    subject: "3sg",
                    nncDependentClauseIntroducedByIn: true,
                });
                const blockedHuman = build({
                    stem: "itl-ah",
                    sourceEmbedStem: "itl",
                    sourceMatrixStem: "ah",
                    subject: "2sg",
                    nncSpecialHumanUse: false,
                });
                const selectedHuman = build({
                    stem: "itl-ah",
                    sourceEmbedStem: "itl",
                    sourceMatrixStem: "ah",
                    subject: "2sg",
                    nncSpecialHumanUse: true,
                });
                return {
                    doubledStatus: doubled.authorizationStatus,
                    doubledFormula: doubled.selectedFormula,
                    hostileDoubledReason: hostileDoubled.blockReason,
                    dependentStatus: dependent.authorizationStatus,
                    dependentSurface: dependent.sentenceSurfaceDisplay,
                    dependentFormula: dependent.sentenceFormulaDisplay,
                    blockedHumanReason: blockedHuman.blockReason,
                    selectedHumanStatus: selectedHuman.authorizationStatus,
                    selectedHumanFormula: selectedHuman.selectedFormula,
                    doubledAvailability: ctx.getClassicalNncAuthorityControlAvailability(
                        doubled,
                        ctx.getClassicalNncAuthorityOptionContract(doubled.state)
                    )["classical-rule-logic-nnc-doubled-first-plural"]?.available,
                    dependentAvailability: ctx.getClassicalNncAuthorityControlAvailability(
                        dependent,
                        ctx.getClassicalNncAuthorityOptionContract(dependent.state)
                    )["classical-rule-logic-nnc-dependent-clause-in"]?.available,
                    humanAvailability: ctx.getClassicalNncAuthorityControlAvailability(
                        selectedHuman,
                        ctx.getClassicalNncAuthorityOptionContract(selectedHuman.state)
                    )["classical-rule-logic-nnc-special-human-use"]?.available,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                doubledStatus: "authorized",
                doubledFormula: "#ti-t-0(eh-huā-n)t-in#",
                hostileDoubledReason: "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc",
                dependentStatus: "authorized",
                dependentSurface: "Tleh in …?",
                dependentFormula: "#0-0(tl-eh)0-0# in …?",
                blockedHumanReason: "itlah-with-human-subject-requires-special-situation-selection",
                selectedHumanStatus: "authorized",
                selectedHumanFormula: "#t-0(itl-ah)0-0#",
                doubledAvailability: true,
                dependentAvailability: true,
                humanAvailability: true,
            }
            : null
    );
    s.eq(
        "NNC full paradigm holds Source analysis fixed and renders only typed authorized rows",
        typeof ctx.buildClassicalNncParadigmFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalNncParadigmFrame({
                    basalUnit: "nnc",
                    stem: "cā-tl-e-in",
                    sourceEmbedStem: "cā",
                    sourceMatrixStem: "tl-e-in",
                    nncState: "absolutive",
                    nncAnimacy: "animate",
                    nncClausePosition: "initial",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                    hostileFormulaArtifact: "#FAKE#",
                });
                return {
                    status: frame.authorizationStatus,
                    source: frame.fixedSourceAnalysis,
                    rows: frame.rowCount,
                    invalidCandidatesRendered: frame.invalidCandidatesRendered,
                    stringAuthority: frame.formulaStringAuthority,
                    everyRowTyped: frame.rows.every((row) => (
                        row.authority === "typed-selected-output"
                        && ctx.isClassicalNahuatlPronominalNncParadigmCoordinate(
                            row.pronominalNncParadigmCoordinate
                        )
                        && ctx.isClassicalNahuatlPronominalNncResult(
                            row.pronominalNncResult
                        )
                        && row.scalarEvaluatorIdentity
                            === "evaluateClassicalNahuatlPronominalNnc"
                        && row.pointwiseEquivalent === true
                    )),
                    everySourceFixed: frame.rows.every((row) => (
                        row.state.nncType === "interrogative-which-compound"
                        && row.state.nncNounClass === "not-applicable"
                    )),
                    display: {
                        authority: frame.displayFrame.authority,
                        sourceRows: frame.displayFrame.sourceRowCount,
                        representedRows: frame.displayFrame.representedSourceRowCount,
                        entries: frame.displayFrame.displayEntryCount,
                        groups: frame.displayFrame.groups.map((group) => group.key),
                        noRowsDropped: frame.displayFrame.noSourceRowDropped,
                        noRowsDuplicated: frame.displayFrame.noSourceRowDuplicated,
                    },
                    map: {
                        authority: frame.mapFrame.authority,
                        sourceRows: frame.mapFrame.sourceRowCount,
                        representedRows: frame.mapFrame.representedSourceRowCount,
                        rejectedRows: frame.mapFrame.rejectedUntypedRowCount,
                        noRowsDropped: frame.mapFrame.noSourceRowDropped,
                        noRowsDuplicated: frame.mapFrame.noSourceRowDuplicated,
                        states: frame.mapFrame.stateViews.map((view) => view.state),
                        absolutiveRows: frame.mapFrame.maps.find((map) => map.state === "absolutive")?.activeRows,
                        absolutiveColumns: frame.mapFrame.maps.find((map) => map.state === "absolutive")?.activeColumns,
                    },
                    fakeRendered: frame.rows.some((row) => `${row.formula} ${row.surface}`.includes("FAKE")),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                source: {
                    kind: "classical-nahuatl-nnc-paradigm-source-analysis",
                    authority: "issued-typed-pronominal-nnc-source",
                    stem: "cā-tl-e-in",
                    nncType: "interrogative-which-compound",
                    nounClass: "not-applicable",
                        sourceEmbedStem: "cā",
                        sourceMatrixStem: "tl-e-in",
                        quantitiveMatrix: "",
                        quantitiveMatrixForm: "",
                        quantitivePredicatePluralization: "",
                    state: "absolutive",
                    initialState: "absolutive",
                    referenceCategory: "not-applicable",
                    animacy: "not-applicable",
                    metaphoricalUse: false,
                    stemRelation: "not-applicable",
                    predicateOperation: "not-applicable",
                    sourceFrameKind:
                        "classical-nahuatl-pronominal-nnc-source-frame",
                },
                rows: 6,
                invalidCandidatesRendered: false,
                stringAuthority: false,
                everyRowTyped: true,
                everySourceFixed: true,
                display: {
                    authority: "typed-paradigm-row-projection",
                    sourceRows: 6,
                    representedRows: 6,
                    entries: 6,
                    groups: ["absolutive:"],
                    noRowsDropped: true,
                    noRowsDuplicated: true,
                },
                map: {
                    authority: "typed-paradigm-row-projection",
                    sourceRows: 6,
                    representedRows: 6,
                    rejectedRows: 0,
                    noRowsDropped: true,
                    noRowsDuplicated: true,
                    states: ["absolutive"],
                    absolutiveRows: ["third"],
                    absolutiveColumns: ["singular", "common", "plural"],
                },
                fakeRendered: false,
            }
            : null
    );
    s.eq(
        "NNC full paradigm starting from possessive enumerates both States through canonical pointwise scalar coordinates",
        typeof ctx.buildClassicalNncParadigmFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalNncParadigmFrame({
                    basalUnit: "nnc",
                    stem: "pah",
                    nncState: "possessive",
                    nncOutputScope: "paradigm",
                    nncPossessor: "2sg",
                    nncAnimacy: "animate",
                    nncStemRelation: "plain",
                    nncClausePosition: "initial",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                });
                return {
                    status: frame.authorizationStatus,
                    version: frame.version,
                    authority: frame.authority,
                    dimensions: frame.dimensions,
                    rows: frame.rowCount,
                    states: Array.from(new Set(
                        frame.rows.map((row) => row.state.nncState)
                    )),
                    subjects: Array.from(new Set(
                        frame.rows.map((row) => row.state.subject)
                    )),
                    possessors: Array.from(new Set(
                        frame.rows.map((row) => row.state.nncPossessor)
                    )),
                    reciprocalSubjects: Array.from(new Set(frame.rows
                        .filter((row) => row.state.nncPossessor === "reciprocal")
                        .map((row) => row.state.subject))),
                    allRowsUseCanonicalScalar: frame.rows.every((row) => (
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
                    maps: frame.mapFrame.stateViews.map((view) => view.state),
                    representedRows: frame.mapFrame.representedSourceRowCount,
                    mapEntries: frame.mapFrame.mapEntryCount,
                    completeDiagrams:
                        frame.mapFrame.allEntriesHaveSubjectPredicateDiagram,
                    missingDiagrams:
                        frame.mapFrame.missingSubjectPredicateDiagramCount,
                    displayEntries: frame.smithVisualFrame.displayEntryCount,
                    columnAxis: frame.smithVisualFrame.columnAxis,
                    stringAuthority: frame.formulaStringAuthority,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                version: 4,
                authority:
                    "canonical-ordinary-nnc-source-operation-result-projection",
                dimensions: [
                    "State",
                    "Subject",
                    "Possessor",
                    "Stem formation",
                    "Plural connector",
                ],
                rows: 106,
                states: ["absolutive", "possessive"],
                subjects: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
                possessors: [
                    "",
                    "1sg",
                    "2sg",
                    "3sg",
                    "1pl",
                    "2pl",
                    "3pl",
                    "nonspecific-human",
                    "reciprocal",
                ],
                reciprocalSubjects: ["3sg", "3pl"],
                allRowsUseCanonicalScalar: true,
                maps: ["absolutive", "possessive"],
                representedRows: 106,
                mapEntries: 106,
                completeDiagrams: true,
                missingDiagrams: 0,
                displayEntries: 106,
                columnAxis: {
                    key: "subject-number",
                    label: "Subject number",
                    values: ["singular", "common", "plural"],
                },
                stringAuthority: false,
            }
            : null
    );
    s.eq(
        "NNC Full-paradigm presentation State survives regeneration without becoming grammar authority",
        typeof ctx.resolveClassicalNncParadigmPresentationState === "function"
            ? {
                preserved: ctx.resolveClassicalNncParadigmPresentationState(
                    ["absolutive", "possessive"],
                    "absolutive",
                    "possessive"
                ),
                generatedInitial: ctx.resolveClassicalNncParadigmPresentationState(
                    ["absolutive", "possessive"],
                    "",
                    "possessive"
                ),
                unavailablePrior: ctx.resolveClassicalNncParadigmPresentationState(
                    ["possessive"],
                    "absolutive",
                    "possessive"
                ),
                fabricatedPrior: ctx.resolveClassicalNncParadigmPresentationState(
                    ["absolutive", "possessive"],
                    "fabricated",
                    "possessive"
                ),
                rendererCapturesPressedState:
                    rendering.includes("const priorNncParadigmState = block.querySelector(")
                    && rendering.includes("resolveClassicalNncParadigmPresentationState("),
            }
            : null,
        {
            preserved: "absolutive",
            generatedInitial: "possessive",
            unavailablePrior: "possessive",
            fabricatedPrior: "possessive",
            rendererCapturesPressedState: true,
        }
    );
    s.eq(
        "NNC full paradigm fixes user-selected animacy while lexical plural connectors fail closed",
        typeof ctx.buildClassicalNncParadigmFrame === "function"
            && typeof ctx.getClassicalNncAuthorityOptionContract === "function"
            ? (() => {
                const makeCalFrame = (animacy, metaphoricalUse = false) => ctx.buildClassicalNncParadigmFrame({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncState: "absolutive",
                    nncOutputScope: "paradigm",
                    nncAnimacy: animacy,
                    nncMetaphoricalUse: metaphoricalUse,
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                });
                const nonanimate = makeCalFrame("nonanimate");
                const metaphorical = makeCalFrame("animate", true);
                const tliSource = ctx.issueCanonicalNncSourceFrame({
                    stem: "tēuc",
                });
                const tliPlural =
                    ctx.getCanonicalNncOperationSelectionFrame(tliSource, {
                    state: "absolutive",
                    subject: "3pl",
                });
                const tlSource = ctx.issueCanonicalNncSourceFrame({
                    stem: "māi",
                });
                const tlPlural =
                    ctx.getCanonicalNncOperationSelectionFrame(tlSource, {
                    state: "absolutive",
                    subject: "3pl",
                });
                return {
                    nonanimateReferent: nonanimate.fixedSourceAnalysis.referenceCategory,
                    nonanimateSubjects: Array.from(new Set(nonanimate.rows.map((row) => row.state.subject))),
                    nonanimateRowsAllFixed: nonanimate.rows.every((row) => row.state.nncReferenceCategory === "nonanimate"),
                    nonanimateStemRelations: Array.from(new Set(nonanimate.rows.map((row) => row.state.nncStemRelation))),
                    nonanimateHasCalh: nonanimate.rows.some((row) => row.surface === "Calh."),
                    nonanimateMapRows: nonanimate.mapFrame.maps.find((map) => map.state === "absolutive")?.activeRows,
                    nonanimateMapColumns: nonanimate.mapFrame.maps.find((map) => map.state === "absolutive")?.activeColumns,
                    metaphoricalSubjects: Array.from(new Set(metaphorical.rows.map((row) => row.state.subject))),
                    metaphoricalRowsAllFixed: metaphorical.rows.every((row) => row.state.nncReferenceCategory === "metaphorical"),
                    metaphoricalHasZeroH: metaphorical.rows.some((row) => row.formula.includes("0-h#")),
                    metaphoricalMapRows: metaphorical.mapFrame.maps.find((map) => map.state === "absolutive")?.activeRows,
                    metaphoricalMapColumns: metaphorical.mapFrame.maps.find((map) => map.state === "absolutive")?.activeColumns,
                    metaphoricalPluralVariantsByPerson: metaphorical.mapFrame.maps
                        .find((map) => map.state === "absolutive")?.positions
                        .filter((position) => position.number === "plural")
                        .map((position) => ({
                            person: position.person,
                            formCount: position.entries.length,
                            numberForms: Array.from(new Set(position.entries.flatMap((entry) => entry.numberForms))),
                            stemRelations: Array.from(new Set(position.entries.flatMap((entry) => entry.stemRelations))),
                        })),
                    canonicalCoordinates: [...nonanimate.rows, ...metaphorical.rows]
                        .every((row) => (
                            row.paradigmAuthority
                                === "canonical-ordinary-nnc-scalar-coordinate"
                            && ctx.isClassicalNahuatlOrdinaryNncParadigmCoordinate(
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
                    independentProjections: [...nonanimate.rows, ...metaphorical.rows]
                        .every((row) => (
                            row.ordinaryNncResult
                                ?.formulaAndWrittenDerivedIndependently === true
                            && row.ordinaryNncResult?.formulaStringAuthority
                                === false
                            && row.ordinaryNncResult?.surfaceStringAuthority
                                === false
                        )),
                    tliPluralForms: tliPlural.derivedNumberForms,
                    tlPluralForms: tlPlural.derivedNumberForms,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                nonanimateReferent: "nonanimate",
                nonanimateSubjects: ["3common"],
                nonanimateRowsAllFixed: true,
                nonanimateStemRelations: ["plain", "affinity", "distributive-varietal"],
                nonanimateHasCalh: false,
                nonanimateMapRows: ["third"],
                nonanimateMapColumns: ["common"],
                metaphoricalSubjects: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
                metaphoricalRowsAllFixed: true,
                metaphoricalHasZeroH: false,
                metaphoricalMapRows: ["first", "second", "third"],
                    metaphoricalMapColumns: ["singular", "plural"],
                    metaphoricalPluralVariantsByPerson: [
                        { person: "first", formCount: 3, numberForms: ["t-in"], stemRelations: ["plain", "affinity", "distributive-varietal"] },
                        { person: "second", formCount: 3, numberForms: ["t-in"], stemRelations: ["plain", "affinity", "distributive-varietal"] },
                        { person: "third", formCount: 3, numberForms: ["t-in"], stemRelations: ["plain", "affinity", "distributive-varietal"] },
                    ],
                canonicalCoordinates: true,
                independentProjections: true,
                tliPluralForms: ["t-in"],
                tlPluralForms: [],
            }
            : null
    );
    s.eq(
        "NNC Wiktionary-style projection merges duplicate forms but preserves every typed condition row",
        typeof ctx.buildClassicalNncParadigmDisplayFrame === "function"
            ? (() => {
                const typedRow = (referent, subject = "1sg", formula = "#ni-0(cal)li-0#", surface = "Nicalli.") => ({
                    authority: "typed-selected-output",
                    formula,
                    surface,
                    state: {
                        nncState: "absolutive",
                        subject,
                        nncReferenceCategory: referent,
                        nncClausePosition: "initial",
                        sentenceMode: "statement",
                    },
                    legalWitnessTagIds: ["cn-l12-124-subject-paradigm"],
                });
                const display = ctx.buildClassicalNncParadigmDisplayFrame([
                    typedRow("animate"),
                    typedRow("metaphorical"),
                    typedRow("nonanimate", "3common", "#0-0(cal)li-0#", "Calli."),
                ]);
                const firstSingular = display.groups[0].personRows
                    .find((row) => row.person === "first").cells.singular[0];
                const thirdCommon = display.groups[0].personRows
                    .find((row) => row.person === "third").cells.common[0];
                return {
                    sourceRows: display.sourceRowCount,
                    representedRows: display.representedSourceRowCount,
                    entries: display.displayEntryCount,
                    noRowsDropped: display.noSourceRowDropped,
                    noRowsDuplicated: display.noSourceRowDuplicated,
                    mergedSourceRows: firstSingular.sourceRowIds,
                    mergedReferents: firstSingular.referents,
                    commonSurface: thirdCommon.surface,
                    commonFormula: thirdCommon.formula,
                    projectionAuthority: firstSingular.authority,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                sourceRows: 3,
                representedRows: 3,
                entries: 2,
                noRowsDropped: true,
                noRowsDuplicated: true,
                mergedSourceRows: [1, 2],
                mergedReferents: ["animate", "metaphorical"],
                commonSurface: "Calli.",
                commonFormula: "#0-0(cal)li-0#",
                projectionAuthority: "typed-paradigm-row-projection",
            }
            : null
    );
    s.eq(
        "NNC finite map accepts only typed selected-output rows and preserves diagram and exact witness evidence",
        typeof ctx.buildClassicalNncParadigmMapFrame === "function"
            ? (() => {
                const typedRow = {
                    kind: "classical-nahuatl-nnc-paradigm-row",
                    authority: "typed-selected-output",
                    formula: "#0-0(cal)li-0#",
                    surface: "Calli.",
                    state: {
                        nncType: "ordinary",
                        nncState: "absolutive",
                        subject: "3common",
                        nncReferent: "nonanimate",
                        nncNumberForm: "t-in",
                        sentenceMode: "statement",
                    },
                    legalWitnessTagIds: ["cn-l12-124-subject-paradigm"],
                    witnessRefs: [{
                        tagId: "cn-l12-124-subject-paradigm",
                        section: "12.4",
                        transcriptionLineStart: 4438,
                        transcriptionLineEnd: 4483,
                        exactWitness: "Summary of Subject Personal Pronouns in the Absolutive-State NNC",
                    }],
                    diagrammaticFrame: {
                        kind: "classical-nahuatl-nnc-diagrammatic-frame",
                        authorizationStatus: "authorized",
                        rows: [
                            { role: "Subject", expression: "#0-0( ... )li-0#" },
                            { role: "Predicate", expression: "(cal)" },
                        ],
                    },
                };
                const hostileDisplayString = {
                    ...typedRow,
                    authority: "display-string",
                    formula: "#FAKE#",
                    surface: "Fake.",
                };
                const frame = ctx.buildClassicalNncParadigmMapFrame(
                    [typedRow, hostileDisplayString],
                    "",
                    { stem: "cal", nounClass: "tli", referent: "nonanimate" }
                );
                const incompleteDiagramFrame = ctx.buildClassicalNncParadigmMapFrame([{
                    ...typedRow,
                    diagrammaticFrame: {
                        ...typedRow.diagrammaticFrame,
                        rows: [{ role: "Predicate", expression: "(cal)" }],
                    },
                }]);
                const map = frame.maps[0];
                const entry = map.positions[0].entries[0];
                return {
                    status: frame.authorizationStatus,
                    authority: frame.authority,
                    stringAuthority: frame.formulaStringAuthority,
                    candidates: frame.candidateRowCount,
                    sourceRows: frame.sourceRowCount,
                    rejectedRows: frame.rejectedUntypedRowCount,
                    representedRows: frame.representedSourceRowCount,
                    noRowsDropped: frame.noSourceRowDropped,
                    noRowsDuplicated: frame.noSourceRowDuplicated,
                    activeRows: map.activeRows,
                    activeColumns: map.activeColumns,
                    surface: entry.surface,
                    fakePresent: frame.maps.some((candidateMap) => candidateMap.positions.some((position) => (
                        position.entries.some((candidate) => candidate.surface === "Fake.")
                    ))),
                    diagramRoles: entry.diagrammaticFrame.rows.map((row) => row.role),
                    completeDiagrams: frame.allEntriesHaveSubjectPredicateDiagram,
                    missingDiagrams: frame.missingSubjectPredicateDiagramCount,
                    incompleteDiagramStatus: incompleteDiagramFrame.authorizationStatus,
                    incompleteDiagramReason: incompleteDiagramFrame.blockReason,
                    witness: entry.witnessRefs[0],
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                authority: "typed-paradigm-row-projection",
                stringAuthority: false,
                candidates: 2,
                sourceRows: 1,
                rejectedRows: 1,
                representedRows: 1,
                noRowsDropped: true,
                noRowsDuplicated: true,
                activeRows: ["third"],
                activeColumns: ["common"],
                surface: "Calli.",
                fakePresent: false,
                diagramRoles: ["Subject", "Predicate"],
                completeDiagrams: true,
                missingDiagrams: 0,
                incompleteDiagramStatus: "blocked",
                incompleteDiagramReason:
                    "typed-subject-predicate-diagram-required-for-every-map-entry",
                witness: {
                    tagId: "cn-l12-124-subject-paradigm",
                    section: "12.4",
                    transcriptionLineStart: 4438,
                    transcriptionLineEnd: 4483,
                    exactWitness: "Summary of Subject Personal Pronouns in the Absolutive-State NNC",
                },
            }
            : null
    );
    s.eq(
        "NNC possessive finite map organizes specific possessors by person and number without a display selector",
        typeof ctx.buildClassicalNncParadigmMapFrame === "function"
            ? (() => {
                const typedRow = (possessor, subject) => ({
                    kind: "classical-nahuatl-nnc-paradigm-row",
                    authority: "typed-selected-output",
                    formula: `#${subject}-0+${possessor}(pil)0-0#`,
                    surface: `${possessor}-${subject}-pil.`,
                    state: {
                        nncType: "ordinary",
                        nncState: "possessive",
                        nncPossessor: possessor,
                        subject,
                        nncReferent: "animate",
                        sentenceMode: "statement",
                    },
                    diagrammaticFrame: {
                        kind: "classical-nahuatl-nnc-diagrammatic-frame",
                        authorizationStatus: "authorized",
                        rows: [{
                            role: "Subject",
                            expression: subject,
                        }, {
                            role: "Predicate",
                            expression: "(pil)",
                        }],
                    },
                });
                const frame = ctx.buildClassicalNncParadigmMapFrame([
                    typedRow("reciprocal", "3sg"),
                    typedRow("nonspecific-human", "3pl"),
                    typedRow("1sg", "1sg"),
                    typedRow("1pl", "1sg"),
                    typedRow("2sg", "1sg"),
                    typedRow("2pl", "1sg"),
                    typedRow("3sg", "1sg"),
                    typedRow("3pl", "2pl"),
                ]);
                const possessive = frame.stateViews.find((view) => (
                    view.state === "possessive"
                ));
                const specific = possessive.possessorGroups.find((group) => (
                    group.key === "specific"
                ));
                const representedRows = possessive.possessorGroups.flatMap((group) => (
                    group.maps.flatMap((map) => map.positions.flatMap((position) => (
                        position.entries.flatMap((entry) => entry.sourceRowIds)
                    )))
                ));
                const hostileRows = [typedRow("4sg", "1sg")];
                const hostileMap =
                    ctx.buildClassicalNncParadigmMapFrame(hostileRows);
                const hostileDisplay =
                    ctx.buildClassicalNncParadigmDisplayFrame(hostileRows);
                return {
                    groups: possessive.possessorGroups.map((group) => ({
                        key: group.key,
                        label: group.label,
                        layout: group.layout,
                        possessors: group.maps.map((map) => map.possessor),
                    })),
                    matrix: {
                        status: specific.matrix.authorizationStatus,
                        rowAxis: specific.matrix.rowAxis.values,
                        columnAxis: specific.matrix.columnAxis.values,
                        positions: specific.matrix.positions.map((position) => [
                            position.person,
                            position.number,
                            position.possessor,
                        ]),
                        sourceMaps: specific.matrix.sourceMapCount,
                        representedMaps: specific.matrix.representedMapCount,
                        noMapsDropped: specific.matrix.noMapDropped,
                        noMapsDuplicated: specific.matrix.noMapDuplicated,
                    },
                    hasDisplaySelectorContract: Object.hasOwn(
                        possessive,
                        "selectedMapKey"
                    ) || Object.hasOwn(possessive, "possessorOptions"),
                    representedRows,
                    uniqueRows: new Set(representedRows).size,
                    sourceRows: frame.sourceRowCount,
                    noRowsDropped: frame.noSourceRowDropped,
                    noRowsDuplicated: frame.noSourceRowDuplicated,
                    matrixValidity: frame.specificPossessorMatricesValid,
                    hostile: {
                        mapStatus: hostileMap.authorizationStatus,
                        mapReason: hostileMap.blockReason,
                        matrixValidity:
                            hostileMap.specificPossessorMatricesValid,
                        smithStatus:
                            ctx.buildClassicalNncSmithOutputVisualFrame(
                                hostileMap,
                                hostileDisplay
                            ).authorizationStatus,
                    },
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                groups: [
                    {
                        key: "monadic",
                        label: "Monadic possessors",
                        layout: "cards",
                        possessors: [
                            "reciprocal",
                            "nonspecific-human",
                        ],
                    },
                    {
                        key: "specific",
                        label: "Specific possessors",
                        layout: "person-number-matrix",
                        possessors: [
                            "1sg",
                            "1pl",
                            "2sg",
                            "2pl",
                            "3sg",
                            "3pl",
                        ],
                    },
                ],
                matrix: {
                    status: "authorized",
                    rowAxis: ["first", "second", "third"],
                    columnAxis: ["singular", "plural"],
                    positions: [
                        ["first", "singular", "1sg"],
                        ["first", "plural", "1pl"],
                        ["second", "singular", "2sg"],
                        ["second", "plural", "2pl"],
                        ["third", "singular", "3sg"],
                        ["third", "plural", "3pl"],
                    ],
                    sourceMaps: 6,
                    representedMaps: 6,
                    noMapsDropped: true,
                    noMapsDuplicated: true,
                },
                hasDisplaySelectorContract: false,
                representedRows: [1, 2, 3, 4, 5, 6, 7, 8],
                uniqueRows: 8,
                sourceRows: 8,
                noRowsDropped: true,
                noRowsDuplicated: true,
                matrixValidity: true,
                hostile: {
                    mapStatus: "blocked",
                    mapReason:
                        "typed-specific-possessor-person-number-matrix-required",
                    matrixValidity: false,
                    smithStatus: "blocked",
                },
            }
            : null
    );
    s.eq(
        "NNC full paradigm enumerates the Canvas subject and number contract without sentence multiplication",
        typeof ctx.buildClassicalNncParadigmFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalNncParadigmFrame({
                    basalUnit: "nnc",
                    stem: "miye-c",
                    sourceEmbedStem: "miye",
                    sourceMatrixStem: "c",
                    nncType: "quantitive",
                    nncState: "absolutive",
                    nncNounClass: "zero",
                    nncPossessor: "3sg",
                    nncUseShape: "base",
                    nncSubclass: "",
                    nncNumberForm: "t-in",
                    nncReferent: "animate",
                    nncQuantitiveMatrix: "qui",
                    nncQuantitiveMatrixForm: "c",
                    nncQuantitivePredicatePluralization: "plain-variant",
                    nncClausePosition: "initial",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                });
                return {
                    status: frame.authorizationStatus,
                    subjects: Array.from(new Set(frame.rows.map((row) => row.state.subject))),
                    numberForms: Array.from(new Set(frame.rows.map((row) => row.state.nncNumberForm))),
                    sentenceModes: Array.from(new Set(frame.rows.map((row) => row.state.sentenceMode))),
                    rowsEqualCandidates: frame.rowCount === frame.candidateCount,
                    containsBlockedText: frame.rows.some((row) => `${row.formula} ${row.surface}`.includes("blocked")),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                subjects: ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"],
            numberForms: ["sounded", "t-in", "silent-silent"],
                sentenceModes: ["statement"],
                rowsEqualCandidates: true,
                containsBlockedText: false,
            }
            : null
    );
    s.eq(
        "issued NNC Source frames own lexical facts and expose only licensed operation selections",
        typeof ctx.issueCanonicalNncSourceFrame === "function"
            && typeof ctx.getCanonicalNncOperationSelectionFrame === "function"
            && typeof ctx.getClassicalNuclearClauseDiagramRenderPlan === "function"
            ? (() => {
                const source = (stem, embedStem = "", matrixStem = "") =>
                    ctx.issueCanonicalNncSourceFrame({
                        stem,
                        ...(embedStem ? { embedStem, matrixStem } : {}),
                    });
                const selection = (sourceFrame, choices) =>
                    ctx.getCanonicalNncOperationSelectionFrame(
                        sourceFrame,
                        choices
                    );
                const māi = source("māi");
                const interrogative = selection(source("ā-0"), {
                    state: "possessive",
                    subject: "1sg",
                });
                const cāTlein = selection(
                    source("cā-tl-e-in", "cā", "tl-e-in"),
                    { subject: "3pl", animacy: "animate" }
                );
                const eh = selection(source("eh"), { subject: "3sg" });
                const yeh = selection(source("yeh"), { subject: "1sg" });
                const quantitive = selection(
                    source("miye-c", "miye", "c"),
                    { subject: "1pl", animacy: "animate" }
                );
                const possessive = selection(source("cal"), {
                    state: "possessive",
                    subject: "3pl",
                    animacy: "animate",
                });
                const common = selection(source("cal"), {
                    state: "absolutive",
                    subject: "3common",
                    animacy: "nonanimate",
                });
                const hostile = selection(source("cal"), {
                    formula: "#FAKE#",
                });
                const plan = ctx.getClassicalNuclearClauseDiagramRenderPlan([
                    { role: "Subject", expression: "subject" },
                    { role: "Predicate", expression: "predicate" },
                ], null);
                return {
                    lexicalFacts: {
                        nounClass: māi.nounClass,
                        subclass: māi.subclass,
                        useShape: māi.useShape,
                        ephemeralFinalVowel: māi.ephemeralFinalVowel,
                        readOnly: māi.lexicalFactsReadOnly,
                    },
                    interrogative: {
                        state: interrogative.nncState,
                        subjects: interrogative.subjectValues,
                        selected: interrogative.selectedSubject,
                    },
                    cāTlein: {
                        subjects: cāTlein.subjectValues,
                        selected: cāTlein.selectedSubject,
                        numberForms: cāTlein.derivedNumberForms,
                    },
                    eh: {
                        subjects: eh.subjectValues,
                        selected: eh.selectedSubject,
                    },
                    yeh: {
                        subjects: yeh.subjectValues,
                        selected: yeh.selectedSubject,
                    },
                    quantitive: {
                        numberForms: quantitive.derivedNumberForms,
                        matrixForms: quantitive.derivedMatrixForms,
                        pluralizations:
                            quantitive.derivedPredicatePluralizations,
                        canAuthorizeGeneration:
                            quantitive.selectionFrameAuthorizesGeneration,
                    },
                    possessors: possessive.possessorValues,
                    stemRelations: common.stemRelationValues,
                    hostile: {
                        status: hostile.authorizationStatus,
                        reason: hostile.blockReason,
                    },
                    ungroupedRoles:
                        plan.ungroupedRows.map((row) => row.role),
                    groupedCount: plan.groupedRows.length,
                    retiredClassBoundApi:
                        typeof ctx.getClassicalNncClassBoundSelectionContract,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                lexicalFacts: {
                    nounClass: "tl",
                    subclass: "tl-2-a",
                    useShape: "truncated",
                    ephemeralFinalVowel: "i",
                    readOnly: true,
                },
                interrogative: {
                    state: "absolutive",
                    subjects: ["3sg"],
                    selected: "3sg",
                },
                cāTlein: {
                    subjects: ["3sg", "3pl"],
                    selected: "3pl",
                    numberForms: ["m-eh"],
                },
                eh: {
                    subjects: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
                    selected: "3sg",
                },
                yeh: {
                    subjects: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
                    selected: "1sg",
                },
                quantitive: {
                    numberForms: ["t-in", "silent-silent"],
                    matrixForms: ["c"],
                    pluralizations: ["internal-n", "plain-variant"],
                    canAuthorizeGeneration: false,
                },
                possessors: [
                    "1sg",
                    "2sg",
                    "3sg",
                    "1pl",
                    "2pl",
                    "3pl",
                    "reciprocal",
                    "nonspecific-human",
                ],
                stemRelations: [
                    "plain",
                    "affinity",
                    "distributive-varietal",
                ],
                hostile: {
                    status: "blocked",
                    reason:
                        "nnc-operation-selection-forbidden-authority:$.formula",
                },
                ungroupedRoles: ["Subject", "Predicate"],
                groupedCount: 0,
                retiredClassBoundApi: "undefined",
            }
            : null
    );
    s.eq(
        "Quantitive lexical alternatives are derived from Source and every paradigm alternative uses the scalar evaluator",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            && typeof ctx.getClassicalRuleLogicSurfaceState === "function"
            && typeof ctx.buildClassicalRuleLogicSurfaceMachineryFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "nnc",
                    stem: "miye-c",
                    sourceEmbedStem: "miye",
                    sourceMatrixStem: "c",
                    subject: "1pl",
                    nncAnimacy: "animate",
                };
                const internalState = ctx.getClassicalRuleLogicSurfaceState({
                    ...base,
                    nncQuantitivePredicatePluralization: "plain-variant",
                    nncQuantitiveMatrixForm: "quī",
                    nncNumberForm: "silent-silent",
                });
                const scalar = ctx.buildClassicalRuleLogicSurfaceMachineryFrame(
                    internalState
                );
                const paradigm =
                    ctx.buildClassicalNncParadigmFrame({
                        ...base,
                        nncOutputScope: "paradigm",
                        sentenceSurfaceMode: "statement",
                        sentenceNegativeMode: "positive",
                    });
                const selection =
                    ctx.getCanonicalNncOperationSelectionFrame(
                        internalState.nncTypedSourceFrame,
                        {
                            subject: "1pl",
                            animacy: "animate",
                        }
                    );
                return {
                    scalarStatus: scalar.authorizationStatus,
                    scalarFormula: scalar.formulaRealization,
                    internalMorph:
                        scalar.numberRealization.internalPluralMorph,
                    internalBelongsTo:
                        scalar.numberRealization.internalPluralBelongsTo,
                    subjectNumberBelongsTo:
                        scalar.numberRealization.subjectNumberBelongsTo,
                    retiredFieldsCannotAuthorize:
                        scalar.formulaRealization === "#ti-0(miye-c)t-in#"
                        && scalar.numberRealization.internalPluralMorph === "none",
                    derivedChoices: {
                        numberForms: selection.derivedNumberForms,
                        matrixForms: selection.derivedMatrixForms,
                        pluralizations:
                            selection.derivedPredicatePluralizations,
                        canAuthorizeGeneration:
                            selection.selectionFrameAuthorizesGeneration,
                    },
                    paradigmStatus: paradigm.authorizationStatus,
                    paradigmPointwise: paradigm.rows.every(
                        (row) => row.pointwiseEquivalent === true
                    ),
                    paradigmPluralizations: Array.from(new Set(
                        paradigm.rows.map(
                            (row) =>
                                row.state
                                    .nncQuantitivePredicatePluralization
                        )
                    )),
                    paradigmNumberForms: Array.from(new Set(
                        paradigm.rows.map(
                            (row) => row.state.nncNumberForm
                        )
                    )),
                    hasPlainFormula: paradigm.rows.some(
                        (row) =>
                            row.formula === "#ti-0(miye-c)t-in#"
                    ),
                    hasInternalFormula: paradigm.rows.some(
                        (row) =>
                            row.formula
                                === "#ti-0(miye-quī-n)t-in#"
                    ),
                    hasSilentFormula: paradigm.rows.some(
                        (row) =>
                            row.formula
                                === "#ti-0(miye-quī-n)⎕-⎕#"
                    ),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                scalarStatus: "authorized",
                scalarFormula: "#ti-0(miye-c)t-in#",
                internalMorph: "none",
                internalBelongsTo: "predicate-stem-derivation",
                subjectNumberBelongsTo: "subject-personal-pronoun",
                retiredFieldsCannotAuthorize: true,
                derivedChoices: {
                    numberForms: ["t-in", "silent-silent"],
                    matrixForms: ["c"],
                    pluralizations: ["internal-n", "plain-variant"],
                    canAuthorizeGeneration: false,
                },
                paradigmStatus: "authorized",
                paradigmPointwise: true,
                paradigmPluralizations: [
                    "not-applicable",
                    "plain-variant",
                    "internal-n",
                ],
                paradigmNumberForms: [
                    "sounded",
                    "t-in",
                    "silent-silent",
                ],
                hasPlainFormula: true,
                hasInternalFormula: true,
                hasSilentFormula: true,
            }
            : null
    );
    s.ok(
        "NNC keeps one stable genuine-choice control set and deletes lexical or derived selectors",
        rendering.includes('applyClassicalRuleLogicSelectOptionAvailability("classical-rule-logic-nnc-subject-person"')
            && rendering.includes('applyClassicalRuleLogicSelectOptionAvailability("classical-rule-logic-nnc-subject-animacy"')
            && rendering.includes('applyClassicalRuleLogicSelectOptionAvailability("classical-rule-logic-nnc-subject-number"')
            && rendering.includes('applyClassicalRuleLogicSelectOptionAvailability("classical-rule-logic-nnc-state"')
            && rendering.includes('applyClassicalRuleLogicSelectOptionAvailability("classical-rule-logic-nnc-predicate-form"')
            && rendering.includes('applyClassicalRuleLogicSelectOptionAvailability("classical-rule-logic-nnc-stem-relation"')
            && !classicalShell.includes('id="classical-rule-logic-nnc-type"')
            && !classicalShell.includes('id="classical-rule-logic-nnc-referent"')
            && !classicalShell.includes('id="classical-rule-logic-nnc-use-shape"')
            && !classicalShell.includes('id="classical-rule-logic-nnc-subclass"')
            && !classicalShell.includes('id="classical-rule-logic-nnc-number-form"')
            && rendering.includes('const renderInAuthority = nncActive && availability.renderInAuthority !== false')
            && rendering.includes('wrapper.hidden = !renderInAuthority')
            && rendering.includes('control.disabled = !renderInAuthority || !availability.available || canvasDisabled')
            && rendering.includes('wrapper.dataset.classicalAuthorityDecisionOwner = availability.decisionOwner')
            && rendering.includes('wrapper.dataset.classicalAuthorityUserInput = !renderInAuthority')
            && rendering.includes('wrapper.dataset.classicalRuleLogicGate = availability.reason')
            && rendering.includes('option.disabled = !allowed')
    );
    s.eq(
        "Stem relation is a separate Grammar choice and follows plural or nonanimate-common availability",
        typeof ctx.getClassicalNncAuthorityOptionContract === "function"
            && typeof ctx.getClassicalNncAuthorityControlAvailability === "function"
            ? (() => {
                const pluralState = {
                    nncType: "ordinary", subject: "3pl", nncReferent: "animate", stem: "cal",
                };
                const singularState = {
                    nncType: "ordinary", subject: "3sg", nncReferent: "animate", stem: "cal",
                };
                const commonState = {
                    nncType: "ordinary", subject: "3common", nncReferent: "nonanimate", stem: "cal",
                };
                const plural = ctx.getClassicalNncAuthorityOptionContract(pluralState);
                const singular = ctx.getClassicalNncAuthorityOptionContract(singularState);
                const common = ctx.getClassicalNncAuthorityOptionContract(commonState);
                const selectedSurface = typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
                    ? ctx.buildClassicalRuleLogicSurfaceFrame({
                        basalUnit: "nnc",
                        stem: "cal",
                        nncType: "ordinary",
                        nncState: "absolutive",
                        nncNounClass: "tli",
                        nncStemRelation: "affinity",
                        nncReferent: "nonanimate",
                        subject: "3common",
                        sentenceSurfaceMode: "statement",
                        sentenceNegativeMode: "positive",
                    })
                    : null;
                const stemRelationSelect = classicalShell.match(
                    /<select[^>]*id="classical-rule-logic-nnc-stem-relation"[^>]*>([\s\S]*?)<\/select>/u
                )?.[1] || "";
                return {
                    shellControl: classicalShell.includes('id="classical-rule-logic-nnc-stem-relation"'),
                    plainOption: stemRelationSelect.includes('value="plain"'),
                    affinityOption: stemRelationSelect.includes('value="affinity"'),
                    distributiveOption: stemRelationSelect.includes('value="distributive-varietal"'),
                    documentaryMetadataAbsent: !stemRelationSelect.includes("data-classical-authority-option")
                        && !stemRelationSelect.includes("data-exact-witness"),
                    pluralValues: plural.stemRelationValues,
                    singularValues: singular.stemRelationValues,
                    commonValues: common.stemRelationValues,
                    pluralAvailable: ctx.getClassicalNncAuthorityControlAvailability({ state: pluralState })["classical-rule-logic-nnc-stem-relation"].available,
                    singularAvailable: ctx.getClassicalNncAuthorityControlAvailability({ state: singularState })["classical-rule-logic-nnc-stem-relation"].available,
                    resultKind:
                        selectedSurface?.nncGrammarSurfaceContract?.kind,
                    operationStemFormation:
                        selectedSurface?.nncGrammarSurfaceContract
                            ?.operationFrame?.stemFormation,
                    selectedFormula: selectedSurface?.selectedFormula || "",
                    selectedDerivedStem:
                        selectedSurface?.nncGrammarSurfaceContract
                            ?.typedSlotFrame?.slots?.predicate?.stem || "",
                    independentProjections:
                        selectedSurface?.nncGrammarSurfaceContract
                            ?.formulaAndWrittenDerivedIndependently === true,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                shellControl: true,
                plainOption: true,
                affinityOption: true,
                distributiveOption: true,
                documentaryMetadataAbsent: true,
                pluralValues: ["plain", "affinity", "distributive-varietal"],
                singularValues: ["plain", "affinity", "distributive-varietal"],
                commonValues: ["plain", "affinity", "distributive-varietal"],
                pluralAvailable: true,
                singularAvailable: true,
                resultKind:
                    "classical-nahuatl-ordinary-nnc-result-frame",
                operationStemFormation: "affinity",
                selectedFormula: "#0-0(cā-cal)li-0#",
                selectedDerivedStem: "cā-cal",
                independentProjections: true,
            }
            : null
    );
    s.ok(
        "NNC Source exposes actual constituents while the obsolete lexical-proof control lane is deleted",
        !classicalShell.includes('data-classical-nnc-authority-heading="source"')
            && !classicalShell.includes('data-classical-nnc-authority-heading="lexical"')
            && !classicalShell.includes('id="classical-nnc-source-analysis"')
            && !classicalShell.includes('data-classical-internal-scaffold="nnc-lexical-analysis-proof-carriers"')
            && !classicalShell.includes('data-classical-result-proof-only="true"')
            && !classicalShell.includes('<div class="classical-nnc-source-analysis__heading">Lexical analysis</div>')
            && !classicalShell.includes('Describe nounstem evidence here')
            && classicalShell.includes('data-classical-nnc-authority-heading="subject"')
            && classicalShell.includes('data-classical-nnc-authority-heading="state"')
            && classicalShell.includes('data-classical-nnc-authority-heading="nounstem"')
            && !classicalShell.includes('data-classical-nnc-authority-heading="predicate"')
            && classicalShell.includes('data-classical-nnc-authority-heading="sentence"')
            && classicalShell.includes('id="classical-source-whole"')
            && classicalShell.includes('id="classical-source-embed"')
            && classicalShell.includes('id="classical-source-matrix"')
            && !classicalShell.includes('data-classical-authority-internal-mirror="nnc-source-kind"')
            && !classicalShell.includes('data-classical-nnc-authority-order="source-kind"')
            && !classicalShell.includes('data-classical-nnc-authority-order="predicate-quantitive-family"')
            && !classicalShell.includes('data-classical-nnc-authority-order="predicate-quantitive-form"')
            && !classicalShell.includes('data-classical-nnc-authority-order="predicate-quantitive-pluralization"')
            && classicalShell.includes('data-classical-nnc-authority-order="subject-number"')
            && classicalShell.includes('data-classical-nnc-authority-order="predicate-state"')
            && classicalShell.includes('data-classical-nnc-authority-order="predicate-possessor"')
            && classicalShell.includes('data-classical-nnc-authority-order="predicate-stem-relation"')
            && !rendering.includes("function syncClassicalNncSourceAnalysisControls")
            && !rendering.includes('"engine-derived-proof-carrier"')
            && !rendering.includes("[data-classical-nnc-source-analysis-control]")
            && !rendering.includes("function buildClassicalRuleLogicCurrentAuthorityEntries")
            && !rendering.includes('sourceControl?.closest?.("#classical-nnc-source-analysis")')
            && !rendering.includes("function partitionClassicalRuleLogicResultReceiptEntries")
            && !rendering.includes("function createClassicalNncResultLexicalProof")
            && !rendering.includes('className = "classical-result-lexical-proof"')
            && !rendering.includes('textContent = "Lexical analysis"')
            && rendering.includes('document.querySelectorAll("[data-classical-nnc-authority-heading]")')
            && css.includes(".classical-nnc-source-analysis__grid")
            && !css.includes(".classical-result-lexical-proof")
            && !css.includes('data-classical-nnc-authority-heading="lexical"')
            && !css.includes('data-classical-nnc-authority-order="lexical-state-policy"')
            && css.includes('[data-classical-nnc-authority-heading="subject"]')
            && css.includes('[data-classical-nnc-authority-order="subject-number"]')
            && css.includes('[data-classical-nnc-authority-order="predicate-state"]')
            && css.includes('[data-classical-nnc-authority-order="predicate-stem-relation"]')
            && css.includes('[data-classical-nnc-authority-order="sentence-type"]')
    );
    s.eq(
        "NNC Result receipt is projected from the canonical result without a parallel lexical-proof renderer",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            && typeof ctx.buildClassicalRuleLogicAuthorityReceiptEntries
                === "function"
            ? (() => {
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncState: "possessive",
                    nncPossessor: "1sg",
                    subject: "3common",
                    nncAnimacy: "nonanimate",
                });
                const entries =
                    ctx.buildClassicalRuleLogicAuthorityReceiptEntries(
                        surface
                    );
                return {
                    resultKind: surface.nncGrammarSurfaceContract?.kind,
                    subclassEntry:
                        entries.find((entry) => entry.label === "Subclass"),
                    constituentAnalysisAbsent:
                        !entries.some(
                            (entry) =>
                                entry.label === "Constituent analysis"
                        ),
                    retiredPartitionApiAbsent:
                        typeof ctx
                            .partitionClassicalRuleLogicResultReceiptEntries
                            === "undefined",
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                resultKind:
                    "classical-nahuatl-ordinary-nnc-result-frame",
                subclassEntry: {
                    role: "analysis",
                    label: "Subclass",
                    value: "tli-1",
                },
                constituentAnalysisAbsent: true,
                retiredPartitionApiAbsent: true,
            }
            : null
    );
    s.ok(
        "VNC Authority follows the Canvas hierarchy while genuine nonactive alternatives appear only when licensed",
        ["Subject", "Valence", "Verbstem", "Tense", "Sentence"].every(
            title => rendering.includes(`createPersistentSection("${title.toLowerCase()}", "${title}", "")`)
        )
            && sourcePanelHtml.includes('data-classical-source-identity-control="valence"')
            && sourcePanelHtml.includes('id="classical-rule-logic-valence"')
            && sourcePanelHtml.includes('data-classical-source-identity-control="class"')
            && sourcePanelHtml.includes('id="classical-rule-logic-class"')
            && !classicalAuthorityControlsHtml.includes('id="classical-rule-logic-valence"')
            && !classicalAuthorityControlsHtml.includes('id="classical-rule-logic-class"')
            && classicalShell.includes('data-classical-vnc-authority-order="sentence-introductory"')
            && rendering.includes('"#classical-rule-logic-controls [data-classical-vnc-authority-order]"')
            && rendering.includes("const CLASSICAL_VNC_AUTHORITY_PRESENTATION_CONTRACT = Object.freeze({")
            && rendering.includes('"classical-rule-logic-subject": Object.freeze(["3common"])')
            && rendering.includes('"classical-rule-logic-sentence-surface": Object.freeze([])')
            && rendering.includes('"classical-rule-logic-construction",')
            && rendering.includes('"classical-rule-logic-lexical-reading",')
            && rendering.includes("function syncClassicalVncAuthorityOptionPresentation")
            && rendering.includes("option.hidden = removedFromVnc")
            && rendering.includes("wrapper.dataset.classicalCanvasClassLocked = String(classSelectionContract?.dropdownLocked === true)")
            && rendering.includes("const controlVisibility = {")
            && rendering.includes("const hide = !controlVisibility[id]")
            && rendering.includes("const visible = !hide && (!canvasDisabled || retainedSingleChoiceControl)")
            && vncApplication.includes('function getClassicalNahuatlVncApplicationAllowedVoices({')
            && vncApplication.includes('"source-stem-required-before-derived-voice"')
            && rendering.includes('requestClassicalVncApplicationResult(applicationRequest)')
            && rendering.includes('control.disabled = !visible || retainedReadOnlyTense')
            && css.includes('[data-classical-vnc-authority-order="predicate-voice"]')
            && css.includes('[data-classical-vnc-authority-order="predicate-nonactive-family"]')
            && css.includes('[data-classical-vnc-authority-order="predicate-object"]')
            && css.includes('[data-classical-vnc-authority-order="sentence-antecessive"]')
    );
    s.eq(
        "NNC availability is projected only from an issued Source and its licensed operation selections",
        typeof ctx.getClassicalNncAuthorityControlAvailability === "function"
            && typeof ctx.issueCanonicalNncSourceFrame === "function"
            ? (() => {
                const availabilityFor = (stem, state) => {
                    const nncTypedSourceFrame =
                        ctx.issueCanonicalNncSourceFrame({ stem });
                    return ctx.getClassicalNncAuthorityControlAvailability({
                        state: { stem, nncTypedSourceFrame, ...state },
                    });
                };
                const interrogative = availabilityFor("ā-0", {
                    nncState: "absolutive",
                    subject: "3sg",
                });
                const ordinary = availabilityFor("cal", {
                    nncState: "absolutive",
                    subject: "3sg",
                });
                const possessive = availabilityFor("cal", {
                    nncState: "possessive",
                    subject: "3sg",
                });
                const fullParadigm = availabilityFor("māi", {
                    nncState: "absolutive",
                    nncOutputScope: "paradigm",
                    subject: "3common",
                    nncAnimacy: "nonanimate",
                });
                const openSource = ctx.issueCanonicalNncSourceFrame({
                    stem: "nemi",
                    sourceClass: "zero",
                });
                const open = ctx.getClassicalNncAuthorityControlAvailability({
                    state: {
                        stem: "nemi",
                        nncTypedSourceFrame: openSource,
                        nncOpenStemSource: true,
                        requestedNncNounClass: "zero",
                        requestedNncSourceClass: "zero",
                        nncState: "absolutive",
                        subject: "3sg",
                    },
                });
                const retiredIds = [
                    "classical-rule-logic-nnc-type",
                    "classical-rule-logic-nnc-referent",
                    "classical-rule-logic-nnc-subclass",
                    "classical-rule-logic-nnc-use-shape",
                    "classical-rule-logic-nnc-number-form",
                    "classical-rule-logic-nnc-quantitive-matrix",
                    "classical-rule-logic-nnc-quantitive-matrix-form",
                    "classical-rule-logic-nnc-quantitive-predicate-pluralization",
                ];
                return {
                    retiredKeysAbsent: retiredIds.every((id) => (
                        !Object.hasOwn(interrogative, id)
                        && !Object.hasOwn(ordinary, id)
                        && !Object.hasOwn(possessive, id)
                        && !Object.hasOwn(fullParadigm, id)
                    )),
                    interrogativePosition:
                        interrogative["classical-rule-logic-nnc-clause-position"].available,
                    ordinaryPosition:
                        ordinary["classical-rule-logic-nnc-clause-position"].available,
                    ordinaryState:
                        ordinary["classical-rule-logic-nnc-state"].available,
                    ordinaryPossessor:
                        ordinary["classical-rule-logic-nnc-possessor"].available,
                    possessivePossessor:
                        possessive["classical-rule-logic-nnc-possessor"].available,
                    paradigmState:
                        fullParadigm["classical-rule-logic-nnc-state"].available,
                    paradigmPossessor:
                        fullParadigm["classical-rule-logic-nnc-possessor"].available,
                    paradigmAnimacy:
                        fullParadigm["classical-rule-logic-nnc-subject-animacy"].available,
                    paradigmPredicateFormation:
                        fullParadigm["classical-rule-logic-nnc-predicate-form"].available,
                    paradigmStemRelation:
                        fullParadigm["classical-rule-logic-nnc-stem-relation"].available,
                    canonicalClassAvailable:
                        ordinary["classical-rule-logic-nnc-class"].available === true,
                    openClassAvailable:
                        open["classical-rule-logic-nnc-class"].available,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                retiredKeysAbsent: true,
                interrogativePosition: true,
                ordinaryPosition: false,
                ordinaryState: true,
                ordinaryPossessor: false,
                possessivePossessor: true,
                paradigmState: false,
                paradigmPossessor: false,
                paradigmAnimacy: true,
                paradigmPredicateFormation: true,
                paradigmStemRelation: false,
                canonicalClassAvailable: true,
                openClassAvailable: true,
            }
            : null
    );
    s.eq(
        "NNC lexical and derived facts remain engine-owned after obsolete proof controls are removed",
        typeof ctx.getClassicalNncAuthorityControlAvailability === "function"
            && typeof ctx.issueCanonicalNncSourceFrame === "function"
            ? (() => {
                const source = ctx.issueCanonicalNncSourceFrame({
                    stem: "cal",
                });
                const ordinary = ctx.getClassicalNncAuthorityControlAvailability({
                    state: {
                        nncTypedSourceFrame: source,
                        nncState: "absolutive",
                        subject: "3sg",
                        stem: "cal",
                    },
                });
                const suppletive = ctx.getClassicalNncAuthorityControlAvailability({
                    state: {
                        nncTypedSourceFrame: source,
                        nncState: "possessive",
                        subject: "3sg",
                        nncPossessor: "3pl",
                        stem: "cal",
                    },
                });
                const secondary = ctx.getClassicalNncAuthorityControlAvailability({
                    state: {
                        nncTypedSourceFrame: source,
                        nncState: "possessive",
                        subject: "3sg",
                        nncPossessor: "3sg",
                        stem: "cal",
                    },
                });
                const retiredControlIds = [
                    "classical-rule-logic-nnc-state-policy",
                    "classical-rule-logic-nnc-possessor-compatibility",
                    "classical-rule-logic-nnc-constituent-ambiguity",
                    "classical-rule-logic-nnc-constituent-alternative-stem",
                    "classical-rule-logic-nnc-constituent-analysis",
                    "classical-rule-logic-nnc-possessive-formation",
                    "classical-rule-logic-nnc-lesson15-target-stem",
                    "classical-rule-logic-nnc-third-plural-source-options",
                    "classical-rule-logic-nnc-suppletive-connector",
                    "classical-rule-logic-nnc-secondary-carrier",
                    "classical-rule-logic-nnc-type",
                    "classical-rule-logic-nnc-referent",
                    "classical-rule-logic-nnc-subclass",
                    "classical-rule-logic-nnc-use-shape",
                    "classical-rule-logic-nnc-number-form",
                ];
                return {
                    retiredAvailabilityKeysAbsent: retiredControlIds.every((id) => (
                        !Object.hasOwn(ordinary, id)
                        && !Object.hasOwn(suppletive, id)
                        && !Object.hasOwn(secondary, id)
                    )),
                    retiredShellControlsAbsent: retiredControlIds.every((id) => (
                        !classicalShell.includes(`id="${id}"`)
                    )),
                    lexicalFactsIssuedReadOnly:
                        source.lexicalFactsReadOnly === true,
                    sourceClass:
                        source.nounClass,
                    sourceSubclass:
                        source.subclass,
                    sourceUseShape:
                        source.useShape,
                    canonicalClassAvailable:
                        ordinary["classical-rule-logic-nnc-class"]
                            .available === true,
                    openClassControlPresent:
                        classicalShell.includes(
                            'id="classical-rule-logic-nnc-class"'
                        ),
                    canonicalPredicateOperationPresent:
                        classicalShell.includes('id="classical-rule-logic-nnc-predicate-form"')
                        && classicalShell.includes('<option value="source-stem" selected>source stem</option>'),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                retiredAvailabilityKeysAbsent: true,
                retiredShellControlsAbsent: true,
                lexicalFactsIssuedReadOnly: true,
                sourceClass: "tli",
                sourceSubclass: "tli-1",
                sourceUseShape: "base",
                canonicalClassAvailable: true,
                openClassControlPresent: true,
                canonicalPredicateOperationPresent: true,
            }
            : null
    );
    s.eq(
        "The canonical Result receipt owns source and authority facts once",
        typeof ctx.buildClassicalRuleLogicAuthorityReceiptEntries === "function"
            ? ctx.buildClassicalRuleLogicAuthorityReceiptEntries({
                basalUnit: "nnc",
                stem: "quē-z-qui",
                state: {
                    stem: "quē-z-qui",
                    subject: "3sg",
                    nncType: "quantitive",
                    nncQuantitiveMatrix: "qui",
                    nncQuantitiveMatrixForm: "quī",
                    nncQuantitivePredicatePluralization: "not-applicable",
                    nncNumberForm: "silent-silent",
                },
                machineryFrame: {
                    sourceFrame: { inherentInterrogative: false },
                },
            }).map((entry) => entry.label)
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Output scope", "Source", "Person", "Animacy", "Humanness", "Number", "Matrix family", "Matrix form", "Predicate pluralization", "Polarity", "Sentence type"]
            : null
    );
    s.eq(
        "Result receipt roles are typed at construction and cannot be changed by display labels",
        typeof ctx.buildClassicalRuleLogicAuthorityReceiptEntries === "function"
            ? (() => {
                const entries = ctx.buildClassicalRuleLogicAuthorityReceiptEntries({
                    basalUnit: "vnc",
                    state: {
                        stem: "chōca",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                        verbClass: "A",
                        valence: "intransitive",
                        vncVoice: "active",
                    },
                });
                return {
                    roles: entries.map((entry) => `${entry.label}:${entry.role}`),
                    poisonedLabelsPreserveRoles: entries
                        .map((entry, index) => ({ ...entry, label: index % 2 ? "Source" : "You chose" }))
                        .map((entry) => entry.role),
                    rendererUsesTypedRole: rendering.includes("CLASSICAL_RESULT_RECEIPT_ROLES.has(entry?.role)")
                        && !rendering.includes("RECEIPT_LABELS"),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                roles: [
                    "Output scope:view",
                    "Stem:source",
                    "Voice:choice",
                    "Subject person:choice",
                    "Subject animacy:choice",
                    "Subject humanness:choice",
                    "Subject number:choice",
                    "Mood:choice",
                    "Tense:choice",
                    "Class:analysis",
                    "Valence:analysis",
                ],
                poisonedLabelsPreserveRoles: ["view", "source", "choice", "choice", "choice", "choice", "choice", "choice", "choice", "analysis", "analysis"],
                rendererUsesTypedRole: true,
            }
            : null
    );
    s.eq(
        "The Result renderer has no documentary citation API that can become output authority",
        {
            runtimeApiAbsent: typeof ctx.getClassicalRuleLogicAndrewsCitationSummary === "undefined",
            sourceDefinitionAbsent: !rendering.includes("function getClassicalRuleLogicAndrewsCitationSummary"),
            publicSectionAttributeAbsent: !classicalShellMarkup.includes("data-andrews-section"),
        },
        {
            runtimeApiAbsent: true,
            sourceDefinitionAbsent: true,
            publicSectionAttributeAbsent: true,
        }
    );
    s.eq(
        "Full-paradigm Authority receipts identify fixed inputs instead of claiming one selected row",
        typeof ctx.buildClassicalRuleLogicAuthorityReceiptEntries === "function"
            ? ctx.buildClassicalRuleLogicAuthorityReceiptEntries({
                basalUnit: "nnc",
                state: {
                    stem: "cal",
                    subject: "3sg",
                    nncType: "ordinary",
                    nncOutputScope: "paradigm",
                    nncNounClass: "tli",
                    nncState: "absolutive",
                    nncReferent: "animate",
                    sentenceSurfaceMode: "statement",
                },
            }).map((entry) => `${entry.label}:${entry.value}`)
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Output scope:full paradigm", "Stem:(cal)", "Stem formation:source stem", "Noun class:tli", "Animacy:animate", "Sentence type:enunciado"]
            : null
    );
    s.eq(
        "Smith output-visual frames own map placement and fail closed on missing or contradictory visual structure",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            && typeof ctx.buildClassicalNncParadigmFrame === "function"
            && typeof ctx.buildClassicalNncSmithOutputVisualFrame === "function"
            && typeof ctx.buildClassicalVncParadigmFrame === "function"
            && typeof ctx.buildClassicalVncSmithOutputVisualFrame === "function"
            && typeof ctx.buildClassicalVncParadigmResultSection === "function"
            ? (() => {
                const nncFrame = ctx.buildClassicalNncParadigmFrame({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncType: "ordinary",
                    nncOutputScope: "paradigm",
                    nncNounClass: "tli",
                    nncReferent: "nonanimate",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                });
                const rejectedNncSmith = ctx.buildClassicalNncSmithOutputVisualFrame({
                    ...nncFrame.mapFrame,
                    noSourceRowDropped: false,
                }, nncFrame.displayFrame);
                const vncFrame = ctx.buildClassicalVncParadigmFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "chōca",
                    sourceTransitivity: "intransitive",
                    sourceMatrixStem: "chōca",
                    verbClass: "A",
                    requestedVerbClass: "A",
                    valence: "intransitive",
                    objectKind: "specific-projective",
                    objectPerson: "2sg",
                    sentenceNegativeMode: "positive",
                    sentenceSurfaceMode: "statement",
                }, { manifestOnly: true });
                const movedShuntlineViews = vncFrame.transitivityViews.map((view) => ({
                    ...view,
                    valenceArities: view.valenceArities.map((arityView) => ({
                        ...arityView,
                        valences: arityView.valences.map((map) => map.key === "shuntline-reflexive"
                            ? { ...map, arity: "dyadic" }
                            : map),
                    })),
                }));
                const rejectedVncSmith = ctx.buildClassicalVncSmithOutputVisualFrame({
                    fixedSourceAnalysis: vncFrame.fixedSourceAnalysis,
                    transitivityViews: movedShuntlineViews,
                    valenceArityViews: vncFrame.valenceArityViews,
                    valences: vncFrame.valences,
                    subjects: vncFrame.subjects,
                    groups: vncFrame.groups,
                    totalCandidateCount: vncFrame.totalCandidateCount,
                });
                const poisonedRawCatalogFrame = {
                    ...vncFrame,
                    transitivityViews: [],
                    valenceArityViews: [],
                    valences: [],
                };
                ctx.buildClassicalVncParadigmResultSection(poisonedRawCatalogFrame);
                const hostileConjugationSection = ctx.buildClassicalVncParadigmResultSection({
                    ...vncFrame,
                    smithVisualFrame: {
                        ...vncFrame.smithVisualFrame,
                        conjugationProjection: {
                            ...vncFrame.smithVisualFrame.conjugationProjection,
                            authorityRole: "grammar-authority",
                            grammarAuthority: true,
                            sourceValence: { key: "fabricated", label: "fabricated", structure: "FAKE" },
                        },
                    },
                });
                return {
                    nnc: {
                        status: nncFrame.smithVisualFrame.authorizationStatus,
                        role: nncFrame.smithVisualFrame.authorityRole,
                        grammarAuthority: nncFrame.smithVisualFrame.grammarAuthority,
                        axes: [nncFrame.smithVisualFrame.rowAxis.key, nncFrame.smithVisualFrame.columnAxis.key],
                        rejectedStatus: rejectedNncSmith.authorizationStatus,
                    },
                    vnc: {
                        status: vncFrame.smithVisualFrame.authorizationStatus,
                        role: vncFrame.smithVisualFrame.authorityRole,
                        grammarAuthority: vncFrame.smithVisualFrame.grammarAuthority,
                        axes: [vncFrame.smithVisualFrame.rowAxis.key, vncFrame.smithVisualFrame.columnAxis.key],
                        mapCount: vncFrame.smithVisualFrame.maps.length,
                        placementCount: vncFrame.smithVisualFrame.placements.length,
                        conjugation: {
                            status: vncFrame.smithVisualFrame.conjugationProjection.authorizationStatus,
                            role: vncFrame.smithVisualFrame.conjugationProjection.authorityRole,
                            grammarAuthority: vncFrame.smithVisualFrame.conjugationProjection.grammarAuthority,
                            sourceValence: vncFrame.smithVisualFrame.conjugationProjection.sourceValence.key,
                            stemSource: vncFrame.smithVisualFrame.conjugationProjection.stemRelationshipSource,
                        },
                        rejectedStatus: rejectedVncSmith.authorizationStatus,
                        rejectedConjugationStatus: rejectedVncSmith.conjugationProjection.authorizationStatus,
                        poisonedRawCatalogIgnored: poisonedRawCatalogFrame.valences.length === 0
                            && poisonedRawCatalogFrame.smithVisualFrame.maps.length === 6,
                        hostileConjugationCannotBecomeAuthority: hostileConjugationSection.dataset.classicalVncConjugationSurface === "blocked"
                    },
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                nnc: {
                    status: "authorized",
                    role: "output-visual-authority",
                    grammarAuthority: false,
                    axes: ["person", "subject-number"],
                    rejectedStatus: "blocked",
                },
                vnc: {
                    status: "authorized",
                    role: "output-visual-authority",
                    grammarAuthority: false,
                    axes: ["tense-mood", "subject"],
                    mapCount: 6,
                    placementCount: 6,
                    conjugation: {
                        status: "authorized",
                        role: "result-only-display-projection",
                        grammarAuthority: false,
                        sourceValence: "intransitive",
                        stemSource: "authorized-row-typed-predicate-slots",
                    },
                    rejectedStatus: "blocked",
                    rejectedConjugationStatus: "blocked",
                    poisonedRawCatalogIgnored: true,
                    hostileConjugationCannotBecomeAuthority: true,
                },
            }
            : null
    );
    s.ok(
        "VNC full paradigm uses the typed source Valence in a person-first table with batched hydration",
        rendering.includes('label: "Intransitive VNC formula"')
            && rendering.includes('label: "Transitive VNC formulas"')
            && rendering.includes('label: "Vacant Valence position"')
            && rendering.includes('description: "Intransitive VNC formula"')
            && rendering.includes('label: "Monadic Valence position"')
            && rendering.includes('description: "Transitive VNC formula: +va(STEM)"')
            && rendering.includes('label: "Dyadic Valence position"')
            && rendering.includes('description: "Transitive VNC formula: +va¹-va²(STEM)"')
            && rendering.includes('label: "Shuntline reflexive/reciprocative object"')
            && rendering.includes('structure: "+ne(STEM)"')
            && !rendering.includes('description: "One Valence position"')
            && !rendering.includes('description: "Two Valence subpositions"')
            && !rendering.includes('transitivitySwitch.setAttribute("aria-label", "VNC formula type")')
            && !rendering.includes('valenceAritySwitch.setAttribute("aria-label", "Transitive VNC formula by Valence position")')
            && !rendering.includes('button.dataset.classicalVncTransitivity = transitivityView.key')
            && !rendering.includes('button.dataset.classicalVncValenceArity = arityView.key')
            && rendering.includes('const sourceValenceMaps = selectedValenceMap ? [selectedValenceMap] : []')
            && rendering.includes('kind: "classical-nahuatl-vnc-paradigm-conjugation-projection"')
            && !rendering.includes('studyProjection')
            && !rendering.includes('classical-nahuatl-vnc-paradigm-study-projection')
            && rendering.includes('buildClassicalVncParadigmFrame(state, {')
            && rendering.includes('buildClassicalVncParadigmFrame(paradigmFrame.generationBaseState || {}, {')
            && rendering.includes('valenceKeys: [valenceMap.key]')
            && rendering.includes('groupKeys: [group.key]')
            && rendering.includes('tenseKeys: tenses')
            && rendering.includes('subjectKeys: smithSubjects')
            && rendering.includes('const hydrationTasks = smithGroups.flatMap')
            && rendering.includes('const generatedGroupCache = new Map()')
            && rendering.includes('generatedGroupCache.get(cacheKey)')
            && rendering.includes('generatedGroupCache.set(cacheKey, generatedGroupFrame)')
            && rendering.includes('typeof targetObject.requestAnimationFrame === "function"')
            && rendering.includes('conjugationGroups.isConnected === false')
            && rendering.includes('loading.textContent = "Preparing typed forms…"')
            && rendering.includes('classicalVncFirstResultPaintMs')
            && rendering.includes('classicalVncResultCompleteMs')
            && !rendering.includes('setTimeout(scheduleHydrationStep, 40)')
            && rendering.includes('"classical-rule-logic-vnc-subject-animacy"')
            && !rendering.slice(
                rendering.indexOf("const CLASSICAL_VNC_FULL_PARADIGM_ENUMERATED_CONTROL_IDS"),
                rendering.indexOf("function getClassicalVncParadigmMorphologicalAspect")
            ).includes('"classical-rule-logic-object"')
            && rendering.includes('section.dataset.classicalVncConjugationSurface = conjugationAuthorized ? "single-table" : "blocked"')
            && !rendering.includes('classical-rule-surface__vnc-presentation-switch')
            && !rendering.includes('classicalVncParadigmPresentation')
            && rendering.includes('const source = smithVisualFrame?.fixedSourceAnalysis || {}')
            && rendering.includes('const selectedValenceMap = smithValenceMaps.find(valenceMap => valenceMap.key === source.valence)')
            && rendering.includes('conjugationPanel.setAttribute("aria-label", "Generated VNC forms")')
            && rendering.includes('conjugationPanel.dataset.classicalAuthorityRole = "result-only-display-projection"')
            && rendering.includes('conjugationPanel.dataset.classicalGrammarAuthority = "false"')
            && !rendering.includes('matrixDisclosure')
            && !rendering.includes('analysisDisclosure')
            && !rendering.includes('hydrateObjectMatrix')
            && !rendering.includes('classical-rule-surface__vnc-object-matrix')
            && !rendering.includes('classical-rule-surface__vnc-paradigm-chart')
            && !rendering.includes('classical-rule-surface__vnc-valence-map')
            && rendering.includes("registerConjugationRows(groupRows)")
            && rendering.includes('copyProjectionAuthority: "authorized-row-surfaces-only"')
            && rendering.includes('lines.push(["Person", ...visibleTenses.map(tense => tenseLabels[tense] || tense)].join("\\t"))')
            && rendering.includes('personHeader.textContent = "Person"')
            && rendering.includes('smithSubjects.forEach(subject => {')
            && rendering.includes('visibleTenses.forEach(tense => {')
            && rendering.includes('td.dataset.classicalVncParadigmTense = tenseLabels[tense] || tense')
            && !rendering.includes('resultObjectSelect.dataset.classicalVncResultObject = "true"')
            && !rendering.includes('const resultObjectAvailable = selectedValenceMap?.key === "specific-projective"')
            && rendering.includes('conjugationPanel.append(conjugationHeading, conjugationGroups)')
            && rendering.includes('section.append(heading, conjugationPanel)')
            && !rendering.includes('objectSelection: `specific-projective:${objectPerson}`')
            && !rendering.includes('const replacement = buildClassicalVncParadigmResultSection(nextFrame)')
            && !rendering.includes('setParadigmPresentation')
            && !rendering.includes('activeTransitivity')
            && !rendering.includes('activeTransitiveArity')
            && css.includes('.classical-rule-surface__vnc-result-object')
            && css.includes('.classical-rule-surface__vnc-conjugation')
            && !css.includes('.classical-rule-surface__vnc-disclosure')
            && !css.includes('.classical-rule-surface__vnc-object-matrix')
            && !css.includes('.classical-rule-surface__vnc-valence-map')
            && !css.includes('.classical-rule-surface__vnc-presentation-switch')
            && css.includes('.classical-rule-surface__vnc-conjugation-heading')
            && css.includes('.classical-rule-surface__vnc-stem-relationship-item')
            && !rendering.includes('is-current-selection')
            && !rendering.includes('classicalVncCurrentSelection')
            && !css.includes('.classical-rule-surface__vnc-paradigm-form.is-current-selection > summary')
            && css.includes('.classical-rule-surface__vnc-result-object[hidden]')
            && css.includes('.classical-rule-surface__vnc-valence-loading')
            && css.includes('overflow-x: clip')
            && css.includes('grid-template-columns: repeat(2, minmax(0, 1fr))')
            && css.includes('content: attr(data-classical-vnc-paradigm-tense)')
            && css.includes('container-type: inline-size')
            && css.includes('width: min(28rem, 78cqi)')
            && css.includes('.classical-rule-surface__vnc-paradigm-form[open]')
            && css.includes('box-shadow: 0 10px 24px')
    );
    s.eq(
        "VNC full paradigm enumerates Appendix A dimensions through typed selected outputs",
        ctx.__TEST_RUNTIME_MODE__ === "module" && typeof ctx.buildClassicalVncParadigmFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalVncParadigmFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "chōca",
                    sourceTransitivity: "intransitive",
                    sourceEmbedStem: "",
                    sourceMatrixStem: "chōca",
                    verbClass: "A",
                    requestedVerbClass: "A",
                    valence: "intransitive",
                    requestedValence: "intransitive",
                    objectKind: "specific-projective",
                    objectPerson: "2sg",
                    directionalPrefix: "",
                    tlaFusion: false,
                    sentenceNegativeMode: "positive",
                    polarityMode: "positive",
                    sentenceSurfaceMode: "statement",
                });
                const futureOptative = frame.rows.filter((row) => row.mood === "optative" && row.tense === "future");
                const preteritOptative = frame.rows.filter((row) => row.mood === "optative" && row.tense === "preterit");
                const shuntlineRows = frame.rows.filter((row) => row.valence === "shuntline-reflexive");
                const nonShuntlineRows = frame.rows.filter((row) => row.valence !== "shuntline-reflexive");
                const manifest = ctx.buildClassicalVncParadigmFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "chōca",
                    sourceTransitivity: "intransitive",
                    sourceMatrixStem: "chōca",
                    verbClass: "A",
                    requestedVerbClass: "A",
                    valence: "intransitive",
                    objectKind: "specific-projective",
                    objectPerson: "2sg",
                    sentenceNegativeMode: "positive",
                    sentenceSurfaceMode: "statement",
                }, { manifestOnly: true });
                const oneGroup = ctx.buildClassicalVncParadigmFrame(manifest.generationBaseState, {
                    valenceKeys: ["intransitive"],
                    groupKeys: ["imperfective-indicative"],
                });
                const oneTense = ctx.buildClassicalVncParadigmFrame(manifest.generationBaseState, {
                    valenceKeys: ["intransitive"],
                    groupKeys: ["imperfective-indicative"],
                    tenseKeys: ["present"],
                });
                const oneSubjectCoordinate = ctx.buildClassicalVncParadigmFrame(manifest.generationBaseState, {
                    valenceKeys: ["intransitive"],
                    groupKeys: ["imperfective-indicative"],
                    tenseKeys: ["present"],
                    subjectKeys: ["1sg"],
                });
                const renderedSection = ctx.buildClassicalVncParadigmResultSection(frame);
                return {
                    status: frame.authorizationStatus,
                    candidates: frame.candidateCount,
                    rows: frame.rowCount,
                    valences: frame.valences.map((valenceMap) => valenceMap.key),
                    valenceCounts: frame.valences.map((valenceMap) => [
                        valenceMap.key,
                        frame.rows.filter((row) => row.valence === valenceMap.key).length,
                    ]),
                    valenceArities: frame.valenceArityViews.map((arityView) => [
                        arityView.key,
                        arityView.valences.map((valenceMap) => valenceMap.key),
                    ]),
                    transitivityViews: frame.transitivityViews.map((transitivityView) => [
                        transitivityView.key,
                        transitivityView.valenceArities.map((arityView) => arityView.key),
                    ]),
                    everyRowHasAuthorizedArity: frame.rows.every((row) => (
                        frame.valences.some((valenceMap) => (
                            valenceMap.key === row.valence
                            && valenceMap.transitivity === row.transitivity
                            && valenceMap.arity === row.valenceArity
                        ))
                    )),
                    renderedSectionCreated: Boolean(renderedSection),
                    lazyManifest: {
                        status: manifest.authorizationStatus,
                        lazy: manifest.lazyGeneration,
                        candidatesEvaluated: manifest.candidateCount,
                        totalCoordinates: manifest.totalCandidateCount,
                        rows: manifest.rowCount,
                    },
                    oneGroup: {
                        candidates: oneGroup.candidateCount,
                        rows: oneGroup.rowCount,
                        allTyped: oneGroup.rows.every((row) => row.typedSlotFrameKind === "classical-nahuatl-vnc-slot-frame"),
                    },
                    oneTense: {
                        candidates: oneTense.candidateCount,
                        rows: oneTense.rowCount,
                        tenses: Array.from(new Set(oneTense.rows.map((row) => row.tense))),
                        allTyped: oneTense.rows.every((row) => row.typedSlotFrameKind === "classical-nahuatl-vnc-slot-frame"),
                    },
                    oneSubjectCoordinate: {
                        candidates: oneSubjectCoordinate.candidateCount,
                        rows: oneSubjectCoordinate.rowCount,
                        subjects: oneSubjectCoordinate.rows.map((row) => row.subject),
                        allTyped: oneSubjectCoordinate.rows.every((row) => row.typedSlotFrameKind === "classical-nahuatl-vnc-slot-frame"),
                    },
                    omittedByValence: frame.omittedByValence,
                    omissionReasons: frame.omissionReasons,
                    groups: frame.groups.map((group) => group.key),
                    allRowsTyped: frame.rows.every((row) => row.typedSlotFrameKind === "classical-nahuatl-vnc-slot-frame"),
                    noStringAuthority: frame.formulaStringAuthority === false
                        && frame.rows.every((row) => row.formulaStringAuthority === false && row.displayTextAuthority === false),
                    shuntlineUsesMonadicNe: shuntlineRows.length === 66
                        && shuntlineRows.every((row) => row.formula.includes("+ne(")),
                    neDoesNotLeakIntoOtherValences: nonShuntlineRows.every((row) => !row.formula.includes("+ne(")),
                    futureOptativeRows: futureOptative.length,
                    preteritOptativeRows: preteritOptative.length,
                    preteritOptativeHasAntecessive: preteritOptative.every((row) => row.sentenceFormula.includes("ō#")),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "authorized",
                candidates: 78,
                rows: 66,
                valences: [
                    "intransitive",
                    "shuntline-reflexive",
                    "projective-human",
                    "projective-nonhuman",
                    "specific-projective",
                    "mainline-reflexive",
                ],
                valenceCounts: [
                    ["intransitive", 66],
                    ["shuntline-reflexive", 0],
                    ["projective-human", 0],
                    ["projective-nonhuman", 0],
                    ["specific-projective", 0],
                    ["mainline-reflexive", 0],
                ],
                valenceArities: [
                    ["vacant", ["intransitive"]],
                    ["monadic", ["shuntline-reflexive", "projective-human", "projective-nonhuman"]],
                    ["dyadic", ["specific-projective", "mainline-reflexive"]],
                ],
                transitivityViews: [
                    ["intransitive", ["vacant"]],
                    ["transitive", ["monadic", "dyadic"]],
                ],
                everyRowHasAuthorizedArity: true,
                renderedSectionCreated: true,
                lazyManifest: {
                    status: "authorized",
                    lazy: true,
                    candidatesEvaluated: 0,
                    totalCoordinates: 78,
                    rows: 0,
                },
                oneGroup: {
                    candidates: 30,
                    rows: 24,
                    allTyped: true,
                },
                oneTense: {
                    candidates: 6,
                    rows: 6,
                    tenses: ["present"],
                    allTyped: true,
                },
                oneSubjectCoordinate: {
                    candidates: 1,
                    rows: 1,
                    subjects: ["1sg"],
                    allTyped: true,
                },
                omittedByValence: { intransitive: 12 },
                omissionReasons: {
                    "vnc-irregular-paradigm-tense-not-authorized-for-selected-verbstem": 12,
                },
                groups: [
                    "imperfective-indicative",
                    "perfective-indicative",
                    "imperfective-optative",
                    "perfective-optative",
                    "perfective-admonitive",
                ],
                allRowsTyped: true,
                noStringAuthority: true,
                shuntlineUsesMonadicNe: false,
                neDoesNotLeakIntoOtherValences: true,
                futureOptativeRows: 6,
                preteritOptativeRows: 6,
                preteritOptativeHasAntecessive: true,
            }
            : null
    );

    s.eq(
        "Prepared VNC paradigm plans are pointwise scalar-equivalent and reject copied or string-authority input",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            && typeof ctx.prepareClassicalNahuatlVncParadigmPlan === "function"
            && typeof ctx.projectClassicalNahuatlVncParadigmCoordinates === "function"
            ? (() => {
                const request = {
                    sourceStem: "chōca",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    sourceValence: "intransitive",
                    objectKind: "none",
                    requestedDerivation: "direct",
                    sourceVoice: "active",
                    requestedVoice: "active",
                    outputScope: "paradigm",
                };
                const plan = ctx.prepareClassicalNahuatlVncParadigmPlan(request);
                const coordinates = [
                    { subject: "1sg", mood: "indicative", tense: "present" },
                    { subject: "3pl", mood: "indicative", tense: "preterit" },
                ];
                const projected = ctx.projectClassicalNahuatlVncParadigmCoordinates(plan, coordinates);
                const scalar = coordinates.map((coordinate) => ctx.evaluateClassicalNahuatlVncApplication({
                    ...request,
                    ...coordinate,
                }));
                const copiedPlanResult = ctx.projectClassicalNahuatlVncParadigmCoordinates({ ...plan }, coordinates.slice(0, 1))[0];
                const hostileCoordinate = ctx.projectClassicalNahuatlVncParadigmCoordinates(plan, [{
                    ...coordinates[0],
                    formula: "#forged#",
                    surface: "Forged.",
                    evidence: "fabricated",
                }])[0];
                return {
                    planStatus: plan.authorizationStatus,
                    planCanonical: ctx.isClassicalNahuatlVncParadigmPlan(plan),
                    planFrozen: Object.isFrozen(plan),
                    projectedCanonical: projected.every((frame) => ctx.isClassicalNahuatlVncParadigmCoordinateFrame(frame)),
                    pointwiseEquivalent: projected.every((frame, index) => (
                        frame.authorizationStatus === scalar[index].authorizationStatus
                        && frame.formulaRealization === scalar[index].resultFrame?.formulaRealization
                        && frame.surfaceRealization === scalar[index].resultFrame?.surfaceRealization
                        && frame.typedSlotFrame?.semanticIdentity === scalar[index].resultFrame?.finalTypedVncSlotFrame?.semanticIdentity
                    )),
                    copiedPlanBlocked: copiedPlanResult.blockReason,
                    hostileCoordinateBlocked: hostileCoordinate.blockReason,
                    hostileRejectedFields: hostileCoordinate.rejectedFields,
                    stringAuthority: projected.map((frame) => [frame.formulaStringAuthority, frame.surfaceStringAuthority]),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                planStatus: "authorized",
                planCanonical: true,
                planFrozen: true,
                projectedCanonical: true,
                pointwiseEquivalent: true,
                copiedPlanBlocked: "classical-vnc-paradigm-plan-not-issued-by-service",
                hostileCoordinateBlocked: "classical-vnc-paradigm-coordinate-fields-rejected",
                hostileRejectedFields: ["formula", "surface", "evidence"],
                stringAuthority: [[false, false], [false, false]],
            }
            : null
    );

    s.eq(
        "possessor choices use canonical semantic IDs while third-plural m or n remains contextual",
        typeof ctx.issueCanonicalNncSourceFrame === "function"
            && typeof ctx.getCanonicalNncOperationSelectionFrame === "function"
            ? (() => {
            const source = ctx.issueCanonicalNncSourceFrame({ stem: "cal" });
            const applicationSource =
                ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
                    stem: "cal",
                });
            const ordinary =
                ctx.getCanonicalNncOperationSelectionFrame(source, {
                    state: "possessive",
                    possessor: "3pl",
                    subject: "3common",
                    animacy: "nonanimate",
                });
            const operation =
                ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
                applicationSource,
                {
                    state: "possessive",
                    possessor: "3pl",
                    subject: "3sg",
                    metaphoricalUse: true,
                }
            );
            const result = ctx.requestClassicalOrdinaryNncResult(
                applicationSource,
                operation
            );
            return {
                shellHasExactPossessorSpellings: classicalShell.includes("nonspecific human tē")
                    && classicalShell.includes("nonspecific nonhuman tla")
                    && !classicalShell.includes("Third-plural possessor form"),
                ordinaryPossessors: ordinary.possessorValues,
                ordinarySelected: ordinary.selectedPossessor,
                formIsEngineOwned:
                    result?.authorizationStatus === "authorized"
                    && result.contextualRealizations
                        ?.thirdPluralPossessorSt2 === "n"
                    && result.contextualRealizations
                        ?.userSelectionAuthority === false
                    && !rendering.includes(
                        "requestClassicalThirdPluralPossessor"
                    )
                    && typeof ctx.requestClassicalThirdPluralPossessor
                        === "undefined"
                    && !rendering.includes("function buildClassicalNncThirdPluralPossessorVariantFrames")
                    && !css.includes(".classical-rule-surface__single-nnc-variants"),
            };
        })() : null,
        ctx.__TEST_RUNTIME_MODE__ === "module" ? {
            shellHasExactPossessorSpellings: true,
            ordinaryPossessors: [
                "1sg",
                "2sg",
                "3sg",
                "1pl",
                "2pl",
                "3pl",
                "reciprocal",
                "nonspecific-human",
            ],
            ordinarySelected: "3pl",
            formIsEngineOwned: true,
        } : null
    );

    s.eq(
        "Lesson 13 live Canvas derives one third-plural possessor form and ignores stale selection",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function" ? (() => {
            const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "nnc",
                stem: "cal",
                nncState: "possessive",
                nncPossessor: "3pl",
                nncNounClass: "tli",
                nncSubclass: "tli-1",
                subject: "3common",
                nncAnimacy: "nonanimate",
                nncThirdPluralPossessorSt2: "select",
            });
            return {
                status: frame.authorizationStatus,
                blockReason: frame.blockReason,
                selectedFormula: frame.selectedFormula,
                surface: frame.sentenceSurfaceDisplay,
                variants: frame.nncThirdPluralPossessorVariantFrames,
            };
        })() : null,
        ctx.__TEST_RUNTIME_MODE__ === "module" ? {
            status: "authorized",
            blockReason: "",
            selectedFormula: "#0-0+ī-n(cal)0-0#",
            surface: "Īncal.",
            variants: [],
        } : null
    );

    s.eq(
        "Lesson 14.8 live Canvas accepts one typed stem and ignores retired alternative-analysis state",
        typeof ctx.getClassicalNncAuthorityOptionContract === "function"
            && typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
            const shared = {
                basalUnit: "nnc",
                stem: "cal",
                nncState: "absolutive",
                nncNounClass: "tli",
                subject: "3common",
                nncReferent: "nonanimate",
            };
            const baseline = ctx.buildClassicalRuleLogicSurfaceFrame(shared);
            const poisoned = ctx.buildClassicalRuleLogicSurfaceFrame({
                ...shared,
                nncConstituentAmbiguityKind: "front-o",
                nncConstituentAlternativeStem: "FAKE",
                nncConstituentAnalysisId: "alternative-typed-slots",
            });
            const contract = ctx.getClassicalNncAuthorityOptionContract(poisoned.state);
            const retiredFields = [
                "constituentAmbiguityValues",
                "selectedConstituentAmbiguityKind",
                "constituentAnalysisValues",
                "selectedConstituentAnalysisId",
            ];
            return {
                sourceStem: poisoned.state.stem,
                sameFormula: poisoned.selectedFormula === baseline.selectedFormula,
                sameWritten:
                    poisoned.sentenceSurfaceDisplay
                    === baseline.sentenceSurfaceDisplay,
                retiredStateAbsent: [
                    "nncConstituentAmbiguityKind",
                    "nncConstituentAlternativeStem",
                    "nncConstituentAnalysisId",
                ].every((key) => !Object.hasOwn(poisoned.state, key)),
                retiredContractFieldsAbsent:
                    retiredFields.every((key) => !Object.hasOwn(contract, key)),
                retiredControlsAbsent:
                    !classicalShell.includes("Constituent ambiguity")
                    && !classicalShell.includes("Alternative nounstem")
                    && !classicalShell.includes("Constituent analysis"),
                retiredRendererPathAbsent:
                    !rendering.includes("selectedConstituentAnalysisId")
                    && !rendering.includes("nncConstituentAlternativeStem"),
            };
        })() : null,
        ctx.__TEST_RUNTIME_MODE__ === "module" ? {
            sourceStem: "cal",
            sameFormula: true,
            sameWritten: true,
            retiredStateAbsent: true,
            retiredContractFieldsAbsent: true,
            retiredControlsAbsent: true,
            retiredRendererPathAbsent: true,
        } : null
    );

    s.eq(
        "NNC live Canvas ignores loose lexical policy claims and keeps Predicate State operative",
        typeof ctx.getClassicalRuleLogicSurfaceState === "function"
            && typeof ctx.getClassicalNncAuthorityOptionContract === "function"
            && typeof ctx.getClassicalNncAuthorityControlAvailability === "function"
            ? (() => {
                const state = ctx.getClassicalRuleLogicSurfaceState({
                    basalUnit: "nnc",
                    stem: "cal",
                    nncState: "possessive",
                    nncStatePolicy: "naturally-possessed",
                    naturalPossessionPolicy: "naturally-possessed",
                });
                const contract = ctx.getClassicalNncAuthorityOptionContract(state);
                const availability = ctx.getClassicalNncAuthorityControlAvailability({ state }, contract);
                return {
                    statePolicyCarrierAbsent:
                        !Object.hasOwn(state, "nncStatePolicy")
                        && !Object.hasOwn(contract, "selectedStatePolicy")
                        && !Object.hasOwn(contract, "statePolicyValues"),
                    selectedState: state.nncState,
                    stateValues: contract.stateValues,
                    stateControl: availability["classical-rule-logic-nnc-state"],
                    retiredCarrierAbsent:
                        !classicalShell.includes('id="classical-rule-logic-nnc-state-policy"')
                        && !rendering.includes("CLASSICAL_NNC_READ_ONLY_PROOF_CONTROL_DEFAULTS"),
                    loosePolicyIgnored: !rendering.includes("const requestedNncStatePolicy = String(overrides.nncStatePolicy"),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                statePolicyCarrierAbsent: true,
                selectedState: "possessive",
                stateValues: ["absolutive", "possessive"],
                stateControl: {
                    available: true,
                    reason: "canvas-ordinary-nnc-allows-state-selection",
                    decisionOwner: "user",
                    renderInAuthority: true,
                },
                retiredCarrierAbsent: true,
                loosePolicyIgnored: true,
            }
            : null
    );

    s.eq(
        "Retired NNC proof-carrier fields cannot change the live canonical result",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const shared = {
                    basalUnit: "nnc",
                    stem: "cal",
                    nncState: "possessive",
                    nncNounClass: "tli",
                    nncSubclass: "tli-1",
                    nncPossessor: "1sg",
                    subject: "3common",
                    nncAnimacy: "nonanimate",
                };
                const baseline = ctx.buildClassicalRuleLogicSurfaceFrame(shared);
                const poisoned = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...shared,
                    nncStatePolicy: "naturally-possessed",
                    naturalPossessionPolicy: "never-possessive",
                    nncPossessorCompatibility: "relational-tla",
                    nncConstituentAmbiguityKind: "front-o",
                    nncConstituentAlternativeStem: "FAKE",
                    nncConstituentAnalysisId: "alternative-typed-slots",
                    nncPossessiveFormation: "suppletive",
                    nncLesson15TargetStem: "FAKE",
                    nncSuppletiveConnector: "uh",
                    nncSecondaryPossessorCarrier: "t",
                    nncThirdPluralPossessorOptions: "n",
                    nncThirdPluralPossessorSt2: "m",
                });
                return {
                    baseline: {
                        status: baseline.authorizationStatus,
                        formula: baseline.selectedFormula,
                        surface: baseline.sentenceSurfaceDisplay,
                    },
                    poisoned: {
                        status: poisoned.authorizationStatus,
                        formula: poisoned.selectedFormula,
                        surface: poisoned.sentenceSurfaceDisplay,
                    },
                    canonicalResultKind: poisoned.machineryFrame?.kind,
                    independentProjections:
                        poisoned.nncGrammarSurfaceContract
                            ?.formulaAndWrittenDerivedIndependently === true,
                    retiredUiLaneAbsent:
                        !rendering.includes("CLASSICAL_NNC_READ_ONLY_PROOF_CONTROL_DEFAULTS")
                        && !classicalShell.includes("data-classical-result-proof-only"),
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                baseline: {
                    status: "authorized",
                    formula: "#0-0+n-o(cal)0-0#",
                    surface: "Nocal.",
                },
                poisoned: {
                    status: "authorized",
                    formula: "#0-0+n-o(cal)0-0#",
                    surface: "Nocal.",
                },
                canonicalResultKind:
                    "classical-nahuatl-ordinary-nnc-result-frame",
                independentProjections: true,
                retiredUiLaneAbsent: true,
            }
            : null
    );

    s.eq(
        "Lesson 15 Canvas stem formations collapse surface variants into grammatical operations",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            && typeof ctx.getClassicalNncAuthorityOptionContract === "function"
            && typeof ctx.getClassicalNncAuthorityControlAvailability === "function"
            ? (() => {
                const cases = [
                    { stem: "tēuc", option: "yo-matrix", nncState: "absolutive", subject: "3common", nncReferent: "nonanimate", nncSourceClass: "tli-1" },
                    { stem: "pil", option: "yo-matrix", nncState: "absolutive", subject: "3common", nncReferent: "nonanimate", nncSourceClass: "tli-1" },
                    { stem: "tēuc", option: "yo-matrix", nncState: "possessive", subject: "1sg", nncPossessor: "2sg", nncSourceClass: "tli-1" },
                    { stem: "pil", option: "yo-matrix", nncState: "possessive", subject: "1sg", nncPossessor: "2sg", nncSourceClass: "tli-1" },
                    { stem: "tēuc", option: "tec-title", nncState: "possessive", subject: "3sg", nncPossessor: "1pl", nncSourceClass: "tli-1" },
                    { stem: "cal", option: "secondary-general-use", nncState: "possessive", subject: "3sg", nncPossessor: "1sg", nncSourceClass: "tli-1", nncMetaphoricalUse: true },
                    { stem: "cal", option: "analogical-restricted-use", nncState: "absolutive", subject: "3common", nncSourceClass: "tli-1" },
                    { stem: "māi", option: "source-stem", nncState: "possessive", subject: "3sg", nncPossessor: "3sg", nncSourceClass: "tl-2-a", nncTl2ARealization: "reclassify-1a" },
                    { stem: "māi", option: "source-stem", nncState: "absolutive", subject: "3common", nncReferent: "nonanimate", nncSourceClass: "tl-2-a", nncTl2ARealization: "reclassify-1a" },
                ];
                const outputs = cases.map(({ option, ...input }) => {
                    const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                        basalUnit: "nnc",
                        ...input,
                        nncPredicateOptionId: option,
                        nncPossessiveFormation: "suppletive",
                        nncLesson15TargetStem: "POISON",
                        nncSuppletiveConnector: "uh",
                        nncSecondaryPossessorCarrier: "t",
                    });
                    const contract = ctx.getClassicalNncAuthorityOptionContract(frame.state);
                    const availability = ctx.getClassicalNncAuthorityControlAvailability({ state: frame.state }, contract);
                    return {
                        status: frame.authorizationStatus,
                        option:
                            frame.machineryFrame.operationFrame
                                .predicateFormation,
                        values: contract.predicateOptionValues,
                        target:
                            frame.machineryFrame.stemOperation.targetStem,
                        targetDerivation:
                            frame.machineryFrame.stemOperation
                                .targetStemDerivation,
                        canvasOptionAuthority:
                            frame.machineryFrame.stemOperation
                                .documentaryOptionAuthority,
                        formulaContainsDerivedPredicate:
                            frame.selectedFormula.includes(
                                `(${frame.machineryFrame
                                    .stemOperation.targetStem})`
                            ),
                        visible: availability["classical-rule-logic-nnc-predicate-form"].renderInAuthority,
                        enabled: availability["classical-rule-logic-nnc-predicate-form"].available,
                    };
                });
                return {
                    hasStemFormationControl: classicalShell.includes('data-classical-nnc-authority-order="stem-formation"')
                        && classicalShell.includes('id="classical-rule-logic-nnc-predicate-form"')
                        && classicalShell.includes('>(-yō)-tl- matrix</option>')
                        && classicalShell.includes('>secondary general-use stem (tē-)</option>')
                        && classicalShell.includes('>tla possessive predicate → restricted-use stem</option>')
                        && !classicalShell.includes('>tl 2-A → 1-A by ephemeral i loss</option>')
                        && !classicalShell.includes('<option value="tl-2-a-to-1-a">')
                        && classicalShell.includes('id="classical-rule-logic-nnc-tl2a-realization"')
                        && !classicalShell.includes('value="suffix-lo"')
                        && !classicalShell.includes('value="suffix-yo"')
                        && !classicalShell.includes('>(ti-)</option>')
                        && !classicalShell.includes('>(t-)</option>'),
                    hiddenTargetIsNotRead: (() => {
                        const start = rendering.indexOf(
                            "function buildClassicalOrdinaryNncApplicationOperationFrame"
                        );
                        const end = rendering.indexOf(
                            "function buildClassicalOrdinaryNncApplicationResultFrame",
                            start
                        );
                        const semanticAdapter =
                            start >= 0 && end > start
                                ? rendering.slice(start, end)
                                : "";
                        return semanticAdapter.includes(
                            "predicateFormation:"
                        )
                            && !semanticAdapter.includes(
                                "nncLesson15TargetStem"
                            );
                    })(),
                    outputs,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                hasStemFormationControl: true,
                hiddenTargetIsNotRead: true,
                outputs: [
                    { status: "authorized", option: "yo-matrix", values: ["source-stem", "yo-matrix", "analogical-restricted-use"], target: "tēuc-yō", targetDerivation: "canonical-semantic-operation", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                    { status: "authorized", option: "yo-matrix", values: ["source-stem", "yo-matrix", "analogical-restricted-use"], target: "pil-lō", targetDerivation: "canonical-semantic-operation", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                    { status: "authorized", option: "yo-matrix", values: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"], target: "tēuc-yo", targetDerivation: "canonical-semantic-operation", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                    { status: "authorized", option: "yo-matrix", values: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"], target: "pil-lo", targetDerivation: "canonical-semantic-operation", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                    { status: "authorized", option: "tec-title", values: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use", "tec-title"], target: "tēc", targetDerivation: "exact-canvas-lexical-option", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                    { status: "authorized", option: "secondary-general-use", values: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"], target: "tē-cal", targetDerivation: "canonical-semantic-operation", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                    { status: "authorized", option: "analogical-restricted-use", values: ["source-stem", "yo-matrix", "analogical-restricted-use"], target: "tla-cal", targetDerivation: "canonical-semantic-operation", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                    { status: "authorized", option: "source-stem", values: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"], target: "mā", targetDerivation: "canonical-semantic-operation", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                    { status: "authorized", option: "source-stem", values: ["source-stem", "yo-matrix", "analogical-restricted-use"], target: "mā", targetDerivation: "canonical-semantic-operation", canvasOptionAuthority: false, formulaContainsDerivedPredicate: true, visible: true, enabled: true },
                ],
            }
            : null
    );

    s.eq(
        "Lesson 15 uses one predicate-operation control while possessor reduplication remains a separately licensed choice",
        typeof ctx.getClassicalNncAuthorityOptionContract === "function" ? (() => {
            const possessive = ctx.getClassicalNncAuthorityOptionContract({
                stem: "pil",
                nncType: "ordinary",
                nncState: "possessive",
                nncNounClass: "tli",
                nncUseShape: "base",
                nncSubclass: "tli-1",
                nncPossessor: "1sg",
                subject: "3pl",
                nncReferent: "animate",
                nncPredicateOptionId: "source-stem",
                nncPossessorReduplication: true,
            });
            const reclassification = ctx.getClassicalNncAuthorityOptionContract({
                stem: "māi",
                nncType: "ordinary",
                nncState: "possessive",
                nncNounClass: "tl",
                nncUseShape: "truncated-i",
                nncSubclass: "tl-2a",
                nncSourceClass: "tl-2-a",
                nncTl2ARealization: "reclassify-1a",
                nncPossessor: "3sg",
                subject: "3sg",
                nncReferent: "animate",
                nncPredicateOptionId: "source-stem",
            });
            return {
                oneOperationControl:
                    classicalShell.includes('id="classical-rule-logic-nnc-predicate-form"')
                    && classicalShell.includes("Reduplicate possessor")
                    && classicalShell.includes('id="classical-rule-logic-nnc-possessor-reduplication"'),
                retiredCarrierControlsAbsent: [
                    "classical-rule-logic-nnc-possessive-formation",
                    "classical-rule-logic-nnc-lesson15-target-stem",
                    "classical-rule-logic-nnc-suppletive-connector",
                    "classical-rule-logic-nnc-secondary-carrier",
                ].every((id) => !classicalShell.includes(`id="${id}"`)),
                predicateOptionValues: possessive.predicateOptionValues,
                selectedPredicateOption:
                    possessive.selectedPredicateOptionId,
                redupAvailable: possessive.possessorReduplicationAvailable,
                redupSelected: possessive.selectedPossessorReduplication,
                reclassificationValues:
                    reclassification.predicateOptionValues,
                reclassificationSelected:
                    reclassification.selectedPredicateOptionId,
                retiredContractFieldsAbsent: [
                    "possessiveFormationValues",
                    "selectedPossessiveFormation",
                    "suppletiveConnectorValues",
                    "selectedSuppletiveConnector",
                    "secondaryPossessorCarrierValues",
                    "selectedSecondaryPossessorCarrier",
                ].every((key) => (
                    !Object.hasOwn(possessive, key)
                    && !Object.hasOwn(reclassification, key)
                )),
                typedRouting:
                    rendering.includes(
                        "buildClassicalOrdinaryNncApplicationSourceFrame(state"
                    )
                    && rendering.includes(
                        "buildClassicalOrdinaryNncApplicationOperationFrame("
                    )
                    && rendering.includes(
                        "requestClassicalOrdinaryNncResult("
                    )
                    && !rendering.includes(
                        "requestClassicalNncStemOperation(normalizedNncStem"
                    )
                    && !rendering.includes(
                        "requestClassicalPossessorReduplication(normalizedNncStem"
                    )
                    && !rendering.includes("suppletivePossessiveStem: state.nncLesson15TargetStem"),
            };
        })() : null,
        ctx.__TEST_RUNTIME_MODE__ === "module" ? {
            oneOperationControl: true,
            retiredCarrierControlsAbsent: true,
            predicateOptionValues: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
            selectedPredicateOption: "source-stem",
            redupAvailable: true,
            redupSelected: true,
            reclassificationValues: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
            reclassificationSelected: "source-stem",
            retiredContractFieldsAbsent: true,
            typedRouting: true,
        } : null
    );

    s.eq(
        "Classical Canvas drives yohua higher voice from an engine-owned ordered typed chain",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            && typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const inherentOnly = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "yohua",
                    verbClass: "A",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    vncVoice: "impersonal",
                    nonactiveOptionId: "inherent-impersonal",
                });
                const partial = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "yohua",
                    verbClass: "A",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    vncVoice: "impersonal",
                    nonactiveOptionId: "inherent-impersonal",
                    voiceLayer2Operation: "tla-impersonal",
                });
                const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "yohua",
                    verbClass: "A",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    vncVoice: "impersonal",
                    nonactiveOptionId: "inherent-impersonal",
                    voiceLayer2Operation: "tla-impersonal",
                    voiceLayer3Operation: "nonactive-lō",
                });
                const poisoned = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "yohua",
                    verbClass: "A",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    vncVoice: "impersonal",
                    nonactiveOptionId: "inherent-impersonal",
                    voiceLayer2Operation: "tla-impersonal",
                    voiceLayer3Operation: "nonactive-lō",
                    hostileVoiceLayerTarget: "FORGED-TARGET",
                    hostileVoiceLayers: [{ targetStem: "FORGED-LAYER" }],
                    hostileFormulaArtifact: "FORGED-FORMULA",
                    hostileSurfaceArtifact: "FORGED-SURFACE",
                    hostileVoiceResultFrame: {
                        formulaRealization: "FORGED-RESULT",
                    },
                    hostileVoiceStateCarrier: {
                        selectedFormula: "FORGED-STATE",
                    },
                });
                const chain = frame.state?.voiceLayerChainFrame;
                const orderedApplication =
                    frame.state?.vncOrderedVoiceApplicationFrame;
                const poisonedApplication =
                    poisoned.state?.vncOrderedVoiceApplicationFrame;
                return {
                    shellControl: classicalShell.includes('id="classical-rule-logic-voice-layer-2"')
                        && classicalShell.includes('id="classical-rule-logic-voice-layer-3"')
                        && classicalShell.includes('data-classical-vnc-authority-order="predicate-voice-layer-2"')
                        && classicalShell.includes('data-classical-vnc-authority-order="predicate-voice-layer-3"'),
                    status: frame.authorizationStatus,
                    voice: frame.state?.vncVoice,
                    voiceOperation: frame.state?.vncVoiceOperation,
                    inherentOnlyHasNoAddedChain: inherentOnly.state?.voiceLayerChainFrame == null,
                    inherentOnlyLayer2Options: inherentOnly.state?.voiceLayer2CascadeInventory?.options?.map(
                        (option) => option.operationId
                    ),
                    partialStatus: partial.authorizationStatus,
                    partialTarget: partial.state?.voiceLayerChainFrame?.targetStem,
                    partialComplete: partial.state?.voiceLayerChainFrame?.completeRoute,
                    partialLayer3Options: partial.state?.voiceLayer3CascadeInventory?.options?.map(
                        (option) => option.operationId
                    ),
                    layer2Options: frame.state?.voiceLayer2CascadeInventory?.options?.map(
                        (option) => `${option.operationId}:${option.targetStem}`
                    ),
                    selectedLayer2: frame.state?.selectedVoiceLayer2Operation,
                    layer3Options: frame.state?.voiceLayer3CascadeInventory?.options?.map(
                        (option) => `${option.operationId}:${option.targetStem}`
                    ),
                    selectedLayer3: frame.state?.selectedVoiceLayer3Operation,
                    selectedRoute: frame.state?.selectedVoiceLayerRouteId,
                    targetStem: chain?.targetStem,
                    layerContinuity: chain?.layers?.map((layer) => `${layer.sourceStem}>${layer.targetStem}`),
                    applicationKind: orderedApplication?.kind,
                    applicationStatus: orderedApplication?.authorizationStatus,
                    applicationCanonical:
                        ctx.isClassicalNahuatlOrderedVoiceVncApplicationFrame(
                            orderedApplication
                        ),
                    machineryKind: frame.machineryFrame?.kind,
                    machineryTarget: frame.machineryFrame?.voiceLayerChainFrame?.targetStem,
                    selectedFormula: frame.selectedFormula,
                    finiteSurface: frame.finiteSurfaceFrame?.wordRealization,
                    sentenceFormula: frame.sentenceFormulaDisplay,
                    sentenceSurface: frame.sentenceSurfaceDisplay,
                    consumesTypedPredecessors: chain?.layers?.every((layer, index) => (
                        layer.consumesPreviousTypedOutput === true
                        && layer.sourceFrame === (index === 0 ? chain.layers[0].sourceFrame : chain.layers[index - 1])
                    )),
                    rendererTargetMachineryAbsent:
                        !rendering.includes(
                            "requestClassicalVerbstemClassFrame("
                        )
                        && !rendering.includes(
                            'kind: "classical-nahuatl-ordered-voice-layer-vnc-machinery-frame"'
                        ),
                    poisonedStatus: poisoned.authorizationStatus,
                    poisonedReason: poisoned.blockReason,
                    poisonedRejected:
                        poisonedApplication?.rejectedAuthorityFields,
                    hostileArtifactsAbsent:
                        !JSON.stringify(poisoned).includes("FORGED-"),
                };
            })()
            : {
                shellControl: classicalShell.includes('id="classical-rule-logic-voice-layer-2"')
                    && classicalShell.includes('id="classical-rule-logic-voice-layer-3"')
                    && classicalShell.includes('data-classical-vnc-authority-order="predicate-voice-layer-2"')
                    && classicalShell.includes('data-classical-vnc-authority-order="predicate-voice-layer-3"'),
                staticTypedRouting:
                    rendering.includes(
                        "requestClassicalOrderedVoiceVncApplicationFrame"
                    )
                    && rendering.includes(
                        "orderedVoiceApplicationFrame?.selectedMachineryFrame"
                    )
                    && !rendering.includes(
                        "requestClassicalVerbstemClassFrame("
                    ),
            },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                shellControl: true,
                status: "authorized",
                voice: "impersonal",
                voiceOperation: "inherent-impersonal",
                inherentOnlyHasNoAddedChain: true,
                inherentOnlyLayer2Options: ["nonactive-lō", "tla-impersonal"],
                partialStatus: "authorized",
                partialTarget: "tla-yohua",
                partialComplete: false,
                partialLayer3Options: ["nonactive-lō"],
                layer2Options: ["nonactive-lō:yohua-lō", "tla-impersonal:tla-yohua"],
                selectedLayer2: "tla-impersonal",
                layer3Options: ["nonactive-lō:tla-yohua-lō"],
                selectedLayer3: "nonactive-lō",
                selectedRoute: "cn-l38-yohua-triply-impersonal",
                targetStem: "tla-yohua-lō",
                layerContinuity: ["yohua>yohua", "yohua>tla-yohua", "tla-yohua>tla-yohua-lō"],
                applicationKind:
                    "classical-nahuatl-ordered-voice-vnc-application-frame",
                applicationStatus: "authorized",
                applicationCanonical: true,
                machineryKind: "classical-nahuatl-ordered-voice-layer-vnc-machinery-frame",
                machineryTarget: "tla-yohua-lō",
                selectedFormula: "#0-0(tla-yohua-lo)0+0-0#",
                finiteSurface: "tlayohualo",
                sentenceFormula: "#0-0(tla-yohua-lo)0+0-0#.",
                sentenceSurface: "Tlayohualo.",
                consumesTypedPredecessors: true,
                rendererTargetMachineryAbsent: true,
                poisonedStatus: "blocked",
                poisonedReason:
                    "classical-grammar-application-request-invalid:forbidden-authority:formulaArtifact",
                hostileArtifactsAbsent: true,
            }
            : {
                shellControl: true,
                staticTypedRouting: true,
            }
    );

    s.eq(
        "A pending nonactive formation previews the common new structure with only STEM unresolved",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "āna",
                    sourceTransitivity: "transitive",
                    verbClass: "B",
                    valence: "specific-projective",
                    subject: "3sg",
                    objectKind: "specific-projective",
                    objectPerson: "1sg",
                    mood: "indicative",
                    tense: "present",
                    construction: "none",
                    vncOutputScope: "single",
                    vncVoice: "passive",
                });
                return {
                    status: frame.authorizationStatus,
                    reason: frame.blockReason,
                    pendingCount: frame.state?.vncApplicationFrame?.resultFrame
                        ?.choicePendingTypedVncSlotFrames?.length || 0,
                    choicePending: frame.diagrammaticFrame?.choicePending === true,
                    authority: frame.diagrammaticFrame?.projectionAuthority || "",
                    linear: frame.diagrammaticFrame?.linearFormula || "",
                    rows: frame.diagrammaticFrame?.rows?.map(row => [
                        row.role,
                        row.expression,
                        row.foundation || "",
                    ]) || [],
                    general: frame.diagrammaticFrame?.generalLinearFormula || "",
                    sentenceFormula: frame.sentenceFormulaDisplay || "",
                    sentenceFormulaAttachment: frame.sentenceFormulaAttachment || "",
                    resultAuthority: frame.diagrammaticFrame?.resultAuthority,
                };
            })()
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                status: "blocked",
                reason: "classical-vnc-nonactive-formation-option-selection-required",
                pendingCount: 2,
                choicePending: true,
                authority: "common-owner-issued-nonactive-choice-structure",
                linear: "#n-0(STEM)0+0-0#",
                rows: [
                    ["Subject", "#n-0+ ... +0-0#", ""],
                    ["Core", "(STEM)", "STEM"],
                    ["Tense", ")0+", ""],
                ],
                general: "#pers¹-pers²(STEM)tns+num¹-num²#",
                sentenceFormula: "#n-0(STEM)0+0-0#.",
                sentenceFormulaAttachment: "single-vnc-formula-as-sentence",
                resultAuthority: false,
            }
            : null
    );

    s.eq(
        "The visible surface carries its selected nonactive formation into the one application engine",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "zō",
                    sourceTransitivity: "intransitive",
                    verbClass: "A",
                    valence: "mainline-reflexive",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    construction: "none",
                    lexicalReading: "unspecified",
                    vncVoice: "passive",
                    nonactiveOptionId: "lō:zō-lō",
                });
                return [
                    frame.authorizationStatus,
                    frame.state?.vncVoice,
                    frame.state?.vncVoiceOperation,
                    frame.state?.requestedNonactiveOptionId,
                    frame.state?.selectedNonactiveOptionId,
                    frame.state?.vncApplicationFrame?.authorizationStatus,
                    frame.state?.vncApplicationFrame?.controlFrame?.selectedNonactiveOptionId,
                    frame.state?.lesson20NonactiveOptionInventory?.options?.map(option => option.optionId),
                    frame.selectedFormula,
                ];
            })()
            : null,
        [
            "authorized",
            "passive",
            "passive",
            "lō:zō-lō",
            "lō:zō-lō",
            "authorized",
            "lō:zō-lō",
            ["hua:zō-hua", "lō:zō-lō"],
            "#0-0+ne(zō-lo)0+0-0#",
        ]
    );

    s.ok(
        "changing a neighboring Grammar choice preserves the selected licensed nonactive formation",
        composer.includes(
            "function getClassicalPreservedNonactiveFormationRequestOverrides("
        )
            && composer.includes('["passive", "impersonal"].includes(')
            && composer.includes("selectedOption.disabled !== true")
            && composer.includes(
                "...getClassicalPreservedNonactiveFormationRequestOverrides(control)"
            )
    );

    const sourceTransitivityValues = ["intransitive", "transitive", "bitransitive"];
    const visibleSourceTransitivityValues = Array.from(
        classicalShell.matchAll(/data-composer-transitivity="([^"]+)"/gu),
        (match) => match[1]
    );
    const visibleSourceTransitivityGroups = [0, 1, 2].map((groupIndex) => (
        visibleSourceTransitivityValues.slice(groupIndex * 3, groupIndex * 3 + 3)
    ));
    const hiddenSourceTransitivitySelect = classicalShell.match(
        /id="composer-transitivity"[\s\S]*?<\/select>/u
    )?.[0] || "";
    const hiddenSourceTransitivityValues = Array.from(
        hiddenSourceTransitivitySelect.matchAll(/<option value="([^"]*)"/gu),
        (match) => match[1]
    ).filter(Boolean);
    const sourceTransitivitySlotShellValues = Array.from(
        classicalShell.matchAll(/data-composer-slot-shell="([^"]+)"/gu),
        (match) => match[1]
    );
    s.eq(
        "Source transitivity derives all shell groups, hidden state, and A/B/C topology from one contract",
        typeof ctx.validateGenerationSourceTransitivityControlInventory === "function"
            ? (() => {
                const frame = ctx.validateGenerationSourceTransitivityControlInventory({
                    hiddenSelectValues: hiddenSourceTransitivityValues,
                    visibleGroupValues: visibleSourceTransitivityGroups,
                    slotShellValues: sourceTransitivitySlotShellValues,
                });
                const poisoned = ctx.validateGenerationSourceTransitivityControlInventory({
                    hiddenSelectValues: hiddenSourceTransitivityValues,
                    visibleGroupValues: visibleSourceTransitivityGroups.map((group, index) => (
                        index === 1 ? [group[0], "fabricated", group[2]] : group
                    )),
                    slotShellValues: sourceTransitivitySlotShellValues,
                });
                return {
                    vocabulary: ctx.GENERATION_SOURCE_TRANSITIVITY_ORDER,
                    slots: ctx.GENERATION_SOURCE_SLOT_BY_TRANSITIVITY,
                    status: frame.authorizationStatus,
                    visibleGroupsMatch: frame.visibleGroupsMatch,
                    hiddenSelectMatches: frame.hiddenSelectMatches,
                    slotShellsMatch: frame.slotShellsMatch,
                    poisonedStatus: poisoned.authorizationStatus,
                    poisonedReason: poisoned.blockReason,
                };
            })()
            : "missing",
        {
            vocabulary: sourceTransitivityValues,
            slots: { intransitive: "a", transitive: "b", bitransitive: "c" },
            status: "authorized",
            visibleGroupsMatch: true,
            hiddenSelectMatches: true,
            slotShellsMatch: true,
            poisonedStatus: "blocked",
            poisonedReason: "generation-source-transitivity-control-inventory-mismatch",
        }
    );
    s.eq(
        "Invalid explicit source transitivity cannot fall through to stale state or slot A",
        typeof ctx.getClassicalRuleLogicSourceTransitivitySelectionFrame === "function"
            ? (() => {
                const previousWindow = ctx.window;
                const previousComposerState = ctx.VerbComposerState;
                ctx.window = { location: { hash: "#classical/v1/verb/(nemi)/tr/transitive" } };
                ctx.VerbComposerState = { transitivity: "bitransitive" };
                try {
                    const selection = ctx.getClassicalRuleLogicSourceTransitivitySelectionFrame({
                        sourceTransitivity: "fabricated",
                    });
                    const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
                        basalUnit: "vnc",
                        lesson: "7",
                        stem: "nemi",
                        sourceTransitivity: "fabricated",
                        valence: "intransitive",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                    });
                    const composerSemantic = ctx.buildComposerSemanticState({
                        transitivity: "fabricated",
                        slotAStem: "forged",
                    });
                    const independentCanvasValence = ctx.buildClassicalRuleLogicSurfaceFrame({
                        basalUnit: "vnc",
                        lesson: "7",
                        stem: "nemi",
                        sourceTransitivity: "bitransitive",
                        valence: "intransitive",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                    });
                    return {
                        requested: selection.requestedSourceTransitivity,
                        status: selection.authorizationStatus,
                        normalized: selection.sourceTransitivity,
                        slot: ctx.getClassicalRuleLogicSurfaceSourceSlotKey("fabricated"),
                        surfaceStatus: frame.authorizationStatus,
                        surfaceReason: frame.blockReason,
                        formula: frame.selectedFormula,
                        sourceEmbedStem: frame.state?.sourceEmbedStem,
                        sourceMatrixStem: frame.state?.sourceMatrixStem,
                        composerSemanticStatus: composerSemantic.sourceTransitivitySelectionFrame?.authorizationStatus,
                        composerSemanticSerialized: ctx.serializeComposerSemanticToRegexInput(composerSemantic),
                        independentCanvasStatus: independentCanvasValence.authorizationStatus,
                        independentSourceTransitivity: independentCanvasValence.state?.sourceTransitivity,
                        independentCanvasValence: independentCanvasValence.state?.valence,
                        independentFormula: independentCanvasValence.selectedFormula,
                    };
                } finally {
                    ctx.window = previousWindow;
                    ctx.VerbComposerState = previousComposerState;
                }
            })()
            : "missing",
        {
            requested: "fabricated",
            status: "blocked",
            normalized: "",
            slot: "",
            surfaceStatus: "blocked",
            surfaceReason: "generation-source-transitivity-not-recognized",
            formula: "",
            sourceEmbedStem: "",
            sourceMatrixStem: "",
            composerSemanticStatus: "blocked",
            composerSemanticSerialized: "",
            independentCanvasStatus: "authorized",
            independentSourceTransitivity: "bitransitive",
            independentCanvasValence: "intransitive",
            independentFormula: "#ni-0(nemi)0+0-0#",
        }
    );

    return s;
}

module.exports = { run };
