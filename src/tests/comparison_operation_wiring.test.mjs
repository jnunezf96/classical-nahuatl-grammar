import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as adapter from '../ui/composition/comparison_operation_transaction.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function noun(stem){const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',state:'absolutive'})]}).canonicalResult;}
for(const route of ['equality-iuhqui','similarity-iuhqui-principal','comparative-tachcauh-hualcah','comparative-panahuia-unspecified']) test(`production ${route} handler publishes session intent without writing legacy selections; reset ingress wins`,()=>{
 const source=noun('canāhuac'),standard=noun('tomāhuac'),c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',source);c.captureCurrentResult('adjoined',standard);
 const legacy=Object.freeze({relation:'comparison',comparisonRoute:route}),snapshot=adapter.issueComparisonOperationSnapshot(c,legacy,source);
 const session=createConstructionSession({isSource:x=>[source,standard].includes(x),isResult:()=>false});
 const proposal=s=>({source,route:{operation:'clause:comparison'},slots:s.captures,choices:s.selections,operationContract:s,ready:false});session.stage(proposal(snapshot));
 const ctx=vm.createContext({...adapter,ClassicalConstructionSession:session,ClassicalClauseRelationSelections:legacy,ClassicalComparisonTransitionDraft:null,ActiveClassicalGrammarCapabilityNavigator:{exactSource:source},ClassicalPositionExecuting:false,ClassicalPositionStaging:false,ActiveClassicalClauseRelationResult:null,ClassicalClauseRelationStatusMessage:'',getClassicalClauseRelationControllerForRendering:()=>c,refreshClassicalClauseRelationWorkflow:()=>session.stage(proposal(ctx.ClassicalComparisonTransitionDraft || session.position.operationContract))});
 for(const name of ['getClassicalComparisonOperationSnapshot','readClassicalClauseSelections','readClassicalClauseContract','applyClassicalComparisonChoiceIntent']){const start=code.indexOf(`    function ${name}(`);assert(start>=0);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);}
 const key=route==='comparative-panahuia-unspecified'?'adjunctorIn':route==='comparative-tachcauh-hualcah'?'negativeStandardIn':'icRelation';const before=session.position.revision;ctx.applyClassicalComparisonChoiceIntent(c,{type:'set-choice',key,value:'no'},snapshot.contract.currentChoiceFrame);
 assert.equal(ctx.ClassicalClauseRelationSelections,legacy);assert.equal(session.position.revision,before+1);assert.equal(session.position.operationContract.selections[key],'no');assert.equal(ctx.readClassicalClauseSelections(),session.position.operationContract.selections);assert.equal(ctx.readClassicalClauseContract(c),session.position.operationContract.contract);
 const imported={...legacy,icRelation:'yes'};ctx.ClassicalClauseRelationSelections=imported;assert.equal(ctx.readClassicalClauseSelections(),imported);
});
test('pilot cache chain stamps import URLs without changing semantic installer identity',()=>{
 const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');
 for(const [path,target]of [['../ui/rendering/rendering.mjs','construction_session'],['../ui/composition/construction_session.mjs','construction_position'],['../runtime/create_runtime.mjs','rendering'],['../bootstrap/bootstrap.mjs','create_runtime'],['../browser/main.mjs','bootstrap']])assert.match(read(path),new RegExp(`from ["'][^"']*${target}\\.mjs\\?[^"']*operationPilot=20261027-1`));
 assert.match(read('../runtime/create_runtime.mjs'),/\["src\/ui\/rendering\/rendering\.mjs", installUiRenderingGlobals\]/);
 const query=p=>read(p).match(/from ['"]([^'"]*structure_design\.mjs[^'"]*)/)[1].split('?')[1];assert.equal(query('../ui/rendering/rendering.mjs'),query('../ui/composition/composition_presentation.mjs'));
});
