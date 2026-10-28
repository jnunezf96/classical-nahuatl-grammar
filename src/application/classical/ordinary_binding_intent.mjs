import {stageOrdinaryNncDependencies} from './participant_choice_coordination.mjs';

// Immutable, nonauthorizing intent; the construction session owns currentness.
const memories = new WeakMap();

export function stageOrdinaryBindingIntent(owner, {source, selections = {},
 previousSelections = null, previousMemory = null, choiceId = '',
 explicitValidated = false, bindingId = ''} = {}) {
 const previous = previousMemory && memories.get(previousMemory);
 if (previousMemory && (!previous || previous.owner !== owner
  || previous.source !== source || previous.bindingId !== bindingId)) {
  return Object.freeze({active:Object.freeze({...selections}), memory:null, invalid:true});
 }
 const staged = stageOrdinaryNncDependencies(owner, source, selections, {
  previousSelections, previousMemory:previous?.dependencies || null, choiceId, explicitValidated,
 });
 const memory = staged.memory ? Object.freeze({kind:'ordinary-binding-intent-memory'}) : null;
 if (memory) memories.set(memory, Object.freeze({owner, source, bindingId, dependencies:staged.memory}));
 return Object.freeze({active:staged.active, memory, invalid:staged.invalid});
}
