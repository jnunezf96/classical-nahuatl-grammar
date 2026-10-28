import {createConstructionPosition,projectConstructionPosition} from './construction_position.mjs?stemReload=20261024-2&v=20261012-position-12&acceptedBuild=20261023-1&operationPilot=20261027-1&ownerProtocol=20261028-1&acceptanceRecovery=20261028-1';

// The only execution input is the current position's captured owner packet.
export function createConstructionSession({isSource,isResult,execute,present,
  prepareCommit=()=>({commit:()=>true,publish(){}}),recover=present,onChange=()=>{},onFailure=()=>{}}) {
  const store=createConstructionPosition({isSource,isResult});
  let pendingPresentation=null, presenting=false;
  const report=(application,error)=>{try{onFailure(application,error);}catch{}};
  const notify=()=>onChange(store);
  const stage=(proposal,type)=>{const changed=store.stage(proposal,type);if(changed)notify();return changed;};
  function recoverPresentation() {
    const pending=pendingPresentation;
    if(!pending || !store.position.accepted.result)return false;
    presenting=true;
    try {
      const retry=pending.attempted;pending.attempted=true;
      const application=store.position.accepted.receipt?.application || pending.application;
      if(!(retry?recover(application,pending.packet,pending.position):present(application,pending.packet,pending.position)))
        throw Error('The accepted Result could not be displayed. Retry display.');
      if(!pending.postPresented){pending.context.afterPresent?.(pending.application);pending.postPresented=true;}
      if(store.position.presentationFailure)store.presentationFailed(null);
      notify();pendingPresentation=null;return true;
    } catch(error) {
      store.presentationFailed(error.message || 'construction-presentation-failed');
      report(pending.application,Object.assign(Error('Result saved. Retry display to recover its presentation.'),{acceptanceRecovery:true}));
      return false;
    } finally { presenting=false; }
  }
  return Object.freeze({stage,canTransition:revision=>store.canTransition(revision),recoverPresentation,
    restore(result,receipt){
      const retry=!presenting && pendingPresentation && store.position.accepted.result===result;
      const restored=store.restore(result,receipt);
      if(restored){if(retry)return recoverPresentation();if(!presenting)pendingPresentation=null;notify();}
      return restored;
    },
    dispatch(move,resolve){const changed=store.dispatch(move,resolve);if(changed){if(!store.position.accepted.result)pendingPresentation=null;notify();}return changed;},
    make(revision=store.position.revision,context={}) {
      if(store.position.presentationFailure)return recoverPresentation();
      const token=store.beginMake(revision);if(!token)return false;
      let application=null,transaction=null;
      try {
        application=execute(token.position.execution,token.position);
        if(!application || application.authorizationStatus!=='authorized' || isResult(application.canonicalResult)!==true) {
          store.rejectMake(token,application?.blockReason || 'construction-execution-blocked');
          try{notify();}catch{} report(application);return false;
        }
        const prepared=store.prepareMake(token,application.canonicalResult,Object.freeze({application,
          operation:token.position.construction.route.operation,executedRevision:token.position.revision,
          construction:token.position.construction,choices:token.position.choices}));
        if(!prepared)throw Error('construction-acceptance-preparation-failed');
        transaction=prepareCommit(application,token.position.execution,token.position,context);
        if(!transaction || !transaction.commit())throw Error('Result could not be saved. Retry Make.');
        // Both commits only publish prevalidated private state. No rendering,
        // owner execution, notifications, or other callbacks occur between them.
        if(!store.commitMake(prepared))throw Error('construction-prepared-acceptance-invariant');
      } catch(error) {
        transaction?.cancel?.();store.rejectMake(token,error.message,true);
        try{notify();}catch{} report(application,Object.assign(error,{acceptanceRecovery:true}));return false;
      }
      pendingPresentation={application,packet:token.position.execution,position:token.position,context,postPresented:false};
      try{transaction.publish?.();}catch(error){report(application,error);}
      recoverPresentation();
      return true; // accepted and History committed, even if display needs recovery
    },
    get position(){return store.position;},get journal(){return store.journal;},
    observation:identity=>projectConstructionPosition(store,identity),
  });
}
