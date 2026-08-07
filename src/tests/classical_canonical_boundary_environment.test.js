"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_canonical_boundary_environment");
    const canonicalInventory = typeof ctx.getClassicalNahuatlCanonicalSourceStemInventory === "function"
        ? ctx.getClassicalNahuatlCanonicalSourceStemInventory("vnc")
        : [];
    const nemiRecord = canonicalInventory.find(record => record.stem === "nemi" && record.valenceDisplay === "intransitive") || null;

    s.eq(
        "Canonical nemi supplies the authorized Class B phone environment",
        nemiRecord
            ? {
                stem: nemiRecord.stem,
                valence: nemiRecord.valenceDisplay,
                citation: nemiRecord.citation,
                grammarAuthority: nemiRecord.grammarAuthority,
                formulaStringAuthority: nemiRecord.formulaStringAuthority
            }
            : null,
        {
            stem: "nemi",
            valence: "intransitive",
            citation: "(nemi)",
            grammarAuthority: false,
            formulaStringAuthority: false
        }
    );

    s.eq(
        "Canonical nemi causative realizes m-to-n before tiā",
        (() => {
            if (typeof ctx.createClassicalNahuatlVncApplication !== "function") {
                return null;
            }
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const frame = application.evaluate({
                sourceStem: "nemi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedDerivation: "causative",
                requestedSourceVoice: "active",
                causativeObjectKind: "specific-projective",
                causativeResultSubject: "3sg",
                derivationOptionId: "causative:type-two:o-hua:nem-o-hua"
            });
            const option = frame.resultFrame?.selectedMachineryFrame?.derivationOperationFrame?.selectedOption || null;
            const environment = option?.targetConstruction?.classBFinalMToNBoundaryFrame || null;
            return {
                status: frame.authorizationStatus,
                stem: frame.resultFrame?.selectedMachineryFrame?.stem || "",
                changeRule: environment?.changeRule || "",
                environmentStatus: environment?.authorizationStatus || "",
                sourceStem: environment?.canonicalSourceStemRecord?.stem || ""
            };
        })(),
        {
            status: "authorized",
            stem: "nen-tiā",
            changeRule: "class-b-m-to-n",
            environmentStatus: "authorized",
            sourceStem: "nemi"
        }
    );

    s.eq(
        "A required phone environment without a canonical verbstem fails closed",
        typeof ctx.buildClassicalNahuatlVncDerivationBoundaryEnvironmentFrame === "function"
            ? (() => {
                const frame = ctx.buildClassicalNahuatlVncDerivationBoundaryEnvironmentFrame({
                    sourceDescriptor: { sourceStem: "xemi", sourceValence: "intransitive" },
                    inputStem: "xem",
                    outputStem: "xen",
                    followingMorpheme: "tiā",
                    ruleId: "cn-l7-74-phonological-changes",
                    changeRule: "class-b-m-to-n"
                });
                return {
                    status: frame.authorizationStatus,
                    reason: frame.blockReason,
                    canonicalSource: frame.canonicalSourceStemRecord
                };
            })()
            : null,
        {
            status: "blocked",
            reason: "typed-source-verbstem-analysis-required",
            canonicalSource: null
        }
    );

    s.eq(
        "Canonical picker values use their Andrews perfective class before phone realization",
        (() => {
            const classBuilder = typeof ctx.buildClassicalNahuatlVerbstemClassFrame === "function"
                ? ctx.buildClassicalNahuatlVerbstemClassFrame
                : null;
            const boundaryBuilder = typeof ctx.buildClassicalNahuatlDerivationalBoundarySpellingFrame === "function"
                ? ctx.buildClassicalNahuatlDerivationalBoundarySpellingFrame
                : null;
            if (!classBuilder || !boundaryBuilder) {
                return null;
            }
            return ["cui", "cuā"].map(stem => {
                const record = canonicalInventory.find(candidate => candidate.stem === stem && candidate.valenceDisplay === "transitive") || null;
                const classFrame = record
                    ? classBuilder(record.stem, {
                        sourceStem: record.stem,
                        sourceValence: record.valenceDisplay,
                        subject: "3sg",
                        mood: "indicative",
                        tense: "present"
                    })
                    : null;
                const boundaryFrame = classFrame?.authorizationStatus === "authorized"
                    ? boundaryBuilder({
                        sourceStem: classFrame.perfectiveStem,
                        retainedStem: classFrame.perfectiveStem,
                        followingMorpheme: "tiā"
                    })
                    : null;
                return {
                    stem,
                    class: classFrame?.classId || "",
                    perfective: classFrame?.perfectiveStem || "",
                    classStatus: classFrame?.authorizationStatus || "blocked",
                    phoneStatus: boundaryFrame?.authorizationStatus || "blocked",
                    phoneReason: boundaryFrame?.blockReason || "",
                    phoneMode: boundaryFrame?.realizationMode || ""
                };
            });
        })(),
        [
            {
                stem: "cui",
                class: "A",
                perfective: "cui",
                classStatus: "authorized",
                phoneStatus: "authorized",
                phoneReason: "",
                phoneMode: "no-final-consonant"
            },
            {
                stem: "cuā",
                class: "D",
                perfective: "cuah",
                classStatus: "authorized",
                phoneStatus: "authorized",
                phoneReason: "",
                phoneMode: "invariant"
            }
        ]
    );

    s.eq(
        "Every Andrews Lesson 7.4 Class B boundary change is realized from a canonical source verbstem",
        (() => {
            const classBuilder = typeof ctx.buildClassicalNahuatlVerbstemClassFrame === "function"
                ? ctx.buildClassicalNahuatlVerbstemClassFrame
                : null;
            const changeApplier = typeof ctx.applyClassicalNahuatlLesson7ClassBChanges === "function"
                ? ctx.applyClassicalNahuatlLesson7ClassBChanges
                : null;
            if (!classBuilder || !changeApplier) {
                return null;
            }
            const cases = [
                ["miqui", "mic", "class-b-spelling-qu-to-c"],
                ["nēci", "nēz", "class-b-spelling-c-to-z"],
                ["mahui", "mauh", "class-b-w-change-hu-to-uh"],
                ["tzacui", "tzauc", "class-b-kw-change-cu-to-uc"],
                ["nemi", "nen", "class-b-m-to-n"],
                ["ce-ya", "ce-z", "class-b-y-to-s"],
                ["tlaōco-ya", "tlaōco-x", "class-b-y-to-x"]
            ];
            return cases.map(([stem, expectedPerfective, expectedRule]) => {
                const canonical = canonicalInventory.find(record => record.stem === stem && record.valenceDisplay === "intransitive") || null;
                const classFrame = canonical
                    ? classBuilder(canonical.stem, {
                        sourceStem: canonical.stem,
                        sourceValence: canonical.valenceDisplay,
                        verbClass: "B",
                        subject: "3sg",
                        mood: "indicative",
                        tense: "present"
                    })
                    : null;
                const operation = canonical ? changeApplier(canonical.stem) : null;
                return {
                    stem,
                    canonical: Boolean(canonical),
                    status: classFrame?.authorizationStatus || "blocked",
                    class: classFrame?.classId || "",
                    perfective: classFrame?.perfectiveStem || "",
                    operationPerfective: operation?.perfectiveStem || "",
                    changeRule: operation?.changeRule || "",
                    expectedPerfective,
                    expectedRule
                };
            });
        })(),
        [
            { stem: "miqui", canonical: true, status: "authorized", class: "B", perfective: "mic", operationPerfective: "mic", changeRule: "class-b-spelling-qu-to-c", expectedPerfective: "mic", expectedRule: "class-b-spelling-qu-to-c" },
            { stem: "nēci", canonical: true, status: "authorized", class: "B", perfective: "nēz", operationPerfective: "nēz", changeRule: "class-b-spelling-c-to-z", expectedPerfective: "nēz", expectedRule: "class-b-spelling-c-to-z" },
            { stem: "mahui", canonical: true, status: "authorized", class: "B", perfective: "mauh", operationPerfective: "mauh", changeRule: "class-b-w-change-hu-to-uh", expectedPerfective: "mauh", expectedRule: "class-b-w-change-hu-to-uh" },
            { stem: "tzacui", canonical: true, status: "authorized", class: "B", perfective: "tzauc", operationPerfective: "tzauc", changeRule: "class-b-kw-change-cu-to-uc", expectedPerfective: "tzauc", expectedRule: "class-b-kw-change-cu-to-uc" },
            { stem: "nemi", canonical: true, status: "authorized", class: "B", perfective: "nen", operationPerfective: "nen", changeRule: "class-b-m-to-n", expectedPerfective: "nen", expectedRule: "class-b-m-to-n" },
            { stem: "ce-ya", canonical: true, status: "authorized", class: "B", perfective: "ce-z", operationPerfective: "ce-z", changeRule: "class-b-y-to-s", expectedPerfective: "ce-z", expectedRule: "class-b-y-to-s" },
            { stem: "tlaōco-ya", canonical: true, status: "authorized", class: "B", perfective: "tlaōco-x", operationPerfective: "tlaōco-x", changeRule: "class-b-y-to-x", expectedPerfective: "tlaōco-x", expectedRule: "class-b-y-to-x" }
        ]
    );

    s.eq(
        "Andrews 11.3.1 compound class shift supplies the exposed kw solution",
        (() => {
            if (typeof ctx.buildClassicalNahuatlIrregularVncParadigmPlan !== "function"
                || typeof ctx.buildClassicalNahuatlDerivationalBoundarySpellingFrame !== "function") {
                return null;
            }
            const perfectiveCoordinate = {
                mood: "indicative",
                tense: "preterit",
            };
            const ahco = ctx.buildClassicalNahuatlIrregularVncParadigmPlan(
                "ahco-cui",
                perfectiveCoordinate
            );
            const ce = ctx.buildClassicalNahuatlIrregularVncParadigmPlan(
                "ce-cui",
                perfectiveCoordinate
            );
            const ahcoBoundary = ctx.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
                sourceStem: ahco.selectedStemOverride,
                retainedStem: ahco.selectedStemOverride,
                followingMorpheme: "tiā"
            });
            const ceBoundary = ctx.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
                sourceStem: ce.selectedStemOverride,
                retainedStem: ce.selectedStemOverride,
                followingMorpheme: "tiā"
            });
            return {
                ahco: {
                    status: ahco.authorizationStatus,
                    class: ahco.selectedClassOverride,
                    perfective: ahco.selectedStemOverride,
                    alternate: ahco.alternatives,
                    phoneStatus: ahcoBoundary.authorizationStatus,
                    phoneRule: ahcoBoundary.spellingChangeFrame?.selectedRuleId || "",
                    phoneOutput: ahcoBoundary.realizedRetainedStem
                },
                ce: {
                    status: ce.authorizationStatus,
                    class: ce.selectedClassOverride,
                    perfective: ce.selectedStemOverride,
                    phoneStatus: ceBoundary.authorizationStatus,
                    phoneRule: ceBoundary.spellingChangeFrame?.selectedRuleId || "",
                    phoneOutput: ceBoundary.realizedRetainedStem
                }
            };
        })(),
        {
            ahco: {
                status: "authorized",
                class: "B",
                perfective: "ahco-uc",
                alternate: ["ahco-c"],
                phoneStatus: "authorized",
                phoneRule: "cn-l2-24-kw-final",
                phoneOutput: "ahco-uc"
            },
            ce: {
                status: "authorized",
                class: "B",
                perfective: "ce-uc",
                phoneStatus: "authorized",
                phoneRule: "cn-l2-24-kw-final",
                phoneOutput: "ce-uc"
            }
        }
    );

    s.eq(
        "Canonical nemi phone-shift failures are explicit Andrews outcomes",
        (() => {
            const nemiIsCanonical = canonicalInventory.some(record => record.stem === "nemi" && record.valenceDisplay === "intransitive");
            if (!nemiIsCanonical || typeof ctx.buildClassicalNahuatlConsonantPhoneShiftFrame !== "function") {
                return null;
            }
            const exposed = ctx.buildClassicalNahuatlConsonantPhoneShiftFrame({
                sourceConsonant: "m",
                position: "exposed"
            });
            const nonfinal = ctx.buildClassicalNahuatlConsonantPhoneShiftFrame({
                sourceConsonant: "m",
                position: "nonfinal"
            });
            const wrongSpelling = ctx.buildClassicalNahuatlConsonantPhoneShiftFrame({
                sourceConsonant: "m",
                position: "exposed",
                requestedSpelling: "m"
            });
            const nonConstruction = ctx.buildClassicalNahuatlConsonantPhoneShiftFrame({
                sourceConsonant: "m",
                position: "exposed",
                grammaticalConstruction: false
            });
            return {
                exposed: {
                    status: exposed.authorizationStatus,
                    rule: exposed.selectedRuleId,
                    outputSound: exposed.outputSound,
                    outputSpelling: exposed.outputSpelling
                },
                nonfinal: {
                    status: nonfinal.authorizationStatus,
                    reason: nonfinal.blockReason
                },
                wrongSpelling: {
                    status: wrongSpelling.authorizationStatus,
                    reason: wrongSpelling.blockReason
                },
                nonConstruction: {
                    status: nonConstruction.authorizationStatus,
                    reason: nonConstruction.blockReason
                }
            };
        })(),
        {
            exposed: {
                status: "authorized",
                rule: "cn-l2-213-m-exposed-n",
                outputSound: "n̥",
                outputSpelling: "n"
            },
            nonfinal: {
                status: "blocked",
                reason: "no-lesson2-consonant-phone-shift-rule"
            },
            wrongSpelling: {
                status: "blocked",
                reason: "requested-spelling-conflicts-with-consonant-phone-shift-rule"
            },
            nonConstruction: {
                status: "blocked",
                reason: "not-grammatical-construction"
            }
        }
    );

    return s;
}

module.exports = { run };
