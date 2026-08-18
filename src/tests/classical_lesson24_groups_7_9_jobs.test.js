"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson24_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson24-review-ledger.json"),
        "utf8",
    ));
    const renderingSource = fs.readFileSync(
        path.join(ROOT, "src/ui/rendering/rendering.mjs"),
        "utf8",
    );
    const directApplicationContextDelivered = (
        renderingSource.includes("const annotationVncApplicationFrame = surfaceFrame.state")
        && renderingSource.includes("normalizedRequest: annotationVncApplicationFrame?.normalizedRequest")
        && renderingSource.includes("resultFrame: annotationVncApplicationFrame?.resultFrame")
        && renderingSource.includes("sourceAnalysisFrame: annotationVncApplicationFrame?.resultFrame")
    );
    const groupIds = [
        "lesson24-ni-hui-causative-procedure",
        "lesson24-coalesced-and-obsolete-destockal-sources",
        "lesson24-hua-destockal-sources-and-causatives",
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
    const select = (stem, verbClass, route) => {
        const options = inventory(stem, verbClass);
        const option = options.options.find((candidate) => candidate.derivationRoute === route) || null;
        const frame = application(stem, verbClass, {
            subject: "1sg",
            requestedDerivation: "causative",
            derivationOptionId: option?.optionId || "missing-lesson24-option",
            causativeObjectKind: "specific-projective",
        });
        const cues = ctx.getClassicalFormulaDerivedAnnotations(
            frame.resultFrame.formulaRealization,
            null,
            frame,
        );
        return { options, option, frame, cues };
    };

    const niReplacement = select("xelo-ō-ni", "B", "type-one-final-i-replacement");
    const niAddition = select("xelo-ō-ni", "B", "type-one-final-i-addition");
    const huiReplacement = select("xelo-ō-hui", "B", "type-one-final-i-replacement");
    const huiAddition = select("xelo-ō-hui", "B", "type-one-final-i-addition");

    const fusedSources = ["mī-ni", "xī-ni", "cē-hui"].map((stem) => {
        const frame = analysis(stem, "B");
        const fused = frame.analyses.find((candidate) => (
            candidate.category.includes("fused-destockal")
        ));
        const option = inventory(stem, "B").options[0] || null;
        const result = option ? application(stem, "B", {
            subject: "1sg",
            requestedDerivation: "causative",
            derivationOptionId: option.optionId,
            causativeObjectKind: "specific-projective",
        }) : null;
        const cues = result ? ctx.getClassicalFormulaDerivedAnnotations(
            result.resultFrame.formulaRealization,
            null,
            result,
        ) : [];
        return { stem, frame, fused, option, result, cues };
    });
    const coalescedDirect = ["(zo-ō-ni)", "(ce-ē-hua)"].map((stem) => {
        const result = application(stem, "B");
        const cues = ctx.getClassicalFormulaDerivedAnnotations(
            result.resultFrame.formulaRealization,
            null,
            result,
        );
        return { stem, result, cues };
    });

    const openHuaA = select("xep-ē-hua", "A", "type-one-destockal-hua-replacement");
    const openHuaB = select("xep-ē-hua", "B", "type-one-destockal-hua-replacement");
    const huaDirect = application("xep-ē-hua", "A");
    const huiDirect = application("xep-ē-hui", "A");
    const huaDirectCues = ctx.getClassicalFormulaDerivedAnnotations(
        huaDirect.resultFrame.formulaRealization,
        null,
        huaDirect,
    );

    const observations = {
        "lesson24-ni-hui-causative-procedure": {
            routes: [niReplacement, niAddition, huiReplacement, huiAddition].map(({ option, frame }) => [
                frame.authorizationStatus,
                option?.derivationRoute || "",
                option?.targetStem || "",
                option?.targetClass || "",
                option?.derivationalPreference || "",
                option?.targetConstruction?.operation || "",
                frame.resultFrame.derivationOperationFrame.participantTransformFrame.targetObjectCount,
            ]),
            choices: [niReplacement.options, huiReplacement.options].map((options) => {
                const typeOne = options.options.filter((option) => (
                    option.derivationSubtype === "type-one"
                ));
                return [
                    options.authorizationStatus,
                    typeOne.length,
                    options.selectionRequired,
                    typeOne.every((option) => String(option.sourceAnalysisId || "").includes("destockal")),
                ];
            }),
            cues: [niReplacement, niAddition, huiReplacement, huiAddition].map(({ cues }) => (
                cues.some((cue) => cue.role === "lesson24-ni-hui-causative-procedure")
                && !cues.some((cue) => cue.role === "lesson24-final-i-type-one-causatives")
            )),
        },
        "lesson24-coalesced-and-obsolete-destockal-sources": {
            directApplicationContextDelivered,
            fused: fusedSources.map(({ fused, option, result, cues }) => [
                fused?.segments || [],
                fused?.analysisAuthority || "",
                option?.sourceAnalysisId || "",
                option?.targetStem || "",
                result?.authorizationStatus || "",
                cues.some((cue) => cue.role === "lesson24-coalesced-and-obsolete-destockal-sources"),
            ]),
            open: coalescedDirect.map(({ result, cues }) => [
                result.authorizationStatus,
                result.resultFrame.formulaRealization,
                result.resultFrame.surfaceRealization,
                result.resultFrame.finiteSurfaceFrame.neighboringBoundaries.some((boundary) => (
                    boundary.appliedRuleIds.includes("cn-l24-identical-root-stock-vowel-coalescence")
                )),
                cues.some((cue) => cue.role === "lesson24-coalesced-and-obsolete-destockal-sources"),
            ]),
        },
        "lesson24-hua-destockal-sources-and-causatives": {
            directApplicationContextDelivered,
            open: [openHuaA, openHuaB].map(({ option, frame, cues }) => [
                frame.authorizationStatus,
                option?.derivationRoute || "",
                option?.targetStem || "",
                option?.targetClass || "",
                option?.targetConstruction?.remove || "",
                option?.targetConstruction?.add || "",
                option?.lexicalChoiceRequired,
                cues.some((cue) => cue.role === "lesson24-hua-destockal-sources-and-causatives"),
            ]),
            synonyms: [huaDirect, huiDirect].map((frame) => [
                frame.authorizationStatus,
                frame.resultFrame.formulaRealization,
                frame.resultFrame.surfaceRealization,
            ]),
            directCue: huaDirectCues.some((cue) => (
                cue.role === "lesson24-hua-destockal-sources-and-causatives"
            )),
        },
    };
    const expected = {
        "lesson24-ni-hui-causative-procedure": {
            routes: [
                ["authorized", "type-one-final-i-replacement", "xelo-ō-n-a", "B", "available-alternative", "replace-final", 1],
                ["authorized", "type-one-final-i-addition", "xelo-ō-ni-ā", "C", "preferred", "append", 1],
                ["authorized", "type-one-final-i-replacement", "xelo-ō-hu-a", "B", "preferred", "replace-final", 1],
                ["authorized", "type-one-final-i-addition", "xelo-ō-hui-ā", "C", "available-alternative", "append", 1],
            ],
            choices: [
                ["authorized", 2, true, true],
                ["authorized", 2, true, true],
            ],
            cues: [true, true, true, true],
        },
        "lesson24-coalesced-and-obsolete-destockal-sources": {
            directApplicationContextDelivered: true,
            fused: [
                [["mi", "ī", "ni"], "typed-lexical-source-analysis", "cn-l24-2459-mini-fused-destockal:fused-destockal-ni-exact", "mī-n-a", "authorized", true],
                [["xi", "ī", "ni"], "typed-lexical-source-analysis", "cn-l24-2459-xini-fused-destockal:fused-destockal-ni-exact", "xī-ni-ā", "authorized", true],
                [["ce", "ē", "hui"], "typed-lexical-source-analysis", "cn-l24-2459-cehui-fused-destockal:fused-destockal-hui-exact", "cē-hui-ā", "authorized", true],
            ],
            open: [
                ["authorized", "#0-0(zo-ō-ni)0+0-0#", "zōni", true, true],
                ["authorized", "#0-0(ce-ē-hua)0+0-0#", "cēhua", true, true],
            ],
        },
        "lesson24-hua-destockal-sources-and-causatives": {
            directApplicationContextDelivered: true,
            open: [
                ["authorized", "type-one-destockal-hua-replacement", "xep-ē-hu-a", "B", "hua", "hu-a", false, true],
                ["authorized", "type-one-destockal-hua-replacement", "xep-ē-hu-a", "B", "hua", "hu-a", false, true],
            ],
            synonyms: [
                ["authorized", "#0-0(xep-ē-hua)0+0-0#", "xepēhua"],
                ["authorized", "#0-0(xep-ē-hui)0+0-0#", "xepēhui"],
            ],
            directCue: true,
        },
    };
    const mutations = {
        "lesson24-ni-hui-causative-procedure": [
            niReplacement.option?.targetClass !== "B",
            niAddition.option?.targetClass !== "C",
            niReplacement.options.selectionRequired !== true,
            niReplacement.cues.some((cue) => cue.role === "lesson24-final-i-type-one-causatives"),
        ],
        "lesson24-coalesced-and-obsolete-destockal-sources": [
            !directApplicationContextDelivered,
            fusedSources.some(({ fused }) => !fused || fused.segments.length !== 3),
            coalescedDirect.some(({ result }) => !result.resultFrame.formulaRealization.includes("-")),
            coalescedDirect.some(({ result }) => result.resultFrame.surfaceRealization.includes("ōō")),
            coalescedDirect.some(({ cues }) => !cues.some((cue) => cue.role === "lesson24-coalesced-and-obsolete-destockal-sources")),
        ],
        "lesson24-hua-destockal-sources-and-causatives": [
            !directApplicationContextDelivered,
            openHuaA.option?.targetConstruction?.remove !== "hua",
            openHuaB.option?.targetClass !== "B",
            huaDirect.resultFrame.surfaceRealization === huiDirect.resultFrame.surfaceRealization,
            !huaDirectCues.some((cue) => cue.label.includes("no synonym or stem whitelist")),
        ],
    };

    s.eq("accepted Lesson 24 Groups 7-9 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 157, records: 157, both: 22, readingOnly: 135, unique: 157 });
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
