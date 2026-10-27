import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Element} from './helpers/organization_dom.mjs';
import {createResultActions} from '../ui/composition/result_actions.mjs';
test('workspace history mirror identifies accepted-build undo rather than pending-edit undo',()=>{
 const doc={createElement:tag=>new Element(tag),getElementById:()=>null};
 createResultActions(doc,{});
 // Capture actual constructed controls without invoking any owner or action.
 const nodes=[];doc.createElement=tag=>{const n=new Element(tag);nodes.push(n);return n;};createResultActions(doc,{});
 const undo=nodes.find(n=>n.id==='classical-result-action-undo');
 assert.equal(undo.textContent,'Undo build');assert.equal(undo.title,'Return to the previous accepted build; this does not undo pending choices.');
 assert.equal(undo.dataset.inventoryMirrorsFieldRef,'id:classical-grammar-workspace-history-undo');
 const shell=readFileSync(new URL('../ui/shell/classical_shell.mjs',import.meta.url),'utf8');
 assert.match(shell,/id="classical-grammar-workspace-history-undo"[^>]*title="Return to the previous accepted build; this does not undo pending choices\."[^>]*>Undo build<\/button>/);
});

test('refresh keeps the same explicit consequence for both visible mirrors',()=>{
 const actions=readFileSync(new URL('../ui/composition/result_actions.mjs',import.meta.url),'utf8');
 assert.match(actions,/const title=enabled\?\(action==='undo'\?'Return to the previous accepted build; this does not undo pending choices\.'/);
 const path=readFileSync(new URL('../ui/composition/path_presentation.mjs',import.meta.url),'utf8');
 assert.match(path,/undo:'Undo build'/);assert.match(path,/id==='undo'\?'Return to the previous accepted build; this does not undo pending choices\.'/);
});
