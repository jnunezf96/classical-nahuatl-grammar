import {createConstructionPosition,projectConstructionPosition} from './construction_position.mjs?v=20261012-position-12';

// The only execution input is the current position's captured owner packet.
export function createConstructionSession({isSource,isResult,execute,present,onChange=()=>{},onFailure=()=>{}}) {
  const store=createConstructionPosition({isSource,isResult});
  const notify=()=>onChange(store);
  const stage=(proposal,type)=>{const changed=store.stage(proposal,type);if(changed)notify();return changed;};
  return Object.freeze({stage,
    restore(result,receipt){const restored=store.restore(result,receipt);if(restored)notify();return restored;},
    dispatch(move,resolve){const changed=store.dispatch(move,resolve);if(changed)notify();return changed;},
    make(revision=store.position.revision) {
      const token=store.beginMake(revision);if(!token)return false;
      try {
        const application=execute(token.position.execution,token.position);
        if(!application || application.authorizationStatus!=='authorized' || isResult(application.canonicalResult)!==true) {
          store.rejectMake(token,application?.blockReason || 'construction-execution-blocked');notify();onFailure(application);return false;
        }
        if(!present(application,token.position.execution,token.position)){store.rejectMake(token,'construction-presentation-blocked');notify();onFailure(application);return false;}
        const made=store.finishMake(token,application.canonicalResult,Object.freeze({application,
          operation:token.position.construction.route.operation,executedRevision:token.position.revision,
          construction:token.position.construction,choices:token.position.choices}));
        if(made)notify();return made;
      } catch(error){store.rejectMake(token,error.message);notify();onFailure(null,error);return false;}
    },
    get position(){return store.position;},get journal(){return store.journal;},
    observation:identity=>projectConstructionPosition(store,identity),
  });
}
