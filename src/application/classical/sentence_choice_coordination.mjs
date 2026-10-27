// Retained selections are presentation memory, never grammar authority. Each
// restored request is reissued by the exact current canonical binding owner.
export function createSentenceChoiceCoordinator(owner) {
  const memories = new WeakMap();
  const describe = frame => {
    if (owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(frame) === true
      && frame.operationId === 'vnc:application' && frame.navigator?.exactSource === frame.exactSource)
      return {source:frame.exactSource,kind:'typed'};
    if (owner.isClassicalNahuatlVncContinuationBindingFrame?.(frame) === true
      && frame.operationId === 'vnc:application' && frame.ownerInputAcceptanceProven === true)
      return {source:frame.exactInputResult,kind:'exact'};
    return null;
  };
  const fields={introductoryParticle:'introductoryParticleValues',prefaceParticle:'prefaceParticleValues',introductoryModifier:'introductoryModifierValues',sentenceAntecessive:'prefixStackValues'};
  const uiValue=(key,value)=>key==='sentenceAntecessive'?(value===true?'antecessive':'none'):value||'none';
  function handoff(previous,next,{choiceId='other',explicitValidated=false,issue}={}) {
    const before=describe(previous),after=describe(next);
    if (!before || !after || before.source!==after.source || before.kind!==after.kind) return next;
    const selections={...next.callerSelections,sentenceOptions:{...next.callerSelections?.sentenceOptions}};
    const memory={...(memories.get(previous)||{})};
    const contract=()=>owner.getClassicalNahuatlSentenceChoiceContract({...selections,...selections.sentenceOptions});
    if(fields[choiceId] && explicitValidated && next.bindingStatus==='ready') {
      const value=selections.sentenceOptions[choiceId];
      if(contract()[fields[choiceId]]?.includes(uiValue(choiceId,value))) memory[choiceId]={value,mood:selections.mood};
    }
    let changed=false;
    for(const key of Object.keys(fields)) {
      const saved=memory[key];
      if(key===choiceId || !saved || saved.mood!==selections.mood)continue;
      if(contract()[fields[key]]?.includes(uiValue(key,saved.value)) && selections.sentenceOptions[key]!==saved.value) {
        selections.sentenceOptions[key]=saved.value;
        if(key==='sentenceAntecessive') {selections.sentenceOptions.antecessive=saved.value;selections.sentenceOptions.outsidePrefixes=saved.value?['ō#']:[];}
        changed=true;
      }
    }
    let result=next;
    if(changed && typeof issue==='function') {
      const candidate=issue(selections),info=describe(candidate);
      if(info?.source===after.source && info.kind===after.kind && candidate.bindingStatus==='ready') result=candidate;
    }
    memories.set(result,Object.freeze(memory));
    return result;
  }
  return Object.freeze({handoff});
}

// The applied-Source session carries only a UI preference across freshly issued
// equivalent raw-source frames. It never authorizes a source or a particle.
export function createParticleHonorificChoiceCoordinator(owner) {
  const memory=new WeakMap(), sessions=new WeakSet();
  const beginSession=()=>{const token=Object.freeze({});sessions.add(token);return token;};
  function select({binding,particleId='',requested=false,explicit=false,session=null}={}) {
    const typed=owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)===true;
    const exact=owner.isClassicalNahuatlVncContinuationBindingFrame?.(binding)===true;
    const source=typed&&binding.navigator?.exactSource===binding.exactSource?binding.exactSource
      :exact&&binding.ownerInputAcceptanceProven===true?binding.exactInputResult:null;
    const particle=owner.buildClassicalNahuatlParticleSourceFrame?.(particleId);
    const available=owner.buildClassicalNahuatlParticleHonorificSourceFrame?.({particleSourceFrame:particle})?.authorizationStatus==='authorized';
    if(!source || session && !sessions.has(session))return Object.freeze({selected:false,available,executionAuthority:false});
    const key=typed&&session?session:source;
    if(explicit&&available)memory.set(key,requested===true);
    return Object.freeze({selected:available&&(memory.has(key)?memory.get(key):requested===true),available,executionAuthority:false});
  }
  return Object.freeze({select,beginSession});
}
