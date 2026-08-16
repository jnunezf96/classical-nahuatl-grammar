"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson22_groups_7_8_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson22-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson22-impersonal-optative-and-admonitive",
        "lesson22-tla-impersonal-derivation-and-lexicon",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const apply = (request = {}) => ctx.evaluateClassicalNahuatlVncApplication({
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        sourceValence: "intransitive",
        subject: "3sg",
        outputScope: "single",
        mood: "indicative",
        tense: "present",
        ...request,
    });
    const cueFor = (applicationFrame, role, readingFrame = null) => {
        const machinery = applicationFrame.resultFrame?.selectedMachineryFrame;
        return ctx.getClassicalFormulaDerivedAnnotations(
            applicationFrame.resultFrame?.formulaRealization || "",
            null,
            readingFrame
                ? { ...machinery, lesson22ImpersonalReadingFrame: readingFrame }
                : machinery,
        ).find((entry) => entry.role === role);
    };

    const optative = apply({
        sourceStem: "cuīca",
        verbClass: "A",
        subject: "3pl",
        mood: "optative",
        nonactiveOptionId: "ō:cuic-ō",
    });
    const admonitive = apply({
        sourceStem: "cuīca",
        verbClass: "A",
        subject: "3pl",
        mood: "admonitive",
        nonactiveOptionId: "ō:cuic-ō",
    });
    const activeOptative = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "cuīca",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3pl",
        requestedVoice: "active",
        outputScope: "single",
        mood: "optative",
        tense: "present",
    });
    const optativeCue = cueFor(
        optative,
        "impersonal-optative-admonitive-sentence-path",
    );
    const admonitiveCue = cueFor(
        admonitive,
        "impersonal-optative-admonitive-sentence-path",
    );
    const activeOptativeCue = cueFor(
        activeOptative,
        "impersonal-optative-admonitive-sentence-path",
    );

    const tlaSources = [
        ["huā-qui", "tla-huā-qui", "inchoative", "general-nonhuman", "attested-source", ["general-drying", "drought"]],
        ["pol-i-hui", "tla-pol-i-hui", "inchoative", "general-nonhuman", "attested-source", []],
        ["cel-i-ya", "tla-cel-i-ya", "inchoative", "general-nonhuman", "attested-source", []],
        ["ihyā-ya", "tla-ihyā-ya", "stative", "general-nonhuman", "attested-source", []],
        ["cah-ca-h", "tla-cah-ca-h", "stative", "general-nonhuman", "attested-source", []],
        ["on-o", "tla-on-o", "stative", "general-nonhuman", "attested-source", []],
        ["chic-ā-hua", "tla-chic-ā-hua", "inchoative", "general-nonhuman", "attested-source", []],
        ["huē-i-ya", "tla-huē-i-ya", "inchoative", "general-nonhuman", "attested-source", []],
        ["it-hui", "tla-t-hui", "reconstructed-inchoative", "general-nonhuman", "reconstructed-source", ["general-perceptibility", "daybreak"]],
        ["petl-ā-ni", "tla-petl-ā-ni", "meteorological", "general-nonhuman", "attested-source", []],
        ["tlatz-i-ni", "tla-tlatz-ī-ni", "meteorological", "general-nonhuman", "attested-source", []],
        ["poy-ā-hua", "tla-poy-ā-hua", "meteorological", "general-nonhuman", "attested-source", []],
        ["nēci", "tla-nēci", "meteorological", "general-nonhuman", "attested-source", ["nonspecific-entity-brightness", "general-brightness", "dawn"]],
        ["ce-ce-ya", "tla-ce-ce-ya", "meteorological", "general-nonhuman", "attested-source", []],
        ["yohua", "tla-yohua", "inherent-impersonal-layer", "referentially-empty", "attested-source", []],
        ["ih-cahu-a-ca", "tla-h-cahu-a-ca", "animate-generality-exception", "general-human", "attested-source", ["general-noisy-talk", "general-hubbub", "enemy-war-cries"]],
        ["cue-cuech-ca", "tla-cue-cuech-ca", "animate-generality-exception", "general-human", "attested-source", []],
        ["izta-ya", "tla-zta-ya", "finite-contrast-inchoative", "general-nonhuman", "attested-source", ["general-whitening", "dawn"]],
    ];
    const analyses = tlaSources.map(([sourceStem]) => (
        ctx.getClassicalNahuatlTlaImpersonalSourceAnalysis(sourceStem)
    ));
    const inventory = ctx.getClassicalNahuatlCanonicalSourceStemInventory("vnc");
    const sourcePickerContainsAll = tlaSources.every(([sourceStem]) => (
        inventory.some((record) => (
            record.stem === sourceStem
            && record.valenceDisplay === "intransitive"
        ))
    ));
    const neci = apply({
        sourceStem: "nēci",
        verbClass: "B",
        tense: "preterit",
        nonactiveOptionId: "tla-impersonal",
    });
    const huaqui = apply({
        sourceStem: "huā-qui",
        verbClass: "B",
        tense: "future",
        nonactiveOptionId: "tla-impersonal",
    });
    const tlatzini = apply({
        sourceStem: "tlatz-i-ni",
        verbClass: "B",
        tense: "preterit",
        nonactiveOptionId: "tla-impersonal",
    });
    const iztaya = apply({
        sourceStem: "izta-ya",
        verbClass: "B",
        nonactiveOptionId: "tla-impersonal",
    });
    const neciInventory =
        ctx.interpretClassicalNahuatlImpersonalResultReading(neci);
    const neciDawn =
        ctx.interpretClassicalNahuatlImpersonalResultReading(neci, {
            requestedReading: "dawn",
        });
    const invalidNeciReading =
        ctx.interpretClassicalNahuatlImpersonalResultReading(neci, {
            requestedReading: "drought",
        });
    const fixedTlatziniReading =
        ctx.interpretClassicalNahuatlImpersonalResultReading(tlatzini);
    const tlaCue = cueFor(
        neci,
        "tla-impersonal-derivation-and-lexicon",
        neciDawn,
    );
    const hostileTarget = ctx.buildClassicalNahuatlTlaImpersonalStemRecord(
        "nēci",
        {
            impersonalStem: "tla-nēci",
            selectionAuthority: "andrews-lesson22-rule-derivation",
        },
    );
    const arbitrarySource = apply({
        sourceStem: "xele",
        verbClass: "A",
        nonactiveOptionId: "tla-impersonal",
    });
    const arbitrarySourceAnalysis =
        ctx.getClassicalNahuatlTlaImpersonalSourceAnalysis("xele");
    const missingSource = ctx.getClassicalNahuatlTlaImpersonalSourceAnalysis("");

    const observations = {
        "lesson22-impersonal-optative-and-admonitive": {
            results: [
                [optative.authorizationStatus, optative.resultFrame.formulaRealization, optative.resultFrame.surfaceRealization],
                [admonitive.authorizationStatus, admonitive.resultFrame.formulaRealization, admonitive.resultFrame.surfaceRealization],
            ],
            preserved: [
                optative.resultFrame.selectedMachineryFrame.voice,
                optative.resultFrame.selectedMachineryFrame.subject,
                admonitive.resultFrame.selectedMachineryFrame.voice,
                admonitive.resultFrame.selectedMachineryFrame.subject,
            ],
            cue: [
                optativeCue?.role,
                optativeCue?.atomIds?.length,
                optativeCue?.lessonSections,
                admonitiveCue?.label.includes("ordinary admonitive sentence path"),
            ],
        },
        "lesson22-tla-impersonal-derivation-and-lexicon": {
            inventory: [
                analyses.length,
                analyses.every((analysis, index) => (
                    analysis.authorizationStatus === "authorized"
                    && analysis.canonicalSourceStem === tlaSources[index][0]
                    && analysis.derivedTargetStem === tlaSources[index][1]
                    && analysis.semanticClass === tlaSources[index][2]
                    && analysis.subjectDomain === tlaSources[index][3]
                    && analysis.sourceAttestation === tlaSources[index][4]
                    && JSON.stringify(analysis.availableReadings)
                        === JSON.stringify(tlaSources[index][5])
                    && analysis.targetDerivedByEngine === true
                    && analysis.callerSuppliedTargetAuthority === false
                )),
                sourcePickerContainsAll,
            ],
            finite: [
                [neci.resultFrame.formulaRealization, neci.resultFrame.surfaceRealization],
                [huaqui.resultFrame.formulaRealization, huaqui.resultFrame.surfaceRealization],
                [tlatzini.resultFrame.formulaRealization, tlatzini.resultFrame.surfaceRealization],
                [iztaya.resultFrame.formulaRealization, iztaya.resultFrame.surfaceRealization],
            ],
            reading: [
                neciInventory.availableReadings,
                neciDawn.selectedReading,
                neciDawn.derivationalTla,
                neciDawn.formulaRealization,
                neciDawn.changesFiniteMorphology,
                fixedTlatziniReading.authorizationStatus,
                fixedTlatziniReading.blockReason,
            ],
            cue: [
                tlaCue?.role,
                tlaCue?.atomIds?.length,
                tlaCue?.lessonSections,
                tlaCue?.label.includes("not object tla"),
                tlaCue?.label.includes("selected reading dawn"),
            ],
            openSource: [
                arbitrarySource.authorizationStatus,
                arbitrarySource.resultFrame?.formulaRealization,
                arbitrarySourceAnalysis.canvasExampleMatch,
            ],
        },
    };
    const expected = {
        "lesson22-impersonal-optative-and-admonitive": {
            results: [
                ["authorized", "#0-0(cuic-o)0+⎕-0#", "cuico"],
                ["authorized", "#0-0(cuic-o)h+⎕-0#", "cuicoh"],
            ],
            preserved: ["impersonal", "3sg", "impersonal", "3sg"],
            cue: [
                "impersonal-optative-admonitive-sentence-path",
                1,
                ["§22.5"],
                true,
            ],
        },
        "lesson22-tla-impersonal-derivation-and-lexicon": {
            inventory: [18, true, true],
            finite: [
                ["#0-0(tla-nēz)0+⎕-0#", "tlanēz"],
                ["#0-0(tla-huā-qui)z+⎕-0#", "tlahuāquiz"],
                ["#0-0(tla-tlatz-ī-n)0+⎕-0#", "tlatlatzīn"],
                ["#0-0(tla-zta-ya)0+0-0#", "tlaztaya"],
            ],
            reading: [
                ["nonspecific-entity-brightness", "general-brightness", "dawn"],
                "dawn",
                true,
                "#0-0(tla-nēz)0+⎕-0#",
                false,
                "blocked",
                "tla-impersonal-result-has-no-genuine-reading-choice",
            ],
            cue: [
                "tla-impersonal-derivation-and-lexicon",
                43,
                ["§22.6"],
                true,
                true,
            ],
            openSource: ["authorized", "#0-0(tla-xele)0+0-0#", false],
        },
    };
    const mutations = {
        "lesson22-impersonal-optative-and-admonitive": [
            activeOptativeCue?.role || "",
            optative.resultFrame.selectedMachineryFrame.voice !== "impersonal",
            admonitive.resultFrame.selectedMachineryFrame.subject !== "3sg",
        ],
        "lesson22-tla-impersonal-derivation-and-lexicon": [
            hostileTarget.authorizationStatus,
            hostileTarget.blockReason,
            missingSource.authorizationStatus,
            missingSource.blockReason,
            invalidNeciReading.authorizationStatus,
            invalidNeciReading.blockReason,
            neciDawn.formulaRealization !== neci.resultFrame.formulaRealization,
        ],
    };
    const expectedMutations = {
        "lesson22-impersonal-optative-and-admonitive": ["", false, false],
        "lesson22-tla-impersonal-derivation-and-lexicon": [
            "blocked",
            "lesson22-tla-impersonal-caller-supplied-target-not-authorized",
            "blocked",
            "lesson22-tla-impersonal-source-stem-required",
            "blocked",
            "impersonal-result-reading-not-licensed",
            false,
        ],
    };

    s.eq("accepted Lesson 22 Groups 7-8 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 98, unique: 98, writing: 44, reading: 54 });
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
