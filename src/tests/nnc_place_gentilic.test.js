"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const { resolveLegacySupportPath } = require("./helpers/legacy_support_path");

const ROOT = path.resolve(__dirname, "..", "..");
const CANVAS = fs.readFileSync(path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"), "utf8").split(/\r?\n/u);
const LEDGER = fs.readFileSync(resolveLegacySupportPath("docs/LESSON_48_SOURCE_LEDGER.md"), "utf8");

function ledgerRows() {
    return LEDGER.split(/\r?\n/u)
        .filter(line => /^\| L48-/u.test(line))
        .map(line => {
            const fields = line.split("|").map(value => value.trim()).filter(Boolean);
            const [lineStart, lineEnd] = fields[1].split("-").map(Number);
            return {
                id: fields[0],
                lineStart,
                lineEnd,
                disposition: fields[3].replaceAll("`", ""),
                axisId: fields[4].replaceAll("`", ""),
            };
        });
}

function run(ctx) {
    const s = createSuite("nnc_place_gentilic");
    const rows = ledgerRows();

    s.eq("Lesson 48 Canvas ledger covers the exact source span with 44 classified claims", {
        count: rows.length,
        first: rows[0]?.lineStart,
        last: rows.at(-1)?.lineEnd,
        badSpans: rows.filter(row => row.lineStart < 19929
            || row.lineEnd > 20706
            || row.lineEnd < row.lineStart
            || !CANVAS.slice(row.lineStart - 1, row.lineEnd).join("\n").trim()).length,
        dispositions: Object.fromEntries(["new-canonical-rule", "existing-canonical-rule", "read-only-evidence"]
            .map(key => [key, rows.filter(row => row.disposition === key).length])),
    }, {
        count: 44,
        first: 19931,
        last: 20706,
        badSpans: 0,
        dispositions: {
            "new-canonical-rule": 36,
            "existing-canonical-rule": 6,
            "read-only-evidence": 2,
        },
    });

    s.eq("Lesson 48 GCD is the one five-stage typed invariant", {
        identity: ctx.PLACE_GENTILIC_NNC_GCD.identityId,
        stages: ctx.PLACE_GENTILIC_NNC_GCD.stageOrder,
        formulaAuthority: ctx.PLACE_GENTILIC_NNC_GCD.formulaStringAuthority,
        surfaceAuthority: ctx.PLACE_GENTILIC_NNC_GCD.surfaceStringAuthority,
    }, {
        identity: "typed-place-gentilic-source+licensed-formation+boundary-realization+nnc-agreement+finite-result",
        stages: ["source-analysis", "licensed-formation", "boundary-realization", "nnc-agreement", "finite-result"],
        formulaAuthority: false,
        surfaceAuthority: false,
    });

    s.eq("Lesson 48 LCM owns every classified semantic axis exactly once", {
        axisCount: ctx.PLACE_GENTILIC_NNC_LCM.axisCount,
        missing: rows.filter(row => !ctx.PLACE_GENTILIC_NNC_LCM.axes.some(axis => axis.axisId === row.axisId)).map(row => row.id),
        extra: ctx.PLACE_GENTILIC_NNC_LCM.axes.filter(axis => !rows.some(row => row.axisId === axis.axisId)).map(axis => axis.axisId),
        duplicates: ctx.PLACE_GENTILIC_NNC_LCM.axes.filter((axis, index, all) => all.findIndex(item => item.axisId === axis.axisId) !== index).map(axis => axis.axisId),
    }, {
        axisCount: 44,
        missing: [],
        extra: [],
        duplicates: [],
    });

    const placeCases = [
        ["n-imperfect-active", { embedStem: "chōca" }, "chōcayān"],
        ["n-imperfect-nonactive", { embedStem: "panōhua", sourceVoice: "nonactive" }, "panōhuayān"],
        ["n-yan", { embedStem: "xolochauh" }, "xolochauhyān"],
        ["n-man", { embedStem: "Ōl" }, "Ōlmān"],
        ["n-tlan-vicinity", { embedStem: "Tōl" }, "Tōllān"],
        ["n-can", { embedStem: "Xōchiā" }, "Xōchiācān"],
        ["n-preterit-agentive", { embedStem: "Cōlhuah" }, "Cōlhuahcān"],
        ["n-action-noun", { embedStem: "on-o" }, "onocān"],
        ["pan-integrated", { embedStem: "Izta" }, "Iztapan"],
        ["pan-connective-t", { embedStem: "Xāl" }, "Xāltipan"],
        ["co", { embedStem: "Tlach" }, "Tlachco"],
        ["c", { embedStem: "Te-cōā" }, "Tecōāc"],
        ["co-affective-embed", { embedStem: "Ā-tōy-a-tzin" }, "Ātōyatzinco"],
        ["co-compound-nahuac", { embedStem: "Ā" }, "Ānāhuac"],
        ["co-compound-ixco", { embedStem: "Xāl" }, "Xālixco"],
        ["co-compound-ticpac", { embedStem: "Tepē" }, "Tepēticpac"],
        ["tlah", { embedStem: "Huexō" }, "Huexōtlah"],
        ["tlah-pan", { embedStem: "Tlāl" }, "Tlālnepantlah"],
        ["tzalan", { embedStem: "Cōā" }, "Cōātzālan"],
        ["ti-tlan", { embedStem: "Te-nōch" }, "Tenōchtitlan"],
        ["chan-supplementation", { embedStem: "Cōātl" }, "Cōātlīchān"],
        ["gentilic-incorporated-place", { gentilicStem: "Mē-xi-h-ca", matrixStem: "pan" }, "Mēxihcapan"],
        ["gentilic-affective-co", { gentilicStem: "Mē-xi-h-ca", affectiveMatrix: "tzin" }, "Mēxihcatzinco"],
    ];
    placeCases.forEach(([formation, source, expected]) => {
        const frame = ctx.evaluatePlaceGentilicNnc({
            constructionKind: "place-name",
            formation,
            source,
            usage: "adverbial",
        });
        s.eq(`place formation ${formation} reaches its finite surface`, {
            authorized: frame.authorizationStatus,
            valid: ctx.isPlaceGentilicNncFrame(frame),
            surface: frame.wordSurface,
            noTense: frame.finiteFrame?.typedSlotFrame?.slots?.predicate?.tenseSlot,
        }, {
            authorized: "authorized",
            valid: true,
            surface: expected,
            noTense: "none",
        });
    });

    const gentilicCases = [
        ["nonlocative-absolutive", { gentilicStem: "Nāhua" }, "tl", "niNāhuatl"],
        ["preterit-agentive-owner", { gentilicStem: "Cōlhuah" }, "zero", "niCōlhuah"],
        ["preterit-agentive-other", { gentilicStem: "Tlailōtlac" }, "zero", "niTlailōtlac"],
        ["ca-full-place", { placeStem: "Huexō-tlah" }, "tl", "niHuexōtlahcatl"],
        ["ca-pan-eca", { placeStem: "Izta-pan" }, "tl", "nIztapanēcatl"],
        ["ca-can-meca", { placeStem: "Xāl-to-cā-n" }, "tl", "niXāltocāmēcatl"],
        ["ca-co-c-silent", { placeStem: "Mē-xi-h-co", placeMatrix: "co" }, "tl", "niMēxihcatl"],
        ["ca-ownerhood-n-silent", { placeStem: "Cōl-huah-cā-n" }, "tl", "niCōlhuahcatl"],
        ["ca-man-tlan-teca", { placeStem: "Āz-tlā-n" }, "tl", "nĀztēcatl"],
    ];
    gentilicCases.forEach(([formation, source, nounClass, expected]) => {
        const frame = ctx.evaluatePlaceGentilicNnc({
            constructionKind: "gentilic",
            formation,
            source,
            subject: "1sg",
            nounClass,
            animacy: "animate",
        });
        s.eq(`gentilic formation ${formation} reaches canonical agreement`, frame.wordSurface, expected);
    });

    const twoClause = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic",
        formation: "two-clause-concatenate",
        source: { placeStem: "Ātlacuīhuayān", headStem: "tlāca" },
        subject: "1sg",
        nounClass: "tl",
        animacy: "animate",
    });
    s.eq("two-clause gentilic preserves the place modifier outside the head NNC", {
        status: twoClause.authorizationStatus,
        surface: twoClause.wordSurface,
        structure: twoClause.finiteFrame?.clauseStructure,
    }, {
        status: "authorized",
        surface: "Ātlacuīhuayān nitlācatl",
        structure: "place-name-adjoined-to-absolutive-head-nnc",
    });

    const collective = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic-collective",
        source: { gentilicStem: "Mē-xi-h-ca" },
        subject: "3sg",
        state: "absolutive",
        nounClass: "tli",
    });
    s.eq("gentilic collectivity uses the typed yō matrix", {
        axis: collective.lcmAxisId,
        formula: collective.formulaRealization,
        surface: collective.wordSurface,
    }, {
        axis: "extension/gentilic-collectivity",
        formula: "#0-0(Mē-xi-h-ca-yō)tl-0#",
        surface: "Mēxihcayōtl",
    });

    const possessiveCollectiveZero = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic-collective",
        source: { gentilicStem: "Mē-xi-h-ca" },
        subject: "3sg",
        state: "possessive",
        possessor: "1sg",
        collectivityPossessiveVariant: "0",
        nounClass: "tli",
    });
    const possessiveCollectiveUh = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic-collective",
        source: { gentilicStem: "Mē-xi-h-ca" },
        subject: "3sg",
        state: "possessive",
        possessor: "1sg",
        collectivityPossessiveVariant: "uh",
        nounClass: "tli",
    });
    s.eq("possessive collectivity preserves both Canvas num1 variants despite hostile class state", {
        zero: [possessiveCollectiveZero.lcmAxisId, possessiveCollectiveZero.formulaRealization, possessiveCollectiveZero.wordSurface],
        uh: [possessiveCollectiveUh.lcmAxisId, possessiveCollectiveUh.formulaRealization, possessiveCollectiveUh.wordSurface],
    }, {
        zero: ["extension/collectivity-possessive", "#0-0+n-o(Mē-xi-h-ca-yō)0-0#", "noMēxihcayō"],
        uh: ["extension/collectivity-possessive", "#0-0+n-o(Mē-xi-h-ca-yō)uh-0#", "noMēxihcayōuh"],
    });

    const profession = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "profession-place-association",
        extensionKind: "profession",
        lexicalId: "toltec-craftsman",
        subject: "1pl",
        state: "absolutive",
        pluralConnector: "0-h",
    });
    const forgedProfession = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "profession-place-association",
        extensionKind: "profession",
        lexicalId: "invented-profession",
        subject: "3sg",
    });
    s.eq("profession extension is a closed Canvas lexicon", {
        authorized: profession.wordSurface,
        forgedStatus: forgedProfession.authorizationStatus,
        forgedReason: forgedProfession.blockReason,
    }, {
        authorized: "titōltēcah",
        forgedStatus: "blocked",
        forgedReason: "canvas-licensed-profession-or-title-record-required",
    });

    const closedLexicalCases = [
        ["profession", "toltec-craftsman", "tōltēcatl"],
        ["profession", "amantec-feather-worker", "āmantēcatl"],
        ["profession", "pochtec-merchant", "pōchtēcatl"],
        ["profession", "oztomec-vanguard-merchant", "ōztōmēcatl"],
        ["title", "tlacochcalcatl", "tlacōchcalcatl"],
        ["title", "tlacateccatl", "tlācatēccatl"],
        ["title", "tocuiltecatl", "tocuiltēcatl"],
        ["title", "atempanecatl", "ātēmpanēcatl"],
        ["title", "tezcacoacatl", "tezcacōācatl"],
    ];
    closedLexicalCases.forEach(([extensionKind, lexicalId, expected]) => {
        const frame = ctx.evaluatePlaceGentilicNnc({
            constructionKind: "profession-place-association",
            extensionKind,
            lexicalId,
            subject: "3sg",
            state: "absolutive",
            nounClass: "tli",
        });
        s.eq(`closed Canvas ${extensionKind} ${lexicalId} reaches its finite NNC`, frame.wordSurface, expected);
    });

    const evidenceOnlyTitle = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "profession-place-association",
        extensionKind: "title",
        lexicalId: "tlillan-calqui",
        subject: "3sg",
    });
    s.eq("Tlīllān-calqui remains visible evidence but cannot invent an unattested typed formula", {
        status: evidenceOnlyTitle.authorizationStatus,
        reason: evidenceOnlyTitle.blockReason,
        evidence: evidenceOnlyTitle.formationFrame?.evidenceSurface,
        formula: evidenceOnlyTitle.formulaRealization,
    }, {
        status: "blocked",
        reason: "canvas-title-has-no-typed-nnc-formula",
        evidence: "Tlīllān-calqui",
        formula: "",
    });

    const professionPertinency = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "profession-pertinency",
        lexicalId: "amantec-feather-worker",
        subject: "3sg",
        state: "absolutive",
        nounClass: "tli",
    });
    s.eq("profession pertinency reuses the closed profession stem in yō", {
        axis: professionPertinency.lcmAxisId,
        formula: professionPertinency.formulaRealization,
        surface: professionPertinency.wordSurface,
    }, {
        axis: "extension/profession",
        formula: "#0-0(ā-man-tē-ca-yō)tl-0#",
        surface: "āmantēcayōtl",
    });

    const adjectivalGentilic = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic-adjectival-use",
        source: { gentilicStem: "Cuex-tē-ca" },
        subject: "3sg",
        nounClass: "tl",
    });
    const adjectivalCollective = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic-adjectival-use",
        source: { gentilicStem: "Chichi-mē-ca-yō" },
        subject: "3sg",
        nounClass: "tl",
    });
    const unsupportedGenericIncorporation = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic-incorporation",
        source: { gentilicStem: "Tōl-tē-ca", matrixStem: "forged" },
        subject: "3sg",
        nounClass: "tl",
    });
    s.eq("adjectival reuse preserves complete gentilic NNCs and generic caller matrices stay blocked", {
        gentilic: [adjectivalGentilic.lcmAxisId, adjectivalGentilic.wordSurface],
        collective: [adjectivalCollective.lcmAxisId, adjectivalCollective.wordSurface],
        genericIncorporation: [
            unsupportedGenericIncorporation.authorizationStatus,
            unsupportedGenericIncorporation.blockReason,
        ],
    }, {
        gentilic: ["extension/adjectival-use", "Cuextēcatl"],
        collective: ["extension/adjectival-use", "Chichimēcayōtl"],
        genericIncorporation: ["blocked", "place-gentilic-construction-kind-required"],
    });

    const ambiguous = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "place-name",
        formation: "co-place-affective",
        source: { embedStem: "Ā-tōy-a-co", affectiveMatrix: "tzin" },
    });
    const selectedAmbiguous = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "place-name",
        formation: "co-place-affective",
        source: {
            embedStem: "Ā-tōy-a-co",
            affectiveMatrix: "tzin",
            analysisKind: "place-name-affective",
        },
    });
    s.eq("surface-identical affective place analysis has no arbitrary default", {
        blocked: ambiguous.blockReason,
        selected: selectedAmbiguous.wordSurface,
        selectedRule: selectedAmbiguous.formationFrame?.boundaryRule,
    }, {
        blocked: "place-affective-structural-analysis-required",
        selected: "Ātōyatzinco",
        selectedRule: "replace-inner-co-with-silence-before-affective-co",
    });

    const contradictoryActive = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "place-name",
        formation: "n-imperfect-active",
        source: { embedStem: "chōca", sourceVoice: "nonactive" },
    });
    const wrongFullPlace = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic",
        formation: "ca-full-place",
        source: { placeStem: "Mē-xi-h-co" },
        subject: "3sg",
        nounClass: "tl",
    });
    s.eq("typed source contradictions cannot borrow a nearby productive route", {
        active: contradictoryActive.blockReason,
        fullPlace: wrongFullPlace.blockReason,
    }, {
        active: "n-imperfect-active-requires-typed-active-source",
        fullPlace: "full-place-gentilic-requires-tlah-or-tzalan-source",
    });

    const canonicalClass = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic",
        formation: "ca-full-place",
        source: { placeStem: "Huexō-tlah" },
        subject: "1sg",
        nounClass: "tl",
        animacy: "animate",
    });
    const hostileHiddenClass = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic",
        formation: "ca-full-place",
        source: { placeStem: "Huexō-tlah" },
        subject: "1sg",
        nounClass: "tli",
        animacy: "animate",
    });
    s.eq("gentilic noun class is formation-derived and hidden caller state cannot alter output", {
        canonical: [canonicalClass.formulaRealization, canonicalClass.wordSurface],
        hostile: [hostileHiddenClass.formulaRealization, hostileHiddenClass.wordSurface],
        identical: canonicalClass.formulaRealization === hostileHiddenClass.formulaRealization
            && canonicalClass.wordSurface === hostileHiddenClass.wordSurface,
    }, {
        canonical: ["#ni-0(Huexō-tlah-ca)tl-0#", "niHuexōtlahcatl"],
        hostile: ["#ni-0(Huexō-tlah-ca)tl-0#", "niHuexōtlahcatl"],
        identical: true,
    });

    const hostile = ctx.evaluatePlaceGentilicNnc({
        constructionKind: "gentilic",
        formation: "ca-co-c-silent",
        source: { placeStem: "Mē-xi-h-co", placeMatrix: "co" },
        subject: "1sg",
        formula: "#ni-0(forged)tl-0#",
        resultSurface: "forged",
        lessonMetadata: { lesson: 48 },
    });
    s.eq("formula, surface, result, and lesson metadata cannot authorize output", {
        status: hostile.authorizationStatus,
        reason: hostile.blockReason,
        formula: hostile.formulaRealization,
        surface: hostile.wordSurface,
        authority: hostile.callerSuppliedAuthorityAccepted,
    }, {
        status: "blocked",
        reason: "caller-supplied-formula-surface-result-or-lesson-authority-blocked",
        formula: "",
        surface: "",
        authority: false,
    });

    const retiredSourceFrame = ctx.buildPlaceGentilicNncSourceFrame({
        placeGentilicKind: "place-name",
        placeNameSource: "forged",
        targetFormulaSlots: { stem: "forged" },
        targetSegmentFrames: [{ slot: "stem", surface: "forged" }],
    });
    const retiredOperationFrame = ctx.buildPlaceGentilicNncOperationFrame(retiredSourceFrame);
    const retiredClassification = ctx.classifyPlaceGentilicNncCandidate({
        placeGentilicKind: "place-name",
        sourceFrame: retiredSourceFrame,
        operationFrame: retiredOperationFrame,
    });
    s.eq("the former caller-built target-segment lane is retired and fail-closed", {
        ignoredFormula: retiredSourceFrame?.suppliedTargetFormulaSlotsIgnored,
        ignoredSegments: retiredSourceFrame?.suppliedTargetSegmentFramesIgnored,
        operationStatus: retiredOperationFrame?.authorizationStatus,
        generated: retiredClassification.generationAllowed,
        surface: retiredClassification.surface,
        diagnostic: retiredClassification.diagnostics[0],
    }, {
        ignoredFormula: true,
        ignoredSegments: true,
        operationStatus: "blocked",
        generated: false,
        surface: "",
        diagnostic: "place-gentilic-nnc-canonical-place-gentilic-evaluator-required",
    });

    const plan = ctx.buildPlaceGentilicNncParadigmPlan({
        constructionKind: "gentilic",
        formation: "ca-pan-eca",
        source: { placeStem: "Izta-pan" },
        subject: "1sg",
        state: "absolutive",
        nounClass: "tl",
        pluralConnector: "0-h",
    });
    const projected = ctx.projectPlaceGentilicNncParadigmCoordinates(plan);
    s.eq("prepared paradigm coordinates are pointwise scalar-equal", {
        status: plan.authorizationStatus,
        count: projected.length,
        parity: projected.every(row => {
            const scalar = ctx.evaluatePlaceGentilicNnc({
                ...plan.sourceRequest,
                state: row.state,
                subject: row.subject,
            });
            return row.formulaRealization === scalar.formulaRealization
                && row.wordSurface === scalar.wordSurface;
        }),
    }, {
        status: "authorized",
        count: 6,
        parity: true,
    });

    return s;
}

module.exports = { run };
