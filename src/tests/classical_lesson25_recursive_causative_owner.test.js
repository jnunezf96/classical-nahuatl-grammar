"use strict";

const { createSuite } = require("./runner");

function buildBaseCaquiSource(ctx) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame("caqui", {
        subject: "2sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
        perfectiveClass: "B",
        valence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
}

function buildFirstCausative(ctx) {
    const source = buildBaseCaquiSource(ctx);
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        source,
        { derivationType: "causative" },
    );
    const option = inventory.options.find(candidate => (
        candidate.derivationRoute
            === "type-two-tia-from-caqui-hua-internal-base"
    ));
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        source,
        {
            derivationType: "causative",
            optionId: option?.optionId || "",
            targetSubject: "1sg",
            causativeObjectKind: "specific-projective",
        },
    );
    const result = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        operation,
        {
            targetSubject: "1sg",
            mood: "indicative",
            tense: "present",
        },
    );
    return { source, inventory, option, operation, result };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_recursive_causative_owner");
    const first = buildFirstCausative(ctx);
    const firstFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(
        first.result,
    );
    const secondInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            first.result,
            { derivationType: "causative" },
        );
    const secondOption = secondInventory.options.find(candidate => (
        candidate.targetStem === "caqui-ti-l-tiā"
    ));
    const secondOperation =
        ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
            first.result,
            {
                derivationType: "causative",
                optionId: secondOption?.optionId || "",
                targetSubject: "3sg",
                causativeObjectKind: "specific-projective",
            },
        );
    const secondResult = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        first.result,
        secondOperation,
        {
            targetSubject: "3sg",
            mood: "indicative",
            tense: "present",
        },
    );
    const secondFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(
        secondResult,
    );

    s.eq(
        "§25.12 recursively consumes an owner-issued double-object causative",
        {
            sourceCanonical:
                ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                    first.source,
                ),
            firstOperationCanonical:
                ctx.isClassicalNahuatlVncDerivationOperationFrame(
                    first.operation,
                ),
            firstResultCanonical:
                ctx.isClassicalNahuatlDerivedVncMachineryFrame(first.result),
            firstFormula: firstFinite.formulaRealization,
            firstWritten: firstFinite.wordRealization,
            secondInventoryCanonical:
                ctx.isClassicalNahuatlVncDerivationOptionInventory(
                    secondInventory,
                ),
            secondTarget: secondOption?.targetStem || "",
            secondOperationCanonical:
                ctx.isClassicalNahuatlVncDerivationOperationFrame(
                    secondOperation,
                ),
            participantHistory:
                secondOperation.targetObjectRequests.map(request => [
                    request.objectKind,
                    request.objectPerson,
                    request.governor,
                    request.derivationalLevel,
                ]),
            secondResultCanonical:
                ctx.isClassicalNahuatlDerivedVncMachineryFrame(secondResult),
            secondFiniteCanonical:
                ctx.isClassicalNahuatlVncFiniteSurfaceFrame(secondFinite),
            secondFormula: secondFinite.formulaRealization,
            secondWritten: secondFinite.wordRealization,
            formulaIndependent:
                secondFinite.formulaDerivedFromWrittenProjection === false,
            writtenIndependent:
                secondFinite.writtenDerivedFromFormulaProjection === false,
        },
        {
            sourceCanonical: true,
            firstOperationCanonical: true,
            firstResultCanonical: true,
            firstFormula: "#ni-0+m-itz+⎕-0(caqui-tia)0+0-0#",
            firstWritten: "nimitzcaquitia",
            secondInventoryCanonical: true,
            secondTarget: "caqui-ti-l-tiā",
            secondOperationCanonical: true,
            participantHistory: [
                ["specific-projective", "3sg", "directive", 1],
                ["specific-projective", "2sg", "causative", 2],
                ["specific-projective", "1sg", "causative", 3],
            ],
            secondResultCanonical: true,
            secondFiniteCanonical: true,
            secondFormula:
                "#0-0+n-ēch+⎕-⎕+⎕-0(caqui-ti-l-tia)0+0-0#",
            secondWritten: "nēchcaquitiltia",
            formulaIndependent: true,
            writtenIndependent: true,
        },
    );

    const rawShapes = ["caqui-tiā", "caquī-tiā"].map(stem => {
        const lower = ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            verbClass: "C",
            perfectiveClass: "C",
            valence: "specific-projective",
            transitivity: "transitive",
            objectKind: "specific-projective",
            objectPerson: "3sg",
        });
        const raw = ctx.buildClassicalNahuatlMultipleObjectVncFrame(
            lower,
            {
                objectRequests: [
                    {
                        objectId: "source-object-1",
                        objectKind: "specific-projective",
                        objectPerson: "3sg",
                        governor: "directive",
                        derivationalLevel: 1,
                    },
                    {
                        objectId: "causative-object",
                        objectKind: "specific-projective",
                        objectPerson: "2sg",
                        governor: "causative",
                        derivationalLevel: 2,
                    },
                ],
            },
        );
        const rawInventory =
            ctx.getClassicalNahuatlVncDerivationOptionInventory(
                raw,
                { derivationType: "causative" },
            );
        return {
            stem,
            sourceAccepted:
                ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(raw),
            recursiveOptions: rawInventory.options.length,
        };
    });
    const copiedFirstResult = { ...first.result };
    const copiedInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            copiedFirstResult,
            { derivationType: "causative" },
        );
    const forgedFirstResult = {
        ...first.result,
        canonicalSignature: first.result.canonicalSignature,
        derivationOperationFrame: {
            ...first.operation,
            targetStem: "caqui-tiā",
        },
    };
    const forgedInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            forgedFirstResult,
            { derivationType: "causative" },
        );

    s.eq(
        "shape, copies, and forged prior operations cannot authorize recursion",
        {
            rawShapes,
            copiedSourceCanonical:
                ctx.isClassicalNahuatlDerivedVncMachineryFrame(
                    copiedFirstResult,
                ),
            copiedInventoryStatus: copiedInventory.authorizationStatus,
            copiedInventoryOptions: copiedInventory.options.length,
            forgedSourceCanonical:
                ctx.isClassicalNahuatlDerivedVncMachineryFrame(
                    forgedFirstResult,
                ),
            forgedInventoryStatus: forgedInventory.authorizationStatus,
            forgedInventoryOptions: forgedInventory.options.length,
        },
        {
            rawShapes: [
                {
                    stem: "caqui-tiā",
                    sourceAccepted: true,
                    recursiveOptions: 0,
                },
                {
                    stem: "caquī-tiā",
                    sourceAccepted: true,
                    recursiveOptions: 0,
                },
            ],
            copiedSourceCanonical: false,
            copiedInventoryStatus: "blocked",
            copiedInventoryOptions: 0,
            forgedSourceCanonical: false,
            forgedInventoryStatus: "blocked",
            forgedInventoryOptions: 0,
        },
    );

    return s;
}

module.exports = { run };
