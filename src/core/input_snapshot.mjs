// Caller supplies only exact identities already admitted by its canonical owner.
// Ordinary objects are copied deeply even when their outer wrapper is frozen.
export function snapshotGrammarInputs(value,identities=new Set(),seen=new WeakMap()) {
 if(!value||typeof value!=='object'||identities.has(value))return value;
 if(seen.has(value))return seen.get(value);
 const copy=Array.isArray(value)?[]:{};seen.set(value,copy);
 for(const [key,item]of Object.entries(value))Object.defineProperty(copy,key,{value:snapshotGrammarInputs(item,identities,seen),enumerable:true});
 return Object.freeze(copy);
}
