"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson46_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson46-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§46(?:\.|$)/u.test(atom[field.canvasSection])
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

    s.eq("Lesson 46 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => (
            !groupBySection.has(atom[field.canvasSection])
        )).map(atom => atom[field.atomId]),
    }, {
        atoms: 1250,
        grammar: 841,
        writing: 646,
        readingOnly: 604,
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
        "all 841 grammar-bearing atoms retain exact proof through 67 owner-issued Results",
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
            atoms: 841,
            owners: 67,
            coordinates: ownerObservations.reduce(
                (total, item) => total + item.coordinateCount, 0
            ),
            invalid: [],
        },
    );

    const inventory = ctx.getClassicalNahuatlRelationalStemInventory();
    const optionTwoOnly = inventory.filter(stem => (
        stem.optionGroup === "option-two-only"
    ));
    s.eq("Lesson 46 reuses the complete option-two relational engine", {
        stemCount: inventory.length,
        axisCount: ctx.CLASSICAL_NAHUATL_LESSONS45_47_LCM.axes.length,
        optionTwoOnly: optionTwoOnly.map(stem => stem.stemId),
        sharedEvaluator: typeof ctx.evaluateClassicalNahuatlRelationalNnc,
        lessonEvaluator: typeof ctx.evaluateClassicalNahuatlLesson46RelationalNnc,
    }, {
        stemCount: 22,
        axisCount: 55,
        optionTwoOnly: [
            "n-locative",
            "yan-locative",
            "tlah-abundance-place",
            "co-c-specific-location",
            "ca-interval-distance",
            "pa-direction",
            "pa-frequency",
            "nal-far-bank",
            "chi-direction-toward",
            "ic-downward-direction",
            "teuh-similarity",
        ],
        sharedEvaluator: "function",
        lessonEvaluator: "undefined",
    });

    const nounstemKind = ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND;
    const optionTwo = ({
        stemId,
        sourceKind,
        embeddedStem,
        sourceFormation = "",
        sourceLexemeId = "",
    }) => {
        const stem = inventory.find(candidate => candidate.stemId === stemId);
        const matrix = stemId === "co-c-specific-location"
            ? sourceLexemeId === "tle-fire"
                || !/[aeiouāēīō]$/u.test(embeddedStem) ? "co" : "c"
            : stem.classicalMatrix;
        return ctx.evaluateClassicalNahuatlRelationalNnc({
            nounstem: {
                kind: nounstemKind,
                stemId,
                formation: "option-two",
                operation: "relational-nnc",
                sourceKind,
                sourceFormation,
                sourceMode: "embed-matrix",
                sourceStem: embeddedStem,
                sourceEmbedStem: embeddedStem,
                sourceMatrixStem: matrix,
                sourceLexemeId,
            },
            state: "absolutive",
        });
    };
    const representatives = [
        optionTwo({
            stemId: "n-locative",
            sourceKind: "nounstem",
            sourceFormation: "plain-nounstem",
            embeddedStem: "cec",
        }),
        optionTwo({
            stemId: "co-c-specific-location",
            sourceKind: "nounstem",
            embeddedStem: "cal",
        }),
        optionTwo({
            stemId: "co-c-specific-location",
            sourceKind: "nounstem",
            embeddedStem: "tecoma",
        }),
        optionTwo({
            stemId: "co-c-specific-location",
            sourceKind: "nounstem",
            embeddedStem: "tle",
            sourceLexemeId: "tle-fire",
        }),
        optionTwo({
            stemId: "pa-frequency",
            sourceKind: "numeral",
            embeddedStem: "ōm",
        }),
    ];
    s.eq("representative option-two boundaries issue exact typed Results", {
        results: representatives.map(result => ({
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
        results: representatives.map(() => ({
            status: "authorized",
            exact: true,
            option: "option-two",
            state: "absolutive",
            independent: true,
        })),
    });

    s.eq("supportive i, co/c, fire, and frequency boundaries remain owner-derived", {
        predicateStems: representatives.map(result => result.predicateStem),
        traces: representatives.map(result => result.operationFrame?.operationTrace),
    }, {
        predicateStems: ["cecni", "calco", "tecomac", "tleco", "ōppa"],
        traces: [
            ["retain-typed-embedded-source", "retain-licensed-source-stem", "insert-supportive-i-before-locative-n"],
            ["retain-typed-embedded-source", "select-co-after-consonant-or-fire"],
            ["retain-typed-embedded-source", "select-c-after-vowel"],
            ["retain-typed-embedded-source", "select-co-after-consonant-or-fire"],
            ["retain-typed-embedded-source", "attach-frequency-pa", "realize-frequency-assimilation"],
        ],
    });

    const wrongSource = optionTwo({
        stemId: "nal-far-bank",
        sourceKind: "nounstem",
        embeddedStem: "cal",
    });
    const copied = JSON.parse(JSON.stringify(representatives[0]));
    const hostile = ctx.evaluateClassicalNahuatlRelationalNnc({
        lessonMetadata: { lesson: 46 },
        translation: "at",
        formula: "#FORGED#",
        surface: "forged",
    });
    s.eq("wrong Sources, copies, metadata, translations, and strings cannot authorize", {
        wrongSource: [wrongSource.authorizationStatus, wrongSource.diagnostics],
        issued: ctx.isClassicalNahuatlRelationalResult(representatives[0]),
        copy: ctx.isClassicalNahuatlRelationalResult(copied),
        hostile: [
            hostile.authorizationStatus,
            hostile.callerSuppliedAuthorityAccepted,
        ],
    }, {
        wrongSource: ["blocked", ["relational-source-kind-not-licensed"]],
        issued: true,
        copy: false,
        hostile: ["blocked", false],
    });

    return s;
}

module.exports = { run };
