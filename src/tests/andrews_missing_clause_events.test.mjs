import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const extract=name=>{const a=source.indexOf(`    function ${name}(`);assert.ok(a>=0);return source.slice(a,source.indexOf('\n    function ',a+20));};
class Element{constructor(tag){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.listeners={};}setAttribute(){}append(...x){this.children.push(...x);}appendChild(x){this.children.push(x);}addEventListener(k,f){this.listeners[k]=f;}}
const v=(stem,subject='1sg',extra={})=>r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,verbClass:stem==='mati'?'B':'A',sourceValence:'intransitive',subject,mood:'indicative',tense:'present',...extra}]}).canonicalResult;
const n=(subject,kind='customary-agentive-full')=>r.executeClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[{constructionKind:'predicate-nominalization',nominalizationKind:kind,canonicalVncResult:v(kind==='future-agentive'?'maca':'mati',subject,{sourceValence:'projective-nonhuman',objectKind:'nonspecific-nonhuman',tense:kind==='future-agentive'?'future':'customary-present'}),subject,state:'absolutive',numberConnector:kind==='future-agentive'?'qui':'silent'}]}).canonicalResult;
function ui(a,b,selections,id){
 const controller=r.createClassicalClauseRelationController();controller.captureCurrentResult('principal',a);controller.captureCurrentResult('adjoined',b);
 let executions=0;const session=createConstructionSession({isSource:x=>x===a||x===b,isResult:()=>true,execute:packet=>{executions++;return controller.compose(packet.choices);},present:()=>true});session.restore(a);
 const ctx={targetObject:{...r,document:{createElement:t=>new Element(t)}},ActiveClassicalGrammarResultBinding:null,ClassicalClauseRelationSelections:{...selections},ActiveClassicalClauseRelationResult:null,ClassicalExplicitClauseRelationIntent:'',ClassicalClauseRelationStatusMessage:'',formatClassicalClauseRelationValue:x=>x,compactClassicalChoiceMenu(){},
 refreshClassicalClauseRelationWorkflow(){const d=controller.buildDecisionContract(ctx.ClassicalClauseRelationSelections);session.stage({source:a,route:{operation:selections.relation},slots:[{role:'principal',exact:a},{role:'adjoined',exact:b}],choices:{...ctx.ClassicalClauseRelationSelections},legalMoves:[],ready:d.authorizationStatus==='authorized',execution:{choices:{...ctx.ClassicalClauseRelationSelections},signature:JSON.stringify(ctx.ClassicalClauseRelationSelections)}});}};
 vm.createContext(ctx);for(const name of ['CLASSICAL_CLAUSE_RELATION_DECISION_KEYS','CLASSICAL_CLAUSE_RELATION_DECISION_LABELS']){const start=source.indexOf(`    const ${name} = Object.freeze({`);vm.runInContext(source.slice(start,source.indexOf('\n    });',start)+8),ctx);}
 for(const name of ['setClassicalClauseRelationDecision','createClassicalClauseRelationDecisionControl'])vm.runInContext(extract(name),ctx);
 const decision=controller.buildDecisionContract(selections).decisions.find(x=>x.id===id);assert.ok(decision,id);
 const field=ctx.createClassicalClauseRelationDecisionControl(decision),select=field.children.find(x=>x.tagName==='SELECT');
 return {controller,session,select,field,get executions(){return executions;},change(value){select.value=value;select.listeners.change();}};
}
test('negative-standard control transports its own in decision without changing point in or accepted Result',()=>{
 const a=n('1sg'),b=n('2sg'),x=ui(a,b,{relation:'comparison',comparisonRoute:'comparative-tachcauh-hualcah',principalNnc:'tachcauh',degreeMarker:'oc',negativeIntroducer:'in-ahmo-iuh',copula:'no',adjunctorIn:'yes',negativeStandardIn:'yes',sentenceType:'declarative'},'negative-standard-in');
 assert.equal(x.field.children[0].textContent,'Use in before the negative standard');
 assert.deepEqual(x.select.children.filter(o=>!o.disabled).map(o=>o.value),['yes','no']);
 x.change('no');assert.ok(x.session.position.accepted.result===a);assert.equal(x.executions,0);assert.equal(x.session.make(),true,x.session.position.failure?.blockReason);
 const result=x.session.position.accepted.result;assert.match(result.surface,/, ahmō iuh titlamatini/u);assert.equal(result.operationFrame.choices.adjunctorIn,true);assert.equal(result.operationFrame.choices.negativeStandardIn,false);
});
test('first-person control stages later silence for conjunction and deverbal supplementation until explicit Make',()=>{
 for(const [a,b,selections,expected] of [[v('cuīca'),v('mati'),{relation:'conjunction',coordinationRelation:'unmarked',coordinationType:'additive',clauseLevel:'principal',polarity:'positive',leftContext:'present',rightwardModifier:'none',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',adjoinedFunction:'none'},'Nicuīca mati.'],[v('cuīca','1pl'),n('1pl','future-agentive'),{relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'},'Ticuīcah tlamacazqueh.']]){
  const x=ui(a,b,{...selections,contextualSilentFirstPerson:'absent'},'contextual-silent-first-person');
  assert.deepEqual(x.select.children.filter(o=>!o.disabled).map(o=>o.value),['absent','present']);
  x.change('present');assert.ok(x.session.position.accepted.result===a);assert.equal(x.executions,0);assert.equal(x.session.make(),true,x.session.position.failure?.blockReason);
  assert.equal(x.session.position.accepted.result.surfaceRealization,expected);assert.ok(x.controller.getCapturedCanonicalResult('adjoined')===b);
 }
});
