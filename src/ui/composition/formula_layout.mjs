import {clauseDecisionSlot,CLAUSE_CHOICE_LABELS,CLAUSE_CHOICE_ORDER} from './clause_composition.mjs?v=20261023-4&andrewsRelease=20261024-1';
import {declaredChoiceAddress,BUILD_SLOT_LABELS,BUILD_SLOT_ORDER} from './build_choice_catalog.mjs?v=20261023-all-build-2&andrewsRelease=20261024-1';
import {ownerChoiceRoots,registerOwnerChoicePortal,releaseOwnerChoicePortal} from './owner_choice_roots.mjs?v=20261023-core-1';
// Andrews §§4.3–4.5. This is a layout of existing native collectors, never a
// formula for execution. Each collector retains its controls and closures.
export function arrangeNuclearClauseSlots(doc,organizer,family,entries) {
  let clause=organizer.querySelector(':scope > [data-build-formula]');
  if(!clause){
    clause=doc.createElement('section');clause.dataset.buildFormula=family;
    clause.setAttribute('aria-label',`${family.toUpperCase()} formula slots`);
    const pattern=doc.createElement('p');pattern.className='composition-slot-pattern';
    pattern.dataset.buildFormulaPattern=family;pattern.setAttribute('aria-label','Slot pattern');
    pattern.textContent=family==='vnc'?'#person + valence(STEM)tense + number#':'#person + state(STEM)number#';
    clause.append(pattern);organizer.prepend(clause);
  }
  function part(parent,id,label,relation=''){
    let node=parent.querySelector(`:scope > [data-build-formula-part="${id}"]`);
    if(!node){
      node=doc.createElement('section');node.dataset.buildFormulaPart=id;
      node.className='composition-formula-slot';node.setAttribute('aria-label',label);
      if(id!=='subject'){
        const title=doc.createElement(id==='core'?'h4':'h3');title.className='composition-formula-slot__heading';title.textContent=label;
        const meta=doc.createElement('span');meta.className='composition-formula-slot__relation';meta.textContent=relation;
        title.append(meta);node.append(title);
      }
      parent.append(node);
    }
    return node;
  }
  const subject=part(clause,'subject','Subject');
  const predicate=part(clause,'predicate','Predicate',family==='vnc'?'Core + tense':'State + nounstem');
  const core=family==='vnc'?part(predicate,'core','Core','Valence + verbstem'):null;
  const targets=family==='vnc'?{subject,valence:core,verbstem:core,tense:predicate,sentence:organizer}
    :{subject,state:predicate,nounstem:predicate,predicate,sentence:organizer};
  const order=family==='vnc'?['subject','valence','verbstem','tense','sentence']:['subject','state','nounstem','predicate','sentence'];
  for(const entry of [...entries].sort((a,b)=>order.indexOf(a.kind)-order.indexOf(b.kind))){
    const parent=entry.numberOnly?subject:targets[entry.kind];
    const shared=['verbstem','nounstem'].includes(entry.kind)&&!entry.numberOnly&&entry.wrapper.parentElement?.dataset.buildUnifiedStem!==undefined?entry.wrapper.parentElement:null;
    const placement=shared||entry.wrapper;
    if(parent&&placement.parentElement!==parent)parent.append(placement);
    entry.wrapper.dataset.buildFormulaSlot=entry.kind;
    if(entry.kind==='nounstem')entry.wrapper.dataset.buildFormulaNumberOnly=String(Boolean(entry.numberOnly));
  }
  // The old presentation buckets may be present from a session model reload.
  // Only remove empty wrappers; never discard native content or owner fields.
  for(const bucket of organizer.querySelectorAll(':scope > [data-choices-native-bucket]'))
    if(!bucket.querySelector('select,input,button,details'))bucket.remove();
  return clause;
}

// Explicit presentation addresses, not stem identities or grammatical licences.
// §5.5.1 locates voice/aspect in STEM; §§20/23–29 describe these stem formations.
export const STEM_CHOICE_SECTIONS=Object.freeze({
  requestedDerivation:'23.1',derivationOptionId:'24–26',
  requestedVoice:'5.5.1;21.1;22',voice:'5.5.1;21.1;22',nonactiveOptionId:'20.1',sourceNonactiveOptionId:'20.1',
  stemFormation:'14',
  frequentativeRepetitions:'27.1',frequentativeScope:'27',frequentativeInitialITreatment:'27',
  'compound-bracketing':'28','compound-structure':'28',compoundRecursiveRole:'28.12',
  compoundNonactiveScope:'20;28',compoundMatrixNonactiveOptionId:'20;28',compoundYaSyncopation:'28',compoundEventOrder:'28',compoundItzSense:'28',
  purposiveSeries:'29.1',purposiveSoundedFutureMorph:'29.1',purposiveEarlySingularGlottal:'29',
});
const STEM_CHOICE_ORDER=['requestedDerivation','derivationOptionId','stemFormation','requestedVoice','voice','nonactiveOptionId'];

export function stemCollectorCaption(hasRelatedChoices=false){
  return hasRelatedChoices?'Stem and related choices':'Stem';
}

export function vncSubjectCaption({isCauser=false,isTarget=false,derivation='',voice='',nativeDerivation='direct',nativeVoice='active'}={}){
  if(isCauser)return 'Causer';
  if(isTarget)return 'Result subject';
  return (derivation||nativeDerivation)!=='direct'||(voice||nativeVoice)!=='active'?'Source subject':'Subject';
}

export const NOUNSTEM_CHOICE_SECTIONS=Object.freeze({
  stemFormation:'14.3',predicateFormation:'15.1.5–6',predicatePluralization:'16.9',
  'action-kind':'37','action-suffix':'37','characteristic-reading':'39',
  'compound-bracketing':'31','compound-structure':'31','continuation-kind':'37–39',
  'nominalization-kind':'35–36',nonactiveOptionId:'35–39','ownerhood-patientive-reading':'38–39',
  'patientive-family':'38','root-stock-noun-class':'37–39','root-stock-allomorph':'37–39','adjectival-operation':'40',
  'grammar:nominal-construction:countKind':'34','grammar:nominal-construction:classifier':'34',
  'grammar:nominal-construction:numeralVariant':'34','grammar:nominal-construction:conjunctionForm':'34',
});

export function formulaChoiceSlot(choice,group,family='',operation=''){
  if(group==='material')return 'material';
  if(group==='sentence-relationships')return 'sentence';
  if(family==='nnc'&&group==='formation'&&(Object.hasOwn(NOUNSTEM_CHOICE_SECTIONS,`${operation}:${choice}`)||Object.hasOwn(NOUNSTEM_CHOICE_SECTIONS,choice)))return 'nounstem';
  const explicit=declaredChoiceAddress(choice,operation);if(explicit)return explicit;
  if(Object.hasOwn(STEM_CHOICE_SECTIONS,choice))return family==='nnc'?'construction':'stem';
  if(choice==='predicateFormation')return 'predicate';
  if(group==='participants')return 'reference';
  if(group==='formation')return 'construction';
  return 'additional';
}

// Owner-projected fields have a separate lifetime from native collectors.
// Group their presentation by linguistic role; registered portals preserve the
// logical owner host when a generated bucket joins its native disclosure.
export function arrangeProjectedFormulaChoices(doc,host,entries,decisionGroups=[]){
  const labels={...BUILD_SLOT_LABELS,...CLAUSE_CHOICE_LABELS};
  const order=[...BUILD_SLOT_ORDER,...CLAUSE_CHOICE_ORDER];
  for(const slot of order){
    const members=entries.filter(entry=>(entry.clause?clauseDecisionSlot(entry.choice):formulaChoiceSlot(entry.choice,entry.group,entry.family,entry.operation))===slot);
    if(slot==='stem')members.sort((a,b)=>{
      const rank=id=>{const index=STEM_CHOICE_ORDER.indexOf(id);return index<0?STEM_CHOICE_ORDER.length:index;};
      return rank(a.choice)-rank(b.choice);
    });
    if(slot==='state'){const order=['state','possessor','possessorReduplication'];
      members.sort((a,b)=>(order.includes(a.choice)?order.indexOf(a.choice):order.length)-(order.includes(b.choice)?order.indexOf(b.choice):order.length));}
    if(slot==='nounstem'){const order=['predicateFormation','stemFormation','predicatePluralization'];
      members.sort((a,b)=>(order.includes(a.choice)?order.indexOf(a.choice):order.length)-(order.includes(b.choice)?order.indexOf(b.choice):order.length));}
    if(decisionGroups.length){const ranks=new Map(decisionGroups.map(group=>[group.id,group.order]));
      members.sort((a,b)=>(ranks.get(a.group)??ranks.size)-(ranks.get(b.group)??ranks.size));}
    let bucket=host.querySelector(`:scope > [data-build-owner-slot="${slot}"]`)
      ||ownerChoiceRoots(doc).find(root=>root.dataset.buildOwnerSlot===slot);
    if(!members.length){bucket?.remove();continue;}
    if(!bucket){bucket=doc.createElement('section');bucket.dataset.buildOwnerSlot=slot;
      const heading=doc.createElement('h3');heading.className='composition-formula-slot__heading';heading.textContent=labels[slot];bucket.append(heading);host.append(bucket);}
    const current=[...bucket.children].slice(1).filter(node=>!node.dataset.workspaceChoiceHeading);
    if(current.length!==members.length||members.some((entry,index)=>current[index]!==entry.field))
      for(const entry of members)bucket.append(entry.field);
    bucket.hidden=members.every(entry=>entry.hidden);
    // A lone field already supplies its name. Keep that native label and
    // suppress only an identical presentation heading, not its control.
    const visible=members.filter(entry=>!entry.hidden);
    const fieldLabel=visible.length===1?visible[0].field.querySelector('.classical-capability-operation-plan__choice-label,.classical-whole-canvas-choice__label,.classical-rule-control__label')?.textContent:'';
    const normalize=value=>String(value||'').trim().toLocaleLowerCase().replace(/\s+/gu,' ');
    bucket.firstElementChild.hidden=Boolean(fieldLabel&&normalize(fieldLabel)===normalize(labels[slot]));
  }
}

// One visible Stem location in Core; the generated bucket and native collector
// stay siblings. Only the generated sibling belongs to the replaceable owner
// projection. Native controls keep their original section and disclosure.
export function uniteCoreStemChoices(doc,organizer,active=true){
  return uniteStemChoices(doc,organizer,active,{family:'vnc',slot:'stem',nativeKind:'verbstem',target:'core',label:'Stem'});
}
export function uniteNounstemChoices(doc,organizer,active=true){
  return uniteStemChoices(doc,organizer,active,{family:'nnc',slot:'nounstem',nativeKind:'nounstem',target:'predicate',label:'Nounstem'});
}
function uniteStemChoices(doc,organizer,active,{family,slot,nativeKind,target,label}){
  const host=doc.getElementById('classical-capability-operation-choices');
  const destination=organizer?.querySelector(`[data-build-formula-part="${target}"]`);
  const native=organizer?.querySelector(`[data-build-formula-slot="${nativeKind}"]`);
  const bucket=ownerChoiceRoots(doc).map(root=>root.dataset.buildOwnerSlot===slot?root:root.querySelector(`[data-build-owner-slot="${slot}"]`)).find(Boolean);
  let shared=destination?.querySelector(':scope > [data-build-unified-stem]');
  const combined=Boolean(active&&destination&&native&&bucket&&!bucket.hidden);
  // A native NNC collector containing only Subject endings stays at Subject.
  const includeNative=native?.dataset.buildFormulaNumberOnly!=='true';
  const restoreNative=()=>{
    if(native?.dataset.unifiedStemInline!==undefined){
      native.open=native.dataset.unifiedStemWasOpen==='true';
      delete native.dataset.unifiedStemInline;delete native.dataset.unifiedStemWasOpen;
    }
  };
  if(!combined){
    if(bucket&&host&&!host.contains(bucket)){host.append(bucket);releaseOwnerChoicePortal(doc,bucket);}
    restoreNative();if(shared)delete shared.dataset.unifiedStemCombined;
    return;
  }
  if(!shared){shared=doc.createElement('section');shared.dataset.buildUnifiedStem=family;destination.append(shared);}
  shared.dataset.unifiedStemCombined='true';
  if(bucket.parentElement!==shared)shared.prepend(bucket);
  registerOwnerChoicePortal(doc,bucket);
  if(includeNative){
    if(native.dataset.unifiedStemInline===undefined)native.dataset.unifiedStemWasOpen=String(Boolean(native.open));
    native.dataset.unifiedStemInline='true';native.open=true;
    if(native.parentElement!==shared)shared.append(native);
  }else restoreNative();
  const caption=native.querySelector(':scope > summary')?.textContent||'';
  const heading=includeNative&&caption.includes('Stem and related choices')?'Stem and related choices'
    :includeNative&&caption.includes('Nounstem and related choices')?'Nounstem and related choices':label;
  if(bucket.firstElementChild.textContent!==heading)bucket.firstElementChild.textContent=heading;
  destination.hidden=false;
  if(family==='vnc')destination.parentElement.hidden=false;
  organizer.querySelector('[data-build-formula]').hidden=false;
}

// Non-stem projections join the corresponding native disclosure. Only their
// generated bucket is portalled; native fields remain in their own collectors.
export function arrangeProjectedClauseChoices(doc,organizer,family,active=true){
  const host=doc.getElementById('classical-capability-operation-choices');if(!host)return;
  const findBucket=slot=>ownerChoiceRoots(doc).map(root=>root.dataset.buildOwnerSlot===slot?root:root.querySelector(`[data-build-owner-slot="${slot}"]`)).find(Boolean);
  const nativeKind={subject:'subject',state:'state',valence:family==='vnc'?'valence':'predicate',tense:family==='vnc'?'tense':null,sentence:'sentence'};
  for(const slot of ['subject','state','valence','tense','direction','result-subject','reference','reduplication','sentence']){
    const bucket=findBucket(slot);if(!bucket)continue;
    const restore=()=>{if(bucket.dataset.buildPortalFamily===family&&!host.contains(bucket)){host.append(bucket);releaseOwnerChoicePortal(doc,bucket);delete bucket.dataset.buildPortalFamily;bucket.firstElementChild.hidden=false;}};
    if(!active||!organizer){restore();continue;}
    const kind=nativeKind[slot];
    const native=kind?organizer.querySelector(`[data-build-formula-slot="${kind}"]`):null;
    const part=slot==='subject'||slot==='result-subject'||slot==='reference'?organizer.querySelector('[data-build-formula-part="subject"]')
      :slot==='direction'&&family==='vnc'?organizer.querySelector('[data-build-formula-part="core"]')
      :slot==='reduplication'?organizer.querySelector(`[data-build-formula-part="${family==='vnc'?'core':'predicate'}"]`):null;
    const sentence=slot==='sentence'?organizer.querySelector(`[data-workspace-sentence-choices="${family}"]`):null;
    const destination=sentence||native||part;
    if(!destination){restore();continue;}
    // A transformed Source subject and the Result subject are independent.
    const sourceSubject=slot==='subject'&&native?.querySelector(':scope > summary')?.textContent.trim().startsWith('Source subject');
    const parent=sourceSubject?part:destination;
    if(!parent){restore();continue;}
    if(bucket.parentElement!==parent){
      const nativeSection=parent===native?native.querySelector(family==='vnc'?'[data-classical-vnc-authority-disclosure]':'[data-classical-nnc-grammar-section]'):null;
      // Native collectors may sit inside another layout wrapper. Insert next
      // to that wrapper, retaining the native controls and a stable portal home.
      let anchor=nativeSection;
      while(anchor&&anchor.parentElement!==parent)anchor=anchor.parentElement;
      if(anchor&&slot==='state')anchor.after(bucket);
      else if(anchor)parent.insertBefore(bucket,anchor);else parent.append(bucket);
    }
    registerOwnerChoicePortal(doc,bucket);bucket.dataset.buildPortalFamily=family;
    bucket.firstElementChild.hidden=Boolean(parent===native||sentence);
    if(!bucket.hidden){
      for(let n=parent;n&&n!==organizer;n=n.parentElement){if(n.dataset.buildFormulaPart!==undefined||n.dataset.buildFormula!==undefined||n===native||n===sentence){n.hidden=false;n.classList.remove?.('composition-empty-group');}}
    }
  }
}


// A click can schedule presentation before the browser's asynchronous toggle.
// Retain the intended open state at click time, then settle from native state.
export function preserveDisclosureChoice(summary,details,state,key){
  summary.addEventListener('click',()=>state.set(key,!details.open));
  details.addEventListener('toggle',()=>state.set(key,details.open));
}
