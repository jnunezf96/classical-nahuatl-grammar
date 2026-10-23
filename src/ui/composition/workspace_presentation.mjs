// Arrange the existing editor and accepted Result. Grammar and execution remain
// with their native owners; this module never copies a field or creates a form.
export function createWorkspacePresentation(doc) {
  const win=doc.defaultView;
  const boundSources=new WeakSet();
  let editor;
  let sourceSignature;
  let output;
  let navigation;
  let queued=false;
  let applyRequested=false;
  let context={action:'',materialSupplied:false};
  const fitResult=()=>{
    if(!output)return;
    const result=output.querySelector('#classical-result-panel');
    const root=doc.getElementById('classical-workbench');
    const declaredOffset=root ? parseFloat(win.getComputedStyle(root).getPropertyValue('--composition-nav-offset')) : 0;
    // The action band can wrap before Flow writes its next offset. Reserve the
    // larger of its measured clearance and the CSS position used for sticking.
    const offset=Math.max(declaredOffset||0,navigation ? navigation.getBoundingClientRect().height+12 : 110);
    const fits=Boolean(result && win.innerWidth>1300
      && result.getBoundingClientRect().height<=win.innerHeight-offset-12);
    const value=String(fits);
    if(output.dataset.resultFitsViewport!==value)output.dataset.resultFitsViewport=value;
    if(result && result.dataset.resultFitsViewport!==value)result.dataset.resultFitsViewport=value;
  };
  const resultSize=new win.ResizeObserver(fitResult);
  const schedule=()=>{
    if(queued)return;
    queued=true;
    win.requestAnimationFrame(()=>{queued=false;refreshWorkspace();});
  };
  doc.addEventListener('click',event=>{
    if(event.target.closest('[data-classical-panel-jump="classical-source-panel"]') && editor)
      editor.open=true;
    if(event.target.closest('#verb-entry-apply:not(:disabled)')) {
      applyRequested=true;
      schedule();
    }
  },true);
  doc.addEventListener('keydown',event=>{
    if(event.key==='Enter' && event.target.matches('[data-classical-source-part-input]')) {
      applyRequested=true;
      schedule();
    }
  },true);
  doc.addEventListener('classical:composition-action-change',event=>{
    // Reveal required Source material before the existing composing action
    // focuses its original input. Keep that native focus destination intact.
    context={action:event.detail?.action || '',materialSupplied:false};
    refreshWorkspace();
  });
  win.addEventListener('resize',fitResult);

  function refreshWorkspace(nextContext) {
    if(nextContext)context=nextContext;
    const container=doc.getElementById('container-inputs');
    const parts=doc.getElementById('classical-source-parts');
    const status=doc.getElementById('classical-source-commit-status');
    if(container && parts && status) {
      const title=doc.getElementById('classical-stage-source-heading')?.closest('.panel-block-title');
      const cue=doc.getElementById('composition-source-cue');
      editor=container.querySelector(':scope > [data-composition-source-editor]');
      if(!editor) {
        editor=doc.createElement('details');
        editor.className='composition-source-editor';
        editor.dataset.compositionSourceEditor='true';
        const summary=doc.createElement('summary');summary.textContent='Edit Source';
        const body=doc.createElement('div');body.className='composition-source-editor__body';
        editor.append(summary,body);container.append(editor);
        sourceSignature=undefined;
      }
      const body=editor.querySelector(':scope > .composition-source-editor__body');
      for(const node of Array.from(container.children))
        if(![title,cue,status,editor].includes(node))body.append(node);
      // The native shell may remount its status in the Source lane. Keep that
      // same live status visible next to the disclosure, including draft errors.
      const anchor=cue || title;
      if(anchor && anchor.nextElementSibling!==status)anchor.after(status);
      if(status.nextElementSibling!==editor)status.after(editor);
      if(!boundSources.has(parts)) {
        parts.addEventListener('classical-source-commit-state-change',schedule);
        boundSources.add(parts);
      }
      const pending=parts.dataset.classicalSourceCommitState==='pending';
      const waiting=status.querySelector('[data-classical-source-commit-badge]')?.textContent.trim()==='Waiting';
      const error=parts.dataset.classicalSourceSoundErrorReason || '';
      const needsMaterial=['add','ask','implicit','address'].includes(context.action) && !context.materialSupplied;
      const signature=`${pending}:${waiting}:${error}:${needsMaterial}`;
      if(signature!==sourceSignature || applyRequested && !pending && !waiting && !error) {
        const focused=editor.contains(doc.activeElement);
        const applying=applyRequested || doc.activeElement?.id==='verb-entry-apply';
        if(pending || waiting || error || needsMaterial)editor.open=true;
        else if(!focused || applying) {
          editor.open=false;
          if(applying)editor.querySelector(':scope > summary').focus({preventScroll:true});
        }
        sourceSignature=signature;
      }
      applyRequested=false;
    }
    const next=doc.querySelector('#classical-workbench .panel-output-column');
    if(next!==output) {
      if(output)resultSize.unobserve(output.querySelector('#classical-result-panel')||output);
      output=next;
      if(output)resultSize.observe(output.querySelector('#classical-result-panel')||output);
    }
    const nextNavigation=doc.querySelector('.classical-four-panel-navigation');
    if(nextNavigation!==navigation) {
      if(navigation)resultSize.unobserve(navigation);
      navigation=nextNavigation;
      if(navigation)resultSize.observe(navigation);
    }
    fitResult();
  }
  return refreshWorkspace;
}
