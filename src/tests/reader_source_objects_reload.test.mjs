import test from 'node:test';
import assert from 'node:assert/strict';
import * as rows from '../ui/composer/source_objects.mjs';

function documentFixture(){
  const controls=new Map();
  const control=(id,value='',options=[])=>{const label={hidden:false};const e={id,value,options:options.map(value=>({value})),hidden:false,disabled:false,closest:()=>label,addEventListener(){throw new Error('restoration must not bind or dispatch input events');}};controls.set(id,e);return e;};
  control('classical-source-object-count','1');
  control('classical-source-object-add'); control('classical-source-object-remove');
  for(const n of [2,3]){
    control(`classical-source-object-${n}`);
    control(`classical-source-object-${n}-kind`,'specific-projective',['specific-projective','nonspecific-human','nonspecific-nonhuman','reflexive']);
    control(`classical-source-object-${n}-person`,'3sg',['1sg','2sg','3sg','1pl','2pl','3pl']);
  }
  return {getElementById:id=>controls.get(id)||null};
}
const requests=[{objectId:'source-object-1',objectKind:'reflexive',objectPerson:'2sg',governor:'lexical',derivationalLevel:1},{objectId:'source-object-2',objectKind:'nonspecific-nonhuman',objectPerson:'',governor:'lexical',derivationalLevel:2}];

test('restore two-object Source inputs and visibility without executing or binding events',()=>{
  const d=documentFixture();
  assert.equal(typeof rows.restoreClassicalSourceObjectRows,'function','reload must restore the complete accepted Source');
  rows.restoreClassicalSourceObjectRows(d,requests);
  assert.equal(d.getElementById('classical-source-object-count').value,'2');
  assert.equal(d.getElementById('classical-source-object-2').hidden,false);
  assert.equal(d.getElementById('classical-source-object-3').hidden,true);
  assert.equal(d.getElementById('classical-source-object-2-person').closest('label').hidden,true);
  assert.deepEqual(rows.readClassicalSourceObjectRows(d,'mainline-reflexive','2sg'),requests);
  assert.equal(rows.getClassicalSourceObjectControls(d).length,5);
});

test('specific third-object selection remains visible; a one-object Source clears stale extra rows',()=>{
  const d=documentFixture();
  assert.equal(typeof rows.restoreClassicalSourceObjectRows,'function');
  rows.restoreClassicalSourceObjectRows(d,[...requests,{objectId:'source-object-3',objectKind:'specific-projective',objectPerson:'2pl'}]);
  assert.equal(d.getElementById('classical-source-object-3').hidden,false);
  assert.equal(d.getElementById('classical-source-object-3-person').value,'2pl');
  assert.equal(d.getElementById('classical-source-object-3-person').closest('label').hidden,false);
  assert.equal(d.getElementById('classical-source-object-add').disabled,true);
  rows.restoreClassicalSourceObjectRows(d,requests.slice(0,1));
  assert.equal(d.getElementById('classical-source-object-count').value,'1');
  assert.equal(d.getElementById('classical-source-object-2').hidden,true);
  assert.equal(d.getElementById('classical-source-object-3').hidden,true);
  assert.deepEqual(rows.readClassicalSourceObjectRows(d,'mainline-reflexive','2sg'),[]);
  assert.equal(d.getElementById('classical-source-object-remove').disabled,true);
});
