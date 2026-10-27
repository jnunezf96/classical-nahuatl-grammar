import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {exportClassicalResultReloadRecipe,replayClassicalResultReloadRecipe} from '../application/classical/result_reload.mjs';
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('actual native place request fields survive replay; unknown authority remains rejected',async()=>{
 const r=await runtime();
 const request={constructionKind:'place-name',formation:'co',usage:'adverbial',subject:'1sg',state:'absolutive',possessor:'3sg',nounClass:'tli-1',pluralConnector:'',animacy:'animate',outputKind:'single',lexicalId:'',extensionKind:'profession',source:{embedStem:'cal',placeStem:'cal',gentilicStem:'cal',matrixStem:'',headStem:'',placeMatrix:'',analysisKind:'',affectiveMatrix:'tzin',lexicalId:''}};
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:place-gentilic',args:[request]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);assert.equal(receipt.canonicalResult.wordSurface,'calco');
 const recipe=exportClassicalResultReloadRecipe(r,{result:receipt.canonicalResult});assert(recipe,'native outputKind must not make authentic calco unsupported');
 const fresh=await runtime(),roots=replayClassicalResultReloadRecipe(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);assert.equal(roots.result.wordSurface,'calco');assert.equal(roots.result.formation,'co');assert.equal(fresh.getClassicalNahuatlPlaceReloadInputs(roots.result).outputKind,'single');
 const bad=JSON.parse(JSON.stringify(recipe));bad.nodes.find(n=>n.type==='formed:place').request.callerAuthority=true;assert.equal(replayClassicalResultReloadRecipe(fresh,bad),null);
 const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const start=source.indexOf('      if (constructionKind === "place-gentilic-nnc") {',source.indexOf('function buildClassicalNominalConstructionUiRequest'));assert(start>=0);assert.match(source.slice(start,source.indexOf('\n      if (constructionKind',start+10)),/outputKind: nncOutputScope/u);
});
