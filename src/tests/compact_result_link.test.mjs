import assert from "node:assert/strict";
import test from "node:test";
import { decodeCompactResultAddress, encodeCompactResultAddress } from "../application/classical/compact_result_link.mjs";

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
