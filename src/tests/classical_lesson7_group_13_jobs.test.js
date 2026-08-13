"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson7_group_13_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson7-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter((record) => record.reviewGroupId === "lesson7-tla-fusion");
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");
    const base = Object.freeze({
        valence: "projective-nonhuman",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass: "A",
    });
    const build = (stem, options = {}) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, { ...base, ...options });
    const project = (frame) => {
        const rule = frame.tlaFusionRuleFrame;
        return Object.freeze({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            analysis: rule.selectedTlaFusionAnalysisKind,
            fused: rule.fused,
            sourceStem: rule.sourceStemVariant,
            derivedStem: rule.derivedStem,
            objectSlot: rule.objectSlotAfterFusion,
            buildKind: rule.tlaFusionBuildKind,
            buildLogic: rule.tlaFusionBuildLogic,
            embed: rule.tlaFusionBuildEmbedStem,
            matrix: rule.tlaFusionBuildMatrixStem,
            segment: rule.tlaFusionBuildSegment,
            boundary: rule.adverbBoundaryDecision,
            resultingValence: rule.resultingValence || "",
            contradiction: rule.tlaFusionContradictionReason,
        });
    };

    const unfused = project(build("(huel-mati)", { tlaFusion: false }));
    const fused = project(build("(huel-mati)", {
        tlaFusion: true,
        sourceSelectionKind: "embed-matrix",
        sourceEmbedStem: "huel",
        sourceMatrixStem: "mati",
        incorporatedAdverb: "huel",
        adverbPosition: "before-tla",
    }));
    const matrixFusion = project(build("(chiya)", { verbClass: "B", tlaFusion: true }));
    const contradictory = project(build("(huel-mati)", {
        tlaFusion: true,
        sourceSelectionKind: "embed-matrix",
        sourceEmbedStem: "huel",
        sourceMatrixStem: "mati",
        incorporatedAdverb: "huel",
        adverbPosition: "before-tla",
        hostileTlaFusionAnalysis: "unfused-transitive-tla-object",
    }));

    s.eq("typed source structure selects the exact tla analysis and Result", {
        unfused,
        fused,
        matrixFusion,
        contradictory,
    }, {
        unfused: {
            status: "authorized", formula: "#ni-0+tla(huel-mati)0+0-0#",
            analysis: "unfused-transitive-tla-object", fused: false,
            sourceStem: "huel-mati", derivedStem: "", objectSlot: "tla",
            buildKind: "", buildLogic: "", embed: "", matrix: "", segment: "",
            boundary: "", resultingValence: "", contradiction: "",
        },
        fused: {
            status: "authorized", formula: "#ni-0(huel-la-mati)0+0-0#",
            analysis: "fused-derived-intransitive", fused: true,
            sourceStem: "huel-mati", derivedStem: "huel-la-mati", objectSlot: "none",
            buildKind: "embed-matrix-plus-tla-fusion", buildLogic: "embed + fused-tla + matrix",
            embed: "huel", matrix: "mati", segment: "la",
            boundary: "typed-embed-matrix-context-builds-tla-fusion", resultingValence: "", contradiction: "",
        },
        matrixFusion: {
            status: "authorized", formula: "#ni-0(tla-chiya)0+0-0#",
            analysis: "fused-derived-intransitive", fused: true,
            sourceStem: "chiya", derivedStem: "tla-chiya", objectSlot: "none",
            buildKind: "matrix-plus-tla-fusion", buildLogic: "tla + matrix",
            embed: "", matrix: "chiya", segment: "tla",
            boundary: "typed-matrix-builds-tla-fusion", resultingValence: "", contradiction: "",
        },
        contradictory: {
            status: "blocked", formula: "", analysis: "fused-derived-intransitive", fused: true,
            sourceStem: "huel-mati", derivedStem: "huel-la-mati", objectSlot: "none",
            buildKind: "embed-matrix-plus-tla-fusion", buildLogic: "embed + fused-tla + matrix",
            embed: "huel", matrix: "mati", segment: "la",
            boundary: "typed-embed-matrix-context-builds-tla-fusion", resultingValence: "",
            contradiction: "requested-tla-fusion-analysis-contradicts-typed-operation",
        },
    });

    const receiptByAtom = new Map([
        ["ACI-P086-L015-81AD0E5E7C", [unfused, fused]],
        ["ACI-P086-L017-E9D7702D11", fused],
        ["ACI-P086-L019-7E6A7560AB-03", fused],
        ["ACI-P086-L019-7E6A7560AB-04", [unfused.formula, fused.formula]],
        ["ACI-P086-L025-CD621F315E", unfused],
        ["ACI-P086-L025-CD621F315E-02", fused],
        ["ACI-P086-L025-CD621F315E-04", [unfused.status, fused.status]],
        ["ACI-P086-L029-A115934947", [fused.boundary, fused.formula]],
        ["ACI-P086-L029-FEF4AF9630", [fused.embed, fused.segment, fused.matrix]],
        ["ACI-P086-L034-7F79A0347A", fused.derivedStem],
    ]);
    const brokenByAtom = new Map([
        ["ACI-P086-L015-81AD0E5E7C", [unfused, unfused]],
        ["ACI-P086-L017-E9D7702D11", unfused],
        ["ACI-P086-L019-7E6A7560AB-03", unfused],
        ["ACI-P086-L019-7E6A7560AB-04", [unfused.formula, unfused.formula]],
        ["ACI-P086-L025-CD621F315E", fused],
        ["ACI-P086-L025-CD621F315E-02", unfused],
        ["ACI-P086-L025-CD621F315E-04", [unfused.status, contradictory.status]],
        ["ACI-P086-L029-A115934947", [unfused.boundary, unfused.formula]],
        ["ACI-P086-L029-FEF4AF9630", [fused.segment, fused.embed, fused.matrix]],
        ["ACI-P086-L034-7F79A0347A", matrixFusion.derivedStem],
    ]);

    s.eq("accepted Lesson 7 Group 13 covers every reviewed atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
    }, { records: 26, unique: 26, writing: 10 });
    for (const record of writingRecords) {
        const exact = receiptByAtom.get(record.atomId);
        const broken = brokenByAtom.get(record.atomId);
        s.ok(`${record.atomId} performs its accepted tla-fusion job`, exact !== undefined);
        s.no(`${record.atomId} fails when its exact tla-fusion behavior is broken`,
            JSON.stringify(exact) === JSON.stringify(broken));
    }
    return s;
}

module.exports = { run };
