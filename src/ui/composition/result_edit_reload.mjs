import {resolveResultEditTarget} from './result_editing.mjs?innerParticle=20261024-1&v=20261023-conjunction-1';
import {canRebuildResultEdit,isResultEditOccurrencePath} from './result_edit_rebuild.mjs?innerParticle=20261024-1&mixedInner=20261024-1&v=20261023-conjunct-edit-1';

// Persist only an occurrence address. Replayed owner Results supply all identity
// and grammar; serialized objects and written text cannot stand in for them.
export function restoreResultEditReload(runtime, roots, saved) {
  if (!saved || saved.version !== 1 || Object.keys(saved).some(key=>!['version','path'].includes(key))
    || !isResultEditOccurrencePath(saved.path) || !saved.path.length) return null;
  const target=resolveResultEditTarget(runtime,roots.result,saved.path);
  if (!target || target.node !== roots.source
    || !canRebuildResultEdit(runtime,roots.result,target.node,undefined,target.path)) return null;
  return Object.freeze({action:'change',intent:'change',root:roots.result,
    target:target.node,path:Object.freeze([...target.path])});
}
export function snapshotResultEditReload(runtime, edit, accepted, source) {
  if (edit?.action !== 'change' || edit.intent === 'add' || edit.root !== accepted
    || edit.target !== source) return null;
  const saved={version:1,path:edit.path};
  return restoreResultEditReload(runtime,{result:accepted,source},saved)
    ? {version:1,path:[...edit.path]} : null;
}
