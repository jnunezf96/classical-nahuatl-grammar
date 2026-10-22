import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('position context and explicit Make feedback share one presentation module instance',async()=>{
  const consumers=['../ui/rendering/rendering.mjs','../ui/composition/composition_presentation.mjs',
    '../ui/composition/flow_design.mjs','../ui/composition/structure_design.mjs',
    '../ui/composition/sentence_composition.mjs'];
  const addresses={choice_design:new Set(),flow_design:new Set()};
  for(const path of consumers){
    const file=new URL(path,import.meta.url),source=await readFile(file,'utf8');
    for(const line of source.split('\n').filter(line=>line.startsWith('import ')))
      for(const name of Object.keys(addresses)){
        const specifier=line.match(new RegExp(`['"]([^'"]*${name}\\.mjs[^'"]*)['"]`))?.[1];
        if(specifier)addresses[name].add(new URL(specifier,file).href);
      }
  }
  for(const [name,urls]of Object.entries(addresses))
    assert.equal(urls.size,1,`${name} must have one WeakMap owner across context setters and renderers: ${[...urls].join(', ')}`);
});
