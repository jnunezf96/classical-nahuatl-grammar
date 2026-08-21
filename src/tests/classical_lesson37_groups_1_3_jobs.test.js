"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson37-deverbal-source-foundation",
    "lesson37-z-active-action",
    "lesson37-liz-active-action-foundation",
];

function buildFutureVnc(ctx, {
    sourceStem = "pachi",
    verbClass = "B",
    sourceValence = "intransitive",
    subject = "1sg",
    objectKind = "",
    sourceInitialISelection = "",
    tense = "future",
} = {}) {
    const request = {
        sourceStem,
        verbClass,
        sourceValence,
        subject,
        mood: "indicative",
        tense,
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...(objectKind ? { objectKind } : {}),
        ...(sourceInitialISelection ? { sourceInitialISelection } : {}),
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const optionId = preview.controlFrame
        ?.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame?.nonactiveOptionInventory?.options?.[0]
            ?.optionId
        || "";
    return optionId
        ? ctx.evaluateClassicalNahuatlVncApplication({
            ...request,
            nonactiveOptionId: optionId,
        })
        : preview;
}

function derive(ctx, resultFrame, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "liz",
        canonicalVncResult: resultFrame,
        subject: "2pl",
        state: "absolutive",
        possessor: "3pl",
        animacy: "animate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson37_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson37-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const source = buildFutureVnc(ctx);
    const capture = ctx.captureClassicalNahuatlVncResultForDeverbalAction(
        source.resultFrame
    );
    const liz = derive(ctx, source.resultFrame);
    const action = liz.operationFrame?.deverbalActionFrame;
    s.eq("the exact future VNC core becomes the deverbal NNC Source", {
        statuses: [source.authorizationStatus, capture.authorizationStatus,
            liz.authorizationStatus],
        exact: [ctx.isClassicalNahuatlDeverbalActionVncCaptureFrame(capture),
            capture.canonicalVncResult === source.resultFrame,
            liz.sourceFrame?.canonicalVncResult === source.resultFrame,
            action?.canonicalVncResult === source.resultFrame],
        source: [capture.sourceStage, capture.sourceStem,
            capture.lexicalSourceStem, capture.verbClass,
            capture.morphologicalTense, capture.futureTenseCarrier],
        structure: [action?.futureVncCore,
            action?.nominalSuffixStructure,
            action?.futureTenseAndNominalZAreDistinct,
            action?.examplesAuthorizeRoute],
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        exact: [true, true, true, true],
        source: ["future-core", "pachi", "pachi", "B", "future", "z"],
        structure: ["pachi", ["l", "i", "z"], true, false],
    });

    const copied = derive(ctx, { ...source.resultFrame });
    const jsonCopy = derive(ctx, JSON.parse(JSON.stringify(source.resultFrame)));
    const present = buildFutureVnc(ctx, { tense: "present" });
    const wrongTense = derive(ctx, present.resultFrame);
    s.eq("copied and wrong-stage Results do not become Sources", {
        copied: [copied.authorizationStatus, copied.blockReason],
        json: [jsonCopy.authorizationStatus, jsonCopy.blockReason],
        tense: [wrongTense.authorizationStatus, wrongTense.blockReason],
    }, {
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
        json: ["blocked", "exact-owner-issued-vnc-result-required"],
        tense: ["blocked", "future-vnc-result-required"],
    });

    const zI = derive(ctx, source.resultFrame, { actionSuffix: "z" });
    const aSource = buildFutureVnc(ctx, {
        sourceStem: "paca", verbClass: "A", subject: "2sg",
    });
    const zA = derive(ctx, aSource.resultFrame, {
        actionSuffix: "z", state: "possessive",
    });
    const huaSource = buildFutureVnc(ctx, {
        sourceStem: "xahua", verbClass: "A",
    });
    const zHua = derive(ctx, huaSource.resultFrame, { actionSuffix: "z" });
    s.eq("z applies productively by typed final shape", {
        stems: [zI.operationFrame?.targetStems?.restrictedUse,
            zA.operationFrame?.targetStems?.restrictedUse,
            zHua.operationFrame?.targetStems?.restrictedUse],
        rules: [zI.operationFrame?.stemRule, zA.operationFrame?.stemRule,
            zHua.operationFrame?.stemRule],
        target: [zA.canonicalResult?.subject,
            zA.canonicalResult?.numberFrame?.animacy,
            zA.canonicalResult?.possessor,
            zA.operationFrame?.nounClass],
        distinctions: [zA.operationFrame?.deverbalActionFrame
            ?.futureTenseAndNominalZAreDistinct,
            zA.operationFrame?.deverbalActionFrame
                ?.sourceShapeChoosesLexicalMeaning],
    }, {
        stems: ["pachi-z", "paqui-z", "xahui-z"],
        rules: ["final-i", "replacive-a-to-i", "replacive-a-to-i"],
        target: ["3common", "nonanimate", "2sg", "tli"],
        distinctions: [true, false],
    });

    const unsupported = buildFutureVnc(ctx, {
        sourceStem: "xopano", verbClass: "A",
    });
    const unsupportedZ = derive(ctx, unsupported.resultFrame, {
        actionSuffix: "z",
    });
    s.eq("z exceptions remain typed facts rather than a route whitelist", [
        unsupported.authorizationStatus,
        unsupportedZ.authorizationStatus,
        unsupportedZ.blockReason,
    ], ["authorized", "blocked",
        "37.2-z-requires-final-i-or-typed-exception"]);

    const classCases = [
        { sourceStem: "temō", verbClass: "A" },
        { sourceStem: "huetzi", verbClass: "B" },
        { sourceStem: "chol-o-ā", verbClass: "C" },
        { sourceStem: "yā", verbClass: "D" },
    ].map(spec => {
        const vnc = buildFutureVnc(ctx, spec);
        const nnc = derive(ctx, vnc.resultFrame);
        return {
            class: spec.verbClass,
            vnc: vnc.authorizationStatus,
            nnc: nnc.authorizationStatus,
            core: nnc.operationFrame?.deverbalActionFrame?.futureVncCore,
            stem: nnc.operationFrame?.targetStems?.restrictedUse,
        };
    });
    s.eq("liz inherits the future-core behavior of Classes A B C and D",
        classCases, [
            { class: "A", vnc: "authorized", nnc: "authorized",
                core: "temō", stem: "temō-liz" },
            { class: "B", vnc: "authorized", nnc: "authorized",
                core: "huetzi", stem: "huetzi-liz" },
            { class: "C", vnc: "authorized", nnc: "authorized",
                core: "chol-ō", stem: "chol-ō-liz" },
            { class: "D", vnc: "authorized", nnc: "authorized",
                core: "yā", stem: "yā-liz" },
        ]);

    const tlaSource = buildFutureVnc(ctx, {
        sourceStem: "il-nāmiqui",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
        sourceInitialISelection: "supportive",
    });
    const tlaLiz = derive(ctx, tlaSource.resultFrame);
    const teSource = buildFutureVnc(ctx, {
        sourceStem: "tequi",
        sourceValence: "projective-human",
        objectKind: "nonspecific-human",
    });
    const teLiz = derive(ctx, teSource.resultFrame);
    const neSource = buildFutureVnc(ctx, {
        sourceStem: "ih-mati",
        sourceValence: "mainline-reflexive",
        objectKind: "reflexive",
        sourceInitialISelection: "supportive",
    });
    const neDrop = derive(ctx, neSource.resultFrame);
    const neRetain = derive(ctx, neSource.resultFrame, {
        actionStemVariant: "supportive-i-retain",
    });
    s.eq("internal objects and supportive i follow their typed boundaries", {
        statuses: [tlaSource.authorizationStatus, tlaLiz.authorizationStatus,
            teSource.authorizationStatus, teLiz.authorizationStatus,
            neSource.authorizationStatus, neDrop.authorizationStatus,
            neRetain.authorizationStatus],
        stems: [tlaLiz.operationFrame?.targetStems?.restrictedUse,
            teLiz.operationFrame?.targetStems?.restrictedUse,
            neDrop.operationFrame?.targetStems?.restrictedUse,
            neRetain.operationFrame?.targetStems?.restrictedUse],
        rules: [tlaLiz.operationFrame?.supportiveInitialIRule,
            neDrop.operationFrame?.supportiveInitialIRule,
            neRetain.operationFrame?.supportiveInitialIRule],
        choice: [neDrop.operationFrame?.actionStemVariantChoiceRequired,
            neDrop.operationFrame?.actionStemVariantOptions],
    }, {
        statuses: ["authorized", "authorized", "authorized", "authorized",
            "authorized", "authorized", "authorized"],
        stems: ["tla-l-nāmiqui-liz", "tē-tequi-liz", "ne-h-mati-liz",
            "ne-ih-mati-liz"],
        rules: ["supportive-i-deletion-inherited-from-vnc-owner",
            "supportive-i-drop-after-ne",
            "supportive-i-retain-after-ne"],
        choice: [true, ["supportive-i-drop", "supportive-i-retain"]],
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "liz",
        canonicalVncResult: source.resultFrame,
        state: "absolutive",
        outputScope: "full-paradigm",
    });
    const projected = ctx.projectClassicalNahuatlParadigmCoordinates(
        plan,
        plan.coordinates
    );
    s.eq("the exact VNC Result survives full-paradigm planning", {
        plan: [plan.authorizationStatus,
            ctx.isClassicalNahuatlParadigmPlan(plan)],
        count: projected.length,
        exact: projected.every(item => (
            item.scalarEquivalent === true
            && item.preparedFrame?.sourceFrame?.canonicalVncResult
                === source.resultFrame
        )),
    }, { plan: ["authorized", true], count: plan.coordinateCount,
        exact: true });

    const cueFrames = [liz, zA, tlaLiz];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 96 accepted atoms have exact jobs and all 35 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { records: 96, writing: 35, readingOnly: 61,
        roles: [...GROUPS].sort(), covered: true });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }

    const sourceText = fs.readFileSync(path.join(
        ROOT, "src/core/classical/nnc_lessons35_39_closure.mjs"), "utf8");
    s.ok("normal behavior has no Lesson 37 example-stem admission gate",
        !/LESSON37[^\n]*(?:WHITELIST|ALLOWLIST)|ACTION_NOUN_STEM_WHITELIST/u
            .test(sourceText));
    return s;
}

module.exports = { run };
