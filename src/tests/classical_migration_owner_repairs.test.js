"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function ledgerRecord(lesson, atomId) {
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        `docs/canvas-progress/lesson${lesson}-review-ledger.json`,
    ), "utf8"));
    return ledger.records.find((record) => record.atomId === atomId) || null;
}

function run(ctx = {}) {
    const s = createSuite("classical_migration_owner_repairs");
    const objectFrame =
        ctx.buildClassicalNahuatlObjectRelationshipValidationFrame();
    const derivationFrame =
        ctx.buildClassicalNahuatlVncDerivationValidationFrame();
    const exact = derivationFrame.constraints
        .goComeCausativeSuppletiveOnly;
    const missingHuallauh =
        ctx.buildClassicalNahuatlGoComeCausativeSuppletiveOnlyConstraint({
            ...derivationFrame.derivations,
            huallauh: {
                ...derivationFrame.derivations.huallauh,
                optionCount: 0,
                options: [],
            },
        });
    const extraYauh =
        ctx.buildClassicalNahuatlGoComeCausativeSuppletiveOnlyConstraint({
            ...derivationFrame.derivations,
            yauh: {
                ...derivationFrame.derivations.yauh,
                optionCount: 2,
                options: [
                    ...derivationFrame.derivations.yauh.options,
                    { ...derivationFrame.derivations.yauh.options[0] },
                ],
            },
        });

    s.eq("ichtequi projection is exact and non-authorizing", {
        valid: ctx.isClassicalNahuatlObjectRelationshipValidationFrame(
            objectFrame,
        ),
        status: objectFrame.constraints.ichtequiSpecificObjectOnly
            .authorizationStatus,
        intransitive: objectFrame.relationships.intransitive
            .authorizationStatus,
        specific: objectFrame.relationships["specific-projective"]
            .authorizationStatus,
        human: objectFrame.relationships["projective-human"].blockReason,
        nonhuman: objectFrame.relationships["projective-nonhuman"]
            .blockReason,
        grammar: Object.values(objectFrame.relationships).some(
            frame => frame.grammarGenerationAllowed,
        ),
    }, {
        valid: true,
        status: "authorized",
        intransitive: "authorized",
        specific: "authorized",
        human: "ich-tequi-nonspecific-object-not-authorized",
        nonhuman: "ich-tequi-nonspecific-object-not-authorized",
        grammar: false,
    });
    s.eq("go and come paired coordinate fails closed", {
        exact: exact.authorizationStatus,
        missing: missingHuallauh.authorizationStatus,
        extra: extraYauh.authorizationStatus,
    }, { exact: "authorized", missing: "blocked", extra: "blocked" });
    s.eq("factory links are exact proof metadata", {
        ichtequi: ledgerRecord(18, "ACI-P162-L002-9428A10C8E")
            ?.canonicalApplicationOperationIds || [],
        goCome: ledgerRecord(25, "ACI-P210-L009-E029824E95")
            ?.canonicalApplicationOperationIds || [],
    }, {
        ichtequi: ["vnc:application"],
        goCome: ["vnc:application"],
    });
    return s;
}

module.exports = { run };
