import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {presentParticleComposition} from '../ui/composition/particle_composition.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const particle=id=>r.executeClassicalGrammarApplicationRequest({operationId:'particle:result',args:[r.buildClassicalNahuatlParticleSourceFrame(id)]}).canonicalResult;
const ma=particle('l3-ma'),zo=particle('l3-zo');
const selection=r.executeClassicalGrammarApplicationRequest({operationId:'particle:negative-selection',args:[{precedingParticleResultFrame:ma,sentenceKind:'wish'}]}).canonicalResult;
test('contextual prefix joins an attested following particle with exact custody, never a free ca adjunct',()=>{
 const binding=r.issueClassicalNahuatlParticleSentenceBindingFrame('particle:negative-attachment',selection);
 assert.equal(binding.authorizationStatus,'authorized');
 const make=(a,b)=>r.executeClassicalGrammarApplicationRequest({operationId:'particle:negative-attachment',args:[{negativeSelectionFrame:a,followingParticleResultFrame:b}]});
 const app=make(selection,zo),out=app.canonicalResult;
 assert.equal(app.authorizationStatus,'authorized'); assert.equal(out.surface,'mā cazo');
 assert.equal(out.negativeSelectionFrame,selection);assert.equal(out.followingParticleResultFrame,zo);
 assert.equal(out.negativeSelectionFrame.precedingParticleResultFrame,ma);
 assert.equal(r.isClassicalNahuatlParticleResultFrame(out),true);
 assert.equal(r.issueClassicalNahuatlParticleSentenceBindingFrame('sentence:particle-adjunction',out).authorizationStatus,'authorized');
 for(const [a,b] of [[{...selection},zo],[selection,{...zo}],[selection,ma]]) {
  assert.equal(r.buildClassicalNahuatlNegativeParticleAttachment({negativeSelectionFrame:a,followingParticleResultFrame:b}).authorizationStatus,'blocked');
  try { assert.notEqual(make(a,b).authorizationStatus,'authorized'); } catch(error) { assert.match(error.message,/forbidden-authority/); }
 }
 assert.equal(r.issueClassicalNahuatlParticleSentenceBindingFrame('particle:negative-attachment',{...selection}).authorizationStatus,'blocked');
 assert.equal(r.getClassicalNahuatlParticleReloadInputs(out),null,'must not silently reload as a lexical particle and discard selection ancestry');
});
test('an authentic prefix selection is labeled as incomplete prefix material, not a sentence',()=>{
 const nodes=new Map();for(const id of ['composition-result-cue','classical-result-outline-structure-analysis-heading'])nodes.set(id,{textContent:'',childNodes:[]});
 const label={textContent:'',childNodes:[]};
 const doc={defaultView:r,getElementById:id=>nodes.get(id),querySelector:()=>null,querySelectorAll:()=>[]};
 presentParticleComposition(doc,{acceptedResult:selection,card:{querySelector:()=>label},action:'continue'});
 assert.equal(label.textContent,'Accepted negative prefix');
 assert.match(nodes.get('composition-result-cue').textContent,/following/);
});

test('the existing Result picker rejects an incompatible following particle before Make',()=>{
 const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=source.indexOf('    function canClassicalSavedResultFillBinding(');
 const context=vm.createContext({targetObject:r});
 vm.runInContext(source.slice(start,source.indexOf('\n    function ',start+1)),context);
 const owner=r.issueClassicalNahuatlParticleSentenceBindingFrame('particle:negative-attachment',selection);
 const binding={operationId:'particle:negative-attachment',family:'particle-sentence',exactResult:selection,requiredResultRoles:['particle-adjunct'],ownerBindingFrame:owner};
 assert.equal(context.canClassicalSavedResultFillBinding(binding,zo),true);
 assert.equal(context.canClassicalSavedResultFillBinding(binding,ma),false);
 assert.equal(context.canClassicalSavedResultFillBinding(binding,{...zo}),false);
 const command=r.selectClassicalNahuatlNegativeParticleFrame({precedingParticleResultFrame:ma,sentenceKind:'command'});
 assert.equal(r.buildClassicalNahuatlNegativeParticleAttachment({negativeSelectionFrame:command,followingParticleResultFrame:zo}).surface,'mā cazo');
 const admonition=r.selectClassicalNahuatlNegativeParticleFrame({precedingParticleResultFrame:ma,sentenceKind:'admonition'});
 assert.equal(r.buildClassicalNahuatlNegativeParticleAttachment({negativeSelectionFrame:admonition,followingParticleResultFrame:zo}).authorizationStatus,'blocked');
});
