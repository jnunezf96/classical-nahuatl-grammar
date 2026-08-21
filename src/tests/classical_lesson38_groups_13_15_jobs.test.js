"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson38-human-nonhuman-patientive-contrast",
    "lesson38-patientive-active-action-translation-overlap",
    "lesson38-compound-source-patientive",
];

function buildNonactive(ctx, fields = {}, voice = "impersonal") {
    const request = {
        sourceStem: "pāna",
        verbClass: "B",
        sourceValence: "projective-human",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: voice,
        voice,
        ...fields,
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const option = (preview.controlFrame
        ?.nonactiveOptionInventory?.options || []).find(item => (
        item.suffixFamily === "lō"
    ));
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        nonactiveOptionId: option?.optionId || "",
    });
    return { request, preview, option, application };
}

function patientive(ctx, nonactive, overrides = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily:
            nonactive.request.voice === "passive"
                ? "passive-core"
                : "impersonal-core",
        canonicalVncResult: nonactive.application.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        humanness: "human",
        ...overrides,
    });
}

function buildAction(ctx, fields = {}) {
    const request = {
        sourceStem: "pāna",
        verbClass: "B",
        sourceValence: "projective-human",
        subject: "3sg",
        mood: "indicative",
        tense: "future",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...fields,
    };
    const application = ctx.evaluateClassicalNahuatlVncApplication(request);
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "liz",
        canonicalVncResult: application.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson38_groups_13_15_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson38-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const nahuaHumanSource = buildNonactive(ctx, {
        sourceStem: "nāhua-t-iā",
        verbClass: "C",
        sourceValence: "projective-human",
    });
    const nahuaNonhumanSource = buildNonactive(ctx, {
        sourceStem: "nāhua-t-iā",
        verbClass: "C",
        sourceValence: "projective-nonhuman",
    });
    const nahuaHuman = patientive(ctx, nahuaHumanSource);
    const nahuaNonhuman = patientive(ctx, nahuaNonhumanSource, {
        humanness: "nonhuman",
    });
    const humanContrast = nahuaHuman.operationFrame
        ?.patientiveHumanNonhumanContrastFrame;
    const nonhumanContrast = nahuaNonhuman.operationFrame
        ?.patientiveHumanNonhumanContrastFrame;
    s.eq("nāhuatiā contrast follows typed active valence automatically", {
        statuses: [nahuaHuman.authorizationStatus,
            nahuaNonhuman.authorizationStatus],
        targets: [nahuaHuman.operationFrame?.targetStems?.restrictedUse,
            nahuaNonhuman.operationFrame?.targetStems?.restrictedUse],
        readings: [humanContrast?.selectedReading,
            nonhumanContrast?.selectedReading],
        carriers: [humanContrast?.patientiveCarrier,
            nonhumanContrast?.patientiveCarrier],
        referents: [humanContrast?.patientiveReferent,
            nonhumanContrast?.patientiveReferent],
        choices: [humanContrast?.choiceRequired,
            nonhumanContrast?.choiceRequired],
    }, {
        statuses: ["authorized", "authorized"],
        targets: ["tla-nāhua-t-ī-l", "tē-nāhua-t-ī-l"],
        readings: ["regular-human-tla", "anomalous-nonhuman-te"],
        carriers: ["tla", "tē"],
        referents: ["human", "nonhuman-or-abstract"],
        choices: [false, false],
    });

    const icnSource = buildNonactive(ctx, {
        sourceStem: "icn-ēl-i-ā",
        verbClass: "C",
        sourceValence: "projective-human",
        sourceInitialISelection: "supportive",
    });
    const icnMissing = patientive(ctx, icnSource);
    const icnHuman = patientive(ctx, icnSource, {
        patientiveContrastRealization: "regular-human-tla",
    });
    const icnBenefit = patientive(ctx, icnSource, {
        patientiveContrastRealization: "anomalous-nonhuman-te",
        humanness: "nonhuman",
    });
    s.eq("same human-object Source exposes the one genuine reading choice", {
        missing: [icnMissing.authorizationStatus, icnMissing.blockReason],
        human: icnHuman.operationFrame?.targetStems?.restrictedUse,
        benefit: icnBenefit.operationFrame?.targetStems?.restrictedUse,
        options: ctx.getClassicalNahuatlPatientiveContrastInventory({
            sourceStem: "icn-ēl-i-ā",
            sourceValence: "projective-human",
        }).options,
        choice: icnBenefit.operationFrame
            ?.patientiveHumanNonhumanContrastFrame?.choiceRequired,
        lexicalVowel: icnBenefit.operationFrame?.appliedSemanticRules
            ?.includes("38.1.5-typed-lexical-vowel-realization"),
    }, {
        missing: ["blocked",
            "38.1.5-human-nonhuman-patientive-reading-choice-required"],
        human: "tla-icn-ēl-i-l",
        benefit: "tē-icn-ēl-ī-l",
        options: ["regular-human-tla", "anomalous-nonhuman-te"],
        choice: true,
        lexicalVowel: true,
    });

    const tlauh = patientive(ctx, buildNonactive(ctx, {
        sourceStem: "tlāuh-ti-ā",
        verbClass: "C",
        sourceValence: "projective-human",
    }), { patientiveContrastRealization: "anomalous-nonhuman-te" });
    const nonotza = patientive(ctx, buildNonactive(ctx, {
        sourceStem: "nō-nōtzā",
        verbClass: "B",
        sourceValence: "projective-human",
    }), { patientiveContrastRealization: "anomalous-nonhuman-te" });
    s.eq("other licensed same-Source contrasts retain exact vowel quantity", {
        tlauh: tlauh.operationFrame?.targetStems?.restrictedUse,
        nonotza: nonotza.operationFrame?.targetStems?.restrictedUse,
    }, { tlauh: "tē-tlāuh-tī-l", nonotza: "tē-nō-nōtza-l" });

    const machPassiveSource = buildNonactive(ctx, {
        sourceStem: "mach-tiā",
        verbClass: "C",
        sourceValence: "multiple-object",
        objectKind: "multiple-object",
        objectRequests: [
            {
                objectId: "theme",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                governor: "directive",
                derivationalLevel: 1,
            },
            {
                objectId: "student",
                objectKind: "nonspecific-human",
                governor: "applicative",
                derivationalLevel: 2,
            },
        ],
    }, "passive");
    const machLesson = patientive(ctx, machPassiveSource, {
        animacy: "nonanimate",
        humanness: "nonhuman",
    });
    const machContrast = machLesson.operationFrame
        ?.patientiveHumanNonhumanContrastFrame;
    s.eq("machtiā nonhuman theme comes from double-object passive topology", {
        status: machLesson.authorizationStatus,
        target: machLesson.operationFrame?.targetStems?.restrictedUse,
        topology: machContrast?.sourceObjectTopology,
        referent: machContrast?.patientiveReferent,
        double: machContrast?.doubleObjectPassiveNonhumanTheme,
        choice: machContrast?.choiceRequired,
    }, {
        status: "authorized", target: "tē-mach-tī-l",
        topology: "double-object-passive",
        referent: "nonhuman-or-abstract", double: true, choice: false,
    });

    const unlistedSource = buildNonactive(ctx, {
        sourceStem: "pāna",
        verbClass: "B",
        sourceValence: "projective-human",
    });
    const unlisted = patientive(ctx, unlistedSource);
    const forgedChoice = patientive(ctx, unlistedSource, {
        patientiveContrastRealization: "anomalous-nonhuman-te",
    });
    s.eq("lexical contrast facts never gate the productive route", {
        normal: [unlisted.authorizationStatus,
            unlisted.operationFrame?.targetStems?.restrictedUse],
        inventory: ctx.getClassicalNahuatlPatientiveContrastInventory({
            sourceStem: "pāna",
            sourceValence: "projective-human",
        }).authorizationStatus,
        forged: [forgedChoice.authorizationStatus,
            forgedChoice.blockReason],
    }, {
        normal: ["authorized", "tla-pāna-l"],
        inventory: "not-applicable",
        forged: ["blocked",
            "38.1.5-patientive-contrast-choice-requires-typed-lexical-source"],
    });

    const overlap = nahuaHuman.operationFrame
        ?.patientiveActiveActionContrastFrame;
    const action = buildAction(ctx, {
        sourceStem: "nāhua-t-iā",
        verbClass: "C",
        sourceValence: "projective-human",
    });
    s.eq("translation overlap never merges patientive and active action", {
        statuses: [nahuaHuman.authorizationStatus, action.authorizationStatus],
        kinds: [nahuaHuman.constructionKind, action.constructionKind],
        distinctResults: nahuaHuman.canonicalResult !== action.canonicalResult,
        distinct: overlap?.constructionsRemainDistinct,
        canonical: overlap?.canonicalResultsRemainDistinct,
        overlap: overlap?.englishTranslationMayOverlap,
        merges: overlap?.sharedEnglishTranslationMergesAnalyses,
        authority: overlap?.translationAuthorizesAnalysis,
    }, {
        statuses: ["authorized", "authorized"],
        kinds: ["patientive", "deverbal-action"],
        distinctResults: true, distinct: true, canonical: true,
        overlap: true, merges: false, authority: false,
    });

    const compoundVnc = buildNonactive(ctx, {
        sourceStem: "cuā-izta-ya",
        sourceEmbedStem: "cuā",
        sourceMatrixStem: "izta-ya",
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const missingRelation = patientive(ctx, compoundVnc);
    const adverbial = patientive(ctx, compoundVnc, {
        patientiveCompoundRelation: "adverbial-embed",
    });
    const objectReading = patientive(ctx, compoundVnc, {
        patientiveCompoundRelation: "incorporated-object",
    });
    const adverbialFrame = adverbial.operationFrame
        ?.compoundSourcePatientiveFrame;
    const objectFrame = objectReading.operationFrame
        ?.compoundSourcePatientiveFrame;
    s.eq("compound patientive keeps exact Source members and asks relation", {
        missing: [missingRelation.authorizationStatus,
            missingRelation.blockReason],
        statuses: [adverbial.authorizationStatus,
            objectReading.authorizationStatus],
        target: adverbial.operationFrame?.targetStems?.restrictedUse,
        members: [adverbialFrame?.embedStem, adverbialFrame?.matrixStem],
        order: adverbialFrame?.sourceConstituentOrder,
        exact: adverbialFrame?.canonicalVncResult
            === compoundVnc.application.resultFrame,
        sourceAnalysis: adverbialFrame?.canonicalVncSourceAnalysisFrame
            === compoundVnc.application.resultFrame?.sourceAnalysisFrame,
        relations: [adverbialFrame?.selectedRelation,
            objectFrame?.selectedRelation],
        english: [adverbialFrame?.englishReadingOrder,
            objectFrame?.englishReadingOrder],
        reversal: objectFrame?.englishReversalIsReadingOnly,
        whitelist: objectFrame?.examplesAuthorizeRoute,
    }, {
        missing: ["blocked",
            "38.2.1-compound-source-relation-choice-required"],
        statuses: ["authorized", "authorized"],
        target: "cuāizta-l", members: ["cuā", "izta-ya"],
        order: ["embed", "matrix"], exact: true, sourceAnalysis: true,
        relations: ["adverbial-embed", "incorporated-object"],
        english: ["embed-before-matrix", "matrix-before-embed"],
        reversal: true, whitelist: false,
    });

    const copiedCompound = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: { ...compoundVnc.application.resultFrame },
        patientiveCompoundRelation: "adverbial-embed",
    });
    const relationOnSimple = patientive(ctx, unlistedSource, {
        patientiveCompoundRelation: "adverbial-embed",
    });
    s.eq("compound continuation rejects copies and relation guesses", {
        copied: [copiedCompound.authorizationStatus,
            copiedCompound.blockReason],
        simple: [relationOnSimple.authorizationStatus,
            relationOnSimple.blockReason],
    }, {
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
        simple: ["blocked",
            "38.2.1-compound-relation-requires-typed-compound-vnc-source"],
    });

    const parityPlan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: compoundVnc.application.resultFrame,
        patientiveCompoundRelation: "adverbial-embed",
        subjects: ["3sg"],
        states: ["absolutive", "possessive"],
        animacy: "animate",
    });
    const parity = ctx.projectClassicalNahuatlParadigmCoordinates(parityPlan);
    s.eq("compound patientive keeps scalar and paradigm parity", {
        status: parityPlan.authorizationStatus,
        count: parity.length,
        scalar: parity.every(frame => frame.scalarEquivalent),
        exact: parity.every(frame => (
            frame.preparedFrame.sourceFrame
                === parityPlan.preparedSourceFrame
        )),
    }, { status: "authorized", count: 2, scalar: true, exact: true });

    const shellSource = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const renderingSource = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.eq("the UI exposes only the two genuine Lesson 38 choices", {
        contrastControl: shellSource.includes(
            'id="classical-deverbal-nnc-patientive-contrast"'),
        compoundControl: shellSource.includes(
            'id="classical-deverbal-nnc-patientive-compound-relation"'),
        derivedInventory: renderingSource.includes(
            "getClassicalNahuatlPatientiveContrastInventory"),
        typedCompound: renderingSource.includes("sourceEmbedStem")
            && renderingSource.includes("sourceMatrixStem"),
        requestFields: renderingSource.includes(
            "patientiveContrastRealization")
            && renderingSource.includes("patientiveCompoundRelation"),
    }, {
        contrastControl: true, compoundControl: true,
        derivedInventory: true, typedCompound: true, requestFields: true,
    });

    const cueFrames = [nahuaHuman, nahuaNonhuman, icnBenefit,
        machLesson, adverbial, objectReading];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame || null,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 112 atoms have jobs and all 61 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: [...new Set(cues.map(cue => cue.role))].sort(),
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 112, writing: 61, readingOnly: 51,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.eq(`cue:${record.atomId}`, covered.has(record.atomId), true);
    }
    return s;
}

module.exports = { run };
