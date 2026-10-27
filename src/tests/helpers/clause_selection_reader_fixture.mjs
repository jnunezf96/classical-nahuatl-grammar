import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as adapter from '../../ui/composition/comparison_operation_transaction.mjs';
import * as guidance from '../../ui/composition/choice_guidance.mjs';
const code=readFileSync(new URL('../../ui/rendering/rendering.mjs',import.meta.url),'utf8');
// Legacy extracted-function fixtures still use their original mutable lane.
// Install the real production readers; pilot integration is exercised separately.
export function installClauseSelectionReaders(ctx){
 Object.assign(ctx,adapter);
 ctx.ClassicalConstructionSession ||= {position:{operationContract:null}};
 ctx.ClassicalComparisonTransitionDraft ??= null;
 ctx.ActiveClassicalGrammarCapabilityNavigator ||= null;
 for(const [name,value] of Object.entries(guidance))if(!(name in ctx))ctx[name]=value;
 ctx.syncClassicalRequiredResultChooser ||= ()=>{};
 if(!vm.isContext(ctx))vm.createContext(ctx);
 for(const name of ['getClassicalComparisonOperationSnapshot','readClassicalClauseSelections','readClassicalClauseContract']){
  const start=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);
 }
 return ctx;
}
