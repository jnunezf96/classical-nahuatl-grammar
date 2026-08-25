"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function canonicalVnc(ctx, overrides = {}) {
    return ctx.requestClassicalVncApplicationResult({
        sourceStem: "cati",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
        ...overrides,
    });
}

function canonicalNnc(ctx, stem = "nepa") {
    const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject: "3sg",
        nounClass: "zero",
        animacy: "animate",
    });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [nnc.nncSlotFrame, {
            sentenceType: "assertion",
            polarity: "positive",
        }],
    }).canonicalResult;
}

function canonicalSentence(ctx) {
    return ctx.requestClassicalVncSentenceResultFrame(canonicalVnc(ctx));
}

function canonicalAdverbial(ctx, stem = "iuh") {
    const potential = ctx.resolveClassicalNahuatlAdverbialPotential({
        stem,
        clauseKind: "vnc",
    });
    return ctx.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: potential,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson50_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson50-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§50(?:\.|$)/u.test(atom[field.canvasSection])
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

    s.eq("Lesson 50 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => (
            !groupBySection.has(atom[field.canvasSection])
        )).map(atom => atom[field.atomId]),
    }, {
        atoms: 939,
        grammar: 732,
        writing: 628,
        readingOnly: 311,
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
            pathOwnerExact: sourceText.includes(`"ownerId": "${ownerId}"`),
            resultsExact: results.every(result => (
                ctx[`is${spec.prefix}Result`](result)
                && result.semanticOwnerId === ownerId
                && ["authorized", "blocked"].includes(result.authorizationStatus)
                && (result.authorizationStatus === "authorized" || Boolean(result.blockReason))
            )),
        };
    });
    s.eq("all grammar-bearing atoms retain exact semantic-owner proof", {
        atoms: ownerObservations.reduce((total, item) => total + item.atomCount, 0),
        owners: ownerObservations.length,
        invalid: ownerObservations.filter(item => (
            !item.pathOwnerExact || !item.resultsExact
        )),
    }, {
        atoms: 732,
        owners: 64,
        invalid: [],
    });

    const principal = canonicalVnc(ctx);
    const ordinaryAdjoined = canonicalNnc(ctx);
    const sentenceAdjoined = canonicalSentence(ctx);
    const relationCases = [
        {
            id: "time",
            adjoined: ordinaryAdjoined,
            request: { timeProfile: "explicit", explicitAdverbialIndicator: true, adjoinedUnitType: "nnc" },
        },
        { id: "place", adjoined: ordinaryAdjoined, request: { adjoinedUnitType: "nnc" } },
        { id: "manner", adjoined: ordinaryAdjoined, request: { adjoinedUnitType: "nnc" } },
        {
            id: "consideration",
            adjoined: ordinaryAdjoined,
            request: { contrast: "adverbial-modification", adjoinedUnitType: "nnc" },
        },
        {
            id: "purpose",
            adjoined: canonicalVnc(ctx, { tense: "future" }),
            request: { purposeType: "unmarked", adjoinedUnitType: "vnc" },
        },
        {
            id: "condition",
            adjoined: ordinaryAdjoined,
            request: { conditionType: "open", conditionalCuePresent: true, adjoinedUnitType: "nnc" },
        },
        {
            id: "concession",
            adjoined: ordinaryAdjoined,
            request: {
                concessionType: "ma-zo",
                marking: "ma-zo",
                markerUnit: ctx.requestClassicalParticleResult("l3-ma-zo"),
                adjoinedUnitType: "nnc",
            },
        },
        {
            id: "consequence",
            adjoined: canonicalAdverbial(ctx),
            request: { adjoinedUnitType: "nnc" },
        },
        {
            id: "proviso",
            adjoined: sentenceAdjoined,
            request: {
                marking: "ahzo",
                markerUnit: ctx.requestClassicalParticleResult("l3-ahzo"),
                adjoinedUnitType: "sentence",
            },
        },
        {
            id: "reason",
            adjoined: sentenceAdjoined,
            request: {
                marking: "ca",
                markerUnit: ctx.requestClassicalParticleResult("l3-ca"),
                adjoinedUnitType: "sentence",
            },
        },
    ];
    const results = relationCases.map(entry => ctx.evaluateAdverbialAdjunction({
        principalClause: principal,
        adjoinedUnit: entry.adjoined,
        semanticRelation: entry.id,
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "clause",
        order: "modifier-head",
        recursion: "none",
        marking: "unmarked",
        ...entry.request,
    }));
    s.eq("all ten Lesson 50 relation families execute through one GCD", results.map((result, index) => ({
        id: relationCases[index].id,
        exact: ctx.isAdverbialAdjunctionResult(result),
        ok: result.ok,
        relation: result.ruleProfile.relation,
        formulaId: result.grammarFrame.resultFrame.formulaRecord?.id,
    })), relationCases.map(entry => ({
        id: entry.id,
        exact: true,
        ok: true,
        relation: entry.id,
        formulaId: `adverbial-adjunction:nonadverbialized:${entry.id}:modifier-head`,
    })));

    const reason = ctx.evaluateAdverbialAdjunction({
        principalClause: principal,
        adjoinedUnit: sentenceAdjoined,
        markerUnit: ctx.requestClassicalParticleResult("l3-ca"),
        semanticRelation: "reason",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "sentence",
        order: "head-modifier",
        recursion: "none",
        marking: "ca",
    });
    s.eq("ca remains a principal-clause introducer rather than a conjunction", {
        ok: reason.ok,
        caIsConjunction: reason.relationContract.caIsConjunction,
        translationMirage: reason.relationContract.translationMirage,
        diagnostics: reason.diagnostics,
    }, {
        ok: true,
        caIsConjunction: false,
        translationMirage: true,
        diagnostics: ["adverbial-adjunction-ca-is-not-conjunction"],
    });

    const hostile = ctx.evaluateAdverbialAdjunction({
        principalClause: { surface: principal.surface, lesson: 50 },
        adjoinedUnit: { formula: sentenceAdjoined.formula, storedAnswer: true },
        markerUnit: { surface: "ca" },
        semanticRelation: "reason",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "sentence",
        order: "head-modifier",
        recursion: "none",
        marking: "ca",
    });
    s.eq("lesson, formula, surface, and stored metadata authorize no relation", {
        ok: hostile.ok,
        surface: hostile.surface,
        diagnostics: hostile.diagnostics,
    }, {
        ok: false,
        surface: "",
        diagnostics: [
            "adverbial-adjunction-canonical-principal-result-required",
            "adverbial-adjunction-canonical-adjoined-result-required",
            "adverbial-adjunction-canonical-marker-result-required",
        ],
    });

    const controller = fs.readFileSync(path.join(
        ROOT, "src/application/classical/clause_relation_controller.mjs"
    ), "utf8");
    const renderer = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"
    ), "utf8");
    s.ok(
        "the delivered relation UI uses owner availability and exact capture roles",
        controller.includes("issueAdverbialAdjunctionAvailabilityContract")
        && controller.includes("requestClassicalAdverbialAdjunctionResult")
        && renderer.includes('"clause:adverbial-adjunction/relation-scope"')
        && renderer.includes('data-classical-clause-relation-canonical-result'),
    );

    return s;
}

module.exports = { run };
