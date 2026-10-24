import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Element} from './helpers/organization_dom.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {projectResultForEditing} from '../ui/composition/result_editing.mjs';
import vm from 'node:vm';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_stem_nominal_possession_20261024.json',import.meta.url)));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const finite={subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
function verb(stem,extra={}){const a=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,sourceValence:'intransitive',verbClass:'A',...finite,...extra}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
const possession=(a,extra={})=>r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',a,{...finite,lateOperation:'compound',lateVariant:'accompanying-possession',compoundMatrixStem:'nemi',compoundPossessiveStem:f.nouns[0],compoundPossessor:'1sg',...extra});
function packet(a,b){return {kind:'request',operation:b.operationId,source:a,choices:b.callerSelections,request:{operationId:b.operationId,args:b.executionArgs}};}
function session(a,b){const s=createConstructionSession({isSource:()=>true,isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});s.restore(a,null);s.stage({source:a,route:{operation:b.operationId},choices:b.callerSelections,slots:[],ready:true,execution:packet(a,b)});return s;}

test('stem layer presentation delegates nominal incorporation without a fictitious VNC owner value',async()=>{
 const {syncStemLayerChoices}=await import('../ui/composition/stem_layer_choices.mjs');
 const body=new Element('div'),label=new Element('label'),native=new Element('select');native.id='classical-rule-logic-late-operation';native.value='none';
 for(const [value,text] of [['none','no added VNC derivation layer'],['compound','verbal compound'],['frequentative','frequentative']]){const o=new Element('option');o.value=value;o.textContent=text;native.append(o);}label.append(native);body.append(label);
 const doc={createElement:t=>new Element(t),getElementById:id=>body.querySelector('#'+id),defaultView:{Event:class{constructor(type,options){this.type=type;Object.assign(this,options);}}}};
 let staged=0,changed=0;native.dispatchEvent=e=>{assert.equal(e.type,'change');changed++;};
 syncStemLayerChoices(doc,{nominalAvailable:true,onNominal:()=>{staged++;return true;}});
 const menu=doc.getElementById('classical-stem-layer');assert(menu);assert.equal(menu.dataset.classicalMirrorsControl,native.id);assert(native.hidden);
 menu.value='nominal-incorporation';menu.listeners.change[0]();assert.equal(staged,1);assert.equal(native.value,'none');assert.equal(changed,0);
 menu.value='compound';menu.listeners.change[0]();assert.equal(native.value,'compound');assert.equal(changed,1);
 assert.equal(menu.dataset.buildTaskDisplay,'true','cross-owner display retains its explicit per-option inventory addresses');
 syncStemLayerChoices(doc,{nominalAvailable:true,nominalActive:true});assert(label.hidden);
 syncStemLayerChoices(doc,{nominalAvailable:true,nominalActive:false});assert.equal(label.hidden,false,'returning to the native stem route releases the temporary presentation');
 syncStemLayerChoices(doc,{nominalAvailable:false,onNominal:()=>{throw Error('stale route');}});menu.value='nominal-incorporation';menu.listeners.change[0]();assert.equal(staged,1);assert.equal(native.value,'compound');assert(menu.options.find(o=>o.value==='nominal-incorporation').disabled);
});

test('accompanying possession exposes its existing variant and required noun/possessor controls',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const variants=code.slice(code.indexOf('const CLASSICAL_LATE_VARIANT_IDS_BY_OPERATION'),code.indexOf('function syncClassicalLateVariantControlForOperation'));
 assert.match(variants,/compound: Object.freeze\(\[[\s\S]*?"accompanying-possession"/);
 const controls=code.slice(code.indexOf('const familyControls = {',code.indexOf('function syncClassicalLessons27282933Closure')),code.indexOf('const initialICopyControl',code.indexOf('function syncClassicalLessons27282933Closure')));
 for(const id of ['compound-possessive-stem','compound-possessor'])assert.match(controls,new RegExp('"classical-rule-logic-'+id+'":\\s*operation === "compound" && variant === "accompanying-possession"'));
});

test('Andrews accompanying possession has an owner-issued possessive NNC plus ye compound, preview stages and only Make accepts',()=>{
 const a=verb('cah'),b=possession(a);assert.equal(b.bindingStatus,'ready',b.blockReason);assert.equal(b.exactInputResult,a);
 const before=r.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(r,packet(a,b));assert(preview?.isCurrent());assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 const s=session(a,b);assert.equal(s.position.accepted.result,a);assert(s.make());const c=s.position.accepted.result;
 assert.equal(c.baseApplicationFrame,a);assert.equal(c.operationFrame.operationFacts.caToYeEmbedAlternation,true);
 assert.equal(c.supplementaryResultFrame.supplementFrame.predicateStem,f.nouns[0]);assert.equal(c.supplementaryResultFrame.supplementFrame.possessor,'1sg');assert.equal(c.supplementaryResultFrame.authorizationStatus,'authorized');assert.equal(c.surfaceRealization,preview.surface);
});

test('possession keeps missing noun/possessor and wrong or copied embed rejected; ordinary compound still works',()=>{
 const a=verb('cah');
 for(const [input,choices] of [[a,{compoundPossessiveStem:''}],[a,{compoundPossessor:''}],[verb(f.verbs[0]),{}],[{...a},{}]]){
  const b=possession(input,choices);assert.notEqual(b.bindingStatus,'ready');const x=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:b.executionArgs||[b.ownerRequest]});assert.equal(x.authorizationStatus,'blocked');
 }
 const b=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',verb(f.verbs[1]),{...finite,lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'nemi'});assert.equal(b.bindingStatus,'ready',b.blockReason);
});

function noun(stem){
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'});
 const op=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3sg'});
 const a=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,op]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;
}
function nominalRequest(a,n,stem){return {constructionKind:'nominal-embed-vnc',relation:'object',route:'object',subject:'3sg',mood:'indicative',tense:'present',voice:'active',source:{embedStem:stem,embedClass:'tl',embedSourceClass:'tl-1-a',embedConstituent:{kind:'ordinary-nnc',stem,resultFrame:n},matrixStem:f.verbs[2],matrixValence:'specific-projective',matrixVerbClass:'A',matrixConstituent:{kind:'vnc-result',stem:f.verbs[2],resultFrame:a}}};}
test('nominal incorporation retains both exact operands, lowers valence, and accepts only on Make',()=>{
 const stem=f.nouns[1]+'a',n=noun(stem),a=verb(f.verbs[2],{sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3sg'});
 const b=r.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',a);
 assert(b.bindingIds.includes('nominal-embed:matrix-vnc-result'));
 const c=r.issueClassicalNahuatlFormationResultBindingCompletionFrame(b,'nominal-embed:matrix-vnc-result','nominal-embed-constituent',n);assert.equal(c.authorizationStatus,'authorized',c.blockReason);assert.equal(c.primaryExactResult,a);assert.equal(c.additionalExactResult,n);
 const request=nominalRequest(a,n,stem),p={kind:'request',operation:'grammar:nominal-construction',source:a,request:{operationId:'grammar:nominal-construction',args:[request]}};
 const before=r.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(r,p);assert(preview?.isCurrent());assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 const s=createConstructionSession({isSource:()=>true,isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});s.restore(a,null);s.stage({source:a,route:{operation:p.operation},slots:[{role:'nominal-embed-constituent',exact:n}],choices:{relation:'object'},execution:p,ready:true});assert.equal(s.position.accepted.result,a);assert(s.make());
 const result=s.position.accepted.result,facts=result.sourceAuthorizationFrame.lexicalFacts;assert.equal(facts.capturedMatrixVncResult,a);assert.equal(facts.capturedEmbedResult,n);assert.equal(result.canonicalResult.normalizedRequest.sourceValence,'intransitive');assert.equal(result.wordSurface,preview.surface);
});
test('nominal picker and execution reject copied noun, wrong role and incompatible intransitive matrix',()=>{
 const stem=f.nouns[2]+'a',n=noun(stem),a=verb(f.verbs[2],{sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3sg'}),b=r.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',a);
 for(const [role,input] of [['nominal-embed-constituent',{...n}],['nominal-embed-constituent',a],['compound-matrix-constituent',n]])assert.equal(r.issueClassicalNahuatlFormationResultBindingCompletionFrame(b,'nominal-embed:matrix-vnc-result',role,input).authorizationStatus,'blocked');
 for(const request of [nominalRequest(a,{...n},stem),nominalRequest({...a},n,stem),nominalRequest(verb(f.verbs[2]),n,stem)]){
  const p={kind:'request',operation:'grammar:nominal-construction',source:a,request:{operationId:'grammar:nominal-construction',args:[request]}};
  assert.equal(previewConstructionPacket(r,p),null);
  let rejected;try{rejected=executeConstructionPacket(r,p)?.authorizationStatus==='blocked';}catch(error){assert.match(error.message,/forbidden-authority|exact|authorized/);rejected=true;}assert.equal(rejected,true);
 }
});
test('final renderer projection refreshes the mirror after native enabling, with exact owner availability',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=verb(f.verbs[0]),navigator=r.getClassicalGrammarApplicationCapabilityNavigator(a);let shown;
 const ctx=vm.createContext({targetObject:{...r,document:{getElementById:()=>null}},ActiveClassicalGrammarCapabilityNavigator:navigator,getActiveClassicalGrammarResultBinding:()=>null,syncStemLayerChoices:(doc,state)=>shown=state});
 const start=code.indexOf('    function syncClassicalStemLayerChoices('),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);ctx.syncClassicalStemLayerChoices();assert.equal(shown.nominalAvailable,true);
 assert.match(code.slice(code.indexOf('    function syncClassicalActiveResultBindingChoiceVisibility('),code.indexOf('    const ClassicalCompoundPrimitiveEmbedParents')),/syncClassicalStemLayerChoices\(\);/);
 ctx.ActiveClassicalGrammarCapabilityNavigator=r.getClassicalGrammarApplicationCapabilityNavigator({...a});ctx.syncClassicalStemLayerChoices();assert.equal(shown.nominalAvailable,false);
});

test('returning from a made noun to the exact verb Source restores its VNC Build layout',()=>{
 const a=verb(f.verbs[0]),owner=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',a,{}),controls={dataset:{classicalRuleLogicSurfaceUnit:'nnc'}},nominal={hidden:false,setAttribute(){}},stateControl={disabled:false},stateField={hidden:false,setAttribute(){},querySelector:()=>stateControl};
 assert.equal(owner.ownerInputAcceptanceProven,true);
 const ctx=vm.createContext({targetObject:{...r,document:{getElementById:id=>id==='classical-capability-navigator-operation'?{value:'vnc:derivational-operation'}:id==='classical-rule-logic-controls'?controls:null,querySelector:()=>nominal,querySelectorAll:()=>[stateField]}},ActiveClassicalGrammarCapabilityNavigator:r.getClassicalGrammarApplicationCapabilityNavigator(a),syncClassicalVncAuthorityProgressivePresentation:()=>{},getClassicalVncAuthorityProgressivePresentation:()=>({})});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=code.indexOf('    function syncClassicalRetainedVncGrammarOrganizer('),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);
 assert(ctx.syncClassicalRetainedVncGrammarOrganizer({family:'vnc-continuation',operationId:'vnc:derivational-operation',exactResult:a,ownerBindingFrame:owner}));assert.equal(controls.dataset.classicalRuleLogicSurfaceUnit,'vnc');assert(nominal.hidden);assert(stateField.hidden,'nominal State cannot remain visible inside VNC stem choices');assert(stateControl.disabled);
});
