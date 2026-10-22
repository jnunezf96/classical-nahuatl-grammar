// Presentation only. Retain native elements, event handlers and owner decisions.
export function createLiveDesign(doc) {
  let dialog;
  let pathTrigger;
  let skipBound=false;
  let navigationBound=false;
  let panelScrollBound=false;
  let syncStackedPanelStep=()=>{};
  const setText=(node,value)=>{if(node && node.textContent!==value)node.textContent=value;};
  return function refreshDesign() {
    const root=doc.getElementById('classical-workbench');
    if(!root)return;
    const skip=doc.querySelector('.skip-link');
    if(skip && !skipBound) {
      // A native fragment jump would overwrite the composed sentence's route.
      skip.addEventListener('click',event=>{
        event.preventDefault();
        root.focus({preventScroll:true});
        root.scrollIntoView({block:'start'});
      });
      skipBound=true;
    }
    for(const [kind,label] of [['source','Source'],['grammar','Grammar'],['result','Result']])
      setText(doc.getElementById(`classical-stage-${kind}-heading`),label);
    for(const [id,label] of [['source','1 Source'],['authority','2 Grammar'],['result','3 Result']])
      setText(doc.querySelector(`[data-classical-panel-jump="classical-${id}-panel"]`),label);
    const navigation=doc.querySelector('.classical-four-panel-navigation');
    if(navigation && !navigationBound) {
      navigation.addEventListener('click',event=>{
        const button=event.target.closest('[data-classical-panel-jump]');
        if(!button || button.dataset.classicalPanelJump==='classical-path-panel')return;
        navigation.querySelectorAll('[data-classical-panel-jump]:not([data-classical-panel-jump="classical-path-panel"])').forEach(item=>{
          if(item===button)item.setAttribute('aria-current','step');
          else item.removeAttribute('aria-current');
        });
      });
      navigationBound=true;
    }
    if(navigation && !panelScrollBound) {
      const win=doc.defaultView;
      let queued=false;
      const sync=()=>{
        if(!win || win.innerWidth>900)return;
        const navBottom=navigation.getBoundingClientRect().bottom;
        const panels=['classical-source-panel','classical-authority-panel','classical-result-panel']
          .map(id=>doc.getElementById(id))
          .filter(panel=>panel && panel.getClientRects().length>0);
        // A tall Grammar panel can still cross the sticky nav after Result has
        // entered view. Prefer the next panel when it is close to the nav so
        // the active step follows the visible heading at stage transitions.
        const nearNext=panels.filter(panel=>{
          const rect=panel.getBoundingClientRect();
          return rect.top>navBottom && rect.top<=navBottom+120;
        }).at(-1);
        const current=nearNext || panels.filter(panel=>{
          const rect=panel.getBoundingClientRect();
          return rect.top<=navBottom+1 && rect.bottom>navBottom;
        }).at(-1) || panels.find(panel=>panel.getBoundingClientRect().top>navBottom) || panels.at(-1);
        if(!current)return;
        navigation.querySelectorAll('[data-classical-panel-jump]:not([data-classical-panel-jump="classical-path-panel"])')
          .forEach(button=>{
            if(button.dataset.classicalPanelJump===current.id)button.setAttribute('aria-current','step');
            else button.removeAttribute('aria-current');
          });
      };
      const schedule=()=>{
        if(queued)return;
        queued=true;
        win.requestAnimationFrame(()=>{queued=false;sync();});
      };
      const alignActivePanel=()=>{
        if(!win || win.innerWidth>900)return;
        const currentId=navigation.querySelector('[aria-current="step"]')?.dataset.classicalPanelJump;
        const panel=currentId && doc.getElementById(currentId);
        if(!panel)return;
        const navRect=navigation.getBoundingClientRect();
        const panelTop=panel.getBoundingClientRect().top;
        // Resizing can wrap the sticky wayfinder onto another row. If that
        // newly taller bar covers a panel that begins in view, uncover its
        // heading without pulling someone out of a panel they are reading.
        if(navRect.top<=1 && panelTop>=0 && panelTop<navRect.bottom+12)
          win.scrollBy({top:panelTop-navRect.bottom-12,behavior:'auto'});
      };
      win?.addEventListener('scroll',schedule,{passive:true});
      win?.addEventListener('resize',()=>{
        schedule();
        win.requestAnimationFrame(alignActivePanel);
      });
      syncStackedPanelStep=sync;
      panelScrollBound=true;
    }
    syncStackedPanelStep();
    if(navigation && !navigation.querySelector('[aria-current="step"]'))
      navigation.querySelector('[data-classical-panel-jump="classical-source-panel"]')?.setAttribute('aria-current','step');
    const path=doc.getElementById('classical-path-panel');
    if(path && !dialog) {
      dialog=doc.createElement('dialog');dialog.id='classical-path-dialog';
      dialog.setAttribute('aria-labelledby','classical-stage-path-heading');
      dialog.setAttribute('aria-describedby','classical-path-description');
      const close=doc.createElement('button');close.type='button';close.className='path-dialog-close';
      close.textContent='Close';close.setAttribute('aria-label','Close Your path');
      close.addEventListener('click',()=>dialog.close());
      dialog.append(close,...Array.from(path.childNodes));path.append(dialog);
      dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();dialog.close();}});
      path.dataset.classicalPanelNavigationKind='dialog';
      const trigger=doc.querySelector('[data-classical-panel-jump="classical-path-panel"]');
      pathTrigger=trigger;
      if(trigger){setText(trigger,'History');trigger.setAttribute('aria-label','Open build history and recovery');trigger.setAttribute('title','Return to or compare an earlier build');trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls','classical-path-dialog');
        doc.getElementById('classical-path-panel')?.setAttribute('data-classical-panel-navigation-kind','dialog');
        trigger.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();dialog.showModal();});}
      dialog.addEventListener('close',()=>pathTrigger?.focus({preventScroll:true}));
      dialog.addEventListener('click',event=>{
        if(event.target.closest('#classical-grammar-workspace-history-continue') && !event.target.closest('button')?.disabled)dialog.close();
      });
    }
    for(const card of root.querySelectorAll('.classical-result-continuation-card')) {
      const actions=card.querySelector('.composition-actions');
      if(!actions)continue;
      let menu=card.querySelector('.composition-continue-menu');
      if(!menu){menu=doc.createElement('details');menu.className='composition-continue-menu';
        const summary=doc.createElement('summary');summary.textContent='Continue composing';menu.append(summary);
        actions.before(menu);menu.append(actions);
        actions.addEventListener('click',event=>{if(event.target.closest('button'))menu.open=false;});}
      const empty=actions.children.length===0;if(menu.hidden!==empty)menu.hidden=empty;
    }
  };
}
