"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson37-action-nnc-continuations",
    "lesson37-z-liz-tzin-assimilation",
    "lesson37-active-passive-action-contrast",
];

function buildVnc(ctx, {
    sourceStem,
    verbClass = "A",
    sourceValence = "intransitive",
    subject = "1sg",
    tense = "future",
    voice = "active",
    objectKind = "",
    objectPerson = "",
} = {}) {
    const request = {
        sourceStem,
        verbClass,
        sourceValence,
        subject,
        mood: "indicative",
        tense,
        requestedDerivation: "direct",
        requestedVoice: voice,
        voice,
        ...(objectKind ? { objectKind } : {}),
        ...(objectPerson ? { objectPerson } : {}),
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const automatic = preview.controlFrame
        ?.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame?.nonactiveOptionInventory?.options?.[0]
            ?.optionId
        || "";
    return automatic
        ? ctx.evaluateClassicalNahuatlVncApplication({
            ...request, nonactiveOptionId: automatic,
        })
        : preview;
}

function action(ctx, sourceStem, suffix = "liz", fields = {}) {
    const vnc = buildVnc(ctx, { sourceStem, ...fields });
    const nnc = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: suffix,
        canonicalVncResult: vnc.resultFrame,
        subject: "3common",
        state: fields.state || "absolutive",
        animacy: "nonanimate",
    });
    return { vnc, nnc };
}

function nominalContinuation(ctx, nnc, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "nominal-continuation",
        canonicalNncResult: nnc.canonicalResult,
        source: {
            matrixStem: "cal",
            matrixClass: "tli",
            ...(fields.source || {}),
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson37_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson37-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const unlisted = action(ctx, "xopani", "liz", { verbClass: "B" });
    const nominal = nominalContinuation(ctx, unlisted.nnc);
    const capture = ctx.captureClassicalNahuatlActionNncResultForContinuation(
        unlisted.nnc.canonicalResult
    );
    const continuation = nominal.operationFrame?.actionNncContinuationFrame;
    s.eq("an unlisted exact action NNC Result continues into an NNC compound", {
        statuses: [unlisted.vnc.authorizationStatus,
            unlisted.nnc.authorizationStatus, capture.authorizationStatus,
            nominal.authorizationStatus],
        exact: [ctx.isClassicalNahuatlActionNncContinuationCaptureFrame(
            capture),
        capture.canonicalActionNncResult === unlisted.nnc.canonicalResult,
        capture.canonicalFutureVncResult === unlisted.vnc.resultFrame,
        continuation?.canonicalActionNncResult
            === unlisted.nnc.canonicalResult,
        continuation?.canonicalFutureVncResult === unlisted.vnc.resultFrame,
        continuation?.exactActionNncResultIdentityPreserved,
        continuation?.completeCanonicalSourceAnalysisPreserved],
        path: [continuation?.sourceNounstem,
            continuation?.selectedMatrix,
            continuation?.selectedSemanticRelation,
            continuation?.resultFamily,
            nominal.operationFrame?.targetStems?.restrictedUse],
        authority: continuation
            ?.copiedStringOrExampleIdentityAuthorizesContinuation,
    }, {
        statuses: ["authorized", "authorized", "authorized", "authorized"],
        exact: [true, true, true, true, true, true, true],
        path: ["xopani-liz", "cal", "nounstem-compound-embed", "nnc",
            "xopani-liz-cal"],
        authority: false,
    });

    const verbal = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "verbal-continuation",
        canonicalNncResult: unlisted.nnc.canonicalResult,
        source: {
            matrixStem: "cui",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            sourceState: "absolutive",
        },
        relation: "adverb",
        adverbRole: "manner",
        orientation: "subject",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
    });
    const verbalFrame = verbal.operationFrame?.actionNncContinuationFrame;
    s.eq("the same exact action Result can enter the canonical VNC compound path", {
        status: verbal.authorizationStatus,
        reason: verbal.blockReason,
        exact: verbalFrame?.canonicalActionNncResult
            === unlisted.nnc.canonicalResult,
        relation: [verbalFrame?.selectedSemanticRelation,
            verbalFrame?.resultFamily,
            verbal.operationFrame?.continuationRelation],
        target: verbal.operationFrame?.targetStems?.restrictedUse,
    }, {
        status: "authorized", reason: "", exact: true,
        relation: ["adverb", "vnc", "adverb"],
        target: verbal.operationFrame?.targetStems?.restrictedUse,
    });

    const copied = nominalContinuation(ctx, {
        canonicalResult: { ...unlisted.nnc.canonicalResult },
    });
    const jsonCopy = nominalContinuation(ctx, {
        canonicalResult: JSON.parse(JSON.stringify(
            unlisted.nnc.canonicalResult
        )),
    });
    const manual = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "nominal-continuation",
        source: {
            sourceStage: "derived-nounstem",
            sourceStem: "xopani-liz",
            derivationKind: "active-action-liz",
            matrixStem: "cal",
            matrixClass: "tli",
        },
        subject: "3sg",
        state: "absolutive",
    });
    s.eq("copies and typed-looking action strings cannot authorize continuation", {
        copied: [copied.authorizationStatus, copied.blockReason],
        json: [jsonCopy.authorizationStatus, jsonCopy.blockReason],
        manual: [manual.authorizationStatus, manual.blockReason],
    }, {
        copied: ["blocked",
            "exact-owner-issued-active-action-nnc-result-required"],
        json: ["blocked",
            "exact-owner-issued-active-action-nnc-result-required"],
        manual: ["blocked",
            "exact-owner-issued-active-action-nnc-result-required"],
    });

    const zAction = action(ctx, "miqui", "z", { verbClass: "B" });
    const zTzin = nominalContinuation(ctx, zAction.nnc, {
        source: { matrixStem: "tzin", matrixClass: "tli" },
    });
    const lizAction = action(ctx, "chōca", "liz", { verbClass: "A" });
    const lizTzin = nominalContinuation(ctx, lizAction.nnc, {
        source: { matrixStem: "tzin", matrixClass: "tli" },
    });
    const zBoundary = zTzin.operationFrame?.tzinBoundaryFrame;
    const lizBoundary = lizTzin.operationFrame?.tzinBoundaryFrame;
    s.eq("z and liz before tzin assimilate automatically but keep analysis", {
        statuses: [zTzin.authorizationStatus, lizTzin.authorizationStatus],
        targets: [zTzin.operationFrame?.targetStems?.restrictedUse,
            lizTzin.operationFrame?.targetStems?.restrictedUse],
        z: [zBoundary?.underlyingBoundary,
            zBoundary?.phonologicalOutcome,
            zBoundary?.conventionalWrittenBoundary,
            zBoundary?.finalZOrLizAnalysisPreserved,
            zBoundary?.assimilationAutomatic],
        liz: [lizBoundary?.underlyingActionNounstem,
            lizBoundary?.finalZOrLizAnalysisPreserved],
        choice: zBoundary?.userChoosesAssimilationOrDoubledSpelling,
    }, {
        statuses: ["authorized", "authorized"],
        targets: ["miqui-tzin", "chōqui-li-tzin"],
        z: ["z+tzin", "tz+tz", "tzin", true, true],
        liz: ["chōqui-liz", true],
        choice: false,
    });

    const activePossessive = action(ctx, "itta", "liz", {
        verbClass: "A",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
        subject: "1sg",
        state: "possessive",
    });
    const activeRole = activePossessive.nnc.operationFrame
        ?.actionVoicePossessorRoleFrame;
    const passiveVnc = buildVnc(ctx, {
        sourceStem: "itta",
        verbClass: "A",
        sourceValence: "specific-projective",
        subject: "1sg",
        tense: "distant-past",
        voice: "passive",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const passiveNnc = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "passive-action",
        canonicalVncResult: passiveVnc.resultFrame,
        subject: "3common",
        state: "possessive",
        animacy: "nonanimate",
    });
    const passiveRole = passiveNnc.operationFrame
        ?.actionVoicePossessorRoleFrame;
    s.eq("typed voice derives agent versus patient possessor roles", {
        statuses: [activePossessive.nnc.authorizationStatus,
            passiveVnc.authorizationStatus, passiveNnc.authorizationStatus],
        active: [activeRole?.sourceVoice, activeRole?.possessorRole,
            activeRole?.transformedPossessor,
            activeRole?.typedVoiceHistoryPreserved],
        passive: [passiveRole?.sourceVoice, passiveRole?.possessorRole,
            passiveRole?.transformedPossessor,
            passiveRole?.typedVoiceHistoryPreserved],
        derived: [activeRole?.possessorRoleDerivedFromTypedVoice,
            passiveRole?.possessorRoleDerivedFromTypedVoice,
            activeRole?.manualPossessorRoleChoiceRequired,
            passiveRole?.manualPossessorRoleChoiceRequired],
        overlap: [activeRole?.surfaceOrTranslationOverlapCanOccur,
            activeRole?.surfaceOrTranslationOverlapMergesAnalyses],
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        active: ["active", "agent", "1sg", true],
        passive: ["passive", "patient", "3sg", true],
        derived: [true, true, false, false],
        overlap: [true, false],
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "nominal-continuation",
        canonicalNncResult: unlisted.nnc.canonicalResult,
        source: { matrixStem: "cal", matrixClass: "tli" },
        outputScope: "full-paradigm",
    });
    const projected = plan.authorizationStatus === "authorized"
        ? ctx.projectClassicalNahuatlParadigmCoordinates(
            plan, plan.coordinates
        )
        : [];
    s.eq("exact action Result survives nominal-continuation paradigms", {
        plan: [plan.authorizationStatus,
            plan.authorizationStatus === "authorized"
                && ctx.isClassicalNahuatlParadigmPlan(plan)],
        count: projected.length,
        exact: projected.every(item => (
            item.scalarEquivalent === true
            && item.preparedFrame?.operationFrame
                ?.actionNncContinuationFrame?.canonicalActionNncResult
                === unlisted.nnc.canonicalResult
        )),
    }, {
        plan: ["authorized", true], count: plan.coordinateCount, exact: true,
    });

    const cueFrames = [nominal, zTzin, activePossessive.nnc, passiveNnc];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 67 atoms have exact jobs and all 37 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 67, writing: 37, readingOnly: 30,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("the live Grammar path exposes only the real continuation choices",
        shell.includes('value="nominal-continuation"')
        && shell.includes('value="verbal-continuation"')
        && shell.includes("Compound matrix stem")
        && shell.includes("Embed–matrix relation")
        && !shell.includes("Choose assimilation")
        && !shell.includes("Possessor role"));
    return s;
}

module.exports = { run };
