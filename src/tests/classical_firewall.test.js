"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_firewall");
    const root = path.resolve(__dirname, "..", "..");
    const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
    const rootScript = fs.readFileSync(path.join(root, "src", "bootstrap", "script_runtime.mjs"), "utf8");
    const panels = fs.readFileSync(path.join(root, "src", "ui", "panels", "panels.mjs"), "utf8");
    const profileWall = fs.readFileSync(path.join(root, "src", "core", "classical", "profile_wall.mjs"), "utf8");
    const classical = fs.readFileSync(path.join(root, "src", "core", "classical", "transcription.mjs"), "utf8");
    const classicalLesson3 = fs.readFileSync(path.join(root, "src", "core", "classical", "particle_grammar.mjs"), "utf8");
    const classicalNuclearClause = fs.readFileSync(path.join(root, "src", "core", "classical", "nuclear_clause_source.mjs"), "utf8");
    const classicalVncLayerEvaluator = fs.readFileSync(path.join(root, "src", "core", "classical", "vnc_layer_evaluator.mjs"), "utf8");
    const classicalFiniteVnc = fs.readFileSync(path.join(root, "src", "core", "classical", "finite_vnc_slots.mjs"), "utf8");
    const classicalLesson6 = fs.readFileSync(path.join(root, "src", "core", "classical", "transitive_vnc_object.mjs"), "utf8");
    const classicalLesson7 = fs.readFileSync(path.join(root, "src", "core", "classical", "verbstem_classes.mjs"), "utf8");
    const runtimeSource = [
        fs.readFileSync(path.join(root, "src", "browser", "main.mjs"), "utf8"),
        fs.readFileSync(path.join(root, "src", "bootstrap", "bootstrap.mjs"), "utf8"),
        fs.readFileSync(path.join(root, "src", "runtime", "create_runtime.mjs"), "utf8"),
    ].join("\n");
    const localScriptTags = Array.from(html.matchAll(/<script\b([^>]*)\bsrc=["']([^"']+)["'][^>]*>/giu));
    const moduleEntryPaths = localScriptTags
        .filter((match) => /\btype=["']module["']/iu.test(match[1]))
        .map((match) => match[2].split(/[?#]/u, 1)[0]);
    const classicEntryPaths = localScriptTags
        .filter((match) => !/\btype=["']module["']/iu.test(match[1]))
        .map((match) => match[2].split(/[?#]/u, 1)[0]);
    const runtimeHas = (modulePath) => (
        runtimeSource.includes(`"${modulePath}"`)
        || runtimeSource.includes(`../${modulePath.replace(/^src\//u, "")}`)
    );

    s.ok(
        "Classical firewall owns the Lesson 2 frame with no alternate-language runtime",
        profileWall.includes("function buildClassicalNahuatlProfileWallFrame")
            && profileWall.includes('spellingInspection: "not-performed"')
            && profileWall.includes('sharedRuntimePolicy: "classical-only"')
            && moduleEntryPaths.length === 1
            && moduleEntryPaths[0] === "src/browser/main.mjs"
            && classicEntryPaths.length === 0
            && runtimeHas("src/core/classical/profile_wall.mjs")
            && runtimeSource.indexOf("profile_wall.mjs") < runtimeSource.indexOf("transcription.mjs")
            && runtimeSource.indexOf("transcription.mjs") < runtimeSource.indexOf("particle_grammar.mjs")
            && runtimeSource.indexOf("particle_grammar.mjs") < runtimeSource.indexOf("nuclear_clause_source.mjs")
            && runtimeSource.indexOf("nuclear_clause_source.mjs") < runtimeSource.indexOf("vnc_layer_evaluator.mjs")
            && runtimeSource.indexOf("vnc_layer_evaluator.mjs") < runtimeSource.indexOf("finite_vnc_slots.mjs")
            && runtimeSource.indexOf("finite_vnc_slots.mjs") < runtimeSource.indexOf("transitive_vnc_object.mjs")
            && runtimeSource.indexOf("transitive_vnc_object.mjs") < runtimeSource.indexOf("verbstem_classes.mjs")
            && panels.includes("buildClassicalNahuatlProfileWallFrame(classicalMode)")
            && classical.includes("function buildClassicalNahuatlTranscriptionFrame")
            && classical.includes("function isClassicalNahuatlTranscriptionFrame")
            && !classical.includes("function buildClassicalNahuatlLesson2ProofFrame")
            && !classical.includes("function buildClassicalNahuatlLesson2OrthographyFrame")
            && !classical.includes("function buildClassicalNahuatlLesson2MachineryFrame")
            && classicalLesson3.includes("function buildClassicalNahuatlParticleSourceFrame")
            && classicalLesson3.includes("function buildClassicalNahuatlParticleResultFrame")
            && !classicalLesson3.includes("function buildClassicalNahuatlLesson3ParticlesFrame")
            && !classicalLesson3.includes("function buildClassicalNahuatlLesson3ProofFrame")
            && classicalNuclearClause.includes("function buildClassicalNahuatlNuclearClauseSource")
            && classicalNuclearClause.includes("function buildClassicalNahuatlNuclearClauseResult")
            && classicalVncLayerEvaluator.includes("function buildClassicalNahuatlVncSlotFrame")
            && classicalVncLayerEvaluator.includes("formulaArtifactAuthority: \"display-only-not-authority\"")
            && classicalVncLayerEvaluator.includes("function buildClassicalNahuatlVncOperationEvaluationFrame")
            && classicalVncLayerEvaluator.includes("function getClassicalNahuatlAuthorityCapabilityFrame")
            && classicalVncLayerEvaluator.includes("function validateClassicalNahuatlAuthorityOptionLedger")
            && classicalFiniteVnc.includes("function buildClassicalNahuatlFiniteVncSource")
            && classicalFiniteVnc.includes("function buildClassicalNahuatlFiniteVncResult")
            && classicalLesson6.includes("function buildClassicalNahuatlTransitiveVncObjectFrame")
            && classicalLesson6.includes("function buildClassicalNahuatlObjectFillerRuleFrame")
            && classicalLesson7.includes("function buildClassicalNahuatlVerbstemClassFrame")
            && classicalLesson7.includes("function buildClassicalNahuatlPredicateFormationRuleFrame")
            && classicalLesson7.includes("function buildClassicalNahuatlTlaFusionRuleFrame")
            && classicalNuclearClause.includes('const subjectPrefix = "#pers1-pers2"')
            && classicalFiniteVnc.includes("function projectFiniteFormula")
            && classicalLesson6.includes("#pers1-pers2+va1-va2(STEM)tns+num1-num2#")
            && !/\bnawat\b|\bpipil\b/iu.test([
                profileWall,
                classical,
                classicalLesson3,
                classicalNuclearClause,
                classicalFiniteVnc,
                classicalLesson6,
                classicalLesson7,
            ].join("\n"))
            && !runtimeHas("src/core/orthography/orthography.mjs")
            && !runtimeHas("src/core/nnc/nominalization/nominalization.mjs")
            && runtimeHas("src/core/classical/transcription.mjs")
            && runtimeHas("src/core/classical/particle_grammar.mjs")
            && runtimeHas("src/core/classical/nuclear_clause_source.mjs")
            && runtimeHas("src/core/classical/vnc_layer_evaluator.mjs")
            && runtimeHas("src/core/classical/finite_vnc_slots.mjs")
            && runtimeHas("src/core/classical/transitive_vnc_object.mjs")
            && runtimeHas("src/core/classical/verbstem_classes.mjs")
    );

    s.eq(
        "Lesson 3 sentence layers consume only canonical issued nuclear results",
        (() => {
            const vncApplication = ctx.evaluateClassicalNahuatlVncApplication({
                sourceStem: "nemi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: "present",
                outputScope: "single",
                sentenceOptions: {
                    sentenceType: "yes-no-question",
                    questionMode: "cuix",
                },
            });
            const vncSentenceResult =
                ctx.buildClassicalNahuatlVncSentenceResultFrame(vncApplication);
            const nnc = ctx.buildClassicalNahuatlClassGovernedNncFrame("tēuc", {
                state: "absolutive",
                subject: "1sg",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
            });
            const nncSentence = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(
                nnc.nncSlotFrame
            );
            const auhSource =
                ctx.buildClassicalNahuatlParticleSourceFrame(
                    "l3-auh-conjunctor"
                );
            const vncLayer = ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
                particleSourceFrame: auhSource,
                nuclearResultFrame: vncSentenceResult,
            });
            const nncLayer = ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
                particleSourceFrame: auhSource,
                nuclearResultFrame: nncSentence,
            });
            const honorificized = ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
                particleSourceFrame: auhSource,
                honorificized: true,
                nuclearResultFrame: vncSentenceResult,
            });
            const legacyApplication = ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
                particleSourceFrame: auhSource,
                nuclearResultFrame: vncApplication,
            });
            const legacyApplicationResult =
                ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
                    particleSourceFrame: auhSource,
                    nuclearResultFrame: vncApplication.resultFrame,
                });
            const copiedSentenceResult =
                ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
                    particleSourceFrame: auhSource,
                    nuclearResultFrame: { ...vncSentenceResult },
                });
            const rawStringsOnly = ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
                particleSourceFrame: auhSource,
                nuclearResultFrame: vncSentenceResult,
                surface: "HOSTILE_SURFACE",
            });
            return {
                vncStatus: vncLayer.authorizationStatus,
                vncFormula: vncLayer.sentenceFormulaDisplay,
                vncSurface: vncLayer.sentenceSurfaceDisplay,
                nncStatus: nncLayer.authorizationStatus,
                nncFormula: nncLayer.sentenceFormulaDisplay,
                nncSurface: nncLayer.sentenceSurfaceDisplay,
                honorificFormula: honorificized.sentenceFormulaDisplay,
                honorificSurface: honorificized.sentenceSurfaceDisplay,
                honorificStatus: honorificized.authorizationStatus,
                honorificReason: honorificized.blockReason,
                formulaAuthority: vncLayer.formulaStringAuthority,
                externalAuthorityAccepted:
                    vncLayer.callerSuppliedAuthorityAccepted,
                issued: ctx.isClassicalNahuatlIssuedParticleSentenceLayerFrame(vncLayer),
                legacyApplicationStatus: legacyApplication.authorizationStatus,
                legacyApplicationReason: legacyApplication.blockReason,
                legacyApplicationResultStatus:
                    legacyApplicationResult.authorizationStatus,
                legacyApplicationResultReason: legacyApplicationResult.blockReason,
                copiedSentenceResultStatus:
                    copiedSentenceResult.authorizationStatus,
                copiedSentenceResultReason: copiedSentenceResult.blockReason,
                rawStatus: rawStringsOnly.authorizationStatus,
                rawReason: rawStringsOnly.blockReason,
            };
        })(),
        {
            vncStatus: "authorized",
            vncFormula: "auh cuix #0-0(nemi)0+0-0#?",
            vncSurface: "Auh cuix nemi?",
            nncStatus: "authorized",
            nncFormula: "auh #ni-0(tēuc)tli-0#.",
            nncSurface: "Auh nitēuctli.",
            honorificFormula: "",
            honorificSurface: "",
            honorificStatus: "blocked",
            honorificReason: "sentence-particle-honorificization-not-witnessed",
            formulaAuthority: false,
            externalAuthorityAccepted: false,
            issued: true,
            legacyApplicationStatus: "blocked",
            legacyApplicationReason: "canonical-issued-nuclear-result-required",
            legacyApplicationResultStatus: "blocked",
            legacyApplicationResultReason: "canonical-issued-nuclear-result-required",
            copiedSentenceResultStatus: "blocked",
            copiedSentenceResultReason: "canonical-issued-nuclear-result-required",
            rawStatus: "blocked",
            rawReason:
                "classical-sentence-particle-external-authority-forbidden:request.surface",
        }
    );

    s.eq(
        "Lesson 3 adverbials accept issued sentence layers and reject forged copies",
        (() => {
            const vncApplication = ctx.evaluateClassicalNahuatlVncApplication({
                sourceStem: "nemi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: "present",
                outputScope: "single",
                sentenceOptions: {
                    sentenceType: "yes-no-question",
                    questionMode: "cuix",
                },
            });
            const sentenceResult =
                ctx.buildClassicalNahuatlVncSentenceResultFrame(vncApplication);
            const auhSource =
                ctx.buildClassicalNahuatlParticleSourceFrame(
                    "l3-auh-conjunctor"
                );
            const particle = ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
                particleSourceFrame: auhSource,
                nuclearResultFrame: sentenceResult,
            });
            const ocSource =
                ctx.buildClassicalNahuatlParticleSourceFrame("l3-oc");
            const adverbial = ctx.buildClassicalNahuatlSentenceAdverbialLayerFrame({
                particleSourceFrame: ocSource,
                consumedSentenceFrame: particle,
            });
            const forged = ctx.buildClassicalNahuatlSentenceAdverbialLayerFrame({
                particleSourceFrame: ocSource,
                consumedSentenceFrame: { ...particle },
            });
            return {
                inventoryCount: ctx.getClassicalNahuatlSentenceAdverbialEntries().length,
                formula: adverbial.sentenceFormulaDisplay,
                surface: adverbial.sentenceSurfaceDisplay,
                sequenceOrder: adverbial.sequenceOrder,
                formulaAuthority: adverbial.formulaStringAuthority,
                forgedStatus: forged.authorizationStatus,
                forgedReason: forged.blockReason,
            };
        })(),
        {
            inventoryCount: 12,
            formula: "oc auh cuix #0-0(nemi)0+0-0#?",
            surface: "Oc auh cuix nemi?",
            sequenceOrder: "before-consumed-sentence",
            formulaAuthority: false,
            forgedStatus: "blocked",
            forgedReason: "canonical-issued-nuclear-result-required",
        }
    );

    s.eq(
        "Classical typed VNC slots ignore lying formula artifacts and fail closed on contradictory slots",
        (() => {
            const typed = ctx.buildClassicalNahuatlVncSlotFrame({
                sourceFrameKind: "hostile-test-source",
                sourceAuthorizationStatus: "authorized",
                stem: "mati",
                personDyad: { pers1: "n", pers2: "0", pers1BaseMorph: "n" },
                tenseFrame: { tns: "0" },
                numberDyad: { num1: "0", num2: "0" },
                formulaArtifact: "#THIS-PRINTED-FORMULA-LIES#",
            });
            const realized = ctx.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({ vncSlotFrame: typed });
            const contradictory = {
                ...typed,
                valenceArity: "dyadic",
                slots: {
                    ...typed.slots,
                    prePredicate: [],
                },
            };
            const blocked = ctx.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({ vncSlotFrame: contradictory });
            return {
                formulaArtifactAuthority: typed.formulaArtifactAuthority,
                inputFormula: realized.inputFormula,
                formulaStringAuthority: realized.formulaStringAuthority,
                selectedFormula: realized.formulaRealization,
                selectedFormulaContainsLie: realized.formulaRealization.includes("LIES"),
                contradictoryStatus: blocked.authorizationStatus,
                contradictoryReason: blocked.blockReason,
            };
        })(),
        {
            formulaArtifactAuthority: "display-only-not-authority",
            inputFormula: "#THIS-PRINTED-FORMULA-LIES#",
            formulaStringAuthority: false,
            selectedFormula: "#ni-0(mati)0+0-0#",
            selectedFormulaContainsLie: false,
            contradictoryStatus: "blocked",
            contradictoryReason: "missing-or-contradictory-typed-vnc-slot-frame",
        }
    );

    s.eq(
        "VNC diagrammatic format projects Subject, Core, and Tense from finalized typed slots",
        (() => {
            const build = (objectFrame = null) => {
                const typed = ctx.buildClassicalNahuatlVncSlotFrame({
                    sourceFrameKind: "diagrammatic-test-source",
                    sourceAuthorizationStatus: "authorized",
                    stem: "mati",
                    personDyad: { pers1: "ni", pers2: "0", pers1BaseMorph: "n" },
                    tenseFrame: { tns: "0" },
                    numberDyad: { num1: "0", num2: "0" },
                    objectFrame,
                });
                const finalized = ctx.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({ vncSlotFrame: typed });
                return ctx.buildClassicalNahuatlVncDiagrammaticFrame(finalized.typedSlotFrame);
            };
            return [
                build(),
                build({ stemRealization: "mati", valenceArity: "monadic", va: "tla" }),
                build({ stemRealization: "mati", valenceArity: "dyadic", va1: "c", va2: "0" }),
            ].map((diagram) => ({
                status: diagram.authorizationStatus,
                arity: diagram.valenceArity,
                linear: diagram.linearFormula,
                generalLinear: diagram.generalLinearFormula,
                rows: diagram.rows.map((row) => `${row.expression} ${row.role}`),
                generalRows: diagram.generalRows.map((row) => `${row.expression} ${row.role}`),
                predicateGroup: diagram.predicateGroup,
                hierarchy: diagram.hierarchy,
                stringAuthority: diagram.formulaStringAuthority,
            }));
        })(),
        [
            {
                status: "authorized",
                arity: "vacant",
                linear: "#ni-0(mati)0+0-0#",
                generalLinear: "#pers¹-pers²(STEM)tns+num¹-num²#",
                rows: ["#ni-0+ ... +0-0# Subject", "(mati) Core", ")0+ Tense"],
                generalRows: ["#pers¹-pers²+ ... +num¹-num²# Subject", "(STEM) Core", ")tns+ Tense"],
                predicateGroup: { role: "Predicate", memberRoles: ["Core", "Tense"], hierarchyLevel: 3 },
                hierarchy: ["verbstem", "core", "predicate", "VNC"],
                stringAuthority: false,
            },
            {
                status: "authorized",
                arity: "monadic",
                linear: "#ni-0+tla(mati)0+0-0#",
                generalLinear: "#pers¹-pers²+va(STEM)tns+num¹-num²#",
                rows: ["#ni-0+ ... +0-0# Subject", "+tla(mati) Core", ")0+ Tense"],
                generalRows: ["#pers¹-pers²+ ... +num¹-num²# Subject", "+va(STEM) Core", ")tns+ Tense"],
                predicateGroup: { role: "Predicate", memberRoles: ["Core", "Tense"], hierarchyLevel: 3 },
                hierarchy: ["verbstem", "core", "predicate", "VNC"],
                stringAuthority: false,
            },
            {
                status: "authorized",
                arity: "dyadic",
                linear: "#ni-0+c-0(mati)0+0-0#",
                generalLinear: "#pers¹-pers²+va¹-va²(STEM)tns+num¹-num²#",
                rows: ["#ni-0+ ... +0-0# Subject", "+c-0(mati) Core", ")0+ Tense"],
                generalRows: ["#pers¹-pers²+ ... +num¹-num²# Subject", "+va¹-va²(STEM) Core", ")tns+ Tense"],
                predicateGroup: { role: "Predicate", memberRoles: ["Core", "Tense"], hierarchyLevel: 3 },
                hierarchy: ["verbstem", "core", "predicate", "VNC"],
                stringAuthority: false,
            },
        ]
    );

    s.eq(
        "Hostile linear VNC formula cannot authorize a diagram without typed slots",
        [
            ctx.buildClassicalNahuatlVncDiagrammaticFrame("#ni-0(FAKE)0+0-0#"),
            ctx.buildClassicalNahuatlVncDiagrammaticFrame({
                kind: "classical-nahuatl-vnc-slot-frame",
                authorizationStatus: "authorized",
                valenceArity: "vacant",
                slots: {},
            }),
        ].map((diagram) => ({
            status: diagram.authorizationStatus,
            reason: diagram.blockReason,
            rows: diagram.rows.length,
        })),
        [
            { status: "blocked", reason: "authorized-typed-vnc-slot-frame-required", rows: 0 },
            { status: "blocked", reason: "authorized-typed-vnc-slot-frame-required", rows: 0 },
        ]
    );

    s.eq(
        "Classical Lesson 8.1 general VNC formula retains each finalized directional and valence slot",
        (() => {
            const buildDiagram = (stem, options) => {
                const result = ctx.buildClassicalNahuatlVerbstemClassFrame(stem, options);
                return ctx.buildClassicalNahuatlVncDiagrammaticFrame(result.proofFrame.conclusion.finalTypedVncSlotFrame);
            };
            return [
                buildDiagram("(mati)", {
                    valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", verbClass: "B", directionalPrefix: "on",
                }),
                buildDiagram("(itta)", {
                    valence: "projective-human", subject: "1sg", mood: "indicative", tense: "present", verbClass: "A", directionalPrefix: "huāl",
                }),
                buildDiagram("(itta)", {
                    valence: "specific-projective", objectKind: "specific-projective", objectPerson: "3pl", subject: "1pl", mood: "indicative", tense: "imperfect", verbClass: "A", directionalPrefix: "on",
                }),
            ].map((diagram) => ({
                linear: diagram.linearFormula,
                generalLinear: diagram.generalLinearFormula,
                core: diagram.generalRows.find((row) => row.role === "Core")?.expression,
            }));
        })(),
        [
            { linear: "#n-0+on(mati)0+0-0#", generalLinear: "#pers¹-pers²±D(STEM)tns+num¹-num²#", core: "±D(STEM)" },
            { linear: "#ni-0+huāl+tē(itta)0+0-0#", generalLinear: "#pers¹-pers²±D+va(STEM)tns+num¹-num²#", core: "±D+va(STEM)" },
            { linear: "#ti-0+qu-im+on(itta)ya+0-h#", generalLinear: "#pers¹-pers²+va¹-va²±D(STEM)tns+num¹-num²#", core: "+va¹-va²±D(STEM)" },
        ]
    );

    s.eq(
        "Classical VNC operation contracts describe one grammar without curriculum ranks or provisional words",
        (() => {
            const contracts = ctx.getClassicalNahuatlVncOperationContracts();
            const boundary = contracts.find((contract) => contract.operationId === "vnc-boundary-realization");
            const multipleObject = contracts.find((contract) => contract.operationId === "vnc-multiple-object-valence");
            const sentence = contracts.find((contract) => contract.operationId === "vnc-sentence-composition");
            return {
                operationIds: contracts.map((contract) => contract.operationId),
                curriculumOrderAuthority: contracts.every((contract) => contract.curriculumOrderAuthority === false),
                storedExampleAuthority: contracts.every((contract) => contract.storedExampleAuthority === false),
                multipleObjectType: multipleObject.operationType,
                multipleObjectPrerequisites: multipleObject.prerequisites,
                boundaryConsumes: boundary.consumesFrameKinds,
                boundaryProduces: boundary.producesFrameKind,
                boundaryOutputs: boundary.outputKinds,
                sentencePrerequisites: sentence.prerequisites,
                formulaStringAuthority: false,
            };
        })(),
        {
            operationIds: [
                "vnc-clause-shell",
                "vnc-object-valence",
                "vnc-multiple-object-valence",
                "vnc-predicate-stem",
                "vnc-boundary-realization",
                "vnc-sentence-composition",
            ],
            curriculumOrderAuthority: true,
            storedExampleAuthority: true,
            multipleObjectType: "transform",
            multipleObjectPrerequisites: ["vnc-object-valence"],
            boundaryConsumes: ["classical-nahuatl-vnc-slot-frame"],
            boundaryProduces: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
            boundaryOutputs: ["selected-vnc-formula"],
            sentencePrerequisites: ["vnc-boundary-realization"],
            formulaStringAuthority: false,
        }
    );

    s.eq(
        "Classical live VNC proof publishes semantic operations and sentence composition without curriculum authority",
        (() => {
            const frame = ctx.buildClassicalNahuatlVerbstemClassFrame("(mati)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                sentenceType: "affirmative-assertion",
            });
            return {
                formula: frame.formulaRealization,
                evaluationStatus: frame.grammarOperationEvaluationFrame?.authorizationStatus,
                appliedOperationIds: frame.grammarOperationEvaluationFrame?.appliedOperationIds,
                resultOperationId: frame.grammarOperationEvaluationFrame?.resultOperationId,
                resultSurfaceKind: frame.grammarOperationEvaluationFrame?.resultSurfaceKind,
                curriculumOrderAuthority: frame.grammarOperationEvaluationFrame?.curriculumOrderAuthority,
                typedSlotAuthority: frame.grammarOperationEvaluationFrame?.typedSlotAuthority,
                formulaStringAuthority: frame.grammarOperationEvaluationFrame?.formulaStringAuthority,
                proofResultOperationId: frame.proofFrame?.conclusion?.resultOperationId,
            };
        })(),
        {
            formula: "#ni-0(mati)0+0-0#",
            evaluationStatus: "authorized",
            appliedOperationIds: [
                "vnc-clause-shell",
                "vnc-predicate-stem",
                "vnc-boundary-realization",
                "vnc-sentence-composition",
            ],
            resultOperationId: "vnc-sentence-composition",
            resultSurfaceKind: "sentence-surface",
            curriculumOrderAuthority: false,
            typedSlotAuthority: true,
            formulaStringAuthority: false,
            proofResultOperationId: "vnc-boundary-realization",
        }
    );

    s.eq(
        "VNC curriculum poison cannot select a result, while an unapplied sentence operation fails closed",
        (() => {
            const frame = ctx.buildClassicalNahuatlVerbstemClassFrame("(mati)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const input = {
                priorVncFrame: frame.priorVncFrame,
                finalBoundaryFrame: frame.proofFrame.conclusion.finalBoundaryRealizationFrame,
            };
            const curriculumPoison = ctx.buildClassicalNahuatlVncOperationEvaluationFrame({
                ...input,
                highestActiveLesson: 999,
                finalizerLayerId: "vnc-sentence-composition",
            });
            const missingSemanticOperation = ctx.buildClassicalNahuatlVncOperationEvaluationFrame({
                ...input,
                requiredOperationIds: [...curriculumPoison.appliedOperationIds, "vnc-sentence-composition"],
                resultOperationId: "vnc-sentence-composition",
                requestedOutputKind: "selected-vnc-sentence-surface",
            });
            return {
                poisonedStatus: curriculumPoison.authorizationStatus,
                poisonedResultOperation: curriculumPoison.resultOperationId,
                curriculumOrderAuthority: curriculumPoison.curriculumOrderAuthority,
                missingStatus: missingSemanticOperation.authorizationStatus,
                missingReason: missingSemanticOperation.blockReason,
                missing: missingSemanticOperation.missingOperationIds,
            };
        })(),
        {
            poisonedStatus: "authorized",
            poisonedResultOperation: "vnc-boundary-realization",
            curriculumOrderAuthority: false,
            missingStatus: "blocked",
            missingReason: "required-grammar-operation-not-applied",
            missing: ["vnc-sentence-composition"],
        }
    );

    s.eq(
        "Classical profile wall is fixed at the public deployment boundary",
        typeof ctx.buildClassicalNahuatlProfileWallFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalNahuatlProfileWallFrame("classical-nahuatl");
                const fabricatedModeFrame = ctx.buildClassicalNahuatlProfileWallFrame("forged-alternate-profile");
                return {
                    kind: frame.kind,
                    classicalLaneActive: frame.classicalLaneActive,
                    authorityScope: frame.authorityScope,
                    separationMechanism: frame.separationMechanism,
                    fabricatedModeProfileId: fabricatedModeFrame.activeProfileId,
                    fabricatedModeClassicalLaneActive: fabricatedModeFrame.classicalLaneActive,
                    spellingInspection: frame.spellingInspection,
                    sharedRuntimePolicy: frame.sharedRuntimePolicy,
                };
            })()
            : { kind: "missing" },
        {
            kind: "classical-nahuatl-profile-wall-frame",
            classicalLaneActive: true,
            authorityScope: "public-classical-runtime",
            separationMechanism: "deployment-boundary",
            fabricatedModeProfileId: "classical-nahuatl",
            fabricatedModeClassicalLaneActive: true,
            spellingInspection: "not-performed",
            sharedRuntimePolicy: "classical-only",
        }
    );

    s.ok(
        "the canonical transcription owner exposes no alternate spelling lane",
        classical.includes("function buildClassicalNahuatlTranscriptionFrame")
            && classical.includes("function isClassicalNahuatlTranscriptionFrame")
            && classical.includes("function buildClassicalNahuatlTranscriptionSourceFrame")
            && !classical.includes("function buildClassicalNahuatlLesson2OrthographyFrame")
            && !classical.includes("function buildClassicalNahuatlLesson2MachineryFrame")
            && !classical.includes("function buildClassicalNahuatlLesson2ProofFrame")
            && !classical.includes("kwachi")
            && !classical.includes("shuchit")
            && !classical.includes("timumachtia")
    );

    s.ok(
        "Classical deployment is independent from UI density",
        rootScript.includes('var CLASSICAL_NAHUATL_PUBLIC_RUNTIME = Object.freeze({')
            && rootScript.includes('profileId: "classical-nahuatl"')
            && rootScript.includes('active: true')
            && !rootScript.includes("LANGUAGE_PROFILE_MODE")
            && !html.includes('data-language-profile=')
            && !html.includes('data-ui-density="classical"')
            && panels.includes("function initializeClassicalNahuatlPublicRuntime")
            && !panels.includes("function applyLanguageProfileMode")
            && !panels.includes("UI_DENSITY_MODE.classical")
    );

    s.eq(
        "the canonical transcription owner independently projects Andrews written and formula forms",
        (() => {
            const source =
                ctx.buildClassicalNahuatlTranscriptionSourceFrame({
                    constituents: [{
                        segments: ["/š/", "o", "/č/", "i", "/λ/"],
                    }],
                });
            const frame =
                ctx.buildClassicalNahuatlTranscriptionFrame(source);
            const documentaryPoison =
                ctx.buildClassicalNahuatlTranscriptionFrame(source, {
                    sourceDocument: "HOSTILE_DOCUMENTARY_SOURCE",
                });
            return {
                sourceCanonical:
                    ctx.isClassicalNahuatlTranscriptionSourceFrame(source),
                resultCanonical:
                    ctx.isClassicalNahuatlTranscriptionFrame(frame),
                formula: frame.formula,
                surface: frame.surface,
                sourceProfileId: frame.sourceProfileId,
                targetProfileId: frame.targetProfileId,
                independent: [
                    frame.formulaProjection.derivedFromWrittenProjection,
                    frame.writtenProjection.derivedFromFormulaProjection,
                ],
                bridgeApiPresent: typeof ctx.getClassicalLettersAsNawat === "function",
                poisonedStatus: documentaryPoison.authorizationStatus,
                poisonedReason: documentaryPoison.blockReason,
                poisonedSurface: documentaryPoison.surface,
                poisonedCanonical:
                    ctx.isClassicalNahuatlTranscriptionFrame(
                        documentaryPoison
                    ),
            };
        })(),
        {
            sourceCanonical: true,
            resultCanonical: true,
            formula: "#(/š/o/č/i/λ/)#",
            surface: "xochitl",
            sourceProfileId: "classical-nahuatl",
            targetProfileId: "classical-nahuatl",
            independent: [false, false],
            bridgeApiPresent: false,
            poisonedStatus: "blocked",
            poisonedReason:
                "classical-transcription-external-authority-forbidden:request.sourceDocument",
            poisonedSurface: "",
            poisonedCanonical: true,
        }
    );

    s.eq(
        "Classical transcription uses one owner-issued semantic result path",
        (() => {
            const source =
                ctx.buildClassicalNahuatlTranscriptionSourceFrame({
                    constituents: [{
                        segments: ["/š/", "o", "/č/", "i", "/λ/"],
                    }],
                });
            const frame =
                ctx.buildClassicalNahuatlTranscriptionFrame(source);
            const copied = { ...frame };
            const serialized = JSON.parse(JSON.stringify(frame));
            return {
                kind: frame.kind,
                surface: frame.surface,
                authorizationStatus: frame.authorizationStatus,
                canonical: ctx.isClassicalNahuatlTranscriptionFrame(frame),
                copiedCanonical: ctx.isClassicalNahuatlTranscriptionFrame(copied),
                serializedCanonical: ctx.isClassicalNahuatlTranscriptionFrame(serialized),
                stringCanonical: ctx.isClassicalNahuatlTranscriptionFrame("xochitl"),
                oldOrthographyCapability:
                    typeof ctx.buildClassicalNahuatlLesson2OrthographyFrame,
                oldMachineryCapability:
                    typeof ctx.buildClassicalNahuatlLesson2MachineryFrame,
                proofKind: frame.proofFrame.kind,
                proofStatus: frame.proofFrame.authorizationStatus,
                proofConclusionAuthorized: frame.proofFrame.conclusion.authorized,
                grammarGenerationAllowed: frame.grammarGenerationAllowed,
            };
        })(),
        {
            kind: "classical-nahuatl-transcription-frame",
            surface: "xochitl",
            authorizationStatus: "authorized",
            canonical: true,
            copiedCanonical: false,
            serializedCanonical: false,
            stringCanonical: false,
            oldOrthographyCapability: "undefined",
            oldMachineryCapability: "undefined",
            proofKind:
                "classical-nahuatl-transcription-authorization-frame",
            proofStatus: "authorized",
            proofConclusionAuthorized: true,
            grammarGenerationAllowed: false,
        }
    );

    s.eq(
        "the canonical particle owner preserves transcription particles without the retired Lesson 3 machinery lane",
        (() => {
            const source =
                ctx.buildClassicalNahuatlParticleSourceFrame("l3-tla");
            const result =
                ctx.buildClassicalNahuatlParticleResultFrame(source);
            const blocked =
                ctx.buildClassicalNahuatlParticleResultFrame(
                    "l3-tla"
                );
            return {
                sourceCanonical:
                    ctx.isClassicalNahuatlParticleSourceFrame(source),
                resultCanonical:
                    ctx.isClassicalNahuatlParticleResultFrame(result),
                formula: result.formula,
                written: result.surface,
                independent: [
                    result.formulaProjection.derivedFromWrittenProjection,
                    result.writtenProjection.derivedFromFormulaProjection,
                ],
                blockReason: blocked.blockReason,
                retiredLane:
                    typeof ctx.buildClassicalNahuatlLesson3ParticlesFrame,
                retiredProof:
                    typeof ctx.buildClassicalNahuatlLesson3ProofFrame,
                bridgeApiPresent: typeof ctx.getClassicalLettersAsNawat === "function",
            };
        })(),
        {
            sourceCanonical: true,
            resultCanonical: true,
            formula: "tlā",
            written: "tlā",
            independent: [false, false],
            blockReason: "classical-particle-owner-issued-source-required",
            retiredLane: "undefined",
            retiredProof: "undefined",
            bridgeApiPresent: false,
        }
    );

    s.eq(
        "read-only particle facts cannot recreate retired lesson-specific authority frames",
        (() => {
            return {
                functionsExported: [
                    typeof ctx.getClassicalNahuatlFunctionalClassRules,
                    typeof ctx.buildClassicalNahuatlLesson3FunctionalClassFrame,
                    typeof ctx.getClassicalNahuatlNegativizingParticleRules,
                    typeof ctx.buildClassicalNahuatlLesson3NegativizingParticleFrame,
                    typeof ctx.getClassicalNahuatlParticleCollocationRules,
                    typeof ctx.buildClassicalNahuatlLesson3ParticleCollocationFrame,
                    typeof ctx.getClassicalNahuatlHonorificizedParticleRules,
                    typeof ctx.buildClassicalNahuatlLesson3HonorificizedParticleFrame,
                ],
                retiredAggregate:
                    typeof ctx.buildClassicalNahuatlLesson3ParticlesFrame,
                retiredProof:
                    typeof ctx.buildClassicalNahuatlLesson3ProofFrame,
            };
        })(),
        {
            functionsExported: [
                "function", "undefined",
                "function", "undefined",
                "function", "undefined",
                "function", "undefined",
            ],
            retiredAggregate: "undefined",
            retiredProof: "undefined",
        }
    );

    s.eq(
        "the particle inventory remains read-only lexical information",
        (() => {
            const entries =
                ctx.getClassicalNahuatlParticleSourceEntries();
            const forms = entries.map((entry) => entry.sourceForm);
            return {
                hasLexicalEntries: entries.length > 0,
                visibleForms: ["ca", "cuix?", "tlā", "mā", "in", "āuh"].map((form) => forms.includes(form)),
                entriesAuthorizeGeneration:
                    entries.some(
                        (entry) => entry.grammarGenerationAllowed === true
                    ),
                retiredAggregate:
                    typeof ctx.buildClassicalNahuatlLesson3ParticlesFrame,
            };
        })(),
        {
            hasLexicalEntries: true,
            visibleForms: [true, true, true, true, true, true],
            entriesAuthorizeGeneration: false,
            retiredAggregate: "undefined",
        }
    );

    s.eq(
        "typed phonemes realize only Classical spelling and reject Modern spelling carriers",
        (() => {
            const transcribe = (segments) => {
                const source =
                    ctx.buildClassicalNahuatlTranscriptionSourceFrame({
                        constituents: [{ segments }],
                    });
                return {
                    source,
                    result:
                        ctx.buildClassicalNahuatlTranscriptionFrame(
                            source
                        ),
                };
            };
            const tla = transcribe(["/λ/", "a"]);
            const xihuitl =
                transcribe(["/š/", "ī", "/w/", "i", "/λ/"]);
            const cuauhquiza = transcribe([
                "/kʷ/", "a", "/w/", "/k/", "i", "/s/", "a",
            ]);
            const modern =
                ctx.buildClassicalNahuatlTranscriptionSourceFrame({
                    constituents: [{ segments: ["k", "w"] }],
                });
            return {
                tla: [
                    tla.result.formula,
                    tla.result.surface,
                    ctx.isClassicalNahuatlTranscriptionFrame(
                        tla.result
                    ),
                ],
                macron: [
                    xihuitl.result.formula,
                    xihuitl.result.surface,
                    xihuitl.result.graphemes,
                ],
                cuQuHu: [
                    cuauhquiza.result.formula,
                    cuauhquiza.result.surface,
                    cuauhquiza.result.graphemes,
                ],
                modern: [
                    modern.authorizationStatus,
                    modern.blockReason,
                ],
            };
        })(),
        {
            tla: ["#(/λ/a)#", "tla", true],
            macron: [
                "#(/š/ī/w/i/λ/)#",
                "xīhuitl",
                ["x", "ī", "hu", "i", "tl"],
            ],
            cuQuHu: [
                "#(/kʷ/a/w//k/i/s/a)#",
                "cuauhquiza",
                ["cu", "a", "uh", "qu", "i", "z", "a"],
            ],
            modern: [
                "blocked",
                "classical-transcription-segment-not-licensed",
            ],
        }
    );

    s.eq(
        "Canonical nuclear-clause structure keeps NNC state inside the predicate and has no tense slot",
        (() => {
            const frame = ctx.buildClassicalNahuatlNuclearClauseResult(
                "tlacatl",
                {
                    nuclearClauseKind: "nominal-nuclear-clause",
                    state: "absolutive",
                }
            );
            return {
                kind: frame.kind,
                sourceKind: frame.source.kind,
                authorizationStatus: frame.authorizationStatus,
                formula: frame.formula,
                written: frame.written,
                slotArity: frame.slotArity,
                stateBelongsTo: frame.predicateFrame.stateBelongsTo,
                tenseSlot: frame.predicateFrame.tenseSlot,
                canonical:
                    ctx.isClassicalNahuatlNuclearClauseResult(frame),
            };
        })(),
        {
            kind: "classical-nahuatl-nuclear-clause-structure-result",
            sourceKind: "classical-nahuatl-nuclear-clause-source",
            authorizationStatus: "authorized",
            formula: "#pers1-pers2(tlacatl)num1-num2#",
            written: "tlacatl",
            slotArity: "vacant",
            stateBelongsTo: "predicate",
            tenseSlot: "none",
            canonical: true,
        }
    );

    s.eq(
        "Canonical finite VNC consumes an intransitive nuclear-clause Result",
        (() => {
            const frame = ctx.buildClassicalNahuatlFiniteVncResult("nemi", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
            });
            return {
                kind: frame.kind,
                sourceKind: frame.source.kind,
                authorizationStatus: frame.authorizationStatus,
                formula: frame.formula,
                written: frame.written,
                nuclearClauseKind: frame.nuclearClauseResult.clauseKind,
                nuclearTransitivity:
                    frame.nuclearClauseResult.transitivity,
                nuclearSlotArity: frame.nuclearClauseResult.slotArity,
                canonical: ctx.isClassicalNahuatlFiniteVncResult(frame),
            };
        })(),
        {
            kind: "classical-nahuatl-finite-vnc-slot-result",
            sourceKind: "classical-nahuatl-finite-vnc-source",
            authorizationStatus: "authorized",
            formula: "#ni-0(nemi)0+0-0#",
            written: "ninemi",
            nuclearClauseKind: "verbal-nuclear-clause",
            nuclearTransitivity: "intransitive",
            nuclearSlotArity: "vacant",
            canonical: true,
        }
    );

    s.eq(
        "Canonical transitive VNC consumes the typed nuclear-clause prerequisite",
        (() => {
            const frame =
                ctx.buildClassicalNahuatlTransitiveVncObjectFrame(
                    "(itta)",
                    {
                        transitivity: "transitive",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                        object: "2sg",
                    }
                );
            return {
                kind: frame.kind,
                formula: frame.formulaRealization,
                proofStatus: frame.proofFrame.authorizationStatus,
                nuclearKind: frame.nuclearClauseResult.kind,
                nuclearTransitivity:
                    frame.nuclearClauseResult.transitivity,
                nuclearSlotArity: frame.nuclearClauseResult.slotArity,
                objectValencePosition: frame.objectFrame.valencePosition,
            };
        })(),
        {
            kind:
                "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
            formula: "#n-0+m-itz(itta)0+0-0#",
            proofStatus: "authorized",
            nuclearKind:
                "classical-nahuatl-nuclear-clause-structure-result",
            nuclearTransitivity: "transitive",
            nuclearSlotArity: "dyadic",
            objectValencePosition: "va1-va2",
        }
    );

    s.eq(
        "Canonical verbstem classification consumes the prior VNC without a curriculum lane",
        (() => {
            const frame = ctx.buildClassicalNahuatlVerbstemClassFrame(
                "(itta)",
                {
                    transitivity: "transitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    object: "2sg",
                    verbClass: "A",
                }
            );
            return {
                kind: frame.kind,
                authorizationStatus: frame.authorizationStatus,
                classId: frame.classId,
                formula: frame.formulaRealization,
                priorKind: frame.priorVncFrame.kind,
                priorFormula: frame.priorVncFrame.formulaRealization,
                sourceSelectionStatus:
                    frame.sourceSelectionFrame.authorizationStatus,
                proofStatus: frame.proofFrame.authorizationStatus,
            };
        })(),
        {
            kind:
                "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
            authorizationStatus: "authorized",
            classId: "A",
            formula: "#ni-0+tla(itta)0+0-0#",
            priorKind:
                "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
            priorFormula: "#n-0+tla(itta)0+0-0#",
            sourceSelectionStatus: "authorized",
            proofStatus: "authorized",
        }
    );

    s.eq(
        "Classical source boundaries require typed Source constituents and treat Canvas witnesses as documentary",
        (() => {
            const tom = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(tom-a)");
            const huel = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(huel-mati)");
            const bareHuelItta = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(huel-itta)");
            const huelItta = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(huel-itta)", {
                sourceEmbedStem: "huel",
                sourceMatrixStem: "itta",
            });
            const solidHuel = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(huelmati)");
            const nearbyHuel = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(huelmatini)");
            const chico = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(chico-mati)");
            const ahco = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(ahco-cui)");
            const ixi = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(ixi-mati)");
            const ix = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(ix-mati)");
            const xochi = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(xō-chi-tēm-o-a)");
            const zaca = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(zaca-mo-ā)");
            const cal = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(cal-tzīn-ti-ā)");
            const plain = ctx.buildClassicalNahuatlSourceBoundaryRoleFrame("(chol-o-a)");
            const wholeSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(nemi)");
            const tomSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(tom-a)");
            const tomHostileUserSplit = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(tom-a)", {
                sourceEmbedStem: "tom",
                sourceMatrixStem: "a",
            });
            const chicoUserSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(chico-mati)", {
                sourceEmbedStem: "chico",
                sourceMatrixStem: "mati",
            });
            const ahcoSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(ahco-cui)");
            const zacaSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(zaca-mo-ā)");
            const zacaHostileSplit = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(zaca-mo-ā)", {
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "zaca-mo",
                sourceMatrixStem: "ā",
            });
            const ixChihuaSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(ix-chihua)");
            const ixChihuaUserSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(ix-chihua)", {
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "ix",
                sourceMatrixStem: "chihua",
            });
            const generalCompoundSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(nequi-nemi)", {
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "nequi",
                sourceMatrixStem: "nemi",
            });
            const reversedGeneralCompoundSource = ctx.buildClassicalNahuatlFuenteSourceSelectionFrame("(nemi-nequi)", {
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "nequi",
                sourceMatrixStem: "nemi",
            });
            return {
                tomKind: tom.sourceKind,
                tomStem: tom.stem,
                tomMorphs: tom.internalMorphs,
                tomRoles: tom.sourceReadoutRole,
                tomHyphenEmbedBlocked: tom.hyphenOnlyCannotPopulateEmbedMatrix,
                tomEmbedMatrixAuthorized: tom.embedMatrixAuthorized,
                tomFormulaSlotSplitAllowed: tom.formulaSlotSplitAllowed,
                tomActions: tom.structureActions,
                tomWitnessLine: tom.ruleRefs.find((ref) => ref.tagId === "cn-l7-source-boundary-role")?.lineStart || 0,
                huelKind: huel.sourceKind,
                huelEmbed: huel.embedStem,
                huelMatrix: huel.matrixStem,
                huelRole: huel.boundaryRole,
                huelRoles: huel.sourceReadoutRole,
                huelEmbedMatrixAuthorized: huel.embedMatrixAuthorized,
                huelHyphenEmbedBlocked: huel.hyphenOnlyCannotPopulateEmbedMatrix,
                huelDocumentaryWitness: huel.documentaryEmbedMatrixWitness,
                huelDocumentaryAuthorizesSource: huel.documentaryEvidenceAuthorizesSource,
                bareHuelIttaKind: bareHuelItta.sourceKind,
                bareHuelIttaEmbedMatrixAuthorized: bareHuelItta.embedMatrixAuthorized,
                bareHuelIttaHyphenEmbedBlocked: bareHuelItta.hyphenOnlyCannotPopulateEmbedMatrix,
                huelIttaKind: huelItta.sourceKind,
                huelIttaEmbed: huelItta.embedStem,
                huelIttaMatrix: huelItta.matrixStem,
                huelIttaBoundaryKey: huelItta.boundaryRecordKey,
                huelIttaInputSpelling: huelItta.inputBoundarySpelling,
                huelIttaWitnessLine: huelItta.ruleRefs.find((ref) => ref.tagId === "cn-l7-source-boundary-role")?.lineStart || 0,
                huelIttaHyphenEmbedBlocked: huelItta.hyphenOnlyCannotPopulateEmbedMatrix,
                solidHuelKind: solidHuel.sourceKind,
                solidHuelEmbed: solidHuel.embedStem,
                solidHuelMatrix: solidHuel.matrixStem,
                solidHuelBoundaryKey: solidHuel.boundaryRecordKey,
                solidHuelInputSpelling: solidHuel.inputBoundarySpelling,
                solidHuelInferred: solidHuel.solidBoundaryInferred,
                solidHuelWitnessPolicy: solidHuel.witnessUsePolicy,
                nearbyHuelKind: nearbyHuel.sourceKind,
                nearbyHuelBoundaryKnown: nearbyHuel.boundaryRoleKnown,
                nearbyHuelEmbedMatrixAuthorized: nearbyHuel.embedMatrixAuthorized,
                nearbyHuelInputSpelling: nearbyHuel.inputBoundarySpelling,
                nearbyHuelInferred: nearbyHuel.solidBoundaryInferred,
                nearbyHuelRoles: nearbyHuel.sourceReadoutRole,
                chicoKind: chico.sourceKind,
                chicoEmbed: chico.embedStem,
                chicoMatrix: chico.matrixStem,
                chicoCanonical: chico.canonicalStemVariant,
                chicoRole: chico.boundaryRole,
                chicoDerivedTarget: chico.tlaFusionDerivedStem,
                chicoDerivedWitnessed: chico.tlaFusionDerivedTargetWitnessed,
                chicoHyphenEmbedBlocked: chico.hyphenOnlyCannotPopulateEmbedMatrix,
                ahcoKind: ahco.sourceKind,
                ahcoEmbed: ahco.embedStem,
                ahcoMatrix: ahco.matrixStem,
                ahcoRoles: ahco.sourceReadoutRole,
                ahcoWitnessLine: ahco.ruleRefs.find((ref) => ref.tagId === "cn-l7-source-boundary-role")?.lineStart || 0,
                ixiKind: ixi.sourceKind,
                ixiEmbed: ixi.embedStem,
                ixiMatrix: ixi.matrixStem,
                ixiCanonical: ixi.canonicalStemVariant,
                ixiRole: ixi.boundaryRole,
                ixiHyphenEmbedBlocked: ixi.hyphenOnlyCannotPopulateEmbedMatrix,
                ixKind: ix.sourceKind,
                ixEmbed: ix.embedStem,
                ixMatrix: ix.matrixStem,
                ixCanonical: ix.canonicalStemVariant,
                ixRoles: ix.sourceReadoutRole,
                xochiKind: xochi.sourceKind,
                xochiEmbed: xochi.embedStem,
                xochiMatrix: xochi.matrixStem,
                xochiRoles: xochi.sourceReadoutRole,
                xochiEmbedMatrixAuthorized: xochi.embedMatrixAuthorized,
                xochiHyphenEmbedBlocked: xochi.hyphenOnlyCannotPopulateEmbedMatrix,
                zacaKind: zaca.sourceKind,
                zacaRelationship: zaca.stemRelationshipKind,
                zacaEmbed: zaca.embedStem,
                zacaMatrix: zaca.matrixStem,
                zacaCanonical: zaca.canonicalStemVariant,
                zacaRole: zaca.boundaryRole,
                zacaRoles: zaca.sourceReadoutRole,
                zacaWitnessLine: zaca.ruleRefs.find((ref) => ref.tagId === "cn-l7-source-boundary-role")?.lineStart || 0,
                calKind: cal.sourceKind,
                calEmbed: cal.embedStem,
                calMatrix: cal.matrixStem,
                calWitnessLine: cal.ruleRefs.find((ref) => ref.tagId === "cn-l7-source-boundary-role")?.lineStart || 0,
                plainKind: plain.sourceKind,
                plainHyphenEmbedBlocked: plain.hyphenOnlyCannotPopulateEmbedMatrix,
                plainRoles: plain.sourceReadoutRole,
                wholeSourceKind: wholeSource.selectedSourceKind,
                wholeSourceSelectedBy: wholeSource.selectedBy,
                tomSourceKind: tomSource.selectedSourceKind,
                tomSourceSelectedBy: tomSource.selectedBy,
                tomSourceTypedAvailable: tomSource.typedSourceSelectionAvailable,
                tomHostileStatus: tomHostileUserSplit.authorizationStatus,
                tomHostileReason: tomHostileUserSplit.userSelectionContradictionReason,
                tomHostileActions: tomHostileUserSplit.sourceSelectionActions,
                chicoUserSourceKind: chicoUserSource.selectedSourceKind,
                chicoUserSelectedBy: chicoUserSource.selectedBy,
                chicoUserTypedAuthorized: chicoUserSource.userSelectionTypedSourceAuthorized,
                chicoUserEmbed: chicoUserSource.selectedEmbedStem,
                chicoUserMatrix: chicoUserSource.selectedMatrixStem,
                ahcoSourceKind: ahcoSource.selectedSourceKind,
                ahcoSourceSelectedBy: ahcoSource.selectedBy,
                zacaSourceKind: zacaSource.selectedSourceKind,
                zacaSourceSelectedBy: zacaSource.selectedBy,
                zacaSourceEmbed: zacaSource.selectedEmbedStem,
                zacaSourceMatrix: zacaSource.selectedMatrixStem,
                zacaHostileStatus: zacaHostileSplit.authorizationStatus,
                zacaHostileReason: zacaHostileSplit.userSelectionContradictionReason,
                ixChihuaSourceKind: ixChihuaSource.selectedSourceKind,
                ixChihuaSourceSelectedBy: ixChihuaSource.selectedBy,
                ixChihuaSourceTypedAvailable: ixChihuaSource.typedSourceSelectionAvailable,
                ixChihuaUserSourceKind: ixChihuaUserSource.selectedSourceKind,
                ixChihuaUserSelectedBy: ixChihuaUserSource.selectedBy,
                ixChihuaUserTypedAuthorized: ixChihuaUserSource.userSelectionTypedSourceAuthorized,
                ixChihuaUserEmbed: ixChihuaUserSource.selectedEmbedStem,
                ixChihuaUserMatrix: ixChihuaUserSource.selectedMatrixStem,
                generalCompoundKind: generalCompoundSource.selectedSourceKind,
                generalCompoundSelectedBy: generalCompoundSource.selectedBy,
                generalCompoundTypedAuthorized: generalCompoundSource.userSelectionTypedSourceAuthorized,
                generalCompoundPartsMatchStem: generalCompoundSource.typedPartsMatchStem,
                generalCompoundGenerationAllowed: generalCompoundSource.grammarGenerationAllowed,
                reversedCompoundStatus: reversedGeneralCompoundSource.authorizationStatus,
                reversedCompoundReason: reversedGeneralCompoundSource.userSelectionContradictionReason,
            };
        })(),
        {
            tomKind: "analyzed-verbstem",
            tomStem: "tom-a",
            tomMorphs: ["tom", "a"],
            tomRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
            tomHyphenEmbedBlocked: true,
            tomEmbedMatrixAuthorized: false,
            tomFormulaSlotSplitAllowed: false,
            tomActions: [
                "keep-stem-internal-morphs-inside-one-verbstem",
                "block-stem-internal-morphs-as-formula-slots",
                "block-hyphen-only-embed-matrix-inference",
            ],
            tomWitnessLine: 7770,
            huelKind: "analyzed-verbstem",
            huelEmbed: "",
            huelMatrix: "",
            huelRole: "position-internal-morph-boundary",
            huelRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
            huelEmbedMatrixAuthorized: false,
            huelHyphenEmbedBlocked: true,
            huelDocumentaryWitness: true,
            huelDocumentaryAuthorizesSource: false,
            bareHuelIttaKind: "analyzed-verbstem",
            bareHuelIttaEmbedMatrixAuthorized: false,
            bareHuelIttaHyphenEmbedBlocked: true,
            huelIttaKind: "analyzed-verbstem",
            huelIttaEmbed: "",
            huelIttaMatrix: "",
            huelIttaBoundaryKey: "",
            huelIttaInputSpelling: "hyphenated",
            huelIttaWitnessLine: 0,
            huelIttaHyphenEmbedBlocked: true,
            solidHuelKind: "simple-verbstem",
            solidHuelEmbed: "",
            solidHuelMatrix: "",
            solidHuelBoundaryKey: "",
            solidHuelInputSpelling: "solid",
            solidHuelInferred: false,
            solidHuelWitnessPolicy: "proof-anchor-not-whitelist",
            nearbyHuelKind: "simple-verbstem",
            nearbyHuelBoundaryKnown: false,
            nearbyHuelEmbedMatrixAuthorized: false,
            nearbyHuelInputSpelling: "solid",
            nearbyHuelInferred: false,
            nearbyHuelRoles: "one whole verbstem",
            chicoKind: "analyzed-verbstem",
            chicoEmbed: "",
            chicoMatrix: "",
            chicoCanonical: "chico-mati",
            chicoRole: "position-internal-morph-boundary",
            chicoDerivedTarget: "",
            chicoDerivedWitnessed: false,
            chicoHyphenEmbedBlocked: true,
            ahcoKind: "analyzed-verbstem",
            ahcoEmbed: "",
            ahcoMatrix: "",
            ahcoRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
            ahcoWitnessLine: 4001,
            ixiKind: "analyzed-verbstem",
            ixiEmbed: "",
            ixiMatrix: "",
            ixiCanonical: "ixi-mati",
            ixiRole: "position-internal-morph-boundary",
            ixiHyphenEmbedBlocked: true,
            ixKind: "analyzed-verbstem",
            ixEmbed: "",
            ixMatrix: "",
            ixCanonical: "ix-mati",
            ixRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
            xochiKind: "analyzed-verbstem",
            xochiEmbed: "",
            xochiMatrix: "",
            xochiRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
            xochiEmbedMatrixAuthorized: false,
            xochiHyphenEmbedBlocked: true,
            zacaKind: "analyzed-verbstem",
            zacaRelationship: "",
            zacaEmbed: "",
            zacaMatrix: "",
            zacaCanonical: "zaca-mo-ā",
            zacaRole: "position-internal-morph-boundary",
            zacaRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
            zacaWitnessLine: 8747,
            calKind: "analyzed-verbstem",
            calEmbed: "",
            calMatrix: "",
            calWitnessLine: 24069,
            plainKind: "analyzed-verbstem",
            plainHyphenEmbedBlocked: true,
            plainRoles: "one polymorphemic verbstem; no embed/matrix from hyphen",
            wholeSourceKind: "whole-stem",
            wholeSourceSelectedBy: "typed-source-constituents",
            tomSourceKind: "internal-morphemes",
            tomSourceSelectedBy: "typed-source-constituents",
            tomSourceTypedAvailable: true,
            tomHostileStatus: "authorized",
            tomHostileReason: "",
            tomHostileActions: [
                "select-typed-embed-matrix-source",
                "accept-user-source-selection-from-matching-typed-constituents",
                "carry-source-selection-to-selected-output",
            ],
            chicoUserSourceKind: "embed-matrix",
            chicoUserSelectedBy: "typed-user-source",
            chicoUserTypedAuthorized: true,
            chicoUserEmbed: "chico",
            chicoUserMatrix: "mati",
            ahcoSourceKind: "internal-morphemes",
            ahcoSourceSelectedBy: "typed-source-constituents",
            zacaSourceKind: "internal-morphemes",
            zacaSourceSelectedBy: "typed-source-constituents",
            zacaSourceEmbed: "",
            zacaSourceMatrix: "",
            zacaHostileStatus: "authorized",
            zacaHostileReason: "",
            ixChihuaSourceKind: "internal-morphemes",
            ixChihuaSourceSelectedBy: "typed-source-constituents",
            ixChihuaSourceTypedAvailable: true,
            ixChihuaUserSourceKind: "embed-matrix",
            ixChihuaUserSelectedBy: "typed-user-source",
            ixChihuaUserTypedAuthorized: true,
            ixChihuaUserEmbed: "ix",
            ixChihuaUserMatrix: "chihua",
            generalCompoundKind: "embed-matrix",
            generalCompoundSelectedBy: "typed-user-source",
            generalCompoundTypedAuthorized: true,
            generalCompoundPartsMatchStem: true,
            generalCompoundGenerationAllowed: false,
            reversedCompoundStatus: "blocked",
            reversedCompoundReason: "typed-embed-matrix-constituents-mismatch-source-stem",
        }
    );

    s.eq(
        "Classical Lesson 7 perfective stems match the Transcription Canvas examples",
        (() => {
            const cases = [
                ["7.3 A-1", "(choca)", "A", ["choca"]],
                ["7.3 A-1", "(ihza)", "A", ["ihza"]],
                ["7.3 A-2", "(temo)", "A", ["temo"]],
                ["7.3 A-2", "(ehco)", "A", ["ehco"]],
                ["7.3 B", "(yoli)", "B", ["yol"]],
                ["7.3 B", "tla-(chihua)", "B", ["chiuh"]],
                ["7.3 B", "(tomi)", "B", ["ton"]],
                ["7.3 B", "tla-(tom-a)", "B", [`ton-\u2395`]],
                ["7.3 C", "(chol-o-a)", "C", ["chol-o-h"]],
                ["7.3 C", "te-(a-l-ti-a)", "C", ["a-l-ti-h"]],
                ["7.3 D", "(ya)", "D", ["yah"]],
                ["7.4 qu>c", "(miqui)", "B", ["mic"]],
                ["7.4 c>z", "(nēci)", "B", ["nēz"]],
                ["7.4 hu>uh", "(cē-hui)", "B", ["cē-uh"]],
                ["7.4 cu>uc", "tla-(tzacu-a)", "B", ["tzauc"]],
                ["7.4 m>n", "(nemi)", "B", ["nen"]],
                ["7.4 y>x", "(tlaōco-ya)", "B", ["tlaōco-x"]],
                ["7.4 y>z", "(cel-i-ya)", "B", ["cel-i-z"]],
                ["7.4 y>z", "(izta-ya)", "B", ["izta-z"]],
                ["7.4 traditional zōhua", "tla-(zōhua)", "B", ["zōuh"]],
                ["7.4 traditional chiya", "tē-(chiya)", "B", ["chix"]],
                ["7.4 traditional chiye", "tē-(chiye)", "B", ["chix"]],
                ["7.4 traditional ce-ya", "(ce-ya)", "B", ["ce-z"]],
                ["7.4 traditional āyi", "tla-(āyi)", "B", ["āx"]],
                ["7.5 variable A", "(yēc-ti-ya)", "A", ["yēc-ti-ya"]],
                ["7.5 variable B", "(yēc-ti-ya)", "B", ["yēc-ti-x"]],
                ["7.5 variable A", "(cel-i-ya)", "A", ["cel-i-ya"]],
                ["7.5 variable B", "(cel-i-ya)", "B", ["cel-i-z"]],
                ["7.5 variable A", "(ē-hua)", "A", ["ē-hua"]],
                ["7.5 variable B", "(ē-hua)", "B", ["ē-uh"]],
                ["7.6.1 monosyllabic A", "tla-(pī)", "A", ["pī"]],
                ["7.6.1 monosyllabic A", "tla-(ī)", "A", ["ī"]],
                ["7.6.1 monosyllabic A", "(o)", "A", ["o"]],
                ["7.6.1 monosyllabic A", "tla-(cui)", "A", ["cui"]],
                ["7.6.1 monosyllabic A", "m-o-(zō)", "A", ["zō"]],
                ["7.6.1 exception A", "*(ā)", "A", ["ā"]],
                ["7.6.2 Class A", "(tzīn-ti)", "A", ["tzin-ti"]],
                ["7.6.2 Class A", "(pil-ca)", "A", ["pil-ca"]],
                ["7.6.2 Class A", "tla-(itqui)", "A", ["itqui"]],
                ["7.6.2 Class A", "(ix-hui)", "A", ["ix-hui"]],
                ["7.6.2 Class A", "(iuc-ci)", "A", ["iuc-ci"]],
                ["7.6.2 Class A", "(chihcha)", "A", ["chihcha"]],
                ["7.6.2 Class A", "(tzahtzi)", "A", ["tzahtzi"]],
                ["7.6.2 Class A", "tē-(itt-a)", "A", ["itt-a"]],
                ["7.6.3 Class A", "(po-pō-ca)", "A", ["po-pō-ca"]],
                ["7.6.3 Class A", "tē-(toca)", "A", ["toca"]],
                ["7.6.3 variable A", "tla-(pāca)", "A", ["pāca"]],
                ["7.6.3 variable B", "tla-(pāca)", "B", ["pāc"]],
                ["7.6.4 Class A", "(tla-tla)", "A", ["tla-tla"]],
                ["7.6.4 Class A", "tla-(mōtla)", "A", ["mōtla"]],
                ["7.6.5 Class A", "(tom-ā-hua)", "A", ["tom-ā-hua"]],
                ["7.6.5 Class A", "(chip-ā-hua)", "A", ["chip-ā-hua"]],
                ["7.6.6 Class B", "tla-(yōcoya)", "B", ["yōcox"]],
                ["7.6.6 Class B", "tla-(ō-ya)", "B", ["ō-x"]],
                ["7.6.6 Class B", "(izta-ya)", "B", ["izta-z"]],
                ["7.6.6 Class B", "(cel-i-ya)", "B", ["cel-i-z"]],
                ["7.6.6 variable A", "(izta-ya)", "A", ["izta-ya"]],
                ["7.6.6 variable B", "(izta-ya)", "B", ["izta-z"]],
                ["7.6.6 variable A", "(chichi-ya)", "A", ["chichi-ya"]],
                ["7.6.6 variable B", "(chichi-ya)", "B", ["chichi-x"]],
                ["7.6.7 Class A", "(o)", "A", ["o"]],
                ["7.6.7 Class A", "(tlehcō)", "A", ["tlehcō"]],
                ["7.6.8 Class D", "tla-(cuā)", "D", ["cuah"]],
                ["7.6.8 Class D", "tla-(mā)", "D", ["mah"]],
                ["7.6.8 Class D", "tla-(pā)", "D", ["pah"]],
                ["7.6.8 Class D", "tla-(ihuā)", "D", ["ihuah"]],
                ["7.6.8 Class D", "tla-(māmā)", "D", ["māmah"]],
                ["7.6.8 Class D variant", "tla-(mēmē)", "D", ["mēmeh"]],
                ["7.6.8 Class D", "tla-(nāhuā)", "D", ["nāhuah"]],
                ["7.6.8 Class D", "(yā)", "D", ["yah"]],
                ["7.6.8 Class D", "m-o-(zōmā)", "D", ["zōmah"]],
            ];
            const mismatches = cases.flatMap(([section, source, verbClass, expected]) => {
                const frame = ctx.buildClassicalNahuatlVerbstemClassRuleFrame(source, { verbClass });
                return expected.includes(frame.perfectiveStem)
                    ? []
                    : [{
                        section,
                        source,
                        verbClass,
                        expected: expected.join(" ~ "),
                        actual: frame.perfectiveStem,
                        changeRule: frame.perfectiveChangeRule,
                    }];
            });
            return {
                checked: cases.length,
                mismatches,
            };
        })(),
        {
            checked: 71,
            mismatches: [],
        }
    );

    s.eq(
        "Classical Lesson 7.3 gates imperfective shape alternants by Canvas tense context",
        (() => {
            const futureClassC = ctx.buildClassicalNahuatlVerbstemClassFrame("(xō-chi-tēm-o-ā)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "future",
                verbClass: "C",
            });
            const optativeSingularClassC = ctx.buildClassicalNahuatlVerbstemClassFrame("(xō-chi-tēm-o-ā)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "C",
            });
            const optativePluralClassC = ctx.buildClassicalNahuatlVerbstemClassFrame("(xō-chi-tēm-o-ā)", {
                valence: "intransitive",
                subject: "2pl",
                mood: "optative",
                tense: "nonpast",
                verbClass: "C",
            });
            const presentPluralClassC = ctx.buildClassicalNahuatlVerbstemClassFrame("(xō-chi-tēm-o-ā)", {
                valence: "intransitive",
                subject: "1pl",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
            });
            const presentSingularClassC = ctx.buildClassicalNahuatlVerbstemClassFrame("(xō-chi-tēm-o-ā)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
            });
            const presentSingularA2 = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const optativePluralA2 = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1pl",
                mood: "optative",
                tense: "nonpast",
                verbClass: "A",
            });
            const dImperfect = ctx.buildClassicalNahuatlVerbstemClassFrame("(yā)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "imperfect",
                verbClass: "D",
            });
            const dPastOptative = ctx.buildClassicalNahuatlVerbstemClassFrame("(yā)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "optative",
                tense: "past",
                verbClass: "D",
            });
            const solidFutureClassC = ctx.buildClassicalNahuatlVerbstemClassFrame("(choloā)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "C",
            });
            const hostileSolidFutureClassC = ctx.buildClassicalNahuatlVerbstemClassFrame("(choloā)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "C",
                predicateStemVariantOverride: "cholo",
            });
            const a2Admonitive = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
            });
            const dOptative = ctx.buildClassicalNahuatlVerbstemClassFrame("(yā)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "D",
            });
            const dOptativePlural = ctx.buildClassicalNahuatlVerbstemClassFrame("(yā)", {
                valence: "intransitive",
                subject: "1pl",
                mood: "optative",
                tense: "nonpast",
                verbClass: "D",
            });
            const futureFillers = futureClassC.selectedOutputLogicFrame.outputFillers;
            const futureStep = futureClassC.selectedOutputLogicFrame.steps.find((step) => step.layer === "aspect-stem") || {};
            const futureShapeRule = futureClassC.predicateFormationRuleFrame.ruleRefs.find((rule) => (
                rule.id === "cn-l7-73-class-c-truncated-nonpast-optative-singular"
            ));
            return {
                futureStemVariant: futureClassC.predicateFormationRuleFrame.stemVariant,
                futureFormulaUsesTruncatedLong: futureClassC.formulaRealization.includes("(xō-chi-tēm-ō)z+"),
                futureFormulaRejectsFull: !futureClassC.formulaRealization.includes("(xō-chi-tēm-o-ā)z+"),
                futureSelectedShape: futureClassC.predicateFormationRuleFrame.selectedImperfectiveShape,
                futureUnderlyingStemVariant: futureClassC.predicateFormationRuleFrame.underlyingStemVariant,
                futureAnalyzedStemVariant: futureClassC.predicateFormationRuleFrame.analyzedStemVariant,
                futureSilentCarrierPreserved: futureClassC.predicateFormationRuleFrame.silentTruncatedCarrierPreserved,
                futureSilentCarrierPrinted: futureClassC.predicateFormationRuleFrame.silentTruncatedCarrierPrintedInLessonAnalysis,
                futureFreeSwitchAllowed: futureClassC.predicateFormationRuleFrame.freeShapeSwitchAllowed,
                futureRejectedStemVariants: futureClassC.predicateFormationRuleFrame.hostileRejectedStemVariants,
                futureShapeActions: futureClassC.predicateFormationRuleFrame.shapeActions,
                futureSelectedOutputShape: futureFillers.selectedImperfectiveShape,
                futureSelectedOutputUnderlying: futureFillers.underlyingStemVariant,
                futureSelectedOutputRejectsFull: futureFillers.hostileRejectedStemVariants.includes("xō-chi-tēm-o-ā"),
                futureStepShape: futureStep.selectedImperfectiveShape,
                futureStepRejectsFull: (futureStep.hostileRejectedStemVariants || []).includes("xō-chi-tēm-o-ā"),
                futureShapeWitnessLine: futureShapeRule?.lineStart || 0,
                optativeSingularStemVariant: optativeSingularClassC.predicateFormationRuleFrame.stemVariant,
                optativeSingularReason: optativeSingularClassC.predicateFormationRuleFrame.selectedImperfectiveShapeReason,
                optativePluralStemVariant: optativePluralClassC.predicateFormationRuleFrame.stemVariant,
                optativePluralUsesTruncatedLong: optativePluralClassC.formulaRealization.includes("(xō-chi-tēm-ō)0+c-ān#"),
                optativePluralRejectedStemVariants: optativePluralClassC.predicateFormationRuleFrame.hostileRejectedStemVariants,
                presentPluralStemVariant: presentPluralClassC.predicateFormationRuleFrame.stemVariant,
                presentPluralUsesShortFullStem: presentPluralClassC.formulaRealization.includes("(xō-chi-tēm-o-a)0+0-h#"),
                presentPluralRejectsLongFullStem: !presentPluralClassC.formulaRealization.includes("(xō-chi-tēm-o-ā)0+0-h#"),
                presentPluralShape: presentPluralClassC.predicateFormationRuleFrame.selectedImperfectiveShape,
                presentSingularClassCStemVariant: presentSingularClassC.predicateFormationRuleFrame.stemVariant,
                presentSingularClassCRejectsLong: !presentSingularClassC.formulaRealization.includes("(xō-chi-tēm-o-ā)"),
                presentSingularA2StemVariant: presentSingularA2.predicateFormationRuleFrame.stemVariant,
                presentSingularA2VowelAction: presentSingularA2.selectedOutputLogicFrame.outputFillers.vowelLengthOperation,
                optativePluralA2StemVariant: optativePluralA2.predicateFormationRuleFrame.stemVariant,
                optativePluralA2RejectsShort: !optativePluralA2.formulaRealization.includes("(temo)"),
                dImperfectStemVariant: dImperfect.predicateFormationRuleFrame.stemVariant,
                dImperfectRejectsShort: !dImperfect.formulaRealization.includes("(ya)"),
                dPastOptativeStemVariant: dPastOptative.predicateFormationRuleFrame.stemVariant,
                solidFutureStemVariant: solidFutureClassC.predicateFormationRuleFrame.stemVariant,
                solidFutureFormulaUsesLongTruncation: solidFutureClassC.formulaRealization.includes("(cholō)z+"),
                hostileSolidFutureStatus: hostileSolidFutureClassC.predicateFormationRuleFrame.authorizationStatus,
                hostileSolidFutureFormula: hostileSolidFutureClassC.formulaRealization,
                hostileSolidFutureRejectedShort: hostileSolidFutureClassC.predicateFormationRuleFrame.hostileRejectedStemVariants.includes("cholo"),
                a2AdmonitiveStemVariant: a2Admonitive.predicateFormationRuleFrame.stemVariant,
                a2AdmonitiveRejectsLong: !a2Admonitive.formulaRealization.includes("(temō)"),
                a2AdmonitiveShape: a2Admonitive.predicateFormationRuleFrame.selectedImperfectiveShape,
                dOptativeStemVariant: dOptative.predicateFormationRuleFrame.stemVariant,
                dOptativeRejectsLong: !dOptative.formulaRealization.includes("(yā)"),
                dOptativeShape: dOptative.predicateFormationRuleFrame.selectedImperfectiveShape,
                dOptativePluralStemVariant: dOptativePlural.predicateFormationRuleFrame.stemVariant,
                dOptativePluralRejectsShort: !dOptativePlural.formulaRealization.includes("(ya)"),
            };
        })(),
        {
            futureStemVariant: "xō-chi-tēm-ō",
            futureFormulaUsesTruncatedLong: true,
            futureFormulaRejectsFull: true,
            futureSelectedShape: "class-c-truncated-long-imperfective-before-future-z",
            futureUnderlyingStemVariant: "xō-chi-tēm-ō-\u2395",
            futureAnalyzedStemVariant: "xō-chi-tēm-ō",
            futureSilentCarrierPreserved: true,
            futureSilentCarrierPrinted: false,
            futureFreeSwitchAllowed: false,
            futureRejectedStemVariants: ["xō-chi-tēm-o-ā", "xō-chi-tēm-o"],
            futureShapeActions: [
                "block-free-imperfective-shape-switch",
                "select-tense-conditioned-imperfective-shape",
                "preserve-silent-truncated-derivational-carrier",
            ],
            futureSelectedOutputShape: "class-c-truncated-long-imperfective-before-future-z",
            futureSelectedOutputUnderlying: "xō-chi-tēm-ō-\u2395",
            futureSelectedOutputRejectsFull: true,
            futureStepShape: "class-c-truncated-long-imperfective-before-future-z",
            futureStepRejectsFull: true,
            futureShapeWitnessLine: 2948,
            optativeSingularStemVariant: "xō-chi-tēm-o",
            optativeSingularReason: "class-c-singular-nonpast-optative-short-vocable-final",
            optativePluralStemVariant: "xō-chi-tēm-ō",
            optativePluralUsesTruncatedLong: true,
            optativePluralRejectedStemVariants: ["xō-chi-tēm-o-ā", "xō-chi-tēm-o"],
            presentPluralStemVariant: "xō-chi-tēm-o-a",
            presentPluralUsesShortFullStem: true,
            presentPluralRejectsLongFullStem: true,
            presentPluralShape: "class-c-full-short-imperfective-before-plural-0-h",
            presentSingularClassCStemVariant: "xō-chi-tēm-o-a",
            presentSingularClassCRejectsLong: true,
            presentSingularA2StemVariant: "temo",
            presentSingularA2VowelAction: "shorten-class-a2-vowel-at-zero-tense-boundary",
            optativePluralA2StemVariant: "temō",
            optativePluralA2RejectsShort: true,
            dImperfectStemVariant: "yā",
            dImperfectRejectsShort: true,
            dPastOptativeStemVariant: "yā",
            solidFutureStemVariant: "cholō",
            solidFutureFormulaUsesLongTruncation: true,
            hostileSolidFutureStatus: "blocked",
            hostileSolidFutureFormula: "",
            hostileSolidFutureRejectedShort: true,
            a2AdmonitiveStemVariant: "temo",
            a2AdmonitiveRejectsLong: true,
            a2AdmonitiveShape: "class-a2-short-shape-in-nonpast-admonitive",
            dOptativeStemVariant: "ya",
            dOptativeRejectsLong: true,
            dOptativeShape: "class-d-short-imperfective-vocable-final",
            dOptativePluralStemVariant: "yā",
            dOptativePluralRejectsShort: true,
        }
    );

    s.eq(
        "Classical Lesson 7.7 predicate table cells govern selected core-plus-tense carriers",
        (() => {
            const a2Preterit = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "A",
            });
            const hostileA2Preterit = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "A",
                predicateStemVariantOverride: "temo",
            });
            const a2Admonitive = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
            });
            const hostileA2Admonitive = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                predicateCarrierOverride: "(temō)h+",
            });
            const dFuture = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(cuā)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "future",
                verbClass: "D",
            });
            const hostileDFuture = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(cuā)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "future",
                verbClass: "D",
                predicateCarrierOverride: "(cua)z+",
            });
            const a2Fillers = a2Preterit.selectedOutputLogicFrame.outputFillers;
            const a2Step = a2Preterit.selectedOutputLogicFrame.steps.find((step) => step.layer === "aspect-stem") || {};
            return {
                a2PreteritFormula: a2Preterit.formulaRealization,
                a2PreteritCarrier: a2Preterit.predicateFormationRuleFrame.predicateExpectedCarrier,
                a2PreteritTableCell: a2Preterit.predicateFormationRuleFrame.predicateTableCell,
                a2PreteritRuleId: a2Preterit.predicateFormationRuleFrame.predicateTableRuleId,
                a2PreteritActions: a2Preterit.predicateFormationRuleFrame.predicateActions,
                a2SelectedCarrier: a2Fillers.predicateExpectedCarrier,
                a2SelectedTableCell: a2Fillers.predicateTableCell,
                a2StepCarrier: a2Step.predicateExpectedCarrier,
                a2StepActions: a2Step.predicateActions,
                hostileA2PreteritPredicateStatus: hostileA2Preterit.predicateFormationRuleFrame.authorizationStatus,
                hostileA2PreteritProofStatus: hostileA2Preterit.proofFrame.proofStatus,
                hostileA2PreteritFormula: hostileA2Preterit.formulaRealization,
                hostileA2PreteritBlocked: hostileA2Preterit.predicateFormationRuleFrame.predicateCarrierContradictionBlocked,
                hostileA2PreteritReason: hostileA2Preterit.predicateFormationRuleFrame.predicateCarrierContradictionReason,
                hostileA2PreteritRejectedCarriers: hostileA2Preterit.predicateFormationRuleFrame.hostileRejectedPredicateCarriers,
                a2AdmonitiveFormula: a2Admonitive.formulaRealization,
                a2AdmonitiveCarrier: a2Admonitive.predicateFormationRuleFrame.predicateExpectedCarrier,
                hostileA2AdmonitivePredicateStatus: hostileA2Admonitive.predicateFormationRuleFrame.authorizationStatus,
                hostileA2AdmonitiveRejectedCarriers: hostileA2Admonitive.predicateFormationRuleFrame.hostileRejectedPredicateCarriers,
                dFutureFormula: dFuture.formulaRealization,
                dFutureCarrier: dFuture.predicateFormationRuleFrame.predicateExpectedCarrier,
                dFutureTableCell: dFuture.predicateFormationRuleFrame.predicateTableCell,
                hostileDFuturePredicateStatus: hostileDFuture.predicateFormationRuleFrame.authorizationStatus,
                hostileDFutureRejectedCarriers: hostileDFuture.predicateFormationRuleFrame.hostileRejectedPredicateCarriers,
            };
        })(),
        {
            a2PreteritFormula: "#ni-0(temō)0+c-0#",
            a2PreteritCarrier: "(temō)0+",
            a2PreteritTableCell: "A:A-2:indicative:preterit",
            a2PreteritRuleId: "cn-l7-77-class-a2-predicate-table-cells",
            a2PreteritActions: [
                "select-canvas-7.7-predicate-table-cell",
                "require-core-before-tense-in-predicate-carrier",
                "carry-predicate-table-cell-to-selected-output",
            ],
            a2SelectedCarrier: "(temō)0+",
            a2SelectedTableCell: "A:A-2:indicative:preterit",
            a2StepCarrier: "(temō)0+",
            a2StepActions: [
                "select-canvas-7.7-predicate-table-cell",
                "require-core-before-tense-in-predicate-carrier",
                "carry-predicate-table-cell-to-selected-output",
            ],
            hostileA2PreteritPredicateStatus: "blocked",
            hostileA2PreteritProofStatus: "blocked",
            hostileA2PreteritFormula: "",
            hostileA2PreteritBlocked: true,
            hostileA2PreteritReason: "requested-predicate-carrier-not-authorized-by-canvas-7.7-table",
            hostileA2PreteritRejectedCarriers: ["(temo)0+"],
            a2AdmonitiveFormula: "#ni-0(temo)h+\u2395-0#",
            a2AdmonitiveCarrier: "(temo)h+",
            hostileA2AdmonitivePredicateStatus: "blocked",
            hostileA2AdmonitiveRejectedCarriers: ["(temō)h+"],
            dFutureFormula: "#ni-0+tla(cuā)z+\u2395-0#",
            dFutureCarrier: "(cuā)z+",
            dFutureTableCell: "D:indicative:future",
            hostileDFuturePredicateStatus: "blocked",
            hostileDFutureRejectedCarriers: ["(cua)z+"],
        }
    );

    s.eq(
        "Classical Lesson 7.4 blocks traditional spelling from hiding Class B w/y changes",
        (() => {
            const sources = [
                ["tla-(zōhua)", "zōuh", "w", "owa", "class-b-traditional-hidden-w-owa-to-uh"],
                ["tē-(chiya)", "chix", "y", "iya", "class-b-traditional-hidden-y-iya-to-x"],
                ["tē-(chiye)", "chix", "y", "iye", "class-b-traditional-hidden-y-iye-to-x"],
                ["(ce-ya)", "ce-z", "y", "eya", "class-b-traditional-hidden-y-eya-to-z"],
                ["tla-(āyi)", "āx", "y", "ayi", "class-b-traditional-hidden-y-ayi-to-x"],
            ];
            const frames = sources.map(([source]) => ctx.buildClassicalNahuatlVerbstemClassRuleFrame(source, {
                verbClass: "B",
            }));
            const fullFrame = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(zōhua)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const selected = fullFrame.selectedOutputLogicFrame.outputFillers;
            const classStep = fullFrame.selectedOutputLogicFrame.steps.find((step) => step.layer === "verbstem-class") || {};
            const controlClassC = ctx.buildClassicalNahuatlVerbstemClassRuleFrame("(chol-o-a)");
            return {
                inferred: frames.map((frame, index) => ({
                    source: sources[index][0],
                    classId: frame.classId,
                    rejectsClassA: frame.classId !== "A",
                    rejectsClassC: frame.classId !== "C",
                    perfectiveStem: frame.perfectiveStem,
                    hiddenSound: frame.hiddenTraditionalSpellingSound,
                    hiddenSequence: frame.hiddenTraditionalSpellingSequence,
                    changeRule: frame.perfectiveChangeRule,
                    warningPresent: frame.traditionalSpellingWarningPresent,
                    misreadBlocked: frame.traditionalSpellingMisclassificationBlocked,
                    actions: frame.classActions.filter((action) => (
                        action === "apply-traditional-spelling-warning"
                        || action === "block-traditional-oa-ia-class-c-misread"
                        || action === "preserve-hidden-w-y-class-b-change"
                    )),
                    witnessLine: frame.traditionalSpellingWarningRecord?.lineStart || 0,
                    expectedPerfective: sources[index][1],
                    expectedHiddenSound: sources[index][2],
                    expectedHiddenSequence: sources[index][3],
                    expectedChangeRule: sources[index][4],
                })),
                selectedFormula: fullFrame.formulaRealization,
                selectedRejectsUnchangedZohua: !fullFrame.formulaRealization.includes("(zōhua)"),
                selectedUsesZouh: fullFrame.formulaRealization.includes("(zōuh)"),
                selectedWarningPresent: selected.traditionalSpellingWarningPresent,
                selectedBlocksMisread: selected.traditionalSpellingMisclassificationBlocked,
                selectedChangeRule: selected.traditionalSpellingChangeRule,
                selectedHiddenSound: selected.hiddenTraditionalSpellingSound,
                selectedHasClassBChangeWitness: fullFrame.selectedOutputLogicFrame.legalWitnessTagIds.includes("cn-l7-class-b-perfective-changes"),
                classStepWarningPresent: classStep.traditionalSpellingWarningPresent,
                classStepBlocksMisread: classStep.traditionalSpellingMisclassificationBlocked,
                controlClassCClassId: controlClassC.classId,
                controlClassCWarningPresent: controlClassC.traditionalSpellingWarningPresent,
            };
        })(),
        {
            inferred: [
                {
                    source: "tla-(zōhua)",
                    classId: "B",
                    rejectsClassA: true,
                    rejectsClassC: true,
                    perfectiveStem: "zōuh",
                    hiddenSound: "w",
                    hiddenSequence: "owa",
                    changeRule: "class-b-traditional-hidden-w-owa-to-uh",
                    warningPresent: true,
                    misreadBlocked: true,
                    actions: [
                        "apply-traditional-spelling-warning",
                        "block-traditional-oa-ia-class-c-misread",
                        "preserve-hidden-w-y-class-b-change",
                    ],
                    witnessLine: 2975,
                    expectedPerfective: "zōuh",
                    expectedHiddenSound: "w",
                    expectedHiddenSequence: "owa",
                    expectedChangeRule: "class-b-traditional-hidden-w-owa-to-uh",
                },
                {
                    source: "tē-(chiya)",
                    classId: "B",
                    rejectsClassA: true,
                    rejectsClassC: true,
                    perfectiveStem: "chix",
                    hiddenSound: "y",
                    hiddenSequence: "iya",
                    changeRule: "class-b-traditional-hidden-y-iya-to-x",
                    warningPresent: true,
                    misreadBlocked: true,
                    actions: [
                        "apply-traditional-spelling-warning",
                        "block-traditional-oa-ia-class-c-misread",
                        "preserve-hidden-w-y-class-b-change",
                    ],
                    witnessLine: 2975,
                    expectedPerfective: "chix",
                    expectedHiddenSound: "y",
                    expectedHiddenSequence: "iya",
                    expectedChangeRule: "class-b-traditional-hidden-y-iya-to-x",
                },
                {
                    source: "tē-(chiye)",
                    classId: "B",
                    rejectsClassA: true,
                    rejectsClassC: true,
                    perfectiveStem: "chix",
                    hiddenSound: "y",
                    hiddenSequence: "iye",
                    changeRule: "class-b-traditional-hidden-y-iye-to-x",
                    warningPresent: true,
                    misreadBlocked: true,
                    actions: [
                        "apply-traditional-spelling-warning",
                        "block-traditional-oa-ia-class-c-misread",
                        "preserve-hidden-w-y-class-b-change",
                    ],
                    witnessLine: 2975,
                    expectedPerfective: "chix",
                    expectedHiddenSound: "y",
                    expectedHiddenSequence: "iye",
                    expectedChangeRule: "class-b-traditional-hidden-y-iye-to-x",
                },
                {
                    source: "(ce-ya)",
                    classId: "B",
                    rejectsClassA: true,
                    rejectsClassC: true,
                    perfectiveStem: "ce-z",
                    hiddenSound: "y",
                    hiddenSequence: "eya",
                    changeRule: "class-b-traditional-hidden-y-eya-to-z",
                    warningPresent: true,
                    misreadBlocked: true,
                    actions: [
                        "apply-traditional-spelling-warning",
                        "block-traditional-oa-ia-class-c-misread",
                        "preserve-hidden-w-y-class-b-change",
                    ],
                    witnessLine: 2975,
                    expectedPerfective: "ce-z",
                    expectedHiddenSound: "y",
                    expectedHiddenSequence: "eya",
                    expectedChangeRule: "class-b-traditional-hidden-y-eya-to-z",
                },
                {
                    source: "tla-(āyi)",
                    classId: "B",
                    rejectsClassA: true,
                    rejectsClassC: true,
                    perfectiveStem: "āx",
                    hiddenSound: "y",
                    hiddenSequence: "ayi",
                    changeRule: "class-b-traditional-hidden-y-ayi-to-x",
                    warningPresent: true,
                    misreadBlocked: true,
                    actions: [
                        "apply-traditional-spelling-warning",
                        "block-traditional-oa-ia-class-c-misread",
                        "preserve-hidden-w-y-class-b-change",
                    ],
                    witnessLine: 2975,
                    expectedPerfective: "āx",
                    expectedHiddenSound: "y",
                    expectedHiddenSequence: "ayi",
                    expectedChangeRule: "class-b-traditional-hidden-y-ayi-to-x",
                },
            ],
            selectedFormula: "#ni-0+tla(zōuh)0+\u2395-0#",
            selectedRejectsUnchangedZohua: true,
            selectedUsesZouh: true,
            selectedWarningPresent: true,
            selectedBlocksMisread: true,
            selectedChangeRule: "class-b-traditional-hidden-w-owa-to-uh",
            selectedHiddenSound: "w",
            selectedHasClassBChangeWitness: true,
            classStepWarningPresent: true,
            classStepBlocksMisread: true,
            controlClassCClassId: "C",
            controlClassCWarningPresent: false,
        }
    );

    s.eq(
        "Classical Lesson 7.3 preserves silent causative carrier authority in Class B",
        (() => {
            const simple = ctx.buildClassicalNahuatlVerbstemClassRuleFrame("(tomi)", {
                verbClass: "B",
            });
            const silent = ctx.buildClassicalNahuatlVerbstemClassRuleFrame("tla-(tom-a)", {
                verbClass: "B",
            });
            const fullFrame = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(tom-a)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const specificProjective = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(tom-a)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "2sg",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const rightEdgeCompound = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(ci-yo-tom-ā)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const solidRightEdgeCompound = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(ciyotomā)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const tema = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(tem-ā)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const selected = fullFrame.selectedOutputLogicFrame.outputFillers;
            const compoundSelected = rightEdgeCompound.selectedOutputLogicFrame.outputFillers;
            const solidCompoundSelected = solidRightEdgeCompound.selectedOutputLogicFrame.outputFillers;
            const temaSelected = tema.selectedOutputLogicFrame.outputFillers;
            const classStep = fullFrame.selectedOutputLogicFrame.steps.find((step) => step.layer === "verbstem-class");
            return {
                simplePerfectiveStem: simple.perfectiveStem,
                simpleAnalyzedPerfectiveStem: simple.classBAnalyzedPerfectiveStem,
                simpleKind: simple.classBPerfectiveKind,
                simpleUnderlyingPerfectiveStem: simple.classBUnderlyingPerfectiveStem,
                silentPerfectiveStem: silent.perfectiveStem,
                silentAnalyzedPerfectiveStem: silent.classBAnalyzedPerfectiveStem,
                silentKind: silent.classBPerfectiveKind,
                silentUnderlyingPerfectiveStem: silent.classBUnderlyingPerfectiveStem,
                selectedStemVariant: fullFrame.predicateFormationRuleFrame.stemVariant,
                selectedFormula: fullFrame.formulaRealization,
                selectedRejectsBareTon: !fullFrame.formulaRealization.includes("(ton)"),
                specificProjectiveFormula: specificProjective.formulaRealization,
                specificProjectiveRejectsBareTon: !specificProjective.formulaRealization.includes("(ton)"),
                compoundFormula: rightEdgeCompound.formulaRealization,
                compoundStemVariant: rightEdgeCompound.predicateFormationRuleFrame.stemVariant,
                compoundRejectsBareCiYoTon: !rightEdgeCompound.formulaRealization.includes("(ci-yo-ton)"),
                compoundKeepsPrefixInsideStem: rightEdgeCompound.formulaRealization.includes("(ci-yo-ton-\u2395)"),
                compoundDoesNotPromotePrefixToFormulaSlot: !rightEdgeCompound.formulaRealization.includes("+ci-yo"),
                compoundKind: compoundSelected.classBPerfectiveKind,
                compoundCarrierPresent: compoundSelected.classBSilentCausativeCarrierPresent,
                compoundUnderlyingPerfectiveStem: compoundSelected.classBUnderlyingPerfectiveStem,
                compoundTypeOneCausativeStem: compoundSelected.classBTypeOneCausativeWitness?.causativeStem || "",
                compoundCanonicalCausativeStem: compoundSelected.classBTypeOneCausativeWitness?.canonicalCausativeStem || "",
                compoundPrefix: compoundSelected.classBTypeOneCausativeWitness?.compoundPrefix || "",
                compoundRightEdgeMatrixCarrierInherited: compoundSelected.classBTypeOneCausativeWitness?.rightEdgeMatrixCarrierInherited === true,
                compoundRightEdgeCarrierStaysInsideStem: compoundSelected.classBTypeOneCausativeWitness?.carrierStaysInsideCompoundVerbstem === true,
                compoundRightEdgeMatrixLineStart: compoundSelected.classBTypeOneCausativeWitness?.rightEdgeMatrixLineStart || 0,
                solidCompoundFormula: solidRightEdgeCompound.formulaRealization,
                solidCompoundStemVariant: solidRightEdgeCompound.predicateFormationRuleFrame.stemVariant,
                solidCompoundRejectsBareCiyoton: !solidRightEdgeCompound.formulaRealization.includes("(ciyoton)"),
                solidCompoundDoesNotRequireLiteralHyphenWitness: solidCompoundSelected.classBTypeOneCausativeWitness?.solidCausativeBoundaryInferred === true,
                solidCompoundCausativeMorphemeRecognizedByRule: solidCompoundSelected.classBTypeOneCausativeWitness?.causativeMorphemeRecognizedByRule === true,
                solidCompoundKeepsStemSolid: solidRightEdgeCompound.formulaRealization.includes("(ciyoton-\u2395)"),
                solidCompoundDoesNotPromotePrefixToFormulaSlot: !solidRightEdgeCompound.formulaRealization.includes("+ciyo"),
                solidCompoundKind: solidCompoundSelected.classBPerfectiveKind,
                solidCompoundCarrierPresent: solidCompoundSelected.classBSilentCausativeCarrierPresent,
                solidCompoundCausativeStem: solidCompoundSelected.classBTypeOneCausativeWitness?.causativeStem || "",
                solidCompoundCanonicalCausativeStem: solidCompoundSelected.classBTypeOneCausativeWitness?.canonicalCausativeStem || "",
                solidCompoundPrefix: solidCompoundSelected.classBTypeOneCausativeWitness?.compoundPrefix || "",
                temaFormula: tema.formulaRealization,
                temaStemVariant: tema.predicateFormationRuleFrame.stemVariant,
                temaRejectsBareTen: !tema.formulaRealization.includes("(ten)"),
                temaKind: temaSelected.classBPerfectiveKind,
                temaCarrierPresent: temaSelected.classBSilentCausativeCarrierPresent,
                temaUnderlyingPerfectiveStem: temaSelected.classBUnderlyingPerfectiveStem,
                temaTypeOneCausativeStem: temaSelected.classBTypeOneCausativeWitness?.causativeStem || "",
                temaTypeOneCausativeSourceStem: temaSelected.classBTypeOneCausativeWitness?.sourceStem || "",
                temaTypeOneCausativeLineStart: temaSelected.classBTypeOneCausativeWitness?.sourceLineStart || 0,
                silentActions: silent.classActions,
                silentCarrierPresent: silent.classBSilentCausativeCarrierPresent,
                silentCarrier: silent.classBSilentCausativeCarrier,
                silentAnalysisPrintsCarrier: silent.classBAnalysisPrintsSilentCarrier,
                silentAnalysisOmissionPolicy: silent.classBAnalysisOmissionPolicy,
                silentTypeOneCausativeRequired: silent.classBTypeOneCausativeWitnessRequired,
                silentTypeOneCausativeSourceStem: silent.classBTypeOneCausativeWitness?.sourceStem || "",
                silentTypeOneCausativeStem: silent.classBTypeOneCausativeWitness?.causativeStem || "",
                silentTypeOneCausativeLineStart: silent.classBTypeOneCausativeWitness?.sourceLineStart || 0,
                silentTypeOneCausativeClassDifferenceLineStart: silent.classBTypeOneCausativeWitness?.classDifferenceLineStart || 0,
                silentObjectPronounDistinguishesMorphology: silent.classBObjectPronounDistinguishesMorphology,
                silentPhonologicalIdentityDoesNotEraseMorphology: silent.classBPhonologicalIdentityDoesNotEraseMorphology,
                sameAnalyzedPerfectiveButDifferentKinds: simple.classBAnalyzedPerfectiveStem === silent.classBAnalyzedPerfectiveStem
                    && simple.classBPerfectiveKind !== silent.classBPerfectiveKind,
                selectedKind: selected.classBPerfectiveKind,
                selectedUnderlyingPerfectiveStem: selected.classBUnderlyingPerfectiveStem,
                selectedCarrierPresent: selected.classBSilentCausativeCarrierPresent,
                selectedTypeOneCausativeRequired: selected.classBTypeOneCausativeWitnessRequired,
                selectedTypeOneCausativeStem: selected.classBTypeOneCausativeWitness?.causativeStem || "",
                selectedOutputStemVariant: selected.stemVariant,
                selectedHasClassWitness: fullFrame.selectedOutputLogicFrame.legalWitnessTagIds.includes("cn-l7-verbstem-classes"),
                selectedHasLesson24TypeOneCausativeWitness: fullFrame.selectedOutputLogicFrame.legalWitnessTagIds.includes("cn-l24-type-one-causative-a"),
                classStepKind: classStep?.classBPerfectiveKind,
                classStepUnderlyingPerfectiveStem: classStep?.classBUnderlyingPerfectiveStem,
                classStepTypeOneCausativeRequired: classStep?.classBTypeOneCausativeWitnessRequired,
            };
        })(),
        {
            simplePerfectiveStem: "ton",
            simpleAnalyzedPerfectiveStem: "ton",
            simpleKind: "final-vowel-disappears",
            simpleUnderlyingPerfectiveStem: "ton",
            silentPerfectiveStem: `ton-\u2395`,
            silentAnalyzedPerfectiveStem: "ton",
            silentKind: "silent-causative-carrier",
            silentUnderlyingPerfectiveStem: `ton-\u2395`,
            selectedStemVariant: `ton-\u2395`,
            selectedFormula: `#ni-0+tla(ton-\u2395)0+\u2395-0#`,
            selectedRejectsBareTon: true,
            specificProjectiveFormula: `#ni-0+m-itz(ton-\u2395)0+\u2395-0#`,
            specificProjectiveRejectsBareTon: true,
            compoundFormula: `#ni-0+tla(ci-yo-ton-\u2395)0+\u2395-0#`,
            compoundStemVariant: `ci-yo-ton-\u2395`,
            compoundRejectsBareCiYoTon: true,
            compoundKeepsPrefixInsideStem: true,
            compoundDoesNotPromotePrefixToFormulaSlot: true,
            compoundKind: "silent-causative-carrier",
            compoundCarrierPresent: true,
            compoundUnderlyingPerfectiveStem: `ci-yo-ton-\u2395`,
            compoundTypeOneCausativeStem: "tom-ā",
            compoundCanonicalCausativeStem: "tom-a",
            compoundPrefix: "ci-yo",
            compoundRightEdgeMatrixCarrierInherited: true,
            compoundRightEdgeCarrierStaysInsideStem: true,
            compoundRightEdgeMatrixLineStart: 10920,
            solidCompoundFormula: `#ni-0+tla(ciyoton-\u2395)0+\u2395-0#`,
            solidCompoundStemVariant: `ciyoton-\u2395`,
            solidCompoundRejectsBareCiyoton: true,
            solidCompoundDoesNotRequireLiteralHyphenWitness: true,
            solidCompoundCausativeMorphemeRecognizedByRule: true,
            solidCompoundKeepsStemSolid: true,
            solidCompoundDoesNotPromotePrefixToFormulaSlot: true,
            solidCompoundKind: "silent-causative-carrier",
            solidCompoundCarrierPresent: true,
            solidCompoundCausativeStem: "tomā",
            solidCompoundCanonicalCausativeStem: "tom-a",
            solidCompoundPrefix: "ciyo",
            temaFormula: `#ni-0+tla(ten-\u2395)0+\u2395-0#`,
            temaStemVariant: `ten-\u2395`,
            temaRejectsBareTen: true,
            temaKind: "silent-causative-carrier",
            temaCarrierPresent: true,
            temaUnderlyingPerfectiveStem: `ten-\u2395`,
            temaTypeOneCausativeStem: "tēm-a",
            temaTypeOneCausativeSourceStem: "tēmi",
            temaTypeOneCausativeLineStart: 7792,
            silentActions: [
                "determine-class-by-perfective-stem-shape",
                "distinguish-class-b-vowel-loss-from-silent-causative-carrier",
                "require-type-one-causative-a-witness",
                "preserve-silent-causative-carrier-under-analysis-omission",
                "block-phonological-identity-from-erasing-morphology",
            ],
            silentCarrierPresent: true,
            silentCarrier: "\u2395",
            silentAnalysisPrintsCarrier: false,
            silentAnalysisOmissionPolicy: "silent-causative-carrier-not-printed-in-lessons",
            silentTypeOneCausativeRequired: true,
            silentTypeOneCausativeSourceStem: "tomi",
            silentTypeOneCausativeStem: "tom-a",
            silentTypeOneCausativeLineStart: 7770,
            silentTypeOneCausativeClassDifferenceLineStart: 7797,
            silentObjectPronounDistinguishesMorphology: true,
            silentPhonologicalIdentityDoesNotEraseMorphology: true,
            sameAnalyzedPerfectiveButDifferentKinds: true,
            selectedKind: "silent-causative-carrier",
            selectedUnderlyingPerfectiveStem: `ton-\u2395`,
            selectedCarrierPresent: true,
            selectedTypeOneCausativeRequired: true,
            selectedTypeOneCausativeStem: "tom-a",
            selectedOutputStemVariant: `ton-\u2395`,
            selectedHasClassWitness: true,
            selectedHasLesson24TypeOneCausativeWitness: true,
            classStepKind: "silent-causative-carrier",
            classStepUnderlyingPerfectiveStem: `ton-\u2395`,
            classStepTypeOneCausativeRequired: true,
        }
    );

    s.eq(
        "Classical optional irregular mah is conditioned beside regular mat",
        (() => {
            const singularPreterit = ctx.buildClassicalNahuatlVerbstemClassFrame("(mati)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const pluralPreterit = ctx.buildClassicalNahuatlVerbstemClassFrame("(mati)", {
                valence: "intransitive",
                subject: "1pl",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const distantPast = ctx.buildClassicalNahuatlVerbstemClassFrame("(mati)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "distant-past",
                verbClass: "B",
            });
            const transitiveSingularPreterit = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            return {
                singularRegularFormula: singularPreterit.formulaRealization,
                singularSelectedStem: singularPreterit.predicateFormationRuleFrame.stemVariant,
                singularAuthorizedStemVariants: singularPreterit.predicateFormationRuleFrame.authorizedStemVariants,
                singularOptionalStemVariants: singularPreterit.optionalIrregularStemVariants,
                singularOptionalFormulas: singularPreterit.optionalIrregularFormulaRealizations,
                singularPreference: singularPreterit.selectedOutputLogicFrame.outputFillers.optionalIrregularPreference,
                singularHasLesson11Witness: singularPreterit.selectedOutputLogicFrame.legalWitnessTagIds.includes("cn-l11-optional-irregular-ti-perfective"),
                pluralRegularFormula: pluralPreterit.formulaRealization,
                pluralAuthorizedStemVariants: pluralPreterit.predicateFormationRuleFrame.authorizedStemVariants,
                pluralOptionalStemVariants: pluralPreterit.optionalIrregularStemVariants,
                distantPastRegularFormula: distantPast.formulaRealization,
                distantPastOptionalStemVariants: distantPast.optionalIrregularStemVariants,
                transitiveRegularFormula: transitiveSingularPreterit.formulaRealization,
                transitiveOptionalFormulas: transitiveSingularPreterit.optionalIrregularFormulaRealizations,
            };
        })(),
        {
            singularRegularFormula: "#ni-0(mah)0+\u2395-0#",
            singularSelectedStem: "mat",
            singularAuthorizedStemVariants: ["mat", "mah"],
            singularOptionalStemVariants: ["mah"],
            singularOptionalFormulas: ["#ni-0(mat)0+\u2395-0#"],
            singularPreference: "irregular-preferable-where-authorized",
            singularHasLesson11Witness: true,
            pluralRegularFormula: "#ti-0(mat)0+qu-eh#",
            pluralAuthorizedStemVariants: ["mat"],
            pluralOptionalStemVariants: [],
            distantPastRegularFormula: "#ni-0(mat)ca+0-0#",
            distantPastOptionalStemVariants: [],
            transitiveRegularFormula: "#ni-0+tla(mah)0+\u2395-0#",
            transitiveOptionalFormulas: ["#ni-0+tla(mat)0+\u2395-0#"],
        }
    );

    s.eq(
        "Classical Lesson 7 keeps mēmē as a variant stem under māmā",
        (() => {
            const frame = ctx.buildClassicalNahuatlVerbstemClassRuleFrame("tla-(mēmē)");
            return {
                classId: frame.classId,
                guidelineId: frame.guidelineId,
                perfectiveStem: frame.perfectiveStem,
                relationshipKind: frame.stemRelationshipKind,
                variantStemOf: frame.variantStemOf,
                variantStemOfUnmarked: frame.variantStemOfUnmarked,
                relationRuleId: frame.stemRelationship.relationRuleId,
                exactWitness: frame.stemRelationship.exactWitness,
            };
        })(),
        {
            classId: "D",
            guidelineId: "cn-l7-768-class-d-variant-stem",
            perfectiveStem: "mēmeh",
            relationshipKind: "variant-stem",
            variantStemOf: "māmā",
            variantStemOfUnmarked: "mama",
            relationRuleId: "cn-l7-768-class-d-variant-stem",
            exactWitness: "There is a variant stem tla-(mēmē) > tla-(mēmeh).",
        }
    );

    s.eq(
        "Classical Lesson 7.6 guideline witnesses govern class inference and block contradictions",
        (() => {
            const pacaAuto = ctx.buildClassicalNahuatlVerbstemClassRuleFrame("tla-(pāca)");
            const pacaClassB = ctx.buildClassicalNahuatlVerbstemClassRuleFrame("tla-(pāca)", {
                verbClass: "B",
            });
            const pacaClassC = ctx.buildClassicalNahuatlVerbstemClassRuleFrame("tla-(pāca)", {
                verbClass: "C",
            });
            const pacaSelected = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(pāca)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const pacaRejected = ctx.buildClassicalNahuatlVerbstemClassFrame("tla-(pāca)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "C",
            });
            const changeState = ctx.buildClassicalNahuatlVerbstemClassFrame("(tom-ā-hua)", {
                valence: "intransitive",
                signifiesChange: true,
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
            });
            const longAException = ctx.buildClassicalNahuatlVerbstemClassRuleFrame("*(ā)");
            const pacaClassStep = pacaSelected.selectedOutputLogicFrame.steps.find((step) => step.layer === "verbstem-class");
            return {
                pacaAutoClassId: pacaAuto.classId,
                pacaAutoGuideline: pacaAuto.classGuidelineRuleId,
                pacaAutoOptions: pacaAuto.classGuidelineClassOptions,
                pacaAutoPerfective: pacaAuto.perfectiveStem,
                pacaClassBStatus: pacaClassB.authorizationStatus,
                pacaClassBPerfective: pacaClassB.perfectiveStem,
                pacaClassBActions: pacaClassB.classActions,
                pacaClassCStatus: pacaClassC.authorizationStatus,
                pacaClassCBlocked: pacaClassC.classGuidelineContradictionBlocked,
                pacaClassCReason: pacaClassC.classGuidelineContradictionReason,
                pacaSelectedFormula: pacaSelected.formulaRealization,
                pacaSelectedGuideline: pacaSelected.selectedOutputLogicFrame.outputFillers.classGuidelineRuleId,
                pacaSelectedOptions: pacaSelected.selectedOutputLogicFrame.outputFillers.classGuidelineClassOptions,
                pacaClassStepOptions: pacaClassStep?.classGuidelineClassOptions || [],
                pacaClassStepPerfective: pacaClassStep?.classGuidelinePerfectiveStem || "",
                pacaRejectedProofStatus: pacaRejected.proofFrame.proofStatus,
                pacaRejectedSelectedStatus: pacaRejected.selectedOutputLogicFrame.authorizationStatus,
                pacaRejectedFormula: pacaRejected.formulaRealization,
                changeStateGuideline: changeState.classGuidelineRuleId,
                changeStateCondition: changeState.selectedOutputLogicFrame.outputFillers.classGuidelineSemanticCondition,
                changeStateActions: changeState.classActions,
                longAExceptionClassId: longAException.classId,
                longAExceptionKind: longAException.classGuidelineExceptionKind,
                longAExceptionPerfective: longAException.perfectiveStem,
            };
        })(),
        {
            pacaAutoClassId: "A",
            pacaAutoGuideline: "cn-l7-763-final-ka-a",
            pacaAutoOptions: ["A", "B"],
            pacaAutoPerfective: "pāca",
            pacaClassBStatus: "authorized",
            pacaClassBPerfective: "pāc",
            pacaClassBActions: [
                "determine-class-by-perfective-stem-shape",
                "distinguish-class-b-vowel-loss-from-silent-causative-carrier",
                "apply-canvas-guideline-class-witness",
                "preserve-guideline-class-options",
            ],
            pacaClassCStatus: "blocked",
            pacaClassCBlocked: true,
            pacaClassCReason: "explicit-class-not-authorized-by-canvas-guideline-witness",
            pacaSelectedFormula: "#ni-0+tla(pāc)0+\u2395-0#",
            pacaSelectedGuideline: "cn-l7-763-final-ka-a",
            pacaSelectedOptions: ["A", "B"],
            pacaClassStepOptions: ["A", "B"],
            pacaClassStepPerfective: "pāc",
            pacaRejectedProofStatus: "blocked",
            pacaRejectedSelectedStatus: "blocked",
            pacaRejectedFormula: "",
            changeStateGuideline: "cn-l7-765-intransitive-wa-change-a",
            changeStateCondition: "intransitive-final-wa-signifies-change",
            changeStateActions: [
                "determine-class-by-perfective-stem-shape",
                "apply-canvas-guideline-class-witness",
                "preserve-guideline-semantic-condition",
            ],
            longAExceptionClassId: "A",
            longAExceptionKind: "monosyllabic-long-a-class-d-exception",
            longAExceptionPerfective: "ā",
        }
    );

    s.eq(
        "Classical Lesson 7 class authority generalizes Canvas forms beyond its example verbs",
        (() => {
            const novelC = ctx.inferClassicalNahuatlLesson7ClassProfile("cal-o-ā", { valence: "intransitive" });
            const novelClusterA = ctx.inferClassicalNahuatlLesson7ClassProfile("pant-i", { valence: "intransitive" });
            const novelYa = ctx.inferClassicalNahuatlLesson7ClassProfile("mah-ya", { valence: "intransitive" });
            const novelFinalO = ctx.inferClassicalNahuatlLesson7ClassProfile("tepo", { valence: "intransitive" });
            const novelCausative = ctx.inferClassicalNahuatlLesson7ClassProfile("xom-a", { valence: "transitive", finalMorphRole: "causative" });
            const unknown = ctx.inferClassicalNahuatlLesson7ClassProfile("pata", { valence: "intransitive" });
            const shortFinalUnknown = ctx.inferClassicalNahuatlLesson7ClassProfile("temi", { valence: "intransitive" });
            const canvasExample = ctx.inferClassicalNahuatlLesson7ClassProfile("yōli", { valence: "intransitive" });
            return {
                novelC: [novelC.classId, novelC.classGuidelineRuleId, novelC.classDeterminedByGeneralFormRule],
                novelClusterA: [novelClusterA.classId, novelClusterA.classGuidelineRuleId, novelClusterA.classDeterminedByGeneralFormRule],
                novelYa: [novelYa.classId, novelYa.classGuidelineAllowedClassIds, novelYa.classDeterminedByGeneralFormRule],
                novelFinalO: [novelFinalO.classId, novelFinalO.classGuidelineRuleId, novelFinalO.classDeterminedByGeneralFormRule],
                novelCausative: [novelCausative.classId, novelCausative.classGuidelineRuleId, novelCausative.classDeterminedByGeneralFormRule],
                unknown: [unknown.guidelineId, unknown.classDeterminedByGeneralFormRule, unknown.canvasExamplesAreWitnessesNotWhitelist],
                shortFinalUnknown: [
                    shortFinalUnknown.classClaimAllowedClassIds,
                    shortFinalUnknown.classClaimExcludedClassIds,
                    shortFinalUnknown.classClaimEligibilityRuleIds,
                    shortFinalUnknown.classClaimEligibilityReason,
                ],
                canvasExample: [
                    canvasExample.classId,
                    canvasExample.guidelineId,
                    canvasExample.classDeterminedByLexicalException,
                    canvasExample.canvasExamplesAreWitnessesNotWhitelist,
                ],
            };
        })(),
        {
            novelC: ["C", "cn-l7-73-class-c", true],
            novelClusterA: ["A", "cn-l7-762-final-vowel-after-cluster-a", true],
            novelYa: ["B", ["B", "A"], true],
            novelFinalO: ["A", "cn-l7-767-final-o-a", true],
            novelCausative: ["B", "cn-l7-73-class-b-causative-final-a-morph", true],
            unknown: ["cn-l7-76-guidelines-not-majority-prediction", false, true],
            shortFinalUnknown: [
                ["A", "B", "D"],
                ["C"],
                ["cn-l7-73-class-c"],
                "class-c-requires-full-imperfective-final-long-a-after-i-or-o",
            ],
            canvasExample: ["", "cn-l7-76-guidelines-not-majority-prediction", false, true],
        }
    );

    s.eq(
        "Classical Lesson 7.2 uses projective citation representatives, not formula slot placeholders",
        (() => {
            const citation = ctx.buildClassicalNahuatlCitationRuleFrame("(huica)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "2sg",
            });
            const fullFrame = ctx.buildClassicalNahuatlVerbstemClassFrame("(huica)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "2sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const selected = fullFrame.selectedOutputLogicFrame.outputFillers;
            const citationStep = fullFrame.selectedOutputLogicFrame.steps.find((step) => step.layer === "verbcore-citation");
            return {
                citationKind: citation.kind,
                citationStatus: citation.authorizationStatus,
                citationForm: citation.citationForm,
                marker: citation.marker,
                objectRole: citation.objectRole,
                citationActions: citation.citationActions,
                representative: citation.projectiveCitationRepresentative,
                representativeSource: citation.projectiveCitationRepresentativeSource,
                formulaSlotCitationAllowed: citation.formulaSlotCitationAllowed,
                formulaSlotCitationBlocked: citation.formulaSlotCitationBlocked,
                blockedCitationMarkers: citation.blockedCitationMarkers,
                citationUsesFormulaSlotPlaceholder: citation.citationUsesFormulaSlotPlaceholder,
                hostileCitationMarkerRejected: citation.hostileCitationMarkerRejected,
                witnessIds: citation.ruleRefs.map((rule) => rule.id),
                selectedFormula: fullFrame.formulaRealization,
                selectedCitationForm: selected.citationForm,
                selectedCitationActions: selected.citationActions,
                selectedCitationMarker: selected.citationMarker,
                selectedFormulaStillUsesObjectSlots: /\+m-itz/u.test(fullFrame.formulaRealization),
                selectedCitationBlocksPlaceholder: selected.formulaSlotCitationBlocked,
                selectedCitationUsesFormulaSlotPlaceholder: selected.citationUsesFormulaSlotPlaceholder,
                citationStepValue: citationStep?.value,
                citationStepMarker: citationStep?.marker,
                citationStepBlocksPlaceholder: citationStep?.formulaSlotCitationBlocked,
                oldPlaceholderCitationRejected: citation.citationForm !== "va1-va2-(huica)"
                    && selected.citationForm !== "va1-va2-(huica)",
                selectedOutputHasCitationWitness: fullFrame.selectedOutputLogicFrame.legalWitnessTagIds.includes("cn-l7-citation-form"),
            };
        })(),
        {
            citationKind: "classical-nahuatl-verbstem-citation-rule-frame",
            citationStatus: "authorized",
            citationForm: "te-(huica)",
            marker: "te",
            objectRole: "human-projective-citation-representative",
            citationActions: [
                "cite-valence-plus-stem-verbcore",
                "represent-projective-object-with-te-or-tla",
                "block-formula-slot-placeholder-as-citation-marker",
            ],
            representative: "te",
            representativeSource: "object-person-human",
            formulaSlotCitationAllowed: false,
            formulaSlotCitationBlocked: true,
            blockedCitationMarkers: ["va1-va2"],
            citationUsesFormulaSlotPlaceholder: false,
            hostileCitationMarkerRejected: true,
            witnessIds: [
                "cn-l7-72-cite-verbcore-not-isolated-stem",
                "cn-l7-72-citation-object-markers",
                "cn-l7-72-projective-citation-representatives-not-formula-slots",
            ],
            selectedFormula: "#ni-0+m-itz(huica)0+0-0#",
            selectedCitationForm: "te-(huica)",
            selectedCitationActions: [
                "cite-valence-plus-stem-verbcore",
                "represent-projective-object-with-te-or-tla",
                "block-formula-slot-placeholder-as-citation-marker",
            ],
            selectedCitationMarker: "te",
            selectedFormulaStillUsesObjectSlots: true,
            selectedCitationBlocksPlaceholder: true,
            selectedCitationUsesFormulaSlotPlaceholder: false,
            citationStepValue: "te-(huica)",
            citationStepMarker: "te",
            citationStepBlocksPlaceholder: true,
            oldPlaceholderCitationRejected: true,
            selectedOutputHasCitationWitness: true,
        }
    );

    s.eq(
        "Classical Lesson 7 keeps verbcore citation and tla fusion boundaries legal",
        (() => {
            const reflexiveConsonant = ctx.buildClassicalNahuatlVerbstemClassFrame("(zoma)", {
                valence: "mainline-reflexive",
                subject: "2sg",
                mood: "indicative",
                tense: "present",
                verbClass: "D",
            });
            const reflexiveRealVowel = ctx.buildClassicalNahuatlVerbstemClassFrame("(e-hu-a)", {
                valence: "mainline-reflexive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
                initialVowelKind: "real",
            });
            const specificProjectiveSecond = ctx.buildClassicalNahuatlVerbstemClassFrame("(huica)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "2sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const specificProjectiveThird = ctx.buildClassicalNahuatlVerbstemClassFrame("(huica)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const tlaFusion = ctx.buildClassicalNahuatlVerbstemClassFrame("(chiya)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                tlaFusion: true,
            });
            return {
                reflexiveConsonantCitation: reflexiveConsonant.citationForm,
                reflexiveConsonantFormula: reflexiveConsonant.formulaRealization,
                reflexiveConsonantDyad: `${reflexiveConsonant.priorVncFrame.objectFrame.va1}-${reflexiveConsonant.priorVncFrame.objectFrame.va2}`,
                reflexiveRealVowelCitation: reflexiveRealVowel.citationForm,
                reflexiveRealVowelFormula: reflexiveRealVowel.formulaRealization,
                reflexiveRealVowelDyad: `${reflexiveRealVowel.priorVncFrame.objectFrame.va1}-${reflexiveRealVowel.priorVncFrame.objectFrame.va2}`,
                reflexiveRealVowelCodePoint: reflexiveRealVowel.priorVncFrame.objectFrame.va2.codePointAt(0).toString(16).toUpperCase(),
                specificProjectiveSecondStatus: specificProjectiveSecond.selectedOutputLogicFrame.authorizationStatus,
                specificProjectiveSecondCitation: specificProjectiveSecond.citationForm,
                specificProjectiveSecondCitationMarker: specificProjectiveSecond.selectedOutputLogicFrame.outputFillers.citationMarker,
                specificProjectiveSecondCitationActions: specificProjectiveSecond.selectedOutputLogicFrame.outputFillers.citationActions,
                specificProjectiveSecondCitationBlocksPlaceholder: specificProjectiveSecond.selectedOutputLogicFrame.outputFillers.formulaSlotCitationBlocked,
                specificProjectiveSecondCitationUsesPlaceholder: specificProjectiveSecond.selectedOutputLogicFrame.outputFillers.citationUsesFormulaSlotPlaceholder,
                specificProjectiveSecondFormula: specificProjectiveSecond.formulaRealization,
                specificProjectiveSecondDyad: `${specificProjectiveSecond.priorVncFrame.objectFrame.va1}-${specificProjectiveSecond.priorVncFrame.objectFrame.va2}`,
                specificProjectiveSecondObjectKind: specificProjectiveSecond.priorVncFrame.objectFrame.objectKind,
                specificProjectiveThirdFormula: specificProjectiveThird.formulaRealization,
                specificProjectiveThirdDyad: `${specificProjectiveThird.priorVncFrame.objectFrame.va1}-${specificProjectiveThird.priorVncFrame.objectFrame.va2}`,
                tlaFusionCitation: tlaFusion.citationForm,
                tlaFusionFormula: tlaFusion.formulaRealization,
                tlaFusionPriorVncKind: tlaFusion.priorVncFrame.kind,
                tlaFusionSourceFormula: tlaFusion.tlaFusionRuleFrame.sourceFormula,
                tlaFusionTargetFormula: tlaFusion.tlaFusionRuleFrame.targetFormula,
                tlaFusionSelectedAnalysis: tlaFusion.tlaFusionRuleFrame.selectedAnalysis,
                tlaFusionObjectSlotAfterFusion: tlaFusion.tlaFusionRuleFrame.objectSlotAfterFusion,
                tlaFusionBuildKind: tlaFusion.tlaFusionRuleFrame.tlaFusionBuildKind,
                tlaFusionBuildLogic: tlaFusion.tlaFusionRuleFrame.tlaFusionBuildLogic,
                tlaFusionBuildEmbedStem: tlaFusion.tlaFusionRuleFrame.tlaFusionBuildEmbedStem,
                tlaFusionBuildMatrixStem: tlaFusion.tlaFusionRuleFrame.tlaFusionBuildMatrixStem,
                tlaFusionProofStatus: tlaFusion.proofFrame.authorizationStatus,
                hasObjectRelationshipWitness: tlaFusion.selectedOutputLogicFrame.legalWitnessTagIds.includes("cn-l7-indefinite-personal-object-relationship"),
                hasTlaFusionWitness: tlaFusion.selectedOutputLogicFrame.legalWitnessTagIds.includes("cn-l7-tla-fusion"),
            };
        })(),
        {
            reflexiveConsonantCitation: "m-o-(zoma)",
            reflexiveConsonantFormula: "#ti-0+m-o(zoma)0+0-0#",
            reflexiveConsonantDyad: "m-o",
            reflexiveRealVowelCitation: "m-\u2395-(e-hu-a)",
            reflexiveRealVowelFormula: "#ni-0+n-\u2395(e-hu-a)0+0-0#",
            reflexiveRealVowelDyad: "n-\u2395",
            reflexiveRealVowelCodePoint: "2395",
            specificProjectiveSecondStatus: "authorized",
            specificProjectiveSecondCitation: "te-(huica)",
            specificProjectiveSecondCitationMarker: "te",
            specificProjectiveSecondCitationActions: [
                "cite-valence-plus-stem-verbcore",
                "represent-projective-object-with-te-or-tla",
                "block-formula-slot-placeholder-as-citation-marker",
            ],
            specificProjectiveSecondCitationBlocksPlaceholder: true,
            specificProjectiveSecondCitationUsesPlaceholder: false,
            specificProjectiveSecondFormula: "#ni-0+m-itz(huica)0+0-0#",
            specificProjectiveSecondDyad: "m-itz",
            specificProjectiveSecondObjectKind: "specific-projective",
            specificProjectiveThirdFormula: "#0-0+qui-0(huica)0+0-0#",
            specificProjectiveThirdDyad: "qui-0",
            tlaFusionCitation: "tla-(chiya)",
            tlaFusionFormula: "#ni-0(tla-chiya)0+0-0#",
            tlaFusionPriorVncKind: "classical-nahuatl-finite-vnc-slot-result",
            tlaFusionSourceFormula: "#pers1-pers2+tla(chiya)tns+num1-num2#",
            tlaFusionTargetFormula: "#pers1-pers2(tla-chiya)tns+num1-num2#",
            tlaFusionSelectedAnalysis: "#pers1-pers2(tla-chiya)tns+num1-num2#",
            tlaFusionObjectSlotAfterFusion: "none",
            tlaFusionBuildKind: "matrix-plus-tla-fusion",
            tlaFusionBuildLogic: "tla + matrix",
            tlaFusionBuildEmbedStem: "",
            tlaFusionBuildMatrixStem: "chiya",
            tlaFusionProofStatus: "authorized",
            hasObjectRelationshipWitness: true,
            hasTlaFusionWitness: true,
        }
    );

    s.eq(
        "Classical Lesson 7.10 tla fusion boundary test controls selected VNC path",
        (() => {
            const adverbBefore = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "huel",
                adverbPosition: "before-tla",
            });
            const adverbAfter = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "huel",
                adverbPosition: "after-tla",
            });
            const hostileBefore = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "huel",
                adverbPosition: "before-tla",
                hostileTlaFusionAnalysis: "unfused-transitive-tla-object",
            });
            const hostileAfter = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "huel",
                adverbPosition: "after-tla",
                hostileTlaFusionAnalysis: "fused-derived-intransitive",
            });
            const beforeFillers = adverbBefore.selectedOutputLogicFrame.outputFillers;
            const afterFillers = adverbAfter.selectedOutputLogicFrame.outputFillers;
            const beforeStep = adverbBefore.selectedOutputLogicFrame.steps.find((step) => step.layer === "tla-fusion-boundary") || {};
            const afterStep = adverbAfter.selectedOutputLogicFrame.steps.find((step) => step.layer === "tla-fusion-boundary") || {};
            return {
                beforeFormula: adverbBefore.formulaRealization,
                beforePriorVncKind: adverbBefore.priorVncFrame.kind,
                beforeAnalysisKind: beforeFillers.selectedTlaFusionAnalysisKind,
                beforeDerivedStem: beforeFillers.tlaFusionDerivedStem,
                beforeObjectSlotAfterFusion: beforeFillers.objectSlotAfterFusion,
                beforeBoundaryDecision: beforeFillers.adverbBoundaryDecision,
                beforeActions: beforeFillers.tlaFusionActions,
                beforeStepSelectedAnalysis: beforeStep.selectedAnalysis,
                afterFormula: adverbAfter.formulaRealization,
                afterPriorVncKind: adverbAfter.priorVncFrame.kind,
                afterObjectKind: adverbAfter.priorVncFrame.objectFrame.objectKind,
                afterAnalysisKind: afterFillers.selectedTlaFusionAnalysisKind,
                afterSourceStem: afterFillers.tlaFusionSourceStemVariant,
                afterObjectSlotAfterFusion: afterFillers.objectSlotAfterFusion,
                afterBoundaryDecision: afterFillers.adverbBoundaryDecision,
                afterActions: afterFillers.tlaFusionActions,
                afterStepSelectedAnalysis: afterStep.selectedAnalysis,
                hostileBeforeStatus: hostileBefore.proofFrame.authorizationStatus,
                hostileBeforeFormula: hostileBefore.formulaRealization,
                hostileBeforeBlockedBy: hostileBefore.displayReceiptFrame.blockedBy,
                hostileBeforeReason: hostileBefore.tlaFusionRuleFrame.tlaFusionContradictionReason,
                hostileAfterStatus: hostileAfter.proofFrame.authorizationStatus,
                hostileAfterFormula: hostileAfter.formulaRealization,
                hostileAfterBlockedBy: hostileAfter.displayReceiptFrame.blockedBy,
                hostileAfterReason: hostileAfter.tlaFusionRuleFrame.tlaFusionContradictionReason,
            };
        })(),
        {
            beforeFormula: "#ni-0(huel-la-mati)0+0-0#",
            beforePriorVncKind: "classical-nahuatl-finite-vnc-slot-result",
            beforeAnalysisKind: "fused-derived-intransitive",
            beforeDerivedStem: "huel-la-mati",
            beforeObjectSlotAfterFusion: "none",
            beforeBoundaryDecision: "typed-embed-matrix-context-builds-tla-fusion",
            beforeActions: [
                "apply-adverb-before-tla-boundary-test",
                "build-embed-matrix-plus-tla-fusion",
                "move-tla-inside-derived-verbstem",
                "require-derived-intransitive-vnc-after-fusion",
                "carry-tla-fusion-analysis-to-selected-output",
            ],
            beforeStepSelectedAnalysis: "#pers1-pers2(huel-la-mati)tns+num1-num2#",
            afterFormula: "#ni-0+tla(huel-mati)0+0-0#",
            afterPriorVncKind: "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
            afterObjectKind: "nonspecific-nonhuman",
            afterAnalysisKind: "unfused-transitive-tla-object",
            afterSourceStem: "huel-mati",
            afterObjectSlotAfterFusion: "tla",
            afterBoundaryDecision: "typed-after-tla-context-preserves-transitive-tla-object",
            afterActions: [
                "apply-adverb-before-tla-boundary-test",
                "preserve-unfused-transitive-tla-object",
                "carry-tla-fusion-analysis-to-selected-output",
            ],
            afterStepSelectedAnalysis: "#pers1-pers2+tla(huel-mati)tns+num1-num2#",
            hostileBeforeStatus: "blocked",
            hostileBeforeFormula: "",
            hostileBeforeBlockedBy: "object-relationship-and-tla-fusion",
            hostileBeforeReason: "requested-tla-fusion-analysis-contradicts-typed-operation",
            hostileAfterStatus: "blocked",
            hostileAfterFormula: "",
            hostileAfterBlockedBy: "object-relationship-and-tla-fusion",
            hostileAfterReason: "requested-tla-fusion-analysis-contradicts-typed-operation",
        }
    );

    s.eq(
        "Classical Lesson 7.10 constructs tla fusion from typed Source constituents rather than documentary examples",
        (() => {
            const solid = ctx.buildClassicalNahuatlVerbstemClassFrame("(huelmati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "huel",
                adverbPosition: "before-tla",
            });
            const hyphenated = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "huel",
                adverbPosition: "before-tla",
            });
            const nearby = ctx.buildClassicalNahuatlVerbstemClassFrame("(huelmatini)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
            });
            const temoFromIntransitive = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
            });
            const huelIttaUnfused = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-itta)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "A",
                tlaFusion: false,
            });
            const huelIttaFused = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-itta)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "A",
                tlaFusion: true,
                sourceEmbedStem: "huel",
                sourceMatrixStem: "itta",
                incorporatedAdverb: "huel",
                adverbPosition: "before-tla",
            });
            const huelIttaSolidFused = ctx.buildClassicalNahuatlVerbstemClassFrame("(huelitta)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "A",
                tlaFusion: true,
                sourceEmbedStem: "huel",
                sourceMatrixStem: "itta",
                incorporatedAdverb: "huel",
                adverbPosition: "before-tla",
            });
            const huelIttaHostilePrefix = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-itta)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "A",
                tlaFusion: true,
                sourceEmbedStem: "huel",
                sourceMatrixStem: "itta",
                incorporatedAdverb: "huel",
                adverbPosition: "before-tla",
                tlaFusionDerivedStem: "tla-huel-itta",
            });
            const hostileGeneric = ctx.buildClassicalNahuatlVerbstemClassFrame("(huel-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "huel",
                adverbPosition: "before-tla",
                tlaFusionDerivedStem: "tla-huel-mati",
            });
            const ixUnfused = ctx.buildClassicalNahuatlVerbstemClassFrame("(ix-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: false,
            });
            const ixGenericFused = ctx.buildClassicalNahuatlVerbstemClassFrame("(ix-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "ix",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "ix",
                adverbPosition: "before-tla",
            });
            const ixChihuaFused = ctx.buildClassicalNahuatlVerbstemClassFrame("(ix-chihua)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceEmbedStem: "ix",
                sourceMatrixStem: "chihua",
                incorporatedAdverb: "ix",
                adverbPosition: "before-tla",
            });
            const ixChihuaSolidFused = ctx.buildClassicalNahuatlVerbstemClassFrame("(ixchihua)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceEmbedStem: "ix",
                sourceMatrixStem: "chihua",
                incorporatedAdverb: "ix",
                adverbPosition: "before-tla",
            });
            const ixChihuaHostilePrefix = ctx.buildClassicalNahuatlVerbstemClassFrame("(ix-chihua)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceEmbedStem: "ix",
                sourceMatrixStem: "chihua",
                incorporatedAdverb: "ix",
                adverbPosition: "before-tla",
                tlaFusionDerivedStem: "tla-ix-chihua",
            });
            const chicoFused = ctx.buildClassicalNahuatlVerbstemClassFrame("(chico-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "chico",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "chico",
                adverbPosition: "before-tla",
            });
            const chicoHostileGeneric = ctx.buildClassicalNahuatlVerbstemClassFrame("(chico-mati)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "chico",
                sourceMatrixStem: "mati",
                incorporatedAdverb: "chico",
                adverbPosition: "before-tla",
                tlaFusionDerivedStem: "tla-chico-mati",
            });
            return {
                solidFormula: solid.formulaRealization,
                solidDerivedStem: solid.tlaFusionRuleFrame.derivedStem,
                solidSourceStem: solid.tlaFusionRuleFrame.sourceStemVariant,
                solidSourceKind: solid.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedSourceKind,
                solidBoundaryDecision: solid.tlaFusionRuleFrame.adverbBoundaryDecision,
                solidGeneralRule: solid.tlaFusionRuleFrame.generalRule,
                solidSourceSelectedBy: solid.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedBy,
                solidTypedPartsMatch: solid.tlaFusionRuleFrame.typedSourceSelectionFrame.typedPartsMatchStem,
                solidRuleExactDerivedStem: solid.tlaFusionRuleFrame.ruleVariables.exactDerivedStem,
                solidRuleWitnessPolicy: solid.tlaFusionRuleFrame.witnessUsePolicy,
                solidRuleWitnessesWhitelist: solid.tlaFusionRuleFrame.witnessesAreWhitelist,
                solidOutputGeneralRule: solid.selectedOutputLogicFrame.outputFillers.tlaFusionGeneralRule,
                solidOutputRuleSourceStem: solid.selectedOutputLogicFrame.outputFillers.tlaFusionRuleVariables.sourceStemVariant,
                solidOutputRuleObjectSlot: solid.selectedOutputLogicFrame.outputFillers.tlaFusionRuleOutputs.objectSlotAfterFusion,
                solidRejectedGeneric: solid.selectedOutputLogicFrame.outputFillers.tlaFusionDerivedStem !== "tla-huel-mati",
                hyphenatedFormula: hyphenated.formulaRealization,
                hyphenatedDerivedStem: hyphenated.tlaFusionRuleFrame.derivedStem,
                hyphenatedEmbed: hyphenated.tlaFusionRuleFrame.incorporatedAdverb,
                hyphenatedMatrixStem: hyphenated.tlaFusionRuleFrame.matrixStemVariant,
                hyphenatedSourceKind: hyphenated.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedSourceKind,
                hyphenatedSourceSelectedBy: hyphenated.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedBy,
                hyphenatedTypedPartsMatch: hyphenated.tlaFusionRuleFrame.typedSourceSelectionFrame.typedPartsMatchStem,
                nearbyFormulaIsNotHuelExact: nearby.formulaRealization !== "#ni-0(huel-la-mati)0+0-0#",
                nearbyDerivedStem: nearby.tlaFusionRuleFrame.derivedStem,
                nearbySourceKind: nearby.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedSourceKind,
                nearbySourceSelectedBy: nearby.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedBy,
                nearbyHasEmbed: Boolean(nearby.tlaFusionRuleFrame.tlaFusionBuildEmbedStem),
                nearbyExactDerivedStem: nearby.tlaFusionRuleFrame.ruleVariables.exactDerivedStem,
                temoFromIntransitiveFormula: temoFromIntransitive.formulaRealization,
                temoFromIntransitiveCitation: temoFromIntransitive.citationForm,
                temoFromIntransitiveSourceValence: temoFromIntransitive.tlaFusionRuleFrame.ruleVariables.sourceValence,
                temoFromIntransitiveRequestedValence: temoFromIntransitive.tlaFusionRuleFrame.ruleVariables.requestedSourceValence,
                temoFromIntransitiveSuppliedTla: temoFromIntransitive.tlaFusionRuleFrame.ruleVariables.fusionSuppliesTlaSourceValence,
                temoFromIntransitiveDerivedStem: temoFromIntransitive.tlaFusionRuleFrame.derivedStem,
                temoFromIntransitiveBuildKind: temoFromIntransitive.tlaFusionRuleFrame.tlaFusionBuildKind,
                temoFromIntransitiveSourceKind: temoFromIntransitive.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedSourceKind,
                temoFromIntransitiveObjectSlot: temoFromIntransitive.tlaFusionRuleFrame.objectSlotAfterFusion,
                huelIttaUnfusedFormula: huelIttaUnfused.formulaRealization,
                huelIttaUnfusedSourceStem: huelIttaUnfused.tlaFusionRuleFrame.sourceStemVariant,
                huelIttaFusedFormula: huelIttaFused.formulaRealization,
                huelIttaFusedDerivedStem: huelIttaFused.tlaFusionRuleFrame.derivedStem,
                huelIttaFusedBuildKind: huelIttaFused.tlaFusionRuleFrame.tlaFusionBuildKind,
                huelIttaFusedEmbed: huelIttaFused.tlaFusionRuleFrame.tlaFusionBuildEmbedStem,
                huelIttaFusedMatrix: huelIttaFused.tlaFusionRuleFrame.tlaFusionBuildMatrixStem,
                huelIttaFusedSegment: huelIttaFused.tlaFusionRuleFrame.tlaFusionBuildSegment,
                huelIttaFusedSourceSelectedBy: huelIttaFused.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedBy,
                huelIttaFusedInventsPrefixGeneric: huelIttaFused.tlaFusionRuleFrame.derivedStem === "tla-huel-itta",
                huelIttaSolidFusedFormula: huelIttaSolidFused.formulaRealization,
                huelIttaSolidFusedDerivedStem: huelIttaSolidFused.tlaFusionRuleFrame.derivedStem,
                huelIttaSolidFusedSourceSelectedBy: huelIttaSolidFused.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedBy,
                huelIttaHostileStatus: huelIttaHostilePrefix.proofFrame.authorizationStatus,
                huelIttaHostileFormula: huelIttaHostilePrefix.formulaRealization,
                huelIttaHostileReason: huelIttaHostilePrefix.tlaFusionRuleFrame.tlaFusionContradictionReason,
                huelIttaHostileRejectedDerivedStems: huelIttaHostilePrefix.tlaFusionRuleFrame.hostileRejectedDerivedStems,
                hostileStatus: hostileGeneric.proofFrame.authorizationStatus,
                hostileFormula: hostileGeneric.formulaRealization,
                hostileReason: hostileGeneric.tlaFusionRuleFrame.tlaFusionContradictionReason,
                hostileRejectedDerivedStems: hostileGeneric.tlaFusionRuleFrame.hostileRejectedDerivedStems,
                ixUnfusedFormula: ixUnfused.formulaRealization,
                ixUnfusedSourceStem: ixUnfused.tlaFusionRuleFrame.sourceStemVariant,
                ixUnfusedSourceKind: ixUnfused.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedSourceKind,
                ixUnfusedFused: ixUnfused.tlaFusionRuleFrame.fused,
                ixGenericFusedFormula: ixGenericFused.formulaRealization,
                ixGenericFusedSourceStem: ixGenericFused.tlaFusionRuleFrame.sourceStemVariant,
                ixGenericFusedDerivedStem: ixGenericFused.tlaFusionRuleFrame.derivedStem,
                ixGenericFusedBuildKind: ixGenericFused.tlaFusionRuleFrame.tlaFusionBuildKind,
                ixGenericFusedBuildEmbedStem: ixGenericFused.tlaFusionRuleFrame.tlaFusionBuildEmbedStem,
                ixGenericFusedBuildMatrixStem: ixGenericFused.tlaFusionRuleFrame.tlaFusionBuildMatrixStem,
                ixGenericFusedBoundaryDecision: ixGenericFused.tlaFusionRuleFrame.adverbBoundaryDecision,
                ixGenericFusedInventsHuelLaPattern: ixGenericFused.tlaFusionRuleFrame.derivedStem === "ix-la-mati",
                ixGenericFusedInventsPrefixGeneric: ixGenericFused.tlaFusionRuleFrame.derivedStem === "tla-ixi-mati",
                ixChihuaFusedFormula: ixChihuaFused.formulaRealization,
                ixChihuaFusedSourceStem: ixChihuaFused.tlaFusionRuleFrame.sourceStemVariant,
                ixChihuaFusedDerivedStem: ixChihuaFused.tlaFusionRuleFrame.derivedStem,
                ixChihuaFusedBuildKind: ixChihuaFused.tlaFusionRuleFrame.tlaFusionBuildKind,
                ixChihuaFusedEmbed: ixChihuaFused.tlaFusionRuleFrame.tlaFusionBuildEmbedStem,
                ixChihuaFusedMatrix: ixChihuaFused.tlaFusionRuleFrame.tlaFusionBuildMatrixStem,
                ixChihuaFusedSegment: ixChihuaFused.tlaFusionRuleFrame.tlaFusionBuildSegment,
                ixChihuaFusedSourceSelectedBy: ixChihuaFused.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedBy,
                ixChihuaFusedInventsPrefixGeneric: ixChihuaFused.tlaFusionRuleFrame.derivedStem === "tla-ix-chihua",
                ixChihuaSolidFusedFormula: ixChihuaSolidFused.formulaRealization,
                ixChihuaSolidFusedDerivedStem: ixChihuaSolidFused.tlaFusionRuleFrame.derivedStem,
                ixChihuaSolidFusedSourceSelectedBy: ixChihuaSolidFused.tlaFusionRuleFrame.typedSourceSelectionFrame.selectedBy,
                ixChihuaHostileStatus: ixChihuaHostilePrefix.proofFrame.authorizationStatus,
                ixChihuaHostileFormula: ixChihuaHostilePrefix.formulaRealization,
                ixChihuaHostileReason: ixChihuaHostilePrefix.tlaFusionRuleFrame.tlaFusionContradictionReason,
                ixChihuaHostileRejectedDerivedStems: ixChihuaHostilePrefix.tlaFusionRuleFrame.hostileRejectedDerivedStems,
                chicoFusedFormula: chicoFused.formulaRealization,
                chicoFusedSourceStem: chicoFused.tlaFusionRuleFrame.sourceStemVariant,
                chicoFusedDerivedStem: chicoFused.tlaFusionRuleFrame.derivedStem,
                chicoFusedClassTargetStem: chicoFused.classTargetStem,
                chicoFusedClassTargetRole: chicoFused.classTargetRole,
                chicoFusedClassTargetDerived: chicoFused.classTargetDerivedFromTlaFusion,
                chicoFusedOutputClassTargetStem: chicoFused.selectedOutputLogicFrame.outputFillers.classTargetStem,
                chicoFusedClassTargetIsOldSource: chicoFused.classTargetStem === chicoFused.sourceVerbstem,
                chicoFusedOutputSelectedSourceKind: chicoFused.selectedOutputLogicFrame.outputFillers.selectedSourceKind,
                chicoFusedOutputSelectedSourceEmbed: chicoFused.selectedOutputLogicFrame.outputFillers.selectedSourceEmbedStem,
                chicoFusedOutputSelectedSourceMatrix: chicoFused.selectedOutputLogicFrame.outputFillers.selectedSourceMatrixStem,
                chicoFusedBoundaryDecision: chicoFused.tlaFusionRuleFrame.adverbBoundaryDecision,
                chicoFusedObjectSlot: chicoFused.tlaFusionRuleFrame.objectSlotAfterFusion,
                chicoFusedInventsPrefixGeneric: chicoFused.tlaFusionRuleFrame.derivedStem === "tla-chico-mati",
                chicoHostileStatus: chicoHostileGeneric.proofFrame.authorizationStatus,
                chicoHostileFormula: chicoHostileGeneric.formulaRealization,
                chicoHostileReason: chicoHostileGeneric.tlaFusionRuleFrame.tlaFusionContradictionReason,
                chicoHostileRejectedDerivedStems: chicoHostileGeneric.tlaFusionRuleFrame.hostileRejectedDerivedStems,
            };
        })(),
        {
            solidFormula: "#ni-0(huel-la-mati)0+0-0#",
            solidDerivedStem: "huel-la-mati",
            solidSourceStem: "huel-mati",
            solidSourceKind: "embed-matrix",
            solidBoundaryDecision: "typed-embed-matrix-context-builds-tla-fusion",
            solidGeneralRule: "tla-fusion-builds-a-derived-intransitive-verbstem-from-rule-variables",
            solidSourceSelectedBy: "typed-user-source",
            solidTypedPartsMatch: true,
            solidRuleExactDerivedStem: "",
            solidRuleWitnessPolicy: "proof-anchor-not-whitelist",
            solidRuleWitnessesWhitelist: false,
            solidOutputGeneralRule: "tla-fusion-builds-a-derived-intransitive-verbstem-from-rule-variables",
            solidOutputRuleSourceStem: "huel-mati",
            solidOutputRuleObjectSlot: "none",
            solidRejectedGeneric: true,
            hyphenatedFormula: "#ni-0(huel-la-mati)0+0-0#",
            hyphenatedDerivedStem: "huel-la-mati",
            hyphenatedEmbed: "huel",
            hyphenatedMatrixStem: "mati",
            hyphenatedSourceKind: "embed-matrix",
            hyphenatedSourceSelectedBy: "typed-user-source",
            hyphenatedTypedPartsMatch: true,
            nearbyFormulaIsNotHuelExact: true,
            nearbyDerivedStem: "tla-huelmatini",
            nearbySourceKind: "whole-stem",
            nearbySourceSelectedBy: "typed-source-constituents",
            nearbyHasEmbed: false,
            nearbyExactDerivedStem: "",
            temoFromIntransitiveFormula: "#ni-0(tla-temo)0+0-0#",
            temoFromIntransitiveCitation: "tla-(temō)",
            temoFromIntransitiveSourceValence: "projective-nonhuman",
            temoFromIntransitiveRequestedValence: "intransitive",
            temoFromIntransitiveSuppliedTla: true,
            temoFromIntransitiveDerivedStem: "tla-temō",
            temoFromIntransitiveBuildKind: "matrix-plus-tla-fusion",
            temoFromIntransitiveSourceKind: "whole-stem",
            temoFromIntransitiveObjectSlot: "none",
            huelIttaUnfusedFormula: "#ni-0+tla(huel-itta)0+c-0#",
            huelIttaUnfusedSourceStem: "huel-itta",
            huelIttaFusedFormula: "#ni-0(huel-la-itta)0+c-0#",
            huelIttaFusedDerivedStem: "huel-la-itta",
            huelIttaFusedBuildKind: "embed-matrix-plus-tla-fusion",
            huelIttaFusedEmbed: "huel",
            huelIttaFusedMatrix: "itta",
            huelIttaFusedSegment: "la",
            huelIttaFusedSourceSelectedBy: "typed-user-source",
            huelIttaFusedInventsPrefixGeneric: false,
            huelIttaSolidFusedFormula: "#ni-0(huel-la-itta)0+c-0#",
            huelIttaSolidFusedDerivedStem: "huel-la-itta",
            huelIttaSolidFusedSourceSelectedBy: "typed-user-source",
            huelIttaHostileStatus: "authorized",
            huelIttaHostileFormula: "#ni-0(huel-la-itta)0+c-0#",
            huelIttaHostileReason: "",
            huelIttaHostileRejectedDerivedStems: ["tla-huel-itta"],
            hostileStatus: "authorized",
            hostileFormula: "#ni-0(huel-la-mati)0+0-0#",
            hostileReason: "",
            hostileRejectedDerivedStems: ["tla-huel-mati"],
            ixUnfusedFormula: "#ni-0+tla(ix-mati)0+0-0#",
            ixUnfusedSourceStem: "ix-mati",
            ixUnfusedSourceKind: "internal-morphemes",
            ixUnfusedFused: false,
            ixGenericFusedFormula: "#n-0(ix-tla-mati)0+0-0#",
            ixGenericFusedSourceStem: "ix-mati",
            ixGenericFusedDerivedStem: "ix-tla-mati",
            ixGenericFusedBuildKind: "embed-matrix-plus-tla-fusion",
            ixGenericFusedBuildEmbedStem: "ix",
            ixGenericFusedBuildMatrixStem: "mati",
            ixGenericFusedBoundaryDecision: "typed-embed-matrix-context-builds-tla-fusion",
            ixGenericFusedInventsHuelLaPattern: false,
            ixGenericFusedInventsPrefixGeneric: false,
            ixChihuaFusedFormula: "#n-0(ix-tla-chihua)0+0-0#",
            ixChihuaFusedSourceStem: "ix-chihua",
            ixChihuaFusedDerivedStem: "ix-tla-chihua",
            ixChihuaFusedBuildKind: "embed-matrix-plus-tla-fusion",
            ixChihuaFusedEmbed: "ix",
            ixChihuaFusedMatrix: "chihua",
            ixChihuaFusedSegment: "tla",
            ixChihuaFusedSourceSelectedBy: "typed-user-source",
            ixChihuaFusedInventsPrefixGeneric: false,
            ixChihuaSolidFusedFormula: "#n-0(ix-tla-chihua)0+0-0#",
            ixChihuaSolidFusedDerivedStem: "ix-tla-chihua",
            ixChihuaSolidFusedSourceSelectedBy: "typed-user-source",
            ixChihuaHostileStatus: "authorized",
            ixChihuaHostileFormula: "#n-0(ix-tla-chihua)0+0-0#",
            ixChihuaHostileReason: "",
            ixChihuaHostileRejectedDerivedStems: ["tla-ix-chihua"],
            chicoFusedFormula: "#ni-0(chico-tla-mati)0+0-0#",
            chicoFusedSourceStem: "chico-mati",
            chicoFusedDerivedStem: "chico-tla-mati",
            chicoFusedClassTargetStem: "chico-tla-mati",
            chicoFusedClassTargetRole: "derived-fused-verbstem",
            chicoFusedClassTargetDerived: true,
            chicoFusedOutputClassTargetStem: "chico-tla-mati",
            chicoFusedClassTargetIsOldSource: false,
            chicoFusedOutputSelectedSourceKind: "embed-matrix",
            chicoFusedOutputSelectedSourceEmbed: "chico",
            chicoFusedOutputSelectedSourceMatrix: "mati",
            chicoFusedBoundaryDecision: "typed-embed-matrix-context-builds-tla-fusion",
            chicoFusedObjectSlot: "none",
            chicoFusedInventsPrefixGeneric: false,
            chicoHostileStatus: "authorized",
            chicoHostileFormula: "#ni-0(chico-tla-mati)0+0-0#",
            chicoHostileReason: "",
            chicoHostileRejectedDerivedStems: ["tla-chico-mati"],
        }
    );

    s.eq(
        "Classical Lesson 7.9 object relationships govern selected output and block hostile indefinite swaps",
        (() => {
            const human = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "projective-human",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const nonhuman = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "projective-nonhuman",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const specificSecond = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "2sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const specificThird = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const pluralReflexive = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "mainline-reflexive",
                subject: "1pl",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const singularReflexive = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "mainline-reflexive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const hostileHumanAsTla = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "projective-human",
                hostileIndefiniteObject: "tla",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const hostileNonhumanAsTe = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "projective-nonhuman",
                hostileIndefiniteObject: "te",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            return {
                humanFormula: human.formulaRealization,
                humanRelationship: human.selectedOutputLogicFrame.outputFillers.selectedObjectRelationshipKind,
                humanIndefinite: human.selectedOutputLogicFrame.outputFillers.selectedIndefiniteObject,
                humanSurfaceObject: human.selectedOutputLogicFrame.outputFillers.selectedObjectSlot,
                humanActions: human.selectedOutputLogicFrame.outputFillers.objectRelationshipActions,
                nonhumanFormula: nonhuman.formulaRealization,
                nonhumanRelationship: nonhuman.selectedOutputLogicFrame.outputFillers.selectedObjectRelationshipKind,
                nonhumanIndefinite: nonhuman.selectedOutputLogicFrame.outputFillers.selectedIndefiniteObject,
                specificSecondRelationship: specificSecond.selectedOutputLogicFrame.outputFillers.selectedObjectRelationshipKind,
                specificSecondIndefinite: specificSecond.selectedOutputLogicFrame.outputFillers.selectedIndefiniteObject,
                specificThirdRelationship: specificThird.selectedOutputLogicFrame.outputFillers.selectedObjectRelationshipKind,
                specificThirdPossibleIndefinites: specificThird.selectedOutputLogicFrame.outputFillers.possibleIndefiniteObjects,
                pluralReflexiveRelationship: pluralReflexive.selectedOutputLogicFrame.outputFillers.selectedObjectRelationshipKind,
                pluralReflexiveTopic: pluralReflexive.objectRelationshipRuleFrame.selectedObjectRelationshipTopic,
                pluralReflexiveSubjectNumber: pluralReflexive.objectRelationshipRuleFrame.selectedSubjectNumber,
                pluralReflexiveReciprocalPossible: pluralReflexive.selectedOutputLogicFrame.outputFillers.pluralReflexiveReciprocalPossible,
                pluralReflexiveApplicableRules: pluralReflexive.objectRelationshipRuleFrame.applicableObjectRelationshipRuleIds,
                pluralReflexiveActions: pluralReflexive.selectedOutputLogicFrame.outputFillers.objectRelationshipActions,
                singularReflexiveSubjectNumber: singularReflexive.objectRelationshipRuleFrame.selectedSubjectNumber,
                singularReflexiveReciprocalPossible: singularReflexive.objectRelationshipRuleFrame.pluralReflexiveReciprocalPossible,
                singularReflexiveApplicableRules: singularReflexive.objectRelationshipRuleFrame.applicableObjectRelationshipRuleIds,
                hostileHumanStatus: hostileHumanAsTla.proofFrame.authorizationStatus,
                hostileHumanFormula: hostileHumanAsTla.formulaRealization,
                hostileHumanBlockedBy: hostileHumanAsTla.displayReceiptFrame.blockedBy,
                hostileHumanReason: hostileHumanAsTla.objectRelationshipRuleFrame.objectRelationshipContradictionReason,
                hostileNonhumanStatus: hostileNonhumanAsTe.proofFrame.authorizationStatus,
                hostileNonhumanFormula: hostileNonhumanAsTe.formulaRealization,
                hostileNonhumanBlockedBy: hostileNonhumanAsTe.displayReceiptFrame.blockedBy,
                hostileNonhumanReason: hostileNonhumanAsTe.objectRelationshipRuleFrame.objectRelationshipContradictionReason,
            };
        })(),
        {
            humanFormula: "#ni-0+tē(itta)0+0-0#",
            humanRelationship: "human-indefinite",
            humanIndefinite: "tē",
            humanSurfaceObject: "tē",
            humanActions: [
                "select-canvas-7.9-object-relationship",
                "preserve-indefinite-specific-object-distinction",
                "carry-object-relationship-to-selected-output",
            ],
            nonhumanFormula: "#ni-0+tla(itta)0+0-0#",
            nonhumanRelationship: "nonhuman-indefinite",
            nonhumanIndefinite: "tla",
            specificSecondRelationship: "specific-human-projective",
            specificSecondIndefinite: "tē",
            specificThirdRelationship: "ambiguous-specific-projective",
            specificThirdPossibleIndefinites: ["tē", "tla"],
            pluralReflexiveRelationship: "human-reflexive-reciprocal",
            pluralReflexiveTopic: "human-object-specified",
            pluralReflexiveSubjectNumber: "plural",
            pluralReflexiveReciprocalPossible: true,
            pluralReflexiveApplicableRules: [
                "cn-l7-79-indefinite-personal-object-relationship",
                "cn-l7-79-human-object-specified",
                "cn-l7-79-human-plural-reflexive-agreement",
                "cn-l7-79-human-plural-reciprocal-alternative",
            ],
            pluralReflexiveActions: [
                "select-canvas-7.9-object-relationship",
                "preserve-indefinite-specific-object-distinction",
                "carry-object-relationship-to-selected-output",
                "preserve-human-reflexive-reciprocal-possibility",
            ],
            singularReflexiveSubjectNumber: "singular",
            singularReflexiveReciprocalPossible: false,
            singularReflexiveApplicableRules: [
                "cn-l7-79-indefinite-personal-object-relationship",
                "cn-l7-79-human-object-specified",
                "cn-l7-79-human-singular-specific-correspondence",
            ],
            hostileHumanStatus: "blocked",
            hostileHumanFormula: "",
            hostileHumanBlockedBy: "object-relationship-and-tla-fusion",
            hostileHumanReason: "requested-object-relationship-not-authorized-by-canvas-7.9",
            hostileNonhumanStatus: "blocked",
            hostileNonhumanFormula: "",
            hostileNonhumanBlockedBy: "object-relationship-and-tla-fusion",
            hostileNonhumanReason: "requested-object-relationship-not-authorized-by-canvas-7.9",
        }
    );

    s.ok(
        "Classical Lesson 7.9 evidence examples never whitelist grammar realization",
        (() => {
            const base = {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            };
            const human = ctx.buildClassicalNahuatlVerbstemClassFrame("(xōchichīhua)", {
                ...base,
                valence: "projective-human",
            });
            const nonhuman = ctx.buildClassicalNahuatlVerbstemClassFrame("(xōchichīhua)", {
                ...base,
                valence: "projective-nonhuman",
            });
            return human.proofFrame.authorizationStatus === "authorized"
                && nonhuman.proofFrame.authorizationStatus === "authorized"
                && Boolean(human.formulaRealization)
                && Boolean(nonhuman.formulaRealization)
                && human.objectRelationshipRuleFrame.selectedObjectRelationshipTopic === "human-object-specified"
                && nonhuman.objectRelationshipRuleFrame.selectedObjectRelationshipTopic === "nonhuman-object-specified"
                && human.objectRelationshipRuleFrame.evidencePolicy.examplesAuthorizeGeneration === false
                && human.objectRelationshipRuleFrame.evidencePolicy.evidenceAbsenceBlocksGeneration === false
                && human.objectRelationshipRuleFrame.evidencePolicy.typedGrammarAuthorizesUnlistedRealizations === true;
        })()
    );

    s.eq(
        "Classical Lesson 8.1 expanded VNC boundary makes only directional prefixes formula-internal",
        (() => {
            const intransitiveDirectional = ctx.buildClassicalNahuatlVerbstemClassFrame("(mati)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                directionalPrefix: "on",
            });
            const monadicDirectional = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "projective-human",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                directionalPrefix: "huāl",
            });
            const specificDirectional = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3pl",
                subject: "1pl",
                mood: "indicative",
                tense: "imperfect",
                verbClass: "A",
                directionalPrefix: "on",
            });
            const singularSpecificDirectional = ctx.buildClassicalNahuatlVerbstemClassFrame("(ix-chix)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                directionalPrefix: "on",
            });
            const pluralSpecificOnDirectional = ctx.buildClassicalNahuatlVerbstemClassFrame("(ix-chix)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3pl",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                directionalPrefix: "on",
            });
            const pluralSpecificHualDirectional = ctx.buildClassicalNahuatlVerbstemClassFrame("(ix-chix)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3pl",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                directionalPrefix: "huāl",
            });
            const singularSpecificHualDirectional = ctx.buildClassicalNahuatlVerbstemClassFrame("(ix-chix)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                directionalPrefix: "huāl",
            });
            const outsideParticles = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "A",
                outsidePrefixes: ["ō", "ah"],
            });
            const hostileOutsideSlot = ctx.buildClassicalNahuatlVerbstemClassFrame("(itta)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "A",
                outsidePrefixes: ["ō", "ah"],
                hostileLesson8FormulaSlots: ["ō#", "ah#"],
            });
            const presentAntecessive = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                outsidePrefixes: ["ō"],
                sentenceType: "affirmative-assertion",
            });
            const preteritAntecessive = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
                outsidePrefixes: ["ō"],
                sentenceType: "affirmative-assertion",
            });
            const negativeAntecessive = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
                outsidePrefixes: ["ō"],
                sentenceType: "negative-assertion",
            });
            const untriggeredCaNegative = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
                outsidePrefixes: ["ca"],
                sentenceType: "affirmative-assertion",
            });
            const triggeredCaNegative = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
                outsidePrefixes: ["ca"],
                caNegativeTrigger: "mā",
                sentenceType: "affirmative-assertion",
            });
            return {
                intransitiveFormula: intransitiveDirectional.formulaRealization,
                intransitiveBaseFormula: intransitiveDirectional.selectedOutputLogicFrame.outputFillers.selectedFormulaWithoutExpandedVncBoundary,
                intransitiveDirectionalInside: intransitiveDirectional.expandedVncBoundaryFrame.directionalInsideVncCore,
                intransitivePlacement: intransitiveDirectional.expandedVncBoundaryFrame.directionalPlacement,
                intransitiveOutputSlots: intransitiveDirectional.selectedOutputLogicFrame.outputFillers.vncInternalPrefixSlots,
                monadicFormula: monadicDirectional.formulaRealization,
                monadicPlacement: monadicDirectional.expandedVncBoundaryFrame.directionalPlacement,
                specificFormula: specificDirectional.formulaRealization,
                specificPlacement: specificDirectional.expandedVncBoundaryFrame.directionalPlacement,
                specificActions: specificDirectional.selectedOutputLogicFrame.outputFillers.expandedVncBoundaryActions,
                singularSpecificFormula: singularSpecificDirectional.formulaRealization,
                singularSpecificRejectsQuOn: singularSpecificDirectional.formulaRealization.includes("+qu-0+on("),
                singularSpecificActions: singularSpecificDirectional.selectedOutputLogicFrame.outputFillers.expandedVncBoundaryActions,
                singularSpecificFinalBoundaryKind: singularSpecificDirectional.proofFrame.conclusion.finalBoundaryRealizationKind,
                singularSpecificFinalBoundaryInput: singularSpecificDirectional.proofFrame.conclusion.finalBoundaryInputFormula,
                singularSpecificFinalBoundaryMorphIdentity: singularSpecificDirectional.proofFrame.conclusion.finalBoundaryObjectMorphIdentity,
                singularSpecificFinalBoundaryRegularSpellings: singularSpecificDirectional.proofFrame.conclusion.finalBoundaryObjectRegularSpellings,
                singularSpecificFinalBoundarySupportiveSpelling: singularSpecificDirectional.proofFrame.conclusion.finalBoundaryObjectSupportiveSpelling,
                singularSpecificFinalBoundaryBeforeSlot: singularSpecificDirectional.proofFrame.conclusion.finalBoundarySelectedObjectSlotBeforeRealization,
                singularSpecificFinalBoundaryFinalSlot: singularSpecificDirectional.proofFrame.conclusion.finalBoundaryFinalObjectSlot,
                singularSpecificFinalBoundarySpelling: singularSpecificDirectional.proofFrame.conclusion.finalBoundarySpellingSelectedAfterSlotOrder,
                singularSpecificFinalBoundaryActions: singularSpecificDirectional.proofFrame.conclusion.finalBoundaryRealizationActions,
                pluralOnFormula: pluralSpecificOnDirectional.formulaRealization,
                pluralOnRejectsBareN: pluralSpecificOnDirectional.formulaRealization.includes("#n-0+qu-im+on("),
                pluralOnFinalSubject: pluralSpecificOnDirectional.proofFrame.conclusion.finalBoundaryFinalSubjectCarrier,
                pluralOnFinalObjectSlot: pluralSpecificOnDirectional.proofFrame.conclusion.finalBoundaryFinalObjectSlot,
                pluralOnFinalVa2: pluralSpecificOnDirectional.proofFrame.conclusion.finalBoundaryFinalPluralObjectVa2,
                pluralHualFormula: pluralSpecificHualDirectional.formulaRealization,
                pluralHualRejectsImBeforeHual: pluralSpecificHualDirectional.formulaRealization.includes("+qu-im+huāl("),
                pluralHualRejectsBareN: pluralSpecificHualDirectional.formulaRealization.includes("#n-0+qu-im+huāl("),
                pluralHualFinalSubject: pluralSpecificHualDirectional.proofFrame.conclusion.finalBoundaryFinalSubjectCarrier,
                pluralHualFinalObjectSlot: pluralSpecificHualDirectional.proofFrame.conclusion.finalBoundaryFinalObjectSlot,
                pluralHualFinalVa2: pluralSpecificHualDirectional.proofFrame.conclusion.finalBoundaryFinalPluralObjectVa2,
                singularHualFormula: singularSpecificHualDirectional.formulaRealization,
                singularHualRejectsQuHual: singularSpecificHualDirectional.formulaRealization.includes("#n-0+qu-0+huāl("),
                singularHualFinalSubject: singularSpecificHualDirectional.proofFrame.conclusion.finalBoundaryFinalSubjectCarrier,
                singularHualFinalObjectSlot: singularSpecificHualDirectional.proofFrame.conclusion.finalBoundaryFinalObjectSlot,
                singularHualFinalSpelling: singularSpecificHualDirectional.proofFrame.conclusion.finalBoundarySpellingSelectedAfterSlotOrder,
                outsideFormula: outsideParticles.formulaRealization,
                outsideFormulaSlotMaterial: outsideParticles.selectedOutputLogicFrame.outputFillers.formulaSlotMaterialFromOutsidePrefixes,
                outsideBecomeFormulaSlots: outsideParticles.selectedOutputLogicFrame.outputFillers.outsidePrefixesBecomeFormulaSlots,
                outsideFormulaAuthorized: outsideParticles.selectedOutputLogicFrame.outputFillers.outsidePrefixFormulaSlotAuthorized,
                outsideExternalSlots: outsideParticles.selectedOutputLogicFrame.outputFillers.vncExternalPrefixSlots,
                outsideAttraction: outsideParticles.selectedOutputLogicFrame.outputFillers.negativeAttractedToAntecessive,
                outsideObjectShapeProtected: outsideParticles.selectedOutputLogicFrame.outputFillers.objectShapePreservedByOutsidePrefixes,
                hostileStatus: hostileOutsideSlot.proofFrame.authorizationStatus,
                hostileFormula: hostileOutsideSlot.formulaRealization,
                hostileBoundaryStatus: hostileOutsideSlot.expandedVncBoundaryFrame.authorizationStatus,
                hostileRejectedSlots: hostileOutsideSlot.expandedVncBoundaryFrame.hostileRejectedFormulaSlots,
                hostileBlockedBy: hostileOutsideSlot.displayReceiptFrame.blockedBy,
                presentAntecessiveStatus: presentAntecessive.proofFrame.authorizationStatus,
                presentAntecessiveBoundaryStatus: presentAntecessive.expandedVncBoundaryFrame.authorizationStatus,
                presentAntecessiveReason: presentAntecessive.expandedVncBoundaryFrame.blockReason,
                preteritAntecessiveStatus: preteritAntecessive.proofFrame.authorizationStatus,
                preteritAntecessiveOutsidePrefixes: preteritAntecessive.selectedOutputLogicFrame.outputFillers.outsidePrefixes,
                preteritAntecessiveTenseAuthorized: preteritAntecessive.expandedVncBoundaryFrame.antecessiveTenseAuthorized,
                preteritAntecessiveStack: preteritAntecessive.selectedOutputLogicFrame.outputFillers.sentencePrefixalStack,
                negativeAntecessiveStack: negativeAntecessive.selectedOutputLogicFrame.outputFillers.sentencePrefixalStack,
                negativeAntecessiveAttachment: negativeAntecessive.selectedOutputLogicFrame.outputFillers.sentencePrefixalStackAttachment,
                untriggeredCaNegativeStatus: untriggeredCaNegative.proofFrame.authorizationStatus,
                untriggeredCaNegativeReason: untriggeredCaNegative.expandedVncBoundaryFrame.blockReason,
                triggeredCaNegativeStatus: triggeredCaNegative.proofFrame.authorizationStatus,
                triggeredCaNegativeStack: triggeredCaNegative.selectedOutputLogicFrame.outputFillers.sentencePrefixalStack,
            };
        })(),
        {
            intransitiveFormula: "#n-0+on(mati)0+0-0#",
            intransitiveBaseFormula: "#ni-0(mati)0+0-0#",
            intransitiveDirectionalInside: true,
            intransitivePlacement: "before-intransitive-stem",
            intransitiveOutputSlots: ["directional-locative"],
            monadicFormula: "#ni-0+huāl+tē(itta)0+0-0#",
            monadicPlacement: "before-monadic-valence",
            specificFormula: "#ti-0+qu-im+on(itta)ya+0-h#",
            specificPlacement: "after-specific-projective-valence",
            specificActions: [
                "place-directional-locative-inside-vnc-core",
                "place-directional-locative-after-specific-projective-valence",
                "carry-expanded-vnc-boundary-to-selected-output",
            ],
            singularSpecificFormula: "#no-0+c-0+on(ix-chix)0+0-0#",
            singularSpecificRejectsQuOn: false,
            singularSpecificActions: [
                "place-directional-locative-inside-vnc-core",
                "place-directional-locative-after-specific-projective-valence",
                "replace-pers1-supportive-i-with-o-before-c-on",
                "carry-expanded-vnc-boundary-to-selected-output",
            ],
            singularSpecificFinalBoundaryKind: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
            singularSpecificFinalBoundaryInput: "#n-0+qu-0(ix-chix)0+0-0#",
            singularSpecificFinalBoundaryMorphIdentity: "/k/",
            singularSpecificFinalBoundaryRegularSpellings: ["c", "qu"],
            singularSpecificFinalBoundarySupportiveSpelling: "qui",
            singularSpecificFinalBoundaryBeforeSlot: "qu-0",
            singularSpecificFinalBoundaryFinalSlot: "c-0",
            singularSpecificFinalBoundarySpelling: "c",
            singularSpecificFinalBoundaryActions: [
                "assemble-slot-order-before-final-boundary-realization",
                "realize-final-formula-boundaries-after-slot-order",
                "realize-pers1-supportive-vowel-after-slot-order",
                "realize-third-singular-k-object-as-c-before-on",
                "realize-third-singular-k-object-after-directional-neighbor",
                "replace-pers1-supportive-i-with-o-before-c-on",
            ],
            pluralOnFormula: "#ni-0+qu-im+on(ix-chix)0+0-0#",
            pluralOnRejectsBareN: false,
            pluralOnFinalSubject: "ni",
            pluralOnFinalObjectSlot: "qu-im",
            pluralOnFinalVa2: "im",
            pluralHualFormula: "#ni-0+qu-in+huāl(ix-chix)0+0-0#",
            pluralHualRejectsImBeforeHual: false,
            pluralHualRejectsBareN: false,
            pluralHualFinalSubject: "ni",
            pluralHualFinalObjectSlot: "qu-in",
            pluralHualFinalVa2: "in",
            singularHualFormula: "#ni-0+c-0+huāl(ix-chix)0+0-0#",
            singularHualRejectsQuHual: false,
            singularHualFinalSubject: "ni",
            singularHualFinalObjectSlot: "c-0",
            singularHualFinalSpelling: "c",
            outsideFormula: "#ni-0+qu-0(itta)0+c-0#",
            outsideFormulaSlotMaterial: [],
            outsideBecomeFormulaSlots: false,
            outsideFormulaAuthorized: false,
            outsideExternalSlots: ["antecessive-order", "negative-ah"],
            outsideAttraction: true,
            outsideObjectShapeProtected: true,
            hostileStatus: "blocked",
            hostileFormula: "",
            hostileBoundaryStatus: "blocked",
            hostileRejectedSlots: ["ō#", "ah#"],
            hostileBlockedBy: "expanded-vnc-boundary",
            presentAntecessiveStatus: "blocked",
            presentAntecessiveBoundaryStatus: "blocked",
            presentAntecessiveReason: "antecessive-prefix-requires-past-tense-vnc",
            preteritAntecessiveStatus: "authorized",
            preteritAntecessiveOutsidePrefixes: ["ō#"],
            preteritAntecessiveTenseAuthorized: true,
            preteritAntecessiveStack: ["ō#"],
            negativeAntecessiveStack: ["ah#", "ō#"],
            negativeAntecessiveAttachment: "prefixal-stack-attached-at-left-edge",
            untriggeredCaNegativeStatus: "blocked",
            untriggeredCaNegativeReason: "ca-negative-prefix-requires-ma-tla-or-mah-trigger",
            triggeredCaNegativeStatus: "authorized",
            triggeredCaNegativeStack: ["ca#"],
        }
    );

    s.eq(
        "Classical Lesson 8.1 rare on plus itt-a contraction is an explicit semantic operation",
        (() => {
            const objectRelationshipRuleFrame = {
                selectedObjectSlot: "c-0",
            };
            const ordinary =
                ctx.buildClassicalNahuatlDirectionalIttaContractionFrame({
                    stem: "itt-a",
                    directionalPrefix: "on",
                    objectRelationshipRuleFrame,
                    selection: "ordinary",
                });
            const rare =
                ctx.buildClassicalNahuatlDirectionalIttaContractionFrame({
                    stem: "itt-a",
                    directionalPrefix: "on",
                    objectRelationshipRuleFrame,
                    selection: "rare",
                });
            const wrongStem =
                ctx.buildClassicalNahuatlDirectionalIttaContractionFrame({
                    stem: "nemi",
                    directionalPrefix: "on",
                    objectRelationshipRuleFrame,
                    selection: "rare",
                });
            const hostile =
                ctx.buildClassicalNahuatlDirectionalIttaContractionFrame({
                    stem: "itt-a",
                    directionalPrefix: "on",
                    objectRelationshipRuleFrame,
                    selection: "stored-canvas-answer",
                });
            return {
                ruleSpan:
                    ctx.getClassicalNahuatlExpandedVncRules()
                        .filter((rule) => (
                            rule.tagId
                            === "cn-l8-811-optional-on-itta-contraction"
                        ))
                        .map((rule) => [
                            rule.transcriptionLineStart,
                            rule.transcriptionLineEnd,
                        ]),
                ordinary: [
                    ordinary.authorizationStatus,
                    ordinary.contractionApplies,
                    ordinary.selectedDirectionalPrefix,
                    ordinary.selectedStem,
                ],
                rare: [
                    rare.authorizationStatus,
                    rare.contractionApplies,
                    rare.operationId,
                    rare.selectedDirectionalPrefix,
                    rare.selectedStem,
                    rare.deletedDirectionalSegment,
                    rare.dismissedSupportiveStemSegment,
                    rare.formulaStringAuthority,
                    rare.surfaceStringAuthority,
                ],
                wrongStem: [
                    wrongStem.authorizationStatus,
                    wrongStem.blockReason,
                ],
                hostile: [
                    hostile.authorizationStatus,
                    hostile.blockReason,
                ],
            };
        })(),
        {
            ruleSpan: [[3346, 3349]],
            ordinary: ["authorized", false, "on", "itt-a"],
            rare: [
                "authorized",
                true,
                "optional-on-itta-directional-contraction",
                "o",
                "tt-a",
                "n",
                "i",
                false,
                false,
            ],
            wrongStem: [
                "blocked",
                "on-itta-contraction-requires-itta-stem",
            ],
            hostile: [
                "blocked",
                "unknown-on-itta-contraction-selection",
            ],
        }
    );

    s.eq(
        "Classical Lesson 8.1 consumes the issued on plus itt-a operation before finite realization",
        (() => {
            const rare =
                ctx.buildClassicalNahuatlVerbstemClassFrame(
                    "(itt-a)",
                    {
                        valence: "specific-projective",
                        objectKind: "specific-projective",
                        objectPerson: "3sg",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                        verbClass: "A",
                        directionalPrefix: "on",
                        directionalIttaContraction: "rare",
                    }
                );
            const boundary =
                rare.proofFrame.conclusion
                    .finalBoundaryRealizationFrame;
            const finite =
                ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(rare);
            const copiedExpandedBoundary = JSON.parse(JSON.stringify(
                rare.expandedVncBoundaryFrame
            ));
            const copiedOperationAttempt =
                ctx.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
                    vncSlotFrame:
                        rare.priorVncFrame.vncSlotFrame,
                    expandedVncBoundaryFrame:
                        copiedExpandedBoundary,
                    objectRelationshipRuleFrame:
                        rare.objectRelationshipRuleFrame,
                });
            const forgedOperation = Object.freeze({
                ...rare.expandedVncBoundaryFrame
                    .directionalStemOperationFrame,
                selectedStem: "stored-canvas-answer",
            });
            const forgedOperationAttempt =
                ctx.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
                    vncSlotFrame:
                        rare.priorVncFrame.vncSlotFrame,
                    expandedVncBoundaryFrame: {
                        ...rare.expandedVncBoundaryFrame,
                        directionalIttaContractionFrame:
                            forgedOperation,
                        directionalStemOperationFrame:
                            forgedOperation,
                        selectedDirectionalStem:
                            "stored-canvas-answer",
                    },
                    objectRelationshipRuleFrame:
                        rare.objectRelationshipRuleFrame,
                });
            return {
                status: rare.authorizationStatus,
                formula: rare.formulaRealization,
                finiteStatus: finite.authorizationStatus,
                finiteFormula: finite.formulaRealization,
                finiteSurface: finite.wordRealization,
                operationStatus:
                    boundary.directionalStemOperationEvaluationFrame
                        .authorizationStatus,
                operationId:
                    boundary.directionalStemOperationEvaluationFrame
                        .operationId,
                operationApplied:
                    boundary.directionalStemOperationApplied,
                issuedOperationIdentityPreserved:
                    boundary.directionalStemOperationFrame
                    === rare.expandedVncBoundaryFrame
                        .directionalStemOperationFrame,
                sourceDirectional:
                    boundary.sourceDirectionalPrefix,
                selectedDirectional:
                    boundary.directionalPrefix,
                sourceStem:
                    boundary
                        .predicateStemBeforeDirectionalStemOperation,
                selectedStem:
                    boundary
                        .predicateStemAfterDirectionalStemOperation,
                typedStem:
                    boundary.typedSlotFrame.slots.predicate.stem,
                actionPresent: boundary.actions.includes(
                    "apply-issued-optional-on-itta-directional-contraction-before-final-boundary"
                ),
                copiedStatus:
                    copiedOperationAttempt.authorizationStatus,
                copiedReason:
                    copiedOperationAttempt.blockReason,
                forgedStatus:
                    forgedOperationAttempt.authorizationStatus,
                forgedReason:
                    forgedOperationAttempt.blockReason,
                copiedOrForgedAccepted:
                    boundary.directionalStemOperationEvaluationFrame
                        .copiedOrForgedOperationFrameAccepted,
            };
        })(),
        {
            status: "authorized",
            formula: "#no-0+c-0+o(tt-a)0+0-0#",
            finiteStatus: "authorized",
            finiteFormula: "#no-0+c-0+o(tt-a)0+0-0#",
            finiteSurface: "nocotta",
            operationStatus: "authorized",
            operationId:
                "optional-on-itta-directional-contraction",
            operationApplied: true,
            issuedOperationIdentityPreserved: true,
            sourceDirectional: "on",
            selectedDirectional: "o",
            sourceStem: "itt-a",
            selectedStem: "tt-a",
            typedStem: "tt-a",
            actionPresent: true,
            copiedStatus: "blocked",
            copiedReason:
                "issued-directional-stem-operation-frame-required",
            forgedStatus: "blocked",
            forgedReason:
                "issued-directional-stem-operation-frame-required",
            copiedOrForgedAccepted: false,
        }
    );

    s.eq(
        "Classical Lessons 2.10 and 8.1 realize huāl plus initial tl only after directional placement",
        (() => {
            const tlal = ctx.buildClassicalNahuatlVerbstemClassFrame("(tlāl-i-ā)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "2sg",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "C",
                directionalPrefix: "huāl",
            });
            const nearby = ctx.buildClassicalNahuatlVerbstemClassFrame("(chol-o-ā)", {
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "2sg",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "C",
                directionalPrefix: "huāl",
            });
            const boundary = tlal.proofFrame.conclusion.finalBoundaryRealizationFrame;
            const nearbyBoundary = nearby.proofFrame.conclusion.finalBoundaryRealizationFrame;
            return {
                formula: tlal.formulaRealization,
                inputFormula: boundary.inputFormula,
                applied: boundary.directionalProgressiveAssimilationApplied,
                ruleIds: boundary.directionalProgressiveAssimilationRuleIds,
                stemBefore: boundary.predicateStemBeforeDirectionalAssimilation,
                stemAfter: boundary.predicateStemAfterDirectionalAssimilation,
                actionPresent: boundary.actions.includes(
                    "realize-lesson2-10-progressive-assimilation-at-directional-predicate-boundary"
                ),
                witnessLineStart: boundary.directionalProgressiveAssimilation?.operationFrame?.transcriptionLineStart,
                witnessLineEnd: boundary.directionalProgressiveAssimilation?.operationFrame?.transcriptionLineEnd,
                nearbyApplied: nearbyBoundary.directionalProgressiveAssimilationApplied,
                nearbyStemBefore: nearbyBoundary.predicateStemBeforeDirectionalAssimilation,
                nearbyStemAfter: nearbyBoundary.predicateStemAfterDirectionalAssimilation,
            };
        })(),
        {
            formula: "#ni-0+m-itz+huāl(lāl-i-h)0+⎕-0#",
            inputFormula: "#ni-0+m-itz(tlāl-i-h)0+⎕-0#",
            applied: true,
            ruleIds: ["cn-l2-210-progressive-l-tl-ll"],
            stemBefore: "tlāl-i-h",
            stemAfter: "lāl-i-h",
            actionPresent: true,
            nearbyApplied: false,
            nearbyStemBefore: "chol-o-h",
            nearbyStemAfter: "chol-o-h",
        }
    );

    s.eq(
        "Classical Lesson 8 final boundary realizes num1 /k/ after final predicate context",
        (() => {
            const buildTypedNumberBoundary = ({
                stem,
                tns = "0",
                num1,
                num2,
                pers1 = "ni",
                condition = "future-preterit-indicative",
                num1VariantRule = "lesson-5.3.3b-qui-after-consonant-5.3.3c-square-zero",
            }) => {
                const numberDyad = {
                    num1,
                    num2,
                    condition,
                    num1VariantRule,
                    num1SupportiveVowelFrame: {
                        ruleRefs: [
                            {
                                tagId: "cn-l5-num1-num2-variants",
                                section: "5.3.3",
                            },
                        ],
                    },
                };
                const vncSlotFrame = ctx.buildClassicalNahuatlVncSlotFrame({
                    sourceFrameKind: "typed-num1-hostile-test",
                    sourceAuthorizationStatus: "authorized",
                    stem,
                    personDyad: { pers1, pers2: "0", pers1BaseMorph: pers1.replace(/[io]$/u, "") },
                    tenseFrame: { tns },
                    numberDyad,
                    formulaArtifact: "#HOSTILE-PRINTED-FORMULA#",
                });
                return ctx.buildClassicalNahuatlFinalBoundaryRealizationFrame({ vncSlotFrame });
            };
            const hostileCConsonant = buildTypedNumberBoundary({
                stem: "mic",
                num1: "c",
                num2: "0",
            });
            const hostileQuiConsonant = buildTypedNumberBoundary({
                stem: "mic",
                num1: "qui",
                num2: "0",
            });
            const hostileSquareVowel = buildTypedNumberBoundary({
                stem: "zaca",
                num1: "\u2395",
                num2: "0",
            });
            const hostileFutureQui = buildTypedNumberBoundary({
                stem: "nemi",
                tns: "z",
                num1: "qui",
                num2: "0",
            });
            const hostilePluralC = buildTypedNumberBoundary({
                stem: "mic",
                num1: "c",
                num2: "eh",
                pers1: "ti",
            });
            const optativeSquare = buildTypedNumberBoundary({
                stem: "nemi",
                num1: "\u2395",
                num2: "0",
                pers1: "xi",
                condition: "optative",
                num1VariantRule: "lesson-5.3.3d-optative-singular-square-zero",
            });
            const legacyStringOnly = ctx.buildClassicalNahuatlFinalBoundaryRealizationFrame({
                formula: "#ni-0(mic)0+c-0#",
            });
            return {
                hostileCConsonantFormula: hostileCConsonant.formulaRealization,
                hostileCConsonantFinalNum1: hostileCConsonant.finalNum1,
                hostileCConsonantLeftSource: hostileCConsonant.finalNum1LeftCarrierSource,
                hostileCConsonantLeftSound: hostileCConsonant.finalNum1LeftSound,
                hostileCConsonantAction: hostileCConsonant.finalNum1SupportiveVowelAction,
                hostileCConsonantSquareZero: hostileCConsonant.finalNum1SquareZeroReplacesQui,
                hostileCConsonantActions: hostileCConsonant.actions.includes("realize-num1-k-connector-after-final-predicate"),
                hostileQuiConsonantFormula: hostileQuiConsonant.formulaRealization,
                hostileSquareVowelFormula: hostileSquareVowel.formulaRealization,
                hostileSquareVowelFinalNum1: hostileSquareVowel.finalNum1,
                hostileSquareVowelAction: hostileSquareVowel.finalNum1SupportiveVowelAction,
                hostileFutureQuiFormula: hostileFutureQui.formulaRealization,
                hostileFutureQuiLeftSource: hostileFutureQui.finalNum1LeftCarrierSource,
                hostileFutureQuiLeftSound: hostileFutureQui.finalNum1LeftSound,
                hostilePluralCFormula: hostilePluralC.formulaRealization,
                hostilePluralCFinalNum1: hostilePluralC.finalNum1,
                optativeSquareFormula: optativeSquare.formulaRealization,
                optativeSquareApplies: optativeSquare.finalNum1RealizationApplies,
                legacyStringOnlyStatus: legacyStringOnly.authorizationStatus,
                legacyStringOnlyReason: legacyStringOnly.blockReason,
            };
        })(),
        {
            hostileCConsonantFormula: "#ni-0(mic)0+\u2395-0#",
            hostileCConsonantFinalNum1: "\u2395",
            hostileCConsonantLeftSource: "stem",
            hostileCConsonantLeftSound: "c",
            hostileCConsonantAction: "suppress-supportive-qui-with-square-zero",
            hostileCConsonantSquareZero: true,
            hostileCConsonantActions: true,
            hostileQuiConsonantFormula: "#ni-0(mic)0+\u2395-0#",
            hostileSquareVowelFormula: "#ni-0(zaca)0+c-0#",
            hostileSquareVowelFinalNum1: "c",
            hostileSquareVowelAction: "not-needed-after-vowel",
            hostileFutureQuiFormula: "#ni-0(nemi)z+\u2395-0#",
            hostileFutureQuiLeftSource: "tns",
            hostileFutureQuiLeftSound: "z",
            hostilePluralCFormula: "#ti-0(mic)0+qu-eh#",
            hostilePluralCFinalNum1: "qu",
            optativeSquareFormula: "#xi-0(nemi)0+\u2395-0#",
            optativeSquareApplies: false,
            legacyStringOnlyStatus: "blocked",
            legacyStringOnlyReason: "missing-or-contradictory-typed-vnc-slot-frame",
        }
    );

    s.eq(
        "Classical Lesson 9.1-9.4 optative mechanics have exact Canvas spans and canonical callables",
        (() => {
            const rules = ctx.getClassicalNahuatlOptativeVncRules();
            const future =
                ctx.getClassicalNahuatlBorrowedIndicativeFormUse({
                    mood: "optative",
                    tense: "future",
                });
            const preterit =
                ctx.getClassicalNahuatlBorrowedIndicativeFormUse({
                    mood: "optative",
                    tense: "preterit",
                });
            return {
                spans: rules.map((rule) => [
                    rule.section,
                    rule.transcriptionLineStart,
                    rule.transcriptionLineEnd,
                ]),
                callablePaths: Array.from(
                    new Set(rules.map((rule) => rule.callablePath))
                ),
                future: [
                    future.borrowed,
                    future.formMood,
                    future.formTense,
                    future.borrowedFormRule,
                    future.antecessiveObligatory,
                ],
                preterit: [
                    preterit.borrowed,
                    preterit.formMood,
                    preterit.formTense,
                    preterit.borrowedFormRule,
                    preterit.antecessiveObligatory,
                ],
            };
        })(),
        {
            spans: [
                ["9.1", 3508, 3512],
                ["9.2", 3513, 3519],
                ["9.2", 3513, 3519],
                ["9.3", 3520, 3529],
                ["9.3", 3530, 3533],
                ["9.3", 3538, 3539],
                ["9.3", 3540, 3543],
                ["9.3", 3544, 3546],
                ["9.4", 3548, 3594],
            ],
            callablePaths: [
                "buildClassicalNahuatlPredicateFormationRuleFrame",
                "getClassicalNahuatlBorrowedIndicativeFormUse",
                "getClassicalNahuatlAspectForTense",
                "buildClassicalNahuatlImperfectiveShapeEligibilityFrame",
                "evaluateClassicalNahuatlVncApplication",
            ],
            future: [
                true,
                "indicative",
                "future",
                "future-optative-borrows-future-indicative-form-by-use",
                false,
            ],
            preterit: [
                true,
                "indicative",
                "preterit",
                "preterit-optative-borrows-preterit-indicative-form-by-use",
                true,
            ],
        }
    );

    s.eq(
        "Classical Lesson 8.2-8.6 uses selected VNC output for sentence surface without making particles formula authority",
        (() => {
            const affirmative = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "affirmative-assertion",
            });
            const negative = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "negative-assertion",
            });
            const emphaticNegative = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "emphatic-assertion",
                negative: true,
            });
            const questionByIntonation = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "yes-no-question",
                questionMode: "intonation",
            });
            const questionByCuix = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "yes-no-question",
                questionMode: "cuix",
            });
            const negativeQuestionByIntonation = ctx.buildClassicalNahuatlVerbstemClassFrame("(chōca)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                sentenceType: "yes-no-question",
                questionMode: "intonation",
                negative: true,
            });
            const negativeQuestionByCuix = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "yes-no-question",
                questionMode: "cuix",
                negative: true,
            });
            const caNegativeQuestionByCuix = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "yes-no-question",
                questionMode: "cuix",
                outsidePrefixes: ["ca#"],
                caNegativeTrigger: "mā",
            });
            const hostileParticleSlots = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "yes-no-question",
                questionMode: "cuix",
                hostileSentenceFormulaSlots: ["cuix", "ca"],
            });
            const hostileNegativePrefixSlot = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                sentenceType: "negative-assertion",
                hostileSentenceFormulaSlots: ["ah#"],
            });
            return {
                affirmativeFormula: affirmative.formulaRealization,
                affirmativeStatus: affirmative.sentenceSurfaceFrame.authorizationStatus,
                affirmativeOperation: affirmative.selectedOutputLogicFrame.outputFillers.sentenceOperationType,
                affirmativePunctuation: affirmative.selectedOutputLogicFrame.outputFillers.sentenceFinalPunctuation,
                negativeFormula: negative.formulaRealization,
                negativeParticles: negative.selectedOutputLogicFrame.outputFillers.sentenceParticles,
                negativeParticlesBecomeSlots: negative.selectedOutputLogicFrame.outputFillers.sentenceParticlesBecomeFormulaSlots,
                negativeSlotMaterial: negative.selectedOutputLogicFrame.outputFillers.formulaSlotMaterialFromSentenceParticles,
                emphaticNegativeParticles: emphaticNegative.selectedOutputLogicFrame.outputFillers.sentenceParticles,
                emphaticNegativeActions: emphaticNegative.selectedOutputLogicFrame.outputFillers.sentenceActions,
                questionIntonationMode: questionByIntonation.selectedOutputLogicFrame.outputFillers.sentenceQuestionMode,
                questionIntonationPunctuation: questionByIntonation.selectedOutputLogicFrame.outputFillers.sentenceFinalPunctuation,
                questionCuixParticles: questionByCuix.selectedOutputLogicFrame.outputFillers.sentenceParticles,
                questionCuixMode: questionByCuix.selectedOutputLogicFrame.outputFillers.sentenceQuestionMode,
                negativeQuestionIntonationStatus: negativeQuestionByIntonation.selectedOutputLogicFrame.outputFillers.sentenceSurfaceStatus,
                negativeQuestionIntonationParticles: negativeQuestionByIntonation.selectedOutputLogicFrame.outputFillers.sentenceParticles,
                negativeQuestionIntonationPunctuation: negativeQuestionByIntonation.selectedOutputLogicFrame.outputFillers.sentenceFinalPunctuation,
                negativeQuestionIntonationAuthorized: negativeQuestionByIntonation.selectedOutputLogicFrame.outputFillers.negativeQuestionAuthorized,
                negativeQuestionCuixStatus: negativeQuestionByCuix.selectedOutputLogicFrame.outputFillers.sentenceSurfaceStatus,
                negativeQuestionCuixParticles: negativeQuestionByCuix.selectedOutputLogicFrame.outputFillers.sentenceParticles,
                negativeQuestionCuixMode: negativeQuestionByCuix.selectedOutputLogicFrame.outputFillers.sentenceQuestionMode,
                caNegativeQuestionCuixStatus: caNegativeQuestionByCuix.selectedOutputLogicFrame.outputFillers.sentenceSurfaceStatus,
                caNegativeQuestionCuixParticles: caNegativeQuestionByCuix.selectedOutputLogicFrame.outputFillers.sentenceParticles,
                caNegativeQuestionCuixStack: caNegativeQuestionByCuix.selectedOutputLogicFrame.outputFillers.sentencePrefixalStack,
                hostileVncStillAuthorized: hostileParticleSlots.proofFrame.authorizationStatus,
                hostileFormulaStillSelected: hostileParticleSlots.formulaRealization,
                hostileSentenceStatus: hostileParticleSlots.selectedOutputLogicFrame.outputFillers.sentenceSurfaceStatus,
                hostileRejectedSlots: hostileParticleSlots.selectedOutputLogicFrame.outputFillers.sentenceHostileRejectedFormulaSlots,
                hostileReason: hostileParticleSlots.selectedOutputLogicFrame.outputFillers.sentenceBlockReason,
                hostileNegativeVncStillAuthorized: hostileNegativePrefixSlot.proofFrame.authorizationStatus,
                hostileNegativeFormulaStillSelected: hostileNegativePrefixSlot.formulaRealization,
                hostileNegativeSentenceStatus: hostileNegativePrefixSlot.selectedOutputLogicFrame.outputFillers.sentenceSurfaceStatus,
                hostileNegativeRejectedSlots: hostileNegativePrefixSlot.selectedOutputLogicFrame.outputFillers.sentenceHostileRejectedFormulaSlots,
                hostileNegativeReason: hostileNegativePrefixSlot.selectedOutputLogicFrame.outputFillers.sentenceBlockReason,
            };
        })(),
        {
            affirmativeFormula: "#0-0(cochi)0+0-0#",
            affirmativeStatus: "authorized",
            affirmativeOperation: "assertion-composition",
            affirmativePunctuation: ".",
            negativeFormula: "#0-0(cochi)0+0-0#",
            negativeParticles: ["ah#"],
            negativeParticlesBecomeSlots: false,
            negativeSlotMaterial: [],
            emphaticNegativeParticles: ["ca", "ah#"],
            emphaticNegativeActions: [
                "add-negative-prefix-outside-vnc-for-negative-assertion",
                "add-emphatic-ca-to-sentence-left-edge",
                "keep-sentence-particles-out-of-vnc-formula",
                "carry-sentence-surface-to-selected-output",
            ],
            questionIntonationMode: "intonation",
            questionIntonationPunctuation: "?",
            questionCuixParticles: ["cuix"],
            questionCuixMode: "cuix",
            negativeQuestionIntonationStatus: "authorized",
            negativeQuestionIntonationParticles: ["ah#"],
            negativeQuestionIntonationPunctuation: "?",
            negativeQuestionIntonationAuthorized: true,
            negativeQuestionCuixStatus: "authorized",
            negativeQuestionCuixParticles: ["cuix", "ah#"],
            negativeQuestionCuixMode: "cuix",
            caNegativeQuestionCuixStatus: "authorized",
            caNegativeQuestionCuixParticles: ["cuix", "ca#"],
            caNegativeQuestionCuixStack: ["ca#"],
            hostileVncStillAuthorized: "authorized",
            hostileFormulaStillSelected: "#0-0(cochi)0+0-0#",
            hostileSentenceStatus: "blocked",
            hostileRejectedSlots: ["cuix", "ca"],
            hostileReason: "sentence-particle-cannot-be-vnc-formula-slot",
            hostileNegativeVncStillAuthorized: "authorized",
            hostileNegativeFormulaStillSelected: "#0-0(cochi)0+0-0#",
            hostileNegativeSentenceStatus: "blocked",
            hostileNegativeRejectedSlots: ["ah#"],
            hostileNegativeReason: "sentence-particle-cannot-be-vnc-formula-slot",
        }
    );

    s.eq(
        "Classical Lesson 9 finalizes wish and command sentences without letting lower VNC output freeze too early",
        (() => {
            const wish = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "wish-sentence",
                introductoryParticle: "mā",
            });
            const missingWishIntro = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "wish-sentence",
            });
            const secondCommandOmission = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "command-sentence",
            });
            const thirdCommandOmission = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "command-sentence",
            });
            const firstPersonCommandDerivedAsExhortation = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "command-sentence",
                introductoryParticle: "mā",
            });
            const secondPersonExhortationAliasDerivedAsCommand = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "exhortation-sentence",
                introductoryParticle: "mā",
            });
            const hostileIntroSlots = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "wish-sentence",
                introductoryParticle: "tlā",
                hostileSentenceFormulaSlots: ["mā", "tlā"],
            });
            const negativeWish = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3pl",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "wish-sentence",
                introductoryParticle: "mā",
                negative: true,
            });
            const futureCommand = ctx.buildClassicalNahuatlVerbstemClassFrame("(tequi-ti)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "optative",
                tense: "future",
                verbClass: "B",
                sentenceType: "command-sentence",
                introductoryParticle: "mā",
            });
            const futureCommandWithoutIntro = ctx.buildClassicalNahuatlVerbstemClassFrame("(tequi-ti)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "optative",
                tense: "future",
                verbClass: "B",
                sentenceType: "command-sentence",
            });
            const brusqueNegativeCommand = ctx.buildClassicalNahuatlVerbstemClassFrame("(chīhua)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "command-sentence",
                negative: true,
            });
            const negativeFutureCommand = ctx.buildClassicalNahuatlVerbstemClassFrame("(cua)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "optative",
                tense: "future",
                verbClass: "D",
                sentenceType: "command-sentence",
                introductoryParticle: "mā",
                negative: true,
            });
            const hostileCaSlot = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                valence: "intransitive",
                subject: "3pl",
                mood: "optative",
                tense: "nonpast",
                verbClass: "B",
                sentenceType: "wish-sentence",
                introductoryParticle: "mā",
                negative: true,
                hostileSentenceFormulaSlots: ["ca#"],
            });
            const wishFillers = wish.selectedOutputLogicFrame.outputFillers;
            const missingFillers = missingWishIntro.selectedOutputLogicFrame.outputFillers;
            const secondCommandFillers = secondCommandOmission.selectedOutputLogicFrame.outputFillers;
            const thirdCommandFillers = thirdCommandOmission.selectedOutputLogicFrame.outputFillers;
            const firstCommandDerivedFillers = firstPersonCommandDerivedAsExhortation.selectedOutputLogicFrame.outputFillers;
            const secondExhortationAliasFillers = secondPersonExhortationAliasDerivedAsCommand.selectedOutputLogicFrame.outputFillers;
            const hostileFillers = hostileIntroSlots.selectedOutputLogicFrame.outputFillers;
            const negativeWishFillers = negativeWish.selectedOutputLogicFrame.outputFillers;
            const futureCommandFillers = futureCommand.selectedOutputLogicFrame.outputFillers;
            const futureCommandWithoutIntroFillers = futureCommandWithoutIntro.selectedOutputLogicFrame.outputFillers;
            const brusqueNegativeFillers = brusqueNegativeCommand.selectedOutputLogicFrame.outputFillers;
            const negativeFutureCommandFillers = negativeFutureCommand.selectedOutputLogicFrame.outputFillers;
            const hostileCaFillers = hostileCaSlot.selectedOutputLogicFrame.outputFillers;
            return {
                wishVncFormula: wish.formulaRealization,
                wishSentenceStatus: wishFillers.sentenceSurfaceStatus,
                wishSentenceKind: wishFillers.sentenceSurfaceKind,
                wishCompositionOperation: wishFillers.sentenceCompositionOperationId,
                wishConsumedVncRole: wishFillers.consumedVncRole,
                wishConsumedVncStatus: wishFillers.consumedVncStatus,
                wishIntroductoryParticle: wishFillers.sentenceIntroductoryParticle,
                wishIntroductoryParticleRequired: wishFillers.sentenceIntroductoryParticleRequired,
                wishParticles: wishFillers.sentenceParticles,
                wishParticlesBecomeSlots: wishFillers.sentenceParticlesBecomeFormulaSlots,
                wishSlotMaterial: wishFillers.formulaSlotMaterialFromSentenceParticles,
                wishActions: wishFillers.sentenceActions,
                missingVncStillAuthorized: missingWishIntro.proofFrame.authorizationStatus,
                missingFormulaStillSelected: missingWishIntro.formulaRealization,
                missingSentenceStatus: missingFillers.sentenceSurfaceStatus,
                missingSentenceReason: missingFillers.sentenceBlockReason,
                secondCommandFormula: secondCommandOmission.formulaRealization,
                secondCommandStatus: secondCommandFillers.sentenceSurfaceStatus,
                secondCommandOmissionAllowed: secondCommandFillers.sentenceIntroductoryParticleOmissionAllowed,
                secondCommandOmissionReason: secondCommandFillers.sentenceIntroductoryParticleOmissionReason,
                thirdCommandVncStillAuthorized: thirdCommandOmission.proofFrame.authorizationStatus,
                thirdCommandSentenceStatus: thirdCommandFillers.sentenceSurfaceStatus,
                thirdCommandReason: thirdCommandFillers.sentenceBlockReason,
                firstCommandDerivedStatus: firstCommandDerivedFillers.sentenceSurfaceStatus,
                firstCommandCanvasRole: firstCommandDerivedFillers.sentenceCanvasRole,
                firstCommandRoleDerived: firstCommandDerivedFillers.sentenceRoleDerivedFromSubject,
                firstCommandRoleNotice: firstCommandDerivedFillers.sentenceCanvasRoleNotice,
                secondExhortationAliasStatus: secondExhortationAliasFillers.sentenceSurfaceStatus,
                secondExhortationAliasCanvasRole: secondExhortationAliasFillers.sentenceCanvasRole,
                secondExhortationAliasRoleDerived: secondExhortationAliasFillers.sentenceRoleDerivedFromSubject,
                secondExhortationAliasRoleNotice: secondExhortationAliasFillers.sentenceCanvasRoleNotice,
                hostileVncStillAuthorized: hostileIntroSlots.proofFrame.authorizationStatus,
                hostileSentenceStatus: hostileFillers.sentenceSurfaceStatus,
                hostileRejectedSlots: hostileFillers.sentenceHostileRejectedFormulaSlots,
                hostileSlotMaterial: hostileFillers.formulaSlotMaterialFromSentenceParticles,
                hostileReason: hostileFillers.sentenceBlockReason,
                negativeWishFormula: negativeWish.formulaRealization,
                negativeWishStatus: negativeWishFillers.sentenceSurfaceStatus,
                negativeWishParticles: negativeWishFillers.sentenceParticles,
                negativeWishStack: negativeWishFillers.sentencePrefixalStack,
                negativeWishPrefix: negativeWishFillers.sentenceNegativePrefix,
                negativeWishTransform: negativeWishFillers.sentenceLesson9NegativeTransformation,
                negativeWishCaLicensed: negativeWishFillers.sentenceCaNegativeLicensedByIntroductoryParticle,
                futureCommandFormula: futureCommand.formulaRealization,
                futureCommandStatus: futureCommandFillers.sentenceSurfaceStatus,
                futureCommandIsFutureOptative: futureCommandFillers.sentenceFutureIndicativeAsOptative,
                futureCommandIntroRequired: futureCommandFillers.sentenceFutureCommandIntroductoryParticleRequired,
                futureCommandParticles: futureCommandFillers.sentenceParticles,
                futureCommandNoIntroVncStillAuthorized: futureCommandWithoutIntro.proofFrame.authorizationStatus,
                futureCommandNoIntroStatus: futureCommandWithoutIntroFillers.sentenceSurfaceStatus,
                futureCommandNoIntroReason: futureCommandWithoutIntroFillers.sentenceBlockReason,
                brusqueNegativeFormula: brusqueNegativeCommand.formulaRealization,
                brusqueNegativeStatus: brusqueNegativeFillers.sentenceSurfaceStatus,
                brusqueNegativeParticles: brusqueNegativeFillers.sentenceParticles,
                brusqueNegativePrefix: brusqueNegativeFillers.sentenceNegativePrefix,
                brusqueNegativeTransform: brusqueNegativeFillers.sentenceLesson9NegativeTransformation,
                brusqueNegativeAhRequired: brusqueNegativeFillers.sentenceAhNegativeRequiredWithoutIntroductoryParticle,
                negativeFutureCommandFormula: negativeFutureCommand.formulaRealization,
                negativeFutureCommandStatus: negativeFutureCommandFillers.sentenceSurfaceStatus,
                negativeFutureCommandParticles: negativeFutureCommandFillers.sentenceParticles,
                negativeFutureCommandFutureOptative: negativeFutureCommandFillers.sentenceFutureIndicativeAsOptative,
                negativeFutureCommandTransform: negativeFutureCommandFillers.sentenceLesson9NegativeTransformation,
                hostileCaVncStillAuthorized: hostileCaSlot.proofFrame.authorizationStatus,
                hostileCaSentenceStatus: hostileCaFillers.sentenceSurfaceStatus,
                hostileCaRejectedSlots: hostileCaFillers.sentenceHostileRejectedFormulaSlots,
                hostileCaSlotMaterial: hostileCaFillers.formulaSlotMaterialFromSentenceParticles,
            };
        })(),
        {
            wishVncFormula: "#ni-0(cochi)0+⎕-0#",
            wishSentenceStatus: "authorized",
            wishSentenceKind: "classical-nahuatl-optative-sentence-sentence-surface-frame",
            wishCompositionOperation: "vnc-sentence-composition",
            wishConsumedVncRole: "complete-typed-vnc-input-to-sentence-composition",
            wishConsumedVncStatus: "complete",
            wishIntroductoryParticle: "mā",
            wishIntroductoryParticleRequired: true,
            wishParticles: ["mā"],
            wishParticlesBecomeSlots: false,
            wishSlotMaterial: [],
            wishActions: [
                "consume-complete-optative-vnc-in-sentence-composition",
                "substitute-optative-vnc-for-indicative-in-wish-command-sentence",
                "add-ma-or-tla-introductory-particle-outside-vnc",
                "require-ma-or-tla-for-wish-sentence",
                "keep-introductory-particle-out-of-vnc-formula",
                "keep-sentence-particles-out-of-vnc-formula",
                "carry-composed-optative-sentence-to-selected-output",
                "carry-sentence-surface-to-selected-output",
            ],
            missingVncStillAuthorized: "authorized",
            missingFormulaStillSelected: "#ni-0(cochi)0+⎕-0#",
            missingSentenceStatus: "blocked",
            missingSentenceReason: "lesson-9-wish-command-requires-ma-or-tla",
            secondCommandFormula: "#xi-0(cochi)0+⎕-0#",
            secondCommandStatus: "authorized",
            secondCommandOmissionAllowed: true,
            secondCommandOmissionReason: "second-person direct command may omit mā/tlā because x/xi is distinctly optative",
            thirdCommandVncStillAuthorized: "authorized",
            thirdCommandSentenceStatus: "blocked",
            thirdCommandReason: "lesson-9-wish-command-requires-ma-or-tla",
            firstCommandDerivedStatus: "authorized",
            firstCommandCanvasRole: "exhortation",
            firstCommandRoleDerived: true,
            firstCommandRoleNotice: "Canvas derives exhortation from a first-person subject",
            secondExhortationAliasStatus: "authorized",
            secondExhortationAliasCanvasRole: "direct-command",
            secondExhortationAliasRoleDerived: true,
            secondExhortationAliasRoleNotice: "Canvas derives direct command from a second-person subject",
            hostileVncStillAuthorized: "authorized",
            hostileSentenceStatus: "blocked",
            hostileRejectedSlots: ["mā", "tlā"],
            hostileSlotMaterial: [],
            hostileReason: "sentence-particle-cannot-be-vnc-formula-slot",
            negativeWishFormula: "#0-0(cochi)0+c-ān#",
            negativeWishStatus: "authorized",
            negativeWishParticles: ["mā", "ca#"],
            negativeWishStack: ["ca#"],
            negativeWishPrefix: "ca#",
            negativeWishTransform: "ma-tla-changes-ah-to-ca",
            negativeWishCaLicensed: true,
            futureCommandFormula: "#ti-0(tequi-ti)z+⎕-0#",
            futureCommandStatus: "authorized",
            futureCommandIsFutureOptative: true,
            futureCommandIntroRequired: true,
            futureCommandParticles: ["mā"],
            futureCommandNoIntroVncStillAuthorized: "authorized",
            futureCommandNoIntroStatus: "blocked",
            futureCommandNoIntroReason: "lesson-9-wish-command-requires-ma-or-tla",
            brusqueNegativeFormula: "#xi-0(chīhua)0+⎕-0#",
            brusqueNegativeStatus: "authorized",
            brusqueNegativeParticles: ["ah#"],
            brusqueNegativePrefix: "ah#",
            brusqueNegativeTransform: "brusque-command-keeps-ah",
            brusqueNegativeAhRequired: true,
            negativeFutureCommandFormula: "#ti-0(cua)z+⎕-0#",
            negativeFutureCommandStatus: "authorized",
            negativeFutureCommandParticles: ["mā", "ca#"],
            negativeFutureCommandFutureOptative: true,
            negativeFutureCommandTransform: "ma-tla-changes-ah-to-ca",
            hostileCaVncStillAuthorized: "authorized",
            hostileCaSentenceStatus: "blocked",
            hostileCaRejectedSlots: ["ca#"],
            hostileCaSlotMaterial: [],
        }
    );

    s.eq(
        "Classical Lesson 9 Canvas examples derive from mood and introductory particles, not hidden sentence-type choices",
        (() => {
            const pick = (frame) => {
                const fillers = frame.selectedOutputLogicFrame.outputFillers;
                const result = {
                    formula: frame.formulaRealization,
                    status: fillers.sentenceSurfaceStatus || "",
                    lesson9SentenceType: fillers.lesson9SentenceType || "",
                    role: fillers.sentenceCanvasRole || "",
                    particles: fillers.sentenceParticles || [],
                    stack: fillers.sentencePrefixalStack || [],
                    negativePrefix: fillers.sentenceNegativePrefix || "",
                    negativeTransform: fillers.sentenceLesson9NegativeTransformation || "",
                    introRequired: fillers.sentenceIntroductoryParticleRequired === true,
                    omissionAllowed: fillers.sentenceIntroductoryParticleOmissionAllowed === true,
                    futureIndicativeAsOptative: fillers.sentenceFutureIndicativeAsOptative === true,
                    compositionOperation: fillers.sentenceCompositionOperationId || "",
                    blockReason: fillers.sentenceBlockReason || "",
                };
                if (fillers.sentencePrefaceParticle || fillers.sentenceRequestedPrefaceParticle || fillers.sentencePrefaceParticleAuthorized === false) {
                    result.preface = fillers.sentencePrefaceParticle || "";
                    result.requestedPreface = fillers.sentenceRequestedPrefaceParticle || "";
                    result.prefaceAuthorized = fillers.sentencePrefaceParticleAuthorized === true;
                }
                if (fillers.sentenceIntroductoryModifier || fillers.sentenceRequestedIntroductoryModifier || fillers.sentenceIntroductoryModifierAuthorized === false) {
                    result.modifier = fillers.sentenceIntroductoryModifier || "";
                    result.requestedModifier = fillers.sentenceRequestedIntroductoryModifier || "";
                    result.modifierAuthorized = fillers.sentenceIntroductoryModifierAuthorized === true;
                }
                return result;
            };
            return {
                maNicochi: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                })),
                maCacochican: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    valence: "intransitive",
                    subject: "3pl",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    negative: true,
                })),
                xihcihui: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(ihcihui)", {
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                })),
                maTitequitiz: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(tequi-ti)", {
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "optative",
                    tense: "future",
                    verbClass: "B",
                    introductoryParticle: "mā",
                })),
                maOniCochPreteritOptative: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "optative",
                    tense: "preterit",
                    verbClass: "B",
                    introductoryParticle: "mā",
                })),
                hostileIndicativeFutureParticle: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(tequi-ti)", {
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "indicative",
                    tense: "future",
                    verbClass: "B",
                    introductoryParticle: "mā",
                })),
                maXipaquini: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(pāqui)", {
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "optative",
                    tense: "past",
                    verbClass: "B",
                    introductoryParticle: "mā",
                })),
                ihyoMaNicochi: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    prefaceParticle: "ihyo",
                })),
                yeTlaXicochi: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "tlā",
                    prefaceParticle: "ye",
                })),
                maCuelNicochi: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    introductoryModifier: "ye-cuēl",
                })),
                maTelNihcihui: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(ihcihui)", {
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    introductoryModifier: "tēl",
                })),
                maQuinTitequitiz: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(tequi-ti)", {
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "optative",
                    tense: "future",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    introductoryModifier: "quin",
                })),
                hostileIndicativeIhyo: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                    introductoryParticle: "none",
                    prefaceParticle: "ihyo",
                })),
                hostileTlaQuin: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(tequi-ti)", {
                    valence: "intransitive",
                    subject: "2sg",
                    mood: "optative",
                    tense: "future",
                    verbClass: "B",
                    introductoryParticle: "tlā",
                    introductoryModifier: "quin",
                })),
                hostileModifierFormulaSlot: pick(ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "optative",
                    tense: "nonpast",
                    verbClass: "B",
                    introductoryParticle: "mā",
                    introductoryModifier: "cuēl",
                    hostileSentenceFormulaSlots: ["cuēl"],
                })),
            };
        })(),
        {
            maNicochi: {
                formula: "#ni-0(cochi)0+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "wish-sentence",
                role: "wish",
                particles: ["mā"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
            },
            maCacochican: {
                formula: "#0-0(cochi)0+c-ān#",
                status: "authorized",
                lesson9SentenceType: "wish-sentence",
                role: "wish",
                particles: ["mā", "ca#"],
                stack: ["ca#"],
                negativePrefix: "ca#",
                negativeTransform: "ma-tla-changes-ah-to-ca",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
            },
            xihcihui: {
                formula: "#x-0(ihcihui)0+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "command-sentence",
                role: "direct-command",
                particles: [],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: false,
                omissionAllowed: true,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
            },
            maTitequitiz: {
                formula: "#ti-0(tequi-ti)z+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "command-sentence",
                role: "direct-command",
                particles: ["mā"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: true,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
            },
            maOniCochPreteritOptative: {
                formula: "#ni-0(coch)0+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "wish-sentence",
                role: "wish",
                particles: ["mā"],
                stack: ["ō#"],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
            },
            hostileIndicativeFutureParticle: {
                formula: "#ti-0(tequi-ti)z+⎕-0#",
                status: "",
                lesson9SentenceType: "",
                role: "",
                particles: [],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: false,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "",
                blockReason: "",
            },
            maXipaquini: {
                formula: "#xi-0(pāqui)ni+0-0#",
                status: "authorized",
                lesson9SentenceType: "wish-sentence",
                role: "wish",
                particles: ["mā"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
            },
            ihyoMaNicochi: {
                formula: "#ni-0(cochi)0+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "wish-sentence",
                role: "wish",
                particles: ["ihyo", "mā"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
                preface: "ihyo",
                requestedPreface: "ihyo",
                prefaceAuthorized: true,
            },
            yeTlaXicochi: {
                formula: "#xi-0(cochi)0+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "wish-sentence",
                role: "wish",
                particles: ["ye", "tlā"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
                preface: "ye",
                requestedPreface: "ye",
                prefaceAuthorized: true,
            },
            maCuelNicochi: {
                formula: "#ni-0(cochi)0+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "wish-sentence",
                role: "wish",
                particles: ["mā", "ye-cuēl"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
                modifier: "ye-cuēl",
                requestedModifier: "ye-cuēl",
                modifierAuthorized: true,
            },
            maTelNihcihui: {
                formula: "#n-0(ihcihui)0+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "command-sentence",
                role: "exhortation",
                particles: ["mā", "tēl"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
                modifier: "tēl",
                requestedModifier: "tēl",
                modifierAuthorized: true,
            },
            maQuinTitequitiz: {
                formula: "#ti-0(tequi-ti)z+⎕-0#",
                status: "authorized",
                lesson9SentenceType: "command-sentence",
                role: "direct-command",
                particles: ["mā", "quin"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: true,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "",
                modifier: "quin",
                requestedModifier: "quin",
                modifierAuthorized: true,
            },
            hostileIndicativeIhyo: {
                formula: "#ni-0(cochi)0+0-0#",
                status: "",
                lesson9SentenceType: "",
                role: "",
                particles: [],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: false,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "",
                blockReason: "",
            },
            hostileTlaQuin: {
                formula: "#ti-0(tequi-ti)z+⎕-0#",
                status: "blocked",
                lesson9SentenceType: "command-sentence",
                role: "direct-command",
                particles: ["tlā"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: true,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "lesson-9-introductory-modifier-not-authorized-in-current-environment",
                modifier: "",
                requestedModifier: "quin",
                modifierAuthorized: false,
            },
            hostileModifierFormulaSlot: {
                formula: "#ni-0(cochi)0+⎕-0#",
                status: "blocked",
                lesson9SentenceType: "wish-sentence",
                role: "wish",
                particles: ["mā", "cuēl"],
                stack: [],
                negativePrefix: "",
                negativeTransform: "",
                introRequired: true,
                omissionAllowed: false,
                futureIndicativeAsOptative: false,
                compositionOperation: "vnc-sentence-composition",
                blockReason: "sentence-particle-cannot-be-vnc-formula-slot",
                modifier: "cuēl",
                requestedModifier: "cuēl",
                modifierAuthorized: true,
            },
        }
    );

    s.eq(
        "Classical Lesson 10 finalizes admonitive sentences above the lower VNC and keeps mā/nēn/ah outside formula slots",
        (() => {
            const affirmative = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "mā",
            });
            const strengthened = ctx.buildClassicalNahuatlVerbstemClassFrame("(tzahtzi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
                introductoryModifier: "nēn",
            });
            const negative = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
                negative: true,
            });
            const missingMa = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
            });
            const hostileTla = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "tlā",
            });
            const hostileSlots = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
                negative: true,
                hostileSentenceFormulaSlots: ["mā", "nēn", "ah#", "ca#"],
            });
            const affirmativeFillers = affirmative.selectedOutputLogicFrame.outputFillers;
            const strengthenedFillers = strengthened.selectedOutputLogicFrame.outputFillers;
            const negativeFillers = negative.selectedOutputLogicFrame.outputFillers;
            const missingFillers = missingMa.selectedOutputLogicFrame.outputFillers;
            const hostileTlaFillers = hostileTla.selectedOutputLogicFrame.outputFillers;
            const hostileSlotFillers = hostileSlots.selectedOutputLogicFrame.outputFillers;
            return {
                affirmativeFormula: affirmative.formulaRealization,
                affirmativeStatus: affirmativeFillers.sentenceSurfaceStatus,
                affirmativeKind: affirmativeFillers.sentenceSurfaceKind,
                affirmativeCompositionOperation: affirmativeFillers.sentenceCompositionOperationId,
                affirmativeConsumedVncRole: affirmativeFillers.consumedVncRole,
                affirmativeConsumedVncStatus: affirmativeFillers.consumedVncStatus,
                affirmativeParticles: affirmativeFillers.sentenceParticles,
                affirmativeParticlesBecomeSlots: affirmativeFillers.sentenceParticlesBecomeFormulaSlots,
                affirmativeSlotMaterial: affirmativeFillers.formulaSlotMaterialFromSentenceParticles,
                affirmativeRole: affirmativeFillers.sentenceCanvasRole,
                affirmativeRoleNotice: affirmativeFillers.sentenceCanvasRoleNotice,
                affirmativeIntroRequired: affirmativeFillers.sentenceIntroductoryParticleRequired,
                affirmativeNenOptional: affirmativeFillers.sentenceAdmonitiveNenOptional,
                affirmativeNenRequired: affirmativeFillers.sentenceAdmonitiveNenRequired,
                affirmativeNenPresent: affirmativeFillers.sentenceAdmonitiveNenPresent,
                affirmativeCollocation: affirmativeFillers.sentenceAdmonitiveMaNenCollocation,
                affirmativeForce: affirmativeFillers.sentenceAdmonitiveForce,
                affirmativeMoodPolarity: affirmativeFillers.sentenceAdmonitiveMoodPolarity,
                affirmativePositiveByMood: affirmativeFillers.sentenceAdmonitiveIsPositiveByMood,
                affirmativeVetitiveAccepted: affirmativeFillers.sentenceAdmonitiveVetitiveTermAccepted,
                affirmativeProhibitionAllowed: affirmativeFillers.sentenceAdmonitiveProhibitionReadingAllowed,
                affirmativeNegativeCommandAllowed: affirmativeFillers.sentenceAdmonitiveNegativeCommandReadingAllowed,
                affirmativeDontTranslationAuthority: affirmativeFillers.sentenceAdmonitiveDontTranslationAuthority,
                affirmativeMayNotTranslationAuthority: affirmativeFillers.sentenceAdmonitiveMayNotTranslationAuthority,
                affirmativeProhibitionReplacementLayer: affirmativeFillers.sentenceAdmonitiveProhibitionReplacementLayer,
                affirmativeActions: affirmativeFillers.sentenceActions,
                strengthenedFormula: strengthened.formulaRealization,
                strengthenedStatus: strengthenedFillers.sentenceSurfaceStatus,
                strengthenedParticles: strengthenedFillers.sentenceParticles,
                strengthenedRole: strengthenedFillers.sentenceCanvasRole,
                strengthenedNenPresent: strengthenedFillers.sentenceAdmonitiveNenPresent,
                strengthenedCollocation: strengthenedFillers.sentenceAdmonitiveMaNenCollocation,
                negativeFormula: negative.formulaRealization,
                negativeStatus: negativeFillers.sentenceSurfaceStatus,
                negativeParticles: negativeFillers.sentenceParticles,
                negativeStack: negativeFillers.sentencePrefixalStack,
                negativePrefix: negativeFillers.sentenceNegativePrefix,
                negativeTransform: negativeFillers.sentenceLesson10NegativeTransformation,
                negativeForce: negativeFillers.sentenceAdmonitiveForce,
                negativeProhibitionAllowed: negativeFillers.sentenceAdmonitiveProhibitionReadingAllowed,
                negativeNenRequired: negativeFillers.sentenceAdmonitiveNenRequired,
                negativeNenPresent: negativeFillers.sentenceAdmonitiveNenPresent,
                negativeCaBlocked: negativeFillers.sentenceCaNegativeBlockedByAdmonitive,
                missingVncStillAuthorized: missingMa.proofFrame.authorizationStatus,
                missingStatus: missingFillers.sentenceSurfaceStatus,
                missingReason: missingFillers.sentenceBlockReason,
                hostileTlaStatus: hostileTlaFillers.sentenceSurfaceStatus,
                hostileTlaReason: hostileTlaFillers.sentenceBlockReason,
                hostileSlotsVncStillAuthorized: hostileSlots.proofFrame.authorizationStatus,
                hostileSlotsStatus: hostileSlotFillers.sentenceSurfaceStatus,
                hostileSlotsRejected: hostileSlotFillers.sentenceHostileRejectedFormulaSlots,
                hostileSlotsMaterial: hostileSlotFillers.formulaSlotMaterialFromSentenceParticles,
                hostileSlotsReason: hostileSlotFillers.sentenceBlockReason,
            };
        })(),
        {
            affirmativeFormula: "#ti-0(huetz)0+⎕-0#",
            affirmativeStatus: "authorized",
            affirmativeKind: "classical-nahuatl-admonitive-admonitive-sentence-surface-frame",
            affirmativeCompositionOperation: "vnc-sentence-composition",
            affirmativeConsumedVncRole: "complete-typed-vnc-input-to-sentence-composition",
            affirmativeConsumedVncStatus: "complete",
            affirmativeParticles: ["mā"],
            affirmativeParticlesBecomeSlots: false,
            affirmativeSlotMaterial: [],
            affirmativeRole: "direct-admonition",
            affirmativeRoleNotice: "Canvas compares second-person admonition to a direct command, but it remains admonitive warning",
            affirmativeIntroRequired: true,
            affirmativeNenOptional: true,
            affirmativeNenRequired: false,
            affirmativeNenPresent: false,
            affirmativeCollocation: "mā",
            affirmativeForce: "positive-cautionary-warning-advice",
            affirmativeMoodPolarity: "positive-not-negative-by-mood",
            affirmativePositiveByMood: true,
            affirmativeVetitiveAccepted: false,
            affirmativeProhibitionAllowed: false,
            affirmativeNegativeCommandAllowed: false,
            affirmativeDontTranslationAuthority: "not-authority",
            affirmativeMayNotTranslationAuthority: "not-authority",
            affirmativeProhibitionReplacementLayer: "Lesson 9 negative command/exhortation sentence layer",
            affirmativeActions: [
                "consume-complete-admonitive-vnc-in-sentence-composition",
                "classify-admonitive-as-positive-cautionary-warning",
                "reject-vetitive-prohibition-reading",
                "block-dont-or-may-not-translation-as-admonitive-authority",
                "require-admonitive-vnc-for-admonition-sentence",
                "enforce-admonitive-nonpast-only",
                "use-perfective-stem-for-nonpast-admonitive",
                "record-class-a-h-vs-preterit-zero-contrast",
                "record-admonitive-number-dyads-square-zero-and-t-in-t-ih",
                "mark-admonitive-vnc-no-translation-value-outside-sentence",
                "require-nonpast-admonitive-perfective-stem",
                "substitute-admonitive-vnc-for-present-indicative-assertion",
                "add-ma-obligatory-admonitive-particle-outside-vnc",
                "require-ma-at-beginning-of-admonition-sentence",
                "derive-admonition-comparison-role-from-subject-person",
                "authorize-warning-sense-renderings-not-example-whitelist",
                "record-admonitive-optative-present-preterit-contrast-set",
                "record-second-person-optative-x-xi-distinction",
                "record-plural-subjects-always-distinctive",
                "record-ma-as-admonitive-sentence-layer-distinguisher",
                "keep-admonitive-particles-out-of-vnc-formula",
                "keep-sentence-particles-out-of-vnc-formula",
                "carry-composed-admonitive-sentence-to-selected-output",
                "carry-sentence-surface-to-selected-output",
            ],
            strengthenedFormula: "#ni-0(tzahtzi)h+⎕-0#",
            strengthenedStatus: "authorized",
            strengthenedParticles: ["mā", "nēn"],
            strengthenedRole: "admonitive-exhortation",
            strengthenedNenPresent: true,
            strengthenedCollocation: "mā nēn",
            negativeFormula: "#ni-0(temo)h+⎕-0#",
            negativeStatus: "authorized",
            negativeParticles: ["mā", "nēn", "ah#"],
            negativeStack: ["ah#"],
            negativePrefix: "ah#",
            negativeTransform: "negative-admonition-keeps-ah-and-requires-ma-nen",
            negativeForce: "cancel-warning-recommend-reject-caution",
            negativeProhibitionAllowed: false,
            negativeNenRequired: true,
            negativeNenPresent: true,
            negativeCaBlocked: true,
            missingVncStillAuthorized: "authorized",
            missingStatus: "blocked",
            missingReason: "lesson-10-admonition-requires-ma",
            hostileTlaStatus: "blocked",
            hostileTlaReason: "lesson-10-admonition-requires-ma",
            hostileSlotsVncStillAuthorized: "authorized",
            hostileSlotsStatus: "blocked",
            hostileSlotsRejected: ["mā", "nēn", "ah#", "ca#"],
            hostileSlotsMaterial: [],
            hostileSlotsReason: "sentence-particle-cannot-be-vnc-formula-slot",
        }
    );

    s.eq(
        "Classical Lesson 10.2 consumes lower VNC proof for nonpast perfective stem, class contrast, and admonitive number dyads",
        (() => {
            const classA = ctx.buildClassicalNahuatlVerbstemClassFrame("(tzahtzi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
            });
            const classB = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "mā",
            });
            const plural = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "1pl",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "mā",
            });
            const hostileFuture = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "future",
                verbClass: "B",
                introductoryParticle: "mā",
            });
            const classAFillers = classA.selectedOutputLogicFrame.outputFillers;
            const classBFillers = classB.selectedOutputLogicFrame.outputFillers;
            const pluralFillers = plural.selectedOutputLogicFrame.outputFillers;
            const hostileFillers = hostileFuture.selectedOutputLogicFrame.outputFillers;
            return {
                classAFormula: classA.formulaRealization,
                classAStatus: classAFillers.sentenceSurfaceStatus,
                classARequestedTense: classAFillers.sentenceAdmonitiveRequestedTense,
                classARequestedTenseAuthorized: classAFillers.sentenceAdmonitiveRequestedTenseAuthorized,
                classAOnlyNonpast: classAFillers.sentenceAdmonitiveOnlyNonpastTense,
                classAAspect: classAFillers.sentenceAdmonitiveStemAspect,
                classAPerfectiveRequired: classAFillers.sentenceAdmonitivePerfectiveStemRequired,
                classAPerfectivePresent: classAFillers.sentenceAdmonitivePerfectiveStemPresent,
                classATranslationOutsideSentence: classAFillers.sentenceAdmonitiveVncTranslationValueOutsideSentence,
                classATenseMorph: classAFillers.sentenceAdmonitiveTenseMorph,
                classAContrast: classAFillers.sentenceAdmonitiveClassATenseMorphContrast,
                classAContrastAuthorized: classAFillers.sentenceAdmonitiveTenseMorphContrastAuthorized,
                classADyad: classAFillers.sentenceAdmonitiveNumberDyad,
                classADyadKind: classAFillers.sentenceAdmonitiveNumberDyadKind,
                classASingularDyad: classAFillers.sentenceAdmonitiveSingularNumberDyad,
                classAPluralDyads: classAFillers.sentenceAdmonitivePluralNumberDyads,
                classANum1Morpheme: classAFillers.sentenceAdmonitiveNum1Morpheme,
                classANum1Condition: classAFillers.sentenceAdmonitiveNum1RegularMorphCondition,
                classANum2Singular: classAFillers.sentenceAdmonitiveNum2SingularMorph,
                classANum2Plural: classAFillers.sentenceAdmonitiveNum2PluralMorphs,
                classAActionsInclude102: [
                    "enforce-admonitive-nonpast-only",
                    "use-perfective-stem-for-nonpast-admonitive",
                    "record-class-a-h-vs-preterit-zero-contrast",
                    "record-admonitive-number-dyads-square-zero-and-t-in-t-ih",
                    "mark-admonitive-vnc-no-translation-value-outside-sentence",
                ].every((action) => classAFillers.sentenceActions.includes(action)),
                classBFormula: classB.formulaRealization,
                classBTenseMorph: classBFillers.sentenceAdmonitiveTenseMorph,
                classBContrast: classBFillers.sentenceAdmonitiveClassATenseMorphContrast,
                pluralFormula: plural.formulaRealization,
                pluralDyad: pluralFillers.sentenceAdmonitiveNumberDyad,
                hostileVncStillBuilt: hostileFuture.proofFrame.authorizationStatus,
                hostileSentenceStatus: hostileFillers.sentenceSurfaceStatus,
                hostileRequestedTense: hostileFillers.sentenceAdmonitiveRequestedTense,
                hostileRequestedTenseAuthorized: hostileFillers.sentenceAdmonitiveRequestedTenseAuthorized,
                hostileReason: hostileFillers.sentenceBlockReason,
            };
        })(),
        {
            classAFormula: "#ni-0(tzahtzi)h+⎕-0#",
            classAStatus: "authorized",
            classARequestedTense: "nonpast",
            classARequestedTenseAuthorized: true,
            classAOnlyNonpast: true,
            classAAspect: "perfective",
            classAPerfectiveRequired: true,
            classAPerfectivePresent: true,
            classATranslationOutsideSentence: "none",
            classATenseMorph: "h",
            classAContrast: "admonitive-h-vs-preterit-indicative-0",
            classAContrastAuthorized: true,
            classADyad: "⎕-0",
            classADyadKind: "nonpast-admonitive",
            classASingularDyad: "⎕-0",
            classAPluralDyads: ["t-in", "t-ih"],
            classANum1Morpheme: "/ti",
            classANum1Condition: "only-with-plural-num2",
            classANum2Singular: "0",
            classANum2Plural: ["in", "ih"],
            classAActionsInclude102: true,
            classBFormula: "#ti-0(huetz)0+⎕-0#",
            classBTenseMorph: "0",
            classBContrast: "non-class-a-admonitive-0-shares-preterit-indicative-0",
            pluralFormula: "#ti-0(huetz)0+t-in#",
            pluralDyad: "t-in",
            hostileVncStillBuilt: "authorized",
            hostileSentenceStatus: "blocked",
            hostileRequestedTense: "future",
            hostileRequestedTenseAuthorized: false,
            hostileReason: "lesson-10-admonitive-requires-nonpast-tense",
        }
    );

    s.eq(
        "Classical Lesson 10.3 converts present-indicative assertions into affirmative admonitions without authorizing dont or may-not readings",
        (() => {
            const direct = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "mā",
                admonitiveTranslationReading: "warning-sense",
            });
            const indirect = ctx.buildClassicalNahuatlVerbstemClassFrame("(chol-o-a)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "C",
                introductoryParticle: "mā",
            });
            const exhortation = ctx.buildClassicalNahuatlVerbstemClassFrame("(tzahtzi)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
                introductoryModifier: "nēn",
            });
            const hostileDont = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "mā",
                admonitiveTranslationReading: "don't",
            });
            const hostileMayNot = ctx.buildClassicalNahuatlVerbstemClassFrame("(chol-o-a)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "C",
                introductoryParticle: "mā",
                admonitiveTranslationReading: "may-not",
            });
            const directFillers = direct.selectedOutputLogicFrame.outputFillers;
            const indirectFillers = indirect.selectedOutputLogicFrame.outputFillers;
            const exhortationFillers = exhortation.selectedOutputLogicFrame.outputFillers;
            const hostileDontFillers = hostileDont.selectedOutputLogicFrame.outputFillers;
            const hostileMayNotFillers = hostileMayNot.selectedOutputLogicFrame.outputFillers;
            return {
                directFormula: direct.formulaRealization,
                directStatus: directFillers.sentenceSurfaceStatus,
                directConversionSource: directFillers.sentenceAdmonitiveAssertionConversionSource,
                directConversionTarget: directFillers.sentenceAdmonitiveAssertionConversionTarget,
                directVncSubstitution: directFillers.sentenceAdmonitiveVncSubstitution,
                directMaPosition: directFillers.sentenceAdmonitiveMaPosition,
                directRole: directFillers.sentenceCanvasRole,
                directRoleAuthority: directFillers.sentenceRoleAuthority,
                directRenderingPolicy: directFillers.sentenceAdmonitiveWarningRenderingPolicy,
                directRequestedTranslation: directFillers.sentenceAdmonitiveRequestedTranslationReading,
                directRequestedTranslationAuthorized: directFillers.sentenceAdmonitiveRequestedTranslationReadingAuthorized,
                directActionsInclude103: [
                    "substitute-admonitive-vnc-for-present-indicative-assertion",
                    "require-ma-at-beginning-of-admonition-sentence",
                    "derive-admonition-comparison-role-from-subject-person",
                    "authorize-warning-sense-renderings-not-example-whitelist",
                ].every((action) => directFillers.sentenceActions.includes(action)),
                indirectRole: indirectFillers.sentenceCanvasRole,
                indirectFormula: indirect.formulaRealization,
                exhortationRole: exhortationFillers.sentenceCanvasRole,
                exhortationParticles: exhortationFillers.sentenceParticles,
                nenStrengtheningKind: exhortationFillers.sentenceAdmonitiveNenStrengtheningKind,
                nenLexicalMeaning: exhortationFillers.sentenceAdmonitiveNenLexicalMeaning,
                maNenWritingPolicy: exhortationFillers.sentenceAdmonitiveMaNenWritingPolicy,
                traditionalSolidSpelling: exhortationFillers.sentenceAdmonitiveTraditionalSolidSpelling,
                strengthenedActionsIncludeNen: [
                    "add-nen-admonitive-collocation-outside-vnc",
                    "record-nen-as-adverbialized-nnc-strengthener",
                    "record-ma-nen-traditional-solid-spelling-manen",
                ].every((action) => exhortationFillers.sentenceActions.includes(action)),
                hostileDontVncStillBuilt: hostileDont.proofFrame.authorizationStatus,
                hostileDontStatus: hostileDontFillers.sentenceSurfaceStatus,
                hostileDontReading: hostileDontFillers.sentenceAdmonitiveRequestedTranslationReading,
                hostileDontReadingAuthorized: hostileDontFillers.sentenceAdmonitiveRequestedTranslationReadingAuthorized,
                hostileDontReason: hostileDontFillers.sentenceBlockReason,
                hostileMayNotVncStillBuilt: hostileMayNot.proofFrame.authorizationStatus,
                hostileMayNotStatus: hostileMayNotFillers.sentenceSurfaceStatus,
                hostileMayNotReading: hostileMayNotFillers.sentenceAdmonitiveRequestedTranslationReading,
                hostileMayNotReadingAuthorized: hostileMayNotFillers.sentenceAdmonitiveRequestedTranslationReadingAuthorized,
                hostileMayNotReason: hostileMayNotFillers.sentenceBlockReason,
            };
        })(),
        {
            directFormula: "#ti-0(huetz)0+⎕-0#",
            directStatus: "authorized",
            directConversionSource: "affirmative-present-indicative-assertion",
            directConversionTarget: "affirmative-admonition-warning-sentence",
            directVncSubstitution: "admonitive-vnc-substitutes-for-present-indicative-vnc",
            directMaPosition: "beginning-of-admonition-sentence",
            directRole: "direct-admonition",
            directRoleAuthority: "Andrews 10.3 subject-person admonition comparison",
            directRenderingPolicy: "any-rendering-with-warning-sense-is-valid-not-example-whitelist",
            directRequestedTranslation: "warning-sense",
            directRequestedTranslationAuthorized: true,
            directActionsInclude103: true,
            indirectRole: "indirect-admonition",
            indirectFormula: "#0-0(chol-o-h)0+⎕-0#",
            exhortationRole: "admonitive-exhortation",
            exhortationParticles: ["mā", "nēn"],
            nenStrengtheningKind: "optional-adverbialized-nnc-strengthener",
            nenLexicalMeaning: "in-vain-uselessly",
            maNenWritingPolicy: "canvas-writes-ma-nen-separately-traditional-spelling-is-solid",
            traditionalSolidSpelling: "manen",
            strengthenedActionsIncludeNen: true,
            hostileDontVncStillBuilt: "authorized",
            hostileDontStatus: "blocked",
            hostileDontReading: "dont-negative-command",
            hostileDontReadingAuthorized: false,
            hostileDontReason: "lesson-10-positive-admonition-translation-reading-not-authorized",
            hostileMayNotVncStillBuilt: "authorized",
            hostileMayNotStatus: "blocked",
            hostileMayNotReading: "may-not-wish",
            hostileMayNotReadingAuthorized: false,
            hostileMayNotReason: "lesson-10-positive-admonition-translation-reading-not-authorized",
        }
    );

    s.eq(
        "Classical Lesson 10.4 transforms negative assertions into negative admonitions with ah and obligatory ma nen, not Lesson 9 ca",
        (() => {
            const negative = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
                negative: true,
                admonitiveTranslationReading: "reject-caution",
            });
            const hostileCa = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
                negative: true,
                requestedNegativePrefix: "ca#",
                admonitiveTranslationReading: "reject-caution",
            });
            const hostileWarningReading = ctx.buildClassicalNahuatlVerbstemClassFrame("(temō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
                negative: true,
                admonitiveTranslationReading: "warning-sense",
            });
            const fillers = negative.selectedOutputLogicFrame.outputFillers;
            const hostileCaFillers = hostileCa.selectedOutputLogicFrame.outputFillers;
            const hostileWarningFillers = hostileWarningReading.selectedOutputLogicFrame.outputFillers;
            return {
                formula: negative.formulaRealization,
                status: fillers.sentenceSurfaceStatus,
                particles: fillers.sentenceParticles,
                prefixalStack: fillers.sentencePrefixalStack,
                negativePrefix: fillers.sentenceNegativePrefix,
                negativePrefixSource: fillers.sentenceNegativePrefixSource,
                negativeTransformation: fillers.sentenceLesson10NegativeTransformation,
                conversionSource: fillers.sentenceAdmonitiveNegativeAssertionConversionSource,
                conversionTarget: fillers.sentenceAdmonitiveNegativeAssertionConversionTarget,
                prefixAttachment: fillers.sentenceAdmonitiveNegativePrefixAttachment,
                collocation: fillers.sentenceAdmonitiveNegativeIntroductoryCollocation,
                collocationRequired: fillers.sentenceAdmonitiveNegativeIntroductoryCollocationRequired,
                force: fillers.sentenceAdmonitiveForce,
                forceDefinition: fillers.sentenceAdmonitiveNegativeForceDefinition,
                vetativeTermAuthority: fillers.sentenceAdmonitivePositiveVetativeTermAuthority,
                requestedReading: fillers.sentenceAdmonitiveRequestedTranslationReading,
                requestedReadingAuthorized: fillers.sentenceAdmonitiveRequestedTranslationReadingAuthorized,
                caBlocked: fillers.sentenceAdmonitiveCaNegativeFromLesson9Blocked,
                actionsInclude104: [
                    "transform-negative-present-indicative-assertion-to-negative-admonition",
                    "affix-ah-negative-prefix-to-admonitive-vnc",
                    "record-negative-admonition-cancels-warning-and-rejects-caution",
                    "reject-positive-vetative-term-as-authority-label",
                    "keep-ah-negative-after-ma-in-admonition",
                    "block-ca-negative-for-admonition",
                ].every((action) => fillers.sentenceActions.includes(action)),
                hostileCaVncStillBuilt: hostileCa.proofFrame.authorizationStatus,
                hostileCaStatus: hostileCaFillers.sentenceSurfaceStatus,
                hostileCaRequested: hostileCaFillers.sentenceAdmonitiveCaNegativeRequested,
                hostileCaReason: hostileCaFillers.sentenceBlockReason,
                hostileWarningVncStillBuilt: hostileWarningReading.proofFrame.authorizationStatus,
                hostileWarningStatus: hostileWarningFillers.sentenceSurfaceStatus,
                hostileWarningReading: hostileWarningFillers.sentenceAdmonitiveRequestedTranslationReading,
                hostileWarningAuthorized: hostileWarningFillers.sentenceAdmonitiveRequestedTranslationReadingAuthorized,
                hostileWarningReason: hostileWarningFillers.sentenceBlockReason,
            };
        })(),
        {
            formula: "#ni-0(temo)h+⎕-0#",
            status: "authorized",
            particles: ["mā", "nēn", "ah#"],
            prefixalStack: ["ah#"],
            negativePrefix: "ah#",
            negativePrefixSource: "Lesson 10 negative admonition sentence layer",
            negativeTransformation: "negative-admonition-keeps-ah-and-requires-ma-nen",
            conversionSource: "negative-present-indicative-assertion",
            conversionTarget: "negative-admonition-cancellation-sentence",
            prefixAttachment: "ah#-affixed-to-admonitive-vnc",
            collocation: "mā nēn",
            collocationRequired: true,
            force: "cancel-warning-recommend-reject-caution",
            forceDefinition: "cancellation-of-warning-recommendation-to-reject-caution",
            vetativeTermAuthority: "not-authority-unfortunate-traditional-term",
            requestedReading: "reject-caution-sense",
            requestedReadingAuthorized: true,
            caBlocked: true,
            actionsInclude104: true,
            hostileCaVncStillBuilt: "authorized",
            hostileCaStatus: "blocked",
            hostileCaRequested: true,
            hostileCaReason: "lesson-10-admonition-keeps-ah-not-ca",
            hostileWarningVncStillBuilt: "authorized",
            hostileWarningStatus: "blocked",
            hostileWarningReading: "warning-sense",
            hostileWarningAuthorized: false,
            hostileWarningReason: "lesson-10-negative-admonition-requires-reject-caution-reading",
        }
    );

    s.eq(
        "Classical Lesson 10.5 records VNC contrasts and blocks contrast readings or antecessive order as admonitive authority",
        (() => {
            const classAThird = ctx.buildClassicalNahuatlVerbstemClassFrame("(tzahtzi)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "A",
                introductoryParticle: "mā",
            });
            const plural = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "1pl",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "mā",
            });
            const hostilePreteritReading = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "mā",
                requestedContrastReading: "preterit-indicative",
            });
            const hostileAntecessive = ctx.buildClassicalNahuatlVerbstemClassFrame("(huetz)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "admonitive",
                tense: "nonpast",
                verbClass: "B",
                introductoryParticle: "mā",
                sentenceAntecessive: true,
            });
            const classAFillers = classAThird.selectedOutputLogicFrame.outputFillers;
            const pluralFillers = plural.selectedOutputLogicFrame.outputFillers;
            const hostilePreteritFillers = hostilePreteritReading.selectedOutputLogicFrame.outputFillers;
            const hostileAntecessiveFillers = hostileAntecessive.selectedOutputLogicFrame.outputFillers;
            return {
                classAStatus: classAFillers.sentenceSurfaceStatus,
                classAContrastSet: classAFillers.sentenceAdmonitiveContrastSet,
                classAProfile: classAFillers.sentenceAdmonitiveContrastClassProfile,
                classAOptativeContrast: classAFillers.sentenceAdmonitiveOptativeContrast,
                classAPresentContrast: classAFillers.sentenceAdmonitivePresentIndicativeContrast,
                classAMaDistinguishes: classAFillers.sentenceAdmonitiveMaDistinguishesSentenceLayer,
                classAGlottalWarning: classAFillers.sentenceAdmonitiveGlottalStopAmbiguityWarning,
                classAGlottalScope: classAFillers.sentenceAdmonitiveGlottalStopAmbiguityScope,
                classAOppositeMeaningRisk: classAFillers.sentenceAdmonitiveOppositeMeaningRiskIfGlottalUnrepresented,
                classAHRoleContrast: classAFillers.sentenceAdmonitiveHMorphRoleContrast,
                classAActionsInclude105: [
                    "record-admonitive-optative-present-preterit-contrast-set",
                    "record-second-person-optative-x-xi-distinction",
                    "record-ma-as-admonitive-sentence-layer-distinguisher",
                    "record-glottal-stop-omission-ambiguity-warning",
                    "record-h-tense-morph-vs-num1-filler-role-contrast",
                ].every((action) => classAFillers.sentenceActions.includes(action)),
                pluralFormula: plural.formulaRealization,
                pluralDistinctive: pluralFillers.sentenceAdmonitivePluralSubjectsAlwaysDistinctive,
                pluralActionsIncludeDistinctive: pluralFillers.sentenceActions.includes("record-plural-subjects-always-distinctive"),
                secondPersonOptativeDistinction: hostilePreteritFillers.sentenceAdmonitiveSecondPersonOptativeDistinction,
                hostilePreteritVncStillBuilt: hostilePreteritReading.proofFrame.authorizationStatus,
                hostilePreteritStatus: hostilePreteritFillers.sentenceSurfaceStatus,
                hostilePreteritReading: hostilePreteritFillers.sentenceAdmonitiveRequestedContrastReading,
                hostilePreteritAuthorized: hostilePreteritFillers.sentenceAdmonitiveRequestedContrastReadingAuthorized,
                hostilePreteritReason: hostilePreteritFillers.sentenceBlockReason,
                hostileAntecessiveVncStillBuilt: hostileAntecessive.proofFrame.authorizationStatus,
                hostileAntecessiveStatus: hostileAntecessiveFillers.sentenceSurfaceStatus,
                hostileAntecessiveRequested: hostileAntecessiveFillers.sentenceAdmonitiveAntecessivePrefixRequested,
                hostileAntecessiveAllowed: hostileAntecessiveFillers.sentenceAdmonitiveAntecessivePrefixAllowed,
                hostileAntecessiveContrast: hostileAntecessiveFillers.sentenceAdmonitiveAntecessiveContrast,
                hostileAntecessiveReason: hostileAntecessiveFillers.sentenceBlockReason,
            };
        })(),
        {
            classAStatus: "authorized",
            classAContrastSet: ["admonitive", "nonpast-optative", "present-indicative", "preterit-indicative"],
            classAProfile: "class-a-admonitive-optative-present-preterit-contrast",
            classAOptativeContrast: "admonitive-and-nonpast-optative-distinctive-all-forms",
            classAPresentContrast: "first-third-plural-present-can-superficially-match-second-third-singular-admonitive",
            classAMaDistinguishes: true,
            classAGlottalWarning: true,
            classAGlottalScope: "first-and-third-person-singular-if-glottal-stop-not-represented",
            classAOppositeMeaningRisk: true,
            classAHRoleContrast: "h-is-tense-morph-in-admonitive-but-num1-filler-in-present-indicative",
            classAActionsInclude105: true,
            pluralFormula: "#ti-0(huetz)0+t-in#",
            pluralDistinctive: true,
            pluralActionsIncludeDistinctive: true,
            secondPersonOptativeDistinction: "x-or-xi-pers1-morph-distinguishes-second-person-optative-from-admonitive",
            hostilePreteritVncStillBuilt: "authorized",
            hostilePreteritStatus: "blocked",
            hostilePreteritReading: "preterit-indicative",
            hostilePreteritAuthorized: false,
            hostilePreteritReason: "lesson-10-contrast-reading-cannot-authorize-admonitive-sentence",
            hostileAntecessiveVncStillBuilt: "authorized",
            hostileAntecessiveStatus: "blocked",
            hostileAntecessiveRequested: true,
            hostileAntecessiveAllowed: false,
            hostileAntecessiveContrast: "antecessive-order-prefix-cannot-occur-with-admonitive-because-admonitive-is-nonpast",
            hostileAntecessiveReason: "lesson-10-admonitive-nonpast-blocks-antecessive-order-prefix",
        }
    );

    return s;
}

module.exports = { run };
