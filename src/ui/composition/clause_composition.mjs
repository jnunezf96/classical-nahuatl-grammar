// Language roles for existing clause decisions. These addresses organize
// controls; only their canonical controller supplies values and authority.
const roles={
 relation:'relation relation-profile structure-profile semantic-category coordination-relation coordination-type clause-level parallel-type appositive-type comparison-route continuation-family lexical-type',
 reference:'designation-structure link-kind dependent-link-kind compound-head-target principal-object-id contact-kind relational-pair shared-modifier-scope shared-modifier supplementation-reference-mode supplementation-head-role supplementation-contact-role additional-possessor-contact supplement-object-id principal-nnc superlative-principal',
 order:'order complement-order topology recursion position supplementation-order discontinuous-head-position supplementation-antecessive-placement vocative-companion-order',
 linking:'boundary-punctuation vocative-final-i degree marker-profile modifier-adjunctor marked-adjoined-use correlative-pattern adjunctor-distribution state-realization sentence-type same-as-marker negative-introducer degree-marker adversative-marker question-collocation superlative-adverbial incorporated-superlative iuhqui-modifier reduplication-shape ti-class adjunctor-in negative-standard-in ic-relation copula polarity report-adjunctor fuse-quil-mach glottal-variant silent-plural-in exclamatory-personal-pronoun-variant',
 context:'identical-adjoined-clause-ellipsis specificity-domain-restriction left-context rightward-modifier adjoined-function correlation-type rephrase-axis principal-intervener-use wish-realizability contextual-silent-first-person vocative-companion rumor-mach deletion-kind speech-directness',
};
const addresses=Object.freeze(Object.fromEntries(Object.entries(roles).flatMap(([role,ids])=>ids.split(' ').map(id=>[id,`clause-${role}`]))));
export const CLAUSE_CHOICE_LABELS=Object.freeze({'clause-relation':'Relationship','clause-reference':'Reference and contact','clause-order':'Order and scope','clause-linking':'Linking and realization','clause-context':'Context and ellipsis','clause-additional':'Other clause choices'});
export const CLAUSE_CHOICE_ORDER=Object.freeze(Object.keys(CLAUSE_CHOICE_LABELS));
export function clauseDecisionSlot(id){return addresses[id]||'clause-additional';}

// Preserve native collectors and listeners while giving their secondary
// capture/inspection surface the same parts → relationship → whole rhythm.
export function organizeClauseWorkflow(doc,workflow){
 if(!workflow)return;
 const group=(key,label,nodes)=>{
  nodes=nodes.filter(Boolean);if(!nodes.length)return;
  let section=workflow.querySelector(`:scope > [data-clause-workflow-part="${key}"]`);
  if(!section){section=doc.createElement('section');section.dataset.clauseWorkflowPart=key;section.className='composition-clause-section';
   const heading=doc.createElement('h3');heading.className='composition-formula-slot__heading';heading.textContent=label;section.append(heading);nodes[0].before(section);}
  for(const node of nodes)if(node.parentElement!==section)section.append(node);
  return section;
 };
 const entry=workflow.querySelector('[data-classical-clause-relation-entry-choice]');
 if(entry){const old=entry.previousElementSibling;if(old?.classList.contains('classical-clause-relation-workflow__section-heading'))old.hidden=true;const part=group('relationship','Relationship',[entry]);const fields=[...entry.querySelectorAll('[data-classical-clause-relation-decision-field]')];if(part)part.hidden=fields.length>0&&fields.every(field=>field.hidden);}
 const marker=workflow.querySelector('[data-classical-clause-relation-marker-result-choice]');
 const markerStatus=workflow.querySelector('[data-classical-clause-relation-marker-result-status]');
 group('linking','Linking and realization',[marker,markerStatus]);
 const cards=workflow.querySelector('[data-classical-clause-relation-captures]');
 const facts=workflow.querySelector('[data-classical-clause-relation-current-result]');
 const actions=cards?.previousElementSibling?.classList.contains('classical-whole-canvas-actions')?cards.previousElementSibling:null;
 group('clauses','Captured clauses',[facts,actions,cards]);
 const choices=workflow.querySelector('[data-classical-clause-relation-decision-surface="unresolved-semantic-choices-only"]');
 if(choices){
  const fields=[...choices.querySelectorAll('[data-classical-clause-relation-decision-field]')];
  for(const key of CLAUSE_CHOICE_ORDER){
   const members=fields.filter(field=>clauseDecisionSlot(field.dataset.classicalClauseRelationDecisionField)===key);
   let section=choices.querySelector(`:scope > [data-clause-native-slot="${key}"]`);
   if(!section&&members.length){section=doc.createElement('section');section.dataset.clauseNativeSlot=key;section.className='composition-clause-section';const heading=doc.createElement('h3');heading.className='composition-formula-slot__heading';heading.textContent=CLAUSE_CHOICE_LABELS[key];section.append(heading);choices.append(section);}
   if(section){for(const field of members)if(field.parentElement!==section)section.append(field);section.hidden=!members.some(field=>!field.hidden);}
  }
  const visible=fields.some(field=>!field.hidden);
  const heading=choices.previousElementSibling;if(heading?.classList.contains('classical-clause-relation-workflow__section-heading'))heading.hidden=!visible;
  choices.hidden=!visible;
 }
 const derived=workflow.querySelector('[data-classical-clause-relation-derived]');
 if(derived){
  let details=workflow.querySelector(':scope > [data-clause-workflow-structure]');
  if(!details){const old=derived.previousElementSibling;if(old?.classList.contains('classical-clause-relation-workflow__section-heading'))old.hidden=true;
   details=doc.createElement('details');details.className='composition-disclosure composition-clause-structure';details.dataset.clauseWorkflowStructure='true';
   const summary=doc.createElement('summary');summary.textContent='Structure';details.append(summary);workflow.append(details);}
  if(derived.parentElement!==details)details.append(derived);
 }
 // These stable parts are navigation/presentation only; leave owner status,
 // execution buttons and canonical Result sections in their native workflow.
 const entryPart=workflow.querySelector('[data-clause-workflow-part="relationship"]');
 const clauses=workflow.querySelector('[data-clause-workflow-part="clauses"]');
 if(entryPart&&clauses&&clauses.nextElementSibling!==entryPart)clauses.after(entryPart);
}

// A retained whole clause is not the old stem editor's nuclear formula.
// Only the exact owner-projected composite can hide this idle presentation;
// selecting its next operation returns control to the native owner surface.
export function presentIdleClauseComposition(doc,context){
 const exact=doc.defaultView?.getActiveClassicalGrammarResultSourceCapture?.()?.canonicalResult;
 const idle=doc.getElementById('classical-capability-navigator')?.dataset.classicalCapabilitySourceRole==='exact-owner-issued-result'
   && !doc.getElementById('classical-capability-navigator-operation')?.value
   && exact && context?.sourceScope===exact
   && context.sources?.some(tree=>tree.exact===exact&&tree.unit==='Clause'&&tree.children?.length>0);
 for(const formula of doc.querySelectorAll('[data-build-formula]')){
  if(idle&&!formula.hidden){formula.hidden=true;formula.dataset.compositionClauseIdle='true';}
  else if(!idle&&formula.dataset.compositionClauseIdle==='true'){formula.hidden=false;delete formula.dataset.compositionClauseIdle;}
 }
}
