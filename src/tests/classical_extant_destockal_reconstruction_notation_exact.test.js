"use strict";

const { createSuite } = require("./runner");

const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const BASE = "constraints.destockalIrregularSourceLifecycle.extantFusedSources";

const CASES = [
    {
        lexeme: "mini",
        stem: "mī-ni",
        compactStem: "mīni",
        shortStem: "mi-ni",
        root: "mi",
        stock: "ī",
        theme: "ni",
        underlying: "mi-ī-ni",
        resultStock: "mī",
        analysisId:
            "cn-l24-2459-mini-fused-destockal:fused-destockal-ni-exact",
        category: "fused-destockal-ni-exact",
        facet: "aci-p204-l002-61a69ed581-02-mini-reconstruction-notation",
        path: `${BASE}.mini.sourceConstitution.reconstructionNotation`,
        directNotationLeaf: true,
    },
    {
        lexeme: "xini",
        stem: "xī-ni",
        compactStem: "xīni",
        shortStem: "xi-ni",
        root: "xi",
        stock: "ī",
        theme: "ni",
        underlying: "xi-ī-ni",
        resultStock: "xī",
        analysisId:
            "cn-l24-2459-xini-fused-destockal:fused-destockal-ni-exact",
        category: "fused-destockal-ni-exact",
        facet: "aci-p204-l003-429a0e8ace-02-xini-reconstruction-notation",
        path: `${BASE}.xini.sourceConstitution.reconstructionNotation`,
        directNotationLeaf: true,
    },
    {
        lexeme: "cehui",
        stem: "cē-hui",
        compactStem: "cēhui",
        shortStem: "ce-hui",
        root: "ce",
        stock: "ē",
        theme: "hui",
        underlying: "ce-ē-hui",
        resultStock: "cē",
        analysisId:
            "cn-l24-2459-cehui-fused-destockal:fused-destockal-hui-exact",
        category: "fused-destockal-hui-exact",
        facet: "aci-p204-l004-ae01b03f8b-cehui-source-constitution",
        path: `${BASE}.cehui.sourceConstitution`,
        directNotationLeaf: false,
    },
];

function evaluateDirect(ctx, sourceStem, extra = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "active",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
        ...extra,
    });
}

function findExactAnalysis(frame, row) {
    return frame?.analyses?.find(analysis => (
        analysis.analysisId === row.analysisId
        && analysis.category === row.category
    )) || null;
}

function summarizeNotation(frame) {
    return frame && [
        frame.kind,
        frame.notation,
        frame.notationScope,
        frame.status,
        frame.underlyingStem,
        frame.extantSourceStem,
        frame.destockalStructureFrame?.steps?.stemFormation?.output,
        frame.grammarAuthority,
        frame.sourceAdmissionAuthority,
        frame.formulaStringAuthority,
        frame.surfaceStringAuthority,
        frame.canvasExampleAuthority,
        frame.callerSuppliedGrammarAuthority,
    ];
}

function expectedNotation(row) {
    return [
        "classical-nahuatl-destockal-reconstruction-notation-frame",
        "*",
        "underlying-destockal-source",
        "reconstructed-underlying-source-of-extant-fused-stem",
        row.underlying,
        row.stem,
        row.underlying,
        false,
        false,
        false,
        false,
        false,
        false,
    ];
}

function ownerNotationWrapper(row, facetValue) {
    return row.directNotationLeaf
        ? facetValue
        : facetValue?.reconstructionNotation;
}

function run(ctx = {}) {
    const s = createSuite("classical_extant_destockal_reconstruction_notation_exact");

    const receipts = CASES.map(row => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER,
            selection: `claim-p2343-extant-${row.lexeme}`,
            requestedFacet: row.facet,
            participantChoice: `claim-p2343-extant-${row.lexeme}:${row.facet}`,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return {
            source,
            result,
            evidence: ctx[`get${PREFIX}ExecutionEvidence`](result),
            value: result.payload?.facetValue || null,
        };
    });

    CASES.forEach((row, index) => {
        const { result, evidence, value } = receipts[index];
        const wrapper = ownerNotationWrapper(row, value);
        const analysis = wrapper?.sourceAnalysis;
        const notation = wrapper?.notationFrame;
        const coalescence = wrapper?.sourceCoalescenceFrame;
        s.eq(`${row.facet} observes its exact reconstruction note`, [
            result.authorizationStatus,
            result.payload?.effectiveCanonicalPath,
            result.payload?.sourceCanonicalPath,
            result.payload?.proofObservationKind,
            ctx[`is${PREFIX}Result`](result),
            ctx[`is${PREFIX}ExecutionEvidence`](evidence, result),
            analysis?.analysisId,
            analysis?.analysisAuthority,
            analysis?.lexicalStatus,
            analysis?.segments,
            summarizeNotation(notation),
            wrapper?.sourceApplicationFrame?.normalizedRequest?.sourceStem,
            wrapper?.reconstructedSourceApplicationFrame?.normalizedRequest?.sourceStem,
            wrapper?.reconstructedSourceApplicationFrame?.authorizationStatus,
            wrapper?.sourceFiniteSurfaceFrame?.formulaRealization,
            wrapper?.sourceFiniteSurfaceFrame?.wordRealization,
            [coalescence?.root, coalescence?.stockFormative,
                coalescence?.underlyingStemFormative, coalescence?.resultStock],
        ], [
            "authorized",
            row.path,
            row.path,
            "direct-canonical-result-observation",
            true,
            true,
            row.analysisId,
            "typed-lexical-source-analysis",
            "lexically-licensed-source-analysis",
            [row.root, row.stock, row.theme],
            expectedNotation(row),
            row.stem,
            row.underlying,
            "authorized",
            `#0-0(${row.underlying})0+0-0#`,
            row.stem.replaceAll("-", ""),
            [row.root, row.stock, row.theme, row.resultStock],
        ]);
    });

    const applications = CASES.map(row => evaluateDirect(ctx, row.stem));
    CASES.forEach((row, index) => {
        const application = applications[index];
        const sourceAnalysisFrame = application.resultFrame?.sourceAnalysisFrame;
        const analysis = findExactAnalysis(sourceAnalysisFrame, row);
        const notation = analysis?.reconstructionNotationFrame;
        s.eq(`${row.stem}: signed Source analysis carries the reconstruction note`, [
            application.authorizationStatus,
            ctx.isClassicalNahuatlVncApplicationFrame(application),
            ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceAnalysisFrame),
            analysis?.analysisId,
            analysis?.segments,
            analysis?.destockalStructureFrame?.steps?.stemFormation?.output,
            summarizeNotation(notation),
            notation?.destockalStructureFrame === analysis?.destockalStructureFrame,
            Object.isFrozen(notation),
        ], [
            "authorized",
            true,
            true,
            row.analysisId,
            [row.root, row.stock, row.theme],
            row.underlying,
            expectedNotation(row),
            true,
            true,
        ]);
    });

    const sourceProjections = CASES.map(row => (
        ctx.buildClassicalNahuatlVncSourceConstitutionProjection({
            sourceStem: row.stem,
            verbClass: "B",
            sourceValence: "intransitive",
            requestedDerivation: "direct",
        }, ctx)
    ));
    s.eq("the ordinary public Source projection explains only these exact reconstructions", (
        sourceProjections.map((projection, index) => {
            const row = CASES[index];
            return [
                projection?.authorizationStatus,
                projection?.sourceStem,
                ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
                    projection?.sourceAnalysisFrame,
                ),
                projection?.sourceAnalysis?.analysisId,
                projection?.sourceAnalysis?.reconstructionNotationFrame
                    === projection?.reconstructionNotationFrame,
                projection?.reconstructionNotationFrame?.destockalStructureFrame
                    === projection?.sourceAnalysis?.destockalStructureFrame,
                summarizeNotation(projection?.reconstructionNotationFrame),
                projection?.process?.includes(
                    `Here * marks the reconstructed underlying source (${row.underlying})`,
                ),
                projection?.process?.includes(
                    `the fused stem (${row.stem}) is extant`,
                ),
                projection?.process?.includes(
                    "It does not mark the form as ungrammatical.",
                ),
                projection?.process?.includes("nonextant"),
                projection?.grammarAuthority,
                Object.isFrozen(projection),
            ];
        })
    ), CASES.map(row => [
        "authorized",
        row.stem,
        true,
        row.analysisId,
        true,
        true,
        expectedNotation(row),
        true,
        true,
        true,
        false,
        false,
        true,
    ]));

    const rawProjections = CASES.map(row => (
        ctx.buildClassicalNahuatlDestockalIrregularSourceValidationFrame({
            requestedRelation: "extant-fused-source",
            sourceSelection: row.lexeme,
        })
    ));
    s.eq("raw owner projection binds notation to the actual Source and coalescence", (
        rawProjections.map((projection, index) => {
            const row = CASES[index];
            const source = projection.constraints.destockalIrregularSourceLifecycle
                .extantFusedSources[row.lexeme].sourceConstitution;
            const wrapper = source.reconstructionNotation;
            return [
                projection.authorizationStatus,
                ctx.isClassicalNahuatlDestockalIrregularSourceValidationFrame(projection),
                wrapper.notationFrame === wrapper.sourceAnalysis.reconstructionNotationFrame,
                wrapper.notationFrame.destockalStructureFrame
                    === wrapper.sourceAnalysis.destockalStructureFrame,
                wrapper.sourceAnalysisFrame.analyses.includes(wrapper.sourceAnalysis),
                wrapper.sourceApplicationFrame.resultFrame.sourceAnalysisFrame
                    === wrapper.sourceAnalysisFrame,
                ctx.isClassicalNahuatlVncApplicationFrame(
                    wrapper.reconstructedSourceApplicationFrame,
                ),
                ctx.isClassicalNahuatlVncFiniteSurfaceFrame(
                    wrapper.sourceFiniteSurfaceFrame,
                ),
                wrapper.sourceCoalescenceBoundaryFrame.applicableRuleFrames
                    .includes(wrapper.sourceCoalescenceFrame),
                wrapper.sourceCoalescenceFrame.underlyingMorphology,
                wrapper.reconstructedSourceApplicationFrame.resultFrame.formulaRealization,
                wrapper.reconstructedSourceApplicationFrame.resultFrame.surfaceRealization,
            ];
        })
    ), CASES.map(row => [
        "authorized",
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        { root: row.root, stockFormative: row.stock, stemFormative: row.theme },
        `#0-0(${row.underlying})0+0-0#`,
        row.stem.replaceAll("-", ""),
    ]));

    const compactApplications = CASES.map(row => evaluateDirect(ctx, row.compactStem));
    s.eq("editorial hyphens do not add or remove the exact reconstruction note", (
        compactApplications.map((application, index) => {
            const row = CASES[index];
            const analysis = findExactAnalysis(
                application.resultFrame?.sourceAnalysisFrame,
                row,
            );
            return [
                application.authorizationStatus,
                application.resultFrame?.surfaceRealization,
                analysis?.analysisId,
                summarizeNotation(analysis?.reconstructionNotationFrame),
            ];
        })
    ), CASES.map(row => [
        "authorized",
        row.compactStem,
        row.analysisId,
        expectedNotation(row),
    ]));

    const unlicensedInputs = [
        ...CASES.map(row => row.shortStem),
        "za-ā-ni",
    ];
    s.eq("short and open productive inputs do not borrow an exact reconstruction", (
        unlicensedInputs.map(sourceStem => {
            const application = evaluateDirect(ctx, sourceStem);
            const sourceAnalysisFrame = application.resultFrame?.sourceAnalysisFrame;
            return [
                application.authorizationStatus,
                ctx.isClassicalNahuatlVncApplicationFrame(application),
                sourceAnalysisFrame?.analyses?.some(analysis => (
                    analysis.reconstructionNotationFrame
                )),
            ];
        })
    ), unlicensedInputs.map(() => ["authorized", true, false]));

    const exactNotation = findExactAnalysis(
        applications[0].resultFrame?.sourceAnalysisFrame,
        CASES[0],
    ).reconstructionNotationFrame;
    const hasReconstructionNote = application => Boolean(
        application.resultFrame?.sourceAnalysisFrame?.analyses?.some(analysis => (
            analysis.reconstructionNotationFrame
        )),
    );
    const injected = evaluateDirect(ctx, "za-ā-ni", {
        reconstructionNotationFrame: exactNotation,
        notation: "*",
        reconstructedSourceStatus:
            "reconstructed-underlying-source-of-extant-fused-stem",
    });
    s.eq("a typed note cannot be minted by starred spelling or caller data", [
        CASES.map(row => {
            const starred = evaluateDirect(ctx, `*(${row.underlying})`);
            const unstarred = evaluateDirect(ctx, row.underlying);
            return [
                hasReconstructionNote(starred),
                hasReconstructionNote(unstarred),
                hasReconstructionNote(starred) === hasReconstructionNote(unstarred),
            ];
        }),
        hasReconstructionNote(evaluateDirect(ctx, "*(za-ā-ni)")),
        injected.authorizationStatus,
        findExactAnalysis(injected.resultFrame?.sourceAnalysisFrame, CASES[0]),
        hasReconstructionNote(injected),
        Object.hasOwn(injected.normalizedRequest || {}, "reconstructionNotationFrame"),
        ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(JSON.parse(JSON.stringify(
            applications[0].resultFrame.sourceAnalysisFrame,
        ))),
    ], [
        CASES.map(row => [
            row.lexeme === "cehui",
            row.lexeme === "cehui",
            true,
        ]),
        false,
        "authorized",
        null,
        false,
        false,
        false,
    ]);

    s.eq("notation remains read-only while canonical formulas, surfaces, and participants persist", (
        applications.map((application, index) => {
            const row = CASES[index];
            const notation = findExactAnalysis(
                application.resultFrame.sourceAnalysisFrame,
                row,
            ).reconstructionNotationFrame;
            return [
                application.resultFrame.formulaRealization,
                application.resultFrame.surfaceRealization,
                application.resultFrame.participantProjection.sourceSubject
                    === application.normalizedRequest.sourceSubjectFrame,
                notation.grammarAuthority,
                notation.sourceAdmissionAuthority,
                notation.formulaStringAuthority,
                notation.surfaceStringAuthority,
                notation.canvasExampleAuthority,
                notation.callerSuppliedGrammarAuthority,
            ];
        })
    ), CASES.map(row => [
        `#0-0(${row.stem})0+0-0#`,
        row.stem.replaceAll("-", ""),
        true,
        false,
        false,
        false,
        false,
        false,
        false,
    ]));

    return s;
}

module.exports = { run };
