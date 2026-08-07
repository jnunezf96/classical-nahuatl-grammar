// Canonical modern ESM module.

export function createComplementClauseGlobals(targetObject = globalThis, installationContext = null) {
    const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
    const COMPLEMENT_CLAUSE_BOUNDARY_VERSION = 1;
    const issuedClassicalNahuatlClauseComplementationResults = new WeakSet();
    const COMPLEMENT_CLAUSE_ROLE = Object.freeze({
      objectComplement: "object-complement",
      subjectComplement: "subject-complement",
      adverbialComplement: "adverbial-complement",
      doubleNucleus: "double-nucleus",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_UNIT = Object.freeze({
      vnc: "vnc",
      nnc: "nnc",
      clause: "clause",
      sentence: "sentence",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY = Object.freeze({
      change: "change",
      materialComposition: "material-composition",
      designation: "designation",
      state: "state",
      identity: "identity",
      composition: "composition",
      coverage: "coverage",
      beginning: "beginning",
      satisfaction: "satisfaction",
      daring: "daring",
      cessation: "cessation",
      tarrying: "tarrying",
      relationalLexicalized: "relational-lexicalized",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_LINK = Object.freeze({
      objectPronounToComplementSubject: "object-pronoun-to-complement-subject",
      subjectPronounToComplementSubject: "subject-pronoun-to-complement-subject",
      possessorPronounToComplement: "possessor-pronoun-to-complement",
      principalSubjectToAdjoinedSubject: "principal-subject-to-adjoined-subject",
      relationalNncToCompatibleVerbstem: "relational-nnc-to-compatible-verbstem",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_ORDER = Object.freeze({
      complementPrincipal: "complement-principal",
      principalComplement: "principal-complement",
      discontinuous: "discontinuous",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryVncOutput: "ordinary-vnc-output",
      ordinaryNncOutput: "ordinary-nnc-output",
      nominalizationProfile: "nominalization-profile",
      objectControlLabel: "object-control-label",
      subjectLabel: "subject-label",
      adverbTranslation: "adverb-translation",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      routeLabel: "route-label",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze(["complement-clause boundary metadata is not generation", "object controls and subject labels are not complement-clause evidence", "ordinary VNC or NNC output is not a complement AST", "nominalizationProfile is not a clause-level complement relation", "single generated words do not prove object, subject, or adverbial complements", "Andrews complementation categories govern Classical grammar; labels do not authorize surface realization"]);
    const COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "principalClause",
      asks: "Which Classical principal clause hosts the complement?"
    }), Object.freeze({
      field: "complement",
      asks: "Which Classical VNC, NNC, clause, or sentence functions as complement?"
    }), Object.freeze({
      field: "complementRole",
      asks: "Is the relation object complement, subject complement, adverbial complement, double nucleus, or unknown?"
    }), Object.freeze({
      field: "complementUnitType",
      asks: "Is the complement unit a VNC, NNC, clause, sentence, or unknown?"
    }), Object.freeze({
      field: "linkingEvidence",
      asks: "What marking, order, valency, or shared-argument evidence supports complement status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Andrews source model or user-provided clause context supports complementation?"
    })]);
    function normalizeComplementClauseEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeComplementClauseRole(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_ROLE), COMPLEMENT_CLAUSE_ROLE.unknown);
    }
    function normalizeComplementClauseUnit(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_UNIT), COMPLEMENT_CLAUSE_UNIT.unknown);
    }
    function normalizeComplementClauseSemanticCategory(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        material: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.materialComposition,
        composition: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.composition,
        composed: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.composition,
        name: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation,
        naming: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation,
        begin: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
        start: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
        covered: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.coverage,
        "relational": COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized,
        "relational-idiom": COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized
      };
      return aliases[normalized] || normalizeComplementClauseEnum(normalized, Object.values(COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY), COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown);
    }
    function normalizeComplementClauseLink(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        object: COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject,
        subject: COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject,
        possessor: COMPLEMENT_CLAUSE_LINK.possessorPronounToComplement,
        adverbial: COMPLEMENT_CLAUSE_LINK.principalSubjectToAdjoinedSubject,
        relational: COMPLEMENT_CLAUSE_LINK.relationalNncToCompatibleVerbstem
      };
      return aliases[normalized] || normalizeComplementClauseEnum(normalized, Object.values(COMPLEMENT_CLAUSE_LINK), COMPLEMENT_CLAUSE_LINK.unknown);
    }
    function normalizeComplementClauseOrder(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        preposed: COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
        "complement-precedes-principal": COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
        postposed: COMPLEMENT_CLAUSE_ORDER.principalComplement,
        "complement-follows-principal": COMPLEMENT_CLAUSE_ORDER.principalComplement
      };
      return aliases[normalized] || normalizeComplementClauseEnum(normalized, Object.values(COMPLEMENT_CLAUSE_ORDER), COMPLEMENT_CLAUSE_ORDER.unknown);
    }
    function normalizeComplementClauseFalsePositiveSource(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE), COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getComplementClauseAntiConflationRules() {
      return Array.from(COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES);
    }
    function getComplementClauseStructuralQuestions() {
      return COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachComplementClauseGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "complement-clause-boundary",
        routeFamily: "complement-clause",
        ...options
      }, grammarFrameOwnerCapability);
    }
    const CLAUSE_COMPLEMENTATION_VALIDATION_REFS = Object.freeze(["src/tests/classical_lessons51_52_closure.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const CLAUSE_COMPLEMENTATION_CANVAS_REFS = Object.freeze(["Andrews Lesson 51.1", "Andrews Lesson 51.2", "Andrews Lesson 51.3", "Andrews Lesson 51.4"]);
    const CLAUSE_COMPLEMENTATION_DOUBLE_NUCLEUS_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-complementation-double-nucleus-evidence-frame",
      sourceSection: "Andrews 51.1",
      complementIsAdjoinedNnc: true,
      complementKinds: Object.freeze([COMPLEMENT_CLAUSE_ROLE.objectComplement, COMPLEMENT_CLAUSE_ROLE.subjectComplement, COMPLEMENT_CLAUSE_ROLE.adverbialComplement]),
      incorporatedComplementCompoundVerbstemsRemainSeparate: true,
      doubleNucleusStructureNotWordGeneration: true
    });
    const CLAUSE_COMPLEMENTATION_OBJECT_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-complementation-object-evidence-frame",
      sourceSection: "Andrews 51.2",
      role: COMPLEMENT_CLAUSE_ROLE.objectComplement,
      link: COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject,
      headPronounSlot: "object",
      onlyCertainPrincipalVerbstemsPermitComplementedObjects: true,
      distinctFromSharedReferentSupplementation: true,
      semanticCategories: Object.freeze({
        change: Object.freeze({
          sourceSection: "Andrews 51.2.1",
          complementNamesRoleAssumedByObjectReferent: true,
          reflexiveObjectCanBeComplemented: true,
          complementMayBeSubstantivalOrAdjectivalNnc: true
        }),
        materialComposition: Object.freeze({
          sourceSection: "Andrews 51.2.2",
          complementNounstemNamesMaterial: true,
          canSourceTransformedSentences: true
        }),
        designation: Object.freeze({
          sourceSection: "Andrews 51.2.3",
          complementNamesEntity: true,
          agreementVariantsPossible: true,
          nonspecificTlaCanHaveLocativeSupplementAndPlaceNameObjectComplement: true,
          possessiveNameConstructionChangesObjectComplementToPossessorComplement: true
        }),
        state: Object.freeze({
          sourceSection: "Andrews 51.2.4",
          adjectivalNncIndicatesObjectReferentState: true,
          compareIncorporatedComplementAndConnectiveTCompounds: true
        })
      })
    });
    const CLAUSE_COMPLEMENTATION_SUBJECT_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-complementation-subject-evidence-frame",
      sourceSection: "Andrews 51.3",
      role: COMPLEMENT_CLAUSE_ROLE.subjectComplement,
      link: COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject,
      headPronounSlot: "subject",
      complementStemMayBeSubstantivalOrAdjectival: true,
      semanticCategories: Object.freeze({
        identity: Object.freeze({
          sourceSection: "Andrews 51.3.1",
          complementIndicatesNatureOfSubjectReferent: true
        }),
        composition: Object.freeze({
          sourceSection: "Andrews 51.3.2",
          complementIndicatesMaterialOfSubjectReferent: true
        }),
        state: Object.freeze({
          sourceSection: "Andrews 51.3.3",
          complementIndicatesSubjectReferentState: true,
          resemblesAdverbialMannerButCentersOnSubjectPronoun: true,
          frequentNounstems: Object.freeze(["ce-l", "el", "iyo-h-0"]),
          possessorPronounInsideStemCanShareWithPrincipalSubject: true
        }),
        passiveObjectComplementTransform: Object.freeze({
          sourceSection: "Andrews 51.3.4",
          passiveTransformOfObjectComplementPossible: true
        })
      })
    });
    const CLAUSE_COMPLEMENTATION_ADVERBIAL_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-complementation-adverbial-evidence-frame",
      sourceSection: "Andrews 51.4",
      role: COMPLEMENT_CLAUSE_ROLE.adverbialComplement,
      complementHasAdverbLikeCapabilities: true,
      semanticCategories: Object.freeze({
        coverage: Object.freeze({
          sourceSection: "Andrews 51.4.1",
          principalStem: "mo-ca",
          complementMayBePreteritAgentiveAbundantOwnerhoodNnc: true,
          complementNncUsuallySingularEvenWhenAnimate: true
        }),
        beginning: Object.freeze({
          sourceSection: "Andrews 51.4.2",
          principalStem: "pehua",
          resemblesPurposeOrConjunctionButBelongsFullyToNeither: true,
          adjoinedSubjectSharesWithPrincipalSubject: true,
          adjoinedClauseUsuallyPresentTenseRegardlessOfPrincipalTense: true,
          futureTenseOccasionallyFound: true,
          impersonalConstructionPossible: true,
          contrastSupplementaryObjectConstruction: true
        }),
        satisfaction: Object.freeze({
          sourceSection: "Andrews 51.4.3",
          principalStem: "pach-i-hui",
          sameConstructionAsPehua: true,
          adjoinedClauseUsuallyPresentTense: true
        }),
        daring: Object.freeze({
          sourceSection: "Andrews 51.4.4",
          principalStems: Object.freeze(["tlahpal-i-hui", "m-o-tlahpal-o-a"]),
          adjoinedTenseDeterminedByPrincipalAndUsuallySubsequent: true,
          optativeCanSignalInsecurity: true
        }),
        cessation: Object.freeze({
          sourceSection: "Andrews 51.4.5",
          principalStem: "m-o-cahua"
        }),
        tarrying: Object.freeze({
          sourceSection: "Andrews 51.4.6",
          principalStem: "hueh-cahua"
        }),
        relationalLexicalized: Object.freeze({
          sourceSection: "Andrews 51.4.7",
          relationalNncCooperatesWithMeaningCompatibleVerbstem: true,
          combinationMustBeLearnedAsVocabulary: true,
          activeActionDerivationCanIncorporateAdverbializedNnc: true,
          personDyadBlocksDirectCommerceWithIncorporatedNncPossessor: true
        })
      })
    });
    const CLAUSE_COMPLEMENTATION_EVIDENCE_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson51-double-nucleus-overview",
      andrewsSection: "51.1",
      category: "double-nucleus-complementation",
      directiveEs: "La complementacion de esta leccion usa una CNN adyacente como complemento; no es generacion de palabra.",
      engineSurface: "diagnostic complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-complement-overview",
      andrewsSection: "51.2",
      category: "object-complement",
      directiveEs: "El complemento de objeto enlaza el pronombre de objeto principal con el sujeto de la CNN complemento y se distingue de suplementacion.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-change",
      andrewsSection: "51.2.1",
      category: "object-complement-change",
      directiveEs: "El complemento nombra el papel que asume el referente del objeto; tambien puede haber objeto reflexivo.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-material",
      andrewsSection: "51.2.2",
      category: "object-complement-material",
      directiveEs: "El complemento de objeto puede nombrar el material del referente del objeto.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-designation",
      andrewsSection: "51.2.3",
      category: "object-complement-designation",
      directiveEs: "El complemento puede designar nombre; con posesivo cambia a complemento de poseedor.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-state",
      andrewsSection: "51.2.4",
      category: "object-complement-state",
      directiveEs: "Una CNN adjetival puede indicar el estado del referente del objeto.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-complement-overview",
      andrewsSection: "51.3",
      category: "subject-complement",
      directiveEs: "El complemento de sujeto enlaza el sujeto de la CNN complemento con el sujeto de la CNV principal.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-identity",
      andrewsSection: "51.3.1",
      category: "subject-complement-identity",
      directiveEs: "El complemento de sujeto puede indicar identidad o naturaleza del referente.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-composition",
      andrewsSection: "51.3.2",
      category: "subject-complement-composition",
      directiveEs: "El complemento de sujeto puede indicar material o composicion.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-state",
      andrewsSection: "51.3.3",
      category: "subject-complement-state",
      directiveEs: "El estado de sujeto puede parecer manera adverbial, pero el enlace se centra en el pronombre de sujeto.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-state-cel",
      andrewsSection: "51.3.3.a",
      category: "subject-complement-possessor-state-cel",
      directiveEs: "Con cel, el poseedor interno de la CNN complemento entra en contacto con el sujeto principal.",
      engineSurface: "typed subject-complement operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-state-el",
      andrewsSection: "51.3.3.b",
      category: "subject-complement-possessor-state-el",
      directiveEs: "Con el, el poseedor interno de la CNN complemento entra en contacto con el sujeto principal.",
      engineSurface: "typed subject-complement operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-state-iyoh",
      andrewsSection: "51.3.3.c",
      category: "subject-complement-subject-state-iyoh",
      directiveEs: "Con iyoh, el sujeto de la CNN complemento entra en contacto directo con el sujeto principal.",
      engineSurface: "typed subject-complement operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-passive-transform",
      andrewsSection: "51.3.4",
      category: "passive-object-complement-transform",
      directiveEs: "Una construccion de complemento de sujeto puede ser transformacion pasiva de complemento de objeto.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-complement-overview",
      andrewsSection: "51.4",
      category: "adverbial-complement",
      directiveEs: "El complemento adverbial tiene capacidad adverbial y se licencia por familias de troncos principales.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-coverage",
      andrewsSection: "51.4.1",
      category: "coverage-complement",
      directiveEs: "Mo-ca toma complementos de cobertura o llenura; la CNN complemento suele ser singular incluso con tronco animado.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-beginning",
      andrewsSection: "51.4.2",
      category: "beginning-complement",
      directiveEs: "Pehua toma complemento que se parece a proposito o conjuncion, pero no se asigna completamente a ninguno.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-satisfaction",
      andrewsSection: "51.4.3",
      category: "satisfaction-complement",
      directiveEs: "Pachihui sigue el patron de pehua y normalmente lleva presente en la clausula adyacente.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-daring",
      andrewsSection: "51.4.4",
      category: "daring-complement",
      directiveEs: "Tlahpalihui o motlahpaloa determinan el tiempo del complemento, normalmente posterior.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-cessation",
      andrewsSection: "51.4.5",
      category: "cessation-complement",
      directiveEs: "Mocahua puede tomar complemento de cesacion.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-tarrying",
      andrewsSection: "51.4.6",
      category: "tarrying-complement",
      directiveEs: "Huehcahua puede tomar complemento de tardanza.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-relational-lexicalized",
      andrewsSection: "51.4.7",
      category: "relational-lexicalized-complement",
      directiveEs: "Una CNN relacional puede asociarse idiomaticamente con tronco compatible; se aprende como vocabulario.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function cloneClauseComplementationEvidenceRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneClauseComplementationEvidenceRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneClauseComplementationEvidenceRecord(value)]));
    }
    function getClauseComplementationEvidenceInventory() {
      return CLAUSE_COMPLEMENTATION_EVIDENCE_INVENTORY.map(entry => ({
        ...entry,
        implementationState: "implemented",
        redirectAction: "canonical-typed-clause-composition",
        canvasRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-canvas-complete",
        orthographyStatus: "canonical-classical-clause-realization",
        validationRefs: Array.from(CLAUSE_COMPLEMENTATION_VALIDATION_REFS)
      }));
    }
    function buildComplementClauseBoundaryMetadata() {
      return {
        kind: "complement-clause-boundary",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        lesson: 51,
        status: "complete",
        structuralSource: "Andrews Lesson 51",
        targetAuthority: "signed canonical Classical NNC/VNC clause frames",
        generationAllowed: true,
        confirmedExamples: [],
        structuralQuestions: getComplementClauseStructuralQuestions(),
        boundaries: {
          hasVncGeneration: true,
          hasNncGeneration: true,
          hasNominalizationProfileMetadata: true,
          hasComplementAst: true,
          hasConfirmedClauseExamples: false,
          hasStaticComplementData: false,
          changesVncGeneration: false,
          changesNncGeneration: false,
          changesNominalizationGeneration: false,
          changesValencyBehavior: false,
          treatsGeneratedWordAsComplementEvidence: false,
          treatsObjectControlAsComplementEvidence: false
        },
        antiConflationRules: getComplementClauseAntiConflationRules()
      };
    }
    function getComplementClauseSurface(input = "", fallback = "") {
      if (typeof input === "string") {
        return String(input || fallback || "").trim();
      }
      if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
      }
      const surface = getComplementClauseSurfaceForms(input)[0];
      if (getComplementClauseResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
      }
      return String(surface || fallback || "").trim();
    }
    function splitComplementClauseSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—");
    }
    function getComplementClauseCanonicalRealizationSurfaceForms(resultFrame = null) {
      if (!resultFrame || typeof resultFrame !== "object") {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-realization-record").flatMap(record => [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""]).map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
    }
    function getComplementClauseSelectedRealizationVariant(input = null) {
      if (!input || typeof input !== "object") {
        return null;
      }
      const grammarFrame = getComplementClauseResultFrame(input);
      const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      if (!resultFrame) {
        return null;
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      for (const record of records) {
        if (!record || typeof record !== "object" || record.kind !== "grammar-formula-realization-record") {
          continue;
        }
        const surfaces = [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""].map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
        if (!surfaces.length) {
          continue;
        }
        const formulaRealizationRecordId = String(record.id || "");
        const formulaRecordId = String(record.formulaRecordId || resultFrame.formulaRecord?.id || "");
        const selectedVariantIndex = 0;
        return {
          kind: "grammar-formula-realization-selected-variant",
          selectedVariantId: `${formulaRealizationRecordId || formulaRecordId || "realization"}::surface-${selectedVariantIndex}`,
          selectedVariantIndex,
          formulaRealizationRecordId,
          formulaRecordId,
          unit: String(record.unit || resultFrame.formulaRecord?.unit || "")
        };
      }
      return null;
    }
    function getComplementClauseResultFrame(input = null) {
      return (input?.grammarFrame && typeof input.grammarFrame === "object" ? input.grammarFrame : null) || (input?.frames && typeof input.frames === "object" ? input.frames : null);
    }
    function getComplementClauseSurfaceForms(input = null) {
      if (typeof input === "string") {
        return splitComplementClauseSurfaceText(input);
      }
      if (!input || typeof input !== "object") {
        return [];
      }
      const grammarFrame = getComplementClauseResultFrame(input);
      const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(frameResult);
      const canonicalForms = getComplementClauseCanonicalRealizationSurfaceForms(frameResult);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—" && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(input.surfaceForms)) {
        forms.push(...input.surfaceForms);
      }
      if (!hasResultFrame && input.surface) {
        forms.push(input.surface);
      }
      if (!hasResultFrame && input.surfaceDisplay) {
        forms.push(input.surfaceDisplay);
      }
      if (!hasResultFrame && input.result) {
        forms.push(input.result);
      }
      if (!hasResultFrame && input.word) {
        forms.push(input.word);
      }
      return forms.flatMap(entry => splitComplementClauseSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function buildComplementClauseNode(input = "", role = "unknown", fallbackSurface = "") {
      const surface = getComplementClauseSurface(input, fallbackSurface);
      const selectedVariant = getComplementClauseSelectedRealizationVariant(input);
      return {
        kind: "complement-clause-node",
        role: String(role || "unknown"),
        surface,
        ...(selectedVariant ? {
          selectedVariant,
          selectedVariantId: selectedVariant.selectedVariantId,
          formulaRealizationRecordId: selectedVariant.formulaRealizationRecordId,
          formulaRecordId: selectedVariant.formulaRecordId
        } : {}),
        clauseKind: typeof input === "object" && input ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown") : "unknown",
        formulaEcho: typeof input === "object" && input ? String(input.formulaEcho || input.nuclearClauseShell?.formulaEcho || input.nncBasic?.formulaEcho || "") : "",
        preservesSurface: true
      };
    }
    function getDefaultComplementClauseLink(complementRole = "") {
      const normalizedRole = normalizeComplementClauseRole(complementRole);
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement) {
        return COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject;
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement) {
        return COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject;
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.adverbialComplement) {
        return COMPLEMENT_CLAUSE_LINK.principalSubjectToAdjoinedSubject;
      }
      return COMPLEMENT_CLAUSE_LINK.unknown;
    }
    function buildComplementClauseSurfaceSequence({
      principalSurface = "",
      complementSurface = "",
      order = COMPLEMENT_CLAUSE_ORDER.complementPrincipal
    } = {}) {
      const principal = String(principalSurface || "").trim();
      const complement = String(complementSurface || "").trim();
      const normalizedOrder = normalizeComplementClauseOrder(order);
      if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.principalComplement) {
        return [principal, complement].filter(Boolean);
      }
      if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.discontinuous) {
        return [complement, "...", principal].filter(Boolean);
      }
      return [complement, principal].filter(Boolean);
    }
    function buildComplementClauseRelationContract({
      complementRole = "",
      semanticCategory = "",
      link = "",
      principalVerbStem = "",
      complementState = "",
      complementTense = "",
      passiveTransformOfObjectComplement = false
    } = {}) {
      const normalizedRole = normalizeComplementClauseRole(complementRole);
      const normalizedCategory = normalizeComplementClauseSemanticCategory(semanticCategory);
      const normalizedLink = normalizeComplementClauseLink(link || getDefaultComplementClauseLink(normalizedRole));
      const base = {
        role: normalizedRole,
        semanticCategory: normalizedCategory,
        link: normalizedLink,
        principalVerbStem: String(principalVerbStem || ""),
        complementState: String(complementState || ""),
        complementTense: String(complementTense || ""),
        distinctFromSupplementation: true,
        incorporatedComplementAlternative: normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement
      };
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement) {
        return {
          ...base,
          headPronounSlot: "object",
          complementSubjectSharesWith: "principal-object-pronoun",
          objectComplementTypes: ["change", "material-composition", "designation", "state"],
          possessiveNameComplementPossible: normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation
        };
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement) {
        return {
          ...base,
          headPronounSlot: "subject",
          complementSubjectSharesWith: "principal-subject-pronoun",
          subjectComplementTypes: ["identity", "composition", "state"],
          passiveTransformOfObjectComplement: passiveTransformOfObjectComplement === true
        };
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.adverbialComplement) {
        return {
          ...base,
          headPronounSlot: "principal-subject-or-compatible-relation",
          complementSubjectSharesWith: normalizedLink === COMPLEMENT_CLAUSE_LINK.relationalNncToCompatibleVerbstem ? "relational-nnc-compatible-verbstem" : "principal-subject-pronoun",
          adverbialComplementTypes: ["coverage", "beginning", "satisfaction", "daring", "cessation", "tarrying", "relational-lexicalized"],
          pehuaComplementUsuallyPresentTense: normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
          activeActionCanIncorporateRelationalNnc: normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized
        };
      }
      return base;
    }
    function buildComplementClauseAst({
      principalClause = "",
      complement = "",
      principalSurface = "",
      complementSurface = "",
      complementRole = COMPLEMENT_CLAUSE_ROLE.unknown,
      complementUnitType = COMPLEMENT_CLAUSE_UNIT.unknown,
      semanticCategory = COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown,
      link = "",
      order = COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
      principalVerbStem = "",
      complementState = "",
      complementTense = "",
      passiveTransformOfObjectComplement = false,
      evidenceSource = "",
      confirmed = false
    } = {}) {
      const normalizedRole = normalizeComplementClauseRole(complementRole);
      const normalizedUnit = normalizeComplementClauseUnit(complementUnitType);
      const normalizedCategory = normalizeComplementClauseSemanticCategory(semanticCategory);
      const normalizedLink = normalizeComplementClauseLink(link || getDefaultComplementClauseLink(normalizedRole));
      const normalizedOrder = normalizeComplementClauseOrder(order);
      const principalNode = buildComplementClauseNode(principalClause, "principal", principalSurface);
      const complementNode = buildComplementClauseNode(complement, "complement", complementSurface);
      const diagnostics = [];
      if (!principalNode.surface) {
        diagnostics.push("complement-clause-requires-principal-surface");
      }
      if (!complementNode.surface) {
        diagnostics.push("complement-clause-requires-complement-surface");
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.unknown) {
        diagnostics.push("complement-clause-role-unconfirmed");
      }
      if (normalizedUnit === COMPLEMENT_CLAUSE_UNIT.unknown) {
        diagnostics.push("complement-clause-unit-unconfirmed");
      }
      if (normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown) {
        diagnostics.push("complement-clause-semantic-category-unconfirmed");
      }
      if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.unknown) {
        diagnostics.push("complement-clause-order-unconfirmed");
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement && normalizedLink !== COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject && normalizedLink !== COMPLEMENT_CLAUSE_LINK.possessorPronounToComplement) {
        diagnostics.push("object-complement-requires-object-pronoun-link");
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement && normalizedLink !== COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject) {
        diagnostics.push("subject-complement-requires-subject-pronoun-link");
      }
      if (!String(evidenceSource || "").trim()) {
        diagnostics.push("complement-clause-source-gated");
      }
      const supported = Boolean(principalNode.surface && complementNode.surface && normalizedRole !== COMPLEMENT_CLAUSE_ROLE.unknown && normalizedUnit !== COMPLEMENT_CLAUSE_UNIT.unknown && normalizedCategory !== COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown && normalizedOrder !== COMPLEMENT_CLAUSE_ORDER.unknown && !diagnostics.includes("object-complement-requires-object-pronoun-link") && !diagnostics.includes("subject-complement-requires-subject-pronoun-link"));
      const surfaceSequence = supported ? buildComplementClauseSurfaceSequence({
        principalSurface: principalNode.surface,
        complementSurface: complementNode.surface,
        order: normalizedOrder
      }) : [];
      return targetObject.attachGrammarAstContract({
        kind: "complement-clause-ast",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        lesson: 51,
        structuralSource: "Andrews Lesson 51",
        targetAuthority: "Classical Andrews transcription",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        complementRole: normalizedRole,
        complementUnitType: normalizedUnit,
        semanticCategory: normalizedCategory,
        order: normalizedOrder,
        principalClause: principalNode,
        complement: complementNode,
        link: {
          type: normalizedLink,
          sharedReferenceRequired: true,
          distinguishesFromSupplementation: true
        },
        relationContract: buildComplementClauseRelationContract({
          complementRole: normalizedRole,
          semanticCategory: normalizedCategory,
          link: normalizedLink,
          principalVerbStem,
          complementState,
          complementTense,
          passiveTransformOfObjectComplement
        }),
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesClassicalSurfaceForms: false,
        changesValencyBehavior: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildComplementClauseBoundaryMetadata()
      }, {
        astKind: "complement-clause-ast",
        lessons: [51],
        structuralSource: "Andrews Lesson 51"
      }, grammarFrameOwnerCapability);
    }
    const CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION = 1;
    const CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_GCD = Object.freeze({
      identityId: "typed-clause-source-semantic-relation-reference-graph-surface-result",
      inputKind: "authorized-canonical-nuclear-clause-or-clause-group",
      outputKind: "authorized-classical-clause-composition",
      stageOrder: Object.freeze([
        "typed-clause-source",
        "licensed-semantic-relation",
        "rank-and-reference-graph",
        "ordered-clause-realization",
        "sentence-result"
      ]),
      oneGeneratorInvariant: "every clause node is projected from a canonical NNC/VNC result or a signed prior clause-composition result",
      curriculumOrderAuthority: false,
      storedExampleAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
    const CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_AXES = Object.freeze([
      Object.freeze({ axisId: "double-nucleus-vs-incorporated-complement", licensedValues: Object.freeze(["adjoined-nnc-complement", "incorporated-complement-remains-separate"]) }),
      Object.freeze({ axisId: "complement-role", licensedValues: Object.freeze(["object", "subject", "adverbial", "possessor-designation"]) }),
      Object.freeze({ axisId: "object-complement-semantics", licensedValues: Object.freeze(["change", "material-composition", "designation", "state"]) }),
      Object.freeze({ axisId: "object-reference-link", licensedValues: Object.freeze(["principal-object-to-complement-subject", "principal-reflexive-object-to-complement-subject", "principal-possessor-to-complement-subject"]) }),
      Object.freeze({ axisId: "object-complement-category", licensedValues: Object.freeze(["substantival-nnc", "adjectival-nnc", "locative-place-name-nnc"]) }),
      Object.freeze({ axisId: "object-complement-agreement", licensedValues: Object.freeze(["matching-category", "shared-reference-with-category-mismatch"]) }),
      Object.freeze({ axisId: "designation-structure", licensedValues: Object.freeze(["ordinary-object-complement", "tla-locative-supplement-plus-place-name", "possessive-name-possessor-complement"]) }),
      Object.freeze({ axisId: "subject-complement-semantics", licensedValues: Object.freeze(["identity", "composition", "state", "passive-object-complement-transform"]) }),
      Object.freeze({ axisId: "subject-complement-contact", licensedValues: Object.freeze(["complement-subject", "embedded-possessor-cel", "embedded-possessor-el", "preterit-agentive-subject-iyoh"]) }),
      Object.freeze({ axisId: "subject-state-vs-manner", licensedValues: Object.freeze(["subject-pronoun-centered-state", "predicate-centered-manner-remains-separate"]) }),
      Object.freeze({ axisId: "passive-complement-transform", licensedValues: Object.freeze(["active-object-complement-source", "passive-subject-complement-result"]) }),
      Object.freeze({ axisId: "adverbial-complement-family", licensedValues: Object.freeze(["coverage", "beginning", "satisfaction", "daring", "cessation", "tarrying", "relational-lexicalized"]) }),
      Object.freeze({ axisId: "coverage-complement", licensedValues: Object.freeze(["ordinary-nnc", "abundant-ownerhood-preterit-agentive", "singular-complement-with-animate-stem"]) }),
      Object.freeze({ axisId: "beginning-complement-tense", licensedValues: Object.freeze(["normally-present", "occasional-future"]) }),
      Object.freeze({ axisId: "beginning-complement-voice", licensedValues: Object.freeze(["personal", "impersonal"]) }),
      Object.freeze({ axisId: "beginning-vs-neighboring-relations", licensedValues: Object.freeze(["adverbial-complement", "purpose-remains-separate", "conjunction-remains-separate", "supplementary-object-remains-separate"]) }),
      Object.freeze({ axisId: "satisfaction-complement-tense", licensedValues: Object.freeze(["normally-present"]) }),
      Object.freeze({ axisId: "daring-complement-sequence", licensedValues: Object.freeze(["principal-determined-subsequent", "optative-insecurity"]) }),
      Object.freeze({ axisId: "relational-lexical-pair", licensedValues: Object.freeze(["te-ca+cahcayahua", "te-pan+teca", "te-tech+chicotlamati", "te-tech-pa+tlaocoya"]) }),
      Object.freeze({ axisId: "relational-active-action-incorporation", licensedValues: Object.freeze(["adverbialized-relational-nnc-incorporates", "person-dyad-blocks-possessor-commerce"]) }),
      Object.freeze({ axisId: "complement-order", licensedValues: Object.freeze(["complement-principal", "principal-complement", "discontinuous"]) })
    ]);
    const CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_PROJECTION_IDENTITY =
      "classical-nahuatl-clause-complementation-owner-selected-lcm-projection";
    const CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_PROJECTED_AXIS_IDS = Object.freeze([
      "double-nucleus-vs-incorporated-complement",
      "object-reference-link",
      "object-complement-agreement",
      "subject-state-vs-manner",
      "passive-complement-transform",
      "coverage-complement",
      "beginning-complement-voice",
      "daring-complement-sequence",
      "relational-lexical-pair",
      "relational-active-action-incorporation",
      "complement-order"
    ]);
    const CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_OPERATION_OPTION_FIELDS = Object.freeze({
      "object-complement": Object.freeze([
        "semanticCategory",
        "order",
        "principalObjectId",
        "linkKind",
        "designationStructure"
      ]),
      "subject-complement": Object.freeze([
        "semanticCategory",
        "order",
        "contactKind",
        "passiveTransform"
      ]),
      "adverbial-complement": Object.freeze([
        "semanticCategory",
        "order",
        "relationalPairId"
      ])
    });
    const CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_FORBIDDEN_AUTHORITY_FIELDS =
      Object.freeze([
        "answer",
        "evidenceSource",
        "formula",
        "lesson",
        "lessonId",
        "lessonNumber",
        "result",
        "selectedResult",
        "storedAnswer",
        "storedResult",
        "surface"
      ]);
    const CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_OBJECT_STEM_LICENSES = Object.freeze({
      change: Object.freeze(["chihua", "cuepa"]),
      "material-composition": Object.freeze(["chihua"]),
      designation: Object.freeze(["ihtoa", "tocayotia", "mati"]),
      state: Object.freeze(["teci", "i", "mi", "quetza"])
    });
    const CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_ADVERBIAL_STEM_LICENSES = Object.freeze({
      coverage: Object.freeze(["moca"]),
      beginning: Object.freeze(["pehua"]),
      satisfaction: Object.freeze(["pachihui"]),
      daring: Object.freeze(["tlahpalihui", "motlahpaloa"]),
      cessation: Object.freeze(["mocahua"]),
      tarrying: Object.freeze(["huehcahua"]),
      "relational-lexicalized": Object.freeze(["cahcayahua", "teca", "chicotlamati", "tlaocoya"])
    });
    const CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_RELATIONAL_PAIRS = Object.freeze({
      "te-ca+cahcayahua": Object.freeze({ relationalStem: "teca", principalStem: "cahcayahua" }),
      "te-pan+teca": Object.freeze({ relationalStem: "tepan", principalStem: "teca" }),
      "te-tech+chicotlamati": Object.freeze({ relationalStem: "tetech", principalStem: "chicotlamati" }),
      "te-tech-pa+tlaocoya": Object.freeze({ relationalStem: "tetechpa", principalStem: "tlaocoya" })
    });

    function freezeClassicalNahuatlClauseComposition(value) {
      if (
        !value
        || typeof value !== "object"
        || Object.isFrozen(value)
      ) return value;
      if (Array.isArray(value)) {
        return Object.freeze(value.map(freezeClassicalNahuatlClauseComposition));
      }
      return Object.freeze(Object.fromEntries(Object.entries(value).map(
        ([key, child]) => [key, freezeClassicalNahuatlClauseComposition(child)]
      )));
    }
    function stableStringifyClassicalNahuatlClauseComposition(value) {
      if (Array.isArray(value)) {
        return `[${value.map(stableStringifyClassicalNahuatlClauseComposition).join(",")}]`;
      }
      if (value && typeof value === "object") {
        return `{${Object.keys(value).filter(key => value[key] !== undefined).sort().map(
          key => `${JSON.stringify(key)}:${stableStringifyClassicalNahuatlClauseComposition(value[key])}`
        ).join(",")}}`;
      }
      return JSON.stringify(value);
    }
    function signClassicalNahuatlClauseComposition(value, prefix) {
      const serialized = stableStringifyClassicalNahuatlClauseComposition(value);
      let hash = 2166136261;
      for (let index = 0; index < serialized.length; index += 1) {
        hash ^= serialized.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return `${prefix}:${(hash >>> 0).toString(16).padStart(8, "0")}`;
    }
    function normalizeClassicalNahuatlClauseCompositionToken(value = "") {
      return String(value || "").trim().toLowerCase().replace(/[_\s]+/gu, "-");
    }
    function normalizeClassicalNahuatlClauseCompositionStem(value = "") {
      return String(value || "")
        .normalize("NFD")
        .replace(/\p{M}+/gu, "")
        .toLowerCase()
        .replace(/[^a-z]/gu, "");
    }
    function normalizeClassicalNahuatlClauseCompositionSurface(value = "") {
      return String(value || "").trim().replace(/[.?!]+$/u, "");
    }
    function realizeClassicalNahuatlClauseCompositionSentence(parts = []) {
      const text = parts.map(normalizeClassicalNahuatlClauseCompositionSurface).filter(Boolean).join(" ").trim();
      if (!text) return "";
      const initial = text.search(/\p{L}/u);
      const capitalized = initial < 0
        ? text
        : `${text.slice(0, initial)}${text[initial].toLocaleUpperCase("nah")}${text.slice(initial + 1)}`;
      return `${capitalized}.`;
    }
    function buildClassicalNahuatlClauseComplementationSelectedLcmProjection({
      operationKind = "",
      principalClause = null,
      complementClause = null,
      options = {},
      relationFrame = {},
    } = {}) {
      const selectedValues = {};
      const ownerSourcePaths = {};
      const select = (axisId, selectedValue, ownerSourcePath) => {
        const axis = CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_AXES.find(
          candidate => candidate.axisId === axisId
        );
        if (
          !CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_PROJECTED_AXIS_IDS.includes(axisId)
          || !axis?.licensedValues?.includes(selectedValue)
        ) return;
        selectedValues[axisId] = selectedValue;
        ownerSourcePaths[axisId] = ownerSourcePath;
      };
      const normalizedOrder = normalizeClassicalNahuatlClauseCompositionToken(
        options.order || "complement-principal"
      );
      select(
        "complement-order",
        normalizedOrder,
        "operationRequest.options.order"
      );
      if (operationKind === "object-complement") {
        if (relationFrame.incorporatedComplementAlternativeRemainsSeparate) {
          select(
            "double-nucleus-vs-incorporated-complement",
            "incorporated-complement-remains-separate",
            "relationFrame.incorporatedComplementAlternativeRemainsSeparate"
          );
        }
        if (relationFrame.referenceIdentityUnified) {
          select(
            "object-reference-link",
            relationFrame.role === "possessor-complement"
              ? "principal-possessor-to-complement-subject"
              : relationFrame.reflexiveObject
                ? "principal-reflexive-object-to-complement-subject"
                : "principal-object-to-complement-subject",
            relationFrame.role === "possessor-complement"
              ? "relationFrame.role"
              : relationFrame.reflexiveObject
                ? "relationFrame.reflexiveObject"
                : "relationFrame.referenceIdentityUnified"
          );
        }
        if (typeof relationFrame.participantCategoryAgreement === "boolean") {
          select(
            "object-complement-agreement",
            relationFrame.participantCategoryAgreement
              ? "matching-category"
              : "shared-reference-with-category-mismatch",
            "relationFrame.participantCategoryAgreement"
          );
        }
      }
      if (
        relationFrame.stateRelationCentersOnPrincipalSubject
        && relationFrame.adverbialMannerRelationRemainsSeparate
      ) {
        select(
          "subject-state-vs-manner",
          "subject-pronoun-centered-state",
          "relationFrame.stateRelationCentersOnPrincipalSubject"
        );
      }
      if (relationFrame.passiveTransformOfObjectComplement) {
        select(
          "passive-complement-transform",
          "passive-subject-complement-result",
          "relationFrame.passiveTransformOfObjectComplement"
        );
      }
      if (
        relationFrame.semanticCategory === "coverage"
        && complementClause?.unitKind === "nnc"
      ) {
        select(
          "coverage-complement",
          "ordinary-nnc",
          "complementClause.unitKind"
        );
      }
      if (relationFrame.semanticCategory === "beginning") {
        select(
          "beginning-complement-voice",
          complementClause?.voice === "impersonal" ? "impersonal" : "personal",
          "complementClause.voice"
        );
      }
      if (
        relationFrame.semanticCategory === "daring"
        && relationFrame.complementTensePolicy
          === "principal-determined-ordinarily-subsequent"
      ) {
        select(
          "daring-complement-sequence",
          "principal-determined-subsequent",
          "relationFrame.complementTensePolicy"
        );
      }
      if (relationFrame.semanticCategory === "relational-lexicalized") {
        select(
          "relational-lexical-pair",
          normalizeClassicalNahuatlClauseCompositionToken(options.relationalPairId),
          "operationRequest.options.relationalPairId"
        );
        if (relationFrame.activeActionIncorporationAvailable) {
          select(
            "relational-active-action-incorporation",
            "adverbialized-relational-nnc-incorporates",
            "relationFrame.activeActionIncorporationAvailable"
          );
        }
      }
      const selectedAxisValues = Object.entries(selectedValues).map(
        ([axisId, selectedValue]) => ({
          axisId,
          selectedValue,
          ownerSourcePath: ownerSourcePaths[axisId]
        })
      );
      return freezeClassicalNahuatlClauseComposition({
        projectionIdentity:
          CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_PROJECTION_IDENTITY,
        selectedValues,
        selectedAxisValues,
        selectedAxisIds: selectedAxisValues.map(selection => selection.axisId),
        ownerSourcePaths,
        selectedValuesAreTypedProjection: true,
        principalSourceSignature: principalClause?.canonicalSignature || ""
      });
    }
    function selectClassicalNahuatlClauseComplementationOptions(operationKind, options = {}) {
      return Object.fromEntries((CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_OPERATION_OPTION_FIELDS[operationKind] || [])
        .filter(field => Object.hasOwn(options || {}, field))
        .map(field => [field, options[field]]));
    }
    function getClassicalNahuatlClauseCompositionNncSlotFrame(sourceFrame = null) {
      return sourceFrame?.nncSlotFrame
        || sourceFrame?.sourceNncSlotFrame
        || sourceFrame?.resultFrame?.nncSlotFrame
        || sourceFrame?.resultFrame?.sourceNncSlotFrame
        || sourceFrame?.selectedOutputLogicFrame?.selectedNncSlotFrame
        || sourceFrame?.resultFrame?.selectedOutputLogicFrame?.selectedNncSlotFrame
        || sourceFrame?.proofFrame?.conclusion?.nncSlotFrame
        || null;
    }
    function getClassicalNahuatlClauseCompositionVncSlotFrame(sourceFrame = null) {
      return sourceFrame?.finalTypedVncSlotFrame
        || sourceFrame?.resultFrame?.finalTypedVncSlotFrame
        || sourceFrame?.targetTypedVncSlotFrame
        || sourceFrame?.resultFrame?.targetTypedVncSlotFrame
        || sourceFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
        || sourceFrame?.resultFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
        || sourceFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame
        || sourceFrame?.resultFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame
        || null;
    }
    function getClassicalNahuatlClauseCompositionSourceFormula(sourceFrame = null) {
      const nncSlotFrame =
        getClassicalNahuatlClauseCompositionNncSlotFrame(sourceFrame);
      if (
        nncSlotFrame
        && typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
        && targetObject.isClassicalNahuatlNncSlotFrame(nncSlotFrame)
        && typeof targetObject.renderClassicalNahuatlNncSlotFrameFormula
          === "function"
      ) {
        return String(
          targetObject.renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame)
          || ""
        ).trim();
      }
      const vncSlotFrame =
        getClassicalNahuatlClauseCompositionVncSlotFrame(sourceFrame);
      if (
        vncSlotFrame
        && typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
        && targetObject.isClassicalNahuatlVncSlotFrame(vncSlotFrame)
        && typeof targetObject.renderClassicalNahuatlVncSlotFrameFormula
          === "function"
      ) {
        return String(
          targetObject.renderClassicalNahuatlVncSlotFrameFormula(vncSlotFrame)
          || ""
        ).trim();
      }
      const grammarFrame = sourceFrame?.grammarFrame
        || sourceFrame?.frames
        || sourceFrame?.output?.grammarFrame
        || sourceFrame?.output?.frames
        || null;
      const resultFrame = grammarFrame?.resultFrame
        || sourceFrame?.resultFrame
        || null;
      return String([
        sourceFrame?.formulaRealization,
        sourceFrame?.formula,
        sourceFrame?.selectedFormula,
        sourceFrame?.formulaRecord?.formula,
        resultFrame?.formulaRecord?.formula,
        resultFrame?.selectedFormula,
        resultFrame?.formulaRealization,
        sourceFrame?.proofFrame?.conclusion?.formulaRealization,
        sourceFrame?.resultFrame?.proofFrame?.conclusion?.formulaRealization,
      ].find(value => typeof value === "string" && value.trim()) || "").trim();
    }
    function buildClassicalNahuatlClauseCompositionSourceFrame(sourceFrame = null, options = {}) {
      const buildEnvelope = targetObject.buildClassicalNahuatlSupplementationClauseEnvelope;
      const isEnvelope = targetObject.isClassicalNahuatlSupplementationClauseEnvelope;
      if (typeof buildEnvelope !== "function" || typeof isEnvelope !== "function") {
        return freezeClassicalNahuatlClauseComposition({
          kind: "classical-nahuatl-clause-composition-source-frame",
          version: CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION,
          authorizationStatus: "blocked",
          blockReason: "canonical-nuclear-clause-envelope-capability-required"
        });
      }
      const canonicalSourceFrame = sourceFrame?.resultFrame?.selectedMachineryFrame
        && sourceFrame.resultFrame.selectedMachineryFrame.authorizationStatus === "authorized"
        ? sourceFrame.resultFrame.selectedMachineryFrame
        : sourceFrame?.resultFrame
        && typeof sourceFrame.resultFrame === "object"
        && sourceFrame.resultFrame.authorizationStatus === "authorized"
        ? sourceFrame.resultFrame
        : sourceFrame;
      const envelope = buildEnvelope(sourceFrame, options);
      if (!isEnvelope(envelope)) {
        return freezeClassicalNahuatlClauseComposition({
          kind: "classical-nahuatl-clause-composition-source-frame",
          version: CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION,
          authorizationStatus: "blocked",
          blockReason: envelope?.blockReason || "authorized-canonical-nuclear-clause-required",
          typedFrameAuthority: true,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        });
      }
      const nncSlotFrame = getClassicalNahuatlClauseCompositionNncSlotFrame(sourceFrame);
      const vncSlotFrame = getClassicalNahuatlClauseCompositionVncSlotFrame(sourceFrame);
      const sourceValence = normalizeClassicalNahuatlClauseCompositionToken(
        sourceFrame?.classTargetValence
        || canonicalSourceFrame?.classTargetValence
        || sourceFrame?.valence
        || canonicalSourceFrame?.valence
        || ""
      );
      const nonspecificObjectKind = sourceValence === "projective-nonhuman"
        ? "nonspecific-nonhuman"
        : sourceValence === "projective-human"
          ? "nonspecific-human"
          : "";
      const nonspecificObjectReferenceId = String(
        options?.objectReferenceIds?.["nonspecific-object"]
        || options?.objectReferenceId
        || ""
      ).trim();
      if (envelope.unitKind === "vnc"
        && nonspecificObjectKind
        && !envelope.objects.length
        && !nonspecificObjectReferenceId) {
        return freezeClassicalNahuatlClauseComposition({
          kind: "classical-nahuatl-clause-composition-source-frame",
          version: CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION,
          authorizationStatus: "blocked",
          blockReason: "typed-nonspecific-object-reference-id-required",
          typedFrameAuthority: true,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        });
      }
      const projectedObjects = envelope.objects.length
        ? envelope.objects
        : nonspecificObjectKind
          ? [freezeClassicalNahuatlClauseComposition({
              id: "nonspecific-object",
              category: nonspecificObjectKind,
              features: null,
              objectKind: nonspecificObjectKind,
              sounded: true,
              silent: false,
              carrier: nonspecificObjectKind === "nonspecific-nonhuman" ? "tla" : "tē",
              referenceId: nonspecificObjectReferenceId
            })]
          : [];
      const predicateStem = String(
        sourceFrame?.stem
        || sourceFrame?.targetStem
        || sourceFrame?.sourceVerbstem
        || canonicalSourceFrame?.stem
        || canonicalSourceFrame?.targetStem
        || canonicalSourceFrame?.sourceVerbstem
        || nncSlotFrame?.slots?.predicate?.stem
        || vncSlotFrame?.slots?.predicate?.stem
        || envelope.sourceStem
        || ""
      ).trim();
      const projection = {
        kind: "classical-nahuatl-clause-composition-source-frame",
        version: CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        rank: "nuclear-clause",
        unitKind: envelope.unitKind,
        envelope,
        envelopeCanonicalSignature: envelope.canonicalSignature,
        referenceId: envelope.referenceId,
        subject: envelope.subject,
        objects: projectedObjects,
        possessor: envelope.possessor,
        predicateStem,
        normalizedPredicateStem: normalizeClassicalNahuatlClauseCompositionStem(predicateStem),
        nounClass: String(sourceFrame?.nounClass || canonicalSourceFrame?.nounClass || nncSlotFrame?.nounClass || nncSlotFrame?.slots?.predicate?.nounClass || ""),
        state: normalizeClassicalNahuatlClauseCompositionToken(sourceFrame?.state || canonicalSourceFrame?.state || nncSlotFrame?.state || ""),
        animacy: normalizeClassicalNahuatlClauseCompositionToken(sourceFrame?.animacy || canonicalSourceFrame?.animacy || nncSlotFrame?.animacy || ""),
        pronominalSubtype: normalizeClassicalNahuatlClauseCompositionToken(nncSlotFrame?.pronominalSubtype || ""),
        affectiveFormation: Boolean(
          (sourceFrame?.affectiveScope && sourceFrame.affectiveScope !== "none")
          || (sourceFrame?.affectiveMatrix && sourceFrame.affectiveMatrix !== "none")
          || ["honorific", "pejorative"].includes(normalizeClassicalNahuatlClauseCompositionToken(sourceFrame?.affective))
          || sourceFrame?.affectiveFormation === true
          || nncSlotFrame?.affectiveFormation === true
        ),
        voice: normalizeClassicalNahuatlClauseCompositionToken(
          sourceFrame?.controlFrame?.selectedVoice
          || sourceFrame?.voice
          || sourceFrame?.selectedOutputLogicFrame?.outputFillers?.voice
          || sourceFrame?.voiceTransformationFrame?.voice
          || sourceFrame?.voiceOperation
          || sourceFrame?.selectedVoice
          || sourceFrame?.proofFrame?.conclusion?.selectedVoice
          || sourceFrame?.proofFrame?.conclusion?.voiceOperation
          || ""
        ) || "active-or-unspecified",
        mood: envelope.mood,
        tense: envelope.tense,
        formulaRealization:
          getClassicalNahuatlClauseCompositionSourceFormula(sourceFrame),
        surface: envelope.surface,
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedSurfaceAccepted: false
      };
      return freezeClassicalNahuatlClauseComposition({
        ...projection,
        canonicalSignature: signClassicalNahuatlClauseComposition(projection, "clause-composition-source")
      });
    }
    function isClassicalNahuatlClauseCompositionSourceFrame(frame = null) {
      if (
        frame?.kind !== "classical-nahuatl-clause-composition-source-frame"
        || frame.version !== CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.rank !== "nuclear-clause"
        || !["nnc", "vnc"].includes(frame.unitKind)
        || !frame.formulaRealization
        || !frame.surface
        || frame.typedFrameAuthority !== true
        || frame.lessonMetadataAuthority !== false
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedSurfaceAccepted !== false
        || typeof targetObject.isClassicalNahuatlSupplementationClauseEnvelope !== "function"
        || !targetObject.isClassicalNahuatlSupplementationClauseEnvelope(frame.envelope)
        || frame.envelopeCanonicalSignature !== frame.envelope.canonicalSignature
      ) return false;
      const projection = { ...frame };
      delete projection.canonicalSignature;
      return frame.canonicalSignature === signClassicalNahuatlClauseComposition(projection, "clause-composition-source");
    }
    function buildClassicalNahuatlClauseComplementationOperationRequest(request = {}) {
      const operationKind = normalizeClassicalNahuatlClauseCompositionToken(request.operationKind);
      const optionFields =
        CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_OPERATION_OPTION_FIELDS[operationKind]
        || [];
      const unknownOptionFields = Object.keys(request.options || {}).filter(
        field => !optionFields.includes(field)
      );
      const forbiddenAuthorityFields =
        CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_FORBIDDEN_AUTHORITY_FIELDS.filter(
          field => Object.hasOwn(request || {}, field)
        );
      const projection = {
        kind: "classical-nahuatl-clause-complementation-operation-request",
        version: CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION,
        operationKind,
        operationKindLicensed: Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_OPERATION_OPTION_FIELDS, operationKind),
        operationOptionsLicensed: unknownOptionFields.length === 0,
        unknownOptionFields,
        requestAuthorityLicensed: forbiddenAuthorityFields.length === 0,
        forbiddenAuthorityFields,
        principalClause: request.principalClause || null,
        complementClause: request.complementClause || null,
        auxiliaryClause: request.auxiliaryClause || null,
        options: selectClassicalNahuatlClauseComplementationOptions(operationKind, request.options || {}),
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedSurfaceAccepted: false
      };
      return freezeClassicalNahuatlClauseComposition({
        ...projection,
        canonicalSignature: signClassicalNahuatlClauseComposition(projection, "clause-complementation-operation-request")
      });
    }
    function isClassicalNahuatlClauseComplementationOperationRequest(request = null) {
      if (
        request?.kind !== "classical-nahuatl-clause-complementation-operation-request"
        || request.version !== CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION
        || !Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_OPERATION_OPTION_FIELDS, request.operationKind)
        || typeof request.operationOptionsLicensed !== "boolean"
        || !Array.isArray(request.unknownOptionFields)
        || request.operationOptionsLicensed
          !== (request.unknownOptionFields.length === 0)
        || typeof request.requestAuthorityLicensed !== "boolean"
        || !Array.isArray(request.forbiddenAuthorityFields)
        || request.requestAuthorityLicensed
          !== (request.forbiddenAuthorityFields.length === 0)
        || request.typedFrameAuthority !== true
        || request.lessonMetadataAuthority !== false
        || request.formulaStringAuthority !== false
        || request.surfaceStringAuthority !== false
        || request.callerSuppliedSurfaceAccepted !== false
      ) return false;
      const projection = { ...request };
      delete projection.canonicalSignature;
      return request.canonicalSignature === signClassicalNahuatlClauseComposition(projection, "clause-complementation-operation-request");
    }
    function buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, blockReason, details = {}) {
      return freezeClassicalNahuatlClauseComposition({
        kind: "classical-nahuatl-clause-complementation-result-frame",
        version: CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION,
        operationKind,
        authorizationStatus: "blocked",
        blockReason,
        surfaceRealization: "",
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        ...details
      });
    }
    function classicalNahuatlClauseComplementationStemLicensed(stem, licenses = []) {
      const normalized = normalizeClassicalNahuatlClauseCompositionStem(stem);
      return !licenses.length || licenses.some(license => normalized.endsWith(license));
    }
    function orderClassicalNahuatlClauseComplementationClauses(principalClause, complementClause, order) {
      const normalizedOrder = normalizeClassicalNahuatlClauseCompositionToken(order || "complement-principal");
      if (normalizedOrder === "principal-complement") {
        return [principalClause.surface, complementClause.surface];
      }
      if (normalizedOrder === "discontinuous") {
        return [complementClause.surface, principalClause.surface];
      }
      return [complementClause.surface, principalClause.surface];
    }
    function orderClassicalNahuatlClauseComplementationFormulas(principalClause, complementClause, order) {
      const normalizedOrder = normalizeClassicalNahuatlClauseCompositionToken(order || "complement-principal");
      if (normalizedOrder === "principal-complement") {
        return [principalClause.formulaRealization, complementClause.formulaRealization];
      }
      return [complementClause.formulaRealization, principalClause.formulaRealization];
    }
    function finalizeClassicalNahuatlClauseComplementationResultFrame(operationKind, principalClause, complementClause, options, relationFrame, auxiliaryClause = null) {
      const surfaceSequence = orderClassicalNahuatlClauseComplementationClauses(
        principalClause,
        complementClause,
        options.order
      );
      const formulaSequence = orderClassicalNahuatlClauseComplementationFormulas(
        principalClause,
        complementClause,
        options.order
      );
      if (auxiliaryClause) {
        const auxiliaryIndex =
          normalizeClassicalNahuatlClauseCompositionToken(options.order)
            === "principal-complement"
            ? 1
            : 0;
        surfaceSequence.splice(
          auxiliaryIndex,
          0,
          auxiliaryClause.surface
        );
        formulaSequence.splice(
          auxiliaryIndex,
          0,
          auxiliaryClause.formulaRealization
        );
      }
      if (
        formulaSequence.some(formula => !String(formula || "").trim())
        || typeof targetObject.buildGrammarFormulaRecord !== "function"
        || typeof targetObject.buildGrammarFormulaRealizationRecord !== "function"
      ) {
        return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
          operationKind,
          "complete-source-formulas-and-formula-record-capabilities-required"
        );
      }
      const formulaRealization = formulaSequence.join(" + ");
      const surfaceRealization =
        realizeClassicalNahuatlClauseCompositionSentence(surfaceSequence);
      const formulaRecord = targetObject.buildGrammarFormulaRecord({
        id: `clause-complement:${operationKind}:${relationFrame.role || "relation"}`,
        unit: "CLAUSE_GROUP",
        formula: formulaRealization,
        formulaSlots: {
          principal: principalClause.formulaRealization,
          complement: complementClause.formulaRealization,
          auxiliary: auxiliaryClause?.formulaRealization || "",
          relation: relationFrame.role || "",
        },
        operationFrames: [{
          operationId: operationKind,
          semanticCategory: relationFrame.semanticCategory || "",
          order: normalizeClassicalNahuatlClauseCompositionToken(
            options.order || "complement-principal"
          ),
        }],
        source: "typed-clause-composition-source-formulas",
      });
      const formulaRealizationRecord =
        targetObject.buildGrammarFormulaRealizationRecord({
          id: `${formulaRecord.id}::selected`,
          formulaRecord,
          unit: "CLAUSE_GROUP",
          segmentFrames: formulaSequence.map((formulaValue, index) => ({
            slot: `clause-${index + 1}`,
            role: "clause-constituent",
            formulaValue,
            surface: surfaceSequence[index] || "",
          })),
          surfaceForms: [surfaceRealization],
          source: "typed-complement-clause-boundary-realization",
        });
      const projection = {
        kind: "classical-nahuatl-clause-complementation-result-frame",
        version: CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION,
        operationKind,
        authorizationStatus: "authorized",
        blockReason: "",
        rank: "clause-group",
        principalClause,
        complementClause,
        auxiliaryClause,
        relationFrame,
        leastCommonMultiple: buildClassicalNahuatlClauseComplementationSelectedLcmProjection({
          operationKind,
          principalClause,
          complementClause,
          options,
          relationFrame
        }),
        formulaSequence,
        formulaRealization,
        formulaRecord,
        formulaRealizationRecord,
        surfaceSequence,
        surfaceRealization,
        canonicalExecutor: "evaluateClassicalNahuatlClauseComplementation",
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedSurfaceAccepted: false
      };
      const result = freezeClassicalNahuatlClauseComposition({
        ...projection,
        canonicalSignature: signClassicalNahuatlClauseComposition(projection, "clause-complementation-result")
      });
      issuedClassicalNahuatlClauseComplementationResults.add(result);
      return result;
    }
    function isClassicalNahuatlClauseComplementationResultFrame(frame = null) {
      if (
        !issuedClassicalNahuatlClauseComplementationResults.has(frame)
        || frame?.kind !== "classical-nahuatl-clause-complementation-result-frame"
        || frame.version !== CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.rank !== "clause-group"
        || !frame.formulaRealization
        || !frame.formulaRecord
        || !frame.formulaRealizationRecord
        || !frame.surfaceRealization
        || frame.typedFrameAuthority !== true
        || frame.lessonMetadataAuthority !== false
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.leastCommonMultiple?.projectionIdentity
          !== CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_PROJECTION_IDENTITY
        || frame.leastCommonMultiple?.selectedValuesAreTypedProjection !== true
        || !Array.isArray(frame.leastCommonMultiple?.selectedAxisValues)
        || !frame.leastCommonMultiple.selectedAxisValues.every(selection => (
          CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_PROJECTED_AXIS_IDS.includes(
            selection.axisId
          )
          && frame.leastCommonMultiple.selectedValues?.[selection.axisId]
            === selection.selectedValue
          && frame.leastCommonMultiple.ownerSourcePaths?.[selection.axisId]
            === selection.ownerSourcePath
        ))
      ) return false;
      const projection = { ...frame };
      delete projection.canonicalSignature;
      return frame.canonicalSignature === signClassicalNahuatlClauseComposition(projection, "clause-complementation-result");
    }
    function evaluateClassicalNahuatlClauseComplementation(request = {}) {
      const operationRequest = isClassicalNahuatlClauseComplementationOperationRequest(request)
        ? request
        : buildClassicalNahuatlClauseComplementationOperationRequest(request);
      const operationKind = operationRequest.operationKind;
      if (!operationRequest.operationKindLicensed) {
        return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "recognized-clause-complementation-operation-required");
      }
      if (!operationRequest.requestAuthorityLicensed) {
        return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
          operationKind,
          `forbidden-clause-complementation-request-authority:${operationRequest.forbiddenAuthorityFields[0] || ""}`
        );
      }
      if (!operationRequest.operationOptionsLicensed) {
        return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
          operationKind,
          `unrecognized-clause-complementation-operation-option:${operationRequest.unknownOptionFields[0] || ""}`
        );
      }
      const principal = operationRequest.principalClause;
      const complement = operationRequest.complementClause;
      if (!isClassicalNahuatlClauseCompositionSourceFrame(principal) || !isClassicalNahuatlClauseCompositionSourceFrame(complement)) {
        return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "typed-principal-and-complement-clause-frames-required");
      }
      const options = operationRequest.options || {};
      const semanticCategory = normalizeClassicalNahuatlClauseCompositionToken(options.semanticCategory);
      if (operationKind === "object-complement") {
        if (complement.unitKind !== "nnc" || !Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_OBJECT_STEM_LICENSES, semanticCategory)) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "licensed-object-complement-category-and-nnc-required");
        }
        const designationStructure = normalizeClassicalNahuatlClauseCompositionToken(options.designationStructure || "ordinary-object-complement");
        const linkKind = normalizeClassicalNahuatlClauseCompositionToken(options.linkKind || "object-subject");
        const possessiveNameStructure = semanticCategory === "designation"
          && designationStructure === "possessive-name-possessor-complement"
          && linkKind === "possessor-subject";
        const tlaLocativeStructure = semanticCategory === "designation"
          && designationStructure === "tla-locative-supplement-plus-place-name";
        if (
          (!possessiveNameStructure && principal.unitKind !== "vnc")
          || (possessiveNameStructure && (
            principal.unitKind !== "nnc"
            || principal.state !== "possessive"
            || !principal.possessor
          ))
        ) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
            operationKind,
            possessiveNameStructure
              ? "possessive-name-designation-requires-typed-possessive-nnc-principal"
              : "object-complement-principal-must-be-typed-vnc"
          );
        }
        if (!possessiveNameStructure
          && !classicalNahuatlClauseComplementationStemLicensed(principal.predicateStem, CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_OBJECT_STEM_LICENSES[semanticCategory])) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "principal-verbstem-not-licensed-for-object-complement-category");
        }
        const requestedPrincipalObjectId = String(
          options.principalObjectId || ""
        ).trim();
        let object = null;
        if (linkKind !== "possessor-subject") {
          if (!principal.objects.length) {
            return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
              operationKind,
              "object-complement-principal-object-required"
            );
          }
          if (principal.objects.length === 1) {
            object = principal.objects[0];
            if (
              requestedPrincipalObjectId
              && requestedPrincipalObjectId !== object.id
            ) {
              return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
                operationKind,
                "principal-object-id-does-not-match-derived-single-object"
              );
            }
          } else {
            if (!requestedPrincipalObjectId) {
              return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
                operationKind,
                "principal-object-id-required-for-multiple-typed-objects"
              );
            }
            object = principal.objects.find(
              entry => entry.id === requestedPrincipalObjectId
            ) || null;
            if (!object) {
              return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
                operationKind,
                "principal-object-id-not-owned-by-principal-source"
              );
            }
          }
        }
        const auxiliary = operationRequest.auxiliaryClause;
        if (tlaLocativeStructure && (
          !isClassicalNahuatlClauseCompositionSourceFrame(auxiliary)
          || auxiliary.unitKind !== "nnc"
          || object?.objectKind !== "nonspecific-nonhuman"
          || !object.referenceId
          || auxiliary.subject.referenceId !== object.referenceId
          || complement.subject.referenceId !== object.referenceId
        )) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(
            operationKind,
            "tla-designation-requires-nonspecific-object-plus-typed-locative-and-place-name-nncs"
          );
        }
        const principalReference = linkKind === "possessor-subject"
          ? principal.possessor?.referenceId || ""
          : object?.referenceId || "";
        if (!principalReference || principalReference !== complement.subject.referenceId) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "object-or-possessor-reference-must-match-complement-subject");
        }
        if (designationStructure !== "ordinary-object-complement" && semanticCategory !== "designation") {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "special-designation-structure-requires-designation-semantics");
        }
        return finalizeClassicalNahuatlClauseComplementationResultFrame(operationKind, principal, complement, options, {
          role: linkKind === "possessor-subject" ? "possessor-complement" : "object-complement",
          semanticCategory,
          designationStructure,
          principalObjectId: object?.id || "",
          referenceIdentityUnified: true,
          reflexiveObject: Boolean(object && object.referenceId === principal.subject.referenceId),
          participantCategoryAgreement: object?.category === complement.subject.category,
          agreementMismatchLicensed: object?.category !== complement.subject.category,
          complementPredicateKind: semanticCategory === "state" ? "adjectival-nnc" : "substantival-or-contextual-nnc",
          distinctFromSupplementation: true,
          incorporatedComplementAlternativeRemainsSeparate: true,
          tlaLocativeSupplementPlusPlaceName: tlaLocativeStructure,
          auxiliaryLocativeReferenceUnified: tlaLocativeStructure
        }, tlaLocativeStructure ? auxiliary : null);
      }
      if (operationKind === "subject-complement") {
        if (principal.unitKind !== "vnc") {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "subject-complement-principal-must-be-typed-vnc");
        }
        if (complement.unitKind !== "nnc" || !["identity", "composition", "state", "passive-object-complement-transform"].includes(semanticCategory)) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "licensed-subject-complement-category-and-nnc-required");
        }
        const contactKind = normalizeClassicalNahuatlClauseCompositionToken(options.contactKind || "subject");
        const specialPossessorContact = ["embedded-possessor-cel", "embedded-possessor-el"].includes(contactKind);
        const complementReference = specialPossessorContact
          ? complement.possessor?.referenceId || ""
          : complement.subject.referenceId;
        if (!complementReference || complementReference !== principal.subject.referenceId) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "principal-subject-reference-must-match-complement-contact");
        }
        const normalizedComplementStem = complement.normalizedPredicateStem;
        if (contactKind === "embedded-possessor-cel" && !normalizedComplementStem.endsWith("cel")) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "cel-contact-requires-typed-cel-nnc");
        }
        if (contactKind === "embedded-possessor-el" && !normalizedComplementStem.endsWith("el")) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "el-contact-requires-typed-el-nnc");
        }
        if (contactKind === "preterit-agentive-subject-iyoh" && !normalizedComplementStem.endsWith("iyoh")) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "iyoh-contact-requires-typed-iyoh-nnc");
        }
        const passiveTransform = options.passiveTransform === true || semanticCategory === "passive-object-complement-transform";
        if (passiveTransform && !["passive", "nonactive-passive"].includes(principal.voice)) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "passive-object-complement-transform-requires-typed-passive-principal");
        }
        return finalizeClassicalNahuatlClauseComplementationResultFrame(operationKind, principal, complement, options, {
          role: "subject-complement",
          semanticCategory,
          contactKind,
          referenceIdentityUnified: true,
          stateRelationCentersOnPrincipalSubject: semanticCategory === "state",
          adverbialMannerRelationRemainsSeparate: semanticCategory === "state",
          passiveTransformOfObjectComplement: passiveTransform
        });
      }
      if (operationKind === "adverbial-complement") {
        if (principal.unitKind !== "vnc") {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "adverbial-complement-principal-must-be-typed-vnc");
        }
        if (!Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_ADVERBIAL_STEM_LICENSES, semanticCategory)) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "licensed-adverbial-complement-family-required");
        }
        if (!classicalNahuatlClauseComplementationStemLicensed(principal.predicateStem, CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_ADVERBIAL_STEM_LICENSES[semanticCategory])) {
          return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "principal-verbstem-not-licensed-for-adverbial-complement-family");
        }
        if (semanticCategory === "coverage") {
          if (complement.unitKind !== "nnc") {
            return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "coverage-complement-requires-typed-nnc");
          }
          if (complement.subject?.features?.number === "plural") {
            return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "coverage-complement-nnc-is-normally-singular");
          }
        } else if (semanticCategory === "relational-lexicalized") {
          if (complement.unitKind !== "nnc") {
            return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "relational-complement-requires-typed-relational-nnc");
          }
          const relationalPairId = normalizeClassicalNahuatlClauseCompositionToken(options.relationalPairId);
          const pair = CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_RELATIONAL_PAIRS[relationalPairId];
          const relationalSource = complement.envelope?.sourceFrameKind
            === "classical-nahuatl-relational-nnc-relational-result";
          const realizedRelationalStem = normalizeClassicalNahuatlClauseCompositionStem(
            complement.surface,
          );
          if (!pair
            || !relationalSource
            || !principal.normalizedPredicateStem.endsWith(pair.principalStem)
            || !realizedRelationalStem.endsWith(pair.relationalStem)) {
            return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "typed-relational-nnc-and-verbstem-pair-not-licensed");
          }
        } else {
          if (complement.unitKind !== "vnc" || principal.subject.referenceId !== complement.subject.referenceId) {
            return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "adjoined-vnc-subject-must-share-principal-subject-reference");
          }
          if (["beginning", "satisfaction"].includes(semanticCategory)
            && !["present", "future"].includes(complement.tense)) {
            return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "beginning-or-satisfaction-complement-requires-present-or-licensed-future");
          }
          if (semanticCategory === "satisfaction" && complement.tense !== "present") {
            return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "satisfaction-complement-is-normally-present");
          }
        }
        return finalizeClassicalNahuatlClauseComplementationResultFrame(operationKind, principal, complement, options, {
          role: "adverbial-complement",
          semanticCategory,
          referenceIdentityUnified: !["coverage", "relational-lexicalized"].includes(semanticCategory),
          complementTensePolicy: semanticCategory === "beginning"
            ? "normally-present-occasional-future"
            : semanticCategory === "satisfaction"
              ? "normally-present"
              : semanticCategory === "daring"
                ? "principal-determined-ordinarily-subsequent"
                : "lexically-governed",
          optativeInsecurity: semanticCategory === "daring" && complement.mood === "optative",
          resemblesPurposeOrConjunctionButIsNeither: semanticCategory === "beginning",
          activeActionIncorporationAvailable: semanticCategory === "relational-lexicalized",
          personDyadBlocksIncorporatedPossessorCommerce: semanticCategory === "relational-lexicalized"
        });
      }
      return buildClassicalNahuatlClauseComplementationBlockedResultFrame(operationKind, "recognized-clause-complementation-operation-required");
    }
    function evaluateClassicalNahuatlClauseComplementationParadigm(requests = []) {
      const rows = (Array.isArray(requests) ? requests : []).map((request, index) => {
        const operationRequest = isClassicalNahuatlClauseComplementationOperationRequest(request)
          ? request
          : buildClassicalNahuatlClauseComplementationOperationRequest(request);
        const result = evaluateClassicalNahuatlClauseComplementation(operationRequest);
        return freezeClassicalNahuatlClauseComposition({
          coordinateId: String(request?.coordinateId || `coordinate-${index + 1}`),
          operationKind: operationRequest.operationKind,
          authorizationStatus: result.authorizationStatus,
          blockReason: result.blockReason || "",
          formulaRealization: result.formulaRealization || "",
          surfaceRealization: result.surfaceRealization || "",
          result
        });
      });
      const projection = {
        kind: "classical-nahuatl-clause-complementation-paradigm-frame",
        version: CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION,
        authorizationStatus: rows.some(row => row.authorizationStatus === "authorized") ? "authorized" : "blocked",
        blockReason: rows.some(row => row.authorizationStatus === "authorized") ? "" : "no-authorized-complement-coordinate",
        scalarEvaluator: "evaluateClassicalNahuatlClauseComplementation",
        pointwiseScalarEquivalent: true,
        formulaProjectionPointwiseScalarEquivalent: true,
        writtenProjectionPointwiseScalarEquivalent: true,
        rows,
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
      return freezeClassicalNahuatlClauseComposition(projection);
    }

    const api = {};
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_ROLE", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_ROLE; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_UNIT; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_LINK", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_LINK; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_ORDER; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeComplementClauseEnum = normalizeComplementClauseEnum;
    api.normalizeComplementClauseRole = normalizeComplementClauseRole;
    api.normalizeComplementClauseUnit = normalizeComplementClauseUnit;
    api.normalizeComplementClauseSemanticCategory = normalizeComplementClauseSemanticCategory;
    api.normalizeComplementClauseLink = normalizeComplementClauseLink;
    api.normalizeComplementClauseOrder = normalizeComplementClauseOrder;
    api.normalizeComplementClauseFalsePositiveSource = normalizeComplementClauseFalsePositiveSource;
    api.getComplementClauseAntiConflationRules = getComplementClauseAntiConflationRules;
    api.getComplementClauseStructuralQuestions = getComplementClauseStructuralQuestions;
    Object.defineProperty(api, "CLAUSE_COMPLEMENTATION_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_COMPLEMENTATION_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "CLAUSE_COMPLEMENTATION_CANVAS_REFS", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_COMPLEMENTATION_CANVAS_REFS; },
    });
    Object.defineProperty(api, "CLAUSE_COMPLEMENTATION_DOUBLE_NUCLEUS_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_COMPLEMENTATION_DOUBLE_NUCLEUS_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_COMPLEMENTATION_OBJECT_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_COMPLEMENTATION_OBJECT_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_COMPLEMENTATION_SUBJECT_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_COMPLEMENTATION_SUBJECT_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_COMPLEMENTATION_ADVERBIAL_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_COMPLEMENTATION_ADVERBIAL_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_COMPLEMENTATION_EVIDENCE_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_COMPLEMENTATION_EVIDENCE_INVENTORY; },
    });
    api.cloneClauseComplementationEvidenceRecord = cloneClauseComplementationEvidenceRecord;
    api.getClauseComplementationEvidenceInventory = getClauseComplementationEvidenceInventory;
    api.buildComplementClauseBoundaryMetadata = buildComplementClauseBoundaryMetadata;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION", {
      configurable: true,
      enumerable: true,
      get() { return CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_CONTRACT_VERSION; }
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_GCD", {
      configurable: true,
      enumerable: true,
      get() { return CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_GCD; }
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_AXES", {
      configurable: true,
      enumerable: true,
      get() { return CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_AXES; }
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_RELATIONAL_PAIRS", {
      configurable: true,
      enumerable: true,
      get() { return CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_RELATIONAL_PAIRS; }
    });
    api.buildClassicalNahuatlClauseCompositionSourceFrame = buildClassicalNahuatlClauseCompositionSourceFrame;
    api.isClassicalNahuatlClauseCompositionSourceFrame = isClassicalNahuatlClauseCompositionSourceFrame;
    api.buildClassicalNahuatlClauseComplementationOperationRequest = buildClassicalNahuatlClauseComplementationOperationRequest;
    api.isClassicalNahuatlClauseComplementationOperationRequest = isClassicalNahuatlClauseComplementationOperationRequest;
    api.evaluateClassicalNahuatlClauseComplementation = evaluateClassicalNahuatlClauseComplementation;
    api.isClassicalNahuatlClauseComplementationResultFrame = isClassicalNahuatlClauseComplementationResultFrame;
    api.evaluateClassicalNahuatlClauseComplementationParadigm = evaluateClassicalNahuatlClauseComplementationParadigm;
    return api;
}

export function installComplementClauseGlobals(targetObject = globalThis, installationContext = null) {
    const api = createComplementClauseGlobals(targetObject, installationContext);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
