// A description for presentation. Never a credential or a substitute for owner validation.
export function buildCurrentChoiceFrame(record) {
  if (!record?.familyId || !record.routeId || !Array.isArray(record.decisions)
    || !Array.isArray(record.inputs) || typeof record.outcome?.readyToMake !== 'boolean')
    throw new TypeError('current-choice-frame-contract-required');
  const freeze = value => {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);return Object.freeze(value);
  };
  return freeze({schemaVersion:1, ...record, executionAuthority:false});
}
