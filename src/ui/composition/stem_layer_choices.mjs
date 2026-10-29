// Presentation only. Nominal incorporation belongs to the formation owner,
// not to the late-VNC enum. Native collectors and inventory addresses survive.
const states = new WeakMap();
const nominalHosts = new WeakMap();
export function syncStemLayerChoices(document, state = {}) {
  const native = document?.getElementById('classical-rule-logic-late-operation');
  if (!native) return;
  let menu = document.getElementById('classical-stem-layer');
  if (!menu) {
    menu = document.createElement('select');
    menu.id = 'classical-stem-layer';
    menu.dataset.buildTaskDisplay = 'true';
    menu.dataset.classicalCompactChoiceDisplay = 'true';
    menu.dataset.classicalMirrorsControl = native.id;
    menu.setAttribute('aria-label', 'Change the verb stem');
    native.after(menu);
    menu.addEventListener('change', () => {
      const current = states.get(menu);
      if (menu.value === 'nominal-incorporation') {
        if (current?.nominalAvailable) current.onNominal?.();
        menu.value = native.value;
        return;
      }
      const option = Array.from(native.options || []).find(option => option.value === menu.value);
      if (!option || option.disabled || option.hidden || native.disabled) {
        menu.value = native.value;
        return;
      }
      native.value = option.value;
      native.dispatchEvent(new document.defaultView.Event('change', {bubbles: true}));
    });
  }
  states.set(menu, state);
  const host = native.closest?.('label');
  if (host) host.htmlFor = menu.id;
  if (host && state.nominalActive && !nominalHosts.has(host)) {
    nominalHosts.set(host, host.hidden);
    host.hidden = true;
    host.setAttribute('aria-hidden', 'true');
  } else if (host && !state.nominalActive && nominalHosts.has(host)) {
    host.hidden = nominalHosts.get(host);
    host.setAttribute('aria-hidden', String(host.hidden));
    nominalHosts.delete(host);
  }
  menu.replaceChildren();
  for (const original of Array.from(native.options || [])) {
    const option = document.createElement('option');
    option.value = original.value;
    option.textContent = original.textContent;
    option.disabled = original.disabled;
    option.hidden = original.hidden;
    option.dataset.inventoryOptionRef = `option:id%3A${native.id}:${encodeURIComponent(original.value)}`;
    menu.append(option);
  }
  const nominal = document.createElement('option');
  nominal.value = 'nominal-incorporation';
  nominal.textContent = state.nominalAvailable ? 'nominal incorporation' : 'nominal incorporation · requires a made verb Result';
  nominal.disabled = !state.nominalAvailable;
  nominal.dataset.inventoryOptionRef = 'option:id%3Aclassical-capability-navigator-operation:grammar%3Anominal-construction';
  nominal.dataset.classicalBindingId = 'nominal-embed:matrix-vnc-result';
  menu.append(nominal);
  menu.value = native.value;
  menu.disabled = native.disabled;
  native.hidden = true;
}
