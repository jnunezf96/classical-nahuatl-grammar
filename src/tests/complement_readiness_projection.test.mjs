import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const body=source.split('function getClassicalComplementReadinessMessage(contract) {')[1].split('\n    function refreshClassicalClauseRelationWorkflow')[0];
const message=new Function('contract','formatClassicalCapabilityChoiceLabel','formatClassicalClauseRelationValue',body.slice(0,body.lastIndexOf('}')));
test('complement status prioritizes missing operands and unresolved choices over stale readiness',()=>{
 const show=c=>message(c,s=>s,s=>s);
 assert.equal(show({missingCaptureRoles:['principal'],authorizationStatus:'authorized'}),'Exact Result captured; add principal.');
 assert.equal(show({unresolvedDecisionIds:['link-kind'],authorizationStatus:'authorized'}),'Exact Result captured; choose link-kind.');
 assert.equal(show({authorizationStatus:'blocked',blockReason:'predicate-ineligible'}),'predicate-ineligible');
 assert.equal(show({authorizationStatus:'authorized'}),'Choices complete. Make Result.');
});
