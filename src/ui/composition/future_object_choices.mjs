// Presentation of the existing compoundMatrixStem choice. The canonical late
// owner, not this menu, licenses the §28.11 matrix and its finite coordinates.
export function syncFutureObjectChoices(document, state = {}) {
  const native = document?.getElementById('classical-rule-logic-compound-matrix');
  if (!native) return;
  const active = state.lateOperation === 'compound' && state.lateVariant === 'future-embed';
  let menu = document.getElementById('classical-future-object-matrix');
  if (!menu) {
    menu = document.createElement('select');menu.id = 'classical-future-object-matrix';
    menu.dataset.classicalMirrorsControl = native.id;
    menu.setAttribute('aria-label','Future-object matrix');
    for (const [value,label] of [['','Choose a matrix'],['nequi','nequi · want, desire, hope'],['qui','qui · volition · imperfect only']]) {
      const option = document.createElement('option');option.value=value;option.textContent=label;menu.appendChild(option);
    }
    native.after(menu);
    menu.addEventListener('change', () => {
      native.value = menu.value;
      native.dispatchEvent(new document.defaultView.Event('change',{bubbles:true}));
    });
  }
  native.hidden = active;menu.hidden = !active;menu.disabled = !active || native.disabled;
  menu.value = String(state.compoundMatrixStem || '').replace(/^tla-/u,'');
  for (const [id,plain] of [['classical-rule-logic-mood','Mood'],['classical-rule-logic-tense','Tense']]) {
    const label = document.getElementById(id)?.closest('label')?.querySelector('.classical-rule-control__label');
    if (!label) continue;
    const text = Array.from(label.childNodes || []).find(node=>node.nodeType===3 && node.textContent.trim());
    if (text) text.textContent = active ? `Matrix ${plain.toLowerCase()}` : plain;
    else label.textContent = active ? `Matrix ${plain.toLowerCase()}` : plain;
  }
}
