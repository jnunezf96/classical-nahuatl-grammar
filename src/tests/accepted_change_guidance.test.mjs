import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const start=code.indexOf('      button.textContent = needsRole',code.indexOf('const resultBindingOwnerReady'));
const patchedStart=code.indexOf('      button.textContent = !operationId',code.indexOf('const resultBindingOwnerReady'));
const a=patchedStart>=0?patchedStart:start,b=code.indexOf(';',a)+1;
function label(overrides={}){const c=vm.createContext({button:{},operationId:'',needsRole:false,needsResult:false,needsChoice:false,sourceNeedsChoices:false,sourceNotReady:false,resultBindingOwnerReady:true,...overrides});vm.runInContext(code.slice(a,b),c);return c.button.textContent;}
test('return to accepted Result names operation selection before Make, with current gates unchanged',()=>{
 assert.equal(label(),'Choose an operation');
 assert.equal(label({needsRole:true}),'Choose an operation');
 assert.equal(label({operationId:'clause:composition',needsRole:true}),'Choose a Result role');
 assert.equal(label({operationId:'clause:composition',needsResult:true}),'Add the required Result');
 assert.equal(label({operationId:'nnc:ordinary',sourceNotReady:true}),'Selected operation is not ready');
 assert.equal(label({operationId:'nnc:ordinary'}),'Make Result');
});
