// A session position retains authentic owner objects. It never authorizes grammar.
const freezeRecord=value=>Object.freeze({...value});
const equal=(a,b)=>a===b || Boolean(a && b && typeof a==='object' && typeof b==='object'
  && Object.keys(a).length===Object.keys(b).length && Object.keys(a).every(key=>equal(a[key],b[key])));
const sameConstruction=(a,b)=>a.source===b.source && equal(a.route,b.route);
const sameSlots=(a,b)=>a.length===b.length && a.every((slot,i)=>slot.role===b[i].role && slot.exact===b[i].exact);

export function createConstructionPosition({isSource,isResult}={}) {
  let position=Object.freeze({revision:0,construction:freezeRecord({source:null,sourcePending:false,route:freezeRecord({}),slots:Object.freeze([])}),
    choices:freezeRecord({}),baseline:freezeRecord({}),pending:Object.freeze([]),accepted:freezeRecord({result:null,receipt:null}),
    legalMoves:Object.freeze([]),ready:false,applied:false,failure:null,execution:null});
  let activeMake=null;
  const journal=[];
  const publish=(next,type,detail={})=>{
    position=Object.freeze({...next,revision:position.revision+1});
    journal.push(Object.freeze({type,detail:freezeRecord(detail),position}));
    return true;
  };
  const pending=(choices,baseline)=>Object.freeze(Object.keys(choices)
    .filter(key=>!equal(choices[key],baseline[key])));
  function stage(proposal,type='owner-projection',detail={}) {
    if(!proposal || proposal.source && isSource?.(proposal.source)!==true
      || (proposal.slots || []).some(slot=>slot.exact && isSource?.(slot.exact)!==true))return false;
    const construction=freezeRecord({source:proposal.source || null,sourcePending:proposal.sourcePending===true,sourceDraft:proposal.sourceDraft || null,slotOrder:proposal.slotOrder || 'source-order',
      route:freezeRecord(proposal.route || {}),slots:Object.freeze((proposal.slots || []).map(freezeRecord))});
    const choices=freezeRecord(proposal.choices || {});
    const legalMoves=Object.freeze((proposal.legalMoves || []).map(move=>freezeRecord({...move,
      ...(move.values ? {values:Object.freeze([...move.values])}:{}),
      ...(move.invalidates ? {invalidates:Object.freeze([...move.invalidates])}:{})})));
    const baseline=sameConstruction(position.construction,construction) ? freezeRecord({...position.baseline,
      ...Object.fromEntries(Object.entries(choices).filter(([key])=>!Object.hasOwn(position.baseline,key)))}) : choices;
    const applied=position.accepted.receipt?.construction && sameConstruction(position.accepted.receipt.construction,construction)
      && sameSlots(position.accepted.receipt.construction.slots,construction.slots)
      && (proposal.execution?.signature===undefined ? equal(position.accepted.receipt.choices,choices)
        : position.accepted.receipt.executionSignature===proposal.execution.signature);
    const rejected=position.failure && sameConstruction(position.failure.construction,construction)
      && sameSlots(position.failure.construction.slots,construction.slots)
      && (proposal.execution?.signature===undefined ? equal(position.failure.choices,choices)
        : position.failure.executionSignature===proposal.execution.signature);
    const next={...position,construction,choices,baseline,pending:pending(choices,baseline),legalMoves,
      ready:!construction.sourcePending && proposal.ready===true && !applied && !rejected,applied:Boolean(applied) && !construction.sourcePending,
      failure:rejected ? position.failure : null,execution:proposal.execution || null};
    const changed=!sameConstruction(position.construction,construction)
      || position.construction.sourcePending!==construction.sourcePending || !sameSlots(position.construction.slots,construction.slots)
      || !equal(position.construction.sourceDraft,construction.sourceDraft)
      || position.construction.slotOrder!==construction.slotOrder
      || !equal(position.choices,choices) || !equal(position.legalMoves,legalMoves) || position.ready!==next.ready || position.applied!==next.applied
      || position.execution?.signature!==next.execution?.signature || position.failure!==next.failure;
    if(!changed && type==='owner-projection'){position=Object.freeze({...next,revision:position.revision});return true;}
    if(type==='owner-projection') {
      const change=position.construction.source!==construction.source ? 'source'
      : !equal(position.construction.route,construction.route) ? 'route'
      : !sameSlots(position.construction.slots,construction.slots) ? 'slot'
      : construction.sourcePending!==position.construction.sourcePending ? 'source-edit' : 'choice';
      type='owner-reconcile';detail={...detail,change};
    }
    return publish(next,type,detail);
  }
  function dispatch(move,resolve) {
    if(activeMake || move?.revision!==position.revision)return false;
    const legal=position.legalMoves.find(item=>item.type===move.type && item.id===move.id
      && (!item.values || item.values.some(value=>value===move.value)));
    if(!legal)return false;
    const draft={...position.choices};
    if(move.type==='choice') {
      draft[move.id]=move.value;
      for(const key of legal.invalidates || [])delete draft[key];
    }
    const proposal=resolve?.(Object.freeze(draft),position,move);
    if(move.type==='clear') {
      if(!proposal || proposal.source)return false;
      position=Object.freeze({...position,accepted:freezeRecord({result:null,receipt:null}),baseline:freezeRecord({}),choices:freezeRecord({})});
    }
    return proposal ? stage(proposal,move.type,{id:move.id,value:move.value,fromRevision:move.revision}) : false;
  }
  function restore(result,receipt=null) {
    if(isResult?.(result)!==true)return false;
    const matchingReceipt=receipt?.construction && sameConstruction(receipt.construction,position.construction)
      && sameSlots(receipt.construction.slots,position.construction.slots)
      && equal(receipt.choices,position.choices);
    // Reload may restore the accepted Result before reconnecting its editor.
    // Attach that editor's validated acknowledgement without accepting anew.
    if(position.accepted.result===result && (!matchingReceipt || position.accepted.receipt===receipt))return true;
    const baseline=matchingReceipt ? position.choices : position.baseline;
    return publish({...position,accepted:freezeRecord({result,receipt}),baseline,
      pending:pending(position.choices,baseline)},'restore');
  }
  function beginMake(revision) {
    if(activeMake || revision!==position.revision || !position.ready || !position.execution)return null;
    const token=Object.freeze({position});activeMake=token;return token;
  }
  function finishMake(token,result,receipt=null) {
    if(!token || token!==activeMake)return false;
    activeMake=null;
    if(isResult?.(result)!==true)return false;
    const baseline=sameConstruction(position.construction,token.position.construction) ? token.position.choices : position.baseline;
    const executedReceipt=freezeRecord({...receipt,executedRevision:token.position.revision,construction:token.position.construction,
      choices:token.position.choices,executionSignature:token.position.execution?.signature});
    return publish({...position,accepted:freezeRecord({result,receipt:executedReceipt}),baseline,pending:pending(position.choices,baseline),
      ready:false,applied:position===token.position},'make',
      {executedRevision:token.position.revision,construction:token.position.construction,choices:token.position.choices});
  }
  function rejectMake(token,blockReason='') {
    if(token!==activeMake)return false;activeMake=null;
    const failure=freezeRecord({construction:token.position.construction,choices:token.position.choices,
      executionSignature:token.position.execution?.signature,blockReason});
    return publish({...position,ready:false,applied:false,failure},'make-rejected',{executedRevision:token.position.revision,blockReason});
  }
  return Object.freeze({stage,dispatch,restore,beginMake,finishMake,rejectMake,cancelMake:token=>{
    if(token!==activeMake)return false;activeMake=null;return true;
  },get position(){return position;},get journal(){return Object.freeze([...journal]);},
  replay(records) {
    if(position.revision || !Array.isArray(records))return false;
    for(const record of records) {
      const candidate=record?.position;
      if(!candidate || candidate.revision!==position.revision+1
        || candidate.construction.source && isSource?.(candidate.construction.source)!==true
        || candidate.construction.slots.some(slot=>slot.exact && isSource?.(slot.exact)!==true)
        || candidate.accepted.result && isResult?.(candidate.accepted.result)!==true)return false;
      publish(candidate,record.type,record.detail);
    }
    return true;
  }});
}

// Observation only: IDs permit inspection; replay/execution requires real owner objects.
export function projectConstructionValue(value,identity,seen=new WeakSet()) {
  if(!value || typeof value!=='object')return value;
  if(typeof value.kind==='string' && value.kind.startsWith('classical-'))
    return {kind:value.kind,identity:identity(value)};
  if(seen.has(value))return {identity:identity(value)};
  seen.add(value);
  return Array.isArray(value) ? value.map(item=>projectConstructionValue(item,identity,seen))
    : Object.fromEntries(Object.entries(value).map(([key,item])=>[key,projectConstructionValue(item,identity,seen)]));
}
export function projectConstructionPosition(store,identity) {
  const project=position=>({revision:position.revision,source:identity(position.construction.source),
    sourcePending:position.construction.sourcePending,sourceDraft:position.construction.sourceDraft,route:position.construction.route,slotOrder:position.construction.slotOrder,
    slots:position.construction.slots.map(slot=>({role:slot.role,identity:identity(slot.exact)})),
    choices:projectConstructionValue(position.choices,identity),pending:position.pending,accepted:identity(position.accepted.result),
    ready:position.ready,applied:position.applied,blockReason:position.failure?.blockReason || '',legalMoves:position.legalMoves});
  return {position:project(store.position),moves:store.journal.map(row=>({type:row.type,
    id:row.detail.id,value:row.detail.value,fromRevision:row.detail.fromRevision,change:row.detail.change,
    executedRevision:row.detail.executedRevision,blockReason:row.detail.blockReason,position:project(row.position)})),grammarAuthority:false,persistence:'session-only'};
}
