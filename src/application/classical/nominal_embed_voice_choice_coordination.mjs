// A remembered choice is a draft only. The caller must re-query the owner
// before recording or restoring it; it can never authenticate either parent.
export function createNominalEmbedVoiceChoiceCoordinator() {
  let memory = null;
  const sameScope = scope => Boolean(scope && memory
    && scope.matrix === memory.matrix && scope.embed === memory.embed
    && scope.bindingId === memory.bindingId && scope.structure === memory.structure);
  return Object.freeze({
    clear() { memory = null; },
    record(scope, voice, choice, options) {
      if (!scope || !['passive', 'impersonal'].includes(voice) || !choice
        || !options.some(option => option.optionId === choice)) return false;
      memory = Object.freeze({...scope, voice, choice});
      return true;
    },
    resolve(scope, voice, options) {
      if (!sameScope(scope)) { memory = null; return ''; }
      if (voice === 'active') return '';
      if (voice !== memory.voice) { memory = null; return ''; }
      if (!options.some(option => option.optionId === memory.choice)) {
        memory = null;
        return '';
      }
      return memory.choice;
    },
  });
}
