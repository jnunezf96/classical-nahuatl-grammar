import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Element} from './helpers/organization_dom.mjs';
import {presentParticleComposition} from '../ui/composition/particle_composition.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';

const nonces=JSON.parse(readFileSync(new URL('./fixtures/nonce_particle_composition_20261023.json',import.meta.url)));
function fixture(){
  const root=new Element(),plan=new Element();plan.id='classical-capability-operation-plan';
  plan.dataset.classicalCapabilityOperationId='particle:result';
  plan.dataset.classicalCapabilityTypedSourceBindingOperation='particle:result';root.append(plan);
  const make=(tag,id,text='',parent=root)=>{const node=new Element(tag);node.id=id;node.textContent=text;parent.append(node);return node;};
  const source=make('h2','classical-stage-source-heading','Source');
  const flow=make('span','flow');flow.className='composition-current-source';const sourceLabel=make('span','source-label','Source',flow);make('span','surface',nonces.vnc,flow);
  const bucket=make('section','bucket','',plan);bucket.dataset.buildOwnerSlot='material';const heading=make('h3','heading','Inputs and readings',bucket);heading.className='composition-formula-slot__heading';
  const control=make('select','particle-choice','',bucket);control.value='l3-auh-conjunctor';control.dataset.classicalCapabilityChoiceId='particleId';let calls=0;control.addEventListener('change',()=>calls++);
  const cue=make('p','composition-result-cue','Keep this sentence or prepare its next change.');
  const outline=make('h3','classical-result-outline-structure-analysis-heading','Sentence');
  const card=make('section','card'),scope=make('span','scope','Sentence',card);scope.className='classical-result-continuation-card__scope';
  const exact=Object.freeze({surface:'auh',authorizationStatus:'authorized'});
  const doc={getElementById:id=>root.querySelector('#'+id),querySelector:s=>root.querySelector(s),defaultView:{isClassicalNahuatlParticleResultFrame:r=>r===exact}};
  return{doc,root,plan,source,sourceLabel,heading,control,cue,outline,card,scope,exact,calls:()=>calls};
}
test('standalone particle keeps the nonce Source visibly retained and native material intact',()=>{
  const f=fixture();presentParticleComposition(f.doc,{acceptedResult:null,card:f.card});
  assert.equal(f.source.textContent,'Retained Source');assert.equal(f.sourceLabel.textContent,'Retained Source');assert.equal(f.heading.textContent,'Particle expression');
  assert.equal(f.control.value,'l3-auh-conjunctor');assert.equal(f.control.parentElement.id,'bucket');f.control.listeners.change[0]();assert.equal(f.calls(),1);
  assert.equal(f.outline.textContent,'Sentence','pending particle cannot relabel an accepted clause');
  f.plan.dataset.classicalCapabilityOperationId='vnc:application';presentParticleComposition(f.doc,{acceptedResult:null,card:f.card});
  assert.equal(f.source.textContent,'Source');assert.equal(f.sourceLabel.textContent,'Source');assert.equal(f.heading.textContent,'Inputs and readings');assert.equal(f.root.querySelector('#surface').textContent,nonces.vnc);
});
test('accepted particle wording follows the exact owner Result, independent of pending route or spelling',()=>{
  const f=fixture();f.plan.dataset.classicalCapabilityOperationId='nnc:ordinary';
  presentParticleComposition(f.doc,{acceptedResult:f.exact,card:f.card,action:'change'});
  assert.equal(f.outline.textContent,'Particle expression');assert.equal(f.scope.textContent,'Accepted particle expression');assert.match(f.cue.textContent,/accepted particle expression/);
  presentParticleComposition(f.doc,{acceptedResult:{...f.exact},card:f.card});
  assert.equal(f.outline.textContent,'Sentence');assert.equal(f.scope.textContent,'Sentence');assert.match(f.cue.textContent,/Keep this sentence/);
});
test('fresh nonce spellings and copied particles cannot supply invariant lexical identity',async()=>{
  const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
  for(const word of Object.values(nonces))assert.equal(r.isClassicalNahuatlParticleSourceFrame(r.buildClassicalNahuatlParticleSourceFrame(word)),false);
  const source=r.buildClassicalNahuatlParticleSourceFrame('l3-auh-conjunctor'),result=r.buildClassicalNahuatlParticleResultFrame(source);
  assert.equal(r.isClassicalNahuatlParticleResultFrame(result),true);assert.equal(r.isClassicalNahuatlParticleResultFrame({...result}),false);
  assert.notEqual(r.buildClassicalNahuatlParticleResultFrame({...source}).authorizationStatus,'authorized');
});
test('a captured particle awaiting its next operation never presents basal NNC slots as its Build',()=>{
 const f=fixture(),navigator=new Element(),operation=new Element('select'),formula=new Element('section');
 navigator.id='classical-capability-navigator';navigator.dataset.classicalCapabilitySourceRole='exact-owner-issued-result';
 operation.id='classical-capability-navigator-operation';operation.value='';formula.dataset.buildFormula='nnc';f.root.append(navigator,operation,formula);
 f.doc.defaultView.getActiveClassicalGrammarResultSourceCapture=()=>({canonicalResult:f.exact});
 f.doc.querySelectorAll=s=>f.root.querySelectorAll(s);
 presentParticleComposition(f.doc,{acceptedResult:f.exact,card:f.card});assert.equal(formula.hidden,true);
 operation.value='particle:result';presentParticleComposition(f.doc,{acceptedResult:f.exact,card:f.card});assert.equal(formula.hidden,false,'presentation releases only its own suppression on selecting a real operation');
 operation.value='';f.doc.defaultView.getActiveClassicalGrammarResultSourceCapture=()=>({canonicalResult:{...f.exact}});
 presentParticleComposition(f.doc,{acceptedResult:f.exact,card:f.card});assert.equal(formula.hidden,false,'copied same-spelling material cannot trigger exact-particle context');
});
