"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson33-projective-causative-honorifics";

function analysis(sourceStem, availableFormations = ["causative"],
    preferredFormation = "") {
    return {
        lexicalStatus: "honorific-formation-analysis",
        sourceStem,
        availableFormations,
        preferredFormation,
    };
}

function request(ctx, {
    sourceStem = "caqui",
    verbClass = "B",
    subject = "3sg",
    objectPerson = "3sg",
    formation = "causative",
    availableFormations = [formation],
    preferredFormation = formation,
    honoredParticipant = "subject",
    alternative = "default",
} = {}) {
    const base = {
        sourceStem,
        sourceValence: "specific-projective",
        verbClass,
        sourceSubject: subject,
        subject,
        mood: "indicative",
        tense: "present",
        voice: "active",
        objectKind: "specific-projective",
        objectPerson,
        lateOperation: "honorific",
        lateVariant: formation,
        honoredParticipant,
        honorificFormationAnalysis: analysis(
            sourceStem, availableFormations, preferredFormation
        ),
        honorificStemAlternative: alternative,
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication({
        ...base,
        lateOperation: undefined,
        lateVariant: undefined,
        requestedDerivation: formation,
        derivationType: formation,
        requestedVoice: "active",
        ...(formation === "causative"
            ? { causativeObjectKind: "reflexive" }
            : { applicativeObjectKind: "reflexive",
                applicativeObjectPerson: "" }),
    });
    return {
        ...base,
        honorificDerivationOptionId:
            preview.controlFrame?.derivationOptionInventory
                ?.options?.[0]?.optionId || "",
    };
}

function honor(ctx, options = {}) {
    return ctx.evaluateClassicalNahuatlLateVncDerivation(
        request(ctx, options)
    );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_group_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const caquiSubject = honor(ctx);
    const caquiObject = honor(ctx, { honoredParticipant: "object" });
    const caquiAlternative = honor(ctx, { alternative: "l-causative" });
    const facts = caquiObject.operationFrame?.operationFacts || {};

    s.eq("the projective causative keeps its patient and adds the reflexive agent", {
        status: caquiObject.authorizationStatus,
        surface: caquiObject.surfaceRealization,
        target: caquiObject.operationFrame?.targetStem,
        targetClass: caquiObject.operationFrame?.targetClass,
        rules: caquiObject.operationFrame?.ruleFamilies,
        patient: (facts.retainedProjectiveObjectPositions || []).map(
            position => ({
                id: position.objectId,
                kind: position.objectKind,
                person: position.objectPerson,
                governor: position.governor,
                level: position.derivationalLevel,
            })
        ),
        reflexive: {
            va1: facts.causativeReflexiveAgentPosition?.va1,
            va2: facts.causativeReflexiveAgentPosition?.va2,
            kind: facts.causativeReflexiveAgentPosition?.objectKind,
            governor: facts.causativeReflexiveAgentPosition?.governor,
        },
        preservation: [facts.projectiveCausativePatientPreserved,
            facts.projectiveCausativePatientNumberAndRolePreserved,
            facts.causativeReflexiveAgentAddedAutomatically,
            facts.causativeReflexiveAgentCoreferentialWithResultSubject,
            facts.literalSelfCausationReading],
    }, {
        status: "authorized",
        surface: "quimocaquitīa",
        target: "caqui-tīā",
        targetClass: "C",
        rules: ["honorific-causative", "honorific-gate",
            "honorific-irregular", "honorific-projective",
            "honorific-projective-causative"],
        patient: [{ id: "source-object-1",
            kind: "specific-projective", person: "3sg",
            governor: "directive", level: 1 }],
        reflexive: { va1: "m", va2: "o", kind: "reflexive",
            governor: "causative" },
        preservation: [true, true, true, true, true],
    });

    s.eq("agent versus patient respect remains a real choice only when both readings survive", {
        subject: [caquiSubject.authorizationStatus,
            caquiSubject.surfaceRealization,
            caquiSubject.operationFrame?.operationFacts
                ?.honoredParticipant],
        object: [caquiObject.authorizationStatus,
            caquiObject.surfaceRealization, facts.honoredParticipant],
        possible: facts.possibleHonoredParticipants,
        choice: facts.honoredParticipantChoiceRequired,
        ambiguity: facts.agentOrPatientHonorificAmbiguity,
    }, {
        subject: ["authorized", "quimocaquitīa", "subject"],
        object: ["authorized", "quimocaquitīa", "object"],
        possible: ["subject", "object"],
        choice: true,
        ambiguity: true,
    });

    s.eq("the two documented caqui realizations are concise lexical alternatives", {
        default: [caquiSubject.surfaceRealization,
            caquiSubject.operationFrame?.targetStem],
        alternative: [caquiAlternative.authorizationStatus,
            caquiAlternative.surfaceRealization,
            caquiAlternative.operationFrame?.targetStem],
        options: facts.honorificFormationAnalysisFrame?.formationOptions
            ?.map(option => [option.optionId, option.targetStem]),
        choice: facts.lexicalAlternativeChoiceRequired,
    }, {
        default: ["quimocaquitīa", "caqui-tīā"],
        alternative: ["authorized", "quimocaquiltia",
            "caqui-l-tiā"],
        options: [["default", "caqui-tīā"],
            ["l-causative", "caqui-l-tiā"]],
        choice: true,
    });

    const nequi = honor(ctx, {
        sourceStem: "nequi",
        verbClass: "B",
        subject: "1sg",
        honoredParticipant: "subject",
    });
    s.eq("a first-person subject automatically honors the eligible patient", {
        status: nequi.authorizationStatus,
        surface: nequi.surfaceRealization,
        target: nequi.operationFrame?.targetStem,
        participant: nequi.operationFrame?.operationFacts
            ?.honoredParticipant,
        possible: nequi.operationFrame?.operationFacts
            ?.possibleHonoredParticipants,
        choice: nequi.operationFrame?.operationFacts
            ?.honoredParticipantChoiceRequired,
        forced: nequi.operationFrame?.operationFacts
            ?.firstPersonSubjectForcesObjectHonorification,
    }, {
        status: "authorized",
        surface: "nicnonequiltia",
        target: "nequi-l-tiā",
        participant: "object",
        possible: ["object"],
        choice: false,
        forced: true,
    });

    const cuepaApplicative = honor(ctx, {
        sourceStem: "cuepa", verbClass: "A",
        formation: "applicative",
        availableFormations: ["causative", "applicative"],
        preferredFormation: "",
    });
    const cuepaCausative = honor(ctx, {
        sourceStem: "cuepa", verbClass: "A",
        formation: "causative",
        availableFormations: ["causative", "applicative"],
        preferredFormation: "",
    });
    s.eq("typed Source analysis can license both cuepa routes without making a route whitelist", {
        applicative: [cuepaApplicative.authorizationStatus,
            cuepaApplicative.operationFrame?.targetStem,
            cuepaApplicative.surfaceRealization],
        causative: [cuepaCausative.authorizationStatus,
            cuepaCausative.operationFrame?.targetStem,
            cuepaCausative.surfaceRealization],
        routeChoice: cuepaCausative.operationFrame?.operationFacts
            ?.routeChoiceRequired,
        whitelist: cuepaCausative.operationFrame?.operationFacts
            ?.routeMembershipWhitelistUsed,
        exampleAuthority: cuepaCausative.operationFrame?.operationFacts
            ?.exactExampleStemRouteAuthority,
    }, {
        applicative: ["authorized", "cuep-i-liā", "quimocuepilia"],
        causative: ["authorized", "cuep-i-l-tiā",
            "quimocuepiltia"],
        routeChoice: true,
        whitelist: false,
        exampleAuthority: false,
    });

    const open = honor(ctx, {
        sourceStem: "paca", verbClass: "A",
        availableFormations: ["causative"],
    });
    const sameShapeChanged = honor(ctx, {
        sourceStem: "toca", verbClass: "A",
        availableFormations: ["causative"],
    });
    const routeBlocked = honor(ctx, {
        sourceStem: "paca", verbClass: "A",
        formation: "causative",
        availableFormations: ["applicative"],
        preferredFormation: "applicative",
    });
    const mismatchedAnalysis = ctx.evaluateClassicalNahuatlLateVncDerivation({
        ...request(ctx, { sourceStem: "paca", verbClass: "A" }),
        honorificFormationAnalysis: analysis("caqui", ["causative"]),
    });
    s.eq("route authority comes from matching typed analysis, not example membership", {
        open: [open.authorizationStatus,
            open.operationFrame?.operationFacts
                ?.typedHonorificFormationAnalysisSupplied,
            open.operationFrame?.operationFacts
                ?.routeMembershipWhitelistUsed],
        changedStem: [sameShapeChanged.authorizationStatus,
            sameShapeChanged.operationFrame?.operationFacts
                ?.projectiveCausativeHonorific],
        wrongRoute: [routeBlocked.authorizationStatus,
            routeBlocked.blockReason],
        wrongStemAnalysis: [mismatchedAnalysis.authorizationStatus,
            mismatchedAnalysis.blockReason],
    }, {
        open: ["authorized", true, false],
        changedStem: ["authorized", true],
        wrongRoute: ["blocked",
            "honorific-formation-not-licensed-by-typed-source-analysis"],
        wrongStemAnalysis: ["blocked",
            "valid-matching-honorific-formation-analysis-required"],
    });

    const cues = [caquiSubject, caquiObject, caquiAlternative, nequi,
        cuepaCausative, open, sameShapeChanged]
        .flatMap(frame => ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.finalTypedVncSlotFrame,
            frame,
        ))
        .filter(cue => cue.role === GROUP);
    s.eq("all accepted Group 6 atoms have exact jobs and one canonical clickable cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        cue: cues.some(cue => records.every(record => (
            cue.atomIds?.includes(record.atomId)
        ))),
    }, { records: 16, writing: 11, readingOnly: 5,
        accepted: true, cue: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.atomIds?.includes(record.atomId));
        s.ok(`${record.atomId} observes the projective causative Result`,
            Boolean(cue));
        s.eq(`mutation:${record.atomId} loses exact credit`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }
    return s;
}

module.exports = { run };
