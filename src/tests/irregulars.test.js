"use strict";

/**
 * Runtime-boundary proof for Andrews Lesson 11 irregular VNC paradigms.
 *
 * The retired static current-suppletive inventory was a second generation
 * lane. Lesson 11 now reaches scalar and batch output only through the
 * canonical typed Classical paradigm planner.
 */

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("irregulars");

    s.eq(
        "retired static current-suppletive APIs are absent from the installed runtime",
        [
            "getSuppletiveYawiCanonical",
            "getSuppletiveYawiImperfective",
            "getSuppletiveWeyaCanonical",
            "buildSuppletiveYawiStemSet",
            "getCurrentSuppletiveStemFrame",
            "getSuppletiveStemSet",
            "getSuppletiveStemPath",
            "buildIrregularsLesson11PursuitFrame",
        ].map((name) => [name, typeof ctx[name]]),
        [
            ["getSuppletiveYawiCanonical", "undefined"],
            ["getSuppletiveYawiImperfective", "undefined"],
            ["getSuppletiveWeyaCanonical", "undefined"],
            ["buildSuppletiveYawiStemSet", "undefined"],
            ["getCurrentSuppletiveStemFrame", "undefined"],
            ["getSuppletiveStemSet", "undefined"],
            ["getSuppletiveStemPath", "undefined"],
            ["buildIrregularsLesson11PursuitFrame", "undefined"],
        ]
    );

    s.eq(
        "the nemi owner Result exposes nen at the permanent perfective-stem proof address",
        (() => {
            const facet =
                "p1216-nemi-nen-to-live-vncs-built-on-these-stems";
            const source = ctx.buildClassicalNemiIrregularParadigmSource({
                analysisDomain: "classical-nemi-irregular-paradigm",
                selection: "claim-p1216",
                requestedFacet: facet,
                participantChoice: `claim-p1216:${facet}`,
            });
            const result = ctx.evaluateClassicalNemiIrregularParadigm(source);
            return {
                status: result.authorizationStatus,
                proofAddressId: result.payload?.proofAddressId || "",
                proofSemanticName: result.payload?.proofSemanticName || "",
                selectedStem: result.payload?.facetValue || "",
            };
        })(),
        {
            status: "authorized",
            proofAddressId: "4d533cc8-d6c2-48fb-8bad-a85bb036f6b0",
            proofSemanticName: "stem.perfective.selected",
            selectedStem: "nen",
        }
    );

    s.eq(
        "an unmigrated owner coordinate receives one stable opaque proof address automatically",
        (() => {
            const facet =
                "p3269-when-not-occurring-as-the-embed-of-a-compound";
            const request = {
                analysisDomain: "classical-numeral-one",
                selection: "claim-p3269",
                requestedFacet: facet,
                participantChoice: `claim-p3269:${facet}`,
            };
            const first = ctx.evaluateClassicalNumeralOne(
                ctx.buildClassicalNumeralOneSource(request)
            );
            const second = ctx.evaluateClassicalNumeralOne(
                ctx.buildClassicalNumeralOneSource(request)
            );
            const proofAddressId = first.payload?.proofAddressId || "";
            return {
                firstStatus: first.authorizationStatus,
                secondStatus: second.authorizationStatus,
                stable: proofAddressId === second.payload?.proofAddressId,
                opaqueUuid:
                    /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u
                        .test(proofAddressId),
                semanticName: first.payload?.proofSemanticName || "",
                observedValue: first.payload?.facetValue || "",
            };
        })(),
        {
            firstStatus: "authorized",
            secondStatus: "authorized",
            stable: true,
            opaqueUuid: true,
            semanticName:
                "numeral.one.cases.one.authorizationstatus",
            observedValue: "authorized",
        }
    );

    s.eq(
        "the canonical irregular validation frame still realizes the corrected nemi result",
        (() => {
            const frame = ctx.buildClassicalNahuatlIrregularValidationFrame(
                "nemi-past"
            );
            return {
                status: frame.authorizationStatus,
                recipeId: frame.recipeId,
                semanticTense: frame.lesson11?.semanticTenseValue || "",
                morphologicalTense: frame.lesson11?.morphologicalTense || "",
                selectedStem: frame.lesson11?.selectedStem || "",
                formula: frame.formulaRealization,
            };
        })(),
        {
            status: "authorized",
            recipeId: "nemi-past",
            semanticTense: "general-past",
            morphologicalTense: "distant-past",
            selectedStem: "nen",
            formula: "#0-0(nen)ca+0-0#",
        }
    );

    s.eq(
        "canonical Lesson 11 scalar planning projects the selected stem into the typed VNC frame",
        (() => {
            const plan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("yā", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
            });
            const typed = ctx.buildClassicalNahuatlVncSlotFrame({
                sourceFrameKind: "lesson11-scalar-runtime-boundary-proof",
                sourceAuthorizationStatus: "authorized",
                stem: "yā",
                personDyad: { pers1: "ni", pers2: "0" },
                tenseFrame: { tns: "0" },
                numberDyad: { num1: "0", num2: "0" },
            });
            const application = ctx.applyClassicalNahuatlLesson11PlanToVncSlotFrame(plan, typed);
            return {
                planStatus: plan.authorizationStatus,
                selectedStem: plan.selectedStemOverride,
                applicationStatus: application.authorizationStatus,
                sourceStem: application.sourcePredicateStem,
                projectedStem: application.typedVncSlotFrame?.slots?.predicate?.stem || "",
            };
        })(),
        {
            planStatus: "authorized",
            selectedStem: "ya-uh",
            applicationStatus: "authorized",
            sourceStem: "yā",
            projectedStem: "ya-uh",
        }
    );

    s.eq(
        "canonical Lesson 11 full paradigm equals the scalar selected-result path at every requested coordinate",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "yā",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "yā",
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "intransitive",
                requestedValence: "intransitive",
                sentenceNegativeMode: "positive",
                polarityMode: "positive",
                sentenceSurfaceMode: "statement",
            }, {
                groupKeys: ["imperfective-indicative", "perfective-indicative"],
                tenseKeys: ["present", "preterit"],
                subjectKeys: ["1sg", "1pl"],
            });
            return {
                status: frame.authorizationStatus,
                rowCount: frame.rowCount,
                omissions: frame.omissionReasons,
                rows: frame.rows.map((row) => [
                    row.subject,
                    row.tense,
                    row.typedSlotFrame?.slots?.predicate?.stem || "",
                    row.formula,
                    row.surface,
                ]),
            };
        })(),
        {
            status: "authorized",
            rowCount: 4,
            omissions: {},
            rows: [
                ["1sg", "present", "ya-uh", "#ni-0(ya-uh)0+0-0#", "niyauh"],
                ["1pl", "present", "hui", "#ti-0(hui)0+0-h#", "tihuih"],
                ["1sg", "preterit", "yah", "#ni-0(yah)0+⎕-0#", "niyah"],
                ["1pl", "preterit", "yah", "#ti-0(yah)0+qu-eh#", "tiyahqueh"],
            ],
        }
    );

    return s;
}

module.exports = { run };
