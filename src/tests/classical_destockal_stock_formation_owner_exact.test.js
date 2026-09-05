"use strict";

const { createSuite } = require("./runner");

const OWNER_ID = "classical-destockal-stock-formation-system";
const CONSTRAINT_PATH = "constraints.destockalStockFormationSystem";
const TYPE_IDS = Object.freeze([
    "long-vowel-ni-or-hui",
    "long-vowel-hua",
    "short-vowel-hui",
]);
const STOCK_FORMATION = Object.freeze({
    ordinal: 1,
    inputRank: "root",
    operation: "suffix-derivation",
    formativeRole: "stock-formative",
    outputRank: "stock",
});
const STEM_FORMATION = Object.freeze({
    ordinal: 2,
    inputRank: "stock",
    operation: "suffix-derivation",
    formativeRoles: Object.freeze(["stem-formative", "theme"]),
    outputRank: "intransitive-verbstem",
});
const CAUSATIVE_PAIRING = Object.freeze({
    sourceMember: "intransitive",
    targetMember: "transitive",
    targetFormation: "causative",
    causativeMorpheme: "a",
    derivationType: "causative",
    derivationSubtype: "type-one",
    ruleTagId: "cn-l24-type-one-causative-a",
    participantRule:
        "The source subject becomes the causative object and a new outer subject is imported.",
    verifiedTypeIds: TYPE_IDS,
});
const TAXONOMY_SUMMARY = Object.freeze({
    typeCount: 3,
    discriminator: "destockal-stem-formative-or-theme",
    typeIds: TYPE_IDS,
});
const THEME_DEFINITION = Object.freeze({
    role: "stem-formative",
    terminology: Object.freeze({
        preferredTerm: "theme",
        exactTerm: "thematic-morpheme",
    }),
    function: "attach-to-a-morphological-unit-to-create-a-stem",
    inputRank: "morphological-unit",
    possibleOutputRanks: Object.freeze(["verbstem", "nounstem"]),
});
const TYPE_INVENTORY = Object.freeze([Object.freeze({
    typeId: "long-vowel-ni-or-hui",
    stockFormativeQuantity: "long",
    stemFormatives: Object.freeze(["ni", "hui"]),
}), Object.freeze({
    typeId: "long-vowel-hua",
    stockFormativeQuantity: "long",
    stemFormatives: Object.freeze(["hua"]),
}), Object.freeze({
    typeId: "short-vowel-hui",
    stockFormativeQuantity: "short",
    stemFormatives: Object.freeze(["hui"]),
})]);
const ATOM_RECEIPTS = Object.freeze([Object.freeze({
    atomId: "ACI-P200-L012-E9126617CD",
    selection: "claim-p2305",
    facet: "aci-p200-l012-e9126617cd-stock-formation",
    path: `${CONSTRAINT_PATH}.stockFormation`,
    value: STOCK_FORMATION,
}), Object.freeze({
    atomId: "ACI-P200-L012-80FC88961C",
    selection: "claim-p2304",
    facet: "aci-p200-l012-80fc88961c-stem-formation",
    path: `${CONSTRAINT_PATH}.stemFormation`,
    value: STEM_FORMATION,
}), Object.freeze({
    atomId: "ACI-P200-L016-2CD7853895",
    selection: "claim-p2307",
    facet: "aci-p200-l016-2cd7853895-causative-pairing",
    path: `${CONSTRAINT_PATH}.causativePairing`,
    value: CAUSATIVE_PAIRING,
}), Object.freeze({
    atomId: "ACI-P200-L017-AFD5F16C0E",
    selection: "claim-p2308",
    facet: "aci-p200-l017-afd5f16c0e-three-type-taxonomy",
    path: `${CONSTRAINT_PATH}.taxonomy.summary`,
    value: TAXONOMY_SUMMARY,
}), Object.freeze({
    atomId: "ACI-P201-L002-9DA3F45CBA",
    selection: "claim-p2309",
    facet: "aci-p201-l002-9da3f45cba-theme-definition",
    path: `${CONSTRAINT_PATH}.themeDefinition`,
    value: THEME_DEFINITION,
}), Object.freeze({
    atomId: "ACI-P201-L003-B32E70CF51",
    selection: "claim-p2310",
    facet: "aci-p201-l003-b32e70cf51-ya-theme-role",
    path: `${CONSTRAINT_PATH}.yaTheme.role`,
    value: "stem-formative",
}), Object.freeze({
    atomId: "ACI-P201-L003-B32E70CF51-03",
    selection: "claim-p2310",
    facet: "aci-p201-l003-b32e70cf51-03-ya-root-host-rank",
    path: `${CONSTRAINT_PATH}.yaTheme.normalHostRanks.0`,
    value: "root",
}), Object.freeze({
    atomId: "ACI-P201-L003-B32E70CF51-05",
    selection: "claim-p2310",
    facet: "aci-p201-l003-b32e70cf51-05-ya-verbstem-host-rank",
    path: `${CONSTRAINT_PATH}.yaTheme.normalHostRanks.1`,
    value: "verbstem",
})]);

function run(ctx = {}) {
    const s = createSuite("classical_destockal_stock_formation_owner_exact");
    const issueReceipt = ({ selection, facet }) => {
        const source = ctx.buildClassicalDestockalStockFormationSystemSource({
            analysisDomain: OWNER_ID,
            selection,
            requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx.evaluateClassicalDestockalStockFormationSystem(
            source
        );
        return {
            source,
            result,
            evidence:
                ctx.getClassicalDestockalStockFormationSystemExecutionEvidence(
                    result
                ),
        };
    };
    const receipts = ATOM_RECEIPTS.map(issueReceipt);
    const observation = receipt => ({
        status: receipt.result.authorizationStatus,
        canonicalPath: receipt.result.payload.effectiveCanonicalPath,
        sourceCanonicalPath: receipt.result.payload.sourceCanonicalPath,
        facetValue: receipt.result.payload.facetValue,
        observationKind: receipt.result.payload.proofObservationKind,
        observationStatus: receipt.result.payload.proofObservationStatus,
        broadProxyRetired:
            receipt.result.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalDestockalStockFormationSystemResult(
                receipt.result
            ),
        evidenceCanonical:
            ctx.isClassicalDestockalStockFormationSystemExecutionEvidence(
                receipt.evidence,
                receipt.result
            ),
    });

    ATOM_RECEIPTS.forEach((atom, index) => {
        s.eq(`${atom.atomId} has one direct owner-issued observation`,
            observation(receipts[index]), {
                status: "authorized",
                canonicalPath: atom.path,
                sourceCanonicalPath: atom.path,
                facetValue: atom.value,
                observationKind: "direct-canonical-result-observation",
                observationStatus: "direct",
                broadProxyRetired: false,
                resultCanonical: true,
                evidenceCanonical: true,
            });
    });

    const constraint = receipts[0].result.payload.definition.constraints
        .destockalStockFormationSystem;
    s.eq("the signed destockal rank system is frozen and nonterminal", {
        status: constraint.authorizationStatus,
        frozen: Object.isFrozen(constraint),
        definitionFrozen: Object.isFrozen(constraint.definition),
        topologyFrozen: Object.isFrozen(constraint.rankTopology),
        privilegesFrozen: Object.isFrozen(constraint.rankPrivileges),
        stockFormationFrozen: Object.isFrozen(constraint.stockFormation),
        stemFormationFrozen: Object.isFrozen(constraint.stemFormation),
        definition: constraint.definition,
        topology: constraint.rankTopology,
        privileges: constraint.rankPrivileges,
        orderedSteps: constraint.orderedSteps,
        typedRankRestrictionOnly: constraint.typedRankRestrictionOnly,
        shapeAdmissionGate: constraint.surfaceShapeIsNotAnAdmissionGate,
        callerAuthority: constraint.callerSuppliedGrammarAuthority,
        formulaAuthority: constraint.formulaStringAuthority,
        surfaceAuthority: constraint.surfaceStringAuthority,
        exampleAuthority: constraint.storedExampleAuthority,
    }, {
        status: "authorized",
        frozen: true,
        definitionFrozen: true,
        topologyFrozen: true,
        privilegesFrozen: true,
        stockFormationFrozen: true,
        stemFormationFrozen: true,
        definition: {
            term: "destockal-verbstem",
            processKind: "stock-mediated-two-step-derivation",
            processStepCount: 2,
            intermediateRank: "stock",
        },
        topology: {
            order: ["root", "stock", "stem"],
            finalRankSubtype: "intransitive-verbstem",
        },
        privileges: {
            rootToVerbstem: "lexically-licensed",
            stockToVerbstem: "forbidden",
            stockRequiresStemFormative: true,
        },
        orderedSteps: ["stock-formation", "stem-formation"],
        typedRankRestrictionOnly: true,
        shapeAdmissionGate: true,
        callerAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false,
        exampleAuthority: false,
    });

    s.eq("the owner derives the ordered operations, pairing, taxonomy, and theme", {
        stockFormation: constraint.stockFormation,
        stemFormation: constraint.stemFormation,
        causativePairing: constraint.causativePairing,
        taxonomySummary: constraint.taxonomy.summary,
        taxonomyTypes: constraint.taxonomy.types,
        themeDefinition: constraint.themeDefinition,
        yaTheme: constraint.yaTheme,
        taxonomyFrozen: Object.isFrozen(constraint.taxonomy),
        taxonomyTypesFrozen: Object.isFrozen(constraint.taxonomy.types),
        themeFrozen: Object.isFrozen(constraint.themeDefinition),
        yaThemeFrozen: Object.isFrozen(constraint.yaTheme),
    }, {
        stockFormation: STOCK_FORMATION,
        stemFormation: STEM_FORMATION,
        causativePairing: CAUSATIVE_PAIRING,
        taxonomySummary: TAXONOMY_SUMMARY,
        taxonomyTypes: TYPE_INVENTORY,
        themeDefinition: THEME_DEFINITION,
        yaTheme: {
            formative: "ya",
            role: "stem-formative",
            normalHostRanks: ["root", "verbstem"],
        },
        taxonomyFrozen: true,
        taxonomyTypesFrozen: true,
        themeFrozen: true,
        yaThemeFrozen: true,
    });

    const buildSource = (stem, verbClass = "B") =>
        ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass,
            perfectiveClass: verbClass,
            valence: "intransitive",
            requestedSourceValence: "intransitive",
            transitivity: "intransitive",
            objectKind: "none",
            objectPerson: "",
        });
    const inspectDestockal = specification => {
        const source = buildSource(
            specification.stem,
            specification.verbClass
        );
        const analysisFrame =
            ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
        const analysis = analysisFrame.analyses.find(candidate =>
            candidate.destockalStructureFrame?.typeId
                === specification.typeId);
        const structure = analysis?.destockalStructureFrame || {};
        const theme = analysis?.themeFrame || {};
        const inventory =
            ctx.getClassicalNahuatlVncDerivationOptionInventory(
                source,
                { derivationType: "causative" }
            );
        const typeOneOptions = inventory.options.filter(option =>
            option.derivationSubtype === "type-one");
        return {
            stem: specification.stem,
            sourceStatus: source.authorizationStatus,
            sourceCanonical:
                ctx.isClassicalNahuatlVerbstemClassFrame(source),
            analysisStatus: analysisFrame.authorizationStatus,
            analysisCanonical:
                ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
                    analysisFrame
                ),
            analysisFrozen: Object.isFrozen(analysisFrame),
            structureStatus: structure.authorizationStatus || "",
            structureFrozen: Object.isFrozen(structure),
            typeId: structure.typeId || "",
            segments: analysis?.segments || [],
            stockStep: structure.steps?.stockFormation || null,
            stemStep: structure.steps?.stemFormation || null,
            theme: {
                formative: theme.formative || "",
                role: theme.role || "",
                host: theme.host || "",
                hostRank: theme.hostRank || "",
                outputRank: theme.outputRank || "",
            },
            inventoryStatus: inventory.authorizationStatus,
            inventoryCanonical:
                ctx.isClassicalNahuatlVncDerivationOptionInventory(
                    inventory
                ),
            targets: typeOneOptions.map(option => ({
                targetStem: option.targetStem,
                targetClass: option.targetClass,
                licensedSourceValence: option.licensedSourceValence,
                ruleTagId: option.ruleTagId,
                participantRule: option.participantRule,
                callerTargetAllowed: option.callerSuppliedTargetAllowed,
            })),
        };
    };
    const representatives = [{
        stem: "cual-ā-ni",
        verbClass: "B",
        typeId: "long-vowel-ni-or-hui",
        segments: ["cual", "ā", "ni"],
        stock: ["cual", "ā", "cual-ā"],
        stemStep: ["cual-ā", "ni", "cual-ā-ni"],
        targets: [["cual-ā-n-a", "B"], ["cual-ā-ni-ā", "C"]],
    }, {
        stem: "pīn-ā-hua",
        verbClass: "A",
        typeId: "long-vowel-hua",
        segments: ["pīn", "ā", "hua"],
        stock: ["pīn", "ā", "pīn-ā"],
        stemStep: ["pīn-ā", "hua", "pīn-ā-hua"],
        targets: [["pīn-ā-hu-a", "B"]],
    }, {
        stem: "pol-i-hui",
        verbClass: "B",
        typeId: "short-vowel-hui",
        segments: ["pol", "i", "hui"],
        stock: ["pol", "i", "pol-i"],
        stemStep: ["pol-i", "hui", "pol-i-hui"],
        targets: [["pol-o-ā", "C"]],
    }];
    const representativeExpected = representatives.map(specification => ({
        stem: specification.stem,
        sourceStatus: "authorized",
        sourceCanonical: true,
        analysisStatus: "authorized",
        analysisCanonical: true,
        analysisFrozen: true,
        structureStatus: "authorized",
        structureFrozen: true,
        typeId: specification.typeId,
        segments: specification.segments,
        stockStep: {
            ordinal: 1,
            input: specification.stock[0],
            inputRank: "root",
            operation: "suffix-derivation",
            formative: specification.stock[1],
            formativeRole: "stock-formative",
            output: specification.stock[2],
            outputRank: "stock",
        },
        stemStep: {
            ordinal: 2,
            input: specification.stemStep[0],
            inputRank: "stock",
            operation: "suffix-derivation",
            formative: specification.stemStep[1],
            formativeRoles: ["stem-formative", "theme"],
            output: specification.stemStep[2],
            outputRank: "intransitive-verbstem",
        },
        theme: {
            formative: specification.stemStep[1],
            role: "stem-formative",
            host: specification.stemStep[0],
            hostRank: "stock",
            outputRank: "intransitive-verbstem",
        },
        inventoryStatus: "authorized",
        inventoryCanonical: true,
        targets: specification.targets.map(([targetStem, targetClass]) => ({
            targetStem,
            targetClass,
            licensedSourceValence: "intransitive",
            ruleTagId: "cn-l24-type-one-causative-a",
            participantRule:
                "The source subject becomes the causative object and a new outer subject is imported.",
            callerTargetAllowed: false,
        })),
    }));
    s.eq("three signed destockal types generate type-one transitive partners",
        representatives.map(inspectDestockal), representativeExpected);

    const inspectYa = stem => {
        const source = buildSource(stem);
        const frame =
            ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
        const analysis = frame.analyses.find(candidate =>
            candidate.category === "root-plus-ya");
        return {
            stem,
            sourceStatus: source.authorizationStatus,
            canonical:
                ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame),
            segments: analysis?.segments || [],
            root: analysis?.root || "",
            stockFormative: analysis?.stockFormative || "",
            stemFormative: analysis?.stemFormative || "",
            theme: analysis?.themeFrame || null,
            destockalFrame: analysis?.destockalStructureFrame || null,
        };
    };
    const themeFor = ({ host, hostRank }) => ({
        kind: "classical-nahuatl-theme-formation-frame",
        version: 1,
        authorizationStatus: "authorized",
        formative: "ya",
        role: "stem-formative",
        terminology: {
            preferredTerm: "theme",
            exactTerm: "thematic-morpheme",
        },
        function: "attach-to-a-morphological-unit-to-create-a-stem",
        inputRank: "morphological-unit",
        possibleOutputRanks: ["verbstem", "nounstem"],
        host,
        hostRank,
        outputRank: "verbstem",
        normalHostRanks: ["root", "verbstem"],
        canvasExampleAuthority: false,
        callerSuppliedGrammarAuthority: false,
    });
    s.eq("ya themes distinguish root hosts from the exact te-ti verbstem host", [
        inspectYa("coco-ya"),
        inspectYa("xoco-ya"),
        inspectYa("te-ti-ya"),
    ], [{
        stem: "coco-ya",
        sourceStatus: "authorized",
        canonical: true,
        segments: ["coco", "ya"],
        root: "coco",
        stockFormative: "",
        stemFormative: "ya",
        theme: themeFor({ host: "coco", hostRank: "root" }),
        destockalFrame: null,
    }, {
        stem: "xoco-ya",
        sourceStatus: "authorized",
        canonical: true,
        segments: ["xoco", "ya"],
        root: "xoco",
        stockFormative: "",
        stemFormative: "ya",
        theme: themeFor({ host: "xoco", hostRank: "root" }),
        destockalFrame: null,
    }, {
        stem: "te-ti-ya",
        sourceStatus: "authorized",
        canonical: true,
        segments: ["te", "ti", "ya"],
        root: "te-ti",
        stockFormative: "",
        stemFormative: "ya",
        theme: themeFor({ host: "te-ti", hostRank: "verbstem" }),
        destockalFrame: null,
    }]);

    const constitutionFor = stem =>
        ctx.buildClassicalNahuatlVncSourceConstitutionProjection({
            sourceStem: stem,
            sourceValence: "intransitive",
            verbClass: "B",
            derivationType: "direct",
        }, ctx);
    const summarizeConstitution = projection => projection && ({
        role: projection.frameRole,
        status: projection.authorizationStatus,
        stem: projection.sourceStem,
        parts: projection.parts.map(part => [part.segment, part.role]),
        grammarAuthority: projection.grammarAuthority,
        frozen: Object.isFrozen(projection),
        partsFrozen: Object.isFrozen(projection.parts),
    });
    s.eq("the public Source constitution is an exact read-only projection", {
        fullDestockal: summarizeConstitution(
            constitutionFor("xep-ā-ni")
        ),
        yaVerbstemHost: summarizeConstitution(
            constitutionFor("te-ti-ya")
        ),
        bareStock: constitutionFor("xep-ā"),
    }, {
        fullDestockal: {
            role: "classical-nahuatl-vnc-source-constitution-projection",
            status: "authorized",
            stem: "xep-ā-ni",
            parts: [
                ["xep", "root"],
                ["ā", "stock formative"],
                ["ni", "stem formative"],
            ],
            grammarAuthority: false,
            frozen: true,
            partsFrozen: true,
        },
        yaVerbstemHost: {
            role: "classical-nahuatl-vnc-source-constitution-projection",
            status: "authorized",
            stem: "te-ti-ya",
            parts: [
                ["te-ti", "verbstem base"],
                ["ya", "ya stem formative"],
            ],
            grammarAuthority: false,
            frozen: true,
            partsFrozen: true,
        },
        bareStock: null,
    });

    const openDestockalSource = buildSource("xep-ā-ni");
    const openDestockalAnalysis =
        ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
            openDestockalSource
        );
    const openDestockalStructure = openDestockalAnalysis.analyses.find(
        analysis => analysis.destockalStructureFrame
    )?.destockalStructureFrame;
    const openDestockalInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            openDestockalSource,
            { derivationType: "causative" }
        );
    const openDestockalOptions = openDestockalInventory.options.filter(
        option => option.derivationSubtype === "type-one"
    );
    s.eq("an unlisted full destockal stem stays productively open", {
        sourceStatus: openDestockalSource.authorizationStatus,
        citationForm: openDestockalSource.citationForm,
        sourceCanonical:
            ctx.isClassicalNahuatlVerbstemClassFrame(openDestockalSource),
        analysisStatus: openDestockalAnalysis.authorizationStatus,
        analysisCanonical:
            ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
                openDestockalAnalysis
            ),
        typeId: openDestockalStructure?.typeId || "",
        stockOutput:
            openDestockalStructure?.steps?.stockFormation?.output || "",
        verbstemOutput:
            openDestockalStructure?.steps?.stemFormation?.output || "",
        inventoryStatus: openDestockalInventory.authorizationStatus,
        inventoryCanonical:
            ctx.isClassicalNahuatlVncDerivationOptionInventory(
                openDestockalInventory
            ),
        targets: openDestockalOptions.map(option => ({
            targetStem: option.targetStem,
            targetClass: option.targetClass,
            exactWitness: option.exactWitness === true,
            formationRuleTier: option.formationRuleTier,
            callerTargetAllowed: option.callerSuppliedTargetAllowed,
        })),
    }, {
        sourceStatus: "authorized",
        citationForm: "(xep-ā-ni)",
        sourceCanonical: true,
        analysisStatus: "authorized",
        analysisCanonical: true,
        typeId: "long-vowel-ni-or-hui",
        stockOutput: "xep-ā",
        verbstemOutput: "xep-ā-ni",
        inventoryStatus: "authorized",
        inventoryCanonical: true,
        targets: [{
            targetStem: "xep-ā-n-a",
            targetClass: "B",
            exactWitness: false,
            formationRuleTier: "productive-final-shape",
            callerTargetAllowed: false,
        }, {
            targetStem: "xep-ā-ni-ā",
            targetClass: "C",
            exactWitness: false,
            formationRuleTier: "productive-final-shape",
            callerTargetAllowed: false,
        }],
    });

    const bareStockSource = buildSource("xep-ā");
    const bareStockAnalysis =
        ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
            bareStockSource
        );
    const bareStockInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            bareStockSource,
            { derivationType: "causative" }
        );
    s.eq("bare xep-ā remains open without becoming a destockal constitution", {
        sourceStatus: bareStockSource.authorizationStatus,
        citationForm: bareStockSource.citationForm,
        sourceCanonical:
            ctx.isClassicalNahuatlVerbstemClassFrame(bareStockSource),
        analysisStatus: bareStockAnalysis.authorizationStatus,
        analysisCanonical:
            ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
                bareStockAnalysis
            ),
        analysisCount: bareStockAnalysis.analyses.length,
        destockalFrameCount: bareStockAnalysis.analyses.filter(
            analysis => analysis.destockalStructureFrame
        ).length,
        destockalThemeCount: bareStockAnalysis.analyses.filter(
            analysis => analysis.themeFrame?.hostRank === "stock"
        ).length,
        inventoryStatus: bareStockInventory.authorizationStatus,
        inventoryCanonical:
            ctx.isClassicalNahuatlVncDerivationOptionInventory(
                bareStockInventory
            ),
        destockalTypeOneTargets: bareStockInventory.options.filter(
            option => option.derivationSubtype === "type-one"
        ).map(option => option.targetStem),
    }, {
        sourceStatus: "authorized",
        citationForm: "(xep-ā)",
        sourceCanonical: true,
        analysisStatus: "authorized",
        analysisCanonical: true,
        analysisCount: 0,
        destockalFrameCount: 0,
        destockalThemeCount: 0,
        inventoryStatus: "authorized",
        inventoryCanonical: true,
        destockalTypeOneTargets: [],
    });

    const directApplication = stem =>
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: stem,
            verbClass: "B",
            sourceValence: "intransitive",
            sourceSubject: "3sg",
            subject: "3sg",
            requestedDerivation: "direct",
            requestedVoice: "active",
            outputScope: "single",
        });
    const summarizeDirect = application => ({
        status: application.authorizationStatus,
        reason: application.blockReason,
        resultStatus: application.resultFrame.authorizationStatus,
        resultCanonical:
            ctx.isClassicalNahuatlVncApplicationResultFrame(
                application.resultFrame
            ),
        formula: application.resultFrame.formulaRealization,
        surface: application.resultFrame.surfaceRealization,
    });
    s.eq("full destockal and bare stock-shaped input both generate directly", {
        fullDestockal: summarizeDirect(directApplication("xep-ā-ni")),
        bareStock: summarizeDirect(directApplication("xep-ā")),
    }, {
        fullDestockal: {
            status: "authorized",
            reason: "",
            resultStatus: "authorized",
            resultCanonical: true,
            formula: "#0-0(xep-ā-ni)0+0-0#",
            surface: "xepāni",
        },
        bareStock: {
            status: "authorized",
            reason: "",
            resultStatus: "authorized",
            resultCanonical: true,
            formula: "#0-0(xep-ā)0+0-0#",
            surface: "xepā",
        },
    });

    const cloned = value => JSON.parse(JSON.stringify(value));
    const forgedResult = {
        ...cloned(receipts[0].result),
        authorizationStatus: "authorized",
    };
    const forgedEvidence = {
        ...cloned(receipts[0].evidence),
        authorizationStatus: "authorized",
    };
    s.eq("copies and forged result-shaped data cannot mint authority", {
        copiedSourceStatus:
            ctx.evaluateClassicalDestockalStockFormationSystem(
                cloned(receipts[0].source)
            ).authorizationStatus,
        copiedResultCanonical:
            ctx.isClassicalDestockalStockFormationSystemResult(
                cloned(receipts[0].result)
            ),
        forgedResultCanonical:
            ctx.isClassicalDestockalStockFormationSystemResult(forgedResult),
        evidenceFromCopiedResult:
            ctx.getClassicalDestockalStockFormationSystemExecutionEvidence(
                cloned(receipts[0].result)
            ),
        copiedEvidenceCanonical:
            ctx.isClassicalDestockalStockFormationSystemExecutionEvidence(
                cloned(receipts[0].evidence),
                receipts[0].result
            ),
        forgedEvidenceCanonical:
            ctx.isClassicalDestockalStockFormationSystemExecutionEvidence(
                forgedEvidence,
                receipts[0].result
            ),
        authenticEvidenceBoundToCopiedResult:
            ctx.isClassicalDestockalStockFormationSystemExecutionEvidence(
                receipts[0].evidence,
                cloned(receipts[0].result)
            ),
    }, {
        copiedSourceStatus: "blocked",
        copiedResultCanonical: false,
        forgedResultCanonical: false,
        evidenceFromCopiedResult: null,
        copiedEvidenceCanonical: false,
        forgedEvidenceCanonical: false,
        authenticEvidenceBoundToCopiedResult: false,
    });

    const ownerCoordinates = (
        ctx.listRoutineSemanticEffectiveProofCoordinates?.() || []
    ).filter(record => record.ownerId === OWNER_ID);
    const directAtomIds = ownerCoordinates
        .map(record => String(record.assertionId || "")
            .replace(`${OWNER_ID}:`, "").toLowerCase())
        .filter(assertionId => assertionId.startsWith("aci-"));
    const forbiddenAtomIds = [
        "aci-p200-l012-0d81c1b3c6",
        "aci-p200-l012-50877be1f3",
        "aci-p200-l012-cd9c2b692e",
        "aci-p200-l013-5d05dc4426",
        "aci-p200-l014-37e8eecda6",
        "aci-p200-l015-1865650eed",
        "aci-p200-l016-2cd7853895-02",
        "aci-p201-l003-b32e70cf51-04",
        "aci-p201-l003-b32e70cf51-06",
        "aci-p201-l003-b32e70cf51-02",
        "aci-p201-l003-b32e70cf51-07",
    ];
    s.eq("only the eight clean grammar atoms have direct coordinates", {
        directAtomIds: [...directAtomIds].sort(),
        forbiddenMatches: forbiddenAtomIds.filter(atomId =>
            directAtomIds.some(assertionId => assertionId === atomId
                || assertionId.startsWith(`${atomId}-`))),
        p2306CoordinateCount: ownerCoordinates.filter(record =>
            String(record.coordinateKey || "").startsWith("claim-p2306::")
        ).length,
    }, {
        directAtomIds: ATOM_RECEIPTS.map(atom => atom.facet).sort(),
        forbiddenMatches: [],
        p2306CoordinateCount: 0,
    });

    return s;
}

module.exports = { run };
