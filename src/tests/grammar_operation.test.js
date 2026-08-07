"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("grammar_operation");

    s.eq(
        "the generic caller-mintable grammar-operation runtime is absent",
        [
            "buildGrammarOperationContract",
            "isGrammarOperationContract",
            "evaluateGrammarOperationPlan",
            "isGrammarOperationEvaluationFrame",
            "createGrammarOperationContractOwner",
        ].map(name => [name, typeof ctx[name]]),
        [
            ["buildGrammarOperationContract", "undefined"],
            ["isGrammarOperationContract", "undefined"],
            ["evaluateGrammarOperationPlan", "undefined"],
            ["isGrammarOperationEvaluationFrame", "undefined"],
            ["createGrammarOperationContractOwner", "undefined"],
        ]
    );

    const source =
        ctx.buildClassicalNahuatlVerbstemClassFrame("(nemi)", {
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            verbClass: "A",
            perfectiveClass: "A",
            valence: "intransitive",
            transitivity: "intransitive",
        });
    const canonical =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:source-selection",
            outputKind: "scalar",
            args: ["(nemi)", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
            }],
        });
    let hostileError = "";
    try {
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:source-selection",
            outputKind: "scalar",
            args: ["(nemi)", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
                lesson: 7,
                formula: "#caller#",
                surface: "caller",
            }],
        });
    } catch (error) {
        hostileError = String(error?.message || error);
    }

    s.eq(
        "semantic operation selection is owned by the canonical application route",
        {
            sourceAuthorized: source.authorizationStatus,
            canonical: [
                canonical.operationId,
                canonical.authorizationStatus,
                canonical.canonicalResult?.selectedWholeStem,
                canonical.canonicalResult?.selectedSourceKind,
                ctx.isClassicalGrammarApplicationResult(canonical),
            ],
            hostileError,
        },
        {
            sourceAuthorized: "authorized",
            canonical: [
                "vnc:source-selection",
                "authorized",
                "nemi",
                "whole-stem",
                true,
            ],
            hostileError:
                "classical-grammar-application-request-invalid:"
                + "forbidden-authority:lesson",
        }
    );

    return s;
}

module.exports = { run };
