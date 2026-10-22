import {buildClassicalNahuatlParticipantFrame} from '../../core/classical/participant_frame.mjs';

// Selected attested nominal cells carry only the lexical analysis actually supplied.
// Their external contextual Participants are authored by Build, never lexical actors.
export function createAttestedNncCellApi(target) {
 const sourceContexts=new WeakMap(),bindingContexts=new WeakMap(),resultContexts=new WeakMap(),cache=new Map();
 const freeze=v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
 const keys=(v,allowed)=>v&&typeof v==='object'&&!Array.isArray(v)&&Reflect.ownKeys(v).every(k=>typeof k==='string'&&allowed.includes(k)&&!Object.getOwnPropertyDescriptor(v,k)?.get);
 const blocked=(kind,reason)=>Object.freeze({kind,authorizationStatus:'blocked',blockReason:reason});
 const sourceKind='classical-nahuatl-attested-nnc-cell-source-frame',bindingKind='classical-nahuatl-attested-nnc-cell-binding-frame',resultKind='classical-nahuatl-attested-nnc-cell-result-frame';
 const specs=freeze({
  'icn-īuh':{sourceRank:'analyzed-possessed-singular-cell',citation:'icn-īuh',generalUseStem:'cn-īuh',supportiveInitialI:true,citationCoarseClass:'tli',state:'possessive',subject:'3sg',animacy:'animate',humanness:'human',number:'singular',num1:'Ø',num2:'Ø',sourceRefs:['14.7.2a.i:5036-5041','15.1.1a:5164-5165','18.6:6127-6132']},
  'picīltic':{sourceRank:'opaque-attested-nominal-cell',citation:'picīltic',adjectivalFunction:'predicative-quality',subject:'3common',animacy:'nonanimate',humanness:'nonhuman',number:'common',sourceRefs:['52.5.2:22341-22350;original566']},
  'cualnēzqui':{sourceRank:'opaque-attested-nominal-cell',citation:'cualnēzqui',adjectivalFunction:'predicative-quality',subject:'3sg',animacy:'animate',humanness:'human',number:'singular',sourceRefs:['40.12:16297-16309','53.7:22940-22958;original581']}
 });
 function resolveClassicalNahuatlAttestedNncCellSourceFrame(input={}) {
  if(!keys(input,['enteredStem','sourceUse'])||input.sourceUse!=='attested-cell'||typeof input.enteredStem!=='string')return null;
  const citation=input.enteredStem.normalize('NFC').trim().toLowerCase(),spec=Object.hasOwn(specs,citation)?specs[citation]:null;if(!spec)return null;
  if(cache.has(citation))return cache.get(citation);
  const source=freeze({kind:sourceKind,version:1,authorizationStatus:'authorized',blockReason:'',sourceUse:'attested-cell',stem:citation,sourceStem:citation,sourceRank:spec.sourceRank,
   citation:spec.citation,selectedCellAnalysis:spec,ordinaryNounParadigmAuthorized:false,finiteVncAuthorized:false,ordinaryClassClaimed:false,primitiveVerbClassClaimed:false,
   internalAnalysisClaimed:spec.sourceRank==='analyzed-possessed-singular-cell',sourceAuthority:'attested-lexical-cell',sourceRefs:spec.sourceRefs,typedSourceAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
  sourceContexts.set(source,spec);cache.set(citation,source);return source;
 }
 function isClassicalNahuatlAttestedNncCellSourceFrame(source){const s=source&&sourceContexts.get(source);return Boolean(s&&Object.isFrozen(source)&&source.selectedCellAnalysis===s&&source.stem===s.citation&&source.sourceRank===s.sourceRank&&source.ordinaryNounParadigmAuthorized===false);}
 function issueClassicalNahuatlAttestedNncCellBindingFrame(exactSourceFrame,selections={}) {
  if(!isClassicalNahuatlAttestedNncCellSourceFrame(exactSourceFrame))return blocked(bindingKind,'issued-attested-nnc-cell-source-required');
  const spec=sourceContexts.get(exactSourceFrame),analyzed=spec.sourceRank==='analyzed-possessed-singular-cell';
  const fixed=freeze({subject:spec.subject,animacy:spec.animacy,humanness:spec.humanness,...(analyzed?{singularConnector:'silent'}:{})});
  const domains=analyzed?{possessor:['1sg','2sg','3sg','1pl','2pl','3pl']}:{};
  const invalid=!keys(selections,[...Object.keys(fixed),...Object.keys(domains)]) || Object.entries(selections).some(([id,v])=>v!=='' && (Object.hasOwn(fixed,id)?v!==fixed[id]:!domains[id]?.includes(v)));
  const caller=freeze({...selections}),missing=invalid?[]:Object.keys(domains).filter(id=>!Object.hasOwn(caller,id)||!caller[id]);
  const effective=freeze({...fixed,...Object.fromEntries(Object.entries(caller).filter(([,v])=>v!==''))});
  const options=Object.fromEntries(Object.entries(domains).map(([id,values])=>[id,values.map(optionId=>({optionId,label:optionId,availabilityStatus:'available',grammarAuthority:false}))]));
  const binding=freeze({kind:bindingKind,version:1,authorizationStatus:invalid?'blocked':'authorized',blockReason:invalid?'attested-nnc-cell-context-not-licensed':missing.length?'attested-nnc-cell-explicit-context-required':'',bindingStatus:invalid?'rejected':missing.length?'choices-required':'ready',exactSourceFrame,
   callerSelections:caller,effectiveSelections:effective,readOnlySelections:fixed,requiredChoiceIds:missing,choiceOptionProjection:options,executionArgs:!invalid&&!missing.length?[exactSourceFrame,effective]:[],ownerInputAcceptanceProven:true,exactSourceIdentityPreserved:true,ownerExecutionStillRequired:!invalid&&!missing.length,grammarAuthority:false});
  bindingContexts.set(binding,{source:exactSourceFrame,effective});return binding;
 }
 function isClassicalNahuatlAttestedNncCellBindingFrame(binding){const c=binding&&bindingContexts.get(binding);return Boolean(c&&Object.isFrozen(binding)&&binding.exactSourceFrame===c.source&&isClassicalNahuatlAttestedNncCellSourceFrame(c.source)&&binding.effectiveSelections===c.effective&&(binding.bindingStatus!=='ready'||binding.executionArgs[0]===c.source&&binding.executionArgs[1]===c.effective));}
 function evaluateClassicalNahuatlAttestedNncCell(source,selections={}) {
  const binding=issueClassicalNahuatlAttestedNncCellBindingFrame(source,selections);if(!isClassicalNahuatlAttestedNncCellBindingFrame(binding)||binding.bindingStatus!=='ready')return blocked(resultKind,binding.blockReason||'attested-nnc-cell-ready-binding-required');
  selections=binding.effectiveSelections;
  const spec=sourceContexts.get(source),participant=buildClassicalNahuatlParticipantFrame({role:'subject',agreement:selections.subject,animacy:selections.animacy,humanness:selections.humanness,number:spec.number,hasReferent:true});
  let typedSlotFrame=null,canonicalPossessionFrame=null,possessorParticipantFrame=null,wordSurface=spec.citation,formulaRealization=`⟦${spec.citation}⟧`;
  if(spec.sourceRank==='analyzed-possessed-singular-cell'){
   canonicalPossessionFrame=target.buildClassicalNahuatlPossessiveNncFrame(spec.generalUseStem,{subject:spec.subject,possessor:selections.possessor,animacy:spec.animacy,humanness:spec.humanness,singularConnector:'0',naturalPossessionPolicy:'ordinary',stateAvailability:'both',policySelectionAuthority:'external-lexical-record'});
   typedSlotFrame=canonicalPossessionFrame?.nncSlotFrame;if(target.isClassicalNahuatlNncSlotFrame(typedSlotFrame)!==true||canonicalPossessionFrame.authorizationStatus!=='authorized')return blocked(resultKind,canonicalPossessionFrame?.blockReason||'actual-selected-possession-cell-required');
   possessorParticipantFrame=buildClassicalNahuatlParticipantFrame({role:'possessor',agreement:selections.possessor,animacy:'animate',humanness:'human',number:selections.possessor.endsWith('pl')?'plural':'singular',hasReferent:true});
   formulaRealization=target.renderClassicalNahuatlNncSlotFrameFormula(typedSlotFrame);
   const written=target.buildClassicalNahuatlNncSentenceSurfaceFrame(typedSlotFrame,{sentenceType:'statement',polarity:'positive'});
   if(target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(written)!==true)return blocked(resultKind,written?.blockReason||'owned-selected-cell-writing-required');
   wordSurface=written.wordSurface||written.surfaceRealization||written.sentenceSurface;wordSurface=String(wordSurface).replace(/[.?!]$/u,'');
   // An embedded nominal cell retains ordinary lower-case writing; sentence
   // capitalization is a containing Sentence boundary.
   wordSurface=wordSurface[0].toLocaleLowerCase()+wordSurface.slice(1);
  }
  const result=freeze({kind:resultKind,version:1,authorizationStatus:'authorized',blockReason:'',sourceFrame:source,operationFrame:binding,canonicalSourceFrame:source,navigatorSourceFrame:source,subjectParticipantFrame:participant,possessorParticipantFrame,
   typedSlotFrame,canonicalPossessionFrame,sourceRank:source.sourceRank,wordSurface,embeddedSurface:wordSurface,surfaceRealization:wordSurface,sentenceSurface:wordSurface[0].toLocaleUpperCase()+wordSurface.slice(1)+'.',formulaRealization,
   nounClass:'',ordinaryClassClaimed:false,ordinaryNounParadigmAuthorized:false,finiteVncAuthorized:false,internalAnalysisClaimed:source.internalAnalysisClaimed,lexicalFactsReadOnly:true,savedStateCapability:'unclaimed',typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
  resultContexts.set(result,{source,binding,participant,possessorParticipantFrame,typedSlotFrame,wordSurface});return result;
 }
 function isClassicalNahuatlAttestedNncCellResult(result){const c=result&&resultContexts.get(result);return Boolean(c&&Object.isFrozen(result)&&isClassicalNahuatlAttestedNncCellSourceFrame(c.source)&&result.sourceFrame===c.source&&result.operationFrame===c.binding&&result.subjectParticipantFrame===c.participant&&result.possessorParticipantFrame===c.possessorParticipantFrame&&result.typedSlotFrame===c.typedSlotFrame&&result.wordSurface===c.wordSurface);}
 function getClassicalNahuatlAttestedNncCellExternalProjection(result){if(!isClassicalNahuatlAttestedNncCellResult(result))return null;const c=resultContexts.get(result);return Object.freeze({canonicalResultFrame:result,canonicalSourceFrame:c.source,subjectParticipantFrame:c.participant,possessorParticipantFrame:c.possessorParticipantFrame,typedSlotFrame:c.typedSlotFrame,sourceRank:c.source.sourceRank,adjectivalFunction:sourceContexts.get(c.source).adjectivalFunction || "",wordSurface:c.wordSurface,formulaRealization:result.formulaRealization});}
 return Object.freeze({resolveClassicalNahuatlAttestedNncCellSourceFrame,isClassicalNahuatlAttestedNncCellSourceFrame,issueClassicalNahuatlAttestedNncCellBindingFrame,isClassicalNahuatlAttestedNncCellBindingFrame,evaluateClassicalNahuatlAttestedNncCell,isClassicalNahuatlAttestedNncCellResult,getClassicalNahuatlAttestedNncCellExternalProjection});
}

// Socially designated place citation, with inner etymology/segmentation unclaimed.
export function createAttestedPlaceApi(){
 const sources=new WeakSet(),bindings=new WeakMap(),results=new WeakMap();let cached=null;
 const freeze=v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
 const keys=(v,k)=>v&&typeof v==='object'&&!Array.isArray(v)&&Reflect.ownKeys(v).every(x=>typeof x==='string'&&k.includes(x)&&!Object.getOwnPropertyDescriptor(v,x)?.get);
 const blocked=reason=>Object.freeze({kind:'classical-nahuatl-attested-place-result-frame',authorizationStatus:'blocked',blockReason:reason});
 function resolveClassicalNahuatlAttestedPlaceSourceFrame(q={}){if(!keys(q,['enteredStem','sourceUse'])||q.sourceUse!=='attested-place'||String(q.enteredStem||'').normalize('NFC').trim().toLowerCase()!=='teticpac')return null;if(cached)return cached;
  cached=freeze({kind:'classical-nahuatl-attested-place-source-frame',version:1,authorizationStatus:'authorized',blockReason:'',sourceRank:'opaque-social-place-nnc',sourceUse:'attested-place',stem:'Teticpac',sourceStem:'Teticpac',citation:'Teticpac',sourceSection:'48.1',sourceRefs:['48.1:19931-20001;original509'],internalAnalysisClaimed:false,ordinaryNounParadigmAuthorized:false,finiteVncAuthorized:false,referenceKind:'unique-socially-designated-place',typedSourceAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});sources.add(cached);return cached;}
 function isClassicalNahuatlAttestedPlaceSourceFrame(s){return Boolean(s&&sources.has(s)&&Object.isFrozen(s)&&s.sourceRank==='opaque-social-place-nnc'&&s.referenceKind==='unique-socially-designated-place');}
 function issueClassicalNahuatlAttestedPlaceBindingFrame(s,q={}) {
  if(!isClassicalNahuatlAttestedPlaceSourceFrame(s))return null;
  const fixed=freeze({usage:'adverbial',subjectReference:'unique-socially-designated-place'});
  const invalid=!keys(q,Object.keys(fixed))||Object.entries(q).some(([k,v])=>v!==''&&v!==fixed[k]);
  const caller=freeze({...q}),effective=fixed,request=freeze({canonicalNominalSourceFrame:s,...fixed});
  const f=freeze({kind:'classical-nahuatl-attested-place-binding-frame',version:1,authorizationStatus:invalid?'blocked':'authorized',blockReason:invalid?'attested-place-selected-use-required':'',bindingStatus:invalid?'rejected':'ready',exactSourceFrame:s,callerSelections:caller,effectiveSelections:effective,readOnlySelections:fixed,requiredChoiceIds:[],choiceOptionProjection:{},executionArgs:invalid?[]:[request],grammarAuthority:false,exactSourceIdentityPreserved:true});
  bindings.set(f,{s,effective,request});return f;
 }
 function isClassicalNahuatlAttestedPlaceBindingFrame(b){const c=b&&bindings.get(b);return Boolean(c&&Object.isFrozen(b)&&isClassicalNahuatlAttestedPlaceSourceFrame(c.s)&&b.exactSourceFrame===c.s&&b.effectiveSelections===c.effective&&(b.bindingStatus!=='ready'||b.executionArgs[0]===c.request&&c.request.canonicalNominalSourceFrame===c.s));}
 function evaluateClassicalNahuatlAttestedPlace(request={}){if(!keys(request,['canonicalNominalSourceFrame','usage','subjectReference']))return blocked('attested-place-caller-overlay-not-authorized');const s=request.canonicalNominalSourceFrame,b=issueClassicalNahuatlAttestedPlaceBindingFrame(s,{usage:request.usage,subjectReference:request.subjectReference});if(!isClassicalNahuatlAttestedPlaceBindingFrame(b)||b.bindingStatus!=='ready')return blocked(b?.blockReason||'exact-issued-attested-place-required');
  const participant=buildClassicalNahuatlParticipantFrame({role:'subject',person:'3',animacy:'nonanimate',humanness:'nonhuman',number:'common',hasReferent:true,specificity:'specific'});
  const finiteFrame=freeze({kind:'classical-nahuatl-attested-place-finite-frame',authorizationStatus:'authorized',subjectMode:'adverbialized',subjectReference:'unique-socially-designated-place',subjectParticipantFrame:participant,typedSlotFrame:null,internalAnalysisClaimed:false,wordSurface:s.citation});
  const result=freeze({kind:'classical-nahuatl-attested-place-result-frame',version:1,authorizationStatus:'authorized',blockReason:'',canonicalAttestedPlaceSourceFrame:s,sourceFrame:s,navigatorSourceFrame:s,sourceRank:s.sourceRank,constructionKind:'place-name',usage:'adverbial',finiteFrame,subjectParticipantFrame:participant,internalAnalysisClaimed:false,wordSurface:s.citation,surfaceRealization:s.citation,sentenceSurface:s.citation+'.',embeddedSurface:s.citation,formulaRealization:`⟦place:${s.citation}⟧`,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false,savedStateCapability:'unclaimed'});results.set(result,{s,b,participant,finiteFrame});return result;}
 function isClassicalNahuatlAttestedPlaceResult(r){const c=r&&results.get(r);return Boolean(c&&Object.isFrozen(r)&&isClassicalNahuatlAttestedPlaceSourceFrame(c.s)&&r.canonicalAttestedPlaceSourceFrame===c.s&&r.finiteFrame===c.finiteFrame&&r.subjectParticipantFrame===c.participant&&r.finiteFrame.typedSlotFrame===null);}
 function getClassicalNahuatlAttestedPlaceExternalProjection(r){if(!isClassicalNahuatlAttestedPlaceResult(r))return null;const c=results.get(r);return Object.freeze({canonicalSourceFrame:c.s,canonicalResultFrame:r,subjectParticipantFrame:c.participant,wordSurface:r.wordSurface,formulaRealization:r.formulaRealization,subjectReference:'unique-socially-designated-place',usage:'adverbial',internalAnalysisClaimed:false});}
 return Object.freeze({resolveClassicalNahuatlAttestedPlaceSourceFrame,isClassicalNahuatlAttestedPlaceSourceFrame,issueClassicalNahuatlAttestedPlaceBindingFrame,isClassicalNahuatlAttestedPlaceBindingFrame,evaluateClassicalNahuatlAttestedPlace,isClassicalNahuatlAttestedPlaceResult,getClassicalNahuatlAttestedPlaceExternalProjection});
}

// §46.9 Note2: this is a principal-clause collocation, with no invented
// ordinary NNC slot, finite "makes" verb, or temporal-ic decomposition.
export function createAttestedPrincipalCollocationApi(){
 const sources=new WeakSet(),bindings=new WeakMap(),results=new WeakMap();let source=null;
 const freeze=v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
 const keys=(v,k)=>v&&typeof v==='object'&&!Array.isArray(v)&&Reflect.ownKeys(v).every(x=>typeof x==='string'&&k.includes(x)&&!Object.getOwnPropertyDescriptor(v,x)?.get);
 function resolveClassicalNahuatlAttestedPrincipalCollocationSourceFrame(q={}){if(!keys(q,['enteredStem','sourceUse'])||q.sourceUse!=='attested-collocation'||String(q.enteredStem||'').normalize('NFC').trim().replace(/\s+/gu,' ').toLowerCase()!=='achi īc')return null;if(source)return source;source=freeze({kind:'classical-nahuatl-attested-principal-collocation-source-frame',version:1,authorizationStatus:'authorized',blockReason:'',sourceUse:'attested-collocation',sourceRank:'attested-principal-collocation',stem:'achi īc',sourceStem:'achi īc',citation:'achi īc',constituents:['achi','īc'],lexicalSense:'makes-or-would-make-sense',grammaticalSubjectAnalysis:'unclaimed',ordinaryNounParadigmAuthorized:false,finiteVncAuthorized:false,internalGenealogyClaimed:false,sourceRefs:['46.9Note2:18996-19004;original485'],writingQualification:{selectedAnalyticalWitness:'achi īc',proseOrdinarySpelling:'achic',proseRule:'always-written-with-elision',freeWritingVariantsLicensed:false},typedSourceAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});sources.add(source);return source;}
 function isClassicalNahuatlAttestedPrincipalCollocationSourceFrame(s){return Boolean(s&&sources.has(s)&&Object.isFrozen(s)&&s.sourceRank==='attested-principal-collocation'&&s.grammaticalSubjectAnalysis==='unclaimed');}
 function issueClassicalNahuatlAttestedPrincipalCollocationBindingFrame(s,q={}) {
  if(!isClassicalNahuatlAttestedPrincipalCollocationSourceFrame(s))return null;
  const valid=keys(q,['use'])&&(!q.use||q.use==='condition-principal'),effective=freeze({use:'condition-principal'});
  const b=freeze({kind:'classical-nahuatl-attested-principal-collocation-binding-frame',version:1,authorizationStatus:valid?'authorized':'blocked',blockReason:valid?'':'attested-collocation-context-not-licensed',bindingStatus:valid?'ready':'rejected',exactSourceFrame:s,callerSelections:freeze({...q}),effectiveSelections:effective,readOnlySelections:effective,requiredChoiceIds:[],choiceOptionProjection:{},executionArgs:valid?[s,effective]:[],exactSourceIdentityPreserved:true,grammarAuthority:false});
  bindings.set(b,{s,effective});return b;
 }
 function isClassicalNahuatlAttestedPrincipalCollocationBindingFrame(b){const c=b&&bindings.get(b);return Boolean(c&&Object.isFrozen(b)&&b.exactSourceFrame===c.s&&isClassicalNahuatlAttestedPrincipalCollocationSourceFrame(c.s)&&b.effectiveSelections===c.effective&&(b.bindingStatus!=='ready'||b.executionArgs[0]===c.s&&b.executionArgs[1]===c.effective));}
 function evaluateClassicalNahuatlAttestedPrincipalCollocation(s,q={}){const b=issueClassicalNahuatlAttestedPrincipalCollocationBindingFrame(s,q);if(!isClassicalNahuatlAttestedPrincipalCollocationBindingFrame(b)||b.bindingStatus!=='ready')return Object.freeze({kind:'classical-nahuatl-attested-principal-collocation-result-frame',authorizationStatus:'blocked',blockReason:b?.blockReason||'issued-principal-collocation-source-required'});const r=freeze({kind:'classical-nahuatl-attested-principal-collocation-result-frame',version:1,authorizationStatus:'authorized',blockReason:'',sourceFrame:s,navigatorSourceFrame:s,operationFrame:b,sourceRank:s.sourceRank,subject:null,grammaticalSubjectAnalysis:'unclaimed',permittedExternalUse:'condition-principal',wordSurface:'achic',embeddedSurface:'achic',surfaceRealization:'achic',sentenceSurface:'Achic.',analyticalSurface:s.citation,writingProjection:{mandatoryElision:true,sourceConstituents:s.constituents,parts:[{role:'collocation-first-member',value:'achi'},{role:'collocation-elided-second-member',value:'c'}]},formulaRealization:'⟦achi īc:principal-collocation⟧',writingQualification:s.writingQualification,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false,savedStateCapability:'unclaimed'});results.set(r,{s,b});return r;}
 function isClassicalNahuatlAttestedPrincipalCollocationResult(r){const c=r&&results.get(r);return Boolean(c&&Object.isFrozen(r)&&isClassicalNahuatlAttestedPrincipalCollocationSourceFrame(c.s)&&r.sourceFrame===c.s&&r.operationFrame===c.b&&r.subject===null&&r.grammaticalSubjectAnalysis==='unclaimed');}
 return Object.freeze({resolveClassicalNahuatlAttestedPrincipalCollocationSourceFrame,isClassicalNahuatlAttestedPrincipalCollocationSourceFrame,issueClassicalNahuatlAttestedPrincipalCollocationBindingFrame,isClassicalNahuatlAttestedPrincipalCollocationBindingFrame,evaluateClassicalNahuatlAttestedPrincipalCollocation,isClassicalNahuatlAttestedPrincipalCollocationResult});
}
