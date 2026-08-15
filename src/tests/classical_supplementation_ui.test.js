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

function run(ctx = {}) {
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

    s.ok(
        "recursive Results, genuine choices, and clickable formula cues stay on the normal composition panel",
        workflow.includes(
            '{ captureRole: "principal", label: "principal" }'
        )
        && workflow.includes(
            '{ captureRole: "adjoined", label: "supplement" }'
        )
        && workflow.includes('label: `Use composition as ${label}`')
        && workflow.includes(
            'action: `recapture-composition-as-${captureRole}`'
        )
        && workflow.includes("renderClassicalFormulaDerivedAnnotations(")
        && workflow.includes(
            'decisionGrid.dataset.classicalClauseRelationDecisionSurface ='
        )
        && workflow.includes('"unresolved-semantic-choices-only"')
        && decisionMap.includes(
            '"supplementation-order": "supplementationOrder"'
        )
    );

    s.ok(
        "the normal workflow chooses the relation first and narrows capture roles before showing later choices",
        workflow.includes(
            'relationGrid.dataset.classicalClauseRelationDecisionSurface ='
        )
        && workflow.includes('"relation-first-role-narrowing"')
        && workflow.includes("const captureActionRoles = !selectedRelation")
        && workflow.includes(
            'decision.id !== "relation" && requiredCapturesReady'
        )
    );

    const target = Object.create(ctx);
    const controllerApi =
        ctx.createClassicalClauseRelationControllerGlobals(target);
    Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(controllerApi)
    );
    const controller = target.createClassicalClauseRelationController();
    const relationFirst = controller.buildDecisionContract({
        relation: "supplementation",
    });
    const issueNnc = (stem) => {
        const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject: "3sg",
            nounClass: "zero",
            animacy: "animate",
        });
        return ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                frame.nncSlotFrame,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    };
    controller.captureCurrentResult(
        "principal",
        issueNnc("Petoloh").canonicalResult,
    );
    controller.captureCurrentResult(
        "adjoined",
        issueNnc("icnīuh").canonicalResult,
    );
    const unresolved = controller.buildDecisionContract({
        relation: "supplementation",
    });
    const resolved = controller.buildDecisionContract({
        relation: "supplementation",
        supplementationReferenceMode: "shared",
        supplementationOrder: "principal-first",
    });
    s.eq(
        "Canvas-derived defaults stay automatic but genuine supplementation choices never receive silent answers",
        {
            relationFirst: relationFirst.relation,
            relationFirstBlock: relationFirst.blockReason,
            relationFirstCaptures:
                relationFirst.derived.requiredCaptureRoles,
            unresolvedStatus: unresolved.authorizationStatus,
            unresolvedChoices: unresolved.unresolvedDecisionIds,
            unresolvedSelections: unresolved.decisions
                .filter((decision) => [
                    "supplementation-reference-mode",
                    "supplementation-order",
                ].includes(decision.id))
                .map((decision) => [decision.id, decision.selectedValue]),
            resolvedStatus: resolved.authorizationStatus,
        },
        {
            relationFirst: "supplementation",
            relationFirstBlock: "classical-supplementation-principal-capture-required",
            relationFirstCaptures: ["principal", "adjoined"],
            unresolvedStatus: "blocked",
            unresolvedChoices: [
                "supplementation-reference-mode",
                "supplementation-order",
            ],
            unresolvedSelections: [
                ["supplementation-reference-mode", ""],
                ["supplementation-order", ""],
            ],
            resolvedStatus: "authorized",
        }
    );

    return s;
}

module.exports = { run };
