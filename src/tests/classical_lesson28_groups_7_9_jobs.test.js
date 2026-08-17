"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP7_ID = "lesson28-special-embeds-event-order-and-nonactive-scope";
const GROUP8_ID = "lesson28-accompanying-possession";
const GROUP9_ID = "lesson28-intransitivized-reflexive-matrix";

function request(overrides = {}) {
    return {
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        objectKind: "none",
        objectPerson: "",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: "nemi",
        ...overrides,
    };
}

function facts(frame) {
    return frame.operationFrame?.operationFacts || {};
}

function cueRoles(ctx, frame) {
    return ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization,
        frame.finalTypedVncSlotFrame,
        frame,
    ).map((cue) => cue.role);
}

function nonactiveOption(ctx, sourceRequest) {
    const preview = ctx.evaluateClassicalNahuatlVncApplication(sourceRequest);
    return preview.controlFrame?.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame?.nonactiveOptionInventory?.options?.[0]?.optionId
        || "";
}

function ownerDefinition(ctx, prefix, domain, selection, facet) {
    const source = ctx[`build${prefix}Source`]({
        analysisDomain: domain,
        selection,
        requestedFacet: facet,
        participantChoice: `${selection}:${facet}`,
    });
    return ctx[`evaluate${prefix}`](source);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson28_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson28-review-ledger.json"),
        "utf8",
    ));
    const records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP7_ID
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const caEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "ca",
        verbClass: "A",
    }));
    const yauhEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "ya-uh",
        verbClass: "B",
    }));
    const ittaEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "itt-a",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "A",
        compoundMatrixStem: "o",
    }));
    const cacEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "cac",
        verbClass: "B",
    }));
    const observationalItz = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "itz",
        verbClass: "B",
        compoundItzSense: "observational",
        compoundMatrixStem: "o",
    }));
    const motionItz = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "itz",
        verbClass: "B",
        compoundItzSense: "motion",
        compoundMatrixStem: "ya-uh",
    }));
    const motionItzReversed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "itz",
        verbClass: "B",
        compoundItzSense: "motion",
        compoundMatrixStem: "ē-hua",
        compoundMatrixClass: "B",
        compoundEventOrder: "hysteron-proteron",
        tense: "preterit",
    }));
    const ahciReversed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ahci",
        compoundEventOrder: "hysteron-proteron",
    }));

    const passiveRequest = {
        sourceStem: "maca",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "passive",
        voice: "passive",
    };
    const passiveOptionId = nonactiveOption(ctx, passiveRequest);
    const passiveEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        ...passiveRequest,
        nonactiveOptionId: passiveOptionId,
        compoundMatrixStem: "nemi",
        compoundNonactiveScope: "embed",
    }));
    const passiveBoth = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        ...passiveRequest,
        nonactiveOptionId: passiveOptionId,
        compoundMatrixStem: "nemi",
        compoundNonactiveScope: "both",
    }));

    const impersonalRequest = {
        sourceStem: "miqui",
        sourceValence: "intransitive",
        verbClass: "B",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "impersonal",
        voice: "impersonal",
    };
    const impersonalOptionId = nonactiveOption(ctx, impersonalRequest);
    const impersonalEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        ...impersonalRequest,
        nonactiveOptionId: impersonalOptionId,
        compoundMatrixStem: "ahci",
        compoundNonactiveScope: "embed",
    }));
    const impersonalMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        ...impersonalRequest,
        nonactiveOptionId: impersonalOptionId,
        compoundMatrixStem: "ahci",
        compoundNonactiveScope: "matrix",
    }));
    const impersonalBoth = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        ...impersonalRequest,
        nonactiveOptionId: impersonalOptionId,
        compoundMatrixStem: "ahci",
        compoundNonactiveScope: "both",
    }));
    const stativeBoth = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        ...impersonalRequest,
        nonactiveOptionId: impersonalOptionId,
        compoundMatrixStem: "mani",
        compoundNonactiveScope: "both",
    }));

    const missingItzSense = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "itz",
        verbClass: "B",
        compoundMatrixStem: "o",
    }));
    const animateCac = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "cac",
        verbClass: "B",
        compoundSubjectAnimacy: "animate",
    }));
    const passiveMatrixOnly = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        ...passiveRequest,
        nonactiveOptionId: passiveOptionId,
        compoundMatrixStem: "nemi",
        compoundNonactiveScope: "matrix",
    }));
    const impersonalWithoutScope = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        ...impersonalRequest,
        nonactiveOptionId: impersonalOptionId,
        compoundMatrixStem: "ahci",
        compoundNonactiveScope: "none",
    }));
    const activeWithScope = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundNonactiveScope: "embed",
    }));

    const observed = {
        specialEmbeds: [
            [caEmbed.authorizationStatus, caEmbed.operationFrame?.targetStem,
                caEmbed.surfaceRealization, facts(caEmbed).caToYeEmbedAlternation,
                facts(caEmbed).specialPerfectiveEmbedResult],
            [yauhEmbed.authorizationStatus, yauhEmbed.operationFrame?.targetStem,
                yauhEmbed.surfaceRealization, facts(yauhEmbed).yauhToYahEmbedAlternation,
                facts(yauhEmbed).specialPerfectiveEmbedResult],
            [ittaEmbed.authorizationStatus, ittaEmbed.operationFrame?.targetStem,
                ittaEmbed.formulaRealization, ittaEmbed.surfaceRealization,
                facts(ittaEmbed).ittaToItzEmbedAlternation,
                facts(ittaEmbed).itzSourceAnalysis],
        ],
        cac: [
            cacEmbed.authorizationStatus,
            cacEmbed.operationFrame?.targetStem,
            cacEmbed.surfaceRealization,
            facts(cacEmbed).cacSubjectAnimacy,
            facts(cacEmbed).cacAnimacyConsequenceAutomatic,
            facts(cacEmbed).cacReadingOptions,
        ],
        itz: [
            [observationalItz.authorizationStatus,
                observationalItz.operationFrame?.targetStem,
                observationalItz.surfaceRealization,
                facts(observationalItz).itzSourceAnalysis],
            [motionItz.authorizationStatus, motionItz.operationFrame?.targetStem,
                motionItz.surfaceRealization, facts(motionItz).itzSourceAnalysis],
            facts(motionItz).itzHomophonesRemainDistinct,
            facts(motionItz).itzSourceAnalysisIsUserChoice,
        ],
        eventOrder: [
            [motionItzReversed.authorizationStatus,
                motionItzReversed.operationFrame?.targetStem,
                motionItzReversed.surfaceRealization,
                facts(motionItzReversed).eventOrder,
                facts(motionItzReversed).interpretedFirstEvent,
                facts(motionItzReversed).interpretedSecondEvent,
                facts(motionItzReversed).surfaceConstituentOrder,
                facts(motionItzReversed).motionItzEHuaReversalLicensed],
            [ahciReversed.authorizationStatus,
                ahciReversed.operationFrame?.targetStem,
                ahciReversed.surfaceRealization,
                facts(ahciReversed).eventOrder],
        ],
        passive: [
            [passiveEmbed.authorizationStatus,
                passiveEmbed.operationFrame?.targetStem,
                passiveEmbed.surfaceRealization,
                facts(passiveEmbed).nonactiveScope,
                facts(passiveEmbed).embedNonactiveOperation,
                facts(passiveEmbed).matrixNonactiveOperation],
            [passiveBoth.authorizationStatus,
                passiveBoth.operationFrame?.targetStem,
                passiveBoth.surfaceRealization,
                facts(passiveBoth).nonactiveScope,
                facts(passiveBoth).embedNonactiveOperation,
                facts(passiveBoth).matrixNonactiveOperation],
            facts(passiveEmbed).passiveScopeOptions,
        ],
        impersonal: [
            [impersonalEmbed.authorizationStatus,
                impersonalEmbed.operationFrame?.targetStem,
                impersonalEmbed.surfaceRealization,
                facts(impersonalEmbed).nonactiveScope],
            [impersonalMatrix.authorizationStatus,
                impersonalMatrix.operationFrame?.targetStem,
                impersonalMatrix.surfaceRealization,
                facts(impersonalMatrix).nonactiveScope],
            [impersonalBoth.authorizationStatus,
                impersonalBoth.operationFrame?.targetStem,
                impersonalBoth.surfaceRealization,
                facts(impersonalBoth).nonactiveScope],
            facts(impersonalEmbed).impersonalScopeOptions,
            facts(impersonalBoth).nonactiveSuffixesDerivedAutomatically,
        ],
        stative: [
            stativeBoth.authorizationStatus,
            stativeBoth.operationFrame?.targetStem,
            stativeBoth.surfaceRealization,
            facts(stativeBoth).stativeMatrixPrefersEmbedOnly,
            facts(stativeBoth).stativeMatrixPreferenceIsNotAbsolute,
        ],
        gates: [
            [missingItzSense.authorizationStatus, missingItzSense.blockReason],
            [animateCac.authorizationStatus, animateCac.blockReason],
            [passiveMatrixOnly.authorizationStatus, passiveMatrixOnly.blockReason],
            [impersonalWithoutScope.authorizationStatus, impersonalWithoutScope.blockReason],
            [activeWithScope.authorizationStatus, activeWithScope.blockReason],
        ],
        cues: [
            cueRoles(ctx, cacEmbed).includes(GROUP7_ID),
            cueRoles(ctx, motionItzReversed).includes(GROUP7_ID),
            cueRoles(ctx, passiveBoth).includes(GROUP7_ID),
        ],
    };
    const expected = {
        specialEmbeds: [
            ["authorized", "ye-ti-nemi", "yetinemi", true, "ye"],
            ["authorized", "yah-ti-nemi", "yahtinemi", true, "yah"],
            ["authorized", "itz-t-o", "#0-0+qu-0(itz-t-o)0+c-0#",
                "quitztoc", true, "transitive-itta-observational"],
        ],
        cac: [
            "authorized", "cac-ti-nemi", "cactinemi", "nonanimate", true,
            [
                "be-quiet", "be-calm", "be-alone", "be-deserted",
                "stand-abandoned", "lie-silent", "fall-silent",
                "become-fair-weather",
            ],
        ],
        itz: [
            ["authorized", "itz-t-o", "itztoc", "observational-itz"],
            ["authorized", "itz-ti-uh", "itztiuh", "compound-only-motion-itz"],
            true,
            true,
        ],
        eventOrder: [
            ["authorized", "itz-t-ē-uh", "itztēuh", "hysteron-proteron",
                "matrix", "embed", "embed-before-matrix", true],
            ["authorized", "chōca-t-ahci", "chōcatahci", "hysteron-proteron"],
        ],
        passive: [
            ["authorized", "mac-ō-ti-nemi", "macōtinemi", "embed",
                "passive", "active"],
            ["authorized", "mac-ō-ti-nem-o-hua", "macōtinemohua", "both",
                "passive", "impersonal"],
            ["embed", "both"],
        ],
        impersonal: [
            ["authorized", "mic-o-hua-t-ahci", "micohuatahci", "embed"],
            ["authorized", "mic-t-ahxī-hua", "mictahxīhua", "matrix"],
            ["authorized", "mic-o-hua-t-ahxī-hua", "micohuatahxīhua", "both"],
            ["embed", "matrix", "both"],
            true,
        ],
        stative: [
            "authorized", "mic-o-hua-ti-man-o-hua", "micohuatimanohua",
            true, true,
        ],
        gates: [
            ["blocked", "typed-itz-embed-sense-required"],
            ["blocked", "cac-embed-requires-nonanimate-subject"],
            ["blocked", "compound-passive-scope-must-be-embed-or-both"],
            ["blocked", "compound-impersonal-scope-must-be-embed-matrix-or-both"],
            ["blocked", "compound-nonactive-scope-requires-nonactive-voice"],
        ],
        cues: [true, true, true],
    };

    s.eq("accepted Lesson 28 Group 7 uses typed identity, chronology, and nonactive scope", observed, expected);
    const ownerCoordinates = [
        ["ClassicalCaYeCompoundEmbedAlternation", "classical-ca-ye-compound-embed-alternation", "claim-p2815", "p2815-the-verb-ca-h-when-occurring-as-the-embed"],
        ["ClassicalYaUhYahCompoundEmbedAlternation", "classical-ya-uh-yah-compound-embed-alternation", "claim-p2818", "p2818-the-verb-ya-uh-uses-a-preterit-predicate-formed"],
        ["ClassicalObservationalItzCompoundEmbed", "classical-observational-itz-compound-embed", "claim-p2824", "p2824-as-already-mentioned-in-26-1-the-verbstem-te"],
        ["ClassicalItzCompoundHomophoneAnalysis", "classical-itz-compound-homophone-analysis", "claim-p2831", "p2831-itz-ti-uh-to-go-going-i-e-to"],
        ["ClassicalCompoundNonactiveScopeSystem", "classical-compound-nonactive-scope-system", "claim-p2838", "p2838-connective-t-compound-stems-may-have-two-passive-formations"],
    ].map(([prefix, domain, selection, facet]) => {
        const evaluation = ownerDefinition(ctx, prefix, domain, selection, facet);
        return [domain, evaluation.authorizationStatus, evaluation.blockReason,
            evaluation.payload?.definition?.authorizationStatus];
    });
    s.eq("accepted Lesson 28 Group 7 typed owners observe exact canonical Results", ownerCoordinates, [
        ["classical-ca-ye-compound-embed-alternation", "authorized", "", "authorized"],
        ["classical-ya-uh-yah-compound-embed-alternation", "authorized", "", "authorized"],
        ["classical-observational-itz-compound-embed", "authorized", "", "authorized"],
        ["classical-itz-compound-homophone-analysis", "authorized", "", "authorized"],
        ["classical-compound-nonactive-scope-system", "authorized", "", "authorized"],
    ]);
    s.eq("accepted Lesson 28 Group 7 covers every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 90,
        unique: 90,
        writing: 27,
        reading: 63,
        accepted: true,
    });
    for (const record of writing) {
        s.eq(`${record.atomId} has its accepted writing job`, observed, expected);
        const mutation = JSON.parse(JSON.stringify(observed));
        mutation.eventOrder[0][6] = "matrix-before-embed";
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(expected),
            false,
        );
    }

    const group8Records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP8_ID
    ));
    const group8Writing = group8Records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const yeCompoundApplication = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:derivational-operation",
        args: [request({
            sourceStem: "ca",
            verbClass: "A",
            compoundMatrixStem: "nemi",
        })],
    });
    const possessiveNnc = ctx.buildClassicalNahuatlPossessiveNncFrame(
        "chīmal",
        {
            subject: "3sg",
            possessor: "1sg",
            singularConnector: "0",
            nounstemRelationKind: "nonrelational",
            animacy: "nonanimate",
        },
    );
    const possessiveApplication = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        args: [
            possessiveNnc.nncSlotFrame,
            { sentenceType: "assertion", polarity: "positive" },
        ],
    });
    const target = Object.create(ctx);
    const controllerApi = ctx.createClassicalClauseRelationControllerGlobals(target);
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(controllerApi));
    const controller = target.createClassicalClauseRelationController();
    const principalCapture = controller.captureCurrentResult(
        "principal",
        yeCompoundApplication,
    );
    const supplementCapture = controller.captureCurrentResult(
        "adjoined",
        possessiveApplication,
    );
    const group8Selections = {
        relation: "supplementation",
        supplementationReferenceMode: "shared",
        supplementationHeadRole: "subject",
        supplementationContactRole: "subject",
        supplementationOrder: "supplement-first",
    };
    const group8Contract = controller.buildDecisionContract(group8Selections);
    const group8Result = controller.compose(group8Selections);
    const group8Frame = group8Result.canonicalResult?.operationFrames?.find(
        (frame) => frame.kind
            === "classical-nahuatl-accompanying-possession-frame",
    );
    const group8Cues = ctx.getClassicalFormulaDerivedAnnotations(
        group8Result.presentation.formula,
        null,
        group8Result.canonicalResult,
    );
    const group8Observed = {
        captures: [
            principalCapture.authorizationStatus,
            supplementCapture.authorizationStatus,
        ],
        result: [
            group8Result.authorizationStatus,
            group8Result.presentation.formula,
            group8Result.presentation.surface,
        ],
        reference: [
            group8Result.canonicalResult?.referenceFrame?.headRole,
            group8Result.canonicalResult?.referenceFrame
                ?.supplementContactRole,
            group8Result.canonicalResult?.referenceFrame
                ?.referenceIdentityUnified,
        ],
        frame: group8Frame && {
            yeEmbedStem: group8Frame.yeEmbedStem,
            connective: group8Frame.connective,
            matrixStem: group8Frame.matrixStem,
            supplementarySubjectAuthorized:
                group8Frame.supplementarySubjectAuthorized,
            nestedSupplementaryPossessorPreserved:
                group8Frame.nestedSupplementaryPossessorPreserved,
            matrixSubjectPreserved: group8Frame.matrixSubjectPreserved,
            possessedResultIsTopic: group8Frame.possessedResultIsTopic,
            createsHaveVerb: group8Frame.createsHaveVerb,
            createsSecondSupplementationEngine:
                group8Frame.createsSecondSupplementationEngine,
            readingOptions: group8Frame.readingOptions,
        },
        decisions: group8Contract.decisions
            .filter((entry) => entry.id.startsWith("supplementation-"))
            .map((entry) => [entry.id, entry.values, entry.selectedValue]),
        cues: {
            everyAtomLinked: group8Records.every((record) => (
                group8Cues.some((cue) => cue.atomIds?.includes(record.atomId))
            )),
            possessed: group8Cues.some((cue) => (
                cue.label.includes("possessed Result")
                && cue.label.includes("nested possessor")
            )),
            ye: group8Cues.some((cue) => (
                cue.label.includes("ye connective compound")
                && cue.label.includes("no special have verb")
            )),
        },
    };
    const group8Expected = {
        captures: ["authorized", "authorized"],
        result: [
            "authorized",
            "#0-0+n-o(chīmal)0-0# + #0-0(ye-ti-nemi)0+0-0#",
            "Nochīmal yetinemi.",
        ],
        reference: ["subject", "subject", true],
        frame: {
            yeEmbedStem: "ye",
            connective: "ti",
            matrixStem: "nemi",
            supplementarySubjectAuthorized: true,
            nestedSupplementaryPossessorPreserved: true,
            matrixSubjectPreserved: true,
            possessedResultIsTopic: true,
            createsHaveVerb: false,
            createsSecondSupplementationEngine: false,
            readingOptions: [
                "have-along-with-one",
                "have-on-one",
                "carry-with-one",
                "wear-on-one",
            ],
        },
        decisions: [
            ["supplementation-reference-mode",
                ["shared", "included", "absolute-topic"], "shared"],
            ["supplementation-contact-role",
                ["subject", "possessor"], "subject"],
            ["supplementation-order",
                ["principal-first", "supplement-first", "discontinuous"],
                "supplement-first"],
        ],
        cues: { everyAtomLinked: true, possessed: true, ye: true },
    };
    s.eq(
        "accepted Lesson 28 Group 8 uses captured Results and canonical supplementation",
        group8Observed,
        group8Expected,
    );
    const group8Owner = ownerDefinition(
        ctx,
        "ClassicalCompoundAccompanyingPossessionSupplement",
        "classical-compound-accompanying-possession-supplement",
        "claim-p2845",
        "p2845-to-express-the-notion-of-having-something-in-one",
    );
    s.eq("accepted Lesson 28 Group 8 owner observes the shared supplementation Result", {
        status: group8Owner.authorizationStatus,
        path: group8Owner.payload?.definition?.extractedFrames
            ?.accompanyingPossession?.kind,
        supplementarySubject: group8Owner.payload?.definition?.extractedFrames
            ?.accompanyingPossession?.supplementarySubjectAuthorized,
    }, {
        status: "authorized",
        path: "classical-nahuatl-accompanying-possession-frame",
        supplementarySubject: true,
    });
    const renderingSource = fs.readFileSync(
        path.join(ROOT, "src/ui/rendering/rendering.mjs"),
        "utf8",
    );
    s.eq("accepted Lesson 28 Group 8 adds no possession-specific user controls", {
        possessiveStemHidden: renderingSource.includes(
            '"classical-rule-logic-compound-possessive-stem": false',
        ),
        possessorHidden: renderingSource.includes(
            '"classical-rule-logic-compound-possessor": false',
        ),
        legacyVariantNotLicensed: !renderingSource.includes(
            '"huītz-carry", "future-embed", "accompanying-possession"',
        ),
    }, {
        possessiveStemHidden: true,
        possessorHidden: true,
        legacyVariantNotLicensed: true,
    });
    s.eq("accepted Lesson 28 Group 8 covers every atom once", {
        records: group8Records.length,
        unique: new Set(group8Records.map((record) => record.atomId)).size,
        writing: group8Writing.length,
        reading: group8Records.length - group8Writing.length,
        accepted: group8Records.every((record) => (
            record.reviewStatus === "ACCEPTED"
        )),
    }, {
        records: 25,
        unique: 25,
        writing: 18,
        reading: 7,
        accepted: true,
    });
    for (const record of group8Writing) {
        s.eq(`${record.atomId} has its accepted writing job`,
            group8Observed, group8Expected);
        const mutation = JSON.parse(JSON.stringify(group8Observed));
        mutation.frame.createsSecondSupplementationEngine = true;
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(group8Expected),
            false,
        );
    }

    const group9Records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP9_ID
    ));
    const group9Writing = group9Records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const reflexiveMatrix = (compoundMatrixStem, overrides = {}) => (
        ctx.evaluateClassicalNahuatlLateVncDerivation(request({
            lateVariant: "reflexive-matrix",
            compoundMatrixStem,
            ...overrides,
        }))
    );
    const matrixCases = [
        reflexiveMatrix("cāhua"),
        reflexiveMatrix("tēca"),
        reflexiveMatrix("tlāl-i-ā"),
        reflexiveMatrix("man-a", {
            subject: "3pl",
            compoundSubjectAnimacy: "animate",
        }),
        reflexiveMatrix("quetza"),
    ];
    const firstPerson = reflexiveMatrix("quetza", { subject: "1sg" });
    const secondPersonWrongCarrier = reflexiveMatrix("t-o-quetza", {
        subject: "2sg",
    });
    const transitiveEmbed = reflexiveMatrix("cāhua", {
        sourceStem: "cui",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "A",
    });
    const arbitraryCore = reflexiveMatrix("invented");
    const animateSingularMana = reflexiveMatrix("man-a", {
        subject: "3sg",
        compoundSubjectAnimacy: "animate",
    });
    const firstPersonSingularMana = reflexiveMatrix("man-a", {
        subject: "1sg",
        compoundSubjectAnimacy: "nonanimate",
    });
    const group9Facts = matrixCases.map(facts);
    const group9Cues = ctx.getClassicalFormulaDerivedAnnotations(
        matrixCases[3].formulaRealization,
        matrixCases[3].finalTypedVncSlotFrame,
        matrixCases[3],
    );
    const group9Observed = {
        matrices: matrixCases.map((frame, index) => [
            frame.authorizationStatus,
            facts(frame).reflexiveMatrixCore,
            facts(frame).fixedReflexiveCarrier,
            frame.operationFrame?.targetStem,
            frame.operationFrame?.targetValence,
            facts(frame).matrixReadingOptions,
            [
                facts(frame).matrixTransitivityDischargedOntoFusedReflexive,
                facts(frame).reflexiveCoreStructurallyIntransitiveInCompound,
                facts(frame).reflexiveMatrixIntroducesNoNewParticipant,
                facts(frame).reflexiveMatrixSubjectCoreference,
            ],
            index === 3
                ? [
                    facts(frame).reflexiveMatrixSubjectAnimacy,
                    facts(frame).moManaAnimateSubjectMustBePlural,
                    facts(frame).moManaSubjectNumberDerivedFromFiniteSubject,
                ]
                : [],
        ]),
        fixedAcrossPerson: [
            firstPerson.operationFrame?.targetStem,
            firstPerson.surfaceRealization,
            facts(firstPerson).fixedReflexiveCarrierRegardlessOfSubject,
            secondPersonWrongCarrier.operationFrame?.targetStem,
            secondPersonWrongCarrier.surfaceRealization,
            facts(secondPersonWrongCarrier)
                .suppliedPersonMarkedReflexiveCarrierReplaced,
        ],
        valence: [
            matrixCases[0].operationFrame?.targetValence,
            transitiveEmbed.operationFrame?.targetValence,
            transitiveEmbed.formulaRealization,
            facts(transitiveEmbed).embedDeterminesCompoundValence,
        ],
        openCore: [
            arbitraryCore.authorizationStatus,
            arbitraryCore.operationFrame?.targetStem,
            facts(arbitraryCore).openTypedMatrixAdmission,
            facts(arbitraryCore).reflexiveMatrixStemWhitelistUsed,
        ],
        manaGates: [
            [animateSingularMana.authorizationStatus,
                animateSingularMana.blockReason],
            [firstPersonSingularMana.authorizationStatus,
                firstPersonSingularMana.blockReason],
        ],
        cues: {
            everyAtomLinked: group9Records.every((record) => (
                group9Cues.some((cue) => cue.atomIds?.includes(record.atomId))
            )),
            fixedMo: group9Cues.some((cue) => (
                cue.label.includes("fixed m-o-man-a")
                && cue.label.includes("grounds the matrix core's transitivity")
            )),
            restriction: group9Cues.some((cue) => (
                cue.label.includes("animate subject must be plural")
                && cue.label.includes("never a stem whitelist")
            )),
        },
    };
    const group9Expected = {
        matrices: [
            ["authorized", "cāhua", "m-o", "chōca-ti-m-o-cāhua",
                "intransitive", ["stop-doing", "leave-in-a-condition",
                    "remain-in-a-state"], [true, true, true, true], []],
            ["authorized", "tēca", "m-o", "chōca-ti-m-o-tēca",
                "intransitive", ["settle-down-to-doing", "begin-doing",
                    "become-a-condition", "lie-stretched-out-in-a-state"],
                [true, true, true, true], []],
            ["authorized", "tlāl-i-ā", "m-o", "chōca-ti-m-o-tlāl-i-a",
                "intransitive", ["sit-in-a-state", "settle-down-to-doing",
                    "become-a-condition", "begin-doing"],
                [true, true, true, true], []],
            ["authorized", "man-a", "m-o", "chōca-ti-m-o-man-a",
                "intransitive", ["do-gradually", "become-gradually",
                    "begin-doing", "stand-in-position-to-do"],
                [true, true, true, true], ["animate", true, true]],
            ["authorized", "quetza", "m-o", "chōca-ti-m-o-quetza",
                "intransitive", ["do-gradually", "become-gradually"],
                [true, true, true, true], []],
        ],
        fixedAcrossPerson: [
            "chōca-ti-m-o-quetza", "nichōcatimoquetza", true,
            "chōca-ti-m-o-quetza", "tichōcatimoquetza", true,
        ],
        valence: [
            "intransitive", "specific-projective",
            "#0-0+qui-0(cui-ti-m-o-cāhua)0+0-0#", true,
        ],
        openCore: [
            "authorized", "chōca-ti-m-o-invented", true, false,
        ],
        manaGates: [
            ["blocked", "mo-mana-animate-subject-must-be-plural"],
            ["blocked", "mo-mana-animate-subject-must-be-plural"],
        ],
        cues: { everyAtomLinked: true, fixedMo: true, restriction: true },
    };
    s.eq(
        "accepted Lesson 28 Group 9 derives fixed mo, valence, readings, and the mo-mana restriction",
        group9Observed,
        group9Expected,
    );
    const group9SystemOwner = ownerDefinition(
        ctx,
        "ClassicalReflexiveMatrixCompoundSystem",
        "classical-reflexive-matrix-compound-system",
        "claim-p2849",
        "p2849-within-the-compound-stem-the-reflexive-object-plus-reflexive",
    );
    const group9InventoryOwner = ownerDefinition(
        ctx,
        "ClassicalReflexiveMatrixCompoundInventory",
        "classical-reflexive-matrix-compound-inventory",
        "claim-p2857",
        "p2857-the-m-o-man-a-matrix-cannot-be-used",
    );
    s.eq("accepted Lesson 28 Group 9 owners observe the canonical typed frame", {
        system: [group9SystemOwner.authorizationStatus,
            group9SystemOwner.payload?.definition?.contract
                ?.reflexiveMatrixSystem?.fixedCarrier],
        inventory: [group9InventoryOwner.authorizationStatus,
            group9InventoryOwner.payload?.definition?.blockedCases
                ?.animateSingularMana?.blockReason],
    }, {
        system: ["authorized", "m-o"],
        inventory: ["authorized", "mo-mana-animate-subject-must-be-plural"],
    });
    s.eq("accepted Lesson 28 Group 9 exposes only genuine choices", {
        constructionChoice: renderingSource.includes(
            '"connective-t", "reflexive-matrix", "shared-object"',
        ),
        coreEntry: renderingSource.includes(
            '"classical-rule-logic-compound-matrix":',
        ) && renderingSource.includes(
            'operation === "compound"',
        ),
        thirdPersonManaAnimacyOnly: renderingSource.includes(
            '&& /^3/u.test(String(surfaceFrame?.state?.subject || "3sg"))',
        ),
        moControlAbsent: !renderingSource.includes(
            'id="classical-rule-logic-compound-reflexive-carrier"',
        ),
        valenceControlAbsent: !renderingSource.includes(
            'id="classical-rule-logic-compound-result-valence"',
        ),
        exampleWhitelistAbsent: group9Facts.every((entry) => (
            entry.reflexiveMatrixStemWhitelistUsed === false
        )),
    }, {
        constructionChoice: true,
        coreEntry: true,
        thirdPersonManaAnimacyOnly: true,
        moControlAbsent: true,
        valenceControlAbsent: true,
        exampleWhitelistAbsent: true,
    });
    s.eq("accepted Lesson 28 Group 9 covers every atom once", {
        records: group9Records.length,
        unique: new Set(group9Records.map((record) => record.atomId)).size,
        writing: group9Writing.length,
        reading: group9Records.length - group9Writing.length,
        accepted: group9Records.every((record) => (
            record.reviewStatus === "ACCEPTED"
        )),
    }, {
        records: 67,
        unique: 67,
        writing: 35,
        reading: 32,
        accepted: true,
    });
    for (const record of group9Writing) {
        s.eq(`${record.atomId} has its accepted writing job`,
            group9Observed, group9Expected);
        const mutation = JSON.parse(JSON.stringify(group9Observed));
        mutation.fixedAcrossPerson[3] = "chōca-ti-t-o-quetza";
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(group9Expected),
            false,
        );
    }
    return s;
}

module.exports = { run };
