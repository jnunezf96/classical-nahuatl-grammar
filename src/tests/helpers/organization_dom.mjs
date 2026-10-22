import assert from 'node:assert/strict';
export class Element {
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.attributes={};this.className='';this.hidden=false;this.disabled=false;this.value='';this.textContent='';this.listeners={};this.classList={contains:c=>this.className.split(/\s+/).includes(c),add:c=>{if(!this.className.split(/\s+/).includes(c))this.className+=' '+c;}};}
  remove(){if(this.parentElement){this.removals=(this.removals||0)+1;this.parentElement.children=this.parentElement.children.filter(n=>n!==this);}this.parentElement=null;}
  append(...nodes){for(const n of nodes){assert.notEqual(n,this,'self append');assert.ok(!n.contains(this),'ancestor append');n.remove();n.parentElement=this;this.children.push(n);}}
  appendChild(n){this.append(n);return n;}
  prepend(n){this.insertBefore(n,this.children[0]);}
  insertBefore(n,anchor){if(n===anchor)return;assert.notEqual(n,this,'self insert');assert.ok(!n.contains(this),'ancestor insert');n.remove();n.parentElement=this;const i=this.children.indexOf(anchor);if(i<0)this.children.push(n);else this.children.splice(i,0,n);}
  replaceChildren(...nodes){for(const n of [...this.children])n.remove();this.append(...nodes);}
  before(n){this.parentElement?.insertBefore(n,this);}
  after(n){this.parentElement?.insertBefore(n,this.nextElementSibling);}
  contains(n){for(;n;n=n.parentElement)if(n===this)return true;return false;}
  get firstElementChild(){return this.children[0]||null;}
  get childNodes(){return this.children;}
  get firstChild(){return this.firstElementChild;}
  get nextSibling(){return this.nextElementSibling;}
  get nextElementSibling(){return this.parentElement?.children[this.parentElement.children.indexOf(this)+1]||null;}
  get previousElementSibling(){return this.parentElement?.children[this.parentElement.children.indexOf(this)-1]||null;}
  addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
  setAttribute(k,v){this.attributes[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=String(v);}
  getAttribute(k){return this.attributes[k]??(k.startsWith('data-')?this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]:null)??null;}
  hasAttribute(k){return this.getAttribute(k)!==null;}
  matches(selector){
    if(selector.includes(','))return selector.split(',').some(s=>this.matches(s.trim()));
    const parts=selector.trim().split(/\s+(?![^\[]*\])/);if(parts.length>1){const last=parts.pop();if(!this.matches(last))return false;if(parts.at(-1)==='>'){parts.pop();return this.parentElement?.matches(parts.join(' '))||false;}for(let p=this.parentElement;p;p=p.parentElement)if(p.matches(parts.join(' ')))return true;return false;}
    if(selector==='*')return true;
    const id=selector.match(/#([\w-]+)/)?.[1];if(id&&this.id!==id)return false;
    for(const [,c] of selector.matchAll(/\.([\w-]+)/g))if(!this.classList.contains(c))return false;
    const tag=selector.match(/^[a-z]+/i)?.[0];if(tag&&this.tagName!==tag.toUpperCase())return false;
    for(const [,k,op,v] of selector.matchAll(/\[([^=\]^]+)(\^?=)?(?:"([^"]*)")?\]/g)){const actual=this.getAttribute(k);if(actual===null||op==='='&&actual!==v||op==='^='&&!actual.startsWith(v))return false;}
    return true;
  }
  querySelectorAll(selector){if(selector.startsWith(':scope > '))return this.children.filter(n=>n.matches(selector.slice(9)));return this.children.flatMap(n=>[n,...n.querySelectorAll('*')]).filter(n=>n.matches(selector));}
  querySelector(s){return this.querySelectorAll(s)[0]||null;}
  closest(s){for(let n=this;n;n=n.parentElement)if(n.matches(s))return n;return null;}
  get options(){return this.children.flatMap(n=>n.tagName==='OPTION'?[n]:n.options);}
}
