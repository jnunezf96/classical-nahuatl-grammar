"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const suite = createSuite("classical_participant_frame_contract");

    const issueVnc = (overrides = {}) => ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{
            sourceStem: "chōca",
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "3sg",
            requestedDerivation: "direct",
            requestedVoice: "active",
            mood: "indicative",
            tense: "present",
            outputScope: "single",
            ...overrides,
        }],
    });

    const animal = issueVnc({
        sourceSubject: "1sg",
        sourceSubjectPerson: "1",
        sourceSubjectAnimacy: "animate",
        sourceSubjectHumanness: "nonhuman",
        sourceSubjectNumber: "plural",
    }).canonicalResult.normalizedRequest.sourceSubjectFrame;
    suite.eq("an animate nonhuman participant is third-person plural", {
        category: animal.category,
        morphology: animal.morphologicalAgreement,
        person: animal.person,
        animacy: animal.animacy,
        humanness: animal.humanness,
        number: animal.number,
        case: animal.case,
    }, {
        category: "3pl",
        morphology: "3pl",
        person: "3",
        animacy: "animate",
        humanness: "nonhuman",
        number: "plural",
        case: "nominative",
    });

    const speaker = issueVnc({
        sourceSubject: "1sg",
        sourceSubjectPerson: "1",
        sourceSubjectAnimacy: "nonanimate",
        sourceSubjectHumanness: "nonhuman",
    }).canonicalResult.normalizedRequest.sourceSubjectFrame;
    suite.eq("first person entails human animate reference", {
        person: speaker.person,
        animacy: speaker.animacy,
        humanness: speaker.humanness,
    }, { person: "1", animacy: "animate", humanness: "human" });

    const thing = issueVnc({
        sourceSubject: "3sg",
        sourceSubjectAnimacy: "nonanimate",
        sourceSubjectNumber: "plural",
    }).canonicalResult.normalizedRequest.sourceSubjectFrame;
    suite.eq("nonanimate reference uses third common number", {
        category: thing.category,
        morphology: thing.morphologicalAgreement,
        person: thing.person,
        humanness: thing.humanness,
        number: thing.number,
        commonShape: thing.commonNumberUsesSingularMorphology,
    }, {
        category: "3common",
        morphology: "3sg",
        person: "3",
        humanness: "nonhuman",
        number: "common",
        commonShape: true,
    });

    const thingRequest = issueVnc({
        sourceSubject: "3common",
        sourceSubjectAnimacy: "nonanimate",
    }).canonicalResult.normalizedRequest;
    suite.eq("VNC keeps the common category while using singular agreement morphology", {
        sourceSubject: thingRequest.sourceSubject,
        category: thingRequest.sourceSubjectFrame.category,
        morphology: thingRequest.sourceSubjectFrame.morphologicalAgreement,
    }, { sourceSubject: "3sg", category: "3common", morphology: "3sg" });

    const thirdAnimate = issueVnc({
        sourceSubject: "3sg",
        sourceSubjectAnimacy: "animate",
        sourceSubjectHumanness: "unspecified",
    }).canonicalResult.normalizedRequest.sourceSubjectFrame;
    suite.ok("third animate humanness remains a genuine unresolved choice", thirdAnimate.humannessSelectionRequired);

    const objectResult = issueVnc({
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "2pl",
    }).canonicalResult.normalizedRequest.sourceObjectRequests[0].participantFrame;
    suite.eq("a specific object uses the same frame with objective case", {
        role: objectResult.role,
        case: objectResult.case,
        person: objectResult.person,
        number: objectResult.number,
        humanness: objectResult.humanness,
    }, { role: "object", case: "objective", person: "2", number: "plural", humanness: "human" });

    const causativeSource = ctx.buildClassicalNahuatlVerbstemClassFrame("xopi", {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
        perfectiveClass: "B",
        valence: "intransitive",
        transitivity: "intransitive",
        objectKind: "intransitive",
    });
    const causativeOption = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        causativeSource,
        { derivationType: "causative" },
    ).options.find((option) => option.derivationSubtype === "type-one");
    const causative = issueVnc({
        sourceStem: "xopi",
        verbClass: "B",
        requestedDerivation: "causative",
        derivationType: "causative",
        derivationOptionId: causativeOption.optionId,
        sourceSubject: "2pl",
        subject: "1sg",
        causativeObjectKind: "specific-projective",
    }).canonicalResult;
    const causee = causative.resultFrame.participantProjection.targetObjects.find(
        (participant) => participant.role === "causee",
    );
    suite.eq("a causative causee uses the shared objective participant frame", {
        role: causee?.role,
        case: causee?.case,
        person: causee?.person,
        number: causee?.number,
    }, { role: "causee", case: "objective", person: "2", number: "plural" });

    const nncSubject = ctx.buildClassicalNahuatlNncSubjectPersonFrame({
        subject: "3pl",
        followingMaterial: "cal",
        animacy: "animate",
        humanness: "nonhuman",
    }).participantFrame;
    suite.eq("NNC subjects use the same participant structure", {
        role: nncSubject.role,
        case: nncSubject.case,
        person: nncSubject.person,
        number: nncSubject.number,
        humanness: nncSubject.humanness,
    }, { role: "subject", case: "nominative", person: "3", number: "plural", humanness: "nonhuman" });

    const nncSource = ctx.issueCanonicalNncSourceFrame({ stem: "eh" });
    const nncAnimalSelection = ctx.getCanonicalNncOperationSelectionFrame(
        nncSource,
        { subject: "3pl", animacy: "animate", humanness: "nonhuman" },
    );
    suite.eq("the NNC application exposes animate third-person humanness as a real choice", {
        choices: nncAnimalSelection.humannessValues,
        selected: nncAnimalSelection.selectedHumanness,
        person: nncAnimalSelection.subjectParticipantFrame.person,
        animacy: nncAnimalSelection.subjectParticipantFrame.animacy,
    }, {
        choices: ["human", "nonhuman"],
        selected: "nonhuman",
        person: "3",
        animacy: "animate",
    });

    const nncThingSelection = ctx.getCanonicalNncOperationSelectionFrame(
        nncSource,
        { subject: "3common", animacy: "nonanimate", humanness: "nonhuman" },
    );
    suite.eq("NNC keeps the same common category and singular agreement morphology", {
        selectedSubject: nncThingSelection.selectedSubject,
        category: nncThingSelection.subjectParticipantFrame.category,
        morphology: nncThingSelection.subjectParticipantFrame.morphologicalAgreement,
        case: nncThingSelection.subjectParticipantFrame.case,
    }, {
        selectedSubject: "3common",
        category: "3common",
        morphology: "3sg",
        case: "nominative",
    });

    const nncSpeakerSelection = ctx.getCanonicalNncOperationSelectionFrame(
        nncSource,
        { subject: "1sg", animacy: "animate", humanness: "nonhuman" },
    );
    suite.eq("NNC first person automatically fixes human animacy", {
        choices: nncSpeakerSelection.humannessValues,
        selected: nncSpeakerSelection.selectedHumanness,
        humanness: nncSpeakerSelection.subjectParticipantFrame.humanness,
    }, { choices: ["human"], selected: "human", humanness: "human" });

    const possessor = ctx.buildClassicalNahuatlPossessiveStateFrame({
        possessor: "1pl",
        subject: "3sg",
        stem: "cal",
    }).possessorParticipantFrame;
    suite.eq("NNC possessors use the same participant structure", {
        role: possessor.role,
        case: possessor.case,
        person: possessor.person,
        number: possessor.number,
    }, { role: "possessor", case: "possessive", person: "1", number: "plural" });

    const principal = issueVnc({
        sourceSubject: "3pl",
        sourceSubjectPerson: "3",
        sourceSubjectAnimacy: "animate",
        sourceSubjectHumanness: "nonhuman",
        sourceSubjectNumber: "plural",
        subject: "3pl",
    });
    const target = Object.create(ctx);
    const controllerApi = ctx.createClassicalClauseRelationControllerGlobals(target);
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(controllerApi));
    const controller = target.createClassicalClauseRelationController();
    const captured = controller.captureCurrentResult("principal", principal.canonicalResult);
    suite.eq("capture accepts the owner-issued canonical Result", {
        authorizationStatus: captured.authorizationStatus,
        ownerIssuedResultSourcePresent: captured.ownerIssuedResultSourcePresent,
    }, { authorizationStatus: "authorized", ownerIssuedResultSourcePresent: true });
    const envelope = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        principal.canonicalResult,
        { referenceId: "animal", subjectReferenceId: "animal" },
    );
    suite.eq("captured clause participants retain animacy and humanness", {
        animacy: envelope.subject?.participantFrame?.animacy,
        humanness: envelope.subject?.participantFrame?.humanness,
        number: envelope.subject?.participantFrame?.number,
    }, { animacy: "animate", humanness: "nonhuman", number: "plural" });

    return suite;
}

module.exports = { run };
