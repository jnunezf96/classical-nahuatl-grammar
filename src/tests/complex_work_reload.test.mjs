import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as replay} from '../application/classical/result_reload.mjs';
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('comparison graph reissues canonical parent once, keeps exact ancestry, rejects copied and contaminated recipes',async()=>{
 const r=await runtime();const parent=r.requestClassicalVncApplicationResult({sourceStem:'ihui',sourceInitialISelection:'real',verbClass:'B',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const result=r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[{routeId:'similarity-ihui-vnc',slots:{principal:r.buildClassicalComparisonSourceUnit({sourceResult:parent})},choices:{sentenceType:'declarative'}}]}).canonicalResult;
 const recipe=save(r,{result,source:parent});assert(recipe,'comparison must persist owner inputs');const fresh=await runtime(),roots=replay(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);assert.equal(roots.result.surface,'Nihui.');assert.equal(fresh.getClassicalComparisonCanonicalSourceResult(roots.result.operationFrame.sourceSlots.principal),roots.source);assert.notEqual(roots.source,parent);assert.equal(save(r,{result:{...result}}),null);
 const bad=JSON.parse(JSON.stringify(recipe));bad.nodes.find(n=>n.type==='clause:comparison').surface='Forged';assert.equal(replay(fresh,bad),null);
});
test('calendar graph preserves both native numeral and day-sign parents with ordinal analysis',async()=>{
 const r=await runtime();const numeral=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'cardinal-numeral-nnc',value:1,classifier:'basic',countKind:'ordinary',subject:'3common',state:'absolutive',animacy:'nonanimate'}]}).canonicalResult;
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cipac',sourceClass:'tli-1'});const day=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'})]}).canonicalResult;
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'calendar-date-nnc',source:{numeralResult:numeral,daySignResult:day},calendarBoundary:'single-nucleus'}]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
 const recipe=save(r,{result:receipt.canonicalResult,numeral,day});assert(recipe,'native calendar inputs supported');const fresh=await runtime(),roots=replay(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);assert.equal(roots.result.wordSurface,receipt.canonicalResult.wordSurface);const facts=roots.result.sourceAuthorizationFrame.lexicalFacts;assert.equal(facts.capturedNumeralResult,roots.numeral);assert.equal(facts.capturedDaySignResult,roots.day);assert.equal(roots.result.operationFrame.calendarDateFrame.quantityInterpretation,false);
});
test('personal-name replay retains exact inner clause separate from outer subject and rejects unknown input',async()=>{
 const r=await runtime(),sf=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cipac',sourceClass:'tli'}),parent=r.requestClassicalOrdinaryNncResult(sf,r.buildClassicalNahuatlOrdinaryNncOperationFrame(sf,{subject:'1sg',state:'absolutive'}));
 const result=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:personal-name',args:[{canonicalSourceResult:parent,sourceFamily:'absolutive-state-truncated-inner-number',outerSubject:'2sg'}]}).canonicalResult;
 const recipe=save(r,{result,parent});assert(recipe);const fresh=await runtime(),roots=replay(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);assert.equal(roots.result.canonicalSourceResult,roots.parent);assert.equal(roots.result.outerSubject,'2sg');assert.equal(roots.result.typedSlotFrame.downgradedSource.clauses[0].slots.innerSubject.prefix,'ni');
 const bad=JSON.parse(JSON.stringify(recipe));bad.nodes.find(n=>n.type==='nnc:personal-name').choices.unknown='value';assert.equal(replay(fresh,bad),null);
});
test('place and prepared denominal replay reconstruct owner inputs instead of copied frames',async()=>{
 const r=await runtime();const placeRequest={constructionKind:'place-name',formation:'co',source:{embedStem:'cal'},usage:'adverbial',state:'absolutive',subject:'3common',nounClass:'tli-1'};
 Object.freeze(placeRequest);const place=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:place-gentilic',args:[placeRequest]}).canonicalResult;
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'xō',sourceClass:'tl'}),preparation=r.issueClassicalNahuatlDenominalVerbalStemPreparation(source,{operationId:'inceptive-hui',stemShape:'short'});
 const q={canonicalNncSourceFrame:source,verbalStemPreparationFrame:preparation,operationId:'inceptive-hui',subject:'3common',mood:'indicative',tense:'present'};
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[q]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
 const recipe=save(r,{result:receipt.canonicalResult,source,place});assert(recipe);const fresh=await runtime(),roots=replay(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);assert.equal(roots.place.wordSurface,'calco');assert.equal(roots.result.surfaceRealization,'xoxōhui');assert.equal(roots.result.sourceFrame.verbalStemPreparationFrame.canonicalNncSourceFrame,roots.source);
 assert(Object.isFrozen(r.getClassicalNahuatlPlaceReloadInputs(place).source));placeRequest.source.embedStem='different';assert.equal(r.getClassicalNahuatlPlaceReloadInputs(place).source.embedStem,'cal');
 const bad=JSON.parse(JSON.stringify(recipe));bad.nodes.find(n=>n.type==='formed:place').request.unknown='x';assert.equal(replay(fresh,bad),null);
});
test('affective native caller inputs round trip and unknown authority-shaped inputs are refused',async()=>{
 const r=await runtime(),request={constructionKind:'affective-nnc',source:{embedStem:'xōchi',embedClass:'zero'},affectRoute:'compound',affectiveMatrix:'tzin',semanticReading:'special-regard',subject:'3sg',state:'absolutive',animacy:'animate'};
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[request]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
 const recipe=save(r,{result:receipt.canonicalResult});assert(recipe);const fresh=await runtime(),roots=replay(fresh,structuredClone(recipe));assert(roots);assert.equal(roots.result.wordSurface,receipt.canonicalResult.wordSurface);
 for(const key of ['inventedInput','authorizedResult']){const bad=structuredClone(recipe);bad.nodes.find(n=>n.type==='nominal:constructed').request[key]='pretend';assert.equal(replay(fresh,bad),null);}
});
test('adjectival constructed Result reissues its exact quality parent',async()=>{
 const r=await runtime(),sf=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tepi',sourceClass:'zero'}),parent=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[sf,r.buildClassicalNahuatlOrdinaryNncOperationFrame(sf,{subject:'3sg',state:'absolutive'})]}).canonicalResult;
 const request={constructionKind:'adjectival-nnc',source:{canonicalNncResult:parent},adjectivalOperation:'quality-intensification',operationScope:'whole',subject:'3sg',state:'absolutive',animacy:'animate'};
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[request]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);const recipe=save(r,{result:receipt.canonicalResult,parent});assert(recipe);const fresh=await runtime(),roots=replay(fresh,structuredClone(recipe));assert(roots);assert.equal(roots.result.sourceAuthorizationFrame.lexicalFacts.capturedAdjectivalNncResult,roots.parent);assert.equal(roots.result.wordSurface,receipt.canonicalResult.wordSurface);
});
test('opaque personal name retains its declared quoted source',async()=>{
 const r=await runtime();
 const quoted=r.buildPersonalNameOpaqueQuotedInnerSourceFrame({sourceFamily:'opaque-quoted-inner',quotedCitation:'Mōtēuczōma',referenceKind:'human',citationOuterSubject:'3sg'});
 for(const request of [{canonicalSourceResult:quoted,outerSubject:'3sg'}]){
  const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:personal-name',args:[request]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);const recipe=save(r,{result:receipt.canonicalResult});assert(recipe);const fresh=await runtime(),roots=replay(fresh,structuredClone(recipe));assert(roots);assert.equal(roots.result.surfaceRealization,receipt.canonicalResult.surfaceRealization);assert.equal(roots.result.typedSlotFrame.downgradedSource.sourceFamily,receipt.canonicalResult.typedSlotFrame.downgradedSource.sourceFamily);
 }
});
test('rank-corrected nominal source and productive cob cardinal retain owner analyses',async()=>{
 const r=await runtime(),correction=r.resolveClassicalNahuatlNominalRankCorrectedSourceFrame({enteredStem:'yaca',valence:'intransitive'});assert(correction);
 const original=r.getClassicalNahuatlNominalRankCorrectedDenominalRequest(correction);
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[{...original,operationId:'inceptive-ti',classChoice:'B',subject:'3sg',mood:'indicative',tense:'present'}]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
 const cob=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'cardinal-numeral-nnc',value:21,classifier:'cob',countKind:'ordinary',subject:'3common',state:'absolutive',animacy:'nonanimate'}]});assert.equal(cob.authorizationStatus,'authorized',cob.blockReason);
 const recipe=save(r,{result:receipt.canonicalResult,cob:cob.canonicalResult});assert(recipe);const fresh=await runtime(),roots=replay(fresh,structuredClone(recipe));assert(roots);assert.equal(roots.result.surfaceRealization,receipt.canonicalResult.surfaceRealization);assert.equal(roots.cob.wordSurface,cob.canonicalResult.wordSurface);assert.equal(roots.result.sourceFrame.canonicalNominalRankCorrectionFrame.canonicalNncSourceFrame,roots.result.sourceFrame.canonicalNncSourceFrame);
});
test('cardinal exact preterit-agentive operand is an authenticated graph edge',async()=>{
 const r=await runtime(),base={constructionKind:'cardinal-numeral-nnc',value:21,classifier:'cob',countKind:'ordinary',subject:'3common',state:'absolutive',animacy:'nonanimate'};
 const first=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[base]}).canonicalResult,parent=first.operationFrame.cobPreteritAgentiveResultFrame;assert(parent);
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{...base,source:{cobPreteritAgentiveResultFrame:parent}}]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
 const recipe=save(r,{result:receipt.canonicalResult,parent});assert(recipe);const fresh=await runtime(),roots=replay(fresh,structuredClone(recipe));assert(roots);assert.equal(roots.result.operationFrame.cobPreteritAgentiveResultFrame,roots.parent);
});

test('public two-step finite parent preserves authored participant axes through comparison reload',async()=>{
 const r=await runtime(),request={sourceStem:'ihui',sourceInitialISelection:'real',verbClass:'B',sourceValence:'intransitive',subject:'3sg',subjectAnimacy:'animate',subjectHumanness:'human',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
 const initial=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[request]}).canonicalResult;
 const parent=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{...request,subjectAnimacy:undefined,subjectHumanness:undefined,objectKind:'none',objectPerson:'',subject:'1sg',sourceSubject:'3sg',sourceSubjectPerson:'3',sourceSubjectAnimacy:'animate',sourceSubjectHumanness:'human',sourceSubjectNumber:'singular'},initial.resultFrame]}).canonicalResult;assert(parent);
 const result=r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[{routeId:'similarity-ihui-vnc',slots:{principal:r.buildClassicalComparisonSourceUnit({sourceResult:parent})},choices:{sentenceType:'declarative'}}]}).canonicalResult;assert(result);
 const recipe=save(r,{result,parent});assert(recipe);assert.equal(recipe.nodes.find(n=>n.type==='vnc').recipe.steps[0].request.subjectHumanness,'human');
 const fresh=await runtime(),roots=replay(fresh,structuredClone(recipe));assert(roots);assert.equal(roots.result.surface,'Nihui.');assert.equal(fresh.getClassicalComparisonCanonicalSourceResult(roots.result.operationFrame.sourceSlots.principal),roots.parent);
 const lost=structuredClone(recipe);delete lost.nodes.find(n=>n.type==='vnc').recipe.steps[0].request.subjectHumanness;assert.equal(replay(fresh,lost),null);
});
