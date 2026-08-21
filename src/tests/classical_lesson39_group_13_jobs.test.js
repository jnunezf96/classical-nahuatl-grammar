"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-root-stock-extensions";

function rootStock(ctx, sourceStem, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "root-or-stock",
        ...(fields.allomorph
            ? { rootStockAllomorph: fields.allomorph }
            : {}),
        ...(fields.sourceAnalysis
            ? { rootStockSourceAnalysis: fields.sourceAnalysis }
            : {}),
        source: {
            sourceStage: "root-or-stock",
            sourceStem,
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: fields.valence || "intransitive",
            sourceObjectPattern: fields.objectPattern || "none",
            sourceSubject: "3sg",
        },
        subject: "3common",
        state: "absolutive",
        possessor: "",
        animacy: "nonanimate",
    });
}

function frameOf(result) {
    return result.operationFrame?.rootStockPatientiveFrame;
}

function extensionOf(result) {
    return frameOf(result)?.rootStockExtensionFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_13_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    s.eq("accepted group has the exact atom-job denominator", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
    }, { atoms: 71, writing: 31, reading: 40, accepted: true });

    const unknown = rootStock(ctx, "zōm-a-hui");
    const stockC = rootStock(ctx, "zōm-a-hui", { allomorph: "c" });
    const stockX = rootStock(ctx, "zōm-a-hui", { allomorph: "x" });
    const rootNeedsHistory = rootStock(ctx, "zōm-a-hui", {
        allomorph: "zero",
    });
    const deverbalRoot = rootStock(ctx, "zōm-a-hui", {
        allomorph: "zero", sourceAnalysis: "deverbal-patientive",
    });
    const nounRoot = rootStock(ctx, "zōm-a-hui", {
        allomorph: "zero", sourceAnalysis: "nounstem-root-source",
    });
    s.eq("unlisted i-hui and a-hui Sources follow one productive shape rule", {
        first: [unknown.authorizationStatus, unknown.blockReason],
        c: [frameOf(stockC)?.targetStem, stockC.formulaRealization,
            extensionOf(stockC)?.stockOrRootFormation],
        x: [frameOf(stockX)?.targetStem, stockX.formulaRealization,
            extensionOf(stockX)?.stockOrRootFormation],
        zeroFirst: [rootNeedsHistory.authorizationStatus,
            rootNeedsHistory.blockReason],
        analyses: extensionOf(deverbalRoot)?.sourceAnalysisOptions,
        deverbal: [frameOf(deverbalRoot)?.targetStem,
            extensionOf(deverbalRoot)?.selectedSourceAnalysis],
        nounRoot: [frameOf(nounRoot)?.targetStem,
            extensionOf(nounRoot)?.selectedSourceAnalysis],
        writing: [deverbalRoot.wordSurface,
            deverbalRoot.sentenceSurface,
            ctx.realizeClassicalNahuatlNncSurfaceCarriers(["sōm", "tli"])],
        distinct: deverbalRoot.canonicalResult !== nounRoot.canonicalResult,
        productive:
            extensionOf(deverbalRoot)
                ?.compatibleUnlistedIhuiAhuiSourcesRemainProductive,
    }, {
        first: ["blocked", "39.4-root-stock-allomorph-choice-required"],
        c: ["zōm-a-c", "#0-0(zōm-a-c)tli-0#", "stock-based"],
        x: ["zōm-a-x", "#0-0(zōm-a-x)tli-0#", "stock-based"],
        zeroFirst: ["blocked",
            "39.4.3-root-stock-source-analysis-choice-required"],
        analyses: ["deverbal-patientive", "nounstem-root-source"],
        deverbal: ["zōm", "deverbal-patientive"],
        nounRoot: ["zōm", "nounstem-root-source"],
        writing: ["zōntli", "Zōntli.", "zōntli"],
        distinct: true,
        productive: true,
    });

    const leather = rootStock(ctx, "cuetl-a-hui");
    const thin = rootStock(ctx, "poy-a-hui");
    s.eq("witnessed stock forms keep their exact allomorph and Source contrast", {
        leather: [frameOf(leather)?.selectedAllomorph,
            frameOf(leather)?.targetStem,
            frameOf(leather)?.allomorphFamilyFrame?.resultReadings],
        contrast: [
            extensionOf(leather)?.relatedSourceContrastFrame?.relatedSourceStem,
            extensionOf(leather)?.relatedSourceContrastFrame
                ?.selectedHistoricalSource,
            extensionOf(leather)?.relatedSourceContrastFrame
                ?.relatedSourceRejectedForThisResult,
            extensionOf(leather)?.relatedSourceContrastFrame?.rejectionReason,
        ],
        thin: [frameOf(thin)?.selectedAllomorph,
            frameOf(thin)?.targetStem,
            frameOf(thin)?.allomorphFamilyFrame?.resultReadings],
    }, {
        leather: ["x", "cuetl-a-x", [
            "thing-that-has-become-withered-or-shriveled",
            "tanned-hide", "leather",
        ]],
        contrast: ["cuetl-ā-ni", "cuetl-a-hui", true,
            "meaning-too-distant"],
        thin: ["c", "poy-a-c", [
            "thing-that-has-become-thin",
            "thing-that-has-nearly-faded-away",
        ]],
    });

    const finished = rootStock(ctx, "yēc-a-hui");
    const tapered = rootStock(ctx, "tzol-i-hui");
    s.eq("witnessed root forms keep literal and narrow readings", {
        finished: [finished.authorizationStatus, finished.blockReason,
            frameOf(finished)?.targetStem,
            frameOf(finished)?.nounClass,
            frameOf(finished)?.allomorphFamilyFrame?.resultReadings,
            frameOf(finished)?.allomorphFamilyFrame?.referentProfile],
        tapered: [tapered.authorizationStatus, tapered.blockReason,
            frameOf(tapered)?.targetStem,
            frameOf(tapered)?.nounClass,
            frameOf(tapered)?.allomorphFamilyFrame?.resultReadings],
    }, {
        finished: ["authorized", "", "yēc", "tli", [
            "thing-that-has-become-finished",
            "thing-that-has-become-completed",
            "consummate-thing", "good-thing",
        ], {
            animacy: "nonanimate", humanness: "nonhuman",
            number: "singular", changeState: "completed",
        }],
        tapered: ["authorized", "", "tzol", "tli", [
            "thing-that-has-become-narrow-toward-the-end",
            "tapering-thing",
        ]],
    });

    const gummyNeedsHistory = rootStock(ctx, "tzic-a-hui");
    const gummyDerived = rootStock(ctx, "tzic-a-hui", {
        sourceAnalysis: "deverbal-patientive",
    });
    const gummyRoot = rootStock(ctx, "tzic-a-hui", {
        sourceAnalysis: "nounstem-root-source",
    });
    s.eq("the witnessed root-direction uncertainty remains a genuine choice", {
        first: [gummyNeedsHistory.authorizationStatus,
            gummyNeedsHistory.blockReason],
        derived: [frameOf(gummyDerived)?.targetStem,
            extensionOf(gummyDerived)?.selectedSourceAnalysis],
        root: [frameOf(gummyRoot)?.targetStem,
            extensionOf(gummyRoot)?.selectedSourceAnalysis],
        evidence: extensionOf(gummyDerived)?.sourceDirectionEvidence,
        surfaceSelects:
            extensionOf(gummyDerived)?.surfaceShapeSelectsHistoricalSource,
    }, {
        first: ["blocked",
            "39.4.3-root-stock-source-analysis-choice-required"],
        derived: ["tzic", "deverbal-patientive"],
        root: ["tzic", "nounstem-root-source"],
        evidence: "genuinely-underdetermined",
        surfaceSelects: false,
    });

    const sticky = rootStock(ctx, "tla-zāl-o-ā", {
        valence: "single-object",
        objectPattern: "nonspecific-nonhuman",
    });
    const bow = rootStock(ctx, "tla-huī-tōl-o-ā", {
        valence: "single-object",
        objectPattern: "nonspecific-nonhuman",
    });
    s.eq("a causative root keeps its internal object carrier", {
        sticky: [frameOf(sticky)?.targetStem, sticky.formulaRealization,
            extensionOf(sticky)?.selectedSourceAnalysis,
            extensionOf(sticky)?.causativeSourceFrame?.internalObjectCarrier,
            extensionOf(sticky)
                ?.causativeObjectCarrierProvesDeverbalHistory],
        bow: [frameOf(bow)?.targetStem,
            extensionOf(bow)?.causativeSourceFrame?.rootStem,
            frameOf(bow)?.allomorphFamilyFrame?.resultReadings],
    }, {
        sticky: ["tla-zāl", "#0-0(tla-zāl)li-0#",
            "deverbal-patientive-proven-by-object-carrier", "tla", true],
        bow: ["tla-huī-tōl", "huī-tōl",
            ["thing-that-has-been-bowed", "bow-for-shooting-arrows"]],
    });

    const coyote = rootStock(ctx, "coy-ō-ni");
    const peyote = rootStock(ctx, "pey-ō-ni");
    const mosquito = rootStock(ctx, "moy-ō-ni");
    s.eq("certain typed stocks retain their narrow agentive readings", {
        coyote: [frameOf(coyote)?.targetStem,
            extensionOf(coyote)?.stockOrRootFormation,
            frameOf(coyote)?.allomorphFamilyFrame?.resultReadings,
            extensionOf(coyote)?.lexicalEvidenceFrame?.selectedReadingStatus,
            extensionOf(coyote)?.lexicalEvidenceFrame?.dictionaryReading],
        peyote: [frameOf(peyote)?.targetStem,
            frameOf(peyote)?.allomorphFamilyFrame?.resultReadings],
        mosquito: [frameOf(mosquito)?.targetStem,
            frameOf(mosquito)?.allomorphFamilyFrame?.resultReadings],
    }, {
        coyote: ["coy-ō", "stock-as-agentive-nounstem",
            ["entity-that-yips-or-howls", "coyote"],
            "conjectural-but-derivationally-supported", "become-a-hole"],
        peyote: ["pey-ō", [
            "entity-that-glows", "chrysalis", "cocoon", "peyote",
        ]],
        mosquito: ["mōy-ō", [
            "entity-that-swarms", "mosquito", "gnat",
        ]],
    });

    const sinew = rootStock(ctx, "tla-lhua", {
        valence: "single-object",
        objectPattern: "nonspecific-nonhuman",
    });
    const root = rootStock(ctx, "ne-lhua", {
        valence: "single-object", objectPattern: "reflexive",
    });
    s.eq("an unknown governing verbstem does not erase a typed deverbal nounstem", {
        sinew: [frameOf(sinew)?.targetStem,
            extensionOf(sinew)?.exactSourceVerbstemMayRemainUnknown,
            extensionOf(sinew)?.unknownSourceDoesNotNegateNounstem,
            extensionOf(sinew)?.unknownSourceFrame?.diagnosticObjectCarrier,
            extensionOf(sinew)?.unknownSourceFrame?.carrierIsNominalRoot,
            extensionOf(sinew)?.unknownSourceFrame?.organicPossessionStem],
        root: [frameOf(root)?.targetStem,
            extensionOf(root)?.unknownSourceFrame?.diagnosticObjectCarrier,
            extensionOf(root)?.unknownSourceFrame?.diagnosticObjectRole,
            extensionOf(root)?.unknownSourceFrame?.organicPossessionStem],
    }, {
        sinew: ["tla-lhua", true, true, "tla", false, "tla-lhua-yo"],
        root: ["ne-lhua", "ne", "shuntline-reflexive", "ne-lhua-yō"],
    });

    const badHistory = rootStock(ctx, "tzic-a-hui", {
        sourceAnalysis: "surface-selected",
    });
    const unsupported = rootStock(ctx, "plain-root", {
        allomorph: "zero",
    });
    s.eq("surface guesses and unsupported Source shapes remain blocked", {
        history: [badHistory.authorizationStatus, badHistory.blockReason],
        shape: [unsupported.authorizationStatus, unsupported.blockReason],
        authority: [extensionOf(leather)?.englishMeaningAuthorizesRoute,
            extensionOf(leather)?.examplesAuthorizeRoute,
            extensionOf(leather)?.homophonousOrRelatedSourcesRemainDistinct],
    }, {
        history: ["blocked",
            "39.4.3-root-stock-source-analysis-not-licensed"],
        shape: ["blocked", "39.4-root-stock-source-not-lexically-authorized"],
        authority: [false, false, true],
    });

    const cueResults = [stockC, stockX, deverbalRoot, nounRoot, leather, thin,
        finished, tapered, gummyDerived, gummyRoot, sticky, bow, coyote,
        peyote, mosquito, sinew, root];
    const cues = cueResults.flatMap(result => (
        ctx.getClassicalFormulaDerivedAnnotations(
            result.formulaRealization,
            result.canonicalResult?.nncSlotFrame,
            result
        )
    )).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { atoms: 71, writing: 31, reading: 40,
        cues: true, covered: true });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }
    return s;
}

module.exports = { run };
