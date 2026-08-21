"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson38-human-source-tla-lo",
    "lesson38-human-source-tla-o",
    "lesson38-human-source-tla-hua-exceptions",
];

function buildHumanImpersonalVnc(ctx, fields = {}, suffix = "lō") {
    const request = {
        sourceStem: "pāna",
        verbClass: "B",
        sourceValence: "projective-human",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        voice: "impersonal",
        ...fields,
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const option = (preview.controlFrame
        ?.nonactiveOptionInventory?.options || []).find(item => (
        item.suffixFamily === suffix
        || item.optionId.startsWith(`${suffix}:`)
    ));
    return {
        preview,
        option,
        result: ctx.evaluateClassicalNahuatlVncApplication({
            ...request,
            nonactiveOptionId: option?.optionId || "",
        }),
    };
}

function deriveHumanPatientive(ctx, fields = {}, suffix = "lō",
    overrides = {}) {
    const impersonal = buildHumanImpersonalVnc(ctx, fields, suffix);
    const request = {
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: impersonal.result.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        humanness: "human",
        ...overrides,
    };
    const result = ctx.evaluateClassicalNahuatlDeverbalNnc(request);
    return {
        impersonal,
        request,
        result,
        human: result.operationFrame
            ?.impersonalHumanSourcePatientiveFrame,
        projective: result.operationFrame
            ?.impersonalProjectivePatientiveFrame,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson38_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson38-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const lo = deriveHumanPatientive(ctx, {
        sourceStem: "pāna", verbClass: "B",
    }, "lō");
    s.eq("human projective Sources pass through passive before impersonal lō", {
        statuses: [lo.impersonal.result.authorizationStatus,
            lo.result.authorizationStatus],
        formula: lo.impersonal.result.resultFrame?.formulaRealization,
        path: lo.human?.voiceOperationSequence,
        activeCarrier: lo.human?.activeHumanObjectCarrier,
        carrier: lo.human?.patientiveCarrier,
        target: lo.human?.patientiveTargetStem,
        referent: lo.human?.patientiveSubjectReferentAnimacy,
        promoted: lo.human?.passivePatientPromotionApplied,
        deleted: lo.human
            ?.passivePatientSubjectThenDeletedByImpersonalization,
        direct: lo.human?.directImpersonalizationOfActiveBlocked,
        lo: lo.human?.loDeletesFinalOAndRetainsL,
        nonhumanFrame: lo.projective,
    }, {
        statuses: ["authorized", "authorized"],
        formula: "#0-0(tla-pāna-lo)0+0-0#",
        path: ["active", "passive", "impersonalized-passive"],
        activeCarrier: "tē", carrier: "tla",
        target: "tla-pāna-l", referent: "human",
        promoted: true, deleted: true, direct: true, lo: true,
        nonhumanFrame: null,
    });

    const o = deriveHumanPatientive(ctx, {
        sourceStem: "pāna", verbClass: "B",
    }, "ō");
    s.eq("human projective ō keeps the same path and removes ō", {
        statuses: [o.impersonal.result.authorizationStatus,
            o.result.authorizationStatus],
        source: o.human?.impersonalizedPassiveStem,
        target: o.human?.patientiveTargetStem,
        suffix: o.human?.typedSuffixFamily,
        carrier: o.human?.patientiveCarrier,
        deletes: o.human?.oDeletesCompleteNonactiveSuffix,
        referent: o.human?.patientiveSubjectReferentAnimacy,
    }, {
        statuses: ["authorized", "authorized"],
        source: "tla-pān-ō", target: "tla-pān", suffix: "ō",
        carrier: "tla", deletes: true, referent: "human",
    });

    const hua = deriveHumanPatientive(ctx, {
        sourceStem: "ahci", verbClass: "A",
    }, "hua");
    s.eq("the typed ahci hua Source follows the human patientive path", {
        statuses: [hua.impersonal.result.authorizationStatus,
            hua.result.authorizationStatus],
        option: hua.impersonal.option?.optionId || "",
        source: hua.human?.impersonalizedPassiveStem,
        target: hua.human?.patientiveTargetStem,
        carrier: hua.human?.patientiveCarrier,
        deletes: hua.human?.huaDeletesCompleteNonactiveSuffix,
        behavior: hua.human?.precedingVowelBehavior,
        exampleGate: hua.human?.exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized"],
        option: "hua:ahxī-hua", source: "tla-ahxī-hua",
        target: "tla-ahxi", carrier: "tla", deletes: true,
        behavior: "long-i-shortened-to-i", exampleGate: false,
    });

    const unlisted = deriveHumanPatientive(ctx, {
        sourceStem: "xemī", verbClass: "B",
    }, "hua");
    s.eq("an unlisted compatible human Source uses the same rule", {
        statuses: [unlisted.impersonal.result.authorizationStatus,
            unlisted.result.authorizationStatus],
        target: unlisted.human?.patientiveTargetStem,
        human: unlisted.human?.patientiveSubjectReferentAnimacy,
        exampleGate: unlisted.human?.exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized"],
        target: "tla-xemī", human: "human", exampleGate: false,
    });

    const exceptional = deriveHumanPatientive(ctx, {
        sourceStem: "huica", verbClass: "A",
    }, "lō");
    s.eq("typed lexical exceptions retain tē without a free switch", {
        statuses: [exceptional.impersonal.result.authorizationStatus,
            exceptional.result.authorizationStatus],
        source: exceptional.human?.impersonalizedPassiveStem,
        target: exceptional.human?.patientiveTargetStem,
        carrier: exceptional.human?.patientiveCarrier,
        regular: exceptional.human?.regularHumanSourceTlaCarrier,
        exceptional: exceptional.human?.exceptionalHumanTeRetention,
        licensed: exceptional.human
            ?.exceptionalRetentionLicensedByTypedLexicalSource,
        carrierChoice: exceptional.human?.carrierSelectedByUser,
    }, {
        statuses: ["authorized", "authorized"],
        source: "tla-huica-lō", target: "tē-huica-l",
        carrier: "tē", regular: false, exceptional: true,
        licensed: true, carrierChoice: false,
    });

    const hostile = [
        ["patientiveHumanSourceCarrier", "tē"],
        ["patientiveHumanSourceVoicePath", "direct"],
        ["patientiveHumanSourceReferent", "nonhuman"],
        ["retainExceptionalHumanPrefix", true],
    ].map(([field, value]) => ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...lo.request,
        [field]: value,
    }));
    s.eq("carrier, voice path, referent, and exceptions are not manual", {
        statuses: hostile.map(frame => frame.authorizationStatus),
        reasons: hostile.map(frame => frame.blockReason),
    }, {
        statuses: ["blocked", "blocked", "blocked", "blocked"],
        reasons: [
            "38.1.4-human-source-carrier-path-and-referent-are-derived",
            "38.1.4-human-source-carrier-path-and-referent-are-derived",
            "38.1.4-human-source-carrier-path-and-referent-are-derived",
            "caller-supplied-derived-authority-rejected:request.retainExceptionalHumanPrefix",
        ],
    });

    const parityPlan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        ...lo.request,
        subjects: ["3sg"],
        states: ["absolutive", "possessive"],
    });
    const parityCoordinates =
        ctx.projectClassicalNahuatlParadigmCoordinates(parityPlan);
    s.eq("human-source patientives keep scalar and paradigm parity", {
        status: parityPlan.authorizationStatus,
        count: parityCoordinates.length,
        allScalar: parityCoordinates.every(frame => frame.scalarEquivalent),
        exactSource: parityCoordinates.every(frame => (
            frame.preparedFrame.sourceFrame === parityPlan.preparedSourceFrame
        )),
    }, { status: "authorized", count: 2, allScalar: true,
        exactSource: true });

    const cueFrames = [lo.result, o.result, hua.result, exceptional.result];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame || null,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 98 atoms have jobs and all 36 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 98, writing: 36, readingOnly: 62,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.eq(`cue:${record.atomId}`, covered.has(record.atomId), true);
    }

    return s;
}

module.exports = { run };
