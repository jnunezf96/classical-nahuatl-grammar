"use strict";

const { createSuite } = require("./runner");

function directRequest(sourceStem, extra = {}) {
    return {
        sourceStem,
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        ...extra,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson24_structural");
    const application = ctx.createClassicalNahuatlVncApplication(ctx);

    s.eq(
        "Lesson 24 root, stock, coalescence, and synonym facts do not expose parallel runtime operations",
        [
            "buildClassicalNahuatlLesson24StockFormationFrame",
            "buildClassicalNahuatlLesson24VowelCoalescenceFrame",
            "getClassicalNahuatlLesson24SynonymOptionInventory",
            "deriveClassicalNahuatlLesson24SynonymFrame",
        ].map(name => typeof ctx[name]),
        ["undefined", "undefined", "undefined", "undefined"]
    );

    const stock = application.evaluate(directRequest("(patl-ā-ni)"));
    s.eq(
        "A segmented root-stock-stem Source runs through the canonical scalar VNC application",
        {
            status: stock.authorizationStatus,
            formula: stock.resultFrame.formulaRealization,
            written: stock.resultFrame.surfaceRealization,
            independent: [
                stock.resultFrame.finiteSurfaceFrame.formulaDerivedFromWrittenProjection,
                stock.resultFrame.finiteSurfaceFrame.writtenDerivedFromFormulaProjection,
            ],
            sourceMorphemes: stock.resultFrame.finiteSurfaceFrame.formulaProjection.morphemes
                .filter(morpheme => morpheme.slotRole === "predicate")
                .map(morpheme => morpheme.carrier),
        },
        {
            status: "authorized",
            formula: "#0-0(patl-ā-ni)0+0-0#",
            written: "patlāni",
            independent: [false, false],
            sourceMorphemes: ["patl", "ā", "ni"],
        }
    );

    const coalescenceFixtures = [
        ["(po-ō-ni)", "#0-0(po-ō-ni)0+0-0#", "pōni", "24.5.9"],
        ["(to-ō-ni)", "#0-0(to-ō-ni)0+0-0#", "tōni", "24.5.9"],
        ["(ce-ē-hua)", "#0-0(ce-ē-hua)0+0-0#", "cēhua", "24.6.2"],
        ["(e-ē-hua)", "#0-0(e-ē-hua)0+0-0#", "ēhua", "24.6.2"],
    ];
    s.eq(
        "Licensed identical vowels coalesce only in the written projection while formula boundaries survive",
        coalescenceFixtures.map(([sourceStem]) => {
            const result = application.evaluate(directRequest(sourceStem));
            const boundary = result.resultFrame.finiteSurfaceFrame.neighboringBoundaries
                .find(candidate => candidate.appliedRuleIds.includes("cn-l24-identical-root-stock-vowel-coalescence"));
            return [
                result.authorizationStatus,
                result.resultFrame.formulaRealization,
                result.resultFrame.surfaceRealization,
                boundary?.applicableRuleFrames[0]?.section || "",
                boundary?.formulaCarrierChangedByWrittenBoundary,
            ];
        }),
        coalescenceFixtures.map(([, formula, written, section]) => [
            "authorized",
            formula,
            written,
            section,
            false,
        ])
    );

    s.eq(
        "Mismatched or unlicensed vowel sequences remain literal typed Source boundaries",
        [
            ["(pa-ō-ni)", "#0-0(pa-ō-ni)0+0-0#", "paōni"],
            ["(pi-ī-ni)", "#0-0(pi-ī-ni)0+0-0#", "piīni"],
        ].map(([sourceStem]) => {
            const result = application.evaluate(directRequest(sourceStem));
            return [
                result.authorizationStatus,
                result.resultFrame.formulaRealization,
                result.resultFrame.surfaceRealization,
                result.resultFrame.finiteSurfaceFrame.neighboringBoundaries
                    .some(boundary => boundary.appliedRuleIds.includes("cn-l24-identical-root-stock-vowel-coalescence")),
            ];
        }),
        [
            ["authorized", "#0-0(pa-ō-ni)0+0-0#", "paōni", false],
            ["authorized", "#0-0(pi-ī-ni)0+0-0#", "piīni", false],
        ]
    );

    s.eq(
        "Lesson 24.6.3 synonym pairs are independent lexical Sources, not a target-selecting grammar operation",
        [
            "(tep-ē-hua)",
            "(tep-ē-hui)",
            "(tōy-ā-hua)",
            "(tōy-ā-hui)",
        ].map(sourceStem => {
            const result = application.evaluate(directRequest(sourceStem));
            return [
                result.authorizationStatus,
                result.resultFrame.formulaRealization,
                result.resultFrame.surfaceRealization,
            ];
        }),
        [
            ["authorized", "#0-0(tep-ē-hua)0+0-0#", "tepēhua"],
            ["authorized", "#0-0(tep-ē-hui)0+0-0#", "tepēhui"],
            ["authorized", "#0-0(tōy-ā-hua)0+0-0#", "tōyāhua"],
            ["authorized", "#0-0(tōy-ā-hui)0+0-0#", "tōyāhui"],
        ]
    );

    const hostile = application.evaluate(directRequest("(po-ō-ni)", {
        formulaRealization: "#forged#",
        surfaceRealization: "forged",
        lessonNumber: 24,
    }));
    s.eq(
        "Caller output and curriculum authority fail closed before a Lesson 24 result can be issued",
        {
            status: hostile.authorizationStatus,
            reason: hostile.blockReason,
            rejected: [...hostile.rejectedAuthorityFields].sort(),
            formula: hostile.resultFrame.formulaRealization,
            written: hostile.resultFrame.surfaceRealization,
        },
        {
            status: "blocked",
            reason: "classical-vnc-application-caller-authority-rejected",
            rejected: ["formulaRealization", "lessonNumber", "surfaceRealization"],
            formula: "",
            written: "",
        }
    );

    const plan = application.prepareParadigm({
        ...directRequest("(po-ō-ni)"),
        outputScope: "paradigm",
    });
    const coordinate = { subject: "3sg", mood: "indicative", tense: "present" };
    const point = application.projectParadigmCoordinates(plan, [coordinate])[0];
    const scalar = application.evaluate({
        ...directRequest("(po-ō-ni)"),
        ...coordinate,
        outputScope: "single",
    });
    s.eq(
        "The full-paradigm coordinate uses the same scalar evaluator and boundary realization",
        {
            plan: plan.authorizationStatus,
            point: point.authorizationStatus,
            scalarEquivalent: point.scalarEquivalent,
            pointFormula: point.formulaRealization,
            pointWritten: point.surfaceRealization,
            scalarFormula: scalar.resultFrame.formulaRealization,
            scalarWritten: scalar.resultFrame.surfaceRealization,
        },
        {
            plan: "authorized",
            point: "authorized",
            scalarEquivalent: true,
            pointFormula: "#0-0(po-ō-ni)0+0-0#",
            pointWritten: "pōni",
            scalarFormula: "#0-0(po-ō-ni)0+0-0#",
            scalarWritten: "pōni",
        }
    );

    return s;
}

module.exports = { run };
