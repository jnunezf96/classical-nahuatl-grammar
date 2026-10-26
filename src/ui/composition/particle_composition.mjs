// Andrews §§3.1–3.5: particle material is invariant, not a nuclear Stem/Core.
// Contextual labels only; native choices, Source custody and Make stay native.
const write=(node,value)=>{
  if(!node||node.textContent===value)return;
  const text=[...node.childNodes].find(child=>child.nodeType===3);
  if(text)text.textContent=value;else node.textContent=value;
};
export function presentParticleComposition(doc,{acceptedResult,card,action=''}={}) {
  const plan=doc.getElementById('classical-capability-operation-plan');
  const independent=plan?.dataset.classicalCapabilityOperationId==='particle:result'
    &&plan.dataset.classicalCapabilityTypedSourceBindingOperation==='particle:result';
  write(doc.getElementById('classical-stage-source-heading'),independent?'Retained Source':'Source');
  write(doc.querySelector('.composition-current-source > span'),independent?'Retained Source':'Source');
  const material=plan?.querySelector('[data-build-owner-slot="material"] .composition-formula-slot__heading');
  write(material,independent?'Particle expression':'Inputs and readings');
  // A completed Result edit can return an exact particle as the next Source.
  // Until its next operation is chosen, the basal-unit fallback is not a
  // particle formula. Suppress only this presentation wrapper, never a field.
  const capture=doc.defaultView?.getActiveClassicalGrammarResultSourceCapture?.();
  const idleParticle=doc.getElementById('classical-capability-navigator')?.dataset.classicalCapabilitySourceRole==='exact-owner-issued-result'
    && !doc.getElementById('classical-capability-navigator-operation')?.value
    && doc.defaultView?.isClassicalNahuatlParticleResultFrame?.(capture?.canonicalResult)===true;
  for(const formula of doc.querySelectorAll?.('[data-build-formula]') || []) {
    if(idleParticle && !formula.hidden){formula.hidden=true;formula.dataset.compositionParticleIdle='true';}
    else if(!idleParticle && formula.dataset.compositionParticleIdle==='true'){
      formula.hidden=false;delete formula.dataset.compositionParticleIdle;
    }
  }
  // A pending particle choice must never relabel the old accepted clause, and
  // a pending clause must not relabel the particle still accepted beside it.
  const particle=acceptedResult?.authorizationStatus==='authorized'&&doc.defaultView?.isClassicalNahuatlParticleResultFrame?.(acceptedResult)===true;
  const negative=doc.defaultView?.isClassicalNahuatlNegativeParticleSelectionFrame?.(acceptedResult)===true;
  const unit=negative?'negative prefix':particle?'particle expression':'sentence';
  write(doc.getElementById('composition-result-cue'),negative ? 'This negative prefix needs following material. Continue to attach it to a licensed particle.' : action
    ?`Your accepted ${unit} stays here while you prepare a change.`
    :`Keep this ${unit} or prepare its next change.`);
  write(doc.getElementById('classical-result-outline-structure-analysis-heading'),negative?'Negative prefix':particle?'Particle expression':'Sentence');
  write(card?.querySelector('.classical-result-continuation-card__scope'),action
    ?`Accepted ${unit}`:negative?'Negative prefix':particle?'Particle expression':'Sentence');
}
