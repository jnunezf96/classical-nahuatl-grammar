import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {createResultInformation} from '../ui/composition/result_information.mjs';
import {createResultActions} from '../ui/composition/result_actions.mjs';
class Node extends Element { get parentNode(){return this.parentElement;} }
function fixture(){
  const root=new Node(),surface=new Node();surface.id='classical-rule-logic-surface';root.append(surface);
  const doc={createElement:tag=>new Node(tag),getElementById:id=>root.querySelector(`#${id}`)};
  return {root,surface,doc};
}
function resultCard(f,exact){
  const card=new Node('section'),content=new Node('strong'),editing=new Node('section'),continuation=new Node('button');
  card.className='classical-result-continuation-card';content.className='classical-result-continuation-card__content';content.textContent=exact.surface;editing.id='classical-result-editing';
  continuation.dataset.classicalResultContinuationKind='exact-result-to-source';card.append(content,editing,continuation);f.surface.append(card);
  const copy=new Node('button'),status=new Node('p');copy.dataset.classicalRuleSurfaceAction='copy-result';status.className='classical-rule-surface__action-status';status.textContent='Copied.';f.surface.append(copy,status);
  const seen=[];copy.addEventListener('click',()=>seen.push(exact));continuation.addEventListener('click',()=>seen.push(exact));
  return {card,content,editing,continuation,copy,status,seen};
}
test('Copy and live feedback follow the exact written form, with one settled toolbar across refresh',()=>{
  const f=fixture(),exact={surface:'Cuēyōmēxāhua.'},r=resultCard(f,exact),organize=createResultInformation(f.doc);
  const getIdentity=card=>card===r.card?exact:null,refresh=()=>organize({card:r.card,getIdentity,isCurrentComposition:()=>false});
  refresh();const tools=r.copy.parentElement;
  assert.equal(tools.parentElement,r.card);assert.equal(r.content.nextElementSibling,tools);assert.equal(tools.nextElementSibling,r.editing);
  assert.equal(r.status.parentElement,tools);assert.equal(r.status.textContent,'Copied.');
  const removals=[tools,r.copy,r.status,r.continuation].map(n=>n.removals);refresh();refresh();
  assert.equal(f.surface.querySelectorAll('.composition-result-tools').length,1);assert.deepEqual([tools,r.copy,r.status,r.continuation].map(n=>n.removals),removals);
  r.copy.listeners.click[0]();r.continuation.listeners.click[0]();assert.deepEqual(r.seen,[exact,exact]);
});
test('same spelling cannot transfer a former Result copy or continuation to a different exact Result',()=>{
  const f=fixture(),first={surface:'Cuēyōmēxāhua.'},second={surface:first.surface},a=resultCard(f,first),identities=new WeakMap([[a.card,first]]),organize=createResultInformation(f.doc);
  const refresh=card=>organize({card,getIdentity:node=>identities.get(node),isCurrentComposition:()=>false});
  refresh(a.card);const b=resultCard(f,second);identities.set(b.card,second);refresh(b.card);refresh(b.card);
  assert.equal(a.copy.closest('.classical-result-continuation-card'),a.card);assert.equal(a.continuation.closest('.classical-result-continuation-card'),a.card);
  assert.equal(b.copy.closest('.classical-result-continuation-card'),b.card);assert.equal(b.continuation.closest('.classical-result-continuation-card'),b.card);
  assert.equal(f.surface.querySelectorAll('.composition-result-tools').length,2);b.copy.listeners.click[0]();assert.deepEqual(b.seen,[second]);assert.deepEqual(a.seen,[]);
});
test('only idle Whole-result feedback is quiet; selection, requested edits and pending Remove remain announced',()=>{
  const f=fixture(),exact={surface:'Xōmēcuāpāhua.'},child={surface:'Tēcuāzēhua.'},card=new Node('section');f.root.append(card);
  let position={},record={node:exact,path:[],label:'Whole result',role:'Whole result'};
  const runtime={getClassicalConstructionPosition:()=>position,captureClassicalGrammarApplicationResult:node=>[exact,child].includes(node)?{canonicalResult:node,applicationResult:{authorizationStatus:'authorized',canonicalResult:node}}:null,isClassicalGrammarApplicationResultCapture:c=>Boolean(c)};
  f.doc.defaultView=runtime;const selection={snapshot:()=>({result:exact,record,targets:[record]})};
  const refresh=createResultActions(f.doc,{selection});refresh(card,{exact});const status=f.doc.getElementById('classical-result-edit-status');assert.equal(status.hidden,true);
  refresh(card,{exact,requestedAction:'change'});assert.equal(status.hidden,false);assert.match(status.textContent,/Change/);
  record={node:child,path:['children',0],role:'Adjunct',label:'Adjunct'};refresh(card,{exact});assert.equal(status.hidden,false);assert.match(status.textContent,/Adjunct/);
  position={construction:{route:{binding:'result-edit:remove'}}};refresh(card,{exact});assert.equal(status.hidden,false);assert.match(status.textContent,/Removal pending\. Make Result to apply/);
});
