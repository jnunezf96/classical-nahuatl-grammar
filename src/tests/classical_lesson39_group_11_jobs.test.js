"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-root-stock-foundation";

function rootStock(ctx, sourceStem, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "root-or-stock",
        ...(fields.allomorph
            ? { rootStockAllomorph: fields.allomorph }
            : {}),
        source: {
            sourceStage: "root-or-stock",
            sourceStem,
            verbClass: fields.verbClass || "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3common",
        state: fields.state || "absolutive",
        possessor: fields.possessor || "",
        animacy: "nonanimate",
    });
}

function frameOf(result) {
    return result.operationFrame?.rootStockPatientiveFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_11_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    s.eq("accepted group has the exact atom-job denominator", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
    }, { atoms: 66, writing: 27, reading: 39, accepted: true });

    const anger = rootStock(ctx, "cual-ā-ni");
    const angerFrame = frameOf(anger);
    s.eq("a witnessed ni stock follows the typed structural rule", {
        status: anger.authorizationStatus,
        reason: anger.blockReason,
        source: angerFrame?.sourceStem,
        kind: angerFrame?.stockKind,
        base: angerFrame?.stockBase,
        vowel: [angerFrame?.stockFormativeVowel,
            angerFrame?.stockFormativeShorteningApplied],
        allomorph: [angerFrame?.availableAllomorphs,
            angerFrame?.selectedAllomorph,
            angerFrame?.allomorphChoiceRequired],
        target: [angerFrame?.targetStem, angerFrame?.nounClass],
        formula: anger.formulaRealization,
        word: anger.wordSurface,
    }, {
        status: "authorized",
        reason: "",
        source: "cual-ā-ni",
        kind: "ni-stock",
        base: "cual-a",
        vowel: ["ā", true],
        allomorph: [["x"], "x", false],
        target: ["cual-a-x", "tli"],
        formula: "#0-0(cual-a-x)tli-0#",
        word: "cualaxtli",
    });

    const unknown = rootStock(ctx, "zom-ā-ni");
    const unlisted = rootStock(ctx, "zom-ā-ni", { allomorph: "z" });
    const unlistedFrame = frameOf(unlisted);
    s.eq("an unlisted ni stock requests only its genuine lexical choice", {
        first: [unknown.authorizationStatus, unknown.blockReason],
        status: unlisted.authorizationStatus,
        kind: unlistedFrame?.stockKind,
        base: unlistedFrame?.stockBase,
        options: unlistedFrame?.availableAllomorphs,
        selected: unlistedFrame?.selectedAllomorph,
        required: unlistedFrame?.allomorphChoiceRequired,
        short: unlistedFrame?.stockFormativeShorteningApplied,
        target: unlistedFrame?.targetStem,
        formula: unlisted.formulaRealization,
        productive:
            unlistedFrame?.compatibleUnlistedTypedSourcesRemainProductive,
        exampleGate: unlistedFrame?.exampleMembershipRequired,
    }, {
        first: ["blocked", "39.4-root-stock-allomorph-choice-required"],
        status: "authorized",
        kind: "ni-stock",
        base: "zom-a",
        options: ["c", "ch", "x", "z"],
        selected: "z",
        required: true,
        short: true,
        target: "zom-a-z",
        formula: "#0-0(zom-a-z)tli-0#",
        productive: true,
        exampleGate: false,
    });

    const unlistedInventory =
        ctx.getClassicalNahuatlRootStockPatientiveInventory({
            sourceStem: "zom-ā-ni",
            sourceStage: "root-or-stock",
        });
    const noShapeInventory =
        ctx.getClassicalNahuatlRootStockPatientiveInventory({
            sourceStem: "cuē",
            sourceStage: "root-or-stock",
        });
    s.eq("the live control receives the same structural choice inventory", {
        status: unlistedInventory.authorizationStatus,
        source: unlistedInventory.sourceStem,
        kind: unlistedInventory.stockKind,
        base: unlistedInventory.stockBase,
        options: unlistedInventory.availableAllomorphs,
        default: unlistedInventory.defaultAllomorph,
        required: unlistedInventory.choiceRequired,
        exampleGate: unlistedInventory.exampleMembershipRequired,
        authority: [unlistedInventory.grammarAuthority,
            unlistedInventory.formulaStringAuthority,
            unlistedInventory.surfaceStringAuthority],
        blocked: [noShapeInventory.authorizationStatus,
            noShapeInventory.blockReason],
    }, {
        status: "authorized",
        source: "zom-ā-ni",
        kind: "ni-stock",
        base: "zom-a",
        options: ["c", "ch", "x", "z"],
        default: "",
        required: true,
        exampleGate: false,
        authority: [false, false, false],
        blocked: ["blocked",
            "39.4-root-stock-source-not-lexically-authorized"],
    });

    const caUnknown = rootStock(ctx, "zo-zom-a-ca");
    const caStock = rootStock(ctx, "zo-zom-a-ca", { allomorph: "h" });
    const caFrame = frameOf(caStock);
    s.eq("a typed ca replacement stock keeps its fuller Source", {
        first: [caUnknown.authorizationStatus, caUnknown.blockReason],
        status: caStock.authorizationStatus,
        kind: caFrame?.stockKind,
        base: caFrame?.stockBase,
        options: caFrame?.availableAllomorphs,
        selected: caFrame?.selectedAllomorph,
        target: caFrame?.targetStem,
        formula: caStock.formulaRealization,
    }, {
        first: ["blocked", "39.4-root-stock-allomorph-choice-required"],
        status: "authorized",
        kind: "ca-replacement-stock",
        base: "zo-zom-a",
        options: ["c", "ch", "h"],
        selected: "h",
        target: "zo-zom-a-h",
        formula: "#0-0(zo-zom-a-h)tli-0#",
    });

    const fusedNeedsChoice = rootStock(ctx, "pō-ni");
    const smoke = rootStock(ctx, "pō-ni", { allomorph: "ch" });
    const smokeFrame = frameOf(smoke);
    s.eq("a fused root keeps long vowel quantity and its real alternative", {
        first: [fusedNeedsChoice.authorizationStatus,
            fusedNeedsChoice.blockReason],
        status: smoke.authorizationStatus,
        base: smokeFrame?.stockBase,
        short: smokeFrame?.stockFormativeShorteningApplied,
        options: smokeFrame?.availableAllomorphs,
        selected: smokeFrame?.selectedAllomorph,
        target: smokeFrame?.targetStem,
        formula: smoke.formulaRealization,
    }, {
        first: ["blocked", "39.4-root-stock-allomorph-choice-required"],
        status: "authorized",
        base: "pō",
        short: false,
        options: ["c", "ch"],
        selected: "ch",
        target: "pō-ch",
        formula: "#0-0(pō-ch)tli-0#",
    });

    const wrongKnown = rootStock(ctx, "cual-ā-ni", { allomorph: "c" });
    const noShape = rootStock(ctx, "cuē", { allomorph: "c" });
    s.eq("documented restrictions and structural admission fail independently", {
        known: [wrongKnown.authorizationStatus, wrongKnown.blockReason],
        shape: [noShape.authorizationStatus, noShape.blockReason],
        authority: [angerFrame?.witnessedFactSuppliesDefaultButDoesNotAuthorizeRoute,
            angerFrame?.lexicalMeaningDerivedFromShape,
            angerFrame?.copiedFormulaOrSurfaceAuthorityAccepted],
    }, {
        known: ["blocked",
            "39.4-root-stock-allomorph-not-lexically-authorized"],
        shape: ["blocked", "39.4-root-stock-source-not-lexically-authorized"],
        authority: [true, false, false],
    });

    const possessive = rootStock(ctx, "cual-ā-ni", {
        state: "possessive", possessor: "3sg",
    });
    s.eq("ordinary NNC state applies after root-stock formation", {
        status: possessive.authorizationStatus,
        target: frameOf(possessive)?.targetStem,
        state: possessive.canonicalResult?.state,
        formula: possessive.formulaRealization,
    }, {
        status: "authorized",
        target: "cual-a-x",
        state: "possessive",
        formula: "#0-0+ī-0(cual-a-x)0-0#",
    });

    const cues = [anger, unlisted, caStock, smoke].flatMap(result => (
        ctx.getClassicalFormulaDerivedAnnotations(
            result.formulaRealization,
            result.canonicalResult?.nncSlotFrame,
            result
        )
    )).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { atoms: 66, writing: 27, reading: 39,
        cues: true, covered: true });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }
    return s;
}

module.exports = { run };
