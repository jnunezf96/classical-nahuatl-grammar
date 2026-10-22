// Presentation settings only. Grammatical domains and availability remain owner-issued.
const SETTINGS = new Set(['target','label','before','after','group','expanded']);
const TARGET = /^(?:id:[A-Za-z][\w:.-]*|disclosure:[\w:.-]+|choice:[\w:.-]+|clause-choice:[\w:.-]+|data:data-[a-z][\w-]*=[^<>\n]+|path:[a-z][\w-]*:[a-z][\w-]*:nth-of-type\([1-9]\d*\)(?:>[a-z][\w-]*:nth-of-type\([1-9]\d*\))*)$/u;
export const EMPTY_INTERFACE_MODEL = Object.freeze({version:1,rules:Object.freeze([])});

export function validateInterfaceModel(model) {
  if (!model || typeof model !== 'object' || Array.isArray(model)) throw new Error('Interface model must be an object.');
  for (const field of Object.keys(model)) if (!['version','rules'].includes(field)) throw new Error(`Unknown model setting: ${field}`);
  if (model.version !== 1 || !Array.isArray(model.rules)) throw new Error('Interface model requires version 1 and a rules array.');
  const targets=new Set();
  const rules=model.rules.map(rule=>{
    if (!rule || typeof rule !== 'object' || Array.isArray(rule)) throw new Error('Each rule must be an object.');
    for (const field of Object.keys(rule)) if (!SETTINGS.has(field)) throw new Error(`Unsupported presentation setting: ${field}`);
    if (!TARGET.test(rule.target || '')) throw new Error(`Unsupported target: ${rule.target}`);
    if (targets.has(rule.target)) throw new Error(`Duplicate target: ${rule.target}`);
    targets.add(rule.target);
    for (const field of ['label','group']) if (field in rule && (typeof rule[field] !== 'string' || !rule[field].trim() || rule[field].length>200)) throw new Error(`${field} must be nonempty text of at most 200 characters.`);
    for (const field of ['before','after']) if (field in rule && (!TARGET.test(rule[field]) || rule[field]===rule.target)) throw new Error(`${field} needs a different stable target.`);
    if (rule.before && rule.after) throw new Error('Choose before or after, not both.');
    if ('expanded' in rule && typeof rule.expanded !== 'boolean') throw new Error('expanded must be boolean.');
    return {...rule};
  });
  // A placement cycle would continuously fight itself on every refresh.
  const dependencies=new Map(rules.map(rule=>[rule.target,rule.before||rule.after]));
  for(const target of targets) {
    const seen=new Set();let current=target;
    while(current && dependencies.has(current)) {
      if(seen.has(current))throw new Error(`Placement cycle involving ${current}`);
      seen.add(current);current=dependencies.get(current);
    }
  }
  return {version:1,rules};
}

export function updateInterfaceModel(current, changes) {
  const model=validateInterfaceModel(current);
  if(!Array.isArray(changes))throw new Error('Changes must be an array.');
  const rules=new Map(model.rules.map(rule=>[rule.target,rule]));
  for(const change of changes) {
    if(change?.remove===true) {
      if(Object.keys(change).some(key=>!['target','remove'].includes(key)) || !TARGET.test(change.target||''))throw new Error('Removal requires only a stable target and remove:true.');
      rules.delete(change.target);
    } else {
      if(!change?.target)throw new Error('Change needs a target.');
      rules.set(change.target,{...rules.get(change.target),...change});
    }
  }
  return validateInterfaceModel({version:1,rules:[...rules.values()]});
}

export function interfaceTargetMatches(ruleTarget, recordTarget) {
  return ruleTarget===recordTarget;
}
