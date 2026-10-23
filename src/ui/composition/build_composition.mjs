// Build presentation only. Preserve native collectors, values and owner domains.
export function orderVncSubjectFields(section) {
  if(!section)return;
  const order=['subject-person','subject-number','subject-animacy','subject-humanness'];
  const fields=order.map(key=>section.querySelector(`[data-classical-vnc-authority-order="${key}"]`)).filter(Boolean);
  for(const host of new Set(fields.map(field=>field.parentElement))){
    const wanted=fields.filter(field=>field.parentElement===host);
    for(let i=0;i<wanted.length;i++){
      const current=[...host.children].filter(field=>wanted.includes(field));
      if(current[i]!==wanted[i])host.insertBefore(wanted[i],current[i]);
    }
  }
}

const NNC_OPTION_LABELS={
  predicateFormation:{'source-stem':'Source stem','yo-matrix':'Yō matrix','secondary-general-use':'Secondary general-use stem','analogical-restricted-use':'Analogical restricted-use stem'},
  stemFormation:{plain:'Plain',affinity:'Affinity','distributive-varietal':'Distributive / varietal'},
};
export function presentNncBuildOptions(field,control,choice) {
  const labels=NNC_OPTION_LABELS[choice];if(!labels)return;
  for(const option of control.options||[])if(labels[option.value]&&option.textContent!==labels[option.value])option.textContent=labels[option.value];
  for(const button of field.querySelectorAll('[data-composition-choice-value]')){
    const label=labels[button.dataset.compositionChoiceValue];if(label&&button.textContent!==label)button.textContent=label;
  }
}
