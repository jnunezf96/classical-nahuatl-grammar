"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-characteristic-adventitious-possession";

function preteritAgentive(ctx, stem = "tōna", verbClass = "A") {
    const vnc = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: stem,
        verbClass,
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "preterit",
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
    const capture =
        ctx.captureClassicalNahuatlPreteritVncResultForNominalization(
            vnc.resultFrame
        );
    const nnc = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        canonicalVncResult: vnc.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    return { vnc, capture, nnc };
}

function characteristic(ctx, canonicalNncResult, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...fields,
    });
}

function characteristicApplication(ctx, canonicalNncResult, fields = {}) {
    return ctx.requestClassicalDeverbalNncResult({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...fields,
    });
}

function ordinaryResult(ctx, stem, sourceClass = "") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
        ...(sourceClass ? { sourceClass } : {}),
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject: "3common",
            humanness: "nonhuman",
            predicateFormation: "source-stem",
            stemFormation: "plain",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.evaluateClassicalNahuatlOrdinaryNnc(source, operation);
}

function makeController(ctx) {
    const target = Object.create(ctx);
    const api = ctx.createClassicalClauseRelationControllerGlobals(target);
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
    return target.createClassicalClauseRelationController();
}

function compose(ctx, principal, supplement) {
    const controller = makeController(ctx);
    controller.captureCurrentResult("principal", principal);
    controller.captureCurrentResult("adjoined", supplement);
    return controller.compose({
        relation: "supplementation",
        supplementationReferenceMode: "shared",
        supplementationContactRole: "subject",
        supplementationHeadRole: "subject",
        supplementationOrder: "principal-first",
    });
}

function frameOf(result) {
    return result.operationFrame?.characteristicPreteritAgentiveFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson39-review-ledger.json"
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
    }, { atoms: 19, writing: 12, reading: 7, accepted: true });

    const source = preteritAgentive(ctx);
    const maize = characteristic(ctx, source.nnc.canonicalResult);
    const frame = frameOf(maize);
    s.eq("the characteristic compound captures the typed preterit-agentive chain", {
        vnc: source.vnc.authorizationStatus,
        capture: [source.capture.authorizationStatus,
            source.capture.sourceStem, source.capture.sourceVoice,
            source.capture.sourceVoiceOperation,
            source.capture.inherentImpersonalAnalysisPreserved],
        agentive: source.nnc.authorizationStatus,
        agentiveReason: source.nnc.blockReason,
        characteristic: maize.authorizationStatus,
        characteristicReason: maize.blockReason,
        exact: frame?.canonicalNncResult === source.nnc.canonicalResult,
        sourceExact:
            frame?.canonicalPredicateNominalizationSourceFrame
                === source.nnc.sourceFrame,
        operationExact:
            frame?.canonicalPredicateNominalizationOperationFrame
                === source.nnc.operationFrame,
        embedKind: frame?.embeddedNounstemKind,
        restricted: frame?.embeddedRestrictedUseStem,
        general: frame?.embeddedGeneralUseStem,
        matrix: frame?.matrixNounstem,
        target: frame?.targetStem,
        formula: maize.formulaRealization,
    }, {
        vnc: "authorized",
        capture: ["authorized", "tōna", "impersonal",
            "inherent-impersonal", true],
        agentive: "authorized",
        agentiveReason: "",
        characteristic: "authorized",
        characteristicReason: "",
        exact: true,
        sourceExact: true,
        operationExact: true,
        embedKind: "general-use-preterit-agentive",
        restricted: "tōna-0",
        general: "tōna-0-cā",
        matrix: "yō",
        target: "tōna-0-cā-yō",
        formula: "#0-0(tōna-0-cā-yō)tl-0#",
    });

    const possessive = characteristic(ctx, source.nnc.canonicalResult, {
        state: "possessive",
        possessor: "3sg",
    });
    s.eq("absolutive and possessive outer states remain distinct", {
        absolutive: [frame?.resultState,
            frame?.absolutiveStatePreservesTlConnector,
            maize.formulaRealization],
        possessive: [frameOf(possessive)?.resultState,
            frameOf(possessive)?.possessiveStateUsesGeneralUseYo,
            possessive.formulaRealization],
        options: frame?.resultStateOptions,
        choice: frame?.stateChoiceIsGenuineUserChoice,
    }, {
        absolutive: ["absolutive", true,
            "#0-0(tōna-0-cā-yō)tl-0#"],
        possessive: ["possessive", true,
            "#0-0+ī-0(tōna-0-cā-yo)0-0#"],
        options: ["absolutive", "possessive"],
        choice: true,
    });

    const falsePossession = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "organic-possession",
        canonicalNncResult: source.nnc.canonicalResult,
        subject: "3common",
        state: "possessive",
        possessor: "1pl",
        animacy: "nonanimate",
    });
    s.eq("the typed agentive embed cannot be reanalyzed as possession", {
        status: falsePossession.authorizationStatus,
        reason: falsePossession.blockReason,
        adventitious: frame?.adventitiousPossessionAnalysisApplies,
        organic: frame?.organicPossessionAnalysisApplies,
        flesh: frame?.nacaFleshEmbedAnalysisApplies,
        possessorPrefix: frame?.initialTōIsPossessorPronoun,
        verbalSource: frame?.initialTōBelongsToTypedVerbstem,
        spellingAuthority: frame?.spellingAloneAuthorizesPossessionReanalysis,
    }, {
        status: "blocked",
        reason: "39.3.5-preterit-agentive-characteristic-is-not-possession",
        adventitious: false,
        organic: false,
        flesh: false,
        possessorPrefix: false,
        verbalSource: true,
        spellingAuthority: false,
    });

    s.eq("the tōna readings are narrow facts and never a route whitelist", {
        compositional: frame?.compositionalReadings,
        lexical: frame?.lexicalReadings,
        narrow: frame?.lexicalReadingsAreNarrowReadingFactsOnly,
        factGate: frame?.lexicalFactAuthorizesProductiveRoute,
        exampleGate: frame?.exampleIdentityAuthorizesProductiveRoute,
    }, {
        compositional: [
            "characteristic-of-the-thing-that-shines-warmingly",
            "thing-characteristic-of-sun-warmth",
        ],
        lexical: ["agricultural-produce", "sustenance", "maize"],
        narrow: true,
        factGate: false,
        exampleGate: false,
    });

    const unlistedSource = preteritAgentive(ctx, "zom", "B");
    const unlisted = characteristic(ctx, unlistedSource.nnc.canonicalResult);
    s.eq("a compatible unlisted preterit-agentive Source remains productive", {
        status: unlisted.authorizationStatus,
        general: frameOf(unlisted)?.embeddedGeneralUseStem,
        target: frameOf(unlisted)?.targetStem,
        lexical: frameOf(unlisted)?.lexicalReadings,
        productive:
            frameOf(unlisted)
                ?.compatibleUnlistedPreteritAgentiveSourcesRemainProductive,
    }, {
        status: "authorized",
        general: "zon-0-cā",
        target: "zon-0-cā-yō",
        lexical: [],
        productive: true,
    });

    const ordinaryNaca = characteristic(ctx,
        ordinaryResult(ctx, "naca", "tl-1-a"));
    const copied = characteristic(ctx, { ...source.nnc.canonicalResult });
    s.eq("ordinary and copied Sources cannot borrow the typed agentive analysis", {
        ordinaryStatus: ordinaryNaca.authorizationStatus,
        ordinaryFrame: frameOf(ordinaryNaca) || null,
        copiedStatus: copied.authorizationStatus,
        copiedReason: copied.blockReason,
    }, {
        ordinaryStatus: "authorized",
        ordinaryFrame: null,
        copiedStatus: "blocked",
        copiedReason:
            "exact-owner-issued-ordinary-nnc-result-required-for-characteristic-patientive",
    });

    const bone = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "organic-possession",
        canonicalNncResult: ordinaryResult(ctx, "omi", "zero"),
        subject: "3common",
        state: "possessive",
        possessor: "1pl",
        animacy: "nonanimate",
    });
    const maizeApplication = characteristicApplication(
        ctx,
        source.nnc
    );
    const boneApplication = ctx.requestClassicalDeverbalNncResult({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "organic-possession",
        canonicalNncResult: ordinaryResult(ctx, "omi", "zero"),
        subject: "3common",
        state: "possessive",
        possessor: "1pl",
        animacy: "nonanimate",
    });
    const maizePrincipal = compose(
        ctx,
        maizeApplication,
        boneApplication
    );
    const bonePrincipal = compose(
        ctx,
        boneApplication,
        maizeApplication
    );
    s.eq("supplementation owns the genuine principal-clause choice", {
        owner: frame?.supplementationPrincipalChoiceBelongsToClauseRelationOwner,
        options: frame?.supplementationPrincipalOptions,
        maizePrincipal: [maizePrincipal.authorizationStatus,
            maizePrincipal.canonicalResult?.principalClause?.sourceStem,
            maizePrincipal.canonicalResult?.supplementClause?.sourceStem],
        bonePrincipal: [bonePrincipal.authorizationStatus,
            bonePrincipal.canonicalResult?.principalClause?.sourceStem,
            bonePrincipal.canonicalResult?.supplementClause?.sourceStem],
        readings: [frame?.principalFirstReading,
            frame?.supplementFirstReading],
    }, {
        owner: true,
        options: [
            "preterit-agentive-characteristic-nnc",
            "other-nnc",
        ],
        maizePrincipal: ["authorized", "tōna-0-cā-yō", "omi-yo"],
        bonePrincipal: ["authorized", "omi-yo", "tōna-0-cā-yō"],
        readings: [
            "characteristic-nnc-is-predicated-of-the-other-nnc",
            "other-nnc-is-predicated-of-the-characteristic-nnc",
        ],
    });

    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult: source.nnc.canonicalResult,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        outputScope: "paradigm",
        subjects: ["3common"],
        states: ["absolutive", "possessive"],
    });
    const coordinates = ctx.projectClassicalNahuatlParadigmCoordinates(plan);
    s.eq("scalar and paradigm coordinates keep the same typed source chain", {
        plan: [plan.authorizationStatus, plan.coordinateCount],
        coordinates: coordinates.map(coordinate => [
            coordinate.authorizationStatus,
            coordinate.scalarEquivalent,
            frameOf(coordinate.preparedFrame)
                ?.canonicalNncResult === source.nnc.canonicalResult,
        ]),
    }, {
        plan: ["authorized", 2],
        coordinates: Array.from({ length: 2 }, () => [
            "authorized", true, true,
        ]),
    });

    const groupProof = Boolean(
        maize.authorizationStatus === "authorized"
        && frame?.embeddedNounstemKind === "general-use-preterit-agentive"
        && frame?.lexicalFactAuthorizesProductiveRoute === false
        && falsePossession.authorizationStatus === "blocked"
        && unlisted.authorizationStatus === "authorized"
        && maizePrincipal.authorizationStatus === "authorized"
        && bonePrincipal.authorizationStatus === "authorized"
        && coordinates.every(coordinate => coordinate.scalarEquivalent)
    );
    for (const record of writing) {
        s.ok(record.atomId, groupProof);
        s.ok(`mutation:${record.atomId}`,
            falsePossession.authorizationStatus === "blocked"
            && frameOf(ordinaryNaca) == null
            && copied.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
