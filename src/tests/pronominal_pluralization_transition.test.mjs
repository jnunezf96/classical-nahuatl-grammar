import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const source=r.buildClassicalNahuatlPronominalNncSourceFrame({stem:'izqui',embedStem:'iz',matrixStem:'qui'}),nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
const bind=s=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:pronominal',s);
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),ctx=vm.createContext({targetObject:r});
for(const name of ['getClassicalPronominalSpecialHumanTransitionSelections','getClassicalPronominalSubjectTransitionSelections','getClassicalOrdinaryNncNextChoiceProjection','getClassicalPronominalNextChoiceProjection']){const a=code.indexOf(`    function ${name}(`);if(a>=0)vm.runInContext(code.slice(a,code.indexOf('\n    function ',a+1)),ctx);}
test('izqui deliberate stem pluralization withdraws recognized obsolete ending, preserving strict requests',()=>{
 const old=bind({subject:'1pl',numberForm:'silent-silent'});assert.equal(old.bindingStatus,'ready');
 const candidate={...old.callerSelections,predicatePluralization:'plain-variant'};
 assert.notEqual(bind(candidate).bindingStatus,'ready','complete contradictory pair remains rejected');
 const projected=ctx.getClassicalOrdinaryNncNextChoiceProjection(old);
 assert.equal(projected.predicatePluralization.find(o=>o.optionId==='plain-variant').availabilityStatus,'available');
 const next=ctx.getClassicalPronominalSubjectTransitionSelections(old,candidate,'predicatePluralization');assert.equal(Object.hasOwn(next,'numberForm'),false);
 const ready=bind(next);assert.equal(ready.bindingStatus,'ready');assert.equal(ready.exactSource,source);assert.equal(ready.effectiveSelections.numberForm,'m-eh');assert.equal(old.callerSelections.numberForm,'silent-silent');
 const back={...ready.callerSelections,numberForm:'m-eh'};const explicit=bind(back),restored=ctx.getClassicalPronominalSubjectTransitionSelections(explicit,{...back,predicatePluralization:'internal-n'},'predicatePluralization');assert.equal(Object.hasOwn(restored,'numberForm'),false);assert.equal(bind(restored).bindingStatus,'ready');
});
test('invented endings and copied bindings cannot use transition cleanup',()=>{
 const old=bind({subject:'1pl',numberForm:'silent-silent'});for(const [b,q] of [[old,{...old.callerSelections,numberForm:'invented',predicatePluralization:'plain-variant'}],[{...old},{...old.callerSelections,predicatePluralization:'plain-variant'}]])assert.equal(JSON.stringify(ctx.getClassicalPronominalSubjectTransitionSelections(b,q,'predicatePluralization')),JSON.stringify(q));
});
