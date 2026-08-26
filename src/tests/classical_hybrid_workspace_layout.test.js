"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const read = relativePath => fs.readFileSync(
    path.join(ROOT, relativePath),
    "utf8"
);

function elementBlock(source, id, openingTag, closingTag) {
    const idIndex = source.indexOf(`id="${id}"`);
    if (idIndex < 0) return "";
    const start = source.lastIndexOf(`<${openingTag}`, idIndex);
    const end = source.indexOf(`</${closingTag}>`, idIndex);
    return start >= 0 && end > idIndex
        ? source.slice(start, end + closingTag.length + 3)
        : "";
}

function count(source, fragment) {
    return source.split(fragment).length - 1;
}

function run(ctx = {}) {
    const suite = createSuite("classical_hybrid_workspace_layout");
    const shell = read("src/ui/shell/classical_shell.mjs");
    const css = read("style.css");
    const state = read("src/ui/state.mjs");
    const rendering = read("src/ui/rendering/rendering.mjs");
    const navigator = elementBlock(
        shell,
        "classical-capability-navigator",
        "section",
        "section"
    );
    const operationPlan = elementBlock(
        shell,
        "classical-capability-operation-plan",
        "section",
        "section"
    );
    const history = elementBlock(
        shell,
        "classical-grammar-workspace-history",
        "details",
        "details"
    );
    const advanced = elementBlock(
        shell,
        "classical-grammar-advanced",
        "details",
        "details"
    );
    const panelShellStart = shell.indexOf("function ClassicalPanelShell()");
    const panelShellEnd = shell.indexOf(
        "function installClassicalShell()",
        panelShellStart
    );
    const panelShell = shell.slice(panelShellStart, panelShellEnd);
    const grammarControlsIndex = shell.indexOf(
        'class="classical-rule-controls-grid"',
        shell.indexOf('id="classical-rule-logic-controls"')
    );
    const finalGrammarChoiceIndex = shell.indexOf(
        'id="classical-rule-logic-introductory-modifier"',
        grammarControlsIndex
    );
    const operationPlanMountIndex = shell.indexOf(
        "${ClassicalCapabilityOperationPlan()}",
        finalGrammarChoiceIndex
    );

    suite.ok(
        "Source keeps only the owner-observed pathway selector, status, and hidden pathway projection",
        navigator.includes('id="classical-capability-navigator-operation"')
        && navigator.includes('id="classical-capability-navigator-status"')
        && navigator.includes('id="classical-capability-navigator-pathways"')
        && navigator.includes('aria-hidden="true"')
        && navigator.includes("hidden")
        && ![
            "classical-capability-navigator-binding",
            "classical-capability-navigator-changes",
            "classical-capability-navigator-preserves",
            "classical-grammar-workspace-history",
            "classical-capability-closure-status",
            "classical-capability-apply-operation",
        ].some(fragment => navigator.includes(fragment))
    );

    suite.ok(
        "Grammar owns the exact-role plan after its choices and exposes one distinct operation action",
        operationPlanMountIndex > finalGrammarChoiceIndex
        && operationPlan.includes('id="classical-capability-navigator-binding"')
        && operationPlan.includes(
            'data-classical-capability-navigator-changes="true"'
        )
        && operationPlan.includes(
            'data-classical-capability-navigator-preserves="true"'
        )
        && operationPlan.includes(
            'id="classical-capability-apply-operation"'
        )
        && operationPlan.includes(">Make Result</button>")
        && operationPlan.includes('data-classical-grammar-authority="false"')
        && operationPlan.includes("disabled")
        && !operationPlan.includes('id="verb-entry-apply"')
        && count(shell, 'id="classical-capability-apply-operation"') === 1
        && count(shell, 'id="verb-entry-apply"') === 1
    );

    suite.ok(
        "History and collapsed Advanced diagnostics are direct full-workbench siblings after the panel grid",
        panelShell.indexOf("ClassicalGrammarWorkspaceHistory()")
            > panelShell.indexOf('class="panel-grid"')
        && panelShell.indexOf("ClassicalGrammarAdvanced()")
            > panelShell.indexOf("ClassicalGrammarWorkspaceHistory()")
        && panelShell.includes(
            "+ '      </div>\\n' + ClassicalGrammarWorkspaceHistory() + ClassicalGrammarAdvanced() + ClassicalPlayWitnessControls();"
        )
        && history.includes('data-classical-workbench-support="history"')
        && history.includes(">Your builds</summary>")
        && history.includes('data-classical-presentation-only="true"')
        && history.includes('data-classical-grammar-authority="false"')
        && advanced.includes('id="classical-capability-closure-status"')
        && advanced.includes('data-classical-proof-authority="false"')
        && advanced.includes("do not authorize Source, Grammar, or Result")
        && !/<details[^>]*\sopen(?:\s|=|>)/u.test(advanced)
    );

    suite.ok(
        "the shell declares one parent-owned instance of every moved or new control",
        count(shell, 'id="classical-capability-navigator"') === 1
        && count(shell, 'id="classical-capability-operation-plan"') === 1
        && count(shell, 'id="classical-capability-navigator-binding"') === 1
        && count(shell, 'id="classical-grammar-workspace-history"') === 1
        && count(shell, 'id="classical-grammar-advanced"') === 1
        && count(shell, 'id="classical-capability-closure-status"') === 1
        && operationPlanMountIndex > grammarControlsIndex
        && !navigator.includes("ClassicalCapabilityOperationPlan")
        && !navigator.includes("ClassicalGrammarWorkspaceHistory")
        && !navigator.includes("ClassicalGrammarAdvanced")
    );

    suite.ok(
        "Result continuation keeps the existing owner-issued final Result section",
        shell.includes(
            'appendExisting(continuation, ["classical-grammar-continuation"]);'
        )
        && shell.includes(
            '"view-structure-analysis-paradigm-continuation"'
        )
        && !operationPlan.includes("classical-grammar-continuation")
        && !history.includes("classical-grammar-continuation")
        && !advanced.includes("classical-grammar-continuation")
    );

    suite.ok(
        "hybrid styling scopes the operation plan to Grammar and support tools to the workbench root",
        css.includes(
            "#classical-authority-panel\n  .classical-capability-operation-plan"
        )
        && css.includes("#classical-capability-apply-operation")
        && css.includes(
            "#classical-app-root\n  > .classical-grammar-workspace-history"
        )
        && css.includes(
            "#classical-app-root\n  > .classical-grammar-advanced"
        )
        && css.includes("grid-template-columns: repeat(2, minmax(0, 1fr))")
        && css.includes("width: 100%;")
    );

    suite.ok(
        "phones expose one continuous Source, Grammar, Result, History, Advanced sequence instead of tab-hidden stages",
        css.includes("@media (max-width: 720px)")
        && css.includes("#panel-stack-pane-inputs")
        && css.includes("#panel-stack-pane-tense")
        && css.includes("#container-tense-grid")
        && css.includes("display: grid !important;")
        && css.includes(".panel-stack-tabs")
        && css.includes("display: none !important;")
        && state.includes("function isStackedPanelLayout()")
        && state.includes(
            "return isThreeColumnPanelLayout() || isStackedPanelLayout();"
        )
        && state.includes(
            "showsAllPanelStackPanes() || isPanelStackSwipeExcludedTarget"
        )
        && shell.includes('? "stacked"')
        && shell.includes('navigation.hidden = layout !== "compact"')
    );

    suite.ok(
        "pathway and role selection stage controls while only Apply may dispatch owner execution",
        rendering.includes("navigate: true,\n            execute: false")
        && rendering.includes("{ navigate: true, execute: true }")
        && rendering.includes(
            'allowExecution\n            && current.family !== "formation-result"'
        )
        && rendering.includes(
            "syncClassicalRelationalNncUiControls?.({\n              render: false"
        )
        && count(
            rendering,
            'current.family !== "formation-result"'
        ) >= 2
        && rendering.includes(
            "syncClassicalNominalConstructionControlVisibility(option.value)"
        )
    );

    return suite;
}

module.exports = { run };
