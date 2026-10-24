// Only original inputs and references travel across reload. Each dependency is
// authenticated here and reissued by its canonical owner in the new runtime.
const FACTS = ['semanticGroup','shortPronominal','collectiveReference','namedPartnerEligible',
  'maleBondingStem','demonstrativeKind','interrogativeKind','antecessiveOrder','mood','tense','sentenceKind'];
const RELATION = ['referenceMode','headRole','supplementContactRole','order','adjunctor','commentEmphaticCa',
  'fuseDemonstrativeAdjunctor','informationQuestion','integratedAntecessive','includedAntecessiveJump',
  'agreementException','retainContactAlternatives','additionalSharedContacts','interveningClauses',
  'principalContinuationFrames','supplementContinuationFrames','reusePrincipalIntervener',
  'discontinuousHeadPosition','principalActsAsStandaloneUtterance','supplementActsAsStandaloneUtterance',
  'principalObjectId','supplementObjectId','wishRealizability','speechDirectness',
  'contextualSilentFirstPerson','specificityDomainRestriction'];
const DISCOURSE = ['speakerGender','speakerGroupMembership','namedPartnerKnownParticipant'];
const PARTICLE = ['structuralRole','speakerGender'];
const exact = (v,keys) => Boolean(v && typeof v==='object' && !Array.isArray(v)
  && Object.keys(v).every(k=>keys.includes(k)));
const scalar = v => ['string','boolean','number'].includes(typeof v) && (typeof v!=='number'||Number.isFinite(v));
const plain = (v,keys) => exact(v,keys) && Object.values(v).every(scalar);
const pick = (v,keys) => Object.fromEntries(keys.filter(k=>scalar(v?.[k])).map(k=>[k,v[k]]));
const need = condition => { if (!condition) throw new Error('unsupported clause reload inputs'); };
export function isClauseReloadEvidence(r,v) {
  return ['isClassicalNahuatlDiscourseSourceContextFrame','isClassicalNahuatlSupplementationContextRecord',
    'isClassicalNahuatlSupplementationClauseEnvelope','isClassicalNahuatlClauseCompositionSourceFrame',
    'isClassicalNahuatlParticleSourceFrame','isClassicalNahuatlParticleResultFrame',
    'isClassicalNahuatlNegativeParticleSelectionFrame','isClassicalNahuatlSupplementationFrame']
    .some(name=>r[name]?.(v)===true && v.authorizationStatus!=='blocked');
}
// Tagged containers keep graph references distinct from caller option objects.
function pack(r,v,visit,depth=0) {
  need(depth<=12);
  if (v===null || scalar(v)) return v;
  if (isClauseReloadEvidence(r,v) || r.isClassicalGrammarApplicationResultCapture?.(r.captureClassicalGrammarApplicationResult?.(v,'reload-option'),'reload-option')===true)
    return {ref:visit(v)};
  if (Array.isArray(v)) { need(v.length<=128); return {list:v.map(x=>pack(r,x,visit,depth+1))}; }
  need(v && typeof v==='object' && [Object.prototype,null].includes(Object.getPrototypeOf(v)) && Object.keys(v).length<=64);
  return {fields:Object.fromEntries(Object.entries(v).map(([k,x])=>[k,pack(r,x,visit,depth+1)]))};
}
function unpack(v,prior,depth=0) {
  need(depth<=12);
  if(v===null||scalar(v))return v;
  if(exact(v,['ref'])&&Object.hasOwn(v,'ref')) { const result=prior(v.ref);need(result);return result; }
  if(exact(v,['list'])&&Array.isArray(v.list)&&v.list.length<=128)return v.list.map(x=>unpack(x,prior,depth+1));
  need(exact(v,['fields'])&&v.fields&&typeof v.fields==='object'&&!Array.isArray(v.fields)&&Object.keys(v.fields).length<=64);
  return Object.fromEntries(Object.entries(v.fields).map(([k,x])=>[k,unpack(x,prior,depth+1)]));
}
export function exportClauseContextReloadNode(r,v,visit) {
  if(r.isClassicalNahuatlDiscourseSourceContextFrame?.(v)===true)
    return {type:'clause:discourse-source',inputs:pick(v,DISCOURSE)};
  if(r.isClassicalNahuatlSupplementationContextRecord?.(v)===true) {
    return {type:'clause:context-record',contextKind:v.contextKind,referenceId:v.referenceId,
      ...(v.discourseSourceContextFrame?{discourse:visit(v.discourseSourceContextFrame)}:{}),
      ...(v.contextKind==='named-partner'?pick(v,['groupReferenceId','namedPartnerReferenceId','speakerOrAddresseeReferenceId']):{})};
  }
  if(r.isClassicalNahuatlClauseCompositionSourceFrame?.(v)===true)
    return {type:'clause:source',envelope:visit(v.envelope),
      objectReferenceIds:Object.fromEntries(v.objects.map(x=>[x.id,x.referenceId]))};
  if(r.isClassicalNahuatlSupplementationClauseEnvelope?.(v)===true) {
    const source=r.getClassicalNahuatlSupplementationClauseSourceFrame(v);need(source);
    return {type:'clause:envelope',source:visit(source),facts:pick(v.callerDerivedFacts,FACTS),
      referenceId:v.referenceId,subjectReferenceId:v.subject?.referenceId||'',
      objectReferenceIds:Object.fromEntries(v.objects.map(x=>[x.id,x.referenceId])),
      possessorReferenceId:v.possessor?.referenceId||'',contexts:v.contextRecords.map(visit)};
  }
  if(r.isClassicalNahuatlSupplementationFrame?.(v)===true) {
    const inputs=r.getClassicalNahuatlSupplementationReloadInputs(v);need(inputs&&exact(inputs.options,RELATION));
    return {type:'clause:supplementation',principal:visit(inputs.principalClause),supplement:visit(inputs.supplementClause),
      options:Object.fromEntries(Object.entries(inputs.options).map(([k,x])=>[k,pack(r,x,visit)]))};
  }
  if(r.isClassicalNahuatlParticleSourceFrame?.(v)===true)return {type:'particle:source',particleId:v.particleId};
  if(r.isClassicalNahuatlNegativeParticleSelectionFrame?.(v)===true&&v.authorizationStatus==='authorized') {
    return {type:'particle:negative-selection',polarity:v.polarity,sentenceKind:v.sentenceKind,
      ...(v.precedingParticleResultFrame?{preceding:visit(v.precedingParticleResultFrame)}:{precedingParticleId:v.precedingParticleId})};
  }
  if(r.isClassicalNahuatlParticleResultFrame?.(v)===true) {
    const inputs=r.getClassicalNahuatlParticleReloadInputs(v);need(inputs);
    return {type:'particle:result',source:visit(inputs.sourceFrame),options:pick(inputs.options,PARTICLE),
      ...(inputs.options.precedingParticleSourceFrame?{preceding:visit(inputs.options.precedingParticleSourceFrame)}:{})};
  }
  return undefined;
}
export function replayClauseContextReloadNode(r,n,prior) {
  try {
    if(n?.type==='clause:discourse-source') {
      need(exact(n,['type','inputs'])&&plain(n.inputs,DISCOURSE));
      return r.buildClassicalNahuatlDiscourseSourceContextFrame(n.inputs);
    }
    if(n?.type==='clause:context-record') {
      need(exact(n,['type','contextKind','referenceId','discourse','groupReferenceId','namedPartnerReferenceId','speakerOrAddresseeReferenceId'])
        &&typeof n.contextKind==='string'&&typeof n.referenceId==='string');
      const inputs={kind:n.contextKind,referenceId:n.referenceId};
      if(n.discourse!==undefined) {inputs.discourseSourceContextFrame=prior(n.discourse);need(inputs.discourseSourceContextFrame);}
      for(const key of ['groupReferenceId','namedPartnerReferenceId','speakerOrAddresseeReferenceId'])
        if(n[key]!==undefined){need(typeof n[key]==='string');inputs[key]=n[key];}
      return r.buildClassicalNahuatlSupplementationContextRecord(inputs);
    }
    if(n?.type==='clause:envelope') {
      need(exact(n,['type','source','facts','referenceId','subjectReferenceId','objectReferenceIds','possessorReferenceId','contexts'])
        &&prior(n.source)&&plain(n.facts,FACTS)&&['referenceId','subjectReferenceId','possessorReferenceId'].every(k=>typeof n[k]==='string')
        &&n.objectReferenceIds&&typeof n.objectReferenceIds==='object'&&!Array.isArray(n.objectReferenceIds)
        &&Object.values(n.objectReferenceIds).every(x=>typeof x==='string')&&Array.isArray(n.contexts)&&n.contexts.length<=32);
      const contexts=n.contexts.map(id=>{const v=prior(id);need(r.isClassicalNahuatlSupplementationContextRecord(v));return v;});
      return r.buildClassicalNahuatlSupplementationClauseEnvelope(prior(n.source),{...n.facts,
        referenceId:n.referenceId,subjectReferenceId:n.subjectReferenceId,objectReferenceIds:n.objectReferenceIds,
        possessorReferenceId:n.possessorReferenceId,contextRecords:contexts});
    }
    if(n?.type==='clause:source') {
      need(exact(n,['type','envelope','objectReferenceIds']));const envelope=prior(n.envelope);need(r.isClassicalNahuatlSupplementationClauseEnvelope(envelope));
      need(n.objectReferenceIds&&typeof n.objectReferenceIds==='object'&&!Array.isArray(n.objectReferenceIds)
        &&Object.values(n.objectReferenceIds).every(x=>typeof x==='string'));
      const source=r.getClassicalNahuatlSupplementationClauseSourceFrame(envelope);
      return r.buildClassicalNahuatlClauseCompositionSourceFrame(source,{...pick(envelope.callerDerivedFacts,FACTS),
        referenceId:envelope.referenceId,subjectReferenceId:envelope.subject?.referenceId||'',
        objectReferenceIds:n.objectReferenceIds,
        possessorReferenceId:envelope.possessor?.referenceId||'',contextRecords:envelope.contextRecords});
    }
    if(n?.type==='clause:supplementation') {
      need(exact(n,['type','principal','supplement','options'])&&prior(n.principal)&&prior(n.supplement)&&exact(n.options,RELATION));
      const options=Object.fromEntries(Object.entries(n.options).map(([k,x])=>[k,unpack(x,prior)]));
      const request={operationKind:'relation',principalClause:prior(n.principal),supplementClause:prior(n.supplement),options};
      return r.executeClassicalGrammarApplicationRequest({operationId:'sentence:supplementation',args:[request]})?.canonicalResult;
    }
    if(n?.type==='particle:source') {need(exact(n,['type','particleId'])&&typeof n.particleId==='string');return r.buildClassicalNahuatlParticleSourceFrame(n.particleId);}
    if(n?.type==='particle:result') {
      need(exact(n,['type','source','options','preceding'])&&prior(n.source)&&plain(n.options,PARTICLE));
      const options={...n.options};if(n.preceding!==undefined){options.precedingParticleSourceFrame=prior(n.preceding);need(options.precedingParticleSourceFrame);}
      return r.executeClassicalGrammarApplicationRequest({operationId:'particle:result',args:[prior(n.source),options]})?.canonicalResult;
    }
    if(n?.type==='particle:negative-selection') {
      need(exact(n,['type','polarity','sentenceKind','preceding','precedingParticleId'])&&typeof n.polarity==='string'&&typeof n.sentenceKind==='string'
        &&!(n.preceding!==undefined&&n.precedingParticleId!==undefined));
      const inputs=pick(n,['polarity','sentenceKind']);
      if(n.preceding!==undefined){inputs.precedingParticleResultFrame=prior(n.preceding);need(inputs.precedingParticleResultFrame);}
      else {need(typeof n.precedingParticleId==='string');inputs.precedingParticleId=n.precedingParticleId;}
      return r.executeClassicalGrammarApplicationRequest({operationId:'particle:negative-selection',args:[inputs]})?.canonicalResult;
    }
    return undefined;
  } catch {return null;}
}
