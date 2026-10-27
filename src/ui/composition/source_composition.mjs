const relationalHomes = new WeakMap();
const relationalAnalysisHomes = new WeakMap();
const sourceObjectHomes = new WeakMap();
const firstObjectHomes = new WeakMap();
// Keep examples within their native guide so family visibility, native choice
// collection and existing listeners remain authoritative. No controls are copied.
export function organizeSourceComposition(doc) {
  // Raw relational declarations constitute Source. Keep the original controls
  // before its explicit commit action, including while Build is waiting.
  // Exact Result bindings own editable Build selections and retain that home.
  const authority=doc.getElementById('classical-relational-nnc-authority');
  const status=doc.getElementById('classical-source-commit-status');
  const selected=doc.getElementById('classical-nnc-source-example')?.selectedOptions?.[0];
  if(authority && status) {
    if(!relationalHomes.has(authority))relationalHomes.set(authority,
      {parent:authority.parentElement,next:authority.nextElementSibling});
    const sourceBearing=Boolean(selected?.dataset?.classicalRelationalStemId)
      && authority.dataset.classicalRelationalResultBinding!=='exact-owner-issued-result';
    if(sourceBearing) {
      const sourceParts=doc.getElementById('classical-source-parts');
      const commit=doc.getElementById('verb-entry-apply')?.closest('.classical-source-parts__commit-row');
      // The live status is deliberately outside Choose/edit Source. Raw
      // analysis stays with its editor and the original explicit Apply action.
      const anchor=sourceParts?.contains(commit) ? commit : sourceParts?.contains(status) ? status : null;
      if(anchor) {
        if(authority.nextElementSibling!==anchor)anchor.before(authority);
      } else if(sourceParts && authority.parentElement!==sourceParts)sourceParts.append(authority);
    } else {
      const home=relationalHomes.get(authority);
      if(authority.parentElement!==home.parent)home.parent.insertBefore(authority,
        home.next?.parentElement===home.parent?home.next:null);
    }
  }
  // These are the same source-analysis controls used by the VNC owner.
  // A raw derived relational source must not consume their values invisibly.
  const rawDerived=authority?.dataset.classicalRelationalRawVerbalSource==='true';
  for(const id of ['classical-rule-logic-class','classical-rule-logic-valence','classical-rule-logic-nonactive-family']) {
    const field=doc.getElementById(id)?.closest('label');
    if(!field || !authority)continue;
    if(!relationalAnalysisHomes.has(field))relationalAnalysisHomes.set(field,
      {parent:field.parentElement,next:field.nextElementSibling,hidden:field.hidden});
    if(rawDerived) {
      if(field.parentElement!==authority)authority.append(field);
      if(id!=='classical-rule-logic-nonactive-family')field.hidden=false;
    } else {
      const home=relationalAnalysisHomes.get(field);
      // Restore only the field this organizer borrowed into the relational
      // authority. Other grammar owners may have moved the same control.
      if(field.parentElement===authority && field.parentElement!==home.parent) {
        home.parent.insertBefore(field,home.next?.parentElement===home.parent?home.next:null);
        field.hidden=home.hidden;
        field.setAttribute("aria-hidden",String(field.hidden));
      }
    }
  }
  // The first specific object is part of the pending Source just like its
  // additional objects. Keep the same field/listeners available before Apply;
  // committed and exact-result Build choices retain their original home.
  const firstObject=doc.getElementById('classical-rule-logic-object')?.closest('label');
  const sourceParts=doc.getElementById('classical-source-parts');
  if(firstObject && sourceParts) {
    if(!firstObjectHomes.has(firstObject))firstObjectHomes.set(firstObject,
      {parent:firstObject.parentElement,next:firstObject.nextElementSibling});
    const pendingSpecific=doc.documentElement?.dataset.classicalBasalUnit==='vnc'
      && sourceParts.dataset.classicalSourceCommitState==='pending'
      && doc.getElementById('classical-rule-logic-valence')?.value==='specific-projective';
    if(pendingSpecific) {
      const commit=doc.getElementById('verb-entry-apply')?.closest('.classical-source-parts__commit-row');
      if(sourceParts.contains(commit)) {
        if(firstObject.nextElementSibling!==commit)commit.before(firstObject);
      } else if(firstObject.parentElement!==sourceParts)sourceParts.append(firstObject);
      firstObject.hidden=false;firstObject.setAttribute('aria-hidden','false');
      // The old committed clause may have had no object. Its disabled state
      // must not freeze the existing person/number inventory of this new Source.
      const control=doc.getElementById('classical-rule-logic-object');
      control.disabled=false;control.setAttribute('aria-disabled','false');
      firstObject.setAttribute('aria-disabled','false');
      firstObject.dataset.classicalControlAvailability='enabled';
      firstObject.dataset.classicalRuleLogicCurrentVisibility='visible';
      firstObject.dataset.classicalAuthorityUserInput='required';
      firstObject.dataset.classicalRuleLogicGate='pending-source-specific-object';
    } else {
      const home=firstObjectHomes.get(firstObject);
      if(firstObject.parentElement!==home.parent)home.parent.insertBefore(firstObject,
        home.next?.parentElement===home.parent?home.next:null);
    }
  }
  const sourceObjects=doc.getElementById('classical-source-object-details');
  if(sourceObjects && status) {
    if(!sourceObjectHomes.has(sourceObjects))sourceObjectHomes.set(sourceObjects,
      {parent:sourceObjects.parentElement,next:sourceObjects.nextElementSibling});
    const sourceParts=doc.getElementById('classical-source-parts');
    if(doc.documentElement?.dataset.classicalBasalUnit==='vnc' && sourceParts) {
      // Stay inside the existing Source editor when its disclosure closes.
      if(sourceObjects.parentElement!==sourceParts)sourceParts.append(sourceObjects);
    } else {
      const home=sourceObjectHomes.get(sourceObjects);
      if(sourceObjects.parentElement!==home.parent)home.parent.insertBefore(sourceObjects,
        home.next?.parentElement===home.parent?home.next:null);
    }
  }
  for(const family of ['vnc','nnc']) {
    const guide=doc.getElementById(`classical-${family}-source-guide`);
    if(!guide)continue;
    const keys=[`classical-${family}-source-${family==='vnc'?'stem-choices':'example'}`,
      `classical-${family}-source-guide-input-guidance`];
    const secondary=keys.map(key=>Array.from(guide.children).find(node=>
      node.dataset.compositionDisclosure===key)).filter(Boolean);
    const tail=Array.from(guide.children).slice(-secondary.length);
    if(secondary.every((node,index)=>node===tail[index]))continue;
    for(const node of secondary)guide.append(node);
  }
}
