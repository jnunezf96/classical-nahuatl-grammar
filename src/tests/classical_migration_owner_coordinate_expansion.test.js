"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function ledgerOperations(lesson, atomId) {
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        `docs/canvas-progress/lesson${lesson}-review-ledger.json`,
    ), "utf8"));
    const record = ledger.records.find(candidate => candidate.atomId === atomId);
    return record?.canonicalApplicationOperationIds || [];
}

function run(ctx = {}) {
    const s = createSuite("classical_migration_owner_coordinate_expansion");
    const derivation =
        ctx.buildClassicalNahuatlVncDerivationValidationFrame();
    const compound = ctx.buildClassicalNahuatlCompoundValidationFrame();
    const affective = ctx.buildClassicalNahuatlAffectiveNncValidationFrame();

    const pinahuaCounterfactual =
        ctx.buildClassicalNahuatlPinahuaSourceClassVariationConstraint({
            classA: {
                authorizationStatus: "authorized",
                sourceStem: "pīn-ā-hua",
                classId: "A",
            },
            classB: {
                authorizationStatus: "authorized",
                sourceStem: "pīn-ā-hua",
                classId: "B",
            },
            perfectiveByClass: {
                A: {
                    imperfectiveStem: "pīn-ā-hua",
                    perfectiveStem: "pīn-ā-hua",
                },
                B: {
                    imperfectiveStem: "pīn-ā-hua",
                    perfectiveStem: "pīn-ā-hua",
                },
            },
        });
    const carryCounterfactual =
        ctx.buildClassicalNahuatlHuitzCarryConnectivelessConstraint({
            ...compound.contract.typedCarryConstruction,
            itquiShape: "",
        });
    const cahua = compound.cases.sharedObjectMatrices.cāhua;
    const cahuaCounterfactual =
        ctx.buildClassicalNahuatlCahuaSharedObjectMatrixConstraint({
            matrixCase: {
                ...cahua,
                facts: {
                    ...cahua.facts,
                    matrixReadingOptions: ["leave-shared-object-behind"],
                },
            },
            sharedObjectCoreferenceAuthority:
                compound.contract.sharedObjectCoreferenceAuthority,
            sharedObjectCarrierAuthority:
                compound.contract.sharedObjectCarrierAuthority,
        });
    const tzin = affective.cases.base;
    const tonCounterfactual =
        ctx.buildClassicalNahuatlTonTzinSemanticContrastConstraint({
            tonCase: affective.cases.tzinTonClass,
            tzinCase: {
                ...tzin,
                tzinMatrix: {
                    ...tzin.tzinMatrix,
                    availableMeanings: tzin.tzinMatrix.availableMeanings
                        .filter(value => value !== "affection"),
                },
            },
        });

    s.eq("four exact owner coordinates authorize", {
        pinahua: derivation.constraints.pinahuaSourceClassVariation
            .authorizationStatus,
        pinahuaClasses:
            derivation.constraints.pinahuaSourceClassVariation.sourceClasses,
        pinahuaPerfectives:
            derivation.constraints.pinahuaSourceClassVariation
                .perfectiveByClass,
        carry: compound.constraints.huitzCarryConnectiveless
            .authorizationStatus,
        carryValues: {
            huica: compound.constraints.huitzCarryConnectiveless.huicaShape,
            itqui: compound.constraints.huitzCarryConnectiveless.itquiShape,
            itquiFinite:
                compound.constraints.huitzCarryConnectiveless.itquiFiniteShape,
            perfective:
                compound.constraints.huitzCarryConnectiveless.matrixPerfective,
            connective:
                compound.constraints.huitzCarryConnectiveless
                    .connectiveProhibited,
        },
        cahua: compound.constraints.cahuaSharedObjectMatrix
            .authorizationStatus,
        cahuaReadings:
            compound.constraints.cahuaSharedObjectMatrix.matrixReadingOptions,
        ton: affective.constraints.tonTzinSemanticContrast
            .authorizationStatus,
        tonMeaning:
            affective.constraints.tonTzinSemanticContrast.tōn.selectedMeaning,
        tzinAffection:
            affective.constraints.tonTzinSemanticContrast.tzin
                .affectionAvailable,
    }, {
        pinahua: "authorized",
        pinahuaClasses: ["A", "B"],
        pinahuaPerfectives: { A: "pīn-ā-hua", B: "pīn-ā-uh" },
        carry: "authorized",
        carryValues: {
            huica: "huica-tz",
            itqui: "itqui-tz",
            itquiFinite: "tqui-tz",
            perfective: "itz",
            connective: true,
        },
        cahua: "authorized",
        cahuaReadings: [
            "leave-shared-object-in-a-condition",
            "leave-shared-object-behind",
        ],
        ton: "authorized",
        tonMeaning: "smallness-without-admiration-or-affection",
        tzinAffection: true,
    });

    s.eq("counterfactual owner coordinates fail closed", {
        pinahua: pinahuaCounterfactual.authorizationStatus,
        carry: carryCounterfactual.authorizationStatus,
        cahua: cahuaCounterfactual.authorizationStatus,
        ton: tonCounterfactual.authorizationStatus,
    }, {
        pinahua: "blocked",
        carry: "blocked",
        cahua: "blocked",
        ton: "blocked",
    });

    s.eq("only the uniquely proven public operation is linked", {
        pinahua: ledgerOperations(24, "ACI-P205-L003-5DAFC37350"),
        carry: ledgerOperations(28, "ACI-P256-L004-0D0DF7FE9D"),
        cahua: ledgerOperations(28, "ACI-P263-L019-E197EB0CC2"),
        ton: ledgerOperations(32, "ACI-P306-L016-3182248C30"),
    }, {
        pinahua: [],
        carry: [],
        cahua: [],
        ton: ["grammar:nominal-construction"],
    });
    return s;
}

module.exports = { run };
