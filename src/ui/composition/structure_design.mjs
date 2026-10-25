import {resolveDecisionFocus,resolveSourceSlotFocus,focusNativeChoice,highlightSourceDecision} from './flow_design.mjs?v=20261022-reset-eligibility-1&writingSource=20261022-1&makePreview=20261022-1&fixedChoices=20261022-1';
import {getNativeGrammarControls} from './choice_design.mjs?clickFeedback=20261023-1&coreStem=20261023-1&v=20261022-reset-eligibility-1&writingSource=20261022-1&fixedChoices=20261022-1';
import {createCandidateDesign} from './candidate_design.mjs?v=20261021-route-shapes-1';
import {getDoubleNucleusEditChildren} from '../../application/classical/double_nucleus_edit.mjs?nucleusEdit=20261024-9';
// Owner-issued structures are read only. No diagram, label or DOM value is an input.
const readers=new WeakMap(), comparisons=new WeakMap();
export const setStructureDesignContext=(root,reader)=>{if(root)readers.set(root,reader);};
export const readStructureDesignContext=root=>readers.get(root)?.() || null;
export const setStructureComparison=(root,value)=>{if(root)comparisons.set(root,value);};
const title=value=>String(value||'').replace(/-/gu,' ').replace(/^./u,c=>c.toUpperCase());
const typeLabels=values=>[...new Set((values||[]).map(value=>/^nnc-/u.test(value)?(/source|stem/u.test(value)?'Noun stem':'Noun clause'):/^vnc-/u.test(value)?(/source|stem/u.test(value)?'Verb stem':'Verb clause'):value==='particle'?'Particle':/clause|sentence/u.test(value)?'Clause':'').filter(Boolean))];

const conjunctLabel=(index,rightOnly=false)=>rightOnly?'Right conjunct':`${['First','Second','Third'][index]||`Conjunct ${index+1}`}${index<3?' conjunct':''}`;
function conjunctionChild(r,node) {
  if(r.isClassicalNahuatlClauseCompositionSourceFrame?.(node))return r.getClassicalNahuatlSupplementationClauseSourceFrame?.(node.envelope)||null;
  return r.isClassicalNahuatlClauseConjunctionResultFrame?.(node)||r.isClassicalNahuatlClauseComplementationResultFrame?.(node)?node:null;
}
function semanticChildren(r,exact) {
  const children=[];
  const nuclei=getDoubleNucleusEditChildren(r,exact);
  if(nuclei.length)children.push(...nuclei);
  else if(r.isClassicalNahuatlVncSentenceResultFrame?.(exact)===true
    && r.isClassicalNahuatlVncApplicationFrame?.(exact.vncApplicationFrame)===true) {
    children.push({role:'Verb clause',exact:exact.vncApplicationFrame});
  } else if(r.isClassicalNahuatlClauseConjunctionResultFrame?.(exact)) {
    for(const [index,node] of exact.conjuncts.entries()) {const child=conjunctionChild(r,node);if(child)children.push({role:conjunctLabel(index,exact.relationFrame?.leftContextAbsent===true),exact:child});}
    const supplement=conjunctionChild(r,exact.sharedSupplement);if(supplement)children.push({role:'Shared supplement',exact:supplement});
  } else if(r.isClassicalNahuatlSupplementationFrame?.(exact)) {
    for(const [role,key,list] of [['Principal','principalClause','principalContinuationFrames'],['Adjunct','supplementClause','supplementContinuationFrames']]) {
      const owned=exact[list]||[];
      if(owned.length)children.push({role,exact:owned.at(-1)});
      else {const child=r.getClassicalNahuatlSupplementationClauseSourceFrame?.(exact[key]);if(child)children.push({role,exact:child});}
    }
    for(const envelope of exact.interveningClauses||[]) {const child=r.getClassicalNahuatlSupplementationClauseSourceFrame?.(envelope);if(child)children.push({role:'Intervening clause',exact:child});}
  } else if(Array.isArray(exact.selectedClauses)) {
    for(const clause of exact.selectedClauses)if(clause.sourceResult)children.push({role:title(clause.role),exact:clause.sourceResult,selectedClause:clause});
  } else if(r.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(exact) && exact.canonicalInputFrame) {
    children.push({role:'Nucleus',exact:exact.canonicalInputFrame});
  } else if(r.isAdverbialAdjunctionResult?.(exact)) {
    for(const [role,key] of [['Principal','principal'],['Adjunct','adjoined'],['Marker','marker']])if(exact.sourceContract?.[key]?.issuedResult)children.push({role,exact:exact.sourceContract[key].issuedResult});
  }
  return children;
}
function envelopeFor(r,exact) {
  const envelope=r.buildClassicalNahuatlSupplementationClauseEnvelope?.(exact,{referenceId:'structural-presentation'});
  return r.isClassicalNahuatlSupplementationClauseEnvelope?.(envelope) ? envelope : null;
}
function objectLane(r,exact,id) {
  const candidates=[exact?.resultFrame?.finalTypedVncSlotFrame,exact?.vncApplicationResultFrame?.finalTypedVncSlotFrame,exact?.vncApplicationFrame?.resultFrame?.finalTypedVncSlotFrame,exact?.canonicalResultFrame?.finalTypedVncSlotFrame,exact?.typedSlotFrame,exact?.canonicalResultFrame];
  for(const slots of candidates)if(r.isClassicalNahuatlVncSlotFrame?.(slots)) {
    const position=slots.slots?.prePredicate?.find(slot=>slot.objectPositionFrame?.objectId===id)?.objectPositionFrame;
    if(position)return position.prominence||'';
  }
  return '';
}
function endpointsFor(r,exact,project) {
  const envelope=envelopeFor(r,exact);if(!envelope)return [];
  const endpoints=[];
  if(envelope.subject?.id)endpoints.push({id:envelope.subject.id,label:'Subject',category:envelope.subject.category,lane:'',selected:false});
  for(const object of envelope.objects||[]) {
    const nested=object.nestedObjectContactFrame;
    const origin=nested?.exactModifierResult;
    const validOrigin=origin && project(origin)?.canonicalResult===origin;
    endpoints.push({id:object.id,label:[validOrigin?'Modifier':'',title(validOrigin?nested.originObjectId:object.id)].filter(Boolean).join(' · '),category:object.category,
      lane:objectLane(r,validOrigin?origin:exact,validOrigin?nested.originObjectId:object.id),origin:validOrigin?origin:null,originId:validOrigin?nested.originObjectId:'',selected:false});
  }
  if(envelope.possessor?.id)endpoints.push({id:envelope.possessor.id,label:'Possessor',category:envelope.possessor.category,lane:'',selected:false});
  return endpoints;
}
function structureFacts(r,exact) {
  if(r.isClassicalNahuatlClauseConjunctionResultFrame?.(exact))return [['Relationship','Conjunction'],['Rank',title(exact.relationFrame?.level)],['Head',exact.balancedRelation?.noHead?'None':''],['Conjuncts',String(exact.conjuncts.length)]];
  if(r.isClassicalNahuatlSupplementationFrame?.(exact)) {
    if(exact.operationKind==='contextual-first-person-realization') {
      const contextual=envelopeFor(r,exact)?.canonicalContextualFirstPersonFrame;
      const operation=exact.operationFrames.find(frame=>frame.kind==='classical-nahuatl-contextual-silent-first-person-frame');
      if(contextual?.canonicalResult!==exact || contextual.canonicalPrincipalEnvelope!==exact.principalClause || !operation)return [];
      return [['Person',title(operation.subjectPerson)],['Subject realization',title(operation.pers1Realization)],
        ['Reflexive carrier',operation.reflexiveObjectCarrier],['Scope',exact.linearizationFrame.punctuation?'Sentence':'Unit']];
    }
    const ref=exact.referenceFrame;
    return [['Reference',title(ref.referenceMode)],['Contact',`${title(ref.headRole)} ↔ ${title(ref.supplementContactRole)}`],['Head',title(ref.headRole)],
      ['Principal contact',ref.principalHead.id],['Adjunct contact',ref.supplementContact.id],['Order',title(exact.linearizationFrame?.order||exact.order)],
      ['Scope',exact.linearizationFrame?.punctuation?'Sentence':'Unit'],['Marker',title(exact.linearizationFrame?.marking||exact.linearizationFrame?.markerSemantic)]];
  }
  if(Array.isArray(exact.selectedClauses))return [['Contact',title(exact.linkRole)],['Head',title(exact.compoundHeadTarget||'head')],['Order',title(exact.order)],['Scope',title(exact.topology)],['Marker',title(exact.adjunctor)]];
  if(r.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(exact))return [['Scope',title(exact.operationFrame?.scope||exact.particlePlacementScope||exact.kind)],['Marker',title(exact.particleSourceFrame?.sourceForm||exact.particleSourceFrame?.particleId)]];
  return [];
}
function acceptedSpatial(r,exact,children) {
  const unit=child=>({kind:'unit',role:child.role,source:child.exact});
  if(Array.isArray(exact.linearizationTokens)) {
    const pieces=exact.linearizationTokens.map(token=>token.kind==='adjunctor'
      ? {kind:'marker',text:token.value,role:'Adjunctor'}
      : children.find(child=>child.selectedClause===token.clause) ? unit(children.find(child=>child.selectedClause===token.clause)) : null);
    return pieces.every(Boolean)?{pieces,pending:false}:null;
  }
  if(r.isClassicalNahuatlSupplementationFrame?.(exact)) {
    const used=new Set();
    const pieces=(exact.linearizationFrame?.tokens||[]).map(token=>{
      const role=token.role==='principal'?'Principal':['supplement','topic-supplement'].includes(token.role)?'Adjunct':/^intervener-/u.test(token.role)?'Intervening clause':'';
      const child=children.find(c=>c.role===role && !used.has(c));
      if(child){used.add(child);return unit(child);}
      if(['adjunctor','outer-adjunctor','comment-emphasis'].includes(token.role))return {kind:'marker',text:token.surface,role:title(token.role)};
      return null;
    });
    return pieces.length && pieces.every(Boolean) && used.size===children.length?{pieces,pending:false}:null;
  }
  if(r.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(exact)
    && exact.placement?.scope==='clause-initial' && !exact.rightAttachedToNucleus && children.length===1
    && r.isClassicalNahuatlParticleResultFrame?.(exact.particleResultFrame)) {
    const text=exact.particleResultFrame.semanticMarker || exact.particleResultFrame.surfaceRealization;
    return text?{pieces:[{kind:'marker',text,role:exact.functionScope},unit(children[0])],pending:false}:null;
  }
  return null;
}
function draftSpatial(contract,sources) {
  const unresolved=new Set(contract.unresolvedDecisionIds||[]),d=contract.derived||{},n=contract.operationSelections||{};
  const unit=(role,label)=>{const source=sources.find(s=>s.role===role);return source?{kind:'unit',role:label,captureRole:role,source:source.exact}:null;};
  const marker={kind:'marker',text:'in',role:'Adjunctor'};
  let pieces=[];
  if(contract.relation==='adjectival-modification') {
    if(['topology','order','modifier-adjunctor'].some(id=>unresolved.has(id)))return null;
    const head=unit('principal','Head'),mod=unit('adjoined','Modifier'),dependent=unit('dependent','Modifier 2');
    if(d.topology==='ordinary')pieces=d.order==='modifier-head-preposed'?[...(d.adjunctor==='in'?[marker]:[]),mod,head]:d.order==='head-modifier'?[head,...(d.adjunctor==='in'?[marker]:[]),mod]:[];
    else if(d.topology==='cooperating-preposed-nonpreposed')pieces=[...(['preposed-in','both-in'].includes(d.adjunctor)?[marker]:[]),mod,head,...(['nonpreposed-in','both-in'].includes(d.adjunctor)?[marker]:[]),dependent];
  } else if(contract.relation==='supplementation' && n.supplementationReferenceMode==='shared') {
    if(unresolved.has('supplementation-order') || n.markerSemantic==='ca' || n.principalIntervenerUse==='reuse' || n.supplementationOrder==='discontinuous')return null;
    const principal=unit('principal','Principal'),adjunct=unit('adjoined','Adjunct'),marked=n.markerSemantic==='in'?[marker]:[];
    pieces=n.supplementationOrder==='principal-first'?[principal,...marked,adjunct]:n.supplementationOrder==='supplement-first'?[...marked,adjunct,principal]:[];
  } else if(contract.relation==='intensification' && d.order==='modifier-head') {
    pieces=[unit('adjoined','Modifier'),unit('principal','Head')];
  }
  return pieces.length && pieces.every(Boolean)?{pieces,pending:true}:null;
}
function navigationFor(contract,role,endpoint) {
  const decision=(id,value)=>contract.decisions?.find(d=>d.id===id && d.values?.includes(value))?{id,value}:null;
  if(contract.relation==='supplementation' && ['principal','adjoined'].includes(role)) {
    const object=endpoint.id!=='subject' && endpoint.id!=='possessor';
    return [object?decision(role==='principal'?'principal-object-id':'supplement-object-id',endpoint.id):null,
      decision(role==='principal'?'supplementation-head-role':'supplementation-contact-role',object?'object':endpoint.id)].filter(Boolean);
  }
  if(contract.relation==='adjectival-modification' && ['adjoined','dependent'].includes(role)) {
    const id=role==='dependent'?'dependent-link-kind':'link-kind';
    return [decision(id,endpoint.id==='subject'?'vnc-subject':'vnc-object'),endpoint.id==='subject'?decision(id,'shared-subject'):null].filter(Boolean);
  }
  return [];
}

export function projectCanonicalStructure(r,exact,project,role='Source',seen=new Set()) {
  const projection=project(exact);if(!projection || projection.canonicalResult!==exact || seen.has(exact))return null;
  const nextSeen=new Set(seen).add(exact), envelope=envelopeFor(r,exact);
  const unit=r.isClassicalNahuatlClauseConjunctionResultFrame?.(exact) || r.isClassicalNahuatlSupplementationFrame?.(exact) || r.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(exact) || r.isAdverbialAdjunctionResult?.(exact) ? 'Clause' : envelope?.unitKind==='nnc'?'Noun clause':envelope?.unitKind==='vnc'?'Verb clause':envelope?.unitKind==='particle'?'Particle':envelope?'Clause':'';
  const children=semanticChildren(r,exact).map(child=>{
    const captured=projectCanonicalStructure(r,child.exact,project,child.role,nextSeen);if(captured)return {...captured,selectedClause:child.selectedClause};
    // An issued particle layer can attest its signed NNC nucleus even when
    // that sentence frame is not independently registered as an application Result.
    if(r.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(exact) && exact.canonicalInputFrame===child.exact
      && r.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(child.exact)) {
      return {exact:child.exact,role:child.role,surface:child.exact.sentenceSurface||'',operation:'',unit:'Clause',children:[],spatial:null,endpoints:[],facts:[]};
    }
    return null;
  }).filter(Boolean);
  return {exact,role,surface:projection.surface,operation:projection.operationId,unit,children,spatial:acceptedSpatial(r,exact,children),endpoints:endpointsFor(r,exact,project),facts:structureFacts(r,exact).filter(([,value])=>value)};
}
export function projectClauseStructure(r,controller,selections,project) {
  if(!controller?.getCapturedCanonicalResult || !controller?.buildDecisionContract)return null;
  const contract=controller.buildDecisionContract(selections);
  const derived=contract.derived||{};
  let roles=derived.requiredCaptureRoles || (derived.operationFamily==='complement'
    ? ['principal','adjoined',...(derived.auxiliaryRequired?['dependent']:[])]
    : contract.relation==='adjectival-modification'
    ? ['principal','adjoined',...(derived.dependentRequired?['dependent']:[])]
    : ['principal','adjoined','dependent','supplement','marker'].filter(role=>
      Object.hasOwn(derived,`${role}SourceKind`) || (contract.missingCaptureRoles||[]).includes(role)));
  const optionalRoles=derived.optionalCaptureRoles || [];
  roles=[...new Set([...roles,...optionalRoles.filter(role=>controller.getCapturedCanonicalResult(role))])];
  if(contract.relation==='intensification' && derived.order==='modifier-head')
    roles=[...roles.filter(role=>role==='adjoined'),...roles.filter(role=>role!=='adjoined')];
  const conjunction=derived.operationFamily==='conjunction';
  const rightOnly=contract.relation==='conjunction' && contract.operationSelections?.leftContextAbsent===true;
  if(rightOnly)roles=roles.filter(role=>!['adjoined','dependent'].includes(role));
  const sources=roles.map(role=>projectCanonicalStructure(r,controller.getCapturedCanonicalResult(role),project,role)).filter(Boolean);
  for(const source of sources)source.optionalCapture=optionalRoles.includes(source.role);
  if(conjunction)for(const source of sources) {const index=['principal','adjoined','dependent'].indexOf(source.role);if(index>=0)source.label=conjunctLabel(index,rightOnly);else if(source.role==='supplement')source.label='Shared supplement';}
  for(const source of sources)for(const endpoint of source.endpoints)endpoint.navigation=navigationFor(contract,source.role,endpoint);
  const native=contract.operationSelections||{}, unresolved=new Set(contract.unresolvedDecisionIds||[]);
  let link=null;
  if(contract.relation==='supplementation' && native.supplementationReferenceMode==='shared'
    && !['supplementation-reference-mode','supplementation-head-role','supplementation-contact-role','principal-object-id','supplement-object-id'].some(id=>unresolved.has(id))) {
    const left=sources.find(s=>s.role==='principal'),right=sources.find(s=>s.role==='adjoined');
    const leftId=native.supplementationHeadRole==='object'?native.principalObjectId:native.supplementationHeadRole;
    const rightId=native.supplementationContactRole==='object'?native.supplementObjectId:native.supplementationContactRole;
    const leftEnd=left?.endpoints.find(e=>e.id===leftId),rightEnd=right?.endpoints.find(e=>e.id===rightId);
    if(leftEnd && rightEnd) {leftEnd.selected=true;rightEnd.selected=true;link={left:leftEnd,right:rightEnd,leftRole:left.role,rightRole:right.role,state:contract.authorizationStatus==='authorized'?'ready':'pending'};}
  }
  const links=link?[link]:[];
  if(contract.relation==='adjectival-modification') {
    const head=sources.find(s=>s.role==='principal');
    for(const [role,contact,decision] of [['adjoined',contract.derived?.linkRole,'link-kind'],['dependent',contract.derived?.dependentLinkRole,'dependent-link-kind']]) {
      if(!contact || unresolved.has(decision))continue;
      const modifier=sources.find(s=>s.role===role);
      const candidates=contact==='vnc-object' ? modifier?.endpoints.filter(e=>e.id!=='subject' && e.id!=='possessor') : modifier?.endpoints.filter(e=>e.id==='subject');
      const left=head?.endpoints.find(e=>e.id==='subject'),right=candidates?.length===1?candidates[0]:null;
      if(left && right && ['vnc-object','vnc-subject','shared-subject'].includes(contact)) {
        left.selected=true;right.selected=true;
        links.push({left,right,leftRole:head.role,rightRole:role,state:contract.authorizationStatus==='authorized'?'ready':'pending'});
      }
    }
  }
  links.forEach((edge,index)=>{for(const endpoint of [edge.left,edge.right])endpoint.linkNumbers=[...(endpoint.linkNumbers||[]),index+1];});
  return {sources,link:links[0]||null,links,spatial:draftSpatial(contract,sources)};
}
export function projectOperationShape(r,navigator,operationId) {
  if(!r.isClassicalGrammarApplicationCapabilityNavigator?.(navigator))return null;
  const operation=navigator.operations?.find(item=>item.operationId===operationId);
  if(operation?.availabilityStatus!=='available')return null;
  const inputs=typeLabels(operation.sharedUnitKinds||operation.matchedSourceUnitKinds||operation.inputUnitKinds);
  const outputs=typeLabels(operation.outputUnitKinds);
  return inputs.length && outputs.length?{inputs,outputs,pending:true}:null;
}
export function compareCanonicalStructures(r,left,right,project) {
  const a=projectCanonicalStructure(r,left,project),b=projectCanonicalStructure(r,right,project);if(!a||!b)return null;
  const flatten=(tree,path=[],map=new Map())=>{
    for(const [label,value] of [['Route',tree.operation],...tree.facts])map.set([...path,label].join(' / '),{label,path:[...path],value});
    tree.children.forEach((child,index)=>flatten(child,[...path,`${child.role} ${index+1}`],map));return map;
  };
  const av=flatten(a),bv=flatten(b), keys=[...new Set([...av.keys(),...bv.keys()])];
  const rows=keys.map(key=>({key,label:(av.get(key)||bv.get(key)).label,path:(av.get(key)||bv.get(key)).path,left:av.get(key)?.value||'—',right:bv.get(key)?.value||'—',different:av.get(key)?.value!==bv.get(key)?.value}));
  return {left:a,right:b,sameExact:left===right,sameSurface:a.surface===b.surface,rows};
}

const structureIds=new WeakMap();let structureId=0;
const identity=exact=>{if(!structureIds.has(exact))structureIds.set(exact,++structureId);return structureIds.get(exact);};
export function structurePresentationSignature(state) {
  const serialize=tree=>({identity:identity(tree.exact),role:tree.role,label:tree.label,optionalCapture:tree.optionalCapture===true,surface:tree.surface,unit:tree.unit,operation:tree.operation,facts:tree.facts,spatial:tree.spatial && {pending:tree.spatial.pending,pieces:tree.spatial.pieces.map(p=>({...p,source:p.source?identity(p.source):null}))},
    endpoints:tree.endpoints.map(endpoint=>({...endpoint,origin:Boolean(endpoint.origin)})),children:tree.children.map(serialize)});
  return JSON.stringify({sources:(state?.sources||[]).map(serialize),missing:state?.missingSources || [],scope:state?.sourceScope?identity(state.sourceScope):null,binding:state?.bindingScope?identity(state.bindingScope):null,operation:state?.operation,bindingId:state?.bindingId,links:(state?.links||[]).map(link=>[link.left.id,link.right.id,link.state]),spatial:state?.spatial && {pending:state.spatial.pending,pieces:state.spatial.pieces.map(p=>({...p,source:p.source?identity(p.source):null}))}});
}
export function createStructureDesign(doc) {
  const element=(tag,className,text='')=>{const e=doc.createElement(tag);e.className=className;e.textContent=text;return e;};
  const renderSpatial=(spatial,sources,seen=new Set())=>{
    if(!spatial)return null;
    const strip=element('div','composition-spatial-order');strip.dataset.compositionSpatialPending=String(spatial.pending);strip.setAttribute('role','group');strip.setAttribute('aria-label',spatial.pending?'Staged order':'Source order');
    for(const piece of spatial.pieces) {
      if(piece.kind==='marker'){const marker=element('span','composition-spatial-marker',piece.text);marker.setAttribute('aria-label',`${title(piece.role)}: ${piece.text}`);strip.append(marker);continue;}
      const source=sources.find(tree=>tree.exact===piece.source);if(!source)continue;
      const tile=element('span','composition-spatial-unit',title(piece.role));tile.dataset.compositionSpatialRole=piece.role;
      if(source.spatial && !seen.has(source.exact)){const nested=renderSpatial(source.spatial,source.children,new Set([...seen,source.exact]));if(nested)tile.append(nested);}
      strip.append(tile);
    }
    return strip;
  };
  const endpointText=e=>[e.label,e.category,e.lane].filter(Boolean).join(' · ');
  const renderTree=(tree,links,depth=0)=>{
    const card=element('div','composition-structure-node');card.dataset.compositionStructureRole=tree.role;
    card.dataset.compositionStructureDepth=String(depth);card.dataset.compositionStructureWhole=String(Boolean(tree.children.length));
    card.append(element('span','composition-source-card__role',title(tree.label||tree.role)),element('span','composition-source-card__form',tree.surface));
    if(depth===0 && tree.optionalCapture) {
      const action=`clear-clause-relation-${tree.role}`;
      const native=doc.querySelector(`[data-classical-user-action="${action}"]`);
      if(native && !native.disabled) {
        const clear=element('button','classical-whole-canvas-action',native.textContent);
        clear.type='button';clear.dataset.compositionClearCapture=tree.role;
        const root=doc.getElementById('classical-workbench'),scope=readStructureDesignContext(root);
        clear.addEventListener('click',()=>{
          const current=readStructureDesignContext(root);
          if(current?.sourceScope!==scope?.sourceScope || current?.bindingScope!==scope?.bindingScope || current?.operation!==scope?.operation || current?.bindingId!==scope?.bindingId)return;
          if(!current?.sources.some(source=>source.role===tree.role && source.exact===tree.exact && source.optionalCapture))return;
          const control=doc.querySelector(`[data-classical-user-action="${action}"]`);
          if(control && !control.disabled)control.click();
        });
        card.append(clear);
      }
    }
    if(tree.endpoints.length) {
      const ends=element('div','composition-contact-endpoints');
      for(const endpoint of tree.endpoints) {
        const numbers=[...new Set([...(endpoint.linkNumbers||[]),...links.flatMap((link,index)=>[link.left,link.right].some(e=>e?.origin===tree.exact && e.originId===endpoint.id)?[index+1]:[])])];
        const selected=numbers.length>0;
        const target=resolveDecisionFocus(doc,endpoint.navigation||[]);
        const badge=element(target?'button':'span','composition-contact-endpoint',`${numbers.map(n=>['①','②','③'][n-1]||String(n)).join(' ')}${selected?' ':''}${endpointText(endpoint)}`);
        badge.dataset.compositionFocusDecisions=JSON.stringify(endpoint.navigation||[]);badge.dataset.compositionContactId=endpoint.id;badge.dataset.compositionContactSelected=String(selected);if(target){badge.type='button';badge.setAttribute('aria-label',`${title(tree.label||tree.role)} · ${endpointText(endpoint)}`);badge.addEventListener('click',()=>{
          const root=doc.getElementById('classical-workbench'),state=readers.get(root)?.();
          const current=state?.sources.find(source=>source.exact===tree.exact && source.role===tree.role)?.endpoints.find(e=>e.id===endpoint.id);
          const next=resolveDecisionFocus(doc,current?.navigation||[]);if(next)focusNativeChoice(next);
        });}else badge.setAttribute('role','listitem');ends.append(badge);
      }
      ends.setAttribute('role','list');ends.setAttribute('aria-label','Contact roles');card.append(ends);
    }
    if(tree.children.length || tree.facts.some(([label])=>label==='Marker')) {
      const facts=element('div','composition-structure-facts');
      for(const [label,value] of tree.facts.filter(([label])=>['Contact','Order','Marker'].includes(label)))facts.append(element('span','',`${label}: ${value}`));
      if(facts.childElementCount)card.append(facts);
    }
    const spatial=renderSpatial(tree.spatial,tree.children);if(spatial)card.append(spatial);
    if(tree.children.length) {
      const children=element('div','composition-structure-children');
      for(const child of tree.children)children.append(renderTree(child,links,depth+1));card.append(children);
    }
    return card;
  };
  const refreshCandidates=createCandidateDesign(doc,renderTree,readStructureDesignContext);
  doc.addEventListener('focusin',event=>highlightSourceDecision(doc,event.target));
  return function refreshStructureDesign() {
    const root=doc.getElementById('classical-workbench');if(!root)return;
    const reader=readers.get(root),state=typeof reader==='function'?reader():null;
    refreshCandidates();
    let board=doc.getElementById('composition-structure-sources');
    if(!board && (state?.sources?.length || state?.missingSources?.length)) {board=element('div','composition-structure-sources');board.id='composition-structure-sources';board.setAttribute('role','group');board.setAttribute('aria-label','Source structure');doc.getElementById('classical-source-panel')?.append(board);}
    if(board) {
      // References stay private; the signature contains display facts only.
      const signature=structurePresentationSignature(state)+JSON.stringify([(state?.sources||[]).map(source=>source.endpoints.map(e=>Boolean(resolveDecisionFocus(doc,e.navigation||[])))),(state?.missingSources||[]).map(slot=>Boolean(resolveSourceSlotFocus(doc,slot)))]);
      if(board.dataset.signature!==signature) {
        board.dataset.signature=signature;board.replaceChildren(...(state?.sources||[]).map(tree=>renderTree(tree,state.links||[])));
        for(const slot of state?.missingSources || []) {
          const target=resolveSourceSlotFocus(doc,slot);
          const card=element(target?'button':'div','composition-source-slot');card.dataset.compositionMissingSourceRole=slot.role;
          card.append(element('span','composition-source-card__role',title(slot.label)),element('span','composition-source-slot__plus','+'));
          if(target) {card.type='button';card.setAttribute('aria-label',`Add ${slot.label} Source`);card.addEventListener('click',()=>{
            const current=readStructureDesignContext(root);
            if(current?.sourceScope!==state.sourceScope || current.bindingScope!==state.bindingScope || current.operation!==state.operation || current.bindingId!==state.bindingId)return;
            const live=current.missingSources?.find(item=>item.role===slot.role),picker=live && resolveSourceSlotFocus(doc,live);if(picker)focusNativeChoice(picker);
          });}
          board.append(card);
        }
        const draft=renderSpatial(state?.spatial,state?.sources||[]);if(draft)board.append(draft);
        for(const [index,link] of (state?.links||[]).entries()) {const bridge=element('div','composition-contact-link',`${['①','②','③'][index]||index+1} ${title(link.leftRole)} · ${endpointText(link.left)} ↔ ${title(link.rightRole)} · ${endpointText(link.right)}`);bridge.dataset.compositionContactLinkState=link.state;bridge.setAttribute('role','status');board.append(bridge);}
      }
      board.hidden=!(state?.sources?.length || state?.missingSources?.length);
    }
    for(const original of root.querySelectorAll('[data-composition-source-cards]'))original.classList.toggle('composition-structure-replaced',Boolean(state?.sources?.length));
    const plan=doc.getElementById('classical-capability-operation-plan');let diagram=doc.getElementById('composition-operation-shape');
    if(!diagram && state?.diagram && plan) {diagram=element('div','composition-operation-shape');diagram.id='composition-operation-shape';diagram.setAttribute('role','img');plan.append(diagram);}
    if(diagram) {
      const shape=state?.diagram;diagram.hidden=!shape;
      const signature=JSON.stringify(shape);if(diagram.dataset.signature!==signature) {
        diagram.dataset.signature=signature;diagram.replaceChildren();
        if(shape) {for(const [index,type] of shape.inputs.entries()){if(index)diagram.append(element('span','composition-shape-operator','+'));diagram.append(element('span',`composition-shape-piece composition-shape-${type.toLowerCase().replace(/ /gu,'-')}`,type));}
          diagram.append(element('span','composition-shape-operator','→'));for(const type of shape.outputs)diagram.append(element('span',`composition-shape-piece composition-shape-${type.toLowerCase().replace(/ /gu,'-')} composition-shape-target`,type));
          diagram.setAttribute('aria-label',`${shape.inputs.join(' + ')} → ${shape.outputs.join(' / ')} · Route target`);}
      }
    }
    const summaryControls=getNativeGrammarControls(doc);
    for(const details of root.querySelectorAll('#classical-authority-panel .composition-disclosure')) {
      const summary=details.querySelector(':scope > summary');if(!summary)continue;
      const values=[];
      for(const control of summaryControls.filter(control=>details.contains(control))) {
        if(control.closest('[hidden]') || control.hasAttribute('data-classical-compact-choice-original') || control.hasAttribute('data-classical-choice-group') || control.closest('.composition-disclosure')!==details)continue;
        if(control.tagName==='SELECT') {const option=control.selectedOptions?.[0];if(control.value && option && !option.hidden && (!option.disabled || control.disabled))values.push(option.textContent.trim().split(' — ')[0]);}
        else if(control.checked) {const label=control.labels?.[0];const short=label?.querySelector('.control-label-text,.classical-rule-control__label,[data-classical-choice-label]')?.textContent || label?.querySelector('span')?.textContent || [...label?.childNodes||[]].find(node=>node.nodeType===3 && node.textContent.trim())?.textContent || control.value;values.push(short.trim());}
      }
      let label=summary.querySelector('[data-composition-choice-summary]');
      if(!label && values.length) {label=element('span','composition-choice-summary');label.dataset.compositionChoiceSummary='true';summary.append(label);}
      if(label) {const text=values.length?' · '+[...new Set(values)].slice(0,3).join(' · '):'';if(label.textContent!==text)label.textContent=text;label.hidden=!text;}
    }
    const history=doc.getElementById('classical-grammar-workspace-history');const saved=history?comparisons.get(history):null;
    const legacyStatus=doc.getElementById('classical-grammar-workspace-history-status');
    legacyStatus?.classList.toggle('composition-history-comparison-projected',Boolean(saved?.legacyStatus && legacyStatus.textContent===saved.legacyStatus));
    const comparison=saved && saved.leftNodeId===doc.getElementById('classical-grammar-workspace-history-node')?.value && saved.rightNodeId===doc.getElementById('classical-grammar-workspace-history-compare-node')?.value ? saved : null;
    let difference=doc.getElementById('composition-structural-comparison');
    if(!difference && comparison && history) {difference=element('div','composition-structural-comparison');difference.id='composition-structural-comparison';difference.setAttribute('role','group');difference.setAttribute('aria-label','Structural comparison');history.querySelector('.path-compare')?.append(difference);}
    if(difference) {
      difference.hidden=!comparison;
      const signature=JSON.stringify(comparison && {left:comparison.left.surface,right:comparison.right.surface,rows:comparison.rows});
      if(difference.dataset.signature!==signature) {difference.dataset.signature=signature;difference.replaceChildren();
        if(comparison) {
          const head=element('div','composition-comparison-header');head.append(element('span','',comparison.leftLabel||comparison.left.surface),element('span','',comparison.rightLabel||comparison.right.surface));difference.append(head);
          for(const row of comparison.rows) {const line=element('div','composition-comparison-row');line.dataset.compositionComparisonDifferent=String(row.different);line.append(element('span','composition-comparison-label',[...row.path,row.label].join(' · ')),element('span','',row.left),element('span','',row.right));difference.append(line);}
        }
      }
    }
    return state;
  };
}
