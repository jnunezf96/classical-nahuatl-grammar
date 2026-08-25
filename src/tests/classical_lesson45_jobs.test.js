"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson45_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson45-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§45(?:\.|$)/u.test(atom[field.canvasSection])
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

    s.eq("Lesson 45 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => (
            !groupBySection.has(atom[field.canvasSection])
        )).map(atom => atom[field.atomId]),
    }, {
        atoms: 428,
        grammar: 289,
        writing: 238,
        readingOnly: 190,
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
        "all 289 grammar-bearing atoms retain exact proof through 30 owner-issued Results",
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
            atoms: 289,
            owners: 30,
            coordinates: ownerObservations.reduce(
                (total, item) => total + item.coordinateCount, 0
            ),
            invalid: [],
        },
    );

    const inventory = ctx.getClassicalNahuatlRelationalStemInventory();
    const optionOneOnly = inventory.filter(stem => (
        stem.optionGroup === "option-one-only"
    ));
    s.eq("Lesson 45 reuses the complete relational engine without a lesson engine", {
        stemCount: inventory.length,
        axisCount: ctx.CLASSICAL_NAHUATL_LESSONS45_47_LCM.axes.length,
        optionOneOnly: optionOneOnly.map(stem => stem.stemId),
        sharedEvaluator: typeof ctx.evaluateClassicalNahuatlRelationalNnc,
        lessonEvaluator: typeof ctx.evaluateClassicalNahuatlLesson45RelationalNnc,
    }, {
        stemCount: 22,
        axisCount: 55,
        optionOneOnly: [
            "huan-company",
            "tloc-proximity",
            "pal-favor",
            "c-means-purpose-reason-time",
        ],
        sharedEvaluator: "function",
        lessonEvaluator: "undefined",
    });

    const nounstemKind = ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND;
    const optionOne = (stemId, possessorId) => {
        const stem = inventory.find(candidate => candidate.stemId === stemId);
        return ctx.evaluateClassicalNahuatlRelationalNnc({
            nounstem: {
                kind: nounstemKind,
                stemId,
                formation: "option-one",
                operation: "relational-nnc",
                sourceKind: "possessor",
                sourceMode: "whole-stem",
                sourceStem: stem.classicalMatrix,
            },
            possessorId,
            state: "possessive",
        });
    };
    const optionOneResults = [
        optionOne("huan-company", "1sg"),
        optionOne("tloc-proximity", "2sg"),
        optionOne("pal-favor", "3sg"),
        optionOne("c-means-purpose-reason-time", "3common"),
    ];
    s.eq("all four option-one-only families issue exact typed Results", {
        results: optionOneResults.map(result => ({
            status: result.authorizationStatus,
            exact: ctx.isClassicalNahuatlRelationalResult(result),
            option: result.option,
            state: result.sourceState,
            independent: Boolean(
                result.formulaProjection
                && result.writtenProjection
                && result.formulaDerivedFromWritten === false
                && result.writtenDerivedFromFormula === false
            ),
        })),
    }, {
        results: optionOneResults.map(() => ({
            status: "authorized",
            exact: true,
            option: "option-one",
            state: "possessive",
            independent: true,
        })),
    });

    const wrongOption = ctx.evaluateClassicalNahuatlRelationalNnc({
        nounstem: {
            kind: nounstemKind,
            stemId: "huan-company",
            formation: "option-two",
            operation: "relational-nnc",
            sourceKind: "nounstem",
            sourceMode: "embed-matrix",
            sourceStem: "cal",
            sourceEmbedStem: "cal",
            sourceMatrixStem: "huān",
        },
        state: "absolutive",
    });
    const fixedPossessorMismatch = optionOne(
        "c-means-purpose-reason-time",
        "1sg",
    );
    s.eq("option-group and fixed-possessor restrictions fail specifically", {
        wrongOption: [
            wrongOption.authorizationStatus,
            wrongOption.diagnostics,
        ],
        fixedPossessor: [
            fixedPossessorMismatch.authorizationStatus,
            fixedPossessorMismatch.diagnostics,
        ],
    }, {
        wrongOption: [
            "blocked",
            ["relational-option-not-licensed-for-stem"],
        ],
        fixedPossessor: [
            "blocked",
            ["relational-fixed-possessor-mismatch"],
        ],
    });

    const issued = optionOneResults[0];
    const copied = JSON.parse(JSON.stringify(issued));
    const hostile = ctx.evaluateClassicalNahuatlRelationalNnc({
        lessonMetadata: { lesson: 45 },
        translation: "with",
        formula: "#FORGED#",
        surface: "forged",
    });
    s.eq("copies, lesson metadata, translations, and strings cannot authorize grammar", {
        issued: ctx.isClassicalNahuatlRelationalResult(issued),
        copy: ctx.isClassicalNahuatlRelationalResult(copied),
        hostile: [
            hostile.authorizationStatus,
            hostile.callerSuppliedAuthorityAccepted,
        ],
    }, {
        issued: true,
        copy: false,
        hostile: ["blocked", false],
    });

    return s;
}

module.exports = { run };
