import {buildCurrentChoiceFrame} from './current_choice_frame.mjs';
export const comparisonChoiceRoutes=Object.freeze(['equality-iuhqui','equality-ihuan','similarity-iuhqui-principal']);
export const isCurrentComparisonRoute=route=>comparisonChoiceRoutes.includes(route);
const defaults=Object.freeze({icRelation:'yes',adjunctorIn:'yes',sentenceType:'none',iuhquiModifier:'none'});
export function resolveComparisonChoices(ownerContract,selections={}) {
  if (!ownerContract) return null;
  const operationSelections={comparisonRoute:ownerContract.routeId};
  const decisions=ownerContract.decisions.map(domain=>{
    const requestedValue=String(selections[domain.key]??'').trim().toLowerCase();
    const candidate=requestedValue||defaults[domain.key];
    const selectedValue=domain.values.includes(candidate)?candidate:'';
    operationSelections[domain.key]=selectedValue;
    return {...domain,requestedValue,selectedValue,
      selectionOrigin:requestedValue?'explicit-user':'application-default',
      defaultPolicy:{value:defaults[domain.key],authority:'application'},
      applicability:'relevant',required:true,resolved:!!selectedValue,
      implementationSupport:'implemented',workflowCompletion:'answer-required',
      conditions:domain.key==='icRelation'?['yes-requires-dimension']:[],
      candidates:domain.values.map(value=>({value,linguisticJudgment:'licensed',interaction:'selectable-for-staging'})),
      reason:'Choice licensed by the canonical comparison owner'};
  });
  return {decisions,operationSelections};
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
    provenance:{owner:'comparison',sourceReferences:['Andrews-53.1.7','Andrews-53.3.1-2']}});
}
