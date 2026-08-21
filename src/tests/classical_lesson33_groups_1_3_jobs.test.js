"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson33-honorific-vnc-foundation-and-participant-gate",
    "lesson33-intransitive-causative-honorifics",
    "lesson33-intransitive-applicative-honorifics",
];

function analysis(sourceStem, availableFormations, preferredFormation = "") {
    return {
        lexicalStatus: "honorific-formation-analysis",
        sourceStem,
        availableFormations,
        preferredFormation,
    };
}

function base(sourceStem, verbClass = "A", overrides = {}) {
    return {
        sourceStem,
        sourceValence: "intransitive",
        verbClass,
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "honorific",
        honoredParticipant: "subject",
        ...overrides,
    };
}

function derivationOption(ctx, sourceStem, formation, verbClass = "A", index = 0) {
    const preview = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        sourceValence: "intransitive",
        verbClass,
        sourceSubject: "3sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: formation,
        derivationType: formation,
        requestedVoice: "active",
        ...(formation === "causative"
            ? { causativeObjectKind: "reflexive" }
            : { applicativeObjectKind: "reflexive", applicativeObjectPerson: "" }),
    });
    return preview.controlFrame?.derivationOptionInventory
        ?.options?.[index]?.optionId || "";
}

function productive(ctx, sourceStem, formation, {
    verbClass = "A",
    optionIndex = 0,
    availableFormations = [formation],
    preferredFormation = formation,
    ...overrides
} = {}) {
    return ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        sourceStem,
        verbClass,
        {
            lateVariant: formation,
            honorificFormationAnalysis: analysis(
                sourceStem,
                availableFormations,
                preferredFormation,
            ),
            honorificDerivationOptionId: derivationOption(
                ctx,
                sourceStem,
                formation,
                verbClass,
                optionIndex,
            ),
            ...overrides,
        }
    ));
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");

    const chocaCausative = ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        "chōca",
        "A",
        {
            lateVariant: "causative",
            honorificFormationAnalysis: analysis(
                "chōca",
                ["causative", "applicative"],
                "applicative",
            ),
        }
    ));
    const chocaApplicative = ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        "chōca",
        "A",
        {
            lateVariant: "applicative",
            honorificFormationAnalysis: analysis(
                "chōca",
                ["causative", "applicative"],
                "applicative",
            ),
        }
    ));
    const openMonomorphemic = productive(ctx, "cochi", "causative");
    const openPolymorphemic = productive(ctx, "māy-a-hui", "causative", {
        optionIndex: 1,
    });
    const openApplicative = productive(ctx, "tēmi", "applicative", {
        optionIndex: 1,
    });
    const miquiApplicative = ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        "miqui",
        "B",
        {
            lateVariant: "applicative",
            honorificFormationAnalysis: {
                ...analysis("miqui", ["applicative"], "applicative"),
                honorificOnlyApplicative: true,
            },
        }
    ));

    s.eq("typed Source analysis controls route availability without a stem list", {
        both: [chocaCausative.authorizationStatus,
            chocaCausative.operationFrame?.operationFacts?.availableFormations,
            chocaCausative.operationFrame?.operationFacts?.routeChoiceRequired,
            chocaCausative.operationFrame?.operationFacts?.preferredFormation],
        monomorphemic: [openMonomorphemic.authorizationStatus,
            openMonomorphemic.operationFrame?.sourceStem,
            openMonomorphemic.operationFrame?.targetStem,
            openMonomorphemic.operationFrame?.operationFacts
                ?.sourceMorphemicProfile?.morphemicComplexity,
            openMonomorphemic.operationFrame?.operationFacts
                ?.formationAutomaticallySelected],
        polymorphemic: [openPolymorphemic.authorizationStatus,
            openPolymorphemic.operationFrame?.targetStem,
            openPolymorphemic.operationFrame?.operationFacts
                ?.sourceMorphemicProfile?.morphemicComplexity,
            openPolymorphemic.operationFrame?.operationFacts
                ?.sourceMorphemicProfile?.boundaryFamilies,
            openPolymorphemic.operationFrame?.operationFacts
                ?.canvasExamplesAuthorizeRoute],
    }, {
        both: ["authorized", ["causative", "applicative"], true, "applicative"],
        monomorphemic: ["authorized", "cochi", "cochi-ā",
            "monomorphemic", true],
        polymorphemic: ["authorized", "māy-a-tiā", "polymorphemic",
            ["X-hui", "X-V-hui"], false],
    });

    s.eq("causative and applicative honorifics preserve their distinct readings", {
        causative: [chocaCausative.operationFrame?.targetStem,
            chocaCausative.operationFrame?.operationFacts
                ?.autonomousAgentCausativeReading,
            chocaCausative.operationFrame?.operationFacts
                ?.reflexiveRelationAutomatic,
            chocaCausative.operationFrame?.operationFacts
                ?.reflexiveCoreference,
            chocaCausative.operationFrame?.operationFacts
                ?.lexicalAlternativeChoiceRequired],
        applicative: [chocaApplicative.authorizationStatus,
            chocaApplicative.operationFrame?.targetStem,
            chocaApplicative.operationFrame?.operationFacts?.ownInterestReading,
            chocaApplicative.operationFrame?.operationFacts
                ?.reflexiveCoreference],
        openApplicative: [openApplicative.authorizationStatus,
            openApplicative.operationFrame?.targetStem,
            openApplicative.operationFrame?.operationFacts
                ?.formationAutomaticallySelected],
        honorificOnly: [miquiApplicative.authorizationStatus,
            miquiApplicative.operationFrame?.targetStem,
            miquiApplicative.operationFrame?.operationFacts
                ?.honorificOnlyApplicative],
    }, {
        causative: ["choc-tiā", true, true, "result-subject", true],
        applicative: ["authorized", "chōqui-liā", true, "result-subject"],
        openApplicative: ["authorized", "tēmi-liā", true],
        honorificOnly: ["authorized", "miqui-liā", true],
    });

    const routeMismatch = ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        "cochi",
        "A",
        {
            lateVariant: "applicative",
            honorificFormationAnalysis: analysis(
                "cochi",
                ["causative"],
                "causative",
            ),
        }
    ));
    const sourceMismatch = ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        "cochi",
        "A",
        {
            lateVariant: "causative",
            honorificFormationAnalysis: analysis(
                "not-cochi",
                ["causative"],
                "causative",
            ),
        }
    ));
    const selfHonorific = ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        "chōca",
        "A",
        {
            subject: "1sg",
            lateVariant: "applicative",
            honorificFormationAnalysis: analysis(
                "chōca",
                ["applicative"],
                "applicative",
            ),
        }
    ));
    const firstPersonMissingObject = ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        "chōca",
        "A",
        {
            subject: "1sg",
            lateVariant: "applicative",
            honoredParticipant: "object",
            honorificFormationAnalysis: analysis(
                "chōca",
                ["applicative"],
                "applicative",
            ),
        }
    ));
    const motionOptative = ctx.evaluateClassicalNahuatlLateVncDerivation(base(
        "huī-tz",
        "A",
        {
            mood: "optative",
            tense: "nonpast",
            lateVariant: "causative",
            honorificFormationAnalysis: analysis(
                "huī-tz",
                ["causative"],
                "causative",
            ),
        }
    ));
    s.eq("contradicting participant, route, Source, and mood facts are blocked", {
        route: [routeMismatch.authorizationStatus, routeMismatch.blockReason],
        source: [sourceMismatch.authorizationStatus, sourceMismatch.blockReason],
        self: [selfHonorific.authorizationStatus, selfHonorific.blockReason],
        missingObject: [firstPersonMissingObject.authorizationStatus,
            firstPersonMissingObject.blockReason],
        mood: [motionOptative.authorizationStatus, motionOptative.blockReason],
    }, {
        route: ["blocked",
            "honorific-formation-not-licensed-by-typed-source-analysis"],
        source: ["blocked",
            "valid-matching-honorific-formation-analysis-required"],
        self: ["blocked", "self-honorific-not-authorized"],
        missingObject: ["blocked",
            "first-person-honorific-requires-projective-patient"],
        mood: ["blocked", "huica-tz-honorific-has-no-optative"],
    });

    const cueFrames = [chocaCausative, chocaApplicative,
        openMonomorphemic, openPolymorphemic, openApplicative];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.finalTypedVncSlotFrame,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted atoms have exact writing and clickable-cue routes", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = records.filter(record => record.reviewGroupId === group)
                .map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 124, writing: 61, readingOnly: 63,
        groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.role === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted canonical observation`,
            Boolean(cue?.atomIds?.includes(record.atomId)));
        s.eq(`mutation:${record.atomId} loses exact credit when its atom is removed`,
            cue.atomIds.filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("the repaired Source and Formation lanes own the genuine Lesson 33 choices",
        shell.includes('id="classical-construction-operation"')
        && shell.includes('id="classical-attitude-source-analysis"')
        && shell.includes('id="classical-attitude-formation"')
        && shell.includes('id="classical-attitude-derivation-option"')
        && shell.includes('id="classical-attitude-stem-alternative"')
        && rendering.includes('"classical-attitude-source-analysis",')
        && rendering.includes('makeClassicalCustomFormationPlacement("", "derivation")')
        && rendering.includes("licensedFormations.size > 1")
        && rendering.includes("derivationOptions.length > 1")
        && rendering.includes("lexicalAlternatives.length > 1")
        && rendering.includes("sourceAnalysisRoot.appendChild(wrapper)")
        && rendering.includes("lane.appendChild(wrapper)"));
    return s;
}

module.exports = { run };
