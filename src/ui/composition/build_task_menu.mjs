import {getWritingSourcePresentation} from './choice_design.mjs?v=20261022-reset-eligibility-1&writingSource=20261022-1&fixedChoices=20261022-1';
import {getBuildOperationGroup, getBuildOperationOrder, inventoryOptionReference} from './build_navigation_model.mjs?v=20261021-ending-reference-2';

const navigatorId = 'classical-capability-navigator-operation';
const constructionId = 'classical-construction-operation';
// Presentation names only. Native options and their handlers retain admission,
// exact input identity, choice collection and execution authority.
const constructionTasks = {
  'deverbal-nnc': 'Make a noun from a verb',
  'adverbial-nuclear': 'Form an adverbial clause',
  'nominal-embed-vnc': 'Embed a noun in a verb',
  'attitude-vnc': 'Express honorific, reverential or pejorative attitude',
  'compound-nnc': 'Form a nominal compound',
  'affective-nnc': 'Form an affective noun',
  'adjectival-nnc': 'Change quality',
  'cardinal-numeral-nnc': 'Form a cardinal-number construction',
  'calendar-date-nnc': 'Form a calendar date',
  'personal-name-nnc': 'Form a personal name',
  'place-gentilic-nnc': 'Form a place or associated-person name',
  'denominal-vnc': 'Make a verb from a noun',
};
const address = (control, option) => inventoryOptionReference(`id:${control.id}`, option.value);
const available = (control, option) => control && !control.disabled && option && !option.hidden && !option.disabled
  && !option.parentElement?.hidden && !option.parentElement?.disabled;
const directId = construction => construction?.dataset?.classicalSourceUnit === 'nnc' ? 'nnc:ordinary' : 'vnc:application';

export function getBuildTaskRoutes(doc) {
  const navigator = doc.getElementById(navigatorId), construction = doc.getElementById(constructionId);
  const routes = [];
  const writing = getWritingSourcePresentation(doc);
  const writingMode = Boolean(writing), writingOperations = writing?.operationIds;
  for (const control of [navigator, construction]) for (const option of control?.options || []) {
    if (!option.value || option.value === 'none' || !available(control, option)) continue;
    if (writingMode && (control !== navigator || !writingOperations.has(option.value))) continue;
    const native = control === construction;
    const operationId = native ? option.dataset.classicalApplicationOperation : option.value;
    const group = native && ['nominal-embed-vnc', 'compound-nnc'].includes(option.value)
      ? 'Modification and combination' : getBuildOperationGroup(operationId);
    routes.push({control, option, optionRef: address(control, option), aliasRefs: [], operationId, group,
      label: native ? constructionTasks[option.value] || option.textContent : option.textContent,
      order: getBuildOperationOrder(operationId)});
  }
  const neutral = Array.from(construction?.options || []).find(option => option.value === 'none');
  if (!writingMode && available(construction, neutral)) {
    // The reviewed neutral route is direct formation, not a competing task.
    const direct = routes.find(route => route.control === navigator && route.operationId === directId(construction));
    if (direct) direct.aliasRefs.push(address(construction, neutral));
    else routes.push({control: construction, option: neutral, optionRef: address(construction, neutral), aliasRefs: [],
      operationId: directId(construction), group: 'Clauses and sentences', order: -1,
      label: directId(construction) === 'nnc:ordinary' ? 'Make a noun clause' : 'Make a verb clause'});
  }
  let projection = null;
  try {projection = JSON.parse(doc.getElementById('classical-capability-navigator-frame')?.textContent || 'null');} catch {}
  for (let i = routes.length - 1; i >= 0; i--) {
    const route = routes[i];
    if (route.control !== navigator || route.operationId !== 'grammar:nominal-construction') continue;
    const owner = projection?.operations?.find(operation => operation.operationId === route.operationId);
    const concrete = routes.filter(candidate => candidate.control === construction && candidate.operationId === route.operationId);
    // This known, explicitly unbound family only focuses the old selector.
    // Its concrete native tasks are already here. Keep real owner bindings,
    // typed-source matches and future/unknown owner tasks discoverable.
    if (concrete.length > 1 && owner?.ownerBindingFrameValidated === false
      && owner.ownerPreflightFrameValidated === false && owner.ownerInputAcceptanceProven === false
      && owner.sourceIdentityMatched !== true) routes.splice(i, 1);
  }
  // Similar captions/owner IDs do not prove equivalent input lanes. Keep each
  // address and explicitly name the input when both lanes are offered.
  const inputRole = doc.getElementById('classical-capability-navigator')?.dataset.classicalCapabilitySourceRole;
  const editorMaterial = String(doc.getElementById('classical-source-whole')?.value || '').trim();
  for (const route of routes) {
    const overlapping = routes.some(other => other !== route && other.operationId === route.operationId && other.control !== route.control);
    if (route.control === construction && route.option.value !== 'none' && inputRole === 'exact-owner-issued-result') {
      // Choosing a native editor lane can explicitly leave the captured Result.
      // Name its material before the click. Exact-place is an existing owner
      // handoff exception and must not be described as a raw-stem operation.
      route.label += route.option.value === 'place-gentilic-nnc' ? ' · formation choices'
        : ` · Source editor${editorMaterial ? `: ${editorMaterial}` : ''}`;
    } else if (overlapping) route.label += route.control === construction ? ' · formation choices' : ' · current Source';
    if (overlapping && route.control === navigator && inputRole === 'exact-owner-issued-result') {
      route.label = route.label.replace(/ · current Source$/u, ' · current Result');
    }
  }
  return routes.sort((a, b) => a.order - b.order);
}

const intermediateBuildTaskResets = new WeakMap();
export function isIntermediateBuildTaskReset(control, event) {
  const receipt = event && intermediateBuildTaskResets.get(event);
  return Boolean(receipt && receipt.control === control
    && receipt.doc.getElementById(constructionId) === control
    && control.value === 'none' && event.type === 'change');
}

export function activateBuildTask(doc, optionRef, activeRef = '') {
  // Resolve again on every click; a cached display cannot authorize a route.
  const route = getBuildTaskRoutes(doc).find(candidate => candidate.optionRef === optionRef);
  if (!route) return false;
  const construction = doc.getElementById(constructionId);
  const reset = route.control.id === navigatorId && ['nnc:ordinary', 'vnc:application', 'particle:result'].includes(route.operationId)
    && construction?.value && construction.value !== 'none';
  const navigator = doc.getElementById(navigatorId);
  const sameLane = activeRef ? activeRef === optionRef : route.control === (navigator?.value ? navigator : construction);
  if (sameLane && route.control.value === route.option.value && !reset) return false;
  const dispatch = (control, intermediate = false) => {
    const event = new doc.defaultView.Event('change', {bubbles: true});
    if (intermediate) intermediateBuildTaskResets.set(event, {doc, control});
    try { return control.dispatchEvent(event); }
    finally { intermediateBuildTaskResets.delete(event); }
  };
  const intermediateReset = reset && route.operationId === 'vnc:application';
  if (reset) {
    const neutral = Array.from(construction.options).find(option => option.value === 'none');
    if (!available(construction, neutral)) return false;
    construction.value = 'none'; dispatch(construction, intermediateReset);
  }
  const live = getBuildTaskRoutes(doc).find(candidate => candidate.optionRef === optionRef);
  if (!live) {
    // The final route was withdrawn while resetting. Reconcile the cleared
    // state normally because no final navigator event will supply its preview.
    if (intermediateReset) dispatch(construction);
    return false;
  }
  live.control.value = live.option.value;
  dispatch(live.control);
  if (live.control === construction && live.option.value === 'none') {
    const direct = getBuildTaskRoutes(doc).find(candidate => candidate.control.id === navigatorId
      && candidate.operationId === directId(construction));
    if (direct && direct.control.value !== direct.option.value) {
      direct.control.value = direct.option.value;
      dispatch(direct.control);
    }
  }
  return true;
}

export function createBuildTaskMenu(doc) {
  let menu, signature = '', lastSelectedRef = '', activeRef = '', revealedRef = '';
  const selected = routes => {
    const navigator = doc.getElementById(navigatorId), construction = doc.getElementById(constructionId);
    const remembered = routes.find(route => route.optionRef === lastSelectedRef);
    if (remembered?.control === construction && construction.value === remembered.option.value
      && (!navigator?.value || navigator.value === remembered.operationId)) return remembered;
    return routes.find(route => route.control === navigator && route.option.value === navigator.value)
      || routes.find(route => route.control === construction && route.option.value === construction.value) || null;
  };
  return function refresh() {
    const field = doc.getElementById('classical-capability-navigator-field');
    if (!field || !doc.getElementById(constructionId)) return null;
    if (!menu) {
      menu = doc.createElement('select'); menu.id = 'classical-build-task';
      menu.className = 'classical-whole-canvas-choice__control';
      menu.dataset.buildTaskDisplay = 'true'; menu.setAttribute('aria-label', 'Operation');
      menu.dataset.classicalCompactChoiceDisplay = 'true';
      menu.addEventListener('change', event => {
        event.stopPropagation();
        const ref = menu.value;
        if (activateBuildTask(doc, ref, activeRef)) lastSelectedRef = ref;
        refresh();
      });
      field.append(menu);
    }
    // CSS-only suppression keeps original collectors and [hidden] source
    // admission checks intact. Never move the original fields or editors.
    for (const id of [navigatorId, `${navigatorId}-choices`, constructionId]) {
      const node = doc.getElementById(id);
      if (node?.dataset && node.dataset.buildTaskNative !== 'true') node.dataset.buildTaskNative = 'true';
    }
    const stemMenu = doc.getElementById('classical-stem-construction-menu');
    if (stemMenu?.dataset && stemMenu.dataset.buildTaskNative !== 'true') stemMenu.dataset.buildTaskNative = 'true';
    const oldTools = doc.getElementById(`${navigatorId}-choices`)?.parentElement;
    if (oldTools?.dataset && oldTools.dataset.buildTaskNative !== 'true') oldTools.dataset.buildTaskNative = 'true';
    const routes = getBuildTaskRoutes(doc);
    const nextSignature = JSON.stringify(routes.map(route => [route.optionRef, route.label, route.group, route.aliasRefs]));
    if (signature !== nextSignature) {
      signature = nextSignature; menu.replaceChildren();
      const placeholder = doc.createElement('option'); placeholder.value = '';
      placeholder.textContent = routes.length ? 'What would you like to do?' : 'Apply a Source to see available operations';
      menu.append(placeholder);
      const groups = new Map();
      for (const route of routes) {
        let group = groups.get(route.group);
        if (!group) {group = doc.createElement('optgroup'); group.label = route.group; groups.set(route.group, group); menu.append(group);}
        const option = doc.createElement('option'); option.value = route.optionRef; option.textContent = route.label;
        option.dataset.inventoryOptionRef = route.optionRef;
        option.dataset.inventoryMirrorsFieldRef = `id:${route.control.id}`;
        option.dataset.inventoryAliasRefs = JSON.stringify(route.aliasRefs);
        option.dataset.classicalApplicationOperation = route.operationId;
        group.append(option);
      }
    }
    const active = selected(routes);
    activeRef = active?.optionRef || '';
    menu.value = active?.optionRef || ''; menu.disabled = !routes.length;
    if (menu.dataset.inventorySelectedRef !== menu.value) menu.dataset.inventorySelectedRef = menu.value;
    const nativeControl = active?.control.id || '';
    if (menu.dataset.buildTaskControl !== nativeControl) menu.dataset.buildTaskControl = nativeControl;
    if (menu.dataset.buildTaskOperation !== (active?.operationId || '')) menu.dataset.buildTaskOperation = active?.operationId || '';
    // Reveal the existing formation section once on entering a native task.
    // Its conditional controls, ancestry and owner visibility are unchanged;
    // subsequent user disclosure choices are respected.
    const revealKey = `${active?.optionRef || ''}|${doc.getElementById('classical-rule-logic-controls')?.dataset.classicalRuleLogicSurfaceUnit || ''}`;
    if (revealKey !== revealedRef) {
      revealedRef = revealKey;
      if (active?.control.id === constructionId && active.option.value !== 'none') {
        for (const section of doc.querySelectorAll('#classical-rule-logic-controls [data-workspace-domain="formation"]')) {
          if (section.tagName === 'DETAILS' && !section.hidden) section.open = true;
        }
      }
    }
    return active;
  };
}
