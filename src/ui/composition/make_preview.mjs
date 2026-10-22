// One pending projection, independent of the accepted Result and Make handler.
export function createMakePreviewController({read,prepare,render,schedule}) {
  let current=null,sequence=0,cancel=null,visible=null;
  const emit=(state,surface='')=>{visible={state,surface};render(visible);};
  function refresh() {
    const position=read();
    if(position===current && (visible?.state!=='ready' || visible.isCurrent?.()!==false))return;
    current=position;const request=++sequence;cancel?.();cancel=null;
    if(!position?.ready || position.applied || position.construction?.sourcePending) {
      emit(position?.applied?'applied':'idle');return;
    }
    emit('loading');
    cancel=schedule(async()=>{
      if(request!==sequence || read()!==position)return;
      let preview=null;
      try {preview=await prepare(position);} catch { /* A failed preview cannot alter Make. */ }
      if(request!==sequence || read()!==position)return;
      if(!preview?.surface || preview.isCurrent?.()!==true){emit('unavailable');return;}
      visible={state:'ready',surface:preview.surface,isCurrent:preview.isCurrent};render(visible);
    });
  }
  return Object.freeze({refresh,dispose(){++sequence;cancel?.();cancel=null;current=null;emit('idle');}});
}

export function createMakePreview(doc) {
  const win=doc.defaultView;
  const controller=createMakePreviewController({
    read:()=>win.getClassicalConstructionPosition?.(),
    prepare:position=>win.previewClassicalConstructionPosition?.(position),
    schedule:task=>{
      let timer=null;
      const frame=win.requestAnimationFrame(()=>{timer=win.setTimeout(task,0);});
      return()=>{win.cancelAnimationFrame(frame);if(timer!==null)win.clearTimeout(timer);};
    },
    render:state=>{
      const make=doc.getElementById('classical-capability-apply-operation');
      if(!make?.parentElement)return;
      let view=doc.getElementById('classical-make-preview');
      if(!view){
        view=doc.createElement('span');view.id='classical-make-preview';view.className='composition-make-preview';
        view.setAttribute('role','status');view.setAttribute('aria-live','polite');view.setAttribute('aria-atomic','true');
        const label=doc.createElement('span');label.className='composition-make-preview__label';label.textContent='Preview';
        const spinner=doc.createElement('span');spinner.className='classical-bootstrap-spinner';spinner.setAttribute('aria-hidden','true');
        const form=doc.createElement('span');form.className='composition-make-preview__form';
        view.append(label,spinner,form);make.before(view);
      }
      view.dataset.previewState=state.state;view.hidden=['idle','applied'].includes(state.state);
      view.setAttribute('aria-busy',String(state.state==='loading'));
      const spinner=view.querySelector('.classical-bootstrap-spinner');spinner.hidden=state.state!=='loading';
      const form=view.querySelector('.composition-make-preview__form');
      const text=state.state==='loading'?'Generating…':state.state==='ready'?state.surface:'Preview unavailable';
      if(form.textContent!==text)form.textContent=text;
      view.title=state.surface||'';
    },
  });
  return()=>controller.refresh();
}
