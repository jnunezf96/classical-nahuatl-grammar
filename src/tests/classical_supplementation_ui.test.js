"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function functionSlice(source, startName, endName) {
    const start = source.indexOf(`function ${startName}`);
    const end = source.indexOf(`function ${endName}`, start + 1);
    return start >= 0
        ? source.slice(start, end >= 0 ? end : source.length)
        : "";
}

function run() {
    const s = createSuite("classical_supplementation_ui");
    const root = path.resolve(__dirname, "..", "..");
    const shell = fs.readFileSync(
        path.join(root, "src", "ui", "shell", "classical_shell.mjs"),
        "utf8"
    );
    const rendering = fs.readFileSync(
        path.join(root, "src", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );
    const workflow = functionSlice(
        rendering,
        "createClassicalClauseRelationWorkflow",
        "renderClassicalRuleLogicSurfaceBlock"
    );
    const sourceContextBuilder = functionSlice(
        rendering,
        "issueClassicalClauseRelationCurrentDiscourseSourceContextFrame",
        "resetClassicalClauseRelationSelections"
    );
    const captureCard = functionSlice(
        rendering,
        "appendClassicalClauseRelationCaptureCard",
        "createClassicalClauseRelationWorkflow"
    );
    const decisionMap = rendering.slice(
        rendering.indexOf(
            "const CLASSICAL_CLAUSE_RELATION_DECISION_KEYS"
        ),
        rendering.indexOf(
            "function formatClassicalClauseRelationValue"
        )
    );

    s.eq(
        "#1 Source does not expose Lessons 17-19 audit spans, counts, dispositions, or inventories",
        {
            auditCard: shell.includes(
                'data-classical-supplementation-source-contract="true"'
            ),
            auditSpan:
                shell.includes('data-transcription-line-start="5762"')
                && shell.includes('data-transcription-line-end="6738"'),
            auditCount: shell.includes("74 classified spans"),
        },
        {
            auditCard: false,
            auditSpan: false,
            auditCount: false,
        }
    );

    s.eq(
        "#2 Grammar does not project the Lessons 17-19 GCD, LCM inventory, or source dispositions",
        {
            auditSummary: shell.includes(
                'data-classical-supplementation-grammar-contract-summary="true"'
            ),
            axisInventory: shell.includes(
                'data-classical-supplementation-axis-inventory-body="true"'
            ),
            claimInventory: shell.includes(
                'data-classical-supplementation-claim-inventory-body="true"'
            ),
            claimProjection: rendering.includes(
                "Number(claimFrame.lesson) === lesson"
            ),
        },
        {
            auditSummary: false,
            axisInventory: false,
            claimInventory: false,
            claimProjection: false,
        }
    );

    s.eq(
        "#3 Result contains no Lessons 17-19 closure receipt or source-audit row",
        {
            resultKind: rendering.includes(
                'kind: "lessons17-19-source-closure"'
            ),
            sourceSpan: rendering.includes(
                "supplementationContract.sourceLineStart"
            ) || rendering.includes(
                "supplementationContract.sourceLineEnd"
            ),
            auditLabel: rendering.includes(
                'label: "Sentence source closure"'
            ),
        },
        {
            resultKind: false,
            sourceSpan: false,
            auditLabel: false,
        }
    );

    s.eq(
        "presentation code has no Lessons 17-19 audit-contract dependency",
        {
            contractInspection: rendering.includes(
                "inspectClassicalNahuatlLessons17To19GrammarContract"
            ),
            contractGetter: rendering.includes(
                "getClassicalNahuatlLessons17To19GrammarContract"
            ),
            auditDataset: rendering.includes(
                "classicalSupplementationClaimCount"
            ) || rendering.includes(
                "classicalSupplementationInventorySignature"
            ),
        },
        {
            contractInspection: false,
            contractGetter: false,
            auditDataset: false,
        }
    );

    s.ok(
        "#1 Source exposes only the three contextual constituents needed by vocative and exceptional agreement",
        shell.includes('id="classical-source-context-controls"')
        && shell.includes(
            'data-classical-source-contract="contextual-constituents"'
        )
        && shell.includes(
            'data-classical-source-authorizes="context-only"'
        )
        && shell.includes(
            'id="classical-source-context-speaker-gender"'
        )
        && shell.includes(
            'id="classical-source-context-group-membership"'
        )
        && shell.includes(
            'id="classical-source-context-named-partner"'
        )
        && shell.includes(
            'data-classical-url-state-authority="false"'
        )
        && shell.includes(
            'data-classical-restored-state-authority="false"'
        )
    );

    s.ok(
        "capture mints an owner-issued discourse Source frame and never promotes those facts to Grammar selections",
        sourceContextBuilder.includes(
            "controller.issueDiscourseSourceContextFrame({"
        )
        && sourceContextBuilder.includes(
            'readValue("classical-source-context-speaker-gender")'
        )
        && workflow.includes(
            "issueClassicalClauseRelationCurrentDiscourseSourceContextFrame("
        )
        && captureCard.includes(
            "captureState.discourseSourceContext || null"
        )
        && workflow.includes(
            'derived.dataset.classicalClauseRelationDerived = "read-only"'
        )
        && !decisionMap.includes('"speech-act": "speechAct"')
        && !decisionMap.includes('"speaker-gender": "speakerGender"')
    );

    return s;
}

module.exports = { run };
