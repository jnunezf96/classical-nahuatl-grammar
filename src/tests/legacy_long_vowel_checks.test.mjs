import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {installClassicalShellGlobals} from '../ui/shell/classical_shell.mjs';

const require=createRequire(import.meta.url);
const index=readFileSync(new URL('../../index.html',import.meta.url),'utf8');
const payload=index.match(/<script id="classical-startup-data" type="application\/json">([\s\S]*?)<\/script>/)[1];
const document={getElementById:id=>id==='classical-startup-data'?{textContent:payload}:null,addEventListener(){},querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({})};
const instance=await createRuntimeInstance({documentObject:document,collectModuleInspectionDescriptors:true});
await instance.runtimeObject.loadStaticConstants();
// Inspect the original installed capabilities, including private test APIs.
// Reinstalling a renderer would replace its closures and canonical identities.
const ctx=Object.create(instance.runtimeObject);
Object.defineProperties(ctx,instance.moduleInspectionDescriptors);
installClassicalShellGlobals(ctx);

test('legacy surface checks use the long-vowel interface and retain canonical orthography proof',()=>{
    const result=require('./classical_sgr_orthography_surface.test.js').run(ctx).summarize();
    assert.equal(result.failed,0);
});
test('the affected toy-interface check expects four helpers and no Writing lane',()=>{
    const result=require('./classical_grammar_toy_interface.test.js').runLongVowelInterface().summarize();
    assert.equal(result.failed,0);
});
