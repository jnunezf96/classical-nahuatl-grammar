import {ownerChoiceHost} from '../composition/owner_choice_roots.mjs?v=20261023-core-1';
import {getEmbeddedStartupData} from "../../bootstrap/startup_data.mjs?v=20261022-startup-1";
import {EMPTY_INTERFACE_MODEL,validateInterfaceModel} from './interface_model.mjs?v=20261012-interface-tool-3';

const INTERACTIVE='button,input,select,textarea,a[href],summary,details,fieldset,section,nav,dialog,h1,h2,h3,h4,[role="button"],[role="checkbox"],[role="combobox"],[role="listbox"],[role="radio"],[role="slider"],[role="spinbutton"],[role="switch"],[role="textbox"],[tabindex]';
const DATA_KEYS=['classicalCapabilityChoiceId','classicalClauseRelationDecision','compositionDisclosure','compositionChoiceFor','classicalSourceOutlineSection','classicalVncGrammarSection','classicalNncGrammarSection','classicalResultOutlineSection','classicalUserAction','classicalPanelJump'];
const PROTECTED_PLACEMENT=new Set(['classical-capability-operation-plan-status','classical-source-analysis','classical-rule-logic-controls','classical-capability-operation-plan','classical-capability-operation-choices','classical-capability-apply-operation']);
const text=value=>String(value||'').replace(/\s+/gu,' ').trim();
const attrName=key=>`data-${key.replace(/[A-Z]/gu,char=>`-${char.toLowerCase()}`)}`;

function operationFor(node,doc) {
  return node.closest('[data-classical-capability-operation-id]')?.dataset.classicalCapabilityOperationId
    || doc.getElementById('classical-capability-operation-plan')?.dataset.classicalCapabilityOperationId
    || doc.getElementById('classical-capability-navigator-operation')?.value || 'unselected';
}
export function getInterfaceTarget(node,doc=node.ownerDocument) {
  if(!node)return null;
  if(node.id)return `id:${node.id}`;
  if(node.dataset.classicalCapabilityChoiceId)return `choice:${operationFor(node,doc)}:${node.dataset.classicalCapabilityChoiceId}`;
  if(node.dataset.classicalClauseRelationDecision)return `clause-choice:${node.dataset.classicalClauseRelationDecision}`;
  if(node.dataset.compositionDisclosure)return `disclosure:${node.dataset.compositionDisclosure}`;
  for(const key of DATA_KEYS)if(node.dataset[key])return `data:${attrName(key)}=${node.dataset[key]}`;
  if(node.dataset.interfaceToolKey)return node.dataset.interfaceToolKey;
  const path=[];
  for(let current=node;current?.parentElement;current=current.parentElement) {
    const siblings=[...current.parentElement.children].filter(item=>item.tagName===current.tagName);
    path.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(current)+1})`);
  }
  if(!path.length)return null;
  const page=doc.body?.dataset.classicalInterfacePage || 'workspace';
  const target=`path:${page}:${path.join('>')}`;
  // Remember the original structure before an organizational edit moves a node.
  node.dataset.interfaceToolKey=target;
  return target;
}
function resolveTarget(doc,target) {
  if(target.startsWith('id:')){const node=doc.getElementById(target.slice(3));return node?[node]:[];}
  if(target.startsWith('data:')) {
    const split=target.indexOf('=');const attribute=target.slice(5,split);const value=target.slice(split+1);
    return [...doc.querySelectorAll(`[${attribute}]`)].filter(node=>node.getAttribute(attribute)===value);
  }
  return [...doc.querySelectorAll(INTERACTIVE)].filter(node=>getInterfaceTarget(node,doc)===target);
}
function state(node,doc,ignoredAncestor=null) {
  let hidden=false;let collapsed=false;
  for(let parent=node;parent;parent=parent.parentElement) {
    if(parent===ignoredAncestor)continue;
    hidden ||= parent.hidden || parent.getAttribute('aria-hidden')==='true'
      || doc.defaultView.getComputedStyle(parent).display==='none';
    collapsed ||= parent!==node && parent.tagName==='DETAILS' && !parent.open && node!==parent.querySelector(':scope > summary');
  }
  return {hidden,collapsed,visible:!hidden&&!collapsed,disabled:node.disabled===true||node.getAttribute('aria-disabled')==='true'};
}
function labelFor(node) {
  const label=node.labels?.[0];
  return text(node.getAttribute('aria-label') || node.getAttribute('title')
    || label?.querySelector('.classical-capability-operation-plan__choice-label')?.textContent
    || label?.textContent || (node.matches('input,select,textarea')?'':node.textContent)).slice(0,180);
}
function bindings(node) {
  return Object.fromEntries(Object.entries(node.dataset).filter(([key])=>!key.startsWith('interfaceTool')));
}
export function inspectWholeInterface(doc) {
  const entries=[...doc.querySelectorAll(INTERACTIVE)].map((node,index)=>{
      const target=getInterfaceTarget(node,doc);
    const ancestors=[];
    for(let parent=node.parentElement;parent;parent=parent.parentElement) {
      const key=getInterfaceTarget(parent,doc);if(key)ancestors.push(key);
    }
    return {target,observedKey:target||`observed:${node.tagName.toLowerCase()}:${index}`,stable:Boolean(target),identityScope:target?.startsWith('path:')?'original DOM structure in this state':'semantic identity',tag:node.tagName.toLowerCase(),label:labelFor(node),...state(node,doc),
      parent:node.parentElement?getInterfaceTarget(node.parentElement,doc):null,ancestors,bindings:bindings(node),
      options:node.tagName==='SELECT'?[...node.options].map(option=>({value:option.value,label:text(option.textContent),hidden:option.hidden||Boolean(option.closest('optgroup')?.hidden),disabled:option.disabled||Boolean(option.closest('optgroup')?.disabled),ownerAvailability:option.dataset.classicalCapabilityOwnerOptionAvailability||null})):[],
    };
  });
  return {version:1,kind:'whole-interface-live-snapshot',coverage:{scope:'current-live-document',includesHidden:true,includesCollapsed:true,includesOutsidePanels:true,grammarCombinationsExhausted:false},entries,
    ownerPathways:{available:Boolean(doc.defaultView.__CLASSICAL_NESTED_CONTROL_LEDGER__),scope:'current-live-branch',reference:'window.getClassicalNestedControlLedger()',selectedOperation:doc.defaultView.__CLASSICAL_NESTED_CONTROL_LEDGER__?.route?.selectedOperation||''}};
}
function labelSurface(node) {
  if(!node.matches('button,input,select,textarea,a,summary,details,section,fieldset,nav,dialog,h1,h2,h3,h4,[role="button"],[role="checkbox"],[role="radio"],[role="switch"]'))return null;
  if(node.matches('input,select,textarea')) {
    const label=node.labels?.[0] || node.closest('label');
    return label?.querySelector('.classical-capability-operation-plan__choice-label,.classical-rule-control__label,.field-label,span:not([aria-hidden])')
      || (label?[...label.childNodes].find(child=>child.nodeType===3&&text(child.textContent)):null);
  }
  if(node.tagName==='DETAILS')return node.querySelector(':scope > summary');
  if(node.matches('section,fieldset,nav,dialog'))return node.querySelector(':scope > legend,:scope > h2,:scope > h3,:scope > h4');
  if(!node.children.length)return node;
  return [...node.childNodes].find(child=>child.nodeType===3&&text(child.textContent))
    || node.querySelector(':scope > .button-label,:scope > span:not([aria-hidden]):not(:has(button,input,select,textarea))');
}
function safeCaption(node) {
  const surface=labelSurface(node);
  if(!surface || surface.nodeType===3 || !surface.children.length)return surface;
  return [...surface.childNodes].find(child=>child.nodeType===3&&text(child.textContent)) || null;
}
function placementNode(node) {
  if(node.tagName==='SUMMARY')return node.parentElement;
  if(node.matches('input,select,textarea'))return node.closest('.classical-capability-operation-plan__choice,.classical-rule-control,label')||node;
  return node;
}
function groupZone(node) {
  return ownerChoiceHost(node);
}
function previewRule(doc,rule,rules=[],locations=new Map()) {
  const nodes=resolveTarget(doc,rule.target);
  if(!nodes.length)return {target:rule.target,status:'deferred',reason:'Target is not instantiated in this interface state.'};
  if(nodes.length!==1)return {target:rule.target,status:'rejected',reason:'Target is ambiguous; use a stable unique ID or choice identity.'};
  const node=nodes[0];const host=placementNode(node);const errors=[];
  if('label' in rule) {
    const surface=safeCaption(node);
    if(!surface || surface.nodeType!==3 && surface.querySelector?.('button,input,select,textarea,summary,a'))errors.push('No safe text-only label projection.');
  }
  if('expanded' in rule && node.tagName!=='DETAILS')errors.push('Expansion is supported only for a disclosure.');
  if(rule.group && (!node.dataset.classicalCapabilityChoiceId || !groupZone(node) || !host.matches('.classical-capability-operation-plan__choice')))errors.push('Grouping is supported for generated owner choice fields in their native operation-choices container.');
  const anchorTarget=rule.before||rule.after;
  if(anchorTarget) {
    const anchors=resolveTarget(doc,anchorTarget);
    if(anchors.length===1) {
      const anchor=placementNode(anchors[0]);
      const anchorGroup=rules.find(item=>item.target===anchorTarget)?.group;
      const nativeParent=item=>locations.get(item)?.parent
        || (item.parentElement?.hasAttribute('data-interface-tool-group')?item.parentElement.parentElement:item.parentElement);
      const sameDestination=rule.group||anchorGroup
        ? Boolean(rule.group && rule.group===anchorGroup && groupZone(host)===groupZone(anchor))
        : nativeParent(host)===nativeParent(anchor);
      if(host===anchor||!sameDestination)errors.push('Placement must retain the same planned native parent or supported owner-choice group.');
      if(PROTECTED_PLACEMENT.has(host.id)||PROTECTED_PLACEMENT.has(anchor.id))errors.push('Native execution or insertion anchor cannot be moved.');
    }else if(anchors.length>1)errors.push('Placement anchor is ambiguous.');
    else return {target:rule.target,status:'deferred',reason:'Placement anchor is not instantiated in this interface state.'};
  }
  return {target:rule.target,status:errors.length?'rejected':'ready',reason:errors.join(' '),settings:{...rule},...state(node,doc)};
}

export function createInterfaceTool(doc,initialModel=EMPTY_INTERFACE_MODEL) {
  let model=validateInterfaceModel(initialModel);let loadError=null;
  const labels=new Map();const locations=new Map();const expansions=new Map();const groups=new Set();const attributes=new Map();
  function overrideAttribute(node,name,value,baseline=undefined) {
    if(!attributes.has(node))attributes.set(node,new Map());
    const records=attributes.get(node);let record=records.get(name);
    if(!record || node.getAttribute(name)!==record.override)record={original:baseline===undefined?node.getAttribute(name):baseline};
    records.set(name,{...record,override:value});
    if(node.getAttribute(name)!==value)node.setAttribute(name,value);
  }
  function restore() {
    for(const [surface,record] of labels)if(surface.isConnected && surface.textContent===record.override)surface.textContent=record.original;
    for(const [node,record] of [...locations].reverse())if(node.isConnected&&record.parent.isConnected)record.parent.insertBefore(node,record.next?.parentElement===record.parent?record.next:null);
    for(const [node,record] of expansions)if(node.isConnected&&node.open===record.override)node.open=record.original;
    for(const [node,records] of attributes)if(node.isConnected)for(const [name,record] of records)if(node.getAttribute(name)===record.override)record.original===null?node.removeAttribute(name):node.setAttribute(name,record.original);
    for(const group of groups)if(group.isConnected) {for(const child of [...group.children])if(child.tagName!=='LEGEND')group.before(child);group.remove();}
    labels.clear();locations.clear();expansions.clear();groups.clear();attributes.clear();
  }
  function preview(next=model) {
    const validated=validateInterfaceModel(next);
    const rules=validated.rules.map(rule=>previewRule(doc,rule,validated.rules,locations));
    return {valid:!rules.some(rule=>rule.status==='rejected'),rules,grammarAuthority:false,changesGrammar:false};
  }
  function apply() {
    for(const collection of [labels,locations,expansions,attributes])for(const [node] of collection)if(!node.isConnected)collection.delete(node);
    for(const node of groups)if(!node.isConnected)groups.delete(node);
    const report=preview();
    if(!report.valid)return report;
    for(const rule of model.rules) {
      if(report.rules.find(record=>record.target===rule.target)?.status!=='ready')continue;
      const node=resolveTarget(doc,rule.target)[0];if(!node)continue;
      if('label' in rule) {
        const surface=safeCaption(node);let previous=labels.get(surface);
        if(!previous || surface.textContent!==previous.override)previous={original:surface.textContent};
        if(surface.textContent!==rule.label)surface.textContent=rule.label;
        labels.set(surface,{...previous,override:rule.label});
        if(node.hasAttribute('aria-label'))overrideAttribute(node,'aria-label',rule.label);
        // Button mirrors use the existing native field's caption as their
        // accessible group name. Keep that projection coherent with the label.
        if(node.matches('input,select,textarea'))for(const mirror of doc.querySelectorAll('[data-composition-choice-for]'))if(mirror.nativeControl===node) {
          // A new native mirror can read an already overridden caption. Its
          // reset baseline comes from the retained native caption, not itself.
          const baseline=attributes.get(node)?.get('aria-label')?.original || text(previous.original);
          overrideAttribute(mirror,'aria-label',rule.label,baseline);
        }
      }
      if('expanded' in rule && !expansions.has(node)) {
        expansions.set(node,{original:node.open,override:rule.expanded});node.open=rule.expanded;
      }
      const host=placementNode(node);
      if(rule.group) {
        const zone=groupZone(node);
        let group=[...zone.querySelectorAll(':scope > [data-interface-tool-group]')].find(item=>item.dataset.interfaceToolGroup===rule.group);
        if(!group) {
          group=doc.createElement('fieldset');group.dataset.interfaceToolGroup=rule.group;
          group.style.cssText='display:grid;gap:12px;min-width:0;grid-column:1 / -1;border:1px solid #ccd7ce;border-radius:8px;padding:12px';
          const legend=doc.createElement('legend');legend.textContent=rule.group;group.append(legend);host.before(group);groups.add(group);
        }
        if(host.parentElement!==group){if(!locations.has(host))locations.set(host,{parent:host.parentElement,next:host.nextSibling});group.append(host);}
      }
    }
    // Build every supported group before resolving ordering inside those groups.
    const ordered=[];const visited=new Set();const byTarget=new Map(model.rules.map(rule=>[rule.target,rule]));
    const visit=rule=>{if(!rule||visited.has(rule.target))return;visited.add(rule.target);visit(byTarget.get(rule.before||rule.after));ordered.push(rule);};
    for(const rule of model.rules)visit(rule);
    for(const rule of ordered) {
      if(report.rules.find(record=>record.target===rule.target)?.status!=='ready')continue;
      const node=resolveTarget(doc,rule.target)[0];if(!node)continue;
      const host=placementNode(node);
      const anchorNode=resolveTarget(doc,rule.before||rule.after||'')[0];
      if(anchorNode) {
        const anchor=placementNode(anchorNode);
        if(host.parentElement!==anchor.parentElement)continue;
        const siblings=[...host.parentElement.children];
        const settled=rule.before?siblings.indexOf(host)<siblings.indexOf(anchor):siblings.indexOf(host)>siblings.indexOf(anchor);
        if(!settled){if(!locations.has(host))locations.set(host,{parent:host.parentElement,next:host.nextSibling});rule.before?anchor.before(host):anchor.after(host);}
      }
    }
    for(const group of groups)if(group.isConnected) {
      const hasContent=[...group.children].filter(node=>node.tagName!=='LEGEND').some(node=>!state(node,doc,group).hidden);
      if(group.hidden===hasContent)group.hidden=!hasContent;
    }
    return report;
  }
  const tool={
    inspect(query=''){const snapshot=inspectWholeInterface(doc);const terms=query.toLowerCase().split(/\s+/u).filter(Boolean);return {...snapshot,model:validateInterfaceModel(model),loadError,entries:snapshot.entries.filter(entry=>terms.every(term=>JSON.stringify(entry).toLowerCase().includes(term)))};},
    preview,refresh:apply,
    applySession(next){const proposed=validateInterfaceModel(next);const report=preview(proposed);if(!report.valid)throw new Error(report.rules.filter(rule=>rule.status==='rejected').map(rule=>`${rule.target}: ${rule.reason}`).join('\n'));restore();model=proposed;const result=apply();doc.dispatchEvent(new doc.defaultView.Event('classical:interface-model-changed'));return result;},
    resetSession(){return tool.applySession(EMPTY_INTERFACE_MODEL);},
    async reload(){try {const response=await doc.defaultView.fetch(new URL('../../../data/interface_layout.json',import.meta.url),{cache:'no-store'});if(!response.ok)throw new Error(`Interface model load failed: HTTP ${response.status}`);const next=await response.json();const report=tool.applySession(next);loadError=null;return report;}catch(error){loadError=error.message;throw error;}},
    get model(){return validateInterfaceModel(model);},
  };
  doc.defaultView.classicalInterfaceTool=tool;
  return tool;
}

export async function installInterfaceTool(doc) {
  const tool=createInterfaceTool(doc);
  try {const embedded=getEmbeddedStartupData(doc,"data/interface_layout.json");if(embedded!==undefined)tool.applySession(embedded);else await tool.reload();}catch { /* Invalid local settings cannot disable the grammar application. inspect() exposes the error. */ }
  let scheduled=false;
  const observer=new doc.defaultView.MutationObserver(()=>{
    if(scheduled)return;scheduled=true;
    doc.defaultView.requestAnimationFrame(()=>{scheduled=false;refresh();});
  });
  const observe=()=>observer.observe(doc.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','disabled','data-classical-capability-operation-id']});
  const nativeRefresh=tool.refresh;
  function refresh(){observer.disconnect();try{return nativeRefresh();}finally{observe();}}
  tool.refresh=refresh;
  tool.disconnect=()=>observer.disconnect();
  observe();return tool;
}
