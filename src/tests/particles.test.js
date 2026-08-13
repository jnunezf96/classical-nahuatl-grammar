"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("particles");

    s.eq(
        "the duplicate particle metadata runtime is absent",
        [
            "getParticlePlacementFrames",
            "getParticleFunctionClassFrames",
            "buildParticlePlacementMetadata",
            "classifyParticleCandidate",
            "buildParticleInventoryBoundaryMetadata",
            "buildParticleModeDisplayModel",
            "getAndrewsLesson3ParticleSurface",
            "getParticleSeedInventoryEntries",
            "getParticleLesson3InventoryGroups",
            "findParticleSeedInventoryEntries",
            "buildClassicalNahuatlLesson3ProofFrame",
            "buildClassicalNahuatlLesson3FunctionalClassFrame",
            "buildClassicalNahuatlLesson3NegativizingParticleFrame",
            "buildClassicalNahuatlLesson3ParticleCollocationFrame",
            "buildClassicalNahuatlLesson3HonorificizedParticleFrame",
            "buildClassicalNahuatlLesson3ParticlesFrame",
        ].map(name => [name, typeof ctx[name]]),
        [
            ["getParticlePlacementFrames", "undefined"],
            ["getParticleFunctionClassFrames", "undefined"],
            ["buildParticlePlacementMetadata", "undefined"],
            ["classifyParticleCandidate", "undefined"],
            ["buildParticleInventoryBoundaryMetadata", "undefined"],
            ["buildParticleModeDisplayModel", "undefined"],
            ["getAndrewsLesson3ParticleSurface", "undefined"],
            ["getParticleSeedInventoryEntries", "undefined"],
            ["getParticleLesson3InventoryGroups", "undefined"],
            ["findParticleSeedInventoryEntries", "undefined"],
            ["buildClassicalNahuatlLesson3ProofFrame", "undefined"],
            ["buildClassicalNahuatlLesson3FunctionalClassFrame", "undefined"],
            ["buildClassicalNahuatlLesson3NegativizingParticleFrame", "undefined"],
            ["buildClassicalNahuatlLesson3ParticleCollocationFrame", "undefined"],
            ["buildClassicalNahuatlLesson3HonorificizedParticleFrame", "undefined"],
            ["buildClassicalNahuatlLesson3ParticlesFrame", "undefined"],
        ]
    );

    const ids = [
        "l3-cuix",
        "l3-in",
        "l3-mah",
        "l58-ahmo",
        "l58-mah-ca",
        "l58-quemahca",
        "l58-tia-cuel-ehhuatl",
    ];
    const sources = ids.map(particleId => (
        ctx.buildClassicalNahuatlParticleSourceFrame(particleId)
    ));
    const results = sources.map(sourceFrame => (
        ctx.buildClassicalNahuatlParticleResultFrame(sourceFrame)
    ));
    s.eq(
        "typed particle identities independently project exact written and formula results",
        results.map(result => [
            result.particleId,
            result.authorizationStatus,
            result.surface,
            result.formula,
            result.formulaSegments,
            Object.prototype.hasOwnProperty.call(
                result,
                "contextualVariants"
            ),
            ctx.isClassicalNahuatlParticleResultFrame(result),
            result.formulaStringAuthority,
            result.surfaceStringAuthority,
        ]),
        [
            ["l3-cuix", "authorized", "cuix", "cuix", ["cuix"], false, true, false, false],
            ["l3-in", "authorized", "in", "in", ["in"], false, true, false, false],
            ["l3-mah", "authorized", "mah", "mah", ["mah"], false, true, false, false],
            ["l58-ahmo", "authorized", "ahmō", "ahmō", ["ahmō"], false, true, false, false],
            ["l58-mah-ca", "authorized", "mah ca", "mah ca#", ["mah", "ca#"], false, true, false, false],
            ["l58-quemahca", "authorized", "quemahca", "quē mah ca#", ["quē", "mah", "ca#"], false, true, false, false],
            [
                "l58-tia-cuel-ehhuatl",
                "authorized",
                "tiā cuēl ehhuātl",
                "tiā cuēl ehhuātl",
                ["tiā", "cuēl", "ehhuātl"],
                false,
                true,
                false,
                false,
            ],
        ]
    );

    const canonical = results[1];
    const envelope =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            canonical,
            { referenceId: "typed-particle" }
        );
    const copied = { ...canonical };
    const hostile = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        copied,
        { referenceId: "typed-particle" }
    );
    s.eq(
        "only the owner-issued particle result composes into the shared supplementation path",
        {
            envelope: [
                envelope.authorizationStatus,
                envelope.unitKind,
                envelope.formulaRealization,
                envelope.surface,
            ],
            copiedParticleAccepted:
                ctx.isClassicalNahuatlParticleResultFrame(copied),
            hostile: [
                hostile.authorizationStatus,
                hostile.blockReason,
                hostile.formulaRealization,
                hostile.surface,
            ],
            unknown:
                ctx.buildClassicalNahuatlParticleResultFrame(
                    "l99-stored-answer"
                ).authorizationStatus,
        },
        {
            envelope: ["authorized", "particle", "in", "in"],
            copiedParticleAccepted: false,
            hostile: [
                "blocked",
                "authorized-canonical-nuclear-clause-required",
                "",
                "",
            ],
            unknown: "blocked",
        }
    );

    const antecessive = ctx.buildClassicalNahuatlParticleResultFrame(
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-o-antecessive")
    );
    const antecessivePreterit = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
        subject: "1sg",
        mood: "indicative",
        tense: "preterit",
        verbClass: "B",
        valence: "intransitive",
        antecessive: true,
    });
    const antecessivePresentMutation = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
        valence: "intransitive",
        antecessive: true,
    });
    const atResult = ctx.buildClassicalNahuatlParticleResultFrame(
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-at")
    );
    const acResult = ctx.buildClassicalNahuatlParticleResultFrame(
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-ac")
    );
    const ocResult = ctx.buildClassicalNahuatlParticleResultFrame(
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-oc")
    );
    s.eq("particle results expose and enforce antecessive boundary, tense, placement, translation, and lexical-variant grammar", {
        antecessiveFormula: antecessive.formula,
        antecessiveProfile: antecessive.lexicalFactFrame.antecessiveProfile,
        pastApplication: [antecessivePreterit.authorizationStatus, antecessivePreterit.expandedVncBoundaryFrame.outsidePrefixes],
        presentMutation: [antecessivePresentMutation.authorizationStatus, antecessivePresentMutation.expandedVncBoundaryFrame.antecessiveTenseAuthorized],
        atAc: [atResult.lexicalFactFrame.meanings, atResult.lexicalFactFrame.usageFacts, acResult.lexicalFactFrame.meanings, acResult.lexicalFactFrame.usageFacts],
        ocMeanings: ocResult.lexicalFactFrame.meanings,
    }, {
        antecessiveFormula: "ō#",
        antecessiveProfile: {
            pronunciationAttachment: "obligatory-to-following-item",
            writingAttachment: "obligatory-to-following-item",
            boundaryNotation: "hash-marks-obligatory-attachment-to-following-item",
            licensedTenseDomain: ["preterit", "imperfect", "past-optative"],
            placementRelativeToPastVnc: ["immediate", "nonimmediate"],
            defaultEnglishTensePreference: "perfect",
            untranslatedWhenPerfectRenderingUnwarranted: true,
        },
        pastApplication: ["authorized", ["ō#"]],
        presentMutation: ["blocked", false],
        atAc: [
            ["perhaps", "maybe"],
            ["variant of ac", "distinct from interrogative pronoun āc"],
            ["perhaps", "maybe"],
            ["variant of at", "distinct from interrogative pronoun āc"],
        ],
        ocMeanings: ["still", "yet", "for a little while", "else", "besides"],
    });
    const inTlaZa = ctx.buildClassicalNahuatlParticleResultFrame(
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-in-tla-za")
    );
    const ahzaZo = ctx.buildClassicalNahuatlParticleResultFrame(
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-ahza-zo")
    );
    s.eq("collocation Results preserve compositional-member limits and epistemic value", {
        inTlaZa: {
            formulaSegments: inTlaZa.formulaSegments,
            usageFacts: inTlaZa.lexicalFactFrame.usageFacts,
            containsAndMorph: inTlaZa.formulaSegments.includes("auh"),
            containsButMorph: inTlaZa.formulaSegments.includes("but"),
        },
        ahzaZo: {
            formulaSegments: ahzaZo.formulaSegments,
            meanings: ahzaZo.lexicalFactFrame.meanings,
        },
    }, {
        inTlaZa: {
            formulaSegments: ["in", "tlā", "zā"],
            usageFacts: ["no particle member means and or but"],
            containsAndMorph: false,
            containsButMorph: false,
        },
        ahzaZo: {
            formulaSegments: ["ah#", "zā", "zo"],
            meanings: ["perhaps", "maybe"],
        },
    });

    const honorificResults = [
        "l3-otzin",
        "l3-auhtzin",
        "l3-ca-no-zotzin",
    ].map(targetId => {
        const source =
            ctx.buildClassicalNahuatlParticleHonorificSourceFrame({
                targetId,
            });
        return ctx.evaluateClassicalNahuatlParticleHonorificFormation(
            source
        );
    });
    s.eq(
        "particle honorifics derive from typed base particles and attach tzin to the final member",
        honorificResults.map(result => ({
            targetId: result.targetId,
            status: result.authorizationStatus,
            bases: result.baseParticleResultFrames.map(base => base.particleId),
            formula: result.formula,
            surface: result.surface,
            scope: result.collocationScope,
            issued: ctx.isClassicalNahuatlParticleHonorificResultFrame(result),
            storedSurfaceAuthority: result.storedTargetSurfaceAuthority,
        })),
        [
            {
                targetId: "l3-otzin",
                status: "authorized",
                bases: ["l3-o-behold"],
                formula: "ōtzin",
                surface: "ōtzin",
                scope: "single-particle",
                issued: true,
                storedSurfaceAuthority: false,
            },
            {
                targetId: "l3-auhtzin",
                status: "authorized",
                bases: ["l3-auh-interjection"],
                formula: "āuhtzin",
                surface: "āuhtzin",
                scope: "single-particle",
                issued: true,
                storedSurfaceAuthority: false,
            },
            {
                targetId: "l3-ca-no-zotzin",
                status: "authorized",
                bases: ["l3-ca", "l3-no-adverbial", "l3-zo"],
                formula: "ca no zotzin",
                surface: "ca no zotzin",
                scope: "entire-collocation",
                issued: true,
                storedSurfaceAuthority: false,
            },
        ]
    );

    const honorificSource =
        ctx.buildClassicalNahuatlParticleHonorificSourceFrame({
            targetId: "l3-otzin",
        });
    const copiedHonorific =
        ctx.evaluateClassicalNahuatlParticleHonorificFormation({
            ...honorificSource,
        });
    const storedSurfaceRequest =
        ctx.buildClassicalNahuatlParticleHonorificSourceFrame({
            targetId: "l3-otzin",
            surface: "ōtzin",
        });
    s.eq(
        "particle honorific formation rejects copied sources and stored surfaces",
        {
            copied: [
                copiedHonorific.authorizationStatus,
                copiedHonorific.blockReason,
                copiedHonorific.surface,
            ],
            stored: [
                storedSurfaceRequest.authorizationStatus,
                storedSurfaceRequest.blockReason,
            ],
        },
        {
            copied: [
                "blocked",
                "owner-issued-classical-particle-honorific-source-required",
                "",
            ],
            stored: [
                "blocked",
                "classical-particle-honorific-typed-request-required",
            ],
        }
    );

    return s;
}

module.exports = { run };
