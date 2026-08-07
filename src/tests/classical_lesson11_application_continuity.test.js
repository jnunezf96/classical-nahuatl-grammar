"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11_application_continuity");

    s.eq(
        "The actual shell Mood and Tense values and UI normalizers match the canonical semantic contract",
        (() => {
            const shell = fs.readFileSync(path.resolve(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
            const readOptions = (id) => {
                const idIndex = shell.indexOf(`id="${id}"`);
                const start = shell.lastIndexOf("<select", idIndex);
                const end = shell.indexOf("</select>", idIndex);
                const markup = start >= 0 && end >= 0 ? shell.slice(start, end) : "";
                return Array.from(markup.matchAll(/<option\s+value="([^"]*)"/gu))
                    .map((match) => match[1]);
            };
            const moodOptions = readOptions("classical-rule-logic-mood");
            const tenseOptions = readOptions("classical-rule-logic-tense");
            const vocabulary = ctx.getClassicalNahuatlVncSemanticInputVocabulary();
            const moodInventoryMatches = JSON.stringify(moodOptions) === JSON.stringify(vocabulary.moods);
            const tenseInventoryMatches = JSON.stringify(tenseOptions) === JSON.stringify(vocabulary.tenses);
            const hostileValidation = ctx.validateClassicalNahuatlVncSemanticSelection({
                mood: "indicative",
                tense: "fabricated-present",
            });
            return {
                status: moodInventoryMatches && tenseInventoryMatches ? "authorized" : "blocked",
                blockReason: moodInventoryMatches && tenseInventoryMatches ? "" : "vnc-semantic-control-inventory-does-not-match-canonical-contract",
                moodInventoryMatches,
                tenseInventoryMatches,
                documentaryTagsAbsent: !shell.includes("data-classical-authority-option"),
                moodNormalizerMatches: vocabulary.moods.every((mood) => ctx.normalizeClassicalRuleLogicSurfaceMood(mood) === mood),
                tenseNormalizerMatches: vocabulary.tenses.every((tense) => ctx.normalizeClassicalRuleLogicSurfaceTense(tense) === tense),
                hostileStatus: hostileValidation.authorizationStatus,
                hostileReason: hostileValidation.blockReason,
            };
        })(),
        {
            status: "authorized",
            blockReason: "",
            moodInventoryMatches: true,
            tenseInventoryMatches: true,
            documentaryTagsAbsent: true,
            moodNormalizerMatches: true,
            tenseNormalizerMatches: true,
            hostileStatus: "blocked",
            hostileReason: "vnc-semantic-tense-not-recognized",
        }
    );

    s.eq(
        "Unknown and contextually unavailable semantic selections fail closed inside Lesson 11",
        [
            ctx.buildClassicalNahuatlIrregularVncParadigmPlan("nemi", { mood: "indicative", tense: "fabricated-past" }),
            ctx.buildClassicalNahuatlIrregularVncParadigmPlan("nemi", { mood: "fabricated-mood", tense: "present" }),
            ctx.buildClassicalNahuatlIrregularVncParadigmPlan("pāca", { mood: "indicative", tense: "general-past" }),
            ctx.buildClassicalNahuatlIrregularVncParadigmPlan("nemi", { mood: "indicative", tense: "nonpast" }),
        ].map((plan) => [plan.authorizationStatus, plan.blockReason]),
        [
            ["blocked", "vnc-semantic-tense-not-recognized"],
            ["blocked", "vnc-semantic-mood-not-recognized"],
            ["blocked", "vnc-irregular-paradigm-tense-not-authorized-for-selected-verbstem"],
            ["blocked", "vnc-semantic-tense-not-authorized-for-mood"],
        ]
    );

    s.eq(
        "The actual derivation buttons match the canonical derivation-type vocabulary without documentary tags",
        (() => {
            const shell = fs.readFileSync(path.resolve(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
            const options = Array.from(shell.matchAll(/data-derivation-type="([^"]+)"/gu))
                .map((match) => match[1]);
            const vocabulary = ctx.getClassicalNahuatlVncDerivationTypeVocabulary();
            const inventoryMatches = JSON.stringify(options) === JSON.stringify(vocabulary.derivationTypes);
            const hostile = ctx.validateClassicalNahuatlVncDerivationTypeSelection("fabricated-causative");
            return {
                types: vocabulary.derivationTypes,
                derivedTypes: vocabulary.derivedTypes,
                status: inventoryMatches ? "authorized" : "blocked",
                documentaryTagsAbsent: !shell.includes("data-classical-authority-option"),
                hostileStatus: hostile.authorizationStatus,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            types: ["direct", "causative", "applicative"],
            derivedTypes: ["causative", "applicative"],
            status: "authorized",
            documentaryTagsAbsent: true,
            hostileStatus: "blocked",
            hostileReason: "classical-vnc-derivation-type-not-recognized",
        }
    );

    s.eq(
        "A fabricated derivation cannot be normalized into an authorized Direct surface",
        (() => {
            const state = ctx.getClassicalRuleLogicSurfaceState({
                basalUnit: "vnc",
                lesson: "7",
                stem: "nemi",
                derivationType: "fabricated-derivation",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
            });
            const surface = ctx.buildClassicalRuleLogicSurfaceFrame(state);
            return {
                requested: state.requestedDerivation,
                safeLayoutType: state.derivationType,
                selectionStatus: state.derivationTypeSelectionFrame.authorizationStatus,
                applicationStatus: state.vncApplicationFrame.authorizationStatus,
                reason: state.vncApplicationFrame.blockReason,
                formula: surface.formula || "",
                surface: surface.surface || "",
            };
        })(),
        {
            requested: "fabricated-derivation",
            safeLayoutType: "direct",
            selectionStatus: "blocked",
            applicationStatus: "blocked",
            reason: "classical-vnc-derivation-type-not-recognized",
            formula: "",
            surface: "",
        }
    );

    s.eq(
        "Target and causative-source voice controls preserve exact canonical vocabulary parity",
        (() => {
            const shell = fs.readFileSync(path.resolve(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
            const readOptions = id => {
                const idIndex = shell.indexOf(`id="${id}"`);
                const start = shell.lastIndexOf("<select", idIndex);
                const end = shell.indexOf("</select>", idIndex);
                const markup = start >= 0 && end >= 0 ? shell.slice(start, end) : "";
                return Array.from(markup.matchAll(/<option\s+value="([^"]*)"/gu))
                    .map(match => match[1]);
            };
            const targetVoiceOptions = readOptions("classical-rule-logic-vnc-voice");
            const causativeSourceVoiceOptions = readOptions("classical-rule-logic-causative-source-voice");
            const vocabulary = ctx.getClassicalNahuatlVncVoiceVocabulary();
            const inventoryMatches = JSON.stringify(targetVoiceOptions) === JSON.stringify(vocabulary.targetVoices)
                && JSON.stringify(causativeSourceVoiceOptions) === JSON.stringify(vocabulary.causativeSourceVoices);
            const hostile = ctx.validateClassicalNahuatlVncVoiceSelection("fabricated-passive", "target");
            return {
                targetVoices: vocabulary.targetVoices,
                targetVoiceOperations: vocabulary.targetVoiceOperations,
                sourceVoices: vocabulary.causativeSourceVoices,
                contextualSubset: vocabulary.causativeSourceVoiceIsContextualSubset,
                higherLayersSeparate: vocabulary.higherVoiceLayersAreSeparate,
                status: inventoryMatches ? "authorized" : "blocked",
                documentaryTagsAbsent: !shell.includes("data-classical-authority-option"),
                hostileStatus: hostile.authorizationStatus,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            targetVoices: ["active", "passive", "impersonal"],
            targetVoiceOperations: ["active", "passive", "impersonal", "inherent-impersonal", "tla-impersonal"],
            sourceVoices: ["active", "passive", "impersonal"],
            contextualSubset: true,
            higherLayersSeparate: true,
            status: "authorized",
            documentaryTagsAbsent: true,
            hostileStatus: "blocked",
            hostileReason: "classical-vnc-target-voice-not-recognized",
        }
    );

    s.eq(
        "Fabricated target and causative-source voices survive only as blocked diagnostics in surface state",
        (() => {
            const summarize = overrides => {
                const state = ctx.getClassicalRuleLogicSurfaceState({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "nemi",
                    derivationType: overrides.derivationType || "direct",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    ...overrides,
                });
                return {
                    requestedTarget: state.requestedVncVoice,
                    targetSelectionStatus: state.targetVoiceSelectionFrame.authorizationStatus,
                    requestedSource: state.requestedSourceVoice,
                    sourceSelectionStatus: state.sourceVoiceSelectionFrame.authorizationStatus,
                    safeTarget: state.vncVoice,
                    safeSource: state.sourceVoice,
                    applicationStatus: state.vncApplicationFrame.authorizationStatus,
                    reason: state.vncApplicationFrame.blockReason,
                    formula: state.vncApplicationFrame.resultFrame.formulaRealization,
                    surface: state.vncApplicationFrame.resultFrame.surfaceRealization,
                };
            };
            return {
                target: summarize({ vncVoice: "fabricated-target-voice" }),
                source: summarize({ derivationType: "causative", sourceVoice: "fabricated-source-voice" }),
            };
        })(),
        {
            target: {
                requestedTarget: "fabricated-target-voice",
                targetSelectionStatus: "blocked",
                requestedSource: "active",
                sourceSelectionStatus: "authorized",
                safeTarget: "active",
                safeSource: "active",
                applicationStatus: "blocked",
                reason: "classical-vnc-target-voice-not-recognized",
                formula: "",
                surface: "",
            },
            source: {
                requestedTarget: "active",
                targetSelectionStatus: "authorized",
                requestedSource: "fabricated-source-voice",
                sourceSelectionStatus: "blocked",
                safeTarget: "active",
                safeSource: "active",
                applicationStatus: "blocked",
                reason: "classical-vnc-causative-source-voice-not-recognized",
                formula: "",
                surface: "",
            },
        }
    );

    s.eq(
        "The application boundary cannot authorize a fabricated semantic tense",
        (() => {
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const result = application.evaluate({
                sourceStem: "(nemi)",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "fabricated-past",
                derivationType: "direct",
                requestedVoice: "active",
            });
            return {
                status: result.authorizationStatus,
                resultStatus: result.resultFrame?.authorizationStatus || "",
                blockReason: result.blockReason || result.resultFrame?.blockReason || "",
                formula: result.resultFrame?.formulaRealization || "",
                surface: result.resultFrame?.surfaceRealization || "",
            };
        })(),
        {
            status: "blocked",
            resultStatus: "blocked",
            blockReason: "vnc-semantic-tense-not-recognized",
            formula: "",
            surface: "",
        }
    );

    s.eq(
        "A restored or injected invalid semantic selection cannot inherit the UI fallback's output",
        (() => {
            const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                stem: "(nemi)",
                basalUnit: "vnc",
                lesson: "7",
                sourceTransitivity: "intransitive",
                valence: "intransitive",
                verbClass: "B",
                subject: "3sg",
                mood: "fabricated-mood",
                tense: "general-past",
                derivationType: "direct",
                vncVoice: "active",
            });
            return {
                status: surface.authorizationStatus,
                blockReason: surface.blockReason,
                requestedMood: surface.state.semanticSelectionFrame.requestedMood,
                layoutMood: surface.state.mood,
                applicationStatus: surface.state.vncApplicationFrame?.authorizationStatus || "",
                formula: surface.selectedFormula,
                surface: surface.sentenceSurfaceDisplay,
            };
        })(),
        {
            status: "blocked",
            blockReason: "vnc-semantic-mood-not-recognized",
            requestedMood: "fabricated-mood",
            layoutMood: "indicative",
            applicationStatus: "blocked",
            formula: "",
            surface: "",
        }
    );

    s.eq(
        "Direct application preserves the Lesson 11 typed paradigm member through selected Result",
        (() => {
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const generalPast = application.evaluate({
                sourceStem: "(nemi)",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "general-past",
                derivationType: "direct",
                requestedVoice: "active",
            });
            return {
                status: generalPast.authorizationStatus,
                source: generalPast.normalizedRequest.sourceStem,
                selectedStem: generalPast.resultFrame.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
                semanticTense: generalPast.resultFrame.sourceMachineryFrame?.lesson11ParadigmPlan?.requestedSemanticTense || "",
                morphologicalTense: generalPast.resultFrame.sourceMachineryFrame?.lesson11ParadigmPlan?.morphologicalTense || "",
                formula: generalPast.resultFrame.formulaRealization,
                surface: generalPast.resultFrame.surfaceRealization,
            };
        })(),
        {
            status: "authorized",
            source: "nemi",
            selectedStem: "nen",
            semanticTense: "general-past",
            morphologicalTense: "distant-past",
            formula: "#0-0(nen)ca+0-0#",
            surface: "nenca",
        }
    );

    s.eq(
        "Visible Result consumes the authorized application frame instead of rebuilding from source spelling",
        (() => {
            const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "(nemi)",
                subject: "3sg",
                mood: "indicative",
                tense: "general-past",
                verbClass: "B",
                valence: "intransitive",
                derivationType: "direct",
                vncVoice: "active",
            });
            return {
                status: surface.authorizationStatus,
                stateTense: surface.state?.tense || "",
                applicationStem: surface.state?.vncApplicationFrame?.resultFrame?.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
                machineryStem: surface.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
                formula: surface.selectedFormula,
                surface: surface.sentenceSurfaceDisplay,
            };
        })(),
        {
            status: "authorized",
            stateTense: "distant-past-as-past",
            applicationStem: "nen",
            machineryStem: "nen",
            formula: "#0-0(nen)ca+0-0#",
            surface: "Nenca.",
        }
    );

    s.eq(
        "mani remains a Class B source through direct, nonactive, causative, and applicative application cascades",
        [
            ["direct", {}],
            ["impersonal", {
                vncVoice: "impersonal",
                nonactiveOptionId: "o-hua:man-o-hua",
            }],
            ["causative", {
                derivationType: "causative",
                derivationOptionId: "causative:type-one:replacement:mani:man-a",
            }],
            ["applicative", {
                derivationType: "applicative",
                derivationOptionId: "applicative:type-one:optional-final-vowel-replacement:mani:man-iā",
            }],
        ].map(([id, overrides]) => {
            const state = ctx.getClassicalRuleLogicSurfaceState({
                basalUnit: "vnc",
                lesson: "11",
                stem: "mani",
                valence: "intransitive",
                verbClass: "B",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                derivationType: "direct",
                vncVoice: "active",
                ...overrides,
            });
            const application = state.vncApplicationFrame;
            return [
                id,
                state.verbClass,
                application.authorizationStatus,
                application.normalizedRequest?.verbClass || "",
                application.normalizedRequest?.targetClass || "",
                application.controlFrame?.derivedClass || "",
            ];
        }),
        [
            ["direct", "B", "authorized", "B", "B", ""],
            ["impersonal", "B", "authorized", "B", "B", ""],
            ["causative", "B", "authorized", "B", "B", "B"],
            ["applicative", "B", "authorized", "B", "C", "C"],
        ]
    );

    s.eq(
        "Sibling Lesson 11 general-past routes retain their typed paradigm members after surface normalization",
        [
            ["nemi", "3sg"],
            ["mani", "3sg"],
            ["ih-ca", "1sg"],
            ["ye", "1sg"],
        ].map(([stem, subject]) => {
            const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem,
                subject,
                mood: "indicative",
                tense: "general-past",
                verbClass: "B",
                valence: "intransitive",
                derivationType: "direct",
                vncVoice: "active",
            });
            const slots = surface.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame?.slots || {};
            return [stem, surface.state?.tense || "", slots.predicate?.stem || "", slots.predicate?.tns || "", surface.selectedFormula];
        }),
        [
            ["nemi", "distant-past-as-past", "nen", "ca", "#0-0(nen)ca+0-0#"],
            ["mani", "distant-past-as-past", "man", "ca", "#0-0(man)ca+0-0#"],
            ["ih-ca", "distant-past-as-past", "ih-ca", "ca", "#n-0(ih-ca)ca+0-0#"],
            ["ye", "distant-past-as-past", "ca-t", "ca", "#ni-0(ca-t)ca+0-0#"],
        ]
    );

    return s;
}

module.exports = { run };
