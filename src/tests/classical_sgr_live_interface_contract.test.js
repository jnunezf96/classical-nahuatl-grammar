"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    currentBrowserCacheKey,
    usesBrowserCacheKey,
} = require("./helpers/browser_cache_chain");

const ROOT = path.resolve(__dirname, "..", "..");
const read = relativePath => fs.readFileSync(
    path.join(ROOT, relativePath),
    "utf8"
);

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_live_interface_contract");
    const rendering = read("src/ui/rendering/rendering.mjs");
    const shell = read("src/ui/shell/classical_shell.mjs");
    const composer = read("src/ui/composer/composer.mjs");
    const events = read("src/ui/events/events.mjs");
    const vncApplication = read("src/application/classical/vnc_application.mjs");
    const nncApplication = read("src/application/classical/nnc_application.mjs");
    const participantFrame = read("src/core/classical/participant_frame.mjs");
    const css = read("style.css");
    const index = read("index.html");
    const browserMain = read("src/browser/main.mjs");
    const bootstrap = read("src/bootstrap/bootstrap.mjs");
    const bridge = read("src/bootstrap/runtime_bridge.mjs");
    const runtime = read("src/runtime/create_runtime.mjs");
    const presentationUnitStart = rendering.indexOf(
        "function getClassicalCustomConstructionPresentationUnit"
    );
    const presentationUnitEnd = rendering.indexOf(
        "function getClassicalCustomFormationDestination",
        presentationUnitStart + 1
    );
    const presentationUnit = presentationUnitStart >= 0
        && presentationUnitEnd > presentationUnitStart
        ? rendering.slice(presentationUnitStart, presentationUnitEnd)
        : "";
    const operationHandlersStart = rendering.indexOf(
        "const ClassicalNominalConstructionOperationHandlers"
    );
    const operationHandlersEnd = rendering.indexOf(
        "const CLASSICAL_CUSTOM_CONSTRUCTION_SOURCE_ANALYSIS_CONTROL_IDS",
        operationHandlersStart + 1
    );
    const operationHandlers = operationHandlersStart >= 0
        && operationHandlersEnd > operationHandlersStart
        ? rendering.slice(operationHandlersStart, operationHandlersEnd)
        : "";
    const sourceOperationRouteIds = Array.from(
        operationHandlers.matchAll(/^\s+"([^"]+)":/gmu),
        match => match[1]
    );

    suite.ok(
        "NNC controls fixed by Source or grammar are not rendered as disabled inputs",
        rendering.includes(": available === true")
            && rendering.includes("ordinaryNnc && contract.metaphoricalUseAvailable")
    );
    suite.ok(
        "Source operation is placed immediately before Apply source",
        rendering.includes("sourceCommitRow.parentElement.insertBefore(")
            && rendering.includes("constructionSourceControls,")
            && rendering.includes("sourceCommitRow")
    );
    suite.ok(
        "Clear sits beside Apply source and returns the committed Source path to waiting",
        shell.includes('id="verb-entry-clear"')
            && shell.includes('class="classical-source-parts__clear-button"')
            && shell.includes('>Clear</button>')
            && shell.includes('clearButton.disabled = !draftHasSource && !committedSource')
            && composer.includes("function clearClassicalSourcePartsEvaluation(options = {})")
            && composer.includes("setClassicalSourcePartsMode(CLASSICAL_SOURCE_PARTS_MODE.wholeStem")
            && composer.includes('operation.value = "none"')
            && composer.includes("syncClassicalSourcePartsToEntradaUrl()")
            && composer.includes("targetObject.clearClassicalRuleLogicSurfaceBlock?.()")
            && composer.includes("api.clearClassicalSourcePartsEvaluation = clearClassicalSourcePartsEvaluation")
            && events.includes('getElementById("verb-entry-clear")')
            && events.includes("targetObject.clearClassicalSourcePartsEvaluation?.({")
            && rendering.includes('"#verb-entry-clear"')
            && css.includes("#verb-entry-clear.classical-source-parts__clear-button")
    );
    suite.eq(
        "Clear removes the committed mirror before the empty Source can refresh Grammar and Result",
        (() => {
            const documentObject = ctx.document;
            const whole = documentObject.getElementById(
                "classical-source-whole"
            );
            const mirror = documentObject.getElementById("verb");
            const operation = documentObject.getElementById(
                "classical-construction-operation"
            );
            const result = documentObject.getElementById(
                "classical-rule-logic-surface"
            );
            const sourceRoot = documentObject.getElementById(
                "classical-source-parts"
            );
            whole.value = "caqui";
            mirror.value = "(caqui)";
            operation.value = "denominal-vnc";
            result.hidden = false;
            result.innerHTML = "stale result";
            sourceRoot.dataset.classicalSourceCommitState = "committed";
            const cleared = ctx.clearClassicalSourcePartsEvaluation({
                source: "clear-button-contract"
            });
            return {
                cleared,
                whole: whole.value,
                mirror: mirror.value,
                operation: operation.value,
                resultHidden: result.hidden,
                resultText: result.textContent,
                commitState:
                    sourceRoot.dataset.classicalSourceCommitState,
            };
        })(),
        {
            cleared: true,
            whole: "",
            mirror: "_",
            operation: "none",
            resultHidden: true,
            resultText: "",
            commitState: "committed",
        }
    );
    suite.ok(
        "Speaker and participant context is gated to its real discourse use",
        rendering.includes('String(surfaceFrame.state?.nncState || "") === "vocative"')
            && rendering.includes('=== "supplementation"')
            && rendering.includes("sourceContextControls.hidden = !hasVisibleContextChoice")
    );
    suite.ok(
        "Source-operation VNC Results reuse the split subject controls while the old combined selector stays a mirror",
        rendering.includes(
            "CLASSICAL_CUSTOM_CONSTRUCTION_MANAGED_CONTROL_IDS.map(id => [id, false])"
        )
            && rendering.includes(
                '"classical-rule-logic-subject",\n          false'
            )
            && [
                "classical-rule-logic-vnc-subject-person",
                "classical-rule-logic-vnc-subject-animacy",
                "classical-rule-logic-vnc-subject-humanness",
                "classical-rule-logic-vnc-subject-number",
            ].every(id => rendering.includes(`"${id}"`))
            && rendering.includes("vncResultSelected || adverbialVncMatrix")
            && rendering.includes('currentBasalUnit === "nnc"')
    );
    suite.ok(
        "NNC controls return to their named Grammar groups",
        rendering.includes("CLASSICAL_NNC_GRAMMAR_CONTROL_GROUPS[id]")
            && rendering.includes("nncPresentation?.groups?.[nncGroup]?.body")
            && shell.includes('data-classical-nnc-authority-heading="state"')
    );
    suite.ok(
        "organic possession derives possessive state without leaving a false user choice",
        rendering.includes("const organicPossessionStateIsDerived =")
            && rendering.includes(
                '=== "organic-possession";'
            )
            && rendering.includes(
                "nncStateUsed && !organicPossessionStateIsDerived"
            )
            && rendering.includes(
                "nncStateControl.dataset.classicalDerivedOrganicPossessionState"
            )
    );
    suite.ok(
        "a VNC Source operation that produces an NNC keeps its NNC Grammar lane visible",
        rendering.includes("const customNncPresentationActive = Boolean(")
            && rendering.includes(
                'controls?.dataset?.classicalCustomConstructionActive === "true"'
            )
            && rendering.includes(
                'controls.dataset.classicalCustomConstructionSurfaceUnit === "nnc"'
            )
            && rendering.includes(
                "controls.dataset.classicalCustomConstructionSurfaceUnit = unit"
            )
            && rendering.includes(
                "presentation?.organizer && !customNncPresentationActive"
            )
    );
    suite.ok(
        "deverbal patientives keep one visible nonactive Source choice for passive, impersonal, and reflexive paths",
        rendering.includes("const syncNonactiveSourceFormationChoice = () =>")
            && rendering.includes('"passive-core": "passive"')
            && rendering.includes('"impersonal-core": "impersonal"')
            && rendering.includes('const previewValence = sourceValence === "mainline-reflexive"')
            && rendering.includes("requestedVoice: patientiveNonactiveVoice")
            && rendering.includes("Choose the nonactive Source formation")
            && rendering.includes("classicalDeverbalNonactiveSelectionRequired")
    );
    suite.ok(
        "every custom formation is placed after normal controls in one physical lane per Grammar host",
        rendering.includes("function getOrCreateClassicalCustomFormationLane(")
            && rendering.includes('? "verbstem"')
            && rendering.includes('? "valence"')
            && rendering.includes('? "sentence"')
            && rendering.includes("destination.appendChild(lane)")
            && rendering.includes(
                "wrapper.dataset.classicalConstructionGrammarGroup = semanticGroup"
            )
            && rendering.includes(
                "wrapper.dataset.classicalConstructionGrammarHost = hostGroup"
            )
            && rendering.includes("if (!hostGroup) {")
            && rendering.includes("formationControls.forEach(node => lane.appendChild(node))")
            && rendering.includes('predicate: "Predicate"')
            && css.includes(".classical-construction-grammar-lane")
            && css.includes("order: 100;")
    );
    suite.ok(
        "the separator appears only when normal and route-specific controls share the same Grammar host",
        rendering.includes(
            'lane.parentElement?.querySelectorAll?.(".classical-rule-control")'
        )
            && rendering.includes("activeOrganizer?.contains?.(lane)")
            && rendering.includes(
                "const separated = visible && normalVisibleCount > 0"
            )
            && css.includes(
                '.classical-construction-grammar-lane[data-classical-construction-separated-from-normal="true"]'
            )
            && css.includes("border-top: 1px solid var(--workbench-line);")
    );
    suite.ok(
        "custom VNC routes stay inside the five named VNC Grammar blocks",
        rendering.includes(
            "subject.section,\n          valence.section,\n          verbstem.section,\n          tense.section,\n          sentence.section"
        )
            && rendering.includes('["derivation", "verbstem", "state"].includes(group)')
            && rendering.includes(
                "wrapper.dataset.classicalConstructionGrammarGroup = semanticGroup"
            )
            && rendering.includes(
                "controls.dataset.classicalCustomConstructionActive"
            )
            && css.includes(".classical-vnc-authority-section")
            && css.includes(")[hidden] {")
    );
    suite.ok(
        "adverbial placement follows its Result scope rather than its Source unit",
        presentationUnit.includes("frame?.operationFrame?.scope")
            && presentationUnit.includes('scope === "incorporated-predicate"')
            && presentationUnit.includes("|| (!frame")
            && /value="adverbial-nuclear"[^>]+data-classical-result-unit="nnc-or-vnc"[^>]*>NNC Source → adverbial use → NNC or VNC Result/.test(shell)
            && rendering.includes("const adverbialPotentialAuthorized =")
            && rendering.includes('adverbialPotentialFrame?.authorizationStatus === "authorized"')
            && rendering.includes("const context = adverbialPotentialAuthorized ? {")
            && /const basalUnit = String\(\s*targetObject\.document\?\.getElementById\("classical-source-parts"\)[\s\S]*?classicalSourcePathUnit[\s\S]*?classical-basal-unit-controls/.test(rendering)
            && !presentationUnit.includes("sourceFrame?.clauseKind")
    );
    suite.ok(
        "Output scope remains owned by Result",
        shell.includes('data-classical-result-scope-control="nnc"')
            && rendering.includes('id.endsWith("-output-scope")')
            && rendering.includes("#classical-result-panel .classical-result-scope-controls")
    );
    suite.ok(
        "Result uses natural-height rows and top-aligned actions",
        css.includes("grid-template-rows: none;")
            && css.includes("grid-auto-rows: max-content;")
            && css.includes(".classical-rule-surface__actions > button")
            && css.includes("align-self: flex-start;")
    );
    suite.ok(
        "every single Result route keeps all structures visible and exposes only the specificity axis",
        rendering.includes("function createClassicalResultSpecificitySwitch(")
            && rendering.includes("function createClassicalResultPresentationSwitchRow(")
            && rendering.includes(
                'group.dataset.classicalResultPresentationAxis = "specificity"'
            )
            && rendering.includes(
                'row.dataset.classicalResultPresentationSwitches = "specificity"'
            )
            && rendering.includes(
                "projection: `source-operation:${selectedConstruction}`"
            )
            && rendering.includes(
                'projection: "relational-nnc"'
            )
            && rendering.includes(
                "createClassicalResultPresentationSwitchRow(resultSpecificitySwitch)"
            )
            && rendering.includes(
                "createClassicalResultPresentationSwitchRow(specificitySwitch)"
            )
            && rendering.includes(
                '"Linear, diagram, and sentence · specific or general"'
            )
            && css.includes(".classical-rule-surface__presentation-switches")
            && !rendering.includes('textContent = "Linear"')
            && !rendering.includes('textContent = "Diagram"')
            && !rendering.includes("setStructureView")
    );
    suite.ok(
        "NNC sentence particles live inside the same Sentence block as the other sentence choices",
        rendering.includes(
            '#classical-rule-logic-controls [data-classical-nnc-authority-order^=\\"sentence-\\"]'
        )
            && rendering.includes(
                'wrapper.dataset.classicalNncGrammarGroup = "sentence"'
            )
            && rendering.includes("sentenceBody.appendChild(wrapper)")
    );
    suite.ok(
        "VNC Grammar sections use the same bounded block language as NNC groups",
        rendering.includes(
            'entry.section.dataset.classicalVncGrammarSection ='
        )
            && ["Subject", "Valence", "Verbstem", "Tense", "Sentence"].every(
                title => rendering.includes(`createPersistentSection("${title.toLowerCase()}", "${title}", "")`)
            )
            && css.includes("VNC and NNC use the same bounded Grammar-section language")
            && css.includes('.classical-vnc-authority-section {')
            && css.includes("background: var(--workbench-panel-bg-soft);")
    );
    suite.ok(
        "VNC controls are assigned to Subject, Valence, Verbstem, Tense, and Sentence by grammatical role",
        rendering.includes('orderRole.startsWith("subject-")')
            && rendering.includes('orderRole === "verbstem-causative-result-subject"')
            && rendering.includes('orderRole.startsWith("predicate-object")')
            && rendering.includes('orderRole === "predicate-tla-fusion"')
            && rendering.includes('orderRole === "predicate-mood"')
            && rendering.includes('orderRole === "predicate-tense"')
            && rendering.includes('orderRole === "predicate-directional"')
            && rendering.includes('orderRole.startsWith("sentence-")')
            && rendering.includes(': sectionBody("verbstem")')
            && shell.includes('data-classical-source-identity-control="valence"')
            && shell.includes('data-classical-source-identity-control="class"')
    );
    suite.ok(
        "VNC Subject exposes Person, Animacy, and Number instead of one combined user choice",
        shell.includes('id="classical-rule-logic-vnc-subject-person"')
            && shell.includes('id="classical-rule-logic-vnc-subject-animacy"')
            && shell.includes('id="classical-rule-logic-vnc-subject-humanness"')
            && shell.includes('id="classical-rule-logic-vnc-subject-number"')
            && shell.includes('data-classical-vnc-subject-agreement-mirror="true" hidden')
            && rendering.includes('"classical-rule-logic-subject": false')
            && rendering.includes('"classical-rule-logic-vnc-subject-person": basalUnit === "vnc"')
            && rendering.includes('"classical-rule-logic-vnc-subject-animacy": basalUnit === "vnc"')
            && rendering.includes('"classical-rule-logic-vnc-subject-humanness": basalUnit === "vnc"')
            && rendering.includes('"classical-rule-logic-vnc-subject-number": basalUnit === "vnc"')
    );
    suite.ok(
        "VNC humanness follows Canvas without being collapsed into animacy",
        participantFrame.includes('humanness === "nonhuman"')
            && participantFrame.includes('person = "3";')
            && participantFrame.includes('humanness = "human";')
            && rendering.includes('["human", "nonhuman"]')
            && rendering.includes('subjectFrame.humanness === "nonhuman"')
            && composer.includes('humannessControl?.value === "human"')
            && composer.includes('humannessControl?.value === "nonhuman"')
            && composer.includes('if (personControl) personControl.value = "3";')
            && composer.includes('if (humannessControl) humannessControl.value = "nonhuman";')
            && vncApplication.includes('sourceSubjectHumanness')
            && vncApplication.includes('buildClassicalNahuatlParticipantFrame({')
    );
    suite.ok(
        "Canvas nonanimate VNC subjects remain referential third-person common number with singular agreement morphology",
        rendering.includes('buildClassicalNahuatlParticipantFrame({')
            && rendering.includes('hasReferent: true')
            && rendering.includes('impersonal: false')
            && composer.includes('agreementControl.value = nonanimate')
            && composer.includes('subjectFamily === "nnc" ? "3common" : "3sg"')
            && participantFrame.includes('kind: "classical-nahuatl-participant-frame"')
            && participantFrame.includes('const morphologicalAgreement = category === "3common"')
            && participantFrame.includes('commonNumberUsesSingularMorphology: !impersonal && animacy === "nonanimate"')
    );
    suite.ok(
        "NNC and VNC subject controls share the same Canvas participant categories",
        shell.includes('id="classical-rule-logic-nnc-subject-humanness"')
            && rendering.includes('nncHumanness')
            && rendering.includes('contract.humannessValues')
            && vncApplication.includes('buildClassicalNahuatlParticipantFrame')
            && nncApplication.includes('subjectParticipantFrame')
    );
    suite.ok(
        "the independent VNC animacy fact survives a shared URL while agreement remains backward compatible",
        composer.includes('{ id: "classical-rule-logic-subject", defaultValue: "1sg" }')
            && composer.includes('{ id: "classical-rule-logic-vnc-subject-animacy", defaultValue: "animate" }')
            && rendering.includes('sourceSubjectAnimacy: state.subjectAnimacy')
            && vncApplication.includes('sourceSubjectAnimacy,')
            && vncApplication.includes('sourceSubjectFrame,')
    );
    suite.ok(
        "VNC Source keeps the Valence choice visible before later verb machinery exists",
        rendering.includes('"classical-rule-logic-valence": basalUnit === "vnc"')
            && !rendering.includes('"classical-rule-logic-valence": capabilities.valence === true')
            && shell.includes('<option value="intransitive" selected>intransitive · no source object</option>')
            && shell.includes('data-classical-source-identity-control="valence"')
    );
    suite.ok(
        "Source operation continues the active VNC or NNC Source path instead of floating as a separate card",
        shell.includes("function syncClassicalSourceNestingStructure()")
            && shell.includes('getOrCreateSection("identity", "Source identity")')
            && shell.includes('getOrCreateSection("form", `${activeUnitLabel} Source`)')
            && shell.includes('getOrCreateSection("analysis", "Source analysis")')
            && shell.includes('operationLane.dataset.classicalSourcePathLane = "operation"')
            && shell.includes('operationLaneHeading.textContent = "Operation"')
            && shell.includes('operationLabel.textContent = "Next operation"')
            && shell.includes("const mountInStableOrder = (parent, nodes = []) =>")
            && shell.includes("mountInStableOrder(form, [")
            && shell.includes("operationLane,")
            && shell.includes('"classical-source-identity-controls"')
            && shell.includes('"classical-construction-source-controls"')
            && shell.includes('root.dataset.classicalSourceNesting = "identity-form-path-analysis"')
            && shell.includes("function installClassicalSourcePathSync()")
            && shell.includes("const activeBasalUnitButton = basalUnitControls?.querySelector?.(")
            && shell.includes("subtree: true")
            && shell.includes('attributeFilter: ["data-classical-basal-unit", "aria-pressed"]')
            && shell.includes("installClassicalSourcePathSync();")
            && shell.indexOf("operationLane,", shell.indexOf("mountInStableOrder(form, ["))
                < shell.indexOf('"classical-transcription-keyboard"', shell.indexOf("mountInStableOrder(form, ["))
            && composer.includes("option.hidden = !available")
            && composer.includes("option.disabled = !available")
            && composer.includes("group.hidden = !available")
            && composer.includes("group.disabled = !available")
            && !composer.includes("construction.insertBefore(activeGroup, firstSourceGroup)")
            && !shell.includes('getOrCreateSection("operation", "Source operation")')
            && css.includes(".classical-source-outline__section")
            && css.includes(".classical-source-path-lane__heading")
    );
    suite.ok(
        "the three panels expose one typed composition path instead of three route islands",
        shell.includes('workbench.dataset.classicalCompositionPath =')
            && shell.includes('"typed-source-grammar-result"')
            && shell.includes('[sourcePanel, "1", "source", "present-typed-facts"]')
            && shell.includes('[grammarPanel, "2", "grammar", "genuine-open-choices"]')
            && shell.includes('[resultPanel, "3", "result", "owner-issued-fullness"]')
            && shell.includes('markSection(resultContinuation, "licensed-continuation")')
            && shell.includes('"exact-result-to-licensed-consumer"')
            && rendering.includes("function syncClassicalResultContinuationCue(")
            && rendering.includes('"Result → Source available."')
            && rendering.includes('"No direct handoff. Choose below."')
            && rendering.includes('continueAction.textContent = "Continue this Result"')
            && rendering.includes('"exact-result-to-source"')
            && /\[data-classical-construction-grammar-lane\] \{\s*display: contents;/.test(css)
            && css.includes("wrapper contributes no visual island")
            && /\[data-classical-result-outline-section="continuation"\][\s\S]*?> \.classical-grammar-continuation[\s\S]*?> \.classical-clause-relation-workflow \{[\s\S]*?padding: 0;[\s\S]*?border: 0;[\s\S]*?background: transparent;[\s\S]*?box-shadow: none;/.test(css)
    );
    suite.ok(
        "the workbench shows one live owner-observed Source to continuation journey",
        shell.includes("function ClassicalCompositionPathSummary()")
            && [
                '["source", "Source", "VNC"]',
                '["grammar", "Grammar", "Waiting"]',
                '["result", "Result", "Waiting"]',
                '["continue", "Continue", "Waiting"]',
            ].every(contract => shell.includes(contract))
            && shell.includes('data-classical-composition-path-summary-step="${step}"')
            && shell.includes('data-classical-composition-path-summary-value="${step}"')
            && shell.includes('data-classical-composition-path-summary-detail="${step}"')
            && !shell.includes('data-classical-composition-path-summary-layers="true"')
            && !shell.includes('data-classical-composition-path-summary-next-layers="true"')
            && shell.includes('data-classical-composition-path-summary-authority="presentation-only"')
            && shell.includes('data-classical-grammar-authority="false"')
            && shell.includes('data-classical-formula-string-authority="false"')
            && shell.includes('data-classical-surface-string-authority="false"')
            && rendering.includes("function syncClassicalCompositionPathSummary(")
            && rendering.includes("surfaceFrame?.state?.stem")
            && rendering.includes('targetObject.document.getElementById("verb")?.value')
            && rendering.includes("selectedOperation?.dataset?.classicalGrammarOperation")
            && rendering.includes("getClassicalGrammarApplicationLayerGraph")
            && rendering.includes("isClassicalGrammarApplicationLayerGraph")
            && rendering.includes("getClassicalGrammarApplicationNextOperationInventory")
            && !rendering.includes('data-classical-composition-path-summary-layers="true"')
            && !rendering.includes("classicalCompositionPathLayerOperation")
            && !rendering.includes("classicalCompositionPathNextOperation")
            && rendering.includes("classicalCompositionPathSummaryLayerCount")
            && !css.includes("classical-composition-path-summary__layer")
            && !css.includes("classical-composition-path-summary__next-layer")
            && rendering.includes("resultRoot?.dataset?.classicalNahuatlSurfaceStatus")
            && rendering.includes('"exact-result-to-source-and-capture"')
            && rendering.includes('"exact-result-capture-only"')
            && rendering.includes('"authorized-result-required"')
            && rendering.includes('grammarPathState = grammarDependencyState !== "ready"')
            && rendering.includes('? "needs-choice"')
            && rendering.includes('element.dataset.classicalCompositionPathLiveState = state')
            && rendering.includes('sourceUnit === "nnc"')
            && rendering.includes('"classical-rule-logic-valence"')
            && rendering.includes('const subjectPrefix = `classical-rule-logic-${resultUnit}-subject-`;')
            && rendering.includes('"classical-rule-logic-vnc-voice"')
            && rendering.includes('"classical-rule-logic-nnc-state"')
            && rendering.includes('const canonicalSurface = authorized && outputScope === "single"')
            && rendering.includes('[data-classical-result-primary-answer="true"]')
            && rendering.includes('".classical-rule-surface__single-vnc-surface, "')
            && rendering.includes('directCandidate?.projection?.sourceStem')
            && rendering.includes('"owner-issued-primary-answer"')
            && rendering.includes('continue: directCandidate\n          ? "Result → Source"')
            && rendering.includes('continue: nextSourceStem\n          ? `(${nextSourceStem})`')
            && rendering.includes("function syncClassicalInterfaceChoicePathways()")
            && rendering.includes("function syncClassicalInterfaceChoicePathways()")
            && rendering.includes('select, textarea, input:not([type="button"]):not([type="submit"])')
            && rendering.includes(".classical-nnc-source-guide__field, label")
            && rendering.includes("element.dataset.classicalChoicePathPanel = panel")
            && rendering.includes("element.dataset.classicalChoicePathOrder = String(index + 1)")
            && rendering.includes("element.dataset.classicalChoicePathState = state")
            && rendering.includes("element.dataset.classicalChoicePathNext = nextLabel")
            && rendering.includes("element.dataset.classicalChoiceOptionCount = String(optionCount)")
            && rendering.includes('node.kind === "choice-group" && element !== control')
            && rendering.includes('"choice-option"')
            && rendering.includes('kind: "action"')
            && rendering.includes('kind: "choice-group"')
            && rendering.includes('"path-choice"')
            && rendering.includes('"transition-action"')
            && rendering.includes('"support-action"')
            && rendering.includes('"reading-cue"')
            && rendering.includes('"unclassified"')
            && rendering.includes("classicalInterfaceControlRole")
            && rendering.includes("classicalInterfaceChoicePathObserver")
            && rendering.includes('attributeFilter: [')
            && rendering.includes('"aria-hidden"')
            && rendering.includes("schedulePathwayRefresh")
            && rendering.includes("renderClassicalUnavailableNominalConstructionSelection(")
            && rendering.includes("CLASSICAL_SOURCE_OPERATION_APPLICATION_IDS")
            && rendering.includes("getClassicalSourceOperationBlockPrompt(")
            && rendering.includes("sourceOperationApplicationResult?.blockReason")
            && rendering.includes("block.dataset.classicalBlockReason = prompt.blockReason")
            && !rendering.includes(
              "This pathway needs more typed Source or Grammar information before it can issue a Result."
            )
            && rendering.includes('key.startsWith("classicalBlock")')
            && rendering.includes('clearClassicalNominalConstructionResultDatasets(block);')
            && rendering.includes('surfaceFrame.blockReason || "classical-selected-output-not-authorized"')
            && rendering.includes('[data-classical-result-recovery-action="true"]')
            && rendering.includes("requestAnimationFrame")
            && rendering.includes("const rowDifference = leftRect.top - rightRect.top")
            && rendering.includes('nncOptionContract.selectedHumanness === "nonhuman"')
            && rendering.includes("const nncPresentationOptionContract = {")
            && rendering.includes("nncPresentationOptionContract.subjectPersonValues")
            && rendering.includes('"presentation-only"')
            && rendering.includes("api.syncClassicalInterfaceChoicePathways =")
            && rendering.includes("function refreshClassicalCompositionPathSummary()")
            && rendering.includes("ActiveClassicalRuleLogicSurfaceFrame,")
            && rendering.includes('"classical-rule-logic-surface"')
            && rendering.includes("api.refreshClassicalCompositionPathSummary =")
            && shell.includes('"classical:source-path-synchronized"')
            && shell.includes("documentObject.dispatchEvent(new EventConstructor(")
            && rendering.includes("classicalCompositionPathRefreshListener")
            && rendering.includes("api.refreshClassicalCompositionPathSummary();")
            && rendering.includes("syncClassicalCompositionPathSummary(surfaceFrame, resultRoot);")
            && css.includes(".classical-composition-path-summary")
            && css.includes("minmax(0, 0.82fr)")
            && css.includes("minmax(0, 0.98fr)")
            && css.includes("minmax(0, 0.67fr)")
            && css.includes('data-classical-composition-path-step-state="ready"')
            && css.includes('data-classical-composition-path-live-state="needs-choice"')
            && css.includes(".classical-composition-path-summary__detail")
            && css.includes("data-classical-choice-option-summary")
            && rendering.includes("element.dataset.classicalChoicePathNext = nextLabel")
            && !css.includes('content: "Next → " attr(data-classical-choice-path-next)')
            && css.includes('[data-classical-nnc-authority-order="subject-animacy"]')
            && css.includes('[data-classical-nnc-authority-order="subject-humanness"]')
            && css.includes('content: "→";')
    );
    suite.ok(
        "Grammar shows one compact exact applied-operation account without expanding the top path strip",
        shell.includes('id="classical-applied-grammar-account"')
            && shell.includes('data-classical-applied-grammar-account="true"')
            && shell.includes('data-classical-applied-grammar-path="true"')
            && shell.includes('data-classical-applied-grammar-changes="true"')
            && shell.includes('data-classical-applied-grammar-preserves="true"')
            && shell.includes('data-classical-presentation-only="true"')
            && shell.includes('data-classical-grammar-authority="false"')
            && rendering.includes("function syncClassicalAppliedGrammarAccount(")
            && rendering.includes("getClassicalGrammarApplicationInventory")
            && rendering.includes("rhymeRoutePlaneFrame?.compatibilitySignature")
            && rendering.includes("...(signature.adds || [])")
            && rendering.includes("...(signature.removes || []).map")
            && rendering.includes("...(signature.emits || [])")
            && rendering.includes("preserves.push(...(signature.preserves || []))")
            && rendering.includes('account.dataset.classicalAppliedGrammarAuthority = "presentation-only"')
            && rendering.includes('account.dataset.classicalGrammarAuthority = "false"')
            && rendering.includes("syncClassicalAppliedGrammarAccount(ownerProjection, layerGraph)")
            && css.includes(".classical-applied-grammar-account {")
            && css.includes(".classical-applied-grammar-account__facts {")
            && !shell.includes('data-classical-composition-path-summary-layers="true"')
            && !shell.includes('data-classical-composition-path-summary-next-layers="true"')
    );
    suite.ok(
        "one pending operation follows the exact applied chain and stable semantic mounts do not reshuffle",
        rendering.includes("function reconcileClassicalCompositionOperationControls(")
            && rendering.includes('"one-pending-operation-after-exact-applied-layers"')
            && rendering.includes("exactAppliedLayersRemainInResultIdentity: true")
            && rendering.includes('preferred === "classical-construction-operation"')
            && rendering.includes('preferred === "classical-rule-logic-late-operation"')
            && composer.includes("targetObject.reconcileClassicalCompositionOperationControls?.(")
            && rendering.includes('clearAll: true')
            && rendering.includes('resetRouteControls: true')
            && rendering.includes("if (lane.parentElement !== destination)")
            && rendering.includes("const orderChanged = formationControls.some(")
            && shell.includes("node === insertionPoint")
            && shell.includes("parent.insertBefore(node, insertionPoint || null)")
    );
    suite.ok(
        "VNC derivation is nested inside Verbstem instead of floating above the five Grammar sections",
        rendering.includes('const derivationControls = targetObject.document.querySelector?.(')
            && rendering.includes('"#classical-authority-panel .calc-operator--derivation"')
            && rendering.includes("verbstemBody.insertBefore(")
            && rendering.includes('"verbstem-operation"')
            && css.includes('[data-classical-vnc-authority-stage="verbstem"] > .calc-operator--derivation')
    );
    suite.ok(
        "Result follows the same one-level named-section structure as Source and Grammar",
        shell.includes("function syncClassicalResultNestingStructure()")
            && shell.includes('getOrCreateSection("view", "Result view")')
            && shell.includes('"structure-analysis",\n        "Structure and analysis"')
            && shell.includes('getOrCreateSection("paradigm", "Paradigm")')
            && shell.includes('"continuation",\n        "Continuation"')
            && shell.includes('appendExisting(continuation, ["classical-grammar-continuation"])')
            && shell.includes('"view-structure-analysis-paradigm-continuation"')
            && shell.includes('".panel-block-actions",')
            && shell.includes("syncClassicalResultNestingStructure();")
            && css.includes("Source, Grammar, and Result use one level of the same named-card language")
            && css.includes('[data-classical-rule-logic-surface-unit="nnc"] .classical-nnc-grammar-group')
            && css.includes("#classical-result-panel .classical-result-outline__section")
            && css.includes('[data-classical-result-outline-section="view"] > .panel-block-actions')
            && css.includes('[data-classical-result-outline-section="continuation"] > .classical-grammar-continuation')
            && css.includes('is-ui-simple #classical-workbench #classical-result-panel')
            && /classical-rule-surface\[data-classical-result-visual-system="grammar-account-surface"\]\s*\{\s*padding:\s*0;/.test(css)
            && /classical-rule-surface\[data-classical-result-visual-system="grammar-account-surface"\]\s*:is\(\s*\.classical-rule-surface__single-nnc,\s*\.classical-rule-surface__single-vnc\s*\)\s*\{\s*padding:\s*0;/.test(css)
            && css.includes('#container-inputs > .panel-block-title')
            && css.includes('#panel-stack-pane-tense > .panel-block-title')
            && css.includes('.classical-grammar-dependency-guidance')
            && css.includes('#container-tense-grid > .panel-block-title')
            && css.includes('#container-tense-grid > [data-classical-result-outline-section]')
            && css.includes('margin-top: var(--workbench-section-gap);')
    );
    suite.ok(
        "Source, Grammar, and Result section headings use one consistent body typeface",
        /#classical-source-panel h3,[\s\S]*?#classical-result-panel \.classical-rule-surface__title \{[\s\S]*?font-family: var\(--font-body\);/.test(css)
            && /#classical-source-panel \.classical-source-outline__heading,[\s\S]*?#classical-result-panel \.classical-result-outline__heading[\s\S]*?font-family: var\(--font-body\);/.test(css)
    );
    suite.ok(
        "Source, Grammar, and Result dropdowns follow one responsive column rhythm",
        css.includes("Dropdowns use one predictable column rhythm inside each named SGR section")
            && /#classical-source-panel\s+\.classical-source-identity-controls \{\s*grid-template-columns: minmax\(0, 1fr\);/.test(css)
            && /\.classical-nnc-grammar-group__body[\s\S]*?> \.classical-rule-control:not\(\.classical-built-in-particles\):not\([\s\S]*?\.classical-particle-combination-builder[\s\S]*?grid-column: span 6 !important;/.test(css)
            && /#classical-authority-panel\s+\.classical-particle-combination-builder__parts \{\s*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/.test(css)
            && /#classical-result-panel\s+\.classical-result-scope-controls \{\s*grid-template-columns: minmax\(0, 1fr\);\s*width: 100%;/.test(css)
            && /#classical-result-panel\s+\.classical-whole-canvas-choice-grid \{\s*grid-template-columns: repeat\(auto-fit, minmax\(min\(100%, 250px\), 1fr\)\);/.test(css)
            && /#classical-result-panel[\s\S]*?\) select \{\s*width: 100%;\s*inline-size: 100%;/.test(css)
            && /@media \(max-width: 820px\)[\s\S]*?grid-column: 1 \/ -1 !important;[\s\S]*?\.classical-particle-combination-builder__parts \{\s*grid-template-columns: minmax\(0, 1fr\);/.test(css)
    );
    suite.ok(
        "every Source-operation pathway inherits the same nesting, font, width, and responsive rhythm",
        sourceOperationRouteIds.length > 0
            && rendering.includes("const sourceOwnedControlPlacements = new Map([")
            && rendering.includes('"classical-vnc-source-guide"')
            && rendering.includes('"classical-source-identity-controls"')
            && rendering.includes("sourcePlacement?.destination")
            && /\[data-classical-source-path-lane="operation"\][\s\S]*?\.classical-nnc-source-analysis__grid \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);[\s\S]*?width: 100%;[\s\S]*?font-family: var\(--font-body\);/.test(css)
            && /\[data-classical-construction-grammar-lane\][\s\S]*?> \.classical-rule-control \{[\s\S]*?grid-column: span 6 !important;[\s\S]*?font-family: var\(--font-body\);/.test(css)
            && /\.classical-rule-control:not\(:has\(select, input, button\)\) \{\s*grid-column: 1 \/ -1 !important;/.test(css)
            && /@media \(max-width: 820px\)[\s\S]*?\[data-classical-construction-grammar-lane\][\s\S]*?> \.classical-rule-control \{\s*grid-column: 1 \/ -1 !important;/.test(css)
            && /\[data-classical-source-path-lane="operation"\][\s\S]*?:is\(select, input:not\(\[type="checkbox"\], \[type="radio"\]\)\)[\s\S]*?width: 100%;\s*inline-size: 100%;/.test(css)
    );
    suite.ok(
        "live result rendering refreshes its outline and empty Source context stays hidden",
        shell.includes("root.classicalResultNestingObserver = observer")
            && shell.includes("documentObject.defaultView?.MutationObserver")
            && rendering.includes("targetObject.syncClassicalResultNestingStructure?.();")
            && css.includes(".classical-source-context-controls[hidden]")
            && css.includes("#classical-source-panel .classical-source-context-controls,")
    );

    suite.ok(
        "a missing Source class marks the class control rather than the stem",
        rendering.includes('reason.includes("verbstem-class-selection-required")')
            && rendering.includes('return ["classical-rule-logic-class"];')
            && rendering.includes('reason === "lexical-noun-class-selection-required"')
            && rendering.includes('return ["classical-rule-logic-nnc-class"];')
            && css.includes(
                "#classical-source-panel .classical-nnc-source-guide__field.is-conflicting"
            )
    );

    suite.ok(
        "every single-result pathway pairs Linear format with Sentence formula",
        sourceOperationRouteIds.length > 0
            && rendering.includes("function createClassicalResultSentenceFormulaSection(")
            && rendering.includes("function getClassicalResultFormatProjection(")
            && rendering.includes("linearFormat.hidden = fullParadigmActive || !specificLinearFormula;")
            && !rendering.includes("getClassicalRuleLogicPublicResultFallback")
            && rendering.includes("projection: `source-operation:${selectedConstruction}`")
            && rendering.includes('projection: "relational-nnc"')
            && rendering.includes("singleNncSentenceFormulaAvailable")
            && rendering.includes("singleVncSentenceFormulaAvailable")
            && !rendering.includes("distinctSentenceFormula")
            && !rendering.includes("distinctVncSentenceFormula")
    );
    suite.ok(
        "owner-issued fallback Results retain their canonical Linear-specific projection",
        rendering.includes("const linearFormula = [")
            && rendering.includes("const sentenceFormula = [")
            && rendering.includes("linearFormula,")
            && rendering.includes("sentenceFormula,")
            && rendering.includes("const ownerIssuedResultProjection =")
            && rendering.includes("surfaceFrame.selectedFormula")
            && rendering.includes("ownerIssuedResultProjection?.linearFormula")
            && rendering.includes("surfaceFrame.diagrammaticFrame?.choicePending === true")
            && rendering.includes(
                "const fallbackProjection = fallbackSingleActive\n        ? ownerIssuedResultProjection"
            )
            && !rendering.includes(
                "canonical.sentenceFormulaDisplay,\n        canonical.formula,"
            )
    );
    suite.ok(
        "incomplete frequentative and compound paths point to their missing formation choice",
        rendering.includes(
            '"recognized-frequentative-variant-required": "Choose a Grammar-supported frequentative formation.'
        )
            && rendering.includes(
                '"recognized-lesson28-compound-variant-required": "Choose a Grammar-supported compound formation.'
            )
            && rendering.includes(
                '"recognized-frequentative-variant-required": Object.freeze(["classical-rule-logic-late-variant"])'
            )
            && rendering.includes(
                '"recognized-lesson28-compound-variant-required": Object.freeze(["classical-rule-logic-late-variant"])'
            )
    );

    const cacheKey = currentBrowserCacheKey(index);
    suite.ok(
        "The live cache chain delivers this interface repair",
        Boolean(cacheKey)
            && usesBrowserCacheKey(index, "src/browser/main.mjs", cacheKey)
            && usesBrowserCacheKey(browserMain, "bootstrap.mjs", cacheKey)
            && usesBrowserCacheKey(bootstrap, "runtime_bridge.mjs", cacheKey)
            && usesBrowserCacheKey(bridge, "create_runtime.mjs", cacheKey)
            && [
                "vnc_application.mjs",
                "composer.mjs",
                "rendering.mjs",
                "classical_shell.mjs",
            ]
                .every(moduleName => usesBrowserCacheKey(
                    runtime,
                    moduleName,
                    cacheKey
                ))
    );

    return suite;
}

module.exports = { run };
