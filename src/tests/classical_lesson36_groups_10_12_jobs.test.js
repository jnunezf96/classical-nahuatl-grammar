"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson36-action-nnc-taxonomy",
    "lesson36-passive-action-nncs",
    "lesson36-active-action-foundation",
];

function buildVnc(ctx, {
    sourceStem = "chōca",
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

function nominalize(ctx, nominalizationKind, canonicalVncResult, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind,
        canonicalVncResult,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...fields,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson36_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson36-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const passiveSource = buildVnc(ctx, {
        sourceStem: "chīhua",
        verbClass: "A",
        sourceValence: "specific-projective",
        subject: "3sg",
        voice: "passive",
        objectKind: "specific-projective",
        objectPerson: "1sg",
    });
    const passiveRestricted = nominalize(
        ctx,
        "passive-action",
        passiveSource.resultFrame,
        { subject: "2pl", state: "absolutive", animacy: "animate" }
    );
    const passiveGeneral = nominalize(
        ctx,
        "passive-action",
        passiveSource.resultFrame,
        { subject: "2pl", state: "possessive", possessor: "3pl",
            animacy: "animate" }
    );
    const taxonomy = passiveRestricted.operationFrame
        ?.actionNncTaxonomyFrame;
    const passive = passiveRestricted.operationFrame?.passiveActionFrame;
    const passivePossessive = passiveGeneral.operationFrame
        ?.passiveActionFrame;
    s.eq("action taxonomy is typed without turning shape into meaning", {
        statuses: [passiveSource.authorizationStatus,
            passiveRestricted.authorizationStatus,
            passiveGeneral.authorizationStatus],
        kinds: taxonomy?.actionNncKinds,
        selected: taxonomy?.selectedActionNncKind,
        distinct: taxonomy?.passiveAndActiveKindsRemainDistinct,
        meanings: taxonomy?.licensedSemanticScope,
        lexicalFromShape: taxonomy?.shapeAloneSelectsLexicalMeaning,
        uses: [taxonomy?.restrictedUseFormation,
            taxonomy?.generalUseFormation],
        realChoice: taxonomy
            ?.userChoosesMeaningOnlyWhenContextLeavesRealAmbiguity,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        kinds: ["passive-action", "active-action"],
        selected: "passive-action",
        distinct: true,
        meanings: ["action", "process", "event", "resultant-state",
            "instance-of-source-action", "result-of-source-action"],
        lexicalFromShape: false,
        uses: ["general-use-source-plus-yo-tl-matrix-compound",
            "nominalized-distant-past-predicate"],
        realChoice: true,
    });

    s.eq("passive action derives the state-specific structure", {
        perspective: passive?.passivePerspectivePreserved,
        source: [passive?.sourceStage, passive?.sourceVoice,
            passive?.sourceValence],
        stems: passiveRestricted.operationFrame?.targetStems,
        ca: [passive?.generalUseFinalDistantPastMorph,
            passive?.restrictedUseProtectedDistantPastMorph,
            passive?.caQuantityProtectedByMatrix],
        matrix: passive?.yoTlMatrix,
        target: [passiveRestricted.canonicalResult?.subject,
            passiveRestricted.canonicalResult?.numberFrame?.num1,
            passiveRestricted.canonicalResult?.numberFrame?.num2,
            passiveRestricted.canonicalResult?.numberFrame?.animacy],
        possessor: [passivePossessive?.sourceSubjectBecomesPossessor,
            passiveGeneral.canonicalResult?.possessor,
            passiveGeneral.canonicalResult?.subject],
        class: [passive?.nounClass, passive?.nounSubclass],
        manual: passive?.manualTensePossessorYoOrClassChoiceRequired,
    }, {
        perspective: true,
        source: ["distant-past-predicate", "passive", "single-object"],
        stems: passiveRestricted.operationFrame?.targetStems,
        ca: ["ca", "cā", true],
        matrix: "yō-tl",
        target: ["3common", "tl", "0", "nonanimate"],
        possessor: [true, "1sg", "3common"],
        class: ["tl", "tl-1-b"],
        manual: false,
    });

    const unlistedPassive = buildVnc(ctx, {
        sourceStem: "maca",
        verbClass: "A",
        sourceValence: "specific-projective",
        subject: "2sg",
        voice: "passive",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const productivePassive = nominalize(
        ctx,
        "passive-action",
        unlistedPassive.resultFrame
    );
    s.eq("another valid typed Source shape follows the same passive rule", [
        unlistedPassive.authorizationStatus,
        productivePassive.authorizationStatus,
        productivePassive.operationFrame?.passiveActionFrame
            ?.exampleStemMembershipRequired,
        productivePassive.canonicalResult?.subject,
    ], ["authorized", "authorized", false, "3common"]);

    const activeSource = buildVnc(ctx, {
        sourceStem: "chōca",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "2sg",
    });
    const active = nominalize(ctx, "active-action", activeSource.resultFrame);
    const activeFoundation = active.operationFrame
        ?.activeActionFoundationFrame;
    s.eq("nominalized active action uses the typed intransitive path", {
        statuses: [activeSource.authorizationStatus,
            active.authorizationStatus],
        families: activeFoundation?.distinctActiveActionFamilies,
        selected: activeFoundation?.selectedFamily,
        distinct: activeFoundation?.nominalizationAndDerivationRemainDistinct,
        counterpart: activeFoundation?.passiveCounterpart,
        profile: [activeFoundation?.sourceVoice,
            activeFoundation?.sourceValence,
            activeFoundation?.sourceObjectPattern],
        ordinary: activeFoundation?.sourceIsOrdinaryIntransitive,
        reflexive: activeFoundation
            ?.sourceUsesNarrowReflexiveTransitivePath,
        exampleGate: activeFoundation?.exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized"],
        families: ["nominalized-active-action", "derived-active-action"],
        selected: "nominalized-active-action",
        distinct: true,
        counterpart: "passive-action",
        profile: ["active", "intransitive", "none"],
        ordinary: true,
        reflexive: false,
        exampleGate: false,
    });

    const reflexiveSource = buildVnc(ctx, {
        sourceStem: "chihua",
        verbClass: "A",
        sourceValence: "mainline-reflexive",
        subject: "3sg",
        objectKind: "reflexive",
    });
    const reflexiveActive = nominalize(
        ctx,
        "active-action",
        reflexiveSource.resultFrame
    );
    const transitiveSource = buildVnc(ctx, {
        sourceStem: "itta",
        verbClass: "A",
        sourceValence: "specific-projective",
        subject: "3sg",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const transitiveActive = nominalize(
        ctx,
        "active-action",
        transitiveSource.resultFrame
    );
    s.eq("the reflexive transitive exception stays narrow", {
        reflexiveSource: reflexiveSource.authorizationStatus,
        reflexive: [reflexiveActive.authorizationStatus,
            reflexiveActive.operationFrame?.activeActionFoundationFrame
                ?.sourceUsesNarrowReflexiveTransitivePath],
        nonreflexiveSource: transitiveSource.authorizationStatus,
        nonreflexive: [transitiveActive.authorizationStatus,
            transitiveActive.blockReason],
    }, {
        reflexiveSource: "authorized",
        reflexive: ["authorized", true],
        nonreflexiveSource: "authorized",
        nonreflexive: ["blocked",
            "nominalized-active-action-requires-intransitive-or-reflexive-source"],
    });

    const copiedPassive = nominalize(ctx, "passive-action", {
        ...passiveSource.resultFrame,
    });
    const wrongVoice = nominalize(
        ctx,
        "passive-action",
        activeSource.resultFrame
    );
    s.eq("owner identity and voice fail independently", {
        copied: [copiedPassive.authorizationStatus,
            copiedPassive.blockReason],
        voice: [wrongVoice.authorizationStatus, wrongVoice.blockReason],
    }, {
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
        voice: ["blocked",
            "passive-action-requires-passive-distant-past-source"],
    });

    const cueFrames = [passiveRestricted, passiveGeneral, active,
        reflexiveActive];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all 111 atoms have exact writing or reading jobs", {
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
    }, { records: 111, writing: 84, readingOnly: 27,
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
    s.ok("no example, ca, yo, class, or lexical-meaning controls were added",
        shell.includes('value="passive-action"')
        && shell.includes('value="active-action"')
        && !shell.includes('id="classical-lesson36-action-ca"')
        && !shell.includes('id="classical-lesson36-action-yo"')
        && !shell.includes('id="classical-lesson36-action-example"')
        && !shell.includes('id="classical-lesson36-action-meaning"'));
    return s;
}

module.exports = { run };
