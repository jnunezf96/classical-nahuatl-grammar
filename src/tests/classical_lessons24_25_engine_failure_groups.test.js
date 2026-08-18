"use strict";

const { createSuite } = require("./runner");

function sourceStemKey(value = "") {
    return String(value).normalize("NFD").replace(/[\u0300-\u036f\s-]/gu, "").toLowerCase();
}

function buildSource(ctx, stem, verbClass, sourceValence) {
    const objectKind = {
        "specific-projective": "specific-projective",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
    }[sourceValence] || "none";
    const valenceDisplay = sourceValence === "intransitive" ? "intransitive" : "transitive";
    const canonicalSource = ctx.getClassicalNahuatlCanonicalSourceStemInventory("vnc").find(record => (
        sourceStemKey(record?.stem) === sourceStemKey(stem)
        && record?.valenceDisplay === valenceDisplay
    )) || null;
    const initialVowelKind = ["real", "supportive"].includes(canonicalSource?.initialIAnalysis?.kind)
        ? canonicalSource.initialIAnalysis.kind
        : "";
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson: objectKind === "specific-projective" ? "3sg" : "",
        ...(initialVowelKind ? { initialVowelKind } : {}),
    });
}

function buildMultipleObjectSource(ctx, stem, verbClass) {
    const lower = buildSource(ctx, stem, verbClass, "projective-human");
    return ctx.buildClassicalNahuatlMultipleObjectVncFrame(lower, {
        objectRequests: [{
            objectId: "source-object-1",
            objectKind: "nonspecific-human",
            objectPerson: "",
            governor: "directive",
            derivationalLevel: 1,
        }, {
            objectId: "source-object-2",
            objectKind: "nonspecific-nonhuman",
            objectPerson: "",
            governor: "causative",
            derivationalLevel: 2,
        }],
    });
}

const STEM_RELATION_CASES = Object.freeze([
    ["l24-042", "mī-ni", "B", "intransitive", "mī-n-a", "*(mi-ī-ni) > (mī-ni) > tla-(mī-n-a)"],
    ["l24-043", "xī-ni", "B", "intransitive", "xī-ni-ā", "*(xi-ī-ni) > (xī-ni) > tla-(xī-ni-ā)"],
    ["l24-044", "cē-hui", "B", "intransitive", "cē-hui-ā", "*(ce-ē-hui) > (cē-hui) > tla-(cē-hui-ā)"],
    ["l25-098", "itqui", "A", "projective-nonhuman", "itqui-tiā", "tla-(itqui) > (itqui-hua) > tē+tla-(itqui-tiā)"],
    ["l25-099", "caqui", "B", "projective-nonhuman", "caquī-tiā", "tla-(caqui) > *(caquī-hua) > tē+tla-(caquī-tiā)"],
    ["l25-105", "itt-a", "A", "projective-nonhuman", "itt-ī-tiā", "tla-(itt-a) > *(itt-ī-hua) > tē+tla-(itt-ī-tiā)"],
    ["l25-106", "mati", "B", "projective-nonhuman", "machī-tiā", "tla-(mati) > *(machī-hua) > tē+tla-(machī-tiā)"],
    ["l25-117", "hue-tz-ca", "A", "projective-nonhuman", "hue-tz-quī-tiā", "tla-(hue-tz-ca) > tē+tla-(hue-tz-quī-tiā)"],
    ["l25-120", "quīza", "B", "intransitive", "quix-tiā", "(quīza) > (quīx-o-hua) > tē-(quix-tiā)"],
    ["l25-122", "cual-ā-ni", "B", "intransitive", "cual-ā-n-tiā", "(cual-ā-ni) > (cual-ā-n-ō) > tē-(cual-ā-n-tiā)"],
    ["l25-125", "mati", "B", "projective-nonhuman", "mach-tiā", "tla-(mati) > *(mach-ō) > tē+tla-(mach-tiā)"],
    ["l25-134", "quēmi", "B", "projective-nonhuman", "quēn-tiā", "tla-(quēmi) > *(quēm-o-hua) > tē+tla-(quēn-tiā)"],
    ["l25-135", "itt-a", "A", "projective-nonhuman", "itt-a-l-tiā", "tla-(itt-a) > (itt-a-lō) > tē+tla-(itt-a-l-tiā)"],
    ["l25-138", "chol-o-ā", "C", "intransitive", "chol-o-l-tiā", "(chol-o-ā) > (chol-o-lō) > tē-(chol-o-l-tiā)"],
    ["l25-143", "maca", "A", "multiple-object", "maqui-l-tiā", "tē+tla-(maca) > *(maqui-lō) > tē+tē+tla-(maqui-l-tiā)"],
    ["l25-144", "caqui", "B", "projective-nonhuman", "caqui-l-tiā", "tla-(caqui) > *(caqui-lō) > tē+tla-(caqui-l-tiā)"],
    ["l25-147", "tzacu-a", "B", "projective-nonhuman", "tzacu-i-l-tiā", "tla-(tzacu-a) > *(tzacu-i-lō) > tē+tla-(tzacu-i-l-tiā)"],
    ["l25-148", "imacaci", "B", "projective-human", "īmacaxi-l-tiā", "tē-(imacaci) > *(imacaxi-lō) > tē+tē-(imacaxi-l-tiā)"],
    ["l25-152", "mati", "B", "projective-nonhuman", "machi-l-tiā", "tla-(mati) > *(machi-lō) > tē+tla-(machi-l-tiā)"],
]);

function getCaquiSourceValence(objectKind = "") {
    return objectKind === "reflexive" ? "mainline-reflexive"
        : objectKind === "nonspecific-human" ? "projective-human"
            : objectKind === "nonspecific-nonhuman" ? "projective-nonhuman"
                : "specific-projective";
}

function buildRecursiveCaquiActiveSourceWithRequests(ctx, {
    subject = "1sg",
    objectRequests = [],
} = {}) {
    const first = objectRequests[0] || { objectKind: "specific-projective", objectPerson: "3sg" };
    const sourceValence = getCaquiSourceValence(first.objectKind);
    const lower = ctx.buildClassicalNahuatlVerbstemClassFrame("caquī-tiā", {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass: "C",
        perfectiveClass: "C",
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: first.objectKind,
        objectPerson: first.objectKind === "specific-projective" ? first.objectPerson || "3sg" : "",
    });
    return ctx.buildClassicalNahuatlMultipleObjectVncFrame(lower, {
        objectRequests: objectRequests.map((request, index) => ({
            objectId: `source-object-${index + 1}`,
            objectKind: request.objectKind,
            objectPerson: request.objectKind === "specific-projective" || request.objectKind === "reflexive"
                ? request.objectPerson || ""
                : "",
            governor: index ? "causative" : "directive",
            derivationalLevel: index + 1,
        })),
    });
}

function buildRecursiveCaquiActiveSource(ctx) {
    const application = ctx.classicalNahuatlVncApplication;
    const request = {
        sourceStem: "caqui",
        verbClass: "B",
        sourceValence: "projective-human",
        objectKind: "nonspecific-human",
        sourceSubject: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
    const preview = application.evaluate(request);
    const derivationOptionId = preview.controlFrame?.derivationOptionInventory?.options
        ?.find((option) => option.targetStem === "caquī-tiā")?.optionId || "";
    return application.evaluate({ ...request, derivationOptionId })
        .resultFrame || null;
}

function buildRecursiveCaquiNonactiveSource(ctx, {
    voice = "passive",
    subject = "1sg",
    objectRequests = [{ objectKind: "specific-projective", objectPerson: "1sg" }],
} = {}) {
    const activeObjectRequests = objectRequests.map((request, index) => index === 0 && voice === "passive"
        ? { ...request, objectKind: "specific-projective", objectPerson: subject }
        : request);
    const active = activeObjectRequests.length > 1
        ? buildRecursiveCaquiActiveSourceWithRequests(ctx, {
            subject: "3sg",
            objectRequests: activeObjectRequests,
        })
        : ctx.buildClassicalNahuatlVerbstemClassFrame("caquī-tiā", {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass: "C",
            perfectiveClass: "C",
            valence: getCaquiSourceValence(activeObjectRequests[0]?.objectKind),
            transitivity: "transitive",
            objectKind: activeObjectRequests[0]?.objectKind || "specific-projective",
            objectPerson: activeObjectRequests[0]?.objectPerson || "",
        });
    const sourceValence = activeObjectRequests.length > 1
        ? "multiple-object"
        : getCaquiSourceValence(activeObjectRequests[0]?.objectKind);
    const inventory = ctx.getClassicalNahuatlNonactiveStemOptions("caquī-tiā", {
        verbClass: "C",
        sourceValence,
    });
    const option = inventory.options.find((candidate) => candidate.nonactiveStem === "caquī-ti-lō");
    const record = ctx.deriveClassicalNahuatlNonactiveStemRecord("caquī-tiā", {
        verbClass: "C",
        sourceValence,
        optionId: option.optionId,
    });
    return ctx.buildClassicalNahuatlDerivedVncFrame(active, {
        voice,
        nonactiveStemRecord: record,
        sourceObjectClusterFrame: activeObjectRequests.length > 1 ? active.multipleObjectClusterFrame : undefined,
        sourceValence,
        sourceSubject: "3sg",
        sourceObjectPerson: voice === "passive" ? subject : "",
        mood: "indicative",
        tense: "present",
        verbClass: "C",
    });
}

function buildRecursiveCaquiPassiveSource(ctx) {
    const application = ctx.classicalNahuatlVncApplication;
    const request = {
        sourceStem: "caqui",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "1sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
    const activePreview = application.evaluate(request);
    const derivationOptionId = activePreview.controlFrame?.derivationOptionInventory?.options
        ?.find((option) => option.targetStem === "caquī-tiā")?.optionId || "";
    const selectedRequest = { ...request, derivationOptionId };
    const passivePreview = application.evaluate({
        ...selectedRequest,
        requestedVoice: "passive",
    });
    const nonactiveOptionId = passivePreview.controlFrame?.nonactiveOptionInventory?.automaticOptionId
        || passivePreview.controlFrame?.nonactiveOptionInventory?.options?.[0]?.optionId
        || "";
    return application.evaluate({
        ...selectedRequest,
        requestedVoice: "passive",
        nonactiveOptionId,
    }).resultFrame || null;
}

function continueRecursiveCaquiSource(ctx, sourceResultFrame, overrides = {}) {
    const application = ctx.classicalNahuatlVncApplication;
    const source = application.getContinuationSourceConstituents(sourceResultFrame);
    const request = {
        sourceStem: source.sourceStem,
        sourceLexemeId: source.sourceLexemeId,
        sourceInitialISelection: source.sourceInitialISelection,
        verbClass: source.verbClass,
        sourceValence: source.sourceValence,
        sourceSubject: source.sourceSubject,
        sourceVoice: source.sourceVoice,
        sourceNonactiveOptionId: source.sourceNonactiveOptionId,
        sourceObjectRequests: source.sourceObjectRequests,
        objectKind: source.objectKind,
        objectPerson: source.objectPerson,
        subject: "2sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        ...overrides,
    };
    const preview = application.continueFromResult(sourceResultFrame, request);
    const derivationOptionId = preview.controlFrame?.derivationOptionInventory?.options
        ?.find((option) => option.targetStem === "caquī-ti-l-tiā")?.optionId || "";
    return application.continueFromResult(sourceResultFrame, {
        ...request,
        derivationOptionId,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons24_25_engine_failure_groups");
    const rowFrames = STEM_RELATION_CASES.map(([id, stem, verbClass, valence, expectedTarget, evidenceRelation]) => {
        const source = valence === "multiple-object"
            ? buildMultipleObjectSource(ctx, stem, verbClass)
            : buildSource(ctx, stem, verbClass, valence);
        const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
        const schematic = ctx.getClassicalNahuatlCanvasSchematicCitationPossibilityInventory(source, inventory);
        const possibility = schematic.possibilities.find((candidate) => (
            candidate.operationFrame?.targetStem === expectedTarget
        )) || null;
        return { id, expectedTarget, evidenceRelation, source, inventory, schematic, possibility };
    });

    s.eq("the 19 Canvas evidence rows resolve to signed typed target operations without making their copied strings authoritative", rowFrames.map((row) => ({
        id: row.id,
        sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(row.source),
        inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(row.inventory),
        schematicCanonical: ctx.isClassicalNahuatlCanvasSchematicCitationPossibilityInventory(row.schematic),
        target: row.possibility?.operationFrame?.targetStem || "",
        operationCanonical: row.possibility ? ctx.isClassicalNahuatlVncDerivationOperationFrame(row.possibility.operationFrame) : false,
        catalogTargetAuthority: row.possibility?.catalogTargetAuthority,
        formulaStringAuthority: row.possibility?.formulaStringAuthority,
        surfaceStringAuthority: row.possibility?.surfaceStringAuthority,
    })), rowFrames.map((row) => ({
        id: row.id,
        sourceCanonical: true,
        inventoryCanonical: true,
        schematicCanonical: true,
        target: row.expectedTarget,
        operationCanonical: true,
        catalogTargetAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
    })));

    const activeQuantityNeighborSpecs = [
        ["l25-199", "nimitzcaquītia", "1sg", [["specific-projective", "3sg"], ["specific-projective", "2sg"]]],
        ["l25-200", "niquincaquītia", "1sg", [["specific-projective", "3sg"], ["specific-projective", "3pl"]]],
        ["l25-201", "nictlacaquītia", "1sg", [["specific-projective", "3sg"], ["nonspecific-nonhuman", ""]]],
        ["l25-202", "nictēcaquītia", "1sg", [["specific-projective", "3sg"], ["nonspecific-human", ""]]],
        ["l25-203", "quimocaquītiah", "3pl", [["specific-projective", "3sg"], ["reflexive", "3pl"]]],
        ["l25-204", "nēchtlacaquītia", "3sg", [["specific-projective", "1sg"], ["nonspecific-nonhuman", ""]]],
        ["l25-205", "nimitzcaquītia", "1sg", [["specific-projective", "3sg"], ["specific-projective", "2sg"]]],
        ["l25-206", "nictēcaquītia", "1sg", [["specific-projective", "3sg"], ["nonspecific-human", ""]]],
        ["l25-207", "niquintlacaquītia", "1sg", [["specific-projective", "3pl"], ["nonspecific-nonhuman", ""]]],
        ["l25-208", "nitētlacaquītia", "1sg", [["nonspecific-human", ""], ["nonspecific-nonhuman", ""]]],
    ];
    const activeQuantityNeighbors = activeQuantityNeighborSpecs.map(([id, expected, subject, requests]) => {
        const source = buildRecursiveCaquiActiveSourceWithRequests(ctx, {
            subject,
            objectRequests: requests.map(([objectKind, objectPerson]) => ({ objectKind, objectPerson })),
        });
        const finite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(source);
        return {
            id,
            canonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source)
                && ctx.isClassicalNahuatlVncFiniteSurfaceFrame(finite),
            source: finite.wordRealization,
            expected,
        };
    });
    const nonactiveQuantityNeighborSpecs = [
        ["l25-209", "nicaquitīlo", "passive", "1sg", [["specific-projective", "1sg"]]],
        ["l25-210", "nitlacaquitīlo", "passive", "1sg", [["specific-projective", "1sg"], ["nonspecific-nonhuman", ""]]],
        ["l25-211", "tētlacaquitīlo", "impersonal", "3sg", [["nonspecific-human", ""], ["nonspecific-nonhuman", ""]]],
    ];
    const nonactiveQuantityNeighbors = nonactiveQuantityNeighborSpecs.map(([id, expected, voice, subject, requests]) => {
        const source = buildRecursiveCaquiNonactiveSource(ctx, {
            voice,
            subject,
            objectRequests: requests.map(([objectKind, objectPerson]) => ({ objectKind, objectPerson })),
        });
        const finite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(source);
        return {
            id,
            canonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source)
                && ctx.isClassicalNahuatlVncFiniteSurfaceFrame(finite),
            source: finite.wordRealization,
            expected,
        };
    });
    s.eq("the ten active caquītia sources and three passive or impersonal caquitīlo neighbors remain exact",
        [...activeQuantityNeighbors, ...nonactiveQuantityNeighbors],
        [...activeQuantityNeighborSpecs, ...nonactiveQuantityNeighborSpecs].map(([id, expected]) => ({
            id,
            canonical: true,
            source: expected,
            expected,
        })));

    const activeSource = buildRecursiveCaquiActiveSource(ctx);
    const activeSurface = activeSource.finiteSurfaceFrame;
    const activeContinuation = continueRecursiveCaquiSource(ctx, activeSource);
    const activeOperation = activeContinuation.resultFrame?.derivationOperationFrame || null;
    const passiveSource = buildRecursiveCaquiPassiveSource(ctx);
    const passiveSurface = passiveSource.finiteSurfaceFrame;
    const passiveContinuation = continueRecursiveCaquiSource(ctx, passiveSource);
    const passiveOperation = passiveContinuation.resultFrame?.derivationOperationFrame || null;
    const registry = ctx.getDefaultGrammarContractRegistry();
    const summarizeReverseSource = (analysis) => [
        analysis.sourceVoice,
        analysis.analysisStatus,
        analysis.formationStem,
        Boolean(analysis.canonicalSignature),
        analysis.generationAuthority,
        analysis.formulaAuthority,
        analysis.surfaceAuthority,
    ];
    s.eq("Lesson 25.13 ambiguity remains signed read-only analysis on the canonical derivation operation", {
        genericActiveSource: activeSurface.wordRealization,
        activeCanonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(activeSurface),
        activeOperationStatus: activeOperation.authorizationStatus,
        activeOperationReason: activeOperation.blockReason,
        activeAnalyses: activeOperation.reverseSourceAnalyses.map(summarizeReverseSource),
        genericPassiveSource: passiveSurface.wordRealization,
        passiveCanonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(passiveSurface),
        passiveAnalyses: passiveOperation.reverseSourceAnalyses.map(summarizeReverseSource),
        activeTarget: activeOperation.targetStem,
        activeOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(activeOperation),
        passiveTarget: passiveOperation.targetStem,
        passiveOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(passiveOperation),
        retiredBuilder: typeof ctx.buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame,
        retiredValidator: typeof ctx.isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame,
        retiredContract: Boolean(ctx.getGrammarContractDefinition(
            registry,
            "classical-nahuatl-derived-vnc-13-alternative-source-projection-frame",
            1,
        )),
    }, {
        genericActiveSource: "nictēcaquītia",
        activeCanonical: true,
        activeOperationStatus: "authorized",
        activeOperationReason: "",
        activeAnalyses: [
            ["active", "identified-source", "caquī-tiā", true, false, false, false],
            ["passive", "canonically-licensed-reverse-source", "caquī-ti-lō", true, false, false, false],
        ],
        genericPassiveSource: "nicaquitīlo",
        passiveCanonical: true,
        passiveAnalyses: [
            ["active", "canonically-licensed-reverse-source", "caquī-tiā", true, false, false, false],
            ["passive", "identified-source", "caquī-ti-lō", true, false, false, false],
        ],
        activeTarget: "caquī-ti-l-tiā",
        activeOperationCanonical: true,
        passiveTarget: "caquī-ti-l-tiā",
        passiveOperationCanonical: true,
        retiredBuilder: "undefined",
        retiredValidator: "undefined",
        retiredContract: false,
    });

    const hostileRow = rowFrames.find((row) => row.id === "l25-122");
    const hostilePossibility = {
        ...hostileRow.possibility,
        citationRealization: "caller-owned-target",
        relationRealization: `${hostileRow.possibility.sourceHistoryRealization} > caller-owned-target`,
    };
    const hostileSchematic = {
        ...hostileRow.schematic,
        possibilities: hostileRow.schematic.possibilities.map((possibility) => (
            possibility === hostileRow.possibility ? hostilePossibility : possibility
        )),
    };
    const callerTargetOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(activeSource.selectedMachineryFrame, {
        derivationType: "causative",
        optionId: activeOperation.selectedOptionId,
        targetSubject: "2sg",
        targetStem: "caller-owned-target",
    });
    const copiedReverseOperation = {
        ...activeOperation,
        reverseSourceAnalyses: activeOperation.reverseSourceAnalyses.map((analysis, index) => (
            index === 0 ? { ...analysis, formationStem: "caller-owned-source" } : analysis
        )),
    };
    s.eq("caller target strings cannot select or mutate a typed route", {
        hostileProjectionAccepted: ctx.isClassicalNahuatlCanvasSchematicCitationPossibilityInventory(hostileSchematic),
        injectedTarget: callerTargetOperation.targetStem,
        injectedOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(callerTargetOperation),
        copiedHostileOperationAccepted: ctx.isClassicalNahuatlVncDerivationOperationFrame({
            ...passiveOperation,
            targetStem: "caller-owned-target",
        }),
        copiedReverseOperationAccepted: ctx.isClassicalNahuatlVncDerivationOperationFrame(copiedReverseOperation),
        alternativeBuilderSurvives: typeof ctx.buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame,
    }, {
        hostileProjectionAccepted: false,
        injectedTarget: "caquī-ti-l-tiā",
        injectedOperationCanonical: true,
        copiedHostileOperationAccepted: false,
        copiedReverseOperationAccepted: false,
        alternativeBuilderSurvives: "undefined",
    });

    return s;
}

module.exports = { run };
