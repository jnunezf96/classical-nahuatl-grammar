// Presentation only. Preserve every owner field, value, listener and restriction;
// an explicit task selection reveals the relevant choices through normal wiring.
export function syncOperationChoiceGate(doc) {
  const root=doc.getElementById('classical-workbench'),menu=doc.getElementById('classical-build-task');
  if(!root || !menu)return false;
  const selected=Boolean(menu.value && Array.from(menu.options || []).some(option=>
    option.value===menu.value && !option.disabled && !option.hidden && !option.parentElement?.disabled));
  root.dataset.compositionOperationSelected=String(selected);
  const selectors=[
    '#classical-build-choices-heading',
    '#classical-capability-navigator-status','#classical-capability-operation-choices',
    '#classical-capability-operation-plan > .classical-rule-controls-grid',
    '#classical-authority-panel [data-build-formula]',
    '#classical-authority-panel [data-build-owner-slot]',
    '#classical-authority-panel [data-choices-native-field]',
    '#classical-authority-panel [data-choices-native-heading]',
    '#classical-authority-panel [data-workspace-choice-heading]',
    '#classical-authority-panel [data-composition-facts="draft"]',
    '#classical-authority-panel [data-composition-source-subject-facts]',
    '#composition-clause-settings-heading','#composition-reset-choices',
    '#classical-grammar-continuation',
  ];
  for(const node of doc.querySelectorAll(selectors.join(',')))
    node.dataset.compositionOperationGated='true';
  return selected;
}
