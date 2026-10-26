import test from 'node:test';
import assert from 'node:assert/strict';
import * as structure from '../ui/composition/structure_design.mjs';
import * as clauses from '../ui/composition/clause_composition.mjs';

test('sentence wrappers stay distinct from their verb nuclei in the structural view',()=>{
 const nucleus={},sentence={vncApplicationFrame:nucleus},envelope={unitKind:'vnc'};
 const r={isClassicalNahuatlVncSentenceResultFrame:x=>x===sentence,isClassicalNahuatlVncApplicationFrame:x=>x===nucleus,buildClassicalNahuatlSupplementationClauseEnvelope:()=>envelope,isClassicalNahuatlSupplementationClauseEnvelope:x=>x===envelope};
 const project=x=>[sentence,nucleus].includes(x)?{canonicalResult:x,surface:'Cochi.'}:null;
 const tree=structure.projectCanonicalStructure(r,sentence,project);
 assert.equal(tree.unit,'Sentence');assert.equal(tree.children[0].unit,'Verb clause');
 assert.equal(tree.children[0].exact,nucleus);
 assert.equal(structure.projectCanonicalStructure(r,{...sentence},project),null);
});
test('reason shape and marker labels express principal-sentence juxtaposition without altering other routes',()=>{
 assert.equal(typeof structure.projectCapturedOperationShape,'function');
 const shape={inputs:['Verb clause'],outputs:['Clause'],pending:true};
 const sources=[{unit:'Sentence',role:'principal'},{unit:'Sentence',role:'adjoined'},{unit:'Particle',role:'marker'}];
 assert.deepEqual(structure.projectCapturedOperationShape(shape,sources,'reason').outputs,['Juxtaposed sentences']);
 assert.deepEqual(structure.projectCapturedOperationShape(shape,sources,'time').outputs,['Clause']);
 assert.deepEqual(shape.outputs,['Clause']);
 assert.equal(clauses.clauseMarkerResultLabel('', 'reason:adjoined'),'Required principal-clause introducer');
 assert.equal(clauses.clauseMarkerResultLabel('reason'),'Required principal-clause introducer');
 assert.equal(clauses.clauseMarkerResultLabel('time'),'Optional marker Result');
 assert.equal(clauses.clauseMarkerResultLabel('supplementation'),'Boundary: ca → principal · in → adjunct');
});
