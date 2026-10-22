// Presentation of the existing particle selectors; no grammar is defined here.
const neutral=value=>!value||value==='none';
const available=(control,option)=>!control.disabled&&!control.readOnly&&!option.disabled&&!option.hidden&&!option.parentElement?.hidden&&!option.parentElement?.disabled;
const identity=value=>value.replace(/^(particle|adverbial):/u,'');
const groups={'clause-introducer':'Clause introducers',adjunctor:'Adjunctors',conjunctor:'Conjunctors','adverbial-modifier':'Modifiers in particle sequences',interjection:'Interjections'};

export function collectParticleChoices(presets,first,{owner=null,honorific=null}={}){
  const choices=new Map();
  // The first slot retains the individual selection path and its licensed
  // continuation. Prepared collocations retain their own existing transaction.
  for(const control of [first,presets])for(const option of control?.options||[]){
    if(neutral(option.value)||option.hidden||option.parentElement?.hidden)continue;
    const id=identity(option.value);
    const record={identity:id,control,value:option.value,label:option.textContent.trim(),
      group:groups[option.dataset.classicalParticlePresentationGroup]||option.parentElement?.label||'Particles',
      disabled:!available(control,option)};
    if(!choices.has(id)||(choices.get(id).disabled&&!record.disabled))choices.set(id,record);
  }
  const records=[...choices.values()];
  if(!honorific||honorific.disabled||honorific.hidden||honorific.closest?.('.classical-rule-control')?.hidden
    ||typeof owner?.getClassicalNahuatlParticleEntries!=='function'
    ||typeof owner?.buildClassicalNahuatlParticleHonorificSourceFrame!=='function'
    ||typeof owner?.buildClassicalNahuatlParticleSourceFrame!=='function'
    ||typeof owner?.isClassicalNahuatlParticleSourceFrame!=='function')return records;
  const entries=new Map(owner.getClassicalNahuatlParticleEntries().map(entry=>[entry.id,entry]));
  const aliases=new Set();
  for(const record of records){
    const entry=entries.get(record.identity);
    if(record.disabled||entry?.functionScope!=='honorificized')continue;
    const source=owner.buildClassicalNahuatlParticleHonorificSourceFrame({targetId:record.identity});
    if(source?.authorizationStatus!=='authorized'||source.operation!=='attach-tzin-to-final-particle-member'
      ||!source.baseParticleSourceFrames?.length
      ||!source.baseParticleSourceFrames.every(frame=>owner.isClassicalNahuatlParticleSourceFrame(frame)))continue;
    const segments=entry.formulaSegments?.slice(0,-1);
    const bases=records.filter(candidate=>{
      if(candidate.disabled)return false;
      if(source.hostKind==='single-particle')return candidate.identity===source.baseParticleSourceFrames[0].particleId;
      const base=entries.get(candidate.identity);
      return source.hostKind==='collocation-final-member'&&base?.functionScope==='collocation'
        &&entry.formulaSegments?.at(-1)==='tzin'&&segments.length===base.formulaSegments?.length
        &&segments.every((segment,index)=>segment===base.formulaSegments[index]);
    });
    if(bases.length!==1)continue;
    const base=bases[0],baseSource=owner.buildClassicalNahuatlParticleSourceFrame(base.identity);
    if(!owner.isClassicalNahuatlParticleSourceFrame(baseSource)
      ||owner.buildClassicalNahuatlParticleHonorificSourceFrame({particleSourceFrame:baseSource})?.authorizationStatus!=='authorized')continue;
    // Keep the native preset for restoration. Its display aliases the exact
    // eligible neutral material; the existing On/Off control owns formation.
    (base.honorificPresetAliases??=[]).push(record.identity);aliases.add(record.identity);
  }
  return records.filter(record=>!aliases.has(record.identity));
}
export function selectedParticleChoice(choices,presets,first){
  const id=!neutral(presets?.value)?presets.value:identity(first?.value||'');
  return choices.find(choice=>choice.identity===id||choice.honorificPresetAliases?.includes(id))||null;
}
function currentParticleSelection(choices,presets,first,nativeControls=[]){
  const primary=!neutral(presets?.value)?presets:!neutral(first?.value)?first:null;
  if(primary)return {choice:selectedParticleChoice(choices,presets,first),
    coordinate:{id:primary.id,value:primary.value},fallback:false};
  // Make can recreate the builder's empty first slot while retaining the
  // actual outer particle/adverbial choice. Read that offered native coordinate.
  for(const control of nativeControls){
    if(!control||neutral(control.value))continue;
    const option=Array.from(control.options||[]).find(option=>option.value===control.value);
    if(!option||!available(control,option))continue;
    const id=identity(option.value),existing=choices.find(choice=>choice.identity===id
      ||choice.honorificPresetAliases?.includes(id));
    return {choice:{...existing,identity:existing?.identity||id,control,value:option.value,
      label:existing?.label||option.textContent.trim(),
      group:existing?.group||groups[option.dataset.classicalParticlePresentationGroup]||option.parentElement?.label||'Particles',
      disabled:false},coordinate:{id:control.id,value:option.value},fallback:true};
  }
  return {choice:null,coordinate:null,fallback:false};
}
export function hasParticleChoice(control){
  return Boolean(control&&!control.disabled&&[...control.options].some(option=>!neutral(option.value)&&available(control,option)));
}

export function createParticleChoices(doc){
  let records=[],representedCoordinate=null;
  const currentSelection=()=>currentParticleSelection(records,
    doc.getElementById('classical-built-in-particle'),doc.getElementById('classical-particle-slot-0'),
    ['classical-rule-logic-sentence-particle','classical-rule-logic-sentence-adverbial'].map(id=>doc.getElementById(id)));
  const text=(node,value)=>{if(node&&node.textContent!==value)node.textContent=value;};
  function refresh(){
    const menu=doc.getElementById('classical-particle-menu');
    const presets=doc.getElementById('classical-built-in-particle');
    const first=doc.getElementById('classical-particle-slot-0');
    if(!menu||!presets||!first)return;
    let field=menu.querySelector(':scope > [data-workspace-particle-chooser]');
    if(!field){
      field=doc.createElement('label');field.className='classical-rule-control';field.dataset.workspaceParticleChooser='true';
      const label=doc.createElement('span');label.className='classical-rule-control__label';label.textContent='Particles';
      const select=doc.createElement('select');select.id='classical-sentence-particles';select.className='classical-whole-canvas-choice__control';select.setAttribute('aria-label','Particles');
      // Browsing this projection is inert; only the forwarded native change
      // enters the existing construction-position and grammar handlers.
      select.dataset.classicalChoiceGroup='true';
      select.addEventListener('change',event=>{
        event.stopPropagation();
        const record=records.find(item=>`${item.control.id}:${item.value}`===select.value);
        const current=currentSelection().coordinate;
        const sameCoordinate=current&&representedCoordinate
          &&current.id===representedCoordinate.id&&current.value===representedCoordinate.value;
        if(!record&&!sameCoordinate){refresh();return;}
        const native=doc.getElementById(record?.control.id||representedCoordinate?.id||presets.id);
        const option=[...native?.options||[]].find(item=>record ? item.value===record.value : neutral(item.value));
        const value=option?.value;
        if((select.value&&!record)||!native||!option||!available(native,option)||select.value===select.dataset.selectedValue){refresh();return;}
        native.value=value;
        native.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));
        refresh();
      });
      const tools=doc.createElement('div');tools.className='classical-whole-canvas-choice-grid classical-searchable-choices';tools.dataset.classicalCompactChoiceTools='true';
      tools.append(select);field.append(label,tools);menu.append(field);
    }
    const honorific=doc.getElementById('classical-rule-logic-sentence-particle-honorific');
    records=collectParticleChoices(presets,first,{owner:doc.defaultView,honorific});
    const selection=currentSelection(),selected=selection.choice;
    representedCoordinate=selected?selection.coordinate:null;
    if(selection.fallback&&selected){
      const index=records.findIndex(record=>record.identity===selected.identity);
      if(index<0)records.push(selected);else records[index]=selected;
    }
    const select=field.querySelector('select');
    const signature=JSON.stringify(records.map(({control,value,label,group,disabled})=>[control.id,value,label,group,disabled]));
    if(select.dataset.signature!==signature){
      select.dataset.signature=signature;
      const none=doc.createElement('option');none.value='';none.textContent='none';select.replaceChildren(none);
      const hosts=new Map();
      for(const record of records){
        let host=hosts.get(record.group);
        if(!host){host=doc.createElement('optgroup');host.label=record.group;hosts.set(record.group,host);select.append(host);}
        const option=doc.createElement('option');option.value=`${record.control.id}:${record.value}`;option.textContent=record.label;option.disabled=record.disabled;
        option.dataset.nativeParticleControl=record.control.id;option.dataset.nativeParticleValue=record.value;
        host.append(option);
      }
    }
    select.value=selected?`${selected.control.id}:${selected.value}`:'';
    select.dataset.selectedValue=select.value;
    select.disabled=!records.some(record=>!record.disabled);
    for(const control of [presets,first]){
      const nativeField=control.closest(control===presets?'#classical-built-in-particles':'label');
      if(nativeField)nativeField.dataset.workspaceParticleDuplicate='true';
    }
    for(const control of menu.querySelectorAll('#classical-particle-matrix-slots select:not([data-classical-compact-choice-display])')){
      if(control===first)continue;
      const nativeField=control.closest('label');
      // A prepared combination already displays its selected components once.
      // Unfilled licensed continuations remain available. Selecting its first
      // individual particle again restarts the native builder for adjustment.
      const covered=selected?.control===presets&&!neutral(control.value)&&control.dataset.combinationPartIndex;
      nativeField.dataset.workspaceParticleExtra=covered?'covered':hasParticleChoice(control)?'choice':'fixed';
      const label=nativeField.querySelector('.classical-particle-combination-builder__field-label');
      if(control.dataset.combinationPartIndex)text(label,'Next particle');
    }
    const status=doc.getElementById('classical-particle-matrix-status');
    if(status)status.dataset.workspaceParticleNotice=status.textContent.startsWith('Choose a licensed next particle.')?'needed':'repeated';
    const matrix=doc.getElementById('classical-particle-matrix');
    if(matrix)matrix.dataset.workspaceParticleExtras=matrix.querySelector('[data-workspace-particle-extra="choice"]')||status?.dataset.workspaceParticleNotice==='needed'?'choices':'none';
    if(honorific){
      honorific.dataset.compositionChoiceMirror='true';
      honorific.setAttribute('tabindex','-1');
      honorific.setAttribute('aria-hidden','true');
      let buttons=honorific.parentElement.querySelector('[data-workspace-particle-honorific]');
      if(!buttons){
        buttons=doc.createElement('div');buttons.className='composition-choice-buttons';buttons.dataset.workspaceParticleHonorific='true';buttons.setAttribute('role','group');buttons.setAttribute('aria-label','Honorific');
        for(const [value,label] of [[false,'Off'],[true,'On']]){
          const button=doc.createElement('button');button.type='button';button.textContent=label;
          button.dataset.classicalChoiceGroup='true';button.dataset.honorificValue=String(value);
          button.addEventListener('click',()=>{if(honorific.disabled||honorific.checked===value)return;honorific.checked=value;honorific.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));refresh();});
          buttons.append(button);
        }
        honorific.after(buttons);
      }
      for(const button of buttons.children){button.disabled=honorific.disabled;button.setAttribute('aria-pressed',String(honorific.checked=== (button.dataset.honorificValue==='true')));}
    }
  }
  return refresh;
}
