// Keep examples within their native guide so family visibility, native choice
// collection and existing listeners remain authoritative. No controls are copied.
export function organizeSourceComposition(doc) {
  for(const family of ['vnc','nnc']) {
    const guide=doc.getElementById(`classical-${family}-source-guide`);
    if(!guide)continue;
    const keys=[`classical-${family}-source-${family==='vnc'?'stem-choices':'example'}`,
      `classical-${family}-source-guide-input-guidance`];
    const secondary=keys.map(key=>Array.from(guide.children).find(node=>
      node.dataset.compositionDisclosure===key)).filter(Boolean);
    const tail=Array.from(guide.children).slice(-secondary.length);
    if(secondary.every((node,index)=>node===tail[index]))continue;
    for(const node of secondary)guide.append(node);
  }
}
