"use strict";

const { createSuite } = require("./runner");

function summarizeFiniteApplication(frame = null) {
    return {
        status: frame?.authorizationStatus || "",
        reason: frame?.blockReason || "",
        formula: frame?.resultFrame?.formulaRealization || "",
        surface: frame?.resultFrame?.surfaceRealization || "",
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons4_7_projection");
    const application = ctx.createClassicalNahuatlVncApplication(ctx);

    // Andrews §7.3.2, §7.7.2: Class B tom-a has silent causative /a/
    // and the perfective ton-Ø used by the preterit.
    s.eq(
        "Canvas Class B tom-a preterit has exact independent LCM and GCD projections",
        summarizeFiniteApplication(application.evaluate({
            sourceStem: "tom-a",
            verbClass: "B",
            sourceValence: "specific-projective",
            objectPerson: "3sg",
            subject: "1sg",
            mood: "indicative",
            tense: "preterit",
            requestedDerivation: "direct",
            requestedVoice: "active",
        })),
        {
            status: "authorized",
            reason: "",
            formula: "#ni-0+c-0(ton-⎕)0+⎕-0#",
            surface: "nicton",
        }
    );

    // Andrews §7.3.3, §7.7.3: Class C future lengthens the final vowel;
    // the preterit changes final /a:/ after /i/ to /h/.
    const ilpiaBase = {
        sourceStem: "ilpi-ā",
        verbClass: "C",
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        subject: "3sg",
        mood: "indicative",
        requestedDerivation: "direct",
        requestedVoice: "active",
    };
    const ilpiaFuture = application.evaluate({
        ...ilpiaBase,
        tense: "future",
    });
    const ilpiaPreterit = application.evaluate({
        ...ilpiaBase,
        tense: "preterit",
    });
    s.eq(
        "Canvas Class C ilpi-a future and preterit keep formula boundaries while spelling only GCD",
        [
            summarizeFiniteApplication(ilpiaFuture),
            summarizeFiniteApplication(ilpiaPreterit),
        ],
        [
            {
                status: "authorized",
                reason: "",
                formula: "#0-0+qu-0(ilpī)z+⎕-0#",
                surface: "quilpīz",
            },
            {
                status: "authorized",
                reason: "",
                formula: "#0-0+qu-0(ilpi-h)0+⎕-0#",
                surface: "quilpih",
            },
        ]
    );

    const unlicensedTzuma = application.evaluate({
        sourceStem: "tzuma",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "preterit",
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
    s.eq(
        "Unsegmented non-Canvas tzuma cannot obtain a result from legacy stored surfaces",
        {
            ...summarizeFiniteApplication(unlicensedTzuma),
            finiteSurface: unlicensedTzuma.resultFrame?.finiteSurfaceFrame || null,
        },
        {
            status: "blocked",
            reason: "classical-vnc-proof-not-authorized",
            formula: "",
            surface: "",
            finiteSurface: null,
        }
    );

    const hostileIlpia = application.evaluate({
        ...ilpiaBase,
        tense: "future",
        formula: "#FORGED-FORMULA#",
        surface: "FORGED-SURFACE",
        result: "FORGED-RESULT",
    });
    s.eq(
        "caller formula and surface artifacts fail closed before the typed ilpi-a result",
        {
            result: summarizeFiniteApplication(hostileIlpia),
            rejected: hostileIlpia.rejectedAuthorityFields,
            poisonSurvived: JSON.stringify(hostileIlpia).includes("FORGED"),
            callerAccepted: hostileIlpia.callerSuppliedAuthorityAccepted,
            formulaAuthority: hostileIlpia.formulaStringAuthority,
            surfaceAuthority: hostileIlpia.surfaceStringAuthority,
        },
        {
            result: {
                status: "blocked",
                reason:
                    "classical-vnc-application-caller-authority-rejected",
                formula: "",
                surface: "",
            },
            rejected: ["formula", "surface", "result"],
            poisonSurvived: false,
            callerAccepted: false,
            formulaAuthority: false,
            surfaceAuthority: false,
        }
    );

    const plan = application.prepareParadigm(ilpiaBase);
    const coordinates = application.projectParadigmCoordinates(plan, [
        { subject: "3sg", mood: "indicative", tense: "future" },
        { subject: "3sg", mood: "indicative", tense: "preterit" },
    ]);
    s.eq(
        "Full-paradigm coordinates are pointwise identical to scalar ilpi-a evaluation",
        {
            planStatus: plan.authorizationStatus,
            coordinates: coordinates.map((coordinate) => ({
                status: coordinate.authorizationStatus,
                formula: coordinate.formulaRealization,
                surface: coordinate.surfaceRealization,
            })),
        },
        {
            planStatus: "authorized",
            coordinates: [
                {
                    status: ilpiaFuture.authorizationStatus,
                    formula: ilpiaFuture.resultFrame.formulaRealization,
                    surface: ilpiaFuture.resultFrame.surfaceRealization,
                },
                {
                    status: ilpiaPreterit.authorizationStatus,
                    formula: ilpiaPreterit.resultFrame.formulaRealization,
                    surface: ilpiaPreterit.resultFrame.surfaceRealization,
                },
            ],
        }
    );

    const sentence = ctx.buildClassicalNahuatlVncSentenceResultFrame(ilpiaPreterit);
    s.eq(
        "Lesson 4 sentence projection consumes the canonical nuclear formula and surface separately",
        {
            status: sentence.authorizationStatus,
            consumedFormula: sentence.consumedNuclearFormula,
            consumedSurface: sentence.consumedNuclearSurface,
            sentenceFormula: sentence.sentenceFormulaDisplay,
            sentenceSurface: sentence.sentenceSurfaceDisplay,
        },
        {
            status: "authorized",
            consumedFormula: "#0-0+qu-0(ilpi-h)0+⎕-0#",
            consumedSurface: "quilpih",
            sentenceFormula: "#0-0+qu-0(ilpi-h)0+⎕-0#",
            sentenceSurface: "quilpih",
        }
    );

    const legacyShell = ctx.buildNuclearClauseShellMetadata({
        clauseKind: "vnc",
        subject: { prefix: "ni" },
        object: { prefix: "c" },
        predicate: { stem: "tom-a" },
        tenseValue: "preterito",
    });
    const hostilePathRecords = ["nicton", "nictoma"].map((surface) => ({
        surface,
        paths: [{
            formulaSlotKey: "pers1",
            formulaMorph: "ni",
            surfaceValue: "ni",
        }, {
            formulaSlotKey: "va",
            formulaMorph: "c",
            surfaceValue: "c",
        }, {
            formulaSlotKey: "base",
            formulaMorph: "tom-a",
            surfaceValue: "HOSTILE_SURFACE_STEM",
        }, {
            formulaSlotKey: "tns",
            formulaMorph: "Ø",
            surfaceValue: "",
        }, {
            formulaSlotKey: "num1",
            formulaMorph: "Ø",
            surfaceValue: "",
        }, {
            formulaSlotKey: "num2",
            formulaMorph: "Ø",
            surfaceValue: "",
        }],
    }));
    const legacyPairs = ctx.buildCnvFormulaSurfacePairs({
        nuclearClauseShell: legacyShell,
        pathRecords: hostilePathRecords,
        sourceFormulaEcho: "CNV(tom-a)",
    });
    s.eq(
        "Legacy surface records cannot rewrite any LCM slot from their GCD strings",
        {
            formula: legacyShell.formulaEcho,
            pairCount: legacyPairs.length,
            allPairsUseTypedShell:
                legacyPairs.length > 0
                && legacyPairs.every((pair) => (
                    pair.targetFormulaEcho
                    === legacyShell.formulaEcho
                )),
            surfaceStemLeak: legacyPairs.some((pair) => (
                pair.targetFormulaEcho.includes("HOSTILE_SURFACE_STEM")
            )),
        },
        {
            formula: "#ni-Ø+c(tom-a)Ø+Ø-Ø#",
            pairCount: 2,
            allPairsUseTypedShell: true,
            surfaceStemLeak: false,
        }
    );

    return s;
}

module.exports = { run };
