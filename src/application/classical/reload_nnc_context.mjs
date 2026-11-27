// Reload stores owner inputs and graph references. Written answers and discourse
// projections are re-created by their original owners, never accepted as inputs.
export const NNC_RELOAD_SOURCE_KEYS = [
  "sourceUse",
  "stem",
  "sourceClass",
  "embedStem",
  "matrixStem",
  "supportiveInitialI",
];
export function reissueNncReloadSource(r,source) {
  // Earlier recipes omitted sourceUse. An issued class-free noun source
  // has an explicitly empty class and belongs to the general-use route.
  const legacyGeneralUse = source.sourceUse === undefined && source.sourceClass === ""
    && !source.embedStem && !source.matrixStem && source.supportiveInitialI === false;
  return r.issueCanonicalNncSourceFrame(legacyGeneralUse ? {...source,sourceUse:"general-use"} : source);
}
const DIRECT_NNC_CHOICES = [
  "subject", "animacy", "humanness", "stateAvailability", "naturalPossessionPolicy",
  "metaphoricalOverride", "policySelectionAuthority", "numberDyad",
  "nounClass", "class", "pluralConnector", "naturalPossessionSemantics", "possessorCompatibility",
  "possessor", "nounstemRelationKind", "analogicalTlaDerivedStem", "thirdPluralPossessorNumberMorph",
  "singularConnector", "silentConnectorAuthorized",
];
const LEXICAL_SELECTION_LISTS = ["classMembershipOptions","pluralStemFormationOptions","pluralConnectorOptions"];
const LEXICAL_SELECTION_CHOICES = [
  ...LEXICAL_SELECTION_LISTS,"selectionAuthority","classSelectionAuthority","nounClass","class","stemFormation",
  "pluralConnector","sourcePlainPluralConnector","supportiveInitialI","selectedInitialVariant",
  "pluralStemFormationRequirement","preferredPluralStemFormation","preferredPluralConnector",
  "affinityConnectorExceptionAuthorized","possessivePluralDerivedSemanticNeed","tliSubclass2SilentNum1Authorized",
  "glottalizedGeneralUseEligible",
];
const validLexicalSelectionChoices = choices => exact(choices,LEXICAL_SELECTION_CHOICES)
  && Object.entries(choices).every(([key,value]) => LEXICAL_SELECTION_LISTS.includes(key)
    ? Array.isArray(value) && value.length<=32 && value.every(item=>typeof item==="string" && item.length<=256)
    : typeof value==="boolean" || Number.isFinite(value) || typeof value==="string" && value.length<=4096);
const CLASS_GOVERNED_CHOICES = [...DIRECT_NNC_CHOICES,
  "state","classSelectionAuthority","compoundSourceConstituents","derivedStem","ephemeralFinalVowel",
  "generalUseShape","generalUseStem","matrixMorpheme","sourceStructure","stemFormation","tlSubclass",
  "tliSubclass","truncationRepair","useShape","pluralSelectionAuthority","constituentAmbiguityKind",
  "constituentAlternativeStem","selectedConstituentAnalysisId","constituentAnalysisSelectionAuthority","constituentAnalyses",
];
const HIGHER_NNC_CHOICES = ["stateAvailability","naturalPossessionPolicy","metaphoricalOverride","policySelectionAuthority"];
const NNC_SOURCE_AUTHORITY_CHOICES = [
  "selectedState", "state", "stateAvailability", "naturalPossessionPolicy", "statePolicy",
  "naturalPossessionSemantics", "metaphoricalOverride", "policySelectionAuthority",
  "possessorCompatibility", "nonspecificHumanPossessorCarrier",
];
const LESSON15 = new Map([
  ["nnc:stem-operation", {
    build:"buildClassicalNahuatlStemOperationRecord",
    keys:["operation","operationId","selectionAuthority","predicateOptionId","optionId","selectedState","state",
      "subject","possessor","nounClass","useShape","subclass","stemFormation","stemRelation","secondaryPossessorCarrier",
      "targetStem","suppletiveConnector"],
  }],
  ["nnc:possessor-reduplication", {
    build:"buildClassicalNahuatlPossessorReduplicationSelection",keys:["selected","selectionAuthority"],
  }],
]);
const LESSON15_AUTHORITY_OPERANDS = [
  ["stemOperation","lesson15StemOperationRecord","nnc:stem-operation"],
  ["reduplication","lesson15PossessorReduplicationSelection","nnc:possessor-reduplication"],
];
const DIRECT_NNC_NUMBER_CHOICES = "thirdPluralPossessorSt2Options";
const PRONOMINAL_SOURCE = ["stem", "embedStem", "matrixStem"];
const PRONOMINAL_CHOICES = [
  "stemFormation",
  "compoundMatrix",
  "subject",
  "humanness",
  "clausePosition",
  "adjunctorInMode",
  "numberForm",
  "predicatePluralization",
  "doubledFirstPlural",
  "specialHumanUse",
  "sentenceType",
  "polarity",
];
const SENTENCE_CHOICES = [
  "sentenceType",
  "polarity",
  "negativePrefix",
  "predicateKind",
];
const SENTENCE_OPTIONS = [
  ...SENTENCE_CHOICES,
  "canonicalNuclearWrittenResult",
  "discourseFrame",
  "borrowedNncSourceFrame",
];
const RELATIONAL_NOUN = [
  "stemId",
  "formation",
  "operation",
  "sourceKind",
  "sourceFormation",
  "sourceVoice",
  "sourceMode",
  "sourceStem",
  "sourceEmbedStem",
  "sourceMatrixStem",
  "downstreamTargetStem",
  "affective",
  "sourceLexemeId",
  "lexicalExceptionId",
  "relationalFunction",
  "sourceEndsInCoOrC",
  "pertinencySourceKind",
  "nounConnector",
];
const RELATIONAL_CLAUSE = [
  "state",
  "possessorId",
  "subjectMode",
  "subjectId",
  "sentencePosition",
  "adjunctorIn",
  "dependentClausePresent",
  "negative",
  "numberConnector",
];
const PART_KEYS = ["role", "value", "supportiveI", "joinAfter"];
const PART_REFS = [
  "particleResultFrame",
  "borrowedNncSourceFrame",
  "borrowedNncResultFrame",
  "completedWrittenResultFrame",
];
const exact = (value, keys) =>
  Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).every((k) => keys.includes(k)),
  );
const scalar = (value, keys) =>
  exact(value, keys) &&
  Object.values(value).every((v) =>
    ["string", "boolean", "number"].includes(typeof v),
  );
const pick = (value, keys) =>
  Object.fromEntries(
    keys
      .filter((k) =>
        ["string", "boolean", "number"].includes(typeof value?.[k]),
      )
      .map((k) => [k, value[k]]),
  );
const isReloadableNncSlot = (r, slot) => Boolean(r.getClassicalNahuatlDirectNncSlotReloadInputs?.(slot)
  || ["nnc:class-governed-slot","nnc:higher-slot"].includes(r.getClassicalNahuatlClassGovernedReloadInputs?.(slot)?.type));
const capturedParent = (r, slot) => {
  const capture = r.captureClassicalGrammarApplicationResult?.(
    slot,
    "reload-nnc-nucleus",
  );
  const parent = r.isClassicalGrammarApplicationResultCapture?.(
    capture,
    "reload-nnc-nucleus",
  ) === true
    ? capture.applicationResult.canonicalResult
    : null;
  if (parent && slotOf(r,parent) === slot) return parent;
  return isReloadableNncSlot(r,slot) ? slot : null;
};
const slotOf = (r, parent) =>
  isReloadableNncSlot(r,parent) ? parent :
  r.isClassicalNahuatlOrdinaryNncResult?.(parent) ||
  r.isClassicalNahuatlPronominalNncResult?.(parent) ||
  r.isClassicalNahuatlRelationalResult?.(parent)
    ? parent.typedSlotFrame
    : r.isClassicalNahuatlNominalConstructionResult?.(parent)
      ? parent.canonicalResult?.nncSlotFrame
      : null;
function require(condition, message) {
  if (!condition) throw new Error(message);
}
export function isNncReloadEvidence(r, value) {
  return (
    Boolean(r.getClassicalNahuatlDirectNncSlotReloadInputs?.(value)) ||
    Boolean(r.getClassicalNahuatlClassGovernedReloadInputs?.(value)) ||
    Boolean(r.getClassicalNahuatlNncSourceAuthorityReloadInputs?.(value)) ||
    Boolean(r.getClassicalNahuatlLesson15ReloadInputs?.(value)) ||
    r.isClassicalNahuatlLesson2WrittenResult?.(value) === true ||
    r.isClassicalNahuatlOrdinaryNncSourceFrame?.(value) === true ||
    r.isClassicalNahuatlContextualFlawedSubjectSourceFrame?.(value) === true ||
    r.isClassicalNahuatlSelectedImperfectPredicateSourceFrame?.(value) === true
  );
}
export function exportNncContextReloadNode(r, value, visit) {
  const lesson15 = r.getClassicalNahuatlLesson15ReloadInputs?.(value);
  if (lesson15) {
    require(scalar(lesson15.options,LESSON15.get(lesson15.type).keys), "supported Lesson 15 inputs required");
    return {type:lesson15.type,stem:lesson15.stem,choices:lesson15.options};
  }
  const authority = r.getClassicalNahuatlNncSourceAuthorityReloadInputs?.(value);
  if (authority) {
    require(validDirectNncChoices(authority.options,NNC_SOURCE_AUTHORITY_CHOICES), "supported source authority inputs required");
    return {type:"nnc:source-authority",stem:authority.stem,choices:authority.options,
      ...Object.fromEntries(LESSON15_AUTHORITY_OPERANDS.filter(([role])=>authority[role])
        .map(([role])=>[role,visit(authority[role])]))};
  }
  const classGoverned = r.getClassicalNahuatlClassGovernedReloadInputs?.(value);
  if (classGoverned) {
    const {type,stem,parent,options} = classGoverned;
    if (type==="nnc:lexical-selection-record") {
      require(validLexicalSelectionChoices(options), "supported lexical selection inputs required");
      return {type,stem,choices:options};
    }
    if (type==="nnc:class-governed-slot") return {type,parent:visit(parent)};
    const {borrowedNncSourceFrame,nncSourceAuthorityFrame,lesson14LexicalSelectionRecord,...choices} = options;
    require(validDirectNncChoices(choices,parent ? HIGHER_NNC_CHOICES : CLASS_GOVERNED_CHOICES),
      "supported class-governed noun choices required");
    return {type,choices,
      ...(parent ? {parent:visit(parent)} : {stem}),
      ...(lesson14LexicalSelectionRecord ? {lexical:visit(lesson14LexicalSelectionRecord)} : {}),
      ...(borrowedNncSourceFrame ? {borrowed:visit(borrowedNncSourceFrame)} : {}),
      ...(nncSourceAuthorityFrame ? {authority:visit(nncSourceAuthorityFrame)} : {})};
  }
  const direct = r.getClassicalNahuatlDirectNncSlotReloadInputs?.(value);
  if (direct) {
    const {borrowedNncSourceFrame,nncSourceAuthorityFrame, ...choices} = direct.options;
    require(validDirectNncChoices(choices), "supported direct nucleus inputs required");
    return { type:"nnc:direct-nucleus",state:direct.state,stem:direct.stem,choices,
      ...(borrowedNncSourceFrame ? {borrowed:visit(borrowedNncSourceFrame)} : {}),
      ...(nncSourceAuthorityFrame ? {authority:visit(nncSourceAuthorityFrame)} : {}) };
  }
  if (r.isClassicalNahuatlLesson2WrittenResult?.(value) === true) {
    return {
      type: "nnc:writing",
      parts: value.source.parts.map((part) => ({
        ...pick(part, PART_KEYS),
        ...Object.fromEntries(
          PART_REFS.filter((k) => part[k]).map((k) => [k, visit(part[k])]),
        ),
      })),
      boundaryKind: value.source.boundaryKind,
      terminal: value.source.terminal,
    };
  }
  if (r.isClassicalNahuatlOrdinaryNncSourceFrame?.(value) === true) {
    const constituents = value.sourceConstituents ?? [];
    const exactCompound = value.compoundSource && value.embedStem && value.matrixStem
      && constituents.length === 2
      && constituents[0] === value.embedStem && constituents[1] === value.matrixStem;
    require((exactCompound || !value.compoundSource && constituents.length === 0) &&
      !r.getClassicalNahuatlLexicalizedPresentNncSourceParent?.(
        value,
      ), "unsupported contextual source parent");
    return { type: "nnc:source", source: pick(value, NNC_RELOAD_SOURCE_KEYS) };
  }
  if (r.isClassicalNahuatlContextualFlawedSubjectSourceFrame?.(value) === true)
    return {
      type: "nnc:contextual-flawed-source",
      source: visit(value.canonicalNncSourceFrame),
      negative: visit(value.negativeParticleSelectionFrame),
    };
  if (
    r.isClassicalNahuatlSelectedImperfectPredicateSourceFrame?.(value) === true
  )
    return {
      type: "nnc:selected-imperfect-source",
      input: {
        ...pick(value, [
          "sourceKind",
          "sourceFormation",
          "sourceVoice",
          "predicateStem",
          "tenseCarrier",
          "initialI",
        ]),
        incorporatedEmbed: pick(value.incorporatedEmbed, ["kind", "stem"]),
      },
      ...(value.documentedSourceAnalysis
        ? { documentedEntry: value.documentedSourceAnalysis.enteredStems[0] }
        : {}),
    };
  if (r.isClassicalNahuatlPronominalNncResult?.(value) === true)
    return {
      type: "nnc:pronominal",
      source: pick(value.sourceFrame, PRONOMINAL_SOURCE),
      choices: {
        ...pick(value.operationFrame, PRONOMINAL_CHOICES),
        humanness: value.operationFrame.referentialHumanness,
      },
    };
  if (r.isClassicalNahuatlRelationalResult?.(value) === true) {
    const source = value.sourceFrame,
      predicate = source.predicateStemFrame;
    const nounstem = {
      ...pick(predicate, RELATIONAL_NOUN),
      ...pick(source, [
        "sourceLexemeId",
        "lexicalExceptionId",
        "relationalFunction",
        "sourceEndsInCoOrC",
        "pertinencySourceKind",
        "nounConnector",
      ]),
    };
    // Flat relational spelling is derived from its source constituents.
    // Other nominal operations retain an independently entered source stem.
    if (source.constructionKind === "relational-nnc") delete nounstem.sourceStem;
    const sourceTree = (node) =>
      node.embed && node.matrix
        ? { embed: sourceTree(node.embed), matrix: sourceTree(node.matrix) }
        : { stem: node.stem };
    return {
      type: "nnc:relational",
      nounstem,
      ...(r.isClassicalNahuatlRelationalNncTypedSourceFrame?.(value.navigatorSourceFrame)
        && value.navigatorSourceFrame.sourceFrame === source ? { typedSource: true } : {}),
      clause: {
        ...pick(source, RELATIONAL_CLAUSE),
        subjectId: source.requestedSubjectId,
      },
      ...(source.sourceCompositionFrame
        ? { composition: sourceTree(source.sourceCompositionFrame.root) }
        : {}),
      ...(source.selectedImperfectPredicateSource
        ? { selected: visit(source.selectedImperfectPredicateSource) }
        : source.upstreamSourceCarrier
          ? { upstream: visit(source.upstreamSourceCarrier.ownerResult) }
          : {}),
    };
  }
  if (
    r.isClassicalNahuatlNominalConstructionResult?.(value) === true &&
    value.constructionKind === "affective-nnc"
  ) {
    const context =
      value.sourceAuthorizationFrame?.lexicalFacts
        ?.contextualFlawedSubjectSourceFrame;
    if (!r.isClassicalNahuatlContextualFlawedSubjectSourceFrame?.(context))
      return undefined;
    require(value.canonicalResult?.nncSlotFrame &&
      r.getClassicalNahuatlNominalNncSentenceContext?.(
        value.canonicalResult.nncSlotFrame,
      ) === context, "exact contextual slot required");
    return { type: "nnc:contextual-affective", context: visit(context) };
  }
  if (r.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(value) === true) {
    const context = r.getClassicalNahuatlNncSentenceReloadContext?.(value);
    require(context &&
      exact(
        context.sentenceOptions,
        SENTENCE_OPTIONS,
      ), "supported sentence inputs required");
    const parent = capturedParent(r, context.sourceNncSlotFrame);
    require(parent &&
      slotOf(r, parent) ===
        context.sourceNncSlotFrame, "exact sentence nucleus parent required");
    const discourse = context.sentenceOptions.discourseFrame;
    require(!discourse ||
      discourse ===
        parent.sentenceFrame
          ?.discourseFrame, "canonical parent discourse required");
    return {
      type: "nnc:sentence-context",
      source: visit(parent),
      choices: pick(context.sentenceOptions, SENTENCE_CHOICES),
      ...(discourse ? { discourse: true } : {}),
      ...(context.sentenceOptions.canonicalNuclearWrittenResult
        ? context.sentenceOptions.canonicalNuclearWrittenResult ===
          parent.sentenceFrame?.canonicalNuclearWrittenResult
          ? { parentWriting: true }
          : {
              writing: visit(
                context.sentenceOptions.canonicalNuclearWrittenResult,
              ),
            }
        : {}),
      ...(context.sentenceOptions.borrowedNncSourceFrame
        ? { borrowed: visit(context.sentenceOptions.borrowedNncSourceFrame) }
        : {}),
    };
  }
  return undefined;
}
function validConstituentAnalyses(value) {
  const text = field => typeof field==="string" && field.length<=4096;
  const fields = ["kind","id","label","ambiguityKind","slots","vowelLengthAuthority","boundarySelectionAuthority",
    "formulaStringAuthority","surfaceStringAuthority"];
  return Array.isArray(value) && value.length<=32 && value.every(entry=>exact(entry,fields)
    && entry.kind==="classical-nahuatl-nounstem-typed-constituent-analysis"
    && entry.vowelLengthAuthority==="explicit-typed-source-spelling"
    && exact(entry.slots,["stem","st","st1","st2","num1","num2"])
    && text(entry.slots.stem) && Object.values(entry.slots).every(text)
    && Object.entries(entry).every(([key,field])=>key==="slots"
      || (key==="formulaStringAuthority" || key==="surfaceStringAuthority" ? field===false : text(field))));
}
function validDirectNncChoices(choices,keys=DIRECT_NNC_CHOICES) {
  if (!exact(choices,[...keys,DIRECT_NNC_NUMBER_CHOICES])) return false;
  return Object.entries(choices).every(([key,value])=>key==="constituentAnalyses"
    ? validConstituentAnalyses(value)
    : key==="compoundSourceConstituents"
    ? Array.isArray(value) && value.length<=32 && value.every(part=>typeof part==="string" && part.length<=256)
    : key===DIRECT_NNC_NUMBER_CHOICES
    ? typeof value==="string" && value.length<=256
      || Array.isArray(value) && value.length<=12 && value.every(item=>typeof item==="string" && item.length<=256)
    : typeof value==="boolean" || Number.isFinite(value) || typeof value==="string" && value.length<=4096);
}
export function replayNncContextReloadNode(r, node, prior) {
  if (typeof node?.type !== "string" || !node.type.startsWith("nnc:"))
    return undefined;
  try {
    const lesson15 = LESSON15.get(node.type);
    if (lesson15) {
      if (!exact(node,["type","stem","choices"]) || typeof node.stem!=="string" || node.stem.length>4096
        || !scalar(node.choices,lesson15.keys)
        || Object.values(node.choices).some(value=>typeof value==="string" && value.length>4096)) return null;
      const frame=r[lesson15.build](node.stem,node.choices);
      return r.getClassicalNahuatlLesson15ReloadInputs?.(frame)?.type===node.type ? frame : null;
    }
    if(node?.type==="nnc:source-authority") {
      if(!exact(node,["type","stem","choices",...LESSON15_AUTHORITY_OPERANDS.map(([role])=>role)]) || typeof node.stem!=="string" || node.stem.length>4096
        || !validDirectNncChoices(node.choices,NNC_SOURCE_AUTHORITY_CHOICES)) return null;
      const choices={...node.choices};
      for(const [role,key,type] of LESSON15_AUTHORITY_OPERANDS) {
        if(node[role]===undefined) continue;
        const operand=prior(node[role]);
        const inputs=r.getClassicalNahuatlLesson15ReloadInputs?.(operand);
        if(inputs?.type!==type || inputs.stem!==node.stem) return null;
        choices[key]=operand;
      }
      const authority=r.buildClassicalNahuatlNncSourceAuthorityFrame(node.stem,choices);
      return r.getClassicalNahuatlNncSourceAuthorityReloadInputs?.(authority) ? authority : null;
    }
    if (node.type==="nnc:lexical-selection-record") {
      if(!exact(node,["type","stem","choices"]) || typeof node.stem!=="string" || node.stem.length>4096
        || !validLexicalSelectionChoices(node.choices)) return null;
      const record=r.buildClassicalNahuatlLexicalSelectionRecord(node.stem,node.choices);
      return r.getClassicalNahuatlClassGovernedReloadInputs?.(record)?.type===node.type ? record : null;
    }
    if (node.type==="nnc:class-governed-slot") {
      if(!exact(node,["type","parent"])) return null;
      const parent=prior(node.parent);
      return r.getClassicalNahuatlClassGovernedReloadInputs?.(parent)?.type==="nnc:class-governed"
        ? parent.nncSlotFrame : null;
    }
    if (["nnc:class-governed","nnc:higher-slot"].includes(node.type)) {
      const higher=node.type==="nnc:higher-slot";
      if(!exact(node,["type","choices","authority",...(higher?["parent"]:["stem","borrowed","lexical"])])
        || !validDirectNncChoices(node.choices,higher ? HIGHER_NNC_CHOICES : CLASS_GOVERNED_CHOICES)) return null;
      const parent=higher ? prior(node.parent) : null;
      const parentInputs=r.getClassicalNahuatlClassGovernedReloadInputs?.(parent);
      const stem=higher ? parentInputs?.stem : node.stem;
      if ((higher && parentInputs?.type!=="nnc:class-governed") || typeof stem!=="string" || stem.length>4096) return null;
      const choices={...node.choices};
      if(node.authority!==undefined) {
        const authority=prior(node.authority);
        if(!r.getClassicalNahuatlNncSourceAuthorityReloadInputs?.(authority) || authority.sourceStem!==stem) return null;
        choices.nncSourceAuthorityFrame=authority;
      }
      if(node.borrowed!==undefined) {
        choices.borrowedNncSourceFrame=prior(node.borrowed);
        if(!r.isClassicalNahuatlOrdinaryNncSourceFrame?.(choices.borrowedNncSourceFrame)) return null;
      }
      if(node.lexical!==undefined) {
        const lexical=prior(node.lexical);
        const inputs=r.getClassicalNahuatlClassGovernedReloadInputs?.(lexical);
        if(inputs?.type!=="nnc:lexical-selection-record" || inputs.stem!==stem) return null;
        choices.lesson14LexicalSelectionRecord=lexical;
      }
      const frame=higher ? r.buildClassicalNahuatlHigherNncFrame(parent,choices)
        : r.buildClassicalNahuatlClassGovernedNncFrame(stem,choices);
      const result=higher ? frame.nncSlotFrame : frame;
      return r.getClassicalNahuatlClassGovernedReloadInputs?.(result)?.type===node.type ? result : null;
    }
    if(node?.type==="nnc:direct-nucleus") {
      if (!exact(node,["type","state","stem","choices","borrowed","authority"])
        || !["absolutive","possessive"].includes(node.state) || typeof node.stem!=="string"
        || node.stem.length>4096 || !validDirectNncChoices(node.choices)) return null;
      const choices={...node.choices};
      if(node.borrowed!==undefined) {
        choices.borrowedNncSourceFrame=prior(node.borrowed);
        if(!r.isClassicalNahuatlOrdinaryNncSourceFrame?.(choices.borrowedNncSourceFrame)) return null;
      }
      if(node.authority!==undefined) {
        const authority=prior(node.authority);
        if(!r.getClassicalNahuatlNncSourceAuthorityReloadInputs?.(authority)
          || authority.sourceStem!==node.stem || authority.selectedState!==node.state) return null;
        choices.nncSourceAuthorityFrame=authority;
      }
      const frame=node.state==="absolutive"
        ? r.buildClassicalNahuatlAbsolutiveNncFrame(node.stem,choices)
        : r.buildClassicalNahuatlPossessiveNncFrame(node.stem,choices);
      return r.getClassicalNahuatlDirectNncSlotReloadInputs?.(frame.nncSlotFrame) ? frame.nncSlotFrame : null;
    }

    if (node.type === "nnc:writing") {
      if (
        !exact(node, ["type", "parts", "boundaryKind", "terminal"]) ||
        !Array.isArray(node.parts) ||
        !node.parts.length ||
        node.parts.length > 128 ||
        typeof node.boundaryKind !== "string" ||
        typeof node.terminal !== "string"
      )
        return null;
      const parts = node.parts.map((part) => {
        require(exact(part, [...PART_KEYS, ...PART_REFS]) &&
          scalar(pick(part, PART_KEYS), PART_KEYS) &&
          PART_KEYS.every(
            (k) => part[k] === undefined || typeof part[k] === "string",
          ), "invalid ordered writing part");
        const refs = Object.fromEntries(
          PART_REFS.filter((k) => part[k] !== undefined).map((k) => {
            const v = prior(part[k]);
            require(v, "missing ordered writing dependency");
            return [k, v];
          }),
        );
        return { ...pick(part, PART_KEYS), ...refs };
      });
      const source = r.issueClassicalNahuatlLesson2WritingSource({
        parts,
        boundaryKind: node.boundaryKind,
        terminal: node.terminal,
      });
      const result = r.writeClassicalNahuatlLesson2Result(source);
      return r.isClassicalNahuatlLesson2WrittenResult?.(result) ? result : null;
    }
    if (node.type === "nnc:source")
      return exact(node, ["type", "source"]) && scalar(node.source, NNC_RELOAD_SOURCE_KEYS)
        ? reissueNncReloadSource(r,node.source)
        : null;
    if (node.type === "nnc:contextual-flawed-source")
      return exact(node, ["type", "source", "negative"]) &&
        prior(node.source) &&
        prior(node.negative)
        ? r.issueClassicalNahuatlContextualFlawedSubjectSourceFrame(
            prior(node.source),
            prior(node.negative),
          )
        : null;
    if (node.type === "nnc:selected-imperfect-source") {
      if (
        !exact(node, ["type", "input", "documentedEntry"]) ||
        !exact(node.input, [
          "sourceKind",
          "sourceFormation",
          "sourceVoice",
          "predicateStem",
          "tenseCarrier",
          "initialI",
          "incorporatedEmbed",
        ]) ||
        !scalar(node.input.incorporatedEmbed, ["kind", "stem"])
      )
        return null;
      if (node.documentedEntry !== undefined) {
        if (typeof node.documentedEntry !== "string") return null;
        const source =
          r.resolveClassicalNahuatlSelectedImperfectPredicateSourceFrame({
            enteredStem: node.documentedEntry,
            sourceKind: node.input.sourceKind,
            sourceFormation: node.input.sourceFormation,
          });
        if (
          !source ||
          JSON.stringify(
            pick(source, [
              "sourceKind",
              "sourceFormation",
              "sourceVoice",
              "predicateStem",
              "tenseCarrier",
              "initialI",
            ]),
          ) !==
            JSON.stringify(
              pick(node.input, [
                "sourceKind",
                "sourceFormation",
                "sourceVoice",
                "predicateStem",
                "tenseCarrier",
                "initialI",
              ]),
            ) ||
          JSON.stringify(source.incorporatedEmbed) !==
            JSON.stringify(node.input.incorporatedEmbed)
        )
          return null;
        return source;
      }
      return r.buildClassicalNahuatlSelectedImperfectPredicateSourceFrame(
        node.input,
      );
    }
    if (node.type === "nnc:pronominal") {
      if (
        !exact(node, ["type", "source", "choices"]) ||
        !scalar(node.source, PRONOMINAL_SOURCE) ||
        !scalar(node.choices, PRONOMINAL_CHOICES)
      )
        return null;
      const source = r.buildClassicalNahuatlPronominalNncSourceFrame(
          node.source,
        ),
        op = r.buildClassicalNahuatlPronominalNncOperationFrame(
          source,
          node.choices,
        );
      return r.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:pronominal",
        args: [source, op],
      })?.canonicalResult;
    }
    if (node.type === "nnc:relational") {
      if (
        !exact(node, [
          "type",
          "nounstem",
          "clause",
          "composition",
          "upstream",
          "selected",
          "typedSource",
        ]) ||
        !scalar(node.nounstem, RELATIONAL_NOUN) ||
        !scalar(node.clause, RELATIONAL_CLAUSE) ||
        (node.typedSource !== undefined && node.typedSource !== true)
      )
        return null;
      const nounstem = {
        kind: "classical-nahuatl-nnc-nounstem-request",
        ...node.nounstem,
      };
      if (node.selected !== undefined) {
        if (
          !r.isClassicalNahuatlSelectedImperfectPredicateSourceFrame?.(
            prior(node.selected),
          ) ||
          node.upstream !== undefined
        )
          return null;
        nounstem.selectedImperfectPredicateSource = prior(node.selected);
      }
      if (node.upstream !== undefined) {
        if (!prior(node.upstream)) return null;
        nounstem.upstreamResult = prior(node.upstream);
      }
      const tree = (part, depth = 0) => {
        require(depth <= 6, "relational composition depth exceeded");
        if (exact(part, ["stem"]) && typeof part.stem === "string")
          return {
            kind: "classical-nahuatl-relational-source-composition-stem-node",
            stem: part.stem,
          };
        require(exact(part, ["embed", "matrix"]) &&
          part.embed &&
          part.matrix, "invalid relational composition");
        return {
          kind: "classical-nahuatl-relational-source-composition-compound-node",
          embed: tree(part.embed, depth + 1),
          matrix: tree(part.matrix, depth + 1),
        };
      };
      if (node.composition) {
        const root = tree(node.composition);
        nounstem.sourceComposition = {
          kind: "classical-nahuatl-relational-source-composition-request",
          embed: root.embed,
          matrix: root.matrix,
        };
      }
      const request = { nounstem, ...node.clause };
      let args = [request];
      if (node.typedSource) {
        const source = r.buildClassicalNahuatlRelationalNncTypedSourceFrame(request);
        const binding = r.issueClassicalNahuatlRelationalNncTypedSourceBindingFrame(source);
        if (binding?.bindingStatus !== "ready") return null;
        args = binding.executionArgs;
      }
      return r.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:relational",
        args,
      })?.canonicalResult;
    }
    if (node.type === "nnc:contextual-affective") {
      const context = prior(node.context);
      if (
        !exact(node, ["type", "context"]) ||
        !r.isClassicalNahuatlContextualFlawedSubjectSourceFrame?.(context)
      )
        return null;
      return r.executeClassicalGrammarApplicationRequest({
        operationId: "grammar:nominal-construction",
        args: [
          {
            constructionKind: "affective-nnc",
            affectRoute: "flawed-subject",
            subject: "3common",
            state: "absolutive",
            animacy: "unspecified",
            source: {
              embedStem: context.sourceStem,
              embedClass: "tl",
              embedSourceClass: "tl",
              canonicalNncSourceFrame: context.canonicalNncSourceFrame,
              contextualFlawedSubjectSourceFrame: context,
            },
          },
        ],
      })?.canonicalResult;
    }
    if (node.type === "nnc:sentence-context") {
      if (
        !exact(node, [
          "type",
          "source",
          "choices",
          "discourse",
          "writing",
          "parentWriting",
          "borrowed",
        ]) ||
        !scalar(node.choices, SENTENCE_CHOICES) ||
        (node.discourse !== undefined && node.discourse !== true)
      )
        return null;
      const parent = prior(node.source),
        slot = slotOf(r, parent);
      if (!slot) return null;
      const choices = { ...node.choices };
      if (node.parentWriting !== undefined) {
        if (
          node.parentWriting !== true ||
          node.writing !== undefined ||
          !r.isClassicalNahuatlLesson2WrittenResult?.(
            parent.sentenceFrame?.canonicalNuclearWrittenResult,
          )
        )
          return null;
        choices.canonicalNuclearWrittenResult =
          parent.sentenceFrame.canonicalNuclearWrittenResult;
      }
      if (node.discourse) {
        if (!parent.sentenceFrame?.discourseFrame) return null;
        choices.discourseFrame = parent.sentenceFrame.discourseFrame;
      }
      if (node.writing !== undefined) {
        const written = prior(node.writing);
        if (!r.isClassicalNahuatlLesson2WrittenResult?.(written)) return null;
        choices.canonicalNuclearWrittenResult = written;
      }
      if (node.borrowed !== undefined) {
        const borrowed = prior(node.borrowed);
        if (!r.isClassicalNahuatlOrdinaryNncSourceFrame?.(borrowed))
          return null;
        choices.borrowedNncSourceFrame = borrowed;
      }
      const sentence = r.buildClassicalNahuatlNncSentenceSurfaceFrame(
        slot,
        choices,
      );
      if (!r.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sentence))
        return null;
      return r.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        args: [sentence, {}],
      })?.canonicalResult;
    }
    return undefined;
  } catch {
    return null;
  }
}
