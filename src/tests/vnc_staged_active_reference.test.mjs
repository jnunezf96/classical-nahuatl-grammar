import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
test('ordinary active staged reference stays editable without changing the accepted impersonal result',()=>{
 const accepted=r.evaluateClassicalNahuatlVncApplication({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'customary-present',requestedDerivation:'direct',requestedVoice:'impersonal',nonactiveOptionId:'ō:coch-ō'});
 assert.equal(accepted.authorizationStatus,'authorized');
 const source=accepted.resultFrame.sourceMachineryFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(source),exact=Symbol('exact');
 const bind=(voice,subject='3sg')=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject,mood:'indicative',tense:'imperfect',requestedDerivation:'direct',requestedVoice:voice,...(voice==='impersonal'?{nonactiveOptionId:'ō:coch-ō'}:{})});
 let reference={person:'3',animacy:'animate',humanness:'human',number:'singular'};
 const ctx=vm.createContext({targetObject:r,ClassicalCapabilityExactVncApplicationFrame:exact,ActiveClassicalGrammarCapabilityNavigator:nav,
 getClassicalRuleLogicVncSubjectFrame:({subject})=>({...reference,agreement:subject,person:subject[0]}),buildClassicalRuleLogicSurfaceFrame:o=>({...o,state:{vncSubjectFrame:o[exact]?.resultFrame?.participantProjection?.targetSubject}})});
 const a=code.indexOf('    function getClassicalTypedVncControlProjection('),b=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,b),ctx);
 const active=bind('active'),p=ctx.getClassicalTypedVncControlProjection(active);
 assert.equal(p.state.vncSubjectFrame.humanness,'human');assert.equal(p.subjectHumanness,'human');assert.equal(p.subjectAnimacy,'animate');assert.equal(p.subject,'3sg');
 reference={...reference,person:'1'};const first=ctx.getClassicalTypedVncControlProjection(bind('active','1sg'));
 assert.equal(first.subjectPerson,'1');assert.equal(first[exact].normalizedRequest.subject,'1sg');assert.equal(first[exact].normalizedRequest.requestedVoice,'active');
 const nonactive=ctx.getClassicalTypedVncControlProjection(bind('impersonal'));
 assert.notEqual(nonactive.subjectHumanness,'human','nonactive participant remains owner-derived');
 assert.equal(accepted.normalizedRequest.requestedVoice,'impersonal');assert.equal(accepted.normalizedRequest.subject,'3sg');
 assert.equal(ctx.getClassicalTypedVncControlProjection({...active}),null);
});
