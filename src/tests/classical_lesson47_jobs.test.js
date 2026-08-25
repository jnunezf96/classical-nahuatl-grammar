"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson47_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson47-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§47(?:\.|$)/u.test(atom[field.canvasSection])
    ));
    const grammarAtoms = atoms.filter(atom => (
        atom[field.force] === "grammar-bearing"
    ));
    const writingRoles = new Set([
        "canonical-rule-or-alternation",
        "applicability-or-constraint",
        "derived-realization",
        "source-structure-schema",
        "result-projection",
    ]);
    const writing = grammarAtoms.filter(atom => (
        writingRoles.has(atom[field.projectRole])
    ));
    const groupBySection = new Map(plan.groups.flatMap(group => (
        group.sections.map(section => [section, group])
    )));

    s.eq("Lesson 47 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => (
            !groupBySection.has(atom[field.canvasSection])
        )).map(atom => atom[field.atomId]),
    }, {
        atoms: 803,
        grammar: 477,
        writing: 380,
        readingOnly: 423,
        sections: plan.groups.flatMap(group => group.sections),
        unmapped: [],
    });

    const ownerIds = [...new Set(grammarAtoms.map(
        atom => atom[field.semanticOwnerId]
    ))].sort();
    const ownerObservations = ownerIds.map(ownerId => {
        const ownerAtoms = grammarAtoms.filter(atom => (
            atom[field.semanticOwnerId] === ownerId
        ));
        const ownerPath = ownerAtoms[0][field.semanticOwnerReference];
        const sourceText = fs.readFileSync(path.join(ROOT, ownerPath), "utf8");
        const spec = JSON.parse(sourceText.match(
            /const spec = (\{[\s\S]*\});\nexport default/u
        )[1]);
        const results = Object.keys(spec.coordinates).map(coordinateKey => {
            const [selection, requestedFacet] = coordinateKey.split("::");
            const sourceFrame = ctx[`build${spec.prefix}Source`]({
                analysisDomain: ownerId,
                selection,
                requestedFacet,
                participantChoice: `${selection}:${requestedFacet}`,
            });
            return ctx[`evaluate${spec.prefix}`](sourceFrame);
        });
        return {
            ownerId,
            atomCount: ownerAtoms.length,
            coordinateCount: results.length,
            pathOwnerExact: sourceText.includes(
                `"ownerId": "${ownerId}"`
            ),
            resultsExact: results.every(result => (
                ctx[`is${spec.prefix}Result`](result)
                && result.semanticOwnerId === ownerId
                && ["authorized", "blocked"].includes(
                    result.authorizationStatus
                )
                && (
                    result.authorizationStatus === "authorized"
                    || Boolean(result.blockReason)
                )
            )),
        };
    });
    s.eq(
        "all 477 grammar-bearing atoms retain exact proof through 32 owner-issued Results",
        {
            atoms: ownerObservations.reduce(
                (total, item) => total + item.atomCount, 0
            ),
            owners: ownerObservations.length,
            coordinates: ownerObservations.reduce(
                (total, item) => total + item.coordinateCount, 0
            ),
            invalid: ownerObservations.filter(item => (
                !item.pathOwnerExact || !item.resultsExact
            )),
        },
        {
            atoms: 477,
            owners: 32,
            coordinates: ownerObservations.reduce(
                (total, item) => total + item.coordinateCount, 0
            ),
            invalid: [],
        },
    );

    const inventory = ctx.getClassicalNahuatlRelationalStemInventory();
    const mixedGroups = Object.fromEntries([
        "options-one-two",
        "options-one-three",
        "options-one-two-three",
    ].map(group => [group, inventory.filter(stem => (
        stem.optionGroup === group
    )).map(stem => stem.stemId)]));
    s.eq("Lesson 47 reuses the complete mixed-option relational engine", {
        stemCount: inventory.length,
        axisCount: ctx.CLASSICAL_NAHUATL_LESSONS45_47_LCM.axes.length,
        mixedGroups,
        sharedEvaluator: typeof ctx.evaluateClassicalNahuatlRelationalNnc,
        lessonEvaluator: typeof ctx.evaluateClassicalNahuatlLesson47RelationalNnc,
    }, {
        stemCount: 22,
        axisCount: 55,
        mixedGroups: {
            "options-one-two": ["tzalan-between", "huic-direction"],
            "options-one-three": ["ca-means", "icpac-top"],
            "options-one-two-three": [
                "tech-contact",
                "tlan-bottom",
                "pan-surface-time",
            ],
        },
        sharedEvaluator: "function",
        lessonEvaluator: "undefined",
    });

    const nounstemKind = ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND;
    const evaluate = ({
        stemId,
        option = "",
        sourceKind = "",
        embeddedStem = "",
        possessorId = "",
        constructionKind = "relational-nnc",
        relationalSourceStem = "",
        sourceEndsInCoOrC = false,
        pertinencySourceKind = "",
        upstreamResult = null,
    }) => {
        const stem = inventory.find(candidate => candidate.stemId === stemId);
        const relational = constructionKind === "relational-nnc";
        return ctx.evaluateClassicalNahuatlRelationalNnc({
            nounstem: {
                kind: nounstemKind,
                stemId,
                formation: option,
                operation: constructionKind,
                sourceKind,
                sourceMode: relational
                    ? option === "option-one" ? "whole-stem" : "embed-matrix"
                    : "",
                sourceStem: relational
                    ? option === "option-one"
                        ? stem.classicalMatrix
                        : embeddedStem
                    : relationalSourceStem,
                sourceEmbedStem: relational && option !== "option-one"
                    ? embeddedStem
                    : "",
                sourceMatrixStem: relational ? stem.classicalMatrix : "",
                pertinencySourceKind,
                sourceEndsInCoOrC,
                upstreamResult,
            },
            possessorId,
            state: option === "option-one" ? "possessive" : "absolutive",
            subjectMode: "normal",
            nounConnector: "tl",
        });
    };
    const formationRequests = [
        ["tzalan-between", "option-one"],
        ["tzalan-between", "option-two"],
        ["huic-direction", "option-one"],
        ["huic-direction", "option-two"],
        ["ca-means", "option-one"],
        ["ca-means", "option-three"],
        ["icpac-top", "option-one"],
        ["icpac-top", "option-three"],
        ["tech-contact", "option-one"],
        ["tech-contact", "option-two"],
        ["tech-contact", "option-three"],
        ["tlan-bottom", "option-one"],
        ["tlan-bottom", "option-two"],
        ["tlan-bottom", "option-three"],
        ["pan-surface-time", "option-one"],
        ["pan-surface-time", "option-two"],
        ["pan-surface-time", "option-three"],
    ];
    const formationResults = formationRequests.map(([stemId, option]) => (
        evaluate({
            stemId,
            option,
            sourceKind: option === "option-one" ? "possessor" : "nounstem",
            embeddedStem: option === "option-one" ? "" : "cal",
            possessorId: option === "option-one" ? "1sg" : "",
        })
    ));
    s.eq("every licensed mixed-option coordinate issues an exact typed Result", {
        results: formationResults.map((result, index) => ({
            stemId: formationRequests[index][0],
            option: formationRequests[index][1],
            status: result.authorizationStatus,
            exact: ctx.isClassicalNahuatlRelationalResult(result),
            independent: Boolean(
                result.formulaProjection
                && result.writtenProjection
                && result.formulaDerivedFromWritten === false
                && result.writtenDerivedFromFormula === false
            ),
        })),
    }, {
        results: formationRequests.map(([stemId, option]) => ({
            stemId,
            option,
            status: "authorized",
            exact: true,
            independent: true,
        })),
    });

    const associated = evaluate({
        stemId: "pan-surface-time",
        constructionKind: "associated-entity",
        relationalSourceStem: "cuauhtēnco",
        sourceEndsInCoOrC: true,
    });
    const directPertinency = evaluate({
        stemId: "pan-surface-time",
        constructionKind: "pertinency",
        pertinencySourceKind: "direct-relational",
        relationalSourceStem: "huehcapan",
    });
    const associatedSource = evaluate({
        stemId: "pan-surface-time",
        constructionKind: "associated-entity",
        relationalSourceStem: "cuauhtlah",
    });
    const associatedPertinency = evaluate({
        stemId: "pan-surface-time",
        constructionKind: "pertinency",
        pertinencySourceKind: "associated-entity",
        upstreamResult: associatedSource,
    });
    s.eq("associated entity and pertinency preserve exact Result handoffs", {
        results: [associated, directPertinency, associatedPertinency].map(
            result => ({
                status: result.authorizationStatus,
                exact: ctx.isClassicalNahuatlRelationalResult(result),
                operation: result.operationFrame?.operationId,
                predicate: result.predicateStem,
                gentilic: result.contextualFacts?.associatedEntityIsGentilic,
                outerStateIndependent: result.contextualFacts
                    ?.embeddedPossessorControlsOuterState === false,
            })
        ),
    }, {
        results: [
            {
                status: "authorized",
                exact: true,
                operation: "relational-associated-entity-ca",
                predicate: "cuauhtēnca",
                gentilic: false,
                outerStateIndependent: true,
            },
            {
                status: "authorized",
                exact: true,
                operation: "relational-pertinency-direct",
                predicate: "huehcapanyō",
                gentilic: false,
                outerStateIndependent: true,
            },
            {
                status: "authorized",
                exact: true,
                operation: "relational-pertinency-from-associated-entity",
                predicate: "cuauhtlahcayō",
                gentilic: false,
                outerStateIndependent: true,
            },
        ],
    });

    const copied = JSON.parse(JSON.stringify(associatedSource));
    const copiedPertinency = evaluate({
        stemId: "pan-surface-time",
        constructionKind: "pertinency",
        pertinencySourceKind: "associated-entity",
        upstreamResult: copied,
    });
    const hostile = ctx.evaluateClassicalNahuatlRelationalNnc({
        lessonMetadata: { lesson: 47 },
        translation: "for",
        formula: "#FORGED#",
        surface: "forged",
    });
    s.eq("copied Results, metadata, translations, and strings cannot authorize", {
        copy: ctx.isClassicalNahuatlRelationalResult(copied),
        copiedPertinency: [
            copiedPertinency.authorizationStatus,
            copiedPertinency.diagnostics,
        ],
        hostile: [
            hostile.authorizationStatus,
            hostile.callerSuppliedAuthorityAccepted,
        ],
    }, {
        copy: false,
        copiedPertinency: [
            "blocked",
            ["canonical-associated-entity-upstream-result-required"],
        ],
        hostile: ["blocked", false],
    });

    return s;
}

module.exports = { run };
