"use strict";

const { createSuite } = require("./runner");

function buildVncRequest(ctx, tiempo, stem = "miki") {
    return {
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput(`(${stem})`),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: `(${stem})`,
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo,
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_authority_firewall");

    s.eq(
        "the exact conditional-table exploit remains blocked in engine and UI paths",
        (() => {
            const forgedTenseTable = {
                condicional: {
                    scope: "andrews-licensed",
                    slot: "tns",
                    family: "forged-conditional",
                },
            };
            const tableReplacement = Reflect.set(
                ctx,
                "ANDREWS_CNV_TENSE_LOGIC_AUTHORITY_BY_TENSE",
                forgedTenseTable,
            );
            const tableRedefinition = Reflect.defineProperty(
                ctx,
                "ANDREWS_CNV_TENSE_LOGIC_AUTHORITY_BY_TENSE",
                {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: forgedTenseTable,
                },
            );
            const coreFunctionReplacement = Reflect.set(
                ctx,
                "getAndrewsCnvTenseLogicAuthorityFrame",
                () => forgedTenseTable.condicional,
            );
            const uiFunctionReplacement = Reflect.set(
                ctx,
                "getAndrewsTenseTabSelectionAuthorityState",
                () => ({ selectionGate: "selectable", blocked: false }),
            );
            const result = ctx.executeNuclearClauseSurfaceRequest(
                buildVncRequest(ctx, "condicional"),
            );
            const uiState = ctx.getAndrewsTenseTabSelectionAuthorityState({
                tenseValue: "condicional",
                mode: ctx.TENSE_MODE.verbo,
                hasOutput: true,
            });
            const classes = new Set(["tense-tab", "is-active"]);
            const attributes = {};
            const element = {
                tagName: "BUTTON",
                dataset: {},
                title: "",
                disabled: false,
                setAttribute(name, value) {
                    attributes[name] = String(value);
                },
                getAttribute(name) {
                    return attributes[name] || "";
                },
                classList: {
                    contains(name) {
                        return classes.has(name);
                    },
                    toggle(name, enabled) {
                        if (enabled) {
                            classes.add(name);
                        } else {
                            classes.delete(name);
                        }
                    },
                },
            };
            ctx.applyAndrewsTenseAuthorityDataset(element, {
                tenseValue: "condicional",
                mode: ctx.TENSE_MODE.verbo,
            });
            ctx.applyAndrewsTenseTabSelectionAuthorityDataset(element, {
                tenseValue: "condicional",
                mode: ctx.TENSE_MODE.verbo,
                hasOutput: true,
            });
            const renderedSurfaces = [
                result.result,
                ...(result.surfaceForms || []),
            ].filter((value) => value && value !== "—");
            return {
                tableReplacement,
                tableRedefinition,
                coreFunctionReplacement,
                uiFunctionReplacement,
                result: result.result,
                surfaceForms: result.surfaceForms || [],
                generationAllowed:
                    result.grammarFrame?.routeContract?.generationAllowed,
                routeStage:
                    result.grammarFrame?.routeContract?.routeStage || "",
                diagnostic: result.diagnostics?.[0]?.id || "",
                formulaEcho: result.nuclearClauseShell?.formulaEcho || "",
                containsForgedSurface: renderedSurfaces.includes("mikiskiat"),
                containsForbiddenClassicalSpelling:
                    renderedSurfaces.some((surface) => /[wk]/iu.test(surface)),
                uiSelectionGate: uiState.selectionGate,
                uiBlocked: uiState.blocked,
                uiAuthority: uiState.frame?.scope || "",
                uiGenerationGate:
                    uiState.generationGate?.generationGate || "",
                uiElementDisabled: element.disabled,
                uiElementAriaDisabled:
                    element.getAttribute("aria-disabled"),
                uiElementActive: classes.has("is-active"),
                uiElementSelectionGate:
                    element.dataset.andrewsSelectionGate,
            };
        })(),
        {
            tableReplacement: false,
            tableRedefinition: false,
            coreFunctionReplacement: false,
            uiFunctionReplacement: false,
            result: "—",
            surfaceForms: [],
            generationAllowed: false,
            routeStage: "andrews-cnv-tense-logic-gate",
            diagnostic: "unclassified-andrews-frame-required",
            formulaEcho: "",
            containsForgedSurface: false,
            containsForbiddenClassicalSpelling: false,
            uiSelectionGate: "blocked",
            uiBlocked: true,
            uiAuthority: "unknown",
            uiGenerationGate: "unclassified-andrews-frame-required",
            uiElementDisabled: true,
            uiElementAriaDisabled: "true",
            uiElementActive: false,
            uiElementSelectionGate: "blocked",
        },
    );

    s.eq(
        "raw and copied formula schemas cannot authorize or replace a formula shell",
        (() => {
            const issuedSchema =
                ctx.getAndrewsFormulaSlotSchema("vnc-shell");
            const forgedSchema = {
                id: "vnc-shell",
                slots: [{ id: "FORGED", token: "FORGED" }],
                sourceRequirements: [],
                generationContract: {
                    generationAllowed: true,
                    generationStatus: "generated",
                },
            };
            const copiedSchema = JSON.parse(JSON.stringify(issuedSchema));
            const registryReplacement = Reflect.set(
                ctx,
                "ANDREWS_FORMULA_SLOT_SCHEMAS",
                { "vnc-shell": forgedSchema },
            );
            const evaluatorReplacement = Reflect.set(
                ctx,
                "evaluateAndrewsFormulaGenerationAuthority",
                () => ({ allowed: true, formula: "FORGED" }),
            );
            const rawAuthority =
                ctx.evaluateAndrewsFormulaGenerationAuthority(
                    forgedSchema,
                    { inputValue: "miki" },
                );
            const copiedAuthority =
                ctx.evaluateAndrewsFormulaGenerationAuthority(
                    copiedSchema,
                    { inputValue: "miki" },
                );
            const issuedAuthority =
                ctx.evaluateAndrewsFormulaGenerationAuthority(
                    issuedSchema,
                    { inputValue: "miki" },
                );
            return {
                registryReplacement,
                evaluatorReplacement,
                rawFormula: ctx.renderAndrewsFormulaTemplate(forgedSchema),
                copiedFormula: ctx.renderAndrewsFormulaTemplate(copiedSchema),
                installedFormula:
                    ctx.renderAndrewsFormulaTemplate("vnc-shell"),
                rawAllowed: rawAuthority.allowed,
                copiedAllowed: copiedAuthority.allowed,
                issuedAllowed: issuedAuthority.allowed,
            };
        })(),
        {
            registryReplacement: false,
            evaluatorReplacement: false,
            rawFormula: "",
            copiedFormula: "",
            installedFormula:
                "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
            rawAllowed: false,
            copiedAllowed: false,
            issuedAllowed: true,
        },
    );

    s.eq(
        "the installed Classical tense inventory still permits a licensed route",
        (() => {
            const result = ctx.executeNuclearClauseSurfaceRequest(
                buildVncRequest(ctx, "presente", "nemi"),
            );
            const authorityFrame =
                ctx.getAndrewsCnvTenseLogicAuthorityFrame("presente");
            const generationGate =
                ctx.getAndrewsCnvTenseLogicGenerationGateFrame(
                    authorityFrame,
                );
            const surfaces = [
                result.result,
                ...(result.surfaceForms || []),
            ].filter((value) => value && value !== "—");
            return {
                generationAllowed:
                    result.grammarFrame?.routeContract?.generationAllowed,
                routeStage:
                    result.grammarFrame?.routeContract?.routeStage || "",
                hasSurface: surfaces.length > 0,
                forbiddenSurfaceCount:
                    surfaces.filter((surface) => /[wk]/iu.test(surface)).length,
                authority: authorityFrame.scope,
                gate: generationGate.generationGate,
            };
        })(),
        {
            generationAllowed: true,
            routeStage: "execute",
            hasSurface: true,
            forbiddenSurfaceCount: 0,
            authority: "andrews-licensed",
            gate: "andrews-licensed-generation",
        },
    );

    return s;
}

module.exports = { run };
