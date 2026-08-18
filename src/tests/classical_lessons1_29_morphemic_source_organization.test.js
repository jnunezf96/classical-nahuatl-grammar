"use strict";

const { createSuite } = require("./runner");

function buildSource(ctx, stem, verbClass, sourceValence) {
    const transitive = sourceValence !== "intransitive";
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: transitive ? "transitive" : "intransitive",
        objectKind: transitive ? "specific-projective" : "none",
        objectPerson: transitive ? "3sg" : "",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons1_29_morphemic_source_organization");

    const profiles = [
        ["miqui", "B", "intransitive"],
        ["cual-ā-ni", "B", "intransitive"],
        ["te-ti-ya", "A", "intransitive"],
        ["xo-xō-hui-ya", "A", "intransitive"],
        ["chol-o-ā", "C", "intransitive"],
        ["caqui-tiā", "C", "specific-projective"],
        ["pah-ti-ā", "C", "specific-projective"],
    ].map(([stem, verbClass, sourceValence]) => {
        const identity = ctx.buildClassicalNahuatlActiveStemIdentityFrame(
            stem,
            { verbClass, sourceValence }
        );
        const profile = identity.internalMorphology.morphemicSourceProfile;
        return {
            stem,
            status: profile.authorizationStatus,
            complexity: profile.morphemicComplexity,
            families: profile.boundaryFamilies,
            sourceClass: profile.sourceClass,
            sourceValence: profile.sourceValence,
            exampleAuthority: profile.canvasExampleAuthority,
            routeAuthorizationByExampleIdentity:
                profile.routeAuthorizationByExampleIdentity,
        };
    });

    s.eq(
        "Accepted rules organize monomorphemic and polymorphemic typed Sources without making examples authoritative",
        profiles,
        [
            {
                stem: "miqui",
                status: "authorized",
                complexity: "monomorphemic",
                families: [],
                sourceClass: "B",
                sourceValence: "intransitive",
                exampleAuthority: false,
                routeAuthorizationByExampleIdentity: false,
            },
            {
                stem: "cual-ā-ni",
                status: "authorized",
                complexity: "polymorphemic",
                families: ["X-V-ni"],
                sourceClass: "B",
                sourceValence: "intransitive",
                exampleAuthority: false,
                routeAuthorizationByExampleIdentity: false,
            },
            {
                stem: "te-ti-ya",
                status: "authorized",
                complexity: "polymorphemic",
                families: ["X-ya", "X-ti-ya"],
                sourceClass: "A",
                sourceValence: "intransitive",
                exampleAuthority: false,
                routeAuthorizationByExampleIdentity: false,
            },
            {
                stem: "xo-xō-hui-ya",
                status: "authorized",
                complexity: "polymorphemic",
                families: ["X-ya", "X-hui-ya"],
                sourceClass: "A",
                sourceValence: "intransitive",
                exampleAuthority: false,
                routeAuthorizationByExampleIdentity: false,
            },
            {
                stem: "chol-o-ā",
                status: "authorized",
                complexity: "polymorphemic",
                families: ["X-ā", "X-o-ā"],
                sourceClass: "C",
                sourceValence: "intransitive",
                exampleAuthority: false,
                routeAuthorizationByExampleIdentity: false,
            },
            {
                stem: "caqui-tiā",
                status: "authorized",
                complexity: "polymorphemic",
                families: ["X-tiā"],
                sourceClass: "C",
                sourceValence: "specific-projective",
                exampleAuthority: false,
                routeAuthorizationByExampleIdentity: false,
            },
            {
                stem: "pah-ti-ā",
                status: "authorized",
                complexity: "polymorphemic",
                families: ["X-ā", "X-ti-ā"],
                sourceClass: "C",
                sourceValence: "specific-projective",
                exampleAuthority: false,
                routeAuthorizationByExampleIdentity: false,
            },
        ]
    );

    const lesson7Source = buildSource(ctx, "te-ti-ya", "A", "intransitive");
    const lesson7SourceAnalysis =
        ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
            lesson7Source
        );
    s.eq(
        "Lesson 7 class grammar and the shared Source analysis describe the same typed verbstem",
        {
            sourceStatus: lesson7Source.authorizationStatus,
            analysisStatus: lesson7SourceAnalysis.authorizationStatus,
            lesson7Stem: lesson7Source.classTargetStem,
            profileStem:
                lesson7SourceAnalysis.morphemicSourceProfile.sourceStem,
            lesson7Class: lesson7Source.classId,
            profileClass:
                lesson7SourceAnalysis.morphemicSourceProfile.sourceClass,
            lesson7Valence: lesson7Source.classTargetValence,
            profileValence:
                lesson7SourceAnalysis.morphemicSourceProfile.sourceValence,
            shapeRule:
                lesson7Source.classProfile.classGuidelineRuleId,
            structuralRule:
                lesson7Source.classProfile.classDeterminedByGeneralFormRule,
            examplesAreNotWhitelist:
                lesson7Source.classProfile.canvasExamplesAreWitnessesNotWhitelist,
        },
        {
            sourceStatus: "authorized",
            analysisStatus: "authorized",
            lesson7Stem: "te-ti-ya",
            profileStem: "te-ti-ya",
            lesson7Class: "A",
            profileClass: "A",
            lesson7Valence: "intransitive",
            profileValence: "intransitive",
            shapeRule: "cn-l7-766-final-ya-b",
            structuralRule: true,
            examplesAreNotWhitelist: true,
        }
    );

    const lesson20CandidateSet =
        ctx.buildClassicalNahuatlProductiveCandidateSet("paca", {
            verbClass: "A",
            sourceValence: "intransitive",
        });
    s.eq(
        "Lesson 20 and the shared Source profile must agree before a productive nonactive route is used",
        {
            agreement: lesson20CandidateSet.sourceShapeAgreement,
            source: lesson20CandidateSet.morphemicSourceProfile.sourceStem,
            sourceClass:
                lesson20CandidateSet.morphemicSourceProfile.sourceClass,
            sourceValence:
                lesson20CandidateSet.morphemicSourceProfile.sourceValence,
            routesUseSharedSource: lesson20CandidateSet.resolvedOptions.every(
                option => option.productiveSourceAuthority
                    === "typed-morphemic-source-profile"
            ),
        },
        {
            agreement: true,
            source: "paca",
            sourceClass: "A",
            sourceValence: "intransitive",
            routesUseSharedSource: true,
        }
    );

    const unlistedSource = buildSource(ctx, "moli", "B", "intransitive");
    const unlistedInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            unlistedSource,
            { derivationType: "causative" }
        );
    const unlistedHuaRoute = unlistedInventory.options.find(option => (
        option.derivationRoute === "type-two-tia-from-hua-nonactive"
    )) || null;
    s.eq(
        "An unlisted same-shaped Source receives the accepted productive hua-to-tia rule",
        {
            status: unlistedInventory.authorizationStatus,
            targetStem: unlistedHuaRoute?.targetStem || "",
            formationRuleTier: unlistedHuaRoute?.formationRuleTier || "",
            exactWitness: unlistedHuaRoute?.exactWitness === true,
            sourceAgreement: unlistedHuaRoute?.sourceShapeAgreement,
            productiveSourceAuthority:
                unlistedHuaRoute?.productiveSourceAuthority || "",
            profileSource:
                unlistedHuaRoute?.morphemicSourceProfile?.sourceStem || "",
            exampleAuthority:
                unlistedHuaRoute?.sourceInternalMorphology
                    ?.morphemicSourceProfile?.canvasExampleAuthority,
        },
        {
            status: "authorized",
            targetStem: "molī-tiā",
            formationRuleTier: "typed-nonactive-category-rule",
            exactWitness: false,
            sourceAgreement: true,
            productiveSourceAuthority: "typed-morphemic-source-profile",
            profileSource: "moli",
            exampleAuthority: false,
        }
    );

    const homophonousSource = buildSource(ctx, "caqui", "B", "intransitive");
    const homophonousInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            homophonousSource,
            { derivationType: "causative" }
        );
    const shapeRoute = homophonousInventory.options.find(option => (
        option.derivationRoute === "type-two-tia-from-o-hua-nonactive"
    )) || null;
    s.eq(
        "A Canvas witness spelling does not block a differently typed Source from its productive route",
        {
            status: homophonousInventory.authorizationStatus,
            targetStem: shapeRoute?.targetStem || "",
            exactWitness: shapeRoute?.exactWitness === true,
            formationRuleTier: shapeRoute?.formationRuleTier || "",
        },
        {
            status: "authorized",
            targetStem: "cac-tiā",
            exactWitness: false,
            formationRuleTier: "typed-nonactive-category-rule",
        }
    );

    const structuralLesson25Rows = [
        ["paca", "A", "intransitive", "paquī-tiā"],
        ["tēci", "B", "intransitive", "texī-tiā"],
        ["caza", "A", "intransitive", "caxī-tiā"],
        ["xat-a", "A", "specific-projective", "xat-ī-tiā"],
    ].map(([stem, verbClass, sourceValence, expectedTarget]) => {
        const source = buildSource(ctx, stem, verbClass, sourceValence);
        const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
            source,
            { derivationType: "causative" }
        );
        const option = inventory.options.find(candidate => (
            candidate.targetStem === expectedTarget
            && candidate.typeTwoInternalBridgeFrame
                ?.sourceMatchAuthority
                === "typed-morphemic-source-structure"
        )) || null;
        return {
            stem,
            expectedTarget,
            targetPresent: Boolean(option),
            exactWitness: option?.exactWitness === true,
            formationRuleTier: option?.formationRuleTier || "",
            exampleAuthority:
                option?.typeTwoInternalBridgeFrame
                    ?.sourceMatchAuthority || "",
        };
    });
    s.eq(
        "Lesson 25 hua routes generalize from accepted final-shape families to unlisted typed Sources",
        structuralLesson25Rows,
        [
            ["paca", "paquī-tiā"],
            ["tēci", "texī-tiā"],
            ["caza", "caxī-tiā"],
            ["xat-a", "xat-ī-tiā"],
        ].map(([stem, expectedTarget]) => ({
            stem,
            expectedTarget,
            targetPresent: true,
            exactWitness: false,
            formationRuleTier:
                "typed-morphemic-internal-nonactive-prerequisite",
            exampleAuthority: "typed-morphemic-source-structure",
        }))
    );

    const fusedSource = buildSource(ctx, "mīni", "B", "intransitive");
    const fusedAnalysis =
        ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
            fusedSource
        );
    s.eq(
        "Surface fusion preserves the fuller polymorphemic Source analysis",
        {
            status: fusedAnalysis.authorizationStatus,
            observedComplexity:
                fusedAnalysis.morphemicSourceProfile
                    .observedMorphemicComplexity,
            sourceComplexity:
                fusedAnalysis.morphemicSourceProfile.morphemicComplexity,
            fused:
                fusedAnalysis.morphemicSourceProfile
                    .fusionPreservesUnderlyingStructure,
            underlyingSegments:
                fusedAnalysis.morphemicSourceProfile
                    .underlyingMorphemeSequences[0]?.segments || [],
            exampleAuthority:
                fusedAnalysis.morphemicSourceProfile
                    .canvasExampleAuthority,
        },
        {
            status: "authorized",
            observedComplexity: "monomorphemic",
            sourceComplexity: "polymorphemic",
            fused: true,
            underlyingSegments: ["mi", "ī", "ni"],
            exampleAuthority: false,
        }
    );

    const applicativeSource = buildSource(
        ctx,
        "tlami-ā",
        "C",
        "specific-projective"
    );
    const applicativeInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            applicativeSource,
            { derivationType: "applicative" }
        );
    const applicativeOption = applicativeInventory.options.find(
        option => option.targetStem === "tlami-liā"
    ) || null;
    s.eq(
        "Lesson 26 uses the same typed morphemic Source while keeping its accepted applicative rule",
        {
            targetStem: applicativeOption?.targetStem || "",
            sourceAgreement: applicativeOption?.sourceShapeAgreement,
            productiveSourceAuthority:
                applicativeOption?.productiveSourceAuthority || "",
            profileSource:
                applicativeOption?.morphemicSourceProfile?.sourceStem || "",
        },
        {
            targetStem: "tlami-liā",
            sourceAgreement: true,
            productiveSourceAuthority: "typed-morphemic-source-profile",
            profileSource: "tlami-ā",
        }
    );

    const lateSourceAgreement =
        ctx.buildClassicalNahuatlLateSourceAgreementFrame(
            "ihcuil-o-ā",
            { verbClass: "C", sourceValence: "intransitive" }
        );
    const forgedLateSourceAgreement = {
        ...lateSourceAgreement,
    };
    s.eq(
        "Lessons 27-29 read the shared Source through their existing owner boundary without changing signed Result frames",
        {
            status: lateSourceAgreement.authorizationStatus,
            canonical:
                ctx.isClassicalNahuatlLateSourceAgreementFrame(
                    lateSourceAgreement
                ),
            source:
                lateSourceAgreement.morphemicSourceProfile.sourceStem,
            sourceClass:
                lateSourceAgreement.morphemicSourceProfile.sourceClass,
            sourceValence:
                lateSourceAgreement.morphemicSourceProfile.sourceValence,
            families:
                lateSourceAgreement.morphemicSourceProfile.boundaryFamilies,
            exampleAuthority: lateSourceAgreement.canvasExampleAuthority,
            forgedAccepted:
                ctx.isClassicalNahuatlLateSourceAgreementFrame(
                    forgedLateSourceAgreement
                ),
        },
        {
            status: "authorized",
            canonical: true,
            source: "ihcuil-o-ā",
            sourceClass: "C",
            sourceValence: "intransitive",
            families: ["X-ā", "X-o-ā"],
            exampleAuthority: false,
            forgedAccepted: false,
        }
    );

    return s;
}

module.exports = { run };
