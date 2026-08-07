"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const CANVAS_LINES = fs.readFileSync(
    path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
    "utf8"
).split(/\r?\n/u);
const CLASSICAL_SHELL = fs.readFileSync(
    path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"),
    "utf8"
);
const CLASSICAL_RENDERING = fs.readFileSync(
    path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
    "utf8"
);
const CLASSICAL_CONSTRUCTION_SELECT = (
    CLASSICAL_SHELL.match(/id="classical-construction-operation"[^]*?<\/select>/u)
    || [""]
)[0];

function base(overrides = {}) {
    return {
        nounStem: "tlīl",
        sourceKind: "nounstem",
        sourceState: "absolutive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        objectPeople: ["3sg", "2sg"],
        outputScope: "single",
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_lessons54_55_closure");
    const operationIds = ctx.CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.operations
        .map(operation => operation.id);

    s.eq(
        "Lessons 54-55 source ledger covers every substantive Canvas line and every production operation",
        (() => {
            const audit = ctx.auditClassicalNahuatlLessons5455SourceLedger({
                lines: CANVAS_LINES,
                operationIds,
            });
            return {
                range: audit.sourceRange,
                claims: audit.claimCount,
                operations: audit.operationCount,
                unowned: audit.unownedOperations,
                uncovered: audit.uncoveredSubstantiveLines,
                proofFamiliesComplete: audit.proofFamiliesComplete,
            };
        })(),
        {
            range: { lineStart: 22972, lineEnd: 24061 },
            claims: 56,
            operations: 41,
            unowned: [],
            uncovered: [],
            proofFamiliesComplete: true,
        }
    );

    s.eq(
        "GCD and LCM encode the complete typed denominal distinction space",
        {
            gcd: ctx.CLASSICAL_NAHUATL_DENOMINAL_VNC_GCD,
            routeCount: ctx.CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.routeCount,
            attestedRouteCount: ctx.CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.attestedRouteCount,
            categoryOnlyRouteCount: ctx.CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.categoryOnlyRouteCount,
            operationCount: ctx.CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.operations.length,
            axisCount: ctx.CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.axes.length,
            uniqueOperations: new Set(operationIds).size,
            uniqueAxes: new Set(
                ctx.CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.axes.map(axis => axis.axisId)
            ).size,
        },
        {
            gcd: {
                identityId: "classical-denominal-vnc:typed-nnc-source>licensed-verbalization>participant-projection>class-boundary>finite-vnc",
                stageOrder: [
                    "typed-nnc-source",
                    "licensed-denominal-operation",
                    "participant-valence-projection",
                    "class-boundary-realization",
                    "finite-vnc-result",
                ],
                smallestSharedInvariant: "A typed nominal source is consumed by one licensed verbalization; its participants and valence are projected before the canonical VNC class and boundary machinery realizes a finite result.",
            },
            routeCount: 41,
            attestedRouteCount: 40,
            categoryOnlyRouteCount: 1,
            operationCount: 41,
            axisCount: 54,
            uniqueOperations: 41,
            uniqueAxes: 54,
        }
    );

    const derive = request => ctx.deriveClassicalNahuatlDenominalVncOperation(base(request));
    const ti = derive({ nounStem: "tlīl", operationId: "inceptive-ti" });
    const hui = derive({ nounStem: "ix", operationId: "inceptive-hui" });
    const ya = derive({ nounStem: "chichi", operationId: "inceptive-root-ya", classChoice: "B" });
    const possessionTi = derive({ nounStem: "pah", operationId: "possession-ti" });
    const causativeTla = derive({ nounStem: "mahui-z", operationId: "denominal-causative-tla" });
    const intransitiveTla = derive({ nounStem: "tla", operationId: "intransitive-tla" });
    const oaUse = derive({ nounStem: "āyacach", operationId: "intransitive-o-a-use" });
    const oaProduce = derive({ nounStem: "tamal", operationId: "intransitive-o-a-produce" });
    const oaHypothetical = derive({ nounStem: "tepon-āz", operationId: "intransitive-o-a-use" });
    const iHui = derive({ nounStem: "tlīl", operationId: "denominal-i-hui" });
    const aHui = derive({ nounStem: "pil-i-ch", operationId: "denominal-a-hui" });
    const ceYa = derive({ nounStem: "ce", operationId: "inceptive-root-ya", classChoice: "B" });
    const cuicaTi = derive({ nounStem: "cuica", operationId: "possession-ti", classChoice: "A" });

    const routeRequests = [
        ["inceptive-ti", { nounStem: "tlīl" }],
        ["inceptive-hui", { nounStem: "ix" }],
        ["inceptive-root-ya", { nounStem: "chichi", classChoice: "B" }],
        ["inceptive-ti-ya", { sourceOperationFrame: ti, nounStem: "", classChoice: "A" }],
        ["inceptive-hui-ya", { sourceOperationFrame: hui, nounStem: "" }],
        ["destockal-ya", { nounStem: "", sourceVerbStem: "yam-ā-ni", sourceKind: "destockal-ni-hui-vnc" }],
        ["inceptive-a", { nounStem: "tlāhui" }],
        ["deverbal-yo-hua", { nounStem: "tōcā-yō", sourceKind: "deverbal-yo-nounstem" }],
        ["included-possessor-ti", { nounStem: "ix-xip-tla", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "3sg", includedPossessorFamily: "proxy" }],
        ["possession-ti", { nounStem: "pah" }],
        ["ti-hui-lia-causative", { sourceOperationFrame: ti, nounStem: "" }],
        ["ya-lia-causative", { sourceOperationFrame: ya, nounStem: "" }],
        ["ya-lia-applicative", { sourceOperationFrame: ceYa, nounStem: "" }],
        ["destockal-a-causative", { nounStem: "", sourceVerbStem: "yam-ā-ni", sourceKind: "destockal-ni-hui-vnc" }],
        ["ti-a-causative-single", { sourceOperationFrame: possessionTi, nounStem: "" }],
        ["ti-a-causative-double-inceptive", { nounStem: "āxcā", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "1sg" }],
        ["ti-a-causative-double-possession", { nounStem: "cal", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "2sg" }],
        ["patientive-chain-ti-a", { nounStem: "", sourceVerbStem: "il-o-ā", sourceKind: "lexical-o-a-vnc", sourceState: "derived" }],
        ["ti-ia-applicative", { sourceOperationFrame: cuicaTi, nounStem: "" }],
        ["temporal-tia", { nounStem: "ōn-xihui", sourceKind: "temporal-compound-nounstem" }],
        ["denominal-causative-tla", { nounStem: "mahui-z" }],
        ["causative-tla-ti-lia-applicative", { sourceOperationFrame: causativeTla, nounStem: "" }],
        ["intransitive-tla", { nounStem: "tla" }],
        ["intransitive-tla-ti-a-causative", { sourceOperationFrame: intransitiveTla, nounStem: "" }],
        ["intransitive-tla-ti-lia-applicative", { sourceOperationFrame: intransitiveTla, nounStem: "" }],
        ["intransitive-o-a-use", { nounStem: "āyacach" }],
        ["intransitive-o-a-produce", { nounStem: "tamal" }],
        ["applicative-huia-use", { nounStem: "izta" }],
        ["applicative-huia-produce", { nounStem: "tla-xca-l" }],
        ["applicative-huia-double-object", { nounStem: "cuitla", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "1sg" }],
        ["o-a-to-i-l-huia", { sourceOperationFrame: oaHypothetical, nounStem: "" }],
        ["adverbial-huia", { nounStem: "ilihuiz", sourceKind: "adverbial-nounstem" }],
        ["relational-o-a-transitive", { nounStem: "quech-pan", sourceKind: "relational-compound-or-predicate" }],
        ["relational-o-a-intransitive", { nounStem: "tequi-pan", sourceKind: "relational-compound-or-predicate" }],
        ["relational-huia", { nounStem: "icxi-pan", sourceKind: "relational-compound-or-predicate" }],
        ["denominal-i-hui", { nounStem: "tlīl" }],
        ["denominal-a-hui", { nounStem: "xol-o-ch" }],
        ["i-hui-to-o-a", { sourceOperationFrame: iHui, nounStem: "" }],
        ["a-hui-to-o-a", { sourceOperationFrame: aHui, nounStem: "" }],
        ["transitive-i-a", { nounStem: "tlāl", sourceKind: "nounstem-plus-stock-i" }],
    ];

    const reached = routeRequests.map(([operationId, request]) => {
        const frame = derive({ operationId, ...request });
        return [
            operationId,
            frame.authorizationStatus,
            frame.operationId || "",
            frame.targetStem || "",
            frame.targetClass || "",
            frame.objectCount ?? -1,
        ];
    });
    s.eq(
        "Every attested LCM route is mechanically reachable and the category-only route stays non-generative",
        {
            count: reached.length,
            unique: new Set(reached.map(row => row[0])).size,
            failures: reached.filter(row => row[1] !== "authorized" || row[0] !== row[2]),
            categoryOnly: (() => {
                const frame = derive({
                    operationId: "o-a-to-a-l-huia",
                    sourceOperationFrame: oaProduce,
                    nounStem: "",
                });
                return [frame.authorizationStatus, frame.blockReason];
            })(),
        },
        {
            count: 40,
            unique: 40,
            failures: [],
            categoryOnly: ["blocked", "no-andrews-licensed-denominal-operation-for-source"],
        }
    );

    const scalarWitnesses = [
        {
            request: { nounStem: "ā", operationId: "inceptive-ti", classChoice: "A", subject: "1sg" },
            targetStem: "ā-ti",
            targetClass: "A",
            surface: "nāti",
            formula: "#n-0(ā-ti)0+0-0#",
        },
        {
            request: { nounStem: "chichi", operationId: "inceptive-root-ya", classChoice: "B", tense: "preterit" },
            targetStem: "chichi-ya",
            targetClass: "B",
            surface: "chichix",
            formula: "#0-0(chichi-x)0+⎕-0#",
        },
        {
            request: { nounStem: "mahui-z", operationId: "denominal-causative-tla", subject: "1sg", objectPeople: ["3sg"] },
            targetStem: "mahui-z-tla",
            targetClass: "A",
            surface: "nicmahuiztla",
            formula: "#ni-0+c-0(mahui-z-tla)0+0-0#",
        },
        {
            request: { nounStem: "tla-xca-l", operationId: "applicative-huia-produce", subject: "1sg", objectPeople: ["3sg"] },
            targetStem: "tla-xca-l-huiā",
            targetClass: "C",
            surface: "nictlaxcalhuia",
            formula: "#ni-0+c-0(tla-xca-l-huia)0+0-0#",
        },
        {
            request: { nounStem: "tlīl", operationId: "denominal-i-hui", subject: "1sg", tense: "preterit" },
            targetStem: "tlīl-i-hui",
            targetClass: "B",
            surface: "nitlīliuh",
            formula: "#ni-0(tlīl-i-uh)0+⎕-0#",
        },
    ];
    s.eq(
        "Selected witnesses reach the canonical formula and finite-surface path",
        scalarWitnesses.map(witness => {
            const result = ctx.evaluateClassicalNahuatlDenominalVnc(base(witness.request));
            return {
                authorizationStatus: result.authorizationStatus,
                targetStem: result.operationFrame?.targetStem || "",
                targetClass: result.operationFrame?.targetClass || "",
                surface: result.surfaceRealization,
                formula: result.formulaRealization,
                gcd: result.grammarFrame?.greatestCommonDivisor?.satisfied === true,
                lcmRoutes: result.grammarFrame?.leastCommonMultiple?.licensedRouteSetComplete === true,
                lcmAxes: result.grammarFrame?.leastCommonMultiple?.licensedAxisSetComplete === true,
            };
        }),
        scalarWitnesses.map(witness => ({
            authorizationStatus: "authorized",
            targetStem: witness.targetStem,
            targetClass: witness.targetClass,
            surface: witness.surface,
            formula: witness.formula,
            gcd: true,
            lcmRoutes: true,
            lcmAxes: true,
        }))
    );

    s.eq(
        "Typed negative gates block unsupported productive guesses and missing history",
        [
            ctx.deriveClassicalNahuatlDenominalVncOperation(base({
                nounStem: "arbitrary",
                operationId: "inceptive-a",
            })),
            ctx.deriveClassicalNahuatlDenominalVncOperation(base({
                nounStem: "arbitrary",
                operationId: "intransitive-tla",
            })),
            ctx.deriveClassicalNahuatlDenominalVncOperation(base({
                nounStem: "arbitrary",
                sourceKind: "adverbial-nounstem",
                operationId: "adverbial-huia",
            })),
            ctx.deriveClassicalNahuatlDenominalVncOperation(base({
                nounStem: "arbitrary",
                sourceKind: "relational-compound-or-predicate",
                operationId: "relational-huia",
            })),
            ctx.deriveClassicalNahuatlDenominalVncOperation(base({
                nounStem: "arbitrary",
                sourceKind: "nounstem-plus-stock-i",
                operationId: "transitive-i-a",
            })),
            ctx.deriveClassicalNahuatlDenominalVncOperation(base({
                nounStem: "",
                sourceVerbStem: "tlīl-i-hui",
                operationId: "i-hui-to-o-a",
            })),
        ].map(frame => [frame.authorizationStatus, frame.blockReason]),
        [
            ["blocked", "selected-denominal-operation-not-licensed-for-source"],
            ["blocked", "selected-denominal-operation-not-licensed-for-source"],
            ["blocked", "selected-denominal-operation-not-licensed-for-source"],
            ["blocked", "selected-denominal-operation-not-licensed-for-source"],
            ["blocked", "selected-denominal-operation-not-licensed-for-source"],
            ["blocked", "no-andrews-licensed-denominal-operation-for-source"],
        ]
    );

    s.eq(
        "Restricted operations, source ranks, and continuation prerequisites enforce the Andrews inventory",
        (() => {
            const possession = derive({ nounStem: "pah", operationId: "possession-ti" });
            const arbitraryTla = derive({ nounStem: "arbitrary", operationId: "denominal-causative-tla" });
            const arbitraryProduce = derive({ nounStem: "arbitrary", operationId: "intransitive-o-a-produce" });
            const wrongRankAdverb = derive({ nounStem: "ilihuiz", operationId: "adverbial-huia" });
            const wrongRelationalPair = derive({
                nounStem: "icxi-pan",
                sourceKind: "relational-compound-or-predicate",
                operationId: "relational-o-a-transitive",
            });
            const possessionYa = derive({
                nounStem: "",
                sourceOperationFrame: possession,
                operationId: "inceptive-ti-ya",
                classChoice: "A",
            });
            return [
                arbitraryTla,
                arbitraryProduce,
                wrongRankAdverb,
                wrongRelationalPair,
                possessionYa,
            ].map(frame => [frame.authorizationStatus, frame.blockReason]);
        })(),
        Array.from({ length: 5 }, () => [
            "blocked",
            "selected-denominal-operation-not-licensed-for-source",
        ])
    );

    s.eq(
        "Possessive-source double objects are mechanically projected from the source NNC",
        (() => {
            const frame = derive({
                nounStem: "āxcā",
                sourceKind: "possessive-nnc-predicate",
                sourceState: "possessive",
                sourceSubject: "2sg",
                possessor: "1sg",
                objectPeople: ["3pl", "3pl"],
                operationId: "ti-a-causative-double-inceptive",
            });
            return {
                status: frame.authorizationStatus,
                objectPeople: frame.objectRequests.map(object => object.objectPerson),
                governors: frame.objectRequests.map(object => object.governor),
                projection: frame.participantProjection,
            };
        })(),
        {
            status: "authorized",
            objectPeople: ["2sg", "1sg"],
            governors: ["directive", "causative"],
            projection: {
                kind: "possessive-nnc-double-object-projection",
                sourceSubject: "2sg",
                sourceSubjectTargetRole: "causative-object",
                sourcePossessor: "1sg",
                sourcePossessorTargetRole: "applicative-object",
            },
        }
    );

    s.eq(
        "Included-possessor tense and exclamation conditions remain typed generation gates",
        [
            derive({
                nounStem: "icn-ō-pil",
                sourceKind: "possessive-nnc-predicate",
                sourceState: "possessive",
                possessor: "1sg",
                includedPossessorFamily: "recompense",
                tense: "imperfect",
                operationId: "included-possessor-ti",
            }),
            derive({
                nounStem: "tlahu-ēl-i-l",
                sourceKind: "possessive-nnc-predicate",
                sourceState: "possessive",
                possessor: "1sg",
                includedPossessorFamily: "misfortune",
                tense: "preterit",
                exclamatory: false,
                operationId: "included-possessor-ti",
            }),
            derive({
                nounStem: "tlahu-ēl-i-l",
                sourceKind: "possessive-nnc-predicate",
                sourceState: "possessive",
                possessor: "1sg",
                includedPossessorFamily: "misfortune",
                tense: "preterit",
                exclamatory: true,
                operationId: "included-possessor-ti",
            }),
        ].map(frame => [frame.authorizationStatus, frame.blockReason || frame.targetStem]),
        [
            ["blocked", "selected-denominal-operation-not-licensed-for-source"],
            ["blocked", "selected-denominal-operation-not-licensed-for-source"],
            ["authorized", "n-o-tlahu-ēl-i-l-ti"],
        ]
    );

    s.eq(
        "Boundary-conditioned source realization is recomputed before canonical finite inflection",
        [
            derive({
                nounStem: "ōn-xihui",
                sourceKind: "temporal-compound-nounstem",
                operationId: "temporal-tia",
            }),
            derive({
                nounStem: "toc",
                sourceKind: "nounstem-plus-stock-i",
                operationId: "transitive-i-a",
            }),
            derive({
                nounStem: "ez-zō",
                sourceKind: "deverbal-yo-nounstem",
                operationId: "deverbal-yo-hua",
            }),
        ].map(frame => [frame.authorizationStatus, frame.targetStem]),
        [
            ["authorized", "ōn-xiuh-tiā"],
            ["authorized", "toqu-i-ā"],
            ["authorized", "ez-zō-huā"],
        ]
    );

    s.eq(
        "A caller-selected semantic operation path is validated step by step",
        (() => {
            const authorized = ctx.deriveClassicalNahuatlDenominalVncOperationPath(base({
                nounStem: "mahui-z",
                operationId: "causative-tla-ti-lia-applicative",
                operationPath: [
                    "denominal-causative-tla",
                    "causative-tla-ti-lia-applicative",
                ],
            }));
            const mismatch = ctx.deriveClassicalNahuatlDenominalVncOperationPath(base({
                nounStem: "mahui-z",
                operationId: "inceptive-ti",
                operationPath: [
                    "denominal-causative-tla",
                    "causative-tla-ti-lia-applicative",
                ],
            }));
            return {
                authorized: [
                    authorized.authorizationStatus,
                    authorized.operationId,
                    authorized.targetStem,
                ],
                mismatch: [mismatch.authorizationStatus, mismatch.blockReason],
            };
        })(),
        {
            authorized: [
                "authorized",
                "causative-tla-ti-lia-applicative",
                "mahui-z-ti-liā",
            ],
            mismatch: ["blocked", "denominal-operation-path-final-mismatch"],
        }
    );

    const livePathCases = [
        {
            nounStem: "tlīl",
            operationId: "ti-hui-lia-causative",
            operationPath: ["inceptive-ti", "ti-hui-lia-causative"],
            surface: "quitlīltilia",
            formula: "#0-0+qui-0(tlīl-ti-lia)0+0-0#",
        },
        {
            nounStem: "ce",
            operationId: "ya-lia-causative",
            operationPath: ["inceptive-root-ya", "ya-lia-causative"],
            surface: "quicelia",
            formula: "#0-0+qui-0(ce-lia)0+0-0#",
        },
        {
            nounStem: "ce",
            operationId: "ya-lia-applicative",
            operationPath: ["inceptive-root-ya", "ya-lia-applicative"],
            surface: "quicelia",
            formula: "#0-0+qui-0(ce-lia)0+0-0#",
        },
        {
            nounStem: "tlīl",
            operationId: "ti-a-causative-single",
            operationPath: ["possession-ti", "ti-a-causative-single"],
            surface: "quitlīltia",
            formula: "#0-0+qui-0(tlīl-ti-a)0+0-0#",
        },
        {
            nounStem: "cuica",
            operationId: "ti-ia-applicative",
            operationPath: ["possession-ti", "ti-ia-applicative"],
            surface: "quicuicatia",
            formula: "#0-0+qui-0(cuica-t-ia)0+0-0#",
        },
        {
            nounStem: "tepon-āz",
            operationId: "o-a-to-i-l-huia",
            operationPath: ["intransitive-o-a-use", "o-a-to-i-l-huia"],
            surface: "quiteponāzilhuia",
            formula: "#0-0+qui-0(tepon-āz-i-l-huia)0+0-0#",
        },
    ];
    const ownerIssuedLiveRequests = livePathCases.map(testCase => {
        const inventory =
            ctx.prepareClassicalDenominalVncOperationPathInventory({
                nounStem: testCase.nounStem,
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                objectPeople: ["3sg"],
            });
        const choice = inventory.pathChoices.find(candidate =>
            candidate.operationId === testCase.operationId
            && JSON.stringify(candidate.operationPath)
                === JSON.stringify(testCase.operationPath)
        );
        return {
            testCase,
            inventory,
            choice,
            request: {
                ...choice.sourceRequest,
                operationId: choice.operationId,
                operationPath: choice.operationPath,
                classChoice: choice.finalClassChoice,
                classChoices: choice.classChoices,
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                objectPeople: ["3sg"],
            },
        };
    });

    s.eq(
        "The owner issues source-specific paths and every formerly impossible live operation executes exactly",
        ownerIssuedLiveRequests.map(({ testCase, inventory, choice, request }) => {
            const result = ctx.requestClassicalDenominalVncResult(request);
            return {
                operationId: testCase.operationId,
                inventoryAuthorized:
                    ctx.isClassicalNahuatlDenominalVncOperationPathInventory(
                        inventory
                    ),
                path: choice.operationPath,
                classChoices: choice.classChoices,
                status: result.authorizationStatus,
                surface: result.surfaceRealization,
                formula: result.formulaRealization,
            };
        }),
        ownerIssuedLiveRequests.map(({ testCase, choice }) => ({
            operationId: testCase.operationId,
            inventoryAuthorized: true,
            path: testCase.operationPath,
            classChoices: choice.classChoices,
            status: "authorized",
            surface: testCase.surface,
            formula: testCase.formula,
        }))
    );

    s.eq(
        "Every owner-issued live path is pointwise identical in scalar and paradigm evaluation",
        ownerIssuedLiveRequests.map(({ request }) => {
            const scalar = ctx.requestClassicalDenominalVncResult(request);
            const plan = ctx.prepareClassicalDenominalVncParadigmPlan({
                ...request,
                outputScope: "paradigm",
            });
            const [coordinate] =
                ctx.projectClassicalDenominalVncParadigmCoordinates(
                    plan,
                    [{
                        subject: "3sg",
                        mood: "indicative",
                        tense: "present",
                    }]
                );
            return [
                plan.authorizationStatus,
                coordinate.authorizationStatus,
                coordinate.surfaceRealization === scalar.surfaceRealization,
                coordinate.formulaRealization === scalar.formulaRealization,
            ];
        }),
        Array.from(
            { length: livePathCases.length },
            () => ["authorized", "authorized", true, true]
        )
    );

    s.eq(
        "Copied path inventories and caller-shaped inventory selections cannot authorize UI choices",
        (() => {
            const issued = ownerIssuedLiveRequests[0].inventory;
            const copied = JSON.parse(JSON.stringify(issued));
            const hostile =
                ctx.prepareClassicalDenominalVncOperationPathInventory({
                    nounStem: "tlīl",
                    operationPath: [
                        "inceptive-ti",
                        "ti-hui-lia-causative",
                    ],
                });
            return {
                issued:
                    ctx.isClassicalNahuatlDenominalVncOperationPathInventory(
                        issued
                    ),
                copied:
                    ctx.isClassicalNahuatlDenominalVncOperationPathInventory(
                        copied
                    ),
                hostile: [
                    hostile.authorizationStatus,
                    hostile.blockReason,
                ],
            };
        })(),
        {
            issued: true,
            copied: false,
            hostile: [
                "blocked",
                "denominal-path-inventory-selection-fields-rejected",
            ],
        }
    );

    const hostileFields = [
        ["targetStem", "poison"],
        ["targetClass", "C"],
        ["formula", "#poison#"],
        ["surface", "poison"],
        ["result", "poison"],
        ["lessonMetadata", { lesson: 55 }],
        ["canvasAnswer", "poison"],
    ];
    s.eq(
        "Caller targets, lesson metadata, formulas, surfaces, and answers cannot authorize output",
        hostileFields.map(([field, value]) => {
            const frame = ctx.evaluateClassicalNahuatlDenominalVnc(base({
                nounStem: "tlīl",
                operationId: "inceptive-ti",
                [field]: value,
            }));
            return [field, frame.authorizationStatus, frame.blockReason, frame.operationFrame?.sourceFrame?.rejectedAuthorityPath || ""];
        }),
        hostileFields.map(([field]) => [
            field,
            "blocked",
            "denominal-caller-authority-fields-rejected",
            `request.${field}`,
        ])
    );

    s.eq(
        "Hidden, symbolic, and accessor authority carriers fail closed before Source normalization",
        (() => {
            const hidden = base({
                nounStem: "tlīl",
                operationId: "inceptive-ti",
            });
            Object.defineProperty(hidden, "formula", {
                value: "#poison#",
                enumerable: false,
            });
            const symbolic = base({
                nounStem: "tlīl",
                operationId: "inceptive-ti",
            });
            symbolic[Symbol("formula")] = "#poison#";
            const accessor = base({
                nounStem: "tlīl",
                operationId: "inceptive-ti",
            });
            Object.defineProperty(accessor, "formula", {
                enumerable: true,
                get() {
                    throw new Error("hostile authority accessor must not run");
                },
            });
            const priorAccessor = base({
                nounStem: "tlīl",
                operationId: "inceptive-ti",
            });
            Object.defineProperty(priorAccessor, "sourceOperationFrame", {
                enumerable: true,
                get() {
                    throw new Error("hostile Source accessor must not run");
                },
            });
            return [hidden, symbolic, accessor, priorAccessor].map(request => {
                const frame =
                    ctx.evaluateClassicalNahuatlDenominalVnc(request);
                return [
                    frame.authorizationStatus,
                    frame.blockReason,
                    frame.operationFrame?.sourceFrame
                        ?.rejectedAuthorityPath || "",
                ];
            });
        })(),
        [
            [
                "blocked",
                "denominal-caller-authority-fields-rejected",
                "request.formula",
            ],
            [
                "blocked",
                "denominal-caller-authority-fields-rejected",
                "request.[symbol]",
            ],
            [
                "blocked",
                "denominal-caller-authority-fields-rejected",
                "request.formula",
            ],
            [
                "blocked",
                "denominal-caller-authority-fields-rejected",
                "request.sourceOperationFrame",
            ],
        ]
    );

    s.eq(
        "Object coercion cannot manufacture a typed Source constituent or licensed operation",
        [
            ctx.evaluateClassicalNahuatlDenominalVnc(base({
                nounStem: {
                    toString() {
                        return "tlīl";
                    },
                },
                operationId: "inceptive-ti",
            })),
            ctx.evaluateClassicalNahuatlDenominalVnc(base({
                nounStem: "tlīl",
                operationId: {
                    toString() {
                        return "inceptive-ti";
                    },
                },
            })),
        ].map(frame => [frame.authorizationStatus, frame.blockReason]),
        [
            ["blocked", "denominal-source-stem-required"],
            ["blocked", "denominal-operation-selection-required"],
        ]
    );

    const copiedPrior = JSON.parse(JSON.stringify(iHui));
    s.eq(
        "A copied or fabricated prior derivation cannot authorize a continuation",
        (() => {
            const copied = derive({
                nounStem: "",
                sourceOperationFrame: copiedPrior,
                operationId: "i-hui-to-o-a",
            });
            const issued = derive({
                nounStem: "",
                sourceOperationFrame: iHui,
                operationId: "i-hui-to-o-a",
            });
            return {
                copied: [copied.authorizationStatus, copied.blockReason],
                issued: [issued.authorizationStatus, issued.targetStem],
            };
        })(),
        {
            copied: ["blocked", "denominal-source-operation-frame-not-issued-by-service"],
            issued: ["authorized", "tlīl-o-ā"],
        }
    );

    const paradigmRequest = base({
        nounStem: "tlīl",
        operationId: "denominal-i-hui",
        outputScope: "paradigm",
    });
    const plan =
        ctx.prepareClassicalDenominalVncParadigmPlan(paradigmRequest);
    const coordinates = [
        { subject: "1sg", mood: "indicative", tense: "present" },
        { subject: "3sg", mood: "indicative", tense: "preterit" },
        { subject: "2pl", mood: "indicative", tense: "future" },
    ];
    const projected =
        ctx.projectClassicalDenominalVncParadigmCoordinates(
            plan,
            coordinates
        );
    const scalar = coordinates.map(coordinate => ctx.requestClassicalDenominalVncResult({
        ...paradigmRequest,
        ...coordinate,
        outputScope: "single",
    }));
    s.eq(
        "Prepared denominal paradigms are pointwise identical to scalar canonical VNC results",
        projected.map((row, index) => ({
            authorized: row.authorizationStatus,
            formula: row.formulaRealization,
            surface: row.surfaceRealization,
            scalarFormula: scalar[index].formulaRealization,
            scalarSurface: scalar[index].surfaceRealization,
        })),
        projected.map(row => ({
            authorized: "authorized",
            formula: row.formulaRealization,
            surface: row.surfaceRealization,
            scalarFormula: row.formulaRealization,
            scalarSurface: row.surfaceRealization,
        }))
    );
    const copiedPlan = Object.freeze({
        kind: plan.kind,
        version: plan.version,
        authorizationStatus: plan.authorizationStatus,
    });
    const copiedPlanReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:denominal",
            outputKind: "coordinate-projection",
            args: [copiedPlan, coordinates],
        });
    s.eq(
        "A copied prepared denominal plan cannot authorize coordinate projection",
        [
            copiedPlanReceipt.authorizationStatus,
            copiedPlanReceipt.blockReason,
            copiedPlanReceipt.canonicalResult,
        ],
        [
            "blocked",
            "classical-grammar-application-request-invalid:issued-authorized-prepared-plan-required",
            null,
        ]
    );

    const uiResult = ctx.requestClassicalDenominalVncResult(base({
        nounStem: "ā",
        operationId: "inceptive-ti",
        classChoice: "B",
    }));
    const uiProjection = ctx.buildClassicalNahuatlDenominalVncUiProjection(uiResult);
    s.eq(
        "UI projection exposes genuine choices and derived facts without source-audit carriers",
        {
            authorized: uiProjection.authorizationStatus,
            decisions: uiProjection.visibleDecisions,
            derivedFacts: uiProjection.derivedFacts,
            auditKeys: ["sourceDocument", "lineStart", "lineEnd", "claims", "counts", "closureReceipt"]
                .filter(field => Object.prototype.hasOwnProperty.call(uiProjection, field)),
            authority: [
                uiProjection.grammarAuthority,
                uiProjection.displayTextAuthority,
                uiProjection.formulaStringAuthority,
                uiProjection.surfaceStringAuthority,
            ],
        },
        {
            authorized: "authorized",
            decisions: {
                operationSelection: true,
                classSelection: true,
                participantSelection: false,
                subjectMoodTense: true,
            },
            derivedFacts: {
                sourceRank: "nounstem",
                classPolicy: "ti-by-source-final",
                participantProjection: "no-object-function",
            },
            auditKeys: [],
            authority: [false, false, false, false],
        }
    );

    s.eq(
        "The public denominal surface consumes the canonical inventory and exposes only typed decisions",
        {
            constructionOptions: (
                CLASSICAL_CONSTRUCTION_SELECT.match(/<option value="denominal-vnc"[^>]*>/gu)
                || []
            ).length,
            operationControls: (
                CLASSICAL_SHELL.match(/id="classical-denominal-vnc-operation"/gu)
                || []
            ).length,
            sourcePathControls: (
                CLASSICAL_SHELL.match(/id="classical-denominal-vnc-operation-path"/gu)
                || []
            ).length,
            derivedTargetInputs: (
                CLASSICAL_SHELL.match(/id="classical-denominal-vnc-(?:target-stem|target-class|formula|surface)"/gu)
                || []
            ).length,
            rendererConsumesCanonicalInventory:
                /CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM\?\.operations/u.test(CLASSICAL_RENDERING),
            rendererRequestsOwnerPathInventory:
                /prepareClassicalDenominalVncOperationPathInventory\(/u.test(
                    CLASSICAL_RENDERING
                ),
            rendererCarriesOwnerClassChoices:
                /classChoices:\s*selectedPathChoice\?\.classChoices/u.test(
                    CLASSICAL_RENDERING
                ),
            rendererHasNoAmbiguitySentinel:
                !/ambiguous-or-unlicensed-denominal-operation-path/u.test(
                    CLASSICAL_RENDERING
                ),
            rendererCallsApplication:
                /requestClassicalDenominalVncResult\(request\)/u.test(CLASSICAL_RENDERING),
            rendererCallsPreparedProjection:
                /prepareClassicalDenominalVncParadigmPlan\(request\)/u.test(CLASSICAL_RENDERING)
                && /projectClassicalDenominalVncParadigmCoordinates\(/u.test(CLASSICAL_RENDERING),
            rendererCarriesSourceAudit:
                /22972|24061|LESSONS54_55_SOURCE/u.test(CLASSICAL_RENDERING),
        },
        {
            constructionOptions: 1,
            operationControls: 1,
            sourcePathControls: 1,
            derivedTargetInputs: 0,
            rendererConsumesCanonicalInventory: false,
            rendererRequestsOwnerPathInventory: true,
            rendererCarriesOwnerClassChoices: true,
            rendererHasNoAmbiguitySentinel: true,
            rendererCallsApplication: true,
            rendererCallsPreparedProjection: true,
            rendererCarriesSourceAudit: false,
        }
    );

    s.eq(
        "Contract registry validates the source, inventory, operation, GCD/LCM, result, plan, coordinate, and UI contracts",
        (() => {
            const registry = ctx.getDefaultGrammarContractRegistry();
            const inventory = ctx.getClassicalNahuatlDenominalVncOperationInventory(base({
                nounStem: "tlīl",
            }));
            const result = ctx.evaluateClassicalNahuatlDenominalVnc(base({
                nounStem: "tlīl",
                operationId: "inceptive-ti",
            }));
            const ui = ctx.buildClassicalNahuatlDenominalVncUiProjection(result);
            const entries = [
                ["classical-nahuatl-denominal-vnc-source-frame", inventory.sourceFrame],
                ["classical-nahuatl-denominal-vnc-operation-inventory", inventory],
                [
                    "classical-nahuatl-denominal-vnc-operation-path-inventory",
                    ownerIssuedLiveRequests[0].inventory,
                ],
                ["classical-nahuatl-denominal-vnc-operation-frame", result.operationFrame],
                ["classical-nahuatl-denominal-vnc-grammar-frame", result.grammarFrame],
                ["classical-nahuatl-denominal-vnc-result-frame", result],
                ["classical-nahuatl-denominal-vnc-paradigm-plan", plan],
                ["classical-nahuatl-denominal-vnc-coordinate-frame", projected[0]],
                ["classical-nahuatl-denominal-vnc-ui-projection", ui],
            ];
            return entries.map(([contractKind, frame]) => {
                const inspection = ctx.inspectRegisteredGrammarContract(
                    registry,
                    frame,
                    { contractKind, version: 1 }
                );
                return [contractKind, inspection.status, inspection.errors];
            });
        })(),
        [
            ["classical-nahuatl-denominal-vnc-source-frame", "valid", []],
            ["classical-nahuatl-denominal-vnc-operation-inventory", "valid", []],
            [
                "classical-nahuatl-denominal-vnc-operation-path-inventory",
                "valid",
                [],
            ],
            ["classical-nahuatl-denominal-vnc-operation-frame", "valid", []],
            ["classical-nahuatl-denominal-vnc-grammar-frame", "valid", []],
            ["classical-nahuatl-denominal-vnc-result-frame", "valid", []],
            ["classical-nahuatl-denominal-vnc-paradigm-plan", "valid", []],
            ["classical-nahuatl-denominal-vnc-coordinate-frame", "valid", []],
            ["classical-nahuatl-denominal-vnc-ui-projection", "valid", []],
        ]
    );

    s.eq(
        "Production runtime installs one canonical denominal VNC grammar module and no test ledger",
        (() => {
            const runtime = fs.readFileSync(
                path.join(ROOT, "src", "runtime", "create_runtime.mjs"),
                "utf8"
            );
            const grammar = fs.readFileSync(
                path.join(ROOT, "src", "core", "classical", "denominal_vnc_grammar.mjs"),
                "utf8"
            );
            return {
                installerEntries: (
                    runtime.match(/\["src\/core\/classical\/denominal_vnc_grammar\.mjs"/gu)
                    || []
                ).length,
                importsTestLedger: /classical_lessons54_55_source_ledger/u.test(runtime + grammar),
                carriesSourceSpans: /sourceDocument|lineStart|lineEnd|closureReceipt/u.test(grammar),
                createsNawatLane: /Nawat|Pipil|orthography bridge|nawat-/u.test(grammar),
                carriesCurriculumOperationIds: /id:\s*["'](?:54|55)\./u.test(grammar),
                carriesLessonSelectorMetadata: /\blesson:\s*/u.test(grammar),
            };
        })(),
        {
            installerEntries: 1,
            importsTestLedger: false,
            carriesSourceSpans: false,
            createsNawatLane: false,
            carriesCurriculumOperationIds: false,
            carriesLessonSelectorMetadata: false,
        }
    );

    return s;
}

module.exports = { run };
