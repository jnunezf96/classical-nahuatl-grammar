"use strict";

const fs = require("fs");
const { createSuite } = require("./runner");
const { resolveLegacySupportPath } = require("./helpers/legacy_support_path");

const read = (relativePath) => fs.readFileSync(
    resolveLegacySupportPath(relativePath),
    "utf8"
);

// This is a presentation disposition ledger, not a second capability registry.
// It is deliberately test-only and every record explicitly denies UI grammar
// authority. The keys must remain an exact projection of the canonical
// application inventory supplied by getClassicalGrammarApplicationInventory().
const CLASSICAL_WORKBENCH_OPERATION_DISPOSITIONS = Object.freeze({
    "concept:classification": Object.freeze({ disposition: "analysis-only", uiAuthority: "none" }),
    "orthography:transcription": Object.freeze({ disposition: "internal-support", uiAuthority: "none" }),
    "vnc:nuclear-clause": Object.freeze({ disposition: "analysis-only", uiAuthority: "none" }),
    "vnc:finite-slot": Object.freeze({ disposition: "internal-support", uiAuthority: "none" }),
    "vnc:finite-surface": Object.freeze({ disposition: "public-result", uiAuthority: "none" }),
    "vnc:sentence-result": Object.freeze({ disposition: "public-result", uiAuthority: "none" }),
    "nnc:ordinary": Object.freeze({ disposition: "public-result", uiAuthority: "none" }),
    "nnc:sentence-surface": Object.freeze({ disposition: "public-result", uiAuthority: "none" }),
    "nnc:diagram": Object.freeze({ disposition: "analysis-only", uiAuthority: "none" }),
    "vnc:diagram": Object.freeze({ disposition: "analysis-only", uiAuthority: "none" }),
    "sentence:adverbial-adjunction": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "sentence:particle-adjunction": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "particle:result": Object.freeze({ disposition: "internal-support", uiAuthority: "none" }),
    "vnc:source-selection": Object.freeze({ disposition: "interactive-source", uiAuthority: "none" }),
    "vnc:ordered-voice-chain": Object.freeze({ disposition: "analysis-only", uiAuthority: "none" }),
    "vnc:ordered-voice-application": Object.freeze({ disposition: "public-result", uiAuthority: "none" }),
    "nnc:pronominal": Object.freeze({ disposition: "public-result", uiAuthority: "none" }),
    "vnc:derivational-operation": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "vnc:application": Object.freeze({ disposition: "public-result", uiAuthority: "none" }),
    "vnc:transitive-object": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "vnc:verbstem-class": Object.freeze({ disposition: "interactive-source", uiAuthority: "none" }),
    "sentence:supplementation": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "grammar:nominal-construction": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "nnc:deverbal-construction": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "nnc:adjectival-modification": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "nnc:adverbial": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "nnc:relational": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "nnc:place-gentilic": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "clause:adverbial-adjunction": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "clause:composition": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "clause:comparison": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "vnc:denominal": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
    "nnc:personal-name": Object.freeze({ disposition: "interactive-grammar", uiAuthority: "none" }),
});

const ALLOWED_DISPOSITIONS = Object.freeze([
    "analysis-only",
    "internal-support",
    "interactive-grammar",
    "interactive-source",
    "public-result",
]);

// Each atom has atom-specific executable receipt labels. `focused:` labels are
// owned by this suite; `live:` labels are emitted only after the browser smoke
// has exercised the named behavior on the delivered module graph.
const CLASSICAL_WORKBENCH_SURFACE_RECEIPTS = Object.freeze({
    "CW-S01": Object.freeze(["focused:CW-S01-stage-semantics", "live:CW-S01-source-reachable"]),
    "CW-S02": Object.freeze(["focused:CW-S02-basal-unit-contract", "live:CW-S02-basal-unit-toggle"]),
    "CW-S03": Object.freeze(["focused:CW-S03-editable-source-names", "live:CW-S03-editable-source-roles"]),
    "CW-S04": Object.freeze(["focused:CW-S04-pending-contract", "live:CW-S04-pending-preserves-result"]),
    "CW-S05": Object.freeze(["focused:CW-S05-shared-commit-path", "live:CW-S05-enter-and-button-commit"]),
    "CW-S06": Object.freeze(["focused:CW-S06-picker-nonauthority", "live:CW-S06-picker-select"]),
    "CW-G01": Object.freeze(["focused:CW-G01-grammar-stage-dependency", "live:CW-G01-grammar-reachable"]),
    "CW-G02": Object.freeze(["focused:CW-G02-pending-gate", "live:CW-G02-pending-grammar-gate"]),
    "CW-G03": Object.freeze(["focused:CW-G03-applicable-choice-state", "live:CW-G03-applicable-controls"]),
    "CW-G04": Object.freeze(["focused:CW-G04-derived-readonly", "live:CW-G04-derived-facts-inert"]),
    "CW-G05": Object.freeze(["focused:CW-G05-semantic-prerequisites", "live:CW-G05-dependent-choice-reveal"]),
    "CW-G06": Object.freeze(["focused:CW-G06-shared-grammar-workflow", "live:CW-G06-derivation-workflow"]),
    "CW-G07": Object.freeze(["focused:CW-G07-repair-contract", "live:CW-G07-blocked-repair-focus"]),
    "CW-P01": Object.freeze(["focused:CW-P01-shared-result-depth", "live:CW-P01-study-analysis-identity"]),
    "CW-P02": Object.freeze(["focused:CW-P02-canonical-scope", "live:CW-P02-scope-projection"]),
    "CW-P03": Object.freeze(["focused:CW-P03-presentation-only-sizing", "live:CW-P03-native-zoom"]),
    "CW-R01": Object.freeze(["focused:CW-R01-answer-first-order", "live:CW-R01-answer-first-result"]),
    "CW-R02": Object.freeze(["focused:CW-R02-analysis-after-answer", "live:CW-R02-analysis-disclosure"]),
    "CW-R03": Object.freeze(["focused:CW-R03-blocked-output-firewall", "live:CW-R03-blocked-output-empty"]),
    "CW-R04": Object.freeze(["focused:CW-R04-single-result-status", "live:CW-R04-committed-announcement"]),
    "CW-R05": Object.freeze(["focused:CW-R05-canonical-result-consumption", "live:CW-R05-canonical-projection"]),
    "CW-R06": Object.freeze(["focused:CW-R06-projection-actions-inert", "live:CW-R06-copy-continuation-inert"]),
    "CW-W01": Object.freeze(["focused:CW-W01-ordered-stage-navigation", "live:CW-W01-forward-backward"]),
    "CW-W02": Object.freeze(["focused:CW-W02-keyboard-stage-contract", "live:CW-W02-keyboard-workflow"]),
    "CW-W03": Object.freeze(["focused:CW-W03-focus-transition-contract", "live:CW-W03-stage-focus"]),
    "CW-W04": Object.freeze(["focused:CW-W04-restored-state-nonauthority", "live:CW-W04-restored-state-recovery"]),
    "CW-W05": Object.freeze(["focused:CW-W05-coherent-state-contract", "live:CW-W05-state-continuity"]),
    "CW-Q01": Object.freeze(["focused:CW-Q01-landmarks-headings", "live:CW-Q01-accessibility-tree"]),
    "CW-Q02": Object.freeze(["focused:CW-Q02-name-role-focus", "live:CW-Q02-interactive-names"]),
    "CW-Q03": Object.freeze(["focused:CW-Q03-wide-stage-layout", "live:CW-Q03-wide-stage-visibility"]),
    "CW-Q04": Object.freeze(["focused:CW-Q04-narrow-stage-layout", "live:CW-Q04-narrow-stage-navigation"]),
    "CW-Q05": Object.freeze(["focused:CW-Q05-containment-contract", "live:CW-Q05-responsive-containment"]),
    "CW-Q06": Object.freeze(["focused:CW-Q06-inclusive-motion-zoom", "live:CW-Q06-touch-reflow-motion"]),
    "CW-Q07": Object.freeze(["focused:CW-Q07-plain-state-language", "live:CW-Q07-user-facing-state-copy"]),
    "CW-F01": Object.freeze(["focused:CW-F01-control-owner-contract", "live:CW-F01-control-owner-audit"]),
    "CW-F02": Object.freeze(["focused:CW-F02-carrier-firewall", "live:CW-F02-hostile-carriers-inert"]),
    "CW-F03": Object.freeze(["focused:CW-F03-string-firewall", "live:CW-F03-output-strings-inert"]),
    "CW-F04": Object.freeze(["focused:CW-F04-contract-compatibility", "live:CW-F04-existing-contract-flow"]),
    "CW-F05": Object.freeze(["focused:CW-F05-single-entry-cache-chain", "live:CW-F05-delivered-module-graph"]),
    "CW-F06": Object.freeze(["focused:CW-F06-proof-stack-declared", "live:CW-F06-current-browser-proof"]),
});

function countMatches(source, pattern) {
    return Array.from(String(source || "").matchAll(pattern)).length;
}

function functionSlice(source, functionName, nextFunctionName) {
    const start = source.indexOf(`function ${functionName}`);
    const end = source.indexOf(`function ${nextFunctionName}`, start + 1);
    return start >= 0 && end > start ? source.slice(start, end) : "";
}

function run(ctx = {}) {
    const suite = createSuite("classical_workbench_surface");
    const indexHtml = read("index.html");
    const shell = read("src/ui/shell/classical_shell.mjs");
    const composer = read("src/ui/composer/composer.mjs");
    const events = read("src/ui/events/events.mjs");
    const panels = read("src/ui/panels/panels.mjs");
    const state = read("src/ui/state.mjs");
    const rendering = read("src/ui/rendering/rendering.mjs");
    const css = read("style.css");
    const packageJson = read("package.json");
    const browserMain = read("src/browser/main.mjs");
    const bootstrap = read("src/bootstrap/bootstrap.mjs");
    const runtimeBridge = read("src/bootstrap/runtime_bridge.mjs");
    const createRuntime = read("src/runtime/create_runtime.mjs");
    const browserSmoke = read("scripts/smoke_modern_browser.mjs");
    const surfaceInventory = read("docs/CLASSICAL_WORKBENCH_SURFACE_INVENTORY.md");
    const combinedMarkup = `${indexHtml}\n${shell}`;

    const inventory = typeof ctx.getClassicalGrammarApplicationInventory === "function"
        ? ctx.getClassicalGrammarApplicationInventory()
        : null;
    const inventoryIds = [...(inventory?.operationIds || [])].sort();
    const axisDispositionLedger = JSON.parse(read("docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json"));
    const axisEntriesByOperation = axisDispositionLedger.entries.reduce((byOperation, entry) => {
        if (!byOperation.has(entry.operationId)) byOperation.set(entry.operationId, []);
        byOperation.get(entry.operationId).push(entry);
        return byOperation;
    }, new Map());
    const completeWorkbenchDispositions = Object.freeze(Object.fromEntries(
        inventoryIds.map((operationId) => {
            const existing = CLASSICAL_WORKBENCH_OPERATION_DISPOSITIONS[operationId];
            if (existing) return [operationId, existing];
            const entries = axisEntriesByOperation.get(operationId) || [];
            return [operationId, Object.freeze({
                disposition: entries.some(entry => entry.surfaceDisposition === "interactive-choice")
                    ? "interactive-grammar"
                    : "analysis-only",
                uiAuthority: "none",
            })];
        })
    ));
    const dispositionIds = Object.keys(completeWorkbenchDispositions).sort();

    suite.eq(
        "Workbench dispositions bind the complete canonical operation topology",
        {
            canonicalKind: inventory?.kind || "",
            canonicalCount: inventoryIds.length,
            dispositionCount: dispositionIds.length,
            exactIds: dispositionIds,
        },
        {
            canonicalKind: "classical-grammar-application-inventory",
            canonicalCount: inventoryIds.length,
            dispositionCount: inventoryIds.length,
            exactIds: inventoryIds,
        }
    );
    suite.eq(
        "Every operation has one allowed presentation disposition and no UI grammar authority",
        Object.values(completeWorkbenchDispositions).every((record) => (
            ALLOWED_DISPOSITIONS.includes(record.disposition)
            && record.uiAuthority === "none"
        )),
        true
    );
    suite.eq(
        "The test-only disposition ledger is not imported by production UI",
        [shell, composer, panels, rendering].some((source) => (
            source.includes("CLASSICAL_WORKBENCH_OPERATION_DISPOSITIONS")
        )),
        false
    );

    const frozenAtomIds = Array.from(
        surfaceInventory.matchAll(/\| `(CW-[SGPRWQF]\d{2})` \|/gu),
        (match) => match[1]
    ).sort();
    const receiptAtomIds = Object.keys(CLASSICAL_WORKBENCH_SURFACE_RECEIPTS).sort();
    const receiptLabels = Object.values(CLASSICAL_WORKBENCH_SURFACE_RECEIPTS).flat();
    suite.eq(
        "The executable receipt ledger binds the frozen 40-atom surface denominator",
        {
            frozenCount: frozenAtomIds.length,
            receiptCount: receiptAtomIds.length,
            exactIds: receiptAtomIds,
        },
        {
            frozenCount: 40,
            receiptCount: 40,
            exactIds: frozenAtomIds,
        }
    );
    suite.eq(
        "Every surface atom owns nonempty atom-specific focused and live receipt labels",
        {
            everyAtomHasFocusedAndLive: Object.entries(CLASSICAL_WORKBENCH_SURFACE_RECEIPTS).every(
                ([atomId, labels]) => (
                    labels.some((label) => label.startsWith(`focused:${atomId}-`))
                    && labels.some((label) => label.startsWith(`live:${atomId}-`))
                )
            ),
            labelsUnique: new Set(receiptLabels).size === receiptLabels.length,
        },
        { everyAtomHasFocusedAndLive: true, labelsUnique: true }
    );
    const liveReceiptLabels = Object.values(
        CLASSICAL_WORKBENCH_SURFACE_RECEIPTS
    ).map((labels) => labels.find((label) => label.startsWith("live:")) || "");
    suite.eq(
        "Every atom-specific live receipt is bound to a fail-closed browser assertion",
        liveReceiptLabels.filter((label) => (
            !label || !browserSmoke.includes(`"${label}"`)
        )),
        []
    );

    suite.eq(
        "The document permits native browser zoom",
        /user-scalable\s*=\s*no|maximum-scale\s*=\s*1/iu.test(indexHtml),
        false
    );
    suite.eq(
        "The UI initializer preserves native zoom instead of inversely scaling the root font",
        {
            inverseScaleRemoved: panels.includes("baseFontSize / scale") === false,
            nativeZoomMarker: panels.includes('classicalNativeZoom = "enabled"'),
        },
        { inverseScaleRemoved: true, nativeZoomMarker: true }
    );
    suite.eq(
        "The public page keeps one primary heading",
        countMatches(combinedMarkup, /<h1\b/giu),
        1
    );

    const sourcePanel = functionSlice(shell, "ClassicalSourcePanel", "ClassicalAuthorityPanel");
    const grammarPanel = functionSlice(shell, "ClassicalAuthorityPanel", "ClassicalResultPanel");
    const resultPanel = functionSlice(shell, "ClassicalResultPanel", "ClassicalFooter");
    suite.eq(
        "Source, Grammar, and Result retain their established panel identities",
        [
            sourcePanel.includes('id="panel-stack-pane-inputs"'),
            grammarPanel.includes('id="panel-stack-pane-tense"'),
            resultPanel.includes('id="container-tense-grid"'),
        ],
        [true, true, true]
    );
    suite.eq(
        "Source editing marks a pending signature without refreshing the canonical Result",
        {
            signatureComparison: composer.includes("setClassicalSourcePartsPendingState(getClassicalSourcePartsEvaluationSignature() !== ClassicalSourcePartsCommittedSignature)"),
            inputOnlyCancelsRefresh: events.includes("Typing only updates the editable source")
                && events.includes("cancelScheduledVerbInputRefresh()"),
        },
        { signatureComparison: true, inputOnlyCancelsRefresh: true }
    );
    suite.eq(
        "Enter commits Source through the existing typed commit path",
        events.includes('activeElement.matches?.(".classical-source-parts__input")')
            && events.includes('source: "enter"')
            && events.includes("commitClassicalSourcePartsEvaluation"),
        true
    );
    suite.eq(
        "Source operations are grouped by admitted Source rank and disclose Result rank",
        {
            vncGroup: sourcePanel.includes('data-classical-operation-source-group="vnc"'),
            nncGroup: sourcePanel.includes('data-classical-operation-source-group="nnc"'),
            rankedLiteralOptions:
                countMatches(sourcePanel, /data-classical-source-unit="(?:vnc|nnc|any)"/gu) - 1,
            sharedCharacteristicRoute:
                sourcePanel.includes('value="deverbal-nnc"')
                && sourcePanel.includes('data-classical-source-unit="vnc"')
                && sourcePanel.includes("Source → deverbal nominalization or characteristic patientive → NNC Result"),
            grammarListed:
                countMatches(sourcePanel, /data-classical-grammar-operation=/gu) === 10
                && shell.includes('data-classical-grammar-operation="place or gentilic formation"'),
            placeRouteRanked:
                shell.includes('controlId === "classical-construction-operation" ? \'data-classical-source-unit="nnc"\'')
                && shell.includes('controlId === "classical-construction-operation" ? \'data-classical-result-unit="nnc"\''),
            crossRankLabels:
                sourcePanel.includes("Source → deverbal nominalization or characteristic patientive → NNC Result")
                && sourcePanel.includes("NNC Source → denominal verbalization → VNC Result"),
            incompatibleRoutesHiddenAndDisabled:
                composer.includes("option.hidden = !available")
                && composer.includes("option.disabled = !available")
                && composer.includes("group.hidden = !available")
                && composer.includes("group.disabled = !available"),
            groupOrderStable:
                sourcePanel.indexOf('data-classical-operation-source-group="vnc"')
                    < sourcePanel.indexOf('data-classical-operation-source-group="nnc"')
                && !composer.includes("construction.insertBefore(activeGroup, firstSourceGroup)"),
            routeExplanation:
                !sourcePanel.includes("classical-construction-operation-status")
                && !composer.includes("Incompatible Source routes remain listed but unavailable")
                && composer.includes("Available from the current ${activeUnit.toUpperCase()} Source")
                && composer.includes("Requires ${groupUnit === CLASSICAL_BASAL_UNIT.nnc ? \"an\" : \"a\"}"),
        },
        {
            vncGroup: true,
            nncGroup: true,
            rankedLiteralOptions: 9,
            sharedCharacteristicRoute: true,
            grammarListed: true,
            placeRouteRanked: true,
            crossRankLabels: true,
            incompatibleRoutesHiddenAndDisabled: true,
            groupOrderStable: true,
            routeExplanation: true,
        }
    );
    suite.eq(
        "Source-operation Results reuse the ordinary Result presentation contract",
        {
            staleResultCleanup:
                rendering.includes("clearClassicalNominalConstructionResultDatasets(block)")
                && rendering.includes("clearClassicalRuleLogicSurfaceDatasets()"),
            actualResultRank:
                rendering.includes("getClassicalNominalConstructionResultUnit")
                && rendering.includes("block.dataset.classicalBasalUnit = customResultUnit")
                && rendering.includes("block.dataset.classicalNahuatlNuclearClauseKind"),
            normalHeading:
                rendering.includes("`Classical Nahuatl ${customResultUnit.toUpperCase()}`")
                && rendering.includes('createGrammarInspectorChip(\n        frame.authorizationStatus === "authorized" ? "Ready" : "Unavailable"'),
            normalSingleForm:
                rendering.includes('`classical-rule-surface__single-${customResultUnit}`')
                && rendering.includes('`classical-rule-surface__single-${customResultUnit}-answer`')
                && rendering.includes('`classical-rule-surface__single-${customResultUnit}-surface`'),
            structureViews:
                rendering.includes("getClassicalNominalConstructionDiagrammaticFrame")
                && rendering.includes('linearTitle.textContent = "Linear format"')
                && rendering.includes('diagramTitle.textContent = "Diagrammatic format"')
                && rendering.includes('"Linear, diagram, and sentence · specific or general"')
                && rendering.includes("disclosure.open = !disclosure.hidden"),
            normalActions:
                rendering.includes('copyAction.textContent = "Copy form"')
                && rendering.includes('continueAction.textContent = "Continue this Result"'),
            paradigmNormalcy:
                rendering.includes('paradigmCount.textContent = `${projected.length} forms`')
                && rendering.includes('copyTable.textContent = "Copy table"')
                && rendering.includes('tableScroll.className = "classical-rule-surface__paradigm-table-scroll"'),
        },
        {
            staleResultCleanup: true,
            actualResultRank: true,
            normalHeading: true,
            normalSingleForm: true,
            structureViews: true,
            normalActions: true,
            paradigmNormalcy: true,
        }
    );
    suite.eq(
        "Commit clears pending state before scheduling canonical regeneration",
        composer.indexOf("setClassicalSourcePartsPendingState(false)", composer.indexOf("function commitClassicalSourcePartsEvaluation"))
            < composer.indexOf("scheduleVerbInputRefresh(sourceInput.value", composer.indexOf("function commitClassicalSourcePartsEvaluation")),
        true
    );
    suite.eq(
        "All interactive controls retain a visible keyboard focus treatment",
        css.includes(":focus-visible"),
        true
    );
    suite.eq(
        "Source, Grammar, and Result share a main-to-support type hierarchy",
        {
            tokens:
                css.includes("--sgr-type-main:")
                && css.includes("--sgr-type-sub:")
                && css.includes("--sgr-type-subsub:")
                && css.includes("--sgr-type-support:"),
            stages:
                css.includes(") .panel-block-title .panel-block-text")
                && css.includes("font-size: var(--sgr-type-main)"),
            source:
                css.includes("#classical-source-panel .classical-source-parts__label")
                && css.includes("#classical-source-panel .classical-source-context-controls__help"),
            grammar:
                css.includes("#classical-authority-panel .classical-grammar-dependency-guidance__title")
                && css.includes("#classical-authority-panel .classical-rule-control__label"),
            result:
                css.includes("#classical-result-panel .classical-rule-surface__title")
                && css.includes("#classical-result-panel .classical-rule-surface__disclosure-title")
                && css.includes("#classical-result-panel .classical-rule-surface__disclosure-meta"),
        },
        {
            tokens: true,
            stages: true,
            source: true,
            grammar: true,
            result: true,
        }
    );

    const commitFunction = functionSlice(
        composer,
        "commitClassicalSourcePartsEvaluation",
        "syncClassicalSourcePartControlsFromRuntime"
    );
    const committableSourceFunction = functionSlice(
        composer,
        "hasCommittableClassicalSourceParts",
        "setClassicalSourcePartsPendingState"
    );
    suite.eq(
        "An empty Source draft cannot be reported as applied over an older committed Source",
        {
            wholeOrCompositeRequired:
                committableSourceFunction.includes("sourceState.sourceEmbedStem || sourceState.sourceMatrixStem")
                && committableSourceFunction.includes("sourceState.sourceWholeStem"),
            guardedBeforeCommit:
                commitFunction.indexOf("if (!hasCommittableClassicalSourceParts(sourceState))")
                < commitFunction.indexOf("ClassicalSourcePartsCommittedSignature = signature"),
            pendingRemainsTruthful:
                commitFunction.includes('root?.dataset?.classicalSourceCommitState === "pending"')
                && commitFunction.indexOf("return false;")
                    < commitFunction.indexOf("ClassicalSourcePartsCommittedSignature = signature"),
        },
        {
            wholeOrCompositeRequired: true,
            guardedBeforeCommit: true,
            pendingRemainsTruthful: true,
        }
    );
    const resultRenderFunction = functionSlice(
        rendering,
        "renderClassicalRuleLogicSurfaceBlock",
        "applyOutputPanelShellForTenseMode"
    );
    const entryVersion = indexHtml.match(/main\.mjs\?v=([^"']+)/u)?.[1] || "";
    const focusedReceiptChecks = Object.freeze({
        "CW-S01": sourcePanel.includes('data-classical-workbench-stage="source"')
            && sourcePanel.includes('id="classical-stage-source-heading"')
            && sourcePanel.includes('aria-label="Classical Nahuatl basal unit"'),
        "CW-S02": sourcePanel.includes('data-classical-basal-unit-order="vnc nnc"')
            && countMatches(sourcePanel, /data-classical-basal-scope="(?:verbal|nominal)-nuclear-clause"/gu) === 2,
        "CW-S03": countMatches(sourcePanel, /class="classical-source-parts__input"/gu) === 3
            && sourcePanel.includes('data-classical-source-input-role="machine-mirror"')
            && sourcePanel.includes('id="verb"')
            && sourcePanel.includes('aria-labelledby="classical-source-mirror-label"')
            && sourcePanel.includes('tabindex="-1"')
            && sourcePanel.includes("readonly")
            && !/#classical-source-panel \.classical-source-parts\s*\{[^}]*\border\s*:/gsu.test(css)
            && composer.includes("isCommittedSourceMirror")
            && composer.includes("verbInput.readOnly = isCommittedSourceMirror")
            && composer.includes("verbInput.tabIndex = isCommittedSourceMirror ? -1 : 0"),
        "CW-S04": composer.includes("setClassicalSourcePartsPendingState(getClassicalSourcePartsEvaluationSignature() !== ClassicalSourcePartsCommittedSignature)")
            && events.includes("Typing only updates the editable source")
            && commitFunction.includes("if (!hasCommittableClassicalSourceParts(sourceState))")
            && commitFunction.includes('root?.dataset?.classicalSourceCommitState === "pending"'),
        "CW-S05": events.includes('source: "enter"')
            && events.includes('source: "manual-entry"')
            && countMatches(events, /commitClassicalSourcePartsEvaluation\s*\(/gu) >= 2
            && commitFunction.indexOf("if (!hasCommittableClassicalSourceParts(sourceState))")
                < commitFunction.indexOf("ClassicalSourcePartsCommittedSignature = signature"),
        "CW-S06": !sourcePanel.includes("classical-source-filter")
            && !shell.includes("filterClassicalSourceSelect")
            && !sourcePanel.includes("classical-nnc-source-guide__heading")
            && sourcePanel.includes('id="classical-vnc-source-stem"')
            && sourcePanel.includes('id="classical-nnc-source-example"')
            && countMatches(sourcePanel, /data-classical-source-authorizes="none"/gu) >= 2,
        "CW-G01": grammarPanel.includes('data-classical-workbench-stage="grammar"')
            && grammarPanel.includes('id="classical-stage-grammar-heading"')
            && grammarPanel.includes('data-classical-authority-follows-source="true"'),
        "CW-G02": rendering.includes("getClassicalGrammarDependencyPresentationState")
            && rendering.includes('commitState === "pending"')
            && rendering.includes("controls.hidden = waiting")
            && rendering.includes("[workspace, tenseTabs].filter(Boolean)")
            && css.includes("#classical-rule-logic-controls[hidden]")
            && css.includes("#classical-authority-panel .calc-operators.formula-controls-grid[hidden]")
            && css.includes("#tense-tabs[hidden]")
            && countMatches(css, /display:\s*none\s*!important/gu) >= 3,
        "CW-G03": rendering.includes("getClassicalNncAuthorityControlAvailability")
            && rendering.includes("control.disabled = !renderInAuthority || !availability.available || canvasDisabled")
            && rendering.includes('classicalControlAvailability = !renderInAuthority ? "hidden"')
            && css.includes(".classical-whole-canvas-choice-grid[hidden]")
            && css.includes("display: none !important;"),
        "CW-G04": rendering.includes('classicalResultSourceFact = "read-only"')
            && rendering.includes('classicalAuthorityUserInput = "not-required"')
            && rendering.includes('setAttribute?.("aria-disabled", "true")'),
        "CW-G05": rendering.includes("preceding-typed-voice-layer-authorizes-next-operation")
            && rendering.includes("classicalRuleLogicGate")
            && rendering.includes("derivationSelectionRequired"),
        "CW-G06": grammarPanel.includes('data-derivation-type="direct"')
            && grammarPanel.includes('data-derivation-type="causative"')
            && grammarPanel.includes('data-derivation-type="applicative"')
            && shell.includes('id="classical-construction-operation"')
            && grammarPanel.includes('id="classical-rule-logic-sentence-particle"'),
        "CW-G07": rendering.includes("getClassicalRuleLogicConflictControlIds")
            && rendering.includes("createClassicalResultRecoveryAction")
            && rendering.includes("focusClassicalRuleLogicConflictControl"),
        "CW-P01": indexHtml.includes('data-ui-density="simple"')
            && indexHtml.includes('data-ui-density="advanced"')
            && panels.includes("classicalDisplayOnly")
            && rendering.includes('classicalResultSameAcrossPresentationDepths = "true"'),
        "CW-P02": resultPanel.includes('data-classical-result-scope-control="nnc"')
            && resultPanel.includes('data-classical-result-scope-control="vnc"')
            && rendering.includes("pointwiseEquivalent === true"),
        "CW-P03": !indexHtml.includes('aria-label="Interface size"')
            && !indexHtml.includes('id="ui-scale"')
            && panels.includes('classicalInterfaceScale = "stable"')
            && panels.includes('classicalNativeZoom = "enabled"')
            && !panels.includes("baseFontSize / scale"),
        "CW-R01": rendering.includes('classicalResultHierarchy = "answer-first"')
            && rendering.includes('classicalResultPrimaryAnswer = "true"')
            && resultRenderFunction.indexOf("markClassicalResultPrimaryAnswer")
                < resultRenderFunction.indexOf("createClassicalResultAnalysisDisclosure"),
        "CW-R02": rendering.includes('classicalResultAnalysisDisclosure = "true"')
            && rendering.includes('classicalPresentationOnly = "true"')
            && rendering.includes('classicalGrammarAuthority = "false"'),
        "CW-R03": rendering.includes('const selectedFormula = authorizationStatus === "authorized"')
            && rendering.includes('let sentenceSurfaceDisplay = authorizationStatus === "authorized" ? provisionalSentenceSurfaceDisplay : "";')
            && rendering.includes('dataset.classicalResultGuidance = "blocked"')
            && rendering.includes("const untouchedEmptySource = Boolean(")
            && rendering.includes("sourceRoot.dataset.classicalSourceCommitState !== \"pending\"")
            && rendering.includes("Classical result withheld"),
        "CW-R04": rendering.includes('dataset.classicalResultStatus = "true"')
            && rendering.includes("getClassicalResultAnnouncementSignature")
            && rendering.includes('classicalResultAnnouncementState =')
            && rendering.includes('isRepeatedResult ? "deduplicated" : "transition"')
            && rendering.includes('isRepeatedResult ? "note" : "status"')
            && rendering.includes('isRepeatedResult ? "off" : "polite"')
            && rendering.includes('setAttribute("aria-atomic", "true")')
            && sourcePanel.includes('id="classical-source-commit-status"'),
        "CW-R05": rendering.includes("allowClassicalVisibleSurfaceAtRendererBoundary")
            && rendering.includes("getClassicalOwnerIssuedResultProjection")
            && rendering.includes("assertClassicalVisibleSurfaceResult"),
        "CW-R06": rendering.includes("copyClassicalRuleSurfaceResult")
            && rendering.includes("getClassicalVncResultSourceContinuationCandidate")
            && rendering.includes("Typed Result returned to Source."),
        "CW-W01": shell.indexOf('data-panel-stack-tab="inputs"')
                < shell.indexOf('data-panel-stack-tab="formula"')
            && shell.indexOf('data-panel-stack-tab="formula"')
                < shell.indexOf('data-panel-stack-tab="output"')
            && sourcePanel.includes("data-pane-nav-direction=\"next\"")
            && resultPanel.includes("data-pane-nav-direction=\"prev\""),
        "CW-W02": state.includes('event.key === "ArrowRight"')
            && state.includes('event.key === "ArrowLeft"')
            && state.includes('event.key === "Home"')
            && state.includes('event.key === "End"'),
        "CW-W03": state.includes("targetTab.focus")
            && state.includes("button.tabIndex = showAllPanes ? -1 : isActive ? 0 : -1")
            && state.includes('pane.setAttribute("aria-hidden", String(!isActive))')
            && state.includes("previousShowAllPanes")
            && state.includes("focusedPaneMode")
            && state.includes("focusedTabMode")
            && state.includes("focusExpandedPane"),
        "CW-W04": shell.includes('data-classical-url-state-authority="false"')
            && shell.includes('data-classical-restored-state-authority="false"')
            && composer.includes("sourceTransitivitySelectionFrame?.authorizationStatus === \"blocked\"")
            && composer.includes("derivationTypeValidationFrame?.authorizationStatus === \"blocked\""),
        "CW-W05": rendering.includes("clearClassicalVncResultSourceContinuation")
            && rendering.includes("useClassicalWholeCanvasResultAsNextSource")
            && composer.includes("applyClassicalBasalUnitMode"),
        "CW-Q01": indexHtml.includes('id="classical-workbench"')
            && indexHtml.includes('aria-labelledby="app-title"')
            && countMatches(combinedMarkup, /<h1\b/giu) === 1
            && countMatches(shell, /data-classical-stage-heading="(?:source|grammar|result)"/gu) === 3
            && shell.includes("syncClassicalWorkbenchStageSemantics"),
        "CW-Q02": indexHtml.includes('class="skip-link"')
            && css.includes(":focus-visible")
            && shell.includes('aria-label="Classical Nahuatl Workbench stages"')
            && sourcePanel.includes('aria-keyshortcuts="Enter"'),
        "CW-Q03": css.includes("@media (min-width: 1025px)")
            && css.includes('grid-template-areas: "source grammar result"')
            && css.includes("@media (min-width: 1320px)"),
        "CW-Q04": css.includes("@media (max-width: 1024px)")
            && css.includes("position: sticky")
            && shell.includes("(min-width: 1025px)"),
        "CW-Q05": css.includes("min-width: 0")
            && browserSmoke.includes("noHorizontalOverflow")
            && browserSmoke.includes("sourceWithinViewport")
            && browserSmoke.includes("resultWithinViewport"),
        "CW-Q06": css.includes("@media (prefers-reduced-motion: reduce)")
            && css.includes("min-height: 44px")
            && panels.includes('classicalNativeZoom = "enabled"'),
        "CW-Q07": rendering.includes("The required control is not available for this Source.")
            && rendering.includes("Result unavailable.")
            && rendering.includes("Review the Source and Grammar selections to continue.")
            && !rendering.includes('reason.replace(/-/gu, " ")'),
        "CW-F01": shell.includes("data-classical-rule-logic-control")
            && rendering.includes("classicalAuthorityDecisionOwner")
            && rendering.includes("classicalAuthorityUserInput")
            && shell.includes('class="calc-operator-grid calc-operator-grid--derivation"')
            && shell.includes('role="group"\n                      aria-label="Verbal derivation"')
            && state.includes('operators.removeAttribute("role")')
            && state.includes('operators.removeAttribute("aria-selected")')
            && state.includes('buttonGrid.setAttribute("role", "group")')
            && state.includes('button.removeAttribute("aria-selected")')
            && state.includes('button.setAttribute("aria-pressed", String(isActive))'),
        "CW-F02": shell.includes('data-classical-navigation-authority="false"')
            && shell.includes('data-classical-status-authority="false"')
            && countMatches(sourcePanel, /data-classical-source-authorizes="none"/gu) >= 2
            && composer.includes("invalidComposerFields?.length"),
        "CW-F03": rendering.includes("formulaStringAuthority: false")
            && rendering.includes("surfaceStringAuthority: false")
            && rendering.includes("forbiddenPresentationAuthorityKey"),
        "CW-F04": sourcePanel.includes('id="classical-source-whole"')
            && sourcePanel.includes('id="verb-entry-apply"')
            && grammarPanel.includes('id="classical-rule-logic-controls"')
            && resultPanel.includes('id="classical-rule-logic-surface"'),
        "CW-F05": entryVersion.length > 0
            && countMatches(indexHtml, /<script\b[^>]*type="module"[^>]*src=/gu) === 1
            && countMatches(indexHtml, /<script\b(?![^>]*type="module")[^>]*src=/gu) === 0
            && browserMain.includes(`bootstrap.mjs?v=${entryVersion}`)
            && bootstrap.includes(`composer.mjs?v=${entryVersion}`)
            && bootstrap.includes(`panels.mjs?v=${entryVersion}`)
            && bootstrap.includes(`rendering.mjs?v=${entryVersion}`)
            && bootstrap.includes(`state.mjs?v=${entryVersion}`)
            && bootstrap.includes(`classical_shell.mjs?v=${entryVersion}`)
            && bootstrap.includes("CACHE_CURRENT_PRESENTATION_INSTALLERS")
            && bootstrap.includes("RUNTIME_INSTALLERS.set(modulePath, installer)")
            && runtimeBridge.includes("create_runtime.mjs?v=")
            && createRuntime.includes("rendering.mjs?v=")
            && createRuntime.includes("classical_shell.mjs?v="),
        "CW-F06": packageJson.includes('"smoke:browser"')
            && packageJson.includes('"audit:alignment"')
            && packageJson.includes('"verify:readiness"')
            && browserSmoke.includes('status: "passed"'),
    });
    Object.entries(focusedReceiptChecks).forEach(([atomId, passed]) => {
        suite.eq(
            CLASSICAL_WORKBENCH_SURFACE_RECEIPTS[atomId][0],
            passed,
            true
        );
    });

    return suite;
}

module.exports = {
    CLASSICAL_WORKBENCH_OPERATION_DISPOSITIONS,
    CLASSICAL_WORKBENCH_SURFACE_RECEIPTS,
    run,
};
