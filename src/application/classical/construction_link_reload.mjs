import { decodeClassicalConstructionNumber } from "./construction_number_codec.mjs";
import { exportClassicalResultReloadRecipe } from "./result_reload.mjs";

function choicesFor(node, expected) {
  if (node.choices.length !== expected.length) return null;
  const choices = Object.fromEntries(node.choices.map(({ choiceId, value }) => [choiceId, value]));
  return expected.every(key => Object.hasOwn(choices, key)) ? choices : null;
}

// The published runtime can reissue this construction with its existing owners.
// Other blueprint families need their own compatibility adapters.
export function translateClassicalConstructionLink(runtime, address) {
  if (typeof address !== "string" || address.length > 4096) return null;
  const decoded = decodeClassicalConstructionNumber(address);
  if (decoded.status !== "decoded") return null;
  const { root, nodes } = decoded.blueprint;
  if (root !== 4 || nodes.length !== 5) return null;
  const [source, finite, sentence, pronoun, whole] = nodes;
  if (source.constructorId !== "vnc:whole-stem"
    || finite.operationId !== "vnc:application" || finite.inputRefs.join() !== "0" || finite.slots.length
    || sentence.operationId !== "vnc:sentence-result" || sentence.inputRefs.join() !== "1" || sentence.slots.length
    || pronoun.operationId !== "nnc:pronominal" || pronoun.inputRefs.length || pronoun.slots.length
    || whole.operationId !== "sentence:supplementation" || whole.inputRefs.length
    || whole.slots.length !== 2 || whole.slots[0].roleId !== "principal" || whole.slots[0].nodeRef !== 2
    || whole.slots[1].roleId !== "adjoined" || whole.slots[1].nodeRef !== 3) return null;
  const f = choicesFor(finite, ["source-stem", "verb-class", "source-valence", "object-kind",
    "subject", "mood", "tense", "introductory-particle", "object-person", "source-initial-i"]);
  const s = choicesFor(sentence, ["antecessive", "punctuation-mode"]);
  const p = choicesFor(pronoun, ["subject", "referential-humanness", "personal-stem"]);
  const w = choicesFor(whole, ["relation", "written-order", "principal-contact", "adjunct-contact"]);
  if (!f || !s || !p || !w || source.arguments.length !== 3
    || source.arguments[0] !== f["source-stem"] || source.arguments[1] !== f["verb-class"]
    || source.arguments[2] !== f["source-valence"] || f["introductory-particle"] !== ""
    || s.antecessive !== true || s["punctuation-mode"] !== "statement"
    || p["personal-stem"] !== "eh-huā" || p.subject !== "3pl" || p["referential-humanness"] !== "human"
    || w.relation !== "shared" || w["written-order"] !== "principal-adjoined"
    || w["adjunct-contact"] !== "subject" || !["subject", "source-object-1"].includes(w["principal-contact"])) return null;

  const make = (operationId, ...args) => {
    const result = runtime.executeClassicalGrammarApplicationRequest({ operationId, args });
    return result?.authorizationStatus === "authorized" ? result.canonicalResult : null;
  };
  const application = make("vnc:application", {
    sourceStem: f["source-stem"], verbClass: f["verb-class"], sourceValence: f["source-valence"],
    objectKind: f["object-kind"], objectPerson: f["object-person"], subject: f.subject, sourceSubject: f.subject,
    mood: f.mood, tense: f.tense, sourceInitialISelection: f["source-initial-i"],
    sentenceOptions: { antecessive: s.antecessive, punctuationMode: s["punctuation-mode"] },
  });
  const principal = application && make("vnc:sentence-result", application);
  const pronounSource = runtime.issueCanonicalNncSourceFrame({ stem: p["personal-stem"], embedStem: "eh", matrixStem: "huā" });
  const adjunct = pronounSource && make("nnc:pronominal", pronounSource,
    runtime.issueCanonicalNncOperationFrame(pronounSource, { subject: p.subject, humanness: p["referential-humanness"] }));
  if (!principal || !adjunct) return null;
  const endpoint = w["principal-contact"];
  const objectContact = endpoint !== "subject";
  const principalClause = runtime.buildClassicalNahuatlSupplementationClauseEnvelope(principal, {
    referenceId: "principal",
    ...(objectContact ? { objectReferenceIds: { [endpoint]: "shared" } } : { subjectReferenceId: "shared" }),
  });
  const supplementClause = runtime.buildClassicalNahuatlSupplementationClauseEnvelope(adjunct, {
    referenceId: "adjunct", subjectReferenceId: "shared",
  });
  const result = make("sentence:supplementation", {
    operationKind: "relation", principalClause, supplementClause,
    options: { referenceMode: w.relation, order: "principal-first", supplementContactRole: w["adjunct-contact"],
      headRole: objectContact ? "object" : "subject", ...(objectContact ? { principalObjectId: endpoint } : {}) },
  });
  return result ? exportClassicalResultReloadRecipe(runtime, { result }) : null;
}
