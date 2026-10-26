import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import * as presentation from '../ui/composition/structure_design.mjs';
import {Element} from './helpers/organization_dom.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=stem=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});const x=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',state:'absolutive'})]});assert.equal(x.authorizationStatus,'authorized');return x.canonicalResult;};
const principal=noun('canāhuac'),adjoined=noun('tomāhuac'),dimension=noun('chicāhuac');
const project=exact=>{const c=r.captureClassicalGrammarApplicationResult(exact,'dimension-presentation');return c.authorizationStatus==='authorized'&&c.canonicalResult===exact?{canonicalResult:exact,surface:exact.wordSurface||exact.surface,operationId:c.operationId}:null;};
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const extract=(ctx,name)=>{const start=code.indexOf(`    function ${name}(`);assert.ok(start>=0);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);};
for(const route of ['equality-iuhqui','equality-ihuan','similarity-iuhqui-principal'])test(`${route}: retained dimension is inspectable but excluded from active summaries and diagram`,()=>{
 const c=r.createClassicalClauseRelationController();for(const[role,exact]of Object.entries({principal,adjoined,dependent:dimension}))assert.equal(c.captureCurrentResult(role,exact).authorizationStatus,'authorized');
 const choices={relation:'comparison',comparisonRoute:route,icRelation:'no'};
 const off=presentation.projectClauseStructure(r,c,choices,project),saved=off.sources.find(s=>s.role==='dependent');
 assert.equal(saved.exact,dimension);assert.equal(saved.retainedOnly,true);assert.equal(saved.label,'Saved dimension · not included');
 const diagram=presentation.projectCapturedOperationShape({inputs:['Clause'],outputs:['Clause']},off.sources,'comparison');assert.equal(diagram.inputs.length,2);
 const ctx={targetObject:{...r,document:{getElementById:()=>({value:'clause:comparison'})}},ClassicalClauseRelationSelections:choices,getActiveClassicalGrammarResultBinding:()=>({family:'clause-relation'}),getClassicalClauseRelationControllerForRendering:()=>c,getClassicalOwnerIssuedResultProjection:project,projectClauseStructure:presentation.projectClauseStructure};vm.createContext(ctx);extract(ctx,'getClassicalComparisonSourceSummary');
 assert.equal(ctx.getClassicalComparisonSourceSummary(),'canāhuac + tomāhuac');
 choices.icRelation='yes';const on=presentation.projectClauseStructure(r,c,choices,project);assert.equal(on.sources.find(s=>s.role==='dependent').retainedOnly,false);assert.deepEqual(ctx.getClassicalComparisonSourceSummary().split(' + ').sort(),['canāhuac','tomāhuac','chicāhuac'].sort());assert.equal(c.getCapturedCanonicalResult('dependent'),dimension);
});
test('native comparison Dimension card follows required versus retained state',()=>{
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',principal);c.captureCurrentResult('adjoined',adjoined);
 const choices={relation:'comparison',comparisonRoute:'equality-ihuan',icRelation:'yes'};const lines=[];
 const ctx={targetObject:{document:{createElement:tag=>new Element(tag)}},ClassicalClauseRelationSelections:choices,comparisonCapturePresentation:presentation.comparisonCapturePresentation,formatClassicalClauseRelationValue:x=>x,createGrammarInspectorLine:(label,value)=>{lines.push([label,value]);return new Element();},appendClassicalWholeCanvasPanelActionRow(){}};vm.createContext(ctx);extract(ctx,'appendClassicalClauseRelationCaptureCard');
 const parent=new Element();ctx.appendClassicalClauseRelationCaptureCard(parent,c,'dependent',{captured:false},'dimension');assert.equal(lines.find(([k])=>k==='status')[1],'Required · not captured');
 choices.icRelation='no';lines.length=0;c.captureCurrentResult('dependent',dimension);ctx.appendClassicalClauseRelationCaptureCard(parent,c,'dependent',{captured:true,unitType:'nnc',surface:'chicāhuac'},'dimension');assert.equal(lines.find(([k])=>k==='status')[1],'Retained for reuse · not included');
});

test('clearing required dimension preserves selected comparison and blocks only until recovery',()=>{
 const c=r.createClassicalClauseRelationController();
 for(const[role,exact]of Object.entries({principal,adjoined,dependent:dimension}))c.captureCurrentResult(role,exact);
 const choices={relation:'comparison',comparisonRoute:'equality-iuhqui',icRelation:'yes',sentenceType:'none'};
 const receipt=c.compose({...choices,icRelation:'no'});assert.equal(receipt.authorizationStatus,'authorized');
 let executions=0,clear,contract;const lines=[];
 const session=createConstructionSession({isSource:x=>x===principal,isResult:x=>r.isClassicalComparisonResultFrame(x),execute:p=>{executions++;return c.compose(p.choices);},present:()=>true});session.restore(receipt.canonicalResult);
 const ctx={targetObject:{document:{createElement:tag=>new Element(tag)}},ClassicalClauseRelationSelections:{...choices},ActiveClassicalClauseRelationResult:receipt,
 comparisonCapturePresentation:presentation.comparisonCapturePresentation,formatClassicalClauseRelationValue:x=>x,
 createGrammarInspectorLine:(label,value)=>{lines.push([label,value]);return new Element();},
 appendClassicalWholeCanvasPanelActionRow(card,actions){clear=actions.find(a=>a.action==='clear-clause-relation-dependent')?.onClick||clear;},
 refreshClassicalClauseRelationWorkflow(){contract=c.buildDecisionContract(ctx.ClassicalClauseRelationSelections);session.stage({source:principal,route:{operation:'comparison'},slots:[{role:'principal',exact:principal}],choices:{...ctx.ClassicalClauseRelationSelections},legalMoves:[],ready:contract.authorizationStatus==='authorized',execution:{choices:{...ctx.ClassicalClauseRelationSelections},signature:JSON.stringify(ctx.ClassicalClauseRelationSelections)}});}
 };vm.createContext(ctx);extract(ctx,'applyClassicalComparisonChoiceIntent');extract(ctx,'shouldPreserveClassicalComparisonCaptureChoices');extract(ctx,'resetClassicalClauseRelationSelections');extract(ctx,'appendClassicalClauseRelationCaptureCard');
 const parent=new Element();ctx.appendClassicalClauseRelationCaptureCard(parent,c,'dependent',{captured:true,unitType:'nnc',surface:'chicāhuac'},'dimension');assert.equal(typeof clear,'function');clear();
 assert.equal(ctx.ClassicalClauseRelationSelections.comparisonRoute,'equality-iuhqui');assert.equal(ctx.ClassicalClauseRelationSelections.icRelation,'yes');
 assert.equal(c.getCapturedCanonicalResult('dependent'),null);assert.equal(contract.authorizationStatus,'blocked');assert.ok(contract.derived.requiredCaptureRoles.includes('dependent'));
 lines.length=0;ctx.appendClassicalClauseRelationCaptureCard(parent,c,'dependent',{captured:false},'dimension');assert.equal(lines.find(([k])=>k==='status')[1],'Required · not captured');
 assert.equal(session.make(),false);assert.equal(executions,0);assert.equal(session.position.accepted.result,receipt.canonicalResult);
 assert.equal(c.captureCurrentResult('dependent',{...dimension}).authorizationStatus,'blocked');
 ctx.ClassicalClauseRelationSelections.icRelation='no';ctx.refreshClassicalClauseRelationWorkflow();assert.equal(contract.authorizationStatus,'authorized');
 ctx.ClassicalClauseRelationSelections.icRelation='yes';
 Object.assign(ctx,{previewDecisionContract:c.buildDecisionContract(ctx.ClassicalClauseRelationSelections),controller:c,role:'dependent',currentResult:dimension,selectedRelation:'comparison',issueClassicalClauseRelationCurrentDiscourseSourceContextFrame:()=>null});
 const nativeStart=code.indexOf('      captureActionRoles.forEach(role => {');
 const actionStart=code.indexOf('onClick: () => {',nativeStart)+'onClick: '.length;
 const actionEnd=code.indexOf('\n          }\n        });',actionStart)+'\n          }'.length;
 vm.runInContext(`nativeCapture = ${code.slice(actionStart,actionEnd)}`,ctx);ctx.nativeCapture();
 assert.equal(ctx.ClassicalClauseRelationSelections.comparisonRoute,'equality-iuhqui');assert.equal(ctx.ClassicalClauseRelationSelections.icRelation,'yes');assert.equal(contract.authorizationStatus,'authorized');
 assert.equal(c.getCapturedCanonicalResult('principal'),principal);assert.equal(c.getCapturedCanonicalResult('adjoined'),adjoined);assert.equal(session.position.accepted.result,receipt.canonicalResult);assert.equal(executions,0);
});
