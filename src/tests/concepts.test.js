"use strict";

const { createSuite } = require("./runner");

function exactDescriptorForge(value) {
    return Object.freeze(Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(value)
    ));
}

function run(ctx) {
    const s = createSuite("concepts");

    s.eq(
        "concept owner exposes typed Source, read-only evaluation, validators, and documentary terminology only",
        {
            buildSource: typeof ctx.buildClassicalGrammarConceptSource,
            validateSource: typeof ctx.isClassicalGrammarConceptSource,
            evaluate: typeof ctx.evaluateClassicalGrammarConcept,
            validateResult: typeof ctx.isClassicalGrammarConceptResult,
            validateOperation:
                typeof ctx.isClassicalGrammarConceptOperationContract,
            terminology: typeof ctx.getNuclearClauseTerminology,
            oldRegistry: typeof ctx.getConceptRegistry,
            oldTokenClassifier: typeof ctx.classifyConceptToken,
            oldGlossary: typeof ctx.buildConceptGlossaryDisplayModel,
        },
        {
            buildSource: "function",
            validateSource: "function",
            evaluate: "function",
            validateResult: "function",
            validateOperation: "function",
            terminology: "function",
            oldRegistry: "undefined",
            oldTokenClassifier: "undefined",
            oldGlossary: "undefined",
        }
    );

    s.eq(
        "CN, CNV, and CNN labels survive only as documentary annotations",
        ctx.getNuclearClauseTerminology(),
        {
            nc: {
                english: "nuclear clause",
                spanish: "cláusula nuclear",
                abbreviation: "CN",
                semanticId: "nuclear-clause",
            },
            vnc: {
                english: "verbal nuclear clause",
                spanish: "cláusula nuclear verbal",
                abbreviation: "CNV",
                semanticId: "verbal-nuclear-clause",
            },
            nnc: {
                english: "nominal nuclear clause",
                spanish: "cláusula nuclear nominal",
                abbreviation: "CNN",
                semanticId: "nominal-nuclear-clause",
            },
        }
    );

    const positiveCases = [
        ["terminology", "nounstem", "nominal-lexical-item"],
        ["terminology", "verbstem", "verbal-lexical-item"],
        ["terminology", "vocable", "syllabic-carrier-unit"],
        ["terminology", "mainline-object", "classical-structural-term"],
        ["terminology", "shuntline-object", "classical-structural-term"],
        ["terminology", "nuclear-clause", "classical-structural-term"],
        ["terminology", "basic-participant", "classical-structural-term"],
        ["terminology", "supplementary-participant", "classical-structural-term"],
        ["terminology", "stock", "classical-structural-term"],
        ["terminology", "destockal-verbstem", "classical-structural-term"],
        ["communication", "language", "communication-system"],
        ["communication", "communication-event", "structured-communication"],
        ["communication", "carrier-system", "carrier-system"],
        ["communication", "content-system", "content-system"],
        ["communication", "phonological-subsystem", "carrier-subsystem"],
        ["communication", "sigological-subsystem", "carrier-subsystem"],
        ["communication", "graphological-subsystem", "derived-carrier-subsystem"],
        ["analysis-level", "type", "type-level"],
        ["analysis-level", "token", "token-level"],
        ["analysis-level", "instance", "instance-level"],
        ["linguistic-element", "element", "basic-linear-element"],
        [
            "linguistic-element",
            "type-level-inventory",
            "four-kind-type-level-element-inventory",
        ],
        ["linguistic-element", "phoneme", "carrier-type-element"],
        ["linguistic-element", "grapheme", "carrier-type-element"],
        ["linguistic-element", "sigeme", "carrier-type-element"],
        ["linguistic-element", "sememe", "content-type-element"],
        [
            "phone-repertory-analysis",
            "phone-definition",
            "phone-repertory-analysis",
        ],
        [
            "graph-variant-analysis",
            "graph-definition",
            "graph-variant-analysis",
        ],
        ["token-element", "sig", "carrier-token-element"],
        ["token-element", "seme", "content-token-element"],
        ["token-element", "regular-sig", "regular-sig-token"],
        ["token-element", "irregular-sig", "irregular-sig-token"],
        ["morpheme", "morpheme", "type-level-meaningful-unit"],
        ["morpheme", "portmanteau-morpheme", "morpheme-class"],
        ["morpheme", "connective-morpheme", "morpheme-class"],
        ["morpheme", "ordinary-morpheme", "morpheme-class"],
        ["morpheme", "sounded-morpheme", "morpheme-class"],
        ["morpheme", "silent-morpheme", "morpheme-class"],
        ["morpheme", "morph", "token-level-meaningful-unit"],
        [
            "morph-form-instance-classification",
            "form-instance",
            "morph-form-instance-classification",
        ],
        [
            "morph-conditioning-analysis",
            "phonological-conditioning",
            "morph-conditioning-analysis",
        ],
        [
            "morph-conditioning-analysis",
            "morphological-conditioning",
            "morph-conditioning-analysis",
        ],
        [
            "morph-structure-perception-analysis",
            "sounded-morph-recognition",
            "morph-structure-perception-analysis",
        ],
        [
            "morph-structure-perception-analysis",
            "syllable-morph-noncoterminality",
            "morph-structure-perception-analysis",
        ],
        [
            "morph-structure-perception-analysis",
            "sigeme-content-recognition",
            "morph-structure-perception-analysis",
        ],
        ["carrier-unit", "syllable", "meaningless-carrier-combination"],
        ["carrier-unit", "vocable", "meaningless-carrier-sequence"],
        ["rank", "morpheme", "meaningful-element-rank"],
        ["rank", "root", "single-major-morpheme-rank"],
        ["rank", "stock", "derived-stem-forming-rank"],
        ["rank", "stem", "lexical-item-rank"],
        ["rank", "particle", "invariant-sentence-fragment-rank"],
        ["rank", "group", "syntactic-unit-rank"],
        ["rank", "sentence", "sentence-rank"],
        ["structure", "simple-unit", "simple-structure"],
        ["structure", "complex-unit", "complex-structure"],
        ["structure", "constituent", "structure-part"],
        ["structure", "recursion", "recursive-composition"],
        ["structure", "concatenation", "additive-composition-principle"],
        ["structure", "interaction", "governed-composition-principle"],
        ["structure", "adjunctive", "unequal-function-unit-governance"],
        ["structure", "conjunctive", "equal-function-unit-governance"],
    ];
    const positiveResults = positiveCases.map(
        ([domain, selection, expectedClassification]) => {
            const source = ctx.buildClassicalGrammarConceptSource({
                domain,
                selection,
            });
            const direct = ctx.evaluateClassicalGrammarConcept(source);
            const receipt = ctx.executeClassicalGrammarApplicationRequest({
                operationId: "concept:classification",
                args: [source],
            });
            return {
                domain,
                selection,
                expectedClassification,
                sourceAuthorized:
                    ctx.isClassicalGrammarConceptSource(source),
                directAuthorized:
                    ctx.isClassicalGrammarConceptResult(direct)
                    && direct.authorizationStatus === "authorized",
                directClassification: direct.classification,
                applicationStatus: receipt.authorizationStatus,
                applicationClassification:
                    receipt.canonicalResult?.classification || "",
                sameProjectionApplicability:
                    direct.projectionApplicability,
                hasFormula:
                    Object.prototype.hasOwnProperty.call(direct, "formula"),
                hasSurface:
                    Object.prototype.hasOwnProperty.call(direct, "surface"),
            };
        }
    );
    s.eq(
        "every conceptual taxonomy Source executes through the same canonical read-only application operation",
        positiveResults,
        positiveCases.map(([domain, selection, expectedClassification]) => ({
            domain,
            selection,
            expectedClassification,
            sourceAuthorized: true,
            directAuthorized: true,
            directClassification: expectedClassification,
            applicationStatus: "authorized",
            applicationClassification: expectedClassification,
            sameProjectionApplicability: {
                written:
                    "not-applicable-read-only-non-generative-classification",
                formula:
                    "not-applicable-read-only-non-generative-classification",
            },
            hasFormula: false,
            hasSurface: false,
        }))
    );

    s.eq(
        "legacy structure-plane classifications cannot duplicate the separate foundational owners",
        ["function-unit", "form-class", "lexical-item", "participant-role"]
            .map((selection) => {
                const source = ctx.buildClassicalGrammarConceptSource({
                    domain: "structure-plane",
                    selection,
                });
                const result = ctx.evaluateClassicalGrammarConcept(source);
                return {
                    selection,
                    sourceStatus: source.authorizationStatus,
                    sourceReason: source.blockReason,
                    resultStatus: result.authorizationStatus,
                    resultReason: result.blockReason,
                };
            }),
        ["function-unit", "form-class", "lexical-item", "participant-role"]
            .map((selection) => ({
                selection,
                sourceStatus: "blocked",
                sourceReason: "concept-source-selection-unlicensed",
                resultStatus: "blocked",
                resultReason: "owner-issued-concept-source-required",
            }))
    );

    const participantSource = ctx.buildClassicalParticipantRoleAnalysisSource({
        analysisDomain: "participant-role-analysis",
        requestedAnalysisKind: "participant-role-inventory",
        participantChoice: "agent-patient-goal-instrument",
        prerequisites: null,
    });
    const participantResult =
        ctx.evaluateClassicalParticipantRoleAnalysis(participantSource);
    const planeSource = ctx.buildClassicalConceptualPlaneSeparationSource({
        analysisDomain: "conceptual-plane-separation",
        requestedAnalysisKind: "nonintermingling",
        participantChoice: "keep-planes-distinct",
        prerequisites: null,
    });
    const planeResult =
        ctx.evaluateClassicalConceptualPlaneSeparation(planeSource);
    s.eq(
        "participant roles and conceptual-plane separation execute as independent owners",
        {
            participant: {
                owner: participantResult.semanticOwnerId,
                classification: participantResult.classification,
                roles: participantResult.payload.roles,
                generated: participantResult.generationAllowed,
            },
            plane: {
                owner: planeResult.semanticOwnerId,
                classification: planeResult.classification,
                interminglingAllowed:
                    planeResult.payload.interminglingAllowed,
                generated: planeResult.generationAllowed,
            },
        },
        {
            participant: {
                owner: "participant-role-analysis",
                classification: "participant-role-inventory",
                roles: ["agent", "patient", "goal", "instrument"],
                generated: false,
            },
            plane: {
                owner: "conceptual-plane-separation",
                classification:
                    "conceptual-plane-nonintermingling-constraint",
                interminglingAllowed: false,
                generated: false,
            },
        }
    );

    const communicationSources = [
        ["language", "communication-system"],
        ["communication-event", "structured-communication"],
        ["carrier-system", "carrier-system"],
        ["graphological-subsystem", "derived-carrier-subsystem"],
    ].map(([selection, classification]) => {
        const communicationSource =
            ctx.buildClassicalGrammarConceptSource({
                domain: "communication",
                selection,
            });
        const communicationResult =
            ctx.evaluateClassicalGrammarConcept(communicationSource);
        const evidence =
            ctx.getClassicalGrammarConceptExecutionEvidence(
                communicationResult
            );
        return {
            selection,
            classification: communicationResult.classification,
            expectedClassification: classification,
            owner: communicationResult.semanticOwnerId,
            operation: evidence.evaluatedOperationId,
            stages: evidence.execution.stages,
            evidenceValid:
                ctx.isClassicalGrammarConceptExecutionEvidence(
                    evidence,
                    communicationResult
                ),
        };
    });
    s.eq(
        "communication structure is derived by one semantic owner with atom-specific live route steps",
        communicationSources,
        [
            {
                selection: "language",
                classification: "communication-system",
                expectedClassification: "communication-system",
                owner: "linguistic-communication-structure",
                operation: "classical.communication.structure.validate",
                stages: [
                    "concept-source-admitted",
                    "concept-semantic-owner-selected",
                    "language-communication-function-validated",
                ],
                evidenceValid: true,
            },
            {
                selection: "communication-event",
                classification: "structured-communication",
                expectedClassification: "structured-communication",
                owner: "linguistic-communication-structure",
                operation: "classical.communication.structure.validate",
                stages: [
                    "concept-source-admitted",
                    "concept-semantic-owner-selected",
                    "communication-component-structure-validated",
                    "communication-rule-mediated-sequence-validated",
                    "information-medium-coupling-validated",
                ],
                evidenceValid: true,
            },
            {
                selection: "carrier-system",
                classification: "carrier-system",
                expectedClassification: "carrier-system",
                owner: "linguistic-communication-structure",
                operation: "classical.communication.structure.validate",
                stages: [
                    "concept-source-admitted",
                    "concept-semantic-owner-selected",
                    "carrier-subsystem-inventory-validated",
                ],
                evidenceValid: true,
            },
            {
                selection: "graphological-subsystem",
                classification: "derived-carrier-subsystem",
                expectedClassification: "derived-carrier-subsystem",
                owner: "linguistic-communication-structure",
                operation: "classical.communication.structure.validate",
                stages: [
                    "concept-source-admitted",
                    "concept-semantic-owner-selected",
                    "graphological-derivation-boundary-validated",
                ],
                evidenceValid: true,
            },
        ]
    );

    const analysisLevelResults = ["type", "token", "instance"].map(
        (selection) => {
            const analysisSource =
                ctx.buildClassicalGrammarConceptSource({
                    domain: "analysis-level",
                    selection,
                });
            const analysisResult =
                ctx.evaluateClassicalGrammarConcept(analysisSource);
            const evidence =
                ctx.getClassicalGrammarConceptExecutionEvidence(
                    analysisResult
                );
            return {
                selection,
                classification: analysisResult.classification,
                owner: analysisResult.semanticOwnerId,
                operation: evidence.evaluatedOperationId,
                facts: analysisResult.facts,
                relations: analysisResult.relations,
                claimStages: evidence.execution.stages.slice(2),
                evidenceValid:
                    ctx.isClassicalGrammarConceptExecutionEvidence(
                        evidence,
                        analysisResult
                    ),
            };
        }
    );
    s.eq(
        "type, token, and instance remain read-only analytical ranks with independent cardinality and realization claims",
        analysisLevelResults,
        [
            {
                selection: "type",
                classification: "type-level",
                owner: "linguistic-analysis-levels",
                operation: "classical.analysis.level.classify",
                facts: [
                    "abstract-contrastive-class",
                    "ideal-abstract-generalizing-entity",
                    "hypothetical-identificational-class",
                    "mental-construct",
                    "language-specific-systemic-contrastive-feature-set",
                ],
                relations: [
                    "identified-by-eme-label",
                    "represented-by-limited-token-repertory",
                    "distills-token-level-variation",
                ],
                claimStages: [
                    "analysis-type-abstraction-validated",
                    "analysis-type-class-identity-validated",
                    "analysis-eme-label-system-validated",
                    "analysis-type-token-cardinality-validated",
                    "analysis-mental-construct-validated",
                    "analysis-type-distillation-validated",
                ],
                evidenceValid: true,
            },
            {
                selection: "token",
                classification: "token-level",
                owner: "linguistic-analysis-levels",
                operation: "classical.analysis.level.classify",
                facts: [
                    "type-particularization",
                    "type-representation",
                    "less-abstract-than-type",
                    "conforms-to-type-distinguishing-function",
                    "may-add-environment-conditioned-variation",
                    "mental-construct",
                ],
                relations: [
                    "manifested-by-unbounded-instances",
                    "distills-instance-level-details",
                ],
                claimStages: [
                    "analysis-token-particularization-validated",
                    "analysis-token-representation-validated",
                    "analysis-type-token-cardinality-validated",
                    "analysis-mental-construct-validated",
                    "analysis-token-distillation-validated",
                ],
                evidenceValid: true,
            },
            {
                selection: "instance",
                classification: "instance-level",
                owner: "linguistic-analysis-levels",
                operation: "classical.analysis.level.classify",
                facts: [
                    "concrete-one-time-realization",
                    "concrete-actual-performed-specific-one-time-realization",
                    "quotation-marks-nontechnical-identification",
                ],
                relations: ["manifests-token"],
                claimStages: [
                    "analysis-instance-definition-validated",
                    "analysis-instance-manifestation-validated",
                    "analysis-instance-quotation-use-validated",
                ],
                evidenceValid: true,
            },
        ]
    );

    const elementClassificationResults = [
        "element",
        "type-level-inventory",
    ].map((selection) => {
        const elementSource = ctx.buildClassicalGrammarConceptSource({
            domain: "linguistic-element",
            selection,
        });
        const elementResult =
            ctx.evaluateClassicalGrammarConcept(elementSource);
        const evidence =
            ctx.getClassicalGrammarConceptExecutionEvidence(elementResult);
        return {
            selection,
            classification: elementResult.classification,
            owner: elementResult.semanticOwnerId,
            operation: evidence.evaluatedOperationId,
            facts: elementResult.facts,
            relations: elementResult.relations,
            claimStages: evidence.execution.stages.slice(2),
            evidenceValid:
                ctx.isClassicalGrammarConceptExecutionEvidence(
                    evidence,
                    elementResult
                ),
        };
    });
    s.eq(
        "element definition and four-kind inventory execute as read-only classifications without taking over kind-specific owners",
        elementClassificationResults,
        [
            {
                selection: "element",
                classification: "basic-linear-element",
                owner: "linguistic-element-classification",
                operation: "classical.linguistic.element.classify",
                facts: [
                    "not-linearly-decomposable",
                    "may-be-feature-bundle",
                ],
                relations: [],
                claimStages: [
                    "element-basic-linear-unit-validated",
                    "element-feature-bundle-validated",
                ],
                evidenceValid: true,
            },
            {
                selection: "type-level-inventory",
                classification: "four-kind-type-level-element-inventory",
                owner: "linguistic-element-classification",
                operation: "classical.linguistic.element.classify",
                facts: [
                    "basic-type-level-element-kinds",
                    "phoneme-from-greek-phon-sound",
                    "grapheme-from-greek-graph-writing",
                    "sigeme-from-greek-sig-silence",
                    "sememe-from-greek-sem-sign",
                ],
                relations: [
                    "inventory-phoneme",
                    "inventory-grapheme",
                    "inventory-sigeme",
                    "inventory-sememe",
                    "carrier-elements-phoneme-grapheme-sigeme",
                    "content-element-sememe",
                ],
                claimStages: [
                    "element-four-kind-inventory-validated",
                    "element-carrier-content-partition-validated",
                    "element-greek-root-terminology-validated",
                ],
                evidenceValid: true,
            },
        ]
    );

    const phonemeSource = ctx.buildClassicalGrammarConceptSource({
        domain: "linguistic-element",
        selection: "phoneme",
    });
    const phonemeResult =
        ctx.evaluateClassicalGrammarConcept(phonemeSource);
    const phonemeEvidence =
        ctx.getClassicalGrammarConceptExecutionEvidence(phonemeResult);
    s.eq(
        "phoneme identity, inventory, and symbolization remain one read-only carrier classification with foreign examples restricted to evidence",
        {
            classification: phonemeResult.classification,
            owner: phonemeResult.semanticOwnerId,
            operation: phonemeEvidence.evaluatedOperationId,
            facts: phonemeResult.facts,
            relations: phonemeResult.relations,
            restrictions: phonemeResult.restrictions,
            claimStages: phonemeEvidence.execution.stages.slice(2),
            evidenceValid:
                ctx.isClassicalGrammarConceptExecutionEvidence(
                    phonemeEvidence,
                    phonemeResult
                ),
        },
        {
            classification: "carrier-type-element",
            owner: "carrier-phoneme-classification",
            operation: "classical.carrier.phoneme.classify",
            facts: [
                "phonological-subsystem-member",
                "meaningless-but-meaning-distinguishing",
                "language-specific-contrastive-identity",
                "distinctive-feature-organization",
                "physical-makeup-from-articulatory-feature-bundle",
                "voicing-place-and-manner-features",
                "enculturated-functional-distinctiveness-establishes-phoneme-identity",
                "phonemic-inventory-particular-to-language",
                "one-sound-one-alphabetic-symbol",
                "special-phonemic-symbols-may-be-required",
                "nahuatl-phonemic-symbols-defined-in-sections-2.2-2.3",
            ],
            relations: [
                "represented-by-phone-token",
                "phoneme-identity-distinct-from-physical-token",
            ],
            restrictions: [
                "foreign-language-examples-are-witnesses-only",
                "symbolization-does-not-authorize-written-result",
            ],
            claimStages: [
                "phoneme-subsystem-membership-validated",
                "phoneme-meaning-distinction-validated",
                "phoneme-articulatory-features-validated",
                "phoneme-enculturated-functional-identity-validated",
                "phoneme-language-specific-inventory-validated",
                "phoneme-one-sound-one-symbol-validated",
                "phoneme-special-symbol-requirement-validated",
            ],
            evidenceValid: true,
        }
    );

    const graphemeSource = ctx.buildClassicalGrammarConceptSource({
        domain: "linguistic-element",
        selection: "grapheme",
    });
    const graphemeResult =
        ctx.evaluateClassicalGrammarConcept(graphemeSource);
    const graphemeEvidence =
        ctx.getClassicalGrammarConceptExecutionEvidence(graphemeResult);
    s.eq(
        "grapheme identity, sound correspondence, and graph variation remain one read-only carrier classification",
        {
            classification: graphemeResult.classification,
            owner: graphemeResult.semanticOwnerId,
            operation: graphemeEvidence.evaluatedOperationId,
            facts: graphemeResult.facts,
            relations: graphemeResult.relations,
            restrictions: graphemeResult.restrictions,
            claimStages: graphemeEvidence.execution.stages.slice(2),
            evidenceValid:
                ctx.isClassicalGrammarConceptExecutionEvidence(
                    graphemeEvidence,
                    graphemeResult
                ),
        },
        {
            classification: "carrier-type-element",
            owner: "carrier-grapheme-classification",
            operation: "classical.carrier.grapheme.classify",
            facts: [
                "graphological-subsystem-member",
                "visual-representation-of-linguistic-sound",
                "identically-valued-shape-set",
                "phoneme-correspondence-may-be-many-to-many",
                "subsidiary-written-symbol",
                "recognizable-value-across-script-print-case-and-typeface",
                "phoneme-correspondence-one-two-or-three-to-one",
                "grapheme-may-correspond-to-multiple-phonemes",
                "phoneme-may-have-multiple-graphemic-spellings",
                "graph-variants-may-differ-by-case-script-print-typeface-style-and-size",
            ],
            relations: [
                "represented-by-graph-token",
                "graph-variation-preserves-grapheme-value",
            ],
            restrictions: [
                "foreign-spelling-examples-are-witnesses-only",
                "typographic-variation-is-not-a-grammar-choice",
                "classification-does-not-realize-written-output",
            ],
            claimStages: [
                "grapheme-subsystem-membership-validated",
                "grapheme-visual-representation-validated",
                "grapheme-shape-set-identity-validated",
                "grapheme-phoneme-correspondence-validated",
                "grapheme-graph-variation-validated",
            ],
            evidenceValid: true,
        }
    );

    const sigemeSource = ctx.buildClassicalGrammarConceptSource({
        domain: "linguistic-element",
        selection: "sigeme",
    });
    const sigemeResult =
        ctx.evaluateClassicalGrammarConcept(sigemeSource);
    const sigemeEvidence =
        ctx.getClassicalGrammarConceptExecutionEvidence(sigemeResult);
    s.eq(
        "sigeme identity, one-member inventory, meaning-bearing silence, and slash-oval-zero notation remain one read-only carrier classification",
        {
            classification: sigemeResult.classification,
            owner: sigemeResult.semanticOwnerId,
            operation: sigemeEvidence.evaluatedOperationId,
            facts: sigemeResult.facts,
            relations: sigemeResult.relations,
            restrictions: sigemeResult.restrictions,
            claimStages: sigemeEvidence.execution.stages.slice(2),
            evidenceValid:
                ctx.isClassicalGrammarConceptExecutionEvidence(
                    sigemeEvidence,
                    sigemeResult
                ),
        },
        {
            classification: "carrier-type-element",
            owner: "carrier-sigeme-classification",
            operation: "classical.carrier.sigeme.classify",
            facts: [
                "sigological-subsystem-member",
                "single-membered-meaning-bearing-silence-set",
                "one-sigeme-per-language-system",
                "soundless-element-carries-meaning-as-effectively-as-sounded-one",
                "slash-oval-zero-symbol",
                "slash-distinguishes-zero-from-vowel-o",
            ],
            relations: [
                "represented-by-sig-token",
                "carrier-system-includes-phoneme-and-sigeme",
                "documentarily-represented-by-slash-oval-zero",
            ],
            restrictions: [
                "phonological-system-label-cannot-exclude-sigeme",
                "displayed-zero-does-not-authorize-sigeme-source",
                "classification-does-not-realize-zero-surface",
                "square-zero-belongs-to-irregular-sig-token-owner",
            ],
            claimStages: [
                "sigeme-silent-carrier-equivalence-validated",
                "sigeme-single-inventory-validated",
                "sigeme-meaning-bearing-silence-validated",
                "sigeme-slash-oval-zero-notation-validated",
            ],
            evidenceValid: true,
        }
    );

    s.eq(
        "displayed regular and irregular zero notation cannot authorize a sigeme Source",
        ["/Ø/", "[0]", "[⎕]"].map((selection) => {
            const displayedSource =
                ctx.buildClassicalGrammarConceptSource({
                    domain: "linguistic-element",
                    selection,
                });
            const displayedResult =
                ctx.evaluateClassicalGrammarConcept(displayedSource);
            return {
                selection,
                sourceStatus: displayedSource.authorizationStatus,
                sourceReason: displayedSource.blockReason,
                sourceValid:
                    ctx.isClassicalGrammarConceptSource(displayedSource),
                resultStatus: displayedResult.authorizationStatus,
                resultReason: displayedResult.blockReason,
                facts: displayedResult.facts,
            };
        }),
        ["/Ø/", "[0]", "[⎕]"].map((selection) => ({
            selection,
            sourceStatus: "blocked",
            sourceReason: "concept-source-selection-unlicensed",
            sourceValid: false,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
            facts: [],
        }))
    );

    s.eq(
        "regular and irregular sig Sources execute their own read-only token owner with exact distinct zero notation",
        ["regular-sig", "irregular-sig"].map((selection) => {
            const sigSource = ctx.buildClassicalGrammarConceptSource({
                domain: "token-element",
                selection,
            });
            const sigResult = ctx.evaluateClassicalGrammarConcept(sigSource);
            const sigEvidence =
                ctx.getClassicalGrammarConceptExecutionEvidence(sigResult);
            return {
                selection,
                sourceValid: ctx.isClassicalGrammarConceptSource(sigSource),
                resultValid: ctx.isClassicalGrammarConceptResult(sigResult),
                classification: sigResult.classification,
                owner: sigResult.semanticOwnerId,
                operation: sigEvidence.evaluatedOperationId,
                facts: sigResult.facts,
                relations: sigResult.relations,
                restrictions: sigResult.restrictions,
                claimStages: sigEvidence.execution.stages.slice(2),
                writtenProjection: sigResult.projectionApplicability.written,
                generationAllowed: sigResult.generationAllowed,
            };
        }),
        [
            {
                selection: "regular-sig",
                sourceValid: true,
                resultValid: true,
                classification: "regular-sig-token",
                owner: "sig-token-classification",
                operation: "classical.carrier.sig.token.classify",
                facts: [
                    "regular-sig-is-token-level-representation-of-sigeme",
                    "regular-sig-notation-[0]",
                    "sigeme-has-one-token-level-member",
                ],
                relations: [
                    "regular-sig-realizes-sigeme",
                    "plain-zero-documents-regular-sig",
                    "sigeme-has-one-token-level-member",
                ],
                restrictions: [
                    "displayed-zero-does-not-authorize-sig-token-source",
                    "formula-zero-does-not-authorize-sig-token-source",
                    "plain-zero-and-square-zero-are-distinct-documentary-symbols",
                    "sig-token-classification-does-not-realize-written-surface",
                ],
                claimStages: [
                    "sig-regular-definition-validated",
                    "sig-regular-zero-singleton-validated",
                ],
                writtenProjection:
                    "not-applicable-read-only-non-generative-classification",
                generationAllowed: false,
            },
            {
                selection: "irregular-sig",
                sourceValid: true,
                resultValid: true,
                classification: "irregular-sig-token",
                owner: "sig-token-classification",
                operation: "classical.carrier.sig.token.classify",
                facts: [
                    "irregular-sig-alternative-exists",
                    "irregular-sig-is-representation-of-phoneme-unit",
                    "irregular-sig-notation-[⎕]",
                    "square-zero-name",
                ],
                relations: [
                    "irregular-sig-is-exception-to-regular-sig",
                    "irregular-sig-represents-phoneme-unit",
                    "square-zero-documents-irregular-sig",
                ],
                restrictions: [
                    "displayed-zero-does-not-authorize-sig-token-source",
                    "formula-zero-does-not-authorize-sig-token-source",
                    "plain-zero-and-square-zero-are-distinct-documentary-symbols",
                    "sig-token-classification-does-not-realize-written-surface",
                ],
                claimStages: [
                    "sig-irregular-alternative-validated",
                    "sig-irregular-phoneme-unit-validated",
                    "sig-irregular-square-zero-validated",
                ],
                writtenProjection:
                    "not-applicable-read-only-non-generative-classification",
                generationAllowed: false,
            },
        ]
    );

    s.eq(
        "displayed zero glyphs and answer-bearing fields cannot authorize sig-token classification",
        [
            { domain: "token-element", selection: "[0]" },
            { domain: "token-element", selection: "[⎕]" },
            {
                domain: "token-element",
                selection: "regular-sig",
                formula: "[0]",
            },
            {
                domain: "token-element",
                selection: "irregular-sig",
                surface: "[⎕]",
            },
        ].map((request) => {
            const hostileSource =
                ctx.buildClassicalGrammarConceptSource(request);
            const hostileResult =
                ctx.evaluateClassicalGrammarConcept(hostileSource);
            return {
                sourceStatus: hostileSource.authorizationStatus,
                sourceReason: hostileSource.blockReason,
                resultStatus: hostileResult.authorizationStatus,
                resultReason: hostileResult.blockReason,
            };
        }),
        [
            "concept-source-selection-unlicensed",
            "concept-source-selection-unlicensed",
            "concept-source-unrecognized-constituent:formula",
            "concept-source-unrecognized-constituent:surface",
        ].map((sourceReason) => ({
            sourceStatus: "blocked",
            sourceReason,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    const semeTokenSource = ctx.buildClassicalGrammarConceptSource({
        domain: "token-element",
        selection: "seme",
    });
    const semeTokenResult =
        ctx.evaluateClassicalGrammarConcept(semeTokenSource);
    const semeTokenEvidence =
        ctx.getClassicalGrammarConceptExecutionEvidence(semeTokenResult);
    s.eq(
        "seme token representation executes its own read-only content owner",
        {
            sourceValid:
                ctx.isClassicalGrammarConceptSource(semeTokenSource),
            resultValid:
                ctx.isClassicalGrammarConceptResult(semeTokenResult),
            classification: semeTokenResult.classification,
            owner: semeTokenResult.semanticOwnerId,
            operation: semeTokenEvidence.evaluatedOperationId,
            facts: semeTokenResult.facts,
            relations: semeTokenResult.relations,
            restrictions: semeTokenResult.restrictions,
            claimStages: semeTokenEvidence.execution.stages.slice(2),
            writtenProjection:
                semeTokenResult.projectionApplicability.written,
            generationAllowed: semeTokenResult.generationAllowed,
        },
        {
            sourceValid: true,
            resultValid: true,
            classification: "content-token-element",
            owner: "seme-token-classification",
            operation: "classical.content.seme.token.classify",
            facts: ["seme-is-token-level-representation-of-sememe"],
            relations: ["seme-represents-sememe"],
            restrictions: [
                "translation-gloss-does-not-authorize-seme-token-source",
                "displayed-meaning-does-not-authorize-seme-token-source",
                "seme-token-classification-does-not-generate-meaning-or-translation",
                "seme-token-classification-does-not-realize-written-surface",
            ],
            claimStages: ["seme-token-representation-validated"],
            writtenProjection:
                "not-applicable-read-only-non-generative-classification",
            generationAllowed: false,
        }
    );

    s.eq(
        "translation, gloss, display, formula, and surface carriers cannot authorize a seme token",
        [
            { domain: "token-element", selection: "English translation" },
            { domain: "token-element", selection: "gloss" },
            { domain: "token-element", selection: "displayed meaning" },
            { domain: "token-element", selection: "seme", formula: "meaning" },
            { domain: "token-element", selection: "seme", surface: "meaning" },
        ].map((request) => {
            const hostileSource =
                ctx.buildClassicalGrammarConceptSource(request);
            const hostileResult =
                ctx.evaluateClassicalGrammarConcept(hostileSource);
            return {
                sourceStatus: hostileSource.authorizationStatus,
                sourceReason: hostileSource.blockReason,
                resultStatus: hostileResult.authorizationStatus,
                resultReason: hostileResult.blockReason,
            };
        }),
        [
            "concept-source-selection-unlicensed",
            "concept-source-selection-unlicensed",
            "concept-source-selection-unlicensed",
            "concept-source-unrecognized-constituent:formula",
            "concept-source-unrecognized-constituent:surface",
        ].map((sourceReason) => ({
            sourceStatus: "blocked",
            sourceReason,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    s.eq(
        "seme and sememe owners cannot cross-authorize through token grouping or asserted classification",
        [
            {
                domain: "token-element",
                selection: "seme",
                assertedClassification: "content-type-element",
            },
            { domain: "linguistic-element", selection: "seme" },
            { domain: "token-element", selection: "sememe" },
        ].map((request) => {
            const source = ctx.buildClassicalGrammarConceptSource(request);
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
                owner: result.semanticOwnerId,
                facts: result.facts,
            };
        }),
        [
            {
                sourceStatus: "authorized",
                sourceReason: "",
                resultStatus: "blocked",
                resultReason:
                    "concept-classification-mismatch:content-token-element",
                owner: "seme-token-classification",
                facts: [],
            },
            {
                sourceStatus: "blocked",
                sourceReason: "concept-source-selection-unlicensed",
                resultStatus: "blocked",
                resultReason: "owner-issued-concept-source-required",
                owner: "classical-linguistic-concept-owner",
                facts: [],
            },
            {
                sourceStatus: "blocked",
                sourceReason: "concept-source-selection-unlicensed",
                resultStatus: "blocked",
                resultReason: "owner-issued-concept-source-required",
                owner: "classical-linguistic-concept-owner",
                facts: [],
            },
        ]
    );

    const morphTokenSource = ctx.buildClassicalGrammarConceptSource({
        domain: "morpheme",
        selection: "morph",
    });
    const morphTokenResult =
        ctx.evaluateClassicalGrammarConcept(morphTokenSource);
    const morphTokenEvidence =
        ctx.getClassicalGrammarConceptExecutionEvidence(morphTokenResult);
    s.eq(
        "morph identity, carrier variation, and bracket notation execute through one independent read-only morph-token owner",
        {
            sourceValid:
                ctx.isClassicalGrammarConceptSource(morphTokenSource),
            resultValid:
                ctx.isClassicalGrammarConceptResult(morphTokenResult),
            classification: morphTokenResult.classification,
            owner: morphTokenResult.semanticOwnerId,
            operation: morphTokenEvidence.evaluatedOperationId,
            facts: morphTokenResult.facts,
            relations: morphTokenResult.relations,
            restrictions: morphTokenResult.restrictions,
            claimStages: morphTokenEvidence.execution.stages.slice(2),
            writtenProjection:
                morphTokenResult.projectionApplicability.written,
            generationAllowed: morphTokenResult.generationAllowed,
        },
        {
            sourceValid: true,
            resultValid: true,
            classification: "token-level-meaningful-unit",
            owner: "morph-token-classification",
            operation: "classical.morpheme.morph.token.classify",
            facts: [
                "morph-is-token-level-representation-of-morpheme",
                "morph-may-be-regular-or-irregular",
                "morph-meaning-remains-constant-across-carrier-variation",
                "morph-carrier-may-be-phonic-or-sigic",
                "regular-morph-notation-follows-morpheme-notation",
                "regular-morph-notation-uses-square-brackets-around-morphic-carrier",
            ],
            relations: [
                "morph-represents-morpheme",
                "regular-and-irregular-morphs-share-morpheme-meaning",
                "square-brackets-document-morphic-carrier",
            ],
            restrictions: [
                "english-morph-examples-are-evidence-only",
                "borrowed-item-examples-are-analysis-only",
                "displayed-brackets-do-not-authorize-morph-token-source",
                "formula-does-not-authorize-morph-token-source",
                "morph-conditioning-is-separately-owned",
                "morph-token-classification-does-not-apply-an-environment",
                "morph-token-classification-does-not-generate-surface",
            ],
            claimStages: [
                "morph-token-definition-validated",
                "morph-regular-irregular-alternative-validated",
                "morph-notation-dependency-validated",
                "morph-square-bracket-notation-validated",
            ],
            writtenProjection:
                "not-applicable-read-only-non-generative-classification",
            generationAllowed: false,
        }
    );

    s.eq(
        "examples, brackets, formulas, surfaces, and conditioning coordinates cannot authorize morph-token classification",
        [
            { domain: "morpheme", selection: "[-s]" },
            { domain: "morpheme", selection: "[pig-z]" },
            { domain: "morpheme", selection: "data" },
            { domain: "morpheme", selection: "morph", formula: "[-s]" },
            { domain: "morpheme", selection: "morph", surface: "[-s]" },
            { domain: "morpheme", selection: "morph", environment: "after-voiced-phone" },
            { domain: "morpheme", selection: "morph", governor: "plural-morpheme" },
        ].map((request) => {
            const hostileSource =
                ctx.buildClassicalGrammarConceptSource(request);
            const hostileResult =
                ctx.evaluateClassicalGrammarConcept(hostileSource);
            return {
                sourceStatus: hostileSource.authorizationStatus,
                sourceReason: hostileSource.blockReason,
                resultStatus: hostileResult.authorizationStatus,
                resultReason: hostileResult.blockReason,
            };
        }),
        [
            "concept-source-selection-unlicensed",
            "concept-source-selection-unlicensed",
            "concept-source-selection-unlicensed",
            "concept-source-unrecognized-constituent:formula",
            "concept-source-unrecognized-constituent:surface",
            "concept-source-unrecognized-constituent:environment",
            "concept-source-unrecognized-constituent:governor",
        ].map((sourceReason) => ({
            sourceStatus: "blocked",
            sourceReason,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    s.eq(
        "morph-token ownership cannot be supplied by token grouping, type-level morpheme identity, or an asserted classification",
        [
            { domain: "token-element", selection: "morph" },
            { domain: "linguistic-element", selection: "morph" },
            {
                domain: "morpheme",
                selection: "morph",
                assertedClassification: "morpheme-class",
            },
        ].map((request) => {
            const source = ctx.buildClassicalGrammarConceptSource(request);
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
                owner: result.semanticOwnerId,
                facts: result.facts,
            };
        }),
        [
            {
                sourceStatus: "blocked",
                sourceReason: "concept-source-selection-unlicensed",
                resultStatus: "blocked",
                resultReason: "owner-issued-concept-source-required",
                owner: "classical-linguistic-concept-owner",
                facts: [],
            },
            {
                sourceStatus: "blocked",
                sourceReason: "concept-source-selection-unlicensed",
                resultStatus: "blocked",
                resultReason: "owner-issued-concept-source-required",
                owner: "classical-linguistic-concept-owner",
                facts: [],
            },
            {
                sourceStatus: "authorized",
                sourceReason: "",
                resultStatus: "blocked",
                resultReason:
                    "concept-classification-mismatch:token-level-meaningful-unit",
                owner: "morph-token-classification",
                facts: [],
            },
        ]
    );

    s.eq(
        "phonological and morphological conditioning execute as distinct branches of their own non-generative analysis owner",
        [
            {
                selection: "phonological-conditioning",
                facts: [
                    "slightly-irregular-morphs-may-be-phonologically-conditioned",
                    "contextual-sounds-trigger-morph-variation",
                ],
                relation: "contextual-sound-conditions-morph-variation",
                stage: "morph-phonological-conditioning-validated",
            },
            {
                selection: "morphological-conditioning",
                facts: [
                    "certain-seriously-irregular-morphs-may-be-morphologically-conditioned",
                    "particular-governing-morpheme-triggers-morph-variation",
                ],
                relation: "governing-morpheme-conditions-morph-variation",
                stage: "morph-morphological-conditioning-validated",
            },
        ].map((expected) => {
            const source = ctx.buildClassicalGrammarConceptSource({
                domain: "morph-conditioning-analysis",
                selection: expected.selection,
            });
            const result = ctx.evaluateClassicalGrammarConcept(source);
            const evidence =
                ctx.getClassicalGrammarConceptExecutionEvidence(result);
            return {
                selection: result.selection,
                classification: result.classification,
                owner: result.semanticOwnerId,
                operation: evidence.evaluatedOperationId,
                facts: result.facts,
                relationPresent: result.relations.includes(expected.relation),
                restrictions: result.restrictions,
                stages: evidence.execution.stages.slice(2),
                generationAllowed: result.generationAllowed,
                writtenProjection: result.projectionApplicability.written,
            };
        }),
        [
            {
                selection: "phonological-conditioning",
                facts: [
                    "slightly-irregular-morphs-may-be-phonologically-conditioned",
                    "contextual-sounds-trigger-morph-variation",
                ],
                stage: "morph-phonological-conditioning-validated",
            },
            {
                selection: "morphological-conditioning",
                facts: [
                    "certain-seriously-irregular-morphs-may-be-morphologically-conditioned",
                    "particular-governing-morpheme-triggers-morph-variation",
                ],
                stage: "morph-morphological-conditioning-validated",
            },
        ].map((expected) => ({
            selection: expected.selection,
            classification: "morph-conditioning-analysis",
            owner: "morph-conditioning-analysis",
            operation: "classical.morpheme.morph.conditioning.analyze",
            facts: expected.facts,
            relationPresent: true,
            restrictions: [
                "english-morph-examples-are-evidence-only",
                "conditioning-label-does-not-authorize-analysis-source",
                "phonological-and-morphological-conditioning-remain-distinct",
                "conditioning-analysis-does-not-consume-a-concrete-environment",
                "conditioning-analysis-does-not-consume-a-governing-morpheme",
                "conditioning-analysis-does-not-choose-a-morph-variant",
                "conditioning-analysis-does-not-generate-surface",
            ],
            stages: [expected.stage],
            generationAllowed: false,
            writtenProjection:
                "not-applicable-read-only-non-generative-classification",
        }))
    );

    s.eq(
        "conditioning labels, English examples, environments, governors, morphs, formulas, and surfaces cannot authorize conditioning analysis",
        [
            { domain: "morph-conditioning-analysis", selection: "[pig-z]" },
            { domain: "morph-conditioning-analysis", selection: "data" },
            {
                domain: "morph-conditioning-analysis",
                selection: "phonological-conditioning",
                environment: "after-voiced-phone",
            },
            {
                domain: "morph-conditioning-analysis",
                selection: "morphological-conditioning",
                governor: "plural-morpheme",
            },
            {
                domain: "morph-conditioning-analysis",
                selection: "phonological-conditioning",
                morph: "[-z]",
            },
            {
                domain: "morph-conditioning-analysis",
                selection: "phonological-conditioning",
                formula: "context -> [-z]",
            },
            {
                domain: "morph-conditioning-analysis",
                selection: "morphological-conditioning",
                surface: "[-gn]",
            },
        ].map((request) => {
            const source = ctx.buildClassicalGrammarConceptSource(request);
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
            };
        }),
        [
            "concept-source-selection-unlicensed",
            "concept-source-selection-unlicensed",
            "concept-source-unrecognized-constituent:environment",
            "concept-source-unrecognized-constituent:governor",
            "concept-source-unrecognized-constituent:morph",
            "concept-source-unrecognized-constituent:formula",
            "concept-source-unrecognized-constituent:surface",
        ].map((sourceReason) => ({
            sourceStatus: "blocked",
            sourceReason,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    s.eq(
        "morph-structure perception keeps sounded recognition, segment noncoterminality, and sigeme-content recognition as separately routed read-only claims",
        [
            {
                selection: "sounded-morph-recognition",
                facts: [
                    "instance-level-sound-obscures-sounded-morphological-structure",
                    "sounded-morphs-do-not-eliminate-recognition-difficulty",
                ],
                relation:
                    "sound-dominance-obscures-morphological-structure",
                stage: "morph-sounded-structure-recognition-validated",
            },
            {
                selection: "syllable-morph-noncoterminality",
                facts: [
                    "meaningless-phonic-segments-are-syllabic-segments",
                    "syllabic-segments-need-not-be-coterminous-with-morphic-segments",
                ],
                relation:
                    "segment-noncoterminality-conditions-morph-recognition-difficulty",
                stage:
                    "morph-syllable-noncoterminality-condition-validated",
            },
            {
                selection: "sigeme-content-recognition",
                facts: [
                    "phoneme-carried-sememes-can-be-difficult-to-recognize",
                    "sigeme-carried-sememes-can-be-still-more-difficult-to-grasp",
                ],
                relation:
                    "phoneme-content-difficulty-supports-sigeme-content-difficulty-analysis",
                stage:
                    "morph-sigeme-content-recognition-condition-validated",
            },
        ].map((expected) => {
            const source = ctx.buildClassicalGrammarConceptSource({
                domain: "morph-structure-perception-analysis",
                selection: expected.selection,
            });
            const result = ctx.evaluateClassicalGrammarConcept(source);
            const evidence =
                ctx.getClassicalGrammarConceptExecutionEvidence(result);
            return {
                selection: result.selection,
                classification: result.classification,
                owner: result.semanticOwnerId,
                operation: evidence.evaluatedOperationId,
                facts: result.facts,
                relationPresent: result.relations.includes(expected.relation),
                restrictions: result.restrictions,
                stages: evidence.execution.stages.slice(2),
                generationAllowed: result.generationAllowed,
                writtenProjection: result.projectionApplicability.written,
            };
        }),
        [
            {
                selection: "sounded-morph-recognition",
                facts: [
                    "instance-level-sound-obscures-sounded-morphological-structure",
                    "sounded-morphs-do-not-eliminate-recognition-difficulty",
                ],
                stage: "morph-sounded-structure-recognition-validated",
            },
            {
                selection: "syllable-morph-noncoterminality",
                facts: [
                    "meaningless-phonic-segments-are-syllabic-segments",
                    "syllabic-segments-need-not-be-coterminous-with-morphic-segments",
                ],
                stage:
                    "morph-syllable-noncoterminality-condition-validated",
            },
            {
                selection: "sigeme-content-recognition",
                facts: [
                    "phoneme-carried-sememes-can-be-difficult-to-recognize",
                    "sigeme-carried-sememes-can-be-still-more-difficult-to-grasp",
                ],
                stage:
                    "morph-sigeme-content-recognition-condition-validated",
            },
        ].map((expected) => ({
            selection: expected.selection,
            classification: "morph-structure-perception-analysis",
            owner: "morph-structure-perception-analysis",
            operation: "classical.morpheme.structure.perception.analyze",
            facts: expected.facts,
            relationPresent: true,
            restrictions: [
                "perception-analysis-does-not-license-a-silent-morph",
                "silent-contrast-policy-is-nonauthorizing-documentation",
                "displayed-empty-zero-and-surface-do-not-authorize-analysis",
                "formula-does-not-authorize-perception-analysis",
                "perception-analysis-does-not-consume-a-concrete-sound",
                "perception-analysis-does-not-consume-a-concrete-morph",
                "perception-analysis-does-not-consume-an-environment",
                "perception-analysis-does-not-select-or-generate-a-form",
                "syllable-morph-noncoterminality-does-not-rewrite-segmentation",
                "silent-morph-contrast-validation-is-separately-owned",
            ],
            stages: expected.selection === "syllable-morph-noncoterminality"
                ? [
                    expected.stage,
                    "morph-sounded-structure-recognition-validated",
                ]
                : [expected.stage],
            generationAllowed: false,
            writtenProjection:
                "not-applicable-read-only-non-generative-classification",
        }))
    );

    s.eq(
        "sounds, morphs, environments, formulas, zero displays, surfaces, stored answers, and asserted classifications cannot authorize perception analysis",
        [
            {
                domain: "morph-structure-perception-analysis",
                selection: "sounded-morph-recognition",
                sound: "t",
            },
            {
                domain: "morph-structure-perception-analysis",
                selection: "syllable-morph-noncoterminality",
                morph: "[ti]",
            },
            {
                domain: "morph-structure-perception-analysis",
                selection: "sounded-morph-recognition",
                environment: "word-final",
            },
            {
                domain: "morph-structure-perception-analysis",
                selection: "syllable-morph-noncoterminality",
                formula: "syllable != morph",
            },
            {
                domain: "morph-structure-perception-analysis",
                selection: "sigeme-content-recognition",
                displayedZero: "⬜",
            },
            {
                domain: "morph-structure-perception-analysis",
                selection: "sigeme-content-recognition",
                surface: "Ø",
            },
            {
                domain: "morph-structure-perception-analysis",
                selection: "sigeme-content-recognition",
                canvasAnswer: "silent morph",
            },
            {
                domain: "morph-structure-perception-analysis",
                selection: "sigeme-content-recognition",
                assertedClassification: "morpheme-class",
            },
        ].map((request) => {
            const source = ctx.buildClassicalGrammarConceptSource(request);
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
                owner: result.semanticOwnerId,
            };
        }),
        [
            "concept-source-unrecognized-constituent:sound",
            "concept-source-unrecognized-constituent:morph",
            "concept-source-unrecognized-constituent:environment",
            "concept-source-unrecognized-constituent:formula",
            "concept-source-unrecognized-constituent:displayedZero",
            "concept-source-unrecognized-constituent:surface",
            "concept-source-unrecognized-constituent:canvasAnswer",
            "concept-classification-mismatch:morph-structure-perception-analysis",
        ].map((sourceReason, index) => ({
            sourceStatus: index === 7 ? "authorized" : "blocked",
            sourceReason: index === 7 ? "" : sourceReason,
            resultStatus: "blocked",
            resultReason: index === 7
                ? sourceReason
                : "owner-issued-concept-source-required",
            owner: index === 7
                ? "morph-structure-perception-analysis"
                : "classical-linguistic-concept-owner",
        }))
    );

    s.eq(
        "morpheme taxonomy, token grouping, morph conditioning, and silent labels cannot cross-authorize morph-structure perception",
        [
            { domain: "morpheme", selection: "silent-morpheme" },
            { domain: "token-element", selection: "morph" },
            {
                domain: "morph-conditioning-analysis",
                selection: "phonological-conditioning",
            },
            {
                domain: "morph-structure-perception-analysis",
                selection: "silent-contrast-policy",
            },
        ].map((request) => {
            const source = ctx.buildClassicalGrammarConceptSource(request);
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                resultStatus: result.authorizationStatus,
                owner: result.semanticOwnerId,
                classification: result.classification,
            };
        }),
        [
            {
                sourceStatus: "authorized",
                resultStatus: "authorized",
                owner: "morpheme-taxonomy",
                classification: "morpheme-class",
            },
            {
                sourceStatus: "blocked",
                resultStatus: "blocked",
                owner: "classical-linguistic-concept-owner",
                classification: "",
            },
            {
                sourceStatus: "authorized",
                resultStatus: "authorized",
                owner: "morph-conditioning-analysis",
                classification: "morph-conditioning-analysis",
            },
            {
                sourceStatus: "blocked",
                resultStatus: "blocked",
                owner: "classical-linguistic-concept-owner",
                classification: "",
            },
        ]
    );

    const formInstanceSource = ctx.buildClassicalGrammarConceptSource({
        domain: "morph-form-instance-classification",
        selection: "form-instance",
    });
    const formInstanceResult =
        ctx.evaluateClassicalGrammarConcept(formInstanceSource);
    const formInstanceEvidence =
        ctx.getClassicalGrammarConceptExecutionEvidence(formInstanceResult);
    s.eq(
        "form as the instance-level realization of a morph executes through its own read-only classification owner",
        {
            sourceValid:
                ctx.isClassicalGrammarConceptSource(formInstanceSource),
            resultValid:
                ctx.isClassicalGrammarConceptResult(formInstanceResult),
            classification: formInstanceResult.classification,
            owner: formInstanceResult.semanticOwnerId,
            operation: formInstanceEvidence.evaluatedOperationId,
            facts: formInstanceResult.facts,
            relations: formInstanceResult.relations,
            restrictions: formInstanceResult.restrictions,
            stages: formInstanceEvidence.execution.stages.slice(2),
            writtenProjection:
                formInstanceResult.projectionApplicability.written,
            generationAllowed: formInstanceResult.generationAllowed,
        },
        {
            sourceValid: true,
            resultValid: true,
            classification: "morph-form-instance-classification",
            owner: "morph-form-instance-classification",
            operation: "classical.morpheme.form.instance.classify",
            facts: [
                "forms-are-instance-level-realizations-of-morphs",
                "form-is-an-instance-level-morph-manifestation",
            ],
            relations: ["form-instantiates-morph"],
            restrictions: [
                "form-label-does-not-authorize-form-instance-source",
                "concrete-form-does-not-authorize-form-instance-source",
                "token-element-grouping-is-routing-only",
                "morph-token-classification-is-separately-owned",
                "morph-conditioning-analysis-is-separately-owned",
                "form-instance-classification-does-not-consume-an-environment",
                "form-instance-classification-does-not-select-a-morph-variant",
                "form-instance-classification-does-not-generate-a-form-surface",
                "instance-level-realization-term-is-taxonomic-only",
            ],
            stages: [
                "morph-form-instance-definition-validated",
                "morph-form-instance-separation-validated",
            ],
            writtenProjection:
                "not-applicable-read-only-non-generative-classification",
            generationAllowed: false,
        }
    );

    s.eq(
        "a concrete form, instance token, morph, environment, formula, surface, or Canvas answer cannot authorize form-instance classification",
        [
            {
                domain: "morph-form-instance-classification",
                selection: "[-z]",
            },
            {
                domain: "morph-form-instance-classification",
                selection: "form-instance",
                instanceToken: "[-z]",
            },
            {
                domain: "morph-form-instance-classification",
                selection: "form-instance",
                morph: "[-z]",
            },
            {
                domain: "morph-form-instance-classification",
                selection: "form-instance",
                environment: "after-voiced-phone",
            },
            {
                domain: "morph-form-instance-classification",
                selection: "form-instance",
                formula: "morph -> form",
            },
            {
                domain: "morph-form-instance-classification",
                selection: "form-instance",
                surface: "[-z]",
            },
            {
                domain: "morph-form-instance-classification",
                selection: "form-instance",
                canvasAnswer: "forms",
            },
        ].map((request) => {
            const source = ctx.buildClassicalGrammarConceptSource(request);
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
            };
        }),
        [
            "concept-source-selection-unlicensed",
            "concept-source-unrecognized-constituent:instanceToken",
            "concept-source-unrecognized-constituent:morph",
            "concept-source-unrecognized-constituent:environment",
            "concept-source-unrecognized-constituent:formula",
            "concept-source-unrecognized-constituent:surface",
            "concept-source-unrecognized-constituent:canvasAnswer",
        ].map((sourceReason) => ({
            sourceStatus: "blocked",
            sourceReason,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    s.eq(
        "token grouping, morph-token identity, conditioning, and the retired generic form lane cannot cross-authorize form-instance ownership",
        [
            { domain: "token-element", selection: "morph" },
            { domain: "morpheme", selection: "morph" },
            {
                domain: "morph-conditioning-analysis",
                selection: "phonological-conditioning",
            },
            { domain: "morpheme", selection: "form" },
        ].map((request) => {
            const source = ctx.buildClassicalGrammarConceptSource(request);
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                resultStatus: result.authorizationStatus,
                owner: result.semanticOwnerId,
                classification: result.classification,
            };
        }),
        [
            {
                sourceStatus: "blocked",
                resultStatus: "blocked",
                owner: "classical-linguistic-concept-owner",
                classification: "",
            },
            {
                sourceStatus: "authorized",
                resultStatus: "authorized",
                owner: "morph-token-classification",
                classification: "token-level-meaningful-unit",
            },
            {
                sourceStatus: "authorized",
                resultStatus: "authorized",
                owner: "morph-conditioning-analysis",
                classification: "morph-conditioning-analysis",
            },
            {
                sourceStatus: "blocked",
                resultStatus: "blocked",
                owner: "classical-linguistic-concept-owner",
                classification: "",
            },
        ]
    );

    const sememeSource = ctx.buildClassicalGrammarConceptSource({
        domain: "linguistic-element",
        selection: "sememe",
    });
    const sememeResult =
        ctx.evaluateClassicalGrammarConcept(sememeSource);
    const sememeEvidence =
        ctx.getClassicalGrammarConceptExecutionEvidence(sememeResult);
    s.eq(
        "sememe identity, carrier expression, semantic scope, and translation boundary remain one read-only content classification",
        {
            classification: sememeResult.classification,
            owner: sememeResult.semanticOwnerId,
            operation: sememeEvidence.evaluatedOperationId,
            facts: sememeResult.facts,
            relations: sememeResult.relations,
            restrictions: sememeResult.restrictions,
            claimStages: sememeEvidence.execution.stages.slice(2),
            evidenceValid:
                ctx.isClassicalGrammarConceptExecutionEvidence(
                    sememeEvidence,
                    sememeResult
                ),
        },
        {
            classification: "content-type-element",
            owner: "content-sememe-classification",
            operation: "classical.content.sememe.classify",
            facts: [
                "only-content-element-kind",
                "meaningfulness-set",
                "uniquely-expressible-by-carrier-unit",
                "meaningfulness-includes-sense-and-denotation",
                "semantic-component-exceeds-content-system",
                "meaning-generated-by-combination",
                "meaning-generated-by-use",
                "nahuatl-sememe-knowledge-extremely-limited",
                "english-translation-gloss-fundamentally-falsifies-sememe-value",
            ],
            relations: [
                "expressed-by-carrier-system-unit",
                "content-system-contained-within-semantic-component",
            ],
            restrictions: [
                "translation-gloss-is-not-sememe-identity",
                "meaning-also-arises-from-combination-and-use",
                "limited-knowledge-does-not-license-english-sememe-authority",
                "classification-does-not-generate-meaning-or-translation",
            ],
            claimStages: [
                "sememe-only-content-kind-validated",
                "sememe-meaningfulness-carrier-expression-validated",
                "sememe-semantic-component-boundary-validated",
            ],
            evidenceValid: true,
        }
    );

    s.eq(
        "English translation and gloss text cannot authorize a sememe Source",
        ["English translation", "gloss"].map((selection) => {
            const documentarySource =
                ctx.buildClassicalGrammarConceptSource({
                    domain: "linguistic-element",
                    selection,
                });
            const documentaryResult =
                ctx.evaluateClassicalGrammarConcept(documentarySource);
            return {
                selection,
                sourceStatus: documentarySource.authorizationStatus,
                sourceReason: documentarySource.blockReason,
                sourceValid:
                    ctx.isClassicalGrammarConceptSource(documentarySource),
                resultStatus: documentaryResult.authorizationStatus,
                resultReason: documentaryResult.blockReason,
                facts: documentaryResult.facts,
            };
        }),
        ["English translation", "gloss"].map((selection) => ({
            selection,
            sourceStatus: "blocked",
            sourceReason: "concept-source-selection-unlicensed",
            sourceValid: false,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
            facts: [],
        }))
    );

    const morphemeSelections = [
        {
            selection: "morpheme",
            classification: "type-level-meaningful-unit",
            requiredFacts: [
                "carrier-content-symbiotic-amalgam",
                "three-symbiotic-morpheme-kinds",
            ],
            requiredStages: [],
        },
        {
            selection: "portmanteau-morpheme",
            classification: "morpheme-class",
            requiredFacts: [
                "content-cluster",
                "indivisibly-joined-sememes",
            ],
            requiredStages: [
                "morpheme-content-cluster-definition-validated",
                "morpheme-content-cluster-condition-validated",
            ],
        },
        {
            selection: "connective-morpheme",
            classification: "morpheme-class",
            requiredFacts: [
                "no-sememe",
                "grammatical-meaning-without-sememic-meaning",
            ],
            requiredStages: [
                "morpheme-connective-carrier-content-validated",
                "morpheme-connective-grammatical-meaning-validated",
            ],
        },
        {
            selection: "ordinary-morpheme",
            classification: "morpheme-class",
            requiredFacts: [
                "sound-plus-meaning",
                "multiple-ordinary-morphemes-may-cooccur-in-one-word",
            ],
            requiredStages: [
                "morpheme-ordinary-carrier-content-validated",
                "morpheme-ordinary-cooccurrence-evidence-validated",
            ],
        },
        {
            selection: "silent-morpheme",
            classification: "morpheme-class",
            requiredFacts: [
                "no-sound-plus-meaning",
                "linguistic-economy-licenses-silence-for-default-value",
                "silent-expression-depends-on-cultural-default-redundancy",
            ],
            requiredStages: [
                "morpheme-silent-carrier-content-validated",
                "morpheme-linguistic-economy-validated",
                "morpheme-default-redundancy-condition-validated",
            ],
        },
    ];
    s.eq(
        "morpheme symbiosis and its structural classes remain one typed read-only taxonomy",
        morphemeSelections.map((expected) => {
            const morphemeSource =
                ctx.buildClassicalGrammarConceptSource({
                    domain: "morpheme",
                    selection: expected.selection,
                });
            const morphemeResult =
                ctx.evaluateClassicalGrammarConcept(morphemeSource);
            const morphemeEvidence =
                ctx.getClassicalGrammarConceptExecutionEvidence(
                    morphemeResult
                );
            return {
                selection: morphemeResult.selection,
                classification: morphemeResult.classification,
                owner: morphemeResult.semanticOwnerId,
                operation: morphemeEvidence.evaluatedOperationId,
                commonFacts: [
                    "morpheme-type-level-linguistic-element",
                    "carrier-content-symbiotic-amalgam",
                    "three-symbiotic-morpheme-kinds",
                ].filter((fact) => morphemeResult.facts.includes(fact)),
                requiredFacts: expected.requiredFacts.filter(
                    (fact) => morphemeResult.facts.includes(fact)
                ),
                commonRestrictions: [
                    "grapheme-is-not-full-morpheme-carrier",
                    "carrier-alone-is-not-morpheme",
                    "notation-string-does-not-authorize-morpheme-source",
                    "classification-does-not-generate-morpheme-surface",
                ].filter((restriction) => (
                    morphemeResult.restrictions.includes(restriction)
                )),
                requiredStages: expected.requiredStages.filter(
                    (stepId) => morphemeEvidence.execution.stages.includes(
                        stepId
                    )
                ),
                evidenceValid:
                    ctx.isClassicalGrammarConceptExecutionEvidence(
                        morphemeEvidence,
                        morphemeResult
                    ),
            };
        }),
        morphemeSelections.map((expected) => ({
            selection: expected.selection,
            classification: expected.classification,
            owner: "morpheme-taxonomy",
            operation: "classical.morpheme.taxonomy.classify",
            commonFacts: [
                "morpheme-type-level-linguistic-element",
                "carrier-content-symbiotic-amalgam",
                "three-symbiotic-morpheme-kinds",
            ],
            requiredFacts: expected.requiredFacts,
            commonRestrictions: [
                "grapheme-is-not-full-morpheme-carrier",
                "carrier-alone-is-not-morpheme",
                "notation-string-does-not-authorize-morpheme-source",
                "classification-does-not-generate-morpheme-surface",
            ],
            requiredStages: expected.requiredStages,
            evidenceValid: true,
        }))
    );

    s.eq(
        "notation, examples, displayed zeroes, and carrier strings cannot authorize a morpheme Source",
        [
            "/carrier/, 'gloss'",
            "pit-s",
            "/Ø/",
            "carrier alone",
        ].map((selection) => {
            const documentarySource =
                ctx.buildClassicalGrammarConceptSource({
                    domain: "morpheme",
                    selection,
                });
            const documentaryResult =
                ctx.evaluateClassicalGrammarConcept(documentarySource);
            return {
                selection,
                sourceStatus: documentarySource.authorizationStatus,
                sourceReason: documentarySource.blockReason,
                sourceValid:
                    ctx.isClassicalGrammarConceptSource(documentarySource),
                resultStatus: documentaryResult.authorizationStatus,
                resultReason: documentaryResult.blockReason,
                facts: documentaryResult.facts,
            };
        }),
        [
            "/carrier/, 'gloss'",
            "pit-s",
            "/Ø/",
            "carrier alone",
        ].map((selection) => ({
            selection,
            sourceStatus: "blocked",
            sourceReason: "concept-source-selection-unlicensed",
            sourceValid: false,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
            facts: [],
        }))
    );

    const tokenClassificationSelections = [
        {
            selection: "inventory",
            classification: "token-level-element-inventory",
            requiredFacts: [
                "four-basic-type-representing-token-element-kinds",
                "phone-graph-sig-seme-inventory",
                "morph-is-token-level-symbiotic-element",
            ],
            requiredStages: [
                "token-four-kind-inventory-validated",
                "token-four-kind-names-validated",
                "token-morph-symbiotic-inventory-validated",
            ],
        },
        {
            selection: "instance-boundary",
            classification: "token-instance-realization-boundary",
            requiredFacts: [
                "instance-manifestations-are-sounds-letters-meanings",
                "silence-not-instance-level-element",
                "sig-has-no-instance-level-representation",
                "sig-has-no-instance-level-presence",
                "sig-presence-is-implicit",
            ],
            requiredStages: [
                "token-instance-manifestation-inventory-validated",
                "token-instance-silence-exclusion-validated",
                "token-sig-no-instance-presence-validated",
                "token-sig-implicit-presence-validated",
            ],
        },
    ];
    s.eq(
        "token inventory and the sig instance boundary remain one typed read-only classification owner",
        tokenClassificationSelections.map((expected) => {
            const tokenSource =
                ctx.buildClassicalGrammarConceptSource({
                    domain: "token-element",
                    selection: expected.selection,
                });
            const tokenResult =
                ctx.evaluateClassicalGrammarConcept(tokenSource);
            const tokenEvidence =
                ctx.getClassicalGrammarConceptExecutionEvidence(tokenResult);
            return {
                selection: tokenResult.selection,
                classification: tokenResult.classification,
                owner: tokenResult.semanticOwnerId,
                operation: tokenEvidence.evaluatedOperationId,
                requiredFacts: expected.requiredFacts.filter(
                    (fact) => tokenResult.facts.includes(fact)
                ),
                requiredStages: expected.requiredStages.filter(
                    (stepId) => tokenEvidence.execution.stages.includes(stepId)
                ),
                readOnly: tokenResult.readOnly,
                generationAllowed: tokenResult.generationAllowed,
                evidenceValid:
                    ctx.isClassicalGrammarConceptExecutionEvidence(
                        tokenEvidence,
                        tokenResult
                    ),
            };
        }),
        tokenClassificationSelections.map((expected) => ({
            selection: expected.selection,
            classification: expected.classification,
            owner: "token-element-classification",
            operation: "classical.token.element.classify",
            requiredFacts: expected.requiredFacts,
            requiredStages: expected.requiredStages,
            readOnly: true,
            generationAllowed: false,
            evidenceValid: true,
        }))
    );

    s.eq(
        "token labels, displayed sig notation, and audible silence cannot authorize the inventory Source",
        ["phones, graphs, sigs, semes", "[0]", "audible silence"].map(
            (selection) => {
                const documentarySource =
                    ctx.buildClassicalGrammarConceptSource({
                        domain: "token-element",
                        selection,
                    });
                const documentaryResult =
                    ctx.evaluateClassicalGrammarConcept(documentarySource);
                return {
                    selection,
                    sourceStatus: documentarySource.authorizationStatus,
                    sourceReason: documentarySource.blockReason,
                    sourceValid:
                        ctx.isClassicalGrammarConceptSource(
                            documentarySource
                        ),
                    resultStatus: documentaryResult.authorizationStatus,
                    resultReason: documentaryResult.blockReason,
                    facts: documentaryResult.facts,
                };
            }
        ),
        ["phones, graphs, sigs, semes", "[0]", "audible silence"].map(
            (selection) => ({
                selection,
                sourceStatus: "blocked",
                sourceReason: "concept-source-selection-unlicensed",
                sourceValid: false,
                resultStatus: "blocked",
                resultReason: "owner-issued-concept-source-required",
                facts: [],
            })
        )
    );

    const phoneAnalysisSelections = [
        [
            "phone-definition",
            "token-level-nondistinctive-phoneme-representation",
            "phone-definition-validated",
        ],
        [
            "single-member-repertory",
            "phonic-repertory-may-have-one-member",
            "phone-single-member-repertory-validated",
        ],
        [
            "multiple-member-repertory",
            "phonic-repertory-may-have-two-or-more-members",
            "phone-multiple-member-repertory-validated",
        ],
        [
            "regular-phone",
            "regular-phone-contains-only-phoneme-distinctive-features",
            "phone-regular-feature-identity-validated",
        ],
        [
            "irregular-phone",
            "phone-may-be-irregular",
            "phone-irregular-alternative-validated",
        ],
        [
            "distant-irregular-phone",
            "irregular-phone-may-be-seriously-or-totally-different",
            "phone-distant-irregular-alternative-validated",
        ],
        [
            "cross-phoneme-identity",
            "different-phone-may-match-regular-phone-of-another-phoneme",
            "phone-cross-phoneme-identity-condition-validated",
        ],
        [
            "nahuatl-irregular-repertory",
            "nahuatl-n-is-irregular-phone-of-m",
            "phone-nahuatl-irregular-repertory-validated",
        ],
        [
            "symbol-specificity",
            "phone-symbol-representation-may-be-loose-or-strict",
            "phone-symbol-specificity-alternative-validated",
        ],
    ];
    s.eq(
        "typed phone-repertory Sources execute read-only analysis without applying an environment or generating a written surface",
        phoneAnalysisSelections.map(([selection, requiredFact, stepId]) => {
            const phoneSource = ctx.buildClassicalGrammarConceptSource({
                domain: "phone-repertory-analysis",
                selection,
            });
            const phoneResult = ctx.evaluateClassicalGrammarConcept(phoneSource);
            const phoneEvidence =
                ctx.getClassicalGrammarConceptExecutionEvidence(phoneResult);
            return {
                selection: phoneResult.selection,
                sourceValid: ctx.isClassicalGrammarConceptSource(phoneSource),
                resultValid: ctx.isClassicalGrammarConceptResult(phoneResult),
                owner: phoneResult.semanticOwnerId,
                operation: phoneEvidence.evaluatedOperationId,
                classification: phoneResult.classification,
                factPresent: phoneResult.facts.includes(requiredFact),
                stepPresent: phoneEvidence.execution.stages.includes(stepId),
                writtenProjection:
                    phoneResult.projectionApplicability.written,
                environmentNotApplied: phoneResult.restrictions.includes(
                    "phone-variant-analysis-does-not-apply-an-environment"
                ),
                generationAllowed: phoneResult.generationAllowed,
            };
        }),
        phoneAnalysisSelections.map(([selection]) => ({
            selection,
            sourceValid: true,
            resultValid: true,
            owner: "phone-repertory-analysis",
            operation: "classical.carrier.phone.repertory.analyze",
            classification: "phone-repertory-analysis",
            factPresent: true,
            stepPresent: true,
            writtenProjection:
                "not-applicable-read-only-non-generative-classification",
            environmentNotApplied: true,
            generationAllowed: false,
        }))
    );

    s.eq(
        "foreign examples and lesson references cannot authorize phone repertory analysis",
        [
            "aspirated [tʰ] in tar",
            "Spanish [z]",
            "see Lesson 2",
        ].map((selection) => {
            const exampleSource = ctx.buildClassicalGrammarConceptSource({
                domain: "phone-repertory-analysis",
                selection,
            });
            const exampleResult =
                ctx.evaluateClassicalGrammarConcept(exampleSource);
            return {
                selection,
                sourceStatus: exampleSource.authorizationStatus,
                sourceReason: exampleSource.blockReason,
                resultStatus: exampleResult.authorizationStatus,
                resultReason: exampleResult.blockReason,
            };
        }),
        [
            "aspirated [tʰ] in tar",
            "Spanish [z]",
            "see Lesson 2",
        ].map((selection) => ({
            selection,
            sourceStatus: "blocked",
            sourceReason: "concept-source-selection-unlicensed",
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    const assertedPhoneSource = ctx.buildClassicalGrammarConceptSource({
        domain: "phone-repertory-analysis",
        selection: "regular-phone",
        assertedClassification: "carrier-token-element",
    });
    const assertedPhoneResult =
        ctx.evaluateClassicalGrammarConcept(assertedPhoneSource);
    s.eq(
        "a licensed but mismatching asserted classification cannot choose the phone analysis result",
        {
            sourceValid:
                ctx.isClassicalGrammarConceptSource(assertedPhoneSource),
            status: assertedPhoneResult.authorizationStatus,
            reason: assertedPhoneResult.blockReason,
            classification: assertedPhoneResult.classification,
            facts: assertedPhoneResult.facts,
        },
        {
            sourceValid: true,
            status: "blocked",
            reason:
                "concept-classification-mismatch:phone-repertory-analysis",
            classification: "",
            facts: [],
        }
    );

    s.eq(
        "phone-repertory analysis cannot masquerade as executable phoneme-environment realization",
        [
            { environment: "before /k/" },
            { phone: "[n]" },
            { features: ["alveolar"] },
        ].map((extraFields) => {
            const source = ctx.buildClassicalGrammarConceptSource({
                domain: "phone-repertory-analysis",
                selection: "regular-phone",
                ...extraFields,
            });
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
            };
        }),
        ["environment", "phone", "features"].map((field) => ({
            sourceStatus: "blocked",
            sourceReason: `concept-source-unrecognized-constituent:${field}`,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    const graphSource = ctx.buildClassicalGrammarConceptSource({
        domain: "graph-variant-analysis",
        selection: "graph-definition",
    });
    const graphResult = ctx.evaluateClassicalGrammarConcept(graphSource);
    const graphEvidence =
        ctx.getClassicalGrammarConceptExecutionEvidence(graphResult);
    s.eq(
        "graph identity has its own read-only owner and remains separate from phone and typographic analysis",
        {
            sourceValid: ctx.isClassicalGrammarConceptSource(graphSource),
            resultValid: ctx.isClassicalGrammarConceptResult(graphResult),
            owner: graphResult.semanticOwnerId,
            operation: graphEvidence.evaluatedOperationId,
            classification: graphResult.classification,
            nondistinctive: graphResult.facts.includes(
                "token-level-nondistinctive-grapheme-representation"
            ),
            realizesGrapheme:
                graphResult.relations.includes("realizes-grapheme"),
            typographySeparated: graphResult.restrictions.includes(
                "typographic-variation-owned-by-grapheme-classification"
            ),
            typographyNotChoice: graphResult.restrictions.includes(
                "typography-is-not-a-grammar-choice"
            ),
            step: graphEvidence.execution.stages.includes(
                "graph-definition-validated"
            ),
            generationAllowed: graphResult.generationAllowed,
        },
        {
            sourceValid: true,
            resultValid: true,
            owner: "graph-variant-analysis",
            operation: "classical.carrier.graph.variant.analyze",
            classification: "graph-variant-analysis",
            nondistinctive: true,
            realizesGrapheme: true,
            typographySeparated: true,
            typographyNotChoice: true,
            step: true,
            generationAllowed: false,
        }
    );

    s.eq(
        "displayed graph labels and typography-bearing requests cannot authorize graph analysis",
        [
            {
                domain: "graph-variant-analysis",
                selection: "uppercase graph",
            },
            {
                domain: "graph-variant-analysis",
                selection: "graph-definition",
                typography: "uppercase",
            },
        ].map((request) => {
            const hostileSource =
                ctx.buildClassicalGrammarConceptSource(request);
            const hostileResult =
                ctx.evaluateClassicalGrammarConcept(hostileSource);
            return {
                sourceStatus: hostileSource.authorizationStatus,
                sourceReason: hostileSource.blockReason,
                resultStatus: hostileResult.authorizationStatus,
                resultReason: hostileResult.blockReason,
            };
        }),
        [
            "concept-source-selection-unlicensed",
            "concept-source-unrecognized-constituent:typography",
        ].map((sourceReason) => ({
            sourceStatus: "blocked",
            sourceReason,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    s.eq(
        "organizational carrier grouping cannot cross-authorize phone, graph, sig, seme, or morph owners",
        [
            ["phone-repertory-analysis", "graph-definition"],
            ["graph-variant-analysis", "phone-definition"],
            ["graph-variant-analysis", "regular-sig"],
            ["phone-repertory-analysis", "seme"],
            ["phone-repertory-analysis", "morph"],
        ].map(([domain, selection]) => {
            const groupedSource = ctx.buildClassicalGrammarConceptSource({
                domain,
                selection,
            });
            const groupedResult =
                ctx.evaluateClassicalGrammarConcept(groupedSource);
            return {
                domain,
                selection,
                sourceStatus: groupedSource.authorizationStatus,
                sourceReason: groupedSource.blockReason,
                resultStatus: groupedResult.authorizationStatus,
                resultReason: groupedResult.blockReason,
            };
        }),
        [
            ["phone-repertory-analysis", "graph-definition"],
            ["graph-variant-analysis", "phone-definition"],
            ["graph-variant-analysis", "regular-sig"],
            ["phone-repertory-analysis", "seme"],
            ["phone-repertory-analysis", "morph"],
        ].map(([domain, selection]) => ({
            domain,
            selection,
            sourceStatus: "blocked",
            sourceReason: "concept-source-selection-unlicensed",
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    const source =
        ctx.buildClassicalGrammarConceptSource({
            domain: "morpheme",
            selection: "silent-morpheme",
        });
    const result = ctx.evaluateClassicalGrammarConcept(source);
    s.eq(
        "typed Source and Result authority is identity-bound",
        {
            source: ctx.isClassicalGrammarConceptSource(source),
            sourceSpread:
                ctx.isClassicalGrammarConceptSource({ ...source }),
            sourceJson: ctx.isClassicalGrammarConceptSource(
                JSON.parse(JSON.stringify(source))
            ),
            sourceDescriptors:
                ctx.isClassicalGrammarConceptSource(
                    exactDescriptorForge(source)
                ),
            result: ctx.isClassicalGrammarConceptResult(result),
            resultSpread:
                ctx.isClassicalGrammarConceptResult({ ...result }),
            resultJson: ctx.isClassicalGrammarConceptResult(
                JSON.parse(JSON.stringify(result))
            ),
            resultDescriptors:
                ctx.isClassicalGrammarConceptResult(
                    exactDescriptorForge(result)
                ),
            operation:
                ctx.isClassicalGrammarConceptOperationContract(
                    result.operationContract
                ),
            operationCopy:
                ctx.isClassicalGrammarConceptOperationContract({
                    ...result.operationContract,
                }),
        },
        {
            source: true,
            sourceSpread: false,
            sourceJson: false,
            sourceDescriptors: false,
            result: true,
            resultSpread: false,
            resultJson: false,
            resultDescriptors: false,
            operation: true,
            operationCopy: false,
        }
    );

    const rejectedSelections = [
        ["english-sentence-template-as-nahuatl", "foreign-sentence-template-not-classical-grammar"],
        ["noun-as-nounword", "lexical-item-is-a-stem-not-a-word-class"],
        ["verb-as-verbword", "lexical-item-is-a-stem-not-a-word-class"],
        ["adjective-as-adjectiveword", "lexical-item-is-a-stem-not-a-word-class"],
        ["adverb-as-adverbword", "lexical-item-is-a-stem-not-a-word-class"],
        ["english-transitivity-definition", "transitivity-must-be-classical-source-structure"],
        ["auxiliary-verb", "foreign-category-has-no-classical-referent"],
        ["modal-auxiliary", "foreign-category-has-no-classical-referent"],
        ["preposition", "foreign-category-has-no-classical-referent"],
        ["postposition", "foreign-category-has-no-classical-referent"],
        ["translation-as-grammar", "translation-is-not-source-or-grammar-authority"],
        ["nuclear-clause-as-word", "nuclear-clause-is-not-word"],
    ];
    s.eq(
        "foreign terminology, translation, and nuclear-clause-as-word assumptions receive exact owner rejections",
        rejectedSelections.map(([selection]) => {
            const rejectedSource =
                ctx.buildClassicalGrammarConceptSource({
                    domain: "terminology-assumption",
                    selection,
                });
            const rejectedResult =
                ctx.evaluateClassicalGrammarConcept(rejectedSource);
            const receipt =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId: "concept:classification",
                    args: [rejectedSource],
                });
            return {
                selection,
                sourceAuthorized:
                    ctx.isClassicalGrammarConceptSource(rejectedSource),
                resultOwnerIssued:
                    ctx.isClassicalGrammarConceptResult(rejectedResult),
                resultStatus: rejectedResult.authorizationStatus,
                directReason: rejectedResult.blockReason,
                applicationStatus: receipt.authorizationStatus,
                applicationReason: receipt.blockReason,
            };
        }),
        rejectedSelections.map(([selection, reason]) => ({
            selection,
            sourceAuthorized: true,
            resultOwnerIssued: true,
            resultStatus: "blocked",
            directReason: reason,
            applicationStatus: "blocked",
            applicationReason: reason,
        }))
    );

    const malformedCases = [
        null,
        "NNC",
        { domain: "analysis-level", selection: "unknown" },
        { domain: "analysis-level", selection: "type", lesson: 1 },
        {
            domain: "analysis-level",
            selection: "type",
            translation: "type",
        },
        { domain: "analysis-level", selection: "type", formula: "#type#" },
        { domain: "analysis-level", selection: "type", surface: "type" },
        {
            domain: "analysis-level",
            selection: "type",
            assertedClassification: "stored-label",
        },
    ];
    s.eq(
        "unknown, label-bearing, lesson-bearing, formula-bearing, surface-bearing, and translation-bearing Source requests fail closed",
        malformedCases.map((request) => {
            const malformed =
                ctx.buildClassicalGrammarConceptSource(request);
            const evaluated =
                ctx.evaluateClassicalGrammarConcept(malformed);
            return {
                sourceStatus: malformed.authorizationStatus,
                sourceAccepted:
                    ctx.isClassicalGrammarConceptSource(malformed),
                sourceReason: malformed.blockReason,
                resultStatus: evaluated.authorizationStatus,
                resultReason: evaluated.blockReason,
            };
        }),
        [
            "concept-source-object-required",
            "concept-source-object-required",
            "concept-source-selection-unlicensed",
            "concept-source-unrecognized-constituent:lesson",
            "concept-source-unrecognized-constituent:translation",
            "concept-source-unrecognized-constituent:formula",
            "concept-source-unrecognized-constituent:surface",
            "concept-source-asserted-classification-unlicensed",
        ].map((reason) => ({
            sourceStatus: "blocked",
            sourceAccepted: false,
            sourceReason: reason,
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        }))
    );

    return s;
}

module.exports = { run };
