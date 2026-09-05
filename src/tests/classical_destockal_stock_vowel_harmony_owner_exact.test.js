"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const OWNER_ID = "classical-destockal-stock-vowel-harmony";
const CONSTRAINT_PATH = "constraints.destockalStockVowelHarmonySystem";
const OWNER_SPEC_PATH = path.resolve(
    __dirname,
    "../core/classical/nuclear-owner-specs/" +
        "classical-destockal-stock-vowel-harmony.mjs"
);
const FIRST_TYPE_THEME_ALTERNATION = Object.freeze({
    destockalTypeId: "long-vowel-ni-or-hui",
    sourceRank: "intransitive-verbstem",
    role: "stem-formative",
    alternatives: Object.freeze(["ni", "hui"]),
});
const REGULAR_LONG_STOCK_HARMONY = Object.freeze({
    stockFormativeQuantity: "long",
    controller: Object.freeze({
        rank: "root",
        vowelQuantity: "short",
    }),
    realizationsByRootVowel: Object.freeze({
        a: Object.freeze({ default: "ā" }),
        i: Object.freeze({ default: "ī" }),
        o: Object.freeze({ default: "ō" }),
        e: Object.freeze({ default: "ō", withHuiAlternative: "ē" }),
    }),
    normalRelation: "root-vowel-harmony",
});
const EXCEPTION_POLICY = Object.freeze({
    exists: true,
    exceptionAuthority: "typed-lexical-source-analysis",
    lexicalExceptionLicensed: true,
    userChoiceRequired: false,
    unlicensedMismatchRequiresSourceAnalysisSelection: true,
    surfaceShapeExceptionAuthority: false,
    callerSuppliedExceptionAllowed: false,
});
const ATOM_RECEIPTS = Object.freeze([Object.freeze({
    atomId: "ACI-P201-L004-8CF59410D7",
    selection: "claim-p2312",
    facet: "aci-p201-l004-8cf59410d7-first-type-theme-alternation",
    canonicalPath: `${CONSTRAINT_PATH}.firstTypeThemeAlternation`,
    value: FIRST_TYPE_THEME_ALTERNATION,
}), Object.freeze({
    atomId: "ACI-P201-L004-5D859597BD",
    selection: "claim-p2311",
    facet: "aci-p201-l004-5d859597bd-regular-long-stock-harmony",
    canonicalPath: `${CONSTRAINT_PATH}.regularLongStockHarmony`,
    value: REGULAR_LONG_STOCK_HARMONY,
}), Object.freeze({
    atomId: "ACI-P201-L005-2E368A61C9",
    selection: "claim-p2313",
    facet: "aci-p201-l005-2e368a61c9-exception-policy-exists",
    canonicalPath: `${CONSTRAINT_PATH}.exceptionPolicy.exists`,
    value: true,
})]);
const LEGACY_RECEIPTS = Object.freeze([Object.freeze({
    selection: "claim-p2311",
    facet: "p2311-the-stock-formative-is-a-long-vowel-that-is",
    canonicalPath: `${CONSTRAINT_PATH}.regularLongStockHarmony`,
    value: REGULAR_LONG_STOCK_HARMONY,
}), Object.freeze({
    selection: "claim-p2312",
    facet: "p2312-the-stem-formative-on-the-intransitive-stem-of-the",
    canonicalPath: `${CONSTRAINT_PATH}.firstTypeThemeAlternation`,
    value: FIRST_TYPE_THEME_ALTERNATION,
}), Object.freeze({
    selection: "claim-p2313",
    facet: "p2313-there-may-be-exceptions",
    canonicalPath: `${CONSTRAINT_PATH}.exceptionPolicy.exists`,
    value: true,
})]);

function run(ctx = {}) {
    const s = createSuite(
        "classical_destockal_stock_vowel_harmony_owner_exact"
    );
    const issueReceipt = ({ selection, facet }) => {
        const source = ctx.buildClassicalDestockalStockVowelHarmonySource({
            analysisDomain: OWNER_ID,
            selection,
            requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx.evaluateClassicalDestockalStockVowelHarmony(
            source
        );
        return {
            source,
            result,
            evidence:
                ctx.getClassicalDestockalStockVowelHarmonyExecutionEvidence(
                    result
                ),
        };
    };
    const atomReceipts = ATOM_RECEIPTS.map(issueReceipt);
    const legacyReceipts = LEGACY_RECEIPTS.map(issueReceipt);
    const summarizeReceipt = receipt => ({
        status: receipt.result.authorizationStatus,
        canonicalPath: receipt.result.payload.effectiveCanonicalPath,
        sourceCanonicalPath: receipt.result.payload.sourceCanonicalPath,
        value: receipt.result.payload.facetValue,
        observationKind: receipt.result.payload.proofObservationKind,
        observationStatus: receipt.result.payload.proofObservationStatus,
        broadProxyRetired:
            receipt.result.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalDestockalStockVowelHarmonyResult(
                receipt.result
            ),
        evidenceCanonical:
            ctx.isClassicalDestockalStockVowelHarmonyExecutionEvidence(
                receipt.evidence,
                receipt.result
            ),
    });

    ATOM_RECEIPTS.forEach((atom, index) => {
        s.eq(`${atom.atomId} has one direct owner-issued receipt`,
            summarizeReceipt(atomReceipts[index]), {
                status: "authorized",
                canonicalPath: atom.canonicalPath,
                sourceCanonicalPath: atom.canonicalPath,
                value: atom.value,
                observationKind: "direct-canonical-result-observation",
                observationStatus: "direct",
                broadProxyRetired: false,
                resultCanonical: true,
                evidenceCanonical: true,
            });
    });

    LEGACY_RECEIPTS.forEach((legacy, index) => {
        const receipt = legacyReceipts[index];
        s.eq(`${legacy.selection} retains its exact canonical compatibility`, {
            status: receipt.result.authorizationStatus,
            canonicalPath: receipt.result.payload.effectiveCanonicalPath,
            sourceCanonicalPath: receipt.result.payload.sourceCanonicalPath,
            value: receipt.result.payload.facetValue,
            resultCanonical:
                ctx.isClassicalDestockalStockVowelHarmonyResult(
                    receipt.result
                ),
            evidenceCanonical:
                ctx.isClassicalDestockalStockVowelHarmonyExecutionEvidence(
                    receipt.evidence,
                    receipt.result
                ),
        }, {
            status: "authorized",
            canonicalPath: legacy.canonicalPath,
            sourceCanonicalPath: legacy.canonicalPath,
            value: legacy.value,
            resultCanonical: true,
            evidenceCanonical: true,
        });
    });

    const constraint = atomReceipts[0].result.payload.definition.constraints
        .destockalStockVowelHarmonySystem;
    s.eq("the harmony constraint is frozen typed authority", {
        status: constraint.authorizationStatus,
        frozen: Object.isFrozen(constraint),
        themeFrozen: Object.isFrozen(
            constraint.firstTypeThemeAlternation
        ),
        harmonyFrozen: Object.isFrozen(
            constraint.regularLongStockHarmony
        ),
        exceptionFrozen: Object.isFrozen(constraint.exceptionPolicy),
        typedSourceAuthority: constraint.typedSourceAnalysisAuthority,
        shapeAdmissionGate: constraint.surfaceShapeIsNotAnAdmissionGate,
        canvasAuthority: constraint.canvasExampleAuthority,
        callerAuthority: constraint.callerSuppliedGrammarAuthority,
        formulaAuthority: constraint.formulaStringAuthority,
        surfaceAuthority: constraint.surfaceStringAuthority,
        exampleAuthority: constraint.storedExampleAuthority,
    }, {
        status: "authorized",
        frozen: true,
        themeFrozen: true,
        harmonyFrozen: true,
        exceptionFrozen: true,
        typedSourceAuthority: true,
        shapeAdmissionGate: true,
        canvasAuthority: false,
        callerAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false,
        exampleAuthority: false,
    });

    s.eq("the constraint preserves the exact three grammar statements", {
        firstTypeThemeAlternation:
            constraint.firstTypeThemeAlternation,
        regularLongStockHarmony: constraint.regularLongStockHarmony,
        exceptionPolicy: constraint.exceptionPolicy,
    }, {
        firstTypeThemeAlternation: FIRST_TYPE_THEME_ALTERNATION,
        regularLongStockHarmony: REGULAR_LONG_STOCK_HARMONY,
        exceptionPolicy: EXCEPTION_POLICY,
    });

    const cloned = value => JSON.parse(JSON.stringify(value));
    const authentic = atomReceipts[0];
    const forgedResult = {
        ...cloned(authentic.result),
        authorizationStatus: "authorized",
    };
    const forgedEvidence = {
        ...cloned(authentic.evidence),
        authorizationStatus: "authorized",
    };
    s.eq("only frozen owner-issued source, result, and evidence authorize", {
        sourceFrozen: Object.isFrozen(authentic.source),
        resultFrozen: Object.isFrozen(authentic.result),
        evidenceFrozen: Object.isFrozen(authentic.evidence),
        resultCanonical:
            ctx.isClassicalDestockalStockVowelHarmonyResult(
                authentic.result
            ),
        evidenceCanonical:
            ctx.isClassicalDestockalStockVowelHarmonyExecutionEvidence(
                authentic.evidence,
                authentic.result
            ),
        copiedSourceStatus:
            ctx.evaluateClassicalDestockalStockVowelHarmony(
                cloned(authentic.source)
            ).authorizationStatus,
        copiedResultCanonical:
            ctx.isClassicalDestockalStockVowelHarmonyResult(
                cloned(authentic.result)
            ),
        forgedResultCanonical:
            ctx.isClassicalDestockalStockVowelHarmonyResult(forgedResult),
        evidenceFromForgedResult:
            ctx.getClassicalDestockalStockVowelHarmonyExecutionEvidence(
                forgedResult
            ),
        copiedEvidenceCanonical:
            ctx.isClassicalDestockalStockVowelHarmonyExecutionEvidence(
                cloned(authentic.evidence),
                authentic.result
            ),
        forgedEvidenceCanonical:
            ctx.isClassicalDestockalStockVowelHarmonyExecutionEvidence(
                forgedEvidence,
                authentic.result
            ),
    }, {
        sourceFrozen: true,
        resultFrozen: true,
        evidenceFrozen: true,
        resultCanonical: true,
        evidenceCanonical: true,
        copiedSourceStatus: "blocked",
        copiedResultCanonical: false,
        forgedResultCanonical: false,
        evidenceFromForgedResult: null,
        copiedEvidenceCanonical: false,
        forgedEvidenceCanonical: false,
    });

    const buildSource = stem =>
        ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass: "B",
            perfectiveClass: "B",
            valence: "intransitive",
            requestedSourceValence: "intransitive",
            transitivity: "intransitive",
            objectKind: "none",
            objectPerson: "",
        });
    const inspectHarmony = stem => {
        const source = buildSource(stem);
        const frame =
            ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
        const analysis = frame.analyses.find(candidate =>
            candidate.stockVowelHarmonyFrame) || {};
        const harmony = analysis.stockVowelHarmonyFrame || {};
        return {
            source,
            frame,
            analysis,
            harmony,
            summary: {
                sourceStatus: source.authorizationStatus,
                sourceCanonical:
                    ctx.isClassicalNahuatlVerbstemClassFrame(source),
                frameStatus: frame.authorizationStatus,
                frameCanonical:
                    ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
                        frame
                    ),
                harmonyStatus: harmony.authorizationStatus || "",
                harmonyFrozen: Object.isFrozen(harmony),
                root: harmony.root || "",
                rootVowel: harmony.rootVowel || "",
                rootVowelQuantity: harmony.rootVowelQuantity || "",
                normalRuleApplicable:
                    harmony.normalRuleApplicable === true,
                stockFormative: harmony.stockFormative || "",
                stemFormative: harmony.stemFormative || "",
                expectedStockFormative:
                    harmony.expectedStockFormative || "",
                allowedStockFormatives:
                    harmony.allowedStockFormatives || [],
                relation: harmony.relation || "",
                regularHarmony: harmony.regularHarmony === true,
                exceptionalAnalysis: harmony.exceptionalAnalysis === true,
                lexicalExceptionLicensed:
                    harmony.lexicalExceptionLicensed === true,
                exceptionAuthority: harmony.exceptionAuthority || "",
                userChoiceRequired: harmony.userChoiceRequired === true,
                regularRule: harmony.regularLongStockHarmony || null,
                surfaceShapeExceptionAuthority:
                    harmony.surfaceShapeExceptionAuthority === true,
                canvasExampleAuthority:
                    harmony.canvasExampleAuthority === true,
                callerSuppliedGrammarAuthority:
                    harmony.callerSuppliedGrammarAuthority === true,
            },
        };
    };
    const regularProbeSpecs = [{
        label: "short a selects long ā with ni",
        stem: "xac-ā-ni",
        root: "xac",
        rootVowel: "a",
        stockFormative: "ā",
        stemFormative: "ni",
        expectedStockFormative: "ā",
        allowedStockFormatives: ["ā"],
    }, {
        label: "short i selects long ī with ni",
        stem: "xip-ī-ni",
        root: "xip",
        rootVowel: "i",
        stockFormative: "ī",
        stemFormative: "ni",
        expectedStockFormative: "ī",
        allowedStockFormatives: ["ī"],
    }, {
        label: "short o selects long ō with ni",
        stem: "xoc-ō-ni",
        root: "xoc",
        rootVowel: "o",
        stockFormative: "ō",
        stemFormative: "ni",
        expectedStockFormative: "ō",
        allowedStockFormatives: ["ō"],
    }, {
        label: "short e selects default long ō with ni",
        stem: "xep-ō-ni",
        root: "xep",
        rootVowel: "e",
        stockFormative: "ō",
        stemFormative: "ni",
        expectedStockFormative: "ō",
        allowedStockFormatives: ["ō"],
    }, {
        label: "short e selects default long ō with hui",
        stem: "xep-ō-hui",
        root: "xep",
        rootVowel: "e",
        stockFormative: "ō",
        stemFormative: "hui",
        expectedStockFormative: "ō",
        allowedStockFormatives: ["ō", "ē"],
    }, {
        label: "short e permits alternative long ē with hui",
        stem: "xep-ē-hui",
        root: "xep",
        rootVowel: "e",
        stockFormative: "ē",
        stemFormative: "hui",
        expectedStockFormative: "ō",
        allowedStockFormatives: ["ō", "ē"],
    }];
    regularProbeSpecs.forEach(specification => {
        s.eq(specification.label, inspectHarmony(specification.stem).summary, {
            sourceStatus: "authorized",
            sourceCanonical: true,
            frameStatus: "authorized",
            frameCanonical: true,
            harmonyStatus: "authorized",
            harmonyFrozen: true,
            root: specification.root,
            rootVowel: specification.rootVowel,
            rootVowelQuantity: "short",
            normalRuleApplicable: true,
            stockFormative: specification.stockFormative,
            stemFormative: specification.stemFormative,
            expectedStockFormative: specification.expectedStockFormative,
            allowedStockFormatives: specification.allowedStockFormatives,
            relation: "regular-root-vowel-harmony",
            regularHarmony: true,
            exceptionalAnalysis: false,
            lexicalExceptionLicensed: false,
            exceptionAuthority: "",
            userChoiceRequired: false,
            regularRule: REGULAR_LONG_STOCK_HARMONY,
            surfaceShapeExceptionAuthority: false,
            canvasExampleAuthority: false,
            callerSuppliedGrammarAuthority: false,
        });
    });

    const eNiMismatch = inspectHarmony("xep-ē-ni");
    const eHuiAlternative = inspectHarmony("xep-ē-hui");
    s.eq("long ē mismatches e plus ni but is regular with e plus hui", {
        ni: {
            expected: eNiMismatch.harmony.expectedStockFormative,
            allowed: eNiMismatch.harmony.allowedStockFormatives,
            relation: eNiMismatch.harmony.relation,
            regular: eNiMismatch.harmony.regularHarmony,
            exceptional: eNiMismatch.harmony.exceptionalAnalysis,
            licensed: eNiMismatch.harmony.lexicalExceptionLicensed,
            authority: eNiMismatch.harmony.exceptionAuthority,
            choiceRequired: eNiMismatch.harmony.userChoiceRequired,
        },
        hui: {
            expected: eHuiAlternative.harmony.expectedStockFormative,
            allowed: eHuiAlternative.harmony.allowedStockFormatives,
            relation: eHuiAlternative.harmony.relation,
            regular: eHuiAlternative.harmony.regularHarmony,
            exceptional: eHuiAlternative.harmony.exceptionalAnalysis,
            licensed: eHuiAlternative.harmony.lexicalExceptionLicensed,
            authority: eHuiAlternative.harmony.exceptionAuthority,
            choiceRequired: eHuiAlternative.harmony.userChoiceRequired,
        },
    }, {
        ni: {
            expected: "ō",
            allowed: ["ō"],
            relation: "exceptional-stock-vowel-analysis",
            regular: false,
            exceptional: true,
            licensed: false,
            authority: "source-analysis-selection-required",
            choiceRequired: true,
        },
        hui: {
            expected: "ō",
            allowed: ["ō", "ē"],
            relation: "regular-root-vowel-harmony",
            regular: true,
            exceptional: false,
            licensed: false,
            authority: "",
            choiceRequired: false,
        },
    });

    const longRoot = inspectHarmony("xēp-ō-ni");
    s.eq("a long root vowel stays admitted outside the short-root rule", {
        sourceStatus: longRoot.source.authorizationStatus,
        sourceCanonical:
            ctx.isClassicalNahuatlVerbstemClassFrame(longRoot.source),
        frameStatus: longRoot.frame.authorizationStatus,
        frameCanonical:
            ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
                longRoot.frame
            ),
        root: longRoot.harmony.root,
        rootVowel: longRoot.harmony.rootVowel,
        rootVowelQuantity: longRoot.harmony.rootVowelQuantity,
        normalRuleApplicable: longRoot.harmony.normalRuleApplicable,
        expected: longRoot.harmony.expectedStockFormative,
        allowed: longRoot.harmony.allowedStockFormatives,
        relation: longRoot.harmony.relation,
        regular: longRoot.harmony.regularHarmony,
        exceptional: longRoot.harmony.exceptionalAnalysis,
        choiceRequired: longRoot.harmony.userChoiceRequired,
    }, {
        sourceStatus: "authorized",
        sourceCanonical: true,
        frameStatus: "authorized",
        frameCanonical: true,
        root: "xēp",
        rootVowel: "ē",
        rootVowelQuantity: "long",
        normalRuleApplicable: false,
        expected: "",
        allowed: [],
        relation: "outside-normal-short-root-domain",
        regular: false,
        exceptional: false,
        choiceRequired: false,
    });

    const lexicalException = inspectHarmony("tlap-ī-hui");
    const openMismatch = inspectHarmony("chacu-ī-ni");
    const summarizeException = observation => ({
        analysisAuthority: observation.analysis.analysisAuthority,
        lexicalStatus: observation.analysis.lexicalStatus,
        analysisSelectionRequired:
            observation.analysis.sourceAnalysisSelectionRequired,
        rootVowel: observation.harmony.rootVowel,
        expected: observation.harmony.expectedStockFormative,
        allowed: observation.harmony.allowedStockFormatives,
        regular: observation.harmony.regularHarmony,
        exceptional: observation.harmony.exceptionalAnalysis,
        licensed: observation.harmony.lexicalExceptionLicensed,
        authority: observation.harmony.exceptionAuthority,
        choiceRequired: observation.harmony.userChoiceRequired,
        shapeAuthority:
            observation.harmony.surfaceShapeExceptionAuthority,
    });
    s.eq("a signed lexical exception differs from an open mismatch", {
        lexical: summarizeException(lexicalException),
        open: summarizeException(openMismatch),
    }, {
        lexical: {
            analysisAuthority: "typed-lexical-source-analysis",
            lexicalStatus: "lexically-licensed-source-analysis",
            analysisSelectionRequired: false,
            rootVowel: "a",
            expected: "ā",
            allowed: ["ā"],
            regular: false,
            exceptional: true,
            licensed: true,
            authority: "typed-lexical-source-analysis",
            choiceRequired: false,
            shapeAuthority: false,
        },
        open: {
            analysisAuthority: "andrews-final-shape-category",
            lexicalStatus: "shape-licensed-lexical-choice",
            analysisSelectionRequired: true,
            rootVowel: "a",
            expected: "ā",
            allowed: ["ā"],
            regular: false,
            exceptional: true,
            licensed: false,
            authority: "source-analysis-selection-required",
            choiceRequired: true,
            shapeAuthority: false,
        },
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
    const summarizeDirect = application => {
        const cues = ctx.getClassicalFormulaDerivedAnnotations(
            application.resultFrame.formulaRealization,
            null,
            application
        );
        const cue = cues.find(candidate =>
            candidate.role === "lesson24-ni-hui-destockal-sources");
        return {
            status: application.authorizationStatus,
            resultStatus: application.resultFrame.authorizationStatus,
            resultCanonical:
                ctx.isClassicalNahuatlVncApplicationResultFrame(
                    application.resultFrame
                ),
            formula: application.resultFrame.formulaRealization,
            surface: application.resultFrame.surfaceRealization,
            cueRole: cue?.role || "",
            cueLabel: cue?.label || "",
        };
    };
    s.eq("the e to ō direct path has canonical output and a harmony cue",
        summarizeDirect(directApplication("xep-ō-ni")), {
            status: "authorized",
            resultStatus: "authorized",
            resultCanonical: true,
            formula: "#0-0(xep-ō-ni)0+0-0#",
            surface: "xepōni",
            cueRole: "lesson24-ni-hui-destockal-sources",
            cueLabel:
                "xep root · ō long stock formative · ni theme · regular harmony with root vowel e · typed Source Class B · no inventory gate",
        });
    s.eq("the e to ē plus hui path has canonical output and a harmony cue",
        summarizeDirect(directApplication("xep-ē-hui")), {
            status: "authorized",
            resultStatus: "authorized",
            resultCanonical: true,
            formula: "#0-0(xep-ē-hui)0+0-0#",
            surface: "xepēhui",
            cueRole: "lesson24-ni-hui-destockal-sources",
            cueLabel:
                "xep root · ē long stock formative · hui theme · regular harmony with root vowel e · typed Source Class B · no inventory gate",
        });

    const mismatchDirect = directApplication("chacu-ī-ni");
    const mismatchCues = ctx.getClassicalFormulaDerivedAnnotations(
        mismatchDirect.resultFrame.formulaRealization,
        null,
        mismatchDirect
    );
    const mismatchCue = mismatchCues.find(candidate =>
        candidate.role === "lesson24-ni-hui-destockal-sources");
    const mismatchInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            openMismatch.source,
            { derivationType: "causative" }
        );
    const mismatchTypeOneOptions = mismatchInventory.options.filter(
        option => option.derivationSubtype === "type-one"
    );
    s.eq("the open mismatch is cued and retains both licensed choices", {
        directStatus: mismatchDirect.authorizationStatus,
        formula: mismatchDirect.resultFrame.formulaRealization,
        surface: mismatchDirect.resultFrame.surfaceRealization,
        cue: mismatchCue?.label || "",
        inventoryStatus: mismatchInventory.authorizationStatus,
        inventoryCanonical:
            ctx.isClassicalNahuatlVncDerivationOptionInventory(
                mismatchInventory
            ),
        selectionRequired: mismatchInventory.selectionRequired,
        analysisSelectionRequired:
            mismatchInventory.analysisSelectionRequired,
        options: mismatchTypeOneOptions.map(option => ({
            targetStem: option.targetStem,
            targetClass: option.targetClass,
            sourceAnalysisSelectionRequired:
                option.sourceAnalysisSelectionRequired,
            callerTargetAllowed: option.callerSuppliedTargetAllowed,
        })),
    }, {
        directStatus: "authorized",
        formula: "#0-0(chacu-ī-ni)0+0-0#",
        surface: "chacuīni",
        cue:
            "chacu root · ī long stock formative · ni theme · stock vowel differs from normal cue ā; Source analysis choice required · typed Source Class B · no inventory gate",
        inventoryStatus: "authorized",
        inventoryCanonical: true,
        selectionRequired: true,
        analysisSelectionRequired: true,
        options: [{
            targetStem: "chacu-ī-n-a",
            targetClass: "B",
            sourceAnalysisSelectionRequired: true,
            callerTargetAllowed: false,
        }, {
            targetStem: "chacu-ī-ni-ā",
            targetClass: "C",
            sourceAnalysisSelectionRequired: true,
            callerTargetAllowed: false,
        }],
    });

    const regularCausativeSource = inspectHarmony("xep-ō-ni");
    const regularCausativeInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            regularCausativeSource.source,
            { derivationType: "causative" }
        );
    const regularCausativeOptions = regularCausativeInventory.options.filter(
        option => option.derivationSubtype === "type-one"
    );
    s.eq("ordinary causative choices preserve the selected long stock vowel", {
        status: regularCausativeInventory.authorizationStatus,
        canonical:
            ctx.isClassicalNahuatlVncDerivationOptionInventory(
                regularCausativeInventory
            ),
        stockFormative:
            regularCausativeSource.harmony.stockFormative,
        options: regularCausativeOptions.map(option => ({
            targetStem: option.targetStem,
            targetClass: option.targetClass,
            selectedLongVowelPreserved: option.targetStem.includes("ō"),
            callerTargetAllowed: option.callerSuppliedTargetAllowed,
        })),
    }, {
        status: "authorized",
        canonical: true,
        stockFormative: "ō",
        options: [{
            targetStem: "xep-ō-n-a",
            targetClass: "B",
            selectedLongVowelPreserved: true,
            callerTargetAllowed: false,
        }, {
            targetStem: "xep-ō-ni-ā",
            targetClass: "C",
            selectedLongVowelPreserved: true,
            callerTargetAllowed: false,
        }],
    });

    const ownerSpecSource = fs.readFileSync(OWNER_SPEC_PATH, "utf8")
        .toLowerCase();
    s.eq("the descriptive prevalence atom has no owner receipt", {
        prevalenceAtomPresent:
            ownerSpecSource.includes("aci-p201-l004-5c4e0532b7"),
        directAtomReceiptCount: ATOM_RECEIPTS.length,
        compatibilityReceiptCount: LEGACY_RECEIPTS.length,
    }, {
        prevalenceAtomPresent: false,
        directAtomReceiptCount: 3,
        compatibilityReceiptCount: 3,
    });

    return s;
}

module.exports = { run };
