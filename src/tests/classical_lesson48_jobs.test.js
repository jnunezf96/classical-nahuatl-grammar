"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson48_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson48-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§48(?:\.|$)/u.test(atom[field.canvasSection])
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

    s.eq("Lesson 48 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => (
            !groupBySection.has(atom[field.canvasSection])
        )).map(atom => atom[field.atomId]),
    }, {
        atoms: 880,
        grammar: 530,
        writing: 453,
        readingOnly: 427,
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
        "all 530 grammar-bearing atoms retain exact proof through 42 owner-issued Results",
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
            atoms: 530,
            owners: 42,
            coordinates: ownerObservations.reduce(
                (total, item) => total + item.coordinateCount, 0
            ),
            invalid: [],
        },
    );

    s.eq("Lesson 48 reuses one complete place/gentilic engine", {
        gcd: ctx.PLACE_GENTILIC_NNC_GCD.identityId,
        axisCount: ctx.PLACE_GENTILIC_NNC_LCM.axisCount,
        placeFormations: ctx.PLACE_GENTILIC_NNC_PLACE_FORMATIONS.length,
        gentilicFormations: ctx.PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS.length,
        sharedEvaluator: typeof ctx.evaluatePlaceGentilicNnc,
        lessonEvaluator: typeof ctx.evaluateClassicalNahuatlLesson48PlaceGentilic,
    }, {
        gcd: "typed-place-gentilic-source+licensed-formation+boundary-realization+nnc-agreement+finite-result",
        axisCount: 44,
        placeFormations: 24,
        gentilicFormations: 10,
        sharedEvaluator: "function",
        lessonEvaluator: "undefined",
    });

    const representativeRequests = [
        {
            constructionKind: "place-name",
            formation: "n-imperfect-active",
            source: { embedStem: "chōca" },
            usage: "adverbial",
        },
        {
            constructionKind: "place-name",
            formation: "pan-connective-t",
            source: { embedStem: "Xāl" },
            usage: "adverbial",
        },
        {
            constructionKind: "place-name",
            formation: "c",
            source: { embedStem: "Te-cōā" },
            usage: "adverbial",
        },
        {
            constructionKind: "place-name",
            formation: "tlah",
            source: { embedStem: "Huexō" },
            usage: "adverbial",
        },
        {
            constructionKind: "place-name",
            formation: "ti-tlan",
            source: { embedStem: "Te-nōch" },
            usage: "adverbial",
        },
        {
            constructionKind: "place-name",
            formation: "chan-supplementation",
            source: { embedStem: "Cōātl" },
            usage: "adverbial",
        },
        {
            constructionKind: "gentilic",
            formation: "ca-pan-eca",
            source: { placeStem: "Izta-pan" },
            subject: "1sg",
            nounClass: "tl",
            animacy: "animate",
        },
        {
            constructionKind: "gentilic",
            formation: "ca-co-c-silent",
            source: { placeStem: "Mē-xi-h-co", placeMatrix: "co" },
            subject: "1sg",
            nounClass: "tl",
            animacy: "animate",
        },
    ];
    const representatives = representativeRequests.map(request => (
        ctx.evaluatePlaceGentilicNnc(request)
    ));
    s.eq("representative place and gentilic routes issue exact finite Results", {
        results: representatives.map(result => ({
            status: result.authorizationStatus,
            exact: ctx.isPlaceGentilicNncFrame(result),
            finite: Boolean(result.finiteFrame),
            formulaAuthority: result.formulaStringAuthority,
            surfaceAuthority: result.surfaceStringAuthority,
        })),
    }, {
        results: representatives.map(() => ({
            status: "authorized",
            exact: true,
            finite: true,
            formulaAuthority: false,
            surfaceAuthority: false,
        })),
    });

    const scalarRequest = representativeRequests[1];
    const scalar = ctx.requestClassicalPlaceGentilicResult(scalarRequest);
    const prepared = ctx.prepareClassicalPlaceGentilicParadigmPlan(
        scalarRequest
    );
    const projected = ctx.projectClassicalPlaceGentilicParadigmCoordinates(
        prepared
    );
    s.eq("prepared coordinates remain pointwise scalar-identical", {
        plan: prepared.authorizationStatus,
        count: projected.length,
        status: projected[0]?.authorizationStatus,
        parity: projected[0]?.scalarParity,
        formula: projected[0]?.formulaRealization,
        surface: projected[0]?.wordSurface,
    }, {
        plan: "authorized",
        count: 1,
        status: "authorized",
        parity: true,
        formula: scalar.formulaRealization,
        surface: scalar.wordSurface,
    });

    const canonicalClass = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic",
        formation: "ca-full-place",
        source: { placeStem: "Huexō-tlah" },
        subject: "1sg",
        nounClass: "tl",
        animacy: "animate",
    });
    const hostileClass = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic",
        formation: "ca-full-place",
        source: { placeStem: "Huexō-tlah" },
        subject: "1sg",
        nounClass: "zero",
        hiddenNounClass: "zero",
        animacy: "animate",
    });
    const evidenceOnly = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "profession-place-association",
        extensionKind: "title",
        lexicalId: "tlillan-calqui",
        subject: "3sg",
    });
    const hostile = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic",
        formula: "#FORGED#",
        resultSurface: "forged",
        lessonMetadata: { lesson: 48 },
    });
    const copied = JSON.parse(JSON.stringify(representatives[0]));
    s.eq("hidden class, evidence, copies, strings, and lesson metadata cannot authorize", {
        classIdentical: canonicalClass.formulaRealization
            === hostileClass.formulaRealization
            && canonicalClass.wordSurface === hostileClass.wordSurface,
        evidence: [
            evidenceOnly.authorizationStatus,
            evidenceOnly.blockReason,
            evidenceOnly.formationFrame?.evidenceSurface,
        ],
        issued: ctx.isPlaceGentilicNncFrame(representatives[0]),
        copy: ctx.isPlaceGentilicNncFrame(copied),
        hostile: [
            hostile.authorizationStatus,
            hostile.callerSuppliedAuthorityAccepted,
        ],
    }, {
        classIdentical: true,
        evidence: [
            "blocked",
            "canvas-title-has-no-typed-nnc-formula",
            "Tlīllān-calqui",
        ],
        issued: true,
        copy: false,
        hostile: ["blocked", false],
    });

    return s;
}

module.exports = { run };
