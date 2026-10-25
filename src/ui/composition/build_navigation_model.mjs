// Presentation references from the reviewed organization proposal. This table
// never supplies option values, Source admission, owner readiness, or grammar.
export const BUILD_PURPOSES=Object.freeze([
  {id:'purpose:form-transform-stems',label:'Form or transform stems'},
  {id:'purpose:build-change-clause-particle',label:'Build or change a clause or particle'},
  {id:'purpose:relate-combine-units',label:'Relate or combine units'},
].map(Object.freeze));
const access={
  "nnc:attested-cell": ["Attested nominal clauses",1],
  "nnc:attested-place": ["Attested place clauses",1],
  "clause:attested-collocation": ["Attested clause collocations",1],
  "vnc:sentence-result": [
    "Sentence realization",
    1
  ],
  "nnc:quantitative-predicate": [
    "Quantitative nominal clauses",
    1,
    0
  ],
  "nnc:ordinary": [
    "Nominal clauses",
    1
  ],
  "nnc:sentence-surface": [
    "Sentence expression",
    1
  ],
  "sentence:adverbial-adjunction": [
    "Adverbial modification",
    2
  ],
  "sentence:particle-adjunction": [
    "Particle attachment",
    2
  ],
  "particle:result": [
    "Particles",
    1
  ],
  "particle:negative-selection": [
    "Particles and sentence expression",
    1,
    2
  ],
  "vnc:ordered-voice-application": [
    "Voice transformations",
    1,
    0
  ],
  "nnc:pronominal": [
    "Pronominal nominal clauses",
    1
  ],
  "vnc:derivational-operation": [
    "Verbal formation",
    0,
    1
  ],
  "vnc:application": [
    "Verbal clauses",
    1,
    0
  ],
  "sentence:supplementation": [
    "Reference and supplementation",
    2
  ],
  "grammar:nominal-construction": [
    "Nominal formation and incorporation",
    0,
    1
  ],
  "nnc:deverbal-construction": [
    "Nominal conversion and deverbal formation",
    0,
    1
  ],
  "nnc:adjectival-modification": [
    "Adjectival modification",
    2,
    0
  ],
  "nnc:adverbial": [
    "Adverbialized nuclear clauses",
    1
  ],
  "nnc:relational": [
    "Relational nominal clauses",
    1,
    0
  ],
  "nnc:place-gentilic": [
    "Place and associated-person formations",
    0,
    1
  ],
  "clause:adverbial-adjunction": [
    "Clause adverbial relationships",
    2
  ],
  "clause:composition": [
    "Complementation and conjunction",
    2
  ],
  "clause:comparison": [
    "Comparison",
    2
  ],
  "vnc:denominal": [
    "Denominal verbal formation",
    0,
    1
  ],
  "nnc:personal-name": [
    "Statement reranking as personal name",
    0,
    1,
    2
  ]
};
const menuGroups=[
  ['Clauses and sentences',['vnc:application','nnc:ordinary','nnc:pronominal','nnc:quantitative-predicate','nnc:attested-cell','nnc:attested-place','clause:attested-collocation','vnc:sentence-result','nnc:sentence-surface','vnc:ordered-voice-application']],
  ['Formation and conversion',['vnc:derivational-operation','grammar:nominal-construction','nnc:deverbal-construction','nnc:adverbial','nnc:relational','nnc:place-gentilic','vnc:denominal','nnc:personal-name']],
  ['Modification and combination',['sentence:adverbial-adjunction','sentence:supplementation','nnc:adjectival-modification','clause:adverbial-adjunction','clause:composition','clause:comparison']],
  ['Particles',['particle:result','particle:negative-selection','sentence:particle-adjunction']],
];
const menu=new Map(menuGroups.flatMap(([group,ids],i)=>ids.map((id,j)=>[id,{group,order:i*100+j}])));
const references=new Map(Object.entries(access).map(([id,[family,...members]])=>[id,Object.freeze({
  operationRef:id,optionRef:inventoryOptionReference('id:classical-capability-navigator-operation',id),
  family,purposeRefs:Object.freeze(members.map(i=>BUILD_PURPOSES[i].id)),
  menuGroupRef:`group:${menu.get(id).group}`,menuGroup:menu.get(id).group,
  menuOrder:menu.get(id).order,
})]));
export const getBuildOperationReference=id=>references.get(id)||null;
// One display location per inventory operation. Shared access relationships
// remain references above; they never create duplicate menu options.
export const getBuildOperationGroup=id=>references.get(id)?.menuGroup||'Other operations';
export const getBuildOperationOrder=id=>!id||id==='none'?-1:references.get(id)?.menuOrder??Number.MAX_SAFE_INTEGER;
export function operationInBuildPurpose(id,purpose){
  const reference=references.get(id);
  // Preserve future owner-issued operations until explicitly organized.
  return !reference || !BUILD_PURPOSES.some(p=>p.id===purpose) || reference.purposeRefs.includes(purpose);
}
export function inventoryFieldReference(control,operationId='unselected'){
  const data=control?.dataset||{};
  if(data.inventoryMirrorsFieldRef)return data.inventoryMirrorsFieldRef;
  if(data.classicalMirrorsControl)return `id:${data.classicalMirrorsControl}`;
  if(control?.id)return `id:${control.id}`;
  // These anonymous native buttons already have captured inventory identities.
  // Resolve their exact Source-group context rather than assigning new DOM IDs.
  if(control?.tagName==='BUTTON'&&control.closest?.('#classical-basal-unit-controls')){
    if(data.classicalBasalUnit==='vnc')return 'declared:src/ui/shell/classical_shell.mjs:10';
    if(data.classicalBasalUnit==='nnc')return 'declared:src/ui/shell/classical_shell.mjs:11';
  }
  if(data.classicalCapabilityChoiceId)return `choice:${operationId}:${data.classicalCapabilityChoiceId}`;
  if(data.classicalClauseRelationDecision){
    const decision=data.classicalClauseRelationDecision;
    const clauseOperation=id=>typeof id==='string' && (id.startsWith('clause:')
      || id==='nnc:adjectival-modification' || id==='sentence:supplementation');
    const field=control.closest?.('[data-classical-clause-relation-decision-field]');
    const sameField=field?.dataset.classicalClauseRelationDecisionField===decision;
    const ownerOperation=sameField && field.dataset.classicalCapabilityOperationId;
    if(clauseOperation(ownerOperation))return `clause-choice:${ownerOperation}:${decision}`;
    // A retained compact copy belongs to this same decision field even while
    // another task is active. Its reference is presentation scope, not authority.
    const scopedMirror=sameField && [...(field.querySelectorAll?.('[data-inventory-mirrors-field-ref]')||[])]
      .map(node=>node.dataset.inventoryMirrorsFieldRef)
      .find(ref=>ref.startsWith('clause-choice:') && ref.endsWith(`:${decision}`)
        && clauseOperation(ref.slice('clause-choice:'.length,-decision.length-1)));
    if(scopedMirror)return scopedMirror;
    return clauseOperation(operationId)?`clause-choice:${operationId}:${decision}`:null;
  }
  if(data.classicalClauseRelationMarkerResult)return `clause-marker-result:${operationId}:${data.classicalClauseRelationMarkerResult}`;
  return null;
}
export function inventoryOptionReference(fieldRef,value){return `option:${encodeURIComponent(fieldRef)}:${encodeURIComponent(String(value))}`;}

// Shared presentation only: typed relationships preserve distinct permanent
// coordinates. They do not authorize a value or turn one field into an alias.
export const BUILD_SHARED_CHOICE_RELATIONSHIPS=Object.freeze([
  {from:'choice:vnc:application:admonitivePluralEnding',to:'id:classical-rule-logic-admonitive-plural-ending',relation:'alternative-representation',operationRef:'vnc:application',coordinate:'admonitivePluralEnding',grammarAuthority:false},
  {from:'choice:nnc:ordinary:subject',to:'id:classical-rule-logic-nnc-subject-person',relation:'composed-of-coordinate',operationRef:'nnc:ordinary',coordinate:'person',grammarAuthority:false},
  {from:'choice:nnc:ordinary:subject',to:'id:classical-rule-logic-nnc-subject-number',relation:'composed-of-coordinate',operationRef:'nnc:ordinary',coordinate:'number',grammarAuthority:false},
  {from:'choice:nnc:ordinary:pluralConnector',to:'id:classical-rule-logic-nnc-plural-connector',relation:'alternative-representation',operationRef:'nnc:ordinary',coordinate:'pluralConnector',grammarAuthority:false},
  {from:'id:classical-rule-logic-nnc-plural-connector',to:'id:classical-rule-logic-nnc-subject-number',relation:'realizes-coordinate',operationRef:'nnc:ordinary',coordinate:'number',grammarAuthority:false},
  {from:'id:classical-rule-logic-nnc-plural-connector',to:'id:classical-rule-logic-nnc-state',relation:'conditioned-by-coordinate',operationRef:'nnc:ordinary',coordinate:'state',grammarAuthority:false},
  {from:'id:classical-rule-logic-nnc-plural-connector',to:'id:classical-rule-logic-nnc-class',relation:'conditioned-by-source-field',operationRef:'nnc:ordinary',coordinate:'nounstemClass',grammarAuthority:false},
].map(Object.freeze));

// The interface and its finite inventory use the same caption projection.
export function formatBuildOperationLabel(operationId = "") {
  const actions = {
    "nnc:sentence-surface": "Change sentence type or polarity",
    "nnc:ordinary": "Make a noun clause",
    "nnc:attested-cell": "Use an attested nominal cell",
    "nnc:attested-place": "Use an attested place name",
    "clause:attested-collocation": "Use a clause collocation",
    "nnc:pronominal": "Make a pronoun clause",
    "vnc:application": "Make a verb clause",
    "vnc:sentence-result": "Make a sentence",
    "sentence:supplementation": "Combine Results",
    "sentence:particle-adjunction": "Add a particle",
    "sentence:adverbial-adjunction": "Add a modifier",
    "particle:result": "Make a particle",
    "particle:negative-selection": "Choose a negative expression",
    "nnc:adjectival-modification": "Add a description",
    "nnc:deverbal-construction": "Form a noun construction",
    "vnc:denominal": "Make a verb from a noun",
    "nnc:personal-name": "Form a personal name",
    "nnc:place-gentilic": "Form a place or inhabitant name",
    "nnc:relational": "Build a relational noun",
    "nnc:adverbial": "Form an adverbial clause",
    "vnc:derivational-operation": "Change the verb stem",
    "vnc:ordered-voice-application": "Change voice",
  };
  if (actions[operationId]) return actions[operationId];
  return String(operationId || "")
    .replace(/^grammar:/u, "")
    .replace(/^vnc:/u, "VNC ")
    .replace(/^nnc:/u, "NNC ")
    .replace(/^sentence:/u, "Sentence ")
    .replace(/^clause:/u, "Clause ")
    .replace(/^particle:/u, "Particle ")
    .replace(/[-_:]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim()
    .replace(/^./u, character => character.toUpperCase());
}

