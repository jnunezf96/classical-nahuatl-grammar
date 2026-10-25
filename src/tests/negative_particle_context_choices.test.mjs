import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const values=['statement','question','exclamation','wish','command','admonition'];
const particle=id=>r.buildClassicalNahuatlParticleResultFrame(r.buildClassicalNahuatlParticleSourceFrame(id));
const ma=particle('l3-ma'), binding=r.issueClassicalNahuatlParticleSentenceBindingFrame('particle:negative-selection',ma);
test('negative context owner exposes the distinct Andrews sentence uses and selects their negatives',()=>{
 assert.deepEqual(Array.from(binding.sentenceKindOptions||[]),values);
 for(const id of ['l3-ma','l3-tla','l3-mah'])for(const sentenceKind of values){
  const p=particle(id),out=r.selectClassicalNahuatlNegativeParticleFrame({precedingParticleResultFrame:p,sentenceKind});
  assert.equal(out.authorizationStatus,'authorized');
  assert.equal(out.selectedParticleId,id==='l3-mah'||['wish','command'].includes(sentenceKind)?'l3-ca-negative':'l3-ah-negative');
 }
 assert.equal(r.selectClassicalNahuatlNegativeParticleFrame({precedingParticleResultFrame:{...ma},sentenceKind:'wish'}).authorizationStatus,'blocked');
});
test('existing Sentence control keeps context choices only for its exact negative binding, then restores ordinary domain',()=>{
 const control={tagName:'SELECT',type:'select-one',value:'wish',dataset:{},setAttribute(){},options:values.map(value=>({value,hidden:!values.slice(0,3).includes(value),dataset:{}}))};
 const doc={getElementById:()=>control,querySelectorAll:()=>[]};
 const ctx=vm.createContext({targetObject:{...r,document:doc},ActiveClassicalGrammarResultBinding:{operationId:'particle:negative-selection',exactResult:ma,ownerBindingFrame:binding},getClassicalRuleLogicFirstAllowedValue:(v,a,f)=>a.includes(v)?v:a.includes(f)?f:a[0]});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),i=code.indexOf('    function applyClassicalRuleLogicSelectOptionAvailability(');
 vm.runInContext(code.slice(i,code.indexOf('\n    function ',i+1)),ctx);
 const j=code.indexOf('    function syncClassicalVncAuthorityOptionPresentation(');
 ctx.CLASSICAL_VNC_AUTHORITY_PRESENTATION_CONTRACT={removedOptionValuesByControlId:{'classical-rule-logic-sentence-surface':[]}};ctx.normalizeClassicalBasalUnitForRendering=x=>x;
 vm.runInContext(code.slice(j,code.indexOf('\n    function ',j+1)),ctx);
 ctx.applyClassicalRuleLogicSelectOptionAvailability('classical-rule-logic-sentence-surface',values.slice(0,3),'statement');
 assert.equal(control.value,'wish');assert.equal(control.options[3].disabled,false);assert.equal(control.options[3].hidden,false);
 ctx.ActiveClassicalGrammarResultBinding={operationId:'nnc:ordinary'};
 ctx.applyClassicalRuleLogicSelectOptionAvailability('classical-rule-logic-sentence-surface',values.slice(0,3),'statement');
 ctx.syncClassicalVncAuthorityOptionPresentation('nnc','direct');
 assert.equal(control.value,'statement');assert.equal(control.options[3].disabled,true);assert.equal(control.options[3].hidden,true);
 ctx.ActiveClassicalGrammarResultBinding={operationId:'particle:negative-selection',exactResult:ma,ownerBindingFrame:{...binding}};
 ctx.applyClassicalRuleLogicSelectOptionAvailability('classical-rule-logic-sentence-surface',values.slice(0,3),'statement');
 assert.equal(control.options[3].disabled,true);
 const shell=readFileSync(new URL('../ui/shell/classical_shell.mjs',import.meta.url),'utf8');
 const select=shell.slice(shell.indexOf('id="classical-rule-logic-sentence-surface"')).split('</select>')[0];
 for(const value of values)assert.match(select,new RegExp(`value="${value}"`));
});
