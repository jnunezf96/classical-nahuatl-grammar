"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const ATOM_IDS = Object.freeze([
    "ACI-P027-L027-F1AE271BAC",
    "ACI-P027-L028-8C453A112C",
    "ACI-P027-L029-11BC838CA2",
    "ACI-P028-L004-336CF18BAB",
    "ACI-P028-L004-336CF18BAB-02",
    "ACI-P028-L004-336CF18BAB-03",
    "ACI-P028-L004-336CF18BAB-04",
    "ACI-P028-L007-AF1513ED05",
    "ACI-P028-L007-AF1513ED05-02",
    "ACI-P028-L008-971DAE6FDD",
    "ACI-P028-L009-C219AF8581",
    "ACI-P028-L010-7DA7C5FBDF",
    "ACI-P028-L011-7B70C8EFD3",
    "ACI-P028-L013-74B969B74F",
    "ACI-P028-L013-74B969B74F-02",
    "ACI-P028-L013-74B969B74F-03",
    "ACI-P028-L013-74B969B74F-04",
    "ACI-P028-L013-74B969B74F-05",
    "ACI-P028-L015-44A676B55A",
    "ACI-P028-L016-238751CF7B",
    "ACI-P028-L017-BAE08C6C65",
    "ACI-P028-L019-07B63C439F",
    "ACI-P028-L022-62813AA00D",
]);

const FACT_VALUES = Object.freeze([
    "meaningless-structural-units-have-phoneme-phone-grapheme-or-graph-constituents",
    "sememes-are-absent-from-meaningless-carrier-unit-family",
    "sigemes-cannot-participate-in-meaningless-carrier-unit-family",
    "lower-ranked-carrier-units-normally-source-higher-ranked-carrier-units",
    "a-single-lower-ranked-carrier-unit-can-be-upgraded-to-a-higher-rank",
    "a-Classical-Nahuatl-syllable-has-a-vowel-phoneme-or-phone-at-its-center",
    "consonant-phonemes-or-phones-can-appear-in-fore-and-aft-margins",
    "syllable-structure-rules-are-language-specific",
    "syllables-belong-to-the-meaningless-carrier-hierarchy",
    "a-vocable-is-a-meaningless-unit-formed-from-one-or-more-syllables",
    "a-word-viewed-only-through-its-syllable-structure-is-treated-as-a-vocable",
    "normally-one-syllable-of-a-polysyllabic-vocable-is-pronounced-with-more-force",
    "phonotactic-rules-determine-possible-sequences-and-token-contact-changes",
    "syllables-and-vocables-establish-instance-level-phonological-surface-constraints",
    "english-example-syllables-are-li-throt-ri-and-ty",
    "english-example-syllables-concatenate-as-lithrotrity",
    "lithrotrity-is-an-english-vocable-analysis-independent-of-meaning",
    "pre-dictionary-vocable-status-is-a-pedagogical-judgment",
    "english-example-does-not-authorize-a-Classical-Nahuatl-lexical-item",
    "english-example-does-not-authorize-a-Classical-Nahuatl-phonotactic-result",
]);

const ROUTES = Object.freeze({
    meaningless: "classical.carrier.meaningless-unit.classify",
    rank: "classical.carrier.rank.taxonomy.classify",
    formation: "classical.carrier.rank.form",
    syllable: "classical.carrier.syllable.compose",
    vocable: "classical.carrier.vocable.compose",
    prosody: "classical.carrier.vocable.prosody.validate",
    phonotactic: "classical.carrier.phonotactic.constraints.validate",
});

function applyRoute(ctx, operationId, source) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        args: [source],
        languageId: "classical-nahuatl",
    });
}

function concept(ctx, domain, selection) {
    const source = ctx.buildClassicalGrammarConceptSource({ domain, selection });
    return applyRoute(ctx, "concept:classification", source).canonicalResult;
}

function rank(ctx, subsystem, rankTier) {
    const source = ctx.buildClassicalCarrierRankTaxonomySource({ subsystem, rankTier });
    return applyRoute(ctx, ROUTES.rank, source).canonicalResult;
}

function segment(ctx, carrierKind, segmentClass) {
    const classificationResult = carrierKind === "phone"
        ? concept(ctx, "phone-repertory-analysis", "phone-definition")
        : concept(ctx, "linguistic-element", "phoneme");
    return ctx.evaluateClassicalCarrierSegmentInstance(
        ctx.buildClassicalCarrierSegmentInstanceSource({
            carrierKind,
            segmentClass,
            classificationResult,
        })
    );
}

function syllable(ctx, requestedAnalysisKind, {
    center = segment(ctx, "phoneme", "vowel"),
    fore = [segment(ctx, "phoneme", "consonant")],
    aft = [segment(ctx, "phone", "consonant")],
} = {}) {
    const source = ctx.buildClassicalSyllableStructureSource({
        analysisDomain: "classical-syllable-structure",
        requestedAnalysisKind,
        prerequisites: {
            centerSegmentResult: center,
            foreMarginSegmentResults: fore,
            aftMarginSegmentResults: aft,
            lowestRankResult: rank(ctx, "phonological", "lowest"),
            syllableRankResult: rank(ctx, "phonological", "syllable"),
        },
    });
    const ownerResult = ctx.evaluateClassicalSyllableStructure(source);
    return { ...applyRoute(ctx, ROUTES.syllable, source), ownerResult };
}

function vocable(ctx, requestedAnalysisKind, syllableResults) {
    const source = ctx.buildClassicalCarrierVocableStructureSource({
        analysisDomain: "carrier-vocable-structure",
        requestedAnalysisKind,
        prerequisites: {
            syllableResults,
            vocableRankResult: rank(ctx, "phonological", "vocable"),
        },
    });
    const ownerResult = ctx.evaluateClassicalCarrierVocableStructure(source);
    return { ...applyRoute(ctx, ROUTES.vocable, source), ownerResult };
}

function formation(ctx, requestedAnalysisKind, sourceUnitResult, targetUnitResult) {
    const source = ctx.buildClassicalCarrierRankFormationSource({
        analysisDomain: "carrier-rank-formation",
        requestedAnalysisKind,
        prerequisites: { sourceUnitResult, targetUnitResult },
    });
    const ownerResult = ctx.evaluateClassicalCarrierRankFormation(source);
    return { ...applyRoute(ctx, ROUTES.formation, source), ownerResult };
}

function prosody(ctx, vocableResult, participantChoice) {
    const source = ctx.buildClassicalCarrierVocableProsodySource({
        analysisDomain: "carrier-vocable-prosody",
        requestedAnalysisKind: "polysyllabic-stress",
        prerequisites: { vocableResult },
        participantChoice,
    });
    const ownerResult = ctx.evaluateClassicalCarrierVocableProsody(source);
    return { ...applyRoute(ctx, ROUTES.prosody, source), ownerResult };
}

function phonotactic(ctx, requestedAnalysisKind, carrierStructureResult) {
    const source = ctx.buildClassicalCarrierPhonotacticSurfaceConstraintsSource({
        analysisDomain: "carrier-phonotactic-surface-constraints",
        requestedAnalysisKind,
        prerequisites: { carrierStructureResult },
    });
    const ownerResult = ctx.evaluateClassicalCarrierPhonotacticSurfaceConstraints(source);
    return { ...applyRoute(ctx, ROUTES.phonotactic, source), ownerResult };
}

function readMutationProbe() {
    const conceptsPath = path.join(ROOT, "src/core/concepts/concepts.mjs");
    const mechanicsPath = path.join(ROOT, "src/core/concepts/carrier_structure_owner_mechanics.mjs");
    const specDirectory = path.join(ROOT, "src/core/concepts/carrier-structure-owner-specs");
    const specFiles = [
        "carrier-rank-formation.mjs",
        "classical-syllable-structure.mjs",
        "carrier-vocable-structure.mjs",
        "carrier-vocable-prosody.mjs",
        "carrier-phonotactic-surface-constraints.mjs",
    ].map(name => path.join(specDirectory, name));
    const script = `
        const fs = await import("node:fs");
        const path = await import("node:path");
        const url = await import("node:url");
        const conceptsPath = ${JSON.stringify(conceptsPath)};
        const mechanicsPath = ${JSON.stringify(mechanicsPath)};
        const specPaths = ${JSON.stringify(specFiles)};
        const factValues = ${JSON.stringify(FACT_VALUES)};
        const absolutize = (source, sourcePath) => source.replace(
            /from\\s+(["'])(\\.{1,2}\\/[^"']+)\\1/gu,
            (_match, quote, relativePath) => "from " + quote
                + url.pathToFileURL(path.resolve(path.dirname(sourcePath), relativePath)).href
                + quote
        );
        const loadSource = async (source, sourcePath, tag) => import(
            "data:text/javascript;base64,"
            + Buffer.from(absolutize(source, sourcePath)).toString("base64")
            + "#lesson1-meaningless-" + tag
        );
        const mutateFacts = source => factValues.reduce((current, value) => {
            const next = current.replaceAll('"' + value + '"', '"broken-' + value + '"');
            return next;
        }, source);
        let mutatedConceptSource = mutateFacts(fs.readFileSync(conceptsPath, "utf8"));
        for (const rankId of ["stress-group", "phoneme-phone", "punctuation-group", "grapheme-graph"]) {
            mutatedConceptSource = mutatedConceptSource.replaceAll(
                'rankId: "' + rankId + '"', 'rankId: "broken-' + rankId + '"'
            );
        }
        const conceptModule = await loadSource(
            mutatedConceptSource, conceptsPath, "concept-facts"
        );
        const conceptApi = conceptModule.createConceptsApi({});
        const originalConceptModule = await import(url.pathToFileURL(conceptsPath).href + "?lesson1-meaningless-normal");
        const normalConceptApi = originalConceptModule.createConceptsApi({});
        const mechanicsModule = await import(url.pathToFileURL(mechanicsPath).href);
        const mutatedSpecs = [];
        for (const [index, specPath] of specPaths.entries()) {
            const module = await loadSource(
                mutateFacts(fs.readFileSync(specPath, "utf8")), specPath, "spec-" + index
            );
            mutatedSpecs.push(module.default);
        }
        const factApi = mechanicsModule.createCarrierStructureOwnerMechanicsApi(
            normalConceptApi, mutatedSpecs
        );

        let boundarySource = fs.readFileSync(mechanicsPath, "utf8");
        const replacements = [
            ['center.segmentClass !== "vowel"', 'false && center.segmentClass !== "vowel"'],
            ['margins.some((item) => !item || item.segmentClass !== "consonant")', 'false && margins.some((item) => !item || item.segmentClass !== "consonant")'],
            ['source.rankOrdinal >= target.rankOrdinal', 'false && source.rankOrdinal >= target.rankOrdinal'],
            ['target.constituentCount !== 1', 'false && target.constituentCount !== 1'],
            ['details?.constituentCount > 1', 'details?.constituentCount >= 1'],
        ];
        for (const [from, to] of replacements) {
            const next = boundarySource.replace(from, to);
            if (next === boundarySource) throw new Error("boundary mutation did not apply: " + from);
            boundarySource = next;
        }
        const boundaryModule = await loadSource(boundarySource, mechanicsPath, "boundaries");
        const originalSpecs = await Promise.all(specPaths.map(specPath =>
            import(url.pathToFileURL(specPath).href).then(module => module.default)
        ));
        const boundaryApi = boundaryModule.createCarrierStructureOwnerMechanicsApi(
            normalConceptApi, originalSpecs
        );

        const concept = (api, domain, selection) => api.evaluateClassicalGrammarConcept(
            api.buildClassicalGrammarConceptSource({ domain, selection })
        );
        const rank = (api, subsystem, rankTier) => api.evaluateClassicalCarrierRankTaxonomy(
            api.buildClassicalCarrierRankTaxonomySource({ subsystem, rankTier })
        );
        const segment = (api, carrierKind, segmentClass) => api.evaluateClassicalCarrierSegmentInstance(
            api.buildClassicalCarrierSegmentInstanceSource({
                carrierKind,
                segmentClass,
                classificationResult: carrierKind === "phone"
                    ? concept(normalConceptApi, "phone-repertory-analysis", "phone-definition")
                    : concept(normalConceptApi, "linguistic-element", "phoneme"),
            })
        );
        const syllable = (api, kind, center, margins = []) => api.evaluateClassicalSyllableStructure(
            api.buildClassicalSyllableStructureSource({
                analysisDomain: "classical-syllable-structure",
                requestedAnalysisKind: kind,
                prerequisites: {
                    centerSegmentResult: center,
                    foreMarginSegmentResults: margins,
                    aftMarginSegmentResults: [],
                    lowestRankResult: rank(normalConceptApi, "phonological", "lowest"),
                    syllableRankResult: rank(normalConceptApi, "phonological", "syllable"),
                },
            })
        );
        const vocable = (api, kind, syllables) => api.evaluateClassicalCarrierVocableStructure(
            api.buildClassicalCarrierVocableStructureSource({
                analysisDomain: "carrier-vocable-structure",
                requestedAnalysisKind: kind,
                prerequisites: {
                    syllableResults: syllables,
                    vocableRankResult: rank(normalConceptApi, "phonological", "vocable"),
                },
            })
        );
        const vowel = segment(boundaryApi, "phoneme", "vowel");
        const consonant = segment(boundaryApi, "phoneme", "consonant");
        const boundarySyllable = syllable(boundaryApi, "vowel-center", vowel);
        const boundarySyllable2 = syllable(boundaryApi, "vowel-center", vowel);
        const monoVocable = vocable(boundaryApi, "syllable-formed-vocable", [boundarySyllable]);
        const polyVocable = vocable(boundaryApi, "syllable-formed-vocable", [boundarySyllable, boundarySyllable2]);
        const reverseFormation = boundaryApi.evaluateClassicalCarrierRankFormation(
            boundaryApi.buildClassicalCarrierRankFormationSource({
                analysisDomain: "carrier-rank-formation",
                requestedAnalysisKind: "normal-lower-rank-source",
                prerequisites: { sourceUnitResult: boundarySyllable, targetUnitResult: vowel },
            })
        );
        const invalidSingleUpgrade = boundaryApi.evaluateClassicalCarrierRankFormation(
            boundaryApi.buildClassicalCarrierRankFormationSource({
                analysisDomain: "carrier-rank-formation",
                requestedAnalysisKind: "single-unit-rank-upgrade",
                prerequisites: { sourceUnitResult: boundarySyllable, targetUnitResult: polyVocable },
            })
        );
        const consonantCenter = syllable(boundaryApi, "vowel-center", consonant);
        const vowelMargin = syllable(boundaryApi, "consonant-margins", vowel, [vowel]);
        const monoStress = boundaryApi.evaluateClassicalCarrierVocableProsody(
            boundaryApi.buildClassicalCarrierVocableProsodySource({
                analysisDomain: "carrier-vocable-prosody",
                requestedAnalysisKind: "polysyllabic-stress",
                prerequisites: { vocableResult: monoVocable },
                participantChoice: 0,
            })
        );

        const factVowel = segment(factApi, "phoneme", "vowel");
        const factConsonant = segment(factApi, "phoneme", "consonant");
        const factSyllables = Object.fromEntries([
            "vowel-center", "consonant-margins", "language-specific-structure", "meaningless-unit",
        ].map(kind => [kind, syllable(factApi, kind, factVowel, [factConsonant])]));
        const factVocable = Object.fromEntries([
            "syllable-formed-vocable", "word-syllable-perspective",
        ].map(kind => [kind, vocable(factApi, kind, [factSyllables["vowel-center"]])]));
        const factPoly = vocable(factApi, "syllable-formed-vocable", [
            factSyllables["vowel-center"], syllable(factApi, "vowel-center", factVowel),
        ]);
        const factProsody = factApi.evaluateClassicalCarrierVocableProsody(
            factApi.buildClassicalCarrierVocableProsodySource({
                analysisDomain: "carrier-vocable-prosody",
                requestedAnalysisKind: "polysyllabic-stress",
                prerequisites: { vocableResult: factPoly }, participantChoice: 0,
            })
        );
        const factPhonotactic = Object.fromEntries([
            ["language-specific-vocable-rules", factSyllables["vowel-center"]],
            ["meaningful-surface-conformance", factVocable["syllable-formed-vocable"]],
        ].map(([kind, result]) => [kind, factApi.evaluateClassicalCarrierPhonotacticSurfaceConstraints(
            factApi.buildClassicalCarrierPhonotacticSurfaceConstraintsSource({
                analysisDomain: "carrier-phonotactic-surface-constraints",
                requestedAnalysisKind: kind,
                prerequisites: { carrierStructureResult: result },
            })
        )]));
        process.stdout.write(JSON.stringify({
            conceptFacts: {
                meaningless: (() => {
                    const candidate = concept(conceptApi, "linguistic-element", "phoneme");
                    return conceptApi.evaluateClassicalMeaninglessCarrierUnitClassification(
                        conceptApi.buildClassicalMeaninglessCarrierUnitClassificationSource({ candidateResult: candidate })
                    ).facts;
                })(),
                english: concept(conceptApi, "structure", "english-lithrotrity-example"),
                taxonomy: ["phonological", "graphological"].flatMap(subsystem =>
                    ["highest", "vocable", "syllable", "lowest"].map(rankTier => {
                        const value = rank(conceptApi, subsystem, rankTier);
                        return [value.subsystem, value.rankTier, value.rankId, value.rankOrdinal];
                    })
                ),
            },
            factResults: {
                syllables: factSyllables,
                vocables: factVocable,
                prosody: factProsody,
                phonotactic: factPhonotactic,
            },
            boundaryResults: {
                reverseFormation: reverseFormation.authorizationStatus,
                invalidSingleUpgrade: invalidSingleUpgrade.authorizationStatus,
                consonantCenter: consonantCenter.authorizationStatus,
                vowelMargin: vowelMargin.authorizationStatus,
                monoStress: monoStress.authorizationStatus,
            },
        }));
    `;
    const result = spawnSync(process.execPath, ["--input-type=module", "--eval", script], {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 30 * 1024 * 1024,
    });
    if (result.status !== 0) throw new Error(result.stderr || "meaningless structure mutation probe failed");
    return JSON.parse(result.stdout);
}

function run(ctx) {
    const s = createSuite("classical_lesson1_meaningless_structure_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => record.canvasSection.startsWith("§1.11.1"));

    const candidates = {
        phoneme: concept(ctx, "linguistic-element", "phoneme"),
        phone: concept(ctx, "phone-repertory-analysis", "phone-definition"),
        grapheme: concept(ctx, "linguistic-element", "grapheme"),
        graph: concept(ctx, "graph-variant-analysis", "graph-definition"),
        sigeme: concept(ctx, "linguistic-element", "sigeme"),
        sememe: concept(ctx, "linguistic-element", "sememe"),
    };
    const meaningless = Object.fromEntries(Object.entries(candidates).map(([key, candidateResult]) => {
        const source = ctx.buildClassicalMeaninglessCarrierUnitClassificationSource({ candidateResult });
        const ownerResult = ctx.evaluateClassicalMeaninglessCarrierUnitClassification(source);
        return [key, { ...applyRoute(ctx, ROUTES.meaningless, source), ownerResult }];
    }));
    const taxonomy = ["phonological", "graphological"].flatMap(subsystem =>
        ["highest", "vocable", "syllable", "lowest"].map(rankTier => rank(ctx, subsystem, rankTier))
    );
    const vowel = segment(ctx, "phoneme", "vowel");
    const consonant = segment(ctx, "phoneme", "consonant");
    const phoneVowel = segment(ctx, "phone", "vowel");
    const syllables = {
        vowel: syllable(ctx, "vowel-center"),
        margins: syllable(ctx, "consonant-margins"),
        language: syllable(ctx, "language-specific-structure"),
        meaningless: syllable(ctx, "meaningless-unit"),
    };
    const consonantCenter = syllable(ctx, "vowel-center", {
        center: consonant, fore: [], aft: [],
    });
    const vowelMargin = syllable(ctx, "consonant-margins", {
        center: vowel, fore: [phoneVowel], aft: [],
    });
    const monoVocable = vocable(ctx, "syllable-formed-vocable", [syllables.vowel.canonicalResult]);
    const wordVocable = vocable(ctx, "word-syllable-perspective", [syllables.vowel.canonicalResult]);
    const secondSyllable = syllable(ctx, "vowel-center").canonicalResult;
    const polyVocable = vocable(ctx, "syllable-formed-vocable", [
        syllables.vowel.canonicalResult, secondSyllable,
    ]);
    const normalFormation = formation(ctx, "normal-lower-rank-source", vowel, syllables.vowel.canonicalResult);
    const upgradeFormation = formation(ctx, "single-unit-rank-upgrade", syllables.vowel.canonicalResult, monoVocable.canonicalResult);
    const reverseFormation = formation(ctx, "normal-lower-rank-source", syllables.vowel.canonicalResult, vowel);
    const invalidUpgrade = formation(ctx, "single-unit-rank-upgrade", syllables.vowel.canonicalResult, polyVocable.canonicalResult);
    const stress = prosody(ctx, polyVocable.canonicalResult, 0);
    const monoStress = prosody(ctx, monoVocable.canonicalResult, 0);
    const phonotacticRules = phonotactic(ctx, "language-specific-vocable-rules", polyVocable.canonicalResult);
    const surfaceConstraints = phonotactic(ctx, "meaningful-surface-conformance", syllables.vowel.canonicalResult);
    const english = concept(ctx, "structure", "english-lithrotrity-example");
    const mutation = readMutationProbe();

    s.eq(
        "section 1.11.1 gives all 23 atoms exact jobs, including non-grammar examples that only build or protect code",
        {
            ids: records.map(record => record.atomId),
            byJob: records.reduce((counts, record) => {
                counts[record.jobType] = (counts[record.jobType] || 0) + 1;
                return counts;
            }, {}),
            unassigned: records.filter(record => !record.observationKind).map(record => record.atomId),
        },
        {
            ids: ATOM_IDS,
            byJob: { BUILD_CODE_MODEL: 8, BUILD_GRAMMAR: 12, PROTECT_GRAMMAR: 3 },
            unassigned: [],
        }
    );

    const routeReceipts = [
        ...Object.values(meaningless).slice(0, 4),
        syllables.vowel,
        syllables.margins,
        monoVocable,
        stress,
        phonotacticRules,
        surfaceConstraints,
    ];
    s.eq(
        "the normal application path executes the meaningless carrier chain and blocks its wrong boundaries",
        {
            routes: routeReceipts.map(receipt => [
                receipt.authorizationStatus,
                Boolean(receipt.greatestCommonDivisor?.invariantProofs?.["semantic-operation-identity"]),
            ]),
            excluded: ["sigeme", "sememe"].map(key => [
                meaningless[key].ownerResult.authorizationStatus,
                meaningless[key].ownerResult.blockReason,
            ]),
            consonantCenter: [consonantCenter.ownerResult.authorizationStatus, consonantCenter.ownerResult.blockReason],
            vowelMargin: [vowelMargin.ownerResult.authorizationStatus, vowelMargin.ownerResult.blockReason],
            reverseFormation: reverseFormation.ownerResult.authorizationStatus,
            invalidUpgrade: invalidUpgrade.ownerResult.authorizationStatus,
            monoStress: monoStress.ownerResult.authorizationStatus,
        },
        {
            routes: Array(routeReceipts.length).fill(["authorized", true]),
            excluded: [
                ["blocked", "sigeme-cannot-participate-in-meaningless-carrier-unit-family"],
                ["blocked", "sememe-absent-from-meaningless-carrier-unit-family"],
            ],
            consonantCenter: ["blocked", "classical-syllable-structure-owner-issued-prerequisites-required"],
            vowelMargin: ["blocked", "classical-syllable-structure-owner-issued-prerequisites-required"],
            reverseFormation: "blocked",
            invalidUpgrade: "blocked",
            monoStress: "blocked",
        }
    );

    const observations = {
        "meaningless-unit-member-inventory": () => {
            const allowed = ["phoneme", "phone", "grapheme", "graph"];
            return allowed.every(key => meaningless[key].canonicalResult.authorizationStatus === "authorized")
                && allowed.every(key => meaningless[key].canonicalResult.facts.includes(FACT_VALUES[0]));
        },
        "sememe-and-sigeme-excluded": () => meaningless.sigeme.ownerResult.authorizationStatus === "blocked"
            && meaningless.sememe.ownerResult.authorizationStatus === "blocked",
        "carrier-rank-taxonomy": () => JSON.stringify(taxonomy.map(result => [
            result.subsystem, result.rankTier, result.rankId, result.rankOrdinal,
        ])) === JSON.stringify([
            ["phonological", "highest", "stress-group", 4],
            ["phonological", "vocable", "vocable", 3],
            ["phonological", "syllable", "syllable", 2],
            ["phonological", "lowest", "phoneme-phone", 1],
            ["graphological", "highest", "punctuation-group", 4],
            ["graphological", "vocable", "vocable", 3],
            ["graphological", "syllable", "syllable", 2],
            ["graphological", "lowest", "grapheme-graph", 1],
        ]),
        "lower-rank-normally-builds-higher-rank": () => normalFormation.canonicalResult.authorizationStatus === "authorized"
            && normalFormation.canonicalResult.sourceRankOrdinal === 1
            && normalFormation.canonicalResult.targetRankOrdinal === 2,
        "single-unit-rank-upgrade": () => upgradeFormation.canonicalResult.authorizationStatus === "authorized"
            && upgradeFormation.canonicalResult.sourceUnitUpgraded === true
            && upgradeFormation.canonicalResult.targetConstituentCount === 1,
        "vowel-unit-can-form-syllable": () => normalFormation.canonicalResult.sourceSegmentClass === "vowel"
            && normalFormation.canonicalResult.targetUnitRank === "syllable",
        "syllable-unit-can-form-vocable": () => upgradeFormation.canonicalResult.sourceUnitRank === "syllable"
            && upgradeFormation.canonicalResult.targetUnitRank === "vocable",
        "classical-syllable-vowel-center": () => syllables.vowel.canonicalResult.facts.includes(FACT_VALUES[5]),
        "english-syllabic-consonant-boundary": () => consonantCenter.ownerResult.authorizationStatus === "blocked",
        "classical-syllable-consonant-margins": () => syllables.margins.canonicalResult.facts.includes(FACT_VALUES[6]),
        "syllable-rules-language-specific": () => syllables.language.canonicalResult.facts.includes(FACT_VALUES[7])
            && consonantCenter.ownerResult.authorizationStatus === "blocked",
        "syllable-is-meaningless-unit": () => syllables.meaningless.canonicalResult.facts.includes(FACT_VALUES[8])
            && syllables.meaningless.canonicalResult.hierarchyFamily === "meaningless",
        "vocable-is-meaningless-syllable-unit": () => monoVocable.canonicalResult.facts.includes(FACT_VALUES[9])
            && monoVocable.canonicalResult.hierarchyFamily === "meaningless",
        "english-syllable-example-provenance": () => english.facts.includes(FACT_VALUES[14]),
        "english-example-concatenation": () => english.facts.includes(FACT_VALUES[15]),
        "english-example-vocable-analysis": () => english.facts.includes(FACT_VALUES[16]),
        "english-example-pedagogical-judgment": () => english.facts.includes(FACT_VALUES[17]),
        "english-example-non-authorizing": () => english.restrictions.includes(FACT_VALUES[18])
            && english.restrictions.includes(FACT_VALUES[19])
            && phonotactic(ctx, "language-specific-vocable-rules", english).ownerResult.authorizationStatus === "blocked",
        "word-syllable-view-is-vocable": () => wordVocable.canonicalResult.facts.includes(FACT_VALUES[10]),
        "monosyllable-can-be-vocable": () => monoVocable.canonicalResult.authorizationStatus === "authorized"
            && monoVocable.canonicalResult.constituentCount === 1
            && upgradeFormation.canonicalResult.authorizationStatus === "authorized",
        "polysyllabic-vocable-stress": () => stress.canonicalResult.facts.includes(FACT_VALUES[11])
            && stress.canonicalResult.stressedSyllableIndex === 0
            && monoStress.ownerResult.authorizationStatus === "blocked",
        "phonotactics-controls-vocable-structure": () => phonotacticRules.canonicalResult.facts.includes(FACT_VALUES[12]),
        "carrier-constraints-govern-meaningful-surface": () => surfaceConstraints.canonicalResult.facts.includes(FACT_VALUES[13]),
    };

    const mutationChecks = {
        "meaningless-unit-member-inventory": () => !mutation.conceptFacts.meaningless.includes(FACT_VALUES[0]),
        "sememe-and-sigeme-excluded": () => !mutation.conceptFacts.meaningless.includes(FACT_VALUES[1])
            && !mutation.conceptFacts.meaningless.includes(FACT_VALUES[2]),
        "carrier-rank-taxonomy": () => JSON.stringify(mutation.conceptFacts.taxonomy)
            !== JSON.stringify(taxonomy.map(result => [
                result.subsystem, result.rankTier, result.rankId, result.rankOrdinal,
            ])),
        "lower-rank-normally-builds-higher-rank": () => mutation.boundaryResults.reverseFormation === "authorized",
        "single-unit-rank-upgrade": () => mutation.boundaryResults.invalidSingleUpgrade === "authorized",
        "vowel-unit-can-form-syllable": () => mutation.boundaryResults.consonantCenter === "authorized",
        "syllable-unit-can-form-vocable": () => mutation.boundaryResults.invalidSingleUpgrade === "authorized",
        "classical-syllable-vowel-center": () => !mutation.factResults.syllables["vowel-center"].facts.includes(FACT_VALUES[5]),
        "english-syllabic-consonant-boundary": () => mutation.boundaryResults.consonantCenter === "authorized",
        "classical-syllable-consonant-margins": () => mutation.boundaryResults.vowelMargin === "authorized",
        "syllable-rules-language-specific": () => !mutation.factResults.syllables["language-specific-structure"].facts.includes(FACT_VALUES[7]),
        "syllable-is-meaningless-unit": () => !mutation.factResults.syllables["meaningless-unit"].facts.includes(FACT_VALUES[8]),
        "vocable-is-meaningless-syllable-unit": () => !mutation.factResults.vocables["syllable-formed-vocable"].facts.includes(FACT_VALUES[9]),
        "english-syllable-example-provenance": () => !mutation.conceptFacts.english.facts.includes(FACT_VALUES[14]),
        "english-example-concatenation": () => !mutation.conceptFacts.english.facts.includes(FACT_VALUES[15]),
        "english-example-vocable-analysis": () => !mutation.conceptFacts.english.facts.includes(FACT_VALUES[16]),
        "english-example-pedagogical-judgment": () => !mutation.conceptFacts.english.facts.includes(FACT_VALUES[17]),
        "english-example-non-authorizing": () => !mutation.conceptFacts.english.restrictions.includes(FACT_VALUES[18])
            && !mutation.conceptFacts.english.restrictions.includes(FACT_VALUES[19]),
        "word-syllable-view-is-vocable": () => !mutation.factResults.vocables["word-syllable-perspective"].facts.includes(FACT_VALUES[10]),
        "monosyllable-can-be-vocable": () => mutation.boundaryResults.invalidSingleUpgrade === "authorized",
        "polysyllabic-vocable-stress": () => mutation.boundaryResults.monoStress === "authorized",
        "phonotactics-controls-vocable-structure": () => !mutation.factResults.phonotactic["language-specific-vocable-rules"].facts.includes(FACT_VALUES[12]),
        "carrier-constraints-govern-meaningful-surface": () => !mutation.factResults.phonotactic["meaningful-surface-conformance"].facts.includes(FACT_VALUES[13]),
    };

    for (const record of records) {
        s.eq(
            `${record.atomId} has one exact normal job and a matching break test`,
            {
                atomId: record.atomId,
                exactObserved: observations[record.observationKind]?.() === true,
                mutationBreaksObservation: mutationChecks[record.observationKind]?.() === true,
            },
            {
                atomId: record.atomId,
                exactObserved: true,
                mutationBreaksObservation: true,
            }
        );
    }

    return s;
}

module.exports = { run };
