"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson37-passive-patientive-lo",
    "lesson37-passive-patientive-o",
    "lesson37-passive-patientive-hua",
];

function buildVnc(ctx, fields = {}) {
    const request = {
        sourceStem: "quetza",
        verbClass: "B",
        sourceValence: "specific-projective",
        subject: "3sg",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "passive",
        voice: "passive",
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
    const passive = buildVnc(ctx, { ...fields, nonactiveSuffix: suffix });
    const result = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        canonicalVncResult: passive.resultFrame,
        subject: target.subject || "3sg",
        state: target.state || "absolutive",
        possessor: target.possessor || "",
        animacy: target.animacy || "animate",
        humanness: target.humanness || "unspecified",
    });
    return { passive, result,
        frame: result.operationFrame?.passivePatientiveFamilyFrame };
}

function project(entry) {
    const frame = entry.frame || {};
    return {
        statuses: [entry.passive.authorizationStatus,
            entry.result.authorizationStatus],
        family: frame.selectedFamily,
        suffix: frame.typedSuffixFamily,
        active: frame.activeSourceStem,
        passive: frame.passiveSourceStem,
        target: frame.patientiveTargetStem,
        nounClass: frame.nounClass,
        removed: frame.removedMaterial,
        vowel: frame.precedingVowelBehavior,
        chain: frame.completeActivePassivePatientiveChainPreserved,
        exact: frame.exactPassiveVncResultIdentityPreserved,
        examples: frame.exampleStemMembershipRequired,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson37_groups_16_18_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson37-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const lo = patientive(ctx, {
        sourceStem: "quetza", verbClass: "B",
    }, "lō", { animacy: "nonanimate", humanness: "nonhuman" });
    s.eq("typed lō removes final ō, retains l, and keeps the exact chain",
        project(lo), {
            statuses: ["authorized", "authorized"],
            family: "lō-passive-patientive", suffix: "lō",
            active: "quetza", passive: "quetza-lō", target: "quetza-l",
            nounClass: "tli", removed: "ō",
            vowel: "reduced-long-a-written-without-macron",
            chain: true, exact: true, examples: false,
        });
    s.eq("lō records automatic form and lexical-reading boundaries", {
        retained: lo.frame?.loDeletesFinalOAndRetainsL,
        objectPattern: lo.frame?.sourceObjectPattern,
        patient: lo.frame?.patientReferent,
        animacy: lo.frame?.targetAnimacy,
        humanness: lo.frame?.targetHumanness,
        compositional: lo.frame?.compositionalPatientReadingAlwaysAvailable,
        lexical: lo.frame
            ?.lexicalizedOrFigurativeReadingRequiresTypedSourceOrContext,
        shapeMeaning: lo.frame?.lexicalMeaningSelectedBySuffixShape,
    }, {
        retained: true, objectPattern: "none", patient: "3sg",
        animacy: "nonanimate", humanness: "nonhuman",
        compositional: true, lexical: true, shapeMeaning: false,
    });

    const o = patientive(ctx, {
        sourceStem: "teci", verbClass: "B",
    }, "ō", { animacy: "nonanimate", humanness: "nonhuman" });
    s.eq("typed ō removes the complete suffix and preserves participants",
        project(o), {
            statuses: ["authorized", "authorized"],
            family: "ō-passive-patientive", suffix: "ō",
            active: "teci", passive: "tex-ō", target: "tex",
            nounClass: "tli", removed: "ō", vowel: "not-applicable",
            chain: true, exact: true, examples: false,
        });
    s.eq("ō keeps referent type and the complete active/passive history", {
        deletion: o.frame?.oDeletesCompletePassiveSuffix,
        sourceAnalysis: Boolean(o.frame?.canonicalPassiveSourceAnalysisFrame),
        nonactiveRecord: Boolean(o.frame?.canonicalNonactiveStemRecord),
        participantFrame: Boolean(o.frame?.canonicalPassiveParticipantFrame),
        valence: o.frame?.activeSourceValence,
        animacy: o.frame?.targetAnimacy,
        english: o.frame?.englishSemanticIntuitionAuthorizesAgentiveReanalysis,
    }, {
        deletion: true, sourceAnalysis: true, nonactiveRecord: true,
        participantFrame: true, valence: "specific-projective",
        animacy: "nonanimate", english: false,
    });

    const huaI = patientive(ctx, {
        sourceStem: "cui", verbClass: "A",
    }, "hua", { animacy: "nonanimate", humanness: "nonhuman" });
    s.eq("typed hua removes hua and shortens preceding long ī only",
        project(huaI), {
            statuses: ["authorized", "authorized"],
            family: "hua-passive-patientive", suffix: "hua",
            active: "cui", passive: "cuī-hua", target: "cui",
            nounClass: "tl", removed: "hua",
            vowel: "long-i-shortened-to-i",
            chain: true, exact: true, examples: false,
        });
    const huaO = patientive(ctx, {
        sourceStem: "zō", verbClass: "A",
        sourceValence: "specific-projective",
        objectKind: "nonspecific-nonhuman",
    }, "hua", { animacy: "nonanimate", humanness: "nonhuman" });
    s.eq("hua does not erase the long ō of an open typed Source", project(huaO), {
        statuses: ["authorized", "authorized"],
        family: "hua-passive-patientive", suffix: "hua",
        active: "zō", passive: "zō-hua", target: "zō",
        nounClass: "tl", removed: "hua",
        vowel: "preceding-vowel-preserved",
        chain: true, exact: true, examples: false,
    });
    s.eq("hua preserves owner-issued irregularity and Nahuatl construal", {
        delete: huaI.frame?.huaDeletesCompleteSuffix,
        shortI: huaI.frame?.huaShortensPrecedingLongI,
        preserveO: huaO.frame?.huaPreservesOtherPrecedingVowels,
        supportive: huaI.frame?.supportiveInitialVowelAnalysisPreserved,
        boundaries: huaI.frame?.reduplicationAndInternalBoundariesPreserved,
        irregularBlocks:
            huaI.frame?.unexpectedOrIrregularSourceBlocksPatientive,
        nahuatl: huaI.frame?.nahuatlPatientiveConstrualRemainsAuthoritative,
        english:
            huaI.frame?.englishSemanticIntuitionAuthorizesAgentiveReanalysis,
    }, {
        delete: true, shortI: true, preserveO: true, supportive: true,
        boundaries: true, irregularBlocks: false, nahuatl: true,
        english: false,
    });

    const changedShape = patientive(ctx, {
        sourceStem: "piya", verbClass: "B",
    }, "lō", { animacy: "nonanimate", humanness: "nonhuman" });
    const copied = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        canonicalVncResult: { ...lo.passive.resultFrame },
    });
    s.eq("Source shape stays productive while exact owner identity is required", {
        changed: [changedShape.passive.authorizationStatus,
            changedShape.result.authorizationStatus,
            changedShape.frame?.exampleStemMembershipRequired],
        copied: [copied.authorizationStatus, copied.blockReason],
    }, {
        changed: ["authorized", "authorized", false],
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
    });

    const cueFrames = [lo.result, o.result, huaI.result];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame || null,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 115 atoms have exact jobs and all 53 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 115, writing: 53, readingOnly: 62,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
    }
    return s;
}

module.exports = { run };
