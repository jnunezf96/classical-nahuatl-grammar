// Read only the diagram owner's typed projection. Never recover object
// identities, suffixes, silence or derivation levels from a printed formula.
export function appendValenceAnalysis(doc,parent,projection,{general=false,history=null}={}){
  if(projection?.authorizationStatus!=='authorized'||!projection.valenceRows?.length)return null;
  const section=doc.createElement('section');section.className='composition-valence-analysis';
  section.dataset.classicalValenceAnalysis='true';
  section.setAttribute('aria-label','Valence positions in the core');
  const heading=doc.createElement('h4');heading.textContent='Valence positions';section.append(heading);
  const table=doc.createElement('table');
  const caption=doc.createElement('caption');caption.textContent='Core levels and prefix order';table.append(caption);
  const head=doc.createElement('thead'),header=doc.createElement('tr');
  for(const label of ['Core level','Object governed by','Valence','Prefix order']){
    const th=doc.createElement('th');th.setAttribute('scope','col');th.textContent=label;header.append(th);
  }
  head.append(header);table.append(head);
  const body=doc.createElement('tbody');
  const historyRows=history?.authorizationStatus==='authorized'&&history.frameRole==='classical-nahuatl-vnc-derivation-explanation-projection'
    ?history.participantRows.filter(row=>row.targetCarrierKind==='object'):[];
  const rows=projection.valenceRows.map(row=>{
    // Compact one-object slots carry no history. The authentic application
    // projection supplies its sole object; multiple objects require exact ID.
    const exact=row.objectId?historyRows.find(item=>item.participantId===row.objectId)
      :projection.valenceRows.length===1&&historyRows.length===1?historyRows[0]:null;
    return exact&&!row.objectId?{...row,objectId:exact.participantId,governor:exact.governor,
      derivationalLevel:exact.derivationalLevel,prominence:exact.prominence,sounded:exact.sounded}:row;
  });
  if(rows.every(row=>Number.isInteger(row.derivationalLevel)))rows.sort((a,b)=>a.derivationalLevel-b.derivationalLevel);
  for(const entry of rows){
    const row=doc.createElement('tr');row.dataset.valenceSlot=entry.slotId;
    if(entry.objectId)row.dataset.objectId=entry.objectId;
    row.dataset.prefixOrder=String(entry.prefixOrder);
    const governor={directive:'Directive stem',causative:'Causative suffix',applicative:'Applicative suffix'}[entry.governor]||'—';
    const rank=[Number.isInteger(entry.derivationalLevel)?String(entry.derivationalLevel):'',entry.prominence].filter(Boolean).join(' · ')||'—';
    const carrier=general?(entry.valenceArity==='dyadic'?'+va¹-va²':'+va'):entry.expression;
    const cells=[rank,governor,carrier,String(entry.prefixOrder)];
    for(const [i,value]of cells.entries()){
      const cell=doc.createElement('td');cell.textContent=value;
      if(i===2){cell.className='composition-valence-analysis__carrier';if(entry.sounded===false&&!general){const silent=doc.createElement('span');silent.textContent='silent';silent.className='composition-valence-analysis__silent';cell.append(silent);}}
      row.append(cell);
    }
    body.append(row);
  }
  table.append(body);section.append(table);
  const note=doc.createElement('p');note.textContent='Each row is a full valence position; va¹–va² are its subpositions.';section.append(note);
  parent.append(section);return section;
}
