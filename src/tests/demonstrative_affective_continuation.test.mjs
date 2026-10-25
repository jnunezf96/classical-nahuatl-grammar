import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('issued demonstratives fill the affective compound with exact custody',()=>{
 for(const stem of ['īn','ōn']) {
  const source=r.buildClassicalNahuatlPronominalNncSourceFrame({stem});
  const operation=r.buildClassicalNahuatlPronominalNncOperationFrame(source,{subject:'3common',clausePosition:'initial',adjunctorInMode:'none',sentenceType:'statement',polarity:'positive'});
  const parent=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:pronominal',args:[source,operation]}).canonicalResult;
  assert.equal(parent.authorizationStatus,'authorized');
  const request={constructionKind:'affective-nnc',affectiveMatrix:'tzin',affectRoute:'compound',subject:'3sg',state:'absolutive',source:{embedStem:stem,embedClass:'zero',embedSourceClass:'zero',embedConstituent:{kind:'demonstrative-pronominal-nnc',stem,resultFrame:parent}}};
  const a=r.evaluateClassicalNahuatlNominalConstruction(request);
  assert.equal(a.authorizationStatus,'authorized',a.blockReason);
  assert.equal(a.sourceAuthorizationFrame.lexicalFacts.capturedEmbedResult,parent);
  assert.equal(a.wordSurface,stem+'tzin');
  const plural=r.evaluateClassicalNahuatlNominalConstruction({...request,subject:'3pl'});
  assert.equal(plural.wordSurface,stem+'tzitzin');
  assert.equal(plural.sourceAuthorizationFrame.lexicalFacts.capturedEmbedResult,parent);
  const incompatibleSource=r.buildClassicalNahuatlPronominalNncSourceFrame({stem:'yeh'});
  const incompatibleOperation=r.buildClassicalNahuatlPronominalNncOperationFrame(incompatibleSource,{subject:'3sg'});
  const incompatible=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:pronominal',args:[incompatibleSource,incompatibleOperation]}).canonicalResult;
  assert.equal(incompatible.authorizationStatus,'authorized');
  assert.notEqual(r.evaluateClassicalNahuatlNominalConstruction({...request,source:{...request.source,embedConstituent:{...request.source.embedConstituent,resultFrame:incompatible}}}).authorizationStatus,'authorized');
  const binding=r.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',parent);
  assert.ok(binding.bindingIds.includes('affective-nnc:embed-result'));
  for(const bad of [{...parent},{...parent,sourceFrame:{...parent.sourceFrame,stem:'invented'}}]) {
   assert.notEqual(r.evaluateClassicalNahuatlNominalConstruction({...request,source:{...request.source,embedConstituent:{...request.source.embedConstituent,resultFrame:bad}}}).authorizationStatus,'authorized');
   assert.equal(r.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',bad).bindingIds.includes('affective-nnc:embed-result'),false);
  }
 }
});
