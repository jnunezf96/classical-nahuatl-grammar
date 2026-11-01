import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=()=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal',sourceClass:'tli-1'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3common',state:'absolutive'})]}).canonicalResult;};
const verb=(stem='cochi',verbClass='B',object=false)=>r.requestClassicalVncApplicationResult({sourceStem:stem,...(stem==='itta'?{sourceInitialISelection:'real'}:{}),verbClass,sourceValence:object?'specific-projective':'intransitive',objectKind:object?'specific-projective':'none',objectPerson:'3common',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active',requestedDerivation:'direct'});
const capture=(c,left,right)=>{c.captureCurrentResult('principal',left);c.captureCurrentResult('adjoined',right);};
test('adjectival contextual domains reuse actual selection/contact owners and preserve invalid authored intent',()=>{
 const head=noun(),modifier=verb('itta','A',true);
 const d=r.getClassicalNahuatlAdjectivalModificationChoiceDomains({head,modifier,topology:'ordinary',order:'head-modifier'});
 assert.deepEqual(d.orders,['head-modifier','modifier-head-preposed']);assert.deepEqual(d.adjunctors,['none','in']);assert.deepEqual(d.linkRoles,['vnc-subject','vnc-object']);assert.deepEqual(d.compoundHeadTargets,['simple-head']);
 assert.equal(r.getClassicalNahuatlAdjectivalModificationChoiceDomains({head:{...head},modifier,topology:'ordinary'}),null);
 const c=r.createClassicalClauseRelationController();capture(c,head,modifier);const authored={relation:'adjectival-modification',topology:'ordinary',order:'invented',modifierAdjunctor:'none',linkKind:'vnc-subject'};
 const blocked=c.buildDecisionContract(authored);assert.equal(blocked.authorizationStatus,'blocked');assert.equal(authored.order,'invented');assert.deepEqual(blocked.currentChoiceFrame.decisions.find(x=>x.key==='order').values,d.orders);
});
test('complement contextual categories and discontinuous eligibility come from actual semantic guards',()=>{
 const left=verb('iht-o-ā','C',true),right=noun(),c=r.createClassicalClauseRelationController();capture(c,left,right);
 const p=r.buildClassicalNahuatlClauseCompositionSourceFrame(left,{referenceId:'left',objectReferenceId:'contact'}),q=r.buildClassicalNahuatlClauseCompositionSourceFrame(right,{referenceId:'contact'});
 const d=r.getClassicalNahuatlClauseComplementationChoiceDomains({operationKind:'object-complement',principalClause:p,complementClause:q,options:{semanticCategory:'designation',linkKind:'object-subject'}});
 assert.equal(d.semanticCategory.find(x=>x.value==='designation').status,'available');assert.equal(d.semanticCategory.find(x=>x.value==='change').status,'incompatible');assert.equal(d.order.find(x=>x.value==='discontinuous').status,'incompatible');
 const choices={relation:'object-complement',semanticCategory:'change',linkKind:'object-subject',designationStructure:'ordinary-object-complement',complementOrder:'complement-principal'};
 const blocked=c.buildDecisionContract(choices);assert.equal(blocked.authorizationStatus,'blocked');assert.equal(choices.semanticCategory,'change');assert.equal(blocked.currentChoiceFrame.decisions.find(x=>x.key==='semanticCategory').optionAvailability.find(x=>x.value==='change').status,'incompatible');
 assert.equal(c.buildDecisionContract({...choices,semanticCategory:'designation'}).authorizationStatus,'authorized');
});
test('supplementation contextual domains issue fixed correction without silently rewriting authored singleton',()=>{
 const left=noun(),right=noun(),p=r.buildClassicalNahuatlSupplementationClauseEnvelope(left,{referenceId:'contact'}),q=r.buildClassicalNahuatlSupplementationClauseEnvelope(right,{referenceId:'contact'});
 const d=r.getClassicalNahuatlSupplementationChoiceDomains({principalClause:p,supplementClause:q,referenceMode:'absolute-topic'});
 assert.deepEqual(d.headRoles,['subject']);assert.deepEqual(d.contactRoles,['subject']);
 const c=r.createClassicalClauseRelationController();capture(c,left,right);const choices={relation:'supplementation',supplementationReferenceMode:'absolute-topic',supplementationHeadRole:'object',supplementationContactRole:'subject',supplementationOrder:'principal-first'};
 const blocked=c.buildDecisionContract(choices);assert.equal(blocked.authorizationStatus,'blocked');assert.equal(choices.supplementationHeadRole,'object');assert.ok(blocked.currentChoiceFrame.decisions.some(x=>x.key==='supplementationHeadRole'&&x.values.includes('subject')));
});
test('adjunction contextual domains retain authentic sources and actual rank/profile guards',()=>{
 const left=verb(),right=verb('cuīca','A');const availability=r.issueAdverbialAdjunctionAvailabilityContract({principalClause:left,adjoinedUnit:right});
 const d=r.getAdverbialAdjunctionChoiceDomains({availability,relation:'time',degree:'nonadverbialized'});
 assert.deepEqual(d.orders,['modifier-head','head-modifier']);assert.ok(d.relationProfiles.includes('implicit'));assert.equal(r.getAdverbialAdjunctionChoiceDomains({availability:{...availability},relation:'time',degree:'nonadverbialized'}),null);
});
test('changed relation families retain one exact preparation through contract, preview and explicit execution',()=>{
 const fixtures=[
  {left:noun(),right:noun(),choices:{relation:'adjectival-modification',topology:'ordinary',order:'head-modifier',modifierAdjunctor:'none'}},
  {left:verb('iht-o-ā','C',true),right:noun(),choices:{relation:'object-complement',semanticCategory:'designation',linkKind:'object-subject',designationStructure:'ordinary-object-complement',complementOrder:'complement-principal'}},
  {left:noun(),right:noun(),choices:{relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'}},
  {left:verb(),right:verb('cuīca','A'),choices:{relation:'time',order:'modifier-head',relationProfile:'implicit'}}
 ];
 for(const f of fixtures){const c=r.createClassicalClauseRelationController();capture(c,f.left,f.right);const contract=c.buildDecisionContract(f.choices);assert.equal(contract.authorizationStatus,'authorized',contract.blockReason);assert.ok(contract.preparation,`${f.choices.relation}: retained preparation`);assert.equal(r.isClassicalGrammarPreparedApplicationRequest(contract.preparation),true);const preview=c.preview(f.choices);const made=c.compose(f.choices);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(preview.canonicalResult,contract.preparation.canonicalResult);assert.equal(made.canonicalResult,contract.preparation.canonicalResult);assert.equal(c.getCapturedCanonicalResult('principal'),f.left);assert.equal(c.getCapturedCanonicalResult('adjoined'),f.right);assert.equal(r.isClassicalGrammarPreparedApplicationRequest({...contract.preparation}),false);}
});
test('included wish alternatives use the actual antecessive policy, including past regret without o',()=>{
 const wish=tenseAntecessive=>r.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'optative',tense:'past',requestedVoice:'active',requestedDerivation:'direct',outsidePrefixes:tenseAntecessive?["ō#"]:[]});
 const p=r.buildClassicalNahuatlSupplementationClauseEnvelope(noun(),{referenceId:'left'});
 const q=value=>r.buildClassicalNahuatlSupplementationClauseEnvelope(wish(value),{referenceId:'right'});
 assert.deepEqual(r.getClassicalNahuatlSupplementationChoiceDomains({principalClause:p,supplementClause:q(false),referenceMode:'included'}).wishRealizabilities,['present-or-future-impossible','past-counterfactual']);
 assert.deepEqual(r.getClassicalNahuatlSupplementationChoiceDomains({principalClause:p,supplementClause:q(true),referenceMode:'included'}).wishRealizabilities,['past-counterfactual']);
});
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
test('production relation chooser visibly retains unavailable authored value with explicit owner correction',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const element=tag=>({tag,children:[],dataset:{},setAttribute(){},addEventListener(){},appendChild(x){this.children.push(x);},append(...x){this.children.push(...x);}});
 const ctx=vm.createContext({targetObject:{document:{createElement:element}},ActiveClassicalGrammarResultBinding:null,CLASSICAL_CLAUSE_RELATION_DECISION_LABELS:{},formatClassicalClauseRelationValue:x=>x,normalizeAndrewsReference:()=>'',compactClassicalChoiceMenu(){}});
 const start=code.indexOf('    function createClassicalClauseRelationDecisionControl(');vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);
 for(const selected of ['change','invented']){const decision={id:'semantic-category',selectedValue:selected,authoredValue:selected,required:true,values:['change','designation'],optionAvailability:[{value:'change',status:'incompatible',reasonCode:'wrong-stem'},{value:'designation',status:'available'}]};const field=ctx.createClassicalClauseRelationDecisionControl(decision),select=field.children.find(x=>x.tag==='select');assert.equal(select.value,selected);assert.ok(select.children.some(x=>x.value===selected&&x.selected&&x.disabled));assert.ok(select.children.some(x=>x.value==='designation'&&!x.disabled));}
});
test('marker/contact capture and post-choice previews retain invalid authored intent and reject stale custody',()=>{
 const c=r.createClassicalClauseRelationController(),left=verb(),right=verb('cuīca','A');capture(c,left,right);
 const choices={relation:'condition',order:'modifier-head',relationProfile:'open'};c.captureCurrentResult('marker',r.requestClassicalParticleResult('l3-in-tla'));
 const initial=c.buildDecisionContract(choices);assert.equal(initial.authorizationStatus,'authorized',initial.blockReason);const preview=c.preview(choices);
 const next=c.transitionAdjunctionChoice({selections:choices,expectedFrame:initial.currentChoiceFrame,intent:{type:'capture',role:'marker',result:r.requestClassicalParticleResult('l3-ma-zo')}});
 assert.equal(next.selections.relationProfile,'open');assert.equal(next.contract.authorizationStatus,'blocked');assert.equal(preview.isCurrent(),false);
});
test('observer: complement fields reject wrong exact relational pairs and wrong beginning tense',()=>{
 const left=verb('pēhua','A'),right=r.requestClassicalVncApplicationResult({sourceStem:'cuīca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'preterit',requestedVoice:'active'});
 const p=r.buildClassicalNahuatlClauseCompositionSourceFrame(left,{referenceId:'contact'}),q=r.buildClassicalNahuatlClauseCompositionSourceFrame(right,{referenceId:'contact'});
 const d=r.getClassicalNahuatlClauseComplementationChoiceDomains({operationKind:'adverbial-complement',principalClause:p,complementClause:q});
 assert.equal(d.semanticCategory.find(x=>x.value==='beginning').status,'incompatible');assert.equal(d.relationalPairId.every(x=>x.status==='incompatible'),true);
 const c=r.createClassicalClauseRelationController();capture(c,left,right);const authored={relation:'adverbial-complement',semanticCategory:'beginning',complementOrder:'principal-complement'};
 assert.equal(c.buildDecisionContract(authored).authorizationStatus,'blocked');assert.equal(authored.semanticCategory,'beginning');
});
test('observer: preparation rejects accessors before reading relation-lane fields',()=>{
 let reads=0;const getter=()=>{reads++;throw new Error('caller getter');};
 const args=[];Object.defineProperty(args,'0',{get:getter,enumerable:true});args.length=1;
 const operation={};Object.defineProperty(operation,'operationKind',{get:getter,enumerable:true});
 for(const request of [{operationId:'clause:composition',get args(){return getter();}},{operationId:'clause:composition',args},{operationId:'clause:composition',args:[operation]}]){
  assert.doesNotThrow(()=>assert.equal(r.prepareClassicalGrammarApplicationRequest(request),null));assert.equal(reads,0);
 }

});
test('observer: interrogative adverbial orders share actual initial-position guard',()=>{
 const left=verb(),right=r.requestClassicalAdverbialNncResult({adverbialPotentialFrame:r.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'quēn'})});
 const availability=r.issueAdverbialAdjunctionAvailabilityContract({principalClause:left,adjoinedUnit:right});
 const d=r.getAdverbialAdjunctionChoiceDomains({availability,relation:'manner',degree:'second'});assert.deepEqual(d.orders,['modifier-head']);
 const c=r.createClassicalClauseRelationController();capture(c,left,right);const contract=c.buildDecisionContract({relation:'manner',degree:'second',order:'head-modifier'});assert.equal(contract.authorizationStatus,'blocked');
});
test('observer: explicit shared first-person contact unification retains contextual silence',()=>{
 const first=()=>r.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedVoice:'active'});
 const left=first(),right=first(),p=r.buildClassicalNahuatlSupplementationClauseEnvelope(left,{referenceId:'left',subjectReferenceId:'left'}),q=r.buildClassicalNahuatlSupplementationClauseEnvelope(right,{referenceId:'right',subjectReferenceId:'right'});
 const d=r.getClassicalNahuatlSupplementationChoiceDomains({principalClause:p,supplementClause:q,referenceMode:'shared',headRole:'subject',contactRole:'subject'});assert.deepEqual(d.contextualSilentValues,['absent','present']);
});
test('observer: complete adjectival requests retain fixed scope, order and contact correction',()=>{
 const head=noun(),modifier=noun(),c=r.createClassicalClauseRelationController();capture(c,head,modifier);
 const basic={relation:'adjectival-modification',topology:'ordinary',order:'head-modifier',modifierAdjunctor:'none'};
 for(const [key,value,correction] of [['compoundHeadTarget','compound-matrix','simple-head'],['linkKind','vnc-object','shared-subject'],['dependentLinkKind','vnc-object','shared-subject']]){
  const authored={...basic,[key]:value},contract=c.buildDecisionContract(authored);assert.equal(contract.authorizationStatus,'blocked',key);assert.equal(authored[key],value);const field=contract.currentChoiceFrame.decisions.find(x=>x.key===key);assert.ok(field,`${key}: visible correction`);assert.ok(field.values.includes(correction));
  const corrected=c.transitionAdjectivalChoice({selections:authored,expectedFrame:contract.currentChoiceFrame,intent:{type:'set-choice',key,value:correction}});assert.equal(corrected.contract.authorizationStatus,'authorized',corrected.contract.blockReason);
 }
 c.captureCurrentResult('dependent',noun());const authored={...basic,topology:'cooperating-preposed-nonpreposed'},contract=c.buildDecisionContract(authored);assert.equal(contract.authorizationStatus,'blocked');const field=contract.currentChoiceFrame.decisions.find(x=>x.key==='order');assert.deepEqual(field?.values,['cooperating-preposed-nonpreposed']);
 const corrected=c.transitionAdjectivalChoice({selections:authored,expectedFrame:contract.currentChoiceFrame,intent:{type:'set-choice',key:'order',value:'cooperating-preposed-nonpreposed'}});assert.equal(corrected.contract.authorizationStatus,'authorized',corrected.contract.blockReason);
});
import {createClassicalClauseRelationControllerGlobals} from '../application/classical/clause_relation_controller.mjs';
test('deleted saying retains the exact ordered preparation chain through preview and Make',()=>{
 const make=(sourceStem,extra={})=>r.requestClassicalVncApplicationResult({sourceStem,verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active',requestedDerivation:'direct',sourceInitialISelection:'real',...extra});
 const principal=make('nanquilia',{subject:'1sg',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3pl'});
 const dependent=make('ilhuia',{subject:'1sg',sourceValence:'multiple-object',objectRequests:[{objectId:'reported-supplement',objectKind:'specific-projective',objectPerson:'3sg',governor:'directive',derivationalLevel:1},{objectId:'addressees',objectKind:'specific-projective',objectPerson:'3pl',governor:'applicative',derivationalLevel:2}]});
 const adjoined=make('yā',{subject:'3pl',tense:'preterit'}),target=Object.create(r),prepared=[],executed=[];
 Object.defineProperties(target,{prepareClassicalGrammarApplicationRequest:{value:request=>{const p=r.prepareClassicalGrammarApplicationRequest(request);prepared.push(p);return p;}},executeClassicalGrammarApplicationRequest:{value:(request,p)=>{executed.push({request,p});return r.executeClassicalGrammarApplicationRequest(request,p);}}});
 const c=createClassicalClauseRelationControllerGlobals(target).createClassicalClauseRelationController();capture(c,principal,adjoined);c.captureCurrentResult('dependent',dependent);
 const choices={relation:'deleted-principal',speechDirectness:'direct'},contract=c.buildDecisionContract(choices);assert.equal(contract.authorizationStatus,'authorized',contract.blockReason);
 assert.deepEqual(prepared.map(p=>p.request.args[0].operationKind),['relation','deleted-principal']);assert.equal(prepared[1].request.args[0].options.deletedSupplementationFrame,prepared[0].canonicalResult);assert.equal(executed.length,0);
 assert.equal(c.preview(choices).canonicalResult,prepared[1].canonicalResult);assert.equal(prepared.length,2);const made=c.compose(choices);assert.equal(made.canonicalResult,prepared[1].canonicalResult);assert.deepEqual(executed.map(x=>x.request),prepared.map(p=>p.request));assert.deepEqual(executed.map(x=>x.p),prepared);
});
test('recursive adjunction freezes retained parents and grammar objects without changing their identities',()=>{
 const principal=verb(),modifier=verb('cuīca','A'),c=r.createClassicalClauseRelationController();capture(c,principal,modifier);
 const contract=c.buildDecisionContract({relation:'time',order:'modifier-head',relationProfile:'implicit'}),result=contract.preparation.canonicalResult;
 assert.equal(result.sourceContract.principal.issuedResult,principal);assert.equal(result.sourceContract.adjoined.issuedResult,modifier);
 const seen=new WeakSet(),visit=x=>{if(!x||typeof x!=='object'||seen.has(x))return;seen.add(x);assert.equal(Object.isFrozen(x),true,x.kind||'nested canonical record');for(const key of Reflect.ownKeys(x)){const d=Object.getOwnPropertyDescriptor(x,key);if('value'in d)visit(d.value);}};visit(result);
 assert.throws(()=>{result.sourceContract.principal.issuedResult.normalizedRequest.subject='2sg';},TypeError);assert.equal(result.sourceContract.principal.issuedResult,principal);
});
test('inactive adjectival dependent stays exact without authorizing an unused modifier',()=>{
 const c=r.createClassicalClauseRelationController(),head=noun(),modifier=noun(),dormant=r.requestClassicalParticleResult('l3-ca');capture(c,head,modifier);c.captureCurrentResult('dependent',dormant);
 const choices={relation:'adjectival-modification',topology:'ordinary',order:'head-modifier',modifierAdjunctor:'none'},contract=c.buildDecisionContract(choices);
 assert.equal(contract.authorizationStatus,'authorized',contract.blockReason);assert.equal(contract.currentChoiceFrame.inputs.find(x=>x.role==='dependent').applicability,'inactive');assert.equal(c.getCapturedCanonicalResult('dependent'),dormant);assert.equal(contract.preparation.request.args[0].interveningClauses,undefined);
});
test('observer: designation structure separates incompatible object from a missing exact auxiliary',()=>{
 const specific=verb('iht-o-ā','C',true),nonspecific=r.requestClassicalVncApplicationResult({sourceStem:'tōcāyōtiā',verbClass:'C',sourceValence:'projective-nonhuman',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active',requestedDerivation:'direct'}),complement=noun(),auxiliary=noun();
 const frame=source=>r.buildClassicalNahuatlClauseCompositionSourceFrame(source,{referenceId:'contact',subjectReferenceId:'contact',objectReferenceId:'contact'}),q=frame(complement),a=frame(auxiliary);
 const options={semanticCategory:'designation',linkKind:'object-subject',designationStructure:'tla-locative-supplement-plus-place-name',order:'principal-complement'};
 const request=principal=>({operationKind:'object-complement',principalClause:frame(principal),complementClause:q,options});
 const selected=d=>d.designationStructure.find(x=>x.value===options.designationStructure);
 assert.equal(selected(r.getClassicalNahuatlClauseComplementationChoiceDomains(request(specific))).status,'incompatible');
 const missing=request(nonspecific);assert.equal(selected(r.getClassicalNahuatlClauseComplementationChoiceDomains(missing)).status,'missing-prerequisite');assert.deepEqual(selected(r.getClassicalNahuatlClauseComplementationChoiceDomains(missing)).missingCaptureRoles,['dependent']);
 assert.equal(r.evaluateClassicalNahuatlClauseComplementation(missing).authorizationStatus,'blocked');
 const full={...missing,auxiliaryClause:a};assert.equal(selected(r.getClassicalNahuatlClauseComplementationChoiceDomains(full)).status,'available');assert.equal(r.evaluateClassicalNahuatlClauseComplementation(full).authorizationStatus,'authorized');
 assert.equal(selected(r.getClassicalNahuatlClauseComplementationChoiceDomains({...full,auxiliaryClause:{...a}})).status,'incompatible');
 const c=r.createClassicalClauseRelationController();capture(c,nonspecific,complement);c.captureCurrentResult('dependent',auxiliary);assert.equal(c.buildDecisionContract({relation:'object-complement',semanticCategory:'designation',linkKind:'object-subject',designationStructure:options.designationStructure,complementOrder:'principal-complement'}).authorizationStatus,'authorized');
 const multiple=r.requestClassicalVncApplicationResult({sourceStem:'tōcāyōtiā',verbClass:'C',sourceValence:'multiple-object',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active',requestedDerivation:'direct',objectRequests:[{objectId:'named',objectKind:'nonspecific-nonhuman',governor:'directive',derivationalLevel:1},{objectId:'other',objectKind:'specific-projective',objectPerson:'3sg',governor:'applicative',derivationalLevel:2}]});
 assert.equal(multiple.authorizationStatus,'authorized');const multi=r.createClassicalClauseRelationController();capture(multi,multiple,complement);multi.captureCurrentResult('dependent',auxiliary);
 const multiChoices={relation:'object-complement',semanticCategory:'designation',linkKind:'object-subject',designationStructure:options.designationStructure,complementOrder:'principal-complement',principalObjectId:'named'};
 const multiContract=multi.buildDecisionContract(multiChoices);assert.equal(multiContract.authorizationStatus,'authorized',multiContract.blockReason);assert.equal(multiContract.preparation.request.args[0].options.principalObjectId,'named');
 assert.equal(multi.buildDecisionContract({...multiChoices,principalObjectId:'other'}).authorizationStatus,'blocked');

});
test('missing designation auxiliary can be selected for explicit Source recovery without granting Make',()=>{
 const principal=r.requestClassicalVncApplicationResult({sourceStem:'tōcāyōtiā',verbClass:'C',sourceValence:'projective-nonhuman',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active',requestedDerivation:'direct'}),c=r.createClassicalClauseRelationController();capture(c,principal,noun());
 const choices={relation:'object-complement',semanticCategory:'designation',linkKind:'object-subject',designationStructure:'ordinary-object-complement',complementOrder:'principal-complement'},contract=c.buildDecisionContract(choices),field=contract.decisions.find(x=>x.id==='designation-structure');
 assert.equal(field.determinesCaptureRoles,true);
 const element=tag=>({tag,children:[],dataset:{},setAttribute(){},addEventListener(){},appendChild(x){this.children.push(x);},append(...x){this.children.push(...x);}}),ctx=vm.createContext({targetObject:{document:{createElement:element}},ActiveClassicalGrammarResultBinding:null,CLASSICAL_CLAUSE_RELATION_DECISION_LABELS:{},formatClassicalClauseRelationValue:x=>x,normalizeAndrewsReference:()=>'',compactClassicalChoiceMenu(){}});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=code.indexOf('    function createClassicalClauseRelationDecisionControl(');vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);
 const select=ctx.createClassicalClauseRelationDecisionControl(field).children.find(x=>x.tag==='select');assert.equal(select.children.find(x=>x.value==='tla-locative-supplement-plus-place-name').disabled,false);
 const next=c.transitionComplementChoice({selections:choices,expectedFrame:contract.currentChoiceFrame,intent:{type:'set-choice',key:'designationStructure',value:'tla-locative-supplement-plus-place-name'}});assert.equal(next.contract.authorizationStatus,'blocked');assert.ok(next.contract.missingCaptureRoles.includes('dependent'));assert.equal(c.preview(next.selections),null);assert.equal(c.compose(next.selections).authorizationStatus,'blocked');
});
