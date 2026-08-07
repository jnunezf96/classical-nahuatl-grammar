"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_vnc_paradigm_application_route");

    s.eq(
        "the renderer projects one VNC coordinate only through its issued grammar-application plan",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                stem: "chōca",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "chōca",
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "intransitive",
                requestedValence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                objectKind: "none",
                objectPerson: "",
                derivationType: "direct",
                requestedVoice: "active",
                lateOperation: "none",
                sentenceNegativeMode: "positive",
                sentenceSurfaceMode: "statement",
            }, {
                valenceKeys: ["intransitive"],
                groupKeys: ["imperfective-indicative"],
                tenseKeys: ["present"],
                subjectKeys: ["1sg"],
            });
            const row = frame.rows[0] || null;
            const coordinate = row?.preparedCoordinateFrame || null;
            return {
                status: frame.authorizationStatus,
                candidateCount: frame.candidateCount,
                omittedCandidateCount: frame.omittedCandidateCount,
                rowCount: frame.rowCount,
                omissionReasons: frame.omissionReasons,
                coordinateStatus: coordinate?.authorizationStatus || "",
                scalarEquivalent: coordinate?.scalarEquivalent === true,
                issuedPlanRetained:
                    coordinate?.paradigmPlan?.kind
                        === "classical-nahuatl-vnc-paradigm-generation-plan",
                formulaParity:
                    row?.formula
                        === coordinate?.scalarApplicationFrame?.resultFrame
                            ?.formulaRealization,
                surfaceParity:
                    row?.surface === coordinate?.sentenceSurfaceDisplay,
            };
        })(),
        {
            status: "authorized",
            candidateCount: 1,
            omittedCandidateCount: 0,
            rowCount: 1,
            omissionReasons: {},
            coordinateStatus: "authorized",
            scalarEquivalent: true,
            issuedPlanRetained: true,
            formulaParity: true,
            surfaceParity: true,
        }
    );

    s.eq(
        "a VNC late-operation paradigm fails closed instead of rebuilding each cell in the renderer",
        (() => {
            const frame = ctx.buildClassicalVncParadigmFrame({
                basalUnit: "vnc",
                stem: "chōca",
                sourceTransitivity: "intransitive",
                sourceMatrixStem: "chōca",
                verbClass: "A",
                requestedVerbClass: "A",
                valence: "intransitive",
                requestedValence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                objectKind: "none",
                objectPerson: "",
                derivationType: "direct",
                requestedVoice: "active",
                lateOperation: "reduplication",
                sentenceNegativeMode: "positive",
                sentenceSurfaceMode: "statement",
            }, {
                valenceKeys: ["intransitive"],
                groupKeys: ["imperfective-indicative"],
                tenseKeys: ["present"],
                subjectKeys: ["1sg"],
            });
            return {
                status: frame.authorizationStatus,
                candidateCount: frame.candidateCount,
                omittedCandidateCount: frame.omittedCandidateCount,
                rowCount: frame.rowCount,
                omissionReasons: frame.omissionReasons,
            };
        })(),
        {
            status: "blocked",
            candidateCount: 1,
            omittedCandidateCount: 1,
            rowCount: 0,
            omissionReasons: {
                "canonical-vnc-application-paradigm-plan-required": 1,
            },
        }
    );

    return s;
}

module.exports = { run };
