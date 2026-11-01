import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {Element} from './helpers/organization_dom.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;

function equipNativeCommit(h) {
 const element=tag=>{const node=new Element(tag);node.style={};node.removeAttribute=name=>{delete node.attributes[name];};node.classList.remove=name=>{node.className=node.className.split(/\s+/).filter(x=>x!==name).join(' ');};node.classList.toggle=(name,force)=>{const selected=force??!node.classList.contains(name);if(selected)node.classList.add(name);else node.classList.remove(name);return selected;};Object.defineProperty(node,'selectedOptions',{get:()=>node.options.filter(option=>option.value===node.value)});return node;};
 for(const [id,original] of h.controls){const node=element(original.tagName?.toLowerCase() || 'div');node.id=id;for(const key of ['value','disabled','hidden','checked','type'])if(key in original)node[key]=original[key];Object.assign(node.dataset,original.dataset);for(const option of original.options || []){const child=element('option');Object.assign(child,option);node.append(child);}h.controls.set(id,node);}
 const nameLabel=element('label');nameLabel.append(h.controls.get('classical-personal-name-locative-matrix'));
 h.documentObject.createElement=element;h.documentObject.body=element('body');
 for(const id of ['classical-personal-name-sentence-context']){const node=element('div');node.id=id;h.controls.set(id,node);}
}

test('Source VNC class decision shares actual context and preserves authored compound D',()=>{
 assert.equal(typeof r.buildClassicalNahuatlVerbstemSourceClassContext,'function');
 for(const verbClass of ['', 'A','D']) {
  const input={verbClass,valence:'intransitive',sourceSelectionKind:'embed-matrix',sourceEmbedStem:'tōch',sourceMatrixStem:'cua'};
  const draft=r.buildClassicalNahuatlVerbstemSourceClassContext('tōch-cua',input);
  const actual=r.buildClassicalNahuatlVerbstemClassFrame('tōch-cua',input);
  assert.equal(r.isClassicalNahuatlVerbstemSourceClassContext(draft),true);
  assert.equal(r.isClassicalNahuatlVerbstemSourceClassContext({...draft}),false);
  assert.equal(draft.requestedOptions.verbClass,verbClass);
  assert.equal(draft.classRuleFrame.classId,actual.classRuleFrame.classId);
  assert.equal(draft.classRuleFrame.compoundMatrixClassInherited,verbClass==='D');
  assert.equal(draft.classRuleFrame.authorizationStatus,actual.classRuleFrame.authorizationStatus);
 }
 const incomplete=r.buildClassicalNahuatlVerbstemSourceClassContext('tōch',{sourceSelectionKind:'embed-matrix',sourceEmbedStem:'tōch'});
 assert.equal(incomplete.sourceSelectionFrame.authorizationStatus,'blocked');
 assert.equal(incomplete.sourceSelectionFrame.explicitEmbedStem,'tōch');
 assert.equal(incomplete.sourceSelectionFrame.explicitMatrixStem,'');
});

test('ordinary NNC draft class offerings share canonical reclassification and shape admission without issuing Sources for options',()=>{
 assert.equal(typeof r.getClassicalNahuatlOrdinaryNncSourceDecision,'function');
 for(const input of [{stem:'māi',sourceClass:'tl-2-a'},{stem:'tōch',sourceClass:'in'},
  {stem:'tōch',sourceClass:'tl-2-a'},{stem:'māi',sourceClass:'tl-2-a-to-1-a'},
  {stem:'izna',sourceClass:'tl-2-b-i'},{stem:'pil',supportiveInitialI:true},
  {stem:'tōch',embedStem:'tōch',matrixStem:'',sourceClass:'in'}]) {
   const draft=r.getClassicalNahuatlOrdinaryNncSourceDecision(input);
   const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame(input);
   assert.equal(r.isClassicalNahuatlOrdinaryNncSourceDecision(draft),true);
   assert.equal(r.isClassicalNahuatlOrdinaryNncSourceDecision({...draft}),false);
   assert.equal(r.isClassicalNahuatlOrdinaryNncSourceFrame(draft),false);
   assert.equal(draft.authorizationStatus,source.authorizationStatus);
   assert.equal(draft.blockReason,source.blockReason);
   assert.equal(draft.requestedSourceClass,input.sourceClass||'');
   for(const value of draft.allowedClassIds) {
    const next=r.buildClassicalNahuatlOrdinaryNncSourceFrame({...input,sourceClass:value,supportiveInitialI:false});
    assert.notEqual(next.blockReason,'ordinary-nnc-source-class-contradicts-canonical-source');
    assert.notEqual(next.blockReason,'open-nounstem-source-class-analysis-not-recognized');
   }
 }
 const reclass=r.getClassicalNahuatlOrdinaryNncSourceDecision({stem:'māi'});
 assert(reclass.allowedClassIds.includes('tl-2-a-to-1-a'));
 const rejected=r.getClassicalNahuatlOrdinaryNncSourceDecision({stem:'pil',supportiveInitialI:true});
 assert.equal(rejected.requestedSupportiveInitialI,true);
 assert.deepEqual(rejected.supportiveInitialIValues,[false]);
});

test('application Source draft retains owner recovery and accepts only exact current ready payload once',()=>{
 assert.equal(typeof r.issueClassicalSourceAuthoringDecision,'function');
 const input={unit:'vnc',revision:7,signature:'source-7',parts:{mode:'embed-matrix',sourceEmbedStem:'tōch',sourceMatrixStem:''},source:{verbClass:'D',valence:'intransitive'}};
 const blocked=r.issueClassicalSourceAuthoringDecision(input);
 assert.equal(r.isClassicalSourceAuthoringDecision(blocked),true);
 assert.equal(blocked.authorizationStatus,'blocked');
 assert.equal(blocked.structureDecision.userSelectionContradictionReason,'typed-embed-matrix-requires-both-source-constituents');
 assert.equal(r.acceptClassicalSourceAuthoringDecision(blocked,{revision:7,signature:'source-7'}),null);
 assert.equal(r.acceptClassicalSourceAuthoringDecision({...blocked},{revision:7,signature:'source-7'}),null);
 const ready=r.issueClassicalSourceAuthoringDecision({...input,parts:{...input.parts,sourceMatrixStem:'cua'}});
 assert.equal(ready.authorizationStatus,'authorized',ready.blockReason);
 assert.equal(ready.requestedSourceClass,'D');
 assert.equal(ready.effectiveSourceClass,'D');
 assert.equal(r.acceptClassicalSourceAuthoringDecision(ready,{revision:8,signature:'source-7'}),null);
 const payload=r.acceptClassicalSourceAuthoringDecision(ready,{revision:7,signature:'source-7'});
 assert(payload===ready.applyPayload);
 assert(payload.classContext===ready.classContext);
 assert(Object.isFrozen(payload));
 assert.equal(r.acceptClassicalSourceAuthoringDecision(ready,{revision:7,signature:'source-7'}),null);
 const stale=r.issueClassicalSourceAuthoringDecision({...input,parts:{mode:'whole-stem',sourceWholeStem:'cochi'},source:{verbClass:'B',valence:'intransitive'}});
 r.discardClassicalSourceAuthoringDecision(stale);
 assert.equal(r.isClassicalSourceAuthoringDecision(stale),false);
 assert.equal(r.acceptClassicalSourceAuthoringDecision(stale,{revision:7,signature:'source-7'}),null);
});

test('application Source preserves ordinary invalid class and Boolean initial-i versus VNC contextual semantics',()=>{
 const raw={unit:'nnc',revision:1,signature:'n',parts:{mode:'whole-stem',sourceWholeStem:'pil'},source:{sourceClass:'invented',supportiveInitialI:true}};
 assert.equal(typeof r.issueClassicalSourceAuthoringDecision,'function');
 const rejected=r.issueClassicalSourceAuthoringDecision(raw);
 assert.equal(rejected.authorizationStatus,'blocked');
 assert.equal(rejected.requestedSourceClass,'invented');
 assert.equal(rejected.nncDecision.requestedSupportiveInitialI,true);
 const corrected=r.issueClassicalSourceAuthoringDecision({...raw,source:{sourceClass:'tli-1',supportiveInitialI:false}});
 assert.equal(corrected.authorizationStatus,'authorized',corrected.blockReason);
 assert(corrected.applyPayload.sourceFrame===corrected.nncDecision.sourceFrame);
 const contextual=r.issueClassicalSourceAuthoringDecision({unit:'vnc',revision:2,signature:'v',parts:{mode:'whole-stem',sourceWholeStem:'izatēza'},source:{verbClass:'A',valence:'projective-nonhuman',sourceInitialISelection:'contextual'}});
 assert.equal(contextual.initialIDecision.requestedKind,'contextual');
 assert.equal(contextual.initialIDecision.resolvedKind,'supportive');
 let read=false;
 const hostile={unit:'nnc',get source(){read=true;return {stem:'pil'};}};
 assert.equal(r.issueClassicalSourceAuthoringDecision(hostile),null);
 assert.equal(read,false);
});

test('native Source draft keeps its issued revision while unchanged, invalidates edits, and blocks incompatible Apply before mutation',async()=>{
 const {createPossessiveFixture}=await import('./helpers/deverbal_possessive_fixture.mjs');
 const h=await createPossessiveFixture('pil');
 h.controls.set('classical-basal-unit-controls',{dataset:{classicalBasalUnit:'nnc'}});
 h.controls.set('classical-source-parts',{dataset:{classicalSourcePartsMode:'whole-stem',classicalSourceCommitState:'pending'}});
 h.set('classical-construction-operation','none');
 h.set('classical-rule-logic-nnc-class','invented');
 assert.equal(typeof h.r.getClassicalSourceAuthoringDecision,'function');
 const first=h.r.getClassicalSourceAuthoringDecision();
 assert.equal(first.authorizationStatus,'blocked');
 assert(h.r.getClassicalSourceAuthoringDecision()===first);
 const before=h.r.ClassicalSourcePartsCommittedSignature;
 assert.equal(h.r.commitClassicalSourcePartsEvaluation({force:true,source:'manual-entry'}),false);
 assert.equal(h.r.ClassicalSourcePartsCommittedSignature,before);
 assert.equal(h.controls.get('classical-rule-logic-nnc-class').value,'invented');
 h.set('classical-rule-logic-nnc-class','tli-1');
 const next=h.r.getClassicalSourceAuthoringDecision();
 assert.equal(next.authorizationStatus,'authorized',next.blockReason);
 assert(next.revision>first.revision);
 assert.equal(h.r.isClassicalSourceAuthoringDecision(first),false);
 assert(h.r.getClassicalSourceAuthoringDecision()===next);
});

test('Source object declaration derives rows through actual cluster guards without clamping authored intent',()=>{
 assert.equal(typeof r.getClassicalNahuatlVncSourceObjectDecision,'function');
 const input={stem:'nōteza',valence:'mainline-reflexive',subject:'2sg',count:2,rows:[{objectKind:'nonspecific-nonhuman',objectPerson:''}]};
 const decision=r.getClassicalNahuatlVncSourceObjectDecision(input);
 assert.equal(decision.authorizationStatus,'authorized',decision.blockReason);
 assert.equal(decision.objectRequests[0].objectKind,'reflexive');
 assert.equal(decision.objectRequests[0].objectPerson,'2sg');
 assert.equal(decision.objectRequests[1].objectKind,'nonspecific-nonhuman');
 assert.equal(decision.minimumPositionCount,1);
 assert.equal(r.getClassicalNahuatlVncSourceObjectDecision({...input,count:9}).authorizationStatus,'blocked');
 const explicit=r.getClassicalNahuatlVncSourceObjectDecision({...input,rows:[{objectKind:'specific-projective',objectPerson:'3common'}]});
 assert.equal(explicit.authorizationStatus,'authorized',explicit.blockReason);
 assert.equal(explicit.objectRequests[1].participantFrame.category,'3common');
 const contradictory=r.getClassicalNahuatlVncSourceObjectDecision({...input,rows:[{objectKind:'specific-projective',objectPerson:'1sg',animacy:'nonanimate'}]});
 assert.equal(contradictory.authorizationStatus,'blocked');
 assert.equal(contradictory.declaration.rows[0].animacy,'nonanimate');
});

test('editing Source stem preserves the selected object count and exact authored row identity',async()=>{
 const rows=await import('../ui/composer/source_objects.mjs');
 const nodes=new Map();
 const make=(id,value='')=>{const node={id,value,addEventListener(type,fn){(this.listeners[type] ||= []).push(fn);},listeners:{},setAttribute(){},closest:()=>null};nodes.set(id,node);return node;};
 make('classical-source-object-count','2');make('classical-source-object-add');make('classical-source-object-remove');const stem=make('classical-source-whole','cochi');
 for(const i of [2,3]){make(`classical-source-object-${i}-kind`,'specific-projective');make(`classical-source-object-${i}-person`,'2sg');}
 const d={getElementById:id=>nodes.get(id)||null,addEventListener(){}};
 rows.installClassicalSourceObjectRows(d,()=>{});
 stem.value='nōteza';for(const listener of stem.listeners.input || [])listener({target:stem});
 assert.equal(nodes.get('classical-source-object-count').value,'2');
 assert.equal(nodes.get('classical-source-object-2-person').value,'2sg');
});

test('actual Source reference rejects direct contradictions and owner transitions supply a reachable explicit correction',async()=>{
 const owner=await import('../core/classical/participant_frame.mjs');
 assert.equal(typeof owner.getClassicalNahuatlParticipantAxisChoiceOptions,'function');
 const authored={role:'subject',person:'1',number:'singular',animacy:'nonanimate',humanness:'nonhuman'};
 assert.equal(owner.isClassicalNahuatlParticipantReferenceSelectionCompatible(authored),false);
 const choices=owner.getClassicalNahuatlParticipantAxisChoiceOptions(authored);
 const toHuman=choices.person.find(choice=>choice.value==='2');
 assert(toHuman);assert.equal(toHuman.selections.animacy,'animate');assert.equal(toHuman.selections.humanness,'human');
 assert.equal(owner.isClassicalNahuatlParticipantReferenceSelectionCompatible(toHuman.selections),true);
 const request={sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'1sg',sourceSubject:'1sg',sourceSubjectAnimacy:'nonanimate',sourceSubjectHumanness:'nonhuman'};
 const bad=r.evaluateClassicalNahuatlVncApplication(request);
 assert.equal(bad.authorizationStatus,'blocked');
 assert.equal(bad.blockReason,'classical-vnc-source-participant-reference-contradiction');
 const good=r.evaluateClassicalNahuatlVncApplication({...request,sourceSubject:'2sg',sourceSubjectAnimacy:toHuman.selections.animacy,sourceSubjectHumanness:toHuman.selections.humanness});
 assert.equal(good.authorizationStatus,'authorized',good.blockReason);
});

test('native reclassification is a new current draft and attested Source schemas retain authentic specialized issuers',async()=>{
 const {createPossessiveFixture}=await import('./helpers/deverbal_possessive_fixture.mjs');
 const h=await createPossessiveFixture('māi');h.controls.set('classical-basal-unit-controls',{dataset:{classicalBasalUnit:'nnc'}});
 h.controls.set('classical-source-parts',{dataset:{classicalSourcePartsMode:'whole-stem',classicalSourceCommitState:'pending'}});
 h.set('classical-construction-operation','none');h.set('classical-rule-logic-nnc-class','tl-2-a');h.set('classical-rule-logic-nnc-tl2a-realization','retain-2a');
 const first=h.r.getClassicalSourceAuthoringDecision();
 h.set('classical-rule-logic-nnc-tl2a-realization','reclassify-1a');
 const next=h.r.getClassicalSourceAuthoringDecision();assert.notEqual(next,first);assert(next.revision>first.revision);
 assert.equal(next.requestedSourceClass,'tl-2-a-to-1-a');
 equipNativeCommit(h);
 assert.equal(h.r.commitClassicalSourcePartsEvaluation({force:true,source:'manual-entry'}),true);
 const committed=h.r.getClassicalAcceptedSourceAuthoringPayload(h.r.getClassicalCommittedSourceAuthoringDecision());
 assert(committed.sourceFrame===next.applyPayload.sourceFrame);
 const identity=h.r.deriveClassicalNncSourceIdentity('māi',h.r.getClassicalSourcePartControlState(),{sourceClass:'tl-2-a-to-1-a'});
 assert(identity.typedSourceFrame===committed.sourceFrame,'downstream canonical reclassification retains the exact applied Source');
 for(const [sourceUse,stem,validate] of [
  ['attested-cell','picīltic','isClassicalNahuatlAttestedNncCellSourceFrame'],
  ['attested-place','Teticpac','isClassicalNahuatlAttestedPlaceSourceFrame'],
  ['attested-collocation','achi īc','isClassicalNahuatlAttestedPrincipalCollocationSourceFrame']]) {
   const actual=h.r.issueCanonicalNncSourceFrame({stem,sourceUse});
   assert.equal(h.r[validate](actual),true);
   h.set('classical-source-whole',stem);h.set('classical-rule-logic-nnc-source-use',sourceUse);
   const decision=h.r.getClassicalSourceAuthoringDecision();assert.equal(decision.authorizationStatus,'authorized',decision.blockReason);
   assert.equal(h.r[validate](decision.applyPayload.sourceFrame),true);
 }
});

test('Source retained nested authority is immutable, and accepted Source payload remains authentic after its draft is discarded',()=>{
 const input={unit:'vnc',revision:3,signature:'s',parts:{mode:'whole-stem',sourceWholeStem:'cochi'},source:{verbClass:'B',valence:'intransitive'}};
 const decision=r.issueClassicalSourceAuthoringDecision(input);
 assert(Object.isFrozen(decision.classContext.classRuleFrame));
 assert(Object.isFrozen(decision.structureDecision));
 assert(Object.isFrozen(decision.classContext.requestedOptions));
 assert.throws(()=>{decision.classContext.classRuleFrame.classId='D';},TypeError);
 assert.throws(()=>{decision.structureDecision.selectedWholeStem='forged';},TypeError);
 const payload=r.acceptClassicalSourceAuthoringDecision(decision,{revision:3,signature:'s'});
 r.discardClassicalSourceAuthoringDecision(decision);
 assert.equal(typeof r.getClassicalAcceptedSourceAuthoringPayload,'function');
 assert(r.getClassicalAcceptedSourceAuthoringPayload(decision)===payload);
 assert.equal(r.getClassicalAcceptedSourceAuthoringPayload({...decision}),null);
});

test('specialized VNC Source decisions authenticate real scoped ingress and do not infer success from absent status',()=>{
 const fixtures=[['itz','cn-vnc-itz-motion-matrix','isClassicalNahuatlRestrictedContainingVncSourceFrame'],
  ['chich-ī-ni','','isClassicalNahuatlAnalyticalVncSourceFrame'],['mo-ca','','isClassicalNahuatlImperfectiveVncSourceFrame'],
  ['cah-ca-h','','isClassicalNahuatlPreformedVncSourceFrame'],['nec-ō','','isClassicalNahuatlNonactiveCarrierSourceFrame']];
 for(const [stem,sourceLexemeId,validate] of fixtures){
  const input={unit:'vnc',revision:4,signature:stem,parts:{mode:'whole-stem',sourceWholeStem:stem},source:{valence:'intransitive',verbClass:'',sourceLexemeId}};
  const draft=r.issueClassicalSourceAuthoringDecision(input);
  assert.equal(draft.authorizationStatus,'authorized',`${stem}: ${draft.blockReason}`);
  assert.equal(r[validate](draft.applyPayload.sourceFrame),true,stem);
  const rejected=r.issueClassicalSourceAuthoringDecision({...input,source:{...input.source,verbClass:'invented'}});
  assert.equal(rejected.authorizationStatus,'blocked',stem);
  assert.equal(rejected.requestedSourceClass,'INVENTED');
 }
});

test('application draft retains the same exact selected object and participant through admission and Apply',()=>{
 const input={unit:'vnc',revision:6,signature:'object-source',parts:{mode:'whole-stem',sourceWholeStem:'nōteza'},
  source:{verbClass:'A',valence:'mainline-reflexive'},objectDeclaration:{count:2,subject:'2sg',rows:[{objectKind:'specific-projective',objectPerson:'3common'}]}};
 const decision=r.issueClassicalSourceAuthoringDecision(input);
 assert.equal(decision.authorizationStatus,'authorized',decision.blockReason);
 const selected=decision.objectDecision.objectRequests[1],participant=selected.participantFrame;
 const payload=r.acceptClassicalSourceAuthoringDecision(decision,{revision:6,signature:'object-source'});
 assert(payload.objectDecision===decision.objectDecision);
 assert(payload.objectDecision.sourceObjectRequests[1]===selected);
 assert(payload.objectDecision.sourceObjectRequests[1].participantFrame===participant);
 const bad=r.issueClassicalSourceAuthoringDecision({...input,objectDeclaration:{...input.objectDeclaration,count:9}});
 assert.equal(bad.authorizationStatus,'blocked');assert.equal(bad.objectDecision.declaration.count,9);
 assert.equal(r.acceptClassicalSourceAuthoringDecision(bad,{revision:6,signature:'object-source'}),null);
});

test('two-nucleus Source draft retains its two exact owner children, invalid intent and authentic relation through Apply',()=>{
 const nuclei={principal:{stem:'cuatzotōcuichōx',sourceClass:'tli-1',subject:'1pl',state:'possessive',humanness:'human',possessor:'2pl',pluralConnector:''},
  supplement:{stem:'tzācuozapēxe',sourceClass:'tl-1-a',subject:'2pl',state:'absolutive',humanness:'human',possessor:'',pluralConnector:'m-eh'}};
 const input={unit:'nnc',revision:9,signature:'double',parts:{mode:'two-nucleus-nnc'},nuclei,analysis:'fixed-order-possessor-supplementation'};
 const decision=r.issueClassicalSourceAuthoringDecision(input);
 assert.equal(decision.authorizationStatus,'authorized',decision.blockReason);
 assert(r.isClassicalNahuatlOrdinaryNncResult(decision.nuclei.principal.result));
 assert(r.isClassicalNahuatlOrdinaryNncResult(decision.nuclei.supplement.result));
 const payload=r.acceptClassicalSourceAuthoringDecision(decision,{revision:9,signature:'double'});
 assert(payload.sourceFrame.principalNncResult===decision.nuclei.principal.result);
 assert(payload.sourceFrame.supplementNncResult===decision.nuclei.supplement.result);
 assert(r.isClassicalNahuatlSupplementationFrame(payload.sourceFrame.canonicalSupplementationResult));
 assert(r.getClassicalNahuatlSupplementationClauseSourceFrame(payload.sourceFrame.canonicalSupplementationResult.principalClause)===decision.nuclei.principal.result);
 const invalid=r.issueClassicalSourceAuthoringDecision({...input,nuclei:{...nuclei,supplement:{...nuclei.supplement,subject:'1sg',humanness:'nonhuman'}}});
 assert.equal(invalid.authorizationStatus,'blocked');assert.equal(invalid.declaration.nuclei.supplement.humanness,'nonhuman');
 assert(invalid.nuclei.supplement.operationDecision.choiceOptionProjection.humanness.some(option=>option.optionId==='human'&&option.availabilityStatus==='available'));
 assert.equal(r.acceptClassicalSourceAuthoringDecision(invalid,{revision:9,signature:'double'}),null);
});

test('an authentic selected Source cannot authorize different authored material, class, structure, use or unit',()=>{
 const selected=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil'});
 const input={unit:'nnc',revision:10,signature:'exact',parts:{mode:'whole-stem',sourceWholeStem:'pil'},source:{},selectedSourceFrame:selected};
 assert.equal(r.issueClassicalSourceAuthoringDecision(input).authorizationStatus,'authorized');
 for(const change of [{parts:{mode:'whole-stem',sourceWholeStem:'cal'}},{source:{sourceClass:'zero'}},
  {parts:{mode:'embed-matrix',sourceEmbedStem:'pi',sourceMatrixStem:'l'}},{source:{sourceUse:'attested-cell'}},
  {unit:'vnc',parts:{mode:'two-nucleus-nnc'}}]) {
   const rejected=r.issueClassicalSourceAuthoringDecision({...input,...change});
   assert.equal(rejected.authorizationStatus,'blocked',JSON.stringify(change));
 }
 const first=r.issueClassicalSourceAuthoringDecision(input);
 r.issueClassicalSourceAuthoringDecision({...input,revision:11,signature:'new'});
 assert.equal(r.acceptClassicalSourceAuthoringDecision(first,{revision:10,signature:'exact'}),null,'replaced application draft is stale even when caller supplies old matching scalars');
});

test('raw ownerhood Source retains its existing coarse TL subclass-one offering through the actual Source owner',()=>{
 assert.equal(typeof r.getClassicalNahuatlOwnerhoodSourceClassDecision,'function');
 const decision=r.getClassicalNahuatlOwnerhoodSourceClassDecision({sourceStem:'nōteza',sourceClass:'tl-1'});
 assert.equal(decision.authorizationStatus,'authorized',decision.blockReason);
 assert(decision.options.some(option=>option.sourceClass==='tl-1'&&option.sourceAnalysis.authorizationStatus==='authorized'));
 assert.equal(decision.sourceAnalysis.nounSubclass,'1');
 const draft=r.issueClassicalSourceAuthoringDecision({unit:'nnc',revision:1,signature:'ownerhood',parts:{mode:'whole-stem',sourceWholeStem:'nōteza'},
  source:{sourceClass:'tl-1'},sourceContext:{construction:'deverbal-nnc',deverbalFamily:'ownerhood'}});
 assert.equal(draft.authorizationStatus,'authorized',draft.blockReason);
 assert.equal(draft.ownerhoodDecision.sourceAnalysis.nounSubclass,'1');
});

test('object-row disclosure projects owner applicability',async()=>{
 const rows=await import('../ui/composer/source_objects.mjs');
 const decision=r.issueClassicalSourceAuthoringDecision({unit:'vnc',revision:1,signature:'reflexive',parts:{mode:'whole-stem',sourceWholeStem:'nōteza'},
  source:{verbClass:'A',valence:'human-reciprocal'},objectDeclaration:{count:2,subject:'2pl',rows:[{objectKind:'nonspecific-nonhuman'}]}});
 assert.equal(decision.authorizationStatus,'authorized',decision.blockReason);
 const disclosure={hidden:true,setAttribute(){}};
 const d={documentElement:{dataset:{classicalBasalUnit:'vnc'}},getElementById:id=>id==='classical-source-object-details'?disclosure:id==='classical-rule-logic-valence'?{value:'human-reciprocal'}:null};
 const owner={getClassicalSourceAuthoringDecision:()=>decision};
 rows.syncClassicalSourceObjectRows(d,owner);
 assert.equal(disclosure.hidden,false,'the actual Source object owner admits these rows');
});

test('existing relational and analyzed name Source ingresses retain their exact owner frames and current primitive material',()=>{
 const sourceRequest={state:'possessive',possessorId:'1sg',subjectMode:'adverbialized',subjectId:'3common',nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'tloc-proximity',formation:'option-one',operation:'relational-nnc',sourceKind:'possessor',sourceFormation:'plain-nounstem',sourceVoice:'active',sourceMode:'whole-stem',sourceStem:'tloc',sourceMatrixStem:'tloc',affective:'none'}};
 const relational=r.issueClassicalSourceAuthoringDecision({unit:'nnc',revision:1,signature:'relational',parts:{mode:'whole-stem',sourceWholeStem:'tloc'},sourceContext:{construction:'relational-nnc'},sourceRequest});
 assert.equal(relational.authorizationStatus,'authorized',relational.blockReason);
 assert(r.isClassicalNahuatlRelationalNncTypedSourceFrame(relational.applyPayload.sourceFrame));
 const name=r.buildPersonalNameOpaqueQuotedInnerSourceFrame({sourceFamily:'opaque-quoted-inner',quotedCitation:'Nōteza',referenceKind:'human',citationOuterSubject:'3sg'});
 assert(r.isPersonalNameNncSourceFrame(name));
 const input={unit:'nnc',revision:2,signature:'name',parts:{mode:'whole-stem',sourceWholeStem:'Nōteza'},sourceContext:{construction:'personal-name-nnc',sourceFamily:'opaque-quoted-inner'},sourceRequest:{sourceFrame:name}};
 const decision=r.issueClassicalSourceAuthoringDecision(input);
 assert.equal(decision.authorizationStatus,'authorized',decision.blockReason);assert(decision.applyPayload.sourceFrame===name);
 const rejected=r.issueClassicalSourceAuthoringDecision({...input,parts:{mode:'whole-stem',sourceWholeStem:'Different'}});
 assert.equal(rejected.authorizationStatus,'blocked');
 assert.equal(r.issueClassicalSourceAuthoringDecision({...input,sourceRequest:{sourceFrame:{...name}}}),null);
});

test('Source recovery presentation points to the actual blocked structure or object declaration',async()=>{
 const {getSourceClassRequirement}=await import('../ui/composer/source_admission.mjs');
 const request={unit:'vnc',revision:1,signature:'incomplete',parts:{mode:'embed-matrix',sourceEmbedStem:'tōch',sourceMatrixStem:''},source:{verbClass:'D',valence:'intransitive'}};
 const partial=r.issueClassicalSourceAuthoringDecision(request);
 const view=decision=>getSourceClassRequirement({getClassicalSourceAuthoringDecision:()=>decision,isClassicalSourceAuthoringDecision:r.isClassicalSourceAuthoringDecision});
 assert.equal(view(partial).fieldId,'classical-source-matrix');assert.match(view(partial).message,/both Source parts/);
 const objects=r.issueClassicalSourceAuthoringDecision({...request,parts:{mode:'whole-stem',sourceWholeStem:'nōteza'},source:{verbClass:'A',valence:'intransitive'},objectDeclaration:{subject:'1sg',count:2,rows:[{objectKind:'reflexive'}]}});
 assert.equal(view(objects).fieldId,'classical-source-object-count');assert.match(view(objects).message,/Source objects/);
});

test('an existing consuming nominal Source keeps current scoped analysis without becoming an ordinary noun Source',()=>{
 const sourceRequest={constructionKind:'affective-nnc',affectiveMatrix:'pōl',source:{embedStem:'tōch',embedClass:'tli',embedSourceClass:'tli'},subject:'3common',state:'absolutive',animacy:'nonanimate'};
 const actual=r.issueClassicalNahuatlNominalConstructionSourceAuthorization(sourceRequest);
 assert(r.isClassicalNahuatlNominalConstructionSourceAuthorization(actual));assert.equal(actual.authorizationStatus,'authorized',actual.blockReason);
 const input={unit:'nnc',revision:1,signature:'scoped-general',parts:{mode:'whole-stem',sourceWholeStem:'tōch'},source:{sourceUse:'general-use',sourceClass:'tli'},sourceContext:{construction:'affective-nnc'},sourceRequest};
 const draft=r.issueClassicalSourceAuthoringDecision(input);
 assert.equal(draft.authorizationStatus,'authorized',draft.blockReason);
 assert(r.isClassicalNahuatlNominalConstructionSourceAuthorization(draft.applyPayload.sourceAuthorization));
 assert.equal(r.isClassicalNahuatlOrdinaryNncSourceFrame(draft.applyPayload.sourceFrame),false);
 assert.equal(r.issueClassicalSourceAuthoringDecision({...input,parts:{mode:'whole-stem',sourceWholeStem:'pil'}}).authorizationStatus,'blocked');
});


test('ownerhood class recovery never overrides unrelated Source intent and quantitative citation binds authored whole',()=>{
 const input={unit:'nnc',revision:1,signature:'guard',parts:{mode:'whole-stem',sourceWholeStem:'nōteza'},source:{sourceClass:'tl-1'},sourceContext:{construction:'deverbal-nnc',deverbalFamily:'ownerhood'}};
 assert.equal(r.issueClassicalSourceAuthoringDecision({...input,source:{...input.source,supportiveInitialI:true}}).authorizationStatus,'blocked');
 assert.equal(r.issueClassicalSourceAuthoringDecision({...input,parts:{mode:'embed-matrix',sourceEmbedStem:'nōteza',sourceMatrixStem:''}}).authorizationStatus,'blocked');
 const quantitative={unit:'nnc',revision:2,signature:'quant',parts:{mode:'whole-stem',sourceWholeStem:'miac'},source:{sourceUse:'quantitative-predicate',citation:'miequintin',reference:'nonanimate-common'}};
 assert.equal(r.issueClassicalSourceAuthoringDecision(quantitative).authorizationStatus,'blocked');
 assert.equal(r.issueClassicalSourceAuthoringDecision({...quantitative,parts:{mode:'embed-matrix',sourceEmbedStem:'mi',sourceMatrixStem:'ac'},source:{...quantitative.source,citation:'mi-ac'}}).authorizationStatus,'blocked');
});

test('classless lexical adverbial Source retains its existing dedicated ingress',()=>{
 const draft=r.issueClassicalSourceAuthoringDecision({unit:'nnc',revision:1,signature:'classless',parts:{mode:'whole-stem',sourceWholeStem:'tlapīc'},source:{}});
 assert.equal(draft.authorizationStatus,'authorized',draft.blockReason);
 assert.equal(r.isClassicalNahuatlAdverbialPotentialFrame(draft.applyPayload.sourceFrame),true);
 assert.equal(draft.applyPayload.sourceFrame.lexicalNncSourceFrame.ordinaryNounParadigmAuthorized,false);
});


test('accepted nominal and ownerhood Source analyses reach the real receiving owners by exact identity',()=>{
 const sourceRequest={constructionKind:'affective-nnc',affectiveMatrix:'pōl',source:{embedStem:'tōch',embedClass:'tli',embedSourceClass:'tli'},subject:'3common',state:'absolutive',animacy:'nonanimate'};
 const draft=r.issueClassicalSourceAuthoringDecision({unit:'nnc',revision:1,signature:'carry',parts:{mode:'whole-stem',sourceWholeStem:'tōch'},source:{sourceUse:'general-use',sourceClass:'tli'},sourceContext:{construction:'affective-nnc'},sourceRequest});
 const payload=r.acceptClassicalSourceAuthoringDecision(draft,{revision:1,signature:'carry'});
 const result=r.evaluateClassicalNahuatlNominalConstruction({...sourceRequest,sourceAuthorizationFrame:payload.sourceAuthorization});
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert(result.sourceAuthorizationFrame===payload.sourceAuthorization);
 assert.equal(r.evaluateClassicalNahuatlNominalConstruction({...sourceRequest,sourceAuthorizationFrame:{...payload.sourceAuthorization}}).authorizationStatus,'blocked');
 assert.equal(r.evaluateClassicalNahuatlNominalConstruction({...sourceRequest,source:{...sourceRequest.source,embedStem:'pil'},sourceAuthorizationFrame:payload.sourceAuthorization}).authorizationStatus,'blocked');
 const owned=r.issueClassicalSourceAuthoringDecision({unit:'nnc',revision:2,signature:'owned',parts:{mode:'whole-stem',sourceWholeStem:'nōteza'},source:{sourceClass:'tl-1'},sourceContext:{construction:'deverbal-nnc',deverbalFamily:'ownerhood'}});
 const accepted=r.acceptClassicalSourceAuthoringDecision(owned,{revision:2,signature:'owned'});
 const request={constructionKind:'ownerhood',source:{sourceStem:'nōteza',nounClass:'tl',nounSubclass:'1',ownerhoodMatrix:'huā'},subject:'3sg',ownerhoodSourceAnalysisFrame:accepted.ownerhoodDecision.sourceAnalysis};
 const actual=r.evaluateClassicalNahuatlDeverbalNnc(request);
 assert.equal(actual.authorizationStatus,'authorized',actual.blockReason);assert(actual.operationFrame.ownerhoodSourceAnalysisFrame===request.ownerhoodSourceAnalysisFrame);
 assert.equal(r.evaluateClassicalNahuatlDeverbalNnc({...request,ownerhoodSourceAnalysisFrame:{...request.ownerhoodSourceAnalysisFrame}}).authorizationStatus,'blocked');
});


test('raw lexicalized citation and secondary reflexive subject changes retain exact current Source coordinates',async()=>{
 const {createPossessiveFixture}=await import('./helpers/deverbal_possessive_fixture.mjs');
 const h=await createPossessiveFixture('michin īīx');
 h.controls.set('classical-basal-unit-controls',{dataset:{classicalBasalUnit:'nnc'}});
 h.controls.set('classical-source-parts',{dataset:{classicalSourcePartsMode:'whole-stem',classicalSourceCommitState:'pending'}});
 h.set('classical-construction-operation','none');h.set('classical-rule-logic-nnc-class','');h.set('classical-rule-logic-nnc-source-use','lexicalized-nnc');
 const draft=h.r.getClassicalSourceAuthoringDecision();assert.equal(draft.declaration.parts.sourceWholeStem,'michin īīx');assert.equal(draft.authorizationStatus,'authorized',draft.blockReason);
 h.controls.get('classical-basal-unit-controls').dataset.classicalBasalUnit='vnc';h.set('classical-rule-logic-valence','specific-projective');h.set('classical-rule-logic-class','A');h.set('classical-source-whole','nōteza');h.set('classical-source-object-count','2');h.set('classical-source-object-2-kind','reflexive');h.set('classical-rule-logic-subject','1sg');
 const first=h.r.getClassicalSourceAuthoringDecision();assert.equal(first.objectDecision.objectRequests[1].objectPerson,'1sg');
 h.set('classical-rule-logic-subject','2sg');const second=h.r.getClassicalSourceAuthoringDecision();assert.notEqual(second.revision,first.revision);assert.equal(second.objectDecision.objectRequests[1].objectPerson,'2sg');
 const bound=h.r.buildClassicalNahuatlBoundNominalSourceFrame({nounStem:'ix'});
 const rejected=h.r.issueClassicalSourceAuthoringDecision({unit:'nnc',revision:20,signature:'bound',parts:{mode:'whole-stem',sourceWholeStem:'ix'},source:{},selectedSourceFrame:bound});
 assert.equal(rejected.authorizationStatus,'blocked');
});


test('nominal Source receipt coordinates include actual outer choices and reject getters without reading them',()=>{
 const request={constructionKind:'affective-nnc',affectiveMatrix:'pōl',source:{embedStem:'tōch',embedClass:'tli',embedSourceClass:'tli'},subject:'3common',state:'absolutive',animacy:'nonanimate'};
 const authorization=r.issueClassicalNahuatlNominalConstructionSourceAuthorization(request);
 for(const changes of [{affectiveMatrix:'tzin'},{structure:'conjunctive'},{embedRole:'possessor'}])
  assert.equal(r.evaluateClassicalNahuatlNominalConstruction({...request,...changes,sourceAuthorizationFrame:authorization}).authorizationStatus,'blocked');
 let read=false;const source={...request.source,get embedStem(){read=true;return 'tōch';}};
 const rejected=r.evaluateClassicalNahuatlNominalConstruction({...request,source,sourceAuthorizationFrame:authorization});
 assert.equal(rejected.authorizationStatus,'blocked');assert.equal(read,false);
 const draft={unit:'nnc',revision:1,signature:'scoped-guard',parts:{mode:'whole-stem',sourceWholeStem:'tōch'},source:{sourceUse:'general-use',sourceClass:'tli',supportiveInitialI:true},sourceContext:{construction:'affective-nnc'},sourceRequest:request};
 assert.equal(r.issueClassicalSourceAuthoringDecision(draft).authorizationStatus,'blocked');
 const lexical=r.issueClassicalSourceAuthoringDecision({unit:'nnc',revision:2,signature:'iz',parts:{mode:'whole-stem',sourceWholeStem:'iz'},source:{}});
 assert.equal(lexical.authorizationStatus,'authorized',lexical.blockReason);assert.equal(lexical.applyPayload.sourceFrame.sourceInputMode,'owner-issued-lexical-adverbial-vnc-source');
});


test('typed compound Source keeps exact constituents through current Source, picker binding, authentic preview and execution rejection',()=>{
 const source=r.buildClassicalNahuatlNominalConstructionTypedSourceFrame({stem:'cin-teō',embedStem:'cin',matrixStem:'teō',sourceClass:'tl'});
 const input={unit:'nnc',revision:30,signature:'compound',parts:{mode:'embed-matrix',sourceEmbedStem:'cin',sourceMatrixStem:'teō'},source:{sourceClass:'tl'},selectedSourceFrame:source};
 const decision=r.issueClassicalSourceAuthoringDecision(input);assert.equal(decision.authorizationStatus,'authorized',decision.blockReason);
 const payload=r.acceptClassicalSourceAuthoringDecision(decision,{revision:30,signature:'compound'});assert(payload.sourceFrame===source);
 const navigator=r.getClassicalGrammarApplicationCapabilityNavigator(payload.sourceFrame);
 const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'grammar:nominal-construction',{embedUse:'nounstem',embedSourceClass:'tli-1',subject:'3sg',animacy:'animate'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);assert(binding.exactSource===source);
 const preview=r.previewClassicalGrammarTypedSourceOperationBindingFrame(binding);assert.equal(preview.authorizationStatus,'authorized',preview.blockReason);
 assert(preview.canonicalResult.navigatorSourceFrame===source);
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert(made.canonicalResult.navigatorSourceFrame===source);
 const copy={...source};assert.equal(r.issueClassicalSourceAuthoringDecision({...input,selectedSourceFrame:copy}),null);
 assert.equal(r.getClassicalGrammarApplicationCapabilityNavigator(copy),null);
 assert.equal(r.previewClassicalGrammarTypedSourceOperationBindingFrame({...binding}),null);
 assert.equal(r.executeClassicalGrammarTypedSourceOperationBindingFrame({...binding}),null);
});


test('raw Source transport reuses a nominal receipt only for its full current owner coordinates',async()=>{
 const {createPossessiveFixture}=await import('./helpers/deverbal_possessive_fixture.mjs');const h=await createPossessiveFixture('tōch');
 h.set('classical-construction-operation','affective-nnc');h.set('classical-rule-logic-nnc-source-use','general-use');h.set('classical-rule-logic-nnc-class','tli');h.set('classical-affective-matrix','pōl');
 const original=h.r.buildClassicalNominalConstructionUiRequest();const authorization=h.r.issueClassicalNahuatlNominalConstructionSourceAuthorization(original);
 assert.equal(authorization.authorizationStatus,'authorized',authorization.blockReason);
 h.controls.set('classical-basal-unit-controls',{dataset:{classicalBasalUnit:'nnc'}});h.controls.set('classical-source-parts',{dataset:{classicalSourcePartsMode:'whole-stem',classicalSourceCommitState:'pending'}});equipNativeCommit(h);
 assert.equal(h.r.commitClassicalSourcePartsEvaluation({force:true,source:'manual-entry'}),true);
 const accepted=h.r.getClassicalAcceptedSourceAuthoringPayload(h.r.getClassicalCommittedSourceAuthoringDecision()).sourceAuthorization;
 h.set('classical-construction-operation','affective-nnc');h.set('classical-affective-matrix','pōl');
 h.set('classical-affective-matrix','tzin');const changed=h.r.buildClassicalNominalConstructionUiRequest();
 assert.equal(changed.sourceAuthorizationFrame,undefined,'later Build choice lets the actual owner issue current authorization');
 const actual=h.r.evaluateClassicalNahuatlNominalConstruction(changed);assert.equal(actual.authorizationStatus,'authorized',actual.blockReason);assert.notEqual(actual.sourceAuthorizationFrame,authorization);
});


test('nominal authorization coordinate custody distinguishes authentic equal-shaped canonical parents',()=>{
 const noun=()=>{const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil'});const op=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,op]}).canonicalResult;};
 const first=noun(),second=noun();assert.notEqual(first,second);
 const request={constructionKind:'affective-nnc',affectiveMatrix:'pōl',source:{embedStem:'pil',embedClass:'tli',embedSourceClass:'tli-1',embedConstituent:{kind:'ordinary-nnc',stem:'pil',resultFrame:first}},subject:'3sg',state:'absolutive',animacy:'animate'};
 const authorization=r.issueClassicalNahuatlNominalConstructionSourceAuthorization(request);assert.equal(authorization.authorizationStatus,'authorized',authorization.blockReason);
 assert.equal(r.isClassicalNahuatlNominalConstructionSourceAuthorization(authorization,request),true);
 const changed={...request,source:{...request.source,embedConstituent:{...request.source.embedConstituent,resultFrame:second}}};
 assert.equal(r.isClassicalNahuatlNominalConstructionSourceAuthorization(authorization,changed),false);
 assert.equal(r.evaluateClassicalNahuatlNominalConstruction({...changed,sourceAuthorizationFrame:authorization}).authorizationStatus,'blocked');
});


test('receiving nominal and ownerhood receipts reject getters outside Source coordinates without reading them',()=>{
 const request={constructionKind:'affective-nnc',affectiveMatrix:'pōl',source:{embedStem:'tōch',embedClass:'tli',embedSourceClass:'tli'},subject:'3common',state:'absolutive',animacy:'nonanimate'};
 const authorization=r.issueClassicalNahuatlNominalConstructionSourceAuthorization(request);
 let nominalReads=0;const nominal={...request,sourceAuthorizationFrame:authorization,get unexpected(){nominalReads++;return 'unused';}};
 assert.equal(r.evaluateClassicalNahuatlNominalConstruction(nominal).authorizationStatus,'blocked');assert.equal(nominalReads,0);
 const analysis=r.getClassicalNahuatlOwnerhoodSourceClassDecision({sourceStem:'nōteza',sourceClass:'tl-1'}).sourceAnalysis;
 let ownerReads=0;const owner={constructionKind:'ownerhood',source:{sourceStem:'nōteza',nounClass:'tl',nounSubclass:'1',ownerhoodMatrix:'huā'},subject:'3sg',ownerhoodSourceAnalysisFrame:analysis,get unexpected(){ownerReads++;return 'unused';}};
 assert.equal(r.evaluateClassicalNahuatlDeverbalNnc(owner).authorizationStatus,'blocked');assert.equal(ownerReads,0);
});
