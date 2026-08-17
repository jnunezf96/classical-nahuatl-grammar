"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP_ID = "lesson28-ca-nemi-and-yauh-matrices";
const GROUP5_ID = "lesson28-hualla-huitz-ahci-mani-ihca-matrices";
const GROUP6_ID = "lesson28-o-ehua-quiza-huetzi-and-other-matrices";

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
        compoundMatrixStem: "ca",
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
    const s = createSuite("classical_lesson28_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson28-review-ledger.json"),
        "utf8",
    ));
    const records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP_ID
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const caSingular = ctx.evaluateClassicalNahuatlLateVncDerivation(request());
    const caPlural = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        subject: "3pl",
    }));
    const caOptative = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        subject: "2sg",
        mood: "optative",
        tense: "nonpast",
    }));
    const caAdmonitive = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        subject: "2sg",
        mood: "admonitive",
        tense: "nonpast",
    }));
    const nemiPresent = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "nemi",
    }));
    const nemiPreterit = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "nemi",
        subject: "1sg",
        tense: "preterit",
    }));
    const yaSingular = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ya-uh",
        subject: "1sg",
    }));
    const yaPlural = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ya-uh",
        subject: "1pl",
    }));
    const yaFuture = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ya-uh",
        subject: "1sg",
        tense: "future",
    }));
    const yaFutureSyncopated = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ya-uh",
        subject: "1sg",
        tense: "future",
        compoundYaSyncopation: true,
    }));
    const yaPreteritSyncopated = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ya-uh",
        tense: "preterit",
        compoundYaSyncopation: true,
    }));
    const invalidSyncopation = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundYaSyncopation: true,
    }));
    const transitiveEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "maca",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        compoundMatrixStem: "nemi",
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
    const nonactivePreview = ctx.evaluateClassicalNahuatlVncApplication(
        impersonalRequest,
    );
    const nonactiveOptionId = nonactivePreview.controlFrame
        ?.nonactiveOptionInventory?.automaticOptionId
        || nonactivePreview.controlFrame?.nonactiveOptionInventory
            ?.options?.[0]?.optionId
        || "";
    const nonactiveEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation({
        ...impersonalRequest,
        nonactiveOptionId,
        compoundNonactiveScope: "embed",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: "ya-uh",
    });
    const eHuaCa = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "ē-hua",
        subject: "2sg",
    }));
    const arbitraryMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "zamal",
        compoundMatrixClass: "A",
    }));

    const observed = {
        openTypedMatrix: [
            arbitraryMatrix.authorizationStatus,
            facts(arbitraryMatrix).openTypedMatrixAdmission,
            facts(arbitraryMatrix).canvasExamplesAreEvidenceOnly,
        ],
        ca: [
            [caSingular.authorizationStatus, caSingular.operationFrame?.targetStem,
                caSingular.formulaRealization, caSingular.surfaceRealization,
                facts(caSingular).caSuppletiveFiniteStemDerived],
            [caPlural.authorizationStatus, caPlural.operationFrame?.targetStem,
                caPlural.formulaRealization, caPlural.surfaceRealization,
                facts(caPlural).caSuppletiveFiniteStemDerived],
            [caOptative.authorizationStatus, caOptative.operationFrame?.targetStem,
                caOptative.surfaceRealization],
            [caAdmonitive.authorizationStatus,
                caAdmonitive.operationFrame?.targetStem,
                caAdmonitive.surfaceRealization],
            facts(caSingular).matrixReadingOptions,
        ],
        nemi: [
            [nemiPresent.authorizationStatus,
                nemiPresent.operationFrame?.targetStem,
                facts(nemiPresent).matrixConstruction],
            [nemiPreterit.authorizationStatus,
                nemiPreterit.operationFrame?.targetStem,
                nemiPreterit.formulaRealization,
                nemiPreterit.surfaceRealization],
            facts(nemiPresent).matrixReadingOptions,
        ],
        ya: [
            [yaSingular.authorizationStatus, yaSingular.operationFrame?.targetStem,
                yaSingular.formulaRealization, yaSingular.surfaceRealization,
                facts(yaSingular).yaPresentSingularUh],
            [yaPlural.authorizationStatus, yaPlural.operationFrame?.targetStem,
                yaPlural.formulaRealization, yaPlural.surfaceRealization,
                facts(yaPlural).yaPresentPluralHui],
            [yaFuture.authorizationStatus, yaFuture.operationFrame?.targetStem,
                facts(yaFuture).yaUnsyncopatedSequence,
                facts(yaFuture).yaSyncopatedSequence],
            [yaFutureSyncopated.authorizationStatus,
                yaFutureSyncopated.operationFrame?.targetStem,
                yaFutureSyncopated.formulaRealization,
                yaFutureSyncopated.surfaceRealization,
                facts(yaFutureSyncopated).connectiveCondition,
                facts(yaFutureSyncopated).connectiveSupportiveI],
            [yaPreteritSyncopated.authorizationStatus,
                yaPreteritSyncopated.operationFrame?.targetStem,
                facts(yaPreteritSyncopated).yaSyncopatedSequence],
            facts(yaSingular).matrixReadingOptions,
        ],
        syncopationGate: [
            invalidSyncopation.authorizationStatus,
            invalidSyncopation.blockReason,
        ],
        embed: [
            transitiveEmbed.authorizationStatus,
            transitiveEmbed.operationFrame?.targetValence,
            nonactiveEmbed.authorizationStatus,
            facts(nonactiveEmbed).nonactiveScope,
            facts(nonactiveEmbed).embedSourceValence,
        ],
        idiom: [
            eHuaCa.authorizationStatus,
            eHuaCa.operationFrame?.targetStem,
            eHuaCa.surfaceRealization,
            facts(eHuaCa).eHuaCaIdiomaticReadingAvailable,
        ],
        ambiguity: [
            facts(yaSingular).connectiveCausativeStructurallyDistinct,
            facts(yaSingular).traditionalSpellingMayNeutralizeDistinction,
            facts(yaSingular).traditionalSpellingAnalysisChoices,
        ],
        cue: cueRoles(ctx, yaFutureSyncopated).includes(GROUP_ID),
    };
    const expected = {
        openTypedMatrix: ["authorized", true, true],
        ca: [
            ["authorized", "chōca-ti-ca-h", "#0-0(chōca-ti-ca-h)0+⎕-0#", "chōcaticah", "ca-h"],
            ["authorized", "chōca-ti-ca-t", "#0-0(chōca-ti-ca-t)0+⎕-eh#", "chōcaticateh", "ca-t"],
            ["authorized", "chōca-ti-ye", "xichōcatiye"],
            ["authorized", "chōca-ti-ye", "tichōcatiyeh"],
            ["be-in-the-act-of", "remain-engaged-in-begun-event"],
        ],
        nemi: [
            ["authorized", "chōca-ti-nemi", "continuative-nemi"],
            ["authorized", "chōca-ti-nen", "#ni-0(chōca-ti-nen)0+⎕-0#", "nichōcatinen"],
            ["go-along-doing", "spend-time-doing", "continue-doing"],
        ],
        ya: [
            ["authorized", "chōca-ti-uh", "#ni-0(chōca-ti-uh)0+0-0#", "nichōcatiuh", true],
            ["authorized", "chōca-ti-hui", "#ti-0(chōca-ti-hui)0+0-h#", "tichōcatihuih", true],
            ["authorized", "chōca-ti-yā", "ti-yā", "t-ā"],
            ["authorized", "chōca-t-ā", "#ni-0(chōca-t-ā)z+⎕-0#", "nichōcatāz", "optional-ti-ya-syncopation", false],
            ["authorized", "chōca-t-ah", "t-ah"],
            ["go-away-doing", "go-doing", "do-and-leave"],
        ],
        syncopationGate: ["blocked", "syncopated-ta-requires-ya-matrix-shape"],
        embed: ["authorized", "specific-projective", "authorized", "embed", "intransitive"],
        idiom: ["authorized", "ē-hua-ti-ca-h", "tēhuaticah", true],
        ambiguity: [true, true, ["connective-t", "causative"]],
        cue: true,
    };

    s.eq("accepted Lesson 28 Group 4 uses the canonical typed compound path", observed, expected);
    s.eq("accepted Lesson 28 Group 4 covers every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 108,
        unique: 108,
        writing: 58,
        reading: 50,
        accepted: true,
    });
    for (const record of writing) {
        s.eq(`${record.atomId} has its accepted writing job`, observed, expected);
        const mutation = JSON.parse(JSON.stringify(observed));
        mutation.ya[0][4] = false;
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(expected),
            false,
        );
    }

    const group5Records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP5_ID
    ));
    const group5Writing = group5Records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const huallaPresent = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "huāl-la-uh",
    }));
    const huallaPreterit = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "huāl-la-uh",
        tense: "preterit",
    }));
    const huitzPreteritAsPresent = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "huī-tz",
        subject: "3pl",
        tense: "preterit-as-present",
    }));
    const ahciPreterit = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ahci",
        subject: "1sg",
        tense: "preterit",
    }));
    const maniDistantPast = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "mani",
        tense: "distant-past-as-past",
    }));
    const ihcaPreteritAsPresent = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ihca",
        subject: "1sg",
        tense: "preterit-as-present",
    }));
    const ihcaDistantPast = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ihca",
        subject: "1pl",
        tense: "distant-past-as-past",
    }));
    const huicaCarry = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "huīca",
        sourceValence: "tla",
        objectKind: "nonspecific-nonhuman",
        verbClass: "A",
        lateVariant: "huītz-carry",
        compoundMatrixStem: "huī-tz",
        subject: "3pl",
        tense: "preterit-as-present",
    }));
    const itquiCarry = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "itqui",
        sourceValence: "tla",
        objectKind: "nonspecific-nonhuman",
        verbClass: "A",
        lateVariant: "huītz-carry",
        compoundMatrixStem: "huī-tz",
        subject: "1sg",
        tense: "distant-past-as-past",
    }));
    const openCarry = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "zamal",
        sourceValence: "tla",
        objectKind: "nonspecific-nonhuman",
        verbClass: "A",
        lateVariant: "huītz-carry",
        compoundMatrixStem: "huī-tz",
    }));
    const ordinaryHuica = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "huīca",
        sourceValence: "tla",
        objectKind: "nonspecific-nonhuman",
        verbClass: "A",
        compoundMatrixStem: "huī-tz",
    }));
    const carryWithoutObject = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "zamal",
        lateVariant: "huītz-carry",
        compoundMatrixStem: "huī-tz",
    }));
    const carryWithoutHuītz = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "zamal",
        sourceValence: "tla",
        objectKind: "nonspecific-nonhuman",
        lateVariant: "huītz-carry",
        compoundMatrixStem: "nemi",
    }));
    const group5Observed = {
        hualla: [
            [huallaPresent.authorizationStatus,
                huallaPresent.operationFrame?.targetStem,
                huallaPresent.surfaceRealization,
                facts(huallaPresent).hualDirectionalRetained,
                facts(huallaPresent).retainedMatrixDirectional],
            [huallaPreterit.authorizationStatus,
                huallaPreterit.operationFrame?.targetStem,
                huallaPreterit.surfaceRealization],
            facts(huallaPresent).matrixReadingOptions,
        ],
        huitz: [
            huitzPreteritAsPresent.authorizationStatus,
            huitzPreteritAsPresent.operationFrame?.targetStem,
            huitzPreteritAsPresent.formulaRealization,
            huitzPreteritAsPresent.surfaceRealization,
            facts(huitzPreteritAsPresent).ordinaryHuītzConnectiveSelected,
            facts(huitzPreteritAsPresent).embedFiniteCoordinateDecoupled,
            facts(huitzPreteritAsPresent).matrixReadingOptions,
        ],
        ahci: [
            ahciPreterit.authorizationStatus,
            ahciPreterit.operationFrame?.targetStem,
            ahciPreterit.formulaRealization,
            ahciPreterit.surfaceRealization,
            facts(ahciPreterit).matrixSemanticDomain,
        ],
        mani: [
            maniDistantPast.authorizationStatus,
            maniDistantPast.operationFrame?.targetStem,
            maniDistantPast.formulaRealization,
            maniDistantPast.surfaceRealization,
            facts(maniDistantPast).matrixReadingOptions,
        ],
        ihca: [
            [ihcaPreteritAsPresent.authorizationStatus,
                ihcaPreteritAsPresent.operationFrame?.targetStem,
                ihcaPreteritAsPresent.formulaRealization,
                ihcaPreteritAsPresent.surfaceRealization],
            [ihcaDistantPast.authorizationStatus,
                ihcaDistantPast.operationFrame?.targetStem,
                ihcaDistantPast.formulaRealization,
                ihcaDistantPast.surfaceRealization],
            facts(ihcaPreteritAsPresent).matrixReadingOptions,
        ],
        carry: [
            [huicaCarry.authorizationStatus,
                huicaCarry.operationFrame?.targetStem,
                huicaCarry.formulaRealization,
                huicaCarry.surfaceRealization],
            [itquiCarry.authorizationStatus,
                itquiCarry.operationFrame?.targetStem,
                itquiCarry.formulaRealization,
                itquiCarry.surfaceRealization],
            [openCarry.authorizationStatus,
                openCarry.operationFrame?.targetStem,
                facts(openCarry).openTypedCarrySourceAdmission,
                facts(openCarry).carrySourceStemWhitelistUsed,
                facts(openCarry).specialCarryStemDerivedFromShape],
            [facts(huicaCarry).linkage,
                facts(huicaCarry).carryMatrixPerfectiveStem,
                facts(huicaCarry).matrixFiniteStem,
                facts(huicaCarry).carryObjectKind,
                huicaCarry.operationFrame?.targetValence],
        ],
        analysisChoice: [
            ordinaryHuica.authorizationStatus,
            ordinaryHuica.operationFrame?.targetStem,
            facts(ordinaryHuica).selectedMatrixAnalysis,
            facts(huicaCarry).selectedMatrixAnalysis,
            facts(huicaCarry).ordinaryVersusCarryAnalysisIsTypedChoice,
            facts(huicaCarry).matrixAnalysisDoesNotWhitelistSourceStem,
        ],
        gates: [
            [carryWithoutObject.authorizationStatus,
                carryWithoutObject.blockReason],
            [carryWithoutHuītz.authorizationStatus,
                carryWithoutHuītz.blockReason],
        ],
        cue: cueRoles(ctx, huicaCarry).includes(GROUP5_ID)
            && cueRoles(ctx, huallaPresent).includes(GROUP5_ID),
    };
    const group5Expected = {
        hualla: [
            ["authorized", "chōca-ti-huāl-la-uh", "chōcatihuāllauh", true, "huāl"],
            ["authorized", "chōca-ti-huāl-lah", "chōcatihuāllah"],
            ["come-while-doing", "come-along-doing"],
        ],
        huitz: [
            "authorized", "chōca-ti-huī-tz",
            "#0-0(chōca-ti-huī-tz)0+⎕-eh#", "chōcatihuītzeh",
            true, true, ["come-doing", "come-in-a-state"],
        ],
        ahci: [
            "authorized", "chōca-t-ahci", "#ni-0(chōca-t-ahci)0+c-0#",
            "nichōcatahcic", "arrival",
        ],
        mani: [
            "authorized", "chōca-ti-man", "#0-0(chōca-ti-man)ca+0-0#",
            "chōcatimanca", [
                "go-along-happening", "happen-all-around-an-area",
                "extend-over-an-area-in-a-state", "stand-as-a-group-doing",
            ],
        ],
        ihca: [
            ["authorized", "chōca-t-ih-ca", "#ni-0(chōca-t-ih-ca)0+c-0#", "nichōcatihcac"],
            ["authorized", "chōca-t-ih-ca", "#ti-0(chōca-t-ih-ca)ca+0-h#", "tichōcatihcacah"],
            ["stand-doing", "stand-in-a-state", "result-state-standing"],
        ],
        carry: [
            ["authorized", "huica-tz", "#0-0+tla(huica-tz)0+⎕-eh#", "tlahuicatzeh"],
            ["authorized", "tqui-tz", "#ni-0+tla(tqui-tz)a+0-0#", "nitlatquitza"],
            ["authorized", "zamal-tz", true, false, true],
            ["linked-connectiveless", "itz", "tz", "tla", "tla"],
        ],
        analysisChoice: [
            "authorized", "huīca-ti-huī-tz", "ordinary-connective-t",
            "special-carry-connectiveless", true, true,
        ],
        gates: [
            ["blocked", "huītz-carry-requires-typed-carry-object"],
            ["blocked", "huītz-carry-requires-typed-huītz-matrix-analysis"],
        ],
        cue: true,
    };
    s.eq("accepted Lesson 28 Group 5 uses typed matrix analysis without a stem whitelist", group5Observed, group5Expected);
    const ownerCoordinates = [
        ["ClassicalHualLaUhCompoundMatrixFormation", "classical-hual-la-uh-compound-matrix-formation", "claim-p2795", "p2795-tla-ma-mah-ti-hua-l-la-uh-to"],
        ["ClassicalHuiTzCompoundMatrixFormation", "classical-hui-tz-compound-matrix-formation", "claim-p2796", "p2796-tla-cuah-ti-hui-tz-to-come-eatings-th"],
        ["ClassicalHuitzCarryConnectivelessFormation", "classical-huitz-carry-connectiveless-formation", "claim-p2799", "p2799-tla-huica-tz-to-come-carrying-s-th"],
        ["ClassicalAhciCompoundMatrixFormation", "classical-ahci-compound-matrix-formation", "claim-p2802", "p2802-tla-ma-mah-t-ahci-to-arrive-carrying-s"],
        ["ClassicalIhcaCompoundMatrixFormation", "classical-ihca-compound-matrix-formation", "claim-p2803", "p2803-cho-ca-t-ihca-to-stand-crying"],
    ].map(([prefix, domain, selection, facet]) => {
        const evaluation = ownerDefinition(
            ctx, prefix, domain, selection, facet,
        );
        return [
            domain,
            evaluation.authorizationStatus,
            evaluation.blockReason,
            evaluation.payload?.definition?.authorizationStatus,
        ];
    });
    s.eq("accepted Lesson 28 Group 5 typed owners observe the canonical compound frame", ownerCoordinates, [
        ["classical-hual-la-uh-compound-matrix-formation", "authorized", "", "authorized"],
        ["classical-hui-tz-compound-matrix-formation", "authorized", "", "authorized"],
        ["classical-huitz-carry-connectiveless-formation", "authorized", "", "authorized"],
        ["classical-ahci-compound-matrix-formation", "authorized", "", "authorized"],
        ["classical-ihca-compound-matrix-formation", "authorized", "", "authorized"],
    ]);
    s.eq("accepted Lesson 28 Group 5 covers every atom once", {
        records: group5Records.length,
        unique: new Set(group5Records.map((record) => record.atomId)).size,
        writing: group5Writing.length,
        reading: group5Records.length - group5Writing.length,
        accepted: group5Records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 56,
        unique: 56,
        writing: 26,
        reading: 30,
        accepted: true,
    });
    for (const record of group5Writing) {
        s.eq(`${record.atomId} has its accepted writing job`, group5Observed, group5Expected);
        const mutation = JSON.parse(JSON.stringify(group5Observed));
        mutation.carry[2][3] = true;
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(group5Expected),
            false,
        );
    }
    const group6Records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP6_ID
    ));
    const group6Writing = group6Records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const oMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "o",
        subject: "3pl",
        tense: "preterit-as-present",
    }));
    const eHuaA = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ē-hua",
        compoundMatrixClass: "A",
        subject: "1sg",
        tense: "preterit",
    }));
    const eHuaB = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ē-hua",
        compoundMatrixClass: "B",
        subject: "1sg",
        tense: "preterit",
    }));
    const quizaMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "quīza",
        verbClass: "B",
        compoundMatrixStem: "quiza",
        subject: "1sg",
        tense: "preterit",
    }));
    const huetziMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "miqui",
        verbClass: "B",
        compoundMatrixStem: "huetzi",
        tense: "preterit",
    }));
    const huetziReversed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "miqui",
        verbClass: "B",
        compoundMatrixStem: "huetzi",
        tense: "preterit",
        compoundEventOrder: "hysteron-proteron",
    }));
    const tlehcoMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "tlal-o-h",
        verbClass: "A",
        compoundMatrixStem: "tlehcō",
    }));
    const calAquiMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "tlal-o-h",
        verbClass: "A",
        compoundMatrixStem: "cal-aqui",
        subject: "1pl",
        tense: "preterit",
    }));
    const pilCaMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "cochi",
        verbClass: "B",
        compoundMatrixStem: "pil-ca",
        tense: "distant-past-as-past",
    }));
    const invalidEHuaClass = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "ē-hua",
        compoundMatrixClass: "C",
    }));
    const invalidEventOrder = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "huetzi",
        compoundEventOrder: "translation-order",
    }));
    const group6Observed = {
        o: [
            oMatrix.authorizationStatus,
            oMatrix.operationFrame?.targetStem,
            oMatrix.formulaRealization,
            oMatrix.surfaceRealization,
            facts(oMatrix).oLocativeOnOmitted,
            facts(oMatrix).omittedMatrixLocative,
            facts(oMatrix).matrixReadingOptions,
        ],
        eHua: [
            [eHuaA.authorizationStatus, eHuaA.operationFrame?.targetStem,
                eHuaA.operationFrame?.targetClass, eHuaA.surfaceRealization],
            [eHuaB.authorizationStatus, eHuaB.operationFrame?.targetStem,
                eHuaB.operationFrame?.targetClass, eHuaB.surfaceRealization],
            facts(eHuaA).eHuaLicensedMatrixClasses,
            facts(eHuaA).eHuaPerfectiveClassAlternants,
            facts(eHuaA).matrixReadingOptions,
        ],
        rapidAndAbrupt: [
            [quizaMatrix.authorizationStatus,
                quizaMatrix.operationFrame?.targetStem,
                quizaMatrix.formulaRealization,
                quizaMatrix.surfaceRealization,
                facts(quizaMatrix).matrixConstruction],
            [huetziMatrix.authorizationStatus,
                huetziMatrix.operationFrame?.targetStem,
                huetziMatrix.formulaRealization,
                huetziMatrix.surfaceRealization,
                facts(huetziMatrix).matrixConstruction],
            facts(quizaMatrix).matrixReadingOptions,
            facts(huetziMatrix).matrixReadingOptions,
            facts(huetziMatrix).rapidOrAbruptReadingIsCueOnly,
        ],
        eventOrder: [
            facts(huetziMatrix).eventOrder,
            facts(huetziMatrix).interpretedFirstEvent,
            facts(huetziReversed).eventOrder,
            facts(huetziReversed).interpretedFirstEvent,
            facts(huetziReversed).interpretedSecondEvent,
            facts(huetziReversed).surfaceConstituentOrder,
            facts(huetziReversed).eventOrderChoiceChangesInterpretationOnly,
            huetziReversed.operationFrame?.targetStem,
            huetziReversed.surfaceRealization,
        ],
        remaining: [
            [tlehcoMatrix.authorizationStatus,
                tlehcoMatrix.operationFrame?.targetStem,
                tlehcoMatrix.surfaceRealization,
                facts(tlehcoMatrix).matrixReadingOptions],
            [calAquiMatrix.authorizationStatus,
                calAquiMatrix.operationFrame?.targetStem,
                calAquiMatrix.formulaRealization,
                calAquiMatrix.surfaceRealization,
                facts(calAquiMatrix).matrixReadingOptions],
            [pilCaMatrix.authorizationStatus,
                pilCaMatrix.operationFrame?.targetStem,
                pilCaMatrix.formulaRealization,
                pilCaMatrix.surfaceRealization,
                facts(pilCaMatrix).matrixReadingOptions],
        ],
        gates: [
            [invalidEHuaClass.authorizationStatus, invalidEHuaClass.blockReason],
            [invalidEventOrder.authorizationStatus, invalidEventOrder.blockReason],
        ],
        openAndTyped: [
            facts(oMatrix).openTypedMatrixAdmission,
            facts(oMatrix).canvasExamplesAreEvidenceOnly,
            facts(oMatrix).embedDeterminesCompoundValence,
            facts(oMatrix).embedSourceValence,
        ],
        cue: cueRoles(ctx, huetziReversed).includes(GROUP6_ID)
            && cueRoles(ctx, oMatrix).includes(GROUP6_ID),
    };
    const group6Expected = {
        o: [
            "authorized", "chōca-t-o", "#0-0(chōca-t-o)0+qu-eh#",
            "chōcatoqueh", true, "on", [
                "lie-stretched-out-doing", "lie-stretched-out-in-a-state",
                "lie-broken", "be-recumbent",
            ],
        ],
        eHua: [
            ["authorized", "chōca-t-ē-hua", "A", "nichōcatēhuac"],
            ["authorized", "chōca-t-ē-uh", "B", "nichōcatēuh"],
            ["A", "B"],
            ["ē-hua", "e-uh"],
            [
                "move-or-start-into-action", "begin-doing", "do-quickly",
                "get-up-and-go-away", "leave-and-depart",
            ],
        ],
        rapidAndAbrupt: [
            ["authorized", "quīz-ti-quiz", "#ni-0(quīz-ti-quiz)0+⎕-0#",
                "niquīztiquiz", "rapid-or-abrupt-quiza"],
            ["authorized", "mic-ti-huetz", "#0-0(mic-ti-huetz)0+⎕-0#",
                "mictihuetz", "falling-or-rapid-abrupt-huetzi"],
            ["do-quickly", "do-abruptly", "burst-forth", "leave-abruptly", "snatch"],
            [
                "do-quickly", "do-abruptly", "fall", "plunge", "snatch",
                "die-and-fall", "fall-and-then-die", "die-from-a-fall",
                "die-suddenly",
            ],
            true,
        ],
        eventOrder: [
            "iconic", "embed", "hysteron-proteron", "matrix", "embed",
            "embed-before-matrix", true, "mic-ti-huetz", "mictihuetz",
        ],
        remaining: [
            ["authorized", "tlal-o-h-ti-tlehco", "tlalohtitlehco",
                ["ascend", "climb-up-at-a-run"]],
            ["authorized", "tlal-o-h-ti-cal-ac",
                "#ti-0(tlal-o-h-ti-cal-ac)0+qu-eh#", "titlalohticalacqueh",
                ["house-enter", "enter", "enter-at-a-run", "enter-swiftly"]],
            ["authorized", "coch-ti-pil-ca",
                "#0-0(coch-ti-pil-ca)ca+0-0#", "cochtipilcaca",
                ["hang", "be-suspended", "sleep-with-head-hanging-down"]],
        ],
        gates: [
            ["blocked", "e-hua-matrix-requires-licensed-a-or-b-class-history"],
            ["blocked", "licensed-compound-event-order-required"],
        ],
        openAndTyped: [true, true, true, "intransitive"],
        cue: true,
    };
    s.eq("accepted Lesson 28 Group 6 uses canonical matrices and genuine choices", group6Observed, group6Expected);
    const group6OwnerCoordinates = [
        ["ClassicalOCompoundMatrixFormation", "classical-o-compound-matrix-formation", "claim-p2804", "p2804-tlap-a-n-t-o-to-lie-after-having"],
        ["ClassicalEHuaCompoundMatrixFormation", "classical-e-hua-compound-matrix-formation", "claim-p2806", "p2806-when-functioning-as-the-matrix-of-a-compound-stem"],
        ["ClassicalQuizaCompoundMatrixFormation", "classical-quiza-compound-matrix-formation", "claim-p2811", "p2811-tla-cui-ti-quiza-to-snatch-s-th"],
        ["ClassicalHuetziCompoundMatrixFormation", "classical-huetzi-compound-matrix-formation", "claim-p2812", "p2812-tla-cui-ti-huetzi-to-snatch-s-th"],
    ].map(([prefix, domain, selection, facet]) => {
        const evaluation = ownerDefinition(ctx, prefix, domain, selection, facet);
        return [domain, evaluation.authorizationStatus, evaluation.blockReason,
            evaluation.payload?.definition?.authorizationStatus];
    });
    s.eq("accepted Lesson 28 Group 6 typed owners observe exact canonical Results", group6OwnerCoordinates, [
        ["classical-o-compound-matrix-formation", "authorized", "", "authorized"],
        ["classical-e-hua-compound-matrix-formation", "authorized", "", "authorized"],
        ["classical-quiza-compound-matrix-formation", "authorized", "", "authorized"],
        ["classical-huetzi-compound-matrix-formation", "authorized", "", "authorized"],
    ]);
    s.eq("accepted Lesson 28 Group 6 covers every atom once", {
        records: group6Records.length,
        unique: new Set(group6Records.map((record) => record.atomId)).size,
        writing: group6Writing.length,
        reading: group6Records.length - group6Writing.length,
        accepted: group6Records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 59,
        unique: 59,
        writing: 19,
        reading: 40,
        accepted: true,
    });
    for (const record of group6Writing) {
        s.eq(`${record.atomId} has its accepted writing job`, group6Observed, group6Expected);
        const mutation = JSON.parse(JSON.stringify(group6Observed));
        mutation.eventOrder[5] = "matrix-before-embed";
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(group6Expected),
            false,
        );
    }
    return s;
}

module.exports = { run };
