// Keep the owner's elements and closures. Group by Result identity and purpose,
// never by spelling: two different Results can have the same visible surface.
export function createResultInformation(doc) {
  const openState=new Map();
  const savedLimitationOwners=new WeakMap();
  const continuationOwners=new WeakMap();
  function host(parent,key,label) {
    let node=Array.from(parent.children).find(n=>n.dataset.compositionInformation===key);
    if(!node) {
      node=doc.createElement('details');node.className='composition-disclosure composition-result-information';
      node.dataset.compositionInformation=key;node.open=openState.get(key)===true;
      const summary=doc.createElement('summary');summary.textContent=label;node.append(summary);parent.append(node);
      node.addEventListener('toggle',()=>openState.set(key,node.open));
    }
    return node;
  }
  function move(node,parent) {
    if(!node || node.parentNode===parent)return;
    const previous=node.parentElement;
    parent.append(node);
    if(previous?.classList.contains('composition-disclosure') && !previous.dataset.compositionInformation && previous.children.length===1)previous.remove();
  }
  return ({card,action,getIdentity,isCurrentComposition})=>{
    if(card) {
      const phase=action ? 'accepted' : 'single';
      if(card.dataset.compositionResultPhase!==phase)card.dataset.compositionResultPhase=phase;
    }
    const surface=doc.getElementById('classical-rule-logic-surface');
    const nativeCard=card || surface?.querySelector('.classical-result-continuation-card');
    const exact=nativeCard && getIdentity(nativeCard);
    for(const ownerCard of surface?.querySelectorAll('.classical-result-continuation-card') || []) {
      const identity=getIdentity(ownerCard);
      if(!identity)continue;
      for(const continuation of ownerCard.querySelectorAll('[data-classical-result-continuation-kind="exact-result-to-source"], [data-classical-result-continuation-kind="writing-source-edit"]'))
        if(!continuationOwners.has(continuation))continuationOwners.set(continuation,{identity,card:ownerCard});
    }
    if(surface && surface.dataset.compositionResultOrganized!==String(Boolean(exact)))surface.dataset.compositionResultOrganized=String(Boolean(exact));
    let menu=surface?.querySelector('.composition-information-menu');
    if(exact && !menu) {
      menu=doc.createElement('div');menu.className='composition-information-menu';surface.append(menu);
    }
    if(exact) {
      const analysis=host(menu,'analysis','Analysis');
      for(const primary of surface.querySelectorAll('.classical-rule-surface__single-vnc,.classical-rule-surface__single-nnc,.classical-rule-surface__single-result')) {
        // This node was projected by the owner renderer for the native card's
        // exact Result. Preserve that identity when its analysis is demoted.
        for(const note of primary.querySelectorAll('[data-classical-saved-state-capability]')) {
          if(!savedLimitationOwners.has(note))savedLimitationOwners.set(note,exact);
        }
        // These sections and the native card are projections of this same owner Result.
        primary.classList.add('composition-analysis-form');move(primary,analysis);
        const structure=primary.querySelector('[data-classical-result-analysis-disclosure]');
        if(structure && !structure.classList.contains('composition-analysis-structure')) {
          structure.classList.add('composition-analysis-structure');structure.open=true;
        }
      }
      const displayedIdentity=card && getIdentity(card);
      for(const note of surface.querySelectorAll('[data-classical-saved-state-capability]')) {
        if(displayedIdentity && savedLimitationOwners.get(note)===displayedIdentity)move(note,card);
      }
      for(const details of Array.from(surface.children).filter(n=>n.matches('.classical-rule-surface__disclosure')))move(details,analysis);
      const composition=surface.querySelector('.classical-clause-relation-workflow__result');
      if(composition) {
        const same=isCurrentComposition(nativeCard)===true;
        if(composition.dataset.compositionSameResult!==String(same))composition.dataset.compositionSameResult=String(same);
        // A retained composition can differ from the accepted Result after recovery.
        // Keep its actions reachable without presenting it as this Result's analysis.
        move(composition,same ? analysis : host(menu,'other-compositions','Other compositions'));
      }
      analysis.hidden=analysis.children.length===1;
      const copy=surface.querySelector('[data-classical-rule-surface-action="copy-result"]');
      if(copy) {
        let tools=surface.querySelector(':scope > .composition-result-tools');
        if(!tools) {
          tools=doc.createElement('div');tools.className='composition-result-tools';
          tools.setAttribute('aria-label','Result actions');surface.insertBefore(tools,menu);
        }
        move(copy,tools);
        move(surface.querySelector('.classical-rule-surface__action-status'),tools);
      }
      for(const continuation of surface.querySelectorAll('[data-classical-result-continuation-kind="exact-result-to-source"], [data-classical-result-continuation-kind="writing-source-edit"]')) {
        const owner=continuationOwners.get(continuation);
        if(owner?.identity===exact) {
          // The next step belongs beside this exact Result, outside optional
          // Analysis. Move its native control; never copy the captured Result.
          let next=Array.from(nativeCard.children).find(node=>node.dataset.compositionResultContinuation==='true');
          if(!next) {
            next=doc.createElement('div');next.className='composition-result-continuation';
            next.dataset.compositionResultContinuation='true';
            next.setAttribute('role','group');
            nativeCard.append(next);
          }
          const label=continuation.dataset.classicalResultContinuationKind==='writing-source-edit'?'Edit Writing Source':'Continue from this Result';
          if(next.getAttribute?.('aria-label')!==label)next.setAttribute('aria-label',label);
          move(continuation,next);
        }
        else if(owner)move(continuation,owner.card);
      }
      const more=Array.from(menu.children).find(node=>node.dataset.compositionInformation==='more-actions');
      if(more)more.hidden=more.children.length===1;
    }
    const root=doc.getElementById('container-tense-grid');
    const view=root?.querySelector('[data-classical-result-outline-section="view"]');
    const sentence=root?.querySelector('[data-classical-result-outline-section="structure-analysis"]');
    if(view && sentence && menu) {
      // Native view controls outlive the replaceable owner Result surface.
      const options=host(view,'view-options','View options');
      for(const node of Array.from(view.children).filter(n=>n!==options && !n.classList.contains('classical-result-outline__heading')))move(node,options);
      options.hidden=options.children.length===1;

    }
  };
}
