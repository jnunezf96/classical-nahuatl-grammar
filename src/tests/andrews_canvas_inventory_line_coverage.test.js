"use strict";

const { createSuite } = require("./runner");
const {
    buildAndrewsCanvasInventoryLineCoverageAudit,
} = require(
    "../../scripts/lib/andrews_canvas_inventory_line_coverage"
);

function syntheticCanvas() {
    const lines = [];
    const coordinates = {};
    for (let lesson = 1; lesson <= 58; lesson += 1) {
        lines.push(`LESSON ${lesson}`);
        if (lesson === 1) {
            lines.push("An independently countable claim.");
            coordinates.claim = lines.length;
            lines.push("Printed lesson title");
            coordinates.title = lines.length;
        }
    }
    lines.push("APPENDIX A");
    return { text: lines.join("\n"), coordinates };
}

function run() {
    const s = createSuite("andrews_canvas_inventory_line_coverage");
    const canvas = syntheticCanvas();
    const inventory = {
        valid: true,
        records: [{
            itemId: "synthetic-claim",
            canvasSpanStart: canvas.coordinates.claim,
            canvasSpanEnd: canvas.coordinates.claim,
        }],
    };

    const missingDisposition =
        buildAndrewsCanvasInventoryLineCoverageAudit({
            inventory,
            canvasText: canvas.text,
            dispositions: [],
        });
    s.eq(
        "an uncovered nonblank Canvas line disproves denominator closure",
        {
            complete: missingDisposition.complete,
            candidates: missingDisposition.candidateCount,
            unresolved: missingDisposition.unresolvedCount,
            first: missingDisposition.undispositioned[0],
        },
        {
            complete: false,
            candidates: 1,
            unresolved: 1,
            first: {
                canvasLine: canvas.coordinates.title,
                lesson: 1,
                pdfPage: null,
                pageLine: 0,
                text: "Printed lesson title",
            },
        }
    );

    const disposition = {
        canvasLine: canvas.coordinates.title,
        lesson: 1,
        pdfPage: null,
        pageLine: 0,
        text: "Printed lesson title",
        kind: "heading-only",
        manualReview: true,
        rationale:
            "The line is a printed title and carries no independent proposition.",
    };
    const complete = buildAndrewsCanvasInventoryLineCoverageAudit({
        inventory,
        canvasText: canvas.text,
        dispositions: [disposition],
    });
    s.eq(
        "an exact manually reviewed non-atomic disposition closes only its own line",
        {
            complete: complete.complete,
            candidates: complete.candidateCount,
            dispositioned: complete.dispositionedCount,
            unresolved: complete.unresolvedCount,
            invalid: complete.invalidDispositions,
        },
        {
            complete: true,
            candidates: 1,
            dispositioned: 1,
            unresolved: 0,
            invalid: [],
        }
    );

    const copiedWithChangedText = {
        ...disposition,
        text: "Different title",
    };
    const hostile = buildAndrewsCanvasInventoryLineCoverageAudit({
        inventory,
        canvasText: canvas.text,
        dispositions: [copiedWithChangedText],
    });
    s.ok(
        "a stale or copied disposition cannot hide a changed Canvas line",
        hostile.invalidDispositions.some((record) => (
            record.errors.includes("text:exact-canvas-line-required")
        ))
    );

    return s;
}

module.exports = { run };
