// Source-analysis choices consume canonical owners; they do not authorize execution.
    export function resolveVncSourceClassChoice(targetObject, stem = "", options = {}, context = {}) {
      const allClassIds = ["A", "B", "C", "D"];
      const analytical=!options.sourceEmbedStem && !options.sourceMatrixStem
        ? targetObject.resolveClassicalNahuatlAnalyticalVncSourceFrame?.({enteredStem:stem,valence:options.valence || "intransitive"}) : null;
      if(targetObject.isClassicalNahuatlAnalyticalVncSourceFrame?.(analytical)===true) return {
        kind:"classical-nahuatl-canvas-class-selection",determinate:Boolean(analytical.sourceClass),selectedClassId:analytical.sourceClass,
        allowedClassIds:analytical.sourceClass?[analytical.sourceClass]:[],dropdownLocked:true,
        canvasRuleId:"owner-issued-restricted-analytical-source",classBasis:"source-analysis-only-no-base-finite"};
      const imperfective=!options.sourceEmbedStem && !options.sourceMatrixStem
        ? targetObject.resolveClassicalNahuatlImperfectiveVncSourceFrame?.({enteredStem:stem,valence:options.valence || "intransitive"}) : null;
      if(targetObject.isClassicalNahuatlImperfectiveVncSourceFrame?.(imperfective)===true) return {
        kind:"classical-nahuatl-canvas-class-selection",determinate:false,selectedClassId:"",allowedClassIds:[],dropdownLocked:true,
        canvasRuleId:"owner-issued-imperfective-class-unresolved",classBasis:"known-imperfective-perfective-class-unresolved"};
      const containing = !options.sourceEmbedStem && !options.sourceMatrixStem
        ? targetObject.resolveClassicalNahuatlRestrictedContainingVncSourceFrame?.({enteredStem:stem,valence:options.valence || "intransitive",sourceLexemeId:options.sourceLexemeId || context.sourceLexemeId || ""}) : null;
      const corrected = !options.sourceEmbedStem && !options.sourceMatrixStem
        ? targetObject.resolveClassicalNahuatlNominalRankCorrectedSourceFrame?.({enteredStem:stem,valence:options.valence || "intransitive"}) : null;
      if (containing || corrected) return {kind:"classical-nahuatl-canvas-class-selection",determinate:Boolean(containing?.sourceClass),
        selectedClassId:containing?.sourceClass || "",allowedClassIds:containing?.sourceClass?[containing.sourceClass]:[],dropdownLocked:true,
        canvasRuleId:"owner-issued-containing-source-rank",classBasis:"source-rank-and-use-only-no-source-finite"};
      const requestedClassId = String(options.requestedClassId || "").trim().toUpperCase();
      const retained = context.retainedSource || null;
      const projection = targetObject.isClassicalNahuatlClosureFrame?.(retained) === true
        && retained.authorizationStatus === "authorized"
        ? targetObject.getClassicalNahuatlVncContinuationSourceConstituents?.(retained)
        : null;
      if (projection && typeof context.normalizeStem === "function"
        && context.normalizeStem?.(stem)
          === context.normalizeStem?.(projection.sourceStem)
        && requestedClassId === projection.verbClass
        && options.valence === projection.sourceValence) {
        return {
          kind: "classical-nahuatl-canvas-class-selection",
          determinate: true,
          selectedClassId: projection.verbClass,
          allowedClassIds: [projection.verbClass],
          canvasRuleId: "owner-issued-retained-vnc-coordinate",
          dropdownLocked: true,
          classBasis: "owner-issued-derived-coordinate"
        };
      }
      const compoundSelection = targetObject.buildClassicalNahuatlFuenteSourceSelectionFrame?.(stem, {
        sourceEmbedStem: options.sourceEmbedStem || "",
        sourceMatrixStem: options.sourceMatrixStem || ""
      });
      const compoundMatrixClass = compoundSelection?.authorizationStatus === "authorized"
        && compoundSelection.selectedSourceKind === "embed-matrix"
        && compoundSelection.typedSourceSelectsEmbedMatrix === true
        && compoundSelection.typedPartsMatchStem === true
        ? targetObject.buildClassicalNahuatlVerbstemClassRuleFrame?.(
            compoundSelection.selectedMatrixStem, { verbClass: "D", valence: options.valence || "" })
        : null;
      if (compoundMatrixClass?.authorizationStatus === "authorized") {
        return {
          kind: "classical-nahuatl-canvas-class-selection",
          determinate: true, selectedClassId: compoundMatrixClass.classId,
          allowedClassIds: [compoundMatrixClass.classId],
          canvasRuleId: "owner-issued-compound-matrix-class",
          dropdownLocked: true, classBasis: "typed-compound-matrix",
          compoundMatrixClassFrame: compoundMatrixClass
        };
      }
      const lexicalParadigm = targetObject.buildClassicalNahuatlIrregularVncParadigmPlan?.(stem);
      const fixedCell = !options.sourceEmbedStem && !options.sourceMatrixStem
        && lexicalParadigm?.irregularityKind === "defective-reporting-preterit"
        ? lexicalParadigm.fixedSourceCell : null;
      const fixedParadigm = fixedCell
        ? targetObject.buildClassicalNahuatlIrregularVncParadigmPlan?.(stem, fixedCell) : null;
      if (fixedParadigm?.authorizationStatus === "authorized"
        && fixedParadigm.irregularityKind === "defective-reporting-preterit"
        && allClassIds.includes(fixedParadigm.selectedClassOverride)) {
        return {
          kind: "classical-nahuatl-canvas-class-selection",
          determinate: true, selectedClassId: fixedParadigm.selectedClassOverride,
          allowedClassIds: [fixedParadigm.selectedClassOverride],
          canvasRuleId: "owner-issued-fixed-vnc-source-cell",
          dropdownLocked: true, classBasis: "owner-issued-fixed-source-cell",
          fixedSourceCell: fixedParadigm.fixedSourceCell,
          lexemeId: fixedParadigm.lexemeId,
        };
      }
      if (lexicalParadigm?.authorizationStatus === "authorized"
        && lexicalParadigm.irregularityKind === "suppletive"
        && allClassIds.includes(lexicalParadigm.selectedClassOverride)) {
        return {
          kind: "classical-nahuatl-canvas-class-selection",
          determinate: true, selectedClassId: lexicalParadigm.selectedClassOverride,
          allowedClassIds: [lexicalParadigm.selectedClassOverride],
          canvasRuleId: "owner-issued-lexical-paradigm-class",
          dropdownLocked: true, classBasis: "owner-issued-lexical-paradigm",
          lexemeId: lexicalParadigm.lexemeId
        };
      }
      if (!stem || typeof targetObject.inferClassicalNahuatlLesson7ClassProfile !== "function") {
        return {
          kind: "classical-nahuatl-canvas-class-selection",
          determinate: false,
          selectedClassId: allClassIds.includes(requestedClassId) ? requestedClassId : "",
          allowedClassIds: allClassIds,
          canvasRuleId: "cn-l7-76-guidelines-not-majority-prediction",
          dropdownLocked: false
        };
      }
      const profile = targetObject.inferClassicalNahuatlLesson7ClassProfile(stem, {
        valence: options.valence || "",
        transitivity: options.valence || "",
        signifiesChange: options.signifiesChange === true
      });
      const hasDeterminingRule = Boolean(profile?.guidelineId && profile.guidelineId !== "cn-l7-76-guidelines-not-majority-prediction");
      const ruleClassIds = Array.from(new Set((profile?.classGuidelineAllowedClassIds?.length ? profile.classGuidelineAllowedClassIds : profile?.classOptions || []).map(value => String(value || "").trim().toUpperCase()).filter(value => allClassIds.includes(value))));
      const claimClassIds = Array.from(new Set((profile?.classClaimAllowedClassIds || []).map(value => String(value || "").trim().toUpperCase()).filter(value => allClassIds.includes(value))));
      const allowedClassIds = hasDeterminingRule && ruleClassIds.length ? ruleClassIds : claimClassIds.length ? claimClassIds : allClassIds;
      const selectedClassId = allowedClassIds.includes(requestedClassId)
        ? requestedClassId
        : hasDeterminingRule && allowedClassIds.includes(profile.classId)
          ? profile.classId
          : "";
      return {
        kind: "classical-nahuatl-canvas-class-selection",
        determinate: hasDeterminingRule,
        selectedClassId,
        allowedClassIds,
        canvasRuleId: profile?.guidelineId || "cn-l7-76-guidelines-not-majority-prediction",
        dropdownLocked: hasDeterminingRule && allowedClassIds.length === 1,
        inferredSubclass: profile?.subclass || "",
        classBasis: profile?.classBasis || "perfective-stem-shape",
        claimEligibilityRuleIds: profile?.classClaimEligibilityRuleIds || [],
        claimEligibilityReason: profile?.classClaimEligibilityReason || ""
      };
    }
    export function resolveNncSourceClassValues(
      targetObject, stem = "",
      options = {}
    ) {
      const normalizedStem = String(stem || "").trim();
      const inventory = typeof targetObject
        .getClassicalNahuatlOpenNncSourceClassInventory === "function"
        ? targetObject.getClassicalNahuatlOpenNncSourceClassInventory()
        : [];
      if (!Array.isArray(inventory)) return Object.freeze([]);
      const sourceFrame = options.sourceFrame || null;
      if (
        sourceFrame?.authorizationStatus === "authorized"
        && sourceFrame?.kind === "classical-nahuatl-ordinary-nnc-source-frame"
        && sourceFrame?.openStemSource !== true
        && sourceFrame?.sourceClass
      ) {
        if (typeof targetObject.buildClassicalNahuatlOrdinaryNncSourceFrame === "function"
          && typeof targetObject.isClassicalNahuatlOrdinaryNncSourceFrame === "function") {
          const admittedClasses = inventory.map(entry => entry.sourceClass).filter(sourceClass => {
            const candidate = targetObject.buildClassicalNahuatlOrdinaryNncSourceFrame({
              stem: normalizedStem || sourceFrame.stem,
              sourceClass,
              supportiveInitialI: sourceFrame.supportiveInitialI === true,
            });
            return targetObject.isClassicalNahuatlOrdinaryNncSourceFrame(candidate)
              && candidate.authorizationStatus === "authorized"
              && candidate.sourceClass === sourceClass;
          });
          if (admittedClasses.length) return Object.freeze([...new Set(admittedClasses)]);
        }
        return Object.freeze([
          sourceFrame.sourceClass === "tl-2-a-to-1-a"
            ? "tl-2-a"
            : sourceFrame.sourceClass
        ]);
      }
      if (!normalizedStem) {
        return Object.freeze(inventory.map(entry => entry.sourceClass));
      }
      const guidance = typeof targetObject
        .getClassicalNahuatlClassFormGuidance === "function"
        ? targetObject.getClassicalNahuatlClassFormGuidance(normalizedStem)
        : null;
      const candidateClasses = Array.isArray(guidance?.candidateClasses)
        ? guidance.candidateClasses
        : [];
      if (!candidateClasses.length) return Object.freeze([]);
      const compatibleValues = inventory.filter(entry => {
        if (entry.boundaryFacts?.borrowedOrthographyRetained === true) return true;
        if (!candidateClasses.includes(entry.nounClass)) return false;
        if (entry.useShape !== "truncated") return true;
        if (
          entry.subclass === "tl-2-b"
          && entry.ephemeralFinalVowel
          && entry.ephemeralFinalVowel !== guidance.finalSound
        ) {
          return false;
        }
        if (typeof targetObject
          .validateClassicalNahuatlSubclassSourceShape !== "function") {
          return false;
        }
        const shapeFrame = targetObject
          .validateClassicalNahuatlSubclassSourceShape(normalizedStem, {
            nounClass: entry.nounClass,
            generalUseShape: entry.useShape,
            tlSubclass: String(entry.subclass || "")
              .replace(/^tl-2-/u, "2")
              .toUpperCase(),
            ephemeralFinalVowel: entry.ephemeralFinalVowel || "",
            truncationRepair: entry.truncationRepair || "none",
            compoundStem: options.compoundStem === true
          });
        return shapeFrame?.authorizationStatus === "authorized";
      }).map(entry => entry.sourceClass);
      return Object.freeze(compatibleValues);
    }

export function resolveIrregularSourceAlternatives(lesson11Plan) {
      return lesson11Plan?.authorizationStatus === "authorized"
        ? [
          ...(lesson11Plan.defaultStemOverride ? [{ stemOverride: lesson11Plan.defaultStemOverride, label: "preferred form" }] : []),
          ...(lesson11Plan.selectedAlternativeStem ? [{ stemOverride: lesson11Plan.selectedAlternativeStem, label: lesson11Plan.usageStatus === "dialectal-not-good-usage" ? "selected dialectal form · Andrews calls this not good usage" : "selected alternative" }] : []),
          ...(lesson11Plan.authorizedAlternatives || []).map(alternative => ({
            stemOverride: alternative.stemOverride || "",
            label: alternative.preference === "default" ? "preferred form" : alternative.usage === "dialectal-not-good-usage" ? "dialectal form · Andrews calls this not good usage" : "authorized alternative"
          }))
        ].filter((record, index, list) => record.stemOverride && list.findIndex(candidate => candidate.stemOverride === record.stemOverride) === index)
        : [];
}

// Owner defaults are displayed as such; an incompatible explicit request is
// retained for correction, never replaced by the first available interpretation.
export function resolvePersonalNameSourceChoice(owner, {exactSource = false, resolution = null, requestedFamily = ''} = {}) {
  const requestedValue=String(requestedFamily || '').trim();
  const authentic=exactSource && owner.isPersonalNameNncExactSourceResolution?.(resolution) === true;
  const rawStructure=!exactSource && requestedValue ? owner.getPersonalNameNncSourceFamilyStructure?.(requestedValue):null;
  const values=exactSource ? authentic ? [...resolution.compatibleSourceFamilyIds] : []
    : [...new Set([...(owner.getPersonalNameNncLcm?.()?.sourceFamilies || []).map(spec=>spec.id),...(rawStructure?[requestedValue]:[])])];
  const ownerDefault=authentic && values.includes(resolution.selectedSourceFamily) ? resolution.selectedSourceFamily:'';
  const selectedValue=requestedValue || ownerDefault;
  const resolved=values.includes(selectedValue);
  return Object.freeze({values:Object.freeze(values),requestedValue,selectedValue,resolved,exactSource,
    selectionBasis:requestedValue?'explicit-request':ownerDefault?'canonical-default':'unresolved',
    structure:resolved?owner.getPersonalNameNncSourceFamilyStructure?.(selectedValue) || null:null,
    sourceReference:'Andrews §56.2',executionAuthority:false});
}

    export function resolveCoarseNominalSourceFacts(targetObject, stem = "", sourceClass = "") {
      if (!stem || !["tl", "tli"].includes(sourceClass)) return null;
      try {
        const result = targetObject.evaluateClassicalNahuatlNominalConstruction?.({
          constructionKind: "affective-nnc", affectiveMatrix: "pōl",
          source: {embedStem: stem, embedClass: sourceClass, embedSourceClass: sourceClass},
          subject: "3common", state: "absolutive", animacy: "nonanimate",
        });
        const authorization = result?.sourceAuthorizationFrame;
        const facts = authorization?.lexicalFacts?.embedSourceClassFrame;
        return targetObject.isClassicalNahuatlNominalConstructionResult?.(result) === true
          && result.authorizationStatus === "authorized"
          && targetObject.isClassicalNahuatlNominalConstructionSourceAuthorization?.(authorization) === true
          && authorization.authorizationStatus === "authorized"
          && facts?.nounClass === sourceClass && facts.subclass === "" ? facts : null;
      } catch { return null; }
    }

export function resolveNncSourceChoiceDomain(targetObject, stem = "", options = {}, context = {}) {
 const generalUse=context.generalUse === true;
      const ordinaryValues = generalUse ? [] : resolveNncSourceClassValues(
        targetObject, stem,
        options
      );
      const scopedCompoundSource = options.sourceFrame?.familyId === "nominal-compound-source"
        && targetObject.isIssuedCanonicalNncSourceFrame?.(options.sourceFrame) === true;
      const fixedOrdinarySource = options.sourceFrame?.authorizationStatus === "authorized"
        && options.sourceFrame?.openStemSource !== true && !scopedCompoundSource;
      const rawOwnerhood = !fixedOrdinarySource
        && context.construction === "deverbal-nnc"
        && context.deverbalFamily === "ownerhood"
        && !context.exactDeverbalBinding;
      const coarseClasses = generalUse ? ["tl", "tli"]
        .filter(value => (!options.sourceFrame?.nounClass || options.sourceFrame.nounClass === value)
          && Boolean(resolveCoarseNominalSourceFacts(targetObject, stem, value)))
        .map(value => ({value, label: `${value} · subtype unspecified`})) : rawOwnerhood ? [
        {value: "tl", nounClass: "tl", subclass: "", label: "tl"},
        {value: "tli", nounClass: "tli", subclass: "", label: "tli"},
        {value: "tl-1", nounClass: "tl", subclass: "1", label: "tl 1"},
      ].filter(record => targetObject.getClassicalNahuatlOwnerhoodSourceAnalysis?.({
        sourceStem: stem, nounClass: record.nounClass, nounSubclass: record.subclass,
      })?.authorizationStatus === "authorized") : !fixedOrdinarySource
        && !context.exactNominalBinding
          ? ["tl", "tli"].filter(value => Boolean(resolveCoarseNominalSourceFacts(targetObject, stem, value)))
            .map(value => ({value, nounClass: value, subclass: "", label: `${value} · subtype unspecified`})) : [];
 return Object.freeze({coarseClasses:Object.freeze(coarseClasses),
 values:Object.freeze([...new Set([...ordinaryValues,...coarseClasses.map(record=>record.value)])]),executionAuthority:false});
}

// Keep the requested ti alternative in the existing draft control. Only the
// currently authorized owner cell decides whether that request contributes.
export function resolveIrregularSourceRequest(owner, stem, cell, requestedValue = '') {
  const plan=owner.buildClassicalNahuatlIrregularVncParadigmPlan?.(stem,cell);
  return plan?.authorizationStatus === 'authorized'
    && plan.irregularityKind === 'conditioned-ti-perfective'
    && resolveIrregularSourceAlternatives(plan).length < 2 ? '' : requestedValue;
}
