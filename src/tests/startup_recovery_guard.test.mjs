import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const index=fs.readFileSync(new URL('../../index.html',import.meta.url),'utf8');
function fixture({shell=true}={}) {
 const code=index.match(/<script id="classical-startup-guard">([\s\S]*?)<\/script>/)?.[1];
 assert.ok(code,'dependency-free guard must precede module imports');
 const listeners={},docListeners={},timers=new Map();let observe,sequence=0;
 const classes=new Set();const nodes={
  'classical-bootstrap-status':{hidden:false,dataset:{},classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)},querySelector:s=>s.includes('message')?message:reload},
  'classical-workbench':{attrs:{inert:'','aria-busy':'true'},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}}
 };
 const message={textContent:'Preparing your workspace…'},reload={hidden:true};
 const root={dataset:{}};const document={documentElement:root,readyState:shell?'complete':'loading',getElementById:id=>shell?nodes[id]:null,addEventListener:(n,f)=>docListeners[n]=f};
 const window={addEventListener:(n,f)=>listeners[n]=f,removeEventListener:n=>delete listeners[n]};
 vm.runInNewContext(code,{window,document,MutationObserver:class{constructor(f){observe=f}observe(){}disconnect(){observe=null}},setTimeout:f=>{timers.set(++sequence,f);return sequence},clearTimeout:id=>timers.delete(id)});
 return {nodes,message,reload,classes,listeners,timers,root,error(){listeners.error?.({target:{tagName:'SCRIPT',type:'module'}})},dom(){shell=true;document.readyState='complete';docListeners.DOMContentLoaded?.()},timeout(){for(const f of [...timers.values()])f()},partial(key){root.dataset[key]='ready';observe?.()},ready(){root.dataset.classicalBootstrapStatus='ready';root.dataset.classicalPresentationStatus='ready';observe?.()}};
}
test('early module failure renders existing recovery after DOM arrives',()=>{const f=fixture({shell:false});f.error();f.dom();assert.match(f.message.textContent,/could not load/i);assert.equal(f.reload.hidden,false);assert.equal(f.nodes['classical-workbench'].attrs.inert,'');assert.equal(f.classes.has('is-error'),true)});
test('bounded wait and permanent failure offer recovery without navigating or booting',()=>{const f=fixture();f.timeout();assert.match(f.message.textContent,/taking longer/i);assert.equal(f.reload.hidden,false);assert.equal(f.nodes['classical-bootstrap-status'].hidden,false);assert.equal(f.nodes['classical-workbench'].attrs['aria-busy'],'true');assert.equal(f.timers.size,0)});
test('late successful runtime and presentation clear stale failure; later errors ignored',()=>{const f=fixture();f.error();f.partial('classicalPresentationStatus');assert.equal(f.nodes['classical-bootstrap-status'].hidden,false);assert.equal(f.nodes['classical-workbench'].attrs.inert,'');f.ready();assert.equal(f.nodes['classical-bootstrap-status'].hidden,true);assert.equal(f.reload.hidden,true);assert.equal(f.classes.has('is-error'),false);assert.equal(f.nodes['classical-workbench'].attrs.inert,undefined);assert.equal(f.nodes['classical-workbench'].attrs['aria-busy'],'false');assert.equal(f.timers.size,0);f.error();assert.equal(f.nodes['classical-bootstrap-status'].hidden,true)});
test('normal success cancels timeout and CSP permits only exact early script',()=>{const f=fixture();f.partial('classicalBootstrapStatus');assert.equal(f.nodes['classical-bootstrap-status'].hidden,false);assert.equal(f.nodes['classical-workbench'].attrs.inert,'');f.ready();f.timeout();assert.equal(f.nodes['classical-bootstrap-status'].hidden,true);const code=index.match(/<script id="classical-startup-guard">([\s\S]*?)<\/script>/)[1];const hash=createHash('sha256').update(code).digest('base64');for(const s of [index,fs.readFileSync(new URL('../../_headers',import.meta.url),'utf8')])assert(s.includes(`script-src 'self' 'sha256-${hash}'`));assert(index.indexOf('id="classical-startup-guard"')<index.indexOf('<script type="module"'));assert.match(index,/<a href="" data-classical-bootstrap-reload hidden>Reload<\/a>/)});
