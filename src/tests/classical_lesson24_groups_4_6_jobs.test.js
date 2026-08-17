"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson24_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson24-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson24-final-a-and-ya-causatives",
        "lesson24-destockal-source-architecture",
        "lesson24-ni-hui-destockal-sources",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const source = (stem, verbClass = "B") => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: "intransitive",
        transitivity: "intransitive",
        objectKind: "none",
    });
    const analysis = (stem, verbClass = "B") => (
        ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source(stem, verbClass))
    );
    const inventory = (stem, verbClass = "B") => (
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            source(stem, verbClass),
            { derivationType: "causative" },
        )
    );
    const application = (stem, verbClass = "B", extra = {}) => (
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: stem,
            verbClass,
            sourceValence: "intransitive",
            sourceSubject: "3sg",
            subject: extra.subject || "3sg",
            requestedDerivation: extra.requestedDerivation || "direct",
            derivationOptionId: extra.derivationOptionId || "",
            causativeObjectKind: extra.causativeObjectKind || "",
            requestedVoice: "active",
            outputScope: "single",
        })
    );
    const selectTypeOneApplication = (stem, verbClass, route) => {
        const options = inventory(stem, verbClass);
        const option = options.options.find((candidate) => candidate.derivationRoute === route) || null;
        return {
            inventory: options,
            option,
            application: application(stem, verbClass, {
                subject: "1sg",
                requestedDerivation: "causative",
                derivationOptionId: option?.optionId || "missing-lesson24-option",
                causativeObjectKind: "specific-projective",
            }),
        };
    };

    const finalA = selectTypeOneApplication(
        "xela",
        "A",
        "type-one-final-a-morphological-replacement",
    );
    const rootPlusYa = selectTypeOneApplication(
        "xoco-ya",
        "A",
        "type-one-root-plus-ya-replacement",
    );
    const retainedYa = selectTypeOneApplication(
        "yōco-ya",
        "A",
        "type-one-root-plus-ya-retentive-exception-exact",
    );
    const finalACues = [finalA, rootPlusYa, retainedYa].flatMap((entry) => (
        ctx.getClassicalFormulaDerivedAnnotations(
            entry.application.resultFrame.formulaRealization,
            null,
            entry.application,
        )
    ));

    const cualProjection = ctx.buildClassicalNahuatlVncSourceConstitutionProjection({
        sourceStem: "(cual-ā-ni)",
        sourceValence: "intransitive",
        verbClass: "B",
        derivationType: "direct",
    }, ctx);
    const bareStockProjection = ctx.buildClassicalNahuatlVncSourceConstitutionProjection({
        sourceStem: "cual-ā",
        sourceValence: "intransitive",
        verbClass: "B",
        derivationType: "direct",
    }, ctx);
    const cualDirect = application("cual-ā-ni", "B");
    const cualCues = ctx.getClassicalFormulaDerivedAnnotations(
        cualDirect.resultFrame.formulaRealization,
        null,
        cualDirect,
    );

    const regularNi = analysis("chacu-ā-ni", "B");
    const regularHui = analysis("chay-ā-hui", "B");
    const openNi = analysis("xelo-ō-ni", "B");
    const exceptionalNi = analysis("chacu-ī-ni", "B");
    const getDestockal = (frame) => frame.analyses.find((candidate) => (
        candidate.stockVowelHarmonyFrame?.authorizationStatus === "authorized"
    ));
    const regularNiAnalysis = getDestockal(regularNi);
    const regularHuiAnalysis = getDestockal(regularHui);
    const openNiAnalysis = getDestockal(openNi);
    const exceptionalNiAnalysis = getDestockal(exceptionalNi);
    const openNiDirect = application("xelo-ō-ni", "B");
    const openNiCues = ctx.getClassicalFormulaDerivedAnnotations(
        openNiDirect.resultFrame.formulaRealization,
        null,
        openNiDirect,
    );

    const observations = {
        "lesson24-final-a-and-ya-causatives": {
            routes: [finalA, rootPlusYa, retainedYa].map(({ option, application: frame }) => [
                frame.authorizationStatus,
                option?.derivationRoute || "",
                option?.targetStem || "",
                option?.targetClass || "",
                option?.targetConstruction?.operation || "",
                option?.targetConstruction?.remove || "",
                option?.targetConstruction?.preserve || "",
                option?.targetConstruction?.add || "",
                option?.exactWitness === true,
            ]),
            participants: [finalA, rootPlusYa, retainedYa].map(({ application: frame }) => [
                frame.resultFrame.derivationOperationFrame.participantTransformFrame.targetObjectCount,
                frame.resultFrame.derivationOperationFrame.participantTransformFrame
                    .addedObjectRequest.governor,
            ]),
            cues: [
                finalACues.some((cue) => cue.role === "lesson24-final-a-and-ya-causatives" && cue.label.includes("same visible spelling")),
                finalACues.some((cue) => cue.role === "lesson24-final-a-and-ya-causatives" && cue.label.includes("ya removed")),
                finalACues.some((cue) => cue.role === "lesson24-final-a-and-ya-causatives" && cue.label.includes("retained-y exception")),
            ],
        },
        "lesson24-destockal-source-architecture": {
            projection: [
                cualProjection?.authorizationStatus || "",
                cualProjection?.sourceStem || "",
                cualProjection?.parts?.map((part) => [part.segment, part.role]) || [],
                cualProjection?.grammarAuthority,
                bareStockProjection,
            ],
            direct: [
                cualDirect.authorizationStatus,
                cualDirect.resultFrame.formulaRealization,
                cualDirect.resultFrame.surfaceRealization,
                cualDirect.resultFrame.finiteSurfaceFrame.formulaProjection.morphemes
                    .filter((morpheme) => morpheme.slotRole === "predicate")
                    .map((morpheme) => morpheme.carrier),
            ],
            cue: cualCues.find((cue) => (
                cue.role === "lesson24-destockal-source-architecture"
            ))?.role || "",
        },
        "lesson24-ni-hui-destockal-sources": {
            analyses: [regularNiAnalysis, regularHuiAnalysis, openNiAnalysis, exceptionalNiAnalysis]
                .map((entry) => [
                    entry?.segments || [],
                    entry?.root || "",
                    entry?.stockFormative || "",
                    entry?.stemFormative || "",
                    entry?.stockVowelHarmonyFrame?.relation || "",
                    entry?.stockVowelHarmonyFrame?.userChoiceRequired,
                ]),
            open: [
                openNi.authorizationStatus,
                openNiDirect.authorizationStatus,
                openNiDirect.normalizedRequest.sourceStem,
                openNiDirect.normalizedRequest.verbClass,
                openNiDirect.resultFrame.formulaRealization,
            ],
            cue: openNiCues.find((cue) => (
                cue.role === "lesson24-ni-hui-destockal-sources"
            ))?.label || "",
        },
    };
    const expected = {
        "lesson24-final-a-and-ya-causatives": {
            routes: [
                ["authorized", "type-one-final-a-morphological-replacement", "xela", "B", "morphological-replacement", "source-a", "", "causative-a", false],
                ["authorized", "type-one-root-plus-ya-replacement", "xoco-ā", "C", "replace-morpheme", "ya", "", "ā", false],
                ["authorized", "type-one-root-plus-ya-retentive-exception-exact", "yōco-y-a", "B", "morphological-replacement", "source-a", "y", "causative-a", true],
            ],
            participants: [[1, "causative"], [1, "causative"], [1, "causative"]],
            cues: [true, true, true],
        },
        "lesson24-destockal-source-architecture": {
            projection: [
                "authorized",
                "cual-ā-ni",
                [["cual", "root"], ["ā", "stock formative"], ["ni", "stem formative"]],
                false,
                null,
            ],
            direct: [
                "authorized",
                "#0-0(cual-ā-ni)0+0-0#",
                "cualāni",
                ["cual", "ā", "ni"],
            ],
            cue: "lesson24-destockal-source-architecture",
        },
        "lesson24-ni-hui-destockal-sources": {
            analyses: [
                [["chacu", "ā", "ni"], "chacu", "ā", "ni", "regular-root-vowel-harmony", false],
                [["chay", "ā", "hui"], "chay", "ā", "hui", "regular-root-vowel-harmony", false],
                [["xelo", "ō", "ni"], "xelo", "ō", "ni", "regular-root-vowel-harmony", false],
                [["chacu", "ī", "ni"], "chacu", "ī", "ni", "exceptional-stock-vowel-analysis", true],
            ],
            open: ["authorized", "authorized", "xelo-ō-ni", "B", "#0-0(xelo-ō-ni)0+0-0#"],
            cue: "xelo root · ō long stock formative · ni theme · regular harmony with root vowel o · typed Source Class B · no inventory gate",
        },
    };
    const mutations = {
        "lesson24-final-a-and-ya-causatives": [
            finalA.option?.targetStem !== "xela",
            rootPlusYa.option?.targetClass !== "C",
            retainedYa.option?.targetConstruction?.preserve !== "y",
            finalACues.some((cue) => cue.role === "lesson24-final-i-type-one-causatives"),
        ],
        "lesson24-destockal-source-architecture": [
            cualProjection?.parts?.length !== 3,
            bareStockProjection !== null,
            cualDirect.resultFrame.formulaRealization !== "#0-0(cual-ā-ni)0+0-0#",
            !cualCues.some((cue) => cue.label.includes("stock is not the completed")),
        ],
        "lesson24-ni-hui-destockal-sources": [
            regularNiAnalysis?.stockVowelHarmonyFrame?.regularHarmony !== true,
            exceptionalNiAnalysis?.stockVowelHarmonyFrame?.exceptionalAnalysis !== true,
            openNiDirect.authorizationStatus !== "authorized",
            !openNiCues.some((cue) => cue.label.includes("no inventory gate")),
        ],
    };

    s.eq("accepted Lesson 24 Groups 4-6 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 122, records: 122, both: 18, readingOnly: 104, unique: 122 });
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
