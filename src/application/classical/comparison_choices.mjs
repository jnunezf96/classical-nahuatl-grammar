import {buildCurrentChoiceFrame} from './current_choice_frame.mjs';
const defaults=Object.freeze({icRelation:'yes',adjunctorIn:'yes',negativeStandardIn:'yes',copula:'no',sentenceType:'none',iuhquiModifier:'none',sameAsMarker:'zan-no-yehhuatl',negativeIntroducer:'in-ahmo-iuhqui',adversativeMarker:'yeceh',questionCollocation:'oc-yeh',superlativeAdverbial:'cencah',incorporatedSuperlative:'cem',superlativePrincipal:'ahcic',principalNnc:'tachcauh',continuationFamily:'bare',position:'preposed'});
export function resolveComparisonChoices(ownerContract,selections={}) {
  if (!ownerContract) return null;
  const operationSelections={comparisonRoute:ownerContract.routeId};
  const recoveries=[];
  const diagnostics=[...(ownerContract.diagnostics||[])];
  for(const fact of ownerContract.facts||[]) {
    operationSelections[fact.key]=fact.value;
    if(selections[fact.key] && selections[fact.key]!==fact.value) {
      diagnostics.push(`classical-comparison-${fact.key}-not-licensed`);
      recoveries.push({key:fact.key,id:fact.key.replace(/[A-Z]/gu,l=>`-${l.toLowerCase()}`),values:[fact.value],selectedValue:'',requestedValue:selections[fact.key],required:true,resolved:false,responsibility:'application-recovery',applicability:'relevant',selectionOrigin:'explicit-user',implementationSupport:'implemented',workflowCompletion:'reset-required',reason:'Reset the previous selection to the value required by this Source',candidates:[{value:fact.value,linguisticJudgment:'licensed',obligation:'owner-fixed',interaction:'selectable-for-recovery'}]});
    }
  }
  const decisions=ownerContract.decisions.map(domain=>{
    const requestedValue=String(selections[domain.key]??'').trim().toLowerCase();
    const defaultValue=defaults[domain.key] ?? (domain.key==='degreeMarker' ? (domain.values.includes('none')?'none':domain.values[0]) : '');
    const candidate=requestedValue||defaultValue;
    const selectedValue=domain.values.includes(candidate)?candidate:'';
    if(domain.applicability!=='inactive') operationSelections[domain.key]=selectedValue;
    return {...domain,requestedValue,selectedValue,
      selectionOrigin:requestedValue?'explicit-user':'application-default',
      defaultPolicy:{value:defaultValue,authority:'application'},
      applicability:domain.applicability||'relevant',required:true,resolved:!!selectedValue,
      implementationSupport:domain.implementationSupport||'implemented',workflowCompletion:'answer-required',
      conditions:domain.key==='icRelation'?['yes-requires-dimension']:[],
      candidates:domain.values.map(value=>({value,linguisticJudgment:'licensed',interaction:domain.applicability==='inactive'?'unavailable':'selectable-for-staging'})),
      reason:'Choice licensed by the canonical comparison owner'};
  });
  return {decisions:[...decisions,...recoveries],operationSelections,diagnostics};
}
export function projectComparisonChoiceFrame({contract, ownerContract, choices, captureRevision, stagedRevision, captures}) {
  const layout=contract.derived.captureSlotLayout;
  return buildCurrentChoiceFrame({familyId:'comparison',routeId:ownerContract.routeId,inputLaneId:'captured-owner-issued-results',
    captureRevision,stagedRevision,decisions:choices.decisions,
    inputs:Object.entries(layout).map(([role,slot])=>({role,slot,
      ...ownerContract.inputs.find(input=>input.slot===slot),
      presence:captures[role]?'captured':'missing'})),
    facts:contract.derived,
    outcome:{operationSelected:true,readyToMake:contract.authorizationStatus==='authorized',
      reasons:contract.diagnostics,scope:'applied-captured-inputs'},
    provenance:{owner:'comparison',sourceReferences:[ownerContract.sourceReference]}});
}
