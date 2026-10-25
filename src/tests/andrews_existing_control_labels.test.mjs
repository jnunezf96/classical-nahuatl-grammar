import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {Element} from './helpers/organization_dom.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createChoiceDesign,setChoiceDesignContext} from '../ui/composition/choice_design.mjs';
import {CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS as controls} from '../core/classical/vnc_late_operation_ui_contract.mjs';

const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
function load(ctx,names){
  for(const name of names){
    const start=code.indexOf(`    function ${name}(`);
    assert.ok(start>=0,name);
    vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);
  }
}
function dom(){
  const elements=[],create=tag=>{
    const el=new Element(tag);elements.push(el);
    el.classList.remove=name=>el.className=el.className.split(/\s+/).filter(c=>c!==name).join(' ');
    el.classList.toggle=(name,on)=>on?el.classList.add(name):el.classList.remove(name);
    el.removeAttribute=name=>{delete el.attributes[name];};
    el.dispatchEvent=event=>{for(const f of el.listeners[event.type]||[])f(event);};
    return el;
  };
  const root=create('div');root.id='classical-workbench';
  const panel=create('div');panel.id='classical-rule-logic-controls';root.append(panel);
  const doc={defaultView:{Event:class{constructor(type){this.type=type;}}},createElement:create,
    getElementById:id=>elements.find(n=>n.id===id)||null,
    querySelector:q=>q==='#classical-result-panel .classical-result-continuation-card'?null:root.querySelector(q),
    querySelectorAll:q=>q.startsWith('#classical-rule-logic-controls select[id]')?panel.querySelectorAll('select'):root.querySelectorAll(q)};
  return {create,root,panel,doc};
}
function frequentative(){
  const h=dom(),host=h.create('label');host.className='classical-rule-control';h.panel.append(host);
  const select=h.create('select');select.id='classical-rule-logic-frequentative-target';select.labels=[];host.append(select);
  for(const {value,label}of controls[select.id]){const o=h.create('option');o.value=value;o.textContent=label;select.append(o);}
  select.value='lexical-stem';
  const closest=select.closest.bind(select);select.closest=q=>q.includes(':')||q.includes('[hidden]')||q.includes('duplicate')?null:closest(q);
  const ctx=vm.createContext({targetObject:{...r,document:h.doc},ActiveClassicalGrammarResultBinding:null,ActiveClassicalVncResultSourceContinuation:null,
    syncClassicalPurposiveCoordinateControls(){},syncClassicalLateVariantControlForOperation:()=>({variantControl:null,licensedVariants:new Set(['ordinary-short-glottal'])}),
    isClassicalRecursiveCompoundContinuationFrame:()=>false,syncFutureObjectChoices(){},syncClassicalStemLayerChoices(){},syncClassicalCompoundMatrixFormation(){}});
  load(ctx,['getClassicalCompoundNonactiveScopeValues','syncClassicalLessons27282933Closure']);
  const accepted={};setChoiceDesignContext(h.root,{input:accepted,accepted,operation:'vnc:derivational-operation',binding:'test'});
  const refresh=createChoiceDesign(h.doc);
  return {...h,host,select,ctx,refresh,sync(closure){ctx.syncClassicalLessons27282933Closure({basalUnit:'vnc',state:{stem:ctx.ActiveClassicalGrammarResultBinding?'yohua':'tla-cōhua',valence:'intransitive',lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'},vncLateOperationClosureFrame:closure});refresh();}};
}
const impersonal=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'yohua',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'impersonal',nonactiveOptionId:'tla-impersonal'}]}).canonicalResult;
const owner=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',impersonal.resultFrame,{lateOperation:'frequentative',lateVariant:'ordinary-short-glottal',frequentativeTarget:'lexical-stem'});
assert.equal(owner.bindingStatus,'ready',owner.blockReason);
const objectClosure=r.evaluateClassicalNahuatlLateVncDerivation({sourceStem:'tla-cōhua',sourceValence:'intransitive',verbClass:'A',subject:'3sg',mood:'indicative',tense:'present',derivationType:'direct',voice:'active',objectKind:'none',objectPerson:'',lateOperation:'frequentative',lateVariant:'ordinary-short-glottal',frequentativeTarget:'fused-tla'});

// Andrews §27.2.1 distinguishes impersonal stem tla from §27.3.1 object fusion.
// Existing owner results supply context; this proof exercises caption projection only.
test('AD055 native and compact targets identify impersonal tla, then reset for an object Source',()=>{
  const h=frequentative();
  h.ctx.ActiveClassicalGrammarResultBinding={operationId:'vnc:derivational-operation',ownerBindingFrame:owner,exactResult:impersonal.resultFrame};
  h.sync(null);
  assert.equal(h.host.hidden,false,'the accepted tla-impersonal Source, not its original yohua editor text, owns target visibility');
  assert.equal(h.select.options.find(o=>o.value==='fused-tla').textContent,'impersonal tla');
  assert.equal(h.select.options.find(o=>o.value==='fused-tla-and-lexical-stem').textContent,'impersonal tla and lexical stem');
  assert.ok(h.host.querySelectorAll('button').some(b=>b.textContent==='impersonal tla'));
  assert.equal(h.select.value,'lexical-stem','caption synchronization must not stage a different choice');
  assert.deepEqual(h.select.options.filter(o=>!o.disabled).map(o=>o.value),['lexical-stem','fused-tla','fused-tla-and-lexical-stem']);
  h.ctx.ActiveClassicalGrammarResultBinding=null;h.sync(objectClosure);
  assert.equal(h.select.options.find(o=>o.value==='fused-tla').textContent,'fused object tla');
  assert.ok(h.host.querySelectorAll('button').some(b=>b.textContent==='fused object tla'));
  assert.ok(!h.host.querySelectorAll('button').some(b=>b.textContent.includes('impersonal')));
});

test('unissued or mismatched context uses a neutral tla caption without changing availability',()=>{
  const h=frequentative();
  for(const closure of [null,structuredClone(owner.ownerPreflightResult)]){
    h.sync(closure);
    assert.equal(h.select.options.find(o=>o.value==='fused-tla').textContent,'tla prefix');
  }
  h.ctx.ActiveClassicalGrammarResultBinding={operationId:'vnc:derivational-operation',ownerBindingFrame:owner,exactResult:{}};
  h.sync(objectClosure);
  assert.equal(h.select.options.find(o=>o.value==='fused-tla').textContent,'tla prefix');
  assert.equal(h.host.hidden,true,'a mismatched binding cannot lend its inherited tla stem to the editor Source');
  assert.ok(h.select.options.every(o=>o.disabled));
  assert.equal(h.select.value,'lexical-stem');
});

test('AD055 reload restores the saved target after its exact Source enables the domain, without Make',()=>{
  for(const [savedTarget,expected] of [['fused-tla','fused-tla'],['forged-target','lexical-stem']]){
    const h=frequentative();
    const field=(id,value)=>{const n=h.create('select');n.id=id;const o=h.create('option');o.value=value;n.append(o);n.value=value;return n;};
    const route=field('classical-capability-navigator-operation','vnc:derivational-operation');
    const late=field('classical-rule-logic-late-operation','frequentative');
    const variant=field('classical-rule-logic-late-variant','ordinary-short-glottal');
    for(const option of h.select.options)option.disabled=option.hidden=true;
    h.ctx.ActiveClassicalGrammarResultBinding={operationId:route.value,family:'vnc-continuation',bindingIds:['source-result'],ownerBindingFrame:owner,exactResult:impersonal.resultFrame};
    Object.assign(h.ctx,{
      getClassicalVncBasalReloadControls:()=>[late,variant,h.select],updateClassicalCapabilityNavigatorSelection(){},
      restoreClassicalVncPendingResultContinuation:()=>false,restoreClassicalVncReloadSourceEditorState(){},syncClassicalCapabilityApplyOperationState(){},
      getClassicalRuleLogicSurfaceState:()=>({stem:'yohua',lateOperation:late.value,lateVariant:variant.value}),
      enterClassicalGrammarResultBindingChoice(_id,options){
        assert.equal(options.allowExecution,false);
        const next=r.issueClassicalNahuatlVncContinuationBindingFrame(route.value,impersonal.resultFrame,{lateOperation:late.value,lateVariant:variant.value,frequentativeTarget:h.select.value});
        assert.equal(next.bindingStatus,'ready',next.blockReason);
        h.ctx.ActiveClassicalGrammarResultBinding={...h.ctx.ActiveClassicalGrammarResultBinding,ownerBindingFrame:next};
      },
    });
    load(h.ctx,['restoreClassicalVncReloadChoices']);
    h.ctx.restoreClassicalVncReloadChoices({operationId:route.value,controls:[{id:late.id,value:late.value},{id:variant.id,value:variant.value},{id:h.select.id,value:savedTarget}]});
    assert.equal(h.host.hidden,false);
    assert.equal(h.select.value,expected);
    assert.equal(h.ctx.ActiveClassicalGrammarResultBinding.ownerBindingFrame.callerSelections.frequentativeTarget,expected);
    assert.equal(h.ctx.ActiveClassicalGrammarResultBinding.exactResult,impersonal.resultFrame);
  }
});

function clauseChoices(id,values){
  const h=dom(),changes=[];
  const ctx=vm.createContext({targetObject:{...r,document:h.doc},ActiveClassicalGrammarResultBinding:null,
    compactClassicalChoiceMenu(){},setClassicalClauseRelationDecision:(key,value)=>changes.push([key,value])});
  const start=code.indexOf('    const CLASSICAL_CLAUSE_RELATION_DECISION_LABELS = Object.freeze({');
  vm.runInContext(code.slice(start,code.indexOf('\n    });',start)+8),ctx);
  load(ctx,['formatClassicalClauseRelationValue','createClassicalClauseRelationDecisionControl']);
  const field=ctx.createClassicalClauseRelationDecisionControl({id,values,selectedValue:values[0]});
  h.panel.append(field);const select=field.querySelector('select');
  return {select,changes,ctx};
}
test('similarity and degree captions retain Andrews vowel lengths without changing selection keys',()=>{
  for(const [id,pairs]of [
    ['same-as-marker',[
      ['zan-no-yehhuatl','zan nō yehhuātl'],
      ['zan-ye-yehhuatl','zan ye yehhuātl'],
      ['zan-ye-no-yehhuatl','zan ye nō yehhuātl'],
      ['zan-no-yeh','zan nō yeh'],
      ['zan-ye-yeh','zan ye yeh'],
      ['zan-ye-no-yeh','zan ye nō yeh'],
    ]],
    ['degree-marker',[
      ['oc-cencah-yehhuatl','oc cencah yehhuātl'],
      ['huel-oc-cencah-yehhuatl','huel oc cencah yehhuātl'],
    ]],
  ]){
    const h=clauseChoices(id,pairs.map(([value])=>value));
    assert.deepEqual(h.select.options.slice(1).map(o=>[o.value,o.textContent]),pairs);
    assert.equal(h.changes.length,0,'caption rendering does not stage or execute');
    h.select.value=pairs.at(-1)[0];h.select.listeners.change[0]();
    assert.deepEqual(h.changes,[[id,pairs.at(-1)[0]]]);
    assert.equal(h.ctx.formatClassicalClauseRelationValue('no','ic-relation'),'No');
    assert.equal(h.ctx.formatClassicalClauseRelationValue('zan-no-yeh'),'Zan no yeh','other decisions keep their labels');
  }
});
test('negative expressions leave optional in to its own control and retain owner keys',()=>{
  const keys=['inahmo','in-ahmo-iuh','in-ahmo-iuhqui','in-ahmo-mach-iuh','in-ahmo-mach-iuhqui'];
  const h=clauseChoices('negative-introducer',keys);
  assert.deepEqual(h.select.options.slice(1).map(o=>o.textContent),['ahmō','ahmō iuh','ahmō iuhqui','ahmō mach iuh','ahmō mach iuhqui']);
  assert.deepEqual(h.select.options.slice(1).map(o=>o.value),keys);
  h.select.value=keys[3];h.select.listeners.change[0]();
  assert.deepEqual(h.changes,[['negative-introducer',keys[3]]]);
  assert.equal(h.ctx.formatClassicalClauseRelationValue('in-ahmo-iuh'),'In ahmo iuh','only this decision splits the independent in choice');
  assert.equal(h.ctx.formatClassicalClauseRelationValue('in-ma'),'in mā','phrase-internal in remains');
});
test('existing purpose, concession and comparison options display source vowel lengths with stable values',()=>{
  for(const [id,pairs]of [
    ['purpose-clause-kind',[['ma-optative','mā + optative'],['ma-admonitive-lest','mā + admonitive (lest)']]],
    ['adverbial-marker',[['in-tla','in tlā'],['in-ma','in mā'],['in-tla-nel','in tlā nel'],['in-ma-nel','in mā nel'],['ma-nel','mā nel'],['ma-zo','mā zo'],['ma-zo-tel','mā zo tēl']]],
    ['superlative-adverbial',[['za-cencah','zā cencah'],['za-cencah-huel','zā cencah huel']]],
    ['incorporated-superlative',[['cenquizca','cenquīzcā'],['cemahcica','cemahcicā']]],
    ['question-collocation',[['oc-yeh-cencah-hualcah','oc yeh cencah huālcah']]],
  ]){
    const h=clauseChoices(id,pairs.map(([value])=>value));
    assert.deepEqual(h.select.options.slice(1).map(o=>[o.value,o.textContent]),pairs);
    assert.equal(h.changes.length,0,'rendering captions cannot execute or stage a selection');
  }
});

test('conjunction modifier captions use canonical written forms only in their own fields',()=>{
  const pairs=[['no','nō'],['oc','oc'],['oc-no','oc nō'],['ihuan','īhuān'],['oc-ihuan','oc īhuān'],['no-ihuan','nō īhuān'],['oc-no-ihuan','oc nō īhuān'],['ahno','ahnō'],['ahmo-no','ahmō nō'],['no-zo','nō zo'],['no-zo-eh','nō zo eh'],['ma-no-zo','mā nō zo'],['ma-no-zo-eh','mā nō zo eh'],['ahzo','ahzo'],['ahzo-eh','ahzo eh'],['ahno-zo','ahnō zo'],['ahno-zo-eh','ahnō zo eh'],['zan','zan'],['tel','tēl'],['yeceh','yēceh'],['yeh','yeh'],['neh','neh']];
  for(const[id,values]of[['rightward-modifier',pairs],['shared-modifier',[['ah','ah'],['aic','aīc']]]]){
    const h=clauseChoices(id,values.map(([v])=>v));
    assert.deepEqual(h.select.options.slice(1).map(o=>[o.value,o.textContent]),values);
    assert.equal(h.changes.length,0);h.select.value=values.at(-1)[0];h.select.listeners.change[0]();
    assert.deepEqual(h.changes,[[id,values.at(-1)[0]]]);
    assert.equal(h.ctx.formatClassicalClauseRelationValue('no','ic-relation'),'No');
    assert.equal(h.ctx.formatClassicalClauseRelationValue('aic','unrelated-field'),'Aic');
    assert.equal(h.ctx.formatClassicalClauseRelationValue('none',id),'None');
  }
});
