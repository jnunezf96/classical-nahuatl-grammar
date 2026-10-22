// Saved identities and native choices remain authoritative. These projections
// only help a person inspect them before the existing Use or Make action.
const sourceReaders=new WeakMap(),routeReaders=new WeakMap();
export const setSourceCandidatePresentation=(root,reader)=>{if(root)sourceReaders.set(root,reader);};
export const setRouteChoicePresentation=(root,reader)=>{if(root)routeReaders.set(root,reader);};
export const readRouteChoicePresentation=root=>routeReaders.get(root)?.()||null;
const readSourceCandidates=root=>sourceReaders.get(root)?.()||null;
const labels=values=>[...new Set((values||[]).map(value=>/^nnc-/u.test(value)?'Noun':/^vnc-/u.test(value)?'Verb':value==='particle'?'Particle':/clause|sentence/u.test(value)?'Clause':'').filter(Boolean))];
function offeredOperationShape(operation) {
  if(operation?.availabilityStatus!=='available')return null;
  const inputs=labels(operation.sharedUnitKinds?.length?operation.sharedUnitKinds:operation.matchedSourceUnitKinds);
  const outputs=labels(operation.outputUnitKinds);
  return inputs.length===1&&outputs.length===1?{inputs,outputs}:null;
}
export function projectOfferedOperationShape(runtime,navigator,id) {
  if(runtime.isClassicalGrammarApplicationCapabilityNavigator?.(navigator)!==true)return null;
  return offeredOperationShape(navigator.operations?.find(item=>item.operationId===id));
}
export function projectOfferedOperationShapes(runtime,navigator) {
  // One current owner check covers this synchronous presentation read. Nothing
  // is cached across reads, Source changes or a later explicit Make.
  if(runtime.isClassicalGrammarApplicationCapabilityNavigator?.(navigator)!==true)return null;
  return navigator.operations.map(operation=>({operationId:operation.operationId,
    shape:offeredOperationShape(operation)}));
}
export function projectSavedSourceCandidate(runtime,node,exact,project,projectTree) {
  const capture=runtime.captureClassicalGrammarApplicationResult?.(exact,'source-candidate-presentation');
  if(!node?.nodeId||runtime.isClassicalGrammarApplicationResultCapture?.(capture,'source-candidate-presentation')!==true||capture.canonicalResult!==exact)return null;
  const projection=project(exact);
  const tree=projection&&projectTree(runtime,projection.canonicalResult,project,'Result');
  if(!projection?.surface||!tree)return null;
  return Object.freeze({nodeId:node.nodeId,sequence:node.sequence,operationId:node.operationId,surface:projection.surface,exact,tree});
}
const treeText=tree=>tree?[tree.surface,...tree.facts.flat(),...tree.endpoints.map(e=>[e.label,e.category,e.lane].join(' ')),...tree.children.map(treeText)].join(' '):'';
const fold=text=>String(text||'').normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase();
export function filterSavedChoices(records,query,selected) {
  const words=fold(query).trim().split(/\s+/u).filter(Boolean);
  return records.filter(record=>record.nodeId===selected||words.every(word=>fold([record.surface,record.label,record.operationLabel,record.sequence,treeText(record.tree)].join(' ')).includes(word)));
}
export function resolveCandidateSelection(model,current,id,options) {
  if(!model?.sourceScope||model.sourceScope!==current?.sourceScope||model.bindingScope!==current.bindingScope
    ||model.operation!==current.operation||model.bindingId!==current.bindingId||model.role!==current.role)return null;
  const option=Array.from(options||[]).find(item=>item.value===id);
  return option&&!option.disabled&&!option.hidden?model.candidates.find(item=>item.nodeId===id)||null:null;
}
// Find filters copies only. Native option IDs, selected values and availability
// remain untouched; typing never dispatches a native change.
export function createSavedFind(doc,select,label) {
  const host=doc.createElement('div');host.className='composition-saved-find';
  const input=doc.createElement('input');input.type='search';input.placeholder=label;input.setAttribute('aria-label',label);
  const count=doc.createElement('span');count.className='composition-saved-find__count';count.setAttribute('role','status');
  host.append(input,count);select.before(host);
  let records=[],native=null;
  const refresh=(selected=select.value)=>{
    const shown=filterSavedChoices(records,input.value,selected);
    const ids=new Set(shown.map(record=>record.nodeId));
    const offered=Array.from((native||select).options).filter(option=>!option.value||ids.has(option.value));
    const signature=offered.map(option=>`${option.value}|${option.textContent}|${option.disabled}`).join('\n');
    if(select.dataset.savedFindOptions!==signature){select.dataset.savedFindOptions=signature;select.replaceChildren(...offered.map(option=>option.cloneNode(true)));}
    if(select.value!==selected)select.value=selected;
    const text=`${shown.length}/${records.length}`;if(count.textContent!==text)count.textContent=text;
    if(input.disabled!==select.disabled)input.disabled=select.disabled;
  };
  input.addEventListener('input',()=>refresh());select.addEventListener('change',()=>refresh());
  return {input,refresh:update=>{
    if(update){records=update.records;native=update.native||null;}
    refresh(update?.selected??select.value);
  }};
}
export function createCandidateDesign(doc,renderTree,readContext) {
  let model=null,query='';
  return function refreshCandidates() {
    const root=doc.getElementById('classical-workbench'),field=doc.getElementById('classical-capability-required-result-field');
    const native=doc.getElementById('classical-capability-required-result');
    const current=readSourceCandidates(root),scope=readContext(root);
    const valid=current&&scope?.sourceScope===current.sourceScope&&scope.bindingScope===current.bindingScope&&scope.operation===current.operation&&scope.bindingId===current.bindingId;
    let board=field?.querySelector('[data-composition-source-candidates]');
    if(!valid||field?.hidden||!native||native.disabled){if(board)board.hidden=true;model=null;return;}
    if(!board) {
      board=doc.createElement('div');board.className='composition-source-candidates';board.dataset.compositionSourceCandidates='true';
      const find=doc.createElement('input');find.type='search';find.placeholder='Find Results';find.setAttribute('aria-label','Find Results');
      const count=doc.createElement('span');count.className='composition-saved-find__count';count.setAttribute('role','status');
      const cards=doc.createElement('div');cards.className='composition-candidate-cards';cards.setAttribute('role','group');cards.setAttribute('aria-label','Compatible Result candidates');
      board.append(find,count,cards);(native.closest('label')||native).after(board);
      find.addEventListener('input',()=>{query=find.value;refreshCandidates();});
      native.addEventListener('change',refreshCandidates);
    }
    if(!model||model.sourceScope!==current.sourceScope||model.bindingScope!==current.bindingScope||model.operation!==current.operation||model.bindingId!==current.bindingId||model.role!==current.role){query='';board.querySelector('input').value='';}
    model=current;board.hidden=false;
    const shown=filterSavedChoices(current.candidates,query,native.value);
    const cards=board.querySelector('.composition-candidate-cards');
    const signature=shown.map(record=>record.nodeId+'|'+record.operationLabel).join('\n');
    if(cards.candidateModel!==current||cards.dataset.signature!==signature) {
      cards.candidateModel=current;cards.dataset.signature=signature;cards.replaceChildren();
      for(const candidate of shown) {
        const card=doc.createElement('button');card.type='button';card.className='composition-candidate-card';card.dataset.compositionCandidateNode=candidate.nodeId;
        const build=doc.createElement('span');build.className='composition-candidate-card__build';build.textContent=`${candidate.sequence} · ${candidate.operationLabel}`;
        card.setAttribute('aria-label',[`Build ${candidate.sequence}`,candidate.surface,...candidate.tree.facts.filter(([key])=>['Contact','Order','Marker'].includes(key)).map(([key,value])=>`${key}: ${value}`)].join(' · '));card.append(build,renderTree(candidate.tree,[]));
        card.addEventListener('click',()=>{
          const live=readSourceCandidates(root),state=readContext(root);
          const chosen=resolveCandidateSelection(current,{...state,role:live?.role},candidate.nodeId,native.options);
          if(!chosen||!live?.candidates.some(item=>item.exact===chosen.exact&&item.nodeId===chosen.nodeId)||!live.isCurrentCandidate(chosen)||native.disabled||field.hidden)return;
          native.value=chosen.nodeId;native.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));refreshCandidates();
        });cards.append(card);
      }
    }
    for(const card of cards.children)card.setAttribute('aria-pressed',String(card.dataset.compositionCandidateNode===native.value));
    const count=`${shown.length}/${current.candidates.length}`;const counter=board.querySelector('[role="status"]');if(counter.textContent!==count)counter.textContent=count;
  };
}
