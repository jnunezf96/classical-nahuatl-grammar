import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {getSourceClassRequirement} from '../ui/composer/source_admission.mjs';
import {Element} from './helpers/organization_dom.mjs';
import {runClassicalSourceApplyAction, createUiEventsApi} from '../ui/events/events.mjs';

const nonce = JSON.parse(readFileSync(new URL('./fixtures/nonce_double_nucleus_20261024.json', import.meta.url)));
function ordinary(r, stem, sourceClass, selections) {
  const source = r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem, sourceClass});
  const operation = r.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
    predicateFormation: 'source-stem', stemFormation: 'plain', sentenceType: 'statement',
    polarity: 'positive', humanness: 'human', ...selections,
  });
  const result = r.evaluateClassicalNahuatlOrdinaryNnc(source, operation);
  assert.equal(result.authorizationStatus, 'authorized', result.blockReason);
  return result;
}
const morphs = (result, number) => {
  const s = result.typedSlotFrame.slots;
  return [s.subject.pers1, s.subject.pers2,
    ...s.participant.slots.map(x => x.carrier), ...s.state.slots.map(x => x.carrier),
    s.predicate.stem, ...(number ? [s.number.num1, s.number.num2] : [])];
};

test('two-nucleus Source protects full supplement and inner principal person/State, removing only principal Number', async () => {
  const {r} = await createPossessiveFixture(nonce.principal);
  const principal = ordinary(r, nonce.principal, 'tli-1', {subject: '1pl', state: 'possessive', possessor: '2pl'});
  const supplement = ordinary(r, nonce.supplement, 'tl-1-a', {subject: '2pl', state: 'absolutive', pluralConnector: 'm-eh'});
  const source = {principalNncResult: principal, supplementNncResult: supplement,
    supplementationAnalysis: 'fixed-order-possessor-supplementation'};
  const expectedEmbed = [...morphs(supplement, true), ...morphs(principal, false)].join('-');
  for (const subject of ['1sg', '3pl']) {
    const request = {constructionKind: 'double-nucleus-ownerhood', source, subject, state: 'absolutive', animacy: 'animate'};
    const result = r.evaluateClassicalNahuatlDeverbalNnc(request);
    assert.equal(result.authorizationStatus, 'authorized', result.blockReason);
    assert(result.sourceFrame.principalNncResult === principal);
    assert(result.sourceFrame.supplementNncResult === supplement);
    assert.equal(r.isClassicalNahuatlSupplementationFrame(result.sourceFrame.canonicalSupplementationResult), true);
    assert.equal(result.sourceFrame.canonicalSupplementationResult.referenceFrame.headRole, 'possessor');
    assert.equal(result.sourceFrame.sourceStem, expectedEmbed);
    assert.equal(result.operationFrame.targetStems.restrictedUse, `${expectedEmbed}-xo-h-0`, 'the existing x+y abundant boundary assimilates and uses short o');
    assert(result.operationFrame.ownerhoodBoundaryFrame.boundaryPhoneFrames.length > 0);
    const application = {operationId: 'nnc:deverbal-construction', args: [request]};
    assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest(application)), true);
    assert.equal(r.executeClassicalGrammarApplicationRequest(application).authorizationStatus, 'authorized');
    assert.equal(principal.operationFrame.subject, '1pl');
    assert.equal(supplement.operationFrame.subject, '2pl');
    for (const hostileSource of [
      {...source, principalNncResult: {...principal}},
      {...source, supplementNncResult: {...supplement}},
      {...source, supplementationAnalysis: ''},
      {...source, principalNncResult: principal.typedSlotFrame},
      {...source, canonicalSupplementationResult: {...result.sourceFrame.canonicalSupplementationResult}},
    ]) {
      const hostile = {...request, source: hostileSource};
      assert.equal(r.evaluateClassicalNahuatlDeverbalNnc(hostile).authorizationStatus, 'blocked');
      assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest({...application, args: [hostile]})), false);
      let rejected;
      try {
        rejected = r.executeClassicalGrammarApplicationRequest({...application, args: [hostile]}).authorizationStatus !== 'authorized';
      } catch (error) {
        rejected = /classical-grammar-application-request-invalid/.test(error.message);
      }
      assert.equal(rejected, true, 'explicit Make rejects the same incompatible or copied Source');
    }
  }
});

test('native two-nucleus analysis creates independent real noun Sources and requires the chosen analysis', async () => {
  const h = await createPossessiveFixture(nonce.principal);
  h.set('classical-deverbal-nnc-family', 'double-nucleus-ownerhood');
  for (const [id, value] of Object.entries({
    'analysis': 'fixed-order-possessor-supplementation',
    'principal-stem': nonce.principal, 'principal-class': 'tli-1',
    'principal-subject': '1pl', 'principal-state': 'possessive', 'principal-possessor': '2pl',
    'principal-plural': '',
    'supplement-stem': nonce.supplement, 'supplement-class': 'tl-1-a',
    'supplement-subject': '2pl', 'supplement-state': 'absolutive', 'supplement-possessor': '3sg',
    'supplement-plural': 'm-eh',
  })) {
    const key = `classical-double-nucleus-${id}`;
    if (!h.controls.has(key)) h.controls.set(key, {id: key, value, dataset: {}, options: [], disabled: false});
    h.set(key, value);
  }
  const request = h.r.buildClassicalNominalConstructionUiRequest();
  assert.equal(request.source.supplementationAnalysis, 'fixed-order-possessor-supplementation');
  assert.equal(h.r.isClassicalNahuatlOrdinaryNncResult(request.source.principalNncResult), true);
  assert.equal(h.r.isClassicalNahuatlOrdinaryNncResult(request.source.supplementNncResult), true);
  assert.equal(h.r.isClassicalNahuatlSupplementationFrame(request.source.canonicalSupplementationResult), true);
  assert.equal(request.source.principalNncResult.operationFrame.subject, '1pl');
  assert.equal(request.source.supplementNncResult.operationFrame.subject, '2pl');
  assert.equal(h.r.evaluateClassicalNahuatlDeverbalNnc(request).authorizationStatus, 'authorized');
  h.set('classical-double-nucleus-analysis', '');
  assert.equal(h.r.evaluateClassicalNahuatlDeverbalNnc(h.r.buildClassicalNominalConstructionUiRequest()).authorizationStatus, 'blocked');
});

test('new analyses retain actual compatible supplementation and reject mismatched inner reference', async () => {
  const {r} = await createPossessiveFixture(nonce.principal);
  const principal = ordinary(r, nonce.principal, 'tli-1', {subject: '3sg', state: 'absolutive'});
  const supplement = ordinary(r, nonce.supplement, 'tl-1-a', {subject: '3sg', state: 'possessive', possessor: '1sg'});
  const request = {constructionKind: 'double-nucleus-ownerhood', source: {
    principalNncResult: principal, supplementNncResult: supplement,
    supplementationAnalysis: 'fixed-order-subject-supplementation'},
    subject: '1pl', state: 'absolutive', animacy: 'animate'};
  const result = r.evaluateClassicalNahuatlDeverbalNnc(request);
  assert.equal(result.authorizationStatus, 'authorized', result.blockReason);
  const made = r.executeClassicalGrammarApplicationRequest({operationId: 'nnc:deverbal-construction', args: [request]});
  assert.equal(made.authorizationStatus, 'authorized', made.blockReason);
  assert.equal(result.sourceFrame.canonicalSupplementationResult.referenceFrame.headRole, 'subject');
  assert.deepEqual(result.sourceFrame.orderedInnerMorphs.supplement, morphs(supplement, true));
  const mismatched = ordinary(r, nonce.supplement, 'tl-1-a', {subject: '2sg', state: 'absolutive'});
  for (const source of [
    {...request.source, supplementNncResult: mismatched},
    {...request.source, supplementationAnalysis: 'fixed-order-supplementation'},
    {...request.source, supplementationAnalysis: 'fixed-order-possessor-supplementation'},
    {...request.source, supplementNncResult: mismatched, canonicalSupplementationResult: result.sourceFrame.canonicalSupplementationResult},
  ]) assert.equal(r.evaluateClassicalNahuatlDeverbalNnc({...request, source}).authorizationStatus, 'blocked');
  const normalized = r.getClassicalNahuatlDeverbalNncReloadInputs(result);
  assert(normalized.source.principalNncResult === principal);
  assert(normalized.source.supplementNncResult === supplement);
  assert(normalized.source.canonicalSupplementationResult === result.sourceFrame.canonicalSupplementationResult);
});

test('native Source sync keeps conditional inner choices tied to their own nucleus', async () => {
  const h = await createPossessiveFixture(nonce.principal);
  for (const role of ['principal', 'supplement']) {
    h.set(`classical-double-nucleus-${role}-stem`, role === 'principal' ? nonce.principal : nonce.supplement);
    h.set(`classical-double-nucleus-${role}-class`, role === 'principal' ? 'tli-1' : 'tl-1-a');
  }
  h.set('classical-double-nucleus-principal-subject', '3common');
  h.set('classical-double-nucleus-principal-state', 'possessive');
  h.set('classical-double-nucleus-supplement-subject', '3pl');
  h.set('classical-double-nucleus-supplement-state', 'absolutive');
  const text = readFileSync(new URL('../ui/rendering/rendering.mjs', import.meta.url), 'utf8');
  const start = text.indexOf('    function syncClassicalDoubleNucleusSourceControls(');
  const end = text.indexOf('\n    function ', start + 1);
  const ctx = vm.createContext({targetObject: {...h.r, document: h.documentObject}});
  vm.runInContext(text.slice(start, end), ctx);
  ctx.syncClassicalDoubleNucleusSourceControls(true);
  assert.equal(h.controls.get('classical-double-nucleus-principal-possessor').disabled, false);
  assert.equal(h.controls.get('classical-double-nucleus-principal-plural').disabled, true);
  assert.equal(h.controls.get('classical-double-nucleus-principal-humanness').value, 'nonhuman');
  assert.equal(h.controls.get('classical-double-nucleus-principal-humanness').disabled, true);
  assert.equal(h.controls.get('classical-double-nucleus-supplement-possessor').disabled, true);
  assert.equal(h.controls.get('classical-double-nucleus-supplement-plural').disabled, false);
});

test('trusted legacy slot operands retain their real parents, and shared abundant morphology matches ordinary ownerhood', async () => {
  const {r} = await createPossessiveFixture(nonce.principal);
  const parents = [];
  for (const [index, subject] of ['3sg', '3sg'].entries()) {
    const vnc = r.evaluateClassicalNahuatlVncApplication({sourceStem: `${nonce.supplement}${index ? "chi" : "za"}`,
      verbClass: 'B', sourceValence: 'projective-nonhuman', subject, mood: 'indicative', tense: 'preterit',
      requestedDerivation: 'direct', requestedVoice: 'active'});
    assert.equal(vnc.authorizationStatus, 'authorized', vnc.blockReason);
    const nnc = r.evaluateClassicalNahuatlDeverbalNnc({constructionKind: 'predicate-nominalization',
      nominalizationKind: 'preterit-agentive', canonicalVncResult: vnc.resultFrame,
      subject, state: 'absolutive', animacy: 'animate'});
    assert.equal(nnc.authorizationStatus, 'authorized', nnc.blockReason);
    parents.push(nnc);
    const incompatible = r.evaluateClassicalNahuatlDeverbalNnc({constructionKind: 'double-nucleus-ownerhood',
      source: {principalNncResult: vnc.resultFrame, supplementNncResult: nnc,
        supplementationAnalysis: 'fixed-order-possessor-supplementation'}, subject: '3sg', state: 'absolutive'});
    assert.equal(incompatible.authorizationStatus, 'blocked', 'an issued VNC cannot masquerade as an inner NNC');
  }
  const request = {constructionKind: 'double-nucleus-ownerhood', source: {
    principalNncFrame: parents[0].canonicalResult.nncSlotFrame,
    supplementNncFrame: parents[1].canonicalResult.nncSlotFrame,
    lexicalizedFixedOrder: true}, subject: '3sg', state: 'possessive', possessor: '1sg', animacy: 'animate'};
  const result = r.evaluateClassicalNahuatlDeverbalNnc(request);
  assert.equal(result.authorizationStatus, 'authorized', result.blockReason);
  const made = r.executeClassicalGrammarApplicationRequest({operationId: 'nnc:deverbal-construction', args: [request]});
  assert.equal(made.authorizationStatus, 'authorized', made.blockReason);
  assert(result.sourceFrame.principalNncResult === parents[0]);
  assert(result.sourceFrame.supplementNncResult === parents[1]);
  assert.equal(r.evaluateClassicalNahuatlDeverbalNnc({...request, source: {...request.source,
    principalNncFrame: {...request.source.principalNncFrame}}}).authorizationStatus, 'blocked');
  for (const stem of [nonce.principal, nonce.supplement]) {
    const ownerhood = r.evaluateClassicalNahuatlDeverbalNnc({constructionKind: 'ownerhood',
      source: {sourceStem: stem, nounClass: 'tl', nounSubclass: '1-a', ownerhoodMatrix: 'yō-ā'},
      subject: '3sg', state: 'absolutive', animacy: 'animate'});
    assert.equal(ownerhood.authorizationStatus, 'authorized', ownerhood.blockReason);
    assert.equal(ownerhood.operationFrame.targetStems.restrictedUse,
      `${stem}-${stem.endsWith('x') ? 'xo' : 'yo'}-h-0`);
  }
});

test('two-nucleus Source admits without an unrelated main stem/class and remains explicit before Make', async () => {
  const h = await createPossessiveFixture('');
  h.set('classical-rule-logic-class', '');
  h.set('classical-rule-logic-nnc-class', '');
  h.set('classical-construction-operation', 'none');
  h.set('classical-deverbal-nnc-family', 'predicate-nominalization');
  const element = tag => {
    const node = new Element(tag); node.style = {};
    node.removeAttribute = name => {delete node.attributes[name];};
    node.classList.remove = name => {node.className = node.className.split(/\s+/).filter(x => x !== name).join(' ');};
    node.classList.toggle = (name, force) => {
      const selected = force ?? !node.classList.contains(name);
      if (selected) node.classList.add(name); else node.classList.remove(name); return selected;
    };
    Object.defineProperty(node, 'selectedOptions', {get: () => node.options.filter(option => option.value === node.value)});
    return node;
  };
  // Use the established DOM fixture for the real Apply/visibility path;
  // the simple native collector's scalar nodes intentionally lack DOM edits.
  for (const [id, original] of h.controls) {
    const node = element(original.tagName.toLowerCase()); node.id = id;
    for (const key of ['value', 'disabled', 'hidden', 'checked', 'type']) if (key in original) node[key] = original[key];
    Object.assign(node.dataset, original.dataset);
    for (const originalOption of original.options || []) {
      const option = element('option'); Object.assign(option, originalOption); node.append(option);
    }
    h.controls.set(id, node);
  }
  const root = element('div'); root.id = 'classical-source-parts';
  root.dataset = {classicalSourcePartsMode: 'whole-stem', classicalSourceCommitState: 'pending'};
  root.dispatchEvent = () => {};
  h.controls.set(root.id, root);
  h.documentObject.createElement = element;
  h.documentObject.body = element('body');
  const group = element('section'); group.id = 'classical-double-nucleus-source';
  h.controls.set(group.id, group);
  const row = element('div'); row.className = 'classical-source-parts__commit-row';
  const apply = element('button'); apply.id = 'verb-entry-apply'; row.append(apply); const lane = element('div'); lane.className = 'classical-source-path-lane'; lane.append(row); root.append(lane);
  h.controls.set(apply.id, apply);
  const sourceUse = h.controls.get('classical-rule-logic-nnc-source-use');
  const units = element('div'); units.id = 'classical-basal-unit-controls'; units.dataset.classicalBasalUnit = 'nnc'; h.controls.set(units.id, units);
  h.r.window = {location: {search: '', hash: '', pathname: '/'}, setTimeout, addEventListener() {}};
  h.documentObject.querySelectorAll = selector => selector === '[data-classical-rule-logic-control]' ? [sourceUse] : [];
  h.r.initVerbScreenCalculator();
  assert(sourceUse.listeners.change?.length, 'the actual native Source chooser listener is installed');
  sourceUse.value = 'two-nucleus-nnc';
  const entryEvent = {type: 'change', target: sourceUse};
  for (const listener of sourceUse.listeners.change) listener(entryEvent);
  assert.equal(h.controls.get('classical-construction-operation').value, 'deverbal-nnc', 'Source entry explicitly exposes the ownerhood operation');
  assert.equal(h.controls.get('classical-deverbal-nnc-family').value, 'double-nucleus-ownerhood');
  assert.equal(root.dataset.classicalSourceCommitState, 'pending');
  for (const [key, value] of Object.entries({
    'analysis': 'fixed-order-possessor-supplementation',
    'principal-stem': nonce.principal, 'principal-class': 'tli-1',
    'principal-subject': '1pl', 'principal-state': 'possessive', 'principal-possessor': '2pl',
    'supplement-stem': nonce.supplement, 'supplement-class': 'tl-1-a',
    'supplement-subject': '2pl', 'supplement-state': 'absolutive', 'supplement-plural': 'm-eh',
  })) h.set(`classical-double-nucleus-${key}`, value);
  assert.equal(h.r.getClassicalDoubleNucleusSourceDraft?.()?.ready, true);
  assert.equal(getSourceClassRequirement(h.r), null);
  const workbench = element('section'); workbench.id = 'classical-workbench'; h.controls.set(workbench.id, workbench);
  const mirror = element('input'); mirror.id = 'verb'; h.controls.set(mirror.id, mirror);
  const frames = [];
  h.documentObject.defaultView = {requestAnimationFrame: callback => frames.push(callback), setTimeout: callback => frames.push(callback)};
  const nativeQuery = h.documentObject.querySelectorAll;
  h.documentObject.querySelectorAll = selector => selector === '#classical-source-panel input, #classical-source-panel select'
    ? [...h.controls.values()].filter(node => node.tagName === 'INPUT' || node.tagName === 'SELECT') : nativeQuery(selector);
  const events = createUiEventsApi(h.r);
  assert.equal(runClassicalSourceApplyAction(h.r, () => events.applyVerbEntryInputNow()), true);
  while (frames.length) frames.shift()();
  assert.equal(h.controls.get('classical-source-whole').value, '', 'no fabricated combined main stem');
  assert.equal(root.dataset.classicalSourceCommitState, 'committed');
  const presentationText = readFileSync(new URL('../ui/rendering/rendering.mjs', import.meta.url), 'utf8');
  const presentationContext = vm.createContext({targetObject: h.r, ClassicalWritingSourceMode: false,
    getClassicalDoubleNucleusSourceDraft: h.r.getClassicalDoubleNucleusSourceDraft});
  for (const name of ['normalizeClassicalNahuatlMachinerySourceValue', 'getClassicalGrammarDependencyPresentationState']) {
    const start = presentationText.indexOf(`    function ${name}(`);
    const end = presentationText.indexOf('\n    function ', start + 1);
    vm.runInContext(presentationText.slice(start, end), presentationContext);
  }
  assert.equal(presentationContext.getClassicalGrammarDependencyPresentationState().state, 'ready', 'Build uses the actual applied two-nucleus Source with a blank mirror');
  const committedSignature = h.r.ClassicalSourcePartsCommittedSignature;
  const committed = JSON.parse(committedSignature);
  assert.equal(committed.mode, 'two-nucleus-nnc');
  assert(group.parentElement === lane, 'the actual cards follow the Source action lane, not an assumed root');
  assert(lane.children.indexOf(group) < lane.children.indexOf(row), 'all Source inputs precede their actual Apply row');
  assert(committed.caption.includes(nonce.principal));
  const signature = h.r.getClassicalSourcePartsEvaluationSignature();
  h.set('classical-rule-logic-nnc-possessor', '1sg');
  assert.equal(h.r.getClassicalSourcePartsEvaluationSignature(), signature, 'outer Build possession does not rewrite inner Source');
  h.set('classical-double-nucleus-principal-possessor', '1sg');
  assert.notEqual(h.r.getClassicalSourcePartsEvaluationSignature(), signature, 'an inner Source edit is a new pending Source');
  assert.equal(h.r.ClassicalSourcePartsCommittedSignature, committedSignature, 'draft edits keep the exact applied Source caption and selections');
  assert.equal(h.r.commitClassicalSourcePartsEvaluation({source: 'manual-entry', force: true}), false, 'incompatible shared reference cannot be applied');
  assert.equal(h.r.ClassicalSourcePartsCommittedSignature, committedSignature);
});
