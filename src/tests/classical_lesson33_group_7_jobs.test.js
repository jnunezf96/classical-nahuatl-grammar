"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson33-mainline-reflexive-preterit-embed-honorifics";

function request(overrides = {}) {
    return {
        sourceStem: "xīma",
        sourceValence: "mainline-reflexive",
        verbClass: "B",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        derivationType: "direct",
        lateOperation: "honorific",
        honoredParticipant: "subject",
        ...overrides,
    };
}

function honor(ctx, overrides = {}) {
    return ctx.evaluateClassicalNahuatlLateVncDerivation(
        request(overrides)
    );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_group_7_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const xima = honor(ctx);
    const facts = xima.operationFrame?.operationFacts || {};
    s.eq("mainline reflexive topology automatically selects the integrated preterit embed", {
        status: xima.authorizationStatus,
        variant: xima.operationFrame?.variant,
        rule: xima.operationFrame?.ruleFamily,
        target: xima.operationFrame?.targetStem,
        formula: xima.formulaRealization,
        surface: xima.surfaceRealization,
        topology: facts.sourceReflexiveTopology,
        automatic: facts.mainlineReflexiveTopologySelectsRouteAutomatically,
        choice: facts.attitudeRouteChoiceRequired,
        integrated: facts.integratedCompoundPattern,
        futureParallel: facts.futureEmbedParallel,
    }, {
        status: "authorized",
        variant: "preterit-embed",
        rule: "honorific-preterit-embed",
        target: "xīn-0-tzin-o-ā",
        formula: "#0-0+m-o(xīn-0-tzin-o-a)0+0-0#",
        surface: "moxīntzinoa",
        topology: "mainline-reflexive",
        automatic: true,
        choice: false,
        integrated: true,
        futureParallel: true,
    });

    s.eq("the perfective predicate replaces the fixed matrix object and preserves Source pronouns", {
        aspect: facts.embeddedPredicateAspect,
        perfective: facts.embeddedPredicateStem,
        sourceClass: facts.embeddedPredicateVerbClass,
        tense: facts.embeddedTense,
        morph: facts.embeddedPreteritMorph,
        morphSurface: facts.embeddedPreteritMorphHasSurface,
        matrix: facts.fixedAffectiveMatrix,
        nounstem: facts.matrixSourceNounstem,
        owner: facts.matrixFormationOwner,
        replaced: facts.incorporatedPredicateReplacesMatrixSpecificObject,
        retained: facts.retainedSourceObjectPositions.map(position => (
            [position.va1, position.va2, position.objectKind]
        )),
        pronouns: facts.sourceObjectPronounsPreserved,
        participants: facts.sourceParticipantsPreserved,
        automaticControls: [facts.userSelectsMatrix,
            facts.userSelectsPerfectiveClassForm,
            facts.userSelectsObjectReplacement,
            facts.userSelectsCompoundBracketing],
    }, {
        aspect: "perfective",
        perfective: "xīn",
        sourceClass: "B",
        tense: "preterit",
        morph: "0",
        morphSurface: false,
        matrix: "tla-(tzin-o-ā)",
        nounstem: "(tzin)-tli-",
        owner: "§55.6",
        replaced: true,
        retained: [["m", "o", "reflexive"]],
        pronouns: true,
        participants: true,
        automaticControls: [false, false, false, false],
    });

    const classFrames = [
        honor(ctx, { sourceStem: "patlā", verbClass: "A",
            subject: "2pl", tense: "imperfect" }),
        xima,
        honor(ctx, { sourceStem: "tlal-o-ā", verbClass: "C" }),
        honor(ctx, { sourceStem: "zōma", verbClass: "D",
            tense: "future" }),
    ];
    s.eq("all four verb classes supply their own canonical perfective without a stem list",
        classFrames.map(frame => ({
            status: frame.authorizationStatus,
            sourceClass: frame.operationFrame?.operationFacts
                ?.embeddedPredicateVerbClass,
            perfective: frame.operationFrame?.operationFacts
                ?.embeddedPredicateStem,
            surface: frame.surfaceRealization,
            whitelist: frame.operationFrame?.operationFacts
                ?.exampleStemWhitelistUsed,
        })), [
            { status: "authorized", sourceClass: "A", perfective: "patlā",
                surface: "ammopatlātzinoāyah", whitelist: false },
            { status: "authorized", sourceClass: "B", perfective: "xīn",
                surface: "moxīntzinoa", whitelist: false },
            { status: "authorized", sourceClass: "C", perfective: "tlal-o-h",
                surface: "motlalohtzinoa", whitelist: false },
            { status: "authorized", sourceClass: "D", perfective: "zōmah",
                surface: "mozōmahtzinōz", whitelist: false },
        ]);

    const sourceApplication = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "xīma",
        sourceValence: "mainline-reflexive",
        verbClass: "B",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        derivationType: "direct",
    });
    const recaptured = honor(ctx, {
        sourceValence: undefined,
        sourceApplicationFrame: sourceApplication,
    });
    s.eq("a complete owner-issued Result is recaptured without rebuilding its topology", {
        status: recaptured.authorizationStatus,
        sourceIdentity: recaptured.operationFrame?.operationFacts
            ?.ownerIssuedSourceApplicationFrame === sourceApplication,
        resultIdentity: recaptured.operationFrame?.operationFacts
            ?.ownerIssuedSourceResultFrame === sourceApplication.resultFrame,
        retained: recaptured.operationFrame?.operationFacts
            ?.ownerIssuedSourceRetained,
        formulaAuthority: recaptured.operationFrame?.operationFacts
            ?.callerFormulaAuthorityAccepted,
        surfaceAuthority: recaptured.operationFrame?.operationFacts
            ?.callerSurfaceAuthorityAccepted,
    }, {
        status: "authorized",
        sourceIdentity: true,
        resultIdentity: true,
        retained: true,
        formulaAuthority: false,
        surfaceAuthority: false,
    });

    const shuntline = honor(ctx, {
        sourceStem: "paca",
        sourceValence: "shuntline-reflexive",
        verbClass: "A",
        lateVariant: "preterit-embed",
    });
    const wrongTopology = honor(ctx, {
        sourceStem: "paca",
        sourceValence: "intransitive",
        verbClass: "A",
        lateVariant: "preterit-embed",
    });
    s.eq("shuntline and nonreflexive Sources cannot enter the mainline route", {
        shuntline: [shuntline.authorizationStatus, shuntline.blockReason],
        nonreflexive: [wrongTopology.authorizationStatus,
            wrongTopology.blockReason],
        mainlineFact: facts.shuntlineReflexiveUsesPreteritEmbed,
    }, {
        shuntline: ["blocked",
            "honorific-preterit-embed-requires-mainline-reflexive-source"],
        nonreflexive: ["blocked",
            "honorific-preterit-embed-requires-mainline-reflexive-source"],
        mainlineFact: false,
    });

    const cues = classFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.finalTypedVncSlotFrame,
            frame,
        )
    )).filter(cue => cue.role === GROUP);
    s.eq("all accepted Group 7 atoms have exact jobs and one canonical clickable cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        cue: cues.some(cue => records.every(record => (
            cue.atomIds?.includes(record.atomId)
        ))),
    }, { records: 40, writing: 17, readingOnly: 23,
        accepted: true, cue: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.atomIds?.includes(record.atomId));
        s.ok(`${record.atomId} observes the mainline preterit-embed Result`,
            Boolean(cue));
        s.eq(`mutation:${record.atomId} loses exact credit`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }
    return s;
}

module.exports = { run };
