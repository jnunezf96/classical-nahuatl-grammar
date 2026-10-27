import {resolveResultEditTarget} from './result_editing.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&v=20261023-conjunction-1&interfaceRelease=1.2.36&choiceGuidance=20261027-2';
import {canRebuildResultEdit,isResultEditOccurrencePath} from './result_edit_rebuild.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&mixedInner=20261024-1&v=20261023-conjunct-edit-1&interfaceRelease=1.2.36';

// Persist only an occurrence address. Replayed owner Results supply all identity
// and grammar; serialized objects and written text cannot stand in for them.
export function restoreResultEditReload(runtime, roots, saved) {
  if (!saved || saved.version !== 1 || Object.keys(saved).some(key=>!['version','path','sourceReplacement'].includes(key))
    || Object.hasOwn(saved,'sourceReplacement') && saved.sourceReplacement !== true
    || !isResultEditOccurrencePath(saved.path) || !saved.path.length) return null;
  const target=resolveResultEditTarget(runtime,roots.result,saved.path);
  if (!target || target.node !== roots.source
    || !canRebuildResultEdit(runtime,roots.result,target.node,undefined,target.path)) return null;
  return Object.freeze({action:'change',intent:'change',root:roots.result,
    target:target.node,path:Object.freeze([...target.path]),...(saved.sourceReplacement ? {sourceReplacement:true} : {})});
}
export function snapshotResultEditReload(runtime, edit, accepted, source) {
  if (edit?.action !== 'change' || edit.intent === 'add' || edit.root !== accepted
    || edit.target !== source) return null;
  const saved={version:1,path:edit.path,...(edit.sourceReplacement ? {sourceReplacement:true} : {})};
  return restoreResultEditReload(runtime,{result:accepted,source},saved)
    ? {...saved,path:[...edit.path]} : null;
}
