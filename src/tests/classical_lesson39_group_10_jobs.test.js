"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-characteristic-extended-notes";

function buildVnc(ctx, {
    sourceStem,
    verbClass = "A",
    sourceValence = "intransitive",
    subject = "3sg",
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
        tense: "distant-past",
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

function action(ctx, kind, fields = {}) {
    const vnc = buildVnc(ctx, fields);
    const nnc = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: kind,
        canonicalVncResult: vnc.resultFrame,
        subject: "3common",
        state: fields.state || "absolutive",
        possessor: fields.possessor || "",
        animacy: "nonanimate",
    });
    return { vnc, nnc };
}

function continueCharacteristic(ctx, canonicalResult) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "nominal-continuation",
        canonicalNncResult: canonicalResult,
        source: { matrixStem: "yō", matrixClass: "tl" },
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_10_jobs");
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
    }, { atoms: 74, writing: 42, reading: 32, accepted: true });

    const passive = action(ctx, "passive-action", {
        sourceStem: "chīhua",
        verbClass: "A",
        sourceValence: "specific-projective",
        voice: "passive",
        objectKind: "specific-projective",
        objectPerson: "1sg",
    });
    const passiveFrame = passive.nnc.operationFrame
        ?.actionCharacteristicFrame;
    const passiveCapture = ctx
        .captureClassicalNahuatlActionNncResultForContinuation(
            passive.nnc.canonicalResult
        );
    const passiveContinuation = continueCharacteristic(
        ctx, passive.nnc.canonicalResult
    );
    s.eq("a passive-action Result carries the characteristic path", {
        statuses: [passive.vnc.authorizationStatus,
            passive.nnc.authorizationStatus,
            passiveCapture.authorizationStatus,
            passiveContinuation.authorizationStatus],
        exact: [passiveFrame?.canonicalVncResult === passive.vnc.resultFrame,
            passiveCapture.canonicalActionNncResult
                === passive.nnc.canonicalResult,
            passiveCapture.canonicalFutureVncResult
                === passive.vnc.resultFrame],
        kind: [passiveFrame?.actionKind, passiveCapture.actionKind],
        stems: [passiveFrame?.characteristicEmbedStem,
            passiveFrame?.characteristicRestrictedUseStem,
            passiveCapture.sourceStem,
            passiveContinuation.operationFrame?.targetStems?.restrictedUse],
        formulas: [passive.nnc.formulaRealization,
            passiveContinuation.formulaRealization],
    }, {
        statuses: ["authorized", "authorized", "authorized", "authorized"],
        exact: [true, true, true],
        kind: ["passive-action", "passive-action"],
        stems: ["chīhua-lō-ca", "chīhua-lō-cā-yō", "chīhua-lō-ca",
            "chīhua-lō-cā-yō"],
        formulas: ["#0-0(chīhua-lō-cā-yō)tl-0#",
            "#0-0(chīhua-lō-cā-yō)tl-0#"],
    });

    const active = action(ctx, "active-action", {
        sourceStem: "chiy-ā-hua",
        sourceValence: "intransitive",
        voice: "active",
    });
    const activeFrame = active.nnc.operationFrame
        ?.actionCharacteristicFrame;
    const activeCapture = ctx
        .captureClassicalNahuatlActionNncResultForContinuation(
            active.nnc.canonicalResult
        );
    s.eq("an active-action Result keeps both homophonous analyses apart", {
        statuses: [active.vnc.authorizationStatus,
            active.nnc.authorizationStatus,
            activeCapture.authorizationStatus],
        stems: [activeFrame?.characteristicEmbedStem,
            activeFrame?.characteristicRestrictedUseStem],
        exact: activeCapture.canonicalActionNncResult
            === active.nnc.canonicalResult,
        ambiguity: [activeFrame?.homophonousSurfaceMayHaveBothAnalyses,
            activeFrame?.actionAndPreteritAgentiveAnalysesRemainDistinct,
            activeFrame?.surfaceOrEnglishTranslationSelectsAnalysis,
            activeFrame
                ?.contextualAnalysisChoiceRequiredOnlyWhenBothTypedSourcesRemainPossible,
            activeFrame?.typedSourceAlreadySettlesAnalysis],
        readings: activeFrame?.actionAndStateReadingsRemainAvailable,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        stems: ["chiy-ā-hua-ca", "chiy-ā-hua-cā-yō"],
        exact: true,
        ambiguity: [true, true, false, true, true],
        readings: true,
    });

    const unlisted = action(ctx, "active-action", {
        sourceStem: "zom",
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const unlistedFrame = unlisted.nnc.operationFrame
        ?.actionCharacteristicFrame;
    const unlistedCapture = ctx
        .captureClassicalNahuatlActionNncResultForContinuation(
            unlisted.nnc.canonicalResult
        );
    s.eq("compatible unlisted typed action Sources remain productive", {
        statuses: [unlisted.vnc.authorizationStatus,
            unlisted.nnc.authorizationStatus,
            unlistedCapture.authorizationStatus],
        stems: [unlistedFrame?.characteristicEmbedStem,
            unlistedFrame?.characteristicRestrictedUseStem],
        productive:
            unlistedFrame?.compatibleUnlistedActionResultsRemainProductive,
        exampleGate: unlistedFrame?.exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        stems: ["zon-ca", "zon-cā-yō"],
        productive: true,
        exampleGate: false,
    });

    const copied = ctx.captureClassicalNahuatlActionNncResultForContinuation({
        ...active.nnc.canonicalResult,
    });
    const reconstructed = activeFrame;
    s.eq("copies and reconstructed intermediates never authorize the route", {
        copy: [copied.authorizationStatus, copied.blockReason],
        reconstruction: [
            reconstructed?.completePolymorphemicSourceHistoryPreserved,
            reconstructed?.reconstructedIntermediateVncIsReadingEvidenceOnly,
            reconstructed?.reconstructedIntermediateVncAuthorizesProductiveRoute,
        ],
        authority: [activeCapture.grammarAuthority,
            activeCapture.formulaStringAuthority,
            activeCapture.surfaceStringAuthority],
    }, {
        copy: ["blocked",
            "exact-owner-issued-active-action-nnc-result-required"],
        reconstruction: [true, true, false],
        authority: [false, false, false],
    });

    const cues = [passive.nnc, active.nnc].flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { atoms: 74, writing: 42, reading: 32,
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
