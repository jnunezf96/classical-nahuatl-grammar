"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const CANVAS_LINES = fs.readFileSync(
    path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
    "utf8"
).split(/\r?\n/u);

const EXPECTED_RULE_FAMILIES = [
    "attitude-compound",
    "compound-connective-t",
    "compound-event-order",
    "compound-evidence",
    "compound-future-embed",
    "compound-irregular-embed",
    "compound-matrix-inventory",
    "compound-nonactive",
    "compound-preterit-embed",
    "compound-recursion",
    "compound-reflexive-matrix",
    "compound-shared-object",
    "compound-structure",
    "compound-supplement",
    "compound-valence",
    "frequentative-destockal",
    "frequentative-evidence",
    "frequentative-nonactive",
    "frequentative-object",
    "frequentative-prefix-shape",
    "frequentative-recursion",
    "frequentative-reflexive",
    "frequentative-supportive-i",
    "frequentative-tla",
    "frequentative-uncertain",
    "honorific-applicative",
    "honorific-causative",
    "honorific-gate",
    "honorific-irregular",
    "honorific-preterit-embed",
    "honorific-projective",
    "pejorative-preterit-embed",
    "purposive-base",
    "purposive-contrast",
    "purposive-direction",
    "purposive-evidence",
    "purposive-external-directional",
    "purposive-nonactive",
    "purposive-paradigm",
    "purposive-recursion",
    "purposive-structure",
    "reverential-double",
].sort();

function baseRequest(overrides = {}) {
    return {
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_lessons27_29_33_closure");
    const inventory = ctx.CLASSICAL_NAHUATL_LESSONS_27_28_29_33_SOURCE_SPAN_INVENTORY;

    s.eq(
        "Lessons 27, 28, 29, and 33 have a zero-gap source-span inventory",
        (() => {
            const audit = ctx.auditClassicalNahuatlLessons27282933SourceClosure();
            const lessonBounds = {
                27: [9005, 9293],
                28: [9297, 9963],
                29: [9967, 10310],
                33: [11883, 12221],
            };
            const uncovered = [];
            Object.entries(lessonBounds).forEach(([lesson, [start, end]]) => {
                const lessonInventory = inventory.filter(entry => entry.lesson === Number(lesson));
                for (let lineNumber = start; lineNumber <= end; lineNumber += 1) {
                    const line = String(CANVAS_LINES[lineNumber - 1] || "").trim();
                    if (!line
                        || /^## PDF Page/u.test(line)
                        || /^(?:\d+ )?Lesson \d+/iu.test(line)
                        || /^(?:Frequentative Verbstems|Compound Verbstems|Purposive VNCs|Honorific, Pejorative VNCs|\d+)$/u.test(line)) {
                        continue;
                    }
                    if (!lessonInventory.some(entry => entry.transcriptionLineStart <= lineNumber && entry.transcriptionLineEnd >= lineNumber)) {
                        uncovered.push(`${lesson}:${lineNumber}`);
                    }
                }
            });
            const headings = [];
            [
                [27, 9005, 9293],
                [28, 9297, 9963],
                [29, 9967, 10310],
                [33, 11883, 12221],
            ].forEach(([lesson, start, end]) => {
                CANVAS_LINES.slice(start - 1, end).forEach((line, offset) => {
                    const match = String(line).match(new RegExp(`^${lesson}\\\\.(\\\\d+)\\\\.`, "u"));
                    if (match) headings.push(`${lesson}.${match[1]}`);
                    if (/^(?:Note(?:\s+\d+)?|Remarks?):/u.test(String(line).trim())) headings.push(`note:${offset + start}`);
                });
            });
            const uncoveredMarkers = headings.filter(marker => {
                if (!marker.startsWith("note:")) {
                    return !inventory.some(entry => entry.section.startsWith(marker));
                }
                const lineNumber = Number(marker.slice(5));
                return !inventory.some(entry => entry.transcriptionLineStart <= lineNumber && entry.transcriptionLineEnd >= lineNumber);
            });
            return {
                status: audit.authorizationStatus,
                inventoryCount: audit.inventoryCount,
                lessonCounts: audit.lessons,
                unique: audit.uniqueIdCount,
                invalid: audit.invalidIds,
                unclassified: audit.unclassifiedCount,
                partial: audit.partiallyImplementedCount,
                blocked: audit.genuinelyBlockedCount,
                uncovered,
                uncoveredMarkers,
                proofFamiliesComplete: inventory.every(entry => entry.proofFamilies.join("|") === "positive|negative|interaction|hostile|scalar|full-paradigm"),
            };
        })(),
        {
            status: "authorized",
            inventoryCount: 85,
            lessonCounts: { 27: 27, 28: 27, 29: 18, 33: 13 },
            unique: 85,
            invalid: [],
            unclassified: 0,
            partial: 0,
            blocked: 0,
            uncovered: [],
            uncoveredMarkers: [],
            proofFamiliesComplete: true,
        }
    );

    s.eq(
        "The LCM names every tested rule family and the GCD forbids string authority",
        {
            gcd: ctx.CLASSICAL_NAHUATL_LESSONS_27_28_29_33_GCD.invariant,
            formulaAuthority: ctx.CLASSICAL_NAHUATL_LESSONS_27_28_29_33_GCD.callerFormulaAuthority,
            surfaceAuthority: ctx.CLASSICAL_NAHUATL_LESSONS_27_28_29_33_GCD.callerSurfaceAuthority,
            families: [...ctx.CLASSICAL_NAHUATL_LESSONS_27_28_29_33_LCM.licensedRuleFamilies].sort(),
        },
        {
            gcd: "An engine-issued typed operation consumes an authorized typed VNC source and produces a typed VNC slot that alone can enter canonical finite boundary realization.",
            formulaAuthority: false,
            surfaceAuthority: false,
            families: EXPECTED_RULE_FAMILIES,
        }
    );

    const ordinary = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        subject: "1sg",
        lateOperation: "frequentative",
        lateVariant: "ordinary-long",
        frequentativeRepetitions: 2,
    }));
    s.eq(
        "Lesson 27 positive and recursive paths change the typed predicate before finite realization",
        {
            status: ordinary.authorizationStatus,
            canonical: ctx.isClassicalNahuatlClosureFrame(ordinary),
            target: ordinary.operationFrame?.targetStem,
            formula: ordinary.formulaRealization,
            surface: ordinary.surfaceRealization,
            finiteMachineryIdentity: ordinary.finiteSurfaceFrame?.machineryFrame === ordinary.selectedMachineryFrame,
        },
        {
            status: "authorized",
            canonical: true,
            target: "chō-chō-chōca",
            formula: "#ni-0(chō-chō-chōca)0+0-0#",
            surface: "nichōchōchōca",
            finiteMachineryIdentity: true,
        }
    );
    s.eq(
        "an authorized next VNC derivation preserves the inner VNC capabilities by default",
        (() => {
            const capabilityFrame =
                ctx.getClassicalNahuatlAuthorityCapabilityFrame({
                    basalUnit: "vnc",
                    machineryFrame: ordinary.selectedMachineryFrame,
                    vncApplicationFrame: ordinary.baseApplicationFrame,
                });
            return {
                basis: capabilityFrame.capabilityBasis,
                mood: capabilityFrame.capabilities.mood,
                tense: capabilityFrame.capabilities.tense,
                directional:
                    capabilityFrame.capabilities.directionalLocative,
                sentence: capabilityFrame.capabilities.sentenceSurface,
            };
        })(),
        {
            basis: "authorized-source-machinery-for-late-vnc-derivation",
            mood: true,
            tense: true,
            directional: true,
            sentence: true,
        }
    );
    s.eq(
        "a lookalike late machinery frame cannot restore inherited VNC capabilities",
        (() => {
            const forgedMachinery = {
                ...ordinary.selectedMachineryFrame,
            };
            const capabilityFrame =
                ctx.getClassicalNahuatlAuthorityCapabilityFrame({
                    basalUnit: "vnc",
                    machineryFrame: forgedMachinery,
                    vncApplicationFrame: ordinary.baseApplicationFrame,
                });
            return {
                basis: capabilityFrame.capabilityBasis,
                mood: capabilityFrame.capabilities.mood,
                tense: capabilityFrame.capabilities.tense,
                directional:
                    capabilityFrame.capabilities.directionalLocative,
            };
        })(),
        {
            basis: "selected-machinery",
            mood: false,
            tense: false,
            directional: false,
        }
    );

    const base = ordinary.baseApplicationFrame;
    s.eq(
        "Lesson 27 negative and hostile gates reject the wrong destockal source and forged typed frames",
        (() => {
            const wrongDestockal = ctx.buildClassicalNahuatlOperationFrame(base, baseRequest({
                subject: "1sg",
                lateOperation: "frequentative",
                lateVariant: "destockal-causative",
            }));
            const forged = JSON.parse(JSON.stringify(ordinary.operationFrame));
            const forgedMachinery = ctx.buildClassicalNahuatlMachineryFrame(forged);
            const forgedBase = JSON.parse(JSON.stringify(base));
            const forgedSourceOperation = ctx.buildClassicalNahuatlOperationFrame(
                forgedBase,
                baseRequest({
                    subject: "1sg",
                    lateOperation: "frequentative",
                    lateVariant: "ordinary-short",
                })
            );
            return {
                negativeStatus: wrongDestockal.authorizationStatus,
                negativeReason: wrongDestockal.blockReason,
                forgedCanonical: ctx.isClassicalNahuatlOperationFrame(forged),
                forgedMachineryStatus: forgedMachinery.authorizationStatus,
                forgedSourceStatus: forgedSourceOperation.authorizationStatus,
                forgedSourceReason: forgedSourceOperation.blockReason,
            };
        })(),
        {
            negativeStatus: "blocked",
            negativeReason: "destockal-causative-source-required",
            forgedCanonical: false,
            forgedMachineryStatus: "blocked",
            forgedSourceStatus: "blocked",
            forgedSourceReason: "authorized-canonical-base-vnc-required",
        }
    );

    const compound = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        subject: "2sg",
        tense: "preterit",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: "nemi",
        compoundMatrixClass: "B",
        compoundEventOrder: "hysteron-proteron",
    }));
    s.eq(
        "Lesson 28 positive and interaction paths use perfective embed, connective allomorph, and matrix finite coordinates",
        {
            status: compound.authorizationStatus,
            target: compound.operationFrame?.targetStem,
            eventOrder: compound.operationFrame?.operationFacts?.eventOrder,
            typedTense: compound.finalTypedVncSlotFrame?.slots?.predicate?.tns,
            formula: compound.formulaRealization,
            surface: compound.surfaceRealization,
        },
        {
            status: "authorized",
            target: "chōca-ti-nen",
            eventOrder: "hysteron-proteron",
            typedTense: "0",
            formula: "#ti-0(chōca-ti-nen)0+⎕-0#",
            surface: "tichōcatinen",
        }
    );
    s.eq(
        "Lesson 28 admits an arbitrary typed matrix analysis and rejects copied closure frames",
        (() => {
            const arbitraryMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                lateOperation: "compound",
                lateVariant: "connective-t",
                compoundMatrixStem: "invented",
                compoundMatrixClass: "A",
                compoundMatrixInitialISelection: "real",
            }));
            const copied = JSON.parse(JSON.stringify(compound));
            return {
                matrixStatus: arbitraryMatrix.authorizationStatus,
                matrixReason: arbitraryMatrix.blockReason,
                matrixTarget: arbitraryMatrix.operationFrame?.targetStem,
                openAdmission: arbitraryMatrix.operationFrame?.operationFacts
                    ?.openTypedMatrixAdmission,
                copiedCanonical: ctx.isClassicalNahuatlClosureFrame(copied),
            };
        })(),
        {
            matrixStatus: "authorized",
            matrixReason: "",
            matrixTarget: "chōca-t-invented",
            openAdmission: true,
            copiedCanonical: false,
        }
    );

    const accompanyingPossession = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: "ca",
        verbClass: "A",
        lateOperation: "compound",
        lateVariant: "accompanying-possession",
        compoundMatrixStem: "nemi",
        compoundMatrixClass: "B",
        compoundPossessiveStem: "chīmal",
        compoundPossessor: "1sg",
        compoundPossessiveFormula: "#forged#",
    }));
    s.eq(
        "Lesson 28 accompanying possession mechanically composes a canonical possessive NNC with the generated connective-t VNC",
        {
            status: accompanyingPossession.authorizationStatus,
            supplementStatus: accompanyingPossession.operationFrame?.operationFacts
                ?.supplementarySubjectFrame?.authorizationStatus,
            nncKind: accompanyingPossession.supplementaryResultFrame
                ?.supplementFrame?.nncSlotFrame?.kind,
            vncKind: accompanyingPossession.supplementaryResultFrame
                ?.finiteSurfaceFrame?.kind,
            surface: accompanyingPossession.surfaceRealization,
            forgedFormulaAccepted: accompanyingPossession.operationFrame
                ?.operationFacts?.supplementarySubjectFrame
                ?.sentenceSurfaceFrame?.sentenceFormulaDisplay?.includes("forged") === true,
        },
        {
            status: "authorized",
            supplementStatus: "authorized",
            nncKind: "classical-nahuatl-nnc-slot-frame",
            vncKind: "classical-nahuatl-vnc-finite-surface-frame",
            surface: "nochīmal yetinemi",
            forgedFormulaAccepted: false,
        }
    );

    const recursiveEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: compound.operationFrame.targetStem,
        subject: "2sg",
        tense: "preterit",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: "ya-uh",
        compoundMatrixClass: "B",
        compoundEmbedClosureFrame: compound,
    }));
    const recursiveMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: "chōca",
        subject: "2sg",
        tense: "preterit",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: compound.operationFrame.targetStem,
        compoundMatrixClass: "B",
        compoundMatrixClosureFrame: compound,
    }));
    const forgedRecursive = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: compound.operationFrame.targetStem,
        subject: "2sg",
        tense: "preterit",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: "ya-uh",
        compoundMatrixClass: "B",
        compoundEmbedClosureFrame: JSON.parse(JSON.stringify(compound)),
    }));
    s.eq(
        "Lesson 28 recursive embed and matrix positions consume only engine-issued typed closures",
        {
            embed: [
                recursiveEmbed.authorizationStatus,
                recursiveEmbed.operationFrame?.ruleFamily,
                recursiveEmbed.operationFrame?.operationFacts?.recursiveEmbed,
            ],
            matrix: [
                recursiveMatrix.authorizationStatus,
                recursiveMatrix.operationFrame?.ruleFamily,
                recursiveMatrix.operationFrame?.operationFacts?.recursiveMatrix,
            ],
            hostile: [
                forgedRecursive.authorizationStatus,
                forgedRecursive.operationFrame?.operationFacts?.recursiveEmbed === true,
            ],
        },
        {
            embed: ["authorized", "compound-recursion", true],
            matrix: ["authorized", "compound-recursion", true],
            hostile: ["blocked", false],
        }
    );

    const purposive = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        subject: "3pl",
        lateOperation: "purposive",
        lateVariant: "directional",
        purposiveDirection: "inbound",
        purposiveSeries: "inbound-future-indicative",
    }));
    s.eq(
        "Lesson 29 positive and number-interaction paths keep silent future before the internal directional matrix",
        {
            status: purposive.authorizationStatus,
            target: purposive.operationFrame?.targetStem,
            direction: purposive.operationFrame?.operationFacts?.direction,
            tns: purposive.finalTypedVncSlotFrame?.slots?.predicate?.tns,
            number: purposive.finalTypedVncSlotFrame?.slots?.number?.num2,
            formula: purposive.formulaRealization,
        },
        {
            status: "authorized",
            target: "chōca-⎕-qu-i-hui",
            direction: "inbound",
            tns: "0",
            number: "h",
            formula: "#0-0(chōca-⎕-qu-i-hui)0+0-h#",
        }
    );
    s.eq(
        "Lesson 29 negative and hostile paths reject an unknown series while deriving direction and ignoring caller surfaces",
        (() => {
            const blocked = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                lateOperation: "purposive",
                lateVariant: "directional",
                purposiveDirection: "outbound",
                purposiveSeries: "invented-series",
            }));
            const hostile = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                lateOperation: "purposive",
                lateVariant: "directional",
                purposiveDirection: "outbound",
                purposiveSeries: "inbound-future-indicative",
                formula: "#forged#",
                surface: "forged",
            }));
            return {
                status: blocked.authorizationStatus,
                reason: blocked.blockReason,
                hostileStatus: hostile.authorizationStatus,
                derivedDirection: hostile.operationFrame?.operationFacts?.direction,
                forgedFormulaUsed: hostile.formulaRealization === "#forged#",
                forgedSurfaceUsed: hostile.surfaceRealization === "forged",
                callerAuthority: hostile.callerSuppliedAuthorityAccepted,
            };
        })(),
        {
            status: "blocked",
            reason: "licensed-purposive-series-required",
            hostileStatus: "authorized",
            derivedDirection: "inbound",
            forgedFormulaUsed: false,
            forgedSurfaceUsed: false,
            callerAuthority: false,
        }
    );

    const recursivePurposive = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: compound.operationFrame.targetStem,
        subject: "2sg",
        lateOperation: "purposive",
        lateVariant: "directional",
        purposiveDirection: "outbound",
        purposiveSeries: "outbound-nonpast-indicative",
        compoundEmbedClosureFrame: compound,
    }));
    s.eq(
        "Lesson 29 compound-stemmed purposive embeds reuse an engine-issued Lesson 28 closure",
        {
            status: recursivePurposive.authorizationStatus,
            typedSourceIdentity: recursivePurposive.operationFrame
                ?.sourceTypedVncSlotFrame === compound.finalTypedVncSlotFrame,
            target: recursivePurposive.operationFrame?.targetStem,
        },
        {
            status: "authorized",
            typedSourceIdentity: true,
            target: "chōca-ti-nen-⎕-t-ī-uh",
        }
    );

    const frequentativeForPurposive =
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "caqui",
            verbClass: "A",
            subject: "1sg",
            lateOperation: "frequentative",
            lateVariant: "ordinary-long",
            frequentativeRepetitions: 1,
            frequentativeScope: "open",
        }));
    const purposiveFromFrequentative =
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem:
                frequentativeForPurposive.operationFrame?.targetStem,
            verbClass: "A",
            subject: "1sg",
            lateOperation: "purposive",
            lateVariant: "directional",
            purposiveDirection: "outbound",
            purposiveSeries: "outbound-nonpast-indicative",
            recursiveEmbedClosureFrame: frequentativeForPurposive,
        }));
    s.eq(
        "a frequentative Result can receive a purposive as the next general derivation layer",
        {
            inner: [
                frequentativeForPurposive.authorizationStatus,
                frequentativeForPurposive.operationFrame?.targetStem,
            ],
            outer: [
                purposiveFromFrequentative.authorizationStatus,
                purposiveFromFrequentative.operationFrame?.targetStem,
                purposiveFromFrequentative.surfaceRealization,
            ],
            exactTypedSource:
                purposiveFromFrequentative.operationFrame
                    ?.sourceTypedVncSlotFrame
                === frequentativeForPurposive.finalTypedVncSlotFrame,
            generalLayerFacts: [
                purposiveFromFrequentative.operationFrame?.operationFacts
                    ?.recursiveEmbedAuthorized,
                purposiveFromFrequentative.operationFrame?.operationFacts
                    ?.recursiveEmbedSourceOperation,
                purposiveFromFrequentative.operationFrame?.operationFacts
                    ?.recursiveEmbedFramePreserved,
                purposiveFromFrequentative.operationFrame?.operationFacts
                    ?.recursivePurposiveBoundaryOutsideCompletedResult,
            ],
            falselyCalledCompound:
                purposiveFromFrequentative.operationFrame?.operationFacts
                    ?.recursiveCompoundEmbedAuthorized,
        },
        {
            inner: ["authorized", "cā-caqui"],
            outer: [
                "authorized",
                "cā-caqui-⎕-t-ī-uh",
                "nicācaquitīuh",
            ],
            exactTypedSource: true,
            generalLayerFacts: [true, "frequentative", true, true],
            falselyCalledCompound: false,
        }
    );
    s.eq(
        "recursive next VNC derivations preserve capabilities through every owner-issued layer",
        (() => {
            const capabilityFrame =
                ctx.getClassicalNahuatlAuthorityCapabilityFrame({
                    basalUnit: "vnc",
                    machineryFrame:
                        purposiveFromFrequentative.selectedMachineryFrame,
                    vncApplicationFrame:
                        purposiveFromFrequentative.baseApplicationFrame,
                });
            return {
                basis: capabilityFrame.capabilityBasis,
                mood: capabilityFrame.capabilities.mood,
                tense: capabilityFrame.capabilities.tense,
                directional:
                    capabilityFrame.capabilities.directionalLocative,
                sentence: capabilityFrame.capabilities.sentenceSurface,
            };
        })(),
        {
            basis: "authorized-source-machinery-for-late-vnc-derivation",
            mood: true,
            tense: true,
            directional: true,
            sentence: true,
        }
    );

    const honorific = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        lateOperation: "honorific",
        lateVariant: "applicative",
        honoredParticipant: "subject",
    }));
    const pejorative = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        subject: "1sg",
        lateOperation: "pejorative",
        lateVariant: "preterit-embed",
    }));
    s.eq(
        "Lesson 33 positive and interaction paths distinguish reflexive honorific from self-permitted pejorative",
        {
            honorific: {
                status: honorific.authorizationStatus,
                target: honorific.operationFrame?.targetStem,
                object: honorific.finalTypedVncSlotFrame?.slots?.prePredicate?.[0]?.carrier,
                formula: honorific.formulaRealization,
            },
            pejorative: {
                status: pejorative.authorizationStatus,
                target: pejorative.operationFrame?.targetStem,
                formula: pejorative.formulaRealization,
            },
        },
        {
            honorific: {
                status: "authorized",
                target: "chōqui-liā",
                object: "m-o",
                formula: "#0-0+m-o(chōqui-lia)0+0-0#",
            },
            pejorative: {
                status: "authorized",
                target: "chōca-0-pōl-o-ā",
                formula: "#ni-0(chōca-0-pōl-o-a)0+0-0#",
            },
        }
    );
    s.eq(
        "Lesson 33 negative and hostile paths block self-honorification and copied operation authority",
        (() => {
            const blocked = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                subject: "1sg",
                lateOperation: "honorific",
                lateVariant: "applicative",
                honoredParticipant: "subject",
            }));
            const copiedOperation = JSON.parse(JSON.stringify(honorific.operationFrame));
            return {
                status: blocked.authorizationStatus,
                reason: blocked.blockReason,
                copiedCanonical: ctx.isClassicalNahuatlOperationFrame(copiedOperation),
            };
        })(),
        {
            status: "blocked",
            reason: "self-honorific-not-authorized",
            copiedCanonical: false,
        }
    );

    const attitude = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: "chōca-ti-o",
        lateOperation: "honorific",
        lateVariant: "applicative",
        honoredParticipant: "subject",
        attitudeCompoundTarget: "embed",
        sourceEmbedStem: "chōca",
        sourceMatrixStem: "o",
        compoundMatrixClass: "A",
    }));
    const hostileAttitude = ctx.buildClassicalNahuatlOperationFrame(
        honorific.baseApplicationFrame,
        baseRequest({
            sourceStem: "chōca",
            lateOperation: "honorific",
            lateVariant: "applicative",
            honoredParticipant: "subject",
            attitudeCompoundTarget: "embed",
            sourceEmbedStem: "forged",
            sourceMatrixStem: "o",
        })
    );
    s.eq(
        "Lesson 33 compound attitude transformations consume typed compound and member-operation frames, never component strings",
        {
            status: attitude.authorizationStatus,
            reason: attitude.blockReason,
            target: attitude.operationFrame?.targetStem,
            compoundKind: attitude.operationFrame?.operationFacts
                ?.typedCompoundSourceFrame?.kind,
            memberKind: attitude.operationFrame?.operationFacts
                ?.typedMemberTransformationFrame?.kind,
            hostileStatus: hostileAttitude.authorizationStatus,
            hostileReason: hostileAttitude.blockReason,
            hostileCompoundTarget:
                hostileAttitude.operationFacts?.compoundTarget || "",
            hostileTarget: hostileAttitude.targetStem,
        },
        {
            status: "authorized",
            reason: "",
            target: "chōqui-lih-t-o",
            compoundKind: "classical-nahuatl-late-vnc-derivation-closure-frame",
            memberKind: "classical-nahuatl-late-vnc-derivation-closure-frame",
            hostileStatus: "authorized",
            hostileReason: "",
            hostileCompoundTarget: "",
            hostileTarget: "chōqui-liā",
        }
    );

    s.eq(
        "Lesson 27 lexical, recursive-object, ambiguity, and uncertain families use open typed shapes",
        (() => {
            const lexicalized = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "po-pō-ca",
                verbClass: "A",
                lateOperation: "frequentative",
                lateVariant: "destockal-lexicalized",
            }));
            const fusedRecursive = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "tla-cōhua",
                lateOperation: "frequentative",
                lateVariant: "tla-short-glottal-and-stem-short-glottal",
            }));
            const applicativeForce = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "chay-ā-hu-a",
                sourceValence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                lateOperation: "frequentative",
                lateVariant: "destockal-applicative-force",
            }));
            const uncertain = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "cui-ca",
                lateOperation: "frequentative",
                lateVariant: "uncertain-tzca",
            }));
            const inventedLexical = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "chōca",
                lateOperation: "frequentative",
                lateVariant: "destockal-lexicalized",
            }));
            const inventedUncertain = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "chōca",
                lateOperation: "frequentative",
                lateVariant: "uncertain-ca",
            }));
            const hostileCount = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                lateOperation: "frequentative",
                lateVariant: "ordinary-short",
                frequentativeRepetitions: 1.5,
            }));
            return {
                lexicalized: [
                    lexicalized.authorizationStatus,
                    lexicalized.operationFrame?.targetStem,
                    lexicalized.operationFrame?.operationFacts?.fusedStockVowelRemainsLong,
                ],
                fusedRecursive: [
                    fusedRecursive.authorizationStatus,
                    fusedRecursive.operationFrame?.targetStem,
                    fusedRecursive.operationFrame?.operationFacts?.lexicalStemAlsoReduplicated,
                ],
                applicativeForce: [
                    applicativeForce.authorizationStatus,
                    applicativeForce.operationFrame?.operationFacts?.semanticForce,
                    applicativeForce.operationFrame?.targetValence,
                ],
                uncertain: [
                    uncertain.authorizationStatus,
                    uncertain.operationFrame?.targetStem,
                ],
                inventedLexical: [
                    inventedLexical.authorizationStatus,
                    inventedLexical.blockReason,
                ],
                inventedUncertain: [
                    inventedUncertain.authorizationStatus,
                    inventedUncertain.blockReason,
                ],
                hostileCount: [
                    hostileCount.authorizationStatus,
                    hostileCount.blockReason,
                ],
            };
        })(),
        {
            lexicalized: ["authorized", "po-pō-ca", true],
            fusedRecursive: ["authorized", "tlah-tla-coh-cōhua", true],
            applicativeForce: ["authorized", "applicative", "specific-projective"],
            uncertain: ["authorized", "cui-cui-tz-ca"],
            inventedLexical: ["authorized", ""],
            inventedUncertain: ["authorized", ""],
            hostileCount: ["blocked", "positive-bounded-reduplication-count-required"],
        }
    );

    s.eq(
        "Lesson 28 keeps ordinary and typed carry analyses open while enforcing coreference, itz analysis, and sounded future embed",
        (() => {
            const wrongMatrixFamily = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                lateOperation: "compound",
                lateVariant: "connective-t",
                compoundMatrixStem: "tlāl-i-ā",
            }));
            const sharedWithoutObject = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                lateOperation: "compound",
                lateVariant: "shared-object",
                compoundMatrixStem: "tlāl-i-ā",
            }));
            const regularCarry = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "huīca",
                sourceValence: "tla",
                objectKind: "nonspecific-nonhuman",
                verbClass: "A",
                lateOperation: "compound",
                lateVariant: "connective-t",
                compoundMatrixStem: "huī-tz",
            }));
            const specialCarry = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "huīca",
                sourceValence: "tla",
                objectKind: "nonspecific-nonhuman",
                verbClass: "A",
                lateOperation: "compound",
                lateVariant: "huītz-carry",
                compoundMatrixStem: "huī-tz",
            }));
            const future = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "cochi",
                verbClass: "B",
                tense: "future",
                lateOperation: "compound",
                lateVariant: "future-embed",
                compoundMatrixStem: "tla-nequi",
            }));
            const conditionalWrongTense = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "cochi",
                verbClass: "B",
                tense: "present",
                lateOperation: "compound",
                lateVariant: "future-embed",
                compoundMatrixStem: "tla-qui",
            }));
            const itzMissingSense = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "itz",
                verbClass: "B",
                lateOperation: "compound",
                lateVariant: "connective-t",
                compoundMatrixStem: "o",
            }));
            const itzObserved = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "itz",
                verbClass: "B",
                compoundItzSense: "observational",
                lateOperation: "compound",
                lateVariant: "connective-t",
                compoundMatrixStem: "o",
            }));
            return {
                wrongMatrixFamily: [
                    wrongMatrixFamily.authorizationStatus,
                    wrongMatrixFamily.blockReason,
                ],
                sharedWithoutObject: [
                    sharedWithoutObject.authorizationStatus,
                    sharedWithoutObject.blockReason,
                ],
                regularCarry: [
                    regularCarry.authorizationStatus,
                    regularCarry.blockReason,
                ],
                specialCarry: [
                    specialCarry.authorizationStatus,
                    specialCarry.operationFrame?.targetStem,
                    specialCarry.operationFrame?.operationFacts?.oldConnectivelessHuītzFormation,
                    specialCarry.operationFrame?.operationFacts?.carrySourceStemWhitelistUsed,
                ],
                future: [
                    future.authorizationStatus,
                    future.operationFrame?.targetStem,
                    future.operationFrame?.operationFacts?.embedTenseMorph,
                ],
                conditionalWrongTense: [
                    conditionalWrongTense.authorizationStatus,
                    conditionalWrongTense.blockReason,
                ],
                itzMissingSense: [
                    itzMissingSense.authorizationStatus,
                    itzMissingSense.blockReason,
                ],
                itzObserved: [
                    itzObserved.authorizationStatus,
                    itzObserved.operationFrame?.operationFacts?.embedStem,
                ],
            };
        })(),
        {
            wrongMatrixFamily: ["authorized", ""],
            sharedWithoutObject: ["blocked", "shared-object-coreferential-embed-object-required"],
            regularCarry: ["authorized", ""],
            specialCarry: ["authorized", "huica-tz", true, false],
            future: ["authorized", "cochi-z-nequi", "z"],
            conditionalWrongTense: ["blocked", "tla-qui-matrix-is-imperfect-only"],
            itzMissingSense: ["blocked", "typed-itz-embed-sense-required"],
            itzObserved: ["authorized", "itz"],
        }
    );

    s.eq(
        "Lesson 29 derives all series shapes and ignores caller attempts to redefine internal direction",
        (() => {
            const evaluateSeries = (subject, purposiveSeries, extra = {}) =>
                ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                    subject,
                    lateOperation: "purposive",
                    lateVariant: "directional",
                    purposiveSeries,
                    ...extra,
                }));
            const outboundOptative = evaluateSeries(
                "3sg",
                "outbound-nonpast-optative"
            );
            const outboundPlural = evaluateSeries(
                "3pl",
                "outbound-nonpast-optative"
            );
            const outboundPluralN = evaluateSeries(
                "3pl",
                "outbound-nonpast-optative",
                { purposiveIrregularPluralN: true }
            );
            const inboundOptative = evaluateSeries(
                "3sg",
                "inbound-nonpast-optative"
            );
            const poisonedDirection = evaluateSeries(
                "3sg",
                "inbound-nonpast-optative",
                { purposiveDirection: "outbound" }
            );
            const full = ctx.buildClassicalNahuatlParadigm(
                baseRequest({
                    lateOperation: "purposive",
                    lateVariant: "directional",
                })
            );
            return {
                shapes: [
                    outboundOptative.operationFrame?.targetStem,
                    outboundPlural.operationFrame?.targetStem,
                    outboundPluralN.operationFrame?.targetStem,
                    inboundOptative.operationFrame?.targetStem,
                ],
                numbers: [
                    outboundPlural.finalTypedVncSlotFrame?.slots?.number?.num2,
                    outboundPluralN.finalTypedVncSlotFrame?.slots?.number?.num2,
                ],
                poisonedSame:
                    poisonedDirection.formulaRealization
                    === inboundOptative.formulaRealization,
                callerDirectionAuthority:
                    poisonedDirection.operationFrame?.operationFacts
                        ?.callerPurposiveDirectionAuthority,
                paradigmStatus: full.authorizationStatus,
                series: [...new Set(full.rows.map(
                    row => row.coordinate.purposiveSeries
                ))].sort(),
                everyCanonical: full.rows.every(row =>
                    ctx.isClassicalNahuatlClosureFrame(
                        row.closureFrame
                    )
                ),
            };
        })(),
        {
            shapes: [
                "chōca-⎕-t-i",
                "chōca-⎕-t-i",
                "chōca-⎕-t-ī",
                "chōca-⎕-qu-i",
            ],
            numbers: ["h", "n"],
            poisonedSame: true,
            callerDirectionAuthority: false,
            paradigmStatus: "authorized",
            series: [
                "inbound-future-indicative",
                "inbound-nonfuture-indicative",
                "inbound-nonpast-optative",
                "outbound-nonpast-indicative",
                "outbound-nonpast-optative",
                "outbound-past-indicative",
            ],
            everyCanonical: true,
        }
    );

    s.eq(
        "Lesson 33 gates transformation families and derives compound-member scope instead of trusting a caller target",
        (() => {
            const chocaAlternative = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                lateOperation: "honorific",
                lateVariant: "causative",
                honoredParticipant: "subject",
                honorificStemAlternative: "type-two-l",
            }));
            const wrongMiquiRoute = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "miqui",
                verbClass: "B",
                lateOperation: "honorific",
                lateVariant: "causative",
                honoredParticipant: "subject",
                honorificFormationAnalysis: {
                    lexicalStatus: "honorific-formation-analysis",
                    sourceStem: "miqui",
                    availableFormations: ["applicative"],
                    preferredFormation: "applicative",
                    honorificOnlyApplicative: true,
                },
            }));
            const nonreflexivePreterit = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                lateOperation: "honorific",
                lateVariant: "preterit-embed",
                honoredParticipant: "subject",
            }));
            const reflexivePreterit = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "xīma",
                sourceValence: "mainline-reflexive",
                verbClass: "B",
                lateOperation: "honorific",
                lateVariant: "preterit-embed",
                honoredParticipant: "subject",
            }));
            const firstPersonNoPatient = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                subject: "1sg",
                lateOperation: "honorific",
                lateVariant: "applicative",
                honoredParticipant: "object",
            }));
            const huītzOptative = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "huī-tz",
                verbClass: "A",
                mood: "optative",
                tense: "nonpast",
                lateOperation: "honorific",
                lateVariant: "causative",
                honoredParticipant: "subject",
            }));
            const poisonedTarget = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                sourceStem: "chōca-ti-o",
                lateOperation: "honorific",
                lateVariant: "applicative",
                honoredParticipant: "subject",
                attitudeCompoundTarget: "matrix",
                sourceEmbedStem: "chōca",
                sourceMatrixStem: "o",
                compoundMatrixClass: "A",
            }));
            return {
                chocaAlternative: [
                    chocaAlternative.authorizationStatus,
                    chocaAlternative.operationFrame?.targetStem,
                ],
                wrongMiquiRoute: [
                    wrongMiquiRoute.authorizationStatus,
                    wrongMiquiRoute.blockReason,
                ],
                nonreflexivePreterit: [
                    nonreflexivePreterit.authorizationStatus,
                    nonreflexivePreterit.blockReason,
                ],
                reflexivePreterit: [
                    reflexivePreterit.authorizationStatus,
                    reflexivePreterit.operationFrame?.ruleFamily,
                ],
                firstPersonNoPatient: [
                    firstPersonNoPatient.authorizationStatus,
                    firstPersonNoPatient.blockReason,
                ],
                huītzOptative: [
                    huītzOptative.authorizationStatus,
                    huītzOptative.blockReason,
                ],
                derivedCompoundTarget:
                    poisonedTarget.operationFrame?.operationFacts?.compoundTarget,
            };
        })(),
        {
            chocaAlternative: ["authorized", "chōqui-l-tiā"],
            wrongMiquiRoute: ["blocked", "honorific-formation-not-licensed-by-typed-source-analysis"],
            nonreflexivePreterit: ["blocked", "honorific-preterit-embed-requires-mainline-reflexive-source"],
            reflexivePreterit: ["authorized", "honorific-preterit-embed"],
            firstPersonNoPatient: ["blocked", "first-person-honorific-requires-projective-patient"],
            huītzOptative: ["blocked", "huica-tz-honorific-has-no-optative"],
            derivedCompoundTarget: "embed",
        }
    );

    const projectiveHonorificRequest = baseRequest({
        sourceStem: "itta",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        requestedDerivation: "applicative",
        derivationType: "applicative",
        applicativeObjectKind: "reflexive",
        applicativeObjectPerson: "",
        sourceInitialISelection: "real",
    });
    const projectiveHonorificPreview =
        ctx.evaluateClassicalNahuatlVncApplication(projectiveHonorificRequest);
    const projectiveHonorificOption =
        projectiveHonorificPreview.controlFrame?.derivationOptionInventory
            ?.options?.[0]?.optionId || "";
    const nonactivePreview = ctx.evaluateClassicalNahuatlVncApplication(
        baseRequest({
            sourceStem: "miqui",
            sourceValence: "intransitive",
            verbClass: "B",
            requestedVoice: "impersonal",
            voice: "impersonal",
        })
    );
    const nonactiveOption =
        nonactivePreview.controlFrame?.nonactiveOptionInventory
            ?.options?.[0]?.optionId || "";
    const reverentialHonorificSource =
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            lateOperation: "honorific",
            lateVariant: "applicative",
            honoredParticipant: "subject",
        }));
    const reverentialWitness =
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem:
                reverentialHonorificSource.operationFrame?.targetStem,
            sourceValence:
                reverentialHonorificSource.operationFrame?.targetValence,
            verbClass:
                reverentialHonorificSource.operationFrame?.targetClass,
            objectKind: "reflexive",
            lateOperation: "reverential",
            lateVariant: "preterit-embed",
            honoredParticipant: "subject",
            attitudeSourceClosureFrame: reverentialHonorificSource,
        }));
    const familyWitnesses = [
        ordinary,
        compound,
        accompanyingPossession,
        recursiveEmbed,
        recursiveMatrix,
        purposive,
        recursivePurposive,
        honorific,
        pejorative,
        attitude,
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "tla-chōca",
            lateOperation: "frequentative",
            lateVariant: "tla-long",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "māhui",
            lateOperation: "frequentative",
            lateVariant: "destockal-intransitive",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "chal",
            lateOperation: "frequentative",
            lateVariant: "uncertain-ca",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "ilpi-ā",
            sourceValence: "mainline-reflexive",
            verbClass: "C",
            lateOperation: "frequentative",
            lateVariant: "reflexive-partial",
            sourceInitialISelection: "supportive",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "miqui",
            sourceValence: "intransitive",
            verbClass: "B",
            requestedVoice: "impersonal",
            voice: "impersonal",
            nonactiveOptionId: nonactiveOption,
            lateOperation: "frequentative",
            lateVariant: "ordinary-short",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            lateOperation: "compound",
            lateVariant: "future-embed",
            compoundMatrixStem: "tla-nequi",
            tense: "future",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            lateOperation: "compound",
            lateVariant: "reflexive-matrix",
            compoundMatrixStem: "m-o-quetza",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "cui",
            verbClass: "A",
            sourceValence: "specific-projective",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            lateOperation: "compound",
            lateVariant: "shared-object",
            compoundMatrixStem: "tlāl-i-ā",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "miqui",
            sourceValence: "intransitive",
            verbClass: "B",
            requestedVoice: "impersonal",
            voice: "impersonal",
            nonactiveOptionId: nonactiveOption,
            lateOperation: "compound",
            lateVariant: "connective-t",
            compoundMatrixStem: "nemi",
            compoundNonactiveScope: "embed",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            lateOperation: "purposive",
            lateVariant: "directional",
            purposiveSeries: "outbound-nonpast-indicative",
            purposiveExternalDirectional: "huāl",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "miqui",
            sourceValence: "intransitive",
            verbClass: "B",
            requestedVoice: "impersonal",
            voice: "impersonal",
            nonactiveOptionId: nonactiveOption,
            lateOperation: "purposive",
            lateVariant: "directional",
            purposiveSeries: "inbound-nonfuture-indicative",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            lateOperation: "honorific",
            lateVariant: "causative",
            honoredParticipant: "subject",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            sourceStem: "xīma",
            sourceValence: "mainline-reflexive",
            verbClass: "B",
            lateOperation: "honorific",
            lateVariant: "preterit-embed",
            honoredParticipant: "subject",
        })),
        ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
            ...projectiveHonorificRequest,
            lateOperation: "honorific",
            lateVariant: "applicative",
            honoredParticipant: "object",
            honorificDerivationOptionId: projectiveHonorificOption,
        })),
        reverentialWitness,
    ];
    const readOnlyEvidenceFamilies = new Set([
        "frequentative-evidence",
        "compound-evidence",
        "purposive-evidence",
    ]);
    const grammarBearingFamilies = EXPECTED_RULE_FAMILIES.filter(
        family => !readOnlyEvidenceFamilies.has(family)
    );
    const producedFamilies = new Set(
        familyWitnesses
            .filter(frame => frame.authorizationStatus === "authorized")
            .flatMap(frame => frame.operationFrame?.ruleFamilies || [])
    );
    const sharedHostileFrame = JSON.parse(JSON.stringify(ordinary.operationFrame));
    s.eq(
        "Every grammar-bearing LCM family has a positive executable witness, typed interaction membership, and the shared negative and hostile authority boundary",
        {
            blockedWitnesses: familyWitnesses
                .filter(frame => frame.authorizationStatus !== "authorized")
                .map(frame => frame.blockReason),
            missingPositiveFamilies: grammarBearingFamilies.filter(
                family => !producedFamilies.has(family)
            ),
            missingInteractionFamilies: grammarBearingFamilies.filter(
                family => !familyWitnesses.some(frame => (
                    frame.authorizationStatus === "authorized"
                    && frame.operationFrame?.ruleFamilies?.includes(family)
                    && frame.finalTypedVncSlotFrame
                        === frame.operationFrame.targetTypedVncSlotFrame
                ))
            ),
            negativeUnrecognizedOperation:
                ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                    lateOperation: "invented-operation",
                })).authorizationStatus,
            hostileCopiedOperationAccepted:
                ctx.isClassicalNahuatlOperationFrame(
                    sharedHostileFrame
                ),
        },
        {
            blockedWitnesses: [],
            missingPositiveFamilies: [],
            missingInteractionFamilies: [],
            negativeUnrecognizedOperation: "blocked",
            hostileCopiedOperationAccepted: false,
        }
    );

    s.eq(
        "Every read-only evidence family is executable only as comparison evidence and cannot change a generated answer",
        Object.fromEntries(
            [...readOnlyEvidenceFamilies].map(family => {
                const claimIds = inventory
                    .filter(entry => entry.ruleFamily === family)
                    .map(entry => entry.id);
                const baseline = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                    lateOperation: "frequentative",
                    lateVariant: "ordinary-short",
                }));
                const hostileEvidence = ctx.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
                    lateOperation: "frequentative",
                    lateVariant: "ordinary-short",
                    sourceEvidenceClaimIds: claimIds,
                    storedCanvasAnswer: "forged",
                }));
                return [family, {
                    claimCount: claimIds.length,
                    sameFormula:
                        hostileEvidence.formulaRealization
                        === baseline.formulaRealization,
                    sameSurface:
                        hostileEvidence.surfaceRealization
                        === baseline.surfaceRealization,
                    callerAuthority:
                        hostileEvidence.callerSuppliedAuthorityAccepted,
                }];
            })
        ),
        {
            "frequentative-evidence": {
                claimCount: 3,
                sameFormula: true,
                sameSurface: true,
                callerAuthority: false,
            },
            "compound-evidence": {
                claimCount: 2,
                sameFormula: true,
                sameSurface: true,
                callerAuthority: false,
            },
            "purposive-evidence": {
                claimCount: 4,
                sameFormula: true,
                sameSurface: true,
                callerAuthority: false,
            },
        }
    );

    const paradigm = ctx.buildClassicalNahuatlParadigm(baseRequest({
        lateOperation: "frequentative",
        lateVariant: "ordinary-short",
    }), [
        { subject: "1sg", mood: "indicative", tense: "present" },
        { subject: "3pl", mood: "indicative", tense: "present" },
        { subject: "3sg", mood: "indicative", tense: "preterit" },
    ]);
    s.eq(
        "Scalar and full-paradigm paths return canonical finite frames for each coordinate",
        {
            status: paradigm.authorizationStatus,
            authorized: paradigm.authorizedRowCount,
            blocked: paradigm.blockedRowCount,
            gcdSatisfied: paradigm.greatestCommonDivisor.satisfied,
            lcmComplete: paradigm.leastCommonMultiple.licensedAxisSetComplete,
            lcmCoordinateCount:
                paradigm.leastCommonMultiple.selectedCoordinateCount,
            scalarParity: paradigm.scalarParity,
            rows: paradigm.rows.map(row => ({
                coordinate: row.coordinate.subject,
                status: row.closureFrame.authorizationStatus,
                canonical: ctx.isClassicalNahuatlClosureFrame(row.closureFrame),
                formula: row.closureFrame.formulaRealization,
                surface: row.closureFrame.surfaceRealization,
                scalarEquivalent: row.scalarEquivalent,
                selectedOperation:
                    row.closureFrame.leastCommonMultiple
                        .selectedValues.operation,
            })),
        },
        {
            status: "authorized",
            authorized: 3,
            blocked: 0,
            gcdSatisfied: true,
            lcmComplete: true,
            lcmCoordinateCount: 3,
            scalarParity: true,
            rows: [
                {
                    coordinate: "1sg",
                    status: "authorized",
                    canonical: true,
                    formula: "#ni-0(cho-chōca)0+0-0#",
                    surface: "nichochōca",
                    scalarEquivalent: true,
                    selectedOperation: "frequentative",
                },
                {
                    coordinate: "3pl",
                    status: "authorized",
                    canonical: true,
                    formula: "#0-0(cho-chōca)0+0-h#",
                    surface: "chochōcah",
                    scalarEquivalent: true,
                    selectedOperation: "frequentative",
                },
                {
                    coordinate: "3sg",
                    status: "authorized",
                    canonical: true,
                    formula: "#0-0(cho-chōca)0+c-0#",
                    surface: "chochōcac",
                    scalarEquivalent: true,
                    selectedOperation: "frequentative",
                },
            ],
        }
    );

    s.eq(
        "Compound, purposive, and honorific paradigms project every row through the same scalar typed generator",
        (() => {
            const cases = [
                {
                    family: "compound",
                    request: baseRequest({
                        lateOperation: "compound",
                        lateVariant: "connective-t",
                        compoundMatrixStem: "nemi",
                    }),
                    coordinates: [
                        { subject: "1sg", mood: "indicative", tense: "present" },
                        { subject: "3pl", mood: "indicative", tense: "preterit" },
                    ],
                },
                {
                    family: "purposive",
                    request: baseRequest({
                        lateOperation: "purposive",
                        lateVariant: "directional",
                    }),
                    coordinates: [
                        {
                            subject: "1sg",
                            mood: "indicative",
                            tense: "present",
                            purposiveSeries: "outbound-nonpast-indicative",
                        },
                        {
                            subject: "3pl",
                            mood: "optative",
                            tense: "nonpast",
                            purposiveSeries: "inbound-nonpast-optative",
                        },
                    ],
                },
                {
                    family: "honorific",
                    request: baseRequest({
                        lateOperation: "honorific",
                        lateVariant: "applicative",
                        honoredParticipant: "subject",
                    }),
                    coordinates: [
                        { subject: "2sg", mood: "indicative", tense: "present" },
                        { subject: "3pl", mood: "indicative", tense: "preterit" },
                    ],
                },
            ];
            return cases.map(testCase => {
                const projected =
                    ctx.buildClassicalNahuatlParadigm(
                        testCase.request,
                        testCase.coordinates
                    );
                return {
                    family: testCase.family,
                    status: projected.authorizationStatus,
                    authorized: projected.authorizedRowCount,
                    blocked: projected.blockedRowCount,
                    scalarParity: projected.scalarParity,
                    rows: projected.rows.map((row, index) => {
                        const scalar =
                            ctx.evaluateClassicalNahuatlLateVncDerivation({
                                ...testCase.request,
                                ...testCase.coordinates[index],
                            });
                        return {
                            canonical:
                                ctx.isClassicalNahuatlClosureFrame(
                                    row.closureFrame
                                ),
                            sameFormula:
                                row.closureFrame.formulaRealization
                                === scalar.formulaRealization,
                            sameSurface:
                                row.closureFrame.surfaceRealization
                                === scalar.surfaceRealization,
                            sameTypedPredicate:
                                row.closureFrame.finalTypedVncSlotFrame?.slots
                                    ?.predicate?.stem
                                === scalar.finalTypedVncSlotFrame?.slots
                                    ?.predicate?.stem,
                        };
                    }),
                };
            });
        })(),
        ["compound", "purposive", "honorific"].map(family => ({
            family,
            status: "authorized",
            authorized: 2,
            blocked: 0,
            scalarParity: true,
            rows: [
                {
                    canonical: true,
                    sameFormula: true,
                    sameSurface: true,
                    sameTypedPredicate: true,
                },
                {
                    canonical: true,
                    sameFormula: true,
                    sameSurface: true,
                    sameTypedPredicate: true,
                },
            ],
        }))
    );

    s.eq(
        "Source-audit data stays out of presentation contracts and paradigm rows",
        (() => {
            const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
            const rendering = fs.readFileSync(path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
            const stateModule = fs.readFileSync(path.join(ROOT, "src/ui/state.mjs"), "utf8");
            const runtimeModule = fs.readFileSync(path.join(ROOT, "src/core/classical/vnc_lessons27_29_33_closure.mjs"), "utf8");
            const row = paradigm.rows[0];
            return {
                sourceAuditUiSelectors: /data-classical-lessons27-29-33-(?:source|grammar|result)/u.test(shell),
                renderingReadsLateAuditInventory: /CLASSICAL_NAHUATL_LESSONS_27_28_29_33_SOURCE_SPAN_INVENTORY|sourceInventoryIds/u.test(rendering),
                operationAuditKeys: ["sourceInventoryIds", "gcdId", "lcmId", "sourceDocument", "executableRulePath"].filter(key => Object.prototype.hasOwnProperty.call(ordinary.operationFrame, key)),
                resultAuditKeys: ["sourceClosure", "grammarClosure", "resultClosure", "sourceDocument"].filter(key => Object.prototype.hasOwnProperty.call(ordinary, key)),
                paradigmRowAuditKeys: ["sourceClosure", "grammarClosure", "resultClosure", "sourceInventoryIds", "inventory", "dispositions", "counts"].filter(key => Object.prototype.hasOwnProperty.call(row, key)),
                stateCarriesClosureReceipt: /lessons27282933ClosureFrame\\s*[,}]/u.test(rendering),
                lateOperationLessonGate:
                    /finalizedState\.lesson\s*!==\s*"7"\s*\|\|\s*finalizedState\.lesson11Construction/u
                        .test(rendering),
                resultNarratesCanvasEvidence:
                    /Canvas comparison evidence remains attached to the generated forms/u
                        .test(rendering),
                latePresentationEvidenceSuppression:
                    /suppressSourceAuditEvidence:\s*state\.lateOperation\s*!==\s*"none"/u
                        .test(rendering)
                    && /state\.lateOperation\s*!==\s*"none"\s*\?\s*\{\}\s*:\s*\{\s*ruleRefs/u
                        .test(rendering),
                paradigmRowsAttachCanvasWitnesses:
                    /cn-appendix-a-vnc-paradigm/u.test(rendering),
                runtimeInstallsAuditExports:
                    /SOURCE_SPAN_INVENTORY|auditClassicalNahuatlLessons27282933SourceClosure/u
                        .test(runtimeModule),
                lessonLabelsInSourceChoices:
                    /(?:frequentative|compound|purposive|honorific|reverential|pejorative)\s*·\s*Lesson/u
                        .test(shell)
                    || /<optgroup label="Lesson (?:27|28|29|33)">/u.test(shell),
                derivedOrArbitraryLateControls: [
                    "classical-rule-logic-purposive-direction",
                    "classical-rule-logic-attitude-compound-target",
                    "classical-rule-logic-frequentative-replacement-syllable",
                ].filter(id => shell.includes(`id="${id}"`)),
                genuineAlternativeControls: [
                    "classical-rule-logic-compound-itz-sense",
                    "classical-rule-logic-compound-ya-syncopation",
                    "classical-rule-logic-honorific-stem-alternative",
                ].filter(id => shell.includes(`id="${id}"`)),
                pursuitAuditAttachedToPresentation:
                    /buildLesson(?:27Frequentative|28VerbalEmbed|29Purposive|33HonorificPejorative)PursuitFrame/u
                        .test(stateModule)
                    || /"audit-lesson-27":\s*"audit Lesson 27"/u.test(rendering),
            };
        })(),
        {
            sourceAuditUiSelectors: false,
            renderingReadsLateAuditInventory: false,
            operationAuditKeys: [],
            resultAuditKeys: [],
            paradigmRowAuditKeys: [],
            stateCarriesClosureReceipt: false,
            lateOperationLessonGate: false,
            resultNarratesCanvasEvidence: false,
            latePresentationEvidenceSuppression: true,
            paradigmRowsAttachCanvasWitnesses: false,
            runtimeInstallsAuditExports: false,
            lessonLabelsInSourceChoices: false,
            derivedOrArbitraryLateControls: [],
            genuineAlternativeControls: [
                "classical-rule-logic-compound-itz-sense",
                "classical-rule-logic-compound-ya-syncopation",
                "classical-rule-logic-honorific-stem-alternative",
            ],
            pursuitAuditAttachedToPresentation: false,
        }
    );

    s.eq(
        "Contract registry recognizes operation, machinery, and closure frames",
        (() => {
            const registry = ctx.getDefaultGrammarContractRegistry();
            return [
                ["classical-nahuatl-late-vnc-derivation-operation-frame", ordinary.operationFrame],
                ["classical-nahuatl-late-vnc-derivation-operation-machinery-frame", ordinary.selectedMachineryFrame],
                ["classical-nahuatl-late-vnc-derivation-closure-frame", ordinary],
            ].map(([contractKind, frame]) => {
                const inspection = ctx.inspectRegisteredGrammarContract(registry, frame, { contractKind, version: 1 });
                return [contractKind, inspection.status, inspection.errors];
            });
        })(),
        [
            ["classical-nahuatl-late-vnc-derivation-operation-frame", "valid", []],
            ["classical-nahuatl-late-vnc-derivation-operation-machinery-frame", "valid", []],
            ["classical-nahuatl-late-vnc-derivation-closure-frame", "valid", []],
        ]
    );

    return s;
}

module.exports = { run };
