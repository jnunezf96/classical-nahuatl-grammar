import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {resolveVncSourceClassChoice,resolveIrregularSourceAlternatives,resolveNncSourceClassValues} from '../application/classical/source_choice_coordination.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('source class coordination preserves canonical multiple alternatives and unresolved requests',()=>{
 for(const stem of ['yēc-ti-ya','ē-hua'])assert.deepEqual(resolveVncSourceClassChoice(r,stem,{valence:'intransitive'}).allowedClassIds.slice().sort(),['A','B']);
 const fixed=resolveVncSourceClassChoice(r,'tla-tla',{});assert.deepEqual(fixed.allowedClassIds,['A']);assert.equal(fixed.dropdownLocked,true);
 const empty=resolveVncSourceClassChoice(r,'',{});assert.equal(empty.determinate,false);assert.equal(empty.selectedClassId,'');
});
test('irregular alternative projection derives only from current authorized plan',()=>{
 const plan=r.buildClassicalNahuatlIrregularVncParadigmPlan('mati',{tense:'preterit',subject:'3sg'});
 assert.equal(plan.authorizationStatus,'authorized');
 const choices=resolveIrregularSourceAlternatives(plan);assert(choices.some(c=>c.stemOverride==='mah'));assert(choices.some(c=>c.stemOverride==='mat'));
 assert.deepEqual(resolveIrregularSourceAlternatives({...plan,authorizationStatus:'blocked'}),[]);
});
test('nominal open-source candidates respect shape without predicting lexical class',()=>{
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tōch',sourceClass:'in'});
 const values=resolveNncSourceClassValues(r,'tōch',{sourceFrame:source});assert(values.includes('in'));assert(values.includes('tli'));assert(!values.includes('tl-2-a'));
});
test('personal-name choices display owner default, preserve incompatible requests and reject copied resolutions',async()=>{
 const {resolvePersonalNameSourceChoice}=await import('../application/classical/source_choice_coordination.mjs');
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tōch',sourceClass:'in'});
 const parent=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'})]}).canonicalResult;
 const resolution=r.resolvePersonalNameNncExactSource({canonicalSourceResult:parent});
 assert(r.isPersonalNameNncExactSourceResolution(resolution));assert(resolution.compatibleSourceFamilyIds.length>1);
 const initial=resolvePersonalNameSourceChoice(r,{exactSource:true,resolution});assert.equal(initial.selectedValue,resolution.selectedSourceFamily);assert.equal(initial.selectionBasis,'canonical-default');
 const incompatible=resolvePersonalNameSourceChoice(r,{exactSource:true,resolution,requestedFamily:'preterit-agentive'});assert.equal(incompatible.selectedValue,'preterit-agentive');assert.equal(incompatible.resolved,false);
 assert.equal(r.evaluatePersonalNameNnc({canonicalSourceResult:parent,sourceFamily:incompatible.selectedValue,outerSubject:'3sg'}).authorizationStatus,'blocked');
 const selected=resolvePersonalNameSourceChoice(r,{exactSource:true,resolution,requestedFamily:resolution.compatibleSourceFamilyIds[0]});assert.equal(selected.resolved,true);assert.equal(selected.executionAuthority,false);
 assert.deepEqual(resolvePersonalNameSourceChoice(r,{exactSource:true,resolution:{...resolution}}).values,[]);
});
test('ti realization choices withdraw outside singular preterit rather than becoming universal alternatives',()=>{
 for(const options of [{subject:'1pl',tense:'preterit'},{subject:'1sg',tense:'distant-past'},{subject:'1sg',tense:'present'}]){
  const plan=r.buildClassicalNahuatlIrregularVncParadigmPlan('mati',{...options,mood:'indicative'});
  assert(resolveIrregularSourceAlternatives(plan).length<2);
 }
});
test('nominal full choice domain preserves coarse source analysis separately from exact classes',async()=>{
 const {resolveNncSourceChoiceDomain}=await import('../application/classical/source_choice_coordination.mjs');
 const exact=r.issueCanonicalNncSourceFrame({stem:'chichi'});
 const known=resolveNncSourceChoiceDomain(r,'chichi',{sourceFrame:exact});assert.deepEqual(known.coarseClasses,[]);assert.deepEqual(known.values,['zero']);
 const general=resolveNncSourceChoiceDomain(r,'tōch',{}, {generalUse:true});assert(!general.values.includes('tl-2-a'));assert(general.values.every(v=>['tl','tli'].includes(v)));assert.equal(general.executionAuthority,false);
});
test('actual name-control synchronization displays owner default and retains incompatible explicit choice',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm');
 const {resolvePersonalNameSourceChoice}=await import('../application/classical/source_choice_coordination.mjs');
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tōch',sourceClass:'in'});
 const parent=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'})]}).canonicalResult;
 const resolution=r.resolvePersonalNameNncExactSource({canonicalSourceResult:parent});
 const control={value:'preterit-agentive',options:['','absolutive-state-nnc','absolutive-state-truncated-inner-number','preterit-agentive'].map(value=>({value,hidden:false,disabled:false}))};
 const owner=Object.create(r);owner.document={getElementById:id=>id==='classical-personal-name-source-family'?control:null};
 const ctx={targetObject:owner,ClassicalPersonalNameChoiceParents:new WeakMap(),resolvePersonalNameSourceChoice,getActiveClassicalGrammarResultBinding:()=>({exactResult:parent,ownerBindingFrame:{ownerPreflightFrame:resolution}}),setClassicalPersonalNameControlVisible(){},syncClassicalPersonalNameSentenceControls(){}};
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=code.indexOf('    function syncClassicalPersonalNameNncControls('),b=code.indexOf('    const ClassicalNominalSupplement',a);
 vm.runInNewContext(code.slice(a,b),ctx);
 const first=ctx.syncClassicalPersonalNameNncControls();assert.equal(control.value,resolution.selectedSourceFamily);assert.equal(first.structure.sourceFamily,resolution.selectedSourceFamily);assert.equal(control.options[0].disabled,false);assert.equal(control.options[3].disabled,true);
 control.value='preterit-agentive';assert.equal(ctx.syncClassicalPersonalNameNncControls().structure,null);assert.equal(control.value,'preterit-agentive');assert.equal(control.options[3].hidden,false);
 control.value='absolutive-state-nnc';assert.equal(ctx.syncClassicalPersonalNameNncControls().structure.sourceFamily,'absolutive-state-nnc');assert.equal(control.value,'absolutive-state-nnc');
});

test('raw owner-recognized quoted designation retains its distinct reference and inner analysis limit',async()=>{
 const {resolvePersonalNameSourceChoice}=await import('../application/classical/source_choice_coordination.mjs');
 const choice=resolvePersonalNameSourceChoice(r,{requestedFamily:'opaque-quoted-designation'});assert.equal(choice.resolved,true);assert.equal(choice.structure.referenceKind,'quoted-designation');assert.equal(choice.structure.citationOuterSubject,'3common');assert.equal(choice.structure.innerAnalysisClaimed,false);
});
test('conditioned ti request is retained while inactive and reactivates in its canonical cell',async()=>{
 const {resolveIrregularSourceRequest}=await import('../application/classical/source_choice_coordination.mjs');
 const requested='mat',cell={subject:'1sg',mood:'indicative',tense:'preterit'};
 assert.equal(resolveIrregularSourceRequest(r,'mati',cell,requested),'mat');
 assert.equal(resolveIrregularSourceRequest(r,'mati',{...cell,subject:'1pl'},requested),'');
 assert.equal(resolveIrregularSourceRequest(r,'mati',{...cell,tense:'distant-past'},requested),'');
 assert.equal(resolveIrregularSourceRequest(r,'mati',cell,requested),'mat');
 assert.equal(resolveIrregularSourceRequest(r,'mati',cell,'forged'),'forged'); // active invalid requests still reach owner rejection
});
