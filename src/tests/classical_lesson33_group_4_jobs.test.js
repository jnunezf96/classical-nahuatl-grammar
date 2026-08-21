"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson33-projective-applicative-honorifics";

function analysis(sourceStem) {
    return {
        lexicalStatus: "honorific-formation-analysis",
        sourceStem,
        availableFormations: ["applicative"],
        preferredFormation: "applicative",
    };
}

function derivationOption(ctx, sourceStem, subject = "3sg", targetStem = "") {
    const preview = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        objectNumber: "common",
        verbClass: "A",
        sourceSubject: subject,
        subject,
        mood: "indicative",
        tense: "present",
        requestedDerivation: "applicative",
        derivationType: "applicative",
        requestedVoice: "active",
        applicativeObjectKind: "reflexive",
        applicativeObjectPerson: "",
    });
    const options = preview.controlFrame?.derivationOptionInventory?.options || [];
    return (targetStem
        ? options.find(option => option.targetStem === targetStem)
        : options[0])?.optionId || "";
}

function projective(ctx, sourceStem, {
    subject = "3sg",
    honoredParticipant = "subject",
    objectPerson = "3sg",
    objectNumber = "common",
    targetStem = "",
    ...overrides
} = {}) {
    return ctx.evaluateClassicalNahuatlLateVncDerivation({
        sourceStem,
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson,
        objectNumber,
        verbClass: "A",
        subject,
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "honorific",
        lateVariant: "applicative",
        honoredParticipant,
        honorificFormationAnalysis: analysis(sourceStem),
        honorificDerivationOptionId: derivationOption(
            ctx, sourceStem, subject, targetStem
        ),
        ...overrides,
    });
}

function typedObjects(frame) {
    return (frame?.finalTypedVncSlotFrame?.slots?.prePredicate || [])
        .map(slot => slot.objectPositionFrame || {})
        .map(position => ({
            kind: position.objectKind || "",
            person: position.objectPerson || "",
            number: position.objectNumber || "",
            governor: position.governor || "",
        }));
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_group_4_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");

    const subjectHonored = projective(ctx, "huīca", {
        honoredParticipant: "subject",
        targetStem: "huīqui-liā",
    });
    const objectHonored = projective(ctx, "huīca", {
        honoredParticipant: "object",
        targetStem: "huīqui-liā",
    });
    const firstPerson = projective(ctx, "huīca", {
        subject: "1sg",
        honoredParticipant: "subject",
        targetStem: "huīqui-liā",
    });
    const openShape = projective(ctx, "paca", {
        honoredParticipant: "object",
    });

    s.eq("the canonical applicative owner preserves the projective object and adds the reflexive beneficiary", {
        status: subjectHonored.authorizationStatus,
        target: subjectHonored.operationFrame?.targetStem,
        surface: subjectHonored.surfaceRealization,
        families: subjectHonored.operationFrame?.ruleFamilies?.filter(
            family => family.includes("honorific-projective")
        ),
        objects: typedObjects(subjectHonored),
        facts: {
            projective: subjectHonored.operationFrame?.operationFacts
                ?.projectiveApplicativeHonorific,
            preserved: subjectHonored.operationFrame?.operationFacts
                ?.projectiveObjectsPreserved,
            numberAndRoles: subjectHonored.operationFrame?.operationFacts
                ?.projectiveObjectNumberAndRolesPreserved,
            reflexiveAdded: subjectHonored.operationFrame?.operationFacts
                ?.reflexiveBeneficiaryAddedAutomatically,
            ownBenefit: subjectHonored.operationFrame?.operationFacts
                ?.literalOwnBenefitReading,
        },
    }, {
        status: "authorized",
        target: "huīqui-liā",
        surface: "quimohuīquilia",
        families: ["honorific-projective", "honorific-projective-applicative"],
        objects: [
            { kind: "specific-projective", person: "3sg",
                number: "common", governor: "directive" },
            { kind: "reflexive", person: "", number: "",
                governor: "applicative" },
        ],
        facts: { projective: true, preserved: true, numberAndRoles: true,
            reflexiveAdded: true, ownBenefit: true },
    });

    s.eq("third-person projective Sources preserve the real participant ambiguity", {
        subject: [subjectHonored.authorizationStatus,
            subjectHonored.operationFrame?.operationFacts?.honoredParticipant],
        object: [objectHonored.authorizationStatus,
            objectHonored.operationFrame?.operationFacts?.honoredParticipant],
        sameNahuatlResult:
            subjectHonored.surfaceRealization === objectHonored.surfaceRealization,
        possible: subjectHonored.operationFrame?.operationFacts
            ?.possibleHonoredParticipants,
        choice: subjectHonored.operationFrame?.operationFacts
            ?.honoredParticipantChoiceRequired,
        ambiguity: subjectHonored.operationFrame?.operationFacts
            ?.participantAmbiguityPreserved,
        englishSelects: subjectHonored.operationFrame?.operationFacts
            ?.englishHonorificPlacementSelectsParticipant,
    }, {
        subject: ["authorized", "subject"],
        object: ["authorized", "object"],
        sameNahuatlResult: true,
        possible: ["subject", "object"],
        choice: true,
        ambiguity: true,
        englishSelects: false,
    });

    s.eq("a first-person projective subject automatically honors the existing object", {
        status: firstPerson.authorizationStatus,
        surface: firstPerson.surfaceRealization,
        honored: firstPerson.operationFrame?.operationFacts?.honoredParticipant,
        possible: firstPerson.operationFrame?.operationFacts
            ?.possibleHonoredParticipants,
        choice: firstPerson.operationFrame?.operationFacts
            ?.honoredParticipantChoiceRequired,
        automatic: firstPerson.operationFrame?.operationFacts
            ?.honoredParticipantAutomaticallySelected,
        forced: firstPerson.operationFrame?.operationFacts
            ?.firstPersonSubjectForcesObjectHonorification,
        objects: typedObjects(firstPerson).map(position => position.kind),
    }, {
        status: "authorized",
        surface: "nicnohuīquilia",
        honored: "object",
        possible: ["object"],
        choice: false,
        automatic: "object",
        forced: true,
        objects: ["specific-projective", "reflexive"],
    });

    const missingObject = ctx.evaluateClassicalNahuatlLateVncDerivation({
        sourceStem: "paca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "honorific",
        lateVariant: "applicative",
        honoredParticipant: "object",
        honorificFormationAnalysis: analysis("paca"),
    });
    s.eq("participant facts govern the route while Source spelling remains open", {
        open: [openShape.authorizationStatus,
            openShape.operationFrame?.sourceStem,
            openShape.operationFrame?.operationFacts?.projectiveObjectsPreserved,
            openShape.operationFrame?.operationFacts?.canvasExamplesAuthorizeRoute],
        missing: [missingObject.authorizationStatus, missingObject.blockReason],
    }, {
        open: ["authorized", "paca", true, false],
        missing: ["blocked", "first-person-honorific-requires-projective-patient"],
    });

    const cues = [subjectHonored, objectHonored, firstPerson, openShape]
        .flatMap(frame => ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.finalTypedVncSlotFrame,
            frame,
        ))
        .filter(cue => cue.role === GROUP);
    s.eq("all accepted Group 4 atoms have exact jobs and a clickable cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        cue: cues.some(cue => records.every(record => (
            cue.atomIds?.includes(record.atomId)
        ))),
    }, { records: 26, writing: 19, readingOnly: 7,
        accepted: true, cue: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.atomIds?.includes(record.atomId));
        s.ok(`${record.atomId} observes the canonical projective Result`,
            Boolean(cue));
        s.eq(`mutation:${record.atomId} loses exact credit`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }

    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("the repaired Grammar lane exposes only the surviving participant choice",
        rendering.includes("const projectiveHonorificSource = [")
        && rendering.includes("&& !firstPersonHonorificSubject")
        && rendering.includes('? "object"')
        && rendering.includes("classicalAttitudeParticipantChoiceRequired")
        && !rendering.includes("classical-attitude-projective-object-number")
        && !rendering.includes("classical-attitude-reflexive-choice"));
    return s;
}

module.exports = { run };
