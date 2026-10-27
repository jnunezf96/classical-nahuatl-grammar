import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {inputLabel,clauseReadinessGuidance as guidance,contractReferences,normalizeAndrewsReference,hasCurrentClauseProjection} from '../ui/composition/choice_guidance.mjs';
import {constructionBackground as background,sourceAnalysisBackground} from '../ui/composition/andrews_choice_references.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=(subject)=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tlāca',sourceClass:'tl-1-a'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject,state:'absolutive'})]}).canonicalResult;};
test('current comparison prerequisites use semantic slots without changing owner readiness',()=>{
 const source=r.resolveClassicalNahuatlImperfectiveVncSourceFrame({enteredStem:'nēnehuilia',valence:'specific-projective'}),nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const parent=r.executeClassicalGrammarTypedSourceOperationBindingFrame(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject:'1sg',subjectAnimacy:'animate',subjectHumanness:'human',objectSelection:'specific-projective:3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'})).canonicalResult;
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',parent);
 const choices={relation:'comparison',comparisonRoute:'similarity-resemblance-verbstem-nnc',sentenceType:'none'};
 const missing=c.buildDecisionContract(choices);assert.equal(inputLabel(missing,'adjoined'),'comparison standard');assert.match(guidance(missing),/Add the comparison standard Result.*\+ beside Source/u);assert.equal(missing.authorizationStatus,'blocked');assert.deepEqual(contractReferences(missing),['Andrews §53.1']);
 c.captureCurrentResult('adjoined',noun('2sg'));const incompatible=c.buildDecisionContract(choices);assert.equal(incompatible.authorizationStatus,'blocked');assert.match(guidance(incompatible),/person and number match the verb’s object/u);
 c.captureCurrentResult('adjoined',noun('3sg'));const ready=c.buildDecisionContract(choices);assert.equal(ready.authorizationStatus,'authorized');assert.equal(guidance(ready),'Choices complete. Make Result.');assert.equal(c.getCapturedCanonicalResult('principal'),parent);
 c.clearCapture('adjoined');assert.match(guidance(c.buildDecisionContract(choices)),/Add the comparison standard/u);
});
test('unknown/unselected contracts and generic author tags cannot imply ready or citation',()=>{
 assert.equal(guidance(null),'');assert.equal(guidance({}),'Choose a construction under Build.');assert.equal(guidance({relation:'comparison'}),'Review the required choices under Build.');assert.doesNotMatch(guidance({relation:'comparison',authorizationStatus:'authorized',currentChoiceFrame:{outcome:{readyToMake:false}}}),/Make Result/u);
 for(const x of ['Andrews','Andrews transcription owner','other-author','Andrews-internal-rule'])assert.equal(normalizeAndrewsReference(x),'');assert.equal(normalizeAndrewsReference('Andrews-53.1'),'Andrews §53.1');
 assert.equal(inputLabel({derived:{captureSlotLayout:{dependent:'dimension'}}},'dependent'),'dimension');
});
test('bibliography is scoped to current route; empty and unknown routes withdraw it',()=>{
 assert.deepEqual(background({}),[]);assert.deepEqual(background({operation:'unknown'}),[]);
 assert.deepEqual(background({operation:'grammar:nominal-construction',construction:'calendar-date-nnc'}),['Andrews §42.8.4; Appendix E II.2–3']);
 assert.deepEqual(background({operation:'nnc:ordinary'}),['Andrews §§12–17']);
 assert.deepEqual(background({operation:'vnc:denominal'}),['Andrews §§54–55']);
 assert.deepEqual(background({operation:'vnc:application',lateOperation:'frequentative'}),['Andrews §27']);
 assert.deepEqual(background({operation:'vnc:application',derivation:'applicative'}),['Andrews §26']);
});

test('thirteen-family bibliography inventory uses explicit operation addresses, including unselected adjunction',()=>{
 const cases=[
  [{operation:'clause:comparison'},'53'],
  [{operation:'clause:composition',relation:'conjunction'},'52'],
  [{operation:'nnc:ordinary'},'12–17'],
  [{operation:'sentence:supplementation',relation:'rumored-report'},'19.3–19.6'],
  [{operation:'vnc:application',derivation:'causative'},'25'],
  [{operation:'grammar:nominal-construction',construction:'compound-nnc'},'31'],
  [{operation:'nnc:personal-name'},'56'],
  [{operation:'grammar:nominal-construction',construction:'cardinal-numeral-nnc'},'34'],
  [{operation:'nnc:place-gentilic'},'48'],
  [{operation:'clause:composition',relation:'object-complement'},'51'],
  [{operation:'clause:adverbial-adjunction'},'49–50'],
  [{operation:'vnc:denominal'},'54–55'],
 ];
 for(const [input,section] of cases)assert.ok(background(input).some(ref=>ref.includes(section)),JSON.stringify(input));
 assert.deepEqual(sourceAnalysisBackground('vnc'),['Andrews §§5–7']);assert.deepEqual(sourceAnalysisBackground('nnc'),['Andrews §§12–17']);assert.deepEqual(sourceAnalysisBackground(''),[]);
 assert.deepEqual(background({operation:'unknown-adverbial'}),[]);assert.deepEqual(background({operation:'clause:composition'}),[]);
 assert.deepEqual(background({operation:'nnc:adverbial'}),['Andrews §44']);
 assert.deepEqual(background({operation:'particle:result'}),['Andrews §3']);
});

test('actual renderer projection is idempotent and withdraws construction references for pending Source',async()=>{
 const {readFileSync}=await import('node:fs');
 const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const body=source.slice(source.indexOf('    function syncClassicalChoiceGuidance()'),source.indexOf('    function syncClassicalConstructionPositionApplyState('));
 let mutations=0;const node=()=>{let text='',hidden=false;return{get textContent(){return text;},set textContent(v){text=v;mutations++;},get hidden(){return hidden;},set hidden(v){hidden=v;mutations++;}};};
 const citation=node(),sourceCitation=node(),nodes=new Map([['classical-current-construction-reference',citation],['classical-source-analysis-reference',sourceCitation]]);
 const target={document:{createElement(){throw Error('Existing citation must be reused');},getElementById:id=>nodes.get(id)||null},getClassicalBasalUnitFromRuntime:()=> 'vnc',getActiveDerivationType:()=> 'applicative'};
 const accepted=Object.freeze({}),session={position:{accepted,construction:{route:{operation:'vnc:application'},sourcePending:false},choices:{owner:{requestedDerivation:'causative'}}}};
 const project=new Function('targetObject','ClassicalConstructionSession','ActiveClassicalGrammarResultBinding','ClassicalWritingSourceMode','constructionBackground','sourceAnalysisBackground','contractReferences','getActiveClassicalGrammarResultBinding','hasCurrentClauseProjection','readClassicalClauseSelections','readClassicalClauseContract',`${body};syncClassicalChoiceGuidance();`);
 const run=()=>project(target,session,null,false,background,sourceAnalysisBackground,contractReferences,()=>null,hasCurrentClauseProjection,()=>({}),()=>null);
 run();assert.equal(citation.textContent,'Construction background: Andrews §25.');const prior=mutations;run();assert.equal(mutations,prior);
 session.position.choices.owner={};run();assert.equal(citation.textContent,'Construction background: Andrews §26.');
 session.position.construction.sourcePending=true;run();assert.equal(citation.hidden,true);assert.equal(citation.textContent,'');assert.equal(sourceCitation.hidden,false);assert.match(sourceCitation.textContent,/§§5–7/u);assert.equal(session.position.accepted,accepted);
});
