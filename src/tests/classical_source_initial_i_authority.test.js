"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_source_initial_i_authority");
    const inventory = typeof ctx.getClassicalNahuatlCanonicalSourceStemInventory === "function"
        ? ctx.getClassicalNahuatlCanonicalSourceStemInventory("vnc")
        : [];

    s.eq(
        "Canonical Source VNC distinguishes real, supportive, and context-sensitive initial i",
        [
            inventory.find(record => record.stem === "iuc-ci" && record.valenceDisplay === "intransitive")?.initialIAnalysis || null,
            inventory.find(record => record.stem === "ī" && record.valenceDisplay === "transitive")?.initialIAnalysis || null,
            inventory.find(record => record.stem === "iht-o-ā" && record.valenceDisplay === "transitive")?.initialIAnalysis || null
        ].map(analysis => ({
            kind: analysis?.kind || "",
            ruleId: analysis?.ruleId || "",
            sourceAuthority: analysis?.sourceAuthority || ""
        })),
        [
            {
                kind: "supportive",
                ruleId: "cn-l25-2522-iucci-iucxitia-source-supportive-i",
                sourceAuthority: "Andrews 25.2.2"
            },
            {
                kind: "real",
                ruleId: "cn-l7-78-real-initial-vowel-source-default",
                sourceAuthority: "canonical-source-verbstem"
            },
            {
                kind: "contextual",
                ruleId: "cn-l2-26-ihtoa-contextual-initial-i-source",
                sourceAuthority: "Andrews 2.6 Note 1"
            }
        ]
    );

    s.eq(
        "The source-owned iht-o-a analysis resolves supportive only in its tla environment",
        typeof ctx.normalizeClassicalNahuatlVncApplicationRequest === "function"
            ? (() => {
                const tla = ctx.normalizeClassicalNahuatlVncApplicationRequest({
                    sourceStem: "iht-o-ā",
                    sourceValence: "projective-nonhuman"
                });
                const specific = ctx.normalizeClassicalNahuatlVncApplicationRequest({
                    sourceStem: "iht-o-ā",
                    sourceValence: "specific-projective"
                });
                return {
                    tla: {
                        sourceKind: tla.sourceInitialIAnalysis?.kind || "",
                        resolvedKind: tla.sourceInitialIAnalysis?.resolvedKind || ""
                    },
                    specific: {
                        sourceKind: specific.sourceInitialIAnalysis?.kind || "",
                        resolvedKind: specific.sourceInitialIAnalysis?.resolvedKind || ""
                    }
                };
            })()
            : null,
        {
            tla: { sourceKind: "contextual", resolvedKind: "supportive" },
            specific: { sourceKind: "contextual", resolvedKind: "real" }
        }
    );

    s.eq(
        "The iuc-ci source fact controls its derived target and rejects an input override",
        (() => {
            if (typeof ctx.createClassicalNahuatlVncApplication !== "function") {
                return null;
            }
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "iuc-ci",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedDerivation: "causative",
                requestedSourceVoice: "active",
                causativeObjectKind: "specific-projective",
                causativeResultSubject: "3sg"
            };
            const preview = application.evaluate(request);
            const option = (
                preview.controlFrame?.derivationOptionInventory?.options
                || []
            ).find((candidate) => (
                candidate.targetStem === "iuc-xi-tiā"
                && candidate.derivationRoute
                    === "type-two-tia-from-iucxi-hua-internal-base"
            )) || null;
            const selectedRequest = {
                ...request,
                derivationOptionId:
                    option?.optionId || "missing-owner-issued-iucxi-option"
            };
            const resolved = application.evaluate(selectedRequest);
            const hostile = application.evaluate({
                ...selectedRequest,
                initialVowelKind: "real"
            });
            const selectedOption = resolved.resultFrame?.derivationOperationFrame?.selectedOption || {};
            return {
                status: resolved.authorizationStatus,
                sourceAnalysis: resolved.normalizedRequest?.sourceInitialIAnalysis?.kind || "",
                sourceI: resolved.resultFrame?.sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "",
                targetI: resolved.resultFrame?.selectedMachineryFrame?.citationRuleFrame?.initialVowelKind || "",
                targetStem: resolved.resultFrame?.selectedMachineryFrame?.stem || "",
                optionOwnsInitialI: Object.prototype.hasOwnProperty.call(selectedOption, "supportiveInitialI"),
                hostileRejectedAuthorityFields: hostile.rejectedAuthorityFields || []
            };
        })(),
        {
            status: "authorized",
            sourceAnalysis: "supportive",
            sourceI: "supportive",
            targetI: "supportive",
            targetStem: "iuc-xi-tiā",
            optionOwnsInitialI: false,
            hostileRejectedAuthorityFields: ["initialVowelKind"]
        }
    );

    s.eq(
        "An unlisted initial-i Source VNC defaults to real and accepts optional source-only classifications",
        typeof ctx.normalizeClassicalNahuatlVncApplicationRequest === "function"
            ? (() => {
                const unresolved = ctx.normalizeClassicalNahuatlVncApplicationRequest({
                    sourceStem: "i-xochi",
                    sourceValence: "intransitive"
                });
                const supportive = ctx.normalizeClassicalNahuatlVncApplicationRequest({
                    sourceStem: "i-xochi",
                    sourceValence: "intransitive",
                    sourceInitialISelection: "supportive"
                });
                const contextual = ctx.normalizeClassicalNahuatlVncApplicationRequest({
                    sourceStem: "i-xochi",
                    sourceValence: "projective-nonhuman",
                    sourceInitialISelection: "contextual"
                });
                const canonical = ctx.normalizeClassicalNahuatlVncApplicationRequest({
                    sourceStem: "iuc-ci",
                    sourceValence: "intransitive",
                    sourceInitialISelection: "real"
                });
                return {
                    unresolved: {
                        kind: unresolved.sourceInitialIAnalysis?.kind || "",
                        resolvedKind: unresolved.sourceInitialIAnalysis?.resolvedKind || "",
                        selectionRequired: unresolved.sourceInitialIAnalysis?.selectionRequired === true,
                        selectionSource: unresolved.sourceInitialIAnalysis?.selectionSource || ""
                    },
                    supportive: {
                        kind: supportive.sourceInitialIAnalysis?.kind || "",
                        resolvedKind: supportive.sourceInitialIAnalysis?.resolvedKind || "",
                        selectionSource: supportive.sourceInitialIAnalysis?.selectionSource || ""
                    },
                    contextual: {
                        kind: contextual.sourceInitialIAnalysis?.kind || "",
                        resolvedKind: contextual.sourceInitialIAnalysis?.resolvedKind || ""
                    },
                    canonical: {
                        kind: canonical.sourceInitialIAnalysis?.kind || "",
                        selectionSource: canonical.sourceInitialIAnalysis?.selectionSource || "",
                        userSelectionAccepted: canonical.sourceInitialIAnalysis?.userSelectionAccepted === true
                    }
                };
            })()
            : null,
        {
            unresolved: { kind: "real", resolvedKind: "real", selectionRequired: false, selectionSource: "unlisted-source-default" },
            supportive: { kind: "supportive", resolvedKind: "supportive", selectionSource: "unlisted-source" },
            contextual: { kind: "contextual", resolvedKind: "supportive" },
            canonical: { kind: "supportive", selectionSource: "canonical-source-record", userSelectionAccepted: false }
        }
    );

    s.eq(
        "An absent unlisted initial-i selection authorizes through the real-i default",
        (() => {
            if (typeof ctx.createClassicalNahuatlVncApplication !== "function") {
                return null;
            }
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const result = application.evaluate({
                sourceStem: "i-xochi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedDerivation: "direct"
            });
            return {
                authorizationStatus: result.authorizationStatus,
                sourceKind: result.normalizedRequest?.sourceInitialIAnalysis?.kind || "",
                selectionSource: result.normalizedRequest?.sourceInitialIAnalysis?.selectionSource || "",
                formula: result.resultFrame?.formulaRealization || ""
            };
        })(),
        {
            authorizationStatus: "authorized",
            sourceKind: "real",
            selectionSource: "unlisted-source-default",
            formula: "#n-0(i-xochi)0+0-0#"
        }
    );

    s.ok(
        "#1 Source exposes a supportive-i checkbox for an unlisted initial-i verbstem",
        (() => {
            const root = path.resolve(__dirname, "..", "..");
            const shell = fs.readFileSync(path.join(root, "src", "ui", "shell", "classical_shell.mjs"), "utf8");
            const composer = fs.readFileSync(path.join(root, "src", "ui", "composer", "composer.mjs"), "utf8");
            const stylesheet = fs.readFileSync(path.join(root, "style.css"), "utf8");
            return shell.includes('id="classical-vnc-source-initial-i"')
                && shell.includes('hidden aria-live="polite"')
                && shell.includes('id="classical-vnc-source-initial-i-choice"')
                && shell.includes('type="checkbox"')
                && shell.includes('value="supportive"')
                && shell.includes('data-classical-checked-value="supportive"')
                && shell.includes('data-classical-unchecked-value="real"')
                && shell.includes('>Supportive i</span>')
                && !shell.includes('value="contextual">Context-sensitive i</option>')
                && composer.includes("syncClassicalVncSourceInitialIFact")
                && composer.includes("userChoiceApplies")
                && composer.includes('choice?.checked === true ? "supportive" : "real"')
                && composer.includes("sourceInitialISelection")
                && stylesheet.includes("#classical-vnc-source-initial-i-choice-field[hidden]")
                && stylesheet.includes("display: none !important;");
        })()
    );

    s.eq(
        "ACI-P047-L009-EF940827EC: the UI asks only when an open-input initial i is unknown",
        (() => {
            const unlisted = ctx.normalizeClassicalNahuatlVncApplicationRequest({
                sourceStem: "i-any-open-input",
                sourceValence: "intransitive",
                sourceInitialISelection: "supportive",
            });
            const known = ctx.normalizeClassicalNahuatlVncApplicationRequest({
                sourceStem: "ī",
                sourceValence: "transitive",
                sourceInitialISelection: "supportive",
            });
            return {
                unlistedKind: unlisted.sourceInitialIAnalysis?.kind || "",
                unlistedSelectionAccepted: unlisted.sourceInitialIAnalysis?.userSelectionAccepted === true,
                knownKind: known.sourceInitialIAnalysis?.kind || "",
                knownSelectionAccepted: known.sourceInitialIAnalysis?.userSelectionAccepted === true,
            };
        })(),
        {
            unlistedKind: "supportive",
            unlistedSelectionAccepted: true,
            knownKind: "real",
            knownSelectionAccepted: false,
        }
    );

    s.eq(
        "ACI-P047-L009-EF940827EC-wrong-decision-owner: a user choice cannot replace a known source fact",
        ctx.normalizeClassicalNahuatlVncApplicationRequest({
            sourceStem: "ī",
            sourceValence: "transitive",
            sourceInitialISelection: "supportive",
        }).sourceInitialIAnalysis?.kind,
        "real"
    );

    return s;
}

module.exports = { run };
