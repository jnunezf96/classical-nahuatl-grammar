// Read-only presentation of the current owner contract. Never authorizes a choice.
const words=value=>String(value||'').replace(/([a-z])([A-Z])/gu,'$1 $2').replace(/[-_]/gu,' ').trim();
export function inputLabel(contract,role) {
  const slot=contract?.currentChoiceFrame?.inputs?.find(input=>input.role===role)?.slot
    || contract?.derived?.captureSlotLayout?.[role] || role;
  return slot==='standard'?'comparison standard':words(slot);
}
export function captureRoleLabel(contract, role, fallback=role) {
  return contract?.currentChoiceFrame ? inputLabel(contract, role) : words(fallback);
}
export function clauseReadinessGuidance(contract) {
  if(!contract)return '';
  const missing=contract.missingCaptureRoles||[];
  if(missing.length)return `Add ${missing.map(role=>`the ${inputLabel(contract,role)} Result`).join(' and ')} using the + beside Source. Choose a saved Result, then Use this Result.`;
  const unresolved=contract.unresolvedDecisionIds||[];
  if(unresolved.length)return `Choose ${unresolved.map(words).join(' and ')} under Build.`;
  if(contract.authorizationStatus==='blocked') {
    const reasons=[contract.blockReason,...(contract.diagnostics||[])].filter(Boolean).join(' ');
    if(reasons.includes('resemblance-standard-object-agreement-required'))return 'Choose a standard whose person and number match the verb’s object, or change the verb’s object first.';
    if(reasons.includes('objective-resemblance-verbstem-source-required'))return 'Use a resemblance verb clause with a specific object as the principal Result.';
    return 'These Results do not fit the selected construction. Replace the incompatible Source or choose another construction; your accepted Result is unchanged.';
  }
  if(contract.authorizationStatus==='authorized' && contract.relation
    && contract.currentChoiceFrame?.outcome?.readyToMake!==false)return 'Choices complete. Make Result.';
  return contract.relation?'Review the required choices under Build.':'Choose a construction under Build.';
}
export function normalizeAndrewsReference(value) {
  const text=String(value||'').trim();
  const normalized=text.replace(/^Andrews-(\d)/u,'Andrews §$1');
  return /^Andrews\s+(?:§§?\s*\d|Lessons?\s+\d|Appendix\s+[A-Z])/u.test(normalized)?normalized:'';
}
export function contractReferences(contract) {
  return [...new Set((contract?.currentChoiceFrame?.provenance?.sourceReferences||[])
    .map(normalizeAndrewsReference).filter(Boolean))];
}

// A retained controller draft is not the newly selected operation's Source.
// This is presentation currentness only; the binding getter retains authority.
export function hasCurrentClauseProjection(binding, operation, relation) {
 if(binding?.family!=='clause-relation'||binding.operationId!==operation)return false;
 const owner=binding.ownerBindingFrame;
 if(!owner||!relation)return false;
 const roles=Array.isArray(owner.bindingChoices)?owner.bindingChoices:[];
 if(roles.length)return roles.some(role=>role.id===binding.selectedBindingId&&role.relation===relation);
 return owner.ownerChoicesRequired===false&&owner.relationIds?.includes(relation)===true;
}
