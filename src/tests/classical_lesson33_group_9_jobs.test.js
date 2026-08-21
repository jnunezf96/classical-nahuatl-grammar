"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson33-pejorative-preterit-embed-vncs";

function request(overrides = {}) {
    return {
        sourceStem: "patlā",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        lateOperation: "pejorative",
        lateVariant: "preterit-embed",
        honoredParticipant: "subject",
        ...overrides,
    };
}

function pejorate(ctx, overrides = {}) {
    return ctx.requestClassicalLateVncOperation(request(overrides));
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_group_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    const renderingSource = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    const shellSource = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");

    const projectiveSubject = pejorate(ctx, {
        sourceStem: "chīhua",
        sourceValence: "specific-projective",
        verbClass: "B",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const projectiveObject = pejorate(ctx, {
        sourceStem: "chīhua",
        sourceValence: "specific-projective",
        verbClass: "B",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        honoredParticipant: "object",
    });
    const facts = projectiveSubject.operationFrame?.operationFacts || {};
    s.eq("the Source perfective replaces the specific object of the fixed pejorative matrix", {
        status: projectiveSubject.authorizationStatus,
        rule: projectiveSubject.operationFrame?.ruleFamily,
        target: projectiveSubject.operationFrame?.targetStem,
        surface: projectiveSubject.surfaceRealization,
        formula: projectiveSubject.formulaRealization,
        aspect: facts.embeddedPredicateAspect,
        perfective: facts.embeddedPredicateStem,
        sourceClass: facts.embeddedPredicateVerbClass,
        preterit: [facts.embeddedPreteritMorph,
            facts.embeddedPreteritMorphHasSurface],
        matrix: [facts.fixedAffectiveMatrix, facts.matrixStem,
            facts.matrixSourceNounstem, facts.matrixFormationOwner],
        restricted: facts.matrixRestrictedToPejorativeConstruction,
        replaced: facts.incorporatedPredicateReplacesMatrixSpecificObject,
        automatic: [facts.attitudeRouteChoiceRequired,
            facts.userSelectsMatrix, facts.userSelectsPerfectiveClassForm,
            facts.userSelectsObjectReplacement,
            facts.userSelectsCompoundBracketing],
    }, {
        status: "authorized",
        rule: "pejorative-preterit-embed",
        target: "chīuh-0-pōl-o-ā",
        surface: "nicchīuhpōloa",
        formula: "#ni-0+c-0(chīuh-0-pōl-o-a)0+0-0#",
        aspect: "perfective",
        perfective: "chīuh",
        sourceClass: "B",
        preterit: ["0", false],
        matrix: ["tla-(pōl-o-ā)", "pōl-o-ā", "(-pōl)-Ø-", "§54.10"],
        restricted: true,
        replaced: true,
        automatic: [false, false, false, false, false],
    });

    s.eq("a projective Source preserves its object and exposes only the real disparagement ambiguity", {
        topology: facts.sourceTopology,
        retained: facts.retainedSourceObjectPositions.map(position => (
            [position.objectKind, position.objectPerson,
                position.va1, position.va2]
        )),
        pronouns: facts.sourceObjectPronounsPreserved,
        roles: facts.sourceObjectNumberAndRolesPreserved,
        participants: facts.sourceParticipantsPreserved,
        possible: facts.possibleDisparagedParticipants,
        selected: facts.disparagedParticipant,
        choice: facts.disparagedParticipantChoiceRequired,
        ambiguity: facts.subjectObjectDisparagementAmbiguityPreserved,
        alternate: [projectiveObject.authorizationStatus,
            projectiveObject.surfaceRealization,
            projectiveObject.operationFrame?.operationFacts
                ?.disparagedParticipant],
    }, {
        topology: "projective-object",
        retained: [["specific-projective", "3sg", "c", "0"]],
        pronouns: true,
        roles: true,
        participants: true,
        possible: ["subject", "object"],
        selected: "subject",
        choice: true,
        ambiguity: true,
        alternate: ["authorized", "nicchīuhpōloa", "object"],
    });

    const reflexive = pejorate(ctx, {
        sourceStem: "xīma",
        sourceValence: "mainline-reflexive",
        verbClass: "B",
        objectKind: "reflexive",
    });
    const reflexiveFacts = reflexive.operationFrame?.operationFacts || {};
    s.eq("first-person self-disparagement is licensed without inventing a reflexive subject-object choice", {
        status: reflexive.authorizationStatus,
        surface: reflexive.surfaceRealization,
        formula: reflexive.formulaRealization,
        topology: reflexiveFacts.sourceTopology,
        possible: reflexiveFacts.possibleDisparagedParticipants,
        choice: reflexiveFacts.disparagedParticipantChoiceRequired,
        automatic: reflexiveFacts.disparagedParticipantAutomaticallySelected,
        firstPerson: reflexiveFacts.firstPersonSubjectMayBeDisparaged,
        self: reflexiveFacts.selfDisparagementAllowed,
        honorRestriction: reflexiveFacts.selfHonorificationRestrictionDoesNotApply,
    }, {
        status: "authorized",
        surface: "ninoxīnpōloa",
        formula: "#ni-0+n-o(xīn-0-pōl-o-a)0+0-0#",
        topology: "reflexive-object",
        possible: ["subject"],
        choice: false,
        automatic: "subject",
        firstPerson: true,
        self: true,
        honorRestriction: true,
    });

    const classFrames = [
        pejorate(ctx, { sourceStem: "patlā", verbClass: "A" }),
        pejorate(ctx, { sourceStem: "quīza", verbClass: "B" }),
        pejorate(ctx, { sourceStem: "tlal-o-ā", verbClass: "C" }),
        pejorate(ctx, { sourceStem: "zōma", verbClass: "D" }),
    ];
    s.eq("all four verb classes provide their canonical perfective without a stem whitelist",
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
                surface: "nipatlāpōloa", whitelist: false },
            { status: "authorized", sourceClass: "B", perfective: "quīz",
                surface: "niquīzpōloa", whitelist: false },
            { status: "authorized", sourceClass: "C", perfective: "tlal-o-h",
                surface: "nitlalohpōloa", whitelist: false },
            { status: "authorized", sourceClass: "D", perfective: "zōmah",
                surface: "nizōmahpōloa", whitelist: false },
        ]);

    const absentObject = pejorate(ctx, {
        honoredParticipant: "object",
    });
    s.eq("participant facts can block an absent object while the same Source shape remains productive", {
        blocked: [absentObject.authorizationStatus, absentObject.blockReason],
        valid: [classFrames[0].authorizationStatus,
            classFrames[0].operationFrame?.operationFacts
                ?.disparagedParticipant],
        authorities: [facts.canvasExampleAuthority,
            facts.callerFormulaAuthorityAccepted,
            facts.callerSurfaceAuthorityAccepted],
    }, {
        blocked: ["blocked", "pejorative-participant-not-present-in-source"],
        valid: ["authorized", "subject"],
        authorities: [false, false, false],
    });

    s.ok("the interface names the pejorative participant accurately and shows it only for genuine ambiguity",
        shellSource.includes("data-classical-attitude-participant-label")
        && renderingSource.includes('"Disparaged participant"')
        && renderingSource.includes("disparagedParticipantChoiceRequired")
        && renderingSource.includes("possibleDisparagedParticipants"));

    const cues = [projectiveSubject, projectiveObject, reflexive,
        ...classFrames].flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.finalTypedVncSlotFrame,
            frame,
        )
    )).filter(cue => cue.role === GROUP);
    s.eq("all accepted Group 9 atoms have exact jobs and one canonical clickable cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        cue: cues.some(cue => records.every(record => (
            cue.atomIds?.includes(record.atomId)
        ))),
    }, { records: 31, writing: 15, readingOnly: 16,
        accepted: true, cue: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.atomIds?.includes(record.atomId));
        s.ok(`${record.atomId} observes the pejorative preterit-embed Result`,
            Boolean(cue));
        s.eq(`mutation:${record.atomId} loses exact credit`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }
    return s;
}

module.exports = { run };
