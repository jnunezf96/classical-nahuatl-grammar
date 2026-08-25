"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const ROOT = path.resolve(__dirname, "..", "..");

function buildVnc(ctx, stem, options = {}) {
    const subjectReferenceId = options.subjectReferenceId || "subject";
    const source = ctx.requestClassicalVncApplicationResult({
        sourceStem: stem,
        subject: options.subject || "3sg",
        mood: "indicative",
        tense: options.tense || "present",
        verbClass: "A",
        sourceValence: options.valence || "intransitive",
        objectKind: options.objectKind || "none",
        objectPerson: options.objectPerson || "",
        requestedDerivation: "direct",
        requestedVoice: "active",
        outputScope: "single",
    });
    return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(source, {
        referenceId: subjectReferenceId,
        subjectReferenceId,
        objectReferenceId: options.objectReferenceId || "",
    });
}

function buildNnc(ctx, stem, options = {}) {
    return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(
        ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject: options.subject || "3sg",
            nounClass: options.nounClass || "zero",
            animacy: options.animacy || "nonanimate",
        }),
        { referenceId: options.referenceId || "referent" },
    );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson51_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson51-review-plan.json"), "utf8"));
    const field = Object.fromEntries(ledger.codebook.atomTuple.map((name, index) => [name, index]));
    const atoms = ledger.atoms.filter(atom => /^§51(?:\.|$)/u.test(atom[field.canvasSection]));
    const grammarAtoms = atoms.filter(atom => atom[field.force] === "grammar-bearing");
    const writingRoles = new Set(["canonical-rule-or-alternation", "applicability-or-constraint", "derived-realization", "source-structure-schema", "result-projection"]);
    const writing = grammarAtoms.filter(atom => writingRoles.has(atom[field.projectRole]));
    const groupBySection = new Map(plan.groups.flatMap(group => group.sections.map(section => [section, group])));

    s.eq("Lesson 51 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => !groupBySection.has(atom[field.canvasSection])).map(atom => atom[field.atomId]),
    }, {
        atoms: 241,
        grammar: 142,
        writing: 116,
        readingOnly: 125,
        sections: plan.groups.flatMap(group => group.sections),
        unmapped: [],
    });

    const ownerIds = [...new Set(grammarAtoms.map(atom => atom[field.semanticOwnerId]))].sort();
    const observations = ownerIds.map(ownerId => {
        const owned = grammarAtoms.filter(atom => atom[field.semanticOwnerId] === ownerId);
        const source = fs.readFileSync(path.join(ROOT, owned[0][field.semanticOwnerReference]), "utf8");
        const spec = JSON.parse(source.match(/const spec = (\{[\s\S]*\});\nexport default/u)[1]);
        const results = Object.keys(spec.coordinates).map(key => {
            const [selection, requestedFacet] = key.split("::");
            return ctx[`evaluate${spec.prefix}`](ctx[`build${spec.prefix}Source`]({
                analysisDomain: ownerId,
                selection,
                requestedFacet,
                participantChoice: `${selection}:${requestedFacet}`,
            }));
        });
        return {
            atoms: owned.length,
            exact: source.includes(`"ownerId": "${ownerId}"`) && results.every(result => (
                ctx[`is${spec.prefix}Result`](result)
                && result.semanticOwnerId === ownerId
                && ["authorized", "blocked"].includes(result.authorizationStatus)
            )),
        };
    });
    s.eq("all grammar-bearing atoms retain exact semantic-owner proof", {
        atoms: observations.reduce((sum, item) => sum + item.atoms, 0),
        owners: observations.length,
        invalid: observations.filter(item => !item.exact).length,
    }, { atoms: 142, owners: 37, invalid: 0 });

    const contract = ctx.buildClassicalNahuatlClauseCompositionGrammarContract();
    s.eq("Lesson 51 reuses one signed clause-composition GCD and 21 complement axes", {
        exact: ctx.isClassicalNahuatlClauseCompositionGrammarContract(contract),
        gcd: contract.greatestCommonDivisor.identityId,
        complementAxes: contract.leastCommonMultiple.semanticOwnerAxisCounts["clause-complementation"],
        lessonEvaluator: typeof ctx.evaluateClassicalNahuatlLesson51ComplementOperation,
    }, {
        exact: true,
        gcd: "typed-clause-source-semantic-relation-reference-graph-surface-result",
        complementAxes: 21,
        lessonEvaluator: "undefined",
    });

    const chief = buildNnc(ctx, "tlahtoāni", { referenceId: "chief", animacy: "animate" });
    const object = ctx.evaluateClassicalNahuatlClauseComplementation({
        operationKind: "object-complement",
        principalClause: buildVnc(ctx, "chīhua", {
            subject: "3pl", subjectReferenceId: "makers", valence: "specific-projective",
            objectKind: "specific-projective", objectPerson: "3sg", objectReferenceId: "chief",
        }),
        complementClause: chief,
        options: { semanticCategory: "change" },
    });
    const subject = ctx.evaluateClassicalNahuatlClauseComplementation({
        operationKind: "subject-complement",
        principalClause: buildVnc(ctx, "nēci", { subject: "1sg", subjectReferenceId: "speaker" }),
        complementClause: buildNnc(ctx, "tēlpōchtli", { subject: "1sg", referenceId: "speaker", animacy: "animate" }),
        options: { semanticCategory: "identity" },
    });
    const adverbial = ctx.evaluateClassicalNahuatlClauseComplementation({
        operationKind: "adverbial-complement",
        principalClause: buildVnc(ctx, "pēhua", { subjectReferenceId: "actor" }),
        complementClause: buildVnc(ctx, "cuīca", { subjectReferenceId: "actor" }),
        options: { semanticCategory: "beginning" },
    });
    s.eq("object, subject, and adverbial complements issue exact Results", [object, subject, adverbial].map(result => ({
        status: result.authorizationStatus,
        exact: ctx.isClassicalNahuatlClauseComplementationResultFrame(result),
        formulaAuthority: result.formulaStringAuthority,
        surfaceAuthority: result.surfaceStringAuthority,
    })), Array(3).fill({ status: "authorized", exact: true, formulaAuthority: false, surfaceAuthority: false }));

    const copied = ctx.evaluateClassicalNahuatlClauseComplementation({
        operationKind: "object-complement",
        principalClause: { ...object.principalClause },
        complementClause: { ...chief },
        options: { semanticCategory: "change", lesson: 51, surface: object.surface },
    });
    s.ok(
        "copied Results and display metadata cannot authorize complementation",
        copied.authorizationStatus === "blocked"
        && !ctx.isClassicalNahuatlClauseComplementationResultFrame({ ...object })
        && !ctx.isClassicalNahuatlClauseComplementationResultFrame(JSON.parse(JSON.stringify(object))),
    );

    const controller = fs.readFileSync(path.join(ROOT, "src/application/classical/clause_relation_controller.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok(
        "the live Clause composition workflow uses captured owner Results",
        controller.includes("classical-clause-relation-controller")
        && rendering.includes('title.textContent = "Clause composition"')
        && rendering.includes('"object-complement"')
        && rendering.includes('"subject-complement"')
        && rendering.includes('"adverbial-complement"'),
    );

    return s;
}

module.exports = { run };
