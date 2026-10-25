import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {reconcileOrdinaryNncSharedChoices} from '../ui/composition/grammar_presentation.mjs';
function fixture(){
 const root=new Element('main'),plan=new Element('section'),host=new Element('div'),gate=new Element('div');
 plan.id='classical-capability-operation-plan';host.id='classical-capability-operation-choices';root.append(plan);plan.append(host,gate);
 Object.assign(plan.dataset,{classicalCapabilityOperationId:'nnc:ordinary',classicalCapabilityTypedSourceBindingOperation:'nnc:ordinary'});
 gate.dataset.compositionOperationGated='true';gate.hidden=true;
 const doc={getElementById:id=>root.querySelector('#'+id),defaultView:{getComputedStyle:()=>({display:'block'})}};
 const fields=[];
 for(const [id,controlId,values] of [['state','classical-rule-logic-nnc-state',['absolutive','possessive']],['animacy','classical-rule-logic-nnc-subject-animacy',['animate','nonanimate']]]){
  const field=new Element('label'),projection=new Element('select'),nativeField=new Element('label'),native=new Element('select');
  field.className='classical-capability-operation-plan__choice';Object.assign(projection.dataset,{classicalCapabilityChoiceId:id,classicalCapabilityOwnerProjection:'exact-binding'});
  native.id=controlId;field.append(projection);host.append(field);nativeField.append(native);gate.append(nativeField);
  for(const value of values){const option=new Element('option');option.value=value;native.append(option)}native.value=values[0];
  const option=new Element('option');option.value=values[1];option.dataset.classicalCapabilityOwnerOptionAvailability='available';projection.append(option);projection.value='';projection.required=false;
  fields.push({field,projection,native,option});
 }
 return {doc,gate,fields};
}
test('settled visibility removes duplicate pending NNC editors without changing values or available staging paths',()=>{
 const f=fixture();assert.equal(reconcileOrdinaryNncSharedChoices(f.doc),false);
 f.gate.hidden=false;assert.equal(reconcileOrdinaryNncSharedChoices(f.doc),true);
 for(const {field,native,projection}of f.fields){assert.equal(field.dataset.compositionNativeChoiceMirror,native.id);assert.equal(projection.value,'');assert.equal(native.options.length,2);}
 assert.equal(reconcileOrdinaryNncSharedChoices(f.doc),false);
 f.fields[0].native.disabled=true;
 // Test DOM helper lacks removeAttribute; mirror real removal semantics here.
 for(const {field} of f.fields)field.removeAttribute=k=>{delete field.attributes[k];delete field.dataset.compositionNativeChoiceMirror;};
 assert.equal(reconcileOrdinaryNncSharedChoices(f.doc),true);assert.equal(f.fields[0].field.dataset.compositionNativeChoiceMirror,undefined);
 assert.equal(f.fields[1].field.dataset.compositionNativeChoiceMirror,f.fields[1].native.id);
});
