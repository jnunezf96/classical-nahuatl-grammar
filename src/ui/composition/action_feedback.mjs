// Presentation scheduling only. The callback still owns validation, staging
// and execution; a working indicator never grants grammatical authority.
const pending=new WeakMap();
export function runCompositionAction(doc,control,action,{isCurrent=()=>true,label='Working…'}={}) {
  const root=doc.getElementById('classical-workbench'),win=doc.defaultView;
  if(!control || control.disabled || control.getAttribute('aria-disabled')==='true' || root && pending.has(root))return false;
  if(!root || !win?.requestAnimationFrame || !win?.setTimeout){action();return true;}
  const token={};pending.set(root,token);
  const priorBusy=control.getAttribute('aria-busy');
  control.dataset.compositionWorking='true';control.setAttribute('aria-busy','true');
  root.dataset.compositionWorking=control.id || 'action';
  let status=doc.getElementById('composition-action-status');
  if(!status){status=doc.createElement('span');status.id='composition-action-status';status.className='composition-action-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');root.append(status);}
  status.textContent=label;
  // A timer after the frame gives the browser a paint opportunity before the
  // native synchronous handler. There is no artificial minimum wait.
  win.requestAnimationFrame(()=>win.setTimeout(()=>{
    try {
      if(control.isConnected!==false && !control.disabled && control.getAttribute('aria-disabled')!=='true' && isCurrent())action();
    } finally {
      delete control.dataset.compositionWorking;
      if(priorBusy===null)control.removeAttribute('aria-busy');else control.setAttribute('aria-busy',priorBusy);
      if(pending.get(root)===token){pending.delete(root);delete root.dataset.compositionWorking;status.textContent='';}
      if(win.CustomEvent)doc.dispatchEvent(new win.CustomEvent('classical:interaction-settled',{detail:{controlId:control.id}}));
    }
  },0));
  return true;
}
