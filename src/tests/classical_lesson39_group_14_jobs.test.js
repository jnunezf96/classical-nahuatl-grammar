"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-use-and-reading";

function buildImperfective(ctx, fields = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "cuica",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...fields,
    });
}

function imperfectivePatientive(ctx, fields = {}) {
    const application = buildImperfective(ctx, fields.source || {});
    const result = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "impersonal",
        canonicalVncResult: application.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...(fields.request || {}),
    });
    return { application, result };
}

function rootStock(ctx, allomorph) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "root-or-stock",
        rootStockAllomorph: allomorph,
        source: {
            sourceStage: "root-or-stock",
            sourceStem: "tom-ā-hua",
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_14_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    s.eq("accepted group has the exact atom-job denominator", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
    }, { atoms: 15, writing: 3, reading: 12, accepted: true });

    const { application, result } = imperfectivePatientive(ctx);
    const use = result.operationFrame?.patientiveUseFrame;
    s.eq("the exact typed derivation settles the patientive procedure", {
        statuses: [application.authorizationStatus, result.authorizationStatus],
        procedures: use?.procedureInventory,
        selected: use?.selectedProcedure,
        exactSource: use?.selectedTypedSourceFrame === result.sourceFrame,
        multipleMayApply:
            use?.multipleProceduresMayBeLicensedForOneLexicalSource,
        universal: use?.multipleProceduresAreUniversalForEverySource,
        independentAuthorization:
            use?.eachProcedureRequiresItsOwnTypedSourceAuthorization,
        settled: use?.currentExactTypedSourceSettlesProcedure,
        choiceNow: use?.contextualInterpretationChoiceRequired,
        choiceOnlyIfTypedAlternatives:
            use?.contextualInterpretationChoiceRequiredOnlyWhenTypedAlternativesRemain,
    }, {
        statuses: ["authorized", "authorized"],
        procedures: ["passive-core", "impersonal-core",
            "perfective-active-core", "imperfective-active-core",
            "root-or-stock"],
        selected: "imperfective-active-core",
        exactSource: true,
        multipleMayApply: true,
        universal: false,
        independentAuthorization: true,
        settled: true,
        choiceNow: false,
        choiceOnlyIfTypedAlternatives: true,
    });

    const stockC = rootStock(ctx, "c");
    const stockZero = rootStock(ctx, "zero");
    const cUse = stockC.operationFrame?.patientiveUseFrame;
    const zeroUse = stockZero.operationFrame?.patientiveUseFrame;
    s.eq("overlapping translations never merge distinct canonical Results", {
        statuses: [stockC.authorizationStatus, stockZero.authorizationStatus],
        targets: [cUse?.selectedTargetStem, zeroUse?.selectedTargetStem],
        surfaces: [stockC.wordSurface, stockZero.wordSurface],
        distinctResults: stockC.canonicalResult !== stockZero.canonicalResult,
        overlapAllowed:
            cUse?.synonymousTranslationMayCoverDistinctPatientiveConstructions,
        sameMeaningGuaranteed:
            cUse?.synonymousTranslationGuaranteesIdenticalMeaning,
        idiomaticRestriction:
            zeroUse?.differingFormationMayCarryIdiomaticRestriction,
        surfaceMerges: zeroUse?.surfaceIdentityMergesProcedures,
    }, {
        statuses: ["authorized", "authorized"],
        targets: ["tom-a-c", "tom-a"],
        surfaces: ["tomactli", "tomatl"],
        distinctResults: true,
        overlapAllowed: true,
        sameMeaningGuaranteed: false,
        idiomaticRestriction: true,
        surfaceMerges: false,
    });

    const hostile = imperfectivePatientive(ctx, {
        request: { patientiveTranslation: "opossum" },
    }).result;
    s.eq("translation and example identity cannot authorize patientive structure", {
        hostile: [hostile.authorizationStatus, hostile.blockReason],
        authority: [use?.translationSelectsProcedure,
            use?.translationAuthorizesStructure,
            use?.displayedMeaningAuthorizesStructure,
            use?.examplesAuthorizeProcedure],
        productive: use?.compatibleUnlistedTypedSourcesRemainProductive,
    }, {
        hostile: ["blocked",
            "caller-supplied-derived-authority-rejected:request.patientiveTranslation"],
        authority: [false, false, false, false],
        productive: true,
    });

    const cueResults = [result, stockC, stockZero];
    const cues = cueResults.flatMap(candidate => (
        ctx.getClassicalFormulaDerivedAnnotations(
            candidate.formulaRealization,
            candidate.canonicalResult?.nncSlotFrame,
            candidate
        )
    )).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { atoms: 15, writing: 3, reading: 12,
        cues: true, covered: true });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }
    return s;
}

module.exports = { run };
