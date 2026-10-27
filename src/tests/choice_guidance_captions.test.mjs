import test from 'node:test';
import assert from 'node:assert/strict';
import {captureRoleLabel} from '../ui/composition/choice_guidance.mjs';
import {readFileSync} from 'node:fs';
test('native Capture/Clear captions follow current semantic role and withdraw stale route labels',()=>{
 const comparison={currentChoiceFrame:{inputs:[{role:'adjoined',slot:'standard'}]}};
 const complement={currentChoiceFrame:{inputs:[{role:'adjoined',slot:'complement'}]}};
 assert.equal(captureRoleLabel(comparison,'adjoined'),'comparison standard');
 assert.equal(captureRoleLabel(complement,'adjoined'),'complement');
 assert.equal(captureRoleLabel(null,'adjoined'),'adjoined');
 assert.equal(captureRoleLabel(null,'adjoined','supplement clause'),'supplement clause');
 const renderer=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 assert.ok(renderer.includes('label: `Clear ${currentRoleLabel}`'));
 assert.ok(renderer.includes('captureRoleLabels[role] = captureRoleLabel(previewDecisionContract, role, slotId)'));
 assert.ok(renderer.includes('action: `clear-clause-relation-${role}`'));
 assert.ok(renderer.includes('action: `capture-current-clause-relation-${role}`'));
});
