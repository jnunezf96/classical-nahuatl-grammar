"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson15_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson15-contradiction-audit.json"), "utf8"));
    const issueNormal = (stem, selections) => {
        const source = ctx.issueCanonicalNncSourceFrame({ stem });
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, selections);
        const operation = ctx.issueCanonicalNncOperationFrame(source, selections);
        const result = operation.authorizationStatus === "authorized"
            ? ctx.requestClassicalOrdinaryNncResult(source, operation)
            : null;
        return { source, selection, operation, result };
    };
    const untouched = issueNormal("tēuc", {
        state: "possessive", subject: "3pl", possessor: "1sg",
    });
    const natural = issueNormal("chān", {
        state: "possessive", subject: "3common", possessor: "1sg",
    });
    const naturalBlocked = issueNormal("chān", {
        state: "absolutive", subject: "3common",
    });
    const literalSun = issueNormal("tōnatiuh", {
        state: "possessive", subject: "3sg", possessor: "1sg",
    });
    const metaphoricalSun = issueNormal("tōnatiuh", {
        state: "possessive", subject: "3sg", possessor: "1sg",
        metaphoricalUse: true,
    });
    const fathom = issueNormal("māi", {
        state: "absolutive", subject: "3common",
        predicateFormation: "tl-2a-to-1a",
    });
    const question = issueNormal("cal", {
        state: "absolutive", subject: "3common",
        sentenceType: "yes-no-intonation",
    });
    const having = issueNormal("cal", {
        state: "possessive", subject: "3common", possessor: "3sg",
        sentenceType: "statement",
    });
    const cueLabels = (frame) => ctx.getClassicalFormulaDerivedAnnotations(
        frame.result.formulaRealization,
        frame.result.typedSlotFrame,
        frame.result,
    ).map((cue) => cue.label);
    const possessionPolicyInventory = [
        "pil", "chān", "āxcāi", "nān", "yāō", "poh",
        "yaca", "māi", "mix", "quiy-a-hui", "tōnatiuh",
    ].map((stem) => {
        const source = ctx.issueCanonicalNncSourceFrame({ stem });
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, {});
        return [
            stem,
            source.authorizationStatus,
            source.sourceClass,
            source.naturalPossessionPolicy,
            source.allowedStateValues,
            selection.nncState,
            selection.selectedAnimacy,
        ];
    });

    s.eq("Lesson 15 contradiction report is closed", {
        status: audit.status, resolved: audit.resolvedCount, unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length, authority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 13, unresolved: 0, resolutions: 13, authority: false });
    s.eq("boundary changes do not spread to an unrelated stem", {
        status: untouched.result.authorizationStatus,
        formula: untouched.result.formulaRealization,
        stemOperation: untouched.result.stemOperation.operation,
    }, {
        status: "authorized",
        formula: "#0-0+n-o(tēuc)hu-ān#",
        stemOperation: "regular",
    });
    s.eq("natural possession, literal restriction, and metaphorical exception remain distinct", {
        natural: [
            natural.selection.selectedAnimacy,
            natural.selection.stateValues,
            natural.result.surfaceRealization,
            cueLabels(natural).includes("natural possession"),
        ],
        naturalBlocked: [
            naturalBlocked.operation.authorizationStatus,
            naturalBlocked.operation.blockReason,
        ],
        literalSun: [
            literalSun.operation.authorizationStatus,
            literalSun.operation.blockReason,
        ],
        metaphoricalSun: [
            metaphoricalSun.result.formulaRealization,
            metaphoricalSun.result.surfaceRealization,
            cueLabels(metaphoricalSun).includes("exception"),
        ],
    }, {
        natural: ["nonanimate", ["possessive"], "nochān", true],
        naturalBlocked: ["blocked", "ordinary-nnc-state-not-lexically-authorized"],
        literalSun: ["blocked", "ordinary-nnc-state-not-lexically-authorized"],
        metaphoricalSun: ["#0-0+n-o(tōnatiuh)0-0#", "notōnatiuh", true],
    });
    s.eq("every Lesson 15 possession-policy nounstem has one consistent canonical default",
        possessionPolicyInventory, [
            ["pil", "authorized", "tli-1", "naturally-possessed", ["possessive"], "possessive", "animate"],
            ["chān", "authorized", "tli-1", "naturally-possessed", ["possessive"], "possessive", "nonanimate"],
            ["āxcāi", "authorized", "tl-2-a", "naturally-possessed", ["possessive"], "possessive", "nonanimate"],
            ["nān", "authorized", "tli-1", "naturally-possessed", ["possessive"], "possessive", "animate"],
            ["yāō", "authorized", "tl-1-a", "naturally-possessed", ["possessive"], "possessive", "animate"],
            ["poh", "authorized", "tli-1", "naturally-possessed", ["possessive"], "possessive", "animate"],
            ["yaca", "authorized", "tl-2-b-a", "naturally-possessed", ["possessive"], "possessive", "nonanimate"],
            ["māi", "authorized", "tl-2-a", "naturally-possessed", ["possessive"], "possessive", "nonanimate"],
            ["mix", "authorized", "tli-1", "never-possessive", ["absolutive"], "absolutive", "nonanimate"],
            ["quiy-a-hui", "authorized", "tl-2-b-i", "never-possessive", ["absolutive"], "absolutive", "nonanimate"],
            ["tōnatiuh", "authorized", "zero", "never-possessive", ["absolutive"], "absolutive", "animate"],
        ]);
    s.eq("derived noun policy does not collapse back into the source noun policy", {
        sourcePolicy: fathom.source.naturalPossessionPolicy,
        states: fathom.selection.stateValues,
        operation: fathom.result.stemOperation.operation,
        formula: fathom.result.formulaRealization,
        surface: fathom.result.surfaceRealization,
    }, {
        sourcePolicy: "naturally-possessed",
        states: ["absolutive", "possessive"],
        operation: "tl-2a-to-1a",
        formula: "#0-0(mā)tl-0#",
        surface: "mātl",
    });
    s.eq("sentence grammar consumes the complete NNC without changing its noun grammar", {
        question: [
            question.result.formulaRealization,
            question.result.sentenceFrame.sentenceFormulaDisplay,
            question.result.sentenceSurface,
        ],
        having: [
            having.result.stemOperation.operation,
            having.result.sentenceFrame.predicateKind,
            having.result.sentenceFrame.sentenceCompositionOperationId,
            having.result.sentenceSurface,
        ],
    }, {
        question: ["#0-0(cal)li-0#", "#0-0(cal)li-0#?", "Calli?"],
        having: ["regular", "equative", "nnc-sentence-composition", "Īcal."],
    });
    return s;
}

module.exports = { run };
