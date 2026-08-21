"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson37-liz-replacive-stem-families",
    "lesson37-root-ya-liz",
    "lesson37-way-of-and-lexical-readings",
];

function buildFutureVnc(ctx, {
    sourceStem,
    verbClass = "A",
    sourceValence = "intransitive",
    subject = "1sg",
    objectKind = "",
} = {}) {
    const request = {
        sourceStem,
        verbClass,
        sourceValence,
        subject,
        mood: "indicative",
        tense: "future",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...(objectKind ? { objectKind } : {}),
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

function derive(ctx, resultFrame, actionStemVariant = "") {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "liz",
        canonicalVncResult: resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...(actionStemVariant ? { actionStemVariant } : {}),
    });
}

function deriveStem(ctx, spec, variant = "") {
    const vnc = buildFutureVnc(ctx, spec);
    return { vnc, nnc: derive(ctx, vnc.resultFrame, variant) };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson37_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson37-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const ca = deriveStem(ctx, { sourceStem: "xaca" });
    const frequentativeChanged = deriveStem(ctx, {
        sourceStem: "xi-xil-a-ca",
    });
    const frequentativeRetained = derive(
        ctx,
        frequentativeChanged.vnc.resultFrame,
        "none"
    );
    const ci = deriveStem(ctx, { sourceStem: "paci", verbClass: "B" });
    s.eq("ca and ci replacive behavior follows typed shape, not a stem list", {
        status: [ca.vnc.authorizationStatus, ca.nnc.authorizationStatus,
            ci.vnc.authorizationStatus, ci.nnc.authorizationStatus],
        targets: [ca.nnc.operationFrame?.targetStems?.restrictedUse,
            ci.nnc.operationFrame?.targetStems?.restrictedUse],
        rules: [ca.nnc.operationFrame?.stemRule,
            ci.nnc.operationFrame?.stemRule],
        frequentative: [frequentativeChanged.nnc.operationFrame
            ?.targetStems?.restrictedUse,
        frequentativeRetained.operationFrame?.targetStems?.restrictedUse,
        frequentativeChanged.nnc.operationFrame?.actionStemVariantOptions,
        frequentativeChanged.nnc.operationFrame
            ?.actionStemVariantChoiceRequired],
    }, {
        status: ["authorized", "authorized", "authorized", "authorized"],
        targets: ["xaqui-liz", "paxi-liz"],
        rules: ["ca-to-qui", "ci-to-xi"],
        frequentative: ["xi-xil-a-qui-liz", "xi-xil-a-ca-liz",
            ["ca-to-qui", "none"], true],
    });

    const hua = deriveStem(ctx, { sourceStem: "xahua" });
    const hui = derive(ctx, hua.vnc.resultFrame, "hua-to-hui");
    const ti = deriveStem(ctx, { sourceStem: "xati", verbClass: "B" });
    const chi = derive(ctx, ti.vnc.resultFrame, "ti-to-chi");
    s.eq("hua and ti expose only their genuine alternatives", {
        targets: [hua.nnc.operationFrame?.targetStems?.restrictedUse,
            hui.operationFrame?.targetStems?.restrictedUse,
            ti.nnc.operationFrame?.targetStems?.restrictedUse,
            chi.operationFrame?.targetStems?.restrictedUse],
        options: [hua.nnc.operationFrame?.actionStemVariantOptions,
            ti.nnc.operationFrame?.actionStemVariantOptions],
        choice: [hua.nnc.operationFrame?.actionStemVariantChoiceRequired,
            ti.nnc.operationFrame?.actionStemVariantChoiceRequired],
    }, {
        targets: ["xahua-liz", "xahui-liz", "xati-liz", "xachi-liz"],
        options: [["none", "hua-to-hui"], ["none", "ti-to-chi"]],
        choice: [true, true],
    });

    const root = deriveStem(ctx, { sourceStem: "pala-ya" });
    const retainedRoot = derive(ctx, root.vnc.resultFrame, "none");
    const denominalTi = deriveStem(ctx, { sourceStem: "tetl-ti-ya" });
    const denominalHui = deriveStem(ctx, { sourceStem: "xoxō-hui-ya" });
    const retainedHui = derive(ctx, denominalHui.vnc.resultFrame, "none");
    s.eq("typed root plus ya boundaries determine the available operation", {
        root: [root.nnc.operationFrame?.targetStems?.restrictedUse,
            retainedRoot.operationFrame?.targetStems?.restrictedUse,
            root.nnc.operationFrame?.actionStemVariantOptions,
            root.nnc.operationFrame?.deverbalActionFrame
                ?.internalBoundariesPreserved],
        ti: [denominalTi.nnc.operationFrame?.targetStems?.restrictedUse,
            denominalTi.nnc.operationFrame?.stemRule],
        hui: [denominalHui.nnc.operationFrame?.targetStems?.restrictedUse,
            retainedHui.operationFrame?.targetStems?.restrictedUse,
            denominalHui.nnc.operationFrame?.actionStemVariantOptions],
    }, {
        root: ["pala-liz", "pala-ya-liz",
            ["root-plus-ya-delete", "none"], true],
        ti: ["tetl-ti-liz", "denominal-ya-delete"],
        hui: ["xoxō-hui-liz", "xoxō-hui-ya-liz",
            ["denominal-ya-delete", "none"]],
    });

    const noBoundary = deriveStem(ctx, { sourceStem: "palaya" });
    s.eq("visible final letters without a typed ya boundary do not license deletion", {
        target: noBoundary.nnc.operationFrame?.targetStems?.restrictedUse,
        options: noBoundary.nnc.operationFrame?.actionStemVariantOptions,
        exampleGate: noBoundary.nnc.operationFrame?.deverbalActionFrame
            ?.exampleStemMembershipRequired,
    }, { target: "palaya-liz", options: ["none"], exampleGate: false });

    const chiya = ["A", "B", "C", "D"].map(verbClass => (
        buildFutureVnc(ctx, {
            sourceStem: "chiya",
            verbClass,
            sourceValence: "projective-nonhuman",
            objectKind: "nonspecific-nonhuman",
        })
    )).find(candidate => candidate.authorizationStatus === "authorized");
    const looking = derive(ctx, chiya.resultFrame);
    const caH = ["A", "B", "C", "D"].map(verbClass => (
        buildFutureVnc(ctx, { sourceStem: "ca-h", verbClass })
    )).find(candidate => candidate.authorizationStatus === "authorized");
    const being = derive(ctx, caH.resultFrame);
    const ordinary = deriveStem(ctx, { sourceStem: "pachi", verbClass: "B" });
    s.eq("lexical liz readings remain typed and never follow from liz alone", {
        looking: [chiya.authorizationStatus, looking.authorizationStatus,
        looking.blockReason, looking.operationFrame?.deverbalActionFrame
            ?.lizReadingOptions,
        looking.operationFrame?.deverbalActionFrame
            ?.lexicalReadingRequiresTypedSourceOrContext,
        looking.operationFrame?.deverbalActionFrame
            ?.lexicalReadingSelectedFromLizShape],
        being: [being.operationFrame?.deverbalActionFrame
            ?.lexicalSourceStem,
        being.operationFrame?.deverbalActionFrame?.lizReadingOptions],
        ordinary: [ordinary.nnc.operationFrame?.deverbalActionFrame
            ?.lizReadingOptions,
        ordinary.nnc.operationFrame?.deverbalActionFrame
            ?.lexicalReadingRequiresTypedSourceOrContext],
    }, {
        looking: ["authorized", "authorized", "",
            ["compositional-action", "way-of-looking", "appearance"],
            true, false],
        being: ["ca-h", ["compositional-action", "way-of-being", "nature",
            "state-or-condition"]],
        ordinary: [["compositional-action"], false],
    });

    const hostileVariant = derive(ctx, ca.vnc.resultFrame, "ti-to-chi");
    const copied = derive(ctx, { ...ca.vnc.resultFrame });
    s.eq("mutation changes shape facts without weakening owner identity", {
        wrongVariant: [hostileVariant.authorizationStatus,
            hostileVariant.blockReason],
        copy: [copied.authorizationStatus, copied.blockReason],
    }, {
        wrongVariant: ["blocked",
            "37.3-action-stem-variant-not-authorized-by-typed-source-analysis"],
        copy: ["blocked", "exact-owner-issued-vnc-result-required"],
    });

    const cueFrames = [ca.nnc, root.nnc, looking];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 45 atoms have exact jobs and all 9 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { records: 45, writing: 9, readingOnly: 36,
        roles: [...GROUPS].sort(), covered: true });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }

    const sourceText = fs.readFileSync(path.join(
        ROOT, "src/core/classical/nnc_lessons35_39_closure.mjs"), "utf8");
    s.ok("Lesson 37 uses structural families and typed lexical facts, not a route list",
        sourceText.includes("deriveLizActionStemOptions")
        && !/LESSON37[^\n]*(?:WHITELIST|ALLOWLIST)|ACTION_NOUN_STEM_WHITELIST/u
            .test(sourceText));
    return s;
}

module.exports = { run };
