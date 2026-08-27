"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_relational_nnc_ui");
    const root = path.resolve(__dirname, "..", "..");
    const shell = fs.readFileSync(path.join(root, "src", "ui", "shell", "classical_shell.mjs"), "utf8");
    const composer = fs.readFileSync(path.join(root, "src", "ui", "composer", "composer.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(root, "src", "ui", "rendering", "rendering.mjs"), "utf8");
    const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
    const basalControlsStart = shell.indexOf('id="classical-basal-unit-controls"');
    const basalControlsEnd = shell.indexOf("</div>", basalControlsStart);
    const basalControlsMarkup = basalControlsStart >= 0 && basalControlsEnd > basalControlsStart
        ? shell.slice(basalControlsStart, basalControlsEnd)
        : "";
    const authorityStart = shell.indexOf('id="classical-relational-nnc-authority"');
    const authorityEnd = shell.indexOf("</section>", authorityStart);
    const authorityMarkup = authorityStart >= 0 && authorityEnd > authorityStart
        ? shell.slice(authorityStart, authorityEnd)
        : "";

    s.eq(
        "One canonical Nounstem selector owns ordinary and relational lexical entries",
        {
            board: !basalControlsMarkup.includes("relational")
                && !shell.includes('id="classical-nnc-grammar-route"')
                && !shell.includes('id="classical-nnc-grammar-relational"')
                && !shell.includes('data-classical-nnc-grammar-route=')
                && !shell.includes('data-classical-nnc-source-family='),
            source: !shell.includes('id="classical-relational-nnc-source"')
                && shell.includes('id="classical-nnc-source-example"')
                && shell.includes('id="classical-source-parts"')
                && shell.includes('id="classical-source-whole"')
                && shell.includes('id="classical-source-embed"')
                && shell.includes('id="classical-source-matrix"')
                && shell.includes('data-classical-source-authorizes="none"')
                && composer.includes('group.label = "Relational nounstems"')
                && composer.includes('option.dataset.classicalRelationalStemId = entry.stemId')
                && composer.includes('option.dataset.classicalNncSourceMatrix = entry.classicalMatrix'),
            authority: Boolean(authorityMarkup)
                && shell.includes('class="classical-whole-canvas-choice-grid classical-relational-nnc-authority"')
                && authorityMarkup.includes('data-classical-relational-nnc-authority="typed-decisions"'),
            result: rendering.includes('answer.className = "classical-rule-surface__single-nnc"')
                && rendering.includes('answer.dataset.classicalRelationalNncResult = authorized ? "authorized" : "blocked"'),
            auditInventoryVisible: shell.includes("55 LCM axes")
                || shell.includes("44 source claims")
                || shell.includes("ANDREWS_TRANSCRIPTION_CANVAS.md:17912"),
        },
        {
            board: true,
            source: true,
            authority: true,
            result: true,
            auditInventoryVisible: false,
        }
    );

    s.ok(
        "Canvas organization keeps every source in one Nounstem selector and derives relational controls",
        shell.includes('data-classical-vnc-source-guide="canonical-stems"')
            && shell.includes('<optgroup label="Quantity / measure">')
            && shell.includes(
                'data-classical-nnc-source-stem="tle-māi" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="tle" data-classical-nnc-source-matrix="māi"'
            )
            && !shell.includes('data-classical-nnc-source-family=')
            && !shell.includes('id="classical-relational-nnc-source-fact"')
            && !shell.includes('classical-nnc-source-guide__heading')
            && shell.includes('<span class="classical-nnc-source-guide__label">Canonical nounstem</span>')
            && !shell.includes(">Ordinary formation</button>")
            && !shell.includes(">Relational formation</button>")
            && shell.includes(">Stem</button>")
            && shell.includes(">Embed + matrix</button>")
            && !shell.includes('id="classical-relational-nnc-stem"')
            && !shell.includes('id="classical-relational-nnc-embedded-source"')
            && !shell.includes('id="classical-relational-nnc-predicate-source"')
            && !shell.includes(">Compound base</span>")
            && !shell.includes('id="classical-relational-nnc-target-matrix"')
            && shell.includes('id="classical-relational-nnc-operation"')
            && shell.includes('<option value="compound-embed">')
            && shell.includes('<option value="associated-entity">')
            && shell.includes('<option value="pertinency">')
            && shell.includes('id="classical-relational-nnc-source-formation"')
            && shell.includes('id="classical-relational-nnc-pertinency-source"')
            && shell.includes('id="classical-source-identity-controls"')
            && shell.includes('id="classical-rule-logic-valence"')
            && shell.includes('id="classical-rule-logic-class"')
            && composer.includes("const modeActive = nncActive && Boolean(selectedStem?.dataset?.classicalRelationalStemId);")
            && composer.includes("return Boolean(selected?.dataset?.classicalRelationalStemId);")
            && !composer.includes('querySelectorAll("[data-composer-entry-board], [data-ordinary-nnc-mode]')
            && composer.includes('rank: "nounstem"')
            && composer.includes('machine: "Source commits one nounstem request"')
            && composer.includes("applyClassicalRelationalNncSourceStructure(selectedStem, option);")
            && composer.includes("sourceMode,")
            && composer.includes("sourceEmbedStem,")
            && composer.includes("sourceMatrixStem,")
            && composer.includes('kind: "classical-nahuatl-nnc-nounstem-request"')
            && composer.includes("nounstem: {")
            && composer.includes("buildClassicalRelationalNncDeverbalUpstreamResult(")
            && composer.includes("targetObject.requestClassicalDeverbalNncResult({")
            && composer.includes("? { upstreamResult: ownerIssuedDerivedSource }")
            && composer.includes("syncClassicalSourceReadout(getClassicalBasalUnitFromRuntime())")
            && !composer.includes("predicateStem: {\n          kind: \"classical-nahuatl-nnc-nounstem-request\"")
            && !composer.includes("embeddedStem:")
            && !composer.includes("relationalSourceStem:")
            && !composer.includes("targetMatrixStem:")
            && !css.includes('body[data-classical-relational-nnc-mode="true"] #classical-source-parts,')
            && css.includes("#classical-authority-panel .calc-operator--derivation")
            && css.includes("> :not(#classical-relational-nnc-authority)")
            && css.includes(".classical-relational-nnc-authority {\n  grid-template-columns: minmax(0, 1fr);")
    );

    s.ok(
        "derived relational Sources never invent a VNC class and retain their visible Source parts",
        composer.includes(
            'getElementById?.("classical-rule-logic-class")?.value\n        || ""'
        )
            && !composer.includes(
                'getElementById?.("classical-rule-logic-class")?.value\n        || "B"'
            )
            && composer.includes("sourceMode,\n              sourceEmbedStem,")
            && composer.includes(
                "sourceAdmission?.sourceMatrixStem || sourceMatrixStem"
            )
            && composer.includes(
                "...(ownerIssuedDerivedSource\n            ? { upstreamResult: ownerIssuedDerivedSource }"
            )
    );

    s.ok(
        "an exact continued VNC Result supplies the visible relational embed while n remains the matrix",
        rendering.includes(
            "function getClassicalRelationalExactResultEmbedStem("
        )
            && rendering.includes(
                '!["subject", "number"].includes('
            )
            && rendering.includes('.join("-");')
            && rendering.includes(
                'embed.dataset.classicalCapabilityExactResultEmbed = "true";'
            )
            && rendering.includes(
                "sourceEmbedStem,\n          sourceMatrixStem,\n          upstreamResult: exactBinding.exactResult"
            )
    );

    const imperfectImpersonal = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "cochi",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "imperfect",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        nonactiveOptionId: "inherent-impersonal",
    });
    const unresolvedRelationalBinding =
        ctx.issueClassicalNahuatlFormationResultBindingFrame(
            "nnc:relational",
            imperfectImpersonal
        );
    const resolvedRelationalBinding =
        ctx.issueClassicalNahuatlFormationResultBindingFrame(
            "nnc:relational",
            imperfectImpersonal,
            {
                state: "absolutive",
                relationalSubject: "3common",
                subjectMode: "adverbialized",
            }
        );
    s.eq(
        "an exact VNC Result reveals only its genuine relational choices and remains the identical owner input",
        {
            owner: [
                unresolvedRelationalBinding.authorizationStatus,
                unresolvedRelationalBinding.exactResult
                    === imperfectImpersonal,
                unresolvedRelationalBinding.bindingIds,
                unresolvedRelationalBinding.requiredChoiceIds,
                resolvedRelationalBinding.requiredChoiceIds,
                resolvedRelationalBinding.exactResult
                    === imperfectImpersonal,
            ],
            interface: [
                rendering.includes(
                    "function syncClassicalRelationalResultBindingChoiceVisibility("
                ),
                rendering.includes(
                    'body.dataset.classicalRelationalResultBinding = "true";'
                ),
                rendering.includes(
                    'state: Object.freeze([\n          "classical-relational-nnc-state",'
                ),
                rendering.includes(
                    'subject: Object.freeze([\n          "classical-relational-nnc-subject-mode",\n          "classical-relational-nnc-subject",'
                ),
                rendering.includes(
                    'if (binding.operationId !== "nnc:relational") {'
                ),
                rendering.includes(
                    "stageClassicalRelationalResultBindingChoicePrompts(current);"
                ),
                rendering.includes(
                    "syncClassicalRelationalResultBindingChoiceVisibility(null);"
                ),
                css.includes(
                    'body[data-classical-relational-result-binding="true"] #classical-rule-logic-controls .classical-rule-controls-grid > :not(#classical-relational-nnc-authority)'
                ),
            ],
        },
        {
            owner: [
                "authorized",
                true,
                ["relational-source:imperfect-impersonal:n-locative"],
                ["state", "subject"],
                [],
                true,
            ],
            interface: [true, true, true, true, true, true, true, true],
        }
    );

    s.eq(
        "Static relational Grammar options expose semantic values without documentary authority metadata",
        {
            tagCount: Array.from(authorityMarkup.matchAll(/data-classical-authority-option/gu)).length,
            exactWitnessCount: Array.from(authorityMarkup.matchAll(/data-exact-witness/gu)).length,
            semanticOptionCount: Array.from(authorityMarkup.matchAll(/<option\b[^>]*value=/gu)).length,
            runtimeTagApiAbsent: typeof ctx.getClassicalRuleLogicAuthorityOptionTags === "undefined"
                && typeof ctx.CLASSICAL_RULE_LOGIC_AUTHORITY_OPTION_TAGS === "undefined",
        },
        {
            tagCount: 0,
            exactWitnessCount: 0,
            semanticOptionCount: 41,
            runtimeTagApiAbsent: true,
        }
    );

    s.ok(
        "Stem families join the shared Nounstem selector and use owner-issued Source-type admission",
        composer.includes("targetObject.getClassicalNahuatlRelationalStemInventory()")
            && composer.includes('option.value = `relational:${entry.stemId}`')
            && composer.includes("option.dataset.classicalNncSourceStem = entry.classicalMatrix")
            && composer.includes("entry.allowedOptions.join(\" \")")
            && composer.includes("const sourceKind = option === \"option-one\"")
            && shell.includes('id="classical-relational-nnc-source-kind-field" hidden')
            && shell.includes('id="classical-relational-nnc-source-kind" data-classical-relational-nnc-control="source-kind"')
            && composer.includes("issueClassicalRelationalNncUiSourceAdmission({")
            && composer.includes(".issueClassicalNahuatlRelationalSourceAdmissionFrame({")
            && composer.includes("targetObject.isClassicalNahuatlRelationalSourceAdmissionFrame(frame)")
            && composer.includes("frame.allowedSourceKinds.forEach(sourceKind => {")
            && !composer.includes("CLASSICAL_RELATIONAL_NNC_SOURCE_KIND_BY_STEM")
            && !shell.includes('<option value="relational:tlan-bottom"')
    );

    s.ok(
        "Relational embed editing uses the shared Source pending and atomic Enter contract",
        composer.includes("event?.target === embedInput")
            && composer.includes("root.dataset.classicalRelationalNncLastEmbed")
            && composer.includes("setClassicalSourcePartsPendingState(")
            && composer.includes("commitClassicalSourcePartsEvaluation({")
            && !composer.includes("commitClassicalRelationalNncUiSource")
    );

    s.eq(
        "The public route reaches the canonical engine and returns the selected formula and finite surface",
        typeof ctx.requestClassicalRelationalNncResult === "function"
            ? (() => {
                const result = ctx.requestClassicalRelationalNncResult({
                    nounstem: {
                        kind: "classical-nahuatl-nnc-nounstem-request",
                        stemId: "tlan-bottom",
                        operation: "relational-nnc",
                        formation: "option-two",
                        sourceKind: "nounstem",
                        sourceMode: "embed-matrix",
                        sourceStem: "cal",
                        sourceEmbedStem: "cal",
                        sourceMatrixStem: "tlan",
                    },
                    state: "absolutive",
                    subjectMode: "adverbialized",
                });
                return {
                    status: result.authorizationStatus,
                    formula: result.formula,
                    surface: result.surface,
                    sentenceSurface: result.sentenceSurface,
                    sentenceFormula: result.sentenceFormulaDisplay,
                    diagramRoles: result.diagrammaticProjection?.rows.map(
                        row => row.role
                    ),
                    predicate: result.predicateStem,
                    oneNncPredicate: result.predicateStemFrame?.oneNncPredicate,
                    route: result.outputKind,
                    formulaStringAuthority: result.formulaStringAuthority,
                    surfaceStringAuthority: result.surfaceStringAuthority,
                };
            })()
            : null,
        {
            status: "authorized",
            formula: "#Ø-Ø(cal-lan)Ø-Ø#",
            surface: "callan",
            sentenceSurface: "Callan.",
            sentenceFormula: "#Ø-Ø(cal-lan)Ø-Ø#.",
            diagramRoles: ["Subject", "Predicate", "embed", "matrix"],
            predicate: "callan",
            oneNncPredicate: true,
            route: "relational-nnc",
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        }
    );

    s.eq(
        "changing the embedded-source formation stays in the same Nounstem workflow and consumes the owner-issued Result",
        (() => {
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
                    sourceMode: "embed-matrix",
                    upstreamResult: upstream,
                },
                state: "absolutive",
                subjectMode: "adverbialized",
            });
            return {
                sameSourceControl:
                    shell.includes('id="classical-source-embed"')
                    && !shell.includes(
                        'id="classical-relational-nnc-derived-source"'
                    ),
                sameGrammarControl:
                    shell.includes(
                        'id="classical-relational-nnc-source-formation"'
                    )
                    && !shell.includes(
                        'id="classical-relational-nnc-runtime-route"'
                    ),
                upstreamOperation: upstream.operationFrame?.operationId,
                status: result.authorizationStatus,
                sourceOwner:
                    result.sourceFrame?.upstreamSourceCarrier?.ownerOperationId,
                formula: result.formula,
                surface: result.surface,
            };
        })(),
        {
            sameSourceControl: true,
            sameGrammarControl: true,
            upstreamOperation:
                "predicate-nominalization:preterit-agentive",
            status: "authorized",
            sourceOwner: "predicate-nominalization:preterit-agentive",
            formula: "#Ø-Ø(mich-namaca-0-cā-n)Ø-Ø#",
            surface: "michnamacacān",
        }
    );

    s.ok(
        "Result consumes the routed typed result through the shared NNC result vocabulary without relational-only result CSS",
        rendering.includes("targetObject.requestClassicalRelationalNncResult(request)")
            && rendering.includes("const canonical = result;")
            && !rendering.includes("executeRelationalNncGenerationRoute")
            && rendering.includes("const displaySurface = authorized")
            && rendering.includes("surface.textContent = displaySurface;")
            && rendering.includes("formula.textContent = canonical.formula;")
            && rendering.includes('answer.className = "classical-rule-surface__single-nnc";')
            && rendering.includes('linear.className = "classical-rule-surface__format-section classical-rule-surface__linear";')
            && rendering.includes('diagram.className = "classical-rule-surface__format-section classical-rule-surface__diagram";')
            && rendering.includes("canonical.diagrammaticProjection || null")
            && rendering.includes("relationalDiagrammaticProjection?.rows")
            && rendering.includes('canonical.sentenceFormulaDisplay || ""')
            && shell.includes('id="classical-relational-nnc-derived-state-field"')
            && shell.includes('id="classical-relational-nnc-derived-subject-field"')
            && rendering.includes('"classical-relational-nnc-derived-state-field"')
            && rendering.includes('"classical-relational-nnc-derived-subject-field"')
            && composer.includes('derivedStateField: byId("classical-relational-nnc-derived-state-field")')
            && composer.includes("elements.derivedStateField.hidden = !fixedState")
            && composer.includes('derivedSubjectField: byId("classical-relational-nnc-derived-subject-field")')
            && composer.includes("elements.derivedSubjectField.hidden = !subjectIsDerived")
            && css.includes(".classical-rule-control__derived-value")
            && !rendering.includes('[request.relationalSourceStem || request.embeddedStem || "—", "source"]')
            && !rendering.includes('[request.stemId || "—", "relational matrix"]')
            && !rendering.includes('join(" → "), "boundary realization"')
            && !css.includes(".classical-relational-nnc-result")
    );

    return s;
}

module.exports = { run };
