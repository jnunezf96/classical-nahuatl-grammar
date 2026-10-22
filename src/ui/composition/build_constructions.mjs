// Read-only presentation of the existing construction declarations. These
// captions neither admit a Source nor authorize a grammatical operation.
const unitLabels={'vnc-result':'Verbal nuclear clause','nnc-result':'Nominal nuclear clause',
  'particle-result':'Particle','clause-result':'Clause or sentence'};
export function constructionEffects(operation={}){
  const readable=value=>String(value).replace(/-/gu,' ');
  const adds=(operation.changes?.adds||[]).filter(value=>!/^output-kind:|^result-kind:|^unit-kind:/u.test(value));
  const removes=(operation.changes?.removes||[]).filter(value=>!/^output-kind:|^result-kind:|^unit-kind:/u.test(value));
  const units=[...new Set((operation.emits||[]).filter(value=>value.startsWith('unit-kind:'))
    .map(value=>unitLabels[value.slice('unit-kind:'.length)]).filter(Boolean))];
  return [...(units.length?[{label:'Produces',value:units.join(' · ')}]:[]),
    ...(adds.length?[{label:'Adds',value:adds.map(readable).join(' · ')}]:[]),
    ...(removes.length?[{label:'Removes',value:removes.map(readable).join(' · ')}]:[])];
}
export function constructionRequirement(operation={},inputRole='',fallback=''){
  if(operation.availabilityReason==='canonical-result-required')return inputRole==='exact-owner-issued-source'
    ? 'Use a completed Result as Source.' : 'Requires a completed Result.';
  if(operation.availabilityReason==='different-owner-issued-source-required')return 'Requires another Source.';
  // Retain an unfamiliar owner reason instead of inventing a prohibition.
  return fallback;
}
export function createBuildConstructionPresentation(doc){
  const text=(node,value)=>{if(node&&node.textContent!==value)node.textContent=value;};
  const after=(node,anchor)=>{if(node&&anchor&&anchor.nextElementSibling!==node)anchor.after(node);};
  return function refresh(){
    const plan=doc.getElementById('classical-capability-operation-plan');
    const navigator=doc.getElementById('classical-capability-navigator');
    if(!plan||!navigator)return;
    let projection=null;
    try{projection=JSON.parse(doc.getElementById('classical-capability-navigator-frame')?.textContent||'null');}catch{}
    const operations=new Map((projection?.operations||[]).map(operation=>[operation.operationId,operation]));
    const selected=doc.getElementById('classical-capability-navigator-operation');
    const choices=doc.getElementById('classical-capability-operation-choices');
    // Grammar keeps this native status immediately after its editor. Use the
    // same boundary so neither presenter moves the other's settled sections.
    const editorEnd=doc.getElementById('classical-capability-operation-plan-status')||choices||navigator;
    const construction=doc.getElementById('classical-stem-construction-menu');
    if(construction){
      construction.classList.add('composition-disclosure');
      construction.dataset.buildConstructionSection='constructions';
      text(construction.querySelector(':scope > summary'),'Constructions');
      const hint=construction.querySelector(':scope > .classical-rule-control__hint');
      if(hint)hint.dataset.buildConstructionRoutine='true';
      after(construction,editorEnd);
      for(const group of construction.querySelectorAll('optgroup'))
        if(group.label==='From this stem')group.label='Clause conversions';
      doc.getElementById('classical-construction-operation')?.setAttribute('aria-label','Construction');
      doc.getElementById('classical-construction-operation-choices')?.setAttribute('aria-label','Construction');
    }
    const requirements=doc.getElementById('classical-capability-navigator-unavailable');
    if(requirements){
      requirements.classList.add('composition-disclosure');
      requirements.dataset.buildConstructionSection='requirements';
      text(requirements.querySelector(':scope > summary'),'Requirements');
      requirements.setAttribute('aria-label','Requirements for other constructions');
      // This read-only catalogue follows the editor. Its rows keep the exact
      // operation identities and owner reasons; no choice control is moved.
      const controls=doc.getElementById('classical-rule-logic-controls');
      const grid=controls?.querySelector(':scope > .classical-rule-controls-grid')||plan.querySelector(':scope > .classical-rule-controls-grid');
      after(requirements,grid?.parentElement===plan?grid:construction||editorEnd);
      const counts=doc.getElementById('classical-capability-navigator-counts');
      if(counts)counts.dataset.buildConstructionRoutine='true';
      for(const item of requirements.querySelectorAll('[data-classical-capability-operation-id]')){
        const operation=operations.get(item.dataset.classicalCapabilityOperationId);
        if(!operation)continue;
        const current=item.textContent;
        const split=current.lastIndexOf(' — ');
        if(split<0)continue;
        const native=item.dataset.buildConstructionNativeText||current;
        // Native renderers replace these rows; keep exact original copy as
        // observation data while rendering the current declared requirement.
        item.dataset.buildConstructionNativeText=native;
        const boundary=native.lastIndexOf(' — ');
        const reason=constructionRequirement(operation,projection.inputRole,native.slice(boundary+3));
        text(item,`${native.slice(0,boundary)} — ${reason}`);
      }
    }
    const effects=doc.querySelector('[data-composition-disclosure="change-details"]');
    if(effects){
      effects.dataset.buildConstructionSection='effects';
      text(effects.querySelector(':scope > summary'),'Effects');
      const native=effects.querySelector('.classical-capability-operation-plan__facts');
      if(native)native.dataset.buildConstructionRawFacts='true';
      let content=effects.querySelector('[data-build-construction-effects]');
      if(!content){content=doc.createElement('dl');content.dataset.buildConstructionEffects='true';effects.append(content);}
      const rows=constructionEffects(operations.get(selected?.value)||{});
      const signature=JSON.stringify(rows);
      if(content.dataset.signature!==signature){
        content.dataset.signature=signature;
        content.replaceChildren(...rows.map(row=>{const field=doc.createElement('div');
          const label=doc.createElement('dt');label.textContent=row.label;
          const value=doc.createElement('dd');value.textContent=row.value;field.append(label,value);return field;}));
      }
      // A legacy construction has its own native choice account; do not reuse
      // the last navigator operation's effects after switching routes.
      const nativeConstruction=doc.getElementById('classical-construction-operation')?.value||'none';
      effects.hidden=nativeConstruction!=='none'||!selected?.value||!rows.length;
      after(effects,requirements||construction||editorEnd);
    }
    const analysis=doc.querySelector('[data-composition-disclosure="applied-grammar"]');
    if(analysis){
      text(analysis.querySelector(':scope > summary'),'Analysis');
      analysis.dataset.buildConstructionSection='analysis';
      const account=doc.getElementById('classical-applied-grammar-account');
      const labels=account?.querySelectorAll('dt')||[];
      text(labels[0],'Form');text(labels[1],'Structure');
      account?.setAttribute('aria-label','Analysis of the applied form');
      analysis.hidden=account?.dataset.classicalAppliedGrammarStatus!=='owner-issued';
    }
  };
}
