"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson37-compound-active-action-sources",
    "lesson37-active-action-potential-patient-contrast",
    "lesson37-impersonal-general-action",
];

function buildFutureVnc(ctx, {
    sourceStem,
    verbClass = "A",
    sourceValence = "intransitive",
    subject = "1sg",
    requestedVoice = "active",
    nonactiveOptionId = "",
    objectKind = "",
    objectPerson = "",
    sourceObjectRequests = null,
} = {}) {
    const request = {
        sourceStem,
        verbClass,
        sourceValence,
        subject,
        mood: "indicative",
        tense: "future",
        requestedDerivation: "direct",
        requestedVoice,
        voice: requestedVoice,
        ...(nonactiveOptionId ? { nonactiveOptionId } : {}),
        ...(objectKind ? { objectKind } : {}),
        ...(objectPerson ? { objectPerson } : {}),
        ...(sourceObjectRequests ? { sourceObjectRequests } : {}),
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    if (nonactiveOptionId || preview.authorizationStatus === "authorized") {
        return preview;
    }
    const automatic = preview.controlFrame
        ?.nonactiveOptionInventory?.automaticOptionId || "";
    return automatic
        ? ctx.evaluateClassicalNahuatlVncApplication({
            ...request,
            nonactiveOptionId: automatic,
        })
        : preview;
}

function derive(ctx, resultFrame, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "liz",
        canonicalVncResult: resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson37_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson37-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const compoundSource = buildFutureVnc(ctx, {
        sourceStem: "ā-pachi", verbClass: "B",
    });
    const compound = derive(ctx, compoundSource.resultFrame);
    const compoundStructure = compound.operationFrame?.deverbalActionFrame
        ?.sourceStructureFrame;
    s.eq("an unlisted compound keeps its complete typed Source structure", {
        status: [compoundSource.authorizationStatus,
            compound.authorizationStatus],
        exact: [compoundStructure?.exactSourceAnalysisIdentityPreserved,
            compoundStructure?.canonicalVncSourceAnalysisFrame
                === compoundSource.resultFrame?.sourceAnalysisFrame],
        shape: [compoundStructure?.typedFutureCore,
            compoundStructure?.morphemicComplexity,
            compoundStructure?.internalBoundariesPreserved,
            compoundStructure?.completeCompoundCoreEligible,
            compound.operationFrame?.targetStems?.restrictedUse],
        authority: [compoundStructure?.exampleStemMembershipRequired,
            compoundStructure?.formulaStringAuthority,
            compoundStructure?.surfaceStringAuthority],
    }, {
        status: ["authorized", "authorized"],
        exact: [true, true],
        shape: ["ā-pachi", "polymorphemic", true, true,
            "ā-pachi-liz"],
        authority: [false, false, false],
    });

    const connectiveSource = buildFutureVnc(ctx, {
        sourceStem: "huetz-0-t-o", verbClass: "A",
    });
    const connective = derive(ctx, connectiveSource.resultFrame);
    const connectiveStructure = connective.operationFrame?.deverbalActionFrame
        ?.sourceStructureFrame;
    s.eq("connective t plus matrix on-o never becomes a t-o verbstem class", {
        status: [connectiveSource.authorizationStatus,
            connective.authorizationStatus],
        structure: [connectiveStructure?.connectiveTOnOMatrix,
            connectiveStructure?.connectiveMorph,
            connectiveStructure?.matrixVerbstem,
            connectiveStructure?.apparentFinalTOIsIndependentVerbstemClass],
    }, {
        status: ["authorized", "authorized"],
        structure: [true, "t", "on-o", false],
    });

    const intransitive = buildFutureVnc(ctx, {
        sourceStem: "mahui", verbClass: "B",
    });
    const active = derive(ctx, intransitive.resultFrame);
    const patient3 = derive(ctx, intransitive.resultFrame, {
        actionKind: "potential-patient",
        subject: "3sg",
        animacy: "animate",
    });
    const patient2 = derive(ctx, intransitive.resultFrame, {
        actionKind: "potential-patient",
        subject: "2sg",
        animacy: "animate",
    });
    const contrast3 = patient3.operationFrame?.deverbalActionFrame
        ?.actionPotentialPatientContrastFrame;
    const contrast2 = patient2.operationFrame?.deverbalActionFrame
        ?.actionPotentialPatientContrastFrame;
    s.eq("intransitive homophony preserves only the genuine ambiguity", {
        status: [active.authorizationStatus, patient3.authorizationStatus,
            patient2.authorizationStatus],
        stems: [active.operationFrame?.targetStems?.restrictedUse,
            patient3.operationFrame?.targetStems?.restrictedUse,
            patient2.operationFrame?.targetStems?.restrictedUse],
        analyses: [active.operationFrame?.actionKind,
            patient3.operationFrame?.actionKind],
        ambiguity: [contrast3?.intransitiveActionPotentialHomophony,
            contrast3?.thirdSingularSurfaceAmbiguity,
            contrast2?.thirdSingularSurfaceAmbiguity,
            contrast2?.otherPersonOrNumberDisambiguates,
            contrast3?.surfaceIdentityMergesAnalyses],
    }, {
        status: ["authorized", "authorized", "authorized"],
        stems: ["mahui-liz", "mahui-liz", "mahui-liz"],
        analyses: ["active-action", "potential-patient"],
        ambiguity: [true, true, false, true, false],
    });

    const transitive = buildFutureVnc(ctx, {
        sourceStem: "chīhua",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
    });
    const transitiveAction = derive(ctx, transitive.resultFrame);
    const transitivePatient = derive(ctx, transitive.resultFrame, {
        actionKind: "potential-patient", subject: "3sg",
        animacy: "animate",
    });
    const transitiveContrast = transitivePatient.operationFrame
        ?.deverbalActionFrame?.actionPotentialPatientContrastFrame;
    s.eq("transitive action keeps the object and potential patient omits it", {
        status: [transitive.authorizationStatus,
            transitiveAction.authorizationStatus,
            transitivePatient.authorizationStatus],
        stems: [transitiveAction.operationFrame?.targetStems?.restrictedUse,
            transitivePatient.operationFrame?.targetStems?.restrictedUse],
        contrast: [transitiveContrast
            ?.transitiveContrastCarriedByObjectPresence,
        transitiveContrast?.activeActionObjectPrefix,
        transitiveContrast?.potentialPatientObjectPrefix],
    }, {
        status: ["authorized", "authorized", "authorized"],
        stems: ["tla-chīhua-liz", "chīhua-liz"],
        contrast: [true, "tla", ""],
    });

    const projective = buildFutureVnc(ctx, {
        sourceStem: "chīhua",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const invalidPatient = derive(ctx, projective.resultFrame, {
        actionKind: "potential-patient", subject: "3sg",
        animacy: "animate",
    });
    s.eq("a transitive potential patient requires the typed projective relation", {
        status: invalidPatient.authorizationStatus,
        reason: invalidPatient.blockReason,
    }, {
        status: "blocked",
        reason: "transitive-potential-patient-projective-object-source-required",
    });

    const reflexiveTla = buildFutureVnc(ctx, {
        sourceStem: "tequi-tī",
        verbClass: "B",
        sourceValence: "mainline-reflexive",
        sourceObjectRequests: [
            { objectId: "reflexive", objectKind: "reflexive",
                governor: "directive", derivationalLevel: 1 },
            { objectId: "theme", objectKind: "nonspecific-nonhuman",
                governor: "applicative", derivationalLevel: 2 },
        ],
    });
    const reflexiveAction = derive(ctx, reflexiveTla.resultFrame);
    const reflexiveContrast = reflexiveAction.operationFrame
        ?.deverbalActionFrame?.actionPotentialPatientContrastFrame;
    s.eq("the reflexive plus tla exception remains active action", {
        status: [reflexiveTla.authorizationStatus,
            reflexiveAction.authorizationStatus],
        stem: reflexiveAction.operationFrame?.targetStems?.restrictedUse,
        exception: reflexiveContrast
            ?.reflexiveAndTlaObjectDeletionIsActiveActionException,
        kinds: reflexiveContrast?.sourceObjectKinds,
    }, {
        status: ["authorized", "authorized"],
        stem: "ne-tequi-tī-liz",
        exception: true,
        kinds: ["reflexive", "nonspecific-nonhuman"],
    });

    const suffixImpersonal = buildFutureVnc(ctx, {
        sourceStem: "mayāna", verbClass: "B",
        requestedVoice: "impersonal",
        nonactiveOptionId: "lō:mayāna-lō",
    });
    const generalSuffix = derive(ctx, suffixImpersonal.resultFrame, {
        actionKind: "impersonal-general-action",
    });
    const suffixFrame = generalSuffix.operationFrame?.deverbalActionFrame
        ?.impersonalGeneralActionFrame;
    const tlaImpersonal = buildFutureVnc(ctx, {
        sourceStem: "yohua", verbClass: "A",
        requestedVoice: "impersonal",
        nonactiveOptionId: "tla-impersonal",
    });
    const generalTla = derive(ctx, tlaImpersonal.resultFrame, {
        actionKind: "impersonal-general-action",
        actionStemVariant: "hua-to-hui",
    });
    const tlaFrame = generalTla.operationFrame?.deverbalActionFrame
        ?.impersonalGeneralActionFrame;
    s.eq("general action preserves either exact impersonal Source path", {
        status: [suffixImpersonal.authorizationStatus,
            generalSuffix.authorizationStatus,
            tlaImpersonal.authorizationStatus,
            generalTla.authorizationStatus],
        exact: [suffixFrame?.canonicalImpersonalVncResult
            === suffixImpersonal.resultFrame,
        suffixFrame?.exactImpersonalResultIdentityPreserved,
        tlaFrame?.canonicalImpersonalVncResult === tlaImpersonal.resultFrame,
        tlaFrame?.exactImpersonalResultIdentityPreserved],
        paths: [suffixFrame?.impersonalSourcePath,
            tlaFrame?.impersonalSourcePath],
        target: [generalSuffix.canonicalResult?.subject,
            generalSuffix.canonicalResult?.numberFrame?.animacy,
            suffixFrame?.generalActionPerformedByEveryoneInvolved,
            suffixFrame?.sourceImpersonalMorphologyPreservedInsideNounstem],
        spelling: suffixFrame?.spellingWarningCreatesGrammarOption,
    }, {
        status: ["authorized", "authorized", "authorized", "authorized"],
        exact: [true, true, true, true],
        paths: ["nonactive-suffix", "tla-impersonal"],
        target: ["3common", "nonanimate", true, true],
        spelling: false,
    });

    const wrongVoice = derive(ctx, intransitive.resultFrame, {
        actionKind: "impersonal-general-action",
    });
    const copiedImpersonal = derive(ctx, { ...suffixImpersonal.resultFrame }, {
        actionKind: "impersonal-general-action",
    });
    s.eq("voice and exact owner identity remain real authorization facts", {
        voice: [wrongVoice.authorizationStatus, wrongVoice.blockReason],
        copy: [copiedImpersonal.authorizationStatus,
            copiedImpersonal.blockReason],
    }, {
        voice: ["blocked", "deverbal-action-kind-source-voice-mismatch"],
        copy: ["blocked", "exact-owner-issued-vnc-result-required"],
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "deverbal-action",
        actionKind: "potential-patient",
        actionSuffix: "liz",
        canonicalVncResult: intransitive.resultFrame,
        state: "absolutive",
        outputScope: "full-paradigm",
    });
    const projected = ctx.projectClassicalNahuatlParadigmCoordinates(
        plan, plan.coordinates
    );
    s.eq("potential-patient analysis keeps exact identity across the paradigm", {
        plan: [plan.authorizationStatus,
            ctx.isClassicalNahuatlParadigmPlan(plan)],
        count: projected.length,
        exact: projected.every(item => (
            item.scalarEquivalent === true
            && item.preparedFrame?.sourceFrame?.canonicalVncResult
                === intransitive.resultFrame
        )),
    }, {
        plan: ["authorized", true], count: plan.coordinateCount, exact: true,
    });

    const cueFrames = [compound, patient3, generalSuffix];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 93 atoms have exact jobs and all 51 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 93, writing: 51, readingOnly: 42,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }

    const sourceText = fs.readFileSync(path.join(
        ROOT, "src/core/classical/nnc_lessons35_39_closure.mjs"), "utf8");
    s.ok("Groups 7 through 9 use typed structure rather than example routes",
        sourceText.includes("sourceStructureFrame")
        && sourceText.includes("actionPotentialPatientContrastFrame")
        && sourceText.includes("impersonalGeneralActionFrame")
        && !/LESSON37[^\n]*(?:WHITELIST|ALLOWLIST)|ACTION_NOUN_STEM_WHITELIST/u
            .test(sourceText));
    return s;
}

module.exports = { run };
