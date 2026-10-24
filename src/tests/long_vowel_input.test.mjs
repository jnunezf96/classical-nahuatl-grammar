import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createClassicalShellModule} from '../ui/shell/classical_shell.mjs';

function fixture(doubleSource = false) {
  class Element {
    constructor(tag='div'){this.tagName=tag.toUpperCase();this.dataset={};this.children=[];this.listeners={};this.value='';this.selectionStart=0;this.selectionEnd=0;this.disabled=false;this.readOnly=false;}
    append(...nodes){for(const n of nodes){this.children.push(n);n.parentElement=this;}}
    replaceChildren(...nodes){this.children=[];this.append(...nodes);}
    setAttribute(name,value){this[name]=value;}
    addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
    dispatchEvent(event){for(const fn of this.listeners[event.type]||[])fn(event);}
    contains(node){return this.children.some(n=>n===node||n.contains(node));}
    closest(){return this.dataset.classicalTranscriptionToken?this:null;}
    focus(){this.dispatchEvent({type:'focus'});}
    setSelectionRange(start,end){this.selectionStart=start;this.selectionEnd=end;}
    querySelectorAll(){return [];}
  }
  const ids=new Map();
  for(const id of ['classical-transcription-keyboard','classical-transcription-keyboard-vowels','classical-transcription-keyboard-consonants','classical-source-parts','classical-source-whole','classical-source-embed','classical-source-matrix']){const e=new Element(id.startsWith('classical-source-')&&!id.endsWith('parts')?'input':'div');e.id=id;ids.set(id,e);}
  if (doubleSource) for (const role of ['principal','supplement']) {
    const id = `classical-double-nucleus-${role}-stem`, input = new Element('input'); input.id = id; ids.set(id, input);
  }
  const get=id=>ids.get(id)||null,keyboard=get('classical-transcription-keyboard');keyboard.append(get('classical-transcription-keyboard-vowels'),get('classical-transcription-keyboard-consonants'));
  get('classical-source-parts').dataset.classicalSourcePartsMode='whole-stem';
  const document={getElementById:get,addEventListener(){},createElement:tag=>new Element(tag)};
  const api=createClassicalShellModule({document,getClassicalDoubleNucleusSourceDraft:()=>doubleSource?{ready:false}:null,Event:class{constructor(type,options){this.type=type;Object.assign(this,options);}},CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS:Object.fromEntries(['a','ā','e','ē','i','ī','o','ō'].map(k=>[k,{}])),CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS:{'/λ/':{}}});
  assert.equal(api.installClassicalTranscriptionSourcePresentation(),true);
  const click=token=>keyboard.dispatchEvent({type:'click',target:get('classical-transcription-keyboard-vowels').children.find(e=>e.dataset.classicalTranscriptionToken===token),preventDefault(){}});
  return {get,api,click,keyboard};
}

test('Source exposes long vowels without a separate Writing Source or sound alphabet',()=>{
  const {api,get}=fixture();const html=api.ClassicalSourcePanel();
  assert.equal(/id="classical-writing-source-entry"|id="classical-transcription-source"|Sound keyboard|>Consonants</.test(html),false);
  assert.deepEqual(get('classical-transcription-keyboard-vowels').children.map(e=>e.textContent),['ā','ē','ī','ō']);
  assert.equal(get('classical-transcription-keyboard-consonants').children.length,0);
});

test('long vowels replace selected text in Stem, Embed and Matrix and only stage Source',()=>{
  const {get,click}=fixture(),parts=get('classical-source-parts');
  const whole=get('classical-source-whole');whole.value='paz';whole.setSelectionRange(1,2);click('ā');assert.equal(whole.value,'pāz');assert.equal(whole.selectionStart,2);
  parts.dataset.classicalSourcePartsMode='embed-matrix';const embed=get('classical-source-embed');embed.focus();click('ē');click('ī');assert.equal(embed.value,'ēī');
  const matrix=get('classical-source-matrix');matrix.value='co';matrix.setSelectionRange(1,2);matrix.focus();click('ō');assert.equal(matrix.value,'cō');assert.equal(embed.value,'ēī');
  assert.equal(parts.dataset.classicalSourceCommitState,'pending');
});

test('read-only source fields keep all four helpers disabled and reject insertion',()=>{
  const {get,click}=fixture(),whole=get('classical-source-whole');whole.value='pā';whole.readOnly=true;whole.focus();
  assert(get('classical-transcription-keyboard-vowels').children.every(e=>e.disabled));click('ē');assert.equal(whole.value,'pā');
});


test('fresh invented Source vowel edits use the existing public helper and leave Source pending',()=>{
  const corpus=JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_long_vowel_fixture.json',import.meta.url),'utf8'));
  const {get,click,api}=fixture(),whole=get('classical-source-whole'),parts=get('classical-source-parts');
  const input=corpus.words[0],offset=input.firstVowelIndex;whole.value=input.stem;whole.setSelectionRange(offset,offset+1);click('ā');
  assert.equal(whole.value,input.stem.slice(0,offset)+'ā'+input.stem.slice(offset+1));assert.equal(parts.dataset.classicalSourceCommitState,'pending');
  const panel=api.ClassicalSourcePanel();assert.equal(panel.includes('id="classical-writing-source-kind"'),false);assert.equal(panel.includes('id="classical-transcription-source-apply"'),false);
  assert.deepEqual(get('classical-transcription-keyboard-vowels').children.map(node=>node.textContent),['ā','ē','ī','ō']);
});

test('long vowels target the focused actual nucleus and never the hidden main stem',()=>{
  const {get,click}=fixture(true),principal=get('classical-double-nucleus-principal-stem'),supplement=get('classical-double-nucleus-supplement-stem');
  const old=get('classical-source-whole');old.value='old-source';
  principal.value='cuatzotōcuichōx';principal.setSelectionRange(2,3);principal.focus();click('ā');
  assert.equal(principal.value,'cuātzotōcuichōx');assert.equal(old.value,'old-source');
  supplement.focus();click('ē');assert.equal(supplement.value,'ē');assert.equal(old.value,'old-source');
  assert.equal(get('classical-source-parts').dataset.classicalSourceCommitState,'pending');
});
