"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function reviewPlan(lesson) {
    return JSON.parse(fs.readFileSync(path.join(
        ROOT,
        `docs/canvas-progress/lesson${lesson}-review-plan.json`,
    ), "utf8"));
}

function operationIds(lesson, groupId, atomId) {
    const group = reviewPlan(lesson).groups.find(item => item.groupId === groupId);
    return group?.canonicalApplicationOperationIdsByAtomId?.[atomId] || [];
}

function run(ctx = {}) {
    const s = createSuite("classical_late_migration_owner_repairs");
    const affective = ctx.buildClassicalNahuatlAffectiveNncValidationFrame();
    const relational = ctx.buildClassicalRelationalNncValidationFrame();
    const locative = ctx.buildClassicalLocativeRelationalNncValidationFrame();
    const continuation = ctx.buildClassicalRelationalContinuationValidationFrame();
    const place = ctx.buildClassicalPlaceGentilicValidationFrame();

    s.eq("all nine late owner projections cover their exact branches", {
        attitude: affective.constraints.denominalAttitudeRestrictionPair
            .authorizationStatus,
        tlah: locative.constraints.tlahAffectiveFinalCoPair
            .authorizationStatus,
        icpac: continuation.constraints.icpacAffectiveFinalCoPair
            .authorizationStatus,
        panCan: place.constraints.panCanGentilicPair.authorizationStatus,
        manTlan: place.constraints.manTlanGentilicPair.authorizationStatus,
        huanYolqui: relational.constraints
            .huanYolquiAbsolutiveLexicalization.authorizationStatus,
        techMatrices: continuation.constraints.techEmbedPaCopaMatrixPair
            .authorizationStatus,
        tlanNested: continuation.constraints.tlanNestedBodypartMatrixChoice
            .authorizationStatus,
        tlanLan: place.constraints.tlanLanGentilicVariantPair
            .authorizationStatus,
    }, {
        attitude: "authorized",
        tlah: "authorized",
        icpac: "authorized",
        panCan: "authorized",
        manTlan: "authorized",
        huanYolqui: "authorized",
        techMatrices: "authorized",
        tlanNested: "authorized",
        tlanLan: "authorized",
    });

    const missingPol = ctx.buildClassicalDenominalAttitudeRestrictionPair({
        ...affective.blockedCases,
        freePolDenominal: null,
    });
    const mergedAttitude = ctx.buildClassicalDenominalAttitudeRestrictionPair({
        ...affective.blockedCases,
        freePolDenominal: {
            ...affective.blockedCases.freePolDenominal,
            blockReason: affective.blockedCases.freeTzinDenominal.blockReason,
        },
    });
    const missingTlahTon = ctx.buildClassicalTlahAffectiveFinalCoPair({
        ...locative.cases,
        tlahAffectivePejorative: null,
    });
    const mergedTlah = ctx.buildClassicalTlahAffectiveFinalCoPair({
        ...locative.cases,
        tlahAffectivePejorative: locative.cases.tlahAffective,
    });
    const missingIcpacTon = ctx.buildClassicalIcpacAffectiveFinalCoPair({
        ...continuation.cases,
        icpacAffectivePejorative: null,
    });
    const mergedIcpac = ctx.buildClassicalIcpacAffectiveFinalCoPair({
        ...continuation.cases,
        icpacAffectivePejorative: continuation.cases.icpacAffective,
    });
    const missingCan = ctx.buildClassicalPanCanGentilicPair({
        ...place.cases,
        canMecaGentilic: null,
    });
    const brokenCan = ctx.buildClassicalPanCanGentilicPair({
        ...place.cases,
        canMecaGentilic: {
            ...place.cases.canMecaGentilic,
            boundaryRule: place.cases.panEcaGentilic.boundaryRule,
        },
    });
    const missingTlan = ctx.buildClassicalManTlanGentilicPair({
        ...place.cases,
        tlanGentilic: null,
    });
    const brokenMan = ctx.buildClassicalManTlanGentilicPair({
        ...place.cases,
        manGentilic: {
            ...place.cases.manGentilic,
            boundaryRule: place.cases.tlanGentilic.boundaryRule,
        },
    });
    s.eq("paired owner projections fail closed under one-value mutations", {
        missingPol: missingPol.authorizationStatus,
        mergedAttitude: mergedAttitude.authorizationStatus,
        missingTlahTon: missingTlahTon.authorizationStatus,
        mergedTlah: mergedTlah.authorizationStatus,
        missingIcpacTon: missingIcpacTon.authorizationStatus,
        mergedIcpac: mergedIcpac.authorizationStatus,
        missingCan: missingCan.authorizationStatus,
        brokenCan: brokenCan.authorizationStatus,
        missingTlan: missingTlan.authorizationStatus,
        brokenMan: brokenMan.authorizationStatus,
    }, {
        missingPol: "blocked",
        mergedAttitude: "blocked",
        missingTlahTon: "blocked",
        mergedTlah: "blocked",
        missingIcpacTon: "blocked",
        mergedIcpac: "blocked",
        missingCan: "blocked",
        brokenCan: "blocked",
        missingTlan: "blocked",
        brokenMan: "blocked",
    });

    s.eq("only the five executed coordinates receive public operation metadata", {
        attitude: operationIds(
            32,
            "lesson32-zol-matrix-recursion-and-denominal-continuation",
            "ACI-P307-L015-2F2FCC135F",
        ),
        tlah: operationIds(
            46,
            "lesson46-tlah-abundance-place",
            "ACI-P478-L035-2675499655",
        ),
        icpac: operationIds(
            47,
            "lesson47-ca-icpac-options-one-three",
            "ACI-P495-L039-7FD7E5C93C",
        ),
        panCan: operationIds(
            48,
            "lesson48-gentilic-extensions",
            "ACI-P520-L022-1C0DB88DAE",
        ),
        manTlan: operationIds(
            48,
            "lesson48-gentilic-extensions",
            "ACI-P522-L018-F443DF0356",
        ),
    }, {
        attitude: ["grammar:nominal-construction"],
        tlah: ["nnc:relational"],
        icpac: ["nnc:relational"],
        panCan: ["nnc:place-gentilic"],
        manTlan: ["nnc:place-gentilic"],
    });

    const ownerCases = [
        {
            prefix: "ClassicalHuanYolquiAbsolutiveLexicalization",
            domain: "classical-huan-yolqui-absolutive-lexicalization",
            selection: "claim-p4284",
            facet: "p4284-because-of-the-frequent-juxtaposition-of-hua-n-and",
            path: "constraints.huanYolquiAbsolutiveLexicalization",
        },
        {
            prefix: "ClassicalTechEmbedPaCopaMatrices",
            domain: "classical-tech-embed-pa-copa-matrices",
            selection: "claim-p4502",
            facet: "p4502-the-stem-tech-tli-can-serve-as-an-embed",
            path: "constraints.techEmbedPaCopaMatrixPair",
        },
        {
            prefix: "ClassicalTlanNestedBodypartMatrixChoice",
            domain: "classical-tlan-nested-bodypart-matrix-choice",
            selection: "claim-p4508",
            facet: "p4508-the-tlan-can-also-embed-a-compound-stem-that",
            path: "constraints.tlanNestedBodypartMatrixChoice",
        },
        {
            prefix: "ClassicalTlanLanGentilicVariantPair",
            domain: "classical-tlan-lan-gentilic-variant-pair",
            selection: "claim-p4636",
            facet: "p4636-in-tla-n-and-its-variant-la-n-the",
            path: "constraints.tlanLanGentilicVariantPair",
        },
    ];
    const ownerResults = ownerCases.map((item) => {
        const source = ctx[`build${item.prefix}Source`]({
            analysisDomain: item.domain,
            selection: item.selection,
            requestedFacet: item.facet,
            participantChoice: `${item.selection}:${item.facet}`,
        });
        const result = ctx[`evaluate${item.prefix}`](source);
        const evidence = ctx[`get${item.prefix}ExecutionEvidence`](result);
        return {
            owner: item.domain,
            status: result.authorizationStatus,
            exactPath: result.payload.effectiveCanonicalPath,
            exactObservation: result.payload.proofObservationKind,
            branchCount: Array.isArray(result.payload.facetValue?.branches)
                ? result.payload.facetValue.branches.length
                : Object.keys(result.payload.facetValue?.branches || {}).length,
            valid: ctx[`is${item.prefix}Result`](result)
                && ctx[`is${item.prefix}ExecutionEvidence`](evidence, result),
            copiedSourceBlocked:
                ctx[`evaluate${item.prefix}`]({ ...source })
                    .authorizationStatus === "blocked",
        };
    });
    s.eq("the four former prerequisites are exact executable owners", {
        statuses: ownerResults.map(item => item.status),
        paths: ownerResults.map(item => item.exactPath),
        observations: ownerResults.map(item => item.exactObservation),
        branchCounts: ownerResults.map(item => item.branchCount),
        valid: ownerResults.every(item => item.valid),
        copiedSourcesBlocked:
            ownerResults.every(item => item.copiedSourceBlocked),
    }, {
        statuses: ["authorized", "authorized", "authorized", "authorized"],
        paths: ownerCases.map(item => item.path),
        observations: [
            "direct-canonical-result-observation",
            "direct-canonical-result-observation",
            "direct-canonical-result-observation",
            "direct-canonical-result-observation",
        ],
        branchCounts: [2, 2, 2, 2],
        valid: true,
        copiedSourcesBlocked: true,
    });

    return s;
}

module.exports = { run };
