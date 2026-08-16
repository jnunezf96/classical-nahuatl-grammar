"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson22_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson22-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson22-inherently-impersonal-vncs",
        "lesson22-nonanimate-versus-impersonal-subjects",
        "lesson22-transformed-impersonal-voice",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const active = ({
        stem = "mayāna",
        subject = "3pl",
        valence = "intransitive",
        objectPerson = "",
        verbClass = "B",
    } = {}) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence,
        transitivity: valence === "intransitive" ? "intransitive" : "transitive",
        objectKind: valence,
        objectPerson,
    });
    const deriveImpersonal = ({
        stem = "mayāna",
        subject = "3pl",
        valence = "intransitive",
        objectPerson = "",
        verbClass = "B",
    } = {}) => {
        const source = active({ stem, subject, valence, objectPerson, verbClass });
        const record = ctx.deriveClassicalNahuatlNonactiveStemRecord(stem, {
            verbClass,
            sourceValence: valence,
        });
        return ctx.buildClassicalNahuatlDerivedVncFrame(source, {
            voice: "impersonal",
            nonactiveStemRecord: record,
            sourceValence: valence,
            sourceSubject: subject,
            sourceObjectPerson: objectPerson,
            mood: "indicative",
            tense: "present",
            verbClass,
        });
    };

    const inherentSource = active({
        stem: "yohua",
        subject: "1sg",
        valence: "intransitive",
        verbClass: "A",
    });
    const inherentRecord = ctx.buildClassicalNahuatlInherentImpersonalRecord(
        "yohua",
        { selectionAuthority: "andrews-lesson22-voice-selection" },
    );
    const inherent = ctx.buildClassicalNahuatlDerivedVncFrame(inherentSource, {
        voice: "inherent-impersonal",
        inherentImpersonalRecord: inherentRecord,
        sourceValence: "intransitive",
        sourceSubject: "1sg",
        verbClass: "A",
    });
    const arbitraryInherent = ctx.buildClassicalNahuatlInherentImpersonalRecord(
        "xele",
        { selectionAuthority: "andrews-lesson22-voice-selection" },
    );
    const missingInherent = ctx.buildClassicalNahuatlInherentImpersonalRecord(
        "",
        { selectionAuthority: "andrews-lesson22-voice-selection" },
    );
    const inherentApplicationChoice = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "yohua",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "1sg",
        requestedDerivation: "direct",
        requestedVoice: "active",
        outputScope: "single",
    });
    const inherentApplication = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "yohua",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "1sg",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        nonactiveOptionId: "inherent-impersonal",
        outputScope: "single",
    });
    const inherentCue = ctx.getClassicalFormulaDerivedAnnotations(
        inherent.formulaRealization,
        null,
        inherent,
    ).find((entry) => entry.role === "inherently-impersonal-subject");

    const nonanimate = ctx.buildClassicalNahuatlVncSubjectReferenceFrame({
        grammaticalVoice: "active",
        subjectMorphology: "3sg",
        subjectAnimacy: "nonanimate",
        referentIdentity: "the named things",
        supplementPresent: true,
    });
    const emptyImpersonal = ctx.buildClassicalNahuatlVncSubjectReferenceFrame({
        grammaticalVoice: "impersonal",
        subjectMorphology: "3sg",
    });
    const nonanimateCue = ctx.getClassicalFormulaDerivedAnnotations(
        "#0-0(chip-ā-hua)0+0-0#",
        null,
        { subjectReferenceFrame: nonanimate },
    ).find((entry) => entry.role === "nonanimate-versus-impersonal-subject");
    const omittedReferent = ctx.buildClassicalNahuatlVncSubjectReferenceFrame({
        grammaticalVoice: "active",
        subjectMorphology: "3sg",
        subjectAnimacy: "nonanimate",
    });
    const supplementedImpersonal = ctx.buildClassicalNahuatlVncSubjectReferenceFrame({
        grammaticalVoice: "impersonal",
        subjectMorphology: "3sg",
        supplementPresent: true,
    });

    const transformed = deriveImpersonal();
    const nonspecific = deriveImpersonal({
        stem: "chihua",
        valence: "projective-human",
        verbClass: "A",
    });
    const reflexive = deriveImpersonal({
        stem: "zahua",
        subject: "1sg",
        valence: "mainline-reflexive",
        verbClass: "A",
    });
    const specific = deriveImpersonal({
        stem: "chihua",
        valence: "specific-projective",
        objectPerson: "2sg",
        verbClass: "A",
    });
    const transformedCue = ctx.getClassicalFormulaDerivedAnnotations(
        transformed.formulaRealization,
        null,
        transformed,
    ).find((entry) => entry.role === "transformed-impersonal-voice");

    const observations = {
        "lesson22-inherently-impersonal-vncs": {
            inventory: [
                "tōna",
                "quiy-a-hui",
                "te-c-i-hui",
                "āy-a-hui",
                "yohua",
            ].map((stem) => (
                ctx.getClassicalNahuatlInherentImpersonalSourceAnalysis(stem)
                    .authorizationStatus
            )),
            result: [
                inherent.authorizationStatus,
                inherent.voice,
                inherent.subject,
                inherent.voiceTransformationFrame.impersonalSubjectReferent,
                inherent.voiceTransformationFrame.impersonalSubjectImportedFromOutsideSource,
                inherent.voiceTransformationFrame.sourceSubjectDeleted,
                inherent.formulaRealization,
            ],
            openSource: [
                arbitraryInherent.authorizationStatus,
                arbitraryInherent.blockReason,
                arbitraryInherent.sourceAnalysis.canvasExampleMatch,
                arbitraryInherent.sourceAnalysis.sourceAnalysisStatus,
            ],
            applicationControl: [
                inherentApplicationChoice.authorizationStatus,
                inherentApplicationChoice.blockReason,
                inherentApplicationChoice.controlFrame.allowedVoices,
                inherentApplicationChoice.controlFrame.selectedVoice,
                inherentApplicationChoice.controlFrame.voiceNormalizationReason,
                inherentApplicationChoice.controlFrame.nonactiveSelectorRequired,
                inherentApplicationChoice.controlFrame.nonactiveOptionInventory.options
                    .map((option) => option.optionId),
                inherentApplication.authorizationStatus,
                inherentApplication.resultFrame?.formulaRealization,
            ],
            cue: [inherentCue?.role, inherentCue?.atomIds?.length, inherentCue?.lessonSections],
        },
        "lesson22-nonanimate-versus-impersonal-subjects": {
            nonanimate: [
                nonanimate.authorizationStatus,
                nonanimate.subjectKind,
                nonanimate.referentStatus,
                nonanimate.semanticNumber,
                nonanimate.supplementable,
                nonanimate.supplementPresent,
            ],
            impersonal: [
                emptyImpersonal.authorizationStatus,
                emptyImpersonal.subjectKind,
                emptyImpersonal.grammaticalSubjectPresent,
                emptyImpersonal.referentStatus,
                emptyImpersonal.semanticNumber,
                emptyImpersonal.supplementable,
            ],
            sharedSurface: [nonanimate.subjectMorphology, emptyImpersonal.subjectMorphology],
            cue: [nonanimateCue?.role, nonanimateCue?.atomIds?.length, nonanimateCue?.lessonSections],
        },
        "lesson22-transformed-impersonal-voice": {
            transform: [
                transformed.authorizationStatus,
                transformed.voice,
                transformed.voiceTransformationFrame.sourceSubject,
                transformed.voiceTransformationFrame.sourceSubjectDeleted,
                transformed.voiceTransformationFrame.targetSubject,
                transformed.voiceTransformationFrame.impersonalSubjectReferent,
                transformed.voiceTransformationFrame.targetStem,
                transformed.formulaRealization,
            ],
            eligible: [
                nonspecific.authorizationStatus,
                nonspecific.voiceTransformationFrame.targetValence,
                reflexive.authorizationStatus,
                reflexive.voiceTransformationFrame.targetValence,
            ],
            specificBlocked: [specific.authorizationStatus, specific.blockReason],
            cue: [transformedCue?.role, transformedCue?.atomIds?.length, transformedCue?.lessonSections],
        },
    };
    const expected = {
        "lesson22-inherently-impersonal-vncs": {
            inventory: ["authorized", "authorized", "authorized", "authorized", "authorized"],
            result: [
                "authorized",
                "inherent-impersonal",
                "3sg",
                "none",
                true,
                true,
                "#0-0(yohua)0+0-0#",
            ],
            openSource: [
                "authorized",
                "",
                false,
                "user-supplied-typed-lexical-analysis",
            ],
            applicationControl: [
                "authorized",
                "",
                ["impersonal"],
                "impersonal",
                "inherent-impersonal-source-fixes-public-voice",
                true,
                ["lō:yohua-lō", "inherent-impersonal", "tla-impersonal"],
                "authorized",
                "#0-0(yohua)0+0-0#",
            ],
            cue: ["inherently-impersonal-subject", 12, ["§22.1"]],
        },
        "lesson22-nonanimate-versus-impersonal-subjects": {
            nonanimate: [
                "authorized",
                "nonanimate-referential",
                "identifiable",
                "common",
                true,
                true,
            ],
            impersonal: [
                "authorized",
                "impersonal-nonreferential",
                true,
                "none",
                "not-applicable",
                false,
            ],
            sharedSurface: ["3sg", "3sg"],
            cue: ["nonanimate-versus-impersonal-subject", 10, ["§22.2"]],
        },
        "lesson22-transformed-impersonal-voice": {
            transform: [
                "authorized",
                "impersonal",
                "3pl",
                true,
                "3sg",
                "none",
                "mayāna-lō",
                "#0-0(mayāna-lo)0+0-0#",
            ],
            eligible: [
                "authorized",
                "projective-human",
                "authorized",
                "shuntline-reflexive",
            ],
            specificBlocked: ["blocked", "impersonal-blocks-specific-projective-source"],
            cue: ["transformed-impersonal-voice", 25, ["§22.3"]],
        },
    };
    const mutations = {
        "lesson22-inherently-impersonal-vncs": [
            missingInherent.authorizationStatus,
            missingInherent.blockReason,
            inherent.subject === "1sg",
            inherent.voiceTransformationFrame.impersonalSubjectReferent,
            inherentApplicationChoice.controlFrame.allowedVoices.includes("active"),
        ],
        "lesson22-nonanimate-versus-impersonal-subjects": [
            omittedReferent.authorizationStatus,
            omittedReferent.blockReason,
            supplementedImpersonal.authorizationStatus,
            supplementedImpersonal.blockReason,
        ],
        "lesson22-transformed-impersonal-voice": [
            specific.authorizationStatus,
            transformed.subject === "3pl",
            transformed.voiceTransformationFrame.sourceSubjectDeleted,
            transformed.voiceTransformationFrame.targetStem === "mayāna",
        ],
    };
    const expectedMutations = {
        "lesson22-inherently-impersonal-vncs": [
            "blocked",
            "lesson22-inherent-impersonal-source-stem-required",
            false,
            "none",
            false,
        ],
        "lesson22-nonanimate-versus-impersonal-subjects": [
            "blocked",
            "lesson22-nonanimate-subject-referent-identity-required",
            "blocked",
            "lesson22-impersonal-subject-cannot-be-supplemented",
        ],
        "lesson22-transformed-impersonal-voice": ["blocked", false, true, false],
    };

    s.eq("accepted Lesson 22 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 65, unique: 65, writing: 47, reading: 18 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} works through canonical typed owners`,
            observations[groupId],
            expected[groupId],
        );
    });
    for (const record of writing) {
        s.eq(
            `${record.atomId} performs its accepted writing job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            mutations[record.reviewGroupId],
            expectedMutations[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
