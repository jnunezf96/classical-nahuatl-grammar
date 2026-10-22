"use strict";

// Fixture IDs select authored Andrews Source recipes only. All morphology and
// admission come from the genuine runtime owners; these declarations cannot
// authorize a Result or convert a spelling into a canonical parent.
const CANVAS = "ANDREWS_TRANSCRIPTION_CANVAS.md";
const GENERAL_USE_REFS = Object.freeze([
  {path: CANVAS, section: "35.5", lineStart: 12945, lineEnd: 12960},
]);
const DIRECT = Object.freeze({
  "44.7-pacca": ["pāc", "none", 17744, 17745],
  "44.7-chicahuaca": ["chic-ā-hua", "none", 17747, 17748],
  "44.7-chipahuaca": ["chip-ā-hua", "none", 17749, 17750],
  "44.7-ihuintica": ["ihuin-ti", "none", 17751, 17751],
  "44.7-tonaca": ["tōna", "none", 17752, 17753],
  "44.7-cualanca": ["cual-ā-n", "none", 17754, 17755],
  "44.7-ihciuhca": ["ihc-i-uh", "none", 17756, 17756],
  "44.7-cenquizca": ["cen-quiz", "none", 17757, 17758],
  "44.7-cecenyahca": ["cē-cen-yah", "none", 17759, 17761],
  // Andrews documents these nominal predicates even though the ordinary VNC
  // is obsolete/unattested. No ordinary finite Source is invented here.
  "44.7-ohhuihca": ["oh-hui-h", "none", 17766, 17770],
  "44.7-nehneuhca": ["neh-ne-uh", "none", 17771, 17772],
  "44.7-yocoxca": ["yōco-x", "none", 17784, 17787],
  "44.7-tlacemanca": ["cem-ān", "nonspecific-nonhuman", 17794, 17796],
  "44.7-tecocohca": ["coco-h", "nonspecific-human", 17797, 17798],
  "44.7-tlamatca": ["mat", "nonspecific-nonhuman", 17799, 17800],
});
const ROOT_PLUS_YA = Object.freeze({
  "44.7-ahhuiaca": ["ahhuiā-ya", 17776, 17776],
  "44.7-cececa": ["ce-ce-ya", 17777, 17777],
  "44.7-cococa": ["coco-ya", 17778, 17778],
  "44.7-celica": ["cel-i-ya", 17779, 17779],
  "44.7-itztica": ["itz-ti-ya", 17780, 17780],
  "44.7-yancuica": ["yancui-ya", 17781, 17781],
  "44.7-hueica": ["huē-i-ya", 17782, 17783],
});
const REFLEXIVE = Object.freeze({
  "44.7-nehmatca": ["ih-mati", "B", 17801, 17806],
  "44.7-mihmatca": ["ih-mati", "B", 17811, 17814],
  "44.7-mahcica": ["ahci", "A", 17815, 17818],
});
function nominalRequest(stem, objectPattern = "none") {
  return {
    constructionKind: "predicate-nominalization", nominalizationKind: "preterit-agentive",
    source: {sourceStem: stem, sourceStage: "preterit-predicate", sourceVoice: "active",
      sourceValence: objectPattern === "none" ? "intransitive" : "single-object",
      sourceObjectPattern: objectPattern},
    subject: "3sg", state: "absolutive", animacy: "animate",
  };
}

function finiteRequest(stem, verbClass = "B", sourceValence = "intransitive") {
  return {sourceStem: stem, verbClass, sourceValence, sourceInitialISelection: "real",
    subject: "3sg", voice: "active", mood: "indicative", tense: "preterit"};
}

function createPreteritFixtureSource(ctx, sourceId) {
  const direct = Object.hasOwn(DIRECT, sourceId) ? DIRECT[sourceId] : null;
  const root = Object.hasOwn(ROOT_PLUS_YA, sourceId) ? ROOT_PLUS_YA[sourceId] : null;
  const reflexive = Object.hasOwn(REFLEXIVE, sourceId) ? REFLEXIVE[sourceId] : null;
  if (!direct && !root && !reflexive && sourceId !== "44.7-ichtaca") return null;
  let potential, input, expectedLexicalId, refs, parents;
  if (direct) {
    const [stem, pattern, lineStart, lineEnd] = direct;
    input = {operationId: "nnc:deverbal-construction", request: nominalRequest(stem, pattern)};
    const parent = ctx.requestClassicalDeverbalNncResult(input.request);
    parents = [parent];
    const lexicalized = sourceId === "44.7-cenquizca" || sourceId === "44.7-yocoxca";
    const selection = lexicalized ? {preteritAgentiveUse: "lexicalized"} : {};
    input.sourcePreparation = {...selection, canonicalSourceResultFrom: "parents[0]"};
    potential = ctx.prepareClassicalAdverbialNncSource({canonicalSourceResult: parent, ...selection});
    expectedLexicalId = lexicalized ? sourceId
      : `productive:${pattern === "none" ? "regular-intransitive" : "transitive"}:${stem}`;
    refs = [{path: CANVAS, section: "44.7", lineStart, lineEnd}];
  } else if (root && sourceId !== "44.7-hueica") {
    const [fullStem, lineStart, lineEnd] = root;
    const stem = fullStem.replace(/-ya$/u, "");
    const request = nominalRequest(stem);
    // 40.9 explicitly classes the obsolete root A. The full -ya verb's
    // class remains unclaimed; no finite paradigm is generated for it.
    request.source.verbClass = "A";
    request.subject = "3common";
    request.animacy = "nonanimate";
    input = {operationId: "nnc:deverbal-construction", request,
      sourceEvidence: {fullRootPlusYaStem: fullStem, fullVerbClass: "unresolved-not-required",
        nominalAnalysis: "documented-obsolete-root-preterit", obsoleteRootClass: "A",
        fullVncGenerated: false}};
    const parent = ctx.requestClassicalDeverbalNncResult(request);
    parents = [parent];
    input.sourcePreparation = {canonicalSourceResultFrom: "parents[0]"};
    potential = ctx.prepareClassicalAdverbialNncSource({canonicalSourceResult: parent});
    expectedLexicalId = `productive:regular-intransitive:${stem}`;
    refs = [{path: CANVAS, section: "44.7", lineStart, lineEnd},
      {path: CANVAS, section: "40.9", lineStart: 16179, lineEnd: 16199}];
  } else if (root || reflexive) {
    const [stem, second, third, fourth] = root || reflexive;
    const verbClass = root ? "B" : second;
    input = {operationId: "vnc:application", request: finiteRequest(stem, verbClass,
      root ? "intransitive" : "mainline-reflexive")};
    if (root) input.sourceEvidence = {fullVerbClass: "B", classAuthority: "40.9-explicit-full-Class-B-stem",
      exactSelectedCellOnly: true, restrictedObsoleteNounGenerated: false};
    const application = ctx.requestClassicalVncApplicationResult(input.request);
    const sentence = ctx.requestClassicalVncSentenceResultFrame(application);
    parents = [application, sentence];
    let parent = sentence;
    if (reflexive) {
      parent = ctx.requestClassicalDeverbalNncResult({constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive", canonicalVncResult: sentence,
        subject: "3sg", state: "absolutive", animacy: "animate"});
      parents.push(parent);
    }
    const lexicalized = reflexive && sourceId !== "44.7-nehmatca";
    const selection = lexicalized ? {preteritAgentiveUse: "lexicalized"} : {};
    input.sourcePreparation = {...selection, canonicalSourceResultFrom: `parents[${parents.length - 1}]`};
    potential = ctx.prepareClassicalAdverbialNncSource({canonicalSourceResult: parent, ...selection});
    expectedLexicalId = root ? `productive-obsolete:${stem}`
      : lexicalized ? sourceId : `productive:reflexive-shuntline:ih-mat`;
    refs = [{path: CANVAS, section: "44.7", lineStart: root ? second : third, lineEnd: root ? third : fourth}];
    if (root) refs.push({path: CANVAS, section: "40.9", lineStart: 16179, lineEnd: 16211});
    if (reflexive) refs.push({path: CANVAS, section: "35.12", lineStart: 13456, lineEnd: 13471});
  } else {
    // The owner has an explicit irregular lexical Source contract with its
    // real initial i and formation ancestry; no regular theft verb is guessed.
    input = {operationId: "lexical-adverbial-source", request: {stem: "ichtacā"}};
    potential = ctx.buildClassicalNahuatlLexicalAdverbialPotentialFrame(input.request);
    parents = [potential.lexicalNncSourceFrame];
    expectedLexicalId = sourceId;
    refs = [{path: CANVAS, section: "44.7", lineStart: 17788, lineEnd: 17791}];
  }
  const blockedParent = parents.find(parent => parent?.authorizationStatus !== "authorized");
  const hold = blockedParent || potential.authorizationStatus !== "authorized"
      ? {classification: "source-owner-rejected", requiredInputs: ["owner-issued-authorized-parent-and-adverbial-potential"],
        reason: blockedParent?.blockReason || potential.blockReason || "Required genuine parent was not issued."}
      : null;
  return {sourceId, documentedLexicalId: sourceId, potential: hold ? null : potential,
    parents, input, expectedLexicalId, sourceRefs: [...GENERAL_USE_REFS, ...refs], hold};
}

module.exports = {createPreteritFixtureSource};
