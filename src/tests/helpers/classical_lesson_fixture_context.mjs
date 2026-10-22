import {createModuleRuntime} from '../../node/runtime.mjs';
import {createRuntimeInstance} from '../../runtime/create_runtime.mjs';
import * as lessons20To22Ledger from '../fixtures/classical_lessons20_22_source_ledger.mjs';
import * as lessons40To43Ledger from '../../../../Classical_Nahuatl_Grammar/scripts/lib/classical_lessons40_43_source_span_audit.mjs';
import {createClassicalShellModule} from '../../ui/shell/classical_shell.mjs';

function installHistoricalSourceAudit(context) {
  const sourcePath=new URL('../../../ANDREWS_TRANSCRIPTION_CANVAS.md',import.meta.url);
  const audit={...lessons40To43Ledger,
    auditClassicalNahuatlLessons4043SourceClosure(options={}) {
      return lessons40To43Ledger.auditClassicalNahuatlLessons4043SourceClosure({
        sourcePath,...options,
      });
    },
  };
  for(const [name,value]of Object.entries(audit)){
    if(!(name in context))Object.defineProperty(context,name,{value});
  }
}

// Legacy lesson suites inspect internal providers as well as public owners.
// Reuse the installed descriptors so their Results keep the same issuer identity.
// This context is test-only; it does not publish any additional runtime controls.
export async function createClassicalLessonFixtureContext({withControlDocument=false}={}) {
  if(withControlDocument){
    const result=await createModuleRuntime({exposeModuleInspectionCapabilities:true});
    installHistoricalSourceAudit(result.context);
    return {context:result.context,instance:{runtimeObject:result.productionContext}};
  }
  const instance=await createRuntimeInstance({
    collectModuleInspectionDescriptors:true,
    documentObject:{getElementById:()=>null,querySelector:()=>null,
      querySelectorAll:()=>[],addEventListener(){}},
  });
  const context=Object.defineProperties(
    Object.create(instance.runtimeObject),instance.moduleInspectionDescriptors,
  );
  // Supplement missing pure shell presentation APIs; keep installed bindings.
  const shellDescriptors=Object.getOwnPropertyDescriptors(createClassicalShellModule(context));
  for(const [name,descriptor]of Object.entries(shellDescriptors)){
    if(!(name in context))Object.defineProperty(context,name,descriptor);
  }
  // Historical evidence remains test-only and cannot authorize grammar.
  for(const [name,value]of Object.entries(lessons20To22Ledger)){
    if(!(name in context))Object.defineProperty(context,name,{value});
  }
  installHistoricalSourceAudit(context);
  return {context,instance};
}
