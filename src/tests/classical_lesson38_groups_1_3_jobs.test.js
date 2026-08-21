"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson38-impersonal-patientive-foundation",
    "lesson38-impersonal-patientive-lo",
    "lesson38-impersonal-patientive-o-ohua",
];

function buildImpersonalVnc(ctx, fields = {}) {
    const request = {
        sourceStem: "cochi",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        voice: "impersonal",
        ...fields,
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const suffix = fields.nonactiveSuffix || "";
    const option = (preview.controlFrame
        ?.nonactiveOptionInventory?.options || []).find(item => (
        item.suffixFamily === suffix
        || item.optionId.startsWith(`${suffix}:`)
    ));
    const optionId = fields.nonactiveOptionId
        || option?.optionId
        || preview.controlFrame?.nonactiveOptionInventory?.automaticOptionId
        || "";
    return optionId && !request.nonactiveOptionId
        ? ctx.evaluateClassicalNahuatlVncApplication({
            ...request, nonactiveOptionId: optionId,
        })
        : preview;
}

function patientive(ctx, fields, suffix, target = {}) {
    const impersonal = buildImpersonalVnc(ctx, {
        ...fields,
        nonactiveSuffix: suffix,
    });
    const result = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: impersonal.resultFrame,
        subject: target.subject || "3sg",
        state: target.state || "absolutive",
        possessor: target.possessor || "",
        animacy: target.animacy || "nonanimate",
        humanness: target.humanness || "nonhuman",
    });
    return {
        impersonal,
        result,
        foundation: result.operationFrame
            ?.impersonalPatientiveFoundationFrame,
        frame: result.operationFrame?.impersonalPatientiveFamilyFrame,
    };
}

function project(entry) {
    const frame = entry.frame || {};
    return {
        statuses: [entry.impersonal.authorizationStatus,
            entry.result.authorizationStatus],
        family: frame.selectedFamily,
        suffix: frame.typedSuffixFamily,
        active: frame.activeSourceStem,
        impersonal: frame.impersonalSourceStem,
        target: frame.patientiveTargetStem,
        nounClass: frame.nounClass,
        removed: frame.removedMaterial,
        chain: frame.completeActiveImpersonalPatientiveChainPreserved,
        exact: frame.exactImpersonalVncResultIdentityPreserved,
        examples: frame.exampleStemMembershipRequired,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson38_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson38-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const lo = patientive(ctx, {
        sourceStem: "mayāna", verbClass: "B",
    }, "lō");
    s.eq("foundation captures an exact impersonal Result and keeps its Source", {
        statuses: [lo.impersonal.authorizationStatus,
            lo.result.authorizationStatus],
        exact: lo.foundation?.exactImpersonalResultIdentityPreserved,
        active: lo.foundation?.activeSourceStem,
        core: lo.foundation?.impersonalCore,
        suffix: lo.foundation?.nonactiveSuffix,
        analysis: lo.foundation?.completeTypedSourceAnalysisPreserved,
        resultNotAgent:
            lo.foundation?.patientiveNamesResultRatherThanAgent,
        englishAuthority:
            lo.foundation?.englishParticipleAnalogyAuthorizesGrammar,
        raw: lo.foundation?.rawNonactiveLookingStemAccepted,
        copied: lo.foundation?.copiedResultAccepted,
    }, {
        statuses: ["authorized", "authorized"], exact: true,
        active: "mayāna", core: "mayāna-lō", suffix: "lō",
        analysis: true, resultNotAgent: true, englishAuthority: false,
        raw: false, copied: false,
    });
    s.eq("typed lō loses final ō, retains l, and uses no stem list",
        project(lo), {
            statuses: ["authorized", "authorized"],
            family: "lō-impersonal-patientive", suffix: "lō",
            active: "mayāna", impersonal: "mayāna-lō", target: "mayāna-l",
            nounClass: "tli", removed: "ō", chain: true, exact: true,
            examples: false,
        });
    const parityRequest = {
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: lo.impersonal.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
        humanness: "nonhuman",
    };
    const parityPlan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        ...parityRequest,
        subjects: ["3sg"],
        states: ["absolutive", "possessive"],
    });
    const parityCoordinates =
        ctx.projectClassicalNahuatlParadigmCoordinates(parityPlan);
    const parityScalar = ctx.evaluateClassicalNahuatlDeverbalNnc(
        parityRequest
    );
    const paritySelected = parityCoordinates.find(frame => (
        frame.coordinateId === "absolutive:3sg"
    ));
    s.eq("impersonal patientives have pointwise scalar and paradigm parity", {
        status: parityPlan.authorizationStatus,
        count: parityCoordinates.length,
        allScalar: parityCoordinates.every(frame => frame.scalarEquivalent),
        exactSource: parityCoordinates.every(frame => (
            frame.preparedFrame.sourceFrame === parityPlan.preparedSourceFrame
        )),
        selected: [paritySelected?.formulaRealization,
            paritySelected?.wordSurface],
        scalar: [parityScalar.formulaRealization, parityScalar.wordSurface],
    }, {
        status: "authorized", count: 2, allScalar: true,
        exactSource: true,
        selected: [parityScalar.formulaRealization, parityScalar.wordSurface],
        scalar: [parityScalar.formulaRealization, parityScalar.wordSurface],
    });
    s.eq("lō keeps automatic form separate from lexical meaning", {
        retained: lo.frame?.loDeletesFinalOAndRetainsL,
        compositional:
            lo.frame?.compositionalPatientiveReadingAlwaysAvailable,
        lexical: lo.frame?.lexicalReadingRequiresTypedSourceOrContext,
        shapeMeaning: lo.frame?.lexicalMeaningSelectedBySuffixShape,
        sourceAnalysis: Boolean(
            lo.frame?.canonicalImpersonalSourceAnalysisFrame),
        nonactiveRecord: Boolean(lo.frame?.canonicalNonactiveStemRecord),
    }, {
        retained: true, compositional: true, lexical: true,
        shapeMeaning: false, sourceAnalysis: true, nonactiveRecord: true,
    });

    const rootDerived = patientive(ctx, {
        sourceStem: "mela-ya", verbClass: "B",
    }, "lō");
    s.eq("root plus ya follows the exact VNC result without a duplicate choice", {
        target: rootDerived.frame?.patientiveTargetStem,
        options: rootDerived.frame?.rootPlusYaRealizationOptions,
        selected: rootDerived.frame?.selectedRootPlusYaRealization,
        applied: rootDerived.frame?.rootPlusYaDeletionApplied,
        owner: rootDerived.frame
            ?.rootPlusYaRemovalAlreadyAppliedByVncOwner,
        typed: rootDerived.frame?.rootPlusYaChoiceDerivedFromTypedBoundary,
        duplicate: rootDerived.frame
            ?.duplicatePatientiveRootPlusYaChoiceExposed,
        letters: rootDerived.frame
            ?.visibleFinalLettersAloneAuthorizeRootPlusYaChoice,
    }, {
        target: "mela-l", options: [],
        selected: "already-derived-by-vnc-owner",
        applied: true, owner: true, typed: true,
        duplicate: false, letters: false,
    });
    s.eq("an unlisted typed root plus ya Source receives the same rule", {
        status: rootDerived.result.authorizationStatus,
        target: rootDerived.frame?.patientiveTargetStem,
        examples: rootDerived.frame?.exampleStemMembershipRequired,
    }, { status: "authorized", target: "mela-l", examples: false });

    const o = patientive(ctx, {
        sourceStem: "cuīca", verbClass: "A",
    }, "ō");
    s.eq("typed ō removes the complete nonactive suffix", project(o), {
        statuses: ["authorized", "authorized"],
        family: "ō-or-o-hua-impersonal-patientive", suffix: "ō",
        active: "cuīca", impersonal: "cuic-ō", target: "cuic",
        nounClass: "tli", removed: "ō", chain: true, exact: true,
        examples: false,
    });
    s.eq("ō keeps owner-supplied realization and repeated-layer evidence", {
        deletes: o.frame?.oOrOHuaDeletesCompleteNonactiveMaterial,
        operation: o.frame?.sourceVoiceOperation,
        priorTla: o.frame?.sourceAlreadyCarriesTlaImpersonalLayer,
        inherent: o.frame?.inherentImpersonalAnalysisPreserved,
        complete: o.frame?.completeTypedSourceAnalysisPreserved,
        irregular: o.frame?.typedIrregularNonactiveRealizationPreserved,
    }, {
        deletes: true, operation: "impersonal", priorTla: false,
        inherent: false, complete: true, irregular: false,
    });
    const oHua = patientive(ctx, {
        sourceStem: "oh-quetza", verbClass: "B",
    }, "o-hua");
    s.eq("typed o-hua removes the complete nonactive suffix", project(oHua), {
        statuses: ["authorized", "authorized"],
        family: "ō-or-o-hua-impersonal-patientive", suffix: "o-hua",
        active: "oh-quetza", impersonal: "oh-quetz-o-hua",
        target: "oh-quetz", nounClass: "tli", removed: "o-hua",
        chain: true, exact: true, examples: false,
    });

    const copied = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: { ...lo.impersonal.resultFrame },
    });
    const raw = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        source: {
            sourceStage: "nonactive-core", sourceStem: "zahua-lō",
            verbClass: "A", sourceVoice: "impersonal",
            sourceValence: "intransitive", sourceObjectPattern: "none",
            nonactiveSuffix: "lō",
        },
    });
    const duplicateRootChoice = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: rootDerived.impersonal.resultFrame,
        patientiveRootPlusYaRealization: "delete",
    });
    s.eq("identity and typed boundary facts block hostile alternatives", {
        copied: [copied.authorizationStatus, copied.blockReason],
        raw: [raw.authorizationStatus, raw.blockReason],
        root: [duplicateRootChoice.authorizationStatus,
            duplicateRootChoice.blockReason],
    }, {
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
        raw: ["blocked",
            "exact-owner-issued-impersonal-vnc-result-required"],
        root: ["blocked",
            "38.1.1-root-plus-ya-realization-is-owned-by-the-vnc-result"],
    });

    const cueFrames = [lo.result, rootDerived.result, o.result, oHua.result];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame || null,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 106 atoms have jobs and all 49 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 106, writing: 49, readingOnly: 57,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
    }
    return s;
}

module.exports = { run };
