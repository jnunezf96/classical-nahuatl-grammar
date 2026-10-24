import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
import{createScriptRuntimeApi}from'../bootstrap/script_runtime.mjs';import{createClassicalShellModule}from'../ui/shell/classical_shell.mjs';
import{loadWorkspaceOrganization}from'../ui/composition/workspace_organization_model.mjs';
import{createRuntimeInstance}from'../runtime/create_runtime.mjs';
import{STATIC_RUNTIME_PATHS}from'../bootstrap/runtime_paths.mjs';
const root=new URL('../../',import.meta.url),index=readFileSync(new URL('index.html',root),'utf8');
const paths=[...Object.values(STATIC_RUNTIME_PATHS),'data/interface_organization.json','data/interface_layout.json'];
const files=Object.fromEntries(paths.map(path=>[path,JSON.parse(readFileSync(new URL(path,root)))]));
const documentFor=payload=>({getElementById:id=>id==='classical-startup-data'?{textContent:JSON.stringify(payload)}:null,defaultView:{fetch:()=>{throw Error('startup must not fetch');}}});
test('page and composition use exactly one main module identity',()=>{
 const page=new URL(index.match(/src="(src\/browser\/main\.mjs[^" ]*)"/)[1],root);
 const composition=new URL('../ui/composition/sentence_composition.mjs',import.meta.url);const code=readFileSync(composition,'utf8');
 const imported=new URL(code.match(/import\s*\{bootstrapPromise\}\s*from\s*['"]([^'"]+)['"]/)[1],composition);
 assert.equal(imported.href,page.href);
});
test('cache-current presentation installers deliver the same deverbal repair as the runtime manifest',()=>{
 const bootstrap=readFileSync(new URL('src/bootstrap/bootstrap.mjs',root),'utf8');
 const runtime=readFileSync(new URL('src/runtime/create_runtime.mjs',root),'utf8');
 for(const path of ['../ui/composer/composer.mjs','../ui/rendering/rendering.mjs','../ui/shell/classical_shell.mjs']){
  const key=code=>{const line=code.split('\n').find(line=>line.includes(`from "${path}?`));assert(line,path);return new URL(line.match(/from "([^"]+)"/)[1],'https://example.invalid/').searchParams.get('deverbalReload');};
  assert(key(runtime),`${path} must carry the repaired Source/reload delivery`);
  assert.equal(key(bootstrap),key(runtime),`${path} bootstrap override must not restore an older editor`);
 }
});
test('the page contains exact authoritative startup data, including presentation models',()=>{
 const raw=index.match(/<script id="classical-startup-data" type="application\/json">([\s\S]*?)<\/script>/)?.[1];assert(raw,'startup data must travel with HTML');
 const payload=JSON.parse(raw);assert.equal(payload.version,1);assert.deepEqual(payload.files,files);
});
test('essential constants load without a request that could remain pending',async()=>{
 const doc=documentFor({version:1,files});let requests=0;const target=Object.create((await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject);Object.defineProperties(target,{document:{value:doc},fetch:{value:()=>{requests++;return new Promise(()=>{});}}});
 const api=createScriptRuntimeApi(target);
 const result=await Promise.race([api.loadStaticConstants(),new Promise(resolve=>setTimeout(()=>resolve('pending'),60))]);
 assert.equal(result,true);assert.equal(requests,0);assert.equal(target.SUBJECT_TOGGLE_ALL,files['data/static_constants.json'].subjectToggleAll);
});
test('organization uses the same embedded model without waiting on its fetch',async()=>{
 const actual=await loadWorkspaceOrganization(documentFor({version:1,files}));assert.deepEqual(actual,files['data/interface_organization.json']);
});
test('footer follows release metadata instead of a copied version',()=>{
 for(const version of ['1.2.14','9.8.7']){
 const doc={addEventListener(){},getElementById:id=>id==='classical-workbench'?{dataset:{classicalGrammarOsVersion:version}}:null};
 const footer=createClassicalShellModule({document:doc}).ClassicalFooter();assert(footer.includes('Grammar OS v'+version));assert(!footer.includes('v1.2.9'));
 }
});
test('all fourteen canonical data loaders complete with network requests held pending',async()=>{
 let requests=0;const doc=documentFor({version:1,files});doc.addEventListener=()=>{};doc.querySelector=()=>null;doc.querySelectorAll=()=>[];
 const r=(await createRuntimeInstance({documentObject:doc,extraGlobals:{fetch:()=>{requests++;return new Promise(()=>{});}}})).runtimeObject;
 const names=['Constants','DirectionalRules','Labels','Options','Groups','Orders','Rules','DerivationalRules','ValenceNeutral','Phonology','AllomorphyRules','Modes','Misc','Redup'];
 const outcomes=await Promise.race([Promise.all(names.map(name=>r['loadStatic'+name]())),new Promise(resolve=>setTimeout(()=>resolve('pending'),100))]);
 assert.deepEqual(outcomes,names.map(()=>true));assert.equal(requests,0);
});
test('embedded records are cloned, exact-path addressed and fail closed if incomplete',async()=>{
 const {getEmbeddedStartupData,validateEmbeddedStartupData}=await import('../bootstrap/startup_data.mjs');
 const doc=documentFor({version:1,files});const record=getEmbeddedStartupData(doc,'data/static_constants.json');record.subjectToggleAll='changed';assert.notEqual(getEmbeddedStartupData(doc,'data/static_constants.json').subjectToggleAll,'changed');
 assert.throws(()=>getEmbeddedStartupData(doc,'other/static_constants.json'),/Unknown startup/);
 const incomplete={...files};delete incomplete['data/interface_layout.json'];assert.throws(()=>validateEmbeddedStartupData(documentFor({version:1,files:incomplete})),/incomplete or invalid/);
 assert.throws(()=>validateEmbeddedStartupData({getElementById:()=>null}),/missing/);
 assert.throws(()=>validateEmbeddedStartupData(documentFor({version:1,files:{...files,'other/static_constants.json':{}}})),/invalid/);
});
test('serialized startup JSON cannot close its inert script element',async()=>{
 const {serializeStartupData}=await import('../../scripts/sync_startup_data.mjs');const hostile={'data/example.json':{text:'</script><script>bad()</script>'}};
 const raw=serializeStartupData(hostile);assert(!raw.includes('<'));assert.deepEqual(JSON.parse(raw).files,hostile);
});
test('explicit organization reload still fetches and validates current data',async()=>{
 let requests=0;const doc=documentFor({version:1,files});doc.defaultView.fetch=async()=>{requests++;return{ok:true,json:async()=>files['data/interface_organization.json']};};
 assert.deepEqual(await loadWorkspaceOrganization(doc,{reload:true}),files['data/interface_organization.json']);assert.equal(requests,1);
});
test('the optional font stylesheet cannot block first script execution',()=>{
 const font=index.match(/<link\s+[^>]*href="https:\/\/fonts.googleapis.com\/css2[^>]+>/)?.[0];assert(font);assert(/media="print"/.test(font));assert(/data-classical-fonts/.test(font));
});
test('fonts activate on load or from cache without becoming a readiness promise',async()=>{
 const {activateDeferredFonts}=await import('../browser/deferred_fonts.mjs');
 const handlers=[];const link={media:'print',sheet:null,addEventListener:(type,fn,options)=>handlers.push({type,fn,options})};
 assert.equal(activateDeferredFonts({querySelector:()=>link}),true);assert.equal(link.media,'print');assert.equal(handlers[0].type,'load');assert.equal(handlers[0].options.once,true);handlers[0].fn();assert.equal(link.media,'all');
 const cached={media:'print',sheet:{},addEventListener(){throw Error('cached fonts need no load wait');}};assert.equal(activateDeferredFonts({querySelector:()=>cached}),true);assert.equal(cached.media,'all');
 assert.equal(activateDeferredFonts({querySelector:()=>null}),false);
});
