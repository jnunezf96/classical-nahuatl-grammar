"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson24_groups_10_11_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson24-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson24-short-vowel-hui-destockal-causatives",
        "lesson24-causative-participant-transform",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const source = (stem, subject = "3sg", verbClass = "B") => (
        ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject,
            mood: "indicative",
            tense: "present",
            verbClass,
            perfectiveClass: verbClass,
            valence: "intransitive",
            transitivity: "intransitive",
            objectKind: "none",
        })
    );
    const analysis = (stem, subject = "3sg", verbClass = "B") => (
        ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source(stem, subject, verbClass))
    );
    const inventory = (stem, subject = "3sg", verbClass = "B") => (
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            source(stem, subject, verbClass),
            { derivationType: "causative" },
        )
    );
    const route = (stem, routeName, sourceSubject = "3sg", targetSubject = "1sg", causativeObjectKind = "") => {
        const options = inventory(stem, sourceSubject, "B");
        const option = options.options.find((candidate) => candidate.derivationRoute === routeName) || null;
        const frame = ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: stem,
            verbClass: "B",
            sourceValence: "intransitive",
            sourceSubject,
            subject: targetSubject,
            requestedDerivation: "causative",
            derivationOptionId: option?.optionId || "missing-lesson24-option",
            causativeObjectKind,
            requestedVoice: "active",
            outputScope: "single",
        });
        const cues = frame.resultFrame?.formulaRealization
            ? ctx.getClassicalFormulaDerivedAnnotations(frame.resultFrame.formulaRealization, null, frame)
            : [];
        return { options, option, frame, cues };
    };

    const shortSources = [
        ["zep-i-hui", "i", "regular-short-stock-selection", false],
        ["iht-a-hui", "a", "regular-short-stock-selection", false],
        ["pol-i-hui", "i", "regular-short-stock-selection", true],
        ["zep-a-hui", "a", "exceptional-short-stock-analysis", false],
        ["tlap-o-hui", "o", "special-o-hui-source", false],
    ].map(([stem, stock, relation, rootFinalLOverride]) => {
        const frame = analysis(stem);
        const item = frame.analyses.find((candidate) => candidate.category === "destockal-i-a-o-hui") || null;
        return {
            stem,
            stock,
            relation,
            rootFinalLOverride,
            frame,
            item,
            direct: ctx.evaluateClassicalNahuatlVncApplication({
                sourceStem: stem,
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "3sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                outputScope: "single",
            }),
        };
    });
    const zep = route("zep-i-hui", "type-one-destockal-hui-to-o-a");
    const xoc = route("xoc-a-hui", "type-one-destockal-hui-to-o-a");
    const tlap = route("xep-o-hui", "type-one-destockal-o-hui-to-o-a");
    const pilNegative = {
        frame: analysis("pil-i-hui"),
        inventory: inventory("pil-i-hui"),
    };
    const pilCaInventory = inventory("pil-ca");
    const pilCaOption = pilCaInventory.options.find((option) => (
        option.derivationRoute === "type-one-totally-irregular-pilca-piloa-exact"
    )) || null;

    const activeDifferent = route("xepi", "type-one-final-i-replacement", "3sg", "1sg");
    const activeSameSpecific = route("xepi", "type-one-final-i-replacement", "3sg", "3sg", "specific-projective");
    const activeSameReflexive = route("xepi", "type-one-final-i-replacement", "3sg", "3sg", "reflexive");
    const firstPersonSame = route("xepi", "type-one-final-i-replacement", "1sg", "1sg");
    const sameInventory = inventory("xepi", "3sg");
    const sameOption = sameInventory.options.find((option) => option.derivationRoute === "type-one-final-i-replacement") || null;
    const sameUnchosen = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source("xepi", "3sg"), {
        derivationType: "causative",
        optionId: sameOption?.optionId || "missing-tomi-option",
        targetSubject: "3sg",
    });

    const impersonalActive = source("tomi", "3sg");
    const impersonalStem = ctx.deriveClassicalNahuatlNonactiveStemRecord("tomi", {
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const impersonalSource = ctx.buildClassicalNahuatlDerivedVncFrame(impersonalActive, {
        voice: "impersonal",
        nonactiveStemRecord: impersonalStem,
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
    });
    const impersonalInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(impersonalSource, {
        derivationType: "causative",
    });
    const impersonalOption = impersonalInventory.options.find((option) => option.derivationSubtype === "type-one") || null;
    const impersonalOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(impersonalSource, {
        derivationType: "causative",
        optionId: impersonalOption?.optionId || "missing-impersonal-tomi-option",
        targetSubject: "1sg",
    });

    const directShortCues = shortSources.map(({ direct }) => (
        ctx.getClassicalFormulaDerivedAnnotations(
            direct.resultFrame.formulaRealization,
            null,
            direct,
        )
    ));
    const observations = {
        "lesson24-short-vowel-hui-destockal-causatives": {
            structure: shortSources.map(({ stock, relation, rootFinalLOverride, item }) => [
                item?.shortStockVowelSelectionFrame?.stockFormative || "",
                item?.shortStockVowelSelectionFrame?.relation || "",
                item?.shortStockVowelSelectionFrame?.rootFinalLOverride === true,
                item?.sourceAnalysisSelectionRequired === true,
                item?.shortHuiCausativeRelationFrame?.relation || "",
            ]),
            openTargets: [zep, xoc, tlap].map(({ frame, option, cues }) => [
                frame.authorizationStatus,
                option?.targetStem || "",
                option?.targetClass || "",
                cues.some((cue) => cue.role === "lesson24-short-vowel-hui-destockal-causatives"),
            ]),
            exactGap: [
                pilNegative.frame.analyses.find((item) => item.category === "destockal-i-a-o-hui")
                    ?.shortHuiCausativeRelationFrame?.relation || "",
                pilNegative.inventory.options.some((option) => /destockal-(?:o-)?hui-to-o-a/u.test(option.derivationRoute)),
            ],
            irregular: [pilCaOption?.targetStem || "", pilCaOption?.targetClass || ""],
            directCues: directShortCues.every((cues) => cues.some((cue) => (
                cue.role === "lesson24-short-vowel-hui-destockal-causatives"
            ))),
        },
        "lesson24-causative-participant-transform": {
            automaticProjective: (() => {
                const participant = activeDifferent.frame.resultFrame.derivationOperationFrame.participantTransformFrame;
                return [participant.sourceSubjectBecomesCausativeObject, participant.causativeObjectKind, participant.addedObjectRequest?.objectPerson, participant.targetSubject, participant.causativeObjectKindChoiceEligible];
            })(),
            genuineChoice: [activeSameSpecific, activeSameReflexive].map(({ frame }) => {
                const participant = frame.resultFrame.derivationOperationFrame.participantTransformFrame;
                return [participant.authorizationStatus, participant.causativeObjectKind, participant.causativeObjectKindChoiceEligible, participant.allowedCausativeObjectKinds];
            }),
            unchosen: [sameUnchosen.authorizationStatus, sameUnchosen.blockReason],
            firstPerson: (() => {
                const participant = firstPersonSame.frame.resultFrame.derivationOperationFrame.participantTransformFrame;
                return [participant.causativeObjectKind, participant.causativeObjectKindChoiceEligible, participant.allowedCausativeObjectKinds];
            })(),
            impersonal: (() => {
                const participant = impersonalOperation.participantTransformFrame;
                return [participant.authorizationStatus, participant.sourceVoice, participant.implicitAgentBecomesCausativeObject, participant.referentiallyEmptySourceSubjectDiscarded, participant.causativeObjectKind, participant.addedObjectRequest?.governor, participant.targetSubject];
            })(),
            cues: [activeDifferent, activeSameSpecific, activeSameReflexive, firstPersonSame].every(({ cues }) => cues.some((cue) => (
                cue.role === "lesson24-causative-participant-transform"
            ))),
        },
    };
    const expected = {
        "lesson24-short-vowel-hui-destockal-causatives": {
            structure: [
                ["i", "regular-short-stock-selection", false, false, "productive-i-a-hui-to-o-a"],
                ["a", "regular-short-stock-selection", false, false, "productive-i-a-hui-to-o-a"],
                ["i", "regular-short-stock-selection", true, false, "productive-i-a-hui-to-o-a"],
                ["a", "exceptional-short-stock-analysis", false, true, "productive-i-a-hui-to-o-a"],
                ["o", "special-o-hui-source", false, false, "special-o-hui-to-o-a"],
            ],
            openTargets: [
                ["authorized", "zep-o-ā", "C", true],
                ["authorized", "xoc-o-ā", "C", true],
                ["authorized", "xep-o-ā", "C", true],
            ],
            exactGap: ["exact-o-a-counterpart-blocked", false],
            irregular: ["pil-o-ā", "C"],
            directCues: true,
        },
        "lesson24-causative-participant-transform": {
            automaticProjective: [true, "specific-projective", "3sg", "1sg", false],
            genuineChoice: [
                ["authorized", "specific-projective", true, ["specific-projective", "reflexive"]],
                ["authorized", "reflexive", true, ["specific-projective", "reflexive"]],
            ],
            unchosen: ["blocked", "classical-vnc-causative-causee-valence-selection-required"],
            firstPerson: ["reflexive", false, ["reflexive"]],
            impersonal: ["authorized", "impersonal", true, true, "nonspecific-nonhuman", "causative", "1sg"],
            cues: true,
        },
    };
    const mutations = {
        "lesson24-short-vowel-hui-destockal-causatives": [
            zep.option?.targetClass !== "C",
            xoc.option?.targetStem !== "xoc-o-ā",
            pilNegative.inventory.options.some((option) => /destockal-(?:o-)?hui-to-o-a/u.test(option.derivationRoute)),
            !directShortCues[0].some((cue) => cue.label.includes("no inventory gate")),
        ],
        "lesson24-causative-participant-transform": [
            activeDifferent.frame.resultFrame.derivationOperationFrame.participantTransformFrame.causativeObjectKindChoiceEligible,
            activeSameReflexive.frame.resultFrame.derivationOperationFrame.participantTransformFrame.causativeObjectKind !== "reflexive",
            impersonalOperation.participantTransformFrame.addedObjectRequest?.governor !== "causative",
            !activeSameSpecific.cues.some((cue) => cue.label.includes("genuine causee choice")),
        ],
    };

    s.eq("accepted Lesson 24 Groups 10-11 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 104, records: 104, both: 32, readingOnly: 72, unique: 104 });
    for (const record of writing) {
        s.eq(
            `${record.atomId} has its exact accepted application job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted job is contradicted`,
            mutations[record.reviewGroupId].some(Boolean),
            false,
        );
    }
    return s;
}

module.exports = { run };
