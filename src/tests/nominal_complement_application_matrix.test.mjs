import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
function request(n,m,{orientation='object',kind='considering',subject='3sg',tense='present'}={}){const cp=r.getClassicalNahuatlVncContinuationSourceConstituents(m);const np=r.getClassicalNahuatlNncContinuationSourceConstituents(n);const embedStem=np.predicateStem;return {constructionKind:'nominal-embed-vnc',relation:'complement',orientation,complementKind:kind,subject,mood:'indicative',tense,voice:'active',source:{embedStem,embedClass:np.typedSlotFrame.nounClass,embedSourceClass:n.sourceFrame.sourceClass,embedConstituent:{kind:'ordinary-nnc-predicate',stem:embedStem,resultFrame:n},matrixStem:cp.sourceStem,matrixVerbClass:cp.verbClass,matrixValence:cp.sourceObjectRequests.length?'single-object':'intransitive',matrixConstituent:{kind:'vnc-result',stem:cp.sourceStem,resultFrame:m},subjectReferenceId:'subject',objectReferenceIds:['object'],embedSubjectReferenceId:orientation==='subject'?'subject':'object'}};}
function execute(req){return r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[req]});}
function word(a){assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult.canonicalResult.resultFrame.surfaceRealization;}

test('preferred irregular matrix stays exact through public application envelope in a nominal complement',()=>{
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'teō',sourceClass:'tl-1-a'});
 const op=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3pl',stemFormation:'affinity',pluralConnector:'0-h',humanness:'human'});
 const n=r.requestClassicalOrdinaryNncResult(source,op);
 const m=r.evaluateClassicalNahuatlVncApplication({sourceStem:'mati',verbClass:'B',sourceValence:'specific-projective',subject:'3sg',objectPerson:'3pl',mood:'indicative',tense:'preterit',requestedVoice:'active',requestedDerivation:'direct'});
 assert.equal(m.resultFrame.surfaceRealization,'quimmah');
 let coordinateFrame;
 const buildMatrix=r.buildClassicalNahuatlNominalVncMatrixCoordinateResult;
 r.buildClassicalNahuatlNominalVncMatrixCoordinateResult=frame=>{coordinateFrame=frame;return buildMatrix(frame);};
 const a=execute(request(n,m,{tense:'preterit'}));
 r.buildClassicalNahuatlNominalVncMatrixCoordinateResult=buildMatrix;
 assert.equal(word(a),'quintēteōmah');
 assert.equal(a.canonicalResult.sourceAuthorizationFrame.lexicalFacts.capturedMatrixVncResult,m);
 assert.equal(coordinateFrame.exactMatrixResult,m, 'the whole application remains the original parent');
 assert.equal(coordinateFrame.exactNounResult,n);
 assert.equal(coordinateFrame.matrixCoordinate.resultFrame.selectedMachineryFrame.lesson11ParadigmPlan.selectedStemOverride,'mah');
 assert.equal(m.resultFrame.surfaceRealization,'quimmah', 'the original coordinate remains unchanged');
 assert.equal(r.isClassicalNahuatlNominalVncMatrixCoordinateFrame(coordinateFrame),true);
 assert.equal(buildMatrix({...coordinateFrame}),null, 'a copied coordinate cannot authorize inheritance');
 assert.equal(buildMatrix({...coordinateFrame,coordinate:{...coordinateFrame.coordinate,subject:'2sg'}}),null, 'a forged different coordinate cannot reuse the receipt');
 const copied=request(n,m,{tense:'preterit'});
 copied.source.matrixConstituent.resultFrame={...m};
 assert.equal(r.evaluateClassicalNahuatlNominalConstruction(copied).authorizationStatus,'blocked', 'canonical owner rejects the same copied parent');
 assert.throws(()=>execute(copied),/classical-grammar-application-request-invalid/, 'a copied whole parent cannot become a nominal source');
 assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[copied]})),false);
});
