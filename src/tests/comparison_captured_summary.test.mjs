import {installClauseSelectionReaders} from './helpers/clause_selection_reader_fixture.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {projectClauseStructure} from '../ui/composition/structure_design.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const project=exact=>{const capture=r.captureClassicalGrammarApplicationResult(exact,'captured-summary');return capture.authorizationStatus==='authorized'&&capture.canonicalResult===exact?{canonicalResult:exact,surface:exact.wordSurface||exact.surface,operationId:capture.operationId}:null;};
function noun(stem,sourceClass){const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3common',animacy:'nonanimate',humanness:'nonhuman',state:'absolutive',predicateFormation:'source-stem'});const result=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);assert.equal(result.authorizationStatus,'authorized');return result.canonicalResult;}
test('comparison summary follows authenticated captures when the original adjoined Source is removed',()=>{
 const cal=noun('cal','tli-1'),tepe=noun('tepe','tl-1-a'),controller=r.createClassicalClauseRelationController();
 for(const [role,exact] of Object.entries({principal:cal,adjoined:tepe}))assert.equal(controller.captureCurrentResult(role,exact).authorizationStatus,'authorized');
 const preview={textContent:'',hidden:true,dataset:{}};
 const operation={value:'clause:comparison'};
 const navigator={exactSource:tepe};
 let binding={family:'clause-relation',operationId:'clause:comparison',selectedBindingId:'comparison:principal',ownerBindingFrame:{bindingChoices:[{id:'comparison:principal',relation:'comparison'}]}},syncs=0;
 const ctx={targetObject:{...r,document:{getElementById:id=>id==='classical-continuation-target'?preview:id==='classical-capability-navigator-operation'?operation:null},isClassicalGrammarApplicationCapabilityNavigator:n=>n===navigator,syncClassicalSourceCommitPresentation(){syncs++;}},ActiveClassicalGrammarCapabilityNavigator:navigator,ActiveClassicalGrammarResultSourceCapture:null,
 ClassicalClauseRelationSelections:{relation:'comparison',comparisonRoute:'similarity-incorporated-nehnequi',degreeMarker:'achi',sentenceType:'none'},getActiveClassicalGrammarResultBinding:()=>binding,getClassicalClauseRelationControllerForRendering:()=>controller,getClassicalOwnerIssuedResultProjection:project,projectClauseStructure};
 vm.createContext(ctx);installClauseSelectionReaders(ctx);
 for(const name of ['getClassicalComparisonSourceSummary','syncClassicalContinuationTarget','getClassicalCommittedSourcePresentation']) {
 const start=code.indexOf(`    function ${name}(`);if(start<0)continue;
 vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);
 }
 ctx.syncClassicalContinuationTarget();
 assert.equal(preview.dataset.classicalContinuationSourceSurface,'calli + tepetl');
 controller.clearCapture('adjoined');
 ctx.syncClassicalContinuationTarget({onlyIfChanged:true});
 assert.equal(preview.dataset.classicalContinuationSourceSurface,'calli');
 assert.equal(preview.textContent,'Composition uses · calli');
 assert.equal(ctx.getClassicalCommittedSourcePresentation(),'calli','current Source and Make bar agrees with captured inputs');
 assert.equal(navigator.exactSource,tepe,'continuation identity remains available for recapture');
 assert.equal(syncs,2);
 ctx.syncClassicalContinuationTarget({onlyIfChanged:true});assert.equal(syncs,2,'unchanged projection does not resync');
 binding=null;ctx.syncClassicalContinuationTarget();
 assert.equal(preview.textContent,'Source used · Entire Result: tepetl','other operations retain their continuation Source');
 binding={family:'clause-relation',operationId:'clause:comparison',selectedBindingId:'comparison:principal',ownerBindingFrame:{bindingChoices:[{id:'comparison:principal',relation:'comparison'}]}};controller.clearCapture('principal');ctx.syncClassicalContinuationTarget();
 assert.equal(preview.hidden,true,'empty captures do not advertise the removed original as included');
});
