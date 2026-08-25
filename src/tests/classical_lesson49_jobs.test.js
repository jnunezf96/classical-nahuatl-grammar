"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function canonicalVnc(ctx) {
    return ctx.requestClassicalVncApplicationResult({
        sourceStem: "cati",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
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

function run(ctx = {}) {
    const s = createSuite("classical_lesson49_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson49-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§49(?:\.|$)/u.test(atom[field.canvasSection])
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

    s.eq("Lesson 49 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => (
            !groupBySection.has(atom[field.canvasSection])
        )).map(atom => atom[field.atomId]),
    }, {
        atoms: 645,
        grammar: 384,
        writing: 301,
        readingOnly: 344,
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
        atoms: 384,
        owners: 34,
        invalid: [],
    });

    const inventory = ctx.getAdverbialAdjunctionCapabilityInventory();
    s.ok(
        "Lesson 49 reuses one semantic adjunction engine rather than a lesson engine",
        inventory.length > 100
        && inventory.every(entry => (
            entry.authorizesSurfaceSpelling === false
            && !/(?:^|[.-])49(?:[.-]|$)/u.test(entry.id)
        ))
        && typeof ctx.evaluateAdverbialAdjunction === "function"
        && typeof ctx.evaluateClassicalNahuatlLesson49Adjunction === "undefined",
    );

    const principal = canonicalVnc(ctx);
    const manner = canonicalNnc(ctx, "ihciuhca");
    const simple = ctx.evaluateAdverbialAdjunction({
        principalClause: principal,
        adjoinedUnit: manner,
        semanticRelation: "manner",
        adverbializationDegree: "second",
        structureKind: "simple",
        adjoinedUnitType: "nnc",
        order: "modifier-head",
        recursion: "none",
        marking: "unmarked",
    });
    const recursive = ctx.evaluateAdverbialAdjunction({
        principalClause: simple,
        adjoinedUnit: canonicalNnc(ctx, "āxcān"),
        semanticRelation: "time",
        adverbializationDegree: "second",
        structureKind: "complex",
        adjoinedUnitType: "nnc",
        order: "modifier-head",
        recursion: "head",
        marking: "unmarked",
    });
    s.eq("simple and recursive Lesson 49 structures issue exact finite Results", {
        simple: {
            exact: ctx.isAdverbialAdjunctionResult(simple),
            authorized: simple.ok && simple.supported,
            surface: simple.surface,
        },
        recursive: {
            exact: ctx.isAdverbialAdjunctionResult(recursive),
            authorized: recursive.ok && recursive.supported,
            sourceKind: recursive.sourceContract.principal.sourceKind,
            recursion: recursive.ruleProfile.recursion,
            surface: recursive.surface,
        },
    }, {
        simple: { exact: true, authorized: true, surface: "ihciuhca cati" },
        recursive: {
            exact: true,
            authorized: true,
            sourceKind: "composition-ast",
            recursion: "head",
            surface: "āxcān ihciuhca cati",
        },
    });

    const request = {
        principalClause: simple,
        adjoinedUnit: canonicalNnc(ctx, "nepa"),
        semanticRelation: "place",
        adverbializationDegree: "second",
        structureKind: "complex",
        adjoinedUnitType: "nnc",
        order: "modifier-head",
        recursion: "head",
        marking: "unmarked",
    };
    s.eq("copies and display metadata cannot authorize recursive adjunction", {
        exact: ctx.evaluateAdverbialAdjunction(request).ok,
        shallowCopy: ctx.evaluateAdverbialAdjunction({
            ...request,
            principalClause: { ...simple },
        }).diagnostics,
        jsonCopy: ctx.evaluateAdverbialAdjunction({
            ...request,
            principalClause: JSON.parse(JSON.stringify(simple)),
        }).diagnostics,
        displayOnly: ctx.evaluateAdverbialAdjunction({
            ...request,
            principalClause: {
                formula: simple.formula,
                surface: simple.surface,
                lesson: 49,
            },
        }).diagnostics,
    }, {
        exact: true,
        shallowCopy: [
            "adverbial-adjunction-canonical-principal-result-required",
            "adverbial-adjunction-head-recursion-requires-recursive-head",
        ],
        jsonCopy: [
            "adverbial-adjunction-canonical-principal-result-required",
            "adverbial-adjunction-head-recursion-requires-recursive-head",
        ],
        displayOnly: [
            "adverbial-adjunction-canonical-principal-result-required",
            "adverbial-adjunction-head-recursion-requires-recursive-head",
        ],
    });

    s.ok(
        "the delivered clause-relation interface projects the canonical Lesson 49 controls",
        fs.readFileSync(path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8")
            .includes('"clause:adverbial-adjunction/relation-scope"')
        && fs.readFileSync(path.join(
            ROOT, "src/application/classical/clause_relation_controller.mjs"
        ), "utf8").includes("requestClassicalAdverbialAdjunctionResult"),
    );

    return s;
}

module.exports = { run };
