import {createRuntimeInstance} from '../../runtime/create_runtime.mjs';
import {Element} from './organization_dom.mjs';

// The scalar renderer requires a real output target. Its grammar APIs remain
// the canonical runtime; the small DOM represents only rendered elements.
class Node extends Element {
  constructor(tag='div') {
    super(tag);
    this.classList.remove=(...names)=>{this.className=this.className.split(/\s+/).filter(name=>!names.includes(name)).join(' ');};
    this.classList.toggle=(name,force)=>{const enabled=force===undefined?!this.classList.contains(name):Boolean(force);if(enabled)this.classList.add(name);else this.classList.remove(name);return enabled;};
  }
  set innerHTML(value) { if(value!=='')throw new Error('Only clearing is supported');this.replaceChildren(); }
  get innerHTML() { return ''; }
}
export async function createParticleLegacyRuntime() {
  const body=new Node('body'),container=new Node('section');container.id='all-tense-conjugations';body.append(container);
  const document={body,createElement:tag=>new Node(tag),getElementById:id=>body.querySelector('#'+id),
    querySelector:s=>body.querySelector(s),querySelectorAll:s=>body.querySelectorAll(s),addEventListener(){}};
  const instance=await createRuntimeInstance({documentObject:document,collectModuleInspectionDescriptors:true});
  const runtime=instance.runtimeObject,inspection={...runtime};document.defaultView=runtime;
  // Old owner-level suites exercise private canonical capabilities too. The
  // runtime's existing inspection descriptors expose those exact functions.
  for(const [name,descriptor] of Object.entries(instance.moduleInspectionDescriptors))
    if(!(name in inspection))Object.defineProperty(inspection,name,descriptor);
  return {runtime,inspection,document,container};
}
