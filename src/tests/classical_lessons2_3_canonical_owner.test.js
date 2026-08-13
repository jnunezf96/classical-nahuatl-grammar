"use strict";

const { createSuite } = require("./runner");

function summarizeTranscription(frame) {
    return {
        authorized: frame.authorizationStatus,
        canonical: frame.authorizationStatus === "authorized",
        formula: frame.formula,
        written: frame.surface,
        sourceBound:
            frame.formulaProjection?.sourceFrame === frame.sourceFrame
            && frame.writtenProjection?.sourceFrame === frame.sourceFrame,
        independent: [
            frame.formulaProjection?.derivedFromWrittenProjection,
            frame.writtenProjection?.derivedFromFormulaProjection,
            frame.formulaDerivedFromWrittenProjection,
            frame.writtenDerivedFromFormulaProjection,
        ],
    };
}

function run(ctx) {
    const s = createSuite("classical_lessons2_3_canonical_owner");

    const source = (constituents, contextAssertions) =>
        ctx.buildClassicalNahuatlTranscriptionSourceFrame({
            constituents: constituents.map((segments) => ({ segments })),
            ...(contextAssertions ? { contextAssertions } : {}),
        });
    const transcribe = (constituents) => {
        const sourceFrame = source(constituents);
        return {
            sourceFrame,
            result: ctx.executeClassicalGrammarApplicationRequest({
                operationId: "orthography:transcription",
                args: [sourceFrame],
            }).canonicalResult,
        };
    };

    const contextualCoordinates = [
        [["/k/", "a"]],
        [["/k/", "e"]],
        [["a", "/k/"]],
        [["/w/", "a"]],
        [["a", "/w/"]],
        [["/kʷ/", "a"]],
        [["a", "/kʷ/"]],
        [["a", "/w/"], ["e"]],
        [["a", "/k/"], ["e"]],
        [["a", "/kʷ/"], ["e"]],
    ].map((constituents) => transcribe(constituents));

    s.eq(
        "orthography:transcription realizes c/qu, hu/uh, cu/uc and open-transition exceptions from owner-issued typed constituents",
        contextualCoordinates.map(({ sourceFrame, result }) => ({
            sourceCanonical:
                ctx.isClassicalNahuatlTranscriptionSourceFrame(sourceFrame),
            sourceContainsOnlyConstituents:
                sourceFrame.sourceConstituentsOnly === true
                && !Object.prototype.hasOwnProperty.call(
                    sourceFrame,
                    "contextualRealizations"
                )
                && !Object.prototype.hasOwnProperty.call(
                    sourceFrame,
                    "formula"
                )
                && !Object.prototype.hasOwnProperty.call(
                    sourceFrame,
                    "surface"
                ),
            resultCanonical:
                ctx.isClassicalNahuatlTranscriptionFrame(result),
            formula: result?.formula,
            written: result?.surface,
        })),
        [
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(/k/a)#",
                written: "ca",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(/k/e)#",
                written: "que",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(a/k/)#",
                written: "ac",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(/w/a)#",
                written: "hua",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(a/w/)#",
                written: "auh",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(/kʷ/a)#",
                written: "cua",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(a/kʷ/)#",
                written: "auc",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(a/w/-e)#",
                written: "auhe",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(a/k/-e)#",
                written: "aque",
            },
            {
                sourceCanonical: true,
                sourceContainsOnlyConstituents: true,
                resultCanonical: true,
                formula: "#(a/kʷ/-e)#",
                written: "acue",
            },
        ]
    );

    s.eq(
        "formula and written projections are independent and identity-bound to one typed orthographic source",
        contextualCoordinates.map(({ result }) => summarizeTranscription(
            result
        )),
        contextualCoordinates.map(({ result }) => ({
            authorized: "authorized",
            canonical: true,
            formula: result.formula,
            written: result.surface,
            sourceBound: true,
            independent: [false, false, false, false],
        }))
    );

    const carrierFrame =
        contextualCoordinates[0].result.carrierFrame;
    s.eq(
        "transcription Results expose identity-bound carrier distinctions as read-only facts, never controls",
        {
            canonical:
                ctx.isClassicalNahuatlTranscriptionCarrierFrame(
                    carrierFrame
                ),
            system: [
                carrierFrame.systemFacts.segmentalPhonemeCount,
                carrierFrame.systemFacts.vowelPhonemeCount,
                carrierFrame.systemFacts.consonantPhonemeCount,
            ],
            vowelPairs:
                carrierFrame.vowelSystemFacts.lengthPairCount,
            consonantClasses:
                carrierFrame.consonantSystemFacts.classes,
            selected:
                carrierFrame.selectedCarriers.map(
                    carrier => carrier.segment
                ),
            authority: [
                carrierFrame.readOnly,
                carrierFrame.userSelectable,
                carrierFrame.generationAuthority,
                carrierFrame.lessonMetadataAuthority,
            ],
            copiedCanonical:
                ctx.isClassicalNahuatlTranscriptionCarrierFrame({
                    ...carrierFrame,
                }),
        },
        {
            canonical: true,
            system: [23, 8, 15],
            vowelPairs: 4,
            consonantClasses: [
                "sonorant",
                "fricative",
                "stop",
                "affricate",
            ],
            selected: ["/k/", "a"],
            authority: [true, false, false, false],
            copiedCanonical: false,
        }
    );

    const missingContext = source([["/k/"]]);
    const mismatchedContext = source(
        [["/k/", "e"]],
        [{
            constituentIndex: 0,
            segmentIndex: 0,
            position: "syllable-final",
            followingVowel: "",
        }]
    );
    const hostileSource = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
        constituents: [{ segments: ["/k/", "a"] }],
        nestedAuthority: {
            formula: "#(FORGED)#",
            surface: "forged",
        },
    });
    const canonicalSource = contextualCoordinates[0].sourceFrame;
    const copiedSource = {
        ...canonicalSource,
        constituents: canonicalSource.constituents,
    };
    const hostileResult = ctx.buildClassicalNahuatlTranscriptionFrame(
        canonicalSource,
        {
            lesson: 2,
            storedAnswer: "ca",
        }
    );
    s.eq(
        "transcription fails closed on missing/mismatched context and every copied or external authority carrier",
        {
            missing: [
                missingContext.authorizationStatus,
                missingContext.blockReason,
            ],
            mismatch: [
                mismatchedContext.authorizationStatus,
                mismatchedContext.blockReason,
            ],
            hostileSource: [
                hostileSource.authorizationStatus,
                hostileSource.blockReason,
            ],
            raw: [
                ctx.buildClassicalNahuatlTranscriptionFrame("ca")
                    .authorizationStatus,
                ctx.buildClassicalNahuatlTranscriptionFrame("ca")
                    .blockReason,
            ],
            copied: [
                ctx.buildClassicalNahuatlTranscriptionFrame(copiedSource)
                    .authorizationStatus,
                ctx.buildClassicalNahuatlTranscriptionFrame(copiedSource)
                    .blockReason,
            ],
            hostileResult: [
                hostileResult.authorizationStatus,
                hostileResult.blockReason,
            ],
            retiredShapeProof:
                typeof ctx.buildClassicalNahuatlLesson2ProofFrame,
            forgedCanonical:
                ctx.isClassicalNahuatlTranscriptionFrame({
                    ...contextualCoordinates[0].result,
                }),
        },
        {
            missing: [
                "blocked",
                "classical-transcription-context-required",
            ],
            mismatch: [
                "blocked",
                "classical-transcription-context-mismatch",
            ],
            hostileSource: [
                "blocked",
                "classical-transcription-external-authority-forbidden:request.nestedAuthority.formula",
            ],
            raw: [
                "blocked",
                "classical-transcription-owner-issued-source-required",
            ],
            copied: [
                "blocked",
                "classical-transcription-owner-issued-source-required",
            ],
            hostileResult: [
                "blocked",
                "classical-transcription-external-authority-forbidden:request.lesson",
            ],
            retiredShapeProof: "undefined",
            forgedCanonical: false,
        }
    );

    const transcriptionAnalyses = [
        ctx.buildClassicalNahuatlSpellingChangeFrame({
            phoneme: "/k/",
            syllablePosition: "initial",
            followingVowel: "i",
        }),
        ctx.buildClassicalNahuatlOpenTransitionFrame({
            boundaryType: "compound",
            stemFinalPhoneme: "[w]",
            followingVowel: "e",
        }),
        ctx.buildClassicalNahuatlSyllableStructureFrame("calli"),
        ctx.buildClassicalNahuatlStressFrame("calli"),
        ctx.buildClassicalNahuatlConsonantalLengthFrame({
            leftConsonant: "l",
            rightConsonant: "l",
        }),
        ctx.buildClassicalNahuatlAssimilationFrame({
            leftConsonant: "m",
            rightConsonant: "n",
        }),
        ctx.buildClassicalNahuatlProgressiveAssimilationFrame(
            "mil-tlah"
        ),
        ctx.buildClassicalNahuatlConsonantLossFrame({
            leftConsonant: "tz",
            rightConsonant: "w",
        }),
        ctx.buildClassicalNahuatlConsonantPhoneShiftFrame({
            sourceConsonant: "m",
            position: "exposed",
        }),
        ctx.buildClassicalNahuatlVowelElisionFrame({
            sourceMorpheme: "icxi",
            targetMorpheme: "cxi",
        }),
        ctx.buildClassicalNahuatlLongVowelGlottalFrame({
            morpheme: "huē",
            compoundSubposition: "embed",
            matrixMorpheme: "cāuh",
        }),
        ctx.buildClassicalNahuatlProsodicContourFrame({
            contourType: "nuclear-clause-stress",
            vocable: "calli",
        }),
        ctx.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
            sourceStem: "chōc",
            retainedStem: "chōc",
            followingMorpheme: "ilia",
        }),
    ];
    s.eq(
        "all shared transcription analyses issue exact independent written and formula projections through one owner",
        transcriptionAnalyses.map(frame => [
            ctx.isClassicalNahuatlTranscriptionAnalysisFrame(frame),
            frame.authorizationStatus,
            frame.formula,
            frame.surface,
            frame.formulaProjection?.derivedFromWrittenProjection,
            frame.writtenProjection?.derivedFromFormulaProjection,
            Object.prototype.hasOwnProperty.call(frame, "lesson"),
        ]),
        [
            [true, "authorized", "#(/k/-i)#", "qu", false, false, false],
            [true, "authorized", "#([w]-e)#", "uh", false, false, false],
            [true, "authorized", "#(calli)#", "calli", false, false, false],
            [true, "authorized", "#(calli)#", "calli", false, false, false],
            [true, "authorized", "#(l-l)#", "ll", false, false, false],
            [true, "authorized", "#(m-n)#", "nn", false, false, false],
            [true, "authorized", "#(mil-tlah)#", "millah", false, false, false],
            [true, "authorized", "#(tz-w)#", "tz", false, false, false],
            [true, "authorized", "#(m)#", "n", false, false, false],
            [true, "authorized", "#(icxi)#", "cxi", false, false, false],
            [true, "authorized", "#(huē-cāuh)#", "hueh", false, false, false],
            [true, "authorized", "#(calli)#", "calli", false, false, false],
            [true, "authorized", "#(chōc-ilia)#", "chōqu", false, false, false],
        ]
    );

    const maZoSource =
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-ma-zo");
    const maZo = ctx.requestClassicalParticleResult(maZoSource);
    const ahzoSource =
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-ahzo");
    const ahzo = ctx.requestClassicalParticleResult(ahzoSource);
    const caSource =
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-ca-negative");
    const maSource =
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-ma");
    const inSource =
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-in");
    const caMissing =
        ctx.buildClassicalNahuatlParticleResultFrame(caSource);
    const caMismatch =
        ctx.buildClassicalNahuatlParticleResultFrame(caSource, {
            precedingParticleSourceFrame: inSource,
        });
    const caLicensed =
        ctx.buildClassicalNahuatlParticleResultFrame(caSource, {
            precedingParticleSourceFrame: maSource,
        });
    const caSelected = ctx.requestClassicalNegativeParticleSelection({
        polarity: "negative",
        precedingParticleId: "l3-ma",
        sentenceKind: "wish",
    });

    s.eq(
        "particle:result licenses an exact lexical Source, preserves internal formula boundaries, and derives written form independently",
        {
            maZo: {
                source:
                    ctx.isClassicalNahuatlParticleSourceFrame(maZoSource),
                sourceContainsOnlyLexemeIdentity:
                    maZoSource.sourceConstituentsOnly === true
                    && !Object.prototype.hasOwnProperty.call(
                        maZoSource,
                        "sourceForm"
                    )
                    && !Object.prototype.hasOwnProperty.call(
                        maZoSource,
                        "formula"
                    )
                    && !Object.prototype.hasOwnProperty.call(
                        maZoSource,
                        "surface"
                    ),
                result:
                    ctx.isClassicalNahuatlParticleResultFrame(maZo),
                formula: maZo.formula,
                written: maZo.surface,
                sourceBound: [
                    maZo.formulaProjection.sourceFrame === maZoSource,
                    maZo.writtenProjection.sourceFrame === maZoSource,
                ],
                independent: [
                    maZo.formulaProjection.derivedFromWrittenProjection,
                    maZo.writtenProjection.derivedFromFormulaProjection,
                ],
            },
            ahzo: [
                ahzo.formula,
                ahzo.surface,
            ],
            ca: {
                missing: [
                    caMissing.authorizationStatus,
                    caMissing.blockReason,
                ],
                mismatch: [
                    caMismatch.authorizationStatus,
                    caMismatch.blockReason,
                ],
                licensed: [
                    caLicensed.authorizationStatus,
                    caLicensed.blockReason,
                    caSelected.particleResultFrame.formula,
                    caSelected.particleResultFrame.surface,
                ],
            },
        },
        {
            maZo: {
                source: true,
                sourceContainsOnlyLexemeIdentity: true,
                result: true,
                formula: "mā zo",
                written: "mā zo",
                sourceBound: [true, true],
                independent: [false, false],
            },
            ahzo: ["ah#zo", "ahzo"],
            ca: {
                missing: [
                    "blocked",
                    "classical-negative-particle-selection-required",
                ],
                mismatch: [
                    "blocked",
                    "classical-negative-particle-selection-required",
                ],
                licensed: [
                    "blocked",
                    "classical-negative-particle-selection-required",
                    "ca#",
                    "ca",
                ],
            },
        }
    );

    s.eq(
        "particle meanings and usage remain owner-issued read-only Result facts",
        {
            maZo: {
                meanings: maZo.lexicalFactFrame.meanings,
                usage: maZo.lexicalFactFrame.usageFacts,
                readOnly: maZo.lexicalFactFrame.readOnly,
                userSelectable:
                    maZo.lexicalFactFrame.userSelectable,
                generationAuthority:
                    maZo.lexicalFactFrame.generationAuthority,
            },
            ahzo: {
                meanings: ahzo.lexicalFactFrame.meanings,
                usage: ahzo.lexicalFactFrame.usageFacts,
            },
            neutralInventory: [
                typeof ctx.getClassicalNahuatlParticleEntries,
                typeof ctx.findClassicalNahuatlParticleEntry,
                typeof ctx
                    .getClassicalNahuatlParticleClauseRelationMarkerOptions,
            ],
        },
        {
            maZo: {
                meanings: ["even if", "even though", "although"],
                usage: ["fixed-order collocation"],
                readOnly: true,
                userSelectable: false,
                generationAuthority: false,
            },
            ahzo: {
                meanings: ["perhaps"],
                usage: [
                    "negativized particle",
                    "may stand as an utterance",
                ],
            },
            neutralInventory: [
                "function",
                "function",
                "function",
            ],
        }
    );

    const copiedParticleSource = { ...maZoSource };
    const hostileParticle = ctx.buildClassicalNahuatlParticleResultFrame(
        maZoSource,
        {
            restoredState: {
                formula: "FORGED",
                surface: "forged",
                lesson: 3,
                example: "stored witness",
            },
        }
    );
    s.eq(
        "particle lexical authorization rejects ambiguous, copied, raw, forged, restored, and stored-answer authority",
        {
            ambiguous: (() => {
                const frame =
                    ctx.buildClassicalNahuatlParticleSourceFrame("o");
                return [frame.authorizationStatus, frame.blockReason];
            })(),
            copied: (() => {
                const frame =
                    ctx.buildClassicalNahuatlParticleResultFrame(
                        copiedParticleSource
                    );
                return [frame.authorizationStatus, frame.blockReason];
            })(),
            raw: (() => {
                const frame =
                    ctx.buildClassicalNahuatlParticleResultFrame(
                        "l3-ma-zo"
                    );
                return [frame.authorizationStatus, frame.blockReason];
            })(),
            hostile: [
                hostileParticle.authorizationStatus,
                hostileParticle.blockReason,
            ],
            forgedResult:
                ctx.isClassicalNahuatlParticleResultFrame({
                    ...maZo,
                }),
        },
        {
            ambiguous: [
                "blocked",
                "classical-particle-identity-ambiguous",
            ],
            copied: [
                "blocked",
                "classical-particle-owner-issued-source-required",
            ],
            raw: [
                "blocked",
                "classical-particle-owner-issued-source-required",
            ],
            hostile: [
                "blocked",
                "classical-particle-external-authority-forbidden:request.restoredState",
            ],
            forgedResult: false,
        }
    );

    const ordinaryNnc = ctx.buildClassicalNahuatlClassGovernedNncFrame(
        "tēuc",
        {
            state: "absolutive",
            subject: "1sg",
            nounClass: "tli",
            classSelectionAuthority: "user-selection",
        }
    );
    const clauseResult =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            outputKind: "scalar",
            args: [
                ordinaryNnc.nncSlotFrame,
                {
                    sentenceType: "assertion",
                    polarity: "positive",
                },
            ],
        }).canonicalResult;
    const auhSource =
        ctx.buildClassicalNahuatlParticleSourceFrame(
            "l3-auh-conjunctor"
        );
    const sentence = ctx.requestClassicalSentenceParticleFrame({
        particleSourceFrame: auhSource,
        nuclearResultFrame: clauseResult,
        honorificized: false,
    });
    const auhInterjectionSource =
        ctx.buildClassicalNahuatlParticleSourceFrame(
            "l3-auh-interjection"
        );
    const honorificSentence = ctx.requestClassicalSentenceParticleFrame({
        particleSourceFrame: auhInterjectionSource,
        nuclearResultFrame: clauseResult,
        honorificized: true,
    });
    const rightAttachedNegativeSource =
        ctx.buildClassicalNahuatlParticleSourceFrame(
            "l3-in-tla-ca"
        );
    const rightAttachedNegativeSentence =
        ctx.requestClassicalSentenceParticleFrame({
            particleSourceFrame: rightAttachedNegativeSource,
            nuclearResultFrame: clauseResult,
            honorificized: false,
        });

    s.eq(
        "sentence:particle-adjunction composes independent projections only from owner-issued particle and clause Results",
        {
            ordinary: [
                sentence.authorizationStatus,
                sentence.blockReason,
                ctx.isClassicalNahuatlIssuedParticleSentenceLayerFrame(
                    sentence
                ),
                sentence.sentenceFormulaDisplay,
                sentence.sentenceSurfaceDisplay,
                sentence.formulaProjection?.particleSourceFrame
                    === auhSource,
                sentence.writtenProjection?.canonicalInputFrame
                    === clauseResult,
                sentence.formulaProjection
                    ?.derivedFromWrittenProjection,
                sentence.writtenProjection
                    ?.derivedFromFormulaProjection,
            ],
            honorific: [
                honorificSentence.authorizationStatus,
                honorificSentence.particleResultFrame?.formula,
                honorificSentence.particleResultFrame?.surface,
                honorificSentence.sentenceFormulaDisplay,
                honorificSentence.sentenceSurfaceDisplay,
            ],
            rightAttachedNegative: [
                rightAttachedNegativeSentence.authorizationStatus,
                rightAttachedNegativeSentence.rightAttachedToNucleus,
                rightAttachedNegativeSentence.sentenceBoundaryRelation,
                rightAttachedNegativeSentence.sentenceFormulaDisplay,
                rightAttachedNegativeSentence.sentenceSurfaceDisplay,
            ],
        },
        {
            ordinary: [
                "authorized",
                "",
                true,
                "auh #ni-0(tēuc)tli-0#.",
                "Auh nitēuctli.",
                true,
                true,
                false,
                false,
            ],
            honorific: [
                "authorized",
                "āuhtzin",
                "āuhtzin",
                "āuhtzin",
                "Āuhtzin",
            ],
            rightAttachedNegative: [
                "authorized",
                true,
                "particle-attached-to-nucleus-on-right",
                "in tlā ca#ni-0(tēuc)tli-0#.",
                "In tlā canitēuctli.",
            ],
        }
    );

    const rawParticleSelection =
        ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
            particleId: "l3-auh-conjunctor",
            nuclearResultFrame: clauseResult,
        });
    const copiedClause =
        ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
            particleSourceFrame: auhSource,
            nuclearResultFrame: { ...clauseResult },
        });
    const hostileSentence =
        ctx.buildClassicalNahuatlSentenceParticleLayerFrame({
            particleSourceFrame: auhSource,
            nuclearResultFrame: clauseResult,
            restoredState: {
                formula: "FORGED",
                surface: "forged",
                lesson: 3,
                example: "stored",
            },
        });
    s.eq(
        "sentence adjunction rejects raw selection, copied clause identity, and hostile formula/surface/curriculum carriers",
        {
            raw: [
                rawParticleSelection.authorizationStatus,
                rawParticleSelection.blockReason,
            ],
            copied: [
                copiedClause.authorizationStatus,
                copiedClause.blockReason,
            ],
            hostile: [
                hostileSentence.authorizationStatus,
                hostileSentence.blockReason,
            ],
            copiedResultCanonical:
                ctx.isClassicalNahuatlIssuedParticleSentenceLayerFrame({
                    ...sentence,
                }),
        },
        {
            raw: [
                "blocked",
                "classical-particle-owner-issued-source-required",
            ],
            copied: [
                "blocked",
                "canonical-issued-nuclear-result-required",
            ],
            hostile: [
                "blocked",
                "classical-sentence-particle-external-authority-forbidden:request.restoredState",
            ],
            copiedResultCanonical: false,
        }
    );

    const scalarParticleCoordinates = [
        "l3-ma-zo",
        "l3-in-tla",
        "l3-auh-conjunctor",
    ].map((particleId) => {
        const sourceFrame =
            ctx.buildClassicalNahuatlParticleSourceFrame(particleId);
        const scalar =
            ctx.buildClassicalNahuatlParticleResultFrame(
                sourceFrame
            );
        const pointwise =
            ctx.buildClassicalNahuatlParticleResultFrame(
                sourceFrame
            );
        return [
            scalar.formula,
            scalar.surface,
            pointwise.formula,
            pointwise.surface,
            ctx.isClassicalNahuatlParticleResultFrame(pointwise),
        ];
    });
    s.eq(
        "each particle coordinate is pointwise equivalent to the same scalar evaluator",
        scalarParticleCoordinates,
        [
            ["mā zo", "mā zo", "mā zo", "mā zo", true],
            ["in tlā", "in tlā", "in tlā", "in tlā", true],
            ["auh", "auh", "auh", "auh", true],
        ]
    );

    return s;
}

module.exports = { run };
