// Keeps a user's prior state while the canonical organic reading fixes the
// effective state to possessive. This memory never authorizes a Source or Make.
export function createOrganicPossessionStateCoordinator() {
  const held = new WeakMap();
  return function coordinateOrganicPossessionState(control, {
    active = false, restoreEligible = false, sourceIdentity = null, bindingId = '',
  } = {}) {
    if (!control) return;
    const existing = held.get(control);
    const sameSource = Boolean(sourceIdentity) && existing?.sourceIdentity === sourceIdentity
      && existing.bindingId === bindingId;
    if (active) {
      if (!existing && sourceIdentity) {
        held.set(control, {sourceIdentity, bindingId, value:control.value});
      } else if (existing && !sameSource) {
        // The current control may still carry the old forced value; it is not
        // evidence of a user choice for the newly applied Source.
        held.delete(control);
      }
      control.value = 'possessive';
      return;
    }
    if (existing && sameSource && restoreEligible && control.value === 'possessive') {
      control.value = existing.value;
    }
    held.delete(control);
  };
}
