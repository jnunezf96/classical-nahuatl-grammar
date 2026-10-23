import test from 'node:test';
import assert from 'node:assert/strict';
import {createWorkspacePresentation} from '../ui/composition/workspace_presentation.mjs';

function fixture({height=970,resultHeight=924,offset=73}={}) {
  let resultSize=resultHeight,navOffset=offset,measuredNavHeight=offset-12;
  const exact=Object.freeze({surface:'Nopāpāhuēyāhuēhuauh.'});
  const result={dataset:{},exact,getBoundingClientRect:()=>({height:resultSize})};
  const nav={getBoundingClientRect:()=>({height:measuredNavHeight})};
  const root={};
  const output={dataset:{},querySelector:()=>result};
  let observer;const watched=new Set();
  const win={innerWidth:1312,innerHeight:height,addEventListener(){},
    getComputedStyle:()=>({getPropertyValue:()=>`${navOffset}px`}),
    ResizeObserver:class {constructor(callback){observer=callback;}observe(node){watched.add(node);}unobserve(node){watched.delete(node);}}};
  const doc={defaultView:win,addEventListener(){},getElementById:id=>id==='classical-workbench'?root:null,
    querySelector:selector=>selector==='#classical-workbench .panel-output-column'?output:selector==='.classical-four-panel-navigation'?nav:null};
  const refresh=createWorkspacePresentation(doc);refresh();
  return {result,output,exact,nav,watched,win,resize:()=>observer(),setOffset:value=>{navOffset=value;measuredNavHeight=value-12;},setNavHeight:value=>{measuredNavHeight=value;},setResultHeight:value=>{resultSize=value;}};
}

test('whole Result is pinned only when it fits below navigation with bottom breathing room',()=>{
  const f=fixture();
  assert.equal(f.result.dataset.resultFitsViewport,'false','924px Result plus 73px navigation cannot fit in 970px');
  assert.equal(f.output.dataset.resultFitsViewport,'false');
  f.win.innerHeight=1100;f.resize();assert.equal(f.result.dataset.resultFitsViewport,'true');
  f.win.innerHeight=1006;f.resize();assert.equal(f.result.dataset.resultFitsViewport,'false','keep a 12px bottom gutter');
  f.win.innerHeight=1009;f.resize();assert.equal(f.result.dataset.resultFitsViewport,'true','exact available-height boundary fits');
});

test('navigation wrapping and expanded Analysis update fit without replacing the accepted Result',()=>{
  const f=fixture({height:1100});assert.equal(f.result.dataset.resultFitsViewport,'true');
  assert(f.watched.has(f.nav),'observe the action band as well as the Result');
  assert(f.watched.has(f.result));
  f.setOffset(200);f.resize();assert.equal(f.result.dataset.resultFitsViewport,'false');
  f.setOffset(73);f.resize();assert.equal(f.result.dataset.resultFitsViewport,'true');
  f.setNavHeight(188);f.resize();assert.equal(f.result.dataset.resultFitsViewport,'false','nav growth before the CSS offset update must be safe');
  f.setNavHeight(61);f.resize();assert.equal(f.result.dataset.resultFitsViewport,'true');
  f.setResultHeight(1400);f.resize();assert.equal(f.result.dataset.resultFitsViewport,'false');
  f.setResultHeight(300);f.resize();assert.equal(f.result.dataset.resultFitsViewport,'true');
  f.win.innerWidth=900;f.resize();assert.equal(f.result.dataset.resultFitsViewport,'false');
  assert.equal(f.result.exact,f.exact);assert.equal(f.exact.surface,'Nopāpāhuēyāhuēhuauh.');
});
