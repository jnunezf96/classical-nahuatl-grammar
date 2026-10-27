import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as replay} from '../application/classical/result_reload.mjs';
import {inactiveAffectiveReloadControl} from '../ui/composition/native_reload_source.mjs';
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('native prepared denominal class map survives replay without accepting authority fields',async()=>{
 const r=await runtime(),source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'xō',sourceClass:'tl'});
 const preparation=r.issueClassicalNahuatlDenominalVerbalStemPreparation(source,{operationId:'inceptive-hui',stemShape:'short'});
 const request={canonicalNncSourceFrame:source,verbalStemPreparationFrame:preparation,operationId:'inceptive-hui',operationPath:['inceptive-hui'],classChoice:'B',classChoices:{'inceptive-hui':'B'},possessor:'',includedPossessorFamily:'',sourceSubject:'',objectPeople:[],subject:'3common',subjectPerson:'3',subjectAnimacy:'nonanimate',subjectHumanness:'nonhuman',subjectNumber:'common',mood:'indicative',tense:'present',outputScope:'single',exclamatory:false,sentenceOptions:{introductoryParticle:'none'}};
 const result=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[request]}).canonicalResult;
 assert.equal(result?.surfaceRealization,'xoxōhui');
 const signature=JSON.stringify({mode:'whole-stem',sourceWholeStem:'xō',sourceNncClass:'tl',affectiveFlawedLexicalReading:'chicken'}),saved={committedSignature:signature,draftSignature:signature};
 assert(inactiveAffectiveReloadControl(r,result,saved));assert.equal(inactiveAffectiveReloadControl(r,{...result},saved),null);
 assert.equal(inactiveAffectiveReloadControl(r,result,{...saved,draftSignature:signature.replace('xō','other')}),null);const recipe=save(r,{result,source});assert(recipe,'actual native classChoices must serialize');
 const fresh=await runtime(),roots=replay(fresh,structuredClone(recipe));assert(roots);assert.equal(roots.result.surfaceRealization,'xoxōhui');assert.equal(roots.result.sourceFrame.verbalStemPreparationFrame.canonicalNncSourceFrame,roots.source);
 for(const value of [{authorizedResult:'B'},{'inceptive-hui':{authority:true}},{'inceptive-hui':'invented'}]){const bad=structuredClone(recipe);bad.nodes.find(n=>n.type==='formed:denominal').request.classChoices=value;assert.equal(replay(fresh,bad),null);}
});

test('native denominal snapshot includes existing verbal participant controls',async()=>{
 const {readFileSync}=await import('node:fs');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 assert.match(code,/controls: snapshotClassicalVncReloadControls\(edit \|\| targetObject\.getClassicalNahuatlDenominalReloadInputs\?\.\(current\)[\s\S]{0,300}getClassicalVncBasalReloadControls/);
});
