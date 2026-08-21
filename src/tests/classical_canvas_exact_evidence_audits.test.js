"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    resolveLegacySupportPath,
} = require("./helpers/legacy_support_path");
const lesson20Audit = require(resolveLegacySupportPath(
    "scripts/audit_classical_lesson20_nonactive_examples.js"
));
const lessons2022Audit = require(resolveLegacySupportPath(
    "scripts/audit_classical_lessons20_22_canvas_examples.js"
));
const lessons2426Audit = require("../../scripts/audit_classical_lessons24_26_canvas_examples");
const lesson53Audit = require(resolveLegacySupportPath(
    "scripts/audit_classical_lesson53_source_spans.js"
));
const canvasCatalogEvidence = require(
    "../../scripts/lib/classical_canvas_catalog_evidence"
);
const {
    CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES,
} = require(resolveLegacySupportPath(
    "scripts/classical_lessons24_25_canvas_catalog.js"
));
const {
    WITNESSES: LESSON53_WITNESSES,
} = require("./fixtures/classical_lesson53_canvas_ledger");
const {
    LESSON56_CLAIMS,
    REQUIRED_RULE_IDS: LESSON56_REQUIRED_RULE_IDS,
    SOURCE_SHA256: LESSON56_SOURCE_SHA256,
    auditClassicalNahuatlLesson56Canvas,
} = require("./fixtures/classical_lesson56_source_ledger");

const ROOT = path.resolve(__dirname, "..", "..");

function readCanvasLines() {
    return fs.readFileSync(
        path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
        "utf8"
    ).split(/\r?\n/u);
}

function readCanvasText() {
    return fs.readFileSync(
        path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
        "utf8"
    );
}

function run() {
    const s = createSuite("classical_canvas_exact_evidence_audits");
    const canvasLines = readCanvasLines();

    s.eq(
        "Lessons 20-22 formula fixtures equal the exact Canvas token after only the declared zero-morph representation mapping",
        [
            ...lessons2022Audit.REPRESENTABLE_EXAMPLES,
            ...lessons2022Audit.MISSING_RULE_LOGIC_EXAMPLES,
        ].filter((example) => {
            const witness = lessons2022Audit.extractCanvasFormulaWitness(
                canvasLines,
                example.line
            );
            return witness.extractionStatus !== "exact"
                || example.expectedFormula !== witness.canonicalFormulaToken;
        }).map((example) => example.id),
        []
    );

    s.eq(
        "the exact formula extractor preserves Canvas vowel length and boundaries",
        lessons2022Audit.extractCanvasFormulaWitness(canvasLines, 7069),
        {
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            line: 7069,
            exactSourceLine:
                "Active VNC: annēchānazqueh = #an-Ø+n-ēch(āna)z+qu-eh# = you (pl) will seize",
            exactFormulaTokens: ["#an-Ø+n-ēch(āna)z+qu-eh#"],
            exactFormulaToken: "#an-Ø+n-ēch(āna)z+qu-eh#",
            canonicalFormulaToken: "#an-0+n-ēch(āna)z+qu-eh#",
            tokenCount: 1,
            extractionStatus: "exact",
        }
    );

    s.ok(
        "a fixture and runtime that drift together are rejected while the Canvas remains unchanged",
        lessons2022Audit.runCanvasFormulaSynchronizedDriftHostileTest(
            canvasLines
        ).passed
    );

    s.eq(
        "every Lesson 20 catalog target has an exact nearby Canvas source-target witness",
        (() => {
            const tokenIndex =
                lesson20Audit.extractLesson20CanvasParentheticalTokenIndex(
                    canvasLines
                );
            return lesson20Audit.LESSON20_NONACTIVE_EXAMPLES
                .filter((example) => !lesson20Audit.extractLesson20CanvasCaseEvidence(
                    example,
                    canvasLines,
                    tokenIndex
                ).exact)
                .map((example) => example.sourceStem);
        })(),
        []
    );

    s.ok(
        "Lesson 20 synchronized fixture and runtime drift is rejected by exact Canvas extraction",
        lesson20Audit.runLesson20SynchronizedDriftHostileTest(canvasLines).passed
    );

    s.eq(
        "Lessons 24-26 diagram and inline-formula fixtures are extracted from their exact Canvas spans",
        lessons2426Audit.CANVAS_EXAMPLES.map((example) => {
            const canvasRange = canvasLines
                .slice(example.lineStart - 1, example.lineEnd)
                .join("\n");
            return lessons2426Audit.extractCanvasDiagramFormula(
                example,
                canvasRange
            ).canonicalFormulaToken;
        }),
        lessons2426Audit.CANVAS_EXAMPLES.map((example) => example.expectedFormula)
    );

    s.ok(
        "Lessons 24-26 synchronized fixture and runtime drift is rejected by exact Canvas extraction",
        lessons2426Audit.runCanvasWitnessSynchronizedDriftHostileTest(
            canvasLines
        ).passed
    );

    s.ok(
        "the complete-example catalog evidence gate accepts an exact line-local Canvas relation",
        canvasCatalogEvidence.extractCanvasCatalogRowEvidence(
            CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES[0],
            canvasLines
        ).exact
    );

    s.eq(
        "the complete-example catalog evidence gate rejects a transcription-divergent relation",
        canvasCatalogEvidence.extractCanvasCatalogRowEvidence(
            CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES[11],
            canvasLines
        ).exact,
        false
    );

    s.ok(
        "complete-example synchronized catalog and runtime drift is rejected while Canvas remains unchanged",
        canvasCatalogEvidence.runCanvasCatalogSynchronizedDriftHostileTest(
            CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES[0],
            canvasLines
        ).passed
    );

    s.eq(
        "every Lesson 53 stored witness is recoverable from its exact Canvas span",
        LESSON53_WITNESSES.filter((witness) => (
            !lesson53Audit.extractLesson53CanvasWitnessEvidence(
                witness,
                canvasLines
            ).exact
        )).map((witness) => witness.id),
        []
    );

    s.eq(
        "Lesson 53 morph notation is flattened only from the cited Canvas formula",
        lesson53Audit.extractLesson53CanvasWitnessEvidence(
            LESSON53_WITNESSES[0],
            canvasLines
        ).formulaSurfaceCandidates,
        ["nanacatl"]
    );

    s.ok(
        "Lesson 53 synchronized fixture and consumer drift is rejected by exact Canvas extraction",
        lesson53Audit.runLesson53SynchronizedDriftHostileTest(
            canvasLines
        ).passed
    );

    s.eq(
        "Lesson 56 is locked to the exact cited Canvas slice",
        auditClassicalNahuatlLesson56Canvas(readCanvasText()).sourceSha256,
        LESSON56_SOURCE_SHA256
    );

    s.eq(
        "every Lesson 56 required rule has exactly one exact claim-level Canvas witness",
        (() => {
            const audit = auditClassicalNahuatlLesson56Canvas(
                readCanvasText()
            );
            return {
                requiredRuleIds: LESSON56_REQUIRED_RULE_IDS,
                claimIds: LESSON56_CLAIMS.map(claim => claim.id),
                bijection: audit.claimBijectionComplete,
                exactClaimCount: audit.exactClaimCount,
                missingClaimIds: audit.missingClaimIds,
                unexpectedClaimIds: audit.unexpectedClaimIds,
                duplicateClaimIds: audit.duplicateClaimIds,
            };
        })(),
        {
            requiredRuleIds: LESSON56_REQUIRED_RULE_IDS,
            claimIds: LESSON56_REQUIRED_RULE_IDS,
            bijection: true,
            exactClaimCount: LESSON56_REQUIRED_RULE_IDS.length,
            missingClaimIds: [],
            unexpectedClaimIds: [],
            duplicateClaimIds: [],
        }
    );

    s.eq(
        "Lesson 56 documentary examples and bracket paraphrases carry no owner-execution authority",
        LESSON56_CLAIMS
            .filter(claim =>
                claim.disposition === "documentary-non-authoritative"
            )
            .map(claim => ({
                id: claim.id,
                canonicalObjectKind: claim.canonicalObjectKind,
                executionCaseCount: claim.executionCases.length,
                hasOwnerExecutionProof: claim.proofIds.some(proofId =>
                    proofId.endsWith(":owner-execution")
                ),
            })),
        [{
            id: "bracket-paraphrase-not-structure",
            canonicalObjectKind: "documentary-translation-evidence",
            executionCaseCount: 0,
            hasOwnerExecutionProof: false,
        }]
    );

    s.eq(
        "mutating a Lesson 56 claim anchor breaks exact claim evidence independently of inventory counts",
        (() => {
            const claim = LESSON56_CLAIMS[0];
            const mutatedCanvasText = readCanvasText().replace(
                claim.anchor,
                "__forged_lesson56_claim_anchor__"
            );
            const audit = auditClassicalNahuatlLesson56Canvas(
                mutatedCanvasText
            );
            return {
                complete: audit.complete,
                claimCount: audit.claimCount,
                exactClaim: audit.claimEvidence.find(
                    evidence => evidence.id === claim.id
                )?.exact,
            };
        })(),
        {
            complete: false,
            claimCount: LESSON56_REQUIRED_RULE_IDS.length,
            exactClaim: false,
        }
    );

    s.eq(
        "mutating Lesson 56 Canvas evidence invalidates its source audit even when counts remain unchanged",
        (() => {
            const canvasText = readCanvasText();
            const mutatedCanvasText = canvasText.replace(
                "tiTemōc",
                "tiTemōx"
            );
            const audit = auditClassicalNahuatlLesson56Canvas(
                mutatedCanvasText
            );
            return {
                complete: audit.complete,
                formulaBearingLineCount: audit.formulaBearingLineCount,
                sourceHashMatches:
                    audit.sourceSha256 === audit.expectedSourceSha256,
            };
        })(),
        {
            complete: false,
            formulaBearingLineCount: 133,
            sourceHashMatches: false,
        }
    );

    s.eq(
        "mutating a cited Lesson 20 Canvas target changes evidence instead of preserving a relabeled fixture",
        (() => {
            const mutatedCanvasLines = canvasLines.slice();
            mutatedCanvasLines[6770] = mutatedCanvasLines[6770]
                .replace("(chihcha-lō)", "(FORGED-TARGET)");
            return lesson20Audit.extractLesson20CanvasCaseEvidence(
                lesson20Audit.LESSON20_NONACTIVE_EXAMPLES[0],
                mutatedCanvasLines
            ).exact;
        })(),
        false
    );

    s.eq(
        "the mandatory Lesson 20 audit contains no PDF-derived witness authority path",
        (() => {
            const source = fs.readFileSync(
                resolveLegacySupportPath(
                    "scripts/audit_classical_lesson20_nonactive_examples.js"
                ),
                "utf8"
            );
            return [
                "visualPdfWitness",
                "VISUALLY_CONFIRMED",
                "VISUALLY_REJECTED",
                "rendered PDF",
                "Andrews_Introduction_to_Classical_Nahuatl_693p_reOCR_squareZeroFixed.pdf",
            ].filter((token) => source.includes(token));
        })(),
        []
    );

    return s;
}

module.exports = { run };
