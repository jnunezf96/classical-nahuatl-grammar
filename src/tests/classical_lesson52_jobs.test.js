"use strict";
const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const ROOT = path.resolve(__dirname, "..", "..");

function buildVnc(ctx, stem, referenceId = "actor") {
  const result = ctx.requestClassicalVncApplicationResult({ sourceStem: stem, subject: "3sg", mood: "indicative", tense: "present", verbClass: "A", sourceValence: "intransitive", requestedDerivation: "direct", requestedVoice: "active", outputScope: "single" });
  return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(result, { referenceId, subjectReferenceId: referenceId });
}
function buildNnc(ctx, stem, referenceId = "referent") {
  return ctx.buildClassicalNahuatlClauseCompositionSourceFrame(ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, { subject: "3sg", nounClass: "zero", animacy: "animate" }), { referenceId });
}
function conjunction(ctx, conjuncts, options = {}) {
  return ctx.evaluateClassicalNahuatlClauseConjunction({ operationKind: "conjunction", conjuncts, options: { relation: "unmarked", coordinationType: "additive", level: "principal", polarity: "positive", ...options } });
}

function run(ctx = {}) {
  const s = createSuite("classical_lesson52_jobs");
  const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
  const plan = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson52-review-plan.json"), "utf8"));
  const field = Object.fromEntries(ledger.codebook.atomTuple.map((name, index) => [name, index]));
  const atoms = ledger.atoms.filter(atom => /^§52(?:\.|$)/u.test(atom[field.canvasSection]));
  const grammarAtoms = atoms.filter(atom => atom[field.force] === "grammar-bearing");
  const writingRoles = new Set(["canonical-rule-or-alternation", "applicability-or-constraint", "derived-realization", "source-structure-schema", "result-projection"]);
  const writing = grammarAtoms.filter(atom => writingRoles.has(atom[field.projectRole]));
  const mapped = new Set(plan.groups.flatMap(group => group.sections));
  s.eq("Lesson 52 partitions every Canvas atom into technical-proof groups", { atoms: atoms.length, grammar: grammarAtoms.length, writing: writing.length, readingOnly: atoms.length - writing.length, sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))], unmapped: atoms.filter(atom => !mapped.has(atom[field.canvasSection])).map(atom => atom[field.atomId]) }, { atoms: 896, grammar: 674, writing: 547, readingOnly: 349, sections: plan.groups.flatMap(group => group.sections), unmapped: [] });

  const ownerIds = [...new Set(grammarAtoms.map(atom => atom[field.semanticOwnerId]))].sort();
  const observations = ownerIds.map(ownerId => {
    const owned = grammarAtoms.filter(atom => atom[field.semanticOwnerId] === ownerId);
    const source = fs.readFileSync(path.join(ROOT, owned[0][field.semanticOwnerReference]), "utf8");
    const spec = JSON.parse(source.match(/const spec = (\{[\s\S]*\});\nexport default/u)[1]);
    const results = Object.keys(spec.coordinates).map(key => { const [selection, requestedFacet] = key.split("::"); return ctx[`evaluate${spec.prefix}`](ctx[`build${spec.prefix}Source`]({ analysisDomain: ownerId, selection, requestedFacet, participantChoice: `${selection}:${requestedFacet}` })); });
    return { atoms: owned.length, exact: source.includes(`"ownerId": "${ownerId}"`) && results.every(result => ctx[`is${spec.prefix}Result`](result) && result.semanticOwnerId === ownerId && ["authorized", "blocked"].includes(result.authorizationStatus)) };
  });
  s.eq("all grammar-bearing atoms retain exact semantic-owner proof", { atoms: observations.reduce((sum, item) => sum + item.atoms, 0), owners: observations.length, invalid: observations.filter(item => !item.exact).length }, { atoms: 674, owners: 65, invalid: 0 });

  const contract = ctx.buildClassicalNahuatlClauseCompositionGrammarContract();
  s.eq("Lesson 52 reuses one signed clause-composition GCD and 35 conjunction axes", { exact: ctx.isClassicalNahuatlClauseCompositionGrammarContract(contract), gcd: contract.greatestCommonDivisor.identityId, conjunctionAxes: contract.leastCommonMultiple.semanticOwnerAxisCounts["clause-conjunction"], lessonEvaluator: typeof ctx.evaluateClassicalNahuatlLesson52ConjunctionOperation }, { exact: true, gcd: "typed-clause-source-semantic-relation-reference-graph-surface-result", conjunctionAxes: 35, lessonEvaluator: "undefined" });

  const singer = buildVnc(ctx, "cuīca", "performer");
  const dancer = buildVnc(ctx, "mihtōtīa", "performer");
  const ordinary = conjunction(ctx, [singer, dancer], { sharedModifierScope: "before-first-applies-to-all", sharedModifier: "aic" });
  const marked = conjunction(ctx, [singer, dancer], { relation: "marked", coordinationType: "adversative" });
  const correlative = ctx.evaluateClassicalNahuatlClauseConjunction({ operationKind: "correlative-conjunction", conjuncts: [singer, dancer], options: { correlationType: "standard", pattern: "ahzo-ahzo" } });
  const lexical = ctx.evaluateClassicalNahuatlClauseConjunction({ operationKind: "lexical-conjunction", conjuncts: [buildNnc(ctx, "tēuctli", "ruler"), buildNnc(ctx, "tlahtoāni", "ruler")], options: { lexicalType: "lord-and-master", stateRealization: "conjoined-stems", adjunctorDistribution: "none" } });
  const parallel = ctx.evaluateClassicalNahuatlClauseConjunction({ operationKind: "parallel-structure", conjuncts: [singer, dancer], options: { parallelType: "rephrasive", rephraseAxis: "active-passive" } });
  s.eq("ordinary, marked, correlative, lexical, and parallel structures issue exact Results", [ordinary, marked, correlative, lexical, parallel].map(result => ({ status: result.authorizationStatus, exact: ctx.isClassicalNahuatlClauseConjunctionResultFrame(result), formulaAuthority: result.formulaStringAuthority, surfaceAuthority: result.surfaceStringAuthority })), Array(5).fill({ status: "authorized", exact: true, formulaAuthority: false, surfaceAuthority: false }));

  const hostile = conjunction(ctx, [{ ...singer }, JSON.parse(JSON.stringify(dancer))], { lesson: 52, formula: "display", surface: "display" });
  s.ok("copies and display metadata cannot authorize conjunction", hostile.authorizationStatus === "blocked" && !ctx.isClassicalNahuatlClauseConjunctionResultFrame({ ...ordinary }) && !ctx.isClassicalNahuatlClauseConjunctionResultFrame(JSON.parse(JSON.stringify(ordinary))));

  const controller = fs.readFileSync(path.join(ROOT, "src/application/classical/clause_relation_controller.mjs"), "utf8");
  const rendering = fs.readFileSync(path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
  s.ok("the live Clause composition workflow exposes conjunction choices from captured Results", controller.includes('"conjunction"') && rendering.includes('title.textContent = "Clause composition"') && rendering.includes('"correlative-conjunction"') && rendering.includes('"lexical-conjunction"') && rendering.includes('"parallel-structure"'));
  return s;
}
module.exports = { run };
