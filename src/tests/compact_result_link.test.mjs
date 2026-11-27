import assert from "node:assert/strict";
import test from "node:test";
import { decodeCompactResultAddress, encodeCompactResultAddress } from "../application/classical/compact_result_link.mjs";

import { encodeVerifiedClassicalResultLink } from "../application/classical/result_reload.mjs";

const verbalRecipe = steps => ({
  kind: "classical-grammar-result-reload-recipe",
  version: 1,
  nodes: [{
    type: "vnc",
    recipe: { kind: "classical-nahuatl-vnc-application-reload-recipe", version: 1, steps },
  }],
  roots: { result: 0 },
});

test("compact continuation retains changes, removed fields and operation-only steps", async () => {
  const recipe = verbalRecipe([
    { request: { subject: "3sg", tense: "present", objectPerson: "" } },
    { request: { subject: "1pl", tense: "present", verbClass: "B" } },
    { operationId: "vnc:sentence-result" },
  ]);
  const address = await encodeCompactResultAddress(recipe);
  assert.match(address, /^sgr2\//);
  assert.deepEqual(await decodeCompactResultAddress(address), recipe);
  assert.equal(await decodeCompactResultAddress(address + "/extra"), null);
});

test("compact continuation carries 512 steps without copying repeated inputs", async () => {
  const request = { sourceStem: "nemi", notes: "Repeated input ".repeat(80) };
  const recipe = verbalRecipe(Array.from({ length: 512 }, (_, index) => ({
    request: { ...request, subject: index % 2 ? "1pl" : "3sg" },
  })));
  const address = await encodeCompactResultAddress(recipe);
  assert.ok(address.length < 2000);
  assert.deepEqual(await decodeCompactResultAddress(address), recipe);
});

test("a long verb chain can be saved as a dependency of a larger Result", async () => {
  const request = { sourceStem: "nemi", notes: "Repeated input ".repeat(80) };
  const recipe = verbalRecipe(Array.from({ length: 512 }, (_, index) => ({
    request: { ...request, subject: index % 2 ? "1pl" : "3sg" },
  })));
  recipe.nodes.push({ type: "particle:source", particleId: "l3-no-adverbial" });
  recipe.nodes.push({ type: "particle:sentence-layer", operation: "sentence:adverbial-adjunction", host: 0, source: 1, options: {} });
  recipe.roots.result = 2;
  const address = await encodeCompactResultAddress(recipe);
  assert.ok(address.length < 3000);
  assert.deepEqual(await decodeCompactResultAddress(address), recipe);
});

test("a link is publishable only if its compact address decodes to the exact recipe", async () => {
  const steps = Array.from({ length: 512 }, () => ({ request: { sourceStem: "nemi" } }));
  const supported = verbalRecipe(steps);
  const address = await encodeVerifiedClassicalResultLink(supported);
  assert.ok(address);
  assert.deepEqual(await decodeCompactResultAddress(address), supported);

  const tooManySteps = verbalRecipe([...steps, steps[0]]);
  assert.ok(await encodeCompactResultAddress(tooManySteps));
  assert.equal(await encodeVerifiedClassicalResultLink(tooManySteps), null);
});
