"use strict";

const { createSuite } = require("./runner");

function evaluateMachtia(ctx, {
    sourceSubject,
    targetSubject,
    tense,
    sourceVoice = "active",
    causativeSpecificShuntlineRealization,
}) {
    const request = {
        sourceStem: "mati",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject,
        subject: targetSubject,
        mood: "indicative",
        tense,
        requestedDerivation: "causative",
        sourceVoice,
        sourceNonactiveOptionId:
            sourceVoice === "passive" ? "ō:mach-ō" : "",
        requestedVoice: "active",
        causativeSpecificShuntlineRealization,
    };
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const preview = application.evaluate(request);
    const option = preview.controlFrame?.derivationOptionInventory
        ?.options?.find(
        candidate => candidate.targetStem === "mach-tiā"
    );
    return application.evaluate({
        ...request,
        derivationOptionId: option?.optionId || "missing-mach-tiā",
    });
}

function buildActive(ctx) {
    return evaluateMachtia(ctx, {
            sourceSubject: "1pl",
            targetSubject: "3sg",
            tense: "present",
        });
}

function buildPassive(ctx, {
    tense,
    realization,
}) {
    return evaluateMachtia(ctx, {
        sourceSubject: "3sg",
        targetSubject: "3sg",
        tense,
        sourceVoice: "passive",
        causativeSpecificShuntlineRealization: realization,
    });
}

function buildNnc(ctx, stem, nounClass) {
    return ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject: "3sg",
        nounClass,
        animacy: "nonanimate",
    });
}

function buildRequest(ctx, coordinateId, principalClause, supplementClause) {
    const referenceId = `referent:${coordinateId}`;
    return {
        coordinateId,
        operationKind: "relation",
        principalClause:
            ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
                principalClause,
                {
                    referenceId: `principal:${coordinateId}`,
                    subjectReferenceId: `principal-subject:${coordinateId}`,
                    objectReferenceIds: {
                        "source-object-1": referenceId,
                    },
                }
            ),
        supplementClause:
            ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
                supplementClause,
                { referenceId }
            ),
        options: {
            referenceMode: "shared",
            headRole: "object",
            principalObjectId: "source-object-1",
            supplementContactRole: "subject",
            order: "principal-first",
            adjunctor: "in",
        },
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_3_supplementation");

    s.eq(
        "Lesson 25.3 profile finalizers are absent from the canonical runtime",
        [
            "getClassicalNahuatlLesson253SupplementationProfileInventory",
            "buildClassicalNahuatlLesson253SupplementationFrame",
            "isClassicalNahuatlLesson253SupplementationFrame",
        ].map(name => [name, typeof ctx[name]]),
        [
            ["getClassicalNahuatlLesson253SupplementationProfileInventory", "undefined"],
            ["buildClassicalNahuatlLesson253SupplementationFrame", "undefined"],
            ["isClassicalNahuatlLesson253SupplementationFrame", "undefined"],
        ]
    );

    const requests = [
        buildRequest(
            ctx,
            "active",
            buildActive(ctx),
            buildNnc(ctx, "nehmatcānēmiliz", "tli")
        ),
        buildRequest(
            ctx,
            "passive-silent",
            buildPassive(ctx, {
                tense: "present",
                realization: "silent",
            }),
            buildNnc(ctx, "nehmatcānēmiliz", "tli")
        ),
        buildRequest(
            ctx,
            "passive-sounded",
            buildPassive(ctx, {
                tense: "imperfect",
                realization: "sounded",
            }),
            buildNnc(ctx, "teōcuīca", "tl")
        ),
    ];
    const paradigm =
        ctx.evaluateClassicalNahuatlSupplementationOperationParadigm(
            requests
        );

    s.eq(
        "the three Canvas 25.3 clauses execute through the shared typed relation",
        {
            status: paradigm.authorizationStatus,
            rows: paradigm.rows.map(row => [
                row.coordinateId,
                row.authorizationStatus,
                row.formulaRealization,
                row.surfaceRealization,
                ctx.isClassicalNahuatlSupplementationFrame(row.frame),
                row.frame.referenceFrame?.principalHead?.id || "",
                row.frame.referenceFrame?.principalHead?.silent,
            ]),
            scalarEquivalent: paradigm.rows.every((row, index) => (
                JSON.stringify(row.frame)
                === JSON.stringify(
                    ctx.evaluateClassicalNahuatlSupplementationOperation(
                        requests[index]
                    )
                )
            )),
        },
        {
            status: "authorized",
            rows: [
                [
                    "active",
                    "authorized",
                    "#0-0+t-ēch+⎕-0(mach-tia)0+0-0# + in + #0-0(nehmatcānēmiliz)tli-0#",
                    "Tēchmachtia in nehmatcānēmiliztli.",
                    true,
                    "source-object-1",
                    true,
                ],
                [
                    "passive-silent",
                    "authorized",
                    "#0-0+⎕-0+tē(mach-tia)0+0-0# + in + #0-0(nehmatcānēmiliz)tli-0#",
                    "Tēmachtia in nehmatcānēmiliztli.",
                    true,
                    "source-object-1",
                    true,
                ],
                [
                    "passive-sounded",
                    "authorized",
                    "#0-0+qui-0+tē(mach-tiā)ya+0-0# + in + #0-0(teōcuīca)tl-0#",
                    "Quitēmachtiāya in teōcuīcatl.",
                    true,
                    "source-object-1",
                    false,
                ],
            ],
            scalarEquivalent: true,
        }
    );

    const issued =
        ctx.evaluateClassicalNahuatlSupplementationOperation(requests[0]);
    const hostile =
        ctx.evaluateClassicalNahuatlSupplementationOperation({
            ...requests[0],
            principalClause: {
                ...requests[0].principalClause,
                surfaceRealization: "caller-forged-principal",
            },
        });
    s.eq(
        "copied source envelopes and caller surface text cannot authorize supplementation",
        {
            issued: [
                issued.authorizationStatus,
                ctx.isClassicalNahuatlSupplementationFrame(issued),
            ],
            hostile: [
                hostile.authorizationStatus,
                hostile.blockReason,
                ctx.isClassicalNahuatlSupplementationFrame(hostile),
            ],
        },
        {
            issued: ["authorized", true],
            hostile: [
                "blocked",
                "authorized-typed-principal-and-supplement-required",
                false,
            ],
        }
    );

    return s;
}

module.exports = { run };
