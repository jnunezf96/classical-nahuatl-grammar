import {projectCanonicalStructure} from './structure_design.mjs?historyCompare=20261028-1&choiceArchitecture=20261026-6&nucleusEdit=20261024-9&clauseHarmony=20261023-5&v=20261011-structure-15&routeShapes=20261021-1&clauseCoordinate=20261021-1&resetEligibility=20261022-1&writingSource=20261022-1&makePreview=20261022-1&fixedChoices=20261022-1&interfaceRelease=1.2.36&choiceGuidance=20261027-2&operationPilot=20261027-1';
import {isDoubleNucleusContinuationCapture} from '../../application/classical/double_nucleus_edit.mjs?nucleusEdit=20261024-9';

export function projectResultForEditing(runtime={},exact=null){
  if(!exact||typeof exact!=='object')return null;
  try{
    const capture=runtime.captureClassicalGrammarApplicationResult?.(exact,'result-edit-projection');
    if(runtime.isClassicalGrammarApplicationResultCapture?.(capture,'result-edit-projection')!==true
      ||capture.canonicalResult!==exact)return null;
    const nucleus=isDoubleNucleusContinuationCapture(runtime,capture,exact);
    if(capture.applicationResult?.canonicalResult!==exact&&!nucleus)return null;
    const surface=[exact.surfaceRealization,exact.sentenceSurfaceDisplay,exact.sentenceSurface,exact.surface,
      capture.surfaceRealization,capture.sentenceSurfaceDisplay,capture.sentenceSurface,capture.surface,
      capture.applicationResult.surfaceRealization,capture.applicationResult.surface].find(value=>typeof value==='string'&&value.length)||'';
    return Object.freeze({canonicalResult:exact,applicationResult:capture.applicationResult,
      operationId:nucleus?'nnc:ordinary':capture.applicationResult.operationId||capture.operationId||'',surface});
  }catch{return null;}
}

function exactProjector(runtime,project){
  const read=typeof project==='function'?project:node=>projectResultForEditing(runtime,node);
  return node=>{
    if(!node||typeof node!=='object')return null;
    try{const projection=read(node);return projection?.canonicalResult===node?projection:null;}
    catch{return null;}
  };
}

// Paths address this validated presentation tree, not arbitrary properties of
// a Result. Every lookup rebuilds membership from the current exact root.
export function getResultEditTargets(runtime={},result=null,project){
  const read=exactProjector(runtime,project);
  if(!read(result))return [];
  const tree=projectCanonicalStructure(runtime,result,read,'Whole result');
  if(!tree)return [];
  const targets=[];
  const retainedPrincipal=tree.children.find(child=>child.role==='Principal'&&read(child.exact))?.exact;
  const sharedSupplement=runtime.isClassicalNahuatlSupplementationFrame?.(result)===true
    && result.referenceFrame?.referenceMode==='shared'&&!(result.interveningClauses||[]).length;
  const adverbial=runtime.isAdverbialAdjunctionResult?.(result)===true
    && result.sourceContract?.principal?.issuedResult===retainedPrincipal;
  const walk=(part,path,parent=null,seen=new Set())=>{
    const node=part.exact;
    if(seen.has(node)||!read(node))return;
    const nextSeen=new Set(seen).add(node);
    const record={node,path:Object.freeze([...path]),label:path.length?part.role:'Whole result',role:part.role};
    if(parent)record.parent=parent;
    if(parent===result&&part.role==='Adjunct'&&retainedPrincipal&&(sharedSupplement||adverbial))record.removableTo=retainedPrincipal;
    targets.push(Object.freeze(record));
    for(const [index,child] of part.children.entries())walk(child,[...path,'children',index],node,nextSeen);
    // The structural tree treats this particle as a marker. Editing requires
    // its actual owner-issued Result, separately from the retained nucleus.
    if(runtime.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(node)===true){
      // Edit the original particle input; its honorific output is derived.
      const particle=node.inputParticleResultFrame || node.particleResultFrame;
      if(!nextSeen.has(particle)&&runtime.isClassicalNahuatlParticleResultFrame?.(particle)===true&&read(particle)){
        const attachment={node:particle,path:Object.freeze([...path,'particleResultFrame']),label:'Particle',role:'Particle',parent:node};
        if(node===result&&node.canonicalInputFrame!==node&&read(node.canonicalInputFrame))attachment.removableTo=node.canonicalInputFrame;
        targets.push(Object.freeze(attachment));
      }
    }
  };
  walk(tree,[]);
  return targets;
}

export function resolveResultEditTarget(runtime,result,path,project){
  if(!Array.isArray(path)||path.some(key=>typeof key!=='string'&&!(Number.isInteger(key)&&key>=0)))return null;
  return getResultEditTargets(runtime,result,project).find(target=>target.path.length===path.length
    &&target.path.every((key,index)=>key===path[index]))||null;
}

export function createResultEditSelection(runtime={},project){
  let root=null,path=[],selected=null;
  // One presentation observation walks one authenticated tree. Never retain
  // the projections across entry points: clicks must observe current owners.
  const targetsFor=exact=>{
    const projections=new WeakMap();
    const read=node=>{
      if(!projections.has(node))projections.set(node,typeof project==='function'?project(node):projectResultForEditing(runtime,node));
      return projections.get(node);
    };
    return getResultEditTargets(runtime,exact,read);
  };
  const snapshot=()=>{
    const targets=targetsFor(root);
    const current=targets.find(target=>target.path.length===path.length&&target.path.every((key,index)=>key===path[index]));
    return Object.freeze({result:targets[0]?.node||null,record:current?.node===selected?current:null,targets:Object.freeze(targets)});
  };
  const record=()=>{
    return snapshot().record;
  };
  return Object.freeze({
    accept(next){
      const accepted=targetsFor(next)[0]?.node||null;
      if(accepted!==root){root=accepted;path=[];selected=accepted;}
      return accepted;
    },
    select(nextPath=[]){
      const current=resolveResultEditTarget(runtime,root,nextPath,project);
      if(!current)return false;
      path=[...current.path];selected=current.node;return true;
    },
    snapshot,
    get result(){return snapshot().result;},
    get path(){return record()?[...path]:[];},
    get target(){return record()?.node||null;},
    get record(){return record();},
  });
}
