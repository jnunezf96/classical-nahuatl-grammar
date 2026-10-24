import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {projectResultForEditing,getResultEditTargets} from '../ui/composition/result_editing.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket,getConstructionLayerReadiness} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {getAuthorityControl, projectAuthoredChoice} from '../ui/composition/authority_control.mjs';
import {Element} from './helpers/organization_dom.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_conjunct_nnc_reinflection_20261023.json',import.meta.url)));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function nominal(stem=f.stems[0],sourceClass='tl-1-a'){
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});
 const op=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',humanness:'human',state:'absolutive',predicateFormation:'source-stem'});
 const a=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,op]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;
}
function group(right){const left=nominal(f.stems[1]),conjuncts=[left,right].map((x,i)=>r.buildClassicalNahuatlClauseCompositionSourceFrame(x,{referenceId:`noun-edit-${i}`}));const a=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[{operationKind:'conjunction',conjuncts,options:{relation:'marked',coordinationType:'additive',level:'principal',polarity:'positive',rightwardModifier:'oc',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',leftContextAbsent:false,adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'comma'}}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
const part=root=>getResultEditTargets(r,root).find(x=>x.path.length===2&&x.path[1]===1);
function packet(root,choices){const target=part(root),inner={kind:'request',operation:'nnc:ordinary',source:target.node,request:{operationId:'nnc:ordinary',args:[target.node,choices]}};return {kind:'result-edit',operation:inner.operation,edit:{action:'change',root,target:target.node,path:target.path},inner};}
test('same conjunct repeatedly changes subject state and possessor after Make with exact whole custody',()=>{
 const original=nominal(),source=original.sourceFrame;let root=group(original);
 const session=createConstructionSession({isSource:x=>Boolean(projectResultForEditing(r,x)),isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});session.restore(root,null);
 const sibling=root.conjuncts[0];
 for(const [choices,subject,state,possessor] of [[{subject:'1sg'},'1sg','absolutive',''],[{state:'possessive',possessor:'1sg'},'1sg','possessive','1sg'],[{possessor:'2sg'},'1sg','possessive','2sg'],[{subject:'2sg'},'2sg','possessive','2sg'],[{state:'absolutive'},'2sg','absolutive','']]){
  const target=part(root).node,nav=r.getClassicalGrammarApplicationCapabilityNavigator(target),route=nav.operations.find(x=>x.operationId==='nnc:ordinary');
  assert.equal(route?.availabilityStatus,'available','made conjunct must offer its noun-clause choices again');assert.equal(route.ownerProbeInputResult,target);
  const p=packet(root,choices),before=r.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(r,p);
  assert(preview?.isCurrent(),JSON.stringify({choices,leaf:r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{...r.getClassicalNahuatlOrdinaryNncReinflectionContext(target).selections,...choices}).blockReason}));assert.equal(getConstructionLayerReadiness(r,p).ready,true);assert.equal(session.position.accepted.result,root);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);assert.equal(projectResultForEditing(r,preview.canonicalResult),null);
  session.stage({source:target,route:{operation:'nnc:ordinary'},slots:[{role:'selected-constituent',exact:target}],choices,legalMoves:[],ready:true,execution:p});assert.equal(session.position.accepted.result,root);assert.equal(session.make(),true);
  const next=session.position.accepted.result,changed=part(next).node;assert.equal(changed.sourceFrame,source);assert.equal(changed.operationFrame.subject,subject);assert.equal(changed.operationFrame.state,state);assert.equal(changed.operationFrame.possessor,possessor);assert.equal(next.conjuncts[0],sibling);assert.deepEqual(next.relationFrame,root.relationFrame);assert.equal(next.surfaceRealization,preview.surface);assert.equal(original.operationFrame.subject,'3sg');root=next;
 }
});
test('a sentence-wrapped ordinary conjunct retains current sentence choices while changing its nucleus',()=>{
 const noun=nominal(f.stems[2]),a=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:sentence-surface',args:[noun.typedSlotFrame,{sentenceType:'yes-no-cuix',polarity:'negative'}]});assert.equal(a.authorizationStatus,'authorized');
 const root=group(a.canonicalResult),p=packet(root,{state:'possessive',possessor:'1sg',subject:'1sg'}),preview=previewConstructionPacket(r,p);assert(preview?.isCurrent());
 const made=executeConstructionPacket(r,p);assert.equal(made.authorizationStatus,'authorized',made.blockReason);const child=part(made.canonicalResult).node;assert.equal(child.sourceFrame,noun.sourceFrame);assert.equal(child.sentenceFrame.sentenceType,'yes-no-cuix');assert.equal(child.sentenceFrame.polarity,'negative');assert.equal(child.sentenceFrame.finalPunctuation,'?');assert.equal(child.operationFrame.subject,'1sg');assert.equal(child.operationFrame.possessor,'1sg');assert.equal(made.canonicalResult.surfaceRealization,preview.surface);
 const second=executeConstructionPacket(r,packet(made.canonicalResult,{possessor:'2sg'}));assert.equal(second.authorizationStatus,'authorized');assert.equal(part(second.canonicalResult).node.operationFrame.possessor,'2sg');assert.equal(part(second.canonicalResult).node.sentenceFrame.sentenceType,'yes-no-cuix');
});
test('copied whole or child cannot authorize reinflection; invalid choices preserve accepted whole',()=>{
 const child=nominal(),root=group(child);
 assert.equal(r.getClassicalNahuatlOrdinaryNncReinflectionContext({...child}),null);
 assert.equal(r.getClassicalNahuatlOrdinaryNncReinflectionContext({...child.sentenceFrame}),null);
 for(const copy of [{...child},{...child.sentenceFrame}]){assert.equal(r.evaluateClassicalNahuatlOrdinaryNnc(copy,{subject:'1sg'}).authorizationStatus,'blocked');assert.throws(()=>r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[copy,{subject:'1sg'}]}),/forbidden-authority/);}
 const p=packet(root,{state:'possessive',possessor:'invalid'}),before=r.getClassicalGrammarWorkspaceHistorySnapshot();assert.equal(previewConstructionPacket(r,p),null);assert.equal(getConstructionLayerReadiness(r,p).ready,false);assert.equal(executeConstructionPacket(r,p),null);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
});
test('a styled Possessor menu cannot replace the native owner used for conditional visibility',()=>{
 const wrapper=new Element('label'),tools=new Element(),display=new Element('select'),native=new Element('select');
 display.id='classical-rule-logic-nnc-possessor-choices';display.dataset.classicalCompactChoiceDisplay='true';
 native.id='classical-rule-logic-nnc-possessor';native.setAttribute('data-classical-rule-logic-control','nnc-possessor');
 tools.append(display);wrapper.append(tools,native);
 assert.equal(getAuthorityControl(wrapper),native);
 const availability={['classical-rule-logic-nnc-possessor']:{available:true}};
 assert.equal(availability[getAuthorityControl(wrapper).id].available,true);
});
test('reinflection retains original lexical possession restrictions and suppletive nounstem analysis',()=>{
 // These are lexical restrictions/suppletion, so use their actual Sources.
 for(const [stem,state,change] of [['mix','absolutive','possessive'],['chān','possessive','absolutive']]){
  const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem});
  const op=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3common',humanness:'nonhuman',state,possessor:state==='possessive'?'1sg':''});
  const original=r.evaluateClassicalNahuatlOrdinaryNnc(source,op);assert.equal(original.authorizationStatus,'authorized',op.blockReason||original.blockReason);
  const next=r.evaluateClassicalNahuatlOrdinaryNnc(original,{state:change,possessor:change==='possessive'?'1sg':''});assert.equal(next.authorizationStatus,'blocked');assert.equal(r.getClassicalNahuatlOrdinaryNncReinflectionContext(original).sourceFrame,source);
 }
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tēuc'}),op=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',humanness:'human',state:'absolutive'});
 const original=r.evaluateClassicalNahuatlOrdinaryNnc(source,op),possessed=r.evaluateClassicalNahuatlOrdinaryNnc(original,{state:'possessive',possessor:'1sg'});
 assert.equal(possessed.authorizationStatus,'authorized',possessed.blockReason);assert.equal(possessed.surfaceRealization,'notēucyo');
 const restored=r.evaluateClassicalNahuatlOrdinaryNnc(possessed,{state:'absolutive',subject:'1sg'});assert.equal(restored.authorizationStatus,'authorized',restored.blockReason);assert.equal(restored.sourceFrame,source);assert.equal(restored.surfaceRealization,'nitēuctli');
});

test('reentry projects authored choices even when previous editor values remain legal',()=>{
 const control={value:'3',options:[{value:'1'},{value:'2'},{value:'3'}]};
 projectAuthoredChoice(control,'1');assert.equal(control.value,'1');
 const possessor={value:'3sg',options:[{value:'1sg'},{value:'3sg'}],append(option){this.options.push(option);}};
 projectAuthoredChoice(possessor,'',{document:{createElement:()=>({})},prompt:'Choose possessor'});
 assert.equal(possessor.value,'');assert.equal(possessor.options.at(-1).textContent,'Choose possessor');
 projectAuthoredChoice(possessor,'2sg');assert.equal(possessor.value,'2sg');
});
