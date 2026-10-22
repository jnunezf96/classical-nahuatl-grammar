import {validateWorkspaceOrganization,DEFAULT_WORKSPACE_ORGANIZATION,loadWorkspaceOrganization} from './workspace_organization_model.mjs?v=20261013-canvas-workspace-1&choicesLayout=20261014-4';
import {createParticleChoices} from './particle_choices.mjs?v=20261021-particle-clear-2';

export function resolveWorkspaceChoiceGroup(model,choice='',explicitClause='',operation=''){
  const clause=explicitClause||(choice.startsWith('clause-choice:')?choice.slice('clause-choice:'.length):'');
  const scoped=operation&&choice?`${operation}:${choice}`:'';
  if(scoped&&Object.hasOwn(model.choiceGroups,scoped))return model.choiceGroups[scoped];
  if(Object.hasOwn(model.choiceGroups,choice))return model.choiceGroups[choice];
  if(Object.hasOwn(model.clauseDecisionGroups,clause))return model.clauseDecisionGroups[clause];
  return 'existing-choices';
}

const NOMINAL_NUMBER_ENDING_IDS=new Set([
  'classical-rule-logic-nnc-singular-connector','classical-rule-logic-nnc-plural-connector',
]);
function nominalNumberEndingContext(doc,section){
  const fields=[...section?.querySelectorAll('select,input') || []].filter(control=>{
    if(control.disabled||control.readOnly||control.type==='hidden')return false;
    for(let node=control;node;node=node.parentElement){
      if(node.hidden||doc.defaultView.getComputedStyle(node).display==='none')return false;
      if(node===section)break;
    }
    return true;
  });
  const hasEnding=fields.some(control=>NOMINAL_NUMBER_ENDING_IDS.has(control.id));
  return {hasEnding,onlyEndings:hasEnding&&fields.every(control=>NOMINAL_NUMBER_ENDING_IDS.has(control.id))};
}

// Authored presentation adapter. Native controls keep their identities, values,
// listeners and ancestor contracts. This module never calls a grammar owner.
export function createWorkspaceOrganization(doc,initialModel=DEFAULT_WORKSPACE_ORGANIZATION,disclosureState=new Map()){
  let model=validateWorkspaceOrganization(initialModel);
  const organizeChoicesLayout=createChoicesLayout(doc,()=>model);
  const organizeParticles=createParticleChoices(doc);
  const text=(node,value)=>{if(node&&node.textContent!==value)node.textContent=value;};
  const sectionDomain={vnc:{verbstem:'formation',subject:'participants',valence:'participants',tense:'clause-settings',sentence:'sentence-relationships'},
    nnc:{state:'participants',nounstem:'formation',predicate:'formation',subject:'participants',sentence:'sentence-relationships'}};
  function fieldGroup(field){
    const control=field.querySelector('[data-classical-capability-choice-id],[data-classical-clause-relation-decision]');
    const choice=control?.dataset.classicalCapabilityChoiceId||'';
    if(control?.id==='classical-adverbial-degree')return 'formation';
    const operation=control?.closest('#classical-capability-operation-plan')?.dataset.classicalCapabilityOperationId||'';
    return resolveWorkspaceChoiceGroup(model,choice,control?.dataset.classicalClauseRelationDecision||'',operation);
  }
  function orderWithinHost(host,nodes,rank){
    const current=[...host.children].filter(node=>nodes.includes(node));
    const sorted=[...current].sort((a,b)=>rank(a)-rank(b));
    if(current.every((node,index)=>node===sorted[index]))return;
    const marker=doc.createComment('organization preserves native host');host.insertBefore(marker,current[0]);
    for(const node of sorted)host.insertBefore(node,marker);marker.remove();
  }
  function visibleField(field,host){
    for(let node=field;node&&node!==host;node=node.parentElement)if(node.hidden||doc.defaultView.getComputedStyle(node).display==='none')return false;
    return true;
  }
  function organizeOwnerChoices(){
    const host=doc.getElementById('classical-capability-operation-choices');if(!host)return;
    const fields=[...host.children].filter(node=>node.matches('.classical-capability-operation-plan__choice,.classical-whole-canvas-choice,.classical-rule-control')&&node.querySelector('[data-classical-capability-choice-id],[data-classical-clause-relation-decision]'));
    const ranks=new Map(model.groups.map(group=>[group.id,group.order]));
    for(const field of fields){
      field.dataset.workspaceChoiceGroup=fieldGroup(field);
      const choice=field.querySelector('[data-classical-capability-choice-id]')?.dataset.classicalCapabilityChoiceId;
      if(['pluralConnector','singularConnector'].includes(choice))text(field.querySelector('.classical-capability-operation-plan__choice-label'),'Subject number ending');
    }
    orderWithinHost(host,fields,field=>ranks.get(field.dataset.workspaceChoiceGroup));
    const activeGroups=new Set();
    for(const group of [...model.groups].sort((a,b)=>a.order-b.order)){
      const members=fields.filter(field=>field.dataset.workspaceChoiceGroup===group.id);
      let heading=host.querySelector(`:scope > [data-workspace-choice-heading="${group.id}"]`);
      if(!members.length){heading?.remove();continue;}
      activeGroups.add(group.id);
      if(!heading){heading=doc.createElement('h3');heading.className='workspace-choice-heading';heading.dataset.workspaceChoiceHeading=group.id;heading.id=`workspace-owner-group-${group.id}`;}
      text(heading,group.label);if(members[0].previousElementSibling!==heading)members[0].before(heading);
      heading.hidden=!members.some(field=>visibleField(field,host));
    }
    for(const heading of host.querySelectorAll(':scope > [data-workspace-choice-heading]'))if(!activeGroups.has(heading.dataset.workspaceChoiceHeading))heading.remove();
  }
  function organizeNativeSections(){
    for(const family of ['vnc','nnc']){
      const rows=model.nativeSections[family].map((kind,index)=>{
        const section=doc.querySelector(family==='vnc'?`[data-classical-vnc-authority-disclosure="${kind}"]`:`[data-classical-nnc-grammar-section="${kind}"]`);
        const wrapper=section?.parentElement?.matches('.composition-disclosure')?section.parentElement:section;
        return {section,wrapper,kind,index};
      }).filter(row=>row.wrapper&&doc.getElementById('classical-rule-logic-controls')?.contains(row.wrapper));
      organizeSentenceChoices(family,rows.find(row=>row.kind==='sentence'));
      const placement=row=>row.placement||row.wrapper;
      const hosts=new Set(rows.map(row=>placement(row).parentElement));
      for(const host of hosts){const members=rows.filter(row=>placement(row).parentElement===host);orderWithinHost(host,members.map(placement),node=>members.find(row=>placement(row)===node).index);}
      for(const row of rows){
        if(family==='vnc'&&row.kind==='verbstem')organizeNativeMaterial(row.section);
        const numberContext=family==='nnc'&&row.kind==='nounstem'?nominalNumberEndingContext(doc,row.section):null;
        const domain=numberContext?.onlyEndings?'participants':sectionDomain[family][row.kind];row.wrapper.dataset.workspaceDomain=domain;
        const summary=row.wrapper.querySelector(':scope > summary');if(!summary)continue;
        const labels={verbstem:'Verb formation',state:'State and possession',nounstem:'Nounstem formation',predicate:'Predicate formation',
          subject:family==='vnc'&&doc.getElementById('classical-workbench')?.dataset.compositionTargetSubject==='true' ? 'Result subject' : 'Subject',
          valence:'Objects',tense:'Mood and tense',sentence:'Relationships'};
        if(numberContext?.hasEnding)labels.nounstem=numberContext.onlyEndings?'Subject number endings':'Nounstem and number endings';
        const caption=[...summary.childNodes].find(node=>node.nodeType===3);
        if(caption&&caption.textContent.trim()!==labels[row.kind])caption.textContent=labels[row.kind];
      }
    }
  }
  function organizeNativeMaterial(section){
    const fields=['classical-rule-logic-compound-matrix','classical-rule-logic-compound-matrix-class',
      'classical-rule-logic-compound-matrix-initial-i'].map(id=>doc.getElementById(id)?.closest('label'))
      .filter(field=>field&&section.contains(field));
    if(!fields.length)return;
    let group=section.querySelector('[data-workspace-native-material="vnc"]');
    const parent=fields[0].parentElement===group?group.parentElement:fields[0].parentElement;
    if(!group){
      group=doc.createElement('div');group.dataset.workspaceNativeMaterial='vnc';
      const heading=doc.createElement('h3');heading.className='workspace-choice-heading';group.append(heading);
    }
    text(group.firstElementChild,model.groups.find(group=>group.id==='material').label);
    group.firstElementChild.dataset.choicesInternalMaterialHeading='true';
    // Preserve the native section/body ancestry and move the existing fields,
    // including their handlers and owner visibility, into its Material group.
    if(group.parentElement!==parent)parent.prepend(group);
    for(const field of fields){
      field.dataset.workspaceChoiceGroup='material';
      if(field.parentElement!==group)group.append(field);
    }
    group.hidden=!fields.some(field=>visibleField(field,group));
  }
  function organizeSentenceChoices(family,row){
    if(!row)return;
    const host=doc.querySelector(family==='vnc'?'[data-classical-vnc-authority-organizer]':'.classical-nnc-grammar-organizer');
    if(!host?.contains(row.wrapper))return;
    let group=host.querySelector(`[data-workspace-sentence-choices="${family}"]`);
    if(!group){
      group=doc.createElement('details');group.className='composition-disclosure';
      group.dataset.workspaceSentenceChoices=family;
      const key=`${family}-sentence-choices`;
      group.dataset.compositionDisclosure=key;
      group.open=disclosureState.get(key)===true;
      group.addEventListener('toggle',()=>disclosureState.set(key,group.open));
      const summary=doc.createElement('summary');summary.textContent='Sentence choices';
      group.append(summary);
      host.insertBefore(group,row.wrapper);
    }
    // Keep native sections under their original organizer. Their own hidden
    // flags remain independent of the particle disclosure's availability.
    if(row.wrapper.parentElement!==group)group.append(row.wrapper);
    row.wrapper.dataset.workspaceSentenceContent='relationships';
    row.wrapper.open=true;
    row.placement=group;
    const particles=doc.getElementById('classical-particle-menu');
    const unit=doc.getElementById('classical-rule-logic-controls')?.dataset.classicalRuleLogicSurfaceUnit;
    if(particles&&unit===family){
      if(particles.parentElement!==group)group.append(particles);
      particles.dataset.workspaceSentenceContent='particles';
      particles.open=true;
    }
    group.hidden=![...group.children].filter(node=>node!==group.firstElementChild).some(node=>visibleField(node,group));
  }
  function organizeSentenceTask(){
    const host=doc.getElementById('classical-sentence-task');if(!host)return;
    const fields=[...host.children].filter(node=>node.matches('.classical-rule-control'));
    if(!fields.length)return;
    host.dataset.workspaceDomain='clause-settings';
    let heading=host.querySelector(':scope > [data-workspace-task-heading]');
    if(!heading){heading=doc.createElement('h3');heading.className='workspace-choice-heading';heading.dataset.workspaceTaskHeading='clause-settings';host.prepend(heading);}
    text(heading,model.groups.find(group=>group.id==='clause-settings').label);
    heading.hidden=!fields.some(field=>visibleField(field,host));
  }
  function refresh(){
    const root=doc.getElementById('classical-workbench');if(!root)return;
    if(root.dataset.workspaceOrganization!=='canvas')root.dataset.workspaceOrganization='canvas';
    const v=model.vocabulary;
    for(const [id,label] of [['source',v.materialHeading],['grammar',v.build],['result',v.sentence]])text(doc.getElementById(`classical-stage-${id}-heading`),label);
    for(const [step,label] of [['source',v.material],['grammar',v.build],['result',v.sentence]])text(root.querySelector(`[data-classical-composition-path-summary-step="${step}"] .classical-composition-path-summary__label`),label);
    const destinations={'classical-source-panel':v.material,'classical-authority-panel':v.build,'classical-result-panel':v.sentence,'classical-path-panel':v.history};
    for(const button of root.querySelectorAll('[data-classical-panel-jump]'))text(button,destinations[button.dataset.classicalPanelJump]||button.textContent);
    root.querySelector('.classical-four-panel-navigation')?.setAttribute('aria-label','Composing workspace');
    text(doc.querySelector('.skip-link'),'Skip to the composing workspace');
    text(doc.getElementById('classical-capability-operation-plan-heading'),'Current formation');
    const planStatus=doc.getElementById('classical-capability-operation-plan-status');
    if(planStatus)text(planStatus,planStatus.textContent.replace('until Apply.','until Make Result.').replace('Apply when you are satisfied with the choices.','Use Make Result when you are satisfied with the choices.'));
    text(doc.getElementById('composition-clause-settings-heading'),
      doc.getElementById('classical-build-task')?.dataset.buildTaskControl==='classical-construction-operation'?'Choices':'Clause settings');
    for(const id of ['classical-capability-navigator-operation','classical-capability-navigator-operation-choices'])doc.getElementById(id)?.setAttribute('aria-label','Build operation');
    for(const id of NOMINAL_NUMBER_ENDING_IDS)text(doc.getElementById(id)?.closest('.classical-rule-control,label')?.querySelector('.classical-rule-control__label'),'Subject number ending');
    const editor=doc.querySelector('[data-composition-source-editor] > summary');text(editor,`Choose or edit ${v.material}`);
    const advanced=doc.getElementById('classical-grammar-advanced')?.querySelector(':scope > summary');text(advanced,v.diagnostics);
    text(doc.getElementById('classical-stage-path-heading'),v.history);
    root.querySelector('#classical-path-dialog .path-dialog-close')?.setAttribute('aria-label',`Close ${v.history}`);
    for(const heading of root.querySelectorAll('.panel-block-step'))if(!heading.hasAttribute('data-workspace-step'))heading.dataset.workspaceStep='compatibility';
    organizeNativeSections();organizeParticles();organizeOwnerChoices();organizeSentenceTask();organizeChoicesLayout();
  }
  const tool={inspect:()=>({model:validateWorkspaceOrganization(model),grammarAuthority:false,nativePlacement:'same native host',root:'classical-workbench'}),
    preview:next=>({valid:Boolean(validateWorkspaceOrganization(next)),grammarAuthority:false}),
    applySession(next){model=validateWorkspaceOrganization(next);refresh();return tool.inspect();},
    async reload(){model=await loadWorkspaceOrganization(doc);refresh();return tool.inspect();}};
  doc.defaultView.classicalWorkspaceOrganization=tool;
  refresh.choicesLayout=organizeChoicesLayout;
  return refresh;
}


// Presentation boundary only. Each field remains inside its native collector
// section (or the replaceable projected host), including its listeners/options.
export function createChoicesLayout(doc,initialModel){
  const readModel=typeof initialModel==='function'?initialModel:()=>initialModel;
  let model,groups,ranks;
  const text=(node,value)=>{if(node&&node.textContent!==value)node.textContent=value;};
  const after=(node,anchor)=>{if(node&&anchor&&anchor.nextElementSibling!==node)anchor.after(node);};

  const visible=(node,boundary)=>{
    for(let p=node;p&&p!==boundary;p=p.parentElement)
      if(!p.dataset.choicesNativeBucket&&(p.hidden||doc.defaultView.getComputedStyle(p).display==='none'))return false;
    return true;
  };
  function nativeSections(controls){
    for(const family of ['vnc','nnc']){
      const organizer=controls.querySelector(family==='vnc'?'[data-classical-vnc-authority-organizer]':'.classical-nnc-grammar-organizer');
      if(!organizer)continue;
      const sections=family==='vnc'?{verbstem:'formation',subject:'participants',valence:'participants',tense:'clause-settings',sentence:'sentence-relationships'}
        :{state:'participants',nounstem:'formation',predicate:'formation',subject:'participants',sentence:'sentence-relationships'};
      if(family==='nnc'&&nominalNumberEndingContext(doc,organizer.querySelector('[data-classical-nnc-grammar-section="nounstem"]')).onlyEndings)sections.nounstem='participants';
      const sentence=organizer.querySelector(family==='vnc'?'[data-classical-vnc-authority-disclosure="sentence"]':'[data-classical-nnc-grammar-section="sentence"]');
      // Keep the native sentence collector intact, but place its context under
      // unit form whenever it carries editable sentence-form decisions.
      if(sentence&&[...sentence.querySelectorAll('select,input')].some(field=>model.nativeFields?.[field.id]==='clause-settings'&&visible(field.closest('.classical-rule-control,label')||field,controls)))sections.sentence='clause-settings';
      for(const group of groups){
        const members=[];
        for(const [kind,domain] of Object.entries(sections)){
          if(domain!==group.id)continue;
          const section=organizer.querySelector(family==='vnc'?`[data-classical-vnc-authority-disclosure="${kind}"]`:`[data-classical-nnc-grammar-section="${kind}"]`);
          if(!section)continue;
          const disclosure=section.parentElement?.matches('.composition-disclosure')?section.parentElement:section;
          const member=kind==='sentence'?organizer.querySelector(`[data-workspace-sentence-choices="${family}"]`)||disclosure:disclosure;
          members.push(member);
        }
        if(!members.length){const oldBucket=organizer.querySelector(`:scope > [data-choices-native-bucket="${group.id}"]`);if(oldBucket)oldBucket.hidden=true;continue;}
        let bucket=organizer.querySelector(`:scope > [data-choices-native-bucket="${group.id}"]`);
        if(!bucket){bucket=doc.createElement('section');bucket.dataset.choicesNativeBucket=group.id;
          const heading=doc.createElement('h3');heading.className='workspace-choice-heading';heading.dataset.choicesBucketHeading=group.id;bucket.append(heading);organizer.append(bucket);}
        text(bucket.firstElementChild,group.label);
        for(const member of members)if(member.parentElement!==bucket)bucket.append(member);
        if(family==='vnc'&&group.id==='participants'){
          const extra=doc.getElementById('classical-source-object-details');
          if(extra&&controls.contains(extra)){
            const valence=organizer.querySelector('[data-classical-vnc-authority-disclosure="valence"]');
            const objects=valence?.parentElement?.matches('.composition-disclosure')?valence.parentElement:null;
            // Keep the existing extra-object editor inside Objects, outside the
            // native collector whose own visibility is independently projected.
            const home=objects||bucket;
            if(extra.parentElement!==home)home.append(extra);
            if(objects){
              objects.hidden=valence.hidden&&extra.hidden;
              if(!extra.hidden)objects.classList.remove?.('composition-empty-group');
            }
            members.push(extra);
          }
        }
        bucket.hidden=!members.some(member=>visible(member,controls)&&[...member.querySelectorAll('select,input,button')].some(field=>field.type!=='hidden'&&visible(field,controls)));
      }
      const buckets=[...organizer.children].filter(node=>node.dataset.choicesNativeBucket);
      const sorted=[...buckets].sort((a,b)=>ranks.get(a.dataset.choicesNativeBucket)-ranks.get(b.dataset.choicesNativeBucket));
      if(buckets.some((node,i)=>node!==sorted[i]))for(const node of sorted)organizer.append(node);
    }
  }
  function nativeGroups(controls){
    const hosts=new Map();
    for(const field of controls.querySelectorAll('[data-choices-native-field]'))if(!model.nativeFields?.[field.dataset.choicesNativeField]){delete field.dataset.choicesNativeGroup;delete field.dataset.choicesNativeField;}
    for(const [id,group] of Object.entries(model.nativeFields||{})){
      const control=doc.getElementById(id);
      if(!control||!controls.contains(control)||control.type==='hidden')continue;
      const field=control.closest('.classical-rule-control,label');
      if(!field||!field.parentElement)continue;
      field.dataset.choicesNativeGroup=group;field.dataset.choicesNativeField=id;
      if(!hosts.has(field.parentElement))hosts.set(field.parentElement,new Map());
      hosts.get(field.parentElement).set(field,group);
    }
    for(const [host,membership] of hosts){
      const fields=[...host.children].filter(n=>membership.has(n));
      const sorted=[...fields].sort((a,b)=>ranks.get(membership.get(a))-ranks.get(membership.get(b)));
      if(fields.some((field,i)=>field!==sorted[i])){
        const anchor=doc.createComment('retain native choice collector');host.insertBefore(anchor,fields[0]);
        for(const field of sorted)host.insertBefore(field,anchor);anchor.remove();
      }
      for(const group of groups){
        const members=sorted.filter(field=>membership.get(field)===group.id);
        if(!members.length)continue;
        let heading=host.querySelector(`:scope > [data-choices-native-heading="${group.id}"]`);
        if(!heading){heading=doc.createElement('h3');heading.className='workspace-choice-heading';heading.dataset.choicesNativeHeading=group.id;}
        text(heading,group.label);
        if(members[0].previousElementSibling!==heading)members[0].before(heading);
        const context=host.closest('[data-choices-native-bucket]')?.dataset.choicesNativeBucket;
        heading.hidden=(!context||context===group.id)&&new Set([...membership.values()]).size<2||!members.some(field=>visible(field,controls));
      }
    }
    // A native section is a structural/context boundary, not a competing set
    // of choices. Its ordinary Subject/Objects/State captions remain useful.
    const projected=doc.getElementById('classical-capability-operation-choices');
    const seenGroups=new Set();
    for(const heading of controls.querySelectorAll('[data-workspace-choice-heading],[data-choices-bucket-heading],[data-choices-native-heading]')){
      const group=heading.dataset.workspaceChoiceHeading||heading.dataset.choicesBucketHeading||heading.dataset.choicesNativeHeading;
      if(heading.dataset.choicesBucketHeading){
        const available=!heading.parentElement.hidden;heading.hidden=!available||seenGroups.has(group);if(available)seenGroups.add(group);
      }else if(heading.dataset.choicesNativeHeading){
        const host=heading.parentElement;
        const members=[...host.children].filter(n=>n.dataset.choicesNativeGroup===group);
        const available=members.some(field=>visible(field,controls));
        const context=host.closest('[data-choices-native-bucket]')?.dataset.choicesNativeBucket;
        heading.hidden=(!context||context===group)&&new Set([...host.children].map(n=>n.dataset.choicesNativeGroup).filter(Boolean)).size<2||!available||seenGroups.has(group);
        if(available)seenGroups.add(group);
      }else if(!heading.hidden&&projected?.contains(heading))seenGroups.add(group);
    }
  }
  return function refresh(){
    model=readModel();groups=[...model.groups].sort((a,b)=>a.order-b.order);ranks=new Map(groups.map(g=>[g.id,g.order]));
    const controls=doc.getElementById('classical-rule-logic-controls');
    const plan=doc.getElementById('classical-capability-operation-plan');
    if(!controls||!plan)return;
    const grid=controls.querySelector(':scope > .classical-rule-controls-grid')||plan.querySelector(':scope > .classical-rule-controls-grid');
    if(!grid)return;
    // Moving this once retains both native roots as direct children of their
    // grid. Renderers share this explicit outer-grid lookup contract.
    if(grid.parentElement!==plan){const status=doc.getElementById('classical-capability-operation-plan-status');if(status)status.after(grid);else plan.append(grid);}
    if(plan.dataset.choicesOrganization!=='inventory')plan.dataset.choicesOrganization='inventory';
    const heading=doc.getElementById('classical-build-choices-heading');
    if(heading)heading.hidden=false;
    const oldHeading=doc.getElementById('composition-clause-settings-heading');
    if(oldHeading)oldHeading.hidden=true;
    if(grid.getAttribute('aria-labelledby')!=='classical-build-choices-heading')grid.setAttribute('aria-labelledby','classical-build-choices-heading');
    nativeSections(controls);
    nativeGroups(controls);
    const requirements=doc.getElementById('classical-capability-navigator-unavailable');
    const effects=doc.querySelector('[data-composition-disclosure="change-details"]');
    after(requirements,grid);after(effects,requirements||grid);
    const ids=doc.querySelector('[data-build-inventory-inspector]');after(ids,effects||requirements||grid);
  };
}
