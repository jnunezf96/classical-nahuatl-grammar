"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson37-action-nnc-supplementation",
    "lesson37-patientive-taxonomy-and-truncation",
    "lesson37-passive-patientive-foundation",
];

function buildVnc(ctx, fields = {}) {
    const request = {
        sourceStem: "xopani",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...fields,
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const options = preview.controlFrame?.nonactiveOptionInventory?.options || [];
    const requestedSuffix = fields.nonactiveSuffix || "";
    const option = options.find(item => (
        item.suffixFamily === requestedSuffix
        || item.optionId.startsWith(`${requestedSuffix}:`)
    ));
    const automatic = preview.controlFrame
        ?.nonactiveOptionInventory?.automaticOptionId || "";
    const optionId = fields.nonactiveOptionId
        || option?.optionId || automatic;
    return optionId && !request.nonactiveOptionId
        ? ctx.evaluateClassicalNahuatlVncApplication({
            ...request, nonactiveOptionId: optionId,
        })
        : preview;
}

function actionNnc(ctx, sourceStem = "xopani") {
    const vnc = buildVnc(ctx, {
        sourceStem,
        verbClass: "B",
        tense: "future",
    });
    const nnc = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "liz",
        canonicalVncResult: vnc.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    return { vnc, nnc };
}

function supplementAction(ctx, sourceStem = "xopani", referent = "event") {
    const principal = buildVnc(ctx, {
        sourceStem: "mati",
        verbClass: "B",
        sourceValence: "specific-projective",
        subject: "1sg",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const action = actionNnc(ctx, sourceStem);
    const principalClause = ctx
        .buildClassicalNahuatlSupplementationClauseEnvelope(principal, {
            referenceId: "knowing",
            subjectReferenceId: "knower",
            objectReferenceId: referent,
        });
    const supplementClause = ctx
        .buildClassicalNahuatlSupplementationClauseEnvelope(action.nnc, {
            referenceId: referent,
            subjectReferenceId: referent,
        });
    const result = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause,
        supplementClause,
        options: {
            referenceMode: "shared",
            headRole: "object",
            supplementContactRole: "subject",
            order: "principal-first",
        },
    });
    return { principal, action, principalClause, supplementClause, result };
}

function passivePatientive(ctx, suffix = "ō") {
    const passive = buildVnc(ctx, {
        sourceStem: "itta",
        verbClass: "A",
        sourceValence: "specific-projective",
        subject: "3sg",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        requestedVoice: "passive",
        voice: "passive",
        nonactiveSuffix: suffix,
    });
    const patientive = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        canonicalVncResult: passive.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    return { passive, patientive };
}

function impersonalPatientive(ctx, sourceStem, verbClass, nonactiveSuffix) {
    const request = {
        sourceStem,
        verbClass,
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        voice: "impersonal",
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const option = (preview.controlFrame
        ?.nonactiveOptionInventory?.options || []).find(item => (
        item.suffixFamily === nonactiveSuffix
    ));
    const impersonal = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        nonactiveOptionId: option?.optionId || "",
    });
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: impersonal.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson37_groups_13_15_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson37-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const xopani = supplementAction(ctx, "xopani", "writing-event");
    const relation = xopani.result.operationFrames?.find(frame => (
        frame.kind === "classical-nahuatl-action-nnc-supplementary-object-frame"
    ));
    s.eq("an unlisted exact action NNC uses the shared supplementary-object owner", {
        statuses: [xopani.principal.authorizationStatus,
            xopani.action.nnc.authorizationStatus,
            xopani.principalClause.authorizationStatus,
            xopani.supplementClause.authorizationStatus,
            xopani.result.authorizationStatus],
        relation: [relation?.relation, relation?.principalParticipantRole,
            relation?.supplementParticipantRole, relation?.sharedReferentId],
        exact: relation?.exactOwnerIssuedActionNncResultPreserved,
        shared: relation?.sharedSupplementationOwnerReused,
        separate: relation?.separateLesson37SupplementationEngineCreated,
        stemGate: relation?.nounstemIdentityAuthorizesRelation,
        acyclic: relation?.acyclicHierarchyRequired,
    }, {
        statuses: ["authorized", "authorized", "authorized", "authorized",
            "authorized"],
        relation: ["supplementary-object", "object", "subject",
            "writing-event"],
        exact: true, shared: true, separate: false, stemGate: false,
        acyclic: true,
    });

    const otherShape = supplementAction(ctx, "tepani", "writing-event");
    const wrongReferent = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: xopani.principalClause,
        supplementClause: ctx
            .buildClassicalNahuatlSupplementationClauseEnvelope(
                xopani.action.nnc,
                { referenceId: "other-event",
                    subjectReferenceId: "other-event" }
            ),
        options: { referenceMode: "shared", headRole: "object",
            supplementContactRole: "subject" },
    });
    const copiedClause = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        { ...xopani.action.nnc },
        { referenceId: "writing-event", subjectReferenceId: "writing-event" }
    );
    s.eq("referent identity controls supplementation while Source shape does not", {
        otherShape: otherShape.result.authorizationStatus,
        wrongReferent: [wrongReferent.authorizationStatus,
            wrongReferent.blockReason],
        copied: [copiedClause.authorizationStatus, copiedClause.blockReason],
    }, {
        otherShape: "authorized",
        wrongReferent: ["blocked", "shared-referent-identity-mismatch"],
        copied: ["blocked", "typed-nuclear-clause-surface-unavailable"],
    });

    const suffixCases = [
        ["mayāna", "B", "lō", "mayāna-l", "tli",
            "reduced-long-a-written-without-macron"],
        ["cuīca", "A", "ō", "cuic", "tli", "not-applicable"],
        ["oh-quetza", "B", "o-hua", "oh-quetz", "tli",
            "not-applicable"],
        ["cochi", "B", "hua", "cochi", "tl",
            "long-i-shortened-to-i"],
    ].map(([stem, verbClass, suffix, target, nounClass, vowel]) => {
        const frame = impersonalPatientive(ctx, stem, verbClass, suffix);
        return {
            status: frame.authorizationStatus,
            suffix: frame.operationFrame?.patientiveTruncationFrame
                ?.typedSuffixFamily,
            target: frame.operationFrame?.targetStems?.restrictedUse,
            nounClass: frame.operationFrame?.nounClass,
            vowel: frame.operationFrame?.patientiveTruncationFrame
                ?.precedingVowelBehavior,
            boundary: frame.operationFrame?.patientiveTruncationFrame
                ?.truncationDerivedFromTypedMorphemicBoundary,
            whitelist: frame.operationFrame?.patientiveTruncationFrame
                ?.exampleStemMembershipRequired,
        };
    });
    s.eq("owner-issued nonactive truncations read typed morphemic boundaries", suffixCases, [
        { status: "authorized", suffix: "lō", target: "mayāna-l",
            nounClass: "tli", vowel: "reduced-long-a-written-without-macron",
            boundary: true, whitelist: false },
        { status: "authorized", suffix: "ō", target: "cuic",
            nounClass: "tli", vowel: "not-applicable",
            boundary: true, whitelist: false },
        { status: "authorized", suffix: "o-hua", target: "oh-quetz",
            nounClass: "tli", vowel: "not-applicable",
            boundary: true, whitelist: false },
        { status: "authorized", suffix: "hua", target: "cochi",
            nounClass: "tl", vowel: "long-i-shortened-to-i",
            boundary: true, whitelist: false },
    ]);

    const passiveO = passivePatientive(ctx, "ō");
    const taxonomy = passiveO.patientive.operationFrame
        ?.patientiveTaxonomyFrame;
    const otherFamilies = [
        impersonalPatientive(ctx, "mayāna", "B", "lō"),
        ctx.evaluateClassicalNahuatlDeverbalNnc({
            constructionKind: "patientive",
            patientiveSourceFamily: "perfective-active-core",
            patientiveAnalogy: "impersonal",
            source: { sourceStage: "perfective-core", sourceStem: "mic",
                verbClass: "B", sourceVoice: "active",
                sourceValence: "intransitive", sourceObjectPattern: "none" },
            subject: "3sg", state: "absolutive",
        }),
        ctx.evaluateClassicalNahuatlDeverbalNnc({
            constructionKind: "patientive",
            patientiveSourceFamily: "imperfective-active-core",
            patientiveAnalogy: "impersonal",
            source: { sourceStage: "imperfective-core",
                sourceStem: "mictiā", verbClass: "A",
                sourceVoice: "active", sourceValence: "single-object",
                sourceObjectPattern: "none" },
            subject: "3sg", state: "absolutive",
        }),
        ctx.evaluateClassicalNahuatlDeverbalNnc({
            constructionKind: "patientive",
            patientiveSourceFamily: "root-or-stock",
            source: { sourceStage: "root-or-stock",
                sourceStem: "cual-ā-ni", verbClass: "A",
                sourceVoice: "active", sourceValence: "intransitive",
                sourceObjectPattern: "none" },
            subject: "3sg", state: "absolutive",
        }),
    ];
    s.eq("one taxonomy preserves all five Source families without a route list", {
        statuses: [passiveO.patientive, ...otherFamilies]
            .map(frame => frame.authorizationStatus),
        families: taxonomy?.basicSourceFamilies,
        selected: taxonomy?.selectedSourceFamily,
        meaningRange: taxonomy?.meaningRange,
        lexical: taxonomy
            ?.lexicalMeaningOrIrregularFormationRequiresTypedAnalysis,
        shapeMeaning: taxonomy?.sourceShapeAloneSelectsLexicalMeaning,
        examples: taxonomy?.examplesAuthorizeRoute,
    }, {
        statuses: ["authorized", "authorized", "authorized", "authorized",
            "authorized"],
        families: ["passive-core", "impersonal-core",
            "perfective-active-core", "imperfective-active-core",
            "root-or-stock"],
        selected: "passive-core",
        meaningRange: ["entity-capable-of-undergoing-action",
            "entity-that-has-undergone-action",
            "entity-that-has-become-a-state", "product-or-result"],
        lexical: true, shapeMeaning: false, examples: false,
    });

    const capture = ctx.captureClassicalNahuatlPassiveVncResultForPatientive(
        passiveO.passive.resultFrame
    );
    const foundation = passiveO.patientive.operationFrame
        ?.passivePatientiveFoundationFrame;
    const raw = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        source: { sourceStage: "nonactive-core", sourceStem: "itt-ō",
            verbClass: "A", sourceVoice: "passive",
            sourceValence: "single-object", sourceObjectPattern: "none",
            nonactiveSuffix: "ō" },
    });
    const copied = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        canonicalVncResult: { ...passiveO.passive.resultFrame },
    });
    const active = buildVnc(ctx, {
        sourceStem: "xopani", verbClass: "B", sourceValence: "intransitive",
    });
    const activeAttempt = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        canonicalVncResult: active.resultFrame,
    });
    s.eq("passive patientives require an exact transitive passive ancestry", {
        capture: [capture.authorizationStatus,
            ctx.isClassicalNahuatlPassivePatientiveVncCaptureFrame(capture),
            capture.canonicalVncResult === passiveO.passive.resultFrame],
        foundation: [foundation?.exactPassiveResultIdentityPreserved,
            foundation?.ultimateActiveSourceIsTransitive,
            foundation?.intransitiveUltimateSourceAllowed,
            foundation?.noObjectPassiveBranch,
            foundation?.patientReferent,
            foundation?.passiveHistoryReconstructedFromSurface],
        raw: [raw.authorizationStatus, raw.blockReason],
        copied: [copied.authorizationStatus, copied.blockReason],
        active: [activeAttempt.authorizationStatus, activeAttempt.blockReason],
    }, {
        capture: ["authorized", true, true],
        foundation: [true, true, false, true, "3sg", false],
        raw: ["blocked", "exact-owner-issued-passive-vnc-result-required"],
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
        active: ["blocked", "exact-owner-issued-passive-vnc-result-required"],
    });

    const cueFrames = [xopani.result, passiveO.patientive,
        otherFamilies[0]];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame || null,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 40 atoms have exact jobs and all 26 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 40, writing: 26, readingOnly: 14,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
    }
    return s;
}

module.exports = { run };
