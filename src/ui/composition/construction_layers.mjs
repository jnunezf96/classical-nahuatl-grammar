// Read-only owner projection: staging never executes or publishes the packet.
export function getConstructionLayerReadiness(runtime,packet) {
  if(packet?.kind==='result-edit')return getConstructionLayerReadiness(runtime,packet.inner);
  if(packet?.operation==='nnc:personal-name' && packet?.request?.operationId==='nnc:personal-name'
    && Object.hasOwn(packet.request.args?.[0] || {},'canonicalSourceResult')) {
    const request=packet.request.args?.[0];
    const resolution=runtime.resolvePersonalNameNncExactSource?.(request);
    const valid=runtime.isPersonalNameNncExactSourceResolution?.(resolution)===true
      && resolution.authorizationStatus==='authorized'
      && resolution.canonicalSourceResult===packet.source
      && request?.canonicalSourceResult===packet.source
      && resolution.requiredChoiceIds.length===0;
    const plan=valid ? runtime.preparePersonalNameNncParadigmPlan?.({sourceFrame:resolution.sourceFrame,
      affectiveScope:request.affectiveScope,affectiveMatrix:request.affectiveMatrix}) : null;
    if(!valid || runtime.isPersonalNameNncParadigmPlan?.(plan)!==true)return {ready:false,
      blockReason:resolution?.blockReason || plan?.blockReason || 'personal-name-compatible-affective-operation-required',
      recoveryKind:plan?.blockReason === 'ordinary-nnc-embed-source-use-analysis-required'
        ? 'personal-name-compound-source' : 'personal-name-affective'};
  }
  const tense=packet?.choices?.tense || packet?.request?.args?.[0]?.tense || '';
  for(const layer of packet?.layers || []) {
    if(layer.operationId==='sentence:particle-adjunction') {
      const availability=runtime.getClassicalNahuatlSentenceParticleSpeakerAvailability?.(layer.particleId,layer.speakerGender);
      if(availability?.ready!==true)return {ready:false,
        blockReason:availability?.blockReason || 'classical-sentence-particle-speaker-availability-required',
        recoveryKind:availability?.recoveryKind || ''};
    }
    if(layer.operationId!=='sentence:adverbial-adjunction')continue;
    const availability=runtime.getClassicalNahuatlSentenceAdverbialAvailability?.(layer.particleId,tense);
    if(availability?.ready!==true)return {ready:false,blockReason:availability?.blockReason || 'classical-sentence-adverbial-availability-required'};
  }
  return {ready:true,blockReason:''};
}
// The particle owner classifies its exact current host. A nuclear Result
// and an already composed particle sentence use different input contracts.
export function getConstructionParticleHostInput(runtime,operation,host) {
  const binding=runtime.issueClassicalNahuatlParticleSentenceBindingFrame?.(operation,host);
  if(runtime.isClassicalNahuatlParticleSentenceBindingFrame?.(binding)!==true
    || binding.authorizationStatus!=='authorized' || binding.operationId!==operation
    || binding.exactResult!==host || binding.exactHostClause!==host)return null;
  return binding.inputRole==='host-clause' ? Object.freeze({nuclearResultFrame:host})
    : binding.inputRole==='consumed-sentence' ? Object.freeze({consumedSentenceFrame:host}) : null;
}

// Retain each actual receiving owner's preparation. The optional layer is an
// owner-issued inactive decision; it is not a fabricated empty Result.
export function prepareConstructionLayers(runtime,source,selections={},primaryChoices={}) {
  const decisions=[],preparedLayers=[],choices={};let host=source,ready=true,blockReason='';
  for(const [operationId,key] of [['sentence:adverbial-adjunction','adverbialId'],['sentence:particle-adjunction','particleId']]) {
    if(!ready)break;
    const hostInput=getConstructionParticleHostInput(runtime,operationId,host);
    if(!hostInput){ready=false;blockReason='sentence-layer-exact-host-required';break;}
    const selected=Boolean(selections[key]&&selections[key]!=='none');
    const request={operationId,args:[{...hostInput,
      ...(selected?{particleSourceFrame:runtime.buildClassicalNahuatlParticleSourceFrame?.(selections[key])}:{}),
      ...(operationId==='sentence:particle-adjunction'?{honorificized:selections.honorificized===true,speakerGender:selections.speakerGender||'unspecified'}:{})}]};
    const prepared=runtime.prepareClassicalGrammarApplicationRequest?.(request);
    if(runtime.isClassicalGrammarPreparedApplicationRequest?.(prepared)!==true){ready=false;blockReason='sentence-layer-owner-decision-required';break;}
    const frame=prepared.canonicalResult;
    decisions.push(prepared);
    for(const [fieldKey,field] of Object.entries(frame.choiceOptionProjection||{})) {
      if(fieldKey!==key&&!(key==='particleId'&&['honorificized','speakerGender'].includes(fieldKey)))continue;
      choices[fieldKey]=Object.freeze({...field,requestPath:Object.freeze(['layers',...(field.requestPath||[fieldKey])])});
    }
    if(selected){
      if(prepared.authorizationStatus!=='authorized'){ready=false;blockReason=prepared.blockReason||'sentence-layer-not-authorized';break;}
      preparedLayers.push(Object.freeze({host,prepared}));host=frame;
    }
  }
  if(choices.particleId){
    const particle=choices.particleId,shortcuts=runtime.getClassicalNahuatlParticleCombinationShortcutEntries?.()||[];
    const negativeField=primaryChoices.negative||primaryChoices.polarity;
    const positive=negativeField?.options?.find(option=>option.availabilityStatus==='available'&&(option.optionId===false||option.optionId==='positive'));
    const options=particle.options.filter(option=>option.optionId===''||shortcuts.some(shortcut=>shortcut.particleId===option.optionId)).map(option=>{
      const shortcut=shortcuts.find(item=>item.particleId===option.optionId),writes=[];
      if(shortcut?.consumesSelectedAdverbial)writes.push({path:['layers','adverbialId'],value:''});
      if(shortcut?.consumesSelectedPolarity&&positive){writes.push({path:negativeField.requestPath||[negativeField.choiceId],value:positive.optionId},...(positive.writeRequestValues||[]));}
      return Object.freeze({...option,writeRequestValues:Object.freeze(writes.map(write=>Object.freeze({...write,path:Object.freeze([...write.path])})))});
    });
    choices.combinationShortcut=Object.freeze({...particle,choiceId:'combinationShortcut',selectedValue:shortcuts.some(item=>item.particleId===selections.particleId)?selections.particleId:'',authoredValue:undefined,options:Object.freeze(options)});
  }
  return Object.freeze({ready,blockReason,decisions:Object.freeze(decisions),preparedLayers:Object.freeze(preparedLayers),choices:Object.freeze(choices)});
}
export function arePreparedConstructionLayersCurrent(runtime,layers,source) {
  if(!Array.isArray(layers))return false;
  let host=source;
  for(const layer of layers){
    const prepared=layer?.prepared,request=prepared?.request,input=request?.args?.[0];
    if(layer.host!==host||!['sentence:adverbial-adjunction','sentence:particle-adjunction'].includes(request?.operationId)
      ||runtime.isClassicalGrammarPreparedApplicationRequest?.(prepared)!==true||prepared.authorizationStatus!=='authorized'
      ||(input?.nuclearResultFrame||input?.consumedSentenceFrame)!==host)return false;
    host=prepared.canonicalResult;
  }
  return true;
}

// Immediate noun envelopes use the primary owner's existing sentence/context.
// Unchanged sentences are retained; only authored changes invoke that owner.
export function prepareConstructionNncEnvelope(runtime,primary,selections={},layerSelections={},primaryChoices={}) {
 const blocked=blockReason=>Object.freeze({ready:false,blockReason,choices:Object.freeze({})});
 if(runtime.isClassicalGrammarPreparedApplicationRequest?.(primary)!==true||primary.authorizationStatus!=='authorized')return blocked('nnc-envelope-primary-required');
 const host=primary.canonicalResult,existing=runtime.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(host.sentenceFrame)===true?host.sentenceFrame:null;
 const input=existing||host.typedSlotFrame||host.canonicalResult?.nncSlotFrame;if(!input)return blocked('nnc-envelope-exact-input-required');
 const prepared=existing&&!Object.keys(selections).length?runtime.prepareClassicalGrammarApplicationRequest(existing)
   :runtime.prepareClassicalGrammarApplicationRequest({operationId:'nnc:sentence-surface',args:[input,selections]});
 if(runtime.isClassicalGrammarPreparedApplicationRequest?.(prepared)!==true)return blocked('nnc-envelope-owner-decision-required');
 const fields=prepared.canonicalResult.choiceOptionProjection||{},choices={};
 for(const [key,field] of Object.entries(fields))choices[key]=Object.freeze({...field,requestPath:Object.freeze(['sentence',...(field.requestPath||[key])])});
 const layers=prepared.authorizationStatus==='authorized'?prepareConstructionLayers(runtime,prepared.canonicalResult,layerSelections,{...choices,...primaryChoices}):null;
 const preparedSentence=Object.freeze({host,prepared});
 return Object.freeze({ready:prepared.authorizationStatus==='authorized'&&layers?.ready===true,blockReason:prepared.blockReason||layers?.blockReason||'',prepared,preparedSentence,layers,
   choices:Object.freeze({...choices,...(layers?.choices||{})})});
}
export function prepareConstructionVncEnvelope(runtime,primary,layerSelections={},primaryChoices={}) {
 const blocked=blockReason=>Object.freeze({ready:false,blockReason,choices:Object.freeze({})});
 if(runtime.isClassicalGrammarPreparedApplicationRequest?.(primary)!==true||primary.authorizationStatus!=='authorized')return blocked('vnc-envelope-primary-required');
 const host=primary.canonicalResult,prepared=runtime.prepareClassicalGrammarApplicationRequest({operationId:'vnc:sentence-result',args:[host]});
 if(runtime.isClassicalGrammarPreparedApplicationRequest?.(prepared)!==true)return blocked('vnc-envelope-owner-decision-required');
 const choices=Object.fromEntries(Object.entries(prepared.canonicalResult.choiceOptionProjection||{}).map(([key,field])=>[key,Object.freeze({...field,requestPath:Object.freeze(['sentenceOptions',...(field.requestPath||[key])]),options:Object.freeze(field.options.map(option=>Object.freeze({...option,withdrawRequestPaths:Object.freeze([Object.freeze([key]),...(option.writeRequestValues||[]).map(write=>Object.freeze([...write.path])),...(option.withdrawRequestPaths||[]).map(path=>Object.freeze(['sentenceOptions',...path]))]),...(option.writeRequestValues?{writeRequestValues:Object.freeze(option.writeRequestValues.map(write=>Object.freeze({...write,path:Object.freeze(['sentenceOptions',...write.path])})))}:{})})))})]));
 // The primary issuer may restrict this same sentence field. A receiving
 // envelope supplies realization, never permission to replace that decision.
 for(const key of Object.keys(choices))if(Object.hasOwn(primaryChoices,key))choices[key]=primaryChoices[key];
 const layers=prepared.authorizationStatus==='authorized'?prepareConstructionLayers(runtime,prepared.canonicalResult,layerSelections,choices):null;
 return Object.freeze({ready:prepared.authorizationStatus==='authorized'&&layers?.ready===true,blockReason:prepared.blockReason||layers?.blockReason||'',prepared,preparedSentence:Object.freeze({host,prepared}),layers,choices:Object.freeze({...choices,...layers?.choices})});
}
export function arePreparedConstructionEnvelopesCurrent(runtime,packet) {
 const primary=packet?.prepared;
 if(runtime.isClassicalGrammarPreparedApplicationRequest?.(primary)!==true||primary.authorizationStatus!=='authorized')return false;
 if(packet.kind==='typed'&&runtime.prepareClassicalGrammarApplicationRequest?.(packet.binding)!==primary)return false;
 if(packet.kind==='request'&&packet.request!==primary.request)return false;
 let host=primary.canonicalResult;
 if(packet.preparedSentence){
  const {host:expected,prepared}=packet.preparedSentence,input=prepared?.request?.args?.[0];
  if(expected!==host||runtime.isClassicalGrammarPreparedApplicationRequest?.(prepared)!==true||prepared.authorizationStatus!=='authorized'
    ||!(prepared.request.operationId==='vnc:sentence-result'?input===host:prepared.request.operationId==='nnc:sentence-surface'&&[host.sentenceFrame,host.typedSlotFrame,host.canonicalResult?.nncSlotFrame].filter(Boolean).includes(input)))return false;
  host=prepared.canonicalResult;
 }
 return !packet.preparedLayers||arePreparedConstructionLayersCurrent(runtime,packet.preparedLayers,host);
}
