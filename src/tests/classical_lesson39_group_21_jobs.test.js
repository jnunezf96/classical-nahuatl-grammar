"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-patientive-ownerhood-extended";
const WRITING_JOB =
    "DERIVE_TYPE_THREE_CAUSATIVE_FROM_POSSESSIVE_PATIENTIVE_AND_SHORT_A_TLANI";

function buildPossessivePatientive(ctx, fields = {}) {
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: fields.sourceStem || "chīhua",
        verbClass: fields.verbClass || "A",
        sourceValence: fields.sourceValence || "specific-projective",
        objectKind: fields.objectKind || "specific-projective",
        objectPerson: fields.objectPerson || "3sg",
        ...(Array.isArray(fields.sourceObjectRequests)
            ? { sourceObjectRequests: fields.sourceObjectRequests }
            : {}),
        subject: fields.sourceSubject || "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    });
    const grammar = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily:
            fields.patientiveSourceFamily || "imperfective-active-core",
        patientiveAnalogy: fields.patientiveAnalogy || "passive",
        canonicalVncResult: application.resultFrame,
        subject: "3common",
        state: "possessive",
        possessor: fields.possessor || "2sg",
        animacy: fields.animacy || "nonanimate",
    });
    return { application, grammar };
}

function continueWithTlani(ctx, grammar, fields = {}) {
    const evaluate = fields.applicationBoundary
        ? ctx.requestClassicalDeverbalNncResult
        : ctx.evaluateClassicalNahuatlDeverbalNnc;
    return evaluate({
        constructionKind: "patientive-embed-continuation",
        canonicalPatientiveNncGrammarFrame: grammar,
        compoundTargetKind: "vnc",
        source: {
            matrixStem: fields.matrixStem || "tlani",
            matrixVerbClass: fields.matrixVerbClass || "A",
            matrixValence: fields.matrixValence || "specific-projective",
            matrixSemanticFamily: fields.matrixSemanticFamily
                || "short-a-type-three-causative-tlani",
            ...(fields.source || {}),
        },
        relation: fields.relation || "complement",
        orientation: fields.orientation || "object",
        complementKind: fields.complementKind || "desiring",
        subject: fields.subject || "1sg",
        mood: fields.mood || "indicative",
        tense: fields.tense || "present",
        voice: fields.voice || "active",
        ...(fields.nonactiveOptionId
            ? { nonactiveOptionId: fields.nonactiveOptionId }
            : {}),
    });
}

function groupFrame(result) {
    return result.operationFrame?.patientiveEmbedCompoundFrame
        ?.patientivePossessiveTlaniCausativeFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_21_jobs");
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
        job: writing.every(record => record.proposedWritingJob === WRITING_JOB),
    }, { atoms: 36, writing: 28, reading: 8, accepted: true, job: true });

    const source = buildPossessivePatientive(ctx, {
        possessor: "2sg",
        sourceObjectRequests: [{
            objectId: "made-thing",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            governor: "directive",
            derivationalLevel: 1,
        }],
    });
    const active = continueWithTlani(ctx, source.grammar);
    const deliveredActive = continueWithTlani(ctx, source.grammar, {
        applicationBoundary: true,
    });
    const frame = groupFrame(active);
    s.eq("the exact possessive patientive and VNC ancestry survive", {
        statuses: [source.application.authorizationStatus,
            source.grammar.authorizationStatus, active.authorizationStatus],
        reasons: [source.application.blockReason || "",
            source.grammar.blockReason || "", active.blockReason || "",
            active.canonicalResult?.blockReason || "",
            active.resultFrame?.blockReason || ""],
        exactResult: frame?.canonicalPatientiveNncResult
            === source.grammar.canonicalResult,
        exactSource: frame?.canonicalPatientiveSourceFrame
            === source.grammar.sourceFrame,
        exactVnc: frame?.canonicalPatientiveVncResult
            === source.application.resultFrame,
        state: frame?.patientiveSourceState,
        possessor: frame?.patientiveSourcePossessor,
        ancestry: frame?.completePatientiveSourceAndVncAncestryPreserved,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        reasons: ["", "", "", "", ""],
        exactResult: true,
        exactSource: true,
        exactVnc: true,
        state: "possessive",
        possessor: "2sg",
        ancestry: true,
    });

    s.eq("the possessor automatically becomes the mainline causee", {
        roles: [frame?.possessorSourceRole, frame?.possessorTargetRole],
        cases: [frame?.possessorSourceCase, frame?.possessorTargetCase],
        object: [frame?.transformedCausativeObjectKind,
            frame?.transformedCausativeObjectPerson,
            frame?.transformedCausativeObjectGovernor],
        mainline: frame?.causativeObjectMustBeMainline,
        automatic: frame?.transformationDerivedAutomatically,
        choice: frame?.userChoiceRequired,
        transition: {
            retired: frame?.possessorObjectTransformationFrame
                ?.participantRoleTransitionFrame?.retiredSourceRoles,
            activated: frame?.possessorObjectTransformationFrame
                ?.participantRoleTransitionFrame?.activatedTargetRoles,
            preserved: frame?.possessorObjectTransformationFrame
                ?.participantRoleTransitionFrame?.preservedParticipantFacts,
        },
    }, {
        roles: ["possessor", "mainline-causative-object"],
        cases: ["possessive", "objective"],
        object: ["specific-projective", "2sg", "causative"],
        mainline: true,
        automatic: true,
        choice: false,
        transition: {
            retired: ["source-possessor"],
            activated: ["mainline-causative-object"],
            preserved: ["possessor-participant-identity", "typed-source-history"],
        },
    });

    s.eq("the patientive object history becomes shuntline", {
        original: (frame?.originalPatientiveObjectRequests || []).map(
            item => [item.objectId, item.objectKind, item.governor]
        ),
        result: (frame?.resultingCompoundObjectRequests || []).map(
            item => [item.objectId, item.objectKind, item.governor]
        ),
        inherited: frame?.originalPatientiveObjectHistoryInheritedAutomatically,
        shuntline: frame?.originalObjectBecomesShuntline,
    }, {
        original: [["source-object-1", "specific-projective", "directive"]],
        result: [
            ["source-object-1", "specific-projective", "directive"],
            ["patientive-possessor-object", "specific-projective", "causative"],
        ],
        inherited: true,
        shuntline: true,
    });
    s.ok("the active Result realizes the Canvas l-l boundary",
        (active.formulaRealization || "").includes("chīhua-l-lani"));
    s.ok("the active Result realizes the causee",
        (active.formulaRealization || "").includes("m-itz"));
    s.ok("the earlier specific object remains silently represented",
        (active.formulaRealization || "").includes("⎕"));
    s.eq("the application boundary delivers the same accepted composition", {
        status: deliveredActive.authorizationStatus,
        reason: deliveredActive.blockReason || "",
        formula: deliveredActive.formulaRealization,
    }, {
        status: "authorized",
        reason: "",
        formula: active.formulaRealization,
    });
    const liveUiShapedSource = buildPossessivePatientive(ctx, {
        possessor: "2sg",
        objectPerson: "3sg",
        sourceSubject: "1sg",
    });
    const liveUiShapedResult = continueWithTlani(
        ctx,
        liveUiShapedSource.grammar,
        {
            applicationBoundary: true,
            matrixValence: "single-object",
            subject: "1sg",
        }
    );
    const liveUiDirectResult = continueWithTlani(
        ctx,
        liveUiShapedSource.grammar,
        {
            matrixValence: "single-object",
            subject: "1sg",
        }
    );
    s.eq("the live control request remains owner-readable", {
        source: liveUiShapedSource.grammar.authorizationStatus,
        status: liveUiDirectResult.authorizationStatus,
        reason: liveUiDirectResult.blockReason || "",
    }, { source: "authorized", status: "authorized", reason: "" });
    s.ok("the live control vocabulary reaches the accepted composition",
        liveUiShapedResult?.authorizationStatus === "authorized"
        && (liveUiShapedResult?.formulaRealization || "")
            .includes("chīhua-l-lani"));
    s.eq("the boundary is derived from shape while preserving analysis", {
        target: frame?.boundaryAssimilationFrame?.targetSequence,
        applied: frame?.patientiveLPlusTlRealizesAsLPlusL,
        preserved: frame?.boundaryAssimilationFrame?.sourceAnalysisPreserved,
        example: frame?.boundaryAssimilationFrame?.exampleStemAuthority,
    }, { target: "l-l", applied: true, preserved: true, example: false });

    const passivePreview = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: active.canonicalResult?.sourceFrame?.canonicalVncSourceStem,
        verbClass: "A",
        sourceValence: "multiple-object",
        sourceObjectRequests:
            active.canonicalResult?.operationFrame?.targetObjectRequests || [],
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "passive",
        voice: "passive",
    });
    const passiveOptions = passivePreview.controlFrame
        ?.nonactiveOptionInventory?.options || [];
    const passiveResolved = passiveOptions.map(option => {
        const resolved = ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem:
                active.canonicalResult?.sourceFrame?.canonicalVncSourceStem,
            verbClass: "A",
            sourceValence: "multiple-object",
            sourceObjectRequests:
                active.canonicalResult?.operationFrame?.targetObjectRequests
                || [],
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            requestedVoice: "passive",
            voice: "passive",
            nonactiveOptionId: option.optionId,
        });
        return [option.optionId, resolved.authorizationStatus,
            resolved.blockReason || ""];
    });
    s.eq("the shared voice owner derives both regular nonactive options", {
        sourceMachinery:
            passivePreview.resultFrame?.sourceMachineryFrame?.sourceVerbstem
            || passivePreview.resultFrame?.sourceMachineryFrame?.stem || "",
        families: passiveOptions.map(option => option.optionId.split(":")[0]),
        resolved: passiveResolved.map(item => item.slice(1)),
    }, {
        sourceMachinery: "chīhua-l-tlani",
        families: ["ō", "lō"],
        resolved: [["authorized", ""], ["authorized", ""]],
    });
    const passiveOption = passiveOptions.find(option => (
        option.optionId.startsWith("ō:")
    ));
    const passive = continueWithTlani(ctx, source.grammar, {
        voice: "passive",
        subject: "1sg",
        nonactiveOptionId: passiveOption?.optionId || "",
    });
    s.eq("passive continuation uses the ordinary voice owner", {
        status: passive.authorizationStatus,
        reason: passive.blockReason || "",
        frame: Boolean(groupFrame(passive)),
        formula: (passive.formulaRealization || "").includes("lan-o"),
        owner: groupFrame(passive)
            ?.passiveAndImpersonalUseCanonicalVoiceOwner,
    }, { status: "authorized", reason: "", frame: true, formula: true,
        owner: true });

    const impersonalSource = buildPossessivePatientive(ctx, {
        sourceStem: "xōna",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
        objectPerson: "",
        possessor: "nonspecific-human",
        patientiveAnalogy: "impersonal",
    });
    const impersonalActive = continueWithTlani(
        ctx, impersonalSource.grammar, { subject: "3sg" }
    );
    const impersonalPreview = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: impersonalActive.canonicalResult?.sourceFrame
            ?.canonicalVncSourceStem,
        verbClass: "A",
        sourceValence: "multiple-object",
        sourceObjectRequests: impersonalActive.canonicalResult?.operationFrame
            ?.targetObjectRequests || [],
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "impersonal",
        voice: "impersonal",
    });
    const impersonalOptions = impersonalPreview.controlFrame
        ?.nonactiveOptionInventory?.options || [];
    const impersonalOption = impersonalOptions.find(option => (
        option.optionId.startsWith("ō:")
    ));
    const impersonal = continueWithTlani(ctx, impersonalSource.grammar, {
        voice: "impersonal",
        subject: "3sg",
        nonactiveOptionId: impersonalOption?.optionId || "",
    });
    s.eq("impersonal continuation preserves both nonspecific objects", {
        status: impersonal.authorizationStatus,
        reasons: [impersonalSource.application.blockReason || "",
            impersonalSource.grammar.blockReason || "",
            impersonal.blockReason || ""],
        frame: Boolean(groupFrame(impersonal)),
        kinds: (groupFrame(impersonal)?.resultingCompoundObjectRequests || [])
            .map(item => item.objectKind),
        formula: [(impersonal.formulaRealization || "").includes("tē"),
            (impersonal.formulaRealization || "").includes("tla")],
        optionSelected: Boolean(impersonalOption),
    }, {
        status: "authorized",
        reasons: ["", "", ""],
        frame: true,
        kinds: ["nonspecific-nonhuman", "nonspecific-human"],
        formula: [true, true],
        optionSelected: true,
    });

    const reciprocalSource = buildPossessivePatientive(ctx, {
        sourceStem: "nōtza",
        sourceValence: "human-reciprocal",
        objectKind: "reciprocal",
        objectPerson: "",
        possessor: "nonspecific-human",
        patientiveAnalogy: "impersonal",
    });
    const reciprocal = continueWithTlani(ctx, reciprocalSource.grammar, {
        subject: "3sg",
    });
    const reciprocalFrame = groupFrame(reciprocal);
    s.eq("a reciprocal Source keeps ne after the causative object", {
        status: reciprocal.authorizationStatus,
        reasons: [reciprocalSource.application.blockReason || "",
            reciprocalSource.grammar.blockReason || "",
            reciprocal.blockReason || ""],
        reciprocal: reciprocalFrame?.reciprocalSource,
        carrier: reciprocalFrame?.reciprocalShuntlineCarrier,
        placement: reciprocalFrame?.reciprocalNeFollowsMainlineCausativeObject,
        formula: [(reciprocal.formulaRealization || "").indexOf("tē"),
            (reciprocal.formulaRealization || "").indexOf("ne")],
        text: reciprocal.formulaRealization || "",
    }, {
        status: "authorized",
        reasons: ["", "", ""],
        reciprocal: true,
        carrier: "ne",
        placement: true,
        formula: [(reciprocal.formulaRealization || "").indexOf("tē"),
            (reciprocal.formulaRealization || "").indexOf("ne")],
        text: reciprocal.formulaRealization || "",
    });
    s.ok("the mainline causee precedes reciprocal ne",
        (reciprocal.formulaRealization || "").indexOf("tē") >= 0
        && (reciprocal.formulaRealization || "").indexOf("tē")
            < (reciprocal.formulaRealization || "").indexOf("ne"));

    s.eq("the two causative types stay distinct even when meanings overlap", {
        typeTwo: frame?.typeTwoTypeThreeComparisonFrame?.typeTwoMatrix,
        typeThree: frame?.typeTwoTypeThreeComparisonFrame?.typeThreeMatrix,
        synonymy:
            frame?.typeTwoTypeThreeComparisonFrame?.synonymousReadingPossible,
        difference:
            frame?.typeTwoTypeThreeComparisonFrame?.semanticDifferencePossible,
        distinct:
            frame?.typeTwoTypeThreeComparisonFrame
                ?.typeTwoAndTypeThreeRemainDistinct,
        matrixNotSuffix: frame?.matrixConstituentIsVerbstemNotSuffix,
    }, {
        typeTwo: "tiā",
        typeThree: "tlani",
        synonymy: true,
        difference: true,
        distinct: true,
        matrixNotSuffix: true,
    });

    const wrongStateApplication = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy: "passive",
        canonicalVncResult: source.application.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    const wrongState = continueWithTlani(ctx, wrongStateApplication);
    const wrongQuantity = continueWithTlani(ctx, source.grammar, {
        matrixStem: "tlāni",
    });
    const wrongAnalysis = continueWithTlani(ctx, source.grammar, {
        matrixSemanticFamily: "short-a-desiderative-tlani",
    });
    const copied = continueWithTlani(
        ctx, JSON.parse(JSON.stringify(source.grammar))
    );
    s.eq("the special frame requires exact state, matrix, analysis, and Result", {
        absolutive: [wrongState.authorizationStatus,
            Boolean(groupFrame(wrongState))],
        longA: [wrongQuantity.authorizationStatus,
            Boolean(groupFrame(wrongQuantity))],
        otherAnalysis: [wrongAnalysis.authorizationStatus,
            Boolean(groupFrame(wrongAnalysis))],
        copied: [copied.authorizationStatus, Boolean(groupFrame(copied))],
    }, {
        absolutive: ["authorized", false],
        longA: ["authorized", false],
        otherAnalysis: ["authorized", false],
        copied: ["blocked", false],
    });

    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        active.formulaRealization,
        active.canonicalResult?.nncSlotFrame || null,
        active
    ).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("the clickable cue covers every accepted atom exactly", {
        cues: cues.length,
        sections: cues[0]?.lessonSections,
        covered: covered.size,
        all: records.every(record => covered.has(record.atomId)),
        role: cues[0]?.role,
    }, {
        cues: 1,
        sections: ["§39.7.2.b"],
        covered: 36,
        all: true,
        role: GROUP,
    });

    const mutationSource = buildPossessivePatientive(ctx, {
        sourceStem: "pāca",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
        possessor: "2sg",
    });
    const mutation = continueWithTlani(ctx, mutationSource.grammar);
    s.eq("changing only the compatible Source keeps the same rule", {
        status: mutation.authorizationStatus,
        frame: Boolean(groupFrame(mutation)),
        exact: groupFrame(mutation)?.canonicalPatientiveNncResult
            === mutationSource.grammar.canonicalResult,
        productive:
            groupFrame(mutation)
                ?.compatibleUnlistedPatientiveResultsRemainProductive,
        gate:
            groupFrame(mutation)
                ?.matrixStemMembershipAuthorizesGeneralPatientiveRoute,
        resultChanged: mutation.formulaRealization !== active.formulaRealization,
    }, {
        status: "authorized",
        frame: true,
        exact: true,
        productive: true,
        gate: false,
        resultChanged: true,
    });

    return s;
}

module.exports = { run };
