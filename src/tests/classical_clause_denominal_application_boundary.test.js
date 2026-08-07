"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_clause_denominal_application_boundary");

    s.eq(
        "The typed denominal Source crosses the canonical application and finite-result boundary",
        (() => {
            const result = ctx.requestClassicalDenominalVncResult({
                nounStem: "tlīl",
                sourceKind: "nounstem",
                sourceState: "absolutive",
                operationId: "inceptive-ti",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                outputScope: "single",
            });
            return {
                kind: result?.kind || "",
                authorizationStatus: result?.authorizationStatus || "",
                issued:
                    ctx.isClassicalNahuatlDenominalVncResultFrame(result),
                sourceKind: result?.sourceFrame?.sourceKind || "",
                operationId: result?.operationFrame?.operationId || "",
                formula: result?.formulaRealization || "",
                surface: result?.surfaceRealization || "",
            };
        })(),
        {
            kind: "classical-nahuatl-denominal-vnc-result-frame",
            authorizationStatus: "authorized",
            issued: true,
            sourceKind: "nounstem",
            operationId: "inceptive-ti",
            formula: "#0-0(tlīl-ti)0+0-0#",
            surface: "tlīlti",
        }
    );

    s.eq(
        "A hostile caller surface cannot replace the typed denominal finite result",
        (() => {
            let hostileResult = null;
            let diagnostic = "";
            try {
                hostileResult = ctx.requestClassicalDenominalVncResult({
                    nounStem: "tlīl",
                    sourceKind: "nounstem",
                    sourceState: "absolutive",
                    operationId: "inceptive-ti",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    outputScope: "single",
                    surfaceRealization: "kalwi",
                });
            } catch (error) {
                diagnostic = String(error?.message || error);
            }
            return {
                issued:
                    ctx.isClassicalNahuatlDenominalVncResultFrame(hostileResult),
                surface: hostileResult?.surfaceRealization || "",
                callerSurfaceReused:
                    hostileResult?.surfaceRealization === "kalwi",
                diagnostic,
            };
        })(),
        {
            issued: false,
            surface: "",
            callerSurfaceReused: false,
            diagnostic:
                "classical-grammar-application-request-invalid:"
                + "forbidden-authority:surfaceRealization",
        }
    );

    return s;
}

module.exports = { run };
