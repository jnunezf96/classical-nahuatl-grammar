"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const DEVELOPMENT_ROOT = path.resolve(
    ROOT,
    "..",
    "Classical_Nahuatl_Grammar"
);
const CANVAS_LINES = fs.readFileSync(
    path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
    "utf8"
).split(/\r?\n/u);
const LEDGER = fs.readFileSync(
    path.join(
        DEVELOPMENT_ROOT,
        "docs",
        "LESSONS_30_31_32_34_SOURCE_LEDGER.md"
    ),
    "utf8"
);
const SHELL_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"),
    "utf8"
);
const GRAMMAR_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "core", "classical", "nominal_construction.mjs"),
    "utf8"
);
const RENDERING_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
    "utf8"
);

function parseLedgerRows() {
    return LEDGER.split(/\r?\n/u)
        .filter(line => /^\| L(?:30|31|32|33|34)-/u.test(line))
        .map(line => {
            const fields = line.split("|").map(value => value.trim()).filter(Boolean);
            const [id, span, , disposition, family] = fields;
            const [lineStart, lineEnd] = span.split("-").map(Number);
            return {
                id,
                lineStart,
                lineEnd,
                disposition: disposition.replaceAll("`", ""),
                family: family.replaceAll("`", ""),
            };
        });
}

function findPresentationAuditKey(value, path = "frame") {
    if (!value || typeof value !== "object") return "";
    const blockedKeys = new Set([
        "sourceClosureFrame",
        "sourceSpans",
        "claimCount",
        "claimSignature",
        "dispositionCounts",
        "sourceReceipt",
        "unclassifiedClaimCount",
        "partialImplementationCount",
        "ledgerDocument",
    ]);
    for (const [key, item] of Object.entries(value)) {
        const nextPath = `${path}.${key}`;
        if (blockedKeys.has(key)) return nextPath;
        const nested = findPresentationAuditKey(item, nextPath);
        if (nested) return nested;
    }
    return "";
}

function lesson30Base(overrides = {}) {
    return {
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: "coy-ō",
            embedClass: "zero",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
        },
        relation: "adverb",
        route: "direct-adverb",
        adverbRole: "compared-manner",
        orientation: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
        ...overrides,
    };
}

function lesson30Object(overrides = {}) {
    return lesson30Base({
        relation: "object",
        route: "object",
        source: {
            embedStem: "xō-chi",
            embedClass: "zero",
            matrixStem: "tēm-o-a",
            matrixVerbClass: "C",
            matrixValence: "single-object",
        },
        subject: "1sg",
        ...overrides,
    });
}

function lesson31Base(overrides = {}) {
    return {
        constructionKind: "compound-nnc",
        source: {
            embedStem: "ā",
            embedClass: "tl",
            matrixStem: "cal",
            matrixClass: "tli",
        },
        structure: "integrated",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...overrides,
    };
}

function lesson32Base(overrides = {}) {
    return {
        constructionKind: "affective-nnc",
        source: {
            embedStem: "chichi",
            embedClass: "zero",
        },
        affectRoute: "compound",
        affectiveMatrix: "tzin",
        semanticReading: "ordinary-affective",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...overrides,
    };
}

function lesson34Base(overrides = {}) {
    return {
        constructionKind: "cardinal-numeral-nnc",
        value: 1,
        classifier: "basic",
        countKind: "ordinary",
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...overrides,
    };
}

function lesson33Base(overrides = {}) {
    return {
        constructionKind: "attitude-vnc",
        source: {
            sourceStem: "chōca",
            sourceValence: "intransitive",
            verbClass: "A",
        },
        attitude: "honorific",
        attitudeFormation: "applicative",
        honoredParticipant: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
        ...overrides,
    };
}

function cobPreteritAgentiveResult(ctx) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStage: "preterit-predicate",
            sourceStem: "tlami",
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: "absolutive",
    });
}

function attitudeDerivationRequest(request = {}) {
    const {
        constructionKind: _constructionKind,
        source = {},
        attitude = "",
        attitudeFormation = "",
        outputKind: _outputKind,
        ...operation
    } = request;
    return {
        ...source,
        ...operation,
        lateOperation: attitude,
        lateVariant: attitudeFormation,
    };
}

function requestAttitudeDerivation(ctx, request = {}) {
    return ctx.requestClassicalLateVncOperation(
        attitudeDerivationRequest(request)
    );
}

function executeAttitudeDerivationApplication(ctx, request = {}) {
    try {
        return ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:derivational-operation",
            outputKind: "scalar",
            args: [attitudeDerivationRequest(request)],
        });
    } catch (error) {
        return {
            authorizationStatus: "blocked",
            blockReason: String(error?.message || error),
            canonicalResult: null,
        };
    }
}

function evaluateClaimOwner(ctx, request = {}) {
    return request.constructionKind === "attitude-vnc"
        ? requestAttitudeDerivation(ctx, request)
        : ctx.evaluateClassicalNahuatlNominalConstruction(request);
}

function patchSource(request, patch = {}) {
    return {
        ...request,
        source: {
            ...(request.source || {}),
            ...patch,
        },
    };
}

function familyWitnessRequest(family, ctx) {
    if (family.startsWith("nominal-embed/")
        || family.startsWith("incorporated-")
        || family.startsWith("vnc/")) {
        if (family.startsWith("incorporated-object/")) {
            if (family === "incorporated-object/atli") {
                return patchSource(lesson30Object(), {
                    embedStem: "ā",
                    matrixStem: "ī",
                });
            }
            return lesson30Object();
        }
        if (family.startsWith("incorporated-complement/")) {
            if (family === "incorporated-complement/ambiguous-nuance") {
                return lesson30Base({
                    relation: "complement",
                    route: "complement",
                    orientation: "object",
                    complementKind: "pretending",
                    preciseAsIfNuance: true,
                });
            }
            const kind = family.endsWith("/changing") ? "changing" : "considering";
            return lesson30Base({
                relation: "complement",
                route: "complement",
                orientation: family.endsWith("/subject") ? "subject" : "object",
                complementKind: kind,
            });
        }
        if (family === "incorporated-adverb/tla-fusion") {
            return patchSource(lesson30Base({
                adverbRole: "means",
            }), {
                matrixStem: "tla-cui",
            });
        }
        if (family === "incorporated-adverb/direct-possessor-deletion") {
            return patchSource(lesson30Base({ adverbRole: "means" }), {
                embedStem: "mā",
            });
        }
        if (family === "incorporated-adverb/agentive-embed") {
            const resultFrame = ctx.evaluateClassicalNahuatlDeverbalNnc({
                constructionKind: "predicate-nominalization",
                nominalizationKind: "preterit-agentive",
                source: {
                    sourceStage: "preterit-predicate",
                    sourceStem: "pix-ca",
                    verbClass: "A",
                    sourceVoice: "active",
                    sourceValence: "intransitive",
                    sourceObjectPattern: "none",
                    sourceSubject: "3sg",
                },
                subject: "3sg",
                state: "absolutive",
            });
            return patchSource(lesson30Base(), {
                embedStem: "pix-ca-0",
                embedConstituent: {
                    kind: "preterit-agentive-nnc",
                    stem: "pix-ca-0",
                    resultFrame,
                },
            });
        }
        if (family === "nominal-embed/unique-lexeme") {
            return patchSource(lesson30Base(), { embedStem: "il" });
        }
        if (family === "nominal-embed/ih-family" || family === "nominal-embed/ih-interaction") {
            return patchSource(lesson30Base({
                embedReduplication: family.endsWith("interaction") ? "affinity" : "none",
            }), {
                embedStem: "ih",
            });
        }
        if (family === "nominal-embed/source-ambiguity") {
            return patchSource(lesson30Base({
                sourceAnalysis: "direct",
            }), {
                embedStem: "icxi",
                matrixStem: "toh-toca",
            });
        }
        if (family === "nominal-embed/reduplication") {
            return lesson30Base({ embedReduplication: "affinity" });
        }
        if (family === "incorporated-adverb/supplement"
            || family === "incorporated-adverb/supplement-subject") {
            return patchSource(lesson30Base({
                route: "supplement-subject",
                adverbRole: "means",
            }), { embedState: "possessive" });
        }
        if (family === "incorporated-adverb/supplement-object"
            || family === "incorporated-adverb/intimate-applicative-barrier"
            || family === "incorporated-adverb/less-intimate") {
            return patchSource(lesson30Object({
                relation: "adverb",
                route: "supplement-object",
                adverbRole: "means",
            }), {
                embedState: "possessive",
                possessionKind: family.endsWith("less-intimate") ? "less-intimate" : "intimate",
            });
        }
        if (family === "incorporated-adverb/passive-barrier") {
            return lesson30Base({
                route: "passive-adverbialized-subject",
                adverbRole: "means",
            });
        }
        const adverbRole = ({
            "incorporated-adverb/means": "means",
            "incorporated-adverb/place": "place",
            "incorporated-adverb/time-duration": "duration",
            "incorporated-adverb/cause-purpose": "purpose",
            "incorporated-adverb/manner": "manner",
            "incorporated-adverb/compared-manner": "compared-manner",
        })[family];
        return lesson30Base(adverbRole ? { adverbRole } : {});
    }
    if (family.startsWith("compound-nnc/")) {
        if (family === "compound-nnc/glottalized-embed") {
            return patchSource(lesson31Base(), {
                embedStem: "teō",
                matrixStem: "calli",
            });
        }
        if (family === "compound-nnc/negative-embed") {
            return patchSource(lesson31Base(), {
                embedStem: "ah",
            });
        }
        if (family === "compound-nnc/lexical-boundary") {
            return patchSource(lesson31Base(), {
                embedStem: "mah",
                matrixStem: "e-hu-a",
            });
        }
        if (family === "compound-nnc/unique-lexeme") {
            return patchSource(lesson31Base(), { embedStem: "chi" });
        }
        if (family === "compound-nnc/ca-matrix") {
            return patchSource(lesson31Base(), {
                matrixStem: "ca",
                matrixClass: "zero",
            });
        }
        if (family === "compound-nnc/ca-exclusion") {
            return patchSource(lesson31Base(), {
                matrixStem: "naca",
                matrixClass: "tl",
            });
        }
        if (family === "compound-nnc/yo-matrix") {
            return patchSource(lesson31Base(), {
                matrixStem: "yō",
                matrixClass: "zero",
            });
        }
        if (family === "compound-nnc/conjunctive") {
            return patchSource(lesson31Base({
                structure: "conjunctive",
            }), {});
        }
        if (family === "compound-nnc/recursion" || family === "compound-nnc/bracketing") {
            return patchSource(lesson31Base({
                bracketing: "compound-embed",
            }), {
                bracketing: "compound-embed",
            });
        }
        if (family === "compound-nnc/order-ambiguity") {
            return patchSource(lesson31Base(), {
                embedStem: "mā",
                matrixStem: "ōpōch",
            });
        }
        if (family === "compound-nnc/sex") {
            return patchSource(lesson31Base({ embedRole: "sex" }), { embedStem: "cihuā" });
        }
        if (family === "compound-nnc/progeny") {
            return patchSource(lesson31Base({ embedRole: "progeny" }), {
                matrixStem: "conē",
                matrixClass: "zero",
            });
        }
        if (family === "compound-nnc/fellowship") {
            return patchSource(lesson31Base({
                embedRole: "fellowship",
                state: "possessive",
                possessorOrientation: "matrix",
            }), {
                matrixStem: "poh",
                matrixClass: "zero",
            });
        }
        if (family === "compound-nnc/affinity") {
            return lesson31Base({ reduplication: "affinity", reduplicationTarget: "both" });
        }
        if (family === "compound-nnc/distributive") {
            return lesson31Base({ reduplication: "distributive-varietal", reduplicationTarget: "embed" });
        }
        return lesson31Base();
    }
    if (family.startsWith("affective/") || family.startsWith("pil/")
        || family === "nnc-to-vnc/denominal") {
        if (family === "nnc-to-vnc/denominal") {
            return lesson32Base({
                affectiveOutputKind: "denominal-vnc",
                affectiveMatrix: "zol",
                denominalKind: "inchoative",
            });
        }
        if (family === "affective/pil-pol") return lesson32Base({ affectiveMatrix: "pōl" });
        if (family === "affective/lexicalized-class") {
            return patchSource(
                lesson32Base({ affectiveMatrix: "pōl" }),
                { embedStem: "cal", embedClass: "tli" }
            );
        }
        if (family === "affective/tzin-ton-class") return lesson32Base({ affectiveMatrix: "tōn" });
        if (family === "affective/mass-delimitation") {
            return lesson32Base({ affectiveMatrix: "tzin", semanticReading: "mass-delimited" });
        }
        if (family === "affective/vocative") return lesson32Base({ state: "vocative" });
        if (family === "affective/ton-exception") {
            return patchSource(lesson32Base({ affectiveMatrix: "tōn" }), { embedStem: "quimich" });
        }
        if (family === "affective/zol") {
            return patchSource(lesson32Base({
                affectiveMatrix: "zol",
                animacy: "nonanimate",
            }), { animacy: "nonanimate" });
        }
        if (family === "affective/affinity-possessive") {
            return lesson32Base({ subject: "3pl", state: "possessive", reduplication: "affinity" });
        }
        if (family === "affective/affinity-absolutive") {
            return lesson32Base({ subject: "3pl", reduplication: "affinity" });
        }
        if (family === "affective/nonanimate-affinity"
            || family === "affective/nonanimate-reduplication") {
            return patchSource(lesson32Base({
                subject: "3pl",
                affectiveMatrix: "zol",
                animacy: "nonanimate",
                reduplication: "affinity",
            }), { animacy: "nonanimate" });
        }
        if (family.startsWith("pil/")) {
            const reading = family === "pil/noble"
                ? "pil-noble"
                : family === "pil/honorific-vocative"
                    ? "pil-honorific-vocative"
                    : family === "pil/reading"
                        ? "pil-appendage"
                        : "pil-child";
            return lesson32Base({
                affectiveMatrix: family === "pil/honorific-vocative" ? "tzin" : "pil",
                semanticReading: reading,
                state: family === "pil/honorific-vocative" ? "vocative" : "absolutive",
                pilChildRoute: family === "pil/child-affective" ? "affective" : "simple",
            });
        }
        if (family.startsWith("affective/flawed")
            || family === "affective/defect-entity"
            || family === "affective/chicken"
            || family === "affective/flawing-purpose") {
            const chicken = family === "affective/chicken";
            return patchSource(lesson32Base({
                affectRoute: "flawed-subject",
                affectiveMatrix: "",
                defectAnalysis: "defect",
            }), {
                embedStem: chicken
                    ? "cuā-naca"
                    : family === "affective/defect-entity"
                        ? "ix-te-coh-coy-o-c"
                        : "tzapa",
                embedClass: "tli",
            });
        }
        return lesson32Base();
    }
    if (family.startsWith("attitude/")) {
        if (family === "attitude/pejorative-preterit-embed") {
            return lesson33Base({
                attitude: "pejorative",
                attitudeFormation: "preterit-embed",
                subject: "1sg",
            });
        }
        if (family === "attitude/reverential-double") {
            const honorificSource = requestAttitudeDerivation(
                ctx,
                lesson33Base()
            );
            return lesson33Base({
                attitude: "reverential",
                attitudeFormation: "preterit-embed",
                source: {
                    sourceStem: honorificSource.operationFrame?.targetStem,
                    sourceValence:
                        honorificSource.operationFrame?.targetValence,
                    verbClass: honorificSource.operationFrame?.targetClass,
                    objectKind: "reflexive",
                },
                attitudeSourceClosureFrame: honorificSource,
            });
        }
        if (family === "attitude/honorific-causative") {
            return lesson33Base({ attitudeFormation: "causative" });
        }
        if (family === "attitude/honorific-preterit-embed") {
            return patchSource(lesson33Base({
                attitudeFormation: "preterit-embed",
            }), {
                sourceValence: "mainline-reflexive",
                objectKind: "reflexive",
            });
        }
        if (family === "attitude/honorific-projective") {
            const previewRequest = {
                sourceStem: "itta",
                sourceValence: "specific-projective",
                verbClass: "A",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "applicative",
                derivationType: "applicative",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                applicativeObjectKind: "reflexive",
                applicativeObjectPerson: "",
                sourceInitialISelection: "real",
            };
            const preview = ctx.evaluateClassicalNahuatlVncApplication(previewRequest);
            const optionId = preview.controlFrame?.derivationOptionInventory?.options?.[0]?.optionId || "";
            return patchSource(lesson33Base({
                honoredParticipant: "object",
                requestedDerivation: "applicative",
                derivationType: "applicative",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                sourceInitialISelection: "real",
                applicativeObjectKind: "reflexive",
                honorificDerivationOptionId: optionId,
            }), {
                sourceStem: "itta",
                sourceValence: "specific-projective",
                verbClass: "A",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
        }
        if (family === "attitude/honorific-derived-source") {
            const derivedSourceRequest = {
                sourceStem: "chīhua",
                sourceValence: "specific-projective",
                verbClass: "A",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                sourceSubject: "3sg",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const preview =
                ctx.evaluateClassicalNahuatlVncApplication(
                    derivedSourceRequest
                );
            const optionId = preview.controlFrame?.derivationOptionInventory
                ?.options?.[0]?.optionId || "";
            const sourceApplicationFrame =
                ctx.evaluateClassicalNahuatlVncApplication({
                    ...derivedSourceRequest,
                    derivationOptionId: optionId,
                });
            const source =
                ctx.getClassicalNahuatlVncContinuationSourceConstituents(
                    sourceApplicationFrame.resultFrame
                );
            return lesson33Base({
                source: {
                    ...source,
                    sourceObjectRequests: source?.sourceObjectRequests || [],
                },
                sourceDerivationKind: "causative",
                sourceApplicationFrame,
                honoredParticipant: "object",
            });
        }
        if (family === "attitude/honorific-projective-causative") {
            return patchSource(lesson33Base({
                attitudeFormation: "causative",
                honoredParticipant: "object",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            }), {
                sourceStem: "chōca",
                sourceValence: "specific-projective",
                verbClass: "A",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
        }
        if (family === "attitude/honorific-irregular") {
            return patchSource(lesson33Base(), { sourceStem: "miqui", verbClass: "B" });
        }
        if (family === "attitude/honorific-motion") {
            return patchSource(lesson33Base({ attitudeFormation: "causative" }), {
                sourceStem: "huī-tz",
                verbClass: "A",
            });
        }
        if (family === "attitude/compound-matrix") {
            return patchSource(lesson33Base({
                attitude: "pejorative",
                attitudeFormation: "preterit-embed",
                attitudeCompoundTarget: "matrix",
            }), {
                sourceStem: "itta-ti-cāhua",
                sourceEmbedStem: "itta",
                sourceMatrixStem: "cāhua",
                sourceValence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                compoundMatrixClass: "A",
            });
        }
        if (family === "attitude/compound-embed") {
            return patchSource(lesson33Base({
                attitudeCompoundTarget: "embed",
            }), {
                sourceStem: "chōca-ti-o",
                sourceEmbedStem: "chōca",
                sourceMatrixStem: "o",
                compoundMatrixClass: "A",
            });
        }
        return lesson33Base();
    }
    if (family.startsWith("numeral/") || family === "sentence/adjectival-modification") {
        const valueByFamily = {
            "numeral/one": 1,
            "numeral/vnc-adverb": 1,
            "numeral/two-four": 3,
            "numeral/four-boundary": 4,
            "numeral/five": 5,
            "numeral/six-nine": 7,
            "numeral/ten-fifteen": 15,
            "numeral/order-20": 20,
            "numeral/order-400": 400,
            "numeral/order-8000": 8000,
            "numeral/conjunction": 21,
            "numeral/conjunctive-compound": 11,
            "numeral/downgraded-multiplier": 340,
            "numeral/conjunction-agreement": 21,
            "numeral/higher-order-link": 8421,
            "numeral/conjunction-restriction": 203,
            "numeral/reduplication": 3,
            "numeral/reduplication-exception": 7,
            "numeral/conjunction-reduplication": 21,
            "numeral/modifier": 3,
        };
        if (family === "numeral/vnc-adverb") {
            return patchSource(lesson34Base({
                numeralOutputKind: "vnc-adverb",
                subject: "3sg",
            }), {
                matrixStem: "yā",
                matrixVerbClass: "B",
                matrixValence: "intransitive",
            });
        }
        const classifier = ({
            "numeral/classifier-rock": "rock",
            "numeral/classifier-recursion": "rock",
            "numeral/classifier-row": "row",
            "numeral/classifier-thing": "thing",
            "numeral/classifier-cob": "cob",
            "numeral/classifier-selection": "rock",
            "numeral/twenty-classifier-tecpan": "tecpan",
            "numeral/twenty-classifier-ipil": "ipil",
            "numeral/twenty-classifier-quimil": "quimil",
            "numeral/measure": "measure",
            "sentence/adjectival-modification": "measure",
        })[family] || "basic";
        const value = classifier === "cob" ? 39
            : ["tecpan", "ipil", "quimil"].includes(classifier) ? 40
                : valueByFamily[family] || 1;
        const measureComposition = family === "sentence/adjectival-modification"
            ? "with-measured-nnc"
            : "measure-only";
        const request = lesson34Base({
            value,
            classifier,
            countKind: family === "numeral/gross-possessive" ? "gross" : "ordinary",
            subject: family === "numeral/gross-possessive" ? "3pl" : "3common",
            state: family === "numeral/gross-possessive" ? "possessive" : "absolutive",
            animacy: family === "numeral/gross-possessive" ? "animate" : "nonanimate",
            possessor: family === "numeral/gross-possessive" ? "3pl" : "",
            reduplication: family.includes("reduplication") ? "affinity" : "none",
            modifier: family === "numeral/modifier" ? "oc" : "none",
            measureComposition,
        });
        return patchSource(request, {
            cobPreteritAgentiveResultFrame:
                classifier === "cob"
                    ? cobPreteritAgentiveResult(ctx)
                    : undefined,
            conjunctionForm: family === "numeral/conjunctive-compound" ? "compound" : "",
            higherOrderLink: "īpan",
            classifierSelectionExplicit: family === "numeral/classifier-selection",
            classifierEmbeddedIn: family === "numeral/classifier-recursion" ? "nnc" : "",
            referentClass: classifier === "tecpan" ? "people"
                : classifier === "ipil" ? "paper"
                    : classifier === "quimil" ? "blankets" : "",
            measureStem: classifier === "measure" ? "tla-māma-l" : "",
            measureClass: "tli",
            measuredStem: measureComposition === "with-measured-nnc" ? "tlacuā-l" : "",
            measuredClass: "tli",
        });
    }
    return null;
}

function familyNegativeRequest(request) {
    if (request.constructionKind === "nominal-embed-vnc") {
        return patchSource(request, { embedStem: "" });
    }
    if (request.constructionKind === "compound-nnc") {
        return patchSource(request, { matrixStem: "" });
    }
    if (request.constructionKind === "affective-nnc") {
        if (request.affectiveOutputKind === "denominal-vnc") {
            return { ...request, affectiveMatrix: "invented-matrix" };
        }
        return patchSource(request, { embedStem: "" });
    }
    if (request.constructionKind === "attitude-vnc") {
        return { ...request, attitude: "invented-attitude" };
    }
    return { ...request, value: 0 };
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons30_34_closure");
    const ledgerRows = parseLedgerRows();
    const claims = ledgerRows.map(row => ({
        ...row,
        lesson: row.id.slice(1, 3),
    }));
    const dispositionCounts = Object.fromEntries([
        "existing-canonical-rule",
        "new-canonical-rule",
        "read-only-evidence",
        "genuinely-blocked",
    ].map(disposition => [
        disposition,
        claims.filter(claim => claim.disposition === disposition).length,
    ]));

    s.eq("source closure has the exact classified count and disposition totals", {
        count: claims.length,
        dispositions: dispositionCounts,
        unclassified: claims.filter(claim => !claim.id || !claim.family).length,
    }, {
        count: 146,
        dispositions: {
            "existing-canonical-rule": 14,
            "new-canonical-rule": 120,
            "read-only-evidence": 11,
            "genuinely-blocked": 1,
        },
        unclassified: 0,
    });

    s.eq("the test-only closure claims preserve the ledger span-by-span", claims.map(claim => ({
        id: claim.id,
        lineStart: claim.lineStart,
        lineEnd: claim.lineEnd,
        disposition: claim.disposition,
        family: claim.family,
    })), ledgerRows);

    const lessonBounds = {
        30: [10314, 11094],
        31: [11098, 11510],
        32: [11514, 11879],
        33: [11883, 12221],
        34: [12225, 12730],
    };
    const uncovered = [];
    Object.entries(lessonBounds).forEach(([lesson, [start, end]]) => {
        for (let lineNumber = start; lineNumber <= end; lineNumber += 1) {
            const line = String(CANVAS_LINES[lineNumber - 1] || "").trim();
            if (!line
                || /^## PDF Page/u.test(line)
                || /^(?:\d+ )?Lesson \d+/iu.test(line)
                || /^(?:Nominal Incorporation|Compound Nounstems|Affective NNCs|Honorific, Pejorative VNCs|Cardinal Numbers|\d+)$/u.test(line)) {
                continue;
            }
            if (!claims.some(claim => claim.lesson === String(lesson)
                && claim.lineStart <= lineNumber
                && claim.lineEnd >= lineNumber)) {
                uncovered.push(`${lesson}:${lineNumber}`);
            }
        }
    });
    s.eq("every substantive transcription line belongs to a classified source span", uncovered, []);

    const restrictionProofs = new Map([
        ["incorporated-complement/ambiguous-nuance", "nominal-embed-toca-as-if-precise-nuance-genuinely-blocked"],
    ]);
    const canonicalAttitudeRule = {
        "attitude/honorific-gate": "honorific-gate",
        "attitude/honorific-causative": "honorific-causative",
        "attitude/honorific-irregular": "honorific-irregular",
        "attitude/honorific-motion": "honorific-irregular",
        "attitude/honorific-applicative": "honorific-applicative",
        "attitude/honorific-projective": "honorific-projective",
        "attitude/honorific-derived-source": "honorific-applicative",
        "attitude/honorific-projective-causative": "honorific-causative",
        "attitude/honorific-preterit-embed": "honorific-preterit-embed",
        "attitude/reverential-double": "reverential-double",
        "attitude/pejorative-preterit-embed": "pejorative-preterit-embed",
        "attitude/compound-embed": "attitude-compound",
        "attitude/compound-matrix": "attitude-compound",
    };
    const proofByFamily = new Map();
    [...new Set(claims.map(claim => claim.family))].forEach(family => {
        const request = familyWitnessRequest(family, ctx);
        if (!request) {
            proofByFamily.set(family, { missingRequest: true });
            return;
        }
        const attitudeDerivation =
            request.constructionKind === "attitude-vnc";
        const positive = evaluateClaimOwner(ctx, request);
        const expectedRestriction = restrictionProofs.get(family) || "";
        const semanticRules = positive.operationFrame?.appliedSemanticRules || [];
        const canonicalRules = attitudeDerivation
            ? positive.operationFrame?.ruleFamilies || []
            : positive.canonicalResult?.operationFrame?.ruleFamilies || [];
        const expectedCanonicalAttitudeRule =
            canonicalAttitudeRule[family] || "";
        const positiveMechanicallyProven = expectedRestriction
            ? positive.authorizationStatus === "blocked" && positive.blockReason === expectedRestriction
            : attitudeDerivation
                ? positive.authorizationStatus === "authorized"
                    && Boolean(
                        positive.baseApplicationFrame
                        && positive.operationFrame
                        && positive.finalTypedVncSlotFrame
                        && positive.finiteSurfaceFrame
                    )
                    && Boolean(
                        expectedCanonicalAttitudeRule
                        && canonicalRules.includes(
                            expectedCanonicalAttitudeRule
                        )
                    )
                : positive.authorizationStatus === "authorized"
                    && Boolean(positive.sourceFrame && positive.operationFrame
                        && positive.canonicalResult
                        && positive.canonicalTargetEvaluator)
                    && semanticRules.includes(family);
        const negative = evaluateClaimOwner(
            ctx,
            familyNegativeRequest(request)
        );
        const hostileRequest = {
            ...request,
            displayFormula: `#${family}#`,
            resultSurface: family,
        };
        const hostile = attitudeDerivation
            ? executeAttitudeDerivationApplication(ctx, hostileRequest)
            : evaluateClaimOwner(ctx, hostileRequest);
        const plan = attitudeDerivation
            ? ctx.buildClassicalNahuatlParadigm(
                attitudeDerivationRequest(request),
                [{
                    subject: request.subject || "3sg",
                    mood: request.mood || "indicative",
                    tense: request.tense || "present",
                }]
            )
            : ctx.buildClassicalNahuatlNominalConstructionParadigmPlan({
                ...request,
                subjects: [request.subject || "3sg"],
            });
        const row = attitudeDerivation
            ? plan.rows?.[0]
            : ctx.projectClassicalNahuatlNominalConstructionParadigmCoordinates(
                plan
            )?.[0];
        proofByFamily.set(family, {
            positiveStatus: positive.authorizationStatus,
            positiveBlockReason: positive.blockReason || "",
            semanticRules,
            canonicalRules,
            paradigmStatus: row?.authorizationStatus
                || row?.closureFrame?.authorizationStatus
                || "",
            paradigmBlockReason: row?.blockReason
                || row?.closureFrame?.blockReason
                || "",
            positiveMechanicallyProven,
            negativeBlocked: negative.authorizationStatus === "blocked",
            hostileBlocked: attitudeDerivation
                ? hostile.authorizationStatus === "blocked"
                    && hostile.canonicalResult === null
                    && hostile.blockReason
                        === "classical-grammar-application-request-invalid:forbidden-authority:displayFormula"
                : hostile.authorizationStatus === "blocked"
                    && hostile.callerSuppliedAuthorityAccepted === false,
            scalarParadigmParity: attitudeDerivation
                ? Boolean(row)
                    && row.scalarEquivalent === true
                    && row.closureFrame?.authorizationStatus
                        === positive.authorizationStatus
                    && row.closureFrame?.formulaRealization
                        === (positive.formulaRealization || "")
                : Boolean(row)
                    && row.scalarEquivalent === true
                    && row.authorizationStatus
                        === positive.authorizationStatus
                    && row.formulaRealization
                        === (positive.formulaRealization || ""),
            noAuditCarrier: !findPresentationAuditKey(positive)
                && !findPresentationAuditKey(plan)
                && !findPresentationAuditKey(row),
        });
    });
    const claimProofFailures = claims.flatMap(claim => {
        const proof = proofByFamily.get(claim.family);
        const failed = !proof
            || proof.missingRequest
            || !proof.positiveMechanicallyProven
            || !proof.negativeBlocked
            || !proof.hostileBlocked
            || !proof.scalarParadigmParity
            || !proof.noAuditCarrier;
        return failed ? [{ id: claim.id, family: claim.family, proof }] : [];
    });
    s.eq(
        "every individual source item resolves to an executable positive or restriction path plus negative, hostile, scalar-paradigm, and presentation-firewall proof",
        claimProofFailures,
        []
    );

    s.ok("source spans, dispositions, counts, closure receipts, and inventories remain outside runtime grammar",
        typeof ctx.buildClassicalNahuatlLessons303134ClosureFrame === "undefined"
        && typeof ctx.evaluateClassicalNahuatlLessons303134Construction
            === "undefined"
        && typeof ctx.buildClassicalNahuatlLessons303134ParadigmPlan
            === "undefined"
        && typeof ctx.projectClassicalNahuatlLessons303134ParadigmCoordinates
            === "undefined"
        && typeof ctx.buildClassicalNahuatlLessons303134UiProjection
            === "undefined"
        && !GRAMMAR_SOURCE.includes("transcriptionLineStart")
        && !GRAMMAR_SOURCE.includes("dispositionCounts")
        && !GRAMMAR_SOURCE.includes("claimSignature")
        && !GRAMMAR_SOURCE.includes("source-closure-frame"));
    const retiredNominalApiNames = [
        "CLASSICAL_NAHUATL_LESSON30_ADVERB_ROLES",
        "CLASSICAL_NAHUATL_LESSON31_EMBED_ROLES",
        "CLASSICAL_NAHUATL_LESSON32_AFFECTIVE_MATRICES",
        "CLASSICAL_NAHUATL_LESSON34_CLASSIFIERS",
        "isClassicalNahuatlLessons3034SourceAuthorization",
        "evaluateClassicalNahuatlLessons303134Construction",
        "isClassicalNahuatlLessons303134ConstructionFrame",
        "buildClassicalNahuatlLessons303134ParadigmPlan",
        "isClassicalNahuatlLessons303134ParadigmPlan",
        "projectClassicalNahuatlLessons303134ParadigmCoordinates",
        "isClassicalNahuatlLessons303134ParadigmCoordinate",
        "buildClassicalNahuatlLessons303134UiProjection",
    ];
    const canonicalNominalApiNames = [
        "CLASSICAL_NAHUATL_NOMINAL_EMBED_ADVERB_ROLES",
        "CLASSICAL_NAHUATL_NOMINAL_COMPOUND_EMBED_ROLES",
        "CLASSICAL_NAHUATL_AFFECTIVE_NOMINAL_MATRICES",
        "CLASSICAL_NAHUATL_CARDINAL_NOMINAL_CLASSIFIERS",
        "isClassicalNahuatlNominalConstructionSourceAuthorization",
        "evaluateClassicalNahuatlNominalConstruction",
        "isClassicalNahuatlNominalConstructionResult",
        "buildClassicalNahuatlNominalConstructionParadigmPlan",
        "isClassicalNahuatlNominalConstructionParadigmPlan",
        "projectClassicalNahuatlNominalConstructionParadigmCoordinates",
        "isClassicalNahuatlNominalConstructionParadigmCoordinate",
        "buildClassicalNahuatlNominalConstructionUiProjection",
        "isClassicalNahuatlNominalConstructionUiProjection",
    ];
    s.eq("lesson-named nominal APIs are removed with no compatibility aliases", {
        retired: retiredNominalApiNames.filter(
            name => typeof ctx[name] !== "undefined"
        ),
        missingCanonical: canonicalNominalApiNames.filter(
            name => typeof ctx[name] === "undefined"
        ),
    }, {
        retired: [],
        missingCanonical: [],
    });
    s.ok("source-audit inventory has no Lessons 30–34 presentation markup",
        !SHELL_SOURCE.includes("data-classical-construction-source-ledger")
        && !SHELL_SOURCE.includes("data-classical-construction-source-count")
        && !SHELL_SOURCE.includes("data-classical-construction-grammar-closure"));
    s.ok("the three-panel shell exposes explicit choices without putting grammar or audit evidence in Result",
        [
            "classical-nominal-embed-source-constituent",
            "classical-nominal-embed-possession-kind",
            "classical-compound-nnc-bracketing",
            "classical-compound-nnc-reduplication-target",
            "classical-affective-defect-analysis",
            "classical-cardinal-modifier",
        ].every(id => SHELL_SOURCE.includes(`id="${id}"`))
        && !RENDERING_SOURCE.includes("#2 Grammar · typed operation")
        && !RENDERING_SOURCE.includes("Source closure ·")
        && !RENDERING_SOURCE.includes("Source audit"));

    const authorized30 = ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Base());
    s.eq("Lesson 30 compared-manner source takes the subject orientation and canonical VNC path", {
        status: authorized30.authorizationStatus,
        relation: authorized30.operationFrame?.relation,
        role: authorized30.operationFrame?.semanticRole,
        orientation: authorized30.operationFrame?.orientation,
        evaluator: authorized30.canonicalTargetEvaluator,
        embedAgent: authorized30.operationFrame?.embedIsAgent,
        embedSubject: authorized30.operationFrame?.embedIsGrammaticalSubject,
    }, {
        status: "authorized",
        relation: "adverb",
        role: "compared-manner",
        orientation: "subject",
        evaluator: "evaluateClassicalNahuatlVncApplication",
        embedAgent: false,
        embedSubject: false,
    });
    const object30 = ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Object());
    s.eq("Lesson 30 object incorporation consumes one valence position", {
        status: object30.authorizationStatus,
        source: object30.operationFrame?.sourceValencePositionCount,
        target: object30.operationFrame?.targetValencePositionCount,
        targetValence: object30.operationFrame?.targetSourceValence,
    }, { status: "authorized", source: 1, target: 0, targetValence: "intransitive" });
    s.eq("Lesson 30 blocks an incorporated object on an intransitive matrix",
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Object({
            source: { ...lesson30Object().source, matrixValence: "intransitive" },
        })).blockReason,
        "incorporated-object-requires-transitive-matrix");
    s.eq("Lesson 30 keeps compared-manner orientation conditioned by matrix valence", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Base({ orientation: "object" })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Base({
            source: { ...lesson30Base().source, matrixValence: "single-object" },
            orientation: "object",
        })).operationFrame?.orientation,
    ], ["intransitive-compared-manner-requires-subject-orientation", "object"]);
    s.eq("Lesson 30 subject/object supplement routes enforce source state and matrix valence", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Base({
            route: "supplement-subject",
            adverbRole: "means",
            source: { ...lesson30Base().source, embedState: "possessive" },
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Base({
            route: "supplement-subject",
            adverbRole: "means",
        })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Object({
            relation: "adverb",
            route: "supplement-object",
            adverbRole: "means",
            source: {
                ...lesson30Object().source,
                embedState: "possessive",
                matrixStem: "mil-chihui-lia",
            },
        })).blockReason,
    ], ["authorized", "supplement-subject-embed-must-be-possessive", "intimate-supplement-object-applicative-source-blocked"]);
    s.eq("Lesson 30 complement ambiguity blocks only the unlicensed precise nuance", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Base({
            relation: "complement",
            route: "complement",
            orientation: "subject",
            complementKind: "considering",
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson30Base({
            relation: "complement",
            route: "complement",
            orientation: "object",
            complementKind: "pretending",
            preciseAsIfNuance: true,
        })).blockReason,
    ], [
        "authorized",
        "nominal-embed-toca-as-if-precise-nuance-genuinely-blocked",
    ]);
    const issuedAgentiveEmbedRequest = familyWitnessRequest(
        "incorporated-adverb/agentive-embed",
        ctx
    );
    const issuedAgentiveResult =
        issuedAgentiveEmbedRequest.source.embedConstituent.resultFrame;
    const copiedAgentiveResult = JSON.parse(JSON.stringify(
        issuedAgentiveResult
    ));
    s.eq("Lesson 30 agentive embeds require the matching live owner-issued preterit-agentive NNC prerequisite", [
        ctx.evaluateClassicalNahuatlNominalConstruction(
            issuedAgentiveEmbedRequest
        ).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(patchSource(
            issuedAgentiveEmbedRequest,
            {
                embedConstituent: {
                    kind: "preterit-agentive-nnc",
                    stem: "pix-ca-0",
                },
            }
        )).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(patchSource(
            issuedAgentiveEmbedRequest,
            {
                embedConstituent: {
                    kind: "preterit-agentive-nnc",
                    stem: "pix-ca-0",
                    resultFrame: copiedAgentiveResult,
                },
            }
        )).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(patchSource(
            issuedAgentiveEmbedRequest,
            {
                embedStem: "coy-ō",
                embedConstituent: {
                    kind: "preterit-agentive-nnc",
                    stem: "coy-ō",
                    resultFrame: issuedAgentiveResult,
                },
            }
        )).blockReason,
    ], [
        "authorized",
        "preterit-agentive-embed-constituent-mismatch",
        "preterit-agentive-embed-constituent-mismatch",
        "preterit-agentive-embed-constituent-mismatch",
    ]);

    const authorized31 = ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base());
    s.eq("Lesson 31 matrix class governs an integrated NNC compound", {
        status: authorized31.authorizationStatus,
        stem: authorized31.operationFrame?.compoundStem,
        matrixClass: authorized31.operationFrame?.matrixClass,
        evaluator: authorized31.canonicalTargetEvaluator,
    }, {
        status: "authorized",
        stem: "ā-cal",
        matrixClass: "tli",
        evaluator: "buildClassicalNahuatlNncSlotFrame",
    });
    [authorized30, authorized31,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base()),
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base())]
        .forEach((frame, index) => {
            const projection = ctx.buildClassicalNahuatlNominalConstructionUiProjection(frame);
            s.eq(`Lesson ${[30, 31, 32, 34][index]} presentation projection carries no source-audit metadata`, [
                findPresentationAuditKey(frame),
                findPresentationAuditKey(projection),
            ], ["", ""]);
            s.ok(
                `Lesson ${[30, 31, 32, 34][index]} presentation projection is owner-issued`,
                ctx.isClassicalNahuatlNominalConstructionUiProjection(
                    projection
                )
            );
            s.eq(`Lesson ${[30, 31, 32, 34][index]} Result projection contains generated results only`,
                Object.keys(projection.result).sort(),
                ["formulaRealization", "panel", "readOnly", "sentenceSurface", "wordSurface"]);
        });
    const forgedNominalResult = Object.freeze({
        kind: "classical-nahuatl-nominal-construction-result-frame",
        version: 1,
        authorizationStatus: "authorized",
        sourceFrame: authorized31.sourceFrame,
        operationFrame: authorized31.operationFrame,
        formulaRealization: authorized31.formulaRealization,
        wordSurface: authorized31.wordSurface,
        sentenceSurface: authorized31.sentenceSurface,
    });
    const issuedUiProjection =
        ctx.buildClassicalNahuatlNominalConstructionUiProjection(
            authorized31
        );
    const copiedUiProjection = Object.freeze({
        ...issuedUiProjection,
        source: Object.freeze({ ...issuedUiProjection.source }),
        grammar: Object.freeze({ ...issuedUiProjection.grammar }),
        result: Object.freeze({ ...issuedUiProjection.result }),
    });
    s.eq("nominal UI projection requires an owner-issued canonical result and remains owner-issued itself", [
        ctx.buildClassicalNahuatlNominalConstructionUiProjection(
            forgedNominalResult
        ),
        ctx.isClassicalNahuatlNominalConstructionUiProjection(
            issuedUiProjection
        ),
        ctx.isClassicalNahuatlNominalConstructionUiProjection(
            copiedUiProjection
        ),
    ], [null, true, false]);
    s.eq("Lesson 31 linked and integrated possessor orientation stays typed", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base({
            structure: "linked-connective-t",
            possessorOrientation: "matrix",
        })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base({
            structure: "linked-connective-t",
            possessorOrientation: "embed",
        })).authorizationStatus,
    ], ["linked-compound-requires-embed-possessor-orientation", "authorized"]);
    s.eq("Lesson 31 lexical boundary rules are conditioned", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base({
            source: {
                ...lesson31Base().source,
                embedStem: "mah",
                matrixStem: "e-hu-a",
            },
        })).operationFrame?.embedShape?.realizedStem,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base({
            source: {
                ...lesson31Base().source,
                embedStem: "mah",
                matrixStem: "cal",
            },
        })).operationFrame?.embedShape?.realizedStem,
    ], ["may", "mah"]);
    s.eq("Lesson 31 conjunction, recursion, fellowship, affinity, and distributive gates interact", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base({
            structure: "conjunctive",
            bracketing: "compound-embed",
            source: {
                ...lesson31Base().source,
                bracketing: "compound-embed",
            },
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base({
            state: "absolutive",
            source: {
                ...lesson31Base().source,
                matrixStem: "poh",
                matrixClass: "zero",
            },
        })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base({
            reduplication: "affinity",
            reduplicationTarget: "both",
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson31Base({
            reduplication: "distributive-varietal",
            reduplicationTarget: "matrix",
        })).blockReason,
    ], [
        "authorized",
        "fellowship-poh-is-possessive-state-only",
        "authorized",
        "nominal-compound-distributive-varietal-reduplication-requires-embed",
    ]);

    const affectiveMatrices = ["pil", "pōl", "tzin", "tōn", "zol"];
    s.eq("Lesson 32 mechanically realizes every affective matrix class family",
        affectiveMatrices.map(matrix => {
            const frame = ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
                affectiveMatrix: matrix,
                animacy: matrix === "zol" ? "nonanimate" : "animate",
                source: {
                    ...lesson32Base().source,
                    animacy: matrix === "zol" ? "nonanimate" : "animate",
                },
            }));
            return [matrix, frame.authorizationStatus, frame.operationFrame?.nounClass];
        }),
        [
            ["pil", "authorized", "zero"],
            ["pōl", "authorized", "zero"],
            ["tzin", "authorized", "zero"],
            ["tōn", "authorized", "zero"],
            ["zol", "authorized", "tli"],
        ]);
    s.eq("Lesson 32 matrix restrictions block invalid animate zol and non-tzin mass delimitation", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            affectiveMatrix: "zol",
        })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            affectiveMatrix: "pōl",
            semanticReading: "mass-delimited",
        })).blockReason,
    ], ["affective-zol-requires-nonanimate-embed", "mass-delimitation-requires-tzin"]);
    s.eq("Lesson 32 vocative and flawed-subject restrictions remain mechanical", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            state: "vocative",
            vocativeForm: "abbreviated",
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            affectiveMatrix: "pōl",
            state: "vocative",
            vocativeForm: "abbreviated",
        })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            affectRoute: "flawed-subject",
            source: { embedStem: "tzapa", embedClass: "tli" },
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            affectRoute: "flawed-subject",
            source: { embedStem: "ordinary", embedClass: "tli" },
        })).blockReason,
    ], ["authorized", "abbreviated-vocative-requires-tzin", "authorized", "flawed-subject-requires-licensed-defect-stem"]);
    s.eq("Lesson 32 affinity number behavior differs by state", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            subject: "3pl",
            reduplication: "affinity",
        })).canonicalResult?.numberFrame?.ruleId,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            subject: "3pl",
            state: "possessive",
            reduplication: "affinity",
            possessiveAffinityPlural: "silent",
        })).canonicalResult?.numberFrame?.num1,
    ], [
        "affective-nominal-absolutive-affinity-number-follows-singular-num1",
        "⎕",
    ]);
    const zolInchoative = ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
        affectiveOutputKind: "denominal-vnc",
        denominalKind: "inchoative",
        affectiveMatrix: "zol",
    }));
    const zolCausative = ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
        affectiveOutputKind: "denominal-vnc",
        denominalKind: "causative",
        affectiveMatrix: "zol",
    }));
    s.eq("Lesson 32 zol denominal consequences use the canonical finite VNC path", {
        inchoative: [zolInchoative.authorizationStatus, zolInchoative.operationFrame?.stem, zolInchoative.formulaRealization],
        causative: [zolCausative.authorizationStatus, zolCausative.operationFrame?.stem, zolCausative.formulaRealization],
        evaluatorShared: zolInchoative.canonicalTargetEvaluator === authorized30.canonicalTargetEvaluator,
    }, {
        inchoative: ["authorized", "zol-i-hui", "#0-0(zol-i-hui)0+0-0#"],
        causative: ["authorized", "zol-o-ā", "#0-0+tla(zol-o-a)0+0-0#"],
        evaluatorShared: true,
    });
    s.eq("Lesson 32 tzin and pōl denominals are blocked as free VNCs and routed to attitude matrices", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            affectiveOutputKind: "denominal-vnc",
            affectiveMatrix: "tzin",
        })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base({
            affectiveOutputKind: "denominal-vnc",
            affectiveMatrix: "pōl",
        })).blockReason,
    ], [
        "tzin-denominal-vnc-is-restricted-to-honorific-matrix-operation",
        "pol-denominal-vnc-is-restricted-to-pejorative-matrix-operation",
    ]);
    const attitudeBase = {
        sourceStem: "chōca",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
    };
    const tzinHonorificConsumer = ctx.requestClassicalLateVncOperation({
            ...attitudeBase,
            lateOperation: "honorific",
            lateVariant: "applicative",
            honoredParticipant: "subject",
        });
    const polPejorativeConsumer = ctx.requestClassicalLateVncOperation({
            ...attitudeBase,
            subject: "1sg",
            lateOperation: "pejorative",
            lateVariant: "preterit-embed",
        });
    s.eq("the restricted tzin and pōl consequences execute only through typed canonical Lesson 33 consumers", [
        tzinHonorificConsumer.kind,
        ["authorized", "blocked"].includes(tzinHonorificConsumer.authorizationStatus),
        polPejorativeConsumer.authorizationStatus,
    ], ["classical-nahuatl-late-vnc-derivation-closure-frame", true, "authorized"]);
    const inclusiveHonorific = requestAttitudeDerivation(
        ctx,
        lesson33Base()
    );
    const inclusivePejorative = requestAttitudeDerivation(ctx, lesson33Base({
        attitude: "pejorative",
        attitudeFormation: "preterit-embed",
        subject: "1sg",
    }));
    s.eq("Lesson 33 executes only through the canonical attitude VNC owner", {
        honorific: [
            inclusiveHonorific.authorizationStatus,
            inclusiveHonorific.kind,
            inclusiveHonorific.operationFrame?.targetStem,
            inclusiveHonorific.formulaRealization,
        ],
        pejorative: [
            inclusivePejorative.authorizationStatus,
            inclusivePejorative.operationFrame?.targetStem,
            inclusivePejorative.formulaRealization,
        ],
    }, {
        honorific: [
            "authorized",
            "classical-nahuatl-late-vnc-derivation-closure-frame",
            "chōqui-liā",
            "#0-0+m-o(chōqui-lia)0+0-0#",
        ],
        pejorative: [
            "authorized",
            "chōca-⎕-pol-o-ā",
            "#ni-0(chōca-⎕-pol-o-a)0+0-0#",
        ],
    });
    s.eq("Lesson 33 restrictions remain mechanical in the shared VNC owner", [
        requestAttitudeDerivation(ctx, lesson33Base({
            subject: "1sg",
        })).blockReason,
        requestAttitudeDerivation(ctx, lesson33Base({
            attitude: "pejorative",
            attitudeFormation: "applicative",
        })).blockReason,
        requestAttitudeDerivation(ctx, lesson33Base({
            attitude: "reverential",
            attitudeFormation: "causative",
        })).blockReason,
    ], [
        "self-honorific-not-authorized",
        "licensed-attitude-formation-required",
        "reverential-requires-engine-issued-honorific-source",
    ]);
    const typedDerivedSourceRequest = familyWitnessRequest(
        "attitude/honorific-derived-source",
        ctx
    );
    const typedReverentialRequest = familyWitnessRequest(
        "attitude/reverential-double",
        ctx
    );
    s.eq("Lesson 33 derived-source and reverential routes reject missing and copied prerequisite authority", [
        ctx.evaluateClassicalNahuatlLateVncDerivation(
            attitudeDerivationRequest({
                ...typedDerivedSourceRequest,
                sourceApplicationFrame: undefined,
            })
        ).blockReason,
        ctx.evaluateClassicalNahuatlLateVncDerivation(
            attitudeDerivationRequest({
                ...typedDerivedSourceRequest,
                sourceApplicationFrame: JSON.parse(JSON.stringify(
                    typedDerivedSourceRequest.sourceApplicationFrame
                )),
            })
        ).blockReason,
        ctx.evaluateClassicalNahuatlLateVncDerivation(
            attitudeDerivationRequest({
                ...typedReverentialRequest,
                attitudeSourceClosureFrame: undefined,
            })
        ).blockReason,
        ctx.evaluateClassicalNahuatlLateVncDerivation(
            attitudeDerivationRequest({
                ...typedReverentialRequest,
                attitudeSourceClosureFrame: JSON.parse(JSON.stringify(
                    typedReverentialRequest.attitudeSourceClosureFrame
                )),
            })
        ).blockReason,
    ], [
        "engine-issued-derived-source-application-required",
        "engine-issued-derived-source-application-required",
        "reverential-requires-engine-issued-honorific-source",
        "reverential-requires-engine-issued-honorific-source",
    ]);
    const nominalAttitudeAttempt =
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson33Base());
    s.eq("the nominal owner rejects attitude derivation instead of retaining a parallel Lesson 33 lane", [
        nominalAttitudeAttempt.authorizationStatus,
        nominalAttitudeAttempt.blockReason,
        GRAMMAR_SOURCE.includes("attitude-vnc"),
    ], [
        "blocked",
        "recognized-typed-construction-kind-required",
        false,
    ]);

    const numeralValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 400, 8000, 8421];
    s.ok("Lesson 34 authorizes the complete basic vigesimal order sample",
        numeralValues.every(value => ctx.evaluateClassicalNahuatlNominalConstruction(
            lesson34Base({ value })
        ).authorizationStatus === "authorized"));
    s.eq("Lesson 34 preserves one-through-four conditioned stem shapes", [1, 2, 3, 4].map(value => (
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            value,
            classifier: "rock",
        })).operationFrame?.stem
    )), ["cen-te", "ōn-te", "ēx-te", "nāuh-te"]);
    s.eq("Lesson 34 classifier families and referent gates are executable", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({ value: 2, classifier: "rock" })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({ value: 2, classifier: "row" })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({ value: 2, classifier: "thing" })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(patchSource(
            lesson34Base({ value: 39, classifier: "cob" }),
            {
                cobPreteritAgentiveResultFrame:
                    cobPreteritAgentiveResult(ctx),
            }
        )).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({ value: 40, classifier: "cob" })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            value: 40,
            classifier: "tecpan",
            source: { referentClass: "people" },
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            value: 40,
            classifier: "quimil",
            source: { referentClass: "paper" },
        })).blockReason,
    ], ["authorized", "authorized", "authorized", "authorized",
        "cob-classifier-is-not-licensed-beyond-thirty-nine", "authorized",
        "quimil-referent-class-not-licensed"]);
    const cobMissingPrerequisite =
        ctx.evaluateClassicalNahuatlNominalConstruction(
            lesson34Base({ value: 39, classifier: "cob" })
        );
    const cobForgedPrerequisite =
        ctx.evaluateClassicalNahuatlNominalConstruction(patchSource(
            lesson34Base({ value: 39, classifier: "cob" }),
            {
                cobPreteritAgentiveResultFrame: JSON.parse(JSON.stringify(
                    cobPreteritAgentiveResult(ctx)
                )),
            }
        ));
    s.eq("Lesson 34 cob counts consume only the owner-issued tlamic preterit-agentive prerequisite", [
        cobMissingPrerequisite.blockReason,
        cobForgedPrerequisite.blockReason,
    ], [
        "cob-twenty-route-requires-engine-issued-tlamic-preterit-agentive",
        "cob-twenty-route-requires-engine-issued-tlamic-preterit-agentive",
    ]);
    s.eq("Lesson 34 ordinary and gross count gates interact with animacy, state, and possessor", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            countKind: "gross",
            subject: "3common",
        })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            countKind: "gross",
            subject: "3pl",
            state: "possessive",
            animacy: "animate",
            possessor: "3pl",
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            state: "possessive",
        })).blockReason,
    ], ["gross-count-requires-plural-subject", "authorized",
        "cardinal-numeral-nnc-is-absolutive-only-except-gross-count"]);
    s.eq("Lesson 34 conjunction, reduplication, modifiers, and measures remain typed", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({ value: 21 })).operationFrame?.conjunctionDirection,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            value: 21,
            reduplication: "affinity",
        })).authorizationStatus,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            value: 3,
            modifier: "oc",
        })).canonicalResult?.sentenceSurface?.startsWith("Oc "),
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            value: 3,
            classifier: "measure",
            source: { measureStem: "mecatl", measureClass: "tl" },
        })).authorizationStatus,
    ], ["higher-to-lower", "authorized", true, "authorized"]);
    const measuredNncRequest = lesson34Base({
        value: 1,
        classifier: "measure",
        measureComposition: "with-measured-nnc",
        modifier: "quēn",
        source: {
            measureStem: "tla-māma-l",
            measureClass: "tli",
            measuredStem: "tlacuā-l",
            measuredClass: "tli",
        },
    });
    const measuredNnc = ctx.evaluateClassicalNahuatlNominalConstruction(measuredNncRequest);
    s.eq("Lesson 34 measure NNC is the typed principal clause in measured-NNC adjectival modification", {
        status: measuredNnc.authorizationStatus,
        relation: measuredNnc.operationFrame?.adjectivalModificationFrame?.relation,
        principal: measuredNnc.operationFrame?.adjectivalModificationFrame?.principalClauseRole,
        modifier: measuredNnc.operationFrame?.adjectivalModificationFrame?.modifierClauseRole,
        sharedReferent: measuredNnc.operationFrame?.adjectivalModificationFrame?.sharedReferent,
        sentenceHasBoth: String(measuredNnc.sentenceSurface || "").includes(
            measuredNnc.wordSurface || ""
        )
            && String(measuredNnc.sentenceSurface || "").includes(
                measuredNnc.operationFrame?.adjectivalModificationFrame?.measuredNncResult?.wordSurface
            ),
    }, {
        status: "authorized",
        relation: "adjectival-modification",
        principal: "measure-nnc",
        modifier: "thing-measured-nnc",
        sharedReferent: true,
        sentenceHasBoth: true,
    });
    s.eq("Lesson 34 measured-NNC composition blocks missing and structurally incompatible sources", [
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            classifier: "measure",
            measureComposition: "with-measured-nnc",
            source: { measureStem: "meca", measureClass: "tl" },
        })).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base({
            classifier: "basic",
            measureComposition: "with-measured-nnc",
        })).blockReason,
    ], [
        "measure-composition-requires-measured-nnc-stem-and-class",
        "measured-nnc-composition-requires-measure-classifier",
    ]);
    const measuredPlan =
        ctx.prepareClassicalNominalConstructionParadigmPlan(
            measuredNncRequest
        );
    const measuredCoordinates =
        ctx.projectClassicalNominalConstructionParadigmCoordinates(
            measuredPlan
        );
    s.eq("Lesson 34 measured-NNC full-paradigm projection reuses its scalar composition", [
        measuredCoordinates.length,
        measuredCoordinates[0]?.authorizationStatus,
        measuredCoordinates[0]?.scalarFrame?.sentenceSurface,
    ], [1, "authorized", measuredNnc.sentenceSurface]);

    [lesson30Base(), lesson31Base(), lesson32Base(), lesson34Base()].forEach((request, index) => {
        const hostile = ctx.evaluateClassicalNahuatlNominalConstruction({
            ...request,
            displayFormula: "#hostile#",
        });
        s.ok(`Lesson ${[30, 31, 32, 34][index]} rejects display/formula authority`, hostile.authorizationStatus === "blocked"
            && hostile.blockReason.includes("caller-supplied-derived-authority-rejected"));
    });
    const hostileAttitudeReceipt = executeAttitudeDerivationApplication(ctx, {
        ...lesson33Base(),
        displayFormula: "#hostile#",
    });
    s.eq("Lesson 33 rejects display/formula authority through the shared VNC application owner", [
        hostileAttitudeReceipt.authorizationStatus,
        hostileAttitudeReceipt.blockReason,
        hostileAttitudeReceipt.canonicalResult,
    ], [
        "blocked",
        "classical-grammar-application-request-invalid:forbidden-authority:displayFormula",
        null,
    ]);
    const hiddenDerivedAuthority = { ...lesson30Base() };
    Object.defineProperty(hiddenDerivedAuthority, "displayFormula", {
        value: "#hidden-forgery#",
        enumerable: false,
    });
    const symbolAuthority = Symbol("forged-authority");
    const symbolOwnedAuthority = { ...lesson30Base() };
    Object.defineProperty(symbolOwnedAuthority, symbolAuthority, {
        value: "#symbol-forgery#",
        enumerable: false,
    });
    let accessorReadCount = 0;
    const accessorAuthority = { ...lesson30Base() };
    Object.defineProperty(accessorAuthority, "concealedAuthority", {
        enumerable: false,
        get() {
            accessorReadCount += 1;
            return "#accessor-forgery#";
        },
    });
    const hiddenLexicalSource = { ...lesson30Base().source };
    Object.defineProperty(hiddenLexicalSource, "embedLexicalRule", {
        value: "glottalized-long-vowel",
        enumerable: false,
    });
    const hiddenLexicalAuthority = {
        ...lesson30Base(),
        source: hiddenLexicalSource,
    };
    s.eq("nominal authority scans reject non-enumerable, symbol-owned, accessor, and hidden lexical carriers without invoking accessors", [
        ctx.evaluateClassicalNahuatlNominalConstruction(
            hiddenDerivedAuthority
        ).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(
            symbolOwnedAuthority
        ).blockReason,
        ctx.evaluateClassicalNahuatlNominalConstruction(
            accessorAuthority
        ).blockReason,
        accessorReadCount,
        ctx.evaluateClassicalNahuatlNominalConstruction(
            hiddenLexicalAuthority
        ).blockReason,
    ], [
        "caller-supplied-derived-authority-rejected:request.displayFormula",
        "caller-supplied-derived-authority-rejected:request.[[non-string-key]]",
        "caller-supplied-derived-authority-rejected:request.concealedAuthority.[[accessor]]",
        0,
        "caller-supplied-lexical-authority-rejected:request.source.embedLexicalRule",
    ]);
    const issuedSourceAuthorization =
        authorized30.sourceAuthorizationFrame;
    const copiedSourceAuthorization = JSON.parse(JSON.stringify(
        issuedSourceAuthorization
    ));
    s.eq("nominal-construction lexical facts are owner-issued read-only Source authorization", [
        ctx.isClassicalNahuatlNominalConstructionSourceAuthorization(
            issuedSourceAuthorization
        ),
        issuedSourceAuthorization.lexicalFactsReadOnly,
        issuedSourceAuthorization.sourceConstituentsOnly,
        issuedSourceAuthorization.documentaryExampleAuthority,
        ctx.isClassicalNahuatlNominalConstructionSourceAuthorization(
            copiedSourceAuthorization
        ),
    ], [true, true, true, false, false]);
    [
        ["embedLexicalRule", "glottalized-long-vowel"],
        ["matrixTlaFusion", true],
        ["matrixIsApplicative", true],
        ["embedSemanticClass", "body-part"],
        ["agentiveEmbed", true],
        ["sourceAnalysisAmbiguous", true],
    ].forEach(([key, value]) => {
        const frame =
            ctx.evaluateClassicalNahuatlNominalConstruction({
                ...lesson30Base(),
                source: {
                    ...lesson30Base().source,
                    [key]: value,
                },
            });
        s.eq(`Lesson 30 rejects caller-minted ${key}`, [
            frame.authorizationStatus,
            frame.blockReason,
        ], [
            "blocked",
            `caller-supplied-lexical-authority-rejected:request.source.${key}`,
        ]);
    });
    [
        ["specialMatrix", "ca"],
        ["uniqueLexemeLicensed", true],
        ["embedIsCompound", true],
        ["firstConjunctVestige", "tl"],
    ].forEach(([key, value]) => {
        const frame =
            ctx.evaluateClassicalNahuatlNominalConstruction({
                ...lesson31Base(),
                source: {
                    ...lesson31Base().source,
                    [key]: value,
                },
            });
        s.eq(`Lesson 31 rejects caller-minted ${key}`, [
            frame.authorizationStatus,
            frame.blockReason,
        ], [
            "blocked",
            `caller-supplied-lexical-authority-rejected:request.source.${key}`,
        ]);
    });
    [
        ["defectStemLicensed", true],
        ["defectEntityAmbiguous", true],
        ["lexicalizedSpecialMeaning", true],
    ].forEach(([key, value]) => {
        const frame =
            ctx.evaluateClassicalNahuatlNominalConstruction({
                ...lesson32Base(),
                source: {
                    ...lesson32Base().source,
                    [key]: value,
                },
            });
        s.eq(`Lesson 32 rejects caller-minted ${key}`, [
            frame.authorizationStatus,
            frame.blockReason,
        ], [
            "blocked",
            `caller-supplied-lexical-authority-rejected:request.source.${key}`,
        ]);
    });
    s.eq("curriculum lesson metadata cannot select or change a grammar path", [
        ctx.evaluateClassicalNahuatlNominalConstruction({
            ...lesson31Base(),
            lesson: 30,
        }).constructionKind,
        ctx.evaluateClassicalNahuatlNominalConstruction({
            ...lesson31Base(),
            constructionKind: "",
            lesson: 31,
        }).blockReason,
    ], ["compound-nnc", "recognized-typed-construction-kind-required"]);

    [lesson30Base(), lesson31Base(), lesson32Base(), lesson34Base()].forEach((request, index) => {
        const scalar = ctx.evaluateClassicalNahuatlNominalConstruction(request);
        const applicationScalar =
            ctx.requestClassicalNominalConstructionResult(request);
        const plan = ctx.prepareClassicalNominalConstructionParadigmPlan({
            ...request,
            subjects: [request.subject],
            states: request.constructionKind === "nominal-embed-vnc" ? undefined : [request.state],
        });
        const projected =
            ctx.projectClassicalNominalConstructionParadigmCoordinates(plan);
        s.eq(`Lesson ${[30, 31, 32, 34][index]} application boundary preserves the canonical scalar result`, {
            status: applicationScalar.authorizationStatus,
            formula: applicationScalar.formulaRealization,
            word: applicationScalar.wordSurface,
        }, {
            status: scalar.authorizationStatus,
            formula: scalar.formulaRealization,
            word: scalar.wordSurface,
        });
        s.eq(`Lesson ${[30, 31, 32, 34][index]} paradigm coordinate is scalar-equivalent`, {
            count: projected.length,
            status: projected[0]?.authorizationStatus,
            formula: projected[0]?.formulaRealization,
            scalar: projected[0]?.scalarEquivalent,
            gcd: scalar.greatestCommonDivisor.satisfied,
            selectedConstruction:
                scalar.leastCommonMultiple.selectedValues["construction-kind"],
            scalarScope:
                scalar.leastCommonMultiple.selectedValues[
                    "scalar-versus-full-paradigm"
                ],
            planScope:
                plan.leastCommonMultiple.selectedValues[
                    "scalar-versus-full-paradigm"
                ],
        }, {
            count: 1,
            status: scalar.authorizationStatus,
            formula: scalar.formulaRealization,
            scalar: true,
            gcd: true,
            selectedConstruction: request.constructionKind,
            scalarScope: "scalar",
            planScope: "full-paradigm",
        });
        let hostileProjectionFailure = "";
        try {
            ctx.projectClassicalNominalConstructionParadigmCoordinates(plan, [{
                ...plan.coordinates[0],
                surface: "hostile",
            }]);
        } catch (error) {
            hostileProjectionFailure = String(error?.message || error);
        }
        s.eq(
            `Lesson ${[30, 31, 32, 34][index]} paradigm projection rejects hostile coordinates at the application boundary`,
            hostileProjectionFailure,
            "classical-grammar-application-request-invalid:forbidden-authority:surface"
        );
        const copiedPlan = Object.freeze({
            kind: plan.kind,
            version: plan.version,
            authorizationStatus: plan.authorizationStatus,
        });
        const copiedPlanReceipt =
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "grammar:nominal-construction",
                outputKind: "coordinate-projection",
                args: [copiedPlan],
            });
        s.eq(
            `Lesson ${[30, 31, 32, 34][index]} copied paradigm plan cannot project`,
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
        s.eq(`Lesson ${[30, 31, 32, 34][index]} paradigm plan and rows carry no source-audit metadata`, [
            findPresentationAuditKey(plan),
            findPresentationAuditKey(projected),
        ], ["", ""]);
    });
    const attitudeScalar = requestAttitudeDerivation(ctx, lesson33Base());
    const attitudeParadigm = ctx.buildClassicalNahuatlParadigm(
        attitudeDerivationRequest(lesson33Base()),
        [{ subject: "3sg", mood: "indicative", tense: "present" }]
    );
    s.eq("Lesson 33 shared VNC paradigm is pointwise equivalent to its application scalar", {
        status: attitudeParadigm.rows?.[0]?.closureFrame?.authorizationStatus,
        formula:
            attitudeParadigm.rows?.[0]?.closureFrame?.formulaRealization,
        scalarEquivalent: attitudeParadigm.rows?.[0]?.scalarEquivalent,
    }, {
        status: attitudeScalar.authorizationStatus,
        formula: attitudeScalar.formulaRealization,
        scalarEquivalent: true,
    });

    [
        authorized30,
        authorized31,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson32Base()),
        attitudeScalar,
        ctx.evaluateClassicalNahuatlNominalConstruction(lesson34Base()),
        ctx.buildClassicalNahuatlNominalConstructionParadigmPlan(lesson31Base()),
    ].forEach((frame, index) => {
        s.eq(`registered typed frame ${index + 1} satisfies its grammar contract`,
            ctx.inspectRegisteredGrammarContract(ctx.getDefaultGrammarContractRegistry(), frame).status,
            "valid");
    });

    return s;
}

module.exports = { run };
