// Reload stores owner inputs and graph references. Written answers and discourse
// projections are re-created by their original owners, never accepted as inputs.
const SOURCE_KEYS = [
  "stem",
  "sourceClass",
  "embedStem",
  "matrixStem",
  "supportiveInitialI",
];
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
const capturedParent = (r, slot) => {
  const capture = r.captureClassicalGrammarApplicationResult?.(
    slot,
    "reload-nnc-nucleus",
  );
  return r.isClassicalGrammarApplicationResultCapture?.(
    capture,
    "reload-nnc-nucleus",
  ) === true
    ? capture.applicationResult.canonicalResult
    : null;
};
const slotOf = (r, parent) =>
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
    r.isClassicalNahuatlLesson2WrittenResult?.(value) === true ||
    r.isClassicalNahuatlOrdinaryNncSourceFrame?.(value) === true ||
    r.isClassicalNahuatlContextualFlawedSubjectSourceFrame?.(value) === true ||
    r.isClassicalNahuatlSelectedImperfectPredicateSourceFrame?.(value) === true
  );
}
export function exportNncContextReloadNode(r, value, visit) {
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
    require(!value.compoundSource &&
      !value.sourceConstituents?.length &&
      !r.getClassicalNahuatlLexicalizedPresentNncSourceParent?.(
        value,
      ), "unsupported contextual source parent");
    return { type: "nnc:source", source: pick(value, SOURCE_KEYS) };
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
export function replayNncContextReloadNode(r, node, prior) {
  if (typeof node?.type !== "string" || !node.type.startsWith("nnc:"))
    return undefined;
  try {
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
      return exact(node, ["type", "source"]) && scalar(node.source, SOURCE_KEYS)
        ? r.issueCanonicalNncSourceFrame(node.source)
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
        ]) ||
        !scalar(node.nounstem, RELATIONAL_NOUN) ||
        !scalar(node.clause, RELATIONAL_CLAUSE)
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
      return r.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:relational",
        args: [{ nounstem, ...node.clause }],
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
