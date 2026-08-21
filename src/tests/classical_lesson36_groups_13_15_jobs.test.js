"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson36-active-action-general-use",
    "lesson36-active-action-restricted-use",
    "lesson36-active-action-preterit-agentive-contrast",
];

function buildVnc(ctx, {
    sourceStem = "catz-ā-hua",
    verbClass = "A",
    sourceValence = "intransitive",
    subject = "1sg",
    tense = "distant-past",
    voice = "active",
    objectKind = "",
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
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const nonactiveOptionId = preview.controlFrame
        ?.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame?.nonactiveOptionInventory?.options?.[0]
            ?.optionId
        || "";
    return nonactiveOptionId
        ? ctx.evaluateClassicalNahuatlVncApplication({
            ...request,
            nonactiveOptionId,
        })
        : preview;
}

function nominalize(ctx, kind, result, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: kind,
        canonicalVncResult: result,
        subject: "2pl",
        state: "absolutive",
        animacy: "animate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson36_groups_13_15_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson36-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const activeSource = buildVnc(ctx);
    const generalResult = nominalize(
        ctx,
        "active-action",
        activeSource.resultFrame,
        { state: "possessive", possessor: "3pl" }
    );
    const general = generalResult.operationFrame
        ?.generalUseActiveActionFrame;
    s.eq("general use is derived from the exact active distant-past Result", {
        statuses: [activeSource.authorizationStatus,
            generalResult.authorizationStatus],
        exact: [general?.exactActiveDistantPastResultRequired,
            general?.generalUseSourceFrame?.canonicalVncResult
                === activeSource.resultFrame],
        source: [general?.sourceStage, general?.sourceVoice,
            general?.sourceValence, general?.sourcePredicateStem],
        stem: [general?.generalUseStem,
            general?.finalDistantPastMorph,
            general?.finalDistantPastMorphIsLastConstituent],
        participants: [general?.sourceSubject,
            general?.sourceSubjectBecomesPossessor,
            generalResult.canonicalResult?.possessor,
            generalResult.canonicalResult?.subject,
            generalResult.canonicalResult?.numberFrame?.animacy],
        class: [general?.nounClass, general?.nounSubclass],
        manual: general?.manualCaReflexivePossessorOrClassChoiceRequired,
        exampleGate: general?.exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized"],
        exact: [true, true],
        source: ["distant-past-predicate", "active", "intransitive",
            "catz-ā-hua"],
        stem: ["catz-ā-hua-ca", "ca", true],
        participants: ["1sg", true, "1sg", "3common", "nonanimate"],
        class: ["tl", "tl-1-b"],
        manual: false,
        exampleGate: false,
    });

    const reflexiveSource = buildVnc(ctx, {
        sourceStem: "cuepa",
        sourceValence: "mainline-reflexive",
        subject: "1sg",
        objectKind: "reflexive",
    });
    const reflexiveGeneral = nominalize(
        ctx,
        "active-action",
        reflexiveSource.resultFrame,
        { state: "possessive" }
    );
    const reflexive = reflexiveGeneral.operationFrame
        ?.generalUseActiveActionFrame;
    s.eq("mainline reflexive and Source subject transform automatically", {
        statuses: [reflexiveSource.authorizationStatus,
            reflexiveGeneral.authorizationStatus],
        objectPattern: reflexive?.sourceObjectPattern,
        shuntline: [reflexive?.reflexiveUsesShuntlineNe,
            reflexive?.reflexiveShuntlineSatisfied,
            reflexive?.generalUseStem],
        possessor: reflexiveGeneral.canonicalResult?.possessor,
    }, {
        statuses: ["authorized", "authorized"],
        objectPattern: "reflexive",
        shuntline: [true, true, "ne-cuepa-ca"],
        possessor: "1sg",
    });

    const unlistedSource = buildVnc(ctx, {
        sourceStem: "xopani",
        verbClass: "B",
        subject: "2sg",
    });
    const unlistedGeneral = nominalize(
        ctx,
        "active-action",
        unlistedSource.resultFrame,
        { state: "possessive" }
    );
    s.eq("an unlisted typed Source shape follows the same rule", [
        unlistedSource.authorizationStatus,
        unlistedGeneral.authorizationStatus,
        unlistedGeneral.operationFrame?.generalUseActiveActionFrame
            ?.exampleStemMembershipRequired,
        unlistedGeneral.canonicalResult?.possessor,
    ], ["authorized", "authorized", false, "2sg"]);

    const restrictedResult = nominalize(
        ctx,
        "active-action",
        activeSource.resultFrame,
        { state: "absolutive" }
    );
    const restricted = restrictedResult.operationFrame
        ?.restrictedUseActiveActionFrame;
    s.eq("restricted use recaptures the typed general-use Source", {
        status: restrictedResult.authorizationStatus,
        retained: [restricted?.generalUseSourceIdentityRetained,
            restricted?.exactGeneralUseSourceFrame
                === restrictedResult.operationFrame
                    ?.generalUseActiveActionFrame?.generalUseSourceFrame],
        stems: [restricted?.generalUseStem,
            restricted?.restrictedUseStem],
        structure: [restricted?.protectedDistantPastMorph,
            restricted?.yoTlMatrix,
            restricted?.protectedCaImmediatelyPrecedesYo],
        target: [restrictedResult.canonicalResult?.subject,
            restrictedResult.canonicalResult?.numberFrame?.animacy],
        meaning: restricted?.semanticScope,
        manual: restricted?.manualCaYoMatrixOrClassChoiceRequired,
    }, {
        status: "authorized",
        retained: [true, true],
        stems: ["catz-ā-hua-ca", "catz-ā-hua-cā-yō"],
        structure: ["cā", "yō-tl", true],
        target: ["3common", "nonanimate"],
        meaning: ["action", "state", "means", "source", "result"],
        manual: false,
    });

    const preteritSource = buildVnc(ctx, {
        tense: "preterit",
        subject: "3sg",
    });
    const preteritAgentive = nominalize(
        ctx,
        "preterit-agentive",
        preteritSource.resultFrame,
        { state: "possessive", possessor: "1sg", subject: "3sg" }
    );
    const contrast = generalResult.operationFrame
        ?.actionPreteritContrastFrame;
    s.eq("homophonous-looking Sources keep their histories and classes", {
        statuses: [generalResult.authorizationStatus,
            preteritSource.authorizationStatus,
            preteritAgentive.authorizationStatus],
        selected: contrast?.selectedAnalysis,
        active: contrast?.activeActionAnalysis,
        agentive: contrast?.preteritAgentiveAnalysis,
        possibleIdentity: contrast?.phonologicalIdentityCanOccur,
        merged: contrast?.phonologicalIdentityMergesAnalyses,
        reconstructed: contrast?.sourceReconstructedFromSurfaceString,
        continuation: contrast
            ?.compatibleContinuationSelectedFromTypedAnalysis,
        preteritClass: preteritAgentive.operationFrame
            ?.possessiveAgentiveFrame?.sourceSubclass,
        distinctFormulas: generalResult.formulaRealization
            !== preteritAgentive.formulaRealization,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        selected: "active-action",
        active: {
            sourceStage: "distant-past-predicate",
            finalTenseMorph: "ca",
            matrixNounstem: "",
            nounClass: "tl",
            nounSubclass: "tl-1-b",
            meaningScope: ["action", "result-of-action", "resultant-state"],
            sourceSubjectBecomesPossessor: true,
        },
        agentive: {
            sourceStage: "preterit-predicate",
            finalTenseMorph: "0",
            matrixNounstem: "cā-tl",
            nounClass: "tl",
            nounSubclass: "tl-1-a",
            meaningScope: ["agent", "entrant-into-state", "thing-in-state"],
            sourceSubjectRemainsNncSubject: true,
            possessorImportedOutsideSource: true,
        },
        possibleIdentity: true,
        merged: false,
        reconstructed: false,
        continuation: true,
        preteritClass: "tl-1-a",
        distinctFormulas: true,
    });

    const copied = nominalize(ctx, "active-action", {
        ...activeSource.resultFrame,
    }, { state: "possessive" });
    const wrongTense = nominalize(
        ctx,
        "active-action",
        preteritSource.resultFrame,
        { state: "possessive" }
    );
    s.eq("owner identity and Source stage fail independently", {
        copied: [copied.authorizationStatus, copied.blockReason],
        stage: [wrongTense.authorizationStatus, wrongTense.blockReason],
    }, {
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
        stage: ["blocked",
            "distant-past-vnc-result-required"],
    });

    const cueFrames = [generalResult, reflexiveGeneral, restrictedResult];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all 187 atoms have exact writing or reading jobs", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = writing.filter(record => (
                record.reviewGroupId === group
            )).map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 187, writing: 120, readingOnly: 67,
        groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.role === record.reviewGroupId);
        s.ok(`${record.atomId} has its exact canonical observation`,
            Boolean(cue?.atomIds?.includes(record.atomId)));
        s.eq(`mutation:${record.atomId} loses exact credit when removed`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("no ca, yo, class, example, or homophony controls were added",
        shell.includes('value="active-action"')
        && !shell.includes('id="classical-lesson36-active-action-ca"')
        && !shell.includes('id="classical-lesson36-active-action-yo"')
        && !shell.includes('id="classical-lesson36-active-action-example"')
        && !shell.includes('id="classical-lesson36-active-action-homophony"'));
    return s;
}

module.exports = { run };
