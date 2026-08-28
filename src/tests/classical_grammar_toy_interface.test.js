"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const read = relativePath => fs.readFileSync(
    path.join(ROOT, relativePath),
    "utf8"
);

function run() {
    const suite = createSuite("classical_grammar_toy_interface");
    const index = read("index.html");
    const panels = read("src/ui/panels/panels.mjs");
    const main = read("src/browser/main.mjs");
    const shell = read("src/ui/shell/classical_shell.mjs");
    const css = read("style.css");
    const composer = read("src/ui/composer/composer.mjs");
    const rendering = read("src/ui/rendering/rendering.mjs");
    const history = read(
        "src/application/classical/grammar_workspace_history.mjs"
    );
    const witness = read(
        "src/ui/diagnostics/classical_play_witness.mjs"
    );
    const sessionRecorder = read(
        "src/ui/diagnostics/classical_session_recorder.mjs"
    );
    const sourceSyncStart = shell.indexOf(
        "function syncClassicalSourceNestingStructure"
    );
    const sourceFormMount = shell.indexOf(
        "mountInStableOrder(form",
        sourceSyncStart
    );
    const sourceGridMount = shell.indexOf(
        'root.querySelector?.(".classical-source-parts__grid")',
        sourceFormMount
    );
    const sourceGuideMount = shell.indexOf(
        'documentObject.getElementById("classical-vnc-source-guide")',
        sourceFormMount
    );
    const operationLaneMount = shell.indexOf(
        "operationLane,",
        sourceFormMount
    );
    const sentenceAdverbialControl = shell.indexOf(
        'id="classical-rule-logic-sentence-adverbial"'
    );
    const sentenceAdverbialWrapper = shell.slice(
        shell.lastIndexOf("<label", sentenceAdverbialControl),
        sentenceAdverbialControl
    );

    suite.ok(
        "Play is the honest default while Analysis requires an explicit choice",
        index.includes("Type a Source. Choose what to do. Make a Result. Keep going.")
        && index.includes('<span class="button-label">Play</span>')
        && panels.includes('params.get("analysis") === "1"')
        && panels.includes("UI_DENSITY_MODE.simple")
        && panels.includes("localStorage?.removeItem?.(")
        && panels.includes("persist: false")
    );

    suite.ok(
        "the toy cannot accept ghost clicks before Grammar OS is ready",
        index.includes('id="classical-workbench"')
        && index.includes('aria-busy="true"')
        && /\binert\b/u.test(index.slice(
            index.indexOf('id="classical-workbench"'),
            index.indexOf('id="classical-workbench"') + 900
        ))
        && main.includes('workbench.removeAttribute("inert")')
        && main.includes('workbench.setAttribute("aria-busy", "false")')
        && main.includes('workbench.setAttribute("inert", "")')
        && main.includes('workbench.setAttribute("aria-busy", "true")')
    );

    suite.ok(
        "the toy exposes one plain action in Source, Grammar, Result, and Continue order",
        shell.includes("Type a stem, then use this Source.")
        && shell.includes("Use this Source</span>")
        && shell.includes("What can I do next?</span>")
        && shell.includes("Choose only the change you want to make.")
        && shell.includes(">Make Result</button>")
        && shell.includes("See the exact Result, then continue from it.")
        && sourceGridMount > sourceFormMount
        && sourceGuideMount > sourceGridMount
        && operationLaneMount > sourceGuideMount
        && shell.includes(
            'appendExisting(continuation, ["classical-grammar-continuation"]);'
        )
    );

    suite.ok(
        "Play hides workshop duplication without removing the real controls",
        css.includes("Grammar toy: Play keeps one honest Source")
        && css.includes(".classical-composition-path-summary")
        && css.includes("#classical-construction-operation-field")
        && css.includes(".calc-operator--source-authority-mirror")
        && css.includes(".panel-block-actions")
        && css.includes(".classical-result-scope-controls")
        && css.includes('[data-classical-result-status="blocked"]')
        && css.includes(".classical-clause-relation-workflow")
        && shell.includes('id="classical-capability-navigator-operation"')
        && shell.includes('id="classical-capability-apply-operation"')
    );

    suite.ok(
        "Source class and valence remain draft choices until Use this Source commits them",
        composer.includes("const classicalSourceDraftControlIds = new Set([")
        && composer.includes('"classical-rule-logic-class"')
        && composer.includes('"classical-rule-logic-valence"')
        && composer.includes("classicalSourceDraftControlIds.has(control.id)")
        && composer.includes("hasCommittableClassicalSourceParts()")
        && composer.includes("setClassicalSourcePartsPendingState(true);")
        && composer.indexOf("setClassicalSourcePartsPendingState(true);")
            < composer.indexOf(
                "refreshClassicalRuleLogicSurfaceFromControl(control);",
                composer.indexOf("classicalSourceDraftControlIds.has(control.id)")
            )
    );

    suite.ok(
        "the sound keyboard and personal build history stay available without filling the play area",
        shell.includes('<details\n                        id="classical-transcription-keyboard"')
        && shell.includes(">Sound keyboard</summary>")
        && shell.includes('<details\n        class="classical-grammar-workspace-history"')
        && shell.includes(">Your builds</summary>")
        && css.includes(".classical-grammar-workspace-history:not([open])")
        && css.includes(".classical-grammar-workspace-history__body")
        && css.includes("#classical-app-root > .classical-grammar-advanced")
    );

    suite.ok(
        "the manufacturer witness shares the recorder consent lifecycle and reports only semantic play metrics",
        shell.includes("const playWitness = installClassicalPlayWitness(targetObject, root)")
        && witness.includes('get("manufacturer") === "1"')
        && witness.includes('status = "observing"')
        && witness.includes('installedRoot?.addEventListener?.("click", observeClick, true)')
        && witness.includes('installedRoot?.addEventListener?.("change", observeAction, true)')
        && witness.includes('installedRoot?.addEventListener?.("classical:play-feeling", observeFeeling, true)')
        && shell.includes('id="classical-play-witness-projection"')
        && shell.includes('data-classical-play-witness-controls="true"')
        && shell.includes('data-classical-play-audience="baby" data-classical-play-feeling="joy"')
        && shell.includes('data-classical-play-audience="parent" data-classical-play-feeling="concern"')
        && css.includes('#classical-app-root[data-classical-play-witness="observing"]')
        && shell.includes('type="application/json"')
        && witness.includes("currentProjection.textContent = JSON.stringify(snapshot())")
        && witness.includes("const observableOutcome =")
        && witness.includes('completedJourneyCount')
        && witness.includes('hesitationCount')
        && witness.includes('repeatedClickCount')
        && witness.includes('backtrackingCount')
        && witness.includes('abandonmentSignalCount')
        && witness.includes('waitingActionCount')
        && witness.includes('deadActionCount')
        && witness.includes('baby: Object.freeze(new Set(["joy", "boredom"]))')
        && witness.includes('parent: Object.freeze(new Set(["joy", "concern"]))')
        && witness.includes("grammarAuthority: false")
        && witness.includes("networkTransmission: false")
        && witness.includes("rawSourceValues: false")
        && witness.includes("rawResultValues: false")
        && witness.includes("rawControlValues: false")
        && !witness.includes("targetLabel")
        && !witness.includes("targetValue")
        && !/[.]fetch\(|sendBeacon|WebSocket|XMLHttpRequest/u.test(witness)
    );

    suite.ok(
        "private play recording requires consent, masks grammar, loads on Start, and never becomes an authority or upload path",
        shell.includes("installClassicalSessionRecorder(targetObject, root, playWitness)")
        && shell.includes('id="classical-session-recorder-consent"')
        && shell.includes('id="classical-session-recorder-start"')
        && shell.includes('id="classical-session-recorder-stop"')
        && shell.includes('id="classical-session-recorder-download"')
        && shell.includes('id="classical-session-recorder-discard"')
        && shell.includes("Everyone being observed agreed.")
        && sessionRecorder.includes('get("manufacturer") === "1"')
        && sessionRecorder.includes("await loadRecorder()")
        && sessionRecorder.includes("observationWitness?.start?.()")
        && sessionRecorder.includes("observationWitness?.stop?.()")
        && sessionRecorder.includes("play: observationWitness?.snapshot?.()")
        && sessionRecorder.includes("maskAllInputs: true")
        && sessionRecorder.includes('maskTextSelector: "#classical-workbench"')
        && sessionRecorder.includes('"#classical-play-witness-projection"')
        && sessionRecorder.includes('"#classical-source-panel"')
        && sessionRecorder.includes('"#classical-authority-panel"')
        && sessionRecorder.includes('"#classical-result-panel"')
        && sessionRecorder.includes("blockSelector: PRIVATE_BLOCK_SELECTOR")
        && sessionRecorder.includes("inlineStylesheet: false")
        && sessionRecorder.includes("persistentStorage: false")
        && sessionRecorder.includes("networkTransmission: false")
        && sessionRecorder.includes("grammarAuthority: false")
        && !/[.]fetch\(|sendBeacon|WebSocket|XMLHttpRequest|localStorage|sessionStorage|indexedDB/u
            .test(sessionRecorder)
    );

    suite.ok(
        "Make Result is one fail-closed action with one review Result and one history step",
        rendering.includes(
            "function renderClassicalCapabilityApplicationResultForReview("
        )
        && rendering.includes(
            'continueAction.textContent = "Continue this Result";'
        )
        && rendering.includes(
            "const requiredChoiceIds = Object.freeze(["
        )
        && rendering.includes(
            'binding.family === "clause-relation"'
        )
        && rendering.includes(
            "syncClassicalClauseRelationCapabilityChoices("
        )
        && rendering.includes(
            ".beginClassicalGrammarWorkspaceUserAction?.(operationId)"
        )
        && rendering.includes(
            ".completeClassicalGrammarWorkspaceUserAction?.("
        )
        && rendering.includes(
            ".cancelClassicalGrammarWorkspaceUserAction?.("
        )
        && history.includes(
            "only the explicit user-action transaction"
        )
        && !history.includes(
            "subscribeClassicalGrammarApplicationAtlasObservations"
        )
        && history.includes(
            "completeClassicalGrammarWorkspaceUserAction: ("
        )
    );

    suite.ok(
        "personal-name Apply presents its exact Result through the usual full NNC Result panel",
        rendering.includes(
            "function renderClassicalNominalConstructionSurfaceBlock("
        )
        && rendering.includes("exactReview = null")
        && rendering.includes(
            "ownerIssuedApplicationResult?.canonicalResult"
        )
        && rendering.includes(
            "renderClassicalNominalConstructionSurfaceBlock(\n            resultBlock,\n            Object.freeze({"
        )
        && rendering.includes(
            'selectedConstruction: "personal-name-nnc"'
        )
        && rendering.includes(
            "if (exactReview && !ownerIssuedApplicationResult) return false;"
        )
        && rendering.includes(
            "block.dataset.classicalCapabilityAppliedResult =\n          \"exact-owner-issued\";"
        )
        && rendering.includes(
            "createClassicalResultAnalysisDisclosure("
        )
        && rendering.includes(
            "const ownerProjection = frame?.diagrammaticProjection || null;"
        )
        && rendering.includes(
            '=== "typed-personal-name-slots"'
        )
        && rendering.includes(
            'copyAction.textContent = "Copy form";'
        )
    );

    suite.ok(
        "personal-name play asks the baby for an outer subject instead of silently accepting third person",
        rendering.includes(
            "function syncClassicalStagedPersonalNameOuterSubjectPrompt("
        )
        && rendering.includes(
            'prompt.textContent = "Choose the outer subject person";'
        )
        && rendering.includes(
            'if (awaitingSourceFamily) person.value = "";'
        )
        && rendering.includes(
            'normalizedOperationId !== "nnc:personal-name"'
        )
        && rendering.includes(
            "if (!/^(?:1|2|3)$/u.test(person)) return \"\";"
        )
    );

    suite.ok(
        "all compositional pathways use one Result presentation while diagrams remain analysis-only",
        rendering.includes(
            "function renderClassicalUnifiedCapabilityResultPanel({"
        )
        && rendering.includes(
            'block.dataset.classicalResultPresentation = "unified-result-panel";'
        )
        && rendering.includes(
            'primary.className = "classical-rule-surface__single-result";'
        )
        && rendering.includes(
            'primaryTitle.textContent = "Generated form";'
        )
        && rendering.includes(
            "createClassicalResultAnalysisDisclosure("
        )
        && rendering.includes(
            'title.textContent = "Linear format";'
        )
        && rendering.includes(
            'title.textContent = "Diagrammatic format";'
        )
        && rendering.includes(
            "createClassicalResultSentenceFormulaSection({"
        )
        && rendering.includes(
            "if (getClassicalGrammarResultSourceContinuationCandidate(canonical)) {"
        )
        && rendering.includes(
            'copyAction.textContent = "Copy form";'
        )
        && rendering.includes(
            "return renderClassicalUnifiedCapabilityResultPanel({\n        applicationResult,\n        operationId: \"particle:result\""
        )
        && rendering.includes(
            "return renderClassicalUnifiedCapabilityResultPanel({\n        applicationResult,\n        operationId: normalizedOperationId"
        )
        && rendering.includes(
            'const CLASSICAL_CAPABILITY_ANALYSIS_ONLY_OPERATION_IDS = new Set([\n      "nnc:diagram",\n      "vnc:diagram",'
        )
        && css.includes(".classical-rule-surface__single-result")
        && css.includes(".classical-rule-surface__single-result-answer")
        && css.includes(".classical-rule-surface__single-result-surface")
    );

    suite.ok(
        "a staged sentence-adverbial pathway reveals its genuine Grammar choice without changing the Result before Apply",
        sentenceAdverbialControl > 0
        && !sentenceAdverbialWrapper.includes(
            "classical-rule-control--internal-canonical-particle"
        )
        && rendering.includes(
            'binding.family === "particle-sentence"'
        )
        && rendering.includes(
            "...(binding.ownerBindingFrame?.requiredChoiceIds || [])"
        )
        && rendering.includes(
            "...(binding.requiredChoiceIds || [])"
        )
        && rendering.includes(
            "enterClassicalGrammarResultBindingChoice(\n        selectedBindingId,\n        { allowExecution: false }"
        )
        && rendering.includes(
            'firstMissingChoice?.scrollIntoView?.({ block: "center" });'
        )
        && rendering.includes(
            'activeResultBinding?.family === "particle-sentence"'
        )
        && rendering.includes(
            "activeResultBinding.particleSentenceOwnerReady !== true"
        )
        && rendering.includes(
            "enterClassicalGrammarResultBindingChoice(\n          selectedBindingId,\n          { allowExecution: true }"
        )
        && rendering.includes(
            "targetObject.buildClassicalNahuatlParticleSourceFrame(\n              sentenceAdverbialId"
        )
        && rendering.includes(
            "particleSourceFrame: adverbialParticleSourceFrame"
        )
        && composer.indexOf(
            ".handleClassicalCapabilityStagedGrammarControlChange?.("
        ) < composer.indexOf(
            "refreshClassicalRuleLogicSurfaceFromControl(control);",
            composer.indexOf(
                ".handleClassicalCapabilityStagedGrammarControlChange?.("
            )
        )
        && css.includes(
            ".classical-rule-control--internal-canonical-particle"
        )
    );

    return suite;
}

module.exports = { run };
