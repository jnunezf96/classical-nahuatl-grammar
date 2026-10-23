import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {appendValenceAnalysis} from '../ui/composition/valence_analysis.mjs';
const doc={createElement:tag=>new Element(tag)};
const frame={authorizationStatus:'authorized',valenceRows:[
  {slotId:'later',objectId:'applicative',prefixOrder:1,derivationalLevel:2,governor:'applicative',prominence:'mainline',expression:'+c-0',valenceArity:'dyadic',sounded:true},
  {slotId:'earlier',objectId:'causative',prefixOrder:2,derivationalLevel:1,governor:'causative',prominence:'shuntline',expression:'+⎕-⎕',valenceArity:'dyadic',sounded:false}
]};

test('history rows retain prefix order, typed governors and silent full positions',()=>{
  const parent=new Element(),section=appendValenceAnalysis(doc,parent,frame);
  const rows=section.querySelector('tbody').children;
  assert.deepEqual(rows.map(row=>row.dataset.valenceSlot),['earlier','later']);
  assert.deepEqual(rows.map(row=>row.dataset.prefixOrder),['2','1']);
  assert.equal(rows[0].children[1].textContent,'Causative suffix');
  assert.equal(rows[0].children[2].textContent,'+⎕-⎕');
  assert.equal(rows[0].children[2].children[0].textContent,'silent');
  assert.equal(rows[1].children[1].textContent,'Applicative suffix');
});

test('general view distinguishes full monadic positions from dyadic subpositions',()=>{
  const parent=new Element();const projection={...frame,valenceRows:[{...frame.valenceRows[0],valenceArity:'monadic'},{...frame.valenceRows[1]}]};
  const section=appendValenceAnalysis(doc,parent,projection,{general:true});
  assert.deepEqual(section.querySelector('tbody').children.map(row=>row.children[2].textContent),['+va¹-va²','+va']);
  assert.equal(appendValenceAnalysis(doc,parent,{authorizationStatus:'blocked',valenceRows:frame.valenceRows}),null);
});

test('compact single-object history comes only from its authenticated application projection',()=>{
  const projection={authorizationStatus:'authorized',valenceRows:[{slotId:'valence',prefixOrder:1,expression:'+tē',valenceArity:'monadic',derivationalLevel:null}]};
  const history={authorizationStatus:'authorized',frameRole:'classical-nahuatl-vnc-derivation-explanation-projection',participantRows:[{targetCarrierKind:'subject',governor:'subject'},{targetCarrierKind:'object',participantId:'causee',governor:'causative',derivationalLevel:1,prominence:'mainline',sounded:true}]};
  const row=appendValenceAnalysis(doc,new Element(),projection,{history}).querySelector('tbody').children[0];
  assert.equal(row.children[1].textContent,'Causative suffix');assert.equal(row.children[2].textContent,'+tē');
  const unknown=appendValenceAnalysis(doc,new Element(),projection).querySelector('tbody').children[0];assert.equal(unknown.children[1].textContent,'—');
});
