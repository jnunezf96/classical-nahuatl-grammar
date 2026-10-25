import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

test('selected name vocative points to the existing explicit continuation without pretending Make finishes it',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=code.indexOf('    function syncClassicalPersonalNameSentenceControls(');
 const end=code.indexOf('    function getClassicalPersonalNameSentenceSelection(',start);
 const element=()=>({value:'',children:[],dataset:{},setAttribute(){},appendChild(n){this.children.push(n)},replaceChildren(){this.children=[]},get options(){return this.children},closest(){return this.wrapper}});
 const reranking=element(),sentence=element(),status=element();sentence.wrapper={setAttribute(){}};
 reranking.value='personal-name';sentence.value='vocative-collocation';
 const nodes={'classical-personal-name-reranking':reranking,'classical-personal-name-sentence-operation':sentence,'classical-personal-name-sentence-operation-status':status};
 const ctx=vm.createContext({targetObject:{document:{getElementById:id=>nodes[id],createElement:element}},getClassicalPersonalNameOwnerInventory:()=>({inventory:{id:'names'},rerankingValues:['personal-name'],sentenceOperations:[{id:'vocative-collocation',outputKind:'vocative-name-node'},{id:'sentence-name-use',outputKind:'name-clause'}]}),getClassicalPersonalNameChoiceLabel:v=>v.replaceAll('-',' ')});
 vm.runInContext(code.slice(start,end),ctx);
 const selected=ctx.syncClassicalPersonalNameSentenceControls(true);
 assert.equal(selected.operation,'vocative-collocation');assert.equal(sentence.disabled,false);
 assert.match(status.textContent,/Make the name first/);assert.match(status.textContent,/Continue entire Result → Combine Results → Vocative/);assert.match(status.textContent,/speaker/);
 sentence.value='sentence-name-use';ctx.syncClassicalPersonalNameSentenceControls(true);
 assert.doesNotMatch(status.textContent,/Make the name first/,'unrelated sentence routes keep their prior presentation');
});
