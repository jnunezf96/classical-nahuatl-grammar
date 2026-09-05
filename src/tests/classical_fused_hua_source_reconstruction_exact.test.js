"use strict";

const { createSuite } = require("./runner");

const OWNER = "classical-destockal-e-hua-system";
const PREFIX = "ClassicalDestockalEHuaSystem";
const SELECTION = "claim-p2365";
const FACET = "aci-p205-l006-d3da91bcbb-hua-reconstructed-source-coalescence";
const LEGACY_FACET = "p2365-as-in-24-5-9-there-are-a-few";
const PATH = "constraints.destockalEHuaSystem.reconstructedSourceCoalescence";

const CASES = Object.freeze([
    Object.freeze({
        key: "cehua",
        contracted: "cē-hua",
        compact: "cēhua",
        reconstructed: "ce-ē-hua",
        root: "ce",
        stock: "ē",
        theme: "hua",
        resultStock: "cē",
        surface: "cēhua",
        analysisId:
            "cn-l24-2462-cehua-fused-destockal:fused-destockal-hua-exact",
    }),
    Object.freeze({
        key: "ehua",
        contracted: "ē-hua",
        compact: "ēhua",
        reconstructed: "e-ē-hua",
        root: "e",
        stock: "ē",
        theme: "hua",
        resultStock: "ē",
        surface: "ēhua",
        analysisId:
            "cn-l24-2462-ehua-fused-destockal:fused-destockal-hua-exact",
    }),
]);

function evaluateDirect(ctx, sourceStem, tense = "present", extra = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "active",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense,
        outputScope: "single",
        ...extra,
    });
}

function sourceProjection(ctx, sourceStem) {
    return ctx.buildClassicalNahuatlVncSourceConstitutionProjection({
        sourceStem,
        verbClass: "A",
        sourceValence: "intransitive",
        requestedDerivation: "direct",
    }, ctx);
}

function exactAnalysis(frame, row) {
    return frame?.analyses?.find(analysis => (
        analysis.analysisId === row.analysisId
        && analysis.category === "fused-destockal-hua-exact"
    )) || null;
}

function noteSummary(note) {
    return note && {
        kind: note.kind,
        notation: note.notation,
        notationScope: note.notationScope,
        status: note.status,
        underlyingStem: note.underlyingStem,
        extantSourceStem: note.extantSourceStem,
        typeId: note.destockalStructureFrame?.typeId,
        grammarAuthority: note.grammarAuthority,
        sourceAdmissionAuthority: note.sourceAdmissionAuthority,
        formulaStringAuthority: note.formulaStringAuthority,
        surfaceStringAuthority: note.surfaceStringAuthority,
        canvasExampleAuthority: note.canvasExampleAuthority,
        callerSuppliedGrammarAuthority: note.callerSuppliedGrammarAuthority,
    };
}

function expectedNote(row) {
    return {
        kind: "classical-nahuatl-destockal-reconstruction-notation-frame",
        notation: "*",
        notationScope: "underlying-destockal-source",
        status: "reconstructed-underlying-source-of-extant-fused-stem",
        underlyingStem: row.reconstructed,
        extantSourceStem: row.contracted,
        typeId: "long-vowel-hua",
        grammarAuthority: false,
        sourceAdmissionAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        canvasExampleAuthority: false,
        callerSuppliedGrammarAuthority: false,
    };
}

function issueReceipt(ctx, facet = FACET) {
    const source = ctx[`build${PREFIX}Source`]({
        analysisDomain: OWNER,
        selection: SELECTION,
        requestedFacet: facet,
        participantChoice: `${SELECTION}:${facet}`,
    });
    const result = ctx[`evaluate${PREFIX}`](source);
    return {
        source,
        result,
        evidence: ctx[`get${PREFIX}ExecutionEvidence`](result),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_fused_hua_source_reconstruction_exact");

    const receipt = issueReceipt(ctx);
    s.eq("the permanent reconstruction atom observes the focused canonical relation", [
        receipt.result.authorizationStatus,
        receipt.result.payload?.effectiveCanonicalPath,
        receipt.result.payload?.sourceCanonicalPath,
        receipt.result.payload?.proofObservationKind,
        ctx[`is${PREFIX}Result`](receipt.result),
        ctx[`is${PREFIX}ExecutionEvidence`](receipt.evidence, receipt.result),
    ], [
        "authorized",
        PATH,
        PATH,
        "direct-canonical-result-observation",
        true,
        true,
    ]);

    const legacyReceipt = issueReceipt(ctx, LEGACY_FACET);
    s.eq("the established claim observes the same relation without a second proof path", [
        legacyReceipt.result.authorizationStatus,
        legacyReceipt.result.payload?.effectiveCanonicalPath,
        legacyReceipt.result.payload?.sourceCanonicalPath,
        ctx[`is${PREFIX}ExecutionEvidence`](
            legacyReceipt.evidence,
            legacyReceipt.result,
        ),
    ], ["authorized", PATH, PATH, true]);

    const raw = ctx.buildClassicalNahuatlDestockalEHuaSystemValidationFrame({
        requestedRelation: "reconstructed-source-coalescence",
    });
    const rawSources = raw.constraints?.destockalEHuaSystem
        ?.reconstructedSourceCoalescence?.sources;
    s.eq("the canonical projection contains exactly the two licensed fused hua sources", [
        raw.authorizationStatus,
        ctx.isClassicalNahuatlDestockalEHuaSystemValidationFrame(raw),
        Object.keys(rawSources || {}),
        raw.typedFrameAuthority,
        raw.formulaStringAuthority,
        raw.surfaceStringAuthority,
        raw.storedExampleAuthority,
        Object.isFrozen(raw),
    ], ["authorized", true, ["cehua", "ehua"], true, false, false, false, true]);

    CASES.forEach(row => {
        const observed = receipt.result.payload?.facetValue?.sources?.[row.key];
        const rawObserved = rawSources?.[row.key];
        s.eq(`${row.contracted}: the owner observes the exact signed Source analysis and note`, [
            observed?.sourceApplicationFrame?.authorizationStatus,
            observed?.sourceApplicationFrame?.normalizedRequest?.sourceStem,
            observed?.sourceAnalysisFrame?.sourceStem,
            observed?.sourceAnalysis?.analysisId,
            observed?.sourceAnalysis?.category,
            observed?.sourceAnalysis?.analysisAuthority,
            observed?.sourceAnalysis?.lexicalStatus,
            observed?.sourceAnalysis?.segments,
            observed?.sourceAnalysis?.root,
            observed?.sourceAnalysis?.stockFormative,
            observed?.sourceAnalysis?.stemFormative,
            observed?.sourceAnalysis?.destockalStructureFrame?.typeId,
            noteSummary(observed?.notationFrame),
        ], [
            "authorized",
            row.contracted,
            row.contracted,
            row.analysisId,
            "fused-destockal-hua-exact",
            "typed-lexical-source-analysis",
            "lexically-licensed-source-analysis",
            [row.root, row.stock, row.theme],
            row.root,
            row.stock,
            row.theme,
            "long-vowel-hua",
            expectedNote(row),
        ]);

        s.eq(`${row.contracted}: the owner executes reconstruction and actual coalescence`, [
            observed?.reconstructedSourceApplicationFrame?.authorizationStatus,
            observed?.reconstructedSourceApplicationFrame?.normalizedRequest?.sourceStem,
            observed?.sourceFiniteSurfaceFrame?.formulaRealization,
            observed?.sourceFiniteSurfaceFrame?.wordRealization,
            observed?.sourceCoalescenceFrame?.root,
            observed?.sourceCoalescenceFrame?.stockFormative,
            observed?.sourceCoalescenceFrame?.underlyingStemFormative,
            observed?.sourceCoalescenceFrame?.resultStock,
            observed?.sourceCoalescenceFrame?.realization?.underlyingVowelCount,
            observed?.sourceCoalescenceFrame?.realization?.surfaceVowelCount,
            rawObserved?.sourceCoalescenceFrame?.section,
            observed?.sourceCoalescenceBoundaryFrame?.leftSurfaceAfter,
            observed?.sourceCoalescenceBoundaryFrame?.rightSurfaceAfter,
            observed?.sourceCoalescenceBoundaryFrame?.formulaCarrierChangedByWrittenBoundary,
            observed?.sourceApplicationFrame?.resultFrame?.formulaRealization,
            observed?.sourceApplicationFrame?.resultFrame?.surfaceRealization,
        ], [
            "authorized",
            row.reconstructed,
            `#0-0(${row.reconstructed})0+0-0#`,
            row.surface,
            row.root,
            row.stock,
            row.theme,
            row.resultStock,
            2,
            1,
            "24.6.2",
            row.resultStock,
            "",
            false,
            `#0-0(${row.contracted})0+0-0#`,
            row.surface,
        ]);
    });

    CASES.forEach(row => {
        const spellings = [row.contracted, row.compact, row.reconstructed];
        s.eq(`${row.key}: contracted, compact, and reconstructed spellings share one Source analysis`, (
            spellings.map(sourceStem => {
                const projection = sourceProjection(ctx, sourceStem);
                return [
                    projection?.authorizationStatus,
                    projection?.parts?.map(part => [part.segment, part.role]),
                    projection?.sourceAnalysis?.analysisId,
                    noteSummary(projection?.reconstructionNotationFrame),
                    projection?.sourceAnalysis?.reconstructionNotationFrame
                        === projection?.reconstructionNotationFrame,
                    projection?.reconstructionNotationFrame?.destockalStructureFrame
                        === projection?.sourceAnalysis?.destockalStructureFrame,
                    projection?.grammarAuthority,
                ];
            })
        ), spellings.map(() => [
            "authorized",
            [[row.root, "root"], [row.stock, "stock formative"], [row.theme, "stem formative"]],
            row.analysisId,
            expectedNote(row),
            true,
            true,
            false,
        ]));

        for (const tense of ["present", "preterit"]) {
            s.eq(`${row.key}: ${tense} keeps ordinary Class A Formula and Surface behavior`, (
                spellings.map(sourceStem => {
                    const application = evaluateDirect(ctx, sourceStem, tense);
                    return [
                        application.authorizationStatus,
                        ctx.isClassicalNahuatlVncApplicationFrame(application),
                        application.resultFrame?.formulaRealization,
                        application.resultFrame?.surfaceRealization,
                        application.resultFrame?.sourceAnalysisFrame?.analyses?.some(
                            analysis => analysis.analysisId === row.analysisId,
                        ),
                    ];
                })
            ), spellings.map(sourceStem => [
                "authorized",
                true,
                // Class A retains its stem and takes num1 c. The existing
                // lexical perfective record for ēhua uses the citation ē-hua.
                `#0-0(${tense === "preterit" && sourceStem === "ēhua" ? "ē-hua" : sourceStem})0+${tense === "preterit" ? "c" : "0"}-0#`,
                `${row.surface}${tense === "preterit" ? "c" : ""}`,
                true,
            ]));
        }
    });

    const noNote = (sourceStem, extra = {}) => {
        const application = evaluateDirect(ctx, sourceStem, "present", extra);
        const projection = sourceProjection(ctx, sourceStem);
        return [
            application.authorizationStatus,
            ctx.isClassicalNahuatlVncApplicationFrame(application),
            Boolean(application.resultFrame?.sourceAnalysisFrame?.analyses?.some(
                analysis => analysis.reconstructionNotationFrame,
            )),
            Boolean(projection?.reconstructionNotationFrame),
        ];
    };
    s.eq("an open compatible long-stock hua source remains productive without lexical notation",
        noNote("xe-ē-hua"), ["authorized", true, false, false]);
    s.eq("a short-stock lookalike does not borrow the long-stock reconstruction",
        noNote("ce-e-hua"), ["authorized", true, false, false]);
    s.eq("an open long-stock hui source does not borrow the separate hua reconstruction",
        noNote("e-ē-hui", { verbClass: "B" }), ["authorized", true, false, false]);

    const cehui = sourceProjection(ctx, "cē-hui");
    s.eq("the earlier cē-hui reconstruction remains a distinct hui analysis", [
        cehui?.authorizationStatus,
        cehui?.parts?.map(part => [part.segment, part.role]),
        cehui?.sourceAnalysis?.analysisId,
        cehui?.sourceAnalysis?.category,
        cehui?.reconstructionNotationFrame?.underlyingStem,
        cehui?.reconstructionNotationFrame?.extantSourceStem,
        cehui?.reconstructionNotationFrame?.destockalStructureFrame?.typeId,
    ], [
        "authorized",
        [["ce", "root"], ["ē", "stock formative"], ["hui", "stem formative"]],
        "cn-l24-2459-cehui-fused-destockal:fused-destockal-hui-exact",
        "fused-destockal-hui-exact",
        "ce-ē-hui",
        "cē-hui",
        "long-vowel-ni-or-hui",
    ]);

    const exactApplication = evaluateDirect(ctx, CASES[0].contracted);
    const exactFrame = exactApplication.resultFrame.sourceAnalysisFrame;
    const exactNote = exactAnalysis(exactFrame, CASES[0]).reconstructionNotationFrame;
    s.eq("copied Source analysis and copied owner projection cannot retain authority", [
        ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
            JSON.parse(JSON.stringify(exactFrame)),
        ),
        ctx.isClassicalNahuatlDestockalEHuaSystemValidationFrame(
            JSON.parse(JSON.stringify(raw)),
        ),
    ], [false, false]);

    const injected = evaluateDirect(ctx, "xe-ē-hua", "present", {
        reconstructionNotationFrame: JSON.parse(JSON.stringify(exactNote)),
        sourceAnalysisFrame: JSON.parse(JSON.stringify(exactFrame)),
    });
    s.eq("caller-supplied Source or note data cannot mint a reconstruction", [
        injected.authorizationStatus,
        ctx.isClassicalNahuatlVncApplicationFrame(injected),
        Object.hasOwn(injected.normalizedRequest || {}, "reconstructionNotationFrame"),
        Object.hasOwn(injected.normalizedRequest || {}, "sourceAnalysisFrame"),
        Boolean(injected.resultFrame?.sourceAnalysisFrame?.analyses?.some(
            analysis => analysis.reconstructionNotationFrame,
        )),
    ], ["blocked", true, false, false, false]);

    s.eq("copied owner Source, Result, and evidence cannot mint a receipt", [
        ctx[`evaluate${PREFIX}`](
            JSON.parse(JSON.stringify(receipt.source)),
        ).authorizationStatus,
        ctx[`is${PREFIX}Result`](JSON.parse(JSON.stringify(receipt.result))),
        ctx[`is${PREFIX}ExecutionEvidence`](
            JSON.parse(JSON.stringify(receipt.evidence)),
            receipt.result,
        ),
    ], ["blocked", false, false]);

    const causativeRequest = {
        sourceStem: "ē-hua",
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        objectKind: "none",
        objectPerson: "",
        requestedDerivation: "causative",
        requestedVoice: "active",
        causativeObjectKind: "specific-projective",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(causativeRequest);
    const exactCausative = preview.controlFrame?.derivationOptionInventory?.options
        ?.find(option => option.ruleId === "cn-l24-2432a-ehua-e-hu-a");
    s.eq("the established ē-hua special causative remains the normal Grammar option", [
        preview.authorizationStatus,
        preview.blockReason,
        preview.controlFrame?.derivationOptionInventory?.selectionRequired,
        exactCausative?.derivationRoute,
        exactCausative?.targetStem,
        exactCausative?.targetClass,
        exactCausative?.targetConstruction?.operation,
    ], [
        "blocked",
        "classical-vnc-derivation-option-selection-required",
        true,
        "type-one-final-a-morphological-replacement-exact",
        "ē-hu-a",
        "B",
        "morphological-replacement",
    ]);

    const caused = ctx.evaluateClassicalNahuatlVncApplication({
        ...causativeRequest,
        derivationOptionId: exactCausative?.optionId || "missing-ehua-option",
    });
    s.eq("the reconstruction note does not alter the selected causative Result", [
        caused.authorizationStatus,
        ctx.isClassicalNahuatlVncApplicationFrame(caused),
        caused.resultFrame?.selectedDerivation,
        caused.resultFrame?.formulaRealization,
        caused.resultFrame?.surfaceRealization,
        caused.resultFrame?.derivationOperationFrame?.selectedOption?.ruleId,
    ], [
        "authorized",
        true,
        "causative",
        "#ni-0+qu-0(ē-hu-a)0+0-0#",
        "niquēhua",
        "cn-l24-2432a-ehua-e-hu-a",
    ]);

    return s;
}

module.exports = { run };
