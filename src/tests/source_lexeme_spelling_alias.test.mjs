import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/composer/composer.mjs',import.meta.url),'utf8');
const ctx=vm.createContext({targetObject:r,normalizeClassicalFuenteSourcePartStem:s=>String(s).trim(),stripClassicalSourceDisplayWrapping:s=>s,getClassicalCanonicalSourceStemInventory:u=>r.getClassicalNahuatlCanonicalSourceStemInventory(u)});
for(const name of ['getClassicalVncSourceLexemeRecord','buildClassicalVncSourceLexemeSelectionFrame']){const start=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+1)),ctx);}
test('source meaning choices follow canonical accepted stem spellings and retain lexical validation',()=>{
 const canonical=r.resolveClassicalNahuatlCanonicalSourceStemRecord({enteredStem:'pach-i-hui',basalUnit:'vnc',valence:'intransitive'});
 assert(canonical);
 for(const stem of ['pach-i-hui','pachi-hui','pachihui']){
  assert.equal(ctx.getClassicalVncSourceLexemeRecord(stem,'intransitive'),canonical,stem);
  const missing=ctx.buildClassicalVncSourceLexemeSelectionFrame(stem,'','intransitive');
  assert.equal(missing.sourceLexemeSelectionRequired,true,stem);
  assert.equal(missing.blockReason,'canonical-source-lexeme-selection-required');
  for(const id of canonical.sourceLexemeIds)assert.equal(ctx.buildClassicalVncSourceLexemeSelectionFrame(stem,id,'intransitive').authorizationStatus,'authorized');
  assert.equal(ctx.buildClassicalVncSourceLexemeSelectionFrame(stem,'forged','intransitive').authorizationStatus,'blocked');
 }
 assert.equal(ctx.getClassicalVncSourceLexemeRecord('cochi','intransitive'),null);
});
test('the existing Source meaning field exposes both meanings for an accepted alternate spelling',()=>{
 const ids=['','cn-vnc-pachihui-pressed-down','cn-vnc-pachihui-satiated'];
 const choice={value:'',dataset:{},options:ids.map(value=>({value,textContent:value})),setAttribute(){}};
 const field={hidden:true},fact={hidden:true},root={dataset:{}};
 ctx.targetObject={...r,document:{getElementById:()=>({value:'intransitive'})}};
 ctx.getClassicalVncSourceGuideElements=()=>({sourceLexemeFact:fact,sourceLexemeChoiceField:field,sourceLexemeChoice:choice});
 ctx.getClassicalSourcePartControlState=()=>({mode:'whole-stem',sourceWholeStem:'pachi-hui'});
 ctx.CLASSICAL_SOURCE_PARTS_MODE={embedMatrix:'embed-matrix'};
 const start=code.indexOf('    function syncClassicalVncSourceLexemeFact(');vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+1)),ctx);
 ctx.syncClassicalVncSourceLexemeFact(root);
 assert.equal(field.hidden,false);assert.equal(choice.disabled,false);assert.equal(choice.required,true);
 assert.equal(choice.dataset.classicalSourceLexemeStem,'pachi-hui');
 for(const id of ids.slice(1)){choice.value=id;ctx.syncClassicalVncSourceLexemeFact(root);assert.equal(choice.value,id);}
 ctx.getClassicalSourcePartControlState=()=>({mode:'whole-stem',sourceWholeStem:'cochi'});
 ctx.syncClassicalVncSourceLexemeFact(root);
 assert.equal(field.hidden,true);assert.equal(choice.disabled,true);assert.equal(choice.value,'');
});
test('Source meaning reaches the canonical collector when source rendering normalizes its spelling',()=>{
 const control={value:'cn-vnc-pachihui-satiated',disabled:false,dataset:{classicalSourceLexemeStem:'pachi-hui'}};
 const field={hidden:false};
 const c=vm.createContext({targetObject:{...r,document:{getElementById:id=>id==='classical-vnc-source-lexeme-choice'?control:id==='classical-vnc-source-lexeme-choice-field'?field:{value:'intransitive'}}},normalizeClassicalNahuatlMachinerySourceValue:s=>String(s)});
 const rendering=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=rendering.indexOf('    function getClassicalRuleLogicSourceLexemeId(');
 vm.runInContext(rendering.slice(start,rendering.indexOf('\n    function ',start+1)),c);
 assert.equal(c.getClassicalRuleLogicSourceLexemeId('pach-i-hui','vnc'),control.value);
 assert.equal(c.getClassicalRuleLogicSourceLexemeId('cochi','vnc'),'');
 field.hidden=true;assert.equal(c.getClassicalRuleLogicSourceLexemeId('pach-i-hui','vnc'),'');
});
test('explicit lexical Source keeps its canonical analysis through direct application and navigation',()=>{
 for(const sourceStem of ['pach-i-hui','pachi-hui','pachihui'])for(const sourceLexemeId of ['cn-vnc-pachihui-pressed-down','cn-vnc-pachihui-satiated']){
  const a=r.requestClassicalVncApplicationResult({sourceStem,sourceLexemeId,verbClass:'B',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedVoice:'active'});
  assert.equal(a.authorizationStatus,'authorized',a.blockReason);
  const s=a.resultFrame.sourceMachineryFrame;
  assert.equal(r.isClassicalNahuatlVncDerivationSourceMachineryFrame(s),true,sourceStem);
  assert.equal(s.canonicalSourceSelectionFrame.sourceLexemeId,sourceLexemeId);
  const nav=r.getClassicalGrammarApplicationCapabilityNavigator(s);
  assert.equal(nav.inputRole,'exact-owner-issued-source');
  assert(nav.operations.some(o=>o.operationId==='vnc:application'&&o.ownerInputAcceptanceProven));
  assert.equal(r.isClassicalNahuatlVncDerivationSourceMachineryFrame({...s}),false);
 }
});
