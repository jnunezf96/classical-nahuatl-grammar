const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).every(k=>keys.includes(k));
const keys=['subject','subjectAnimacy','subjectHumanness','mood','tense','requestedVoice','requestedDerivation','objectSelection','sentenceOptions'];
const sentence=['sentenceType','negative','exclamatory','punctuation','punctuationMode','introductoryParticle','introductoryModifier','prefaceParticle','directionalPrefix','antecessive','sentenceAntecessive'];
function selections(v){
 if(!exact(v,keys))throw Error('unknown imperfective choices');
 const out={};for(const [k,x]of Object.entries(v)){
  if(k==='sentenceOptions'){if(!exact(x,sentence)||!Object.values(x).every(y=>typeof y==='boolean'||typeof y==='string'&&y.length<=200))throw Error('invalid sentence choices');out[k]={...x};}
  else {if(typeof x!=='string'||x.length>200)throw Error('invalid imperfective choice');out[k]=x;}
 }return out;
}
export function exportImperfectiveReloadNode(r,value){
 const q=r.getClassicalNahuatlImperfectiveVncReloadInputs?.(value);if(!q)return null;
 return {type:'vnc:imperfective',source:{enteredStem:q.source.sourceStem,valence:q.source.sourceValence},selections:selections(q.selections),projection:q.projection};
}
export function replayImperfectiveReloadNode(r,node){
 if(node?.type!=='vnc:imperfective')return undefined;
 if(!exact(node,['type','source','selections','projection'])||!exact(node.source,['enteredStem','valence'])||!Object.values(node.source).every(x=>typeof x==='string'&&x.length<=200)||!['application','nucleus'].includes(node.projection))return null;
 const source=r.resolveClassicalNahuatlImperfectiveVncSourceFrame(node.source);
 if(r.isClassicalNahuatlImperfectiveVncSourceFrame(source)!==true)return null;
 const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(r.getClassicalGrammarApplicationCapabilityNavigator(source),'vnc:application',selections(node.selections));
 const result=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding)?.canonicalResult;
 return r.isClassicalNahuatlImperfectiveVncApplicationFrame(result)===true ? node.projection==='nucleus'?result.resultFrame:result : null;
}
