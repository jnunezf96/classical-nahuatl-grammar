"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const PRESSED_DOWN_LEXEME = "cn-vnc-pachihui-pressed-down";
const SATIATED_LEXEME = "cn-vnc-pachihui-satiated";
const LEGACY_READING_KEYS = Object.freeze([
    "admonitiveTranslationReading",
    "translationReading",
    "requestedTranslationReading",
    "admonitiveContrastReading",
    "contrastReading",
    "requestedContrastReading",
]);

function bindVisibleSourceLexemeControl(ctx, sourceLexemeId, stem = "pach-i-hui") {
    const control = ctx.document.getElementById(
        "classical-vnc-source-lexeme-choice"
    );
    const field = ctx.document.getElementById(
        "classical-vnc-source-lexeme-choice-field"
    );
    control.value = sourceLexemeId;
    control.disabled = false;
    control.dataset.classicalSourceLexemeStem = stem;
    field.hidden = false;
    return control;
}

function getPachihuiCausativeOptionId(ctx, sourceLexemeId) {
    const preview = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "pach-i-hui",
        sourceLexemeId,
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "1sg",
        sourceSubject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    });
    return preview.controlFrame?.derivationOptionInventory
        ?.options?.[0]?.optionId || "";
}

function buildPachihuiUiState(ctx, sourceLexemeId, overrides = {}) {
    bindVisibleSourceLexemeControl(ctx, sourceLexemeId);
    return ctx.getClassicalRuleLogicSurfaceState({
        basalUnit: "vnc",
        stem: "pach-i-hui",
        verbClass: "B",
        valence: "intransitive",
        subject: "1sg",
        sourceSubject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "causative",
        causativeObjectKind: "specific-projective",
        derivationOptionId:
            getPachihuiCausativeOptionId(ctx, sourceLexemeId),
        vncVoice: "active",
        ...overrides,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_pachihui_source_lexeme_ui");
    const root = path.resolve(__dirname, "..", "..");
    const shell = fs.readFileSync(
        path.join(root, "src", "ui", "shell", "classical_shell.mjs"),
        "utf8"
    );
    const composer = fs.readFileSync(
        path.join(root, "src", "ui", "composer", "composer.mjs"),
        "utf8"
    );
    const rendering = fs.readFileSync(
        path.join(root, "src", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );

    s.ok(
        "pach-i-hui exposes one visible #1 Source constituent control, not a Grammar operation or hidden answer alias",
        (() => {
            const controlStart = shell.indexOf(
                'id="classical-vnc-source-lexeme-choice"'
            );
            const controlEnd = shell.indexOf("</select>", controlStart);
            const controlMarkup = shell.slice(controlStart, controlEnd);
            const requestBuilderStart = rendering.indexOf(
                "function buildClassicalRuleLogicVncApplicationRequest"
            );
            const requestBuilderEnd = rendering.indexOf(
                "function getClassicalRuleLogicSurfaceObjectKind",
                requestBuilderStart
            );
            const requestBuilder = rendering.slice(
                requestBuilderStart,
                requestBuilderEnd
            );
            return controlStart >= 0
                && controlMarkup.includes(
                    'data-classical-source-constituent="source-lexeme-id"'
                )
                && controlMarkup.includes(`value="${PRESSED_DOWN_LEXEME}"`)
                && controlMarkup.includes(`value="${SATIATED_LEXEME}"`)
                && controlMarkup.includes(
                    'data-classical-restored-state-authority="false"'
                )
                && !controlMarkup.includes(
                    "data-classical-rule-logic-control"
                )
                && !controlMarkup.includes("formula")
                && !controlMarkup.includes("surface")
                && !controlMarkup.includes("semanticSelection")
                && (
                    composer.match(
                        /vncSourceLexemeChoice\?\.addEventListener\("change"/gu
                    ) || []
                ).length === 1
                && LEGACY_READING_KEYS.every(
                    key => !requestBuilder.includes(`${key}:`)
                );
        })()
    );

    s.eq(
        "the visible Source control reaches the shared state and request, then exact scalar and prepared-paradigm paths for both lexemes",
        [
            {
                sourceLexemeId: PRESSED_DOWN_LEXEME,
                formula: "#ni-0+c-0(pach-o-a)0+0-0#",
                written: "nicpachoa",
            },
            {
                sourceLexemeId: SATIATED_LEXEME,
                formula: "#ni-0+c-0(pach-i-huī-tia)0+0-0#",
                written: "nicpachihuītia",
            },
        ].map(specification => {
            const oppositeLexeme = specification.sourceLexemeId
                === PRESSED_DOWN_LEXEME
                ? SATIATED_LEXEME
                : PRESSED_DOWN_LEXEME;
            const state = buildPachihuiUiState(
                ctx,
                specification.sourceLexemeId,
                {
                    // A rendering override is not a Source control and cannot
                    // replace the visible control's typed lexeme selection.
                    sourceLexemeId: oppositeLexeme,
                }
            );
            const request =
                ctx.buildClassicalRuleLogicVncApplicationRequest(state);
            const plan = ctx.prepareClassicalVncApplicationParadigmPlan({
                ...request,
                outputScope: "paradigm",
            });
            return {
                control: ctx.document.getElementById(
                    "classical-vnc-source-lexeme-choice"
                ).value,
                state: state.sourceLexemeId,
                request: request.sourceLexemeId,
                scalarStatus:
                    state.vncApplicationFrame?.authorizationStatus || "",
                formula:
                    state.vncApplicationFrame?.resultFrame
                        ?.formulaRealization || "",
                written:
                    state.vncApplicationFrame?.resultFrame
                        ?.surfaceRealization || "",
                paradigmStatus: plan.authorizationStatus,
                paradigmLexeme: plan.sourceLexemeId,
                legacyReadingKeys: LEGACY_READING_KEYS.filter(key =>
                    Object.prototype.hasOwnProperty.call(request, key)
                ),
            };
        }),
        [
            {
                control: PRESSED_DOWN_LEXEME,
                state: PRESSED_DOWN_LEXEME,
                request: PRESSED_DOWN_LEXEME,
                scalarStatus: "authorized",
                formula: "#ni-0+c-0(pach-o-a)0+0-0#",
                written: "nicpachoa",
                paradigmStatus: "authorized",
                paradigmLexeme: PRESSED_DOWN_LEXEME,
                legacyReadingKeys: [],
            },
            {
                control: SATIATED_LEXEME,
                state: SATIATED_LEXEME,
                request: SATIATED_LEXEME,
                scalarStatus: "authorized",
                formula: "#ni-0+c-0(pach-i-huī-tia)0+0-0#",
                written: "nicpachihuītia",
                paradigmStatus: "authorized",
                paradigmLexeme: SATIATED_LEXEME,
                legacyReadingKeys: [],
            },
        ]
    );

    s.eq(
        "missing, forged, stale-bound, hidden, and override-only lexeme authority all fail closed before a written or formula result",
        [
            {
                name: "missing-with-override",
                value: "",
                boundStem: "pach-i-hui",
                hidden: false,
                override: SATIATED_LEXEME,
            },
            {
                name: "forged",
                value: "forged-source-lexeme",
                boundStem: "pach-i-hui",
                hidden: false,
            },
            {
                name: "stale-bound",
                value: SATIATED_LEXEME,
                boundStem: "nemi",
                hidden: false,
            },
            {
                name: "hidden",
                value: SATIATED_LEXEME,
                boundStem: "pach-i-hui",
                hidden: true,
            },
        ].map(probe => {
            const control = bindVisibleSourceLexemeControl(
                ctx,
                probe.value,
                probe.boundStem
            );
            ctx.document.getElementById(
                "classical-vnc-source-lexeme-choice-field"
            ).hidden = probe.hidden;
            const state = ctx.getClassicalRuleLogicSurfaceState({
                basalUnit: "vnc",
                stem: "pach-i-hui",
                verbClass: "B",
                valence: "intransitive",
                subject: "1sg",
                sourceSubject: "3sg",
                mood: "indicative",
                tense: "present",
                derivationType: "causative",
                vncVoice: "active",
                sourceLexemeId: probe.override || "",
            });
            const request =
                ctx.buildClassicalRuleLogicVncApplicationRequest(state);
            return {
                name: probe.name,
                control: control.value,
                state: state.sourceLexemeId,
                request: request.sourceLexemeId,
                status:
                    state.vncApplicationFrame?.authorizationStatus || "",
                reason: state.vncApplicationFrame?.blockReason || "",
                formula:
                    state.vncApplicationFrame?.resultFrame
                        ?.formulaRealization || "",
                written:
                    state.vncApplicationFrame?.resultFrame
                        ?.surfaceRealization || "",
            };
        }),
        [
            {
                name: "missing-with-override",
                control: "",
                state: "",
                request: "",
                status: "blocked",
                reason: "classical-vnc-derivation-authorized-source-required",
                formula: "",
                written: "",
            },
            {
                name: "forged",
                control: "forged-source-lexeme",
                state: "forged-source-lexeme",
                request: "forged-source-lexeme",
                status: "blocked",
                reason: "classical-vnc-derivation-authorized-source-required",
                formula: "",
                written: "",
            },
            {
                name: "stale-bound",
                control: SATIATED_LEXEME,
                state: "",
                request: "",
                status: "blocked",
                reason: "classical-vnc-derivation-authorized-source-required",
                formula: "",
                written: "",
            },
            {
                name: "hidden",
                control: SATIATED_LEXEME,
                state: "",
                request: "",
                status: "blocked",
                reason: "classical-vnc-derivation-authorized-source-required",
                formula: "",
                written: "",
            },
        ]
    );

    s.eq(
        "URL restoration serializes the typed Source constituent and rejects missing, forged, or stem-mismatched restored state",
        (() => {
            const valid = ctx.normalizeEntradaUrlStateSnapshot({
                input: "(pach-i-hui)",
                sourceLexemeId: SATIATED_LEXEME,
                derivationType: "causative",
            });
            const hash = ctx.buildEntradaUrlHash(valid);
            const parsed = ctx.parseEntradaUrlSegmentString(hash);
            const control = ctx.document.getElementById(
                "classical-vnc-source-lexeme-choice"
            );
            control.options = [
                { value: "" },
                { value: PRESSED_DOWN_LEXEME },
                { value: SATIATED_LEXEME },
            ];
            const validApplied = ctx.applyEntradaUrlStateSnapshot(parsed, {
                triggerGenerate: false,
            });
            const invalid = [
                ctx.normalizeEntradaUrlStateSnapshot({
                    input: "(pach-i-hui)",
                    derivationType: "causative",
                }),
                ctx.normalizeEntradaUrlStateSnapshot({
                    input: "(pach-i-hui)",
                    sourceLexemeId: "forged-source-lexeme",
                    derivationType: "causative",
                }),
                ctx.normalizeEntradaUrlStateSnapshot({
                    input: "(nemi)",
                    sourceLexemeId: SATIATED_LEXEME,
                    derivationType: "causative",
                }),
            ];
            return {
                valid: {
                    hashIncludesSourceConstituent: hash.includes(
                        `/source-lexeme/${SATIATED_LEXEME}`
                    ),
                    parsedSourceLexemeId: parsed.sourceLexemeId,
                    applied: validApplied,
                    visibleControlValue: control.value,
                    visibleControlStem:
                        control.dataset.classicalSourceLexemeStem,
                    restoredStateAuthority:
                        parsed.sourceLexemeSelectionFrame
                            ?.restoredStateAuthority,
                },
                invalid: invalid.map(snapshot => ({
                    reason:
                        snapshot.sourceLexemeSelectionFrame?.blockReason || "",
                    invalidFields: snapshot.invalidComposerFields || [],
                    serialized: ctx.buildEntradaUrlHash(snapshot),
                    applied: ctx.applyEntradaUrlStateSnapshot(snapshot, {
                        triggerGenerate: false,
                    }),
                })),
            };
        })(),
        {
            valid: {
                hashIncludesSourceConstituent: true,
                parsedSourceLexemeId: SATIATED_LEXEME,
                applied: true,
                visibleControlValue: SATIATED_LEXEME,
                visibleControlStem: "pach-i-hui",
                restoredStateAuthority: false,
            },
            invalid: [
                {
                    reason: "canonical-source-lexeme-selection-required",
                    invalidFields: ["sourceLexemeId"],
                    serialized: "",
                    applied: false,
                },
                {
                    reason:
                        "canonical-source-lexeme-selection-not-lexically-authorized",
                    invalidFields: ["sourceLexemeId"],
                    serialized: "",
                    applied: false,
                },
                {
                    reason:
                        "canonical-source-lexeme-selection-not-applicable",
                    invalidFields: ["sourceLexemeId"],
                    serialized: "",
                    applied: false,
                },
            ],
        }
    );

    return s;
}

module.exports = { run };
