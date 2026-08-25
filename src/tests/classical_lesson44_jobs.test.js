"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson44_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson44-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§44(?:\.|$)/u.test(atom[field.canvasSection])
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

    s.eq("Lesson 44 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => (
            !groupBySection.has(atom[field.canvasSection])
        )).map(atom => atom[field.atomId]),
    }, {
        atoms: 815,
        grammar: 518,
        writing: 404,
        readingOnly: 411,
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
        "all 518 grammar-bearing atoms retain exact proof through 51 owner-issued Results",
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
            atoms: 518,
            owners: 51,
            coordinates: ownerObservations.reduce(
                (total, item) => total + item.coordinateCount, 0
            ),
            invalid: [],
        },
    );

    const lcm = ctx.getClassicalNahuatlLcm();
    const records = ctx.listClassicalNahuatlLesson44SourceRecords();
    const recordsById = new Map(records.map(record => [record.id, record]));
    const evaluate = (sourceId, choices = {}) => {
        const record = recordsById.get(sourceId);
        const potential = ctx.resolveClassicalNahuatlAdverbialPotential({
            stem: record.sourceForms[0],
            clauseKind: record.clauseKind,
        });
        return ctx.requestClassicalAdverbialNncResult({
            adverbialPotentialFrame: potential,
            ...choices,
        });
    };
    s.eq("Lesson 44 retains one complete typed inventory and no lesson engine", {
        sourceRecords: records.length,
        complete: lcm.completeLicensedInventory,
        sourceKinds: lcm.axes.sourceClauseKinds,
        degrees: lcm.axes.adverbialDegrees,
        scopes: lcm.axes.scopes,
        evaluator: typeof ctx.evaluateClassicalNahuatlLesson44AdverbialNuclear,
        sharedEvaluator: typeof ctx.evaluateClassicalNahuatlAdverbialNuclear,
    }, {
        sourceRecords: 98,
        complete: true,
        sourceKinds: ["vnc", "nnc-absolutive", "nnc-possessive"],
        degrees: ["first-degree", "second-degree"],
        scopes: ["external-clause", "incorporated-predicate"],
        evaluator: "undefined",
        sharedEvaluator: "function",
    });

    const representatives = [
        "44.3-cencah",
        "44.4-cenyohoal",
        "44.5-quen",
        "44.6-moztla",
        "44.7-pacca",
        "44.8-iyohca",
    ].map(sourceId => evaluate(sourceId));
    s.eq(
        "representative Source families issue exact scalar Results",
        representatives.map(result => ({
            status: result.authorizationStatus,
            exact: ctx.isClassicalNahuatlAdverbialNuclearResult(result),
            typed: Boolean(
                result.sourceFrame
                && result.operationFrame
                && result.operationFrame.subjectOperationFrame
            ),
            independent: Boolean(
                result.formulaProjection
                    ?.derivedIndependentlyFromWrittenProjection
                && result.writtenProjection
                    ?.derivedIndependentlyFromFormulaProjection
            ),
        })),
        representatives.map(() => ({
            status: "authorized",
            exact: true,
            typed: true,
            independent: true,
        })),
    );

    const incorporated = evaluate("44.9-nepan", {
        scope: "incorporated-predicate",
        matrix: {
            stem: "huetz",
            verbClass: "A",
            valence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            voice: "active",
        },
        outputKind: "single",
    });
    const external = evaluate("44.9-nepan", {
        scope: "external-clause",
    });
    s.eq("incorporation reuses the nominal-embed VNC owner", {
        incorporated: [
            incorporated.authorizationStatus,
            incorporated.operationFrame?.subjectOperationFrame
                ?.subjectDiscarded,
            incorporated.operationFrame?.compoundStem,
            incorporated.canonicalTargetEvaluator,
        ],
        external: [external.authorizationStatus, external.blockReason],
    }, {
        incorporated: [
            "authorized",
            true,
            "ne-pan-huetz",
            "grammar:nominal-construction",
        ],
        external: ["blocked", "adverbial-source-is-compound-only"],
    });

    const originalPotential = ctx.resolveClassicalNahuatlAdverbialPotential({
        stem: "iuh",
        clauseKind: "vnc",
    });
    const copiedPotential = JSON.parse(JSON.stringify(originalPotential));
    const hostile = ctx.evaluateClassicalNahuatlAdverbialNuclear({
        lessonMetadata: { lesson: 44 },
        canvasAnswer: "cencah",
    });
    s.eq("copies and lesson or Canvas metadata cannot authorize grammar", {
        original: ctx.isClassicalNahuatlAdverbialPotentialFrame(
            originalPotential
        ),
        copy: ctx.isClassicalNahuatlAdverbialPotentialFrame(copiedPotential),
        hostile: [
            hostile.authorizationStatus,
            hostile.callerSuppliedAuthorityAccepted,
        ],
    }, {
        original: true,
        copy: false,
        hostile: ["blocked", false],
    });

    return s;
}

module.exports = { run };
