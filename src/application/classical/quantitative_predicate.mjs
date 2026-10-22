// Whole quantitative Source material is a citation, not a nounstem analysis.
// Its use declaration authorizes only the unchanged predicate and its reference.
// No class, stem boundary, or absent morph is inferred from the cited spelling.
export function createClassicalQuantitativePredicateApi() {
  const sources = new WeakSet();
  const operations = new WeakSet();
  const results = new WeakSet();
  const bindings = new WeakSet();
  const freeze = value => {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  };
  const blocked = (kind, blockReason) => freeze({kind, authorizationStatus:'blocked',blockReason});
  const validKeys = (value, keys) => value && typeof value === 'object'
    && Reflect.ownKeys(value).every(key => typeof key === 'string' && keys.includes(key)
      && Object.getOwnPropertyDescriptor(value,key)?.get === undefined);
  const sourceKind = 'classical-nahuatl-quantitative-predicate-source-frame';
  const operationKind = 'classical-nahuatl-quantitative-predicate-operation-frame';
  const resultKind = 'classical-nahuatl-quantitative-predicate-result-frame';

  function buildClassicalNahuatlQuantitativePredicateSourceFrame(input = {}) {
    if (!validKeys(input,['citation','sourceUse','reference'])
      || !['citation','sourceUse','reference'].every(key=>Object.hasOwn(input,key))
      || input.sourceUse !== 'quantitative-predicate' || input.reference !== 'nonanimate-common') {
      return blocked(sourceKind,'whole-quantitative-predicate-analysis-required');
    }
    const citation = typeof input.citation === 'string' ? input.citation.normalize('NFC').trim() : '';
    if (!/^[\p{L}\p{M}]+$/u.test(citation)) return blocked(sourceKind,'single-whole-quantitative-citation-required');
    const frame = freeze({kind:sourceKind,version:1,authorizationStatus:'authorized',blockReason:'',
      citation, sourceUse:'quantitative-predicate', reference:'nonanimate-common',
      familyId:'quantitative-predicate', nounClass:'',classStatus:'unclaimed',decompositionStatus:'unclaimed',
      referenceConstitution:{subject:'3common',animacy:'nonanimate',humanness:'nonhuman',referentCategory:'quantity'},
      sourceAnalysisAuthority:'user-provided-whole-predicate-analysis',
      permittedUse:'unchanged-quantitative-predicate', ordinaryNounCapabilities:false,
      typedSourceAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
    sources.add(frame);
    return frame;
  }
  function isClassicalNahuatlQuantitativePredicateSourceFrame(frame) {
    return Boolean(frame && sources.has(frame) && Object.isFrozen(frame));
  }
  function buildClassicalNahuatlQuantitativePredicateOperationFrame(sourceFrame, selections = {}) {
    if (!isClassicalNahuatlQuantitativePredicateSourceFrame(sourceFrame)) return blocked(operationKind,'issued-quantitative-predicate-source-required');
    if (!validKeys(selections,[])) return blocked(operationKind,'quantitative-citation-does-not-authorize-inflection');
    const frame = freeze({kind:operationKind,version:1,authorizationStatus:'authorized',blockReason:'',sourceFrame,
      use:'unchanged-quantitative-predicate',referenceConstitution:sourceFrame.referenceConstitution,
      nounClass:'',classStatus:'unclaimed',decompositionStatus:'unclaimed',callerSuppliedAuthorityAccepted:false});
    operations.add(frame);
    return frame;
  }
  function isClassicalNahuatlQuantitativePredicateOperationFrame(frame) {
    return Boolean(frame && operations.has(frame) && isClassicalNahuatlQuantitativePredicateSourceFrame(frame.sourceFrame));
  }
  function evaluateClassicalNahuatlQuantitativePredicate(sourceFrame, operationFrame) {
    if (!isClassicalNahuatlQuantitativePredicateSourceFrame(sourceFrame)
      || !isClassicalNahuatlQuantitativePredicateOperationFrame(operationFrame)
      || operationFrame.sourceFrame !== sourceFrame) return blocked(resultKind,'exact-quantitative-source-operation-required');
    const wordSurface = sourceFrame.citation;
    const surfaceRealization = wordSurface[0].toLocaleUpperCase() + wordSurface.slice(1) + '.';
    const formulaRealization = `⟦${sourceFrame.citation}⟧`;
    const frame = freeze({kind:resultKind,version:1,authorizationStatus:'authorized',blockReason:'',sourceFrame,operationFrame,
      quantitativePredicateFrame:{citation:sourceFrame.citation,sourceFrame,operationFrame,
        referenceConstitution:sourceFrame.referenceConstitution,classStatus:'unclaimed',decompositionStatus:'unclaimed'},
      referenceConstitution:sourceFrame.referenceConstitution,nounClass:'',classStatus:'unclaimed',decompositionStatus:'unclaimed',
      wordSurface, surfaceRealization,sentenceSurface:surfaceRealization,embeddedSurface:wordSurface,formulaRealization,sentencePunctuation:'.',
      formulaProjection:{projectionSource:'whole-citation-with-unclaimed-decomposition',formulaRealization},
      writtenProjection:{projectionSource:'exact-whole-quantitative-citation',surfaceRealization},
      savedStateCapability:'deliberately-unsupported',savedStateNote:'Session only',
      typedFrameAuthority:true,formulaStringAuthority:false,surfaceStringAuthority:false,callerSuppliedAuthorityAccepted:false});
    results.add(frame);
    return frame;
  }
  function isClassicalNahuatlQuantitativePredicateResult(frame) {
    return Boolean(frame && results.has(frame) && isClassicalNahuatlQuantitativePredicateSourceFrame(frame.sourceFrame)
      && isClassicalNahuatlQuantitativePredicateOperationFrame(frame.operationFrame)
      && frame.operationFrame.sourceFrame === frame.sourceFrame);
  }
  function issueClassicalNahuatlQuantitativePredicateBindingFrame(exactSourceFrame,selections={}) {
    const operation = buildClassicalNahuatlQuantitativePredicateOperationFrame(exactSourceFrame,selections);
    if (!isClassicalNahuatlQuantitativePredicateOperationFrame(operation)) return blocked('classical-nahuatl-quantitative-predicate-binding-frame',operation.blockReason);
    const frame = freeze({kind:'classical-nahuatl-quantitative-predicate-binding-frame',authorizationStatus:'authorized',
      bindingStatus:'ready',blockReason:'',exactSourceFrame,requiredChoiceIds:[],choiceOptionProjection:{},
      executionArgs:[exactSourceFrame,operation],callerSuppliedAuthorityAccepted:false});
    bindings.add(frame);
    return frame;
  }
  function isClassicalNahuatlQuantitativePredicateBindingFrame(frame) {
    return Boolean(frame && bindings.has(frame) && isClassicalNahuatlQuantitativePredicateSourceFrame(frame.exactSourceFrame)
      && isClassicalNahuatlQuantitativePredicateOperationFrame(frame.executionArgs[1])
      && frame.executionArgs[1].sourceFrame === frame.exactSourceFrame);
  }
  return Object.freeze({buildClassicalNahuatlQuantitativePredicateSourceFrame,isClassicalNahuatlQuantitativePredicateSourceFrame,
    buildClassicalNahuatlQuantitativePredicateOperationFrame,isClassicalNahuatlQuantitativePredicateOperationFrame,
    evaluateClassicalNahuatlQuantitativePredicate,isClassicalNahuatlQuantitativePredicateResult,
    issueClassicalNahuatlQuantitativePredicateBindingFrame,isClassicalNahuatlQuantitativePredicateBindingFrame});
}
