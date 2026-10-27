// Path selection is presentation only. Resolve saved identities, never spelling.
import {getCompositionParts} from './composition_selection.mjs';
import {createSavedFind} from './candidate_design.mjs?v=20261021-route-shapes-1';
const nativeHistoryPresentation = new WeakMap();
export function setPathHistoryPresentation(root, state) { nativeHistoryPresentation.set(root, state); }
export function resolvePathTargets(runtime, whole, records, anchorId, project = null) {
  const parts=getCompositionParts(whole,node=>runtime.isClassicalNahuatlSupplementationFrame?.(node)===true);
  if(!parts.length && whole && records.some(record=>record.nodeId===anchorId && record.capture?.canonicalResult===whole)) parts.push({node:whole,path:[],label:'Whole sentence'});
  const anchor=records.find(record=>record.nodeId===anchorId);
  return parts.map(part=>{
    const exact=runtime.getClassicalNahuatlSupplementationClauseSourceFrame?.(part.node)||part.node;
    const matches=records.filter(record=>record.capture?.canonicalResult===exact);
    const preferred=matches.find(record=>record.nodeId===anchorId);
    const sameBranch=matches.filter(record=>record.branchId===anchor?.branchId);
    const chosen=preferred || (sameBranch.length===1 ? sameBranch[0] : matches.length===1 ? matches[0] : null);
    let projection=null;
    try{projection=typeof project==='function'?project(exact):null;}catch{}
    const writtenSurface=projection?.canonicalResult===exact&&typeof projection.surface==='string'
      ? projection.surface : '';
    return {...part,exact,writtenSurface,nodeId:chosen?.nodeId||'',reason:matches.length>1?'This part has multiple saved builds. Choose the build directly.':'This part is not a saved build yet.'};
  });
}
export function createPathPresentation(doc) {
  let anchorId='',chosenId='',roleKey='[]',initialized=false;
  let buildFind=null,compareFind=null,compareCopy=null;
  return function refreshPath(){
    const runtime=doc.defaultView;
    const root=doc.getElementById('classical-grammar-workspace-history');
    const native=doc.getElementById('classical-grammar-workspace-history-node');
    const body=root?.querySelector('.classical-grammar-workspace-history__body');
    if(!root||!native||!body)return;
    const state=nativeHistoryPresentation.get(root);
    if(!state)return;
    const snapshot=state.snapshot;
    const records=state.records;
    let ui=body.querySelector('.path-selection');
    if(!ui) {
      ui=doc.createElement('div');ui.className='path-selection';
      ui.innerHTML='<label class="path-build-label">Build<select aria-label="Build to work with"></select></label><div class="path-targets" role="group" aria-label="Which part to work with"></div><p class="path-target-caption"></p><p class="path-target-note"></p>';
      body.prepend(ui);native.closest('label').hidden=true;
      buildFind=createSavedFind(doc,ui.querySelector('select'),'Find builds');
      ui.querySelector('select').addEventListener('change',event=>{
        anchorId=event.target.value;chosenId=anchorId;roleKey='[]';native.value=chosenId;
        native.dispatchEvent(new runtime.Event('change',{bubbles:true}));refreshPath();
      });
      const actions=body.querySelector('.classical-grammar-workspace-history__actions');
      const compare=doc.getElementById('classical-grammar-workspace-history-compare');
      const comparisonSelect=doc.getElementById('classical-grammar-workspace-history-compare-node');
      compareCopy=comparisonSelect.cloneNode(false);compareCopy.removeAttribute('id');compareCopy.setAttribute('aria-label','Build to compare');
      comparisonSelect.before(compareCopy);comparisonSelect.hidden=true;
      compareFind=createSavedFind(doc,compareCopy,'Find comparison builds');
      compareCopy.addEventListener('change',()=>{comparisonSelect.value=compareCopy.value;comparisonSelect.dispatchEvent(new runtime.Event('change',{bubbles:true}));refreshPath();});
      const comparison=doc.createElement('details');comparison.className='path-compare';
      const summary=doc.createElement('summary');summary.textContent='Compare with another build';comparison.append(summary,comparisonSelect.closest('label'),compare);body.append(comparison);
      const undo=doc.getElementById('classical-grammar-workspace-history-undo');
      const back=doc.createElement('div');back.className='path-back';back.append(undo);actions.after(back);
    }
    if(!initialized){anchorId=snapshot.currentNodeId||native.value;chosenId=anchorId;native.value=chosenId;initialized=true;native.dispatchEvent(new runtime.Event('change',{bubbles:true}));}
    // Native actions may change the selected build; a target selection does not.
    if(native.value!==chosenId){anchorId=native.value;chosenId=native.value;roleKey='[]';}
    const build=ui.querySelector('select');
    const signature=Array.from(native.options).map(option=>option.value+'|'+option.textContent).join('\n');
    if(build.dataset.options!==signature){build.dataset.options=signature;build.replaceChildren(...Array.from(native.options,option=>option.cloneNode(true)));}
    if(build.value!==anchorId)build.value=anchorId;if(build.disabled!==native.disabled)build.disabled=native.disabled;
    buildFind.refresh({native,selected:anchorId,records:Array.from(native.options).filter(option=>option.value).map(option=>({nodeId:option.value,label:option.textContent}))});
    const comparisonSelect=doc.getElementById('classical-grammar-workspace-history-compare-node');
    if(compareCopy.disabled!==comparisonSelect.disabled)compareCopy.disabled=comparisonSelect.disabled;
    // Recreate from native identities before restoring its selection. Find only
    // hides copied rows, and never changes either accepted History selection.
    compareFind.refresh({native:comparisonSelect,selected:comparisonSelect.value,records:Array.from(comparisonSelect.options).filter(option=>option.value).map(option=>({nodeId:option.value,label:option.textContent}))});
    const whole=records.find(record=>record.nodeId===anchorId)?.capture?.canonicalResult;
    const targets=state.targets.find(entry=>entry.nodeId===anchorId)?.parts||[];
    const target=targets.find(part=>JSON.stringify(part.path)===roleKey);
    const tray=ui.querySelector('.path-targets');
    const targetSignature=anchorId+'|'+roleKey+'|'+targets.map(part=>JSON.stringify(part.path)+':'+part.nodeId).join('|');
    if(tray.dataset.signature!==targetSignature){
      tray.dataset.signature=targetSignature;tray.replaceChildren();
      for(const part of targets){
        const button=doc.createElement('button');button.type='button';button.textContent=part.label;
        button.setAttribute('aria-pressed',String(JSON.stringify(part.path)===roleKey));
        button.disabled=!part.nodeId;button.title=part.nodeId?'':part.reason;
        button.addEventListener('click',()=>{roleKey=JSON.stringify(part.path);chosenId=part.nodeId;native.value=chosenId;native.dispatchEvent(new runtime.Event('change',{bubbles:true}));refreshPath();});tray.append(button);
      }
    }
    const caption=ui.querySelector('.path-target-caption');
    const captionText=target?`${target.label}: ${target.writtenSurface||'Written form unavailable.'}`:'Choose a saved build.';
    if(caption.textContent!==captionText)caption.textContent=captionText;
    const note=ui.querySelector('.path-target-note');
    const noteText=targets.some(part=>!part.nodeId)?'Parts without a saved build are unavailable here.':'';
    if(note.textContent!==noteText)note.textContent=noteText;if(note.hidden!==!noteText)note.hidden=!noteText;
    const selectedCapture=records.find(record=>record.nodeId===native.value)?.capture;
    const writingTarget=selectedCapture?.operationId==='orthography:transcription'
      && runtime.isClassicalGrammarApplicationResultCapture?.(selectedCapture)===true
      && runtime.isClassicalNahuatlTranscriptionFrame?.(selectedCapture.canonicalResult)===true
      && runtime.isClassicalNahuatlTranscriptionSourceFrame?.(selectedCapture.canonicalResult.sourceFrame)===true;
    const labels={undo:'Undo build',fork:'Branch from this',continue:writingTarget?'Edit Writing Source':'Use as Source',supply:'Add to pending sentence',compare:'Compare'};
    for(const [id,label] of Object.entries(labels)){
      const button=doc.getElementById('classical-grammar-workspace-history-'+id);if(!button)continue;
      if(button.textContent!==label)button.textContent=label;
      if(id!=='undo'&&!target?.nodeId&&!button.disabled)button.disabled=true;
      if(id==='supply'&&button.hidden!==button.disabled)button.hidden=button.disabled;
      const title=id==='undo'?'Return to the previous accepted build; this does not undo pending choices.'
        :id==='fork'?'Start a new branch here; the accepted sentence stays unchanged.'
        :id==='continue'?writingTarget?'Edit this saved Writing Source.':'Restore this saved Result as the next Source.'
        :id==='supply'?'Fill the pending sentence’s required role with this saved Result.'
        :'Compare the selected part with another saved build.';
      if(button.title!==title)button.title=title;
    }
  };
}
