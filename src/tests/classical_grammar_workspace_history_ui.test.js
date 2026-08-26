"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function readSource(relativePath) {
    return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function makeDirectVncReceipt(ctx, stem) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{
            sourceStem: stem,
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "direct",
            requestedVoice: "active",
            voice: "active",
        }],
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_grammar_workspace_history_ui");
    const shell = readSource("src/ui/shell/classical_shell.mjs");
    const rendering = readSource("src/ui/rendering/rendering.mjs");
    const style = readSource("style.css");
    const historyId = 'id="classical-grammar-workspace-history"';
    const historyIdIndex = shell.indexOf(historyId);
    const historyStart = shell.lastIndexOf("<details", historyIdIndex);
    const historyEnd = shell.indexOf("</details>", historyIdIndex);
    const historyShell = shell.slice(historyStart, historyEnd + 10);
    const navigatorIdIndex = shell.indexOf(
        'id="classical-capability-navigator"'
    );
    const navigatorStart = shell.lastIndexOf("<section", navigatorIdIndex);
    const navigatorEnd = shell.indexOf("</section>", navigatorIdIndex);
    const navigatorShell = shell.slice(navigatorStart, navigatorEnd + 10);
    const panelShellStart = shell.indexOf("function ClassicalPanelShell()");
    const panelShellEnd = shell.indexOf(
        "function installClassicalShell()",
        panelShellStart
    );
    const panelShell = shell.slice(panelShellStart, panelShellEnd);
    const renderingStart = rendering.indexOf(
        "function activateClassicalGrammarWorkspaceCapture"
    );
    const renderingEnd = rendering.indexOf(
        "function syncClassicalAppliedGrammarAccount",
        renderingStart
    );
    const historyRendering = rendering.slice(renderingStart, renderingEnd);
    const undoHandlerStart = historyRendering.indexOf(
        'undo?.addEventListener("click"'
    );
    const undoHandlerEnd = historyRendering.indexOf(
        'fork?.addEventListener("click"',
        undoHandlerStart
    );
    const undoHandler = historyRendering.slice(
        undoHandlerStart,
        undoHandlerEnd
    );
    const supplyHandlerStart = historyRendering.indexOf(
        'supply?.addEventListener("click"'
    );
    const supplyHandlerEnd = historyRendering.indexOf(
        'compare?.addEventListener("click"',
        supplyHandlerStart
    );
    const supplyHandler = historyRendering.slice(
        supplyHandlerStart,
        supplyHandlerEnd
    );
    const bindingSelectionStart = rendering.indexOf(
        "function updateClassicalCapabilityNavigatorSelection"
    );
    const bindingSelectionEnd = rendering.indexOf(
        "function syncClassicalCapabilityNavigator",
        bindingSelectionStart
    );
    const bindingSelectionRendering = rendering.slice(
        bindingSelectionStart,
        bindingSelectionEnd
    );
    const bindingEntryStart = rendering.indexOf(
        "function enterClassicalGrammarResultBindingChoice"
    );
    const bindingEntryEnd = rendering.indexOf(
        "function syncClassicalGrammarResultBindingChoices",
        bindingEntryStart
    );
    const bindingEntryRendering = rendering.slice(
        bindingEntryStart,
        bindingEntryEnd
    );

    s.ok(
        "the workbench contains one collapsed, non-authoritative build history after the panel grid",
        historyIdIndex >= 0
        && historyShell.includes(">Your builds</summary>")
        && [
            "classical-grammar-workspace-history-node",
            "classical-grammar-workspace-history-compare-node",
            "classical-grammar-workspace-history-undo",
            "classical-grammar-workspace-history-fork",
            "classical-grammar-workspace-history-continue",
            "classical-grammar-workspace-history-supply",
            "classical-grammar-workspace-history-compare",
            "classical-grammar-workspace-history-status",
        ].every(id => historyShell.includes(`id="${id}"`))
        && historyShell.includes(">Add to pathway</button>")
        && historyShell.includes('data-classical-presentation-only="true"')
        && historyShell.includes('data-classical-grammar-authority="false"')
        && !navigatorShell.includes(historyId)
        && panelShell.includes(
            "+ '      </div>\\n' + ClassicalGrammarWorkspaceHistory() + ClassicalGrammarAdvanced() + ClassicalPlayWitnessControls();"
        )
        && panelShell.indexOf("ClassicalGrammarWorkspaceHistory()")
            > panelShell.indexOf('class="panel-grid"')
        && style.includes(".classical-grammar-workspace-history__selectors")
        && style.includes("grid-template-columns: repeat(2, minmax(0, 1fr))")
        && style.includes(".classical-grammar-workspace-history__actions")
        && style.includes("flex-wrap: wrap")
    );

    s.ok(
        "Continue and Undo restore only validator-accepted exact captures while Fork and Compare use private history identities",
        historyRendering.includes(
            "isClassicalGrammarApplicationResultCapture(capture)"
        )
        && historyRendering.includes("capture.canonicalResult")
        && historyRendering.includes(
            "getClassicalGrammarApplicationCapabilityNavigator"
        )
        && historyRendering.includes(
            "undoClassicalGrammarWorkspaceHistory"
        )
        && historyRendering.includes(
            "continueClassicalGrammarWorkspaceFrom"
        )
        && historyRendering.includes(
            "forkClassicalGrammarWorkspaceHistory"
        )
        && historyRendering.includes(
            "compareClassicalGrammarWorkspaceHistory"
        )
        && historyRendering.includes(
            "isClassicalGrammarWorkspaceComparison"
        )
        && ![
            "structuredClone",
            "JSON.parse",
            "JSON.stringify",
            "{ ...capture",
            "capture.surface",
            "capture.formula",
        ].some(fragment => historyRendering.includes(fragment))
    );

    s.ok(
        "Undo follows the active branch boundary, selects the restored node, and keeps its restoration message after synchronization",
        historyRendering.includes(
            "if (undo) undo.disabled = value?.canUndo !== true;"
        )
        && undoHandler.includes(
            "const nextSnapshot = syncClassicalGrammarWorkspaceHistory();"
        )
        && undoHandler.includes(
            'String(nextSnapshot?.currentNodeId || "")'
        )
        && undoHandler.indexOf(
            "const nextSnapshot = syncClassicalGrammarWorkspaceHistory();"
        ) < undoHandler.indexOf("status.textContent = restored")
        && undoHandler.includes(
            '"Undid one derivation step; exact Result restored as Source."'
        )
    );

    s.ok(
        "Add to pathway preserves the action outcome after history synchronization",
        supplyHandler.includes(
            "const actionMessage = String(status.textContent || \"\");"
        )
        && supplyHandler.indexOf("const actionMessage =")
            < supplyHandler.indexOf("syncClassicalGrammarWorkspaceHistory();")
        && supplyHandler.indexOf("syncClassicalGrammarWorkspaceHistory();")
            < supplyHandler.indexOf("status.textContent = supplied")
        && supplyHandler.includes(
            "That exact Result does not fill the active pathway's missing role."
        )
    );

    s.ok(
        "Add to pathway requires an exact history Result and an owner-selected binding role without gaining grammar authority",
        historyRendering.includes(
            '"classical-grammar-workspace-history-supply"'
        )
        && historyRendering.includes(
            "supply.disabled = !selectedId"
        )
        && historyRendering.includes(
            "|| !ActiveClassicalGrammarResultBinding"
        )
        && historyRendering.includes(
            "|| !ActiveClassicalGrammarResultBinding.selectedBindingId"
        )
        && historyRendering.includes(
            "recoverClassicalGrammarWorkspaceResult?.("
        )
        && historyRendering.includes(
            "supplyClassicalGrammarWorkspaceResultToBinding(capture)"
        )
        && historyRendering.includes(
            "const binding = ActiveClassicalGrammarResultBinding;"
        )
        && historyRendering.includes("!capture?.canonicalResult")
        && historyRendering.includes(
            "binding.exactResult === capture.canonicalResult"
        )
        && historyRendering.includes(
            "const exactAdditionalResult = capture.canonicalResult;"
        )
        && historyRendering.includes(
            "issueClassicalNahuatlFormationResultBindingCompletionFrame"
        )
        && historyRendering.includes(
            "isClassicalNahuatlFormationResultBindingCompletionFrame"
        )
        && historyRendering.includes(
            'completion.authorizationStatus === "authorized"'
        )
        && historyRendering.includes(
            "completion.primaryExactResult === binding.exactResult"
        )
        && historyRendering.includes(
            "completion.additionalExactResult === exactAdditionalResult"
        )
        && historyRendering.includes(
            "ownerRequestPatch: completion.ownerRequestPatch"
        )
        && bindingSelectionRendering.includes(
            "activeOperation.ownerBindingFrameValidated === true"
        )
        && bindingSelectionRendering.includes(
            "exactResult: activeOperation.ownerBindingInputResult"
        )
        && bindingEntryRendering.includes(
            "const selectedOwnerBindingChoice = current.ownerBindingFrame"
        )
        && bindingEntryRendering.includes(
            "selectedOwnerBindingChoice.requiredChoiceIds"
        )
        && bindingEntryRendering.includes(
            "selectedOwnerBindingChoice.requiredResultRoles"
        )
        && bindingEntryRendering.includes(
            "requiredChoiceIds: selectedRequiredChoiceIds"
        )
        && bindingEntryRendering.includes(
            "requiredResultRoles: selectedRequiredResultRoles"
        )
        && rendering.includes(
            "const exactOwnerRequestPatch = exactBinding?.ownerRequestPatch"
        )
        && rendering.includes(
            "exactOwnerRequestPatch.canonicalPreteritVncResult"
        )
        && rendering.includes(
            ".canonicalInstrumentiveAbsolutiveVncResult"
        )
        && rendering.includes(
            ".canonicalInstrumentivePossessiveVncResult"
        )
        && bindingSelectionRendering.includes("grammarAuthority: false")
        && historyShell.includes('data-classical-grammar-authority="false"')
        && ![
            "{ ...capture",
            "{ ...exactAdditionalResult",
            "String(capture.canonicalResult)",
            "capture.surface",
            "capture.formula",
        ].some(fragment => historyRendering.includes(fragment))
    );

    const before = ctx.getClassicalGrammarWorkspaceHistorySnapshot();
    const firstAction = ctx.beginClassicalGrammarWorkspaceUserAction(
        "vnc:application"
    );
    const firstReceipt = makeDirectVncReceipt(ctx, "ahci");
    const afterInternalReceipts =
        ctx.getClassicalGrammarWorkspaceHistorySnapshot();
    ctx.completeClassicalGrammarWorkspaceUserAction(
        firstAction,
        firstReceipt
    );
    const afterFirst = ctx.getClassicalGrammarWorkspaceHistorySnapshot();
    const firstNode = afterFirst.nodes.find(node => {
        const capture = ctx.recoverClassicalGrammarWorkspaceResult(
            node.nodeId
        );
        return capture?.applicationResult === firstReceipt;
    });
    const firstCapture = firstNode
        ? ctx.recoverClassicalGrammarWorkspaceResult(firstNode.nodeId)
        : null;
    const countBeforeCopies = afterFirst.nodeCount;
    const copiedApplicationRejected =
        ctx.recordClassicalGrammarWorkspaceResult({ ...firstReceipt })
            === null;
    const copiedResultRejected =
        ctx.recordClassicalGrammarWorkspaceResult({
            ...firstReceipt.canonicalResult,
        }) === null;
    const countAfterCopies =
        ctx.getClassicalGrammarWorkspaceHistorySnapshot().nodeCount;

    s.eq(
        "one explicit Make Result records its exact Result while internal receipts and copies stay out of build history",
        {
            receiptAuthorized:
                firstReceipt.authorizationStatus === "authorized",
            internalReceiptsAddedNodes:
                afterInternalReceipts.nodeCount - before.nodeCount,
            addedNodes: afterFirst.nodeCount - before.nodeCount,
            applicationIdentity:
                firstCapture?.applicationResult === firstReceipt,
            resultIdentity:
                firstCapture?.canonicalResult
                    === firstReceipt.canonicalResult,
            captureValid: Boolean(
                firstCapture
                && ctx.isClassicalGrammarApplicationResultCapture(
                    firstCapture
                )
            ),
            copiedApplicationRejected,
            copiedResultRejected,
            copiesAddedNodes: countAfterCopies - countBeforeCopies,
            grammarAuthority: afterFirst.grammarAuthority,
        },
        {
            receiptAuthorized: true,
            internalReceiptsAddedNodes: 0,
            addedNodes: 1,
            applicationIdentity: true,
            resultIdentity: true,
            captureValid: true,
            copiedApplicationRejected: true,
            copiedResultRejected: true,
            copiesAddedNodes: 0,
            grammarAuthority: false,
        }
    );

    const branch = ctx.forkClassicalGrammarWorkspaceHistory(
        firstNode?.nodeId,
        "Alternative"
    );
    const secondAction = ctx.beginClassicalGrammarWorkspaceUserAction(
        "vnc:application"
    );
    const secondReceipt = makeDirectVncReceipt(ctx, "chōca");
    ctx.completeClassicalGrammarWorkspaceUserAction(
        secondAction,
        secondReceipt
    );
    const afterSecond = ctx.getClassicalGrammarWorkspaceHistorySnapshot();
    const secondNode = afterSecond.nodes.find(node => {
        const capture = ctx.recoverClassicalGrammarWorkspaceResult(
            node.nodeId
        );
        return capture?.applicationResult === secondReceipt;
    });
    const undoCapture = ctx.undoClassicalGrammarWorkspaceHistory();
    const continueCapture = ctx.continueClassicalGrammarWorkspaceFrom(
        secondNode?.nodeId
    );
    const comparison = ctx.compareClassicalGrammarWorkspaceHistory(
        firstNode?.nodeId,
        secondNode?.nodeId
    );

    s.eq(
        "Undo, Continue, Fork, and Compare retain exact Results without acquiring grammar authority",
        {
            forkAnchor: branch?.anchorNodeId,
            forkAuthority: branch?.grammarAuthority,
            secondParent: secondNode?.parentNodeId,
            undoApplicationIdentity:
                undoCapture?.applicationResult === firstReceipt,
            undoResultIdentity:
                undoCapture?.canonicalResult
                    === firstReceipt.canonicalResult,
            continueApplicationIdentity:
                continueCapture?.applicationResult === secondReceipt,
            continueResultIdentity:
                continueCapture?.canonicalResult
                    === secondReceipt.canonicalResult,
            comparisonValid:
                ctx.isClassicalGrammarWorkspaceComparison(comparison),
            comparisonAuthority: comparison?.grammarAuthority,
            historyAuthority: afterSecond.grammarAuthority,
        },
        {
            forkAnchor: firstNode?.nodeId,
            forkAuthority: false,
            secondParent: firstNode?.nodeId,
            undoApplicationIdentity: true,
            undoResultIdentity: true,
            continueApplicationIdentity: true,
            continueResultIdentity: true,
            comparisonValid: true,
            comparisonAuthority: false,
            historyAuthority: false,
        }
    );

    return s;
}

module.exports = { run };
